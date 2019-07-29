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

  /**
   * Run the Advent of Code 2018 - Day 3 claim analysis.
   */
  async run() {
    const path = 'input.txt';
    const options = {
      encoding: 'UTF-8',
    };

    const cloth = _range(0, 1000).map(() => _range(0, 1000, 0));
    const claims: Claim[] = [];

    const stream = fs.createReadStream(path, options);
    const lines = await this.getStreamLines(stream);
    lines.forEach(line => this.readClaim(line, claims, cloth));

    const overlap = this.countOverlappingSquareInches(cloth);
    console.log('common squ in:', overlap);

    const claimsWithoutOverlap = claims.filter(claim => this.hasNoOverlap(claim, cloth));
    console.log('claims w/o overlap:\n', claimsWithoutOverlap);
  }

  /**
   * Parse a claim from a line of input
   * @param line String-encoded claim
   */
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

  /**
   * Wrap input file lines stream in a promise.
   * @param stream Input file stream
   */
  getStreamLines(stream: fs.ReadStream): Promise<string[]> {
    return new Promise(this.createStreamPromiseCallback(stream));
  }

  /**
   * Partially apply the provided stream to a new function for use as a promise callback.
   * @param stream Input file stream
   */
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

  /**
   * Traverse the cloth after adding claims and count the number of square inches with >1 claim.
   * @param cloth Cloth populated with claims
   */
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

  /**
   * Process each line of input, record and update the cloth with each claim.
   * @param line A single, string-encoded claim
   * @param claims List of all claims seen so far
   * @param cloth Cloth populated with claims seen so far
   */
  readClaim = (line: string, claims: Claim[], cloth: number[][]) => {
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

  /**
   * Traverse the area of the cloth defined by a claim and report whether there is overlap.
   * @param claim Claim to check for overlap
   * @param cloth Cloth populated with claims
   */
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
