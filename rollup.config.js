import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";

export default {
    input: "src/tushare.js",
    external: [
        "axios",
    ],
    plugins: [
        resolve(),
        babel({
            exclude: "node_modules/**",
            babelHelpers: 'bundled',
        }),
        commonjs(),
        terser(),
    ],
    output: [
        {
            file: "dist/tushare.js",
            format: "umd",
            name: 'tushare',
            sourcemap: true,
            globals: {
              axios: 'axios',
            },
        },
        {
            file: "dist/tushare.esm.js",
            format: "es",
        },
    ],
};
