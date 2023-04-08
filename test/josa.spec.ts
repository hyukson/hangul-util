import { formatJosa, josa } from "../src/josa";

describe("formatJosa", () => {
  test("조사", () => {
    expect(josa("영희", '는')).toEqual('는');
  });
});

describe("formatJosa", () => {
  test("조사", () => {
    expect(formatJosa("I have an apple[은/는]")).toEqual("I have an apple[은/는]");
    expect(formatJosa("[은/는]")).toEqual("[은/는]");
    expect(formatJosa("영희[은/는]")).toEqual("영희는");
    expect(formatJosa("인생[이란/란]")).toEqual("인생이란");
    expect(formatJosa("인생[란/테스트]")).toEqual("인생이란");
  });

  test("빈값", () => {
    expect(formatJosa()).toEqual("");
  });
});
