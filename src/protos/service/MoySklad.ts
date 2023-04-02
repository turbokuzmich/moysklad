// Original file: protos/service.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { NeonItem as _NeonItem, NeonItem__Output as _NeonItem__Output } from './NeonItem';
import type { NeonRequest as _NeonRequest, NeonRequest__Output as _NeonRequest__Output } from './NeonRequest';

export interface MoySkladClient extends grpc.Client {
  getNeonAssortment(argument: _NeonRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_NeonItem__Output>;
  getNeonAssortment(argument: _NeonRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_NeonItem__Output>;
  getNeonAssortment(argument: _NeonRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_NeonItem__Output>;
  getNeonAssortment(argument: _NeonRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_NeonItem__Output>;
  
}

export interface MoySkladHandlers extends grpc.UntypedServiceImplementation {
  getNeonAssortment: grpc.handleServerStreamingCall<_NeonRequest__Output, _NeonItem>;
  
}

export interface MoySkladDefinition extends grpc.ServiceDefinition {
  getNeonAssortment: MethodDefinition<_NeonRequest, _NeonItem, _NeonRequest__Output, _NeonItem__Output>
}
