import { NestFactory } from '@nestjs/core';
import { TestModule } from './testmodule/testmodule.module';

async function bootstrap() {
  const app = await NestFactory.create(TestModule, { abortOnError: false });
  await app.listen(3000);
}
bootstrap();
