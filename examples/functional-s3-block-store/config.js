module.exports = {
  secure:     process.env.S3_SECURE     !== 'true' ? false : true,
  port:       process.env.S3_PORT       || 9000,
  endPoint:   process.env.S3_ENDPOINT   || 'localhost',
  accessKey:  process.env.S3_ACCESS_KEY || 'admin',
  secretKey:  process.env.S3_SECRET_KEY || 'test',
}
