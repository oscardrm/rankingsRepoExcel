import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Ranking } from './dto/rankingDto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @Get('ranking')
  async getItemsByName(@Query() request: Ranking): Promise<any[]> {
    if (!request?.item) {
      throw new Error('The item property is required. ' + JSON.stringify(request));
    }
    return await this.appService.getGithubRanking(request);
  }
}
