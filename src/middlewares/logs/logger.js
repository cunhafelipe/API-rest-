const winston = require("winston");

const logConfiguration = {
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "logs/server.log",
    }),
  ],
  format: winston.format.combine(
    winston.format.timestamp({
      format: "DD-MMM-YYYY HH:mm:ss",
    }),
    winston.format.printf(
      (info) =>
        `[${info.level.toUpperCase()}] (${[info.timestamp]}): ${info.message}`
    )
  ),
};

const logger = winston.createLogger(logConfiguration);

module.exports = logger;
