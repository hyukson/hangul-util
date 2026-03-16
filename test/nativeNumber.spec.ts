import {
  nativeKoreanNumber,
  counter,
  ordinal,
  sinoKoreanNumber,
} from "../src/nativeNumber";

describe("nativeKoreanNumber", () => {
  test("1~10", () => {
    expect(nativeKoreanNumber(1)).toBe("하나");
    expect(nativeKoreanNumber(5)).toBe("다섯");
    expect(nativeKoreanNumber(10)).toBe("열");
  });

  test("11~99", () => {
    expect(nativeKoreanNumber(11)).toBe("열하나");
    expect(nativeKoreanNumber(25)).toBe("스물다섯");
    expect(nativeKoreanNumber(99)).toBe("아흔아홉");
  });

  test("범위 밖", () => {
    expect(nativeKoreanNumber(0)).toBe("");
    expect(nativeKoreanNumber(100)).toBe("");
  });
});

describe("counter", () => {
  test("수 관형사 + 단위", () => {
    expect(counter(1, "명")).toBe("한 명");
    expect(counter(3, "개")).toBe("세 개");
    expect(counter(20, "살")).toBe("스무 살");
  });

  test("단위 없이", () => {
    expect(counter(5)).toBe("다섯");
  });
});

describe("ordinal", () => {
  test("서수사", () => {
    expect(ordinal(1)).toBe("첫째");
    expect(ordinal(2)).toBe("둘째");
    expect(ordinal(3)).toBe("셋째");
    expect(ordinal(11)).toBe("열하나째");
  });
});

describe("sinoKoreanNumber", () => {
  test("한자어 수사", () => {
    expect(sinoKoreanNumber(0)).toBe("영");
    expect(sinoKoreanNumber(1)).toBe("일");
    expect(sinoKoreanNumber(10)).toBe("십");
    expect(sinoKoreanNumber(123)).toBe("백이십삼");
    expect(sinoKoreanNumber(10000)).toBe("일만");
    expect(sinoKoreanNumber(12345)).toBe("일만이천삼백사십오");
  });
});
