import ts from 'typescript';
import type { TransformerExtras, PluginConfig } from 'ts-patch';
import { AstUtils } from './ast_utils';
import { FileUtils } from './file_utils';
import { reducerTransformerFile } from './reducer/transformer';

/** Changes string literal 'before' to 'after' */
export default function (program: ts.Program, pluginConfig: PluginConfig, { ts: tsInstance }: TransformerExtras) {
    return (ctx: ts.TransformationContext) => {
        const { factory } = ctx;

        return (sourceFile: ts.SourceFile) => {
            function visit(node: ts.Node): ts.Node {
                if (tsInstance.isClassDeclaration(node) && AstUtils.isReducerClass(node)) {
                    console.log("class dec");
                    console.log(node.heritageClauses?.values.name);
                    // console.log(AstUtils.getInterfaces(node));
                    // FileUtils.writeFileSync("./src/gen.ts", "console.log('hello')");
                    reducerTransformerFile(sourceFile, ctx);
                    return node;
                }
                if (tsInstance.isStringLiteral(node) && node.text === 'before') {
                    return factory.createStringLiteral('after');
                }
                return tsInstance.visitEachChild(node, visit, ctx);
            }

            console.log("Hello Transformers2");
            helloAsync("async param");

            return tsInstance.visitNode(sourceFile, visit);
        };
    };
}

async function helloAsync(params: string) {
    console.log("Async dude");

    console.log(params);
    await FileUtils.writeFileAsync("./gen2.ts", "console.log('2')");
    console.log("await working");

}