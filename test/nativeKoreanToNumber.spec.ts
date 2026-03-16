import { nativeKoreanToNumber } from "../src/nativeKoreanToNumber";

describe("nativeKoreanToNumber", () => {
  test("기본 숫자", () => {
    expect(nativeKoreanToNumber("하나")).toBe(1);
    expect(nativeKoreanToNumber("둘")).toBe(2);
    expect(nativeKoreanToNumber("열")).toBe(10);
  });

  test("십의 자리 + 일의 자리", () => {
    expect(nativeKoreanToNumber("스물다섯")).toBe(25);
    expect(nativeKoreanToNumber("서른셋")).toBe(33);
    expect(nativeKoreanToNumber("아흔아홉")).toBe(99);
  });

  test("십의 자리만", () => {
    expect(nativeKoreanToNumber("스물")).toBe(20);
    expect(nativeKoreanToNumber("쉰")).toBe(50);
  });

  test("수 관형사", () => {
    expect(nativeKoreanToNumber("한")).toBe(1);
    expect(nativeKoreanToNumber("세")).toBe(3);
    expect(nativeKoreanToNumber("스무")).toBe(20);
  });

  test("빈 문자열", () => {
    expect(nativeKoreanToNumber("")).toBe(0);
  });
});
