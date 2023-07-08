import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { ProductService } from './product.service';
import { productGrpcOptions } from 'src/grpc.config';
import { PRODUCT_CR_UD_SERVICE_NAME } from 'src/stubs/product/v1alpha/product';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        inject: [ConfigService],
        name: PRODUCT_CR_UD_SERVICE_NAME,
        useFactory: (cs: ConfigService) => productGrpcOptions(cs),
      },
    ]),
  ],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
