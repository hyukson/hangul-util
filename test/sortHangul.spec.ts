import { sortByASC, sortByDESC, sortByGroups } from "../src/sortHangul";

describe("sortByASC", () => {
  test("영어 배열", () => {
    expect(sortByASC(["apple", "kiwi", "banana"])).toEqual([
      "apple",
      "banana",
      "kiwi",
    ]);
  });

  test("한글 배열", () => {
    expect(sortByASC(["사과", "키위", "바나나"])).toEqual([
      "바나나",
      "사과",
      "키위",
    ]);
  });

  test("숫자 배열", () => {
    expect(sortByASC([1, 5, 1, 4])).toEqual([1, 1, 4, 5]);
  });

  test("아무런 배열", () => {
    expect(sortByASC([4, "a", "가", "ㄴ"])).toEqual([4, "가", "ㄴ", "a"]);
  });

  test("객체 배열", () => {
    const array = [
      { name: "kiwi", age: 12 },
      { name: "apple", age: 42 },
      { name: "kiwi", age: 42 },
    ];

    expect(sortByASC(array)).toEqual([
      { name: "kiwi", age: 12 },
      { name: "apple", age: 42 },
      { name: "kiwi", age: 42 },
    ]);
    expect(sortByASC(array, "age")).toEqual([
      { name: "kiwi", age: 12 },
      { name: "apple", age: 42 },
      { name: "kiwi", age: 42 },
    ]);
    expect(sortByASC(array, ["name", "age"])).toEqual([
      { name: "apple", age: 42 },
      { name: "kiwi", age: 12 },
      { name: "kiwi", age: 42 },
    ]);
  });

  test("compare object 적용", () => {
    const array = [
      { user: { name: "kiwi", age: 12 }, lastConnect: "2022-02-22 22:22:22" },
      { user: { name: "kiwi", age: 42 }, lastConnect: "2022-02-22 22:22:22" },
      { user: { name: "apple", age: 42 }, lastConnect: "2022-02-22 22:22:22" },
    ];

    expect(sortByASC(array, "user.name")).toEqual([
      { user: { name: "apple", age: 42 }, lastConnect: "2022-02-22 22:22:22" },
      { user: { name: "kiwi", age: 12 }, lastConnect: "2022-02-22 22:22:22" },
      { user: { name: "kiwi", age: 42 }, lastConnect: "2022-02-22 22:22:22" },
    ]);
    expect(sortByASC(array, ["user.age", "user.name"])).toEqual([
      { user: { name: "kiwi", age: 12 }, lastConnect: "2022-02-22 22:22:22" },
      { user: { name: "apple", age: 42 }, lastConnect: "2022-02-22 22:22:22" },
      { user: { name: "kiwi", age: 42 }, lastConnect: "2022-02-22 22:22:22" },
    ]);
    expect(sortByASC(array, "user.name[0]")).toEqual([
      { user: { name: "apple", age: 42 }, lastConnect: "2022-02-22 22:22:22" },
      { user: { name: "kiwi", age: 12 }, lastConnect: "2022-02-22 22:22:22" },
      { user: { name: "kiwi", age: 42 }, lastConnect: "2022-02-22 22:22:22" },
    ]);
  });
});

