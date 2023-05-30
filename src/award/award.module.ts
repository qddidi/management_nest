import { Module } from '@nestjs/common';
import { AwardService } from './award.service';
import { AwardController } from './award.controller';
import { Award } from './entities/award.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  controllers: [AwardController],
  providers: [AwardService],
  imports: [TypeOrmModule.forFeature([Award])],
})
export class AwardModule {}
