function g(n) {
  const e = {};
  let r = "";
  for (const t of n)
    r += t.charCodeAt(0).toString(2).padStart(8, "0");
  for (let t = 0; t < r.length; t += 32) {
    const o = r.slice(t, t + 16), i = r.slice(t + 16, t + 32), c = parseInt(o, 2), l = i.replace(/^0*(.*)/, "$1");
    e[l] = c;
  }
  return e;
}
function p(n) {
  if (/[0-7]/.test(n[0]))
    throw new Error("Invalid padding data!");
  return [
    parseInt(
      n[0].charCodeAt(0)
    ),
    n.slice(1)
  ];
}
function m(n) {
  let e = "";
  for (const o in n) {
    const i = n[o], c = 16 - i.length % 16, l = i.padStart(i.length + c, "0"), h = parseInt(o).toString(2).padStart(16, "0");
    e += h + l;
  }
  const r = a(e)[0], t = a(
    r.length.toString(2).padStart(16, "0")
  )[0];
  return [r, t];
}
function w(n) {
  const e = {};
  r(n[0]);
  function r(t, o = "1") {
    t !== null && (t.char !== null && (e[t.char] = o), r(t.left, o + "1"), r(t.right, o + "0"));
  }
  return e;
}
function b(n) {
  const e = {};
  for (let r = 0; r < n.length; r++) {
    const t = n[r];
    e[t] ? e[t]++ : e[t] = 1;
  }
  return e;
}
function S(n, e) {
  let r = "";
  for (const t of n)
    r += e[t];
  return r;
}
const s = "Ñur!", f = "ÿÿ";
function C([n, e], r) {
  const [t, o] = m(r);
  return [
    // magic bytes
    s,
    // zero padding as character
    String.fromCharCode(e),
    t,
    // meta ending declaration
    f,
    // encoded data
    n
  ].join("");
}
function y(n) {
  return q(k(n));
}
function k(n) {
  const e = {};
  if (n.slice(0, s.length) !== s)
    throw new Error("Unknown file format!");
  const r = n.indexOf(f);
  if (r === -1)
    throw new Error("Meta ending not found!");
  let t = n.slice(s.length, r);
  return [e.padEnd, t] = p(t), e.bitmap = g(t), e.raw = n.slice(r + f.length), e;
}
function B(n) {
  n = n.split("").map(
    (c) => c.charCodeAt(0)
  );
  const e = b(n), r = E(e), t = w(r), o = S(n, t), i = a(o);
  return [
    C(i, t),
    t
  ];
}
function E(n) {
  const e = Object.keys(n).map((r) => new d(r, n[r])).sort(u);
  for (; e.length > 1; ) {
    const r = e.shift(), t = e.shift(), o = new d(null, r.freq + t.freq);
    o.left = r, o.right = t, e.push(o), e.sort(u);
  }
  return e;
}
function a(n) {
  const e = [];
  let r = 0;
  for (let t = 0; t < n.length; t += 8) {
    let o = n.slice(t, t + 8);
    o.length < 8 && (r = 8 - o.length, o = o.padEnd(8, "0"));
    const i = parseInt(o, 2), c = String.fromCharCode(i);
    e.push(c);
  }
  return [e.join(""), r];
}
function q(n) {
  let e = "";
  for (const o of n.raw)
    e += o.charCodeAt(0).toString(2).padStart(8, "0");
  n.padEnd > 0 && (e = e.slice(0, -n.padEnd));
  let r = [], t = "";
  for (const o of e) {
    t += o;
    const i = n.bitmap[t];
    i !== void 0 && (r.push(String.fromCharCode(i)), t = "");
  }
  return r.join("");
}
function u(n, e) {
  return n.freq - e.freq;
}
class d {
  /**
   * Creates a new instance.
   *
   * @param {string} char - The character represented by the node.
   * @param {number} freq - The frequency of the character.
   */
  constructor(e, r) {
    this.char = e, this.freq = r, this.left = null, this.right = null;
  }
}
export {
  B as compress,
  y as decompress,
  m as serializeHuffmanCode,
  g as unserializeHuffmanCode
};
