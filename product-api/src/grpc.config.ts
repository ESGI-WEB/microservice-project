import { ClientProviderOptions, GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';
import { PRODUCT_V1ALPHA_PACKAGE_NAME } from './stubs/product/v1alpha/product';
import {
  USER_SERVICE_NAME,
  USER_V1ALPHA_PACKAGE_NAME,
} from './stubs/user/v1alpha/service';
import { ChannelCredentials } from '@grpc/grpc-js';
import {AUTH_SERVICE_NAME, AUTH_V1ALPHA_PACKAGE_NAME} from "./stubs/auth/v1alpha/service";

export const grpcConfig = addReflectionToGrpcConfig({
  transport: Transport.GRPC,
  options: {
    url: `0.0.0.0:4000`, // TODO: Get use environment variable
    package: PRODUCT_V1ALPHA_PACKAGE_NAME,
    protoPath: join(__dirname, 'proto/product/v1alpha/product.proto'),
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
