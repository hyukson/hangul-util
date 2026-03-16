import { hangulFrequency, mostFrequentChoseong } from "../src/frequency";

describe("hangulFrequency", () => {
  test("빈도 분석", () => {
    const result = hangulFrequency("안녕하세요");
    expect(result.total).toBe(5);
    expect(result.cho["ㅇ"]).toBe(2);
    expect(result.cho["ㄴ"]).toBe(1);
    expect(result.cho["ㅎ"]).toBe(1);
    expect(result.cho["ㅅ"]).toBe(1);
  });

  test("비한글 무시", () => {
    const result = hangulFrequency("hello");
    expect(result.total).toBe(0);
  });

  test("종성 포함", () => {
    const result = hangulFrequency("한글");
    expect(result.jong["ㄴ"]).toBe(1);
    expect(result.jong["ㄹ"]).toBe(1);
  });
});

describe("mostFrequentChoseong", () => {
  test("가장 많은 초성", () => {
    expect(mostFrequentChoseong("사과 수박 사탕")).toBe("ㅅ");
  });

  test("빈 문자열", () => {
    expect(mostFrequentChoseong("")).toBe("");
  });
});
