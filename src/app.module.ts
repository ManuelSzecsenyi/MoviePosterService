import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PosterController } from './poster/poster/poster.controller';

@Module({
  imports: [],
  controllers: [AppController, PosterController],
  providers: [AppService],
})
export class AppModule {}
