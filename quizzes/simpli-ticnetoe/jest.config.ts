import type {JestConfigWithTsJest} from 'ts-jest'

process.env.ENV = 'test';
process.env.LOG_LEVEL = 'trace';

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
