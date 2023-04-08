import { divideHangul } from "./divide";
import { sortByASC } from "./sortHangul";

function minBy(x1: number, x2: number, x3: number) {
  return x1 > x2 ? (x2 > x3 ? x3 : x2) : x3 > x1 ? x1 : x3;
}

const memo: any = {};

// levenshtein distance
export function getDistance(first: string, second: string): number {
  if (first === second) return 0;
  if (!first) return second.length;
  if (!second) return first.length;

  if (memo[first + '||' + second]) {
    return memo[first + '||' + second];
  }

  const getDistance: number[][] = [[]];

  // 초기값 설정
  for (let j = 0; j <= second.length; j++) {
    getDistance[0][j] = j;
  }

  for (let i = 1; i <= first.length; i++) {
    getDistance[i] = [i];

    for (let j = 1; j <= second.length; j++) {
      getDistance[i][j] = minBy(
        getDistance[i - 1][j] + 1,
        getDistance[i][j - 1] + 1,
        getDistance[i - 1][j - 1] + (first[i - 1] === second[j - 1] ? 0 : 1)
      );
    }
  }

  memo[first + '||' + second] = getDistance[first.length][second.length];

  return getDistance[first.length][second.length];
}

export function correctByDistance(
  word: string,
  list: string[],
  option?: { distance?: number; maxSlice?: number; isSplit?: boolean }
) {
  const distance = option?.distance ?? Math.max(word.length / 2, 2);
  const maxSlice = option?.maxSlice ?? 10;
  const isSplit = option?.isSplit ?? true;

  const minDist = [];

  const dividedWord = divideHangul(word, true).join("");

  for (let index = 0; index < list.length; index++) {
    const dist = isSplit
      ? getDistance(dividedWord, divideHangul(list[index], true).join(""))
      : getDistance(word, list[index]);

    if (dist <= distance) {
      minDist.push({ dist, word: list[index] });
    }
  }

  return sortByASC(minDist, "dist")
    .slice(0, maxSlice)
    .map((item) => item.word);
}
