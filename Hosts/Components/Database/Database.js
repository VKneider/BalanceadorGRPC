import pkg from 'pg';
const { Pool } = pkg;


class Database {
  constructor(config) {
    this.pool = new Pool(config);
  }

  executeQuery = async (query, props) => {
    try {
      const res = await this.pool.query(this.sentences[query], props);
      return res;
    } catch (e) {
      console.log(e);
    }
  };

  getCnn = async () => {
    try {
      return await this.pool.connect();
    } catch (e) {
      console.log(e);
    }
  };

  returnCnn = async (cli) => {
    try {
      await cli.release();
    } catch (e) {
      console.log(e);
    }
  };

  customQuery = async (query) => {
    try {
      const res = await this.pool.query(query);
      return { result:res.rows, status: 'SUCCESS' };
    } catch (e) {
      console.log(e);
      return { status: 'ERROR', res: e.message };
    }
  };
}

const db = new Database({
  user: "postgres",
  host: "localhost",
  database: "balanceador",
  password: "postgres",
  port: "5432",
});

await db.customQuery("delete from table1");
await db.customQuery("delete from table2");
await db.customQuery("delete from table3");

for (let i = 0; i < 10; i++) {
    let query = "INSERT INTO table1 (name) VALUES ('name" + i + "')";
    await db.customQuery(query);
}

for (let i = 0; i < 100; i++) {
    let query = "INSERT INTO table2 (name) VALUES ('name" + i + "')";
    await db.customQuery(query);
}

for (let i = 0; i < 1000; i++) {
    let query = "INSERT INTO table3 (name) VALUES ('name" + i + "')";
    await db.customQuery(query);
}

export default db;