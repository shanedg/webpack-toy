import ClaimLib from '../src/lib';
// const { ClaimLib } = require('../src/lib');

describe('AoC \'18 - Day 3', () => {
  const originalLog = console.log;
  afterEach(() => console.log = originalLog);

  describe('check answers printed to stdout', () => {
    let consoleOutput = [];
    const mockedLog = output => consoleOutput.push(output);
    beforeEach(() => console.log = mockedLog);

    test('snapshot', async () => {
      await new ClaimLib().run();
      expect(consoleOutput.length).toBeGreaterThan(0);

      expect(consoleOutput[0]).toContain(['common squ in:']);
      expect(consoleOutput[1]).toContain(['claims w/o overlap:']);
    });
  });

});
