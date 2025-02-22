import { GENERATED_FOLDER, GEN_SUFFIX, REDUCERS_FOLDER } from "./constants"
import { resolve, join, dirname, sep } from "path";

export abstract class ConfigUtils {
    static getOutputPathForReducerSourceFile(file: string) {
        const reducers = `${sep}${REDUCERS_FOLDER}${sep}`
        const genReducers = `${reducers}${GENERATED_FOLDER}${sep}`
        return file.replace(reducers, genReducers).replace(".ts", `${GEN_SUFFIX}.ts`)
    }
}