import * as BabelTypes from "@babel/types";
import { Visitor, NodePath } from "@babel/traverse";

interface Babel {
  types: typeof BabelTypes;
}

type GetElementType<T extends Array<BabelTypes.Node>> = T extends (infer U)[]
  ? U
  : never;

type Imports = {
  [key: string]: string;
};

// Named imports that end up as default imports.
const defaultImports: Imports = {
  // "import { styled } from 'frontity'" ==> "import styled from '@emotion/styled'"
  styled: "@emotion/styled",
};

// Named imports that end up as named imports.
const namedImports: Imports = {
  // "import { css } from 'frontity'" ==> "import { css } from '@emotion/core'"
  css: "@emotion/core",
  // "import { Global } from 'frontity'" ==> "import { Global } from '@emotion/core'"
  Global: "@emotion/core",
  // "import { keyframes } from 'frontity'" ==> "import { keyframes } from '@emotion/core'"
  keyframes: "@emotion/core",
};

// Import names that should be looking for in our "frontity" imports.
const allNames = [...Object.keys(defaultImports), ...Object.keys(namedImports)];

// Checks if the import is a ImportSpecifier. We are only interested on named imports
// because "frontity" doesn't have any default import (ImportDefaultSpecifier).
function isImportSpecifier(
  specifier: GetElementType<
    NodePath<BabelTypes.ImportDeclaration>["node"]["specifiers"]
  >
): specifier is BabelTypes.ImportSpecifier {
  return specifier.type === "ImportSpecifier";
}

// The main plugin.
export default (babel: Babel): { name: string; visitor: Visitor } => {
  const types = babel.types;
  return {
    name: "frontity",
    visitor: {
      // Use Program instead of ImportDeclaration because the Emotion plugin is also using
      // Program and this needs to be faster to be able to make the changes before emotion does.
      Program(programPath) {
        programPath.traverse({
          ImportDeclaration: function (
            path: NodePath<BabelTypes.ImportDeclaration>
          ) {
            // Array to store all the our import transforms.
            const transforms: BabelTypes.ImportDeclaration[] = [];

            if (path.node.source.value === "frontity") {
              // 1. Get only the named imports.
              const memberImports = path.node.specifiers.filter(
                isImportSpecifier
              );
              // 2. Check if any of them is one of the ones we have to substitute.
              const hasImports = memberImports
                .map((memberImport) => memberImport.imported.name)
                .filter((name) => allNames.includes(name))
                .reduce(() => true, false);

              if (hasImports) {
                memberImports.forEach((memberImport) => {
                  const memberName = memberImport.imported.name;

                  if (defaultImports[memberName]) {
                    // 3. For default imports, it needs to pass types.importDefaultSpecifier.
                    transforms.push(
                      types.importDeclaration(
                        [
                          types.importDefaultSpecifier(
                            types.identifier(memberImport.local.name)
                          ),
                        ],
                        types.stringLiteral(defaultImports[memberName])
                      )
                    );
                  } else if (namedImports[memberName]) {
                    // 4. For named imports, the member import is enough.
                    transforms.push(
                      types.importDeclaration(
                        [memberImport],
                        types.stringLiteral(namedImports[memberName])
                      )
                    );
                  } else {
                    // 5. The rest of the imports are just preserved under "frontity".
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

            // 6. Replace the original import with all the new imports.
            if (transforms.length > 0) {
              path.replaceWithMultiple(transforms);
            }
          },
        });
      },
    },
  };
};
