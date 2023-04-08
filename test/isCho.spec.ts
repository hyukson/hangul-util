import { isChoByChar, isCho, isChoByGroups } from "../src/isCho";

describe("isChoByChar", () => {
  test("ㄱ", () => {
    expect(isChoByChar("ㄱ")).toEqual(true);
  });

  test("ㄴ", () => {
    expect(isChoByChar("ㄴ")).toEqual(true);
  });

  test("ㅎ", () => {
    expect(isChoByChar("ㅎ")).toEqual(true);
  });

  test("ㅏ", () => {
    expect(isChoByChar("ㅏ")).toEqual(false);
  });

  test("ㅓ", () => {
    expect(isChoByChar("ㅓ")).toEqual(false);
  });

  test("야", () => {
    expect(isChoByChar("야")).toEqual(false);
  });
});

describe("isCho", () => {
  test("빈값", () => {
    expect(isCho("")).toEqual(false);
  });

  test("ㄱㅎㄴ", () => {
    expect(isCho("ㄱㅎㄴ")).toEqual(true);
  });

  test("ㅎㅎㅎ", () => {
    expect(isCho("ㅎㅎㅎ")).toEqual(true);
  });

  test("ㅎㄴa", () => {
    expect(isCho("ㅎㄴa")).toEqual(false);
  });

  test("hello", () => {
    expect(isCho("hello")).toEqual(false);
  });

  test("시간초과 테스트", () => {
    const input = new Array(1000000).fill('ㄱ').join('')
    expect(isCho(input)).toEqual(true);
  });
});

describe("isChoByGroups", () => {
  test("빈값", () => {
    expect(isChoByGroups("")).toEqual([]);
  });

  test("ㄱㅎㄴ", () => {
    expect(isChoByGroups("ㄱㅎㄴ")).toEqual([true, true, true]);
  });

  test("ㅎㄴa", () => {
    expect(isChoByGroups("ㅎㄴa")).toEqual([true, true, false]);
  });

  test("ㅎㅏㄾㅆ", () => {
    expect(isChoByGroups("ㅎㅏㄾㅆ")).toEqual([true, false, false, true]);
  });

  test("시간초과 테스트", () => {
    const input = new Array(1000000).fill('ㄱ').join('')
    const result = new Array(1000000).fill(true);
    expect(isChoByGroups(input)).toEqual(result);
  });
});
