import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty({ example: 200 })
  code: number;
  @ApiProperty({ example: 'eyJhbGciOiJ...' })
  data: string;
  @ApiProperty({ example: '请求成功' })
  describe: string;
}
