import fs from 'fs';
import _ from 'lodash';

import * as lib from './lib';

async function main() {
  const path = 'input.txt';
  const options = {
    encoding: 'UTF-8',
  };

  try {
    const cloth = _.range(0, 1000).map(() => _.range(0, 1000, 0));
    const claims: lib.Claim[] = [];

    const stream = fs.createReadStream(path, options);
    const lines = await lib.getStreamLines(stream);
    lines.forEach(line => lib.readClaims(line, claims, cloth));

    const overlap = lib.countOverlappingSquareInches(cloth);
    console.log('common squ in:', overlap);

    const claimsWithoutOverlap = claims.filter(claim => lib.hasNoOverlap(claim, cloth));
    console.log('claims w/o overlap:\n', claimsWithoutOverlap);

  } catch(err) {
    console.error(err);
  }
}

main();
