import { formatNumber, formatNumberAll } from "../src/formatNumber";

describe("formatNumber", () => {
  test("1234", () => {
    expect(formatNumber(1234)).toEqual("1234");
  });

  test("12345678", () => {
    expect(formatNumber("12345678")).toEqual("1234만 5678");
  });

  test("0001", () => {
    expect(formatNumber("0001")).toEqual("1");
  });

  test("0001", () => {
    expect(formatNumber(123456789)).toEqual("1억 2345만 6789");
  });

  test("0001", () => {
    expect(formatNumber("1234567890123456")).toEqual(
      "1234조 5678억 9012만 3456"
    );
  });

  test("0001", () => {
    expect(formatNumber("0000000000000001")).toEqual("1");
  });

  test("숫자가 아닌 값", () => {
    expect(formatNumber("abc")).toEqual("");
    expect(formatNumber(null)).toEqual("");
    expect(formatNumber(undefined)).toEqual("");
  });
});

describe("formatNumberAll", () => {
  test("1234", () => {
    expect(formatNumberAll(1234)).toEqual("천이백삼십사");
  });

  test("12345678", () => {
    expect(formatNumberAll("12345678")).toEqual(
      "천이백삼십사만 오천육백칠십팔"
    );
  });

  test("0001", () => {
    expect(formatNumberAll("0001")).toEqual("일");
  });

  test("123456789", () => {
    expect(formatNumberAll(123456789)).toEqual(
      "일억 이천삼백사십오만 육천칠백팔십구"
    );
  });

  test("1234567890123456", () => {
    expect(formatNumberAll("1234567890123456")).toEqual(
      "천이백삼십사조 오천육백칠십팔억 구천십이만 삼천사백오십육"
    );
  });

  test("0000000000000001", () => {
    expect(formatNumberAll("0000000000000001")).toEqual("일");
  });

  test("숫자가 아닌 값", () => {
    expect(formatNumberAll("abc")).toEqual("");
    expect(formatNumberAll(null)).toEqual("");
    expect(formatNumberAll(undefined)).toEqual("");
  });
});