describe("sortByDESC", () => {
  test("영어 배열", () => {
    expect(sortByDESC(["apple", "kiwi", "banana"])).toEqual([
      "kiwi",
      "banana",
      "apple",
    ]);
  });

  test("한글 배열", () => {
    expect(sortByDESC(["사과", "키위", "바나나"])).toEqual([
      "키위",
      "사과",
      "바나나",
    ]);
  });

  test("숫자 배열", () => {
    expect(sortByDESC([1, 5, 1, 4])).toEqual([5, 4, 1, 1]);
  });

  test("아무런 배열", () => {
    expect(sortByDESC([4, "a", "가", "ㄴ"])).toEqual(["a", "ㄴ", "가", 4]);
  });

  test("객체 배열", () => {
    const array = [
      { name: "kiwi", age: 12 },
      { name: "apple", age: 42 },
      { name: "kiwi", age: 42 },
    ];

    expect(sortByDESC(array)).toEqual([
      { name: "kiwi", age: 12 },
      { name: "apple", age: 42 },
      { name: "kiwi", age: 42 },
    ]);
    expect(sortByDESC(array, "age")).toEqual([
      { name: "apple", age: 42 },
      { name: "kiwi", age: 42 },
      { name: "kiwi", age: 12 },
    ]);
    expect(sortByDESC(array, ["name", "age"])).toEqual([
      { name: "kiwi", age: 42 },
      { name: "kiwi", age: 12 },
      { name: "apple", age: 42 },
    ]);
  });

  test("compare object 적용", () => {
    const array = [
      { user: { name: "kiwi", age: 12 }, lastConnect: "2022-02-22 22:22:22" },
      { user: { name: "kiwi", age: 42 }, lastConnect: "2022-02-22 22:22:22" },
      { user: { name: "apple", age: 42 }, lastConnect: "2022-02-22 22:22:22" },
      { user: { name: "apple", age: 42 }, lastConnect: "2022-02-22 22:22:22" },
    ];

    expect(sortByDESC(array, "user.name")).toEqual([
      { user: { name: "kiwi", age: 12 }, lastConnect: "2022-02-22 22:22:22" },
      { user: { name: "kiwi", age: 42 }, lastConnect: "2022-02-22 22:22:22" },
      { user: { name: "apple", age: 42 }, lastConnect: "2022-02-22 22:22:22" },
      { user: { name: "apple", age: 42 }, lastConnect: "2022-02-22 22:22:22" },
    ]);
    expect(sortByDESC(array, ["user.age", "user.name"])).toEqual([
      { user: { name: "kiwi", age: 42 }, lastConnect: "2022-02-22 22:22:22" },
      { user: { name: "apple", age: 42 }, lastConnect: "2022-02-22 22:22:22" },
      { user: { name: "apple", age: 42 }, lastConnect: "2022-02-22 22:22:22" },
      { user: { name: "kiwi", age: 12 }, lastConnect: "2022-02-22 22:22:22" },
    ]);
    expect(sortByDESC(array, "user.name[0]")).toEqual([
      { user: { name: "kiwi", age: 42 }, lastConnect: "2022-02-22 22:22:22" },
      { user: { name: "kiwi", age: 12 }, lastConnect: "2022-02-22 22:22:22" },
      { user: { name: "apple", age: 42 }, lastConnect: "2022-02-22 22:22:22" },
      { user: { name: "apple", age: 42 }, lastConnect: "2022-02-22 22:22:22" },
    ]);
  });

  test("시간초과 테스트", () => {
    const array = new Array(9000000).fill({ name: "apple", age: 242 });

    expect(sortByDESC(array, "name")).toEqual(array);
  });
});

describe("sortByGroups", () => {
  test("회사 오름차순", () => {
    const groups = ["회장", "사장", "부장", "대리", "사원"];

    expect(
      sortByGroups(["대리", "사원", "사장", "회장", "부장"], groups)
    ).toEqual(["회장", "사장", "부장", "대리", "사원"]);
  });

  test("오름차순 내림차순", () => {
    const array = [5, "banana", 4, "apple", "kiwi", 1];
    const groups = [4, "apple", "kiwi", "banana"];

    expect(sortByGroups(array, groups, false)).toEqual([
      5,
      1,
      "banana",
      "kiwi",
      "apple",
      4,
    ]);
    expect(sortByGroups(array, groups)).toEqual([
      4,
      "apple",
      "kiwi",
      "banana",
      1,
      5,
    ]);
  });

  test("배열, 그룹 아무 것도 없는 경우", () => {
    expect(sortByGroups([], [])).toEqual([]);
  });

  test("그룹에는 없는데, 배열에는 존재하는 경우", () => {
    const array = ["banana", "cherry", "kiwi", "apple", "grape"];
    const groups = ["apple", "kiwi", "banana"];

    expect(sortByGroups(array, groups)).toEqual([
      "apple",
      "kiwi",
      "banana",
      "cherry",
      "grape",
    ]);
  });

  test("그룹에는 존재하지만, 배열에는 없는 경우", () => {
    const array = ["banana", "kiwi", "apple", "cherr1"];
    const groups = ["apple", "kiwi", "banana", "cherry"];

    expect(sortByGroups(array, groups)).toEqual([
      "apple",
      "kiwi",
      "banana",
      "cherr1",
    ]);
  });
});
