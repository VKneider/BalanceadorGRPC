import worker from  "worker_threads";

export default class Balancer{

    constructor(){
        this.hosts = [];
        this.current = 0;
    }

    addHost = (server) => {
        this.hosts.push(server);
    }

    handleRequest = (request, response, next) => {
        
        //choose the best host
        let bestHost = this.chooseBestHost();
        bestHost.actualProcesses++;
        bestHost.totalProcesses++;
        request.initialTime = Date.now();
        request.hostUrl = bestHost.url;
        

        //send the request to the best host
        const workerData = {url: bestHost.url};
        const workerThread = new worker.Worker("./Client/worker.js", {workerData});

        workerThread.on("message", (message) => {
            response.freeRam = message.freeRam;
            response.freeCpu = message.freeCpu;
            response.send(message);
            next();
        }   );

        workerThread.on("error", (error) => {
            console.log(error);
        }   );  

        workerThread.on("exit", () => {
            
        }   );  



        
    }

    updateHostsData = (request, response, next) => {
    
            let host = this.hosts.find(host => host.url == request.hostUrl);
            host.actualProcesses--;
            host.latency = Date.now() - request.initialTime;
            host.freeRam = response.freeRam;
            host.freeCpu = response.freeCpu;
    
            console.log(this.hosts)
            next();

        }

    chooseBestHost = () => {

        this.hosts.forEach(host => {

            //add +1 to score to the host with the lowest latency
            if(host.latency == Math.min(...this.hosts.map(host => host.latency))){
                host.score++;
            }

            //add +1 to the host with the most free ram
            if(host.freeRam == Math.max(...this.hosts.map(host => host.freeRam))){
                host.score++;
            }

            //add +1 to the host with the most free cpu
            if(host.freeCpu == Math.max(...this.hosts.map(host => host.freeCpu))){
                host.score++;
            }

            //add +1 to the host with the least processes
            if(host.actualProcesses == Math.min(...this.hosts.map(host => host.actualProcesses))){
                host.score++;
            }

            //add +1 to the host with the least total processes
            if(host.totalProcesses == Math.min(...this.hosts.map(host => host.totalProcesses))){
                host.score++;
            }            

        
        }); 
        
        //choose the host with the highest score and if there are more than one, choose the first one
        let bestHost = this.hosts[0];
        this.hosts.forEach(host => {
            if(host.score > bestHost.score){
                bestHost = host;
            }
        });

        //reset the score of all the hosts
        this.hosts.forEach(host => {
            host.score = 0;
        });

        return bestHost;

    }



}