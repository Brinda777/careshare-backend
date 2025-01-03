import { Test, TestingModule } from '@nestjs/testing';
import { IEventService } from './i-event.service';

describe('IEventService', () => {
  let service: IEventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IEventService],
    }).compile();

    service = module.get<IEventService>(IEventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
