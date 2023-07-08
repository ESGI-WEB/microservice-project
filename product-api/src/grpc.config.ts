import { ClientProviderOptions, GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';
import { PRODUCT_V1ALPHA_PACKAGE_NAME } from './stubs/product/v1alpha/product';
import {
  USER_SERVICE_NAME,
  USER_V1ALPHA_PACKAGE_NAME,
} from './stubs/user/v1alpha/service';
import { ChannelCredentials } from '@grpc/grpc-js';
import { AUTH_SERVICE_NAME, AUTH_V1ALPHA_PACKAGE_NAME } from './stubs/auth/v1alpha/service';
import { ConfigService } from '@nestjs/config';

export default (cs: ConfigService): GrpcOptions =>
  addReflectionToGrpcConfig({
    transport: Transport.GRPC,
    options: {
      url: `0.0.0.0:${cs.get('PORT')}`,
      package: PRODUCT_V1ALPHA_PACKAGE_NAME,
      protoPath: join(__dirname, 'proto/product/v1alpha/product.proto'),
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
