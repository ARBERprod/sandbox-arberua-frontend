import { getNonTranslatedTypescriptFilePaths } from './helpers/getNonTranslatedTypescriptFilePaths';

const files = getNonTranslatedTypescriptFilePaths();

// eslint-disable-next-line no-restricted-syntax
for (const file of files) {
  console.log(file);
}

console.log('Total:', files.length);
