import * as process from 'process';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  MONGO_DATABASE: process.env.MONGO_DATABASE,
});
