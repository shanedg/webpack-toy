import * as fs from 'fs';

export type Claim = {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

function parseClaim(line: string): Claim {
  // e.g.
  // #1 @ 82,901: 26x12
  // #2 @ 8,540: 18x12
  // #3 @ 835,180: 23x13
  // #4 @ 690,544: 29x23
  // #5 @ 140,218: 18x12
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

export function getStreamLines(stream: fs.ReadStream): Promise<string[]> {
  return new Promise(createStreamPromiseCallback(stream));
}

const createStreamPromiseCallback = (stream: fs.ReadStream) => {
  return (resolve, reject) => {
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
  }
}

export const countOverlappingSquareInches = cloth => {
  let overlappingSquareInches = 0;
  cloth.forEach(row => {
    row.forEach(square => {
      if (square > 1) {
        overlappingSquareInches += 1;
      }
    });
  });

  return overlappingSquareInches;
}

export const readClaims = (line, claims, cloth) => {
  const claim = parseClaim(line);
  claims.push(claim);

  const yMax = claim.y + claim.height;
  const xMax = claim.x + claim.width
  for (let y = claim.y; y < yMax; y += 1) {
    for (let x = claim.x; x < xMax; x += 1) {
      cloth[y][x] += 1;
    }
  }
}

export const hasNoOverlap = (claim, cloth): boolean => {
  const yMax = claim.y + claim.height;
  const xMax = claim.x + claim.width;

  for (let y = claim.y; y < yMax; y += 1) {
    for (let x = claim.x; x < xMax; x += 1) {
      if (cloth[y][x] !== 1) {
        return false;
      }
    }
  }

  return true;
}