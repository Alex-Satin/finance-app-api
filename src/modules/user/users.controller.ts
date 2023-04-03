import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Get,
  Patch,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { GetUser, JwtAuthGuard, UpdateUserDto } from 'src/common';
import { UsersService } from './users.service';
import { User } from 'src/providers/database';

@ApiTags('Users')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: User,
  ) {
    return this.usersService.setProfileImage(file, user);
  }

  @Patch()
  updateUser(@Body() dto: UpdateUserDto, @GetUser() user: User) {
    return this.usersService.updateUser(dto, user);
  }
}
