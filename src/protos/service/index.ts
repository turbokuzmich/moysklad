import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { MoySkladClient as _MoySkladClient, MoySkladDefinition as _MoySkladDefinition } from './MoySklad';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  MoySklad: SubtypeConstructor<typeof grpc.Client, _MoySkladClient> & { service: _MoySkladDefinition }
  NeonItem: MessageTypeDefinition
  NeonRequest: MessageTypeDefinition
}

