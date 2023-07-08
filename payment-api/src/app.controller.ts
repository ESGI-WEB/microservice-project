import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import {
  CreateOrderRequest,
  CreateOrderResponse,
  DeleteOrderRequest,
  DeleteOrderResponse,
  GetOrderRequest,
  GetOrderResponse,
  PaymentCRUDServiceController,
  PaymentCRUDServiceControllerMethods,
  UpdateOrderRequest,
  UpdateOrderResponse,
} from './stubs/payment/v1alpha/payment';
import { Metadata, status as RpcStatus } from '@grpc/grpc-js';
import { RpcException } from '@nestjs/microservices';

@Controller()
@PaymentCRUDServiceControllerMethods()
export class AppController implements PaymentCRUDServiceController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  async createOrder(
    request: CreateOrderRequest,
    metadata?: Metadata,
  ): Promise<CreateOrderResponse> {
    const user = await this.authService.validate(metadata);

    const orderData = {
      userId: user.userId,
      items: { create: request.items },
    };

    const order = await this.appService.create(orderData);

    return { order: order as any };
  }

  async deleteOrder(
    request: DeleteOrderRequest,
    metadata?: Metadata,
  ): Promise<DeleteOrderResponse> {
    const user = await this.authService.validate(metadata);
    const order = await this.appService.findById(request.id);
    if (!order) {
      throw new RpcException({
        code: RpcStatus.NOT_FOUND,
        message: 'Order not found',
      });
    }

    if (order.userId !== user.userId) {
      throw new RpcException({
        code: RpcStatus.PERMISSION_DENIED,
        message: 'You do not have permission to delete this order',
      });
    }

    await this.appService.delete(request.id);
    return { order: order as any };
  }

  async getOrder(
    request: GetOrderRequest,
    metadata?: Metadata,
  ): Promise<GetOrderResponse> {
    const user = await this.authService.validate(metadata);
    const order = await this.appService.findById(request.id);

    if (!order) {
      throw new RpcException({
        code: RpcStatus.NOT_FOUND,
        message: 'Order not found',
      });
    }
    if (order.userId !== user.userId) {
      throw new RpcException({
        code: RpcStatus.PERMISSION_DENIED,
        message: 'You cannot view this order',
      });
    }

    return { order: order as any };
  }

  async updateOrder(
    request: UpdateOrderRequest,
    metadata?: Metadata,
  ): Promise<UpdateOrderResponse> {
    const user = await this.authService.validate(metadata);
    const order = await this.appService.findById(request.order.id);

    if (!order) {
      throw new RpcException({
        code: RpcStatus.NOT_FOUND,
        message: 'Order not found',
      });
    }

    if (order.userId !== user.userId) {
      throw new RpcException({
        code: RpcStatus.PERMISSION_DENIED,
        message: 'You cannot update this order',
      });
    }

    // we make like a PUT in rest conventions, we replace the item resources
    // it's easier to understand and implement
    const orderData = {
      items: { create: request.order.items },
    };

    const updatedOrder = await this.appService.update(
      request.order.id,
      orderData,
    );

    return { order: updatedOrder as any };
  }
}
