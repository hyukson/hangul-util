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

  test("항하사", () => {
    expect(
      formatNumber("10000000000000000000000000000000000000000000000000000000")
    ).toEqual("1000항하사");
    expect(
      formatNumberAll(
        "10000000000000000000000000000000000000000000000000000000"
      )
    ).toEqual("천항하사");
  });
  test("아승기", () => {
    expect(
      formatNumber(
        "100000000000000000000000000000000000000000000000000000000000"
      )
    ).toEqual("1000아승기");
    expect(
      formatNumberAll(
        "100000000000000000000000000000000000000000000000000000000000"
      )
    ).toEqual("천아승기");
  });
  test("나유타", () => {
    expect(
      formatNumber(
        "1000000000000000000000000000000000000000000000000000000000000000"
      )
    ).toEqual("1000나유타");
    expect(
      formatNumberAll(
        "1000000000000000000000000000000000000000000000000000000000000000"
      )
    ).toEqual("천나유타");
  });
  test("천무량대수 ", () => {
    expect(
      formatNumber(
        "100000000000000000000000000000000000000000000000000000000000000000000000"
      )
    ).toEqual("1000무량대수");
    expect(
      formatNumberAll(
        "100000000000000000000000000000000000000000000000000000000000000000000000"
      )
    ).toEqual("천무량대수");
  });
  test("범위초과", () => {
    expect(
      formatNumberAll(
        "1000000000000000000000000000000000000000000000000000000000000000000000000"
      )
    ).toEqual("범위초과");
  });

  test("숫자가 아닌 값", () => {
    expect(formatNumberAll("abc")).toEqual("");
    expect(formatNumberAll(null)).toEqual("");
    expect(formatNumberAll(undefined)).toEqual("");
  });
});
