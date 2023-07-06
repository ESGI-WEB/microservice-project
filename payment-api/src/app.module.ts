import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { GrpcReflectionModule } from 'nestjs-grpc-reflection';
import { grpcConfig } from './grpc.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [GrpcReflectionModule.register(grpcConfig), AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}