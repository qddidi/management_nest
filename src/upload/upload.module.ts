/*
 * @Description:
 * @Date: 2023-05-12 11:51:03
 * @Author: didi
 * @LastEditTime: 2023-05-12 15:37:35
 */
import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';

@Module({
  controllers: [UploadController],
  imports: [],
  providers: [UploadService],
})
export class UploadModule {}
