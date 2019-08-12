import ClaimLib from '../src/lib';

describe('AoC \'18 - Day 3', () => {
  const originalLog = console.log;
  afterEach(() => console.log = originalLog);

  describe('check answers printed to stdout', () => {
    const consoleOutput = [];
    const mockedLog = output => consoleOutput.push(output);
    beforeEach(() => console.log = mockedLog);

    test('snapshot correct results', async () => {
      await new ClaimLib().run();
      expect(consoleOutput.length).toBeGreaterThan(0);
      expect(JSON.stringify(consoleOutput)).toMatchSnapshot();
    });
  });

});
