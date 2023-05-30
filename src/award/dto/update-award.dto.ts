import { PartialType } from '@nestjs/mapped-types';
import { CreateAwardDto } from './create-award.dto';

export class UpdateAwardDto extends PartialType(CreateAwardDto) {}
