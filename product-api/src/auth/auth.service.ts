import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  AUTH_SERVICE_NAME,
  AuthServiceClient,
} from '../stubs/auth/v1alpha/service';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import {
  ValidateRequest,
  ValidateResponse,
} from '../stubs/auth/v1alpha/message';
import { lastValueFrom } from 'rxjs';
import { Metadata, status as RpcStatus } from '@grpc/grpc-js';

@Injectable()
export class AuthService implements OnModuleInit {
  private authService: AuthServiceClient;

  constructor(@Inject(AUTH_SERVICE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.authService =
      this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  async validate(md: Metadata): Promise<ValidateResponse> {
    const jwt = md.get('authorization')[0]?.toString().replace('Bearer ', '');
    if (!jwt) {
      throw new RpcException({
        code: RpcStatus.UNAUTHENTICATED,
        message: 'You must pass a JWT token in the authorization header',
      });
    }
    return await lastValueFrom(this.authService.validate({ jwt })).catch(() => {
      throw new RpcException({
        code: RpcStatus.UNAUTHENTICATED,
        message: 'Invalid token',
      });
    });
  }
}
