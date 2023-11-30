export default class Host{

    constructor(url){
        this.url = url;
        this.freeRam = 9999999;
        this.freeCpu = 0;
        this.latency = 0;
        this.actualProcesses = 0;
        this.totalProcesses = 0;
        this.score=0;
    }

}