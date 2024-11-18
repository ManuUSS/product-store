import { envs } from '../config/envs';
import { MongoDatabase, UserModel } from '../data';
import { CategoryModel } from '../data/mongo/models/category.model';
import { ProductModel } from '../data/mongo/models/product.model';
import { seedData } from './data';


(async () => {
  await MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL,
  });

  await main();

  MongoDatabase.disconnect();

})();

const randomBetween0andMax = ( max:number ) => Math.floor( Math.random() * max ); 

async function main() {
  
  // Delete all data from collections
  await Promise.all([
    UserModel.deleteMany(),
    CategoryModel.deleteMany(),
    ProductModel.deleteMany(),
  ]);

  // Inserts users data
  const users = await UserModel.insertMany( seedData.users );

  const categories = await CategoryModel.insertMany( 
    seedData.categories.map(( category ) => ({ 
      ...category, 
      user: users[ 0 ]._id 
    })) 
  );

  await ProductModel.insertMany( 
    seedData.products.map(( product ) => ({ 
      ...product, 
      user: users[randomBetween0andMax( users.length - 1 )]._id,
      category: categories[randomBetween0andMax( categories.length - 1 )]._id 
    })) 
  );

}

