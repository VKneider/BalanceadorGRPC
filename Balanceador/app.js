import express from 'express';
import Balancer from './Balancer.js';
import Host from './Host.js';
import cors from 'cors';

const app = express();
const balancer = new Balancer();

const host1 = new Host("localhost:50051");


balancer.addHost(host1);



app.use(express.json());
app.use(cors());

app.use( (req, res, next) => {
balancer.handleRequest(req, res, next);
});

app.use( (req, res, next) => {
    balancer.updateHostsData(req, res, next);
});


app.listen(3000, () => {

});

app.post("/addHost", (req, res) => {
const host = new Host(req.body.url);
balancer.addHost(host);
res.send("Host added");
});

app.get("/", (req, res) => {

});