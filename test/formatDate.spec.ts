import { formatDate } from "../src/formatDate";

const date = "2022-02-22 22:22:22";

describe("formatDate", () => {
  test("formatStyle 기본값 - new Date()", () => {
    expect(formatDate(date)).toEqual("2022년02월22일 22시22분22초");
  });

  test("formatStyle 기본값 - String", () => {
    expect(formatDate(date)).toEqual("2022년02월22일 22시22분22초");
  });

  test("HH:mm:ss YYYY년 MM월", () => {
    expect(formatDate(date, "HH:mm:ss YYYY년 MM월")).toEqual(
      "22:22:22 2022년 02월"
    );
  });

  test("YYYY년 MM월 DD일 dd요일 HH:mm:ss", () => {
    expect(formatDate(date, "YYYY년 MM월 DD일 dd요일 HH:mm:ss")).toEqual(
      "2022년 02월 22일 화요일 22:22:22"
    );
  });

  test("YYYY-MM-DD HH:mm:ss", () => {
    expect(formatDate(date, "YYYY-MM-DD HH:mm:ss")).toEqual("2022-02-22 22:22:22");
  });
});
