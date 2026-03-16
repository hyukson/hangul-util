import { hangulToNumber } from "../src/hangulToNumber";

describe("hangulToNumber", () => {
  test("기본 변환", () => {
    expect(hangulToNumber("일")).toBe(1);
    expect(hangulToNumber("십")).toBe(10);
    expect(hangulToNumber("백")).toBe(100);
    expect(hangulToNumber("천")).toBe(1000);
  });

  test("복합 숫자", () => {
    expect(hangulToNumber("백이십삼")).toBe(123);
    expect(hangulToNumber("삼천사백오십육")).toBe(3456);
  });

  test("만 단위 이상", () => {
    expect(hangulToNumber("만")).toBe(10000);
    expect(hangulToNumber("삼만 오천")).toBe(35000);
    expect(hangulToNumber("일억")).toBe(100000000);
    expect(hangulToNumber("일억 이천삼백만")).toBe(123000000);
  });

  test("빈 문자열", () => {
    expect(hangulToNumber("")).toBe(0);
  });
});
