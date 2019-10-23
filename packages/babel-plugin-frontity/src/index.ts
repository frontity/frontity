import * as types from "@babel/types";

const defaultImports = {
  styled: "@emotion/styled"
};

const namedImports = {
  css: "@emotion/core",
  Global: "@emotion/core",
  keyframes: "@emotion/core"
};

const allNames = [...Object.keys(defaultImports), ...Object.keys(namedImports)];

export default () => ({
  name: "frontity",
  visitor: {
    ImportDeclaration: function(path) {
      const transforms = [];

      const source = path.node.source.value;

      if (source === "frontity") {
        const memberImports = path.node.specifiers.filter(function(specifier) {
          return specifier.type === "ImportSpecifier";
        });
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
  }
});
