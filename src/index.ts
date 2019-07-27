import * as lib from './lib';

function main() {

  try {
    lib.run();
  } catch(err) {
    console.error(err);
  }
}

main();
