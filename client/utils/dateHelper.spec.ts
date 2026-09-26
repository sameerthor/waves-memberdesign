import { describe, expect, it } from "vitest";
import {
  formatDateLongForDisplay,
  parseLocalDate,
} from "@/utils/dateHelper";

describe("dateHelper local calendar dates", () => {
  it("parses YYYY-MM-DD as local midnight without UTC shift", () => {
    const date = parseLocalDate("2026-07-20");
    expect(date.getFullYear()).toBe(2026);
    expect(date.getMonth()).toBe(6);
    expect(date.getDate()).toBe(20);
  });

  it("formats long display using the same calendar day as selected", () => {
    const label = formatDateLongForDisplay("2026-07-20");
    expect(label).toContain("July");
    expect(label).toContain("20");
    expect(label).toContain("2026");
    expect(label).not.toMatch(/July 19/);
  });
});
