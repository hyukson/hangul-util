import { detectSpeechLevel, isFormal, isInformal } from "../src/speechLevel";

describe("detectSpeechLevel", () => {
  test("합쇼체 (formal)", () => {
    expect(detectSpeechLevel("감사합니다")).toBe("formal");
    expect(detectSpeechLevel("감사합니다.")).toBe("formal");
    expect(detectSpeechLevel("어디로 가십니까?")).toBe("formal");
  });

  test("해요체 (polite)", () => {
    expect(detectSpeechLevel("감사해요")).toBe("polite");
    expect(detectSpeechLevel("어디 가세요?")).toBe("polite");
    expect(detectSpeechLevel("맞죠")).toBe("polite");
  });

  test("해체 (informal)", () => {
    expect(detectSpeechLevel("고마워")).toBe("informal");
    expect(detectSpeechLevel("어디가")).toBe("informal");
    expect(detectSpeechLevel("알잖아")).toBe("informal");
  });

  test("해라체 (plain)", () => {
    expect(detectSpeechLevel("감사하다")).toBe("plain");
    expect(detectSpeechLevel("간다")).toBe("plain");
  });

  test("빈 문자열", () => {
    expect(detectSpeechLevel("")).toBe("unknown");
  });
});

describe("isFormal", () => {
  test("존댓말 확인", () => {
    expect(isFormal("감사합니다")).toBe(true);
    expect(isFormal("감사해요")).toBe(true);
    expect(isFormal("고마워")).toBe(false);
  });
});

describe("isInformal", () => {
  test("반말 확인", () => {
    expect(isInformal("고마워")).toBe(true);
    expect(isInformal("간다")).toBe(true);
    expect(isInformal("감사합니다")).toBe(false);
  });
});
