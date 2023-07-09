// Filename : app.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';
import { ProductService } from './product/product.service';
import { RpcException } from '@nestjs/microservices';
import { status as RpcStatus } from '@grpc/grpc-js';

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
    private productService: ProductService,
  ) {}

  findById(id: number) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        items: true,
      },
    });
  }

  findMany(condition: Prisma.OrderWhereInput) {
    return this.prisma.order.findMany({
      where: condition,
      include: {
        items: true,
      },
    });
  }

  findManyItems(condition: Prisma.OrderItemWhereInput) {
    return this.prisma.orderItem.findMany({
      where: condition,
    });
  }

  async create(data) {
    // we can create an order without items and edit it later (cf update)
    if (data.items.create) {
      await this.checkProductStock(data.items.create);
    }
    return this.prisma.order.create({
      data,
      include: {
        items: true,
      },
    });
  }

  delete(id: number) {
    return this.prisma.order.delete({
      where: { id },
    });
  }

  // we make like a PUT in rest conventions, we replace the resource
  // it's easier to understand and implement
  async update(id: number, data) {
    // transaction to not delete items if we throw an error after
    return await this.prisma.$transaction(async (tx) => {
      await tx.orderItem.deleteMany({
        where: {
          orderId: id,
        },
      });

      if (data.items.create) {
        await this.checkProductStock(data.items.create);
      }

      return tx.order.update({
        where: { id },
        data,
        include: {
          items: true,
        },
      });
    });
  }

  private async checkProductStock(items) {
    // get order products and their quantity ordered
    const productsByQuantity = items.reduce((acc, item) => {
      if (!(item.productId in acc)) {
        acc[item.productId] = 0;
      }
      if (item.quantity <= 0) {
        throw new RpcException({
          code: RpcStatus.INVALID_ARGUMENT,
          message: 'Quantity must be greater than 0',
        });
      }

      acc[item.productId] += item.quantity;
      return acc;
    }, {});
    const productIds = Object.keys(productsByQuantity).map((id) => +id);

    const products =
      (
        await this.productService.get({
          ids: productIds,
        })
      ).products ?? [];

    if (products.length !== productIds.length) {
      throw new RpcException({
        code: RpcStatus.NOT_FOUND,
        message: 'Some products do not exist',
      });
    }

    // get orders that already contain some of the products
    const itemsAlreadyInOrders = await this.findManyItems({
      productId: {
        in: productIds,
      },
    });

    // sum quantities to check stock
    itemsAlreadyInOrders.forEach((item) => {
      productsByQuantity[item.productId] += item.quantity;
    });

    // check that stock is oh for all products
    const productsWithOverStock = products.filter((product) => {
      return product.quantity < productsByQuantity[product.id];
    });

    if (productsWithOverStock.length > 0) {
      throw new RpcException({
        code: RpcStatus.FAILED_PRECONDITION,
        message: productsWithOverStock
          .map((product) => {
            return `Product "${product.name}" do not have enough stock`;
          })
          .join(',\n'),
      });
    }

    return true;
  }
}
