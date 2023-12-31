// Filename : app.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';
import { Product } from './stubs/product/v1alpha/product';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.ProductCreateInput): Promise<Product> {
    return this.prisma.product.create({ data });
  }

  findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  findById(id: number): Promise<Product> {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  findManyBy(column: string, value: any): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: { [column]: value },
    });
  }

  update(id: number, data: Prisma.ProductUpdateInput): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  delete(id: number): Promise<Product> {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
