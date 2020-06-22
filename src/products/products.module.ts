import { ProductsService } from './products.service';
import { ProductController } from './products.controller';
import { Module } from "@nestjs/common";

@Module({
    controllers: [ProductController],
    providers: [ProductsService],
})
export class ProductsModule {}