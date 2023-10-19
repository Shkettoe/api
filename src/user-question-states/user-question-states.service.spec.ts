import { Test, TestingModule } from '@nestjs/testing';
import { UserQuestionStatesService } from './user-question-states.service';

describe('UserQuestionStatesService', () => {
  let service: UserQuestionStatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserQuestionStatesService],
    }).compile();

    service = module.get<UserQuestionStatesService>(UserQuestionStatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
