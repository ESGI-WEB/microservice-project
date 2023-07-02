import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import {
  AddRequest,
  AddResponse,
  DeleteRequest,
  DeleteResponse,
  GetRequest,
  GetResponse,
  UpdateRequest,
  UpdateResponse,
  Product,
  ProductCRUDServiceController,
  ProductCRUDServiceControllerMethods,
} from './stubs/product/v1alpha/product';
import { Metadata, status as RpcStatus } from '@grpc/grpc-js';
import { AuthService } from './auth/auth.service';
import { RpcException } from '@nestjs/microservices';

@Controller()
@ProductCRUDServiceControllerMethods()
export class AppController implements ProductCRUDServiceController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}
  async get(request: GetRequest): Promise<GetResponse> {
    let products: Product[];

    if (request.id) {
      products = [await this.appService.findById(request.id)];
    } else if (request.name) {
      products = await this.appService.findByName(request.name);
    } else {
      products = await this.appService.findAll();
    }
    return { products: products?.filter((n) => n !== null) ?? [] };
  }

  async update(request: UpdateRequest, md: Metadata): Promise<UpdateResponse> {
    const { id, name, description, price, quantity } = request;
    const user = await this.authService.validate(md);
    if (!user) {
      throw new RpcException({
        code: RpcStatus.UNAUTHENTICATED,
        message: 'Invalid token',
      });
    }

    const product = await this.appService.update(id, {
      name,
      description,
      price,
      quantity,
    });
    return { product };
  }

  async delete(request: DeleteRequest, md: Metadata): Promise<DeleteResponse> {
    const { id } = request;
    const user = await this.authService.validate(md);
    if (!user) {
      throw new RpcException({
        code: RpcStatus.UNAUTHENTICATED,
        message: 'Invalid token',
      });
    }

    const product = await this.appService.delete(id);
    return { product };
  }

  async add(request: AddRequest, md: Metadata): Promise<AddResponse> {
    const { name, description, price, quantity } = request;

    const user = await this.authService.validate(md);
    if (!user) {
      throw new RpcException({
        code: RpcStatus.UNAUTHENTICATED,
        message: 'Invalid token',
      });
    }

    const product = await this.appService.create({
      name,
      description,
      price,
      quantity,
      userId: user.userId,
    });

    return { product };
  }
}
