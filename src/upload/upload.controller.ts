/*
 * @Description:
 * @Date: 2023-05-12 11:51:03
 * @Author: didi
 * @LastEditTime: 2023-05-12 15:53:40
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import * as fs from 'fs';
import { join } from 'path';
import {
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express/multer';
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('album')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file, @Body() pramas) {
    console.log(file);
    // fs.writeFileSync(`/static/${file.originalname}`, file.buffer);
    fs.mkdirSync(join(__dirname, '..', 'public'));
    console.log(pramas.name);
    return '66';
  }

  @Get()
  findAll() {
    return this.uploadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUploadDto: UpdateUploadDto) {
    return this.uploadService.update(+id, updateUploadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadService.remove(+id);
  }
}
