export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  setupFiles: ['dotenv/config'], // Globally preloads .env variables
  environment: {
    JWT_SECRET: 'tuyqteqwt',
  },
};
