import { isJungByCode, isJung, isJungByGroups } from "../src/isJung";

describe("isJungByCode", () => {
  test("ㅏ", () => {
    expect(isJungByCode("ㅏ".charCodeAt(0))).toEqual(true);
  });

  test("ㄱ", () => {
    expect(isJungByCode("ㄱ".charCodeAt(0))).toEqual(false);
  });

  test("a", () => {
    expect(isJungByCode("a".charCodeAt(0))).toEqual(false);
  });
});

describe("isJung", () => {
  test("ㅏㅣㅜ", () => {
    expect(isJung("ㅏㅣㅜ")).toEqual(true);
  });

  test("ㅏㄱㅣ ", () => {
    expect(isJung("ㅏㄱㅣ")).toEqual(false);
  });

  test("빈값", () => {
    expect(isJung("")).toEqual(false);
  });

  test("시간초과 테스트", () => {
    const input = new Array(1000000).fill('ㅜ').join('')
    expect(isJung(input)).toEqual(true);
  });
});

describe("isJungByGroups", () => {
  test("ㅏㅣㅜ", () => {
    expect(isJungByGroups("ㅏㅣㅜ")).toEqual([true, true, true]);
  });

  test("ㅏㄱㅣ", () => {
    expect(isJungByGroups("ㅏㄱㅣ")).toEqual([true, false, true]);
  });

  test("빈값", () => {
    expect(isJungByGroups("")).toEqual([]);
  });

  test("시간초과 테스트", () => {
    const input = new Array(1000000).fill('ㅏ').join('')
    const result = new Array(1000000).fill(true);
    expect(isJungByGroups(input)).toEqual(result);
  });
});
