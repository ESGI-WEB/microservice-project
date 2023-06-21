// Filename : app.controller.ts
import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import {
  AddRequest,
  AddResponse,
  DeleteRequest,
  DeleteResponse,
  GetRequest,
  GetResponse,
  HERO_CR_UD_SERVICE_NAME,
  Hero,
  HeroCRUDServiceController,
  UpdateRequest,
  UpdateResponse,
  HeroCRUDServiceControllerMethods,
} from './stubs/hero/v1alpha/hero';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';

@Controller()
@HeroCRUDServiceControllerMethods()
export class AppController implements HeroCRUDServiceController {
  constructor(private readonly appService: AppService) {}
  async get(request: GetRequest, metadata?: Metadata): Promise<GetResponse> {
    let hero: Hero;
    let heroes: Hero[] = [];

    if (request.id) {
      heroes = [await this.appService.findById(request.id)];
    } else if (request.name) {
      heroes = [await this.appService.findByName(request.name)];
    } else {
      heroes = await this.appService.findAll();
    }
    return { heroes: heroes.filter((n) => n !== null) };
  }

  async update(
      request: UpdateRequest,
      metadata?: Metadata,
  ): Promise<UpdateResponse> {
    const { id, name, power, hp } = request;
    const hero = await this.appService.update(id, { name, power, hp });
    return { hero };
  }

  async delete(
      request: DeleteRequest,
      metadata?: Metadata,
  ): Promise<DeleteResponse> {
    const { id } = request;
    const hero = await this.appService.delete(id);
    return { hero };
  }

  async add(request: AddRequest): Promise<AddResponse> {
    const hero = await this.appService.create(request);
    return { hero };
  }
}