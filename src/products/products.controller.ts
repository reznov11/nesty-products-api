import { ProductsService } from './products.service';
import { Controller, Post, Body, Get, Param, Patch, Delete } from "@nestjs/common";

@Controller('products')
export class ProductController {
    
    constructor(
        private readonly productService: ProductsService
    ) {}

    @Post()
    newProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number,
    ): any {
        
        const createdProduct = this.productService.addNewProduct(
            prodTitle,
            prodDesc,
            prodPrice
        );

        return { id: createdProduct };
    }

    @Get('all')
    getProducts(): any{
        return this.productService.fetchProducts();
    }

    @Get('one/:p_id')
    getOneProduct(
        @Param('p_id') prodId: string,
    ): any{
        return this.productService.fetchOneProduct(prodId);
    }

    @Patch('edit/:p_id')
    updateProduct(
        @Param('p_id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number,
    ): any{
        this.productService.updateProduct(
            prodId, prodTitle, prodDesc, prodPrice
        );
        return {'status': 'Updated!'}
    }

    @Delete('delete/:p_id')
    deleteProduct(
        @Param('p_id') prodId: string,
    ): any{
        this.productService.deleteProduct(prodId);
        return {'status': 'Deleted!'}
    }

}