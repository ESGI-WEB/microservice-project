import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  GetRequest,
  GetResponse,
  PRODUCT_CR_UD_SERVICE_NAME,
  ProductCRUDServiceClient,
} from '../stubs/product/v1alpha/product';

@Injectable()
export class ProductService implements OnModuleInit {
  private productService: ProductCRUDServiceClient;

  constructor(@Inject(PRODUCT_CR_UD_SERVICE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.productService = this.client.getService<ProductCRUDServiceClient>(
      PRODUCT_CR_UD_SERVICE_NAME,
    );
  }

  async get(request: GetRequest): Promise<GetResponse> {
    return await lastValueFrom(this.productService.get(request));
  }
}
