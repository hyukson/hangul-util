import { combine, combineByCode, combineHangul } from "../src/combine";

describe("combineByCode", () => {
  test("빈값", () => {
    expect(combineByCode()).toEqual("가");
  });

  test("이상한 값", () => {
    expect(combineByCode(-1, -1, -1)).toEqual("");
  });

  test("깋", () => {
    expect(combineByCode(1, 0, -1)).toEqual("깋");
  });
});

describe("combine", () => {
  test("빈값", () => {
    expect(combine()).toEqual("");
  });

  test("한글이 아닌 값", () => {
    expect(combine("a")).toEqual("a");
  });

  test("아", () => {
    expect(combine("ㅇ", "ㅏ")).toEqual("아");
  });

  test("안", () => {
    expect(combine("ㅇ", "ㅏ", "ㄴ")).toEqual("안");
  });

  test("뷁", () => {
    expect(combine("ㅂ", "ㅞ", "ㄺ")).toEqual("뷁");
    expect(combine("ㅂ", "ㅜㅔ", "ㄹㄱ")).toEqual("뷁");
  });
});

describe("combineHangul", () => {
  test("가나다", () => {
    expect(combineHangul("ㄱㅏㄴㅏㄷㅏ")).toEqual("가나다");
  });

  test("간나다", () => {
    expect(combineHangul("ㄱㅏㄴㄴㅏㄷㅏ")).toEqual("간나다");
  });

  test("값나다", () => {
    expect(combineHangul("ㄱㅏㅂㅅㄴㅏㄷㅏ")).toEqual("값나다");
  });

  test("값ㄴ나다", () => {
    expect(combineHangul("ㄱㅏㅂㅅㄴㄴㅏㄷㅏ")).toEqual("값ㄴ나다");
  });

  test("값ㅅㄴ나다", () => {
    expect(combineHangul("ㄱㅏㅂㅅㅅㄴㄴㅏㄷㅏ")).toEqual("값ㅅㄴ나다");
  });

  test("갑사ㅏㅅㄴ나다", () => {
    expect(combineHangul("ㄱㅏㅂㅅㅏㅏㅅㄴㄴㅏㄷㅏ")).toEqual("갑사ㅏㅅㄴ나다");
  });

  test("갑사산나다", () => {
    expect(combineHangul("ㄱㅏㅂㅅㅏㅅㅏㄴㄴㅏㄷㅏ")).toEqual("갑사산나다");
  });

  test("갑삿ㄴ나다", () => {
    expect(combineHangul("ㄱㅏㅂㅅㅏㅅㄴㄴㅏㄷㅏ")).toEqual("갑삿ㄴ나다");
  });

  test("갑삿ㄴ눼다", () => {
    expect(combineHangul("ㄱㅏㅂㅅㅏㅅㄴㄴㅜㅔㄷㅏ")).toEqual("갑삿ㄴ눼다");
  });

  test("수박", () => {
    expect(combineHangul("ㅅㅜㅂㅏㄱ")).toEqual("수박");
  });

  test("ㅗ디ㅣㅐ 재깅!", () => {
    expect(combineHangul("ㅗㄷㅣㅣㅐ ㅂㅏㅂㅗㅇ!")).toEqual("ㅗ디ㅣㅐ 바봉!");
  });

  test("ㅗ디ㅓㅕㅜㅠㅣㅐ 바봉!", () => {
    expect(combineHangul("ㅗㄷㅣㅓㅕㅜㅠㅣㅐ ㅂㅏㅂㅗㅇ!")).toEqual(
      "ㅗ디ㅓㅕㅜㅠㅣㅐ 바봉!"
    );
  });

  test("ㅗ디ㅓㅇㅅㅎㅇㅇㅇ여ㅜㅠㅣㅐ 바봉", () => {
    expect(
      combineHangul("ㅗㄷㅣㅓㅇㅅㅎㅇㅇㅇㅇㅕㅜㅠㅣㅐ ㅂㅏㅂㅗㅇ!")
    ).toEqual("ㅗ디ㅓㅇㅅㅎㅇㅇㅇ여ㅜㅠㅣㅐ 바봉!");
  });

  test("빈값", () => {
    expect(combineHangul()).toEqual("");
  });

  test("한글이 아닌 값", () => {
    expect(combineHangul("Ab!6k+@_ @")).toEqual("Ab!6k+@_ @");
  });

  test("안녕하세요", () => {
    expect(combineHangul(["ㅇㅏㄴㄴㅕㅇㅎㅏㅅㅔㅇㅛ"])).toEqual("안녕하세요");
    expect(combineHangul("ㅇㅏㄴㄴㅕㅇㅎㅏㅅㅔㅇㅛ")).toEqual("안녕하세요");
    expect(combineHangul([["ㅇㅏㄴㅈ"], ["ㄴㅕㅇㅎㅏㅅㅔㅇㅛ"]])).toEqual(
      "앉녕하세요"
    );
    expect(combineHangul([["ㅇㅏㄴ"], ["ㅈㄴㅕㅇㅎㅏㅅㅔㅇㅛ"]])).toEqual(
      "안ㅈ녕하세요"
    );
    expect(combineHangul(["ㅇㅏㄴㄴㅕㅇㅎㅏㅅㅔㅇㅛ"])).toEqual("안녕하세요");
  });

  test("모든 경우의 수", () => {
    expect(
      combineHangul([
        ["ㅂㅜ", "ㅔ", "ㄹㄱ"],
        "ㅅ",
        "ㅗ",
        "ㅐ",
        "ㄹ",
        "ㅁ",
        ["ㅎㅜㅔㅂㅅ"],
        "ㄱ",
        ["ㅏ", "ㅅ", "ㅏ"],
      ])
    ).toEqual("뷁쇎휎ㄱㅏ사");
  });

  test("시간초과 테스트", () => {
    const input = new Array(1000000).fill("ㄱㅏㅂㅅ").join("");
    const result = new Array(1000000).fill("값").join("");
    expect(combineHangul(input)).toEqual(result);
  });
});
