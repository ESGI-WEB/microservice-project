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

export const grpcConfig = addReflectionToGrpcConfig({
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:6001',
    package: PAYMENT_V1ALPHA_PACKAGE_NAME,
    protoPath: join(__dirname, 'proto/payment/v1alpha/payment.proto'),
  },
}) as GrpcOptions;

export const authGrpcOptions: ClientProviderOptions = {
  name: AUTH_SERVICE_NAME,
  transport: Transport.GRPC,
  options: {
    url: 'localhost:4002',
    package: AUTH_V1ALPHA_PACKAGE_NAME,
    loader: {
      includeDirs: [join(__dirname, './proto')],
    },
    protoPath: [join(__dirname, './proto/auth/v1alpha/service.proto')],
    credentials: ChannelCredentials.createInsecure(),
  },
};

export const productGrpcOptions: ClientProviderOptions = {
  name: PRODUCT_CR_UD_SERVICE_NAME,
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:6000',
    package: PRODUCT_V1ALPHA_PACKAGE_NAME,
    loader: {
      includeDirs: [join(__dirname, './proto')],
    },
    protoPath: [join(__dirname, './proto/product/v1alpha/product.proto')],
    credentials: ChannelCredentials.createInsecure(),
  },
};
