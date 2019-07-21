import * as fs from 'fs';

function main() {
  const path = 'input.txt';
  const options = {
    encoding: 'UTF-8',
  };

  const stream = fs.createReadStream(path, options);
  stream.on('data', (chunk) => {
    console.log(`${chunk}\nlength: ${chunk.length}`);
  });

  stream.on('end', () => {
    console.log('over');
  });
}

main();
