import grpc from "@grpc/grpc-js";
import loader from "@grpc/proto-loader";
import { fileURLToPath } from "url";
import { dirname } from "path";

export default class grpcClient {

    constructor(url) {
        this.url = url;
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


        this.client = new crudProto(
            this.url,
            grpc.credentials.createInsecure()
        );
    }

    run = (parentPort) => {
        try {
            this.client.Read({}, function (err, response) {
                parentPort.postMessage(response);
              });
        } catch (error) {
            console.error('Error in run:', error);
            // Maneja el error de manera adecuada, dependiendo de tus necesidades
        }
    }
    


}




