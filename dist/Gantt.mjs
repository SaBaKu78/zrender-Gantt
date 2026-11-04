var Z_ = Object.defineProperty, K_ = Object.defineProperties;
var j_ = Object.getOwnPropertyDescriptors;
var rr = Object.getOwnPropertySymbols;
var qh = Object.prototype.hasOwnProperty, Xh = Object.prototype.propertyIsEnumerable;
var Vh = (n, t, e) => t in n ? Z_(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e, Y = (n, t) => {
  for (var e in t || (t = {}))
    qh.call(t, e) && Vh(n, e, t[e]);
  if (rr)
    for (var e of rr(t))
      Xh.call(t, e) && Vh(n, e, t[e]);
  return n;
}, ln = (n, t) => K_(n, j_(t));
var Zh = (n, t) => {
  var e = {};
  for (var i in n)
    qh.call(n, i) && t.indexOf(i) < 0 && (e[i] = n[i]);
  if (n != null && rr)
    for (var i of rr(n))
      t.indexOf(i) < 0 && Xh.call(n, i) && (e[i] = n[i]);
  return e;
};
var or = (n, t, e) => new Promise((i, s) => {
  var r = (l) => {
    try {
      a(e.next(l));
    } catch (c) {
      s(c);
    }
  }, o = (l) => {
    try {
      a(e.throw(l));
    } catch (c) {
      s(c);
    }
  }, a = (l) => l.done ? i(l.value) : Promise.resolve(l.value).then(r, o);
  a((e = e.apply(n, t)).next());
});
const Q_ = "sans-serif", Ns = `12px ${Q_}`, J_ = 20, t0 = 100, e0 = "007LLmW'55;N0500LLLLLLLLLL00NNNLzWW\\\\WQb\\0FWLg\\bWb\\WQ\\WrWWQ000CL5LLFLL0LL**F*gLLLL5F0LF\\FFF5.5N";
function n0(n) {
  const t = {};
  if (typeof JSON == "undefined")
    return t;
  for (let e = 0; e < n.length; e++) {
    const i = String.fromCharCode(e + 32), s = (n.charCodeAt(e) - J_) / t0;
    t[i] = s;
  }
  return t;
}
const i0 = n0(e0), Zc = {
  // Export methods
  createCanvas() {
    return typeof document != "undefined" && document.createElement("canvas");
  },
  measureText: /* @__PURE__ */ (function() {
    let n, t;
    return (e, i) => {
      if (!n) {
        const s = Zc.createCanvas();
        n = s && s.getContext("2d");
      }
      if (n)
        return t !== i && (t = n.font = i || Ns), n.measureText(e);
      {
        e = e || "", i = i || Ns;
        const s = /(\d+)px/.exec(i), r = s && +s[1] || 12;
        let o = 0;
        if (i.indexOf("mono") >= 0)
          o = r * e.length;
        else
          for (let a = 0; a < e.length; a++) {
            const l = i0[e[a]];
            o += l == null ? r : l * r;
          }
        return { width: o };
      }
    };
  })(),
  loadImage(n, t, e) {
    const i = new Image();
    return i.onload = t, i.onerror = e, i.src = n, i;
  }
}, hp = aa([
  "Function",
  "RegExp",
  "Date",
  "Error",
  "CanvasGradient",
  "CanvasPattern",
  // For node-canvas
  "Image",
  "Canvas"
], (n, t) => (n["[object " + t + "]"] = !0, n), {}), up = aa([
  "Int8",
  "Uint8",
  "Uint8Clamped",
  "Int16",
  "Uint16",
  "Int32",
  "Uint32",
  "Float32",
  "Float64"
], (n, t) => (n["[object " + t + "Array]"] = !0, n), {}), Oi = Object.prototype.toString, oa = Array.prototype, s0 = oa.forEach, r0 = oa.filter, Kc = oa.slice, o0 = oa.map, Kh = function() {
}.constructor, ar = Kh ? Kh.prototype : null, jc = "__proto__";
let a0 = 2311;
function l0() {
  return a0++;
}
function fp(...n) {
  typeof console != "undefined" && console.error.apply(console, n);
}
function V(n) {
  if (n == null || typeof n != "object")
    return n;
  let t = n;
  const e = Oi.call(n);
  if (e === "[object Array]") {
    if (!ds(n)) {
      t = [];
      for (let i = 0, s = n.length; i < s; i++)
        t[i] = V(n[i]);
    }
  } else if (up[e]) {
    if (!ds(n)) {
      const i = n.constructor;
      if (i.from)
        t = i.from(n);
      else {
        t = new i(n.length);
        for (let s = 0, r = n.length; s < r; s++)
          t[s] = n[s];
      }
    }
  } else if (!hp[e] && !ds(n) && !Fl(n)) {
    t = {};
    for (let i in n)
      n.hasOwnProperty(i) && i !== jc && (t[i] = V(n[i]));
  }
  return t;
}
function ut(n, t, e) {
  if (!O(t) || !O(n))
    return e ? V(t) : n;
  for (let i in t)
    if (t.hasOwnProperty(i) && i !== jc) {
      const s = n[i], r = t[i];
      O(r) && O(s) && !K(r) && !K(s) && !Fl(r) && !Fl(s) && !jh(r) && !jh(s) && !ds(r) && !ds(s) ? ut(s, r, e) : (e || !(i in n)) && (n[i] = V(t[i]));
    }
  return n;
}
function N(n, t) {
  if (Object.assign)
    Object.assign(n, t);
  else
    for (let e in t)
      t.hasOwnProperty(e) && e !== jc && (n[e] = t[e]);
  return n;
}
function yt(n, t, e) {
  const i = tt(t);
  for (let s = 0; s < i.length; s++) {
    let r = i[s];
    n[r] == null && (n[r] = t[r]);
  }
  return n;
}
function st(n, t) {
  if (n) {
    if (n.indexOf)
      return n.indexOf(t);
    for (let e = 0, i = n.length; e < i; e++)
      if (n[e] === t)
        return e;
  }
  return -1;
}
function Qc(n, t, e) {
  if (n = "prototype" in n ? n.prototype : n, t = "prototype" in t ? t.prototype : t, Object.getOwnPropertyNames) {
    const i = Object.getOwnPropertyNames(t);
    for (let s = 0; s < i.length; s++) {
      const r = i[s];
      r !== "constructor" && n[r] == null && (n[r] = t[r]);
    }
  } else
    yt(n, t);
}
function Ct(n) {
  return !n || typeof n == "string" ? !1 : typeof n.length == "number";
}
function D(n, t, e) {
  if (n && t)
    if (n.forEach && n.forEach === s0)
      n.forEach(t, e);
    else if (n.length === +n.length)
      for (let i = 0, s = n.length; i < s; i++)
        t.call(e, n[i], i, n);
    else
      for (let i in n)
        n.hasOwnProperty(i) && t.call(e, n[i], i, n);
}
function H(n, t, e) {
  if (!n)
    return [];
  if (!t)
    return Jc(n);
  if (n.map && n.map === o0)
    return n.map(t, e);
  {
    const i = [];
    for (let s = 0, r = n.length; s < r; s++)
      i.push(t.call(e, n[s], s, n));
    return i;
  }
}
function aa(n, t, e, i) {
  if (n && t) {
    for (let s = 0, r = n.length; s < r; s++)
      e = t.call(i, e, n[s], s, n);
    return e;
  }
}
function ne(n, t, e) {
  if (!n)
    return [];
  if (!t)
    return Jc(n);
  if (n.filter && n.filter === r0)
    return n.filter(t, e);
  {
    const i = [];
    for (let s = 0, r = n.length; s < r; s++)
      t.call(e, n[s], s, n) && i.push(n[s]);
    return i;
  }
}
function tt(n) {
  if (!n)
    return [];
  if (Object.keys)
    return Object.keys(n);
  let t = [];
  for (let e in n)
    n.hasOwnProperty(e) && t.push(e);
  return t;
}
function c0(n, t, ...e) {
  return function() {
    return n.apply(t, e.concat(Kc.call(arguments)));
  };
}
const P = ar && Q(ar.bind) ? ar.call.bind(ar.bind) : c0;
function uo(n, ...t) {
  return function() {
    return n.apply(this, t.concat(Kc.call(arguments)));
  };
}
function K(n) {
  return Array.isArray ? Array.isArray(n) : Oi.call(n) === "[object Array]";
}
function Q(n) {
  return typeof n == "function";
}
function X(n) {
  return typeof n == "string";
}
function h0(n) {
  return Oi.call(n) === "[object String]";
}
function Se(n) {
  return typeof n == "number";
}
function O(n) {
  const t = typeof n;
  return t === "function" || !!n && t === "object";
}
function jh(n) {
  return !!hp[Oi.call(n)];
}
function Di(n) {
  return !!up[Oi.call(n)];
}
function Fl(n) {
  return typeof n == "object" && typeof n.nodeType == "number" && typeof n.ownerDocument == "object";
}
function dp(n) {
  return n.colorStops != null;
}
function u0(n) {
  return Oi.call(n) === "[object RegExp]";
}
function zs(n) {
  return n !== n;
}
function Nl(...n) {
  for (let t = 0, e = n.length; t < e; t++)
    if (n[t] != null)
      return n[t];
}
function ie(n, t) {
  return n != null ? n : t;
}
function Jc(n, ...t) {
  return Kc.apply(n, t);
}
function f0(n) {
  if (typeof n == "number")
    return [n, n, n, n];
  const t = n.length;
  return t === 2 ? [n[0], n[1], n[0], n[1]] : t === 3 ? [n[0], n[1], n[2], n[1]] : n;
}
function la(n, t) {
  if (!n)
    throw new Error(t);
}
function rs(n) {
  return n == null ? null : typeof n.trim == "function" ? n.trim() : n.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
}
const d0 = "__ec_primitive__";
function ds(n) {
  return n[d0];
}
class p0 {
  constructor() {
    this.data = {};
  }
  delete(t) {
    const e = this.has(t);
    return e && delete this.data[t], e;
  }
  has(t) {
    return this.data.hasOwnProperty(t);
  }
  get(t) {
    return this.data[t];
  }
  set(t, e) {
    return this.data[t] = e, this;
  }
  keys() {
    return tt(this.data);
  }
  forEach(t) {
    const e = this.data;
    for (const i in e)
      e.hasOwnProperty(i) && t(e[i], i);
  }
}
const pp = typeof Map == "function";
function g0() {
  return pp ? /* @__PURE__ */ new Map() : new p0();
}
class th {
  constructor(t) {
    const e = K(t);
    this.data = g0();
    const i = this;
    t instanceof th ? t.each(s) : t && D(t, s);
    function s(r, o) {
      e ? i.set(r, o) : i.set(o, r);
    }
  }
  // `hasKey` instead of `has` for potential misleading.
  hasKey(t) {
    return this.data.has(t);
  }
  get(t) {
    return this.data.get(t);
  }
  set(t, e) {
    return this.data.set(t, e), e;
  }
  // Although util.each can be performed on this hashMap directly, user
  // should not use the exposed keys, who are prefixed.
  each(t, e) {
    this.data.forEach((i, s) => {
      t.call(e, i, s);
    });
  }
  keys() {
    const t = this.data.keys();
    return pp ? Array.from(t) : t;
  }
  // Do not use this method if performance sensitive.
  removeKey(t) {
    this.data.delete(t);
  }
}
function F(n) {
  return new th(n);
}
function _0(n, t) {
  const e = new n.constructor(n.length + t.length);
  for (let s = 0; s < n.length; s++)
    e[s] = n[s];
  const i = n.length;
  for (let s = 0; s < t.length; s++)
    e[s + i] = t[s];
  return e;
}
function ca(n, t) {
  let e;
  if (Object.create)
    e = Object.create(n);
  else {
    const i = function() {
    };
    i.prototype = n, e = new i();
  }
  return t && N(e, t), e;
}
function Te(n, t) {
  return n.hasOwnProperty(t);
}
function Ca() {
}
const m0 = 180 / Math.PI, y0 = "[Gantt] ", v0 = typeof console != "undefined" && // eslint-disable-next-line
console.warn && console.log;
function x0(n, t, e) {
  v0 && console[n](y0 + t);
}
function gp(n, t) {
  x0("warn", n);
}
function w0(...n) {
  let t = "";
  if (__DEV__) {
    const e = (i) => i === void 0 ? "undefined" : i === 1 / 0 ? "Infinity" : i === -1 / 0 ? "-Infinity" : zs(i) ? "NaN" : i instanceof Date ? "Date(" + i.toISOString() + ")" : Q(i) ? "function () { ... }" : u0(i) ? i + "" : null;
    t = H(n, (i) => {
      if (X(i))
        return i;
      {
        const s = e(i);
        if (s != null)
          return s;
        if (typeof JSON != "undefined" && JSON.stringify)
          try {
            return JSON.stringify(i, function(r, o) {
              const a = e(o);
              return a == null ? o : a;
            });
          } catch (r) {
            return "?";
          }
        else
          return "?";
      }
    }).join(" ");
  }
  return t;
}
function Jt(n) {
  throw new Error(n);
}
const Qh = 1e-4, S0 = 20;
function b0(n) {
  return n.replace(/^\s+|\s+$/g, "");
}
function T0() {
  return Math.round(Math.random() * 9);
}
const M0 = /^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d{1,2})(?::(\d{1,2})(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/;
function Vn(n) {
  if (n instanceof Date)
    return n;
  if (X(n)) {
    const t = M0.exec(n);
    if (!t)
      return /* @__PURE__ */ new Date(NaN);
    if (t[8]) {
      let e = +t[4] || 0;
      return t[8].toUpperCase() !== "Z" && (e -= +t[8].slice(0, 3)), new Date(
        Date.UTC(
          +t[1],
          +(t[2] || 1) - 1,
          +t[3] || 1,
          e,
          +(t[5] || 0),
          +t[6] || 0,
          t[7] ? +t[7].substring(0, 3) : 0
        )
      );
    } else
      return new Date(
        +t[1],
        +(t[2] || 1) - 1,
        +t[3] || 1,
        +t[4] || 0,
        +(t[5] || 0),
        +t[6] || 0,
        t[7] ? +t[7].substring(0, 3) : 0
      );
  } else if (n == null)
    return /* @__PURE__ */ new Date(NaN);
  return new Date(Math.round(n));
}
function _p(n) {
  if (n = +n, isNaN(n))
    return 0;
  if (n > 1e-14) {
    let t = 1;
    for (let e = 0; e < 15; e++, t *= 10)
      if (Math.round(n * t) / t === n)
        return e;
  }
  return C0(n);
}
function C0(n) {
  const t = n.toString().toLowerCase(), e = t.indexOf("e"), i = e > 0 ? +t.slice(e + 1) : 0, s = e > 0 ? e : t.length, r = t.indexOf("."), o = r < 0 ? 0 : s - 1 - r;
  return Math.max(0, o - i);
}
function mp(n, t) {
  const e = Math.log, i = Math.LN10, s = Math.floor(e(n[1] - n[0]) / i), r = Math.round(
    e(Math.abs(t[1] - t[0])) / i
  ), o = Math.min(Math.max(-s + r, 0), 20);
  return isFinite(o) ? o : 20;
}
function ot(n, t, e, i) {
  const s = t[0], r = t[1], o = e[0], a = e[1], l = r - s, c = a - o;
  if (l === 0)
    return c === 0 ? o : (o + a) / 2;
  if (i)
    if (l > 0) {
      if (n <= s)
        return o;
      if (n >= r)
        return a;
    } else {
      if (n >= s)
        return o;
      if (n <= r)
        return a;
    }
  else {
    if (n === s)
      return o;
    if (n === r)
      return a;
  }
  return (n - s) / l * c + o;
}
function yp(n, t) {
  return t === 0 ? n : yp(t, n % t);
}
function Jh(n, t) {
  return n == null ? t : t == null ? n : n * t / yp(n, t);
}
function jn(n, t) {
  switch (n) {
    case "center":
    case "middle":
      n = "50%";
      break;
    case "left":
    case "top":
      n = "0%";
      break;
    case "right":
    case "bottom":
      n = "100%";
      break;
  }
  return X(n) ? b0(n).match(/%$/) ? parseFloat(n) / 100 * t : parseFloat(n) : n == null ? NaN : +n;
}
function zl(n, t, e) {
  return t == null && (t = 10), t = Math.min(Math.max(0, t), S0), n = (+n).toFixed(t), e ? n : +n;
}
function D0(n) {
  if (n === 0)
    return 0;
  let t = Math.floor(Math.log(n) / Math.LN10);
  return n / Math.pow(10, t) >= 10 && t++, t;
}
function vp(n, t) {
  const e = D0(n), i = Math.pow(10, e), s = n / i;
  let r;
  return s < 1.5 ? r = 1 : s < 2.5 ? r = 2 : s < 4 ? r = 3 : s < 7 ? r = 5 : r = 10, n = r * i, e >= -20 ? +n.toFixed(e < 0 ? -e : 0) : n;
}
function I0(n) {
  const t = Math.PI * 2;
  return (n % t + t) % t;
}
function tu(n) {
  return n > -Qh && n < Qh;
}
function os(n) {
  return n.sort(function(t, e) {
    return t - e;
  }), n;
}
function E0(n) {
  const t = parseFloat(n);
  return t == n && // eslint-disable-line eqeqeq
  (t !== 0 || !X(n) || n.indexOf("x") <= 0) ? t : NaN;
}
function R0(n) {
  return !isNaN(E0(n));
}
const A0 = 800, L0 = 1e3, P0 = 5e3, k0 = 1e3, O0 = 1100, F0 = 2e3, N0 = 3e3, z0 = 4e3, B0 = 4500, $0 = 4600, H0 = 5e3, G0 = 6e3, Y0 = 7e3, W0 = {
  PROCESSOR: {
    FILTER: L0,
    SERIES_FILTER: A0,
    STATISTIC: P0
  },
  VISUAL: {
    LAYOUT: k0,
    PROGRESSIVE_LAYOUT: O0,
    GLOBAL: F0,
    CHART: N0,
    POST_CHART_LAYOUT: $0,
    COMPONENT: z0,
    BRUSH: H0,
    CHART_ITEM: B0,
    ARIA: G0,
    DECAL: Y0
  }
}, xp = "series\0", U0 = "\0_pi_\0";
function V0(n, t, e) {
  n.setAttribute ? n.setAttribute(t, e) : n[t] = e;
}
function q0(n, t) {
  return n.getAttribute ? n.getAttribute(t) : n[t];
}
function Vt(n) {
  return n instanceof Array ? n : n == null ? [] : [n];
}
function ps(n) {
  return ze(n, "");
}
function ze(n, t) {
  return n == null ? t : X(n) ? n : Se(n) || h0(n) ? n + "" : t;
}
function wp(n, t) {
  if (t.dataIndexInside != null)
    return t.dataIndexInside;
  if (t.dataIndex != null)
    return K(t.dataIndex) ? H(t.dataIndex, function(e) {
      return n.indexOfRawIndex(e);
    }) : n.indexOfRawIndex(t.dataIndex);
  if (t.name != null)
    return K(t.name) ? H(t.name, function(e) {
      return n.indexOfName(e);
    }) : n.indexOfName(t.name);
}
function ft() {
  const n = "__pi_inner_" + X0++;
  return function(t) {
    return t[n] || (t[n] = {});
  };
}
let X0 = T0();
function Z0(n) {
  const t = n.name;
  return !!(t && t.indexOf(xp));
}
function Bs(n) {
  return n && n.id != null && ps(n.id).indexOf(U0) === 0;
}
function K0(n, t, e) {
  const i = e === "normalMerge", s = e === "replaceMerge", r = e === "replaceAll";
  n = n || [], t = (t || []).slice();
  const o = F();
  D(t, function(l, c) {
    if (!O(l)) {
      t[c] = null;
      return;
    }
  });
  const a = j0(n, o, e);
  return (i || s) && Q0(a, n, o, t), i && J0(a, t), i || s ? tm(a, t, s) : r && em(a, t), nm(a), a;
}
function j0(n, t, e) {
  const i = [];
  if (e === "replaceAll")
    return i;
  for (let s = 0; s < n.length; s++) {
    const r = n[s];
    r && r.id != null && t.set(r.id, s), i.push({
      existing: e === "replaceMerge" || Bs(r) ? null : r,
      newOption: null,
      keyInfo: null,
      brandNew: null
    });
  }
  return i;
}
function Q0(n, t, e, i) {
  D(i, function(s, r) {
    if (!s || s.id == null)
      return;
    const o = ps(s.id), a = e.get(o);
    if (a != null) {
      const l = n[a];
      la(
        !l.newOption,
        'Duplicated option on id "' + o + '".'
      ), l.newOption = s, l.existing = t[a], i[r] = null;
    }
  });
}
function J0(n, t) {
  D(t, function(e, i) {
    if (!(!e || e.name == null))
      for (let s = 0; s < n.length; s++) {
        const r = n[s].existing;
        if (!n[s].newOption && // Consider name: two map to one.
        // Can not match when both ids existing but different.
        r && (r.id == null || e.id == null) && !Bs(e) && !Bs(r) && Sp("name", r, e)) {
          n[s].newOption = e, t[i] = null;
          return;
        }
      }
  });
}
function tm(n, t, e) {
  D(t, function(i) {
    if (!i)
      return;
    let s, r = 0;
    for (
      ;
      // Be `!resultItem` only when `nextIdx >= result.length`.
      (s = n[r]) && // (1) Existing models that already have id should be able to mapped to. Because
      // after mapping performed, model will always be assigned with an id if user not given.
      // After that all models have id.
      // (2) If new option has id, it can only set to a hole or append to the last. It should
      // not be merged to the existings with different id. Because id should not be overwritten.
      // (3) Name can be overwritten, because axis use name as 'show label text'.
      (s.newOption || Bs(s.existing) || // In mode "replaceMerge", here no not-mapped-non-internal-existing.
      s.existing && i.id != null && !Sp("id", i, s.existing));
    )
      r++;
    s ? (s.newOption = i, s.brandNew = e) : n.push({
      newOption: i,
      brandNew: e,
      existing: null,
      keyInfo: null
    }), r++;
  });
}
function em(n, t) {
  D(t, function(e) {
    n.push({
      newOption: e,
      brandNew: !0,
      existing: null,
      keyInfo: null
    });
  });
}
function nm(n) {
  const t = F();
  D(n, function(e) {
    const i = e.existing;
    i && t.set(i.id, e);
  }), D(n, function(e) {
    const i = e.newOption;
    la(
      !i || i.id == null || !t.get(i.id) || t.get(i.id) === e,
      "id duplicates: " + (i && i.id)
    ), i && i.id != null && t.set(i.id, e), !e.keyInfo && (e.keyInfo = {});
  }), D(n, function(e, i) {
    const s = e.existing, r = e.newOption, o = e.keyInfo;
    if (O(r)) {
      if (o.name = r.name != null ? ps(r.name) : s ? s.name : (
        // Avoid that different series has the same name,
        // because name may be used like in color pallet.
        xp + i
      ), s)
        o.id = ps(s.id);
      else if (r.id != null)
        o.id = ps(r.id);
      else {
        let a = 0;
        do
          o.id = "\0" + o.name + "\0" + a++;
        while (t.get(o.id));
      }
      t.set(o.id, e);
    }
  });
}
function Sp(n, t, e) {
  const i = ze(t[n], null), s = ze(e[n], null);
  return i != null && s != null && i === s;
}
function im(n, t, e) {
  D(n, function(i) {
    const s = i.newOption;
    O(s) && (i.keyInfo.mainType = t, i.keyInfo.subType = sm(
      t,
      s,
      i.existing,
      e
    ));
  });
}
function sm(n, t, e, i) {
  return t.type ? t.type : e ? e.subType : (
    // Use determineSubType only when there is no existComponent.
    i.determineSubType(
      n,
      t
    )
  );
}
const Me = {
  useDefault: !0,
  enableAll: !1,
  enableNone: !1
}, rm = {
  useDefault: !1,
  enableAll: !0,
  enableNone: !0
};
function eh(n, t, e, i) {
  i = i || Me;
  let s = e.index, r = e.id, o = e.name;
  const a = {
    models: null,
    specified: s != null || r != null || o != null
  };
  if (!a.specified) {
    let l;
    return a.models = i.useDefault && (l = n.getComponent(t)) ? [l] : [], a;
  }
  return s === "none" || s === !1 ? (a.models = [], a) : (s === "all" && (s = r = o = null), a.models = n.queryComponents({
    mainType: t,
    index: s,
    id: r,
    name: o
  }), a);
}
function om(n, t) {
  let e;
  if (X(n)) {
    const o = {};
    o[n + "Index"] = 0, e = o;
  } else
    e = n;
  const i = F(), s = {};
  let r = !1;
  return D(e, function(o, a) {
    if (a === "dataIndex" || a === "dataIndexInside") {
      s[a] = o;
      return;
    }
    const l = a.match(/^(\w+)(Index|Id|Name)$/) || [], c = l[1], h = (l[2] || "").toLowerCase();
    if (!c || !h || t)
      return;
    r = r || !!c;
    const u = i.get(c) || i.set(c, {});
    u[h] = o;
  }), { mainTypeSpecified: r, queryOptionMap: i, others: s };
}
function ha(n) {
  return O(n) && !K(n) && !(n instanceof Date) ? n.value : n;
}
function am(n) {
  return O(n) && !(n instanceof Array);
}
const fo = "\0__throttleOriginMethod", eu = "\0__throttleRate", nu = "\0__throttleType";
function bp(n, t, e) {
  let i, s = 0, r = 0, o = null, a, l, c, h;
  t = t || 0;
  function u() {
    r = (/* @__PURE__ */ new Date()).getTime(), o = null, n.apply(l, c || []);
  }
  const f = function(...d) {
    i = (/* @__PURE__ */ new Date()).getTime(), l = this, c = d;
    const p = h || t, _ = h || e;
    h = null, a = i - (_ ? s : r) - p, clearTimeout(o), _ ? o = setTimeout(u, p) : a >= 0 ? u() : o = setTimeout(u, -a), s = i;
  };
  return f.clear = function() {
    o && (clearTimeout(o), o = null);
  }, f.debounceNextCall = function(d) {
    h = d;
  }, f;
}
function Tp(n, t, e, i) {
  let s = n[t];
  if (!s)
    return;
  const r = s[fo] || s, o = s[nu];
  if (s[eu] !== e || o !== i) {
    if (e == null || !i)
      return n[t] = r;
    s = n[t] = bp(r, e, i === "debounce"), s[fo] = r, s[nu] = i, s[eu] = e;
  }
  return s;
}
function lm(n, t) {
  const e = n[t];
  e && e[fo] && (e.clear && e.clear(), n[t] = e[fo]);
}
let er = class {
  constructor(t) {
    t && (this._$eventProcessor = t);
  }
  /**
   * Bind a handler.
   *
   * @param event The event name.
   * @param Condition used on event filter.
   * @param handler The event handler.
   * @param context
   */
  on(t, e, i, s) {
    this._$handlers || (this._$handlers = {});
    const r = this._$handlers;
    if (typeof e == "function" && (s = i, i = e, e = null), !i || !t)
      return this;
    const o = this._$eventProcessor;
    e != null && o && o.normalizeQuery && (e = o.normalizeQuery(e)), r[t] || (r[t] = []);
    for (let h = 0; h < r[t].length; h++)
      if (r[t][h].h === i)
        return this;
    const a = {
      h: i,
      query: e,
      ctx: s || this,
      // FIXME
      // Do not publish this feature util it is proved that it makes sense.
      callAtLast: i.zrEventfulCallAtLast
    }, l = r[t].length - 1, c = r[t][l];
    return c && c.callAtLast ? r[t].splice(l, 0, a) : r[t].push(a), this;
  }
  /**
   * Whether any handler has bound.
   */
  isSilent(t) {
    const e = this._$handlers;
    return !e || !e[t] || !e[t].length;
  }
  /**
   * Unbind a event.
   *
   * @param eventType The event name.
   *        If no `event` input, "off" all listeners.
   * @param handler The event handler.
   *        If no `handler` input, "off" all listeners of the `event`.
   */
  off(t, e) {
    const i = this._$handlers;
    if (!i)
      return this;
    if (!t)
      return this._$handlers = {}, this;
    if (e) {
      if (i[t]) {
        const s = [];
        for (let r = 0, o = i[t].length; r < o; r++)
          i[t][r].h !== e && s.push(i[t][r]);
        i[t] = s;
      }
      i[t] && i[t].length === 0 && delete i[t];
    } else
      delete i[t];
    return this;
  }
  /**
   * Dispatch a event.
   *
   * @param {string} eventType The event name.
   */
  trigger(t, ...e) {
    if (!this._$handlers)
      return this;
    const i = this._$handlers[t], s = this._$eventProcessor;
    if (i) {
      const r = e.length, o = i.length;
      for (let a = 0; a < o; a++) {
        const l = i[a];
        if (!(s && s.filter && l.query != null && !s.filter(t, l.query)))
          switch (r) {
            case 0:
              l.h.call(l.ctx);
              break;
            case 1:
              l.h.call(l.ctx, e[0]);
              break;
            case 2:
              l.h.call(l.ctx, e[0], e[1]);
              break;
            default:
              l.h.apply(l.ctx, e);
              break;
          }
      }
    }
    return s && s.afterTrigger && s.afterTrigger(t), this;
  }
  /**
   * Dispatch a event with context, which is specified at the last parameter.
   *
   * @param {string} type The event name.
   */
  triggerWithContext(t, ...e) {
    if (!this._$handlers)
      return this;
    const i = this._$handlers[t], s = this._$eventProcessor;
    if (i) {
      const r = e.length, o = e[r - 1], a = i.length;
      for (let l = 0; l < a; l++) {
        const c = i[l];
        if (!(s && s.filter && c.query != null && !s.filter(t, c.query)))
          switch (r) {
            case 0:
              c.h.call(o);
              break;
            case 1:
              c.h.call(o, e[0]);
              break;
            case 2:
              c.h.call(o, e[0], e[1]);
              break;
            default:
              c.h.apply(o, e.slice(1, r - 1));
              break;
          }
      }
    }
    return s && s.afterTrigger && s.afterTrigger(t), this;
  }
};
const cm = ".", hm = "___PI__EXTENDED_CLASS___", cn = "___PI__COMPONENT__CONTAINER___";
function um(n) {
  la(
    /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(n),
    'componentType "' + n + '" illegal'
  );
}
function fm(n) {
  return !!(n && n[hm]);
}
function Ne(n) {
  const t = { main: "", sub: "" };
  if (n) {
    const e = n.split(cm);
    t.main = e[0] || "", t.sub = e[1] || "";
  }
  return t;
}
function ua(n) {
  const t = {};
  n.registerClass = function(i) {
    const s = i.type || i.prototype.type;
    if (s) {
      um(s), i.prototype.type = s;
      const r = Ne(s);
      if (!r.sub)
        t[r.main] && console.warn(r.main + " exists."), t[r.main] = i;
      else if (r.sub !== cn) {
        const o = e(r);
        o[r.sub] = i;
      }
    }
    return i;
  }, n.getClass = function(i, s, r) {
    let o = t[i];
    return o && o[cn] && (o = s ? o[s] : null), o;
  }, n.getAllClassMainTypes = function() {
    const i = [];
    return D(t, function(s, r) {
      i.push(r);
    }), i;
  }, n.getClassesByMainType = function(i) {
    const s = Ne(i), r = [], o = t[s.main];
    return o && o[cn] ? D(o, function(a, l) {
      l !== cn && r.push(a);
    }) : r.push(o), r;
  }, n.hasClass = function(i) {
    const s = Ne(i);
    return !!t[s.main];
  }, n.hasSubTypes = function(i) {
    const s = Ne(i), r = t[s.main];
    return r && r[cn];
  };
  function e(i) {
    let s = t[i.main];
    return (!s || !s[cn]) && (s = t[i.main] = {}, s[cn] = !0), s;
  }
}
let dm = Math.round(Math.random() * 10);
function fa(n) {
  return [n || "", dm++].join("_");
}
function pm(n) {
  const t = {};
  n.registerSubTypeDefaulter = function(e, i) {
    const s = Ne(e);
    t[s.main] = i;
  }, n.determineSubType = function(e, i) {
    let s = i.type;
    if (!s) {
      const r = Ne(e).main;
      n.hasSubTypes(e) && t[r] && (s = t[r](i));
    }
    return s;
  };
}
function gm(n, t) {
  n.topologicalTravel = function(r, o, a, l) {
    if (!r.length)
      return;
    const c = e(o), h = c.graph, u = c.noEntryList, f = {};
    for (D(r, function(_) {
      f[_] = !0;
    }); u.length; ) {
      const _ = u.pop(), g = h[_], m = !!f[_];
      m && (a.call(
        l,
        _,
        g.originalDeps.slice()
      ), delete f[_]), D(
        g.successor,
        m ? p : d
      );
    }
    D(f, function() {
      let _ = "";
      throw _ = w0(
        "Circular dependency may exists: ",
        f,
        r,
        o
      ), new Error(_);
    });
    function d(_) {
      h[_].entryCount--, h[_].entryCount === 0 && u.push(_);
    }
    function p(_) {
      f[_] = !0, d(_);
    }
  };
  function e(r) {
    const o = {}, a = [];
    return D(r, function(l) {
      const c = i(o, l), h = c.originalDeps = t(l), u = s(h, r);
      c.entryCount = u.length, c.entryCount === 0 && a.push(l), D(u, function(f) {
        st(c.predecessor, f) < 0 && c.predecessor.push(f);
        const d = i(o, f);
        st(d.successor, f) < 0 && d.successor.push(l);
      });
    }), { graph: o, noEntryList: a };
  }
  function i(r, o) {
    return r[o] || (r[o] = { predecessor: [], successor: [] }), r[o];
  }
  function s(r, o) {
    const a = [];
    return D(r, function(l) {
      st(o, l) >= 0 && a.push(l);
    }), a;
  }
}
function nh(n, t) {
  return ut(ut({}, n, !0), t, !0);
}
class Kt {
  constructor() {
    this.group = new zrender.Group(), this.uid = fa("viewComponent");
  }
  init(t, e) {
  }
  render(t, e, i, s) {
  }
  dispose(t, e) {
  }
  /**
   * Traverse the new rendered elements.
   *
   * It will traverse the new added element in progressive rendering.
   * And traverse all in normal rendering.
   */
  eachRendered(t) {
    const e = this.group;
    e && e.traverse(t);
  }
  /**
   * Hook for toggle blur target series.
   * Can be used in marker for blur or leave blur the markers
   */
  toggleBlurSeries(t, e, i) {
  }
}
ua(Kt);
let _m = class {
  constructor() {
    this.firefox = !1, this.ie = !1, this.edge = !1, this.newEdge = !1, this.weChat = !1;
  }
}, mm = class {
  constructor() {
    this.browser = new _m(), this.node = !1, this.wxa = !1, this.worker = !1, this.svgSupported = !1, this.touchEventsSupported = !1, this.pointerEventsSupported = !1, this.domSupported = !1, this.transformSupported = !1, this.transform3dSupported = !1, this.hasGlobalWindow = typeof window != "undefined";
  }
};
const te = new mm();
typeof wx == "object" && typeof wx.getSystemInfoSync == "function" ? (te.wxa = !0, te.touchEventsSupported = !0) : typeof document == "undefined" && typeof self != "undefined" ? te.worker = !0 : typeof navigator == "undefined" ? (te.node = !0, te.svgSupported = !0) : ym(navigator.userAgent, te);
function ym(n, t) {
  const e = t.browser, i = n.match(/Firefox\/([\d.]+)/), s = n.match(/MSIE\s([\d.]+)/) || n.match(/Trident\/.+?rv:(([\d.]+))/), r = n.match(/Edge?\/([\d.]+)/), o = /micromessenger/i.test(n);
  i && (e.firefox = !0, e.version = i[1]), s && (e.ie = !0, e.version = s[1]), r && (e.edge = !0, e.version = r[1], e.newEdge = +r[1].split(".")[0] > 18), o && (e.weChat = !0), t.svgSupported = typeof SVGRect != "undefined", t.touchEventsSupported = "ontouchstart" in window && !e.ie && !e.edge, t.pointerEventsSupported = "onpointerdown" in window && (e.edge || e.ie && +e.version >= 11), t.domSupported = typeof document != "undefined";
  const a = document.documentElement.style;
  t.transform3dSupported = // IE9 only supports transform 2D
  // transform 3D supported since IE10
  // we detect it by whether 'transition' is in style
  (e.ie && "transition" in a || e.edge || "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix() || "MozPerspective" in a) && !("OTransition" in a), t.transformSupported = t.transform3dSupported || e.ie && +e.version >= 9;
}
var Mp = 12, vm = "sans-serif", $s = Mp + "px " + vm, xm = 20, wm = 100, Sm = "007LLmW'55;N0500LLLLLLLLLL00NNNLzWW\\\\WQb\\0FWLg\\bWb\\WQ\\WrWWQ000CL5LLFLL0LL**F*gLLLL5F0LF\\FFF5.5N";
function bm(n) {
  var t = {};
  if (typeof JSON == "undefined")
    return t;
  for (var e = 0; e < n.length; e++) {
    var i = String.fromCharCode(e + 32), s = (n.charCodeAt(e) - xm) / wm;
    t[i] = s;
  }
  return t;
}
var Tm = bm(Sm), nr = {
  createCanvas: function() {
    return typeof document != "undefined" && document.createElement("canvas");
  },
  measureText: /* @__PURE__ */ (function() {
    var n, t;
    return function(e, i) {
      if (!n) {
        var s = nr.createCanvas();
        n = s && s.getContext("2d");
      }
      if (n)
        return t !== i && (t = n.font = i || $s), n.measureText(e);
      e = e || "", i = i || $s;
      var r = /(\d+)px/.exec(i), o = r && +r[1] || Mp, a = 0;
      if (i.indexOf("mono") >= 0)
        a = o * e.length;
      else
        for (var l = 0; l < e.length; l++) {
          var c = Tm[e[l]];
          a += c == null ? o : c * o;
        }
      return { width: a };
    };
  })(),
  loadImage: function(n, t, e) {
    var i = new Image();
    return i.onload = t, i.onerror = e, i.src = n, i;
  }
}, Cp = rh([
  "Function",
  "RegExp",
  "Date",
  "Error",
  "CanvasGradient",
  "CanvasPattern",
  "Image",
  "Canvas"
], function(n, t) {
  return n["[object " + t + "]"] = !0, n;
}, {}), Dp = rh([
  "Int8",
  "Uint8",
  "Uint8Clamped",
  "Int16",
  "Uint16",
  "Int32",
  "Uint32",
  "Float32",
  "Float64"
], function(n, t) {
  return n["[object " + t + "Array]"] = !0, n;
}, {}), da = Object.prototype.toString, pa = Array.prototype, Mm = pa.forEach, Cm = pa.filter, Ip = pa.slice, Dm = pa.map, iu = function() {
}.constructor, lr = iu ? iu.prototype : null, ih = "__proto__", Im = 2311;
function Em() {
  return Im++;
}
function sh() {
  for (var n = [], t = 0; t < arguments.length; t++)
    n[t] = arguments[t];
  typeof console != "undefined" && console.error.apply(console, n);
}
function Ii(n) {
  if (n == null || typeof n != "object")
    return n;
  var t = n, e = da.call(n);
  if (e === "[object Array]") {
    if (!gs(n)) {
      t = [];
      for (var i = 0, s = n.length; i < s; i++)
        t[i] = Ii(n[i]);
    }
  } else if (Dp[e]) {
    if (!gs(n)) {
      var r = n.constructor;
      if (r.from)
        t = r.from(n);
      else {
        t = new r(n.length);
        for (var i = 0, s = n.length; i < s; i++)
          t[i] = n[i];
      }
    }
  } else if (!Cp[e] && !gs(n) && !$l(n)) {
    t = {};
    for (var o in n)
      n.hasOwnProperty(o) && o !== ih && (t[o] = Ii(n[o]));
  }
  return t;
}
function je(n, t, e) {
  if (!se(t) || !se(n))
    return e ? Ii(t) : n;
  for (var i in t)
    if (t.hasOwnProperty(i) && i !== ih) {
      var s = n[i], r = t[i];
      se(r) && se(s) && !Ei(r) && !Ei(s) && !$l(r) && !$l(s) && !su(r) && !su(s) && !gs(r) && !gs(s) ? je(s, r, e) : (e || !(i in n)) && (n[i] = Ii(t[i]));
    }
  return n;
}
function R(n, t) {
  if (Object.assign)
    Object.assign(n, t);
  else
    for (var e in t)
      t.hasOwnProperty(e) && e !== ih && (n[e] = t[e]);
  return n;
}
function De(n, t, e) {
  for (var i = mt(t), s = 0; s < i.length; s++) {
    var r = i[s];
    n[r] == null && (n[r] = t[r]);
  }
  return n;
}
function Tt(n, t) {
  if (n) {
    if (n.indexOf)
      return n.indexOf(t);
    for (var e = 0, i = n.length; e < i; e++)
      if (n[e] === t)
        return e;
  }
  return -1;
}
function Fi(n, t, e) {
  if (n = "prototype" in n ? n.prototype : n, t = "prototype" in t ? t.prototype : t, Object.getOwnPropertyNames)
    for (var i = Object.getOwnPropertyNames(t), s = 0; s < i.length; s++) {
      var r = i[s];
      r !== "constructor" && n[r] == null && (n[r] = t[r]);
    }
  else
    De(n, t);
}
function Xt(n) {
  return !n || typeof n == "string" ? !1 : typeof n.length == "number";
}
function et(n, t, e) {
  if (n && t)
    if (n.forEach && n.forEach === Mm)
      n.forEach(t, e);
    else if (n.length === +n.length)
      for (var i = 0, s = n.length; i < s; i++)
        t.call(e, n[i], i, n);
    else
      for (var r in n)
        n.hasOwnProperty(r) && t.call(e, n[r], r, n);
}
function oe(n, t, e) {
  if (!n)
    return [];
  if (!t)
    return Ep(n);
  if (n.map && n.map === Dm)
    return n.map(t, e);
  for (var i = [], s = 0, r = n.length; s < r; s++)
    i.push(t.call(e, n[s], s, n));
  return i;
}
function rh(n, t, e, i) {
  if (n && t) {
    for (var s = 0, r = n.length; s < r; s++)
      e = t.call(i, e, n[s], s, n);
    return e;
  }
}
function po(n, t, e) {
  if (!n)
    return [];
  if (!t)
    return Ep(n);
  if (n.filter && n.filter === Cm)
    return n.filter(t, e);
  for (var i = [], s = 0, r = n.length; s < r; s++)
    t.call(e, n[s], s, n) && i.push(n[s]);
  return i;
}
function mt(n) {
  if (!n)
    return [];
  if (Object.keys)
    return Object.keys(n);
  var t = [];
  for (var e in n)
    n.hasOwnProperty(e) && t.push(e);
  return t;
}
function Rm(n, t) {
  for (var e = [], i = 2; i < arguments.length; i++)
    e[i - 2] = arguments[i];
  return function() {
    return n.apply(t, e.concat(Ip.call(arguments)));
  };
}
var Bl = lr && qn(lr.bind) ? lr.call.bind(lr.bind) : Rm;
function Ei(n) {
  return Array.isArray ? Array.isArray(n) : da.call(n) === "[object Array]";
}
function qn(n) {
  return typeof n == "function";
}
function qt(n) {
  return typeof n == "string";
}
function re(n) {
  return typeof n == "number";
}
function se(n) {
  var t = typeof n;
  return t === "function" || !!n && t === "object";
}
function su(n) {
  return !!Cp[da.call(n)];
}
function Am(n) {
  return !!Dp[da.call(n)];
}
function $l(n) {
  return typeof n == "object" && typeof n.nodeType == "number" && typeof n.ownerDocument == "object";
}
function ga(n) {
  return n.colorStops != null;
}
function Lm(n) {
  return n.image != null;
}
function Pm(n) {
  return n !== n;
}
function Hl(n, t) {
  return n != null ? n : t;
}
function Ep(n) {
  for (var t = [], e = 1; e < arguments.length; e++)
    t[e - 1] = arguments[e];
  return Ip.apply(n, t);
}
function cr(n) {
  return n == null ? null : typeof n.trim == "function" ? n.trim() : n.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
}
var km = "__ec_primitive__";
function gs(n) {
  return n[km];
}
function _a(n, t) {
  var e;
  if (Object.create)
    e = Object.create(n);
  else {
    var i = function() {
    };
    i.prototype = n, e = new i();
  }
  return t && R(e, t), e;
}
function Rp(n) {
  var t = n.style;
  t.webkitUserSelect = "none", t.userSelect = "none", t.webkitTapHighlightColor = "rgba(0,0,0,0)", t["-webkit-touch-callout"] = "none";
}
function hr(n, t) {
  return n.hasOwnProperty(t);
}
function Da() {
}
var Om = 180 / Math.PI;
function oh(n, t) {
  for (let e = 0; e < n.length; e++)
    n[e][1] || (n[e][1] = n[e][0]);
  return t = t || !1, function(e, i, s) {
    const r = {};
    for (let o = 0; o < n.length; o++) {
      const a = n[o][1];
      if (i && Tt(i, a) >= 0 || s && Tt(s, a) < 0)
        continue;
      const l = e.getShallow(a, t);
      l != null && (r[n[o][0]] = l);
    }
    return r;
  };
}
const Fm = [
  ["lineWidth", "width"],
  ["stroke", "color"],
  ["opacity"],
  ["shadowBlur"],
  ["shadowOffsetX"],
  ["shadowOffsetY"],
  ["shadowColor"],
  ["lineDash", "type"],
  ["lineDashOffset", "dashOffset"],
  ["lineCap", "cap"],
  ["lineJoin", "join"],
  ["miterLimit"]
], Nm = oh(Fm);
class zm {
  getLineStyle(t) {
    return Nm(this, t);
  }
}
const ah = {}, ru = [
  "fontStyle",
  "fontWeight",
  "fontSize",
  "fontFamily",
  "textShadowColor",
  "textShadowBlur",
  "textShadowOffsetX",
  "textShadowOffsetY"
], ou = [
  "align",
  "lineHeight",
  "width",
  "height",
  "tag",
  "verticalAlign",
  "ellipsis"
], au = [
  "padding",
  "borderWidth",
  "borderRadius",
  "borderDashOffset",
  "backgroundColor",
  "borderColor",
  "shadowColor",
  "shadowBlur",
  "shadowOffsetX",
  "shadowOffsetY"
];
function Ap(n, t, e, i, s) {
  const r = {};
  return Bm(r, n, e, i, s), t && N(r, t), r;
}
function Bm(n, t, e, i, s) {
  e = e || ah;
  const r = t.piModel, o = r && r.option.textStyle, a = $m(t);
  let l;
  if (a) {
    l = {};
    for (const u in a)
      if (a.hasOwnProperty(u)) {
        const f = t.getModel(["rich", u]);
        lu(
          l[u] = {},
          f,
          o,
          e,
          i,
          s,
          !1,
          !0
        );
      }
  }
  l && (n.rich = l);
  const c = t.get("overflow");
  c && (n.overflow = c);
  const h = t.get("minMargin");
  h != null && (n.margin = h), lu(
    n,
    t,
    o,
    e,
    i,
    s,
    !0,
    !1
  );
}
function lu(n, t, e, i, s, r, o, a) {
  e = e || ah;
  const l = i && i.inheritColor;
  let c = t.getShallow("color"), h = t.getShallow("textBorderColor"), u = ie(
    t.getShallow("opacity"),
    e.opacity
  );
  (c === "inherit" || c === "auto") && (l ? c = l : c = null), (h === "inherit" || h === "auto") && (l ? h = l : h = null), c = c || e.color, h = h || e.textBorderColor, c != null && (n.fill = c), h != null && (n.stroke = h);
  const f = ie(
    t.getShallow("textBorderWidth"),
    e.textBorderWidth
  );
  f != null && (n.lineWidth = f);
  const d = ie(
    t.getShallow("textBorderType"),
    e.textBorderType
  );
  d != null && (n.lineDash = d);
  const p = ie(
    t.getShallow("textBorderDashOffset"),
    e.textBorderDashOffset
  );
  p != null && (n.lineDashOffset = p), u == null && !a && (u = i && i.defaultOpacity), u != null && (n.opacity = u), n.fill == null && i.inheritColor && (n.fill = i.inheritColor);
  for (let _ = 0; _ < ru.length; _++) {
    const g = ru[_], m = ie(t.getShallow(g), e[g]);
    m != null && (n[g] = m);
  }
  for (let _ = 0; _ < ou.length; _++) {
    const g = ou[_], m = t.getShallow(g);
    m != null && (n[g] = m);
  }
  if (n.verticalAlign == null) {
    const _ = t.getShallow("baseline");
    _ != null && (n.verticalAlign = _);
  }
  if (!o || !i.disableBox) {
    for (let g = 0; g < au.length; g++) {
      const m = au[g], y = t.getShallow(m);
      y != null && (n[m] = y);
    }
    const _ = t.getShallow("borderType");
    _ != null && (n.borderDash = _), (n.backgroundColor === "auto" || n.backgroundColor === "inherit") && l && (n.backgroundColor = l), (n.borderColor === "auto" || n.borderColor === "inherit") && l && (n.borderColor = l);
  }
}
function $m(n) {
  let t;
  for (; n && n !== n.piModel; ) {
    const e = (n.option || ah).rich;
    if (e) {
      t = t || {};
      const i = tt(e);
      for (let s = 0; s < i.length; s++) {
        const r = i[s];
        t[r] = 1;
      }
    }
    n = n.parentModel;
  }
  return t;
}
function Hm(n, t) {
  const e = t && t.getModel("textStyle");
  return rs(
    [
      // FIXME in node-canvas fontWeight is before fontStyle
      n.fontStyle || e && e.getShallow("fontStyle") || "",
      n.fontWeight || e && e.getShallow("fontWeight") || "",
      (n.fontSize || e && e.getShallow("fontSize") || 12) + "px",
      n.fontFamily || e && e.getShallow("fontFamily") || "sans-serif"
    ].join(" ")
  );
}
const Gm = ["textStyle", "color"];
class Ym {
  getTextColor(t) {
    const e = this.piModel;
    return this.getShallow("color") || (!t && e ? e.get(Gm) : null);
  }
  getFont() {
    return Hm(
      {
        fontStyle: this.getShallow("fontStyle"),
        fontWeight: this.getShallow("fontWeight"),
        fontSize: this.getShallow("fontSize"),
        fontFamily: this.getShallow("fontFamily")
      },
      this.piModel
    );
  }
}
const Wm = [
  ["fill", "color"],
  ["stroke", "borderColor"],
  ["lineWidth", "borderWidth"],
  ["opacity"],
  ["shadowBlur"],
  ["shadowOffsetX"],
  ["shadowOffsetY"],
  ["shadowColor"],
  ["lineDash", "borderType"],
  ["lineDashOffset", "borderDashOffset"],
  ["lineCap", "borderCap"],
  ["lineJoin", "borderJoin"],
  ["miterLimit", "borderMiterLimit"]
  // Option decal is in `DecalObject` but style.decal is in `PatternObject`.
  // So do not transfer decal directly.
], Um = oh(Wm);
class Vm {
  getItemStyle(t, e) {
    return Um(this, t, e);
  }
}
const qm = [
  ["fill", "color"],
  ["shadowBlur"],
  ["shadowOffsetX"],
  ["shadowOffsetY"],
  ["opacity"],
  ["shadowColor"]
  // Option decal is in `DecalObject` but style.decal is in `PatternObject`.
  // So do not transfer decal directly.
], Xm = oh(qm);
class Zm {
  getAreaStyle(t, e) {
    return Xm(this, t, e);
  }
}
class Dt {
  constructor(t, e, i) {
    this.parentModel = e, this.piModel = i, this.option = t;
  }
  init(t, e, i, ...s) {
  }
  // `path` can be 'a.b.c', so the return value type have to be `ModelOption`
  // TODO: TYPE strict key check?
  // get(path: string | string[], ignoreParent?: boolean): ModelOption;
  get(t, e) {
    return t == null ? this.option : this._doGet(this.parsePath(t), !e && this.parentModel);
  }
  getShallow(t, e) {
    const i = this.option;
    let s = i == null ? i : i[t];
    if (s == null && !e) {
      const r = this.parentModel;
      r && (s = r.getShallow(t));
    }
    return s;
  }
  // `path` can be 'a.b.c', so the return value type have to be `Model<ModelOption>`
  // getModel(path: string | string[], parentModel?: Model): Model;
  // TODO 'a.b.c' is deprecated
  getModel(t, e) {
    const i = t != null, s = i ? this.parsePath(t) : null, r = i ? this._doGet(s) : this.option;
    return e = e || this.parentModel && this.parentModel.getModel(
      this.resolveParentPath(s)
    ), new Dt(r, e, this.piModel);
  }
  restoreData() {
  }
  parsePath(t) {
    return typeof t == "string" ? t.split(".") : t;
  }
  resolveParentPath(t) {
    return t;
  }
  isAnimationEnabled() {
    if (!te.node && this.option) {
      if (this.option.animation != null)
        return !!this.option.animation;
      if (this.parentModel)
        return this.parentModel.isAnimationEnabled();
    }
  }
  _doGet(t, e) {
    let i = this.option;
    if (!t)
      return i;
    for (let s = 0; s < t.length && !(t[s] && (i = i && typeof i == "object" ? i[t[s]] : null, i == null)); s++)
      ;
    return i == null && e && (i = e._doGet(
      this.resolveParentPath(t),
      e.parentModel
    )), i;
  }
}
Fi(Dt, zm);
Fi(Dt, Ym);
Fi(Dt, Vm);
Fi(Dt, Zm);
function go() {
  return [1, 0, 0, 1, 0, 0];
}
function Lp(n) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 1, n[4] = 0, n[5] = 0, n;
}
function Km(n, t) {
  return n[0] = t[0], n[1] = t[1], n[2] = t[2], n[3] = t[3], n[4] = t[4], n[5] = t[5], n;
}
function _s(n, t, e) {
  const i = t[0] * e[0] + t[2] * e[1], s = t[1] * e[0] + t[3] * e[1], r = t[0] * e[2] + t[2] * e[3], o = t[1] * e[2] + t[3] * e[3], a = t[0] * e[4] + t[2] * e[5] + t[4], l = t[1] * e[4] + t[3] * e[5] + t[5];
  return n[0] = i, n[1] = s, n[2] = r, n[3] = o, n[4] = a, n[5] = l, n;
}
function cu(n, t, e) {
  return n[0] = t[0], n[1] = t[1], n[2] = t[2], n[3] = t[3], n[4] = t[4] + e[0], n[5] = t[5] + e[1], n;
}
function Pp(n, t, e) {
  const i = t[0], s = t[2], r = t[4], o = t[1], a = t[3], l = t[5], c = Math.sin(e), h = Math.cos(e);
  return n[0] = i * h + o * c, n[1] = -i * c + o * h, n[2] = s * h + a * c, n[3] = -s * c + h * a, n[4] = h * r + c * l, n[5] = h * l - c * r, n;
}
function jm(n, t, e) {
  const i = e[0], s = e[1];
  return n[0] = t[0] * i, n[1] = t[1] * s, n[2] = t[2] * i, n[3] = t[3] * s, n[4] = t[4] * i, n[5] = t[5] * s, n;
}
function Qm(n, t) {
  const e = t[0], i = t[2], s = t[4], r = t[1], o = t[3], a = t[5];
  let l = e * o - r * i;
  return l ? (l = 1 / l, n[0] = o * l, n[1] = -r * l, n[2] = -i * l, n[3] = e * l, n[4] = (i * a - o * s) * l, n[5] = (r * s - e * a) * l, n) : null;
}
let at = class kp {
  constructor(t, e) {
    this.x = t || 0, this.y = e || 0;
  }
  /**
   * Copy from another point
   */
  copy(t) {
    return this.x = t.x, this.y = t.y, this;
  }
  /**
   * Clone a point
   */
  clone() {
    return new kp(this.x, this.y);
  }
  /**
   * Set x and y
   */
  set(t, e) {
    return this.x = t, this.y = e, this;
  }
  /**
   * If equal to another point
   */
  equal(t) {
    return t.x === this.x && t.y === this.y;
  }
  /**
   * Add another point
   */
  add(t) {
    return this.x += t.x, this.y += t.y, this;
  }
  scale(t) {
    this.x *= t, this.y *= t;
  }
  scaleAndAdd(t, e) {
    this.x += t.x * e, this.y += t.y * e;
  }
  /**
   * Sub another point
   */
  sub(t) {
    return this.x -= t.x, this.y -= t.y, this;
  }
  /**
   * Dot product with other point
   */
  dot(t) {
    return this.x * t.x + this.y * t.y;
  }
  /**
   * Get length of point
   */
  len() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  /**
   * Get squared length
   */
  lenSquare() {
    return this.x * this.x + this.y * this.y;
  }
  /**
   * Normalize
   */
  normalize() {
    const t = this.len();
    return this.x /= t, this.y /= t, this;
  }
  /**
   * Distance to another point
   */
  distance(t) {
    const e = this.x - t.x, i = this.y - t.y;
    return Math.sqrt(e * e + i * i);
  }
  /**
   * Square distance to another point
   */
  distanceSquare(t) {
    const e = this.x - t.x, i = this.y - t.y;
    return e * e + i * i;
  }
  /**
   * Negate
   */
  negate() {
    return this.x = -this.x, this.y = -this.y, this;
  }
  /**
   * Apply a transform matrix array.
   */
  transform(t) {
    if (!t)
      return;
    const e = this.x, i = this.y;
    return this.x = t[0] * e + t[2] * i + t[4], this.y = t[1] * e + t[3] * i + t[5], this;
  }
  toArray(t) {
    return t[0] = this.x, t[1] = this.y, t;
  }
  fromArray(t) {
    this.x = t[0], this.y = t[1];
  }
  static set(t, e, i) {
    t.x = e, t.y = i;
  }
  static copy(t, e) {
    t.x = e.x, t.y = e.y;
  }
  static len(t) {
    return Math.sqrt(t.x * t.x + t.y * t.y);
  }
  static lenSquare(t) {
    return t.x * t.x + t.y * t.y;
  }
  static dot(t, e) {
    return t.x * e.x + t.y * e.y;
  }
  static add(t, e, i) {
    t.x = e.x + i.x, t.y = e.y + i.y;
  }
  static sub(t, e, i) {
    t.x = e.x - i.x, t.y = e.y - i.y;
  }
  static scale(t, e, i) {
    t.x = e.x * i, t.y = e.y * i;
  }
  static scaleAndAdd(t, e, i, s) {
    t.x = e.x + i.x * s, t.y = e.y + i.y * s;
  }
  static lerp(t, e, i, s) {
    const r = 1 - s;
    t.x = r * e.x + s * i.x, t.y = r * e.y + s * i.y;
  }
};
const ur = Math.min, fr = Math.max, hn = new at(), un = new at(), fn = new at(), dn = new at(), Wi = new at(), Ui = new at();
let Mt = class Xe {
  constructor(t, e, i, s) {
    i < 0 && (t = t + i, i = -i), s < 0 && (e = e + s, s = -s), this.x = t, this.y = e, this.width = i, this.height = s;
  }
  union(t) {
    const e = ur(t.x, this.x), i = ur(t.y, this.y);
    isFinite(this.x) && isFinite(this.width) ? this.width = fr(
      t.x + t.width,
      this.x + this.width
    ) - e : this.width = t.width, isFinite(this.y) && isFinite(this.height) ? this.height = fr(
      t.y + t.height,
      this.y + this.height
    ) - i : this.height = t.height, this.x = e, this.y = i;
  }
  applyTransform(t) {
    Xe.applyTransform(this, this, t);
  }
  calculateTransform(t) {
    const e = this, i = t.width / e.width, s = t.height / e.height, r = go();
    return cu(r, r, [-e.x, -e.y]), jm(r, r, [i, s]), cu(r, r, [t.x, t.y]), r;
  }
  intersect(t, e) {
    if (!t)
      return !1;
    t instanceof Xe || (t = Xe.create(t));
    const i = this, s = i.x, r = i.x + i.width, o = i.y, a = i.y + i.height, l = t.x, c = t.x + t.width, h = t.y, u = t.y + t.height;
    let f = !(r < l || c < s || a < h || u < o);
    if (e) {
      let d = 1 / 0, p = 0;
      const _ = Math.abs(r - l), g = Math.abs(c - s), m = Math.abs(a - h), y = Math.abs(u - o), v = Math.min(_, g), S = Math.min(m, y);
      r < l || c < s ? v > p && (p = v, _ < g ? at.set(Ui, -_, 0) : at.set(Ui, g, 0)) : v < d && (d = v, _ < g ? at.set(Wi, _, 0) : at.set(Wi, -g, 0)), a < h || u < o ? S > p && (p = S, m < y ? at.set(Ui, 0, -m) : at.set(Ui, 0, y)) : v < d && (d = v, m < y ? at.set(Wi, 0, m) : at.set(Wi, 0, -y));
    }
    return e && at.copy(e, f ? Wi : Ui), f;
  }
  contain(t, e) {
    const i = this;
    return t >= i.x && t <= i.x + i.width && e >= i.y && e <= i.y + i.height;
  }
  clone() {
    return new Xe(this.x, this.y, this.width, this.height);
  }
  /**
   * Copy from another rect
   */
  copy(t) {
    Xe.copy(this, t);
  }
  plain() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  }
  /**
   * If not having NaN or Infinity with attributes
   */
  isFinite() {
    return isFinite(this.x) && isFinite(this.y) && isFinite(this.width) && isFinite(this.height);
  }
  isZero() {
    return this.width === 0 || this.height === 0;
  }
  static create(t) {
    return new Xe(t.x, t.y, t.width, t.height);
  }
  static copy(t, e) {
    t.x = e.x, t.y = e.y, t.width = e.width, t.height = e.height;
  }
  static applyTransform(t, e, i) {
    if (!i) {
      t !== e && Xe.copy(t, e);
      return;
    }
    if (i[1] < 1e-5 && i[1] > -1e-5 && i[2] < 1e-5 && i[2] > -1e-5) {
      const o = i[0], a = i[3], l = i[4], c = i[5];
      t.x = e.x * o + l, t.y = e.y * a + c, t.width = e.width * o, t.height = e.height * a, t.width < 0 && (t.x += t.width, t.width = -t.width), t.height < 0 && (t.y += t.height, t.height = -t.height);
      return;
    }
    hn.x = fn.x = e.x, hn.y = dn.y = e.y, un.x = dn.x = e.x + e.width, un.y = fn.y = e.y + e.height, hn.transform(i), dn.transform(i), un.transform(i), fn.transform(i), t.x = ur(hn.x, un.x, fn.x, dn.x), t.y = ur(hn.y, un.y, fn.y, dn.y);
    const s = fr(hn.x, un.x, fn.x, dn.x), r = fr(hn.y, un.y, fn.y, dn.y);
    t.width = s - t.x, t.height = r - t.y;
  }
};
const Jm = f0;
function ty(n) {
  if (!R0(n))
    return X(n) ? n : "-";
  const t = (n + "").split(".");
  return t[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") + (t.length > 1 ? "." + t[1] : "");
}
const ey = [
  "left",
  "right",
  "top",
  "bottom",
  "width",
  "height"
], dr = [
  ["width", "left", "right"],
  ["height", "top", "bottom"]
];
function Op(n) {
  const t = n.layoutMode || n.constructor.layoutMode;
  return O(t) ? t : t ? { type: t } : null;
}
function Hs(n) {
  return ny({}, n);
}
function ny(n, t) {
  return t && n && et(ey, function(e) {
    t.hasOwnProperty(e) && (n[e] = t[e]);
  }), n;
}
function Fp(n, t, e) {
  let i = e && e.ignoreSize;
  !K(i) && (i = [i, i]);
  const s = o(dr[0], 0), r = o(dr[1], 1);
  c(dr[0], n, s), c(dr[1], n, r);
  function o(h, u) {
    const f = {};
    let d = 0;
    const p = {};
    let _ = 0;
    const g = 2;
    if (et(h, function(m) {
      p[m] = n[m];
    }), et(h, function(m) {
      a(t, m) && (f[m] = p[m] = t[m]), l(f, m) && d++, l(p, m) && _++;
    }), i[u])
      return l(t, h[1]) ? p[h[2]] = null : l(t, h[2]) && (p[h[1]] = null), p;
    if (_ === g || !d)
      return p;
    if (d >= g)
      return f;
    for (let m = 0; m < h.length; m++) {
      const y = h[m];
      if (!a(f, y) && a(n, y)) {
        f[y] = n[y];
        break;
      }
    }
    return f;
  }
  function a(h, u) {
    return h.hasOwnProperty(u);
  }
  function l(h, u) {
    return h[u] != null && h[u] !== "auto";
  }
  function c(h, u, f) {
    et(h, function(d) {
      u[d] = f[d];
    });
  }
}
function Gs(n, t, e) {
  e = Jm(e || 0);
  const i = t.width, s = t.height;
  let r = jn(n.left, i), o = jn(n.top, s);
  const a = jn(n.right, i), l = jn(n.bottom, s);
  let c = jn(n.width, i), h = jn(n.height, s);
  const u = e[2] + e[0], f = e[1] + e[3], d = n.aspect;
  switch (isNaN(c) && (c = i - a - f - r), isNaN(h) && (h = s - l - u - o), d != null && (isNaN(c) && isNaN(h) && (d > i / s ? c = i * 0.8 : h = s * 0.8), isNaN(c) && (c = d * h), isNaN(h) && (h = c / d)), isNaN(r) && (r = i - a - c - f), isNaN(o) && (o = s - l - h - u), n.left || n.right) {
    case "center":
      r = i / 2 - c / 2 - e[3];
      break;
    case "right":
      r = i - c - f;
      break;
  }
  switch (n.top || n.bottom) {
    case "middle":
    case "center":
      o = s / 2 - h / 2 - e[0];
      break;
    case "bottom":
      o = s - h - u;
      break;
  }
  r = r || 0, o = o || 0, isNaN(c) && (c = i - f - r - (a || 0)), isNaN(h) && (h = s - u - o - (l || 0));
  const p = new Mt(
    r + e[3],
    o + e[0],
    c,
    h
  );
  return p.margin = e, p;
}
const iy = ft();
class U extends Dt {
  constructor(t, e, i) {
    super(t, e, i), this.uid = fa("pi_cpt_model");
  }
  init(t, e, i) {
    this.mergeDefaultAndTheme(t, i);
  }
  mergeDefaultAndTheme(t, e) {
    ut(t, this.getDefaultOption());
  }
  mergeOption(t, e) {
    ut(this.option, t, !0);
    const i = Op(this);
    i && Fp(
      this.option,
      t,
      i
    );
  }
  optionUpdated(t, e) {
  }
  getDefaultOption() {
    const t = this.constructor;
    if (!fm(t))
      return t.defaultOption;
    const e = iy(this);
    if (!e.defaultOption) {
      const i = [];
      let s = t;
      for (; s; ) {
        const o = s.prototype.defaultOption;
        o && i.push(o), s = s.superClass;
      }
      let r = {};
      for (let o = i.length - 1; o >= 0; o--)
        r = ut(r, i[o], !0);
      e.defaultOption = r;
    }
    return e.defaultOption;
  }
  getReferringComponents(t, e) {
    const i = t + "Index", s = t + "Id";
    return eh(
      this.piModel,
      t,
      {
        index: this.get(i, !0),
        id: this.get(s, !0)
      },
      e
    );
  }
  getBoxLayoutParams() {
    const t = this;
    return {
      left: t.get("left"),
      top: t.get("top"),
      right: t.get("right"),
      bottom: t.get("bottom"),
      width: t.get("width"),
      height: t.get("height")
    };
  }
}
ua(U);
pm(
  U
);
gm(
  U,
  sy
);
function sy(n) {
  let t = [];
  return D(
    U.getClassesByMainType(
      n
    ),
    function(e) {
      t = t.concat(
        e.dependencies || e.prototype.dependencies || []
      );
    }
  ), t = H(t, function(e) {
    return Ne(e).main;
  }), n !== "dataset" && st(t, "dataset") <= 0 && t.unshift("dataset"), t;
}
function ms(n) {
  return new ry(n);
}
class ry {
  constructor(t = {}) {
    this._reset = t.reset, this._plan = t.plan, this._count = t.count, this._onDirty = t.onDirty, this._dirty = !0;
  }
  perform(t) {
    const e = this._upstream, i = t == null ? void 0 : t.skip;
    if (this._dirty && e) {
      const f = this.context;
      f.data = f.outputData = e.context.outputData;
    }
    this.__pipeline && (this.__pipeline.currentTask = this);
    let s;
    this._plan && !i && (s = this._plan(this.context));
    const r = c(this._modBy), o = this._modDataCount || 0, a = c(t == null ? void 0 : t.modBy), l = (t == null ? void 0 : t.modDataCount) || 0;
    (r !== a || o !== l) && (s = "reset");
    function c(f) {
      return !(f >= 1) && (f = 1), f;
    }
    let h;
    (this._dirty || s === "reset") && (this._dirty = !1, h = this._doReset(i)), this._modBy = a, this._modDataCount = l;
    const u = t == null ? void 0 : t.step;
    if (e ? this._dueEnd = e._outputDueEnd : this._dueEnd = this._count ? this._count(this.context) : 1 / 0, this._progress) {
      const f = this._dueIndex, d = Math.min(
        u != null ? this._dueIndex + u : 1 / 0,
        this._dueEnd
      );
      if (!i && (h || f < d)) {
        const _ = this._progress;
        if (K(_))
          for (let g = 0; g < _.length; g++)
            this._doProgress(_[g], f, d, a, l);
        else
          this._doProgress(_, f, d, a, l);
      }
      this._dueIndex = d;
      const p = this._settedOutputEnd != null ? this._settedOutputEnd : d;
      this._outputDueEnd = p;
    } else
      this._dueIndex = this._outputDueEnd = this._settedOutputEnd != null ? this._settedOutputEnd : this._dueEnd;
    return this.unfinished();
  }
  dirty() {
    this._dirty = !0, this._onDirty && this._onDirty(this.context);
  }
  _doProgress(t, e, i, s, r) {
    hu.reset(e, i, s, r), this._callingProgress = t, this._callingProgress(
      {
        start: e,
        end: i,
        count: i - e,
        next: hu.next
      },
      this.context
    );
  }
  _doReset(t) {
    this._dueIndex = this._outputDueEnd = this._dueEnd = 0, this._settedOutputEnd = null;
    let e, i;
    !t && this._reset && (e = this._reset(this.context), e && e.progress && (i = e.forceFirstProgress, e = e.progress), K(e) && !e.length && (e = null)), this._progress = e, this._modBy = this._modDataCount = null;
    const s = this._downstream;
    return s && s.dirty(), i;
  }
  unfinished() {
    return this._progress && this._dueIndex < this._dueEnd;
  }
  pipe(t) {
    (this._downstream !== t || this._dirty) && (this._downstream = t, t._upstream = this, t.dirty());
  }
  dispose() {
    this._disposed || (this._upstream && (this._upstream._downstream = null), this._downstream && (this._downstream._upstream = null), this._dirty = !1, this._disposed = !0);
  }
  getUpstream() {
    return this._upstream;
  }
  getDownstream() {
    return this._downstream;
  }
  setOutputEnd(t) {
    this._outputDueEnd = this._settedOutputEnd = t;
  }
}
const hu = /* @__PURE__ */ (function() {
  let n, t, e, i, s;
  const r = {
    reset: function(l, c, h, u) {
      t = l, n = c, e = h, i = u, s = Math.ceil(i / e), r.next = e > 1 && i > 0 ? a : o;
    }
  };
  return r;
  function o() {
    return t < n ? t++ : null;
  }
  function a() {
    const l = t % s * e + Math.ceil(t / s), c = t >= n ? null : l < i ? l : (
      // If modDataCount is smaller than data.count() (consider `appendData` case),
      // Use normal linear rendering mode.
      t
    );
    return t++, c;
  }
})(), Np = F(["tooltip", "label", "itemName", "itemId", "itemGroupId", "seriesName"]), oy = "undefined", ay = typeof Int32Array === oy ? Array : Int32Array, ae = "original", vt = "arrayRows", Ie = "objectRows", $e = "keyedColumns", tn = "typedArray", zp = "unknown", Be = "column", Ni = "row", wt = {
  Must: 1,
  // Encounter string but not '-' and not number-like.
  Might: 2,
  // Encounter string but number-like.
  Not: 3
  // Other cases
}, ly = ft();
function Bp(n) {
  if (!n.get("data", !0))
    return eh(
      n.piModel,
      "dataset",
      {
        index: n.get("datasetIndex", !0),
        id: n.get("datasetId", !0)
      },
      Me
    ).models[0];
}
function cy(n) {
  return !n.get("transform", !0) && !n.get("fromTransformResult", !0) ? [] : eh(
    n.piModel,
    "dataset",
    {
      index: n.get("fromDatasetIndex", !0),
      id: n.get("fromDatasetId", !0)
    },
    Me
  ).models;
}
function $p(n, t) {
  return hy(
    n.data,
    n.sourceFormat,
    n.seriesLayoutBy,
    n.dimensionsDefine,
    n.startIndex,
    t
  );
}
function hy(n, t, e, i, s, r) {
  let o;
  if (Di(n))
    return wt.Not;
  let l, c;
  if (i) {
    const u = i[r];
    O(u) ? (l = u.name, c = u.type) : X(u) && (l = u);
  }
  if (c != null)
    return c === "ordinal" ? wt.Must : wt.Not;
  if (t === vt) {
    const u = n;
    if (e === Ni) {
      const f = u[r];
      for (let d = 0; d < (f || []).length && d < 5; d++)
        if ((o = h(f[s + d])) != null)
          return o;
    } else
      for (let f = 0; f < u.length && f < 5; f++) {
        const d = u[s + f];
        if (d && (o = h(d[r])) != null)
          return o;
      }
  } else if (t === Ie) {
    const u = n;
    if (!l)
      return wt.Not;
    for (let f = 0; f < u.length && f < 5; f++) {
      const d = u[f];
      if (d && (o = h(d[l])) != null)
        return o;
    }
  } else if (t === $e) {
    const u = n;
    if (!l)
      return wt.Not;
    const f = u[l];
    if (!f || Di(f))
      return wt.Not;
    for (let d = 0; d < f.length && d < 5; d++)
      if ((o = h(f[d])) != null)
        return o;
  } else if (t === ae) {
    const u = n;
    for (let f = 0; f < u.length && f < 5; f++) {
      const d = u[f], p = ha(d);
      if (!K(p))
        return wt.Not;
      if ((o = h(p[r])) != null)
        return o;
    }
  }
  function h(u) {
    const f = X(u);
    if (u != null && isFinite(u) && u !== "")
      return f ? wt.Might : wt.Not;
    if (f && u !== "-")
      return wt.Must;
  }
  return wt.Not;
}
function uy(n, t, e) {
  const i = {}, s = Bp(t);
  if (!s || !n)
    return i;
  const r = [], o = [], a = t.piModel, l = ly(a).datasetMap, c = s.uid + "_" + e.seriesLayoutBy;
  let h, u;
  n = n.slice(), et(n, function(_, g) {
    const m = O(_) ? _ : n[g] = {
      name: _
    };
    m.type === "ordinal" && h == null && (h = g, u = p(m)), i[m.name] = [];
  });
  const f = l.get(c) || l.set(c, {
    categoryWayDim: u,
    valueWayDim: 0
  });
  et(
    n,
    function(_, g) {
      const m = _.name, y = p(_);
      if (h == null) {
        const v = f.valueWayDim;
        d(i[m], v, y), d(o, v, y), f.valueWayDim += y;
      } else if (h === g)
        d(i[m], 0, y), d(r, 0, y);
      else {
        const v = f.categoryWayDim;
        d(i[m], v, y), d(o, v, y), f.categoryWayDim += y;
      }
    }
  );
  function d(_, g, m) {
    for (let y = 0; y < m; y++)
      _.push(g + y);
  }
  function p(_) {
    const g = _.dimsDef;
    return g ? g.length : 1;
  }
  return r.length && (i.itemName = r), o.length && (i.seriesName = o), i;
}
class ma {
  constructor(t) {
    this.data = t.data || (t.sourceFormat === $e ? {} : []), this.sourceFormat = t.sourceFormat || zp, this.seriesLayoutBy = t.seriesLayoutBy || Be, this.startIndex = t.startIndex || 0, this.dimensionsDetectedCount = t.dimensionsDetectedCount, this.metaRawOption = t.metaRawOption;
    const e = this.dimensionsDefine = t.dimensionsDefine;
    if (e)
      for (let i = 0; i < e.length; i++) {
        const s = e[i];
        s.type == null && $p(this, i) === wt.Must && (s.type = "ordinal");
      }
  }
}
function lh(n) {
  return n instanceof ma;
}
function Gl(n, t, e) {
  e = e || Gp(n);
  const i = t.seriesLayoutBy, s = dy(
    n,
    e,
    i,
    t.sourceHeader,
    t.dimensions
  );
  return new ma({
    data: n,
    sourceFormat: e,
    seriesLayoutBy: i,
    dimensionsDefine: s.dimensionsDefine,
    startIndex: s.startIndex,
    dimensionsDetectedCount: s.dimensionsDetectedCount,
    metaRawOption: V(t)
  });
}
function Hp(n) {
  return new ma({
    data: n,
    sourceFormat: Di(n) ? tn : ae
  });
}
function fy(n) {
  return new ma({
    data: n.data,
    sourceFormat: n.sourceFormat,
    seriesLayoutBy: n.seriesLayoutBy,
    dimensionsDefine: V(n.dimensionsDefine),
    startIndex: n.startIndex,
    dimensionsDetectedCount: n.dimensionsDetectedCount
  });
}
function Gp(n) {
  let t = zp;
  if (Di(n))
    t = tn;
  else if (K(n)) {
    n.length === 0 && (t = vt);
    for (let e = 0, i = n.length; e < i; e++) {
      const s = n[e];
      if (s != null) {
        if (K(s)) {
          t = vt;
          break;
        } else if (O(s)) {
          t = Ie;
          break;
        }
      }
    }
  } else if (O(n)) {
    for (const e in n)
      if (Te(n, e) && Ct(n[e])) {
        t = $e;
        break;
      }
  }
  return t;
}
function dy(n, t, e, i, s) {
  let r, o;
  if (!n)
    return {
      dimensionsDefine: uu(s),
      startIndex: o,
      dimensionsDetectedCount: r
    };
  if (t === vt) {
    const a = n;
    i === "auto" || i == null ? fu(
      function(l) {
        l != null && l !== "-" && (X(l) ? o == null && (o = 1) : o = 0);
      },
      e,
      a,
      10
    ) : o = Se(i) ? i : i ? 1 : 0, !s && o === 1 && (s = [], fu(
      function(l, c) {
        s[c] = l != null ? l + "" : "";
      },
      e,
      a,
      1 / 0
    )), r = s ? s.length : e === Ni ? a.length : a[0] ? a[0].length : null;
  } else if (t === Ie)
    s || (s = py(
      n
    ));
  else if (t === $e)
    s || (s = [], D(n, function(a, l) {
      s.push(l);
    }));
  else if (t === ae) {
    const a = ha(n[0]);
    r = K(a) && a.length || 1;
  }
  return {
    startIndex: o,
    dimensionsDefine: uu(s),
    dimensionsDetectedCount: r
  };
}
function py(n) {
  let t = 0, e;
  for (; t < n.length && !(e = n[t++]); )
    ;
  if (e)
    return tt(e);
}
function uu(n) {
  if (!n)
    return;
  const t = F();
  return H(n, function(e, i) {
    e = O(e) ? e : { name: e };
    const s = {
      name: e.name,
      displayName: e.displayName,
      type: e.type
    };
    if (s.name == null)
      return s;
    s.name += "", s.displayName == null && (s.displayName = s.name);
    const r = t.get(s.name);
    return r ? s.name += "-" + r.count++ : t.set(s.name, { count: 1 }), s;
  });
}
function fu(n, t, e, i) {
  if (t === Ni)
    for (let s = 0; s < e.length && s < i; s++)
      n(e[s] ? e[s][0] : null, s);
  else {
    const s = e[0] || [];
    for (let r = 0; r < s.length && r < i; r++)
      n(s[r], r);
  }
}
function gy(n) {
  const t = n.sourceFormat;
  return t === Ie || t === $e;
}
const du = function(n, t, e, i) {
  return n[i];
}, _y = {
  [vt + "_" + Be]: function(n, t, e, i) {
    return n[i + t];
  },
  [vt + "_" + Ni]: function(n, t, e, i, s) {
    i += t;
    const r = s || [], o = n;
    for (let a = 0; a < o.length; a++) {
      const l = o[a];
      r[a] = l ? l[i] : null;
    }
    return r;
  },
  [Ie]: du,
  [$e]: function(n, t, e, i, s) {
    const r = s || [];
    for (let o = 0; o < e.length; o++) {
      const a = e[o].name, l = n[a];
      r[o] = l ? l[i] : null;
    }
    return r;
  },
  [ae]: du
};
function ch(n, t) {
  return n === vt ? n + "_" + t : n;
}
function Yp(n, t) {
  return _y[ch(n, t)];
}
function Wp(n, t) {
  return my[ch(n, t)];
}
const pu = function(n, t, e) {
  return n.length;
}, my = {
  [vt + "_" + Be]: function(n, t, e) {
    return Math.max(0, n.length - t);
  },
  [vt + "_" + Ni]: function(n, t, e) {
    const i = n[0];
    return i ? Math.max(0, i.length - t) : 0;
  },
  [Ie]: pu,
  [$e]: function(n, t, e) {
    const i = e[0].name, s = n[i];
    return s ? s.length : 0;
  },
  [ae]: pu
}, Ia = function(n, t, e) {
  return n[t];
}, yy = {
  [vt]: Ia,
  [Ie]: function(n, t, e) {
    return n[e];
  },
  [$e]: Ia,
  [ae]: function(n, t, e) {
    const i = ha(n);
    return i instanceof Array ? i[t] : i;
  },
  [tn]: Ia
};
function vy(n) {
  return yy[n];
}
let gu, _u;
const Fh = class Fh {
  constructor(t, e) {
    const i = lh(t) ? t : Hp(t);
    this._source = i;
    const s = this._data = i.data;
    i.sourceFormat === tn && (this._offset = 0, this._dimSize = e, this._data = s), _u(this, s, i);
  }
  count() {
    return 0;
  }
  getItem(t, e) {
  }
  getSource() {
    return this._source;
  }
};
Fh.internalField = (function() {
  _u = function(r, o, a) {
    const l = a.sourceFormat, c = a.seriesLayoutBy, h = a.startIndex, u = a.dimensionsDefine, f = gu[ch(l, c)];
    if (R(r, f), l === tn)
      r.getItem = t, r.count = i, r.fillStorage = e;
    else {
      const d = Yp(
        l,
        c
      );
      r.getItem = Bl(d, null, o, h, u);
      const p = Wp(l, c);
      r.count = Bl(p, null, o, h, u);
    }
  };
  const t = function(r, o) {
    r = r - this._offset, o = o || [];
    const a = this._data, l = this._dimSize, c = l * r;
    for (let h = 0; h < l; h++)
      o[h] = a[c + h];
    return o;
  }, e = function(r, o, a, l) {
    const c = this._data, h = this._dimSize;
    for (let u = 0; u < h; u++) {
      const f = l[u];
      let d = f[0] == null ? 1 / 0 : f[0], p = f[1] == null ? -1 / 0 : f[1];
      const _ = o - r, g = a[u];
      for (let m = 0; m < _; m++) {
        const y = c[m * h + u];
        g[r + m] = y, y < d && (d = y), y > p && (p = y);
      }
      f[0] = d, f[1] = p;
    }
  }, i = function() {
    return this._data ? this._data.length / this._dimSize : 0;
  };
  gu = {
    [vt + "_" + Be]: {
      pure: !0,
      appendData: s
    },
    [vt + "_" + Ni]: {
      pure: !0,
      appendData: function() {
        throw new Error(
          'Do not support appendData when set seriesLayoutBy: "row".'
        );
      }
    },
    [Ie]: {
      pure: !0,
      appendData: s
    },
    [$e]: {
      pure: !0,
      appendData: function(r) {
        const o = this._data;
        et(r, function(a, l) {
          const c = o[l] || (o[l] = []);
          for (let h = 0; h < (a || []).length; h++)
            c.push(a[h]);
        });
      }
    },
    [ae]: {
      appendData: s
    },
    [tn]: {
      persistent: !1,
      pure: !0,
      appendData: function(r) {
        this._data = r;
      },
      // Clean self if data is already used.
      clean: function() {
        this._offset += this.count(), this._data = null;
      }
    }
  };
  function s(r) {
    for (let o = 0; o < r.length; o++)
      this._data.push(r[o]);
  }
})();
let _o = Fh;
function Jr(n, t) {
  const e = t && t.type;
  return e === "ordinal" ? n : (e === "time" && // spead up when using timestamp
  !Se(n) && n != null && n !== "-" && (n = +Vn(n)), n == null || n === "" ? NaN : (
    // If string (like '-'), using '+' parse to NaN
    // If object, also parse to NaN
    +n
  ));
}
class xy {
  getRawData() {
    throw new Error("not supported");
  }
  getRawDataItem(t) {
    throw new Error("not supported");
  }
  cloneRawData() {
  }
  /**
   * @return If dimension not found, return null/undefined.
   */
  getDimensionInfo(t) {
  }
  /**
   * dimensions defined if and only if either:
   * (a) dataset.dimensions are declared.
   * (b) dataset data include dimensions definitions in data (detected or via specified `sourceHeader`).
   * If dimensions are defined, `dimensionInfoAll` is corresponding to
   * the defined dimensions.
   * Otherwise, `dimensionInfoAll` is determined by data columns.
   * @return Always return an array (even empty array).
   */
  cloneAllDimensionInfo() {
  }
  count() {
  }
  /**
   * Only support by dimension index.
   * No need to support by dimension name in transform function,
   * because transform function is not case-specific, no need to use name literally.
   */
  retrieveValue(t, e) {
  }
  retrieveValueFromItem(t, e) {
  }
  convertValue(t, e) {
    return Jr(t, e);
  }
}
function wy(n, t) {
  const e = new xy(), i = n.data, s = e.sourceFormat = n.sourceFormat, r = n.startIndex;
  n.seriesLayoutBy !== Be && Jt("");
  const a = [], l = {}, c = n.dimensionsDefine;
  if (c)
    D(c, function(p, _) {
      const g = p.name, m = {
        index: _,
        name: g,
        displayName: p.displayName
      };
      a.push(m), g != null && (Te(l, g) && Jt(""), l[g] = m);
    });
  else
    for (let p = 0; p < n.dimensionsDetectedCount; p++)
      a.push({ index: p });
  const h = Yp(s, Be);
  t.__isBuiltIn && (e.getRawDataItem = function(p) {
    return h(i, r, a, p);
  }, e.getRawData = P(Sy, null, n)), e.cloneRawData = P(by, null, n);
  const u = Wp(s, Be);
  e.count = P(u, null, i, r, a);
  const f = vy(s);
  e.retrieveValue = function(p, _) {
    const g = h(i, r, a, p);
    return d(g, _);
  };
  const d = e.retrieveValueFromItem = function(p, _) {
    if (p == null)
      return;
    const g = a[_];
    if (g)
      return f(p, _, g.name);
  };
  return e.getDimensionInfo = P(Ty, null, a, l), e.cloneAllDimensionInfo = P(My, null, a), e;
}
function Sy(n) {
  const t = n.sourceFormat;
  return hh(t) || Jt(""), n.data;
}
function by(n) {
  const t = n.sourceFormat, e = n.data;
  if (hh(t) || Jt(""), t === vt) {
    const i = [];
    for (let s = 0, r = e.length; s < r; s++)
      i.push(e[s].slice());
    return i;
  } else if (t === Ie) {
    const i = [];
    for (let s = 0, r = e.length; s < r; s++)
      i.push(N({}, e[s]));
    return i;
  }
}
function Ty(n, t, e) {
  if (e != null) {
    if (Se(e) || !isNaN(e) && !Te(t, e))
      return n[e];
    if (Te(t, e))
      return t[e];
  }
}
function My(n) {
  return V(n);
}
const Cy = F();
function Dy(n, t, e) {
  const i = Vt(n), s = i.length;
  s || Jt("");
  for (let o = 0, a = s; o < a; o++) {
    const l = i[o];
    t = Iy(l, t), o !== a - 1 && (t.length = Math.max(t.length, 1));
  }
  return t;
}
function Iy(n, t, e, i) {
  let s = "";
  t.length || Jt(s), O(n) || Jt(s);
  const r = n.type, o = Cy.get(r);
  o || Jt(s);
  const a = H(t, (c) => wy(c, o)), l = Vt(
    o.transform({
      upstream: a[0],
      upstreamList: a,
      config: V(n.config)
    })
  );
  return H(l, function(c, h) {
    let u = "";
    O(c) || Jt(u), c.data || Jt(u);
    const f = Gp(c.data);
    hh(f) || Jt(u);
    let d;
    const p = t[0];
    if (p && h === 0 && !c.dimensions) {
      const _ = p.startIndex;
      _ && (c.data = p.data.slice(0, _).concat(c.data)), d = {
        seriesLayoutBy: Be,
        sourceHeader: _,
        dimensions: p.metaRawOption.dimensions
      };
    } else
      d = {
        seriesLayoutBy: Be,
        sourceHeader: 0,
        dimensions: c.dimensions
      };
    return Gl(
      c.data,
      d,
      null
    );
  });
}
function hh(n) {
  return n === vt || n === Ie;
}
const ya = "undefined", Ey = typeof Uint32Array === ya ? Array : Uint32Array, Ry = typeof Uint16Array === ya ? Array : Uint16Array, Ay = typeof Int32Array === ya ? Array : Int32Array, mu = typeof Float64Array === ya ? Array : Float64Array, Up = {
  float: mu,
  int: Ay,
  // Ordinal data type can be string or int
  ordinal: Array,
  number: Array,
  time: mu
};
let yu;
class Ys {
  constructor() {
    this._chunks = [], this._count = 0, this._rawCount = 0, this._rawExtent = [], this._extent = [], this._calcDimNameToIdx = F(), this.internalField = (function() {
      function t(e, i, s, r) {
        return Jr(e[r], this._dimensions[r]);
      }
      yu = {
        arrayRows: t,
        objectRows(e, i, s, r) {
          return Jr(e[i], this._dimensions[r]);
        },
        keyedColumns: t,
        original(e, i, s, r) {
          const o = e && (e.value == null ? e : e.value);
          return Jr(
            o instanceof Array ? o[r] : (
              // If value is a single number or something else not array.
              o
            ),
            this._dimensions[r]
          );
        },
        typedArray: function(e, i, s, r) {
          return e[r];
        }
      };
    })();
  }
  initData(t, e, i) {
    this._provider = t, this._chunks = [], this._indices = null, this.getRawIndex = this._getRawIdxIdentity;
    const s = t.getSource(), r = this.defaultDimValueGetter = yu[s.sourceFormat];
    this._dimValueGetter = i || r, this._rawExtent = [], gy(s), this._dimensions = H(e, (o) => ({
      type: o.type,
      property: o.property
    })), this._initDataFromProvider(0, t.count());
  }
  count() {
    return this._count;
  }
  get(t, e) {
    if (!(e >= 0 && e < this._count))
      return NaN;
    const i = this._chunks[t];
    return i ? i[this.getRawIndex(e)] : NaN;
  }
  _getRawIdxIdentity(t) {
    return t;
  }
  _getRawIdx(t) {
    return t < this._count && t >= 0 ? this._indices[t] : -1;
  }
  _updateGetRawIdx() {
    this.getRawIndex = this._indices ? this._getRawIdx : this._getRawIdxIdentity;
  }
  _initDataFromProvider(t, e, i) {
    const s = this._provider, r = this._chunks, o = this._dimensions, a = o.length, l = this._rawExtent, c = H(o, (h) => h.property);
    for (let h = 0; h < a; h++) {
      const u = o[h];
      l[h] || (l[h] = Vi()), Py(r, h, u.type, e, i);
    }
    if (s.fillStorage)
      s.fillStorage(t, e, r, l);
    else {
      let h = [];
      for (let u = t; u < e; u++) {
        h = s.getItem(u, h);
        for (let f = 0; f < a; f++) {
          const d = r[f], p = this._dimValueGetter(
            h,
            c[f],
            u,
            f
          );
          d[u] = p;
          const _ = l[f];
          p < _[0] && (_[0] = p), p > _[1] && (_[1] = p);
        }
      }
    }
    !s.persistent && s.clean && s.clean(), this._rawCount = this._count = e, this._extent = [];
  }
  each(t, e) {
    if (!this._count)
      return;
    const i = t.length, s = this._chunks;
    for (let r = 0, o = this.count(); r < o; r++) {
      const a = this.getRawIndex(r);
      switch (i) {
        case 0:
          e(r);
          break;
        case 1:
          e(s[t[0]][a], r);
          break;
        case 2:
          e(s[t[0]][a], s[t[1]][a], r);
          break;
        default:
          let l = 0;
          const c = [];
          for (; l < i; l++)
            c[l] = s[t[l]][a];
          c[l] = r, e.apply(null, c);
      }
    }
  }
  getDataExtent(t) {
    const e = this._chunks[t], i = Vi();
    if (!e)
      return i;
    const s = this.count(), r = !this._indices;
    let o;
    if (r)
      return this._rawExtent[t].slice();
    if (o = this._extent[t], o)
      return o.slice();
    o = i;
    let a = o[0], l = o[1];
    for (let c = 0; c < s; c++) {
      const h = this.getRawIndex(c), u = e[h];
      u < a && (a = u), u > l && (l = u);
    }
    return o = [a, l], this._extent[t] = o, o;
  }
  getProvider() {
    return this._provider;
  }
  ensureCalculationDimension(t, e) {
    const i = this._calcDimNameToIdx, s = this._dimensions;
    let r = i.get(t);
    if (r != null) {
      if (s[r].type === e)
        return r;
    } else
      r = s.length;
    return s[r] = { type: e }, i.set(t, r), this._chunks[r] = new Up[e || "float"](this._rawCount), this._rawExtent[r] = Vi(), r;
  }
  getRawDataItem(t) {
    const e = this.getRawIndex(t);
    if (this._provider.persistent)
      return this._provider.getItem(e);
    {
      const i = [], s = this._chunks;
      for (let r = 0; r < (s == null ? void 0 : s.length); r++)
        i.push(s[r][e]);
      return i;
    }
  }
  clone(t, e) {
    const i = new Ys(), s = this._chunks, r = t && aa(
      t,
      (o, a) => (o[a] = !0, o),
      {}
    );
    if (r)
      for (let o = 0; o < s.length; o++)
        i._chunks[o] = r[o] ? Ly(s[o]) : s[o];
    else
      i._chunks = s;
    return this._copyCommonProps(i), e || (i._indices = this._cloneIndices()), i._updateGetRawIdx(), i;
  }
  _copyCommonProps(t) {
    t._count = this._count, t._rawCount = this._rawCount, t._provider = this._provider, t._dimensions = this._dimensions, t._extent = V(this._extent), t._rawExtent = V(this._rawExtent);
  }
  _cloneIndices() {
    if (this._indices) {
      const t = this._indices.constructor;
      let e;
      if (t === Array) {
        const i = this._indices.length;
        e = new t(i);
        for (let s = 0; s < i; s++)
          e[s] = this._indices[s];
      } else
        e = new t(this._indices);
      return e;
    }
    return null;
  }
  /**
   * Retrieve the index with given raw data index.
   */
  indexOfRawIndex(t) {
    if (t >= this._rawCount || t < 0)
      return -1;
    if (!this._indices)
      return t;
    const e = this._indices, i = e[t];
    if (i != null && i < this._count && i === t)
      return t;
    let s = 0, r = this._count - 1;
    for (; s <= r; ) {
      const o = (s + r) / 2 | 0;
      if (e[o] < t)
        s = o + 1;
      else if (e[o] > t)
        r = o - 1;
      else
        return o;
    }
    return -1;
  }
  getIndices() {
    let t;
    const e = this._indices;
    if (e) {
      const i = e.constructor, s = this._count;
      if (i === Array) {
        t = new i(s);
        for (let r = 0; r < s; r++)
          t[r] = e[r];
      } else
        t = new i(
          e == null ? void 0 : e.buffer,
          0,
          s
        );
    } else {
      const i = Ea(this._rawCount);
      t = new i(this.count());
      for (let s = 0; s < t.length; s++)
        t[s] = s;
    }
    return t;
  }
  filter(t, e) {
    if (!this._count)
      return this;
    const i = this.clone(), s = i.count(), r = Ea(i._rawCount), o = new r(s), a = [], l = t.length;
    let c = 0;
    const h = t[0], u = i._chunks;
    for (let f = 0; f < s; f++) {
      let d;
      const p = i.getRawIndex(f);
      if (l === 0)
        d = e(f);
      else if (l === 1) {
        const _ = u[h][p];
        d = e(_, f);
      } else {
        let _ = 0;
        for (; _ < l; _++)
          a[_] = u[t[_]][p];
        a[_] = f, d = e.apply(null, a);
      }
      d && (o[c++] = p);
    }
    return c < s && (i._indices = o), i._count = c, i._extent = [], i._updateGetRawIdx(), i;
  }
  selectRange(t) {
    const e = this.clone(), i = e._count;
    if (!i)
      return this;
    const s = tt(t), r = s.length;
    if (!r)
      return this;
    const o = e.count(), a = Ea(e._rawCount), l = new a(o);
    let c = 0;
    const h = s[0], u = t[h][0], f = t[h][1], d = e._chunks;
    let p = !1;
    if (!e._indices) {
      let _ = 0;
      if (r === 1) {
        const g = d[s[0]];
        for (let m = 0; m < i; m++) {
          const y = g[m];
          (y >= u && y <= f || isNaN(y)) && (l[c++] = _), _++;
        }
        p = !0;
      } else if (r === 2) {
        const g = d[s[0]], m = d[s[1]], y = t[s[1]][0], v = t[s[1]][1];
        for (let S = 0; S < i; S++) {
          const w = g[S], x = m[S];
          (w >= u && w <= f || isNaN(w)) && (x >= y && x <= v || isNaN(x)) && (l[c++] = _), _++;
        }
        p = !0;
      }
    }
    if (!p)
      if (r === 1)
        for (let _ = 0; _ < o; _++) {
          const g = e.getRawIndex(_), m = d[s[0]][g];
          (m >= u && m <= f || isNaN(m)) && (l[c++] = g);
        }
      else
        for (let _ = 0; _ < o; _++) {
          let g = !0;
          const m = e.getRawIndex(_);
          for (let y = 0; y < r; y++) {
            const v = s[y], S = d[v][m];
            (S < t[v][0] || S > t[v][1]) && (g = !1);
          }
          g && (l[c++] = e.getRawIndex(_));
        }
    return c < o && (e._indices = l), e._count = c, e._extent = [], e._updateGetRawIdx(), e;
  }
  map(t, e) {
    const i = this.clone(t);
    return this._updateDims(i, t, e), i;
  }
  _updateDims(t, e, i) {
    const s = t._chunks, r = [], o = e.length, a = t.count(), l = [], c = t._rawExtent;
    for (let h = 0; h < e.length; h++)
      c[e[h]] = Vi();
    for (let h = 0; h < a; h++) {
      const u = t.getRawIndex(h);
      for (let d = 0; d < o; d++)
        l[d] = s[e[d]][u];
      l[o] = h;
      let f = i && i.apply(null, l);
      if (f != null) {
        typeof f != "object" && (r[0] = f, f = r);
        for (let d = 0; d < f.length; d++) {
          const p = e[d], _ = f[d], g = c[p], m = s[p];
          m && (m[u] = _), _ < g[0] && (g[0] = _), _ > g[1] && (g[1] = _);
        }
      }
    }
  }
  getOrdinalMeta(t) {
    return this._dimensions[t].ordinalMeta;
  }
  collectOrdinalMeta(t, e) {
    const i = this._chunks[t], s = this._dimensions[t], r = this._rawExtent, o = s.ordinalOffset || 0, a = i.length;
    o === 0 && (r[t] = Vi());
    const l = r[t];
    for (let c = o; c < a; c++) {
      const h = i[c] = e.parseAndCollect(i[c]);
      isNaN(h) || (l[0] = Math.min(h, l[0]), l[1] = Math.max(h, l[1]));
    }
    s.ordinalMeta = e, s.ordinalOffset = a, s.type = "ordinal";
  }
}
function Ly(n) {
  const t = n.constructor;
  return t === Array ? n.slice() : new t(n);
}
function Py(n, t, e, i, s) {
  const r = Up[e || "float"];
  if (s) {
    const o = n[t], a = o == null ? void 0 : o.length;
    if (a !== i) {
      const l = new r(i);
      for (let c = 0; c < a; c++)
        l[c] = o[c];
      n[t] = l;
    }
  } else
    n[t] = new r(i);
}
function Ea(n) {
  return n > 65535 ? Ey : Ry;
}
function Vi() {
  return [1 / 0, -1 / 0];
}
class ky {
  constructor(t) {
    this._sourceList = [], this._storeList = [], this._upstreamSignList = [], this._dirty = !0, this._versionSignBase = 0, this._sourceHost = t;
  }
  _setLocalSource(t, e) {
    this._sourceList = t, this._upstreamSignList = e, this._versionSignBase++, this._versionSignBase > 9e10 && (this._versionSignBase = 0);
  }
  _getVersionSign() {
    return this._sourceHost.uid + "_" + this._versionSignBase;
  }
  prepareSource() {
    this._isDirty() && (this._createSource(), this._dirty = !1);
  }
  _createSource() {
    this._setLocalSource([], []);
    const t = this._sourceHost, e = this._getUpstreamSourceManagers(), i = !!(e != null && e.length);
    let s, r;
    if (pr(t)) {
      const o = t;
      let a, l, c;
      if (i) {
        const g = e[0];
        g.prepareSource(), c = g.getSource(), a = c.data, l = c.sourceFormat, r = [g._getVersionSign()];
      } else
        a = o.get("data", !0), l = Di(a) ? tn : ae, this._upstreamSignList = [];
      const h = this._getSourceMetaRawOption() || {}, u = c && c.metaRawOption || {}, f = ie(
        h.seriesLayoutBy,
        u.seriesLayoutBy
      ) || null, d = ie(
        h.sourceHeader,
        u.sourceHeader
      ), p = ie(
        h.dimensions,
        u.dimensions
      );
      s = f !== u.seriesLayoutBy || !!d != !!u.sourceHeader || p ? [
        Gl(
          a,
          { seriesLayoutBy: f, sourceHeader: d, dimensions: p },
          l
        )
      ] : [];
    } else {
      const o = t;
      if (i) {
        const a = this._applyTransform(e);
        s = a.sourceList, r = a.upstreamSignList;
      } else {
        const a = o.get("source", !0);
        s = [
          Gl(a, this._getSourceMetaRawOption(), null)
        ], r = [];
      }
    }
    this._setLocalSource(s, r);
  }
  _applyTransform(t) {
    const e = this._sourceHost, i = e.get("transform", !0), s = e.get("fromTransformResult", !0);
    s != null && t.length !== 1 && vu("");
    let r;
    const o = [], a = [];
    return D(t, (l) => {
      l.prepareSource();
      const c = l.getSource(s || 0);
      s != null && !c && vu(""), o.push(c), a.push(l._getVersionSign());
    }), i ? r = Dy(i, o, {
      datasetIndex: e.componentIndex
    }) : s != null && (r = [fy(o[0])]), { sourceList: r, upstreamSignList: a };
  }
  _isDirty() {
    if (this._dirty)
      return !0;
    const t = this._getUpstreamSourceManagers();
    for (let e = 0; e < t.length; e++) {
      const i = t[e];
      if (i._isDirty() || this._upstreamSignList[e] !== i._getVersionSign())
        return !0;
    }
  }
  getSource(t) {
    var i;
    t = t || 0;
    const e = this._sourceList[t];
    return e || ((i = this._getUpstreamSourceManagers()[0]) == null ? void 0 : i.getSource(t));
  }
  getSharedDataStore(t) {
    const e = t.makeStoreSchema();
    return this._innerGetDataStore(
      e.dimensions,
      t.source,
      e.hash
    );
  }
  _innerGetDataStore(t, e, i) {
    const r = this._storeList;
    let o = r[0];
    o || (o = r[0] = {});
    let a = o[i];
    if (!a) {
      const l = this._getUpstreamSourceManagers()[0];
      pr(this._sourceHost) && l ? a = l._innerGetDataStore(
        t,
        e,
        i
      ) : (a = new Ys(), a.initData(
        new _o(e, t.length),
        t
      )), o[i] = a;
    }
    return a;
  }
  _getUpstreamSourceManagers() {
    const t = this._sourceHost;
    if (pr(t)) {
      const e = Bp(t);
      return e ? [e.getSourceManager()] : [];
    } else
      return H(
        cy(t),
        (e) => e.getSourceManager()
      );
  }
  _getSourceMetaRawOption() {
    var r;
    const t = this._sourceHost;
    let e, i, s;
    if (pr(t))
      e = t.get("seriesLayoutBy", !0), i = t.get("sourceHeader", !0), s = t.get("dimensions", !0);
    else if (!((r = this._getUpstreamSourceManagers()) != null && r.length)) {
      const o = t;
      e = o.get("seriesLayoutBy", !0), i = o.get("sourceHeader", !0), s = o.get("dimensions", !0);
    }
    return { seriesLayoutBy: e, sourceHeader: i, dimensions: s };
  }
}
function pr(n) {
  return n.mainType === "series";
}
function vu(n) {
  throw new Error(n);
}
var xu;
const Ee = ft();
function Ra(n, t) {
  return n.getName(t) || n.getId(t);
}
const Oy = "__universalTransitionEnabled";
class mo extends (xu = U, xu) {
  constructor() {
    super(...arguments), this._selectedDataIndicesMap = {};
  }
  init(t, e, i) {
    this.seriesIndex = this.componentIndex, this.dataTask = ms({
      count: Fy,
      reset: Ny
    }), this.dataTask.context = { model: this }, this.mergeDefault(t, i);
    const s = Ee(this).sourceManager = new ky(this);
    s == null || s.prepareSource();
    const r = this.getInitialData(t, i);
    wu(r, this), this.dataTask.context.data = r, Ee(this).dataBeforeProcessed = r, By(this), this._initSelectedMapFromData(r);
  }
  mergeDefault(t, e) {
    ut(t, this.getDefaultOption());
  }
  mergeOption(t, e) {
    ut(this.option, t, !0), this.updateData(this.option.data, e);
  }
  updateData(t, e) {
    var r;
    this.option.data = t;
    const i = Ee(this).sourceManager;
    i && (i._dirty = !0, i.prepareSource());
    const s = this.getInitialData(this.option, e);
    wu(s, this), this.dataTask.context.data = s, Ee(this).dataBeforeProcessed = s, Ee(this).data = s, (r = this.dataTask) == null || r.dirty();
  }
  _initSelectedMapFromData(t) {
    if (this.option.selectedMap)
      return;
    const e = [];
    t.hasItemOption && t.each(function(i) {
      const s = t.getRawDataItem(i);
      s && s.selected && e.push(i);
    }), e.length > 0 && this._innerSelect(t, e);
  }
  getSelectedDataIndices() {
    if (this.option.selectedMap === "all")
      return [].slice.call(this.getData().getIndices());
    const t = this._selectedDataIndicesMap, e = tt(t), i = [];
    for (let s = 0; s < e.length; s++) {
      const r = t[e[s]];
      r >= 0 && i.push(r);
    }
    return i;
  }
  isSelected(t, e) {
    const i = this.option.selectedMap;
    if (!i)
      return !1;
    const s = this.getData(e);
    return (i === "all" || i[Ra(s, t)]) && !s.getItemModel(t).get(["select", "disabled"]);
  }
  _innerSelect(t, e) {
    const i = this.option, s = i.selectedMode, r = e.length;
    if (!(!s || !r)) {
      if (s === "series")
        i.selectedMap = "all";
      else if (s === "multiple") {
        O(i.selectedMap) || (i.selectedMap = {});
        const o = i.selectedMap;
        for (let a = 0; a < r; a++) {
          const l = e[a], c = Ra(t, l);
          o[c] = !0, this._selectedDataIndicesMap[c] = t.getRawIndex(l);
        }
      } else if (s === "single" || s === !0) {
        const o = e[r - 1], a = Ra(t, o);
        i.selectedMap = {
          [a]: !0
        }, this._selectedDataIndicesMap = {
          [a]: t.getRawIndex(o)
        };
      }
    }
  }
  getAllData() {
    const t = this.getData();
    return t && t.getLinkedDataAll ? t.getLinkedDataAll() : [{ data: t }];
  }
  setData(t) {
    const e = Yl(this);
    if (e) {
      const i = e.context;
      i.outputData = t, e !== this.dataTask && (i.data = t);
    }
    Ee(this).data = t;
  }
  getData(t) {
    const e = Yl(this);
    if (e) {
      const i = e.context.data;
      return t == null ? i : i.getLinkedData(t);
    } else
      return Ee(this).data;
  }
  /**
   * 初始化data数据结构
   * 需要被重写
   */
  getInitialData(t, e) {
  }
  getRawData() {
    return Ee(this).dataBeforeProcessed;
  }
  getProgressive() {
    return this.get("progressive");
  }
  getProgressiveThreshold() {
    return this.get("progressiveThreshold");
  }
  getEncode() {
    const t = this.get("encode", !0);
    if (t)
      return F(t);
  }
  getSourceManager() {
    return Ee(this).sourceManager;
  }
  getBaseAxis() {
    const t = this.coordinateSystem;
    return t && t.getBaseAxis && t.getBaseAxis();
  }
  restoreData() {
    this.dataTask.dirty();
  }
  isUniversalTransitionEnabled() {
    if (this[Oy])
      return !0;
    const t = this.option.universalTransition;
    return t ? t === !0 ? !0 : t && t.enabled : !1;
  }
}
function Fy(n) {
  return n.model.getRawData().count();
}
function Ny(n) {
  const t = n.model;
  return t.setData(t.getRawData().cloneShallow()), zy;
}
function zy(n, t) {
  t.outputData && n.end > t.outputData.count() && t.model.getRawData().cloneShallow(t.outputData);
}
function Yl(n) {
  const t = (n.piModel || {}).scheduler, e = t == null ? void 0 : t.getPipeline(n.uid);
  if (e) {
    let i = e.currentTask;
    if (i) {
      const s = i.agentStubMap;
      s && (i = s.get(n.uid));
    }
    return i;
  }
}
function wu(n, t) {
  D(
    _0(n.CHANGABLE_METHODS, n.DOWNSAMPLE_METHODS),
    function(e) {
      n.wrapMethod(
        e,
        uo(Hy, t)
      );
    }
  );
}
function By(n) {
  const t = n.name;
  Z0(n) || (n.name = $y(n) || t);
}
function $y(n) {
  const t = n.getRawData(), e = t.mapDimensionsAll("seriesName"), i = [];
  return D(e, function(s) {
    const r = t.getDimensionInfo(s);
    r.displayName && i.push(r.displayName);
  }), i.join(" ");
}
function Hy(n, t) {
  const e = Yl(n);
  return e && e.setOutputEnd((t || this).count()), t;
}
function Gy() {
  const n = ft();
  return function(t) {
    const e = n(t), i = t.pipelineContext, s = !!e.large, r = !!e.progressiveRender, o = e.large = !!(i && i.large), a = e.progressiveRender = !!(i && i.progressiveRender);
    return (s !== o || r !== a) && "reset";
  };
}
const Yy = Gy(), Wy = ft(), Go = class Go {
  constructor() {
    this.group = new zrender.Group(), this.uid = fa("viewChart"), this.renderTask = ms({
      plan: Uy,
      reset: Vy
    }), this.renderTask.context = { view: this };
  }
  init(t, e) {
  }
  render(t, e, i, s) {
  }
  dispose(t, e) {
  }
  remove(t, e) {
    this.group.removeAll();
  }
};
Go.protoInitialize = (function() {
  const t = Go.prototype;
  t.type = "chart";
})();
let Ri = Go;
function Uy(n) {
  return Yy(n.model);
}
function Vy(n) {
  var c;
  const t = n.model, e = n.piModel, i = n.api, s = n.payload, r = (c = t == null ? void 0 : t.pipelineContext) == null ? void 0 : c.progressiveRender, o = n.view, a = s && Wy(s).updateMethod, l = r ? "incrementalPrepareRender" : a && o[a] ? a : "render";
  return l !== "render" && o[l](t, e, i, s), qy[l];
}
const qy = {
  render: {
    forceFirstProgress: !0,
    progress: function(n, t) {
      t.view.render(
        t.model,
        t.piModel,
        t.api,
        t.payload
      );
    }
  }
};
ua(Ri);
const Su = [], va = {
  registerProcessor: hM,
  registerPreprocessor: cM,
  registerAction: dM,
  PRIORITY: W0,
  registerComponentView(n) {
    Kt.registerClass(n);
  },
  registerComponentModel(n) {
    U.registerClass(n);
  },
  registerSeriesModel(n) {
    mo.registerClass(n);
  },
  registerChartView(n) {
    Ri.registerClass(n);
  },
  registerSubTypeDefaulter(n, t) {
    U.registerSubTypeDefaulter(n, t);
  }
};
function Zt(n) {
  if (K(n)) {
    D(n, (t) => {
      Zt(t);
    });
    return;
  }
  st(Su, n) >= 0 || (Su.push(n), Q(n) && (n = {
    install: n
  }), n.install(va));
}
const Nh = class Nh extends Kt {
  constructor() {
    super(...arguments), this.type = "grid", this._horizontalLines = [];
  }
  render(t, e) {
    var c;
    this.group.removeAll(), this._horizontalLines = [];
    const i = t.coordinateSystem;
    if (!i) return;
    const s = i.getRect();
    this.group.setClipPath(
      new zrender.Rect({
        shape: {
          x: s.x,
          y: s.y,
          width: s.width,
          height: s.height
        }
      })
    );
    const r = (c = i.getCartesians()[0]) == null ? void 0 : c.getAxis("y");
    if (!r) return;
    const o = r.model.get("min"), l = r.model.get("max") - o;
    for (let h = 0; h < l; h++) {
      const u = r.toGlobalCoord(r.dataToCoord(o + h)), f = r.toGlobalCoord(r.dataToCoord(o + h + 1)), d = Math.min(u, f), p = Math.abs(f - u), _ = h % 2 === 0 ? "#FFFFFF" : "#F8FAFC";
      this.group.add(
        new zrender.Rect({
          shape: {
            x: s.x,
            y: d,
            width: s.width,
            height: p
          },
          style: {
            fill: _
          },
          z2: -1,
          silent: !0
        })
      );
    }
    for (let h = 0; h < l - 1; h++) {
      const u = o + h + 1, f = r.dataToCoord(u), d = r.toGlobalCoord(f), p = new zrender.Line({
        shape: {
          x1: s.x,
          y1: d,
          x2: s.x + s.width,
          y2: d
        },
        style: {
          stroke: "#E9EEF3",
          lineWidth: 1
        },
        z2: 0,
        silent: !0
      });
      this._horizontalLines.push(p), this.group.add(p);
    }
  }
};
Nh.type = "grid";
let Wl = Nh;
const Aa = {}, Yo = class Yo {
  constructor() {
    this._coordinateSystems = [];
  }
  create(t, e) {
    let i = [];
    D(Aa, function(s, r) {
      const o = s.create(t, e);
      i = i.concat(o || []);
    }), this._coordinateSystems = i;
  }
  update(t, e) {
    D(this._coordinateSystems, function(i) {
      i != null && i.update && i.update(t, e);
    });
  }
  getCoordinateSystems() {
    return this._coordinateSystems.slice();
  }
};
Yo.register = function(t, e) {
  Aa[t] = e;
}, Yo.get = function(t) {
  return Aa[t];
};
let Ws = Yo;
class ir {
  constructor(t) {
    this._setting = t || {}, this._extent = [1 / 0, -1 / 0];
  }
  getSetting(t) {
    return this._setting[t];
  }
  unionExtent(t) {
    const e = this._extent;
    t[0] < e[0] && (e[0] = t[0]), t[1] > e[1] && (e[1] = t[1]);
  }
  unionExtentFromData(t, e) {
    this.unionExtent(t.getApproximateExtent(e));
  }
  getExtent() {
    return this._extent.slice();
  }
  setExtent(t, e) {
    const i = this._extent;
    isNaN(t) || (i[0] = t), isNaN(e) || (i[1] = e);
  }
  /**
   * 当轴为没数据时,
   * 刻度为空
   */
  isBlank() {
    return this._isBlank;
  }
  setBlank(t) {
    this._isBlank = t;
  }
}
ua(ir);
function Xy(n, t) {
  return t[1] === t[0] ? 0.5 : (n - t[0]) / (t[1] - t[0]);
}
function Zy(n) {
  return n.type === "interval";
}
function bu(n, t, e, i) {
  const s = {}, r = n[1] - n[0];
  let o = s.interval = vp(r / t);
  e != null && o < e && (o = s.interval = e), i != null && o > i && (o = s.interval = i);
  const a = s.intervalPrecision = Vp(o), l = s.niceTickExtent = [
    zl(Math.ceil(n[0] / o) * o, a),
    zl(Math.floor(n[1] / o) * o, a)
  ];
  return Ky(l, n), s;
}
function Ky(n, t) {
  !isFinite(n[0]) && (n[0] = t[0]), !isFinite(n[1]) && (n[1] = t[1]), Tu(n, 0, t), Tu(n, 1, t), n[0] > n[1] && (n[0] = n[1]);
}
function Vp(n) {
  return _p(n) + 2;
}
function Tu(n, t, e) {
  n[t] = Math.max(Math.min(n[t], e[1]), e[0]);
}
const Qn = zl, zh = class zh extends ir {
  constructor() {
    super(...arguments), this.type = "interval", this._interval = 0, this._intervalPrecision = 2;
  }
  getTicks(t) {
    const e = this._interval, i = this._extent, s = this._niceExtent, r = this._intervalPrecision, o = [];
    if (!e)
      return o;
    const a = 1e4;
    i[0] < s[0] && (t ? o.push({
      value: Qn(s[0] - e, r)
    }) : o.push({
      value: i[0]
    }));
    let l = s[0];
    for (; l <= s[1] && (o.push({
      value: l
    }), l = Qn(l + e, r), l !== o[o.length - 1].value); )
      if (o.length > a)
        return [];
    const c = o.length ? o[o.length - 1].value : s[1];
    return i[1] > c && (t ? o.push({
      value: Qn(c + e, r)
    }) : o.push({
      value: i[1]
    })), o;
  }
  getLabel(t, e) {
    if (t == null)
      return "";
    let i = e && e.precision;
    i == null ? i = _p(t.value) || 0 : i === "auto" && (i = this._intervalPrecision);
    const s = Qn(t.value, i, !0);
    return ty(s);
  }
  calcTicks(t, e, i) {
    t = t || 5;
    const s = this._extent;
    let r = s[1] - s[0];
    if (!isFinite(r))
      return;
    r < 0 && (r = -r, s.reverse());
    const o = bu(
      s,
      t,
      e,
      i
    );
    this._intervalPrecision = o.intervalPrecision, this._interval = o.interval, this._niceExtent = o.niceTickExtent;
  }
  parse(t) {
    return t;
  }
  calcNiceExtent(t) {
    const e = this._extent;
    if (e[0] === e[1])
      if (e[0] !== 0) {
        const r = Math.abs(e[0]);
        t.fixMax || (e[1] += r / 2), e[0] -= r / 2;
      } else
        e[1] = 1;
    const i = e[1] - e[0];
    isFinite(i) || (e[0] = 0, e[1] = 1), this.calcNiceTicks(t.splitNumber, t.minInterval, t.maxInterval);
    const s = this._interval;
    t.fixMin || (e[0] = Qn(Math.floor(e[0] / s) * s)), t.fixMax || (e[1] = Qn(Math.ceil(e[1] / s) * s));
  }
  /**
   * @param splitNumber By default `5`.
   */
  calcNiceTicks(t, e, i) {
    t = t || 5;
    const s = this._extent;
    let r = s[1] - s[0];
    if (!isFinite(r))
      return;
    r < 0 && (r = -r, s.reverse());
    const o = bu(
      s,
      t,
      e,
      i
    );
    this._intervalPrecision = o.intervalPrecision, this._interval = o.interval, this._niceExtent = o.niceTickExtent;
  }
  normalize(t) {
    return Xy(t, this._extent);
  }
  setInterval(t) {
    this._interval = t, this._niceExtent = this._extent.slice(), this._intervalPrecision = Vp(t);
  }
};
zh.type = "interval";
let Us = zh;
ir.registerClass(Us);
const jy = {
  time: {
    month: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ],
    monthAbbr: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    dayOfWeek: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    dayOfWeekAbbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  },
  legend: {
    selector: {
      all: "All",
      inverse: "Inv"
    }
  },
  toolbox: {
    brush: {
      title: {
        rect: "Box Select",
        polygon: "Lasso Select",
        lineX: "Horizontally Select",
        lineY: "Vertically Select",
        keep: "Keep Selections",
        clear: "Clear Selections"
      }
    },
    dataView: {
      title: "Data View",
      lang: ["Data View", "Close", "Refresh"]
    },
    dataZoom: {
      title: {
        zoom: "Zoom",
        back: "Zoom Reset"
      }
    },
    magicType: {
      title: {
        line: "Switch to Line Chart",
        bar: "Switch to Bar Chart",
        stack: "Stack",
        tiled: "Tile"
      }
    },
    restore: {
      title: "Restore"
    },
    saveAsImage: {
      title: "Save as Image",
      lang: ["Right Click to Save Image"]
    }
  },
  series: {
    typeNames: {
      pie: "Pie chart",
      bar: "Bar chart",
      line: "Line chart",
      scatter: "Scatter plot",
      effectScatter: "Ripple scatter plot",
      radar: "Radar chart",
      tree: "Tree",
      treemap: "Treemap",
      boxplot: "Boxplot",
      candlestick: "Candlestick",
      k: "K line chart",
      heatmap: "Heat map",
      map: "Map",
      parallel: "Parallel coordinate map",
      lines: "Line graph",
      graph: "Relationship graph",
      sankey: "Sankey diagram",
      funnel: "Funnel chart",
      gauge: "Gauge",
      pictorialBar: "Pictorial bar",
      themeRiver: "Theme River Map",
      sunburst: "Sunburst"
    }
  },
  aria: {
    general: {
      withTitle: 'This is a chart about "{title}"',
      withoutTitle: "This is a chart"
    },
    series: {
      single: {
        prefix: "",
        withName: " with type {seriesType} named {seriesName}.",
        withoutName: " with type {seriesType}."
      },
      multiple: {
        prefix: ". It consists of {seriesCount} series count.",
        withName: " The {seriesId} series is a {seriesType} representing {seriesName}.",
        withoutName: " The {seriesId} series is a {seriesType}.",
        separator: {
          middle: "",
          end: ""
        }
      }
    },
    data: {
      allData: "The data is as follows: ",
      partialData: "The first {displayCnt} items are: ",
      withName: "the data for {name} is {value}",
      withoutName: "{value}",
      separator: {
        middle: ", ",
        end: ". "
      }
    }
  }
}, Qy = {
  time: {
    month: [
      "一月",
      "二月",
      "三月",
      "四月",
      "五月",
      "六月",
      "七月",
      "八月",
      "九月",
      "十月",
      "十一月",
      "十二月"
    ],
    monthAbbr: [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月"
    ],
    dayOfWeek: [
      "星期日",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六"
    ],
    dayOfWeekAbbr: ["日", "一", "二", "三", "四", "五", "六"]
  },
  legend: {
    selector: {
      all: "全选",
      inverse: "反选"
    }
  },
  toolbox: {
    brush: {
      title: {
        rect: "矩形选择",
        polygon: "圈选",
        lineX: "横向选择",
        lineY: "纵向选择",
        keep: "保持选择",
        clear: "清除选择"
      }
    },
    dataView: {
      title: "数据视图",
      lang: ["数据视图", "关闭", "刷新"]
    },
    dataZoom: {
      title: {
        zoom: "区域缩放",
        back: "区域缩放还原"
      }
    },
    magicType: {
      title: {
        line: "切换为折线图",
        bar: "切换为柱状图",
        stack: "切换为堆叠",
        tiled: "切换为平铺"
      }
    },
    restore: {
      title: "还原"
    },
    saveAsImage: {
      title: "保存为图片",
      lang: ["右键另存为图片"]
    }
  },
  series: {
    typeNames: {
      pie: "饼图",
      bar: "柱状图",
      line: "折线图",
      scatter: "散点图",
      effectScatter: "涟漪散点图",
      radar: "雷达图",
      tree: "树图",
      treemap: "矩形树图",
      boxplot: "箱型图",
      candlestick: "K线图",
      k: "K线图",
      heatmap: "热力图",
      map: "地图",
      parallel: "平行坐标图",
      lines: "线图",
      graph: "关系图",
      sankey: "桑基图",
      funnel: "漏斗图",
      gauge: "仪表盘图",
      pictorialBar: "象形柱图",
      themeRiver: "主题河流图",
      sunburst: "旭日图"
    }
  },
  aria: {
    general: {
      withTitle: "这是一个关于“{title}”的图表。",
      withoutTitle: "这是一个图表，"
    },
    series: {
      single: {
        prefix: "",
        withName: "图表类型是{seriesType}，表示{seriesName}。",
        withoutName: "图表类型是{seriesType}。"
      },
      multiple: {
        prefix: "它由{seriesCount}个图表系列组成。",
        withName: "第{seriesId}个系列是一个表示{seriesName}的{seriesType}，",
        withoutName: "第{seriesId}个系列是一个{seriesType}，",
        separator: {
          middle: "；",
          end: "。"
        }
      }
    },
    data: {
      allData: "其数据是——",
      partialData: "其中，前{displayCnt}项是——",
      withName: "{name}的数据是{value}",
      withoutName: "{value}",
      separator: {
        middle: "，",
        end: ""
      }
    }
  }
}, yo = "ZH", uh = "EN", vo = uh, to = {}, fh = {}, qp = (function() {
  return /* eslint-disable-next-line */ (document.documentElement.lang || navigator.language || navigator.browserLanguage).toUpperCase().indexOf(yo) > -1 ? yo : vo;
})();
function Xp(n, t) {
  n = n.toUpperCase(), fh[n] = new Dt(t), to[n] = t;
}
function Jy(n) {
  return fh[n];
}
function t1() {
  return fh[vo];
}
function e1(n) {
  if (X(n)) {
    const t = to[n.toUpperCase()] || {};
    return n === yo || n === uh ? V(t) : ut(
      V(t),
      V(to[vo]),
      !1
    );
  } else
    return ut(V(n), V(to[vo]), !1);
}
Xp(uh, jy);
Xp(yo, Qy);
const dh = 1e3, ph = dh * 60, ys = ph * 60, Wt = ys * 24, Mu = Wt * 365, as = {
  year: "{yyyy}",
  month: "{MMM}",
  day: "{d}",
  hour: "{HH}:{mm}",
  minute: "{HH}:{mm}",
  second: "{HH}:{mm}:{ss}",
  millisecond: "{HH}:{mm}:{ss} {SSS}",
  none: "{yyyy}-{MM}-{dd} {HH}:{mm}:{ss} {SSS}"
}, gr = "{yyyy}-{MM}-{dd}", Cu = {
  year: "{yyyy}",
  month: "{yyyy}-{MM}",
  day: gr,
  hour: gr + " " + as.hour,
  minute: gr + " " + as.minute,
  second: gr + " " + as.second,
  millisecond: as.none
}, La = [
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
  "millisecond"
], Zp = [
  "year",
  "half-year",
  "quarter",
  "month",
  "week",
  "half-week",
  "day",
  "half-day",
  "quarter-day",
  "hour",
  "minute",
  "second",
  "millisecond"
];
function Ye(n, t) {
  return n += "", "0000".substr(0, t - n.length) + n;
}
function vi(n) {
  switch (n) {
    case "half-year":
    case "quarter":
      return "month";
    case "week":
    case "half-week":
      return "day";
    case "half-day":
    case "quarter-day":
      return "hour";
    default:
      return n;
  }
}
function n1(n) {
  switch (n) {
    case "year":
    case "month":
      return "day";
    case "millisecond":
      return "millisecond";
    default:
      return "second";
  }
}
function i1(n, t, e, i, s) {
  let r = null;
  if (X(e))
    r = e;
  else if (Q(e))
    r = e(n.value, t, {
      level: n.level
    });
  else {
    const o = N({}, as);
    if (n.level > 0)
      for (let c = 0; c < La.length; ++c)
        o[La[c]] = `{primary|${o[La[c]]}}`;
    const a = e ? e.inherit === !1 ? e : yt(e, o) : o, l = Kp(n.value, s);
    if (a[l])
      r = a[l];
    else if (a.inherit) {
      const c = Zp.indexOf(l);
      for (let h = c - 1; h >= 0; --h)
        if (a[l]) {
          r = a[l];
          break;
        }
      r = r || o.none;
    }
    if (K(r)) {
      let c = n.level == null ? 0 : n.level >= 0 ? n.level : r.length + n.level;
      c = Math.min(c, r.length - 1), r = r[c];
    }
  }
  return ig(new Date(n.value), r, s, i);
}
function s1(n) {
  return n === vi(n);
}
function Du(n, t, e) {
  const i = Se(n) ? Vn(n) : n;
  switch (t = t || Kp(n, e), t) {
    case "year":
      return i[gh(e)]();
    case "half-year":
      return i[xi(e)]() >= 6 ? 1 : 0;
    case "quarter":
      return Math.floor((i[xi(e)]() + 1) / 4);
    case "month":
      return i[xi(e)]();
    case "day":
      return i[xa(e)]();
    case "half-day":
      return i[Vs(e)]() / 24;
    case "hour":
      return i[Vs(e)]();
    case "minute":
      return i[wa(e)]();
    case "second":
      return i[Sa(e)]();
    case "millisecond":
      return i[ba(e)]();
  }
}
function Kp(n, t) {
  const e = Vn(n), i = e[xi(t)]() + 1, s = e[xa(t)](), r = e[Vs(t)](), o = e[wa(t)](), a = e[Sa(t)](), c = e[ba(t)]() === 0, h = c && a === 0, u = h && o === 0, f = u && r === 0, d = f && s === 1;
  return d && i === 1 ? "year" : d ? "month" : f ? "day" : u ? "hour" : h ? "minute" : c ? "second" : "millisecond";
}
function gh(n) {
  return n ? "getUTCFullYear" : "getFullYear";
}
function xi(n) {
  return n ? "getUTCMonth" : "getMonth";
}
function xa(n) {
  return n ? "getUTCDate" : "getDate";
}
function Vs(n) {
  return n ? "getUTCHours" : "getHours";
}
function wa(n) {
  return n ? "getUTCMinutes" : "getMinutes";
}
function Sa(n) {
  return n ? "getUTCSeconds" : "getSeconds";
}
function ba(n) {
  return n ? "getUTCMilliseconds" : "getMilliseconds";
}
function r1(n) {
  return n ? "setUTCFullYear" : "setFullYear";
}
function jp(n) {
  return n ? "setUTCMonth" : "setMonth";
}
function Qp(n) {
  return n ? "setUTCDate" : "setDate";
}
function Jp(n) {
  return n ? "setUTCHours" : "setHours";
}
function tg(n) {
  return n ? "setUTCMinutes" : "setMinutes";
}
function eg(n) {
  return n ? "setUTCSeconds" : "setSeconds";
}
function ng(n) {
  return n ? "setUTCMilliseconds" : "setMilliseconds";
}
function ig(n, t, e, i) {
  const s = Vn(n), r = s[gh(e)](), o = s[xi(e)]() + 1, a = Math.floor((o - 1) / 3) + 1, l = s[xa(e)](), c = s["get" + (e ? "UTC" : "") + "Day"](), h = s[Vs(e)](), u = (h - 1) % 12 + 1, f = s[wa(e)](), d = s[Sa(e)](), p = s[ba(e)](), g = (i instanceof Dt ? i : Jy(i || qp) || t1()).getModel("time"), m = g.get("month"), y = g.get("monthAbbr"), v = g.get("dayOfWeek"), S = g.get("dayOfWeekAbbr");
  return (t || "").replace(/{yyyy}/g, r + "").replace(/{yy}/g, Ye(r % 100 + "", 2)).replace(/{Q}/g, a + "").replace(/{MMMM}/g, m[o - 1]).replace(/{MMM}/g, y[o - 1]).replace(/{MM}/g, Ye(o, 2)).replace(/{M}/g, o + "").replace(/{dd}/g, Ye(l, 2)).replace(/{d}/g, l + "").replace(/{eeee}/g, v[c]).replace(/{ee}/g, S[c]).replace(/{e}/g, c + "").replace(/{HH}/g, Ye(h, 2)).replace(/{H}/g, h + "").replace(/{hh}/g, Ye(u + "", 2)).replace(/{h}/g, u + "").replace(/{mm}/g, Ye(f, 2)).replace(/{m}/g, f + "").replace(/{ss}/g, Ye(d, 2)).replace(/{s}/g, d + "").replace(/{SSS}/g, Ye(p, 3)).replace(/{S}/g, p + "");
}
const o1 = function(n, t, e, i) {
  for (; e < i; ) {
    const s = e + i >>> 1;
    n[s][1] < t ? e = s + 1 : i = s;
  }
  return e;
}, Bh = class Bh extends Us {
  constructor(t) {
    super(t), this.type = "time";
  }
  parse(t) {
    return re(t) ? t : +Vn(t);
  }
  getTicks() {
    const t = this._interval, e = this._extent;
    let i = [];
    if (!t)
      return i;
    i.push({
      value: e[0],
      level: 0
    });
    const s = this.getSetting("useUTC"), r = d1(
      this._minLevelUnit,
      this._approxInterval,
      s,
      e
    );
    return i = i.concat(r), i.push({
      value: e[1],
      level: 0
    }), i;
  }
  getLabel(t) {
    const e = this.getSetting("useUTC");
    return ig(
      t.value,
      Cu[n1(
        vi(this._minLevelUnit)
      )] || Cu.second,
      e,
      this.getSetting("locale")
    );
  }
  getFormattedLabel(t, e, i) {
    const s = this.getSetting("useUTC"), r = this.getSetting("locale");
    return i1(t, e, i, r, s);
  }
  calcNiceExtent(t) {
    const e = this._extent;
    if (e[0] === e[1] && (e[0] -= Wt, e[1] += Wt), e[1] === -1 / 0 && e[0] === 1 / 0) {
      const i = /* @__PURE__ */ new Date();
      e[1] = +new Date(i.getFullYear(), i.getMonth(), i.getDate()), e[0] = e[1] - Wt;
    }
    this.calcNiceTicks(t.splitNumber, t.minInterval, t.maxInterval);
  }
  calcNiceTicks(t, e, i) {
    t = t || 10;
    const s = this._extent, r = s[1] - s[0];
    this._approxInterval = r / t, e != null && this._approxInterval < e && (this._approxInterval = e), i != null && this._approxInterval > i && (this._approxInterval = i);
    const o = _r.length, a = Math.min(
      o1(_r, this._approxInterval, 0, o),
      o - 1
    );
    this._interval = _r[a][1], this._minLevelUnit = _r[Math.max(a - 1, 0)][0];
  }
};
Bh.type = "time";
let xo = Bh;
const _r = [
  // Format                           interval
  ["second", dh],
  // 1s
  ["minute", ph],
  // 1m
  ["hour", ys],
  // 1h
  ["quarter-day", ys * 6],
  // 6h
  ["half-day", ys * 12],
  // 12h
  ["day", Wt * 1.2],
  // 1d
  ["half-week", Wt * 3.5],
  // 3.5d
  ["week", Wt * 7],
  // 7d
  ["month", Wt * 31],
  // 1M
  ["quarter", Wt * 95],
  // 3M
  ["half-year", Mu / 2],
  // 6M
  ["year", Mu]
  // 1Y
];
function a1(n, t, e, i) {
  const s = Vn(t), r = Vn(e), o = (p) => Du(s, p, i) === Du(r, p, i), a = () => o("year"), l = () => a() && o("month"), c = () => l() && o("day"), h = () => c() && o("hour"), u = () => h() && o("minute"), f = () => u() && o("second"), d = () => f() && o("millisecond");
  switch (n) {
    case "year":
      return a();
    case "month":
      return l();
    case "day":
      return c();
    case "hour":
      return h();
    case "minute":
      return u();
    case "second":
      return f();
    case "millisecond":
      return d();
  }
}
function l1(n, t) {
  return n /= Wt, n > 16 ? 16 : (
    // Math.floor(daysInMonth / 2) + 1  // In this case we only want one tick between two months.
    n > 7.5 ? 7 : n > 3.5 ? 4 : n > 1.5 ? 2 : 1
  );
}
function c1(n) {
  const t = 30 * Wt;
  return n /= t, n > 6 ? 6 : n > 3 ? 3 : n > 2 ? 2 : 1;
}
function h1(n) {
  return n /= ys, n > 12 ? 12 : n > 6 ? 6 : n > 3.5 ? 4 : n > 2 ? 2 : 1;
}
function Iu(n, t) {
  return n /= t ? ph : dh, n > 30 ? 30 : n >= 20 ? 20 : n > 15 ? 15 : n >= 10 ? 10 : n > 5 ? 5 : n > 2 ? 2 : 1;
}
function u1(n) {
  return vp(n);
}
function f1(n, t, e) {
  const i = new Date(n);
  switch (vi(t)) {
    case "year":
    case "month":
      i[jp(e)](0);
    case "day":
      i[Qp(e)](1);
    case "hour":
      i[Jp(e)](0);
    case "minute":
      i[tg(e)](0);
    case "second":
      i[eg(e)](0), i[ng(e)](0);
  }
  return i.getTime();
}
function d1(n, t, e, i) {
  const r = Zp;
  let o = 0;
  function a(m, y, v, S, w, x, M) {
    const b = new Date(y);
    let T = y, I = b[S]();
    for (; T < v && T <= i[1]; )
      M.push({
        value: T
      }), I += m, b[w](I), T = b.getTime();
    M.push({
      value: T,
      notAdd: !0
    });
  }
  function l(m, y, v) {
    const S = [], w = !y.length;
    if (!a1(vi(m), i[0], i[1], e)) {
      w && (y = [
        {
          // TODO Optimize. Not include so may ticks.
          value: f1(new Date(i[0]), m, e)
        },
        {
          value: i[1]
        }
      ]);
      for (let x = 0; x < y.length - 1; x++) {
        const M = y[x].value, b = y[x + 1].value;
        if (M === b)
          continue;
        let T, I, C, E = !1;
        switch (m) {
          case "year":
            T = Math.max(1, Math.round(t / Wt / 365)), I = gh(e), C = r1(e);
            break;
          case "half-year":
          case "quarter":
          case "month":
            T = c1(t), I = xi(e), C = jp(e);
            break;
          case "week":
          // PENDING If week is added. Ignore day.
          case "half-week":
          case "day":
            T = l1(t), I = xa(e), C = Qp(e), E = !0;
            break;
          case "half-day":
          case "quarter-day":
          case "hour":
            T = h1(t), I = Vs(e), C = Jp(e);
            break;
          case "minute":
            T = Iu(t, !0), I = wa(e), C = tg(e);
            break;
          case "second":
            T = Iu(t, !1), I = Sa(e), C = eg(e);
            break;
          case "millisecond":
            T = u1(t), I = ba(e), C = ng(e);
            break;
        }
        a(
          T,
          M,
          b,
          I,
          C,
          E,
          S
        ), m === "year" && v.length > 1 && x === 0 && v.unshift({
          value: v[0].value - T
        });
      }
      for (let x = 0; x < S.length; x++)
        v.push(S[x]);
      return S;
    }
  }
  const c = [];
  let h = [], u = 0, f = 0;
  for (let m = 0; m < r.length && o++ < 1e4; ++m) {
    const y = vi(r[m]);
    if (!s1(r[m]))
      continue;
    l(
      r[m],
      c[c.length - 1] || [],
      h
    );
    const v = r[m + 1] ? vi(r[m + 1]) : null;
    if (y !== v) {
      if (h.length) {
        f = u, h.sort((x, M) => x.value - M.value);
        const S = [];
        for (let x = 0; x < h.length; ++x) {
          const M = h[x].value;
          (x === 0 || h[x - 1].value !== M) && (S.push(h[x]), M >= i[0] && M <= i[1] && u++);
        }
        const w = (i[1] - i[0]) / t;
        if (u > w * 1.5 && f > w / 1.5 || (c.push(S), u > w || n === r[m]))
          break;
      }
      h = [];
    }
  }
  const d = po(
    oe(c, (m) => po(
      m,
      (y) => y.value >= i[0] && y.value <= i[1] && !y.notAdd
    )),
    (m) => m.length > 0
  ), p = [], _ = d.length - 1;
  for (let m = 0; m < d.length; ++m) {
    const y = d[m];
    for (let v = 0; v < y.length; ++v)
      p.push({
        value: y[v].value,
        level: _ - m
      });
  }
  p.sort((m, y) => m.value - y.value);
  const g = [];
  for (let m = 0; m < p.length; ++m)
    (m === 0 || p[m].value !== p[m - 1].value) && g.push(p[m]);
  return g;
}
ir.registerClass(xo);
const p1 = ft();
class sg {
  constructor(t) {
    this.dimensions = t.dimensions, this._dimOmitted = t.dimensionOmitted, this.source = t.source, this._fullDimCount = t.fullDimensionCount, this._updateDimOmitted(t.dimensionOmitted);
  }
  _updateDimOmitted(t) {
    this._dimOmitted = t, t && (this._dimNameMap || (this._dimNameMap = ag(this.source)));
  }
  getSourceDimension(t) {
    const e = this.source.dimensionsDefine;
    if (e)
      return e[t];
  }
  getSourceDimensionIndex(t) {
    return ie(this._dimNameMap.get(t), -1);
  }
  makeStoreSchema() {
  }
  isDimensionOmitted() {
    return this._dimOmitted;
  }
  appendCalculationDimension(t) {
    this.dimensions.push(t), t.isCalculationCoord = !0, this._fullDimCount++, this._updateDimOmitted(!0);
  }
}
function rg(n) {
  return n instanceof sg;
}
function og(n) {
  const t = F();
  for (let e = 0; e < (n || []).length; e++) {
    const i = n[e], s = O(i) ? i.name : i;
    s != null && t.get(s) == null && t.set(s, e);
  }
  return t;
}
function ag(n) {
  const t = p1(n);
  return t.dimNameMap || (t.dimNameMap = og(n.dimensionsDefine));
}
function g1(n) {
  return n > 30;
}
function _1(n, t) {
  return !!t && t === n.getCalculationInfo("stackedDimension");
}
function m1(n, t) {
  return _1(n, t) ? n.getCalculationInfo("stackResultDimension") : t;
}
function y1(n, t, e) {
  e = e || {};
  let i = e.byIndex;
  const s = e.stackedCoordDimension;
  let r, o, a;
  v1(t) ? r = t : (o = t.schema, r = o.dimensions, a = t.store);
  const l = !!(n && n.get("stack"));
  let c, h, u, f;
  if (et(r, function(d, p) {
    qt(d) && (r[p] = d = {
      name: d
    }), l && !d.isExtraCoord && (!i && !c && d.ordinalMeta && (c = d), !h && d.type !== "ordinal" && d.type !== "time" && (!s || s === d.coordDim) && (h = d));
  }), h && !i && !c && (i = !0), h) {
    u = "__\0pistackresult_" + n.id, f = "__\0pistackedover_" + n.id, c && (c.createInvertedIndices = !0);
    const d = h.coordDim, p = h.type;
    let _ = 0;
    et(r, function(y) {
      y.coordDim === d && _++;
    });
    const g = {
      name: u,
      coordDim: d,
      coordDimIndex: _,
      type: p,
      isExtraCoord: !0,
      isCalculationCoord: !0,
      storeDimIndex: r.length
    }, m = {
      name: f,
      // This dimension contains stack base (generally, 0), so do not set it as
      // `stackedDimCoordDim` to avoid extent calculation, consider log scale.
      coordDim: f,
      coordDimIndex: _ + 1,
      type: p,
      isExtraCoord: !0,
      isCalculationCoord: !0,
      storeDimIndex: r.length + 1
    };
    o ? (a && (g.storeDimIndex = a.ensureCalculationDimension(f, p), m.storeDimIndex = a.ensureCalculationDimension(u, p)), o.appendCalculationDimension(g), o.appendCalculationDimension(m)) : (r.push(g), r.push(m));
  }
  return {
    stackedDimension: h && h.name,
    stackedByDimension: c && c.name,
    isStackedByIndex: i,
    stackedOverDimension: f,
    stackResultDimension: u
  };
}
function v1(n) {
  return !rg(
    n.schema
  );
}
let lg = class {
  constructor(t) {
    this.value = t;
  }
}, x1 = class {
  constructor() {
    this._len = 0;
  }
  /**
   * Insert a new value at the tail
   */
  insert(t) {
    const e = new lg(t);
    return this.insertEntry(e), e;
  }
  /**
   * Insert an entry at the tail
   */
  insertEntry(t) {
    this.head ? (this.tail.next = t, t.prev = this.tail, t.next = null, this.tail = t) : this.head = this.tail = t, this._len++;
  }
  /**
   * Remove entry.
   */
  remove(t) {
    const e = t.prev, i = t.next;
    e ? e.next = i : this.head = i, i ? i.prev = e : this.tail = e, t.next = t.prev = null, this._len--;
  }
  /**
   * Get length
   */
  len() {
    return this._len;
  }
  /**
   * Clear list
   */
  clear() {
    this.head = this.tail = null, this._len = 0;
  }
}, sr = class {
  constructor(t) {
    this._list = new x1(), this._maxSize = 10, this._map = {}, this._maxSize = t;
  }
  /**
   * @return Removed value
   */
  put(t, e) {
    const i = this._list, s = this._map;
    let r = null;
    if (s[t] == null) {
      const o = i.len();
      let a = this._lastRemovedEntry;
      if (o >= this._maxSize && o > 0) {
        const l = i.head;
        i.remove(l), delete s[l.key], r = l.value, this._lastRemovedEntry = l;
      }
      a ? a.value = e : a = new lg(e), a.key = t, i.insertEntry(a), s[t] = a;
    }
    return r;
  }
  get(t) {
    const e = this._map[t], i = this._list;
    if (e != null)
      return e !== i.tail && (i.remove(e), i.insertEntry(e)), e.value;
  }
  /**
   * Clear the cache
   */
  clear() {
    this._list.clear(), this._map = {};
  }
  len() {
    return this._list.len();
  }
}, Eu = {};
function cg(n, t) {
  t = t || Ns;
  let e = Eu[t];
  e || (e = Eu[t] = new sr(500));
  let i = e.get(n);
  return i == null && (i = Zc.measureText(n, t).width, e.put(n, i)), i;
}
function Ru(n, t, e, i) {
  const s = cg(n, t), r = b1(t), o = w1(0, s, e), a = S1(0, r, i);
  return new Mt(o, a, s, r);
}
function hg(n, t, e, i) {
  const s = ((n || "") + "").split(`
`);
  if (s.length === 1)
    return Ru(s[0], t, e, i);
  {
    const o = new Mt(0, 0, 0, 0);
    for (let a = 0; a < s.length; a++) {
      const l = Ru(s[a], t, e, i);
      a === 0 ? o.copy(l) : o.union(l);
    }
    return o;
  }
}
function w1(n, t, e) {
  return e === "right" ? n -= t : e === "center" && (n -= t / 2), n;
}
function S1(n, t, e) {
  return e === "middle" ? n -= t / 2 : e === "bottom" && (n -= t), n;
}
function b1(n) {
  return cg("国", n);
}
function on(n, t) {
  return typeof n == "string" ? n.lastIndexOf("%") >= 0 ? parseFloat(n) / 100 * t : parseFloat(n) : n;
}
function T1(n, t, e) {
  const i = t.position || "inside", s = t.distance != null ? t.distance : 5, r = e.height, o = e.width, a = r / 2;
  let l = e.x, c = e.y, h = "left", u = "top";
  if (i instanceof Array)
    l += on(i[0], e.width), c += on(i[1], e.height), h = null, u = null;
  else
    switch (i) {
      case "left":
        l -= s, c += a, h = "right", u = "middle";
        break;
      case "right":
        l += s + o, c += a, u = "middle";
        break;
      case "top":
        l += o / 2, c -= s, h = "center", u = "bottom";
        break;
      case "bottom":
        l += o / 2, c += r + s, h = "center";
        break;
      case "inside":
        l += o / 2, c += a, h = "center", u = "middle";
        break;
      case "insideLeft":
        l += s, c += a, u = "middle";
        break;
      case "insideRight":
        l += o - s, c += a, h = "right", u = "middle";
        break;
      case "insideTop":
        l += o / 2, c += s, h = "center";
        break;
      case "insideBottom":
        l += o / 2, c += r - s, h = "center", u = "bottom";
        break;
      case "insideTopLeft":
        l += s, c += s;
        break;
      case "insideTopRight":
        l += o - s, c += s, h = "right";
        break;
      case "insideBottomLeft":
        l += s, c += r - s, u = "bottom";
        break;
      case "insideBottomRight":
        l += o - s, c += r - s, h = "right", u = "bottom";
        break;
    }
  return n = n || {}, n.x = l, n.y = c, n.align = h, n.verticalAlign = u, n;
}
class M1 {
  constructor(t, e, i) {
    this._prepareParams(t, e, i);
  }
  /**
   * Parameters depending on outside (like model, user callback)
   * are prepared and fixed here.
   */
  _prepareParams(t, e, i) {
    i[1] < i[0] && (i = [NaN, NaN]), this._dataMin = i[0], this._dataMax = i[1];
    const s = this._isOrdinal = t.type === "ordinal";
    this._needCrossZero = t.type === "interval" && e.getNeedCrossZero && e.getNeedCrossZero();
    const r = this._modelMinRaw = e.get("min", !0);
    Q(r) ? this._modelMinNum = mr(
      t,
      r({
        min: i[0],
        max: i[1]
      })
    ) : r !== "dataMin" && (this._modelMinNum = mr(t, r));
    const o = this._modelMaxRaw = e.get("max", !0);
    if (Q(o) ? this._modelMaxNum = mr(
      t,
      o({
        min: i[0],
        max: i[1]
      })
    ) : o !== "dataMax" && (this._modelMaxNum = mr(t, o)), s)
      this._axisDataLen = e.getCategories().length;
    else {
      const a = e.get(
        "boundaryGap"
      ), l = K(a) ? a : [a || 0, a || 0];
      typeof l[0] == "boolean" || typeof l[1] == "boolean" ? this._boundaryGapInner = [0, 0] : this._boundaryGapInner = [
        on(l[0], 1),
        on(l[1], 1)
      ];
    }
  }
  /**
   * Calculate extent by prepared parameters.
   * This method has no external dependency and can be called duplicatedly,
   * getting the same result.
   * If parameters changed, should call this method to recalcuate.
   */
  calculate() {
    const t = this._isOrdinal, e = this._dataMin, i = this._dataMax, s = this._axisDataLen, r = this._boundaryGapInner, o = t ? null : i - e || Math.abs(e);
    let a = this._modelMinRaw === "dataMin" ? e : this._modelMinNum, l = this._modelMaxRaw === "dataMax" ? i : this._modelMaxNum, c = a != null, h = l != null;
    a == null && (a = t ? s ? 0 : NaN : e - r[0] * o), l == null && (l = t ? s ? s - 1 : NaN : i + r[1] * o), (a == null || !isFinite(a)) && (a = NaN), (l == null || !isFinite(l)) && (l = NaN);
    const u = zs(a) || zs(l) || t && !s;
    this._needCrossZero && (a > 0 && l > 0 && !c && (a = 0), a < 0 && l < 0 && !h && (l = 0));
    const f = this._determinedMin, d = this._determinedMax;
    return f != null && (a = f, c = !0), d != null && (l = d, h = !0), {
      min: a,
      max: l,
      minFixed: c,
      maxFixed: h,
      isBlank: u
    };
  }
  modifyDataMinMax(t, e) {
    this[D1[t]] = e;
  }
  setDeterminedMinMax(t, e) {
    const i = C1[t];
    this[i] = e;
  }
  freeze() {
    this.frozen = !0;
  }
}
const C1 = {
  min: "_determinedMin",
  max: "_determinedMax"
}, D1 = { min: "_dataMin", max: "_dataMax" };
function ug(n, t, e) {
  let i = n.rawExtentInfo;
  return i || (i = new M1(n, t, e), n.rawExtentInfo = i, i);
}
function mr(n, t) {
  return t == null ? null : zs(t) ? NaN : n.parse(t);
}
function I1(n, t) {
  const e = [];
  return t.eachSeriesByType(n, function(i) {
    E1(i) && e.push(i);
  }), e;
}
function E1(n) {
  return n.coordinateSystem && n.coordinateSystem.type === "cartesian2d";
}
function R1(n, t) {
  if (t = t || n.get("type"), !!t)
    return t === "time" ? new xo({
      locale: n.piModel.getLocaleModel(),
      useUTC: !1
    }) : new (ir.getClass(t) || Us)();
}
function fg(n, t) {
  const e = {};
  return D(n.mapDimensionsAll(t), function(i) {
    e[m1(n, i)] = !0;
  }), tt(e);
}
function A1(n, t) {
  const e = n.type, i = ug(
    n,
    t,
    n.getExtent()
  ).calculate();
  n.setBlank(i.isBlank);
  let s = i.min, r = i.max;
  const o = t.piModel;
  if (o && e === "time") {
    const a = I1("bar", o);
    let l = !1;
    D(a, function(c) {
      l = l || c.getBaseAxis() === t.axis;
    });
  }
  return {
    extent: [s, r],
    // "fix" means "fixed", the value should not be
    // changed in the subsequent steps.
    fixMin: i.minFixed,
    fixMax: i.maxFixed
  };
}
function L1(n, t) {
  const e = t, i = A1(n, e), s = i.extent, r = e.get("splitNumber"), o = n.type, a = e.get("interval"), l = o === "interval" || o === "time";
  n.setExtent(s[0], s[1]), n.calcNiceExtent({
    splitNumber: r,
    fixMin: i.fixMin,
    fixMax: i.fixMax,
    minInterval: l ? e.get("minInterval") : null,
    maxInterval: l ? e.get("maxInterval") : null
  }), a != null && n.setInterval && n.setInterval(a);
}
function P1(n, t, e) {
  t && D(fg(t, e), function(i) {
    const s = t.getApproximateExtent(i);
    s[0] < n[0] && (n[0] = s[0]), s[1] > n[1] && (n[1] = s[1]);
  });
}
function Ta(n) {
  const t = n.getLabelModel().get("formatter"), e = n.type === "category" ? n.scale.getExtent()[0] : null;
  return n.scale.type === "time" ? /* @__PURE__ */ (function(i) {
    return function(s, r) {
      return n.scale.getFormattedLabel(s, r, i);
    };
  })(t) : X(t) ? /* @__PURE__ */ (function(i) {
    return function(s) {
      const r = n.scale.getLabel(s);
      return i.replace("{value}", r != null ? r : "");
    };
  })(t) : Q(t) ? /* @__PURE__ */ (function(i) {
    return function(s, r) {
      return e != null && (r = s.value - e), i(
        k1(n, s),
        r,
        s.level != null ? {
          level: s.level
        } : null
      );
    };
  })(t) : function(i) {
    return n.scale.getLabel(i);
  };
}
function dg(n) {
  const t = n.get(
    "interval"
  );
  return t == null ? "auto" : t;
}
function k1(n, t) {
  return n.type === "category" ? n.scale.getLabel(t) : t.value;
}
function pg(n) {
  return n.type === "category" && dg(n.getLabelModel()) === 0;
}
const qs = ft();
function O1(n, t) {
  return { ticks: H(n.scale.getTicks(), (e) => e.value) };
}
function F1(n) {
  return n.type === "category" ? N1(n) : $1(n);
}
function N1(n) {
  const t = n.getLabelModel(), e = z1(n, t);
  return !t.get("show") || n.scale.isBlank() ? { labels: [], labelCategoryInterval: e.labelCategoryInterval } : e;
}
function z1(n, t) {
  const e = H1(n, "labels"), i = dg(t), s = G1(e, i);
  if (s)
    return s;
  let r, o;
  return Q(i) ? r = U1(n, i) : (o = i === "auto" ? B1(n) : i, r = W1(n, o)), Y1(e, i, {
    labels: r,
    labelCategoryInterval: o
  });
}
function B1(n) {
  const t = qs(n).autoInterval;
  return t != null ? t : qs(n).autoInterval = n.calculateCategoryInterval();
}
function $1(n) {
  const t = n.scale.getTicks(), e = Ta(n);
  return {
    labels: H(t, function(i, s) {
      return {
        level: i.level,
        formattedLabel: e(i, s),
        rawLabel: n.scale.getLabel(i),
        tickValue: i.value
      };
    })
  };
}
function H1(n, t) {
  return qs(n)[t] || (qs(n)[t] = []);
}
function G1(n, t) {
  for (let e = 0; e < n.length; e++)
    if (n[e].key === t)
      return n[e].value;
}
function Y1(n, t, e) {
  return n.push({ key: t, value: e }), e;
}
function W1(n, t, e) {
  const i = Ta(n), s = n.scale, r = s.getExtent(), o = n.getLabelModel(), a = [], l = Math.max((t || 0) + 1, 1);
  let c = r[0];
  const h = s.count();
  c !== 0 && l > 1 && h / l > 2 && (c = Math.round(Math.ceil(c / l) * l));
  const u = pg(n), f = o.get("showMinLabel") || u, d = o.get("showMaxLabel") || u;
  f && c !== r[0] && _(r[0]);
  let p = c;
  for (; p <= r[1]; p += l)
    _(p);
  d && p - l !== r[1] && _(r[1]);
  function _(g) {
    const m = { value: g };
    a.push(
      {
        formattedLabel: i(m),
        rawLabel: s.getLabel(m),
        tickValue: g
      }
    );
  }
  return a;
}
function U1(n, t, e) {
  const i = n.scale, s = Ta(n), r = [];
  return D(i.getTicks(), function(o) {
    const a = i.getLabel(o), l = o.value;
    t(o.value, a) && r.push(
      {
        formattedLabel: s(o),
        rawLabel: a,
        tickValue: l
      }
    );
  }), r;
}
function V1(n) {
  const t = q1(n), e = Ta(n), i = (t.axisRotate - t.labelRotate) / 180 * Math.PI, s = n.scale, r = s.getExtent(), o = s.count();
  if (r[1] - r[0] < 1)
    return 0;
  let a = 1;
  o > 40 && (a = Math.max(1, Math.floor(o / 40)));
  let l = r[0];
  const c = n.dataToCoord(l + 1) - n.dataToCoord(l), h = Math.abs(c * Math.cos(i)), u = Math.abs(c * Math.sin(i));
  let f = 0, d = 0;
  for (; l <= r[1]; l += a) {
    let w = 0, x = 0;
    const M = hg(
      e({ value: l }),
      t.font,
      "center",
      "top"
    );
    w = M.width * 1.3, x = M.height * 1.3, f = Math.max(f, w, 7), d = Math.max(d, x, 7);
  }
  let p = f / h, _ = d / u;
  isNaN(p) && (p = 1 / 0), isNaN(_) && (_ = 1 / 0);
  let g = Math.max(0, Math.floor(Math.min(p, _)));
  const m = qs(n.model), y = n.getExtent(), v = m.lastAutoInterval, S = m.lastTickCount;
  return v != null && S != null && Math.abs(v - g) <= 1 && Math.abs(S - o) <= 1 && // Always choose the bigger one, otherwise the critical
  // point is not the same when zooming in or zooming out.
  v > g && // If the axis change is caused by chart resize, the cache should not
  // be used. Otherwise some hidden labels might not be shown again.
  m.axisExtent0 === y[0] && m.axisExtent1 === y[1] ? g = v : (m.lastTickCount = o, m.lastAutoInterval = g, m.axisExtent0 = y[0], m.axisExtent1 = y[1]), g;
}
function q1(n) {
  const t = n.getLabelModel();
  return {
    axisRotate: n.getRotate ? n.getRotate() : n.isHorizontal && !n.isHorizontal() ? 90 : 0,
    labelRotate: t.get("rotate") || 0,
    font: t.getFont()
  };
}
const X1 = [0, 1];
class Z1 {
  constructor(t, e, i) {
    this.onBand = !1, this.inverse = !1, this.scale = e, this.dim = t, this._extent = i || [0, 0];
  }
  contain(t) {
    const e = this._extent, i = Math.min(e[0], e[1]), s = Math.max(e[0], e[1]);
    return t >= i && t <= s;
  }
  /**
   * Get coord extent.
   */
  getExtent() {
    return this._extent.slice();
  }
  /**
   * Set coord extent
   */
  setExtent(t, e) {
    const i = this._extent;
    i[0] = t, i[1] = e;
  }
  /**
   * Get precision used for formatting
   */
  getPixelPrecision(t) {
    return mp(t || this.scale.getExtent(), this._extent);
  }
  /**
   * Convert data to coord. Data is the rank if it has an ordinal scale
   */
  dataToCoord(t, e) {
    let i = this._extent;
    const s = this.scale;
    return t = s.normalize(t), this.onBand && s.type === "ordinal" && (i = i.slice(), K1(i, s.count())), ot(t, X1, i, e);
  }
  getTicksCoords(t) {
    t = t || {};
    const e = t.tickModel || this.getTickModel(), s = O1(this).ticks, r = oe(
      s,
      function(a) {
        return {
          coord: this.dataToCoord(
            this.scale.type === "ordinal" ? this.scale.getRawOrdinalNumber(a) : a
          ),
          tickValue: a
        };
      },
      this
    ), o = e.get("alignWithLabel");
    return t.clamp, r;
  }
  getViewLabels() {
    return F1(this).labels;
  }
  getLabelModel() {
    return this.model.getModel("axisLabel");
  }
  getTickModel() {
    return this.model.getModel("axisTick");
  }
  /**
   * Get width of band
   */
  getBandWidth() {
    const t = this._extent, e = this.scale.getExtent();
    let i = e[1] - e[0] + (this.onBand ? 1 : 0);
    i === 0 && (i = 1);
    const s = Math.abs(t[1] - t[0]);
    return Math.abs(s) / i;
  }
  calculateCategoryInterval() {
    return V1(this);
  }
}
function K1(n, t) {
  const s = (n[1] - n[0]) / t / 2;
  n[0] += s, n[1] -= s;
}
class j1 extends Z1 {
  constructor(t, e, i, s, r) {
    super(t, e, i), this.index = 0, this.type = s || "value", this.position = r || "top";
  }
  getGlobalExtent() {
    const t = this.getExtent();
    return t[0] = this.toGlobalCoord(t[0]), t[1] = this.toGlobalCoord(t[1]), t;
  }
  isHorizontal() {
    const t = this.position;
    return t === "top" || t === "bottom";
  }
}
class Q1 {
  constructor(t) {
    this.type = "cartesian", this._dimList = [], this._axes = {}, this.name = t || " ";
  }
  getAxis(t) {
    return this._axes[t];
  }
  getAxes() {
    return H(
      this._dimList,
      function(t) {
        return this._axes[t];
      },
      this
    );
  }
  getAxesByScale(t) {
    return t = t.toLowerCase(), ne(this.getAxes(), function(e) {
      return e.scale.type === t;
    });
  }
  addAxis(t) {
    const e = t.dim;
    this._axes[e] = t, this._dimList.push(e);
  }
}
function zi(n, t) {
  return n == null && (n = 0), t == null && (t = 0), [n, t];
}
function J1(n, t) {
  return (n[0] - t[0]) * (n[0] - t[0]) + (n[1] - t[1]) * (n[1] - t[1]);
}
var wi = J1;
function be(n, t, e) {
  var i = t[0], s = t[1];
  return n[0] = e[0] * i + e[2] * s + e[4], n[1] = e[1] * i + e[3] * s + e[5], n;
}
function gg(n, t, e) {
  return n[0] = Math.min(t[0], e[0]), n[1] = Math.min(t[1], e[1]), n;
}
function _g(n, t, e) {
  return n[0] = Math.max(t[0], e[0]), n[1] = Math.max(t[1], e[1]), n;
}
const tv = ["x", "y"];
class ev extends Q1 {
  constructor() {
    super(...arguments), this.type = "cartesian2d", this.dimensions = tv;
  }
  /**
   * Base axis will be used on stacking.
   */
  getBaseAxis() {
    return this.getAxesByScale("ordinal")[0] || this.getAxesByScale("time")[0] || this.getAxis("x");
  }
  containPoint(t) {
    const e = this.getAxis("x"), i = this.getAxis("y");
    return e.contain(e.toLocalCoord(t[0])) && i.contain(i.toLocalCoord(t[1]));
  }
  getArea() {
    const t = this.getAxis("x").getGlobalExtent(), e = this.getAxis("y").getGlobalExtent(), i = Math.min(t[0], t[1]), s = Math.min(e[0], e[1]), r = Math.max(t[0], t[1]) - i, o = Math.max(e[0], e[1]) - s;
    return new zrender.BoundingRect(i, s, r, o);
  }
  dataToPoint(t, e, i) {
    i = i || [];
    const s = t[0], r = t[1];
    if (this._transform && // It's supported that if data is like `[Inifity, 123]`, where only Y pixel calculated.
    s != null && isFinite(s) && r != null && isFinite(r))
      return be(i, t, this._transform);
    const o = this.getAxis("x"), a = this.getAxis("y");
    return i[0] = o.toGlobalCoord(o.dataToCoord(s, e)), i[1] = a.toGlobalCoord(a.dataToCoord(r, e)), i;
  }
  getOtherAxis(t) {
    return this.getAxis(t.dim === "x" ? "y" : "x");
  }
}
function Au(n) {
  return n.get("coordinateSystem") === "cartesian2d";
}
function Lu(n) {
  const t = {
    xAxisModel: null,
    yAxisModel: null
  };
  return D(t, function(e, i) {
    const s = i.replace(/Model$/, ""), r = n.getReferringComponents(
      s,
      Me
    ).models[0];
    t[i] = r;
  }), t;
}
function nv(n, t, e) {
  e = e || {};
  const i = n.coordinateSystem, s = t.axis, r = {}, o = s.getAxesOnZeroOf()[0], a = s.position, l = o ? "onZero" : a, c = s.dim, h = i.getRect(), u = [h.x, h.x + h.width, h.y, h.y + h.height], f = { left: 0, right: 1, top: 0, bottom: 1, onZero: 2 }, d = t.get("offset") || 0, p = c === "x" ? [u[2] - d, u[3] + d] : [u[0] - d, u[1] + d];
  if (o) {
    const m = o.toGlobalCoord(
      o.dataToCoord(0)
    );
    p[f.onZero] = Math.max(
      Math.min(m, p[1]),
      p[0]
    );
  }
  r.position = [
    c === "y" ? p[f[l]] : u[0],
    c === "x" ? p[f[l]] : u[3]
  ], r.rotation = Math.PI / 2 * (c === "x" ? 0 : 1);
  const _ = { top: -1, bottom: 1, left: -1, right: 1 };
  r.labelDirection = r.tickDirection = r.nameDirection = _[a], r.labelOffset = o ? p[f[a]] - p[f.onZero] : 0, t.get(["axisTick", "inside"]) && (r.tickDirection = -r.tickDirection), Nl(e.labelInside, t.get(["axisLabel", "inside"])) && (r.labelDirection = -r.labelDirection);
  const g = t.get(["axisLabel", "rotate"]);
  return r.labelRotate = l === "top" ? -g : g, r.z2 = 1, r;
}
class _h {
  constructor(t, e, i) {
    this.type = "grid", this._axesMap = {}, this._axesList = [], this._coordsMap = {}, this._coordsList = [], this._initCartesian(t, e, i), this.model = t;
  }
  _initCartesian(t, e, i) {
    const s = this, r = {
      left: !1,
      right: !1,
      top: !1,
      bottom: !1
    }, o = {
      x: {},
      y: {}
    }, a = {
      x: 0,
      y: 0
    };
    if (e.eachComponent("xAxis", l("x"), this), e.eachComponent("yAxis", l("y"), this), !a.x) {
      this._axesMap = {}, this._axesList = [];
      return;
    }
    this._axesMap = o, D(o.x, (c, h) => {
      D(o.y, (u, f) => {
        const d = "x" + h + "y" + f, p = new ev(d);
        p.master = this, p.model = t, this._coordsMap[d] = p, this._coordsList.push(p), p.addAxis(c), p.addAxis(u);
      });
    });
    function l(c) {
      return function(h, u) {
        if (!Pa(h, t))
          return;
        let f = h.get("position");
        c === "x" ? f !== "top" && f !== "bottom" && (f = r.bottom ? "top" : "bottom") : f !== "left" && f !== "right" && (f = r.left ? "right" : "left"), r[f] = !0;
        const d = new j1(
          c,
          R1(h),
          [0, 0],
          h.get("type"),
          f
        ), p = d.type === "category";
        d.onBand = p && h.get(
          "boundaryGap"
        ), d.inverse = h.get("inverse"), h.axis = d, d.model = h, d.grid = s, d.index = u, s._axesList.push(d), o[c][u] = d, a[c]++;
      };
    }
  }
  _updateScale(t, e) {
    D(this._axesList, function(s) {
      var r;
      (r = s == null ? void 0 : s.scale) == null || r.setExtent(1 / 0, -1 / 0);
    }), t.eachSeries(function(s) {
      if (Au(s)) {
        const r = Lu(s), o = r.xAxisModel, a = r.yAxisModel;
        if (!Pa(o, e) || !Pa(a, e))
          return;
        const l = this.getCartesian(
          o.componentIndex,
          a.componentIndex
        ), c = s.getData(), h = l.getAxis("x"), u = l.getAxis("y");
        i(c, h), i(c, u);
      }
    }, this);
    function i(s, r) {
      D(fg(s, r.dim), function(o) {
        r.scale.unionExtentFromData(s, o);
      });
    }
  }
  update(t, e) {
    const i = this._axesMap;
    this._updateScale(t, this.model);
    function s(o) {
      const a = tt(o), l = a.length;
      if (l)
        for (let c = l - 1; c >= 0; c--) {
          const h = +a[c], u = o[h], f = u.model, d = u.scale;
          L1(d, f);
        }
    }
    s(i.x), s(i.y);
    const r = {};
    D(i.x, function(o) {
      Pu(i, "y", o, r);
    }), D(i.y, function(o) {
      Pu(i, "x", o, r);
    }), this.resize(this.model, e);
  }
  resize(t, e, i) {
    const s = t.getBoxLayoutParams();
    !i && t.get("containLabel");
    const r = Gs(s, {
      width: e.getWidth(),
      height: e.getHeight()
    });
    this._rect = r;
    const o = this._axesList;
    a();
    function a() {
      D(o, function(l) {
        const c = l.isHorizontal(), h = c ? [0, r.width] : [0, r.height], u = l.inverse ? 1 : 0;
        l.setExtent(h[u], h[1 - u]), iv(l, c ? r.x : r.y);
      });
    }
  }
  getRect() {
    return this._rect;
  }
  getCartesian(t, e) {
    if (t != null && e != null) {
      const i = "x" + t + "y" + e;
      return this._coordsMap[i];
    }
    se(t) && (e = t.yAxisIndex, t = t.xAxisIndex);
    for (let i = 0, s = this._coordsList; i < s.length; i++)
      if (s[i].getAxis("x").index === t || s[i].getAxis("y").index === e)
        return s[i];
  }
  getCartesians() {
    return this._coordsList.slice();
  }
  containPoint(t) {
    const e = this._coordsList[0];
    if (e)
      return e.containPoint(t);
  }
  // /core/CoordinateSystem.ts 被调用
  static create(t, e) {
    const i = [];
    return t.eachComponent("grid", function(s, r) {
      const o = new _h(s, t, e);
      o.name = "grid_" + r, o.resize(s, e, !0), s.coordinateSystem = o, i.push(o);
    }), t.eachSeries(function(s) {
      if (!Au(s))
        return;
      const r = Lu(s), o = r.xAxisModel, a = r.yAxisModel, c = o.getCoordSysModel().coordinateSystem;
      s.coordinateSystem = c.getCartesian(
        o.componentIndex,
        a.componentIndex
      );
    }), i;
  }
}
function Pa(n, t) {
  return n.getCoordSysModel() === t;
}
function iv(n, t) {
  const e = n.getExtent(), i = e[0] + e[1];
  n.toGlobalCoord = n.dim === "x" ? function(s) {
    return s + t;
  } : function(s) {
    return i - s + t;
  }, n.toLocalCoord = n.dim === "x" ? function(s) {
    return s - t;
  } : function(s) {
    return i - s + t;
  };
}
function sv(n) {
  const t = n.scale.getExtent(), e = t[0], i = t[1];
  return !(e > 0 && i > 0 || e < 0 && i < 0);
}
function Pu(n, t, e, i) {
  e.getAxesOnZeroOf = function() {
    return r ? [r] : [];
  };
  const s = n[t];
  let r;
  const o = e.model, a = o.get(["axisLine", "onZero"]), l = o.get(["axisLine", "onZeroAxisIndex"]);
  if (!a)
    return;
  if (l != null)
    ku(s[l]) && (r = s[l]);
  else
    for (const h in s)
      if (s.hasOwnProperty(h) && ku(s[h]) && // Consider that two Y axes on one value axis,
      // if both onZero, the two Y axes overlap.
      !i[c(s[h])]) {
        r = s[h];
        break;
      }
  r && (i[c(r)] = !0);
  function c(h) {
    return h.dim + "_" + h.index;
  }
}
function ku(n) {
  return n && n.type !== "category" && n.type !== "time" && sv(n);
}
let rv = "";
const ov = {
  textStyle: {
    fontFamily: rv.match(/^Win/) ? "Microsoft YaHei" : "sans-serif",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "normal"
  },
  animation: "auto",
  animationDuration: 1e3,
  animationDurationUpdate: 500,
  animationEasing: "cubicInOut",
  animationEasingUpdate: "cubicInOut",
  animationThreshold: 2e3
}, av = F();
function lv(n, t, e) {
  const i = av.get(t);
  if (!i)
    return e;
  const s = i(n);
  return s ? e.concat(s) : e;
}
let ka, Ou;
const cv = "\0_pi_inner", $h = class $h extends Dt {
  /**
   * 初始化
   * @param optionManager 配置项处理器
   */
  init(t, e, i, s, r) {
    this.option = null, this._locale = new Dt(s), this._optionManager = r;
  }
  setOption(t, e) {
    this._optionManager.setOption(t), this._resetOption("recreate");
  }
  /**
   * 重置option
   * @param type 标识重置option得来源
   * @returns
   */
  _resetOption(t) {
    let e = !1;
    const i = this._optionManager;
    if (!t || t == "recreate") {
      const s = i.mountOption(t == "recreate");
      (!this.option || t == "recreate") && Ou(this, s), e = !0;
    }
    return e;
  }
  restoreData(t) {
    ka(this);
    const e = this._componentsMap, i = [];
    e.each(function(s, r) {
      U.hasClass(r) && i.push(r);
    }), U.topologicalTravel(
      i,
      U.getAllClassMainTypes(),
      function(s) {
        D(e.get(s), function(r) {
          r && (s !== "series" || !hv(r, t)) && r.restoreData();
        });
      }
    );
  }
  mergeOption(t) {
    this._mergeOption(t, null);
  }
  _mergeOption(t, e) {
    const i = this.option, s = this._componentsMap, r = this._componentsCount, o = [], a = F(), l = e == null ? void 0 : e.replaceMergeMainTypeMap;
    D(t, function(h, u) {
      h && (U.hasClass(u) ? u && (o.push(u), a.set(u, !0)) : i[u] = i[u] ? V(h) : ut(i[u], h, !0));
    }), U.topologicalTravel(
      o,
      U.getAllClassMainTypes(),
      c,
      this
    );
    function c(h) {
      const u = lv(
        this,
        h,
        Vt(t[h])
      ), f = s.get(h), d = (
        // `!oldCmptList` means init. See the comment in `mappingToExists`
        f ? l && l.get(h) ? "replaceMerge" : "normalMerge" : "replaceAll"
      ), p = K0(
        f,
        u,
        d
      );
      im(
        p,
        h,
        U
      ), i[h] = null, s.set(h, null), r.set(h, 0);
      const _ = [], g = [];
      let m = 0, y;
      D(
        p,
        function(v, S) {
          let w = v.existing;
          const x = v.newOption;
          if (!x)
            w && w.mergeOption({}, this);
          else {
            const M = h === "series", b = U.getClass(
              h,
              v.keyInfo.subType,
              !M
              // Give a more detailed warn later if series don't exists
            );
            if (!b)
              return;
            if (h === "tooltip") {
              if (y)
                return;
              y = !0;
            }
            if (w && w.constructor === b)
              w.name = v.keyInfo.name, w.mergeOption(x, this), w.optionUpdated(x, !1);
            else {
              const T = N(
                {
                  componentIndex: S
                },
                v.keyInfo
              );
              w = new b(
                x,
                this,
                this,
                T
              ), N(w, T), v.brandNew && (w.__requireNewView = !0), w.init(x, this, this), w.optionUpdated(null, !0);
            }
          }
          w ? (_.push(w.option), g.push(w), m++) : (_.push(void 0), g.push(void 0));
        },
        this
      ), i[h] = _, s.set(h, g), r.set(h, m), h === "series" && ka(this);
    }
  }
  /**
   * Get option for output (cloned option and inner info removed)
   */
  getOption() {
    const t = V(this.option);
    return D(t, function(e, i) {
      if (U.hasClass(i)) {
        const s = Vt(e);
        let r = s.length, o = !1;
        for (let a = r - 1; a >= 0; a--)
          s[a] && !Bs(s[a]) ? o = !0 : (s[a] = null, !o && r--);
        s.length = r, t[i] = s;
      }
    }), delete t[cv], t;
  }
  getSeriesByType(t) {
    return ne(
      this._componentsMap.get("series"),
      (e) => !!e && e.subType === t
    );
  }
  getSeriesByIndex(t) {
    return this._componentsMap.get("series")[t];
  }
  getSeries() {
    return ne(
      this._componentsMap.get("series"),
      (t) => !!t
    );
  }
  getLocaleModel() {
    return this._locale;
  }
  setUpdatePayload(t) {
    this._payload = t;
  }
  getUpdatePayload() {
    return this._payload;
  }
  eachRawSeriesByType(t, e, i) {
    return D(this.getSeriesByType(t), e, i);
  }
  isSeriesFiltered(t) {
    return this._seriesIndicesMap.get(t.componentIndex) == null;
  }
  eachRawSeries(t, e) {
    D(this._componentsMap.get("series"), function(i) {
      i && t.call(e, i, i.componentIndex);
    });
  }
  /**
   * After filtering, series may be different.
   * from raw series.
   */
  eachSeriesByType(t, e, i) {
    D(
      this._seriesIndices,
      function(s) {
        const r = this._componentsMap.get("series")[s];
        r.subType === t && e.call(i, r, s);
      },
      this
    );
  }
  /**
   * @param idx If not specified, return the first one.
   */
  getComponent(t, e) {
    const i = this._componentsMap.get(t);
    if (i) {
      const s = i[e || 0];
      if (s)
        return s;
      if (e == null) {
        for (let r = 0; r < i.length; r++)
          if (i[r])
            return i[r];
      }
    }
  }
  queryComponents(t) {
    const e = t.mainType;
    if (!e)
      return [];
    const i = t.index, s = t.id, r = t.name, o = this._componentsMap.get(e);
    if (!o || !o.length)
      return [];
    let a;
    return i != null ? (a = [], D(Vt(i), function(l) {
      o[l] && a.push(o[l]);
    })) : s != null ? a = Fu("id", s, o) : r != null ? a = Fu("name", r, o) : a = ne(o, (l) => !!l), Nu(a, t);
  }
  findComponents(t) {
    const e = t.query, i = t.mainType, s = o(e), r = s ? this.queryComponents(s) : (
      // Retrieve all non-empty components.
      ne(this._componentsMap.get(i), (l) => !!l)
    );
    return a(Nu(r, t));
    function o(l) {
      const c = i + "Index", h = i + "Id", u = i + "Name";
      return l && (l[c] != null || l[h] != null || l[u] != null) ? {
        mainType: i,
        // subType will be filtered finally.
        index: l[c],
        id: l[h],
        name: l[u]
      } : null;
    }
    function a(l) {
      return t.filter ? ne(l, t.filter) : l;
    }
  }
  eachComponent(t, e, i) {
    const s = this._componentsMap;
    if (Q(t)) {
      const r = e, o = t;
      s.each(function(a, l) {
        for (let c = 0; a && c < a.length; c++) {
          const h = a[c];
          h && o.call(r, l, h, h.componentIndex);
        }
      });
    } else {
      const r = X(t) ? s.get(t) : O(t) ? this.findComponents(t) : null;
      for (let o = 0; r && o < r.length; o++) {
        const a = r[o];
        a && e.call(
          i,
          a,
          a.componentIndex
        );
      }
    }
  }
  eachSeries(t, e) {
    D(
      this._seriesIndices,
      function(i) {
        const s = this._componentsMap.get("series")[i];
        t.call(e, s, i);
      },
      this
    );
  }
};
$h.internalField = (function() {
  ka = function(t) {
    const e = t._seriesIndices = [];
    D(t._componentsMap.get("series"), function(i) {
      i && e.push(i.componentIndex);
    }), t._seriesIndicesMap = F(e);
  }, Ou = function(t, e) {
    t.option = {}, t._componentsMap = F({ series: [] }), t._componentsCount = F(), ut(e, ov, !1), t._mergeOption(e, null);
  };
})();
let wo = $h;
function Fu(n, t, e) {
  if (K(t)) {
    const i = F();
    return D(t, function(s) {
      s != null && ze(s, null) != null && i.set(s, !0);
    }), ne(e, (s) => s && i.get(s[n]));
  } else {
    const i = ze(t, null);
    return ne(
      e,
      (s) => s && i != null && s[n] === i
    );
  }
}
function Nu(n, t) {
  return t.hasOwnProperty("subType") ? ne(n, (e) => e && e.subType === t.subType) : n;
}
function hv(n, t) {
  if (t) {
    const e = t.seriesIndex, i = t.seriesId, s = t.seriesName;
    return e != null && n.componentIndex !== e || i != null && n.id !== i || s != null && n.name !== s;
  }
}
class uv {
  normalizeQuery(t) {
    return {
      cptQuery: null,
      dataQuery: null,
      otherQuery: null
    };
  }
  filter(t, e) {
    return !1;
  }
  afterTrigger() {
    this.eventInfo = null;
  }
}
class fv {
  /**
   * 对外部参数进行格式化，适合内部使用
   * @param rawOption 原始参数
   */
  setOption(t) {
    t = V(t);
    const e = this._optionBackup, i = dv(t);
    this._newBaseOption = i.baseOption, e || (this._optionBackup = i);
  }
  mountOption(t) {
    const e = this._optionBackup;
    return V(t ? e.baseOption : this._newBaseOption);
  }
}
function dv(n, t) {
  let e;
  const i = n.baseOption;
  return i ? e = i : e = n, {
    baseOption: e
  };
}
const Wo = class Wo extends U {
};
Wo.type = "grid", Wo.defaultOption = {
  show: !0,
  z: 0,
  left: "10%",
  top: 60,
  right: "10%",
  bottom: 26,
  backgroundColor: "rgba(0,0,0,0)",
  borderWidth: 1,
  borderColor: "#E2E8ED"
};
let Ul = Wo;
const Uo = class Uo extends Kt {
  constructor() {
    super(...arguments), this.type = Uo.type;
  }
  render(t, e) {
    if (this.group.removeAll(), !t.get("show"))
      return;
    const i = this.group, s = new zrender.Text({
      style: {
        text: t.get("text"),
        fill: "#000"
      },
      z2: 10
    });
    i.add(s);
  }
};
Uo.type = "title";
let Vl = Uo;
const Ds = class Ds extends U {
  constructor() {
    super(...arguments), this.type = Ds.type;
  }
};
Ds.type = "title", Ds.defaultOption = {
  // zlevel: 0,
  z: 6,
  show: !0,
  text: "",
  target: "blank",
  subtext: "",
  subtarget: "blank",
  left: 0,
  top: 0,
  backgroundColor: "rgba(0,0,0,0)",
  borderColor: "#ccc",
  borderWidth: 0,
  padding: 5,
  itemGap: 10,
  textStyle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#464646"
  },
  subtextStyle: {
    fontSize: 12,
    color: "#6E7079"
  }
};
let ql = Ds;
function pv(n) {
  n.registerComponentModel(ql), n.registerComponentView(Vl);
}
function gv(n) {
  n.registerAction({
    type: "updateXAxisPosition"
  }, function(t, e, i) {
    var r;
    ((r = t.data) == null ? void 0 : r.y) != null && i.getZr().refresh();
  });
}
let Oa = null;
function _v(n) {
  n.registerAction({
    type: "updateYAxisPosition"
  }, function(t, e, i) {
    var r;
    const s = (r = t.data) == null ? void 0 : r.x;
    s != null && (e.eachComponent("grid", function(o) {
      const a = o.coordinateSystem;
      if (!a) return;
      if (Oa === null) {
        const c = a.getRect();
        Oa = c.x + c.width;
      }
      const l = Oa;
      o.option.left = s, o.option.width = l - s, o.option.right = void 0, a.resize(o, i, !0);
    }), i.getZr().refresh());
  });
}
let zu = !1;
function mv(n) {
  zu || (zu = !0, gv(n), _v(n));
}
const Vo = class Vo extends Kt {
  constructor() {
    super(...arguments), this.type = Vo.type;
  }
  render(t, e, i) {
    this.group.removeAll(), this.splitModel = t, this.api = i;
  }
};
Vo.type = "split";
let Xl = Vo;
te.browser.firefox && +te.browser.version.split(".")[0] < 39;
const ve = function(n) {
  n.preventDefault(), n.stopPropagation(), n.cancelBubble = !0;
};
function Bu(n) {
  return n.which === 2 || n.which === 3;
}
var Zl = function(n, t) {
  return Zl = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, i) {
    e.__proto__ = i;
  } || function(e, i) {
    for (var s in i) Object.prototype.hasOwnProperty.call(i, s) && (e[s] = i[s]);
  }, Zl(n, t);
};
function Xn(n, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  Zl(n, t);
  function e() {
    this.constructor = n;
  }
  n.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
function So() {
  return [1, 0, 0, 1, 0, 0];
}
function yv(n) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 1, n[4] = 0, n[5] = 0, n;
}
function vv(n, t) {
  return n[0] = t[0], n[1] = t[1], n[2] = t[2], n[3] = t[3], n[4] = t[4], n[5] = t[5], n;
}
function Fa(n, t, e) {
  var i = t[0] * e[0] + t[2] * e[1], s = t[1] * e[0] + t[3] * e[1], r = t[0] * e[2] + t[2] * e[3], o = t[1] * e[2] + t[3] * e[3], a = t[0] * e[4] + t[2] * e[5] + t[4], l = t[1] * e[4] + t[3] * e[5] + t[5];
  return n[0] = i, n[1] = s, n[2] = r, n[3] = o, n[4] = a, n[5] = l, n;
}
function $u(n, t, e) {
  return n[0] = t[0], n[1] = t[1], n[2] = t[2], n[3] = t[3], n[4] = t[4] + e[0], n[5] = t[5] + e[1], n;
}
function xv(n, t, e) {
  var i = t[0], s = t[2], r = t[4], o = t[1], a = t[3], l = t[5], c = Math.sin(e), h = Math.cos(e);
  return n[0] = i * h + o * c, n[1] = -i * c + o * h, n[2] = s * h + a * c, n[3] = -s * c + h * a, n[4] = h * r + c * l, n[5] = h * l - c * r, n;
}
function wv(n, t, e) {
  var i = e[0], s = e[1];
  return n[0] = t[0] * i, n[1] = t[1] * s, n[2] = t[2] * i, n[3] = t[3] * s, n[4] = t[4] * i, n[5] = t[5] * s, n;
}
function Sv(n, t) {
  var e = t[0], i = t[2], s = t[4], r = t[1], o = t[3], a = t[5], l = e * o - r * i;
  return l ? (l = 1 / l, n[0] = o * l, n[1] = -r * l, n[2] = -i * l, n[3] = e * l, n[4] = (i * a - o * s) * l, n[5] = (r * s - e * a) * l, n) : null;
}
var Hu = yv, Gu = 5e-5;
function pn(n) {
  return n > Gu || n < -Gu;
}
var gn = [], Jn = [], Na = So(), za = Math.abs, mh = (function() {
  function n() {
  }
  return n.prototype.getLocalTransform = function(t) {
    return n.getLocalTransform(this, t);
  }, n.prototype.setPosition = function(t) {
    this.x = t[0], this.y = t[1];
  }, n.prototype.setScale = function(t) {
    this.scaleX = t[0], this.scaleY = t[1];
  }, n.prototype.setSkew = function(t) {
    this.skewX = t[0], this.skewY = t[1];
  }, n.prototype.setOrigin = function(t) {
    this.originX = t[0], this.originY = t[1];
  }, n.prototype.needLocalTransform = function() {
    return pn(this.rotation) || pn(this.x) || pn(this.y) || pn(this.scaleX - 1) || pn(this.scaleY - 1) || pn(this.skewX) || pn(this.skewY);
  }, n.prototype.updateTransform = function() {
    var t = this.parent && this.parent.transform, e = this.needLocalTransform(), i = this.transform;
    if (!(e || t)) {
      i && Hu(i);
      return;
    }
    i = i || So(), e ? this.getLocalTransform(i) : Hu(i), t && (e ? Fa(i, t, i) : vv(i, t)), this.transform = i, this._resolveGlobalScaleRatio(i);
  }, n.prototype._resolveGlobalScaleRatio = function(t) {
    var e = this.globalScaleRatio;
    if (e != null && e !== 1) {
      this.getGlobalScale(gn);
      var i = gn[0] < 0 ? -1 : 1, s = gn[1] < 0 ? -1 : 1, r = ((gn[0] - i) * e + i) / gn[0] || 0, o = ((gn[1] - s) * e + s) / gn[1] || 0;
      t[0] *= r, t[1] *= r, t[2] *= o, t[3] *= o;
    }
    this.invTransform = this.invTransform || So(), Sv(this.invTransform, t);
  }, n.prototype.getComputedTransform = function() {
    for (var t = this, e = []; t; )
      e.push(t), t = t.parent;
    for (; t = e.pop(); )
      t.updateTransform();
    return this.transform;
  }, n.prototype.setLocalTransform = function(t) {
    if (t) {
      var e = t[0] * t[0] + t[1] * t[1], i = t[2] * t[2] + t[3] * t[3], s = Math.atan2(t[1], t[0]), r = Math.PI / 2 + s - Math.atan2(t[3], t[2]);
      i = Math.sqrt(i) * Math.cos(r), e = Math.sqrt(e), this.skewX = r, this.skewY = 0, this.rotation = -s, this.x = +t[4], this.y = +t[5], this.scaleX = e, this.scaleY = i, this.originX = 0, this.originY = 0;
    }
  }, n.prototype.decomposeTransform = function() {
    if (this.transform) {
      var t = this.parent, e = this.transform;
      t && t.transform && (Fa(Jn, t.invTransform, e), e = Jn);
      var i = this.originX, s = this.originY;
      (i || s) && (Na[4] = i, Na[5] = s, Fa(Jn, e, Na), Jn[4] -= i, Jn[5] -= s, e = Jn), this.setLocalTransform(e);
    }
  }, n.prototype.getGlobalScale = function(t) {
    var e = this.transform;
    return t = t || [], e ? (t[0] = Math.sqrt(e[0] * e[0] + e[1] * e[1]), t[1] = Math.sqrt(e[2] * e[2] + e[3] * e[3]), e[0] < 0 && (t[0] = -t[0]), e[3] < 0 && (t[1] = -t[1]), t) : (t[0] = 1, t[1] = 1, t);
  }, n.prototype.transformCoordToLocal = function(t, e) {
    var i = [t, e], s = this.invTransform;
    return s && be(i, i, s), i;
  }, n.prototype.transformCoordToGlobal = function(t, e) {
    var i = [t, e], s = this.transform;
    return s && be(i, i, s), i;
  }, n.prototype.getLineScale = function() {
    var t = this.transform;
    return t && za(t[0] - 1) > 1e-10 && za(t[3] - 1) > 1e-10 ? Math.sqrt(za(t[0] * t[3] - t[2] * t[1])) : 1;
  }, n.prototype.copyTransform = function(t) {
    bv(this, t);
  }, n.getLocalTransform = function(t, e) {
    e = e || [];
    var i = t.originX || 0, s = t.originY || 0, r = t.scaleX, o = t.scaleY, a = t.anchorX, l = t.anchorY, c = t.rotation || 0, h = t.x, u = t.y, f = t.skewX ? Math.tan(t.skewX) : 0, d = t.skewY ? Math.tan(-t.skewY) : 0;
    if (i || s || a || l) {
      var p = i + a, _ = s + l;
      e[4] = -p * r - f * _ * o, e[5] = -_ * o - d * p * r;
    } else
      e[4] = e[5] = 0;
    return e[0] = r, e[3] = o, e[1] = d * r, e[2] = f * o, c && xv(e, e, c), e[4] += i + h, e[5] += s + u, e;
  }, n.initDefaultProps = (function() {
    var t = n.prototype;
    t.scaleX = t.scaleY = t.globalScaleRatio = 1, t.x = t.y = t.originX = t.originY = t.skewX = t.skewY = t.rotation = t.anchorX = t.anchorY = 0;
  })(), n;
})(), an = [
  "x",
  "y",
  "originX",
  "originY",
  "anchorX",
  "anchorY",
  "rotation",
  "scaleX",
  "scaleY",
  "skewX",
  "skewY"
];
function bv(n, t) {
  for (var e = 0; e < an.length; e++) {
    var i = an[e];
    n[i] = t[i];
  }
}
var vs = {
  linear: function(n) {
    return n;
  },
  quadraticIn: function(n) {
    return n * n;
  },
  quadraticOut: function(n) {
    return n * (2 - n);
  },
  quadraticInOut: function(n) {
    return (n *= 2) < 1 ? 0.5 * n * n : -0.5 * (--n * (n - 2) - 1);
  },
  cubicIn: function(n) {
    return n * n * n;
  },
  cubicOut: function(n) {
    return --n * n * n + 1;
  },
  cubicInOut: function(n) {
    return (n *= 2) < 1 ? 0.5 * n * n * n : 0.5 * ((n -= 2) * n * n + 2);
  },
  quarticIn: function(n) {
    return n * n * n * n;
  },
  quarticOut: function(n) {
    return 1 - --n * n * n * n;
  },
  quarticInOut: function(n) {
    return (n *= 2) < 1 ? 0.5 * n * n * n * n : -0.5 * ((n -= 2) * n * n * n - 2);
  },
  quinticIn: function(n) {
    return n * n * n * n * n;
  },
  quinticOut: function(n) {
    return --n * n * n * n * n + 1;
  },
  quinticInOut: function(n) {
    return (n *= 2) < 1 ? 0.5 * n * n * n * n * n : 0.5 * ((n -= 2) * n * n * n * n + 2);
  },
  sinusoidalIn: function(n) {
    return 1 - Math.cos(n * Math.PI / 2);
  },
  sinusoidalOut: function(n) {
    return Math.sin(n * Math.PI / 2);
  },
  sinusoidalInOut: function(n) {
    return 0.5 * (1 - Math.cos(Math.PI * n));
  },
  exponentialIn: function(n) {
    return n === 0 ? 0 : Math.pow(1024, n - 1);
  },
  exponentialOut: function(n) {
    return n === 1 ? 1 : 1 - Math.pow(2, -10 * n);
  },
  exponentialInOut: function(n) {
    return n === 0 ? 0 : n === 1 ? 1 : (n *= 2) < 1 ? 0.5 * Math.pow(1024, n - 1) : 0.5 * (-Math.pow(2, -10 * (n - 1)) + 2);
  },
  circularIn: function(n) {
    return 1 - Math.sqrt(1 - n * n);
  },
  circularOut: function(n) {
    return Math.sqrt(1 - --n * n);
  },
  circularInOut: function(n) {
    return (n *= 2) < 1 ? -0.5 * (Math.sqrt(1 - n * n) - 1) : 0.5 * (Math.sqrt(1 - (n -= 2) * n) + 1);
  },
  elasticIn: function(n) {
    var t, e = 0.1, i = 0.4;
    return n === 0 ? 0 : n === 1 ? 1 : (!e || e < 1 ? (e = 1, t = i / 4) : t = i * Math.asin(1 / e) / (2 * Math.PI), -(e * Math.pow(2, 10 * (n -= 1)) * Math.sin((n - t) * (2 * Math.PI) / i)));
  },
  elasticOut: function(n) {
    var t, e = 0.1, i = 0.4;
    return n === 0 ? 0 : n === 1 ? 1 : (!e || e < 1 ? (e = 1, t = i / 4) : t = i * Math.asin(1 / e) / (2 * Math.PI), e * Math.pow(2, -10 * n) * Math.sin((n - t) * (2 * Math.PI) / i) + 1);
  },
  elasticInOut: function(n) {
    var t, e = 0.1, i = 0.4;
    return n === 0 ? 0 : n === 1 ? 1 : (!e || e < 1 ? (e = 1, t = i / 4) : t = i * Math.asin(1 / e) / (2 * Math.PI), (n *= 2) < 1 ? -0.5 * (e * Math.pow(2, 10 * (n -= 1)) * Math.sin((n - t) * (2 * Math.PI) / i)) : e * Math.pow(2, -10 * (n -= 1)) * Math.sin((n - t) * (2 * Math.PI) / i) * 0.5 + 1);
  },
  backIn: function(n) {
    var t = 1.70158;
    return n * n * ((t + 1) * n - t);
  },
  backOut: function(n) {
    var t = 1.70158;
    return --n * n * ((t + 1) * n + t) + 1;
  },
  backInOut: function(n) {
    var t = 2.5949095;
    return (n *= 2) < 1 ? 0.5 * (n * n * ((t + 1) * n - t)) : 0.5 * ((n -= 2) * n * ((t + 1) * n + t) + 2);
  },
  bounceIn: function(n) {
    return 1 - vs.bounceOut(1 - n);
  },
  bounceOut: function(n) {
    return n < 1 / 2.75 ? 7.5625 * n * n : n < 2 / 2.75 ? 7.5625 * (n -= 1.5 / 2.75) * n + 0.75 : n < 2.5 / 2.75 ? 7.5625 * (n -= 2.25 / 2.75) * n + 0.9375 : 7.5625 * (n -= 2.625 / 2.75) * n + 0.984375;
  },
  bounceInOut: function(n) {
    return n < 0.5 ? vs.bounceIn(n * 2) * 0.5 : vs.bounceOut(n * 2 - 1) * 0.5 + 0.5;
  }
}, yr = Math.pow, en = Math.sqrt, bo = 1e-8, mg = 1e-4, Yu = en(3), vr = 1 / 3, xe = zi(), Ft = zi(), Si = zi();
function Qe(n) {
  return n > -bo && n < bo;
}
function yg(n) {
  return n > bo || n < -bo;
}
function St(n, t, e, i, s) {
  var r = 1 - s;
  return r * r * (r * n + 3 * s * t) + s * s * (s * i + 3 * r * e);
}
function vg(n, t, e, i, s, r) {
  var o = i + 3 * (t - e) - n, a = 3 * (e - t * 2 + n), l = 3 * (t - n), c = n - s, h = a * a - 3 * o * l, u = a * l - 9 * o * c, f = l * l - 3 * a * c, d = 0;
  if (Qe(h) && Qe(u))
    if (Qe(a))
      r[0] = 0;
    else {
      var p = -l / a;
      p >= 0 && p <= 1 && (r[d++] = p);
    }
  else {
    var _ = u * u - 4 * h * f;
    if (Qe(_)) {
      var g = u / h, p = -a / o + g, m = -g / 2;
      p >= 0 && p <= 1 && (r[d++] = p), m >= 0 && m <= 1 && (r[d++] = m);
    } else if (_ > 0) {
      var y = en(_), v = h * a + 1.5 * o * (-u + y), S = h * a + 1.5 * o * (-u - y);
      v < 0 ? v = -yr(-v, vr) : v = yr(v, vr), S < 0 ? S = -yr(-S, vr) : S = yr(S, vr);
      var p = (-a - (v + S)) / (3 * o);
      p >= 0 && p <= 1 && (r[d++] = p);
    } else {
      var w = (2 * h * a - 3 * o * u) / (2 * en(h * h * h)), x = Math.acos(w) / 3, M = en(h), b = Math.cos(x), p = (-a - 2 * M * b) / (3 * o), m = (-a + M * (b + Yu * Math.sin(x))) / (3 * o), T = (-a + M * (b - Yu * Math.sin(x))) / (3 * o);
      p >= 0 && p <= 1 && (r[d++] = p), m >= 0 && m <= 1 && (r[d++] = m), T >= 0 && T <= 1 && (r[d++] = T);
    }
  }
  return d;
}
function xg(n, t, e, i, s) {
  var r = 6 * e - 12 * t + 6 * n, o = 9 * t + 3 * i - 3 * n - 9 * e, a = 3 * t - 3 * n, l = 0;
  if (Qe(o)) {
    if (yg(r)) {
      var c = -a / r;
      c >= 0 && c <= 1 && (s[l++] = c);
    }
  } else {
    var h = r * r - 4 * o * a;
    if (Qe(h))
      s[0] = -r / (2 * o);
    else if (h > 0) {
      var u = en(h), c = (-r + u) / (2 * o), f = (-r - u) / (2 * o);
      c >= 0 && c <= 1 && (s[l++] = c), f >= 0 && f <= 1 && (s[l++] = f);
    }
  }
  return l;
}
function Wu(n, t, e, i, s, r) {
  var o = (t - n) * s + n, a = (e - t) * s + t, l = (i - e) * s + e, c = (a - o) * s + o, h = (l - a) * s + a, u = (h - c) * s + c;
  r[0] = n, r[1] = o, r[2] = c, r[3] = u, r[4] = u, r[5] = h, r[6] = l, r[7] = i;
}
function Tv(n, t, e, i, s, r, o, a, l, c, h) {
  var u, f = 5e-3, d = 1 / 0, p, _, g, m;
  xe[0] = l, xe[1] = c;
  for (var y = 0; y < 1; y += 0.05)
    Ft[0] = St(n, e, s, o, y), Ft[1] = St(t, i, r, a, y), g = wi(xe, Ft), g < d && (u = y, d = g);
  d = 1 / 0;
  for (var v = 0; v < 32 && !(f < mg); v++)
    p = u - f, _ = u + f, Ft[0] = St(n, e, s, o, p), Ft[1] = St(t, i, r, a, p), g = wi(Ft, xe), p >= 0 && g < d ? (u = p, d = g) : (Si[0] = St(n, e, s, o, _), Si[1] = St(t, i, r, a, _), m = wi(Si, xe), _ <= 1 && m < d ? (u = _, d = m) : f *= 0.5);
  return en(d);
}
function Mv(n, t, e, i, s, r, o, a, l) {
  for (var c = n, h = t, u = 0, f = 1 / l, d = 1; d <= l; d++) {
    var p = d * f, _ = St(n, e, s, o, p), g = St(t, i, r, a, p), m = _ - c, y = g - h;
    u += Math.sqrt(m * m + y * y), c = _, h = g;
  }
  return u;
}
function Nt(n, t, e, i) {
  var s = 1 - i;
  return s * (s * n + 2 * i * t) + i * i * e;
}
function Cv(n, t, e, i, s) {
  var r = n - 2 * t + e, o = 2 * (t - n), a = n - i, l = 0;
  if (Qe(r)) {
    if (yg(o)) {
      var c = -a / o;
      c >= 0 && c <= 1 && (s[l++] = c);
    }
  } else {
    var h = o * o - 4 * r * a;
    if (Qe(h)) {
      var c = -o / (2 * r);
      c >= 0 && c <= 1 && (s[l++] = c);
    } else if (h > 0) {
      var u = en(h), c = (-o + u) / (2 * r), f = (-o - u) / (2 * r);
      c >= 0 && c <= 1 && (s[l++] = c), f >= 0 && f <= 1 && (s[l++] = f);
    }
  }
  return l;
}
function wg(n, t, e) {
  var i = n + e - 2 * t;
  return i === 0 ? 0.5 : (n - t) / i;
}
function Uu(n, t, e, i, s) {
  var r = (t - n) * i + n, o = (e - t) * i + t, a = (o - r) * i + r;
  s[0] = n, s[1] = r, s[2] = a, s[3] = a, s[4] = o, s[5] = e;
}
function Dv(n, t, e, i, s, r, o, a, l) {
  var c, h = 5e-3, u = 1 / 0;
  xe[0] = o, xe[1] = a;
  for (var f = 0; f < 1; f += 0.05) {
    Ft[0] = Nt(n, e, s, f), Ft[1] = Nt(t, i, r, f);
    var d = wi(xe, Ft);
    d < u && (c = f, u = d);
  }
  u = 1 / 0;
  for (var p = 0; p < 32 && !(h < mg); p++) {
    var _ = c - h, g = c + h;
    Ft[0] = Nt(n, e, s, _), Ft[1] = Nt(t, i, r, _);
    var d = wi(Ft, xe);
    if (_ >= 0 && d < u)
      c = _, u = d;
    else {
      Si[0] = Nt(n, e, s, g), Si[1] = Nt(t, i, r, g);
      var m = wi(Si, xe);
      g <= 1 && m < u ? (c = g, u = m) : h *= 0.5;
    }
  }
  return en(u);
}
function Iv(n, t, e, i, s, r, o) {
  for (var a = n, l = t, c = 0, h = 1 / o, u = 1; u <= o; u++) {
    var f = u * h, d = Nt(n, e, s, f), p = Nt(t, i, r, f), _ = d - a, g = p - l;
    c += Math.sqrt(_ * _ + g * g), a = d, l = p;
  }
  return c;
}
var Ev = /cubic-bezier\(([0-9,\.e ]+)\)/;
function Sg(n) {
  var t = n && Ev.exec(n);
  if (t) {
    var e = t[1].split(","), i = +cr(e[0]), s = +cr(e[1]), r = +cr(e[2]), o = +cr(e[3]);
    if (isNaN(i + s + r + o))
      return;
    var a = [];
    return function(l) {
      return l <= 0 ? 0 : l >= 1 ? 1 : vg(0, i, r, 1, l, a) && St(0, s, o, 1, a[0]);
    };
  }
}
var Rv = (function() {
  function n(t) {
    this._inited = !1, this._startTime = 0, this._pausedTime = 0, this._paused = !1, this._life = t.life || 1e3, this._delay = t.delay || 0, this.loop = t.loop || !1, this.onframe = t.onframe || Da, this.ondestroy = t.ondestroy || Da, this.onrestart = t.onrestart || Da, t.easing && this.setEasing(t.easing);
  }
  return n.prototype.step = function(t, e) {
    if (this._inited || (this._startTime = t + this._delay, this._inited = !0), this._paused) {
      this._pausedTime += e;
      return;
    }
    var i = this._life, s = t - this._startTime - this._pausedTime, r = s / i;
    r < 0 && (r = 0), r = Math.min(r, 1);
    var o = this.easingFunc, a = o ? o(r) : r;
    if (this.onframe(a), r === 1)
      if (this.loop) {
        var l = s % i;
        this._startTime = t - l, this._pausedTime = 0, this.onrestart();
      } else
        return !0;
    return !1;
  }, n.prototype.pause = function() {
    this._paused = !0;
  }, n.prototype.resume = function() {
    this._paused = !1;
  }, n.prototype.setEasing = function(t) {
    this.easing = t, this.easingFunc = qn(t) ? t : vs[t] || Sg(t);
  }, n;
})(), bg = /* @__PURE__ */ (function() {
  function n(t) {
    this.value = t;
  }
  return n;
})(), Av = (function() {
  function n() {
    this._len = 0;
  }
  return n.prototype.insert = function(t) {
    var e = new bg(t);
    return this.insertEntry(e), e;
  }, n.prototype.insertEntry = function(t) {
    this.head ? (this.tail.next = t, t.prev = this.tail, t.next = null, this.tail = t) : this.head = this.tail = t, this._len++;
  }, n.prototype.remove = function(t) {
    var e = t.prev, i = t.next;
    e ? e.next = i : this.head = i, i ? i.prev = e : this.tail = e, t.next = t.prev = null, this._len--;
  }, n.prototype.len = function() {
    return this._len;
  }, n.prototype.clear = function() {
    this.head = this.tail = null, this._len = 0;
  }, n;
})(), yh = (function() {
  function n(t) {
    this._list = new Av(), this._maxSize = 10, this._map = {}, this._maxSize = t;
  }
  return n.prototype.put = function(t, e) {
    var i = this._list, s = this._map, r = null;
    if (s[t] == null) {
      var o = i.len(), a = this._lastRemovedEntry;
      if (o >= this._maxSize && o > 0) {
        var l = i.head;
        i.remove(l), delete s[l.key], r = l.value, this._lastRemovedEntry = l;
      }
      a ? a.value = e : a = new bg(e), a.key = t, i.insertEntry(a), s[t] = a;
    }
    return r;
  }, n.prototype.get = function(t) {
    var e = this._map[t], i = this._list;
    if (e != null)
      return e !== i.tail && (i.remove(e), i.insertEntry(e)), e.value;
  }, n.prototype.clear = function() {
    this._list.clear(), this._map = {};
  }, n.prototype.len = function() {
    return this._list.len();
  }, n;
})(), Vu = {
  transparent: [0, 0, 0, 0],
  aliceblue: [240, 248, 255, 1],
  antiquewhite: [250, 235, 215, 1],
  aqua: [0, 255, 255, 1],
  aquamarine: [127, 255, 212, 1],
  azure: [240, 255, 255, 1],
  beige: [245, 245, 220, 1],
  bisque: [255, 228, 196, 1],
  black: [0, 0, 0, 1],
  blanchedalmond: [255, 235, 205, 1],
  blue: [0, 0, 255, 1],
  blueviolet: [138, 43, 226, 1],
  brown: [165, 42, 42, 1],
  burlywood: [222, 184, 135, 1],
  cadetblue: [95, 158, 160, 1],
  chartreuse: [127, 255, 0, 1],
  chocolate: [210, 105, 30, 1],
  coral: [255, 127, 80, 1],
  cornflowerblue: [100, 149, 237, 1],
  cornsilk: [255, 248, 220, 1],
  crimson: [220, 20, 60, 1],
  cyan: [0, 255, 255, 1],
  darkblue: [0, 0, 139, 1],
  darkcyan: [0, 139, 139, 1],
  darkgoldenrod: [184, 134, 11, 1],
  darkgray: [169, 169, 169, 1],
  darkgreen: [0, 100, 0, 1],
  darkgrey: [169, 169, 169, 1],
  darkkhaki: [189, 183, 107, 1],
  darkmagenta: [139, 0, 139, 1],
  darkolivegreen: [85, 107, 47, 1],
  darkorange: [255, 140, 0, 1],
  darkorchid: [153, 50, 204, 1],
  darkred: [139, 0, 0, 1],
  darksalmon: [233, 150, 122, 1],
  darkseagreen: [143, 188, 143, 1],
  darkslateblue: [72, 61, 139, 1],
  darkslategray: [47, 79, 79, 1],
  darkslategrey: [47, 79, 79, 1],
  darkturquoise: [0, 206, 209, 1],
  darkviolet: [148, 0, 211, 1],
  deeppink: [255, 20, 147, 1],
  deepskyblue: [0, 191, 255, 1],
  dimgray: [105, 105, 105, 1],
  dimgrey: [105, 105, 105, 1],
  dodgerblue: [30, 144, 255, 1],
  firebrick: [178, 34, 34, 1],
  floralwhite: [255, 250, 240, 1],
  forestgreen: [34, 139, 34, 1],
  fuchsia: [255, 0, 255, 1],
  gainsboro: [220, 220, 220, 1],
  ghostwhite: [248, 248, 255, 1],
  gold: [255, 215, 0, 1],
  goldenrod: [218, 165, 32, 1],
  gray: [128, 128, 128, 1],
  green: [0, 128, 0, 1],
  greenyellow: [173, 255, 47, 1],
  grey: [128, 128, 128, 1],
  honeydew: [240, 255, 240, 1],
  hotpink: [255, 105, 180, 1],
  indianred: [205, 92, 92, 1],
  indigo: [75, 0, 130, 1],
  ivory: [255, 255, 240, 1],
  khaki: [240, 230, 140, 1],
  lavender: [230, 230, 250, 1],
  lavenderblush: [255, 240, 245, 1],
  lawngreen: [124, 252, 0, 1],
  lemonchiffon: [255, 250, 205, 1],
  lightblue: [173, 216, 230, 1],
  lightcoral: [240, 128, 128, 1],
  lightcyan: [224, 255, 255, 1],
  lightgoldenrodyellow: [250, 250, 210, 1],
  lightgray: [211, 211, 211, 1],
  lightgreen: [144, 238, 144, 1],
  lightgrey: [211, 211, 211, 1],
  lightpink: [255, 182, 193, 1],
  lightsalmon: [255, 160, 122, 1],
  lightseagreen: [32, 178, 170, 1],
  lightskyblue: [135, 206, 250, 1],
  lightslategray: [119, 136, 153, 1],
  lightslategrey: [119, 136, 153, 1],
  lightsteelblue: [176, 196, 222, 1],
  lightyellow: [255, 255, 224, 1],
  lime: [0, 255, 0, 1],
  limegreen: [50, 205, 50, 1],
  linen: [250, 240, 230, 1],
  magenta: [255, 0, 255, 1],
  maroon: [128, 0, 0, 1],
  mediumaquamarine: [102, 205, 170, 1],
  mediumblue: [0, 0, 205, 1],
  mediumorchid: [186, 85, 211, 1],
  mediumpurple: [147, 112, 219, 1],
  mediumseagreen: [60, 179, 113, 1],
  mediumslateblue: [123, 104, 238, 1],
  mediumspringgreen: [0, 250, 154, 1],
  mediumturquoise: [72, 209, 204, 1],
  mediumvioletred: [199, 21, 133, 1],
  midnightblue: [25, 25, 112, 1],
  mintcream: [245, 255, 250, 1],
  mistyrose: [255, 228, 225, 1],
  moccasin: [255, 228, 181, 1],
  navajowhite: [255, 222, 173, 1],
  navy: [0, 0, 128, 1],
  oldlace: [253, 245, 230, 1],
  olive: [128, 128, 0, 1],
  olivedrab: [107, 142, 35, 1],
  orange: [255, 165, 0, 1],
  orangered: [255, 69, 0, 1],
  orchid: [218, 112, 214, 1],
  palegoldenrod: [238, 232, 170, 1],
  palegreen: [152, 251, 152, 1],
  paleturquoise: [175, 238, 238, 1],
  palevioletred: [219, 112, 147, 1],
  papayawhip: [255, 239, 213, 1],
  peachpuff: [255, 218, 185, 1],
  peru: [205, 133, 63, 1],
  pink: [255, 192, 203, 1],
  plum: [221, 160, 221, 1],
  powderblue: [176, 224, 230, 1],
  purple: [128, 0, 128, 1],
  red: [255, 0, 0, 1],
  rosybrown: [188, 143, 143, 1],
  royalblue: [65, 105, 225, 1],
  saddlebrown: [139, 69, 19, 1],
  salmon: [250, 128, 114, 1],
  sandybrown: [244, 164, 96, 1],
  seagreen: [46, 139, 87, 1],
  seashell: [255, 245, 238, 1],
  sienna: [160, 82, 45, 1],
  silver: [192, 192, 192, 1],
  skyblue: [135, 206, 235, 1],
  slateblue: [106, 90, 205, 1],
  slategray: [112, 128, 144, 1],
  slategrey: [112, 128, 144, 1],
  snow: [255, 250, 250, 1],
  springgreen: [0, 255, 127, 1],
  steelblue: [70, 130, 180, 1],
  tan: [210, 180, 140, 1],
  teal: [0, 128, 128, 1],
  thistle: [216, 191, 216, 1],
  tomato: [255, 99, 71, 1],
  turquoise: [64, 224, 208, 1],
  violet: [238, 130, 238, 1],
  wheat: [245, 222, 179, 1],
  white: [255, 255, 255, 1],
  whitesmoke: [245, 245, 245, 1],
  yellow: [255, 255, 0, 1],
  yellowgreen: [154, 205, 50, 1]
};
function xs(n) {
  return n = Math.round(n), n < 0 ? 0 : n > 255 ? 255 : n;
}
function qu(n) {
  return n < 0 ? 0 : n > 1 ? 1 : n;
}
function Ba(n) {
  var t = n;
  return t.length && t.charAt(t.length - 1) === "%" ? xs(parseFloat(t) / 100 * 255) : xs(parseInt(t, 10));
}
function ws(n) {
  var t = n;
  return t.length && t.charAt(t.length - 1) === "%" ? qu(parseFloat(t) / 100) : qu(parseFloat(t));
}
function $a(n, t, e) {
  return e < 0 ? e += 1 : e > 1 && (e -= 1), e * 6 < 1 ? n + (t - n) * e * 6 : e * 2 < 1 ? t : e * 3 < 2 ? n + (t - n) * (2 / 3 - e) * 6 : n;
}
function At(n, t, e, i, s) {
  return n[0] = t, n[1] = e, n[2] = i, n[3] = s, n;
}
function Kl(n, t) {
  return n[0] = t[0], n[1] = t[1], n[2] = t[2], n[3] = t[3], n;
}
var Tg = new yh(20), xr = null;
function ti(n, t) {
  xr && Kl(xr, t), xr = Tg.put(n, xr || t.slice());
}
function Ss(n, t) {
  if (n) {
    t = t || [];
    var e = Tg.get(n);
    if (e)
      return Kl(t, e);
    n = n + "";
    var i = n.replace(/ /g, "").toLowerCase();
    if (i in Vu)
      return Kl(t, Vu[i]), ti(n, t), t;
    var s = i.length;
    if (i.charAt(0) === "#") {
      if (s === 4 || s === 5) {
        var r = parseInt(i.slice(1, 4), 16);
        if (!(r >= 0 && r <= 4095)) {
          At(t, 0, 0, 0, 1);
          return;
        }
        return At(t, (r & 3840) >> 4 | (r & 3840) >> 8, r & 240 | (r & 240) >> 4, r & 15 | (r & 15) << 4, s === 5 ? parseInt(i.slice(4), 16) / 15 : 1), ti(n, t), t;
      } else if (s === 7 || s === 9) {
        var r = parseInt(i.slice(1, 7), 16);
        if (!(r >= 0 && r <= 16777215)) {
          At(t, 0, 0, 0, 1);
          return;
        }
        return At(t, (r & 16711680) >> 16, (r & 65280) >> 8, r & 255, s === 9 ? parseInt(i.slice(7), 16) / 255 : 1), ti(n, t), t;
      }
      return;
    }
    var o = i.indexOf("("), a = i.indexOf(")");
    if (o !== -1 && a + 1 === s) {
      var l = i.substr(0, o), c = i.substr(o + 1, a - (o + 1)).split(","), h = 1;
      switch (l) {
        case "rgba":
          if (c.length !== 4)
            return c.length === 3 ? At(t, +c[0], +c[1], +c[2], 1) : At(t, 0, 0, 0, 1);
          h = ws(c.pop());
        case "rgb":
          if (c.length >= 3)
            return At(t, Ba(c[0]), Ba(c[1]), Ba(c[2]), c.length === 3 ? h : ws(c[3])), ti(n, t), t;
          At(t, 0, 0, 0, 1);
          return;
        case "hsla":
          if (c.length !== 4) {
            At(t, 0, 0, 0, 1);
            return;
          }
          return c[3] = ws(c[3]), Xu(c, t), ti(n, t), t;
        case "hsl":
          if (c.length !== 3) {
            At(t, 0, 0, 0, 1);
            return;
          }
          return Xu(c, t), ti(n, t), t;
        default:
          return;
      }
    }
    At(t, 0, 0, 0, 1);
  }
}
function Xu(n, t) {
  var e = (parseFloat(n[0]) % 360 + 360) % 360 / 360, i = ws(n[1]), s = ws(n[2]), r = s <= 0.5 ? s * (i + 1) : s + i - s * i, o = s * 2 - r;
  return t = t || [], At(t, xs($a(o, r, e + 1 / 3) * 255), xs($a(o, r, e) * 255), xs($a(o, r, e - 1 / 3) * 255), 1), n.length === 4 && (t[3] = n[3]), t;
}
function Lv(n, t) {
  if (!(!n || !n.length)) {
    var e = n[0] + "," + n[1] + "," + n[2];
    return e += "," + n[3], t + "(" + e + ")";
  }
}
function Zu(n, t) {
  var e = Ss(n);
  return e ? (0.299 * e[0] + 0.587 * e[1] + 0.114 * e[2]) * e[3] / 255 + (1 - e[3]) * t : 0;
}
var Pv = /* @__PURE__ */ (function() {
  function n() {
    this.firefox = !1, this.ie = !1, this.edge = !1, this.newEdge = !1, this.weChat = !1;
  }
  return n;
})(), kv = /* @__PURE__ */ (function() {
  function n() {
    this.browser = new Pv(), this.node = !1, this.wxa = !1, this.worker = !1, this.svgSupported = !1, this.touchEventsSupported = !1, this.pointerEventsSupported = !1, this.domSupported = !1, this.transformSupported = !1, this.transform3dSupported = !1, this.hasGlobalWindow = typeof window != "undefined";
  }
  return n;
})(), ye = new kv();
typeof wx == "object" && typeof wx.getSystemInfoSync == "function" ? (ye.wxa = !0, ye.touchEventsSupported = !0) : typeof document == "undefined" && typeof self != "undefined" ? ye.worker = !0 : typeof navigator == "undefined" ? (ye.node = !0, ye.svgSupported = !0) : Ov(navigator.userAgent, ye);
function Ov(n, t) {
  var e = t.browser, i = n.match(/Firefox\/([\d.]+)/), s = n.match(/MSIE\s([\d.]+)/) || n.match(/Trident\/.+?rv:(([\d.]+))/), r = n.match(/Edge?\/([\d.]+)/), o = /micromessenger/i.test(n);
  i && (e.firefox = !0, e.version = i[1]), s && (e.ie = !0, e.version = s[1]), r && (e.edge = !0, e.version = r[1], e.newEdge = +r[1].split(".")[0] > 18), o && (e.weChat = !0), t.svgSupported = typeof SVGRect != "undefined", t.touchEventsSupported = "ontouchstart" in window && !e.ie && !e.edge, t.pointerEventsSupported = "onpointerdown" in window && (e.edge || e.ie && +e.version >= 11), t.domSupported = typeof document != "undefined";
  var a = document.documentElement.style;
  t.transform3dSupported = (e.ie && "transition" in a || e.edge || "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix() || "MozPerspective" in a) && !("OTransition" in a), t.transformSupported = t.transform3dSupported || e.ie && +e.version >= 9;
}
function Fv(n) {
  return n.type === "linear";
}
function Nv(n) {
  return n.type === "radial";
}
(function() {
  return ye.hasGlobalWindow && qn(window.btoa) ? function(n) {
    return window.btoa(unescape(encodeURIComponent(n)));
  } : typeof Buffer != "undefined" ? function(n) {
    return Buffer.from(n).toString("base64");
  } : function(n) {
    return null;
  };
})();
var jl = Array.prototype.slice;
function ke(n, t, e) {
  return (t - n) * e + n;
}
function Ha(n, t, e, i) {
  for (var s = t.length, r = 0; r < s; r++)
    n[r] = ke(t[r], e[r], i);
  return n;
}
function zv(n, t, e, i) {
  for (var s = t.length, r = s && t[0].length, o = 0; o < s; o++) {
    n[o] || (n[o] = []);
    for (var a = 0; a < r; a++)
      n[o][a] = ke(t[o][a], e[o][a], i);
  }
  return n;
}
function wr(n, t, e, i) {
  for (var s = t.length, r = 0; r < s; r++)
    n[r] = t[r] + e[r] * i;
  return n;
}
function Ku(n, t, e, i) {
  for (var s = t.length, r = s && t[0].length, o = 0; o < s; o++) {
    n[o] || (n[o] = []);
    for (var a = 0; a < r; a++)
      n[o][a] = t[o][a] + e[o][a] * i;
  }
  return n;
}
function Bv(n, t) {
  for (var e = n.length, i = t.length, s = e > i ? t : n, r = Math.min(e, i), o = s[r - 1] || { color: [0, 0, 0, 0], offset: 0 }, a = r; a < Math.max(e, i); a++)
    s.push({
      offset: o.offset,
      color: o.color.slice()
    });
}
function $v(n, t, e) {
  var i = n, s = t;
  if (!(!i.push || !s.push)) {
    var r = i.length, o = s.length;
    if (r !== o) {
      var a = r > o;
      if (a)
        i.length = o;
      else
        for (var l = r; l < o; l++)
          i.push(e === 1 ? s[l] : jl.call(s[l]));
    }
    for (var c = i[0] && i[0].length, l = 0; l < i.length; l++)
      if (e === 1)
        isNaN(i[l]) && (i[l] = s[l]);
      else
        for (var h = 0; h < c; h++)
          isNaN(i[l][h]) && (i[l][h] = s[l][h]);
  }
}
function bs(n) {
  if (Xt(n)) {
    var t = n.length;
    if (Xt(n[0])) {
      for (var e = [], i = 0; i < t; i++)
        e.push(jl.call(n[i]));
      return e;
    }
    return jl.call(n);
  }
  return n;
}
function eo(n) {
  return n[0] = Math.floor(n[0]) || 0, n[1] = Math.floor(n[1]) || 0, n[2] = Math.floor(n[2]) || 0, n[3] = n[3] == null ? 1 : n[3], "rgba(" + n.join(",") + ")";
}
function Hv(n) {
  return Xt(n && n[0]) ? 2 : 1;
}
var Sr = 0, no = 1, Mg = 2, ls = 3, Ql = 4, Jl = 5, ju = 6;
function Qu(n) {
  return n === Ql || n === Jl;
}
function br(n) {
  return n === no || n === Mg;
}
var qi = [0, 0, 0, 0], Gv = (function() {
  function n(t) {
    this.keyframes = [], this.discrete = !1, this._invalid = !1, this._needsSort = !1, this._lastFr = 0, this._lastFrP = 0, this.propName = t;
  }
  return n.prototype.isFinished = function() {
    return this._finished;
  }, n.prototype.setFinished = function() {
    this._finished = !0, this._additiveTrack && this._additiveTrack.setFinished();
  }, n.prototype.needsAnimate = function() {
    return this.keyframes.length >= 1;
  }, n.prototype.getAdditiveTrack = function() {
    return this._additiveTrack;
  }, n.prototype.addKeyframe = function(t, e, i) {
    this._needsSort = !0;
    var s = this.keyframes, r = s.length, o = !1, a = ju, l = e;
    if (Xt(e)) {
      var c = Hv(e);
      a = c, (c === 1 && !re(e[0]) || c === 2 && !re(e[0][0])) && (o = !0);
    } else if (re(e) && !Pm(e))
      a = Sr;
    else if (qt(e))
      if (!isNaN(+e))
        a = Sr;
      else {
        var h = Ss(e);
        h && (l = h, a = ls);
      }
    else if (ga(e)) {
      var u = R({}, l);
      u.colorStops = oe(e.colorStops, function(d) {
        return {
          offset: d.offset,
          color: Ss(d.color)
        };
      }), Fv(e) ? a = Ql : Nv(e) && (a = Jl), l = u;
    }
    r === 0 ? this.valType = a : (a !== this.valType || a === ju) && (o = !0), this.discrete = this.discrete || o;
    var f = {
      time: t,
      value: l,
      rawValue: e,
      percent: 0
    };
    return i && (f.easing = i, f.easingFunc = qn(i) ? i : vs[i] || Sg(i)), s.push(f), f;
  }, n.prototype.prepare = function(t, e) {
    var i = this.keyframes;
    this._needsSort && i.sort(function(_, g) {
      return _.time - g.time;
    });
    for (var s = this.valType, r = i.length, o = i[r - 1], a = this.discrete, l = br(s), c = Qu(s), h = 0; h < r; h++) {
      var u = i[h], f = u.value, d = o.value;
      u.percent = u.time / t, a || (l && h !== r - 1 ? $v(f, d, s) : c && Bv(f.colorStops, d.colorStops));
    }
    if (!a && s !== Jl && e && this.needsAnimate() && e.needsAnimate() && s === e.valType && !e._finished) {
      this._additiveTrack = e;
      for (var p = i[0].value, h = 0; h < r; h++)
        s === Sr ? i[h].additiveValue = i[h].value - p : s === ls ? i[h].additiveValue = wr([], i[h].value, p, -1) : br(s) && (i[h].additiveValue = s === no ? wr([], i[h].value, p, -1) : Ku([], i[h].value, p, -1));
    }
  }, n.prototype.step = function(t, e) {
    if (!this._finished) {
      this._additiveTrack && this._additiveTrack._finished && (this._additiveTrack = null);
      var i = this._additiveTrack != null, s = i ? "additiveValue" : "value", r = this.valType, o = this.keyframes, a = o.length, l = this.propName, c = r === ls, h, u = this._lastFr, f = Math.min, d, p;
      if (a === 1)
        d = p = o[0];
      else {
        if (e < 0)
          h = 0;
        else if (e < this._lastFrP) {
          var _ = f(u + 1, a - 1);
          for (h = _; h >= 0 && !(o[h].percent <= e); h--)
            ;
          h = f(h, a - 2);
        } else {
          for (h = u; h < a && !(o[h].percent > e); h++)
            ;
          h = f(h - 1, a - 2);
        }
        p = o[h + 1], d = o[h];
      }
      if (d && p) {
        this._lastFr = h, this._lastFrP = e;
        var g = p.percent - d.percent, m = g === 0 ? 1 : f((e - d.percent) / g, 1);
        p.easingFunc && (m = p.easingFunc(m));
        var y = i ? this._additiveValue : c ? qi : t[l];
        if ((br(r) || c) && !y && (y = this._additiveValue = []), this.discrete)
          t[l] = m < 1 ? d.rawValue : p.rawValue;
        else if (br(r))
          r === no ? Ha(y, d[s], p[s], m) : zv(y, d[s], p[s], m);
        else if (Qu(r)) {
          var v = d[s], S = p[s], w = r === Ql;
          t[l] = {
            type: w ? "linear" : "radial",
            x: ke(v.x, S.x, m),
            y: ke(v.y, S.y, m),
            colorStops: oe(v.colorStops, function(M, b) {
              var T = S.colorStops[b];
              return {
                offset: ke(M.offset, T.offset, m),
                color: eo(Ha([], M.color, T.color, m))
              };
            }),
            global: S.global
          }, w ? (t[l].x2 = ke(v.x2, S.x2, m), t[l].y2 = ke(v.y2, S.y2, m)) : t[l].r = ke(v.r, S.r, m);
        } else if (c)
          Ha(y, d[s], p[s], m), i || (t[l] = eo(y));
        else {
          var x = ke(d[s], p[s], m);
          i ? this._additiveValue = x : t[l] = x;
        }
        i && this._addToTarget(t);
      }
    }
  }, n.prototype._addToTarget = function(t) {
    var e = this.valType, i = this.propName, s = this._additiveValue;
    e === Sr ? t[i] = t[i] + s : e === ls ? (Ss(t[i], qi), wr(qi, qi, s, 1), t[i] = eo(qi)) : e === no ? wr(t[i], t[i], s, 1) : e === Mg && Ku(t[i], t[i], s, 1);
  }, n;
})(), Cg = (function() {
  function n(t, e, i, s) {
    if (this._tracks = {}, this._trackKeys = [], this._maxTime = 0, this._started = 0, this._clip = null, this._target = t, this._loop = e, e && s) {
      sh("Can' use additive animation on looped animation.");
      return;
    }
    this._additiveAnimators = s, this._allowDiscrete = i;
  }
  return n.prototype.getMaxTime = function() {
    return this._maxTime;
  }, n.prototype.getDelay = function() {
    return this._delay;
  }, n.prototype.getLoop = function() {
    return this._loop;
  }, n.prototype.getTarget = function() {
    return this._target;
  }, n.prototype.changeTarget = function(t) {
    this._target = t;
  }, n.prototype.when = function(t, e, i) {
    return this.whenWithKeys(t, e, mt(e), i);
  }, n.prototype.whenWithKeys = function(t, e, i, s) {
    for (var r = this._tracks, o = 0; o < i.length; o++) {
      var a = i[o], l = r[a];
      if (!l) {
        l = r[a] = new Gv(a);
        var c = void 0, h = this._getAdditiveTrack(a);
        if (h) {
          var u = h.keyframes, f = u[u.length - 1];
          c = f && f.value, h.valType === ls && c && (c = eo(c));
        } else
          c = this._target[a];
        if (c == null)
          continue;
        t > 0 && l.addKeyframe(0, bs(c), s), this._trackKeys.push(a);
      }
      l.addKeyframe(t, bs(e[a]), s);
    }
    return this._maxTime = Math.max(this._maxTime, t), this;
  }, n.prototype.pause = function() {
    this._clip.pause(), this._paused = !0;
  }, n.prototype.resume = function() {
    this._clip.resume(), this._paused = !1;
  }, n.prototype.isPaused = function() {
    return !!this._paused;
  }, n.prototype.duration = function(t) {
    return this._maxTime = t, this._force = !0, this;
  }, n.prototype._doneCallback = function() {
    this._setTracksFinished(), this._clip = null;
    var t = this._doneCbs;
    if (t)
      for (var e = t.length, i = 0; i < e; i++)
        t[i].call(this);
  }, n.prototype._abortedCallback = function() {
    this._setTracksFinished();
    var t = this.animation, e = this._abortedCbs;
    if (t && t.removeClip(this._clip), this._clip = null, e)
      for (var i = 0; i < e.length; i++)
        e[i].call(this);
  }, n.prototype._setTracksFinished = function() {
    for (var t = this._tracks, e = this._trackKeys, i = 0; i < e.length; i++)
      t[e[i]].setFinished();
  }, n.prototype._getAdditiveTrack = function(t) {
    var e, i = this._additiveAnimators;
    if (i)
      for (var s = 0; s < i.length; s++) {
        var r = i[s].getTrack(t);
        r && (e = r);
      }
    return e;
  }, n.prototype.start = function(t) {
    if (!(this._started > 0)) {
      this._started = 1;
      for (var e = this, i = [], s = this._maxTime || 0, r = 0; r < this._trackKeys.length; r++) {
        var o = this._trackKeys[r], a = this._tracks[o], l = this._getAdditiveTrack(o), c = a.keyframes, h = c.length;
        if (a.prepare(s, l), a.needsAnimate())
          if (!this._allowDiscrete && a.discrete) {
            var u = c[h - 1];
            u && (e._target[a.propName] = u.rawValue), a.setFinished();
          } else
            i.push(a);
      }
      if (i.length || this._force) {
        var f = new Rv({
          life: s,
          loop: this._loop,
          delay: this._delay || 0,
          onframe: function(d) {
            e._started = 2;
            var p = e._additiveAnimators;
            if (p) {
              for (var _ = !1, g = 0; g < p.length; g++)
                if (p[g]._clip) {
                  _ = !0;
                  break;
                }
              _ || (e._additiveAnimators = null);
            }
            for (var g = 0; g < i.length; g++)
              i[g].step(e._target, d);
            var m = e._onframeCbs;
            if (m)
              for (var g = 0; g < m.length; g++)
                m[g](e._target, d);
          },
          ondestroy: function() {
            e._doneCallback();
          }
        });
        this._clip = f, this.animation && this.animation.addClip(f), t && f.setEasing(t);
      } else
        this._doneCallback();
      return this;
    }
  }, n.prototype.stop = function(t) {
    if (this._clip) {
      var e = this._clip;
      t && e.onframe(1), this._abortedCallback();
    }
  }, n.prototype.delay = function(t) {
    return this._delay = t, this;
  }, n.prototype.during = function(t) {
    return t && (this._onframeCbs || (this._onframeCbs = []), this._onframeCbs.push(t)), this;
  }, n.prototype.done = function(t) {
    return t && (this._doneCbs || (this._doneCbs = []), this._doneCbs.push(t)), this;
  }, n.prototype.aborted = function(t) {
    return t && (this._abortedCbs || (this._abortedCbs = []), this._abortedCbs.push(t)), this;
  }, n.prototype.getClip = function() {
    return this._clip;
  }, n.prototype.getTrack = function(t) {
    return this._tracks[t];
  }, n.prototype.getTracks = function() {
    var t = this;
    return oe(this._trackKeys, function(e) {
      return t._tracks[e];
    });
  }, n.prototype.stopTracks = function(t, e) {
    if (!t.length || !this._clip)
      return !0;
    for (var i = this._tracks, s = this._trackKeys, r = 0; r < t.length; r++) {
      var o = i[t[r]];
      o && !o.isFinished() && (e ? o.step(this._target, 1) : this._started === 1 && o.step(this._target, 0), o.setFinished());
    }
    for (var a = !0, r = 0; r < s.length; r++)
      if (!i[s[r]].isFinished()) {
        a = !1;
        break;
      }
    return a && this._abortedCallback(), a;
  }, n.prototype.saveTo = function(t, e, i) {
    if (t) {
      e = e || this._trackKeys;
      for (var s = 0; s < e.length; s++) {
        var r = e[s], o = this._tracks[r];
        if (!(!o || o.isFinished())) {
          var a = o.keyframes, l = a[i ? 0 : a.length - 1];
          l && (t[r] = bs(l.rawValue));
        }
      }
    }
  }, n.prototype.__changeFinalValue = function(t, e) {
    e = e || mt(t);
    for (var i = 0; i < e.length; i++) {
      var s = e[i], r = this._tracks[s];
      if (r) {
        var o = r.keyframes;
        if (o.length > 1) {
          var a = o.pop();
          r.addKeyframe(a.time, t[s]), r.prepare(this._maxTime, r.getAdditiveTrack());
        }
      }
    }
  }, n;
})(), lt = (function() {
  function n(t, e) {
    this.x = t || 0, this.y = e || 0;
  }
  return n.prototype.copy = function(t) {
    return this.x = t.x, this.y = t.y, this;
  }, n.prototype.clone = function() {
    return new n(this.x, this.y);
  }, n.prototype.set = function(t, e) {
    return this.x = t, this.y = e, this;
  }, n.prototype.equal = function(t) {
    return t.x === this.x && t.y === this.y;
  }, n.prototype.add = function(t) {
    return this.x += t.x, this.y += t.y, this;
  }, n.prototype.scale = function(t) {
    this.x *= t, this.y *= t;
  }, n.prototype.scaleAndAdd = function(t, e) {
    this.x += t.x * e, this.y += t.y * e;
  }, n.prototype.sub = function(t) {
    return this.x -= t.x, this.y -= t.y, this;
  }, n.prototype.dot = function(t) {
    return this.x * t.x + this.y * t.y;
  }, n.prototype.len = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }, n.prototype.lenSquare = function() {
    return this.x * this.x + this.y * this.y;
  }, n.prototype.normalize = function() {
    var t = this.len();
    return this.x /= t, this.y /= t, this;
  }, n.prototype.distance = function(t) {
    var e = this.x - t.x, i = this.y - t.y;
    return Math.sqrt(e * e + i * i);
  }, n.prototype.distanceSquare = function(t) {
    var e = this.x - t.x, i = this.y - t.y;
    return e * e + i * i;
  }, n.prototype.negate = function() {
    return this.x = -this.x, this.y = -this.y, this;
  }, n.prototype.transform = function(t) {
    if (t) {
      var e = this.x, i = this.y;
      return this.x = t[0] * e + t[2] * i + t[4], this.y = t[1] * e + t[3] * i + t[5], this;
    }
  }, n.prototype.toArray = function(t) {
    return t[0] = this.x, t[1] = this.y, t;
  }, n.prototype.fromArray = function(t) {
    this.x = t[0], this.y = t[1];
  }, n.set = function(t, e, i) {
    t.x = e, t.y = i;
  }, n.copy = function(t, e) {
    t.x = e.x, t.y = e.y;
  }, n.len = function(t) {
    return Math.sqrt(t.x * t.x + t.y * t.y);
  }, n.lenSquare = function(t) {
    return t.x * t.x + t.y * t.y;
  }, n.dot = function(t, e) {
    return t.x * e.x + t.y * e.y;
  }, n.add = function(t, e, i) {
    t.x = e.x + i.x, t.y = e.y + i.y;
  }, n.sub = function(t, e, i) {
    t.x = e.x - i.x, t.y = e.y - i.y;
  }, n.scale = function(t, e, i) {
    t.x = e.x * i, t.y = e.y * i;
  }, n.scaleAndAdd = function(t, e, i, s) {
    t.x = e.x + i.x * s, t.y = e.y + i.y * s;
  }, n.lerp = function(t, e, i, s) {
    var r = 1 - s;
    t.x = r * e.x + s * i.x, t.y = r * e.y + s * i.y;
  }, n;
})(), Tr = Math.min, Mr = Math.max, _n = new lt(), mn = new lt(), yn = new lt(), vn = new lt(), Xi = new lt(), Zi = new lt(), _t = (function() {
  function n(t, e, i, s) {
    i < 0 && (t = t + i, i = -i), s < 0 && (e = e + s, s = -s), this.x = t, this.y = e, this.width = i, this.height = s;
  }
  return n.prototype.union = function(t) {
    var e = Tr(t.x, this.x), i = Tr(t.y, this.y);
    isFinite(this.x) && isFinite(this.width) ? this.width = Mr(t.x + t.width, this.x + this.width) - e : this.width = t.width, isFinite(this.y) && isFinite(this.height) ? this.height = Mr(t.y + t.height, this.y + this.height) - i : this.height = t.height, this.x = e, this.y = i;
  }, n.prototype.applyTransform = function(t) {
    n.applyTransform(this, this, t);
  }, n.prototype.calculateTransform = function(t) {
    var e = this, i = t.width / e.width, s = t.height / e.height, r = So();
    return $u(r, r, [-e.x, -e.y]), wv(r, r, [i, s]), $u(r, r, [t.x, t.y]), r;
  }, n.prototype.intersect = function(t, e) {
    if (!t)
      return !1;
    t instanceof n || (t = n.create(t));
    var i = this, s = i.x, r = i.x + i.width, o = i.y, a = i.y + i.height, l = t.x, c = t.x + t.width, h = t.y, u = t.y + t.height, f = !(r < l || c < s || a < h || u < o);
    if (e) {
      var d = 1 / 0, p = 0, _ = Math.abs(r - l), g = Math.abs(c - s), m = Math.abs(a - h), y = Math.abs(u - o), v = Math.min(_, g), S = Math.min(m, y);
      r < l || c < s ? v > p && (p = v, _ < g ? lt.set(Zi, -_, 0) : lt.set(Zi, g, 0)) : v < d && (d = v, _ < g ? lt.set(Xi, _, 0) : lt.set(Xi, -g, 0)), a < h || u < o ? S > p && (p = S, m < y ? lt.set(Zi, 0, -m) : lt.set(Zi, 0, y)) : v < d && (d = v, m < y ? lt.set(Xi, 0, m) : lt.set(Xi, 0, -y));
    }
    return e && lt.copy(e, f ? Xi : Zi), f;
  }, n.prototype.contain = function(t, e) {
    var i = this;
    return t >= i.x && t <= i.x + i.width && e >= i.y && e <= i.y + i.height;
  }, n.prototype.clone = function() {
    return new n(this.x, this.y, this.width, this.height);
  }, n.prototype.copy = function(t) {
    n.copy(this, t);
  }, n.prototype.plain = function() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  }, n.prototype.isFinite = function() {
    return isFinite(this.x) && isFinite(this.y) && isFinite(this.width) && isFinite(this.height);
  }, n.prototype.isZero = function() {
    return this.width === 0 || this.height === 0;
  }, n.create = function(t) {
    return new n(t.x, t.y, t.width, t.height);
  }, n.copy = function(t, e) {
    t.x = e.x, t.y = e.y, t.width = e.width, t.height = e.height;
  }, n.applyTransform = function(t, e, i) {
    if (!i) {
      t !== e && n.copy(t, e);
      return;
    }
    if (i[1] < 1e-5 && i[1] > -1e-5 && i[2] < 1e-5 && i[2] > -1e-5) {
      var s = i[0], r = i[3], o = i[4], a = i[5];
      t.x = e.x * s + o, t.y = e.y * r + a, t.width = e.width * s, t.height = e.height * r, t.width < 0 && (t.x += t.width, t.width = -t.width), t.height < 0 && (t.y += t.height, t.height = -t.height);
      return;
    }
    _n.x = yn.x = e.x, _n.y = vn.y = e.y, mn.x = vn.x = e.x + e.width, mn.y = yn.y = e.y + e.height, _n.transform(i), vn.transform(i), mn.transform(i), yn.transform(i), t.x = Tr(_n.x, mn.x, yn.x, vn.x), t.y = Tr(_n.y, mn.y, yn.y, vn.y);
    var l = Mr(_n.x, mn.x, yn.x, vn.x), c = Mr(_n.y, mn.y, yn.y, vn.y);
    t.width = l - t.x, t.height = c - t.y;
  }, n;
})(), Dg = (function() {
  function n(t) {
    t && (this._$eventProcessor = t);
  }
  return n.prototype.on = function(t, e, i, s) {
    this._$handlers || (this._$handlers = {});
    var r = this._$handlers;
    if (typeof e == "function" && (s = i, i = e, e = null), !i || !t)
      return this;
    var o = this._$eventProcessor;
    e != null && o && o.normalizeQuery && (e = o.normalizeQuery(e)), r[t] || (r[t] = []);
    for (var a = 0; a < r[t].length; a++)
      if (r[t][a].h === i)
        return this;
    var l = {
      h: i,
      query: e,
      ctx: s || this,
      callAtLast: i.zrEventfulCallAtLast
    }, c = r[t].length - 1, h = r[t][c];
    return h && h.callAtLast ? r[t].splice(c, 0, l) : r[t].push(l), this;
  }, n.prototype.isSilent = function(t) {
    var e = this._$handlers;
    return !e || !e[t] || !e[t].length;
  }, n.prototype.off = function(t, e) {
    var i = this._$handlers;
    if (!i)
      return this;
    if (!t)
      return this._$handlers = {}, this;
    if (e) {
      if (i[t]) {
        for (var s = [], r = 0, o = i[t].length; r < o; r++)
          i[t][r].h !== e && s.push(i[t][r]);
        i[t] = s;
      }
      i[t] && i[t].length === 0 && delete i[t];
    } else
      delete i[t];
    return this;
  }, n.prototype.trigger = function(t) {
    for (var e = [], i = 1; i < arguments.length; i++)
      e[i - 1] = arguments[i];
    if (!this._$handlers)
      return this;
    var s = this._$handlers[t], r = this._$eventProcessor;
    if (s)
      for (var o = e.length, a = s.length, l = 0; l < a; l++) {
        var c = s[l];
        if (!(r && r.filter && c.query != null && !r.filter(t, c.query)))
          switch (o) {
            case 0:
              c.h.call(c.ctx);
              break;
            case 1:
              c.h.call(c.ctx, e[0]);
              break;
            case 2:
              c.h.call(c.ctx, e[0], e[1]);
              break;
            default:
              c.h.apply(c.ctx, e);
              break;
          }
      }
    return r && r.afterTrigger && r.afterTrigger(t), this;
  }, n.prototype.triggerWithContext = function(t) {
    for (var e = [], i = 1; i < arguments.length; i++)
      e[i - 1] = arguments[i];
    if (!this._$handlers)
      return this;
    var s = this._$handlers[t], r = this._$eventProcessor;
    if (s)
      for (var o = e.length, a = e[o - 1], l = s.length, c = 0; c < l; c++) {
        var h = s[c];
        if (!(r && r.filter && h.query != null && !r.filter(t, h.query)))
          switch (o) {
            case 0:
              h.h.call(a);
              break;
            case 1:
              h.h.call(a, e[0]);
              break;
            case 2:
              h.h.call(a, e[0], e[1]);
              break;
            default:
              h.h.apply(a, e.slice(1, o - 1));
              break;
          }
      }
    return r && r.afterTrigger && r.afterTrigger(t), this;
  }, n;
})(), Ju = {};
function Ig(n, t) {
  t = t || $s;
  var e = Ju[t];
  e || (e = Ju[t] = new yh(500));
  var i = e.get(n);
  return i == null && (i = nr.measureText(n, t).width, e.put(n, i)), i;
}
function tf(n, t, e, i) {
  var s = Ig(n, t), r = Vv(t), o = Wv(0, s, e), a = Uv(0, r, i), l = new _t(o, a, s, r);
  return l;
}
function Yv(n, t, e, i) {
  var s = ((n || "") + "").split(`
`), r = s.length;
  if (r === 1)
    return tf(s[0], t, e, i);
  for (var o = new _t(0, 0, 0, 0), a = 0; a < s.length; a++) {
    var l = tf(s[a], t, e, i);
    a === 0 ? o.copy(l) : o.union(l);
  }
  return o;
}
function Wv(n, t, e) {
  return e === "right" ? n -= t : e === "center" && (n -= t / 2), n;
}
function Uv(n, t, e) {
  return e === "middle" ? n -= t / 2 : e === "bottom" && (n -= t), n;
}
function Vv(n) {
  return Ig("国", n);
}
function Ai(n, t) {
  return typeof n == "string" ? n.lastIndexOf("%") >= 0 ? parseFloat(n) / 100 * t : parseFloat(n) : n;
}
function Eg(n, t, e) {
  var i = t.position || "inside", s = t.distance != null ? t.distance : 5, r = e.height, o = e.width, a = r / 2, l = e.x, c = e.y, h = "left", u = "top";
  if (i instanceof Array)
    l += Ai(i[0], e.width), c += Ai(i[1], e.height), h = null, u = null;
  else
    switch (i) {
      case "left":
        l -= s, c += a, h = "right", u = "middle";
        break;
      case "right":
        l += s + o, c += a, u = "middle";
        break;
      case "top":
        l += o / 2, c -= s, h = "center", u = "bottom";
        break;
      case "bottom":
        l += o / 2, c += r + s, h = "center";
        break;
      case "inside":
        l += o / 2, c += a, h = "center", u = "middle";
        break;
      case "insideLeft":
        l += s, c += a, u = "middle";
        break;
      case "insideRight":
        l += o - s, c += a, h = "right", u = "middle";
        break;
      case "insideTop":
        l += o / 2, c += s, h = "center";
        break;
      case "insideBottom":
        l += o / 2, c += r - s, h = "center", u = "bottom";
        break;
      case "insideTopLeft":
        l += s, c += s;
        break;
      case "insideTopRight":
        l += o - s, c += s, h = "right";
        break;
      case "insideBottomLeft":
        l += s, c += r - s, u = "bottom";
        break;
      case "insideBottomRight":
        l += o - s, c += r - s, h = "right", u = "bottom";
        break;
    }
  return n = n || {}, n.x = l, n.y = c, n.align = h, n.verticalAlign = u, n;
}
var Rg = 1;
ye.hasGlobalWindow && (Rg = Math.max(window.devicePixelRatio || window.screen && window.screen.deviceXDPI / window.screen.logicalXDPI || 1, 1));
var To = Rg, qv = 0.4, tc = "#333", ec = "#ccc", Xv = "#eee", Ut = 1, cs = 2, fi = 4, Ga = "__zr_normal__", Ya = an.concat(["ignore"]), Zv = rh(an, function(n, t) {
  return n[t] = !0, n;
}, { ignore: !1 }), ei = {}, Kv = new _t(0, 0, 0, 0), vh = (function() {
  function n(t) {
    this.id = Em(), this.animators = [], this.currentStates = [], this.states = {}, this._init(t);
  }
  return n.prototype._init = function(t) {
    this.attr(t);
  }, n.prototype.drift = function(t, e, i) {
    switch (this.draggable) {
      case "horizontal":
        e = 0;
        break;
      case "vertical":
        t = 0;
        break;
    }
    var s = this.transform;
    s || (s = this.transform = [1, 0, 0, 1, 0, 0]), s[4] += t, s[5] += e, this.decomposeTransform(), this.markRedraw();
  }, n.prototype.beforeUpdate = function() {
  }, n.prototype.afterUpdate = function() {
  }, n.prototype.update = function() {
    this.updateTransform(), this.__dirty && this.updateInnerText();
  }, n.prototype.updateInnerText = function(t) {
    var e = this._textContent;
    if (e && (!e.ignore || t)) {
      this.textConfig || (this.textConfig = {});
      var i = this.textConfig, s = i.local, r = e.innerTransformable, o = void 0, a = void 0, l = !1;
      r.parent = s ? this : null;
      var c = !1;
      if (r.copyTransform(e), i.position != null) {
        var h = Kv;
        i.layoutRect ? h.copy(i.layoutRect) : h.copy(this.getBoundingRect()), s || h.applyTransform(this.transform), this.calculateTextPosition ? this.calculateTextPosition(ei, i, h) : Eg(ei, i, h), r.x = ei.x, r.y = ei.y, o = ei.align, a = ei.verticalAlign;
        var u = i.origin;
        if (u && i.rotation != null) {
          var f = void 0, d = void 0;
          u === "center" ? (f = h.width * 0.5, d = h.height * 0.5) : (f = Ai(u[0], h.width), d = Ai(u[1], h.height)), c = !0, r.originX = -r.x + f + (s ? 0 : h.x), r.originY = -r.y + d + (s ? 0 : h.y);
        }
      }
      i.rotation != null && (r.rotation = i.rotation);
      var p = i.offset;
      p && (r.x += p[0], r.y += p[1], c || (r.originX = -p[0], r.originY = -p[1]));
      var _ = i.inside == null ? typeof i.position == "string" && i.position.indexOf("inside") >= 0 : i.inside, g = this._innerTextDefaultStyle || (this._innerTextDefaultStyle = {}), m = void 0, y = void 0, v = void 0;
      _ && this.canBeInsideText() ? (m = i.insideFill, y = i.insideStroke, (m == null || m === "auto") && (m = this.getInsideTextFill()), (y == null || y === "auto") && (y = this.getInsideTextStroke(m), v = !0)) : (m = i.outsideFill, y = i.outsideStroke, (m == null || m === "auto") && (m = this.getOutsideFill()), (y == null || y === "auto") && (y = this.getOutsideStroke(m), v = !0)), m = m || "#000", (m !== g.fill || y !== g.stroke || v !== g.autoStroke || o !== g.align || a !== g.verticalAlign) && (l = !0, g.fill = m, g.stroke = y, g.autoStroke = v, g.align = o, g.verticalAlign = a, e.setDefaultTextStyle(g)), e.__dirty |= Ut, l && e.dirtyStyle(!0);
    }
  }, n.prototype.canBeInsideText = function() {
    return !0;
  }, n.prototype.getInsideTextFill = function() {
    return "#fff";
  }, n.prototype.getInsideTextStroke = function(t) {
    return "#000";
  }, n.prototype.getOutsideFill = function() {
    return this.__zr && this.__zr.isDarkMode() ? ec : tc;
  }, n.prototype.getOutsideStroke = function(t) {
    var e = this.__zr && this.__zr.getBackgroundColor(), i = typeof e == "string" && Ss(e);
    i || (i = [255, 255, 255, 1]);
    for (var s = i[3], r = this.__zr.isDarkMode(), o = 0; o < 3; o++)
      i[o] = i[o] * s + (r ? 0 : 255) * (1 - s);
    return i[3] = 1, Lv(i, "rgba");
  }, n.prototype.traverse = function(t, e) {
  }, n.prototype.attrKV = function(t, e) {
    t === "textConfig" ? this.setTextConfig(e) : t === "textContent" ? this.setTextContent(e) : t === "clipPath" ? this.setClipPath(e) : t === "extra" ? (this.extra = this.extra || {}, R(this.extra, e)) : this[t] = e;
  }, n.prototype.hide = function() {
    this.ignore = !0, this.markRedraw();
  }, n.prototype.show = function() {
    this.ignore = !1, this.markRedraw();
  }, n.prototype.attr = function(t, e) {
    if (typeof t == "string")
      this.attrKV(t, e);
    else if (se(t))
      for (var i = t, s = mt(i), r = 0; r < s.length; r++) {
        var o = s[r];
        this.attrKV(o, t[o]);
      }
    return this.markRedraw(), this;
  }, n.prototype.saveCurrentToNormalState = function(t) {
    this._innerSaveToNormal(t);
    for (var e = this._normalState, i = 0; i < this.animators.length; i++) {
      var s = this.animators[i], r = s.__fromStateTransition;
      if (!(s.getLoop() || r && r !== Ga)) {
        var o = s.targetName, a = o ? e[o] : e;
        s.saveTo(a);
      }
    }
  }, n.prototype._innerSaveToNormal = function(t) {
    var e = this._normalState;
    e || (e = this._normalState = {}), t.textConfig && !e.textConfig && (e.textConfig = this.textConfig), this._savePrimaryToNormal(t, e, Ya);
  }, n.prototype._savePrimaryToNormal = function(t, e, i) {
    for (var s = 0; s < i.length; s++) {
      var r = i[s];
      t[r] != null && !(r in e) && (e[r] = this[r]);
    }
  }, n.prototype.hasState = function() {
    return this.currentStates.length > 0;
  }, n.prototype.getState = function(t) {
    return this.states[t];
  }, n.prototype.ensureState = function(t) {
    var e = this.states;
    return e[t] || (e[t] = {}), e[t];
  }, n.prototype.clearStates = function(t) {
    this.useState(Ga, !1, t);
  }, n.prototype.useState = function(t, e, i, s) {
    var r = t === Ga, o = this.hasState();
    if (!(!o && r)) {
      var a = this.currentStates, l = this.stateTransition;
      if (!(Tt(a, t) >= 0 && (e || a.length === 1))) {
        var c;
        if (this.stateProxy && !r && (c = this.stateProxy(t)), c || (c = this.states && this.states[t]), !c && !r) {
          sh("State " + t + " not exists.");
          return;
        }
        r || this.saveCurrentToNormalState(c);
        var h = !!(c && c.hoverLayer || s);
        h && this._toggleHoverLayerFlag(!0), this._applyStateObj(t, c, this._normalState, e, !i && !this.__inHover && l && l.duration > 0, l);
        var u = this._textContent, f = this._textGuide;
        return u && u.useState(t, e, i, h), f && f.useState(t, e, i, h), r ? (this.currentStates = [], this._normalState = {}) : e ? this.currentStates.push(t) : this.currentStates = [t], this._updateAnimationTargets(), this.markRedraw(), !h && this.__inHover && (this._toggleHoverLayerFlag(!1), this.__dirty &= ~Ut), c;
      }
    }
  }, n.prototype.useStates = function(t, e, i) {
    if (!t.length)
      this.clearStates();
    else {
      var s = [], r = this.currentStates, o = t.length, a = o === r.length;
      if (a) {
        for (var l = 0; l < o; l++)
          if (t[l] !== r[l]) {
            a = !1;
            break;
          }
      }
      if (a)
        return;
      for (var l = 0; l < o; l++) {
        var c = t[l], h = void 0;
        this.stateProxy && (h = this.stateProxy(c, t)), h || (h = this.states[c]), h && s.push(h);
      }
      var u = s[o - 1], f = !!(u && u.hoverLayer || i);
      f && this._toggleHoverLayerFlag(!0);
      var d = this._mergeStates(s), p = this.stateTransition;
      this.saveCurrentToNormalState(d), this._applyStateObj(t.join(","), d, this._normalState, !1, !e && !this.__inHover && p && p.duration > 0, p);
      var _ = this._textContent, g = this._textGuide;
      _ && _.useStates(t, e, f), g && g.useStates(t, e, f), this._updateAnimationTargets(), this.currentStates = t.slice(), this.markRedraw(), !f && this.__inHover && (this._toggleHoverLayerFlag(!1), this.__dirty &= ~Ut);
    }
  }, n.prototype._updateAnimationTargets = function() {
    for (var t = 0; t < this.animators.length; t++) {
      var e = this.animators[t];
      e.targetName && e.changeTarget(this[e.targetName]);
    }
  }, n.prototype.removeState = function(t) {
    var e = Tt(this.currentStates, t);
    if (e >= 0) {
      var i = this.currentStates.slice();
      i.splice(e, 1), this.useStates(i);
    }
  }, n.prototype.replaceState = function(t, e, i) {
    var s = this.currentStates.slice(), r = Tt(s, t), o = Tt(s, e) >= 0;
    r >= 0 ? o ? s.splice(r, 1) : s[r] = e : i && !o && s.push(e), this.useStates(s);
  }, n.prototype.toggleState = function(t, e) {
    e ? this.useState(t, !0) : this.removeState(t);
  }, n.prototype._mergeStates = function(t) {
    for (var e = {}, i, s = 0; s < t.length; s++) {
      var r = t[s];
      R(e, r), r.textConfig && (i = i || {}, R(i, r.textConfig));
    }
    return i && (e.textConfig = i), e;
  }, n.prototype._applyStateObj = function(t, e, i, s, r, o) {
    var a = !(e && s);
    e && e.textConfig ? (this.textConfig = R({}, s ? this.textConfig : i.textConfig), R(this.textConfig, e.textConfig)) : a && i.textConfig && (this.textConfig = i.textConfig);
    for (var l = {}, c = !1, h = 0; h < Ya.length; h++) {
      var u = Ya[h], f = r && Zv[u];
      e && e[u] != null ? f ? (c = !0, l[u] = e[u]) : this[u] = e[u] : a && i[u] != null && (f ? (c = !0, l[u] = i[u]) : this[u] = i[u]);
    }
    if (!r)
      for (var h = 0; h < this.animators.length; h++) {
        var d = this.animators[h], p = d.targetName;
        d.getLoop() || d.__changeFinalValue(p ? (e || i)[p] : e || i);
      }
    c && this._transitionState(t, l, o);
  }, n.prototype._attachComponent = function(t) {
    if (!(t.__zr && !t.__hostTarget) && t !== this) {
      var e = this.__zr;
      e && t.addSelfToZr(e), t.__zr = e, t.__hostTarget = this;
    }
  }, n.prototype._detachComponent = function(t) {
    t.__zr && t.removeSelfFromZr(t.__zr), t.__zr = null, t.__hostTarget = null;
  }, n.prototype.getClipPath = function() {
    return this._clipPath;
  }, n.prototype.setClipPath = function(t) {
    this._clipPath && this._clipPath !== t && this.removeClipPath(), this._attachComponent(t), this._clipPath = t, this.markRedraw();
  }, n.prototype.removeClipPath = function() {
    var t = this._clipPath;
    t && (this._detachComponent(t), this._clipPath = null, this.markRedraw());
  }, n.prototype.getTextContent = function() {
    return this._textContent;
  }, n.prototype.setTextContent = function(t) {
    var e = this._textContent;
    e !== t && (e && e !== t && this.removeTextContent(), t.innerTransformable = new mh(), this._attachComponent(t), this._textContent = t, this.markRedraw());
  }, n.prototype.setTextConfig = function(t) {
    this.textConfig || (this.textConfig = {}), R(this.textConfig, t), this.markRedraw();
  }, n.prototype.removeTextConfig = function() {
    this.textConfig = null, this.markRedraw();
  }, n.prototype.removeTextContent = function() {
    var t = this._textContent;
    t && (t.innerTransformable = null, this._detachComponent(t), this._textContent = null, this._innerTextDefaultStyle = null, this.markRedraw());
  }, n.prototype.getTextGuideLine = function() {
    return this._textGuide;
  }, n.prototype.setTextGuideLine = function(t) {
    this._textGuide && this._textGuide !== t && this.removeTextGuideLine(), this._attachComponent(t), this._textGuide = t, this.markRedraw();
  }, n.prototype.removeTextGuideLine = function() {
    var t = this._textGuide;
    t && (this._detachComponent(t), this._textGuide = null, this.markRedraw());
  }, n.prototype.markRedraw = function() {
    this.__dirty |= Ut;
    var t = this.__zr;
    t && (this.__inHover ? t.refreshHover() : t.refresh()), this.__hostTarget && this.__hostTarget.markRedraw();
  }, n.prototype.dirty = function() {
    this.markRedraw();
  }, n.prototype._toggleHoverLayerFlag = function(t) {
    this.__inHover = t;
    var e = this._textContent, i = this._textGuide;
    e && (e.__inHover = t), i && (i.__inHover = t);
  }, n.prototype.addSelfToZr = function(t) {
    if (this.__zr !== t) {
      this.__zr = t;
      var e = this.animators;
      if (e)
        for (var i = 0; i < e.length; i++)
          t.animation.addAnimator(e[i]);
      this._clipPath && this._clipPath.addSelfToZr(t), this._textContent && this._textContent.addSelfToZr(t), this._textGuide && this._textGuide.addSelfToZr(t);
    }
  }, n.prototype.removeSelfFromZr = function(t) {
    if (this.__zr) {
      this.__zr = null;
      var e = this.animators;
      if (e)
        for (var i = 0; i < e.length; i++)
          t.animation.removeAnimator(e[i]);
      this._clipPath && this._clipPath.removeSelfFromZr(t), this._textContent && this._textContent.removeSelfFromZr(t), this._textGuide && this._textGuide.removeSelfFromZr(t);
    }
  }, n.prototype.animate = function(t, e, i) {
    var s = t ? this[t] : this, r = new Cg(s, e, i);
    return t && (r.targetName = t), this.addAnimator(r, t), r;
  }, n.prototype.addAnimator = function(t, e) {
    var i = this.__zr, s = this;
    t.during(function() {
      s.updateDuringAnimation(e);
    }).done(function() {
      var r = s.animators, o = Tt(r, t);
      o >= 0 && r.splice(o, 1);
    }), this.animators.push(t), i && i.animation.addAnimator(t), i && i.wakeUp();
  }, n.prototype.updateDuringAnimation = function(t) {
    this.markRedraw();
  }, n.prototype.stopAnimation = function(t, e) {
    for (var i = this.animators, s = i.length, r = [], o = 0; o < s; o++) {
      var a = i[o];
      !t || t === a.scope ? a.stop(e) : r.push(a);
    }
    return this.animators = r, this;
  }, n.prototype.animateTo = function(t, e, i) {
    Wa(this, t, e, i);
  }, n.prototype.animateFrom = function(t, e, i) {
    Wa(this, t, e, i, !0);
  }, n.prototype._transitionState = function(t, e, i, s) {
    for (var r = Wa(this, e, i, s), o = 0; o < r.length; o++)
      r[o].__fromStateTransition = t;
  }, n.prototype.getBoundingRect = function() {
    return null;
  }, n.prototype.getPaintRect = function() {
    return null;
  }, n.initDefaultProps = (function() {
    var t = n.prototype;
    t.type = "element", t.name = "", t.ignore = t.silent = t.isGroup = t.draggable = t.dragging = t.ignoreClip = t.__inHover = !1, t.__dirty = Ut;
    function e(i, s, r, o) {
      Object.defineProperty(t, i, {
        get: function() {
          if (!this[s]) {
            var l = this[s] = [];
            a(this, l);
          }
          return this[s];
        },
        set: function(l) {
          this[r] = l[0], this[o] = l[1], this[s] = l, a(this, l);
        }
      });
      function a(l, c) {
        Object.defineProperty(c, 0, {
          get: function() {
            return l[r];
          },
          set: function(h) {
            l[r] = h;
          }
        }), Object.defineProperty(c, 1, {
          get: function() {
            return l[o];
          },
          set: function(h) {
            l[o] = h;
          }
        });
      }
    }
    Object.defineProperty && (e("position", "_legacyPos", "x", "y"), e("scale", "_legacyScale", "scaleX", "scaleY"), e("origin", "_legacyOrigin", "originX", "originY"));
  })(), n;
})();
Fi(vh, Dg);
Fi(vh, mh);
function Wa(n, t, e, i, s) {
  e = e || {};
  var r = [];
  Ag(n, "", n, t, e, i, r, s);
  var o = r.length, a = !1, l = e.done, c = e.aborted, h = function() {
    a = !0, o--, o <= 0 && (a ? l && l() : c && c());
  }, u = function() {
    o--, o <= 0 && (a ? l && l() : c && c());
  };
  o || l && l(), r.length > 0 && e.during && r[0].during(function(p, _) {
    e.during(_);
  });
  for (var f = 0; f < r.length; f++) {
    var d = r[f];
    h && d.done(h), u && d.aborted(u), e.force && d.duration(e.duration), d.start(e.easing);
  }
  return r;
}
function Ua(n, t, e) {
  for (var i = 0; i < e; i++)
    n[i] = t[i];
}
function jv(n) {
  return Xt(n[0]);
}
function Qv(n, t, e) {
  if (Xt(t[e]))
    if (Xt(n[e]) || (n[e] = []), Am(t[e])) {
      var i = t[e].length;
      n[e].length !== i && (n[e] = new t[e].constructor(i), Ua(n[e], t[e], i));
    } else {
      var s = t[e], r = n[e], o = s.length;
      if (jv(s))
        for (var a = s[0].length, l = 0; l < o; l++)
          r[l] ? Ua(r[l], s[l], a) : r[l] = Array.prototype.slice.call(s[l]);
      else
        Ua(r, s, o);
      r.length = s.length;
    }
  else
    n[e] = t[e];
}
function Jv(n, t) {
  return n === t || Xt(n) && Xt(t) && tx(n, t);
}
function tx(n, t) {
  var e = n.length;
  if (e !== t.length)
    return !1;
  for (var i = 0; i < e; i++)
    if (n[i] !== t[i])
      return !1;
  return !0;
}
function Ag(n, t, e, i, s, r, o, a) {
  for (var l = mt(i), c = s.duration, h = s.delay, u = s.additive, f = s.setToFinal, d = !se(r), p = n.animators, _ = [], g = 0; g < l.length; g++) {
    var m = l[g], y = i[m];
    if (y != null && e[m] != null && (d || r[m]))
      if (se(y) && !Xt(y) && !ga(y)) {
        if (t) {
          a || (e[m] = y, n.updateDuringAnimation(t));
          continue;
        }
        Ag(n, m, e[m], y, s, r && r[m], o, a);
      } else
        _.push(m);
    else a || (e[m] = y, n.updateDuringAnimation(t), _.push(m));
  }
  var v = _.length;
  if (!u && v)
    for (var S = 0; S < p.length; S++) {
      var w = p[S];
      if (w.targetName === t) {
        var x = w.stopTracks(_);
        if (x) {
          var M = Tt(p, w);
          p.splice(M, 1);
        }
      }
    }
  if (s.force || (_ = po(_, function(C) {
    return !Jv(i[C], e[C]);
  }), v = _.length), v > 0 || s.force && !o.length) {
    var b = void 0, T = void 0, I = void 0;
    if (a) {
      T = {}, f && (b = {});
      for (var S = 0; S < v; S++) {
        var m = _[S];
        T[m] = e[m], f ? b[m] = i[m] : e[m] = i[m];
      }
    } else if (f) {
      I = {};
      for (var S = 0; S < v; S++) {
        var m = _[S];
        I[m] = bs(e[m]), Qv(e, i, m);
      }
    }
    var w = new Cg(e, !1, !1, u ? po(p, function(E) {
      return E.targetName === t;
    }) : null);
    w.targetName = t, s.scope && (w.scope = s.scope), f && b && w.whenWithKeys(0, b, _), I && w.whenWithKeys(0, I, _), w.whenWithKeys(c == null ? 500 : c, a ? T : i, _).delay(h || 0), n.addAnimator(w, t), o.push(w);
  }
}
var nc = "__zr_style_" + Math.round(Math.random() * 10), Hn = {
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  shadowColor: "#000",
  opacity: 1,
  blend: "source-over"
}, xh = {
  style: {
    shadowBlur: !0,
    shadowOffsetX: !0,
    shadowOffsetY: !0,
    shadowColor: !0,
    opacity: !0
  }
};
Hn[nc] = !0;
var ef = ["z", "z2", "invisible"], ex = ["invisible"], wh = (function(n) {
  Xn(t, n);
  function t(e) {
    return n.call(this, e) || this;
  }
  return t.prototype._init = function(e) {
    for (var i = mt(e), s = 0; s < i.length; s++) {
      var r = i[s];
      r === "style" ? this.useStyle(e[r]) : n.prototype.attrKV.call(this, r, e[r]);
    }
    this.style || this.useStyle({});
  }, t.prototype.beforeBrush = function() {
  }, t.prototype.afterBrush = function() {
  }, t.prototype.innerBeforeBrush = function() {
  }, t.prototype.innerAfterBrush = function() {
  }, t.prototype.shouldBePainted = function(e, i, s, r) {
    var o = this.transform;
    if (this.ignore || this.invisible || this.style.opacity === 0 || this.culling && nx(this, e, i) || o && !o[0] && !o[3])
      return !1;
    if (s && this.__clipPaths) {
      for (var a = 0; a < this.__clipPaths.length; ++a)
        if (this.__clipPaths[a].isZeroArea())
          return !1;
    }
    if (r && this.parent)
      for (var l = this.parent; l; ) {
        if (l.ignore)
          return !1;
        l = l.parent;
      }
    return !0;
  }, t.prototype.contain = function(e, i) {
    return this.rectContain(e, i);
  }, t.prototype.traverse = function(e, i) {
    e.call(i, this);
  }, t.prototype.rectContain = function(e, i) {
    var s = this.transformCoordToLocal(e, i), r = this.getBoundingRect();
    return r.contain(s[0], s[1]);
  }, t.prototype.getPaintRect = function() {
    var e = this._paintRect;
    if (!this._paintRect || this.__dirty) {
      var i = this.transform, s = this.getBoundingRect(), r = this.style, o = r.shadowBlur || 0, a = r.shadowOffsetX || 0, l = r.shadowOffsetY || 0;
      e = this._paintRect || (this._paintRect = new _t(0, 0, 0, 0)), i ? _t.applyTransform(e, s, i) : e.copy(s), (o || a || l) && (e.width += o * 2 + Math.abs(a), e.height += o * 2 + Math.abs(l), e.x = Math.min(e.x, e.x + a - o), e.y = Math.min(e.y, e.y + l - o));
      var c = this.dirtyRectTolerance;
      e.isZero() || (e.x = Math.floor(e.x - c), e.y = Math.floor(e.y - c), e.width = Math.ceil(e.width + 1 + c * 2), e.height = Math.ceil(e.height + 1 + c * 2));
    }
    return e;
  }, t.prototype.setPrevPaintRect = function(e) {
    e ? (this._prevPaintRect = this._prevPaintRect || new _t(0, 0, 0, 0), this._prevPaintRect.copy(e)) : this._prevPaintRect = null;
  }, t.prototype.getPrevPaintRect = function() {
    return this._prevPaintRect;
  }, t.prototype.animateStyle = function(e) {
    return this.animate("style", e);
  }, t.prototype.updateDuringAnimation = function(e) {
    e === "style" ? this.dirtyStyle() : this.markRedraw();
  }, t.prototype.attrKV = function(e, i) {
    e !== "style" ? n.prototype.attrKV.call(this, e, i) : this.style ? this.setStyle(i) : this.useStyle(i);
  }, t.prototype.setStyle = function(e, i) {
    return typeof e == "string" ? this.style[e] = i : R(this.style, e), this.dirtyStyle(), this;
  }, t.prototype.dirtyStyle = function(e) {
    e || this.markRedraw(), this.__dirty |= cs, this._rect && (this._rect = null);
  }, t.prototype.dirty = function() {
    this.dirtyStyle();
  }, t.prototype.styleChanged = function() {
    return !!(this.__dirty & cs);
  }, t.prototype.styleUpdated = function() {
    this.__dirty &= ~cs;
  }, t.prototype.createStyle = function(e) {
    return _a(Hn, e);
  }, t.prototype.useStyle = function(e) {
    e[nc] || (e = this.createStyle(e)), this.__inHover ? this.__hoverStyle = e : this.style = e, this.dirtyStyle();
  }, t.prototype.isStyleObject = function(e) {
    return e[nc];
  }, t.prototype._innerSaveToNormal = function(e) {
    n.prototype._innerSaveToNormal.call(this, e);
    var i = this._normalState;
    e.style && !i.style && (i.style = this._mergeStyle(this.createStyle(), this.style)), this._savePrimaryToNormal(e, i, ef);
  }, t.prototype._applyStateObj = function(e, i, s, r, o, a) {
    n.prototype._applyStateObj.call(this, e, i, s, r, o, a);
    var l = !(i && r), c;
    if (i && i.style ? o ? r ? c = i.style : (c = this._mergeStyle(this.createStyle(), s.style), this._mergeStyle(c, i.style)) : (c = this._mergeStyle(this.createStyle(), r ? this.style : s.style), this._mergeStyle(c, i.style)) : l && (c = s.style), c)
      if (o) {
        var h = this.style;
        if (this.style = this.createStyle(l ? {} : h), l)
          for (var u = mt(h), f = 0; f < u.length; f++) {
            var d = u[f];
            d in c && (c[d] = c[d], this.style[d] = h[d]);
          }
        for (var p = mt(c), f = 0; f < p.length; f++) {
          var d = p[f];
          this.style[d] = this.style[d];
        }
        this._transitionState(e, {
          style: c
        }, a, this.getAnimationStyleProps());
      } else
        this.useStyle(c);
    for (var _ = this.__inHover ? ex : ef, f = 0; f < _.length; f++) {
      var d = _[f];
      i && i[d] != null ? this[d] = i[d] : l && s[d] != null && (this[d] = s[d]);
    }
  }, t.prototype._mergeStates = function(e) {
    for (var i = n.prototype._mergeStates.call(this, e), s, r = 0; r < e.length; r++) {
      var o = e[r];
      o.style && (s = s || {}, this._mergeStyle(s, o.style));
    }
    return s && (i.style = s), i;
  }, t.prototype._mergeStyle = function(e, i) {
    return R(e, i), e;
  }, t.prototype.getAnimationStyleProps = function() {
    return xh;
  }, t.initDefaultProps = (function() {
    var e = t.prototype;
    e.type = "displayable", e.invisible = !1, e.z = 0, e.z2 = 0, e.zlevel = 0, e.culling = !1, e.cursor = "pointer", e.rectHover = !1, e.incremental = !1, e._rect = null, e.dirtyRectTolerance = 0, e.__dirty = Ut | cs;
  })(), t;
})(vh), Va = new _t(0, 0, 0, 0), qa = new _t(0, 0, 0, 0);
function nx(n, t, e) {
  return Va.copy(n.getBoundingRect()), n.transform && Va.applyTransform(n.transform), qa.width = t, qa.height = e, !Va.intersect(qa);
}
var zt = Math.min, Bt = Math.max, Xa = Math.sin, Za = Math.cos, xn = Math.PI * 2, Cr = zi(), Dr = zi(), Ir = zi();
function nf(n, t, e, i, s, r) {
  s[0] = zt(n, e), s[1] = zt(t, i), r[0] = Bt(n, e), r[1] = Bt(t, i);
}
var sf = [], rf = [];
function ix(n, t, e, i, s, r, o, a, l, c) {
  var h = xg, u = St, f = h(n, e, s, o, sf);
  l[0] = 1 / 0, l[1] = 1 / 0, c[0] = -1 / 0, c[1] = -1 / 0;
  for (var d = 0; d < f; d++) {
    var p = u(n, e, s, o, sf[d]);
    l[0] = zt(p, l[0]), c[0] = Bt(p, c[0]);
  }
  f = h(t, i, r, a, rf);
  for (var d = 0; d < f; d++) {
    var _ = u(t, i, r, a, rf[d]);
    l[1] = zt(_, l[1]), c[1] = Bt(_, c[1]);
  }
  l[0] = zt(n, l[0]), c[0] = Bt(n, c[0]), l[0] = zt(o, l[0]), c[0] = Bt(o, c[0]), l[1] = zt(t, l[1]), c[1] = Bt(t, c[1]), l[1] = zt(a, l[1]), c[1] = Bt(a, c[1]);
}
function sx(n, t, e, i, s, r, o, a) {
  var l = wg, c = Nt, h = Bt(zt(l(n, e, s), 1), 0), u = Bt(zt(l(t, i, r), 1), 0), f = c(n, e, s, h), d = c(t, i, r, u);
  o[0] = zt(n, s, f), o[1] = zt(t, r, d), a[0] = Bt(n, s, f), a[1] = Bt(t, r, d);
}
function rx(n, t, e, i, s, r, o, a, l) {
  var c = gg, h = _g, u = Math.abs(s - r);
  if (u % xn < 1e-4 && u > 1e-4) {
    a[0] = n - e, a[1] = t - i, l[0] = n + e, l[1] = t + i;
    return;
  }
  if (Cr[0] = Za(s) * e + n, Cr[1] = Xa(s) * i + t, Dr[0] = Za(r) * e + n, Dr[1] = Xa(r) * i + t, c(a, Cr, Dr), h(l, Cr, Dr), s = s % xn, s < 0 && (s = s + xn), r = r % xn, r < 0 && (r = r + xn), s > r && !o ? r += xn : s < r && o && (s += xn), o) {
    var f = r;
    r = s, s = f;
  }
  for (var d = 0; d < r; d += Math.PI / 2)
    d > s && (Ir[0] = Za(d) * e + n, Ir[1] = Xa(d) * i + t, c(a, Ir, a), h(l, Ir, l));
}
var z = {
  M: 1,
  L: 2,
  C: 3,
  Q: 4,
  A: 5,
  Z: 6,
  R: 7
}, wn = [], Sn = [], ue = [], We = [], fe = [], de = [], Ka = Math.min, ja = Math.max, bn = Math.cos, Tn = Math.sin, Re = Math.abs, ic = Math.PI, Ze = ic * 2, Qa = typeof Float32Array != "undefined", Ki = [];
function Ja(n) {
  var t = Math.round(n / ic * 1e8) / 1e8;
  return t % 2 * ic;
}
function ox(n, t) {
  var e = Ja(n[0]);
  e < 0 && (e += Ze);
  var i = e - n[0], s = n[1];
  s += i, !t && s - e >= Ze ? s = e + Ze : t && e - s >= Ze ? s = e - Ze : !t && e > s ? s = e + (Ze - Ja(e - s)) : t && e < s && (s = e - (Ze - Ja(s - e))), n[0] = e, n[1] = s;
}
var Li = (function() {
  function n(t) {
    this.dpr = 1, this._xi = 0, this._yi = 0, this._x0 = 0, this._y0 = 0, this._len = 0, t && (this._saveData = !1), this._saveData && (this.data = []);
  }
  return n.prototype.increaseVersion = function() {
    this._version++;
  }, n.prototype.getVersion = function() {
    return this._version;
  }, n.prototype.setScale = function(t, e, i) {
    i = i || 0, i > 0 && (this._ux = Re(i / To / t) || 0, this._uy = Re(i / To / e) || 0);
  }, n.prototype.setDPR = function(t) {
    this.dpr = t;
  }, n.prototype.setContext = function(t) {
    this._ctx = t;
  }, n.prototype.getContext = function() {
    return this._ctx;
  }, n.prototype.beginPath = function() {
    return this._ctx && this._ctx.beginPath(), this.reset(), this;
  }, n.prototype.reset = function() {
    this._saveData && (this._len = 0), this._pathSegLen && (this._pathSegLen = null, this._pathLen = 0), this._version++;
  }, n.prototype.moveTo = function(t, e) {
    return this._drawPendingPt(), this.addData(z.M, t, e), this._ctx && this._ctx.moveTo(t, e), this._x0 = t, this._y0 = e, this._xi = t, this._yi = e, this;
  }, n.prototype.lineTo = function(t, e) {
    var i = Re(t - this._xi), s = Re(e - this._yi), r = i > this._ux || s > this._uy;
    if (this.addData(z.L, t, e), this._ctx && r && this._ctx.lineTo(t, e), r)
      this._xi = t, this._yi = e, this._pendingPtDist = 0;
    else {
      var o = i * i + s * s;
      o > this._pendingPtDist && (this._pendingPtX = t, this._pendingPtY = e, this._pendingPtDist = o);
    }
    return this;
  }, n.prototype.bezierCurveTo = function(t, e, i, s, r, o) {
    return this._drawPendingPt(), this.addData(z.C, t, e, i, s, r, o), this._ctx && this._ctx.bezierCurveTo(t, e, i, s, r, o), this._xi = r, this._yi = o, this;
  }, n.prototype.quadraticCurveTo = function(t, e, i, s) {
    return this._drawPendingPt(), this.addData(z.Q, t, e, i, s), this._ctx && this._ctx.quadraticCurveTo(t, e, i, s), this._xi = i, this._yi = s, this;
  }, n.prototype.arc = function(t, e, i, s, r, o) {
    this._drawPendingPt(), Ki[0] = s, Ki[1] = r, ox(Ki, o), s = Ki[0], r = Ki[1];
    var a = r - s;
    return this.addData(z.A, t, e, i, i, s, a, 0, o ? 0 : 1), this._ctx && this._ctx.arc(t, e, i, s, r, o), this._xi = bn(r) * i + t, this._yi = Tn(r) * i + e, this;
  }, n.prototype.arcTo = function(t, e, i, s, r) {
    return this._drawPendingPt(), this._ctx && this._ctx.arcTo(t, e, i, s, r), this;
  }, n.prototype.rect = function(t, e, i, s) {
    return this._drawPendingPt(), this._ctx && this._ctx.rect(t, e, i, s), this.addData(z.R, t, e, i, s), this;
  }, n.prototype.closePath = function() {
    this._drawPendingPt(), this.addData(z.Z);
    var t = this._ctx, e = this._x0, i = this._y0;
    return t && t.closePath(), this._xi = e, this._yi = i, this;
  }, n.prototype.fill = function(t) {
    t && t.fill(), this.toStatic();
  }, n.prototype.stroke = function(t) {
    t && t.stroke(), this.toStatic();
  }, n.prototype.len = function() {
    return this._len;
  }, n.prototype.setData = function(t) {
    var e = t.length;
    !(this.data && this.data.length === e) && Qa && (this.data = new Float32Array(e));
    for (var i = 0; i < e; i++)
      this.data[i] = t[i];
    this._len = e;
  }, n.prototype.appendPath = function(t) {
    t instanceof Array || (t = [t]);
    for (var e = t.length, i = 0, s = this._len, r = 0; r < e; r++)
      i += t[r].len();
    Qa && this.data instanceof Float32Array && (this.data = new Float32Array(s + i));
    for (var r = 0; r < e; r++)
      for (var o = t[r].data, a = 0; a < o.length; a++)
        this.data[s++] = o[a];
    this._len = s;
  }, n.prototype.addData = function(t, e, i, s, r, o, a, l, c) {
    if (this._saveData) {
      var h = this.data;
      this._len + arguments.length > h.length && (this._expandData(), h = this.data);
      for (var u = 0; u < arguments.length; u++)
        h[this._len++] = arguments[u];
    }
  }, n.prototype._drawPendingPt = function() {
    this._pendingPtDist > 0 && (this._ctx && this._ctx.lineTo(this._pendingPtX, this._pendingPtY), this._pendingPtDist = 0);
  }, n.prototype._expandData = function() {
    if (!(this.data instanceof Array)) {
      for (var t = [], e = 0; e < this._len; e++)
        t[e] = this.data[e];
      this.data = t;
    }
  }, n.prototype.toStatic = function() {
    if (this._saveData) {
      this._drawPendingPt();
      var t = this.data;
      t instanceof Array && (t.length = this._len, Qa && this._len > 11 && (this.data = new Float32Array(t)));
    }
  }, n.prototype.getBoundingRect = function() {
    ue[0] = ue[1] = fe[0] = fe[1] = Number.MAX_VALUE, We[0] = We[1] = de[0] = de[1] = -Number.MAX_VALUE;
    var t = this.data, e = 0, i = 0, s = 0, r = 0, o;
    for (o = 0; o < this._len; ) {
      var a = t[o++], l = o === 1;
      switch (l && (e = t[o], i = t[o + 1], s = e, r = i), a) {
        case z.M:
          e = s = t[o++], i = r = t[o++], fe[0] = s, fe[1] = r, de[0] = s, de[1] = r;
          break;
        case z.L:
          nf(e, i, t[o], t[o + 1], fe, de), e = t[o++], i = t[o++];
          break;
        case z.C:
          ix(e, i, t[o++], t[o++], t[o++], t[o++], t[o], t[o + 1], fe, de), e = t[o++], i = t[o++];
          break;
        case z.Q:
          sx(e, i, t[o++], t[o++], t[o], t[o + 1], fe, de), e = t[o++], i = t[o++];
          break;
        case z.A:
          var c = t[o++], h = t[o++], u = t[o++], f = t[o++], d = t[o++], p = t[o++] + d;
          o += 1;
          var _ = !t[o++];
          l && (s = bn(d) * u + c, r = Tn(d) * f + h), rx(c, h, u, f, d, p, _, fe, de), e = bn(p) * u + c, i = Tn(p) * f + h;
          break;
        case z.R:
          s = e = t[o++], r = i = t[o++];
          var g = t[o++], m = t[o++];
          nf(s, r, s + g, r + m, fe, de);
          break;
        case z.Z:
          e = s, i = r;
          break;
      }
      gg(ue, ue, fe), _g(We, We, de);
    }
    return o === 0 && (ue[0] = ue[1] = We[0] = We[1] = 0), new _t(ue[0], ue[1], We[0] - ue[0], We[1] - ue[1]);
  }, n.prototype._calculateLength = function() {
    var t = this.data, e = this._len, i = this._ux, s = this._uy, r = 0, o = 0, a = 0, l = 0;
    this._pathSegLen || (this._pathSegLen = []);
    for (var c = this._pathSegLen, h = 0, u = 0, f = 0; f < e; ) {
      var d = t[f++], p = f === 1;
      p && (r = t[f], o = t[f + 1], a = r, l = o);
      var _ = -1;
      switch (d) {
        case z.M:
          r = a = t[f++], o = l = t[f++];
          break;
        case z.L: {
          var g = t[f++], m = t[f++], y = g - r, v = m - o;
          (Re(y) > i || Re(v) > s || f === e - 1) && (_ = Math.sqrt(y * y + v * v), r = g, o = m);
          break;
        }
        case z.C: {
          var S = t[f++], w = t[f++], g = t[f++], m = t[f++], x = t[f++], M = t[f++];
          _ = Mv(r, o, S, w, g, m, x, M, 10), r = x, o = M;
          break;
        }
        case z.Q: {
          var S = t[f++], w = t[f++], g = t[f++], m = t[f++];
          _ = Iv(r, o, S, w, g, m, 10), r = g, o = m;
          break;
        }
        case z.A:
          var b = t[f++], T = t[f++], I = t[f++], C = t[f++], E = t[f++], A = t[f++], L = A + E;
          f += 1, t[f++], p && (a = bn(E) * I + b, l = Tn(E) * C + T), _ = ja(I, C) * Ka(Ze, Math.abs(A)), r = bn(L) * I + b, o = Tn(L) * C + T;
          break;
        case z.R: {
          a = r = t[f++], l = o = t[f++];
          var W = t[f++], G = t[f++];
          _ = W * 2 + G * 2;
          break;
        }
        case z.Z: {
          var y = a - r, v = l - o;
          _ = Math.sqrt(y * y + v * v), r = a, o = l;
          break;
        }
      }
      _ >= 0 && (c[u++] = _, h += _);
    }
    return this._pathLen = h, h;
  }, n.prototype.rebuildPath = function(t, e) {
    var i = this.data, s = this._ux, r = this._uy, o = this._len, a, l, c, h, u, f, d = e < 1, p, _, g = 0, m = 0, y, v = 0, S, w;
    if (!(d && (this._pathSegLen || this._calculateLength(), p = this._pathSegLen, _ = this._pathLen, y = e * _, !y)))
      t: for (var x = 0; x < o; ) {
        var M = i[x++], b = x === 1;
        switch (b && (c = i[x], h = i[x + 1], a = c, l = h), M !== z.L && v > 0 && (t.lineTo(S, w), v = 0), M) {
          case z.M:
            a = c = i[x++], l = h = i[x++], t.moveTo(c, h);
            break;
          case z.L: {
            u = i[x++], f = i[x++];
            var T = Re(u - c), I = Re(f - h);
            if (T > s || I > r) {
              if (d) {
                var C = p[m++];
                if (g + C > y) {
                  var E = (y - g) / C;
                  t.lineTo(c * (1 - E) + u * E, h * (1 - E) + f * E);
                  break t;
                }
                g += C;
              }
              t.lineTo(u, f), c = u, h = f, v = 0;
            } else {
              var A = T * T + I * I;
              A > v && (S = u, w = f, v = A);
            }
            break;
          }
          case z.C: {
            var L = i[x++], W = i[x++], G = i[x++], rt = i[x++], le = i[x++], j = i[x++];
            if (d) {
              var C = p[m++];
              if (g + C > y) {
                var E = (y - g) / C;
                Wu(c, L, G, le, E, wn), Wu(h, W, rt, j, E, Sn), t.bezierCurveTo(wn[1], Sn[1], wn[2], Sn[2], wn[3], Sn[3]);
                break t;
              }
              g += C;
            }
            t.bezierCurveTo(L, W, G, rt, le, j), c = le, h = j;
            break;
          }
          case z.Q: {
            var L = i[x++], W = i[x++], G = i[x++], rt = i[x++];
            if (d) {
              var C = p[m++];
              if (g + C > y) {
                var E = (y - g) / C;
                Uu(c, L, G, E, wn), Uu(h, W, rt, E, Sn), t.quadraticCurveTo(wn[1], Sn[1], wn[2], Sn[2]);
                break t;
              }
              g += C;
            }
            t.quadraticCurveTo(L, W, G, rt), c = G, h = rt;
            break;
          }
          case z.A:
            var It = i[x++], nt = i[x++], dt = i[x++], $ = i[x++], k = i[x++], it = i[x++], xt = i[x++], ce = !i[x++], He = dt > $ ? dt : $, Gi = Re(dt - $) > 1e-3, Ge = k + it, Uh = !1;
            if (d) {
              var C = p[m++];
              g + C > y && (Ge = k + it * (y - g) / C, Uh = !0), g += C;
            }
            if (Gi && t.ellipse ? t.ellipse(It, nt, dt, $, xt, k, Ge, ce) : t.arc(It, nt, He, k, Ge, ce), Uh)
              break t;
            b && (a = bn(k) * dt + It, l = Tn(k) * $ + nt), c = bn(Ge) * dt + It, h = Tn(Ge) * $ + nt;
            break;
          case z.R:
            a = c = i[x], l = h = i[x + 1], u = i[x++], f = i[x++];
            var Kn = i[x++], Yi = i[x++];
            if (d) {
              var C = p[m++];
              if (g + C > y) {
                var he = y - g;
                t.moveTo(u, f), t.lineTo(u + Ka(he, Kn), f), he -= Kn, he > 0 && t.lineTo(u + Kn, f + Ka(he, Yi)), he -= Yi, he > 0 && t.lineTo(u + ja(Kn - he, 0), f + Yi), he -= Kn, he > 0 && t.lineTo(u, f + ja(Yi - he, 0));
                break t;
              }
              g += C;
            }
            t.rect(u, f, Kn, Yi);
            break;
          case z.Z:
            if (d) {
              var C = p[m++];
              if (g + C > y) {
                var E = (y - g) / C;
                t.lineTo(c * (1 - E) + a * E, h * (1 - E) + l * E);
                break t;
              }
              g += C;
            }
            t.closePath(), c = a, h = l;
        }
      }
  }, n.prototype.clone = function() {
    var t = new n(), e = this.data;
    return t.data = e.slice ? e.slice() : Array.prototype.slice.call(e), t._len = this._len, t;
  }, n.CMD = z, n.initDefaultProps = (function() {
    var t = n.prototype;
    t._saveData = !0, t._ux = 0, t._uy = 0, t._pendingPtDist = 0, t._version = 0;
  })(), n;
})();
function ni(n, t, e, i, s, r, o) {
  if (s === 0)
    return !1;
  var a = s, l = 0, c = n;
  if (o > t + a && o > i + a || o < t - a && o < i - a || r > n + a && r > e + a || r < n - a && r < e - a)
    return !1;
  if (n !== e)
    l = (t - i) / (n - e), c = (n * i - e * t) / (n - e);
  else
    return Math.abs(r - n) <= a / 2;
  var h = l * r - o + c, u = h * h / (l * l + 1);
  return u <= a / 2 * a / 2;
}
function ax(n, t, e, i, s, r, o, a, l, c, h) {
  if (l === 0)
    return !1;
  var u = l;
  if (h > t + u && h > i + u && h > r + u && h > a + u || h < t - u && h < i - u && h < r - u && h < a - u || c > n + u && c > e + u && c > s + u && c > o + u || c < n - u && c < e - u && c < s - u && c < o - u)
    return !1;
  var f = Tv(n, t, e, i, s, r, o, a, c, h);
  return f <= u / 2;
}
function lx(n, t, e, i, s, r, o, a, l) {
  if (o === 0)
    return !1;
  var c = o;
  if (l > t + c && l > i + c && l > r + c || l < t - c && l < i - c && l < r - c || a > n + c && a > e + c && a > s + c || a < n - c && a < e - c && a < s - c)
    return !1;
  var h = Dv(n, t, e, i, s, r, a, l);
  return h <= c / 2;
}
var of = Math.PI * 2;
function Er(n) {
  return n %= of, n < 0 && (n += of), n;
}
var ji = Math.PI * 2;
function cx(n, t, e, i, s, r, o, a, l) {
  if (o === 0)
    return !1;
  var c = o;
  a -= n, l -= t;
  var h = Math.sqrt(a * a + l * l);
  if (h - c > e || h + c < e)
    return !1;
  if (Math.abs(i - s) % ji < 1e-4)
    return !0;
  if (r) {
    var u = i;
    i = Er(s), s = Er(u);
  } else
    i = Er(i), s = Er(s);
  i > s && (s += ji);
  var f = Math.atan2(l, a);
  return f < 0 && (f += ji), f >= i && f <= s || f + ji >= i && f + ji <= s;
}
function Mn(n, t, e, i, s, r) {
  if (r > t && r > i || r < t && r < i || i === t)
    return 0;
  var o = (r - t) / (i - t), a = i < t ? 1 : -1;
  (o === 1 || o === 0) && (a = i < t ? 0.5 : -0.5);
  var l = o * (e - n) + n;
  return l === s ? 1 / 0 : l > s ? a : 0;
}
var Ue = Li.CMD, Cn = Math.PI * 2, hx = 1e-4;
function ux(n, t) {
  return Math.abs(n - t) < hx;
}
var ct = [-1, -1, -1], kt = [-1, -1];
function fx() {
  var n = kt[0];
  kt[0] = kt[1], kt[1] = n;
}
function dx(n, t, e, i, s, r, o, a, l, c) {
  if (c > t && c > i && c > r && c > a || c < t && c < i && c < r && c < a)
    return 0;
  var h = vg(t, i, r, a, c, ct);
  if (h === 0)
    return 0;
  for (var u = 0, f = -1, d = void 0, p = void 0, _ = 0; _ < h; _++) {
    var g = ct[_], m = g === 0 || g === 1 ? 0.5 : 1, y = St(n, e, s, o, g);
    y < l || (f < 0 && (f = xg(t, i, r, a, kt), kt[1] < kt[0] && f > 1 && fx(), d = St(t, i, r, a, kt[0]), f > 1 && (p = St(t, i, r, a, kt[1]))), f === 2 ? g < kt[0] ? u += d < t ? m : -m : g < kt[1] ? u += p < d ? m : -m : u += a < p ? m : -m : g < kt[0] ? u += d < t ? m : -m : u += a < d ? m : -m);
  }
  return u;
}
function px(n, t, e, i, s, r, o, a) {
  if (a > t && a > i && a > r || a < t && a < i && a < r)
    return 0;
  var l = Cv(t, i, r, a, ct);
  if (l === 0)
    return 0;
  var c = wg(t, i, r);
  if (c >= 0 && c <= 1) {
    for (var h = 0, u = Nt(t, i, r, c), f = 0; f < l; f++) {
      var d = ct[f] === 0 || ct[f] === 1 ? 0.5 : 1, p = Nt(n, e, s, ct[f]);
      p < o || (ct[f] < c ? h += u < t ? d : -d : h += r < u ? d : -d);
    }
    return h;
  } else {
    var d = ct[0] === 0 || ct[0] === 1 ? 0.5 : 1, p = Nt(n, e, s, ct[0]);
    return p < o ? 0 : r < t ? d : -d;
  }
}
function gx(n, t, e, i, s, r, o, a) {
  if (a -= t, a > e || a < -e)
    return 0;
  var l = Math.sqrt(e * e - a * a);
  ct[0] = -l, ct[1] = l;
  var c = Math.abs(i - s);
  if (c < 1e-4)
    return 0;
  if (c >= Cn - 1e-4) {
    i = 0, s = Cn;
    var h = r ? 1 : -1;
    return o >= ct[0] + n && o <= ct[1] + n ? h : 0;
  }
  if (i > s) {
    var u = i;
    i = s, s = u;
  }
  i < 0 && (i += Cn, s += Cn);
  for (var f = 0, d = 0; d < 2; d++) {
    var p = ct[d];
    if (p + n > o) {
      var _ = Math.atan2(a, p), h = r ? 1 : -1;
      _ < 0 && (_ = Cn + _), (_ >= i && _ <= s || _ + Cn >= i && _ + Cn <= s) && (_ > Math.PI / 2 && _ < Math.PI * 1.5 && (h = -h), f += h);
    }
  }
  return f;
}
function Lg(n, t, e, i, s) {
  for (var r = n.data, o = n.len(), a = 0, l = 0, c = 0, h = 0, u = 0, f, d, p = 0; p < o; ) {
    var _ = r[p++], g = p === 1;
    switch (_ === Ue.M && p > 1 && (e || (a += Mn(l, c, h, u, i, s))), g && (l = r[p], c = r[p + 1], h = l, u = c), _) {
      case Ue.M:
        h = r[p++], u = r[p++], l = h, c = u;
        break;
      case Ue.L:
        if (e) {
          if (ni(l, c, r[p], r[p + 1], t, i, s))
            return !0;
        } else
          a += Mn(l, c, r[p], r[p + 1], i, s) || 0;
        l = r[p++], c = r[p++];
        break;
      case Ue.C:
        if (e) {
          if (ax(l, c, r[p++], r[p++], r[p++], r[p++], r[p], r[p + 1], t, i, s))
            return !0;
        } else
          a += dx(l, c, r[p++], r[p++], r[p++], r[p++], r[p], r[p + 1], i, s) || 0;
        l = r[p++], c = r[p++];
        break;
      case Ue.Q:
        if (e) {
          if (lx(l, c, r[p++], r[p++], r[p], r[p + 1], t, i, s))
            return !0;
        } else
          a += px(l, c, r[p++], r[p++], r[p], r[p + 1], i, s) || 0;
        l = r[p++], c = r[p++];
        break;
      case Ue.A:
        var m = r[p++], y = r[p++], v = r[p++], S = r[p++], w = r[p++], x = r[p++];
        p += 1;
        var M = !!(1 - r[p++]);
        f = Math.cos(w) * v + m, d = Math.sin(w) * S + y, g ? (h = f, u = d) : a += Mn(l, c, f, d, i, s);
        var b = (i - m) * S / v + m;
        if (e) {
          if (cx(m, y, S, w, w + x, M, t, b, s))
            return !0;
        } else
          a += gx(m, y, S, w, w + x, M, b, s);
        l = Math.cos(w + x) * v + m, c = Math.sin(w + x) * S + y;
        break;
      case Ue.R:
        h = l = r[p++], u = c = r[p++];
        var T = r[p++], I = r[p++];
        if (f = h + T, d = u + I, e) {
          if (ni(h, u, f, u, t, i, s) || ni(f, u, f, d, t, i, s) || ni(f, d, h, d, t, i, s) || ni(h, d, h, u, t, i, s))
            return !0;
        } else
          a += Mn(f, u, f, d, i, s), a += Mn(h, d, h, u, i, s);
        break;
      case Ue.Z:
        if (e) {
          if (ni(l, c, h, u, t, i, s))
            return !0;
        } else
          a += Mn(l, c, h, u, i, s);
        l = h, c = u;
        break;
    }
  }
  return !e && !ux(c, u) && (a += Mn(l, c, h, u, i, s) || 0), a !== 0;
}
function _x(n, t, e) {
  return Lg(n, 0, !1, t, e);
}
function mx(n, t, e, i) {
  return Lg(n, t, !0, e, i);
}
var Pg = De({
  fill: "#000",
  stroke: null,
  strokePercent: 1,
  fillOpacity: 1,
  strokeOpacity: 1,
  lineDashOffset: 0,
  lineWidth: 1,
  lineCap: "butt",
  miterLimit: 10,
  strokeNoScale: !1,
  strokeFirst: !1
}, Hn), yx = {
  style: De({
    fill: !0,
    stroke: !0,
    strokePercent: !0,
    fillOpacity: !0,
    strokeOpacity: !0,
    lineDashOffset: !0,
    lineWidth: !0,
    miterLimit: !0
  }, xh.style)
}, tl = an.concat([
  "invisible",
  "culling",
  "z",
  "z2",
  "zlevel",
  "parent"
]), sc = (function(n) {
  Xn(t, n);
  function t(e) {
    return n.call(this, e) || this;
  }
  return t.prototype.update = function() {
    var e = this;
    n.prototype.update.call(this);
    var i = this.style;
    if (i.decal) {
      var s = this._decalEl = this._decalEl || new t();
      s.buildPath === t.prototype.buildPath && (s.buildPath = function(l) {
        e.buildPath(l, e.shape);
      }), s.silent = !0;
      var r = s.style;
      for (var o in i)
        r[o] !== i[o] && (r[o] = i[o]);
      r.fill = i.fill ? i.decal : null, r.decal = null, r.shadowColor = null, i.strokeFirst && (r.stroke = null);
      for (var a = 0; a < tl.length; ++a)
        s[tl[a]] = this[tl[a]];
      s.__dirty |= Ut;
    } else this._decalEl && (this._decalEl = null);
  }, t.prototype.getDecalElement = function() {
    return this._decalEl;
  }, t.prototype._init = function(e) {
    var i = mt(e);
    this.shape = this.getDefaultShape();
    var s = this.getDefaultStyle();
    s && this.useStyle(s);
    for (var r = 0; r < i.length; r++) {
      var o = i[r], a = e[o];
      o === "style" ? this.style ? R(this.style, a) : this.useStyle(a) : o === "shape" ? R(this.shape, a) : n.prototype.attrKV.call(this, o, a);
    }
    this.style || this.useStyle({});
  }, t.prototype.getDefaultStyle = function() {
    return null;
  }, t.prototype.getDefaultShape = function() {
    return {};
  }, t.prototype.canBeInsideText = function() {
    return this.hasFill();
  }, t.prototype.getInsideTextFill = function() {
    var e = this.style.fill;
    if (e !== "none") {
      if (qt(e)) {
        var i = Zu(e, 0);
        return i > 0.5 ? tc : i > 0.2 ? Xv : ec;
      } else if (e)
        return ec;
    }
    return tc;
  }, t.prototype.getInsideTextStroke = function(e) {
    var i = this.style.fill;
    if (qt(i)) {
      var s = this.__zr, r = !!(s && s.isDarkMode()), o = Zu(e, 0) < qv;
      if (r === o)
        return i;
    }
  }, t.prototype.buildPath = function(e, i, s) {
  }, t.prototype.pathUpdated = function() {
    this.__dirty &= ~fi;
  }, t.prototype.getUpdatedPathProxy = function(e) {
    return !this.path && this.createPathProxy(), this.path.beginPath(), this.buildPath(this.path, this.shape, e), this.path;
  }, t.prototype.createPathProxy = function() {
    this.path = new Li(!1);
  }, t.prototype.hasStroke = function() {
    var e = this.style, i = e.stroke;
    return !(i == null || i === "none" || !(e.lineWidth > 0));
  }, t.prototype.hasFill = function() {
    var e = this.style, i = e.fill;
    return i != null && i !== "none";
  }, t.prototype.getBoundingRect = function() {
    var e = this._rect, i = this.style, s = !e;
    if (s) {
      var r = !1;
      this.path || (r = !0, this.createPathProxy());
      var o = this.path;
      (r || this.__dirty & fi) && (o.beginPath(), this.buildPath(o, this.shape, !1), this.pathUpdated()), e = o.getBoundingRect();
    }
    if (this._rect = e, this.hasStroke() && this.path && this.path.len() > 0) {
      var a = this._rectStroke || (this._rectStroke = e.clone());
      if (this.__dirty || s) {
        a.copy(e);
        var l = i.strokeNoScale ? this.getLineScale() : 1, c = i.lineWidth;
        if (!this.hasFill()) {
          var h = this.strokeContainThreshold;
          c = Math.max(c, h == null ? 4 : h);
        }
        l > 1e-10 && (a.width += c / l, a.height += c / l, a.x -= c / l / 2, a.y -= c / l / 2);
      }
      return a;
    }
    return e;
  }, t.prototype.contain = function(e, i) {
    var s = this.transformCoordToLocal(e, i), r = this.getBoundingRect(), o = this.style;
    if (e = s[0], i = s[1], r.contain(e, i)) {
      var a = this.path;
      if (this.hasStroke()) {
        var l = o.lineWidth, c = o.strokeNoScale ? this.getLineScale() : 1;
        if (c > 1e-10 && (this.hasFill() || (l = Math.max(l, this.strokeContainThreshold)), mx(a, l / c, e, i)))
          return !0;
      }
      if (this.hasFill())
        return _x(a, e, i);
    }
    return !1;
  }, t.prototype.dirtyShape = function() {
    this.__dirty |= fi, this._rect && (this._rect = null), this._decalEl && this._decalEl.dirtyShape(), this.markRedraw();
  }, t.prototype.dirty = function() {
    this.dirtyStyle(), this.dirtyShape();
  }, t.prototype.animateShape = function(e) {
    return this.animate("shape", e);
  }, t.prototype.updateDuringAnimation = function(e) {
    e === "style" ? this.dirtyStyle() : e === "shape" ? this.dirtyShape() : this.markRedraw();
  }, t.prototype.attrKV = function(e, i) {
    e === "shape" ? this.setShape(i) : n.prototype.attrKV.call(this, e, i);
  }, t.prototype.setShape = function(e, i) {
    var s = this.shape;
    return s || (s = this.shape = {}), typeof e == "string" ? s[e] = i : R(s, e), this.dirtyShape(), this;
  }, t.prototype.shapeChanged = function() {
    return !!(this.__dirty & fi);
  }, t.prototype.createStyle = function(e) {
    return _a(Pg, e);
  }, t.prototype._innerSaveToNormal = function(e) {
    n.prototype._innerSaveToNormal.call(this, e);
    var i = this._normalState;
    e.shape && !i.shape && (i.shape = R({}, this.shape));
  }, t.prototype._applyStateObj = function(e, i, s, r, o, a) {
    n.prototype._applyStateObj.call(this, e, i, s, r, o, a);
    var l = !(i && r), c;
    if (i && i.shape ? o ? r ? c = i.shape : (c = R({}, s.shape), R(c, i.shape)) : (c = R({}, r ? this.shape : s.shape), R(c, i.shape)) : l && (c = s.shape), c)
      if (o) {
        this.shape = R({}, this.shape);
        for (var h = {}, u = mt(c), f = 0; f < u.length; f++) {
          var d = u[f];
          typeof c[d] == "object" ? this.shape[d] = c[d] : h[d] = c[d];
        }
        this._transitionState(e, {
          shape: h
        }, a);
      } else
        this.shape = c, this.dirtyShape();
  }, t.prototype._mergeStates = function(e) {
    for (var i = n.prototype._mergeStates.call(this, e), s, r = 0; r < e.length; r++) {
      var o = e[r];
      o.shape && (s = s || {}, this._mergeStyle(s, o.shape));
    }
    return s && (i.shape = s), i;
  }, t.prototype.getAnimationStyleProps = function() {
    return yx;
  }, t.prototype.isZeroArea = function() {
    return !1;
  }, t.extend = function(e) {
    var i = (function(r) {
      Xn(o, r);
      function o(a) {
        var l = r.call(this, a) || this;
        return e.init && e.init.call(l, a), l;
      }
      return o.prototype.getDefaultStyle = function() {
        return Ii(e.style);
      }, o.prototype.getDefaultShape = function() {
        return Ii(e.shape);
      }, o;
    })(t);
    for (var s in e)
      typeof e[s] == "function" && (i.prototype[s] = e[s]);
    return i;
  }, t.initDefaultProps = (function() {
    var e = t.prototype;
    e.type = "path", e.strokeContainThreshold = 5, e.segmentIgnoreThreshold = 0, e.subPixelOptimize = !1, e.autoBatch = !1, e.__dirty = Ut | cs | fi;
  })(), t;
})(wh), ii = Li.CMD, vx = [[], [], []], af = Math.sqrt, xx = Math.atan2;
function Sx(n, t) {
  if (t) {
    var e = n.data, i = n.len(), s, r, o, a, l, c, h = ii.M, u = ii.C, f = ii.L, d = ii.R, p = ii.A, _ = ii.Q;
    for (o = 0, a = 0; o < i; ) {
      switch (s = e[o++], a = o, r = 0, s) {
        case h:
          r = 1;
          break;
        case f:
          r = 1;
          break;
        case u:
          r = 3;
          break;
        case _:
          r = 2;
          break;
        case p:
          var g = t[4], m = t[5], y = af(t[0] * t[0] + t[1] * t[1]), v = af(t[2] * t[2] + t[3] * t[3]), S = xx(-t[1] / v, t[0] / y);
          e[o] *= y, e[o++] += g, e[o] *= v, e[o++] += m, e[o++] *= y, e[o++] *= v, e[o++] += S, e[o++] += S, o += 2, a = o;
          break;
        case d:
          c[0] = e[o++], c[1] = e[o++], be(c, c, t), e[a++] = c[0], e[a++] = c[1], c[0] += e[o++], c[1] += e[o++], be(c, c, t), e[a++] = c[0], e[a++] = c[1];
      }
      for (l = 0; l < r; l++) {
        var w = vx[l];
        w[0] = e[o++], w[1] = e[o++], be(w, w, t), e[a++] = w[0], e[a++] = w[1];
      }
    }
    n.increaseVersion();
  }
}
var el = Math.sqrt, Rr = Math.sin, Ar = Math.cos, Qi = Math.PI;
function lf(n) {
  return Math.sqrt(n[0] * n[0] + n[1] * n[1]);
}
function rc(n, t) {
  return (n[0] * t[0] + n[1] * t[1]) / (lf(n) * lf(t));
}
function cf(n, t) {
  return (n[0] * t[1] < n[1] * t[0] ? -1 : 1) * Math.acos(rc(n, t));
}
function hf(n, t, e, i, s, r, o, a, l, c, h) {
  var u = l * (Qi / 180), f = Ar(u) * (n - e) / 2 + Rr(u) * (t - i) / 2, d = -1 * Rr(u) * (n - e) / 2 + Ar(u) * (t - i) / 2, p = f * f / (o * o) + d * d / (a * a);
  p > 1 && (o *= el(p), a *= el(p));
  var _ = (s === r ? -1 : 1) * el((o * o * (a * a) - o * o * (d * d) - a * a * (f * f)) / (o * o * (d * d) + a * a * (f * f))) || 0, g = _ * o * d / a, m = _ * -a * f / o, y = (n + e) / 2 + Ar(u) * g - Rr(u) * m, v = (t + i) / 2 + Rr(u) * g + Ar(u) * m, S = cf([1, 0], [(f - g) / o, (d - m) / a]), w = [(f - g) / o, (d - m) / a], x = [(-1 * f - g) / o, (-1 * d - m) / a], M = cf(w, x);
  if (rc(w, x) <= -1 && (M = Qi), rc(w, x) >= 1 && (M = 0), M < 0) {
    var b = Math.round(M / Qi * 1e6) / 1e6;
    M = Qi * 2 + b % 2 * Qi;
  }
  h.addData(c, y, v, o, a, S, M, u, r);
}
var bx = /([mlvhzcqtsa])([^mlvhzcqtsa]*)/ig, Tx = /-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g;
function Mx(n) {
  var t = new Li();
  if (!n)
    return t;
  var e = 0, i = 0, s = e, r = i, o, a = Li.CMD, l = n.match(bx);
  if (!l)
    return t;
  for (var c = 0; c < l.length; c++) {
    for (var h = l[c], u = h.charAt(0), f = void 0, d = h.match(Tx) || [], p = d.length, _ = 0; _ < p; _++)
      d[_] = parseFloat(d[_]);
    for (var g = 0; g < p; ) {
      var m = void 0, y = void 0, v = void 0, S = void 0, w = void 0, x = void 0, M = void 0, b = e, T = i, I = void 0, C = void 0;
      switch (u) {
        case "l":
          e += d[g++], i += d[g++], f = a.L, t.addData(f, e, i);
          break;
        case "L":
          e = d[g++], i = d[g++], f = a.L, t.addData(f, e, i);
          break;
        case "m":
          e += d[g++], i += d[g++], f = a.M, t.addData(f, e, i), s = e, r = i, u = "l";
          break;
        case "M":
          e = d[g++], i = d[g++], f = a.M, t.addData(f, e, i), s = e, r = i, u = "L";
          break;
        case "h":
          e += d[g++], f = a.L, t.addData(f, e, i);
          break;
        case "H":
          e = d[g++], f = a.L, t.addData(f, e, i);
          break;
        case "v":
          i += d[g++], f = a.L, t.addData(f, e, i);
          break;
        case "V":
          i = d[g++], f = a.L, t.addData(f, e, i);
          break;
        case "C":
          f = a.C, t.addData(f, d[g++], d[g++], d[g++], d[g++], d[g++], d[g++]), e = d[g - 2], i = d[g - 1];
          break;
        case "c":
          f = a.C, t.addData(f, d[g++] + e, d[g++] + i, d[g++] + e, d[g++] + i, d[g++] + e, d[g++] + i), e += d[g - 2], i += d[g - 1];
          break;
        case "S":
          m = e, y = i, I = t.len(), C = t.data, o === a.C && (m += e - C[I - 4], y += i - C[I - 3]), f = a.C, b = d[g++], T = d[g++], e = d[g++], i = d[g++], t.addData(f, m, y, b, T, e, i);
          break;
        case "s":
          m = e, y = i, I = t.len(), C = t.data, o === a.C && (m += e - C[I - 4], y += i - C[I - 3]), f = a.C, b = e + d[g++], T = i + d[g++], e += d[g++], i += d[g++], t.addData(f, m, y, b, T, e, i);
          break;
        case "Q":
          b = d[g++], T = d[g++], e = d[g++], i = d[g++], f = a.Q, t.addData(f, b, T, e, i);
          break;
        case "q":
          b = d[g++] + e, T = d[g++] + i, e += d[g++], i += d[g++], f = a.Q, t.addData(f, b, T, e, i);
          break;
        case "T":
          m = e, y = i, I = t.len(), C = t.data, o === a.Q && (m += e - C[I - 4], y += i - C[I - 3]), e = d[g++], i = d[g++], f = a.Q, t.addData(f, m, y, e, i);
          break;
        case "t":
          m = e, y = i, I = t.len(), C = t.data, o === a.Q && (m += e - C[I - 4], y += i - C[I - 3]), e += d[g++], i += d[g++], f = a.Q, t.addData(f, m, y, e, i);
          break;
        case "A":
          v = d[g++], S = d[g++], w = d[g++], x = d[g++], M = d[g++], b = e, T = i, e = d[g++], i = d[g++], f = a.A, hf(b, T, e, i, x, M, v, S, w, f, t);
          break;
        case "a":
          v = d[g++], S = d[g++], w = d[g++], x = d[g++], M = d[g++], b = e, T = i, e += d[g++], i += d[g++], f = a.A, hf(b, T, e, i, x, M, v, S, w, f, t);
          break;
      }
    }
    (u === "z" || u === "Z") && (f = a.Z, t.addData(f), e = s, i = r), o = f;
  }
  return t.toStatic(), t;
}
var Cx = (function(n) {
  Xn(t, n);
  function t() {
    return n !== null && n.apply(this, arguments) || this;
  }
  return t.prototype.applyTransform = function(e) {
  }, t;
})(sc);
function Dx(n) {
  return n.setData != null;
}
function Ix(n, t) {
  var e = Mx(n), i = R({}, t);
  return i.buildPath = function(s) {
    if (Dx(s)) {
      s.setData(e.data);
      var r = s.getContext();
      r && s.rebuildPath(r, 1);
    } else {
      var r = s;
      e.rebuildPath(r, 1);
    }
  }, i.applyTransform = function(s) {
    Sx(e, s), this.dirtyShape();
  }, i;
}
function Ex(n, t) {
  return new Cx(Ix(n, t));
}
var Rx = De({
  x: 0,
  y: 0
}, Hn), Ax = {
  style: De({
    x: !0,
    y: !0,
    width: !0,
    height: !0,
    sx: !0,
    sy: !0,
    sWidth: !0,
    sHeight: !0
  }, xh.style)
};
function Lx(n) {
  return !!(n && typeof n != "string" && n.width && n.height);
}
var Sh = (function(n) {
  Xn(t, n);
  function t() {
    return n !== null && n.apply(this, arguments) || this;
  }
  return t.prototype.createStyle = function(e) {
    return _a(Rx, e);
  }, t.prototype._getSize = function(e) {
    var i = this.style, s = i[e];
    if (s != null)
      return s;
    var r = Lx(i.image) ? i.image : this.__image;
    if (!r)
      return 0;
    var o = e === "width" ? "height" : "width", a = i[o];
    return a == null ? r[e] : r[e] / r[o] * a;
  }, t.prototype.getWidth = function() {
    return this._getSize("width");
  }, t.prototype.getHeight = function() {
    return this._getSize("height");
  }, t.prototype.getAnimationStyleProps = function() {
    return Ax;
  }, t.prototype.getBoundingRect = function() {
    var e = this.style;
    return this._rect || (this._rect = new _t(e.x || 0, e.y || 0, this.getWidth(), this.getHeight())), this._rect;
  }, t;
})(wh);
Sh.prototype.type = "image";
function kg(n, t, e, i, s) {
  let r;
  if (t && t.piModel) {
    const l = t.piModel.getUpdatePayload();
    r = l && l.animation;
  }
  const o = t && t.isAnimationEnabled(), a = n === "update";
  if (o) {
    let l, c, h;
    return i ? (l = Hl(i.duration, 200), c = Hl(i.easing, "cubicOut"), h = 0) : (l = t.getShallow(
      a ? "animationDurationUpdate" : "animationDuration"
    ), c = t.getShallow(
      a ? "animationEasingUpdate" : "animationEasing"
    ), h = t.getShallow(
      a ? "animationDelayUpdate" : "animationDelay"
    )), r && (r.duration != null && (l = r.duration), r.easing != null && (c = r.easing), r.delay != null && (h = r.delay)), qn(h) && (h = h(e, s)), qn(l) && (l = l(e)), {
      duration: l || 0,
      delay: h,
      easing: c
    };
  } else
    return null;
}
function Px(n, t, e, i, s, r, o) {
  let a = !1;
  qn(s) ? (o = r, r = s, s = null) : se(s) && (r = s.cb, o = s.during, a = s.isFrom, s.removeOpt, s = s.dataIndex), t.stopAnimation("leave");
  const l = kg(
    n,
    i,
    s,
    null,
    i && i.getAnimationDelayParams ? i.getAnimationDelayParams(t, s) : null
  );
  if (l && l.duration > 0) {
    const c = l.duration, h = l.delay, u = l.easing, f = {
      duration: c,
      delay: h || 0,
      easing: u,
      done: r,
      force: !!r || !!o,
      // Set to final state in update/init animation.
      // So the post processing based on the path shape can be done correctly.
      setToFinal: !0,
      scope: n,
      during: o
    };
    a ? t.animateFrom(e, f) : t.animateTo(e, f);
  } else
    t.stopAnimation(), !a && t.attr(e), o && o(1), r && r();
}
function kx(n, t, e, i, s, r) {
  Px("update", n, t, e, i, s, r);
}
function Ox(n) {
  if (!n.__zr)
    return !0;
  for (let t = 0; t < n.animators.length; t++)
    if (n.animators[t].scope === "leave")
      return !0;
  return !1;
}
const pi = Math.round;
function Fx(n, t, e) {
  if (!t)
    return;
  const i = t.x1, s = t.x2, r = t.y1, o = t.y2;
  n.x1 = i, n.x2 = s, n.y1 = r, n.y2 = o;
  const a = e && e.lineWidth;
  return a && (pi(i * 2) === pi(s * 2) && (n.x1 = n.x2 = uf(i, a)), pi(r * 2) === pi(o * 2) && (n.y1 = n.y2 = uf(r, a))), n;
}
function uf(n, t, e) {
  if (!t)
    return n;
  const i = pi(n * 2);
  return (i + pi(t)) % 2 === 0 ? i / 2 : (i + 1) / 2;
}
const Zn = ft(), Nx = (n, t, e, i) => {
  if (i) {
    const s = Zn(i);
    s.dataIndex = e, s.dataType = t, s.seriesIndex = n, i.type === "group" && i.traverse(function(r) {
      const o = Zn(r);
      o.seriesIndex = n, o.dataIndex = e, o.dataType = t;
    });
  }
};
zrender.Group;
zrender.Image;
zrender.Text;
zrender.Circle;
zrender.Ellipse;
zrender.Sector;
zrender.Ring;
zrender.Polygon;
zrender.Polyline;
zrender.Rect;
zrender.Line;
zrender.BezierCurve;
zrender.Arc;
zrender.IncrementalDisplayable;
zrender.CompoundPath;
zrender.LinearGradient;
zrender.RadialGradient;
zrender.BoundingRect;
zrender.OrientedBoundingRect;
zrender.Point;
zrender.Path;
const oc = {};
function zx(n, t) {
  const e = zrender.matrix.identity([]);
  for (; n && n !== t; )
    zrender.matrix.mul(e, n.getLocalTransform(), e), n = n.parent;
  return e;
}
function Mo(n, t, e) {
  return t && !Xt(t) && (t = mh.getLocalTransform(t)), e && (t = zrender.matrix.invert([], t)), zrender.vector.applyTransform([], n, t);
}
function Bx(n, t, e) {
  const i = t[4] === 0 || t[5] === 0 || t[0] === 0 ? 1 : Math.abs(2 * t[4] / t[0]), s = t[4] === 0 || t[5] === 0 || t[2] === 0 ? 1 : Math.abs(2 * t[4] / t[2]);
  let r = [
    n === "left" ? -i : n === "right" ? i : 0,
    n === "top" ? -s : n === "bottom" ? s : 0
  ];
  return r = Mo(r, t, e), Math.abs(r[0]) > Math.abs(r[1]) ? r[0] > 0 ? "right" : "left" : r[1] > 0 ? "bottom" : "top";
}
function ff(n, t) {
  let e;
  n.isGroup && (e = t(n)), e || n.traverse(t);
}
function $x(n, t) {
  if (n)
    if (Ei(n))
      for (let e = 0; e < n.length; e++)
        ff(n[e], t);
    else
      ff(n, t);
}
function Og(n, t, e, i) {
  const s = Ex(n, t);
  return e && (i === "center" && (e = Fg(e, s.getBoundingRect())), Gx(s, e)), s;
}
function Hx(n, t, e) {
  const i = new Sh({
    style: {
      image: n,
      x: t.x,
      y: t.y,
      width: t.width,
      height: t.height
    },
    onload(s) {
      if (e === "center") {
        const r = {
          width: s.width,
          height: s.height
        };
        i.setStyle(Fg(t, r));
      }
    }
  });
  return i;
}
function Fg(n, t) {
  const e = t.width / t.height;
  let i = n.height * e, s;
  i <= n.width ? s = n.height : (i = n.width, s = i / e);
  const r = n.x + n.width / 2, o = n.y + n.height / 2;
  return {
    x: r - i / 2,
    y: o - s / 2,
    width: i,
    height: s
  };
}
function Gx(n, t) {
  if (!n.applyTransform)
    return;
  const i = n.getBoundingRect().calculateTransform(t);
  n.applyTransform(i);
}
function Ng(n, t) {
  return Fx(n, n, { lineWidth: t }), n;
}
function Bi(n, t) {
  oc[n] = t;
}
function Yx(n) {
  if (oc.hasOwnProperty(n))
    return oc[n];
}
function Wx(n, t, e) {
  if (!n || !t)
    return;
  function i(o) {
    const a = {};
    return o.traverse(function(l) {
      df(l) && l.anid && (a[l.anid] = l);
    }), a;
  }
  function s(o) {
    const a = {
      x: o.x,
      y: o.y,
      rotation: o.rotation
    };
    return Ux(o) && (a.shape = R({}, o.shape)), a;
  }
  const r = i(n);
  t.traverse(function(o) {
    if (df(o) && o.anid) {
      const a = r[o.anid];
      if (a) {
        const l = s(o);
        o.attr(s(a)), kx(o, l, e, Zn(o).dataIndex);
      }
    }
  });
}
function df(n) {
  return !n.isGroup;
}
function Ux(n) {
  return n.shape != null;
}
Bi("rect", zrender.Rect);
Bi("line", zrender.Line);
Bi("circle", zrender.Circle);
Bi("polygon", zrender.Polygon);
Bi("polyline", zrender.Polyline);
Bi("arc", zrender.Arc);
const Lr = 4, Vx = 6, qx = 1, pf = 30, gf = 5, _f = 5, mf = 30, yf = 0.8, vf = 0.2, J = "horizontal", si = "vertical", qo = class qo extends Xl {
  constructor() {
    super(...arguments), this.type = qo.type, this._displayables = {};
  }
  init(t, e) {
    this.api = e;
  }
  render(t, e, i) {
    super.render.apply(this, arguments), this._orient = t.get("orient"), this._buildView();
  }
  _buildView() {
    const t = this.group;
    t.removeAll(), t.attr({ z: 99 });
    const e = this._displayables.sliderGroup = new zrender.Group(), i = this._getGridRect(), s = this.api;
    if (this._orient === si && i) {
      const r = new (void 0)({
        shape: {
          x: i.x,
          y: 0,
          width: i.width,
          height: s.getHeight()
        }
      });
      e.setClipPath(r);
    } else if (this._orient === J) {
      const r = new (void 0)({
        shape: {
          x: 0,
          y: 0,
          width: s.getWidth(),
          height: s.getHeight()
        }
      });
      e.setClipPath(r);
    }
    t.add(e), this._resetLocation(), this._renderHandle();
  }
  _getGridRect() {
    const t = this.api.getModel();
    let e = null;
    return t.eachComponent("grid", function(i) {
      const s = i.coordinateSystem;
      s && (e = s.getRect());
    }), e;
  }
  _resetLocation() {
    const t = this.api;
    let i = this.splitModel.get("ratio");
    const s = { width: t.getWidth(), height: t.getHeight() }, r = this._getGridRect();
    if (this._orient === si && r)
      this._hanldeEnd = r.x, this._size = [r.x, 0];
    else if (this._orient === J) {
      const o = this._getHorizontalDataZoomBottom() + qx;
      this._horizontalMinHandleEnd == null && (this._horizontalMinHandleEnd = this._getHorizontalDragMinHandleEnd(r)), this._horizontalMaxHandleEnd == null && (this._horizontalMaxHandleEnd = o), i === void 0 ? this._hanldeEnd = o : this._hanldeEnd = s.height * lc(i, this._orient), this._hanldeEnd = Math.max(
        this._horizontalMinHandleEnd,
        Math.min(this._hanldeEnd, this._horizontalMaxHandleEnd)
      ), this._size = [0, this._hanldeEnd];
    } else
      this._size = [s.width * lc(i, this._orient), 0], this._hanldeEnd = this._size[1];
  }
  _getHorizontalDragMinHandleEnd(t) {
    return t ? t.y : 0;
  }
  _getHorizontalDataZoomTop() {
    const t = this.api, e = { width: t.getWidth(), height: t.getHeight() };
    let i = null;
    return t.getModel().eachComponent("dataZoom", function(s) {
      if (s.subType !== "slider" || s.getOrient() !== J || s.get("show") === !1)
        return;
      i = Gs(
        Hs(s.option),
        e
      ).y;
    }), i;
  }
  _getHorizontalDataZoomBottom() {
    const t = this.api, e = { width: t.getWidth(), height: t.getHeight() };
    let i = e.height;
    return t.getModel().eachComponent("dataZoom", function(s) {
      if (s.subType !== "slider" || s.getOrient() !== J || s.get("show") === !1)
        return;
      const r = Gs(
        Hs(s.option),
        e
      );
      s.get("brushSelect") ? i = r.y + (s.get("moveHandleSize") || 0) - 0.5 : i = r.y + r.height;
    }), i;
  }
  _renderHandle() {
    const t = this._displayables.sliderGroup, e = this.splitModel, i = this.api, s = this.splitModel.get("zlevel") || 0;
    let r = e.get("handleIcon");
    const o = new zrender.Rect({
      shape: {
        x: this._orient === J ? i.getWidth() / 2 - 32 : 0,
        y: this._orient === J ? -7 : 0,
        width: this._orient === J ? 64 : Lr,
        height: this._orient === J ? 18 : i.getHeight()
      },
      style: {
        fill: this._orient === J ? "rgba(0,0,0,0)" : e.get("backgroundColor")
      },
      cursor: xf(this._orient),
      zlevel: s,
      z2: 1e4
    });
    o.attr({
      x: this._orient === si ? this._size[0] : 0,
      y: this._orient === J ? this._size[1] : 0
    });
    const a = new zrender.Image({
      style: {
        image: r,
        width: this._orient === J ? pf : _f,
        height: this._orient === J ? gf : mf
      },
      cursor: xf(this._orient),
      zlevel: s,
      z2: 10001
    });
    this._orient === J && (a.__testId = "horizontal-split-handle"), a.attr(this._getHandleIconPosition(this._hanldeEnd)), t.add(o), t.add(a), t.attr({
      draggable: !0,
      drift: P(this._onDragMove, this),
      ondragend: P(this._onDrageEnd, this)
    }), this._displayables.handle = o, this._displayables.handleIcon = a;
  }
  _getHandleIconPosition(t) {
    return this._orient === J ? {
      x: this.api.getWidth() / 2 - pf / 2,
      y: t + Lr / 2 - gf / 2
    } : {
      x: t + Lr / 2 - _f / 2,
      y: this.api.getHeight() / 2 - mf / 2
    };
  }
  updateInterval(t) {
    return this._hanldeEnd += t, this._orient === J && (this._hanldeEnd = Math.max(
      this._horizontalMinHandleEnd,
      Math.min(this._hanldeEnd, this._horizontalMaxHandleEnd)
    )), !0;
  }
  _updateView() {
    const t = this._hanldeEnd;
    this._displayables.handle.attr({
      x: this._orient === si ? t : 0,
      y: this._orient === J ? t : 0
    }), this._displayables.handleIcon.attr(
      this._getHandleIconPosition(t)
    );
  }
  _onDragMove(t, e, i) {
    this._dragging = !0, ve(i.event);
    const s = this._displayables.sliderGroup.getLocalTransform(), r = Mo([t, e], s, !0), o = this._orient === J ? r[1] : r[0];
    if (this.updateInterval(o), !this._boundaryDefinition())
      if (this._updateView(), this._orient === si) {
        const a = this._hanldeEnd;
        this.api.dispatchAction({
          type: "updateYAxisPosition",
          data: { x: a }
        });
      } else {
        const a = this._hanldeEnd, l = a / this.api.getHeight();
        this.splitModel.option.ratio = l, this.api.dispatchAction({
          type: "updateUnassignedBoardPosition",
          data: { y: a }
        });
      }
  }
  _onDrageEnd() {
    if (this._dragging = !1, this._orient === si) {
      const t = this._hanldeEnd;
      this.api.dispatchAction({
        type: "updateYAxisPosition",
        data: { x: t }
      });
    } else {
      const t = this._hanldeEnd, e = t / this.api.getHeight();
      this.splitModel.option.ratio = e, this.api.dispatchAction({
        type: "updateUnassignedBoardPosition",
        data: { y: t }
      });
    }
  }
  _findCoordRect() {
    let t;
    if (!t) {
      const e = this.api.getWidth(), i = this.api.getHeight();
      t = {
        x: e,
        y: i,
        width: e,
        height: i
      };
    }
    return t;
  }
  _boundaryDefinition() {
    return this._orient === J ? !1 : this._hanldeEnd <= 0 || this._hanldeEnd >= this.api.getWidth() - Lr;
  }
  eachRendered(t) {
    $x(this.group, t);
  }
  getOrient() {
    return this._orient;
  }
  getPos() {
    var t, e;
    return (e = (t = this._displayables) == null ? void 0 : t.sliderGroup) == null ? void 0 : e.getBoundingRect();
  }
};
qo.type = "split.slider";
let ac = qo;
function lc(n, t) {
  let e = n;
  if (typeof e == "string") {
    if (e.endsWith("%"))
      return parseFloat(e.slice(0, -1)) / 100;
  } else if (typeof e == "number") {
    if (e <= 1 && e >= 0)
      return e;
    if (e > 1) {
      const i = Math.floor(Math.log10(e)) + 1;
      return e / Math.pow(10, i);
    } else
      e = t === J ? yf : vf;
  }
  return t === J ? yf : vf;
}
function xf(n) {
  return n == "vertical" ? "col-resize" : "row-resize";
}
const gi = class gi extends U {
  constructor() {
    super(...arguments), this.type = gi.type;
  }
  getOrient() {
    return this._orient;
  }
};
gi.type = "split", gi.dependencies = [], gi.defaultOption = {
  z: 10
};
let Co = gi;
const Is = class Is extends Co {
  constructor() {
    super(...arguments), this.type = Is.type;
  }
};
Is.type = "split.slider", Is.defaultOption = nh(
  Co.defaultOption,
  {
    show: !0,
    backgroundColor: "#eee",
    zlevel: 1e3
  }
);
let cc = Is;
function Xx(n) {
  n.registerComponentModel(cc), n.registerComponentView(ac), mv(n), n.registerSubTypeDefaulter("split", function() {
    return "slider";
  });
}
class Zx {
  constructor(t) {
    this.coordSysDims = [], this.axisMap = F(), this.categoryAxisMap = F(), this.coordSysName = t;
  }
}
function Kx(n) {
  const t = n.get("coordinateSystem"), e = new Zx(t), i = jx[t];
  if (i)
    return i(
      n,
      e,
      e.axisMap,
      e.categoryAxisMap
    ), e;
}
const jx = {
  cartesian2d: function(n, t, e, i) {
    const s = n.getReferringComponents(
      "xAxis",
      Me
    ).models[0], r = n.getReferringComponents(
      "yAxis",
      Me
    ).models[0];
    t.coordSysDims = ["x", "y"], e.set("x", s), e.set("y", r), wf(s) && (i.set("x", s), t.firstCategoryDimIndex = 0), wf(r) && (i.set("y", r), t.firstCategoryDimIndex == null && (t.firstCategoryDimIndex = 1));
  }
};
function wf(n) {
  return n.get("type") === "category";
}
function Qx(n) {
  return n === "category" ? "ordinal" : n === "time" ? "time" : "float";
}
function Jx(n, t) {
  const e = {}, i = e.encode = {}, s = F();
  let r = [], o = [];
  const a = {};
  D(n.dimensions, function(f) {
    const d = n.getDimensionInfo(f), p = d.coordDim;
    if (p) {
      const _ = d.coordDimIndex;
      nl(i, p)[_] = f, d.isExtraCoord || (s.set(p, 1), tw(d.type) && (r[0] = f), nl(a, p)[_] = n.getDimensionIndex(d.name)), d.defaultTooltip && o.push(f);
    }
    Np.each(function(_, g) {
      const m = nl(i, g), y = d.otherDims[g];
      y != null && y !== !1 && (m[y] = d.name);
    });
  });
  let l = [];
  const c = {};
  s.each(function(f, d) {
    const p = i[d];
    c[d] = p[0], l = l.concat(p);
  }), e.dataDimsOnCoord = l, e.dataDimIndicesOnCoord = H(
    l,
    (f) => n.getDimensionInfo(f).storeDimIndex
  ), e.encodeFirstDimNotExtra = c;
  const h = i.label;
  h && h.length && (r = h.slice());
  const u = i.tooltip;
  return u && u.length ? o = u.slice() : o.length || (o = r.slice()), i.defaultedLabel = r, i.defaultedTooltip = o, e.userOutput = new ew(a, t), e;
}
function nl(n, t) {
  return n.hasOwnProperty(t) || (n[t] = []), n[t];
}
function tw(n) {
  return !(n === "ordinal" || n === "time");
}
class ew {
  constructor(t, e) {
    this._encode = t, this._schema = e;
  }
}
class io {
  constructor(t) {
    this.otherDims = {}, t != null && N(this, t);
  }
}
function il(n) {
  return n == null ? 0 : n.length || 1;
}
function Sf(n) {
  return n;
}
class zg {
  constructor(t, e, i, s, r, o) {
    this._old = t, this._new = e, this._oldKeyGetter = i || Sf, this._newKeyGetter = s || Sf, this.context = r, this._diffModeMultiple = o === "multiple";
  }
  add(t) {
    return this._add = t, this;
  }
  update(t) {
    return this._update = t, this;
  }
  remove(t) {
    return this._remove = t, this;
  }
  execute() {
    this[this._diffModeMultiple ? "_executeMultiple" : "_executeOneToOne"]();
  }
  _executeMultiple() {
  }
  _executeOneToOne() {
    const t = this._old, e = this._new, i = {}, s = new Array(t.length), r = new Array(e.length);
    this._initIndexMap(t, null, s, "_oldKeyGetter"), this._initIndexMap(e, i, r, "_newKeyGetter");
    for (let o = 0; o < t.length; o++) {
      const a = s[o], l = i[a], c = il(l);
      if (c > 1) {
        const h = l.shift();
        l.length === 1 && (i[a] = l[0]), this._update && this._update(h, o);
      } else c === 1 ? (i[a] = null, this._update && this._update(l, o)) : this._remove && this._remove(o);
    }
    this._performRestAdd(r, i);
  }
  _initIndexMap(t, e, i, s) {
    const r = this._diffModeMultiple;
    for (let o = 0; o < t.length; o++) {
      const a = "_pi_" + this[s](t[o], o);
      if (r || (i[o] = a), !e)
        continue;
      const l = e[a], c = il(l);
      c === 0 ? (e[a] = o, r && i.push(a)) : c === 1 ? e[a] = [l, o] : l.push(o);
    }
  }
  _performRestAdd(t, e) {
    for (let i = 0; i < t.length; i++) {
      const s = t[i], r = e[s], o = il(r);
      if (o > 1)
        for (let a = 0; a < o; a++)
          this._add && this._add(r[a]);
      else o === 1 && this._add && this._add(r);
      e[s] = null;
    }
  }
}
const nw = typeof Int32Array == "undefined" ? Array : Int32Array, iw = "p\0\0", sw = -1, rw = [
  "hasItemOption",
  "_nameList",
  "_idList",
  "_invertedIndicesMap",
  "_dimSummary",
  "userOutput",
  "_rawData",
  "_dimValueGetter",
  "_nameDimIdx",
  "_idDimIdx",
  "_nameRepeatCount"
], ow = ["_approximateExtent"];
let bf, Pr, kr, Ji, sl, Tf, Mf;
const Es = class Es {
  constructor(t, e) {
    this._idList = [], this._calculationInfo = {}, this._visual = {}, this._graphicEls = [], this._itemVisuals = [], this._dimOmitted = !1, this.hasItemOption = !1, this.TRANSFERABLE_METHODS = [
      "cloneShallow",
      "downSample",
      "lttbDownSample",
      "map"
    ], this.CHANGABLE_METHODS = ["filterSelf", "selectRange"], this.DOWNSAMPLE_METHODS = ["downSample", "lttbDownSample"], this._nameList = [], this._approximateExtent = {};
    let i;
    rg(t) ? (i = t.dimensions, this._dimOmitted = t.isDimensionOmitted(), this._schema = t) : i = t, i = i || ["x", "y"];
    const s = {};
    let r = !1;
    const o = [], a = {};
    for (let l = 0; l < (i == null ? void 0 : i.length); l++) {
      const c = i[l], h = X(c) ? new io({ name: c }) : c instanceof io ? c : new io(c), u = h == null ? void 0 : h.name;
      h.type = (h == null ? void 0 : h.type) || "float", h.coordDim || (h.coordDim = u, h.coordDimIndex = 0), h.otherDims = h.otherDims || {}, o.push(u), s[u] = h, a[u] != null && (r = !0);
    }
    this.dimensions = o, this._dimInfos = s, this._initGetDimensionInfo(r), this.hostModel = e;
  }
  _getStoreDimIndex(t) {
    return this.getDimensionIndex(t);
  }
  _initGetDimensionInfo(t) {
    const e = this._dimInfos;
    this._getDimInfo = t ? (i) => e.hasOwnProperty(i) ? e[i] : void 0 : (i) => e[i];
  }
  getId(t) {
    return kr(this, this.getRawIndex(t));
  }
  getStore() {
    return this._store;
  }
  /**
   * Retrieve the index with given name
   */
  indexOfName(t) {
    for (let e = 0, i = this._store.count(); e < i; e++)
      if (this.getName(e) === t)
        return e;
    return -1;
  }
  getRawIndex(t) {
    return this._store.getRawIndex(t);
  }
  indexOfRawIndex(t) {
    return this._store.indexOfRawIndex(t);
  }
  getIndices() {
    return this._store.getIndices();
  }
  getDataExtent(t) {
    return this._store.getDataExtent(this._getStoreDimIndex(t));
  }
  getDimensionIndex(t) {
    const e = this._recognizeDimIndex(t);
    if (e != null)
      return e;
    if (t == null)
      return -1;
    const i = this._getDimInfo(t);
    return i ? i.storeDimIndex : this._dimOmitted ? this._schema.getSourceDimensionIndex(t) : -1;
  }
  getDimensionInfo(t) {
    return this._getDimInfo(this.getDimension(t));
  }
  getDimension(t) {
    let e = this._recognizeDimIndex(t);
    if (e == null)
      return t;
    if (e = t, !this._dimOmitted)
      return this.dimensions[e];
    const i = this._dimIdxToName.get(e);
    if (i != null)
      return i;
    const s = this._schema.getSourceDimension(e);
    if (s)
      return s.name;
  }
  getItemModel(t) {
    const e = this.hostModel, i = this.getRawDataItem(t);
    return new Dt(i, e, e && e.piModel);
  }
  _getCategory(t, e) {
    const i = this._store.get(t, e), s = this._store.getOrdinalMeta(t);
    return s ? s.categories[i] : i;
  }
  initData(t, e, i) {
    let s;
    if (t instanceof Ys && (s = t), !s) {
      const r = this.dimensions, o = lh(t) || Ct(t) ? new _o(
        t,
        r == null ? void 0 : r.length
      ) : t;
      s = new Ys();
      const a = H(
        r,
        (l) => ({
          type: this._dimInfos[l].type,
          property: l
        })
      );
      s.initData(o, a, i);
    }
    this._store = s, this._nameList = (e || []).slice(), this._idList = [], this._nameRepeatCount = {}, this._doInit(0, s.count()), this._dimSummary = Jx(this, this._schema), this.userOutput = this._dimSummary.userOutput;
  }
  _updateOrdinalMeta() {
    const t = this._store, e = this.dimensions;
    for (let i = 0; i < e.length; i++) {
      const s = this._dimInfos[e[i]];
      s.ordinalMeta && t.collectOrdinalMeta(s.storeDimIndex, s.ordinalMeta);
    }
  }
  _doInit(t, e) {
    if (t >= e)
      return;
    const s = this._store.getProvider();
    this._updateOrdinalMeta();
    const r = this._nameList, o = this._idList;
    if (s.getSource().sourceFormat === ae && !s.pure) {
      const c = [];
      for (let h = t; h < e; h++) {
        const u = s.getItem(h, c);
        if (!this.hasItemOption && am(u) && (this.hasItemOption = !0), u) {
          const f = u.name;
          r[h] == null && f != null && (r[h] = ze(f, null));
          const d = u.id;
          o[h] == null && d != null && (o[h] = ze(d, null));
        }
      }
    }
    if (this._shouldMakeIdFromName())
      for (let c = t; c < e; c++)
        Mf(this, c);
    bf(this);
  }
  _shouldMakeIdFromName() {
    const t = this._store.getProvider();
    return this._idDimIdx == null && t.getSource().sourceFormat !== tn && !t.fillStorage;
  }
  //创建一个数据的对比器
  diff(t) {
    const e = this;
    return new zg(
      t ? t.getStore().getIndices() : [],
      this.getStore().getIndices(),
      function(i) {
        return kr(t, i);
      },
      function(i) {
        return kr(e, i);
      }
    );
  }
  /**
   * Set graphic element relative to data. It can be set as null
   */
  setItemGraphicEl(t, e) {
    const i = this.hostModel && this.hostModel.seriesIndex;
    Nx(i, this.dataType, t, e), this._graphicEls[t] = e;
  }
  getItemGraphicEl(t) {
    return this._graphicEls[t];
  }
  eachItemGraphicEl(t, e) {
    D(this._graphicEls, function(i, s) {
      i && t && t.call(e, i, s);
    });
  }
  _recognizeDimIndex(t) {
    if (Se(t) || // If being a number-like string but not being defined as a dimension name.
    t != null && !isNaN(t) && !this._getDimInfo(t) && (!this._dimOmitted || this._schema.getSourceDimensionIndex(t) < 0))
      return +t;
  }
  count() {
    return this._store.count();
  }
  cloneShallow(t) {
    return t || (t = new Es(
      this._schema ? this._schema : H(this.dimensions, this._getDimInfo, this),
      this.hostModel
    )), sl(t, this), t._store = this._store, t;
  }
  each(t, e, i) {
    Q(t) && (i = e, e = t, t = []);
    const s = i || this, r = H(
      Pr(t),
      this._getStoreDimIndex,
      this
    );
    this._store.each(
      r,
      s ? P(e, s) : e
    );
  }
  filterSelf(t, e, i) {
    Q(t) && (i = e, e = t, t = []);
    const s = i || this, r = H(
      Pr(t),
      this._getStoreDimIndex,
      this
    );
    return this._store = this._store.filter(
      r,
      s ? P(e, s) : e
    ), this;
  }
  selectRange(t) {
    const e = {}, i = tt(t);
    return D(i, (s) => {
      const r = this._getStoreDimIndex(s);
      e[r] = t[s];
    }), this._store = this._store.selectRange(e), this;
  }
  getRawDataItem(t) {
    return this._store.getRawDataItem(t);
  }
  map(t, e, i, s) {
    const r = i || s || this, o = H(
      Pr(t),
      this._getStoreDimIndex,
      this
    ), a = Tf(this);
    return a._store = this._store.map(o, r ? P(e, r) : e), a;
  }
  wrapMethod(t, e) {
    const i = this[t];
    Q(i) && (this.__wrappedMethods = this.__wrappedMethods || [], this.__wrappedMethods.push(t), this[t] = function() {
      const s = i.apply(this, arguments);
      return e.apply(this, [s].concat(Jc(arguments)));
    });
  }
  mapDimension(t, e) {
    const i = this._dimSummary;
    if (e == null)
      return i.encodeFirstDimNotExtra[t];
    const s = i.encode[t];
    return s ? s[e] : null;
  }
  mapDimensionsAll(t) {
    return (this._dimSummary.encode[t] || []).slice();
  }
  getApproximateExtent(t) {
    return this._approximateExtent[t] || this._store.getDataExtent(this._getStoreDimIndex(t));
  }
  setApproximateExtent(t, e) {
    e = this.getDimension(e), this._approximateExtent[e] = t.slice();
  }
  /**
   * @return Never be null/undefined. `number` will be converted to string. Because:
   * In most cases, name is used in display, where returning a string is more convenient.
   * In other cases, name is used in query (see `indexOfName`), where we can keep the
   * rule that name `2` equals to name `'2'`.
   */
  getName(t) {
    const e = this.getRawIndex(t);
    let i = this._nameList[e];
    return i == null && this._nameDimIdx != null && (i = Ji(this, this._nameDimIdx, e)), i == null && (i = ""), i;
  }
  setCalculationInfo(t, e) {
    O(t) ? N(this._calculationInfo, t) : this._calculationInfo[t] = e;
  }
  getCalculationInfo(t) {
    return this._calculationInfo[t];
  }
  // eslint-disable-next-line
  setItemVisual(t, e, i) {
    const s = this._itemVisuals[t] || {};
    this._itemVisuals[t] = s, O(e) ? N(s, e) : s[e] = i;
  }
  clearAllVisual() {
    this._visual = {}, this._itemVisuals = [];
  }
};
Es.internalField = (function() {
  bf = function(t) {
    const e = t._invertedIndicesMap;
    D(e, function(i, s) {
      const r = t._dimInfos[s], o = r.ordinalMeta, a = t._store;
      if (o) {
        i = e[s] = new nw(
          o.categories.length
        );
        for (let l = 0; l < i.length; l++)
          i[l] = sw;
        for (let l = 0; l < a.count(); l++)
          i[a.get(r.storeDimIndex, l)] = l;
      }
    });
  }, Pr = function(t) {
    return K(t) || (t = t !== null ? [t] : []), t;
  }, Tf = function(t) {
    const e = new Es(
      t._schema ? t._schema : H(t.dimensions, t._getDimInfo, t),
      t.hostModel
    );
    return sl(e, t), e;
  }, sl = function(t, e) {
    D(
      rw.concat(e.__wrappedMethods || []),
      function(i) {
        e.hasOwnProperty(i) && (t[i] = e[i]);
      }
    ), t.__wrappedMethods = e.__wrappedMethods, D(ow, function(i) {
      t[i] = V(e[i]);
    }), t._calculationInfo = N({}, e._calculationInfo);
  }, kr = function(t, e) {
    let i = t._idList[e];
    return i == null && t._idDimIdx != null && (i = Ji(t, t._idDimIdx, e)), i == null && (i = iw + e), i;
  }, Ji = function(t, e, i) {
    return ze(t._getCategory(e, i), null);
  }, Mf = function(t, e) {
    const i = t._nameList, s = t._idList, r = t._nameDimIdx, o = t._idDimIdx;
    let a = i[e], l = s[e];
    if (a == null && r != null && (i[e] = a = Ji(t, r, e)), l == null && o != null && (s[e] = l = Ji(t, o, e)), l == null && a != null) {
      const c = t._nameRepeatCount, h = c[a] = (c[a] || 0) + 1;
      l = a, h > 1 && (l += "__pi__" + h), s[e] = l;
    }
  };
})();
let hc = Es;
function aw(n, t) {
  lh(n) || (n = Hp(n)), t = t || {};
  const e = t.coordDimensions || [], i = t.dimensionsDefine || n.dimensionsDefine || [], s = F(), r = [], o = cw(n, e, i, t.dimensionsCount), a = t.canOmitUnusedDimensions && g1(o), l = i === n.dimensionsDefine, c = l ? ag(n) : og(i);
  let h = t.encodeDefine;
  !h && t.encodeDefaulter && (h = t.encodeDefaulter(n, o));
  const u = F(
    h
  ), f = new ay(o);
  for (let w = 0; w < f.length; w++)
    f[w] = -1;
  function d(w) {
    const x = f[w];
    if (x < 0) {
      const M = i[w], b = O(M) ? M : { name: M }, T = new io(), I = b.name;
      I != null && c.get(I) != null && (T.name = T.displayName = I), b.type != null && (T.type = b.type), b.displayName != null && (T.displayName = b.displayName);
      const C = r.length;
      return f[w] = C, T.storeDimIndex = w, r.push(T), T;
    }
    return r[x];
  }
  if (!a)
    for (let w = 0; w < o; w++)
      d(w);
  u.each(function(w, x) {
    const M = Vt(w).slice();
    if (M.length === 1 && !X(M[0]) && M[0] < 0) {
      u.set(x, !1);
      return;
    }
    const b = u.set(x, []);
    D(M, function(T, I) {
      const C = X(T) ? c.get(T) : T;
      C != null && C < o && (b[I] = C, _(d(C), x, I));
    });
  });
  let p = 0;
  D(e, function(w) {
    let x, M, b, T;
    if (X(w))
      x = w, T = {};
    else {
      T = w, x = T.name;
      const C = T.ordinalMeta;
      T.ordinalMeta = null, T = N({}, T), T.ordinalMeta = C, M = T.dimsDef, b = T.otherDims, T.name = T.coordDim = T.coordDimIndex = T.dimsDef = T.otherDims = null;
    }
    let I = u.get(x);
    if (I !== !1) {
      if (I = Vt(I), !I.length)
        for (let C = 0; C < (M && M.length || 1); C++) {
          for (; p < o && d(p).coordDim != null; )
            p++;
          p < o && I.push(p++);
        }
      D(I, function(C, E) {
        const A = d(C);
        if (l && T.type != null && (A.type = T.type), _(yt(A, T), x, E), A.name == null && M) {
          let L = M[E];
          !O(L) && (L = {
            name: L
          }), A.name = A.displayName = L.name, A.defaultTooltip = L.defaultTooltip;
        }
        b && yt(A.otherDims, b);
      });
    }
  });
  function _(w, x, M) {
    Np.get(x) != null ? w.otherDims[x] = M : (w.coordDim = x, w.coordDimIndex = M, s.set(x, !0));
  }
  const g = t.generateCoord;
  let m = t.generateCoordCount;
  const y = m != null;
  m = g ? m || 1 : 0;
  const v = g || "value";
  function S(w) {
    w.name == null && (w.name = w.coordDim);
  }
  if (a)
    D(r, (w) => {
      S(w);
    }), r.sort((w, x) => w.storeDimIndex - x.storeDimIndex);
  else
    for (let w = 0; w < o; w++) {
      const x = d(w);
      x.coordDim == null && (x.coordDim = hw(v, s, y), x.coordDimIndex = 0, (!g || m <= 0) && (x.isExtraCoord = !0), m--), S(x), x.type == null && ($p(n, w) === wt.Must || // Consider the case:
      // {
      //    dataset: {source: [
      //        ['2001', 123],
      //        ['2002', 456],
      //        ...
      //        ['The others', 987],
      //    ]},
      //    series: {type: 'pie'}
      // }
      // The first column should better be treated as a "ordinal" although it
      // might not be detected as an "ordinal" by `guessOrdinal`.
      x.isExtraCoord && (x.otherDims.itemName != null || x.otherDims.seriesName != null)) && (x.type = "ordinal");
    }
  return lw(r), new sg({
    source: n,
    dimensions: r,
    fullDimensionCount: o,
    dimensionOmitted: a
  });
}
function lw(n) {
  const t = F();
  for (let e = 0; e < n.length; e++) {
    const i = n[e], s = i.name;
    let r = t.get(s) || 0;
    r > 0 && (i.name = s + (r - 1)), r++, t.set(s, r);
  }
}
function cw(n, t, e, i) {
  let s = Math.max(
    n.dimensionsDetectedCount || 1,
    t.length,
    e.length,
    i || 0
  );
  return D(t, function(r) {
    let o;
    O(r) && (o = r.dimsDef) && (s = Math.max(s, o.length));
  }), s;
}
function hw(n, t, e) {
  if (e || t.hasKey(n)) {
    let i = 0;
    for (; t.hasKey(n + i); )
      i++;
    n += i;
  }
  return t.set(n, !0), n;
}
function uw(n, t) {
  const e = n.get("coordinateSystem"), i = Ws.get(e);
  let s;
  return t && t.coordSysDims && (s = H(t.coordSysDims, function(r) {
    const o = {
      name: r
    }, a = t.axisMap.get(r);
    if (a) {
      const l = a.get("type");
      o.type = Qx(l);
    }
    return o;
  })), s || (s = i && (i.getDimensionsInfo ? i.getDimensionsInfo() : i.dimensions.slice()) || ["x", "y"]), s;
}
function fw(n, t, e) {
  e = e || {};
  const i = t.getSourceManager();
  let s, r = !1;
  s = i.getSource(), r = s.sourceFormat === ae;
  const o = Kx(t), a = uw(t, o), l = e.useEncodeDefaulter, c = Q(l) ? l : l ? uo(
    uy,
    a,
    t
  ) : null, h = {
    coordDimensions: a,
    generateCoord: e.generateCoord,
    encodeDefine: t.getEncode(),
    encodeDefaulter: c,
    canOmitUnusedDimensions: !r
  }, u = aw(s, h), f = dw(
    u == null ? void 0 : u.dimensions,
    e.createInvertedIndices,
    o
  ), d = r ? null : i.getSharedDataStore(u), p = y1(t, { schema: u, store: d }), _ = new hc(u, t);
  _.setCalculationInfo(p);
  const g = f != null && pw(s) ? function(m, y, v, S) {
    return S === f ? v : this.defaultDimValueGetter(m, y, v, S);
  } : null;
  return _.hasItemOption = !1, _.initData(
    // Try to reuse the data store in sourceManager if using dataset.
    r ? s : d,
    null,
    g
  ), _;
}
function dw(n, t, e) {
  let i, s;
  return e && D(n, function(r, o) {
    const a = r.coordDim, l = e.categoryAxisMap.get(a);
    l && (i == null && (i = o), r.ordinalMeta = l.getOrdinalMeta(), t && (r.createInvertedIndices = !0)), r.otherDims.itemName != null && (s = !0);
  }), !s && i != null && (n[i].otherDims.itemName = 0), i;
}
function pw(n) {
  if (n.sourceFormat === ae) {
    const t = gw(n.data || []);
    return !K(ha(t));
  }
}
function gw(n) {
  let t = 0;
  for (; t < n.length && n[t] == null; )
    t++;
  return n[t];
}
ft();
const nn = ft(), Rs = class Rs extends mo {
  constructor() {
    super(...arguments), this.type = Rs.type;
  }
  getInitialData(t, e) {
    return fw(null, this);
  }
};
Rs.type = "series.custom", Rs.defaultOption = {
  coordinateSystem: "cartesian2d",
  z: 2,
  clip: !1
};
let uc = Rs;
function _w(n, t) {
  return t = t || [0, 0], H(
    ["x", "y"],
    function(e, i) {
      const s = this.getAxis(e), r = t[i], o = n[i] / 2;
      return s.type === "category" ? s.getBandWidth() : Math.abs(
        s.dataToCoord(r - o) - s.dataToCoord(r + o)
      );
    },
    this
  );
}
function mw(n) {
  const t = n.master.getRect();
  return {
    coordSys: {
      type: "cartesian2d",
      x: t == null ? void 0 : t.x,
      y: t == null ? void 0 : t.y,
      width: t == null ? void 0 : t.width,
      height: t == null ? void 0 : t.height
    },
    api: {
      coord: function(e) {
        return n.dataToPoint(e);
      },
      size: P(_w, n)
    }
  };
}
const fc = ["", "style", "shape", "extra"], Bg = {
  position: ["x", "y"],
  scale: ["scaleX", "scaleY"],
  origin: ["originX", "originY"]
}, Cf = mt(Bg), me = {}, yw = {
  // Usually other props do not need to be changed in animation during.
  setTransform(n, t) {
    return me.el[n] = t, this;
  },
  getTransform(n) {
    return me.el[n];
  },
  setShape(n, t) {
    const e = me.el, i = e.shape || (e.shape = {});
    return i[n] = t, e.dirtyShape && e.dirtyShape(), this;
  },
  getShape(n) {
    const t = me.el.shape;
    if (t)
      return t[n];
  },
  setStyle(n, t) {
    const e = me.el, i = e.style;
    return i && (i[n] = t, e.dirtyStyle && e.dirtyStyle()), this;
  },
  getStyle(n) {
    const t = me.el.style;
    if (t)
      return t[n];
  },
  setExtra(n, t) {
    const e = me.el.extra || (me.el.extra = {});
    return e[n] = t, this;
  },
  getExtra(n) {
    const t = me.el.extra;
    if (t)
      return t[n];
  }
}, Pi = ft();
function bh(n, t, e, i, s) {
  const r = `${n}Animation`, o = kg(n, i, s) || {}, a = Pi(t).userDuring;
  return o.duration > 0 && (o.during = a ? Bl(xw, { el: t, userDuring: a }) : null, o.setToFinal = !0, o.scope = n), R(o, e[r]), o;
}
function Th(n, t, e, i) {
  if (n) {
    const s = n.parent, r = Pi(n).leaveToProps;
    if (r) {
      const o = bh(
        "update",
        n,
        t,
        e,
        0
      );
      o.done = () => {
        s.remove(n);
      }, n.animateTo(r, o);
    } else
      s.remove(n);
  }
}
function vw(n, t, e, i) {
  i = i || {};
  const { dataIndex: s, isInit: r, clearStyle: o } = i, a = e.isAnimationEnabled(), l = Pi(n), c = t.style;
  l.userDuring = t.during;
  const h = {}, u = {};
  if (Sw(n, t, u), If("shape", t, u), If("extra", t, u), !r && a && (ww(n, t, h), Df("shape", n, t, h), Df("extra", n, t, h), bw(n, t, c, h)), u.style = c, Tw(n, u, o), Dw(n, t), a)
    if (r) {
      const f = {};
      et(fc, (p) => {
        const _ = p ? t[p] : t;
        _ && _.enterFrom && (p && (f[p] = f[p] || {}), R(
          p ? f[p] : f,
          _.enterFrom
        ));
      });
      const d = bh(
        "enter",
        n,
        t,
        e,
        s
      );
      d.duration > 0 && n.animateFrom(f, d);
    } else
      Cw(
        n,
        t,
        s || 0,
        e,
        h
      );
  Mw(n, t), c ? n.dirty() : n.markRedraw();
}
function xw() {
  const n = this, t = n.el;
  if (!t)
    return;
  const e = Pi(t).userDuring, i = n.userDuring;
  if (e !== i) {
    n.el = n.userDuring = null;
    return;
  }
  me.el = t, i(yw);
}
function Df(n, t, e, i) {
  const s = e[n];
  if (!s)
    return;
  const r = t[n];
  let o;
  if (r) {
    const a = e.transition, l = s.transition;
    if (l)
      if (!o && (o = i[n] = {}), bi(l))
        R(o, r);
      else {
        const c = Vt(l);
        for (let h = 0; h < c.length; h++) {
          const u = c[h], f = r[u];
          o[u] = f;
        }
      }
    else if (bi(a) || Tt(a, n) >= 0) {
      !o && (o = i[n] = {});
      const c = mt(r);
      for (let h = 0; h < c.length; h++) {
        const u = c[h], f = r[u];
        Iw(s[u], f) && (o[u] = f);
      }
    }
  }
}
function If(n, t, e) {
  const i = t[n];
  if (!i)
    return;
  const s = e[n] = {}, r = mt(i);
  for (let o = 0; o < r.length; o++) {
    const a = r[o];
    s[a] = bs(i[a]);
  }
}
function ww(n, t, e) {
  const i = t.transition, s = bi(i) ? an : Vt(i || []);
  for (let r = 0; r < s.length; r++) {
    const o = s[r];
    if (o === "style" || o === "shape" || o === "extra")
      continue;
    const a = n[o];
    e[o] = a;
  }
}
function Sw(n, t, e) {
  for (let i = 0; i < Cf.length; i++) {
    const s = Cf[i], r = Bg[s], o = t[s];
    o && (e[r[0]] = o[0], e[r[1]] = o[1]);
  }
  for (let i = 0; i < an.length; i++) {
    const s = an[i];
    t[s] != null && (e[s] = t[s]);
  }
}
function bw(n, t, e, i) {
  if (!e)
    return;
  const s = n.style;
  let r;
  if (s) {
    const o = e.transition, a = t.transition;
    if (o && !bi(o)) {
      const l = Vt(o);
      !r && (r = i.style = {});
      for (let c = 0; c < l.length; c++) {
        const h = l[c], u = s[h];
        r[h] = u;
      }
    } else if (n.getAnimationStyleProps && (bi(a) || bi(o) || Tt(a, "style") >= 0)) {
      const l = n.getAnimationStyleProps(), c = l ? l.style : null;
      if (c) {
        !r && (r = i.style = {});
        const h = mt(e);
        for (let u = 0; u < h.length; u++) {
          const f = h[u];
          if (c[f]) {
            const d = s[f];
            r[f] = d;
          }
        }
      }
    }
  }
}
function Tw(n, t, e) {
  const i = t.style;
  if (!n.isGroup && i) {
    if (e) {
      n.useStyle({});
      const s = n.animators;
      for (let r = 0; r < s.length; r++) {
        const o = s[r];
        o.targetName === "style" && o.changeTarget(n.style);
      }
    }
    n.setStyle(i);
  }
  t && (t.style = null, t && n.attr(t), t.style = i);
}
function Mw(n, t) {
  let e = Pi(n).leaveToProps;
  for (let i = 0; i < fc.length; i++) {
    const s = fc[i], r = s ? t[s] : t;
    r && r.leaveTo && (e || (e = Pi(n).leaveToProps = {}), s && (e[s] = e[s] || {}), R(
      s ? e[s] : e,
      r.leaveTo
    ));
  }
}
function Cw(n, t, e, i, s) {
  if (s) {
    const r = bh(
      "update",
      n,
      t,
      i,
      e
    );
    r.duration > 0 && n.animateFrom(s, r);
  }
}
function Dw(n, t) {
  hr(t, "silent") && (n.silent = t.silent), hr(t, "ignore") && (n.ignore = t.ignore), n instanceof zrender.Displayable && hr(t, "invisible") && (n.invisible = t.invisible), n instanceof zrender.Path && hr(t, "autoBatch") && (n.autoBatch = t.autoBatch);
}
function bi(n) {
  return n === "all";
}
function Iw(n, t) {
  return Xt(n) ? n !== t : n != null && isFinite(n);
}
const Ew = ft();
function Rw(n) {
  n.stopAnimation("keyframe"), n.attr(Ew(n));
}
const Aw = (void 0).extend({
  type: "triangle",
  shape: {
    cx: 0,
    cy: 0,
    width: 0,
    height: 0
  },
  buildPath: function(n, t) {
    const e = t.cx, i = t.cy, s = t.width / 2, r = t.height / 2;
    n.moveTo(e, i - r), n.lineTo(e + s, i + r), n.lineTo(e - s, i + r), n.closePath();
  }
}), Lw = (void 0).extend({
  type: "diamond",
  shape: {
    cx: 0,
    cy: 0,
    width: 0,
    height: 0
  },
  buildPath: function(n, t) {
    const e = t.cx, i = t.cy, s = t.width / 2, r = t.height / 2;
    n.moveTo(e, i - r), n.lineTo(e + s, i), n.lineTo(e, i + r), n.lineTo(e - s, i), n.closePath();
  }
}), Pw = (void 0).extend({
  type: "pin",
  shape: {
    // x, y on the cusp
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  buildPath: function(n, t) {
    const e = t.x, i = t.y, s = t.width / 5 * 3, r = Math.max(s, t.height), o = s / 2, a = o * o / (r - o), l = i - r + o + a, c = Math.asin(a / o), h = Math.cos(c) * o, u = Math.sin(c), f = Math.cos(c), d = o * 0.6, p = o * 0.7;
    n.moveTo(e - h, l + a), n.arc(e, l, o, Math.PI - c, Math.PI * 2 + c), n.bezierCurveTo(
      e + h - u * d,
      l + a + f * d,
      e,
      i - p,
      e,
      i
    ), n.bezierCurveTo(
      e,
      i - p,
      e - h + u * d,
      l + a + f * d,
      e - h,
      l + a
    ), n.closePath();
  }
}), kw = (void 0).extend({
  type: "arrow",
  shape: {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  buildPath: function(n, t) {
    const e = t.height, i = t.width, s = t.x, r = t.y, o = i / 3 * 2;
    n.moveTo(s, r), n.lineTo(s + o, r + e), n.lineTo(s, r + e / 4 * 3), n.lineTo(s - o, r + e), n.lineTo(s, r), n.closePath();
  }
}), Ow = {
  line: function(n, t, e, i, s) {
    s.x1 = n, s.y1 = t + i / 2, s.x2 = n + e, s.y2 = t + i / 2;
  },
  rect: function(n, t, e, i, s) {
    s.x = n, s.y = t, s.width = e, s.height = i;
  },
  roundRect: function(n, t, e, i, s) {
    s.x = n, s.y = t, s.width = e, s.height = i, s.r = Math.min(e, i) / 4;
  },
  square: function(n, t, e, i, s) {
    const r = Math.min(e, i);
    s.x = n, s.y = t, s.width = r, s.height = r;
  },
  circle: function(n, t, e, i, s) {
    s.cx = n + e / 2, s.cy = t + i / 2, s.r = Math.min(e, i) / 2;
  },
  diamond: function(n, t, e, i, s) {
    s.cx = n + e / 2, s.cy = t + i / 2, s.width = e, s.height = i;
  },
  pin: function(n, t, e, i, s) {
    s.x = n + e / 2, s.y = t + i / 2, s.width = e, s.height = i;
  },
  arrow: function(n, t, e, i, s) {
    s.x = n + e / 2, s.y = t + i / 2, s.width = e, s.height = i;
  },
  triangle: function(n, t, e, i, s) {
    s.cx = n + e / 2, s.cy = t + i / 2, s.width = e, s.height = i;
  }
}, Fw = {
  line: void 0,
  rect: void 0,
  roundRect: void 0,
  square: void 0,
  circle: void 0,
  diamond: Lw,
  pin: Pw,
  arrow: kw,
  triangle: Aw
}, Do = {};
et(Fw, function(n, t) {
  Do[t] = new n();
});
const Nw = (void 0).extend({
  type: "symbol",
  shape: {
    symbolType: "",
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  calculateTextPosition(n, t, e) {
    const i = Eg(n, t, e), s = this.shape;
    return s && s.symbolType === "pin" && t.position === "inside" && (i.y = e.y + e.height * 0.4), i;
  },
  buildPath(n, t, e) {
    let i = t.symbolType;
    if (i !== "none") {
      let s = Do[i];
      s || (i = "rect", s = Do[i]), Ow[i](
        t.x,
        t.y,
        t.width,
        t.height,
        s.shape
      ), s.buildPath(n, s.shape, e);
    }
  }
});
function zw(n, t) {
  if (this.type !== "image") {
    const e = this.style;
    this.__isEmptyBrush ? (e.stroke = n, e.fill = t || "#fff", e.lineWidth = 2) : this.shape.symbolType === "line" ? e.stroke = n : e.fill = n, this.markRedraw();
  }
}
function Io(n, t, e, i, s, r, o) {
  const a = n.indexOf("empty") === 0;
  a && (n = n.substr(5, 1).toLowerCase() + n.substr(6));
  let l;
  return n.indexOf("image://") === 0 ? l = Hx(
    n.slice(8),
    new Mt(t, e, i, s),
    o ? "center" : "cover"
  ) : n.indexOf("path://") === 0 ? l = Og(
    n.slice(7),
    {},
    new Mt(t, e, i, s),
    o ? "center" : "cover"
  ) : l = new Nw({
    shape: {
      symbolType: n,
      x: t,
      y: e,
      width: i,
      height: s
    }
  }), l.__isEmptyBrush = a, l.setColor = zw, r && l.setColor(r), l;
}
function Bw(n, t) {
  if (n != null)
    return Ei(n) || (n = [n, n]), [
      Ai(n[0], t[0]) || 0,
      Ai(Hl(n[1], n[0]), t[1]) || 0
    ];
}
function $i(n, t) {
  return n == null && (n = 0), t == null && (t = 0), [n, t];
}
function $w(n, t) {
  return (n[0] - t[0]) * (n[0] - t[0]) + (n[1] - t[1]) * (n[1] - t[1]);
}
const Ti = $w;
function Ef(n, t, e) {
  const i = t[0], s = t[1];
  return n[0] = e[0] * i + e[2] * s + e[4], n[1] = e[1] * i + e[3] * s + e[5], n;
}
function $g(n, t, e) {
  return n[0] = Math.min(t[0], e[0]), n[1] = Math.min(t[1], e[1]), n;
}
function Hg(n, t, e) {
  return n[0] = Math.max(t[0], e[0]), n[1] = Math.max(t[1], e[1]), n;
}
const Rf = Lp, Af = 5e-5;
function Dn(n) {
  return n > Af || n < -Af;
}
const In = [], ri = [], rl = go(), ol = Math.abs, As = class As {
  /**
   * Get computed local transform
   */
  getLocalTransform(t) {
    return As.getLocalTransform(this, t);
  }
  /**
   * Set position from array
   */
  setPosition(t) {
    this.x = t[0], this.y = t[1];
  }
  /**
   * Set scale from array
   */
  setScale(t) {
    this.scaleX = t[0], this.scaleY = t[1];
  }
  /**
   * Set skew from array
   */
  setSkew(t) {
    this.skewX = t[0], this.skewY = t[1];
  }
  /**
   * Set origin from array
   */
  setOrigin(t) {
    this.originX = t[0], this.originY = t[1];
  }
  /**
   * If needs to compute transform
   */
  needLocalTransform() {
    return Dn(this.rotation) || Dn(this.x) || Dn(this.y) || Dn(this.scaleX - 1) || Dn(this.scaleY - 1) || Dn(this.skewX) || Dn(this.skewY);
  }
  /**
   * Update global transform
   */
  updateTransform() {
    const t = this.parent && this.parent.transform, e = this.needLocalTransform();
    let i = this.transform;
    if (!(e || t)) {
      i && Rf(i);
      return;
    }
    i = i || go(), e ? this.getLocalTransform(i) : Rf(i), t && (e ? _s(i, t, i) : Km(i, t)), this.transform = i, this._resolveGlobalScaleRatio(i);
  }
  _resolveGlobalScaleRatio(t) {
    const e = this.globalScaleRatio;
    if (e != null && e !== 1) {
      this.getGlobalScale(In);
      const i = In[0] < 0 ? -1 : 1, s = In[1] < 0 ? -1 : 1, r = ((In[0] - i) * e + i) / In[0] || 0, o = ((In[1] - s) * e + s) / In[1] || 0;
      t[0] *= r, t[1] *= r, t[2] *= o, t[3] *= o;
    }
    this.invTransform = this.invTransform || go(), Qm(this.invTransform, t);
  }
  /**
   * Get computed global transform
   * NOTE: this method will force update transform on all ancestors.
   * Please be aware of the potential performance cost.
   */
  getComputedTransform() {
    let t = this;
    const e = [];
    for (; t; )
      e.push(t), t = t.parent;
    for (; t = e.pop(); )
      t.updateTransform();
    return this.transform;
  }
  setLocalTransform(t) {
    if (!t)
      return;
    let e = t[0] * t[0] + t[1] * t[1], i = t[2] * t[2] + t[3] * t[3];
    const s = Math.atan2(t[1], t[0]), r = Math.PI / 2 + s - Math.atan2(t[3], t[2]);
    i = Math.sqrt(i) * Math.cos(r), e = Math.sqrt(e), this.skewX = r, this.skewY = 0, this.rotation = -s, this.x = +t[4], this.y = +t[5], this.scaleX = e, this.scaleY = i, this.originX = 0, this.originY = 0;
  }
  /**
   * 分解`transform`矩阵到`position`, `rotation`, `scale`
   */
  decomposeTransform() {
    if (!this.transform)
      return;
    const t = this.parent;
    let e = this.transform;
    t && t.transform && (_s(ri, t.invTransform, e), e = ri);
    const i = this.originX, s = this.originY;
    (i || s) && (rl[4] = i, rl[5] = s, _s(ri, e, rl), ri[4] -= i, ri[5] -= s, e = ri), this.setLocalTransform(e);
  }
  /**
   * Get global scale
   */
  getGlobalScale(t) {
    const e = this.transform;
    return t = t || [], e ? (t[0] = Math.sqrt(e[0] * e[0] + e[1] * e[1]), t[1] = Math.sqrt(e[2] * e[2] + e[3] * e[3]), e[0] < 0 && (t[0] = -t[0]), e[3] < 0 && (t[1] = -t[1]), t) : (t[0] = 1, t[1] = 1, t);
  }
  /**
   * 变换坐标位置到 shape 的局部坐标空间
   */
  transformCoordToLocal(t, e) {
    const i = [t, e], s = this.invTransform;
    return s && Ef(i, i, s), i;
  }
  /**
   * 变换局部坐标位置到全局坐标空间
   */
  transformCoordToGlobal(t, e) {
    const i = [t, e], s = this.transform;
    return s && Ef(i, i, s), i;
  }
  getLineScale() {
    const t = this.transform;
    return t && ol(t[0] - 1) > 1e-10 && ol(t[3] - 1) > 1e-10 ? Math.sqrt(ol(t[0] * t[3] - t[2] * t[1])) : 1;
  }
  copyTransform(t) {
    Hw(this, t);
  }
  static getLocalTransform(t, e) {
    e = e || [];
    const i = t.originX || 0, s = t.originY || 0, r = t.scaleX, o = t.scaleY, a = t.anchorX, l = t.anchorY, c = t.rotation || 0, h = t.x, u = t.y, f = t.skewX ? Math.tan(t.skewX) : 0, d = t.skewY ? Math.tan(-t.skewY) : 0;
    if (i || s || a || l) {
      const p = i + a, _ = s + l;
      e[4] = -p * r - f * _ * o, e[5] = -_ * o - d * p * r;
    } else
      e[4] = e[5] = 0;
    return e[0] = r, e[3] = o, e[1] = d * r, e[2] = f * o, c && Pp(e, e, c), e[4] += i + h, e[5] += s + u, e;
  }
};
As.initDefaultProps = (function() {
  const t = As.prototype;
  t.scaleX = t.scaleY = t.globalScaleRatio = 1, t.x = t.y = t.originX = t.originY = t.skewX = t.skewY = t.rotation = t.anchorX = t.anchorY = 0;
})();
let Eo = As;
const Xs = [
  "x",
  "y",
  "originX",
  "originY",
  "anchorX",
  "anchorY",
  "rotation",
  "scaleX",
  "scaleY",
  "skewX",
  "skewY"
];
function Hw(n, t) {
  for (let e = 0; e < Xs.length; e++) {
    const i = Xs[e];
    n[i] = t[i];
  }
}
const Ts = {
  /**
  * @param {number} k
  * @return {number}
  */
  linear(n) {
    return n;
  },
  /**
  * @param {number} k
  * @return {number}
  */
  quadraticIn(n) {
    return n * n;
  },
  /**
  * @param {number} k
  * @return {number}
  */
  quadraticOut(n) {
    return n * (2 - n);
  },
  /**
  * @param {number} k
  * @return {number}
  */
  quadraticInOut(n) {
    return (n *= 2) < 1 ? 0.5 * n * n : -0.5 * (--n * (n - 2) - 1);
  },
  // 三次方的缓动（t^3）
  /**
  * @param {number} k
  * @return {number}
  */
  cubicIn(n) {
    return n * n * n;
  },
  /**
  * @param {number} k
  * @return {number}
  */
  cubicOut(n) {
    return --n * n * n + 1;
  },
  /**
  * @param {number} k
  * @return {number}
  */
  cubicInOut(n) {
    return (n *= 2) < 1 ? 0.5 * n * n * n : 0.5 * ((n -= 2) * n * n + 2);
  },
  // 四次方的缓动（t^4）
  /**
  * @param {number} k
  * @return {number}
  */
  quarticIn(n) {
    return n * n * n * n;
  },
  /**
  * @param {number} k
  * @return {number}
  */
  quarticOut(n) {
    return 1 - --n * n * n * n;
  },
  /**
  * @param {number} k
  * @return {number}
  */
  quarticInOut(n) {
    return (n *= 2) < 1 ? 0.5 * n * n * n * n : -0.5 * ((n -= 2) * n * n * n - 2);
  },
  // 五次方的缓动（t^5）
  /**
  * @param {number} k
  * @return {number}
  */
  quinticIn(n) {
    return n * n * n * n * n;
  },
  /**
  * @param {number} k
  * @return {number}
  */
  quinticOut(n) {
    return --n * n * n * n * n + 1;
  },
  /**
  * @param {number} k
  * @return {number}
  */
  quinticInOut(n) {
    return (n *= 2) < 1 ? 0.5 * n * n * n * n * n : 0.5 * ((n -= 2) * n * n * n * n + 2);
  },
  // 正弦曲线的缓动（sin(t)）
  /**
  * @param {number} k
  * @return {number}
  */
  sinusoidalIn(n) {
    return 1 - Math.cos(n * Math.PI / 2);
  },
  /**
  * @param {number} k
  * @return {number}
  */
  sinusoidalOut(n) {
    return Math.sin(n * Math.PI / 2);
  },
  /**
  * @param {number} k
  * @return {number}
  */
  sinusoidalInOut(n) {
    return 0.5 * (1 - Math.cos(Math.PI * n));
  },
  // 指数曲线的缓动（2^t）
  /**
  * @param {number} k
  * @return {number}
  */
  exponentialIn(n) {
    return n === 0 ? 0 : Math.pow(1024, n - 1);
  },
  /**
  * @param {number} k
  * @return {number}
  */
  exponentialOut(n) {
    return n === 1 ? 1 : 1 - Math.pow(2, -10 * n);
  },
  /**
  * @param {number} k
  * @return {number}
  */
  exponentialInOut(n) {
    return n === 0 ? 0 : n === 1 ? 1 : (n *= 2) < 1 ? 0.5 * Math.pow(1024, n - 1) : 0.5 * (-Math.pow(2, -10 * (n - 1)) + 2);
  },
  // 圆形曲线的缓动（sqrt(1-t^2)）
  /**
  * @param {number} k
  * @return {number}
  */
  circularIn(n) {
    return 1 - Math.sqrt(1 - n * n);
  },
  /**
  * @param {number} k
  * @return {number}
  */
  circularOut(n) {
    return Math.sqrt(1 - --n * n);
  },
  /**
  * @param {number} k
  * @return {number}
  */
  circularInOut(n) {
    return (n *= 2) < 1 ? -0.5 * (Math.sqrt(1 - n * n) - 1) : 0.5 * (Math.sqrt(1 - (n -= 2) * n) + 1);
  },
  // 创建类似于弹簧在停止前来回振荡的动画
  /**
  * @param {number} k
  * @return {number}
  */
  elasticIn(n) {
    let t, e = 0.1, i = 0.4;
    return n === 0 ? 0 : n === 1 ? 1 : (!e || e < 1 ? (e = 1, t = i / 4) : t = i * Math.asin(1 / e) / (2 * Math.PI), -(e * Math.pow(2, 10 * (n -= 1)) * Math.sin((n - t) * (2 * Math.PI) / i)));
  },
  /**
  * @param {number} k
  * @return {number}
  */
  elasticOut(n) {
    let t, e = 0.1, i = 0.4;
    return n === 0 ? 0 : n === 1 ? 1 : (!e || e < 1 ? (e = 1, t = i / 4) : t = i * Math.asin(1 / e) / (2 * Math.PI), e * Math.pow(2, -10 * n) * Math.sin((n - t) * (2 * Math.PI) / i) + 1);
  },
  /**
  * @param {number} k
  * @return {number}
  */
  elasticInOut(n) {
    let t, e = 0.1, i = 0.4;
    return n === 0 ? 0 : n === 1 ? 1 : (!e || e < 1 ? (e = 1, t = i / 4) : t = i * Math.asin(1 / e) / (2 * Math.PI), (n *= 2) < 1 ? -0.5 * (e * Math.pow(2, 10 * (n -= 1)) * Math.sin((n - t) * (2 * Math.PI) / i)) : e * Math.pow(2, -10 * (n -= 1)) * Math.sin((n - t) * (2 * Math.PI) / i) * 0.5 + 1);
  },
  // 在某一动画开始沿指示的路径进行动画处理前稍稍收回该动画的移动
  /**
  * @param {number} k
  * @return {number}
  */
  backIn(n) {
    let t = 1.70158;
    return n * n * ((t + 1) * n - t);
  },
  /**
  * @param {number} k
  * @return {number}
  */
  backOut(n) {
    let t = 1.70158;
    return --n * n * ((t + 1) * n + t) + 1;
  },
  /**
  * @param {number} k
  * @return {number}
  */
  backInOut(n) {
    let t = 2.5949095;
    return (n *= 2) < 1 ? 0.5 * (n * n * ((t + 1) * n - t)) : 0.5 * ((n -= 2) * n * ((t + 1) * n + t) + 2);
  },
  // 创建弹跳效果
  /**
  * @param {number} k
  * @return {number}
  */
  bounceIn(n) {
    return 1 - Ts.bounceOut(1 - n);
  },
  /**
  * @param {number} k
  * @return {number}
  */
  bounceOut(n) {
    return n < 1 / 2.75 ? 7.5625 * n * n : n < 2 / 2.75 ? 7.5625 * (n -= 1.5 / 2.75) * n + 0.75 : n < 2.5 / 2.75 ? 7.5625 * (n -= 2.25 / 2.75) * n + 0.9375 : 7.5625 * (n -= 2.625 / 2.75) * n + 0.984375;
  },
  /**
  * @param {number} k
  * @return {number}
  */
  bounceInOut(n) {
    return n < 0.5 ? Ts.bounceIn(n * 2) * 0.5 : Ts.bounceOut(n * 2 - 1) * 0.5 + 0.5;
  }
}, Or = Math.pow, sn = Math.sqrt, Ro = 1e-8, Gg = 1e-4, Lf = sn(3), Fr = 1 / 3, we = $i(), $t = $i(), Mi = $i();
function Je(n) {
  return n > -Ro && n < Ro;
}
function Yg(n) {
  return n > Ro || n < -Ro;
}
function bt(n, t, e, i, s) {
  const r = 1 - s;
  return r * r * (r * n + 3 * s * t) + s * s * (s * i + 3 * r * e);
}
function Wg(n, t, e, i, s, r) {
  const o = i + 3 * (t - e) - n, a = 3 * (e - t * 2 + n), l = 3 * (t - n), c = n - s, h = a * a - 3 * o * l, u = a * l - 9 * o * c, f = l * l - 3 * a * c;
  let d = 0;
  if (Je(h) && Je(u))
    if (Je(a))
      r[0] = 0;
    else {
      const p = -l / a;
      p >= 0 && p <= 1 && (r[d++] = p);
    }
  else {
    const p = u * u - 4 * h * f;
    if (Je(p)) {
      const _ = u / h, g = -a / o + _, m = -_ / 2;
      g >= 0 && g <= 1 && (r[d++] = g), m >= 0 && m <= 1 && (r[d++] = m);
    } else if (p > 0) {
      const _ = sn(p);
      let g = h * a + 1.5 * o * (-u + _), m = h * a + 1.5 * o * (-u - _);
      g < 0 ? g = -Or(-g, Fr) : g = Or(g, Fr), m < 0 ? m = -Or(-m, Fr) : m = Or(m, Fr);
      const y = (-a - (g + m)) / (3 * o);
      y >= 0 && y <= 1 && (r[d++] = y);
    } else {
      const _ = (2 * h * a - 3 * o * u) / (2 * sn(h * h * h)), g = Math.acos(_) / 3, m = sn(h), y = Math.cos(g), v = (-a - 2 * m * y) / (3 * o), S = (-a + m * (y + Lf * Math.sin(g))) / (3 * o), w = (-a + m * (y - Lf * Math.sin(g))) / (3 * o);
      v >= 0 && v <= 1 && (r[d++] = v), S >= 0 && S <= 1 && (r[d++] = S), w >= 0 && w <= 1 && (r[d++] = w);
    }
  }
  return d;
}
function Ug(n, t, e, i, s) {
  const r = 6 * e - 12 * t + 6 * n, o = 9 * t + 3 * i - 3 * n - 9 * e, a = 3 * t - 3 * n;
  let l = 0;
  if (Je(o)) {
    if (Yg(r)) {
      const c = -a / r;
      c >= 0 && c <= 1 && (s[l++] = c);
    }
  } else {
    const c = r * r - 4 * o * a;
    if (Je(c))
      s[0] = -r / (2 * o);
    else if (c > 0) {
      const h = sn(c), u = (-r + h) / (2 * o), f = (-r - h) / (2 * o);
      u >= 0 && u <= 1 && (s[l++] = u), f >= 0 && f <= 1 && (s[l++] = f);
    }
  }
  return l;
}
function Pf(n, t, e, i, s, r) {
  const o = (t - n) * s + n, a = (e - t) * s + t, l = (i - e) * s + e, c = (a - o) * s + o, h = (l - a) * s + a, u = (h - c) * s + c;
  r[0] = n, r[1] = o, r[2] = c, r[3] = u, r[4] = u, r[5] = h, r[6] = l, r[7] = i;
}
function Gw(n, t, e, i, s, r, o, a, l, c, h) {
  let u, f = 5e-3, d = 1 / 0, p, _, g, m;
  we[0] = l, we[1] = c;
  for (let y = 0; y < 1; y += 0.05)
    $t[0] = bt(n, e, s, o, y), $t[1] = bt(t, i, r, a, y), g = Ti(we, $t), g < d && (u = y, d = g);
  d = 1 / 0;
  for (let y = 0; y < 32 && !(f < Gg); y++)
    p = u - f, _ = u + f, $t[0] = bt(n, e, s, o, p), $t[1] = bt(t, i, r, a, p), g = Ti($t, we), p >= 0 && g < d ? (u = p, d = g) : (Mi[0] = bt(n, e, s, o, _), Mi[1] = bt(t, i, r, a, _), m = Ti(Mi, we), _ <= 1 && m < d ? (u = _, d = m) : f *= 0.5);
  return sn(d);
}
function Yw(n, t, e, i, s, r, o, a, l) {
  let c = n, h = t, u = 0;
  const f = 1 / l;
  for (let d = 1; d <= l; d++) {
    let p = d * f;
    const _ = bt(n, e, s, o, p), g = bt(t, i, r, a, p), m = _ - c, y = g - h;
    u += Math.sqrt(m * m + y * y), c = _, h = g;
  }
  return u;
}
function Ht(n, t, e, i) {
  const s = 1 - i;
  return s * (s * n + 2 * i * t) + i * i * e;
}
function Ww(n, t, e, i, s) {
  const r = n - 2 * t + e, o = 2 * (t - n), a = n - i;
  let l = 0;
  if (Je(r)) {
    if (Yg(o)) {
      const c = -a / o;
      c >= 0 && c <= 1 && (s[l++] = c);
    }
  } else {
    const c = o * o - 4 * r * a;
    if (Je(c)) {
      const h = -o / (2 * r);
      h >= 0 && h <= 1 && (s[l++] = h);
    } else if (c > 0) {
      const h = sn(c), u = (-o + h) / (2 * r), f = (-o - h) / (2 * r);
      u >= 0 && u <= 1 && (s[l++] = u), f >= 0 && f <= 1 && (s[l++] = f);
    }
  }
  return l;
}
function Vg(n, t, e) {
  const i = n + e - 2 * t;
  return i === 0 ? 0.5 : (n - t) / i;
}
function kf(n, t, e, i, s) {
  const r = (t - n) * i + n, o = (e - t) * i + t, a = (o - r) * i + r;
  s[0] = n, s[1] = r, s[2] = a, s[3] = a, s[4] = o, s[5] = e;
}
function Uw(n, t, e, i, s, r, o, a, l) {
  let c, h = 5e-3, u = 1 / 0;
  we[0] = o, we[1] = a;
  for (let f = 0; f < 1; f += 0.05) {
    $t[0] = Ht(n, e, s, f), $t[1] = Ht(t, i, r, f);
    const d = Ti(we, $t);
    d < u && (c = f, u = d);
  }
  u = 1 / 0;
  for (let f = 0; f < 32 && !(h < Gg); f++) {
    const d = c - h, p = c + h;
    $t[0] = Ht(n, e, s, d), $t[1] = Ht(t, i, r, d);
    const _ = Ti($t, we);
    if (d >= 0 && _ < u)
      c = d, u = _;
    else {
      Mi[0] = Ht(n, e, s, p), Mi[1] = Ht(t, i, r, p);
      const g = Ti(Mi, we);
      p <= 1 && g < u ? (c = p, u = g) : h *= 0.5;
    }
  }
  return sn(u);
}
function Vw(n, t, e, i, s, r, o) {
  let a = n, l = t, c = 0;
  const h = 1 / o;
  for (let u = 1; u <= o; u++) {
    let f = u * h;
    const d = Ht(n, e, s, f), p = Ht(t, i, r, f), _ = d - a, g = p - l;
    c += Math.sqrt(_ * _ + g * g), a = d, l = p;
  }
  return c;
}
const qw = /cubic-bezier\(([0-9,\.e ]+)\)/;
function qg(n) {
  const t = n && qw.exec(n);
  if (t) {
    const e = t[1].split(","), i = +rs(e[0]), s = +rs(e[1]), r = +rs(e[2]), o = +rs(e[3]);
    if (isNaN(i + s + r + o))
      return;
    const a = [];
    return (l) => l <= 0 ? 0 : l >= 1 ? 1 : Wg(0, i, r, 1, l, a) && bt(0, s, o, 1, a[0]);
  }
}
class Xw {
  constructor(t) {
    this._inited = !1, this._startTime = 0, this._pausedTime = 0, this._paused = !1, this._life = t.life || 1e3, this._delay = t.delay || 0, this.loop = t.loop || !1, this.onframe = t.onframe || Ca, this.ondestroy = t.ondestroy || Ca, this.onrestart = t.onrestart || Ca, t.easing && this.setEasing(t.easing);
  }
  step(t, e) {
    if (this._inited || (this._startTime = t + this._delay, this._inited = !0), this._paused) {
      this._pausedTime += e;
      return;
    }
    const i = this._life;
    let s = t - this._startTime - this._pausedTime, r = s / i;
    r < 0 && (r = 0), r = Math.min(r, 1);
    const o = this.easingFunc, a = o ? o(r) : r;
    if (this.onframe(a), r === 1)
      if (this.loop) {
        const l = s % i;
        this._startTime = t - l, this._pausedTime = 0, this.onrestart();
      } else
        return !0;
    return !1;
  }
  pause() {
    this._paused = !0;
  }
  resume() {
    this._paused = !1;
  }
  setEasing(t) {
    this.easing = t, this.easingFunc = Q(t) ? t : Ts[t] || qg(t);
  }
}
const Of = {
  transparent: [0, 0, 0, 0],
  aliceblue: [240, 248, 255, 1],
  antiquewhite: [250, 235, 215, 1],
  aqua: [0, 255, 255, 1],
  aquamarine: [127, 255, 212, 1],
  azure: [240, 255, 255, 1],
  beige: [245, 245, 220, 1],
  bisque: [255, 228, 196, 1],
  black: [0, 0, 0, 1],
  blanchedalmond: [255, 235, 205, 1],
  blue: [0, 0, 255, 1],
  blueviolet: [138, 43, 226, 1],
  brown: [165, 42, 42, 1],
  burlywood: [222, 184, 135, 1],
  cadetblue: [95, 158, 160, 1],
  chartreuse: [127, 255, 0, 1],
  chocolate: [210, 105, 30, 1],
  coral: [255, 127, 80, 1],
  cornflowerblue: [100, 149, 237, 1],
  cornsilk: [255, 248, 220, 1],
  crimson: [220, 20, 60, 1],
  cyan: [0, 255, 255, 1],
  darkblue: [0, 0, 139, 1],
  darkcyan: [0, 139, 139, 1],
  darkgoldenrod: [184, 134, 11, 1],
  darkgray: [169, 169, 169, 1],
  darkgreen: [0, 100, 0, 1],
  darkgrey: [169, 169, 169, 1],
  darkkhaki: [189, 183, 107, 1],
  darkmagenta: [139, 0, 139, 1],
  darkolivegreen: [85, 107, 47, 1],
  darkorange: [255, 140, 0, 1],
  darkorchid: [153, 50, 204, 1],
  darkred: [139, 0, 0, 1],
  darksalmon: [233, 150, 122, 1],
  darkseagreen: [143, 188, 143, 1],
  darkslateblue: [72, 61, 139, 1],
  darkslategray: [47, 79, 79, 1],
  darkslategrey: [47, 79, 79, 1],
  darkturquoise: [0, 206, 209, 1],
  darkviolet: [148, 0, 211, 1],
  deeppink: [255, 20, 147, 1],
  deepskyblue: [0, 191, 255, 1],
  dimgray: [105, 105, 105, 1],
  dimgrey: [105, 105, 105, 1],
  dodgerblue: [30, 144, 255, 1],
  firebrick: [178, 34, 34, 1],
  floralwhite: [255, 250, 240, 1],
  forestgreen: [34, 139, 34, 1],
  fuchsia: [255, 0, 255, 1],
  gainsboro: [220, 220, 220, 1],
  ghostwhite: [248, 248, 255, 1],
  gold: [255, 215, 0, 1],
  goldenrod: [218, 165, 32, 1],
  gray: [128, 128, 128, 1],
  green: [0, 128, 0, 1],
  greenyellow: [173, 255, 47, 1],
  grey: [128, 128, 128, 1],
  honeydew: [240, 255, 240, 1],
  hotpink: [255, 105, 180, 1],
  indianred: [205, 92, 92, 1],
  indigo: [75, 0, 130, 1],
  ivory: [255, 255, 240, 1],
  khaki: [240, 230, 140, 1],
  lavender: [230, 230, 250, 1],
  lavenderblush: [255, 240, 245, 1],
  lawngreen: [124, 252, 0, 1],
  lemonchiffon: [255, 250, 205, 1],
  lightblue: [173, 216, 230, 1],
  lightcoral: [240, 128, 128, 1],
  lightcyan: [224, 255, 255, 1],
  lightgoldenrodyellow: [250, 250, 210, 1],
  lightgray: [211, 211, 211, 1],
  lightgreen: [144, 238, 144, 1],
  lightgrey: [211, 211, 211, 1],
  lightpink: [255, 182, 193, 1],
  lightsalmon: [255, 160, 122, 1],
  lightseagreen: [32, 178, 170, 1],
  lightskyblue: [135, 206, 250, 1],
  lightslategray: [119, 136, 153, 1],
  lightslategrey: [119, 136, 153, 1],
  lightsteelblue: [176, 196, 222, 1],
  lightyellow: [255, 255, 224, 1],
  lime: [0, 255, 0, 1],
  limegreen: [50, 205, 50, 1],
  linen: [250, 240, 230, 1],
  magenta: [255, 0, 255, 1],
  maroon: [128, 0, 0, 1],
  mediumaquamarine: [102, 205, 170, 1],
  mediumblue: [0, 0, 205, 1],
  mediumorchid: [186, 85, 211, 1],
  mediumpurple: [147, 112, 219, 1],
  mediumseagreen: [60, 179, 113, 1],
  mediumslateblue: [123, 104, 238, 1],
  mediumspringgreen: [0, 250, 154, 1],
  mediumturquoise: [72, 209, 204, 1],
  mediumvioletred: [199, 21, 133, 1],
  midnightblue: [25, 25, 112, 1],
  mintcream: [245, 255, 250, 1],
  mistyrose: [255, 228, 225, 1],
  moccasin: [255, 228, 181, 1],
  navajowhite: [255, 222, 173, 1],
  navy: [0, 0, 128, 1],
  oldlace: [253, 245, 230, 1],
  olive: [128, 128, 0, 1],
  olivedrab: [107, 142, 35, 1],
  orange: [255, 165, 0, 1],
  orangered: [255, 69, 0, 1],
  orchid: [218, 112, 214, 1],
  palegoldenrod: [238, 232, 170, 1],
  palegreen: [152, 251, 152, 1],
  paleturquoise: [175, 238, 238, 1],
  palevioletred: [219, 112, 147, 1],
  papayawhip: [255, 239, 213, 1],
  peachpuff: [255, 218, 185, 1],
  peru: [205, 133, 63, 1],
  pink: [255, 192, 203, 1],
  plum: [221, 160, 221, 1],
  powderblue: [176, 224, 230, 1],
  purple: [128, 0, 128, 1],
  red: [255, 0, 0, 1],
  rosybrown: [188, 143, 143, 1],
  royalblue: [65, 105, 225, 1],
  saddlebrown: [139, 69, 19, 1],
  salmon: [250, 128, 114, 1],
  sandybrown: [244, 164, 96, 1],
  seagreen: [46, 139, 87, 1],
  seashell: [255, 245, 238, 1],
  sienna: [160, 82, 45, 1],
  silver: [192, 192, 192, 1],
  skyblue: [135, 206, 235, 1],
  slateblue: [106, 90, 205, 1],
  slategray: [112, 128, 144, 1],
  slategrey: [112, 128, 144, 1],
  snow: [255, 250, 250, 1],
  springgreen: [0, 255, 127, 1],
  steelblue: [70, 130, 180, 1],
  tan: [210, 180, 140, 1],
  teal: [0, 128, 128, 1],
  thistle: [216, 191, 216, 1],
  tomato: [255, 99, 71, 1],
  turquoise: [64, 224, 208, 1],
  violet: [238, 130, 238, 1],
  wheat: [245, 222, 179, 1],
  white: [255, 255, 255, 1],
  whitesmoke: [245, 245, 245, 1],
  yellow: [255, 255, 0, 1],
  yellowgreen: [154, 205, 50, 1]
};
function Ms(n) {
  return n = Math.round(n), n < 0 ? 0 : n > 255 ? 255 : n;
}
function Ff(n) {
  return n < 0 ? 0 : n > 1 ? 1 : n;
}
function al(n) {
  let t = n;
  return t.length && t.charAt(t.length - 1) === "%" ? Ms(parseFloat(t) / 100 * 255) : Ms(parseInt(t, 10));
}
function Cs(n) {
  let t = n;
  return t.length && t.charAt(t.length - 1) === "%" ? Ff(parseFloat(t) / 100) : Ff(parseFloat(t));
}
function ll(n, t, e) {
  return e < 0 ? e += 1 : e > 1 && (e -= 1), e * 6 < 1 ? n + (t - n) * e * 6 : e * 2 < 1 ? t : e * 3 < 2 ? n + (t - n) * (2 / 3 - e) * 6 : n;
}
function Lt(n, t, e, i, s) {
  return n[0] = t, n[1] = e, n[2] = i, n[3] = s, n;
}
function dc(n, t) {
  return n[0] = t[0], n[1] = t[1], n[2] = t[2], n[3] = t[3], n;
}
const Xg = new sr(20);
let Nr = null;
function oi(n, t) {
  Nr && dc(Nr, t), Nr = Xg.put(n, Nr || t.slice());
}
function Ci(n, t) {
  if (!n)
    return;
  t = t || [];
  let e = Xg.get(n);
  if (e)
    return dc(t, e);
  n = n + "";
  let i = n.replace(/ /g, "").toLowerCase();
  if (i in Of)
    return dc(t, Of[i]), oi(n, t), t;
  const s = i.length;
  if (i.charAt(0) === "#") {
    if (s === 4 || s === 5) {
      const a = parseInt(i.slice(1, 4), 16);
      if (!(a >= 0 && a <= 4095)) {
        Lt(t, 0, 0, 0, 1);
        return;
      }
      return Lt(
        t,
        (a & 3840) >> 4 | (a & 3840) >> 8,
        a & 240 | (a & 240) >> 4,
        a & 15 | (a & 15) << 4,
        s === 5 ? parseInt(i.slice(4), 16) / 15 : 1
      ), oi(n, t), t;
    } else if (s === 7 || s === 9) {
      const a = parseInt(i.slice(1, 7), 16);
      if (!(a >= 0 && a <= 16777215)) {
        Lt(t, 0, 0, 0, 1);
        return;
      }
      return Lt(
        t,
        (a & 16711680) >> 16,
        (a & 65280) >> 8,
        a & 255,
        s === 9 ? parseInt(i.slice(7), 16) / 255 : 1
      ), oi(n, t), t;
    }
    return;
  }
  let r = i.indexOf("("), o = i.indexOf(")");
  if (r !== -1 && o + 1 === s) {
    let a = i.substr(0, r), l = i.substr(r + 1, o - (r + 1)).split(","), c = 1;
    switch (a) {
      case "rgba":
        if (l.length !== 4)
          return l.length === 3 ? Lt(t, +l[0], +l[1], +l[2], 1) : Lt(t, 0, 0, 0, 1);
        c = Cs(l.pop());
      // jshint ignore:line
      // Fall through.
      case "rgb":
        if (l.length >= 3)
          return Lt(
            t,
            al(l[0]),
            al(l[1]),
            al(l[2]),
            l.length === 3 ? c : Cs(l[3])
          ), oi(n, t), t;
        Lt(t, 0, 0, 0, 1);
        return;
      case "hsla":
        if (l.length !== 4) {
          Lt(t, 0, 0, 0, 1);
          return;
        }
        return l[3] = Cs(l[3]), Nf(l, t), oi(n, t), t;
      case "hsl":
        if (l.length !== 3) {
          Lt(t, 0, 0, 0, 1);
          return;
        }
        return Nf(l, t), oi(n, t), t;
      default:
        return;
    }
  }
  Lt(t, 0, 0, 0, 1);
}
function Nf(n, t) {
  const e = (parseFloat(n[0]) % 360 + 360) % 360 / 360, i = Cs(n[1]), s = Cs(n[2]), r = s <= 0.5 ? s * (i + 1) : s + i - s * i, o = s * 2 - r;
  return t = t || [], Lt(
    t,
    Ms(ll(o, r, e + 1 / 3) * 255),
    Ms(ll(o, r, e) * 255),
    Ms(ll(o, r, e - 1 / 3) * 255),
    1
  ), n.length === 4 && (t[3] = n[3]), t;
}
function zf(n, t) {
  const e = Ci(n);
  if (e) {
    for (let i = 0; i < 3; i++)
      e[i] = e[i] * (1 - t) | 0, e[i] > 255 ? e[i] = 255 : e[i] < 0 && (e[i] = 0);
    return Zg(e, e.length === 4 ? "rgba" : "rgb");
  }
}
function Zg(n, t) {
  if (!n || !n.length)
    return;
  let e = n[0] + "," + n[1] + "," + n[2];
  return (t === "rgba" || t === "hsva" || t === "hsla") && (e += "," + n[3]), t + "(" + e + ")";
}
function Bf(n, t) {
  const e = Ci(n);
  return e ? (0.299 * e[0] + 0.587 * e[1] + 0.114 * e[2]) * e[3] / 255 + (1 - e[3]) * t : 0;
}
function Zw(n) {
  return n.type === "linear";
}
function Kw(n) {
  return n.type === "radial";
}
(function() {
  return te.hasGlobalWindow && Q(window.btoa) ? function(n) {
    return window.btoa(unescape(encodeURIComponent(n)));
  } : typeof Buffer != "undefined" ? function(n) {
    return Buffer.from(n).toString("base64");
  } : function(n) {
    return null;
  };
})();
const pc = Array.prototype.slice;
function Oe(n, t, e) {
  return (t - n) * e + n;
}
function cl(n, t, e, i) {
  const s = t.length;
  for (let r = 0; r < s; r++)
    n[r] = Oe(t[r], e[r], i);
  return n;
}
function jw(n, t, e, i) {
  const s = t.length, r = s && t[0].length;
  for (let o = 0; o < s; o++) {
    n[o] || (n[o] = []);
    for (let a = 0; a < r; a++)
      n[o][a] = Oe(t[o][a], e[o][a], i);
  }
  return n;
}
function zr(n, t, e, i) {
  const s = t.length;
  for (let r = 0; r < s; r++)
    n[r] = t[r] + e[r] * i;
  return n;
}
function $f(n, t, e, i) {
  const s = t.length, r = s && t[0].length;
  for (let o = 0; o < s; o++) {
    n[o] || (n[o] = []);
    for (let a = 0; a < r; a++)
      n[o][a] = t[o][a] + e[o][a] * i;
  }
  return n;
}
function Qw(n, t) {
  const e = n.length, i = t.length, s = e > i ? t : n, r = Math.min(e, i), o = s[r - 1] || { color: [0, 0, 0, 0], offset: 0 };
  for (let a = r; a < Math.max(e, i); a++)
    s.push({
      offset: o.offset,
      color: o.color.slice()
    });
}
function Jw(n, t, e) {
  let i = n, s = t;
  if (!i.push || !s.push)
    return;
  const r = i.length, o = s.length;
  if (r !== o)
    if (r > o)
      i.length = o;
    else
      for (let c = r; c < o; c++)
        i.push(e === 1 ? s[c] : pc.call(s[c]));
  const a = i[0] && i[0].length;
  for (let l = 0; l < i.length; l++)
    if (e === 1)
      isNaN(i[l]) && (i[l] = s[l]);
    else
      for (let c = 0; c < a; c++)
        isNaN(i[l][c]) && (i[l][c] = s[l][c]);
}
function so(n) {
  if (Ct(n)) {
    const t = n.length;
    if (Ct(n[0])) {
      const e = [];
      for (let i = 0; i < t; i++)
        e.push(pc.call(n[i]));
      return e;
    }
    return pc.call(n);
  }
  return n;
}
function ro(n) {
  return n[0] = Math.floor(n[0]) || 0, n[1] = Math.floor(n[1]) || 0, n[2] = Math.floor(n[2]) || 0, n[3] = n[3] == null ? 1 : n[3], "rgba(" + n.join(",") + ")";
}
function tS(n) {
  return Ct(n && n[0]) ? 2 : 1;
}
const Br = 0, oo = 1, Kg = 2, hs = 3, gc = 4, _c = 5, Hf = 6;
function Gf(n) {
  return n === gc || n === _c;
}
function $r(n) {
  return n === oo || n === Kg;
}
let ts = [0, 0, 0, 0];
class eS {
  constructor(t) {
    this.keyframes = [], this.discrete = !1, this._invalid = !1, this._needsSort = !1, this._lastFr = 0, this._lastFrP = 0, this.propName = t;
  }
  isFinished() {
    return this._finished;
  }
  setFinished() {
    this._finished = !0, this._additiveTrack && this._additiveTrack.setFinished();
  }
  needsAnimate() {
    return this.keyframes.length >= 1;
  }
  getAdditiveTrack() {
    return this._additiveTrack;
  }
  addKeyframe(t, e, i) {
    this._needsSort = !0;
    let s = this.keyframes, r = s.length, o = !1, a = Hf, l = e;
    if (Ct(e)) {
      let h = tS(e);
      a = h, (h === 1 && !Se(e[0]) || h === 2 && !Se(e[0][0])) && (o = !0);
    } else if (Se(e) && !zs(e))
      a = Br;
    else if (X(e))
      if (!isNaN(+e))
        a = Br;
      else {
        const h = Ci(e);
        h && (l = h, a = hs);
      }
    else if (dp(e)) {
      const h = N({}, l);
      h.colorStops = H(e.colorStops, (u) => ({
        offset: u.offset,
        color: Ci(u.color)
      })), Zw(e) ? a = gc : Kw(e) && (a = _c), l = h;
    }
    r === 0 ? this.valType = a : (a !== this.valType || a === Hf) && (o = !0), this.discrete = this.discrete || o;
    const c = {
      time: t,
      value: l,
      rawValue: e,
      percent: 0
    };
    return i && (c.easing = i, c.easingFunc = Q(i) ? i : Ts[i] || qg(i)), s.push(c), c;
  }
  prepare(t, e) {
    let i = this.keyframes;
    this._needsSort && i.sort(function(h, u) {
      return h.time - u.time;
    });
    const s = this.valType, r = i.length, o = i[r - 1], a = this.discrete, l = $r(s), c = Gf(s);
    for (let h = 0; h < r; h++) {
      const u = i[h], f = u.value, d = o.value;
      u.percent = u.time / t, a || (l && h !== r - 1 ? Jw(f, d, s) : c && Qw(
        f.colorStops,
        d.colorStops
      ));
    }
    if (!a && s !== _c && e && this.needsAnimate() && e.needsAnimate() && s === e.valType && !e._finished) {
      this._additiveTrack = e;
      const h = i[0].value;
      for (let u = 0; u < r; u++)
        s === Br ? i[u].additiveValue = i[u].value - h : s === hs ? i[u].additiveValue = zr([], i[u].value, h, -1) : $r(s) && (i[u].additiveValue = s === oo ? zr([], i[u].value, h, -1) : $f([], i[u].value, h, -1));
    }
  }
  step(t, e) {
    if (this._finished)
      return;
    this._additiveTrack && this._additiveTrack._finished && (this._additiveTrack = null);
    const i = this._additiveTrack != null, s = i ? "additiveValue" : "value", r = this.valType, o = this.keyframes, a = o.length, l = this.propName, c = r === hs;
    let h;
    const u = this._lastFr, f = Math.min;
    let d, p;
    if (a === 1)
      d = p = o[0];
    else {
      if (e < 0)
        h = 0;
      else if (e < this._lastFrP) {
        const y = f(u + 1, a - 1);
        for (h = y; h >= 0 && !(o[h].percent <= e); h--)
          ;
        h = f(h, a - 2);
      } else {
        for (h = u; h < a && !(o[h].percent > e); h++)
          ;
        h = f(h - 1, a - 2);
      }
      p = o[h + 1], d = o[h];
    }
    if (!(d && p))
      return;
    this._lastFr = h, this._lastFrP = e;
    const _ = p.percent - d.percent;
    let g = _ === 0 ? 1 : f((e - d.percent) / _, 1);
    p.easingFunc && (g = p.easingFunc(g));
    let m = i ? this._additiveValue : c ? ts : t[l];
    if (($r(r) || c) && !m && (m = this._additiveValue = []), this.discrete)
      t[l] = g < 1 ? d.rawValue : p.rawValue;
    else if ($r(r))
      r === oo ? cl(
        m,
        d[s],
        p[s],
        g
      ) : jw(
        m,
        d[s],
        p[s],
        g
      );
    else if (Gf(r)) {
      const y = d[s], v = p[s], S = r === gc;
      t[l] = {
        type: S ? "linear" : "radial",
        x: Oe(y.x, v.x, g),
        y: Oe(y.y, v.y, g),
        // TODO performance
        colorStops: H(y.colorStops, (w, x) => {
          const M = v.colorStops[x];
          return {
            offset: Oe(w.offset, M.offset, g),
            color: ro(cl(
              [],
              w.color,
              M.color,
              g
            ))
          };
        }),
        global: v.global
      }, S ? (t[l].x2 = Oe(
        y.x2,
        v.x2,
        g
      ), t[l].y2 = Oe(
        y.y2,
        v.y2,
        g
      )) : t[l].r = Oe(
        y.r,
        v.r,
        g
      );
    } else if (c)
      cl(
        m,
        d[s],
        p[s],
        g
      ), i || (t[l] = ro(m));
    else {
      const y = Oe(d[s], p[s], g);
      i ? this._additiveValue = y : t[l] = y;
    }
    i && this._addToTarget(t);
  }
  _addToTarget(t) {
    const e = this.valType, i = this.propName, s = this._additiveValue;
    e === Br ? t[i] = t[i] + s : e === hs ? (Ci(t[i], ts), zr(ts, ts, s, 1), t[i] = ro(ts)) : e === oo ? zr(t[i], t[i], s, 1) : e === Kg && $f(t[i], t[i], s, 1);
  }
}
class jg {
  constructor(t, e, i, s) {
    if (this._tracks = {}, this._trackKeys = [], this._maxTime = 0, this._started = 0, this._clip = null, this._target = t, this._loop = e, e && s) {
      fp("Can' use additive animation on looped animation.");
      return;
    }
    this._additiveAnimators = s, this._allowDiscrete = i;
  }
  getMaxTime() {
    return this._maxTime;
  }
  getDelay() {
    return this._delay;
  }
  getLoop() {
    return this._loop;
  }
  getTarget() {
    return this._target;
  }
  /**
   * Target can be changed during animation
   * For example if style is changed during state change.
   * We need to change target to the new style object.
   */
  changeTarget(t) {
    this._target = t;
  }
  /**
   * Set Animation keyframe
   * @param time time of keyframe in ms
   * @param props key-value props of keyframe.
   * @param easing
   */
  when(t, e, i) {
    return this.whenWithKeys(t, e, tt(e), i);
  }
  // Fast path for add keyframes of aniamteTo
  whenWithKeys(t, e, i, s) {
    const r = this._tracks;
    for (let o = 0; o < i.length; o++) {
      const a = i[o];
      let l = r[a];
      if (!l) {
        l = r[a] = new eS(a);
        let c;
        const h = this._getAdditiveTrack(a);
        if (h) {
          const u = h.keyframes, f = u[u.length - 1];
          c = f && f.value, h.valType === hs && c && (c = ro(c));
        } else
          c = this._target[a];
        if (c == null)
          continue;
        t > 0 && l.addKeyframe(0, so(c), s), this._trackKeys.push(a);
      }
      l.addKeyframe(t, so(e[a]), s);
    }
    return this._maxTime = Math.max(this._maxTime, t), this;
  }
  pause() {
    this._clip.pause(), this._paused = !0;
  }
  resume() {
    this._clip.resume(), this._paused = !1;
  }
  isPaused() {
    return !!this._paused;
  }
  /**
   * Set duration of animator.
   * Will run this duration regardless the track max time or if trackes exits.
   * @param duration
   * @returns
   */
  duration(t) {
    return this._maxTime = t, this._force = !0, this;
  }
  _doneCallback() {
    this._setTracksFinished(), this._clip = null;
    const t = this._doneCbs;
    if (t) {
      const e = t.length;
      for (let i = 0; i < e; i++)
        t[i].call(this);
    }
  }
  _abortedCallback() {
    this._setTracksFinished();
    const t = this.animation, e = this._abortedCbs;
    if (t && t.removeClip(this._clip), this._clip = null, e)
      for (let i = 0; i < e.length; i++)
        e[i].call(this);
  }
  _setTracksFinished() {
    const t = this._tracks, e = this._trackKeys;
    for (let i = 0; i < e.length; i++)
      t[e[i]].setFinished();
  }
  _getAdditiveTrack(t) {
    let e;
    const i = this._additiveAnimators;
    if (i)
      for (let s = 0; s < i.length; s++) {
        const r = i[s].getTrack(t);
        r && (e = r);
      }
    return e;
  }
  /**
   * Start the animation
   * @param easing
   * @return
   */
  start(t) {
    if (this._started > 0)
      return;
    this._started = 1;
    const e = this, i = [], s = this._maxTime || 0;
    for (let r = 0; r < this._trackKeys.length; r++) {
      const o = this._trackKeys[r], a = this._tracks[o], l = this._getAdditiveTrack(o), c = a.keyframes, h = c.length;
      if (a.prepare(s, l), a.needsAnimate())
        if (!this._allowDiscrete && a.discrete) {
          const u = c[h - 1];
          u && (e._target[a.propName] = u.rawValue), a.setFinished();
        } else
          i.push(a);
    }
    if (i.length || this._force) {
      const r = new Xw({
        life: s,
        loop: this._loop,
        delay: this._delay || 0,
        onframe(o) {
          e._started = 2;
          const a = e._additiveAnimators;
          if (a) {
            let c = !1;
            for (let h = 0; h < a.length; h++)
              if (a[h]._clip) {
                c = !0;
                break;
              }
            c || (e._additiveAnimators = null);
          }
          for (let c = 0; c < i.length; c++)
            i[c].step(e._target, o);
          const l = e._onframeCbs;
          if (l)
            for (let c = 0; c < l.length; c++)
              l[c](e._target, o);
        },
        ondestroy() {
          e._doneCallback();
        }
      });
      this._clip = r, this.animation && this.animation.addClip(r), t && r.setEasing(t);
    } else
      this._doneCallback();
    return this;
  }
  /**
   * Stop animation
   * @param {boolean} forwardToLast If move to last frame before stop
   */
  stop(t) {
    if (!this._clip)
      return;
    const e = this._clip;
    t && e.onframe(1), this._abortedCallback();
  }
  /**
   * Set when animation delay starts
   * @param time 单位ms
   */
  delay(t) {
    return this._delay = t, this;
  }
  /**
   * 添加动画每一帧的回调函数
   * @param callback
   */
  during(t) {
    return t && (this._onframeCbs || (this._onframeCbs = []), this._onframeCbs.push(t)), this;
  }
  /**
   * Add callback for animation end
   * @param cb
   */
  done(t) {
    return t && (this._doneCbs || (this._doneCbs = []), this._doneCbs.push(t)), this;
  }
  aborted(t) {
    return t && (this._abortedCbs || (this._abortedCbs = []), this._abortedCbs.push(t)), this;
  }
  getClip() {
    return this._clip;
  }
  getTrack(t) {
    return this._tracks[t];
  }
  getTracks() {
    return H(this._trackKeys, (t) => this._tracks[t]);
  }
  /**
   * Return true if animator is not available anymore.
   */
  stopTracks(t, e) {
    if (!t.length || !this._clip)
      return !0;
    const i = this._tracks, s = this._trackKeys;
    for (let o = 0; o < t.length; o++) {
      const a = i[t[o]];
      a && !a.isFinished() && (e ? a.step(this._target, 1) : this._started === 1 && a.step(this._target, 0), a.setFinished());
    }
    let r = !0;
    for (let o = 0; o < s.length; o++)
      if (!i[s[o]].isFinished()) {
        r = !1;
        break;
      }
    return r && this._abortedCallback(), r;
  }
  /**
   * Save values of final state to target.
   * It is mainly used in state mangement. When state is switching during animation.
   * We need to save final state of animation to the normal state. Not interpolated value.
   *
   * @param target
   * @param trackKeys
   * @param firstOrLast If save first frame or last frame
   */
  saveTo(t, e, i) {
    if (t) {
      e = e || this._trackKeys;
      for (let s = 0; s < e.length; s++) {
        const r = e[s], o = this._tracks[r];
        if (!o || o.isFinished())
          continue;
        const a = o.keyframes, l = a[i ? 0 : a.length - 1];
        l && (t[r] = so(l.rawValue));
      }
    }
  }
  // Change final value after animator has been started.
  // NOTE: Be careful to use it.
  __changeFinalValue(t, e) {
    e = e || tt(t);
    for (let i = 0; i < e.length; i++) {
      const s = e[i], r = this._tracks[s];
      if (!r)
        continue;
      const o = r.keyframes;
      if (o.length > 1) {
        const a = o.pop();
        r.addKeyframe(a.time, t[s]), r.prepare(this._maxTime, r.getAdditiveTrack());
      }
    }
  }
}
let Qg = 1;
te.hasGlobalWindow && (Qg = Math.max(
  window.devicePixelRatio || window.screen && window.screen.deviceXDPI / window.screen.logicalXDPI || 1,
  1
));
const Yf = Qg, nS = 0.4, mc = "#333", yc = "#ccc", iS = "#eee", Fe = 1, us = 2, di = 4, hl = "__zr_normal__", ul = Xs.concat(["ignore"]), sS = aa(Xs, (n, t) => (n[t] = !0, n), { ignore: !1 });
let ai = {}, rS = new Mt(0, 0, 0, 0);
const Xo = class Xo {
  constructor(t) {
    this.id = l0(), this.animators = [], this.currentStates = [], this.states = {}, this._init(t);
  }
  _init(t) {
    this.attr(t);
  }
  /**
   * Drift element
   * @param {number} dx dx on the global space
   * @param {number} dy dy on the global space
   */
  drift(t, e, i) {
    switch (this.draggable) {
      case "horizontal":
        e = 0;
        break;
      case "vertical":
        t = 0;
        break;
    }
    let s = this.transform;
    s || (s = this.transform = [1, 0, 0, 1, 0, 0]), s[4] += t, s[5] += e, this.decomposeTransform(), this.markRedraw();
  }
  /**
   * Hook before update
   */
  beforeUpdate() {
  }
  /**
   * Hook after update
   */
  afterUpdate() {
  }
  /**
   * Update each frame
   */
  update() {
    this.updateTransform(), this.__dirty && this.updateInnerText();
  }
  updateInnerText(t) {
    const e = this._textContent;
    if (e && (!e.ignore || t)) {
      this.textConfig || (this.textConfig = {});
      const i = this.textConfig, s = i.local, r = e.innerTransformable;
      let o, a, l = !1;
      r.parent = s ? this : null;
      let c = !1;
      if (r.copyTransform(e), i.position != null) {
        let g = rS;
        i.layoutRect ? g.copy(i.layoutRect) : g.copy(this.getBoundingRect()), s || g.applyTransform(this.transform), this.calculateTextPosition ? this.calculateTextPosition(ai, i, g) : T1(ai, i, g), r.x = ai.x, r.y = ai.y, o = ai.align, a = ai.verticalAlign;
        const m = i.origin;
        if (m && i.rotation != null) {
          let y, v;
          m === "center" ? (y = g.width * 0.5, v = g.height * 0.5) : (y = on(m[0], g.width), v = on(m[1], g.height)), c = !0, r.originX = -r.x + y + (s ? 0 : g.x), r.originY = -r.y + v + (s ? 0 : g.y);
        }
      }
      i.rotation != null && (r.rotation = i.rotation);
      const h = i.offset;
      h && (r.x += h[0], r.y += h[1], c || (r.originX = -h[0], r.originY = -h[1]));
      const u = i.inside == null ? typeof i.position == "string" && i.position.indexOf("inside") >= 0 : i.inside, f = this._innerTextDefaultStyle || (this._innerTextDefaultStyle = {});
      let d, p, _;
      u && this.canBeInsideText() ? (d = i.insideFill, p = i.insideStroke, (d == null || d === "auto") && (d = this.getInsideTextFill()), (p == null || p === "auto") && (p = this.getInsideTextStroke(d), _ = !0)) : (d = i.outsideFill, p = i.outsideStroke, (d == null || d === "auto") && (d = this.getOutsideFill()), (p == null || p === "auto") && (p = this.getOutsideStroke(d), _ = !0)), d = d || "#000", (d !== f.fill || p !== f.stroke || _ !== f.autoStroke || o !== f.align || a !== f.verticalAlign) && (l = !0, f.fill = d, f.stroke = p, f.autoStroke = _, f.align = o, f.verticalAlign = a, e.setDefaultTextStyle(f)), e.__dirty |= Fe, l && e.dirtyStyle(!0);
    }
  }
  canBeInsideText() {
    return !0;
  }
  getInsideTextFill() {
    return "#fff";
  }
  getInsideTextStroke(t) {
    return "#000";
  }
  getOutsideFill() {
    return this.__zr && this.__zr.isDarkMode() ? yc : mc;
  }
  getOutsideStroke(t) {
    const e = this.__zr && this.__zr.getBackgroundColor();
    let i = typeof e == "string" && Ci(e);
    i || (i = [255, 255, 255, 1]);
    const s = i[3], r = this.__zr.isDarkMode();
    for (let o = 0; o < 3; o++)
      i[o] = i[o] * s + (r ? 0 : 255) * (1 - s);
    return i[3] = 1, Zg(i, "rgba");
  }
  traverse(t, e) {
  }
  attrKV(t, e) {
    t === "textConfig" ? this.setTextConfig(e) : t === "textContent" ? this.setTextContent(e) : t === "clipPath" ? this.setClipPath(e) : t === "extra" ? (this.extra = this.extra || {}, N(this.extra, e)) : this[t] = e;
  }
  /**
   * Hide the element
   */
  hide() {
    this.ignore = !0, this.markRedraw();
  }
  /**
   * Show the element
   */
  show() {
    this.ignore = !1, this.markRedraw();
  }
  attr(t, e) {
    if (typeof t == "string")
      this.attrKV(t, e);
    else if (O(t)) {
      let s = tt(t);
      for (let r = 0; r < s.length; r++) {
        let o = s[r];
        this.attrKV(o, t[o]);
      }
    }
    return this.markRedraw(), this;
  }
  // Save current state to normal
  saveCurrentToNormalState(t) {
    this._innerSaveToNormal(t);
    const e = this._normalState;
    for (let i = 0; i < this.animators.length; i++) {
      const s = this.animators[i], r = s.__fromStateTransition;
      if (s.getLoop() || r && r !== hl)
        continue;
      const o = s.targetName, a = o ? e[o] : e;
      s.saveTo(a);
    }
  }
  _innerSaveToNormal(t) {
    let e = this._normalState;
    e || (e = this._normalState = {}), t.textConfig && !e.textConfig && (e.textConfig = this.textConfig), this._savePrimaryToNormal(t, e, ul);
  }
  _savePrimaryToNormal(t, e, i) {
    for (let s = 0; s < i.length; s++) {
      let r = i[s];
      t[r] != null && !(r in e) && (e[r] = this[r]);
    }
  }
  /**
   * If has any state.
   */
  hasState() {
    return this.currentStates.length > 0;
  }
  /**
   * Get state object
   */
  getState(t) {
    return this.states[t];
  }
  /**
   * Ensure state exists. If not, will create one and return.
   */
  ensureState(t) {
    const e = this.states;
    return e[t] || (e[t] = {}), e[t];
  }
  /**
   * Clear all states.
   */
  clearStates(t) {
    this.useState(hl, !1, t);
  }
  /**
   * Use state. State is a collection of properties.
   * Will return current state object if state exists and stateName has been changed.
   *
   * @param stateName State name to be switched to
   * @param keepCurrentState If keep current states.
   *      If not, it will inherit from the normal state.
   */
  useState(t, e, i, s) {
    const r = t === hl;
    if (!this.hasState() && r)
      return;
    const a = this.currentStates, l = this.stateTransition;
    if (st(a, t) >= 0 && (e || a.length === 1))
      return;
    let c;
    if (this.stateProxy && !r && (c = this.stateProxy(t)), c || (c = this.states && this.states[t]), !c && !r) {
      fp(`State ${t} not exists.`);
      return;
    }
    r || this.saveCurrentToNormalState(c);
    const h = !!(c && c.hoverLayer || s);
    h && this._toggleHoverLayerFlag(!0), this._applyStateObj(
      t,
      c,
      this._normalState,
      e,
      !i && !this.__inHover && l && l.duration > 0,
      l
    );
    const u = this._textContent, f = this._textGuide;
    return u && u.useState(t, e, i, h), f && f.useState(t, e, i, h), r ? (this.currentStates = [], this._normalState = {}) : e ? this.currentStates.push(t) : this.currentStates = [t], this._updateAnimationTargets(), this.markRedraw(), !h && this.__inHover && (this._toggleHoverLayerFlag(!1), this.__dirty &= ~Fe), c;
  }
  /**
   * Apply multiple states.
   * @param states States list.
   */
  useStates(t, e, i) {
    if (!t.length)
      this.clearStates();
    else {
      const s = [], r = this.currentStates, o = t.length;
      let a = o === r.length;
      if (a) {
        for (let p = 0; p < o; p++)
          if (t[p] !== r[p]) {
            a = !1;
            break;
          }
      }
      if (a)
        return;
      for (let p = 0; p < o; p++) {
        const _ = t[p];
        let g;
        this.stateProxy && (g = this.stateProxy(_, t)), g || (g = this.states[_]), g && s.push(g);
      }
      const l = s[o - 1], c = !!(l && l.hoverLayer || i);
      c && this._toggleHoverLayerFlag(!0);
      const h = this._mergeStates(s), u = this.stateTransition;
      this.saveCurrentToNormalState(h), this._applyStateObj(
        t.join(","),
        h,
        this._normalState,
        !1,
        !e && !this.__inHover && u && u.duration > 0,
        u
      );
      const f = this._textContent, d = this._textGuide;
      f && f.useStates(t, e, c), d && d.useStates(t, e, c), this._updateAnimationTargets(), this.currentStates = t.slice(), this.markRedraw(), !c && this.__inHover && (this._toggleHoverLayerFlag(!1), this.__dirty &= ~Fe);
    }
  }
  /**
   * Update animation targets when reference is changed.
   */
  _updateAnimationTargets() {
    for (let t = 0; t < this.animators.length; t++) {
      const e = this.animators[t];
      e.targetName && e.changeTarget(this[e.targetName]);
    }
  }
  /**
   * Remove state
   * @param state State to remove
   */
  removeState(t) {
    const e = st(this.currentStates, t);
    if (e >= 0) {
      const i = this.currentStates.slice();
      i.splice(e, 1), this.useStates(i);
    }
  }
  /**
   * Replace exists state.
   * @param oldState
   * @param newState
   * @param forceAdd If still add when even if replaced target not exists.
   */
  replaceState(t, e, i) {
    const s = this.currentStates.slice(), r = st(s, t), o = st(s, e) >= 0;
    r >= 0 ? o ? s.splice(r, 1) : s[r] = e : i && !o && s.push(e), this.useStates(s);
  }
  /**
   * Toogle state.
   */
  toggleState(t, e) {
    e ? this.useState(t, !0) : this.removeState(t);
  }
  _mergeStates(t) {
    const e = {};
    let i;
    for (let s = 0; s < t.length; s++) {
      const r = t[s];
      N(e, r), r.textConfig && (i = i || {}, N(i, r.textConfig));
    }
    return i && (e.textConfig = i), e;
  }
  _applyStateObj(t, e, i, s, r, o) {
    const a = !(e && s);
    e && e.textConfig ? (this.textConfig = N(
      {},
      s ? this.textConfig : i.textConfig
    ), N(this.textConfig, e.textConfig)) : a && i.textConfig && (this.textConfig = i.textConfig);
    const l = {};
    let c = !1;
    for (let h = 0; h < ul.length; h++) {
      const u = ul[h], f = r && sS[u];
      e && e[u] != null ? f ? (c = !0, l[u] = e[u]) : this[u] = e[u] : a && i[u] != null && (f ? (c = !0, l[u] = i[u]) : this[u] = i[u]);
    }
    if (!r)
      for (let h = 0; h < this.animators.length; h++) {
        const u = this.animators[h], f = u.targetName;
        u.getLoop() || u.__changeFinalValue(
          f ? (e || i)[f] : e || i
        );
      }
    c && this._transitionState(
      t,
      l,
      o
    );
  }
  /**
   * Component is some elements attached on this element for specific purpose.
   * Like clipPath, textContent
   */
  _attachComponent(t) {
    if (t.__zr && !t.__hostTarget || t === this)
      return;
    const e = this.__zr;
    e && t.addSelfToZr(e), t.__zr = e, t.__hostTarget = this;
  }
  _detachComponent(t) {
    t.__zr && t.removeSelfFromZr(t.__zr), t.__zr = null, t.__hostTarget = null;
  }
  /**
   * Get clip path
   */
  getClipPath() {
    return this._clipPath;
  }
  /**
   * Set clip path
   *
   * clipPath can't be shared between two elements.
   */
  setClipPath(t) {
    this._clipPath && this._clipPath !== t && this.removeClipPath(), this._attachComponent(t), this._clipPath = t, this.markRedraw();
  }
  /**
   * Remove clip path
   */
  removeClipPath() {
    const t = this._clipPath;
    t && (this._detachComponent(t), this._clipPath = null, this.markRedraw());
  }
  /**
   * Get attached text content.
   */
  getTextContent() {
    return this._textContent;
  }
  /**
   * Attach text on element
   */
  setTextContent(t) {
    const e = this._textContent;
    e !== t && (e && e !== t && this.removeTextContent(), t.innerTransformable = new Eo(), this._attachComponent(t), this._textContent = t, this.markRedraw());
  }
  /**
   * Set layout of attached text. Will merge with the previous.
   */
  setTextConfig(t) {
    this.textConfig || (this.textConfig = {}), N(this.textConfig, t), this.markRedraw();
  }
  /**
   * Remove text config
   */
  removeTextConfig() {
    this.textConfig = null, this.markRedraw();
  }
  /**
   * Remove attached text element.
   */
  removeTextContent() {
    const t = this._textContent;
    t && (t.innerTransformable = null, this._detachComponent(t), this._textContent = null, this._innerTextDefaultStyle = null, this.markRedraw());
  }
  getTextGuideLine() {
    return this._textGuide;
  }
  setTextGuideLine(t) {
    this._textGuide && this._textGuide !== t && this.removeTextGuideLine(), this._attachComponent(t), this._textGuide = t, this.markRedraw();
  }
  removeTextGuideLine() {
    const t = this._textGuide;
    t && (this._detachComponent(t), this._textGuide = null, this.markRedraw());
  }
  /**
   * Mark element needs to be repainted
   */
  markRedraw() {
    this.__dirty |= Fe;
    const t = this.__zr;
    t && (this.__inHover ? t.refreshHover() : t.refresh()), this.__hostTarget && this.__hostTarget.markRedraw();
  }
  /**
   * Besides marking elements to be refreshed.
   * It will also invalid all cache and doing recalculate next frame.
   */
  dirty() {
    this.markRedraw();
  }
  _toggleHoverLayerFlag(t) {
    this.__inHover = t;
    const e = this._textContent, i = this._textGuide;
    e && (e.__inHover = t), i && (i.__inHover = t);
  }
  /**
   * Add self from zrender instance.
   * Not recursively because it will be invoked when element added to storage.
   */
  addSelfToZr(t) {
    if (this.__zr === t)
      return;
    this.__zr = t;
    const e = this.animators;
    if (e)
      for (let i = 0; i < e.length; i++)
        t.animation.addAnimator(e[i]);
    this._clipPath && this._clipPath.addSelfToZr(t), this._textContent && this._textContent.addSelfToZr(t), this._textGuide && this._textGuide.addSelfToZr(t);
  }
  /**
   * Remove self from zrender instance.
   * Not recursively because it will be invoked when element added to storage.
   */
  removeSelfFromZr(t) {
    if (!this.__zr)
      return;
    this.__zr = null;
    const e = this.animators;
    if (e)
      for (let i = 0; i < e.length; i++)
        t.animation.removeAnimator(e[i]);
    this._clipPath && this._clipPath.removeSelfFromZr(t), this._textContent && this._textContent.removeSelfFromZr(t), this._textGuide && this._textGuide.removeSelfFromZr(t);
  }
  /**
   * 动画
   *
   * @param path The key to fetch value from object. Mostly style or shape.
   * @param loop Whether to loop animation.
   * @param allowDiscreteAnimation Whether to allow discrete animation
   * @example:
   *     el.animate('style', false)
   *         .when(1000, {x: 10} )
   *         .done(function(){ // Animation done })
   *         .start()
   */
  animate(t, e, i) {
    let s = t ? this[t] : this;
    const r = new jg(s, e, i);
    return t && (r.targetName = t), this.addAnimator(r, t), r;
  }
  addAnimator(t, e) {
    const i = this.__zr, s = this;
    t.during(function() {
      s.updateDuringAnimation(e);
    }).done(function() {
      const r = s.animators, o = st(r, t);
      o >= 0 && r.splice(o, 1);
    }), this.animators.push(t), i && i.animation.addAnimator(t), i && i.wakeUp();
  }
  updateDuringAnimation(t) {
    this.markRedraw();
  }
  /**
   * 停止动画
   * @param {boolean} forwardToLast If move to last frame before stop
   */
  stopAnimation(t, e) {
    const i = this.animators, s = i.length, r = [];
    for (let o = 0; o < s; o++) {
      const a = i[o];
      !t || t === a.scope ? a.stop(e) : r.push(a);
    }
    return this.animators = r, this;
  }
  /**
   * @param animationProps A map to specify which property to animate. If not specified, will animate all.
   * @example
   *  // Animate position
   *  el.animateTo({
   *      position: [10, 10]
   *  }, { done: () => { // done } })
   *
   *  // Animate shape, style and position in 100ms, delayed 100ms, with cubicOut easing
   *  el.animateTo({
   *      shape: {
   *          width: 500
   *      },
   *      style: {
   *          fill: 'red'
   *      }
   *      position: [10, 10]
   *  }, {
   *      duration: 100,
   *      delay: 100,
   *      easing: 'cubicOut',
   *      done: () => { // done }
   *  })
   */
  animateTo(t, e, i) {
    fl(this, t, e, i);
  }
  /**
   * Animate from the target state to current state.
   * The params and the value are the same as `this.animateTo`.
   */
  // Overload definitions
  animateFrom(t, e, i) {
    fl(this, t, e, i, !0);
  }
  _transitionState(t, e, i, s) {
    const r = fl(this, e, i, s);
    for (let o = 0; o < r.length; o++)
      r[o].__fromStateTransition = t;
  }
  /**
   * Interface of getting the minimum bounding box.
   */
  getBoundingRect() {
    return null;
  }
  getPaintRect() {
    return null;
  }
};
Xo.initDefaultProps = (function() {
  const t = Xo.prototype;
  t.type = "element", t.name = "", t.ignore = t.silent = t.isGroup = t.draggable = t.dragging = t.ignoreClip = t.__inHover = !1, t.__dirty = Fe;
  function e(i, s, r, o) {
    Object.defineProperty(t, i, {
      get() {
        if (!this[s]) {
          const l = this[s] = [];
          a(this, l);
        }
        return this[s];
      },
      set(l) {
        this[r] = l[0], this[o] = l[1], this[s] = l, a(this, l);
      }
    });
    function a(l, c) {
      Object.defineProperty(c, 0, {
        get() {
          return l[r];
        },
        set(h) {
          l[r] = h;
        }
      }), Object.defineProperty(c, 1, {
        get() {
          return l[o];
        },
        set(h) {
          l[o] = h;
        }
      });
    }
  }
  Object.defineProperty && (e("position", "_legacyPos", "x", "y"), e("scale", "_legacyScale", "scaleX", "scaleY"), e("origin", "_legacyOrigin", "originX", "originY"));
})();
let Zs = Xo;
Qc(Zs, er);
Qc(Zs, Eo);
function fl(n, t, e, i, s) {
  e = e || {};
  const r = [];
  Jg(
    n,
    "",
    n,
    t,
    e,
    i,
    r,
    s
  );
  let o = r.length, a = !1;
  const l = e.done, c = e.aborted, h = () => {
    a = !0, o--, o <= 0 && (a ? l && l() : c && c());
  }, u = () => {
    o--, o <= 0 && (a ? l && l() : c && c());
  };
  o || l && l(), r.length > 0 && e.during && r[0].during((f, d) => {
    e.during(d);
  });
  for (let f = 0; f < r.length; f++) {
    const d = r[f];
    h && d.done(h), u && d.aborted(u), e.force && d.duration(e.duration), d.start(e.easing);
  }
  return r;
}
function dl(n, t, e) {
  for (let i = 0; i < e; i++)
    n[i] = t[i];
}
function oS(n) {
  return Ct(n[0]);
}
function aS(n, t, e) {
  if (Ct(t[e]))
    if (Ct(n[e]) || (n[e] = []), Di(t[e])) {
      const i = t[e].length;
      n[e].length !== i && (n[e] = new t[e].constructor(i), dl(n[e], t[e], i));
    } else {
      const i = t[e], s = n[e], r = i.length;
      if (oS(i)) {
        const o = i[0].length;
        for (let a = 0; a < r; a++)
          s[a] ? dl(s[a], i[a], o) : s[a] = Array.prototype.slice.call(i[a]);
      } else
        dl(s, i, r);
      s.length = i.length;
    }
  else
    n[e] = t[e];
}
function lS(n, t) {
  return n === t || Ct(n) && Ct(t) && cS(n, t);
}
function cS(n, t) {
  const e = n.length;
  if (e !== t.length)
    return !1;
  for (let i = 0; i < e; i++)
    if (n[i] !== t[i])
      return !1;
  return !0;
}
function Jg(n, t, e, i, s, r, o, a) {
  const l = tt(i), c = s.duration, h = s.delay, u = s.additive, f = s.setToFinal, d = !O(r), p = n.animators;
  let _ = [];
  for (let m = 0; m < l.length; m++) {
    const y = l[m], v = i[y];
    if (v != null && e[y] != null && (d || r[y]))
      if (O(v) && !Ct(v) && !dp(v)) {
        if (t) {
          a || (e[y] = v, n.updateDuringAnimation(t));
          continue;
        }
        Jg(
          n,
          y,
          e[y],
          v,
          s,
          r && r[y],
          o,
          a
        );
      } else
        _.push(y);
    else a || (e[y] = v, n.updateDuringAnimation(t), _.push(y));
  }
  let g = _.length;
  if (!u && g)
    for (let m = 0; m < p.length; m++) {
      const y = p[m];
      if (y.targetName === t && y.stopTracks(_)) {
        const S = st(p, y);
        p.splice(S, 1);
      }
    }
  if (s.force || (_ = ne(_, (m) => !lS(i[m], e[m])), g = _.length), g > 0 || s.force && !o.length) {
    let m, y, v;
    if (a) {
      y = {}, f && (m = {});
      for (let w = 0; w < g; w++) {
        const x = _[w];
        y[x] = e[x], f ? m[x] = i[x] : e[x] = i[x];
      }
    } else if (f) {
      v = {};
      for (let w = 0; w < g; w++) {
        const x = _[w];
        v[x] = so(e[x]), aS(e, i, x);
      }
    }
    const S = new jg(e, !1, !1, u ? ne(
      // Use key string instead object reference because ref may be changed.
      p,
      (w) => w.targetName === t
    ) : null);
    S.targetName = t, s.scope && (S.scope = s.scope), f && m && S.whenWithKeys(0, m, _), v && S.whenWithKeys(0, v, _), S.whenWithKeys(
      c == null ? 500 : c,
      a ? y : i,
      _
    ).delay(h || 0), n.addAnimator(S, t), o.push(S);
  }
}
const vc = "__zr_style_" + Math.round(Math.random() * 10), Gn = {
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  shadowColor: "#000",
  opacity: 1,
  blend: "source-over"
}, Mh = {
  style: {
    shadowBlur: !0,
    shadowOffsetX: !0,
    shadowOffsetY: !0,
    shadowColor: !0,
    opacity: !0
  }
};
Gn[vc] = !0;
const Wf = ["z", "z2", "invisible"], hS = ["invisible"], Zo = class Zo extends Zs {
  constructor(t) {
    super(t);
  }
  _init(t) {
    const e = tt(t);
    for (let i = 0; i < e.length; i++) {
      const s = e[i];
      s === "style" ? this.useStyle(t[s]) : super.attrKV(s, t[s]);
    }
    this.style || this.useStyle({});
  }
  // Hook provided to developers.
  beforeBrush() {
  }
  afterBrush() {
  }
  // Hook provided to inherited classes.
  // Executed between beforeBrush / afterBrush
  innerBeforeBrush() {
  }
  innerAfterBrush() {
  }
  shouldBePainted(t, e, i, s) {
    const r = this.transform;
    if (this.ignore || this.invisible || this.style.opacity === 0 || this.culling && uS(this, t, e) || r && !r[0] && !r[3])
      return !1;
    if (i && this.__clipPaths) {
      for (let o = 0; o < this.__clipPaths.length; ++o)
        if (this.__clipPaths[o].isZeroArea())
          return !1;
    }
    if (s && this.parent) {
      let o = this.parent;
      for (; o; ) {
        if (o.ignore)
          return !1;
        o = o.parent;
      }
    }
    return !0;
  }
  /**
   * If displayable element contain coord x, y
   */
  contain(t, e) {
    return this.rectContain(t, e);
  }
  traverse(t, e) {
    t.call(e, this);
  }
  /**
   * If bounding rect of element contain coord x, y
   */
  rectContain(t, e) {
    const i = this.transformCoordToLocal(t, e);
    return this.getBoundingRect().contain(i[0], i[1]);
  }
  getPaintRect() {
    let t = this._paintRect;
    if (!this._paintRect || this.__dirty) {
      const e = this.transform, i = this.getBoundingRect(), s = this.style, r = s.shadowBlur || 0, o = s.shadowOffsetX || 0, a = s.shadowOffsetY || 0;
      t = this._paintRect || (this._paintRect = new Mt(0, 0, 0, 0)), e ? Mt.applyTransform(t, i, e) : t.copy(i), (r || o || a) && (t.width += r * 2 + Math.abs(o), t.height += r * 2 + Math.abs(a), t.x = Math.min(t.x, t.x + o - r), t.y = Math.min(t.y, t.y + a - r));
      const l = this.dirtyRectTolerance;
      t.isZero() || (t.x = Math.floor(t.x - l), t.y = Math.floor(t.y - l), t.width = Math.ceil(t.width + 1 + l * 2), t.height = Math.ceil(t.height + 1 + l * 2));
    }
    return t;
  }
  setPrevPaintRect(t) {
    t ? (this._prevPaintRect = this._prevPaintRect || new Mt(0, 0, 0, 0), this._prevPaintRect.copy(t)) : this._prevPaintRect = null;
  }
  getPrevPaintRect() {
    return this._prevPaintRect;
  }
  /**
   * Alias for animate('style')
   * @param loop
   */
  animateStyle(t) {
    return this.animate("style", t);
  }
  // Override updateDuringAnimation
  updateDuringAnimation(t) {
    t === "style" ? this.dirtyStyle() : this.markRedraw();
  }
  attrKV(t, e) {
    t !== "style" ? super.attrKV(t, e) : this.style ? this.setStyle(e) : this.useStyle(e);
  }
  setStyle(t, e) {
    return typeof t == "string" ? this.style[t] = e : N(this.style, t), this.dirtyStyle(), this;
  }
  // getDefaultStyleValue<T extends keyof Props['style']>(key: T): Props['style'][T] {
  //     // Default value is on the prototype.
  //     return this.style.prototype[key];
  // }
  dirtyStyle(t) {
    t || this.markRedraw(), this.__dirty |= us, this._rect && (this._rect = null);
  }
  dirty() {
    this.dirtyStyle();
  }
  /**
   * Is style changed. Used with dirtyStyle.
   */
  styleChanged() {
    return !!(this.__dirty & us);
  }
  /**
   * Mark style updated. Only useful when style is used for caching. Like in the text.
   */
  styleUpdated() {
    this.__dirty &= ~us;
  }
  /**
   * Create a style object with default values in it's prototype.
   */
  createStyle(t) {
    return ca(Gn, t);
  }
  /**
   * Replace style property.
   * It will create a new style if given obj is not a valid style object.
   */
  // PENDING should not createStyle if it's an style object.
  useStyle(t) {
    t[vc] || (t = this.createStyle(t)), this.__inHover ? this.__hoverStyle = t : this.style = t, this.dirtyStyle();
  }
  /**
   * Determine if an object is a valid style object.
   * Which means it is created by `createStyle.`
   *
   * A valid style object will have all default values in it's prototype.
   * To avoid get null/undefined values.
   */
  isStyleObject(t) {
    return t[vc];
  }
  _innerSaveToNormal(t) {
    super._innerSaveToNormal(t);
    const e = this._normalState;
    t.style && !e.style && (e.style = this._mergeStyle(this.createStyle(), this.style)), this._savePrimaryToNormal(t, e, Wf);
  }
  _applyStateObj(t, e, i, s, r, o) {
    super._applyStateObj(t, e, i, s, r, o);
    const a = !(e && s);
    let l;
    if (e && e.style ? r ? s ? l = e.style : (l = this._mergeStyle(this.createStyle(), i.style), this._mergeStyle(l, e.style)) : (l = this._mergeStyle(
      this.createStyle(),
      s ? this.style : i.style
    ), this._mergeStyle(l, e.style)) : a && (l = i.style), l)
      if (r) {
        const h = this.style;
        if (this.style = this.createStyle(a ? {} : h), a) {
          const f = tt(h);
          for (let d = 0; d < f.length; d++) {
            const p = f[d];
            p in l && (l[p] = l[p], this.style[p] = h[p]);
          }
        }
        const u = tt(l);
        for (let f = 0; f < u.length; f++) {
          const d = u[f];
          this.style[d] = this.style[d];
        }
        this._transitionState(t, {
          style: l
        }, o, this.getAnimationStyleProps());
      } else
        this.useStyle(l);
    const c = this.__inHover ? hS : Wf;
    for (let h = 0; h < c.length; h++) {
      let u = c[h];
      e && e[u] != null ? this[u] = e[u] : a && i[u] != null && (this[u] = i[u]);
    }
  }
  _mergeStates(t) {
    const e = super._mergeStates(t);
    let i;
    for (let s = 0; s < t.length; s++) {
      const r = t[s];
      r.style && (i = i || {}, this._mergeStyle(i, r.style));
    }
    return i && (e.style = i), e;
  }
  _mergeStyle(t, e) {
    return N(t, e), t;
  }
  getAnimationStyleProps() {
    return Mh;
  }
};
Zo.initDefaultProps = (function() {
  const t = Zo.prototype;
  t.type = "displayable", t.invisible = !1, t.z = 0, t.z2 = 0, t.zlevel = 0, t.culling = !1, t.cursor = "pointer", t.rectHover = !1, t.incremental = !1, t._rect = null, t.dirtyRectTolerance = 0, t.__dirty = Fe | us;
})();
let Ks = Zo;
const pl = new Mt(0, 0, 0, 0), gl = new Mt(0, 0, 0, 0);
function uS(n, t, e) {
  return pl.copy(n.getBoundingRect()), n.transform && pl.applyTransform(n.transform), gl.width = t, gl.height = e, !pl.intersect(gl);
}
const Gt = Math.min, Yt = Math.max, _l = Math.sin, ml = Math.cos, En = Math.PI * 2, Hr = $i(), Gr = $i(), Yr = $i();
function Uf(n, t, e, i, s, r) {
  s[0] = Gt(n, e), s[1] = Gt(t, i), r[0] = Yt(n, e), r[1] = Yt(t, i);
}
const Vf = [], qf = [];
function fS(n, t, e, i, s, r, o, a, l, c) {
  const h = Ug, u = bt;
  let f = h(n, e, s, o, Vf);
  l[0] = 1 / 0, l[1] = 1 / 0, c[0] = -1 / 0, c[1] = -1 / 0;
  for (let d = 0; d < f; d++) {
    const p = u(n, e, s, o, Vf[d]);
    l[0] = Gt(p, l[0]), c[0] = Yt(p, c[0]);
  }
  f = h(t, i, r, a, qf);
  for (let d = 0; d < f; d++) {
    const p = u(t, i, r, a, qf[d]);
    l[1] = Gt(p, l[1]), c[1] = Yt(p, c[1]);
  }
  l[0] = Gt(n, l[0]), c[0] = Yt(n, c[0]), l[0] = Gt(o, l[0]), c[0] = Yt(o, c[0]), l[1] = Gt(t, l[1]), c[1] = Yt(t, c[1]), l[1] = Gt(a, l[1]), c[1] = Yt(a, c[1]);
}
function dS(n, t, e, i, s, r, o, a) {
  const l = Vg, c = Ht, h = Yt(
    Gt(l(n, e, s), 1),
    0
  ), u = Yt(
    Gt(l(t, i, r), 1),
    0
  ), f = c(n, e, s, h), d = c(t, i, r, u);
  o[0] = Gt(n, s, f), o[1] = Gt(t, r, d), a[0] = Yt(n, s, f), a[1] = Yt(t, r, d);
}
function pS(n, t, e, i, s, r, o, a, l) {
  const c = $g, h = Hg, u = Math.abs(s - r);
  if (u % En < 1e-4 && u > 1e-4) {
    a[0] = n - e, a[1] = t - i, l[0] = n + e, l[1] = t + i;
    return;
  }
  if (Hr[0] = ml(s) * e + n, Hr[1] = _l(s) * i + t, Gr[0] = ml(r) * e + n, Gr[1] = _l(r) * i + t, c(a, Hr, Gr), h(l, Hr, Gr), s = s % En, s < 0 && (s = s + En), r = r % En, r < 0 && (r = r + En), s > r && !o ? r += En : s < r && o && (s += En), o) {
    const f = r;
    r = s, s = f;
  }
  for (let f = 0; f < r; f += Math.PI / 2)
    f > s && (Yr[0] = ml(f) * e + n, Yr[1] = _l(f) * i + t, c(a, Yr, a), h(l, Yr, l));
}
const B = {
  M: 1,
  L: 2,
  C: 3,
  Q: 4,
  A: 5,
  Z: 6,
  // Rect
  R: 7
}, Rn = [], An = [], pe = [], Ve = [], ge = [], _e = [], yl = Math.min, vl = Math.max, Ln = Math.cos, Pn = Math.sin, Ae = Math.abs, xc = Math.PI, Ke = xc * 2, xl = typeof Float32Array != "undefined", es = [];
function wl(n) {
  return Math.round(n / xc * 1e8) / 1e8 % 2 * xc;
}
function gS(n, t) {
  let e = wl(n[0]);
  e < 0 && (e += Ke);
  let i = e - n[0], s = n[1];
  s += i, !t && s - e >= Ke ? s = e + Ke : t && e - s >= Ke ? s = e - Ke : !t && e > s ? s = e + (Ke - wl(e - s)) : t && e < s && (s = e - (Ke - wl(s - e))), n[0] = e, n[1] = s;
}
const _i = class _i {
  constructor(t) {
    this.dpr = 1, this._xi = 0, this._yi = 0, this._x0 = 0, this._y0 = 0, this._len = 0, t && (this._saveData = !1), this._saveData && (this.data = []);
  }
  increaseVersion() {
    this._version++;
  }
  /**
   * Version can be used outside for compare if the path is changed.
   * For example to determine if need to update svg d str in svg renderer.
   */
  getVersion() {
    return this._version;
  }
  /**
   * @readOnly
   */
  setScale(t, e, i) {
    i = i || 0, i > 0 && (this._ux = Ae(i / Yf / t) || 0, this._uy = Ae(i / Yf / e) || 0);
  }
  setDPR(t) {
    this.dpr = t;
  }
  setContext(t) {
    this._ctx = t;
  }
  getContext() {
    return this._ctx;
  }
  beginPath() {
    return this._ctx && this._ctx.beginPath(), this.reset(), this;
  }
  /**
   * Reset path data.
   */
  reset() {
    this._saveData && (this._len = 0), this._pathSegLen && (this._pathSegLen = null, this._pathLen = 0), this._version++;
  }
  moveTo(t, e) {
    return this._drawPendingPt(), this.addData(B.M, t, e), this._ctx && this._ctx.moveTo(t, e), this._x0 = t, this._y0 = e, this._xi = t, this._yi = e, this;
  }
  lineTo(t, e) {
    const i = Ae(t - this._xi), s = Ae(e - this._yi), r = i > this._ux || s > this._uy;
    if (this.addData(B.L, t, e), this._ctx && r && this._ctx.lineTo(t, e), r)
      this._xi = t, this._yi = e, this._pendingPtDist = 0;
    else {
      const o = i * i + s * s;
      o > this._pendingPtDist && (this._pendingPtX = t, this._pendingPtY = e, this._pendingPtDist = o);
    }
    return this;
  }
  bezierCurveTo(t, e, i, s, r, o) {
    return this._drawPendingPt(), this.addData(B.C, t, e, i, s, r, o), this._ctx && this._ctx.bezierCurveTo(t, e, i, s, r, o), this._xi = r, this._yi = o, this;
  }
  quadraticCurveTo(t, e, i, s) {
    return this._drawPendingPt(), this.addData(B.Q, t, e, i, s), this._ctx && this._ctx.quadraticCurveTo(t, e, i, s), this._xi = i, this._yi = s, this;
  }
  arc(t, e, i, s, r, o) {
    this._drawPendingPt(), es[0] = s, es[1] = r, gS(es, o), s = es[0], r = es[1];
    let a = r - s;
    return this.addData(
      B.A,
      t,
      e,
      i,
      i,
      s,
      a,
      0,
      o ? 0 : 1
    ), this._ctx && this._ctx.arc(t, e, i, s, r, o), this._xi = Ln(r) * i + t, this._yi = Pn(r) * i + e, this;
  }
  // TODO
  arcTo(t, e, i, s, r) {
    return this._drawPendingPt(), this._ctx && this._ctx.arcTo(t, e, i, s, r), this;
  }
  // TODO
  rect(t, e, i, s) {
    return this._drawPendingPt(), this._ctx && this._ctx.rect(t, e, i, s), this.addData(B.R, t, e, i, s), this;
  }
  closePath() {
    this._drawPendingPt(), this.addData(B.Z);
    const t = this._ctx, e = this._x0, i = this._y0;
    return t && t.closePath(), this._xi = e, this._yi = i, this;
  }
  fill(t) {
    t && t.fill(), this.toStatic();
  }
  stroke(t) {
    t && t.stroke(), this.toStatic();
  }
  len() {
    return this._len;
  }
  setData(t) {
    const e = t.length;
    !(this.data && this.data.length === e) && xl && (this.data = new Float32Array(e));
    for (let i = 0; i < e; i++)
      this.data[i] = t[i];
    this._len = e;
  }
  appendPath(t) {
    t instanceof Array || (t = [t]);
    const e = t.length;
    let i = 0, s = this._len;
    for (let r = 0; r < e; r++)
      i += t[r].len();
    xl && this.data instanceof Float32Array && (this.data = new Float32Array(s + i));
    for (let r = 0; r < e; r++) {
      const o = t[r].data;
      for (let a = 0; a < o.length; a++)
        this.data[s++] = o[a];
    }
    this._len = s;
  }
  /**
   * 填充 Path 数据。
   * 尽量复用而不申明新的数组。大部分图形重绘的指令数据长度都是不变的。
   */
  addData(t, e, i, s, r, o, a, l, c) {
    if (!this._saveData)
      return;
    let h = this.data;
    this._len + arguments.length > h.length && (this._expandData(), h = this.data);
    for (let u = 0; u < arguments.length; u++)
      h[this._len++] = arguments[u];
  }
  _drawPendingPt() {
    this._pendingPtDist > 0 && (this._ctx && this._ctx.lineTo(this._pendingPtX, this._pendingPtY), this._pendingPtDist = 0);
  }
  _expandData() {
    if (!(this.data instanceof Array)) {
      const t = [];
      for (let e = 0; e < this._len; e++)
        t[e] = this.data[e];
      this.data = t;
    }
  }
  /**
   * Convert dynamic array to static Float32Array
   *
   * It will still use a normal array if command buffer length is less than 10
   * Because Float32Array itself may take more memory than a normal array.
   *
   * 10 length will make sure at least one M command and one A(arc) command.
   */
  toStatic() {
    if (!this._saveData)
      return;
    this._drawPendingPt();
    const t = this.data;
    t instanceof Array && (t.length = this._len, xl && this._len > 11 && (this.data = new Float32Array(t)));
  }
  getBoundingRect() {
    pe[0] = pe[1] = ge[0] = ge[1] = Number.MAX_VALUE, Ve[0] = Ve[1] = _e[0] = _e[1] = -Number.MAX_VALUE;
    const t = this.data;
    let e = 0, i = 0, s = 0, r = 0, o;
    for (o = 0; o < this._len; ) {
      const a = t[o++], l = o === 1;
      switch (l && (e = t[o], i = t[o + 1], s = e, r = i), a) {
        case B.M:
          e = s = t[o++], i = r = t[o++], ge[0] = s, ge[1] = r, _e[0] = s, _e[1] = r;
          break;
        case B.L:
          Uf(e, i, t[o], t[o + 1], ge, _e), e = t[o++], i = t[o++];
          break;
        case B.C:
          fS(
            e,
            i,
            t[o++],
            t[o++],
            t[o++],
            t[o++],
            t[o],
            t[o + 1],
            ge,
            _e
          ), e = t[o++], i = t[o++];
          break;
        case B.Q:
          dS(
            e,
            i,
            t[o++],
            t[o++],
            t[o],
            t[o + 1],
            ge,
            _e
          ), e = t[o++], i = t[o++];
          break;
        case B.A:
          const c = t[o++], h = t[o++], u = t[o++], f = t[o++], d = t[o++], p = t[o++] + d;
          o += 1;
          const _ = !t[o++];
          l && (s = Ln(d) * u + c, r = Pn(d) * f + h), pS(
            c,
            h,
            u,
            f,
            d,
            p,
            _,
            ge,
            _e
          ), e = Ln(p) * u + c, i = Pn(p) * f + h;
          break;
        case B.R:
          s = e = t[o++], r = i = t[o++];
          const g = t[o++], m = t[o++];
          Uf(s, r, s + g, r + m, ge, _e);
          break;
        case B.Z:
          e = s, i = r;
          break;
      }
      $g(pe, pe, ge), Hg(Ve, Ve, _e);
    }
    return o === 0 && (pe[0] = pe[1] = Ve[0] = Ve[1] = 0), new Mt(
      pe[0],
      pe[1],
      Ve[0] - pe[0],
      Ve[1] - pe[1]
    );
  }
  _calculateLength() {
    const t = this.data, e = this._len, i = this._ux, s = this._uy;
    let r = 0, o = 0, a = 0, l = 0;
    this._pathSegLen || (this._pathSegLen = []);
    const c = this._pathSegLen;
    let h = 0, u = 0;
    for (let f = 0; f < e; ) {
      const d = t[f++], p = f === 1;
      p && (r = t[f], o = t[f + 1], a = r, l = o);
      let _ = -1;
      switch (d) {
        case B.M:
          r = a = t[f++], o = l = t[f++];
          break;
        case B.L: {
          const M = t[f++], b = t[f++], T = M - r, I = b - o;
          (Ae(T) > i || Ae(I) > s || f === e - 1) && (_ = Math.sqrt(T * T + I * I), r = M, o = b);
          break;
        }
        case B.C: {
          const M = t[f++], b = t[f++], T = t[f++], I = t[f++], C = t[f++], E = t[f++];
          _ = Yw(r, o, M, b, T, I, C, E, 10), r = C, o = E;
          break;
        }
        case B.Q: {
          const M = t[f++], b = t[f++], T = t[f++], I = t[f++];
          _ = Vw(r, o, M, b, T, I, 10), r = T, o = I;
          break;
        }
        case B.A:
          const g = t[f++], m = t[f++], y = t[f++], v = t[f++], S = t[f++];
          let w = t[f++];
          const x = w + S;
          f += 1, t[f++], p && (a = Ln(S) * y + g, l = Pn(S) * v + m), _ = vl(y, v) * yl(Ke, Math.abs(w)), r = Ln(x) * y + g, o = Pn(x) * v + m;
          break;
        case B.R: {
          a = r = t[f++], l = o = t[f++];
          const M = t[f++], b = t[f++];
          _ = M * 2 + b * 2;
          break;
        }
        case B.Z: {
          const M = a - r, b = l - o;
          _ = Math.sqrt(M * M + b * b), r = a, o = l;
          break;
        }
      }
      _ >= 0 && (c[u++] = _, h += _);
    }
    return this._pathLen = h, h;
  }
  /**
   * Rebuild path from current data
   * Rebuild path will not consider javascript implemented line dash.
   * @param {CanvasRenderingContext2D} ctx
   */
  rebuildPath(t, e) {
    const i = this.data, s = this._ux, r = this._uy, o = this._len;
    let a, l, c, h, u, f;
    const d = e < 1;
    let p, _, g = 0, m = 0, y, v = 0, S, w;
    if (!(d && (this._pathSegLen || this._calculateLength(), p = this._pathSegLen, _ = this._pathLen, y = e * _, !y)))
      t: for (let x = 0; x < o; ) {
        const M = i[x++], b = x === 1;
        switch (b && (c = i[x], h = i[x + 1], a = c, l = h), M !== B.L && v > 0 && (t.lineTo(S, w), v = 0), M) {
          case B.M:
            a = c = i[x++], l = h = i[x++], t.moveTo(c, h);
            break;
          case B.L: {
            u = i[x++], f = i[x++];
            const $ = Ae(u - c), k = Ae(f - h);
            if ($ > s || k > r) {
              if (d) {
                const it = p[m++];
                if (g + it > y) {
                  const xt = (y - g) / it;
                  t.lineTo(c * (1 - xt) + u * xt, h * (1 - xt) + f * xt);
                  break t;
                }
                g += it;
              }
              t.lineTo(u, f), c = u, h = f, v = 0;
            } else {
              const it = $ * $ + k * k;
              it > v && (S = u, w = f, v = it);
            }
            break;
          }
          case B.C: {
            const $ = i[x++], k = i[x++], it = i[x++], xt = i[x++], ce = i[x++], He = i[x++];
            if (d) {
              const Gi = p[m++];
              if (g + Gi > y) {
                const Ge = (y - g) / Gi;
                Pf(c, $, it, ce, Ge, Rn), Pf(h, k, xt, He, Ge, An), t.bezierCurveTo(Rn[1], An[1], Rn[2], An[2], Rn[3], An[3]);
                break t;
              }
              g += Gi;
            }
            t.bezierCurveTo($, k, it, xt, ce, He), c = ce, h = He;
            break;
          }
          case B.Q: {
            const $ = i[x++], k = i[x++], it = i[x++], xt = i[x++];
            if (d) {
              const ce = p[m++];
              if (g + ce > y) {
                const He = (y - g) / ce;
                kf(c, $, it, He, Rn), kf(h, k, xt, He, An), t.quadraticCurveTo(Rn[1], An[1], Rn[2], An[2]);
                break t;
              }
              g += ce;
            }
            t.quadraticCurveTo($, k, it, xt), c = it, h = xt;
            break;
          }
          case B.A:
            const T = i[x++], I = i[x++], C = i[x++], E = i[x++];
            let A = i[x++], L = i[x++];
            const W = i[x++], G = !i[x++], rt = C > E ? C : E, le = Ae(C - E) > 1e-3;
            let j = A + L, It = !1;
            if (d) {
              const $ = p[m++];
              g + $ > y && (j = A + L * (y - g) / $, It = !0), g += $;
            }
            if (le && t.ellipse ? t.ellipse(T, I, C, E, W, A, j, G) : t.arc(T, I, rt, A, j, G), It)
              break t;
            b && (a = Ln(A) * C + T, l = Pn(A) * E + I), c = Ln(j) * C + T, h = Pn(j) * E + I;
            break;
          case B.R:
            a = c = i[x], l = h = i[x + 1], u = i[x++], f = i[x++];
            const nt = i[x++], dt = i[x++];
            if (d) {
              const $ = p[m++];
              if (g + $ > y) {
                let k = y - g;
                t.moveTo(u, f), t.lineTo(u + yl(k, nt), f), k -= nt, k > 0 && t.lineTo(u + nt, f + yl(k, dt)), k -= dt, k > 0 && t.lineTo(u + vl(nt - k, 0), f + dt), k -= nt, k > 0 && t.lineTo(u, f + vl(dt - k, 0));
                break t;
              }
              g += $;
            }
            t.rect(u, f, nt, dt);
            break;
          case B.Z:
            if (d) {
              const $ = p[m++];
              if (g + $ > y) {
                const k = (y - g) / $;
                t.lineTo(c * (1 - k) + a * k, h * (1 - k) + l * k);
                break t;
              }
              g += $;
            }
            t.closePath(), c = a, h = l;
        }
      }
  }
  clone() {
    const t = new _i(), e = this.data;
    return t.data = e.slice ? e.slice() : Array.prototype.slice.call(e), t._len = this._len, t;
  }
};
_i.CMD = B, _i.initDefaultProps = (function() {
  const t = _i.prototype;
  t._saveData = !0, t._ux = 0, t._uy = 0, t._pendingPtDist = 0, t._version = 0;
})();
let js = _i;
const Xf = new sr(50);
function t_(n, t, e, i, s) {
  if (n)
    if (typeof n == "string") {
      if (t && t.__zrImageSrc === n || !e)
        return t;
      const r = Xf.get(n), o = { hostEl: e, cb: i, cbPayload: s };
      return r ? (t = r.image, !Ch(t) && r.pending.push(o)) : (t = Zc.loadImage(
        n,
        Zf,
        Zf
      ), t.__zrImageSrc = n, Xf.put(
        n,
        t.__cachedImgObj = {
          image: t,
          pending: [o]
        }
      )), t;
    } else
      return n;
  else return t;
}
function Zf() {
  const n = this.__cachedImgObj;
  this.onload = this.onerror = this.__cachedImgObj = null;
  for (let t = 0; t < n.pending.length; t++) {
    const e = n.pending[t], i = e.cb;
    i && i(this, e.cbPayload), e.hostEl.dirty();
  }
  n.pending.length = 0;
}
function Ch(n) {
  return n && n.width && n.height;
}
function zn(n) {
  return isFinite(n);
}
function _S(n, t, e) {
  let i = t.x == null ? 0 : t.x, s = t.x2 == null ? 1 : t.x2, r = t.y == null ? 0 : t.y, o = t.y2 == null ? 0 : t.y2;
  return t.global || (i = i * e.width + e.x, s = s * e.width + e.x, r = r * e.height + e.y, o = o * e.height + e.y), i = zn(i) ? i : 0, s = zn(s) ? s : 1, r = zn(r) ? r : 0, o = zn(o) ? o : 0, n.createLinearGradient(i, r, s, o);
}
function mS(n, t, e) {
  const i = e.width, s = e.height, r = Math.min(i, s);
  let o = t.x == null ? 0.5 : t.x, a = t.y == null ? 0.5 : t.y, l = t.r == null ? 0.5 : t.r;
  return t.global || (o = o * i + e.x, a = a * s + e.y, l = l * r), o = zn(o) ? o : 0.5, a = zn(a) ? a : 0.5, l = l >= 0 && zn(l) ? l : 0.5, n.createRadialGradient(o, a, 0, o, a, l);
}
function Kf(n, t, e) {
  const i = t.type === "radial" ? mS(n, t, e) : _S(n, t, e), s = t.colorStops;
  for (let r = 0; r < s.length; r++)
    i.addColorStop(
      s[r].offset,
      s[r].color
    );
  return i;
}
function yS(n, t) {
  if (n === t || !n && !t)
    return !1;
  if (!n || !t || n.length !== t.length)
    return !0;
  for (let e = 0; e < n.length; e++)
    if (n[e] !== t[e])
      return !0;
  return !1;
}
function li(n, t, e, i, s, r, o) {
  if (s === 0)
    return !1;
  const a = s;
  let l = 0, c = n;
  if (o > t + a && o > i + a || o < t - a && o < i - a || r > n + a && r > e + a || r < n - a && r < e - a)
    return !1;
  if (n !== e)
    l = (t - i) / (n - e), c = (n * i - e * t) / (n - e);
  else
    return Math.abs(r - n) <= a / 2;
  const h = l * r - o + c;
  return h * h / (l * l + 1) <= a / 2 * a / 2;
}
function vS(n, t, e, i, s, r, o, a, l, c, h) {
  if (l === 0)
    return !1;
  const u = l;
  return h > t + u && h > i + u && h > r + u && h > a + u || h < t - u && h < i - u && h < r - u && h < a - u || c > n + u && c > e + u && c > s + u && c > o + u || c < n - u && c < e - u && c < s - u && c < o - u ? !1 : Gw(
    n,
    t,
    e,
    i,
    s,
    r,
    o,
    a,
    c,
    h
  ) <= u / 2;
}
function xS(n, t, e, i, s, r, o, a, l) {
  if (o === 0)
    return !1;
  const c = o;
  return l > t + c && l > i + c && l > r + c || l < t - c && l < i - c && l < r - c || a > n + c && a > e + c && a > s + c || a < n - c && a < e - c && a < s - c ? !1 : Uw(
    n,
    t,
    e,
    i,
    s,
    r,
    a,
    l
  ) <= c / 2;
}
const jf = Math.PI * 2;
function Wr(n) {
  return n %= jf, n < 0 && (n += jf), n;
}
const ns = Math.PI * 2;
function wS(n, t, e, i, s, r, o, a, l) {
  if (o === 0)
    return !1;
  const c = o;
  a -= n, l -= t;
  const h = Math.sqrt(a * a + l * l);
  if (h - c > e || h + c < e)
    return !1;
  if (Math.abs(i - s) % ns < 1e-4)
    return !0;
  if (r) {
    const f = i;
    i = Wr(s), s = Wr(f);
  } else
    i = Wr(i), s = Wr(s);
  i > s && (s += ns);
  let u = Math.atan2(l, a);
  return u < 0 && (u += ns), u >= i && u <= s || u + ns >= i && u + ns <= s;
}
function kn(n, t, e, i, s, r) {
  if (r > t && r > i || r < t && r < i || i === t)
    return 0;
  const o = (r - t) / (i - t);
  let a = i < t ? 1 : -1;
  (o === 1 || o === 0) && (a = i < t ? 0.5 : -0.5);
  const l = o * (e - n) + n;
  return l === s ? 1 / 0 : l > s ? a : 0;
}
const qe = js.CMD, On = Math.PI * 2, SS = 1e-4;
function bS(n, t) {
  return Math.abs(n - t) < SS;
}
const ht = [-1, -1, -1], Ot = [-1, -1];
function TS() {
  const n = Ot[0];
  Ot[0] = Ot[1], Ot[1] = n;
}
function MS(n, t, e, i, s, r, o, a, l, c) {
  if (c > t && c > i && c > r && c > a || c < t && c < i && c < r && c < a)
    return 0;
  const h = Wg(t, i, r, a, c, ht);
  if (h === 0)
    return 0;
  {
    let u = 0, f = -1, d, p;
    for (let _ = 0; _ < h; _++) {
      let g = ht[_], m = g === 0 || g === 1 ? 0.5 : 1;
      bt(n, e, s, o, g) < l || (f < 0 && (f = Ug(t, i, r, a, Ot), Ot[1] < Ot[0] && f > 1 && TS(), d = bt(t, i, r, a, Ot[0]), f > 1 && (p = bt(t, i, r, a, Ot[1]))), f === 2 ? g < Ot[0] ? u += d < t ? m : -m : g < Ot[1] ? u += p < d ? m : -m : u += a < p ? m : -m : g < Ot[0] ? u += d < t ? m : -m : u += a < d ? m : -m);
    }
    return u;
  }
}
function CS(n, t, e, i, s, r, o, a) {
  if (a > t && a > i && a > r || a < t && a < i && a < r)
    return 0;
  const l = Ww(t, i, r, a, ht);
  if (l === 0)
    return 0;
  {
    const c = Vg(t, i, r);
    if (c >= 0 && c <= 1) {
      let h = 0, u = Ht(t, i, r, c);
      for (let f = 0; f < l; f++) {
        let d = ht[f] === 0 || ht[f] === 1 ? 0.5 : 1;
        Ht(n, e, s, ht[f]) < o || (ht[f] < c ? h += u < t ? d : -d : h += r < u ? d : -d);
      }
      return h;
    } else {
      const h = ht[0] === 0 || ht[0] === 1 ? 0.5 : 1;
      return Ht(n, e, s, ht[0]) < o ? 0 : r < t ? h : -h;
    }
  }
}
function DS(n, t, e, i, s, r, o, a) {
  if (a -= t, a > e || a < -e)
    return 0;
  const l = Math.sqrt(e * e - a * a);
  ht[0] = -l, ht[1] = l;
  const c = Math.abs(i - s);
  if (c < 1e-4)
    return 0;
  if (c >= On - 1e-4) {
    i = 0, s = On;
    const u = r ? 1 : -1;
    return o >= ht[0] + n && o <= ht[1] + n ? u : 0;
  }
  if (i > s) {
    const u = i;
    i = s, s = u;
  }
  i < 0 && (i += On, s += On);
  let h = 0;
  for (let u = 0; u < 2; u++) {
    const f = ht[u];
    if (f + n > o) {
      let d = Math.atan2(a, f), p = r ? 1 : -1;
      d < 0 && (d = On + d), (d >= i && d <= s || d + On >= i && d + On <= s) && (d > Math.PI / 2 && d < Math.PI * 1.5 && (p = -p), h += p);
    }
  }
  return h;
}
function e_(n, t, e, i, s) {
  const r = n.data, o = n.len();
  let a = 0, l = 0, c = 0, h = 0, u = 0, f, d;
  for (let p = 0; p < o; ) {
    const _ = r[p++], g = p === 1;
    switch (_ === qe.M && p > 1 && (e || (a += kn(l, c, h, u, i, s))), g && (l = r[p], c = r[p + 1], h = l, u = c), _) {
      case qe.M:
        h = r[p++], u = r[p++], l = h, c = u;
        break;
      case qe.L:
        if (e) {
          if (li(l, c, r[p], r[p + 1], t, i, s))
            return !0;
        } else
          a += kn(l, c, r[p], r[p + 1], i, s) || 0;
        l = r[p++], c = r[p++];
        break;
      case qe.C:
        if (e) {
          if (vS(
            l,
            c,
            r[p++],
            r[p++],
            r[p++],
            r[p++],
            r[p],
            r[p + 1],
            t,
            i,
            s
          ))
            return !0;
        } else
          a += MS(
            l,
            c,
            r[p++],
            r[p++],
            r[p++],
            r[p++],
            r[p],
            r[p + 1],
            i,
            s
          ) || 0;
        l = r[p++], c = r[p++];
        break;
      case qe.Q:
        if (e) {
          if (xS(
            l,
            c,
            r[p++],
            r[p++],
            r[p],
            r[p + 1],
            t,
            i,
            s
          ))
            return !0;
        } else
          a += CS(
            l,
            c,
            r[p++],
            r[p++],
            r[p],
            r[p + 1],
            i,
            s
          ) || 0;
        l = r[p++], c = r[p++];
        break;
      case qe.A:
        const m = r[p++], y = r[p++], v = r[p++], S = r[p++], w = r[p++], x = r[p++];
        p += 1;
        const M = !!(1 - r[p++]);
        f = Math.cos(w) * v + m, d = Math.sin(w) * S + y, g ? (h = f, u = d) : a += kn(l, c, f, d, i, s);
        const b = (i - m) * S / v + m;
        if (e) {
          if (wS(
            m,
            y,
            S,
            w,
            w + x,
            M,
            t,
            b,
            s
          ))
            return !0;
        } else
          a += DS(
            m,
            y,
            S,
            w,
            w + x,
            M,
            b,
            s
          );
        l = Math.cos(w + x) * v + m, c = Math.sin(w + x) * S + y;
        break;
      case qe.R:
        h = l = r[p++], u = c = r[p++];
        const T = r[p++], I = r[p++];
        if (f = h + T, d = u + I, e) {
          if (li(h, u, f, u, t, i, s) || li(f, u, f, d, t, i, s) || li(f, d, h, d, t, i, s) || li(h, d, h, u, t, i, s))
            return !0;
        } else
          a += kn(f, u, f, d, i, s), a += kn(h, d, h, u, i, s);
        break;
      case qe.Z:
        if (e) {
          if (li(
            l,
            c,
            h,
            u,
            t,
            i,
            s
          ))
            return !0;
        } else
          a += kn(l, c, h, u, i, s);
        l = h, c = u;
        break;
    }
  }
  return !e && !bS(c, u) && (a += kn(l, c, h, u, i, s) || 0), a !== 0;
}
function IS(n, t, e) {
  return e_(n, 0, !1, t, e);
}
function ES(n, t, e, i) {
  return e_(n, t, !0, e, i);
}
const n_ = yt({
  fill: "#000",
  stroke: null,
  strokePercent: 1,
  fillOpacity: 1,
  strokeOpacity: 1,
  lineDashOffset: 0,
  lineWidth: 1,
  lineCap: "butt",
  miterLimit: 10,
  strokeNoScale: !1,
  strokeFirst: !1
}, Gn), RS = {
  style: yt({
    fill: !0,
    stroke: !0,
    strokePercent: !0,
    fillOpacity: !0,
    strokeOpacity: !0,
    lineDashOffset: !0,
    lineWidth: !0,
    miterLimit: !0
  }, Mh.style)
}, Sl = Xs.concat([
  "invisible",
  "culling",
  "z",
  "z2",
  "zlevel",
  "parent"
]), Nn = class Nn extends Ks {
  constructor(t) {
    super(t);
  }
  update() {
    super.update();
    const t = this.style;
    if (t.decal) {
      const e = this._decalEl = this._decalEl || new Nn();
      e.buildPath === Nn.prototype.buildPath && (e.buildPath = (s) => {
        this.buildPath(s, this.shape);
      }), e.silent = !0;
      const i = e.style;
      for (let s in t)
        i[s] !== t[s] && (i[s] = t[s]);
      i.fill = t.fill ? t.decal : null, i.decal = null, i.shadowColor = null, t.strokeFirst && (i.stroke = null);
      for (let s = 0; s < Sl.length; ++s)
        e[Sl[s]] = this[Sl[s]];
      e.__dirty |= Fe;
    } else this._decalEl && (this._decalEl = null);
  }
  getDecalElement() {
    return this._decalEl;
  }
  _init(t) {
    const e = tt(t);
    this.shape = this.getDefaultShape();
    const i = this.getDefaultStyle();
    i && this.useStyle(i);
    for (let s = 0; s < e.length; s++) {
      const r = e[s], o = t[r];
      r === "style" ? this.style ? N(this.style, o) : this.useStyle(o) : r === "shape" ? N(this.shape, o) : super.attrKV(r, o);
    }
    this.style || this.useStyle({});
  }
  getDefaultStyle() {
    return null;
  }
  // Needs to override
  getDefaultShape() {
    return {};
  }
  canBeInsideText() {
    return this.hasFill();
  }
  getInsideTextFill() {
    const t = this.style.fill;
    if (t !== "none") {
      if (X(t)) {
        const e = Bf(t, 0);
        return e > 0.5 ? mc : e > 0.2 ? iS : yc;
      } else if (t)
        return yc;
    }
    return mc;
  }
  getInsideTextStroke(t) {
    const e = this.style.fill;
    if (X(e)) {
      const i = this.__zr, s = !!(i && i.isDarkMode()), r = Bf(t, 0) < nS;
      if (s === r)
        return e;
    }
  }
  // When bundling path, some shape may decide if use moveTo to begin a new subpath or closePath
  // Like in circle
  buildPath(t, e, i) {
  }
  pathUpdated() {
    this.__dirty &= ~di;
  }
  getUpdatedPathProxy(t) {
    return !this.path && this.createPathProxy(), this.path.beginPath(), this.buildPath(this.path, this.shape, t), this.path;
  }
  createPathProxy() {
    this.path = new js(!1);
  }
  hasStroke() {
    const t = this.style, e = t.stroke;
    return !(e == null || e === "none" || !(t.lineWidth > 0));
  }
  hasFill() {
    const e = this.style.fill;
    return e != null && e !== "none";
  }
  getBoundingRect() {
    let t = this._rect;
    const e = this.style, i = !t;
    if (i) {
      let s = !1;
      this.path || (s = !0, this.createPathProxy());
      let r = this.path;
      (s || this.__dirty & di) && (r.beginPath(), this.buildPath(r, this.shape, !1), this.pathUpdated()), t = r.getBoundingRect();
    }
    if (this._rect = t, this.hasStroke() && this.path && this.path.len() > 0) {
      const s = this._rectStroke || (this._rectStroke = t.clone());
      if (this.__dirty || i) {
        s.copy(t);
        const r = e.strokeNoScale ? this.getLineScale() : 1;
        let o = e.lineWidth;
        if (!this.hasFill()) {
          const a = this.strokeContainThreshold;
          o = Math.max(o, a == null ? 4 : a);
        }
        r > 1e-10 && (s.width += o / r, s.height += o / r, s.x -= o / r / 2, s.y -= o / r / 2);
      }
      return s;
    }
    return t;
  }
  contain(t, e) {
    const i = this.transformCoordToLocal(t, e), s = this.getBoundingRect(), r = this.style;
    if (t = i[0], e = i[1], s.contain(t, e)) {
      const o = this.path;
      if (this.hasStroke()) {
        let a = r.lineWidth, l = r.strokeNoScale ? this.getLineScale() : 1;
        if (l > 1e-10 && (this.hasFill() || (a = Math.max(a, this.strokeContainThreshold)), ES(
          o,
          a / l,
          t,
          e
        )))
          return !0;
      }
      if (this.hasFill())
        return IS(o, t, e);
    }
    return !1;
  }
  /**
   * Shape changed
   */
  dirtyShape() {
    this.__dirty |= di, this._rect && (this._rect = null), this._decalEl && this._decalEl.dirtyShape(), this.markRedraw();
  }
  dirty() {
    this.dirtyStyle(), this.dirtyShape();
  }
  /**
   * Alias for animate('shape')
   * @param {boolean} loop
   */
  animateShape(t) {
    return this.animate("shape", t);
  }
  // Override updateDuringAnimation
  updateDuringAnimation(t) {
    t === "style" ? this.dirtyStyle() : t === "shape" ? this.dirtyShape() : this.markRedraw();
  }
  // Overwrite attrKV
  attrKV(t, e) {
    t === "shape" ? this.setShape(e) : super.attrKV(t, e);
  }
  setShape(t, e) {
    let i = this.shape;
    return i || (i = this.shape = {}), typeof t == "string" ? i[t] = e : N(i, t), this.dirtyShape(), this;
  }
  /**
   * If shape changed. used with dirtyShape
   */
  shapeChanged() {
    return !!(this.__dirty & di);
  }
  /**
   * Create a path style object with default values in it's prototype.
   * @override
   */
  createStyle(t) {
    return ca(n_, t);
  }
  _innerSaveToNormal(t) {
    super._innerSaveToNormal(t);
    const e = this._normalState;
    t.shape && !e.shape && (e.shape = N({}, this.shape));
  }
  _applyStateObj(t, e, i, s, r, o) {
    super._applyStateObj(t, e, i, s, r, o);
    const a = !(e && s);
    let l;
    if (e && e.shape ? r ? s ? l = e.shape : (l = N({}, i.shape), N(l, e.shape)) : (l = N({}, s ? this.shape : i.shape), N(l, e.shape)) : a && (l = i.shape), l)
      if (r) {
        this.shape = N({}, this.shape);
        const c = {}, h = tt(l);
        for (let u = 0; u < h.length; u++) {
          const f = h[u];
          typeof l[f] == "object" ? this.shape[f] = l[f] : c[f] = l[f];
        }
        this._transitionState(t, {
          shape: c
        }, o);
      } else
        this.shape = l, this.dirtyShape();
  }
  _mergeStates(t) {
    const e = super._mergeStates(t);
    let i;
    for (let s = 0; s < t.length; s++) {
      const r = t[s];
      r.shape && (i = i || {}, this._mergeStyle(i, r.shape));
    }
    return i && (e.shape = i), e;
  }
  getAnimationStyleProps() {
    return RS;
  }
  /**
   * If path shape is zero area
   */
  isZeroArea() {
    return !1;
  }
  /**
   * 扩展一个 Path element, 比如星形，圆等。
   * Extend a path element
   * @DEPRECATED Use class extends
   * @param props
   * @param props.type Path type
   * @param props.init Initialize
   * @param props.buildPath Overwrite buildPath method
   * @param props.style Extended default style config
   * @param props.shape Extended default shape config
   */
  static extend(t) {
    class e extends Nn {
      getDefaultStyle() {
        return V(t.style);
      }
      getDefaultShape() {
        return V(t.shape);
      }
      constructor(s) {
        super(s), t.init && t.init.call(this, s);
      }
    }
    for (let i in t)
      typeof t[i] == "function" && (e.prototype[i] = t[i]);
    return e;
  }
};
Nn.initDefaultProps = (function() {
  const t = Nn.prototype;
  t.type = "path", t.strokeContainThreshold = 5, t.segmentIgnoreThreshold = 0, t.subPixelOptimize = !1, t.autoBatch = !1, t.__dirty = Fe | us | di;
})();
let Ao = Nn;
const AS = yt({
  x: 0,
  y: 0
}, Gn), LS = {
  style: yt({
    x: !0,
    y: !0,
    width: !0,
    height: !0,
    sx: !0,
    sy: !0,
    sWidth: !0,
    sHeight: !0
  }, Mh.style)
};
function PS(n) {
  return !!(n && typeof n != "string" && n.width && n.height);
}
class i_ extends Ks {
  /**
   * Create an image style object with default values in it's prototype.
   * @override
   */
  createStyle(t) {
    return ca(AS, t);
  }
  _getSize(t) {
    const e = this.style;
    let i = e[t];
    if (i != null)
      return i;
    const s = PS(e.image) ? e.image : this.__image;
    if (!s)
      return 0;
    const r = t === "width" ? "height" : "width";
    let o = e[r];
    return o == null ? s[t] : s[t] / s[r] * o;
  }
  getWidth() {
    return this._getSize("width");
  }
  getHeight() {
    return this._getSize("height");
  }
  getAnimationStyleProps() {
    return LS;
  }
  getBoundingRect() {
    const t = this.style;
    return this._rect || (this._rect = new Mt(
      t.x || 0,
      t.y || 0,
      this.getWidth(),
      this.getHeight()
    )), this._rect;
  }
}
i_.prototype.type = "image";
const kS = yt({
  strokeFirst: !0,
  font: Ns,
  x: 0,
  y: 0,
  textAlign: "left",
  textBaseline: "top",
  miterLimit: 2
}, n_);
var Un;
let s_ = (Un = class extends Ks {
  hasStroke() {
    const t = this.style, e = t.stroke;
    return e != null && e !== "none" && t.lineWidth > 0;
  }
  hasFill() {
    const e = this.style.fill;
    return e != null && e !== "none";
  }
  /**
   * Create an image style object with default values in it's prototype.
   * @override
   */
  createStyle(t) {
    return ca(kS, t);
  }
  /**
   * Set bounding rect calculated from Text
   * For reducing time of calculating bounding rect.
   */
  setBoundingRect(t) {
    this._rect = t;
  }
  getBoundingRect() {
    const t = this.style;
    if (!this._rect) {
      let e = t.text;
      e != null ? e += "" : e = "";
      const i = hg(
        e,
        t.font,
        t.textAlign,
        t.textBaseline
      );
      if (i.x += t.x || 0, i.y += t.y || 0, this.hasStroke()) {
        const s = t.lineWidth;
        i.x -= s / 2, i.y -= s / 2, i.width += s, i.height += s;
      }
      this._rect = i;
    }
    return this._rect;
  }
}, Un.initDefaultProps = (function() {
  const t = Un.prototype;
  t.dirtyRectTolerance = 10;
})(), Un);
s_.prototype.type = "tspan";
function OS(n, t) {
  return !n || n === "solid" || !(t > 0) ? null : n === "dashed" ? [4 * t, 2 * t] : n === "dotted" ? [t] : Se(n) ? [n] : K(n) ? n : null;
}
function r_(n) {
  const t = n.style;
  let e = t.lineDash && t.lineWidth > 0 && OS(t.lineDash, t.lineWidth), i = t.lineDashOffset;
  if (e) {
    const s = t.strokeNoScale && n.getLineScale ? n.getLineScale() : 1;
    s && s !== 1 && (e = H(e, function(r) {
      return r / s;
    }), i /= s);
  }
  return [e, i];
}
const FS = new js(!0);
function Lo(n) {
  const t = n.stroke;
  return !(t == null || t === "none" || !(n.lineWidth > 0));
}
function Qf(n) {
  return typeof n == "string" && n !== "none";
}
function Po(n) {
  const t = n.fill;
  return t != null && t !== "none";
}
function Jf(n, t) {
  if (t.fillOpacity != null && t.fillOpacity !== 1) {
    const e = n.globalAlpha;
    n.globalAlpha = t.fillOpacity * t.opacity, n.fill(), n.globalAlpha = e;
  } else
    n.fill();
}
function td(n, t) {
  if (t.strokeOpacity != null && t.strokeOpacity !== 1) {
    const e = n.globalAlpha;
    n.globalAlpha = t.strokeOpacity * t.opacity, n.stroke(), n.globalAlpha = e;
  } else
    n.stroke();
}
function ed(n, t, e) {
  const i = t_(t.image, t.__image, e);
  if (Ch(i)) {
    const s = n.createPattern(i, t.repeat || "repeat");
    if (typeof DOMMatrix == "function" && s && s.setTransform) {
      const r = new DOMMatrix();
      r.translateSelf(t.x || 0, t.y || 0), r.rotateSelf(0, 0, (t.rotation || 0) * m0), r.scaleSelf(t.scaleX || 1, t.scaleY || 1), s.setTransform(r);
    }
    return s;
  }
}
function NS(n, t, e, i) {
  let s = Lo(e), r = Po(e);
  const o = e.strokePercent, a = o < 1, l = !t.path;
  (!t.silent || a) && l && t.createPathProxy();
  const c = t.path || FS, h = t.__dirty;
  if (!i) {
    const _ = e.fill, g = e.stroke, m = r && !!_.colorStops, y = s && !!g.colorStops, v = r && !!_.image, S = s && !!g.image;
    let w, x, M, b, T;
    (m || y) && (T = t.getBoundingRect()), m && (w = h ? Kf(n, _, T) : t.__canvasFillGradient, t.__canvasFillGradient = w), y && (x = h ? Kf(n, g, T) : t.__canvasStrokeGradient, t.__canvasStrokeGradient = x), v && (M = h || !t.__canvasFillPattern ? ed(n, _, t) : t.__canvasFillPattern, t.__canvasFillPattern = M), S && (b = h || !t.__canvasStrokePattern ? ed(n, g, t) : t.__canvasStrokePattern, t.__canvasStrokePattern = M), m ? n.fillStyle = w : v && (M ? n.fillStyle = M : r = !1), y ? n.strokeStyle = x : S && (b ? n.strokeStyle = b : s = !1);
  }
  const u = t.getGlobalScale();
  c.setScale(u[0], u[1], t.segmentIgnoreThreshold);
  let f, d;
  n.setLineDash && e.lineDash && ([f, d] = r_(t));
  let p = !0;
  (l || h & di) && (c.setDPR(n.dpr), a ? c.setContext(null) : (c.setContext(n), p = !1), c.reset(), t.buildPath(c, t.shape, i), c.toStatic(), t.pathUpdated()), p && c.rebuildPath(n, a ? o : 1), f && (n.setLineDash(f), n.lineDashOffset = d), i || (e.strokeFirst ? (s && td(n, e), r && Jf(n, e)) : (r && Jf(n, e), s && td(n, e))), f && n.setLineDash([]);
}
function zS(n, t, e) {
  const i = t.__image = t_(
    e.image,
    t.__image,
    t,
    t.onload
  );
  if (!i || !Ch(i))
    return;
  const s = e.x || 0, r = e.y || 0;
  let o = t.getWidth(), a = t.getHeight();
  const l = i.width / i.height;
  if (o == null && a != null ? o = a * l : a == null && o != null ? a = o / l : o == null && a == null && (o = i.width, a = i.height), e.sWidth && e.sHeight) {
    const c = e.sx || 0, h = e.sy || 0;
    n.drawImage(
      i,
      c,
      h,
      e.sWidth,
      e.sHeight,
      s,
      r,
      o,
      a
    );
  } else if (e.sx && e.sy) {
    const c = e.sx, h = e.sy, u = o - c, f = a - h;
    n.drawImage(
      i,
      c,
      h,
      u,
      f,
      s,
      r,
      o,
      a
    );
  } else
    n.drawImage(i, s, r, o, a);
}
function BS(n, t, e) {
  let i = e.text;
  if (i != null && (i += ""), i) {
    n.font = e.font || Ns, n.textAlign = e.textAlign, n.textBaseline = e.textBaseline;
    let s, r;
    n.setLineDash && e.lineDash && ([s, r] = r_(t)), s && (n.setLineDash(s), n.lineDashOffset = r), e.strokeFirst ? (Lo(e) && n.strokeText(i, e.x, e.y), Po(e) && n.fillText(i, e.x, e.y)) : (Po(e) && n.fillText(i, e.x, e.y), Lo(e) && n.strokeText(i, e.x, e.y)), s && n.setLineDash([]);
  }
}
const nd = ["shadowBlur", "shadowOffsetX", "shadowOffsetY"], id = [
  ["lineCap", "butt"],
  ["lineJoin", "miter"],
  ["miterLimit", 10]
];
function o_(n, t, e, i, s) {
  let r = !1;
  if (!i && (e = e || {}, t === e))
    return !1;
  if (i || t.opacity !== e.opacity) {
    pt(n, s), r = !0;
    const o = Math.max(Math.min(t.opacity, 1), 0);
    n.globalAlpha = isNaN(o) ? Gn.opacity : o;
  }
  (i || t.blend !== e.blend) && (r || (pt(n, s), r = !0), n.globalCompositeOperation = t.blend || Gn.blend);
  for (let o = 0; o < nd.length; o++) {
    const a = nd[o];
    (i || t[a] !== e[a]) && (r || (pt(n, s), r = !0), n[a] = n.dpr * (t[a] || 0));
  }
  return (i || t.shadowColor !== e.shadowColor) && (r || (pt(n, s), r = !0), n.shadowColor = t.shadowColor || Gn.shadowColor), r;
}
function sd(n, t, e, i, s) {
  const r = Qs(t, s.inHover), o = i ? null : e && Qs(e, s.inHover) || {};
  if (r === o)
    return !1;
  let a = o_(n, r, o, i, s);
  if ((i || r.fill !== o.fill) && (a || (pt(n, s), a = !0), Qf(r.fill) && (n.fillStyle = r.fill)), (i || r.stroke !== o.stroke) && (a || (pt(n, s), a = !0), Qf(r.stroke) && (n.strokeStyle = r.stroke)), (i || r.opacity !== o.opacity) && (a || (pt(n, s), a = !0), n.globalAlpha = r.opacity == null ? 1 : r.opacity), t.hasStroke()) {
    const c = r.lineWidth / (r.strokeNoScale && t.getLineScale ? t.getLineScale() : 1);
    n.lineWidth !== c && (a || (pt(n, s), a = !0), n.lineWidth = c);
  }
  for (let l = 0; l < id.length; l++) {
    const c = id[l], h = c[0];
    (i || r[h] !== o[h]) && (a || (pt(n, s), a = !0), n[h] = r[h] || c[1]);
  }
  return a;
}
function $S(n, t, e, i, s) {
  return o_(
    n,
    Qs(t, s.inHover),
    e && Qs(e, s.inHover),
    i,
    s
  );
}
function a_(n, t) {
  const e = t.transform, i = n.dpr || 1;
  e ? n.setTransform(i * e[0], i * e[1], i * e[2], i * e[3], i * e[4], i * e[5]) : n.setTransform(i, 0, 0, i, 0, 0);
}
function HS(n, t, e) {
  let i = !1;
  for (let s = 0; s < n.length; s++) {
    const r = n[s];
    i = i || r.isZeroArea(), a_(t, r), t.beginPath(), r.buildPath(t, r.shape), t.clip();
  }
  e.allClipped = i;
}
function GS(n, t) {
  return n && t ? n[0] !== t[0] || n[1] !== t[1] || n[2] !== t[2] || n[3] !== t[3] || n[4] !== t[4] || n[5] !== t[5] : !(!n && !t);
}
const rd = 1, od = 2, ad = 3, ld = 4;
function YS(n) {
  const t = Po(n), e = Lo(n);
  return !// Line dash is dynamically set in brush function.
  (n.lineDash || !(+t ^ +e) || t && typeof n.fill != "string" || e && typeof n.stroke != "string" || n.strokePercent < 1 || n.strokeOpacity < 1 || n.fillOpacity < 1);
}
function pt(n, t) {
  t.batchFill && n.fill(), t.batchStroke && n.stroke(), t.batchFill = "", t.batchStroke = "";
}
function Qs(n, t) {
  return t && n.__hoverStyle || n.style;
}
function WS(n, t) {
  wc(n, t, { inHover: !1, viewWidth: 0, viewHeight: 0 }, !0);
}
function wc(n, t, e, i) {
  const s = t.transform;
  if (!t.shouldBePainted(e.viewWidth, e.viewHeight, !1, !1)) {
    t.__dirty &= ~Fe, t.__isRendered = !1;
    return;
  }
  const r = t.__clipPaths, o = e.prevElClipPaths;
  let a = !1, l = !1;
  if ((!o || yS(r, o)) && (o && o.length && (pt(n, e), n.restore(), l = a = !0, e.prevElClipPaths = null, e.allClipped = !1, e.prevEl = null), r && r.length && (pt(n, e), n.save(), HS(r, n, e), a = !0), e.prevElClipPaths = r), e.allClipped) {
    t.__isRendered = !1;
    return;
  }
  t.beforeBrush && t.beforeBrush(), t.innerBeforeBrush();
  const c = e.prevEl;
  c || (l = a = !0);
  let h = t instanceof Ao && t.autoBatch && YS(t.style);
  a || GS(s, c.transform) ? (pt(n, e), a_(n, t)) : h || pt(n, e);
  const u = Qs(t, e.inHover);
  t instanceof Ao ? (e.lastDrawType !== rd && (l = !0, e.lastDrawType = rd), sd(n, t, c, l, e), (!h || !e.batchFill && !e.batchStroke) && n.beginPath(), NS(n, t, u, h), h && (e.batchFill = u.fill || "", e.batchStroke = u.stroke || "")) : t instanceof s_ ? (e.lastDrawType !== ad && (l = !0, e.lastDrawType = ad), sd(n, t, c, l, e), BS(n, t, u)) : t instanceof i_ ? (e.lastDrawType !== od && (l = !0, e.lastDrawType = od), $S(n, t, c, l, e), zS(n, t, u)) : t.getTemporalDisplayables && (e.lastDrawType !== ld && (l = !0, e.lastDrawType = ld), US(n, t, e)), h && i && pt(n, e), t.innerAfterBrush(), t.afterBrush && t.afterBrush(), e.prevEl = t, t.__dirty = 0, t.__isRendered = !0;
}
function US(n, t, e) {
  let i = t.getDisplayables(), s = t.getTemporalDisplayables();
  n.save();
  let r = {
    prevElClipPaths: null,
    prevEl: null,
    allClipped: !1,
    viewWidth: e.viewWidth,
    viewHeight: e.viewHeight,
    inHover: e.inHover
  }, o, a;
  for (o = t.getCursor(), a = i.length; o < a; o++) {
    const l = i[o];
    l.beforeBrush && l.beforeBrush(), l.innerBeforeBrush(), wc(n, l, r, o === a - 1), l.innerAfterBrush(), l.afterBrush && l.afterBrush(), r.prevEl = l;
  }
  for (let l = 0, c = s.length; l < c; l++) {
    const h = s[l];
    h.beforeBrush && h.beforeBrush(), h.innerBeforeBrush(), wc(n, h, r, l === c - 1), h.innerAfterBrush(), h.afterBrush && h.afterBrush(), r.prevEl = h;
  }
  t.clearTemporalDisplayables(), t.notClear = !0, n.restore();
}
const bl = /* @__PURE__ */ new WeakMap(), cd = new sr(100), hd = [
  "symbol",
  "symbolSize",
  "symbolKeepAspect",
  "color",
  "backgroundColor",
  "dashArrayX",
  "dashArrayY",
  "maxTileWidth",
  "maxTileHeight"
];
function VS(n, t) {
  if (n === "none")
    return null;
  const e = t.getDevicePixelRatio(), i = t.getZr(), s = i.painter.type === "svg";
  n.dirty && bl.delete(n);
  const r = bl.get(n);
  if (r)
    return r;
  const o = De(n, {
    symbol: "rect",
    symbolSize: 1,
    symbolKeepAspect: !0,
    color: "rgba(0, 0, 0, 0.2)",
    backgroundColor: null,
    dashArrayX: 5,
    dashArrayY: 5,
    rotation: 0,
    maxTileWidth: 512,
    maxTileHeight: 512
  });
  o.backgroundColor === "none" && (o.backgroundColor = null);
  const a = { repeat: "repeat" };
  return l(a), a.rotation = o.rotation, a.scaleX = a.scaleY = s ? 1 : 1 / e, bl.set(n, a), n.dirty = !1, a;
  function l(c) {
    const h = [e];
    let u = !0;
    for (let b = 0; b < hd.length; ++b) {
      const T = o[hd[b]];
      if (T != null && !Ei(T) && !qt(T) && !re(T) && typeof T != "boolean") {
        u = !1;
        break;
      }
      h.push(T);
    }
    let f;
    if (u) {
      f = h.join(",") + (s ? "-svg" : "");
      const b = cd.get(f);
      b && (s ? c.svgElement = b : c.image = b);
    }
    const d = c_(o.dashArrayX), p = qS(o.dashArrayY), _ = l_(o.symbol), g = XS(d), m = h_(p), y = !s && nr.createCanvas(), v = s && {
      tag: "g",
      attrs: {},
      key: "dcl",
      children: []
    }, S = x();
    let w;
    y && (y.width = S.width * e, y.height = S.height * e, w = y.getContext("2d")), M(), u && cd.put(f, y || v), c.image = y, c.svgElement = v, c.svgWidth = S.width, c.svgHeight = S.height;
    function x() {
      let b = 1;
      for (let C = 0, E = g.length; C < E; ++C)
        b = Jh(b, g[C]);
      let T = 1;
      for (let C = 0, E = _.length; C < E; ++C)
        T = Jh(
          T,
          _[C].length
        );
      b *= T;
      const I = m * g.length * _.length;
      return {
        width: Math.max(1, Math.min(b, o.maxTileWidth)),
        height: Math.max(1, Math.min(I, o.maxTileHeight))
      };
    }
    function M() {
      w && (w.clearRect(0, 0, y.width, y.height), o.backgroundColor && (w.fillStyle = o.backgroundColor, w.fillRect(0, 0, y.width, y.height)));
      let b = 0;
      for (let L = 0; L < p.length; ++L)
        b += p[L];
      if (b <= 0)
        return;
      let T = -m, I = 0, C = 0, E = 0;
      for (; T < S.height; ) {
        if (I % 2 === 0) {
          const L = C / 2 % _.length;
          let W = 0, G = 0, rt = 0;
          for (; W < S.width * 2; ) {
            let le = 0;
            for (let j = 0; j < d[E].length; ++j)
              le += d[E][j];
            if (le <= 0)
              break;
            if (G % 2 === 0) {
              const j = (1 - o.symbolSize) * 0.5, It = W + d[E][G] * j, nt = T + p[I] * j, dt = d[E][G] * o.symbolSize, $ = p[I] * o.symbolSize, k = rt / 2 % _[L].length;
              A(
                It,
                nt,
                dt,
                $,
                _[L][k]
              );
            }
            W += d[E][G], ++rt, ++G, G === d[E].length && (G = 0);
          }
          ++E, E === d.length && (E = 0);
        }
        T += p[I], ++C, ++I, I === p.length && (I = 0);
      }
      function A(L, W, G, rt, le) {
        const j = s ? 1 : e, It = Io(
          le,
          L * j,
          W * j,
          G * j,
          rt * j,
          o.color,
          o.symbolKeepAspect
        );
        if (s) {
          const nt = i.painter.renderOneToVNode(
            It
          );
          nt && v.children.push(nt);
        } else
          WS(w, It);
      }
    }
  }
}
function l_(n) {
  if (!n || n.length === 0)
    return [["rect"]];
  if (qt(n))
    return [[n]];
  let t = !0;
  for (let i = 0; i < n.length; ++i)
    if (!qt(n[i])) {
      t = !1;
      break;
    }
  if (t)
    return l_([n]);
  const e = [];
  for (let i = 0; i < n.length; ++i)
    qt(n[i]) ? e.push([n[i]]) : e.push(n[i]);
  return e;
}
function c_(n) {
  if (!n || n.length === 0)
    return [[0, 0]];
  if (re(n)) {
    const i = Math.ceil(n);
    return [[i, i]];
  }
  let t = !0;
  for (let i = 0; i < n.length; ++i)
    if (!re(n[i])) {
      t = !1;
      break;
    }
  if (t)
    return c_([n]);
  const e = [];
  for (let i = 0; i < n.length; ++i)
    if (re(n[i])) {
      const s = Math.ceil(n[i]);
      e.push([s, s]);
    } else {
      const s = oe(n[i], (r) => Math.ceil(r));
      s.length % 2 === 1 ? e.push(s.concat(s)) : e.push(s);
    }
  return e;
}
function qS(n) {
  if (!n || typeof n == "object" && n.length === 0)
    return [0, 0];
  if (re(n)) {
    const e = Math.ceil(n);
    return [e, e];
  }
  const t = oe(n, (e) => Math.ceil(e));
  return n.length % 2 ? t.concat(t) : t;
}
function XS(n) {
  return oe(n, function(t) {
    return h_(t);
  });
}
function h_(n) {
  let t = 0;
  for (let e = 0; e < n.length; ++e)
    t += n[e];
  return n.length % 2 === 1 ? t * 2 : t;
}
const u_ = 0, Dh = 1, Ih = 2, ZS = 10, KS = 9, ao = "highlight", jS = "downplay", f_ = "select", QS = "unselect", d_ = "toggleSelect", JS = ft(), Eh = ft();
function ci(n) {
  return n != null && n !== "none";
}
const ud = new sr(100);
function fd(n) {
  if (qt(n)) {
    let t = ud.get(n);
    return t || (t = zf(n, -0.1), ud.put(n, t)), t;
  } else if (ga(n)) {
    const t = R({}, n);
    return t.colorStops = oe(n.colorStops, (e) => ({
      offset: e.offset,
      color: zf(e.color, -0.1)
    })), t;
  }
  return n;
}
function p_(n) {
  n.stateProxy = Tl;
  const t = n.getTextContent(), e = n.getTextGuideLine();
  t && (t.stateProxy = Tl), e && (e.stateProxy = Tl);
}
function tb(n, t, e, i) {
  const s = n.style, r = {};
  for (let o = 0; o < t.length; o++) {
    const a = t[o], l = s[a];
    r[a] = l == null ? i && i[a] : l;
  }
  for (let o = 0; o < n.animators.length; o++) {
    const a = n.animators[o];
    a.__fromStateTransition && // Don't consider the animation to emphasis state.
    a.__fromStateTransition.indexOf(e) < 0 && a.targetName === "style" && a.saveTo(r, t);
  }
  return r;
}
function eb(n, t, e, i) {
  const s = e && Tt(e, "select") >= 0;
  let r = !1;
  if (n instanceof zrender.Path) {
    const o = JS(n), a = s && o.selectFill || o.normalFill, l = s && o.selectStroke || o.normalStroke;
    if (ci(a) || ci(l)) {
      i = i || {};
      let c = i.style || {};
      c.fill === "inherit" ? (r = !0, i = R({}, i), c = R({}, c), c.fill = a) : !ci(c.fill) && ci(a) ? (r = !0, i = R({}, i), c = R({}, c), c.fill = fd(a)) : !ci(c.stroke) && ci(l) && (r || (i = R({}, i), c = R({}, c)), c.stroke = fd(l)), i.style = c;
    }
  }
  if (i && i.z2 == null) {
    r || (i = R({}, i));
    const o = n.z2EmphasisLift;
    i.z2 = n.z2 + (o != null ? o : ZS);
  }
  return i;
}
function nb(n, t, e) {
  if (e && e.z2 == null) {
    e = R({}, e);
    const i = n.z2SelectLift;
    e.z2 = n.z2 + (i != null ? i : KS);
  }
  return e;
}
function ib(n, t, e) {
  const i = Tt(n.currentStates, t) >= 0, s = n.style.opacity, r = i ? null : tb(n, ["opacity"], t, {
    opacity: 1
  });
  e = e || {};
  let o = e.style || {};
  return o.opacity == null && (e = R({}, e), o = R(
    {
      // Already being applied 'emphasis'. DON'T mul opacity multiple times.
      opacity: i ? s : r.opacity * 0.1
    },
    o
  ), e.style = o), e;
}
function Tl(n, t) {
  const e = this.states[n];
  if (this.style) {
    if (n === "emphasis")
      return eb(this, n, t, e);
    if (n === "blur")
      return ib(this, n, e);
    if (n === "select")
      return nb(this, n, e);
  }
  return e;
}
function sb(n, t, e) {
  rb(n), Hi(n, p_), hb(n);
}
function Hi(n, t, e) {
  dd(n, t, e), n.isGroup && n.traverse(function(i) {
    dd(i, t, e);
  });
}
function dd(n, t, e) {
  t(n, e);
}
function rb(n, t) {
  const e = n;
  n.highDownSilentOnTouch && (e.__highDownSilentOnTouch = n.highDownSilentOnTouch), e.__highByOuter = e.__highByOuter || 0, e.__highDownDispatcher = !0;
}
function Ma(n, t, e) {
  n.onHoverStateChange && (n.hoverState || 0) !== e && n.onHoverStateChange(t), n.hoverState = e;
}
function ob(n) {
  Ma(n, "emphasis", Ih);
}
function g_(n) {
  Ma(n, "blur", Dh);
}
function __(n) {
  n.hoverState === Dh && Ma(n, "normal", u_);
}
function ab(n) {
  n.hoverState === Ih && Ma(n, "normal", u_);
}
function lb(n) {
  n.selected = !0;
}
function cb(n) {
  n.selected = !1;
}
function hb(n, t, e) {
  const i = Zn(n);
  i.focus && (i.focus = null);
}
function pd(n, t) {
  n.__highByOuter |= 1 << (t || 0), Hi(n, ob);
}
function gd(n, t) {
  !(n.__highByOuter &= ~(1 << (t || 0))) && Hi(n, ab);
}
function Sc(n) {
  const t = n.type;
  return t === f_ || t === QS || t === d_;
}
function _d(n) {
  const t = n.type;
  return t === ao || t === jS;
}
function ub(n) {
  Hi(n, __);
}
function fb(n) {
  Hi(n, lb);
}
function db(n) {
  Hi(n, cb);
}
function pb(n) {
  const t = n.getModel(), e = [], i = [];
  t.eachComponent(function(s, r) {
    const o = Eh(r), a = s === "series", l = a ? n.getViewOfSeriesModel(r) : n.getViewOfComponentModel(r);
    !a && i.push(l), o.isBlured && (l.group.traverse(function(c) {
      __(c);
    }), a && e.push(r)), o.isBlured = !1;
  }), D(i, function(s) {
    s && s.toggleBlurSeries && s.toggleBlurSeries(e, !1, t);
  });
}
function md(n, t, e, i) {
  const s = i.getModel();
  e = e || "coordinateSystem";
  function r(c, h) {
    for (let u = 0; u < h.length; u++) {
      const f = c.getItemGraphicEl(h[u]);
      f && ub(f);
    }
  }
  if (n == null || !t || t === "none")
    return;
  const o = s.getSeriesByIndex(n);
  let a = o.coordinateSystem;
  a && a.master && (a = a.master);
  const l = [];
  s.eachSeries(function(c) {
    const h = o === c;
    let u = c.coordinateSystem;
    if (u && u.master && (u = u.master), !// Not blur other series if blurScope series
    (e === "series" && !h || // Not blur other coordinate system if blurScope is coordinateSystem
    e === "coordinateSystem" && !(u && a ? u === a : h) || // Not blur self series if focus is series.
    t === "series" && h)) {
      if (i.getViewOfSeriesModel(c).group.traverse(function(p) {
        p.__highByOuter && h && t === "self" || g_(p);
      }), Ct(t))
        r(c.getData(), t);
      else if (O(t)) {
        const p = tt(t);
        for (let _ = 0; _ < p.length; _++)
          r(
            c.getData(p[_]),
            t[p[_]]
          );
      }
      l.push(c), Eh(c).isBlured = !0;
    }
  }), s.eachComponent(function(c, h) {
    if (c === "series")
      return;
    const u = i.getViewOfComponentModel(h);
    u && u.toggleBlurSeries && u.toggleBlurSeries(l, !0, s);
  });
}
function gb(n, t, e) {
  if (n == null || t == null)
    return;
  const i = e.getModel().getComponent(n, t);
  if (!i)
    return;
  Eh(i).isBlured = !0;
  const s = e.getViewOfComponentModel(i);
  !s || !s.focusBlurEnabled || s.group.traverse(function(r) {
    g_(r);
  });
}
function _b(n, t, e) {
  const i = n.seriesIndex, s = n.getData(t.dataType);
  if (!s)
    return;
  let r = wp(s, t);
  r = (K(r) ? r[0] : r) || 0;
  let o = s.getItemGraphicEl(r);
  if (!o) {
    const a = s.count();
    let l = 0;
    for (; !o && l < a; )
      o = s.getItemGraphicEl(l++);
  }
  if (o) {
    const a = Zn(o);
    md(i, a.focus, a.blurScope, e);
  } else {
    const a = n.get(["emphasis", "focus"]), l = n.get(["emphasis", "blurScope"]);
    a != null && md(i, a, l, e);
  }
}
function mb(n, t, e) {
  if (!Sc(t))
    return;
  const i = t.dataType, s = n.getData(i);
  let r = wp(s, t);
  K(r) || (r = [r]), n[t.type === d_ ? "toggleSelect" : t.type === f_ ? "select" : "unselect"](r, i);
}
function yb(n, t, e, i) {
  const s = {
    focusSelf: !1,
    dispatchers: null
  };
  if (n == null || n === "series" || t == null || e == null)
    return s;
  const r = i.getModel().getComponent(n, t);
  if (!r)
    return s;
  const o = i.getViewOfComponentModel(r);
  if (!o || !o.findHighDownDispatchers)
    return s;
  const a = o.findHighDownDispatchers(e);
  let l;
  for (let c = 0; c < a.length; c++)
    if (Zn(a[c]).focus === "self") {
      l = !0;
      break;
    }
  return { focusSelf: l, dispatchers: a };
}
function vb(n) {
  const t = n.getAllData();
  D(t, function({ data: e, type: i }) {
    e.eachItemGraphicEl(function(s, r) {
      n.isSelected(r, i) ? fb(s) : db(s);
    });
  });
}
function xb(n) {
  const t = [];
  return n.eachSeries(function(e) {
    const i = e.getAllData();
    D(i, function({ data: s, type: r }) {
      const o = e.getSelectedDataIndices();
      if (o.length > 0) {
        const a = {
          dataIndex: o,
          seriesIndex: e.seriesIndex
        };
        r != null && (a.dataType = r), t.push(a);
      }
    });
  }), t;
}
function wb(n, t, e, i, s) {
  const r = n.getArea();
  let o = r.x, a = r.y, l = r.width, c = r.height;
  const h = e.get(["lineStyle", "width"]) || 2;
  return o -= h / 2, a -= h / 2, l += h, c += h, o = Math.floor(o), l = Math.round(l), new (void 0)({
    shape: {
      x: o,
      y: a,
      width: l,
      height: c
    }
  });
}
function Sb(n, t, e, i, s) {
  if (n) {
    if (n.type !== "polar") {
      if (n.type === "cartesian2d")
        return wb(n, t, e);
    }
  } else return null;
  return null;
}
const bb = ["x", "y"], m_ = "emphasis", Rh = "normal", Tb = "blur", Mb = "select", ko = [Rh, m_, Tb, Mb], Cb = "p\0\0", Db = {
  cartesian2d: mw
}, jt = {
  normal: {},
  emphasis: {},
  blur: {},
  select: {}
}, Ko = class Ko extends Ri {
  constructor() {
    super(...arguments), this.type = Ko.type;
  }
  updateItems(t, e, i, s) {
    const r = this._data, o = t.getData(), a = new Set(s.map(String)), l = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map(), h = (f, d) => {
      const p = f.getRawDataItem(d);
      if (Array.isArray(p) && p.length > 0) return String(p[0]);
      const _ = f.getDimensionIndex("id");
      return String(f.getStore().get(_, d));
    };
    if (r)
      for (let f = 0; f < r.count(); f++)
        l.set(h(r, f), f);
    for (let f = 0; f < o.count(); f++) {
      const d = h(o, f);
      c.set(d, f);
      const p = l.get(d);
      if (p != null && !a.has(d)) {
        const _ = r.getItemGraphicEl(p);
        _ && o.setItemGraphicEl(f, _);
      }
    }
    const u = yd(t, o, e, i);
    a.forEach((f) => {
      const d = l.get(f), p = c.get(f), _ = d == null ? null : r == null ? void 0 : r.getItemGraphicEl(d);
      if (p == null) {
        _ && this.group.remove(_);
        return;
      }
      Ml(
        i,
        _,
        p,
        u(p, null),
        t,
        this.group,
        o
      );
    }), this._data = o, i.getZr().refresh();
  }
  render(t, e, i, s) {
    this._progressiveEls = null;
    const r = this._data, o = t.getData(), a = this.group, l = yd(t, o, e, i);
    r || a.removeAll(), o.diff(r).add(function(h) {
      Ml(
        i,
        null,
        h,
        l(h, s),
        t,
        a,
        o
      );
    }).remove(function(h) {
      const u = r.getItemGraphicEl(h);
      u && Th(
        u,
        nn(u).option,
        t
      );
    }).update(function(h, u) {
      const f = r.getItemGraphicEl(u);
      Ml(
        i,
        f,
        h,
        l(h, s),
        t,
        a,
        o
      );
    }).execute();
    const c = t.get("clip", !0) ? Sb(
      t.coordinateSystem,
      !1,
      t
    ) : null;
    c ? a.setClipPath(c) : a.removeClipPath(), this._data = o;
  }
};
Ko.type = "custom";
let bc = Ko;
function yd(n, t, e, i) {
  const s = n.get("renderItem"), r = n.coordinateSystem;
  let o = {};
  r && (o = r.prepareCustoms ? r.prepareCustoms(r) : Db[r.type](r));
  const a = yt(
    {
      getWidth: i.getWidth,
      getHeight: i.getHeight,
      getZr: i.getZr,
      value: h
    },
    (o == null ? void 0 : o.api) || {}
  ), l = {
    context: {},
    seriesId: n.id,
    seriesName: n.name,
    seriesIndex: n.seriesIndex,
    coordSys: o.coordSys
  };
  let c;
  function h(u, f) {
    return f == null && (f = c), t.getStore().get(t.getDimensionIndex(u || 0), f);
  }
  return function(u, f) {
    return c = u, s && s(
      yt(
        {
          dataIndexInside: u,
          dataIndex: t.getRawIndex(u),
          actionType: f ? f.type : null
        },
        l
      ),
      a
    );
  };
}
function Ml(n, t, e, i, s, r, o) {
  if (!i) {
    r.remove(t);
    return;
  }
  const a = Ah(
    n,
    t,
    e,
    i,
    s,
    r
  );
  return a && o.setItemGraphicEl(e, a), a;
}
function Ah(n, t, e, i, s, r) {
  let o = -1;
  const a = t;
  t && Pb(t, i, s) && (o = st(r.childrenRef(), t), t = null);
  const l = !t;
  let c = t;
  c ? c.clearStates() : (c = kb(i), a && $b(a, c)), i.morph === !1 ? c.disableMorphing = !0 : c.disableMorphing && (c.disableMorphing = !1), jt.normal.cfg = jt.normal.conOpt = jt.emphasis.cfg = jt.emphasis.conOpt = jt.blur.cfg = jt.blur.conOpt = jt.select.cfg = jt.select.conOpt = null, jt.isLegacy = !1, Ob(
    n,
    c,
    e,
    i,
    jt,
    s,
    l
  ), Te(i, "info") && (nn(c).info = i.info);
  for (let h = 0; h < ko.length; h++) {
    const u = ko[h];
    if (u !== Rh) {
      const f = y_(i, u), d = Bb(
        i,
        f,
        u
      );
      Fb(
        u,
        c,
        f,
        d,
        jt
      );
    }
  }
  return Nb(c, i, s), i.type === "group" && Eb(
    n,
    c,
    e,
    i,
    s
  ), Ib(n, c, i), o >= 0 ? r.replaceAt(c, o) : r.add(c), c;
}
function Ib(n, t, e) {
  const i = e.info;
  !(i != null && i.taskItem) || t.__taskShakeBound || (t.__taskShakeBound = !0, t.__taskShakeBasePosition = t.position ? t.position.slice() : [0, 0], t.on("dblclick", function() {
    var a;
    const s = (a = n.getTweenManager) == null ? void 0 : a.call(n);
    if (!s) return;
    const r = t.__taskShakeBasePosition || (t.__taskShakeBasePosition = t.position ? t.position.slice() : [0, 0]), o = t.__taskShakeTween;
    if (o) {
      s.stop(o), t.attr({ position: r.slice() }), t.__taskShakeTween = null;
      return;
    }
    t.__taskShakeTween = s.presets.shakeY(t, {
      amplitude: 4,
      duration: 180,
      loop: !0,
      restore: !1
    });
  }));
}
function Eb(n, t, e, i, s) {
  const r = i.children, o = r ? r.length : 0, a = i.$mergeChildren, l = a === "byName" || i.diffChildrenByName, c = a === !1;
  if (!o && !l && !c)
    return;
  if (l) {
    Ab({
      api: n,
      oldChildren: t.children() || [],
      newChildren: r || [],
      dataIndex: e,
      seriesModel: s,
      group: t
    });
    return;
  }
  c && t.removeAll();
  let h = 0;
  for (; h < o; h++) {
    const u = r[h], f = t.childAt(h);
    u ? (u.ignore == null && (u.ignore = !1), Ah(
      n,
      f,
      e,
      u,
      s,
      t
    )) : f.ignore = !0;
  }
  for (let u = t.childCount() - 1; u >= h; u--) {
    const f = t.childAt(u);
    Rb(t, f, s);
  }
}
function Rb(n, t, e) {
  t && Th(t, nn(n).option, e);
}
function Ab(n) {
  new zg(
    n.oldChildren,
    n.newChildren,
    vd,
    vd,
    n
  ).add(xd).update(xd).remove(Lb).execute();
}
function vd(n, t) {
  const e = n && n.name;
  return e != null ? e : Cb + t;
}
function xd(n, t) {
  const e = this.context, i = n != null ? e.newChildren[n] : null, s = t != null ? e.oldChildren[t] : null;
  Ah(
    e.api,
    s,
    e.dataIndex,
    i,
    e.seriesModel,
    e.group
  );
}
function Lb(n) {
  const t = this.context, e = t.oldChildren[n];
  e && Th(
    e,
    nn(e).option,
    t.seriesModel
  );
}
function Pb(n, t, e) {
  const i = nn(n), s = t.type, r = t == null ? void 0 : t.shape, o = t == null ? void 0 : t.style;
  return e.isUniversalTransitionEnabled() || s != null && s !== i.customGraphicType || s === "path" && Hb(r) && v_(r) !== i.customPathData || s === "image" && Te(o, "image") && o.image !== i.customImagePath;
}
function kb(n) {
  const t = n.type;
  let e;
  if (t === "path") {
    const i = n.shape, s = i.width != null && i.height != null ? {
      x: i.x || 0,
      y: i.y || 0,
      width: i.width,
      height: i.height
    } : null, r = v_(i);
    e = Og(
      r,
      null,
      s,
      i.layout || "center"
    ), nn(e).customPathData = r;
  } else if (t === "image")
    e = new (void 0)({}), nn(e).customImagePath = n.style.image;
  else if (t === "text")
    e = new (void 0)({});
  else if (t === "group")
    e = new (void 0)();
  else {
    const i = Yx(t);
    e = new i();
  }
  return nn(e).customGraphicType = t, e.name = n.name, e.z2EmphasisLift = 1, e.z2SelectLift = 1, e;
}
function Ob(n, t, e, i, s, r, o) {
  Rw(t);
  const a = s && s.normal.cfg;
  a && t.setTextConfig(a), i && i.transition == null && (i.transition = bb);
  const l = i && i.style;
  if (l) {
    if (t.type === "text") {
      const u = l;
      Te(u, "textFill") && (u.fill = u.textFill), Te(u, "textStroke") && (u.stroke = u.textStroke);
    }
    let c;
    const h = Tc(t) ? l.decal : null;
    n && h && (h.dirty = !0, c = VS(h, n)), l.__decalPattern = c;
  }
  if (Mc(t) && l) {
    const c = l.__decalPattern;
    c && (l.decal = c);
  }
  vw(t, i, r, {
    dataIndex: e,
    isInit: o,
    clearStyle: !0
  });
}
function Fb(n, t, e, i, s) {
  const r = t.isGroup ? null : t, o = s && s[n].cfg;
  if (r) {
    const a = r.ensureState(n);
    if (i === !1) {
      const l = r.getState(n);
      l && (l.style = null);
    } else
      a.style = i || null;
    o && (a.textConfig = o), p_(r);
  }
}
function Nb(n, t, e) {
  if (n.isGroup)
    return;
  const i = n, s = e.currentZ, r = e.currentZLevel;
  i.z = s, i.zlevel = r;
  const o = t.z2;
  o != null && (i.z2 = o || 0);
  for (let a = 0; a < ko.length; a++)
    zb(i, t, ko[a]);
}
function zb(n, t, e) {
  const i = e === Rh, s = i ? t : y_(
    t,
    e
  ), r = s ? s.z2 : null;
  let o;
  r != null && (o = i ? n : n.ensureState(e), o.z2 = r || 0);
}
function y_(n, t) {
  return t ? n ? n[t] : null : n;
}
function Bb(n, t, e) {
  let i = t && t.style;
  return i == null && e === m_ && n && (i = n.styleEmphasis), i;
}
function Tc(n) {
  return n instanceof zrender.Path;
}
function Mc(n) {
  return n instanceof zrender.Displayable;
}
function $b(n, t) {
  t.copyTransform(n), Mc(t) && Mc(n) && (t.setStyle(n.style), t.z = n.z, t.z2 = n.z2, t.zlevel = n.zlevel, t.invisible = n.invisible, t.ignore = n.ignore, Tc(t) && Tc(n) && t.setShape(n.shape));
}
function v_(n) {
  return n && (n.pathData || n.d);
}
function Hb(n) {
  return n && (Te(n, "pathData") || Te(n, "d"));
}
function Gb(n) {
  n.registerChartView(bc), n.registerSeriesModel(uc);
}
let Yb = 0;
class Lh {
  constructor(t) {
    this.categories = t.categories || [], this._needCollect = t.needCollect, this._deduplication = t.deduplication, this.uid = ++Yb;
  }
  getOrdinal(t) {
    return this._getOrCreateMap().get(t);
  }
  parseAndCollect(t) {
    let e;
    const i = this._needCollect;
    if (!qt(t) && !i)
      return t;
    if (i && !this._deduplication)
      return e = this.categories.length, this.categories[e] = t, e;
    const s = this._getOrCreateMap();
    return e = s.get(t), e == null && (i ? (e = this.categories.length, this.categories[e] = t, s.set(t, e)) : e = NaN), e;
  }
  _getOrCreateMap() {
    return this._map || (this._map = F(this.categories));
  }
  static createByAxisModel(t) {
    const e = t.option, i = e.data, s = i && oe(i, Wb);
    return new Lh({
      categories: s,
      needCollect: !s,
      // deduplication is default in axis.
      deduplication: e.dedplication !== !1
    });
  }
}
function Wb(n) {
  return se(n) && n.value != null ? n.value : n + "";
}
const Ub = { value: 1, category: 1, time: 1, log: 1 }, x_ = {
  show: !0,
  // zlevel: 0,
  z: 0,
  // Inverse the axis.
  inverse: !1,
  // Axis name displayed.
  name: "",
  // 'start' | 'middle' | 'end'
  nameLocation: "end",
  // By degree. By default auto rotate by nameLocation.
  nameRotate: null,
  nameTruncate: {
    maxWidth: null,
    ellipsis: "...",
    placeholder: "."
  },
  // Use global text style by default.
  // nameTextStyle: {},
  // The gap between axisName and axisLine.
  nameGap: 15,
  // Default `false` to support tooltip.
  silent: !1,
  // Default `false` to avoid legacy user event listener fail.
  triggerEvent: !1,
  tooltip: {
    show: !1
  },
  // axisPointer: {},
  axisLine: {
    show: !0,
    onZero: !0,
    onZeroAxisIndex: null,
    lineStyle: {
      color: "#6E7079",
      width: 1,
      type: "solid"
    }
    // The arrow at both ends the the axis.
    // symbol: ['none', 'none'],
    // symbolSize: [10, 15]
  },
  axisTick: {
    show: !0,
    // Whether axisTick is inside the grid or outside the grid.
    inside: !1,
    // The length of axisTick.
    length: 5,
    lineStyle: {
      width: 1
    }
  },
  axisLabel: {
    show: !0,
    // Whether axisLabel is inside the grid or outside the grid.
    inside: !1,
    rotate: 0,
    // true | false | null/undefined (auto)
    showMinLabel: null,
    // true | false | null/undefined (auto)
    showMaxLabel: null,
    margin: 8,
    // formatter: null,
    fontSize: 12
  }
  // splitLine: {
  //     show: true,
  //     lineStyle: {
  //         color: ['#E0E6F1'],
  //         width: 1,
  //         type: 'solid'
  //     }
  // },
  // splitArea: {
  //     show: false,
  //     areaStyle: {
  //         color: ['rgba(250,250,250,0.2)', 'rgba(210,219,238,0.2)']
  //     }
  // }
}, Vb = ut(
  {
    // The gap at both ends of the axis. For categoryAxis, boolean.
    boundaryGap: !0,
    // Set false to faster category collection.
    deduplication: null,
    // splitArea: {
    // show: false
    // },
    splitLine: {
      show: !0
    },
    axisTick: {
      // If tick is align with label when boundaryGap is true
      alignWithLabel: !1,
      interval: "auto"
    },
    axisLabel: {
      interval: "auto"
    }
  },
  x_
), Ph = ut(
  {
    boundaryGap: [0, 0],
    axisLine: {
      // Not shown when other axis is categoryAxis in cartesian
      show: "auto"
    },
    axisTick: {
      // Not shown when other axis is categoryAxis in cartesian
      show: "auto"
    },
    // TODO
    // min/max: [30, datamin, 60] or [20, datamin] or [datamin, 60]
    splitNumber: 5,
    minorTick: {
      // Minor tick, not available for cateogry axis.
      show: !1,
      // Split number of minor ticks. The value should be in range of (0, 100)
      splitNumber: 5,
      // Length of minor tick
      length: 3,
      // Line style
      lineStyle: {
        // Default to be same with axisTick
      }
    },
    minorSplitLine: {
      show: !1,
      lineStyle: {
        color: "#F4F7FD",
        width: 1
      }
    }
  },
  x_
), qb = ut(
  {
    splitNumber: 6,
    axisLabel: {
      // To eliminate labels that are not nice
      showMinLabel: !1,
      showMaxLabel: !1,
      rich: {
        primary: {
          fontWeight: "bold"
        }
      }
    },
    splitLine: {
      show: !0
    },
    minorSplitLine: {
      show: !0
    }
  },
  Ph
), Xb = yt(
  {
    logBase: 10
  },
  Ph
), Zb = {
  category: Vb,
  value: Ph,
  time: qb,
  log: Xb
};
function wd(n, t, e, i) {
  et(Ub, function(s, r) {
    const o = je(
      je({}, Zb[r], !0),
      i,
      !0
    ), l = class l extends e {
      constructor() {
        super(...arguments), this.type = t + "Axis." + r;
      }
      mergeDefaultAndTheme(h, u) {
        const f = Op(this), d = f ? Hs(h) : {};
        je(h, this.getDefaultOption()), h.type = Sd(h), f && Fp(
          h,
          d,
          f
        );
      }
      optionUpdated() {
        this.option.type === "category" && (this.__ordinalMeta = Lh.createByAxisModel(this));
      }
      /**
       * Should not be called before all of 'getInitailData' finished.
       * Because categories are collected during initializing data.
       */
      getCategories(h) {
        const u = this.option;
        if (u.type === "category")
          return h ? u.data : this.__ordinalMeta.categories;
      }
      getOrdinalMeta() {
        return this.__ordinalMeta;
      }
    };
    l.type = t + "Axis." + r, l.defaultOption = o;
    let a = l;
    n.registerComponentModel(a);
  }), n.registerSubTypeDefaulter(t + "Axis", Sd);
}
function Sd(n) {
  return n.type || (n.data ? "category" : "value");
}
class Kb {
  getNeedCrossZero() {
    return !this.option.scale;
  }
  getCoordSysModel() {
  }
}
const Hh = class Hh extends U {
  getCoordSysModel() {
    return this.getReferringComponents("grid", Me).models[0];
  }
};
Hh.type = "cartesian2dAxis";
let Js = Hh;
Qc(Js, Kb);
const jo = class jo extends Kt {
  constructor() {
    super(...arguments), this.type = jo.type;
  }
  render(t, e, i, s) {
    super.render.apply(this, arguments);
  }
};
jo.type = "axis";
let Cc = jo;
const Dc = Math.PI;
class lo {
  constructor(t, e) {
    this.group = new zrender.Group(), this.axisModel = t, this.opt = e, De(e, {
      labelOffset: 0,
      nameDirection: 1,
      tickDirection: 1,
      labelDirection: 1,
      silent: !0,
      handleAutoShown: () => !0
    });
    const i = new zrender.Group({
      x: e.position[0],
      y: e.position[1],
      rotation: e.rotation
    });
    i.updateTransform(), this._transformGroup = i;
  }
  add(t) {
    jb[t](this.opt, this.axisModel, this.group, this._transformGroup);
  }
  getGroup() {
    return this.group;
  }
  static makeAxisEventDataBase(t) {
    const e = {
      componentType: t.mainType,
      componentIndex: t.componentIndex
    };
    return e[t.mainType + "Index"] = t.componentIndex, e;
  }
  static innerTextLayout(t, e, i) {
    const s = I0(e - t);
    let r, o;
    return tu(s) ? (o = i > 0 ? "top" : "bottom", r = "center") : tu(s - Dc) ? (o = i > 0 ? "bottom" : "top", r = "center") : (o = "middle", s > 0 && s < Dc ? r = i > 0 ? "right" : "left" : r = i > 0 ? "left" : "right"), {
      rotation: s,
      textAlign: r,
      textVerticalAlign: o
    };
  }
  static isLabelSilent(t) {
    const e = t.get("tooltip");
    return t.get("silent") || // Consider mouse cursor, add these restrictions.
    !(t.get("triggerEvent") || e && e.show);
  }
}
const jb = {
  axisLine(n, t, e, i) {
    let s = t.get(["axisLine", "show"]);
    if (s == "auto" && n.handleAutoShown && (s = n.handleAutoShown("axisLine")), !s)
      return;
    const r = t.axis.getExtent(), o = i.transform, a = [r[0], 0], l = [r[1], 0], c = a[0] > l[0];
    o && (be(a, a, o), be(l, l, o));
    const h = R(
      {
        lineCap: "round"
      },
      t.getModel(["axisLine", "lineStyle"]).getLineStyle()
    ), u = new zrender.Line({
      shape: {
        x1: a[0],
        y1: a[1],
        x2: l[0],
        y2: l[1]
      },
      style: h,
      strokeContainThreshold: n.strokeContainThreshold || 5,
      silent: !0,
      z2: 1
    });
    Ng(u.shape, u.style.lineWidth), u.anid = "line", e.add(u);
    let f = t.get(["axisLine", "symbol"]);
    if (f != null) {
      let d = t.get(["axisLine", "symbolSize"]);
      qt(f) && (f = [f, f]), (qt(d) || re(d)) && (d = [d, d]);
      const p = Bw(
        t.get(["axisLine", "symbolOffset"]) || 0,
        d
      ), _ = d[0], g = d[1];
      et(
        [
          {
            rotate: n.rotation + Math.PI / 2,
            offset: p[0],
            r: 0
          },
          {
            rotate: n.rotation - Math.PI / 2,
            offset: p[1],
            r: Math.sqrt(
              (a[0] - l[0]) * (a[0] - l[0]) + (a[1] - l[1]) * (a[1] - l[1])
            )
          }
        ],
        function(m, y) {
          if (f[y] !== "none" && f[y] != null) {
            const v = Io(
              f[y],
              -_ / 2,
              -g / 2,
              _,
              g,
              h.stroke,
              !0
            ), S = m.r + m.offset, w = c ? l : a;
            v.attr({
              rotation: m.rotate,
              x: w[0] + S * Math.cos(n.rotation),
              y: w[1] - S * Math.sin(n.rotation),
              silent: !0,
              z2: 11
            }), e.add(v);
          }
        }
      );
    }
  },
  axisTickLabel(n, t, e, i) {
    const s = Qb(e, i, t, n), r = t2(e, i, t, n);
    Jb(e, i, t, n), e2(t, r, s);
  },
  axisName(n, t, e, i) {
  }
};
function Qb(n, t, e, i) {
  const s = e.axis, r = e.getModel("axisTick");
  let o = r.get("show");
  if (o === "auto" && i.handleAutoShown && (o = i.handleAutoShown("axisTick")), !o || s.scale.isBlank())
    return;
  const a = r.getModel("lineStyle"), l = i.tickDirection * r.get("length"), c = s.getTicksCoords(), h = w_(
    c,
    t.transform,
    l,
    De(a.getLineStyle(), {
      stroke: e.get(["axisLine", "lineStyle", "color"])
    }),
    "ticks"
  );
  for (let u = 0; u < h.length; u++)
    n.add(h[u]);
  return h;
}
function Jb(n, t, e, i) {
  const s = e.axis, r = e.getModel("axisTick");
  let o = r.get("show");
  if (o === "auto" && i.handleAutoShown && (o = i.handleAutoShown("axisTick")), !o || s.scale.isBlank())
    return;
  const a = r.getModel("lineStyle"), l = r.get("length") || 5, c = i.tickDirection * (l * 0.6), h = s.getTicksCoords(), u = [];
  for (let d = 0; d < h.length - 1; d++) {
    const p = (h[d].coord + h[d + 1].coord) / 2;
    u.push({ coord: p });
  }
  if (u.length === 0)
    return;
  const f = w_(
    u,
    t.transform,
    c,
    De(a.getLineStyle(), {
      stroke: e.get(["axisLine", "lineStyle", "color"])
    }),
    "minorTicks"
  );
  for (let d = 0; d < f.length; d++)
    n.add(f[d]);
}
function t2(n, t, e, i) {
  const s = e.axis;
  if (!Nl(i.axisLabelShow, e.get(["axisLabel", "show"])) || s.scale.isBlank())
    return;
  const o = e.getModel("axisLabel"), a = o.get("margin"), l = s.getViewLabels(), c = (Nl(i.labelRotate, o.get("rotate")) || 0) * Dc / 180, h = lo.innerTextLayout(
    i.rotation,
    c,
    i.labelDirection
  ), u = e.getCategories && e.getCategories(!0), f = [], d = lo.isLabelSilent(e), p = e.get("triggerEvent");
  return et(l, function(_, g) {
    const m = s.scale.type === "ordinal" ? s.scale.getRawOrdinalNumber(_.tickValue) : _.tickValue, y = _.formattedLabel, v = _.rawLabel;
    let S = o;
    if (u && u[m]) {
      const b = u[m];
      O(b) && b.textStyle && (S = new Dt(
        b.textStyle,
        o,
        e.piModel
      ));
    }
    const w = S.getTextColor() || e.get(["axisLine", "lineStyle", "color"]), x = s.dataToCoord(m), M = new (void 0)({
      x,
      y: i.labelOffset + i.labelDirection * a,
      rotation: h.rotation,
      silent: d,
      z2: 10 + (_.level || 0),
      style: Ap(S, {
        text: y,
        align: S.getShallow("align", !0) || h.textAlign,
        verticalAlign: S.getShallow("verticalAlign", !0) || S.getShallow("baseline", !0) || h.textVerticalAlign,
        fill: Q(w) ? w(
          // (1) In category axis with data zoom, tick is not the original
          // index of axis.data. So tick should not be exposed to user
          // in category axis.
          // (2) Compatible with previous version, which always use formatted label as
          // input. But in interval scale the formatted label is like '223,445', which
          // maked user replace ','. So we modify it to return original val but remain
          // it as 'string' to avoid error in replacing.
          s.type === "category" ? v : s.type === "value" ? m + "" : m,
          g
        ) : w
      })
    });
    if (M.anid = "label_" + m, p) {
      const b = lo.makeAxisEventDataBase(e);
      b.targetType = "axisLabel", b.value = v, b.tickIndex = g, s.type === "category" && (b.dataIndex = m), Zn(M).eventData = b;
    }
    t.add(M), M.updateTransform(), f.push(M), n.add(M), M.decomposeTransform();
  }), f;
}
function w_(n, t, e, i, s) {
  const r = [], o = [], a = [];
  for (let l = 0; l < n.length; l++) {
    const c = n[l].coord;
    o[0] = c, o[1] = 0, a[0] = c, a[1] = e, t && (be(o, o, t), be(a, a, t));
    const h = new (void 0)({
      shape: {
        x1: o[0],
        y1: o[1],
        x2: a[0],
        y2: a[1]
      },
      style: i,
      z2: 2,
      autoBatch: !0,
      silent: !0
    });
    Ng(h.shape, h.style.lineWidth), h.anid = s + "_" + n[l].tickValue, r.push(h);
  }
  return r;
}
function e2(n, t, e) {
  if (pg(n.axis))
    return;
  const i = n.get(["axisLabel", "showMinLabel"]), s = n.get(["axisLabel", "showMaxLabel"]);
  t = t || [], e = e || [];
  const r = t[0], o = t[1], a = t[t.length - 1], l = t[t.length - 2], c = e[0], h = e[1], u = e[e.length - 1], f = e[e.length - 2];
  i === !1 ? (Et(r), Et(c)) : bd(r, o) && (i ? (Et(o), Et(h)) : (Et(r), Et(c))), s === !1 ? (Et(a), Et(u)) : bd(l, a) && (s ? (Et(l), Et(f)) : (Et(a), Et(u)));
}
function Et(n) {
  n && (n.ignore = !0);
}
function bd(n, t) {
  const e = n && n.getBoundingRect().clone(), i = t && t.getBoundingRect().clone();
  if (!e || !i)
    return;
  const s = Lp([]);
  return Pp(s, s, -n.rotation), e.applyTransform(
    _s([], s, n.getLocalTransform())
  ), i.applyTransform(
    _s([], s, t.getLocalTransform())
  ), e.intersect(i);
}
const n2 = ["axisLine", "axisTickLabel", "axisName"], i2 = ["splitArea", "splitLine", "minorSplitLine"], Qo = class Qo extends Cc {
  constructor() {
    super(...arguments), this.type = Qo.type, this._nowLineTimer = null, this._nowLine = null;
  }
  render(t, e, i, s) {
    this.api = i, this._nowLineTimer && (clearInterval(this._nowLineTimer), this._nowLineTimer = null), this.group.removeAll();
    const r = this._axisGroup;
    if (this._axisGroup = new (void 0)(), this.group.add(this._axisGroup), !t.get("show"))
      return;
    const o = t.getCoordSysModel(), a = nv(o, t), l = new lo(
      t,
      N(
        {
          handleAutoShown(h) {
            const u = o.coordinateSystem.getCartesians();
            for (let f = 0; f < u.length; f++)
              if (Zy(
                u[f].getOtherAxis(t.axis).scale
              ))
                return !0;
            return !1;
          }
        },
        a
      )
    );
    t.axis.dim === "x" && t.axis.type === "time" && this.renderTimelineHeader(t, o, i), D(n2, l.add, l), this._axisGroup.add(l.getGroup()), D(
      i2,
      function(h) {
        t.get([h, "show"]) && s2[h](this, this._axisGroup, t, o);
      },
      this
    ), t.axis.dim === "x" && t.axis.type === "time" && this.renderNowLine(t, o), s && s.type === "changeAxisOrder" && s.isInitSort || Wx(r, this._axisGroup, t), super.render(t, e, i, s);
  }
  dispose() {
    this._nowLineTimer && (clearInterval(this._nowLineTimer), this._nowLineTimer = null), this._nowLine = null, super.dispose.apply(this, arguments);
  }
  renderTimelineHeader(t, e, i) {
    const r = e.coordinateSystem.getRect(), o = Math.max(0, r.y - 56), a = r.y, l = Math.max(0, a - o), c = new (void 0)({ silent: !0 });
    c.add(new (void 0)({
      shape: { x: 0, y: o, width: i.getWidth(), height: a - o },
      style: { fill: "#F8FAFC" },
      z2: -10,
      silent: !0
    })), c.add(new (void 0)({
      shape: { x1: 0, y1: a, x2: i.getWidth(), y2: a },
      style: { stroke: "#D8E0E8", lineWidth: 1 },
      z2: 1,
      silent: !0
    })), c.add(new (void 0)({
      shape: { x1: r.x, y1: o, x2: r.x, y2: a },
      style: { stroke: "#D8E0E8", lineWidth: 1 },
      z2: 1,
      silent: !0
    }));
    const h = t.axis.scale.getExtent(), u = new Date(Number(h[0])), f = ["日", "一", "二", "三", "四", "五", "六"], d = Number.isFinite(u.getTime()) ? `${u.getMonth() + 1}月${u.getDate()}日 · 周${f[u.getDay()]}` : "";
    c.add(new (void 0)({
      style: {
        x: 16,
        y: o + l / 2,
        text: "资源",
        fill: "#64748B",
        fontSize: 12,
        align: "left",
        verticalAlign: "middle"
      },
      z2: 8,
      silent: !0
    })), c.add(new (void 0)({
      style: {
        x: r.x + 12,
        y: o + 14,
        text: d,
        fill: "#64748B",
        fontSize: 12,
        align: "left",
        verticalAlign: "middle"
      },
      z2: 8,
      silent: !0
    })), this._axisGroup.add(c);
  }
  renderNowLine(t, e) {
    const i = t.axis, r = e.coordinateSystem.getRect(), o = Ic(this.api, r), a = new zrender.Line({
      shape: {
        x1: r.x,
        y1: r.y,
        x2: r.x,
        y2: o
      },
      style: {
        stroke: "#2563EB",
        lineWidth: 2,
        opacity: 0.88
      },
      z2: 6,
      silent: !0
    }), l = () => {
      const c = Date.now(), h = i.scale.getExtent(), u = Math.min(h[0], h[1]), f = Math.max(h[0], h[1]), d = c >= u && c <= f;
      if (a.ignore = !d, d) {
        const p = i.toGlobalCoord(i.dataToCoord(c));
        a.setShape({ x1: p, x2: p });
      }
      a.dirty(), this.api.getZr().refresh();
    };
    this._nowLine = a, this._axisGroup.add(a), l(), this._nowLineTimer = setInterval(l, 1e3), a.animate("style", !0).when(900, { opacity: 0.58 }).when(1800, { opacity: 0.88 }).start();
  }
};
Qo.type = "cartesianAxis";
let Oo = Qo;
function Ic(n, t) {
  const e = { width: n.getWidth(), height: n.getHeight() };
  let i = t.y + t.height;
  return n.getModel().eachComponent("dataZoom", function(s) {
    if (s.subType !== "slider" || s.getOrient() !== "horizontal" || s.get("show") === !1)
      return;
    const r = Gs(
      Hs(s.option),
      e
    );
    i = Math.max(i, r.y);
  }), Math.min(i, e.height);
}
const s2 = {
  splitLine(n, t, e, i) {
    const s = e.axis, o = i.coordinateSystem.getRect(), a = s.getTicksCoords(), l = Ic(n.api, o);
    s.dim === "x" && a.forEach(function(c) {
      const h = o.x + c.coord, u = new Date(c.tickValue), f = Number.isFinite(u.getTime()) && u.getMinutes() === 0;
      t.add(new zrender.Line({
        shape: {
          x1: h,
          y1: o.y,
          x2: h,
          y2: l
        },
        style: {
          stroke: f ? "#B8C6D5" : "#E0E6ED",
          lineWidth: f ? 1.5 : 1,
          lineDash: null
        },
        z2: 0,
        silent: !0
      }));
    });
  },
  minorSplitLine(n, t, e, i) {
    const s = e.axis;
    if (s.dim !== "x") return;
    const o = i.coordinateSystem.getRect(), a = s.getTicksCoords(), l = Ic(n.api, o);
    for (let c = 0; c < a.length - 1; c++) {
      const h = o.x + (a[c].coord + a[c + 1].coord) / 2;
      t.add(new zrender.Line({
        shape: {
          x1: h,
          y1: o.y,
          x2: h,
          y2: l
        },
        style: {
          stroke: "#EDF1F5",
          lineWidth: 1,
          lineDash: null
        },
        z2: 0,
        silent: !0
      }));
    }
  },
  splitArea(n, t, e, i) {
  }
}, Jo = class Jo extends Oo {
  constructor() {
    super(...arguments), this.type = Jo.type;
  }
};
Jo.type = "xAxis";
let Fo = Jo;
const Gh = class Gh extends Oo {
  constructor() {
    super(...arguments), this.type = Fo.type;
  }
};
Gh.type = "yAxis";
let Ec = Gh;
const Td = {
  // gridIndex: 0,
  // gridId: '',
  offset: 0
};
function r2(n) {
  wd(
    n,
    "x",
    Js,
    Td
  ), wd(
    n,
    "y",
    Js,
    Td
  ), n.registerComponentView(Fo), n.registerComponentView(Ec), n.registerPreprocessor(function(t) {
    t.xAxis && t.yAxis && !t.grid && (t.grid = {});
  });
}
const o2 = ["x", "y"], a2 = ["cartesian2d"];
function Yn(n) {
  return n + "Axis";
}
function l2(n) {
  const t = n.get("coordinateSystem");
  return st(a2, t) >= 0;
}
function S_(n) {
  const t = n.piModel, e = {
    infoList: [],
    infoMap: F()
  };
  return n.eachTargetAxis(function(i, s) {
    const r = t.getComponent(
      Yn(i),
      s
    );
    if (!r)
      return;
    const o = r.getCoordSysModel();
    if (!o)
      return;
    const a = o.uid;
    let l = e.infoMap.get(a);
    l || (l = { model: o, axisModels: [] }, e.infoList.push(l), e.infoMap.set(a, l)), l.axisModels.push(r);
  }), e;
}
function c2(n, t) {
  const e = F(), i = [], s = F();
  n.eachComponent(
    { mainType: "dataZoom", query: t },
    function(h) {
      s.get(h.uid) || a(h);
    }
  );
  let r;
  do
    r = !1, n.eachComponent("dataZoom", o);
  while (r);
  function o(h) {
    !s.get(h.uid) && l(h) && (a(h), r = !0);
  }
  function a(h) {
    s.set(h.uid, !0), i.push(h), c(h);
  }
  function l(h) {
    let u = !1;
    return h.eachTargetAxis(function(f, d) {
      const p = e.get(f);
      p && p[d] && (u = !0);
    }), u;
  }
  function c(h) {
    h.eachTargetAxis(function(u, f) {
      (e.get(u) || e.set(u, []))[f] = !0;
    });
  }
  return i;
}
class Md {
  constructor() {
    this.indexList = [], this.indexMap = [];
  }
  add(t) {
    this.indexMap[t] || (this.indexList.push(t), this.indexMap[t] = !0);
  }
}
const mi = class mi extends U {
  constructor() {
    super(...arguments), this.type = mi.type, this._autoThrottle = !0, this._noTarget = !0, this._rangePropMode = ["percent", "percent"];
  }
  init(t, e, i) {
    const s = h2(t);
    this.settledOption = s, this.mergeDefaultAndTheme(t, i), this._doInit(s);
  }
  eachTargetAxis(t, e) {
    this._targetAxisInfoMap.each(function(i, s) {
      D(i.indexList, function(r) {
        t.call(e, s, r);
      });
    });
  }
  getAxisProxy(t, e) {
    const i = this.getAxisModel(t, e);
    if (i)
      return i.__dzAxisProxy;
  }
  getAxisModel(t, e) {
    const i = this._targetAxisInfoMap.get(t);
    if (i && i.indexMap[e])
      return this.piModel.getComponent(
        Yn(t),
        e
      );
  }
  _doInit(t) {
    const e = this.option;
    this._setDefaultThrottle(t), this._updateRangeUse(t);
    const i = this.settledOption;
    D(
      [
        ["start", "startValue"],
        ["end", "endValue"]
      ],
      function(s, r) {
        this._rangePropMode[r] === "value" && (e[s[0]] = i[s[0]] = null);
      },
      this
    ), this._resetTarget();
  }
  _setDefaultThrottle(t) {
    if (t.hasOwnProperty("throttle") && (this._autoThrottle = !1), this._autoThrottle) {
      const e = this.piModel.option;
      this.option.throttle = e.animation && e.animationDurationUpdate > 0 ? 100 : 20;
    }
  }
  _updateRangeUse(t) {
    const e = this._rangePropMode, i = this.get("rangeMode");
    D(
      [
        ["start", "startValue"],
        ["end", "endValue"]
      ],
      function(s, r) {
        const o = t[s[0]] != null, a = t[s[1]] != null;
        o && !a ? e[r] = "percent" : !o && a ? e[r] = "value" : i ? e[r] = i[r] : o && (e[r] = "percent");
      }
    );
  }
  _resetTarget() {
    const t = this.get("orient", !0), e = this._targetAxisInfoMap = F();
    this._fillSpecifiedTargetAxis(e) ? this._orient = t || this._makeAutoOrientByTargetAxis() : (this._orient = t || "horizontal", this._fillAutoTargetAxisByOrient(e, this._orient)), this._noTarget = !0, e.each(function(s) {
      s.indexList.length && (this._noTarget = !1);
    }, this);
  }
  _fillSpecifiedTargetAxis(t) {
    let e = !1;
    return D(
      o2,
      function(i) {
        const s = this.getReferringComponents(
          Yn(i),
          rm
        );
        if (!s.specified)
          return;
        e = !0;
        const r = new Md();
        D(s.models, function(o) {
          r.add(o.componentIndex);
        }), t.set(i, r);
      },
      this
    ), e;
  }
  _fillAutoTargetAxisByOrient(t, e) {
    const i = this.piModel;
    let s = !0;
    if (s) {
      const o = e === "vertical" ? "y" : "x", a = i.findComponents({ mainType: o + "Axis" });
      r(a, o);
    }
    function r(o, a) {
      const l = o[0];
      if (!l)
        return;
      const c = new Md();
      if (c.add(l.componentIndex), t.set(a, c), s = !1, a === "x" || a === "y") {
        const h = l.getReferringComponents(
          "grid",
          Me
        ).models[0];
        h && D(o, function(u) {
          l.componentIndex !== u.componentIndex && h === u.getReferringComponents("grid", Me).models[0] && c.add(u.componentIndex);
        });
      }
    }
  }
  _makeAutoOrientByTargetAxis() {
    let t;
    return this.eachTargetAxis(function(e) {
      !t && (t = e);
    }, this), t === "y" ? "vertical" : "horizontal";
  }
  getRangePropMode() {
    return this._rangePropMode.slice();
  }
  getOrient() {
    return this._orient;
  }
  setRawRange(t) {
    const e = this.option, i = this.settledOption;
    D(
      [
        ["start", "startValue"],
        ["end", "endValue"]
      ],
      function(s) {
        (t[s[0]] != null || t[s[1]] != null) && (e[s[0]] = i[s[0]] = t[s[0]], e[s[1]] = i[s[1]] = t[s[1]]);
      },
      this
    ), this._updateRangeUse(t);
  }
  getPercentRange() {
    const t = this.findRepresentativeAxisProxy();
    if (t)
      return t.getDataPercentWindow();
  }
  findRepresentativeAxisProxy(t) {
    if (t)
      return t.__dzAxisProxy;
    let e;
    const i = this._targetAxisInfoMap.keys();
    for (let s = 0; s < i.length; s++) {
      const r = i[s], o = this._targetAxisInfoMap.get(r);
      for (let a = 0; a < o.indexList.length; a++) {
        const l = this.getAxisProxy(r, o.indexList[a]);
        if (l.hostedBy(this))
          return l;
        e || (e = l);
      }
    }
    return e;
  }
  noTarget() {
    return this._noTarget;
  }
  getFirstTargetAxisModel() {
    let t;
    return this.eachTargetAxis(function(e, i) {
      t == null && (t = this.piModel.getComponent(
        Yn(e),
        i
      ));
    }, this), t;
  }
};
mi.type = "dataZoom", mi.dependencies = ["xAxis", "yAxis"], mi.defaultOption = {
  // zlevel: 0,
  z: 4,
  // Higher than normal component (z: 2).
  filterMode: "filter",
  start: 0,
  end: 100
};
let ki = mi;
function h2(n) {
  const t = {};
  return D(
    ["start", "end", "startValue", "endValue", "throttle"],
    function(e) {
      n.hasOwnProperty(e) && (t[e] = n[e]);
    }
  ), t;
}
function u2(n) {
  n.registerAction(
    "dataZoom",
    function(t, e) {
      const i = c2(e, t);
      D(i, function(s) {
        s.setRawRange({
          start: t.start,
          end: t.end,
          startValue: t.startValue,
          endValue: t.endValue
        });
      });
    }
  );
}
function kh(n, t, e, i, s, r) {
  n = n || 0;
  const o = e[1] - e[0];
  if (s != null && (s = hi(s, [0, o])), r != null && (r = Math.max(r, s != null ? s : 0)), i === "all") {
    let u = Math.abs(t[1] - t[0]);
    u = hi(u, [0, o]), s = r = hi(u, [s, r]), i = 0;
  }
  t[0] = hi(t[0], e), t[1] = hi(t[1], e);
  const a = Cl(t, i);
  t[i] += n;
  const l = s || 0, c = e.slice();
  a.sign < 0 ? c[0] += l : c[1] -= l, t[i] = hi(t[i], c);
  let h;
  return h = Cl(t, i), s != null && (h.sign !== a.sign || h.span < s) && (t[1 - i] = t[i] + a.sign * s), h = Cl(t, i), r != null && h.span > r && (t[1 - i] = t[i] + h.sign * r), t;
}
function Cl(n, t) {
  const e = n[t] - n[1 - t];
  return { span: Math.abs(e), sign: e > 0 ? -1 : e < 0 ? 1 : t ? -1 : 1 };
}
function hi(n, t) {
  return Math.min(
    t[1] != null ? t[1] : 1 / 0,
    Math.max(t[0] != null ? t[0] : -1 / 0, n)
  );
}
const Cd = os;
class f2 {
  constructor(t, e, i, s) {
    this._dimName = t, this._axisIndex = e, this.piModel = s, this._dataZoomModel = i;
  }
  hostedBy(t) {
    return this._dataZoomModel === t;
  }
  getDataValueWindow() {
    return this._valueWindow.slice();
  }
  getTargetSeriesModels() {
    const t = [];
    return this.piModel.eachSeries(function(e) {
      if (l2(e)) {
        const i = Yn(this._dimName), s = e.getReferringComponents(
          i,
          Me
        ).models[0];
        s && this._axisIndex === s.componentIndex && t.push(e);
      }
    }, this), t;
  }
  getAxisModel() {
    return this.piModel.getComponent(
      this._dimName + "Axis",
      this._axisIndex
    );
  }
  getDataPercentWindow() {
    return this._percentWindow.slice();
  }
  getMinMaxSpan() {
    return V(this._minMaxSpan);
  }
  calculateDataWindow(t) {
    const e = this._dataExtent, s = this.getAxisModel().axis.scale, r = this._dataZoomModel.getRangePropMode(), o = [0, 100], a = [], l = [];
    let c;
    D(["start", "end"], function(f, d) {
      let p = t[f], _ = t[f + "Value"];
      r[d] === "percent" ? (p == null && (p = o[d]), _ = s.parse(
        ot(p, o, e)
      )) : (c = !0, _ = _ == null ? e[d] : s.parse(_), p = ot(
        _,
        e,
        o
      )), l[d] = _ == null || isNaN(_) ? e[d] : _, a[d] = p == null || isNaN(p) ? o[d] : p;
    }), Cd(l), Cd(a);
    const h = this._minMaxSpan;
    c ? u(
      l,
      a,
      e,
      o,
      !1
    ) : u(a, l, o, e, !0);
    function u(f, d, p, _, g) {
      const m = g ? "Span" : "ValueSpan";
      kh(
        0,
        f,
        p,
        "all",
        h["min" + m],
        h["max" + m]
      );
      for (let y = 0; y < 2; y++)
        d[y] = ot(
          f[y],
          p,
          _,
          !0
        ), g && (d[y] = s.parse(d[y]));
    }
    return {
      valueWindow: l,
      percentWindow: a
    };
  }
  reset(t) {
    if (t !== this._dataZoomModel)
      return;
    const e = this.getTargetSeriesModels();
    this._dataExtent = d2(this, this._dimName, e), this._updateMinMaxSpan();
    const i = this.calculateDataWindow(t.settledOption);
    this._valueWindow = i.valueWindow, this._percentWindow = i.percentWindow, this._setAxisModel();
  }
  filterData(t, e) {
    if (t !== this._dataZoomModel)
      return;
    const i = this._dimName, s = this.getTargetSeriesModels(), r = t.get("filterMode"), o = this._valueWindow;
    if (r === "none")
      return;
    D(s, function(l) {
      let c = l.getData();
      const h = c.mapDimensionsAll(i);
      if (h.length) {
        if (r === "weakFilter") {
          const u = c.getStore(), f = H(
            h,
            (d) => c.getDimensionIndex(d),
            c
          );
          c.filterSelf(function(d) {
            let p, _, g;
            for (let m = 0; m < h.length; m++) {
              const y = u.get(f[m], d), v = !isNaN(y), S = y < o[0], w = y > o[1];
              if (v && !S && !w)
                return !0;
              v && (g = !0), S && (p = !0), w && (_ = !0);
            }
            return g && p && _;
          });
        } else
          D(h, function(u) {
            if (r === "empty")
              l.setData(
                c = c.map(u, function(f) {
                  return a(f) ? f : NaN;
                })
              );
            else {
              const f = {};
              f[u] = o, c.selectRange(f);
            }
          });
        D(h, function(u) {
          c.setApproximateExtent(o, u);
        });
      }
    });
    function a(l) {
      return l >= o[0] && l <= o[1];
    }
  }
  _updateMinMaxSpan() {
    const t = this._minMaxSpan = {}, e = this._dataZoomModel, i = this._dataExtent;
    D(
      ["min", "max"],
      function(s) {
        let r = e.get(
          s + "Span"
        ), o = e.get(
          s + "ValueSpan"
        );
        o != null && (o = this.getAxisModel().axis.scale.parse(o)), o != null ? r = ot(
          i[0] + o,
          i,
          [0, 100],
          !0
        ) : r != null && (o = ot(r, [0, 100], i, !0) - i[0]), t[s + "Span"] = r, t[s + "ValueSpan"] = o;
      },
      this
    );
  }
  _setAxisModel() {
    const t = this.getAxisModel(), e = this._percentWindow, i = this._valueWindow;
    if (!e)
      return;
    let s = mp(i, [0, 500]);
    s = Math.min(s, 20);
    const r = t.axis.scale.rawExtentInfo;
    e[0] !== 0 && r.setDeterminedMinMax(
      "min",
      +i[0].toFixed(s)
    ), e[1] !== 100 && r.setDeterminedMinMax(
      "max",
      +i[1].toFixed(s)
    ), r.freeze();
  }
}
function d2(n, t, e) {
  const i = [1 / 0, -1 / 0];
  D(e, function(o) {
    P1(i, o.getData(), t);
  });
  const s = n.getAxisModel(), r = ug(
    s.axis.scale,
    s,
    i
  ).calculate();
  return [r.min, r.max];
}
const p2 = {
  getTargetSeries(n) {
    function t(s) {
      n.eachComponent(
        "dataZoom",
        function(r) {
          r.eachTargetAxis(function(o, a) {
            const l = n.getComponent(
              Yn(o),
              a
            );
            s(
              o,
              a,
              l,
              r
            );
          });
        }
      );
    }
    t(function(s, r, o, a) {
      o.__dzAxisProxy = null;
    });
    const e = [];
    t(function(s, r, o, a) {
      o.__dzAxisProxy || (o.__dzAxisProxy = new f2(
        s,
        r,
        a,
        n
      ), e.push(o.__dzAxisProxy));
    });
    const i = F();
    return D(e, function(s) {
      D(s.getTargetSeriesModels(), function(r) {
        i.set(r.uid, r);
      });
    }), i;
  },
  overallReset(n, t) {
    n.eachComponent("dataZoom", function(e) {
      e.eachTargetAxis(function(i, s) {
        e.getAxisProxy(i, s).reset(e);
      }), e.eachTargetAxis(function(i, s) {
        e.getAxisProxy(i, s).filterData(e, t);
      });
    });
  }
};
let Dd = !1;
function b_(n) {
  Dd || (Dd = !0, n.registerProcessor(n.PRIORITY.PROCESSOR.FILTER, p2), u2(n), n.registerSubTypeDefaulter("dataZoom", function() {
    return "slider";
  }));
}
const ta = class ta extends Kt {
  constructor() {
    super(...arguments), this.type = ta.type;
  }
  render(t, e, i, s) {
    this.dataZoomModel = t, this.piModel = e, this.api = i;
  }
};
ta.type = "dataZoom";
let No = ta;
const Id = 7, g2 = 1, Dl = 30, _2 = 7, is = "horizontal", Ed = "vertical", m2 = 5, y2 = ["line", "bar", "candlestick", "scatter"], v2 = {
  easing: "cubicOut",
  duration: 100,
  delay: 0
}, ea = class ea extends No {
  constructor() {
    super(...arguments), this.type = ea.type, this._displayables = {};
  }
  init(t, e) {
    this.api = e, this._onBrush = P(this._onBrush, this), this._onBrushEnd = P(this._onBrushEnd, this);
  }
  render(t, e, i, s) {
    if (super.render.apply(this, arguments), Tp(
      this,
      "_dispatchZoomAction",
      t.get("throttle"),
      "fixRate"
    ), this._orient = t.getOrient(), t.get("show") === !1) {
      this.group.removeAll();
      return;
    }
    if (t.noTarget()) {
      this._clear(), this.group.removeAll();
      return;
    }
    (!s || s.type !== "dataZoom" || s.from !== this.uid) && this._buildView(), this._updateView(), this.group.attr({
      invisible: !!t.get("invisible"),
      silent: !!t.get("invisible")
    });
  }
  updateLayout(t, e) {
    if (this.dataZoomModel = t, this.api = e, this._orient = t.getOrient(), !this._displayables.sliderGroup) {
      this.render(t, e.getModel(), e, null);
      return;
    }
    this._resetLocation(), this._positionGroup(), this.group.attr({
      invisible: !!t.get("invisible"),
      silent: !!t.get("invisible")
    });
  }
  _dispatchZoomAction(t) {
    const e = this._range;
    this.api.dispatchAction({
      type: "dataZoom",
      from: this.uid,
      dataZoomId: this.dataZoomModel.id,
      animation: t ? v2 : null,
      start: e[0],
      end: e[1]
    });
  }
  _clear() {
    lm(this, "_dispatchZoomAction");
    const t = this.api.getZr();
    t.off("mousemove", this._onBrush), t.off("mouseup", this._onBrushEnd);
  }
  _buildView() {
    const t = this.group;
    t.removeAll(), this._brushing = !1, this._displayables.brushRect = null, this._resetLocation(), this._resetInterval();
    const e = this._displayables.sliderGroup = new (void 0)();
    this._renderBackground(), this._renderHandle(), this._renderDataShadow(), t.add(e), this._positionGroup();
  }
  _getViewExtent() {
    return [0, this._size[0]];
  }
  //设置滚动条最初的位置
  _resetLocation() {
    const t = this.dataZoomModel, e = this.api, s = t.get("brushSelect") ? _2 : 0, r = this._findCoordRect(), o = { width: e.getWidth(), height: e.getHeight() }, a = this._orient === is ? {
      // Why using 'right', because right should be used in vertical,
      // and it is better to be consistent for dealing with position param merge.
      right: o.width - r.x - r.width,
      top: o.height - Dl - Id - s,
      width: r.width,
      height: Dl
    } : {
      // vertical
      right: Id,
      top: r.y,
      width: Dl,
      height: r.height
    }, l = Hs(t.option);
    D(["right", "top", "width", "height"], function(h) {
      l[h] === "ph" && (l[h] = a[h]);
    });
    const c = Gs(l, o);
    this._location = { x: c.x, y: c.y }, this._size = [c.width, c.height], this._orient === Ed && this._size.reverse();
  }
  _positionGroup() {
    const t = this.group, e = this._location, i = this._orient, s = this.dataZoomModel.getFirstTargetAxisModel(), r = s && s.get("inverse"), o = this._displayables.sliderGroup, a = (this._dataShadowInfo || {}).otherAxisInverse;
    o.attr(
      i === is && !r ? { scaleY: a ? 1 : -1, scaleX: 1 } : i === is && r ? { scaleY: a ? 1 : -1, scaleX: -1 } : i === Ed && !r ? {
        scaleY: a ? -1 : 1,
        scaleX: 1,
        rotation: Math.PI / 2
      } : (
        // Don't use Math.PI, considering shadow direction.
        {
          scaleY: a ? -1 : 1,
          scaleX: -1,
          rotation: Math.PI / 2
        }
      )
    );
    const l = t.getBoundingRect([o]);
    t.x = e.x - l.x, t.y = e.y - l.y, t.markRedraw();
  }
  _findCoordRect() {
    let t;
    const e = S_(
      this.dataZoomModel
    ).infoList;
    if (!t && e.length) {
      const i = e[0].model.coordinateSystem;
      t = i.getRect && i.getRect();
    }
    if (!t) {
      const i = this.api.getWidth(), s = this.api.getHeight();
      t = {
        x: i * 0.2,
        y: s * 0.2,
        width: i * 0.6,
        height: s * 0.6
      };
    }
    return t;
  }
  _resetInterval() {
    const t = this._range = this.dataZoomModel.getPercentRange(), e = this._getViewExtent();
    this._handleEnds = [
      ot(t[0], [0, 100], e, !0),
      ot(t[1], [0, 100], e, !0)
    ];
  }
  _renderDataShadow() {
    const t = this._dataShadowInfo = this._prepareDataShadowInfo();
    if (this._displayables.dataShadowSegs = [], !t)
      return;
    const e = this._size, i = this._shadowSize || [], s = t.series, r = s.getRawData(), o = s.getShadowDim && s.getShadowDim(), a = o && r.getDimensionInfo(o) ? s.getShadowDim() : t.otherDim;
    if (a == null)
      return;
    let l = this._shadowPolygonPts, c = this._shadowPolylinePts;
    if (r !== this._shadowData || a !== this._shadowDim || e[0] !== i[0] || e[1] !== i[1]) {
      let f = r.getDataExtent(a);
      const d = (f[1] - f[0]) * 0.3;
      f = [
        f[0] - d,
        f[1] + d
      ];
      const p = [0, e[1]], _ = [0, e[0]], g = [
        [e[0], 0],
        [0, 0]
      ], m = [], y = _[1] / (r.count() - 1);
      let v = 0;
      const S = Math.round(r.count() / e[0]);
      let w;
      r.each([a], function(x, M) {
        if (S > 0 && M % S) {
          v += y;
          return;
        }
        const b = x == null || isNaN(x) || x === "", T = b ? 0 : ot(x, f, p, !0);
        b && !w && M ? (g.push([g[g.length - 1][0], 0]), m.push([m[m.length - 1][0], 0])) : !b && w && (g.push([v, 0]), m.push([v, 0])), g.push([v, T]), m.push([v, T]), v += y, w = b;
      }), l = this._shadowPolygonPts = g, c = this._shadowPolylinePts = m;
    }
    this._shadowData = r, this._shadowDim = a, this._shadowSize = [e[0], e[1]];
    const h = this.dataZoomModel;
    function u(f) {
      const d = h.getModel(
        f ? "selectedDataBackground" : "dataBackground"
      ), p = new (void 0)(), _ = new (void 0)({
        shape: { points: l },
        segmentIgnoreThreshold: 1,
        style: d.getModel("areaStyle").getAreaStyle(),
        silent: !0,
        z2: -20
      }), g = new (void 0)({
        shape: { points: c },
        segmentIgnoreThreshold: 1,
        style: d.getModel("lineStyle").getLineStyle(),
        silent: !0,
        z2: -19
      });
      return p.add(_), p.add(g), p;
    }
    for (let f = 0; f < 3; f++) {
      const d = u(f === 1);
      this._displayables.sliderGroup.add(d), this._displayables.dataShadowSegs.push(d);
    }
  }
  _prepareDataShadowInfo() {
    const t = this.dataZoomModel, e = t.get("showDataShadow");
    if (e === !1)
      return;
    let i;
    const s = this.piModel;
    return t.eachTargetAxis(function(r, o) {
      const a = t.getAxisProxy(r, o).getTargetSeriesModels();
      D(
        a,
        function(l) {
          if (i || e !== !0 && st(y2, l.get("type")) < 0)
            return;
          const c = s.getComponent(
            Yn(r),
            o
          ).axis;
          let h = x2(r), u;
          const f = l.coordinateSystem;
          h != null && f.getOtherAxis && (u = f.getOtherAxis(c).inverse), h = l.getData().mapDimension(h), i = {
            thisAxis: c,
            series: l,
            thisDim: r,
            otherDim: h,
            otherAxisInverse: u
          };
        },
        this
      );
    }, this), i;
  }
  _renderHandle() {
    const t = this.group, e = this._displayables, i = e.handles = [
      null,
      null
    ], s = e.handleLabels = [null, null], r = this._displayables.sliderGroup, o = this._size, a = this.dataZoomModel, l = this.api, c = a.get("borderRadius") || 0, h = a.get("brushSelect"), u = e.filler = new zrender.Rect({
      silent: h,
      style: {
        fill: a.get("fillerColor")
      },
      textConfig: {
        position: "inside"
      }
    });
    r.add(u), r.add(
      new zrender.Rect({
        silent: !0,
        subPixelOptimize: !0,
        shape: {
          x: 0,
          y: 0,
          width: o[0],
          height: o[1],
          r: c
        },
        style: {
          // deprecated option
          stroke: a.get("dataBackgroundColor") || a.get("borderColor"),
          lineWidth: g2,
          fill: "rgba(0,0,0,0)"
        }
      })
    ), D(
      [0, 1],
      function(d) {
        let p = a.get("handleIcon");
        !Do[p] && p.indexOf("path://") < 0 && p.indexOf("image://") < 0 && (p = "path://" + p);
        const _ = Io(
          p,
          -1,
          0,
          2,
          2,
          null,
          !0
        );
        _.attr({
          cursor: Rd(this._orient),
          draggable: !0,
          drift: P(this._onDragMove, this, d),
          ondragend: P(this._onDragEnd, this),
          onmouseover: P(this._showDataInfo, this, !0),
          onmouseout: P(this._showDataInfo, this, !1),
          z2: 5
        }), _.attr({
          draggable: !0,
          drift: P(this._onDragMove, this, d)
        });
        const g = _.getBoundingRect(), m = a.get("handleSize");
        this._handleHeight = on(m, this._size[1]), this._handleWidth = g.width / g.height * this._handleHeight, _.setStyle(a.getModel("handleStyle").getItemStyle()), _.style.strokeNoScale = !0, _.rectHover = !0, _.ensureState("emphasis").style = a.getModel(["emphasis", "handleStyle"]).getItemStyle(), sb(_);
        const y = a.get("handleColor");
        y != null && (_.style.fill = y), r.add(i[d] = _);
        const v = a.getModel("textStyle");
        t.add(
          s[d] = new (void 0)({
            silent: !0,
            invisible: !0,
            style: Ap(v, {
              x: 0,
              y: 0,
              text: "",
              verticalAlign: "middle",
              align: "center",
              fill: v.getTextColor(),
              font: v.getFont()
            }),
            z2: 10
          })
        );
      },
      this
    );
    let f = u;
    if (h) {
      const d = on(
        a.get("moveHandleSize"),
        o[1]
      ), p = e.moveHandle = new (void 0)({
        style: a.getModel("moveHandleStyle").getItemStyle(),
        silent: !0,
        shape: {
          r: [0, 0, 2, 2],
          y: o[1] - 0.5,
          height: d
        }
      }), _ = d * 0.8, g = e.moveHandleIcon = Io(
        a.get("moveHandleIcon"),
        -_ / 2,
        -_ / 2,
        _,
        _,
        "#fff",
        !0
      );
      g.silent = !0, g.y = o[1] + d / 2 - 0.5, p.ensureState("emphasis").style = a.getModel(["emphasis", "moveHandleStyle"]).getItemStyle();
      const m = Math.min(
        o[1] / 2,
        Math.max(d, 10)
      );
      f = e.moveZone = new (void 0)({
        invisible: !0,
        shape: {
          y: o[1] - m,
          height: d + m
        }
      }), f.on("mouseover", () => {
        l.enterEmphasis(p);
      }).on("mouseout", () => {
        l.leaveEmphasis(p);
      }), r.add(p), r.add(g), r.add(f);
    }
    f.attr({
      draggable: !0,
      cursor: Rd(this._orient),
      drift: P(this._onDragMove, this, "all"),
      ondragstart: P(this._showDataInfo, this, !0),
      ondragend: P(this._onDragEnd, this),
      onmouseover: P(this._showDataInfo, this, !0),
      onmouseout: P(this._showDataInfo, this, !1)
    });
  }
  _updateInterval(t, e) {
    const i = this.dataZoomModel, s = this._handleEnds, r = this._getViewExtent(), o = i.findRepresentativeAxisProxy().getMinMaxSpan(), a = [0, 100];
    kh(
      e,
      s,
      r,
      i.get("zoomLock") ? "all" : t,
      o.minSpan != null ? ot(o.minSpan, a, r, !0) : null,
      o.maxSpan != null ? ot(o.maxSpan, a, r, !0) : null
    );
    const l = this._range, c = this._range = os([
      ot(s[0], r, a, !0),
      ot(s[1], r, a, !0)
    ]);
    return !l || l[0] !== c[0] || l[1] !== c[1];
  }
  _updateView(t) {
    const e = this._displayables, i = this._handleEnds, s = os(i.slice()), r = this._size;
    D(
      [0, 1],
      function(c) {
        const h = e.handles[c], u = this._handleHeight;
        h.attr({
          scaleX: u / 2,
          scaleY: u / 2,
          // This is a trick, by adding an extra tiny offset to let the default handle's end point align to the drag window.
          // NOTE: It may affect some custom shapes a bit. But we prefer to have better result by default.
          x: i[c] + (c ? -1 : 1),
          y: r[1] / 2 - u / 2
        });
      },
      this
    ), e.filler.setShape({
      x: s[0],
      y: 0,
      width: s[1] - s[0],
      height: r[1]
    });
    const o = {
      x: s[0],
      width: s[1] - s[0]
    };
    e.moveHandle && (e.moveHandle.setShape(o), e.moveZone.setShape(o), e.moveZone.getBoundingRect(), e.moveHandleIcon && e.moveHandleIcon.attr(
      "x",
      o.x + o.width / 2
    ));
    const a = e.dataShadowSegs, l = [0, s[0], s[1], r[0]];
    for (let c = 0; c < a.length; c++) {
      const h = a[c];
      let u = h.getClipPath();
      u || (u = new (void 0)(), h.setClipPath(u)), u.setShape({
        x: l[c],
        y: 0,
        width: l[c + 1] - l[c],
        height: r[1]
      });
    }
    this._updateDataInfo(t);
  }
  _updateDataInfo(t) {
    const e = this.dataZoomModel, i = this._displayables, s = i.handleLabels, r = this._orient;
    let o = ["", ""];
    if (e.get("showDetail")) {
      const c = e.findRepresentativeAxisProxy();
      if (c) {
        const h = c.getAxisModel().axis, u = this._range, f = t ? (
          // See #4434, data and axis are not processed and reset yet in non-realtime mode.
          c.calculateDataWindow({
            start: u[0],
            end: u[1]
          }).valueWindow
        ) : c.getDataValueWindow();
        o = [
          this._formatLabel(f[0], h),
          this._formatLabel(f[1], h)
        ];
      }
    }
    const a = os(this._handleEnds.slice());
    l.call(this, 0), l.call(this, 1);
    function l(c) {
      const h = zx(
        i.handles[c].parent,
        this.group
      ), u = Bx(
        c === 0 ? "right" : "left",
        h
      ), f = this._handleWidth / 2 + m2, d = Mo(
        [
          a[c] + (c === 0 ? -f : f),
          this._size[1] / 2
        ],
        h
      );
      s[c].setStyle({
        x: d[0],
        y: d[1],
        verticalAlign: r === is ? "middle" : u,
        align: r === is ? u : "center",
        text: o[c]
      });
    }
  }
  _renderBackground() {
    const t = this.dataZoomModel, e = this._size, i = this._displayables.sliderGroup, s = t.get("brushSelect");
    i.add(
      new zrender.Rect({
        silent: !0,
        shape: {
          x: 0,
          y: 0,
          width: e[0],
          height: e[1]
        },
        style: {
          fill: t.get("backgroundColor")
        },
        z2: -40
      })
    );
    const r = new zrender.Rect({
      shape: {
        x: 0,
        y: 0,
        width: e[0],
        height: e[1]
      },
      style: {
        fill: "transparent"
      },
      z2: 0,
      onclick: P(this._onClickPanel, this)
    }), o = this.api.getZr();
    s ? (r.on("mousedown", this._onBrushStart, this), r.cursor = "crosshair", o.on("mousemove", this._onBrush), o.on("mouseup", this._onBrushEnd)) : (o.off("mousemove", this._onBrush), o.off("mouseup", this._onBrushEnd)), i.add(r);
  }
  _formatLabel(t, e) {
    const i = this.dataZoomModel, s = i.get("labelFormatter");
    let r = i.get("labelPrecision");
    (r == null || r === "auto") && (r = e.getPixelPrecision());
    const o = t == null || isNaN(t) ? "" : (
      // FIXME Glue code
      e.type === "category" || e.type === "time" ? e.scale.getLabel({
        value: Math.round(t)
      }) : (
        // param of toFixed should less then 20.
        t.toFixed(Math.min(r, 20))
      )
    );
    return Q(s) ? s(t, o) : X(s) ? s.replace("{value}", o) : o;
  }
  _showDataInfo(t) {
    t = this._dragging || t;
    const e = this._displayables, i = e.handleLabels;
    i[0].attr("invisible", !t), i[1].attr("invisible", !t), e.moveHandle && this.api[t ? "enterEmphasis" : "leaveEmphasis"](
      e.moveHandle,
      1
    );
  }
  _onDragMove(t, e, i, s) {
    this._dragging = !0, ve(s.event);
    const r = this._displayables.sliderGroup.getLocalTransform(), o = Mo([e, i], r, !0), a = this._updateInterval(t, o[0]), l = this.dataZoomModel.get("realtime");
    this._updateView(!l), a && l && this._dispatchZoomAction(!0);
  }
  _onDragEnd() {
    this._dragging = !1, this._showDataInfo(!1), !this.dataZoomModel.get("realtime") && this._dispatchZoomAction(!1);
  }
  _onClickPanel(t) {
    const e = this._size, i = this._displayables.sliderGroup.transformCoordToLocal(
      t.offsetX,
      t.offsetY
    );
    if (i[0] < 0 || i[0] > e[0] || i[1] < 0 || i[1] > e[1])
      return;
    const s = this._handleEnds, r = (s[0] + s[1]) / 2, o = this._updateInterval("all", i[0] - r);
    this._updateView(), o && this._dispatchZoomAction(!1);
  }
  _onBrushStart(t) {
    const e = t.offsetX, i = t.offsetY;
    this._brushStart = new (void 0)(e, i), this._brushing = !0, this._brushStartTime = +/* @__PURE__ */ new Date();
  }
  _onBrushEnd(t) {
    if (!this._brushing)
      return;
    const e = this._displayables.brushRect;
    if (this._brushing = !1, !e)
      return;
    e.attr("ignore", !0);
    const i = e.shape;
    if (+/* @__PURE__ */ new Date() - this._brushStartTime < 200 && Math.abs(i.width) < 5)
      return;
    const r = this._getViewExtent(), o = [0, 100];
    this._range = os([
      ot(i.x, r, o, !0),
      ot(
        i.x + i.width,
        r,
        o,
        !0
      )
    ]), this._handleEnds = [i.x, i.x + i.width], this._updateView(), this._dispatchZoomAction(!1);
  }
  _onBrush(t) {
    this._brushing && (ve(t.event), this._updateBrushRect(t.offsetX, t.offsetY));
  }
  _updateBrushRect(t, e) {
    const i = this._displayables, s = this.dataZoomModel;
    let r = i.brushRect;
    r || (r = i.brushRect = new zrender.Rect({
      silent: !0,
      style: s.getModel("brushStyle").getItemStyle()
    }), i.sliderGroup.add(r)), r.attr("ignore", !1);
    const o = this._brushStart, a = this._displayables.sliderGroup, l = a.transformCoordToLocal(t, e), c = a.transformCoordToLocal(
      o.x,
      o.y
    ), h = this._size;
    l[0] = Math.max(Math.min(h[0], l[0]), 0), r.setShape({
      x: c[0],
      y: 0,
      width: l[0] - c[0],
      height: h[1]
    });
  }
};
ea.type = "dataZoom.slider";
let Rc = ea;
function x2(n) {
  return { x: "y", y: "x", radius: "angle", angle: "radius" }[n];
}
function Rd(n) {
  return n === "vertical" ? "ns-resize" : "ew-resize";
}
const yi = class yi extends ki {
  constructor() {
    super(...arguments), this.type = yi.type;
  }
};
yi.type = "dataZoom.slider", yi.layoutMode = "box", yi.defaultOption = nh(
  ki.defaultOption,
  {
    show: !0,
    right: "ph",
    // Default align to grid rect.
    top: "ph",
    // Default align to grid rect.
    width: "ph",
    // Default align to grid rect.
    height: "ph",
    // Default align to grid rect.
    left: null,
    // Default align to grid rect.
    bottom: null,
    // Default align to grid rect.
    borderColor: "#d2dbee",
    borderRadius: 3,
    backgroundColor: "rgba(47,69,84,0)",
    // Background of slider zoom component.
    // dataBackgroundColor: '#ddd',
    dataBackground: {
      lineStyle: {
        color: "#d2dbee",
        width: 0.5
      },
      areaStyle: {
        color: "#d2dbee",
        opacity: 0.2
      }
    },
    selectedDataBackground: {
      lineStyle: {
        color: "#8fb0f7",
        width: 0.5
      },
      areaStyle: {
        color: "#8fb0f7",
        opacity: 0.2
      }
    },
    // Color of selected window.
    fillerColor: "rgba(135,175,274,0.2)",
    handleIcon: "path://M-9.35,34.56V42m0-40V9.5m-2,0h4a2,2,0,0,1,2,2v21a2,2,0,0,1-2,2h-4a2,2,0,0,1-2-2v-21A2,2,0,0,1-11.35,9.5Z",
    // Percent of the slider height
    handleSize: "100%",
    handleStyle: {
      color: "#fff",
      borderColor: "#ACB8D1"
    },
    moveHandleSize: 7,
    moveHandleIcon: "path://M-320.9-50L-320.9-50c18.1,0,27.1,9,27.1,27.1V85.7c0,18.1-9,27.1-27.1,27.1l0,0c-18.1,0-27.1-9-27.1-27.1V-22.9C-348-41-339-50-320.9-50z M-212.3-50L-212.3-50c18.1,0,27.1,9,27.1,27.1V85.7c0,18.1-9,27.1-27.1,27.1l0,0c-18.1,0-27.1-9-27.1-27.1V-22.9C-239.4-41-230.4-50-212.3-50z M-103.7-50L-103.7-50c18.1,0,27.1,9,27.1,27.1V85.7c0,18.1-9,27.1-27.1,27.1l0,0c-18.1,0-27.1-9-27.1-27.1V-22.9C-130.9-41-121.8-50-103.7-50z",
    moveHandleStyle: {
      color: "#D2DBEE",
      opacity: 0.7
    },
    showDetail: !0,
    showDataShadow: "auto",
    // Default auto decision.
    realtime: !0,
    zoomLock: !1,
    // Whether disable zoom.
    textStyle: {
      color: "#6E7079"
    },
    brushSelect: !0,
    brushStyle: {
      color: "rgba(135,175,274,0.15)"
    },
    emphasis: {
      handleStyle: {
        borderColor: "#8FB0F7"
      },
      moveHandleStyle: {
        color: "#8FB0F7"
      }
    }
  }
);
let Ac = yi;
function w2(n) {
  n.registerComponentModel(Ac), n.registerComponentView(Rc), b_(n);
}
const Ad = "\0_pi_interaction_mutex";
function S2(n, t) {
  return !!b2(n)[t];
}
function b2(n) {
  return n[Ad] || (n[Ad] = {});
}
class T2 extends er {
  constructor(t) {
    super(), this._zr = t;
    const e = P(this._mousedownHandler, this), i = P(this._mousemoveHandler, this), s = P(this._mouseupHandler, this), r = P(this._mousewheelHandler, this);
    this.enable = function(o, a) {
      this.disable(), this._opt = yt(V(a) || {}, {
        zoomOnMouseWheel: !0,
        moveOnMouseMove: !0,
        // By default, wheel do not trigger move.
        moveOnMouseWheel: !1,
        preventDefaultMouseMove: !0
      }), o == null && (o = !0), (o === !0 || o === "move" || o === "pan") && (t.on("mousedown", e), t.on("mousemove", i), t.on("mouseup", s)), (o === !0 || o === "scale" || o === "zoom") && t.on("mousewheel", r);
    }, this.disable = function() {
      t.off("mousedown", e), t.off("mousemove", i), t.off("mouseup", s), t.off("mousewheel", r);
    };
  }
  isDragging() {
    return this._dragging;
  }
  setPointerChecker(t) {
    this.pointerChecker = t;
  }
  dispose() {
    this.disable();
  }
  _mousedownHandler(t) {
    if (Bu(t))
      return;
    let e = t.target;
    for (; e; ) {
      if (e.draggable)
        return;
      e = e.__hostTarget || e.parent;
    }
    const i = t.offsetX, s = t.offsetY;
    this.pointerChecker && this.pointerChecker(t, i, s) && (this._x = i, this._y = s, this._dragging = !0);
  }
  _mousemoveHandler(t) {
    if (!this._dragging || !co("moveOnMouseMove", t, this._opt) || t.gestureEvent === "pinch" || S2(this._zr, "globalPan"))
      return;
    const e = t.offsetX, i = t.offsetY, s = this._x, r = this._y, o = e - s, a = i - r;
    this._x = e, this._y = i, this._opt.preventDefaultMouseMove && ve(t.event), T_(this, "pan", "moveOnMouseMove", t, {
      dx: o,
      dy: a,
      oldX: s,
      oldY: r,
      newX: e,
      newY: i,
      isAvailableBehavior: null
    });
  }
  _mouseupHandler(t) {
    Bu(t) || (this._dragging = !1);
  }
  _mousewheelHandler(t) {
    const e = co("zoomOnMouseWheel", t, this._opt), i = co("moveOnMouseWheel", t, this._opt), s = t.wheelDelta, r = Math.abs(s), o = t.offsetX, a = t.offsetY;
    if (!(s === 0 || !e && !i)) {
      if (e) {
        const l = r > 3 ? 1.4 : r > 1 ? 1.2 : 1.1, c = s > 0 ? l : 1 / l;
        Ld(this, "zoom", "zoomOnMouseWheel", t, {
          scale: c,
          originX: o,
          originY: a,
          isAvailableBehavior: null
        });
      }
      if (i) {
        const l = Math.abs(s), c = (s > 0 ? 1 : -1) * (l > 3 ? 0.4 : l > 1 ? 0.15 : 0.05);
        Ld(this, "scrollMove", "moveOnMouseWheel", t, {
          scrollDelta: c,
          originX: o,
          originY: a,
          isAvailableBehavior: null
        });
      }
    }
  }
}
function co(n, t, e) {
  const i = e[n];
  return !n || i && (!X(i) || t.event[i + "Key"]);
}
function T_(n, t, e, i, s) {
  s.isAvailableBehavior = P(
    co,
    null,
    e,
    i
  ), n.trigger(t, s);
}
function Ld(n, t, e, i, s) {
  n.pointerChecker && n.pointerChecker(i, s.originX, s.originY) && (ve(i.event), T_(n, t, e, i, s));
}
const M_ = ft();
function M2(n, t, e) {
  M_(n).coordSysRecordMap.each(function(i) {
    const s = i.dataZoomInfoMap.get(t.uid);
    s && (s.getRange = e);
  });
}
function C2(n, t) {
  if (t) {
    n.removeKey(t.model.uid);
    const e = t.controller;
    e && e.dispose();
  }
}
function D2(n, t) {
  const e = {
    model: t,
    containsPoint: uo(E2, t),
    dispatchAction: uo(I2, n),
    dataZoomInfoMap: null,
    controller: null
  }, i = e.controller = new T2(
    n.getZr()
  );
  return D(["pan", "zoom", "scrollMove"], function(s) {
    i.on(s, function(r) {
      const o = [];
      e.dataZoomInfoMap.each(function(a) {
        if (!r.isAvailableBehavior(a.model.option))
          return;
        const l = (a.getRange || {})[s], c = l && l(
          a.dzReferCoordSysInfo,
          e.model.mainType,
          e.controller,
          r
        );
        !a.model.get("disabled", !0) && c && o.push({
          dataZoomId: a.model.id,
          start: c[0],
          end: c[1]
        });
      }), o.length && e.dispatchAction(o);
    });
  }), e;
}
function I2(n, t) {
  n.isDisposed() || n.dispatchAction({
    type: "dataZoom",
    animation: {
      easing: "cubicOut",
      duration: 100
    },
    batch: t
  });
}
function E2(n, t, e, i) {
  return n.coordinateSystem.containPoint([e, i]);
}
function R2(n) {
  let t;
  const e = "type_", i = {
    type_true: 2,
    type_move: 1,
    type_false: 0,
    type_undefined: -1
  };
  let s = !0;
  return n.each(function(r) {
    const o = r.model, a = o.get("disabled", !0) ? !1 : o.get("zoomLock", !0) ? "move" : !0;
    i[e + a] > i[e + t] && (t = a), s = s && o.get("preventDefaultMouseMove", !0);
  }), {
    controlType: t,
    opt: {
      // RoamController will enable all of these functionalities,
      // and the final behavior is determined by its event listener
      // provided by each inside zoom.
      zoomOnMouseWheel: !0,
      moveOnMouseMove: !0,
      moveOnMouseWheel: !0,
      preventDefaultMouseMove: !!s
    }
  };
}
function A2(n) {
  n.registerProcessor(
    n.PRIORITY.PROCESSOR.FILTER,
    function(t, e) {
      const i = M_(e), s = i.coordSysRecordMap || (i.coordSysRecordMap = F());
      s.each(function(r) {
        r.dataZoomInfoMap = null;
      }), t.eachComponent(
        { mainType: "dataZoom", subType: "inside" },
        function(r) {
          const o = S_(r);
          D(o.infoList, function(a) {
            const l = a.model.uid, c = s.get(l) || s.set(
              l,
              D2(e, a.model)
            );
            (c.dataZoomInfoMap || (c.dataZoomInfoMap = F())).set(r.uid, {
              dzReferCoordSysInfo: a,
              model: r,
              getRange: null
            });
          });
        }
      ), s.each(function(r) {
        const o = r.controller;
        let a;
        const l = r.dataZoomInfoMap;
        if (l) {
          const h = l.keys()[0];
          h != null && (a = l.get(h));
        }
        if (!a) {
          C2(s, r);
          return;
        }
        const c = R2(l);
        o.enable(c.controlType, c.opt), o.setPointerChecker(r.containsPoint), Tp(
          r,
          "dispatchAction",
          a.model.get("throttle", !0),
          "fixRate"
        );
      });
    }
  );
}
const Yh = class Yh extends No {
  constructor() {
    super(...arguments), this.type = "dataZoom.inside";
  }
  render(t, e, i) {
    if (super.render.apply(this, arguments), t.noTarget()) {
      this._clear();
      return;
    }
    this.range = t.getPercentRange(), M2(i, t, {
      pan: P(Il.pan, this),
      zoom: P(Il.zoom, this),
      scrollMove: P(Il.scrollMove, this)
    });
  }
  _clear() {
  }
};
Yh.type = "dataZoom.inside";
let Lc = Yh;
const Il = {
  zoom(n, t, e, i) {
    return this.range;
  },
  pan: Pd(function(n, t, e, i, s, r) {
    const o = kd[i](
      [r.oldX, r.oldY],
      [r.newX, r.newY],
      t,
      s,
      e
    );
    return o.signal * (n[1] - n[0]) * o.pixel / o.pixelLength;
  }),
  scrollMove: Pd(function(n, t, e, i, s, r) {
    return kd[i](
      [0, 0],
      [r.scrollDelta, r.scrollDelta],
      t,
      s,
      e
    ).signal * (n[1] - n[0]) * r.scrollDelta;
  })
};
function Pd(n) {
  return function(t, e, i, s) {
    const r = this.range, o = r.slice(), a = t.axisModels[0];
    if (!a)
      return;
    const l = n(
      o,
      a,
      t,
      e,
      i,
      s
    );
    if (kh(l, o, [0, 100], "all"), this.range = o, r[0] !== o[0] || r[1] !== o[1])
      return o;
  };
}
const kd = {
  grid(n, t, e, i, s) {
    const r = e.axis, o = {}, a = s.model.coordinateSystem.getRect();
    return n = n || [0, 0], r.dim === "x" ? (o.pixel = t[0] - n[0], o.pixelLength = a.width, o.pixelStart = a.x, o.signal = r.inverse ? 1 : -1) : (o.pixel = t[1] - n[1], o.pixelLength = a.height, o.pixelStart = a.y, o.signal = r.inverse ? -1 : 1), o;
  }
}, Ls = class Ls extends ki {
  constructor() {
    super(...arguments), this.type = Ls.type;
  }
};
Ls.type = "dataZoom.inside", Ls.defaultOption = nh(
  ki.defaultOption,
  {
    disabled: !1,
    zoomLock: !1,
    zoomOnMouseWheel: !0,
    moveOnMouseMove: !0,
    moveOnMouseWheel: !1,
    preventDefaultMouseMove: !0
  }
);
let Pc = Ls;
function L2(n) {
  b_(n), n.registerComponentModel(Pc), n.registerComponentView(Lc), A2(n);
}
function P2(n) {
  Zt(L2), Zt(w2);
}
class k2 {
  constructor(t) {
    this.listeners = /* @__PURE__ */ new Map(), this.initialState = t.initialState, this.initialContext = Y({}, t.initialContext), this.state = t.initialState, this.context = Y({}, t.initialContext), this.transitions = t.transitions, this.guards = t.guards || {};
  }
  getState() {
    return this.state;
  }
  getContext() {
    return Y({}, this.context);
  }
  setContext(t) {
    const e = this.state;
    this.context = Y(Y({}, this.context), t), this.emit("contextchange", e, this.state);
  }
  can(t, e) {
    var o;
    const i = e ? Y(Y({}, this.context), e) : this.context, s = this.guards[t];
    return !!((o = this.transitions[this.state]) == null ? void 0 : o[t]) && (!s || s(i));
  }
  transition(t, e) {
    var a;
    if (!this.can(t, e))
      return this.emit("blocked", this.state, this.state), !1;
    const i = this.state, s = e ? Y(Y({}, this.context), e) : this.context, r = (a = this.transitions[i]) == null ? void 0 : a[t], o = this._resolveTransition(r, s);
    return o == null ? (this.emit("blocked", i, i), !1) : (this.context = s, o !== i && (this.emit("exit", i, o), this.state = o, this.emit("enter", i, o)), this.emit("statechange", i, this.state), !0);
  }
  reset(t) {
    const e = this.state;
    this.state = this.initialState, this.context = Y(Y({}, this.initialContext), t || {}), this.emit("reset", e, this.state), this.emit("statechange", e, this.state);
  }
  on(t, e) {
    this.listeners.has(t) || this.listeners.set(t, /* @__PURE__ */ new Set()), this.listeners.get(t).add(e);
  }
  off(t, e) {
    var i;
    (i = this.listeners.get(t)) == null || i.delete(e);
  }
  destroy() {
    this.listeners.clear();
  }
  emit(t, e, i) {
    var s;
    (s = this.listeners.get(t)) == null || s.forEach((r) => {
      r(this.getContext(), e, i);
    });
  }
  _resolveTransition(t, e) {
    if (t != null)
      return typeof t == "function" ? t(e) : t;
  }
}
const O2 = {}, F2 = /* @__PURE__ */ new Set([
  "TASK_NOT_FOUND",
  "RESOURCE_NOT_FOUND",
  "SHIFT_DAILY_ID_NOT_FOUND"
]);
class N2 extends k2 {
  constructor() {
    super({
      initialState: "idle",
      initialContext: O2,
      transitions: {
        idle: {
          SELECT_TASK: "selected"
        },
        selected: {
          SELECT_TASK: (t) => t.taskId ? "selected" : "idle",
          ENTER_GRID: "previewing",
          CANCEL_SELECTION: "idle",
          ESC: "idle"
        },
        previewing: {
          MOVE_HOVER: "previewing",
          LEAVE_GRID: "selected",
          CLICK_GRID: "confirming",
          SELECT_TASK: (t) => t.taskId ? "selected" : "idle",
          CANCEL_SELECTION: "idle",
          ESC: "idle"
        },
        confirming: {
          CONFIRM: "submitting",
          CANCEL_CONFIRM: "previewing",
          CANCEL_SELECTION: "idle",
          ESC: "idle"
        },
        submitting: {
          SUBMIT_OK: "waiting_ws",
          // 请求前校验失败保留当前任务，允许直接换资源重试；
          // 网络或未知提交错误保持 error，避免不确定结果下重复派遣。
          SUBMIT_FAIL: (t) => {
            var i;
            const e = (i = t.error) == null ? void 0 : i.code;
            return e && F2.has(e) ? "selected" : "error";
          }
        },
        waiting_ws: {
          WS_UPDATE: "refreshing",
          WS_TIMEOUT: "error",
          CANCEL_SELECTION: "idle"
        },
        refreshing: {
          REFRESH_OK: "idle",
          REFRESH_FAIL: "error"
        },
        error: {
          SELECT_TASK: "selected",
          CANCEL_SELECTION: "idle",
          ESC: "idle"
        }
      },
      guards: {
        SELECT_TASK: (t) => !!t.taskId,
        ENTER_GRID: (t) => !!t.taskId,
        MOVE_HOVER: (t) => !!t.taskId,
        CLICK_GRID: (t) => !!t.taskId && t.hoverResourceIndex != null,
        CONFIRM: (t) => !!t.taskId && t.hoverResourceIndex != null,
        SUBMIT_OK: (t) => !!t.taskId,
        WS_UPDATE: (t) => !!t.taskId
      }
    });
  }
  selectTask(t) {
    var i;
    const e = (i = t == null ? void 0 : t.id) != null ? i : t == null ? void 0 : t.taskId;
    return this.getState() !== "idle" && this.reset(), this.transition("SELECT_TASK", {
      taskId: e,
      taskData: t,
      hoverResourceId: void 0,
      hoverResourceIndex: void 0,
      hoverY: void 0,
      requestId: void 0,
      error: void 0
    });
  }
  enterGrid() {
    return this.transition("ENTER_GRID");
  }
  leaveGrid() {
    return this.transition("LEAVE_GRID", {
      hoverResourceId: void 0,
      hoverResourceIndex: void 0,
      hoverY: void 0
    });
  }
  moveHover(t) {
    return this.transition("MOVE_HOVER", t);
  }
  clickGrid() {
    return this.transition("CLICK_GRID");
  }
  confirm(t) {
    return this.transition("CONFIRM", { requestId: t });
  }
  cancelConfirm() {
    return this.transition("CANCEL_CONFIRM");
  }
  submitOk(t) {
    return this.transition("SUBMIT_OK", { requestId: t, error: void 0 });
  }
  fail(t, e) {
    return this.transition(t, {
      error: e,
      hoverResourceId: void 0,
      hoverResourceIndex: void 0,
      hoverY: void 0,
      requestId: void 0
    });
  }
  wsUpdate() {
    return this.transition("WS_UPDATE");
  }
  refreshOk() {
    return this.reset(), !0;
  }
  cancel() {
    return this.reset(), !0;
  }
  esc() {
    return this.reset(), !0;
  }
}
const z2 = 5e3, B2 = {
  info: { color: "#2563EB", background: "#EFF6FF", icon: "i" },
  success: { color: "#15803D", background: "#F0FDF4", icon: "✓" },
  warning: { color: "#A16207", background: "#FFFBEB", icon: "!" },
  error: { color: "#B91C1C", background: "#FEF2F2", icon: "!" }
}, kc = [];
let Pt = null, ho = null, Oc = !1;
function $2() {
  return typeof document == "undefined" ? null : (Pt != null && Pt.isConnected || (Pt = document.createElement("div"), Pt.setAttribute("aria-live", "polite"), Pt.setAttribute("aria-relevant", "additions text"), Object.assign(Pt.style, {
    position: "fixed",
    top: "24px",
    right: "24px",
    zIndex: "2147483647",
    width: "min(360px, calc(100vw - 32px))",
    pointerEvents: "none",
    fontFamily: '"Microsoft YaHei", sans-serif'
  }), document.body.appendChild(Pt)), Pt);
}
function Od() {
  ho && (clearTimeout(ho), ho = null), Oc = !1, Pt && Pt.replaceChildren(), C_();
}
function C_() {
  if (Oc || !kc.length) return;
  const n = $2();
  if (!n) return;
  const t = kc.shift(), e = B2[t.type];
  Oc = !0;
  const i = document.createElement("section");
  i.setAttribute("role", t.type === "error" ? "alert" : "status"), Object.assign(i.style, {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    padding: "14px 14px 14px 16px",
    border: `1px solid ${e.color}`,
    borderRadius: "6px",
    background: e.background,
    color: e.color,
    boxShadow: "0 4px 14px rgba(31, 72, 130, 0.16)",
    pointerEvents: "auto",
    boxSizing: "border-box",
    marginBottom: "10px"
  });
  const s = document.createElement("span");
  s.textContent = e.icon, s.setAttribute("aria-hidden", "true"), Object.assign(s.style, {
    flex: "0 0 24px",
    width: "24px",
    height: "24px",
    border: `2px solid ${e.color}`,
    borderRadius: "50%",
    boxSizing: "border-box",
    textAlign: "center",
    lineHeight: "20px",
    fontWeight: "700",
    fontSize: "15px"
  });
  const r = document.createElement("div");
  Object.assign(r.style, { flex: "1 1 auto", minWidth: "0" });
  const o = document.createElement("div");
  o.textContent = t.title, Object.assign(o.style, { fontWeight: "700", fontSize: "14px", lineHeight: "20px" });
  const a = document.createElement("div");
  a.textContent = t.message, Object.assign(a.style, {
    marginTop: "3px",
    color: "#475569",
    fontSize: "13px",
    lineHeight: "19px",
    overflowWrap: "anywhere"
  });
  const l = document.createElement("button");
  l.type = "button", l.setAttribute("aria-label", "关闭提示"), l.title = "关闭提示", l.textContent = "×", Object.assign(l.style, {
    flex: "0 0 28px",
    width: "28px",
    height: "28px",
    padding: "0",
    border: "0",
    background: "transparent",
    color: e.color,
    fontSize: "20px",
    lineHeight: "18px",
    cursor: "pointer"
  }), l.addEventListener("click", Od, { once: !0 }), r.append(o, a), i.append(s, r, l), n.replaceChildren(i), t.duration > 0 && (ho = setTimeout(Od, t.duration));
}
function Le(n, t = {}) {
  var e;
  kc.push({
    type: t.type || "info",
    title: t.title || "提示",
    message: n,
    duration: (e = t.duration) != null ? e : z2
  }), C_();
}
const q = 999, na = class na extends Kt {
  constructor() {
    super(...arguments), this.type = na.type, this._taskRows = [], this._taskRowHeight = 44, this._taskItemHeight = 36, this._scrollOffset = 0, this._scrollMax = 0, this._scrollDragStartY = 0, this._scrollDragStartOffset = 0, this._mainScrollDragStartY = 0, this._mainScrollDragStartStart = 0, this._selectedTaskTweens = /* @__PURE__ */ new Map(), this._boundKeyDownHandler = null, this._boundMouseMoveHandler = null, this._boundClickHandler = null, this._assigning = !1, this._statusHost = null, this._taskRecords = [];
  }
  init(t, e) {
    this.api = e, this.piModel = t, this._assignmentMachine || (this._assignmentMachine = new N2(), this._assignmentMachine.on("statechange", (i, s, r) => {
      this._renderAssignmentStatus(), this.piModel && this.api && s !== r && this._renderBoard(this._getUnassignedData());
    })), !this._boundKeyDownHandler && typeof window != "undefined" && (this._boundKeyDownHandler = (i) => {
      var s;
      i.key === "Escape" && !this._assigning && ((s = this._assignmentMachine) == null || s.esc());
    }, window.addEventListener("keydown", this._boundKeyDownHandler)), this._boundMouseMoveHandler || (this._boundMouseMoveHandler = (i) => this._handleGlobalMouseMove(i), e.getZr().on("mousemove", this._boundMouseMoveHandler)), this._boundClickHandler || (this._boundClickHandler = (i) => this._handleGlobalClick(i), e.getZr().on("click", this._boundClickHandler));
  }
  dispose() {
    var t, e, i, s;
    (t = this._statusHost) == null || t.remove(), this._statusHost = null, this._boundKeyDownHandler && (window.removeEventListener("keydown", this._boundKeyDownHandler), this._boundKeyDownHandler = null), this._boundMouseMoveHandler && ((e = this.api) == null || e.getZr().off("mousemove", this._boundMouseMoveHandler), this._boundMouseMoveHandler = null), this._boundClickHandler && ((i = this.api) == null || i.getZr().off("click", this._boundClickHandler), this._boundClickHandler = null), this._clearSelectedTaskTweens(), this._clearAssignmentGhost(), (s = this._assignmentMachine) == null || s.destroy();
  }
  render(t, e, i, s) {
    var a;
    this.group.removeAll(), this.piModel = e, this.api = i;
    let r = (a = t.option) == null ? void 0 : a.splitY;
    r == null && (r = i.getHeight(), e.eachComponent("split", function(l) {
      if (l.get("orient") === "horizontal") {
        const c = l.get("ratio");
        c != null && (r = i.getHeight() * lc(c, "horizontal"));
      }
    })), this._splitY = r, t.option.splitY = r;
    const o = this._getUnassignedData();
    this._renderBoard(o);
  }
  updateLayout(t, e, i) {
    var s;
    if ((i == null ? void 0 : i.type) === "updateUnassignedBoardPosition") {
      const r = (s = i.data) == null ? void 0 : s.y;
      if (r == null) return;
      this._splitY = r, this.api = e, this._updateBoardLayout();
    }
  }
  updateTasks(t, e) {
    var u;
    if (this._renderAssignmentStatus(t.length), !this._taskContentGroup || !this._taskViewportGroup || !(e != null && e.length)) {
      this._renderBoard(t);
      return;
    }
    if (!t.length) {
      this._renderBoard(t);
      return;
    }
    const i = new Set(e.map(String));
    let s = this._taskRows.findIndex((f) => i.has(f.id));
    if (t.forEach((f, d) => {
      var p;
      i.has(String((p = f.id) != null ? p : f.taskId)) && (s = s < 0 ? d : Math.min(s, d));
    }), s < 0) return;
    for (let f = this._taskRows.length - 1; f >= s; f--) {
      const d = this._taskRows[f];
      d.group && this._taskContentGroup.remove(d.group);
    }
    this._taskRows.length = s;
    const r = this._getGrid();
    if (!r) return;
    const o = r.getRect(), a = Math.max(0, this.api.getHeight() - this._splitY), l = this._taskRowHeight, c = this._taskItemHeight, h = t.length * l;
    this._scrollMax = Math.max(0, h - a), this._scrollOffset = Math.min(this._scrollOffset, this._scrollMax), this._taskContentGroup.attr({ y: -this._scrollOffset });
    for (let f = s; f < t.length; f++) {
      const d = t[f], p = f * l + (l - c) / 2, _ = this._renderTaskItem(
        d,
        r,
        p,
        c,
        this._isTaskSelected(d)
      );
      _ && (this._bindTaskEvents(_, d), this._applySelectedTaskEffect(_, d), this._taskContentGroup.add(_)), this._taskRows.push({ id: String((u = d.id) != null ? u : d.taskId), group: _ });
    }
    this._taskRecords = t, this._scrollbarGroup && this.group.remove(this._scrollbarGroup), this._scrollbarGroup = null, this._renderVerticalDataZoom(o, a, h), this.api.getZr().refresh();
  }
  _updateBoardLayout() {
    const t = this._splitY, e = this.api.getWidth(), i = this.api.getHeight() - t;
    this.group.attr({ x: 0, y: t }), this._backgroundRect && this._backgroundRect.setShape({
      x: 0,
      y: 0,
      width: e,
      height: i
    }), this._emptyText && this._emptyText.setStyle({
      x: e / 2,
      y: i / 2
    }), this._renderGridExtension(), this._renderUnassignedTasks(this._getUnassignedData()), this._renderMainVerticalDataZoomMirror();
  }
  _getUnassignedData() {
    var s;
    let t = [];
    if (this.piModel.eachComponent("unassignedBoard", function(r) {
      t = r.get("data") || [];
    }), t.length)
      return t;
    const e = this.piModel.getOption();
    return (((s = e == null ? void 0 : e.task) == null ? void 0 : s.data) || []).filter((r) => !r.assignee);
  }
  _renderBoard(t) {
    this._renderAssignmentStatus(t.length);
    const e = this.group, i = this.api;
    this._clearSelectedTaskTweens(), e.removeAll();
    const s = 0, r = this._splitY, o = i.getWidth(), a = i.getHeight() - r;
    e.attr({ z: 0 }), e.attr({ x: s, y: r }), this._backgroundRect = new zrender.Rect({
      shape: {
        x: 0,
        y: 0,
        width: o,
        height: a
      },
      style: {
        fill: "#F7F8FA"
      },
      zlevel: q,
      z: 0,
      z2: 0,
      silent: !0
    }), e.add(this._backgroundRect), this._renderGridExtension(), this._renderUnassignedTasks(t), this._renderMainVerticalDataZoomMirror(), t.length === 0 && (this._emptyText = new zrender.Text({
      style: {
        text: "暂无未分配任务",
        x: o / 2,
        y: a / 2,
        fontSize: 14,
        fill: "#999",
        align: "center",
        verticalAlign: "middle"
      },
      zlevel: q,
      z: 0,
      z2: 1,
      silent: !0
    }), e.add(this._emptyText));
  }
  _renderUnassignedTasks(t) {
    if (this._taskViewportGroup && this.group.remove(this._taskViewportGroup), this._taskContentGroup && (this._taskContentGroup = null), this._assignmentGhostGroup && (this.group.remove(this._assignmentGhostGroup), this._assignmentGhostGroup = null), this._scrollbarGroup && this.group.remove(this._scrollbarGroup), this._taskRows = [], this._taskRecords = t.slice(), !t.length) return;
    const e = this._getGrid();
    if (!e) return;
    const i = e.getRect(), s = Math.max(0, this.api.getHeight() - this._splitY), r = this._getRowHeight(), o = Math.min(36, Math.max(24, r - 8));
    this._taskRowHeight = r, this._taskItemHeight = o;
    const a = t.length * r;
    this._scrollMax = Math.max(0, a - s), this._scrollOffset = Math.min(this._scrollOffset, this._scrollMax);
    const l = this._taskViewportGroup = new zrender.Group();
    l.attr({
      zlevel: q,
      z: 0,
      z2: 3,
      x: 0,
      y: 0
    }), l.setClipPath(
      new zrender.Rect({
        shape: {
          x: i.x,
          y: 0,
          width: i.width,
          height: s
        }
      })
    );
    const c = this._taskContentGroup = new zrender.Group();
    c.attr({
      zlevel: q,
      z: 0,
      z2: 3,
      x: 0,
      y: -this._scrollOffset
    }), t.forEach((h, u) => {
      var p;
      const f = u * r + (r - o) / 2, d = this._renderTaskItem(
        h,
        e,
        f,
        o,
        this._isTaskSelected(h)
      );
      d && (this._bindTaskEvents(d, h), this._applySelectedTaskEffect(d, h), c.add(d)), this._taskRows.push({ id: String((p = h.id) != null ? p : h.taskId), group: d || null });
    }), l.add(c), this.group.add(l), this._renderVerticalDataZoom(i, s, a);
  }
  _renderVerticalDataZoom(t, e, i) {
    if (i <= e || e <= 0) return;
    const s = 8, r = t.x + t.width + 6, o = Math.max(24, e / i * e), a = this._scrollMax > 0 ? this._scrollOffset / this._scrollMax * (e - o) : 0, l = this._scrollbarGroup = new zrender.Group();
    l.attr({ zlevel: q, z: 0, z2: 5 }), l.add(
      new zrender.Rect({
        shape: {
          x: r,
          y: 0,
          width: s,
          height: e,
          r: 4
        },
        style: {
          fill: "rgba(203, 213, 225, 0.35)"
        },
        zlevel: q,
        z: 0,
        z2: 0,
        silent: !0
      })
    ), this._scrollThumb = new zrender.Rect({
      shape: {
        x: r,
        y: a,
        width: s,
        height: o,
        r: 4
      },
      style: {
        fill: "#94A3B8"
      },
      zlevel: q,
      z: 0,
      z2: 1,
      cursor: "ns-resize",
      draggable: !0,
      ondragstart: (c) => {
        this._scrollDragStartY = c.offsetY, this._scrollDragStartOffset = this._scrollOffset, ve(c.event);
      },
      drift: (c, h, u) => {
        const f = u.offsetY - this._scrollDragStartY, d = Math.max(1, e - o), p = this._scrollDragStartOffset + f / d * this._scrollMax;
        this._setScrollOffset(p), ve(u.event);
      }
    }), l.add(this._scrollThumb), this.group.add(l);
  }
  _setScrollOffset(t) {
    if (this._scrollOffset = Math.max(0, Math.min(this._scrollMax, t)), this._taskContentGroup && this._taskContentGroup.attr({ y: -this._scrollOffset }), this._scrollThumb) {
      const e = this._scrollThumb.shape, i = Math.max(0, this.api.getHeight() - this._splitY), s = Math.max(1, i - e.height);
      this._scrollThumb.setShape({
        y: this._scrollMax > 0 ? this._scrollOffset / this._scrollMax * s : 0
      });
    }
  }
  _renderTaskItem(t, e, i, s, r = !1, o = !0) {
    var T, I, C;
    if (!e) return null;
    const a = e.getRect(), l = (T = e.getCartesians()[0]) == null ? void 0 : T.getAxis("x");
    if (!l) return null;
    const c = this._parseTime((I = t.scheduleStartTime) != null ? I : t.startTime), h = this._parseTime((C = t.scheduleEndTime) != null ? C : t.endTime);
    if (c == null || h == null || h <= c)
      return null;
    const u = a.x + l.dataToCoord(c), f = a.x + l.dataToCoord(h), d = Math.max(a.x, Math.min(u, f)), _ = Math.min(a.x + a.width, Math.max(u, f)) - d;
    if (_ <= 0) return null;
    const g = new zrender.Group();
    g.attr({ zlevel: q, z: 0, z2: 3 });
    const m = {
      x: d + 0.5,
      y: i + 0.5,
      width: Math.max(0, _ - 1),
      height: Math.max(0, s - 1),
      r: 3
    };
    g.add(
      new zrender.Rect({
        shape: m,
        style: {
          fill: r ? "#E8F4FF" : "#EAF4FB",
          stroke: r ? "#1D7FEA" : "#2F83B8",
          lineWidth: r ? 2 : 1.25
        },
        zlevel: q,
        z: 0,
        z2: 0
      })
    );
    const y = _ >= 140 && s >= 30, v = i + s * 0.3, S = i + s * (y ? 0.73 : 0.5), w = Math.min(48, Math.max(36, _ * 0.2)), x = w, M = d + w, b = Math.max(0, _ - w - x);
    if (g.add(
      new zrender.Text({
        style: {
          text: y ? this._formatTimeLabel(c) : "",
          x: d + w / 2,
          y: v,
          fontSize: 10,
          fill: "#64748B",
          align: "center",
          verticalAlign: "middle"
        },
        zlevel: q,
        z: 0,
        z2: 1,
        silent: !0
      })
    ), g.add(
      new zrender.Text({
        style: {
          text: y ? this._formatTimeLabel(h) : "",
          x: d + _ - x / 2,
          y: v,
          fontSize: 10,
          fill: "#64748B",
          align: "center",
          verticalAlign: "middle"
        },
        zlevel: q,
        z: 0,
        z2: 1,
        silent: !0
      })
    ), g.add(
      new zrender.Text({
        style: {
          text: y ? this._truncateText(t.flightStatusText || "", b - 8, 10) : "",
          x: M + b / 2,
          y: v,
          fontSize: 10,
          fill: "#111827",
          align: "center",
          verticalAlign: "middle"
        },
        zlevel: q,
        z: 0,
        z2: 1,
        silent: !0
      })
    ), g.add(
      new zrender.Text({
        style: {
          text: this._truncateText(t.taskName || t.name || `Task ${t.id}`, _ - 12, 12),
          x: d + _ / 2,
          y: S,
          fontSize: 12,
          fill: "#111827",
          align: "center",
          verticalAlign: "middle"
        },
        zlevel: q,
        z: 0,
        z2: 1,
        silent: !0
      })
    ), o) {
      const E = new zrender.Rect({
        shape: m,
        style: {
          fill: "rgba(0,0,0,0)"
        },
        cursor: "pointer",
        zlevel: q,
        z: 0,
        z2: 20,
        ondblclick: (A) => {
          var L;
          this._assigning || (L = this._assignmentMachine) == null || L.selectTask(t), ve(A.event);
        }
      });
      E.__testId = `unassigned-task-${t.id}`, g.add(E);
    }
    return g;
  }
  _bindTaskEvents(t, e) {
    t.cursor = "pointer";
  }
  _handleGlobalMouseMove(t) {
    var a, l;
    const e = (a = this._assignmentMachine) == null ? void 0 : a.getState();
    if (!(e === "selected" || e === "previewing")) {
      this._clearAssignmentGhost();
      return;
    }
    const s = (l = this._assignmentMachine) == null ? void 0 : l.getContext(), r = s == null ? void 0 : s.taskData;
    if (!r || this._assigning) {
      this._clearAssignmentGhost();
      return;
    }
    const o = this._hitMainResourceRow(t.offsetX, t.offsetY);
    if (!o) {
      this._assignmentMachine.getState() === "previewing" && this._assignmentMachine.leaveGrid(), this._clearAssignmentGhost();
      return;
    }
    this._assignmentMachine.getState() === "selected" && this._assignmentMachine.enterGrid(), this._assignmentMachine.moveHover({
      hoverResourceId: o.resourceId,
      hoverResourceIndex: o.resourceIndex,
      hoverY: o.rowY
    }), this._renderAssignmentGhost(r, o);
  }
  _handleGlobalClick(t) {
    return or(this, null, function* () {
      var a, l, c;
      const e = (a = this._assignmentMachine) == null ? void 0 : a.getState(), i = e === "selected" || e === "previewing", s = (l = this._assignmentMachine) == null ? void 0 : l.getContext(), r = s == null ? void 0 : s.taskData;
      if (this._assigning) return;
      if (!i) {
        this._clearAssignmentGhost();
        return;
      }
      if (!r) {
        this._hitMainResourceRow(t.offsetX, t.offsetY) && Le(
          "尚未选中待派遣任务，因此没有发送请求。请先双击下方未分配任务，再点击目标资源行。",
          { title: "未选择派遣任务", duration: 5e3 }
        );
        return;
      }
      const o = this._hitMainResourceRow(t.offsetX, t.offsetY);
      if (!o) {
        String(((c = t == null ? void 0 : t.target) == null ? void 0 : c.__testId) || "").startsWith("unassigned-task-") || Le(
          "没有命中主甘特区的资源行，因此未发送派遣请求。请点击上方目标资源所在行。",
          { title: "未选择目标资源", duration: 5e3 }
        );
        return;
      }
      if (this._assignmentMachine.getState() === "selected" && this._assignmentMachine.enterGrid(), this._assignmentMachine.moveHover({
        hoverResourceId: o.resourceId,
        hoverResourceIndex: o.resourceIndex,
        hoverY: o.rowY
      }), !this._assignmentMachine.clickGrid()) {
        Le(
          "当前派遣状态不允许提交，请重新双击未分配任务后再选择目标资源。",
          { title: "派遣未提交", duration: 5e3 }
        );
        return;
      }
      yield this._assignSelectedTask(r, o);
    });
  }
  _assignSelectedTask(t, e) {
    return or(this, null, function* () {
      var r;
      const i = this._getAssignTaskHandler(), s = (r = t.id) != null ? r : t.taskId;
      if (!i) {
        Le("派遣处理器未配置，因此无法发送请求。", {
          title: "派遣未提交",
          duration: 5e3
        });
        return;
      }
      if (s == null) {
        Le("当前任务缺少任务 ID，因此无法发送请求。请刷新任务列表后重试。", {
          title: "派遣未提交",
          duration: 5e3
        });
        return;
      }
      this._assigning = !0, this._assignmentMachine.confirm();
      try {
        const o = yield i({
          resourceId: e.resourceId,
          taskId: s
        });
        o != null && o.success ? (console.info("派遣成功"), Le("任务已成功派遣，等待服务端同步最新任务状态。", {
          type: "success",
          title: "派遣成功",
          duration: 4e3
        }), this._clearAssignmentGhost(), this._clearSelectedTaskTweens(), this._assignmentMachine.submitOk(), this._assignmentMachine.wsUpdate(), this._assignmentMachine.refreshOk()) : (console.info("派遣失败"), Le("服务端未接受此次派遣，请稍后重试。", { title: "派遣失败", type: "error" }), this._assignmentMachine.fail("SUBMIT_FAIL", "assign failed"));
      } catch (o) {
        const a = o == null ? void 0 : o.code, c = {
          TASK_NOT_FOUND: {
            title: "任务数据未匹配",
            message: "当前任务不在最新的未分配任务结果中，因此未发送请求。请刷新甘特数据后重试。"
          },
          RESOURCE_NOT_FOUND: {
            title: "资源数据未匹配",
            message: "目标资源不在当前查询结果中，因此未发送请求。请重新选择资源或刷新数据。"
          },
          SHIFT_DAILY_ID_NOT_FOUND: {
            title: "目标资源没有可用班次",
            message: "目标资源在该任务时段内没有匹配的班次，因此未发送请求。请选择在该时段有班次的资源。"
          }
        }[a];
        c ? Le(c.message, { title: c.title, type: "warning", duration: 6e3 }) : Le((o == null ? void 0 : o.message) || "派遣请求处理失败，请稍后重试。", {
          title: "派遣失败",
          type: "error",
          duration: 6e3
        }), this._assignmentMachine.fail("SUBMIT_FAIL", o);
      } finally {
        this._assigning = !1, this._renderAssignmentStatus();
      }
    });
  }
  _hitMainResourceRow(t, e) {
    var c;
    const i = this._getGrid(), s = this._getBoardResources();
    if (!i || !s.length) return null;
    const r = i.getRect();
    if (t < r.x || t > r.x + r.width || e < r.y || e > this._splitY)
      return null;
    const o = (c = i.getCartesians()[0]) == null ? void 0 : c.getAxis("y");
    if (!o) return null;
    const a = this.piModel.getComponent("unassignedBoard"), l = (a == null ? void 0 : a.get("resourceRowOffset")) || 0;
    for (let h = 0; h < s.length; h++) {
      const u = h + l, f = o.toGlobalCoord(o.dataToCoord(u)), d = o.toGlobalCoord(o.dataToCoord(u + 1)), p = Math.min(f, d), _ = Math.abs(d - f), g = p + _;
      if (e >= p && e <= g && g > r.y && p < this._splitY)
        return {
          resourceId: s[h][1],
          resourceIndex: h,
          rowY: p,
          rowHeight: _
        };
    }
    return null;
  }
  _renderAssignmentGhost(t, e) {
    this._clearAssignmentGhost();
    const i = this._getGrid();
    if (!i) return;
    const s = Math.min(36, Math.max(24, e.rowHeight - 8)), r = e.rowY - this._splitY + (e.rowHeight - s) / 2, o = this._renderTaskItem(t, i, r, s, !0, !1);
    if (!o) return;
    o.silent = !0, o.attr({ zlevel: q, z: 0, z2: 20 }), this._setGroupOpacity(o, 0.48);
    const a = i.getRect(), l = Math.max(a.y, e.rowY), c = Math.min(this._splitY, e.rowY + e.rowHeight);
    o.add(new zrender.Rect({
      shape: { x: a.x, y: l - this._splitY, width: a.width, height: Math.max(0, c - l) },
      style: { fill: "rgba(47,158,235,0.10)", stroke: "#2F9EEB", lineWidth: 1 },
      silent: !0,
      zlevel: q,
      z2: -1
    })), this._assignmentGhostGroup = o, this.group.add(o);
  }
  _clearAssignmentGhost() {
    this._assignmentGhostGroup && (this.group.remove(this._assignmentGhostGroup), this._assignmentGhostGroup = null);
  }
  _applySelectedTaskEffect(t, e) {
  }
  _renderAssignmentStatus(t = this._getUnassignedData().length) {
    var a, l, c, h, u, f;
    if (typeof document == "undefined" || !this.api) return;
    if (!this._statusHost) {
      const d = this.api.getZr(), p = d.dom || ((l = (a = d.painter) == null ? void 0 : a.getViewportRoot) == null ? void 0 : l.call(a)), _ = (p == null ? void 0 : p.parentElement) || document.body;
      _ !== document.body && window.getComputedStyle(_).position === "static" && (_.style.position = "relative"), this._statusHost = document.createElement("div"), this._statusHost.setAttribute("role", "status"), this._statusHost.setAttribute("aria-live", "polite"), Object.assign(this._statusHost.style, {
        position: "absolute",
        top: "72px",
        left: "16px",
        right: "16px",
        height: "32px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        zIndex: "20",
        font: '13px "Microsoft YaHei", sans-serif',
        color: "#64748B",
        pointerEvents: "none"
      }), _.appendChild(this._statusHost);
    }
    const e = ((c = this._assignmentMachine) == null ? void 0 : c.getState()) || "idle", i = (h = this._assignmentMachine) == null ? void 0 : h.getContext(), s = ((u = i == null ? void 0 : i.taskData) == null ? void 0 : u.name) || ((f = i == null ? void 0 : i.taskData) == null ? void 0 : f.taskName) || String((i == null ? void 0 : i.taskId) || ""), r = e === "submitting" || e === "waiting_ws" || e === "refreshing", o = document.createElement("span");
    if (o.textContent = r ? `正在派遣 · ${s}` : e === "error" ? "派遣未完成" : e === "idle" ? "" : `已选择 · ${s} · 点击资源行派遣 · Esc 取消`, Object.assign(o.style, { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }), this._statusHost.style.color = e === "idle" ? "#64748B" : "#2563EB", this._statusHost.dataset.status !== o.textContent + e) {
      if (this._statusHost.dataset.status = o.textContent + e, this._statusHost.replaceChildren(), e === "idle") {
        const d = document.createElement("strong");
        d.textContent = "未分配任务", d.style.color = "#334155";
        const p = document.createElement("span");
        p.textContent = String(t), Object.assign(p.style, { display: "inline-flex", minWidth: "28px", height: "24px", padding: "0 7px", boxSizing: "border-box", alignItems: "center", justifyContent: "center", border: "1px solid #D6DEE8", borderRadius: "4px", background: "#FFFFFF", color: "#475569", fontSize: "12px", fontWeight: "600" });
        const _ = document.createElement("span");
        _.textContent = "双击任务，再点击目标资源行派遣", Object.assign(_.style, { marginLeft: "4px", color: "#64748B" }), this._statusHost.append(d, p, _);
      } else
        this._statusHost.appendChild(o);
      if (e !== "idle" && !r) {
        const d = document.createElement("button");
        d.type = "button", d.textContent = "取消派遣", Object.assign(d.style, { flexShrink: "0", border: "1px solid #CBD5E1", borderRadius: "4px", background: "#FFF", color: "#475569", height: "28px", padding: "0 8px", cursor: "pointer", pointerEvents: "auto" }), d.onclick = () => {
          this._assigning || this._assignmentMachine.cancel();
        }, this._statusHost.appendChild(d);
      }
    }
  }
  _clearSelectedTaskTweens() {
    var e, i;
    const t = (i = (e = this.api) == null ? void 0 : e.getTweenManager) == null ? void 0 : i.call(e);
    if (!t) {
      this._selectedTaskTweens.clear();
      return;
    }
    this._selectedTaskTweens.forEach((s) => {
      t.stop(s);
    }), this._selectedTaskTweens.clear();
  }
  _renderGridExtension() {
    var c, h;
    this._gridExtensionGroup && this.group.remove(this._gridExtensionGroup);
    const t = this._getGrid();
    if (!t) return;
    const e = t.getRect(), i = (c = t.getCartesians()[0]) == null ? void 0 : c.getAxis("x"), s = (h = t.getCartesians()[0]) == null ? void 0 : h.getAxis("y");
    if (!i || !s) return;
    const r = Math.max(0, this.api.getHeight() - this._splitY), o = i.getTicksCoords(), a = Math.abs(
      s.toGlobalCoord(s.dataToCoord(1)) - s.toGlobalCoord(s.dataToCoord(0))
    );
    if (!a) return;
    const l = this._gridExtensionGroup = new zrender.Group();
    l.attr({ zlevel: q, z: 0, z2: 1 });
    for (let u = 0, f = 0; u < r; u += a, f++) {
      const d = f % 2 === 0 ? "#FFFFFF" : "#F7F8FA", p = Math.min(a, r - u);
      l.add(
        new zrender.Rect({
          shape: {
            x: e.x,
            y: u,
            width: e.width,
            height: p
          },
          style: {
            fill: d
          },
          zlevel: q,
          z: 0,
          z2: 0,
          silent: !0
        })
      ), u > 0 && l.add(
        new zrender.Line({
          shape: {
            x1: e.x,
            y1: u,
            x2: e.x + e.width,
            y2: u
          },
          style: {
            stroke: "#EDF1F5",
            lineWidth: 1
          },
          zlevel: q,
          z: 0,
          z2: 1,
          silent: !0
        })
      );
    }
    o.forEach((u) => {
      const f = e.x + u.coord;
      if (f < e.x || f > e.x + e.width) return;
      const d = new Date(u.tickValue), p = Number.isFinite(d.getTime()) && d.getMinutes() === 0;
      l.add(
        new zrender.Line({
          shape: {
            x1: f,
            y1: 0,
            x2: f,
            y2: r
          },
          style: {
            stroke: p ? "#C4CFDB" : "#E3E9EF",
            lineWidth: p ? 1.5 : 1
          },
          zlevel: q,
          z: 0,
          z2: 1,
          silent: !0
        })
      );
    }), this.group.add(l);
  }
  _renderMainVerticalDataZoomMirror() {
    var _;
    this._mainScrollbarGroup && this.group.remove(this._mainScrollbarGroup);
    const t = this._getVerticalDataZoomModel(), e = this._getGrid();
    if (!t || !e) return;
    const i = e.getRect(), s = Math.max(0, this._splitY - i.y);
    if (s <= 0) return;
    const r = ((_ = t.getPercentRange) == null ? void 0 : _.call(t)) || [0, 100], o = Math.max(1, Math.min(100, r[1] - r[0])), a = Math.max(1, 100 - o), l = Math.max(24, o / 100 * s), c = Math.max(1, s - l), h = Math.max(0, r[0]) / a * c, u = 8, f = i.x + i.width + 6, d = -this._splitY, p = this._mainScrollbarGroup = new zrender.Group();
    p.attr({ zlevel: q, z: 0, z2: 6 }), p.add(
      new zrender.Rect({
        shape: {
          x: f,
          y: i.y + d,
          width: u,
          height: s,
          r: 4
        },
        style: {
          fill: "rgba(203, 213, 225, 0.35)"
        },
        zlevel: q,
        z: 0,
        z2: 0,
        silent: !0
      })
    ), this._mainScrollThumb = new zrender.Rect({
      shape: {
        x: f,
        y: i.y + d + h,
        width: u,
        height: l,
        r: 4
      },
      style: {
        fill: "#94A3B8"
      },
      zlevel: q,
      z: 0,
      z2: 1,
      cursor: "ns-resize",
      draggable: !0,
      ondragstart: (g) => {
        this._mainScrollDragStartY = g.offsetY, this._mainScrollDragStartStart = r[0], ve(g.event);
      },
      drift: (g, m, y) => {
        var b, T;
        const v = ((T = (b = this._getVerticalDataZoomModel()) == null ? void 0 : b.getPercentRange) == null ? void 0 : T.call(b)) || r, S = Math.max(1, Math.min(100, v[1] - v[0])), w = Math.max(1, 100 - S), x = y.offsetY - this._mainScrollDragStartY, M = this._mainScrollDragStartStart + x / c * w;
        this._dispatchVerticalDataZoom(M, M + S), ve(y.event);
      }
    }), p.add(this._mainScrollThumb), this.group.add(p);
  }
  _getGrid() {
    let t;
    return this.piModel.eachComponent("grid", function(e) {
      !t && e.coordinateSystem && (t = e.coordinateSystem);
    }), t;
  }
  _getVerticalDataZoomModel() {
    let t;
    return this.piModel.eachComponent("dataZoom", function(e) {
      !t && e.subType === "slider" && e.getOrient() === "vertical" && (t = e);
    }), t;
  }
  _getBoardResources() {
    let t = [];
    return this.piModel.eachComponent("unassignedBoard", function(e) {
      t = e.get("resources") || [];
    }), t;
  }
  _getAssignTaskHandler() {
    let t;
    return this.piModel.eachComponent("unassignedBoard", function(e) {
      t = e.get("onAssignTask");
    }), t;
  }
  _isTaskSelected(t) {
    var i;
    const e = (i = this._assignmentMachine) == null ? void 0 : i.getContext();
    return (e == null ? void 0 : e.taskId) != null && e.taskId === t.id;
  }
  _dispatchVerticalDataZoom(t, e) {
    const i = this._getVerticalDataZoomModel();
    if (!i) return;
    const s = Math.max(1, Math.min(100, e - t)), r = Math.max(0, Math.min(100 - s, t)), o = Math.min(100, r + s);
    this.api.dispatchAction({
      type: "dataZoom",
      from: i.uid,
      dataZoomId: i.id,
      start: r,
      end: o
    });
  }
  _getRowHeight() {
    var s;
    const t = this._getGrid(), e = (s = t == null ? void 0 : t.getCartesians()[0]) == null ? void 0 : s.getAxis("y");
    return e && Math.abs(
      e.toGlobalCoord(e.dataToCoord(1)) - e.toGlobalCoord(e.dataToCoord(0))
    ) || 44;
  }
  _parseTime(t) {
    if (t == null) return null;
    const e = typeof t == "number" ? t : new Date(t).getTime();
    return Number.isNaN(e) ? null : e;
  }
  _formatTimeLabel(t) {
    const e = new Date(t);
    return Number.isNaN(e.getTime()) ? "" : `${this._pad2(e.getHours())}:${this._pad2(e.getMinutes())}`;
  }
  _pad2(t) {
    return t < 10 ? `0${t}` : `${t}`;
  }
  _formatDate(t) {
    const e = t == null ? /* @__PURE__ */ new Date() : new Date(t);
    return Number.isNaN(e.getTime()) ? this._formatDate(void 0) : `${e.getFullYear()}-${this._pad2(e.getMonth() + 1)}-${this._pad2(e.getDate())}`;
  }
  _setGroupOpacity(t, e) {
    t.traverse((i) => {
      i.setStyle && i.setStyle({
        opacity: e
      });
    });
  }
  _truncateText(t, e, i = 11) {
    const s = String(t || ""), r = Math.max(0, Math.floor(e / i));
    return r ? s.length > r ? `${s.slice(0, r - 1)}…` : s : "";
  }
};
na.type = "unassignedBoard";
let Fc = na;
const Ps = class Ps extends U {
  constructor() {
    super(...arguments), this.type = Ps.type;
  }
};
Ps.type = "unassignedBoard", Ps.defaultOption = {
  show: !0,
  backgroundColor: "rgba(0,0,0,0)",
  borderColor: "#e0e0e0",
  borderWidth: 1,
  itemGap: 8,
  padding: [16, 16, 16, 16]
};
let Nc = Ps;
function H2(n) {
  n.registerComponentModel(Nc), n.registerComponentView(Fc);
}
function G2(n) {
  n.registerAction({
    type: "updateResourceFilter",
    update: "update"
  }, function(t, e, i) {
    const s = t.assignedData || [], r = t.unassignedData || [], o = t.resourceData || [], a = t.resources || [];
    e.eachSeries(function(l) {
      var c, h, u;
      l.id === "assignedTasks" && ((c = l.updateData) == null || c.call(l, s, e)), l.id === "resourceRows" && ((h = l.updateData) == null || h.call(l, o, e)), l.id === "resourceSchedule" && ((u = l.updateData) == null || u.call(l, o, e));
    }), e.eachComponent("unassignedBoard", function(l) {
      l.id === "unassignedBoard" && (l.option.data = r, l.option.resources = a);
    });
  }), n.registerAction({
    type: "updateTaskData",
    update: "update"
  }, function(t, e, i) {
    const s = t.assignedData || [], r = t.unassignedData || [];
    e.eachSeries(function(o) {
      var a;
      o.id === "assignedTasks" && ((a = o.updateData) == null || a.call(o, s, e));
    }), e.eachSeries(function(o) {
      var a;
      o.id !== "resourceRows" && o.id !== "resourceSchedule" || (a = o.updateData) == null || a.call(o, t.resourceData || [], e);
    }), e.eachComponent("unassignedBoard", function(o) {
      o.id === "unassignedBoard" && (o.option.data = r);
    });
  }), n.registerAction({
    type: "updateUnassignedBoardPosition"
  }, function(t, e, i) {
    var o;
    const s = (o = t.data) == null ? void 0 : o.y;
    if (s == null) return;
    let r = 0;
    e.eachComponent("split", function(a) {
      if (a.get("orient") === "vertical") {
        const l = a.get("ratio");
        l != null && (r = i.getWidth() * l);
      }
    }), e.eachComponent("dataZoom", function(a) {
      var u, f, d, p, _;
      if (a.subType !== "slider" || a.get("show") === !1)
        return;
      const l = a.getOrient(), c = i.getViewOfComponentModel(a), h = Math.max(i.getHeight() - s + Vx, 0);
      if (l === "horizontal") {
        const g = a.get("height") || 0;
        a.option.bottom = h, a.option.top = void 0, a.option.height = g, c != null && c.updateLayout ? c.updateLayout(a, i, { type: "updateUnassignedBoardPosition", data: { y: s } }) : (u = c == null ? void 0 : c.render) == null || u.call(
          c,
          a,
          e,
          i,
          { type: "updateUnassignedBoardPosition", data: { y: s } }
        );
      } else if (l === "vertical") {
        const g = Y2(e, i, s), m = (p = (d = (f = a.findRepresentativeAxisProxy) == null ? void 0 : f.call(a)) == null ? void 0 : d.getDataValueWindow) == null ? void 0 : p.call(d), y = a.getPercentRange(), v = W2(m, y, g);
        a.option.bottom = h, a.option.height = void 0, a.setRawRange({
          startValue: v[0],
          endValue: v[1]
        }), (_ = c == null ? void 0 : c.render) == null || _.call(
          c,
          a,
          e,
          i,
          { type: "updateUnassignedBoardPosition", data: { y: s } }
        );
      }
    }), e.eachComponent("unassignedBoard", function(a) {
      var l, c;
      a.option.splitY = s, a.option.verticalSplitX = r, (c = (l = i.getViewOfComponentModel(a)) == null ? void 0 : l.updateLayout) == null || c.call(l, a, i, { type: "updateUnassignedBoardPosition", data: { y: s } });
    });
  });
}
function Y2(n, t, e) {
  let i = 0, s;
  return n.eachComponent("grid", function(r) {
    !s && r.coordinateSystem && (s = r.coordinateSystem);
  }), n.eachComponent("yAxis", function(r) {
    var f, d, p, _;
    if (i) return;
    const o = (f = r.option.resourceCount) != null ? f : r.get("resourceCount");
    if (typeof o != "number") return;
    const a = (_ = (p = (d = s == null ? void 0 : s.getCartesians) == null ? void 0 : d.call(s)[0]) == null ? void 0 : p.getAxis) == null ? void 0 : _.call(p, "y"), c = Math.abs(
      a ? a.toGlobalCoord(a.dataToCoord(1)) - a.toGlobalCoord(a.dataToCoord(0)) : 0
    ) || r.option.targetRowHeight || r.get("targetRowHeight") || 44, h = Math.max(0, t.getHeight() - e), u = Math.max(1, Math.ceil(h / c) + 1);
    i = o + u, r.option.max = i;
  }), i;
}
function W2(n, t, e) {
  var o;
  if (!n || n.length < 2 || !e)
    return [0, e || 1];
  const i = Math.max(1, n[1] - n[0]);
  if (Math.abs(((o = t == null ? void 0 : t[1]) != null ? o : 0) - 100) < 0.5)
    return [Math.max(0, e - i), e];
  const r = Math.max(0, Math.min(n[0], e - i));
  return [r, Math.min(e, r + i)];
}
function U2(n) {
  H2(n), G2(n);
}
const Pe = {
  filter: "资源过滤",
  active: "当前已有过滤条件",
  inactive: "当前没有过滤条件",
  name: "姓名",
  all: "全部资源",
  reset: "重置",
  apply: "应用"
}, V2 = "M435.6 590.6L206.6 247v-76.3h610.8V247l-229 343.6v229L435.6 896V590.6z", Z = (n, t, e) => {
  const i = document.createElement(n);
  return t && (i.className = t), e && (i.textContent = e), i;
}, q2 = (n) => {
  const t = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  t.setAttribute("viewBox", "0 0 1024 1024"), t.setAttribute("width", "16"), t.setAttribute("height", "16"), t.setAttribute("aria-hidden", "true");
  const e = document.createElementNS("http://www.w3.org/2000/svg", "path");
  return e.setAttribute("d", V2), e.setAttribute("fill", n ? "#1296db" : "#8a8a8a"), t.appendChild(e), t;
}, X2 = () => {
  if (document.getElementById("resource-filter-style")) return;
  const n = document.createElement("style");
  n.id = "resource-filter-style", n.textContent = `
    .resource-filter-host {
      position: absolute;
      left: 128px;
      top: 18px;
      width: 156px;
      height: 36px;
      z-index: 20;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      background: transparent;
      box-sizing: border-box;
      pointer-events: auto;
    }
    .resource-filter {
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: Arial, sans-serif;
    }
    .resource-filter__button {
      width: 108px;
      height: 36px;
      border-radius: 6px;
      border: 1px solid #CBD5E1;
      background: #FFFFFF;
      color: #334155;
      font-size: 14px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }
    .resource-filter__button:hover {
      border-color: #94A3B8;
      background: #F8FAFC;
    }
    .resource-filter__status {
      min-width: 26px;
      height: 36px;
      padding: 0 6px;
      border: 1px solid #CBD5E1;
      border-radius: 2px;
      background: #FFFFFF;
      color: #64748B;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      line-height: 1;
      box-sizing: border-box;
    }
    .resource-filter__backdrop {
      position: fixed;
      inset: 0;
      z-index: 1000;
      background: rgba(15, 23, 42, 0.24);
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      padding: 72px 16px 16px;
      box-sizing: border-box;
    }
    .resource-filter__modal {
      width: min(320px, calc(100vw - 32px));
      max-height: calc(100vh - 88px);
      overflow-y: auto;
      border: 1px solid #CBD5E1;
      border-radius: 6px;
      background: #FFFFFF;
      box-shadow: 0 14px 36px rgba(15, 23, 42, 0.18);
      color: #111827;
      font-family: Arial, sans-serif;
    }
    .resource-filter__modal-header {
      height: 42px;
      padding: 0 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #E5E7EB;
      font-size: 14px;
      font-weight: 600;
    }
    .resource-filter__close {
      width: 26px;
      height: 26px;
      border: 0;
      background: transparent;
      color: #64748B;
      font-size: 20px;
      cursor: pointer;
    }
    .resource-filter__body { padding: 14px; }
    .resource-filter__field {
      display: grid;
      gap: 6px;
      font-size: 12px;
      color: #475569;
    }
    .resource-filter__combobox {
      position: relative;
      display: flex;
      align-items: center;
    }
    .resource-filter__combobox-input {
      width: 100%;
      height: 32px;
      border: 1px solid #CBD5E1;
      border-radius: 4px;
      padding: 0 30px 0 8px;
      box-sizing: border-box;
      background: #FFFFFF;
      color: #111827;
      font-size: 13px;
      outline: none;
    }
    .resource-filter__combobox-input:focus {
      border-color: #2563EB;
      box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.12);
    }
    .resource-filter__combobox-clear {
      position: absolute;
      right: 4px;
      width: 24px;
      height: 24px;
      border: 0;
      background: transparent;
      color: #94A3B8;
      cursor: pointer;
      font-size: 16px;
      line-height: 1;
    }
    .resource-filter__combobox-clear:hover {
      color: #334155;
    }
    .resource-filter__combobox-menu {
      position: absolute;
      left: 0;
      right: 0;
      top: 36px;
      z-index: 2;
      max-height: 220px;
      overflow-y: auto;
      border: 1px solid #CBD5E1;
      border-radius: 4px;
      background: #FFFFFF;
      box-shadow: 0 8px 20px rgba(15, 23, 42, 0.12);
    }
    .resource-filter__combobox-option {
      min-height: 32px;
      padding: 7px 8px;
      box-sizing: border-box;
      color: #111827;
      font-size: 13px;
      line-height: 18px;
      cursor: pointer;
    }
    .resource-filter__combobox-option:hover,
    .resource-filter__combobox-option--selected {
      background: #EFF6FF;
      color: #1D4ED8;
    }
    .resource-filter__combobox-empty {
      padding: 10px 8px;
      color: #94A3B8;
      font-size: 13px;
    }
    .resource-filter__actions {
      display: flex;
      justify-content: flex-end;
      gap: 6px;
      padding: 12px 14px 14px;
      border-top: 1px solid #E5E7EB;
    }
    .resource-filter__action {
      min-width: 68px;
      height: 30px;
      border: 1px solid #CBD5E1;
      border-radius: 4px;
      background: #FFFFFF;
      cursor: pointer;
      font-size: 13px;
    }
    .resource-filter__action--primary {
      border-color: #2563EB;
      background: #2563EB;
      color: #FFFFFF;
    }
  `, document.head.appendChild(n);
}, ia = class ia extends Kt {
  constructor() {
    super(...arguments), this.type = ia.type, this._host = null;
  }
  render(t, e, i) {
    if (this.group.removeAll(), this._ensureHost(i), !this._host) return;
    if (!t.get("show")) {
      this._host.style.display = "none";
      return;
    }
    this._host.style.display = "flex";
    const s = t.get("resources") || [], r = t.get("allValue") || "__ALL__";
    this._currentResourceId = this._readCurrentValue(t, r), this._renderControl(t, s, r);
  }
  dispose() {
    var t;
    (t = this._host) == null || t.remove(), this._host = null;
  }
  _ensureHost(t) {
    var r, o, a, l, c;
    if (this._host) return;
    X2();
    const e = t.getZr(), i = e.dom || ((o = (r = e.painter) == null ? void 0 : r.getViewportRoot) == null ? void 0 : o.call(r)) || ((c = (l = (a = e.painter) == null ? void 0 : a.getViewportRootOffset) == null ? void 0 : l.call(a)) == null ? void 0 : c.dom), s = (i == null ? void 0 : i.parentElement) || document.body;
    s !== document.body && window.getComputedStyle(s).position === "static" && (s.style.position = "relative"), this._host = Z("div", "resource-filter-host"), s.appendChild(this._host);
  }
  _readCurrentValue(t, e) {
    const i = t.get("value");
    if (i != null) return i;
    const s = t.get("storageKey");
    if (!s) return e;
    try {
      return JSON.parse(window.localStorage.getItem(s) || "{}").resourceId || e;
    } catch (r) {
      return e;
    }
  }
  _writeStoredValue(t, e) {
    const i = t.get("storageKey");
    i && window.localStorage.setItem(i, JSON.stringify({ resourceId: e }));
  }
  _getVisibleResources(t, e, i) {
    return !i || i === e ? t : t.filter((s) => String(s[1]) === String(i));
  }
  _renderControl(t, e, i) {
    if (!this._host) return;
    const s = Z("div", "resource-filter"), r = Z("button", "resource-filter__button"), o = Z("span", "", Pe.filter), a = Z("span", "resource-filter__status"), l = !!this._currentResourceId && this._currentResourceId !== i, c = this._getVisibleResources(e, i, this._currentResourceId);
    r.type = "button", r.append(q2(l), o), r.onclick = () => this._openModal(t, e, i), a.textContent = String(c.length), a.title = l ? Pe.active : Pe.inactive, s.append(r, a), this._host.replaceChildren(s);
  }
  _openModal(t, e, i) {
    const s = Z("div", "resource-filter__backdrop"), r = Z("div", "resource-filter__modal"), o = Z("div", "resource-filter__modal-header"), a = Z("span", "", Pe.filter), l = Z("button", "resource-filter__close", "×"), c = Z("div", "resource-filter__body"), h = Z("label", "resource-filter__field"), u = Z("span", "", Pe.name), f = Z("div", "resource-filter__combobox"), d = Z("input", "resource-filter__combobox-input"), p = Z("button", "resource-filter__combobox-clear", "×"), _ = Z("div", "resource-filter__combobox-menu"), g = Z("div", "resource-filter__actions"), m = Z("button", "resource-filter__action", Pe.reset), y = Z("button", "resource-filter__action resource-filter__action--primary", Pe.apply);
    l.type = "button", m.type = "button", y.type = "button", d.type = "text", d.placeholder = "搜索资源名称或编号", d.setAttribute("aria-label", "搜索资源名称或编号"), d.setAttribute("role", "combobox"), d.setAttribute("aria-expanded", "false"), p.type = "button", p.title = "清除选择", p.setAttribute("aria-label", "清除选择"), _.setAttribute("role", "listbox"), _.hidden = !0;
    let v = "";
    const S = () => this._currentResourceId ? String(this._currentResourceId) : i, w = (C) => {
      if (C === i) return Pe.all;
      const E = e.find((A) => String(A[1]) === String(C));
      return E ? E[0] || String(E[1]) : "";
    }, x = () => {
      const C = v.trim().toLocaleLowerCase(), E = e.filter(([L, W]) => C ? `${L || ""} ${W}`.toLocaleLowerCase().includes(C) : !0);
      _.replaceChildren();
      const A = [
        [Pe.all, i],
        ...E
      ];
      A.forEach(([L, W]) => {
        const G = Z(
          "div",
          `resource-filter__combobox-option${String(W) === S() ? " resource-filter__combobox-option--selected" : ""}`,
          L || String(W)
        );
        G.setAttribute("role", "option"), G.setAttribute("aria-selected", String(W) === S() ? "true" : "false"), G.onmousedown = (rt) => {
          rt.preventDefault(), this._currentResourceId = W, v = "", T(), b(), x();
        }, _.appendChild(G);
      }), A.length || _.appendChild(Z("div", "resource-filter__combobox-empty", "暂无匹配资源"));
    }, M = () => {
      _.hidden = !1, d.setAttribute("aria-expanded", "true"), x();
    }, b = () => {
      _.hidden = !0, d.setAttribute("aria-expanded", "false");
    }, T = () => {
      d.value = v || w(S());
    };
    T(), x();
    const I = (C) => {
      var A;
      this._currentResourceId = C, this._writeStoredValue(t, C);
      const E = this._getVisibleResources(e, i, C);
      this._renderControl(t, e, i), (A = t.get("onChange")) == null || A({
        filter: { resourceId: C },
        visibleResources: E
      }), s.remove();
    };
    l.onclick = () => s.remove(), m.onclick = () => I(i), y.onclick = () => I(S()), d.onfocus = () => {
      v || (d.value = ""), M();
    }, d.onclick = M, d.onblur = () => {
      window.setTimeout(() => {
        f.contains(document.activeElement) || (v = "", T(), b());
      }, 0);
    }, d.oninput = () => {
      v = d.value, _.hidden = !1, d.setAttribute("aria-expanded", "true"), x();
    }, d.onkeydown = (C) => {
      C.key === "Escape" && b();
    }, p.onclick = () => {
      this._currentResourceId = i, v = "", T(), M(), d.focus();
    }, s.onclick = (C) => {
      C.target === s && s.remove();
    }, o.append(a, l), f.append(d, p, _), h.append(u, f), c.appendChild(h), g.append(m, y), r.append(o, c, g), s.appendChild(r), document.body.appendChild(s);
  }
};
ia.type = "resourceFilter";
let zc = ia;
const ks = class ks extends U {
  constructor() {
    super(...arguments), this.type = ks.type;
  }
};
ks.type = "resourceFilter", ks.defaultOption = {
  show: !0,
  resources: [],
  allValue: "__ALL__",
  storageKey: "gantt.resourceFilter"
};
let Bc = ks;
function Z2(n) {
  n.registerComponentModel(Bc), n.registerComponentView(zc);
}
function K2(n) {
  Z2(n);
}
const j2 = () => {
  if (document.getElementById("gantt-query-style")) return;
  const n = document.createElement("style");
  n.id = "gantt-query-style", n.textContent = `
    .gantt-workspace { container-type: inline-size; }
    .gantt-query-host { position:absolute; z-index:20; inset:0 0 auto; height:112px; max-width:none; font:13px "Microsoft YaHei",sans-serif; pointer-events:none; }
    .gantt-query-host::before { content:''; position:absolute; inset:0 0 auto; height:112px; box-sizing:border-box; background:linear-gradient(to bottom,#FFFFFF 0 64px,#F8FAFC 64px 100%); border-bottom:1px solid #D8E0E8; box-shadow:0 2px 5px rgba(31,41,55,.04); }
    .gantt-query-host::after { content:''; position:absolute; left:0; right:0; top:64px; height:1px; background:#E7ECF2; }
    .gantt-query__title { position:absolute; top:25px; left:16px; color:#1F2937; font-size:16px; font-weight:700; line-height:24px; white-space:nowrap; }
    .gantt-query { position:absolute; top:18px; right:16px; display:flex; justify-content:flex-end; gap:6px; width:420px; max-width:calc(100% - 32px); height:36px; margin:0; pointer-events:auto; }
    .gantt-query__range { position:absolute; top:27px; left:50%; max-width:calc(100% - 880px); transform:translateX(-50%); color:#334155; font-size:14px; font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; pointer-events:none; }
    .gantt-query input,.gantt-query select,.gantt-query button { box-sizing:border-box; height:36px; border:1px solid #CBD5E1; border-radius:6px; font:inherit; color:#334155; background:#FFF; }
    .gantt-query input { flex:1; width:0; min-width:0; padding:0 10px; }
    .gantt-query select { width:82px; padding:0 4px; }
    .gantt-query button { padding:0 10px; cursor:pointer; flex-shrink:0; }
    .gantt-query button[type=submit] { color:#FFF; background:#2F9EEB; border-color:#2F9EEB; }
    .gantt-query button:hover { filter:brightness(.96); }
    .gantt-query :focus-visible { outline:2px solid #2F9EEB; outline-offset:2px; }
    .gantt-query__status { position:absolute; top:72px; right:16px; max-width:calc(100% - 32px); font-size:12px; color:#64748B; text-align:right; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; pointer-events:none; }
    @container (max-width:600px) {
      .gantt-query-host { inset:0 0 auto; width:auto!important; max-width:none; }
      .gantt-query__title { top:20px; }
      .gantt-query { top:16px; right:12px; gap:4px; width:calc(100% - 184px); }
      .gantt-query select { width:68px; }
      .gantt-query button { padding:0 6px; }
      .gantt-query__range { top:84px; left:16px; max-width:calc(100% - 32px); transform:none; }
      .gantt-query__status { top:84px; right:12px; }
    }
  `, document.head.appendChild(n);
}, sa = class sa extends Kt {
  constructor() {
    super(...arguments), this.type = sa.type, this._host = null;
  }
  render(t, e, i) {
    var _;
    this._model = t, this._ensureHost(i);
    const s = this._host;
    if (!s) return;
    s.style.display = t.get("show") ? "block" : "none", s.style.width = "auto", s.style.top = "0px", s.style.right = `${(_ = t.get("right")) != null ? _ : 16}px`;
    const r = this._formatRange(t.get("windowRange"));
    if (s.firstChild) {
      const g = s.querySelector(".gantt-query__range");
      g && (g.textContent = r);
      return;
    }
    const o = document.createElement("div");
    o.className = "gantt-query__range", o.textContent = r, o.setAttribute("aria-label", `当前甘特时间范围：${r}`);
    const a = document.createElement("div");
    a.className = "gantt-query__title", a.textContent = "资源调度";
    const l = document.createElement("form");
    l.className = "gantt-query", l.setAttribute("role", "search");
    const c = document.createElement("select");
    c.setAttribute("aria-label", "搜索条件"), (t.get("conditions") || ["任务名", "资源名"]).forEach((g) => {
      const m = document.createElement("option");
      m.value = m.textContent = g, c.appendChild(m);
    });
    const h = document.createElement("input");
    h.type = "search", h.placeholder = t.get("placeholder") || "输入关键词", h.setAttribute("aria-label", "搜索关键词"), h.value = t.get("value") || "";
    const u = document.createElement("button");
    u.type = "submit", u.textContent = "搜索";
    const f = document.createElement("button");
    f.type = "button", f.textContent = "清空";
    const d = document.createElement("output");
    d.className = "gantt-query__status", d.setAttribute("aria-live", "polite");
    const p = () => {
      const g = h.value.trim(), m = this._model.get("onSearch");
      if (!m) {
        d.textContent = "搜索暂不可用";
        return;
      }
      const y = m({ keyword: g, condition: c.value });
      d.textContent = g ? `已筛选 · ${y ? y.count : 0} 个任务 · 清空可恢复` : "已显示全部任务";
    };
    l.onsubmit = (g) => {
      g.preventDefault(), p();
    }, f.onclick = () => {
      h.value = "", this._model.option.value = "", p(), h.focus();
    }, h.oninput = () => {
      this._model.option.value = h.value, h.value || p();
    }, c.onchange = () => {
      h.value.trim() && p();
    }, l.append(c, h, u, f), s.append(a, o, l, d);
  }
  dispose() {
    var t;
    (t = this._host) == null || t.remove(), this._host = null;
  }
  _formatRange(t) {
    const e = (r) => {
      if (r == null) return "";
      const o = new Date(r);
      if (Number.isNaN(o.getTime())) return "";
      const a = (l) => l < 10 ? `0${l}` : String(l);
      return `${o.getFullYear()}/${a(o.getMonth() + 1)}/${a(o.getDate())} ${a(o.getHours())}:${a(o.getMinutes())}`;
    }, i = e(t == null ? void 0 : t.startTime), s = e(t == null ? void 0 : t.endTime);
    return i && s ? `${i} - ${s}` : "甘特时间范围";
  }
  _ensureHost(t) {
    var r, o;
    if (this._host) return;
    j2();
    const e = t.getZr(), i = e.dom || ((o = (r = e.painter) == null ? void 0 : r.getViewportRoot) == null ? void 0 : o.call(r)), s = (i == null ? void 0 : i.parentElement) || document.body;
    s !== document.body && window.getComputedStyle(s).position === "static" && (s.style.position = "relative"), s.classList.add("gantt-workspace"), this._host = document.createElement("div"), this._host.className = "gantt-query-host", s.appendChild(this._host);
  }
};
sa.type = "ganttQuery";
let $c = sa;
const Os = class Os extends U {
  constructor() {
    super(...arguments), this.type = Os.type;
  }
};
Os.type = "ganttQuery", Os.defaultOption = {
  show: !0,
  placeholder: "输入关键词",
  value: "",
  width: 420,
  top: 24,
  right: 16,
  conditions: ["任务名", "资源名"]
};
let Hc = Os;
function Q2(n) {
  n.registerComponentModel(Hc), n.registerComponentView($c);
}
function J2(n) {
  Q2(n);
}
const Wn = 210, rn = 150, tT = 75, Ur = (n, t) => {
  const e = document.createElement(n);
  return t && (e.className = t), e;
}, El = (n) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${Wn}" height="${rn}" viewBox="0 0 ${Wn} ${rn}">
      ${n === "magnify" ? `
        <defs>
          <radialGradient id="m" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stop-color="rgb(128,128,128)" />
            <stop offset="52%" stop-color="rgb(160,112,128)" />
            <stop offset="100%" stop-color="rgb(128,128,128)" />
          </radialGradient>
        </defs>
        <rect width="210" height="150" fill="rgb(128,128,128)" />
        <ellipse cx="105" cy="75" rx="86" ry="58" fill="url(#m)" />
      ` : n === "edge" ? `
        <defs>
          <radialGradient id="d" cx="50%" cy="50%" r="64%">
            <stop offset="0%" stop-color="rgb(128,128,128)" />
            <stop offset="56%" stop-color="rgb(128,128,128)" />
            <stop offset="82%" stop-color="rgb(230,36,128)" />
            <stop offset="100%" stop-color="rgb(38,220,128)" />
          </radialGradient>
        </defs>
        <rect width="210" height="150" fill="rgb(128,128,128)" />
        <ellipse cx="105" cy="75" rx="104" ry="74" fill="url(#d)" />
      ` : `
        <defs>
          <radialGradient id="s" cx="28%" cy="12%" r="92%">
            <stop offset="0%" stop-color="rgba(255,255,255,0.95)" />
            <stop offset="30%" stop-color="rgba(255,255,255,0.45)" />
            <stop offset="72%" stop-color="rgba(255,255,255,0.08)" />
            <stop offset="100%" stop-color="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>
        <rect width="210" height="150" fill="rgba(0,0,0,0)" />
        <ellipse cx="105" cy="75" rx="101" ry="72" fill="url(#s)" />
      `}
    </svg>
  `)}`, eT = () => {
  if (document.getElementById("liquid-glass-layer-style")) return;
  const n = document.createElement("style");
  n.id = "liquid-glass-layer-style", n.textContent = `
    .liquid-glass-layer-host {
      position: absolute;
      inset: 0;
      pointer-events: none;
      overflow: visible;
    }
    .liquid-glass-widget {
      position: absolute;
      pointer-events: auto;
      box-sizing: border-box;
      width: ${Wn}px;
      height: ${rn}px;
      border-radius: ${tT}px;
      cursor: grab;
      user-select: none;
      touch-action: none;
      transform: scaleY(0.8);
      transform-origin: center;
      transition: transform 160ms ease;
    }
    .liquid-glass-widget:active {
      cursor: grabbing;
      transform: scaleY(0.8) scale(1.035);
    }
    .liquid-glass-widget__lens {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      border: 1px solid rgba(0, 0, 0, 0.1);
      backdrop-filter: url(#magnifying-glass-filter);
      -webkit-backdrop-filter: url(#magnifying-glass-filter);
      box-shadow:
        rgba(0, 0, 0, 0.16) 0 4px 9px,
        rgba(0, 0, 0, 0.2) 0 2px 24px inset,
        rgba(255, 255, 255, 0.2) 0 -2px 24px inset;
    }
    .liquid-glass-widget__content {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(51, 65, 85, 0.72);
      font: 600 13px Arial, sans-serif;
      pointer-events: none;
    }
  `, document.head.appendChild(n);
}, nT = () => {
  const n = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  return n.setAttribute("color-interpolation-filters", "sRGB"), n.style.display = "none", n.innerHTML = `
    <defs>
      <filter id="magnifying-glass-filter">
        <feImage href="${El("magnify")}" x="0" y="0" width="${Wn}" height="${rn}" result="magnifying_displacement_map" />
        <feDisplacementMap in="SourceGraphic" in2="magnifying_displacement_map" xChannelSelector="R" yChannelSelector="G" result="magnified_source" scale="24" />
        <feGaussianBlur in="magnified_source" stdDeviation="0" result="blurred_source" />
        <feImage href="${El("edge")}" x="0" y="0" width="${Wn}" height="${rn}" result="displacement_map" />
        <feDisplacementMap in="blurred_source" in2="displacement_map" xChannelSelector="R" yChannelSelector="G" result="displaced" scale="98" />
        <feColorMatrix in="displaced" type="saturate" result="displaced_saturated" values="9" />
        <feImage href="${El("specular")}" x="0" y="0" width="${Wn}" height="${rn}" result="specular_layer" />
        <feComposite in="displaced_saturated" in2="specular_layer" operator="in" result="specular_saturated" />
        <feComponentTransfer in="specular_layer" result="specular_faded">
          <feFuncA type="linear" slope="0.5" />
        </feComponentTransfer>
        <feBlend in="specular_saturated" in2="displaced" mode="normal" result="withSaturation" />
        <feBlend in="specular_faded" in2="withSaturation" mode="normal" />
      </filter>
    </defs>
  `, n;
}, ra = class ra extends Kt {
  constructor() {
    super(...arguments), this.type = ra.type, this._host = null, this._widget = null, this._filterSvg = null, this._dragStartX = 0, this._dragStartY = 0, this._startLeft = 0, this._startTop = 0;
  }
  render(t, e, i) {
    var o, a;
    if (this._ensureHost(i, t), !this._host || !this._widget) return;
    this._host.style.display = t.get("show") ? "block" : "none", this._host.style.zIndex = String(t.get("zIndex") || 40), this._widget.style.width = `${t.get("width") || Wn}px`, this._widget.style.height = `${t.get("height") || rn}px`, this._widget.style.borderRadius = `${(t.get("height") || rn) / 2}px`, this._widget.style.left = `${(o = t.get("left")) != null ? o : 24}px`, this._widget.style.top = `${(a = t.get("top")) != null ? a : 24}px`;
    const s = Ur("div", "liquid-glass-widget__lens"), r = Ur("div", "liquid-glass-widget__content");
    r.textContent = t.get("title") || "", this._widget.replaceChildren(this._filterSvg, s, r);
  }
  dispose() {
    var t;
    (t = this._host) == null || t.remove(), this._host = null, this._widget = null, this._filterSvg = null;
  }
  _ensureHost(t, e) {
    var o, a;
    if (this._host && this._widget) return;
    eT();
    const i = t.getZr(), s = i.dom || ((a = (o = i.painter) == null ? void 0 : o.getViewportRoot) == null ? void 0 : a.call(o)), r = (s == null ? void 0 : s.parentElement) || document.body;
    r !== document.body && window.getComputedStyle(r).position === "static" && (r.style.position = "relative"), this._host = Ur("div", "liquid-glass-layer-host"), this._widget = Ur("div", "liquid-glass-widget"), this._filterSvg = nT(), this._bindDrag(e), this._host.appendChild(this._widget), r.appendChild(this._host);
  }
  _bindDrag(t) {
    this._widget && (this._widget.onpointerdown = (e) => {
      this._widget && (this._dragStartX = e.clientX, this._dragStartY = e.clientY, this._startLeft = parseFloat(this._widget.style.left || `${t.get("left") || 24}`), this._startTop = parseFloat(this._widget.style.top || `${t.get("top") || 24}`), this._widget.setPointerCapture(e.pointerId));
    }, this._widget.onpointermove = (e) => {
      if (!this._widget || !this._widget.hasPointerCapture(e.pointerId)) return;
      const i = this._startLeft + e.clientX - this._dragStartX, s = this._startTop + e.clientY - this._dragStartY;
      this._widget.style.left = `${Math.max(0, i)}px`, this._widget.style.top = `${Math.max(0, s)}px`;
    }, this._widget.onpointerup = (e) => {
      var i;
      (i = this._widget) == null || i.releasePointerCapture(e.pointerId);
    }, this._widget.onpointercancel = (e) => {
      var i;
      (i = this._widget) == null || i.releasePointerCapture(e.pointerId);
    });
  }
};
ra.type = "liquidGlassLayer";
let Gc = ra;
const Fs = class Fs extends U {
  constructor() {
    super(...arguments), this.type = Fs.type;
  }
};
Fs.type = "liquidGlassLayer", Fs.defaultOption = {
  show: !1,
  width: 210,
  height: 150,
  left: 24,
  top: 24,
  zIndex: 40,
  title: ""
};
let Yc = Fs;
function iT(n) {
  n.registerComponentModel(Yc), n.registerComponentView(Gc);
}
function sT(n) {
  iT(n);
}
const rT = [
  "getZr",
  "getWidth",
  "getHeight",
  "getOption",
  "getComponentViewMap",
  "refreshSeries",
  "getTweenManager",
  "isDisposed",
  "dispatchAction"
];
class oT {
  constructor(t) {
    D(
      rT,
      function(e) {
        this[e] = P(
          t[e],
          t
        );
      },
      this
    );
  }
}
class D_ {
  constructor(t, e, i, s) {
    this._stageTaskMap = F(), this.piInstance = t, this.api = e, i = this._dataProcessorHandlers = i.slice(), s = this._visualHandlers = s.slice(), this._allHandlers = i.concat(s);
  }
  restorePipelines(t) {
    const e = this, i = e._pipelineMap = F();
    t.eachSeries(function(s) {
      const r = s.getProgressive(), o = s.uid;
      i.set(o, {
        id: o,
        head: null,
        tail: null,
        threshold: s.getProgressiveThreshold(),
        progressiveEnabled: r,
        blockIndex: -1,
        step: Math.round(r || 700),
        count: 0
      }), e._pipe(s, s.dataTask);
    });
  }
  restoreData(t, e) {
    t.restoreData(e), this._stageTaskMap.each(function(i) {
      const s = i.overallTask;
      s && s.dirty();
    });
  }
  performSeriesTasks(t) {
    let e;
    t.eachSeries(function(i) {
      e = i.dataTask.perform() || e;
    }), this.unfinished = e || this.unfinished;
  }
  performDataProcessorTasks(t, e) {
    this._performStageTasks(this._dataProcessorHandlers, t, e, {
      block: !0
    });
  }
  _performStageTasks(t, e, i, s) {
    s = s || {};
    let r = !1;
    const o = this;
    D(t, function(l, c) {
      if (s.visualType && s.visualType !== l.visualType)
        return;
      const h = o._stageTaskMap.get(l.uid), u = h.seriesTaskMap, f = h.overallTask;
      if (f) {
        let d;
        const p = f.agentStubMap;
        p.each(function(g) {
          a(s, g) && (g.dirty(), d = !0);
        }), d && f.dirty(), o.updatePayload(f, i);
        const _ = o.getPerformArgs(f, s.block);
        p.each(function(g) {
          g.perform(_);
        }), f.perform(_) && (r = !0);
      } else u && u.each(function(d, p) {
        a(s, d) && d.dirty();
        const _ = o.getPerformArgs(
          d,
          s.block
        );
        _.skip = !l.performRawSeries && e.isSeriesFiltered(d.context.model), o.updatePayload(d, i), d.perform(_) && (r = !0);
      });
    });
    function a(l, c) {
      return l.setDirty && (!l.dirtyMap || l.dirtyMap.get(c.__pipeline.id));
    }
    this.unfinished = r || this.unfinished;
  }
  prepareStageTasks() {
    const t = this._stageTaskMap, e = this.api.getModel(), i = this.api;
    D(
      this._allHandlers,
      function(s) {
        const r = t.get(s.uid) || t.set(s.uid, {});
        s.reset && this._createSeriesStageTask(s, r, e, i), s.overallReset && this._createOverallStageTask(s, r, e, i);
      },
      this
    );
  }
  prepareView(t, e, i, s) {
    const r = t.renderTask, o = r.context;
    o.model = e, o.piModel = i, o.api = s, r.__block = !t.incrementalPrepareRender, this._pipe(e, r);
  }
  performVisualTasks(t, e, i) {
    this._performStageTasks(this._visualHandlers, t, e, i);
  }
  _pipe(t, e) {
    const i = t.uid, s = this._pipelineMap.get(i);
    !s.head && (s.head = e), s.tail && s.tail.pipe(e), s.tail = e, e.__idxInPipeline = s.count++, e.__pipeline = s;
  }
  plan() {
    this._pipelineMap.each((t) => {
      let e = t.tail;
      do {
        if (e.__block) {
          t.blockIndex = e.__idxInPipeline;
          break;
        }
        e = e.getUpstream();
      } while (e);
    });
  }
  //性能处理权衡数据量大小
  getPerformArgs(t, e) {
    if (!t.__pipeline)
      return;
    const i = this._pipelineMap.get(t.__pipeline.id), s = i.context, o = !e && i.progressiveEnabled && (!s || s.progressiveRender) && t.__idxInPipeline > i.blockIndex ? i.step : null, a = s == null ? void 0 : s.modDataCount, l = a != null ? Math.ceil(a / o) : null;
    return { step: o, modBy: l, modDataCount: a };
  }
  getPipeline(t) {
    return this._pipelineMap.get(t);
  }
  updatePayload(t, e) {
    e !== "remain" && (t.context.payload = e);
  }
  //流式启用渐进式渲染（通过seriesModel的uid获取渲染管线）
  updateStreamModes(t, e) {
    const i = this._pipelineMap.get(t.uid), r = t.getData().count(), o = i.progressiveEnabled && e.incrementalPrepareRender && r >= i.threshold, a = t.get("large") && r >= t.get("largeThreshold"), l = t.get("progressiveChunkMode") === "mod" ? r : null;
    t.pipelineContext = i.context = {
      progressiveRender: o,
      modDataCount: l,
      large: a
    };
  }
  _createSeriesStageTask(t, e, i, s) {
    const r = this, o = e.seriesTaskMap, a = e.seriesTaskMap = F(), l = t.seriesType, c = t.getTargetSeries;
    t.createOnAllSeries ? i.eachRawSeries(h) : l ? i.eachRawSeriesByType(l, h) : c && c(i, s).each(h);
    function h(u) {
      const f = u.uid, d = a.set(
        f,
        o && o.get(f) || ms({
          plan: hT,
          reset: uT,
          count: mT
        })
      );
      d.context = {
        model: u,
        piModel: i,
        api: s,
        // PENDING: `useClearVisual` not used?
        useClearVisual: t.isVisual && !t.isLayout,
        plan: t.plan,
        reset: t.reset,
        scheduler: r
      }, r._pipe(u, d);
    }
  }
  _createOverallStageTask(t, e, i, s) {
    const r = this, o = e.overallTask = e.overallTask || // For overall task, the function only be called on reset stage.
    ms({ reset: dT });
    o.context = {
      piModel: i,
      api: s,
      overallReset: t.overallReset,
      scheduler: r
    };
    const a = o.agentStubMap, l = o.agentStubMap = F(), c = t.seriesType, h = t.getTargetSeries;
    let u = !0, f = !1;
    c ? i.eachRawSeriesByType(c, d) : h ? h(i, s).each(d) : (u = !1, D(i.getSeries(), d));
    function d(p) {
      const _ = p.uid, g = l.set(
        _,
        a && a.get(_) || // When the result of `getTargetSeries` changed, the overallTask
        // should be set as dirty and re-performed.
        (f = !0, ms({
          reset: pT,
          onDirty: _T
        }))
      );
      g.context = {
        model: p,
        overallProgress: u
        // FIXME:TS never used, so comment it
        // modifyOutputEnd: modifyOutputEnd
      }, g.agent = o, g.__block = u, r._pipe(p, g);
    }
    f && o.dirty();
  }
  static wrapStageHandler(t, e) {
    return Q(t) && (t = {
      overallReset: t,
      seriesType: aT(t)
    }), t.uid = fa("stageHandler"), e && (t.visualType = e), t;
  }
}
function aT(n) {
  Fd = null;
  try {
    n(lT, cT);
  } catch (t) {
  }
  return Fd;
}
const lT = {}, cT = {};
let Fd;
function hT(n) {
  return n.plan ? n.plan(n.model, n.piModel, n.api, n.payload) : null;
}
function uT(n) {
  n.useClearVisual && n.data.clearAllVisual();
  const t = n.resetDefines = Vt(
    n.reset(n.model, n.piModel, n.api, n.payload)
  );
  return t.length > 1 ? H(t, function(e, i) {
    return I_(i);
  }) : fT;
}
const fT = I_(0);
function I_(n) {
  return function(t, e) {
    const i = e.data, s = e.resetDefines[n];
    if (s && s.dataEach)
      for (let r = t.start; r < t.end; r++)
        s.dataEach(i, r);
    else s && s.progress && s.progress(t, i);
  };
}
function dT(n) {
  n.overallReset(n.piModel, n.api, n.payload);
}
function pT(n) {
  return n.overallProgress && gT;
}
function gT() {
  this.agent.dirty(), this.getDownstream().dirty();
}
function _T() {
  this.agent && this.agent.dirty();
}
function mT(n) {
  return n.data.count();
}
const yT = [
  "symbol",
  "symbolSize",
  "symbolRotate",
  "symbolOffset"
], Nd = yT.concat(["symbolKeepAspect"]), vT = {
  createOnAllSeries: !0,
  // For legend.
  performRawSeries: !0,
  reset: function(n, t) {
    if (!n.hasSymbolVisual || t.isSeriesFiltered(n))
      return;
    const e = n.getData();
    function i(s, r) {
      const o = s.getItemModel(r);
      for (let a = 0; a < Nd.length; a++) {
        const l = Nd[a], c = o.getShallow(l, !0);
        c != null && s.setItemVisual(r, l, c);
      }
    }
    return { dataEach: e.hasItemOption ? i : null };
  }
};
function Bn(n) {
  return isFinite(n);
}
function xT(n, t, e) {
  var i = t.x == null ? 0 : t.x, s = t.x2 == null ? 1 : t.x2, r = t.y == null ? 0 : t.y, o = t.y2 == null ? 0 : t.y2;
  t.global || (i = i * e.width + e.x, s = s * e.width + e.x, r = r * e.height + e.y, o = o * e.height + e.y), i = Bn(i) ? i : 0, s = Bn(s) ? s : 1, r = Bn(r) ? r : 0, o = Bn(o) ? o : 0;
  var a = n.createLinearGradient(i, r, s, o);
  return a;
}
function wT(n, t, e) {
  var i = e.width, s = e.height, r = Math.min(i, s), o = t.x == null ? 0.5 : t.x, a = t.y == null ? 0.5 : t.y, l = t.r == null ? 0.5 : t.r;
  t.global || (o = o * i + e.x, a = a * s + e.y, l = l * r), o = Bn(o) ? o : 0.5, a = Bn(a) ? a : 0.5, l = l >= 0 && Bn(l) ? l : 0.5;
  var c = n.createRadialGradient(o, a, 0, o, a, l);
  return c;
}
function Wc(n, t, e) {
  for (var i = t.type === "radial" ? wT(n, t, e) : xT(n, t, e), s = t.colorStops, r = 0; r < s.length; r++)
    i.addColorStop(s[r].offset, s[r].color);
  return i;
}
function ST(n, t) {
  if (n === t || !n && !t)
    return !1;
  if (!n || !t || n.length !== t.length)
    return !0;
  for (var e = 0; e < n.length; e++)
    if (n[e] !== t[e])
      return !0;
  return !1;
}
function Vr(n) {
  return parseInt(n, 10);
}
function qr(n, t, e) {
  var i = ["width", "height"][t], s = ["clientWidth", "clientHeight"][t], r = ["paddingLeft", "paddingTop"][t], o = ["paddingRight", "paddingBottom"][t];
  if (e[i] != null && e[i] !== "auto")
    return parseFloat(e[i]);
  var a = document.defaultView.getComputedStyle(n);
  return (n[s] || Vr(a[i]) || Vr(n.style[i])) - (Vr(a[r]) || 0) - (Vr(a[o]) || 0) | 0;
}
var zd = new yh(50);
function E_(n, t, e, i, s) {
  if (n)
    if (typeof n == "string") {
      if (t && t.__zrImageSrc === n || !e)
        return t;
      var r = zd.get(n), o = { hostEl: e, cb: i, cbPayload: s };
      return r ? (t = r.image, !Oh(t) && r.pending.push(o)) : (t = nr.loadImage(n, Bd, Bd), t.__zrImageSrc = n, zd.put(n, t.__cachedImgObj = {
        image: t,
        pending: [o]
      })), t;
    } else
      return n;
  else return t;
}
function Bd() {
  var n = this.__cachedImgObj;
  this.onload = this.onerror = this.__cachedImgObj = null;
  for (var t = 0; t < n.pending.length; t++) {
    var e = n.pending[t], i = e.cb;
    i && i(this, e.cbPayload), e.hostEl.dirty();
  }
  n.pending.length = 0;
}
function Oh(n) {
  return n && n.width && n.height;
}
var bT = De({
  strokeFirst: !0,
  font: $s,
  x: 0,
  y: 0,
  textAlign: "left",
  textBaseline: "top",
  miterLimit: 2
}, Pg), R_ = (function(n) {
  Xn(t, n);
  function t() {
    return n !== null && n.apply(this, arguments) || this;
  }
  return t.prototype.hasStroke = function() {
    var e = this.style, i = e.stroke;
    return i != null && i !== "none" && e.lineWidth > 0;
  }, t.prototype.hasFill = function() {
    var e = this.style, i = e.fill;
    return i != null && i !== "none";
  }, t.prototype.createStyle = function(e) {
    return _a(bT, e);
  }, t.prototype.setBoundingRect = function(e) {
    this._rect = e;
  }, t.prototype.getBoundingRect = function() {
    var e = this.style;
    if (!this._rect) {
      var i = e.text;
      i != null ? i += "" : i = "";
      var s = Yv(i, e.font, e.textAlign, e.textBaseline);
      if (s.x += e.x || 0, s.y += e.y || 0, this.hasStroke()) {
        var r = e.lineWidth;
        s.x -= r / 2, s.y -= r / 2, s.width += r, s.height += r;
      }
      this._rect = s;
    }
    return this._rect;
  }, t.initDefaultProps = (function() {
    var e = t.prototype;
    e.dirtyRectTolerance = 10;
  })(), t;
})(wh);
R_.prototype.type = "tspan";
function TT(n, t) {
  return !n || n === "solid" || !(t > 0) ? null : n === "dashed" ? [4 * t, 2 * t] : n === "dotted" ? [t] : re(n) ? [n] : Ei(n) ? n : null;
}
function A_(n) {
  var t = n.style, e = t.lineDash && t.lineWidth > 0 && TT(t.lineDash, t.lineWidth), i = t.lineDashOffset;
  if (e) {
    var s = t.strokeNoScale && n.getLineScale ? n.getLineScale() : 1;
    s && s !== 1 && (e = oe(e, function(r) {
      return r / s;
    }), i /= s);
  }
  return [e, i];
}
var MT = new Li(!0);
function zo(n) {
  var t = n.stroke;
  return !(t == null || t === "none" || !(n.lineWidth > 0));
}
function $d(n) {
  return typeof n == "string" && n !== "none";
}
function Bo(n) {
  var t = n.fill;
  return t != null && t !== "none";
}
function Hd(n, t) {
  if (t.fillOpacity != null && t.fillOpacity !== 1) {
    var e = n.globalAlpha;
    n.globalAlpha = t.fillOpacity * t.opacity, n.fill(), n.globalAlpha = e;
  } else
    n.fill();
}
function Gd(n, t) {
  if (t.strokeOpacity != null && t.strokeOpacity !== 1) {
    var e = n.globalAlpha;
    n.globalAlpha = t.strokeOpacity * t.opacity, n.stroke(), n.globalAlpha = e;
  } else
    n.stroke();
}
function Uc(n, t, e) {
  var i = E_(t.image, t.__image, e);
  if (Oh(i)) {
    var s = n.createPattern(i, t.repeat || "repeat");
    if (typeof DOMMatrix == "function" && s && s.setTransform) {
      var r = new DOMMatrix();
      r.translateSelf(t.x || 0, t.y || 0), r.rotateSelf(0, 0, (t.rotation || 0) * Om), r.scaleSelf(t.scaleX || 1, t.scaleY || 1), s.setTransform(r);
    }
    return s;
  }
}
function CT(n, t, e, i) {
  var s, r = zo(e), o = Bo(e), a = e.strokePercent, l = a < 1, c = !t.path;
  (!t.silent || l) && c && t.createPathProxy();
  var h = t.path || MT, u = t.__dirty;
  if (!i) {
    var f = e.fill, d = e.stroke, p = o && !!f.colorStops, _ = r && !!d.colorStops, g = o && !!f.image, m = r && !!d.image, y = void 0, v = void 0, S = void 0, w = void 0, x = void 0;
    (p || _) && (x = t.getBoundingRect()), p && (y = u ? Wc(n, f, x) : t.__canvasFillGradient, t.__canvasFillGradient = y), _ && (v = u ? Wc(n, d, x) : t.__canvasStrokeGradient, t.__canvasStrokeGradient = v), g && (S = u || !t.__canvasFillPattern ? Uc(n, f, t) : t.__canvasFillPattern, t.__canvasFillPattern = S), m && (w = u || !t.__canvasStrokePattern ? Uc(n, d, t) : t.__canvasStrokePattern, t.__canvasStrokePattern = S), p ? n.fillStyle = y : g && (S ? n.fillStyle = S : o = !1), _ ? n.strokeStyle = v : m && (w ? n.strokeStyle = w : r = !1);
  }
  var M = t.getGlobalScale();
  h.setScale(M[0], M[1], t.segmentIgnoreThreshold);
  var b, T;
  n.setLineDash && e.lineDash && (s = A_(t), b = s[0], T = s[1]);
  var I = !0;
  (c || u & fi) && (h.setDPR(n.dpr), l ? h.setContext(null) : (h.setContext(n), I = !1), h.reset(), t.buildPath(h, t.shape, i), h.toStatic(), t.pathUpdated()), I && h.rebuildPath(n, l ? a : 1), b && (n.setLineDash(b), n.lineDashOffset = T), i || (e.strokeFirst ? (r && Gd(n, e), o && Hd(n, e)) : (o && Hd(n, e), r && Gd(n, e))), b && n.setLineDash([]);
}
function DT(n, t, e) {
  var i = t.__image = E_(e.image, t.__image, t, t.onload);
  if (!(!i || !Oh(i))) {
    var s = e.x || 0, r = e.y || 0, o = t.getWidth(), a = t.getHeight(), l = i.width / i.height;
    if (o == null && a != null ? o = a * l : a == null && o != null ? a = o / l : o == null && a == null && (o = i.width, a = i.height), e.sWidth && e.sHeight) {
      var c = e.sx || 0, h = e.sy || 0;
      n.drawImage(i, c, h, e.sWidth, e.sHeight, s, r, o, a);
    } else if (e.sx && e.sy) {
      var c = e.sx, h = e.sy, u = o - c, f = a - h;
      n.drawImage(i, c, h, u, f, s, r, o, a);
    } else
      n.drawImage(i, s, r, o, a);
  }
}
function IT(n, t, e) {
  var i, s = e.text;
  if (s != null && (s += ""), s) {
    n.font = e.font || $s, n.textAlign = e.textAlign, n.textBaseline = e.textBaseline;
    var r = void 0, o = void 0;
    n.setLineDash && e.lineDash && (i = A_(t), r = i[0], o = i[1]), r && (n.setLineDash(r), n.lineDashOffset = o), e.strokeFirst ? (zo(e) && n.strokeText(s, e.x, e.y), Bo(e) && n.fillText(s, e.x, e.y)) : (Bo(e) && n.fillText(s, e.x, e.y), zo(e) && n.strokeText(s, e.x, e.y)), r && n.setLineDash([]);
  }
}
var Yd = ["shadowBlur", "shadowOffsetX", "shadowOffsetY"], Wd = [
  ["lineCap", "butt"],
  ["lineJoin", "miter"],
  ["miterLimit", 10]
];
function L_(n, t, e, i, s) {
  var r = !1;
  if (!i && (e = e || {}, t === e))
    return !1;
  if (i || t.opacity !== e.opacity) {
    gt(n, s), r = !0;
    var o = Math.max(Math.min(t.opacity, 1), 0);
    n.globalAlpha = isNaN(o) ? Hn.opacity : o;
  }
  (i || t.blend !== e.blend) && (r || (gt(n, s), r = !0), n.globalCompositeOperation = t.blend || Hn.blend);
  for (var a = 0; a < Yd.length; a++) {
    var l = Yd[a];
    (i || t[l] !== e[l]) && (r || (gt(n, s), r = !0), n[l] = n.dpr * (t[l] || 0));
  }
  return (i || t.shadowColor !== e.shadowColor) && (r || (gt(n, s), r = !0), n.shadowColor = t.shadowColor || Hn.shadowColor), r;
}
function Ud(n, t, e, i, s) {
  var r = tr(t, s.inHover), o = i ? null : e && tr(e, s.inHover) || {};
  if (r === o)
    return !1;
  var a = L_(n, r, o, i, s);
  if ((i || r.fill !== o.fill) && (a || (gt(n, s), a = !0), $d(r.fill) && (n.fillStyle = r.fill)), (i || r.stroke !== o.stroke) && (a || (gt(n, s), a = !0), $d(r.stroke) && (n.strokeStyle = r.stroke)), (i || r.opacity !== o.opacity) && (a || (gt(n, s), a = !0), n.globalAlpha = r.opacity == null ? 1 : r.opacity), t.hasStroke()) {
    var l = r.lineWidth, c = l / (r.strokeNoScale && t.getLineScale ? t.getLineScale() : 1);
    n.lineWidth !== c && (a || (gt(n, s), a = !0), n.lineWidth = c);
  }
  for (var h = 0; h < Wd.length; h++) {
    var u = Wd[h], f = u[0];
    (i || r[f] !== o[f]) && (a || (gt(n, s), a = !0), n[f] = r[f] || u[1]);
  }
  return a;
}
function ET(n, t, e, i, s) {
  return L_(n, tr(t, s.inHover), e && tr(e, s.inHover), i, s);
}
function P_(n, t) {
  var e = t.transform, i = n.dpr || 1;
  e ? n.setTransform(i * e[0], i * e[1], i * e[2], i * e[3], i * e[4], i * e[5]) : n.setTransform(i, 0, 0, i, 0, 0);
}
function RT(n, t, e) {
  for (var i = !1, s = 0; s < n.length; s++) {
    var r = n[s];
    i = i || r.isZeroArea(), P_(t, r), t.beginPath(), r.buildPath(t, r.shape), t.clip();
  }
  e.allClipped = i;
}
function AT(n, t) {
  return n && t ? n[0] !== t[0] || n[1] !== t[1] || n[2] !== t[2] || n[3] !== t[3] || n[4] !== t[4] || n[5] !== t[5] : !(!n && !t);
}
var Vd = 1, qd = 2, Xd = 3, Zd = 4;
function LT(n) {
  var t = Bo(n), e = zo(n);
  return !(n.lineDash || !(+t ^ +e) || t && typeof n.fill != "string" || e && typeof n.stroke != "string" || n.strokePercent < 1 || n.strokeOpacity < 1 || n.fillOpacity < 1);
}
function gt(n, t) {
  t.batchFill && n.fill(), t.batchStroke && n.stroke(), t.batchFill = "", t.batchStroke = "";
}
function tr(n, t) {
  return t && n.__hoverStyle || n.style;
}
function PT(n, t) {
  $n(n, t, { inHover: !1, viewWidth: 0, viewHeight: 0 }, !0);
}
function $n(n, t, e, i) {
  var s = t.transform;
  if (!t.shouldBePainted(e.viewWidth, e.viewHeight, !1, !1)) {
    t.__dirty &= ~Ut, t.__isRendered = !1;
    return;
  }
  var r = t.__clipPaths, o = e.prevElClipPaths, a = !1, l = !1;
  if ((!o || ST(r, o)) && (o && o.length && (gt(n, e), n.restore(), l = a = !0, e.prevElClipPaths = null, e.allClipped = !1, e.prevEl = null), r && r.length && (gt(n, e), n.save(), RT(r, n, e), a = !0), e.prevElClipPaths = r), e.allClipped) {
    t.__isRendered = !1;
    return;
  }
  t.beforeBrush && t.beforeBrush(), t.innerBeforeBrush();
  var c = e.prevEl;
  c || (l = a = !0);
  var h = t instanceof sc && t.autoBatch && LT(t.style);
  a || AT(s, c.transform) ? (gt(n, e), P_(n, t)) : h || gt(n, e);
  var u = tr(t, e.inHover);
  t instanceof sc ? (e.lastDrawType !== Vd && (l = !0, e.lastDrawType = Vd), Ud(n, t, c, l, e), (!h || !e.batchFill && !e.batchStroke) && n.beginPath(), CT(n, t, u, h), h && (e.batchFill = u.fill || "", e.batchStroke = u.stroke || "")) : t instanceof R_ ? (e.lastDrawType !== Xd && (l = !0, e.lastDrawType = Xd), Ud(n, t, c, l, e), IT(n, t, u)) : t instanceof Sh ? (e.lastDrawType !== qd && (l = !0, e.lastDrawType = qd), ET(n, t, c, l, e), DT(n, t, u)) : t.getTemporalDisplayables && (e.lastDrawType !== Zd && (l = !0, e.lastDrawType = Zd), kT(n, t, e)), h && i && gt(n, e), t.innerAfterBrush(), t.afterBrush && t.afterBrush(), e.prevEl = t, t.__dirty = 0, t.__isRendered = !0;
}
function kT(n, t, e) {
  var i = t.getDisplayables(), s = t.getTemporalDisplayables();
  n.save();
  var r = {
    prevElClipPaths: null,
    prevEl: null,
    allClipped: !1,
    viewWidth: e.viewWidth,
    viewHeight: e.viewHeight,
    inHover: e.inHover
  }, o, a;
  for (o = t.getCursor(), a = i.length; o < a; o++) {
    var l = i[o];
    l.beforeBrush && l.beforeBrush(), l.innerBeforeBrush(), $n(n, l, r, o === a - 1), l.innerAfterBrush(), l.afterBrush && l.afterBrush(), r.prevEl = l;
  }
  for (var c = 0, h = s.length; c < h; c++) {
    var l = s[c];
    l.beforeBrush && l.beforeBrush(), l.innerBeforeBrush(), $n(n, l, r, c === h - 1), l.innerAfterBrush(), l.afterBrush && l.afterBrush(), r.prevEl = l;
  }
  t.clearTemporalDisplayables(), t.notClear = !0, n.restore();
}
function Kd(n, t, e) {
  var i = nr.createCanvas(), s = t.getWidth(), r = t.getHeight(), o = i.style;
  return o && (o.position = "absolute", o.left = "0", o.top = "0", o.width = s + "px", o.height = r + "px", i.setAttribute("data-zr-dom-id", n)), i.width = s * e, i.height = r * e, i;
}
var Rl = (function(n) {
  Xn(t, n);
  function t(e, i, s) {
    var r = n.call(this) || this;
    r.motionBlur = !1, r.lastFrameAlpha = 0.7, r.dpr = 1, r.virtual = !1, r.config = {}, r.incremental = !1, r.zlevel = 0, r.maxRepaintRectCount = 5, r.__dirty = !0, r.__firstTimePaint = !0, r.__used = !1, r.__drawIndex = 0, r.__startIndex = 0, r.__endIndex = 0, r.__prevStartIndex = null, r.__prevEndIndex = null;
    var o;
    s = s || To, typeof e == "string" ? o = Kd(e, i, s) : se(e) && (o = e, e = o.id), r.id = e, r.dom = o;
    var a = o.style;
    return a && (Rp(o), o.onselectstart = function() {
      return !1;
    }, a.padding = "0", a.margin = "0", a.borderWidth = "0"), r.painter = i, r.dpr = s, r;
  }
  return t.prototype.getElementCount = function() {
    return this.__endIndex - this.__startIndex;
  }, t.prototype.afterBrush = function() {
    this.__prevStartIndex = this.__startIndex, this.__prevEndIndex = this.__endIndex;
  }, t.prototype.initContext = function() {
    this.ctx = this.dom.getContext("2d"), this.ctx.dpr = this.dpr;
  }, t.prototype.setUnpainted = function() {
    this.__firstTimePaint = !0;
  }, t.prototype.createBackBuffer = function() {
    var e = this.dpr;
    this.domBack = Kd("back-" + this.id, this.painter, e), this.ctxBack = this.domBack.getContext("2d"), e !== 1 && this.ctxBack.scale(e, e);
  }, t.prototype.createRepaintRects = function(e, i, s, r) {
    if (this.__firstTimePaint)
      return this.__firstTimePaint = !1, null;
    var o = [], a = this.maxRepaintRectCount, l = !1, c = new _t(0, 0, 0, 0);
    function h(y) {
      if (!(!y.isFinite() || y.isZero()))
        if (o.length === 0) {
          var v = new _t(0, 0, 0, 0);
          v.copy(y), o.push(v);
        } else {
          for (var S = !1, w = 1 / 0, x = 0, M = 0; M < o.length; ++M) {
            var b = o[M];
            if (b.intersect(y)) {
              var T = new _t(0, 0, 0, 0);
              T.copy(b), T.union(y), o[M] = T, S = !0;
              break;
            } else if (l) {
              c.copy(y), c.union(b);
              var I = y.width * y.height, C = b.width * b.height, E = c.width * c.height, A = E - I - C;
              A < w && (w = A, x = M);
            }
          }
          if (l && (o[x].union(y), S = !0), !S) {
            var v = new _t(0, 0, 0, 0);
            v.copy(y), o.push(v);
          }
          l || (l = o.length >= a);
        }
    }
    for (var u = this.__startIndex; u < this.__endIndex; ++u) {
      var f = e[u];
      if (f) {
        var d = f.shouldBePainted(s, r, !0, !0), p = f.__isRendered && (f.__dirty & Ut || !d) ? f.getPrevPaintRect() : null;
        p && h(p);
        var _ = d && (f.__dirty & Ut || !f.__isRendered) ? f.getPaintRect() : null;
        _ && h(_);
      }
    }
    for (var u = this.__prevStartIndex; u < this.__prevEndIndex; ++u) {
      var f = i[u], d = f.shouldBePainted(s, r, !0, !0);
      if (f && (!d || !f.__zr) && f.__isRendered) {
        var p = f.getPrevPaintRect();
        p && h(p);
      }
    }
    var g;
    do {
      g = !1;
      for (var u = 0; u < o.length; ) {
        if (o[u].isZero()) {
          o.splice(u, 1);
          continue;
        }
        for (var m = u + 1; m < o.length; )
          o[u].intersect(o[m]) ? (g = !0, o[u].union(o[m]), o.splice(m, 1)) : m++;
        u++;
      }
    } while (g);
    return this._paintRects = o, o;
  }, t.prototype.debugGetPaintRects = function() {
    return (this._paintRects || []).slice();
  }, t.prototype.resize = function(e, i) {
    var s = this.dpr, r = this.dom, o = r.style, a = this.domBack;
    o && (o.width = e + "px", o.height = i + "px"), r.width = e * s, r.height = i * s, a && (a.width = e * s, a.height = i * s, s !== 1 && this.ctxBack.scale(s, s));
  }, t.prototype.clear = function(e, i, s) {
    var r = this.dom, o = this.ctx, a = r.width, l = r.height;
    i = i || this.clearColor;
    var c = this.motionBlur && !e, h = this.lastFrameAlpha, u = this.dpr, f = this;
    c && (this.domBack || this.createBackBuffer(), this.ctxBack.globalCompositeOperation = "copy", this.ctxBack.drawImage(r, 0, 0, a / u, l / u));
    var d = this.domBack;
    function p(_, g, m, y) {
      if (o.clearRect(_, g, m, y), i && i !== "transparent") {
        var v = void 0;
        if (ga(i)) {
          var S = i.global || i.__width === m && i.__height === y;
          v = S && i.__canvasGradient || Wc(o, i, {
            x: 0,
            y: 0,
            width: m,
            height: y
          }), i.__canvasGradient = v, i.__width = m, i.__height = y;
        } else Lm(i) && (i.scaleX = i.scaleX || u, i.scaleY = i.scaleY || u, v = Uc(o, i, {
          dirty: function() {
            f.setUnpainted(), f.__painter.refresh();
          }
        }));
        o.save(), o.fillStyle = v || i, o.fillRect(_, g, m, y), o.restore();
      }
      c && (o.save(), o.globalAlpha = h, o.drawImage(d, _, g, m, y), o.restore());
    }
    !s || c ? p(0, 0, a, l) : s.length && et(s, function(_) {
      p(_.x * u, _.y * u, _.width * u, _.height * u);
    });
  }, t;
})(Dg), k_;
k_ = ye.hasGlobalWindow && (window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window) || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame) || function(n) {
  return setTimeout(n, 16);
};
var jd = 1e5, Fn = 314159, Xr = 0.01, OT = 1e-3;
function FT(n) {
  return n ? n.__builtin__ ? !0 : !(typeof n.resize != "function" || typeof n.refresh != "function") : !1;
}
function NT(n, t) {
  var e = document.createElement("div");
  return e.style.cssText = [
    "position:relative",
    "width:" + n + "px",
    "height:" + t + "px",
    "padding:0",
    "margin:0",
    "border-width:0"
  ].join(";") + ";", e;
}
var zT = (function() {
  function n(t, e, i, s) {
    this.type = "canvas", this._zlevelList = [], this._prevDisplayList = [], this._layers = {}, this._layerConfig = {}, this._needsManuallyCompositing = !1, this.type = "canvas";
    var r = !t.nodeName || t.nodeName.toUpperCase() === "CANVAS";
    this._opts = i = R({}, i || {}), this.dpr = i.devicePixelRatio || To, this._singleCanvas = r, this.root = t;
    var o = t.style;
    o && (Rp(t), t.innerHTML = ""), this.storage = e;
    var a = this._zlevelList;
    this._prevDisplayList = [];
    var l = this._layers;
    if (r) {
      var h = t, u = h.width, f = h.height;
      i.width != null && (u = i.width), i.height != null && (f = i.height), this.dpr = i.devicePixelRatio || 1, h.width = u * this.dpr, h.height = f * this.dpr, this._width = u, this._height = f;
      var d = new Rl(h, this, this.dpr);
      d.__builtin__ = !0, d.initContext(), l[Fn] = d, d.zlevel = Fn, a.push(Fn), this._domRoot = t;
    } else {
      this._width = qr(t, 0, i), this._height = qr(t, 1, i);
      var c = this._domRoot = NT(this._width, this._height);
      t.appendChild(c);
    }
  }
  return n.prototype.getType = function() {
    return "canvas";
  }, n.prototype.isSingleCanvas = function() {
    return this._singleCanvas;
  }, n.prototype.getViewportRoot = function() {
    return this._domRoot;
  }, n.prototype.getViewportRootOffset = function() {
    var t = this.getViewportRoot();
    if (t)
      return {
        offsetLeft: t.offsetLeft || 0,
        offsetTop: t.offsetTop || 0
      };
  }, n.prototype.refresh = function(t) {
    var e = this.storage.getDisplayList(!0), i = this._prevDisplayList, s = this._zlevelList;
    this._redrawId = Math.random(), this._paintList(e, i, t, this._redrawId);
    for (var r = 0; r < s.length; r++) {
      var o = s[r], a = this._layers[o];
      if (!a.__builtin__ && a.refresh) {
        var l = r === 0 ? this._backgroundColor : null;
        a.refresh(l);
      }
    }
    return this._opts.useDirtyRect && (this._prevDisplayList = e.slice()), this;
  }, n.prototype.refreshHover = function() {
    this._paintHoverList(this.storage.getDisplayList(!1));
  }, n.prototype._paintHoverList = function(t) {
    var e = t.length, i = this._hoverlayer;
    if (i && i.clear(), !!e) {
      for (var s = {
        inHover: !0,
        viewWidth: this._width,
        viewHeight: this._height
      }, r, o = 0; o < e; o++) {
        var a = t[o];
        a.__inHover && (i || (i = this._hoverlayer = this.getLayer(jd)), r || (r = i.ctx, r.save()), $n(r, a, s, o === e - 1));
      }
      r && r.restore();
    }
  }, n.prototype.getHoverLayer = function() {
    return this.getLayer(jd);
  }, n.prototype.paintOne = function(t, e) {
    PT(t, e);
  }, n.prototype._paintList = function(t, e, i, s) {
    if (this._redrawId === s) {
      i = i || !1, this._updateLayerStatus(t);
      var r = this._doPaintList(t, e, i), o = r.finished, a = r.needsRefreshHover;
      if (this._needsManuallyCompositing && this._compositeManually(), a && this._paintHoverList(t), o)
        this.eachLayer(function(c) {
          c.afterBrush && c.afterBrush();
        });
      else {
        var l = this;
        k_(function() {
          l._paintList(t, e, i, s);
        });
      }
    }
  }, n.prototype._compositeManually = function() {
    var t = this.getLayer(Fn).ctx, e = this._domRoot.width, i = this._domRoot.height;
    t.clearRect(0, 0, e, i), this.eachBuiltinLayer(function(s) {
      s.virtual && t.drawImage(s.dom, 0, 0, e, i);
    });
  }, n.prototype._doPaintList = function(t, e, i) {
    for (var s = this, r = [], o = this._opts.useDirtyRect, a = 0; a < this._zlevelList.length; a++) {
      var l = this._zlevelList[a], c = this._layers[l];
      c.__builtin__ && c !== this._hoverlayer && (c.__dirty || i) && r.push(c);
    }
    for (var h = !0, u = !1, f = function(_) {
      var g = r[_], m = g.ctx, y = o && g.createRepaintRects(t, e, d._width, d._height), v = i ? g.__startIndex : g.__drawIndex, S = !i && g.incremental && Date.now, w = S && Date.now(), x = g.zlevel === d._zlevelList[0] ? d._backgroundColor : null;
      if (g.__startIndex === g.__endIndex)
        g.clear(!1, x, y);
      else if (v === g.__startIndex) {
        var M = t[v];
        (!M.incremental || !M.notClear || i) && g.clear(!1, x, y);
      }
      v === -1 && (console.error("For some unknown reason. drawIndex is -1"), v = g.__startIndex);
      var b, T = function(A) {
        var L = {
          inHover: !1,
          allClipped: !1,
          prevEl: null,
          viewWidth: s._width,
          viewHeight: s._height
        };
        for (b = v; b < g.__endIndex; b++) {
          var W = t[b];
          if (W.__inHover && (u = !0), s._doPaintEl(W, g, o, A, L, b === g.__endIndex - 1), S) {
            var G = Date.now() - w;
            if (G > 15)
              break;
          }
        }
        L.prevElClipPaths && m.restore();
      };
      if (y)
        if (y.length === 0)
          b = g.__endIndex;
        else
          for (var I = d.dpr, C = 0; C < y.length; ++C) {
            var E = y[C];
            m.save(), m.beginPath(), m.rect(E.x * I, E.y * I, E.width * I, E.height * I), m.clip(), T(E), m.restore();
          }
      else
        m.save(), T(), m.restore();
      g.__drawIndex = b, g.__drawIndex < g.__endIndex && (h = !1);
    }, d = this, p = 0; p < r.length; p++)
      f(p);
    return ye.wxa && et(this._layers, function(_) {
      _ && _.ctx && _.ctx.draw && _.ctx.draw();
    }), {
      finished: h,
      needsRefreshHover: u
    };
  }, n.prototype._doPaintEl = function(t, e, i, s, r, o) {
    var a = e.ctx;
    if (i) {
      var l = t.getPaintRect();
      (!s || l && l.intersect(s)) && ($n(a, t, r, o), t.setPrevPaintRect(l));
    } else
      $n(a, t, r, o);
  }, n.prototype.getLayer = function(t, e) {
    this._singleCanvas && !this._needsManuallyCompositing && (t = Fn);
    var i = this._layers[t];
    return i || (i = new Rl("zr_" + t, this, this.dpr), i.zlevel = t, i.__builtin__ = !0, this._layerConfig[t] ? je(i, this._layerConfig[t], !0) : this._layerConfig[t - Xr] && je(i, this._layerConfig[t - Xr], !0), e && (i.virtual = e), this.insertLayer(t, i), i.initContext()), i;
  }, n.prototype.insertLayer = function(t, e) {
    var i = this._layers, s = this._zlevelList, r = s.length, o = this._domRoot, a = null, l = -1;
    if (!i[t] && FT(e)) {
      if (r > 0 && t > s[0]) {
        for (l = 0; l < r - 1 && !(s[l] < t && s[l + 1] > t); l++)
          ;
        a = i[s[l]];
      }
      if (s.splice(l + 1, 0, t), i[t] = e, !e.virtual)
        if (a) {
          var c = a.dom;
          c.nextSibling ? o.insertBefore(e.dom, c.nextSibling) : o.appendChild(e.dom);
        } else
          o.firstChild ? o.insertBefore(e.dom, o.firstChild) : o.appendChild(e.dom);
      e.__painter = this;
    }
  }, n.prototype.eachLayer = function(t, e) {
    for (var i = this._zlevelList, s = 0; s < i.length; s++) {
      var r = i[s];
      t.call(e, this._layers[r], r);
    }
  }, n.prototype.eachBuiltinLayer = function(t, e) {
    for (var i = this._zlevelList, s = 0; s < i.length; s++) {
      var r = i[s], o = this._layers[r];
      o.__builtin__ && t.call(e, o, r);
    }
  }, n.prototype.eachOtherLayer = function(t, e) {
    for (var i = this._zlevelList, s = 0; s < i.length; s++) {
      var r = i[s], o = this._layers[r];
      o.__builtin__ || t.call(e, o, r);
    }
  }, n.prototype.getLayers = function() {
    return this._layers;
  }, n.prototype._updateLayerStatus = function(t) {
    this.eachBuiltinLayer(function(u, f) {
      u.__dirty = u.__used = !1;
    });
    function e(u) {
      r && (r.__endIndex !== u && (r.__dirty = !0), r.__endIndex = u);
    }
    if (this._singleCanvas)
      for (var i = 1; i < t.length; i++) {
        var s = t[i];
        if (s.zlevel !== t[i - 1].zlevel || s.incremental) {
          this._needsManuallyCompositing = !0;
          break;
        }
      }
    var r = null, o = 0, a, l;
    for (l = 0; l < t.length; l++) {
      var s = t[l], c = s.zlevel, h = void 0;
      a !== c && (a = c, o = 0), s.incremental ? (h = this.getLayer(c + OT, this._needsManuallyCompositing), h.incremental = !0, o = 1) : h = this.getLayer(c + (o > 0 ? Xr : 0), this._needsManuallyCompositing), h.__builtin__ || sh("ZLevel " + c + " has been used by unkown layer " + h.id), h !== r && (h.__used = !0, h.__startIndex !== l && (h.__dirty = !0), h.__startIndex = l, h.incremental ? h.__drawIndex = -1 : h.__drawIndex = l, e(l), r = h), s.__dirty & Ut && !s.__inHover && (h.__dirty = !0, h.incremental && h.__drawIndex < 0 && (h.__drawIndex = l));
    }
    e(l), this.eachBuiltinLayer(function(u, f) {
      !u.__used && u.getElementCount() > 0 && (u.__dirty = !0, u.__startIndex = u.__endIndex = u.__drawIndex = 0), u.__dirty && u.__drawIndex < 0 && (u.__drawIndex = u.__startIndex);
    });
  }, n.prototype.clear = function() {
    return this.eachBuiltinLayer(this._clearLayer), this;
  }, n.prototype._clearLayer = function(t) {
    t.clear();
  }, n.prototype.setBackgroundColor = function(t) {
    this._backgroundColor = t, et(this._layers, function(e) {
      e.setUnpainted();
    });
  }, n.prototype.configLayer = function(t, e) {
    if (e) {
      var i = this._layerConfig;
      i[t] ? je(i[t], e, !0) : i[t] = e;
      for (var s = 0; s < this._zlevelList.length; s++) {
        var r = this._zlevelList[s];
        if (r === t || r === t + Xr) {
          var o = this._layers[r];
          je(o, i[t], !0);
        }
      }
    }
  }, n.prototype.delLayer = function(t) {
    var e = this._layers, i = this._zlevelList, s = e[t];
    s && (s.dom.parentNode.removeChild(s.dom), delete e[t], i.splice(Tt(i, t), 1));
  }, n.prototype.resize = function(t, e) {
    if (this._domRoot.style) {
      var i = this._domRoot;
      i.style.display = "none";
      var s = this._opts, r = this.root;
      if (t != null && (s.width = t), e != null && (s.height = e), t = qr(r, 0, s), e = qr(r, 1, s), i.style.display = "", this._width !== t || e !== this._height) {
        i.style.width = t + "px", i.style.height = e + "px";
        for (var o in this._layers)
          this._layers.hasOwnProperty(o) && this._layers[o].resize(t, e);
        this.refresh(!0);
      }
      this._width = t, this._height = e;
    } else {
      if (t == null || e == null)
        return;
      this._width = t, this._height = e, this.getLayer(Fn).resize(t, e);
    }
    return this;
  }, n.prototype.clearLayer = function(t) {
    var e = this._layers[t];
    e && e.clear();
  }, n.prototype.dispose = function() {
    this.root.innerHTML = "", this.root = this.storage = this._domRoot = this._layers = null;
  }, n.prototype.getRenderedCanvas = function(t) {
    if (t = t || {}, this._singleCanvas && !this._compositeManually)
      return this._layers[Fn].dom;
    var e = new Rl("image", this, t.pixelRatio || this.dpr);
    e.initContext(), e.clear(!1, t.backgroundColor || this._backgroundColor);
    var i = e.ctx;
    if (t.pixelRatio <= this.dpr) {
      this.refresh();
      var s = e.dom.width, r = e.dom.height;
      this.eachLayer(function(u) {
        u.__builtin__ ? i.drawImage(u.dom, 0, 0, s, r) : u.renderToCanvas && (i.save(), u.renderToCanvas(i), i.restore());
      });
    } else
      for (var o = {
        inHover: !1,
        viewWidth: this._width,
        viewHeight: this._height
      }, a = this.storage.getDisplayList(!0), l = 0, c = a.length; l < c; l++) {
        var h = a[l];
        $n(i, h, o, l === c - 1);
      }
    return e.dom;
  }, n.prototype.getWidth = function() {
    return this._width;
  }, n.prototype.getHeight = function() {
    return this._height;
  }, n;
})(), ee = Object.freeze({
  Linear: Object.freeze({
    None: function(n) {
      return n;
    },
    In: function(n) {
      return n;
    },
    Out: function(n) {
      return n;
    },
    InOut: function(n) {
      return n;
    }
  }),
  Quadratic: Object.freeze({
    In: function(n) {
      return n * n;
    },
    Out: function(n) {
      return n * (2 - n);
    },
    InOut: function(n) {
      return (n *= 2) < 1 ? 0.5 * n * n : -0.5 * (--n * (n - 2) - 1);
    }
  }),
  Cubic: Object.freeze({
    In: function(n) {
      return n * n * n;
    },
    Out: function(n) {
      return --n * n * n + 1;
    },
    InOut: function(n) {
      return (n *= 2) < 1 ? 0.5 * n * n * n : 0.5 * ((n -= 2) * n * n + 2);
    }
  }),
  Quartic: Object.freeze({
    In: function(n) {
      return n * n * n * n;
    },
    Out: function(n) {
      return 1 - --n * n * n * n;
    },
    InOut: function(n) {
      return (n *= 2) < 1 ? 0.5 * n * n * n * n : -0.5 * ((n -= 2) * n * n * n - 2);
    }
  }),
  Quintic: Object.freeze({
    In: function(n) {
      return n * n * n * n * n;
    },
    Out: function(n) {
      return --n * n * n * n * n + 1;
    },
    InOut: function(n) {
      return (n *= 2) < 1 ? 0.5 * n * n * n * n * n : 0.5 * ((n -= 2) * n * n * n * n + 2);
    }
  }),
  Sinusoidal: Object.freeze({
    In: function(n) {
      return 1 - Math.sin((1 - n) * Math.PI / 2);
    },
    Out: function(n) {
      return Math.sin(n * Math.PI / 2);
    },
    InOut: function(n) {
      return 0.5 * (1 - Math.sin(Math.PI * (0.5 - n)));
    }
  }),
  Exponential: Object.freeze({
    In: function(n) {
      return n === 0 ? 0 : Math.pow(1024, n - 1);
    },
    Out: function(n) {
      return n === 1 ? 1 : 1 - Math.pow(2, -10 * n);
    },
    InOut: function(n) {
      return n === 0 ? 0 : n === 1 ? 1 : (n *= 2) < 1 ? 0.5 * Math.pow(1024, n - 1) : 0.5 * (-Math.pow(2, -10 * (n - 1)) + 2);
    }
  }),
  Circular: Object.freeze({
    In: function(n) {
      return 1 - Math.sqrt(1 - n * n);
    },
    Out: function(n) {
      return Math.sqrt(1 - --n * n);
    },
    InOut: function(n) {
      return (n *= 2) < 1 ? -0.5 * (Math.sqrt(1 - n * n) - 1) : 0.5 * (Math.sqrt(1 - (n -= 2) * n) + 1);
    }
  }),
  Elastic: Object.freeze({
    In: function(n) {
      return n === 0 ? 0 : n === 1 ? 1 : -Math.pow(2, 10 * (n - 1)) * Math.sin((n - 1.1) * 5 * Math.PI);
    },
    Out: function(n) {
      return n === 0 ? 0 : n === 1 ? 1 : Math.pow(2, -10 * n) * Math.sin((n - 0.1) * 5 * Math.PI) + 1;
    },
    InOut: function(n) {
      return n === 0 ? 0 : n === 1 ? 1 : (n *= 2, n < 1 ? -0.5 * Math.pow(2, 10 * (n - 1)) * Math.sin((n - 1.1) * 5 * Math.PI) : 0.5 * Math.pow(2, -10 * (n - 1)) * Math.sin((n - 1.1) * 5 * Math.PI) + 1);
    }
  }),
  Back: Object.freeze({
    In: function(n) {
      var t = 1.70158;
      return n === 1 ? 1 : n * n * ((t + 1) * n - t);
    },
    Out: function(n) {
      var t = 1.70158;
      return n === 0 ? 0 : --n * n * ((t + 1) * n + t) + 1;
    },
    InOut: function(n) {
      var t = 2.5949095;
      return (n *= 2) < 1 ? 0.5 * (n * n * ((t + 1) * n - t)) : 0.5 * ((n -= 2) * n * ((t + 1) * n + t) + 2);
    }
  }),
  Bounce: Object.freeze({
    In: function(n) {
      return 1 - ee.Bounce.Out(1 - n);
    },
    Out: function(n) {
      return n < 1 / 2.75 ? 7.5625 * n * n : n < 2 / 2.75 ? 7.5625 * (n -= 1.5 / 2.75) * n + 0.75 : n < 2.5 / 2.75 ? 7.5625 * (n -= 2.25 / 2.75) * n + 0.9375 : 7.5625 * (n -= 2.625 / 2.75) * n + 0.984375;
    },
    InOut: function(n) {
      return n < 0.5 ? ee.Bounce.In(n * 2) * 0.5 : ee.Bounce.Out(n * 2 - 1) * 0.5 + 0.5;
    }
  }),
  generatePow: function(n) {
    return n === void 0 && (n = 4), n = n < Number.EPSILON ? Number.EPSILON : n, n = n > 1e4 ? 1e4 : n, {
      In: function(t) {
        return Math.pow(t, n);
      },
      Out: function(t) {
        return 1 - Math.pow(1 - t, n);
      },
      InOut: function(t) {
        return t < 0.5 ? Math.pow(t * 2, n) / 2 : (1 - Math.pow(2 - t * 2, n)) / 2 + 0.5;
      }
    };
  }
}), fs = function() {
  return performance.now();
}, O_ = (
  /** @class */
  (function() {
    function n() {
      for (var t = [], e = 0; e < arguments.length; e++)
        t[e] = arguments[e];
      this._tweens = {}, this._tweensAddedDuringUpdate = {}, this.add.apply(this, t);
    }
    return n.prototype.getAll = function() {
      var t = this;
      return Object.keys(this._tweens).map(function(e) {
        return t._tweens[e];
      });
    }, n.prototype.removeAll = function() {
      this._tweens = {};
    }, n.prototype.add = function() {
      for (var t, e = [], i = 0; i < arguments.length; i++)
        e[i] = arguments[i];
      for (var s = 0, r = e; s < r.length; s++) {
        var o = r[s];
        (t = o._group) === null || t === void 0 || t.remove(o), o._group = this, this._tweens[o.getId()] = o, this._tweensAddedDuringUpdate[o.getId()] = o;
      }
    }, n.prototype.remove = function() {
      for (var t = [], e = 0; e < arguments.length; e++)
        t[e] = arguments[e];
      for (var i = 0, s = t; i < s.length; i++) {
        var r = s[i];
        r._group = void 0, delete this._tweens[r.getId()], delete this._tweensAddedDuringUpdate[r.getId()];
      }
    }, n.prototype.allStopped = function() {
      return this.getAll().every(function(t) {
        return !t.isPlaying();
      });
    }, n.prototype.update = function(t, e) {
      t === void 0 && (t = fs()), e === void 0 && (e = !0);
      var i = Object.keys(this._tweens);
      if (i.length !== 0)
        for (; i.length > 0; ) {
          this._tweensAddedDuringUpdate = {};
          for (var s = 0; s < i.length; s++) {
            var r = this._tweens[i[s]], o = !e;
            r && r.update(t, o) === !1 && !e && this.remove(r);
          }
          i = Object.keys(this._tweensAddedDuringUpdate);
        }
    }, n;
  })()
), Vc = {
  Linear: function(n, t) {
    var e = n.length - 1, i = e * t, s = Math.floor(i), r = Vc.Utils.Linear;
    return t < 0 ? r(n[0], n[1], i) : t > 1 ? r(n[e], n[e - 1], e - i) : r(n[s], n[s + 1 > e ? e : s + 1], i - s);
  },
  Utils: {
    Linear: function(n, t, e) {
      return (t - n) * e + n;
    }
  }
}, F_ = (
  /** @class */
  (function() {
    function n() {
    }
    return n.nextId = function() {
      return n._nextId++;
    }, n._nextId = 0, n;
  })()
), qc = new O_(), BT = (
  /** @class */
  (function() {
    function n(t, e) {
      this._isPaused = !1, this._pauseStart = 0, this._valuesStart = {}, this._valuesEnd = {}, this._valuesStartRepeat = {}, this._duration = 1e3, this._isDynamic = !1, this._initialRepeat = 0, this._repeat = 0, this._yoyo = !1, this._isPlaying = !1, this._reversed = !1, this._delayTime = 0, this._startTime = 0, this._easingFunction = ee.Linear.None, this._interpolationFunction = Vc.Linear, this._chainedTweens = [], this._onStartCallbackFired = !1, this._onEveryStartCallbackFired = !1, this._id = F_.nextId(), this._isChainStopped = !1, this._propertiesAreSetUp = !1, this._goToEnd = !1, this._object = t, typeof e == "object" ? (this._group = e, e.add(this)) : e === !0 && (this._group = qc, qc.add(this));
    }
    return n.prototype.getId = function() {
      return this._id;
    }, n.prototype.isPlaying = function() {
      return this._isPlaying;
    }, n.prototype.isPaused = function() {
      return this._isPaused;
    }, n.prototype.getDuration = function() {
      return this._duration;
    }, n.prototype.to = function(t, e) {
      if (e === void 0 && (e = 1e3), this._isPlaying)
        throw new Error("Can not call Tween.to() while Tween is already started or paused. Stop the Tween first.");
      return this._valuesEnd = t, this._propertiesAreSetUp = !1, this._duration = e < 0 ? 0 : e, this;
    }, n.prototype.duration = function(t) {
      return t === void 0 && (t = 1e3), this._duration = t < 0 ? 0 : t, this;
    }, n.prototype.dynamic = function(t) {
      return t === void 0 && (t = !1), this._isDynamic = t, this;
    }, n.prototype.start = function(t, e) {
      if (t === void 0 && (t = fs()), e === void 0 && (e = !1), this._isPlaying)
        return this;
      if (this._repeat = this._initialRepeat, this._reversed) {
        this._reversed = !1;
        for (var i in this._valuesStartRepeat)
          this._swapEndStartRepeatValues(i), this._valuesStart[i] = this._valuesStartRepeat[i];
      }
      if (this._isPlaying = !0, this._isPaused = !1, this._onStartCallbackFired = !1, this._onEveryStartCallbackFired = !1, this._isChainStopped = !1, this._startTime = t, this._startTime += this._delayTime, !this._propertiesAreSetUp || e) {
        if (this._propertiesAreSetUp = !0, !this._isDynamic) {
          var s = {};
          for (var r in this._valuesEnd)
            s[r] = this._valuesEnd[r];
          this._valuesEnd = s;
        }
        this._setupProperties(this._object, this._valuesStart, this._valuesEnd, this._valuesStartRepeat, e);
      }
      return this;
    }, n.prototype.startFromCurrentValues = function(t) {
      return this.start(t, !0);
    }, n.prototype._setupProperties = function(t, e, i, s, r) {
      for (var o in i) {
        var a = t[o], l = Array.isArray(a), c = l ? "array" : typeof a, h = !l && Array.isArray(i[o]);
        if (!(c === "undefined" || c === "function")) {
          if (h) {
            var u = i[o];
            if (u.length === 0)
              continue;
            for (var f = [a], d = 0, p = u.length; d < p; d += 1) {
              var _ = this._handleRelativeValue(a, u[d]);
              if (isNaN(_)) {
                h = !1, console.warn("Found invalid interpolation list. Skipping.");
                break;
              }
              f.push(_);
            }
            h && (i[o] = f);
          }
          if ((c === "object" || l) && a && !h) {
            e[o] = l ? [] : {};
            var g = a;
            for (var m in g)
              e[o][m] = g[m];
            s[o] = l ? [] : {};
            var u = i[o];
            if (!this._isDynamic) {
              var y = {};
              for (var m in u)
                y[m] = u[m];
              i[o] = u = y;
            }
            this._setupProperties(g, e[o], u, s[o], r);
          } else
            (typeof e[o] == "undefined" || r) && (e[o] = a), l || (e[o] *= 1), h ? s[o] = i[o].slice().reverse() : s[o] = e[o] || 0;
        }
      }
    }, n.prototype.stop = function() {
      return this._isChainStopped || (this._isChainStopped = !0, this.stopChainedTweens()), this._isPlaying ? (this._isPlaying = !1, this._isPaused = !1, this._onStopCallback && this._onStopCallback(this._object), this) : this;
    }, n.prototype.end = function() {
      return this._goToEnd = !0, this.update(this._startTime + this._duration), this;
    }, n.prototype.pause = function(t) {
      return t === void 0 && (t = fs()), this._isPaused || !this._isPlaying ? this : (this._isPaused = !0, this._pauseStart = t, this);
    }, n.prototype.resume = function(t) {
      return t === void 0 && (t = fs()), !this._isPaused || !this._isPlaying ? this : (this._isPaused = !1, this._startTime += t - this._pauseStart, this._pauseStart = 0, this);
    }, n.prototype.stopChainedTweens = function() {
      for (var t = 0, e = this._chainedTweens.length; t < e; t++)
        this._chainedTweens[t].stop();
      return this;
    }, n.prototype.group = function(t) {
      return t ? (t.add(this), this) : (console.warn("tween.group() without args has been removed, use group.add(tween) instead."), this);
    }, n.prototype.remove = function() {
      var t;
      return (t = this._group) === null || t === void 0 || t.remove(this), this;
    }, n.prototype.delay = function(t) {
      return t === void 0 && (t = 0), this._delayTime = t, this;
    }, n.prototype.repeat = function(t) {
      return t === void 0 && (t = 0), this._initialRepeat = t, this._repeat = t, this;
    }, n.prototype.repeatDelay = function(t) {
      return this._repeatDelayTime = t, this;
    }, n.prototype.yoyo = function(t) {
      return t === void 0 && (t = !1), this._yoyo = t, this;
    }, n.prototype.easing = function(t) {
      return t === void 0 && (t = ee.Linear.None), this._easingFunction = t, this;
    }, n.prototype.interpolation = function(t) {
      return t === void 0 && (t = Vc.Linear), this._interpolationFunction = t, this;
    }, n.prototype.chain = function() {
      for (var t = [], e = 0; e < arguments.length; e++)
        t[e] = arguments[e];
      return this._chainedTweens = t, this;
    }, n.prototype.onStart = function(t) {
      return this._onStartCallback = t, this;
    }, n.prototype.onEveryStart = function(t) {
      return this._onEveryStartCallback = t, this;
    }, n.prototype.onUpdate = function(t) {
      return this._onUpdateCallback = t, this;
    }, n.prototype.onRepeat = function(t) {
      return this._onRepeatCallback = t, this;
    }, n.prototype.onComplete = function(t) {
      return this._onCompleteCallback = t, this;
    }, n.prototype.onStop = function(t) {
      return this._onStopCallback = t, this;
    }, n.prototype.update = function(t, e) {
      var i = this, s;
      if (t === void 0 && (t = fs()), e === void 0 && (e = n.autoStartOnUpdate), this._isPaused)
        return !0;
      var r;
      if (!this._goToEnd && !this._isPlaying)
        if (e)
          this.start(t, !0);
        else
          return !1;
      if (this._goToEnd = !1, t < this._startTime)
        return !0;
      this._onStartCallbackFired === !1 && (this._onStartCallback && this._onStartCallback(this._object), this._onStartCallbackFired = !0), this._onEveryStartCallbackFired === !1 && (this._onEveryStartCallback && this._onEveryStartCallback(this._object), this._onEveryStartCallbackFired = !0);
      var o = t - this._startTime, a = this._duration + ((s = this._repeatDelayTime) !== null && s !== void 0 ? s : this._delayTime), l = this._duration + this._repeat * a, c = function() {
        if (i._duration === 0 || o > l)
          return 1;
        var _ = Math.trunc(o / a), g = o - _ * a, m = Math.min(g / i._duration, 1);
        return m === 0 && o === i._duration ? 1 : m;
      }, h = c(), u = this._easingFunction(h);
      if (this._updateProperties(this._object, this._valuesStart, this._valuesEnd, u), this._onUpdateCallback && this._onUpdateCallback(this._object, h), this._duration === 0 || o >= this._duration)
        if (this._repeat > 0) {
          var f = Math.min(Math.trunc((o - this._duration) / a) + 1, this._repeat);
          isFinite(this._repeat) && (this._repeat -= f);
          for (r in this._valuesStartRepeat)
            !this._yoyo && typeof this._valuesEnd[r] == "string" && (this._valuesStartRepeat[r] = // eslint-disable-next-line
            // @ts-ignore FIXME?
            this._valuesStartRepeat[r] + parseFloat(this._valuesEnd[r])), this._yoyo && this._swapEndStartRepeatValues(r), this._valuesStart[r] = this._valuesStartRepeat[r];
          return this._yoyo && (this._reversed = !this._reversed), this._startTime += a * f, this._onRepeatCallback && this._onRepeatCallback(this._object), this._onEveryStartCallbackFired = !1, !0;
        } else {
          this._onCompleteCallback && this._onCompleteCallback(this._object);
          for (var d = 0, p = this._chainedTweens.length; d < p; d++)
            this._chainedTweens[d].start(this._startTime + this._duration, !1);
          return this._isPlaying = !1, !1;
        }
      return !0;
    }, n.prototype._updateProperties = function(t, e, i, s) {
      for (var r in i)
        if (e[r] !== void 0) {
          var o = e[r] || 0, a = i[r], l = Array.isArray(t[r]), c = Array.isArray(a), h = !l && c;
          h ? t[r] = this._interpolationFunction(a, s) : typeof a == "object" && a ? this._updateProperties(t[r], o, a, s) : (a = this._handleRelativeValue(o, a), typeof a == "number" && (t[r] = o + (a - o) * s));
        }
    }, n.prototype._handleRelativeValue = function(t, e) {
      return typeof e != "string" ? e : e.charAt(0) === "+" || e.charAt(0) === "-" ? t + parseFloat(e) : parseFloat(e);
    }, n.prototype._swapEndStartRepeatValues = function(t) {
      var e = this._valuesStartRepeat[t], i = this._valuesEnd[t];
      typeof i == "string" ? this._valuesStartRepeat[t] = this._valuesStartRepeat[t] + parseFloat(i) : this._valuesStartRepeat[t] = this._valuesEnd[t], this._valuesEnd[t] = e;
    }, n.autoStartOnUpdate = !1, n;
  })()
);
F_.nextId;
var Ce = qc;
Ce.getAll.bind(Ce);
Ce.removeAll.bind(Ce);
Ce.add.bind(Ce);
Ce.remove.bind(Ce);
Ce.update.bind(Ce);
class $T {
  constructor(t) {
    this._requestFrame = t, this._group = new O_(), this.presets = {
      fadeIn: (e, i = {}) => {
        var s, r;
        return this._setElementStyle(e, { opacity: (s = i.fromOpacity) != null ? s : 0 }), this.animateElement(
          e,
          { style: { opacity: (r = i.toOpacity) != null ? r : 1 } },
          Y({ duration: 240 }, i)
        );
      },
      fadeOut: (e, i = {}) => {
        var s;
        return this.animateElement(
          e,
          { style: { opacity: (s = i.toOpacity) != null ? s : 0 } },
          Y({ duration: 240 }, i)
        );
      },
      pulse: (e, i = {}) => {
        var r, o;
        const s = (r = this._getElementStyle(e).opacity) != null ? r : 1;
        return this.animateElement(
          e,
          { style: { opacity: (o = i.minOpacity) != null ? o : 0.35 } },
          ln(Y({
            duration: 700,
            loop: !0,
            yoyo: !0,
            easing: ee.Sinusoidal.InOut
          }, i), {
            onStop: (a) => {
              var l;
              i.restore !== !1 && this._setElementStyle(e, { opacity: s }), (l = i.onStop) == null || l.call(i, a);
            }
          })
        );
      },
      breathe: (e, i = {}) => {
        var l, c, h;
        const s = e.scale ? e.scale.slice() : [1, 1], r = (l = i.amplitude) != null ? l : 0.04, o = (c = i.scaleX) != null ? c : s[0] * (1 + r), a = (h = i.scaleY) != null ? h : s[1] * (1 + r);
        return this.animateElement(
          e,
          { scale: [o, a] },
          ln(Y({
            duration: 900,
            loop: !0,
            yoyo: !0,
            easing: ee.Sinusoidal.InOut
          }, i), {
            onStop: (u) => {
              var f;
              i.restore !== !1 && this._setElementAttrs(e, { scale: s }), (f = i.onStop) == null || f.call(i, u);
            }
          })
        );
      },
      scanX: (e, i, s, r = {}) => {
        var l, c;
        const o = (l = r.fromX) != null ? l : i, a = (c = r.toX) != null ? c : s;
        return this._setElementShape(e, { x: o }), this.animateElement(
          e,
          { shape: { x: a } },
          Y({
            duration: 1e3,
            loop: !0,
            easing: ee.Linear.None
          }, r)
        );
      },
      highlight: (e, i = {}) => {
        var a, l, c, h;
        const s = this._getElementStyle(e), r = (a = s.lineWidth) != null ? a : 1, o = (l = s.opacity) != null ? l : 1;
        return this.animateElement(
          e,
          {
            style: {
              lineWidth: r + ((c = i.lineWidthDelta) != null ? c : 1),
              opacity: (h = i.opacity) != null ? h : 0.72
            }
          },
          ln(Y({
            duration: 260,
            repeat: 1,
            yoyo: !0,
            easing: ee.Quadratic.Out
          }, i), {
            onStop: (u) => {
              var f;
              i.restore !== !1 && this._setElementStyle(e, { lineWidth: r, opacity: o }), (f = i.onStop) == null || f.call(i, u);
            }
          })
        );
      },
      shakeY: (e, i = {}) => {
        var a, l, c;
        const s = e.position ? e.position.slice() : [0, 0], r = (a = i.fromY) != null ? a : s[1], o = (c = i.toY) != null ? c : r - ((l = i.amplitude) != null ? l : 4);
        return i.fromY != null && this._setElementAttrs(e, { position: [s[0], r] }), this.animateElement(
          e,
          { position: [s[0], o] },
          ln(Y({
            duration: 180,
            loop: !0,
            yoyo: !0,
            easing: ee.Sinusoidal.InOut
          }, i), {
            onStop: (h) => {
              var u;
              i.restore !== !1 && this._setElementAttrs(e, { position: s }), (u = i.onStop) == null || u.call(i, h);
            }
          })
        );
      }
    };
  }
  animate(t, e, i = {}) {
    var o, a, l;
    const s = new BT(t, this._group).to(e, (o = i.duration) != null ? o : 300).easing((a = i.easing) != null ? a : ee.Quadratic.Out);
    i.delay && s.delay(i.delay);
    const r = this._getRepeatCount(i);
    return (r > 0 || r === 1 / 0) && s.repeat(r), i.repeatDelay != null && s.repeatDelay(i.repeatDelay), i.yoyo && s.yoyo(!0), i.onStart && s.onStart(() => i.onStart(t)), i.onUpdate && s.onUpdate((c, h) => i.onUpdate(c, h)), i.onComplete && s.onComplete((c) => i.onComplete(c)), i.onStop && s.onStop((c) => i.onStop(c)), s.start(), (l = this._requestFrame) == null || l.call(this), s;
  }
  animateElement(t, e, i = {}) {
    const s = this._createElementTweenState(t, e), r = s.to;
    return this.animate(s.current, r, ln(Y({}, i), {
      onUpdate: (o, a) => {
        var l;
        this._applyElementTweenState(t, o, s), (l = i.onUpdate) == null || l.call(i, o, a);
      },
      onComplete: (o) => {
        var a;
        this._applyElementTweenState(t, o, s), (a = i.onComplete) == null || a.call(i, o);
      }
    }));
  }
  _getRepeatCount(t) {
    return t.repeat != null ? t.repeat : t.loop === !0 ? 1 / 0 : typeof t.loop == "number" ? Math.max(0, t.loop) : 0;
  }
  add(...t) {
    var e;
    this._group.add(...t), (e = this._requestFrame) == null || e.call(this);
  }
  remove(...t) {
    this._group.remove(...t);
  }
  stop(t) {
    t.stop(), this._group.remove(t);
  }
  stopAll() {
    this._group.getAll().forEach((t) => t.stop()), this._group.removeAll();
  }
  update(t) {
    this._group.update(t);
  }
  hasActive() {
    return !this._group.allStopped();
  }
  _createElementTweenState(t, e) {
    var f, d, p, _, g, m, y;
    const i = {}, s = {}, r = this._getElementShape(t), o = this._getElementStyle(t), a = Object.keys(e.shape || {}), l = Object.keys(e.style || {}), c = ((f = e.position) == null ? void 0 : f.length) || 0, h = ((d = e.scale) == null ? void 0 : d.length) || 0, u = e.rotation != null;
    a.forEach((v) => {
      var w;
      const S = `shape.${v}`;
      i[S] = (w = r[v]) != null ? w : 0, s[S] = e.shape[v];
    }), l.forEach((v) => {
      var w;
      const S = `style.${v}`;
      i[S] = (w = o[v]) != null ? w : 0, s[S] = e.style[v];
    });
    for (let v = 0; v < c; v++) {
      const S = `position.${v}`;
      i[S] = (_ = (p = t.position) == null ? void 0 : p[v]) != null ? _ : 0, s[S] = e.position[v];
    }
    for (let v = 0; v < h; v++) {
      const S = `scale.${v}`;
      i[S] = (m = (g = t.scale) == null ? void 0 : g[v]) != null ? m : 1, s[S] = e.scale[v];
    }
    return u && (i.rotation = (y = t.rotation) != null ? y : 0, s.rotation = e.rotation), {
      current: i,
      to: s,
      shapeKeys: a,
      styleKeys: l,
      positionLength: c,
      scaleLength: h,
      hasRotation: u
    };
  }
  _applyElementTweenState(t, e, i) {
    if (i.shapeKeys.length) {
      const r = {};
      i.shapeKeys.forEach((o) => {
        r[o] = e[`shape.${o}`];
      }), this._setElementShape(t, r);
    }
    if (i.styleKeys.length) {
      const r = {};
      i.styleKeys.forEach((o) => {
        r[o] = e[`style.${o}`];
      }), this._setElementStyle(t, r);
    }
    const s = {};
    if (i.positionLength) {
      s.position = [];
      for (let r = 0; r < i.positionLength; r++)
        s.position[r] = e[`position.${r}`];
    }
    if (i.scaleLength) {
      s.scale = [];
      for (let r = 0; r < i.scaleLength; r++)
        s.scale[r] = e[`scale.${r}`];
    }
    i.hasRotation && (s.rotation = e.rotation), Object.keys(s).length && this._setElementAttrs(t, s);
  }
  _getElementShape(t) {
    return t.shape || {};
  }
  _getElementStyle(t) {
    return t.style || {};
  }
  _setElementShape(t, e) {
    t.setShape ? t.setShape(e) : t.shape = Y(Y({}, t.shape || {}), e);
  }
  _setElementStyle(t, e) {
    t.setStyle ? t.setStyle(e) : t.style = Y(Y({}, t.style || {}), e);
  }
  _setElementAttrs(t, e) {
    t.attr ? t.attr(e) : Object.assign(t, e);
  }
}
const Qd = 1e3, Jd = 1e4, HT = 3e4;
class GT {
  constructor(t) {
    this.socket = null, this.status = "idle", this.reconnectAttempts = 0, this.reconnectTimer = null, this.heartbeatTimer = null, this.manuallyClosed = !1, this.messageHandlers = /* @__PURE__ */ new Set(), this.rawMessageHandlers = /* @__PURE__ */ new Set(), this.statusHandlers = /* @__PURE__ */ new Set(), this.options = Y({
      reconnect: !0,
      reconnectDelay: Qd,
      maxReconnectDelay: Jd,
      heartbeatInterval: HT
    }, t);
  }
  connect() {
    if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING))
      return;
    this.manuallyClosed = !1, this.clearReconnectTimer(), this.setStatus(this.reconnectAttempts ? "reconnecting" : "connecting");
    const t = new WebSocket(this.options.url, this.options.protocols);
    this.socket = t, t.onopen = (e) => {
      this.reconnectAttempts = 0, this.setStatus("connected", e), this.startHeartbeat();
    }, t.onmessage = (e) => {
      this.rawMessageHandlers.forEach((s) => s(e.data));
      const i = this.parseMessage(e.data);
      i && this.messageHandlers.forEach((s) => {
        s(i);
      });
    }, t.onerror = (e) => {
      this.setStatus("error", e);
    }, t.onclose = (e) => {
      if (this.stopHeartbeat(), this.socket = null, this.manuallyClosed) {
        this.setStatus("closed", e);
        return;
      }
      this.shouldReconnect() ? this.scheduleReconnect() : this.setStatus("closed", e);
    };
  }
  close() {
    var t;
    this.manuallyClosed = !0, this.clearReconnectTimer(), this.stopHeartbeat(), (t = this.socket) == null || t.close(), this.socket = null, this.setStatus("closed");
  }
  send(t) {
    !this.socket || this.socket.readyState !== WebSocket.OPEN || this.socket.send(typeof t == "string" ? t : JSON.stringify(t));
  }
  getStatus() {
    return this.status;
  }
  onMessage(t) {
    return this.messageHandlers.add(t), () => {
      this.messageHandlers.delete(t);
    };
  }
  onRawMessage(t) {
    return this.rawMessageHandlers.add(t), () => {
      this.rawMessageHandlers.delete(t);
    };
  }
  onStatusChange(t) {
    return this.statusHandlers.add(t), () => {
      this.statusHandlers.delete(t);
    };
  }
  parseMessage(t) {
    if (typeof t != "string")
      return null;
    try {
      const e = JSON.parse(t), i = !!(e != null && e.type), s = (e == null ? void 0 : e.category) === "task" && !!(e != null && e.action);
      return i || s ? e : null;
    } catch (e) {
      return null;
    }
  }
  setStatus(t, e) {
    this.status !== t && (this.status = t, this.statusHandlers.forEach((i) => {
      i(t, e);
    }));
  }
  startHeartbeat() {
    this.stopHeartbeat(), this.options.heartbeatMessage && (this.heartbeatTimer = window.setInterval(() => {
      const t = typeof this.options.heartbeatMessage == "function" ? this.options.heartbeatMessage() : this.options.heartbeatMessage;
      this.send(t);
    }, this.options.heartbeatInterval));
  }
  stopHeartbeat() {
    this.heartbeatTimer != null && (window.clearInterval(this.heartbeatTimer), this.heartbeatTimer = null);
  }
  shouldReconnect() {
    if (!this.options.reconnect) return !1;
    const t = this.options.maxReconnectAttempts;
    return t == null || this.reconnectAttempts < t;
  }
  scheduleReconnect() {
    this.reconnectAttempts += 1, this.setStatus("reconnecting");
    const t = Math.min(
      (this.options.reconnectDelay || Qd) * this.reconnectAttempts,
      this.options.maxReconnectDelay || Jd
    );
    this.reconnectTimer = window.setTimeout(() => {
      this.connect();
    }, t);
  }
  clearReconnectTimer() {
    this.reconnectTimer != null && (window.clearTimeout(this.reconnectTimer), this.reconnectTimer = null);
  }
}
class YT {
  constructor() {
    this.handlers = /* @__PURE__ */ new Map(), this.wildcardHandlers = /* @__PURE__ */ new Set();
  }
  register(t, e) {
    const i = this.handlers.get(t) || /* @__PURE__ */ new Set();
    return i.add(e), this.handlers.set(t, i), () => {
      i.delete(e), i.size || this.handlers.delete(t);
    };
  }
  registerAll(t) {
    return this.wildcardHandlers.add(t), () => {
      this.wildcardHandlers.delete(t);
    };
  }
  dispatch(t) {
    var e;
    t != null && t.type && ((e = this.handlers.get(t.type)) == null || e.forEach((i) => {
      i(t);
    }), this.wildcardHandlers.forEach((i) => {
      i(t);
    }));
  }
  clear() {
    this.handlers.clear(), this.wildcardHandlers.clear();
  }
}
function WT(n, t, e) {
  return n.on(t, e);
}
function UT(n) {
  const t = new YT();
  return {
    client: n,
    router: t,
    on: (e, i) => t.register(e, i),
    dispose: () => {
      t.clear();
    }
  };
}
class VT {
  constructor() {
    this.runtime = null, this.configKey = "disabled";
  }
  configure(t) {
    const e = t || {}, i = e.enabled === !0 && !!e.url, s = i ? JSON.stringify(ln(Y({}, e), {
      heartbeatMessage: typeof e.heartbeatMessage == "function" ? "[function]" : e.heartbeatMessage
    })) : "disabled";
    if (s === this.configKey || (this.disposeRuntime(), this.configKey = s, !i)) return;
    const c = e, { enabled: r, url: o } = c, a = Zh(c, ["enabled", "url"]), l = new GT(Y({
      url: o
    }, a));
    this.runtime = UT(l), l.connect();
  }
  getRuntime() {
    return this.runtime;
  }
  dispose() {
    this.disposeRuntime(), this.configKey = "disabled";
  }
  disposeRuntime() {
    this.runtime && (this.runtime.dispose(), this.runtime.client.close(), this.runtime = null);
  }
}
const qT = /* @__PURE__ */ new Set(["task", "gateTask"]);
function XT(n) {
  if (!n || typeof n != "object")
    return null;
  const t = n;
  return typeof t.message != "string" && !t.category ? null : t;
}
function ZT(n) {
  var t;
  if (n.category)
    return [{
      category: n.category,
      action: n.action,
      type: n.action,
      data: n.data,
      taskIds: (t = n.data) == null ? void 0 : t.taskIds
    }];
  if (!n.message) return [];
  try {
    const e = JSON.parse(n.message);
    return Array.isArray(e) ? e : [e];
  } catch (e) {
    return [];
  }
}
function KT(n, t) {
  var s, r;
  if (!qT.has(n.category || ""))
    return null;
  const e = Array.isArray(n.taskIds) ? n.taskIds : ((s = n.data) == null ? void 0 : s.taskIds) || (((r = n.data) == null ? void 0 : r.taskId) != null ? [n.data.taskId] : []), i = JT(n);
  return !i || !e.length ? null : {
    type: "TASK_EVENT",
    traceId: t.messageId != null ? String(t.messageId) : void 0,
    timestamp: Date.now(),
    payload: {
      eventType: i,
      taskIds: e,
      category: n.category,
      action: n.action,
      businessType: n.businessType,
      reason: n.type,
      source: "ws",
      raw: n,
      envelope: t
    }
  };
}
function jT(n) {
  return ZT(n).map((t) => KT(t, n)).filter(Boolean);
}
function QT(n) {
  const t = XT(n);
  return t ? jT(t) : [];
}
function JT(n) {
  switch (n.type) {
    case "delete":
    case "remove":
    case "cancel":
      return "remove";
    case "update":
    case "updated":
      return "upsert";
    case "refresh":
    case "refreshAll":
    case "reload":
      return null;
    default:
      return null;
  }
}
function tM(n, t) {
  const e = t ? WT(n, "TASK_EVENT", t) : () => {
  }, i = n.client.onMessage((s) => {
    eM(n.client, s), QT(s).forEach((r) => {
      n.router.dispatch(r);
    });
  });
  return () => {
    i(), e();
  };
}
function eM(n, t) {
  var r;
  const e = t, i = (r = e.messageId) != null ? r : e.eventId;
  if (!e.needAck || i == null)
    return;
  const s = {
    type: "ack",
    messageId: i
  };
  n.send(s);
}
var tp;
window.moment = moment;
const Rt = "__flagInMainProcess", Qt = "__pendingUpdate", nM = [
  "click",
  "dblclick",
  "mouseover",
  "mouseout",
  "mousemove",
  "mousedown",
  "mouseup",
  "globalout",
  "contextmenu"
], ep = /^[a-zA-Z0-9_]+$/, N_ = {};
let iM = +/* @__PURE__ */ new Date() - 0;
const z_ = "_instance_", Al = "__needsUpdateStatus", sM = 1, rM = 2e3, oM = 3e3, aM = 4500, Xc = {}, $o = {}, B_ = [], $_ = [], np = [], ip = [];
let Zr, Ll, Kr, sp, rp, ss, op, ap, Pl, kl, jr, Qr, lp, ui, cp, Ol;
zrender.registerPainter("canvas", zT);
va.registerComponentModel(wo);
va.registerComponentView(Wl);
va.registerComponentModel(Ul);
Zt(pv);
Zt(Xx);
Zt(Gb);
uM("cartesian2d", _h);
Zt(r2);
Zt(P2);
Zt(U2);
Zt(K2);
Zt(J2);
Zt(sT);
fM(aM, vT);
class H_ extends er {
}
const G_ = H_.prototype;
G_.on = W_("on");
G_.off = W_("off");
function Y_(n) {
  return function(...t) {
    if (this.isDisposed()) {
      q_(this.id);
      return;
    }
    return U_(this, n, t);
  };
}
function W_(n) {
  return function(...t) {
    return U_(this, n, t);
  };
}
function U_(n, t, e) {
  return e[0] = e[0] && e[0].toLowerCase(), er.prototype[t].apply(n, e);
}
const Wh = class Wh extends (tp = er, tp) {
  constructor(t, e) {
    super(new uv()), this._componentsViews = [], this._componentsMap = {}, this._chartsViews = [], this._chartsViewsMap = {}, this._pendingActions = [], this._containerInstence = /* @__PURE__ */ new Map(), this._taskWsRuntime = null, this._disposeTaskWsHandlers = null, this._dom = t, e = e || {};
    let i = "canvas", s = "auto", r = !1;
    const o = this._zr = zrender.init(t, {
      renderer: (e == null ? void 0 : e.renderer) || i,
      devicePixelRatio: e.devicePixelRatio,
      width: e.width,
      height: e.height,
      ssr: e.ssr,
      useDirtyRect: ie(e.useDirtyRect, r),
      useCoarsePointer: ie(e.useCoarsePointer, s),
      pointerSize: e.pointerSize
    });
    this._ztween = new $T(() => o.wakeUp()), this._wsManager = new VT(), this._ssr = e.ssr, this._throttledZrFlush = bp(P(o.flush, o), 17);
    const a = this._api = lp(this);
    this._locale = e1(e.locale || qp), this._coordSysMgr = new Ws(), this._scheduler = new D_(this, a, B_, $_), this._messageCenter = new H_(), this._initEvents(), this.resize = P(this.resize, this), o.animation.on("frame", this._onframe, this), sp(o, this), rp(o, this);
  }
  _initEvents() {
    return or(this, null, function* () {
      D(nM, (t) => {
        const e = (i) => {
          let s;
          t === "globalout" && (s = {}), s && (s.event = i, s.type = t);
        };
        this._zr.on(t, e, this);
      }), D(Xc, (t, e) => {
        this._messageCenter.on(
          e,
          function(i) {
            this.trigger(e, i);
          },
          this
        );
      });
    });
  }
  resize(t) {
    this._zr.resize(t);
  }
  getModel() {
    return this._model;
  }
  getId() {
    return this.id;
  }
  getZr() {
    return this._zr;
  }
  getTweenManager() {
    return this._ztween;
  }
  getWidth() {
    return this._zr.getWidth();
  }
  getHeight() {
    return this._zr.getHeight();
  }
  getOption() {
    var t;
    return (t = this._model) == null ? void 0 : t.getOption();
  }
  /** 当前通用 WS 运行时，任务、资源排班等业务域均可注册消息处理器。 */
  getWsRuntime() {
    return this._wsManager.getRuntime();
  }
  syncTaskWsHandlers(t) {
    var i;
    const e = this._wsManager.getRuntime();
    e === this._taskWsRuntime && t === this._taskWsEventHandler || ((i = this._disposeTaskWsHandlers) == null || i.call(this), this._disposeTaskWsHandlers = null, this._taskWsRuntime = e, this._taskWsEventHandler = t, e && (this._disposeTaskWsHandlers = tM(e, t)));
  }
  getComponentViewMap() {
    return this._componentsViews;
  }
  refreshSeries(t, e) {
    this._model && (this._model.eachSeries((i) => {
      if (i.id !== t) return;
      const s = this._chartsViewsMap[i.__viewId];
      s && (i.dataTask.perform(), s._data = null, s.group.removeAll(), s.render(i, this._model, this._api, e));
    }), this._zr.refresh());
  }
  updateTaskItems(t) {
    var e;
    !this._model || !((e = t == null ? void 0 : t.affectedIds) != null && e.length) || (this._model.eachSeries((i) => {
      var r;
      if (i.id !== "assignedTasks") return;
      i.updateData(t.data, this._model), i.dataTask.perform();
      const s = this._chartsViewsMap[i.__viewId];
      (r = s == null ? void 0 : s.updateItems) == null || r.call(s, i, this._model, this._api, t.affectedIds);
    }), t.resourceData && this._model.eachSeries((i) => {
      var r, o;
      if (i.id !== "resourceRows" && i.id !== "resourceSchedule") return;
      (r = i.updateData) == null || r.call(i, t.resourceData, this._model), i.dataTask.perform();
      const s = this._chartsViewsMap[i.__viewId];
      (o = s == null ? void 0 : s.render) == null || o.call(s, i, this._model, this._api, { type: "updateTaskItems" });
    }), this._zr.refresh());
  }
  updateUnassignedTasks(t) {
    this._model && (this._model.eachComponent("unassignedBoard", (e) => {
      var s;
      if (e.id !== "unassignedBoard") return;
      e.option.data = t.data;
      const i = this._componentsMap[e.__viewId];
      (s = i == null ? void 0 : i.updateTasks) == null || s.call(i, t.data, t.affectedIds);
    }), this._zr.refresh());
  }
  getDevicePixelRatio() {
    return this._zr.painter.dpr || window.devicePixelRatio || 1;
  }
  getViewOfComponentModel(t) {
    return this._componentsMap[t.__viewId];
  }
  /**
   * Get view of corresponding series model
   */
  getViewOfSeriesModel(t) {
    return this._chartsViewsMap[t.__viewId];
  }
  isDisposed() {
    return this._disposed;
  }
  setOption(t, e, i) {
    if (this[Rt] || this._disposed)
      return;
    let s, r, o;
    if (O(e) && (i = e.lazyUpdate, r = e.silent, s = e.replaceMerge, o = e.transition, e = e.notMerge), this[Rt] = !0, !this._model) {
      const c = new fv(), h = this._model = new wo();
      h.scheduler = this._scheduler, h.init(null, null, null, this._locale, c);
    }
    this._model.setOption(t, { replaceMerge: s });
    const a = this._model.getOption().ws;
    this._wsManager.configure(a), this.syncTaskWsHandlers(a == null ? void 0 : a.onTaskEvent);
    const l = {
      seriesTransition: o,
      optionChanged: !0
    };
    if (i)
      this[Qt] = {
        silent: r,
        updateParams: l
      }, this[Rt] = !1, this.getZr().wakeUp();
    else {
      try {
        Zr(this), ss.update.call(this, null, l);
      } catch (c) {
        throw this[Qt] = null, this[Rt] = !1, c;
      }
      this._ssr || this._zr.flush(), this[Qt] = null, this[Rt] = !1, jr.call(this, r), Qr.call(this, r);
    }
  }
  /**
   * @param opt If pass boolean, means opt.silent
   * @param opt.silent Default `false`. Whether trigger events.
   * @param opt.flush Default `undefined`.
   *        true: Flush immediately, and then pixel in canvas can be fetched
   *            immediately. Caution: it might affect performance.
   *        false: Not flush.
   *        undefined: Auto decide whether perform flush.
   */
  dispatchAction(t, e) {
    if (this._disposed) {
      q_(this.id);
      return;
    }
    if (O(e) || (e = { silent: !!e }), !$o[t.type] || !this._model)
      return;
    if (this[Rt]) {
      this._pendingActions.push(t);
      return;
    }
    const i = e.silent;
    kl.call(this, t, i), e.flush && this._zr.flush(), jr.call(this, i), Qr.call(this, i);
  }
  _onframe() {
    this._ztween.update(), this._ztween.hasActive() && this._zr.wakeUp(), cp(this);
    const t = this._scheduler;
    if (this[Qt]) {
      const e = this[Qt].silent;
      this[Rt] = !0;
      try {
        Zr(this), ss.update.call(this, null, this[Qt].updateParams);
      } catch (i) {
        throw this[Rt] = !1, this[Qt] = null, i;
      }
      this._zr.flush(), this[Rt] = !1, this[Qt] = null, jr.call(this, e), Qr.call(this, e);
    } else if (t != null && t.unfinished) {
      let e = sM;
      const i = this._model, s = this._api;
      t.unfinished = !1;
      do {
        const r = +/* @__PURE__ */ new Date();
        t.performSeriesTasks(i), t.performDataProcessorTasks(i), Ol(this, i), t.performVisualTasks(i), Pl(this, this._model, s, "remain", {}), e -= +/* @__PURE__ */ new Date() - r;
      } while (e > 0 && t.unfinished);
      t.unfinished || this._zr.flush();
    }
  }
};
Wh.internalField = (function() {
  Zr = function(t) {
    const e = t._scheduler;
    e.restorePipelines(t._model), e.prepareStageTasks(), Ll(t, !0), Ll(t, !1), e.plan();
  }, Ll = function(t, e) {
    const i = t._model, s = e ? t._componentsViews : t._chartsViews, r = e ? t._componentsMap : t._chartsViewsMap, o = t._scheduler, a = t._zr, l = t._api;
    e ? i.eachComponent(function(h, u) {
      h !== "series" && c(u);
    }) : i.eachSeries(c);
    for (let h = 0; h < s.length; ) {
      const u = s[h];
      u.__alive ? h++ : (!e && u.renderTask.dispose(), a.remove(u.group), u.dispose(i, l), s.splice(h, 1), r[u.__id] === u && delete r[u.__id], u.__id = u.group.__ComponentInfo = null);
    }
    function c(h) {
      const u = h.__requireNewView;
      h.__requireNewView = !1;
      const f = "_pi_" + h.id + "_" + h.type;
      let d = !u && r[f];
      if (!d) {
        const p = Ne(h.type), _ = e ? Kt.getClass(
          p.main,
          p.sub
        ) : Ri.getClass(p.sub);
        d = new _(), d.init(i, l), r[f] = d, s.push(d), a.add(d.group);
      }
      h.__viewId = d.__id = f, d.__alive = !0, d.__model = h, d.group.__ComponentInfo = {
        mainType: h.mainType,
        index: h.componentIndex
      }, !e && o.prepareView(
        d,
        h,
        i,
        l
      );
    }
  }, Kr = function(t, e, i, s, r) {
    const o = t._model;
    if (o.setUpdatePayload(i), !s) {
      D(
        [].concat(t._componentsViews).concat(t._chartsViews),
        u
      );
      return;
    }
    const a = {};
    a[s + "Id"] = i[s + "Id"], a[s + "Index"] = i[s + "Index"], a[s + "Name"] = i[s + "Name"];
    const l = {
      mainType: s,
      query: a
    };
    r && (l.subType = r);
    const c = i.excludeSeriesId;
    let h;
    c != null && (h = F(), D(Vt(c), (f) => {
      const d = ze(f, null);
      d != null && h.set(d, !0);
    })), o && o.eachComponent(
      l,
      function(f) {
        if (!(h && h.get(f.id) != null))
          if (_d(i))
            if (f instanceof mo)
              i.type === ao && !i.notBlur && !f.get(["emphasis", "disabled"]) && _b(f, i, t._api);
            else {
              const { focusSelf: p, dispatchers: _ } = yb(
                f.mainType,
                f.componentIndex,
                i.name,
                t._api
              );
              i.type === ao && p && !i.notBlur && gb(
                f.mainType,
                f.componentIndex,
                t._api
              ), _ && D(_, (g) => {
                i.type === ao ? pd(g) : gd(g);
              });
            }
          else Sc(i) && f instanceof mo && (mb(f, i, t._api), vb(f), ui(t));
      },
      t
    ), o && o.eachComponent(
      l,
      function(f) {
        h && h.get(f.id) != null || u(
          t[s === "series" ? "_chartsMap" : "_componentsMap"][f.__viewId]
        );
      },
      t
    );
    function u(f) {
      f && f.__alive && f[e] && f[e](f.__model, o, t._api, i);
    }
  }, Ol = function(t, e) {
    const i = t._chartsViewsMap, s = t._scheduler;
    e.eachRawSeries(function(r) {
      s.updateStreamModes(
        r,
        i[r.__viewId]
      );
    });
  }, kl = function(t, e) {
    const i = this.getModel(), s = t.type, r = t.escapeConnect, o = $o[s], a = o.actionInfo, l = (a.update || "update").split(":"), c = l.pop(), h = l[0] != null && Ne(l[0]);
    this[Rt] = !0;
    let u = [t], f = !1;
    t.batch && (f = !0, u = H(
      t.batch,
      function(m) {
        return m = yt(N({}, m), t), m.batch = null, m;
      }
    ));
    const d = [];
    let p;
    const _ = Sc(t), g = _d(t);
    if (g && pb(this._api), D(u, (m) => {
      if (p = o.action(
        m,
        this._model,
        this._api
      ), p = p || N({}, m), p.type = a.event || p.type, d.push(p), g) {
        const { queryOptionMap: y, mainTypeSpecified: v } = om(t), S = v ? y.keys()[0] : "series";
        Kr(
          this,
          c,
          m,
          S
        ), ui(this);
      } else _ ? (Kr(this, c, m, "series"), ui(this)) : h && Kr(
        this,
        c,
        m,
        h.main,
        h.sub
      );
    }), c !== "none" && !g && !_ && !h)
      try {
        this[Qt] ? (Zr(this), ss.update.call(this, t), this[Qt] = null) : ss[c].call(
          this,
          t
        );
      } catch (m) {
        throw this[Rt] = !1, m;
      }
    if (f ? p = {
      type: a.event || s,
      escapeConnect: r,
      batch: d
    } : p = d[0], this[Rt] = !1, !e) {
      const m = this._messageCenter;
      if (m.trigger(p.type, p), _) {
        const y = {
          type: "selectchanged",
          escapeConnect: r,
          selected: xb(i),
          isFromClick: t.isFromClick || !1,
          fromAction: t.type,
          fromActionPayload: t
        };
        m.trigger(y.type, y);
      }
    }
  }, jr = function(t) {
    const e = this._pendingActions;
    for (; e.length; ) {
      const i = e.shift();
      kl.call(this, i, t);
    }
  }, Qr = function(t) {
    !t && this.trigger("updated");
  }, cp = function(t) {
    if (!t[Al])
      return;
    t.getZr().storage.traverse(function(i) {
      Ox(i) || e(i);
    }), t[Al] = !1;
    function e(i) {
      const s = [], r = i.currentStates;
      for (let o = 0; o < r.length; o++) {
        const a = r[o];
        a === "emphasis" || a === "blur" || a === "select" || s.push(a);
      }
      i.hoverState === Ih && i.states.emphasis ? s.push("emphasis") : i.hoverState === Dh && i.states.blur && s.push("blur"), i.useStates(s);
    }
  }, sp = function(t, e) {
    t.on("rendered", function(i) {
      e.trigger("rendered", i), // Although zr is dirty if initial animation is not finished
      // and this checking is called on frame, we also check
      // animation finished for robustness.
      t.animation.isFinished() && !e[Qt] && e.trigger("finished");
    });
  }, rp = function(t, e) {
  }, ss = {
    //TODO
    update(t, e) {
      const i = this._model;
      this._zr;
      const s = this._api, r = this._scheduler, o = this._coordSysMgr;
      i && (i.setUpdatePayload(t), r.restoreData(i, t), r.performSeriesTasks(i), o.create(i, s), r.performDataProcessorTasks(i, t), Ol(this, i), o.update(i, s), r.performVisualTasks(i, t), op(this, i, s, t, e));
    }
  }, op = (t, e, i, s, r) => {
    ap(t, e, i, s), D(t._chartsViews, function(o) {
      o.__alive = !1;
    }), Pl(t, e, i, s, r), D(t._chartsViews, function(o) {
      o.__alive || o.remove(e, i);
    }), D(t._componentsViews, function(o) {
      o.type === "split.slider" && o.render(o.__model, e, i, s);
    });
  }, ap = (t, e, i, s, r) => {
    D(
      r || t._componentsViews,
      function(o) {
        const a = o.__model;
        o.render(a, e, i, s);
      }
    );
  }, Pl = (t, e, i, s, r, o) => {
    const a = t._scheduler;
    let l = !1;
    e.eachSeries(function(c) {
      const h = t._chartsViewsMap[c.__viewId];
      h.__alive = !0;
      const u = h.renderTask;
      a.updatePayload(u, s), o && o.get(c.uid) && u.dirty(), u.perform(a.getPerformArgs(u)) && (l = !0);
    }), a.unfinished = l || a.unfinished;
  }, ui = function(t) {
    t[Al] = !0, t.getZr().wakeUp();
  }, lp = function(t) {
    return new class extends oT {
      getModel() {
        return t.getModel();
      }
      getViewOfComponentModel(e) {
        return t.getViewOfComponentModel(e);
      }
      getViewOfSeriesModel(e) {
        return t.getViewOfSeriesModel(e);
      }
      enterEmphasis(e, i) {
        pd(e, i), ui(t);
      }
      leaveEmphasis(e, i) {
        gd(e, i), ui(t);
      }
    }(t);
  };
})();
let Ho = Wh;
const V_ = Ho.prototype;
V_.on = Y_("on");
V_.off = Y_("off");
function q_(n) {
  gp("Instance " + n + " has been disposed");
}
function wM(n, t) {
  if (!n)
    throw new Error("Initialize failed: invalid dom.");
  const e = lM(n);
  if (e)
    return gp("There is a instance already initialized on the dom."), e;
  const i = new Ho(n);
  return i.id = "pi_" + iM++, N_[i.id] = i, V0(n, z_, i.id), i;
}
function lM(n) {
  return N_[q0(n, z_)];
}
function cM(n) {
  st(ip, n) < 0 && ip.push(n);
}
function hM(n, t) {
  X_(
    B_,
    n,
    t,
    rM
  );
}
function uM(n, t) {
  Ws.register(n, t);
}
function fM(n, t) {
  X_(
    $_,
    n,
    t,
    oM,
    "visual"
  );
}
function X_(n, t, e, i, s) {
  if ((Q(t) || O(t)) && (e = t, t = i), st(np, e) >= 0)
    return;
  np.push(e);
  const r = D_.wrapStageHandler(e, s);
  r.__prio = t, r.__raw = e, n.push(r);
}
function dM(n, t, e) {
  Q(t) && (e = t, t = "");
  const i = O(n) ? n.type : [
    n,
    n = {
      event: t
    }
  ][0];
  n.event = (n.event || i).toLowerCase(), t = n.event, !Xc[t] && (la(ep.test(i) && ep.test(t)), $o[i] || ($o[i] = {
    action: e,
    actionInfo: n
  }), Xc[t] = i);
}
export {
  Ho as default,
  lM as getInstanceByDom,
  wM as init,
  dM as registerAction,
  uM as registerCoordinateSystem,
  cM as registerPreprocessor,
  hM as registerProcessor
};
