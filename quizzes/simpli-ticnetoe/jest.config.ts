import type {JestConfigWithTsJest} from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
    roots: ['<rootDir>'],
    testEnvironment: "node",
    transform: {
        "^.+\.ts?$": ["ts-jest", {}],
    },
    moduleNameMapper: {
        '^@src/(.*)$': '<rootDir>/src/$1',
    },
}

export default jestConfig
