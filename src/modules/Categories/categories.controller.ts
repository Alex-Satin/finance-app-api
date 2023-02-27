import {
    Controller,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    Body,
    Put,
    Delete,
  } from '@nestjs/common';
  import { CreateCategoryDto, UpdateCategoryDto } from 'src/common';
  import { CategoriesService } from './categories.service';
  
  @Controller('categories')
  export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}
  
    @Get()
    getCategories() {
      return this.categoriesService.getCategories();
    }
  
    @Get(':id')
    getCategory(@Param('id', new ParseUUIDPipe()) id: string) {
      return this.categoriesService.getCategory(id);
    }
  
    @Post()
    createCategory(@Body() dto: CreateCategoryDto) {
      return this.categoriesService.createCategory(dto);
    }
  
    @Put(':id')
    updateCategory(
      @Param('id', new ParseUUIDPipe()) id: string,
      @Body() dto: UpdateCategoryDto,
    ) {
      return this.categoriesService.updateCategory(id, dto);
    }
  
    @Delete(':id')
    deleteCategory(@Param('id', new ParseUUIDPipe()) id: string) {
      return this.categoriesService.deleteCategory(id);
    }
  }