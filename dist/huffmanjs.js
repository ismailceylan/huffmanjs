function g(e) {
  const t = {};
  let r = "";
  for (const n of e)
    r += n.charCodeAt(0).toString(2).padStart(8, "0");
  for (let n = 0; n < r.length; n += 32) {
    const o = r.slice(n, n + 16), c = r.slice(n + 16, n + 32), s = parseInt(o, 2), l = c.replace(/^0*(.*)/, "$1");
    t[l] = s;
  }
  return t;
}
function p(e) {
  let t = e.split("").map(
    (r) => r.charCodeAt(0)
  );
  return t[0] > 0 && (t[0] *= 255, t[0]++), t.reduce((r, n) => r + n, 0);
}
function b(e) {
  let t = "";
  for (const o in e) {
    const c = e[o], s = 16 - c.length % 16, l = c.padStart(c.length + s, "0"), f = parseInt(o).toString(2).padStart(16, "0");
    t += f + l;
  }
  const r = a(t)[0], n = a(
    r.length.toString(2).padStart(16, "0")
  )[0];
  return [r, n];
}
function m(e) {
  const t = {};
  r(e[0]);
  function r(n, o = "1") {
    n !== null && (n.char !== null && (t[n.char] = o), r(n.left, o + "1"), r(n.right, o + "0"));
  }
  return t;
}
function y(e) {
  const t = {};
  for (let r = 0; r < e.length; r++) {
    const n = e[r];
    t[n] ? t[n]++ : t[n] = 1;
  }
  return t;
}
function S(e, t) {
  let r = "";
  for (const n of e)
    r += t[n];
  return r;
}
const i = "íce9";
function C([e, t], r) {
  const [n, o] = b(r), c = String.fromCharCode(t), s = [
    i,
    c,
    o,
    n,
    e
  ], l = [
    i,
    c,
    e
  ];
  return [
    s.join(""),
    l.join(""),
    n
  ];
}
function B(e, t) {
  return q(k(e, t));
}
function k(e, t) {
  if (e.slice(0, i.length) !== i)
    throw new Error("Unknown file format!");
  const r = {
    padEnd: e[i.length].charCodeAt(0)
  }, n = t ? t.length : p(
    e[i.length + 1] + e[i.length + 2]
  ), o = t || e.slice(i.length + 3, i.length + 3 + n);
  return r.bitmap = g(o), r.raw = t ? e.slice(i.length + 1) : e.slice(i.length + 3 + n), r;
}
function L(e) {
  e = e.split("").map(
    (d) => d.charCodeAt(0)
  );
  const t = y(e), r = w(t), n = m(r), o = S(e, n), c = a(o), [s, l, f] = C(c, n);
  return [
    s,
    n,
    l,
    f
  ];
}
function w(e) {
  const t = Object.keys(e).map((r) => new h(r, e[r])).sort(u);
  for (; t.length > 1; ) {
    const r = t.shift(), n = t.shift(), o = new h(null, r.freq + n.freq);
    o.left = r, o.right = n, t.push(o), t.sort(u);
  }
  return t;
}
function a(e) {
  const t = [];
  let r = 0;
  for (let n = 0; n < e.length; n += 8) {
    let o = e.slice(n, n + 8);
    o.length < 8 && (r = 8 - o.length, o = o.padEnd(8, "0"));
    const c = parseInt(o, 2), s = String.fromCharCode(c);
    t.push(s);
  }
  return [t.join(""), r];
}
function q(e) {
  let t = "";
  for (const o of e.raw)
    t += o.charCodeAt(0).toString(2).padStart(8, "0");
  e.padEnd > 0 && (t = t.slice(0, -e.padEnd));
  let r = [], n = "";
  for (const o of t) {
    n += o;
    const c = e.bitmap[n];
    c !== void 0 && (r.push(String.fromCharCode(c)), n = "");
  }
  return r.join("");
}
function u(e, t) {
  return e.freq - t.freq;
}
class h {
  /**
   * Creates a new instance.
   *
   * @param {string} char - The character represented by the node.
   * @param {number} freq - The frequency of the character.
   */
  constructor(t, r) {
    this.char = t, this.freq = r, this.left = null, this.right = null;
  }
}
export {
  L as compress,
  B as decompress,
  b as serializeHuffmanCode,
  g as unserializeHuffmanCode
};
