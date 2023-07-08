import { ClientProviderOptions, GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';
import { ChannelCredentials } from '@grpc/grpc-js';
import {
  AUTH_SERVICE_NAME,
  AUTH_V1ALPHA_PACKAGE_NAME,
} from './stubs/auth/v1alpha/service';
import {
  PRODUCT_CR_UD_SERVICE_NAME,
  PRODUCT_V1ALPHA_PACKAGE_NAME,
} from './stubs/product/v1alpha/product';
import { PAYMENT_V1ALPHA_PACKAGE_NAME } from './stubs/payment/v1alpha/payment';
import { ConfigService } from '@nestjs/config';

export default (cs: ConfigService): GrpcOptions =>
  addReflectionToGrpcConfig({
    transport: Transport.GRPC,
    options: {
      url: `0.0.0.0:${cs.get('PORT')}`,
      package: PAYMENT_V1ALPHA_PACKAGE_NAME,
      protoPath: join(__dirname, 'proto/payment/v1alpha/payment.proto'),
    },
  });

export const authGrpcOptions = (cs: ConfigService): ClientProviderOptions => ({
  name: AUTH_SERVICE_NAME,
  transport: Transport.GRPC,
  options: {
    url: cs.get('AUTH_API_URL'),
    package: AUTH_V1ALPHA_PACKAGE_NAME,
    loader: {
      includeDirs: [join(__dirname, './proto')],
    },
    protoPath: [join(__dirname, './proto/auth/v1alpha/service.proto')],
    credentials: ChannelCredentials.createInsecure(),
  },
});

export const productGrpcOptions = (cs: ConfigService): ClientProviderOptions => ({
  name: PRODUCT_CR_UD_SERVICE_NAME,
  transport: Transport.GRPC,
  options: {
    url: cs.get('PRODUCT_API_URL'),
    package: PRODUCT_V1ALPHA_PACKAGE_NAME,
    loader: {
      includeDirs: [join(__dirname, './proto')],
    },
    protoPath: [join(__dirname, './proto/product/v1alpha/product.proto')],
    credentials: ChannelCredentials.createInsecure(),
  },
});
