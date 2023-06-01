import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AguacateController } from '../aguacate/aguacate.controller';

@Module({
  imports: [],
  controllers: [AppController, AguacateController],
  providers: [AppService],
})
export class AppModule {}
