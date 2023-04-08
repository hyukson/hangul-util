import { includesByCho, makeRegexByCho } from "../src/includesByCho";

describe("includesByCho", () => {
  test("가나다라마바사", () => {
    const search = "ㄱ나다라마바ㅅ";
    expect(makeRegexByCho(search)).toEqual(/([가-깋]나다라마바[사-싷])/g);
  });
  test("가나다라마바사", () => {
    const search = "ㄱㄱ";
    expect(makeRegexByCho(search)).toEqual(/([가-깋][가-깋])/g);
  });
});

describe("includesByCho", () => {
  test("가나다라마바사", () => {
    const search = "ㄱ";
    const word = "가나다라마바사";
    expect(includesByCho(search, word)).toEqual(true);
  });

  test("가나다라마바사", () => {
    const search = "ㅇ";
    const word = "가나다라마바사";
    expect(includesByCho(search, word)).toEqual(false);
  });

  test("가나다라마바사", () => {
    const search = "ㄷㄹ";
    const word = "가나다라마바사";
    expect(includesByCho(search, word)).toEqual(true);
  });

  test("가나다라마바사", () => {
    const search = "ㄱㄹ";
    const word = "가나다라마바사";
    expect(includesByCho(search, word)).toEqual(false);
  });

  test("가나다라마바사 to 가ㄴㄷ라", () => {
    const search = "가ㄴㄷ라";
    const word = "가나다라마바사";
    expect(includesByCho(search, word)).toEqual(true);
  });
});
