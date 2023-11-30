import db from "../Components/Database/Database.js";
import OS from "../Components/OS/OS.js";


export default class Microservices {

    constructor(){
        
    }

    static async Read(call,callback){


        try {
            const pcData = await OS.getData();
            const randomNumberBetweenOneAndThree = Math.floor(Math.random() * 3) + 1;
            const query = `SELECT * FROM  table${randomNumberBetweenOneAndThree}`;
            const res = await db.customQuery(query);
            callback(null, {
                data: res.result,
                freeRam: pcData.freeRam,
                freeCpu: pcData.freeCpu,
              });

              
        } catch (e) {
            console.log(e);
        }
    }
}