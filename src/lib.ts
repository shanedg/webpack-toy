import fs from 'fs';
import { range as _range } from 'lodash-es';

export type Claim = {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export default class ClaimLib {

  async run() {
    const path = 'input.txt';
    const options = {
      encoding: 'UTF-8',
    };

    const cloth = _range(0, 1000).map(() => _range(0, 1000, 0));
    const claims: Claim[] = [];

    const stream = fs.createReadStream(path, options);
    const lines = await this.getStreamLines(stream);
    lines.forEach(line => this.readClaims(line, claims, cloth));

    const overlap = this.countOverlappingSquareInches(cloth);
    console.log('common squ in:', overlap);

    const claimsWithoutOverlap = claims.filter(claim => this.hasNoOverlap(claim, cloth));
    console.log('claims w/o overlap:\n', claimsWithoutOverlap);
  }

  parseClaim(line: string): Claim {
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

  getStreamLines(stream: fs.ReadStream): Promise<string[]> {
    return new Promise(this.createStreamPromiseCallback(stream));
  }

  createStreamPromiseCallback = (stream: fs.ReadStream) => {
    return (resolve: Function, reject: Function) => {
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

  countOverlappingSquareInches = (cloth: number[][]) => {
    let overlappingSquareInches = 0;
    cloth.forEach((row: number[]) => {
      row.forEach(square => {
        if (square > 1) {
          overlappingSquareInches += 1;
        }
      });
    });

    return overlappingSquareInches;
  }

  readClaims = (line: string, claims: Claim[], cloth: number[][]) => {
    const claim = this.parseClaim(line);
    claims.push(claim);

    const yMax = claim.y + claim.height;
    const xMax = claim.x + claim.width
    for (let y = claim.y; y < yMax; y += 1) {
      for (let x = claim.x; x < xMax; x += 1) {
        cloth[y][x] += 1;
      }
    }
  }

  hasNoOverlap = (claim: Claim, cloth: number[][]): boolean => {
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
}
