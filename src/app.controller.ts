import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Ranking } from './interfaces/ranking.interface';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('ranking')
  /**
   * Asynchronously retrieves an array of items from Github API based on the given ranking request.
   *
   * @param {Ranking} request - The ranking request object that contains the item to search for.
   * @return {Promise<any[]>} Returns a promise that resolves to an array of items matching the provided name.
   * @throws {Error} Throws an error if the request object does not have an item property.
   */
  async getItemsByName(@Query() request: Ranking): Promise<any[]>{
    if(!request?.item){
      throw new Error('The item property is required.');
    }
    return await this.appService.getGithubRanking(request);
  }
}
