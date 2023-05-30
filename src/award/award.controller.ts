import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AwardService } from './award.service';
import { CreateAwardDto } from './dto/create-award.dto';
import { UpdateAwardDto } from './dto/update-award.dto';

@Controller('award')
export class AwardController {
  constructor(private readonly awardService: AwardService) {}

  @Post()
  create(@Body() createAwardDto: CreateAwardDto) {
    return this.awardService.create(createAwardDto);
  }

  @Get('getawardbg')
  getAwardBgUrl() {
    return this.awardService.getAwardBgUrl();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.awardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAwardDto: UpdateAwardDto) {
    return this.awardService.update(+id, updateAwardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.awardService.remove(+id);
  }
}
