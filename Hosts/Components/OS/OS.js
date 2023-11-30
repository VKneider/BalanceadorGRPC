import os from 'os-utils';


export default class OS {

    constructor(){
        this.os = new os();
    }

     static getCpuFree() {
        return new Promise((resolve, reject) => {
          os.cpuFree(function (v) {
            if (v !== undefined) {
              resolve(v);
            } else {
              reject(new Error('Error al obtener la información de la CPU'));
            }
          });
        });
      }

    static async getData(){
        let data = {}

        data.freeCpu =  await OS.getCpuFree();
        data.freeRam =  os.freemem();
        return data;
        
    }
}

