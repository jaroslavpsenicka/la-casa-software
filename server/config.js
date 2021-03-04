import path from 'path';

const config = {

  morgan: {
    enabled: false,
    options: {
      theme: "dimmed",
    },
  },
  log4js: {
    appenders: {
      console: {
        type: "stdout",
        layout: {
          type: "colored",
        },
      },
    },
    categories: {
      default: {
        appenders: ["console"],
        level: process.env.LOG_LEVEL || "debug",
      },
    },
  },
  express: {
    level: "info",
    format: (req, res, format) => format(`:remote-addr :method :url ${JSON.stringify(req.body)} - :status`),
    statusRules: [
      { from: 200, to: 399, level: "info" },
      { from: 400, to: 599, level: "warn" },
    ],
  },
  csv: {
    options: { 
      headers: true, 
      delimiter: ',' 
    }
  },
  swagger: {
    basedir: path.resolve(),
    files: ["./routes/news.js"],
    swaggerDefinition: {
      info: {
        title: "LaCasa API",
        version: "0.1.0",
      },
    },
  }
}

export default config;