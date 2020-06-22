import { Product } from './product.model';
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class ProductsService {

    private products: Product[] = [];

    addNewProduct(title: string, desc: string, price: number): string {
        const productId = Math.random().toString();
        const newProduct = new Product(
            productId,
            title,
            desc,
            price
        );

        this.products.push(newProduct);

        return productId;
    }

    fetchProducts() : any {

        // Add products element as new elements to the array
        // .slice() would do the same job

        return [...this.products];
    }

    fetchOneProduct(productId: string): any {

        const product = this.findProduct(productId)[0];
        return { ...product }
    }

    deleteProduct(productId: string): any {

        const index = this.findProduct(productId)[1];
        return this.products.splice(index, 1);
    }

    updateProduct(
        productId: string,
        title: string,
        desc: string,
        price: number
    ){
        const [product, index] = this.findProduct(productId);
        const currentProduct = { ...product };

        if(title) {
            currentProduct.title = title;
        }

        if(desc) {
            currentProduct.description = desc;
        }

        if(price) {
            currentProduct.price = price;
        }

        this.products[index] = currentProduct;
    }

    private findProduct(id: string) : [Product, number]{

        const productIndex = this.products.findIndex((prod) => prod.id == id);
        const product = this.products[productIndex];

        if(!product) {
            throw new NotFoundException("I can't find the product!");
        }

        return [product, productIndex];
    }

}