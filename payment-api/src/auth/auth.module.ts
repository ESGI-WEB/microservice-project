import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { authGrpcOptions } from 'src/grpc.config';
import { AUTH_SERVICE_NAME } from 'src/stubs/auth/v1alpha/service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        inject: [ConfigService],
        name: AUTH_SERVICE_NAME,
        useFactory: (cs: ConfigService) => authGrpcOptions(cs),
      },
    ]),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
