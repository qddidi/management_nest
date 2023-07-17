import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/http-exception/http-exception.filter';
import { TransformInterceptor } from './common/interceptor/transform/transform.interceptor';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  const options = new DocumentBuilder()
    .setTitle('后台管理系统') // 标题
    .setDescription('后台管理系统接口文档') // 描述
    .setVersion('1.0') // 版本
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/api/swagger', app, document);

  await app.listen(3000);
}
bootstrap();
