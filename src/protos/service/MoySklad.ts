// Original file: protos/service.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { DeluxItem as _DeluxItem, DeluxItem__Output as _DeluxItem__Output } from './DeluxItem';
import type { DeluxRequest as _DeluxRequest, DeluxRequest__Output as _DeluxRequest__Output } from './DeluxRequest';
import type { NeonItem as _NeonItem, NeonItem__Output as _NeonItem__Output } from './NeonItem';
import type { NeonRequest as _NeonRequest, NeonRequest__Output as _NeonRequest__Output } from './NeonRequest';

export interface MoySkladClient extends grpc.Client {
  getDeluxAssortment(argument: _DeluxRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_DeluxItem__Output>;
  getDeluxAssortment(argument: _DeluxRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_DeluxItem__Output>;
  getDeluxAssortment(argument: _DeluxRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_DeluxItem__Output>;
  getDeluxAssortment(argument: _DeluxRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_DeluxItem__Output>;
  
  getNeonAssortment(argument: _NeonRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_NeonItem__Output>;
  getNeonAssortment(argument: _NeonRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_NeonItem__Output>;
  getNeonAssortment(argument: _NeonRequest, metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientReadableStream<_NeonItem__Output>;
  getNeonAssortment(argument: _NeonRequest, options?: grpc.CallOptions): grpc.ClientReadableStream<_NeonItem__Output>;
  
}

export interface MoySkladHandlers extends grpc.UntypedServiceImplementation {
  getDeluxAssortment: grpc.handleServerStreamingCall<_DeluxRequest__Output, _DeluxItem>;
  
  getNeonAssortment: grpc.handleServerStreamingCall<_NeonRequest__Output, _NeonItem>;
  
}

export interface MoySkladDefinition extends grpc.ServiceDefinition {
  getDeluxAssortment: MethodDefinition<_DeluxRequest, _DeluxItem, _DeluxRequest__Output, _DeluxItem__Output>
  getNeonAssortment: MethodDefinition<_NeonRequest, _NeonItem, _NeonRequest__Output, _NeonItem__Output>
}
