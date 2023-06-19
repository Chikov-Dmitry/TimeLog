import * as process from 'process';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  MONGO_DATABASE: process.env.MONGO_DATABASE,
  MONGO_DATABASE_URL: process.env.MONGO_DATABASE_URL,
  jwt: {
    access_secret: process.env.JWT_ACCESS_SECRET,
    access_expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
    refresh_expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  },
});
