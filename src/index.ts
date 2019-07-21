import * as fs from 'fs';
import * as _ from 'lodash';

type Claim = {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

async function main() {
  const path = 'input.txt';
  const options = {
    encoding: 'UTF-8',
  };

  const stream = fs.createReadStream(path, options);
  let lines = await getStreamLines(stream);

  const cloth = _.range(0, 1000).map(() => _.range(0, 1000, 0));

  lines.forEach(l => {
    const claim = getClaim(l);

    for (let y = claim.y; y < (claim.y + claim.height); y += 1) {
      for (let x = claim.x; x < (claim.x + claim.width); x += 1) {
        cloth[y][x] += 1;
      }
    }
  });

  let commonSquareInches = 0;
  cloth.forEach(row => {
    row.forEach(square => {
      if (square > 1) {
        commonSquareInches += 1;
      }
    });
  });

  console.log('common squ in:', commonSquareInches);
}

main();

function getClaim(line: string): Claim {
  const claimRegEx = new RegExp(/#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/);
  const matches = line.match(claimRegEx);

  return {
    id: parseInt(matches[1]),
    x: parseInt(matches[2]),
    y: parseInt(matches[3]),
    width: parseInt(matches[4]),
    height: parseInt(matches[5]),
  };
}

function getStreamLines(stream): Promise<string[]> {
  return new Promise((resolve, reject) => {
    let contents = '';

    stream.on('error', (err) => {
      reject(err);
    });

    stream.on('data', (chunk) => {
      contents += chunk;
    });

    stream.on('end', () => {
      resolve(contents.split('\n'));
    });
  });
}
