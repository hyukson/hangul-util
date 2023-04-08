import { divide, divideHangul, divideHangulByGroups } from "../src/divide";

describe("divide", () => {
  test("한글이 아닌 값", () => {
    expect(divide("a")).toEqual(["a"]);
  });

  test("한", () => {
    expect(divide("한")).toEqual(["ㅎ", "ㅏ", "ㄴ"]);
  });

  test("한 - object", () => {
    expect(divide("한", { resultType: "object" })).toEqual({
      cho: "ㅎ",
      jung: "ㅏ",
      jong: "ㄴ",
    });
  });

  test("한 - string", () => {
    expect(divide("한", { resultType: "string" })).toEqual("ㅎㅏㄴ");
  });

  test("빵", () => {
    expect(divide("빵")).toEqual(["ㅃ", "ㅏ", "ㅇ"]);
  });

  test("뷁", () => {
    expect(divide("뷁", { isSplit: true })).toEqual([
      "ㅂ",
      "ㅜ",
      "ㅔ",
      "ㄹ",
      "ㄱ",
    ]);
    expect(divide("뷁", { isSplit: false })).toEqual(["ㅂ", "ㅞ", "ㄺ"]);
  });
});

describe("divideHangulByGroups", () => {
  test("빈값", () => {
    expect(divideHangulByGroups("")).toEqual([]);
  });

  test("안녕하세요", () => {
    expect(divideHangulByGroups("안녕하세요")).toEqual([
      ["ㅇ", "ㅏ", "ㄴ"],
      ["ㄴ", "ㅕ", "ㅇ"],
      ["ㅎ", "ㅏ"],
      ["ㅅ", "ㅔ"],
      ["ㅇ", "ㅛ"],
    ]);
  });

  test("Hello, 안녕하세요", () => {
    expect(divideHangulByGroups("Hello, 안녕하세요")).toEqual([
      ["H"],
      ["e"],
      ["l"],
      ["l"],
      ["o"],
      [","],
      [" "],
      ["ㅇ", "ㅏ", "ㄴ"],
      ["ㄴ", "ㅕ", "ㅇ"],
      ["ㅎ", "ㅏ"],
      ["ㅅ", "ㅔ"],
      ["ㅇ", "ㅛ"],
    ]);
  });

  test("값뷁쇏", () => {
    expect(divideHangulByGroups("값뷁ㅅ쇏")).toEqual([
      ["ㄱ", "ㅏ", "ㅂ", "ㅅ"],
      ["ㅂ", "ㅜ", "ㅔ", "ㄹ", "ㄱ"],
      ["ㅅ"],
      ["ㅅ", "ㅗ", "ㅐ", "ㄹ", "ㅂ"],
    ]);
    expect(divideHangulByGroups("값뷁ㅅ쇏", { isSplit: false })).toEqual([
      ["ㄱ", "ㅏ", "ㅄ"],
      ["ㅂ", "ㅞ", "ㄺ"],
      ["ㅅ"],
      ["ㅅ", "ㅙ", "ㄼ"],
    ]);
  });
});

describe("divideHangul", () => {
  test("빈값", () => {
    expect(divideHangul("")).toEqual([]);
  });

  test("안녕하세요", () => {
    expect(divideHangul("안녕하세요")).toEqual([
      "ㅇ",
      "ㅏ",
      "ㄴ",
      "ㄴ",
      "ㅕ",
      "ㅇ",
      "ㅎ",
      "ㅏ",
      "ㅅ",
      "ㅔ",
      "ㅇ",
      "ㅛ",
    ]);
  });

  test("Hello, 안녕하세요", () => {
    expect(divideHangul("Hello, 안녕하세요")).toEqual([
      "H",
      "e",
      "l",
      "l",
      "o",
      ",",
      " ",
      "ㅇ",
      "ㅏ",
      "ㄴ",
      "ㄴ",
      "ㅕ",
      "ㅇ",
      "ㅎ",
      "ㅏ",
      "ㅅ",
      "ㅔ",
      "ㅇ",
      "ㅛ",
    ]);
  });

  test("값뷁쇏", () => {
    expect(divideHangul("값뷁쇏")).toEqual([
      "ㄱ",
      "ㅏ",
      "ㅂ",
      "ㅅ",
      "ㅂ",
      "ㅜ",
      "ㅔ",
      "ㄹ",
      "ㄱ",
      "ㅅ",
      "ㅗ",
      "ㅐ",
      "ㄹ",
      "ㅂ",
    ]);
    expect(divideHangul("값뷁쇏", false)).toEqual([
      "ㄱ",
      "ㅏ",
      "ㅄ",
      "ㅂ",
      "ㅞ",
      "ㄺ",
      "ㅅ",
      "ㅙ",
      "ㄼ",
    ]);
  });

  test("시간초과 테스트", () => {
    const input = divideHangul(new Array(100000).fill("값쉛").join(""));
    const result = new Array(100000).fill("ㄱㅏㅂㅅㅅㅜㅔㄹㅂ").join('').split('');
    expect(input).toEqual(result);
  });
});
