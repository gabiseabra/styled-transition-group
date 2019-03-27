import cjs from "rollup-plugin-commonjs"
import babel from "rollup-plugin-babel"
import resolve from "rollup-plugin-node-resolve"
import pkg from "./package.json"

const include = [ "src/**" ]

const deps = Object.keys(pkg.dependencies).concat(Object.keys(pkg.peerDependencies))

const EXTERNALS = new RegExp(`^(${deps.join("|")})|node_modules`)

export default {
  input: "src/index.js",
  output: [
    { file: "dist/bundle.js", format: "cjs" },
    { file: "dist/bundle.es.js", format: "es" }
  ],
  external: name => EXTERNALS.test(name),
  plugins: [
    resolve({ extensions: [ ".js", ".jsx" ] }),
    cjs({
      exclude: include
    }),
    babel({
      include,
      babelrc: false,
      presets: [ [ "env", { modules: false } ], "stage-1", "react" ],
      plugins: [ "external-helpers" ]
    })
  ]
}
