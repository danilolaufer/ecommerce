const winston = require('winston');
const config = require("./config")

const customLevelsOptions = {
  levels: {
      fatal: 0,
      error: 1,
      warn: 2,
      info: 3,
      debug: 4
  },
  colors: {
      fatal: 'red',
      error: 'orange',
      warn: 'yellow',
      info: 'blue',
      debug: 'white'
  }
};

const devLogger = winston.createLogger({
  //Niveles:
  levels: customLevelsOptions.levels,
  transports: [
      new winston.transports.Console(
          {
              level: "info",
              format: winston.format.combine(
                  winston.format.colorize({colors: customLevelsOptions.colors}),
                  winston.format.simple()
              )
          }
      ),
      new winston.transports.File(
          {
              filename: './errors.log', 
              level: 'error', 
              format: winston.format.simple()
          }
      )
  ]
});

const prodLogger = winston.createLogger({
  transports: [
      new winston.transports.Console({level: "info"}),
      new winston.transports.File({filename: './errors.log', level: 'warn'})
  ]
});

module.exports = {
  developmentLogger,
  productionLogger,
};
