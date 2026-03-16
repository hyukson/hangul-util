import {
  removeJongseong,
  replaceChoseong,
  replaceJungseong,
  replaceJongseong,
} from "../src/replaceJamo";

describe("removeJongseong", () => {
  test("종성 제거", () => {
    expect(removeJongseong("한글")).toBe("하그");
    expect(removeJongseong("받침")).toBe("바치");
    expect(removeJongseong("가나다")).toBe("가나다");
  });

  test("영문은 그대로", () => {
    expect(removeJongseong("abc")).toBe("abc");
  });
});

describe("replaceChoseong", () => {
  test("초성 교체", () => {
    expect(replaceChoseong("한글", () => "ㅁ")).toBe("만믈");
    expect(replaceChoseong("가나다", () => "ㅂ")).toBe("바나다".replace(/나/g, "바").replace(/다/, "바"));
  });

  test("인덱스 활용", () => {
    const result = replaceChoseong("가나", (cho, i) => (i === 0 ? "ㄴ" : cho));
    expect(result).toBe("나나");
  });
});

describe("replaceJungseong", () => {
  test("중성 교체", () => {
    expect(replaceJungseong("하하", () => "ㅗ")).toBe("호호");
  });
});

describe("replaceJongseong", () => {
  test("종성 교체", () => {
    expect(replaceJongseong("한", () => "ㅁ")).toBe("함");
  });
});
