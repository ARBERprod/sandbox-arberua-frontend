import { getNonTranslatedTSXFilesPaths } from './helpers/getNonTranslatedTSXFilesPaths';

const paths = getNonTranslatedTSXFilesPaths();
// eslint-disable-next-line no-restricted-syntax
for (const path of paths) {
  console.log(path);
}

console.log('Total:', paths.length);
