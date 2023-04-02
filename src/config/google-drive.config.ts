import { registerAs } from '@nestjs/config';
import { GoogleDriveFolders } from 'src/common';

export const googleDriveConfig = registerAs('google-drive', () => ({
  configPath: process.env.GOOGLE_DRIVE_CONFIG_PATH,
  folders: {
    [GoogleDriveFolders.AVATARS]: process.env.AVATARS_FOLDER_ID,
  },
}));
