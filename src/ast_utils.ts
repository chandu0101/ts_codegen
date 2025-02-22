import ts from "typescript";


abstract class ASTConstants {
    static PState = "PState";
}


export abstract class AstUtils {

    static transformImportNodeToGeneratedFolderImportNodes(input: ts.ImportDeclaration) {
        const ms = input.moduleSpecifier.getText()
        let result = input.getText()
        if (ms.startsWith("\"./") || ms.startsWith("'./")) {
            result = result.replace(".", "..")
        } else if (ms.startsWith("\"..") || ms.startsWith("'..")) {
            result = result.replace("..", "../..")
        }
        return ts.factory.createIdentifier(result)
    }

    /**
 *  Get Interface Names from Class Declaration
 * @param input 
 * @returns 
 */
    static getInterfaces(input: ts.ClassDeclaration): string[] {
        if (input.heritageClauses != undefined) {
            return input.heritageClauses!.filter(hc => hc.token === ts.SyntaxKind.ImplementsKeyword).flatMap(hc => {
                return hc.types.map(exa => ((exa.expression as ts.Identifier).escapedText as string));
            });
        }
        return [];
    }

    /**
     *  Reducer class checkpoint ,a class that implements PState
     * @param cl 
     * @returns 
     */
    static isReducerClass(cl: ts.ClassDeclaration) {
        const interfaces = AstUtils.getInterfaces(cl);
        return interfaces.find(i => i == ASTConstants.PState) != undefined;
    }
}

