import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
  CreateCategoryDto,
  GetUser,
  JwtAuthGuard,
  UpdateCategoryDto,
} from 'src/common';
import { CategoriesService } from './categories.service';
import { User } from 'src/providers/database';

@ApiTags('Categories')
@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getCategories(@GetUser() user: User) {
    return this.categoriesService.getCategories(user);
  }

  @Get(':id')
  getCategory(
    @Param('id', new ParseUUIDPipe()) id: string,
    @GetUser() user: User,
  ) {
    return this.categoriesService.getCategory(id, user);
  }

  @Post()
  createCategory(@Body() dto: CreateCategoryDto, @GetUser() user: User) {
    return this.categoriesService.createCategory(dto, user);
  }

  @Put(':id')
  updateCategory(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateCategoryDto,
    @GetUser() user: User,
  ) {
    return this.categoriesService.updateCategory(id, dto, user);
  }

  @Delete(':id')
  deleteCategory(
    @Param('id', new ParseUUIDPipe()) id: string,
    @GetUser() user: User,
  ) {
    return this.categoriesService.deleteCategory(id, user);
  }
}
