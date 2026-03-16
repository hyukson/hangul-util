import {
  isJamo,
  isJamoByGroups,
  isConsonant,
  isVowel,
  isCompleteHangul,
  isCompleteHangulByGroups,
  isDoubleConsonant,
} from "../src/isJamo";

describe("isJamo", () => {
  test("자모 판별", () => {
    expect(isJamo("ㄱ")).toBe(true);
    expect(isJamo("ㅏ")).toBe(true);
    expect(isJamo("ㄱㅏ")).toBe(true);
    expect(isJamo("가")).toBe(false);
    expect(isJamo("a")).toBe(false);
    expect(isJamo("")).toBe(false);
  });
});

describe("isJamoByGroups", () => {
  test("각 글자 자모 판별", () => {
    expect(isJamoByGroups("ㄱ가a")).toEqual([true, false, false]);
  });
});

describe("isConsonant", () => {
  test("자음 판별", () => {
    expect(isConsonant("ㄱ")).toBe(true);
    expect(isConsonant("ㅎ")).toBe(true);
    expect(isConsonant("ㅏ")).toBe(false);
    expect(isConsonant("가")).toBe(false);
  });
});

describe("isVowel", () => {
  test("모음 판별", () => {
    expect(isVowel("ㅏ")).toBe(true);
    expect(isVowel("ㅣ")).toBe(true);
    expect(isVowel("ㄱ")).toBe(false);
    expect(isVowel("가")).toBe(false);
  });
});

describe("isCompleteHangul", () => {
  test("완성형 한글 판별", () => {
    expect(isCompleteHangul("가")).toBe(true);
    expect(isCompleteHangul("한글")).toBe(true);
    expect(isCompleteHangul("ㄱ")).toBe(false);
    expect(isCompleteHangul("a")).toBe(false);
  });
});

describe("isCompleteHangulByGroups", () => {
  test("각 글자 완성형 판별", () => {
    expect(isCompleteHangulByGroups("한ㄱa")).toEqual([true, false, false]);
  });
});

describe("isDoubleConsonant", () => {
  test("쌍자음 판별", () => {
    expect(isDoubleConsonant("ㄲ")).toBe(true);
    expect(isDoubleConsonant("ㅃ")).toBe(true);
    expect(isDoubleConsonant("ㄱ")).toBe(false);
    expect(isDoubleConsonant("가")).toBe(false);
  });
});
