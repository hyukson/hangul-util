import { isJongByCode, isJong, isJongByGroups } from "../src/isJong";

describe("isJongByCode", () => {
  test("ㄱ", () => {
    expect(isJongByCode(12593)).toEqual(true); // "ㄱ"
  });

  test("ㅊ", () => {
    expect(isJongByCode(12622)).toEqual(true); // "ㅊ"
  });
  test("ㅊ", () => {
    expect(isJongByCode(12595)).toEqual(true); // "ㅊ"
  });

  test("가", () => {
    expect(isJongByCode(44032)).toEqual(false); // '가'
  });

  test("a", () => {
    expect(isJongByCode(97)).toEqual(false); // "a"
  });
});

describe("isJong", () => {
  test("빈값", () => {
    expect(isJong("")).toEqual(false);
  });

  test("ㄳㅂㄷㅈ", () => {
    expect(isJong("ㄳㅂㄷㅈ")).toEqual(true);
  });

  test("ㄳㅂ2ㄷㅈ", () => {
    expect(isJong("ㄳㅂ2ㄷㅈ")).toEqual(false);
  });

  test("가나다라", () => {
    expect(isJong("가나다라")).toEqual(false);
  });

  test("ㄱㅏㄷㅏ", () => {
    expect(isJong("ㄱㅏㄷㅏ")).toEqual(false);
  });

  test("시간초과 테스트", () => {
    const input = new Array(1000000).fill('ㅂ').join('')
    expect(isJong(input)).toEqual(true);
  });
});

describe("isJongByGroups", () => {
  test("ㄱㅂㄷㅈ", () => {
    expect(isJongByGroups("ㄱㅂㄷㅈ")).toEqual([true, true, true, true]);
  });

  test("가나다라", () => {
    expect(isJongByGroups("가나다라")).toEqual([false, false, false, false]);
  });
  test("ㄳㅏㄷㅏ", () => {
    expect(isJongByGroups("ㄳㅏㄷㅏ")).toEqual([true, false, true, false]);
  });

  test("시간초과 테스트", () => {
    const input = new Array(1000000).fill('ㄳ').join('')
    const result = new Array(1000000).fill(true);
    expect(isJongByGroups(input)).toEqual(result);
  });
});
