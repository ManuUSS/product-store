
import { ProductModel } from '../../data/mongo/models/product.model';
import { 
  type CategoryEntity, 
  type CreateProductDto, 
  CustomError, 
  PaginationDto,
} from '../../domain';


export class ProductService {

  constructor () {};


  async createProduct( createProductDto:CreateProductDto ) {
    
    const productExists = await ProductModel.findOne({ name: createProductDto.name });
    if ( productExists ) throw CustomError.badRequest('Product already exists');

    try {
      
      const product = new ProductModel( createProductDto );

      await product.save();

      return product;

    } catch ( error ) {
      throw CustomError.internalServer('Error creating category');
    }

  };  

  async getProducts ( paginationDto:PaginationDto ) {
    
    const { page, limit } = paginationDto;

    try {

      const [ total, products ] = await Promise.all([
        ProductModel.countDocuments(),
        ProductModel.find()
          .skip( ( page - 1 ) * limit )
          .limit( limit )
      ]);

      return {
        meta: {
          page,
          limit,
          total,
          next: `/api/categories?page=${ page + 1 }&limit=${ limit }`,
          prev: (page - 1 > 0) ? `/api/categories?page=${ page - 1 }&limit=${ limit }` : null,
          totalPages: Math.ceil( total / limit ),
        },
        products
      };
      
    } catch ( error ) {
      throw CustomError.internalServer('Internal server error');
    }


  };

}


