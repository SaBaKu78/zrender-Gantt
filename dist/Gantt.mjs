var H_ = Object.defineProperty, G_ = Object.defineProperties;
var Y_ = Object.getOwnPropertyDescriptors;
var sr = Object.getOwnPropertySymbols;
var $h = Object.prototype.hasOwnProperty, Hh = Object.prototype.propertyIsEnumerable;
var Bh = (n, t, e) => t in n ? H_(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e, Y = (n, t) => {
  for (var e in t || (t = {}))
    $h.call(t, e) && Bh(n, e, t[e]);
  if (sr)
    for (var e of sr(t))
      Hh.call(t, e) && Bh(n, e, t[e]);
  return n;
}, on = (n, t) => G_(n, Y_(t));
var Gh = (n, t) => {
  var e = {};
  for (var i in n)
    $h.call(n, i) && t.indexOf(i) < 0 && (e[i] = n[i]);
  if (n != null && sr)
    for (var i of sr(n))
      t.indexOf(i) < 0 && Hh.call(n, i) && (e[i] = n[i]);
  return e;
};
var rr = (n, t, e) => new Promise((i, s) => {
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
const V_ = "sans-serif", Fs = `12px ${V_}`, W_ = 20, U_ = 100, q_ = "007LLmW'55;N0500LLLLLLLLLL00NNNLzWW\\\\WQb\\0FWLg\\bWb\\WQ\\WrWWQ000CL5LLFLL0LL**F*gLLLL5F0LF\\FFF5.5N";
function X_(n) {
  const t = {};
  if (typeof JSON == "undefined")
    return t;
  for (let e = 0; e < n.length; e++) {
    const i = String.fromCharCode(e + 32), s = (n.charCodeAt(e) - W_) / U_;
    t[i] = s;
  }
  return t;
}
const Z_ = X_(q_), Gc = {
  // Export methods
  createCanvas() {
    return typeof document != "undefined" && document.createElement("canvas");
  },
  measureText: /* @__PURE__ */ (function() {
    let n, t;
    return (e, i) => {
      if (!n) {
        const s = Gc.createCanvas();
        n = s && s.getContext("2d");
      }
      if (n)
        return t !== i && (t = n.font = i || Fs), n.measureText(e);
      {
        e = e || "", i = i || Fs;
        const s = /(\d+)px/.exec(i), r = s && +s[1] || 12;
        let o = 0;
        if (i.indexOf("mono") >= 0)
          o = r * e.length;
        else
          for (let a = 0; a < e.length; a++) {
            const l = Z_[e[a]];
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
}, ip = sa([
  "Function",
  "RegExp",
  "Date",
  "Error",
  "CanvasGradient",
  "CanvasPattern",
  // For node-canvas
  "Image",
  "Canvas"
], (n, t) => (n["[object " + t + "]"] = !0, n), {}), sp = sa([
  "Int8",
  "Uint8",
  "Uint8Clamped",
  "Int16",
  "Uint16",
  "Int32",
  "Uint32",
  "Float32",
  "Float64"
], (n, t) => (n["[object " + t + "Array]"] = !0, n), {}), ki = Object.prototype.toString, ia = Array.prototype, K_ = ia.forEach, j_ = ia.filter, Yc = ia.slice, Q_ = ia.map, Yh = function() {
}.constructor, or = Yh ? Yh.prototype : null, Vc = "__proto__";
let J_ = 2311;
function t0() {
  return J_++;
}
function rp(...n) {
  typeof console != "undefined" && console.error.apply(console, n);
}
function U(n) {
  if (n == null || typeof n != "object")
    return n;
  let t = n;
  const e = ki.call(n);
  if (e === "[object Array]") {
    if (!fs(n)) {
      t = [];
      for (let i = 0, s = n.length; i < s; i++)
        t[i] = U(n[i]);
    }
  } else if (sp[e]) {
    if (!fs(n)) {
      const i = n.constructor;
      if (i.from)
        t = i.from(n);
      else {
        t = new i(n.length);
        for (let s = 0, r = n.length; s < r; s++)
          t[s] = n[s];
      }
    }
  } else if (!ip[e] && !fs(n) && !Pl(n)) {
    t = {};
    for (let i in n)
      n.hasOwnProperty(i) && i !== Vc && (t[i] = U(n[i]));
  }
  return t;
}
function ut(n, t, e) {
  if (!k(t) || !k(n))
    return e ? U(t) : n;
  for (let i in t)
    if (t.hasOwnProperty(i) && i !== Vc) {
      const s = n[i], r = t[i];
      k(r) && k(s) && !K(r) && !K(s) && !Pl(r) && !Pl(s) && !Vh(r) && !Vh(s) && !fs(r) && !fs(s) ? ut(s, r, e) : (e || !(i in n)) && (n[i] = U(t[i]));
    }
  return n;
}
function N(n, t) {
  if (Object.assign)
    Object.assign(n, t);
  else
    for (let e in t)
      t.hasOwnProperty(e) && e !== Vc && (n[e] = t[e]);
  return n;
}
function yt(n, t, e) {
  const i = J(t);
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
function Wc(n, t, e) {
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
    if (n.forEach && n.forEach === K_)
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
    return Uc(n);
  if (n.map && n.map === Q_)
    return n.map(t, e);
  {
    const i = [];
    for (let s = 0, r = n.length; s < r; s++)
      i.push(t.call(e, n[s], s, n));
    return i;
  }
}
function sa(n, t, e, i) {
  if (n && t) {
    for (let s = 0, r = n.length; s < r; s++)
      e = t.call(i, e, n[s], s, n);
    return e;
  }
}
function ee(n, t, e) {
  if (!n)
    return [];
  if (!t)
    return Uc(n);
  if (n.filter && n.filter === j_)
    return n.filter(t, e);
  {
    const i = [];
    for (let s = 0, r = n.length; s < r; s++)
      t.call(e, n[s], s, n) && i.push(n[s]);
    return i;
  }
}
function J(n) {
  if (!n)
    return [];
  if (Object.keys)
    return Object.keys(n);
  let t = [];
  for (let e in n)
    n.hasOwnProperty(e) && t.push(e);
  return t;
}
function e0(n, t, ...e) {
  return function() {
    return n.apply(t, e.concat(Yc.call(arguments)));
  };
}
const P = or && Q(or.bind) ? or.call.bind(or.bind) : e0;
function lo(n, ...t) {
  return function() {
    return n.apply(this, t.concat(Yc.call(arguments)));
  };
}
function K(n) {
  return Array.isArray ? Array.isArray(n) : ki.call(n) === "[object Array]";
}
function Q(n) {
  return typeof n == "function";
}
function q(n) {
  return typeof n == "string";
}
function n0(n) {
  return ki.call(n) === "[object String]";
}
function xe(n) {
  return typeof n == "number";
}
function k(n) {
  const t = typeof n;
  return t === "function" || !!n && t === "object";
}
function Vh(n) {
  return !!ip[ki.call(n)];
}
function Ci(n) {
  return !!sp[ki.call(n)];
}
function Pl(n) {
  return typeof n == "object" && typeof n.nodeType == "number" && typeof n.ownerDocument == "object";
}
function op(n) {
  return n.colorStops != null;
}
function i0(n) {
  return ki.call(n) === "[object RegExp]";
}
function Ns(n) {
  return n !== n;
}
function Ll(...n) {
  for (let t = 0, e = n.length; t < e; t++)
    if (n[t] != null)
      return n[t];
}
function ne(n, t) {
  return n != null ? n : t;
}
function Uc(n, ...t) {
  return Yc.apply(n, t);
}
function s0(n) {
  if (typeof n == "number")
    return [n, n, n, n];
  const t = n.length;
  return t === 2 ? [n[0], n[1], n[0], n[1]] : t === 3 ? [n[0], n[1], n[2], n[1]] : n;
}
function ra(n, t) {
  if (!n)
    throw new Error(t);
}
function ss(n) {
  return n == null ? null : typeof n.trim == "function" ? n.trim() : n.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
}
const r0 = "__ec_primitive__";
function fs(n) {
  return n[r0];
}
class o0 {
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
    return J(this.data);
  }
  forEach(t) {
    const e = this.data;
    for (const i in e)
      e.hasOwnProperty(i) && t(e[i], i);
  }
}
const ap = typeof Map == "function";
function a0() {
  return ap ? /* @__PURE__ */ new Map() : new o0();
}
class qc {
  constructor(t) {
    const e = K(t);
    this.data = a0();
    const i = this;
    t instanceof qc ? t.each(s) : t && D(t, s);
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
    return ap ? Array.from(t) : t;
  }
  // Do not use this method if performance sensitive.
  removeKey(t) {
    this.data.delete(t);
  }
}
function O(n) {
  return new qc(n);
}
function l0(n, t) {
  const e = new n.constructor(n.length + t.length);
  for (let s = 0; s < n.length; s++)
    e[s] = n[s];
  const i = n.length;
  for (let s = 0; s < t.length; s++)
    e[s + i] = t[s];
  return e;
}
function oa(n, t) {
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
function be(n, t) {
  return n.hasOwnProperty(t);
}
function ba() {
}
const c0 = 180 / Math.PI, h0 = "[Gantt] ", u0 = typeof console != "undefined" && // eslint-disable-next-line
console.warn && console.log;
function f0(n, t, e) {
  u0 && console[n](h0 + t);
}
function lp(n, t) {
  f0("warn", n);
}
function d0(...n) {
  let t = "";
  if (__DEV__) {
    const e = (i) => i === void 0 ? "undefined" : i === 1 / 0 ? "Infinity" : i === -1 / 0 ? "-Infinity" : Ns(i) ? "NaN" : i instanceof Date ? "Date(" + i.toISOString() + ")" : Q(i) ? "function () { ... }" : i0(i) ? i + "" : null;
    t = H(n, (i) => {
      if (q(i))
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
function Qt(n) {
  throw new Error(n);
}
const Wh = 1e-4, p0 = 20;
function g0(n) {
  return n.replace(/^\s+|\s+$/g, "");
}
function _0() {
  return Math.round(Math.random() * 9);
}
const m0 = /^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d{1,2})(?::(\d{1,2})(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/;
function Wn(n) {
  if (n instanceof Date)
    return n;
  if (q(n)) {
    const t = m0.exec(n);
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
function cp(n) {
  if (n = +n, isNaN(n))
    return 0;
  if (n > 1e-14) {
    let t = 1;
    for (let e = 0; e < 15; e++, t *= 10)
      if (Math.round(n * t) / t === n)
        return e;
  }
  return y0(n);
}
function y0(n) {
  const t = n.toString().toLowerCase(), e = t.indexOf("e"), i = e > 0 ? +t.slice(e + 1) : 0, s = e > 0 ? e : t.length, r = t.indexOf("."), o = r < 0 ? 0 : s - 1 - r;
  return Math.max(0, o - i);
}
function hp(n, t) {
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
function up(n, t) {
  return t === 0 ? n : up(t, n % t);
}
function Uh(n, t) {
  return n == null ? t : t == null ? n : n * t / up(n, t);
}
function Kn(n, t) {
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
  return q(n) ? g0(n).match(/%$/) ? parseFloat(n) / 100 * t : parseFloat(n) : n == null ? NaN : +n;
}
function kl(n, t, e) {
  return t == null && (t = 10), t = Math.min(Math.max(0, t), p0), n = (+n).toFixed(t), e ? n : +n;
}
function v0(n) {
  if (n === 0)
    return 0;
  let t = Math.floor(Math.log(n) / Math.LN10);
  return n / Math.pow(10, t) >= 10 && t++, t;
}
function fp(n, t) {
  const e = v0(n), i = Math.pow(10, e), s = n / i;
  let r;
  return s < 1.5 ? r = 1 : s < 2.5 ? r = 2 : s < 4 ? r = 3 : s < 7 ? r = 5 : r = 10, n = r * i, e >= -20 ? +n.toFixed(e < 0 ? -e : 0) : n;
}
function w0(n) {
  const t = Math.PI * 2;
  return (n % t + t) % t;
}
function qh(n) {
  return n > -Wh && n < Wh;
}
function rs(n) {
  return n.sort(function(t, e) {
    return t - e;
  }), n;
}
function x0(n) {
  const t = parseFloat(n);
  return t == n && // eslint-disable-line eqeqeq
  (t !== 0 || !q(n) || n.indexOf("x") <= 0) ? t : NaN;
}
function S0(n) {
  return !isNaN(x0(n));
}
const b0 = 800, T0 = 1e3, M0 = 5e3, C0 = 1e3, D0 = 1100, I0 = 2e3, A0 = 3e3, E0 = 4e3, R0 = 4500, P0 = 4600, L0 = 5e3, k0 = 6e3, O0 = 7e3, F0 = {
  PROCESSOR: {
    FILTER: T0,
    SERIES_FILTER: b0,
    STATISTIC: M0
  },
  VISUAL: {
    LAYOUT: C0,
    PROGRESSIVE_LAYOUT: D0,
    GLOBAL: I0,
    CHART: A0,
    POST_CHART_LAYOUT: P0,
    COMPONENT: E0,
    BRUSH: L0,
    CHART_ITEM: R0,
    ARIA: k0,
    DECAL: O0
  }
}, dp = "series\0", N0 = "\0_pi_\0";
function z0(n, t, e) {
  n.setAttribute ? n.setAttribute(t, e) : n[t] = e;
}
function B0(n, t) {
  return n.getAttribute ? n.getAttribute(t) : n[t];
}
function Wt(n) {
  return n instanceof Array ? n : n == null ? [] : [n];
}
function ds(n) {
  return Fe(n, "");
}
function Fe(n, t) {
  return n == null ? t : q(n) ? n : xe(n) || n0(n) ? n + "" : t;
}
function pp(n, t) {
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
  const n = "__pi_inner_" + $0++;
  return function(t) {
    return t[n] || (t[n] = {});
  };
}
let $0 = _0();
function H0(n) {
  const t = n.name;
  return !!(t && t.indexOf(dp));
}
function zs(n) {
  return n && n.id != null && ds(n.id).indexOf(N0) === 0;
}
function G0(n, t, e) {
  const i = e === "normalMerge", s = e === "replaceMerge", r = e === "replaceAll";
  n = n || [], t = (t || []).slice();
  const o = O();
  D(t, function(l, c) {
    if (!k(l)) {
      t[c] = null;
      return;
    }
  });
  const a = Y0(n, o, e);
  return (i || s) && V0(a, n, o, t), i && W0(a, t), i || s ? U0(a, t, s) : r && q0(a, t), X0(a), a;
}
function Y0(n, t, e) {
  const i = [];
  if (e === "replaceAll")
    return i;
  for (let s = 0; s < n.length; s++) {
    const r = n[s];
    r && r.id != null && t.set(r.id, s), i.push({
      existing: e === "replaceMerge" || zs(r) ? null : r,
      newOption: null,
      keyInfo: null,
      brandNew: null
    });
  }
  return i;
}
function V0(n, t, e, i) {
  D(i, function(s, r) {
    if (!s || s.id == null)
      return;
    const o = ds(s.id), a = e.get(o);
    if (a != null) {
      const l = n[a];
      ra(
        !l.newOption,
        'Duplicated option on id "' + o + '".'
      ), l.newOption = s, l.existing = t[a], i[r] = null;
    }
  });
}
function W0(n, t) {
  D(t, function(e, i) {
    if (!(!e || e.name == null))
      for (let s = 0; s < n.length; s++) {
        const r = n[s].existing;
        if (!n[s].newOption && // Consider name: two map to one.
        // Can not match when both ids existing but different.
        r && (r.id == null || e.id == null) && !zs(e) && !zs(r) && gp("name", r, e)) {
          n[s].newOption = e, t[i] = null;
          return;
        }
      }
  });
}
function U0(n, t, e) {
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
      (s.newOption || zs(s.existing) || // In mode "replaceMerge", here no not-mapped-non-internal-existing.
      s.existing && i.id != null && !gp("id", i, s.existing));
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
function q0(n, t) {
  D(t, function(e) {
    n.push({
      newOption: e,
      brandNew: !0,
      existing: null,
      keyInfo: null
    });
  });
}
function X0(n) {
  const t = O();
  D(n, function(e) {
    const i = e.existing;
    i && t.set(i.id, e);
  }), D(n, function(e) {
    const i = e.newOption;
    ra(
      !i || i.id == null || !t.get(i.id) || t.get(i.id) === e,
      "id duplicates: " + (i && i.id)
    ), i && i.id != null && t.set(i.id, e), !e.keyInfo && (e.keyInfo = {});
  }), D(n, function(e, i) {
    const s = e.existing, r = e.newOption, o = e.keyInfo;
    if (k(r)) {
      if (o.name = r.name != null ? ds(r.name) : s ? s.name : (
        // Avoid that different series has the same name,
        // because name may be used like in color pallet.
        dp + i
      ), s)
        o.id = ds(s.id);
      else if (r.id != null)
        o.id = ds(r.id);
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
function gp(n, t, e) {
  const i = Fe(t[n], null), s = Fe(e[n], null);
  return i != null && s != null && i === s;
}
function Z0(n, t, e) {
  D(n, function(i) {
    const s = i.newOption;
    k(s) && (i.keyInfo.mainType = t, i.keyInfo.subType = K0(
      t,
      s,
      i.existing,
      e
    ));
  });
}
function K0(n, t, e, i) {
  return t.type ? t.type : e ? e.subType : (
    // Use determineSubType only when there is no existComponent.
    i.determineSubType(
      n,
      t
    )
  );
}
const Te = {
  useDefault: !0,
  enableAll: !1,
  enableNone: !1
}, j0 = {
  useDefault: !1,
  enableAll: !0,
  enableNone: !0
};
function Xc(n, t, e, i) {
  i = i || Te;
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
function Q0(n, t) {
  let e;
  if (q(n)) {
    const o = {};
    o[n + "Index"] = 0, e = o;
  } else
    e = n;
  const i = O(), s = {};
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
function aa(n) {
  return k(n) && !K(n) && !(n instanceof Date) ? n.value : n;
}
function J0(n) {
  return k(n) && !(n instanceof Array);
}
const co = "\0__throttleOriginMethod", Xh = "\0__throttleRate", Zh = "\0__throttleType";
function _p(n, t, e) {
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
function mp(n, t, e, i) {
  let s = n[t];
  if (!s)
    return;
  const r = s[co] || s, o = s[Zh];
  if (s[Xh] !== e || o !== i) {
    if (e == null || !i)
      return n[t] = r;
    s = n[t] = _p(r, e, i === "debounce"), s[co] = r, s[Zh] = i, s[Xh] = e;
  }
  return s;
}
function tm(n, t) {
  const e = n[t];
  e && e[co] && (e.clear && e.clear(), n[t] = e[co]);
}
let tr = class {
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
const em = ".", nm = "___PI__EXTENDED_CLASS___", an = "___PI__COMPONENT__CONTAINER___";
function im(n) {
  ra(
    /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(n),
    'componentType "' + n + '" illegal'
  );
}
function sm(n) {
  return !!(n && n[nm]);
}
function Oe(n) {
  const t = { main: "", sub: "" };
  if (n) {
    const e = n.split(em);
    t.main = e[0] || "", t.sub = e[1] || "";
  }
  return t;
}
function la(n) {
  const t = {};
  n.registerClass = function(i) {
    const s = i.type || i.prototype.type;
    if (s) {
      im(s), i.prototype.type = s;
      const r = Oe(s);
      if (!r.sub)
        t[r.main] && console.warn(r.main + " exists."), t[r.main] = i;
      else if (r.sub !== an) {
        const o = e(r);
        o[r.sub] = i;
      }
    }
    return i;
  }, n.getClass = function(i, s, r) {
    let o = t[i];
    return o && o[an] && (o = s ? o[s] : null), o;
  }, n.getAllClassMainTypes = function() {
    const i = [];
    return D(t, function(s, r) {
      i.push(r);
    }), i;
  }, n.getClassesByMainType = function(i) {
    const s = Oe(i), r = [], o = t[s.main];
    return o && o[an] ? D(o, function(a, l) {
      l !== an && r.push(a);
    }) : r.push(o), r;
  }, n.hasClass = function(i) {
    const s = Oe(i);
    return !!t[s.main];
  }, n.hasSubTypes = function(i) {
    const s = Oe(i), r = t[s.main];
    return r && r[an];
  };
  function e(i) {
    let s = t[i.main];
    return (!s || !s[an]) && (s = t[i.main] = {}, s[an] = !0), s;
  }
}
let rm = Math.round(Math.random() * 10);
function ca(n) {
  return [n || "", rm++].join("_");
}
function om(n) {
  const t = {};
  n.registerSubTypeDefaulter = function(e, i) {
    const s = Oe(e);
    t[s.main] = i;
  }, n.determineSubType = function(e, i) {
    let s = i.type;
    if (!s) {
      const r = Oe(e).main;
      n.hasSubTypes(e) && t[r] && (s = t[r](i));
    }
    return s;
  };
}
function am(n, t) {
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
      throw _ = d0(
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
function Zc(n, t) {
  return ut(ut({}, n, !0), t, !0);
}
class Zt {
  constructor() {
    this.group = new zrender.Group(), this.uid = ca("viewComponent");
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
la(Zt);
let lm = class {
  constructor() {
    this.firefox = !1, this.ie = !1, this.edge = !1, this.newEdge = !1, this.weChat = !1;
  }
}, cm = class {
  constructor() {
    this.browser = new lm(), this.node = !1, this.wxa = !1, this.worker = !1, this.svgSupported = !1, this.touchEventsSupported = !1, this.pointerEventsSupported = !1, this.domSupported = !1, this.transformSupported = !1, this.transform3dSupported = !1, this.hasGlobalWindow = typeof window != "undefined";
  }
};
const Jt = new cm();
typeof wx == "object" && typeof wx.getSystemInfoSync == "function" ? (Jt.wxa = !0, Jt.touchEventsSupported = !0) : typeof document == "undefined" && typeof self != "undefined" ? Jt.worker = !0 : typeof navigator == "undefined" ? (Jt.node = !0, Jt.svgSupported = !0) : hm(navigator.userAgent, Jt);
function hm(n, t) {
  const e = t.browser, i = n.match(/Firefox\/([\d.]+)/), s = n.match(/MSIE\s([\d.]+)/) || n.match(/Trident\/.+?rv:(([\d.]+))/), r = n.match(/Edge?\/([\d.]+)/), o = /micromessenger/i.test(n);
  i && (e.firefox = !0, e.version = i[1]), s && (e.ie = !0, e.version = s[1]), r && (e.edge = !0, e.version = r[1], e.newEdge = +r[1].split(".")[0] > 18), o && (e.weChat = !0), t.svgSupported = typeof SVGRect != "undefined", t.touchEventsSupported = "ontouchstart" in window && !e.ie && !e.edge, t.pointerEventsSupported = "onpointerdown" in window && (e.edge || e.ie && +e.version >= 11), t.domSupported = typeof document != "undefined";
  const a = document.documentElement.style;
  t.transform3dSupported = // IE9 only supports transform 2D
  // transform 3D supported since IE10
  // we detect it by whether 'transition' is in style
  (e.ie && "transition" in a || e.edge || "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix() || "MozPerspective" in a) && !("OTransition" in a), t.transformSupported = t.transform3dSupported || e.ie && +e.version >= 9;
}
var yp = 12, um = "sans-serif", Bs = yp + "px " + um, fm = 20, dm = 100, pm = "007LLmW'55;N0500LLLLLLLLLL00NNNLzWW\\\\WQb\\0FWLg\\bWb\\WQ\\WrWWQ000CL5LLFLL0LL**F*gLLLL5F0LF\\FFF5.5N";
function gm(n) {
  var t = {};
  if (typeof JSON == "undefined")
    return t;
  for (var e = 0; e < n.length; e++) {
    var i = String.fromCharCode(e + 32), s = (n.charCodeAt(e) - fm) / dm;
    t[i] = s;
  }
  return t;
}
var _m = gm(pm), er = {
  createCanvas: function() {
    return typeof document != "undefined" && document.createElement("canvas");
  },
  measureText: /* @__PURE__ */ (function() {
    var n, t;
    return function(e, i) {
      if (!n) {
        var s = er.createCanvas();
        n = s && s.getContext("2d");
      }
      if (n)
        return t !== i && (t = n.font = i || Bs), n.measureText(e);
      e = e || "", i = i || Bs;
      var r = /(\d+)px/.exec(i), o = r && +r[1] || yp, a = 0;
      if (i.indexOf("mono") >= 0)
        a = o * e.length;
      else
        for (var l = 0; l < e.length; l++) {
          var c = _m[e[l]];
          a += c == null ? o : c * o;
        }
      return { width: a };
    };
  })(),
  loadImage: function(n, t, e) {
    var i = new Image();
    return i.onload = t, i.onerror = e, i.src = n, i;
  }
}, vp = Qc([
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
}, {}), wp = Qc([
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
}, {}), ha = Object.prototype.toString, ua = Array.prototype, mm = ua.forEach, ym = ua.filter, xp = ua.slice, vm = ua.map, Kh = function() {
}.constructor, ar = Kh ? Kh.prototype : null, Kc = "__proto__", wm = 2311;
function xm() {
  return wm++;
}
function jc() {
  for (var n = [], t = 0; t < arguments.length; t++)
    n[t] = arguments[t];
  typeof console != "undefined" && console.error.apply(console, n);
}
function Di(n) {
  if (n == null || typeof n != "object")
    return n;
  var t = n, e = ha.call(n);
  if (e === "[object Array]") {
    if (!ps(n)) {
      t = [];
      for (var i = 0, s = n.length; i < s; i++)
        t[i] = Di(n[i]);
    }
  } else if (wp[e]) {
    if (!ps(n)) {
      var r = n.constructor;
      if (r.from)
        t = r.from(n);
      else {
        t = new r(n.length);
        for (var i = 0, s = n.length; i < s; i++)
          t[i] = n[i];
      }
    }
  } else if (!vp[e] && !ps(n) && !Fl(n)) {
    t = {};
    for (var o in n)
      n.hasOwnProperty(o) && o !== Kc && (t[o] = Di(n[o]));
  }
  return t;
}
function Ze(n, t, e) {
  if (!ie(t) || !ie(n))
    return e ? Di(t) : n;
  for (var i in t)
    if (t.hasOwnProperty(i) && i !== Kc) {
      var s = n[i], r = t[i];
      ie(r) && ie(s) && !Ii(r) && !Ii(s) && !Fl(r) && !Fl(s) && !jh(r) && !jh(s) && !ps(r) && !ps(s) ? Ze(s, r, e) : (e || !(i in n)) && (n[i] = Di(t[i]));
    }
  return n;
}
function E(n, t) {
  if (Object.assign)
    Object.assign(n, t);
  else
    for (var e in t)
      t.hasOwnProperty(e) && e !== Kc && (n[e] = t[e]);
  return n;
}
function Ce(n, t, e) {
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
function Oi(n, t, e) {
  if (n = "prototype" in n ? n.prototype : n, t = "prototype" in t ? t.prototype : t, Object.getOwnPropertyNames)
    for (var i = Object.getOwnPropertyNames(t), s = 0; s < i.length; s++) {
      var r = i[s];
      r !== "constructor" && n[r] == null && (n[r] = t[r]);
    }
  else
    Ce(n, t);
}
function qt(n) {
  return !n || typeof n == "string" ? !1 : typeof n.length == "number";
}
function et(n, t, e) {
  if (n && t)
    if (n.forEach && n.forEach === mm)
      n.forEach(t, e);
    else if (n.length === +n.length)
      for (var i = 0, s = n.length; i < s; i++)
        t.call(e, n[i], i, n);
    else
      for (var r in n)
        n.hasOwnProperty(r) && t.call(e, n[r], r, n);
}
function re(n, t, e) {
  if (!n)
    return [];
  if (!t)
    return Sp(n);
  if (n.map && n.map === vm)
    return n.map(t, e);
  for (var i = [], s = 0, r = n.length; s < r; s++)
    i.push(t.call(e, n[s], s, n));
  return i;
}
function Qc(n, t, e, i) {
  if (n && t) {
    for (var s = 0, r = n.length; s < r; s++)
      e = t.call(i, e, n[s], s, n);
    return e;
  }
}
function ho(n, t, e) {
  if (!n)
    return [];
  if (!t)
    return Sp(n);
  if (n.filter && n.filter === ym)
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
function Sm(n, t) {
  for (var e = [], i = 2; i < arguments.length; i++)
    e[i - 2] = arguments[i];
  return function() {
    return n.apply(t, e.concat(xp.call(arguments)));
  };
}
var Ol = ar && Un(ar.bind) ? ar.call.bind(ar.bind) : Sm;
function Ii(n) {
  return Array.isArray ? Array.isArray(n) : ha.call(n) === "[object Array]";
}
function Un(n) {
  return typeof n == "function";
}
function Ut(n) {
  return typeof n == "string";
}
function se(n) {
  return typeof n == "number";
}
function ie(n) {
  var t = typeof n;
  return t === "function" || !!n && t === "object";
}
function jh(n) {
  return !!vp[ha.call(n)];
}
function bm(n) {
  return !!wp[ha.call(n)];
}
function Fl(n) {
  return typeof n == "object" && typeof n.nodeType == "number" && typeof n.ownerDocument == "object";
}
function fa(n) {
  return n.colorStops != null;
}
function Tm(n) {
  return n.image != null;
}
function Mm(n) {
  return n !== n;
}
function Nl(n, t) {
  return n != null ? n : t;
}
function Sp(n) {
  for (var t = [], e = 1; e < arguments.length; e++)
    t[e - 1] = arguments[e];
  return xp.apply(n, t);
}
function lr(n) {
  return n == null ? null : typeof n.trim == "function" ? n.trim() : n.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
}
var Cm = "__ec_primitive__";
function ps(n) {
  return n[Cm];
}
function da(n, t) {
  var e;
  if (Object.create)
    e = Object.create(n);
  else {
    var i = function() {
    };
    i.prototype = n, e = new i();
  }
  return t && E(e, t), e;
}
function bp(n) {
  var t = n.style;
  t.webkitUserSelect = "none", t.userSelect = "none", t.webkitTapHighlightColor = "rgba(0,0,0,0)", t["-webkit-touch-callout"] = "none";
}
function cr(n, t) {
  return n.hasOwnProperty(t);
}
function Ta() {
}
var Dm = 180 / Math.PI;
function Jc(n, t) {
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
const Im = [
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
], Am = Jc(Im);
class Em {
  getLineStyle(t) {
    return Am(this, t);
  }
}
const th = {}, Qh = [
  "fontStyle",
  "fontWeight",
  "fontSize",
  "fontFamily",
  "textShadowColor",
  "textShadowBlur",
  "textShadowOffsetX",
  "textShadowOffsetY"
], Jh = [
  "align",
  "lineHeight",
  "width",
  "height",
  "tag",
  "verticalAlign",
  "ellipsis"
], tu = [
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
function Tp(n, t, e, i, s) {
  const r = {};
  return Rm(r, n, e, i, s), t && N(r, t), r;
}
function Rm(n, t, e, i, s) {
  e = e || th;
  const r = t.piModel, o = r && r.option.textStyle, a = Pm(t);
  let l;
  if (a) {
    l = {};
    for (const u in a)
      if (a.hasOwnProperty(u)) {
        const f = t.getModel(["rich", u]);
        eu(
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
  h != null && (n.margin = h), eu(
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
function eu(n, t, e, i, s, r, o, a) {
  e = e || th;
  const l = i && i.inheritColor;
  let c = t.getShallow("color"), h = t.getShallow("textBorderColor"), u = ne(
    t.getShallow("opacity"),
    e.opacity
  );
  (c === "inherit" || c === "auto") && (l ? c = l : c = null), (h === "inherit" || h === "auto") && (l ? h = l : h = null), c = c || e.color, h = h || e.textBorderColor, c != null && (n.fill = c), h != null && (n.stroke = h);
  const f = ne(
    t.getShallow("textBorderWidth"),
    e.textBorderWidth
  );
  f != null && (n.lineWidth = f);
  const d = ne(
    t.getShallow("textBorderType"),
    e.textBorderType
  );
  d != null && (n.lineDash = d);
  const p = ne(
    t.getShallow("textBorderDashOffset"),
    e.textBorderDashOffset
  );
  p != null && (n.lineDashOffset = p), u == null && !a && (u = i && i.defaultOpacity), u != null && (n.opacity = u), n.fill == null && i.inheritColor && (n.fill = i.inheritColor);
  for (let _ = 0; _ < Qh.length; _++) {
    const g = Qh[_], m = ne(t.getShallow(g), e[g]);
    m != null && (n[g] = m);
  }
  for (let _ = 0; _ < Jh.length; _++) {
    const g = Jh[_], m = t.getShallow(g);
    m != null && (n[g] = m);
  }
  if (n.verticalAlign == null) {
    const _ = t.getShallow("baseline");
    _ != null && (n.verticalAlign = _);
  }
  if (!o || !i.disableBox) {
    for (let g = 0; g < tu.length; g++) {
      const m = tu[g], y = t.getShallow(m);
      y != null && (n[m] = y);
    }
    const _ = t.getShallow("borderType");
    _ != null && (n.borderDash = _), (n.backgroundColor === "auto" || n.backgroundColor === "inherit") && l && (n.backgroundColor = l), (n.borderColor === "auto" || n.borderColor === "inherit") && l && (n.borderColor = l);
  }
}
function Pm(n) {
  let t;
  for (; n && n !== n.piModel; ) {
    const e = (n.option || th).rich;
    if (e) {
      t = t || {};
      const i = J(e);
      for (let s = 0; s < i.length; s++) {
        const r = i[s];
        t[r] = 1;
      }
    }
    n = n.parentModel;
  }
  return t;
}
function Lm(n, t) {
  const e = t && t.getModel("textStyle");
  return ss(
    [
      // FIXME in node-canvas fontWeight is before fontStyle
      n.fontStyle || e && e.getShallow("fontStyle") || "",
      n.fontWeight || e && e.getShallow("fontWeight") || "",
      (n.fontSize || e && e.getShallow("fontSize") || 12) + "px",
      n.fontFamily || e && e.getShallow("fontFamily") || "sans-serif"
    ].join(" ")
  );
}
const km = ["textStyle", "color"];
class Om {
  getTextColor(t) {
    const e = this.piModel;
    return this.getShallow("color") || (!t && e ? e.get(km) : null);
  }
  getFont() {
    return Lm(
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
const Fm = [
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
], Nm = Jc(Fm);
class zm {
  getItemStyle(t, e) {
    return Nm(this, t, e);
  }
}
const Bm = [
  ["fill", "color"],
  ["shadowBlur"],
  ["shadowOffsetX"],
  ["shadowOffsetY"],
  ["opacity"],
  ["shadowColor"]
  // Option decal is in `DecalObject` but style.decal is in `PatternObject`.
  // So do not transfer decal directly.
], $m = Jc(Bm);
class Hm {
  getAreaStyle(t, e) {
    return $m(this, t, e);
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
    if (!Jt.node && this.option) {
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
Oi(Dt, Em);
Oi(Dt, Om);
Oi(Dt, zm);
Oi(Dt, Hm);
function uo() {
  return [1, 0, 0, 1, 0, 0];
}
function Mp(n) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 1, n[4] = 0, n[5] = 0, n;
}
function Gm(n, t) {
  return n[0] = t[0], n[1] = t[1], n[2] = t[2], n[3] = t[3], n[4] = t[4], n[5] = t[5], n;
}
function gs(n, t, e) {
  const i = t[0] * e[0] + t[2] * e[1], s = t[1] * e[0] + t[3] * e[1], r = t[0] * e[2] + t[2] * e[3], o = t[1] * e[2] + t[3] * e[3], a = t[0] * e[4] + t[2] * e[5] + t[4], l = t[1] * e[4] + t[3] * e[5] + t[5];
  return n[0] = i, n[1] = s, n[2] = r, n[3] = o, n[4] = a, n[5] = l, n;
}
function nu(n, t, e) {
  return n[0] = t[0], n[1] = t[1], n[2] = t[2], n[3] = t[3], n[4] = t[4] + e[0], n[5] = t[5] + e[1], n;
}
function Cp(n, t, e) {
  const i = t[0], s = t[2], r = t[4], o = t[1], a = t[3], l = t[5], c = Math.sin(e), h = Math.cos(e);
  return n[0] = i * h + o * c, n[1] = -i * c + o * h, n[2] = s * h + a * c, n[3] = -s * c + h * a, n[4] = h * r + c * l, n[5] = h * l - c * r, n;
}
function Ym(n, t, e) {
  const i = e[0], s = e[1];
  return n[0] = t[0] * i, n[1] = t[1] * s, n[2] = t[2] * i, n[3] = t[3] * s, n[4] = t[4] * i, n[5] = t[5] * s, n;
}
function Vm(n, t) {
  const e = t[0], i = t[2], s = t[4], r = t[1], o = t[3], a = t[5];
  let l = e * o - r * i;
  return l ? (l = 1 / l, n[0] = o * l, n[1] = -r * l, n[2] = -i * l, n[3] = e * l, n[4] = (i * a - o * s) * l, n[5] = (r * s - e * a) * l, n) : null;
}
let at = class Dp {
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
    return new Dp(this.x, this.y);
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
const hr = Math.min, ur = Math.max, ln = new at(), cn = new at(), hn = new at(), un = new at(), Gi = new at(), Yi = new at();
let Mt = class Ue {
  constructor(t, e, i, s) {
    i < 0 && (t = t + i, i = -i), s < 0 && (e = e + s, s = -s), this.x = t, this.y = e, this.width = i, this.height = s;
  }
  union(t) {
    const e = hr(t.x, this.x), i = hr(t.y, this.y);
    isFinite(this.x) && isFinite(this.width) ? this.width = ur(
      t.x + t.width,
      this.x + this.width
    ) - e : this.width = t.width, isFinite(this.y) && isFinite(this.height) ? this.height = ur(
      t.y + t.height,
      this.y + this.height
    ) - i : this.height = t.height, this.x = e, this.y = i;
  }
  applyTransform(t) {
    Ue.applyTransform(this, this, t);
  }
  calculateTransform(t) {
    const e = this, i = t.width / e.width, s = t.height / e.height, r = uo();
    return nu(r, r, [-e.x, -e.y]), Ym(r, r, [i, s]), nu(r, r, [t.x, t.y]), r;
  }
  intersect(t, e) {
    if (!t)
      return !1;
    t instanceof Ue || (t = Ue.create(t));
    const i = this, s = i.x, r = i.x + i.width, o = i.y, a = i.y + i.height, l = t.x, c = t.x + t.width, h = t.y, u = t.y + t.height;
    let f = !(r < l || c < s || a < h || u < o);
    if (e) {
      let d = 1 / 0, p = 0;
      const _ = Math.abs(r - l), g = Math.abs(c - s), m = Math.abs(a - h), y = Math.abs(u - o), v = Math.min(_, g), S = Math.min(m, y);
      r < l || c < s ? v > p && (p = v, _ < g ? at.set(Yi, -_, 0) : at.set(Yi, g, 0)) : v < d && (d = v, _ < g ? at.set(Gi, _, 0) : at.set(Gi, -g, 0)), a < h || u < o ? S > p && (p = S, m < y ? at.set(Yi, 0, -m) : at.set(Yi, 0, y)) : v < d && (d = v, m < y ? at.set(Gi, 0, m) : at.set(Gi, 0, -y));
    }
    return e && at.copy(e, f ? Gi : Yi), f;
  }
  contain(t, e) {
    const i = this;
    return t >= i.x && t <= i.x + i.width && e >= i.y && e <= i.y + i.height;
  }
  clone() {
    return new Ue(this.x, this.y, this.width, this.height);
  }
  /**
   * Copy from another rect
   */
  copy(t) {
    Ue.copy(this, t);
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
    return new Ue(t.x, t.y, t.width, t.height);
  }
  static copy(t, e) {
    t.x = e.x, t.y = e.y, t.width = e.width, t.height = e.height;
  }
  static applyTransform(t, e, i) {
    if (!i) {
      t !== e && Ue.copy(t, e);
      return;
    }
    if (i[1] < 1e-5 && i[1] > -1e-5 && i[2] < 1e-5 && i[2] > -1e-5) {
      const o = i[0], a = i[3], l = i[4], c = i[5];
      t.x = e.x * o + l, t.y = e.y * a + c, t.width = e.width * o, t.height = e.height * a, t.width < 0 && (t.x += t.width, t.width = -t.width), t.height < 0 && (t.y += t.height, t.height = -t.height);
      return;
    }
    ln.x = hn.x = e.x, ln.y = un.y = e.y, cn.x = un.x = e.x + e.width, cn.y = hn.y = e.y + e.height, ln.transform(i), un.transform(i), cn.transform(i), hn.transform(i), t.x = hr(ln.x, cn.x, hn.x, un.x), t.y = hr(ln.y, cn.y, hn.y, un.y);
    const s = ur(ln.x, cn.x, hn.x, un.x), r = ur(ln.y, cn.y, hn.y, un.y);
    t.width = s - t.x, t.height = r - t.y;
  }
};
const Wm = s0;
function Um(n) {
  if (!S0(n))
    return q(n) ? n : "-";
  const t = (n + "").split(".");
  return t[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") + (t.length > 1 ? "." + t[1] : "");
}
const qm = [
  "left",
  "right",
  "top",
  "bottom",
  "width",
  "height"
], fr = [
  ["width", "left", "right"],
  ["height", "top", "bottom"]
];
function Ip(n) {
  const t = n.layoutMode || n.constructor.layoutMode;
  return k(t) ? t : t ? { type: t } : null;
}
function $s(n) {
  return Xm({}, n);
}
function Xm(n, t) {
  return t && n && et(qm, function(e) {
    t.hasOwnProperty(e) && (n[e] = t[e]);
  }), n;
}
function Ap(n, t, e) {
  let i = e && e.ignoreSize;
  !K(i) && (i = [i, i]);
  const s = o(fr[0], 0), r = o(fr[1], 1);
  c(fr[0], n, s), c(fr[1], n, r);
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
function Hs(n, t, e) {
  e = Wm(e || 0);
  const i = t.width, s = t.height;
  let r = Kn(n.left, i), o = Kn(n.top, s);
  const a = Kn(n.right, i), l = Kn(n.bottom, s);
  let c = Kn(n.width, i), h = Kn(n.height, s);
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
const Zm = ft();
class W extends Dt {
  constructor(t, e, i) {
    super(t, e, i), this.uid = ca("pi_cpt_model");
  }
  init(t, e, i) {
    this.mergeDefaultAndTheme(t, i);
  }
  mergeDefaultAndTheme(t, e) {
    ut(t, this.getDefaultOption());
  }
  mergeOption(t, e) {
    ut(this.option, t, !0);
    const i = Ip(this);
    i && Ap(
      this.option,
      t,
      i
    );
  }
  optionUpdated(t, e) {
  }
  getDefaultOption() {
    const t = this.constructor;
    if (!sm(t))
      return t.defaultOption;
    const e = Zm(this);
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
    return Xc(
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
la(W);
om(
  W
);
am(
  W,
  Km
);
function Km(n) {
  let t = [];
  return D(
    W.getClassesByMainType(
      n
    ),
    function(e) {
      t = t.concat(
        e.dependencies || e.prototype.dependencies || []
      );
    }
  ), t = H(t, function(e) {
    return Oe(e).main;
  }), n !== "dataset" && st(t, "dataset") <= 0 && t.unshift("dataset"), t;
}
function _s(n) {
  return new jm(n);
}
class jm {
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
    iu.reset(e, i, s, r), this._callingProgress = t, this._callingProgress(
      {
        start: e,
        end: i,
        count: i - e,
        next: iu.next
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
const iu = /* @__PURE__ */ (function() {
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
})(), Ep = O(["tooltip", "label", "itemName", "itemId", "itemGroupId", "seriesName"]), Qm = "undefined", Jm = typeof Int32Array === Qm ? Array : Int32Array, oe = "original", vt = "arrayRows", De = "objectRows", ze = "keyedColumns", Qe = "typedArray", Rp = "unknown", Ne = "column", Fi = "row", xt = {
  Must: 1,
  // Encounter string but not '-' and not number-like.
  Might: 2,
  // Encounter string but number-like.
  Not: 3
  // Other cases
}, t1 = ft();
function Pp(n) {
  if (!n.get("data", !0))
    return Xc(
      n.piModel,
      "dataset",
      {
        index: n.get("datasetIndex", !0),
        id: n.get("datasetId", !0)
      },
      Te
    ).models[0];
}
function e1(n) {
  return !n.get("transform", !0) && !n.get("fromTransformResult", !0) ? [] : Xc(
    n.piModel,
    "dataset",
    {
      index: n.get("fromDatasetIndex", !0),
      id: n.get("fromDatasetId", !0)
    },
    Te
  ).models;
}
function Lp(n, t) {
  return n1(
    n.data,
    n.sourceFormat,
    n.seriesLayoutBy,
    n.dimensionsDefine,
    n.startIndex,
    t
  );
}
function n1(n, t, e, i, s, r) {
  let o;
  if (Ci(n))
    return xt.Not;
  let l, c;
  if (i) {
    const u = i[r];
    k(u) ? (l = u.name, c = u.type) : q(u) && (l = u);
  }
  if (c != null)
    return c === "ordinal" ? xt.Must : xt.Not;
  if (t === vt) {
    const u = n;
    if (e === Fi) {
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
  } else if (t === De) {
    const u = n;
    if (!l)
      return xt.Not;
    for (let f = 0; f < u.length && f < 5; f++) {
      const d = u[f];
      if (d && (o = h(d[l])) != null)
        return o;
    }
  } else if (t === ze) {
    const u = n;
    if (!l)
      return xt.Not;
    const f = u[l];
    if (!f || Ci(f))
      return xt.Not;
    for (let d = 0; d < f.length && d < 5; d++)
      if ((o = h(f[d])) != null)
        return o;
  } else if (t === oe) {
    const u = n;
    for (let f = 0; f < u.length && f < 5; f++) {
      const d = u[f], p = aa(d);
      if (!K(p))
        return xt.Not;
      if ((o = h(p[r])) != null)
        return o;
    }
  }
  function h(u) {
    const f = q(u);
    if (u != null && isFinite(u) && u !== "")
      return f ? xt.Might : xt.Not;
    if (f && u !== "-")
      return xt.Must;
  }
  return xt.Not;
}
function i1(n, t, e) {
  const i = {}, s = Pp(t);
  if (!s || !n)
    return i;
  const r = [], o = [], a = t.piModel, l = t1(a).datasetMap, c = s.uid + "_" + e.seriesLayoutBy;
  let h, u;
  n = n.slice(), et(n, function(_, g) {
    const m = k(_) ? _ : n[g] = {
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
class pa {
  constructor(t) {
    this.data = t.data || (t.sourceFormat === ze ? {} : []), this.sourceFormat = t.sourceFormat || Rp, this.seriesLayoutBy = t.seriesLayoutBy || Ne, this.startIndex = t.startIndex || 0, this.dimensionsDetectedCount = t.dimensionsDetectedCount, this.metaRawOption = t.metaRawOption;
    const e = this.dimensionsDefine = t.dimensionsDefine;
    if (e)
      for (let i = 0; i < e.length; i++) {
        const s = e[i];
        s.type == null && Lp(this, i) === xt.Must && (s.type = "ordinal");
      }
  }
}
function eh(n) {
  return n instanceof pa;
}
function zl(n, t, e) {
  e = e || Op(n);
  const i = t.seriesLayoutBy, s = r1(
    n,
    e,
    i,
    t.sourceHeader,
    t.dimensions
  );
  return new pa({
    data: n,
    sourceFormat: e,
    seriesLayoutBy: i,
    dimensionsDefine: s.dimensionsDefine,
    startIndex: s.startIndex,
    dimensionsDetectedCount: s.dimensionsDetectedCount,
    metaRawOption: U(t)
  });
}
function kp(n) {
  return new pa({
    data: n,
    sourceFormat: Ci(n) ? Qe : oe
  });
}
function s1(n) {
  return new pa({
    data: n.data,
    sourceFormat: n.sourceFormat,
    seriesLayoutBy: n.seriesLayoutBy,
    dimensionsDefine: U(n.dimensionsDefine),
    startIndex: n.startIndex,
    dimensionsDetectedCount: n.dimensionsDetectedCount
  });
}
function Op(n) {
  let t = Rp;
  if (Ci(n))
    t = Qe;
  else if (K(n)) {
    n.length === 0 && (t = vt);
    for (let e = 0, i = n.length; e < i; e++) {
      const s = n[e];
      if (s != null) {
        if (K(s)) {
          t = vt;
          break;
        } else if (k(s)) {
          t = De;
          break;
        }
      }
    }
  } else if (k(n)) {
    for (const e in n)
      if (be(n, e) && Ct(n[e])) {
        t = ze;
        break;
      }
  }
  return t;
}
function r1(n, t, e, i, s) {
  let r, o;
  if (!n)
    return {
      dimensionsDefine: su(s),
      startIndex: o,
      dimensionsDetectedCount: r
    };
  if (t === vt) {
    const a = n;
    i === "auto" || i == null ? ru(
      function(l) {
        l != null && l !== "-" && (q(l) ? o == null && (o = 1) : o = 0);
      },
      e,
      a,
      10
    ) : o = xe(i) ? i : i ? 1 : 0, !s && o === 1 && (s = [], ru(
      function(l, c) {
        s[c] = l != null ? l + "" : "";
      },
      e,
      a,
      1 / 0
    )), r = s ? s.length : e === Fi ? a.length : a[0] ? a[0].length : null;
  } else if (t === De)
    s || (s = o1(
      n
    ));
  else if (t === ze)
    s || (s = [], D(n, function(a, l) {
      s.push(l);
    }));
  else if (t === oe) {
    const a = aa(n[0]);
    r = K(a) && a.length || 1;
  }
  return {
    startIndex: o,
    dimensionsDefine: su(s),
    dimensionsDetectedCount: r
  };
}
function o1(n) {
  let t = 0, e;
  for (; t < n.length && !(e = n[t++]); )
    ;
  if (e)
    return J(e);
}
function su(n) {
  if (!n)
    return;
  const t = O();
  return H(n, function(e, i) {
    e = k(e) ? e : { name: e };
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
function ru(n, t, e, i) {
  if (t === Fi)
    for (let s = 0; s < e.length && s < i; s++)
      n(e[s] ? e[s][0] : null, s);
  else {
    const s = e[0] || [];
    for (let r = 0; r < s.length && r < i; r++)
      n(s[r], r);
  }
}
function a1(n) {
  const t = n.sourceFormat;
  return t === De || t === ze;
}
const ou = function(n, t, e, i) {
  return n[i];
}, l1 = {
  [vt + "_" + Ne]: function(n, t, e, i) {
    return n[i + t];
  },
  [vt + "_" + Fi]: function(n, t, e, i, s) {
    i += t;
    const r = s || [], o = n;
    for (let a = 0; a < o.length; a++) {
      const l = o[a];
      r[a] = l ? l[i] : null;
    }
    return r;
  },
  [De]: ou,
  [ze]: function(n, t, e, i, s) {
    const r = s || [];
    for (let o = 0; o < e.length; o++) {
      const a = e[o].name, l = n[a];
      r[o] = l ? l[i] : null;
    }
    return r;
  },
  [oe]: ou
};
function nh(n, t) {
  return n === vt ? n + "_" + t : n;
}
function Fp(n, t) {
  return l1[nh(n, t)];
}
function Np(n, t) {
  return c1[nh(n, t)];
}
const au = function(n, t, e) {
  return n.length;
}, c1 = {
  [vt + "_" + Ne]: function(n, t, e) {
    return Math.max(0, n.length - t);
  },
  [vt + "_" + Fi]: function(n, t, e) {
    const i = n[0];
    return i ? Math.max(0, i.length - t) : 0;
  },
  [De]: au,
  [ze]: function(n, t, e) {
    const i = e[0].name, s = n[i];
    return s ? s.length : 0;
  },
  [oe]: au
}, Ma = function(n, t, e) {
  return n[t];
}, h1 = {
  [vt]: Ma,
  [De]: function(n, t, e) {
    return n[e];
  },
  [ze]: Ma,
  [oe]: function(n, t, e) {
    const i = aa(n);
    return i instanceof Array ? i[t] : i;
  },
  [Qe]: Ma
};
function u1(n) {
  return h1[n];
}
let lu, cu;
const Ah = class Ah {
  constructor(t, e) {
    const i = eh(t) ? t : kp(t);
    this._source = i;
    const s = this._data = i.data;
    i.sourceFormat === Qe && (this._offset = 0, this._dimSize = e, this._data = s), cu(this, s, i);
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
Ah.internalField = (function() {
  cu = function(r, o, a) {
    const l = a.sourceFormat, c = a.seriesLayoutBy, h = a.startIndex, u = a.dimensionsDefine, f = lu[nh(l, c)];
    if (E(r, f), l === Qe)
      r.getItem = t, r.count = i, r.fillStorage = e;
    else {
      const d = Fp(
        l,
        c
      );
      r.getItem = Ol(d, null, o, h, u);
      const p = Np(l, c);
      r.count = Ol(p, null, o, h, u);
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
  lu = {
    [vt + "_" + Ne]: {
      pure: !0,
      appendData: s
    },
    [vt + "_" + Fi]: {
      pure: !0,
      appendData: function() {
        throw new Error(
          'Do not support appendData when set seriesLayoutBy: "row".'
        );
      }
    },
    [De]: {
      pure: !0,
      appendData: s
    },
    [ze]: {
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
    [oe]: {
      appendData: s
    },
    [Qe]: {
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
let fo = Ah;
function jr(n, t) {
  const e = t && t.type;
  return e === "ordinal" ? n : (e === "time" && // spead up when using timestamp
  !xe(n) && n != null && n !== "-" && (n = +Wn(n)), n == null || n === "" ? NaN : (
    // If string (like '-'), using '+' parse to NaN
    // If object, also parse to NaN
    +n
  ));
}
class f1 {
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
    return jr(t, e);
  }
}
function d1(n, t) {
  const e = new f1(), i = n.data, s = e.sourceFormat = n.sourceFormat, r = n.startIndex;
  n.seriesLayoutBy !== Ne && Qt("");
  const a = [], l = {}, c = n.dimensionsDefine;
  if (c)
    D(c, function(p, _) {
      const g = p.name, m = {
        index: _,
        name: g,
        displayName: p.displayName
      };
      a.push(m), g != null && (be(l, g) && Qt(""), l[g] = m);
    });
  else
    for (let p = 0; p < n.dimensionsDetectedCount; p++)
      a.push({ index: p });
  const h = Fp(s, Ne);
  t.__isBuiltIn && (e.getRawDataItem = function(p) {
    return h(i, r, a, p);
  }, e.getRawData = P(p1, null, n)), e.cloneRawData = P(g1, null, n);
  const u = Np(s, Ne);
  e.count = P(u, null, i, r, a);
  const f = u1(s);
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
  return e.getDimensionInfo = P(_1, null, a, l), e.cloneAllDimensionInfo = P(m1, null, a), e;
}
function p1(n) {
  const t = n.sourceFormat;
  return ih(t) || Qt(""), n.data;
}
function g1(n) {
  const t = n.sourceFormat, e = n.data;
  if (ih(t) || Qt(""), t === vt) {
    const i = [];
    for (let s = 0, r = e.length; s < r; s++)
      i.push(e[s].slice());
    return i;
  } else if (t === De) {
    const i = [];
    for (let s = 0, r = e.length; s < r; s++)
      i.push(N({}, e[s]));
    return i;
  }
}
function _1(n, t, e) {
  if (e != null) {
    if (xe(e) || !isNaN(e) && !be(t, e))
      return n[e];
    if (be(t, e))
      return t[e];
  }
}
function m1(n) {
  return U(n);
}
const y1 = O();
function v1(n, t, e) {
  const i = Wt(n), s = i.length;
  s || Qt("");
  for (let o = 0, a = s; o < a; o++) {
    const l = i[o];
    t = w1(l, t), o !== a - 1 && (t.length = Math.max(t.length, 1));
  }
  return t;
}
function w1(n, t, e, i) {
  let s = "";
  t.length || Qt(s), k(n) || Qt(s);
  const r = n.type, o = y1.get(r);
  o || Qt(s);
  const a = H(t, (c) => d1(c, o)), l = Wt(
    o.transform({
      upstream: a[0],
      upstreamList: a,
      config: U(n.config)
    })
  );
  return H(l, function(c, h) {
    let u = "";
    k(c) || Qt(u), c.data || Qt(u);
    const f = Op(c.data);
    ih(f) || Qt(u);
    let d;
    const p = t[0];
    if (p && h === 0 && !c.dimensions) {
      const _ = p.startIndex;
      _ && (c.data = p.data.slice(0, _).concat(c.data)), d = {
        seriesLayoutBy: Ne,
        sourceHeader: _,
        dimensions: p.metaRawOption.dimensions
      };
    } else
      d = {
        seriesLayoutBy: Ne,
        sourceHeader: 0,
        dimensions: c.dimensions
      };
    return zl(
      c.data,
      d,
      null
    );
  });
}
function ih(n) {
  return n === vt || n === De;
}
const ga = "undefined", x1 = typeof Uint32Array === ga ? Array : Uint32Array, S1 = typeof Uint16Array === ga ? Array : Uint16Array, b1 = typeof Int32Array === ga ? Array : Int32Array, hu = typeof Float64Array === ga ? Array : Float64Array, zp = {
  float: hu,
  int: b1,
  // Ordinal data type can be string or int
  ordinal: Array,
  number: Array,
  time: hu
};
let uu;
class Gs {
  constructor() {
    this._chunks = [], this._count = 0, this._rawCount = 0, this._rawExtent = [], this._extent = [], this._calcDimNameToIdx = O(), this.internalField = (function() {
      function t(e, i, s, r) {
        return jr(e[r], this._dimensions[r]);
      }
      uu = {
        arrayRows: t,
        objectRows(e, i, s, r) {
          return jr(e[i], this._dimensions[r]);
        },
        keyedColumns: t,
        original(e, i, s, r) {
          const o = e && (e.value == null ? e : e.value);
          return jr(
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
    const s = t.getSource(), r = this.defaultDimValueGetter = uu[s.sourceFormat];
    this._dimValueGetter = i || r, this._rawExtent = [], a1(s), this._dimensions = H(e, (o) => ({
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
      l[h] || (l[h] = Vi()), M1(r, h, u.type, e, i);
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
    return s[r] = { type: e }, i.set(t, r), this._chunks[r] = new zp[e || "float"](this._rawCount), this._rawExtent[r] = Vi(), r;
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
    const i = new Gs(), s = this._chunks, r = t && sa(
      t,
      (o, a) => (o[a] = !0, o),
      {}
    );
    if (r)
      for (let o = 0; o < s.length; o++)
        i._chunks[o] = r[o] ? T1(s[o]) : s[o];
    else
      i._chunks = s;
    return this._copyCommonProps(i), e || (i._indices = this._cloneIndices()), i._updateGetRawIdx(), i;
  }
  _copyCommonProps(t) {
    t._count = this._count, t._rawCount = this._rawCount, t._provider = this._provider, t._dimensions = this._dimensions, t._extent = U(this._extent), t._rawExtent = U(this._rawExtent);
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
      const i = Ca(this._rawCount);
      t = new i(this.count());
      for (let s = 0; s < t.length; s++)
        t[s] = s;
    }
    return t;
  }
  filter(t, e) {
    if (!this._count)
      return this;
    const i = this.clone(), s = i.count(), r = Ca(i._rawCount), o = new r(s), a = [], l = t.length;
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
    const s = J(t), r = s.length;
    if (!r)
      return this;
    const o = e.count(), a = Ca(e._rawCount), l = new a(o);
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
          const x = g[S], w = m[S];
          (x >= u && x <= f || isNaN(x)) && (w >= y && w <= v || isNaN(w)) && (l[c++] = _), _++;
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
function T1(n) {
  const t = n.constructor;
  return t === Array ? n.slice() : new t(n);
}
function M1(n, t, e, i, s) {
  const r = zp[e || "float"];
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
function Ca(n) {
  return n > 65535 ? x1 : S1;
}
function Vi() {
  return [1 / 0, -1 / 0];
}
class C1 {
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
    if (dr(t)) {
      const o = t;
      let a, l, c;
      if (i) {
        const g = e[0];
        g.prepareSource(), c = g.getSource(), a = c.data, l = c.sourceFormat, r = [g._getVersionSign()];
      } else
        a = o.get("data", !0), l = Ci(a) ? Qe : oe, this._upstreamSignList = [];
      const h = this._getSourceMetaRawOption() || {}, u = c && c.metaRawOption || {}, f = ne(
        h.seriesLayoutBy,
        u.seriesLayoutBy
      ) || null, d = ne(
        h.sourceHeader,
        u.sourceHeader
      ), p = ne(
        h.dimensions,
        u.dimensions
      );
      s = f !== u.seriesLayoutBy || !!d != !!u.sourceHeader || p ? [
        zl(
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
          zl(a, this._getSourceMetaRawOption(), null)
        ], r = [];
      }
    }
    this._setLocalSource(s, r);
  }
  _applyTransform(t) {
    const e = this._sourceHost, i = e.get("transform", !0), s = e.get("fromTransformResult", !0);
    s != null && t.length !== 1 && fu("");
    let r;
    const o = [], a = [];
    return D(t, (l) => {
      l.prepareSource();
      const c = l.getSource(s || 0);
      s != null && !c && fu(""), o.push(c), a.push(l._getVersionSign());
    }), i ? r = v1(i, o, {
      datasetIndex: e.componentIndex
    }) : s != null && (r = [s1(o[0])]), { sourceList: r, upstreamSignList: a };
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
      dr(this._sourceHost) && l ? a = l._innerGetDataStore(
        t,
        e,
        i
      ) : (a = new Gs(), a.initData(
        new fo(e, t.length),
        t
      )), o[i] = a;
    }
    return a;
  }
  _getUpstreamSourceManagers() {
    const t = this._sourceHost;
    if (dr(t)) {
      const e = Pp(t);
      return e ? [e.getSourceManager()] : [];
    } else
      return H(
        e1(t),
        (e) => e.getSourceManager()
      );
  }
  _getSourceMetaRawOption() {
    var r;
    const t = this._sourceHost;
    let e, i, s;
    if (dr(t))
      e = t.get("seriesLayoutBy", !0), i = t.get("sourceHeader", !0), s = t.get("dimensions", !0);
    else if (!((r = this._getUpstreamSourceManagers()) != null && r.length)) {
      const o = t;
      e = o.get("seriesLayoutBy", !0), i = o.get("sourceHeader", !0), s = o.get("dimensions", !0);
    }
    return { seriesLayoutBy: e, sourceHeader: i, dimensions: s };
  }
}
function dr(n) {
  return n.mainType === "series";
}
function fu(n) {
  throw new Error(n);
}
var du;
const Ie = ft();
function Da(n, t) {
  return n.getName(t) || n.getId(t);
}
const D1 = "__universalTransitionEnabled";
class po extends (du = W, du) {
  constructor() {
    super(...arguments), this._selectedDataIndicesMap = {};
  }
  init(t, e, i) {
    this.seriesIndex = this.componentIndex, this.dataTask = _s({
      count: I1,
      reset: A1
    }), this.dataTask.context = { model: this }, this.mergeDefault(t, i);
    const s = Ie(this).sourceManager = new C1(this);
    s == null || s.prepareSource();
    const r = this.getInitialData(t, i);
    pu(r, this), this.dataTask.context.data = r, Ie(this).dataBeforeProcessed = r, R1(this), this._initSelectedMapFromData(r);
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
    const i = Ie(this).sourceManager;
    i && (i._dirty = !0, i.prepareSource());
    const s = this.getInitialData(this.option, e);
    pu(s, this), this.dataTask.context.data = s, Ie(this).dataBeforeProcessed = s, Ie(this).data = s, (r = this.dataTask) == null || r.dirty();
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
    const t = this._selectedDataIndicesMap, e = J(t), i = [];
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
    return (i === "all" || i[Da(s, t)]) && !s.getItemModel(t).get(["select", "disabled"]);
  }
  _innerSelect(t, e) {
    const i = this.option, s = i.selectedMode, r = e.length;
    if (!(!s || !r)) {
      if (s === "series")
        i.selectedMap = "all";
      else if (s === "multiple") {
        k(i.selectedMap) || (i.selectedMap = {});
        const o = i.selectedMap;
        for (let a = 0; a < r; a++) {
          const l = e[a], c = Da(t, l);
          o[c] = !0, this._selectedDataIndicesMap[c] = t.getRawIndex(l);
        }
      } else if (s === "single" || s === !0) {
        const o = e[r - 1], a = Da(t, o);
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
    const e = Bl(this);
    if (e) {
      const i = e.context;
      i.outputData = t, e !== this.dataTask && (i.data = t);
    }
    Ie(this).data = t;
  }
  getData(t) {
    const e = Bl(this);
    if (e) {
      const i = e.context.data;
      return t == null ? i : i.getLinkedData(t);
    } else
      return Ie(this).data;
  }
  /**
   * 初始化data数据结构
   * 需要被重写
   */
  getInitialData(t, e) {
  }
  getRawData() {
    return Ie(this).dataBeforeProcessed;
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
      return O(t);
  }
  getSourceManager() {
    return Ie(this).sourceManager;
  }
  getBaseAxis() {
    const t = this.coordinateSystem;
    return t && t.getBaseAxis && t.getBaseAxis();
  }
  restoreData() {
    this.dataTask.dirty();
  }
  isUniversalTransitionEnabled() {
    if (this[D1])
      return !0;
    const t = this.option.universalTransition;
    return t ? t === !0 ? !0 : t && t.enabled : !1;
  }
}
function I1(n) {
  return n.model.getRawData().count();
}
function A1(n) {
  const t = n.model;
  return t.setData(t.getRawData().cloneShallow()), E1;
}
function E1(n, t) {
  t.outputData && n.end > t.outputData.count() && t.model.getRawData().cloneShallow(t.outputData);
}
function Bl(n) {
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
function pu(n, t) {
  D(
    l0(n.CHANGABLE_METHODS, n.DOWNSAMPLE_METHODS),
    function(e) {
      n.wrapMethod(
        e,
        lo(L1, t)
      );
    }
  );
}
function R1(n) {
  const t = n.name;
  H0(n) || (n.name = P1(n) || t);
}
function P1(n) {
  const t = n.getRawData(), e = t.mapDimensionsAll("seriesName"), i = [];
  return D(e, function(s) {
    const r = t.getDimensionInfo(s);
    r.displayName && i.push(r.displayName);
  }), i.join(" ");
}
function L1(n, t) {
  const e = Bl(n);
  return e && e.setOutputEnd((t || this).count()), t;
}
function k1() {
  const n = ft();
  return function(t) {
    const e = n(t), i = t.pipelineContext, s = !!e.large, r = !!e.progressiveRender, o = e.large = !!(i && i.large), a = e.progressiveRender = !!(i && i.progressiveRender);
    return (s !== o || r !== a) && "reset";
  };
}
const O1 = k1(), F1 = ft(), Bo = class Bo {
  constructor() {
    this.group = new zrender.Group(), this.uid = ca("viewChart"), this.renderTask = _s({
      plan: N1,
      reset: z1
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
Bo.protoInitialize = (function() {
  const t = Bo.prototype;
  t.type = "chart";
})();
let Ai = Bo;
function N1(n) {
  return O1(n.model);
}
function z1(n) {
  var c;
  const t = n.model, e = n.piModel, i = n.api, s = n.payload, r = (c = t == null ? void 0 : t.pipelineContext) == null ? void 0 : c.progressiveRender, o = n.view, a = s && F1(s).updateMethod, l = r ? "incrementalPrepareRender" : a && o[a] ? a : "render";
  return l !== "render" && o[l](t, e, i, s), B1[l];
}
const B1 = {
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
la(Ai);
const gu = [], _a = {
  registerProcessor: aM,
  registerPreprocessor: oM,
  registerAction: hM,
  PRIORITY: F0,
  registerComponentView(n) {
    Zt.registerClass(n);
  },
  registerComponentModel(n) {
    W.registerClass(n);
  },
  registerSeriesModel(n) {
    po.registerClass(n);
  },
  registerChartView(n) {
    Ai.registerClass(n);
  },
  registerSubTypeDefaulter(n, t) {
    W.registerSubTypeDefaulter(n, t);
  }
};
function Xt(n) {
  if (K(n)) {
    D(n, (t) => {
      Xt(t);
    });
    return;
  }
  st(gu, n) >= 0 || (gu.push(n), Q(n) && (n = {
    install: n
  }), n.install(_a));
}
const Eh = class Eh extends Zt {
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
      const u = r.toGlobalCoord(r.dataToCoord(o + h)), f = r.toGlobalCoord(r.dataToCoord(o + h + 1)), d = Math.min(u, f), p = Math.abs(f - u), _ = h % 2 === 0 ? "#FFFFFF" : "#F7F8FA";
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
          stroke: "#EDF1F5",
          lineWidth: 1
        },
        z2: 0,
        silent: !0
      });
      this._horizontalLines.push(p), this.group.add(p);
    }
  }
};
Eh.type = "grid";
let $l = Eh;
const Ia = {}, $o = class $o {
  constructor() {
    this._coordinateSystems = [];
  }
  create(t, e) {
    let i = [];
    D(Ia, function(s, r) {
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
$o.register = function(t, e) {
  Ia[t] = e;
}, $o.get = function(t) {
  return Ia[t];
};
let Ys = $o;
class nr {
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
la(nr);
function $1(n, t) {
  return t[1] === t[0] ? 0.5 : (n - t[0]) / (t[1] - t[0]);
}
function H1(n) {
  return n.type === "interval";
}
function _u(n, t, e, i) {
  const s = {}, r = n[1] - n[0];
  let o = s.interval = fp(r / t);
  e != null && o < e && (o = s.interval = e), i != null && o > i && (o = s.interval = i);
  const a = s.intervalPrecision = Bp(o), l = s.niceTickExtent = [
    kl(Math.ceil(n[0] / o) * o, a),
    kl(Math.floor(n[1] / o) * o, a)
  ];
  return G1(l, n), s;
}
function G1(n, t) {
  !isFinite(n[0]) && (n[0] = t[0]), !isFinite(n[1]) && (n[1] = t[1]), mu(n, 0, t), mu(n, 1, t), n[0] > n[1] && (n[0] = n[1]);
}
function Bp(n) {
  return cp(n) + 2;
}
function mu(n, t, e) {
  n[t] = Math.max(Math.min(n[t], e[1]), e[0]);
}
const jn = kl, Rh = class Rh extends nr {
  constructor() {
    super(...arguments), this.type = "interval", this._interval = 0, this._intervalPrecision = 2;
  }
  getTicks(t) {
    const e = this._interval, i = this._extent, s = this._niceExtent, r = this._intervalPrecision, o = [];
    if (!e)
      return o;
    const a = 1e4;
    i[0] < s[0] && (t ? o.push({
      value: jn(s[0] - e, r)
    }) : o.push({
      value: i[0]
    }));
    let l = s[0];
    for (; l <= s[1] && (o.push({
      value: l
    }), l = jn(l + e, r), l !== o[o.length - 1].value); )
      if (o.length > a)
        return [];
    const c = o.length ? o[o.length - 1].value : s[1];
    return i[1] > c && (t ? o.push({
      value: jn(c + e, r)
    }) : o.push({
      value: i[1]
    })), o;
  }
  getLabel(t, e) {
    if (t == null)
      return "";
    let i = e && e.precision;
    i == null ? i = cp(t.value) || 0 : i === "auto" && (i = this._intervalPrecision);
    const s = jn(t.value, i, !0);
    return Um(s);
  }
  calcTicks(t, e, i) {
    t = t || 5;
    const s = this._extent;
    let r = s[1] - s[0];
    if (!isFinite(r))
      return;
    r < 0 && (r = -r, s.reverse());
    const o = _u(
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
    t.fixMin || (e[0] = jn(Math.floor(e[0] / s) * s)), t.fixMax || (e[1] = jn(Math.ceil(e[1] / s) * s));
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
    const o = _u(
      s,
      t,
      e,
      i
    );
    this._intervalPrecision = o.intervalPrecision, this._interval = o.interval, this._niceExtent = o.niceTickExtent;
  }
  normalize(t) {
    return $1(t, this._extent);
  }
  setInterval(t) {
    this._interval = t, this._niceExtent = this._extent.slice(), this._intervalPrecision = Bp(t);
  }
};
Rh.type = "interval";
let Vs = Rh;
nr.registerClass(Vs);
const Y1 = {
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
}, V1 = {
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
}, go = "ZH", sh = "EN", _o = sh, Qr = {}, rh = {}, $p = (function() {
  return /* eslint-disable-next-line */ (document.documentElement.lang || navigator.language || navigator.browserLanguage).toUpperCase().indexOf(go) > -1 ? go : _o;
})();
function Hp(n, t) {
  n = n.toUpperCase(), rh[n] = new Dt(t), Qr[n] = t;
}
function W1(n) {
  return rh[n];
}
function U1() {
  return rh[_o];
}
function q1(n) {
  if (q(n)) {
    const t = Qr[n.toUpperCase()] || {};
    return n === go || n === sh ? U(t) : ut(
      U(t),
      U(Qr[_o]),
      !1
    );
  } else
    return ut(U(n), U(Qr[_o]), !1);
}
Hp(sh, Y1);
Hp(go, V1);
const oh = 1e3, ah = oh * 60, ms = ah * 60, Yt = ms * 24, yu = Yt * 365, os = {
  year: "{yyyy}",
  month: "{MMM}",
  day: "{d}",
  hour: "{HH}:{mm}",
  minute: "{HH}:{mm}",
  second: "{HH}:{mm}:{ss}",
  millisecond: "{HH}:{mm}:{ss} {SSS}",
  none: "{yyyy}-{MM}-{dd} {HH}:{mm}:{ss} {SSS}"
}, pr = "{yyyy}-{MM}-{dd}", vu = {
  year: "{yyyy}",
  month: "{yyyy}-{MM}",
  day: pr,
  hour: pr + " " + os.hour,
  minute: pr + " " + os.minute,
  second: pr + " " + os.second,
  millisecond: os.none
}, Aa = [
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
  "millisecond"
], Gp = [
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
function He(n, t) {
  return n += "", "0000".substr(0, t - n.length) + n;
}
function yi(n) {
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
function X1(n) {
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
function Z1(n, t, e, i, s) {
  let r = null;
  if (q(e))
    r = e;
  else if (Q(e))
    r = e(n.value, t, {
      level: n.level
    });
  else {
    const o = N({}, os);
    if (n.level > 0)
      for (let c = 0; c < Aa.length; ++c)
        o[Aa[c]] = `{primary|${o[Aa[c]]}}`;
    const a = e ? e.inherit === !1 ? e : yt(e, o) : o, l = Yp(n.value, s);
    if (a[l])
      r = a[l];
    else if (a.inherit) {
      const c = Gp.indexOf(l);
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
  return Kp(new Date(n.value), r, s, i);
}
function K1(n) {
  return n === yi(n);
}
function wu(n, t, e) {
  const i = xe(n) ? Wn(n) : n;
  switch (t = t || Yp(n, e), t) {
    case "year":
      return i[lh(e)]();
    case "half-year":
      return i[vi(e)]() >= 6 ? 1 : 0;
    case "quarter":
      return Math.floor((i[vi(e)]() + 1) / 4);
    case "month":
      return i[vi(e)]();
    case "day":
      return i[ma(e)]();
    case "half-day":
      return i[Ws(e)]() / 24;
    case "hour":
      return i[Ws(e)]();
    case "minute":
      return i[ya(e)]();
    case "second":
      return i[va(e)]();
    case "millisecond":
      return i[wa(e)]();
  }
}
function Yp(n, t) {
  const e = Wn(n), i = e[vi(t)]() + 1, s = e[ma(t)](), r = e[Ws(t)](), o = e[ya(t)](), a = e[va(t)](), c = e[wa(t)]() === 0, h = c && a === 0, u = h && o === 0, f = u && r === 0, d = f && s === 1;
  return d && i === 1 ? "year" : d ? "month" : f ? "day" : u ? "hour" : h ? "minute" : c ? "second" : "millisecond";
}
function lh(n) {
  return n ? "getUTCFullYear" : "getFullYear";
}
function vi(n) {
  return n ? "getUTCMonth" : "getMonth";
}
function ma(n) {
  return n ? "getUTCDate" : "getDate";
}
function Ws(n) {
  return n ? "getUTCHours" : "getHours";
}
function ya(n) {
  return n ? "getUTCMinutes" : "getMinutes";
}
function va(n) {
  return n ? "getUTCSeconds" : "getSeconds";
}
function wa(n) {
  return n ? "getUTCMilliseconds" : "getMilliseconds";
}
function j1(n) {
  return n ? "setUTCFullYear" : "setFullYear";
}
function Vp(n) {
  return n ? "setUTCMonth" : "setMonth";
}
function Wp(n) {
  return n ? "setUTCDate" : "setDate";
}
function Up(n) {
  return n ? "setUTCHours" : "setHours";
}
function qp(n) {
  return n ? "setUTCMinutes" : "setMinutes";
}
function Xp(n) {
  return n ? "setUTCSeconds" : "setSeconds";
}
function Zp(n) {
  return n ? "setUTCMilliseconds" : "setMilliseconds";
}
function Kp(n, t, e, i) {
  const s = Wn(n), r = s[lh(e)](), o = s[vi(e)]() + 1, a = Math.floor((o - 1) / 3) + 1, l = s[ma(e)](), c = s["get" + (e ? "UTC" : "") + "Day"](), h = s[Ws(e)](), u = (h - 1) % 12 + 1, f = s[ya(e)](), d = s[va(e)](), p = s[wa(e)](), g = (i instanceof Dt ? i : W1(i || $p) || U1()).getModel("time"), m = g.get("month"), y = g.get("monthAbbr"), v = g.get("dayOfWeek"), S = g.get("dayOfWeekAbbr");
  return (t || "").replace(/{yyyy}/g, r + "").replace(/{yy}/g, He(r % 100 + "", 2)).replace(/{Q}/g, a + "").replace(/{MMMM}/g, m[o - 1]).replace(/{MMM}/g, y[o - 1]).replace(/{MM}/g, He(o, 2)).replace(/{M}/g, o + "").replace(/{dd}/g, He(l, 2)).replace(/{d}/g, l + "").replace(/{eeee}/g, v[c]).replace(/{ee}/g, S[c]).replace(/{e}/g, c + "").replace(/{HH}/g, He(h, 2)).replace(/{H}/g, h + "").replace(/{hh}/g, He(u + "", 2)).replace(/{h}/g, u + "").replace(/{mm}/g, He(f, 2)).replace(/{m}/g, f + "").replace(/{ss}/g, He(d, 2)).replace(/{s}/g, d + "").replace(/{SSS}/g, He(p, 3)).replace(/{S}/g, p + "");
}
const Q1 = function(n, t, e, i) {
  for (; e < i; ) {
    const s = e + i >>> 1;
    n[s][1] < t ? e = s + 1 : i = s;
  }
  return e;
}, Ph = class Ph extends Vs {
  constructor(t) {
    super(t), this.type = "time";
  }
  parse(t) {
    return se(t) ? t : +Wn(t);
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
    const s = this.getSetting("useUTC"), r = ry(
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
    return Kp(
      t.value,
      vu[X1(
        yi(this._minLevelUnit)
      )] || vu.second,
      e,
      this.getSetting("locale")
    );
  }
  getFormattedLabel(t, e, i) {
    const s = this.getSetting("useUTC"), r = this.getSetting("locale");
    return Z1(t, e, i, r, s);
  }
  calcNiceExtent(t) {
    const e = this._extent;
    if (e[0] === e[1] && (e[0] -= Yt, e[1] += Yt), e[1] === -1 / 0 && e[0] === 1 / 0) {
      const i = /* @__PURE__ */ new Date();
      e[1] = +new Date(i.getFullYear(), i.getMonth(), i.getDate()), e[0] = e[1] - Yt;
    }
    this.calcNiceTicks(t.splitNumber, t.minInterval, t.maxInterval);
  }
  calcNiceTicks(t, e, i) {
    t = t || 10;
    const s = this._extent, r = s[1] - s[0];
    this._approxInterval = r / t, e != null && this._approxInterval < e && (this._approxInterval = e), i != null && this._approxInterval > i && (this._approxInterval = i);
    const o = gr.length, a = Math.min(
      Q1(gr, this._approxInterval, 0, o),
      o - 1
    );
    this._interval = gr[a][1], this._minLevelUnit = gr[Math.max(a - 1, 0)][0];
  }
};
Ph.type = "time";
let mo = Ph;
const gr = [
  // Format                           interval
  ["second", oh],
  // 1s
  ["minute", ah],
  // 1m
  ["hour", ms],
  // 1h
  ["quarter-day", ms * 6],
  // 6h
  ["half-day", ms * 12],
  // 12h
  ["day", Yt * 1.2],
  // 1d
  ["half-week", Yt * 3.5],
  // 3.5d
  ["week", Yt * 7],
  // 7d
  ["month", Yt * 31],
  // 1M
  ["quarter", Yt * 95],
  // 3M
  ["half-year", yu / 2],
  // 6M
  ["year", yu]
  // 1Y
];
function J1(n, t, e, i) {
  const s = Wn(t), r = Wn(e), o = (p) => wu(s, p, i) === wu(r, p, i), a = () => o("year"), l = () => a() && o("month"), c = () => l() && o("day"), h = () => c() && o("hour"), u = () => h() && o("minute"), f = () => u() && o("second"), d = () => f() && o("millisecond");
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
function ty(n, t) {
  return n /= Yt, n > 16 ? 16 : (
    // Math.floor(daysInMonth / 2) + 1  // In this case we only want one tick between two months.
    n > 7.5 ? 7 : n > 3.5 ? 4 : n > 1.5 ? 2 : 1
  );
}
function ey(n) {
  const t = 30 * Yt;
  return n /= t, n > 6 ? 6 : n > 3 ? 3 : n > 2 ? 2 : 1;
}
function ny(n) {
  return n /= ms, n > 12 ? 12 : n > 6 ? 6 : n > 3.5 ? 4 : n > 2 ? 2 : 1;
}
function xu(n, t) {
  return n /= t ? ah : oh, n > 30 ? 30 : n >= 20 ? 20 : n > 15 ? 15 : n >= 10 ? 10 : n > 5 ? 5 : n > 2 ? 2 : 1;
}
function iy(n) {
  return fp(n);
}
function sy(n, t, e) {
  const i = new Date(n);
  switch (yi(t)) {
    case "year":
    case "month":
      i[Vp(e)](0);
    case "day":
      i[Wp(e)](1);
    case "hour":
      i[Up(e)](0);
    case "minute":
      i[qp(e)](0);
    case "second":
      i[Xp(e)](0), i[Zp(e)](0);
  }
  return i.getTime();
}
function ry(n, t, e, i) {
  const r = Gp;
  let o = 0;
  function a(m, y, v, S, x, w, M) {
    const b = new Date(y);
    let T = y, I = b[S]();
    for (; T < v && T <= i[1]; )
      M.push({
        value: T
      }), I += m, b[x](I), T = b.getTime();
    M.push({
      value: T,
      notAdd: !0
    });
  }
  function l(m, y, v) {
    const S = [], x = !y.length;
    if (!J1(yi(m), i[0], i[1], e)) {
      x && (y = [
        {
          // TODO Optimize. Not include so may ticks.
          value: sy(new Date(i[0]), m, e)
        },
        {
          value: i[1]
        }
      ]);
      for (let w = 0; w < y.length - 1; w++) {
        const M = y[w].value, b = y[w + 1].value;
        if (M === b)
          continue;
        let T, I, C, A = !1;
        switch (m) {
          case "year":
            T = Math.max(1, Math.round(t / Yt / 365)), I = lh(e), C = j1(e);
            break;
          case "half-year":
          case "quarter":
          case "month":
            T = ey(t), I = vi(e), C = Vp(e);
            break;
          case "week":
          // PENDING If week is added. Ignore day.
          case "half-week":
          case "day":
            T = ty(t), I = ma(e), C = Wp(e), A = !0;
            break;
          case "half-day":
          case "quarter-day":
          case "hour":
            T = ny(t), I = Ws(e), C = Up(e);
            break;
          case "minute":
            T = xu(t, !0), I = ya(e), C = qp(e);
            break;
          case "second":
            T = xu(t, !1), I = va(e), C = Xp(e);
            break;
          case "millisecond":
            T = iy(t), I = wa(e), C = Zp(e);
            break;
        }
        a(
          T,
          M,
          b,
          I,
          C,
          A,
          S
        ), m === "year" && v.length > 1 && w === 0 && v.unshift({
          value: v[0].value - T
        });
      }
      for (let w = 0; w < S.length; w++)
        v.push(S[w]);
      return S;
    }
  }
  const c = [];
  let h = [], u = 0, f = 0;
  for (let m = 0; m < r.length && o++ < 1e4; ++m) {
    const y = yi(r[m]);
    if (!K1(r[m]))
      continue;
    l(
      r[m],
      c[c.length - 1] || [],
      h
    );
    const v = r[m + 1] ? yi(r[m + 1]) : null;
    if (y !== v) {
      if (h.length) {
        f = u, h.sort((w, M) => w.value - M.value);
        const S = [];
        for (let w = 0; w < h.length; ++w) {
          const M = h[w].value;
          (w === 0 || h[w - 1].value !== M) && (S.push(h[w]), M >= i[0] && M <= i[1] && u++);
        }
        const x = (i[1] - i[0]) / t;
        if (u > x * 1.5 && f > x / 1.5 || (c.push(S), u > x || n === r[m]))
          break;
      }
      h = [];
    }
  }
  const d = ho(
    re(c, (m) => ho(
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
nr.registerClass(mo);
const oy = ft();
class jp {
  constructor(t) {
    this.dimensions = t.dimensions, this._dimOmitted = t.dimensionOmitted, this.source = t.source, this._fullDimCount = t.fullDimensionCount, this._updateDimOmitted(t.dimensionOmitted);
  }
  _updateDimOmitted(t) {
    this._dimOmitted = t, t && (this._dimNameMap || (this._dimNameMap = tg(this.source)));
  }
  getSourceDimension(t) {
    const e = this.source.dimensionsDefine;
    if (e)
      return e[t];
  }
  getSourceDimensionIndex(t) {
    return ne(this._dimNameMap.get(t), -1);
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
function Qp(n) {
  return n instanceof jp;
}
function Jp(n) {
  const t = O();
  for (let e = 0; e < (n || []).length; e++) {
    const i = n[e], s = k(i) ? i.name : i;
    s != null && t.get(s) == null && t.set(s, e);
  }
  return t;
}
function tg(n) {
  const t = oy(n);
  return t.dimNameMap || (t.dimNameMap = Jp(n.dimensionsDefine));
}
function ay(n) {
  return n > 30;
}
function ly(n, t) {
  return !!t && t === n.getCalculationInfo("stackedDimension");
}
function cy(n, t) {
  return ly(n, t) ? n.getCalculationInfo("stackResultDimension") : t;
}
function hy(n, t, e) {
  e = e || {};
  let i = e.byIndex;
  const s = e.stackedCoordDimension;
  let r, o, a;
  uy(t) ? r = t : (o = t.schema, r = o.dimensions, a = t.store);
  const l = !!(n && n.get("stack"));
  let c, h, u, f;
  if (et(r, function(d, p) {
    Ut(d) && (r[p] = d = {
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
function uy(n) {
  return !Qp(
    n.schema
  );
}
let eg = class {
  constructor(t) {
    this.value = t;
  }
}, fy = class {
  constructor() {
    this._len = 0;
  }
  /**
   * Insert a new value at the tail
   */
  insert(t) {
    const e = new eg(t);
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
}, ir = class {
  constructor(t) {
    this._list = new fy(), this._maxSize = 10, this._map = {}, this._maxSize = t;
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
      a ? a.value = e : a = new eg(e), a.key = t, i.insertEntry(a), s[t] = a;
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
}, Su = {};
function ng(n, t) {
  t = t || Fs;
  let e = Su[t];
  e || (e = Su[t] = new ir(500));
  let i = e.get(n);
  return i == null && (i = Gc.measureText(n, t).width, e.put(n, i)), i;
}
function bu(n, t, e, i) {
  const s = ng(n, t), r = gy(t), o = dy(0, s, e), a = py(0, r, i);
  return new Mt(o, a, s, r);
}
function ig(n, t, e, i) {
  const s = ((n || "") + "").split(`
`);
  if (s.length === 1)
    return bu(s[0], t, e, i);
  {
    const o = new Mt(0, 0, 0, 0);
    for (let a = 0; a < s.length; a++) {
      const l = bu(s[a], t, e, i);
      a === 0 ? o.copy(l) : o.union(l);
    }
    return o;
  }
}
function dy(n, t, e) {
  return e === "right" ? n -= t : e === "center" && (n -= t / 2), n;
}
function py(n, t, e) {
  return e === "middle" ? n -= t / 2 : e === "bottom" && (n -= t), n;
}
function gy(n) {
  return ng("国", n);
}
function sn(n, t) {
  return typeof n == "string" ? n.lastIndexOf("%") >= 0 ? parseFloat(n) / 100 * t : parseFloat(n) : n;
}
function _y(n, t, e) {
  const i = t.position || "inside", s = t.distance != null ? t.distance : 5, r = e.height, o = e.width, a = r / 2;
  let l = e.x, c = e.y, h = "left", u = "top";
  if (i instanceof Array)
    l += sn(i[0], e.width), c += sn(i[1], e.height), h = null, u = null;
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
class my {
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
    Q(r) ? this._modelMinNum = _r(
      t,
      r({
        min: i[0],
        max: i[1]
      })
    ) : r !== "dataMin" && (this._modelMinNum = _r(t, r));
    const o = this._modelMaxRaw = e.get("max", !0);
    if (Q(o) ? this._modelMaxNum = _r(
      t,
      o({
        min: i[0],
        max: i[1]
      })
    ) : o !== "dataMax" && (this._modelMaxNum = _r(t, o)), s)
      this._axisDataLen = e.getCategories().length;
    else {
      const a = e.get(
        "boundaryGap"
      ), l = K(a) ? a : [a || 0, a || 0];
      typeof l[0] == "boolean" || typeof l[1] == "boolean" ? this._boundaryGapInner = [0, 0] : this._boundaryGapInner = [
        sn(l[0], 1),
        sn(l[1], 1)
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
    const u = Ns(a) || Ns(l) || t && !s;
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
    this[vy[t]] = e;
  }
  setDeterminedMinMax(t, e) {
    const i = yy[t];
    this[i] = e;
  }
  freeze() {
    this.frozen = !0;
  }
}
const yy = {
  min: "_determinedMin",
  max: "_determinedMax"
}, vy = { min: "_dataMin", max: "_dataMax" };
function sg(n, t, e) {
  let i = n.rawExtentInfo;
  return i || (i = new my(n, t, e), n.rawExtentInfo = i, i);
}
function _r(n, t) {
  return t == null ? null : Ns(t) ? NaN : n.parse(t);
}
function wy(n, t) {
  const e = [];
  return t.eachSeriesByType(n, function(i) {
    xy(i) && e.push(i);
  }), e;
}
function xy(n) {
  return n.coordinateSystem && n.coordinateSystem.type === "cartesian2d";
}
function Sy(n, t) {
  if (t = t || n.get("type"), !!t)
    return t === "time" ? new mo({
      locale: n.piModel.getLocaleModel(),
      useUTC: !1
    }) : new (nr.getClass(t) || Vs)();
}
function rg(n, t) {
  const e = {};
  return D(n.mapDimensionsAll(t), function(i) {
    e[cy(n, i)] = !0;
  }), J(e);
}
function by(n, t) {
  const e = n.type, i = sg(
    n,
    t,
    n.getExtent()
  ).calculate();
  n.setBlank(i.isBlank);
  let s = i.min, r = i.max;
  const o = t.piModel;
  if (o && e === "time") {
    const a = wy("bar", o);
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
function Ty(n, t) {
  const e = t, i = by(n, e), s = i.extent, r = e.get("splitNumber"), o = n.type, a = e.get("interval"), l = o === "interval" || o === "time";
  n.setExtent(s[0], s[1]), n.calcNiceExtent({
    splitNumber: r,
    fixMin: i.fixMin,
    fixMax: i.fixMax,
    minInterval: l ? e.get("minInterval") : null,
    maxInterval: l ? e.get("maxInterval") : null
  }), a != null && n.setInterval && n.setInterval(a);
}
function My(n, t, e) {
  t && D(rg(t, e), function(i) {
    const s = t.getApproximateExtent(i);
    s[0] < n[0] && (n[0] = s[0]), s[1] > n[1] && (n[1] = s[1]);
  });
}
function xa(n) {
  const t = n.getLabelModel().get("formatter"), e = n.type === "category" ? n.scale.getExtent()[0] : null;
  return n.scale.type === "time" ? /* @__PURE__ */ (function(i) {
    return function(s, r) {
      return n.scale.getFormattedLabel(s, r, i);
    };
  })(t) : q(t) ? /* @__PURE__ */ (function(i) {
    return function(s) {
      const r = n.scale.getLabel(s);
      return i.replace("{value}", r != null ? r : "");
    };
  })(t) : Q(t) ? /* @__PURE__ */ (function(i) {
    return function(s, r) {
      return e != null && (r = s.value - e), i(
        Cy(n, s),
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
function og(n) {
  const t = n.get(
    "interval"
  );
  return t == null ? "auto" : t;
}
function Cy(n, t) {
  return n.type === "category" ? n.scale.getLabel(t) : t.value;
}
function ag(n) {
  return n.type === "category" && og(n.getLabelModel()) === 0;
}
const Us = ft();
function Dy(n, t) {
  return { ticks: H(n.scale.getTicks(), (e) => e.value) };
}
function Iy(n) {
  return n.type === "category" ? Ay(n) : Py(n);
}
function Ay(n) {
  const t = n.getLabelModel(), e = Ey(n, t);
  return !t.get("show") || n.scale.isBlank() ? { labels: [], labelCategoryInterval: e.labelCategoryInterval } : e;
}
function Ey(n, t) {
  const e = Ly(n, "labels"), i = og(t), s = ky(e, i);
  if (s)
    return s;
  let r, o;
  return Q(i) ? r = Ny(n, i) : (o = i === "auto" ? Ry(n) : i, r = Fy(n, o)), Oy(e, i, {
    labels: r,
    labelCategoryInterval: o
  });
}
function Ry(n) {
  const t = Us(n).autoInterval;
  return t != null ? t : Us(n).autoInterval = n.calculateCategoryInterval();
}
function Py(n) {
  const t = n.scale.getTicks(), e = xa(n);
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
function Ly(n, t) {
  return Us(n)[t] || (Us(n)[t] = []);
}
function ky(n, t) {
  for (let e = 0; e < n.length; e++)
    if (n[e].key === t)
      return n[e].value;
}
function Oy(n, t, e) {
  return n.push({ key: t, value: e }), e;
}
function Fy(n, t, e) {
  const i = xa(n), s = n.scale, r = s.getExtent(), o = n.getLabelModel(), a = [], l = Math.max((t || 0) + 1, 1);
  let c = r[0];
  const h = s.count();
  c !== 0 && l > 1 && h / l > 2 && (c = Math.round(Math.ceil(c / l) * l));
  const u = ag(n), f = o.get("showMinLabel") || u, d = o.get("showMaxLabel") || u;
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
function Ny(n, t, e) {
  const i = n.scale, s = xa(n), r = [];
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
function zy(n) {
  const t = By(n), e = xa(n), i = (t.axisRotate - t.labelRotate) / 180 * Math.PI, s = n.scale, r = s.getExtent(), o = s.count();
  if (r[1] - r[0] < 1)
    return 0;
  let a = 1;
  o > 40 && (a = Math.max(1, Math.floor(o / 40)));
  let l = r[0];
  const c = n.dataToCoord(l + 1) - n.dataToCoord(l), h = Math.abs(c * Math.cos(i)), u = Math.abs(c * Math.sin(i));
  let f = 0, d = 0;
  for (; l <= r[1]; l += a) {
    let x = 0, w = 0;
    const M = ig(
      e({ value: l }),
      t.font,
      "center",
      "top"
    );
    x = M.width * 1.3, w = M.height * 1.3, f = Math.max(f, x, 7), d = Math.max(d, w, 7);
  }
  let p = f / h, _ = d / u;
  isNaN(p) && (p = 1 / 0), isNaN(_) && (_ = 1 / 0);
  let g = Math.max(0, Math.floor(Math.min(p, _)));
  const m = Us(n.model), y = n.getExtent(), v = m.lastAutoInterval, S = m.lastTickCount;
  return v != null && S != null && Math.abs(v - g) <= 1 && Math.abs(S - o) <= 1 && // Always choose the bigger one, otherwise the critical
  // point is not the same when zooming in or zooming out.
  v > g && // If the axis change is caused by chart resize, the cache should not
  // be used. Otherwise some hidden labels might not be shown again.
  m.axisExtent0 === y[0] && m.axisExtent1 === y[1] ? g = v : (m.lastTickCount = o, m.lastAutoInterval = g, m.axisExtent0 = y[0], m.axisExtent1 = y[1]), g;
}
function By(n) {
  const t = n.getLabelModel();
  return {
    axisRotate: n.getRotate ? n.getRotate() : n.isHorizontal && !n.isHorizontal() ? 90 : 0,
    labelRotate: t.get("rotate") || 0,
    font: t.getFont()
  };
}
const $y = [0, 1];
class Hy {
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
    return hp(t || this.scale.getExtent(), this._extent);
  }
  /**
   * Convert data to coord. Data is the rank if it has an ordinal scale
   */
  dataToCoord(t, e) {
    let i = this._extent;
    const s = this.scale;
    return t = s.normalize(t), this.onBand && s.type === "ordinal" && (i = i.slice(), Gy(i, s.count())), ot(t, $y, i, e);
  }
  getTicksCoords(t) {
    t = t || {};
    const e = t.tickModel || this.getTickModel(), s = Dy(this).ticks, r = re(
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
    return Iy(this).labels;
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
    return zy(this);
  }
}
function Gy(n, t) {
  const s = (n[1] - n[0]) / t / 2;
  n[0] += s, n[1] -= s;
}
class Yy extends Hy {
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
class Vy {
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
    return t = t.toLowerCase(), ee(this.getAxes(), function(e) {
      return e.scale.type === t;
    });
  }
  addAxis(t) {
    const e = t.dim;
    this._axes[e] = t, this._dimList.push(e);
  }
}
function Ni(n, t) {
  return n == null && (n = 0), t == null && (t = 0), [n, t];
}
function Wy(n, t) {
  return (n[0] - t[0]) * (n[0] - t[0]) + (n[1] - t[1]) * (n[1] - t[1]);
}
var wi = Wy;
function Se(n, t, e) {
  var i = t[0], s = t[1];
  return n[0] = e[0] * i + e[2] * s + e[4], n[1] = e[1] * i + e[3] * s + e[5], n;
}
function lg(n, t, e) {
  return n[0] = Math.min(t[0], e[0]), n[1] = Math.min(t[1], e[1]), n;
}
function cg(n, t, e) {
  return n[0] = Math.max(t[0], e[0]), n[1] = Math.max(t[1], e[1]), n;
}
const Uy = ["x", "y"];
class qy extends Vy {
  constructor() {
    super(...arguments), this.type = "cartesian2d", this.dimensions = Uy;
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
      return Se(i, t, this._transform);
    const o = this.getAxis("x"), a = this.getAxis("y");
    return i[0] = o.toGlobalCoord(o.dataToCoord(s, e)), i[1] = a.toGlobalCoord(a.dataToCoord(r, e)), i;
  }
  getOtherAxis(t) {
    return this.getAxis(t.dim === "x" ? "y" : "x");
  }
}
function Tu(n) {
  return n.get("coordinateSystem") === "cartesian2d";
}
function Mu(n) {
  const t = {
    xAxisModel: null,
    yAxisModel: null
  };
  return D(t, function(e, i) {
    const s = i.replace(/Model$/, ""), r = n.getReferringComponents(
      s,
      Te
    ).models[0];
    t[i] = r;
  }), t;
}
function Xy(n, t, e) {
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
  r.labelDirection = r.tickDirection = r.nameDirection = _[a], r.labelOffset = o ? p[f[a]] - p[f.onZero] : 0, t.get(["axisTick", "inside"]) && (r.tickDirection = -r.tickDirection), Ll(e.labelInside, t.get(["axisLabel", "inside"])) && (r.labelDirection = -r.labelDirection);
  const g = t.get(["axisLabel", "rotate"]);
  return r.labelRotate = l === "top" ? -g : g, r.z2 = 1, r;
}
class ch {
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
        const d = "x" + h + "y" + f, p = new qy(d);
        p.master = this, p.model = t, this._coordsMap[d] = p, this._coordsList.push(p), p.addAxis(c), p.addAxis(u);
      });
    });
    function l(c) {
      return function(h, u) {
        if (!Ea(h, t))
          return;
        let f = h.get("position");
        c === "x" ? f !== "top" && f !== "bottom" && (f = r.bottom ? "top" : "bottom") : f !== "left" && f !== "right" && (f = r.left ? "right" : "left"), r[f] = !0;
        const d = new Yy(
          c,
          Sy(h),
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
      if (Tu(s)) {
        const r = Mu(s), o = r.xAxisModel, a = r.yAxisModel;
        if (!Ea(o, e) || !Ea(a, e))
          return;
        const l = this.getCartesian(
          o.componentIndex,
          a.componentIndex
        ), c = s.getData(), h = l.getAxis("x"), u = l.getAxis("y");
        i(c, h), i(c, u);
      }
    }, this);
    function i(s, r) {
      D(rg(s, r.dim), function(o) {
        r.scale.unionExtentFromData(s, o);
      });
    }
  }
  update(t, e) {
    const i = this._axesMap;
    this._updateScale(t, this.model);
    function s(o) {
      const a = J(o), l = a.length;
      if (l)
        for (let c = l - 1; c >= 0; c--) {
          const h = +a[c], u = o[h], f = u.model, d = u.scale;
          Ty(d, f);
        }
    }
    s(i.x), s(i.y);
    const r = {};
    D(i.x, function(o) {
      Cu(i, "y", o, r);
    }), D(i.y, function(o) {
      Cu(i, "x", o, r);
    }), this.resize(this.model, e);
  }
  resize(t, e, i) {
    const s = t.getBoxLayoutParams();
    !i && t.get("containLabel");
    const r = Hs(s, {
      width: e.getWidth(),
      height: e.getHeight()
    });
    this._rect = r;
    const o = this._axesList;
    a();
    function a() {
      D(o, function(l) {
        const c = l.isHorizontal(), h = c ? [0, r.width] : [0, r.height], u = l.inverse ? 1 : 0;
        l.setExtent(h[u], h[1 - u]), Zy(l, c ? r.x : r.y);
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
    ie(t) && (e = t.yAxisIndex, t = t.xAxisIndex);
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
      const o = new ch(s, t, e);
      o.name = "grid_" + r, o.resize(s, e, !0), s.coordinateSystem = o, i.push(o);
    }), t.eachSeries(function(s) {
      if (!Tu(s))
        return;
      const r = Mu(s), o = r.xAxisModel, a = r.yAxisModel, c = o.getCoordSysModel().coordinateSystem;
      s.coordinateSystem = c.getCartesian(
        o.componentIndex,
        a.componentIndex
      );
    }), i;
  }
}
function Ea(n, t) {
  return n.getCoordSysModel() === t;
}
function Zy(n, t) {
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
function Ky(n) {
  const t = n.scale.getExtent(), e = t[0], i = t[1];
  return !(e > 0 && i > 0 || e < 0 && i < 0);
}
function Cu(n, t, e, i) {
  e.getAxesOnZeroOf = function() {
    return r ? [r] : [];
  };
  const s = n[t];
  let r;
  const o = e.model, a = o.get(["axisLine", "onZero"]), l = o.get(["axisLine", "onZeroAxisIndex"]);
  if (!a)
    return;
  if (l != null)
    Du(s[l]) && (r = s[l]);
  else
    for (const h in s)
      if (s.hasOwnProperty(h) && Du(s[h]) && // Consider that two Y axes on one value axis,
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
function Du(n) {
  return n && n.type !== "category" && n.type !== "time" && Ky(n);
}
let jy = "";
const Qy = {
  textStyle: {
    fontFamily: jy.match(/^Win/) ? "Microsoft YaHei" : "sans-serif",
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
}, Jy = O();
function tv(n, t, e) {
  const i = Jy.get(t);
  if (!i)
    return e;
  const s = i(n);
  return s ? e.concat(s) : e;
}
let Ra, Iu;
const ev = "\0_pi_inner", Lh = class Lh extends Dt {
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
      (!this.option || t == "recreate") && Iu(this, s), e = !0;
    }
    return e;
  }
  restoreData(t) {
    Ra(this);
    const e = this._componentsMap, i = [];
    e.each(function(s, r) {
      W.hasClass(r) && i.push(r);
    }), W.topologicalTravel(
      i,
      W.getAllClassMainTypes(),
      function(s) {
        D(e.get(s), function(r) {
          r && (s !== "series" || !nv(r, t)) && r.restoreData();
        });
      }
    );
  }
  mergeOption(t) {
    this._mergeOption(t, null);
  }
  _mergeOption(t, e) {
    const i = this.option, s = this._componentsMap, r = this._componentsCount, o = [], a = O(), l = e == null ? void 0 : e.replaceMergeMainTypeMap;
    D(t, function(h, u) {
      h && (W.hasClass(u) ? u && (o.push(u), a.set(u, !0)) : i[u] = i[u] ? U(h) : ut(i[u], h, !0));
    }), W.topologicalTravel(
      o,
      W.getAllClassMainTypes(),
      c,
      this
    );
    function c(h) {
      const u = tv(
        this,
        h,
        Wt(t[h])
      ), f = s.get(h), d = (
        // `!oldCmptList` means init. See the comment in `mappingToExists`
        f ? l && l.get(h) ? "replaceMerge" : "normalMerge" : "replaceAll"
      ), p = G0(
        f,
        u,
        d
      );
      Z0(
        p,
        h,
        W
      ), i[h] = null, s.set(h, null), r.set(h, 0);
      const _ = [], g = [];
      let m = 0, y;
      D(
        p,
        function(v, S) {
          let x = v.existing;
          const w = v.newOption;
          if (!w)
            x && x.mergeOption({}, this);
          else {
            const M = h === "series", b = W.getClass(
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
            if (x && x.constructor === b)
              x.name = v.keyInfo.name, x.mergeOption(w, this), x.optionUpdated(w, !1);
            else {
              const T = N(
                {
                  componentIndex: S
                },
                v.keyInfo
              );
              x = new b(
                w,
                this,
                this,
                T
              ), N(x, T), v.brandNew && (x.__requireNewView = !0), x.init(w, this, this), x.optionUpdated(null, !0);
            }
          }
          x ? (_.push(x.option), g.push(x), m++) : (_.push(void 0), g.push(void 0));
        },
        this
      ), i[h] = _, s.set(h, g), r.set(h, m), h === "series" && Ra(this);
    }
  }
  /**
   * Get option for output (cloned option and inner info removed)
   */
  getOption() {
    const t = U(this.option);
    return D(t, function(e, i) {
      if (W.hasClass(i)) {
        const s = Wt(e);
        let r = s.length, o = !1;
        for (let a = r - 1; a >= 0; a--)
          s[a] && !zs(s[a]) ? o = !0 : (s[a] = null, !o && r--);
        s.length = r, t[i] = s;
      }
    }), delete t[ev], t;
  }
  getSeriesByType(t) {
    return ee(
      this._componentsMap.get("series"),
      (e) => !!e && e.subType === t
    );
  }
  getSeriesByIndex(t) {
    return this._componentsMap.get("series")[t];
  }
  getSeries() {
    return ee(
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
    return i != null ? (a = [], D(Wt(i), function(l) {
      o[l] && a.push(o[l]);
    })) : s != null ? a = Au("id", s, o) : r != null ? a = Au("name", r, o) : a = ee(o, (l) => !!l), Eu(a, t);
  }
  findComponents(t) {
    const e = t.query, i = t.mainType, s = o(e), r = s ? this.queryComponents(s) : (
      // Retrieve all non-empty components.
      ee(this._componentsMap.get(i), (l) => !!l)
    );
    return a(Eu(r, t));
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
      return t.filter ? ee(l, t.filter) : l;
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
      const r = q(t) ? s.get(t) : k(t) ? this.findComponents(t) : null;
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
Lh.internalField = (function() {
  Ra = function(t) {
    const e = t._seriesIndices = [];
    D(t._componentsMap.get("series"), function(i) {
      i && e.push(i.componentIndex);
    }), t._seriesIndicesMap = O(e);
  }, Iu = function(t, e) {
    t.option = {}, t._componentsMap = O({ series: [] }), t._componentsCount = O(), ut(e, Qy, !1), t._mergeOption(e, null);
  };
})();
let yo = Lh;
function Au(n, t, e) {
  if (K(t)) {
    const i = O();
    return D(t, function(s) {
      s != null && Fe(s, null) != null && i.set(s, !0);
    }), ee(e, (s) => s && i.get(s[n]));
  } else {
    const i = Fe(t, null);
    return ee(
      e,
      (s) => s && i != null && s[n] === i
    );
  }
}
function Eu(n, t) {
  return t.hasOwnProperty("subType") ? ee(n, (e) => e && e.subType === t.subType) : n;
}
function nv(n, t) {
  if (t) {
    const e = t.seriesIndex, i = t.seriesId, s = t.seriesName;
    return e != null && n.componentIndex !== e || i != null && n.id !== i || s != null && n.name !== s;
  }
}
class iv {
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
class sv {
  /**
   * 对外部参数进行格式化，适合内部使用
   * @param rawOption 原始参数
   */
  setOption(t) {
    t = U(t);
    const e = this._optionBackup, i = rv(t);
    this._newBaseOption = i.baseOption, e || (this._optionBackup = i);
  }
  mountOption(t) {
    const e = this._optionBackup;
    return U(t ? e.baseOption : this._newBaseOption);
  }
}
function rv(n, t) {
  let e;
  const i = n.baseOption;
  return i ? e = i : e = n, {
    baseOption: e
  };
}
const Ho = class Ho extends W {
};
Ho.type = "grid", Ho.defaultOption = {
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
let Hl = Ho;
const Go = class Go extends Zt {
  constructor() {
    super(...arguments), this.type = Go.type;
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
Go.type = "title";
let Gl = Go;
const Cs = class Cs extends W {
  constructor() {
    super(...arguments), this.type = Cs.type;
  }
};
Cs.type = "title", Cs.defaultOption = {
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
let Yl = Cs;
function ov(n) {
  n.registerComponentModel(Yl), n.registerComponentView(Gl);
}
function av(n) {
  n.registerAction({
    type: "updateXAxisPosition"
  }, function(t, e, i) {
    var r;
    ((r = t.data) == null ? void 0 : r.y) != null && i.getZr().refresh();
  });
}
let Pa = null;
function lv(n) {
  n.registerAction({
    type: "updateYAxisPosition"
  }, function(t, e, i) {
    var r;
    const s = (r = t.data) == null ? void 0 : r.x;
    s != null && (e.eachComponent("grid", function(o) {
      const a = o.coordinateSystem;
      if (!a) return;
      if (Pa === null) {
        const c = a.getRect();
        Pa = c.x + c.width;
      }
      const l = Pa;
      o.option.left = s, o.option.width = l - s, o.option.right = void 0, a.resize(o, i, !0);
    }), i.getZr().refresh());
  });
}
let Ru = !1;
function cv(n) {
  Ru || (Ru = !0, av(n), lv(n));
}
const Yo = class Yo extends Zt {
  constructor() {
    super(...arguments), this.type = Yo.type;
  }
  render(t, e, i) {
    this.group.removeAll(), this.splitModel = t, this.api = i;
  }
};
Yo.type = "split";
let Vl = Yo;
Jt.browser.firefox && +Jt.browser.version.split(".")[0] < 39;
const ye = function(n) {
  n.preventDefault(), n.stopPropagation(), n.cancelBubble = !0;
};
function Pu(n) {
  return n.which === 2 || n.which === 3;
}
var Wl = function(n, t) {
  return Wl = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, i) {
    e.__proto__ = i;
  } || function(e, i) {
    for (var s in i) Object.prototype.hasOwnProperty.call(i, s) && (e[s] = i[s]);
  }, Wl(n, t);
};
function qn(n, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  Wl(n, t);
  function e() {
    this.constructor = n;
  }
  n.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
function vo() {
  return [1, 0, 0, 1, 0, 0];
}
function hv(n) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 1, n[4] = 0, n[5] = 0, n;
}
function uv(n, t) {
  return n[0] = t[0], n[1] = t[1], n[2] = t[2], n[3] = t[3], n[4] = t[4], n[5] = t[5], n;
}
function La(n, t, e) {
  var i = t[0] * e[0] + t[2] * e[1], s = t[1] * e[0] + t[3] * e[1], r = t[0] * e[2] + t[2] * e[3], o = t[1] * e[2] + t[3] * e[3], a = t[0] * e[4] + t[2] * e[5] + t[4], l = t[1] * e[4] + t[3] * e[5] + t[5];
  return n[0] = i, n[1] = s, n[2] = r, n[3] = o, n[4] = a, n[5] = l, n;
}
function Lu(n, t, e) {
  return n[0] = t[0], n[1] = t[1], n[2] = t[2], n[3] = t[3], n[4] = t[4] + e[0], n[5] = t[5] + e[1], n;
}
function fv(n, t, e) {
  var i = t[0], s = t[2], r = t[4], o = t[1], a = t[3], l = t[5], c = Math.sin(e), h = Math.cos(e);
  return n[0] = i * h + o * c, n[1] = -i * c + o * h, n[2] = s * h + a * c, n[3] = -s * c + h * a, n[4] = h * r + c * l, n[5] = h * l - c * r, n;
}
function dv(n, t, e) {
  var i = e[0], s = e[1];
  return n[0] = t[0] * i, n[1] = t[1] * s, n[2] = t[2] * i, n[3] = t[3] * s, n[4] = t[4] * i, n[5] = t[5] * s, n;
}
function pv(n, t) {
  var e = t[0], i = t[2], s = t[4], r = t[1], o = t[3], a = t[5], l = e * o - r * i;
  return l ? (l = 1 / l, n[0] = o * l, n[1] = -r * l, n[2] = -i * l, n[3] = e * l, n[4] = (i * a - o * s) * l, n[5] = (r * s - e * a) * l, n) : null;
}
var ku = hv, Ou = 5e-5;
function fn(n) {
  return n > Ou || n < -Ou;
}
var dn = [], Qn = [], ka = vo(), Oa = Math.abs, hh = (function() {
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
    return fn(this.rotation) || fn(this.x) || fn(this.y) || fn(this.scaleX - 1) || fn(this.scaleY - 1) || fn(this.skewX) || fn(this.skewY);
  }, n.prototype.updateTransform = function() {
    var t = this.parent && this.parent.transform, e = this.needLocalTransform(), i = this.transform;
    if (!(e || t)) {
      i && ku(i);
      return;
    }
    i = i || vo(), e ? this.getLocalTransform(i) : ku(i), t && (e ? La(i, t, i) : uv(i, t)), this.transform = i, this._resolveGlobalScaleRatio(i);
  }, n.prototype._resolveGlobalScaleRatio = function(t) {
    var e = this.globalScaleRatio;
    if (e != null && e !== 1) {
      this.getGlobalScale(dn);
      var i = dn[0] < 0 ? -1 : 1, s = dn[1] < 0 ? -1 : 1, r = ((dn[0] - i) * e + i) / dn[0] || 0, o = ((dn[1] - s) * e + s) / dn[1] || 0;
      t[0] *= r, t[1] *= r, t[2] *= o, t[3] *= o;
    }
    this.invTransform = this.invTransform || vo(), pv(this.invTransform, t);
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
      t && t.transform && (La(Qn, t.invTransform, e), e = Qn);
      var i = this.originX, s = this.originY;
      (i || s) && (ka[4] = i, ka[5] = s, La(Qn, e, ka), Qn[4] -= i, Qn[5] -= s, e = Qn), this.setLocalTransform(e);
    }
  }, n.prototype.getGlobalScale = function(t) {
    var e = this.transform;
    return t = t || [], e ? (t[0] = Math.sqrt(e[0] * e[0] + e[1] * e[1]), t[1] = Math.sqrt(e[2] * e[2] + e[3] * e[3]), e[0] < 0 && (t[0] = -t[0]), e[3] < 0 && (t[1] = -t[1]), t) : (t[0] = 1, t[1] = 1, t);
  }, n.prototype.transformCoordToLocal = function(t, e) {
    var i = [t, e], s = this.invTransform;
    return s && Se(i, i, s), i;
  }, n.prototype.transformCoordToGlobal = function(t, e) {
    var i = [t, e], s = this.transform;
    return s && Se(i, i, s), i;
  }, n.prototype.getLineScale = function() {
    var t = this.transform;
    return t && Oa(t[0] - 1) > 1e-10 && Oa(t[3] - 1) > 1e-10 ? Math.sqrt(Oa(t[0] * t[3] - t[2] * t[1])) : 1;
  }, n.prototype.copyTransform = function(t) {
    gv(this, t);
  }, n.getLocalTransform = function(t, e) {
    e = e || [];
    var i = t.originX || 0, s = t.originY || 0, r = t.scaleX, o = t.scaleY, a = t.anchorX, l = t.anchorY, c = t.rotation || 0, h = t.x, u = t.y, f = t.skewX ? Math.tan(t.skewX) : 0, d = t.skewY ? Math.tan(-t.skewY) : 0;
    if (i || s || a || l) {
      var p = i + a, _ = s + l;
      e[4] = -p * r - f * _ * o, e[5] = -_ * o - d * p * r;
    } else
      e[4] = e[5] = 0;
    return e[0] = r, e[3] = o, e[1] = d * r, e[2] = f * o, c && fv(e, e, c), e[4] += i + h, e[5] += s + u, e;
  }, n.initDefaultProps = (function() {
    var t = n.prototype;
    t.scaleX = t.scaleY = t.globalScaleRatio = 1, t.x = t.y = t.originX = t.originY = t.skewX = t.skewY = t.rotation = t.anchorX = t.anchorY = 0;
  })(), n;
})(), rn = [
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
function gv(n, t) {
  for (var e = 0; e < rn.length; e++) {
    var i = rn[e];
    n[i] = t[i];
  }
}
var ys = {
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
    return 1 - ys.bounceOut(1 - n);
  },
  bounceOut: function(n) {
    return n < 1 / 2.75 ? 7.5625 * n * n : n < 2 / 2.75 ? 7.5625 * (n -= 1.5 / 2.75) * n + 0.75 : n < 2.5 / 2.75 ? 7.5625 * (n -= 2.25 / 2.75) * n + 0.9375 : 7.5625 * (n -= 2.625 / 2.75) * n + 0.984375;
  },
  bounceInOut: function(n) {
    return n < 0.5 ? ys.bounceIn(n * 2) * 0.5 : ys.bounceOut(n * 2 - 1) * 0.5 + 0.5;
  }
}, mr = Math.pow, Je = Math.sqrt, wo = 1e-8, hg = 1e-4, Fu = Je(3), yr = 1 / 3, ve = Ni(), Ot = Ni(), xi = Ni();
function Ke(n) {
  return n > -wo && n < wo;
}
function ug(n) {
  return n > wo || n < -wo;
}
function St(n, t, e, i, s) {
  var r = 1 - s;
  return r * r * (r * n + 3 * s * t) + s * s * (s * i + 3 * r * e);
}
function fg(n, t, e, i, s, r) {
  var o = i + 3 * (t - e) - n, a = 3 * (e - t * 2 + n), l = 3 * (t - n), c = n - s, h = a * a - 3 * o * l, u = a * l - 9 * o * c, f = l * l - 3 * a * c, d = 0;
  if (Ke(h) && Ke(u))
    if (Ke(a))
      r[0] = 0;
    else {
      var p = -l / a;
      p >= 0 && p <= 1 && (r[d++] = p);
    }
  else {
    var _ = u * u - 4 * h * f;
    if (Ke(_)) {
      var g = u / h, p = -a / o + g, m = -g / 2;
      p >= 0 && p <= 1 && (r[d++] = p), m >= 0 && m <= 1 && (r[d++] = m);
    } else if (_ > 0) {
      var y = Je(_), v = h * a + 1.5 * o * (-u + y), S = h * a + 1.5 * o * (-u - y);
      v < 0 ? v = -mr(-v, yr) : v = mr(v, yr), S < 0 ? S = -mr(-S, yr) : S = mr(S, yr);
      var p = (-a - (v + S)) / (3 * o);
      p >= 0 && p <= 1 && (r[d++] = p);
    } else {
      var x = (2 * h * a - 3 * o * u) / (2 * Je(h * h * h)), w = Math.acos(x) / 3, M = Je(h), b = Math.cos(w), p = (-a - 2 * M * b) / (3 * o), m = (-a + M * (b + Fu * Math.sin(w))) / (3 * o), T = (-a + M * (b - Fu * Math.sin(w))) / (3 * o);
      p >= 0 && p <= 1 && (r[d++] = p), m >= 0 && m <= 1 && (r[d++] = m), T >= 0 && T <= 1 && (r[d++] = T);
    }
  }
  return d;
}
function dg(n, t, e, i, s) {
  var r = 6 * e - 12 * t + 6 * n, o = 9 * t + 3 * i - 3 * n - 9 * e, a = 3 * t - 3 * n, l = 0;
  if (Ke(o)) {
    if (ug(r)) {
      var c = -a / r;
      c >= 0 && c <= 1 && (s[l++] = c);
    }
  } else {
    var h = r * r - 4 * o * a;
    if (Ke(h))
      s[0] = -r / (2 * o);
    else if (h > 0) {
      var u = Je(h), c = (-r + u) / (2 * o), f = (-r - u) / (2 * o);
      c >= 0 && c <= 1 && (s[l++] = c), f >= 0 && f <= 1 && (s[l++] = f);
    }
  }
  return l;
}
function Nu(n, t, e, i, s, r) {
  var o = (t - n) * s + n, a = (e - t) * s + t, l = (i - e) * s + e, c = (a - o) * s + o, h = (l - a) * s + a, u = (h - c) * s + c;
  r[0] = n, r[1] = o, r[2] = c, r[3] = u, r[4] = u, r[5] = h, r[6] = l, r[7] = i;
}
function _v(n, t, e, i, s, r, o, a, l, c, h) {
  var u, f = 5e-3, d = 1 / 0, p, _, g, m;
  ve[0] = l, ve[1] = c;
  for (var y = 0; y < 1; y += 0.05)
    Ot[0] = St(n, e, s, o, y), Ot[1] = St(t, i, r, a, y), g = wi(ve, Ot), g < d && (u = y, d = g);
  d = 1 / 0;
  for (var v = 0; v < 32 && !(f < hg); v++)
    p = u - f, _ = u + f, Ot[0] = St(n, e, s, o, p), Ot[1] = St(t, i, r, a, p), g = wi(Ot, ve), p >= 0 && g < d ? (u = p, d = g) : (xi[0] = St(n, e, s, o, _), xi[1] = St(t, i, r, a, _), m = wi(xi, ve), _ <= 1 && m < d ? (u = _, d = m) : f *= 0.5);
  return Je(d);
}
function mv(n, t, e, i, s, r, o, a, l) {
  for (var c = n, h = t, u = 0, f = 1 / l, d = 1; d <= l; d++) {
    var p = d * f, _ = St(n, e, s, o, p), g = St(t, i, r, a, p), m = _ - c, y = g - h;
    u += Math.sqrt(m * m + y * y), c = _, h = g;
  }
  return u;
}
function Ft(n, t, e, i) {
  var s = 1 - i;
  return s * (s * n + 2 * i * t) + i * i * e;
}
function yv(n, t, e, i, s) {
  var r = n - 2 * t + e, o = 2 * (t - n), a = n - i, l = 0;
  if (Ke(r)) {
    if (ug(o)) {
      var c = -a / o;
      c >= 0 && c <= 1 && (s[l++] = c);
    }
  } else {
    var h = o * o - 4 * r * a;
    if (Ke(h)) {
      var c = -o / (2 * r);
      c >= 0 && c <= 1 && (s[l++] = c);
    } else if (h > 0) {
      var u = Je(h), c = (-o + u) / (2 * r), f = (-o - u) / (2 * r);
      c >= 0 && c <= 1 && (s[l++] = c), f >= 0 && f <= 1 && (s[l++] = f);
    }
  }
  return l;
}
function pg(n, t, e) {
  var i = n + e - 2 * t;
  return i === 0 ? 0.5 : (n - t) / i;
}
function zu(n, t, e, i, s) {
  var r = (t - n) * i + n, o = (e - t) * i + t, a = (o - r) * i + r;
  s[0] = n, s[1] = r, s[2] = a, s[3] = a, s[4] = o, s[5] = e;
}
function vv(n, t, e, i, s, r, o, a, l) {
  var c, h = 5e-3, u = 1 / 0;
  ve[0] = o, ve[1] = a;
  for (var f = 0; f < 1; f += 0.05) {
    Ot[0] = Ft(n, e, s, f), Ot[1] = Ft(t, i, r, f);
    var d = wi(ve, Ot);
    d < u && (c = f, u = d);
  }
  u = 1 / 0;
  for (var p = 0; p < 32 && !(h < hg); p++) {
    var _ = c - h, g = c + h;
    Ot[0] = Ft(n, e, s, _), Ot[1] = Ft(t, i, r, _);
    var d = wi(Ot, ve);
    if (_ >= 0 && d < u)
      c = _, u = d;
    else {
      xi[0] = Ft(n, e, s, g), xi[1] = Ft(t, i, r, g);
      var m = wi(xi, ve);
      g <= 1 && m < u ? (c = g, u = m) : h *= 0.5;
    }
  }
  return Je(u);
}
function wv(n, t, e, i, s, r, o) {
  for (var a = n, l = t, c = 0, h = 1 / o, u = 1; u <= o; u++) {
    var f = u * h, d = Ft(n, e, s, f), p = Ft(t, i, r, f), _ = d - a, g = p - l;
    c += Math.sqrt(_ * _ + g * g), a = d, l = p;
  }
  return c;
}
var xv = /cubic-bezier\(([0-9,\.e ]+)\)/;
function gg(n) {
  var t = n && xv.exec(n);
  if (t) {
    var e = t[1].split(","), i = +lr(e[0]), s = +lr(e[1]), r = +lr(e[2]), o = +lr(e[3]);
    if (isNaN(i + s + r + o))
      return;
    var a = [];
    return function(l) {
      return l <= 0 ? 0 : l >= 1 ? 1 : fg(0, i, r, 1, l, a) && St(0, s, o, 1, a[0]);
    };
  }
}
var Sv = (function() {
  function n(t) {
    this._inited = !1, this._startTime = 0, this._pausedTime = 0, this._paused = !1, this._life = t.life || 1e3, this._delay = t.delay || 0, this.loop = t.loop || !1, this.onframe = t.onframe || Ta, this.ondestroy = t.ondestroy || Ta, this.onrestart = t.onrestart || Ta, t.easing && this.setEasing(t.easing);
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
    this.easing = t, this.easingFunc = Un(t) ? t : ys[t] || gg(t);
  }, n;
})(), _g = /* @__PURE__ */ (function() {
  function n(t) {
    this.value = t;
  }
  return n;
})(), bv = (function() {
  function n() {
    this._len = 0;
  }
  return n.prototype.insert = function(t) {
    var e = new _g(t);
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
})(), uh = (function() {
  function n(t) {
    this._list = new bv(), this._maxSize = 10, this._map = {}, this._maxSize = t;
  }
  return n.prototype.put = function(t, e) {
    var i = this._list, s = this._map, r = null;
    if (s[t] == null) {
      var o = i.len(), a = this._lastRemovedEntry;
      if (o >= this._maxSize && o > 0) {
        var l = i.head;
        i.remove(l), delete s[l.key], r = l.value, this._lastRemovedEntry = l;
      }
      a ? a.value = e : a = new _g(e), a.key = t, i.insertEntry(a), s[t] = a;
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
})(), Bu = {
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
function vs(n) {
  return n = Math.round(n), n < 0 ? 0 : n > 255 ? 255 : n;
}
function $u(n) {
  return n < 0 ? 0 : n > 1 ? 1 : n;
}
function Fa(n) {
  var t = n;
  return t.length && t.charAt(t.length - 1) === "%" ? vs(parseFloat(t) / 100 * 255) : vs(parseInt(t, 10));
}
function ws(n) {
  var t = n;
  return t.length && t.charAt(t.length - 1) === "%" ? $u(parseFloat(t) / 100) : $u(parseFloat(t));
}
function Na(n, t, e) {
  return e < 0 ? e += 1 : e > 1 && (e -= 1), e * 6 < 1 ? n + (t - n) * e * 6 : e * 2 < 1 ? t : e * 3 < 2 ? n + (t - n) * (2 / 3 - e) * 6 : n;
}
function Rt(n, t, e, i, s) {
  return n[0] = t, n[1] = e, n[2] = i, n[3] = s, n;
}
function Ul(n, t) {
  return n[0] = t[0], n[1] = t[1], n[2] = t[2], n[3] = t[3], n;
}
var mg = new uh(20), vr = null;
function Jn(n, t) {
  vr && Ul(vr, t), vr = mg.put(n, vr || t.slice());
}
function xs(n, t) {
  if (n) {
    t = t || [];
    var e = mg.get(n);
    if (e)
      return Ul(t, e);
    n = n + "";
    var i = n.replace(/ /g, "").toLowerCase();
    if (i in Bu)
      return Ul(t, Bu[i]), Jn(n, t), t;
    var s = i.length;
    if (i.charAt(0) === "#") {
      if (s === 4 || s === 5) {
        var r = parseInt(i.slice(1, 4), 16);
        if (!(r >= 0 && r <= 4095)) {
          Rt(t, 0, 0, 0, 1);
          return;
        }
        return Rt(t, (r & 3840) >> 4 | (r & 3840) >> 8, r & 240 | (r & 240) >> 4, r & 15 | (r & 15) << 4, s === 5 ? parseInt(i.slice(4), 16) / 15 : 1), Jn(n, t), t;
      } else if (s === 7 || s === 9) {
        var r = parseInt(i.slice(1, 7), 16);
        if (!(r >= 0 && r <= 16777215)) {
          Rt(t, 0, 0, 0, 1);
          return;
        }
        return Rt(t, (r & 16711680) >> 16, (r & 65280) >> 8, r & 255, s === 9 ? parseInt(i.slice(7), 16) / 255 : 1), Jn(n, t), t;
      }
      return;
    }
    var o = i.indexOf("("), a = i.indexOf(")");
    if (o !== -1 && a + 1 === s) {
      var l = i.substr(0, o), c = i.substr(o + 1, a - (o + 1)).split(","), h = 1;
      switch (l) {
        case "rgba":
          if (c.length !== 4)
            return c.length === 3 ? Rt(t, +c[0], +c[1], +c[2], 1) : Rt(t, 0, 0, 0, 1);
          h = ws(c.pop());
        case "rgb":
          if (c.length >= 3)
            return Rt(t, Fa(c[0]), Fa(c[1]), Fa(c[2]), c.length === 3 ? h : ws(c[3])), Jn(n, t), t;
          Rt(t, 0, 0, 0, 1);
          return;
        case "hsla":
          if (c.length !== 4) {
            Rt(t, 0, 0, 0, 1);
            return;
          }
          return c[3] = ws(c[3]), Hu(c, t), Jn(n, t), t;
        case "hsl":
          if (c.length !== 3) {
            Rt(t, 0, 0, 0, 1);
            return;
          }
          return Hu(c, t), Jn(n, t), t;
        default:
          return;
      }
    }
    Rt(t, 0, 0, 0, 1);
  }
}
function Hu(n, t) {
  var e = (parseFloat(n[0]) % 360 + 360) % 360 / 360, i = ws(n[1]), s = ws(n[2]), r = s <= 0.5 ? s * (i + 1) : s + i - s * i, o = s * 2 - r;
  return t = t || [], Rt(t, vs(Na(o, r, e + 1 / 3) * 255), vs(Na(o, r, e) * 255), vs(Na(o, r, e - 1 / 3) * 255), 1), n.length === 4 && (t[3] = n[3]), t;
}
function Tv(n, t) {
  if (!(!n || !n.length)) {
    var e = n[0] + "," + n[1] + "," + n[2];
    return e += "," + n[3], t + "(" + e + ")";
  }
}
function Gu(n, t) {
  var e = xs(n);
  return e ? (0.299 * e[0] + 0.587 * e[1] + 0.114 * e[2]) * e[3] / 255 + (1 - e[3]) * t : 0;
}
var Mv = /* @__PURE__ */ (function() {
  function n() {
    this.firefox = !1, this.ie = !1, this.edge = !1, this.newEdge = !1, this.weChat = !1;
  }
  return n;
})(), Cv = /* @__PURE__ */ (function() {
  function n() {
    this.browser = new Mv(), this.node = !1, this.wxa = !1, this.worker = !1, this.svgSupported = !1, this.touchEventsSupported = !1, this.pointerEventsSupported = !1, this.domSupported = !1, this.transformSupported = !1, this.transform3dSupported = !1, this.hasGlobalWindow = typeof window != "undefined";
  }
  return n;
})(), me = new Cv();
typeof wx == "object" && typeof wx.getSystemInfoSync == "function" ? (me.wxa = !0, me.touchEventsSupported = !0) : typeof document == "undefined" && typeof self != "undefined" ? me.worker = !0 : typeof navigator == "undefined" ? (me.node = !0, me.svgSupported = !0) : Dv(navigator.userAgent, me);
function Dv(n, t) {
  var e = t.browser, i = n.match(/Firefox\/([\d.]+)/), s = n.match(/MSIE\s([\d.]+)/) || n.match(/Trident\/.+?rv:(([\d.]+))/), r = n.match(/Edge?\/([\d.]+)/), o = /micromessenger/i.test(n);
  i && (e.firefox = !0, e.version = i[1]), s && (e.ie = !0, e.version = s[1]), r && (e.edge = !0, e.version = r[1], e.newEdge = +r[1].split(".")[0] > 18), o && (e.weChat = !0), t.svgSupported = typeof SVGRect != "undefined", t.touchEventsSupported = "ontouchstart" in window && !e.ie && !e.edge, t.pointerEventsSupported = "onpointerdown" in window && (e.edge || e.ie && +e.version >= 11), t.domSupported = typeof document != "undefined";
  var a = document.documentElement.style;
  t.transform3dSupported = (e.ie && "transition" in a || e.edge || "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix() || "MozPerspective" in a) && !("OTransition" in a), t.transformSupported = t.transform3dSupported || e.ie && +e.version >= 9;
}
function Iv(n) {
  return n.type === "linear";
}
function Av(n) {
  return n.type === "radial";
}
(function() {
  return me.hasGlobalWindow && Un(window.btoa) ? function(n) {
    return window.btoa(unescape(encodeURIComponent(n)));
  } : typeof Buffer != "undefined" ? function(n) {
    return Buffer.from(n).toString("base64");
  } : function(n) {
    return null;
  };
})();
var ql = Array.prototype.slice;
function Pe(n, t, e) {
  return (t - n) * e + n;
}
function za(n, t, e, i) {
  for (var s = t.length, r = 0; r < s; r++)
    n[r] = Pe(t[r], e[r], i);
  return n;
}
function Ev(n, t, e, i) {
  for (var s = t.length, r = s && t[0].length, o = 0; o < s; o++) {
    n[o] || (n[o] = []);
    for (var a = 0; a < r; a++)
      n[o][a] = Pe(t[o][a], e[o][a], i);
  }
  return n;
}
function wr(n, t, e, i) {
  for (var s = t.length, r = 0; r < s; r++)
    n[r] = t[r] + e[r] * i;
  return n;
}
function Yu(n, t, e, i) {
  for (var s = t.length, r = s && t[0].length, o = 0; o < s; o++) {
    n[o] || (n[o] = []);
    for (var a = 0; a < r; a++)
      n[o][a] = t[o][a] + e[o][a] * i;
  }
  return n;
}
function Rv(n, t) {
  for (var e = n.length, i = t.length, s = e > i ? t : n, r = Math.min(e, i), o = s[r - 1] || { color: [0, 0, 0, 0], offset: 0 }, a = r; a < Math.max(e, i); a++)
    s.push({
      offset: o.offset,
      color: o.color.slice()
    });
}
function Pv(n, t, e) {
  var i = n, s = t;
  if (!(!i.push || !s.push)) {
    var r = i.length, o = s.length;
    if (r !== o) {
      var a = r > o;
      if (a)
        i.length = o;
      else
        for (var l = r; l < o; l++)
          i.push(e === 1 ? s[l] : ql.call(s[l]));
    }
    for (var c = i[0] && i[0].length, l = 0; l < i.length; l++)
      if (e === 1)
        isNaN(i[l]) && (i[l] = s[l]);
      else
        for (var h = 0; h < c; h++)
          isNaN(i[l][h]) && (i[l][h] = s[l][h]);
  }
}
function Ss(n) {
  if (qt(n)) {
    var t = n.length;
    if (qt(n[0])) {
      for (var e = [], i = 0; i < t; i++)
        e.push(ql.call(n[i]));
      return e;
    }
    return ql.call(n);
  }
  return n;
}
function Jr(n) {
  return n[0] = Math.floor(n[0]) || 0, n[1] = Math.floor(n[1]) || 0, n[2] = Math.floor(n[2]) || 0, n[3] = n[3] == null ? 1 : n[3], "rgba(" + n.join(",") + ")";
}
function Lv(n) {
  return qt(n && n[0]) ? 2 : 1;
}
var xr = 0, to = 1, yg = 2, as = 3, Xl = 4, Zl = 5, Vu = 6;
function Wu(n) {
  return n === Xl || n === Zl;
}
function Sr(n) {
  return n === to || n === yg;
}
var Wi = [0, 0, 0, 0], kv = (function() {
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
    var s = this.keyframes, r = s.length, o = !1, a = Vu, l = e;
    if (qt(e)) {
      var c = Lv(e);
      a = c, (c === 1 && !se(e[0]) || c === 2 && !se(e[0][0])) && (o = !0);
    } else if (se(e) && !Mm(e))
      a = xr;
    else if (Ut(e))
      if (!isNaN(+e))
        a = xr;
      else {
        var h = xs(e);
        h && (l = h, a = as);
      }
    else if (fa(e)) {
      var u = E({}, l);
      u.colorStops = re(e.colorStops, function(d) {
        return {
          offset: d.offset,
          color: xs(d.color)
        };
      }), Iv(e) ? a = Xl : Av(e) && (a = Zl), l = u;
    }
    r === 0 ? this.valType = a : (a !== this.valType || a === Vu) && (o = !0), this.discrete = this.discrete || o;
    var f = {
      time: t,
      value: l,
      rawValue: e,
      percent: 0
    };
    return i && (f.easing = i, f.easingFunc = Un(i) ? i : ys[i] || gg(i)), s.push(f), f;
  }, n.prototype.prepare = function(t, e) {
    var i = this.keyframes;
    this._needsSort && i.sort(function(_, g) {
      return _.time - g.time;
    });
    for (var s = this.valType, r = i.length, o = i[r - 1], a = this.discrete, l = Sr(s), c = Wu(s), h = 0; h < r; h++) {
      var u = i[h], f = u.value, d = o.value;
      u.percent = u.time / t, a || (l && h !== r - 1 ? Pv(f, d, s) : c && Rv(f.colorStops, d.colorStops));
    }
    if (!a && s !== Zl && e && this.needsAnimate() && e.needsAnimate() && s === e.valType && !e._finished) {
      this._additiveTrack = e;
      for (var p = i[0].value, h = 0; h < r; h++)
        s === xr ? i[h].additiveValue = i[h].value - p : s === as ? i[h].additiveValue = wr([], i[h].value, p, -1) : Sr(s) && (i[h].additiveValue = s === to ? wr([], i[h].value, p, -1) : Yu([], i[h].value, p, -1));
    }
  }, n.prototype.step = function(t, e) {
    if (!this._finished) {
      this._additiveTrack && this._additiveTrack._finished && (this._additiveTrack = null);
      var i = this._additiveTrack != null, s = i ? "additiveValue" : "value", r = this.valType, o = this.keyframes, a = o.length, l = this.propName, c = r === as, h, u = this._lastFr, f = Math.min, d, p;
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
        var y = i ? this._additiveValue : c ? Wi : t[l];
        if ((Sr(r) || c) && !y && (y = this._additiveValue = []), this.discrete)
          t[l] = m < 1 ? d.rawValue : p.rawValue;
        else if (Sr(r))
          r === to ? za(y, d[s], p[s], m) : Ev(y, d[s], p[s], m);
        else if (Wu(r)) {
          var v = d[s], S = p[s], x = r === Xl;
          t[l] = {
            type: x ? "linear" : "radial",
            x: Pe(v.x, S.x, m),
            y: Pe(v.y, S.y, m),
            colorStops: re(v.colorStops, function(M, b) {
              var T = S.colorStops[b];
              return {
                offset: Pe(M.offset, T.offset, m),
                color: Jr(za([], M.color, T.color, m))
              };
            }),
            global: S.global
          }, x ? (t[l].x2 = Pe(v.x2, S.x2, m), t[l].y2 = Pe(v.y2, S.y2, m)) : t[l].r = Pe(v.r, S.r, m);
        } else if (c)
          za(y, d[s], p[s], m), i || (t[l] = Jr(y));
        else {
          var w = Pe(d[s], p[s], m);
          i ? this._additiveValue = w : t[l] = w;
        }
        i && this._addToTarget(t);
      }
    }
  }, n.prototype._addToTarget = function(t) {
    var e = this.valType, i = this.propName, s = this._additiveValue;
    e === xr ? t[i] = t[i] + s : e === as ? (xs(t[i], Wi), wr(Wi, Wi, s, 1), t[i] = Jr(Wi)) : e === to ? wr(t[i], t[i], s, 1) : e === yg && Yu(t[i], t[i], s, 1);
  }, n;
})(), vg = (function() {
  function n(t, e, i, s) {
    if (this._tracks = {}, this._trackKeys = [], this._maxTime = 0, this._started = 0, this._clip = null, this._target = t, this._loop = e, e && s) {
      jc("Can' use additive animation on looped animation.");
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
        l = r[a] = new kv(a);
        var c = void 0, h = this._getAdditiveTrack(a);
        if (h) {
          var u = h.keyframes, f = u[u.length - 1];
          c = f && f.value, h.valType === as && c && (c = Jr(c));
        } else
          c = this._target[a];
        if (c == null)
          continue;
        t > 0 && l.addKeyframe(0, Ss(c), s), this._trackKeys.push(a);
      }
      l.addKeyframe(t, Ss(e[a]), s);
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
        var f = new Sv({
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
    return re(this._trackKeys, function(e) {
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
          l && (t[r] = Ss(l.rawValue));
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
})(), br = Math.min, Tr = Math.max, pn = new lt(), gn = new lt(), _n = new lt(), mn = new lt(), Ui = new lt(), qi = new lt(), _t = (function() {
  function n(t, e, i, s) {
    i < 0 && (t = t + i, i = -i), s < 0 && (e = e + s, s = -s), this.x = t, this.y = e, this.width = i, this.height = s;
  }
  return n.prototype.union = function(t) {
    var e = br(t.x, this.x), i = br(t.y, this.y);
    isFinite(this.x) && isFinite(this.width) ? this.width = Tr(t.x + t.width, this.x + this.width) - e : this.width = t.width, isFinite(this.y) && isFinite(this.height) ? this.height = Tr(t.y + t.height, this.y + this.height) - i : this.height = t.height, this.x = e, this.y = i;
  }, n.prototype.applyTransform = function(t) {
    n.applyTransform(this, this, t);
  }, n.prototype.calculateTransform = function(t) {
    var e = this, i = t.width / e.width, s = t.height / e.height, r = vo();
    return Lu(r, r, [-e.x, -e.y]), dv(r, r, [i, s]), Lu(r, r, [t.x, t.y]), r;
  }, n.prototype.intersect = function(t, e) {
    if (!t)
      return !1;
    t instanceof n || (t = n.create(t));
    var i = this, s = i.x, r = i.x + i.width, o = i.y, a = i.y + i.height, l = t.x, c = t.x + t.width, h = t.y, u = t.y + t.height, f = !(r < l || c < s || a < h || u < o);
    if (e) {
      var d = 1 / 0, p = 0, _ = Math.abs(r - l), g = Math.abs(c - s), m = Math.abs(a - h), y = Math.abs(u - o), v = Math.min(_, g), S = Math.min(m, y);
      r < l || c < s ? v > p && (p = v, _ < g ? lt.set(qi, -_, 0) : lt.set(qi, g, 0)) : v < d && (d = v, _ < g ? lt.set(Ui, _, 0) : lt.set(Ui, -g, 0)), a < h || u < o ? S > p && (p = S, m < y ? lt.set(qi, 0, -m) : lt.set(qi, 0, y)) : v < d && (d = v, m < y ? lt.set(Ui, 0, m) : lt.set(Ui, 0, -y));
    }
    return e && lt.copy(e, f ? Ui : qi), f;
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
    pn.x = _n.x = e.x, pn.y = mn.y = e.y, gn.x = mn.x = e.x + e.width, gn.y = _n.y = e.y + e.height, pn.transform(i), mn.transform(i), gn.transform(i), _n.transform(i), t.x = br(pn.x, gn.x, _n.x, mn.x), t.y = br(pn.y, gn.y, _n.y, mn.y);
    var l = Tr(pn.x, gn.x, _n.x, mn.x), c = Tr(pn.y, gn.y, _n.y, mn.y);
    t.width = l - t.x, t.height = c - t.y;
  }, n;
})(), wg = (function() {
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
})(), Uu = {};
function xg(n, t) {
  t = t || Bs;
  var e = Uu[t];
  e || (e = Uu[t] = new uh(500));
  var i = e.get(n);
  return i == null && (i = er.measureText(n, t).width, e.put(n, i)), i;
}
function qu(n, t, e, i) {
  var s = xg(n, t), r = zv(t), o = Fv(0, s, e), a = Nv(0, r, i), l = new _t(o, a, s, r);
  return l;
}
function Ov(n, t, e, i) {
  var s = ((n || "") + "").split(`
`), r = s.length;
  if (r === 1)
    return qu(s[0], t, e, i);
  for (var o = new _t(0, 0, 0, 0), a = 0; a < s.length; a++) {
    var l = qu(s[a], t, e, i);
    a === 0 ? o.copy(l) : o.union(l);
  }
  return o;
}
function Fv(n, t, e) {
  return e === "right" ? n -= t : e === "center" && (n -= t / 2), n;
}
function Nv(n, t, e) {
  return e === "middle" ? n -= t / 2 : e === "bottom" && (n -= t), n;
}
function zv(n) {
  return xg("国", n);
}
function Ei(n, t) {
  return typeof n == "string" ? n.lastIndexOf("%") >= 0 ? parseFloat(n) / 100 * t : parseFloat(n) : n;
}
function Sg(n, t, e) {
  var i = t.position || "inside", s = t.distance != null ? t.distance : 5, r = e.height, o = e.width, a = r / 2, l = e.x, c = e.y, h = "left", u = "top";
  if (i instanceof Array)
    l += Ei(i[0], e.width), c += Ei(i[1], e.height), h = null, u = null;
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
var bg = 1;
me.hasGlobalWindow && (bg = Math.max(window.devicePixelRatio || window.screen && window.screen.deviceXDPI / window.screen.logicalXDPI || 1, 1));
var xo = bg, Bv = 0.4, Kl = "#333", jl = "#ccc", $v = "#eee", Vt = 1, ls = 2, ui = 4, Ba = "__zr_normal__", $a = rn.concat(["ignore"]), Hv = Qc(rn, function(n, t) {
  return n[t] = !0, n;
}, { ignore: !1 }), ti = {}, Gv = new _t(0, 0, 0, 0), fh = (function() {
  function n(t) {
    this.id = xm(), this.animators = [], this.currentStates = [], this.states = {}, this._init(t);
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
        var h = Gv;
        i.layoutRect ? h.copy(i.layoutRect) : h.copy(this.getBoundingRect()), s || h.applyTransform(this.transform), this.calculateTextPosition ? this.calculateTextPosition(ti, i, h) : Sg(ti, i, h), r.x = ti.x, r.y = ti.y, o = ti.align, a = ti.verticalAlign;
        var u = i.origin;
        if (u && i.rotation != null) {
          var f = void 0, d = void 0;
          u === "center" ? (f = h.width * 0.5, d = h.height * 0.5) : (f = Ei(u[0], h.width), d = Ei(u[1], h.height)), c = !0, r.originX = -r.x + f + (s ? 0 : h.x), r.originY = -r.y + d + (s ? 0 : h.y);
        }
      }
      i.rotation != null && (r.rotation = i.rotation);
      var p = i.offset;
      p && (r.x += p[0], r.y += p[1], c || (r.originX = -p[0], r.originY = -p[1]));
      var _ = i.inside == null ? typeof i.position == "string" && i.position.indexOf("inside") >= 0 : i.inside, g = this._innerTextDefaultStyle || (this._innerTextDefaultStyle = {}), m = void 0, y = void 0, v = void 0;
      _ && this.canBeInsideText() ? (m = i.insideFill, y = i.insideStroke, (m == null || m === "auto") && (m = this.getInsideTextFill()), (y == null || y === "auto") && (y = this.getInsideTextStroke(m), v = !0)) : (m = i.outsideFill, y = i.outsideStroke, (m == null || m === "auto") && (m = this.getOutsideFill()), (y == null || y === "auto") && (y = this.getOutsideStroke(m), v = !0)), m = m || "#000", (m !== g.fill || y !== g.stroke || v !== g.autoStroke || o !== g.align || a !== g.verticalAlign) && (l = !0, g.fill = m, g.stroke = y, g.autoStroke = v, g.align = o, g.verticalAlign = a, e.setDefaultTextStyle(g)), e.__dirty |= Vt, l && e.dirtyStyle(!0);
    }
  }, n.prototype.canBeInsideText = function() {
    return !0;
  }, n.prototype.getInsideTextFill = function() {
    return "#fff";
  }, n.prototype.getInsideTextStroke = function(t) {
    return "#000";
  }, n.prototype.getOutsideFill = function() {
    return this.__zr && this.__zr.isDarkMode() ? jl : Kl;
  }, n.prototype.getOutsideStroke = function(t) {
    var e = this.__zr && this.__zr.getBackgroundColor(), i = typeof e == "string" && xs(e);
    i || (i = [255, 255, 255, 1]);
    for (var s = i[3], r = this.__zr.isDarkMode(), o = 0; o < 3; o++)
      i[o] = i[o] * s + (r ? 0 : 255) * (1 - s);
    return i[3] = 1, Tv(i, "rgba");
  }, n.prototype.traverse = function(t, e) {
  }, n.prototype.attrKV = function(t, e) {
    t === "textConfig" ? this.setTextConfig(e) : t === "textContent" ? this.setTextContent(e) : t === "clipPath" ? this.setClipPath(e) : t === "extra" ? (this.extra = this.extra || {}, E(this.extra, e)) : this[t] = e;
  }, n.prototype.hide = function() {
    this.ignore = !0, this.markRedraw();
  }, n.prototype.show = function() {
    this.ignore = !1, this.markRedraw();
  }, n.prototype.attr = function(t, e) {
    if (typeof t == "string")
      this.attrKV(t, e);
    else if (ie(t))
      for (var i = t, s = mt(i), r = 0; r < s.length; r++) {
        var o = s[r];
        this.attrKV(o, t[o]);
      }
    return this.markRedraw(), this;
  }, n.prototype.saveCurrentToNormalState = function(t) {
    this._innerSaveToNormal(t);
    for (var e = this._normalState, i = 0; i < this.animators.length; i++) {
      var s = this.animators[i], r = s.__fromStateTransition;
      if (!(s.getLoop() || r && r !== Ba)) {
        var o = s.targetName, a = o ? e[o] : e;
        s.saveTo(a);
      }
    }
  }, n.prototype._innerSaveToNormal = function(t) {
    var e = this._normalState;
    e || (e = this._normalState = {}), t.textConfig && !e.textConfig && (e.textConfig = this.textConfig), this._savePrimaryToNormal(t, e, $a);
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
    this.useState(Ba, !1, t);
  }, n.prototype.useState = function(t, e, i, s) {
    var r = t === Ba, o = this.hasState();
    if (!(!o && r)) {
      var a = this.currentStates, l = this.stateTransition;
      if (!(Tt(a, t) >= 0 && (e || a.length === 1))) {
        var c;
        if (this.stateProxy && !r && (c = this.stateProxy(t)), c || (c = this.states && this.states[t]), !c && !r) {
          jc("State " + t + " not exists.");
          return;
        }
        r || this.saveCurrentToNormalState(c);
        var h = !!(c && c.hoverLayer || s);
        h && this._toggleHoverLayerFlag(!0), this._applyStateObj(t, c, this._normalState, e, !i && !this.__inHover && l && l.duration > 0, l);
        var u = this._textContent, f = this._textGuide;
        return u && u.useState(t, e, i, h), f && f.useState(t, e, i, h), r ? (this.currentStates = [], this._normalState = {}) : e ? this.currentStates.push(t) : this.currentStates = [t], this._updateAnimationTargets(), this.markRedraw(), !h && this.__inHover && (this._toggleHoverLayerFlag(!1), this.__dirty &= ~Vt), c;
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
      _ && _.useStates(t, e, f), g && g.useStates(t, e, f), this._updateAnimationTargets(), this.currentStates = t.slice(), this.markRedraw(), !f && this.__inHover && (this._toggleHoverLayerFlag(!1), this.__dirty &= ~Vt);
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
      E(e, r), r.textConfig && (i = i || {}, E(i, r.textConfig));
    }
    return i && (e.textConfig = i), e;
  }, n.prototype._applyStateObj = function(t, e, i, s, r, o) {
    var a = !(e && s);
    e && e.textConfig ? (this.textConfig = E({}, s ? this.textConfig : i.textConfig), E(this.textConfig, e.textConfig)) : a && i.textConfig && (this.textConfig = i.textConfig);
    for (var l = {}, c = !1, h = 0; h < $a.length; h++) {
      var u = $a[h], f = r && Hv[u];
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
    e !== t && (e && e !== t && this.removeTextContent(), t.innerTransformable = new hh(), this._attachComponent(t), this._textContent = t, this.markRedraw());
  }, n.prototype.setTextConfig = function(t) {
    this.textConfig || (this.textConfig = {}), E(this.textConfig, t), this.markRedraw();
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
    this.__dirty |= Vt;
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
    var s = t ? this[t] : this, r = new vg(s, e, i);
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
    Ha(this, t, e, i);
  }, n.prototype.animateFrom = function(t, e, i) {
    Ha(this, t, e, i, !0);
  }, n.prototype._transitionState = function(t, e, i, s) {
    for (var r = Ha(this, e, i, s), o = 0; o < r.length; o++)
      r[o].__fromStateTransition = t;
  }, n.prototype.getBoundingRect = function() {
    return null;
  }, n.prototype.getPaintRect = function() {
    return null;
  }, n.initDefaultProps = (function() {
    var t = n.prototype;
    t.type = "element", t.name = "", t.ignore = t.silent = t.isGroup = t.draggable = t.dragging = t.ignoreClip = t.__inHover = !1, t.__dirty = Vt;
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
Oi(fh, wg);
Oi(fh, hh);
function Ha(n, t, e, i, s) {
  e = e || {};
  var r = [];
  Tg(n, "", n, t, e, i, r, s);
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
function Ga(n, t, e) {
  for (var i = 0; i < e; i++)
    n[i] = t[i];
}
function Yv(n) {
  return qt(n[0]);
}
function Vv(n, t, e) {
  if (qt(t[e]))
    if (qt(n[e]) || (n[e] = []), bm(t[e])) {
      var i = t[e].length;
      n[e].length !== i && (n[e] = new t[e].constructor(i), Ga(n[e], t[e], i));
    } else {
      var s = t[e], r = n[e], o = s.length;
      if (Yv(s))
        for (var a = s[0].length, l = 0; l < o; l++)
          r[l] ? Ga(r[l], s[l], a) : r[l] = Array.prototype.slice.call(s[l]);
      else
        Ga(r, s, o);
      r.length = s.length;
    }
  else
    n[e] = t[e];
}
function Wv(n, t) {
  return n === t || qt(n) && qt(t) && Uv(n, t);
}
function Uv(n, t) {
  var e = n.length;
  if (e !== t.length)
    return !1;
  for (var i = 0; i < e; i++)
    if (n[i] !== t[i])
      return !1;
  return !0;
}
function Tg(n, t, e, i, s, r, o, a) {
  for (var l = mt(i), c = s.duration, h = s.delay, u = s.additive, f = s.setToFinal, d = !ie(r), p = n.animators, _ = [], g = 0; g < l.length; g++) {
    var m = l[g], y = i[m];
    if (y != null && e[m] != null && (d || r[m]))
      if (ie(y) && !qt(y) && !fa(y)) {
        if (t) {
          a || (e[m] = y, n.updateDuringAnimation(t));
          continue;
        }
        Tg(n, m, e[m], y, s, r && r[m], o, a);
      } else
        _.push(m);
    else a || (e[m] = y, n.updateDuringAnimation(t), _.push(m));
  }
  var v = _.length;
  if (!u && v)
    for (var S = 0; S < p.length; S++) {
      var x = p[S];
      if (x.targetName === t) {
        var w = x.stopTracks(_);
        if (w) {
          var M = Tt(p, x);
          p.splice(M, 1);
        }
      }
    }
  if (s.force || (_ = ho(_, function(C) {
    return !Wv(i[C], e[C]);
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
        I[m] = Ss(e[m]), Vv(e, i, m);
      }
    }
    var x = new vg(e, !1, !1, u ? ho(p, function(A) {
      return A.targetName === t;
    }) : null);
    x.targetName = t, s.scope && (x.scope = s.scope), f && b && x.whenWithKeys(0, b, _), I && x.whenWithKeys(0, I, _), x.whenWithKeys(c == null ? 500 : c, a ? T : i, _).delay(h || 0), n.addAnimator(x, t), o.push(x);
  }
}
var Ql = "__zr_style_" + Math.round(Math.random() * 10), $n = {
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  shadowColor: "#000",
  opacity: 1,
  blend: "source-over"
}, dh = {
  style: {
    shadowBlur: !0,
    shadowOffsetX: !0,
    shadowOffsetY: !0,
    shadowColor: !0,
    opacity: !0
  }
};
$n[Ql] = !0;
var Xu = ["z", "z2", "invisible"], qv = ["invisible"], ph = (function(n) {
  qn(t, n);
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
    if (this.ignore || this.invisible || this.style.opacity === 0 || this.culling && Xv(this, e, i) || o && !o[0] && !o[3])
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
    return typeof e == "string" ? this.style[e] = i : E(this.style, e), this.dirtyStyle(), this;
  }, t.prototype.dirtyStyle = function(e) {
    e || this.markRedraw(), this.__dirty |= ls, this._rect && (this._rect = null);
  }, t.prototype.dirty = function() {
    this.dirtyStyle();
  }, t.prototype.styleChanged = function() {
    return !!(this.__dirty & ls);
  }, t.prototype.styleUpdated = function() {
    this.__dirty &= ~ls;
  }, t.prototype.createStyle = function(e) {
    return da($n, e);
  }, t.prototype.useStyle = function(e) {
    e[Ql] || (e = this.createStyle(e)), this.__inHover ? this.__hoverStyle = e : this.style = e, this.dirtyStyle();
  }, t.prototype.isStyleObject = function(e) {
    return e[Ql];
  }, t.prototype._innerSaveToNormal = function(e) {
    n.prototype._innerSaveToNormal.call(this, e);
    var i = this._normalState;
    e.style && !i.style && (i.style = this._mergeStyle(this.createStyle(), this.style)), this._savePrimaryToNormal(e, i, Xu);
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
    for (var _ = this.__inHover ? qv : Xu, f = 0; f < _.length; f++) {
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
    return E(e, i), e;
  }, t.prototype.getAnimationStyleProps = function() {
    return dh;
  }, t.initDefaultProps = (function() {
    var e = t.prototype;
    e.type = "displayable", e.invisible = !1, e.z = 0, e.z2 = 0, e.zlevel = 0, e.culling = !1, e.cursor = "pointer", e.rectHover = !1, e.incremental = !1, e._rect = null, e.dirtyRectTolerance = 0, e.__dirty = Vt | ls;
  })(), t;
})(fh), Ya = new _t(0, 0, 0, 0), Va = new _t(0, 0, 0, 0);
function Xv(n, t, e) {
  return Ya.copy(n.getBoundingRect()), n.transform && Ya.applyTransform(n.transform), Va.width = t, Va.height = e, !Ya.intersect(Va);
}
var Nt = Math.min, zt = Math.max, Wa = Math.sin, Ua = Math.cos, yn = Math.PI * 2, Mr = Ni(), Cr = Ni(), Dr = Ni();
function Zu(n, t, e, i, s, r) {
  s[0] = Nt(n, e), s[1] = Nt(t, i), r[0] = zt(n, e), r[1] = zt(t, i);
}
var Ku = [], ju = [];
function Zv(n, t, e, i, s, r, o, a, l, c) {
  var h = dg, u = St, f = h(n, e, s, o, Ku);
  l[0] = 1 / 0, l[1] = 1 / 0, c[0] = -1 / 0, c[1] = -1 / 0;
  for (var d = 0; d < f; d++) {
    var p = u(n, e, s, o, Ku[d]);
    l[0] = Nt(p, l[0]), c[0] = zt(p, c[0]);
  }
  f = h(t, i, r, a, ju);
  for (var d = 0; d < f; d++) {
    var _ = u(t, i, r, a, ju[d]);
    l[1] = Nt(_, l[1]), c[1] = zt(_, c[1]);
  }
  l[0] = Nt(n, l[0]), c[0] = zt(n, c[0]), l[0] = Nt(o, l[0]), c[0] = zt(o, c[0]), l[1] = Nt(t, l[1]), c[1] = zt(t, c[1]), l[1] = Nt(a, l[1]), c[1] = zt(a, c[1]);
}
function Kv(n, t, e, i, s, r, o, a) {
  var l = pg, c = Ft, h = zt(Nt(l(n, e, s), 1), 0), u = zt(Nt(l(t, i, r), 1), 0), f = c(n, e, s, h), d = c(t, i, r, u);
  o[0] = Nt(n, s, f), o[1] = Nt(t, r, d), a[0] = zt(n, s, f), a[1] = zt(t, r, d);
}
function jv(n, t, e, i, s, r, o, a, l) {
  var c = lg, h = cg, u = Math.abs(s - r);
  if (u % yn < 1e-4 && u > 1e-4) {
    a[0] = n - e, a[1] = t - i, l[0] = n + e, l[1] = t + i;
    return;
  }
  if (Mr[0] = Ua(s) * e + n, Mr[1] = Wa(s) * i + t, Cr[0] = Ua(r) * e + n, Cr[1] = Wa(r) * i + t, c(a, Mr, Cr), h(l, Mr, Cr), s = s % yn, s < 0 && (s = s + yn), r = r % yn, r < 0 && (r = r + yn), s > r && !o ? r += yn : s < r && o && (s += yn), o) {
    var f = r;
    r = s, s = f;
  }
  for (var d = 0; d < r; d += Math.PI / 2)
    d > s && (Dr[0] = Ua(d) * e + n, Dr[1] = Wa(d) * i + t, c(a, Dr, a), h(l, Dr, l));
}
var z = {
  M: 1,
  L: 2,
  C: 3,
  Q: 4,
  A: 5,
  Z: 6,
  R: 7
}, vn = [], wn = [], he = [], Ge = [], ue = [], fe = [], qa = Math.min, Xa = Math.max, xn = Math.cos, Sn = Math.sin, Ae = Math.abs, Jl = Math.PI, qe = Jl * 2, Za = typeof Float32Array != "undefined", Xi = [];
function Ka(n) {
  var t = Math.round(n / Jl * 1e8) / 1e8;
  return t % 2 * Jl;
}
function Qv(n, t) {
  var e = Ka(n[0]);
  e < 0 && (e += qe);
  var i = e - n[0], s = n[1];
  s += i, !t && s - e >= qe ? s = e + qe : t && e - s >= qe ? s = e - qe : !t && e > s ? s = e + (qe - Ka(e - s)) : t && e < s && (s = e - (qe - Ka(s - e))), n[0] = e, n[1] = s;
}
var Ri = (function() {
  function n(t) {
    this.dpr = 1, this._xi = 0, this._yi = 0, this._x0 = 0, this._y0 = 0, this._len = 0, t && (this._saveData = !1), this._saveData && (this.data = []);
  }
  return n.prototype.increaseVersion = function() {
    this._version++;
  }, n.prototype.getVersion = function() {
    return this._version;
  }, n.prototype.setScale = function(t, e, i) {
    i = i || 0, i > 0 && (this._ux = Ae(i / xo / t) || 0, this._uy = Ae(i / xo / e) || 0);
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
    var i = Ae(t - this._xi), s = Ae(e - this._yi), r = i > this._ux || s > this._uy;
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
    this._drawPendingPt(), Xi[0] = s, Xi[1] = r, Qv(Xi, o), s = Xi[0], r = Xi[1];
    var a = r - s;
    return this.addData(z.A, t, e, i, i, s, a, 0, o ? 0 : 1), this._ctx && this._ctx.arc(t, e, i, s, r, o), this._xi = xn(r) * i + t, this._yi = Sn(r) * i + e, this;
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
    !(this.data && this.data.length === e) && Za && (this.data = new Float32Array(e));
    for (var i = 0; i < e; i++)
      this.data[i] = t[i];
    this._len = e;
  }, n.prototype.appendPath = function(t) {
    t instanceof Array || (t = [t]);
    for (var e = t.length, i = 0, s = this._len, r = 0; r < e; r++)
      i += t[r].len();
    Za && this.data instanceof Float32Array && (this.data = new Float32Array(s + i));
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
      t instanceof Array && (t.length = this._len, Za && this._len > 11 && (this.data = new Float32Array(t)));
    }
  }, n.prototype.getBoundingRect = function() {
    he[0] = he[1] = ue[0] = ue[1] = Number.MAX_VALUE, Ge[0] = Ge[1] = fe[0] = fe[1] = -Number.MAX_VALUE;
    var t = this.data, e = 0, i = 0, s = 0, r = 0, o;
    for (o = 0; o < this._len; ) {
      var a = t[o++], l = o === 1;
      switch (l && (e = t[o], i = t[o + 1], s = e, r = i), a) {
        case z.M:
          e = s = t[o++], i = r = t[o++], ue[0] = s, ue[1] = r, fe[0] = s, fe[1] = r;
          break;
        case z.L:
          Zu(e, i, t[o], t[o + 1], ue, fe), e = t[o++], i = t[o++];
          break;
        case z.C:
          Zv(e, i, t[o++], t[o++], t[o++], t[o++], t[o], t[o + 1], ue, fe), e = t[o++], i = t[o++];
          break;
        case z.Q:
          Kv(e, i, t[o++], t[o++], t[o], t[o + 1], ue, fe), e = t[o++], i = t[o++];
          break;
        case z.A:
          var c = t[o++], h = t[o++], u = t[o++], f = t[o++], d = t[o++], p = t[o++] + d;
          o += 1;
          var _ = !t[o++];
          l && (s = xn(d) * u + c, r = Sn(d) * f + h), jv(c, h, u, f, d, p, _, ue, fe), e = xn(p) * u + c, i = Sn(p) * f + h;
          break;
        case z.R:
          s = e = t[o++], r = i = t[o++];
          var g = t[o++], m = t[o++];
          Zu(s, r, s + g, r + m, ue, fe);
          break;
        case z.Z:
          e = s, i = r;
          break;
      }
      lg(he, he, ue), cg(Ge, Ge, fe);
    }
    return o === 0 && (he[0] = he[1] = Ge[0] = Ge[1] = 0), new _t(he[0], he[1], Ge[0] - he[0], Ge[1] - he[1]);
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
          (Ae(y) > i || Ae(v) > s || f === e - 1) && (_ = Math.sqrt(y * y + v * v), r = g, o = m);
          break;
        }
        case z.C: {
          var S = t[f++], x = t[f++], g = t[f++], m = t[f++], w = t[f++], M = t[f++];
          _ = mv(r, o, S, x, g, m, w, M, 10), r = w, o = M;
          break;
        }
        case z.Q: {
          var S = t[f++], x = t[f++], g = t[f++], m = t[f++];
          _ = wv(r, o, S, x, g, m, 10), r = g, o = m;
          break;
        }
        case z.A:
          var b = t[f++], T = t[f++], I = t[f++], C = t[f++], A = t[f++], R = t[f++], F = R + A;
          f += 1, t[f++], p && (a = xn(A) * I + b, l = Sn(A) * C + T), _ = Xa(I, C) * qa(qe, Math.abs(R)), r = xn(F) * I + b, o = Sn(F) * C + T;
          break;
        case z.R: {
          a = r = t[f++], l = o = t[f++];
          var V = t[f++], G = t[f++];
          _ = V * 2 + G * 2;
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
    var i = this.data, s = this._ux, r = this._uy, o = this._len, a, l, c, h, u, f, d = e < 1, p, _, g = 0, m = 0, y, v = 0, S, x;
    if (!(d && (this._pathSegLen || this._calculateLength(), p = this._pathSegLen, _ = this._pathLen, y = e * _, !y)))
      t: for (var w = 0; w < o; ) {
        var M = i[w++], b = w === 1;
        switch (b && (c = i[w], h = i[w + 1], a = c, l = h), M !== z.L && v > 0 && (t.lineTo(S, x), v = 0), M) {
          case z.M:
            a = c = i[w++], l = h = i[w++], t.moveTo(c, h);
            break;
          case z.L: {
            u = i[w++], f = i[w++];
            var T = Ae(u - c), I = Ae(f - h);
            if (T > s || I > r) {
              if (d) {
                var C = p[m++];
                if (g + C > y) {
                  var A = (y - g) / C;
                  t.lineTo(c * (1 - A) + u * A, h * (1 - A) + f * A);
                  break t;
                }
                g += C;
              }
              t.lineTo(u, f), c = u, h = f, v = 0;
            } else {
              var R = T * T + I * I;
              R > v && (S = u, x = f, v = R);
            }
            break;
          }
          case z.C: {
            var F = i[w++], V = i[w++], G = i[w++], rt = i[w++], ae = i[w++], j = i[w++];
            if (d) {
              var C = p[m++];
              if (g + C > y) {
                var A = (y - g) / C;
                Nu(c, F, G, ae, A, vn), Nu(h, V, rt, j, A, wn), t.bezierCurveTo(vn[1], wn[1], vn[2], wn[2], vn[3], wn[3]);
                break t;
              }
              g += C;
            }
            t.bezierCurveTo(F, V, G, rt, ae, j), c = ae, h = j;
            break;
          }
          case z.Q: {
            var F = i[w++], V = i[w++], G = i[w++], rt = i[w++];
            if (d) {
              var C = p[m++];
              if (g + C > y) {
                var A = (y - g) / C;
                zu(c, F, G, A, vn), zu(h, V, rt, A, wn), t.quadraticCurveTo(vn[1], wn[1], vn[2], wn[2]);
                break t;
              }
              g += C;
            }
            t.quadraticCurveTo(F, V, G, rt), c = G, h = rt;
            break;
          }
          case z.A:
            var It = i[w++], nt = i[w++], dt = i[w++], $ = i[w++], L = i[w++], it = i[w++], wt = i[w++], le = !i[w++], Be = dt > $ ? dt : $, $i = Ae(dt - $) > 1e-3, $e = L + it, zh = !1;
            if (d) {
              var C = p[m++];
              g + C > y && ($e = L + it * (y - g) / C, zh = !0), g += C;
            }
            if ($i && t.ellipse ? t.ellipse(It, nt, dt, $, wt, L, $e, le) : t.arc(It, nt, Be, L, $e, le), zh)
              break t;
            b && (a = xn(L) * dt + It, l = Sn(L) * $ + nt), c = xn($e) * dt + It, h = Sn($e) * $ + nt;
            break;
          case z.R:
            a = c = i[w], l = h = i[w + 1], u = i[w++], f = i[w++];
            var Zn = i[w++], Hi = i[w++];
            if (d) {
              var C = p[m++];
              if (g + C > y) {
                var ce = y - g;
                t.moveTo(u, f), t.lineTo(u + qa(ce, Zn), f), ce -= Zn, ce > 0 && t.lineTo(u + Zn, f + qa(ce, Hi)), ce -= Hi, ce > 0 && t.lineTo(u + Xa(Zn - ce, 0), f + Hi), ce -= Zn, ce > 0 && t.lineTo(u, f + Xa(Hi - ce, 0));
                break t;
              }
              g += C;
            }
            t.rect(u, f, Zn, Hi);
            break;
          case z.Z:
            if (d) {
              var C = p[m++];
              if (g + C > y) {
                var A = (y - g) / C;
                t.lineTo(c * (1 - A) + a * A, h * (1 - A) + l * A);
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
function ei(n, t, e, i, s, r, o) {
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
function Jv(n, t, e, i, s, r, o, a, l, c, h) {
  if (l === 0)
    return !1;
  var u = l;
  if (h > t + u && h > i + u && h > r + u && h > a + u || h < t - u && h < i - u && h < r - u && h < a - u || c > n + u && c > e + u && c > s + u && c > o + u || c < n - u && c < e - u && c < s - u && c < o - u)
    return !1;
  var f = _v(n, t, e, i, s, r, o, a, c, h);
  return f <= u / 2;
}
function tw(n, t, e, i, s, r, o, a, l) {
  if (o === 0)
    return !1;
  var c = o;
  if (l > t + c && l > i + c && l > r + c || l < t - c && l < i - c && l < r - c || a > n + c && a > e + c && a > s + c || a < n - c && a < e - c && a < s - c)
    return !1;
  var h = vv(n, t, e, i, s, r, a, l);
  return h <= c / 2;
}
var Qu = Math.PI * 2;
function Ir(n) {
  return n %= Qu, n < 0 && (n += Qu), n;
}
var Zi = Math.PI * 2;
function ew(n, t, e, i, s, r, o, a, l) {
  if (o === 0)
    return !1;
  var c = o;
  a -= n, l -= t;
  var h = Math.sqrt(a * a + l * l);
  if (h - c > e || h + c < e)
    return !1;
  if (Math.abs(i - s) % Zi < 1e-4)
    return !0;
  if (r) {
    var u = i;
    i = Ir(s), s = Ir(u);
  } else
    i = Ir(i), s = Ir(s);
  i > s && (s += Zi);
  var f = Math.atan2(l, a);
  return f < 0 && (f += Zi), f >= i && f <= s || f + Zi >= i && f + Zi <= s;
}
function bn(n, t, e, i, s, r) {
  if (r > t && r > i || r < t && r < i || i === t)
    return 0;
  var o = (r - t) / (i - t), a = i < t ? 1 : -1;
  (o === 1 || o === 0) && (a = i < t ? 0.5 : -0.5);
  var l = o * (e - n) + n;
  return l === s ? 1 / 0 : l > s ? a : 0;
}
var Ye = Ri.CMD, Tn = Math.PI * 2, nw = 1e-4;
function iw(n, t) {
  return Math.abs(n - t) < nw;
}
var ct = [-1, -1, -1], Lt = [-1, -1];
function sw() {
  var n = Lt[0];
  Lt[0] = Lt[1], Lt[1] = n;
}
function rw(n, t, e, i, s, r, o, a, l, c) {
  if (c > t && c > i && c > r && c > a || c < t && c < i && c < r && c < a)
    return 0;
  var h = fg(t, i, r, a, c, ct);
  if (h === 0)
    return 0;
  for (var u = 0, f = -1, d = void 0, p = void 0, _ = 0; _ < h; _++) {
    var g = ct[_], m = g === 0 || g === 1 ? 0.5 : 1, y = St(n, e, s, o, g);
    y < l || (f < 0 && (f = dg(t, i, r, a, Lt), Lt[1] < Lt[0] && f > 1 && sw(), d = St(t, i, r, a, Lt[0]), f > 1 && (p = St(t, i, r, a, Lt[1]))), f === 2 ? g < Lt[0] ? u += d < t ? m : -m : g < Lt[1] ? u += p < d ? m : -m : u += a < p ? m : -m : g < Lt[0] ? u += d < t ? m : -m : u += a < d ? m : -m);
  }
  return u;
}
function ow(n, t, e, i, s, r, o, a) {
  if (a > t && a > i && a > r || a < t && a < i && a < r)
    return 0;
  var l = yv(t, i, r, a, ct);
  if (l === 0)
    return 0;
  var c = pg(t, i, r);
  if (c >= 0 && c <= 1) {
    for (var h = 0, u = Ft(t, i, r, c), f = 0; f < l; f++) {
      var d = ct[f] === 0 || ct[f] === 1 ? 0.5 : 1, p = Ft(n, e, s, ct[f]);
      p < o || (ct[f] < c ? h += u < t ? d : -d : h += r < u ? d : -d);
    }
    return h;
  } else {
    var d = ct[0] === 0 || ct[0] === 1 ? 0.5 : 1, p = Ft(n, e, s, ct[0]);
    return p < o ? 0 : r < t ? d : -d;
  }
}
function aw(n, t, e, i, s, r, o, a) {
  if (a -= t, a > e || a < -e)
    return 0;
  var l = Math.sqrt(e * e - a * a);
  ct[0] = -l, ct[1] = l;
  var c = Math.abs(i - s);
  if (c < 1e-4)
    return 0;
  if (c >= Tn - 1e-4) {
    i = 0, s = Tn;
    var h = r ? 1 : -1;
    return o >= ct[0] + n && o <= ct[1] + n ? h : 0;
  }
  if (i > s) {
    var u = i;
    i = s, s = u;
  }
  i < 0 && (i += Tn, s += Tn);
  for (var f = 0, d = 0; d < 2; d++) {
    var p = ct[d];
    if (p + n > o) {
      var _ = Math.atan2(a, p), h = r ? 1 : -1;
      _ < 0 && (_ = Tn + _), (_ >= i && _ <= s || _ + Tn >= i && _ + Tn <= s) && (_ > Math.PI / 2 && _ < Math.PI * 1.5 && (h = -h), f += h);
    }
  }
  return f;
}
function Mg(n, t, e, i, s) {
  for (var r = n.data, o = n.len(), a = 0, l = 0, c = 0, h = 0, u = 0, f, d, p = 0; p < o; ) {
    var _ = r[p++], g = p === 1;
    switch (_ === Ye.M && p > 1 && (e || (a += bn(l, c, h, u, i, s))), g && (l = r[p], c = r[p + 1], h = l, u = c), _) {
      case Ye.M:
        h = r[p++], u = r[p++], l = h, c = u;
        break;
      case Ye.L:
        if (e) {
          if (ei(l, c, r[p], r[p + 1], t, i, s))
            return !0;
        } else
          a += bn(l, c, r[p], r[p + 1], i, s) || 0;
        l = r[p++], c = r[p++];
        break;
      case Ye.C:
        if (e) {
          if (Jv(l, c, r[p++], r[p++], r[p++], r[p++], r[p], r[p + 1], t, i, s))
            return !0;
        } else
          a += rw(l, c, r[p++], r[p++], r[p++], r[p++], r[p], r[p + 1], i, s) || 0;
        l = r[p++], c = r[p++];
        break;
      case Ye.Q:
        if (e) {
          if (tw(l, c, r[p++], r[p++], r[p], r[p + 1], t, i, s))
            return !0;
        } else
          a += ow(l, c, r[p++], r[p++], r[p], r[p + 1], i, s) || 0;
        l = r[p++], c = r[p++];
        break;
      case Ye.A:
        var m = r[p++], y = r[p++], v = r[p++], S = r[p++], x = r[p++], w = r[p++];
        p += 1;
        var M = !!(1 - r[p++]);
        f = Math.cos(x) * v + m, d = Math.sin(x) * S + y, g ? (h = f, u = d) : a += bn(l, c, f, d, i, s);
        var b = (i - m) * S / v + m;
        if (e) {
          if (ew(m, y, S, x, x + w, M, t, b, s))
            return !0;
        } else
          a += aw(m, y, S, x, x + w, M, b, s);
        l = Math.cos(x + w) * v + m, c = Math.sin(x + w) * S + y;
        break;
      case Ye.R:
        h = l = r[p++], u = c = r[p++];
        var T = r[p++], I = r[p++];
        if (f = h + T, d = u + I, e) {
          if (ei(h, u, f, u, t, i, s) || ei(f, u, f, d, t, i, s) || ei(f, d, h, d, t, i, s) || ei(h, d, h, u, t, i, s))
            return !0;
        } else
          a += bn(f, u, f, d, i, s), a += bn(h, d, h, u, i, s);
        break;
      case Ye.Z:
        if (e) {
          if (ei(l, c, h, u, t, i, s))
            return !0;
        } else
          a += bn(l, c, h, u, i, s);
        l = h, c = u;
        break;
    }
  }
  return !e && !iw(c, u) && (a += bn(l, c, h, u, i, s) || 0), a !== 0;
}
function lw(n, t, e) {
  return Mg(n, 0, !1, t, e);
}
function cw(n, t, e, i) {
  return Mg(n, t, !0, e, i);
}
var Cg = Ce({
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
}, $n), hw = {
  style: Ce({
    fill: !0,
    stroke: !0,
    strokePercent: !0,
    fillOpacity: !0,
    strokeOpacity: !0,
    lineDashOffset: !0,
    lineWidth: !0,
    miterLimit: !0
  }, dh.style)
}, ja = rn.concat([
  "invisible",
  "culling",
  "z",
  "z2",
  "zlevel",
  "parent"
]), tc = (function(n) {
  qn(t, n);
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
      for (var a = 0; a < ja.length; ++a)
        s[ja[a]] = this[ja[a]];
      s.__dirty |= Vt;
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
      o === "style" ? this.style ? E(this.style, a) : this.useStyle(a) : o === "shape" ? E(this.shape, a) : n.prototype.attrKV.call(this, o, a);
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
      if (Ut(e)) {
        var i = Gu(e, 0);
        return i > 0.5 ? Kl : i > 0.2 ? $v : jl;
      } else if (e)
        return jl;
    }
    return Kl;
  }, t.prototype.getInsideTextStroke = function(e) {
    var i = this.style.fill;
    if (Ut(i)) {
      var s = this.__zr, r = !!(s && s.isDarkMode()), o = Gu(e, 0) < Bv;
      if (r === o)
        return i;
    }
  }, t.prototype.buildPath = function(e, i, s) {
  }, t.prototype.pathUpdated = function() {
    this.__dirty &= ~ui;
  }, t.prototype.getUpdatedPathProxy = function(e) {
    return !this.path && this.createPathProxy(), this.path.beginPath(), this.buildPath(this.path, this.shape, e), this.path;
  }, t.prototype.createPathProxy = function() {
    this.path = new Ri(!1);
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
      (r || this.__dirty & ui) && (o.beginPath(), this.buildPath(o, this.shape, !1), this.pathUpdated()), e = o.getBoundingRect();
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
        if (c > 1e-10 && (this.hasFill() || (l = Math.max(l, this.strokeContainThreshold)), cw(a, l / c, e, i)))
          return !0;
      }
      if (this.hasFill())
        return lw(a, e, i);
    }
    return !1;
  }, t.prototype.dirtyShape = function() {
    this.__dirty |= ui, this._rect && (this._rect = null), this._decalEl && this._decalEl.dirtyShape(), this.markRedraw();
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
    return s || (s = this.shape = {}), typeof e == "string" ? s[e] = i : E(s, e), this.dirtyShape(), this;
  }, t.prototype.shapeChanged = function() {
    return !!(this.__dirty & ui);
  }, t.prototype.createStyle = function(e) {
    return da(Cg, e);
  }, t.prototype._innerSaveToNormal = function(e) {
    n.prototype._innerSaveToNormal.call(this, e);
    var i = this._normalState;
    e.shape && !i.shape && (i.shape = E({}, this.shape));
  }, t.prototype._applyStateObj = function(e, i, s, r, o, a) {
    n.prototype._applyStateObj.call(this, e, i, s, r, o, a);
    var l = !(i && r), c;
    if (i && i.shape ? o ? r ? c = i.shape : (c = E({}, s.shape), E(c, i.shape)) : (c = E({}, r ? this.shape : s.shape), E(c, i.shape)) : l && (c = s.shape), c)
      if (o) {
        this.shape = E({}, this.shape);
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
    return hw;
  }, t.prototype.isZeroArea = function() {
    return !1;
  }, t.extend = function(e) {
    var i = (function(r) {
      qn(o, r);
      function o(a) {
        var l = r.call(this, a) || this;
        return e.init && e.init.call(l, a), l;
      }
      return o.prototype.getDefaultStyle = function() {
        return Di(e.style);
      }, o.prototype.getDefaultShape = function() {
        return Di(e.shape);
      }, o;
    })(t);
    for (var s in e)
      typeof e[s] == "function" && (i.prototype[s] = e[s]);
    return i;
  }, t.initDefaultProps = (function() {
    var e = t.prototype;
    e.type = "path", e.strokeContainThreshold = 5, e.segmentIgnoreThreshold = 0, e.subPixelOptimize = !1, e.autoBatch = !1, e.__dirty = Vt | ls | ui;
  })(), t;
})(ph), ni = Ri.CMD, uw = [[], [], []], Ju = Math.sqrt, fw = Math.atan2;
function dw(n, t) {
  if (t) {
    var e = n.data, i = n.len(), s, r, o, a, l, c, h = ni.M, u = ni.C, f = ni.L, d = ni.R, p = ni.A, _ = ni.Q;
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
          var g = t[4], m = t[5], y = Ju(t[0] * t[0] + t[1] * t[1]), v = Ju(t[2] * t[2] + t[3] * t[3]), S = fw(-t[1] / v, t[0] / y);
          e[o] *= y, e[o++] += g, e[o] *= v, e[o++] += m, e[o++] *= y, e[o++] *= v, e[o++] += S, e[o++] += S, o += 2, a = o;
          break;
        case d:
          c[0] = e[o++], c[1] = e[o++], Se(c, c, t), e[a++] = c[0], e[a++] = c[1], c[0] += e[o++], c[1] += e[o++], Se(c, c, t), e[a++] = c[0], e[a++] = c[1];
      }
      for (l = 0; l < r; l++) {
        var x = uw[l];
        x[0] = e[o++], x[1] = e[o++], Se(x, x, t), e[a++] = x[0], e[a++] = x[1];
      }
    }
    n.increaseVersion();
  }
}
var Qa = Math.sqrt, Ar = Math.sin, Er = Math.cos, Ki = Math.PI;
function tf(n) {
  return Math.sqrt(n[0] * n[0] + n[1] * n[1]);
}
function ec(n, t) {
  return (n[0] * t[0] + n[1] * t[1]) / (tf(n) * tf(t));
}
function ef(n, t) {
  return (n[0] * t[1] < n[1] * t[0] ? -1 : 1) * Math.acos(ec(n, t));
}
function nf(n, t, e, i, s, r, o, a, l, c, h) {
  var u = l * (Ki / 180), f = Er(u) * (n - e) / 2 + Ar(u) * (t - i) / 2, d = -1 * Ar(u) * (n - e) / 2 + Er(u) * (t - i) / 2, p = f * f / (o * o) + d * d / (a * a);
  p > 1 && (o *= Qa(p), a *= Qa(p));
  var _ = (s === r ? -1 : 1) * Qa((o * o * (a * a) - o * o * (d * d) - a * a * (f * f)) / (o * o * (d * d) + a * a * (f * f))) || 0, g = _ * o * d / a, m = _ * -a * f / o, y = (n + e) / 2 + Er(u) * g - Ar(u) * m, v = (t + i) / 2 + Ar(u) * g + Er(u) * m, S = ef([1, 0], [(f - g) / o, (d - m) / a]), x = [(f - g) / o, (d - m) / a], w = [(-1 * f - g) / o, (-1 * d - m) / a], M = ef(x, w);
  if (ec(x, w) <= -1 && (M = Ki), ec(x, w) >= 1 && (M = 0), M < 0) {
    var b = Math.round(M / Ki * 1e6) / 1e6;
    M = Ki * 2 + b % 2 * Ki;
  }
  h.addData(c, y, v, o, a, S, M, u, r);
}
var pw = /([mlvhzcqtsa])([^mlvhzcqtsa]*)/ig, gw = /-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g;
function _w(n) {
  var t = new Ri();
  if (!n)
    return t;
  var e = 0, i = 0, s = e, r = i, o, a = Ri.CMD, l = n.match(pw);
  if (!l)
    return t;
  for (var c = 0; c < l.length; c++) {
    for (var h = l[c], u = h.charAt(0), f = void 0, d = h.match(gw) || [], p = d.length, _ = 0; _ < p; _++)
      d[_] = parseFloat(d[_]);
    for (var g = 0; g < p; ) {
      var m = void 0, y = void 0, v = void 0, S = void 0, x = void 0, w = void 0, M = void 0, b = e, T = i, I = void 0, C = void 0;
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
          v = d[g++], S = d[g++], x = d[g++], w = d[g++], M = d[g++], b = e, T = i, e = d[g++], i = d[g++], f = a.A, nf(b, T, e, i, w, M, v, S, x, f, t);
          break;
        case "a":
          v = d[g++], S = d[g++], x = d[g++], w = d[g++], M = d[g++], b = e, T = i, e += d[g++], i += d[g++], f = a.A, nf(b, T, e, i, w, M, v, S, x, f, t);
          break;
      }
    }
    (u === "z" || u === "Z") && (f = a.Z, t.addData(f), e = s, i = r), o = f;
  }
  return t.toStatic(), t;
}
var mw = (function(n) {
  qn(t, n);
  function t() {
    return n !== null && n.apply(this, arguments) || this;
  }
  return t.prototype.applyTransform = function(e) {
  }, t;
})(tc);
function yw(n) {
  return n.setData != null;
}
function vw(n, t) {
  var e = _w(n), i = E({}, t);
  return i.buildPath = function(s) {
    if (yw(s)) {
      s.setData(e.data);
      var r = s.getContext();
      r && s.rebuildPath(r, 1);
    } else {
      var r = s;
      e.rebuildPath(r, 1);
    }
  }, i.applyTransform = function(s) {
    dw(e, s), this.dirtyShape();
  }, i;
}
function ww(n, t) {
  return new mw(vw(n, t));
}
var xw = Ce({
  x: 0,
  y: 0
}, $n), Sw = {
  style: Ce({
    x: !0,
    y: !0,
    width: !0,
    height: !0,
    sx: !0,
    sy: !0,
    sWidth: !0,
    sHeight: !0
  }, dh.style)
};
function bw(n) {
  return !!(n && typeof n != "string" && n.width && n.height);
}
var gh = (function(n) {
  qn(t, n);
  function t() {
    return n !== null && n.apply(this, arguments) || this;
  }
  return t.prototype.createStyle = function(e) {
    return da(xw, e);
  }, t.prototype._getSize = function(e) {
    var i = this.style, s = i[e];
    if (s != null)
      return s;
    var r = bw(i.image) ? i.image : this.__image;
    if (!r)
      return 0;
    var o = e === "width" ? "height" : "width", a = i[o];
    return a == null ? r[e] : r[e] / r[o] * a;
  }, t.prototype.getWidth = function() {
    return this._getSize("width");
  }, t.prototype.getHeight = function() {
    return this._getSize("height");
  }, t.prototype.getAnimationStyleProps = function() {
    return Sw;
  }, t.prototype.getBoundingRect = function() {
    var e = this.style;
    return this._rect || (this._rect = new _t(e.x || 0, e.y || 0, this.getWidth(), this.getHeight())), this._rect;
  }, t;
})(ph);
gh.prototype.type = "image";
function Dg(n, t, e, i, s) {
  let r;
  if (t && t.piModel) {
    const l = t.piModel.getUpdatePayload();
    r = l && l.animation;
  }
  const o = t && t.isAnimationEnabled(), a = n === "update";
  if (o) {
    let l, c, h;
    return i ? (l = Nl(i.duration, 200), c = Nl(i.easing, "cubicOut"), h = 0) : (l = t.getShallow(
      a ? "animationDurationUpdate" : "animationDuration"
    ), c = t.getShallow(
      a ? "animationEasingUpdate" : "animationEasing"
    ), h = t.getShallow(
      a ? "animationDelayUpdate" : "animationDelay"
    )), r && (r.duration != null && (l = r.duration), r.easing != null && (c = r.easing), r.delay != null && (h = r.delay)), Un(h) && (h = h(e, s)), Un(l) && (l = l(e)), {
      duration: l || 0,
      delay: h,
      easing: c
    };
  } else
    return null;
}
function Tw(n, t, e, i, s, r, o) {
  let a = !1;
  Un(s) ? (o = r, r = s, s = null) : ie(s) && (r = s.cb, o = s.during, a = s.isFrom, s.removeOpt, s = s.dataIndex), t.stopAnimation("leave");
  const l = Dg(
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
function Mw(n, t, e, i, s, r) {
  Tw("update", n, t, e, i, s, r);
}
function Cw(n) {
  if (!n.__zr)
    return !0;
  for (let t = 0; t < n.animators.length; t++)
    if (n.animators[t].scope === "leave")
      return !0;
  return !1;
}
const di = Math.round;
function Dw(n, t, e) {
  if (!t)
    return;
  const i = t.x1, s = t.x2, r = t.y1, o = t.y2;
  n.x1 = i, n.x2 = s, n.y1 = r, n.y2 = o;
  const a = e && e.lineWidth;
  return a && (di(i * 2) === di(s * 2) && (n.x1 = n.x2 = sf(i, a)), di(r * 2) === di(o * 2) && (n.y1 = n.y2 = sf(r, a))), n;
}
function sf(n, t, e) {
  if (!t)
    return n;
  const i = di(n * 2);
  return (i + di(t)) % 2 === 0 ? i / 2 : (i + 1) / 2;
}
const Xn = ft(), Iw = (n, t, e, i) => {
  if (i) {
    const s = Xn(i);
    s.dataIndex = e, s.dataType = t, s.seriesIndex = n, i.type === "group" && i.traverse(function(r) {
      const o = Xn(r);
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
const nc = {};
function Aw(n, t) {
  const e = zrender.matrix.identity([]);
  for (; n && n !== t; )
    zrender.matrix.mul(e, n.getLocalTransform(), e), n = n.parent;
  return e;
}
function So(n, t, e) {
  return t && !qt(t) && (t = hh.getLocalTransform(t)), e && (t = zrender.matrix.invert([], t)), zrender.vector.applyTransform([], n, t);
}
function Ew(n, t, e) {
  const i = t[4] === 0 || t[5] === 0 || t[0] === 0 ? 1 : Math.abs(2 * t[4] / t[0]), s = t[4] === 0 || t[5] === 0 || t[2] === 0 ? 1 : Math.abs(2 * t[4] / t[2]);
  let r = [
    n === "left" ? -i : n === "right" ? i : 0,
    n === "top" ? -s : n === "bottom" ? s : 0
  ];
  return r = So(r, t, e), Math.abs(r[0]) > Math.abs(r[1]) ? r[0] > 0 ? "right" : "left" : r[1] > 0 ? "bottom" : "top";
}
function rf(n, t) {
  let e;
  n.isGroup && (e = t(n)), e || n.traverse(t);
}
function Rw(n, t) {
  if (n)
    if (Ii(n))
      for (let e = 0; e < n.length; e++)
        rf(n[e], t);
    else
      rf(n, t);
}
function Ig(n, t, e, i) {
  const s = ww(n, t);
  return e && (i === "center" && (e = Ag(e, s.getBoundingRect())), Lw(s, e)), s;
}
function Pw(n, t, e) {
  const i = new gh({
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
        i.setStyle(Ag(t, r));
      }
    }
  });
  return i;
}
function Ag(n, t) {
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
function Lw(n, t) {
  if (!n.applyTransform)
    return;
  const i = n.getBoundingRect().calculateTransform(t);
  n.applyTransform(i);
}
function Eg(n, t) {
  return Dw(n, n, { lineWidth: t }), n;
}
function kw(n, t) {
  nc[n] = t;
}
function Ow(n) {
  if (nc.hasOwnProperty(n))
    return nc[n];
}
function Fw(n, t, e) {
  if (!n || !t)
    return;
  function i(o) {
    const a = {};
    return o.traverse(function(l) {
      of(l) && l.anid && (a[l.anid] = l);
    }), a;
  }
  function s(o) {
    const a = {
      x: o.x,
      y: o.y,
      rotation: o.rotation
    };
    return Nw(o) && (a.shape = E({}, o.shape)), a;
  }
  const r = i(n);
  t.traverse(function(o) {
    if (of(o) && o.anid) {
      const a = r[o.anid];
      if (a) {
        const l = s(o);
        o.attr(s(a)), Mw(o, l, e, Xn(o).dataIndex);
      }
    }
  });
}
function of(n) {
  return !n.isGroup;
}
function Nw(n) {
  return n.shape != null;
}
kw("rect", zrender.Rect);
const ji = 4, zw = 6, Bw = 1, af = 30, lf = 5, cf = 5, hf = 30, uf = 0.8, ff = 0.2, tt = "horizontal", ii = "vertical", Vo = class Vo extends Vl {
  constructor() {
    super(...arguments), this.type = Vo.type, this._displayables = {};
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
    if (this._orient === ii && i) {
      const r = new (void 0)({
        shape: {
          x: i.x,
          y: 0,
          width: i.width,
          height: s.getHeight()
        }
      });
      e.setClipPath(r);
    } else if (this._orient === tt) {
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
    if (this._orient === ii && r)
      this._hanldeEnd = r.x, this._size = [r.x, 0];
    else if (this._orient === tt) {
      const o = this._getHorizontalDataZoomBottom() + Bw;
      this._horizontalMinHandleEnd == null && (this._horizontalMinHandleEnd = this._getHorizontalDragMinHandleEnd(r)), this._horizontalMaxHandleEnd == null && (this._horizontalMaxHandleEnd = o), i === void 0 ? this._hanldeEnd = o : this._hanldeEnd = s.height * sc(i, this._orient), this._hanldeEnd = Math.max(
        this._horizontalMinHandleEnd,
        Math.min(this._hanldeEnd, this._horizontalMaxHandleEnd)
      ), this._size = [0, this._hanldeEnd];
    } else
      this._size = [s.width * sc(i, this._orient), 0], this._hanldeEnd = this._size[1];
  }
  _getHorizontalDragMinHandleEnd(t) {
    return t ? t.y : 0;
  }
  _getHorizontalDataZoomTop() {
    const t = this.api, e = { width: t.getWidth(), height: t.getHeight() };
    let i = null;
    return t.getModel().eachComponent("dataZoom", function(s) {
      if (s.subType !== "slider" || s.getOrient() !== tt || s.get("show") === !1)
        return;
      i = Hs(
        $s(s.option),
        e
      ).y;
    }), i;
  }
  _getHorizontalDataZoomBottom() {
    const t = this.api, e = { width: t.getWidth(), height: t.getHeight() };
    let i = e.height;
    return t.getModel().eachComponent("dataZoom", function(s) {
      if (s.subType !== "slider" || s.getOrient() !== tt || s.get("show") === !1)
        return;
      const r = Hs(
        $s(s.option),
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
        x: 0,
        y: 0,
        width: this._orient === tt ? i.getWidth() : ji,
        height: this._orient === tt ? ji : i.getHeight()
      },
      style: {
        fill: e.get("backgroundColor")
      },
      cursor: df(this._orient),
      zlevel: s,
      z2: 1e4
    });
    o.attr({
      x: this._orient === ii ? this._size[0] : 0,
      y: this._orient === tt ? this._size[1] : 0
    });
    const a = new zrender.Image({
      style: {
        image: r,
        width: this._orient === tt ? af : cf,
        height: this._orient === tt ? lf : hf
      },
      cursor: df(this._orient),
      zlevel: s,
      z2: 10001
    });
    this._orient === tt && (a.__testId = "horizontal-split-handle"), a.attr(this._getHandleIconPosition(this._hanldeEnd)), this._orient !== tt && t.add(o), t.add(a), t.attr({
      draggable: !0,
      drift: P(this._onDragMove, this),
      ondragend: P(this._onDrageEnd, this)
    }), this._displayables.handle = o, this._displayables.handleIcon = a;
  }
  _getHandleIconPosition(t) {
    return this._orient === tt ? {
      x: this.api.getWidth() / 2 - af / 2,
      y: t + ji / 2 - lf / 2
    } : {
      x: t + ji / 2 - cf / 2,
      y: this.api.getHeight() / 2 - hf / 2
    };
  }
  updateInterval(t) {
    return this._hanldeEnd += t, this._orient === tt && (this._hanldeEnd = Math.max(
      this._horizontalMinHandleEnd,
      Math.min(this._hanldeEnd, this._horizontalMaxHandleEnd)
    )), !0;
  }
  _updateView() {
    const t = this._hanldeEnd;
    this._displayables.handle.attr({
      x: this._orient === ii ? t : 0,
      y: this._orient === tt ? t : 0
    }), this._displayables.handleIcon.attr(
      this._getHandleIconPosition(t)
    );
  }
  _onDragMove(t, e, i) {
    this._dragging = !0, ye(i.event);
    const s = this._displayables.sliderGroup.getLocalTransform(), r = So([t, e], s, !0), o = this._orient === tt ? r[1] : r[0];
    if (this.updateInterval(o), !this._boundaryDefinition())
      if (this._updateView(), this._orient === ii) {
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
    if (this._dragging = !1, this._orient === ii) {
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
    return this._orient === tt ? !1 : this._hanldeEnd <= 0 || this._hanldeEnd >= this.api.getWidth() - ji;
  }
  eachRendered(t) {
    Rw(this.group, t);
  }
  getOrient() {
    return this._orient;
  }
  getPos() {
    var t, e;
    return (e = (t = this._displayables) == null ? void 0 : t.sliderGroup) == null ? void 0 : e.getBoundingRect();
  }
};
Vo.type = "split.slider";
let ic = Vo;
function sc(n, t) {
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
      e = t === tt ? uf : ff;
  }
  return t === tt ? uf : ff;
}
function df(n) {
  return n == "vertical" ? "col-resize" : "row-resize";
}
const pi = class pi extends W {
  constructor() {
    super(...arguments), this.type = pi.type;
  }
  getOrient() {
    return this._orient;
  }
};
pi.type = "split", pi.dependencies = [], pi.defaultOption = {
  z: 10
};
let bo = pi;
const Ds = class Ds extends bo {
  constructor() {
    super(...arguments), this.type = Ds.type;
  }
};
Ds.type = "split.slider", Ds.defaultOption = Zc(
  bo.defaultOption,
  {
    show: !0,
    backgroundColor: "#eee",
    zlevel: 1e3
  }
);
let rc = Ds;
function $w(n) {
  n.registerComponentModel(rc), n.registerComponentView(ic), cv(n), n.registerSubTypeDefaulter("split", function() {
    return "slider";
  });
}
class Hw {
  constructor(t) {
    this.coordSysDims = [], this.axisMap = O(), this.categoryAxisMap = O(), this.coordSysName = t;
  }
}
function Gw(n) {
  const t = n.get("coordinateSystem"), e = new Hw(t), i = Yw[t];
  if (i)
    return i(
      n,
      e,
      e.axisMap,
      e.categoryAxisMap
    ), e;
}
const Yw = {
  cartesian2d: function(n, t, e, i) {
    const s = n.getReferringComponents(
      "xAxis",
      Te
    ).models[0], r = n.getReferringComponents(
      "yAxis",
      Te
    ).models[0];
    t.coordSysDims = ["x", "y"], e.set("x", s), e.set("y", r), pf(s) && (i.set("x", s), t.firstCategoryDimIndex = 0), pf(r) && (i.set("y", r), t.firstCategoryDimIndex == null && (t.firstCategoryDimIndex = 1));
  }
};
function pf(n) {
  return n.get("type") === "category";
}
function Vw(n) {
  return n === "category" ? "ordinal" : n === "time" ? "time" : "float";
}
function Ww(n, t) {
  const e = {}, i = e.encode = {}, s = O();
  let r = [], o = [];
  const a = {};
  D(n.dimensions, function(f) {
    const d = n.getDimensionInfo(f), p = d.coordDim;
    if (p) {
      const _ = d.coordDimIndex;
      Ja(i, p)[_] = f, d.isExtraCoord || (s.set(p, 1), Uw(d.type) && (r[0] = f), Ja(a, p)[_] = n.getDimensionIndex(d.name)), d.defaultTooltip && o.push(f);
    }
    Ep.each(function(_, g) {
      const m = Ja(i, g), y = d.otherDims[g];
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
  return u && u.length ? o = u.slice() : o.length || (o = r.slice()), i.defaultedLabel = r, i.defaultedTooltip = o, e.userOutput = new qw(a, t), e;
}
function Ja(n, t) {
  return n.hasOwnProperty(t) || (n[t] = []), n[t];
}
function Uw(n) {
  return !(n === "ordinal" || n === "time");
}
class qw {
  constructor(t, e) {
    this._encode = t, this._schema = e;
  }
}
class eo {
  constructor(t) {
    this.otherDims = {}, t != null && N(this, t);
  }
}
function tl(n) {
  return n == null ? 0 : n.length || 1;
}
function gf(n) {
  return n;
}
class Rg {
  constructor(t, e, i, s, r, o) {
    this._old = t, this._new = e, this._oldKeyGetter = i || gf, this._newKeyGetter = s || gf, this.context = r, this._diffModeMultiple = o === "multiple";
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
      const a = s[o], l = i[a], c = tl(l);
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
      const l = e[a], c = tl(l);
      c === 0 ? (e[a] = o, r && i.push(a)) : c === 1 ? e[a] = [l, o] : l.push(o);
    }
  }
  _performRestAdd(t, e) {
    for (let i = 0; i < t.length; i++) {
      const s = t[i], r = e[s], o = tl(r);
      if (o > 1)
        for (let a = 0; a < o; a++)
          this._add && this._add(r[a]);
      else o === 1 && this._add && this._add(r);
      e[s] = null;
    }
  }
}
const Xw = typeof Int32Array == "undefined" ? Array : Int32Array, Zw = "p\0\0", Kw = -1, jw = [
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
], Qw = ["_approximateExtent"];
let _f, Rr, Pr, Qi, el, mf, yf;
const Is = class Is {
  constructor(t, e) {
    this._idList = [], this._calculationInfo = {}, this._visual = {}, this._graphicEls = [], this._itemVisuals = [], this._dimOmitted = !1, this.hasItemOption = !1, this.TRANSFERABLE_METHODS = [
      "cloneShallow",
      "downSample",
      "lttbDownSample",
      "map"
    ], this.CHANGABLE_METHODS = ["filterSelf", "selectRange"], this.DOWNSAMPLE_METHODS = ["downSample", "lttbDownSample"], this._nameList = [], this._approximateExtent = {};
    let i;
    Qp(t) ? (i = t.dimensions, this._dimOmitted = t.isDimensionOmitted(), this._schema = t) : i = t, i = i || ["x", "y"];
    const s = {};
    let r = !1;
    const o = [], a = {};
    for (let l = 0; l < (i == null ? void 0 : i.length); l++) {
      const c = i[l], h = q(c) ? new eo({ name: c }) : c instanceof eo ? c : new eo(c), u = h == null ? void 0 : h.name;
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
    return Pr(this, this.getRawIndex(t));
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
    if (t instanceof Gs && (s = t), !s) {
      const r = this.dimensions, o = eh(t) || Ct(t) ? new fo(
        t,
        r == null ? void 0 : r.length
      ) : t;
      s = new Gs();
      const a = H(
        r,
        (l) => ({
          type: this._dimInfos[l].type,
          property: l
        })
      );
      s.initData(o, a, i);
    }
    this._store = s, this._nameList = (e || []).slice(), this._idList = [], this._nameRepeatCount = {}, this._doInit(0, s.count()), this._dimSummary = Ww(this, this._schema), this.userOutput = this._dimSummary.userOutput;
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
    if (s.getSource().sourceFormat === oe && !s.pure) {
      const c = [];
      for (let h = t; h < e; h++) {
        const u = s.getItem(h, c);
        if (!this.hasItemOption && J0(u) && (this.hasItemOption = !0), u) {
          const f = u.name;
          r[h] == null && f != null && (r[h] = Fe(f, null));
          const d = u.id;
          o[h] == null && d != null && (o[h] = Fe(d, null));
        }
      }
    }
    if (this._shouldMakeIdFromName())
      for (let c = t; c < e; c++)
        yf(this, c);
    _f(this);
  }
  _shouldMakeIdFromName() {
    const t = this._store.getProvider();
    return this._idDimIdx == null && t.getSource().sourceFormat !== Qe && !t.fillStorage;
  }
  //创建一个数据的对比器
  diff(t) {
    const e = this;
    return new Rg(
      t ? t.getStore().getIndices() : [],
      this.getStore().getIndices(),
      function(i) {
        return Pr(t, i);
      },
      function(i) {
        return Pr(e, i);
      }
    );
  }
  /**
   * Set graphic element relative to data. It can be set as null
   */
  setItemGraphicEl(t, e) {
    const i = this.hostModel && this.hostModel.seriesIndex;
    Iw(i, this.dataType, t, e), this._graphicEls[t] = e;
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
    if (xe(t) || // If being a number-like string but not being defined as a dimension name.
    t != null && !isNaN(t) && !this._getDimInfo(t) && (!this._dimOmitted || this._schema.getSourceDimensionIndex(t) < 0))
      return +t;
  }
  count() {
    return this._store.count();
  }
  cloneShallow(t) {
    return t || (t = new Is(
      this._schema ? this._schema : H(this.dimensions, this._getDimInfo, this),
      this.hostModel
    )), el(t, this), t._store = this._store, t;
  }
  each(t, e, i) {
    Q(t) && (i = e, e = t, t = []);
    const s = i || this, r = H(
      Rr(t),
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
      Rr(t),
      this._getStoreDimIndex,
      this
    );
    return this._store = this._store.filter(
      r,
      s ? P(e, s) : e
    ), this;
  }
  selectRange(t) {
    const e = {}, i = J(t);
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
      Rr(t),
      this._getStoreDimIndex,
      this
    ), a = mf(this);
    return a._store = this._store.map(o, r ? P(e, r) : e), a;
  }
  wrapMethod(t, e) {
    const i = this[t];
    Q(i) && (this.__wrappedMethods = this.__wrappedMethods || [], this.__wrappedMethods.push(t), this[t] = function() {
      const s = i.apply(this, arguments);
      return e.apply(this, [s].concat(Uc(arguments)));
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
    return i == null && this._nameDimIdx != null && (i = Qi(this, this._nameDimIdx, e)), i == null && (i = ""), i;
  }
  setCalculationInfo(t, e) {
    k(t) ? N(this._calculationInfo, t) : this._calculationInfo[t] = e;
  }
  getCalculationInfo(t) {
    return this._calculationInfo[t];
  }
  // eslint-disable-next-line
  setItemVisual(t, e, i) {
    const s = this._itemVisuals[t] || {};
    this._itemVisuals[t] = s, k(e) ? N(s, e) : s[e] = i;
  }
  clearAllVisual() {
    this._visual = {}, this._itemVisuals = [];
  }
};
Is.internalField = (function() {
  _f = function(t) {
    const e = t._invertedIndicesMap;
    D(e, function(i, s) {
      const r = t._dimInfos[s], o = r.ordinalMeta, a = t._store;
      if (o) {
        i = e[s] = new Xw(
          o.categories.length
        );
        for (let l = 0; l < i.length; l++)
          i[l] = Kw;
        for (let l = 0; l < a.count(); l++)
          i[a.get(r.storeDimIndex, l)] = l;
      }
    });
  }, Rr = function(t) {
    return K(t) || (t = t !== null ? [t] : []), t;
  }, mf = function(t) {
    const e = new Is(
      t._schema ? t._schema : H(t.dimensions, t._getDimInfo, t),
      t.hostModel
    );
    return el(e, t), e;
  }, el = function(t, e) {
    D(
      jw.concat(e.__wrappedMethods || []),
      function(i) {
        e.hasOwnProperty(i) && (t[i] = e[i]);
      }
    ), t.__wrappedMethods = e.__wrappedMethods, D(Qw, function(i) {
      t[i] = U(e[i]);
    }), t._calculationInfo = N({}, e._calculationInfo);
  }, Pr = function(t, e) {
    let i = t._idList[e];
    return i == null && t._idDimIdx != null && (i = Qi(t, t._idDimIdx, e)), i == null && (i = Zw + e), i;
  }, Qi = function(t, e, i) {
    return Fe(t._getCategory(e, i), null);
  }, yf = function(t, e) {
    const i = t._nameList, s = t._idList, r = t._nameDimIdx, o = t._idDimIdx;
    let a = i[e], l = s[e];
    if (a == null && r != null && (i[e] = a = Qi(t, r, e)), l == null && o != null && (s[e] = l = Qi(t, o, e)), l == null && a != null) {
      const c = t._nameRepeatCount, h = c[a] = (c[a] || 0) + 1;
      l = a, h > 1 && (l += "__pi__" + h), s[e] = l;
    }
  };
})();
let oc = Is;
function Jw(n, t) {
  eh(n) || (n = kp(n)), t = t || {};
  const e = t.coordDimensions || [], i = t.dimensionsDefine || n.dimensionsDefine || [], s = O(), r = [], o = ex(n, e, i, t.dimensionsCount), a = t.canOmitUnusedDimensions && ay(o), l = i === n.dimensionsDefine, c = l ? tg(n) : Jp(i);
  let h = t.encodeDefine;
  !h && t.encodeDefaulter && (h = t.encodeDefaulter(n, o));
  const u = O(
    h
  ), f = new Jm(o);
  for (let x = 0; x < f.length; x++)
    f[x] = -1;
  function d(x) {
    const w = f[x];
    if (w < 0) {
      const M = i[x], b = k(M) ? M : { name: M }, T = new eo(), I = b.name;
      I != null && c.get(I) != null && (T.name = T.displayName = I), b.type != null && (T.type = b.type), b.displayName != null && (T.displayName = b.displayName);
      const C = r.length;
      return f[x] = C, T.storeDimIndex = x, r.push(T), T;
    }
    return r[w];
  }
  if (!a)
    for (let x = 0; x < o; x++)
      d(x);
  u.each(function(x, w) {
    const M = Wt(x).slice();
    if (M.length === 1 && !q(M[0]) && M[0] < 0) {
      u.set(w, !1);
      return;
    }
    const b = u.set(w, []);
    D(M, function(T, I) {
      const C = q(T) ? c.get(T) : T;
      C != null && C < o && (b[I] = C, _(d(C), w, I));
    });
  });
  let p = 0;
  D(e, function(x) {
    let w, M, b, T;
    if (q(x))
      w = x, T = {};
    else {
      T = x, w = T.name;
      const C = T.ordinalMeta;
      T.ordinalMeta = null, T = N({}, T), T.ordinalMeta = C, M = T.dimsDef, b = T.otherDims, T.name = T.coordDim = T.coordDimIndex = T.dimsDef = T.otherDims = null;
    }
    let I = u.get(w);
    if (I !== !1) {
      if (I = Wt(I), !I.length)
        for (let C = 0; C < (M && M.length || 1); C++) {
          for (; p < o && d(p).coordDim != null; )
            p++;
          p < o && I.push(p++);
        }
      D(I, function(C, A) {
        const R = d(C);
        if (l && T.type != null && (R.type = T.type), _(yt(R, T), w, A), R.name == null && M) {
          let F = M[A];
          !k(F) && (F = {
            name: F
          }), R.name = R.displayName = F.name, R.defaultTooltip = F.defaultTooltip;
        }
        b && yt(R.otherDims, b);
      });
    }
  });
  function _(x, w, M) {
    Ep.get(w) != null ? x.otherDims[w] = M : (x.coordDim = w, x.coordDimIndex = M, s.set(w, !0));
  }
  const g = t.generateCoord;
  let m = t.generateCoordCount;
  const y = m != null;
  m = g ? m || 1 : 0;
  const v = g || "value";
  function S(x) {
    x.name == null && (x.name = x.coordDim);
  }
  if (a)
    D(r, (x) => {
      S(x);
    }), r.sort((x, w) => x.storeDimIndex - w.storeDimIndex);
  else
    for (let x = 0; x < o; x++) {
      const w = d(x);
      w.coordDim == null && (w.coordDim = nx(v, s, y), w.coordDimIndex = 0, (!g || m <= 0) && (w.isExtraCoord = !0), m--), S(w), w.type == null && (Lp(n, x) === xt.Must || // Consider the case:
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
      w.isExtraCoord && (w.otherDims.itemName != null || w.otherDims.seriesName != null)) && (w.type = "ordinal");
    }
  return tx(r), new jp({
    source: n,
    dimensions: r,
    fullDimensionCount: o,
    dimensionOmitted: a
  });
}
function tx(n) {
  const t = O();
  for (let e = 0; e < n.length; e++) {
    const i = n[e], s = i.name;
    let r = t.get(s) || 0;
    r > 0 && (i.name = s + (r - 1)), r++, t.set(s, r);
  }
}
function ex(n, t, e, i) {
  let s = Math.max(
    n.dimensionsDetectedCount || 1,
    t.length,
    e.length,
    i || 0
  );
  return D(t, function(r) {
    let o;
    k(r) && (o = r.dimsDef) && (s = Math.max(s, o.length));
  }), s;
}
function nx(n, t, e) {
  if (e || t.hasKey(n)) {
    let i = 0;
    for (; t.hasKey(n + i); )
      i++;
    n += i;
  }
  return t.set(n, !0), n;
}
function ix(n, t) {
  const e = n.get("coordinateSystem"), i = Ys.get(e);
  let s;
  return t && t.coordSysDims && (s = H(t.coordSysDims, function(r) {
    const o = {
      name: r
    }, a = t.axisMap.get(r);
    if (a) {
      const l = a.get("type");
      o.type = Vw(l);
    }
    return o;
  })), s || (s = i && (i.getDimensionsInfo ? i.getDimensionsInfo() : i.dimensions.slice()) || ["x", "y"]), s;
}
function sx(n, t, e) {
  e = e || {};
  const i = t.getSourceManager();
  let s, r = !1;
  s = i.getSource(), r = s.sourceFormat === oe;
  const o = Gw(t), a = ix(t, o), l = e.useEncodeDefaulter, c = Q(l) ? l : l ? lo(
    i1,
    a,
    t
  ) : null, h = {
    coordDimensions: a,
    generateCoord: e.generateCoord,
    encodeDefine: t.getEncode(),
    encodeDefaulter: c,
    canOmitUnusedDimensions: !r
  }, u = Jw(s, h), f = rx(
    u == null ? void 0 : u.dimensions,
    e.createInvertedIndices,
    o
  ), d = r ? null : i.getSharedDataStore(u), p = hy(t, { schema: u, store: d }), _ = new oc(u, t);
  _.setCalculationInfo(p);
  const g = f != null && ox(s) ? function(m, y, v, S) {
    return S === f ? v : this.defaultDimValueGetter(m, y, v, S);
  } : null;
  return _.hasItemOption = !1, _.initData(
    // Try to reuse the data store in sourceManager if using dataset.
    r ? s : d,
    null,
    g
  ), _;
}
function rx(n, t, e) {
  let i, s;
  return e && D(n, function(r, o) {
    const a = r.coordDim, l = e.categoryAxisMap.get(a);
    l && (i == null && (i = o), r.ordinalMeta = l.getOrdinalMeta(), t && (r.createInvertedIndices = !0)), r.otherDims.itemName != null && (s = !0);
  }), !s && i != null && (n[i].otherDims.itemName = 0), i;
}
function ox(n) {
  if (n.sourceFormat === oe) {
    const t = ax(n.data || []);
    return !K(aa(t));
  }
}
function ax(n) {
  let t = 0;
  for (; t < n.length && n[t] == null; )
    t++;
  return n[t];
}
ft();
const tn = ft(), As = class As extends po {
  constructor() {
    super(...arguments), this.type = As.type;
  }
  getInitialData(t, e) {
    return sx(null, this);
  }
};
As.type = "series.custom", As.defaultOption = {
  coordinateSystem: "cartesian2d",
  z: 2,
  clip: !1
};
let ac = As;
function lx(n, t) {
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
function cx(n) {
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
      size: P(lx, n)
    }
  };
}
const lc = ["", "style", "shape", "extra"], Pg = {
  position: ["x", "y"],
  scale: ["scaleX", "scaleY"],
  origin: ["originX", "originY"]
}, vf = mt(Pg), _e = {}, hx = {
  // Usually other props do not need to be changed in animation during.
  setTransform(n, t) {
    return _e.el[n] = t, this;
  },
  getTransform(n) {
    return _e.el[n];
  },
  setShape(n, t) {
    const e = _e.el, i = e.shape || (e.shape = {});
    return i[n] = t, e.dirtyShape && e.dirtyShape(), this;
  },
  getShape(n) {
    const t = _e.el.shape;
    if (t)
      return t[n];
  },
  setStyle(n, t) {
    const e = _e.el, i = e.style;
    return i && (i[n] = t, e.dirtyStyle && e.dirtyStyle()), this;
  },
  getStyle(n) {
    const t = _e.el.style;
    if (t)
      return t[n];
  },
  setExtra(n, t) {
    const e = _e.el.extra || (_e.el.extra = {});
    return e[n] = t, this;
  },
  getExtra(n) {
    const t = _e.el.extra;
    if (t)
      return t[n];
  }
}, Pi = ft();
function _h(n, t, e, i, s) {
  const r = `${n}Animation`, o = Dg(n, i, s) || {}, a = Pi(t).userDuring;
  return o.duration > 0 && (o.during = a ? Ol(fx, { el: t, userDuring: a }) : null, o.setToFinal = !0, o.scope = n), E(o, e[r]), o;
}
function mh(n, t, e, i) {
  if (n) {
    const s = n.parent, r = Pi(n).leaveToProps;
    if (r) {
      const o = _h(
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
function ux(n, t, e, i) {
  i = i || {};
  const { dataIndex: s, isInit: r, clearStyle: o } = i, a = e.isAnimationEnabled(), l = Pi(n), c = t.style;
  l.userDuring = t.during;
  const h = {}, u = {};
  if (px(n, t, u), xf("shape", t, u), xf("extra", t, u), !r && a && (dx(n, t, h), wf("shape", n, t, h), wf("extra", n, t, h), gx(n, t, c, h)), u.style = c, _x(n, u, o), vx(n, t), a)
    if (r) {
      const f = {};
      et(lc, (p) => {
        const _ = p ? t[p] : t;
        _ && _.enterFrom && (p && (f[p] = f[p] || {}), E(
          p ? f[p] : f,
          _.enterFrom
        ));
      });
      const d = _h(
        "enter",
        n,
        t,
        e,
        s
      );
      d.duration > 0 && n.animateFrom(f, d);
    } else
      yx(
        n,
        t,
        s || 0,
        e,
        h
      );
  mx(n, t), c ? n.dirty() : n.markRedraw();
}
function fx() {
  const n = this, t = n.el;
  if (!t)
    return;
  const e = Pi(t).userDuring, i = n.userDuring;
  if (e !== i) {
    n.el = n.userDuring = null;
    return;
  }
  _e.el = t, i(hx);
}
function wf(n, t, e, i) {
  const s = e[n];
  if (!s)
    return;
  const r = t[n];
  let o;
  if (r) {
    const a = e.transition, l = s.transition;
    if (l)
      if (!o && (o = i[n] = {}), Si(l))
        E(o, r);
      else {
        const c = Wt(l);
        for (let h = 0; h < c.length; h++) {
          const u = c[h], f = r[u];
          o[u] = f;
        }
      }
    else if (Si(a) || Tt(a, n) >= 0) {
      !o && (o = i[n] = {});
      const c = mt(r);
      for (let h = 0; h < c.length; h++) {
        const u = c[h], f = r[u];
        xx(s[u], f) && (o[u] = f);
      }
    }
  }
}
function xf(n, t, e) {
  const i = t[n];
  if (!i)
    return;
  const s = e[n] = {}, r = mt(i);
  for (let o = 0; o < r.length; o++) {
    const a = r[o];
    s[a] = Ss(i[a]);
  }
}
function dx(n, t, e) {
  const i = t.transition, s = Si(i) ? rn : Wt(i || []);
  for (let r = 0; r < s.length; r++) {
    const o = s[r];
    if (o === "style" || o === "shape" || o === "extra")
      continue;
    const a = n[o];
    e[o] = a;
  }
}
function px(n, t, e) {
  for (let i = 0; i < vf.length; i++) {
    const s = vf[i], r = Pg[s], o = t[s];
    o && (e[r[0]] = o[0], e[r[1]] = o[1]);
  }
  for (let i = 0; i < rn.length; i++) {
    const s = rn[i];
    t[s] != null && (e[s] = t[s]);
  }
}
function gx(n, t, e, i) {
  if (!e)
    return;
  const s = n.style;
  let r;
  if (s) {
    const o = e.transition, a = t.transition;
    if (o && !Si(o)) {
      const l = Wt(o);
      !r && (r = i.style = {});
      for (let c = 0; c < l.length; c++) {
        const h = l[c], u = s[h];
        r[h] = u;
      }
    } else if (n.getAnimationStyleProps && (Si(a) || Si(o) || Tt(a, "style") >= 0)) {
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
function _x(n, t, e) {
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
function mx(n, t) {
  let e = Pi(n).leaveToProps;
  for (let i = 0; i < lc.length; i++) {
    const s = lc[i], r = s ? t[s] : t;
    r && r.leaveTo && (e || (e = Pi(n).leaveToProps = {}), s && (e[s] = e[s] || {}), E(
      s ? e[s] : e,
      r.leaveTo
    ));
  }
}
function yx(n, t, e, i, s) {
  if (s) {
    const r = _h(
      "update",
      n,
      t,
      i,
      e
    );
    r.duration > 0 && n.animateFrom(s, r);
  }
}
function vx(n, t) {
  cr(t, "silent") && (n.silent = t.silent), cr(t, "ignore") && (n.ignore = t.ignore), n instanceof zrender.Displayable && cr(t, "invisible") && (n.invisible = t.invisible), n instanceof zrender.Path && cr(t, "autoBatch") && (n.autoBatch = t.autoBatch);
}
function Si(n) {
  return n === "all";
}
function xx(n, t) {
  return qt(n) ? n !== t : n != null && isFinite(n);
}
const Sx = ft();
function bx(n) {
  n.stopAnimation("keyframe"), n.attr(Sx(n));
}
const Tx = (void 0).extend({
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
}), Mx = (void 0).extend({
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
}), Cx = (void 0).extend({
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
}), Dx = (void 0).extend({
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
}), Ix = {
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
}, Ax = {
  line: void 0,
  rect: void 0,
  roundRect: void 0,
  square: void 0,
  circle: void 0,
  diamond: Mx,
  pin: Cx,
  arrow: Dx,
  triangle: Tx
}, To = {};
et(Ax, function(n, t) {
  To[t] = new n();
});
const Ex = (void 0).extend({
  type: "symbol",
  shape: {
    symbolType: "",
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  calculateTextPosition(n, t, e) {
    const i = Sg(n, t, e), s = this.shape;
    return s && s.symbolType === "pin" && t.position === "inside" && (i.y = e.y + e.height * 0.4), i;
  },
  buildPath(n, t, e) {
    let i = t.symbolType;
    if (i !== "none") {
      let s = To[i];
      s || (i = "rect", s = To[i]), Ix[i](
        t.x,
        t.y,
        t.width,
        t.height,
        s.shape
      ), s.buildPath(n, s.shape, e);
    }
  }
});
function Rx(n, t) {
  if (this.type !== "image") {
    const e = this.style;
    this.__isEmptyBrush ? (e.stroke = n, e.fill = t || "#fff", e.lineWidth = 2) : this.shape.symbolType === "line" ? e.stroke = n : e.fill = n, this.markRedraw();
  }
}
function Mo(n, t, e, i, s, r, o) {
  const a = n.indexOf("empty") === 0;
  a && (n = n.substr(5, 1).toLowerCase() + n.substr(6));
  let l;
  return n.indexOf("image://") === 0 ? l = Pw(
    n.slice(8),
    new Mt(t, e, i, s),
    o ? "center" : "cover"
  ) : n.indexOf("path://") === 0 ? l = Ig(
    n.slice(7),
    {},
    new Mt(t, e, i, s),
    o ? "center" : "cover"
  ) : l = new Ex({
    shape: {
      symbolType: n,
      x: t,
      y: e,
      width: i,
      height: s
    }
  }), l.__isEmptyBrush = a, l.setColor = Rx, r && l.setColor(r), l;
}
function Px(n, t) {
  if (n != null)
    return Ii(n) || (n = [n, n]), [
      Ei(n[0], t[0]) || 0,
      Ei(Nl(n[1], n[0]), t[1]) || 0
    ];
}
function zi(n, t) {
  return n == null && (n = 0), t == null && (t = 0), [n, t];
}
function Lx(n, t) {
  return (n[0] - t[0]) * (n[0] - t[0]) + (n[1] - t[1]) * (n[1] - t[1]);
}
const bi = Lx;
function Sf(n, t, e) {
  const i = t[0], s = t[1];
  return n[0] = e[0] * i + e[2] * s + e[4], n[1] = e[1] * i + e[3] * s + e[5], n;
}
function Lg(n, t, e) {
  return n[0] = Math.min(t[0], e[0]), n[1] = Math.min(t[1], e[1]), n;
}
function kg(n, t, e) {
  return n[0] = Math.max(t[0], e[0]), n[1] = Math.max(t[1], e[1]), n;
}
const bf = Mp, Tf = 5e-5;
function Mn(n) {
  return n > Tf || n < -Tf;
}
const Cn = [], si = [], nl = uo(), il = Math.abs, Es = class Es {
  /**
   * Get computed local transform
   */
  getLocalTransform(t) {
    return Es.getLocalTransform(this, t);
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
    return Mn(this.rotation) || Mn(this.x) || Mn(this.y) || Mn(this.scaleX - 1) || Mn(this.scaleY - 1) || Mn(this.skewX) || Mn(this.skewY);
  }
  /**
   * Update global transform
   */
  updateTransform() {
    const t = this.parent && this.parent.transform, e = this.needLocalTransform();
    let i = this.transform;
    if (!(e || t)) {
      i && bf(i);
      return;
    }
    i = i || uo(), e ? this.getLocalTransform(i) : bf(i), t && (e ? gs(i, t, i) : Gm(i, t)), this.transform = i, this._resolveGlobalScaleRatio(i);
  }
  _resolveGlobalScaleRatio(t) {
    const e = this.globalScaleRatio;
    if (e != null && e !== 1) {
      this.getGlobalScale(Cn);
      const i = Cn[0] < 0 ? -1 : 1, s = Cn[1] < 0 ? -1 : 1, r = ((Cn[0] - i) * e + i) / Cn[0] || 0, o = ((Cn[1] - s) * e + s) / Cn[1] || 0;
      t[0] *= r, t[1] *= r, t[2] *= o, t[3] *= o;
    }
    this.invTransform = this.invTransform || uo(), Vm(this.invTransform, t);
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
    t && t.transform && (gs(si, t.invTransform, e), e = si);
    const i = this.originX, s = this.originY;
    (i || s) && (nl[4] = i, nl[5] = s, gs(si, e, nl), si[4] -= i, si[5] -= s, e = si), this.setLocalTransform(e);
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
    return s && Sf(i, i, s), i;
  }
  /**
   * 变换局部坐标位置到全局坐标空间
   */
  transformCoordToGlobal(t, e) {
    const i = [t, e], s = this.transform;
    return s && Sf(i, i, s), i;
  }
  getLineScale() {
    const t = this.transform;
    return t && il(t[0] - 1) > 1e-10 && il(t[3] - 1) > 1e-10 ? Math.sqrt(il(t[0] * t[3] - t[2] * t[1])) : 1;
  }
  copyTransform(t) {
    kx(this, t);
  }
  static getLocalTransform(t, e) {
    e = e || [];
    const i = t.originX || 0, s = t.originY || 0, r = t.scaleX, o = t.scaleY, a = t.anchorX, l = t.anchorY, c = t.rotation || 0, h = t.x, u = t.y, f = t.skewX ? Math.tan(t.skewX) : 0, d = t.skewY ? Math.tan(-t.skewY) : 0;
    if (i || s || a || l) {
      const p = i + a, _ = s + l;
      e[4] = -p * r - f * _ * o, e[5] = -_ * o - d * p * r;
    } else
      e[4] = e[5] = 0;
    return e[0] = r, e[3] = o, e[1] = d * r, e[2] = f * o, c && Cp(e, e, c), e[4] += i + h, e[5] += s + u, e;
  }
};
Es.initDefaultProps = (function() {
  const t = Es.prototype;
  t.scaleX = t.scaleY = t.globalScaleRatio = 1, t.x = t.y = t.originX = t.originY = t.skewX = t.skewY = t.rotation = t.anchorX = t.anchorY = 0;
})();
let Co = Es;
const qs = [
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
function kx(n, t) {
  for (let e = 0; e < qs.length; e++) {
    const i = qs[e];
    n[i] = t[i];
  }
}
const bs = {
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
    return 1 - bs.bounceOut(1 - n);
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
    return n < 0.5 ? bs.bounceIn(n * 2) * 0.5 : bs.bounceOut(n * 2 - 1) * 0.5 + 0.5;
  }
}, Lr = Math.pow, en = Math.sqrt, Do = 1e-8, Og = 1e-4, Mf = en(3), kr = 1 / 3, we = zi(), Bt = zi(), Ti = zi();
function je(n) {
  return n > -Do && n < Do;
}
function Fg(n) {
  return n > Do || n < -Do;
}
function bt(n, t, e, i, s) {
  const r = 1 - s;
  return r * r * (r * n + 3 * s * t) + s * s * (s * i + 3 * r * e);
}
function Ng(n, t, e, i, s, r) {
  const o = i + 3 * (t - e) - n, a = 3 * (e - t * 2 + n), l = 3 * (t - n), c = n - s, h = a * a - 3 * o * l, u = a * l - 9 * o * c, f = l * l - 3 * a * c;
  let d = 0;
  if (je(h) && je(u))
    if (je(a))
      r[0] = 0;
    else {
      const p = -l / a;
      p >= 0 && p <= 1 && (r[d++] = p);
    }
  else {
    const p = u * u - 4 * h * f;
    if (je(p)) {
      const _ = u / h, g = -a / o + _, m = -_ / 2;
      g >= 0 && g <= 1 && (r[d++] = g), m >= 0 && m <= 1 && (r[d++] = m);
    } else if (p > 0) {
      const _ = en(p);
      let g = h * a + 1.5 * o * (-u + _), m = h * a + 1.5 * o * (-u - _);
      g < 0 ? g = -Lr(-g, kr) : g = Lr(g, kr), m < 0 ? m = -Lr(-m, kr) : m = Lr(m, kr);
      const y = (-a - (g + m)) / (3 * o);
      y >= 0 && y <= 1 && (r[d++] = y);
    } else {
      const _ = (2 * h * a - 3 * o * u) / (2 * en(h * h * h)), g = Math.acos(_) / 3, m = en(h), y = Math.cos(g), v = (-a - 2 * m * y) / (3 * o), S = (-a + m * (y + Mf * Math.sin(g))) / (3 * o), x = (-a + m * (y - Mf * Math.sin(g))) / (3 * o);
      v >= 0 && v <= 1 && (r[d++] = v), S >= 0 && S <= 1 && (r[d++] = S), x >= 0 && x <= 1 && (r[d++] = x);
    }
  }
  return d;
}
function zg(n, t, e, i, s) {
  const r = 6 * e - 12 * t + 6 * n, o = 9 * t + 3 * i - 3 * n - 9 * e, a = 3 * t - 3 * n;
  let l = 0;
  if (je(o)) {
    if (Fg(r)) {
      const c = -a / r;
      c >= 0 && c <= 1 && (s[l++] = c);
    }
  } else {
    const c = r * r - 4 * o * a;
    if (je(c))
      s[0] = -r / (2 * o);
    else if (c > 0) {
      const h = en(c), u = (-r + h) / (2 * o), f = (-r - h) / (2 * o);
      u >= 0 && u <= 1 && (s[l++] = u), f >= 0 && f <= 1 && (s[l++] = f);
    }
  }
  return l;
}
function Cf(n, t, e, i, s, r) {
  const o = (t - n) * s + n, a = (e - t) * s + t, l = (i - e) * s + e, c = (a - o) * s + o, h = (l - a) * s + a, u = (h - c) * s + c;
  r[0] = n, r[1] = o, r[2] = c, r[3] = u, r[4] = u, r[5] = h, r[6] = l, r[7] = i;
}
function Ox(n, t, e, i, s, r, o, a, l, c, h) {
  let u, f = 5e-3, d = 1 / 0, p, _, g, m;
  we[0] = l, we[1] = c;
  for (let y = 0; y < 1; y += 0.05)
    Bt[0] = bt(n, e, s, o, y), Bt[1] = bt(t, i, r, a, y), g = bi(we, Bt), g < d && (u = y, d = g);
  d = 1 / 0;
  for (let y = 0; y < 32 && !(f < Og); y++)
    p = u - f, _ = u + f, Bt[0] = bt(n, e, s, o, p), Bt[1] = bt(t, i, r, a, p), g = bi(Bt, we), p >= 0 && g < d ? (u = p, d = g) : (Ti[0] = bt(n, e, s, o, _), Ti[1] = bt(t, i, r, a, _), m = bi(Ti, we), _ <= 1 && m < d ? (u = _, d = m) : f *= 0.5);
  return en(d);
}
function Fx(n, t, e, i, s, r, o, a, l) {
  let c = n, h = t, u = 0;
  const f = 1 / l;
  for (let d = 1; d <= l; d++) {
    let p = d * f;
    const _ = bt(n, e, s, o, p), g = bt(t, i, r, a, p), m = _ - c, y = g - h;
    u += Math.sqrt(m * m + y * y), c = _, h = g;
  }
  return u;
}
function $t(n, t, e, i) {
  const s = 1 - i;
  return s * (s * n + 2 * i * t) + i * i * e;
}
function Nx(n, t, e, i, s) {
  const r = n - 2 * t + e, o = 2 * (t - n), a = n - i;
  let l = 0;
  if (je(r)) {
    if (Fg(o)) {
      const c = -a / o;
      c >= 0 && c <= 1 && (s[l++] = c);
    }
  } else {
    const c = o * o - 4 * r * a;
    if (je(c)) {
      const h = -o / (2 * r);
      h >= 0 && h <= 1 && (s[l++] = h);
    } else if (c > 0) {
      const h = en(c), u = (-o + h) / (2 * r), f = (-o - h) / (2 * r);
      u >= 0 && u <= 1 && (s[l++] = u), f >= 0 && f <= 1 && (s[l++] = f);
    }
  }
  return l;
}
function Bg(n, t, e) {
  const i = n + e - 2 * t;
  return i === 0 ? 0.5 : (n - t) / i;
}
function Df(n, t, e, i, s) {
  const r = (t - n) * i + n, o = (e - t) * i + t, a = (o - r) * i + r;
  s[0] = n, s[1] = r, s[2] = a, s[3] = a, s[4] = o, s[5] = e;
}
function zx(n, t, e, i, s, r, o, a, l) {
  let c, h = 5e-3, u = 1 / 0;
  we[0] = o, we[1] = a;
  for (let f = 0; f < 1; f += 0.05) {
    Bt[0] = $t(n, e, s, f), Bt[1] = $t(t, i, r, f);
    const d = bi(we, Bt);
    d < u && (c = f, u = d);
  }
  u = 1 / 0;
  for (let f = 0; f < 32 && !(h < Og); f++) {
    const d = c - h, p = c + h;
    Bt[0] = $t(n, e, s, d), Bt[1] = $t(t, i, r, d);
    const _ = bi(Bt, we);
    if (d >= 0 && _ < u)
      c = d, u = _;
    else {
      Ti[0] = $t(n, e, s, p), Ti[1] = $t(t, i, r, p);
      const g = bi(Ti, we);
      p <= 1 && g < u ? (c = p, u = g) : h *= 0.5;
    }
  }
  return en(u);
}
function Bx(n, t, e, i, s, r, o) {
  let a = n, l = t, c = 0;
  const h = 1 / o;
  for (let u = 1; u <= o; u++) {
    let f = u * h;
    const d = $t(n, e, s, f), p = $t(t, i, r, f), _ = d - a, g = p - l;
    c += Math.sqrt(_ * _ + g * g), a = d, l = p;
  }
  return c;
}
const $x = /cubic-bezier\(([0-9,\.e ]+)\)/;
function $g(n) {
  const t = n && $x.exec(n);
  if (t) {
    const e = t[1].split(","), i = +ss(e[0]), s = +ss(e[1]), r = +ss(e[2]), o = +ss(e[3]);
    if (isNaN(i + s + r + o))
      return;
    const a = [];
    return (l) => l <= 0 ? 0 : l >= 1 ? 1 : Ng(0, i, r, 1, l, a) && bt(0, s, o, 1, a[0]);
  }
}
class Hx {
  constructor(t) {
    this._inited = !1, this._startTime = 0, this._pausedTime = 0, this._paused = !1, this._life = t.life || 1e3, this._delay = t.delay || 0, this.loop = t.loop || !1, this.onframe = t.onframe || ba, this.ondestroy = t.ondestroy || ba, this.onrestart = t.onrestart || ba, t.easing && this.setEasing(t.easing);
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
    this.easing = t, this.easingFunc = Q(t) ? t : bs[t] || $g(t);
  }
}
const If = {
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
function Ts(n) {
  return n = Math.round(n), n < 0 ? 0 : n > 255 ? 255 : n;
}
function Af(n) {
  return n < 0 ? 0 : n > 1 ? 1 : n;
}
function sl(n) {
  let t = n;
  return t.length && t.charAt(t.length - 1) === "%" ? Ts(parseFloat(t) / 100 * 255) : Ts(parseInt(t, 10));
}
function Ms(n) {
  let t = n;
  return t.length && t.charAt(t.length - 1) === "%" ? Af(parseFloat(t) / 100) : Af(parseFloat(t));
}
function rl(n, t, e) {
  return e < 0 ? e += 1 : e > 1 && (e -= 1), e * 6 < 1 ? n + (t - n) * e * 6 : e * 2 < 1 ? t : e * 3 < 2 ? n + (t - n) * (2 / 3 - e) * 6 : n;
}
function Pt(n, t, e, i, s) {
  return n[0] = t, n[1] = e, n[2] = i, n[3] = s, n;
}
function cc(n, t) {
  return n[0] = t[0], n[1] = t[1], n[2] = t[2], n[3] = t[3], n;
}
const Hg = new ir(20);
let Or = null;
function ri(n, t) {
  Or && cc(Or, t), Or = Hg.put(n, Or || t.slice());
}
function Mi(n, t) {
  if (!n)
    return;
  t = t || [];
  let e = Hg.get(n);
  if (e)
    return cc(t, e);
  n = n + "";
  let i = n.replace(/ /g, "").toLowerCase();
  if (i in If)
    return cc(t, If[i]), ri(n, t), t;
  const s = i.length;
  if (i.charAt(0) === "#") {
    if (s === 4 || s === 5) {
      const a = parseInt(i.slice(1, 4), 16);
      if (!(a >= 0 && a <= 4095)) {
        Pt(t, 0, 0, 0, 1);
        return;
      }
      return Pt(
        t,
        (a & 3840) >> 4 | (a & 3840) >> 8,
        a & 240 | (a & 240) >> 4,
        a & 15 | (a & 15) << 4,
        s === 5 ? parseInt(i.slice(4), 16) / 15 : 1
      ), ri(n, t), t;
    } else if (s === 7 || s === 9) {
      const a = parseInt(i.slice(1, 7), 16);
      if (!(a >= 0 && a <= 16777215)) {
        Pt(t, 0, 0, 0, 1);
        return;
      }
      return Pt(
        t,
        (a & 16711680) >> 16,
        (a & 65280) >> 8,
        a & 255,
        s === 9 ? parseInt(i.slice(7), 16) / 255 : 1
      ), ri(n, t), t;
    }
    return;
  }
  let r = i.indexOf("("), o = i.indexOf(")");
  if (r !== -1 && o + 1 === s) {
    let a = i.substr(0, r), l = i.substr(r + 1, o - (r + 1)).split(","), c = 1;
    switch (a) {
      case "rgba":
        if (l.length !== 4)
          return l.length === 3 ? Pt(t, +l[0], +l[1], +l[2], 1) : Pt(t, 0, 0, 0, 1);
        c = Ms(l.pop());
      // jshint ignore:line
      // Fall through.
      case "rgb":
        if (l.length >= 3)
          return Pt(
            t,
            sl(l[0]),
            sl(l[1]),
            sl(l[2]),
            l.length === 3 ? c : Ms(l[3])
          ), ri(n, t), t;
        Pt(t, 0, 0, 0, 1);
        return;
      case "hsla":
        if (l.length !== 4) {
          Pt(t, 0, 0, 0, 1);
          return;
        }
        return l[3] = Ms(l[3]), Ef(l, t), ri(n, t), t;
      case "hsl":
        if (l.length !== 3) {
          Pt(t, 0, 0, 0, 1);
          return;
        }
        return Ef(l, t), ri(n, t), t;
      default:
        return;
    }
  }
  Pt(t, 0, 0, 0, 1);
}
function Ef(n, t) {
  const e = (parseFloat(n[0]) % 360 + 360) % 360 / 360, i = Ms(n[1]), s = Ms(n[2]), r = s <= 0.5 ? s * (i + 1) : s + i - s * i, o = s * 2 - r;
  return t = t || [], Pt(
    t,
    Ts(rl(o, r, e + 1 / 3) * 255),
    Ts(rl(o, r, e) * 255),
    Ts(rl(o, r, e - 1 / 3) * 255),
    1
  ), n.length === 4 && (t[3] = n[3]), t;
}
function Rf(n, t) {
  const e = Mi(n);
  if (e) {
    for (let i = 0; i < 3; i++)
      e[i] = e[i] * (1 - t) | 0, e[i] > 255 ? e[i] = 255 : e[i] < 0 && (e[i] = 0);
    return Gg(e, e.length === 4 ? "rgba" : "rgb");
  }
}
function Gg(n, t) {
  if (!n || !n.length)
    return;
  let e = n[0] + "," + n[1] + "," + n[2];
  return (t === "rgba" || t === "hsva" || t === "hsla") && (e += "," + n[3]), t + "(" + e + ")";
}
function Pf(n, t) {
  const e = Mi(n);
  return e ? (0.299 * e[0] + 0.587 * e[1] + 0.114 * e[2]) * e[3] / 255 + (1 - e[3]) * t : 0;
}
function Gx(n) {
  return n.type === "linear";
}
function Yx(n) {
  return n.type === "radial";
}
(function() {
  return Jt.hasGlobalWindow && Q(window.btoa) ? function(n) {
    return window.btoa(unescape(encodeURIComponent(n)));
  } : typeof Buffer != "undefined" ? function(n) {
    return Buffer.from(n).toString("base64");
  } : function(n) {
    return null;
  };
})();
const hc = Array.prototype.slice;
function Le(n, t, e) {
  return (t - n) * e + n;
}
function ol(n, t, e, i) {
  const s = t.length;
  for (let r = 0; r < s; r++)
    n[r] = Le(t[r], e[r], i);
  return n;
}
function Vx(n, t, e, i) {
  const s = t.length, r = s && t[0].length;
  for (let o = 0; o < s; o++) {
    n[o] || (n[o] = []);
    for (let a = 0; a < r; a++)
      n[o][a] = Le(t[o][a], e[o][a], i);
  }
  return n;
}
function Fr(n, t, e, i) {
  const s = t.length;
  for (let r = 0; r < s; r++)
    n[r] = t[r] + e[r] * i;
  return n;
}
function Lf(n, t, e, i) {
  const s = t.length, r = s && t[0].length;
  for (let o = 0; o < s; o++) {
    n[o] || (n[o] = []);
    for (let a = 0; a < r; a++)
      n[o][a] = t[o][a] + e[o][a] * i;
  }
  return n;
}
function Wx(n, t) {
  const e = n.length, i = t.length, s = e > i ? t : n, r = Math.min(e, i), o = s[r - 1] || { color: [0, 0, 0, 0], offset: 0 };
  for (let a = r; a < Math.max(e, i); a++)
    s.push({
      offset: o.offset,
      color: o.color.slice()
    });
}
function Ux(n, t, e) {
  let i = n, s = t;
  if (!i.push || !s.push)
    return;
  const r = i.length, o = s.length;
  if (r !== o)
    if (r > o)
      i.length = o;
    else
      for (let c = r; c < o; c++)
        i.push(e === 1 ? s[c] : hc.call(s[c]));
  const a = i[0] && i[0].length;
  for (let l = 0; l < i.length; l++)
    if (e === 1)
      isNaN(i[l]) && (i[l] = s[l]);
    else
      for (let c = 0; c < a; c++)
        isNaN(i[l][c]) && (i[l][c] = s[l][c]);
}
function no(n) {
  if (Ct(n)) {
    const t = n.length;
    if (Ct(n[0])) {
      const e = [];
      for (let i = 0; i < t; i++)
        e.push(hc.call(n[i]));
      return e;
    }
    return hc.call(n);
  }
  return n;
}
function io(n) {
  return n[0] = Math.floor(n[0]) || 0, n[1] = Math.floor(n[1]) || 0, n[2] = Math.floor(n[2]) || 0, n[3] = n[3] == null ? 1 : n[3], "rgba(" + n.join(",") + ")";
}
function qx(n) {
  return Ct(n && n[0]) ? 2 : 1;
}
const Nr = 0, so = 1, Yg = 2, cs = 3, uc = 4, fc = 5, kf = 6;
function Of(n) {
  return n === uc || n === fc;
}
function zr(n) {
  return n === so || n === Yg;
}
let Ji = [0, 0, 0, 0];
class Xx {
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
    let s = this.keyframes, r = s.length, o = !1, a = kf, l = e;
    if (Ct(e)) {
      let h = qx(e);
      a = h, (h === 1 && !xe(e[0]) || h === 2 && !xe(e[0][0])) && (o = !0);
    } else if (xe(e) && !Ns(e))
      a = Nr;
    else if (q(e))
      if (!isNaN(+e))
        a = Nr;
      else {
        const h = Mi(e);
        h && (l = h, a = cs);
      }
    else if (op(e)) {
      const h = N({}, l);
      h.colorStops = H(e.colorStops, (u) => ({
        offset: u.offset,
        color: Mi(u.color)
      })), Gx(e) ? a = uc : Yx(e) && (a = fc), l = h;
    }
    r === 0 ? this.valType = a : (a !== this.valType || a === kf) && (o = !0), this.discrete = this.discrete || o;
    const c = {
      time: t,
      value: l,
      rawValue: e,
      percent: 0
    };
    return i && (c.easing = i, c.easingFunc = Q(i) ? i : bs[i] || $g(i)), s.push(c), c;
  }
  prepare(t, e) {
    let i = this.keyframes;
    this._needsSort && i.sort(function(h, u) {
      return h.time - u.time;
    });
    const s = this.valType, r = i.length, o = i[r - 1], a = this.discrete, l = zr(s), c = Of(s);
    for (let h = 0; h < r; h++) {
      const u = i[h], f = u.value, d = o.value;
      u.percent = u.time / t, a || (l && h !== r - 1 ? Ux(f, d, s) : c && Wx(
        f.colorStops,
        d.colorStops
      ));
    }
    if (!a && s !== fc && e && this.needsAnimate() && e.needsAnimate() && s === e.valType && !e._finished) {
      this._additiveTrack = e;
      const h = i[0].value;
      for (let u = 0; u < r; u++)
        s === Nr ? i[u].additiveValue = i[u].value - h : s === cs ? i[u].additiveValue = Fr([], i[u].value, h, -1) : zr(s) && (i[u].additiveValue = s === so ? Fr([], i[u].value, h, -1) : Lf([], i[u].value, h, -1));
    }
  }
  step(t, e) {
    if (this._finished)
      return;
    this._additiveTrack && this._additiveTrack._finished && (this._additiveTrack = null);
    const i = this._additiveTrack != null, s = i ? "additiveValue" : "value", r = this.valType, o = this.keyframes, a = o.length, l = this.propName, c = r === cs;
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
    let m = i ? this._additiveValue : c ? Ji : t[l];
    if ((zr(r) || c) && !m && (m = this._additiveValue = []), this.discrete)
      t[l] = g < 1 ? d.rawValue : p.rawValue;
    else if (zr(r))
      r === so ? ol(
        m,
        d[s],
        p[s],
        g
      ) : Vx(
        m,
        d[s],
        p[s],
        g
      );
    else if (Of(r)) {
      const y = d[s], v = p[s], S = r === uc;
      t[l] = {
        type: S ? "linear" : "radial",
        x: Le(y.x, v.x, g),
        y: Le(y.y, v.y, g),
        // TODO performance
        colorStops: H(y.colorStops, (x, w) => {
          const M = v.colorStops[w];
          return {
            offset: Le(x.offset, M.offset, g),
            color: io(ol(
              [],
              x.color,
              M.color,
              g
            ))
          };
        }),
        global: v.global
      }, S ? (t[l].x2 = Le(
        y.x2,
        v.x2,
        g
      ), t[l].y2 = Le(
        y.y2,
        v.y2,
        g
      )) : t[l].r = Le(
        y.r,
        v.r,
        g
      );
    } else if (c)
      ol(
        m,
        d[s],
        p[s],
        g
      ), i || (t[l] = io(m));
    else {
      const y = Le(d[s], p[s], g);
      i ? this._additiveValue = y : t[l] = y;
    }
    i && this._addToTarget(t);
  }
  _addToTarget(t) {
    const e = this.valType, i = this.propName, s = this._additiveValue;
    e === Nr ? t[i] = t[i] + s : e === cs ? (Mi(t[i], Ji), Fr(Ji, Ji, s, 1), t[i] = io(Ji)) : e === so ? Fr(t[i], t[i], s, 1) : e === Yg && Lf(t[i], t[i], s, 1);
  }
}
class Vg {
  constructor(t, e, i, s) {
    if (this._tracks = {}, this._trackKeys = [], this._maxTime = 0, this._started = 0, this._clip = null, this._target = t, this._loop = e, e && s) {
      rp("Can' use additive animation on looped animation.");
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
    return this.whenWithKeys(t, e, J(e), i);
  }
  // Fast path for add keyframes of aniamteTo
  whenWithKeys(t, e, i, s) {
    const r = this._tracks;
    for (let o = 0; o < i.length; o++) {
      const a = i[o];
      let l = r[a];
      if (!l) {
        l = r[a] = new Xx(a);
        let c;
        const h = this._getAdditiveTrack(a);
        if (h) {
          const u = h.keyframes, f = u[u.length - 1];
          c = f && f.value, h.valType === cs && c && (c = io(c));
        } else
          c = this._target[a];
        if (c == null)
          continue;
        t > 0 && l.addKeyframe(0, no(c), s), this._trackKeys.push(a);
      }
      l.addKeyframe(t, no(e[a]), s);
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
      const r = new Hx({
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
        l && (t[r] = no(l.rawValue));
      }
    }
  }
  // Change final value after animator has been started.
  // NOTE: Be careful to use it.
  __changeFinalValue(t, e) {
    e = e || J(t);
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
let Wg = 1;
Jt.hasGlobalWindow && (Wg = Math.max(
  window.devicePixelRatio || window.screen && window.screen.deviceXDPI / window.screen.logicalXDPI || 1,
  1
));
const Ff = Wg, Zx = 0.4, dc = "#333", pc = "#ccc", Kx = "#eee", ke = 1, hs = 2, fi = 4, al = "__zr_normal__", ll = qs.concat(["ignore"]), jx = sa(qs, (n, t) => (n[t] = !0, n), { ignore: !1 });
let oi = {}, Qx = new Mt(0, 0, 0, 0);
const Wo = class Wo {
  constructor(t) {
    this.id = t0(), this.animators = [], this.currentStates = [], this.states = {}, this._init(t);
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
        let g = Qx;
        i.layoutRect ? g.copy(i.layoutRect) : g.copy(this.getBoundingRect()), s || g.applyTransform(this.transform), this.calculateTextPosition ? this.calculateTextPosition(oi, i, g) : _y(oi, i, g), r.x = oi.x, r.y = oi.y, o = oi.align, a = oi.verticalAlign;
        const m = i.origin;
        if (m && i.rotation != null) {
          let y, v;
          m === "center" ? (y = g.width * 0.5, v = g.height * 0.5) : (y = sn(m[0], g.width), v = sn(m[1], g.height)), c = !0, r.originX = -r.x + y + (s ? 0 : g.x), r.originY = -r.y + v + (s ? 0 : g.y);
        }
      }
      i.rotation != null && (r.rotation = i.rotation);
      const h = i.offset;
      h && (r.x += h[0], r.y += h[1], c || (r.originX = -h[0], r.originY = -h[1]));
      const u = i.inside == null ? typeof i.position == "string" && i.position.indexOf("inside") >= 0 : i.inside, f = this._innerTextDefaultStyle || (this._innerTextDefaultStyle = {});
      let d, p, _;
      u && this.canBeInsideText() ? (d = i.insideFill, p = i.insideStroke, (d == null || d === "auto") && (d = this.getInsideTextFill()), (p == null || p === "auto") && (p = this.getInsideTextStroke(d), _ = !0)) : (d = i.outsideFill, p = i.outsideStroke, (d == null || d === "auto") && (d = this.getOutsideFill()), (p == null || p === "auto") && (p = this.getOutsideStroke(d), _ = !0)), d = d || "#000", (d !== f.fill || p !== f.stroke || _ !== f.autoStroke || o !== f.align || a !== f.verticalAlign) && (l = !0, f.fill = d, f.stroke = p, f.autoStroke = _, f.align = o, f.verticalAlign = a, e.setDefaultTextStyle(f)), e.__dirty |= ke, l && e.dirtyStyle(!0);
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
    return this.__zr && this.__zr.isDarkMode() ? pc : dc;
  }
  getOutsideStroke(t) {
    const e = this.__zr && this.__zr.getBackgroundColor();
    let i = typeof e == "string" && Mi(e);
    i || (i = [255, 255, 255, 1]);
    const s = i[3], r = this.__zr.isDarkMode();
    for (let o = 0; o < 3; o++)
      i[o] = i[o] * s + (r ? 0 : 255) * (1 - s);
    return i[3] = 1, Gg(i, "rgba");
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
    else if (k(t)) {
      let s = J(t);
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
      if (s.getLoop() || r && r !== al)
        continue;
      const o = s.targetName, a = o ? e[o] : e;
      s.saveTo(a);
    }
  }
  _innerSaveToNormal(t) {
    let e = this._normalState;
    e || (e = this._normalState = {}), t.textConfig && !e.textConfig && (e.textConfig = this.textConfig), this._savePrimaryToNormal(t, e, ll);
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
    this.useState(al, !1, t);
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
    const r = t === al;
    if (!this.hasState() && r)
      return;
    const a = this.currentStates, l = this.stateTransition;
    if (st(a, t) >= 0 && (e || a.length === 1))
      return;
    let c;
    if (this.stateProxy && !r && (c = this.stateProxy(t)), c || (c = this.states && this.states[t]), !c && !r) {
      rp(`State ${t} not exists.`);
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
    return u && u.useState(t, e, i, h), f && f.useState(t, e, i, h), r ? (this.currentStates = [], this._normalState = {}) : e ? this.currentStates.push(t) : this.currentStates = [t], this._updateAnimationTargets(), this.markRedraw(), !h && this.__inHover && (this._toggleHoverLayerFlag(!1), this.__dirty &= ~ke), c;
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
      f && f.useStates(t, e, c), d && d.useStates(t, e, c), this._updateAnimationTargets(), this.currentStates = t.slice(), this.markRedraw(), !c && this.__inHover && (this._toggleHoverLayerFlag(!1), this.__dirty &= ~ke);
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
    for (let h = 0; h < ll.length; h++) {
      const u = ll[h], f = r && jx[u];
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
    e !== t && (e && e !== t && this.removeTextContent(), t.innerTransformable = new Co(), this._attachComponent(t), this._textContent = t, this.markRedraw());
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
    this.__dirty |= ke;
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
    const r = new Vg(s, e, i);
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
    cl(this, t, e, i);
  }
  /**
   * Animate from the target state to current state.
   * The params and the value are the same as `this.animateTo`.
   */
  // Overload definitions
  animateFrom(t, e, i) {
    cl(this, t, e, i, !0);
  }
  _transitionState(t, e, i, s) {
    const r = cl(this, e, i, s);
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
Wo.initDefaultProps = (function() {
  const t = Wo.prototype;
  t.type = "element", t.name = "", t.ignore = t.silent = t.isGroup = t.draggable = t.dragging = t.ignoreClip = t.__inHover = !1, t.__dirty = ke;
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
let Xs = Wo;
Wc(Xs, tr);
Wc(Xs, Co);
function cl(n, t, e, i, s) {
  e = e || {};
  const r = [];
  Ug(
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
function hl(n, t, e) {
  for (let i = 0; i < e; i++)
    n[i] = t[i];
}
function Jx(n) {
  return Ct(n[0]);
}
function tS(n, t, e) {
  if (Ct(t[e]))
    if (Ct(n[e]) || (n[e] = []), Ci(t[e])) {
      const i = t[e].length;
      n[e].length !== i && (n[e] = new t[e].constructor(i), hl(n[e], t[e], i));
    } else {
      const i = t[e], s = n[e], r = i.length;
      if (Jx(i)) {
        const o = i[0].length;
        for (let a = 0; a < r; a++)
          s[a] ? hl(s[a], i[a], o) : s[a] = Array.prototype.slice.call(i[a]);
      } else
        hl(s, i, r);
      s.length = i.length;
    }
  else
    n[e] = t[e];
}
function eS(n, t) {
  return n === t || Ct(n) && Ct(t) && nS(n, t);
}
function nS(n, t) {
  const e = n.length;
  if (e !== t.length)
    return !1;
  for (let i = 0; i < e; i++)
    if (n[i] !== t[i])
      return !1;
  return !0;
}
function Ug(n, t, e, i, s, r, o, a) {
  const l = J(i), c = s.duration, h = s.delay, u = s.additive, f = s.setToFinal, d = !k(r), p = n.animators;
  let _ = [];
  for (let m = 0; m < l.length; m++) {
    const y = l[m], v = i[y];
    if (v != null && e[y] != null && (d || r[y]))
      if (k(v) && !Ct(v) && !op(v)) {
        if (t) {
          a || (e[y] = v, n.updateDuringAnimation(t));
          continue;
        }
        Ug(
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
  if (s.force || (_ = ee(_, (m) => !eS(i[m], e[m])), g = _.length), g > 0 || s.force && !o.length) {
    let m, y, v;
    if (a) {
      y = {}, f && (m = {});
      for (let x = 0; x < g; x++) {
        const w = _[x];
        y[w] = e[w], f ? m[w] = i[w] : e[w] = i[w];
      }
    } else if (f) {
      v = {};
      for (let x = 0; x < g; x++) {
        const w = _[x];
        v[w] = no(e[w]), tS(e, i, w);
      }
    }
    const S = new Vg(e, !1, !1, u ? ee(
      // Use key string instead object reference because ref may be changed.
      p,
      (x) => x.targetName === t
    ) : null);
    S.targetName = t, s.scope && (S.scope = s.scope), f && m && S.whenWithKeys(0, m, _), v && S.whenWithKeys(0, v, _), S.whenWithKeys(
      c == null ? 500 : c,
      a ? y : i,
      _
    ).delay(h || 0), n.addAnimator(S, t), o.push(S);
  }
}
const gc = "__zr_style_" + Math.round(Math.random() * 10), Hn = {
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  shadowColor: "#000",
  opacity: 1,
  blend: "source-over"
}, yh = {
  style: {
    shadowBlur: !0,
    shadowOffsetX: !0,
    shadowOffsetY: !0,
    shadowColor: !0,
    opacity: !0
  }
};
Hn[gc] = !0;
const Nf = ["z", "z2", "invisible"], iS = ["invisible"], Uo = class Uo extends Xs {
  constructor(t) {
    super(t);
  }
  _init(t) {
    const e = J(t);
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
    if (this.ignore || this.invisible || this.style.opacity === 0 || this.culling && sS(this, t, e) || r && !r[0] && !r[3])
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
    t || this.markRedraw(), this.__dirty |= hs, this._rect && (this._rect = null);
  }
  dirty() {
    this.dirtyStyle();
  }
  /**
   * Is style changed. Used with dirtyStyle.
   */
  styleChanged() {
    return !!(this.__dirty & hs);
  }
  /**
   * Mark style updated. Only useful when style is used for caching. Like in the text.
   */
  styleUpdated() {
    this.__dirty &= ~hs;
  }
  /**
   * Create a style object with default values in it's prototype.
   */
  createStyle(t) {
    return oa(Hn, t);
  }
  /**
   * Replace style property.
   * It will create a new style if given obj is not a valid style object.
   */
  // PENDING should not createStyle if it's an style object.
  useStyle(t) {
    t[gc] || (t = this.createStyle(t)), this.__inHover ? this.__hoverStyle = t : this.style = t, this.dirtyStyle();
  }
  /**
   * Determine if an object is a valid style object.
   * Which means it is created by `createStyle.`
   *
   * A valid style object will have all default values in it's prototype.
   * To avoid get null/undefined values.
   */
  isStyleObject(t) {
    return t[gc];
  }
  _innerSaveToNormal(t) {
    super._innerSaveToNormal(t);
    const e = this._normalState;
    t.style && !e.style && (e.style = this._mergeStyle(this.createStyle(), this.style)), this._savePrimaryToNormal(t, e, Nf);
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
          const f = J(h);
          for (let d = 0; d < f.length; d++) {
            const p = f[d];
            p in l && (l[p] = l[p], this.style[p] = h[p]);
          }
        }
        const u = J(l);
        for (let f = 0; f < u.length; f++) {
          const d = u[f];
          this.style[d] = this.style[d];
        }
        this._transitionState(t, {
          style: l
        }, o, this.getAnimationStyleProps());
      } else
        this.useStyle(l);
    const c = this.__inHover ? iS : Nf;
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
    return yh;
  }
};
Uo.initDefaultProps = (function() {
  const t = Uo.prototype;
  t.type = "displayable", t.invisible = !1, t.z = 0, t.z2 = 0, t.zlevel = 0, t.culling = !1, t.cursor = "pointer", t.rectHover = !1, t.incremental = !1, t._rect = null, t.dirtyRectTolerance = 0, t.__dirty = ke | hs;
})();
let Zs = Uo;
const ul = new Mt(0, 0, 0, 0), fl = new Mt(0, 0, 0, 0);
function sS(n, t, e) {
  return ul.copy(n.getBoundingRect()), n.transform && ul.applyTransform(n.transform), fl.width = t, fl.height = e, !ul.intersect(fl);
}
const Ht = Math.min, Gt = Math.max, dl = Math.sin, pl = Math.cos, Dn = Math.PI * 2, Br = zi(), $r = zi(), Hr = zi();
function zf(n, t, e, i, s, r) {
  s[0] = Ht(n, e), s[1] = Ht(t, i), r[0] = Gt(n, e), r[1] = Gt(t, i);
}
const Bf = [], $f = [];
function rS(n, t, e, i, s, r, o, a, l, c) {
  const h = zg, u = bt;
  let f = h(n, e, s, o, Bf);
  l[0] = 1 / 0, l[1] = 1 / 0, c[0] = -1 / 0, c[1] = -1 / 0;
  for (let d = 0; d < f; d++) {
    const p = u(n, e, s, o, Bf[d]);
    l[0] = Ht(p, l[0]), c[0] = Gt(p, c[0]);
  }
  f = h(t, i, r, a, $f);
  for (let d = 0; d < f; d++) {
    const p = u(t, i, r, a, $f[d]);
    l[1] = Ht(p, l[1]), c[1] = Gt(p, c[1]);
  }
  l[0] = Ht(n, l[0]), c[0] = Gt(n, c[0]), l[0] = Ht(o, l[0]), c[0] = Gt(o, c[0]), l[1] = Ht(t, l[1]), c[1] = Gt(t, c[1]), l[1] = Ht(a, l[1]), c[1] = Gt(a, c[1]);
}
function oS(n, t, e, i, s, r, o, a) {
  const l = Bg, c = $t, h = Gt(
    Ht(l(n, e, s), 1),
    0
  ), u = Gt(
    Ht(l(t, i, r), 1),
    0
  ), f = c(n, e, s, h), d = c(t, i, r, u);
  o[0] = Ht(n, s, f), o[1] = Ht(t, r, d), a[0] = Gt(n, s, f), a[1] = Gt(t, r, d);
}
function aS(n, t, e, i, s, r, o, a, l) {
  const c = Lg, h = kg, u = Math.abs(s - r);
  if (u % Dn < 1e-4 && u > 1e-4) {
    a[0] = n - e, a[1] = t - i, l[0] = n + e, l[1] = t + i;
    return;
  }
  if (Br[0] = pl(s) * e + n, Br[1] = dl(s) * i + t, $r[0] = pl(r) * e + n, $r[1] = dl(r) * i + t, c(a, Br, $r), h(l, Br, $r), s = s % Dn, s < 0 && (s = s + Dn), r = r % Dn, r < 0 && (r = r + Dn), s > r && !o ? r += Dn : s < r && o && (s += Dn), o) {
    const f = r;
    r = s, s = f;
  }
  for (let f = 0; f < r; f += Math.PI / 2)
    f > s && (Hr[0] = pl(f) * e + n, Hr[1] = dl(f) * i + t, c(a, Hr, a), h(l, Hr, l));
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
}, In = [], An = [], de = [], Ve = [], pe = [], ge = [], gl = Math.min, _l = Math.max, En = Math.cos, Rn = Math.sin, Ee = Math.abs, _c = Math.PI, Xe = _c * 2, ml = typeof Float32Array != "undefined", ts = [];
function yl(n) {
  return Math.round(n / _c * 1e8) / 1e8 % 2 * _c;
}
function lS(n, t) {
  let e = yl(n[0]);
  e < 0 && (e += Xe);
  let i = e - n[0], s = n[1];
  s += i, !t && s - e >= Xe ? s = e + Xe : t && e - s >= Xe ? s = e - Xe : !t && e > s ? s = e + (Xe - yl(e - s)) : t && e < s && (s = e - (Xe - yl(s - e))), n[0] = e, n[1] = s;
}
const gi = class gi {
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
    i = i || 0, i > 0 && (this._ux = Ee(i / Ff / t) || 0, this._uy = Ee(i / Ff / e) || 0);
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
    const i = Ee(t - this._xi), s = Ee(e - this._yi), r = i > this._ux || s > this._uy;
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
    this._drawPendingPt(), ts[0] = s, ts[1] = r, lS(ts, o), s = ts[0], r = ts[1];
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
    ), this._ctx && this._ctx.arc(t, e, i, s, r, o), this._xi = En(r) * i + t, this._yi = Rn(r) * i + e, this;
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
    !(this.data && this.data.length === e) && ml && (this.data = new Float32Array(e));
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
    ml && this.data instanceof Float32Array && (this.data = new Float32Array(s + i));
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
    t instanceof Array && (t.length = this._len, ml && this._len > 11 && (this.data = new Float32Array(t)));
  }
  getBoundingRect() {
    de[0] = de[1] = pe[0] = pe[1] = Number.MAX_VALUE, Ve[0] = Ve[1] = ge[0] = ge[1] = -Number.MAX_VALUE;
    const t = this.data;
    let e = 0, i = 0, s = 0, r = 0, o;
    for (o = 0; o < this._len; ) {
      const a = t[o++], l = o === 1;
      switch (l && (e = t[o], i = t[o + 1], s = e, r = i), a) {
        case B.M:
          e = s = t[o++], i = r = t[o++], pe[0] = s, pe[1] = r, ge[0] = s, ge[1] = r;
          break;
        case B.L:
          zf(e, i, t[o], t[o + 1], pe, ge), e = t[o++], i = t[o++];
          break;
        case B.C:
          rS(
            e,
            i,
            t[o++],
            t[o++],
            t[o++],
            t[o++],
            t[o],
            t[o + 1],
            pe,
            ge
          ), e = t[o++], i = t[o++];
          break;
        case B.Q:
          oS(
            e,
            i,
            t[o++],
            t[o++],
            t[o],
            t[o + 1],
            pe,
            ge
          ), e = t[o++], i = t[o++];
          break;
        case B.A:
          const c = t[o++], h = t[o++], u = t[o++], f = t[o++], d = t[o++], p = t[o++] + d;
          o += 1;
          const _ = !t[o++];
          l && (s = En(d) * u + c, r = Rn(d) * f + h), aS(
            c,
            h,
            u,
            f,
            d,
            p,
            _,
            pe,
            ge
          ), e = En(p) * u + c, i = Rn(p) * f + h;
          break;
        case B.R:
          s = e = t[o++], r = i = t[o++];
          const g = t[o++], m = t[o++];
          zf(s, r, s + g, r + m, pe, ge);
          break;
        case B.Z:
          e = s, i = r;
          break;
      }
      Lg(de, de, pe), kg(Ve, Ve, ge);
    }
    return o === 0 && (de[0] = de[1] = Ve[0] = Ve[1] = 0), new Mt(
      de[0],
      de[1],
      Ve[0] - de[0],
      Ve[1] - de[1]
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
          (Ee(T) > i || Ee(I) > s || f === e - 1) && (_ = Math.sqrt(T * T + I * I), r = M, o = b);
          break;
        }
        case B.C: {
          const M = t[f++], b = t[f++], T = t[f++], I = t[f++], C = t[f++], A = t[f++];
          _ = Fx(r, o, M, b, T, I, C, A, 10), r = C, o = A;
          break;
        }
        case B.Q: {
          const M = t[f++], b = t[f++], T = t[f++], I = t[f++];
          _ = Bx(r, o, M, b, T, I, 10), r = T, o = I;
          break;
        }
        case B.A:
          const g = t[f++], m = t[f++], y = t[f++], v = t[f++], S = t[f++];
          let x = t[f++];
          const w = x + S;
          f += 1, t[f++], p && (a = En(S) * y + g, l = Rn(S) * v + m), _ = _l(y, v) * gl(Xe, Math.abs(x)), r = En(w) * y + g, o = Rn(w) * v + m;
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
    let p, _, g = 0, m = 0, y, v = 0, S, x;
    if (!(d && (this._pathSegLen || this._calculateLength(), p = this._pathSegLen, _ = this._pathLen, y = e * _, !y)))
      t: for (let w = 0; w < o; ) {
        const M = i[w++], b = w === 1;
        switch (b && (c = i[w], h = i[w + 1], a = c, l = h), M !== B.L && v > 0 && (t.lineTo(S, x), v = 0), M) {
          case B.M:
            a = c = i[w++], l = h = i[w++], t.moveTo(c, h);
            break;
          case B.L: {
            u = i[w++], f = i[w++];
            const $ = Ee(u - c), L = Ee(f - h);
            if ($ > s || L > r) {
              if (d) {
                const it = p[m++];
                if (g + it > y) {
                  const wt = (y - g) / it;
                  t.lineTo(c * (1 - wt) + u * wt, h * (1 - wt) + f * wt);
                  break t;
                }
                g += it;
              }
              t.lineTo(u, f), c = u, h = f, v = 0;
            } else {
              const it = $ * $ + L * L;
              it > v && (S = u, x = f, v = it);
            }
            break;
          }
          case B.C: {
            const $ = i[w++], L = i[w++], it = i[w++], wt = i[w++], le = i[w++], Be = i[w++];
            if (d) {
              const $i = p[m++];
              if (g + $i > y) {
                const $e = (y - g) / $i;
                Cf(c, $, it, le, $e, In), Cf(h, L, wt, Be, $e, An), t.bezierCurveTo(In[1], An[1], In[2], An[2], In[3], An[3]);
                break t;
              }
              g += $i;
            }
            t.bezierCurveTo($, L, it, wt, le, Be), c = le, h = Be;
            break;
          }
          case B.Q: {
            const $ = i[w++], L = i[w++], it = i[w++], wt = i[w++];
            if (d) {
              const le = p[m++];
              if (g + le > y) {
                const Be = (y - g) / le;
                Df(c, $, it, Be, In), Df(h, L, wt, Be, An), t.quadraticCurveTo(In[1], An[1], In[2], An[2]);
                break t;
              }
              g += le;
            }
            t.quadraticCurveTo($, L, it, wt), c = it, h = wt;
            break;
          }
          case B.A:
            const T = i[w++], I = i[w++], C = i[w++], A = i[w++];
            let R = i[w++], F = i[w++];
            const V = i[w++], G = !i[w++], rt = C > A ? C : A, ae = Ee(C - A) > 1e-3;
            let j = R + F, It = !1;
            if (d) {
              const $ = p[m++];
              g + $ > y && (j = R + F * (y - g) / $, It = !0), g += $;
            }
            if (ae && t.ellipse ? t.ellipse(T, I, C, A, V, R, j, G) : t.arc(T, I, rt, R, j, G), It)
              break t;
            b && (a = En(R) * C + T, l = Rn(R) * A + I), c = En(j) * C + T, h = Rn(j) * A + I;
            break;
          case B.R:
            a = c = i[w], l = h = i[w + 1], u = i[w++], f = i[w++];
            const nt = i[w++], dt = i[w++];
            if (d) {
              const $ = p[m++];
              if (g + $ > y) {
                let L = y - g;
                t.moveTo(u, f), t.lineTo(u + gl(L, nt), f), L -= nt, L > 0 && t.lineTo(u + nt, f + gl(L, dt)), L -= dt, L > 0 && t.lineTo(u + _l(nt - L, 0), f + dt), L -= nt, L > 0 && t.lineTo(u, f + _l(dt - L, 0));
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
                const L = (y - g) / $;
                t.lineTo(c * (1 - L) + a * L, h * (1 - L) + l * L);
                break t;
              }
              g += $;
            }
            t.closePath(), c = a, h = l;
        }
      }
  }
  clone() {
    const t = new gi(), e = this.data;
    return t.data = e.slice ? e.slice() : Array.prototype.slice.call(e), t._len = this._len, t;
  }
};
gi.CMD = B, gi.initDefaultProps = (function() {
  const t = gi.prototype;
  t._saveData = !0, t._ux = 0, t._uy = 0, t._pendingPtDist = 0, t._version = 0;
})();
let Ks = gi;
const Hf = new ir(50);
function qg(n, t, e, i, s) {
  if (n)
    if (typeof n == "string") {
      if (t && t.__zrImageSrc === n || !e)
        return t;
      const r = Hf.get(n), o = { hostEl: e, cb: i, cbPayload: s };
      return r ? (t = r.image, !vh(t) && r.pending.push(o)) : (t = Gc.loadImage(
        n,
        Gf,
        Gf
      ), t.__zrImageSrc = n, Hf.put(
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
function Gf() {
  const n = this.__cachedImgObj;
  this.onload = this.onerror = this.__cachedImgObj = null;
  for (let t = 0; t < n.pending.length; t++) {
    const e = n.pending[t], i = e.cb;
    i && i(this, e.cbPayload), e.hostEl.dirty();
  }
  n.pending.length = 0;
}
function vh(n) {
  return n && n.width && n.height;
}
function Nn(n) {
  return isFinite(n);
}
function cS(n, t, e) {
  let i = t.x == null ? 0 : t.x, s = t.x2 == null ? 1 : t.x2, r = t.y == null ? 0 : t.y, o = t.y2 == null ? 0 : t.y2;
  return t.global || (i = i * e.width + e.x, s = s * e.width + e.x, r = r * e.height + e.y, o = o * e.height + e.y), i = Nn(i) ? i : 0, s = Nn(s) ? s : 1, r = Nn(r) ? r : 0, o = Nn(o) ? o : 0, n.createLinearGradient(i, r, s, o);
}
function hS(n, t, e) {
  const i = e.width, s = e.height, r = Math.min(i, s);
  let o = t.x == null ? 0.5 : t.x, a = t.y == null ? 0.5 : t.y, l = t.r == null ? 0.5 : t.r;
  return t.global || (o = o * i + e.x, a = a * s + e.y, l = l * r), o = Nn(o) ? o : 0.5, a = Nn(a) ? a : 0.5, l = l >= 0 && Nn(l) ? l : 0.5, n.createRadialGradient(o, a, 0, o, a, l);
}
function Yf(n, t, e) {
  const i = t.type === "radial" ? hS(n, t, e) : cS(n, t, e), s = t.colorStops;
  for (let r = 0; r < s.length; r++)
    i.addColorStop(
      s[r].offset,
      s[r].color
    );
  return i;
}
function uS(n, t) {
  if (n === t || !n && !t)
    return !1;
  if (!n || !t || n.length !== t.length)
    return !0;
  for (let e = 0; e < n.length; e++)
    if (n[e] !== t[e])
      return !0;
  return !1;
}
function ai(n, t, e, i, s, r, o) {
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
function fS(n, t, e, i, s, r, o, a, l, c, h) {
  if (l === 0)
    return !1;
  const u = l;
  return h > t + u && h > i + u && h > r + u && h > a + u || h < t - u && h < i - u && h < r - u && h < a - u || c > n + u && c > e + u && c > s + u && c > o + u || c < n - u && c < e - u && c < s - u && c < o - u ? !1 : Ox(
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
function dS(n, t, e, i, s, r, o, a, l) {
  if (o === 0)
    return !1;
  const c = o;
  return l > t + c && l > i + c && l > r + c || l < t - c && l < i - c && l < r - c || a > n + c && a > e + c && a > s + c || a < n - c && a < e - c && a < s - c ? !1 : zx(
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
const Vf = Math.PI * 2;
function Gr(n) {
  return n %= Vf, n < 0 && (n += Vf), n;
}
const es = Math.PI * 2;
function pS(n, t, e, i, s, r, o, a, l) {
  if (o === 0)
    return !1;
  const c = o;
  a -= n, l -= t;
  const h = Math.sqrt(a * a + l * l);
  if (h - c > e || h + c < e)
    return !1;
  if (Math.abs(i - s) % es < 1e-4)
    return !0;
  if (r) {
    const f = i;
    i = Gr(s), s = Gr(f);
  } else
    i = Gr(i), s = Gr(s);
  i > s && (s += es);
  let u = Math.atan2(l, a);
  return u < 0 && (u += es), u >= i && u <= s || u + es >= i && u + es <= s;
}
function Pn(n, t, e, i, s, r) {
  if (r > t && r > i || r < t && r < i || i === t)
    return 0;
  const o = (r - t) / (i - t);
  let a = i < t ? 1 : -1;
  (o === 1 || o === 0) && (a = i < t ? 0.5 : -0.5);
  const l = o * (e - n) + n;
  return l === s ? 1 / 0 : l > s ? a : 0;
}
const We = Ks.CMD, Ln = Math.PI * 2, gS = 1e-4;
function _S(n, t) {
  return Math.abs(n - t) < gS;
}
const ht = [-1, -1, -1], kt = [-1, -1];
function mS() {
  const n = kt[0];
  kt[0] = kt[1], kt[1] = n;
}
function yS(n, t, e, i, s, r, o, a, l, c) {
  if (c > t && c > i && c > r && c > a || c < t && c < i && c < r && c < a)
    return 0;
  const h = Ng(t, i, r, a, c, ht);
  if (h === 0)
    return 0;
  {
    let u = 0, f = -1, d, p;
    for (let _ = 0; _ < h; _++) {
      let g = ht[_], m = g === 0 || g === 1 ? 0.5 : 1;
      bt(n, e, s, o, g) < l || (f < 0 && (f = zg(t, i, r, a, kt), kt[1] < kt[0] && f > 1 && mS(), d = bt(t, i, r, a, kt[0]), f > 1 && (p = bt(t, i, r, a, kt[1]))), f === 2 ? g < kt[0] ? u += d < t ? m : -m : g < kt[1] ? u += p < d ? m : -m : u += a < p ? m : -m : g < kt[0] ? u += d < t ? m : -m : u += a < d ? m : -m);
    }
    return u;
  }
}
function vS(n, t, e, i, s, r, o, a) {
  if (a > t && a > i && a > r || a < t && a < i && a < r)
    return 0;
  const l = Nx(t, i, r, a, ht);
  if (l === 0)
    return 0;
  {
    const c = Bg(t, i, r);
    if (c >= 0 && c <= 1) {
      let h = 0, u = $t(t, i, r, c);
      for (let f = 0; f < l; f++) {
        let d = ht[f] === 0 || ht[f] === 1 ? 0.5 : 1;
        $t(n, e, s, ht[f]) < o || (ht[f] < c ? h += u < t ? d : -d : h += r < u ? d : -d);
      }
      return h;
    } else {
      const h = ht[0] === 0 || ht[0] === 1 ? 0.5 : 1;
      return $t(n, e, s, ht[0]) < o ? 0 : r < t ? h : -h;
    }
  }
}
function wS(n, t, e, i, s, r, o, a) {
  if (a -= t, a > e || a < -e)
    return 0;
  const l = Math.sqrt(e * e - a * a);
  ht[0] = -l, ht[1] = l;
  const c = Math.abs(i - s);
  if (c < 1e-4)
    return 0;
  if (c >= Ln - 1e-4) {
    i = 0, s = Ln;
    const u = r ? 1 : -1;
    return o >= ht[0] + n && o <= ht[1] + n ? u : 0;
  }
  if (i > s) {
    const u = i;
    i = s, s = u;
  }
  i < 0 && (i += Ln, s += Ln);
  let h = 0;
  for (let u = 0; u < 2; u++) {
    const f = ht[u];
    if (f + n > o) {
      let d = Math.atan2(a, f), p = r ? 1 : -1;
      d < 0 && (d = Ln + d), (d >= i && d <= s || d + Ln >= i && d + Ln <= s) && (d > Math.PI / 2 && d < Math.PI * 1.5 && (p = -p), h += p);
    }
  }
  return h;
}
function Xg(n, t, e, i, s) {
  const r = n.data, o = n.len();
  let a = 0, l = 0, c = 0, h = 0, u = 0, f, d;
  for (let p = 0; p < o; ) {
    const _ = r[p++], g = p === 1;
    switch (_ === We.M && p > 1 && (e || (a += Pn(l, c, h, u, i, s))), g && (l = r[p], c = r[p + 1], h = l, u = c), _) {
      case We.M:
        h = r[p++], u = r[p++], l = h, c = u;
        break;
      case We.L:
        if (e) {
          if (ai(l, c, r[p], r[p + 1], t, i, s))
            return !0;
        } else
          a += Pn(l, c, r[p], r[p + 1], i, s) || 0;
        l = r[p++], c = r[p++];
        break;
      case We.C:
        if (e) {
          if (fS(
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
          a += yS(
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
      case We.Q:
        if (e) {
          if (dS(
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
          a += vS(
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
      case We.A:
        const m = r[p++], y = r[p++], v = r[p++], S = r[p++], x = r[p++], w = r[p++];
        p += 1;
        const M = !!(1 - r[p++]);
        f = Math.cos(x) * v + m, d = Math.sin(x) * S + y, g ? (h = f, u = d) : a += Pn(l, c, f, d, i, s);
        const b = (i - m) * S / v + m;
        if (e) {
          if (pS(
            m,
            y,
            S,
            x,
            x + w,
            M,
            t,
            b,
            s
          ))
            return !0;
        } else
          a += wS(
            m,
            y,
            S,
            x,
            x + w,
            M,
            b,
            s
          );
        l = Math.cos(x + w) * v + m, c = Math.sin(x + w) * S + y;
        break;
      case We.R:
        h = l = r[p++], u = c = r[p++];
        const T = r[p++], I = r[p++];
        if (f = h + T, d = u + I, e) {
          if (ai(h, u, f, u, t, i, s) || ai(f, u, f, d, t, i, s) || ai(f, d, h, d, t, i, s) || ai(h, d, h, u, t, i, s))
            return !0;
        } else
          a += Pn(f, u, f, d, i, s), a += Pn(h, d, h, u, i, s);
        break;
      case We.Z:
        if (e) {
          if (ai(
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
          a += Pn(l, c, h, u, i, s);
        l = h, c = u;
        break;
    }
  }
  return !e && !_S(c, u) && (a += Pn(l, c, h, u, i, s) || 0), a !== 0;
}
function xS(n, t, e) {
  return Xg(n, 0, !1, t, e);
}
function SS(n, t, e, i) {
  return Xg(n, t, !0, e, i);
}
const Zg = yt({
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
}, Hn), bS = {
  style: yt({
    fill: !0,
    stroke: !0,
    strokePercent: !0,
    fillOpacity: !0,
    strokeOpacity: !0,
    lineDashOffset: !0,
    lineWidth: !0,
    miterLimit: !0
  }, yh.style)
}, vl = qs.concat([
  "invisible",
  "culling",
  "z",
  "z2",
  "zlevel",
  "parent"
]), Fn = class Fn extends Zs {
  constructor(t) {
    super(t);
  }
  update() {
    super.update();
    const t = this.style;
    if (t.decal) {
      const e = this._decalEl = this._decalEl || new Fn();
      e.buildPath === Fn.prototype.buildPath && (e.buildPath = (s) => {
        this.buildPath(s, this.shape);
      }), e.silent = !0;
      const i = e.style;
      for (let s in t)
        i[s] !== t[s] && (i[s] = t[s]);
      i.fill = t.fill ? t.decal : null, i.decal = null, i.shadowColor = null, t.strokeFirst && (i.stroke = null);
      for (let s = 0; s < vl.length; ++s)
        e[vl[s]] = this[vl[s]];
      e.__dirty |= ke;
    } else this._decalEl && (this._decalEl = null);
  }
  getDecalElement() {
    return this._decalEl;
  }
  _init(t) {
    const e = J(t);
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
      if (q(t)) {
        const e = Pf(t, 0);
        return e > 0.5 ? dc : e > 0.2 ? Kx : pc;
      } else if (t)
        return pc;
    }
    return dc;
  }
  getInsideTextStroke(t) {
    const e = this.style.fill;
    if (q(e)) {
      const i = this.__zr, s = !!(i && i.isDarkMode()), r = Pf(t, 0) < Zx;
      if (s === r)
        return e;
    }
  }
  // When bundling path, some shape may decide if use moveTo to begin a new subpath or closePath
  // Like in circle
  buildPath(t, e, i) {
  }
  pathUpdated() {
    this.__dirty &= ~fi;
  }
  getUpdatedPathProxy(t) {
    return !this.path && this.createPathProxy(), this.path.beginPath(), this.buildPath(this.path, this.shape, t), this.path;
  }
  createPathProxy() {
    this.path = new Ks(!1);
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
      (s || this.__dirty & fi) && (r.beginPath(), this.buildPath(r, this.shape, !1), this.pathUpdated()), t = r.getBoundingRect();
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
        if (l > 1e-10 && (this.hasFill() || (a = Math.max(a, this.strokeContainThreshold)), SS(
          o,
          a / l,
          t,
          e
        )))
          return !0;
      }
      if (this.hasFill())
        return xS(o, t, e);
    }
    return !1;
  }
  /**
   * Shape changed
   */
  dirtyShape() {
    this.__dirty |= fi, this._rect && (this._rect = null), this._decalEl && this._decalEl.dirtyShape(), this.markRedraw();
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
    return !!(this.__dirty & fi);
  }
  /**
   * Create a path style object with default values in it's prototype.
   * @override
   */
  createStyle(t) {
    return oa(Zg, t);
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
        const c = {}, h = J(l);
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
    return bS;
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
    class e extends Fn {
      getDefaultStyle() {
        return U(t.style);
      }
      getDefaultShape() {
        return U(t.shape);
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
Fn.initDefaultProps = (function() {
  const t = Fn.prototype;
  t.type = "path", t.strokeContainThreshold = 5, t.segmentIgnoreThreshold = 0, t.subPixelOptimize = !1, t.autoBatch = !1, t.__dirty = ke | hs | fi;
})();
let Io = Fn;
const TS = yt({
  x: 0,
  y: 0
}, Hn), MS = {
  style: yt({
    x: !0,
    y: !0,
    width: !0,
    height: !0,
    sx: !0,
    sy: !0,
    sWidth: !0,
    sHeight: !0
  }, yh.style)
};
function CS(n) {
  return !!(n && typeof n != "string" && n.width && n.height);
}
class Kg extends Zs {
  /**
   * Create an image style object with default values in it's prototype.
   * @override
   */
  createStyle(t) {
    return oa(TS, t);
  }
  _getSize(t) {
    const e = this.style;
    let i = e[t];
    if (i != null)
      return i;
    const s = CS(e.image) ? e.image : this.__image;
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
    return MS;
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
Kg.prototype.type = "image";
const DS = yt({
  strokeFirst: !0,
  font: Fs,
  x: 0,
  y: 0,
  textAlign: "left",
  textBaseline: "top",
  miterLimit: 2
}, Zg);
var Vn;
let jg = (Vn = class extends Zs {
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
    return oa(DS, t);
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
      const i = ig(
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
}, Vn.initDefaultProps = (function() {
  const t = Vn.prototype;
  t.dirtyRectTolerance = 10;
})(), Vn);
jg.prototype.type = "tspan";
function IS(n, t) {
  return !n || n === "solid" || !(t > 0) ? null : n === "dashed" ? [4 * t, 2 * t] : n === "dotted" ? [t] : xe(n) ? [n] : K(n) ? n : null;
}
function Qg(n) {
  const t = n.style;
  let e = t.lineDash && t.lineWidth > 0 && IS(t.lineDash, t.lineWidth), i = t.lineDashOffset;
  if (e) {
    const s = t.strokeNoScale && n.getLineScale ? n.getLineScale() : 1;
    s && s !== 1 && (e = H(e, function(r) {
      return r / s;
    }), i /= s);
  }
  return [e, i];
}
const AS = new Ks(!0);
function Ao(n) {
  const t = n.stroke;
  return !(t == null || t === "none" || !(n.lineWidth > 0));
}
function Wf(n) {
  return typeof n == "string" && n !== "none";
}
function Eo(n) {
  const t = n.fill;
  return t != null && t !== "none";
}
function Uf(n, t) {
  if (t.fillOpacity != null && t.fillOpacity !== 1) {
    const e = n.globalAlpha;
    n.globalAlpha = t.fillOpacity * t.opacity, n.fill(), n.globalAlpha = e;
  } else
    n.fill();
}
function qf(n, t) {
  if (t.strokeOpacity != null && t.strokeOpacity !== 1) {
    const e = n.globalAlpha;
    n.globalAlpha = t.strokeOpacity * t.opacity, n.stroke(), n.globalAlpha = e;
  } else
    n.stroke();
}
function Xf(n, t, e) {
  const i = qg(t.image, t.__image, e);
  if (vh(i)) {
    const s = n.createPattern(i, t.repeat || "repeat");
    if (typeof DOMMatrix == "function" && s && s.setTransform) {
      const r = new DOMMatrix();
      r.translateSelf(t.x || 0, t.y || 0), r.rotateSelf(0, 0, (t.rotation || 0) * c0), r.scaleSelf(t.scaleX || 1, t.scaleY || 1), s.setTransform(r);
    }
    return s;
  }
}
function ES(n, t, e, i) {
  let s = Ao(e), r = Eo(e);
  const o = e.strokePercent, a = o < 1, l = !t.path;
  (!t.silent || a) && l && t.createPathProxy();
  const c = t.path || AS, h = t.__dirty;
  if (!i) {
    const _ = e.fill, g = e.stroke, m = r && !!_.colorStops, y = s && !!g.colorStops, v = r && !!_.image, S = s && !!g.image;
    let x, w, M, b, T;
    (m || y) && (T = t.getBoundingRect()), m && (x = h ? Yf(n, _, T) : t.__canvasFillGradient, t.__canvasFillGradient = x), y && (w = h ? Yf(n, g, T) : t.__canvasStrokeGradient, t.__canvasStrokeGradient = w), v && (M = h || !t.__canvasFillPattern ? Xf(n, _, t) : t.__canvasFillPattern, t.__canvasFillPattern = M), S && (b = h || !t.__canvasStrokePattern ? Xf(n, g, t) : t.__canvasStrokePattern, t.__canvasStrokePattern = M), m ? n.fillStyle = x : v && (M ? n.fillStyle = M : r = !1), y ? n.strokeStyle = w : S && (b ? n.strokeStyle = b : s = !1);
  }
  const u = t.getGlobalScale();
  c.setScale(u[0], u[1], t.segmentIgnoreThreshold);
  let f, d;
  n.setLineDash && e.lineDash && ([f, d] = Qg(t));
  let p = !0;
  (l || h & fi) && (c.setDPR(n.dpr), a ? c.setContext(null) : (c.setContext(n), p = !1), c.reset(), t.buildPath(c, t.shape, i), c.toStatic(), t.pathUpdated()), p && c.rebuildPath(n, a ? o : 1), f && (n.setLineDash(f), n.lineDashOffset = d), i || (e.strokeFirst ? (s && qf(n, e), r && Uf(n, e)) : (r && Uf(n, e), s && qf(n, e))), f && n.setLineDash([]);
}
function RS(n, t, e) {
  const i = t.__image = qg(
    e.image,
    t.__image,
    t,
    t.onload
  );
  if (!i || !vh(i))
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
function PS(n, t, e) {
  let i = e.text;
  if (i != null && (i += ""), i) {
    n.font = e.font || Fs, n.textAlign = e.textAlign, n.textBaseline = e.textBaseline;
    let s, r;
    n.setLineDash && e.lineDash && ([s, r] = Qg(t)), s && (n.setLineDash(s), n.lineDashOffset = r), e.strokeFirst ? (Ao(e) && n.strokeText(i, e.x, e.y), Eo(e) && n.fillText(i, e.x, e.y)) : (Eo(e) && n.fillText(i, e.x, e.y), Ao(e) && n.strokeText(i, e.x, e.y)), s && n.setLineDash([]);
  }
}
const Zf = ["shadowBlur", "shadowOffsetX", "shadowOffsetY"], Kf = [
  ["lineCap", "butt"],
  ["lineJoin", "miter"],
  ["miterLimit", 10]
];
function Jg(n, t, e, i, s) {
  let r = !1;
  if (!i && (e = e || {}, t === e))
    return !1;
  if (i || t.opacity !== e.opacity) {
    pt(n, s), r = !0;
    const o = Math.max(Math.min(t.opacity, 1), 0);
    n.globalAlpha = isNaN(o) ? Hn.opacity : o;
  }
  (i || t.blend !== e.blend) && (r || (pt(n, s), r = !0), n.globalCompositeOperation = t.blend || Hn.blend);
  for (let o = 0; o < Zf.length; o++) {
    const a = Zf[o];
    (i || t[a] !== e[a]) && (r || (pt(n, s), r = !0), n[a] = n.dpr * (t[a] || 0));
  }
  return (i || t.shadowColor !== e.shadowColor) && (r || (pt(n, s), r = !0), n.shadowColor = t.shadowColor || Hn.shadowColor), r;
}
function jf(n, t, e, i, s) {
  const r = js(t, s.inHover), o = i ? null : e && js(e, s.inHover) || {};
  if (r === o)
    return !1;
  let a = Jg(n, r, o, i, s);
  if ((i || r.fill !== o.fill) && (a || (pt(n, s), a = !0), Wf(r.fill) && (n.fillStyle = r.fill)), (i || r.stroke !== o.stroke) && (a || (pt(n, s), a = !0), Wf(r.stroke) && (n.strokeStyle = r.stroke)), (i || r.opacity !== o.opacity) && (a || (pt(n, s), a = !0), n.globalAlpha = r.opacity == null ? 1 : r.opacity), t.hasStroke()) {
    const c = r.lineWidth / (r.strokeNoScale && t.getLineScale ? t.getLineScale() : 1);
    n.lineWidth !== c && (a || (pt(n, s), a = !0), n.lineWidth = c);
  }
  for (let l = 0; l < Kf.length; l++) {
    const c = Kf[l], h = c[0];
    (i || r[h] !== o[h]) && (a || (pt(n, s), a = !0), n[h] = r[h] || c[1]);
  }
  return a;
}
function LS(n, t, e, i, s) {
  return Jg(
    n,
    js(t, s.inHover),
    e && js(e, s.inHover),
    i,
    s
  );
}
function t_(n, t) {
  const e = t.transform, i = n.dpr || 1;
  e ? n.setTransform(i * e[0], i * e[1], i * e[2], i * e[3], i * e[4], i * e[5]) : n.setTransform(i, 0, 0, i, 0, 0);
}
function kS(n, t, e) {
  let i = !1;
  for (let s = 0; s < n.length; s++) {
    const r = n[s];
    i = i || r.isZeroArea(), t_(t, r), t.beginPath(), r.buildPath(t, r.shape), t.clip();
  }
  e.allClipped = i;
}
function OS(n, t) {
  return n && t ? n[0] !== t[0] || n[1] !== t[1] || n[2] !== t[2] || n[3] !== t[3] || n[4] !== t[4] || n[5] !== t[5] : !(!n && !t);
}
const Qf = 1, Jf = 2, td = 3, ed = 4;
function FS(n) {
  const t = Eo(n), e = Ao(n);
  return !// Line dash is dynamically set in brush function.
  (n.lineDash || !(+t ^ +e) || t && typeof n.fill != "string" || e && typeof n.stroke != "string" || n.strokePercent < 1 || n.strokeOpacity < 1 || n.fillOpacity < 1);
}
function pt(n, t) {
  t.batchFill && n.fill(), t.batchStroke && n.stroke(), t.batchFill = "", t.batchStroke = "";
}
function js(n, t) {
  return t && n.__hoverStyle || n.style;
}
function NS(n, t) {
  mc(n, t, { inHover: !1, viewWidth: 0, viewHeight: 0 }, !0);
}
function mc(n, t, e, i) {
  const s = t.transform;
  if (!t.shouldBePainted(e.viewWidth, e.viewHeight, !1, !1)) {
    t.__dirty &= ~ke, t.__isRendered = !1;
    return;
  }
  const r = t.__clipPaths, o = e.prevElClipPaths;
  let a = !1, l = !1;
  if ((!o || uS(r, o)) && (o && o.length && (pt(n, e), n.restore(), l = a = !0, e.prevElClipPaths = null, e.allClipped = !1, e.prevEl = null), r && r.length && (pt(n, e), n.save(), kS(r, n, e), a = !0), e.prevElClipPaths = r), e.allClipped) {
    t.__isRendered = !1;
    return;
  }
  t.beforeBrush && t.beforeBrush(), t.innerBeforeBrush();
  const c = e.prevEl;
  c || (l = a = !0);
  let h = t instanceof Io && t.autoBatch && FS(t.style);
  a || OS(s, c.transform) ? (pt(n, e), t_(n, t)) : h || pt(n, e);
  const u = js(t, e.inHover);
  t instanceof Io ? (e.lastDrawType !== Qf && (l = !0, e.lastDrawType = Qf), jf(n, t, c, l, e), (!h || !e.batchFill && !e.batchStroke) && n.beginPath(), ES(n, t, u, h), h && (e.batchFill = u.fill || "", e.batchStroke = u.stroke || "")) : t instanceof jg ? (e.lastDrawType !== td && (l = !0, e.lastDrawType = td), jf(n, t, c, l, e), PS(n, t, u)) : t instanceof Kg ? (e.lastDrawType !== Jf && (l = !0, e.lastDrawType = Jf), LS(n, t, c, l, e), RS(n, t, u)) : t.getTemporalDisplayables && (e.lastDrawType !== ed && (l = !0, e.lastDrawType = ed), zS(n, t, e)), h && i && pt(n, e), t.innerAfterBrush(), t.afterBrush && t.afterBrush(), e.prevEl = t, t.__dirty = 0, t.__isRendered = !0;
}
function zS(n, t, e) {
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
    l.beforeBrush && l.beforeBrush(), l.innerBeforeBrush(), mc(n, l, r, o === a - 1), l.innerAfterBrush(), l.afterBrush && l.afterBrush(), r.prevEl = l;
  }
  for (let l = 0, c = s.length; l < c; l++) {
    const h = s[l];
    h.beforeBrush && h.beforeBrush(), h.innerBeforeBrush(), mc(n, h, r, l === c - 1), h.innerAfterBrush(), h.afterBrush && h.afterBrush(), r.prevEl = h;
  }
  t.clearTemporalDisplayables(), t.notClear = !0, n.restore();
}
const wl = /* @__PURE__ */ new WeakMap(), nd = new ir(100), id = [
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
function BS(n, t) {
  if (n === "none")
    return null;
  const e = t.getDevicePixelRatio(), i = t.getZr(), s = i.painter.type === "svg";
  n.dirty && wl.delete(n);
  const r = wl.get(n);
  if (r)
    return r;
  const o = Ce(n, {
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
  return l(a), a.rotation = o.rotation, a.scaleX = a.scaleY = s ? 1 : 1 / e, wl.set(n, a), n.dirty = !1, a;
  function l(c) {
    const h = [e];
    let u = !0;
    for (let b = 0; b < id.length; ++b) {
      const T = o[id[b]];
      if (T != null && !Ii(T) && !Ut(T) && !se(T) && typeof T != "boolean") {
        u = !1;
        break;
      }
      h.push(T);
    }
    let f;
    if (u) {
      f = h.join(",") + (s ? "-svg" : "");
      const b = nd.get(f);
      b && (s ? c.svgElement = b : c.image = b);
    }
    const d = n_(o.dashArrayX), p = $S(o.dashArrayY), _ = e_(o.symbol), g = HS(d), m = i_(p), y = !s && er.createCanvas(), v = s && {
      tag: "g",
      attrs: {},
      key: "dcl",
      children: []
    }, S = w();
    let x;
    y && (y.width = S.width * e, y.height = S.height * e, x = y.getContext("2d")), M(), u && nd.put(f, y || v), c.image = y, c.svgElement = v, c.svgWidth = S.width, c.svgHeight = S.height;
    function w() {
      let b = 1;
      for (let C = 0, A = g.length; C < A; ++C)
        b = Uh(b, g[C]);
      let T = 1;
      for (let C = 0, A = _.length; C < A; ++C)
        T = Uh(
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
      x && (x.clearRect(0, 0, y.width, y.height), o.backgroundColor && (x.fillStyle = o.backgroundColor, x.fillRect(0, 0, y.width, y.height)));
      let b = 0;
      for (let F = 0; F < p.length; ++F)
        b += p[F];
      if (b <= 0)
        return;
      let T = -m, I = 0, C = 0, A = 0;
      for (; T < S.height; ) {
        if (I % 2 === 0) {
          const F = C / 2 % _.length;
          let V = 0, G = 0, rt = 0;
          for (; V < S.width * 2; ) {
            let ae = 0;
            for (let j = 0; j < d[A].length; ++j)
              ae += d[A][j];
            if (ae <= 0)
              break;
            if (G % 2 === 0) {
              const j = (1 - o.symbolSize) * 0.5, It = V + d[A][G] * j, nt = T + p[I] * j, dt = d[A][G] * o.symbolSize, $ = p[I] * o.symbolSize, L = rt / 2 % _[F].length;
              R(
                It,
                nt,
                dt,
                $,
                _[F][L]
              );
            }
            V += d[A][G], ++rt, ++G, G === d[A].length && (G = 0);
          }
          ++A, A === d.length && (A = 0);
        }
        T += p[I], ++C, ++I, I === p.length && (I = 0);
      }
      function R(F, V, G, rt, ae) {
        const j = s ? 1 : e, It = Mo(
          ae,
          F * j,
          V * j,
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
          NS(x, It);
      }
    }
  }
}
function e_(n) {
  if (!n || n.length === 0)
    return [["rect"]];
  if (Ut(n))
    return [[n]];
  let t = !0;
  for (let i = 0; i < n.length; ++i)
    if (!Ut(n[i])) {
      t = !1;
      break;
    }
  if (t)
    return e_([n]);
  const e = [];
  for (let i = 0; i < n.length; ++i)
    Ut(n[i]) ? e.push([n[i]]) : e.push(n[i]);
  return e;
}
function n_(n) {
  if (!n || n.length === 0)
    return [[0, 0]];
  if (se(n)) {
    const i = Math.ceil(n);
    return [[i, i]];
  }
  let t = !0;
  for (let i = 0; i < n.length; ++i)
    if (!se(n[i])) {
      t = !1;
      break;
    }
  if (t)
    return n_([n]);
  const e = [];
  for (let i = 0; i < n.length; ++i)
    if (se(n[i])) {
      const s = Math.ceil(n[i]);
      e.push([s, s]);
    } else {
      const s = re(n[i], (r) => Math.ceil(r));
      s.length % 2 === 1 ? e.push(s.concat(s)) : e.push(s);
    }
  return e;
}
function $S(n) {
  if (!n || typeof n == "object" && n.length === 0)
    return [0, 0];
  if (se(n)) {
    const e = Math.ceil(n);
    return [e, e];
  }
  const t = re(n, (e) => Math.ceil(e));
  return n.length % 2 ? t.concat(t) : t;
}
function HS(n) {
  return re(n, function(t) {
    return i_(t);
  });
}
function i_(n) {
  let t = 0;
  for (let e = 0; e < n.length; ++e)
    t += n[e];
  return n.length % 2 === 1 ? t * 2 : t;
}
const s_ = 0, wh = 1, xh = 2, GS = 10, YS = 9, ro = "highlight", VS = "downplay", r_ = "select", WS = "unselect", o_ = "toggleSelect", US = ft(), Sh = ft();
function li(n) {
  return n != null && n !== "none";
}
const sd = new ir(100);
function rd(n) {
  if (Ut(n)) {
    let t = sd.get(n);
    return t || (t = Rf(n, -0.1), sd.put(n, t)), t;
  } else if (fa(n)) {
    const t = E({}, n);
    return t.colorStops = re(n.colorStops, (e) => ({
      offset: e.offset,
      color: Rf(e.color, -0.1)
    })), t;
  }
  return n;
}
function a_(n) {
  n.stateProxy = xl;
  const t = n.getTextContent(), e = n.getTextGuideLine();
  t && (t.stateProxy = xl), e && (e.stateProxy = xl);
}
function qS(n, t, e, i) {
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
function XS(n, t, e, i) {
  const s = e && Tt(e, "select") >= 0;
  let r = !1;
  if (n instanceof zrender.Path) {
    const o = US(n), a = s && o.selectFill || o.normalFill, l = s && o.selectStroke || o.normalStroke;
    if (li(a) || li(l)) {
      i = i || {};
      let c = i.style || {};
      c.fill === "inherit" ? (r = !0, i = E({}, i), c = E({}, c), c.fill = a) : !li(c.fill) && li(a) ? (r = !0, i = E({}, i), c = E({}, c), c.fill = rd(a)) : !li(c.stroke) && li(l) && (r || (i = E({}, i), c = E({}, c)), c.stroke = rd(l)), i.style = c;
    }
  }
  if (i && i.z2 == null) {
    r || (i = E({}, i));
    const o = n.z2EmphasisLift;
    i.z2 = n.z2 + (o != null ? o : GS);
  }
  return i;
}
function ZS(n, t, e) {
  if (e && e.z2 == null) {
    e = E({}, e);
    const i = n.z2SelectLift;
    e.z2 = n.z2 + (i != null ? i : YS);
  }
  return e;
}
function KS(n, t, e) {
  const i = Tt(n.currentStates, t) >= 0, s = n.style.opacity, r = i ? null : qS(n, ["opacity"], t, {
    opacity: 1
  });
  e = e || {};
  let o = e.style || {};
  return o.opacity == null && (e = E({}, e), o = E(
    {
      // Already being applied 'emphasis'. DON'T mul opacity multiple times.
      opacity: i ? s : r.opacity * 0.1
    },
    o
  ), e.style = o), e;
}
function xl(n, t) {
  const e = this.states[n];
  if (this.style) {
    if (n === "emphasis")
      return XS(this, n, t, e);
    if (n === "blur")
      return KS(this, n, e);
    if (n === "select")
      return ZS(this, n, e);
  }
  return e;
}
function jS(n, t, e) {
  QS(n), Bi(n, a_), ib(n);
}
function Bi(n, t, e) {
  od(n, t, e), n.isGroup && n.traverse(function(i) {
    od(i, t, e);
  });
}
function od(n, t, e) {
  t(n, e);
}
function QS(n, t) {
  const e = n;
  n.highDownSilentOnTouch && (e.__highDownSilentOnTouch = n.highDownSilentOnTouch), e.__highByOuter = e.__highByOuter || 0, e.__highDownDispatcher = !0;
}
function Sa(n, t, e) {
  n.onHoverStateChange && (n.hoverState || 0) !== e && n.onHoverStateChange(t), n.hoverState = e;
}
function JS(n) {
  Sa(n, "emphasis", xh);
}
function l_(n) {
  Sa(n, "blur", wh);
}
function c_(n) {
  n.hoverState === wh && Sa(n, "normal", s_);
}
function tb(n) {
  n.hoverState === xh && Sa(n, "normal", s_);
}
function eb(n) {
  n.selected = !0;
}
function nb(n) {
  n.selected = !1;
}
function ib(n, t, e) {
  const i = Xn(n);
  i.focus && (i.focus = null);
}
function ad(n, t) {
  n.__highByOuter |= 1 << (t || 0), Bi(n, JS);
}
function ld(n, t) {
  !(n.__highByOuter &= ~(1 << (t || 0))) && Bi(n, tb);
}
function yc(n) {
  const t = n.type;
  return t === r_ || t === WS || t === o_;
}
function cd(n) {
  const t = n.type;
  return t === ro || t === VS;
}
function sb(n) {
  Bi(n, c_);
}
function rb(n) {
  Bi(n, eb);
}
function ob(n) {
  Bi(n, nb);
}
function ab(n) {
  const t = n.getModel(), e = [], i = [];
  t.eachComponent(function(s, r) {
    const o = Sh(r), a = s === "series", l = a ? n.getViewOfSeriesModel(r) : n.getViewOfComponentModel(r);
    !a && i.push(l), o.isBlured && (l.group.traverse(function(c) {
      c_(c);
    }), a && e.push(r)), o.isBlured = !1;
  }), D(i, function(s) {
    s && s.toggleBlurSeries && s.toggleBlurSeries(e, !1, t);
  });
}
function hd(n, t, e, i) {
  const s = i.getModel();
  e = e || "coordinateSystem";
  function r(c, h) {
    for (let u = 0; u < h.length; u++) {
      const f = c.getItemGraphicEl(h[u]);
      f && sb(f);
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
        p.__highByOuter && h && t === "self" || l_(p);
      }), Ct(t))
        r(c.getData(), t);
      else if (k(t)) {
        const p = J(t);
        for (let _ = 0; _ < p.length; _++)
          r(
            c.getData(p[_]),
            t[p[_]]
          );
      }
      l.push(c), Sh(c).isBlured = !0;
    }
  }), s.eachComponent(function(c, h) {
    if (c === "series")
      return;
    const u = i.getViewOfComponentModel(h);
    u && u.toggleBlurSeries && u.toggleBlurSeries(l, !0, s);
  });
}
function lb(n, t, e) {
  if (n == null || t == null)
    return;
  const i = e.getModel().getComponent(n, t);
  if (!i)
    return;
  Sh(i).isBlured = !0;
  const s = e.getViewOfComponentModel(i);
  !s || !s.focusBlurEnabled || s.group.traverse(function(r) {
    l_(r);
  });
}
function cb(n, t, e) {
  const i = n.seriesIndex, s = n.getData(t.dataType);
  if (!s)
    return;
  let r = pp(s, t);
  r = (K(r) ? r[0] : r) || 0;
  let o = s.getItemGraphicEl(r);
  if (!o) {
    const a = s.count();
    let l = 0;
    for (; !o && l < a; )
      o = s.getItemGraphicEl(l++);
  }
  if (o) {
    const a = Xn(o);
    hd(i, a.focus, a.blurScope, e);
  } else {
    const a = n.get(["emphasis", "focus"]), l = n.get(["emphasis", "blurScope"]);
    a != null && hd(i, a, l, e);
  }
}
function hb(n, t, e) {
  if (!yc(t))
    return;
  const i = t.dataType, s = n.getData(i);
  let r = pp(s, t);
  K(r) || (r = [r]), n[t.type === o_ ? "toggleSelect" : t.type === r_ ? "select" : "unselect"](r, i);
}
function ub(n, t, e, i) {
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
    if (Xn(a[c]).focus === "self") {
      l = !0;
      break;
    }
  return { focusSelf: l, dispatchers: a };
}
function fb(n) {
  const t = n.getAllData();
  D(t, function({ data: e, type: i }) {
    e.eachItemGraphicEl(function(s, r) {
      n.isSelected(r, i) ? rb(s) : ob(s);
    });
  });
}
function db(n) {
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
function pb(n, t, e, i, s) {
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
function gb(n, t, e, i, s) {
  if (n) {
    if (n.type !== "polar") {
      if (n.type === "cartesian2d")
        return pb(n, t, e);
    }
  } else return null;
  return null;
}
const _b = ["x", "y"], h_ = "emphasis", bh = "normal", mb = "blur", yb = "select", Ro = [bh, h_, mb, yb], vb = "p\0\0", wb = {
  cartesian2d: cx
}, Kt = {
  normal: {},
  emphasis: {},
  blur: {},
  select: {}
}, qo = class qo extends Ai {
  constructor() {
    super(...arguments), this.type = qo.type;
  }
  render(t, e, i, s) {
    this._progressiveEls = null;
    const r = this._data, o = t.getData(), a = this.group, l = xb(t, o, e, i);
    r || a.removeAll(), o.diff(r).add(function(h) {
      ud(
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
      u && mh(
        u,
        tn(u).option,
        t
      );
    }).update(function(h, u) {
      const f = r.getItemGraphicEl(u);
      ud(
        i,
        f,
        h,
        l(h, s),
        t,
        a,
        o
      );
    }).execute();
    const c = t.get("clip", !0) ? gb(
      t.coordinateSystem,
      !1,
      t
    ) : null;
    c ? a.setClipPath(c) : a.removeClipPath(), this._data = o;
  }
};
qo.type = "custom";
let vc = qo;
function xb(n, t, e, i) {
  const s = n.get("renderItem"), r = n.coordinateSystem;
  let o = {};
  r && (o = r.prepareCustoms ? r.prepareCustoms(r) : wb[r.type](r));
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
function ud(n, t, e, i, s, r, o) {
  if (!i) {
    r.remove(t);
    return;
  }
  const a = Th(
    n,
    t,
    e,
    i,
    s,
    r
  );
  return a && o.setItemGraphicEl(e, a), a;
}
function Th(n, t, e, i, s, r) {
  let o = -1;
  const a = t;
  t && Db(t, i, s) && (o = st(r.childrenRef(), t), t = null);
  const l = !t;
  let c = t;
  c ? c.clearStates() : (c = Ib(i), a && kb(a, c)), i.morph === !1 ? c.disableMorphing = !0 : c.disableMorphing && (c.disableMorphing = !1), Kt.normal.cfg = Kt.normal.conOpt = Kt.emphasis.cfg = Kt.emphasis.conOpt = Kt.blur.cfg = Kt.blur.conOpt = Kt.select.cfg = Kt.select.conOpt = null, Kt.isLegacy = !1, Ab(
    n,
    c,
    e,
    i,
    Kt,
    s,
    l
  ), be(i, "info") && (tn(c).info = i.info);
  for (let h = 0; h < Ro.length; h++) {
    const u = Ro[h];
    if (u !== bh) {
      const f = u_(i, u), d = Lb(
        i,
        f,
        u
      );
      Eb(
        u,
        c,
        f,
        d,
        Kt
      );
    }
  }
  return Rb(c, i, s), i.type === "group" && bb(
    n,
    c,
    e,
    i,
    s
  ), Sb(n, c, i), o >= 0 ? r.replaceAt(c, o) : r.add(c), c;
}
function Sb(n, t, e) {
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
function bb(n, t, e, i, s) {
  const r = i.children, o = r ? r.length : 0, a = i.$mergeChildren, l = a === "byName" || i.diffChildrenByName, c = a === !1;
  if (!o && !l && !c)
    return;
  if (l) {
    Mb({
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
    u ? (u.ignore == null && (u.ignore = !1), Th(
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
    Tb(t, f, s);
  }
}
function Tb(n, t, e) {
  t && mh(t, tn(n).option, e);
}
function Mb(n) {
  new Rg(
    n.oldChildren,
    n.newChildren,
    fd,
    fd,
    n
  ).add(dd).update(dd).remove(Cb).execute();
}
function fd(n, t) {
  const e = n && n.name;
  return e != null ? e : vb + t;
}
function dd(n, t) {
  const e = this.context, i = n != null ? e.newChildren[n] : null, s = t != null ? e.oldChildren[t] : null;
  Th(
    e.api,
    s,
    e.dataIndex,
    i,
    e.seriesModel,
    e.group
  );
}
function Cb(n) {
  const t = this.context, e = t.oldChildren[n];
  e && mh(
    e,
    tn(e).option,
    t.seriesModel
  );
}
function Db(n, t, e) {
  const i = tn(n), s = t.type, r = t == null ? void 0 : t.shape, o = t == null ? void 0 : t.style;
  return e.isUniversalTransitionEnabled() || s != null && s !== i.customGraphicType || s === "path" && Ob(r) && f_(r) !== i.customPathData || s === "image" && be(o, "image") && o.image !== i.customImagePath;
}
function Ib(n) {
  const t = n.type;
  let e;
  if (t === "path") {
    const i = n.shape, s = i.width != null && i.height != null ? {
      x: i.x || 0,
      y: i.y || 0,
      width: i.width,
      height: i.height
    } : null, r = f_(i);
    e = Ig(
      r,
      null,
      s,
      i.layout || "center"
    ), tn(e).customPathData = r;
  } else if (t === "image")
    e = new (void 0)({}), tn(e).customImagePath = n.style.image;
  else if (t === "text")
    e = new (void 0)({});
  else if (t === "group")
    e = new (void 0)();
  else {
    const i = Ow(t);
    e = new i();
  }
  return tn(e).customGraphicType = t, e.name = n.name, e.z2EmphasisLift = 1, e.z2SelectLift = 1, e;
}
function Ab(n, t, e, i, s, r, o) {
  bx(t);
  const a = s && s.normal.cfg;
  a && t.setTextConfig(a), i && i.transition == null && (i.transition = _b);
  const l = i && i.style;
  if (l) {
    if (t.type === "text") {
      const u = l;
      be(u, "textFill") && (u.fill = u.textFill), be(u, "textStroke") && (u.stroke = u.textStroke);
    }
    let c;
    const h = wc(t) ? l.decal : null;
    n && h && (h.dirty = !0, c = BS(h, n)), l.__decalPattern = c;
  }
  if (xc(t) && l) {
    const c = l.__decalPattern;
    c && (l.decal = c);
  }
  ux(t, i, r, {
    dataIndex: e,
    isInit: o,
    clearStyle: !0
  });
}
function Eb(n, t, e, i, s) {
  const r = t.isGroup ? null : t, o = s && s[n].cfg;
  if (r) {
    const a = r.ensureState(n);
    if (i === !1) {
      const l = r.getState(n);
      l && (l.style = null);
    } else
      a.style = i || null;
    o && (a.textConfig = o), a_(r);
  }
}
function Rb(n, t, e) {
  if (n.isGroup)
    return;
  const i = n, s = e.currentZ, r = e.currentZLevel;
  i.z = s, i.zlevel = r;
  const o = t.z2;
  o != null && (i.z2 = o || 0);
  for (let a = 0; a < Ro.length; a++)
    Pb(i, t, Ro[a]);
}
function Pb(n, t, e) {
  const i = e === bh, s = i ? t : u_(
    t,
    e
  ), r = s ? s.z2 : null;
  let o;
  r != null && (o = i ? n : n.ensureState(e), o.z2 = r || 0);
}
function u_(n, t) {
  return t ? n ? n[t] : null : n;
}
function Lb(n, t, e) {
  let i = t && t.style;
  return i == null && e === h_ && n && (i = n.styleEmphasis), i;
}
function wc(n) {
  return n instanceof zrender.Path;
}
function xc(n) {
  return n instanceof zrender.Displayable;
}
function kb(n, t) {
  t.copyTransform(n), xc(t) && xc(n) && (t.setStyle(n.style), t.z = n.z, t.z2 = n.z2, t.zlevel = n.zlevel, t.invisible = n.invisible, t.ignore = n.ignore, wc(t) && wc(n) && t.setShape(n.shape));
}
function f_(n) {
  return n && (n.pathData || n.d);
}
function Ob(n) {
  return n && (be(n, "pathData") || be(n, "d"));
}
function Fb(n) {
  n.registerChartView(vc), n.registerSeriesModel(ac);
}
let Nb = 0;
class Mh {
  constructor(t) {
    this.categories = t.categories || [], this._needCollect = t.needCollect, this._deduplication = t.deduplication, this.uid = ++Nb;
  }
  getOrdinal(t) {
    return this._getOrCreateMap().get(t);
  }
  parseAndCollect(t) {
    let e;
    const i = this._needCollect;
    if (!Ut(t) && !i)
      return t;
    if (i && !this._deduplication)
      return e = this.categories.length, this.categories[e] = t, e;
    const s = this._getOrCreateMap();
    return e = s.get(t), e == null && (i ? (e = this.categories.length, this.categories[e] = t, s.set(t, e)) : e = NaN), e;
  }
  _getOrCreateMap() {
    return this._map || (this._map = O(this.categories));
  }
  static createByAxisModel(t) {
    const e = t.option, i = e.data, s = i && re(i, zb);
    return new Mh({
      categories: s,
      needCollect: !s,
      // deduplication is default in axis.
      deduplication: e.dedplication !== !1
    });
  }
}
function zb(n) {
  return ie(n) && n.value != null ? n.value : n + "";
}
const Bb = { value: 1, category: 1, time: 1, log: 1 }, d_ = {
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
}, $b = ut(
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
  d_
), Ch = ut(
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
  d_
), Hb = ut(
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
  Ch
), Gb = yt(
  {
    logBase: 10
  },
  Ch
), Yb = {
  category: $b,
  value: Ch,
  time: Hb,
  log: Gb
};
function pd(n, t, e, i) {
  et(Bb, function(s, r) {
    const o = Ze(
      Ze({}, Yb[r], !0),
      i,
      !0
    ), l = class l extends e {
      constructor() {
        super(...arguments), this.type = t + "Axis." + r;
      }
      mergeDefaultAndTheme(h, u) {
        const f = Ip(this), d = f ? $s(h) : {};
        Ze(h, this.getDefaultOption()), h.type = gd(h), f && Ap(
          h,
          d,
          f
        );
      }
      optionUpdated() {
        this.option.type === "category" && (this.__ordinalMeta = Mh.createByAxisModel(this));
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
  }), n.registerSubTypeDefaulter(t + "Axis", gd);
}
function gd(n) {
  return n.type || (n.data ? "category" : "value");
}
class Vb {
  getNeedCrossZero() {
    return !this.option.scale;
  }
  getCoordSysModel() {
  }
}
const kh = class kh extends W {
  getCoordSysModel() {
    return this.getReferringComponents("grid", Te).models[0];
  }
};
kh.type = "cartesian2dAxis";
let Qs = kh;
Wc(Qs, Vb);
const Xo = class Xo extends Zt {
  constructor() {
    super(...arguments), this.type = Xo.type;
  }
  render(t, e, i, s) {
    super.render.apply(this, arguments);
  }
};
Xo.type = "axis";
let Sc = Xo;
const bc = Math.PI;
class oo {
  constructor(t, e) {
    this.group = new zrender.Group(), this.axisModel = t, this.opt = e, Ce(e, {
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
    Wb[t](this.opt, this.axisModel, this.group, this._transformGroup);
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
    const s = w0(e - t);
    let r, o;
    return qh(s) ? (o = i > 0 ? "top" : "bottom", r = "center") : qh(s - bc) ? (o = i > 0 ? "bottom" : "top", r = "center") : (o = "middle", s > 0 && s < bc ? r = i > 0 ? "right" : "left" : r = i > 0 ? "left" : "right"), {
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
const Wb = {
  axisLine(n, t, e, i) {
    let s = t.get(["axisLine", "show"]);
    if (s == "auto" && n.handleAutoShown && (s = n.handleAutoShown("axisLine")), !s)
      return;
    const r = t.axis.getExtent(), o = i.transform, a = [r[0], 0], l = [r[1], 0], c = a[0] > l[0];
    o && (Se(a, a, o), Se(l, l, o));
    const h = E(
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
    Eg(u.shape, u.style.lineWidth), u.anid = "line", e.add(u);
    let f = t.get(["axisLine", "symbol"]);
    if (f != null) {
      let d = t.get(["axisLine", "symbolSize"]);
      Ut(f) && (f = [f, f]), (Ut(d) || se(d)) && (d = [d, d]);
      const p = Px(
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
            const v = Mo(
              f[y],
              -_ / 2,
              -g / 2,
              _,
              g,
              h.stroke,
              !0
            ), S = m.r + m.offset, x = c ? l : a;
            v.attr({
              rotation: m.rotate,
              x: x[0] + S * Math.cos(n.rotation),
              y: x[1] - S * Math.sin(n.rotation),
              silent: !0,
              z2: 11
            }), e.add(v);
          }
        }
      );
    }
  },
  axisTickLabel(n, t, e, i) {
    const s = Ub(e, i, t, n), r = Xb(e, i, t, n);
    qb(e, i, t, n), Zb(t, r, s);
  },
  axisName(n, t, e, i) {
  }
};
function Ub(n, t, e, i) {
  const s = e.axis, r = e.getModel("axisTick");
  let o = r.get("show");
  if (o === "auto" && i.handleAutoShown && (o = i.handleAutoShown("axisTick")), !o || s.scale.isBlank())
    return;
  const a = r.getModel("lineStyle"), l = i.tickDirection * r.get("length"), c = s.getTicksCoords(), h = p_(
    c,
    t.transform,
    l,
    Ce(a.getLineStyle(), {
      stroke: e.get(["axisLine", "lineStyle", "color"])
    }),
    "ticks"
  );
  for (let u = 0; u < h.length; u++)
    n.add(h[u]);
  return h;
}
function qb(n, t, e, i) {
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
  const f = p_(
    u,
    t.transform,
    c,
    Ce(a.getLineStyle(), {
      stroke: e.get(["axisLine", "lineStyle", "color"])
    }),
    "minorTicks"
  );
  for (let d = 0; d < f.length; d++)
    n.add(f[d]);
}
function Xb(n, t, e, i) {
  const s = e.axis;
  if (!Ll(i.axisLabelShow, e.get(["axisLabel", "show"])) || s.scale.isBlank())
    return;
  const o = e.getModel("axisLabel"), a = o.get("margin"), l = s.getViewLabels(), c = (Ll(i.labelRotate, o.get("rotate")) || 0) * bc / 180, h = oo.innerTextLayout(
    i.rotation,
    c,
    i.labelDirection
  ), u = e.getCategories && e.getCategories(!0), f = [], d = oo.isLabelSilent(e), p = e.get("triggerEvent");
  return et(l, function(_, g) {
    const m = s.scale.type === "ordinal" ? s.scale.getRawOrdinalNumber(_.tickValue) : _.tickValue, y = _.formattedLabel, v = _.rawLabel;
    let S = o;
    if (u && u[m]) {
      const b = u[m];
      k(b) && b.textStyle && (S = new Dt(
        b.textStyle,
        o,
        e.piModel
      ));
    }
    const x = S.getTextColor() || e.get(["axisLine", "lineStyle", "color"]), w = s.dataToCoord(m), M = new (void 0)({
      x: w,
      y: i.labelOffset + i.labelDirection * a,
      rotation: h.rotation,
      silent: d,
      z2: 10 + (_.level || 0),
      style: Tp(S, {
        text: y,
        align: S.getShallow("align", !0) || h.textAlign,
        verticalAlign: S.getShallow("verticalAlign", !0) || S.getShallow("baseline", !0) || h.textVerticalAlign,
        fill: Q(x) ? x(
          // (1) In category axis with data zoom, tick is not the original
          // index of axis.data. So tick should not be exposed to user
          // in category axis.
          // (2) Compatible with previous version, which always use formatted label as
          // input. But in interval scale the formatted label is like '223,445', which
          // maked user replace ','. So we modify it to return original val but remain
          // it as 'string' to avoid error in replacing.
          s.type === "category" ? v : s.type === "value" ? m + "" : m,
          g
        ) : x
      })
    });
    if (M.anid = "label_" + m, p) {
      const b = oo.makeAxisEventDataBase(e);
      b.targetType = "axisLabel", b.value = v, b.tickIndex = g, s.type === "category" && (b.dataIndex = m), Xn(M).eventData = b;
    }
    t.add(M), M.updateTransform(), f.push(M), n.add(M), M.decomposeTransform();
  }), f;
}
function p_(n, t, e, i, s) {
  const r = [], o = [], a = [];
  for (let l = 0; l < n.length; l++) {
    const c = n[l].coord;
    o[0] = c, o[1] = 0, a[0] = c, a[1] = e, t && (Se(o, o, t), Se(a, a, t));
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
    Eg(h.shape, h.style.lineWidth), h.anid = s + "_" + n[l].tickValue, r.push(h);
  }
  return r;
}
function Zb(n, t, e) {
  if (ag(n.axis))
    return;
  const i = n.get(["axisLabel", "showMinLabel"]), s = n.get(["axisLabel", "showMaxLabel"]);
  t = t || [], e = e || [];
  const r = t[0], o = t[1], a = t[t.length - 1], l = t[t.length - 2], c = e[0], h = e[1], u = e[e.length - 1], f = e[e.length - 2];
  i === !1 ? (At(r), At(c)) : _d(r, o) && (i ? (At(o), At(h)) : (At(r), At(c))), s === !1 ? (At(a), At(u)) : _d(l, a) && (s ? (At(l), At(f)) : (At(a), At(u)));
}
function At(n) {
  n && (n.ignore = !0);
}
function _d(n, t) {
  const e = n && n.getBoundingRect().clone(), i = t && t.getBoundingRect().clone();
  if (!e || !i)
    return;
  const s = Mp([]);
  return Cp(s, s, -n.rotation), e.applyTransform(
    gs([], s, n.getLocalTransform())
  ), i.applyTransform(
    gs([], s, t.getLocalTransform())
  ), e.intersect(i);
}
const Kb = ["axisLine", "axisTickLabel", "axisName"], jb = ["splitArea", "splitLine", "minorSplitLine"], Zo = class Zo extends Sc {
  constructor() {
    super(...arguments), this.type = Zo.type;
  }
  render(t, e, i, s) {
    this.api = i, this.group.removeAll();
    const r = this._axisGroup;
    if (this._axisGroup = new (void 0)(), this.group.add(this._axisGroup), !t.get("show"))
      return;
    const o = t.getCoordSysModel(), a = Xy(o, t), l = new oo(
      t,
      N(
        {
          handleAutoShown(h) {
            const u = o.coordinateSystem.getCartesians();
            for (let f = 0; f < u.length; f++)
              if (H1(
                u[f].getOtherAxis(t.axis).scale
              ))
                return !0;
            return !1;
          }
        },
        a
      )
    );
    D(Kb, l.add, l), this._axisGroup.add(l.getGroup()), D(
      jb,
      function(h) {
        t.get([h, "show"]) && Qb[h](this, this._axisGroup, t, o);
      },
      this
    ), s && s.type === "changeAxisOrder" && s.isInitSort || Fw(r, this._axisGroup, t), super.render(t, e, i, s);
  }
};
Zo.type = "cartesianAxis";
let Po = Zo;
function md(n, t) {
  const e = { width: n.getWidth(), height: n.getHeight() };
  let i = t.y + t.height;
  return n.getModel().eachComponent("dataZoom", function(s) {
    if (s.subType !== "slider" || s.getOrient() !== "horizontal" || s.get("show") === !1)
      return;
    const r = Hs(
      $s(s.option),
      e
    );
    i = Math.max(i, r.y);
  }), Math.min(i, e.height);
}
const Qb = {
  splitLine(n, t, e, i) {
    const s = e.axis, o = i.coordinateSystem.getRect(), a = s.getTicksCoords(), l = md(n.api, o);
    s.dim === "x" && a.forEach(function(c) {
      const h = o.x + c.coord;
      t.add(new zrender.Line({
        shape: {
          x1: h,
          y1: o.y,
          x2: h,
          y2: l
        },
        style: {
          stroke: "#D6DEE8",
          lineWidth: 1,
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
    const o = i.coordinateSystem.getRect(), a = s.getTicksCoords(), l = md(n.api, o);
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
}, Ko = class Ko extends Po {
  constructor() {
    super(...arguments), this.type = Ko.type;
  }
};
Ko.type = "xAxis";
let Lo = Ko;
const Oh = class Oh extends Po {
  constructor() {
    super(...arguments), this.type = Lo.type;
  }
};
Oh.type = "yAxis";
let Tc = Oh;
const yd = {
  // gridIndex: 0,
  // gridId: '',
  offset: 0
};
function Jb(n) {
  pd(
    n,
    "x",
    Qs,
    yd
  ), pd(
    n,
    "y",
    Qs,
    yd
  ), n.registerComponentView(Lo), n.registerComponentView(Tc), n.registerPreprocessor(function(t) {
    t.xAxis && t.yAxis && !t.grid && (t.grid = {});
  });
}
const t2 = ["x", "y"], e2 = ["cartesian2d"];
function Gn(n) {
  return n + "Axis";
}
function n2(n) {
  const t = n.get("coordinateSystem");
  return st(e2, t) >= 0;
}
function g_(n) {
  const t = n.piModel, e = {
    infoList: [],
    infoMap: O()
  };
  return n.eachTargetAxis(function(i, s) {
    const r = t.getComponent(
      Gn(i),
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
function i2(n, t) {
  const e = O(), i = [], s = O();
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
class vd {
  constructor() {
    this.indexList = [], this.indexMap = [];
  }
  add(t) {
    this.indexMap[t] || (this.indexList.push(t), this.indexMap[t] = !0);
  }
}
const _i = class _i extends W {
  constructor() {
    super(...arguments), this.type = _i.type, this._autoThrottle = !0, this._noTarget = !0, this._rangePropMode = ["percent", "percent"];
  }
  init(t, e, i) {
    const s = s2(t);
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
        Gn(t),
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
    const t = this.get("orient", !0), e = this._targetAxisInfoMap = O();
    this._fillSpecifiedTargetAxis(e) ? this._orient = t || this._makeAutoOrientByTargetAxis() : (this._orient = t || "horizontal", this._fillAutoTargetAxisByOrient(e, this._orient)), this._noTarget = !0, e.each(function(s) {
      s.indexList.length && (this._noTarget = !1);
    }, this);
  }
  _fillSpecifiedTargetAxis(t) {
    let e = !1;
    return D(
      t2,
      function(i) {
        const s = this.getReferringComponents(
          Gn(i),
          j0
        );
        if (!s.specified)
          return;
        e = !0;
        const r = new vd();
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
      const c = new vd();
      if (c.add(l.componentIndex), t.set(a, c), s = !1, a === "x" || a === "y") {
        const h = l.getReferringComponents(
          "grid",
          Te
        ).models[0];
        h && D(o, function(u) {
          l.componentIndex !== u.componentIndex && h === u.getReferringComponents("grid", Te).models[0] && c.add(u.componentIndex);
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
        Gn(e),
        i
      ));
    }, this), t;
  }
};
_i.type = "dataZoom", _i.dependencies = ["xAxis", "yAxis"], _i.defaultOption = {
  // zlevel: 0,
  z: 4,
  // Higher than normal component (z: 2).
  filterMode: "filter",
  start: 0,
  end: 100
};
let Li = _i;
function s2(n) {
  const t = {};
  return D(
    ["start", "end", "startValue", "endValue", "throttle"],
    function(e) {
      n.hasOwnProperty(e) && (t[e] = n[e]);
    }
  ), t;
}
function r2(n) {
  n.registerAction(
    "dataZoom",
    function(t, e) {
      const i = i2(e, t);
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
function Dh(n, t, e, i, s, r) {
  n = n || 0;
  const o = e[1] - e[0];
  if (s != null && (s = ci(s, [0, o])), r != null && (r = Math.max(r, s != null ? s : 0)), i === "all") {
    let u = Math.abs(t[1] - t[0]);
    u = ci(u, [0, o]), s = r = ci(u, [s, r]), i = 0;
  }
  t[0] = ci(t[0], e), t[1] = ci(t[1], e);
  const a = Sl(t, i);
  t[i] += n;
  const l = s || 0, c = e.slice();
  a.sign < 0 ? c[0] += l : c[1] -= l, t[i] = ci(t[i], c);
  let h;
  return h = Sl(t, i), s != null && (h.sign !== a.sign || h.span < s) && (t[1 - i] = t[i] + a.sign * s), h = Sl(t, i), r != null && h.span > r && (t[1 - i] = t[i] + h.sign * r), t;
}
function Sl(n, t) {
  const e = n[t] - n[1 - t];
  return { span: Math.abs(e), sign: e > 0 ? -1 : e < 0 ? 1 : t ? -1 : 1 };
}
function ci(n, t) {
  return Math.min(
    t[1] != null ? t[1] : 1 / 0,
    Math.max(t[0] != null ? t[0] : -1 / 0, n)
  );
}
const wd = rs;
class o2 {
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
      if (n2(e)) {
        const i = Gn(this._dimName), s = e.getReferringComponents(
          i,
          Te
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
    return U(this._minMaxSpan);
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
    }), wd(l), wd(a);
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
      Dh(
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
    this._dataExtent = a2(this, this._dimName, e), this._updateMinMaxSpan();
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
              const y = u.get(f[m], d), v = !isNaN(y), S = y < o[0], x = y > o[1];
              if (v && !S && !x)
                return !0;
              v && (g = !0), S && (p = !0), x && (_ = !0);
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
    let s = hp(i, [0, 500]);
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
function a2(n, t, e) {
  const i = [1 / 0, -1 / 0];
  D(e, function(o) {
    My(i, o.getData(), t);
  });
  const s = n.getAxisModel(), r = sg(
    s.axis.scale,
    s,
    i
  ).calculate();
  return [r.min, r.max];
}
const l2 = {
  getTargetSeries(n) {
    function t(s) {
      n.eachComponent(
        "dataZoom",
        function(r) {
          r.eachTargetAxis(function(o, a) {
            const l = n.getComponent(
              Gn(o),
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
      o.__dzAxisProxy || (o.__dzAxisProxy = new o2(
        s,
        r,
        a,
        n
      ), e.push(o.__dzAxisProxy));
    });
    const i = O();
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
let xd = !1;
function __(n) {
  xd || (xd = !0, n.registerProcessor(n.PRIORITY.PROCESSOR.FILTER, l2), r2(n), n.registerSubTypeDefaulter("dataZoom", function() {
    return "slider";
  }));
}
const jo = class jo extends Zt {
  constructor() {
    super(...arguments), this.type = jo.type;
  }
  render(t, e, i, s) {
    this.dataZoomModel = t, this.piModel = e, this.api = i;
  }
};
jo.type = "dataZoom";
let ko = jo;
const Sd = 7, c2 = 1, bl = 30, h2 = 7, ns = "horizontal", bd = "vertical", u2 = 5, f2 = ["line", "bar", "candlestick", "scatter"], d2 = {
  easing: "cubicOut",
  duration: 100,
  delay: 0
}, Qo = class Qo extends ko {
  constructor() {
    super(...arguments), this.type = Qo.type, this._displayables = {};
  }
  init(t, e) {
    this.api = e, this._onBrush = P(this._onBrush, this), this._onBrushEnd = P(this._onBrushEnd, this);
  }
  render(t, e, i, s) {
    if (super.render.apply(this, arguments), mp(
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
      animation: t ? d2 : null,
      start: e[0],
      end: e[1]
    });
  }
  _clear() {
    tm(this, "_dispatchZoomAction");
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
    const t = this.dataZoomModel, e = this.api, s = t.get("brushSelect") ? h2 : 0, r = this._findCoordRect(), o = { width: e.getWidth(), height: e.getHeight() }, a = this._orient === ns ? {
      // Why using 'right', because right should be used in vertical,
      // and it is better to be consistent for dealing with position param merge.
      right: o.width - r.x - r.width,
      top: o.height - bl - Sd - s,
      width: r.width,
      height: bl
    } : {
      // vertical
      right: Sd,
      top: r.y,
      width: bl,
      height: r.height
    }, l = $s(t.option);
    D(["right", "top", "width", "height"], function(h) {
      l[h] === "ph" && (l[h] = a[h]);
    });
    const c = Hs(l, o);
    this._location = { x: c.x, y: c.y }, this._size = [c.width, c.height], this._orient === bd && this._size.reverse();
  }
  _positionGroup() {
    const t = this.group, e = this._location, i = this._orient, s = this.dataZoomModel.getFirstTargetAxisModel(), r = s && s.get("inverse"), o = this._displayables.sliderGroup, a = (this._dataShadowInfo || {}).otherAxisInverse;
    o.attr(
      i === ns && !r ? { scaleY: a ? 1 : -1, scaleX: 1 } : i === ns && r ? { scaleY: a ? 1 : -1, scaleX: -1 } : i === bd && !r ? {
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
    const e = g_(
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
      let x;
      r.each([a], function(w, M) {
        if (S > 0 && M % S) {
          v += y;
          return;
        }
        const b = w == null || isNaN(w) || w === "", T = b ? 0 : ot(w, f, p, !0);
        b && !x && M ? (g.push([g[g.length - 1][0], 0]), m.push([m[m.length - 1][0], 0])) : !b && x && (g.push([v, 0]), m.push([v, 0])), g.push([v, T]), m.push([v, T]), v += y, x = b;
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
          if (i || e !== !0 && st(f2, l.get("type")) < 0)
            return;
          const c = s.getComponent(
            Gn(r),
            o
          ).axis;
          let h = p2(r), u;
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
          lineWidth: c2,
          fill: "rgba(0,0,0,0)"
        }
      })
    ), D(
      [0, 1],
      function(d) {
        let p = a.get("handleIcon");
        !To[p] && p.indexOf("path://") < 0 && p.indexOf("image://") < 0 && (p = "path://" + p);
        const _ = Mo(
          p,
          -1,
          0,
          2,
          2,
          null,
          !0
        );
        _.attr({
          cursor: Td(this._orient),
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
        this._handleHeight = sn(m, this._size[1]), this._handleWidth = g.width / g.height * this._handleHeight, _.setStyle(a.getModel("handleStyle").getItemStyle()), _.style.strokeNoScale = !0, _.rectHover = !0, _.ensureState("emphasis").style = a.getModel(["emphasis", "handleStyle"]).getItemStyle(), jS(_);
        const y = a.get("handleColor");
        y != null && (_.style.fill = y), r.add(i[d] = _);
        const v = a.getModel("textStyle");
        t.add(
          s[d] = new (void 0)({
            silent: !0,
            invisible: !0,
            style: Tp(v, {
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
      const d = sn(
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
      }), _ = d * 0.8, g = e.moveHandleIcon = Mo(
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
      cursor: Td(this._orient),
      drift: P(this._onDragMove, this, "all"),
      ondragstart: P(this._showDataInfo, this, !0),
      ondragend: P(this._onDragEnd, this),
      onmouseover: P(this._showDataInfo, this, !0),
      onmouseout: P(this._showDataInfo, this, !1)
    });
  }
  _updateInterval(t, e) {
    const i = this.dataZoomModel, s = this._handleEnds, r = this._getViewExtent(), o = i.findRepresentativeAxisProxy().getMinMaxSpan(), a = [0, 100];
    Dh(
      e,
      s,
      r,
      i.get("zoomLock") ? "all" : t,
      o.minSpan != null ? ot(o.minSpan, a, r, !0) : null,
      o.maxSpan != null ? ot(o.maxSpan, a, r, !0) : null
    );
    const l = this._range, c = this._range = rs([
      ot(s[0], r, a, !0),
      ot(s[1], r, a, !0)
    ]);
    return !l || l[0] !== c[0] || l[1] !== c[1];
  }
  _updateView(t) {
    const e = this._displayables, i = this._handleEnds, s = rs(i.slice()), r = this._size;
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
    const a = rs(this._handleEnds.slice());
    l.call(this, 0), l.call(this, 1);
    function l(c) {
      const h = Aw(
        i.handles[c].parent,
        this.group
      ), u = Ew(
        c === 0 ? "right" : "left",
        h
      ), f = this._handleWidth / 2 + u2, d = So(
        [
          a[c] + (c === 0 ? -f : f),
          this._size[1] / 2
        ],
        h
      );
      s[c].setStyle({
        x: d[0],
        y: d[1],
        verticalAlign: r === ns ? "middle" : u,
        align: r === ns ? u : "center",
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
    return Q(s) ? s(t, o) : q(s) ? s.replace("{value}", o) : o;
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
    this._dragging = !0, ye(s.event);
    const r = this._displayables.sliderGroup.getLocalTransform(), o = So([e, i], r, !0), a = this._updateInterval(t, o[0]), l = this.dataZoomModel.get("realtime");
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
    this._range = rs([
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
    this._brushing && (ye(t.event), this._updateBrushRect(t.offsetX, t.offsetY));
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
Qo.type = "dataZoom.slider";
let Mc = Qo;
function p2(n) {
  return { x: "y", y: "x", radius: "angle", angle: "radius" }[n];
}
function Td(n) {
  return n === "vertical" ? "ns-resize" : "ew-resize";
}
const mi = class mi extends Li {
  constructor() {
    super(...arguments), this.type = mi.type;
  }
};
mi.type = "dataZoom.slider", mi.layoutMode = "box", mi.defaultOption = Zc(
  Li.defaultOption,
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
let Cc = mi;
function g2(n) {
  n.registerComponentModel(Cc), n.registerComponentView(Mc), __(n);
}
const Md = "\0_pi_interaction_mutex";
function _2(n, t) {
  return !!m2(n)[t];
}
function m2(n) {
  return n[Md] || (n[Md] = {});
}
class y2 extends tr {
  constructor(t) {
    super(), this._zr = t;
    const e = P(this._mousedownHandler, this), i = P(this._mousemoveHandler, this), s = P(this._mouseupHandler, this), r = P(this._mousewheelHandler, this);
    this.enable = function(o, a) {
      this.disable(), this._opt = yt(U(a) || {}, {
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
    if (Pu(t))
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
    if (!this._dragging || !ao("moveOnMouseMove", t, this._opt) || t.gestureEvent === "pinch" || _2(this._zr, "globalPan"))
      return;
    const e = t.offsetX, i = t.offsetY, s = this._x, r = this._y, o = e - s, a = i - r;
    this._x = e, this._y = i, this._opt.preventDefaultMouseMove && ye(t.event), m_(this, "pan", "moveOnMouseMove", t, {
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
    Pu(t) || (this._dragging = !1);
  }
  _mousewheelHandler(t) {
    const e = ao("zoomOnMouseWheel", t, this._opt), i = ao("moveOnMouseWheel", t, this._opt), s = t.wheelDelta, r = Math.abs(s), o = t.offsetX, a = t.offsetY;
    if (!(s === 0 || !e && !i)) {
      if (e) {
        const l = r > 3 ? 1.4 : r > 1 ? 1.2 : 1.1, c = s > 0 ? l : 1 / l;
        Cd(this, "zoom", "zoomOnMouseWheel", t, {
          scale: c,
          originX: o,
          originY: a,
          isAvailableBehavior: null
        });
      }
      if (i) {
        const l = Math.abs(s), c = (s > 0 ? 1 : -1) * (l > 3 ? 0.4 : l > 1 ? 0.15 : 0.05);
        Cd(this, "scrollMove", "moveOnMouseWheel", t, {
          scrollDelta: c,
          originX: o,
          originY: a,
          isAvailableBehavior: null
        });
      }
    }
  }
}
function ao(n, t, e) {
  const i = e[n];
  return !n || i && (!q(i) || t.event[i + "Key"]);
}
function m_(n, t, e, i, s) {
  s.isAvailableBehavior = P(
    ao,
    null,
    e,
    i
  ), n.trigger(t, s);
}
function Cd(n, t, e, i, s) {
  n.pointerChecker && n.pointerChecker(i, s.originX, s.originY) && (ye(i.event), m_(n, t, e, i, s));
}
const y_ = ft();
function v2(n, t, e) {
  y_(n).coordSysRecordMap.each(function(i) {
    const s = i.dataZoomInfoMap.get(t.uid);
    s && (s.getRange = e);
  });
}
function w2(n, t) {
  if (t) {
    n.removeKey(t.model.uid);
    const e = t.controller;
    e && e.dispose();
  }
}
function x2(n, t) {
  const e = {
    model: t,
    containsPoint: lo(b2, t),
    dispatchAction: lo(S2, n),
    dataZoomInfoMap: null,
    controller: null
  }, i = e.controller = new y2(
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
function S2(n, t) {
  n.isDisposed() || n.dispatchAction({
    type: "dataZoom",
    animation: {
      easing: "cubicOut",
      duration: 100
    },
    batch: t
  });
}
function b2(n, t, e, i) {
  return n.coordinateSystem.containPoint([e, i]);
}
function T2(n) {
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
function M2(n) {
  n.registerProcessor(
    n.PRIORITY.PROCESSOR.FILTER,
    function(t, e) {
      const i = y_(e), s = i.coordSysRecordMap || (i.coordSysRecordMap = O());
      s.each(function(r) {
        r.dataZoomInfoMap = null;
      }), t.eachComponent(
        { mainType: "dataZoom", subType: "inside" },
        function(r) {
          const o = g_(r);
          D(o.infoList, function(a) {
            const l = a.model.uid, c = s.get(l) || s.set(
              l,
              x2(e, a.model)
            );
            (c.dataZoomInfoMap || (c.dataZoomInfoMap = O())).set(r.uid, {
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
          w2(s, r);
          return;
        }
        const c = T2(l);
        o.enable(c.controlType, c.opt), o.setPointerChecker(r.containsPoint), mp(
          r,
          "dispatchAction",
          a.model.get("throttle", !0),
          "fixRate"
        );
      });
    }
  );
}
const Fh = class Fh extends ko {
  constructor() {
    super(...arguments), this.type = "dataZoom.inside";
  }
  render(t, e, i) {
    if (super.render.apply(this, arguments), t.noTarget()) {
      this._clear();
      return;
    }
    this.range = t.getPercentRange(), v2(i, t, {
      pan: P(Tl.pan, this),
      zoom: P(Tl.zoom, this),
      scrollMove: P(Tl.scrollMove, this)
    });
  }
  _clear() {
  }
};
Fh.type = "dataZoom.inside";
let Dc = Fh;
const Tl = {
  zoom(n, t, e, i) {
    return this.range;
  },
  pan: Dd(function(n, t, e, i, s, r) {
    const o = Id[i](
      [r.oldX, r.oldY],
      [r.newX, r.newY],
      t,
      s,
      e
    );
    return o.signal * (n[1] - n[0]) * o.pixel / o.pixelLength;
  }),
  scrollMove: Dd(function(n, t, e, i, s, r) {
    return Id[i](
      [0, 0],
      [r.scrollDelta, r.scrollDelta],
      t,
      s,
      e
    ).signal * (n[1] - n[0]) * r.scrollDelta;
  })
};
function Dd(n) {
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
    if (Dh(l, o, [0, 100], "all"), this.range = o, r[0] !== o[0] || r[1] !== o[1])
      return o;
  };
}
const Id = {
  grid(n, t, e, i, s) {
    const r = e.axis, o = {}, a = s.model.coordinateSystem.getRect();
    return n = n || [0, 0], r.dim === "x" ? (o.pixel = t[0] - n[0], o.pixelLength = a.width, o.pixelStart = a.x, o.signal = r.inverse ? 1 : -1) : (o.pixel = t[1] - n[1], o.pixelLength = a.height, o.pixelStart = a.y, o.signal = r.inverse ? -1 : 1), o;
  }
}, Rs = class Rs extends Li {
  constructor() {
    super(...arguments), this.type = Rs.type;
  }
};
Rs.type = "dataZoom.inside", Rs.defaultOption = Zc(
  Li.defaultOption,
  {
    disabled: !1,
    zoomLock: !1,
    zoomOnMouseWheel: !0,
    moveOnMouseMove: !0,
    moveOnMouseWheel: !1,
    preventDefaultMouseMove: !0
  }
);
let Ic = Rs;
function C2(n) {
  __(n), n.registerComponentModel(Ic), n.registerComponentView(Dc), M2(n);
}
function D2(n) {
  Xt(C2), Xt(g2);
}
class I2 {
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
const A2 = {};
class E2 extends I2 {
  constructor() {
    super({
      initialState: "idle",
      initialContext: A2,
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
          SUBMIT_FAIL: "error"
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
    var s;
    const e = (s = t == null ? void 0 : t.id) != null ? s : t == null ? void 0 : t.taskId, i = this.getContext();
    return this.getState() !== "idle" && i.taskId === e ? (this.reset(), !0) : (this.getState() !== "idle" && this.reset(), this.transition("SELECT_TASK", {
      taskId: e,
      taskData: t,
      hoverResourceId: void 0,
      hoverResourceIndex: void 0,
      hoverY: void 0,
      requestId: void 0,
      error: void 0
    }));
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
    return this.transition(t, { error: e });
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
const X = 999, Jo = class Jo extends Zt {
  constructor() {
    super(...arguments), this.type = Jo.type, this._scrollOffset = 0, this._scrollMax = 0, this._scrollDragStartY = 0, this._scrollDragStartOffset = 0, this._mainScrollDragStartY = 0, this._mainScrollDragStartStart = 0, this._selectedTaskTweens = /* @__PURE__ */ new Map(), this._boundKeyDownHandler = null, this._boundMouseMoveHandler = null, this._boundClickHandler = null, this._assigning = !1;
  }
  init(t, e) {
    this.api = e, this.piModel = t, this._assignmentMachine || (this._assignmentMachine = new E2(), this._assignmentMachine.on("statechange", (i, s, r) => {
      this.piModel && this.api && s !== r && this._renderBoard(this._getUnassignedData());
    })), !this._boundKeyDownHandler && typeof window != "undefined" && (this._boundKeyDownHandler = (i) => {
      var s;
      i.key === "Escape" && ((s = this._assignmentMachine) == null || s.esc());
    }, window.addEventListener("keydown", this._boundKeyDownHandler)), this._boundMouseMoveHandler || (this._boundMouseMoveHandler = (i) => this._handleGlobalMouseMove(i), e.getZr().on("mousemove", this._boundMouseMoveHandler)), this._boundClickHandler || (this._boundClickHandler = (i) => this._handleGlobalClick(i), e.getZr().on("click", this._boundClickHandler));
  }
  dispose() {
    var t, e, i;
    this._boundKeyDownHandler && (window.removeEventListener("keydown", this._boundKeyDownHandler), this._boundKeyDownHandler = null), this._boundMouseMoveHandler && ((t = this.api) == null || t.getZr().off("mousemove", this._boundMouseMoveHandler), this._boundMouseMoveHandler = null), this._boundClickHandler && ((e = this.api) == null || e.getZr().off("click", this._boundClickHandler), this._boundClickHandler = null), this._clearSelectedTaskTweens(), this._clearAssignmentGhost(), (i = this._assignmentMachine) == null || i.destroy();
  }
  render(t, e, i, s) {
    var a;
    this.group.removeAll(), this.piModel = e, this.api = i;
    let r = (a = t.option) == null ? void 0 : a.splitY;
    r == null && (r = i.getHeight(), e.eachComponent("split", function(l) {
      if (l.get("orient") === "horizontal") {
        const c = l.get("ratio");
        c != null && (r = i.getHeight() * sc(c, "horizontal"));
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
      zlevel: X,
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
      zlevel: X,
      z: 0,
      z2: 1,
      silent: !0
    }), e.add(this._emptyText));
  }
  _renderUnassignedTasks(t) {
    if (this._taskViewportGroup && this.group.remove(this._taskViewportGroup), this._taskContentGroup && (this._taskContentGroup = null), this._assignmentGhostGroup && (this.group.remove(this._assignmentGhostGroup), this._assignmentGhostGroup = null), this._scrollbarGroup && this.group.remove(this._scrollbarGroup), !t.length) return;
    const e = this._getGrid();
    if (!e) return;
    const i = e.getRect(), s = Math.max(0, this.api.getHeight() - this._splitY), r = this._getRowHeight(), o = Math.min(36, Math.max(24, r - 8)), a = t.length * r;
    this._scrollMax = Math.max(0, a - s), this._scrollOffset = Math.min(this._scrollOffset, this._scrollMax);
    const l = this._taskViewportGroup = new zrender.Group();
    l.attr({
      zlevel: X,
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
      zlevel: X,
      z: 0,
      z2: 3,
      x: 0,
      y: -this._scrollOffset
    }), t.forEach((h, u) => {
      const f = u * r + (r - o) / 2, d = this._renderTaskItem(
        h,
        e,
        f,
        o,
        this._isTaskSelected(h)
      );
      d && (this._bindTaskEvents(d, h), this._applySelectedTaskEffect(d, h), c.add(d));
    }), l.add(c), this.group.add(l), this._renderVerticalDataZoom(i, s, a);
  }
  _renderVerticalDataZoom(t, e, i) {
    if (i <= e || e <= 0) return;
    const s = 8, r = t.x + t.width + 6, o = Math.max(24, e / i * e), a = this._scrollMax > 0 ? this._scrollOffset / this._scrollMax * (e - o) : 0, l = this._scrollbarGroup = new zrender.Group();
    l.attr({ zlevel: X, z: 0, z2: 5 }), l.add(
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
        zlevel: X,
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
      zlevel: X,
      z: 0,
      z2: 1,
      cursor: "ns-resize",
      draggable: !0,
      ondragstart: (c) => {
        this._scrollDragStartY = c.offsetY, this._scrollDragStartOffset = this._scrollOffset, ye(c.event);
      },
      drift: (c, h, u) => {
        const f = u.offsetY - this._scrollDragStartY, d = Math.max(1, e - o), p = this._scrollDragStartOffset + f / d * this._scrollMax;
        this._setScrollOffset(p), ye(u.event);
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
    var b, T, I;
    if (!e) return null;
    const a = e.getRect(), l = (b = e.getCartesians()[0]) == null ? void 0 : b.getAxis("x");
    if (!l) return null;
    const c = this._parseTime((T = t.scheduleStartTime) != null ? T : t.startTime), h = this._parseTime((I = t.scheduleEndTime) != null ? I : t.endTime);
    if (c == null || h == null || h <= c)
      return null;
    const u = a.x + l.dataToCoord(c), f = a.x + l.dataToCoord(h), d = Math.max(a.x, Math.min(u, f)), _ = Math.min(a.x + a.width, Math.max(u, f)) - d;
    if (_ <= 0) return null;
    const g = new zrender.Group();
    g.attr({ zlevel: X, z: 0, z2: 3 });
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
          fill: r ? "#E8F4FF" : "#F3FAFF",
          stroke: r ? "#1D7FEA" : "#2F9EEB",
          lineWidth: r ? 2 : 1
        },
        zlevel: X,
        z: 0,
        z2: 0
      })
    );
    const y = i + s * 0.34, v = i + s * 0.72, S = Math.min(48, Math.max(36, _ * 0.2)), x = S, w = d + S, M = Math.max(0, _ - S - x);
    if (g.add(
      new zrender.Text({
        style: {
          text: this._formatTimeLabel(c),
          x: d + S / 2,
          y,
          fontSize: 10,
          fill: "#64748B",
          align: "center",
          verticalAlign: "middle"
        },
        zlevel: X,
        z: 0,
        z2: 1,
        silent: !0
      })
    ), g.add(
      new zrender.Text({
        style: {
          text: this._formatTimeLabel(h),
          x: d + _ - x / 2,
          y,
          fontSize: 10,
          fill: "#64748B",
          align: "center",
          verticalAlign: "middle"
        },
        zlevel: X,
        z: 0,
        z2: 1,
        silent: !0
      })
    ), g.add(
      new zrender.Text({
        style: {
          text: this._truncateText(t.flightStatusText || t.name || "", M - 8, 10),
          x: w + M / 2,
          y,
          fontSize: 10,
          fill: "#111827",
          align: "center",
          verticalAlign: "middle"
        },
        zlevel: X,
        z: 0,
        z2: 1,
        silent: !0
      })
    ), g.add(
      new zrender.Text({
        style: {
          text: this._truncateText(t.taskName || t.name || `Task ${t.id}`, _ - 12, 11),
          x: d + _ / 2,
          y: v,
          fontSize: 11,
          fill: "#111827",
          align: "center",
          verticalAlign: "middle"
        },
        zlevel: X,
        z: 0,
        z2: 1,
        silent: !0
      })
    ), o) {
      const C = new zrender.Rect({
        shape: m,
        style: {
          fill: "rgba(0,0,0,0)"
        },
        cursor: "pointer",
        zlevel: X,
        z: 0,
        z2: 20,
        ondblclick: (A) => {
          var R;
          (R = this._assignmentMachine) == null || R.selectTask(t), ye(A.event);
        }
      });
      C.__testId = `unassigned-task-${t.id}`, g.add(C);
    }
    return g;
  }
  _bindTaskEvents(t, e) {
    t.cursor = "pointer";
  }
  _handleGlobalMouseMove(t) {
    var r;
    const e = (r = this._assignmentMachine) == null ? void 0 : r.getContext(), i = e == null ? void 0 : e.taskData;
    if (!i || this._assigning) {
      this._clearAssignmentGhost();
      return;
    }
    const s = this._hitMainResourceRow(t.offsetX, t.offsetY);
    if (!s) {
      this._assignmentMachine.getState() === "previewing" && this._assignmentMachine.leaveGrid(), this._clearAssignmentGhost();
      return;
    }
    this._assignmentMachine.getState() === "selected" && this._assignmentMachine.enterGrid(), this._assignmentMachine.moveHover({
      hoverResourceId: s.resourceId,
      hoverResourceIndex: s.resourceIndex,
      hoverY: s.rowY
    }), this._renderAssignmentGhost(i, s);
  }
  _handleGlobalClick(t) {
    return rr(this, null, function* () {
      var r;
      const e = (r = this._assignmentMachine) == null ? void 0 : r.getContext(), i = e == null ? void 0 : e.taskData;
      if (!i || this._assigning) return;
      const s = this._hitMainResourceRow(t.offsetX, t.offsetY);
      s && (this._assignmentMachine.getState() === "selected" && this._assignmentMachine.enterGrid(), this._assignmentMachine.moveHover({
        hoverResourceId: s.resourceId,
        hoverResourceIndex: s.resourceIndex,
        hoverY: s.rowY
      }), this._assignmentMachine.clickGrid() && (yield this._assignSelectedTask(i, s)));
    });
  }
  _assignSelectedTask(t, e) {
    return rr(this, null, function* () {
      var r, o, a;
      const i = this._getAssignTaskHandler(), s = (r = t.id) != null ? r : t.taskId;
      if (!(!i || s == null)) {
        this._assigning = !0, this._assignmentMachine.confirm();
        try {
          const l = yield i({
            newResourceId: e.resourceId,
            taskId: s,
            date: this._formatDate((a = (o = t.taskDate) != null ? o : t.scheduleStartTime) != null ? a : t.startTime),
            force: !1
          });
          l != null && l.success ? (console.info("派遣成功"), this._assignmentMachine.submitOk(), this._assignmentMachine.wsUpdate(), this._assignmentMachine.refreshOk(), this._clearAssignmentGhost()) : (console.info("派遣失败"), this._assignmentMachine.fail("SUBMIT_FAIL", "assign failed"));
        } catch (l) {
          this._assignmentMachine.fail("SUBMIT_FAIL", l);
        } finally {
          this._assigning = !1;
        }
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
    o && (o.silent = !0, o.attr({ zlevel: X, z: 0, z2: 20 }), this._setGroupOpacity(o, 0.48), this._assignmentGhostGroup = o, this.group.add(o));
  }
  _clearAssignmentGhost() {
    this._assignmentGhostGroup && (this.group.remove(this._assignmentGhostGroup), this._assignmentGhostGroup = null);
  }
  _applySelectedTaskEffect(t, e) {
    var o, a;
    const i = e.id;
    if (!this._isTaskSelected(e))
      return;
    const s = (a = (o = this.api) == null ? void 0 : o.getTweenManager) == null ? void 0 : a.call(o);
    if (!s)
      return;
    const r = s.presets.shakeY(t, {
      amplitude: 3,
      duration: 180,
      restore: !0,
      loop: !0
    });
    this._selectedTaskTweens.set(i, r);
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
    l.attr({ zlevel: X, z: 0, z2: 1 });
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
          zlevel: X,
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
          zlevel: X,
          z: 0,
          z2: 1,
          silent: !0
        })
      );
    }
    o.forEach((u) => {
      const f = e.x + u.coord;
      f < e.x || f > e.x + e.width || l.add(
        new zrender.Line({
          shape: {
            x1: f,
            y1: 0,
            x2: f,
            y2: r
          },
          style: {
            stroke: "#EDF1F5",
            lineWidth: 1
          },
          zlevel: X,
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
    p.attr({ zlevel: X, z: 0, z2: 6 }), p.add(
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
        zlevel: X,
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
      zlevel: X,
      z: 0,
      z2: 1,
      cursor: "ns-resize",
      draggable: !0,
      ondragstart: (g) => {
        this._mainScrollDragStartY = g.offsetY, this._mainScrollDragStartStart = r[0], ye(g.event);
      },
      drift: (g, m, y) => {
        var b, T;
        const v = ((T = (b = this._getVerticalDataZoomModel()) == null ? void 0 : b.getPercentRange) == null ? void 0 : T.call(b)) || r, S = Math.max(1, Math.min(100, v[1] - v[0])), x = Math.max(1, 100 - S), w = y.offsetY - this._mainScrollDragStartY, M = this._mainScrollDragStartStart + w / c * x;
        this._dispatchVerticalDataZoom(M, M + S), ye(y.event);
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
    const s = String(t || ""), r = Math.max(1, Math.floor(e / (i * 0.9)));
    return s.length > r ? `${s.slice(0, Math.max(1, r - 1))}...` : s;
  }
};
Jo.type = "unassignedBoard";
let Ac = Jo;
const Ps = class Ps extends W {
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
let Ec = Ps;
function R2(n) {
  n.registerComponentModel(Ec), n.registerComponentView(Ac);
}
function P2(n) {
  n.registerAction({
    type: "updateResourceFilter",
    update: "update"
  }, function(t, e, i) {
    const s = t.assignedData || [], r = t.unassignedData || [], o = t.resourceData || [], a = t.resources || [];
    e.eachSeries(function(l) {
      var c, h;
      l.id === "assignedTasks" && ((c = l.updateData) == null || c.call(l, s, e)), l.id === "resourceRows" && ((h = l.updateData) == null || h.call(l, o, e));
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
      const l = a.getOrient(), c = i.getViewOfComponentModel(a), h = Math.max(i.getHeight() - s + zw, 0);
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
        const g = L2(e, i, s), m = (p = (d = (f = a.findRepresentativeAxisProxy) == null ? void 0 : f.call(a)) == null ? void 0 : d.getDataValueWindow) == null ? void 0 : p.call(d), y = a.getPercentRange(), v = k2(m, y, g);
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
function L2(n, t, e) {
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
function k2(n, t, e) {
  var o;
  if (!n || n.length < 2 || !e)
    return [0, e || 1];
  const i = Math.max(1, n[1] - n[0]);
  if (Math.abs(((o = t == null ? void 0 : t[1]) != null ? o : 0) - 100) < 0.5)
    return [Math.max(0, e - i), e];
  const r = Math.max(0, Math.min(n[0], e - i));
  return [r, Math.min(e, r + i)];
}
function O2(n) {
  R2(n), P2(n);
}
const Re = {
  filter: "资源过滤",
  active: "当前已有过滤条件",
  inactive: "当前没有过滤条件",
  name: "姓名",
  all: "全部资源",
  reset: "重置",
  apply: "应用"
}, F2 = "M435.6 590.6L206.6 247v-76.3h610.8V247l-229 343.6v229L435.6 896V590.6z", Z = (n, t, e) => {
  const i = document.createElement(n);
  return t && (i.className = t), e && (i.textContent = e), i;
}, N2 = (n) => {
  const t = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  t.setAttribute("viewBox", "0 0 1024 1024"), t.setAttribute("width", "16"), t.setAttribute("height", "16"), t.setAttribute("aria-hidden", "true");
  const e = document.createElementNS("http://www.w3.org/2000/svg", "path");
  return e.setAttribute("d", F2), e.setAttribute("fill", n ? "#1296db" : "#8a8a8a"), t.appendChild(e), t;
}, z2 = () => {
  if (document.getElementById("resource-filter-style")) return;
  const n = document.createElement("style");
  n.id = "resource-filter-style", n.textContent = `
    .resource-filter-host {
      position: absolute;
      left: 0;
      top: 80px;
      width: 10%;
      min-width: 180px;
      max-width: 320px;
      height: 40px;
      z-index: 20;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #F3F4F6;
      border-bottom: 1px solid #CBD5E1;
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
      height: 26px;
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
      height: 26px;
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
      padding: 112px 0 0 18px;
      box-sizing: border-box;
    }
    .resource-filter__modal {
      width: 320px;
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
}, ta = class ta extends Zt {
  constructor() {
    super(...arguments), this.type = ta.type, this._host = null;
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
    z2();
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
    const s = Z("div", "resource-filter"), r = Z("button", "resource-filter__button"), o = Z("span", "", Re.filter), a = Z("span", "resource-filter__status"), l = !!this._currentResourceId && this._currentResourceId !== i, c = this._getVisibleResources(e, i, this._currentResourceId);
    r.type = "button", r.append(N2(l), o), r.onclick = () => this._openModal(t, e, i), a.textContent = String(c.length), a.title = l ? Re.active : Re.inactive, s.append(r, a), this._host.replaceChildren(s);
  }
  _openModal(t, e, i) {
    const s = Z("div", "resource-filter__backdrop"), r = Z("div", "resource-filter__modal"), o = Z("div", "resource-filter__modal-header"), a = Z("span", "", Re.filter), l = Z("button", "resource-filter__close", "×"), c = Z("div", "resource-filter__body"), h = Z("label", "resource-filter__field"), u = Z("span", "", Re.name), f = Z("div", "resource-filter__combobox"), d = Z("input", "resource-filter__combobox-input"), p = Z("button", "resource-filter__combobox-clear", "×"), _ = Z("div", "resource-filter__combobox-menu"), g = Z("div", "resource-filter__actions"), m = Z("button", "resource-filter__action", Re.reset), y = Z("button", "resource-filter__action resource-filter__action--primary", Re.apply);
    l.type = "button", m.type = "button", y.type = "button", d.type = "text", d.placeholder = "搜索资源名称或编号", d.setAttribute("aria-label", "搜索资源名称或编号"), d.setAttribute("role", "combobox"), d.setAttribute("aria-expanded", "false"), p.type = "button", p.title = "清除选择", p.setAttribute("aria-label", "清除选择"), _.setAttribute("role", "listbox"), _.hidden = !0;
    let v = "";
    const S = () => this._currentResourceId ? String(this._currentResourceId) : i, x = (C) => {
      if (C === i) return Re.all;
      const A = e.find((R) => String(R[1]) === String(C));
      return A ? A[0] || String(A[1]) : "";
    }, w = () => {
      const C = v.trim().toLocaleLowerCase(), A = e.filter(([F, V]) => C ? `${F || ""} ${V}`.toLocaleLowerCase().includes(C) : !0);
      _.replaceChildren();
      const R = [
        [Re.all, i],
        ...A
      ];
      R.forEach(([F, V]) => {
        const G = Z(
          "div",
          `resource-filter__combobox-option${String(V) === S() ? " resource-filter__combobox-option--selected" : ""}`,
          F || String(V)
        );
        G.setAttribute("role", "option"), G.setAttribute("aria-selected", String(V) === S() ? "true" : "false"), G.onmousedown = (rt) => {
          rt.preventDefault(), this._currentResourceId = V, v = "", T(), b(), w();
        }, _.appendChild(G);
      }), R.length || _.appendChild(Z("div", "resource-filter__combobox-empty", "暂无匹配资源"));
    }, M = () => {
      _.hidden = !1, d.setAttribute("aria-expanded", "true"), w();
    }, b = () => {
      _.hidden = !0, d.setAttribute("aria-expanded", "false");
    }, T = () => {
      d.value = v || x(S());
    };
    T(), w();
    const I = (C) => {
      var R;
      this._currentResourceId = C, this._writeStoredValue(t, C);
      const A = this._getVisibleResources(e, i, C);
      this._renderControl(t, e, i), (R = t.get("onChange")) == null || R({
        filter: { resourceId: C },
        visibleResources: A
      }), s.remove();
    };
    l.onclick = () => s.remove(), m.onclick = () => I(i), y.onclick = () => I(S()), d.onfocus = () => {
      v || (d.value = ""), M();
    }, d.onclick = M, d.onblur = () => {
      window.setTimeout(() => {
        f.contains(document.activeElement) || (v = "", T(), b());
      }, 0);
    }, d.oninput = () => {
      v = d.value, _.hidden = !1, d.setAttribute("aria-expanded", "true"), w();
    }, d.onkeydown = (C) => {
      C.key === "Escape" && b();
    }, p.onclick = () => {
      this._currentResourceId = i, v = "", T(), M(), d.focus();
    }, s.onclick = (C) => {
      C.target === s && s.remove();
    }, o.append(a, l), f.append(d, p, _), h.append(u, f), c.appendChild(h), g.append(m, y), r.append(o, c, g), s.appendChild(r), document.body.appendChild(s);
  }
};
ta.type = "resourceFilter";
let Rc = ta;
const Ls = class Ls extends W {
  constructor() {
    super(...arguments), this.type = Ls.type;
  }
};
Ls.type = "resourceFilter", Ls.defaultOption = {
  show: !0,
  resources: [],
  allValue: "__ALL__",
  storageKey: "gantt.resourceFilter"
};
let Pc = Ls;
function B2(n) {
  n.registerComponentModel(Pc), n.registerComponentView(Rc);
}
function $2(n) {
  B2(n);
}
const H2 = "M576 381.7l341.3 215.6v85.3L576 574.9v228.7l128 71.1v64L512 896l-192 42.7v-64l128-71.1V574.8L106.7 682.7v-85.3L448 381.7V149.3c0-35.3 28.7-64 64-64s64 28.7 64 64v232.4z", G2 = "M7.41 8.59 12 4l4.59 4.59L18 7.17l-6-6-6 6 1.41 1.42zM16.59 15.41 12 20l-4.59-4.59L6 16.83l6 6 6-6-1.41-1.42z", Y2 = "M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z", V2 = (n, t = 18) => {
  const e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  e.setAttribute("viewBox", "0 0 24 24"), e.setAttribute("width", String(t)), e.setAttribute("height", String(t)), e.setAttribute("aria-hidden", "true");
  const i = document.createElementNS("http://www.w3.org/2000/svg", "path");
  return i.setAttribute("d", n), i.setAttribute("fill", "#334155"), e.appendChild(i), e;
}, W2 = () => {
  const n = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  n.setAttribute("viewBox", "0 0 24 24"), n.setAttribute("width", "18"), n.setAttribute("height", "18"), n.setAttribute("aria-hidden", "true");
  const t = document.createElementNS("http://www.w3.org/2000/svg", "path");
  return t.setAttribute("d", Y2), t.setAttribute("fill", "#334155"), n.appendChild(t), n;
}, U2 = (n = 16) => {
  const t = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  t.setAttribute("viewBox", "0 0 1024 1024"), t.setAttribute("width", String(n)), t.setAttribute("height", String(n)), t.setAttribute("aria-hidden", "true"), t.setAttribute("focusable", "false");
  const e = document.createElementNS("http://www.w3.org/2000/svg", "path");
  return e.setAttribute("d", H2), e.setAttribute("fill", "currentColor"), t.appendChild(e), t;
}, kn = (n, t) => {
  const e = document.createElement(n);
  return t && (e.className = t), e;
}, q2 = () => {
  if (document.getElementById("gantt-query-liquid-glass-svg")) return;
  const n = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  n.setAttribute("id", "gantt-query-liquid-glass-svg"), n.setAttribute("width", "0"), n.setAttribute("height", "0"), n.setAttribute("aria-hidden", "true"), n.style.position = "absolute", n.style.pointerEvents = "none", n.innerHTML = `
    <defs>
      <filter id="gantt-query-liquid-glass-filter" x="-20%" y="-70%" width="140%" height="240%" color-interpolation-filters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.018 0.085" numOctaves="2" seed="8" result="noise" />
        <feGaussianBlur in="noise" stdDeviation="3" result="softNoise" />
        <feDisplacementMap in="SourceGraphic" in2="softNoise" scale="6" xChannelSelector="R" yChannelSelector="G" result="refracted" />
        <feColorMatrix in="refracted" type="saturate" values="1.26" />
      </filter>
    </defs>
  `, document.body.appendChild(n);
}, X2 = () => {
  if (q2(), document.getElementById("gantt-query-style")) return;
  const n = document.createElement("style");
  n.id = "gantt-query-style", n.textContent = `
    .gantt-query-host {
      position: absolute;
      z-index: 20;
      box-sizing: border-box;
      max-width: calc(100% - 96px);
      isolation: isolate;
    }
    .gantt-query {
      position: relative;
      overflow: visible;
      width: 100%;
      height: 44px;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 0 8px 0 16px;
      box-sizing: border-box;
      border: 1px solid rgba(255, 255, 255, 0.58);
      border-radius: 22px;
      background:
        linear-gradient(135deg, rgba(255, 255, 255, 0.62), rgba(236, 244, 249, 0.28)),
        rgba(255, 255, 255, 0.32);
      box-shadow:
        0 14px 28px rgba(71, 85, 105, 0.15),
        inset 0 1px 1px rgba(255, 255, 255, 0.86),
        inset 0 -12px 22px rgba(148, 163, 184, 0.12);
      transition:
        box-shadow 180ms ease,
        background 180ms ease,
        border-color 180ms ease;
      backdrop-filter: url(#gantt-query-liquid-glass-filter) blur(8px) saturate(1.35);
      -webkit-backdrop-filter: url(#gantt-query-liquid-glass-filter) blur(8px) saturate(1.35);
    }
    .gantt-query-host {
      transition: width 220ms cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    .gantt-query-host:focus-within {
      width: 360px !important;
    }
    .gantt-query:focus-within {
      box-shadow:
        0 18px 34px rgba(71, 85, 105, 0.18),
        inset 0 1px 1px rgba(255, 255, 255, 0.9),
        inset 0 -12px 22px rgba(148, 163, 184, 0.12);
    }
    .gantt-query::before {
      content: '';
      position: absolute;
      inset: 1px;
      border-radius: inherit;
      pointer-events: none;
      background:
        radial-gradient(circle at 16% 0%, rgba(255, 255, 255, 0.95), transparent 32%),
        linear-gradient(115deg, rgba(255, 255, 255, 0.38), transparent 42%);
      opacity: 0.72;
      mix-blend-mode: screen;
    }
    .gantt-query::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      box-shadow:
        inset 1px 0 2px rgba(255, 255, 255, 0.7),
        inset -1px 0 2px rgba(148, 163, 184, 0.24),
        inset 0 -1px 1px rgba(15, 23, 42, 0.08);
    }
    .gantt-query__icon {
      position: relative;
      z-index: 1;
      flex: 0 0 auto;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .gantt-query__input {
      position: relative;
      z-index: 1;
      min-width: 0;
      width: 100%;
      height: 100%;
      border: 0;
      outline: 0;
      background: transparent;
      color: #334155;
      font: 14px Arial, sans-serif;
    }
    .gantt-query__input::placeholder {
      color: #94A3B8;
      opacity: 1;
    }
    .gantt-query__condition-chip {
      position: relative;
      z-index: 1;
      flex: 0 0 auto;
      max-width: 86px;
      height: 22px;
      padding: 0 7px;
      border: 1px solid rgba(148, 163, 184, 0.58);
      border-radius: 4px;
      background:
        linear-gradient(135deg, rgba(255, 255, 255, 0.52), rgba(241, 245, 249, 0.3)),
        rgba(255, 255, 255, 0.34);
      box-shadow:
        inset 0 1px 1px rgba(255, 255, 255, 0.7),
        0 2px 6px rgba(71, 85, 105, 0.08);
      color: #64748B;
      font: 700 10px Arial, sans-serif;
      letter-spacing: 0.02em;
      text-transform: uppercase;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .gantt-query__condition-switch {
      position: relative;
      z-index: 1;
      flex: 0 0 auto;
      width: 26px;
      height: 30px;
      border: 0;
      border-radius: 999px;
      background: transparent;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 160ms ease;
    }
    .gantt-query__condition-switch:hover {
      background: rgba(255, 255, 255, 0.34);
    }
    .gantt-query__aircraft-button {
      position: relative;
      z-index: 1;
      flex: 0 0 auto;
      width: 28px;
      height: 30px;
      padding: 0;
      border: 0;
      border-radius: 999px;
      background: transparent;
      color: #334155;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition:
        color 160ms ease,
        background 160ms ease,
        transform 160ms ease;
    }
    .gantt-query-host > .gantt-query__aircraft-button {
      position: absolute;
      top: 7px;
      right: -42px;
      z-index: 2;
      border: 1px solid rgba(255, 255, 255, 0.62);
      background:
        linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(226, 232, 240, 0.34)),
        rgba(255, 255, 255, 0.38);
      box-shadow:
        0 8px 18px rgba(71, 85, 105, 0.16),
        inset 0 1px 1px rgba(255, 255, 255, 0.88),
        inset 0 -5px 10px rgba(148, 163, 184, 0.14);
      backdrop-filter: blur(8px) saturate(1.3);
      -webkit-backdrop-filter: blur(8px) saturate(1.3);
    }
    .gantt-query__aircraft-button:hover {
      color: #2563EB;
      background: rgba(37, 99, 235, 0.08);
    }
    .gantt-query__aircraft-button:active {
      transform: scale(0.92);
    }
    .gantt-query__aircraft-button svg {
      transform-origin: 50% 50%;
      will-change: transform, opacity;
    }
    .gantt-query__aircraft-button.is-flying svg {
      animation: gantt-query-aircraft-fly 720ms cubic-bezier(0.22, 0.8, 0.24, 1) both;
    }
    @keyframes gantt-query-aircraft-fly {
      0% {
        opacity: 1;
        transform: translate(0, 0) rotate(0deg) scale(1);
      }
      42% {
        opacity: 0;
        transform: translate(18px, -34px) rotate(18deg) scale(0.72);
      }
      43% {
        opacity: 0;
        transform: translate(-14px, 18px) rotate(18deg) scale(0.72);
      }
      100% {
        opacity: 1;
        transform: translate(0, 0) rotate(0deg) scale(1);
      }
    }
  `, document.head.appendChild(n);
}, ea = class ea extends Zt {
  constructor() {
    super(...arguments), this.type = ea.type, this._host = null, this._conditionIndex = 0;
  }
  render(t, e, i) {
    var u, f;
    if (this._ensureHost(i), !this._host) return;
    this._host.style.display = t.get("show") ? "block" : "none", this._host.style.width = `${t.get("width") || 336}px`, this._host.style.top = `${(u = t.get("top")) != null ? u : 80}px`, this._host.style.right = `${(f = t.get("right")) != null ? f : 18}px`;
    const s = kn("div", "gantt-query"), r = kn("span", "gantt-query__icon"), o = kn("input", "gantt-query__input"), a = kn("span", "gantt-query__condition-chip"), l = kn("button", "gantt-query__aircraft-button"), c = kn("button", "gantt-query__condition-switch"), h = t.get("conditions") || ["任务名", "资源名", "航班号", "进出港"];
    o.type = "search", o.placeholder = t.get("placeholder") || "Search", o.value = t.get("value") || "", this._conditionIndex >= h.length && (this._conditionIndex = 0), a.textContent = h[this._conditionIndex], c.type = "button", c.title = "切换搜索条件", c.appendChild(V2(G2, 16)), c.onclick = () => {
      this._conditionIndex = (this._conditionIndex + 1) % h.length, this.render(t, e, i);
    }, l.type = "button", l.title = "查询航班号", l.appendChild(U2(16)), l.onclick = () => {
      l.classList.remove("is-flying"), l.offsetWidth, l.classList.add("is-flying");
    }, r.appendChild(W2()), s.append(r, o, a, c), this._host.replaceChildren(s, l);
  }
  dispose() {
    var t;
    (t = this._host) == null || t.remove(), this._host = null;
  }
  _ensureHost(t) {
    var r, o;
    if (this._host) return;
    X2();
    const e = t.getZr(), i = e.dom || ((o = (r = e.painter) == null ? void 0 : r.getViewportRoot) == null ? void 0 : o.call(r)), s = (i == null ? void 0 : i.parentElement) || document.body;
    s !== document.body && window.getComputedStyle(s).position === "static" && (s.style.position = "relative"), this._host = kn("div", "gantt-query-host"), s.appendChild(this._host);
  }
};
ea.type = "ganttQuery";
let Lc = ea;
const ks = class ks extends W {
  constructor() {
    super(...arguments), this.type = ks.type;
  }
};
ks.type = "ganttQuery", ks.defaultOption = {
  show: !0,
  placeholder: "Search",
  value: "",
  width: 280,
  top: 34,
  right: 96,
  conditions: ["任务名", "资源名", "航班号", "进出港"]
};
let kc = ks;
function Z2(n) {
  n.registerComponentModel(kc), n.registerComponentView(Lc);
}
function K2(n) {
  Z2(n);
}
const Yn = 210, nn = 150, j2 = 75, Yr = (n, t) => {
  const e = document.createElement(n);
  return t && (e.className = t), e;
}, Ml = (n) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${Yn}" height="${nn}" viewBox="0 0 ${Yn} ${nn}">
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
  `)}`, Q2 = () => {
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
      width: ${Yn}px;
      height: ${nn}px;
      border-radius: ${j2}px;
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
}, J2 = () => {
  const n = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  return n.setAttribute("color-interpolation-filters", "sRGB"), n.style.display = "none", n.innerHTML = `
    <defs>
      <filter id="magnifying-glass-filter">
        <feImage href="${Ml("magnify")}" x="0" y="0" width="${Yn}" height="${nn}" result="magnifying_displacement_map" />
        <feDisplacementMap in="SourceGraphic" in2="magnifying_displacement_map" xChannelSelector="R" yChannelSelector="G" result="magnified_source" scale="24" />
        <feGaussianBlur in="magnified_source" stdDeviation="0" result="blurred_source" />
        <feImage href="${Ml("edge")}" x="0" y="0" width="${Yn}" height="${nn}" result="displacement_map" />
        <feDisplacementMap in="blurred_source" in2="displacement_map" xChannelSelector="R" yChannelSelector="G" result="displaced" scale="98" />
        <feColorMatrix in="displaced" type="saturate" result="displaced_saturated" values="9" />
        <feImage href="${Ml("specular")}" x="0" y="0" width="${Yn}" height="${nn}" result="specular_layer" />
        <feComposite in="displaced_saturated" in2="specular_layer" operator="in" result="specular_saturated" />
        <feComponentTransfer in="specular_layer" result="specular_faded">
          <feFuncA type="linear" slope="0.5" />
        </feComponentTransfer>
        <feBlend in="specular_saturated" in2="displaced" mode="normal" result="withSaturation" />
        <feBlend in="specular_faded" in2="withSaturation" mode="normal" />
      </filter>
    </defs>
  `, n;
}, na = class na extends Zt {
  constructor() {
    super(...arguments), this.type = na.type, this._host = null, this._widget = null, this._filterSvg = null, this._dragStartX = 0, this._dragStartY = 0, this._startLeft = 0, this._startTop = 0;
  }
  render(t, e, i) {
    var o, a;
    if (this._ensureHost(i, t), !this._host || !this._widget) return;
    this._host.style.display = t.get("show") ? "block" : "none", this._host.style.zIndex = String(t.get("zIndex") || 40), this._widget.style.width = `${t.get("width") || Yn}px`, this._widget.style.height = `${t.get("height") || nn}px`, this._widget.style.borderRadius = `${(t.get("height") || nn) / 2}px`, this._widget.style.left = `${(o = t.get("left")) != null ? o : 24}px`, this._widget.style.top = `${(a = t.get("top")) != null ? a : 24}px`;
    const s = Yr("div", "liquid-glass-widget__lens"), r = Yr("div", "liquid-glass-widget__content");
    r.textContent = t.get("title") || "", this._widget.replaceChildren(this._filterSvg, s, r);
  }
  dispose() {
    var t;
    (t = this._host) == null || t.remove(), this._host = null, this._widget = null, this._filterSvg = null;
  }
  _ensureHost(t, e) {
    var o, a;
    if (this._host && this._widget) return;
    Q2();
    const i = t.getZr(), s = i.dom || ((a = (o = i.painter) == null ? void 0 : o.getViewportRoot) == null ? void 0 : a.call(o)), r = (s == null ? void 0 : s.parentElement) || document.body;
    r !== document.body && window.getComputedStyle(r).position === "static" && (r.style.position = "relative"), this._host = Yr("div", "liquid-glass-layer-host"), this._widget = Yr("div", "liquid-glass-widget"), this._filterSvg = J2(), this._bindDrag(e), this._host.appendChild(this._widget), r.appendChild(this._host);
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
na.type = "liquidGlassLayer";
let Oc = na;
const Os = class Os extends W {
  constructor() {
    super(...arguments), this.type = Os.type;
  }
};
Os.type = "liquidGlassLayer", Os.defaultOption = {
  show: !1,
  width: 210,
  height: 150,
  left: 24,
  top: 24,
  zIndex: 40,
  title: ""
};
let Fc = Os;
function tT(n) {
  n.registerComponentModel(Fc), n.registerComponentView(Oc);
}
function eT(n) {
  tT(n);
}
const nT = [
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
class iT {
  constructor(t) {
    D(
      nT,
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
class v_ {
  constructor(t, e, i, s) {
    this._stageTaskMap = O(), this.piInstance = t, this.api = e, i = this._dataProcessorHandlers = i.slice(), s = this._visualHandlers = s.slice(), this._allHandlers = i.concat(s);
  }
  restorePipelines(t) {
    const e = this, i = e._pipelineMap = O();
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
    const r = this, o = e.seriesTaskMap, a = e.seriesTaskMap = O(), l = t.seriesType, c = t.getTargetSeries;
    t.createOnAllSeries ? i.eachRawSeries(h) : l ? i.eachRawSeriesByType(l, h) : c && c(i, s).each(h);
    function h(u) {
      const f = u.uid, d = a.set(
        f,
        o && o.get(f) || _s({
          plan: aT,
          reset: lT,
          count: pT
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
    _s({ reset: hT });
    o.context = {
      piModel: i,
      api: s,
      overallReset: t.overallReset,
      scheduler: r
    };
    const a = o.agentStubMap, l = o.agentStubMap = O(), c = t.seriesType, h = t.getTargetSeries;
    let u = !0, f = !1;
    c ? i.eachRawSeriesByType(c, d) : h ? h(i, s).each(d) : (u = !1, D(i.getSeries(), d));
    function d(p) {
      const _ = p.uid, g = l.set(
        _,
        a && a.get(_) || // When the result of `getTargetSeries` changed, the overallTask
        // should be set as dirty and re-performed.
        (f = !0, _s({
          reset: uT,
          onDirty: dT
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
      seriesType: sT(t)
    }), t.uid = ca("stageHandler"), e && (t.visualType = e), t;
  }
}
function sT(n) {
  Ad = null;
  try {
    n(rT, oT);
  } catch (t) {
  }
  return Ad;
}
const rT = {}, oT = {};
let Ad;
function aT(n) {
  return n.plan ? n.plan(n.model, n.piModel, n.api, n.payload) : null;
}
function lT(n) {
  n.useClearVisual && n.data.clearAllVisual();
  const t = n.resetDefines = Wt(
    n.reset(n.model, n.piModel, n.api, n.payload)
  );
  return t.length > 1 ? H(t, function(e, i) {
    return w_(i);
  }) : cT;
}
const cT = w_(0);
function w_(n) {
  return function(t, e) {
    const i = e.data, s = e.resetDefines[n];
    if (s && s.dataEach)
      for (let r = t.start; r < t.end; r++)
        s.dataEach(i, r);
    else s && s.progress && s.progress(t, i);
  };
}
function hT(n) {
  n.overallReset(n.piModel, n.api, n.payload);
}
function uT(n) {
  return n.overallProgress && fT;
}
function fT() {
  this.agent.dirty(), this.getDownstream().dirty();
}
function dT() {
  this.agent && this.agent.dirty();
}
function pT(n) {
  return n.data.count();
}
const gT = [
  "symbol",
  "symbolSize",
  "symbolRotate",
  "symbolOffset"
], Ed = gT.concat(["symbolKeepAspect"]), _T = {
  createOnAllSeries: !0,
  // For legend.
  performRawSeries: !0,
  reset: function(n, t) {
    if (!n.hasSymbolVisual || t.isSeriesFiltered(n))
      return;
    const e = n.getData();
    function i(s, r) {
      const o = s.getItemModel(r);
      for (let a = 0; a < Ed.length; a++) {
        const l = Ed[a], c = o.getShallow(l, !0);
        c != null && s.setItemVisual(r, l, c);
      }
    }
    return { dataEach: e.hasItemOption ? i : null };
  }
};
function zn(n) {
  return isFinite(n);
}
function mT(n, t, e) {
  var i = t.x == null ? 0 : t.x, s = t.x2 == null ? 1 : t.x2, r = t.y == null ? 0 : t.y, o = t.y2 == null ? 0 : t.y2;
  t.global || (i = i * e.width + e.x, s = s * e.width + e.x, r = r * e.height + e.y, o = o * e.height + e.y), i = zn(i) ? i : 0, s = zn(s) ? s : 1, r = zn(r) ? r : 0, o = zn(o) ? o : 0;
  var a = n.createLinearGradient(i, r, s, o);
  return a;
}
function yT(n, t, e) {
  var i = e.width, s = e.height, r = Math.min(i, s), o = t.x == null ? 0.5 : t.x, a = t.y == null ? 0.5 : t.y, l = t.r == null ? 0.5 : t.r;
  t.global || (o = o * i + e.x, a = a * s + e.y, l = l * r), o = zn(o) ? o : 0.5, a = zn(a) ? a : 0.5, l = l >= 0 && zn(l) ? l : 0.5;
  var c = n.createRadialGradient(o, a, 0, o, a, l);
  return c;
}
function Nc(n, t, e) {
  for (var i = t.type === "radial" ? yT(n, t, e) : mT(n, t, e), s = t.colorStops, r = 0; r < s.length; r++)
    i.addColorStop(s[r].offset, s[r].color);
  return i;
}
function vT(n, t) {
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
function Wr(n, t, e) {
  var i = ["width", "height"][t], s = ["clientWidth", "clientHeight"][t], r = ["paddingLeft", "paddingTop"][t], o = ["paddingRight", "paddingBottom"][t];
  if (e[i] != null && e[i] !== "auto")
    return parseFloat(e[i]);
  var a = document.defaultView.getComputedStyle(n);
  return (n[s] || Vr(a[i]) || Vr(n.style[i])) - (Vr(a[r]) || 0) - (Vr(a[o]) || 0) | 0;
}
var Rd = new uh(50);
function x_(n, t, e, i, s) {
  if (n)
    if (typeof n == "string") {
      if (t && t.__zrImageSrc === n || !e)
        return t;
      var r = Rd.get(n), o = { hostEl: e, cb: i, cbPayload: s };
      return r ? (t = r.image, !Ih(t) && r.pending.push(o)) : (t = er.loadImage(n, Pd, Pd), t.__zrImageSrc = n, Rd.put(n, t.__cachedImgObj = {
        image: t,
        pending: [o]
      })), t;
    } else
      return n;
  else return t;
}
function Pd() {
  var n = this.__cachedImgObj;
  this.onload = this.onerror = this.__cachedImgObj = null;
  for (var t = 0; t < n.pending.length; t++) {
    var e = n.pending[t], i = e.cb;
    i && i(this, e.cbPayload), e.hostEl.dirty();
  }
  n.pending.length = 0;
}
function Ih(n) {
  return n && n.width && n.height;
}
var wT = Ce({
  strokeFirst: !0,
  font: Bs,
  x: 0,
  y: 0,
  textAlign: "left",
  textBaseline: "top",
  miterLimit: 2
}, Cg), S_ = (function(n) {
  qn(t, n);
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
    return da(wT, e);
  }, t.prototype.setBoundingRect = function(e) {
    this._rect = e;
  }, t.prototype.getBoundingRect = function() {
    var e = this.style;
    if (!this._rect) {
      var i = e.text;
      i != null ? i += "" : i = "";
      var s = Ov(i, e.font, e.textAlign, e.textBaseline);
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
})(ph);
S_.prototype.type = "tspan";
function xT(n, t) {
  return !n || n === "solid" || !(t > 0) ? null : n === "dashed" ? [4 * t, 2 * t] : n === "dotted" ? [t] : se(n) ? [n] : Ii(n) ? n : null;
}
function b_(n) {
  var t = n.style, e = t.lineDash && t.lineWidth > 0 && xT(t.lineDash, t.lineWidth), i = t.lineDashOffset;
  if (e) {
    var s = t.strokeNoScale && n.getLineScale ? n.getLineScale() : 1;
    s && s !== 1 && (e = re(e, function(r) {
      return r / s;
    }), i /= s);
  }
  return [e, i];
}
var ST = new Ri(!0);
function Oo(n) {
  var t = n.stroke;
  return !(t == null || t === "none" || !(n.lineWidth > 0));
}
function Ld(n) {
  return typeof n == "string" && n !== "none";
}
function Fo(n) {
  var t = n.fill;
  return t != null && t !== "none";
}
function kd(n, t) {
  if (t.fillOpacity != null && t.fillOpacity !== 1) {
    var e = n.globalAlpha;
    n.globalAlpha = t.fillOpacity * t.opacity, n.fill(), n.globalAlpha = e;
  } else
    n.fill();
}
function Od(n, t) {
  if (t.strokeOpacity != null && t.strokeOpacity !== 1) {
    var e = n.globalAlpha;
    n.globalAlpha = t.strokeOpacity * t.opacity, n.stroke(), n.globalAlpha = e;
  } else
    n.stroke();
}
function zc(n, t, e) {
  var i = x_(t.image, t.__image, e);
  if (Ih(i)) {
    var s = n.createPattern(i, t.repeat || "repeat");
    if (typeof DOMMatrix == "function" && s && s.setTransform) {
      var r = new DOMMatrix();
      r.translateSelf(t.x || 0, t.y || 0), r.rotateSelf(0, 0, (t.rotation || 0) * Dm), r.scaleSelf(t.scaleX || 1, t.scaleY || 1), s.setTransform(r);
    }
    return s;
  }
}
function bT(n, t, e, i) {
  var s, r = Oo(e), o = Fo(e), a = e.strokePercent, l = a < 1, c = !t.path;
  (!t.silent || l) && c && t.createPathProxy();
  var h = t.path || ST, u = t.__dirty;
  if (!i) {
    var f = e.fill, d = e.stroke, p = o && !!f.colorStops, _ = r && !!d.colorStops, g = o && !!f.image, m = r && !!d.image, y = void 0, v = void 0, S = void 0, x = void 0, w = void 0;
    (p || _) && (w = t.getBoundingRect()), p && (y = u ? Nc(n, f, w) : t.__canvasFillGradient, t.__canvasFillGradient = y), _ && (v = u ? Nc(n, d, w) : t.__canvasStrokeGradient, t.__canvasStrokeGradient = v), g && (S = u || !t.__canvasFillPattern ? zc(n, f, t) : t.__canvasFillPattern, t.__canvasFillPattern = S), m && (x = u || !t.__canvasStrokePattern ? zc(n, d, t) : t.__canvasStrokePattern, t.__canvasStrokePattern = S), p ? n.fillStyle = y : g && (S ? n.fillStyle = S : o = !1), _ ? n.strokeStyle = v : m && (x ? n.strokeStyle = x : r = !1);
  }
  var M = t.getGlobalScale();
  h.setScale(M[0], M[1], t.segmentIgnoreThreshold);
  var b, T;
  n.setLineDash && e.lineDash && (s = b_(t), b = s[0], T = s[1]);
  var I = !0;
  (c || u & ui) && (h.setDPR(n.dpr), l ? h.setContext(null) : (h.setContext(n), I = !1), h.reset(), t.buildPath(h, t.shape, i), h.toStatic(), t.pathUpdated()), I && h.rebuildPath(n, l ? a : 1), b && (n.setLineDash(b), n.lineDashOffset = T), i || (e.strokeFirst ? (r && Od(n, e), o && kd(n, e)) : (o && kd(n, e), r && Od(n, e))), b && n.setLineDash([]);
}
function TT(n, t, e) {
  var i = t.__image = x_(e.image, t.__image, t, t.onload);
  if (!(!i || !Ih(i))) {
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
function MT(n, t, e) {
  var i, s = e.text;
  if (s != null && (s += ""), s) {
    n.font = e.font || Bs, n.textAlign = e.textAlign, n.textBaseline = e.textBaseline;
    var r = void 0, o = void 0;
    n.setLineDash && e.lineDash && (i = b_(t), r = i[0], o = i[1]), r && (n.setLineDash(r), n.lineDashOffset = o), e.strokeFirst ? (Oo(e) && n.strokeText(s, e.x, e.y), Fo(e) && n.fillText(s, e.x, e.y)) : (Fo(e) && n.fillText(s, e.x, e.y), Oo(e) && n.strokeText(s, e.x, e.y)), r && n.setLineDash([]);
  }
}
var Fd = ["shadowBlur", "shadowOffsetX", "shadowOffsetY"], Nd = [
  ["lineCap", "butt"],
  ["lineJoin", "miter"],
  ["miterLimit", 10]
];
function T_(n, t, e, i, s) {
  var r = !1;
  if (!i && (e = e || {}, t === e))
    return !1;
  if (i || t.opacity !== e.opacity) {
    gt(n, s), r = !0;
    var o = Math.max(Math.min(t.opacity, 1), 0);
    n.globalAlpha = isNaN(o) ? $n.opacity : o;
  }
  (i || t.blend !== e.blend) && (r || (gt(n, s), r = !0), n.globalCompositeOperation = t.blend || $n.blend);
  for (var a = 0; a < Fd.length; a++) {
    var l = Fd[a];
    (i || t[l] !== e[l]) && (r || (gt(n, s), r = !0), n[l] = n.dpr * (t[l] || 0));
  }
  return (i || t.shadowColor !== e.shadowColor) && (r || (gt(n, s), r = !0), n.shadowColor = t.shadowColor || $n.shadowColor), r;
}
function zd(n, t, e, i, s) {
  var r = Js(t, s.inHover), o = i ? null : e && Js(e, s.inHover) || {};
  if (r === o)
    return !1;
  var a = T_(n, r, o, i, s);
  if ((i || r.fill !== o.fill) && (a || (gt(n, s), a = !0), Ld(r.fill) && (n.fillStyle = r.fill)), (i || r.stroke !== o.stroke) && (a || (gt(n, s), a = !0), Ld(r.stroke) && (n.strokeStyle = r.stroke)), (i || r.opacity !== o.opacity) && (a || (gt(n, s), a = !0), n.globalAlpha = r.opacity == null ? 1 : r.opacity), t.hasStroke()) {
    var l = r.lineWidth, c = l / (r.strokeNoScale && t.getLineScale ? t.getLineScale() : 1);
    n.lineWidth !== c && (a || (gt(n, s), a = !0), n.lineWidth = c);
  }
  for (var h = 0; h < Nd.length; h++) {
    var u = Nd[h], f = u[0];
    (i || r[f] !== o[f]) && (a || (gt(n, s), a = !0), n[f] = r[f] || u[1]);
  }
  return a;
}
function CT(n, t, e, i, s) {
  return T_(n, Js(t, s.inHover), e && Js(e, s.inHover), i, s);
}
function M_(n, t) {
  var e = t.transform, i = n.dpr || 1;
  e ? n.setTransform(i * e[0], i * e[1], i * e[2], i * e[3], i * e[4], i * e[5]) : n.setTransform(i, 0, 0, i, 0, 0);
}
function DT(n, t, e) {
  for (var i = !1, s = 0; s < n.length; s++) {
    var r = n[s];
    i = i || r.isZeroArea(), M_(t, r), t.beginPath(), r.buildPath(t, r.shape), t.clip();
  }
  e.allClipped = i;
}
function IT(n, t) {
  return n && t ? n[0] !== t[0] || n[1] !== t[1] || n[2] !== t[2] || n[3] !== t[3] || n[4] !== t[4] || n[5] !== t[5] : !(!n && !t);
}
var Bd = 1, $d = 2, Hd = 3, Gd = 4;
function AT(n) {
  var t = Fo(n), e = Oo(n);
  return !(n.lineDash || !(+t ^ +e) || t && typeof n.fill != "string" || e && typeof n.stroke != "string" || n.strokePercent < 1 || n.strokeOpacity < 1 || n.fillOpacity < 1);
}
function gt(n, t) {
  t.batchFill && n.fill(), t.batchStroke && n.stroke(), t.batchFill = "", t.batchStroke = "";
}
function Js(n, t) {
  return t && n.__hoverStyle || n.style;
}
function ET(n, t) {
  Bn(n, t, { inHover: !1, viewWidth: 0, viewHeight: 0 }, !0);
}
function Bn(n, t, e, i) {
  var s = t.transform;
  if (!t.shouldBePainted(e.viewWidth, e.viewHeight, !1, !1)) {
    t.__dirty &= ~Vt, t.__isRendered = !1;
    return;
  }
  var r = t.__clipPaths, o = e.prevElClipPaths, a = !1, l = !1;
  if ((!o || vT(r, o)) && (o && o.length && (gt(n, e), n.restore(), l = a = !0, e.prevElClipPaths = null, e.allClipped = !1, e.prevEl = null), r && r.length && (gt(n, e), n.save(), DT(r, n, e), a = !0), e.prevElClipPaths = r), e.allClipped) {
    t.__isRendered = !1;
    return;
  }
  t.beforeBrush && t.beforeBrush(), t.innerBeforeBrush();
  var c = e.prevEl;
  c || (l = a = !0);
  var h = t instanceof tc && t.autoBatch && AT(t.style);
  a || IT(s, c.transform) ? (gt(n, e), M_(n, t)) : h || gt(n, e);
  var u = Js(t, e.inHover);
  t instanceof tc ? (e.lastDrawType !== Bd && (l = !0, e.lastDrawType = Bd), zd(n, t, c, l, e), (!h || !e.batchFill && !e.batchStroke) && n.beginPath(), bT(n, t, u, h), h && (e.batchFill = u.fill || "", e.batchStroke = u.stroke || "")) : t instanceof S_ ? (e.lastDrawType !== Hd && (l = !0, e.lastDrawType = Hd), zd(n, t, c, l, e), MT(n, t, u)) : t instanceof gh ? (e.lastDrawType !== $d && (l = !0, e.lastDrawType = $d), CT(n, t, c, l, e), TT(n, t, u)) : t.getTemporalDisplayables && (e.lastDrawType !== Gd && (l = !0, e.lastDrawType = Gd), RT(n, t, e)), h && i && gt(n, e), t.innerAfterBrush(), t.afterBrush && t.afterBrush(), e.prevEl = t, t.__dirty = 0, t.__isRendered = !0;
}
function RT(n, t, e) {
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
    l.beforeBrush && l.beforeBrush(), l.innerBeforeBrush(), Bn(n, l, r, o === a - 1), l.innerAfterBrush(), l.afterBrush && l.afterBrush(), r.prevEl = l;
  }
  for (var c = 0, h = s.length; c < h; c++) {
    var l = s[c];
    l.beforeBrush && l.beforeBrush(), l.innerBeforeBrush(), Bn(n, l, r, c === h - 1), l.innerAfterBrush(), l.afterBrush && l.afterBrush(), r.prevEl = l;
  }
  t.clearTemporalDisplayables(), t.notClear = !0, n.restore();
}
function Yd(n, t, e) {
  var i = er.createCanvas(), s = t.getWidth(), r = t.getHeight(), o = i.style;
  return o && (o.position = "absolute", o.left = "0", o.top = "0", o.width = s + "px", o.height = r + "px", i.setAttribute("data-zr-dom-id", n)), i.width = s * e, i.height = r * e, i;
}
var Cl = (function(n) {
  qn(t, n);
  function t(e, i, s) {
    var r = n.call(this) || this;
    r.motionBlur = !1, r.lastFrameAlpha = 0.7, r.dpr = 1, r.virtual = !1, r.config = {}, r.incremental = !1, r.zlevel = 0, r.maxRepaintRectCount = 5, r.__dirty = !0, r.__firstTimePaint = !0, r.__used = !1, r.__drawIndex = 0, r.__startIndex = 0, r.__endIndex = 0, r.__prevStartIndex = null, r.__prevEndIndex = null;
    var o;
    s = s || xo, typeof e == "string" ? o = Yd(e, i, s) : ie(e) && (o = e, e = o.id), r.id = e, r.dom = o;
    var a = o.style;
    return a && (bp(o), o.onselectstart = function() {
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
    this.domBack = Yd("back-" + this.id, this.painter, e), this.ctxBack = this.domBack.getContext("2d"), e !== 1 && this.ctxBack.scale(e, e);
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
          for (var S = !1, x = 1 / 0, w = 0, M = 0; M < o.length; ++M) {
            var b = o[M];
            if (b.intersect(y)) {
              var T = new _t(0, 0, 0, 0);
              T.copy(b), T.union(y), o[M] = T, S = !0;
              break;
            } else if (l) {
              c.copy(y), c.union(b);
              var I = y.width * y.height, C = b.width * b.height, A = c.width * c.height, R = A - I - C;
              R < x && (x = R, w = M);
            }
          }
          if (l && (o[w].union(y), S = !0), !S) {
            var v = new _t(0, 0, 0, 0);
            v.copy(y), o.push(v);
          }
          l || (l = o.length >= a);
        }
    }
    for (var u = this.__startIndex; u < this.__endIndex; ++u) {
      var f = e[u];
      if (f) {
        var d = f.shouldBePainted(s, r, !0, !0), p = f.__isRendered && (f.__dirty & Vt || !d) ? f.getPrevPaintRect() : null;
        p && h(p);
        var _ = d && (f.__dirty & Vt || !f.__isRendered) ? f.getPaintRect() : null;
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
        if (fa(i)) {
          var S = i.global || i.__width === m && i.__height === y;
          v = S && i.__canvasGradient || Nc(o, i, {
            x: 0,
            y: 0,
            width: m,
            height: y
          }), i.__canvasGradient = v, i.__width = m, i.__height = y;
        } else Tm(i) && (i.scaleX = i.scaleX || u, i.scaleY = i.scaleY || u, v = zc(o, i, {
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
})(wg), C_;
C_ = me.hasGlobalWindow && (window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window) || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame) || function(n) {
  return setTimeout(n, 16);
};
var Vd = 1e5, On = 314159, Ur = 0.01, PT = 1e-3;
function LT(n) {
  return n ? n.__builtin__ ? !0 : !(typeof n.resize != "function" || typeof n.refresh != "function") : !1;
}
function kT(n, t) {
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
var OT = (function() {
  function n(t, e, i, s) {
    this.type = "canvas", this._zlevelList = [], this._prevDisplayList = [], this._layers = {}, this._layerConfig = {}, this._needsManuallyCompositing = !1, this.type = "canvas";
    var r = !t.nodeName || t.nodeName.toUpperCase() === "CANVAS";
    this._opts = i = E({}, i || {}), this.dpr = i.devicePixelRatio || xo, this._singleCanvas = r, this.root = t;
    var o = t.style;
    o && (bp(t), t.innerHTML = ""), this.storage = e;
    var a = this._zlevelList;
    this._prevDisplayList = [];
    var l = this._layers;
    if (r) {
      var h = t, u = h.width, f = h.height;
      i.width != null && (u = i.width), i.height != null && (f = i.height), this.dpr = i.devicePixelRatio || 1, h.width = u * this.dpr, h.height = f * this.dpr, this._width = u, this._height = f;
      var d = new Cl(h, this, this.dpr);
      d.__builtin__ = !0, d.initContext(), l[On] = d, d.zlevel = On, a.push(On), this._domRoot = t;
    } else {
      this._width = Wr(t, 0, i), this._height = Wr(t, 1, i);
      var c = this._domRoot = kT(this._width, this._height);
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
        a.__inHover && (i || (i = this._hoverlayer = this.getLayer(Vd)), r || (r = i.ctx, r.save()), Bn(r, a, s, o === e - 1));
      }
      r && r.restore();
    }
  }, n.prototype.getHoverLayer = function() {
    return this.getLayer(Vd);
  }, n.prototype.paintOne = function(t, e) {
    ET(t, e);
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
        C_(function() {
          l._paintList(t, e, i, s);
        });
      }
    }
  }, n.prototype._compositeManually = function() {
    var t = this.getLayer(On).ctx, e = this._domRoot.width, i = this._domRoot.height;
    t.clearRect(0, 0, e, i), this.eachBuiltinLayer(function(s) {
      s.virtual && t.drawImage(s.dom, 0, 0, e, i);
    });
  }, n.prototype._doPaintList = function(t, e, i) {
    for (var s = this, r = [], o = this._opts.useDirtyRect, a = 0; a < this._zlevelList.length; a++) {
      var l = this._zlevelList[a], c = this._layers[l];
      c.__builtin__ && c !== this._hoverlayer && (c.__dirty || i) && r.push(c);
    }
    for (var h = !0, u = !1, f = function(_) {
      var g = r[_], m = g.ctx, y = o && g.createRepaintRects(t, e, d._width, d._height), v = i ? g.__startIndex : g.__drawIndex, S = !i && g.incremental && Date.now, x = S && Date.now(), w = g.zlevel === d._zlevelList[0] ? d._backgroundColor : null;
      if (g.__startIndex === g.__endIndex)
        g.clear(!1, w, y);
      else if (v === g.__startIndex) {
        var M = t[v];
        (!M.incremental || !M.notClear || i) && g.clear(!1, w, y);
      }
      v === -1 && (console.error("For some unknown reason. drawIndex is -1"), v = g.__startIndex);
      var b, T = function(R) {
        var F = {
          inHover: !1,
          allClipped: !1,
          prevEl: null,
          viewWidth: s._width,
          viewHeight: s._height
        };
        for (b = v; b < g.__endIndex; b++) {
          var V = t[b];
          if (V.__inHover && (u = !0), s._doPaintEl(V, g, o, R, F, b === g.__endIndex - 1), S) {
            var G = Date.now() - x;
            if (G > 15)
              break;
          }
        }
        F.prevElClipPaths && m.restore();
      };
      if (y)
        if (y.length === 0)
          b = g.__endIndex;
        else
          for (var I = d.dpr, C = 0; C < y.length; ++C) {
            var A = y[C];
            m.save(), m.beginPath(), m.rect(A.x * I, A.y * I, A.width * I, A.height * I), m.clip(), T(A), m.restore();
          }
      else
        m.save(), T(), m.restore();
      g.__drawIndex = b, g.__drawIndex < g.__endIndex && (h = !1);
    }, d = this, p = 0; p < r.length; p++)
      f(p);
    return me.wxa && et(this._layers, function(_) {
      _ && _.ctx && _.ctx.draw && _.ctx.draw();
    }), {
      finished: h,
      needsRefreshHover: u
    };
  }, n.prototype._doPaintEl = function(t, e, i, s, r, o) {
    var a = e.ctx;
    if (i) {
      var l = t.getPaintRect();
      (!s || l && l.intersect(s)) && (Bn(a, t, r, o), t.setPrevPaintRect(l));
    } else
      Bn(a, t, r, o);
  }, n.prototype.getLayer = function(t, e) {
    this._singleCanvas && !this._needsManuallyCompositing && (t = On);
    var i = this._layers[t];
    return i || (i = new Cl("zr_" + t, this, this.dpr), i.zlevel = t, i.__builtin__ = !0, this._layerConfig[t] ? Ze(i, this._layerConfig[t], !0) : this._layerConfig[t - Ur] && Ze(i, this._layerConfig[t - Ur], !0), e && (i.virtual = e), this.insertLayer(t, i), i.initContext()), i;
  }, n.prototype.insertLayer = function(t, e) {
    var i = this._layers, s = this._zlevelList, r = s.length, o = this._domRoot, a = null, l = -1;
    if (!i[t] && LT(e)) {
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
      a !== c && (a = c, o = 0), s.incremental ? (h = this.getLayer(c + PT, this._needsManuallyCompositing), h.incremental = !0, o = 1) : h = this.getLayer(c + (o > 0 ? Ur : 0), this._needsManuallyCompositing), h.__builtin__ || jc("ZLevel " + c + " has been used by unkown layer " + h.id), h !== r && (h.__used = !0, h.__startIndex !== l && (h.__dirty = !0), h.__startIndex = l, h.incremental ? h.__drawIndex = -1 : h.__drawIndex = l, e(l), r = h), s.__dirty & Vt && !s.__inHover && (h.__dirty = !0, h.incremental && h.__drawIndex < 0 && (h.__drawIndex = l));
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
      i[t] ? Ze(i[t], e, !0) : i[t] = e;
      for (var s = 0; s < this._zlevelList.length; s++) {
        var r = this._zlevelList[s];
        if (r === t || r === t + Ur) {
          var o = this._layers[r];
          Ze(o, i[t], !0);
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
      if (t != null && (s.width = t), e != null && (s.height = e), t = Wr(r, 0, s), e = Wr(r, 1, s), i.style.display = "", this._width !== t || e !== this._height) {
        i.style.width = t + "px", i.style.height = e + "px";
        for (var o in this._layers)
          this._layers.hasOwnProperty(o) && this._layers[o].resize(t, e);
        this.refresh(!0);
      }
      this._width = t, this._height = e;
    } else {
      if (t == null || e == null)
        return;
      this._width = t, this._height = e, this.getLayer(On).resize(t, e);
    }
    return this;
  }, n.prototype.clearLayer = function(t) {
    var e = this._layers[t];
    e && e.clear();
  }, n.prototype.dispose = function() {
    this.root.innerHTML = "", this.root = this.storage = this._domRoot = this._layers = null;
  }, n.prototype.getRenderedCanvas = function(t) {
    if (t = t || {}, this._singleCanvas && !this._compositeManually)
      return this._layers[On].dom;
    var e = new Cl("image", this, t.pixelRatio || this.dpr);
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
        Bn(i, h, o, l === c - 1);
      }
    return e.dom;
  }, n.prototype.getWidth = function() {
    return this._width;
  }, n.prototype.getHeight = function() {
    return this._height;
  }, n;
})(), te = Object.freeze({
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
      return 1 - te.Bounce.Out(1 - n);
    },
    Out: function(n) {
      return n < 1 / 2.75 ? 7.5625 * n * n : n < 2 / 2.75 ? 7.5625 * (n -= 1.5 / 2.75) * n + 0.75 : n < 2.5 / 2.75 ? 7.5625 * (n -= 2.25 / 2.75) * n + 0.9375 : 7.5625 * (n -= 2.625 / 2.75) * n + 0.984375;
    },
    InOut: function(n) {
      return n < 0.5 ? te.Bounce.In(n * 2) * 0.5 : te.Bounce.Out(n * 2 - 1) * 0.5 + 0.5;
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
}), us = function() {
  return performance.now();
}, D_ = (
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
      t === void 0 && (t = us()), e === void 0 && (e = !0);
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
), Bc = {
  Linear: function(n, t) {
    var e = n.length - 1, i = e * t, s = Math.floor(i), r = Bc.Utils.Linear;
    return t < 0 ? r(n[0], n[1], i) : t > 1 ? r(n[e], n[e - 1], e - i) : r(n[s], n[s + 1 > e ? e : s + 1], i - s);
  },
  Utils: {
    Linear: function(n, t, e) {
      return (t - n) * e + n;
    }
  }
}, I_ = (
  /** @class */
  (function() {
    function n() {
    }
    return n.nextId = function() {
      return n._nextId++;
    }, n._nextId = 0, n;
  })()
), $c = new D_(), FT = (
  /** @class */
  (function() {
    function n(t, e) {
      this._isPaused = !1, this._pauseStart = 0, this._valuesStart = {}, this._valuesEnd = {}, this._valuesStartRepeat = {}, this._duration = 1e3, this._isDynamic = !1, this._initialRepeat = 0, this._repeat = 0, this._yoyo = !1, this._isPlaying = !1, this._reversed = !1, this._delayTime = 0, this._startTime = 0, this._easingFunction = te.Linear.None, this._interpolationFunction = Bc.Linear, this._chainedTweens = [], this._onStartCallbackFired = !1, this._onEveryStartCallbackFired = !1, this._id = I_.nextId(), this._isChainStopped = !1, this._propertiesAreSetUp = !1, this._goToEnd = !1, this._object = t, typeof e == "object" ? (this._group = e, e.add(this)) : e === !0 && (this._group = $c, $c.add(this));
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
      if (t === void 0 && (t = us()), e === void 0 && (e = !1), this._isPlaying)
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
      return t === void 0 && (t = us()), this._isPaused || !this._isPlaying ? this : (this._isPaused = !0, this._pauseStart = t, this);
    }, n.prototype.resume = function(t) {
      return t === void 0 && (t = us()), !this._isPaused || !this._isPlaying ? this : (this._isPaused = !1, this._startTime += t - this._pauseStart, this._pauseStart = 0, this);
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
      return t === void 0 && (t = te.Linear.None), this._easingFunction = t, this;
    }, n.prototype.interpolation = function(t) {
      return t === void 0 && (t = Bc.Linear), this._interpolationFunction = t, this;
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
      if (t === void 0 && (t = us()), e === void 0 && (e = n.autoStartOnUpdate), this._isPaused)
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
I_.nextId;
var Me = $c;
Me.getAll.bind(Me);
Me.removeAll.bind(Me);
Me.add.bind(Me);
Me.remove.bind(Me);
Me.update.bind(Me);
class NT {
  constructor(t) {
    this._requestFrame = t, this._group = new D_(), this.presets = {
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
          on(Y({
            duration: 700,
            loop: !0,
            yoyo: !0,
            easing: te.Sinusoidal.InOut
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
          on(Y({
            duration: 900,
            loop: !0,
            yoyo: !0,
            easing: te.Sinusoidal.InOut
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
            easing: te.Linear.None
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
          on(Y({
            duration: 260,
            repeat: 1,
            yoyo: !0,
            easing: te.Quadratic.Out
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
          on(Y({
            duration: 180,
            loop: !0,
            yoyo: !0,
            easing: te.Sinusoidal.InOut
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
    const s = new FT(t, this._group).to(e, (o = i.duration) != null ? o : 300).easing((a = i.easing) != null ? a : te.Quadratic.Out);
    i.delay && s.delay(i.delay);
    const r = this._getRepeatCount(i);
    return (r > 0 || r === 1 / 0) && s.repeat(r), i.repeatDelay != null && s.repeatDelay(i.repeatDelay), i.yoyo && s.yoyo(!0), i.onStart && s.onStart(() => i.onStart(t)), i.onUpdate && s.onUpdate((c, h) => i.onUpdate(c, h)), i.onComplete && s.onComplete((c) => i.onComplete(c)), i.onStop && s.onStop((c) => i.onStop(c)), s.start(), (l = this._requestFrame) == null || l.call(this), s;
  }
  animateElement(t, e, i = {}) {
    const s = this._createElementTweenState(t, e), r = s.to;
    return this.animate(s.current, r, on(Y({}, i), {
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
      var x;
      const S = `shape.${v}`;
      i[S] = (x = r[v]) != null ? x : 0, s[S] = e.shape[v];
    }), l.forEach((v) => {
      var x;
      const S = `style.${v}`;
      i[S] = (x = o[v]) != null ? x : 0, s[S] = e.style[v];
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
const Wd = 1e3, Ud = 1e4, zT = 3e4;
class BT {
  constructor(t) {
    this.socket = null, this.status = "idle", this.reconnectAttempts = 0, this.reconnectTimer = null, this.heartbeatTimer = null, this.manuallyClosed = !1, this.messageHandlers = /* @__PURE__ */ new Set(), this.rawMessageHandlers = /* @__PURE__ */ new Set(), this.statusHandlers = /* @__PURE__ */ new Set(), this.options = Y({
      reconnect: !0,
      reconnectDelay: Wd,
      maxReconnectDelay: Ud,
      heartbeatInterval: zT
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
      const e = JSON.parse(t);
      return e != null && e.type ? e : null;
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
      (this.options.reconnectDelay || Wd) * this.reconnectAttempts,
      this.options.maxReconnectDelay || Ud
    );
    this.reconnectTimer = window.setTimeout(() => {
      this.connect();
    }, t);
  }
  clearReconnectTimer() {
    this.reconnectTimer != null && (window.clearTimeout(this.reconnectTimer), this.reconnectTimer = null);
  }
}
class $T {
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
function HT(n, t, e) {
  return n.on(t, e);
}
function GT(n) {
  const t = new $T();
  return {
    client: n,
    router: t,
    on: (e, i) => t.register(e, i),
    dispose: () => {
      t.clear();
    }
  };
}
class YT {
  constructor() {
    this.runtime = null, this.configKey = "disabled";
  }
  configure(t) {
    const e = t || {}, i = e.enabled === !0 && !!e.url, s = i ? JSON.stringify(on(Y({}, e), {
      heartbeatMessage: typeof e.heartbeatMessage == "function" ? "[function]" : e.heartbeatMessage
    })) : "disabled";
    if (s === this.configKey || (this.disposeRuntime(), this.configKey = s, !i)) return;
    const c = e, { enabled: r, url: o } = c, a = Gh(c, ["enabled", "url"]), l = new BT(Y({
      url: o
    }, a));
    this.runtime = GT(l), l.connect();
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
const VT = "gateTask";
function WT(n) {
  if (!n || typeof n != "object")
    return null;
  const t = n;
  return typeof t.message != "string" ? null : t;
}
function UT(n) {
  if (!n.message) return [];
  try {
    const t = JSON.parse(n.message);
    return Array.isArray(t) ? t : [t];
  } catch (t) {
    return [];
  }
}
function qT(n, t) {
  if (n.category !== VT)
    return null;
  const e = Array.isArray(n.taskIds) ? n.taskIds : [], i = KT(n);
  return !i || !e.length ? null : {
    type: "TASK_EVENT",
    traceId: t.messageId != null ? String(t.messageId) : void 0,
    timestamp: Date.now(),
    payload: {
      eventType: i,
      taskIds: e,
      category: n.category,
      businessType: n.businessType,
      reason: n.type,
      source: "ws",
      raw: n,
      envelope: t
    }
  };
}
function XT(n) {
  return UT(n).map((t) => qT(t, n)).filter(Boolean);
}
function ZT(n) {
  const t = WT(n);
  return t ? XT(t) : [];
}
function KT(n) {
  switch (n.type) {
    case "delete":
    case "remove":
    case "cancel":
      return "remove";
    case "update":
      return "upsert";
    case "refresh":
    case "refreshAll":
    case "reload":
      return null;
    default:
      return null;
  }
}
function jT(n, t) {
  const e = t ? HT(n, "TASK_EVENT", t) : () => {
  }, i = n.client.onMessage((s) => {
    QT(n.client, s), ZT(s).forEach((r) => {
      n.router.dispatch(r);
    });
  });
  return () => {
    i(), e();
  };
}
function QT(n, t) {
  const e = t;
  if (!e.needAck || e.messageId == null)
    return;
  const i = {
    type: "ack",
    messageId: e.messageId
  };
  n.send(i);
}
var qd;
window.moment = moment;
const Et = "__flagInMainProcess", jt = "__pendingUpdate", JT = [
  "click",
  "dblclick",
  "mouseover",
  "mouseout",
  "mousemove",
  "mousedown",
  "mouseup",
  "globalout",
  "contextmenu"
], Xd = /^[a-zA-Z0-9_]+$/, A_ = {};
let tM = +/* @__PURE__ */ new Date() - 0;
const E_ = "_instance_", Dl = "__needsUpdateStatus", eM = 1, nM = 2e3, iM = 3e3, sM = 4500, Hc = {}, No = {}, R_ = [], P_ = [], Zd = [], Kd = [];
let qr, Il, Xr, jd, Qd, is, Jd, tp, Al, El, Zr, Kr, ep, hi, np, Rl;
zrender.registerPainter("canvas", OT);
_a.registerComponentModel(yo);
_a.registerComponentView($l);
_a.registerComponentModel(Hl);
Xt(ov);
Xt($w);
Xt(Fb);
lM("cartesian2d", ch);
Xt(Jb);
Xt(D2);
Xt(O2);
Xt($2);
Xt(K2);
Xt(eT);
cM(sM, _T);
class L_ extends tr {
}
const k_ = L_.prototype;
k_.on = F_("on");
k_.off = F_("off");
function O_(n) {
  return function(...t) {
    if (this.isDisposed()) {
      B_(this.id);
      return;
    }
    return N_(this, n, t);
  };
}
function F_(n) {
  return function(...t) {
    return N_(this, n, t);
  };
}
function N_(n, t, e) {
  return e[0] = e[0] && e[0].toLowerCase(), tr.prototype[t].apply(n, e);
}
const Nh = class Nh extends (qd = tr, qd) {
  constructor(t, e) {
    super(new iv()), this._componentsViews = [], this._componentsMap = {}, this._chartsViews = [], this._chartsViewsMap = {}, this._pendingActions = [], this._containerInstence = /* @__PURE__ */ new Map(), this._taskWsRuntime = null, this._disposeTaskWsHandlers = null, this._dom = t, e = e || {};
    let i = "canvas", s = "auto", r = !1;
    const o = this._zr = zrender.init(t, {
      renderer: (e == null ? void 0 : e.renderer) || i,
      devicePixelRatio: e.devicePixelRatio,
      width: e.width,
      height: e.height,
      ssr: e.ssr,
      useDirtyRect: ne(e.useDirtyRect, r),
      useCoarsePointer: ne(e.useCoarsePointer, s),
      pointerSize: e.pointerSize
    });
    this._ztween = new NT(() => o.wakeUp()), this._wsManager = new YT(), this._ssr = e.ssr, this._throttledZrFlush = _p(P(o.flush, o), 17);
    const a = this._api = ep(this);
    this._locale = q1(e.locale || $p), this._coordSysMgr = new Ys(), this._scheduler = new v_(this, a, R_, P_), this._messageCenter = new L_(), this._initEvents(), this.resize = P(this.resize, this), o.animation.on("frame", this._onframe, this), jd(o, this), Qd(o, this);
  }
  _initEvents() {
    return rr(this, null, function* () {
      D(JT, (t) => {
        const e = (i) => {
          let s;
          t === "globalout" && (s = {}), s && (s.event = i, s.type = t);
        };
        this._zr.on(t, e, this);
      }), D(Hc, (t, e) => {
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
    e === this._taskWsRuntime && t === this._taskWsEventHandler || ((i = this._disposeTaskWsHandlers) == null || i.call(this), this._disposeTaskWsHandlers = null, this._taskWsRuntime = e, this._taskWsEventHandler = t, e && (this._disposeTaskWsHandlers = jT(e, t)));
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
    if (this[Et] || this._disposed)
      return;
    let s, r, o;
    if (k(e) && (i = e.lazyUpdate, r = e.silent, s = e.replaceMerge, o = e.transition, e = e.notMerge), this[Et] = !0, !this._model) {
      const c = new sv(), h = this._model = new yo();
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
      this[jt] = {
        silent: r,
        updateParams: l
      }, this[Et] = !1, this.getZr().wakeUp();
    else {
      try {
        qr(this), is.update.call(this, null, l);
      } catch (c) {
        throw this[jt] = null, this[Et] = !1, c;
      }
      this._ssr || this._zr.flush(), this[jt] = null, this[Et] = !1, Zr.call(this, r), Kr.call(this, r);
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
      B_(this.id);
      return;
    }
    if (k(e) || (e = { silent: !!e }), !No[t.type] || !this._model)
      return;
    if (this[Et]) {
      this._pendingActions.push(t);
      return;
    }
    const i = e.silent;
    El.call(this, t, i), e.flush && this._zr.flush(), Zr.call(this, i), Kr.call(this, i);
  }
  _onframe() {
    this._ztween.update(), this._ztween.hasActive() && this._zr.wakeUp(), np(this);
    const t = this._scheduler;
    if (this[jt]) {
      const e = this[jt].silent;
      this[Et] = !0;
      try {
        qr(this), is.update.call(this, null, this[jt].updateParams);
      } catch (i) {
        throw this[Et] = !1, this[jt] = null, i;
      }
      this._zr.flush(), this[Et] = !1, this[jt] = null, Zr.call(this, e), Kr.call(this, e);
    } else if (t != null && t.unfinished) {
      let e = eM;
      const i = this._model, s = this._api;
      t.unfinished = !1;
      do {
        const r = +/* @__PURE__ */ new Date();
        t.performSeriesTasks(i), t.performDataProcessorTasks(i), Rl(this, i), t.performVisualTasks(i), Al(this, this._model, s, "remain", {}), e -= +/* @__PURE__ */ new Date() - r;
      } while (e > 0 && t.unfinished);
      t.unfinished || this._zr.flush();
    }
  }
};
Nh.internalField = (function() {
  qr = function(t) {
    const e = t._scheduler;
    e.restorePipelines(t._model), e.prepareStageTasks(), Il(t, !0), Il(t, !1), e.plan();
  }, Il = function(t, e) {
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
        const p = Oe(h.type), _ = e ? Zt.getClass(
          p.main,
          p.sub
        ) : Ai.getClass(p.sub);
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
  }, Xr = function(t, e, i, s, r) {
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
    c != null && (h = O(), D(Wt(c), (f) => {
      const d = Fe(f, null);
      d != null && h.set(d, !0);
    })), o && o.eachComponent(
      l,
      function(f) {
        if (!(h && h.get(f.id) != null))
          if (cd(i))
            if (f instanceof po)
              i.type === ro && !i.notBlur && !f.get(["emphasis", "disabled"]) && cb(f, i, t._api);
            else {
              const { focusSelf: p, dispatchers: _ } = ub(
                f.mainType,
                f.componentIndex,
                i.name,
                t._api
              );
              i.type === ro && p && !i.notBlur && lb(
                f.mainType,
                f.componentIndex,
                t._api
              ), _ && D(_, (g) => {
                i.type === ro ? ad(g) : ld(g);
              });
            }
          else yc(i) && f instanceof po && (hb(f, i, t._api), fb(f), hi(t));
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
  }, Rl = function(t, e) {
    const i = t._chartsViewsMap, s = t._scheduler;
    e.eachRawSeries(function(r) {
      s.updateStreamModes(
        r,
        i[r.__viewId]
      );
    });
  }, El = function(t, e) {
    const i = this.getModel(), s = t.type, r = t.escapeConnect, o = No[s], a = o.actionInfo, l = (a.update || "update").split(":"), c = l.pop(), h = l[0] != null && Oe(l[0]);
    this[Et] = !0;
    let u = [t], f = !1;
    t.batch && (f = !0, u = H(
      t.batch,
      function(m) {
        return m = yt(N({}, m), t), m.batch = null, m;
      }
    ));
    const d = [];
    let p;
    const _ = yc(t), g = cd(t);
    if (g && ab(this._api), D(u, (m) => {
      if (p = o.action(
        m,
        this._model,
        this._api
      ), p = p || N({}, m), p.type = a.event || p.type, d.push(p), g) {
        const { queryOptionMap: y, mainTypeSpecified: v } = Q0(t), S = v ? y.keys()[0] : "series";
        Xr(
          this,
          c,
          m,
          S
        ), hi(this);
      } else _ ? (Xr(this, c, m, "series"), hi(this)) : h && Xr(
        this,
        c,
        m,
        h.main,
        h.sub
      );
    }), c !== "none" && !g && !_ && !h)
      try {
        this[jt] ? (qr(this), is.update.call(this, t), this[jt] = null) : is[c].call(
          this,
          t
        );
      } catch (m) {
        throw this[Et] = !1, m;
      }
    if (f ? p = {
      type: a.event || s,
      escapeConnect: r,
      batch: d
    } : p = d[0], this[Et] = !1, !e) {
      const m = this._messageCenter;
      if (m.trigger(p.type, p), _) {
        const y = {
          type: "selectchanged",
          escapeConnect: r,
          selected: db(i),
          isFromClick: t.isFromClick || !1,
          fromAction: t.type,
          fromActionPayload: t
        };
        m.trigger(y.type, y);
      }
    }
  }, Zr = function(t) {
    const e = this._pendingActions;
    for (; e.length; ) {
      const i = e.shift();
      El.call(this, i, t);
    }
  }, Kr = function(t) {
    !t && this.trigger("updated");
  }, np = function(t) {
    if (!t[Dl])
      return;
    t.getZr().storage.traverse(function(i) {
      Cw(i) || e(i);
    }), t[Dl] = !1;
    function e(i) {
      const s = [], r = i.currentStates;
      for (let o = 0; o < r.length; o++) {
        const a = r[o];
        a === "emphasis" || a === "blur" || a === "select" || s.push(a);
      }
      i.hoverState === xh && i.states.emphasis ? s.push("emphasis") : i.hoverState === wh && i.states.blur && s.push("blur"), i.useStates(s);
    }
  }, jd = function(t, e) {
    t.on("rendered", function(i) {
      e.trigger("rendered", i), // Although zr is dirty if initial animation is not finished
      // and this checking is called on frame, we also check
      // animation finished for robustness.
      t.animation.isFinished() && !e[jt] && e.trigger("finished");
    });
  }, Qd = function(t, e) {
  }, is = {
    //TODO
    update(t, e) {
      const i = this._model;
      this._zr;
      const s = this._api, r = this._scheduler, o = this._coordSysMgr;
      i && (i.setUpdatePayload(t), r.restoreData(i, t), r.performSeriesTasks(i), o.create(i, s), r.performDataProcessorTasks(i, t), Rl(this, i), o.update(i, s), r.performVisualTasks(i, t), Jd(this, i, s, t, e));
    }
  }, Jd = (t, e, i, s, r) => {
    tp(t, e, i, s), D(t._chartsViews, function(o) {
      o.__alive = !1;
    }), Al(t, e, i, s, r), D(t._chartsViews, function(o) {
      o.__alive || o.remove(e, i);
    }), D(t._componentsViews, function(o) {
      o.type === "split.slider" && o.render(o.__model, e, i, s);
    });
  }, tp = (t, e, i, s, r) => {
    D(
      r || t._componentsViews,
      function(o) {
        const a = o.__model;
        o.render(a, e, i, s);
      }
    );
  }, Al = (t, e, i, s, r, o) => {
    const a = t._scheduler;
    let l = !1;
    e.eachSeries(function(c) {
      const h = t._chartsViewsMap[c.__viewId];
      h.__alive = !0;
      const u = h.renderTask;
      a.updatePayload(u, s), o && o.get(c.uid) && u.dirty(), u.perform(a.getPerformArgs(u)) && (l = !0);
    }), a.unfinished = l || a.unfinished;
  }, hi = function(t) {
    t[Dl] = !0, t.getZr().wakeUp();
  }, ep = function(t) {
    return new class extends iT {
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
        ad(e, i), hi(t);
      }
      leaveEmphasis(e, i) {
        ld(e, i), hi(t);
      }
    }(t);
  };
})();
let zo = Nh;
const z_ = zo.prototype;
z_.on = O_("on");
z_.off = O_("off");
function B_(n) {
  lp("Instance " + n + " has been disposed");
}
function yM(n, t) {
  if (!n)
    throw new Error("Initialize failed: invalid dom.");
  const e = rM(n);
  if (e)
    return lp("There is a instance already initialized on the dom."), e;
  const i = new zo(n);
  return i.id = "pi_" + tM++, A_[i.id] = i, z0(n, E_, i.id), i;
}
function rM(n) {
  return A_[B0(n, E_)];
}
function oM(n) {
  st(Kd, n) < 0 && Kd.push(n);
}
function aM(n, t) {
  $_(
    R_,
    n,
    t,
    nM
  );
}
function lM(n, t) {
  Ys.register(n, t);
}
function cM(n, t) {
  $_(
    P_,
    n,
    t,
    iM,
    "visual"
  );
}
function $_(n, t, e, i, s) {
  if ((Q(t) || k(t)) && (e = t, t = i), st(Zd, e) >= 0)
    return;
  Zd.push(e);
  const r = v_.wrapStageHandler(e, s);
  r.__prio = t, r.__raw = e, n.push(r);
}
function hM(n, t, e) {
  Q(t) && (e = t, t = "");
  const i = k(n) ? n.type : [
    n,
    n = {
      event: t
    }
  ][0];
  n.event = (n.event || i).toLowerCase(), t = n.event, !Hc[t] && (ra(Xd.test(i) && Xd.test(t)), No[i] || (No[i] = {
    action: e,
    actionInfo: n
  }), Hc[t] = i);
}
export {
  zo as default,
  rM as getInstanceByDom,
  yM as init,
  hM as registerAction,
  lM as registerCoordinateSystem,
  oM as registerPreprocessor,
  aM as registerProcessor
};
