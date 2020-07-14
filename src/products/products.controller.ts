import { ProductsService } from './products.service';
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductsService) {}

  @Post()
  async newProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ): Promise<any> {
    const createdProduct = await this.productService.addNewProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );

    return { id: createdProduct };
  }

  @Get('all')
  async getProducts(): Promise<any> {
    const products = await this.productService.fetchProducts();
    return products;
  }

  @Get('one/:p_id')
  getOneProduct(@Param('p_id') prodId: string): any {
    return this.productService.fetchOneProduct(prodId);
  }

  @Patch('edit/:p_id')
  async updateProduct(
    @Param('p_id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ): Promise<any> {
    await this.productService.updateProduct(
      prodId,
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return null;
  }

  @Delete('delete/:p_id')
  async deleteProduct(@Param('p_id') prodId: string): Promise<any> {
    await this.productService.deleteProduct(prodId);
    return { status: 'Deleted!' };
  }
}
