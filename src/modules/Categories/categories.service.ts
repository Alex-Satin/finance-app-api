import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateCategoryDto, UpdateCategoryDto, Category } from 'src/common';

@Injectable()
export class CategoriesService {
  private categories: Category[] = [];
  getCategories() {
    return this.categories;
  }

  getCategory(id: string) {
    const category = this.categories.find((category) => category.id === id);
    if (!category) {
      throw new NotFoundException(`Can't find operation with id ${id}`);
    }
    return category;
  }

  createCategory(dto: CreateCategoryDto) {
    const categories: Category = {
      ...dto,
      createdAt: new Date(),
      id: uuid(),
      imageUrl: '',
    };
    this.categories.push(categories);
    return this.categories;
  }

  updateCategory(id: string, dto: UpdateCategoryDto) {
    const categoryIndex = this.categories.findIndex(
      (categories) => categories.id === id,
    );

    if (categoryIndex === -1) {
      throw new NotFoundException(`Can't find operation with id ${id}`);
    }

    this.categories[categoryIndex] = {
      ...this.categories[categoryIndex],
      ...dto,
    };
    return this.categories[categoryIndex];
  }

  deleteCategory(id: string) {
    this.categories = this.categories.filter((user) => user.id !== id);
    return id;
  }
}
