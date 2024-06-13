import ts from 'typescript';
import type { TransformerExtras, PluginConfig } from 'ts-patch';
import { getInterfaces, isReducerClass } from './ast_utils';
import { FileUtils } from './file_utils';

/** Changes string literal 'before' to 'after' */
export default function (program: ts.Program, pluginConfig: PluginConfig, { ts: tsInstance }: TransformerExtras) {
    return (ctx: ts.TransformationContext) => {
        const { factory } = ctx;

        return (sourceFile: ts.SourceFile) => {
            function visit(node: ts.Node): ts.Node {
                if (tsInstance.isClassDeclaration(node) && isReducerClass(node)) {
                    console.log("class dec");
                    console.log(node.heritageClauses?.values.name);
                    console.log(getInterfaces(node));
                    FileUtils.writeFileSync("./src/gen.ts", "console.log('hello')");
                    return node;
                }
                if (tsInstance.isStringLiteral(node) && node.text === 'before') {
                    processAsync();
                    return factory.createStringLiteral('after');
                }
                return tsInstance.visitEachChild(node, visit, ctx);
            }

            console.log("Hello Transformers2");
            return tsInstance.visitNode(sourceFile, visit);
        };
    };
}

async function hello() {
    console.log("async here");
}

async function processAsync() {
    hello();
    console.log("dude");
}

