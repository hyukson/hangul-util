import { disassembleForTyping } from "../src/typing";

describe("disassembleForTyping", () => {
  test("단일 글자 (종성 있음)", () => {
    const result = disassembleForTyping("한");
    expect(result).toEqual(["ㅎ", "하", "한"]);
  });

  test("단일 글자 (종성 없음)", () => {
    const result = disassembleForTyping("하");
    expect(result).toEqual(["ㅎ", "하"]);
  });

  test("두 글자", () => {
    const result = disassembleForTyping("한글");
    expect(result).toEqual(["ㅎ", "하", "한", "한ㄱ", "한그", "한글"]);
  });

  test("빈 문자열", () => {
    expect(disassembleForTyping("")).toEqual([]);
  });

  test("비한글", () => {
    expect(disassembleForTyping("a")).toEqual(["a"]);
  });
});
