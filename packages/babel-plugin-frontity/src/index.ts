import * as BabelTypes from "@babel/types";
import { Visitor, NodePath } from "@babel/traverse";

interface Babel {
  types: typeof BabelTypes;
}

type GetElementType<T extends Array<any>> = T extends (infer U)[] ? U : never;

type Imports = {
  [key: string]: string;
};

const defaultImports: Imports = {
  styled: "@emotion/styled"
};

const namedImports: Imports = {
  css: "@emotion/core",
  Global: "@emotion/core",
  keyframes: "@emotion/core"
};

const allNames = [...Object.keys(defaultImports), ...Object.keys(namedImports)];

function getMemberImports(
  specifier: GetElementType<
    NodePath<BabelTypes.ImportDeclaration>["node"]["specifiers"]
  >
): specifier is BabelTypes.ImportSpecifier {
  return specifier.type === "ImportSpecifier";
}

export default (babel: Babel): { name: string; visitor: Visitor } => {
  const types = babel.types;
  return {
    name: "frontity",
    visitor: {
      Program(programPath) {
        programPath.traverse({
          ImportDeclaration: function(
            path: NodePath<BabelTypes.ImportDeclaration>
          ) {
            const transforms: BabelTypes.ImportDeclaration[] = [];

            const source = path.node.source.value;

            if (source === "frontity") {
              const memberImports = path.node.specifiers.filter(
                getMemberImports
              );
              const hasImports = memberImports
                .map(memberImport => memberImport.imported.name)
                .filter(name => allNames.includes(name))
                .reduce(() => true, false);

              if (hasImports) {
                memberImports.forEach(memberImport => {
                  const memberName = memberImport.imported.name;

                  if (defaultImports[memberName]) {
                    transforms.push(
                      types.importDeclaration(
                        [
                          types.importDefaultSpecifier(
                            types.identifier(memberImport.local.name)
                          )
                        ],
                        types.stringLiteral(defaultImports[memberName])
                      )
                    );
                  } else if (namedImports[memberName]) {
                    transforms.push(
                      types.importDeclaration(
                        [memberImport],
                        types.stringLiteral(namedImports[memberName])
                      )
                    );
                  } else {
                    transforms.push(
                      types.importDeclaration(
                        [memberImport],
                        types.stringLiteral("frontity")
                      )
                    );
                  }
                });
              }
            }

            if (transforms.length > 0) {
              path.replaceWithMultiple(transforms);
            }
          }
        });
      }
    }
  };
};
