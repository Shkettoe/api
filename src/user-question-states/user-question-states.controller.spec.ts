import { Test, TestingModule } from '@nestjs/testing';
import { UserQuestionStatesController } from './user-question-states.controller';
import { UserQuestionStatesService } from './user-question-states.service';

describe('UserQuestionStatesController', () => {
  let controller: UserQuestionStatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserQuestionStatesController],
      providers: [UserQuestionStatesService],
    }).compile();

    controller = module.get<UserQuestionStatesController>(UserQuestionStatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
