import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import { firstValueFrom } from 'rxjs';

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
      // fileId = await this.googleDriveService.updateFile(
      //   file,
      //   user.profileImageId,
      // );

      const { data } = await firstValueFrom(
        this.httpService.patch<string>(
          `${this.configService.get('common.storageServiceUrl')}/files`,
          {
            file,
            googleDriveId: user.profileImageId,
          },
        ),
      );

      fileId = data;
    } else {
      const { data } = await firstValueFrom(
        this.httpService.patch<string>(
          `${this.configService.get('common.storageServiceUrl')}/files`,
          {
            file,
            fileName: `${user.id}.jpg`,
            directory: GoogleDriveFolders.AVATARS,
          },
        ),
      );

      fileId = data;
    }

    user.profileImageId = fileId;

    await this.userRepository.save(user);
  }

  async updateUser(dto: UpdateUserDto, user: User) {
    const updatedUser = this.userRepository.merge(user, dto);

    await this.userRepository.save(user);

    return updatedUser;
  }
}
