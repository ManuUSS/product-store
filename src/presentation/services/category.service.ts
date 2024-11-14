import { CategoryModel } from '../../data/mongo/models/category.model';
import { CategoryEntity, CustomError, type CreateCategoryDto, type UserEntity } from '../../domain';


export class CategoryService {

  constructor () {};


  async createCategory( createCategoryDto:CreateCategoryDto, user: UserEntity ) {
    
    const categoryExists = await CategoryModel.findOne({ name: createCategoryDto.name });
    if ( categoryExists ) throw CustomError.badRequest('Category already exists');

    try {
      
      const category = new CategoryModel({
        ...createCategoryDto,
        user: user.id,
      });

      await category.save();

      return {
        id: category.id,
        name: category.name,
        available: category.available,
      };

    } catch ( error ) {
      throw CustomError.internalServer('Error creating category');
    }

  };  

  async getCategories() {
    
    try {
      const categories = await CategoryModel.find();
      const categoriesEntities = categories.map( category => CategoryEntity.fromObject( category ) );
      return categoriesEntities;
    } catch ( error ) {
      throw CustomError.internalServer('Internal server error');
    }


  };

}


