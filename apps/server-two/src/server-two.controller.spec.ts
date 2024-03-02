import { Test, TestingModule } from '@nestjs/testing';
import { ServerTwoController } from './server-two.controller';
import { ServerTwoService } from './server-two.service';

describe('ServerTwoController', () => {
  let serverTwoController: ServerTwoController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ServerTwoController],
      providers: [ServerTwoService],
    }).compile();

    serverTwoController = app.get<ServerTwoController>(ServerTwoController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(serverTwoController.getHello()).toBe('Hello World!');
    });
  });
});
