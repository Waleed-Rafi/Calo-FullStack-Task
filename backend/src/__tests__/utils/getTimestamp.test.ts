import { getTimeStamp } from "../../utils/getTimestamp";

const mockDate = new Date(2024, 11, 23, 12, 30, 45);
global.Date = jest.fn(() => mockDate) as unknown as DateConstructor;

global.Date.now = jest.fn(() => mockDate.getTime());
global.Date.parse = jest.fn(Date.parse);
global.Date.UTC = jest.fn(Date.UTC);

describe("getTimeStamp", () => {
  it("should return the formatted current timestamp", () => {
    const timestamp = getTimeStamp();
    expect(timestamp).toBe("2024-12-23T12:30:45");
  });
});
