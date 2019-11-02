const { defaults } = require("jest-config")
const babelTransformWhiteList =  [
  "react-native",
]

module.exports = {
  verbose: true,
  preset: "@testing-library/react-native",
  moduleNameMapper: {
    "\\.svg": "<rootDir>/src/__mocks__/svgMock.ts",
  },
  moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx"],
  transformIgnorePatterns: [
    `node_modules/(?!(${babelTransformWhiteList.join("|")}))`,
  ],
}
