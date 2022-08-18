import { Module } from '@nestjs/common';

import { JwtAuthGuard } from '../../auth/guards';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService, JwtAuthGuard],
  exports: [PostsService],
})
export class PostsModule {}
