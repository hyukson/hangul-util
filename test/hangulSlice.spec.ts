import { hangulToJamo, hangulSlice, hangulJamoLength } from "../src/hangulSlice";

describe("hangulToJamo", () => {
  test("기본 분해", () => {
    expect(hangulToJamo("한")).toEqual(["ㅎ", "ㅏ", "ㄴ"]);
    expect(hangulToJamo("가")).toEqual(["ㄱ", "ㅏ"]);
  });

  test("복합 모음 분해", () => {
    expect(hangulToJamo("왜")).toEqual(["ㅇ", "ㅗ", "ㅐ"]);
  });

  test("복합 종성 분해", () => {
    expect(hangulToJamo("닭")).toEqual(["ㄷ", "ㅏ", "ㄹ", "ㄱ"]);
  });

  test("비한글", () => {
    expect(hangulToJamo("a1")).toEqual(["a", "1"]);
  });
});

describe("hangulSlice", () => {
  test("자모 단위 슬라이스", () => {
    expect(hangulSlice("한글", 0, 2)).toBe("하");
    expect(hangulSlice("한글", 0, 3)).toBe("한");
    expect(hangulSlice("한글", 0, 4)).toBe("한ㄱ");
    expect(hangulSlice("한글", 0, 5)).toBe("한그");
    expect(hangulSlice("한글", 0, 6)).toBe("한글");
  });

  test("시작 인덱스", () => {
    expect(hangulSlice("한글", 3)).toBe("글");
  });
});

describe("hangulJamoLength", () => {
  test("자모 길이", () => {
    expect(hangulJamoLength("한글")).toBe(6);
    expect(hangulJamoLength("가나")).toBe(4);
    expect(hangulJamoLength("a")).toBe(1);
  });
});
