/*
 * @Description:
 * @Date: 2023-05-11 09:54:37
 * @Author: didi
 * @LastEditTime: 2023-05-11 17:11:48
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/http-exception/http-exception.filter';
import { TransformInterceptor } from './common/interceptor/transform/transform.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //看这里看这里看这里~
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000);
}
bootstrap();
