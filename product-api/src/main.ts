import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import grpcConfig from './grpc.config';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cs = app.get(ConfigService);
  app.connectMicroservice(grpcConfig(cs));

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();
  await app.startAllMicroservices();

  const healthCheckPort = cs.get('HEALTH_PORT');
  await app.listen(healthCheckPort);
}
bootstrap();