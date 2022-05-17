import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PosterController } from './poster/poster/poster.controller';

@Module({
  imports: [],
  controllers: [AppController, PosterController],
  providers: [AppService],
})
export class AppModule {}
