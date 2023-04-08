import { getLocal, getLocalByGroups } from "../src/getLocal";

describe("getLocal", () => {
  test("안녕하세요 - ko", () => {
    expect(getLocal("안녕하세요")).toEqual("ko");
  });

  test("Hello world - en", () => {
    expect(getLocal("Hello world")).toEqual("en");
  });

  test("1234 - number", () => {
    expect(getLocal("1234")).toEqual("number");
  });

  test("!@#$%^&*()_+ - special", () => {
    expect(getLocal("!@#$%^&*()_+")).toEqual("special");
  });

  test("こんにちは！!123 - etc", () => {
    expect(getLocal("こんにちは！!123")).toEqual("etc");
  });
});

describe("getLocalByGroups", () => {
  test("안녕하세요 - 그룹", () => {
    expect(getLocalByGroups("안녕하세요")).toEqual([
      "ko",
      "ko",
      "ko",
      "ko",
      "ko",
    ]);
  });

  test("Hello, world! - 그룹", () => {
    expect(getLocalByGroups("Hello, world!")).toEqual([
      "en",
      "en",
      "en",
      "en",
      "en",
      "special",
      "special",
      "en",
      "en",
      "en",
      "en",
      "en",
      "special",
    ]);
  });

  test("1234 - 그룹", () => {
    expect(getLocalByGroups("1234")).toEqual([
      "number",
      "number",
      "number",
      "number",
    ]);
  });

  test("!@#$%^&*()_+ - 그룹", () => {
    expect(getLocalByGroups("!@#$%^&*()_+")).toEqual([
      "special",
      "special",
      "special",
      "special",
      "special",
      "special",
      "special",
      "special",
      "special",
      "special",
      "special",
      "special",
    ]);
  });

  test("こんにちは!123 - 그룹", () => {
    const word = "こんにちは!123";
    const result = getLocalByGroups(word);
    expect(result).toEqual([
      "etc",
      "etc",
      "etc",
      "etc",
      "etc",
      "special",
      "number",
      "number",
      "number",
    ]);
  });

  test("안녕하세요! Hello, world! 1234 # - 퍼센트", () => {
    const word = "안녕하세요! Hello, world! 1234 #";
    const result = getLocalByGroups(word, true);
    expect(result).toEqual({
      ko: 18.52,
      en: 37.04,
      number: 14.81,
      special: 29.63,
      etc: 0,
    });
  });

  test("!@#$%^&*()_+ - 퍼센트", () => {
    expect(getLocalByGroups("!@#$%^&*()_+", true)).toEqual({
      ko: 0,
      en: 0,
      number: 0,
      special: 100,
      etc: 0,
    });
  });

  test("시간초과 테스트", () => {
    const word = new Array(1000000).fill("안녕하세요! Hello, world! 1234 #").join('');
    const result = getLocalByGroups(word, true);
    expect(result).toEqual({
      ko: 18.52,
      en: 37.04,
      number: 14.81,
      special: 29.63,
      etc: 0,
    });
  });
});
