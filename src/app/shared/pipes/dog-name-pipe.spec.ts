import { DogNamePipe } from './dog-name-pipe';

describe('DogNamePipe', () => {
  it('create an instance', () => {
    const pipe = new DogNamePipe();
    expect(pipe).toBeTruthy();
  });
});
