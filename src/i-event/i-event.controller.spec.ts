import { Test, TestingModule } from '@nestjs/testing';
import { IEventController } from './i-event.controller';

describe('IEventController', () => {
  let controller: IEventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IEventController],
    }).compile();

    controller = module.get<IEventController>(IEventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
