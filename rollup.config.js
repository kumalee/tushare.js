import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/main.ts",
  external: ["axios"],
  plugins: [
    typescript(),
    resolve(),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled",
    }),
    commonjs(),
    terser(),
  ],
  output: [
    {
      file: "dist/tushare.js",
      format: "umd",
      name: "tushare",
      sourcemap: true,
      globals: {
        axios: "axios",
      },
    },
    {
      file: "dist/tushare.esm.js",
      format: "es",
    },
  ],
};
