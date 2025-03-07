const data = {
  preset: "./jest-preset.js",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom/"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};

export default data;
