process.env.JWT_SECRET = 'tuyqteqwt';

export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  setupFiles: ['dotenv/config'], // Globally preloads .env variables
  globals: {
    JWT_SECRET: 'tuyqteqwt',
  },
};
