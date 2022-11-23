export default () => ({
  port: parseInt(process.env.PORT, 10),
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRESIN,
  },
  kakao: {
    clientID: process.env.KAKAO_CLIENT_ID,
    clientSecret: process.env.KAKAO_CLIENT_SECRET,
    callbackURL: process.env.KAKAO_CALLBACK_URL,
  },
  naver: {
    clientID: process.env.NAVER_CLIENT_ID,
    clientSecret: process.env.NAVER_CLIENT_SECRET,
    callbackURL: process.env.NAVER_CALLBACK_URL,
  },
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  seoul: {
    eventSecret: process.env.SEOUL_EVENT_SECRET,
    densitySecret: process.env.SEOUL_DENSITY_SECRET,
  },
  database: {
    database: process.env.DATABASE,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  },
  debug: {
    log: process.env.DEBUG_LOG === 'true' ? true : false,
  },
});
