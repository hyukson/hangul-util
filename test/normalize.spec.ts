import { normalize } from "../src/normalize";

describe("normalize", () => {
  test("사과", () => {
    expect(normalize('사과')).toEqual('sa gwa');
  });

  test("이탈리아", () => {
    expect(normalize('이탈리아')).toEqual('i tar ri a');
    expect(normalize('이탈리아', false)).toEqual('itarria');
  });

  test("그 외", () => {
    expect(normalize('그 외')).toEqual('geu oe');
  });

  test("사과! 그리고 sagwa!", () => {
    expect(normalize('사과! 그리고 sagwa!')).toEqual('sa gwa ! geu ri go sagwa!');
    expect(normalize('사과! 그리고 sagwa!', false)).toEqual('sagwa! geurigo sagwa!');
  });

  test("시간초과 테스트", () => {
    const input = new Array(100000).fill('사과! 그리고 sagwa!').join('');
    const result = new Array(100000).fill('sa gwa ! geu ri go sagwa!').join('');  
    expect(normalize(input)).toEqual(result);
  });
});
