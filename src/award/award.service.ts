import { Injectable } from '@nestjs/common';
import { CreateAwardDto } from './dto/create-award.dto';
import { UpdateAwardDto } from './dto/update-award.dto';
import { Award } from './entities/award.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const os = require('os');
const isProd = process.env.NODE_ENV == 'production';

@Injectable()
export class AwardService {
  constructor(
    @InjectRepository(Award)
    private awardRepository: Repository<Award>,
  ) {}
  create(createAwardDto: CreateAwardDto) {
    return 'This action adds a new award';
  }

  getAwardBgUrl() {
    console.log(os.networkInterfaces());
    return '/assets/award.png';
  }

  findOne(id: number) {
    return `This action returns a #${id} award`;
  }

  update(id: number, updateAwardDto: UpdateAwardDto) {
    return `This action updates a #${id} award`;
  }

  remove(id: number) {
    return `This action removes a #${id} award`;
  }
}
