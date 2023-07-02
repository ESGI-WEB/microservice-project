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

@Controller()
@ProductCRUDServiceControllerMethods()
export class AppController implements ProductCRUDServiceController {
  constructor(private readonly appService: AppService) {}
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

  async update(request: UpdateRequest): Promise<UpdateResponse> {
    const { id, name, description, price, quantity } = request;
    const product = await this.appService.update(id, {
      name,
      description,
      price,
      quantity,
    });
    return { product };
  }

  async delete(request: DeleteRequest): Promise<DeleteResponse> {
    const { id } = request;
    const product = await this.appService.delete(id);
    return { product };
  }

  async add(request: AddRequest): Promise<AddResponse> {
    const { name, description, price, quantity } = request;
    const product = await this.appService.create({
      name,
      description,
      price,
      quantity,
    });
    return { product };
  }
}
