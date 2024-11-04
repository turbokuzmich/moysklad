const { resolve } = require("path");
const { load } = require("@grpc/proto-loader");
const { credentials, loadPackageDefinition } = require("@grpc/grpc-js");

async function main() {
  const protos = await load(resolve(process.cwd(), "protos", "service.proto"));
  const definitions = loadPackageDefinition(protos);

  const client = new definitions.MoySklad(
    "localhost:50051",
    credentials.createInsecure()
  );

  const call = client.getDeluxAssortment();

  call.on("metadata", function (meta) {
    console.log("metadata", new Date(meta.get("date")[0]));
  });
  call.on("data", function (feature) {
    console.log(feature);
  });
  call.on("end", function () {
    console.log("end");
  });
  call.on("error", function (e) {
    console.log("error");
  });
  call.on("status", function (status) {
    console.log("status", status);
  });
}

main();
