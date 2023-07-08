import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { ProductService } from './product.service';
import { productGrpcOptions } from '../grpc.config';
@Module({
  imports: [ClientsModule.register([productGrpcOptions])],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
