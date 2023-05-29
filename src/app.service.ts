import { Injectable } from '@nestjs/common';
import { Ranking } from './dto/rankingDto';
import * as csvParser from 'csv-parser';
import * as fs from 'fs';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }


    /**
   * Retrieves the top ranking items from a CSV file based on the given parameters.
   *
   * @param {Ranking} request - object containing the sorting options, limit, and item to search for
   * @return {Promise<any>} a Promise object that resolves with an array of the top ranking items
   */
  async getGithubRanking(request: Ranking): Promise<any> {
    try {
      const { sort = 'asc', limit = 10, item, orderBy = 'rank' } = request
      const results = [];
      return new Promise((resolve, reject) => {
        fs.createReadStream('data.csv')
          .pipe(csvParser())
          .on('data', (row) => {
            if (row.item.toLowerCase() === item.toLowerCase()) {
              results.push(row);
            }
          })
          .on('end', () => {
            if (results?.sort) {
              results.sort((a, b) => this.sortByItem(a, b, sort.toLowerCase(), orderBy));
            }

            resolve(results.slice(0, limit));
          })
          .on('error', reject);
      });
    } catch (error) {
      console.log(error);
    }
  }

    /**
   * Sorts two items based on a given order and sort asc | desc.
   *
   * @param {any} a - The first item to compare.
   * @param {any} b - The second item to compare.
   * @param {string} sort - The sorting order. Defaults to "asc".
   * @param {string} orderBy - The property to order by. Defaults to "rank".
   * @return {number} Returns 1 if aKey is greater than bKey, and -1 otherwise.
   */
  sortByItem(a: any, b: any, sort: string = 'asc', orderBy: string = 'rank') {
    const aKey = parseInt(a[orderBy]) ?? a[orderBy];
    const bKey = parseInt(b[orderBy]) ?? b[orderBy];
    if (sort === 'asc') {
      return (aKey > bKey ? 1 : -1);
    } else {
      return (aKey < bKey ? 1 : -1);
    }
  }

}
