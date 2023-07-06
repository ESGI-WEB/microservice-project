import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { authGrpcOptions } from '../grpc.config';
@Module({
  imports: [ClientsModule.register([authGrpcOptions])],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
