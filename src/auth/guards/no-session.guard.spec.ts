import { NoSessionGuard } from './no-session.guard';

describe('NoSessionGuard', () => {
  it('should be defined', () => {
    expect(new NoSessionGuard()).toBeDefined();
  });
});
