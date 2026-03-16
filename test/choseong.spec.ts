import { getChoseong, getJungseong, getJongseong } from "../src/choseong";

describe("getChoseong", () => {
  test("초성 추출", () => {
    expect(getChoseong("프로그래밍")).toBe("ㅍㄹㄱㄹㅁ");
    expect(getChoseong("안녕하세요")).toBe("ㅇㄴㅎㅅㅇ");
    expect(getChoseong("한글")).toBe("ㅎㄱ");
    expect(getChoseong("")).toBe("");
  });

  test("영문/숫자는 그대로", () => {
    expect(getChoseong("hello")).toBe("hello");
    expect(getChoseong("한abc글")).toBe("ㅎabcㄱ");
  });
});

describe("getJungseong", () => {
  test("중성 추출", () => {
    expect(getJungseong("한글")).toBe("ㅏㅡ");
    expect(getJungseong("아이우")).toBe("ㅏㅣㅜ");
  });
});

describe("getJongseong", () => {
  test("종성 추출", () => {
    expect(getJongseong("한글")).toBe("ㄴㄹ");
    expect(getJongseong("가나다")).toBe("");
  });
});
