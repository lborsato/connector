import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, ConfigService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return ', () => {
      const result = {
        company: undefined,
        displayName: undefined,
        hasConfig: true,
        hasInfo: true,
        icon: 'undefined/icon',
        name: undefined,
        url: undefined,
        version: undefined,
      };
      expect(appController.getIdentity()).toBe(result);
    });
  });
});
