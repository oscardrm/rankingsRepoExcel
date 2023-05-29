import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Ranking } from './dto/rankingDto';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });


  describe('ranking', () => {
    it('should return an array of items', () => {
      const request: Ranking = {
        item: 'javascript',
        limit: 10,
        sort: 'asc',
        orderBy: 'rank'
      }
      const result = appController.getItemsByName(request);
      expect(result).toBeDefined();
    });

    it('should filter by javascript and return 2 items on array ordered by rank ASC', async() => {
      const request: Ranking = {
        item: 'javascript',
        limit: 2,
        sort: 'asc',
        orderBy: 'rank'
      }
      const result = await appController.getItemsByName(request);
      expect(result).toEqual(
        [
          {
            "rank": "1",
            "item": "JavaScript",
            "repo_name": "freeCodeCamp",
            "stars": "296993",
            "forks": "20777",
            "language": "JavaScript",
            "repo_url": "https://github.com/freeCodeCamp/freeCodeCamp",
            "username": "freeCodeCamp",
            "issues": "5097",
            "last_commit": "2019-01-22T03:06:11Z",
            "description": "The https://www.freeCodeCamp.org open source codebase and curriculum. Learn to code for free together with millions of people."
          },
          {
            "rank": "2",
            "item": "JavaScript",
            "repo_name": "vue",
            "stars": "125780",
            "forks": "17962",
            "language": "JavaScript",
            "repo_url": "https://github.com/vuejs/vue",
            "username": "vuejs",
            "issues": "209",
            "last_commit": "2019-01-20T14:21:31Z",
            "description": "🖖 Vue.js is a progressive, incrementally-adoptable JavaScript framework for building UI on the web."
          }
        ]
      );
    })

    it('should filter by javascript and return 2 items on array ordered by rank DESC', async() => {
      const request: Ranking = {
        item: 'javascript',
        limit: 2,
        sort: 'desc',
        orderBy: 'rank'
      }
      const result = await appController.getItemsByName(request);
      expect(result).toEqual(
        [
          {
            "rank": "100",
            "item": "JavaScript",
            "repo_name": "hammer.js",
            "stars": "19582",
            "forks": "2518",
            "language": "JavaScript",
            "repo_url": "https://github.com/hammerjs/hammer.js",
            "username": "hammerjs",
            "issues": "258",
            "last_commit": "2018-06-07T10:29:26Z",
            "description": "A javascript library for multi-touch gestures :// You can touch this"
          },
          {
            "rank": "99",
            "item": "JavaScript",
            "repo_name": "gitbook",
            "stars": "20082",
            "forks": "2799",
            "language": "JavaScript",
            "repo_url": "https://github.com/GitbookIO/gitbook",
            "username": "GitbookIO",
            "issues": "990",
            "last_commit": "2018-12-27T16:51:42Z",
            "description": "📝 Modern documentation format and toolchain using Git and Markdown"
          }
        ]
      );
    })
  })
});
