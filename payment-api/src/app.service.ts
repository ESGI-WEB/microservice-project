// Filename : app.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  findById(id: number) {
    return this.prisma.order.findUnique({
      where: { id },
      include: {
        items: true, // All posts where authorId == 20
      },
    });
  }

  create(data) {
    const productsByQuantity = data.items.reduce((acc, item) => {
      if (!(item.productId in acc)) {
        acc[item.productId] = 0;
      }
      acc[item.productId] += item.quantity;
      return acc;
    });

    // recuperer les produits depuis le micro service
    // verifier que les produits sont en stock

    return this.prisma.order.create({
      data,
    });
  }

  delete(id: number) {
    return this.prisma.order.delete({
      where: { id },
    });
  }

  update(id: number, data: Prisma.OrderUpdateInput) {
    // TODO
  }
}
