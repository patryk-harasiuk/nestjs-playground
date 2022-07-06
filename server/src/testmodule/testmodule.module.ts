import { Module } from '@nestjs/common';
import { TestController } from './testmodule.controller';
import { TestService } from './testmodule.service';

@Module({
  imports: [],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
