import fs from "fs";
import path from "path";
import { promisify } from "util";
import { LOGGER_CONFIG } from "./loggerConfig";
import { getTimeStamp } from "../utils/getTimestamp";

const appendFileAsync = promisify(fs.appendFile);

class CustomLogger {
  private logFilePath: string;
  private logLevels: string[];

  constructor() {
    this.logFilePath = path.resolve(LOGGER_CONFIG.logFilePath);
    this.logLevels = LOGGER_CONFIG.logLevels;

    const logDir = path.dirname(this.logFilePath);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
  }

  private formatLog(level: string, message: string): string {
    const timestamp = getTimeStamp();
    return `[${timestamp}] [${level.toUpperCase()}]: ${message}\n`;
  }

  async log(level: string, message: string) {
    console.log(level, " : ", message);
    if (!this.logLevels.includes(level)) {
      throw new Error(`Unsupported log level: ${level}`);
    }

    const logEntry = this.formatLog(level, message);

    try {
      await appendFileAsync(this.logFilePath, logEntry);
    } catch (error) {
      console.error("Failed to write log:", error);
    }
  }

  info(message: string) {
    this.log("info", message);
  }

  warn(message: string) {
    this.log("warn", message);
  }

  error(message: string) {
    this.log("error", message);
  }

  debug(message: string) {
    this.log("debug", message);
  }
}

export const logger = new CustomLogger();
