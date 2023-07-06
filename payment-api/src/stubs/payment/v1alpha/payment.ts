/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Timestamp } from "../../google/protobuf/timestamp";

export const protobufPackage = "payment.v1alpha";

export interface Order {
  id?: number;
  userId?: number;
  productId?: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  items?: Item[];
}

export interface Item {
  id?: number;
  productId?: number;
  quantity?: number;
}

export interface ItemCreate {
  productId?: number;
  quantity?: number;
}

export interface GetOrderRequest {
  id?: number;
}

export interface GetOrderResponse {
  order?: Order;
}

export interface CreateOrderRequest {
  items?: ItemCreate[];
}

export interface CreateOrderResponse {
  order?: Order;
}

export interface UpdateOrderRequest {
  order?: Order;
}

export interface UpdateOrderResponse {
  order?: Order;
}

export interface DeleteOrderRequest {
  id?: number;
}

export interface DeleteOrderResponse {
  order?: Order;
}

export const PAYMENT_V1ALPHA_PACKAGE_NAME = "payment.v1alpha";

export interface PaymentCRUDServiceClient {
  getOrder(request: GetOrderRequest, metadata?: Metadata): Observable<GetOrderResponse>;

  createOrder(request: CreateOrderRequest, metadata?: Metadata): Observable<CreateOrderResponse>;

  updateOrder(request: UpdateOrderRequest, metadata?: Metadata): Observable<UpdateOrderResponse>;

  deleteOrder(request: DeleteOrderRequest, metadata?: Metadata): Observable<DeleteOrderResponse>;
}

export interface PaymentCRUDServiceController {
  getOrder(
    request: GetOrderRequest,
    metadata?: Metadata,
  ): Promise<GetOrderResponse> | Observable<GetOrderResponse> | GetOrderResponse;

  createOrder(
    request: CreateOrderRequest,
    metadata?: Metadata,
  ): Promise<CreateOrderResponse> | Observable<CreateOrderResponse> | CreateOrderResponse;

  updateOrder(
    request: UpdateOrderRequest,
    metadata?: Metadata,
  ): Promise<UpdateOrderResponse> | Observable<UpdateOrderResponse> | UpdateOrderResponse;

  deleteOrder(
    request: DeleteOrderRequest,
    metadata?: Metadata,
  ): Promise<DeleteOrderResponse> | Observable<DeleteOrderResponse> | DeleteOrderResponse;
}

export function PaymentCRUDServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getOrder", "createOrder", "updateOrder", "deleteOrder"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("PaymentCRUDService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("PaymentCRUDService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const PAYMENT_CR_UD_SERVICE_NAME = "PaymentCRUDService";
