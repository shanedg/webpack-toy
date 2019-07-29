import ClaimLib from './lib';

function main() {

  try {
    new ClaimLib().run();
  } catch(err) {
    console.error(err);
  }
}

main();
