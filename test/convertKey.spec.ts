import { convertKey } from "../src/convertKey";

describe("convertKey", () => {
  test("영어로 변환", () => {
    expect(convertKey("안뇽 안뇽 그렇구만!", "en")).toEqual("dkssyd dkssyd rmfjgrnaks!");
  });

  test("한글로 변환", () => {
    expect(convertKey("dkssyd dkssyd rmfjgrnaks!", "ko")).toEqual("안뇽 안뇽 그렇구만!");
  });

  test("한글로 변환 - 합치기 X", () => {
    expect(convertKey("dkssyd dkssyd rmfjgrnaks!", "ko", false)).toEqual("ㅇㅏㄴㄴㅛㅇ ㅇㅏㄴㄴㅛㅇ ㄱㅡㄹㅓㅎㄱㅜㅁㅏㄴ!");
  });

  test("hello world!", () => {
    expect(convertKey("ㅗ디ㅣㅐ 재깅!", "en")).toEqual("hello world!");
  });

  test("ㅗ디ㅣㅐ 재깅!", () => {
    expect(convertKey("hello world!", "ko")).toEqual("ㅗ디ㅣㅐ 재깅!");
  });

  test("이상한 언어", () => {
    expect(convertKey("안뇽 안뇽 그렇구만!", "special")).toEqual("안뇽 안뇽 그렇구만!");
  });

  test("시간초과 테스트(영어)", () => {
    const input = new Array(1000000).fill("ㅗㄷㅣㅣㅐ ㅈㅐㄱㅣㅇ!").join('')
    const result = new Array(1000000).fill("hello world!").join('');
    expect(convertKey(input, "en")).toEqual(result);
  });

  test("시간초과 테스트(한국어)", () => {
    const input = new Array(1000000).fill("hello world!").join('');
    const result = new Array(1000000).fill("ㅗㄷㅣㅣㅐ ㅈㅐㄱㅣㅇ!").join('')
    expect(convertKey(input, "ko", false)).toEqual(result);
  });
});
