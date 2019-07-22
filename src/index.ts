import * as fs from 'fs';
import * as _ from 'lodash';

import {
  Claim,
  getStreamLines,
  readClaims,
  countOverlappingSquareInches,
  hasNoOverlap,
} from './lib';

async function main() {
  const path = 'input.txt';
  const options = {
    encoding: 'UTF-8',
  };

  try {
    const cloth = _.range(0, 1000).map(() => _.range(0, 1000, 0));
    const claims: Claim[] = [];

    const stream = fs.createReadStream(path, options);
    const lines = await getStreamLines(stream);
    lines.forEach(line => readClaims(line, claims, cloth));

    const overlap = countOverlappingSquareInches(cloth);
    console.log('common squ in:', overlap);

    const claimsWithoutOverlap = claims.filter(claim => hasNoOverlap(claim, cloth));
    console.log('claims w/o overlap:\n', claimsWithoutOverlap);

  } catch(err) {
    console.error(err);
  }
}

main();
