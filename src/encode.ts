import { chunkAtEnd } from "./utils";

const a = [
  escape,
  (t: string) => chunkAtEnd(chunkAtEnd(t).join(""), 3).join(""),
  (t: string) => chunkAtEnd(chunkAtEnd(t).join(""), 4).join(""),
  (t: string) => chunkAtEnd(t).join(""),
  (t: string) =>
    t
      .split("")
      .map((v, i) => (i % 3 === 0 ? v + w() : v))
      .join(""),
  (t: string) =>
    t.slice(Math.floor(t.length / 2), t.length) +
    t.slice(0, Math.floor(t.length / 2)),
];
const s = JSON.stringify;
const b = btoa;
const e = encodeURI;
const w = (): any => Math.floor(Math.random() * (a.length));

export function encode(t: any = "", l: number = 0): any {
  const _t = w();

  const c = l % 3 === 0 ? b(e(s(t))) : a[_t](t);

  return l === 5
    ? _t + b(e(c))
    : encode((l % 2 === 1 ? _t : "") + c + (l % 2 === 0 ? _t : ""), l + 1);
}

const n = [
  unescape,
  (t: string) => chunkAtEnd(chunkAtEnd(t).join(""), 3).join(""),
  (t: string) => chunkAtEnd(chunkAtEnd(t).join(""), 4).join(""),
  (t: string) => chunkAtEnd(t).join(""),
  (t: string) =>
    t
      .split("")
      .map((v, i) => ((i - 1) % 4 === 0 ? "" : v))
      .join(""),
  (t: string) =>
    t.slice(Math.ceil(t.length / 2), t.length) +
    t.slice(0, Math.ceil(t.length / 2)),
];
const x = atob;
const d = decodeURI;
const p = JSON.parse;

export function decode(t: any = "", l: number = 5): any {
  const _t =
    l % 2 === 1
      ? [t.slice(1, t.length), t[0]]
      : [t.slice(0, t.length - 1), t[t.length - 1]];

  const h = l === 5 ? d(x(_t[0])) : _t[0];

  const c = l % 3 === 0 ? p(d(x(h))) : n[_t[1]](h);

  return l === 0 ? c : decode(c, l - 1);
}
