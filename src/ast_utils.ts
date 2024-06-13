import ts from "typescript";


abstract class ASTConstants {
    static PState = "PState";
}


/**
 *  Get Interface Names from Class Declaration
 * @param input 
 * @returns 
 */
export function getInterfaces(input: ts.ClassDeclaration): string[] {
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
export function isReducerClass(cl: ts.ClassDeclaration) {
    const interfaces = getInterfaces(cl);
    return interfaces.find(i => i == ASTConstants.PState) != undefined;
}