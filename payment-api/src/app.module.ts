import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { GrpcReflectionModule } from 'nestjs-grpc-reflection';
import grpcConfig, { authGrpcOptions, productGrpcOptions } from './grpc.config';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Joi from 'joi';
import { AUTH_SERVICE_NAME } from './stubs/auth/v1alpha/service';
import { ClientsModule } from '@nestjs/microservices';
import { PRODUCT_CR_UD_SERVICE_NAME } from './stubs/product/v1alpha/product';

const envSchema = Joi.object({
  DATABASE_URL: Joi.string().required(),
  PORT: Joi.number().default(4003),
  HEALTH_PORT: Joi.number().default(3000),
  AUTH_API_URL: Joi.string().required(),
  PRODUCT_API_URL: Joi.string().required(),
  insecure: Joi.boolean().required(),
});
@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      validationSchema: envSchema,
    }),
    GrpcReflectionModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cs: ConfigService) => grpcConfig(cs),
    }),
    /*ClientsModule.registerAsync([
      {
        name: PRODUCT_CR_UD_SERVICE_NAME,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (cs: ConfigService) => productGrpcOptions(cs),
      },
    ]),
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE_NAME,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (cs: ConfigService) => authGrpcOptions(cs),
      },
    ]),*/
    AuthModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
