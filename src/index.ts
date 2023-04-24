import { load } from "@grpc/proto-loader";
import { config } from "dotenv";
import { resolve } from "path";
import { getNeonAssortment, getDeluxAssortment } from "./service";
import { ProtoGrpcType } from "./protos/service";
import { MoySkladHandlers } from "./protos/service/MoySklad";
import {
  Server,
  ServerCredentials,
  loadPackageDefinition,
} from "@grpc/grpc-js";

config();

const handlers: MoySkladHandlers = {
  async getNeonAssortment(call) {
    const assortment = await getNeonAssortment();

    assortment.forEach((item) => call.write(item));

    call.end();
  },
  async getDeluxAssortment(call) {
    const assortment = await getDeluxAssortment();

    assortment.forEach((item) => call.write(item));

    call.end();
  },
};

async function main() {
  const protos = await load(resolve(process.cwd(), "protos", "service.proto"));
  const server = new Server();
  const definitions = loadPackageDefinition(protos) as unknown as ProtoGrpcType;

  server.addService(definitions.MoySklad.service, handlers);

  server.bindAsync(
    `${process.env.ADDRESS as string}:${process.env.PORT as string}`,
    ServerCredentials.createInsecure(),
    function (_, port) {
      server.start();
      console.log("started at", port);
    }
  );
}

main();
