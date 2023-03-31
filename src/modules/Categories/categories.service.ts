import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCategoryDto, UpdateCategoryDto } from 'src/common';
import { Category, User } from 'src/providers/database';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  getCategories(user: User): Promise<Category[]> {
    return this.categoryRepository.findBy({
      user: { id: user.id },
    });
  }

  async getCategory(id: string, user: User): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({
      id,
      user: { id: user.id },
    });

    if (!category) {
      throw new NotFoundException(`Can't find category with id ${id}`);
    }

    return category;
  }

  async createCategory(dto: CreateCategoryDto, user: User) {
    const category = this.categoryRepository.create({
      name: dto.name,
      imagePath: dto.imageUrl,
      user,
    });

    try {
      await this.categoryRepository.save(category);
    } catch (err) {
      throw new BadRequestException('Ivalid category configuration');
    }

    return category;
  }

  async updateCategory(id: string, dto: UpdateCategoryDto, user: User) {
    const category = await this.categoryRepository.findOneBy({
      id,
      user: { id: user.id },
    });

    if (!category) {
      throw new NotFoundException(`Can't find category with id ${id}`);
    }

    const updatedCategory = await this.categoryRepository.save(
      this.categoryRepository.merge(category, dto),
    );

    return updatedCategory;
  }

  async deleteCategory(id: string, user: User) {
    await this.categoryRepository.delete({ id, user: { id: user.id } });

    return id;
  }
}
