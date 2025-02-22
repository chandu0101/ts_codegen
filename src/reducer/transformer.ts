import ts from "typescript";
import { AstUtils } from "../ast_utils";
import { FileUtils } from "../file_utils";


const reducerTransformer: ts.TransformerFactory<ts.Node> = context => {
    const visit: ts.Visitor = node => {
        
        if (ts.isClassDeclaration(node)) {
            console.log("class found and processing");
            // return createReducerFunction(node);
            return node;
        }
        if (ts.isImportDeclaration(node)) {
            return AstUtils.transformImportNodeToGeneratedFolderImportNodes(node)
        }
        if (ts.isStringLiteral(node) && node.text === 'before') {

            return ts.factory.createStringLiteral('after');
        }
        return node;
        
        ts.visitEachChild(node, visit, context);
        
    };

    return node => ts.visitEachChild(node, visit, context);
};

export function reducerTransformerFile(sourceFile: ts.SourceFile, ctx: ts.TransformationContext) {

    const newSf = ts.transform(sourceFile, [reducerTransformer]).transformed[0];
    const printer = ts.createPrinter();
    const transformedContent = printer.printFile(newSf as ts.SourceFile)

    // const outFile = ConfigUtils.getOutputPathForReducerSourceFile(file)
    // console.log("******* writing to out file : ", outFile);
    // console.log("outFile : ", outFile);
    FileUtils.writeFileSync("./gen.ts", transformedContent);
};