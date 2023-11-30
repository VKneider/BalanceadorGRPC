import { fileURLToPath } from "url";
import { dirname } from "path";
import grpc from "@grpc/grpc-js";
import loader from "@grpc/proto-loader";
import Microservices from "./Microservices.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROTO_PATH = __dirname + "/crud.proto";

const packageDefinition = loader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const crudProto = grpc.loadPackageDefinition(packageDefinition).Products;

const server = new grpc.Server();

server.addService(crudProto.service, {
    Read: Microservices.Read,
});

server.bindAsync('127.0.0.1:50051', grpc.ServerCredentials.createInsecure(), () => {server.start();});
console.log("Server running at http://127.0.0.1:50051 ")

