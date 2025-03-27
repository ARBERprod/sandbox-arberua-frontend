import { Project, SyntaxKind, Node } from 'ts-morph';

const hasTransParent = (node: Node | undefined): boolean => {
  if (!node) return false;
  if (node.getKind() === SyntaxKind.JsxElement) {
    const openingElement = node.getFirstChildByKind(SyntaxKind.JsxOpeningElement);
    const tagName = openingElement?.getFirstChildByKind(SyntaxKind.Identifier)?.getText();
    if (tagName === 'Trans') {
      return true;
    }
  }

  return node.getParent() ? hasTransParent(node.getParent()) : false;
};

export const getNonTranslatedTSXFilesPaths = () => {
  const project = new Project();
  const result: string[] = [];

  project.addSourceFilesAtPaths([
    'src/**/*.tsx',
    '!src/**/*.stories.tsx',
    '!src/**/*mock*/*.tsx',
    '!src/**/*.test.tsx',
  ]);

  const files = project.getSourceFiles();

  files.forEach((file) => {
    let alreadyExist = false;
    file.forEachDescendant((node) => {
      if (node.isKind(SyntaxKind.JsxText) || node.isKind(SyntaxKind.StringLiteral)) {
        const text = node.getText();
        const cyrillicRegExp = /[А-Яа-я]+/g;
        if (cyrillicRegExp.test(text)) {
          if (!hasTransParent(node)) {
            if (!alreadyExist) {
              result.push(file.getFilePath().toString());
              alreadyExist = true;
            }
          }
        }
      }
    });
  });

  return result;
};
