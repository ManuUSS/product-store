import { envs } from "../config/envs";
import { MongoDatabase } from "../data";


(async () => {
  await MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL,
  });

  await main();

  MongoDatabase.disconnect();

})();

async function main() {
  
}

