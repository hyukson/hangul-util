import { divideHangul } from "./divide";
import { sortByASC } from "./sortHangul";

/**
 * 메모이제이션 캐시 상한.
 * 상한이 없으면 장시간 실행되는 프로세스에서 캐시가 무한히 커진다.
 */
const MEMO_LIMIT = 5000;

const memo = new Map<string, number>();

function getMemo(key: string): number | undefined {
  return memo.get(key);
}

function setMemo(key: string, value: number) {
  if (memo.size >= MEMO_LIMIT) {
    // 가장 오래된 항목부터 비운다. (Map은 삽입 순서를 유지한다)
    const oldest = memo.keys().next();
    if (!oldest.done) memo.delete(oldest.value);
  }

  memo.set(key, value);
}

// levenshtein distance
export function getDistance(first: string, second: string): number {
  if (first === second) return 0;
  if (!first) return second.length;
  if (!second) return first.length;

  const key = first + "||" + second;
  const cached = getMemo(key);
  if (cached !== undefined) return cached;

  const m = first.length;
  const n = second.length;

  let prev = new Array(n + 1);
  let curr = new Array(n + 1);

  for (let j = 0; j <= n; j++) prev[j] = j;

  for (let i = 1; i <= m; i++) {
    curr[0] = i;
    for (let j = 1; j <= n; j++) {
      curr[j] = Math.min(
        prev[j] + 1,
        curr[j - 1] + 1,
        prev[j - 1] + (first[i - 1] === second[j - 1] ? 0 : 1)
      );
    }
    const tmp = prev;
    prev = curr;
    curr = tmp;
  }

  setMemo(key, prev[n]);
  return prev[n];
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
