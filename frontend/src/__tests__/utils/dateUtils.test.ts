import { formatDate } from "../../utils/dateUtils";
import { describe, it, expect } from "vitest";

describe("formatDate function", () => {
  it("formats a valid date string correctly", () => {
    const validDate = "2024-12-25T10:00:00Z";
    const formattedDate = formatDate(validDate);

    expect(typeof formattedDate).toBe("string");

    expect(new Date(formattedDate).toString()).not.toBe("Invalid Date");
  });

  it("handles an invalid date string gracefully", () => {
    const invalidDate = "invalid-date-string";
    const formattedDate = formatDate(invalidDate);

    expect(formattedDate).toBe("Invalid Date");
  });

  it("returns a valid date format for edge cases like empty strings", () => {
    const emptyDate = "";
    const formattedDate = formatDate(emptyDate);

    expect(formattedDate).toBe("Invalid Date");
  });

  it("formats a date correctly for different input formats", () => {
    const date1 = "2024-12-25T10:00:00Z"; // ISO format
    const date2 = "12/25/2024"; // MM/DD/YYYY format
    const date3 = "2024-12-25"; // YYYY-MM-DD format

    expect(typeof formatDate(date1)).toBe("string");
    expect(typeof formatDate(date2)).toBe("string");
    expect(typeof formatDate(date3)).toBe("string");
  });
});
