import { Product } from './product.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  private products: Product[] = [];

  async addNewProduct(
    title: string,
    desc: string,
    price: number,
  ): Promise<string> {
    const newProduct = new this.productModel({
      title,
      description: desc,
      price: price,
    });
    const result = await newProduct.save();
    return result.id;
  }

  //   New product
  async fetchProducts(): Promise<any> {
    // Add products element as new elements to the array
    // .slice() would do the same job

    const data = await this.productModel.find().exec();

    /*
        We use map here to take a list and convert it to a new list
        Because mongo adds an addition values which we don't want to return to the user
        Like _id, _v
    */

    return data.map((items: any) => ({
      id: items.id,
      title: items.title,
      description: items.description,
      price: items.price,
    }));
  }

  //   Get only one product
  async fetchOneProduct(productId: string): Promise<any> {
    const product = await this.findProduct(productId);
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
    };
  }

  //   Find a product
  private async findProduct(id: string): Promise<Product> {
    // type [Product, number] because whe are returning an array with two elements

    let product;

    try {
      product = await this.productModel.findById(id);
    } catch (error) {
      throw new NotFoundException("I can't find the product!");
    }

    return product;

    // const productIndex = this.products.findIndex(prod => prod.id == id);
    // const product = this.products[productIndex];

    // return [product, productIndex];
  }

  //   Update product
  async updateProduct(
    productId: string,
    title: string,
    desc: string,
    price: number,
  ) {
    const updateProduct = await this.findProduct(productId);

    if (updateProduct === null || undefined) {
      throw new NotFoundException("I can't find the product!");
    }

    if (title) {
      updateProduct.title = title;
    }

    if (desc) {
      updateProduct.description = desc;
    }

    if (price) {
      updateProduct.price = price;
    }

    updateProduct.save();
  }

  //   Delete product
  async deleteProduct(productId: string) {
    const productResult = await this.productModel.deleteOne({ _id: productId });

    if (productResult.n === 0) {
      throw new NotFoundException("I can't find the product!");
    }
    // const index = this.findProduct(productId)[1];
    // return this.products.splice(index, 1);
  }
}
