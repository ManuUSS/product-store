import { CategoryModel } from '../../data/mongo/models/category.model';
import { 
  CategoryEntity, 
  CustomError, 
  PaginationDto, 
  type CreateCategoryDto, 
  type UserEntity 
} from '../../domain';


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

  async getCategories( paginationDto:PaginationDto ) {
    
    const { page, limit } = paginationDto;

    try {

      const [ total, categories ] = await Promise.all([
        CategoryModel.countDocuments(),
        CategoryModel.find()
          .skip( ( page - 1 ) * limit )
          .limit( limit )
      ]);
      const categoriesEntities = categories.map( category => CategoryEntity.fromObject( category ) );
      
      return {
        meta: {
          page,
          limit,
          total,
          next: `/api/categories?page=${ page + 1 }&limit=${ limit }`,
          prev: (page - 1 > 0) ? `/api/categories?page=${ page - 1 }&limit=${ limit }` : null,
          totalPages: Math.ceil( total / limit ),
        },
        categories: categoriesEntities
      };
      
    } catch ( error ) {
      throw CustomError.internalServer('Internal server error');
    }


  };

}


