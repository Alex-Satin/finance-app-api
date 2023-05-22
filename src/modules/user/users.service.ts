import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';
import * as FormData from 'form-data';

import { User } from 'src/providers/database';
import { GoogleDriveFolders, UpdateUserDto } from 'src/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async setProfileImage(file: Express.Multer.File, user: User) {
    let fileId: string;

    if (user.profileImageId) {
      const formData = new FormData();
      formData.append('file', file.buffer, {
        filename: `${user.id}.jpg`,
      });
      formData.append('googleDriveId', user.profileImageId);

      const { data } = await firstValueFrom(
        this.httpService.patch<string>(
          `${this.configService.get('STORAGE_SERVICE_URL')}/files`,
          formData,
          {
            headers: {
              ...formData.getHeaders(),
              'Content-Length': formData.getLengthSync(),
            },
          },
        ),
      );

      fileId = data;
    } else {
      const formData = new FormData();
      formData.append('file', file.buffer, {
        filename: `${user.id}.jpg`,
      });
      formData.append('fileName', `${user.id}.jpg`);
      formData.append('directory', GoogleDriveFolders.AVATARS);

      const { data } = await firstValueFrom(
        this.httpService.post<string>(
          `${this.configService.get('STORAGE_SERVICE_URL')}/files`,
          formData,
          {
            headers: {
              ...formData.getHeaders(),
              'Content-Length': formData.getLengthSync(),
            },
          },
        ),
      );

      fileId = data;
    }

    user.profileImageId = fileId;

    await this.userRepository.save(user);

    return user;
  }

  async updateUser(dto: UpdateUserDto, user: User) {
    const updatedUser = this.userRepository.merge(user, dto);

    await this.userRepository.save(user);

    return updatedUser;
  }
}
