import fs from "fs";
import { logger } from "../../logger/customerLogger";
import path from "path";

// Mock dependencies
jest.mock("fs", () => ({
  appendFile: jest.fn(),
  existsSync: jest.fn(() => false),
  mkdirSync: jest.fn(),
}));

jest.mock("../../utils/getTimestamp", () => ({
  getTimeStamp: jest.fn(() => "2024-12-23T12:00:00Z"),
}));

jest.mock("../../logger/loggerConfig", () => ({
  LOGGER_CONFIG: {
    logFilePath: "./data/logs/app.log",
    logLevels: ["info", "warn", "error", "debug"],
  },
}));

describe("CustomLogger", () => {
  const logFilePath = path.resolve("./data/logs/app.log");
  const logDir = path.dirname(logFilePath);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should log info messages to the file", async () => {
    const message = "Info message";
    const logEntry = "[2024-12-23T12:00:00Z] [INFO]: Info message\n";

    await logger.info(message);

    expect(fs.appendFile).toHaveBeenCalledWith(
      logFilePath,
      logEntry,
      expect.any(Function)
    );
  });
  it("should log warn messages to the file", async () => {
    const message = "Warn message";
    const logEntry = "[2024-12-23T12:00:00Z] [WARN]: Warn message\n";

    await logger.warn(message);

    expect(fs.appendFile).toHaveBeenCalledWith(
      logFilePath,
      logEntry,
      expect.any(Function)
    );
  });

  it("should log error messages to the file", async () => {
    const message = "Error message";
    const logEntry = "[2024-12-23T12:00:00Z] [ERROR]: Error message\n";

    await logger.error(message);

    expect(fs.appendFile).toHaveBeenCalledWith(
      logFilePath,
      logEntry,
      expect.any(Function)
    );
  });

  it("should log debug messages to the file", async () => {
    const message = "Debug message";
    const logEntry = "[2024-12-23T12:00:00Z] [DEBUG]: Debug message\n";

    await logger.debug(message);

    expect(fs.appendFile).toHaveBeenCalledWith(
      logFilePath,
      logEntry,
      expect.any(Function)
    );
  });

  it("should throw an error for unsupported log levels", async () => {
    const unsupportedLevel = "trace";
    const message = "This is a trace message";

    await expect(logger.log(unsupportedLevel, message)).rejects.toThrowError(
      `Unsupported log level: ${unsupportedLevel}`
    );
  });
});
