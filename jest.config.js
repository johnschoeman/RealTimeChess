const { defaults } = require("jest-config")

module.exports = {
  verbose: true,
  preset: "@testing-library/react-native",
  moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx"],
}
