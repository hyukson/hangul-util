import { isHangul, isHangulByCode, isHangulByGroups } from "../src/isHangul";

describe("isHangulByCode", () => {
  test("조합된 한글 값", () => {
    expect(isHangulByCode("아".charCodeAt(0))).toEqual(true);
    expect(isHangulByCode("뷁".charCodeAt(0))).toEqual(true);
  });

  test("조합된 한글 아닌 값", () => {
    expect(isHangulByCode("1".charCodeAt(0))).toEqual(false);
    expect(isHangulByCode("s".charCodeAt(0))).toEqual(false);
    expect(isHangulByCode("@".charCodeAt(0))).toEqual(false);
    expect(isHangulByCode("ㄱ".charCodeAt(0))).toEqual(false);
    expect(isHangulByCode("ㅏ".charCodeAt(0))).toEqual(false);
  });
});

describe("isHangul", () => {
  test("한글 값", () => {
    expect(isHangul("자")).toEqual(true);
    expect(isHangul("안녕하세요")).toEqual(true);
    expect(isHangul("자바스크립트")).toEqual(true);
  });

  test("한글 아닌 값 포함", () => {
    expect(isHangul("Hello, world!")).toEqual(false);
    expect(isHangul("12345")).toEqual(false);
    expect(isHangul("안녕하세요, Hello, world!")).toEqual(false);
    expect(isHangul("Hello! 안녕!")).toEqual(false);
  });

  test("시간초과 테스트", () => {
    const input = new Array(1000000).fill('값').join('')
    expect(isHangul(input)).toEqual(true);
  });
});

describe("isHangulByGroups", () => {
  test("안녕하세요", () => {
    expect(isHangulByGroups("안녕하세요")).toEqual([
      true,
      true,
      true,
      true,
      true,
    ]);
  });
  test("자바스크립트.", () => {
    expect(isHangulByGroups("자바스크립트.")).toEqual([
      true,
      true,
      true,
      true,
      true,
      true,
      false,
    ]);
  });

  test("Hello, 안녕!", () => {
    expect(isHangulByGroups("Hello, 안녕!")).toEqual([
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      true,
      false,
    ]);
  });

  test("시간초과 테스트", () => {
    const input = new Array(1000000).fill('값').join('')
    const result = new Array(1000000).fill(true);
    expect(isHangulByGroups(input)).toEqual(result);
  });
});
