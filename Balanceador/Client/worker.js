import grpcClient from "./grpcClient.js";
import { parentPort, workerData } from "worker_threads";

const client = new grpcClient(workerData.url);

client.run(parentPort);