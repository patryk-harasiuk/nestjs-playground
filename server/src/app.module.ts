import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApiModule } from './api/api.module';
import { PostsModule } from './api/posts/posts.module';
import { UsersModule } from './api/users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';

console.log(`./${process.env.NODE_ENV}.env`, 'MAIN APP MODULE');
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 
        `./${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    AuthModule,
    UsersModule,
    ApiModule,
    PostsModule,
  ],
})
export class AppModule {}
