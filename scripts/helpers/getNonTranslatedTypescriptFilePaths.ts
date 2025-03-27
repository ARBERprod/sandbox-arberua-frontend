import { Project, SyntaxKind } from 'ts-morph';

export const getNonTranslatedTypescriptFilePaths = () => {
  const result: string[] = [];
  const project = new Project();

  project.addSourceFilesAtPaths([
    'src/**/*.ts',
    '!src/**/*mock*/*.ts',
    '!src/**/*{m,M}ock*.ts',
    '!src/**/*.test.ts',
  ]);

  const files = project.getSourceFiles();

  files.forEach((file) => {
    let alreadyExist = false;
    file.forEachDescendant((node) => {
      if (
        node.isKind(SyntaxKind.JsxText)
        || node.isKind(SyntaxKind.StringLiteral)
        || node.isKind(SyntaxKind.NoSubstitutionTemplateLiteral)
      ) {
        const text = node.getText();
        const cyrillicRegExp = /[А-Яа-я]+/g;
        if (cyrillicRegExp.test(text)) {
          if (!alreadyExist) {
            result.push(file.getFilePath().toString());
            alreadyExist = true;
          }
        }
      }
    });
  });
  return result;
};
