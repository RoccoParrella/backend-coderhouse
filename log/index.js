const logger = require("./pino");

module.exports = {
    log: (msg, level = "info") => logger.info(msg),
    warn: (msg) => logger.warn(msg),
    error: (msg) => logger.error(msg),
    info: (msg) => logger.info(msg),
}