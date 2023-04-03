import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/providers/database';
import { Repository } from 'typeorm';
import { GoogleDriveService } from 'src/providers/google-drive';
import { GoogleDriveFolders, UpdateUserDto } from 'src/common';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly googleDriveService: GoogleDriveService,
  ) {}

  async setProfileImage(file: Express.Multer.File, user: User) {
    let fileId: string;

    if (user.profileImageId) {
      fileId = await this.googleDriveService.updateFile(
        file,
        user.profileImageId,
      );
    } else {
      fileId = await this.googleDriveService.uploadFile(
        file,
        `${user.id}.jpg`,
        GoogleDriveFolders.AVATARS,
      );
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
