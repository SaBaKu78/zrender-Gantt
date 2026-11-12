var e0 = Object.defineProperty, n0 = Object.defineProperties;
var i0 = Object.getOwnPropertyDescriptors;
var ar = Object.getOwnPropertySymbols;
var jh = Object.prototype.hasOwnProperty, Qh = Object.prototype.propertyIsEnumerable;
var Kh = (n, t, e) => t in n ? e0(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e, k = (n, t) => {
  for (var e in t || (t = {}))
    jh.call(t, e) && Kh(n, e, t[e]);
  if (ar)
    for (var e of ar(t))
      Qh.call(t, e) && Kh(n, e, t[e]);
  return n;
}, et = (n, t) => n0(n, i0(t));
var Jh = (n, t) => {
  var e = {};
  for (var i in n)
    jh.call(n, i) && t.indexOf(i) < 0 && (e[i] = n[i]);
  if (n != null && ar)
    for (var i of ar(n))
      t.indexOf(i) < 0 && Qh.call(n, i) && (e[i] = n[i]);
  return e;
};
var lr = (n, t, e) => new Promise((i, s) => {
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
const s0 = "sans-serif", zs = `12px ${s0}`, r0 = 20, o0 = 100, a0 = "007LLmW'55;N0500LLLLLLLLLL00NNNLzWW\\\\WQb\\0FWLg\\bWb\\WQ\\WrWWQ000CL5LLFLL0LL**F*gLLLL5F0LF\\FFF5.5N";
function l0(n) {
  const t = {};
  if (typeof JSON == "undefined")
    return t;
  for (let e = 0; e < n.length; e++) {
    const i = String.fromCharCode(e + 32), s = (n.charCodeAt(e) - r0) / o0;
    t[i] = s;
  }
  return t;
}
const c0 = l0(a0), Jc = {
  // Export methods
  createCanvas() {
    return typeof document != "undefined" && document.createElement("canvas");
  },
  measureText: /* @__PURE__ */ (function() {
    let n, t;
    return (e, i) => {
      if (!n) {
        const s = Jc.createCanvas();
        n = s && s.getContext("2d");
      }
      if (n)
        return t !== i && (t = n.font = i || zs), n.measureText(e);
      {
        e = e || "", i = i || zs;
        const s = /(\d+)px/.exec(i), r = s && +s[1] || 12;
        let o = 0;
        if (i.indexOf("mono") >= 0)
          o = r * e.length;
        else
          for (let a = 0; a < e.length; a++) {
            const l = c0[e[a]];
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
}, dp = ha([
  "Function",
  "RegExp",
  "Date",
  "Error",
  "CanvasGradient",
  "CanvasPattern",
  // For node-canvas
  "Image",
  "Canvas"
], (n, t) => (n["[object " + t + "]"] = !0, n), {}), pp = ha([
  "Int8",
  "Uint8",
  "Uint8Clamped",
  "Int16",
  "Uint16",
  "Int32",
  "Uint32",
  "Float32",
  "Float64"
], (n, t) => (n["[object " + t + "Array]"] = !0, n), {}), Fi = Object.prototype.toString, ca = Array.prototype, h0 = ca.forEach, u0 = ca.filter, th = ca.slice, f0 = ca.map, tu = function() {
}.constructor, cr = tu ? tu.prototype : null, eh = "__proto__";
let d0 = 2311;
function p0() {
  return d0++;
}
function gp(...n) {
  typeof console != "undefined" && console.error.apply(console, n);
}
function U(n) {
  if (n == null || typeof n != "object")
    return n;
  let t = n;
  const e = Fi.call(n);
  if (e === "[object Array]") {
    if (!gs(n)) {
      t = [];
      for (let i = 0, s = n.length; i < s; i++)
        t[i] = U(n[i]);
    }
  } else if (pp[e]) {
    if (!gs(n)) {
      const i = n.constructor;
      if (i.from)
        t = i.from(n);
      else {
        t = new i(n.length);
        for (let s = 0, r = n.length; s < r; s++)
          t[s] = n[s];
      }
    }
  } else if (!dp[e] && !gs(n) && !Hl(n)) {
    t = {};
    for (let i in n)
      n.hasOwnProperty(i) && i !== eh && (t[i] = U(n[i]));
  }
  return t;
}
function dt(n, t, e) {
  if (!F(t) || !F(n))
    return e ? U(t) : n;
  for (let i in t)
    if (t.hasOwnProperty(i) && i !== eh) {
      const s = n[i], r = t[i];
      F(r) && F(s) && !K(r) && !K(s) && !Hl(r) && !Hl(s) && !eu(r) && !eu(s) && !gs(r) && !gs(s) ? dt(s, r, e) : (e || !(i in n)) && (n[i] = U(t[i]));
    }
  return n;
}
function N(n, t) {
  if (Object.assign)
    Object.assign(n, t);
  else
    for (let e in t)
      t.hasOwnProperty(e) && e !== eh && (n[e] = t[e]);
  return n;
}
function xt(n, t, e) {
  const i = tt(t);
  for (let s = 0; s < i.length; s++) {
    let r = i[s];
    n[r] == null && (n[r] = t[r]);
  }
  return n;
}
function ot(n, t) {
  if (n) {
    if (n.indexOf)
      return n.indexOf(t);
    for (let e = 0, i = n.length; e < i; e++)
      if (n[e] === t)
        return e;
  }
  return -1;
}
function nh(n, t, e) {
  if (n = "prototype" in n ? n.prototype : n, t = "prototype" in t ? t.prototype : t, Object.getOwnPropertyNames) {
    const i = Object.getOwnPropertyNames(t);
    for (let s = 0; s < i.length; s++) {
      const r = i[s];
      r !== "constructor" && n[r] == null && (n[r] = t[r]);
    }
  } else
    xt(n, t);
}
function It(n) {
  return !n || typeof n == "string" ? !1 : typeof n.length == "number";
}
function D(n, t, e) {
  if (n && t)
    if (n.forEach && n.forEach === h0)
      n.forEach(t, e);
    else if (n.length === +n.length)
      for (let i = 0, s = n.length; i < s; i++)
        t.call(e, n[i], i, n);
    else
      for (let i in n)
        n.hasOwnProperty(i) && t.call(e, n[i], i, n);
}
function G(n, t, e) {
  if (!n)
    return [];
  if (!t)
    return ih(n);
  if (n.map && n.map === f0)
    return n.map(t, e);
  {
    const i = [];
    for (let s = 0, r = n.length; s < r; s++)
      i.push(t.call(e, n[s], s, n));
    return i;
  }
}
function ha(n, t, e, i) {
  if (n && t) {
    for (let s = 0, r = n.length; s < r; s++)
      e = t.call(i, e, n[s], s, n);
    return e;
  }
}
function re(n, t, e) {
  if (!n)
    return [];
  if (!t)
    return ih(n);
  if (n.filter && n.filter === u0)
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
function g0(n, t, ...e) {
  return function() {
    return n.apply(t, e.concat(th.call(arguments)));
  };
}
const L = cr && Q(cr.bind) ? cr.call.bind(cr.bind) : g0;
function po(n, ...t) {
  return function() {
    return n.apply(this, t.concat(th.call(arguments)));
  };
}
function K(n) {
  return Array.isArray ? Array.isArray(n) : Fi.call(n) === "[object Array]";
}
function Q(n) {
  return typeof n == "function";
}
function Z(n) {
  return typeof n == "string";
}
function _0(n) {
  return Fi.call(n) === "[object String]";
}
function Te(n) {
  return typeof n == "number";
}
function F(n) {
  const t = typeof n;
  return t === "function" || !!n && t === "object";
}
function eu(n) {
  return !!dp[Fi.call(n)];
}
function Ii(n) {
  return !!pp[Fi.call(n)];
}
function Hl(n) {
  return typeof n == "object" && typeof n.nodeType == "number" && typeof n.ownerDocument == "object";
}
function _p(n) {
  return n.colorStops != null;
}
function m0(n) {
  return Fi.call(n) === "[object RegExp]";
}
function Hs(n) {
  return n !== n;
}
function $l(...n) {
  for (let t = 0, e = n.length; t < e; t++)
    if (n[t] != null)
      return n[t];
}
function oe(n, t) {
  return n != null ? n : t;
}
function ih(n, ...t) {
  return th.apply(n, t);
}
function y0(n) {
  if (typeof n == "number")
    return [n, n, n, n];
  const t = n.length;
  return t === 2 ? [n[0], n[1], n[0], n[1]] : t === 3 ? [n[0], n[1], n[2], n[1]] : n;
}
function ua(n, t) {
  if (!n)
    throw new Error(t);
}
function as(n) {
  return n == null ? null : typeof n.trim == "function" ? n.trim() : n.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
}
const v0 = "__ec_primitive__";
function gs(n) {
  return n[v0];
}
class x0 {
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
const mp = typeof Map == "function";
function w0() {
  return mp ? /* @__PURE__ */ new Map() : new x0();
}
class sh {
  constructor(t) {
    const e = K(t);
    this.data = w0();
    const i = this;
    t instanceof sh ? t.each(s) : t && D(t, s);
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
    return mp ? Array.from(t) : t;
  }
  // Do not use this method if performance sensitive.
  removeKey(t) {
    this.data.delete(t);
  }
}
function B(n) {
  return new sh(n);
}
function S0(n, t) {
  const e = new n.constructor(n.length + t.length);
  for (let s = 0; s < n.length; s++)
    e[s] = n[s];
  const i = n.length;
  for (let s = 0; s < t.length; s++)
    e[s + i] = t[s];
  return e;
}
function fa(n, t) {
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
function Ce(n, t) {
  return n.hasOwnProperty(t);
}
function Ea() {
}
const b0 = 180 / Math.PI, T0 = "[Gantt] ", M0 = typeof console != "undefined" && // eslint-disable-next-line
console.warn && console.log;
function C0(n, t, e) {
  M0 && console[n](T0 + t);
}
function yp(n, t) {
  C0("warn", n);
}
function D0(...n) {
  let t = "";
  if (__DEV__) {
    const e = (i) => i === void 0 ? "undefined" : i === 1 / 0 ? "Infinity" : i === -1 / 0 ? "-Infinity" : Hs(i) ? "NaN" : i instanceof Date ? "Date(" + i.toISOString() + ")" : Q(i) ? "function () { ... }" : m0(i) ? i + "" : null;
    t = G(n, (i) => {
      if (Z(i))
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
function ne(n) {
  throw new Error(n);
}
const nu = 1e-4, I0 = 20;
function E0(n) {
  return n.replace(/^\s+|\s+$/g, "");
}
function R0() {
  return Math.round(Math.random() * 9);
}
const A0 = /^(?:(\d{4})(?:[-\/](\d{1,2})(?:[-\/](\d{1,2})(?:[T ](\d{1,2})(?::(\d{1,2})(?::(\d{1,2})(?:[.,](\d+))?)?)?(Z|[\+\-]\d\d:?\d\d)?)?)?)?)?$/;
function Zn(n) {
  if (n instanceof Date)
    return n;
  if (Z(n)) {
    const t = A0.exec(n);
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
function vp(n) {
  if (n = +n, isNaN(n))
    return 0;
  if (n > 1e-14) {
    let t = 1;
    for (let e = 0; e < 15; e++, t *= 10)
      if (Math.round(n * t) / t === n)
        return e;
  }
  return k0(n);
}
function k0(n) {
  const t = n.toString().toLowerCase(), e = t.indexOf("e"), i = e > 0 ? +t.slice(e + 1) : 0, s = e > 0 ? e : t.length, r = t.indexOf("."), o = r < 0 ? 0 : s - 1 - r;
  return Math.max(0, o - i);
}
function xp(n, t) {
  const e = Math.log, i = Math.LN10, s = Math.floor(e(n[1] - n[0]) / i), r = Math.round(
    e(Math.abs(t[1] - t[0])) / i
  ), o = Math.min(Math.max(-s + r, 0), 20);
  return isFinite(o) ? o : 20;
}
function lt(n, t, e, i) {
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
function wp(n, t) {
  return t === 0 ? n : wp(t, n % t);
}
function iu(n, t) {
  return n == null ? t : t == null ? n : n * t / wp(n, t);
}
function Jn(n, t) {
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
  return Z(n) ? E0(n).match(/%$/) ? parseFloat(n) / 100 * t : parseFloat(n) : n == null ? NaN : +n;
}
function Gl(n, t, e) {
  return t == null && (t = 10), t = Math.min(Math.max(0, t), I0), n = (+n).toFixed(t), e ? n : +n;
}
function P0(n) {
  if (n === 0)
    return 0;
  let t = Math.floor(Math.log(n) / Math.LN10);
  return n / Math.pow(10, t) >= 10 && t++, t;
}
function Sp(n, t) {
  const e = P0(n), i = Math.pow(10, e), s = n / i;
  let r;
  return s < 1.5 ? r = 1 : s < 2.5 ? r = 2 : s < 4 ? r = 3 : s < 7 ? r = 5 : r = 10, n = r * i, e >= -20 ? +n.toFixed(e < 0 ? -e : 0) : n;
}
function L0(n) {
  const t = Math.PI * 2;
  return (n % t + t) % t;
}
function su(n) {
  return n > -nu && n < nu;
}
function ls(n) {
  return n.sort(function(t, e) {
    return t - e;
  }), n;
}
function O0(n) {
  const t = parseFloat(n);
  return t == n && // eslint-disable-line eqeqeq
  (t !== 0 || !Z(n) || n.indexOf("x") <= 0) ? t : NaN;
}
function F0(n) {
  return !isNaN(O0(n));
}
const B0 = 800, N0 = 1e3, z0 = 5e3, H0 = 1e3, $0 = 1100, G0 = 2e3, Y0 = 3e3, V0 = 4e3, W0 = 4500, U0 = 4600, q0 = 5e3, Z0 = 6e3, X0 = 7e3, K0 = {
  PROCESSOR: {
    FILTER: N0,
    SERIES_FILTER: B0,
    STATISTIC: z0
  },
  VISUAL: {
    LAYOUT: H0,
    PROGRESSIVE_LAYOUT: $0,
    GLOBAL: G0,
    CHART: Y0,
    POST_CHART_LAYOUT: U0,
    COMPONENT: V0,
    BRUSH: q0,
    CHART_ITEM: W0,
    ARIA: Z0,
    DECAL: X0
  }
}, bp = "series\0", j0 = "\0_pi_\0";
function Q0(n, t, e) {
  n.setAttribute ? n.setAttribute(t, e) : n[t] = e;
}
function J0(n, t) {
  return n.getAttribute ? n.getAttribute(t) : n[t];
}
function Xt(n) {
  return n instanceof Array ? n : n == null ? [] : [n];
}
function _s(n) {
  return He(n, "");
}
function He(n, t) {
  return n == null ? t : Z(n) ? n : Te(n) || _0(n) ? n + "" : t;
}
function Tp(n, t) {
  if (t.dataIndexInside != null)
    return t.dataIndexInside;
  if (t.dataIndex != null)
    return K(t.dataIndex) ? G(t.dataIndex, function(e) {
      return n.indexOfRawIndex(e);
    }) : n.indexOfRawIndex(t.dataIndex);
  if (t.name != null)
    return K(t.name) ? G(t.name, function(e) {
      return n.indexOfName(e);
    }) : n.indexOfName(t.name);
}
function pt() {
  const n = "__pi_inner_" + tm++;
  return function(t) {
    return t[n] || (t[n] = {});
  };
}
let tm = R0();
function em(n) {
  const t = n.name;
  return !!(t && t.indexOf(bp));
}
function $s(n) {
  return n && n.id != null && _s(n.id).indexOf(j0) === 0;
}
function nm(n, t, e) {
  const i = e === "normalMerge", s = e === "replaceMerge", r = e === "replaceAll";
  n = n || [], t = (t || []).slice();
  const o = B();
  D(t, function(l, c) {
    if (!F(l)) {
      t[c] = null;
      return;
    }
  });
  const a = im(n, o, e);
  return (i || s) && sm(a, n, o, t), i && rm(a, t), i || s ? om(a, t, s) : r && am(a, t), lm(a), a;
}
function im(n, t, e) {
  const i = [];
  if (e === "replaceAll")
    return i;
  for (let s = 0; s < n.length; s++) {
    const r = n[s];
    r && r.id != null && t.set(r.id, s), i.push({
      existing: e === "replaceMerge" || $s(r) ? null : r,
      newOption: null,
      keyInfo: null,
      brandNew: null
    });
  }
  return i;
}
function sm(n, t, e, i) {
  D(i, function(s, r) {
    if (!s || s.id == null)
      return;
    const o = _s(s.id), a = e.get(o);
    if (a != null) {
      const l = n[a];
      ua(
        !l.newOption,
        'Duplicated option on id "' + o + '".'
      ), l.newOption = s, l.existing = t[a], i[r] = null;
    }
  });
}
function rm(n, t) {
  D(t, function(e, i) {
    if (!(!e || e.name == null))
      for (let s = 0; s < n.length; s++) {
        const r = n[s].existing;
        if (!n[s].newOption && // Consider name: two map to one.
        // Can not match when both ids existing but different.
        r && (r.id == null || e.id == null) && !$s(e) && !$s(r) && Mp("name", r, e)) {
          n[s].newOption = e, t[i] = null;
          return;
        }
      }
  });
}
function om(n, t, e) {
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
      (s.newOption || $s(s.existing) || // In mode "replaceMerge", here no not-mapped-non-internal-existing.
      s.existing && i.id != null && !Mp("id", i, s.existing));
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
function am(n, t) {
  D(t, function(e) {
    n.push({
      newOption: e,
      brandNew: !0,
      existing: null,
      keyInfo: null
    });
  });
}
function lm(n) {
  const t = B();
  D(n, function(e) {
    const i = e.existing;
    i && t.set(i.id, e);
  }), D(n, function(e) {
    const i = e.newOption;
    ua(
      !i || i.id == null || !t.get(i.id) || t.get(i.id) === e,
      "id duplicates: " + (i && i.id)
    ), i && i.id != null && t.set(i.id, e), !e.keyInfo && (e.keyInfo = {});
  }), D(n, function(e, i) {
    const s = e.existing, r = e.newOption, o = e.keyInfo;
    if (F(r)) {
      if (o.name = r.name != null ? _s(r.name) : s ? s.name : (
        // Avoid that different series has the same name,
        // because name may be used like in color pallet.
        bp + i
      ), s)
        o.id = _s(s.id);
      else if (r.id != null)
        o.id = _s(r.id);
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
function Mp(n, t, e) {
  const i = He(t[n], null), s = He(e[n], null);
  return i != null && s != null && i === s;
}
function cm(n, t, e) {
  D(n, function(i) {
    const s = i.newOption;
    F(s) && (i.keyInfo.mainType = t, i.keyInfo.subType = hm(
      t,
      s,
      i.existing,
      e
    ));
  });
}
function hm(n, t, e, i) {
  return t.type ? t.type : e ? e.subType : (
    // Use determineSubType only when there is no existComponent.
    i.determineSubType(
      n,
      t
    )
  );
}
const De = {
  useDefault: !0,
  enableAll: !1,
  enableNone: !1
}, um = {
  useDefault: !1,
  enableAll: !0,
  enableNone: !0
};
function rh(n, t, e, i) {
  i = i || De;
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
function fm(n, t) {
  let e;
  if (Z(n)) {
    const o = {};
    o[n + "Index"] = 0, e = o;
  } else
    e = n;
  const i = B(), s = {};
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
function da(n) {
  return F(n) && !K(n) && !(n instanceof Date) ? n.value : n;
}
function dm(n) {
  return F(n) && !(n instanceof Array);
}
const go = "\0__throttleOriginMethod", ru = "\0__throttleRate", ou = "\0__throttleType";
function Cp(n, t, e) {
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
function Dp(n, t, e, i) {
  let s = n[t];
  if (!s)
    return;
  const r = s[go] || s, o = s[ou];
  if (s[ru] !== e || o !== i) {
    if (e == null || !i)
      return n[t] = r;
    s = n[t] = Cp(r, e, i === "debounce"), s[go] = r, s[ou] = i, s[ru] = e;
  }
  return s;
}
function pm(n, t) {
  const e = n[t];
  e && e[go] && (e.clear && e.clear(), n[t] = e[go]);
}
let ir = class {
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
const gm = ".", _m = "___PI__EXTENDED_CLASS___", hn = "___PI__COMPONENT__CONTAINER___";
function mm(n) {
  ua(
    /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)?$/.test(n),
    'componentType "' + n + '" illegal'
  );
}
function ym(n) {
  return !!(n && n[_m]);
}
function ze(n) {
  const t = { main: "", sub: "" };
  if (n) {
    const e = n.split(gm);
    t.main = e[0] || "", t.sub = e[1] || "";
  }
  return t;
}
function pa(n) {
  const t = {};
  n.registerClass = function(i) {
    const s = i.type || i.prototype.type;
    if (s) {
      mm(s), i.prototype.type = s;
      const r = ze(s);
      if (!r.sub)
        t[r.main] && console.warn(r.main + " exists."), t[r.main] = i;
      else if (r.sub !== hn) {
        const o = e(r);
        o[r.sub] = i;
      }
    }
    return i;
  }, n.getClass = function(i, s, r) {
    let o = t[i];
    return o && o[hn] && (o = s ? o[s] : null), o;
  }, n.getAllClassMainTypes = function() {
    const i = [];
    return D(t, function(s, r) {
      i.push(r);
    }), i;
  }, n.getClassesByMainType = function(i) {
    const s = ze(i), r = [], o = t[s.main];
    return o && o[hn] ? D(o, function(a, l) {
      l !== hn && r.push(a);
    }) : r.push(o), r;
  }, n.hasClass = function(i) {
    const s = ze(i);
    return !!t[s.main];
  }, n.hasSubTypes = function(i) {
    const s = ze(i), r = t[s.main];
    return r && r[hn];
  };
  function e(i) {
    let s = t[i.main];
    return (!s || !s[hn]) && (s = t[i.main] = {}, s[hn] = !0), s;
  }
}
let vm = Math.round(Math.random() * 10);
function ga(n) {
  return [n || "", vm++].join("_");
}
function xm(n) {
  const t = {};
  n.registerSubTypeDefaulter = function(e, i) {
    const s = ze(e);
    t[s.main] = i;
  }, n.determineSubType = function(e, i) {
    let s = i.type;
    if (!s) {
      const r = ze(e).main;
      n.hasSubTypes(e) && t[r] && (s = t[r](i));
    }
    return s;
  };
}
function wm(n, t) {
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
      throw _ = D0(
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
        ot(c.predecessor, f) < 0 && c.predecessor.push(f);
        const d = i(o, f);
        ot(d.successor, f) < 0 && d.successor.push(l);
      });
    }), { graph: o, noEntryList: a };
  }
  function i(r, o) {
    return r[o] || (r[o] = { predecessor: [], successor: [] }), r[o];
  }
  function s(r, o) {
    const a = [];
    return D(r, function(l) {
      ot(o, l) >= 0 && a.push(l);
    }), a;
  }
}
function oh(n, t) {
  return dt(dt({}, n, !0), t, !0);
}
class Jt {
  constructor() {
    this.group = new zrender.Group(), this.uid = ga("viewComponent");
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
pa(Jt);
let Sm = class {
  constructor() {
    this.firefox = !1, this.ie = !1, this.edge = !1, this.newEdge = !1, this.weChat = !1;
  }
}, bm = class {
  constructor() {
    this.browser = new Sm(), this.node = !1, this.wxa = !1, this.worker = !1, this.svgSupported = !1, this.touchEventsSupported = !1, this.pointerEventsSupported = !1, this.domSupported = !1, this.transformSupported = !1, this.transform3dSupported = !1, this.hasGlobalWindow = typeof window != "undefined";
  }
};
const ie = new bm();
typeof wx == "object" && typeof wx.getSystemInfoSync == "function" ? (ie.wxa = !0, ie.touchEventsSupported = !0) : typeof document == "undefined" && typeof self != "undefined" ? ie.worker = !0 : typeof navigator == "undefined" ? (ie.node = !0, ie.svgSupported = !0) : Tm(navigator.userAgent, ie);
function Tm(n, t) {
  const e = t.browser, i = n.match(/Firefox\/([\d.]+)/), s = n.match(/MSIE\s([\d.]+)/) || n.match(/Trident\/.+?rv:(([\d.]+))/), r = n.match(/Edge?\/([\d.]+)/), o = /micromessenger/i.test(n);
  i && (e.firefox = !0, e.version = i[1]), s && (e.ie = !0, e.version = s[1]), r && (e.edge = !0, e.version = r[1], e.newEdge = +r[1].split(".")[0] > 18), o && (e.weChat = !0), t.svgSupported = typeof SVGRect != "undefined", t.touchEventsSupported = "ontouchstart" in window && !e.ie && !e.edge, t.pointerEventsSupported = "onpointerdown" in window && (e.edge || e.ie && +e.version >= 11), t.domSupported = typeof document != "undefined";
  const a = document.documentElement.style;
  t.transform3dSupported = // IE9 only supports transform 2D
  // transform 3D supported since IE10
  // we detect it by whether 'transition' is in style
  (e.ie && "transition" in a || e.edge || "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix() || "MozPerspective" in a) && !("OTransition" in a), t.transformSupported = t.transform3dSupported || e.ie && +e.version >= 9;
}
var Ip = 12, Mm = "sans-serif", Gs = Ip + "px " + Mm, Cm = 20, Dm = 100, Im = "007LLmW'55;N0500LLLLLLLLLL00NNNLzWW\\\\WQb\\0FWLg\\bWb\\WQ\\WrWWQ000CL5LLFLL0LL**F*gLLLL5F0LF\\FFF5.5N";
function Em(n) {
  var t = {};
  if (typeof JSON == "undefined")
    return t;
  for (var e = 0; e < n.length; e++) {
    var i = String.fromCharCode(e + 32), s = (n.charCodeAt(e) - Cm) / Dm;
    t[i] = s;
  }
  return t;
}
var Rm = Em(Im), sr = {
  createCanvas: function() {
    return typeof document != "undefined" && document.createElement("canvas");
  },
  measureText: /* @__PURE__ */ (function() {
    var n, t;
    return function(e, i) {
      if (!n) {
        var s = sr.createCanvas();
        n = s && s.getContext("2d");
      }
      if (n)
        return t !== i && (t = n.font = i || Gs), n.measureText(e);
      e = e || "", i = i || Gs;
      var r = /(\d+)px/.exec(i), o = r && +r[1] || Ip, a = 0;
      if (i.indexOf("mono") >= 0)
        a = o * e.length;
      else
        for (var l = 0; l < e.length; l++) {
          var c = Rm[e[l]];
          a += c == null ? o : c * o;
        }
      return { width: a };
    };
  })(),
  loadImage: function(n, t, e) {
    var i = new Image();
    return i.onload = t, i.onerror = e, i.src = n, i;
  }
}, Ep = ch([
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
}, {}), Rp = ch([
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
}, {}), _a = Object.prototype.toString, ma = Array.prototype, Am = ma.forEach, km = ma.filter, Ap = ma.slice, Pm = ma.map, au = function() {
}.constructor, hr = au ? au.prototype : null, ah = "__proto__", Lm = 2311;
function Om() {
  return Lm++;
}
function lh() {
  for (var n = [], t = 0; t < arguments.length; t++)
    n[t] = arguments[t];
  typeof console != "undefined" && console.error.apply(console, n);
}
function Ei(n) {
  if (n == null || typeof n != "object")
    return n;
  var t = n, e = _a.call(n);
  if (e === "[object Array]") {
    if (!ms(n)) {
      t = [];
      for (var i = 0, s = n.length; i < s; i++)
        t[i] = Ei(n[i]);
    }
  } else if (Rp[e]) {
    if (!ms(n)) {
      var r = n.constructor;
      if (r.from)
        t = r.from(n);
      else {
        t = new r(n.length);
        for (var i = 0, s = n.length; i < s; i++)
          t[i] = n[i];
      }
    }
  } else if (!Ep[e] && !ms(n) && !Vl(n)) {
    t = {};
    for (var o in n)
      n.hasOwnProperty(o) && o !== ah && (t[o] = Ei(n[o]));
  }
  return t;
}
function Je(n, t, e) {
  if (!ae(t) || !ae(n))
    return e ? Ei(t) : n;
  for (var i in t)
    if (t.hasOwnProperty(i) && i !== ah) {
      var s = n[i], r = t[i];
      ae(r) && ae(s) && !Ri(r) && !Ri(s) && !Vl(r) && !Vl(s) && !lu(r) && !lu(s) && !ms(r) && !ms(s) ? Je(s, r, e) : (e || !(i in n)) && (n[i] = Ei(t[i]));
    }
  return n;
}
function R(n, t) {
  if (Object.assign)
    Object.assign(n, t);
  else
    for (var e in t)
      t.hasOwnProperty(e) && e !== ah && (n[e] = t[e]);
  return n;
}
function Ee(n, t, e) {
  for (var i = vt(t), s = 0; s < i.length; s++) {
    var r = i[s];
    n[r] == null && (n[r] = t[r]);
  }
  return n;
}
function Ct(n, t) {
  if (n) {
    if (n.indexOf)
      return n.indexOf(t);
    for (var e = 0, i = n.length; e < i; e++)
      if (n[e] === t)
        return e;
  }
  return -1;
}
function Bi(n, t, e) {
  if (n = "prototype" in n ? n.prototype : n, t = "prototype" in t ? t.prototype : t, Object.getOwnPropertyNames)
    for (var i = Object.getOwnPropertyNames(t), s = 0; s < i.length; s++) {
      var r = i[s];
      r !== "constructor" && n[r] == null && (n[r] = t[r]);
    }
  else
    Ee(n, t);
}
function jt(n) {
  return !n || typeof n == "string" ? !1 : typeof n.length == "number";
}
function nt(n, t, e) {
  if (n && t)
    if (n.forEach && n.forEach === Am)
      n.forEach(t, e);
    else if (n.length === +n.length)
      for (var i = 0, s = n.length; i < s; i++)
        t.call(e, n[i], i, n);
    else
      for (var r in n)
        n.hasOwnProperty(r) && t.call(e, n[r], r, n);
}
function ce(n, t, e) {
  if (!n)
    return [];
  if (!t)
    return kp(n);
  if (n.map && n.map === Pm)
    return n.map(t, e);
  for (var i = [], s = 0, r = n.length; s < r; s++)
    i.push(t.call(e, n[s], s, n));
  return i;
}
function ch(n, t, e, i) {
  if (n && t) {
    for (var s = 0, r = n.length; s < r; s++)
      e = t.call(i, e, n[s], s, n);
    return e;
  }
}
function _o(n, t, e) {
  if (!n)
    return [];
  if (!t)
    return kp(n);
  if (n.filter && n.filter === km)
    return n.filter(t, e);
  for (var i = [], s = 0, r = n.length; s < r; s++)
    t.call(e, n[s], s, n) && i.push(n[s]);
  return i;
}
function vt(n) {
  if (!n)
    return [];
  if (Object.keys)
    return Object.keys(n);
  var t = [];
  for (var e in n)
    n.hasOwnProperty(e) && t.push(e);
  return t;
}
function Fm(n, t) {
  for (var e = [], i = 2; i < arguments.length; i++)
    e[i - 2] = arguments[i];
  return function() {
    return n.apply(t, e.concat(Ap.call(arguments)));
  };
}
var Yl = hr && Xn(hr.bind) ? hr.call.bind(hr.bind) : Fm;
function Ri(n) {
  return Array.isArray ? Array.isArray(n) : _a.call(n) === "[object Array]";
}
function Xn(n) {
  return typeof n == "function";
}
function Kt(n) {
  return typeof n == "string";
}
function le(n) {
  return typeof n == "number";
}
function ae(n) {
  var t = typeof n;
  return t === "function" || !!n && t === "object";
}
function lu(n) {
  return !!Ep[_a.call(n)];
}
function Bm(n) {
  return !!Rp[_a.call(n)];
}
function Vl(n) {
  return typeof n == "object" && typeof n.nodeType == "number" && typeof n.ownerDocument == "object";
}
function ya(n) {
  return n.colorStops != null;
}
function Nm(n) {
  return n.image != null;
}
function zm(n) {
  return n !== n;
}
function Wl(n, t) {
  return n != null ? n : t;
}
function kp(n) {
  for (var t = [], e = 1; e < arguments.length; e++)
    t[e - 1] = arguments[e];
  return Ap.apply(n, t);
}
function ur(n) {
  return n == null ? null : typeof n.trim == "function" ? n.trim() : n.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
}
var Hm = "__ec_primitive__";
function ms(n) {
  return n[Hm];
}
function va(n, t) {
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
function Pp(n) {
  var t = n.style;
  t.webkitUserSelect = "none", t.userSelect = "none", t.webkitTapHighlightColor = "rgba(0,0,0,0)", t["-webkit-touch-callout"] = "none";
}
function fr(n, t) {
  return n.hasOwnProperty(t);
}
function Ra() {
}
var $m = 180 / Math.PI;
function hh(n, t) {
  for (let e = 0; e < n.length; e++)
    n[e][1] || (n[e][1] = n[e][0]);
  return t = t || !1, function(e, i, s) {
    const r = {};
    for (let o = 0; o < n.length; o++) {
      const a = n[o][1];
      if (i && Ct(i, a) >= 0 || s && Ct(s, a) < 0)
        continue;
      const l = e.getShallow(a, t);
      l != null && (r[n[o][0]] = l);
    }
    return r;
  };
}
const Gm = [
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
], Ym = hh(Gm);
class Vm {
  getLineStyle(t) {
    return Ym(this, t);
  }
}
const uh = {}, cu = [
  "fontStyle",
  "fontWeight",
  "fontSize",
  "fontFamily",
  "textShadowColor",
  "textShadowBlur",
  "textShadowOffsetX",
  "textShadowOffsetY"
], hu = [
  "align",
  "lineHeight",
  "width",
  "height",
  "tag",
  "verticalAlign",
  "ellipsis"
], uu = [
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
function Lp(n, t, e, i, s) {
  const r = {};
  return Wm(r, n, e, i, s), t && N(r, t), r;
}
function Wm(n, t, e, i, s) {
  e = e || uh;
  const r = t.piModel, o = r && r.option.textStyle, a = Um(t);
  let l;
  if (a) {
    l = {};
    for (const u in a)
      if (a.hasOwnProperty(u)) {
        const f = t.getModel(["rich", u]);
        fu(
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
  h != null && (n.margin = h), fu(
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
function fu(n, t, e, i, s, r, o, a) {
  e = e || uh;
  const l = i && i.inheritColor;
  let c = t.getShallow("color"), h = t.getShallow("textBorderColor"), u = oe(
    t.getShallow("opacity"),
    e.opacity
  );
  (c === "inherit" || c === "auto") && (l ? c = l : c = null), (h === "inherit" || h === "auto") && (l ? h = l : h = null), c = c || e.color, h = h || e.textBorderColor, c != null && (n.fill = c), h != null && (n.stroke = h);
  const f = oe(
    t.getShallow("textBorderWidth"),
    e.textBorderWidth
  );
  f != null && (n.lineWidth = f);
  const d = oe(
    t.getShallow("textBorderType"),
    e.textBorderType
  );
  d != null && (n.lineDash = d);
  const p = oe(
    t.getShallow("textBorderDashOffset"),
    e.textBorderDashOffset
  );
  p != null && (n.lineDashOffset = p), u == null && !a && (u = i && i.defaultOpacity), u != null && (n.opacity = u), n.fill == null && i.inheritColor && (n.fill = i.inheritColor);
  for (let _ = 0; _ < cu.length; _++) {
    const g = cu[_], m = oe(t.getShallow(g), e[g]);
    m != null && (n[g] = m);
  }
  for (let _ = 0; _ < hu.length; _++) {
    const g = hu[_], m = t.getShallow(g);
    m != null && (n[g] = m);
  }
  if (n.verticalAlign == null) {
    const _ = t.getShallow("baseline");
    _ != null && (n.verticalAlign = _);
  }
  if (!o || !i.disableBox) {
    for (let g = 0; g < uu.length; g++) {
      const m = uu[g], y = t.getShallow(m);
      y != null && (n[m] = y);
    }
    const _ = t.getShallow("borderType");
    _ != null && (n.borderDash = _), (n.backgroundColor === "auto" || n.backgroundColor === "inherit") && l && (n.backgroundColor = l), (n.borderColor === "auto" || n.borderColor === "inherit") && l && (n.borderColor = l);
  }
}
function Um(n) {
  let t;
  for (; n && n !== n.piModel; ) {
    const e = (n.option || uh).rich;
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
function qm(n, t) {
  const e = t && t.getModel("textStyle");
  return as(
    [
      // FIXME in node-canvas fontWeight is before fontStyle
      n.fontStyle || e && e.getShallow("fontStyle") || "",
      n.fontWeight || e && e.getShallow("fontWeight") || "",
      (n.fontSize || e && e.getShallow("fontSize") || 12) + "px",
      n.fontFamily || e && e.getShallow("fontFamily") || "sans-serif"
    ].join(" ")
  );
}
const Zm = ["textStyle", "color"];
class Xm {
  getTextColor(t) {
    const e = this.piModel;
    return this.getShallow("color") || (!t && e ? e.get(Zm) : null);
  }
  getFont() {
    return qm(
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
const Km = [
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
], jm = hh(Km);
class Qm {
  getItemStyle(t, e) {
    return jm(this, t, e);
  }
}
const Jm = [
  ["fill", "color"],
  ["shadowBlur"],
  ["shadowOffsetX"],
  ["shadowOffsetY"],
  ["opacity"],
  ["shadowColor"]
  // Option decal is in `DecalObject` but style.decal is in `PatternObject`.
  // So do not transfer decal directly.
], ty = hh(Jm);
class ey {
  getAreaStyle(t, e) {
    return ty(this, t, e);
  }
}
class Et {
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
    ), new Et(r, e, this.piModel);
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
    if (!ie.node && this.option) {
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
Bi(Et, Vm);
Bi(Et, Xm);
Bi(Et, Qm);
Bi(Et, ey);
function mo() {
  return [1, 0, 0, 1, 0, 0];
}
function Op(n) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 1, n[4] = 0, n[5] = 0, n;
}
function ny(n, t) {
  return n[0] = t[0], n[1] = t[1], n[2] = t[2], n[3] = t[3], n[4] = t[4], n[5] = t[5], n;
}
function ys(n, t, e) {
  const i = t[0] * e[0] + t[2] * e[1], s = t[1] * e[0] + t[3] * e[1], r = t[0] * e[2] + t[2] * e[3], o = t[1] * e[2] + t[3] * e[3], a = t[0] * e[4] + t[2] * e[5] + t[4], l = t[1] * e[4] + t[3] * e[5] + t[5];
  return n[0] = i, n[1] = s, n[2] = r, n[3] = o, n[4] = a, n[5] = l, n;
}
function du(n, t, e) {
  return n[0] = t[0], n[1] = t[1], n[2] = t[2], n[3] = t[3], n[4] = t[4] + e[0], n[5] = t[5] + e[1], n;
}
function Fp(n, t, e) {
  const i = t[0], s = t[2], r = t[4], o = t[1], a = t[3], l = t[5], c = Math.sin(e), h = Math.cos(e);
  return n[0] = i * h + o * c, n[1] = -i * c + o * h, n[2] = s * h + a * c, n[3] = -s * c + h * a, n[4] = h * r + c * l, n[5] = h * l - c * r, n;
}
function iy(n, t, e) {
  const i = e[0], s = e[1];
  return n[0] = t[0] * i, n[1] = t[1] * s, n[2] = t[2] * i, n[3] = t[3] * s, n[4] = t[4] * i, n[5] = t[5] * s, n;
}
function sy(n, t) {
  const e = t[0], i = t[2], s = t[4], r = t[1], o = t[3], a = t[5];
  let l = e * o - r * i;
  return l ? (l = 1 / l, n[0] = o * l, n[1] = -r * l, n[2] = -i * l, n[3] = e * l, n[4] = (i * a - o * s) * l, n[5] = (r * s - e * a) * l, n) : null;
}
let ct = class Bp {
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
    return new Bp(this.x, this.y);
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
const dr = Math.min, pr = Math.max, un = new ct(), fn = new ct(), dn = new ct(), pn = new ct(), Wi = new ct(), Ui = new ct();
let Dt = class Ke {
  constructor(t, e, i, s) {
    i < 0 && (t = t + i, i = -i), s < 0 && (e = e + s, s = -s), this.x = t, this.y = e, this.width = i, this.height = s;
  }
  union(t) {
    const e = dr(t.x, this.x), i = dr(t.y, this.y);
    isFinite(this.x) && isFinite(this.width) ? this.width = pr(
      t.x + t.width,
      this.x + this.width
    ) - e : this.width = t.width, isFinite(this.y) && isFinite(this.height) ? this.height = pr(
      t.y + t.height,
      this.y + this.height
    ) - i : this.height = t.height, this.x = e, this.y = i;
  }
  applyTransform(t) {
    Ke.applyTransform(this, this, t);
  }
  calculateTransform(t) {
    const e = this, i = t.width / e.width, s = t.height / e.height, r = mo();
    return du(r, r, [-e.x, -e.y]), iy(r, r, [i, s]), du(r, r, [t.x, t.y]), r;
  }
  intersect(t, e) {
    if (!t)
      return !1;
    t instanceof Ke || (t = Ke.create(t));
    const i = this, s = i.x, r = i.x + i.width, o = i.y, a = i.y + i.height, l = t.x, c = t.x + t.width, h = t.y, u = t.y + t.height;
    let f = !(r < l || c < s || a < h || u < o);
    if (e) {
      let d = 1 / 0, p = 0;
      const _ = Math.abs(r - l), g = Math.abs(c - s), m = Math.abs(a - h), y = Math.abs(u - o), v = Math.min(_, g), S = Math.min(m, y);
      r < l || c < s ? v > p && (p = v, _ < g ? ct.set(Ui, -_, 0) : ct.set(Ui, g, 0)) : v < d && (d = v, _ < g ? ct.set(Wi, _, 0) : ct.set(Wi, -g, 0)), a < h || u < o ? S > p && (p = S, m < y ? ct.set(Ui, 0, -m) : ct.set(Ui, 0, y)) : v < d && (d = v, m < y ? ct.set(Wi, 0, m) : ct.set(Wi, 0, -y));
    }
    return e && ct.copy(e, f ? Wi : Ui), f;
  }
  contain(t, e) {
    const i = this;
    return t >= i.x && t <= i.x + i.width && e >= i.y && e <= i.y + i.height;
  }
  clone() {
    return new Ke(this.x, this.y, this.width, this.height);
  }
  /**
   * Copy from another rect
   */
  copy(t) {
    Ke.copy(this, t);
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
    return new Ke(t.x, t.y, t.width, t.height);
  }
  static copy(t, e) {
    t.x = e.x, t.y = e.y, t.width = e.width, t.height = e.height;
  }
  static applyTransform(t, e, i) {
    if (!i) {
      t !== e && Ke.copy(t, e);
      return;
    }
    if (i[1] < 1e-5 && i[1] > -1e-5 && i[2] < 1e-5 && i[2] > -1e-5) {
      const o = i[0], a = i[3], l = i[4], c = i[5];
      t.x = e.x * o + l, t.y = e.y * a + c, t.width = e.width * o, t.height = e.height * a, t.width < 0 && (t.x += t.width, t.width = -t.width), t.height < 0 && (t.y += t.height, t.height = -t.height);
      return;
    }
    un.x = dn.x = e.x, un.y = pn.y = e.y, fn.x = pn.x = e.x + e.width, fn.y = dn.y = e.y + e.height, un.transform(i), pn.transform(i), fn.transform(i), dn.transform(i), t.x = dr(un.x, fn.x, dn.x, pn.x), t.y = dr(un.y, fn.y, dn.y, pn.y);
    const s = pr(un.x, fn.x, dn.x, pn.x), r = pr(un.y, fn.y, dn.y, pn.y);
    t.width = s - t.x, t.height = r - t.y;
  }
};
const ry = y0;
function oy(n) {
  if (!F0(n))
    return Z(n) ? n : "-";
  const t = (n + "").split(".");
  return t[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,") + (t.length > 1 ? "." + t[1] : "");
}
const ay = [
  "left",
  "right",
  "top",
  "bottom",
  "width",
  "height"
], gr = [
  ["width", "left", "right"],
  ["height", "top", "bottom"]
];
function Np(n) {
  const t = n.layoutMode || n.constructor.layoutMode;
  return F(t) ? t : t ? { type: t } : null;
}
function Ys(n) {
  return ly({}, n);
}
function ly(n, t) {
  return t && n && nt(ay, function(e) {
    t.hasOwnProperty(e) && (n[e] = t[e]);
  }), n;
}
function zp(n, t, e) {
  let i = e && e.ignoreSize;
  !K(i) && (i = [i, i]);
  const s = o(gr[0], 0), r = o(gr[1], 1);
  c(gr[0], n, s), c(gr[1], n, r);
  function o(h, u) {
    const f = {};
    let d = 0;
    const p = {};
    let _ = 0;
    const g = 2;
    if (nt(h, function(m) {
      p[m] = n[m];
    }), nt(h, function(m) {
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
    nt(h, function(d) {
      u[d] = f[d];
    });
  }
}
function Vs(n, t, e) {
  e = ry(e || 0);
  const i = t.width, s = t.height;
  let r = Jn(n.left, i), o = Jn(n.top, s);
  const a = Jn(n.right, i), l = Jn(n.bottom, s);
  let c = Jn(n.width, i), h = Jn(n.height, s);
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
  const p = new Dt(
    r + e[3],
    o + e[0],
    c,
    h
  );
  return p.margin = e, p;
}
const cy = pt();
class W extends Et {
  constructor(t, e, i) {
    super(t, e, i), this.uid = ga("pi_cpt_model");
  }
  init(t, e, i) {
    this.mergeDefaultAndTheme(t, i);
  }
  mergeDefaultAndTheme(t, e) {
    dt(t, this.getDefaultOption());
  }
  mergeOption(t, e) {
    dt(this.option, t, !0);
    const i = Np(this);
    i && zp(
      this.option,
      t,
      i
    );
  }
  optionUpdated(t, e) {
  }
  getDefaultOption() {
    const t = this.constructor;
    if (!ym(t))
      return t.defaultOption;
    const e = cy(this);
    if (!e.defaultOption) {
      const i = [];
      let s = t;
      for (; s; ) {
        const o = s.prototype.defaultOption;
        o && i.push(o), s = s.superClass;
      }
      let r = {};
      for (let o = i.length - 1; o >= 0; o--)
        r = dt(r, i[o], !0);
      e.defaultOption = r;
    }
    return e.defaultOption;
  }
  getReferringComponents(t, e) {
    const i = t + "Index", s = t + "Id";
    return rh(
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
pa(W);
xm(
  W
);
wm(
  W,
  hy
);
function hy(n) {
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
  ), t = G(t, function(e) {
    return ze(e).main;
  }), n !== "dataset" && ot(t, "dataset") <= 0 && t.unshift("dataset"), t;
}
function vs(n) {
  return new uy(n);
}
class uy {
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
    pu.reset(e, i, s, r), this._callingProgress = t, this._callingProgress(
      {
        start: e,
        end: i,
        count: i - e,
        next: pu.next
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
const pu = /* @__PURE__ */ (function() {
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
})(), Hp = B(["tooltip", "label", "itemName", "itemId", "itemGroupId", "seriesName"]), fy = "undefined", dy = typeof Int32Array === fy ? Array : Int32Array, he = "original", wt = "arrayRows", Re = "objectRows", Ge = "keyedColumns", nn = "typedArray", $p = "unknown", $e = "column", Ni = "row", bt = {
  Must: 1,
  // Encounter string but not '-' and not number-like.
  Might: 2,
  // Encounter string but number-like.
  Not: 3
  // Other cases
}, py = pt();
function Gp(n) {
  if (!n.get("data", !0))
    return rh(
      n.piModel,
      "dataset",
      {
        index: n.get("datasetIndex", !0),
        id: n.get("datasetId", !0)
      },
      De
    ).models[0];
}
function gy(n) {
  return !n.get("transform", !0) && !n.get("fromTransformResult", !0) ? [] : rh(
    n.piModel,
    "dataset",
    {
      index: n.get("fromDatasetIndex", !0),
      id: n.get("fromDatasetId", !0)
    },
    De
  ).models;
}
function Yp(n, t) {
  return _y(
    n.data,
    n.sourceFormat,
    n.seriesLayoutBy,
    n.dimensionsDefine,
    n.startIndex,
    t
  );
}
function _y(n, t, e, i, s, r) {
  let o;
  if (Ii(n))
    return bt.Not;
  let l, c;
  if (i) {
    const u = i[r];
    F(u) ? (l = u.name, c = u.type) : Z(u) && (l = u);
  }
  if (c != null)
    return c === "ordinal" ? bt.Must : bt.Not;
  if (t === wt) {
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
  } else if (t === Re) {
    const u = n;
    if (!l)
      return bt.Not;
    for (let f = 0; f < u.length && f < 5; f++) {
      const d = u[f];
      if (d && (o = h(d[l])) != null)
        return o;
    }
  } else if (t === Ge) {
    const u = n;
    if (!l)
      return bt.Not;
    const f = u[l];
    if (!f || Ii(f))
      return bt.Not;
    for (let d = 0; d < f.length && d < 5; d++)
      if ((o = h(f[d])) != null)
        return o;
  } else if (t === he) {
    const u = n;
    for (let f = 0; f < u.length && f < 5; f++) {
      const d = u[f], p = da(d);
      if (!K(p))
        return bt.Not;
      if ((o = h(p[r])) != null)
        return o;
    }
  }
  function h(u) {
    const f = Z(u);
    if (u != null && isFinite(u) && u !== "")
      return f ? bt.Might : bt.Not;
    if (f && u !== "-")
      return bt.Must;
  }
  return bt.Not;
}
function my(n, t, e) {
  const i = {}, s = Gp(t);
  if (!s || !n)
    return i;
  const r = [], o = [], a = t.piModel, l = py(a).datasetMap, c = s.uid + "_" + e.seriesLayoutBy;
  let h, u;
  n = n.slice(), nt(n, function(_, g) {
    const m = F(_) ? _ : n[g] = {
      name: _
    };
    m.type === "ordinal" && h == null && (h = g, u = p(m)), i[m.name] = [];
  });
  const f = l.get(c) || l.set(c, {
    categoryWayDim: u,
    valueWayDim: 0
  });
  nt(
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
class xa {
  constructor(t) {
    this.data = t.data || (t.sourceFormat === Ge ? {} : []), this.sourceFormat = t.sourceFormat || $p, this.seriesLayoutBy = t.seriesLayoutBy || $e, this.startIndex = t.startIndex || 0, this.dimensionsDetectedCount = t.dimensionsDetectedCount, this.metaRawOption = t.metaRawOption;
    const e = this.dimensionsDefine = t.dimensionsDefine;
    if (e)
      for (let i = 0; i < e.length; i++) {
        const s = e[i];
        s.type == null && Yp(this, i) === bt.Must && (s.type = "ordinal");
      }
  }
}
function fh(n) {
  return n instanceof xa;
}
function Ul(n, t, e) {
  e = e || Wp(n);
  const i = t.seriesLayoutBy, s = vy(
    n,
    e,
    i,
    t.sourceHeader,
    t.dimensions
  );
  return new xa({
    data: n,
    sourceFormat: e,
    seriesLayoutBy: i,
    dimensionsDefine: s.dimensionsDefine,
    startIndex: s.startIndex,
    dimensionsDetectedCount: s.dimensionsDetectedCount,
    metaRawOption: U(t)
  });
}
function Vp(n) {
  return new xa({
    data: n,
    sourceFormat: Ii(n) ? nn : he
  });
}
function yy(n) {
  return new xa({
    data: n.data,
    sourceFormat: n.sourceFormat,
    seriesLayoutBy: n.seriesLayoutBy,
    dimensionsDefine: U(n.dimensionsDefine),
    startIndex: n.startIndex,
    dimensionsDetectedCount: n.dimensionsDetectedCount
  });
}
function Wp(n) {
  let t = $p;
  if (Ii(n))
    t = nn;
  else if (K(n)) {
    n.length === 0 && (t = wt);
    for (let e = 0, i = n.length; e < i; e++) {
      const s = n[e];
      if (s != null) {
        if (K(s)) {
          t = wt;
          break;
        } else if (F(s)) {
          t = Re;
          break;
        }
      }
    }
  } else if (F(n)) {
    for (const e in n)
      if (Ce(n, e) && It(n[e])) {
        t = Ge;
        break;
      }
  }
  return t;
}
function vy(n, t, e, i, s) {
  let r, o;
  if (!n)
    return {
      dimensionsDefine: gu(s),
      startIndex: o,
      dimensionsDetectedCount: r
    };
  if (t === wt) {
    const a = n;
    i === "auto" || i == null ? _u(
      function(l) {
        l != null && l !== "-" && (Z(l) ? o == null && (o = 1) : o = 0);
      },
      e,
      a,
      10
    ) : o = Te(i) ? i : i ? 1 : 0, !s && o === 1 && (s = [], _u(
      function(l, c) {
        s[c] = l != null ? l + "" : "";
      },
      e,
      a,
      1 / 0
    )), r = s ? s.length : e === Ni ? a.length : a[0] ? a[0].length : null;
  } else if (t === Re)
    s || (s = xy(
      n
    ));
  else if (t === Ge)
    s || (s = [], D(n, function(a, l) {
      s.push(l);
    }));
  else if (t === he) {
    const a = da(n[0]);
    r = K(a) && a.length || 1;
  }
  return {
    startIndex: o,
    dimensionsDefine: gu(s),
    dimensionsDetectedCount: r
  };
}
function xy(n) {
  let t = 0, e;
  for (; t < n.length && !(e = n[t++]); )
    ;
  if (e)
    return tt(e);
}
function gu(n) {
  if (!n)
    return;
  const t = B();
  return G(n, function(e, i) {
    e = F(e) ? e : { name: e };
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
function _u(n, t, e, i) {
  if (t === Ni)
    for (let s = 0; s < e.length && s < i; s++)
      n(e[s] ? e[s][0] : null, s);
  else {
    const s = e[0] || [];
    for (let r = 0; r < s.length && r < i; r++)
      n(s[r], r);
  }
}
function wy(n) {
  const t = n.sourceFormat;
  return t === Re || t === Ge;
}
const mu = function(n, t, e, i) {
  return n[i];
}, Sy = {
  [wt + "_" + $e]: function(n, t, e, i) {
    return n[i + t];
  },
  [wt + "_" + Ni]: function(n, t, e, i, s) {
    i += t;
    const r = s || [], o = n;
    for (let a = 0; a < o.length; a++) {
      const l = o[a];
      r[a] = l ? l[i] : null;
    }
    return r;
  },
  [Re]: mu,
  [Ge]: function(n, t, e, i, s) {
    const r = s || [];
    for (let o = 0; o < e.length; o++) {
      const a = e[o].name, l = n[a];
      r[o] = l ? l[i] : null;
    }
    return r;
  },
  [he]: mu
};
function dh(n, t) {
  return n === wt ? n + "_" + t : n;
}
function Up(n, t) {
  return Sy[dh(n, t)];
}
function qp(n, t) {
  return by[dh(n, t)];
}
const yu = function(n, t, e) {
  return n.length;
}, by = {
  [wt + "_" + $e]: function(n, t, e) {
    return Math.max(0, n.length - t);
  },
  [wt + "_" + Ni]: function(n, t, e) {
    const i = n[0];
    return i ? Math.max(0, i.length - t) : 0;
  },
  [Re]: yu,
  [Ge]: function(n, t, e) {
    const i = e[0].name, s = n[i];
    return s ? s.length : 0;
  },
  [he]: yu
}, Aa = function(n, t, e) {
  return n[t];
}, Ty = {
  [wt]: Aa,
  [Re]: function(n, t, e) {
    return n[e];
  },
  [Ge]: Aa,
  [he]: function(n, t, e) {
    const i = da(n);
    return i instanceof Array ? i[t] : i;
  },
  [nn]: Aa
};
function My(n) {
  return Ty[n];
}
let vu, xu;
const Hh = class Hh {
  constructor(t, e) {
    const i = fh(t) ? t : Vp(t);
    this._source = i;
    const s = this._data = i.data;
    i.sourceFormat === nn && (this._offset = 0, this._dimSize = e, this._data = s), xu(this, s, i);
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
Hh.internalField = (function() {
  xu = function(r, o, a) {
    const l = a.sourceFormat, c = a.seriesLayoutBy, h = a.startIndex, u = a.dimensionsDefine, f = vu[dh(l, c)];
    if (R(r, f), l === nn)
      r.getItem = t, r.count = i, r.fillStorage = e;
    else {
      const d = Up(
        l,
        c
      );
      r.getItem = Yl(d, null, o, h, u);
      const p = qp(l, c);
      r.count = Yl(p, null, o, h, u);
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
  vu = {
    [wt + "_" + $e]: {
      pure: !0,
      appendData: s
    },
    [wt + "_" + Ni]: {
      pure: !0,
      appendData: function() {
        throw new Error(
          'Do not support appendData when set seriesLayoutBy: "row".'
        );
      }
    },
    [Re]: {
      pure: !0,
      appendData: s
    },
    [Ge]: {
      pure: !0,
      appendData: function(r) {
        const o = this._data;
        nt(r, function(a, l) {
          const c = o[l] || (o[l] = []);
          for (let h = 0; h < (a || []).length; h++)
            c.push(a[h]);
        });
      }
    },
    [he]: {
      appendData: s
    },
    [nn]: {
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
let yo = Hh;
function eo(n, t) {
  const e = t && t.type;
  return e === "ordinal" ? n : (e === "time" && // spead up when using timestamp
  !Te(n) && n != null && n !== "-" && (n = +Zn(n)), n == null || n === "" ? NaN : (
    // If string (like '-'), using '+' parse to NaN
    // If object, also parse to NaN
    +n
  ));
}
class Cy {
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
    return eo(t, e);
  }
}
function Dy(n, t) {
  const e = new Cy(), i = n.data, s = e.sourceFormat = n.sourceFormat, r = n.startIndex;
  n.seriesLayoutBy !== $e && ne("");
  const a = [], l = {}, c = n.dimensionsDefine;
  if (c)
    D(c, function(p, _) {
      const g = p.name, m = {
        index: _,
        name: g,
        displayName: p.displayName
      };
      a.push(m), g != null && (Ce(l, g) && ne(""), l[g] = m);
    });
  else
    for (let p = 0; p < n.dimensionsDetectedCount; p++)
      a.push({ index: p });
  const h = Up(s, $e);
  t.__isBuiltIn && (e.getRawDataItem = function(p) {
    return h(i, r, a, p);
  }, e.getRawData = L(Iy, null, n)), e.cloneRawData = L(Ey, null, n);
  const u = qp(s, $e);
  e.count = L(u, null, i, r, a);
  const f = My(s);
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
  return e.getDimensionInfo = L(Ry, null, a, l), e.cloneAllDimensionInfo = L(Ay, null, a), e;
}
function Iy(n) {
  const t = n.sourceFormat;
  return ph(t) || ne(""), n.data;
}
function Ey(n) {
  const t = n.sourceFormat, e = n.data;
  if (ph(t) || ne(""), t === wt) {
    const i = [];
    for (let s = 0, r = e.length; s < r; s++)
      i.push(e[s].slice());
    return i;
  } else if (t === Re) {
    const i = [];
    for (let s = 0, r = e.length; s < r; s++)
      i.push(N({}, e[s]));
    return i;
  }
}
function Ry(n, t, e) {
  if (e != null) {
    if (Te(e) || !isNaN(e) && !Ce(t, e))
      return n[e];
    if (Ce(t, e))
      return t[e];
  }
}
function Ay(n) {
  return U(n);
}
const ky = B();
function Py(n, t, e) {
  const i = Xt(n), s = i.length;
  s || ne("");
  for (let o = 0, a = s; o < a; o++) {
    const l = i[o];
    t = Ly(l, t), o !== a - 1 && (t.length = Math.max(t.length, 1));
  }
  return t;
}
function Ly(n, t, e, i) {
  let s = "";
  t.length || ne(s), F(n) || ne(s);
  const r = n.type, o = ky.get(r);
  o || ne(s);
  const a = G(t, (c) => Dy(c, o)), l = Xt(
    o.transform({
      upstream: a[0],
      upstreamList: a,
      config: U(n.config)
    })
  );
  return G(l, function(c, h) {
    let u = "";
    F(c) || ne(u), c.data || ne(u);
    const f = Wp(c.data);
    ph(f) || ne(u);
    let d;
    const p = t[0];
    if (p && h === 0 && !c.dimensions) {
      const _ = p.startIndex;
      _ && (c.data = p.data.slice(0, _).concat(c.data)), d = {
        seriesLayoutBy: $e,
        sourceHeader: _,
        dimensions: p.metaRawOption.dimensions
      };
    } else
      d = {
        seriesLayoutBy: $e,
        sourceHeader: 0,
        dimensions: c.dimensions
      };
    return Ul(
      c.data,
      d,
      null
    );
  });
}
function ph(n) {
  return n === wt || n === Re;
}
const wa = "undefined", Oy = typeof Uint32Array === wa ? Array : Uint32Array, Fy = typeof Uint16Array === wa ? Array : Uint16Array, By = typeof Int32Array === wa ? Array : Int32Array, wu = typeof Float64Array === wa ? Array : Float64Array, Zp = {
  float: wu,
  int: By,
  // Ordinal data type can be string or int
  ordinal: Array,
  number: Array,
  time: wu
};
let Su;
class Ws {
  constructor() {
    this._chunks = [], this._count = 0, this._rawCount = 0, this._rawExtent = [], this._extent = [], this._calcDimNameToIdx = B(), this.internalField = (function() {
      function t(e, i, s, r) {
        return eo(e[r], this._dimensions[r]);
      }
      Su = {
        arrayRows: t,
        objectRows(e, i, s, r) {
          return eo(e[i], this._dimensions[r]);
        },
        keyedColumns: t,
        original(e, i, s, r) {
          const o = e && (e.value == null ? e : e.value);
          return eo(
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
    const s = t.getSource(), r = this.defaultDimValueGetter = Su[s.sourceFormat];
    this._dimValueGetter = i || r, this._rawExtent = [], wy(s), this._dimensions = G(e, (o) => ({
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
    const s = this._provider, r = this._chunks, o = this._dimensions, a = o.length, l = this._rawExtent, c = G(o, (h) => h.property);
    for (let h = 0; h < a; h++) {
      const u = o[h];
      l[h] || (l[h] = qi()), zy(r, h, u.type, e, i);
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
    const e = this._chunks[t], i = qi();
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
    return s[r] = { type: e }, i.set(t, r), this._chunks[r] = new Zp[e || "float"](this._rawCount), this._rawExtent[r] = qi(), r;
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
    const i = new Ws(), s = this._chunks, r = t && ha(
      t,
      (o, a) => (o[a] = !0, o),
      {}
    );
    if (r)
      for (let o = 0; o < s.length; o++)
        i._chunks[o] = r[o] ? Ny(s[o]) : s[o];
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
      const i = ka(this._rawCount);
      t = new i(this.count());
      for (let s = 0; s < t.length; s++)
        t[s] = s;
    }
    return t;
  }
  filter(t, e) {
    if (!this._count)
      return this;
    const i = this.clone(), s = i.count(), r = ka(i._rawCount), o = new r(s), a = [], l = t.length;
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
    const o = e.count(), a = ka(e._rawCount), l = new a(o);
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
      c[e[h]] = qi();
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
    o === 0 && (r[t] = qi());
    const l = r[t];
    for (let c = o; c < a; c++) {
      const h = i[c] = e.parseAndCollect(i[c]);
      isNaN(h) || (l[0] = Math.min(h, l[0]), l[1] = Math.max(h, l[1]));
    }
    s.ordinalMeta = e, s.ordinalOffset = a, s.type = "ordinal";
  }
}
function Ny(n) {
  const t = n.constructor;
  return t === Array ? n.slice() : new t(n);
}
function zy(n, t, e, i, s) {
  const r = Zp[e || "float"];
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
function ka(n) {
  return n > 65535 ? Oy : Fy;
}
function qi() {
  return [1 / 0, -1 / 0];
}
class Hy {
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
    if (_r(t)) {
      const o = t;
      let a, l, c;
      if (i) {
        const g = e[0];
        g.prepareSource(), c = g.getSource(), a = c.data, l = c.sourceFormat, r = [g._getVersionSign()];
      } else
        a = o.get("data", !0), l = Ii(a) ? nn : he, this._upstreamSignList = [];
      const h = this._getSourceMetaRawOption() || {}, u = c && c.metaRawOption || {}, f = oe(
        h.seriesLayoutBy,
        u.seriesLayoutBy
      ) || null, d = oe(
        h.sourceHeader,
        u.sourceHeader
      ), p = oe(
        h.dimensions,
        u.dimensions
      );
      s = f !== u.seriesLayoutBy || !!d != !!u.sourceHeader || p ? [
        Ul(
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
          Ul(a, this._getSourceMetaRawOption(), null)
        ], r = [];
      }
    }
    this._setLocalSource(s, r);
  }
  _applyTransform(t) {
    const e = this._sourceHost, i = e.get("transform", !0), s = e.get("fromTransformResult", !0);
    s != null && t.length !== 1 && bu("");
    let r;
    const o = [], a = [];
    return D(t, (l) => {
      l.prepareSource();
      const c = l.getSource(s || 0);
      s != null && !c && bu(""), o.push(c), a.push(l._getVersionSign());
    }), i ? r = Py(i, o, {
      datasetIndex: e.componentIndex
    }) : s != null && (r = [yy(o[0])]), { sourceList: r, upstreamSignList: a };
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
      _r(this._sourceHost) && l ? a = l._innerGetDataStore(
        t,
        e,
        i
      ) : (a = new Ws(), a.initData(
        new yo(e, t.length),
        t
      )), o[i] = a;
    }
    return a;
  }
  _getUpstreamSourceManagers() {
    const t = this._sourceHost;
    if (_r(t)) {
      const e = Gp(t);
      return e ? [e.getSourceManager()] : [];
    } else
      return G(
        gy(t),
        (e) => e.getSourceManager()
      );
  }
  _getSourceMetaRawOption() {
    var r;
    const t = this._sourceHost;
    let e, i, s;
    if (_r(t))
      e = t.get("seriesLayoutBy", !0), i = t.get("sourceHeader", !0), s = t.get("dimensions", !0);
    else if (!((r = this._getUpstreamSourceManagers()) != null && r.length)) {
      const o = t;
      e = o.get("seriesLayoutBy", !0), i = o.get("sourceHeader", !0), s = o.get("dimensions", !0);
    }
    return { seriesLayoutBy: e, sourceHeader: i, dimensions: s };
  }
}
function _r(n) {
  return n.mainType === "series";
}
function bu(n) {
  throw new Error(n);
}
var Tu;
const Ae = pt();
function Pa(n, t) {
  return n.getName(t) || n.getId(t);
}
const $y = "__universalTransitionEnabled";
class vo extends (Tu = W, Tu) {
  constructor() {
    super(...arguments), this._selectedDataIndicesMap = {};
  }
  init(t, e, i) {
    this.seriesIndex = this.componentIndex, this.dataTask = vs({
      count: Gy,
      reset: Yy
    }), this.dataTask.context = { model: this }, this.mergeDefault(t, i);
    const s = Ae(this).sourceManager = new Hy(this);
    s == null || s.prepareSource();
    const r = this.getInitialData(t, i);
    Mu(r, this), this.dataTask.context.data = r, Ae(this).dataBeforeProcessed = r, Wy(this), this._initSelectedMapFromData(r);
  }
  mergeDefault(t, e) {
    dt(t, this.getDefaultOption());
  }
  mergeOption(t, e) {
    dt(this.option, t, !0), this.updateData(this.option.data, e);
  }
  updateData(t, e) {
    var r;
    this.option.data = t;
    const i = Ae(this).sourceManager;
    i && (i._dirty = !0, i.prepareSource());
    const s = this.getInitialData(this.option, e);
    Mu(s, this), this.dataTask.context.data = s, Ae(this).dataBeforeProcessed = s, Ae(this).data = s, (r = this.dataTask) == null || r.dirty();
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
    return (i === "all" || i[Pa(s, t)]) && !s.getItemModel(t).get(["select", "disabled"]);
  }
  _innerSelect(t, e) {
    const i = this.option, s = i.selectedMode, r = e.length;
    if (!(!s || !r)) {
      if (s === "series")
        i.selectedMap = "all";
      else if (s === "multiple") {
        F(i.selectedMap) || (i.selectedMap = {});
        const o = i.selectedMap;
        for (let a = 0; a < r; a++) {
          const l = e[a], c = Pa(t, l);
          o[c] = !0, this._selectedDataIndicesMap[c] = t.getRawIndex(l);
        }
      } else if (s === "single" || s === !0) {
        const o = e[r - 1], a = Pa(t, o);
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
    const e = ql(this);
    if (e) {
      const i = e.context;
      i.outputData = t, e !== this.dataTask && (i.data = t);
    }
    Ae(this).data = t;
  }
  getData(t) {
    const e = ql(this);
    if (e) {
      const i = e.context.data;
      return t == null ? i : i.getLinkedData(t);
    } else
      return Ae(this).data;
  }
  /**
   * 初始化data数据结构
   * 需要被重写
   */
  getInitialData(t, e) {
  }
  getRawData() {
    return Ae(this).dataBeforeProcessed;
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
      return B(t);
  }
  getSourceManager() {
    return Ae(this).sourceManager;
  }
  getBaseAxis() {
    const t = this.coordinateSystem;
    return t && t.getBaseAxis && t.getBaseAxis();
  }
  restoreData() {
    this.dataTask.dirty();
  }
  isUniversalTransitionEnabled() {
    if (this[$y])
      return !0;
    const t = this.option.universalTransition;
    return t ? t === !0 ? !0 : t && t.enabled : !1;
  }
}
function Gy(n) {
  return n.model.getRawData().count();
}
function Yy(n) {
  const t = n.model;
  return t.setData(t.getRawData().cloneShallow()), Vy;
}
function Vy(n, t) {
  t.outputData && n.end > t.outputData.count() && t.model.getRawData().cloneShallow(t.outputData);
}
function ql(n) {
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
function Mu(n, t) {
  D(
    S0(n.CHANGABLE_METHODS, n.DOWNSAMPLE_METHODS),
    function(e) {
      n.wrapMethod(
        e,
        po(qy, t)
      );
    }
  );
}
function Wy(n) {
  const t = n.name;
  em(n) || (n.name = Uy(n) || t);
}
function Uy(n) {
  const t = n.getRawData(), e = t.mapDimensionsAll("seriesName"), i = [];
  return D(e, function(s) {
    const r = t.getDimensionInfo(s);
    r.displayName && i.push(r.displayName);
  }), i.join(" ");
}
function qy(n, t) {
  const e = ql(n);
  return e && e.setOutputEnd((t || this).count()), t;
}
function Zy() {
  const n = pt();
  return function(t) {
    const e = n(t), i = t.pipelineContext, s = !!e.large, r = !!e.progressiveRender, o = e.large = !!(i && i.large), a = e.progressiveRender = !!(i && i.progressiveRender);
    return (s !== o || r !== a) && "reset";
  };
}
const Xy = Zy(), Ky = pt(), Wo = class Wo {
  constructor() {
    this.group = new zrender.Group(), this.uid = ga("viewChart"), this.renderTask = vs({
      plan: jy,
      reset: Qy
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
Wo.protoInitialize = (function() {
  const t = Wo.prototype;
  t.type = "chart";
})();
let Ai = Wo;
function jy(n) {
  return Xy(n.model);
}
function Qy(n) {
  var c;
  const t = n.model, e = n.piModel, i = n.api, s = n.payload, r = (c = t == null ? void 0 : t.pipelineContext) == null ? void 0 : c.progressiveRender, o = n.view, a = s && Ky(s).updateMethod, l = r ? "incrementalPrepareRender" : a && o[a] ? a : "render";
  return l !== "render" && o[l](t, e, i, s), Jy[l];
}
const Jy = {
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
pa(Ai);
const Cu = [], Sa = {
  registerProcessor: SM,
  registerPreprocessor: wM,
  registerAction: MM,
  PRIORITY: K0,
  registerComponentView(n) {
    Jt.registerClass(n);
  },
  registerComponentModel(n) {
    W.registerClass(n);
  },
  registerSeriesModel(n) {
    vo.registerClass(n);
  },
  registerChartView(n) {
    Ai.registerClass(n);
  },
  registerSubTypeDefaulter(n, t) {
    W.registerSubTypeDefaulter(n, t);
  }
};
function Qt(n) {
  if (K(n)) {
    D(n, (t) => {
      Qt(t);
    });
    return;
  }
  ot(Cu, n) >= 0 || (Cu.push(n), Q(n) && (n = {
    install: n
  }), n.install(Sa));
}
const t1 = {
  1: { border: "#CDBD99", background: "#FAF8F1", accent: "#B39C68", text: "#4F4737" },
  2: { border: "#91B4CA", background: "#F1F6FA", accent: "#719AB5", text: "#33566B" },
  3: { border: "#99BDB8", background: "#F0F7F5", accent: "#6E9F96", text: "#345E57" },
  4: { border: "#A9C5B4", background: "#F4F8F5", accent: "#7CA88E", text: "#3E604D" },
  5: { border: "#D1AAA6", background: "#FBF3F2", accent: "#BC8580", text: "#72423E" },
  6: { border: "#99BDB8", background: "#F0F7F5", accent: "#6E9F96", text: "#345E57" },
  7: { border: "#C3CAD2", background: "#F5F6F8", accent: "#96A1AF", text: "#4B5563" },
  8: { border: "#91B4CA", background: "#F1F6FA", accent: "#719AB5", text: "#33566B" },
  9: { border: "#CDBD99", background: "#FAF8F1", accent: "#B39C68", text: "#4F4737" },
  10: { border: "#C3CAD2", background: "#F5F6F8", accent: "#96A1AF", text: "#4B5563" }
}, e1 = {
  1: { border: "#8B754D", background: "#3B3428", accent: "#D1B77A", text: "#F0E6D5" },
  2: { border: "#547C96", background: "#263B49", accent: "#78ACD9", text: "#DFEEF8" },
  3: { border: "#4D827A", background: "#24413E", accent: "#72C4B6", text: "#E0F5F1" },
  4: { border: "#5E9E75", background: "#2C4938", accent: "#77C79B", text: "#DBEDDF" },
  5: { border: "#A45C58", background: "#452C2F", accent: "#E47A73", text: "#F4DAD7" },
  6: { border: "#4D827A", background: "#24413E", accent: "#72C4B6", text: "#E0F5F1" },
  7: { border: "#536577", background: "#2A3541", accent: "#8FA2B5", text: "#D6E0E9" },
  8: { border: "#547C96", background: "#263B49", accent: "#78ACD9", text: "#DFEEF8" },
  9: { border: "#8B754D", background: "#3B3428", accent: "#D1B77A", text: "#F0E6D5" },
  10: { border: "#536577", background: "#2A3541", accent: "#8FA2B5", text: "#D6E0E9" }
}, Xp = {
  mode: "light",
  background: "#F0F3F7",
  panel: "#F8FAFC",
  surface: "#FFFFFF",
  surfaceSoft: "#F7F9FC",
  surfaceRaised: "#FFFFFF",
  text: "#1F2937",
  textSecondary: "#475569",
  muted: "#64748B",
  faint: "#94A3B8",
  border: "#D8E0E8",
  borderSoft: "#E8EDF3",
  primary: "#2F9EEB",
  primarySoft: "#E8F4FF",
  success: "#20C7B5",
  warn: "#F3B33D",
  danger: "#EF4444",
  info: "#3391E6",
  rowEven: "#FFFFFF",
  rowOdd: "#F8FAFC",
  rowActive: "#EFF7FD",
  gridBackground: "#F8FAFC",
  gridMinor: "#E7ECF2",
  gridMajor: "#C8D4E0",
  axisText: "#475569",
  axisMuted: "#64748B",
  axisLine: "#CBD5E1",
  currentTime: "#2F9EEB",
  scrollTrack: "#E2E8F0",
  scrollThumb: "#94A3B8",
  scrollThumbHover: "#64748B",
  ghostFill: "rgba(47,158,235,0.10)",
  ghostStroke: "#2F9EEB",
  taskText: "#34485E",
  taskMetaText: "#64748B",
  taskStatus: t1,
  outsideShift: {
    border: "#CCB19E",
    background: "#FAF5F0",
    accent: "#B28F70",
    text: "#5D4B3D"
  }
}, Kp = {
  mode: "dark",
  background: "#141C24",
  panel: "#1A242E",
  surface: "#202B36",
  surfaceSoft: "#1E2933",
  surfaceRaised: "#24313C",
  text: "#E2E9EF",
  textSecondary: "#B9C6D2",
  muted: "#91A3B3",
  faint: "#6E8090",
  border: "#394957",
  borderSoft: "rgba(187,204,220,0.13)",
  primary: "#5FC6D2",
  primarySoft: "#234851",
  success: "#77C79B",
  warn: "#E0B35F",
  danger: "#E47A73",
  info: "#78ACD9",
  rowEven: "#202B36",
  rowOdd: "#1E2933",
  rowActive: "#263E49",
  gridBackground: "#1D2731",
  gridMinor: "#34434F",
  gridMajor: "#465865",
  axisText: "#B9C6D2",
  axisMuted: "#7F91A3",
  axisLine: "#3C4C59",
  currentTime: "#5FC6D2",
  scrollTrack: "#30404D",
  scrollThumb: "#718392",
  scrollThumbHover: "#9DB0C0",
  ghostFill: "rgba(95,198,210,0.14)",
  ghostStroke: "#5FC6D2",
  taskText: "#E2EAF0",
  taskMetaText: "#A7B8C8",
  taskStatus: e1,
  outsideShift: {
    border: "#8F7766",
    background: "#3B3128",
    accent: "#C69D7C",
    text: "#EFE2D5"
  }
}, jp = "gantt-theme-mode", n1 = /* @__PURE__ */ new Set();
let Nn = null;
function i1(n) {
  return n === "light" || n === "dark";
}
function xo() {
  if (Nn) return Nn;
  if (typeof window != "undefined")
    try {
      const n = window.localStorage.getItem(jp);
      Nn = i1(n) ? n : "light";
    } catch (n) {
      Nn = "light";
    }
  else
    Nn = "light";
  return Nn;
}
function rt() {
  return xo() === "dark" ? Kp : Xp;
}
function Qp(n) {
  if (typeof document == "undefined") return;
  const t = n === "dark" ? Kp : Xp, e = document.documentElement;
  e.dataset.ganttTheme = n, e.style.colorScheme = n;
  const i = {
    "--gantt-bg": t.background,
    "--gantt-panel": t.panel,
    "--gantt-surface": t.surface,
    "--gantt-surface-soft": t.surfaceSoft,
    "--gantt-surface-raised": t.surfaceRaised,
    "--gantt-text": t.text,
    "--gantt-text-secondary": t.textSecondary,
    "--gantt-muted": t.muted,
    "--gantt-faint": t.faint,
    "--gantt-border": t.border,
    "--gantt-border-soft": t.borderSoft,
    "--gantt-primary": t.primary,
    "--gantt-primary-soft": t.primarySoft,
    "--gantt-success": t.success,
    "--gantt-warn": t.warn,
    "--gantt-danger": t.danger,
    "--gantt-info": t.info,
    "--gantt-row-even": t.rowEven,
    "--gantt-row-odd": t.rowOdd,
    "--gantt-row-active": t.rowActive,
    "--gantt-grid-bg": t.gridBackground,
    "--gantt-grid-minor": t.gridMinor,
    "--gantt-grid-major": t.gridMajor,
    "--gantt-axis-text": t.axisText,
    "--gantt-axis-muted": t.axisMuted,
    "--gantt-axis-line": t.axisLine,
    "--gantt-current-time": t.currentTime,
    "--gantt-scroll-track": t.scrollTrack,
    "--gantt-scroll-thumb": t.scrollThumb,
    "--gantt-scroll-thumb-hover": t.scrollThumbHover
  };
  for (const s in i)
    Object.prototype.hasOwnProperty.call(i, s) && e.style.setProperty(s, i[s]);
}
function s1(n) {
  if (Nn = n, typeof window != "undefined")
    try {
      window.localStorage.setItem(jp, n);
    } catch (t) {
    }
  Qp(n), n1.forEach((t) => t(n));
}
Qp(xo());
const $h = class $h extends Jt {
  constructor() {
    super(...arguments), this.type = "grid", this._horizontalLines = [];
  }
  render(t, e) {
    var h;
    const i = rt();
    this.group.removeAll(), this._horizontalLines = [];
    const s = t.coordinateSystem;
    if (!s) return;
    const r = s.getRect();
    this.group.setClipPath(
      new zrender.Rect({
        shape: {
          x: r.x,
          y: r.y,
          width: r.width,
          height: r.height
        }
      })
    );
    const o = (h = s.getCartesians()[0]) == null ? void 0 : h.getAxis("y");
    if (!o) return;
    const a = o.model.get("min"), c = o.model.get("max") - a;
    for (let u = 0; u < c; u++) {
      const f = o.toGlobalCoord(o.dataToCoord(a + u)), d = o.toGlobalCoord(o.dataToCoord(a + u + 1)), p = Math.min(f, d), _ = Math.abs(d - f), g = u % 2 === 0 ? i.rowEven : i.rowOdd;
      this.group.add(
        new zrender.Rect({
          shape: {
            x: r.x,
            y: p,
            width: r.width,
            height: _
          },
          style: {
            fill: g
          },
          z2: -1,
          silent: !0
        })
      );
    }
    for (let u = 0; u < c - 1; u++) {
      const f = a + u + 1, d = o.dataToCoord(f), p = o.toGlobalCoord(d), _ = new zrender.Line({
        shape: {
          x1: r.x,
          y1: p,
          x2: r.x + r.width,
          y2: p
        },
        style: {
          stroke: i.gridMinor,
          lineWidth: 1
        },
        z2: 0,
        silent: !0
      });
      this._horizontalLines.push(_), this.group.add(_);
    }
  }
};
$h.type = "grid";
let Zl = $h;
const La = {}, Uo = class Uo {
  constructor() {
    this._coordinateSystems = [];
  }
  create(t, e) {
    let i = [];
    D(La, function(s, r) {
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
Uo.register = function(t, e) {
  La[t] = e;
}, Uo.get = function(t) {
  return La[t];
};
let Us = Uo;
class rr {
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
pa(rr);
function r1(n, t) {
  return t[1] === t[0] ? 0.5 : (n - t[0]) / (t[1] - t[0]);
}
function o1(n) {
  return n.type === "interval";
}
function Du(n, t, e, i) {
  const s = {}, r = n[1] - n[0];
  let o = s.interval = Sp(r / t);
  e != null && o < e && (o = s.interval = e), i != null && o > i && (o = s.interval = i);
  const a = s.intervalPrecision = Jp(o), l = s.niceTickExtent = [
    Gl(Math.ceil(n[0] / o) * o, a),
    Gl(Math.floor(n[1] / o) * o, a)
  ];
  return a1(l, n), s;
}
function a1(n, t) {
  !isFinite(n[0]) && (n[0] = t[0]), !isFinite(n[1]) && (n[1] = t[1]), Iu(n, 0, t), Iu(n, 1, t), n[0] > n[1] && (n[0] = n[1]);
}
function Jp(n) {
  return vp(n) + 2;
}
function Iu(n, t, e) {
  n[t] = Math.max(Math.min(n[t], e[1]), e[0]);
}
const ti = Gl, Gh = class Gh extends rr {
  constructor() {
    super(...arguments), this.type = "interval", this._interval = 0, this._intervalPrecision = 2;
  }
  getTicks(t) {
    const e = this._interval, i = this._extent, s = this._niceExtent, r = this._intervalPrecision, o = [];
    if (!e)
      return o;
    const a = 1e4;
    i[0] < s[0] && (t ? o.push({
      value: ti(s[0] - e, r)
    }) : o.push({
      value: i[0]
    }));
    let l = s[0];
    for (; l <= s[1] && (o.push({
      value: l
    }), l = ti(l + e, r), l !== o[o.length - 1].value); )
      if (o.length > a)
        return [];
    const c = o.length ? o[o.length - 1].value : s[1];
    return i[1] > c && (t ? o.push({
      value: ti(c + e, r)
    }) : o.push({
      value: i[1]
    })), o;
  }
  getLabel(t, e) {
    if (t == null)
      return "";
    let i = e && e.precision;
    i == null ? i = vp(t.value) || 0 : i === "auto" && (i = this._intervalPrecision);
    const s = ti(t.value, i, !0);
    return oy(s);
  }
  calcTicks(t, e, i) {
    t = t || 5;
    const s = this._extent;
    let r = s[1] - s[0];
    if (!isFinite(r))
      return;
    r < 0 && (r = -r, s.reverse());
    const o = Du(
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
    t.fixMin || (e[0] = ti(Math.floor(e[0] / s) * s)), t.fixMax || (e[1] = ti(Math.ceil(e[1] / s) * s));
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
    const o = Du(
      s,
      t,
      e,
      i
    );
    this._intervalPrecision = o.intervalPrecision, this._interval = o.interval, this._niceExtent = o.niceTickExtent;
  }
  normalize(t) {
    return r1(t, this._extent);
  }
  setInterval(t) {
    this._interval = t, this._niceExtent = this._extent.slice(), this._intervalPrecision = Jp(t);
  }
};
Gh.type = "interval";
let qs = Gh;
rr.registerClass(qs);
const l1 = {
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
}, c1 = {
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
}, wo = "ZH", gh = "EN", So = gh, no = {}, _h = {}, tg = (function() {
  return /* eslint-disable-next-line */ (document.documentElement.lang || navigator.language || navigator.browserLanguage).toUpperCase().indexOf(wo) > -1 ? wo : So;
})();
function eg(n, t) {
  n = n.toUpperCase(), _h[n] = new Et(t), no[n] = t;
}
function h1(n) {
  return _h[n];
}
function u1() {
  return _h[So];
}
function f1(n) {
  if (Z(n)) {
    const t = no[n.toUpperCase()] || {};
    return n === wo || n === gh ? U(t) : dt(
      U(t),
      U(no[So]),
      !1
    );
  } else
    return dt(U(n), U(no[So]), !1);
}
eg(gh, l1);
eg(wo, c1);
const mh = 1e3, yh = mh * 60, xs = yh * 60, qt = xs * 24, Eu = qt * 365, cs = {
  year: "{yyyy}",
  month: "{MMM}",
  day: "{d}",
  hour: "{HH}:{mm}",
  minute: "{HH}:{mm}",
  second: "{HH}:{mm}:{ss}",
  millisecond: "{HH}:{mm}:{ss} {SSS}",
  none: "{yyyy}-{MM}-{dd} {HH}:{mm}:{ss} {SSS}"
}, mr = "{yyyy}-{MM}-{dd}", Ru = {
  year: "{yyyy}",
  month: "{yyyy}-{MM}",
  day: mr,
  hour: mr + " " + cs.hour,
  minute: mr + " " + cs.minute,
  second: mr + " " + cs.second,
  millisecond: cs.none
}, Oa = [
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
  "millisecond"
], ng = [
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
function We(n, t) {
  return n += "", "0000".substr(0, t - n.length) + n;
}
function xi(n) {
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
function d1(n) {
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
function p1(n, t, e, i, s) {
  let r = null;
  if (Z(e))
    r = e;
  else if (Q(e))
    r = e(n.value, t, {
      level: n.level
    });
  else {
    const o = N({}, cs);
    if (n.level > 0)
      for (let c = 0; c < Oa.length; ++c)
        o[Oa[c]] = `{primary|${o[Oa[c]]}}`;
    const a = e ? e.inherit === !1 ? e : xt(e, o) : o, l = ig(n.value, s);
    if (a[l])
      r = a[l];
    else if (a.inherit) {
      const c = ng.indexOf(l);
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
  return hg(new Date(n.value), r, s, i);
}
function g1(n) {
  return n === xi(n);
}
function Au(n, t, e) {
  const i = Te(n) ? Zn(n) : n;
  switch (t = t || ig(n, e), t) {
    case "year":
      return i[vh(e)]();
    case "half-year":
      return i[wi(e)]() >= 6 ? 1 : 0;
    case "quarter":
      return Math.floor((i[wi(e)]() + 1) / 4);
    case "month":
      return i[wi(e)]();
    case "day":
      return i[ba(e)]();
    case "half-day":
      return i[Zs(e)]() / 24;
    case "hour":
      return i[Zs(e)]();
    case "minute":
      return i[Ta(e)]();
    case "second":
      return i[Ma(e)]();
    case "millisecond":
      return i[Ca(e)]();
  }
}
function ig(n, t) {
  const e = Zn(n), i = e[wi(t)]() + 1, s = e[ba(t)](), r = e[Zs(t)](), o = e[Ta(t)](), a = e[Ma(t)](), c = e[Ca(t)]() === 0, h = c && a === 0, u = h && o === 0, f = u && r === 0, d = f && s === 1;
  return d && i === 1 ? "year" : d ? "month" : f ? "day" : u ? "hour" : h ? "minute" : c ? "second" : "millisecond";
}
function vh(n) {
  return n ? "getUTCFullYear" : "getFullYear";
}
function wi(n) {
  return n ? "getUTCMonth" : "getMonth";
}
function ba(n) {
  return n ? "getUTCDate" : "getDate";
}
function Zs(n) {
  return n ? "getUTCHours" : "getHours";
}
function Ta(n) {
  return n ? "getUTCMinutes" : "getMinutes";
}
function Ma(n) {
  return n ? "getUTCSeconds" : "getSeconds";
}
function Ca(n) {
  return n ? "getUTCMilliseconds" : "getMilliseconds";
}
function _1(n) {
  return n ? "setUTCFullYear" : "setFullYear";
}
function sg(n) {
  return n ? "setUTCMonth" : "setMonth";
}
function rg(n) {
  return n ? "setUTCDate" : "setDate";
}
function og(n) {
  return n ? "setUTCHours" : "setHours";
}
function ag(n) {
  return n ? "setUTCMinutes" : "setMinutes";
}
function lg(n) {
  return n ? "setUTCSeconds" : "setSeconds";
}
function cg(n) {
  return n ? "setUTCMilliseconds" : "setMilliseconds";
}
function hg(n, t, e, i) {
  const s = Zn(n), r = s[vh(e)](), o = s[wi(e)]() + 1, a = Math.floor((o - 1) / 3) + 1, l = s[ba(e)](), c = s["get" + (e ? "UTC" : "") + "Day"](), h = s[Zs(e)](), u = (h - 1) % 12 + 1, f = s[Ta(e)](), d = s[Ma(e)](), p = s[Ca(e)](), g = (i instanceof Et ? i : h1(i || tg) || u1()).getModel("time"), m = g.get("month"), y = g.get("monthAbbr"), v = g.get("dayOfWeek"), S = g.get("dayOfWeekAbbr");
  return (t || "").replace(/{yyyy}/g, r + "").replace(/{yy}/g, We(r % 100 + "", 2)).replace(/{Q}/g, a + "").replace(/{MMMM}/g, m[o - 1]).replace(/{MMM}/g, y[o - 1]).replace(/{MM}/g, We(o, 2)).replace(/{M}/g, o + "").replace(/{dd}/g, We(l, 2)).replace(/{d}/g, l + "").replace(/{eeee}/g, v[c]).replace(/{ee}/g, S[c]).replace(/{e}/g, c + "").replace(/{HH}/g, We(h, 2)).replace(/{H}/g, h + "").replace(/{hh}/g, We(u + "", 2)).replace(/{h}/g, u + "").replace(/{mm}/g, We(f, 2)).replace(/{m}/g, f + "").replace(/{ss}/g, We(d, 2)).replace(/{s}/g, d + "").replace(/{SSS}/g, We(p, 3)).replace(/{S}/g, p + "");
}
const m1 = function(n, t, e, i) {
  for (; e < i; ) {
    const s = e + i >>> 1;
    n[s][1] < t ? e = s + 1 : i = s;
  }
  return e;
}, Yh = class Yh extends qs {
  constructor(t) {
    super(t), this.type = "time";
  }
  parse(t) {
    return le(t) ? t : +Zn(t);
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
    const s = this.getSetting("useUTC"), r = T1(
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
    return hg(
      t.value,
      Ru[d1(
        xi(this._minLevelUnit)
      )] || Ru.second,
      e,
      this.getSetting("locale")
    );
  }
  getFormattedLabel(t, e, i) {
    const s = this.getSetting("useUTC"), r = this.getSetting("locale");
    return p1(t, e, i, r, s);
  }
  calcNiceExtent(t) {
    const e = this._extent;
    if (e[0] === e[1] && (e[0] -= qt, e[1] += qt), e[1] === -1 / 0 && e[0] === 1 / 0) {
      const i = /* @__PURE__ */ new Date();
      e[1] = +new Date(i.getFullYear(), i.getMonth(), i.getDate()), e[0] = e[1] - qt;
    }
    this.calcNiceTicks(t.splitNumber, t.minInterval, t.maxInterval);
  }
  calcNiceTicks(t, e, i) {
    t = t || 10;
    const s = this._extent, r = s[1] - s[0];
    this._approxInterval = r / t, e != null && this._approxInterval < e && (this._approxInterval = e), i != null && this._approxInterval > i && (this._approxInterval = i);
    const o = yr.length, a = Math.min(
      m1(yr, this._approxInterval, 0, o),
      o - 1
    );
    this._interval = yr[a][1], this._minLevelUnit = yr[Math.max(a - 1, 0)][0];
  }
};
Yh.type = "time";
let bo = Yh;
const yr = [
  // Format                           interval
  ["second", mh],
  // 1s
  ["minute", yh],
  // 1m
  ["hour", xs],
  // 1h
  ["quarter-day", xs * 6],
  // 6h
  ["half-day", xs * 12],
  // 12h
  ["day", qt * 1.2],
  // 1d
  ["half-week", qt * 3.5],
  // 3.5d
  ["week", qt * 7],
  // 7d
  ["month", qt * 31],
  // 1M
  ["quarter", qt * 95],
  // 3M
  ["half-year", Eu / 2],
  // 6M
  ["year", Eu]
  // 1Y
];
function y1(n, t, e, i) {
  const s = Zn(t), r = Zn(e), o = (p) => Au(s, p, i) === Au(r, p, i), a = () => o("year"), l = () => a() && o("month"), c = () => l() && o("day"), h = () => c() && o("hour"), u = () => h() && o("minute"), f = () => u() && o("second"), d = () => f() && o("millisecond");
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
function v1(n, t) {
  return n /= qt, n > 16 ? 16 : (
    // Math.floor(daysInMonth / 2) + 1  // In this case we only want one tick between two months.
    n > 7.5 ? 7 : n > 3.5 ? 4 : n > 1.5 ? 2 : 1
  );
}
function x1(n) {
  const t = 30 * qt;
  return n /= t, n > 6 ? 6 : n > 3 ? 3 : n > 2 ? 2 : 1;
}
function w1(n) {
  return n /= xs, n > 12 ? 12 : n > 6 ? 6 : n > 3.5 ? 4 : n > 2 ? 2 : 1;
}
function ku(n, t) {
  return n /= t ? yh : mh, n > 30 ? 30 : n >= 20 ? 20 : n > 15 ? 15 : n >= 10 ? 10 : n > 5 ? 5 : n > 2 ? 2 : 1;
}
function S1(n) {
  return Sp(n);
}
function b1(n, t, e) {
  const i = new Date(n);
  switch (xi(t)) {
    case "year":
    case "month":
      i[sg(e)](0);
    case "day":
      i[rg(e)](1);
    case "hour":
      i[og(e)](0);
    case "minute":
      i[ag(e)](0);
    case "second":
      i[lg(e)](0), i[cg(e)](0);
  }
  return i.getTime();
}
function T1(n, t, e, i) {
  const r = ng;
  let o = 0;
  function a(m, y, v, S, w, x, M) {
    const T = new Date(y);
    let b = y, I = T[S]();
    for (; b < v && b <= i[1]; )
      M.push({
        value: b
      }), I += m, T[w](I), b = T.getTime();
    M.push({
      value: b,
      notAdd: !0
    });
  }
  function l(m, y, v) {
    const S = [], w = !y.length;
    if (!y1(xi(m), i[0], i[1], e)) {
      w && (y = [
        {
          // TODO Optimize. Not include so may ticks.
          value: b1(new Date(i[0]), m, e)
        },
        {
          value: i[1]
        }
      ]);
      for (let x = 0; x < y.length - 1; x++) {
        const M = y[x].value, T = y[x + 1].value;
        if (M === T)
          continue;
        let b, I, C, E = !1;
        switch (m) {
          case "year":
            b = Math.max(1, Math.round(t / qt / 365)), I = vh(e), C = _1(e);
            break;
          case "half-year":
          case "quarter":
          case "month":
            b = x1(t), I = wi(e), C = sg(e);
            break;
          case "week":
          // PENDING If week is added. Ignore day.
          case "half-week":
          case "day":
            b = v1(t), I = ba(e), C = rg(e), E = !0;
            break;
          case "half-day":
          case "quarter-day":
          case "hour":
            b = w1(t), I = Zs(e), C = og(e);
            break;
          case "minute":
            b = ku(t, !0), I = Ta(e), C = ag(e);
            break;
          case "second":
            b = ku(t, !1), I = Ma(e), C = lg(e);
            break;
          case "millisecond":
            b = S1(t), I = Ca(e), C = cg(e);
            break;
        }
        a(
          b,
          M,
          T,
          I,
          C,
          E,
          S
        ), m === "year" && v.length > 1 && x === 0 && v.unshift({
          value: v[0].value - b
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
    const y = xi(r[m]);
    if (!g1(r[m]))
      continue;
    l(
      r[m],
      c[c.length - 1] || [],
      h
    );
    const v = r[m + 1] ? xi(r[m + 1]) : null;
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
  const d = _o(
    ce(c, (m) => _o(
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
rr.registerClass(bo);
const M1 = pt();
class ug {
  constructor(t) {
    this.dimensions = t.dimensions, this._dimOmitted = t.dimensionOmitted, this.source = t.source, this._fullDimCount = t.fullDimensionCount, this._updateDimOmitted(t.dimensionOmitted);
  }
  _updateDimOmitted(t) {
    this._dimOmitted = t, t && (this._dimNameMap || (this._dimNameMap = pg(this.source)));
  }
  getSourceDimension(t) {
    const e = this.source.dimensionsDefine;
    if (e)
      return e[t];
  }
  getSourceDimensionIndex(t) {
    return oe(this._dimNameMap.get(t), -1);
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
function fg(n) {
  return n instanceof ug;
}
function dg(n) {
  const t = B();
  for (let e = 0; e < (n || []).length; e++) {
    const i = n[e], s = F(i) ? i.name : i;
    s != null && t.get(s) == null && t.set(s, e);
  }
  return t;
}
function pg(n) {
  const t = M1(n);
  return t.dimNameMap || (t.dimNameMap = dg(n.dimensionsDefine));
}
function C1(n) {
  return n > 30;
}
function D1(n, t) {
  return !!t && t === n.getCalculationInfo("stackedDimension");
}
function I1(n, t) {
  return D1(n, t) ? n.getCalculationInfo("stackResultDimension") : t;
}
function E1(n, t, e) {
  e = e || {};
  let i = e.byIndex;
  const s = e.stackedCoordDimension;
  let r, o, a;
  R1(t) ? r = t : (o = t.schema, r = o.dimensions, a = t.store);
  const l = !!(n && n.get("stack"));
  let c, h, u, f;
  if (nt(r, function(d, p) {
    Kt(d) && (r[p] = d = {
      name: d
    }), l && !d.isExtraCoord && (!i && !c && d.ordinalMeta && (c = d), !h && d.type !== "ordinal" && d.type !== "time" && (!s || s === d.coordDim) && (h = d));
  }), h && !i && !c && (i = !0), h) {
    u = "__\0pistackresult_" + n.id, f = "__\0pistackedover_" + n.id, c && (c.createInvertedIndices = !0);
    const d = h.coordDim, p = h.type;
    let _ = 0;
    nt(r, function(y) {
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
function R1(n) {
  return !fg(
    n.schema
  );
}
let gg = class {
  constructor(t) {
    this.value = t;
  }
}, A1 = class {
  constructor() {
    this._len = 0;
  }
  /**
   * Insert a new value at the tail
   */
  insert(t) {
    const e = new gg(t);
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
}, or = class {
  constructor(t) {
    this._list = new A1(), this._maxSize = 10, this._map = {}, this._maxSize = t;
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
      a ? a.value = e : a = new gg(e), a.key = t, i.insertEntry(a), s[t] = a;
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
}, Pu = {};
function _g(n, t) {
  t = t || zs;
  let e = Pu[t];
  e || (e = Pu[t] = new or(500));
  let i = e.get(n);
  return i == null && (i = Jc.measureText(n, t).width, e.put(n, i)), i;
}
function Lu(n, t, e, i) {
  const s = _g(n, t), r = L1(t), o = k1(0, s, e), a = P1(0, r, i);
  return new Dt(o, a, s, r);
}
function mg(n, t, e, i) {
  const s = ((n || "") + "").split(`
`);
  if (s.length === 1)
    return Lu(s[0], t, e, i);
  {
    const o = new Dt(0, 0, 0, 0);
    for (let a = 0; a < s.length; a++) {
      const l = Lu(s[a], t, e, i);
      a === 0 ? o.copy(l) : o.union(l);
    }
    return o;
  }
}
function k1(n, t, e) {
  return e === "right" ? n -= t : e === "center" && (n -= t / 2), n;
}
function P1(n, t, e) {
  return e === "middle" ? n -= t / 2 : e === "bottom" && (n -= t), n;
}
function L1(n) {
  return _g("国", n);
}
function ln(n, t) {
  return typeof n == "string" ? n.lastIndexOf("%") >= 0 ? parseFloat(n) / 100 * t : parseFloat(n) : n;
}
function O1(n, t, e) {
  const i = t.position || "inside", s = t.distance != null ? t.distance : 5, r = e.height, o = e.width, a = r / 2;
  let l = e.x, c = e.y, h = "left", u = "top";
  if (i instanceof Array)
    l += ln(i[0], e.width), c += ln(i[1], e.height), h = null, u = null;
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
class F1 {
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
    Q(r) ? this._modelMinNum = vr(
      t,
      r({
        min: i[0],
        max: i[1]
      })
    ) : r !== "dataMin" && (this._modelMinNum = vr(t, r));
    const o = this._modelMaxRaw = e.get("max", !0);
    if (Q(o) ? this._modelMaxNum = vr(
      t,
      o({
        min: i[0],
        max: i[1]
      })
    ) : o !== "dataMax" && (this._modelMaxNum = vr(t, o)), s)
      this._axisDataLen = e.getCategories().length;
    else {
      const a = e.get(
        "boundaryGap"
      ), l = K(a) ? a : [a || 0, a || 0];
      typeof l[0] == "boolean" || typeof l[1] == "boolean" ? this._boundaryGapInner = [0, 0] : this._boundaryGapInner = [
        ln(l[0], 1),
        ln(l[1], 1)
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
    const u = Hs(a) || Hs(l) || t && !s;
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
    this[N1[t]] = e;
  }
  setDeterminedMinMax(t, e) {
    const i = B1[t];
    this[i] = e;
  }
  freeze() {
    this.frozen = !0;
  }
}
const B1 = {
  min: "_determinedMin",
  max: "_determinedMax"
}, N1 = { min: "_dataMin", max: "_dataMax" };
function yg(n, t, e) {
  let i = n.rawExtentInfo;
  return i || (i = new F1(n, t, e), n.rawExtentInfo = i, i);
}
function vr(n, t) {
  return t == null ? null : Hs(t) ? NaN : n.parse(t);
}
function z1(n, t) {
  const e = [];
  return t.eachSeriesByType(n, function(i) {
    H1(i) && e.push(i);
  }), e;
}
function H1(n) {
  return n.coordinateSystem && n.coordinateSystem.type === "cartesian2d";
}
function $1(n, t) {
  if (t = t || n.get("type"), !!t)
    return t === "time" ? new bo({
      locale: n.piModel.getLocaleModel(),
      useUTC: !1
    }) : new (rr.getClass(t) || qs)();
}
function vg(n, t) {
  const e = {};
  return D(n.mapDimensionsAll(t), function(i) {
    e[I1(n, i)] = !0;
  }), tt(e);
}
function G1(n, t) {
  const e = n.type, i = yg(
    n,
    t,
    n.getExtent()
  ).calculate();
  n.setBlank(i.isBlank);
  let s = i.min, r = i.max;
  const o = t.piModel;
  if (o && e === "time") {
    const a = z1("bar", o);
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
function Y1(n, t) {
  const e = t, i = G1(n, e), s = i.extent, r = e.get("splitNumber"), o = n.type, a = e.get("interval"), l = o === "interval" || o === "time";
  n.setExtent(s[0], s[1]), n.calcNiceExtent({
    splitNumber: r,
    fixMin: i.fixMin,
    fixMax: i.fixMax,
    minInterval: l ? e.get("minInterval") : null,
    maxInterval: l ? e.get("maxInterval") : null
  }), a != null && n.setInterval && n.setInterval(a);
}
function V1(n, t, e) {
  t && D(vg(t, e), function(i) {
    const s = t.getApproximateExtent(i);
    s[0] < n[0] && (n[0] = s[0]), s[1] > n[1] && (n[1] = s[1]);
  });
}
function Da(n) {
  const t = n.getLabelModel().get("formatter"), e = n.type === "category" ? n.scale.getExtent()[0] : null;
  return n.scale.type === "time" ? /* @__PURE__ */ (function(i) {
    return function(s, r) {
      return n.scale.getFormattedLabel(s, r, i);
    };
  })(t) : Z(t) ? /* @__PURE__ */ (function(i) {
    return function(s) {
      const r = n.scale.getLabel(s);
      return i.replace("{value}", r != null ? r : "");
    };
  })(t) : Q(t) ? /* @__PURE__ */ (function(i) {
    return function(s, r) {
      return e != null && (r = s.value - e), i(
        W1(n, s),
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
function xg(n) {
  const t = n.get(
    "interval"
  );
  return t == null ? "auto" : t;
}
function W1(n, t) {
  return n.type === "category" ? n.scale.getLabel(t) : t.value;
}
function wg(n) {
  return n.type === "category" && xg(n.getLabelModel()) === 0;
}
const Xs = pt();
function U1(n, t) {
  return { ticks: G(n.scale.getTicks(), (e) => e.value) };
}
function q1(n) {
  return n.type === "category" ? Z1(n) : j1(n);
}
function Z1(n) {
  const t = n.getLabelModel(), e = X1(n, t);
  return !t.get("show") || n.scale.isBlank() ? { labels: [], labelCategoryInterval: e.labelCategoryInterval } : e;
}
function X1(n, t) {
  const e = Q1(n, "labels"), i = xg(t), s = J1(e, i);
  if (s)
    return s;
  let r, o;
  return Q(i) ? r = nv(n, i) : (o = i === "auto" ? K1(n) : i, r = ev(n, o)), tv(e, i, {
    labels: r,
    labelCategoryInterval: o
  });
}
function K1(n) {
  const t = Xs(n).autoInterval;
  return t != null ? t : Xs(n).autoInterval = n.calculateCategoryInterval();
}
function j1(n) {
  const t = n.scale.getTicks(), e = Da(n);
  return {
    labels: G(t, function(i, s) {
      return {
        level: i.level,
        formattedLabel: e(i, s),
        rawLabel: n.scale.getLabel(i),
        tickValue: i.value
      };
    })
  };
}
function Q1(n, t) {
  return Xs(n)[t] || (Xs(n)[t] = []);
}
function J1(n, t) {
  for (let e = 0; e < n.length; e++)
    if (n[e].key === t)
      return n[e].value;
}
function tv(n, t, e) {
  return n.push({ key: t, value: e }), e;
}
function ev(n, t, e) {
  const i = Da(n), s = n.scale, r = s.getExtent(), o = n.getLabelModel(), a = [], l = Math.max((t || 0) + 1, 1);
  let c = r[0];
  const h = s.count();
  c !== 0 && l > 1 && h / l > 2 && (c = Math.round(Math.ceil(c / l) * l));
  const u = wg(n), f = o.get("showMinLabel") || u, d = o.get("showMaxLabel") || u;
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
function nv(n, t, e) {
  const i = n.scale, s = Da(n), r = [];
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
function iv(n) {
  const t = sv(n), e = Da(n), i = (t.axisRotate - t.labelRotate) / 180 * Math.PI, s = n.scale, r = s.getExtent(), o = s.count();
  if (r[1] - r[0] < 1)
    return 0;
  let a = 1;
  o > 40 && (a = Math.max(1, Math.floor(o / 40)));
  let l = r[0];
  const c = n.dataToCoord(l + 1) - n.dataToCoord(l), h = Math.abs(c * Math.cos(i)), u = Math.abs(c * Math.sin(i));
  let f = 0, d = 0;
  for (; l <= r[1]; l += a) {
    let w = 0, x = 0;
    const M = mg(
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
  const m = Xs(n.model), y = n.getExtent(), v = m.lastAutoInterval, S = m.lastTickCount;
  return v != null && S != null && Math.abs(v - g) <= 1 && Math.abs(S - o) <= 1 && // Always choose the bigger one, otherwise the critical
  // point is not the same when zooming in or zooming out.
  v > g && // If the axis change is caused by chart resize, the cache should not
  // be used. Otherwise some hidden labels might not be shown again.
  m.axisExtent0 === y[0] && m.axisExtent1 === y[1] ? g = v : (m.lastTickCount = o, m.lastAutoInterval = g, m.axisExtent0 = y[0], m.axisExtent1 = y[1]), g;
}
function sv(n) {
  const t = n.getLabelModel();
  return {
    axisRotate: n.getRotate ? n.getRotate() : n.isHorizontal && !n.isHorizontal() ? 90 : 0,
    labelRotate: t.get("rotate") || 0,
    font: t.getFont()
  };
}
const rv = [0, 1];
class ov {
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
    return xp(t || this.scale.getExtent(), this._extent);
  }
  /**
   * Convert data to coord. Data is the rank if it has an ordinal scale
   */
  dataToCoord(t, e) {
    let i = this._extent;
    const s = this.scale;
    return t = s.normalize(t), this.onBand && s.type === "ordinal" && (i = i.slice(), av(i, s.count())), lt(t, rv, i, e);
  }
  getTicksCoords(t) {
    t = t || {};
    const e = t.tickModel || this.getTickModel(), s = U1(this).ticks, r = ce(
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
    return q1(this).labels;
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
    return iv(this);
  }
}
function av(n, t) {
  const s = (n[1] - n[0]) / t / 2;
  n[0] += s, n[1] -= s;
}
class lv extends ov {
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
class cv {
  constructor(t) {
    this.type = "cartesian", this._dimList = [], this._axes = {}, this.name = t || " ";
  }
  getAxis(t) {
    return this._axes[t];
  }
  getAxes() {
    return G(
      this._dimList,
      function(t) {
        return this._axes[t];
      },
      this
    );
  }
  getAxesByScale(t) {
    return t = t.toLowerCase(), re(this.getAxes(), function(e) {
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
function hv(n, t) {
  return (n[0] - t[0]) * (n[0] - t[0]) + (n[1] - t[1]) * (n[1] - t[1]);
}
var Si = hv;
function Me(n, t, e) {
  var i = t[0], s = t[1];
  return n[0] = e[0] * i + e[2] * s + e[4], n[1] = e[1] * i + e[3] * s + e[5], n;
}
function Sg(n, t, e) {
  return n[0] = Math.min(t[0], e[0]), n[1] = Math.min(t[1], e[1]), n;
}
function bg(n, t, e) {
  return n[0] = Math.max(t[0], e[0]), n[1] = Math.max(t[1], e[1]), n;
}
const uv = ["x", "y"];
class fv extends cv {
  constructor() {
    super(...arguments), this.type = "cartesian2d", this.dimensions = uv;
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
      return Me(i, t, this._transform);
    const o = this.getAxis("x"), a = this.getAxis("y");
    return i[0] = o.toGlobalCoord(o.dataToCoord(s, e)), i[1] = a.toGlobalCoord(a.dataToCoord(r, e)), i;
  }
  getOtherAxis(t) {
    return this.getAxis(t.dim === "x" ? "y" : "x");
  }
}
function Ou(n) {
  return n.get("coordinateSystem") === "cartesian2d";
}
function Fu(n) {
  const t = {
    xAxisModel: null,
    yAxisModel: null
  };
  return D(t, function(e, i) {
    const s = i.replace(/Model$/, ""), r = n.getReferringComponents(
      s,
      De
    ).models[0];
    t[i] = r;
  }), t;
}
function dv(n, t, e) {
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
  r.labelDirection = r.tickDirection = r.nameDirection = _[a], r.labelOffset = o ? p[f[a]] - p[f.onZero] : 0, t.get(["axisTick", "inside"]) && (r.tickDirection = -r.tickDirection), $l(e.labelInside, t.get(["axisLabel", "inside"])) && (r.labelDirection = -r.labelDirection);
  const g = t.get(["axisLabel", "rotate"]);
  return r.labelRotate = l === "top" ? -g : g, r.z2 = 1, r;
}
class xh {
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
        const d = "x" + h + "y" + f, p = new fv(d);
        p.master = this, p.model = t, this._coordsMap[d] = p, this._coordsList.push(p), p.addAxis(c), p.addAxis(u);
      });
    });
    function l(c) {
      return function(h, u) {
        if (!Fa(h, t))
          return;
        let f = h.get("position");
        c === "x" ? f !== "top" && f !== "bottom" && (f = r.bottom ? "top" : "bottom") : f !== "left" && f !== "right" && (f = r.left ? "right" : "left"), r[f] = !0;
        const d = new lv(
          c,
          $1(h),
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
      if (Ou(s)) {
        const r = Fu(s), o = r.xAxisModel, a = r.yAxisModel;
        if (!Fa(o, e) || !Fa(a, e))
          return;
        const l = this.getCartesian(
          o.componentIndex,
          a.componentIndex
        ), c = s.getData(), h = l.getAxis("x"), u = l.getAxis("y");
        i(c, h), i(c, u);
      }
    }, this);
    function i(s, r) {
      D(vg(s, r.dim), function(o) {
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
          Y1(d, f);
        }
    }
    s(i.x), s(i.y);
    const r = {};
    D(i.x, function(o) {
      Bu(i, "y", o, r);
    }), D(i.y, function(o) {
      Bu(i, "x", o, r);
    }), this.resize(this.model, e);
  }
  resize(t, e, i) {
    const s = t.getBoxLayoutParams();
    !i && t.get("containLabel");
    const r = Vs(s, {
      width: e.getWidth(),
      height: e.getHeight()
    });
    this._rect = r;
    const o = this._axesList;
    a();
    function a() {
      D(o, function(l) {
        const c = l.isHorizontal(), h = c ? [0, r.width] : [0, r.height], u = l.inverse ? 1 : 0;
        l.setExtent(h[u], h[1 - u]), pv(l, c ? r.x : r.y);
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
    ae(t) && (e = t.yAxisIndex, t = t.xAxisIndex);
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
      const o = new xh(s, t, e);
      o.name = "grid_" + r, o.resize(s, e, !0), s.coordinateSystem = o, i.push(o);
    }), t.eachSeries(function(s) {
      if (!Ou(s))
        return;
      const r = Fu(s), o = r.xAxisModel, a = r.yAxisModel, c = o.getCoordSysModel().coordinateSystem;
      s.coordinateSystem = c.getCartesian(
        o.componentIndex,
        a.componentIndex
      );
    }), i;
  }
}
function Fa(n, t) {
  return n.getCoordSysModel() === t;
}
function pv(n, t) {
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
function gv(n) {
  const t = n.scale.getExtent(), e = t[0], i = t[1];
  return !(e > 0 && i > 0 || e < 0 && i < 0);
}
function Bu(n, t, e, i) {
  e.getAxesOnZeroOf = function() {
    return r ? [r] : [];
  };
  const s = n[t];
  let r;
  const o = e.model, a = o.get(["axisLine", "onZero"]), l = o.get(["axisLine", "onZeroAxisIndex"]);
  if (!a)
    return;
  if (l != null)
    Nu(s[l]) && (r = s[l]);
  else
    for (const h in s)
      if (s.hasOwnProperty(h) && Nu(s[h]) && // Consider that two Y axes on one value axis,
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
function Nu(n) {
  return n && n.type !== "category" && n.type !== "time" && gv(n);
}
let _v = "";
const mv = {
  textStyle: {
    fontFamily: _v.match(/^Win/) ? "Microsoft YaHei" : "sans-serif",
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
}, yv = B();
function vv(n, t, e) {
  const i = yv.get(t);
  if (!i)
    return e;
  const s = i(n);
  return s ? e.concat(s) : e;
}
let Ba, zu;
const xv = "\0_pi_inner", Vh = class Vh extends Et {
  /**
   * 初始化
   * @param optionManager 配置项处理器
   */
  init(t, e, i, s, r) {
    this.option = null, this._locale = new Et(s), this._optionManager = r;
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
      (!this.option || t == "recreate") && zu(this, s), e = !0;
    }
    return e;
  }
  restoreData(t) {
    Ba(this);
    const e = this._componentsMap, i = [];
    e.each(function(s, r) {
      W.hasClass(r) && i.push(r);
    }), W.topologicalTravel(
      i,
      W.getAllClassMainTypes(),
      function(s) {
        D(e.get(s), function(r) {
          r && (s !== "series" || !wv(r, t)) && r.restoreData();
        });
      }
    );
  }
  mergeOption(t) {
    this._mergeOption(t, null);
  }
  _mergeOption(t, e) {
    const i = this.option, s = this._componentsMap, r = this._componentsCount, o = [], a = B(), l = e == null ? void 0 : e.replaceMergeMainTypeMap;
    D(t, function(h, u) {
      h && (W.hasClass(u) ? u && (o.push(u), a.set(u, !0)) : i[u] = i[u] ? U(h) : dt(i[u], h, !0));
    }), W.topologicalTravel(
      o,
      W.getAllClassMainTypes(),
      c,
      this
    );
    function c(h) {
      const u = vv(
        this,
        h,
        Xt(t[h])
      ), f = s.get(h), d = (
        // `!oldCmptList` means init. See the comment in `mappingToExists`
        f ? l && l.get(h) ? "replaceMerge" : "normalMerge" : "replaceAll"
      ), p = nm(
        f,
        u,
        d
      );
      cm(
        p,
        h,
        W
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
            const M = h === "series", T = W.getClass(
              h,
              v.keyInfo.subType,
              !M
              // Give a more detailed warn later if series don't exists
            );
            if (!T)
              return;
            if (h === "tooltip") {
              if (y)
                return;
              y = !0;
            }
            if (w && w.constructor === T)
              w.name = v.keyInfo.name, w.mergeOption(x, this), w.optionUpdated(x, !1);
            else {
              const b = N(
                {
                  componentIndex: S
                },
                v.keyInfo
              );
              w = new T(
                x,
                this,
                this,
                b
              ), N(w, b), v.brandNew && (w.__requireNewView = !0), w.init(x, this, this), w.optionUpdated(null, !0);
            }
          }
          w ? (_.push(w.option), g.push(w), m++) : (_.push(void 0), g.push(void 0));
        },
        this
      ), i[h] = _, s.set(h, g), r.set(h, m), h === "series" && Ba(this);
    }
  }
  /**
   * Get option for output (cloned option and inner info removed)
   */
  getOption() {
    const t = U(this.option);
    return D(t, function(e, i) {
      if (W.hasClass(i)) {
        const s = Xt(e);
        let r = s.length, o = !1;
        for (let a = r - 1; a >= 0; a--)
          s[a] && !$s(s[a]) ? o = !0 : (s[a] = null, !o && r--);
        s.length = r, t[i] = s;
      }
    }), delete t[xv], t;
  }
  getSeriesByType(t) {
    return re(
      this._componentsMap.get("series"),
      (e) => !!e && e.subType === t
    );
  }
  getSeriesByIndex(t) {
    return this._componentsMap.get("series")[t];
  }
  getSeries() {
    return re(
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
    return i != null ? (a = [], D(Xt(i), function(l) {
      o[l] && a.push(o[l]);
    })) : s != null ? a = Hu("id", s, o) : r != null ? a = Hu("name", r, o) : a = re(o, (l) => !!l), $u(a, t);
  }
  findComponents(t) {
    const e = t.query, i = t.mainType, s = o(e), r = s ? this.queryComponents(s) : (
      // Retrieve all non-empty components.
      re(this._componentsMap.get(i), (l) => !!l)
    );
    return a($u(r, t));
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
      return t.filter ? re(l, t.filter) : l;
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
      const r = Z(t) ? s.get(t) : F(t) ? this.findComponents(t) : null;
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
Vh.internalField = (function() {
  Ba = function(t) {
    const e = t._seriesIndices = [];
    D(t._componentsMap.get("series"), function(i) {
      i && e.push(i.componentIndex);
    }), t._seriesIndicesMap = B(e);
  }, zu = function(t, e) {
    t.option = {}, t._componentsMap = B({ series: [] }), t._componentsCount = B(), dt(e, mv, !1), t._mergeOption(e, null);
  };
})();
let To = Vh;
function Hu(n, t, e) {
  if (K(t)) {
    const i = B();
    return D(t, function(s) {
      s != null && He(s, null) != null && i.set(s, !0);
    }), re(e, (s) => s && i.get(s[n]));
  } else {
    const i = He(t, null);
    return re(
      e,
      (s) => s && i != null && s[n] === i
    );
  }
}
function $u(n, t) {
  return t.hasOwnProperty("subType") ? re(n, (e) => e && e.subType === t.subType) : n;
}
function wv(n, t) {
  if (t) {
    const e = t.seriesIndex, i = t.seriesId, s = t.seriesName;
    return e != null && n.componentIndex !== e || i != null && n.id !== i || s != null && n.name !== s;
  }
}
class Sv {
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
class bv {
  /**
   * 对外部参数进行格式化，适合内部使用
   * @param rawOption 原始参数
   */
  setOption(t) {
    t = U(t);
    const e = this._optionBackup, i = Tv(t);
    this._newBaseOption = i.baseOption, e || (this._optionBackup = i);
  }
  mountOption(t) {
    const e = this._optionBackup;
    return U(t ? e.baseOption : this._newBaseOption);
  }
}
function Tv(n, t) {
  let e;
  const i = n.baseOption;
  return i ? e = i : e = n, {
    baseOption: e
  };
}
const qo = class qo extends W {
};
qo.type = "grid", qo.defaultOption = {
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
let Xl = qo;
const Zo = class Zo extends Jt {
  constructor() {
    super(...arguments), this.type = Zo.type;
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
Zo.type = "title";
let Kl = Zo;
const Es = class Es extends W {
  constructor() {
    super(...arguments), this.type = Es.type;
  }
};
Es.type = "title", Es.defaultOption = {
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
let jl = Es;
function Mv(n) {
  n.registerComponentModel(jl), n.registerComponentView(Kl);
}
function Cv(n) {
  n.registerAction({
    type: "updateXAxisPosition"
  }, function(t, e, i) {
    var r;
    ((r = t.data) == null ? void 0 : r.y) != null && i.getZr().refresh();
  });
}
let Na = null;
function Dv(n) {
  n.registerAction({
    type: "updateYAxisPosition",
    update: "none"
  }, function(t, e, i) {
    var r;
    const s = (r = t.data) == null ? void 0 : r.x;
    s != null && (e.eachComponent("grid", function(o) {
      const a = o.coordinateSystem;
      if (!a) return;
      if (Na === null) {
        const c = a.getRect();
        Na = c.x + c.width;
      }
      const l = Na;
      o.option.left = s, o.option.width = l - s, o.option.right = void 0, a.resize(o, i, !0);
    }), i.getZr().refresh());
  });
}
let Gu = !1;
function Iv(n) {
  Gu || (Gu = !0, Cv(n), Dv(n));
}
const Xo = class Xo extends Jt {
  constructor() {
    super(...arguments), this.type = Xo.type;
  }
  render(t, e, i) {
    this.group.removeAll(), this.splitModel = t, this.api = i;
  }
};
Xo.type = "split";
let Ql = Xo;
ie.browser.firefox && +ie.browser.version.split(".")[0] < 39;
const Nt = function(n) {
  n.preventDefault(), n.stopPropagation(), n.cancelBubble = !0;
};
function Yu(n) {
  return n.which === 2 || n.which === 3;
}
var Jl = function(n, t) {
  return Jl = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, i) {
    e.__proto__ = i;
  } || function(e, i) {
    for (var s in i) Object.prototype.hasOwnProperty.call(i, s) && (e[s] = i[s]);
  }, Jl(n, t);
};
function Kn(n, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
  Jl(n, t);
  function e() {
    this.constructor = n;
  }
  n.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
}
function Mo() {
  return [1, 0, 0, 1, 0, 0];
}
function Ev(n) {
  return n[0] = 1, n[1] = 0, n[2] = 0, n[3] = 1, n[4] = 0, n[5] = 0, n;
}
function Rv(n, t) {
  return n[0] = t[0], n[1] = t[1], n[2] = t[2], n[3] = t[3], n[4] = t[4], n[5] = t[5], n;
}
function za(n, t, e) {
  var i = t[0] * e[0] + t[2] * e[1], s = t[1] * e[0] + t[3] * e[1], r = t[0] * e[2] + t[2] * e[3], o = t[1] * e[2] + t[3] * e[3], a = t[0] * e[4] + t[2] * e[5] + t[4], l = t[1] * e[4] + t[3] * e[5] + t[5];
  return n[0] = i, n[1] = s, n[2] = r, n[3] = o, n[4] = a, n[5] = l, n;
}
function Vu(n, t, e) {
  return n[0] = t[0], n[1] = t[1], n[2] = t[2], n[3] = t[3], n[4] = t[4] + e[0], n[5] = t[5] + e[1], n;
}
function Av(n, t, e) {
  var i = t[0], s = t[2], r = t[4], o = t[1], a = t[3], l = t[5], c = Math.sin(e), h = Math.cos(e);
  return n[0] = i * h + o * c, n[1] = -i * c + o * h, n[2] = s * h + a * c, n[3] = -s * c + h * a, n[4] = h * r + c * l, n[5] = h * l - c * r, n;
}
function kv(n, t, e) {
  var i = e[0], s = e[1];
  return n[0] = t[0] * i, n[1] = t[1] * s, n[2] = t[2] * i, n[3] = t[3] * s, n[4] = t[4] * i, n[5] = t[5] * s, n;
}
function Pv(n, t) {
  var e = t[0], i = t[2], s = t[4], r = t[1], o = t[3], a = t[5], l = e * o - r * i;
  return l ? (l = 1 / l, n[0] = o * l, n[1] = -r * l, n[2] = -i * l, n[3] = e * l, n[4] = (i * a - o * s) * l, n[5] = (r * s - e * a) * l, n) : null;
}
var Wu = Ev, Uu = 5e-5;
function gn(n) {
  return n > Uu || n < -Uu;
}
var _n = [], ei = [], Ha = Mo(), $a = Math.abs, wh = (function() {
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
    return gn(this.rotation) || gn(this.x) || gn(this.y) || gn(this.scaleX - 1) || gn(this.scaleY - 1) || gn(this.skewX) || gn(this.skewY);
  }, n.prototype.updateTransform = function() {
    var t = this.parent && this.parent.transform, e = this.needLocalTransform(), i = this.transform;
    if (!(e || t)) {
      i && Wu(i);
      return;
    }
    i = i || Mo(), e ? this.getLocalTransform(i) : Wu(i), t && (e ? za(i, t, i) : Rv(i, t)), this.transform = i, this._resolveGlobalScaleRatio(i);
  }, n.prototype._resolveGlobalScaleRatio = function(t) {
    var e = this.globalScaleRatio;
    if (e != null && e !== 1) {
      this.getGlobalScale(_n);
      var i = _n[0] < 0 ? -1 : 1, s = _n[1] < 0 ? -1 : 1, r = ((_n[0] - i) * e + i) / _n[0] || 0, o = ((_n[1] - s) * e + s) / _n[1] || 0;
      t[0] *= r, t[1] *= r, t[2] *= o, t[3] *= o;
    }
    this.invTransform = this.invTransform || Mo(), Pv(this.invTransform, t);
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
      t && t.transform && (za(ei, t.invTransform, e), e = ei);
      var i = this.originX, s = this.originY;
      (i || s) && (Ha[4] = i, Ha[5] = s, za(ei, e, Ha), ei[4] -= i, ei[5] -= s, e = ei), this.setLocalTransform(e);
    }
  }, n.prototype.getGlobalScale = function(t) {
    var e = this.transform;
    return t = t || [], e ? (t[0] = Math.sqrt(e[0] * e[0] + e[1] * e[1]), t[1] = Math.sqrt(e[2] * e[2] + e[3] * e[3]), e[0] < 0 && (t[0] = -t[0]), e[3] < 0 && (t[1] = -t[1]), t) : (t[0] = 1, t[1] = 1, t);
  }, n.prototype.transformCoordToLocal = function(t, e) {
    var i = [t, e], s = this.invTransform;
    return s && Me(i, i, s), i;
  }, n.prototype.transformCoordToGlobal = function(t, e) {
    var i = [t, e], s = this.transform;
    return s && Me(i, i, s), i;
  }, n.prototype.getLineScale = function() {
    var t = this.transform;
    return t && $a(t[0] - 1) > 1e-10 && $a(t[3] - 1) > 1e-10 ? Math.sqrt($a(t[0] * t[3] - t[2] * t[1])) : 1;
  }, n.prototype.copyTransform = function(t) {
    Lv(this, t);
  }, n.getLocalTransform = function(t, e) {
    e = e || [];
    var i = t.originX || 0, s = t.originY || 0, r = t.scaleX, o = t.scaleY, a = t.anchorX, l = t.anchorY, c = t.rotation || 0, h = t.x, u = t.y, f = t.skewX ? Math.tan(t.skewX) : 0, d = t.skewY ? Math.tan(-t.skewY) : 0;
    if (i || s || a || l) {
      var p = i + a, _ = s + l;
      e[4] = -p * r - f * _ * o, e[5] = -_ * o - d * p * r;
    } else
      e[4] = e[5] = 0;
    return e[0] = r, e[3] = o, e[1] = d * r, e[2] = f * o, c && Av(e, e, c), e[4] += i + h, e[5] += s + u, e;
  }, n.initDefaultProps = (function() {
    var t = n.prototype;
    t.scaleX = t.scaleY = t.globalScaleRatio = 1, t.x = t.y = t.originX = t.originY = t.skewX = t.skewY = t.rotation = t.anchorX = t.anchorY = 0;
  })(), n;
})(), cn = [
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
function Lv(n, t) {
  for (var e = 0; e < cn.length; e++) {
    var i = cn[e];
    n[i] = t[i];
  }
}
var ws = {
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
    return 1 - ws.bounceOut(1 - n);
  },
  bounceOut: function(n) {
    return n < 1 / 2.75 ? 7.5625 * n * n : n < 2 / 2.75 ? 7.5625 * (n -= 1.5 / 2.75) * n + 0.75 : n < 2.5 / 2.75 ? 7.5625 * (n -= 2.25 / 2.75) * n + 0.9375 : 7.5625 * (n -= 2.625 / 2.75) * n + 0.984375;
  },
  bounceInOut: function(n) {
    return n < 0.5 ? ws.bounceIn(n * 2) * 0.5 : ws.bounceOut(n * 2 - 1) * 0.5 + 0.5;
  }
}, xr = Math.pow, sn = Math.sqrt, Co = 1e-8, Tg = 1e-4, qu = sn(3), wr = 1 / 3, Se = zi(), zt = zi(), bi = zi();
function tn(n) {
  return n > -Co && n < Co;
}
function Mg(n) {
  return n > Co || n < -Co;
}
function Tt(n, t, e, i, s) {
  var r = 1 - s;
  return r * r * (r * n + 3 * s * t) + s * s * (s * i + 3 * r * e);
}
function Cg(n, t, e, i, s, r) {
  var o = i + 3 * (t - e) - n, a = 3 * (e - t * 2 + n), l = 3 * (t - n), c = n - s, h = a * a - 3 * o * l, u = a * l - 9 * o * c, f = l * l - 3 * a * c, d = 0;
  if (tn(h) && tn(u))
    if (tn(a))
      r[0] = 0;
    else {
      var p = -l / a;
      p >= 0 && p <= 1 && (r[d++] = p);
    }
  else {
    var _ = u * u - 4 * h * f;
    if (tn(_)) {
      var g = u / h, p = -a / o + g, m = -g / 2;
      p >= 0 && p <= 1 && (r[d++] = p), m >= 0 && m <= 1 && (r[d++] = m);
    } else if (_ > 0) {
      var y = sn(_), v = h * a + 1.5 * o * (-u + y), S = h * a + 1.5 * o * (-u - y);
      v < 0 ? v = -xr(-v, wr) : v = xr(v, wr), S < 0 ? S = -xr(-S, wr) : S = xr(S, wr);
      var p = (-a - (v + S)) / (3 * o);
      p >= 0 && p <= 1 && (r[d++] = p);
    } else {
      var w = (2 * h * a - 3 * o * u) / (2 * sn(h * h * h)), x = Math.acos(w) / 3, M = sn(h), T = Math.cos(x), p = (-a - 2 * M * T) / (3 * o), m = (-a + M * (T + qu * Math.sin(x))) / (3 * o), b = (-a + M * (T - qu * Math.sin(x))) / (3 * o);
      p >= 0 && p <= 1 && (r[d++] = p), m >= 0 && m <= 1 && (r[d++] = m), b >= 0 && b <= 1 && (r[d++] = b);
    }
  }
  return d;
}
function Dg(n, t, e, i, s) {
  var r = 6 * e - 12 * t + 6 * n, o = 9 * t + 3 * i - 3 * n - 9 * e, a = 3 * t - 3 * n, l = 0;
  if (tn(o)) {
    if (Mg(r)) {
      var c = -a / r;
      c >= 0 && c <= 1 && (s[l++] = c);
    }
  } else {
    var h = r * r - 4 * o * a;
    if (tn(h))
      s[0] = -r / (2 * o);
    else if (h > 0) {
      var u = sn(h), c = (-r + u) / (2 * o), f = (-r - u) / (2 * o);
      c >= 0 && c <= 1 && (s[l++] = c), f >= 0 && f <= 1 && (s[l++] = f);
    }
  }
  return l;
}
function Zu(n, t, e, i, s, r) {
  var o = (t - n) * s + n, a = (e - t) * s + t, l = (i - e) * s + e, c = (a - o) * s + o, h = (l - a) * s + a, u = (h - c) * s + c;
  r[0] = n, r[1] = o, r[2] = c, r[3] = u, r[4] = u, r[5] = h, r[6] = l, r[7] = i;
}
function Ov(n, t, e, i, s, r, o, a, l, c, h) {
  var u, f = 5e-3, d = 1 / 0, p, _, g, m;
  Se[0] = l, Se[1] = c;
  for (var y = 0; y < 1; y += 0.05)
    zt[0] = Tt(n, e, s, o, y), zt[1] = Tt(t, i, r, a, y), g = Si(Se, zt), g < d && (u = y, d = g);
  d = 1 / 0;
  for (var v = 0; v < 32 && !(f < Tg); v++)
    p = u - f, _ = u + f, zt[0] = Tt(n, e, s, o, p), zt[1] = Tt(t, i, r, a, p), g = Si(zt, Se), p >= 0 && g < d ? (u = p, d = g) : (bi[0] = Tt(n, e, s, o, _), bi[1] = Tt(t, i, r, a, _), m = Si(bi, Se), _ <= 1 && m < d ? (u = _, d = m) : f *= 0.5);
  return sn(d);
}
function Fv(n, t, e, i, s, r, o, a, l) {
  for (var c = n, h = t, u = 0, f = 1 / l, d = 1; d <= l; d++) {
    var p = d * f, _ = Tt(n, e, s, o, p), g = Tt(t, i, r, a, p), m = _ - c, y = g - h;
    u += Math.sqrt(m * m + y * y), c = _, h = g;
  }
  return u;
}
function Ht(n, t, e, i) {
  var s = 1 - i;
  return s * (s * n + 2 * i * t) + i * i * e;
}
function Bv(n, t, e, i, s) {
  var r = n - 2 * t + e, o = 2 * (t - n), a = n - i, l = 0;
  if (tn(r)) {
    if (Mg(o)) {
      var c = -a / o;
      c >= 0 && c <= 1 && (s[l++] = c);
    }
  } else {
    var h = o * o - 4 * r * a;
    if (tn(h)) {
      var c = -o / (2 * r);
      c >= 0 && c <= 1 && (s[l++] = c);
    } else if (h > 0) {
      var u = sn(h), c = (-o + u) / (2 * r), f = (-o - u) / (2 * r);
      c >= 0 && c <= 1 && (s[l++] = c), f >= 0 && f <= 1 && (s[l++] = f);
    }
  }
  return l;
}
function Ig(n, t, e) {
  var i = n + e - 2 * t;
  return i === 0 ? 0.5 : (n - t) / i;
}
function Xu(n, t, e, i, s) {
  var r = (t - n) * i + n, o = (e - t) * i + t, a = (o - r) * i + r;
  s[0] = n, s[1] = r, s[2] = a, s[3] = a, s[4] = o, s[5] = e;
}
function Nv(n, t, e, i, s, r, o, a, l) {
  var c, h = 5e-3, u = 1 / 0;
  Se[0] = o, Se[1] = a;
  for (var f = 0; f < 1; f += 0.05) {
    zt[0] = Ht(n, e, s, f), zt[1] = Ht(t, i, r, f);
    var d = Si(Se, zt);
    d < u && (c = f, u = d);
  }
  u = 1 / 0;
  for (var p = 0; p < 32 && !(h < Tg); p++) {
    var _ = c - h, g = c + h;
    zt[0] = Ht(n, e, s, _), zt[1] = Ht(t, i, r, _);
    var d = Si(zt, Se);
    if (_ >= 0 && d < u)
      c = _, u = d;
    else {
      bi[0] = Ht(n, e, s, g), bi[1] = Ht(t, i, r, g);
      var m = Si(bi, Se);
      g <= 1 && m < u ? (c = g, u = m) : h *= 0.5;
    }
  }
  return sn(u);
}
function zv(n, t, e, i, s, r, o) {
  for (var a = n, l = t, c = 0, h = 1 / o, u = 1; u <= o; u++) {
    var f = u * h, d = Ht(n, e, s, f), p = Ht(t, i, r, f), _ = d - a, g = p - l;
    c += Math.sqrt(_ * _ + g * g), a = d, l = p;
  }
  return c;
}
var Hv = /cubic-bezier\(([0-9,\.e ]+)\)/;
function Eg(n) {
  var t = n && Hv.exec(n);
  if (t) {
    var e = t[1].split(","), i = +ur(e[0]), s = +ur(e[1]), r = +ur(e[2]), o = +ur(e[3]);
    if (isNaN(i + s + r + o))
      return;
    var a = [];
    return function(l) {
      return l <= 0 ? 0 : l >= 1 ? 1 : Cg(0, i, r, 1, l, a) && Tt(0, s, o, 1, a[0]);
    };
  }
}
var $v = (function() {
  function n(t) {
    this._inited = !1, this._startTime = 0, this._pausedTime = 0, this._paused = !1, this._life = t.life || 1e3, this._delay = t.delay || 0, this.loop = t.loop || !1, this.onframe = t.onframe || Ra, this.ondestroy = t.ondestroy || Ra, this.onrestart = t.onrestart || Ra, t.easing && this.setEasing(t.easing);
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
    this.easing = t, this.easingFunc = Xn(t) ? t : ws[t] || Eg(t);
  }, n;
})(), Rg = /* @__PURE__ */ (function() {
  function n(t) {
    this.value = t;
  }
  return n;
})(), Gv = (function() {
  function n() {
    this._len = 0;
  }
  return n.prototype.insert = function(t) {
    var e = new Rg(t);
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
})(), Sh = (function() {
  function n(t) {
    this._list = new Gv(), this._maxSize = 10, this._map = {}, this._maxSize = t;
  }
  return n.prototype.put = function(t, e) {
    var i = this._list, s = this._map, r = null;
    if (s[t] == null) {
      var o = i.len(), a = this._lastRemovedEntry;
      if (o >= this._maxSize && o > 0) {
        var l = i.head;
        i.remove(l), delete s[l.key], r = l.value, this._lastRemovedEntry = l;
      }
      a ? a.value = e : a = new Rg(e), a.key = t, i.insertEntry(a), s[t] = a;
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
})(), Ku = {
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
function Ss(n) {
  return n = Math.round(n), n < 0 ? 0 : n > 255 ? 255 : n;
}
function ju(n) {
  return n < 0 ? 0 : n > 1 ? 1 : n;
}
function Ga(n) {
  var t = n;
  return t.length && t.charAt(t.length - 1) === "%" ? Ss(parseFloat(t) / 100 * 255) : Ss(parseInt(t, 10));
}
function bs(n) {
  var t = n;
  return t.length && t.charAt(t.length - 1) === "%" ? ju(parseFloat(t) / 100) : ju(parseFloat(t));
}
function Ya(n, t, e) {
  return e < 0 ? e += 1 : e > 1 && (e -= 1), e * 6 < 1 ? n + (t - n) * e * 6 : e * 2 < 1 ? t : e * 3 < 2 ? n + (t - n) * (2 / 3 - e) * 6 : n;
}
function Pt(n, t, e, i, s) {
  return n[0] = t, n[1] = e, n[2] = i, n[3] = s, n;
}
function tc(n, t) {
  return n[0] = t[0], n[1] = t[1], n[2] = t[2], n[3] = t[3], n;
}
var Ag = new Sh(20), Sr = null;
function ni(n, t) {
  Sr && tc(Sr, t), Sr = Ag.put(n, Sr || t.slice());
}
function Ts(n, t) {
  if (n) {
    t = t || [];
    var e = Ag.get(n);
    if (e)
      return tc(t, e);
    n = n + "";
    var i = n.replace(/ /g, "").toLowerCase();
    if (i in Ku)
      return tc(t, Ku[i]), ni(n, t), t;
    var s = i.length;
    if (i.charAt(0) === "#") {
      if (s === 4 || s === 5) {
        var r = parseInt(i.slice(1, 4), 16);
        if (!(r >= 0 && r <= 4095)) {
          Pt(t, 0, 0, 0, 1);
          return;
        }
        return Pt(t, (r & 3840) >> 4 | (r & 3840) >> 8, r & 240 | (r & 240) >> 4, r & 15 | (r & 15) << 4, s === 5 ? parseInt(i.slice(4), 16) / 15 : 1), ni(n, t), t;
      } else if (s === 7 || s === 9) {
        var r = parseInt(i.slice(1, 7), 16);
        if (!(r >= 0 && r <= 16777215)) {
          Pt(t, 0, 0, 0, 1);
          return;
        }
        return Pt(t, (r & 16711680) >> 16, (r & 65280) >> 8, r & 255, s === 9 ? parseInt(i.slice(7), 16) / 255 : 1), ni(n, t), t;
      }
      return;
    }
    var o = i.indexOf("("), a = i.indexOf(")");
    if (o !== -1 && a + 1 === s) {
      var l = i.substr(0, o), c = i.substr(o + 1, a - (o + 1)).split(","), h = 1;
      switch (l) {
        case "rgba":
          if (c.length !== 4)
            return c.length === 3 ? Pt(t, +c[0], +c[1], +c[2], 1) : Pt(t, 0, 0, 0, 1);
          h = bs(c.pop());
        case "rgb":
          if (c.length >= 3)
            return Pt(t, Ga(c[0]), Ga(c[1]), Ga(c[2]), c.length === 3 ? h : bs(c[3])), ni(n, t), t;
          Pt(t, 0, 0, 0, 1);
          return;
        case "hsla":
          if (c.length !== 4) {
            Pt(t, 0, 0, 0, 1);
            return;
          }
          return c[3] = bs(c[3]), Qu(c, t), ni(n, t), t;
        case "hsl":
          if (c.length !== 3) {
            Pt(t, 0, 0, 0, 1);
            return;
          }
          return Qu(c, t), ni(n, t), t;
        default:
          return;
      }
    }
    Pt(t, 0, 0, 0, 1);
  }
}
function Qu(n, t) {
  var e = (parseFloat(n[0]) % 360 + 360) % 360 / 360, i = bs(n[1]), s = bs(n[2]), r = s <= 0.5 ? s * (i + 1) : s + i - s * i, o = s * 2 - r;
  return t = t || [], Pt(t, Ss(Ya(o, r, e + 1 / 3) * 255), Ss(Ya(o, r, e) * 255), Ss(Ya(o, r, e - 1 / 3) * 255), 1), n.length === 4 && (t[3] = n[3]), t;
}
function Yv(n, t) {
  if (!(!n || !n.length)) {
    var e = n[0] + "," + n[1] + "," + n[2];
    return e += "," + n[3], t + "(" + e + ")";
  }
}
function Ju(n, t) {
  var e = Ts(n);
  return e ? (0.299 * e[0] + 0.587 * e[1] + 0.114 * e[2]) * e[3] / 255 + (1 - e[3]) * t : 0;
}
var Vv = /* @__PURE__ */ (function() {
  function n() {
    this.firefox = !1, this.ie = !1, this.edge = !1, this.newEdge = !1, this.weChat = !1;
  }
  return n;
})(), Wv = /* @__PURE__ */ (function() {
  function n() {
    this.browser = new Vv(), this.node = !1, this.wxa = !1, this.worker = !1, this.svgSupported = !1, this.touchEventsSupported = !1, this.pointerEventsSupported = !1, this.domSupported = !1, this.transformSupported = !1, this.transform3dSupported = !1, this.hasGlobalWindow = typeof window != "undefined";
  }
  return n;
})(), we = new Wv();
typeof wx == "object" && typeof wx.getSystemInfoSync == "function" ? (we.wxa = !0, we.touchEventsSupported = !0) : typeof document == "undefined" && typeof self != "undefined" ? we.worker = !0 : typeof navigator == "undefined" ? (we.node = !0, we.svgSupported = !0) : Uv(navigator.userAgent, we);
function Uv(n, t) {
  var e = t.browser, i = n.match(/Firefox\/([\d.]+)/), s = n.match(/MSIE\s([\d.]+)/) || n.match(/Trident\/.+?rv:(([\d.]+))/), r = n.match(/Edge?\/([\d.]+)/), o = /micromessenger/i.test(n);
  i && (e.firefox = !0, e.version = i[1]), s && (e.ie = !0, e.version = s[1]), r && (e.edge = !0, e.version = r[1], e.newEdge = +r[1].split(".")[0] > 18), o && (e.weChat = !0), t.svgSupported = typeof SVGRect != "undefined", t.touchEventsSupported = "ontouchstart" in window && !e.ie && !e.edge, t.pointerEventsSupported = "onpointerdown" in window && (e.edge || e.ie && +e.version >= 11), t.domSupported = typeof document != "undefined";
  var a = document.documentElement.style;
  t.transform3dSupported = (e.ie && "transition" in a || e.edge || "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix() || "MozPerspective" in a) && !("OTransition" in a), t.transformSupported = t.transform3dSupported || e.ie && +e.version >= 9;
}
function qv(n) {
  return n.type === "linear";
}
function Zv(n) {
  return n.type === "radial";
}
(function() {
  return we.hasGlobalWindow && Xn(window.btoa) ? function(n) {
    return window.btoa(unescape(encodeURIComponent(n)));
  } : typeof Buffer != "undefined" ? function(n) {
    return Buffer.from(n).toString("base64");
  } : function(n) {
    return null;
  };
})();
var ec = Array.prototype.slice;
function Fe(n, t, e) {
  return (t - n) * e + n;
}
function Va(n, t, e, i) {
  for (var s = t.length, r = 0; r < s; r++)
    n[r] = Fe(t[r], e[r], i);
  return n;
}
function Xv(n, t, e, i) {
  for (var s = t.length, r = s && t[0].length, o = 0; o < s; o++) {
    n[o] || (n[o] = []);
    for (var a = 0; a < r; a++)
      n[o][a] = Fe(t[o][a], e[o][a], i);
  }
  return n;
}
function br(n, t, e, i) {
  for (var s = t.length, r = 0; r < s; r++)
    n[r] = t[r] + e[r] * i;
  return n;
}
function tf(n, t, e, i) {
  for (var s = t.length, r = s && t[0].length, o = 0; o < s; o++) {
    n[o] || (n[o] = []);
    for (var a = 0; a < r; a++)
      n[o][a] = t[o][a] + e[o][a] * i;
  }
  return n;
}
function Kv(n, t) {
  for (var e = n.length, i = t.length, s = e > i ? t : n, r = Math.min(e, i), o = s[r - 1] || { color: [0, 0, 0, 0], offset: 0 }, a = r; a < Math.max(e, i); a++)
    s.push({
      offset: o.offset,
      color: o.color.slice()
    });
}
function jv(n, t, e) {
  var i = n, s = t;
  if (!(!i.push || !s.push)) {
    var r = i.length, o = s.length;
    if (r !== o) {
      var a = r > o;
      if (a)
        i.length = o;
      else
        for (var l = r; l < o; l++)
          i.push(e === 1 ? s[l] : ec.call(s[l]));
    }
    for (var c = i[0] && i[0].length, l = 0; l < i.length; l++)
      if (e === 1)
        isNaN(i[l]) && (i[l] = s[l]);
      else
        for (var h = 0; h < c; h++)
          isNaN(i[l][h]) && (i[l][h] = s[l][h]);
  }
}
function Ms(n) {
  if (jt(n)) {
    var t = n.length;
    if (jt(n[0])) {
      for (var e = [], i = 0; i < t; i++)
        e.push(ec.call(n[i]));
      return e;
    }
    return ec.call(n);
  }
  return n;
}
function io(n) {
  return n[0] = Math.floor(n[0]) || 0, n[1] = Math.floor(n[1]) || 0, n[2] = Math.floor(n[2]) || 0, n[3] = n[3] == null ? 1 : n[3], "rgba(" + n.join(",") + ")";
}
function Qv(n) {
  return jt(n && n[0]) ? 2 : 1;
}
var Tr = 0, so = 1, kg = 2, hs = 3, nc = 4, ic = 5, ef = 6;
function nf(n) {
  return n === nc || n === ic;
}
function Mr(n) {
  return n === so || n === kg;
}
var Zi = [0, 0, 0, 0], Jv = (function() {
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
    var s = this.keyframes, r = s.length, o = !1, a = ef, l = e;
    if (jt(e)) {
      var c = Qv(e);
      a = c, (c === 1 && !le(e[0]) || c === 2 && !le(e[0][0])) && (o = !0);
    } else if (le(e) && !zm(e))
      a = Tr;
    else if (Kt(e))
      if (!isNaN(+e))
        a = Tr;
      else {
        var h = Ts(e);
        h && (l = h, a = hs);
      }
    else if (ya(e)) {
      var u = R({}, l);
      u.colorStops = ce(e.colorStops, function(d) {
        return {
          offset: d.offset,
          color: Ts(d.color)
        };
      }), qv(e) ? a = nc : Zv(e) && (a = ic), l = u;
    }
    r === 0 ? this.valType = a : (a !== this.valType || a === ef) && (o = !0), this.discrete = this.discrete || o;
    var f = {
      time: t,
      value: l,
      rawValue: e,
      percent: 0
    };
    return i && (f.easing = i, f.easingFunc = Xn(i) ? i : ws[i] || Eg(i)), s.push(f), f;
  }, n.prototype.prepare = function(t, e) {
    var i = this.keyframes;
    this._needsSort && i.sort(function(_, g) {
      return _.time - g.time;
    });
    for (var s = this.valType, r = i.length, o = i[r - 1], a = this.discrete, l = Mr(s), c = nf(s), h = 0; h < r; h++) {
      var u = i[h], f = u.value, d = o.value;
      u.percent = u.time / t, a || (l && h !== r - 1 ? jv(f, d, s) : c && Kv(f.colorStops, d.colorStops));
    }
    if (!a && s !== ic && e && this.needsAnimate() && e.needsAnimate() && s === e.valType && !e._finished) {
      this._additiveTrack = e;
      for (var p = i[0].value, h = 0; h < r; h++)
        s === Tr ? i[h].additiveValue = i[h].value - p : s === hs ? i[h].additiveValue = br([], i[h].value, p, -1) : Mr(s) && (i[h].additiveValue = s === so ? br([], i[h].value, p, -1) : tf([], i[h].value, p, -1));
    }
  }, n.prototype.step = function(t, e) {
    if (!this._finished) {
      this._additiveTrack && this._additiveTrack._finished && (this._additiveTrack = null);
      var i = this._additiveTrack != null, s = i ? "additiveValue" : "value", r = this.valType, o = this.keyframes, a = o.length, l = this.propName, c = r === hs, h, u = this._lastFr, f = Math.min, d, p;
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
        var y = i ? this._additiveValue : c ? Zi : t[l];
        if ((Mr(r) || c) && !y && (y = this._additiveValue = []), this.discrete)
          t[l] = m < 1 ? d.rawValue : p.rawValue;
        else if (Mr(r))
          r === so ? Va(y, d[s], p[s], m) : Xv(y, d[s], p[s], m);
        else if (nf(r)) {
          var v = d[s], S = p[s], w = r === nc;
          t[l] = {
            type: w ? "linear" : "radial",
            x: Fe(v.x, S.x, m),
            y: Fe(v.y, S.y, m),
            colorStops: ce(v.colorStops, function(M, T) {
              var b = S.colorStops[T];
              return {
                offset: Fe(M.offset, b.offset, m),
                color: io(Va([], M.color, b.color, m))
              };
            }),
            global: S.global
          }, w ? (t[l].x2 = Fe(v.x2, S.x2, m), t[l].y2 = Fe(v.y2, S.y2, m)) : t[l].r = Fe(v.r, S.r, m);
        } else if (c)
          Va(y, d[s], p[s], m), i || (t[l] = io(y));
        else {
          var x = Fe(d[s], p[s], m);
          i ? this._additiveValue = x : t[l] = x;
        }
        i && this._addToTarget(t);
      }
    }
  }, n.prototype._addToTarget = function(t) {
    var e = this.valType, i = this.propName, s = this._additiveValue;
    e === Tr ? t[i] = t[i] + s : e === hs ? (Ts(t[i], Zi), br(Zi, Zi, s, 1), t[i] = io(Zi)) : e === so ? br(t[i], t[i], s, 1) : e === kg && tf(t[i], t[i], s, 1);
  }, n;
})(), Pg = (function() {
  function n(t, e, i, s) {
    if (this._tracks = {}, this._trackKeys = [], this._maxTime = 0, this._started = 0, this._clip = null, this._target = t, this._loop = e, e && s) {
      lh("Can' use additive animation on looped animation.");
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
    return this.whenWithKeys(t, e, vt(e), i);
  }, n.prototype.whenWithKeys = function(t, e, i, s) {
    for (var r = this._tracks, o = 0; o < i.length; o++) {
      var a = i[o], l = r[a];
      if (!l) {
        l = r[a] = new Jv(a);
        var c = void 0, h = this._getAdditiveTrack(a);
        if (h) {
          var u = h.keyframes, f = u[u.length - 1];
          c = f && f.value, h.valType === hs && c && (c = io(c));
        } else
          c = this._target[a];
        if (c == null)
          continue;
        t > 0 && l.addKeyframe(0, Ms(c), s), this._trackKeys.push(a);
      }
      l.addKeyframe(t, Ms(e[a]), s);
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
        var f = new $v({
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
    return ce(this._trackKeys, function(e) {
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
          l && (t[r] = Ms(l.rawValue));
        }
      }
    }
  }, n.prototype.__changeFinalValue = function(t, e) {
    e = e || vt(t);
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
})(), ht = (function() {
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
})(), Cr = Math.min, Dr = Math.max, mn = new ht(), yn = new ht(), vn = new ht(), xn = new ht(), Xi = new ht(), Ki = new ht(), yt = (function() {
  function n(t, e, i, s) {
    i < 0 && (t = t + i, i = -i), s < 0 && (e = e + s, s = -s), this.x = t, this.y = e, this.width = i, this.height = s;
  }
  return n.prototype.union = function(t) {
    var e = Cr(t.x, this.x), i = Cr(t.y, this.y);
    isFinite(this.x) && isFinite(this.width) ? this.width = Dr(t.x + t.width, this.x + this.width) - e : this.width = t.width, isFinite(this.y) && isFinite(this.height) ? this.height = Dr(t.y + t.height, this.y + this.height) - i : this.height = t.height, this.x = e, this.y = i;
  }, n.prototype.applyTransform = function(t) {
    n.applyTransform(this, this, t);
  }, n.prototype.calculateTransform = function(t) {
    var e = this, i = t.width / e.width, s = t.height / e.height, r = Mo();
    return Vu(r, r, [-e.x, -e.y]), kv(r, r, [i, s]), Vu(r, r, [t.x, t.y]), r;
  }, n.prototype.intersect = function(t, e) {
    if (!t)
      return !1;
    t instanceof n || (t = n.create(t));
    var i = this, s = i.x, r = i.x + i.width, o = i.y, a = i.y + i.height, l = t.x, c = t.x + t.width, h = t.y, u = t.y + t.height, f = !(r < l || c < s || a < h || u < o);
    if (e) {
      var d = 1 / 0, p = 0, _ = Math.abs(r - l), g = Math.abs(c - s), m = Math.abs(a - h), y = Math.abs(u - o), v = Math.min(_, g), S = Math.min(m, y);
      r < l || c < s ? v > p && (p = v, _ < g ? ht.set(Ki, -_, 0) : ht.set(Ki, g, 0)) : v < d && (d = v, _ < g ? ht.set(Xi, _, 0) : ht.set(Xi, -g, 0)), a < h || u < o ? S > p && (p = S, m < y ? ht.set(Ki, 0, -m) : ht.set(Ki, 0, y)) : v < d && (d = v, m < y ? ht.set(Xi, 0, m) : ht.set(Xi, 0, -y));
    }
    return e && ht.copy(e, f ? Xi : Ki), f;
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
    mn.x = vn.x = e.x, mn.y = xn.y = e.y, yn.x = xn.x = e.x + e.width, yn.y = vn.y = e.y + e.height, mn.transform(i), xn.transform(i), yn.transform(i), vn.transform(i), t.x = Cr(mn.x, yn.x, vn.x, xn.x), t.y = Cr(mn.y, yn.y, vn.y, xn.y);
    var l = Dr(mn.x, yn.x, vn.x, xn.x), c = Dr(mn.y, yn.y, vn.y, xn.y);
    t.width = l - t.x, t.height = c - t.y;
  }, n;
})(), Lg = (function() {
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
})(), sf = {};
function Og(n, t) {
  t = t || Gs;
  var e = sf[t];
  e || (e = sf[t] = new Sh(500));
  var i = e.get(n);
  return i == null && (i = sr.measureText(n, t).width, e.put(n, i)), i;
}
function rf(n, t, e, i) {
  var s = Og(n, t), r = ix(t), o = ex(0, s, e), a = nx(0, r, i), l = new yt(o, a, s, r);
  return l;
}
function tx(n, t, e, i) {
  var s = ((n || "") + "").split(`
`), r = s.length;
  if (r === 1)
    return rf(s[0], t, e, i);
  for (var o = new yt(0, 0, 0, 0), a = 0; a < s.length; a++) {
    var l = rf(s[a], t, e, i);
    a === 0 ? o.copy(l) : o.union(l);
  }
  return o;
}
function ex(n, t, e) {
  return e === "right" ? n -= t : e === "center" && (n -= t / 2), n;
}
function nx(n, t, e) {
  return e === "middle" ? n -= t / 2 : e === "bottom" && (n -= t), n;
}
function ix(n) {
  return Og("国", n);
}
function ki(n, t) {
  return typeof n == "string" ? n.lastIndexOf("%") >= 0 ? parseFloat(n) / 100 * t : parseFloat(n) : n;
}
function Fg(n, t, e) {
  var i = t.position || "inside", s = t.distance != null ? t.distance : 5, r = e.height, o = e.width, a = r / 2, l = e.x, c = e.y, h = "left", u = "top";
  if (i instanceof Array)
    l += ki(i[0], e.width), c += ki(i[1], e.height), h = null, u = null;
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
var Bg = 1;
we.hasGlobalWindow && (Bg = Math.max(window.devicePixelRatio || window.screen && window.screen.deviceXDPI / window.screen.logicalXDPI || 1, 1));
var Do = Bg, sx = 0.4, sc = "#333", rc = "#ccc", rx = "#eee", Zt = 1, us = 2, di = 4, Wa = "__zr_normal__", Ua = cn.concat(["ignore"]), ox = ch(cn, function(n, t) {
  return n[t] = !0, n;
}, { ignore: !1 }), ii = {}, ax = new yt(0, 0, 0, 0), bh = (function() {
  function n(t) {
    this.id = Om(), this.animators = [], this.currentStates = [], this.states = {}, this._init(t);
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
        var h = ax;
        i.layoutRect ? h.copy(i.layoutRect) : h.copy(this.getBoundingRect()), s || h.applyTransform(this.transform), this.calculateTextPosition ? this.calculateTextPosition(ii, i, h) : Fg(ii, i, h), r.x = ii.x, r.y = ii.y, o = ii.align, a = ii.verticalAlign;
        var u = i.origin;
        if (u && i.rotation != null) {
          var f = void 0, d = void 0;
          u === "center" ? (f = h.width * 0.5, d = h.height * 0.5) : (f = ki(u[0], h.width), d = ki(u[1], h.height)), c = !0, r.originX = -r.x + f + (s ? 0 : h.x), r.originY = -r.y + d + (s ? 0 : h.y);
        }
      }
      i.rotation != null && (r.rotation = i.rotation);
      var p = i.offset;
      p && (r.x += p[0], r.y += p[1], c || (r.originX = -p[0], r.originY = -p[1]));
      var _ = i.inside == null ? typeof i.position == "string" && i.position.indexOf("inside") >= 0 : i.inside, g = this._innerTextDefaultStyle || (this._innerTextDefaultStyle = {}), m = void 0, y = void 0, v = void 0;
      _ && this.canBeInsideText() ? (m = i.insideFill, y = i.insideStroke, (m == null || m === "auto") && (m = this.getInsideTextFill()), (y == null || y === "auto") && (y = this.getInsideTextStroke(m), v = !0)) : (m = i.outsideFill, y = i.outsideStroke, (m == null || m === "auto") && (m = this.getOutsideFill()), (y == null || y === "auto") && (y = this.getOutsideStroke(m), v = !0)), m = m || "#000", (m !== g.fill || y !== g.stroke || v !== g.autoStroke || o !== g.align || a !== g.verticalAlign) && (l = !0, g.fill = m, g.stroke = y, g.autoStroke = v, g.align = o, g.verticalAlign = a, e.setDefaultTextStyle(g)), e.__dirty |= Zt, l && e.dirtyStyle(!0);
    }
  }, n.prototype.canBeInsideText = function() {
    return !0;
  }, n.prototype.getInsideTextFill = function() {
    return "#fff";
  }, n.prototype.getInsideTextStroke = function(t) {
    return "#000";
  }, n.prototype.getOutsideFill = function() {
    return this.__zr && this.__zr.isDarkMode() ? rc : sc;
  }, n.prototype.getOutsideStroke = function(t) {
    var e = this.__zr && this.__zr.getBackgroundColor(), i = typeof e == "string" && Ts(e);
    i || (i = [255, 255, 255, 1]);
    for (var s = i[3], r = this.__zr.isDarkMode(), o = 0; o < 3; o++)
      i[o] = i[o] * s + (r ? 0 : 255) * (1 - s);
    return i[3] = 1, Yv(i, "rgba");
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
    else if (ae(t))
      for (var i = t, s = vt(i), r = 0; r < s.length; r++) {
        var o = s[r];
        this.attrKV(o, t[o]);
      }
    return this.markRedraw(), this;
  }, n.prototype.saveCurrentToNormalState = function(t) {
    this._innerSaveToNormal(t);
    for (var e = this._normalState, i = 0; i < this.animators.length; i++) {
      var s = this.animators[i], r = s.__fromStateTransition;
      if (!(s.getLoop() || r && r !== Wa)) {
        var o = s.targetName, a = o ? e[o] : e;
        s.saveTo(a);
      }
    }
  }, n.prototype._innerSaveToNormal = function(t) {
    var e = this._normalState;
    e || (e = this._normalState = {}), t.textConfig && !e.textConfig && (e.textConfig = this.textConfig), this._savePrimaryToNormal(t, e, Ua);
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
    this.useState(Wa, !1, t);
  }, n.prototype.useState = function(t, e, i, s) {
    var r = t === Wa, o = this.hasState();
    if (!(!o && r)) {
      var a = this.currentStates, l = this.stateTransition;
      if (!(Ct(a, t) >= 0 && (e || a.length === 1))) {
        var c;
        if (this.stateProxy && !r && (c = this.stateProxy(t)), c || (c = this.states && this.states[t]), !c && !r) {
          lh("State " + t + " not exists.");
          return;
        }
        r || this.saveCurrentToNormalState(c);
        var h = !!(c && c.hoverLayer || s);
        h && this._toggleHoverLayerFlag(!0), this._applyStateObj(t, c, this._normalState, e, !i && !this.__inHover && l && l.duration > 0, l);
        var u = this._textContent, f = this._textGuide;
        return u && u.useState(t, e, i, h), f && f.useState(t, e, i, h), r ? (this.currentStates = [], this._normalState = {}) : e ? this.currentStates.push(t) : this.currentStates = [t], this._updateAnimationTargets(), this.markRedraw(), !h && this.__inHover && (this._toggleHoverLayerFlag(!1), this.__dirty &= ~Zt), c;
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
      _ && _.useStates(t, e, f), g && g.useStates(t, e, f), this._updateAnimationTargets(), this.currentStates = t.slice(), this.markRedraw(), !f && this.__inHover && (this._toggleHoverLayerFlag(!1), this.__dirty &= ~Zt);
    }
  }, n.prototype._updateAnimationTargets = function() {
    for (var t = 0; t < this.animators.length; t++) {
      var e = this.animators[t];
      e.targetName && e.changeTarget(this[e.targetName]);
    }
  }, n.prototype.removeState = function(t) {
    var e = Ct(this.currentStates, t);
    if (e >= 0) {
      var i = this.currentStates.slice();
      i.splice(e, 1), this.useStates(i);
    }
  }, n.prototype.replaceState = function(t, e, i) {
    var s = this.currentStates.slice(), r = Ct(s, t), o = Ct(s, e) >= 0;
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
    for (var l = {}, c = !1, h = 0; h < Ua.length; h++) {
      var u = Ua[h], f = r && ox[u];
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
    e !== t && (e && e !== t && this.removeTextContent(), t.innerTransformable = new wh(), this._attachComponent(t), this._textContent = t, this.markRedraw());
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
    this.__dirty |= Zt;
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
    var s = t ? this[t] : this, r = new Pg(s, e, i);
    return t && (r.targetName = t), this.addAnimator(r, t), r;
  }, n.prototype.addAnimator = function(t, e) {
    var i = this.__zr, s = this;
    t.during(function() {
      s.updateDuringAnimation(e);
    }).done(function() {
      var r = s.animators, o = Ct(r, t);
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
    qa(this, t, e, i);
  }, n.prototype.animateFrom = function(t, e, i) {
    qa(this, t, e, i, !0);
  }, n.prototype._transitionState = function(t, e, i, s) {
    for (var r = qa(this, e, i, s), o = 0; o < r.length; o++)
      r[o].__fromStateTransition = t;
  }, n.prototype.getBoundingRect = function() {
    return null;
  }, n.prototype.getPaintRect = function() {
    return null;
  }, n.initDefaultProps = (function() {
    var t = n.prototype;
    t.type = "element", t.name = "", t.ignore = t.silent = t.isGroup = t.draggable = t.dragging = t.ignoreClip = t.__inHover = !1, t.__dirty = Zt;
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
Bi(bh, Lg);
Bi(bh, wh);
function qa(n, t, e, i, s) {
  e = e || {};
  var r = [];
  Ng(n, "", n, t, e, i, r, s);
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
function Za(n, t, e) {
  for (var i = 0; i < e; i++)
    n[i] = t[i];
}
function lx(n) {
  return jt(n[0]);
}
function cx(n, t, e) {
  if (jt(t[e]))
    if (jt(n[e]) || (n[e] = []), Bm(t[e])) {
      var i = t[e].length;
      n[e].length !== i && (n[e] = new t[e].constructor(i), Za(n[e], t[e], i));
    } else {
      var s = t[e], r = n[e], o = s.length;
      if (lx(s))
        for (var a = s[0].length, l = 0; l < o; l++)
          r[l] ? Za(r[l], s[l], a) : r[l] = Array.prototype.slice.call(s[l]);
      else
        Za(r, s, o);
      r.length = s.length;
    }
  else
    n[e] = t[e];
}
function hx(n, t) {
  return n === t || jt(n) && jt(t) && ux(n, t);
}
function ux(n, t) {
  var e = n.length;
  if (e !== t.length)
    return !1;
  for (var i = 0; i < e; i++)
    if (n[i] !== t[i])
      return !1;
  return !0;
}
function Ng(n, t, e, i, s, r, o, a) {
  for (var l = vt(i), c = s.duration, h = s.delay, u = s.additive, f = s.setToFinal, d = !ae(r), p = n.animators, _ = [], g = 0; g < l.length; g++) {
    var m = l[g], y = i[m];
    if (y != null && e[m] != null && (d || r[m]))
      if (ae(y) && !jt(y) && !ya(y)) {
        if (t) {
          a || (e[m] = y, n.updateDuringAnimation(t));
          continue;
        }
        Ng(n, m, e[m], y, s, r && r[m], o, a);
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
          var M = Ct(p, w);
          p.splice(M, 1);
        }
      }
    }
  if (s.force || (_ = _o(_, function(C) {
    return !hx(i[C], e[C]);
  }), v = _.length), v > 0 || s.force && !o.length) {
    var T = void 0, b = void 0, I = void 0;
    if (a) {
      b = {}, f && (T = {});
      for (var S = 0; S < v; S++) {
        var m = _[S];
        b[m] = e[m], f ? T[m] = i[m] : e[m] = i[m];
      }
    } else if (f) {
      I = {};
      for (var S = 0; S < v; S++) {
        var m = _[S];
        I[m] = Ms(e[m]), cx(e, i, m);
      }
    }
    var w = new Pg(e, !1, !1, u ? _o(p, function(E) {
      return E.targetName === t;
    }) : null);
    w.targetName = t, s.scope && (w.scope = s.scope), f && T && w.whenWithKeys(0, T, _), I && w.whenWithKeys(0, I, _), w.whenWithKeys(c == null ? 500 : c, a ? b : i, _).delay(h || 0), n.addAnimator(w, t), o.push(w);
  }
}
var oc = "__zr_style_" + Math.round(Math.random() * 10), Yn = {
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  shadowColor: "#000",
  opacity: 1,
  blend: "source-over"
}, Th = {
  style: {
    shadowBlur: !0,
    shadowOffsetX: !0,
    shadowOffsetY: !0,
    shadowColor: !0,
    opacity: !0
  }
};
Yn[oc] = !0;
var of = ["z", "z2", "invisible"], fx = ["invisible"], Mh = (function(n) {
  Kn(t, n);
  function t(e) {
    return n.call(this, e) || this;
  }
  return t.prototype._init = function(e) {
    for (var i = vt(e), s = 0; s < i.length; s++) {
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
    if (this.ignore || this.invisible || this.style.opacity === 0 || this.culling && dx(this, e, i) || o && !o[0] && !o[3])
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
      e = this._paintRect || (this._paintRect = new yt(0, 0, 0, 0)), i ? yt.applyTransform(e, s, i) : e.copy(s), (o || a || l) && (e.width += o * 2 + Math.abs(a), e.height += o * 2 + Math.abs(l), e.x = Math.min(e.x, e.x + a - o), e.y = Math.min(e.y, e.y + l - o));
      var c = this.dirtyRectTolerance;
      e.isZero() || (e.x = Math.floor(e.x - c), e.y = Math.floor(e.y - c), e.width = Math.ceil(e.width + 1 + c * 2), e.height = Math.ceil(e.height + 1 + c * 2));
    }
    return e;
  }, t.prototype.setPrevPaintRect = function(e) {
    e ? (this._prevPaintRect = this._prevPaintRect || new yt(0, 0, 0, 0), this._prevPaintRect.copy(e)) : this._prevPaintRect = null;
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
    e || this.markRedraw(), this.__dirty |= us, this._rect && (this._rect = null);
  }, t.prototype.dirty = function() {
    this.dirtyStyle();
  }, t.prototype.styleChanged = function() {
    return !!(this.__dirty & us);
  }, t.prototype.styleUpdated = function() {
    this.__dirty &= ~us;
  }, t.prototype.createStyle = function(e) {
    return va(Yn, e);
  }, t.prototype.useStyle = function(e) {
    e[oc] || (e = this.createStyle(e)), this.__inHover ? this.__hoverStyle = e : this.style = e, this.dirtyStyle();
  }, t.prototype.isStyleObject = function(e) {
    return e[oc];
  }, t.prototype._innerSaveToNormal = function(e) {
    n.prototype._innerSaveToNormal.call(this, e);
    var i = this._normalState;
    e.style && !i.style && (i.style = this._mergeStyle(this.createStyle(), this.style)), this._savePrimaryToNormal(e, i, of);
  }, t.prototype._applyStateObj = function(e, i, s, r, o, a) {
    n.prototype._applyStateObj.call(this, e, i, s, r, o, a);
    var l = !(i && r), c;
    if (i && i.style ? o ? r ? c = i.style : (c = this._mergeStyle(this.createStyle(), s.style), this._mergeStyle(c, i.style)) : (c = this._mergeStyle(this.createStyle(), r ? this.style : s.style), this._mergeStyle(c, i.style)) : l && (c = s.style), c)
      if (o) {
        var h = this.style;
        if (this.style = this.createStyle(l ? {} : h), l)
          for (var u = vt(h), f = 0; f < u.length; f++) {
            var d = u[f];
            d in c && (c[d] = c[d], this.style[d] = h[d]);
          }
        for (var p = vt(c), f = 0; f < p.length; f++) {
          var d = p[f];
          this.style[d] = this.style[d];
        }
        this._transitionState(e, {
          style: c
        }, a, this.getAnimationStyleProps());
      } else
        this.useStyle(c);
    for (var _ = this.__inHover ? fx : of, f = 0; f < _.length; f++) {
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
    return Th;
  }, t.initDefaultProps = (function() {
    var e = t.prototype;
    e.type = "displayable", e.invisible = !1, e.z = 0, e.z2 = 0, e.zlevel = 0, e.culling = !1, e.cursor = "pointer", e.rectHover = !1, e.incremental = !1, e._rect = null, e.dirtyRectTolerance = 0, e.__dirty = Zt | us;
  })(), t;
})(bh), Xa = new yt(0, 0, 0, 0), Ka = new yt(0, 0, 0, 0);
function dx(n, t, e) {
  return Xa.copy(n.getBoundingRect()), n.transform && Xa.applyTransform(n.transform), Ka.width = t, Ka.height = e, !Xa.intersect(Ka);
}
var $t = Math.min, Gt = Math.max, ja = Math.sin, Qa = Math.cos, wn = Math.PI * 2, Ir = zi(), Er = zi(), Rr = zi();
function af(n, t, e, i, s, r) {
  s[0] = $t(n, e), s[1] = $t(t, i), r[0] = Gt(n, e), r[1] = Gt(t, i);
}
var lf = [], cf = [];
function px(n, t, e, i, s, r, o, a, l, c) {
  var h = Dg, u = Tt, f = h(n, e, s, o, lf);
  l[0] = 1 / 0, l[1] = 1 / 0, c[0] = -1 / 0, c[1] = -1 / 0;
  for (var d = 0; d < f; d++) {
    var p = u(n, e, s, o, lf[d]);
    l[0] = $t(p, l[0]), c[0] = Gt(p, c[0]);
  }
  f = h(t, i, r, a, cf);
  for (var d = 0; d < f; d++) {
    var _ = u(t, i, r, a, cf[d]);
    l[1] = $t(_, l[1]), c[1] = Gt(_, c[1]);
  }
  l[0] = $t(n, l[0]), c[0] = Gt(n, c[0]), l[0] = $t(o, l[0]), c[0] = Gt(o, c[0]), l[1] = $t(t, l[1]), c[1] = Gt(t, c[1]), l[1] = $t(a, l[1]), c[1] = Gt(a, c[1]);
}
function gx(n, t, e, i, s, r, o, a) {
  var l = Ig, c = Ht, h = Gt($t(l(n, e, s), 1), 0), u = Gt($t(l(t, i, r), 1), 0), f = c(n, e, s, h), d = c(t, i, r, u);
  o[0] = $t(n, s, f), o[1] = $t(t, r, d), a[0] = Gt(n, s, f), a[1] = Gt(t, r, d);
}
function _x(n, t, e, i, s, r, o, a, l) {
  var c = Sg, h = bg, u = Math.abs(s - r);
  if (u % wn < 1e-4 && u > 1e-4) {
    a[0] = n - e, a[1] = t - i, l[0] = n + e, l[1] = t + i;
    return;
  }
  if (Ir[0] = Qa(s) * e + n, Ir[1] = ja(s) * i + t, Er[0] = Qa(r) * e + n, Er[1] = ja(r) * i + t, c(a, Ir, Er), h(l, Ir, Er), s = s % wn, s < 0 && (s = s + wn), r = r % wn, r < 0 && (r = r + wn), s > r && !o ? r += wn : s < r && o && (s += wn), o) {
    var f = r;
    r = s, s = f;
  }
  for (var d = 0; d < r; d += Math.PI / 2)
    d > s && (Rr[0] = Qa(d) * e + n, Rr[1] = ja(d) * i + t, c(a, Rr, a), h(l, Rr, l));
}
var z = {
  M: 1,
  L: 2,
  C: 3,
  Q: 4,
  A: 5,
  Z: 6,
  R: 7
}, Sn = [], bn = [], pe = [], Ue = [], ge = [], _e = [], Ja = Math.min, tl = Math.max, Tn = Math.cos, Mn = Math.sin, ke = Math.abs, ac = Math.PI, je = ac * 2, el = typeof Float32Array != "undefined", ji = [];
function nl(n) {
  var t = Math.round(n / ac * 1e8) / 1e8;
  return t % 2 * ac;
}
function mx(n, t) {
  var e = nl(n[0]);
  e < 0 && (e += je);
  var i = e - n[0], s = n[1];
  s += i, !t && s - e >= je ? s = e + je : t && e - s >= je ? s = e - je : !t && e > s ? s = e + (je - nl(e - s)) : t && e < s && (s = e - (je - nl(s - e))), n[0] = e, n[1] = s;
}
var Pi = (function() {
  function n(t) {
    this.dpr = 1, this._xi = 0, this._yi = 0, this._x0 = 0, this._y0 = 0, this._len = 0, t && (this._saveData = !1), this._saveData && (this.data = []);
  }
  return n.prototype.increaseVersion = function() {
    this._version++;
  }, n.prototype.getVersion = function() {
    return this._version;
  }, n.prototype.setScale = function(t, e, i) {
    i = i || 0, i > 0 && (this._ux = ke(i / Do / t) || 0, this._uy = ke(i / Do / e) || 0);
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
    var i = ke(t - this._xi), s = ke(e - this._yi), r = i > this._ux || s > this._uy;
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
    this._drawPendingPt(), ji[0] = s, ji[1] = r, mx(ji, o), s = ji[0], r = ji[1];
    var a = r - s;
    return this.addData(z.A, t, e, i, i, s, a, 0, o ? 0 : 1), this._ctx && this._ctx.arc(t, e, i, s, r, o), this._xi = Tn(r) * i + t, this._yi = Mn(r) * i + e, this;
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
    !(this.data && this.data.length === e) && el && (this.data = new Float32Array(e));
    for (var i = 0; i < e; i++)
      this.data[i] = t[i];
    this._len = e;
  }, n.prototype.appendPath = function(t) {
    t instanceof Array || (t = [t]);
    for (var e = t.length, i = 0, s = this._len, r = 0; r < e; r++)
      i += t[r].len();
    el && this.data instanceof Float32Array && (this.data = new Float32Array(s + i));
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
      t instanceof Array && (t.length = this._len, el && this._len > 11 && (this.data = new Float32Array(t)));
    }
  }, n.prototype.getBoundingRect = function() {
    pe[0] = pe[1] = ge[0] = ge[1] = Number.MAX_VALUE, Ue[0] = Ue[1] = _e[0] = _e[1] = -Number.MAX_VALUE;
    var t = this.data, e = 0, i = 0, s = 0, r = 0, o;
    for (o = 0; o < this._len; ) {
      var a = t[o++], l = o === 1;
      switch (l && (e = t[o], i = t[o + 1], s = e, r = i), a) {
        case z.M:
          e = s = t[o++], i = r = t[o++], ge[0] = s, ge[1] = r, _e[0] = s, _e[1] = r;
          break;
        case z.L:
          af(e, i, t[o], t[o + 1], ge, _e), e = t[o++], i = t[o++];
          break;
        case z.C:
          px(e, i, t[o++], t[o++], t[o++], t[o++], t[o], t[o + 1], ge, _e), e = t[o++], i = t[o++];
          break;
        case z.Q:
          gx(e, i, t[o++], t[o++], t[o], t[o + 1], ge, _e), e = t[o++], i = t[o++];
          break;
        case z.A:
          var c = t[o++], h = t[o++], u = t[o++], f = t[o++], d = t[o++], p = t[o++] + d;
          o += 1;
          var _ = !t[o++];
          l && (s = Tn(d) * u + c, r = Mn(d) * f + h), _x(c, h, u, f, d, p, _, ge, _e), e = Tn(p) * u + c, i = Mn(p) * f + h;
          break;
        case z.R:
          s = e = t[o++], r = i = t[o++];
          var g = t[o++], m = t[o++];
          af(s, r, s + g, r + m, ge, _e);
          break;
        case z.Z:
          e = s, i = r;
          break;
      }
      Sg(pe, pe, ge), bg(Ue, Ue, _e);
    }
    return o === 0 && (pe[0] = pe[1] = Ue[0] = Ue[1] = 0), new yt(pe[0], pe[1], Ue[0] - pe[0], Ue[1] - pe[1]);
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
          (ke(y) > i || ke(v) > s || f === e - 1) && (_ = Math.sqrt(y * y + v * v), r = g, o = m);
          break;
        }
        case z.C: {
          var S = t[f++], w = t[f++], g = t[f++], m = t[f++], x = t[f++], M = t[f++];
          _ = Fv(r, o, S, w, g, m, x, M, 10), r = x, o = M;
          break;
        }
        case z.Q: {
          var S = t[f++], w = t[f++], g = t[f++], m = t[f++];
          _ = zv(r, o, S, w, g, m, 10), r = g, o = m;
          break;
        }
        case z.A:
          var T = t[f++], b = t[f++], I = t[f++], C = t[f++], E = t[f++], A = t[f++], P = A + E;
          f += 1, t[f++], p && (a = Tn(E) * I + T, l = Mn(E) * C + b), _ = tl(I, C) * Ja(je, Math.abs(A)), r = Tn(P) * I + T, o = Mn(P) * C + b;
          break;
        case z.R: {
          a = r = t[f++], l = o = t[f++];
          var Y = t[f++], V = t[f++];
          _ = Y * 2 + V * 2;
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
        var M = i[x++], T = x === 1;
        switch (T && (c = i[x], h = i[x + 1], a = c, l = h), M !== z.L && v > 0 && (t.lineTo(S, w), v = 0), M) {
          case z.M:
            a = c = i[x++], l = h = i[x++], t.moveTo(c, h);
            break;
          case z.L: {
            u = i[x++], f = i[x++];
            var b = ke(u - c), I = ke(f - h);
            if (b > s || I > r) {
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
              var A = b * b + I * I;
              A > v && (S = u, w = f, v = A);
            }
            break;
          }
          case z.C: {
            var P = i[x++], Y = i[x++], V = i[x++], at = i[x++], ue = i[x++], j = i[x++];
            if (d) {
              var C = p[m++];
              if (g + C > y) {
                var E = (y - g) / C;
                Zu(c, P, V, ue, E, Sn), Zu(h, Y, at, j, E, bn), t.bezierCurveTo(Sn[1], bn[1], Sn[2], bn[2], Sn[3], bn[3]);
                break t;
              }
              g += C;
            }
            t.bezierCurveTo(P, Y, V, at, ue, j), c = ue, h = j;
            break;
          }
          case z.Q: {
            var P = i[x++], Y = i[x++], V = i[x++], at = i[x++];
            if (d) {
              var C = p[m++];
              if (g + C > y) {
                var E = (y - g) / C;
                Xu(c, P, V, E, Sn), Xu(h, Y, at, E, bn), t.quadraticCurveTo(Sn[1], bn[1], Sn[2], bn[2]);
                break t;
              }
              g += C;
            }
            t.quadraticCurveTo(P, Y, V, at), c = V, h = at;
            break;
          }
          case z.A:
            var Rt = i[x++], it = i[x++], gt = i[x++], $ = i[x++], O = i[x++], st = i[x++], St = i[x++], fe = !i[x++], Ye = gt > $ ? gt : $, Yi = ke(gt - $) > 1e-3, Ve = O + st, Xh = !1;
            if (d) {
              var C = p[m++];
              g + C > y && (Ve = O + st * (y - g) / C, Xh = !0), g += C;
            }
            if (Yi && t.ellipse ? t.ellipse(Rt, it, gt, $, St, O, Ve, fe) : t.arc(Rt, it, Ye, O, Ve, fe), Xh)
              break t;
            T && (a = Tn(O) * gt + Rt, l = Mn(O) * $ + it), c = Tn(Ve) * gt + Rt, h = Mn(Ve) * $ + it;
            break;
          case z.R:
            a = c = i[x], l = h = i[x + 1], u = i[x++], f = i[x++];
            var Qn = i[x++], Vi = i[x++];
            if (d) {
              var C = p[m++];
              if (g + C > y) {
                var de = y - g;
                t.moveTo(u, f), t.lineTo(u + Ja(de, Qn), f), de -= Qn, de > 0 && t.lineTo(u + Qn, f + Ja(de, Vi)), de -= Vi, de > 0 && t.lineTo(u + tl(Qn - de, 0), f + Vi), de -= Qn, de > 0 && t.lineTo(u, f + tl(Vi - de, 0));
                break t;
              }
              g += C;
            }
            t.rect(u, f, Qn, Vi);
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
function si(n, t, e, i, s, r, o) {
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
function yx(n, t, e, i, s, r, o, a, l, c, h) {
  if (l === 0)
    return !1;
  var u = l;
  if (h > t + u && h > i + u && h > r + u && h > a + u || h < t - u && h < i - u && h < r - u && h < a - u || c > n + u && c > e + u && c > s + u && c > o + u || c < n - u && c < e - u && c < s - u && c < o - u)
    return !1;
  var f = Ov(n, t, e, i, s, r, o, a, c, h);
  return f <= u / 2;
}
function vx(n, t, e, i, s, r, o, a, l) {
  if (o === 0)
    return !1;
  var c = o;
  if (l > t + c && l > i + c && l > r + c || l < t - c && l < i - c && l < r - c || a > n + c && a > e + c && a > s + c || a < n - c && a < e - c && a < s - c)
    return !1;
  var h = Nv(n, t, e, i, s, r, a, l);
  return h <= c / 2;
}
var hf = Math.PI * 2;
function Ar(n) {
  return n %= hf, n < 0 && (n += hf), n;
}
var Qi = Math.PI * 2;
function xx(n, t, e, i, s, r, o, a, l) {
  if (o === 0)
    return !1;
  var c = o;
  a -= n, l -= t;
  var h = Math.sqrt(a * a + l * l);
  if (h - c > e || h + c < e)
    return !1;
  if (Math.abs(i - s) % Qi < 1e-4)
    return !0;
  if (r) {
    var u = i;
    i = Ar(s), s = Ar(u);
  } else
    i = Ar(i), s = Ar(s);
  i > s && (s += Qi);
  var f = Math.atan2(l, a);
  return f < 0 && (f += Qi), f >= i && f <= s || f + Qi >= i && f + Qi <= s;
}
function Cn(n, t, e, i, s, r) {
  if (r > t && r > i || r < t && r < i || i === t)
    return 0;
  var o = (r - t) / (i - t), a = i < t ? 1 : -1;
  (o === 1 || o === 0) && (a = i < t ? 0.5 : -0.5);
  var l = o * (e - n) + n;
  return l === s ? 1 / 0 : l > s ? a : 0;
}
var qe = Pi.CMD, Dn = Math.PI * 2, Sx = 1e-4;
function bx(n, t) {
  return Math.abs(n - t) < Sx;
}
var ut = [-1, -1, -1], Ft = [-1, -1];
function Tx() {
  var n = Ft[0];
  Ft[0] = Ft[1], Ft[1] = n;
}
function Mx(n, t, e, i, s, r, o, a, l, c) {
  if (c > t && c > i && c > r && c > a || c < t && c < i && c < r && c < a)
    return 0;
  var h = Cg(t, i, r, a, c, ut);
  if (h === 0)
    return 0;
  for (var u = 0, f = -1, d = void 0, p = void 0, _ = 0; _ < h; _++) {
    var g = ut[_], m = g === 0 || g === 1 ? 0.5 : 1, y = Tt(n, e, s, o, g);
    y < l || (f < 0 && (f = Dg(t, i, r, a, Ft), Ft[1] < Ft[0] && f > 1 && Tx(), d = Tt(t, i, r, a, Ft[0]), f > 1 && (p = Tt(t, i, r, a, Ft[1]))), f === 2 ? g < Ft[0] ? u += d < t ? m : -m : g < Ft[1] ? u += p < d ? m : -m : u += a < p ? m : -m : g < Ft[0] ? u += d < t ? m : -m : u += a < d ? m : -m);
  }
  return u;
}
function Cx(n, t, e, i, s, r, o, a) {
  if (a > t && a > i && a > r || a < t && a < i && a < r)
    return 0;
  var l = Bv(t, i, r, a, ut);
  if (l === 0)
    return 0;
  var c = Ig(t, i, r);
  if (c >= 0 && c <= 1) {
    for (var h = 0, u = Ht(t, i, r, c), f = 0; f < l; f++) {
      var d = ut[f] === 0 || ut[f] === 1 ? 0.5 : 1, p = Ht(n, e, s, ut[f]);
      p < o || (ut[f] < c ? h += u < t ? d : -d : h += r < u ? d : -d);
    }
    return h;
  } else {
    var d = ut[0] === 0 || ut[0] === 1 ? 0.5 : 1, p = Ht(n, e, s, ut[0]);
    return p < o ? 0 : r < t ? d : -d;
  }
}
function Dx(n, t, e, i, s, r, o, a) {
  if (a -= t, a > e || a < -e)
    return 0;
  var l = Math.sqrt(e * e - a * a);
  ut[0] = -l, ut[1] = l;
  var c = Math.abs(i - s);
  if (c < 1e-4)
    return 0;
  if (c >= Dn - 1e-4) {
    i = 0, s = Dn;
    var h = r ? 1 : -1;
    return o >= ut[0] + n && o <= ut[1] + n ? h : 0;
  }
  if (i > s) {
    var u = i;
    i = s, s = u;
  }
  i < 0 && (i += Dn, s += Dn);
  for (var f = 0, d = 0; d < 2; d++) {
    var p = ut[d];
    if (p + n > o) {
      var _ = Math.atan2(a, p), h = r ? 1 : -1;
      _ < 0 && (_ = Dn + _), (_ >= i && _ <= s || _ + Dn >= i && _ + Dn <= s) && (_ > Math.PI / 2 && _ < Math.PI * 1.5 && (h = -h), f += h);
    }
  }
  return f;
}
function zg(n, t, e, i, s) {
  for (var r = n.data, o = n.len(), a = 0, l = 0, c = 0, h = 0, u = 0, f, d, p = 0; p < o; ) {
    var _ = r[p++], g = p === 1;
    switch (_ === qe.M && p > 1 && (e || (a += Cn(l, c, h, u, i, s))), g && (l = r[p], c = r[p + 1], h = l, u = c), _) {
      case qe.M:
        h = r[p++], u = r[p++], l = h, c = u;
        break;
      case qe.L:
        if (e) {
          if (si(l, c, r[p], r[p + 1], t, i, s))
            return !0;
        } else
          a += Cn(l, c, r[p], r[p + 1], i, s) || 0;
        l = r[p++], c = r[p++];
        break;
      case qe.C:
        if (e) {
          if (yx(l, c, r[p++], r[p++], r[p++], r[p++], r[p], r[p + 1], t, i, s))
            return !0;
        } else
          a += Mx(l, c, r[p++], r[p++], r[p++], r[p++], r[p], r[p + 1], i, s) || 0;
        l = r[p++], c = r[p++];
        break;
      case qe.Q:
        if (e) {
          if (vx(l, c, r[p++], r[p++], r[p], r[p + 1], t, i, s))
            return !0;
        } else
          a += Cx(l, c, r[p++], r[p++], r[p], r[p + 1], i, s) || 0;
        l = r[p++], c = r[p++];
        break;
      case qe.A:
        var m = r[p++], y = r[p++], v = r[p++], S = r[p++], w = r[p++], x = r[p++];
        p += 1;
        var M = !!(1 - r[p++]);
        f = Math.cos(w) * v + m, d = Math.sin(w) * S + y, g ? (h = f, u = d) : a += Cn(l, c, f, d, i, s);
        var T = (i - m) * S / v + m;
        if (e) {
          if (xx(m, y, S, w, w + x, M, t, T, s))
            return !0;
        } else
          a += Dx(m, y, S, w, w + x, M, T, s);
        l = Math.cos(w + x) * v + m, c = Math.sin(w + x) * S + y;
        break;
      case qe.R:
        h = l = r[p++], u = c = r[p++];
        var b = r[p++], I = r[p++];
        if (f = h + b, d = u + I, e) {
          if (si(h, u, f, u, t, i, s) || si(f, u, f, d, t, i, s) || si(f, d, h, d, t, i, s) || si(h, d, h, u, t, i, s))
            return !0;
        } else
          a += Cn(f, u, f, d, i, s), a += Cn(h, d, h, u, i, s);
        break;
      case qe.Z:
        if (e) {
          if (si(l, c, h, u, t, i, s))
            return !0;
        } else
          a += Cn(l, c, h, u, i, s);
        l = h, c = u;
        break;
    }
  }
  return !e && !bx(c, u) && (a += Cn(l, c, h, u, i, s) || 0), a !== 0;
}
function Ix(n, t, e) {
  return zg(n, 0, !1, t, e);
}
function Ex(n, t, e, i) {
  return zg(n, t, !0, e, i);
}
var Hg = Ee({
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
}, Yn), Rx = {
  style: Ee({
    fill: !0,
    stroke: !0,
    strokePercent: !0,
    fillOpacity: !0,
    strokeOpacity: !0,
    lineDashOffset: !0,
    lineWidth: !0,
    miterLimit: !0
  }, Th.style)
}, il = cn.concat([
  "invisible",
  "culling",
  "z",
  "z2",
  "zlevel",
  "parent"
]), lc = (function(n) {
  Kn(t, n);
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
      for (var a = 0; a < il.length; ++a)
        s[il[a]] = this[il[a]];
      s.__dirty |= Zt;
    } else this._decalEl && (this._decalEl = null);
  }, t.prototype.getDecalElement = function() {
    return this._decalEl;
  }, t.prototype._init = function(e) {
    var i = vt(e);
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
      if (Kt(e)) {
        var i = Ju(e, 0);
        return i > 0.5 ? sc : i > 0.2 ? rx : rc;
      } else if (e)
        return rc;
    }
    return sc;
  }, t.prototype.getInsideTextStroke = function(e) {
    var i = this.style.fill;
    if (Kt(i)) {
      var s = this.__zr, r = !!(s && s.isDarkMode()), o = Ju(e, 0) < sx;
      if (r === o)
        return i;
    }
  }, t.prototype.buildPath = function(e, i, s) {
  }, t.prototype.pathUpdated = function() {
    this.__dirty &= ~di;
  }, t.prototype.getUpdatedPathProxy = function(e) {
    return !this.path && this.createPathProxy(), this.path.beginPath(), this.buildPath(this.path, this.shape, e), this.path;
  }, t.prototype.createPathProxy = function() {
    this.path = new Pi(!1);
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
      (r || this.__dirty & di) && (o.beginPath(), this.buildPath(o, this.shape, !1), this.pathUpdated()), e = o.getBoundingRect();
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
        if (c > 1e-10 && (this.hasFill() || (l = Math.max(l, this.strokeContainThreshold)), Ex(a, l / c, e, i)))
          return !0;
      }
      if (this.hasFill())
        return Ix(a, e, i);
    }
    return !1;
  }, t.prototype.dirtyShape = function() {
    this.__dirty |= di, this._rect && (this._rect = null), this._decalEl && this._decalEl.dirtyShape(), this.markRedraw();
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
    return !!(this.__dirty & di);
  }, t.prototype.createStyle = function(e) {
    return va(Hg, e);
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
        for (var h = {}, u = vt(c), f = 0; f < u.length; f++) {
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
    return Rx;
  }, t.prototype.isZeroArea = function() {
    return !1;
  }, t.extend = function(e) {
    var i = (function(r) {
      Kn(o, r);
      function o(a) {
        var l = r.call(this, a) || this;
        return e.init && e.init.call(l, a), l;
      }
      return o.prototype.getDefaultStyle = function() {
        return Ei(e.style);
      }, o.prototype.getDefaultShape = function() {
        return Ei(e.shape);
      }, o;
    })(t);
    for (var s in e)
      typeof e[s] == "function" && (i.prototype[s] = e[s]);
    return i;
  }, t.initDefaultProps = (function() {
    var e = t.prototype;
    e.type = "path", e.strokeContainThreshold = 5, e.segmentIgnoreThreshold = 0, e.subPixelOptimize = !1, e.autoBatch = !1, e.__dirty = Zt | us | di;
  })(), t;
})(Mh), ri = Pi.CMD, Ax = [[], [], []], uf = Math.sqrt, kx = Math.atan2;
function Px(n, t) {
  if (t) {
    var e = n.data, i = n.len(), s, r, o, a, l, c, h = ri.M, u = ri.C, f = ri.L, d = ri.R, p = ri.A, _ = ri.Q;
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
          var g = t[4], m = t[5], y = uf(t[0] * t[0] + t[1] * t[1]), v = uf(t[2] * t[2] + t[3] * t[3]), S = kx(-t[1] / v, t[0] / y);
          e[o] *= y, e[o++] += g, e[o] *= v, e[o++] += m, e[o++] *= y, e[o++] *= v, e[o++] += S, e[o++] += S, o += 2, a = o;
          break;
        case d:
          c[0] = e[o++], c[1] = e[o++], Me(c, c, t), e[a++] = c[0], e[a++] = c[1], c[0] += e[o++], c[1] += e[o++], Me(c, c, t), e[a++] = c[0], e[a++] = c[1];
      }
      for (l = 0; l < r; l++) {
        var w = Ax[l];
        w[0] = e[o++], w[1] = e[o++], Me(w, w, t), e[a++] = w[0], e[a++] = w[1];
      }
    }
    n.increaseVersion();
  }
}
var sl = Math.sqrt, kr = Math.sin, Pr = Math.cos, Ji = Math.PI;
function ff(n) {
  return Math.sqrt(n[0] * n[0] + n[1] * n[1]);
}
function cc(n, t) {
  return (n[0] * t[0] + n[1] * t[1]) / (ff(n) * ff(t));
}
function df(n, t) {
  return (n[0] * t[1] < n[1] * t[0] ? -1 : 1) * Math.acos(cc(n, t));
}
function pf(n, t, e, i, s, r, o, a, l, c, h) {
  var u = l * (Ji / 180), f = Pr(u) * (n - e) / 2 + kr(u) * (t - i) / 2, d = -1 * kr(u) * (n - e) / 2 + Pr(u) * (t - i) / 2, p = f * f / (o * o) + d * d / (a * a);
  p > 1 && (o *= sl(p), a *= sl(p));
  var _ = (s === r ? -1 : 1) * sl((o * o * (a * a) - o * o * (d * d) - a * a * (f * f)) / (o * o * (d * d) + a * a * (f * f))) || 0, g = _ * o * d / a, m = _ * -a * f / o, y = (n + e) / 2 + Pr(u) * g - kr(u) * m, v = (t + i) / 2 + kr(u) * g + Pr(u) * m, S = df([1, 0], [(f - g) / o, (d - m) / a]), w = [(f - g) / o, (d - m) / a], x = [(-1 * f - g) / o, (-1 * d - m) / a], M = df(w, x);
  if (cc(w, x) <= -1 && (M = Ji), cc(w, x) >= 1 && (M = 0), M < 0) {
    var T = Math.round(M / Ji * 1e6) / 1e6;
    M = Ji * 2 + T % 2 * Ji;
  }
  h.addData(c, y, v, o, a, S, M, u, r);
}
var Lx = /([mlvhzcqtsa])([^mlvhzcqtsa]*)/ig, Ox = /-?([0-9]*\.)?[0-9]+([eE]-?[0-9]+)?/g;
function Fx(n) {
  var t = new Pi();
  if (!n)
    return t;
  var e = 0, i = 0, s = e, r = i, o, a = Pi.CMD, l = n.match(Lx);
  if (!l)
    return t;
  for (var c = 0; c < l.length; c++) {
    for (var h = l[c], u = h.charAt(0), f = void 0, d = h.match(Ox) || [], p = d.length, _ = 0; _ < p; _++)
      d[_] = parseFloat(d[_]);
    for (var g = 0; g < p; ) {
      var m = void 0, y = void 0, v = void 0, S = void 0, w = void 0, x = void 0, M = void 0, T = e, b = i, I = void 0, C = void 0;
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
          m = e, y = i, I = t.len(), C = t.data, o === a.C && (m += e - C[I - 4], y += i - C[I - 3]), f = a.C, T = d[g++], b = d[g++], e = d[g++], i = d[g++], t.addData(f, m, y, T, b, e, i);
          break;
        case "s":
          m = e, y = i, I = t.len(), C = t.data, o === a.C && (m += e - C[I - 4], y += i - C[I - 3]), f = a.C, T = e + d[g++], b = i + d[g++], e += d[g++], i += d[g++], t.addData(f, m, y, T, b, e, i);
          break;
        case "Q":
          T = d[g++], b = d[g++], e = d[g++], i = d[g++], f = a.Q, t.addData(f, T, b, e, i);
          break;
        case "q":
          T = d[g++] + e, b = d[g++] + i, e += d[g++], i += d[g++], f = a.Q, t.addData(f, T, b, e, i);
          break;
        case "T":
          m = e, y = i, I = t.len(), C = t.data, o === a.Q && (m += e - C[I - 4], y += i - C[I - 3]), e = d[g++], i = d[g++], f = a.Q, t.addData(f, m, y, e, i);
          break;
        case "t":
          m = e, y = i, I = t.len(), C = t.data, o === a.Q && (m += e - C[I - 4], y += i - C[I - 3]), e += d[g++], i += d[g++], f = a.Q, t.addData(f, m, y, e, i);
          break;
        case "A":
          v = d[g++], S = d[g++], w = d[g++], x = d[g++], M = d[g++], T = e, b = i, e = d[g++], i = d[g++], f = a.A, pf(T, b, e, i, x, M, v, S, w, f, t);
          break;
        case "a":
          v = d[g++], S = d[g++], w = d[g++], x = d[g++], M = d[g++], T = e, b = i, e += d[g++], i += d[g++], f = a.A, pf(T, b, e, i, x, M, v, S, w, f, t);
          break;
      }
    }
    (u === "z" || u === "Z") && (f = a.Z, t.addData(f), e = s, i = r), o = f;
  }
  return t.toStatic(), t;
}
var Bx = (function(n) {
  Kn(t, n);
  function t() {
    return n !== null && n.apply(this, arguments) || this;
  }
  return t.prototype.applyTransform = function(e) {
  }, t;
})(lc);
function Nx(n) {
  return n.setData != null;
}
function zx(n, t) {
  var e = Fx(n), i = R({}, t);
  return i.buildPath = function(s) {
    if (Nx(s)) {
      s.setData(e.data);
      var r = s.getContext();
      r && s.rebuildPath(r, 1);
    } else {
      var r = s;
      e.rebuildPath(r, 1);
    }
  }, i.applyTransform = function(s) {
    Px(e, s), this.dirtyShape();
  }, i;
}
function Hx(n, t) {
  return new Bx(zx(n, t));
}
var $x = Ee({
  x: 0,
  y: 0
}, Yn), Gx = {
  style: Ee({
    x: !0,
    y: !0,
    width: !0,
    height: !0,
    sx: !0,
    sy: !0,
    sWidth: !0,
    sHeight: !0
  }, Th.style)
};
function Yx(n) {
  return !!(n && typeof n != "string" && n.width && n.height);
}
var Ch = (function(n) {
  Kn(t, n);
  function t() {
    return n !== null && n.apply(this, arguments) || this;
  }
  return t.prototype.createStyle = function(e) {
    return va($x, e);
  }, t.prototype._getSize = function(e) {
    var i = this.style, s = i[e];
    if (s != null)
      return s;
    var r = Yx(i.image) ? i.image : this.__image;
    if (!r)
      return 0;
    var o = e === "width" ? "height" : "width", a = i[o];
    return a == null ? r[e] : r[e] / r[o] * a;
  }, t.prototype.getWidth = function() {
    return this._getSize("width");
  }, t.prototype.getHeight = function() {
    return this._getSize("height");
  }, t.prototype.getAnimationStyleProps = function() {
    return Gx;
  }, t.prototype.getBoundingRect = function() {
    var e = this.style;
    return this._rect || (this._rect = new yt(e.x || 0, e.y || 0, this.getWidth(), this.getHeight())), this._rect;
  }, t;
})(Mh);
Ch.prototype.type = "image";
function $g(n, t, e, i, s) {
  let r;
  if (t && t.piModel) {
    const l = t.piModel.getUpdatePayload();
    r = l && l.animation;
  }
  const o = t && t.isAnimationEnabled(), a = n === "update";
  if (o) {
    let l, c, h;
    return i ? (l = Wl(i.duration, 200), c = Wl(i.easing, "cubicOut"), h = 0) : (l = t.getShallow(
      a ? "animationDurationUpdate" : "animationDuration"
    ), c = t.getShallow(
      a ? "animationEasingUpdate" : "animationEasing"
    ), h = t.getShallow(
      a ? "animationDelayUpdate" : "animationDelay"
    )), r && (r.duration != null && (l = r.duration), r.easing != null && (c = r.easing), r.delay != null && (h = r.delay)), Xn(h) && (h = h(e, s)), Xn(l) && (l = l(e)), {
      duration: l || 0,
      delay: h,
      easing: c
    };
  } else
    return null;
}
function Vx(n, t, e, i, s, r, o) {
  let a = !1;
  Xn(s) ? (o = r, r = s, s = null) : ae(s) && (r = s.cb, o = s.during, a = s.isFrom, s.removeOpt, s = s.dataIndex), t.stopAnimation("leave");
  const l = $g(
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
function Wx(n, t, e, i, s, r) {
  Vx("update", n, t, e, i, s, r);
}
function Ux(n) {
  if (!n.__zr)
    return !0;
  for (let t = 0; t < n.animators.length; t++)
    if (n.animators[t].scope === "leave")
      return !0;
  return !1;
}
const gi = Math.round;
function qx(n, t, e) {
  if (!t)
    return;
  const i = t.x1, s = t.x2, r = t.y1, o = t.y2;
  n.x1 = i, n.x2 = s, n.y1 = r, n.y2 = o;
  const a = e && e.lineWidth;
  return a && (gi(i * 2) === gi(s * 2) && (n.x1 = n.x2 = gf(i, a)), gi(r * 2) === gi(o * 2) && (n.y1 = n.y2 = gf(r, a))), n;
}
function gf(n, t, e) {
  if (!t)
    return n;
  const i = gi(n * 2);
  return (i + gi(t)) % 2 === 0 ? i / 2 : (i + 1) / 2;
}
const jn = pt(), Zx = (n, t, e, i) => {
  if (i) {
    const s = jn(i);
    s.dataIndex = e, s.dataType = t, s.seriesIndex = n, i.type === "group" && i.traverse(function(r) {
      const o = jn(r);
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
const hc = {};
function Xx(n, t) {
  const e = zrender.matrix.identity([]);
  for (; n && n !== t; )
    zrender.matrix.mul(e, n.getLocalTransform(), e), n = n.parent;
  return e;
}
function Io(n, t, e) {
  return t && !jt(t) && (t = wh.getLocalTransform(t)), e && (t = zrender.matrix.invert([], t)), zrender.vector.applyTransform([], n, t);
}
function Kx(n, t, e) {
  const i = t[4] === 0 || t[5] === 0 || t[0] === 0 ? 1 : Math.abs(2 * t[4] / t[0]), s = t[4] === 0 || t[5] === 0 || t[2] === 0 ? 1 : Math.abs(2 * t[4] / t[2]);
  let r = [
    n === "left" ? -i : n === "right" ? i : 0,
    n === "top" ? -s : n === "bottom" ? s : 0
  ];
  return r = Io(r, t, e), Math.abs(r[0]) > Math.abs(r[1]) ? r[0] > 0 ? "right" : "left" : r[1] > 0 ? "bottom" : "top";
}
function _f(n, t) {
  let e;
  n.isGroup && (e = t(n)), e || n.traverse(t);
}
function jx(n, t) {
  if (n)
    if (Ri(n))
      for (let e = 0; e < n.length; e++)
        _f(n[e], t);
    else
      _f(n, t);
}
function Gg(n, t, e, i) {
  const s = Hx(n, t);
  return e && (i === "center" && (e = Yg(e, s.getBoundingRect())), Jx(s, e)), s;
}
function Qx(n, t, e) {
  const i = new Ch({
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
        i.setStyle(Yg(t, r));
      }
    }
  });
  return i;
}
function Yg(n, t) {
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
function Jx(n, t) {
  if (!n.applyTransform)
    return;
  const i = n.getBoundingRect().calculateTransform(t);
  n.applyTransform(i);
}
function Vg(n, t) {
  return qx(n, n, { lineWidth: t }), n;
}
function Hi(n, t) {
  hc[n] = t;
}
function tw(n) {
  if (hc.hasOwnProperty(n))
    return hc[n];
}
function ew(n, t, e) {
  if (!n || !t)
    return;
  function i(o) {
    const a = {};
    return o.traverse(function(l) {
      mf(l) && l.anid && (a[l.anid] = l);
    }), a;
  }
  function s(o) {
    const a = {
      x: o.x,
      y: o.y,
      rotation: o.rotation
    };
    return nw(o) && (a.shape = R({}, o.shape)), a;
  }
  const r = i(n);
  t.traverse(function(o) {
    if (mf(o) && o.anid) {
      const a = r[o.anid];
      if (a) {
        const l = s(o);
        o.attr(s(a)), Wx(o, l, e, jn(o).dataIndex);
      }
    }
  });
}
function mf(n) {
  return !n.isGroup;
}
function nw(n) {
  return n.shape != null;
}
Hi("rect", zrender.Rect);
Hi("line", zrender.Line);
Hi("circle", zrender.Circle);
Hi("polygon", zrender.Polygon);
Hi("polyline", zrender.Polyline);
Hi("arc", zrender.Arc);
const Lr = 4, iw = 6, sw = 1, yf = 30, vf = 5, xf = 5, wf = 30, Sf = 0.8, bf = 0.2, J = "horizontal", ts = "vertical", Ko = class Ko extends Ql {
  constructor() {
    super(...arguments), this.type = Ko.type, this._displayables = {}, this._layoutRafId = null, this._pendingLayoutPosition = null, this._layoutChanged = !1;
  }
  init(t, e) {
    this.api = e;
  }
  render(t, e, i) {
    super.render.apply(this, arguments), this._orient = t.get("orient"), this._buildView();
  }
  _buildView() {
    this._cancelLayoutFrame();
    const t = this.group;
    t.removeAll(), t.attr({ z: 99 });
    const e = this._displayables.sliderGroup = new zrender.Group(), i = this._getGridRect(), s = this.api;
    if (this._orient === ts && i) {
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
    if (this._orient === ts && r)
      this._hanldeEnd = r.x, this._size = [r.x, 0];
    else if (this._orient === J) {
      const o = this._getHorizontalDataZoomBottom() + sw;
      this._horizontalMinHandleEnd == null && (this._horizontalMinHandleEnd = this._getHorizontalDragMinHandleEnd(r)), this._horizontalMaxHandleEnd == null && (this._horizontalMaxHandleEnd = o), i === void 0 ? this._hanldeEnd = o : this._hanldeEnd = s.height * fc(i, this._orient), this._hanldeEnd = Math.max(
        this._horizontalMinHandleEnd,
        Math.min(this._hanldeEnd, this._horizontalMaxHandleEnd)
      ), this._size = [0, this._hanldeEnd];
    } else
      this._size = [s.width * fc(i, this._orient), 0], this._hanldeEnd = this._size[1];
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
      i = Vs(
        Ys(s.option),
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
      const r = Vs(
        Ys(s.option),
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
      cursor: Tf(this._orient),
      zlevel: s,
      z2: 1e4
    });
    o.attr({
      x: this._orient === ts ? this._size[0] : 0,
      y: this._orient === J ? this._size[1] : 0
    });
    const a = new zrender.Image({
      style: {
        image: r,
        width: this._orient === J ? yf : xf,
        height: this._orient === J ? vf : wf
      },
      cursor: Tf(this._orient),
      zlevel: s,
      z2: 10001
    });
    this._orient === J && (a.__testId = "horizontal-split-handle"), a.attr(this._getHandleIconPosition(this._hanldeEnd)), t.add(o), t.add(a), t.attr({
      draggable: !0,
      drift: L(this._onDragMove, this),
      ondragend: L(this._onDrageEnd, this)
    }), this._displayables.handle = o, this._displayables.handleIcon = a;
  }
  _getHandleIconPosition(t) {
    return this._orient === J ? {
      x: this.api.getWidth() / 2 - yf / 2,
      y: t + Lr / 2 - vf / 2
    } : {
      x: t + Lr / 2 - xf / 2,
      y: this.api.getHeight() / 2 - wf / 2
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
      x: this._orient === ts ? t : 0,
      y: this._orient === J ? t : 0
    }), this._displayables.handleIcon.attr(
      this._getHandleIconPosition(t)
    );
  }
  _onDragMove(t, e, i) {
    this._dragging = !0, Nt(i.event);
    const s = this._displayables.sliderGroup.getLocalTransform(), r = Io([t, e], s, !0), o = this._orient === J ? r[1] : r[0];
    this.updateInterval(o), !this._boundaryDefinition() && (this._updateView(), this._layoutChanged = !0, this._pendingLayoutPosition = this._hanldeEnd, this._layoutRafId == null && (this._layoutRafId = requestAnimationFrame(() => {
      this._layoutRafId = null, this._flushLayoutPosition(!1);
    })));
  }
  _onDrageEnd() {
    this._dragging = !1, this._layoutChanged && (this._cancelLayoutFrame(), this._pendingLayoutPosition = this._hanldeEnd, this._flushLayoutPosition(!0), this._layoutChanged = !1);
  }
  dispose() {
    this._cancelLayoutFrame(), super.dispose.apply(this, arguments);
  }
  _flushLayoutPosition(t) {
    const e = this._pendingLayoutPosition;
    if (this._pendingLayoutPosition = null, e != null) {
      if (this._orient === ts)
        this.api.dispatchAction({
          type: "updateYAxisPosition",
          data: { x: e }
        });
      else {
        const i = e / this.api.getHeight();
        this.splitModel.option.ratio = i, this.api.dispatchAction({
          type: "updateUnassignedBoardPosition",
          data: { y: e }
        });
      }
      t && this.api.dispatchAction({
        type: "commitGanttLayout",
        animation: { duration: 0 }
      });
    }
  }
  _cancelLayoutFrame() {
    this._layoutRafId != null && (cancelAnimationFrame(this._layoutRafId), this._layoutRafId = null), this._pendingLayoutPosition = null;
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
    jx(this.group, t);
  }
  getOrient() {
    return this._orient;
  }
  getPos() {
    var t, e;
    return (e = (t = this._displayables) == null ? void 0 : t.sliderGroup) == null ? void 0 : e.getBoundingRect();
  }
};
Ko.type = "split.slider";
let uc = Ko;
function fc(n, t) {
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
      e = t === J ? Sf : bf;
  }
  return t === J ? Sf : bf;
}
function Tf(n) {
  return n == "vertical" ? "col-resize" : "row-resize";
}
const _i = class _i extends W {
  constructor() {
    super(...arguments), this.type = _i.type;
  }
  getOrient() {
    return this._orient;
  }
};
_i.type = "split", _i.dependencies = [], _i.defaultOption = {
  z: 10
};
let Eo = _i;
const Rs = class Rs extends Eo {
  constructor() {
    super(...arguments), this.type = Rs.type;
  }
};
Rs.type = "split.slider", Rs.defaultOption = oh(
  Eo.defaultOption,
  {
    show: !0,
    backgroundColor: "#eee",
    zlevel: 1e3
  }
);
let dc = Rs;
function rw(n) {
  n.registerComponentModel(dc), n.registerComponentView(uc), Iv(n), n.registerSubTypeDefaulter("split", function() {
    return "slider";
  });
}
class ow {
  constructor(t) {
    this.coordSysDims = [], this.axisMap = B(), this.categoryAxisMap = B(), this.coordSysName = t;
  }
}
function aw(n) {
  const t = n.get("coordinateSystem"), e = new ow(t), i = lw[t];
  if (i)
    return i(
      n,
      e,
      e.axisMap,
      e.categoryAxisMap
    ), e;
}
const lw = {
  cartesian2d: function(n, t, e, i) {
    const s = n.getReferringComponents(
      "xAxis",
      De
    ).models[0], r = n.getReferringComponents(
      "yAxis",
      De
    ).models[0];
    t.coordSysDims = ["x", "y"], e.set("x", s), e.set("y", r), Mf(s) && (i.set("x", s), t.firstCategoryDimIndex = 0), Mf(r) && (i.set("y", r), t.firstCategoryDimIndex == null && (t.firstCategoryDimIndex = 1));
  }
};
function Mf(n) {
  return n.get("type") === "category";
}
function cw(n) {
  return n === "category" ? "ordinal" : n === "time" ? "time" : "float";
}
function hw(n, t) {
  const e = {}, i = e.encode = {}, s = B();
  let r = [], o = [];
  const a = {};
  D(n.dimensions, function(f) {
    const d = n.getDimensionInfo(f), p = d.coordDim;
    if (p) {
      const _ = d.coordDimIndex;
      rl(i, p)[_] = f, d.isExtraCoord || (s.set(p, 1), uw(d.type) && (r[0] = f), rl(a, p)[_] = n.getDimensionIndex(d.name)), d.defaultTooltip && o.push(f);
    }
    Hp.each(function(_, g) {
      const m = rl(i, g), y = d.otherDims[g];
      y != null && y !== !1 && (m[y] = d.name);
    });
  });
  let l = [];
  const c = {};
  s.each(function(f, d) {
    const p = i[d];
    c[d] = p[0], l = l.concat(p);
  }), e.dataDimsOnCoord = l, e.dataDimIndicesOnCoord = G(
    l,
    (f) => n.getDimensionInfo(f).storeDimIndex
  ), e.encodeFirstDimNotExtra = c;
  const h = i.label;
  h && h.length && (r = h.slice());
  const u = i.tooltip;
  return u && u.length ? o = u.slice() : o.length || (o = r.slice()), i.defaultedLabel = r, i.defaultedTooltip = o, e.userOutput = new fw(a, t), e;
}
function rl(n, t) {
  return n.hasOwnProperty(t) || (n[t] = []), n[t];
}
function uw(n) {
  return !(n === "ordinal" || n === "time");
}
class fw {
  constructor(t, e) {
    this._encode = t, this._schema = e;
  }
}
class ro {
  constructor(t) {
    this.otherDims = {}, t != null && N(this, t);
  }
}
function ol(n) {
  return n == null ? 0 : n.length || 1;
}
function Cf(n) {
  return n;
}
class Wg {
  constructor(t, e, i, s, r, o) {
    this._old = t, this._new = e, this._oldKeyGetter = i || Cf, this._newKeyGetter = s || Cf, this.context = r, this._diffModeMultiple = o === "multiple";
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
      const a = s[o], l = i[a], c = ol(l);
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
      const l = e[a], c = ol(l);
      c === 0 ? (e[a] = o, r && i.push(a)) : c === 1 ? e[a] = [l, o] : l.push(o);
    }
  }
  _performRestAdd(t, e) {
    for (let i = 0; i < t.length; i++) {
      const s = t[i], r = e[s], o = ol(r);
      if (o > 1)
        for (let a = 0; a < o; a++)
          this._add && this._add(r[a]);
      else o === 1 && this._add && this._add(r);
      e[s] = null;
    }
  }
}
const dw = typeof Int32Array == "undefined" ? Array : Int32Array, pw = "p\0\0", gw = -1, _w = [
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
], mw = ["_approximateExtent"];
let Df, Or, Fr, es, al, If, Ef;
const As = class As {
  constructor(t, e) {
    this._idList = [], this._calculationInfo = {}, this._visual = {}, this._graphicEls = [], this._itemVisuals = [], this._dimOmitted = !1, this.hasItemOption = !1, this.TRANSFERABLE_METHODS = [
      "cloneShallow",
      "downSample",
      "lttbDownSample",
      "map"
    ], this.CHANGABLE_METHODS = ["filterSelf", "selectRange"], this.DOWNSAMPLE_METHODS = ["downSample", "lttbDownSample"], this._nameList = [], this._approximateExtent = {};
    let i;
    fg(t) ? (i = t.dimensions, this._dimOmitted = t.isDimensionOmitted(), this._schema = t) : i = t, i = i || ["x", "y"];
    const s = {};
    let r = !1;
    const o = [], a = {};
    for (let l = 0; l < (i == null ? void 0 : i.length); l++) {
      const c = i[l], h = Z(c) ? new ro({ name: c }) : c instanceof ro ? c : new ro(c), u = h == null ? void 0 : h.name;
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
    return Fr(this, this.getRawIndex(t));
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
    return new Et(i, e, e && e.piModel);
  }
  _getCategory(t, e) {
    const i = this._store.get(t, e), s = this._store.getOrdinalMeta(t);
    return s ? s.categories[i] : i;
  }
  initData(t, e, i) {
    let s;
    if (t instanceof Ws && (s = t), !s) {
      const r = this.dimensions, o = fh(t) || It(t) ? new yo(
        t,
        r == null ? void 0 : r.length
      ) : t;
      s = new Ws();
      const a = G(
        r,
        (l) => ({
          type: this._dimInfos[l].type,
          property: l
        })
      );
      s.initData(o, a, i);
    }
    this._store = s, this._nameList = (e || []).slice(), this._idList = [], this._nameRepeatCount = {}, this._doInit(0, s.count()), this._dimSummary = hw(this, this._schema), this.userOutput = this._dimSummary.userOutput;
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
    if (s.getSource().sourceFormat === he && !s.pure) {
      const c = [];
      for (let h = t; h < e; h++) {
        const u = s.getItem(h, c);
        if (!this.hasItemOption && dm(u) && (this.hasItemOption = !0), u) {
          const f = u.name;
          r[h] == null && f != null && (r[h] = He(f, null));
          const d = u.id;
          o[h] == null && d != null && (o[h] = He(d, null));
        }
      }
    }
    if (this._shouldMakeIdFromName())
      for (let c = t; c < e; c++)
        Ef(this, c);
    Df(this);
  }
  _shouldMakeIdFromName() {
    const t = this._store.getProvider();
    return this._idDimIdx == null && t.getSource().sourceFormat !== nn && !t.fillStorage;
  }
  //创建一个数据的对比器
  diff(t) {
    const e = this;
    return new Wg(
      t ? t.getStore().getIndices() : [],
      this.getStore().getIndices(),
      function(i) {
        return Fr(t, i);
      },
      function(i) {
        return Fr(e, i);
      }
    );
  }
  /**
   * Set graphic element relative to data. It can be set as null
   */
  setItemGraphicEl(t, e) {
    const i = this.hostModel && this.hostModel.seriesIndex;
    Zx(i, this.dataType, t, e), this._graphicEls[t] = e;
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
    if (Te(t) || // If being a number-like string but not being defined as a dimension name.
    t != null && !isNaN(t) && !this._getDimInfo(t) && (!this._dimOmitted || this._schema.getSourceDimensionIndex(t) < 0))
      return +t;
  }
  count() {
    return this._store.count();
  }
  cloneShallow(t) {
    return t || (t = new As(
      this._schema ? this._schema : G(this.dimensions, this._getDimInfo, this),
      this.hostModel
    )), al(t, this), t._store = this._store, t;
  }
  each(t, e, i) {
    Q(t) && (i = e, e = t, t = []);
    const s = i || this, r = G(
      Or(t),
      this._getStoreDimIndex,
      this
    );
    this._store.each(
      r,
      s ? L(e, s) : e
    );
  }
  filterSelf(t, e, i) {
    Q(t) && (i = e, e = t, t = []);
    const s = i || this, r = G(
      Or(t),
      this._getStoreDimIndex,
      this
    );
    return this._store = this._store.filter(
      r,
      s ? L(e, s) : e
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
    const r = i || s || this, o = G(
      Or(t),
      this._getStoreDimIndex,
      this
    ), a = If(this);
    return a._store = this._store.map(o, r ? L(e, r) : e), a;
  }
  wrapMethod(t, e) {
    const i = this[t];
    Q(i) && (this.__wrappedMethods = this.__wrappedMethods || [], this.__wrappedMethods.push(t), this[t] = function() {
      const s = i.apply(this, arguments);
      return e.apply(this, [s].concat(ih(arguments)));
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
    return i == null && this._nameDimIdx != null && (i = es(this, this._nameDimIdx, e)), i == null && (i = ""), i;
  }
  setCalculationInfo(t, e) {
    F(t) ? N(this._calculationInfo, t) : this._calculationInfo[t] = e;
  }
  getCalculationInfo(t) {
    return this._calculationInfo[t];
  }
  // eslint-disable-next-line
  setItemVisual(t, e, i) {
    const s = this._itemVisuals[t] || {};
    this._itemVisuals[t] = s, F(e) ? N(s, e) : s[e] = i;
  }
  clearAllVisual() {
    this._visual = {}, this._itemVisuals = [];
  }
};
As.internalField = (function() {
  Df = function(t) {
    const e = t._invertedIndicesMap;
    D(e, function(i, s) {
      const r = t._dimInfos[s], o = r.ordinalMeta, a = t._store;
      if (o) {
        i = e[s] = new dw(
          o.categories.length
        );
        for (let l = 0; l < i.length; l++)
          i[l] = gw;
        for (let l = 0; l < a.count(); l++)
          i[a.get(r.storeDimIndex, l)] = l;
      }
    });
  }, Or = function(t) {
    return K(t) || (t = t !== null ? [t] : []), t;
  }, If = function(t) {
    const e = new As(
      t._schema ? t._schema : G(t.dimensions, t._getDimInfo, t),
      t.hostModel
    );
    return al(e, t), e;
  }, al = function(t, e) {
    D(
      _w.concat(e.__wrappedMethods || []),
      function(i) {
        e.hasOwnProperty(i) && (t[i] = e[i]);
      }
    ), t.__wrappedMethods = e.__wrappedMethods, D(mw, function(i) {
      t[i] = U(e[i]);
    }), t._calculationInfo = N({}, e._calculationInfo);
  }, Fr = function(t, e) {
    let i = t._idList[e];
    return i == null && t._idDimIdx != null && (i = es(t, t._idDimIdx, e)), i == null && (i = pw + e), i;
  }, es = function(t, e, i) {
    return He(t._getCategory(e, i), null);
  }, Ef = function(t, e) {
    const i = t._nameList, s = t._idList, r = t._nameDimIdx, o = t._idDimIdx;
    let a = i[e], l = s[e];
    if (a == null && r != null && (i[e] = a = es(t, r, e)), l == null && o != null && (s[e] = l = es(t, o, e)), l == null && a != null) {
      const c = t._nameRepeatCount, h = c[a] = (c[a] || 0) + 1;
      l = a, h > 1 && (l += "__pi__" + h), s[e] = l;
    }
  };
})();
let pc = As;
function yw(n, t) {
  fh(n) || (n = Vp(n)), t = t || {};
  const e = t.coordDimensions || [], i = t.dimensionsDefine || n.dimensionsDefine || [], s = B(), r = [], o = xw(n, e, i, t.dimensionsCount), a = t.canOmitUnusedDimensions && C1(o), l = i === n.dimensionsDefine, c = l ? pg(n) : dg(i);
  let h = t.encodeDefine;
  !h && t.encodeDefaulter && (h = t.encodeDefaulter(n, o));
  const u = B(
    h
  ), f = new dy(o);
  for (let w = 0; w < f.length; w++)
    f[w] = -1;
  function d(w) {
    const x = f[w];
    if (x < 0) {
      const M = i[w], T = F(M) ? M : { name: M }, b = new ro(), I = T.name;
      I != null && c.get(I) != null && (b.name = b.displayName = I), T.type != null && (b.type = T.type), T.displayName != null && (b.displayName = T.displayName);
      const C = r.length;
      return f[w] = C, b.storeDimIndex = w, r.push(b), b;
    }
    return r[x];
  }
  if (!a)
    for (let w = 0; w < o; w++)
      d(w);
  u.each(function(w, x) {
    const M = Xt(w).slice();
    if (M.length === 1 && !Z(M[0]) && M[0] < 0) {
      u.set(x, !1);
      return;
    }
    const T = u.set(x, []);
    D(M, function(b, I) {
      const C = Z(b) ? c.get(b) : b;
      C != null && C < o && (T[I] = C, _(d(C), x, I));
    });
  });
  let p = 0;
  D(e, function(w) {
    let x, M, T, b;
    if (Z(w))
      x = w, b = {};
    else {
      b = w, x = b.name;
      const C = b.ordinalMeta;
      b.ordinalMeta = null, b = N({}, b), b.ordinalMeta = C, M = b.dimsDef, T = b.otherDims, b.name = b.coordDim = b.coordDimIndex = b.dimsDef = b.otherDims = null;
    }
    let I = u.get(x);
    if (I !== !1) {
      if (I = Xt(I), !I.length)
        for (let C = 0; C < (M && M.length || 1); C++) {
          for (; p < o && d(p).coordDim != null; )
            p++;
          p < o && I.push(p++);
        }
      D(I, function(C, E) {
        const A = d(C);
        if (l && b.type != null && (A.type = b.type), _(xt(A, b), x, E), A.name == null && M) {
          let P = M[E];
          !F(P) && (P = {
            name: P
          }), A.name = A.displayName = P.name, A.defaultTooltip = P.defaultTooltip;
        }
        T && xt(A.otherDims, T);
      });
    }
  });
  function _(w, x, M) {
    Hp.get(x) != null ? w.otherDims[x] = M : (w.coordDim = x, w.coordDimIndex = M, s.set(x, !0));
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
      x.coordDim == null && (x.coordDim = ww(v, s, y), x.coordDimIndex = 0, (!g || m <= 0) && (x.isExtraCoord = !0), m--), S(x), x.type == null && (Yp(n, w) === bt.Must || // Consider the case:
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
  return vw(r), new ug({
    source: n,
    dimensions: r,
    fullDimensionCount: o,
    dimensionOmitted: a
  });
}
function vw(n) {
  const t = B();
  for (let e = 0; e < n.length; e++) {
    const i = n[e], s = i.name;
    let r = t.get(s) || 0;
    r > 0 && (i.name = s + (r - 1)), r++, t.set(s, r);
  }
}
function xw(n, t, e, i) {
  let s = Math.max(
    n.dimensionsDetectedCount || 1,
    t.length,
    e.length,
    i || 0
  );
  return D(t, function(r) {
    let o;
    F(r) && (o = r.dimsDef) && (s = Math.max(s, o.length));
  }), s;
}
function ww(n, t, e) {
  if (e || t.hasKey(n)) {
    let i = 0;
    for (; t.hasKey(n + i); )
      i++;
    n += i;
  }
  return t.set(n, !0), n;
}
function Sw(n, t) {
  const e = n.get("coordinateSystem"), i = Us.get(e);
  let s;
  return t && t.coordSysDims && (s = G(t.coordSysDims, function(r) {
    const o = {
      name: r
    }, a = t.axisMap.get(r);
    if (a) {
      const l = a.get("type");
      o.type = cw(l);
    }
    return o;
  })), s || (s = i && (i.getDimensionsInfo ? i.getDimensionsInfo() : i.dimensions.slice()) || ["x", "y"]), s;
}
function bw(n, t, e) {
  e = e || {};
  const i = t.getSourceManager();
  let s, r = !1;
  s = i.getSource(), r = s.sourceFormat === he;
  const o = aw(t), a = Sw(t, o), l = e.useEncodeDefaulter, c = Q(l) ? l : l ? po(
    my,
    a,
    t
  ) : null, h = {
    coordDimensions: a,
    generateCoord: e.generateCoord,
    encodeDefine: t.getEncode(),
    encodeDefaulter: c,
    canOmitUnusedDimensions: !r
  }, u = yw(s, h), f = Tw(
    u == null ? void 0 : u.dimensions,
    e.createInvertedIndices,
    o
  ), d = r ? null : i.getSharedDataStore(u), p = E1(t, { schema: u, store: d }), _ = new pc(u, t);
  _.setCalculationInfo(p);
  const g = f != null && Mw(s) ? function(m, y, v, S) {
    return S === f ? v : this.defaultDimValueGetter(m, y, v, S);
  } : null;
  return _.hasItemOption = !1, _.initData(
    // Try to reuse the data store in sourceManager if using dataset.
    r ? s : d,
    null,
    g
  ), _;
}
function Tw(n, t, e) {
  let i, s;
  return e && D(n, function(r, o) {
    const a = r.coordDim, l = e.categoryAxisMap.get(a);
    l && (i == null && (i = o), r.ordinalMeta = l.getOrdinalMeta(), t && (r.createInvertedIndices = !0)), r.otherDims.itemName != null && (s = !0);
  }), !s && i != null && (n[i].otherDims.itemName = 0), i;
}
function Mw(n) {
  if (n.sourceFormat === he) {
    const t = Cw(n.data || []);
    return !K(da(t));
  }
}
function Cw(n) {
  let t = 0;
  for (; t < n.length && n[t] == null; )
    t++;
  return n[t];
}
pt();
const rn = pt(), ks = class ks extends vo {
  constructor() {
    super(...arguments), this.type = ks.type;
  }
  getInitialData(t, e) {
    return bw(null, this);
  }
};
ks.type = "series.custom", ks.defaultOption = {
  coordinateSystem: "cartesian2d",
  z: 2,
  clip: !1
};
let gc = ks;
function Dw(n, t) {
  return t = t || [0, 0], G(
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
function Iw(n) {
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
      size: L(Dw, n)
    }
  };
}
const _c = ["", "style", "shape", "extra"], Ug = {
  position: ["x", "y"],
  scale: ["scaleX", "scaleY"],
  origin: ["originX", "originY"]
}, Rf = vt(Ug), xe = {}, Ew = {
  // Usually other props do not need to be changed in animation during.
  setTransform(n, t) {
    return xe.el[n] = t, this;
  },
  getTransform(n) {
    return xe.el[n];
  },
  setShape(n, t) {
    const e = xe.el, i = e.shape || (e.shape = {});
    return i[n] = t, e.dirtyShape && e.dirtyShape(), this;
  },
  getShape(n) {
    const t = xe.el.shape;
    if (t)
      return t[n];
  },
  setStyle(n, t) {
    const e = xe.el, i = e.style;
    return i && (i[n] = t, e.dirtyStyle && e.dirtyStyle()), this;
  },
  getStyle(n) {
    const t = xe.el.style;
    if (t)
      return t[n];
  },
  setExtra(n, t) {
    const e = xe.el.extra || (xe.el.extra = {});
    return e[n] = t, this;
  },
  getExtra(n) {
    const t = xe.el.extra;
    if (t)
      return t[n];
  }
}, Li = pt();
function Dh(n, t, e, i, s) {
  const r = `${n}Animation`, o = $g(n, i, s) || {}, a = Li(t).userDuring;
  return o.duration > 0 && (o.during = a ? Yl(Aw, { el: t, userDuring: a }) : null, o.setToFinal = !0, o.scope = n), R(o, e[r]), o;
}
function Ih(n, t, e, i) {
  if (n) {
    const s = n.parent, r = Li(n).leaveToProps;
    if (r) {
      const o = Dh(
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
function Rw(n, t, e, i) {
  i = i || {};
  const { dataIndex: s, isInit: r, clearStyle: o } = i, a = e.isAnimationEnabled(), l = Li(n), c = t.style;
  l.userDuring = t.during;
  const h = {}, u = {};
  if (Pw(n, t, u), kf("shape", t, u), kf("extra", t, u), !r && a && (kw(n, t, h), Af("shape", n, t, h), Af("extra", n, t, h), Lw(n, t, c, h)), u.style = c, Ow(n, u, o), Nw(n, t), a)
    if (r) {
      const f = {};
      nt(_c, (p) => {
        const _ = p ? t[p] : t;
        _ && _.enterFrom && (p && (f[p] = f[p] || {}), R(
          p ? f[p] : f,
          _.enterFrom
        ));
      });
      const d = Dh(
        "enter",
        n,
        t,
        e,
        s
      );
      d.duration > 0 && n.animateFrom(f, d);
    } else
      Bw(
        n,
        t,
        s || 0,
        e,
        h
      );
  Fw(n, t), c ? n.dirty() : n.markRedraw();
}
function Aw() {
  const n = this, t = n.el;
  if (!t)
    return;
  const e = Li(t).userDuring, i = n.userDuring;
  if (e !== i) {
    n.el = n.userDuring = null;
    return;
  }
  xe.el = t, i(Ew);
}
function Af(n, t, e, i) {
  const s = e[n];
  if (!s)
    return;
  const r = t[n];
  let o;
  if (r) {
    const a = e.transition, l = s.transition;
    if (l)
      if (!o && (o = i[n] = {}), Ti(l))
        R(o, r);
      else {
        const c = Xt(l);
        for (let h = 0; h < c.length; h++) {
          const u = c[h], f = r[u];
          o[u] = f;
        }
      }
    else if (Ti(a) || Ct(a, n) >= 0) {
      !o && (o = i[n] = {});
      const c = vt(r);
      for (let h = 0; h < c.length; h++) {
        const u = c[h], f = r[u];
        zw(s[u], f) && (o[u] = f);
      }
    }
  }
}
function kf(n, t, e) {
  const i = t[n];
  if (!i)
    return;
  const s = e[n] = {}, r = vt(i);
  for (let o = 0; o < r.length; o++) {
    const a = r[o];
    s[a] = Ms(i[a]);
  }
}
function kw(n, t, e) {
  const i = t.transition, s = Ti(i) ? cn : Xt(i || []);
  for (let r = 0; r < s.length; r++) {
    const o = s[r];
    if (o === "style" || o === "shape" || o === "extra")
      continue;
    const a = n[o];
    e[o] = a;
  }
}
function Pw(n, t, e) {
  for (let i = 0; i < Rf.length; i++) {
    const s = Rf[i], r = Ug[s], o = t[s];
    o && (e[r[0]] = o[0], e[r[1]] = o[1]);
  }
  for (let i = 0; i < cn.length; i++) {
    const s = cn[i];
    t[s] != null && (e[s] = t[s]);
  }
}
function Lw(n, t, e, i) {
  if (!e)
    return;
  const s = n.style;
  let r;
  if (s) {
    const o = e.transition, a = t.transition;
    if (o && !Ti(o)) {
      const l = Xt(o);
      !r && (r = i.style = {});
      for (let c = 0; c < l.length; c++) {
        const h = l[c], u = s[h];
        r[h] = u;
      }
    } else if (n.getAnimationStyleProps && (Ti(a) || Ti(o) || Ct(a, "style") >= 0)) {
      const l = n.getAnimationStyleProps(), c = l ? l.style : null;
      if (c) {
        !r && (r = i.style = {});
        const h = vt(e);
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
function Ow(n, t, e) {
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
function Fw(n, t) {
  let e = Li(n).leaveToProps;
  for (let i = 0; i < _c.length; i++) {
    const s = _c[i], r = s ? t[s] : t;
    r && r.leaveTo && (e || (e = Li(n).leaveToProps = {}), s && (e[s] = e[s] || {}), R(
      s ? e[s] : e,
      r.leaveTo
    ));
  }
}
function Bw(n, t, e, i, s) {
  if (s) {
    const r = Dh(
      "update",
      n,
      t,
      i,
      e
    );
    r.duration > 0 && n.animateFrom(s, r);
  }
}
function Nw(n, t) {
  fr(t, "silent") && (n.silent = t.silent), fr(t, "ignore") && (n.ignore = t.ignore), n instanceof zrender.Displayable && fr(t, "invisible") && (n.invisible = t.invisible), n instanceof zrender.Path && fr(t, "autoBatch") && (n.autoBatch = t.autoBatch);
}
function Ti(n) {
  return n === "all";
}
function zw(n, t) {
  return jt(n) ? n !== t : n != null && isFinite(n);
}
const Hw = pt();
function $w(n) {
  n.stopAnimation("keyframe"), n.attr(Hw(n));
}
const Gw = (void 0).extend({
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
}), Yw = (void 0).extend({
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
}), Vw = (void 0).extend({
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
}), Ww = (void 0).extend({
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
}), Uw = {
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
}, qw = {
  line: void 0,
  rect: void 0,
  roundRect: void 0,
  square: void 0,
  circle: void 0,
  diamond: Yw,
  pin: Vw,
  arrow: Ww,
  triangle: Gw
}, Ro = {};
nt(qw, function(n, t) {
  Ro[t] = new n();
});
const Zw = (void 0).extend({
  type: "symbol",
  shape: {
    symbolType: "",
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  calculateTextPosition(n, t, e) {
    const i = Fg(n, t, e), s = this.shape;
    return s && s.symbolType === "pin" && t.position === "inside" && (i.y = e.y + e.height * 0.4), i;
  },
  buildPath(n, t, e) {
    let i = t.symbolType;
    if (i !== "none") {
      let s = Ro[i];
      s || (i = "rect", s = Ro[i]), Uw[i](
        t.x,
        t.y,
        t.width,
        t.height,
        s.shape
      ), s.buildPath(n, s.shape, e);
    }
  }
});
function Xw(n, t) {
  if (this.type !== "image") {
    const e = this.style;
    this.__isEmptyBrush ? (e.stroke = n, e.fill = t || "#fff", e.lineWidth = 2) : this.shape.symbolType === "line" ? e.stroke = n : e.fill = n, this.markRedraw();
  }
}
function Ao(n, t, e, i, s, r, o) {
  const a = n.indexOf("empty") === 0;
  a && (n = n.substr(5, 1).toLowerCase() + n.substr(6));
  let l;
  return n.indexOf("image://") === 0 ? l = Qx(
    n.slice(8),
    new Dt(t, e, i, s),
    o ? "center" : "cover"
  ) : n.indexOf("path://") === 0 ? l = Gg(
    n.slice(7),
    {},
    new Dt(t, e, i, s),
    o ? "center" : "cover"
  ) : l = new Zw({
    shape: {
      symbolType: n,
      x: t,
      y: e,
      width: i,
      height: s
    }
  }), l.__isEmptyBrush = a, l.setColor = Xw, r && l.setColor(r), l;
}
function Kw(n, t) {
  if (n != null)
    return Ri(n) || (n = [n, n]), [
      ki(n[0], t[0]) || 0,
      ki(Wl(n[1], n[0]), t[1]) || 0
    ];
}
function $i(n, t) {
  return n == null && (n = 0), t == null && (t = 0), [n, t];
}
function jw(n, t) {
  return (n[0] - t[0]) * (n[0] - t[0]) + (n[1] - t[1]) * (n[1] - t[1]);
}
const Mi = jw;
function Pf(n, t, e) {
  const i = t[0], s = t[1];
  return n[0] = e[0] * i + e[2] * s + e[4], n[1] = e[1] * i + e[3] * s + e[5], n;
}
function qg(n, t, e) {
  return n[0] = Math.min(t[0], e[0]), n[1] = Math.min(t[1], e[1]), n;
}
function Zg(n, t, e) {
  return n[0] = Math.max(t[0], e[0]), n[1] = Math.max(t[1], e[1]), n;
}
const Lf = Op, Of = 5e-5;
function In(n) {
  return n > Of || n < -Of;
}
const En = [], oi = [], ll = mo(), cl = Math.abs, Ps = class Ps {
  /**
   * Get computed local transform
   */
  getLocalTransform(t) {
    return Ps.getLocalTransform(this, t);
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
    return In(this.rotation) || In(this.x) || In(this.y) || In(this.scaleX - 1) || In(this.scaleY - 1) || In(this.skewX) || In(this.skewY);
  }
  /**
   * Update global transform
   */
  updateTransform() {
    const t = this.parent && this.parent.transform, e = this.needLocalTransform();
    let i = this.transform;
    if (!(e || t)) {
      i && Lf(i);
      return;
    }
    i = i || mo(), e ? this.getLocalTransform(i) : Lf(i), t && (e ? ys(i, t, i) : ny(i, t)), this.transform = i, this._resolveGlobalScaleRatio(i);
  }
  _resolveGlobalScaleRatio(t) {
    const e = this.globalScaleRatio;
    if (e != null && e !== 1) {
      this.getGlobalScale(En);
      const i = En[0] < 0 ? -1 : 1, s = En[1] < 0 ? -1 : 1, r = ((En[0] - i) * e + i) / En[0] || 0, o = ((En[1] - s) * e + s) / En[1] || 0;
      t[0] *= r, t[1] *= r, t[2] *= o, t[3] *= o;
    }
    this.invTransform = this.invTransform || mo(), sy(this.invTransform, t);
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
    t && t.transform && (ys(oi, t.invTransform, e), e = oi);
    const i = this.originX, s = this.originY;
    (i || s) && (ll[4] = i, ll[5] = s, ys(oi, e, ll), oi[4] -= i, oi[5] -= s, e = oi), this.setLocalTransform(e);
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
    return s && Pf(i, i, s), i;
  }
  /**
   * 变换局部坐标位置到全局坐标空间
   */
  transformCoordToGlobal(t, e) {
    const i = [t, e], s = this.transform;
    return s && Pf(i, i, s), i;
  }
  getLineScale() {
    const t = this.transform;
    return t && cl(t[0] - 1) > 1e-10 && cl(t[3] - 1) > 1e-10 ? Math.sqrt(cl(t[0] * t[3] - t[2] * t[1])) : 1;
  }
  copyTransform(t) {
    Qw(this, t);
  }
  static getLocalTransform(t, e) {
    e = e || [];
    const i = t.originX || 0, s = t.originY || 0, r = t.scaleX, o = t.scaleY, a = t.anchorX, l = t.anchorY, c = t.rotation || 0, h = t.x, u = t.y, f = t.skewX ? Math.tan(t.skewX) : 0, d = t.skewY ? Math.tan(-t.skewY) : 0;
    if (i || s || a || l) {
      const p = i + a, _ = s + l;
      e[4] = -p * r - f * _ * o, e[5] = -_ * o - d * p * r;
    } else
      e[4] = e[5] = 0;
    return e[0] = r, e[3] = o, e[1] = d * r, e[2] = f * o, c && Fp(e, e, c), e[4] += i + h, e[5] += s + u, e;
  }
};
Ps.initDefaultProps = (function() {
  const t = Ps.prototype;
  t.scaleX = t.scaleY = t.globalScaleRatio = 1, t.x = t.y = t.originX = t.originY = t.skewX = t.skewY = t.rotation = t.anchorX = t.anchorY = 0;
})();
let ko = Ps;
const Ks = [
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
function Qw(n, t) {
  for (let e = 0; e < Ks.length; e++) {
    const i = Ks[e];
    n[i] = t[i];
  }
}
const Cs = {
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
    return 1 - Cs.bounceOut(1 - n);
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
    return n < 0.5 ? Cs.bounceIn(n * 2) * 0.5 : Cs.bounceOut(n * 2 - 1) * 0.5 + 0.5;
  }
}, Br = Math.pow, on = Math.sqrt, Po = 1e-8, Xg = 1e-4, Ff = on(3), Nr = 1 / 3, be = $i(), Yt = $i(), Ci = $i();
function en(n) {
  return n > -Po && n < Po;
}
function Kg(n) {
  return n > Po || n < -Po;
}
function Mt(n, t, e, i, s) {
  const r = 1 - s;
  return r * r * (r * n + 3 * s * t) + s * s * (s * i + 3 * r * e);
}
function jg(n, t, e, i, s, r) {
  const o = i + 3 * (t - e) - n, a = 3 * (e - t * 2 + n), l = 3 * (t - n), c = n - s, h = a * a - 3 * o * l, u = a * l - 9 * o * c, f = l * l - 3 * a * c;
  let d = 0;
  if (en(h) && en(u))
    if (en(a))
      r[0] = 0;
    else {
      const p = -l / a;
      p >= 0 && p <= 1 && (r[d++] = p);
    }
  else {
    const p = u * u - 4 * h * f;
    if (en(p)) {
      const _ = u / h, g = -a / o + _, m = -_ / 2;
      g >= 0 && g <= 1 && (r[d++] = g), m >= 0 && m <= 1 && (r[d++] = m);
    } else if (p > 0) {
      const _ = on(p);
      let g = h * a + 1.5 * o * (-u + _), m = h * a + 1.5 * o * (-u - _);
      g < 0 ? g = -Br(-g, Nr) : g = Br(g, Nr), m < 0 ? m = -Br(-m, Nr) : m = Br(m, Nr);
      const y = (-a - (g + m)) / (3 * o);
      y >= 0 && y <= 1 && (r[d++] = y);
    } else {
      const _ = (2 * h * a - 3 * o * u) / (2 * on(h * h * h)), g = Math.acos(_) / 3, m = on(h), y = Math.cos(g), v = (-a - 2 * m * y) / (3 * o), S = (-a + m * (y + Ff * Math.sin(g))) / (3 * o), w = (-a + m * (y - Ff * Math.sin(g))) / (3 * o);
      v >= 0 && v <= 1 && (r[d++] = v), S >= 0 && S <= 1 && (r[d++] = S), w >= 0 && w <= 1 && (r[d++] = w);
    }
  }
  return d;
}
function Qg(n, t, e, i, s) {
  const r = 6 * e - 12 * t + 6 * n, o = 9 * t + 3 * i - 3 * n - 9 * e, a = 3 * t - 3 * n;
  let l = 0;
  if (en(o)) {
    if (Kg(r)) {
      const c = -a / r;
      c >= 0 && c <= 1 && (s[l++] = c);
    }
  } else {
    const c = r * r - 4 * o * a;
    if (en(c))
      s[0] = -r / (2 * o);
    else if (c > 0) {
      const h = on(c), u = (-r + h) / (2 * o), f = (-r - h) / (2 * o);
      u >= 0 && u <= 1 && (s[l++] = u), f >= 0 && f <= 1 && (s[l++] = f);
    }
  }
  return l;
}
function Bf(n, t, e, i, s, r) {
  const o = (t - n) * s + n, a = (e - t) * s + t, l = (i - e) * s + e, c = (a - o) * s + o, h = (l - a) * s + a, u = (h - c) * s + c;
  r[0] = n, r[1] = o, r[2] = c, r[3] = u, r[4] = u, r[5] = h, r[6] = l, r[7] = i;
}
function Jw(n, t, e, i, s, r, o, a, l, c, h) {
  let u, f = 5e-3, d = 1 / 0, p, _, g, m;
  be[0] = l, be[1] = c;
  for (let y = 0; y < 1; y += 0.05)
    Yt[0] = Mt(n, e, s, o, y), Yt[1] = Mt(t, i, r, a, y), g = Mi(be, Yt), g < d && (u = y, d = g);
  d = 1 / 0;
  for (let y = 0; y < 32 && !(f < Xg); y++)
    p = u - f, _ = u + f, Yt[0] = Mt(n, e, s, o, p), Yt[1] = Mt(t, i, r, a, p), g = Mi(Yt, be), p >= 0 && g < d ? (u = p, d = g) : (Ci[0] = Mt(n, e, s, o, _), Ci[1] = Mt(t, i, r, a, _), m = Mi(Ci, be), _ <= 1 && m < d ? (u = _, d = m) : f *= 0.5);
  return on(d);
}
function tS(n, t, e, i, s, r, o, a, l) {
  let c = n, h = t, u = 0;
  const f = 1 / l;
  for (let d = 1; d <= l; d++) {
    let p = d * f;
    const _ = Mt(n, e, s, o, p), g = Mt(t, i, r, a, p), m = _ - c, y = g - h;
    u += Math.sqrt(m * m + y * y), c = _, h = g;
  }
  return u;
}
function Vt(n, t, e, i) {
  const s = 1 - i;
  return s * (s * n + 2 * i * t) + i * i * e;
}
function eS(n, t, e, i, s) {
  const r = n - 2 * t + e, o = 2 * (t - n), a = n - i;
  let l = 0;
  if (en(r)) {
    if (Kg(o)) {
      const c = -a / o;
      c >= 0 && c <= 1 && (s[l++] = c);
    }
  } else {
    const c = o * o - 4 * r * a;
    if (en(c)) {
      const h = -o / (2 * r);
      h >= 0 && h <= 1 && (s[l++] = h);
    } else if (c > 0) {
      const h = on(c), u = (-o + h) / (2 * r), f = (-o - h) / (2 * r);
      u >= 0 && u <= 1 && (s[l++] = u), f >= 0 && f <= 1 && (s[l++] = f);
    }
  }
  return l;
}
function Jg(n, t, e) {
  const i = n + e - 2 * t;
  return i === 0 ? 0.5 : (n - t) / i;
}
function Nf(n, t, e, i, s) {
  const r = (t - n) * i + n, o = (e - t) * i + t, a = (o - r) * i + r;
  s[0] = n, s[1] = r, s[2] = a, s[3] = a, s[4] = o, s[5] = e;
}
function nS(n, t, e, i, s, r, o, a, l) {
  let c, h = 5e-3, u = 1 / 0;
  be[0] = o, be[1] = a;
  for (let f = 0; f < 1; f += 0.05) {
    Yt[0] = Vt(n, e, s, f), Yt[1] = Vt(t, i, r, f);
    const d = Mi(be, Yt);
    d < u && (c = f, u = d);
  }
  u = 1 / 0;
  for (let f = 0; f < 32 && !(h < Xg); f++) {
    const d = c - h, p = c + h;
    Yt[0] = Vt(n, e, s, d), Yt[1] = Vt(t, i, r, d);
    const _ = Mi(Yt, be);
    if (d >= 0 && _ < u)
      c = d, u = _;
    else {
      Ci[0] = Vt(n, e, s, p), Ci[1] = Vt(t, i, r, p);
      const g = Mi(Ci, be);
      p <= 1 && g < u ? (c = p, u = g) : h *= 0.5;
    }
  }
  return on(u);
}
function iS(n, t, e, i, s, r, o) {
  let a = n, l = t, c = 0;
  const h = 1 / o;
  for (let u = 1; u <= o; u++) {
    let f = u * h;
    const d = Vt(n, e, s, f), p = Vt(t, i, r, f), _ = d - a, g = p - l;
    c += Math.sqrt(_ * _ + g * g), a = d, l = p;
  }
  return c;
}
const sS = /cubic-bezier\(([0-9,\.e ]+)\)/;
function t_(n) {
  const t = n && sS.exec(n);
  if (t) {
    const e = t[1].split(","), i = +as(e[0]), s = +as(e[1]), r = +as(e[2]), o = +as(e[3]);
    if (isNaN(i + s + r + o))
      return;
    const a = [];
    return (l) => l <= 0 ? 0 : l >= 1 ? 1 : jg(0, i, r, 1, l, a) && Mt(0, s, o, 1, a[0]);
  }
}
class rS {
  constructor(t) {
    this._inited = !1, this._startTime = 0, this._pausedTime = 0, this._paused = !1, this._life = t.life || 1e3, this._delay = t.delay || 0, this.loop = t.loop || !1, this.onframe = t.onframe || Ea, this.ondestroy = t.ondestroy || Ea, this.onrestart = t.onrestart || Ea, t.easing && this.setEasing(t.easing);
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
    this.easing = t, this.easingFunc = Q(t) ? t : Cs[t] || t_(t);
  }
}
const zf = {
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
function Ds(n) {
  return n = Math.round(n), n < 0 ? 0 : n > 255 ? 255 : n;
}
function Hf(n) {
  return n < 0 ? 0 : n > 1 ? 1 : n;
}
function hl(n) {
  let t = n;
  return t.length && t.charAt(t.length - 1) === "%" ? Ds(parseFloat(t) / 100 * 255) : Ds(parseInt(t, 10));
}
function Is(n) {
  let t = n;
  return t.length && t.charAt(t.length - 1) === "%" ? Hf(parseFloat(t) / 100) : Hf(parseFloat(t));
}
function ul(n, t, e) {
  return e < 0 ? e += 1 : e > 1 && (e -= 1), e * 6 < 1 ? n + (t - n) * e * 6 : e * 2 < 1 ? t : e * 3 < 2 ? n + (t - n) * (2 / 3 - e) * 6 : n;
}
function Lt(n, t, e, i, s) {
  return n[0] = t, n[1] = e, n[2] = i, n[3] = s, n;
}
function mc(n, t) {
  return n[0] = t[0], n[1] = t[1], n[2] = t[2], n[3] = t[3], n;
}
const e_ = new or(20);
let zr = null;
function ai(n, t) {
  zr && mc(zr, t), zr = e_.put(n, zr || t.slice());
}
function Di(n, t) {
  if (!n)
    return;
  t = t || [];
  let e = e_.get(n);
  if (e)
    return mc(t, e);
  n = n + "";
  let i = n.replace(/ /g, "").toLowerCase();
  if (i in zf)
    return mc(t, zf[i]), ai(n, t), t;
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
      ), ai(n, t), t;
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
      ), ai(n, t), t;
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
        c = Is(l.pop());
      // jshint ignore:line
      // Fall through.
      case "rgb":
        if (l.length >= 3)
          return Lt(
            t,
            hl(l[0]),
            hl(l[1]),
            hl(l[2]),
            l.length === 3 ? c : Is(l[3])
          ), ai(n, t), t;
        Lt(t, 0, 0, 0, 1);
        return;
      case "hsla":
        if (l.length !== 4) {
          Lt(t, 0, 0, 0, 1);
          return;
        }
        return l[3] = Is(l[3]), $f(l, t), ai(n, t), t;
      case "hsl":
        if (l.length !== 3) {
          Lt(t, 0, 0, 0, 1);
          return;
        }
        return $f(l, t), ai(n, t), t;
      default:
        return;
    }
  }
  Lt(t, 0, 0, 0, 1);
}
function $f(n, t) {
  const e = (parseFloat(n[0]) % 360 + 360) % 360 / 360, i = Is(n[1]), s = Is(n[2]), r = s <= 0.5 ? s * (i + 1) : s + i - s * i, o = s * 2 - r;
  return t = t || [], Lt(
    t,
    Ds(ul(o, r, e + 1 / 3) * 255),
    Ds(ul(o, r, e) * 255),
    Ds(ul(o, r, e - 1 / 3) * 255),
    1
  ), n.length === 4 && (t[3] = n[3]), t;
}
function Gf(n, t) {
  const e = Di(n);
  if (e) {
    for (let i = 0; i < 3; i++)
      e[i] = e[i] * (1 - t) | 0, e[i] > 255 ? e[i] = 255 : e[i] < 0 && (e[i] = 0);
    return n_(e, e.length === 4 ? "rgba" : "rgb");
  }
}
function n_(n, t) {
  if (!n || !n.length)
    return;
  let e = n[0] + "," + n[1] + "," + n[2];
  return (t === "rgba" || t === "hsva" || t === "hsla") && (e += "," + n[3]), t + "(" + e + ")";
}
function Yf(n, t) {
  const e = Di(n);
  return e ? (0.299 * e[0] + 0.587 * e[1] + 0.114 * e[2]) * e[3] / 255 + (1 - e[3]) * t : 0;
}
function oS(n) {
  return n.type === "linear";
}
function aS(n) {
  return n.type === "radial";
}
(function() {
  return ie.hasGlobalWindow && Q(window.btoa) ? function(n) {
    return window.btoa(unescape(encodeURIComponent(n)));
  } : typeof Buffer != "undefined" ? function(n) {
    return Buffer.from(n).toString("base64");
  } : function(n) {
    return null;
  };
})();
const yc = Array.prototype.slice;
function Be(n, t, e) {
  return (t - n) * e + n;
}
function fl(n, t, e, i) {
  const s = t.length;
  for (let r = 0; r < s; r++)
    n[r] = Be(t[r], e[r], i);
  return n;
}
function lS(n, t, e, i) {
  const s = t.length, r = s && t[0].length;
  for (let o = 0; o < s; o++) {
    n[o] || (n[o] = []);
    for (let a = 0; a < r; a++)
      n[o][a] = Be(t[o][a], e[o][a], i);
  }
  return n;
}
function Hr(n, t, e, i) {
  const s = t.length;
  for (let r = 0; r < s; r++)
    n[r] = t[r] + e[r] * i;
  return n;
}
function Vf(n, t, e, i) {
  const s = t.length, r = s && t[0].length;
  for (let o = 0; o < s; o++) {
    n[o] || (n[o] = []);
    for (let a = 0; a < r; a++)
      n[o][a] = t[o][a] + e[o][a] * i;
  }
  return n;
}
function cS(n, t) {
  const e = n.length, i = t.length, s = e > i ? t : n, r = Math.min(e, i), o = s[r - 1] || { color: [0, 0, 0, 0], offset: 0 };
  for (let a = r; a < Math.max(e, i); a++)
    s.push({
      offset: o.offset,
      color: o.color.slice()
    });
}
function hS(n, t, e) {
  let i = n, s = t;
  if (!i.push || !s.push)
    return;
  const r = i.length, o = s.length;
  if (r !== o)
    if (r > o)
      i.length = o;
    else
      for (let c = r; c < o; c++)
        i.push(e === 1 ? s[c] : yc.call(s[c]));
  const a = i[0] && i[0].length;
  for (let l = 0; l < i.length; l++)
    if (e === 1)
      isNaN(i[l]) && (i[l] = s[l]);
    else
      for (let c = 0; c < a; c++)
        isNaN(i[l][c]) && (i[l][c] = s[l][c]);
}
function oo(n) {
  if (It(n)) {
    const t = n.length;
    if (It(n[0])) {
      const e = [];
      for (let i = 0; i < t; i++)
        e.push(yc.call(n[i]));
      return e;
    }
    return yc.call(n);
  }
  return n;
}
function ao(n) {
  return n[0] = Math.floor(n[0]) || 0, n[1] = Math.floor(n[1]) || 0, n[2] = Math.floor(n[2]) || 0, n[3] = n[3] == null ? 1 : n[3], "rgba(" + n.join(",") + ")";
}
function uS(n) {
  return It(n && n[0]) ? 2 : 1;
}
const $r = 0, lo = 1, i_ = 2, fs = 3, vc = 4, xc = 5, Wf = 6;
function Uf(n) {
  return n === vc || n === xc;
}
function Gr(n) {
  return n === lo || n === i_;
}
let ns = [0, 0, 0, 0];
class fS {
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
    let s = this.keyframes, r = s.length, o = !1, a = Wf, l = e;
    if (It(e)) {
      let h = uS(e);
      a = h, (h === 1 && !Te(e[0]) || h === 2 && !Te(e[0][0])) && (o = !0);
    } else if (Te(e) && !Hs(e))
      a = $r;
    else if (Z(e))
      if (!isNaN(+e))
        a = $r;
      else {
        const h = Di(e);
        h && (l = h, a = fs);
      }
    else if (_p(e)) {
      const h = N({}, l);
      h.colorStops = G(e.colorStops, (u) => ({
        offset: u.offset,
        color: Di(u.color)
      })), oS(e) ? a = vc : aS(e) && (a = xc), l = h;
    }
    r === 0 ? this.valType = a : (a !== this.valType || a === Wf) && (o = !0), this.discrete = this.discrete || o;
    const c = {
      time: t,
      value: l,
      rawValue: e,
      percent: 0
    };
    return i && (c.easing = i, c.easingFunc = Q(i) ? i : Cs[i] || t_(i)), s.push(c), c;
  }
  prepare(t, e) {
    let i = this.keyframes;
    this._needsSort && i.sort(function(h, u) {
      return h.time - u.time;
    });
    const s = this.valType, r = i.length, o = i[r - 1], a = this.discrete, l = Gr(s), c = Uf(s);
    for (let h = 0; h < r; h++) {
      const u = i[h], f = u.value, d = o.value;
      u.percent = u.time / t, a || (l && h !== r - 1 ? hS(f, d, s) : c && cS(
        f.colorStops,
        d.colorStops
      ));
    }
    if (!a && s !== xc && e && this.needsAnimate() && e.needsAnimate() && s === e.valType && !e._finished) {
      this._additiveTrack = e;
      const h = i[0].value;
      for (let u = 0; u < r; u++)
        s === $r ? i[u].additiveValue = i[u].value - h : s === fs ? i[u].additiveValue = Hr([], i[u].value, h, -1) : Gr(s) && (i[u].additiveValue = s === lo ? Hr([], i[u].value, h, -1) : Vf([], i[u].value, h, -1));
    }
  }
  step(t, e) {
    if (this._finished)
      return;
    this._additiveTrack && this._additiveTrack._finished && (this._additiveTrack = null);
    const i = this._additiveTrack != null, s = i ? "additiveValue" : "value", r = this.valType, o = this.keyframes, a = o.length, l = this.propName, c = r === fs;
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
    let m = i ? this._additiveValue : c ? ns : t[l];
    if ((Gr(r) || c) && !m && (m = this._additiveValue = []), this.discrete)
      t[l] = g < 1 ? d.rawValue : p.rawValue;
    else if (Gr(r))
      r === lo ? fl(
        m,
        d[s],
        p[s],
        g
      ) : lS(
        m,
        d[s],
        p[s],
        g
      );
    else if (Uf(r)) {
      const y = d[s], v = p[s], S = r === vc;
      t[l] = {
        type: S ? "linear" : "radial",
        x: Be(y.x, v.x, g),
        y: Be(y.y, v.y, g),
        // TODO performance
        colorStops: G(y.colorStops, (w, x) => {
          const M = v.colorStops[x];
          return {
            offset: Be(w.offset, M.offset, g),
            color: ao(fl(
              [],
              w.color,
              M.color,
              g
            ))
          };
        }),
        global: v.global
      }, S ? (t[l].x2 = Be(
        y.x2,
        v.x2,
        g
      ), t[l].y2 = Be(
        y.y2,
        v.y2,
        g
      )) : t[l].r = Be(
        y.r,
        v.r,
        g
      );
    } else if (c)
      fl(
        m,
        d[s],
        p[s],
        g
      ), i || (t[l] = ao(m));
    else {
      const y = Be(d[s], p[s], g);
      i ? this._additiveValue = y : t[l] = y;
    }
    i && this._addToTarget(t);
  }
  _addToTarget(t) {
    const e = this.valType, i = this.propName, s = this._additiveValue;
    e === $r ? t[i] = t[i] + s : e === fs ? (Di(t[i], ns), Hr(ns, ns, s, 1), t[i] = ao(ns)) : e === lo ? Hr(t[i], t[i], s, 1) : e === i_ && Vf(t[i], t[i], s, 1);
  }
}
class s_ {
  constructor(t, e, i, s) {
    if (this._tracks = {}, this._trackKeys = [], this._maxTime = 0, this._started = 0, this._clip = null, this._target = t, this._loop = e, e && s) {
      gp("Can' use additive animation on looped animation.");
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
        l = r[a] = new fS(a);
        let c;
        const h = this._getAdditiveTrack(a);
        if (h) {
          const u = h.keyframes, f = u[u.length - 1];
          c = f && f.value, h.valType === fs && c && (c = ao(c));
        } else
          c = this._target[a];
        if (c == null)
          continue;
        t > 0 && l.addKeyframe(0, oo(c), s), this._trackKeys.push(a);
      }
      l.addKeyframe(t, oo(e[a]), s);
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
      const r = new rS({
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
    return G(this._trackKeys, (t) => this._tracks[t]);
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
        l && (t[r] = oo(l.rawValue));
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
let r_ = 1;
ie.hasGlobalWindow && (r_ = Math.max(
  window.devicePixelRatio || window.screen && window.screen.deviceXDPI / window.screen.logicalXDPI || 1,
  1
));
const qf = r_, dS = 0.4, wc = "#333", Sc = "#ccc", pS = "#eee", Ne = 1, ds = 2, pi = 4, dl = "__zr_normal__", pl = Ks.concat(["ignore"]), gS = ha(Ks, (n, t) => (n[t] = !0, n), { ignore: !1 });
let li = {}, _S = new Dt(0, 0, 0, 0);
const jo = class jo {
  constructor(t) {
    this.id = p0(), this.animators = [], this.currentStates = [], this.states = {}, this._init(t);
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
        let g = _S;
        i.layoutRect ? g.copy(i.layoutRect) : g.copy(this.getBoundingRect()), s || g.applyTransform(this.transform), this.calculateTextPosition ? this.calculateTextPosition(li, i, g) : O1(li, i, g), r.x = li.x, r.y = li.y, o = li.align, a = li.verticalAlign;
        const m = i.origin;
        if (m && i.rotation != null) {
          let y, v;
          m === "center" ? (y = g.width * 0.5, v = g.height * 0.5) : (y = ln(m[0], g.width), v = ln(m[1], g.height)), c = !0, r.originX = -r.x + y + (s ? 0 : g.x), r.originY = -r.y + v + (s ? 0 : g.y);
        }
      }
      i.rotation != null && (r.rotation = i.rotation);
      const h = i.offset;
      h && (r.x += h[0], r.y += h[1], c || (r.originX = -h[0], r.originY = -h[1]));
      const u = i.inside == null ? typeof i.position == "string" && i.position.indexOf("inside") >= 0 : i.inside, f = this._innerTextDefaultStyle || (this._innerTextDefaultStyle = {});
      let d, p, _;
      u && this.canBeInsideText() ? (d = i.insideFill, p = i.insideStroke, (d == null || d === "auto") && (d = this.getInsideTextFill()), (p == null || p === "auto") && (p = this.getInsideTextStroke(d), _ = !0)) : (d = i.outsideFill, p = i.outsideStroke, (d == null || d === "auto") && (d = this.getOutsideFill()), (p == null || p === "auto") && (p = this.getOutsideStroke(d), _ = !0)), d = d || "#000", (d !== f.fill || p !== f.stroke || _ !== f.autoStroke || o !== f.align || a !== f.verticalAlign) && (l = !0, f.fill = d, f.stroke = p, f.autoStroke = _, f.align = o, f.verticalAlign = a, e.setDefaultTextStyle(f)), e.__dirty |= Ne, l && e.dirtyStyle(!0);
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
    return this.__zr && this.__zr.isDarkMode() ? Sc : wc;
  }
  getOutsideStroke(t) {
    const e = this.__zr && this.__zr.getBackgroundColor();
    let i = typeof e == "string" && Di(e);
    i || (i = [255, 255, 255, 1]);
    const s = i[3], r = this.__zr.isDarkMode();
    for (let o = 0; o < 3; o++)
      i[o] = i[o] * s + (r ? 0 : 255) * (1 - s);
    return i[3] = 1, n_(i, "rgba");
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
    else if (F(t)) {
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
      if (s.getLoop() || r && r !== dl)
        continue;
      const o = s.targetName, a = o ? e[o] : e;
      s.saveTo(a);
    }
  }
  _innerSaveToNormal(t) {
    let e = this._normalState;
    e || (e = this._normalState = {}), t.textConfig && !e.textConfig && (e.textConfig = this.textConfig), this._savePrimaryToNormal(t, e, pl);
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
    this.useState(dl, !1, t);
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
    const r = t === dl;
    if (!this.hasState() && r)
      return;
    const a = this.currentStates, l = this.stateTransition;
    if (ot(a, t) >= 0 && (e || a.length === 1))
      return;
    let c;
    if (this.stateProxy && !r && (c = this.stateProxy(t)), c || (c = this.states && this.states[t]), !c && !r) {
      gp(`State ${t} not exists.`);
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
    return u && u.useState(t, e, i, h), f && f.useState(t, e, i, h), r ? (this.currentStates = [], this._normalState = {}) : e ? this.currentStates.push(t) : this.currentStates = [t], this._updateAnimationTargets(), this.markRedraw(), !h && this.__inHover && (this._toggleHoverLayerFlag(!1), this.__dirty &= ~Ne), c;
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
      f && f.useStates(t, e, c), d && d.useStates(t, e, c), this._updateAnimationTargets(), this.currentStates = t.slice(), this.markRedraw(), !c && this.__inHover && (this._toggleHoverLayerFlag(!1), this.__dirty &= ~Ne);
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
    const e = ot(this.currentStates, t);
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
    const s = this.currentStates.slice(), r = ot(s, t), o = ot(s, e) >= 0;
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
    for (let h = 0; h < pl.length; h++) {
      const u = pl[h], f = r && gS[u];
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
    e !== t && (e && e !== t && this.removeTextContent(), t.innerTransformable = new ko(), this._attachComponent(t), this._textContent = t, this.markRedraw());
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
    this.__dirty |= Ne;
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
    const r = new s_(s, e, i);
    return t && (r.targetName = t), this.addAnimator(r, t), r;
  }
  addAnimator(t, e) {
    const i = this.__zr, s = this;
    t.during(function() {
      s.updateDuringAnimation(e);
    }).done(function() {
      const r = s.animators, o = ot(r, t);
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
    gl(this, t, e, i);
  }
  /**
   * Animate from the target state to current state.
   * The params and the value are the same as `this.animateTo`.
   */
  // Overload definitions
  animateFrom(t, e, i) {
    gl(this, t, e, i, !0);
  }
  _transitionState(t, e, i, s) {
    const r = gl(this, e, i, s);
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
jo.initDefaultProps = (function() {
  const t = jo.prototype;
  t.type = "element", t.name = "", t.ignore = t.silent = t.isGroup = t.draggable = t.dragging = t.ignoreClip = t.__inHover = !1, t.__dirty = Ne;
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
let js = jo;
nh(js, ir);
nh(js, ko);
function gl(n, t, e, i, s) {
  e = e || {};
  const r = [];
  o_(
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
function _l(n, t, e) {
  for (let i = 0; i < e; i++)
    n[i] = t[i];
}
function mS(n) {
  return It(n[0]);
}
function yS(n, t, e) {
  if (It(t[e]))
    if (It(n[e]) || (n[e] = []), Ii(t[e])) {
      const i = t[e].length;
      n[e].length !== i && (n[e] = new t[e].constructor(i), _l(n[e], t[e], i));
    } else {
      const i = t[e], s = n[e], r = i.length;
      if (mS(i)) {
        const o = i[0].length;
        for (let a = 0; a < r; a++)
          s[a] ? _l(s[a], i[a], o) : s[a] = Array.prototype.slice.call(i[a]);
      } else
        _l(s, i, r);
      s.length = i.length;
    }
  else
    n[e] = t[e];
}
function vS(n, t) {
  return n === t || It(n) && It(t) && xS(n, t);
}
function xS(n, t) {
  const e = n.length;
  if (e !== t.length)
    return !1;
  for (let i = 0; i < e; i++)
    if (n[i] !== t[i])
      return !1;
  return !0;
}
function o_(n, t, e, i, s, r, o, a) {
  const l = tt(i), c = s.duration, h = s.delay, u = s.additive, f = s.setToFinal, d = !F(r), p = n.animators;
  let _ = [];
  for (let m = 0; m < l.length; m++) {
    const y = l[m], v = i[y];
    if (v != null && e[y] != null && (d || r[y]))
      if (F(v) && !It(v) && !_p(v)) {
        if (t) {
          a || (e[y] = v, n.updateDuringAnimation(t));
          continue;
        }
        o_(
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
        const S = ot(p, y);
        p.splice(S, 1);
      }
    }
  if (s.force || (_ = re(_, (m) => !vS(i[m], e[m])), g = _.length), g > 0 || s.force && !o.length) {
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
        v[x] = oo(e[x]), yS(e, i, x);
      }
    }
    const S = new s_(e, !1, !1, u ? re(
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
const bc = "__zr_style_" + Math.round(Math.random() * 10), Vn = {
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  shadowColor: "#000",
  opacity: 1,
  blend: "source-over"
}, Eh = {
  style: {
    shadowBlur: !0,
    shadowOffsetX: !0,
    shadowOffsetY: !0,
    shadowColor: !0,
    opacity: !0
  }
};
Vn[bc] = !0;
const Zf = ["z", "z2", "invisible"], wS = ["invisible"], Qo = class Qo extends js {
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
    if (this.ignore || this.invisible || this.style.opacity === 0 || this.culling && SS(this, t, e) || r && !r[0] && !r[3])
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
      t = this._paintRect || (this._paintRect = new Dt(0, 0, 0, 0)), e ? Dt.applyTransform(t, i, e) : t.copy(i), (r || o || a) && (t.width += r * 2 + Math.abs(o), t.height += r * 2 + Math.abs(a), t.x = Math.min(t.x, t.x + o - r), t.y = Math.min(t.y, t.y + a - r));
      const l = this.dirtyRectTolerance;
      t.isZero() || (t.x = Math.floor(t.x - l), t.y = Math.floor(t.y - l), t.width = Math.ceil(t.width + 1 + l * 2), t.height = Math.ceil(t.height + 1 + l * 2));
    }
    return t;
  }
  setPrevPaintRect(t) {
    t ? (this._prevPaintRect = this._prevPaintRect || new Dt(0, 0, 0, 0), this._prevPaintRect.copy(t)) : this._prevPaintRect = null;
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
    t || this.markRedraw(), this.__dirty |= ds, this._rect && (this._rect = null);
  }
  dirty() {
    this.dirtyStyle();
  }
  /**
   * Is style changed. Used with dirtyStyle.
   */
  styleChanged() {
    return !!(this.__dirty & ds);
  }
  /**
   * Mark style updated. Only useful when style is used for caching. Like in the text.
   */
  styleUpdated() {
    this.__dirty &= ~ds;
  }
  /**
   * Create a style object with default values in it's prototype.
   */
  createStyle(t) {
    return fa(Vn, t);
  }
  /**
   * Replace style property.
   * It will create a new style if given obj is not a valid style object.
   */
  // PENDING should not createStyle if it's an style object.
  useStyle(t) {
    t[bc] || (t = this.createStyle(t)), this.__inHover ? this.__hoverStyle = t : this.style = t, this.dirtyStyle();
  }
  /**
   * Determine if an object is a valid style object.
   * Which means it is created by `createStyle.`
   *
   * A valid style object will have all default values in it's prototype.
   * To avoid get null/undefined values.
   */
  isStyleObject(t) {
    return t[bc];
  }
  _innerSaveToNormal(t) {
    super._innerSaveToNormal(t);
    const e = this._normalState;
    t.style && !e.style && (e.style = this._mergeStyle(this.createStyle(), this.style)), this._savePrimaryToNormal(t, e, Zf);
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
    const c = this.__inHover ? wS : Zf;
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
    return Eh;
  }
};
Qo.initDefaultProps = (function() {
  const t = Qo.prototype;
  t.type = "displayable", t.invisible = !1, t.z = 0, t.z2 = 0, t.zlevel = 0, t.culling = !1, t.cursor = "pointer", t.rectHover = !1, t.incremental = !1, t._rect = null, t.dirtyRectTolerance = 0, t.__dirty = Ne | ds;
})();
let Qs = Qo;
const ml = new Dt(0, 0, 0, 0), yl = new Dt(0, 0, 0, 0);
function SS(n, t, e) {
  return ml.copy(n.getBoundingRect()), n.transform && ml.applyTransform(n.transform), yl.width = t, yl.height = e, !ml.intersect(yl);
}
const Wt = Math.min, Ut = Math.max, vl = Math.sin, xl = Math.cos, Rn = Math.PI * 2, Yr = $i(), Vr = $i(), Wr = $i();
function Xf(n, t, e, i, s, r) {
  s[0] = Wt(n, e), s[1] = Wt(t, i), r[0] = Ut(n, e), r[1] = Ut(t, i);
}
const Kf = [], jf = [];
function bS(n, t, e, i, s, r, o, a, l, c) {
  const h = Qg, u = Mt;
  let f = h(n, e, s, o, Kf);
  l[0] = 1 / 0, l[1] = 1 / 0, c[0] = -1 / 0, c[1] = -1 / 0;
  for (let d = 0; d < f; d++) {
    const p = u(n, e, s, o, Kf[d]);
    l[0] = Wt(p, l[0]), c[0] = Ut(p, c[0]);
  }
  f = h(t, i, r, a, jf);
  for (let d = 0; d < f; d++) {
    const p = u(t, i, r, a, jf[d]);
    l[1] = Wt(p, l[1]), c[1] = Ut(p, c[1]);
  }
  l[0] = Wt(n, l[0]), c[0] = Ut(n, c[0]), l[0] = Wt(o, l[0]), c[0] = Ut(o, c[0]), l[1] = Wt(t, l[1]), c[1] = Ut(t, c[1]), l[1] = Wt(a, l[1]), c[1] = Ut(a, c[1]);
}
function TS(n, t, e, i, s, r, o, a) {
  const l = Jg, c = Vt, h = Ut(
    Wt(l(n, e, s), 1),
    0
  ), u = Ut(
    Wt(l(t, i, r), 1),
    0
  ), f = c(n, e, s, h), d = c(t, i, r, u);
  o[0] = Wt(n, s, f), o[1] = Wt(t, r, d), a[0] = Ut(n, s, f), a[1] = Ut(t, r, d);
}
function MS(n, t, e, i, s, r, o, a, l) {
  const c = qg, h = Zg, u = Math.abs(s - r);
  if (u % Rn < 1e-4 && u > 1e-4) {
    a[0] = n - e, a[1] = t - i, l[0] = n + e, l[1] = t + i;
    return;
  }
  if (Yr[0] = xl(s) * e + n, Yr[1] = vl(s) * i + t, Vr[0] = xl(r) * e + n, Vr[1] = vl(r) * i + t, c(a, Yr, Vr), h(l, Yr, Vr), s = s % Rn, s < 0 && (s = s + Rn), r = r % Rn, r < 0 && (r = r + Rn), s > r && !o ? r += Rn : s < r && o && (s += Rn), o) {
    const f = r;
    r = s, s = f;
  }
  for (let f = 0; f < r; f += Math.PI / 2)
    f > s && (Wr[0] = xl(f) * e + n, Wr[1] = vl(f) * i + t, c(a, Wr, a), h(l, Wr, l));
}
const H = {
  M: 1,
  L: 2,
  C: 3,
  Q: 4,
  A: 5,
  Z: 6,
  // Rect
  R: 7
}, An = [], kn = [], me = [], Ze = [], ye = [], ve = [], wl = Math.min, Sl = Math.max, Pn = Math.cos, Ln = Math.sin, Pe = Math.abs, Tc = Math.PI, Qe = Tc * 2, bl = typeof Float32Array != "undefined", is = [];
function Tl(n) {
  return Math.round(n / Tc * 1e8) / 1e8 % 2 * Tc;
}
function CS(n, t) {
  let e = Tl(n[0]);
  e < 0 && (e += Qe);
  let i = e - n[0], s = n[1];
  s += i, !t && s - e >= Qe ? s = e + Qe : t && e - s >= Qe ? s = e - Qe : !t && e > s ? s = e + (Qe - Tl(e - s)) : t && e < s && (s = e - (Qe - Tl(s - e))), n[0] = e, n[1] = s;
}
const mi = class mi {
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
    i = i || 0, i > 0 && (this._ux = Pe(i / qf / t) || 0, this._uy = Pe(i / qf / e) || 0);
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
    return this._drawPendingPt(), this.addData(H.M, t, e), this._ctx && this._ctx.moveTo(t, e), this._x0 = t, this._y0 = e, this._xi = t, this._yi = e, this;
  }
  lineTo(t, e) {
    const i = Pe(t - this._xi), s = Pe(e - this._yi), r = i > this._ux || s > this._uy;
    if (this.addData(H.L, t, e), this._ctx && r && this._ctx.lineTo(t, e), r)
      this._xi = t, this._yi = e, this._pendingPtDist = 0;
    else {
      const o = i * i + s * s;
      o > this._pendingPtDist && (this._pendingPtX = t, this._pendingPtY = e, this._pendingPtDist = o);
    }
    return this;
  }
  bezierCurveTo(t, e, i, s, r, o) {
    return this._drawPendingPt(), this.addData(H.C, t, e, i, s, r, o), this._ctx && this._ctx.bezierCurveTo(t, e, i, s, r, o), this._xi = r, this._yi = o, this;
  }
  quadraticCurveTo(t, e, i, s) {
    return this._drawPendingPt(), this.addData(H.Q, t, e, i, s), this._ctx && this._ctx.quadraticCurveTo(t, e, i, s), this._xi = i, this._yi = s, this;
  }
  arc(t, e, i, s, r, o) {
    this._drawPendingPt(), is[0] = s, is[1] = r, CS(is, o), s = is[0], r = is[1];
    let a = r - s;
    return this.addData(
      H.A,
      t,
      e,
      i,
      i,
      s,
      a,
      0,
      o ? 0 : 1
    ), this._ctx && this._ctx.arc(t, e, i, s, r, o), this._xi = Pn(r) * i + t, this._yi = Ln(r) * i + e, this;
  }
  // TODO
  arcTo(t, e, i, s, r) {
    return this._drawPendingPt(), this._ctx && this._ctx.arcTo(t, e, i, s, r), this;
  }
  // TODO
  rect(t, e, i, s) {
    return this._drawPendingPt(), this._ctx && this._ctx.rect(t, e, i, s), this.addData(H.R, t, e, i, s), this;
  }
  closePath() {
    this._drawPendingPt(), this.addData(H.Z);
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
    !(this.data && this.data.length === e) && bl && (this.data = new Float32Array(e));
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
    bl && this.data instanceof Float32Array && (this.data = new Float32Array(s + i));
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
    t instanceof Array && (t.length = this._len, bl && this._len > 11 && (this.data = new Float32Array(t)));
  }
  getBoundingRect() {
    me[0] = me[1] = ye[0] = ye[1] = Number.MAX_VALUE, Ze[0] = Ze[1] = ve[0] = ve[1] = -Number.MAX_VALUE;
    const t = this.data;
    let e = 0, i = 0, s = 0, r = 0, o;
    for (o = 0; o < this._len; ) {
      const a = t[o++], l = o === 1;
      switch (l && (e = t[o], i = t[o + 1], s = e, r = i), a) {
        case H.M:
          e = s = t[o++], i = r = t[o++], ye[0] = s, ye[1] = r, ve[0] = s, ve[1] = r;
          break;
        case H.L:
          Xf(e, i, t[o], t[o + 1], ye, ve), e = t[o++], i = t[o++];
          break;
        case H.C:
          bS(
            e,
            i,
            t[o++],
            t[o++],
            t[o++],
            t[o++],
            t[o],
            t[o + 1],
            ye,
            ve
          ), e = t[o++], i = t[o++];
          break;
        case H.Q:
          TS(
            e,
            i,
            t[o++],
            t[o++],
            t[o],
            t[o + 1],
            ye,
            ve
          ), e = t[o++], i = t[o++];
          break;
        case H.A:
          const c = t[o++], h = t[o++], u = t[o++], f = t[o++], d = t[o++], p = t[o++] + d;
          o += 1;
          const _ = !t[o++];
          l && (s = Pn(d) * u + c, r = Ln(d) * f + h), MS(
            c,
            h,
            u,
            f,
            d,
            p,
            _,
            ye,
            ve
          ), e = Pn(p) * u + c, i = Ln(p) * f + h;
          break;
        case H.R:
          s = e = t[o++], r = i = t[o++];
          const g = t[o++], m = t[o++];
          Xf(s, r, s + g, r + m, ye, ve);
          break;
        case H.Z:
          e = s, i = r;
          break;
      }
      qg(me, me, ye), Zg(Ze, Ze, ve);
    }
    return o === 0 && (me[0] = me[1] = Ze[0] = Ze[1] = 0), new Dt(
      me[0],
      me[1],
      Ze[0] - me[0],
      Ze[1] - me[1]
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
        case H.M:
          r = a = t[f++], o = l = t[f++];
          break;
        case H.L: {
          const M = t[f++], T = t[f++], b = M - r, I = T - o;
          (Pe(b) > i || Pe(I) > s || f === e - 1) && (_ = Math.sqrt(b * b + I * I), r = M, o = T);
          break;
        }
        case H.C: {
          const M = t[f++], T = t[f++], b = t[f++], I = t[f++], C = t[f++], E = t[f++];
          _ = tS(r, o, M, T, b, I, C, E, 10), r = C, o = E;
          break;
        }
        case H.Q: {
          const M = t[f++], T = t[f++], b = t[f++], I = t[f++];
          _ = iS(r, o, M, T, b, I, 10), r = b, o = I;
          break;
        }
        case H.A:
          const g = t[f++], m = t[f++], y = t[f++], v = t[f++], S = t[f++];
          let w = t[f++];
          const x = w + S;
          f += 1, t[f++], p && (a = Pn(S) * y + g, l = Ln(S) * v + m), _ = Sl(y, v) * wl(Qe, Math.abs(w)), r = Pn(x) * y + g, o = Ln(x) * v + m;
          break;
        case H.R: {
          a = r = t[f++], l = o = t[f++];
          const M = t[f++], T = t[f++];
          _ = M * 2 + T * 2;
          break;
        }
        case H.Z: {
          const M = a - r, T = l - o;
          _ = Math.sqrt(M * M + T * T), r = a, o = l;
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
        const M = i[x++], T = x === 1;
        switch (T && (c = i[x], h = i[x + 1], a = c, l = h), M !== H.L && v > 0 && (t.lineTo(S, w), v = 0), M) {
          case H.M:
            a = c = i[x++], l = h = i[x++], t.moveTo(c, h);
            break;
          case H.L: {
            u = i[x++], f = i[x++];
            const $ = Pe(u - c), O = Pe(f - h);
            if ($ > s || O > r) {
              if (d) {
                const st = p[m++];
                if (g + st > y) {
                  const St = (y - g) / st;
                  t.lineTo(c * (1 - St) + u * St, h * (1 - St) + f * St);
                  break t;
                }
                g += st;
              }
              t.lineTo(u, f), c = u, h = f, v = 0;
            } else {
              const st = $ * $ + O * O;
              st > v && (S = u, w = f, v = st);
            }
            break;
          }
          case H.C: {
            const $ = i[x++], O = i[x++], st = i[x++], St = i[x++], fe = i[x++], Ye = i[x++];
            if (d) {
              const Yi = p[m++];
              if (g + Yi > y) {
                const Ve = (y - g) / Yi;
                Bf(c, $, st, fe, Ve, An), Bf(h, O, St, Ye, Ve, kn), t.bezierCurveTo(An[1], kn[1], An[2], kn[2], An[3], kn[3]);
                break t;
              }
              g += Yi;
            }
            t.bezierCurveTo($, O, st, St, fe, Ye), c = fe, h = Ye;
            break;
          }
          case H.Q: {
            const $ = i[x++], O = i[x++], st = i[x++], St = i[x++];
            if (d) {
              const fe = p[m++];
              if (g + fe > y) {
                const Ye = (y - g) / fe;
                Nf(c, $, st, Ye, An), Nf(h, O, St, Ye, kn), t.quadraticCurveTo(An[1], kn[1], An[2], kn[2]);
                break t;
              }
              g += fe;
            }
            t.quadraticCurveTo($, O, st, St), c = st, h = St;
            break;
          }
          case H.A:
            const b = i[x++], I = i[x++], C = i[x++], E = i[x++];
            let A = i[x++], P = i[x++];
            const Y = i[x++], V = !i[x++], at = C > E ? C : E, ue = Pe(C - E) > 1e-3;
            let j = A + P, Rt = !1;
            if (d) {
              const $ = p[m++];
              g + $ > y && (j = A + P * (y - g) / $, Rt = !0), g += $;
            }
            if (ue && t.ellipse ? t.ellipse(b, I, C, E, Y, A, j, V) : t.arc(b, I, at, A, j, V), Rt)
              break t;
            T && (a = Pn(A) * C + b, l = Ln(A) * E + I), c = Pn(j) * C + b, h = Ln(j) * E + I;
            break;
          case H.R:
            a = c = i[x], l = h = i[x + 1], u = i[x++], f = i[x++];
            const it = i[x++], gt = i[x++];
            if (d) {
              const $ = p[m++];
              if (g + $ > y) {
                let O = y - g;
                t.moveTo(u, f), t.lineTo(u + wl(O, it), f), O -= it, O > 0 && t.lineTo(u + it, f + wl(O, gt)), O -= gt, O > 0 && t.lineTo(u + Sl(it - O, 0), f + gt), O -= it, O > 0 && t.lineTo(u, f + Sl(gt - O, 0));
                break t;
              }
              g += $;
            }
            t.rect(u, f, it, gt);
            break;
          case H.Z:
            if (d) {
              const $ = p[m++];
              if (g + $ > y) {
                const O = (y - g) / $;
                t.lineTo(c * (1 - O) + a * O, h * (1 - O) + l * O);
                break t;
              }
              g += $;
            }
            t.closePath(), c = a, h = l;
        }
      }
  }
  clone() {
    const t = new mi(), e = this.data;
    return t.data = e.slice ? e.slice() : Array.prototype.slice.call(e), t._len = this._len, t;
  }
};
mi.CMD = H, mi.initDefaultProps = (function() {
  const t = mi.prototype;
  t._saveData = !0, t._ux = 0, t._uy = 0, t._pendingPtDist = 0, t._version = 0;
})();
let Js = mi;
const Qf = new or(50);
function a_(n, t, e, i, s) {
  if (n)
    if (typeof n == "string") {
      if (t && t.__zrImageSrc === n || !e)
        return t;
      const r = Qf.get(n), o = { hostEl: e, cb: i, cbPayload: s };
      return r ? (t = r.image, !Rh(t) && r.pending.push(o)) : (t = Jc.loadImage(
        n,
        Jf,
        Jf
      ), t.__zrImageSrc = n, Qf.put(
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
function Jf() {
  const n = this.__cachedImgObj;
  this.onload = this.onerror = this.__cachedImgObj = null;
  for (let t = 0; t < n.pending.length; t++) {
    const e = n.pending[t], i = e.cb;
    i && i(this, e.cbPayload), e.hostEl.dirty();
  }
  n.pending.length = 0;
}
function Rh(n) {
  return n && n.width && n.height;
}
function Hn(n) {
  return isFinite(n);
}
function DS(n, t, e) {
  let i = t.x == null ? 0 : t.x, s = t.x2 == null ? 1 : t.x2, r = t.y == null ? 0 : t.y, o = t.y2 == null ? 0 : t.y2;
  return t.global || (i = i * e.width + e.x, s = s * e.width + e.x, r = r * e.height + e.y, o = o * e.height + e.y), i = Hn(i) ? i : 0, s = Hn(s) ? s : 1, r = Hn(r) ? r : 0, o = Hn(o) ? o : 0, n.createLinearGradient(i, r, s, o);
}
function IS(n, t, e) {
  const i = e.width, s = e.height, r = Math.min(i, s);
  let o = t.x == null ? 0.5 : t.x, a = t.y == null ? 0.5 : t.y, l = t.r == null ? 0.5 : t.r;
  return t.global || (o = o * i + e.x, a = a * s + e.y, l = l * r), o = Hn(o) ? o : 0.5, a = Hn(a) ? a : 0.5, l = l >= 0 && Hn(l) ? l : 0.5, n.createRadialGradient(o, a, 0, o, a, l);
}
function td(n, t, e) {
  const i = t.type === "radial" ? IS(n, t, e) : DS(n, t, e), s = t.colorStops;
  for (let r = 0; r < s.length; r++)
    i.addColorStop(
      s[r].offset,
      s[r].color
    );
  return i;
}
function ES(n, t) {
  if (n === t || !n && !t)
    return !1;
  if (!n || !t || n.length !== t.length)
    return !0;
  for (let e = 0; e < n.length; e++)
    if (n[e] !== t[e])
      return !0;
  return !1;
}
function ci(n, t, e, i, s, r, o) {
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
function RS(n, t, e, i, s, r, o, a, l, c, h) {
  if (l === 0)
    return !1;
  const u = l;
  return h > t + u && h > i + u && h > r + u && h > a + u || h < t - u && h < i - u && h < r - u && h < a - u || c > n + u && c > e + u && c > s + u && c > o + u || c < n - u && c < e - u && c < s - u && c < o - u ? !1 : Jw(
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
function AS(n, t, e, i, s, r, o, a, l) {
  if (o === 0)
    return !1;
  const c = o;
  return l > t + c && l > i + c && l > r + c || l < t - c && l < i - c && l < r - c || a > n + c && a > e + c && a > s + c || a < n - c && a < e - c && a < s - c ? !1 : nS(
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
const ed = Math.PI * 2;
function Ur(n) {
  return n %= ed, n < 0 && (n += ed), n;
}
const ss = Math.PI * 2;
function kS(n, t, e, i, s, r, o, a, l) {
  if (o === 0)
    return !1;
  const c = o;
  a -= n, l -= t;
  const h = Math.sqrt(a * a + l * l);
  if (h - c > e || h + c < e)
    return !1;
  if (Math.abs(i - s) % ss < 1e-4)
    return !0;
  if (r) {
    const f = i;
    i = Ur(s), s = Ur(f);
  } else
    i = Ur(i), s = Ur(s);
  i > s && (s += ss);
  let u = Math.atan2(l, a);
  return u < 0 && (u += ss), u >= i && u <= s || u + ss >= i && u + ss <= s;
}
function On(n, t, e, i, s, r) {
  if (r > t && r > i || r < t && r < i || i === t)
    return 0;
  const o = (r - t) / (i - t);
  let a = i < t ? 1 : -1;
  (o === 1 || o === 0) && (a = i < t ? 0.5 : -0.5);
  const l = o * (e - n) + n;
  return l === s ? 1 / 0 : l > s ? a : 0;
}
const Xe = Js.CMD, Fn = Math.PI * 2, PS = 1e-4;
function LS(n, t) {
  return Math.abs(n - t) < PS;
}
const ft = [-1, -1, -1], Bt = [-1, -1];
function OS() {
  const n = Bt[0];
  Bt[0] = Bt[1], Bt[1] = n;
}
function FS(n, t, e, i, s, r, o, a, l, c) {
  if (c > t && c > i && c > r && c > a || c < t && c < i && c < r && c < a)
    return 0;
  const h = jg(t, i, r, a, c, ft);
  if (h === 0)
    return 0;
  {
    let u = 0, f = -1, d, p;
    for (let _ = 0; _ < h; _++) {
      let g = ft[_], m = g === 0 || g === 1 ? 0.5 : 1;
      Mt(n, e, s, o, g) < l || (f < 0 && (f = Qg(t, i, r, a, Bt), Bt[1] < Bt[0] && f > 1 && OS(), d = Mt(t, i, r, a, Bt[0]), f > 1 && (p = Mt(t, i, r, a, Bt[1]))), f === 2 ? g < Bt[0] ? u += d < t ? m : -m : g < Bt[1] ? u += p < d ? m : -m : u += a < p ? m : -m : g < Bt[0] ? u += d < t ? m : -m : u += a < d ? m : -m);
    }
    return u;
  }
}
function BS(n, t, e, i, s, r, o, a) {
  if (a > t && a > i && a > r || a < t && a < i && a < r)
    return 0;
  const l = eS(t, i, r, a, ft);
  if (l === 0)
    return 0;
  {
    const c = Jg(t, i, r);
    if (c >= 0 && c <= 1) {
      let h = 0, u = Vt(t, i, r, c);
      for (let f = 0; f < l; f++) {
        let d = ft[f] === 0 || ft[f] === 1 ? 0.5 : 1;
        Vt(n, e, s, ft[f]) < o || (ft[f] < c ? h += u < t ? d : -d : h += r < u ? d : -d);
      }
      return h;
    } else {
      const h = ft[0] === 0 || ft[0] === 1 ? 0.5 : 1;
      return Vt(n, e, s, ft[0]) < o ? 0 : r < t ? h : -h;
    }
  }
}
function NS(n, t, e, i, s, r, o, a) {
  if (a -= t, a > e || a < -e)
    return 0;
  const l = Math.sqrt(e * e - a * a);
  ft[0] = -l, ft[1] = l;
  const c = Math.abs(i - s);
  if (c < 1e-4)
    return 0;
  if (c >= Fn - 1e-4) {
    i = 0, s = Fn;
    const u = r ? 1 : -1;
    return o >= ft[0] + n && o <= ft[1] + n ? u : 0;
  }
  if (i > s) {
    const u = i;
    i = s, s = u;
  }
  i < 0 && (i += Fn, s += Fn);
  let h = 0;
  for (let u = 0; u < 2; u++) {
    const f = ft[u];
    if (f + n > o) {
      let d = Math.atan2(a, f), p = r ? 1 : -1;
      d < 0 && (d = Fn + d), (d >= i && d <= s || d + Fn >= i && d + Fn <= s) && (d > Math.PI / 2 && d < Math.PI * 1.5 && (p = -p), h += p);
    }
  }
  return h;
}
function l_(n, t, e, i, s) {
  const r = n.data, o = n.len();
  let a = 0, l = 0, c = 0, h = 0, u = 0, f, d;
  for (let p = 0; p < o; ) {
    const _ = r[p++], g = p === 1;
    switch (_ === Xe.M && p > 1 && (e || (a += On(l, c, h, u, i, s))), g && (l = r[p], c = r[p + 1], h = l, u = c), _) {
      case Xe.M:
        h = r[p++], u = r[p++], l = h, c = u;
        break;
      case Xe.L:
        if (e) {
          if (ci(l, c, r[p], r[p + 1], t, i, s))
            return !0;
        } else
          a += On(l, c, r[p], r[p + 1], i, s) || 0;
        l = r[p++], c = r[p++];
        break;
      case Xe.C:
        if (e) {
          if (RS(
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
          a += FS(
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
      case Xe.Q:
        if (e) {
          if (AS(
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
          a += BS(
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
      case Xe.A:
        const m = r[p++], y = r[p++], v = r[p++], S = r[p++], w = r[p++], x = r[p++];
        p += 1;
        const M = !!(1 - r[p++]);
        f = Math.cos(w) * v + m, d = Math.sin(w) * S + y, g ? (h = f, u = d) : a += On(l, c, f, d, i, s);
        const T = (i - m) * S / v + m;
        if (e) {
          if (kS(
            m,
            y,
            S,
            w,
            w + x,
            M,
            t,
            T,
            s
          ))
            return !0;
        } else
          a += NS(
            m,
            y,
            S,
            w,
            w + x,
            M,
            T,
            s
          );
        l = Math.cos(w + x) * v + m, c = Math.sin(w + x) * S + y;
        break;
      case Xe.R:
        h = l = r[p++], u = c = r[p++];
        const b = r[p++], I = r[p++];
        if (f = h + b, d = u + I, e) {
          if (ci(h, u, f, u, t, i, s) || ci(f, u, f, d, t, i, s) || ci(f, d, h, d, t, i, s) || ci(h, d, h, u, t, i, s))
            return !0;
        } else
          a += On(f, u, f, d, i, s), a += On(h, d, h, u, i, s);
        break;
      case Xe.Z:
        if (e) {
          if (ci(
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
          a += On(l, c, h, u, i, s);
        l = h, c = u;
        break;
    }
  }
  return !e && !LS(c, u) && (a += On(l, c, h, u, i, s) || 0), a !== 0;
}
function zS(n, t, e) {
  return l_(n, 0, !1, t, e);
}
function HS(n, t, e, i) {
  return l_(n, t, !0, e, i);
}
const c_ = xt({
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
}, Vn), $S = {
  style: xt({
    fill: !0,
    stroke: !0,
    strokePercent: !0,
    fillOpacity: !0,
    strokeOpacity: !0,
    lineDashOffset: !0,
    lineWidth: !0,
    miterLimit: !0
  }, Eh.style)
}, Ml = Ks.concat([
  "invisible",
  "culling",
  "z",
  "z2",
  "zlevel",
  "parent"
]), zn = class zn extends Qs {
  constructor(t) {
    super(t);
  }
  update() {
    super.update();
    const t = this.style;
    if (t.decal) {
      const e = this._decalEl = this._decalEl || new zn();
      e.buildPath === zn.prototype.buildPath && (e.buildPath = (s) => {
        this.buildPath(s, this.shape);
      }), e.silent = !0;
      const i = e.style;
      for (let s in t)
        i[s] !== t[s] && (i[s] = t[s]);
      i.fill = t.fill ? t.decal : null, i.decal = null, i.shadowColor = null, t.strokeFirst && (i.stroke = null);
      for (let s = 0; s < Ml.length; ++s)
        e[Ml[s]] = this[Ml[s]];
      e.__dirty |= Ne;
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
      if (Z(t)) {
        const e = Yf(t, 0);
        return e > 0.5 ? wc : e > 0.2 ? pS : Sc;
      } else if (t)
        return Sc;
    }
    return wc;
  }
  getInsideTextStroke(t) {
    const e = this.style.fill;
    if (Z(e)) {
      const i = this.__zr, s = !!(i && i.isDarkMode()), r = Yf(t, 0) < dS;
      if (s === r)
        return e;
    }
  }
  // When bundling path, some shape may decide if use moveTo to begin a new subpath or closePath
  // Like in circle
  buildPath(t, e, i) {
  }
  pathUpdated() {
    this.__dirty &= ~pi;
  }
  getUpdatedPathProxy(t) {
    return !this.path && this.createPathProxy(), this.path.beginPath(), this.buildPath(this.path, this.shape, t), this.path;
  }
  createPathProxy() {
    this.path = new Js(!1);
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
      (s || this.__dirty & pi) && (r.beginPath(), this.buildPath(r, this.shape, !1), this.pathUpdated()), t = r.getBoundingRect();
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
        if (l > 1e-10 && (this.hasFill() || (a = Math.max(a, this.strokeContainThreshold)), HS(
          o,
          a / l,
          t,
          e
        )))
          return !0;
      }
      if (this.hasFill())
        return zS(o, t, e);
    }
    return !1;
  }
  /**
   * Shape changed
   */
  dirtyShape() {
    this.__dirty |= pi, this._rect && (this._rect = null), this._decalEl && this._decalEl.dirtyShape(), this.markRedraw();
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
    return !!(this.__dirty & pi);
  }
  /**
   * Create a path style object with default values in it's prototype.
   * @override
   */
  createStyle(t) {
    return fa(c_, t);
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
    return $S;
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
    class e extends zn {
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
zn.initDefaultProps = (function() {
  const t = zn.prototype;
  t.type = "path", t.strokeContainThreshold = 5, t.segmentIgnoreThreshold = 0, t.subPixelOptimize = !1, t.autoBatch = !1, t.__dirty = Ne | ds | pi;
})();
let Lo = zn;
const GS = xt({
  x: 0,
  y: 0
}, Vn), YS = {
  style: xt({
    x: !0,
    y: !0,
    width: !0,
    height: !0,
    sx: !0,
    sy: !0,
    sWidth: !0,
    sHeight: !0
  }, Eh.style)
};
function VS(n) {
  return !!(n && typeof n != "string" && n.width && n.height);
}
class h_ extends Qs {
  /**
   * Create an image style object with default values in it's prototype.
   * @override
   */
  createStyle(t) {
    return fa(GS, t);
  }
  _getSize(t) {
    const e = this.style;
    let i = e[t];
    if (i != null)
      return i;
    const s = VS(e.image) ? e.image : this.__image;
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
    return YS;
  }
  getBoundingRect() {
    const t = this.style;
    return this._rect || (this._rect = new Dt(
      t.x || 0,
      t.y || 0,
      this.getWidth(),
      this.getHeight()
    )), this._rect;
  }
}
h_.prototype.type = "image";
const WS = xt({
  strokeFirst: !0,
  font: zs,
  x: 0,
  y: 0,
  textAlign: "left",
  textBaseline: "top",
  miterLimit: 2
}, c_);
var qn;
let u_ = (qn = class extends Qs {
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
    return fa(WS, t);
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
      const i = mg(
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
}, qn.initDefaultProps = (function() {
  const t = qn.prototype;
  t.dirtyRectTolerance = 10;
})(), qn);
u_.prototype.type = "tspan";
function US(n, t) {
  return !n || n === "solid" || !(t > 0) ? null : n === "dashed" ? [4 * t, 2 * t] : n === "dotted" ? [t] : Te(n) ? [n] : K(n) ? n : null;
}
function f_(n) {
  const t = n.style;
  let e = t.lineDash && t.lineWidth > 0 && US(t.lineDash, t.lineWidth), i = t.lineDashOffset;
  if (e) {
    const s = t.strokeNoScale && n.getLineScale ? n.getLineScale() : 1;
    s && s !== 1 && (e = G(e, function(r) {
      return r / s;
    }), i /= s);
  }
  return [e, i];
}
const qS = new Js(!0);
function Oo(n) {
  const t = n.stroke;
  return !(t == null || t === "none" || !(n.lineWidth > 0));
}
function nd(n) {
  return typeof n == "string" && n !== "none";
}
function Fo(n) {
  const t = n.fill;
  return t != null && t !== "none";
}
function id(n, t) {
  if (t.fillOpacity != null && t.fillOpacity !== 1) {
    const e = n.globalAlpha;
    n.globalAlpha = t.fillOpacity * t.opacity, n.fill(), n.globalAlpha = e;
  } else
    n.fill();
}
function sd(n, t) {
  if (t.strokeOpacity != null && t.strokeOpacity !== 1) {
    const e = n.globalAlpha;
    n.globalAlpha = t.strokeOpacity * t.opacity, n.stroke(), n.globalAlpha = e;
  } else
    n.stroke();
}
function rd(n, t, e) {
  const i = a_(t.image, t.__image, e);
  if (Rh(i)) {
    const s = n.createPattern(i, t.repeat || "repeat");
    if (typeof DOMMatrix == "function" && s && s.setTransform) {
      const r = new DOMMatrix();
      r.translateSelf(t.x || 0, t.y || 0), r.rotateSelf(0, 0, (t.rotation || 0) * b0), r.scaleSelf(t.scaleX || 1, t.scaleY || 1), s.setTransform(r);
    }
    return s;
  }
}
function ZS(n, t, e, i) {
  let s = Oo(e), r = Fo(e);
  const o = e.strokePercent, a = o < 1, l = !t.path;
  (!t.silent || a) && l && t.createPathProxy();
  const c = t.path || qS, h = t.__dirty;
  if (!i) {
    const _ = e.fill, g = e.stroke, m = r && !!_.colorStops, y = s && !!g.colorStops, v = r && !!_.image, S = s && !!g.image;
    let w, x, M, T, b;
    (m || y) && (b = t.getBoundingRect()), m && (w = h ? td(n, _, b) : t.__canvasFillGradient, t.__canvasFillGradient = w), y && (x = h ? td(n, g, b) : t.__canvasStrokeGradient, t.__canvasStrokeGradient = x), v && (M = h || !t.__canvasFillPattern ? rd(n, _, t) : t.__canvasFillPattern, t.__canvasFillPattern = M), S && (T = h || !t.__canvasStrokePattern ? rd(n, g, t) : t.__canvasStrokePattern, t.__canvasStrokePattern = M), m ? n.fillStyle = w : v && (M ? n.fillStyle = M : r = !1), y ? n.strokeStyle = x : S && (T ? n.strokeStyle = T : s = !1);
  }
  const u = t.getGlobalScale();
  c.setScale(u[0], u[1], t.segmentIgnoreThreshold);
  let f, d;
  n.setLineDash && e.lineDash && ([f, d] = f_(t));
  let p = !0;
  (l || h & pi) && (c.setDPR(n.dpr), a ? c.setContext(null) : (c.setContext(n), p = !1), c.reset(), t.buildPath(c, t.shape, i), c.toStatic(), t.pathUpdated()), p && c.rebuildPath(n, a ? o : 1), f && (n.setLineDash(f), n.lineDashOffset = d), i || (e.strokeFirst ? (s && sd(n, e), r && id(n, e)) : (r && id(n, e), s && sd(n, e))), f && n.setLineDash([]);
}
function XS(n, t, e) {
  const i = t.__image = a_(
    e.image,
    t.__image,
    t,
    t.onload
  );
  if (!i || !Rh(i))
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
function KS(n, t, e) {
  let i = e.text;
  if (i != null && (i += ""), i) {
    n.font = e.font || zs, n.textAlign = e.textAlign, n.textBaseline = e.textBaseline;
    let s, r;
    n.setLineDash && e.lineDash && ([s, r] = f_(t)), s && (n.setLineDash(s), n.lineDashOffset = r), e.strokeFirst ? (Oo(e) && n.strokeText(i, e.x, e.y), Fo(e) && n.fillText(i, e.x, e.y)) : (Fo(e) && n.fillText(i, e.x, e.y), Oo(e) && n.strokeText(i, e.x, e.y)), s && n.setLineDash([]);
  }
}
const od = ["shadowBlur", "shadowOffsetX", "shadowOffsetY"], ad = [
  ["lineCap", "butt"],
  ["lineJoin", "miter"],
  ["miterLimit", 10]
];
function d_(n, t, e, i, s) {
  let r = !1;
  if (!i && (e = e || {}, t === e))
    return !1;
  if (i || t.opacity !== e.opacity) {
    _t(n, s), r = !0;
    const o = Math.max(Math.min(t.opacity, 1), 0);
    n.globalAlpha = isNaN(o) ? Vn.opacity : o;
  }
  (i || t.blend !== e.blend) && (r || (_t(n, s), r = !0), n.globalCompositeOperation = t.blend || Vn.blend);
  for (let o = 0; o < od.length; o++) {
    const a = od[o];
    (i || t[a] !== e[a]) && (r || (_t(n, s), r = !0), n[a] = n.dpr * (t[a] || 0));
  }
  return (i || t.shadowColor !== e.shadowColor) && (r || (_t(n, s), r = !0), n.shadowColor = t.shadowColor || Vn.shadowColor), r;
}
function ld(n, t, e, i, s) {
  const r = tr(t, s.inHover), o = i ? null : e && tr(e, s.inHover) || {};
  if (r === o)
    return !1;
  let a = d_(n, r, o, i, s);
  if ((i || r.fill !== o.fill) && (a || (_t(n, s), a = !0), nd(r.fill) && (n.fillStyle = r.fill)), (i || r.stroke !== o.stroke) && (a || (_t(n, s), a = !0), nd(r.stroke) && (n.strokeStyle = r.stroke)), (i || r.opacity !== o.opacity) && (a || (_t(n, s), a = !0), n.globalAlpha = r.opacity == null ? 1 : r.opacity), t.hasStroke()) {
    const c = r.lineWidth / (r.strokeNoScale && t.getLineScale ? t.getLineScale() : 1);
    n.lineWidth !== c && (a || (_t(n, s), a = !0), n.lineWidth = c);
  }
  for (let l = 0; l < ad.length; l++) {
    const c = ad[l], h = c[0];
    (i || r[h] !== o[h]) && (a || (_t(n, s), a = !0), n[h] = r[h] || c[1]);
  }
  return a;
}
function jS(n, t, e, i, s) {
  return d_(
    n,
    tr(t, s.inHover),
    e && tr(e, s.inHover),
    i,
    s
  );
}
function p_(n, t) {
  const e = t.transform, i = n.dpr || 1;
  e ? n.setTransform(i * e[0], i * e[1], i * e[2], i * e[3], i * e[4], i * e[5]) : n.setTransform(i, 0, 0, i, 0, 0);
}
function QS(n, t, e) {
  let i = !1;
  for (let s = 0; s < n.length; s++) {
    const r = n[s];
    i = i || r.isZeroArea(), p_(t, r), t.beginPath(), r.buildPath(t, r.shape), t.clip();
  }
  e.allClipped = i;
}
function JS(n, t) {
  return n && t ? n[0] !== t[0] || n[1] !== t[1] || n[2] !== t[2] || n[3] !== t[3] || n[4] !== t[4] || n[5] !== t[5] : !(!n && !t);
}
const cd = 1, hd = 2, ud = 3, fd = 4;
function tb(n) {
  const t = Fo(n), e = Oo(n);
  return !// Line dash is dynamically set in brush function.
  (n.lineDash || !(+t ^ +e) || t && typeof n.fill != "string" || e && typeof n.stroke != "string" || n.strokePercent < 1 || n.strokeOpacity < 1 || n.fillOpacity < 1);
}
function _t(n, t) {
  t.batchFill && n.fill(), t.batchStroke && n.stroke(), t.batchFill = "", t.batchStroke = "";
}
function tr(n, t) {
  return t && n.__hoverStyle || n.style;
}
function eb(n, t) {
  Mc(n, t, { inHover: !1, viewWidth: 0, viewHeight: 0 }, !0);
}
function Mc(n, t, e, i) {
  const s = t.transform;
  if (!t.shouldBePainted(e.viewWidth, e.viewHeight, !1, !1)) {
    t.__dirty &= ~Ne, t.__isRendered = !1;
    return;
  }
  const r = t.__clipPaths, o = e.prevElClipPaths;
  let a = !1, l = !1;
  if ((!o || ES(r, o)) && (o && o.length && (_t(n, e), n.restore(), l = a = !0, e.prevElClipPaths = null, e.allClipped = !1, e.prevEl = null), r && r.length && (_t(n, e), n.save(), QS(r, n, e), a = !0), e.prevElClipPaths = r), e.allClipped) {
    t.__isRendered = !1;
    return;
  }
  t.beforeBrush && t.beforeBrush(), t.innerBeforeBrush();
  const c = e.prevEl;
  c || (l = a = !0);
  let h = t instanceof Lo && t.autoBatch && tb(t.style);
  a || JS(s, c.transform) ? (_t(n, e), p_(n, t)) : h || _t(n, e);
  const u = tr(t, e.inHover);
  t instanceof Lo ? (e.lastDrawType !== cd && (l = !0, e.lastDrawType = cd), ld(n, t, c, l, e), (!h || !e.batchFill && !e.batchStroke) && n.beginPath(), ZS(n, t, u, h), h && (e.batchFill = u.fill || "", e.batchStroke = u.stroke || "")) : t instanceof u_ ? (e.lastDrawType !== ud && (l = !0, e.lastDrawType = ud), ld(n, t, c, l, e), KS(n, t, u)) : t instanceof h_ ? (e.lastDrawType !== hd && (l = !0, e.lastDrawType = hd), jS(n, t, c, l, e), XS(n, t, u)) : t.getTemporalDisplayables && (e.lastDrawType !== fd && (l = !0, e.lastDrawType = fd), nb(n, t, e)), h && i && _t(n, e), t.innerAfterBrush(), t.afterBrush && t.afterBrush(), e.prevEl = t, t.__dirty = 0, t.__isRendered = !0;
}
function nb(n, t, e) {
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
    l.beforeBrush && l.beforeBrush(), l.innerBeforeBrush(), Mc(n, l, r, o === a - 1), l.innerAfterBrush(), l.afterBrush && l.afterBrush(), r.prevEl = l;
  }
  for (let l = 0, c = s.length; l < c; l++) {
    const h = s[l];
    h.beforeBrush && h.beforeBrush(), h.innerBeforeBrush(), Mc(n, h, r, l === c - 1), h.innerAfterBrush(), h.afterBrush && h.afterBrush(), r.prevEl = h;
  }
  t.clearTemporalDisplayables(), t.notClear = !0, n.restore();
}
const Cl = /* @__PURE__ */ new WeakMap(), dd = new or(100), pd = [
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
function ib(n, t) {
  if (n === "none")
    return null;
  const e = t.getDevicePixelRatio(), i = t.getZr(), s = i.painter.type === "svg";
  n.dirty && Cl.delete(n);
  const r = Cl.get(n);
  if (r)
    return r;
  const o = Ee(n, {
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
  return l(a), a.rotation = o.rotation, a.scaleX = a.scaleY = s ? 1 : 1 / e, Cl.set(n, a), n.dirty = !1, a;
  function l(c) {
    const h = [e];
    let u = !0;
    for (let T = 0; T < pd.length; ++T) {
      const b = o[pd[T]];
      if (b != null && !Ri(b) && !Kt(b) && !le(b) && typeof b != "boolean") {
        u = !1;
        break;
      }
      h.push(b);
    }
    let f;
    if (u) {
      f = h.join(",") + (s ? "-svg" : "");
      const T = dd.get(f);
      T && (s ? c.svgElement = T : c.image = T);
    }
    const d = __(o.dashArrayX), p = sb(o.dashArrayY), _ = g_(o.symbol), g = rb(d), m = m_(p), y = !s && sr.createCanvas(), v = s && {
      tag: "g",
      attrs: {},
      key: "dcl",
      children: []
    }, S = x();
    let w;
    y && (y.width = S.width * e, y.height = S.height * e, w = y.getContext("2d")), M(), u && dd.put(f, y || v), c.image = y, c.svgElement = v, c.svgWidth = S.width, c.svgHeight = S.height;
    function x() {
      let T = 1;
      for (let C = 0, E = g.length; C < E; ++C)
        T = iu(T, g[C]);
      let b = 1;
      for (let C = 0, E = _.length; C < E; ++C)
        b = iu(
          b,
          _[C].length
        );
      T *= b;
      const I = m * g.length * _.length;
      return {
        width: Math.max(1, Math.min(T, o.maxTileWidth)),
        height: Math.max(1, Math.min(I, o.maxTileHeight))
      };
    }
    function M() {
      w && (w.clearRect(0, 0, y.width, y.height), o.backgroundColor && (w.fillStyle = o.backgroundColor, w.fillRect(0, 0, y.width, y.height)));
      let T = 0;
      for (let P = 0; P < p.length; ++P)
        T += p[P];
      if (T <= 0)
        return;
      let b = -m, I = 0, C = 0, E = 0;
      for (; b < S.height; ) {
        if (I % 2 === 0) {
          const P = C / 2 % _.length;
          let Y = 0, V = 0, at = 0;
          for (; Y < S.width * 2; ) {
            let ue = 0;
            for (let j = 0; j < d[E].length; ++j)
              ue += d[E][j];
            if (ue <= 0)
              break;
            if (V % 2 === 0) {
              const j = (1 - o.symbolSize) * 0.5, Rt = Y + d[E][V] * j, it = b + p[I] * j, gt = d[E][V] * o.symbolSize, $ = p[I] * o.symbolSize, O = at / 2 % _[P].length;
              A(
                Rt,
                it,
                gt,
                $,
                _[P][O]
              );
            }
            Y += d[E][V], ++at, ++V, V === d[E].length && (V = 0);
          }
          ++E, E === d.length && (E = 0);
        }
        b += p[I], ++C, ++I, I === p.length && (I = 0);
      }
      function A(P, Y, V, at, ue) {
        const j = s ? 1 : e, Rt = Ao(
          ue,
          P * j,
          Y * j,
          V * j,
          at * j,
          o.color,
          o.symbolKeepAspect
        );
        if (s) {
          const it = i.painter.renderOneToVNode(
            Rt
          );
          it && v.children.push(it);
        } else
          eb(w, Rt);
      }
    }
  }
}
function g_(n) {
  if (!n || n.length === 0)
    return [["rect"]];
  if (Kt(n))
    return [[n]];
  let t = !0;
  for (let i = 0; i < n.length; ++i)
    if (!Kt(n[i])) {
      t = !1;
      break;
    }
  if (t)
    return g_([n]);
  const e = [];
  for (let i = 0; i < n.length; ++i)
    Kt(n[i]) ? e.push([n[i]]) : e.push(n[i]);
  return e;
}
function __(n) {
  if (!n || n.length === 0)
    return [[0, 0]];
  if (le(n)) {
    const i = Math.ceil(n);
    return [[i, i]];
  }
  let t = !0;
  for (let i = 0; i < n.length; ++i)
    if (!le(n[i])) {
      t = !1;
      break;
    }
  if (t)
    return __([n]);
  const e = [];
  for (let i = 0; i < n.length; ++i)
    if (le(n[i])) {
      const s = Math.ceil(n[i]);
      e.push([s, s]);
    } else {
      const s = ce(n[i], (r) => Math.ceil(r));
      s.length % 2 === 1 ? e.push(s.concat(s)) : e.push(s);
    }
  return e;
}
function sb(n) {
  if (!n || typeof n == "object" && n.length === 0)
    return [0, 0];
  if (le(n)) {
    const e = Math.ceil(n);
    return [e, e];
  }
  const t = ce(n, (e) => Math.ceil(e));
  return n.length % 2 ? t.concat(t) : t;
}
function rb(n) {
  return ce(n, function(t) {
    return m_(t);
  });
}
function m_(n) {
  let t = 0;
  for (let e = 0; e < n.length; ++e)
    t += n[e];
  return n.length % 2 === 1 ? t * 2 : t;
}
const y_ = 0, Ah = 1, kh = 2, ob = 10, ab = 9, co = "highlight", lb = "downplay", v_ = "select", cb = "unselect", x_ = "toggleSelect", hb = pt(), Ph = pt();
function hi(n) {
  return n != null && n !== "none";
}
const gd = new or(100);
function _d(n) {
  if (Kt(n)) {
    let t = gd.get(n);
    return t || (t = Gf(n, -0.1), gd.put(n, t)), t;
  } else if (ya(n)) {
    const t = R({}, n);
    return t.colorStops = ce(n.colorStops, (e) => ({
      offset: e.offset,
      color: Gf(e.color, -0.1)
    })), t;
  }
  return n;
}
function w_(n) {
  n.stateProxy = Dl;
  const t = n.getTextContent(), e = n.getTextGuideLine();
  t && (t.stateProxy = Dl), e && (e.stateProxy = Dl);
}
function ub(n, t, e, i) {
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
function fb(n, t, e, i) {
  const s = e && Ct(e, "select") >= 0;
  let r = !1;
  if (n instanceof zrender.Path) {
    const o = hb(n), a = s && o.selectFill || o.normalFill, l = s && o.selectStroke || o.normalStroke;
    if (hi(a) || hi(l)) {
      i = i || {};
      let c = i.style || {};
      c.fill === "inherit" ? (r = !0, i = R({}, i), c = R({}, c), c.fill = a) : !hi(c.fill) && hi(a) ? (r = !0, i = R({}, i), c = R({}, c), c.fill = _d(a)) : !hi(c.stroke) && hi(l) && (r || (i = R({}, i), c = R({}, c)), c.stroke = _d(l)), i.style = c;
    }
  }
  if (i && i.z2 == null) {
    r || (i = R({}, i));
    const o = n.z2EmphasisLift;
    i.z2 = n.z2 + (o != null ? o : ob);
  }
  return i;
}
function db(n, t, e) {
  if (e && e.z2 == null) {
    e = R({}, e);
    const i = n.z2SelectLift;
    e.z2 = n.z2 + (i != null ? i : ab);
  }
  return e;
}
function pb(n, t, e) {
  const i = Ct(n.currentStates, t) >= 0, s = n.style.opacity, r = i ? null : ub(n, ["opacity"], t, {
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
function Dl(n, t) {
  const e = this.states[n];
  if (this.style) {
    if (n === "emphasis")
      return fb(this, n, t, e);
    if (n === "blur")
      return pb(this, n, e);
    if (n === "select")
      return db(this, n, e);
  }
  return e;
}
function gb(n, t, e) {
  _b(n), Gi(n, w_), wb(n);
}
function Gi(n, t, e) {
  md(n, t, e), n.isGroup && n.traverse(function(i) {
    md(i, t, e);
  });
}
function md(n, t, e) {
  t(n, e);
}
function _b(n, t) {
  const e = n;
  n.highDownSilentOnTouch && (e.__highDownSilentOnTouch = n.highDownSilentOnTouch), e.__highByOuter = e.__highByOuter || 0, e.__highDownDispatcher = !0;
}
function Ia(n, t, e) {
  n.onHoverStateChange && (n.hoverState || 0) !== e && n.onHoverStateChange(t), n.hoverState = e;
}
function mb(n) {
  Ia(n, "emphasis", kh);
}
function S_(n) {
  Ia(n, "blur", Ah);
}
function b_(n) {
  n.hoverState === Ah && Ia(n, "normal", y_);
}
function yb(n) {
  n.hoverState === kh && Ia(n, "normal", y_);
}
function vb(n) {
  n.selected = !0;
}
function xb(n) {
  n.selected = !1;
}
function wb(n, t, e) {
  const i = jn(n);
  i.focus && (i.focus = null);
}
function yd(n, t) {
  n.__highByOuter |= 1 << (t || 0), Gi(n, mb);
}
function vd(n, t) {
  !(n.__highByOuter &= ~(1 << (t || 0))) && Gi(n, yb);
}
function Cc(n) {
  const t = n.type;
  return t === v_ || t === cb || t === x_;
}
function xd(n) {
  const t = n.type;
  return t === co || t === lb;
}
function Sb(n) {
  Gi(n, b_);
}
function bb(n) {
  Gi(n, vb);
}
function Tb(n) {
  Gi(n, xb);
}
function Mb(n) {
  const t = n.getModel(), e = [], i = [];
  t.eachComponent(function(s, r) {
    const o = Ph(r), a = s === "series", l = a ? n.getViewOfSeriesModel(r) : n.getViewOfComponentModel(r);
    !a && i.push(l), o.isBlured && (l.group.traverse(function(c) {
      b_(c);
    }), a && e.push(r)), o.isBlured = !1;
  }), D(i, function(s) {
    s && s.toggleBlurSeries && s.toggleBlurSeries(e, !1, t);
  });
}
function wd(n, t, e, i) {
  const s = i.getModel();
  e = e || "coordinateSystem";
  function r(c, h) {
    for (let u = 0; u < h.length; u++) {
      const f = c.getItemGraphicEl(h[u]);
      f && Sb(f);
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
        p.__highByOuter && h && t === "self" || S_(p);
      }), It(t))
        r(c.getData(), t);
      else if (F(t)) {
        const p = tt(t);
        for (let _ = 0; _ < p.length; _++)
          r(
            c.getData(p[_]),
            t[p[_]]
          );
      }
      l.push(c), Ph(c).isBlured = !0;
    }
  }), s.eachComponent(function(c, h) {
    if (c === "series")
      return;
    const u = i.getViewOfComponentModel(h);
    u && u.toggleBlurSeries && u.toggleBlurSeries(l, !0, s);
  });
}
function Cb(n, t, e) {
  if (n == null || t == null)
    return;
  const i = e.getModel().getComponent(n, t);
  if (!i)
    return;
  Ph(i).isBlured = !0;
  const s = e.getViewOfComponentModel(i);
  !s || !s.focusBlurEnabled || s.group.traverse(function(r) {
    S_(r);
  });
}
function Db(n, t, e) {
  const i = n.seriesIndex, s = n.getData(t.dataType);
  if (!s)
    return;
  let r = Tp(s, t);
  r = (K(r) ? r[0] : r) || 0;
  let o = s.getItemGraphicEl(r);
  if (!o) {
    const a = s.count();
    let l = 0;
    for (; !o && l < a; )
      o = s.getItemGraphicEl(l++);
  }
  if (o) {
    const a = jn(o);
    wd(i, a.focus, a.blurScope, e);
  } else {
    const a = n.get(["emphasis", "focus"]), l = n.get(["emphasis", "blurScope"]);
    a != null && wd(i, a, l, e);
  }
}
function Ib(n, t, e) {
  if (!Cc(t))
    return;
  const i = t.dataType, s = n.getData(i);
  let r = Tp(s, t);
  K(r) || (r = [r]), n[t.type === x_ ? "toggleSelect" : t.type === v_ ? "select" : "unselect"](r, i);
}
function Eb(n, t, e, i) {
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
    if (jn(a[c]).focus === "self") {
      l = !0;
      break;
    }
  return { focusSelf: l, dispatchers: a };
}
function Rb(n) {
  const t = n.getAllData();
  D(t, function({ data: e, type: i }) {
    e.eachItemGraphicEl(function(s, r) {
      n.isSelected(r, i) ? bb(s) : Tb(s);
    });
  });
}
function Ab(n) {
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
function kb(n, t, e, i, s) {
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
function Pb(n, t, e, i, s) {
  if (n) {
    if (n.type !== "polar") {
      if (n.type === "cartesian2d")
        return kb(n, t, e);
    }
  } else return null;
  return null;
}
const Lb = ["x", "y"], T_ = "emphasis", Lh = "normal", Ob = "blur", Fb = "select", Bo = [Lh, T_, Ob, Fb], Bb = "p\0\0", Nb = {
  cartesian2d: Iw
}, te = {
  normal: {},
  emphasis: {},
  blur: {},
  select: {}
}, Jo = class Jo extends Ai {
  constructor() {
    super(...arguments), this.type = Jo.type;
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
    const u = Sd(t, o, e, i);
    a.forEach((f) => {
      const d = l.get(f), p = c.get(f), _ = d == null ? null : r == null ? void 0 : r.getItemGraphicEl(d);
      if (p == null) {
        _ && this.group.remove(_);
        return;
      }
      Il(
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
    const r = this._data, o = t.getData(), a = this.group, l = Sd(t, o, e, i);
    r || a.removeAll(), o.diff(r).add(function(h) {
      Il(
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
      u && Ih(
        u,
        rn(u).option,
        t
      );
    }).update(function(h, u) {
      const f = r.getItemGraphicEl(u);
      Il(
        i,
        f,
        h,
        l(h, s),
        t,
        a,
        o
      );
    }).execute();
    const c = t.get("clip", !0) ? Pb(
      t.coordinateSystem,
      !1,
      t
    ) : null;
    c ? a.setClipPath(c) : a.removeClipPath(), this._data = o;
  }
};
Jo.type = "custom";
let Dc = Jo;
function Sd(n, t, e, i) {
  const s = n.get("renderItem"), r = n.coordinateSystem;
  let o = {};
  r && (o = r.prepareCustoms ? r.prepareCustoms(r) : Nb[r.type](r));
  const a = xt(
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
      xt(
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
function Il(n, t, e, i, s, r, o) {
  if (!i) {
    r.remove(t);
    return;
  }
  const a = Oh(
    n,
    t,
    e,
    i,
    s,
    r
  );
  return a && o.setItemGraphicEl(e, a), a;
}
function Oh(n, t, e, i, s, r) {
  let o = -1;
  const a = t;
  t && Vb(t, i, s) && (o = ot(r.childrenRef(), t), t = null);
  const l = !t;
  let c = t;
  c ? c.clearStates() : (c = Wb(i), a && jb(a, c)), i.morph === !1 ? c.disableMorphing = !0 : c.disableMorphing && (c.disableMorphing = !1), te.normal.cfg = te.normal.conOpt = te.emphasis.cfg = te.emphasis.conOpt = te.blur.cfg = te.blur.conOpt = te.select.cfg = te.select.conOpt = null, te.isLegacy = !1, Ub(
    n,
    c,
    e,
    i,
    te,
    s,
    l
  ), Ce(i, "info") && (rn(c).info = i.info);
  for (let h = 0; h < Bo.length; h++) {
    const u = Bo[h];
    if (u !== Lh) {
      const f = M_(i, u), d = Kb(
        i,
        f,
        u
      );
      qb(
        u,
        c,
        f,
        d,
        te
      );
    }
  }
  return Zb(c, i, s), i.type === "group" && Hb(
    n,
    c,
    e,
    i,
    s
  ), zb(n, c, i), o >= 0 ? r.replaceAt(c, o) : r.add(c), c;
}
function zb(n, t, e) {
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
function Hb(n, t, e, i, s) {
  const r = i.children, o = r ? r.length : 0, a = i.$mergeChildren, l = a === "byName" || i.diffChildrenByName, c = a === !1;
  if (!o && !l && !c)
    return;
  if (l) {
    Gb({
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
    u ? (u.ignore == null && (u.ignore = !1), Oh(
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
    $b(t, f, s);
  }
}
function $b(n, t, e) {
  t && Ih(t, rn(n).option, e);
}
function Gb(n) {
  new Wg(
    n.oldChildren,
    n.newChildren,
    bd,
    bd,
    n
  ).add(Td).update(Td).remove(Yb).execute();
}
function bd(n, t) {
  const e = n && n.name;
  return e != null ? e : Bb + t;
}
function Td(n, t) {
  const e = this.context, i = n != null ? e.newChildren[n] : null, s = t != null ? e.oldChildren[t] : null;
  Oh(
    e.api,
    s,
    e.dataIndex,
    i,
    e.seriesModel,
    e.group
  );
}
function Yb(n) {
  const t = this.context, e = t.oldChildren[n];
  e && Ih(
    e,
    rn(e).option,
    t.seriesModel
  );
}
function Vb(n, t, e) {
  const i = rn(n), s = t.type, r = t == null ? void 0 : t.shape, o = t == null ? void 0 : t.style;
  return e.isUniversalTransitionEnabled() || s != null && s !== i.customGraphicType || s === "path" && Qb(r) && C_(r) !== i.customPathData || s === "image" && Ce(o, "image") && o.image !== i.customImagePath;
}
function Wb(n) {
  const t = n.type;
  let e;
  if (t === "path") {
    const i = n.shape, s = i.width != null && i.height != null ? {
      x: i.x || 0,
      y: i.y || 0,
      width: i.width,
      height: i.height
    } : null, r = C_(i);
    e = Gg(
      r,
      null,
      s,
      i.layout || "center"
    ), rn(e).customPathData = r;
  } else if (t === "image")
    e = new (void 0)({}), rn(e).customImagePath = n.style.image;
  else if (t === "text")
    e = new (void 0)({});
  else if (t === "group")
    e = new (void 0)();
  else {
    const i = tw(t);
    e = new i();
  }
  return rn(e).customGraphicType = t, e.name = n.name, e.z2EmphasisLift = 1, e.z2SelectLift = 1, e;
}
function Ub(n, t, e, i, s, r, o) {
  $w(t);
  const a = s && s.normal.cfg;
  a && t.setTextConfig(a), i && i.transition == null && (i.transition = Lb);
  const l = i && i.style;
  if (l) {
    if (t.type === "text") {
      const u = l;
      Ce(u, "textFill") && (u.fill = u.textFill), Ce(u, "textStroke") && (u.stroke = u.textStroke);
    }
    let c;
    const h = Ic(t) ? l.decal : null;
    n && h && (h.dirty = !0, c = ib(h, n)), l.__decalPattern = c;
  }
  if (Ec(t) && l) {
    const c = l.__decalPattern;
    c && (l.decal = c);
  }
  Rw(t, i, r, {
    dataIndex: e,
    isInit: o,
    clearStyle: !0
  });
}
function qb(n, t, e, i, s) {
  const r = t.isGroup ? null : t, o = s && s[n].cfg;
  if (r) {
    const a = r.ensureState(n);
    if (i === !1) {
      const l = r.getState(n);
      l && (l.style = null);
    } else
      a.style = i || null;
    o && (a.textConfig = o), w_(r);
  }
}
function Zb(n, t, e) {
  if (n.isGroup)
    return;
  const i = n, s = e.currentZ, r = e.currentZLevel;
  i.z = s, i.zlevel = r;
  const o = t.z2;
  o != null && (i.z2 = o || 0);
  for (let a = 0; a < Bo.length; a++)
    Xb(i, t, Bo[a]);
}
function Xb(n, t, e) {
  const i = e === Lh, s = i ? t : M_(
    t,
    e
  ), r = s ? s.z2 : null;
  let o;
  r != null && (o = i ? n : n.ensureState(e), o.z2 = r || 0);
}
function M_(n, t) {
  return t ? n ? n[t] : null : n;
}
function Kb(n, t, e) {
  let i = t && t.style;
  return i == null && e === T_ && n && (i = n.styleEmphasis), i;
}
function Ic(n) {
  return n instanceof zrender.Path;
}
function Ec(n) {
  return n instanceof zrender.Displayable;
}
function jb(n, t) {
  t.copyTransform(n), Ec(t) && Ec(n) && (t.setStyle(n.style), t.z = n.z, t.z2 = n.z2, t.zlevel = n.zlevel, t.invisible = n.invisible, t.ignore = n.ignore, Ic(t) && Ic(n) && t.setShape(n.shape));
}
function C_(n) {
  return n && (n.pathData || n.d);
}
function Qb(n) {
  return n && (Ce(n, "pathData") || Ce(n, "d"));
}
function Jb(n) {
  n.registerChartView(Dc), n.registerSeriesModel(gc);
}
let t2 = 0;
class Fh {
  constructor(t) {
    this.categories = t.categories || [], this._needCollect = t.needCollect, this._deduplication = t.deduplication, this.uid = ++t2;
  }
  getOrdinal(t) {
    return this._getOrCreateMap().get(t);
  }
  parseAndCollect(t) {
    let e;
    const i = this._needCollect;
    if (!Kt(t) && !i)
      return t;
    if (i && !this._deduplication)
      return e = this.categories.length, this.categories[e] = t, e;
    const s = this._getOrCreateMap();
    return e = s.get(t), e == null && (i ? (e = this.categories.length, this.categories[e] = t, s.set(t, e)) : e = NaN), e;
  }
  _getOrCreateMap() {
    return this._map || (this._map = B(this.categories));
  }
  static createByAxisModel(t) {
    const e = t.option, i = e.data, s = i && ce(i, e2);
    return new Fh({
      categories: s,
      needCollect: !s,
      // deduplication is default in axis.
      deduplication: e.dedplication !== !1
    });
  }
}
function e2(n) {
  return ae(n) && n.value != null ? n.value : n + "";
}
const n2 = { value: 1, category: 1, time: 1, log: 1 }, D_ = {
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
}, i2 = dt(
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
  D_
), Bh = dt(
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
  D_
), s2 = dt(
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
  Bh
), r2 = xt(
  {
    logBase: 10
  },
  Bh
), o2 = {
  category: i2,
  value: Bh,
  time: s2,
  log: r2
};
function Md(n, t, e, i) {
  nt(n2, function(s, r) {
    const o = Je(
      Je({}, o2[r], !0),
      i,
      !0
    ), l = class l extends e {
      constructor() {
        super(...arguments), this.type = t + "Axis." + r;
      }
      mergeDefaultAndTheme(h, u) {
        const f = Np(this), d = f ? Ys(h) : {};
        Je(h, this.getDefaultOption()), h.type = Cd(h), f && zp(
          h,
          d,
          f
        );
      }
      optionUpdated() {
        this.option.type === "category" && (this.__ordinalMeta = Fh.createByAxisModel(this));
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
  }), n.registerSubTypeDefaulter(t + "Axis", Cd);
}
function Cd(n) {
  return n.type || (n.data ? "category" : "value");
}
class a2 {
  getNeedCrossZero() {
    return !this.option.scale;
  }
  getCoordSysModel() {
  }
}
const Wh = class Wh extends W {
  getCoordSysModel() {
    return this.getReferringComponents("grid", De).models[0];
  }
};
Wh.type = "cartesian2dAxis";
let er = Wh;
nh(er, a2);
const ta = class ta extends Jt {
  constructor() {
    super(...arguments), this.type = ta.type;
  }
  render(t, e, i, s) {
    super.render.apply(this, arguments);
  }
};
ta.type = "axis";
let Rc = ta;
const Ac = Math.PI;
class ho {
  constructor(t, e) {
    this.group = new zrender.Group(), this.axisModel = t, this.opt = e, Ee(e, {
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
    l2[t](this.opt, this.axisModel, this.group, this._transformGroup);
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
    const s = L0(e - t);
    let r, o;
    return su(s) ? (o = i > 0 ? "top" : "bottom", r = "center") : su(s - Ac) ? (o = i > 0 ? "bottom" : "top", r = "center") : (o = "middle", s > 0 && s < Ac ? r = i > 0 ? "right" : "left" : r = i > 0 ? "left" : "right"), {
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
const l2 = {
  axisLine(n, t, e, i) {
    let s = t.get(["axisLine", "show"]);
    if (s == "auto" && n.handleAutoShown && (s = n.handleAutoShown("axisLine")), !s)
      return;
    const r = t.axis.getExtent(), o = i.transform, a = [r[0], 0], l = [r[1], 0], c = a[0] > l[0];
    o && (Me(a, a, o), Me(l, l, o));
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
    Vg(u.shape, u.style.lineWidth), u.anid = "line", e.add(u);
    let f = t.get(["axisLine", "symbol"]);
    if (f != null) {
      let d = t.get(["axisLine", "symbolSize"]);
      Kt(f) && (f = [f, f]), (Kt(d) || le(d)) && (d = [d, d]);
      const p = Kw(
        t.get(["axisLine", "symbolOffset"]) || 0,
        d
      ), _ = d[0], g = d[1];
      nt(
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
            const v = Ao(
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
    const s = c2(e, i, t, n), r = u2(e, i, t, n);
    h2(e, i, t, n), f2(t, r, s);
  },
  axisName(n, t, e, i) {
  }
};
function c2(n, t, e, i) {
  const s = e.axis, r = e.getModel("axisTick");
  let o = r.get("show");
  if (o === "auto" && i.handleAutoShown && (o = i.handleAutoShown("axisTick")), !o || s.scale.isBlank())
    return;
  const a = r.getModel("lineStyle"), l = i.tickDirection * r.get("length"), c = s.getTicksCoords(), h = I_(
    c,
    t.transform,
    l,
    Ee(a.getLineStyle(), {
      stroke: e.get(["axisLine", "lineStyle", "color"])
    }),
    "ticks"
  );
  for (let u = 0; u < h.length; u++)
    n.add(h[u]);
  return h;
}
function h2(n, t, e, i) {
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
  const f = I_(
    u,
    t.transform,
    c,
    Ee(a.getLineStyle(), {
      stroke: e.get(["axisLine", "lineStyle", "color"])
    }),
    "minorTicks"
  );
  for (let d = 0; d < f.length; d++)
    n.add(f[d]);
}
function u2(n, t, e, i) {
  const s = e.axis;
  if (!$l(i.axisLabelShow, e.get(["axisLabel", "show"])) || s.scale.isBlank())
    return;
  const o = e.getModel("axisLabel"), a = o.get("margin"), l = s.getViewLabels(), c = ($l(i.labelRotate, o.get("rotate")) || 0) * Ac / 180, h = ho.innerTextLayout(
    i.rotation,
    c,
    i.labelDirection
  ), u = e.getCategories && e.getCategories(!0), f = [], d = ho.isLabelSilent(e), p = e.get("triggerEvent");
  return nt(l, function(_, g) {
    const m = s.scale.type === "ordinal" ? s.scale.getRawOrdinalNumber(_.tickValue) : _.tickValue, y = _.formattedLabel, v = _.rawLabel;
    let S = o;
    if (u && u[m]) {
      const T = u[m];
      F(T) && T.textStyle && (S = new Et(
        T.textStyle,
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
      style: Lp(S, {
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
      const T = ho.makeAxisEventDataBase(e);
      T.targetType = "axisLabel", T.value = v, T.tickIndex = g, s.type === "category" && (T.dataIndex = m), jn(M).eventData = T;
    }
    t.add(M), M.updateTransform(), f.push(M), n.add(M), M.decomposeTransform();
  }), f;
}
function I_(n, t, e, i, s) {
  const r = [], o = [], a = [];
  for (let l = 0; l < n.length; l++) {
    const c = n[l].coord;
    o[0] = c, o[1] = 0, a[0] = c, a[1] = e, t && (Me(o, o, t), Me(a, a, t));
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
    Vg(h.shape, h.style.lineWidth), h.anid = s + "_" + n[l].tickValue, r.push(h);
  }
  return r;
}
function f2(n, t, e) {
  if (wg(n.axis))
    return;
  const i = n.get(["axisLabel", "showMinLabel"]), s = n.get(["axisLabel", "showMaxLabel"]);
  t = t || [], e = e || [];
  const r = t[0], o = t[1], a = t[t.length - 1], l = t[t.length - 2], c = e[0], h = e[1], u = e[e.length - 1], f = e[e.length - 2];
  i === !1 ? (At(r), At(c)) : Dd(r, o) && (i ? (At(o), At(h)) : (At(r), At(c))), s === !1 ? (At(a), At(u)) : Dd(l, a) && (s ? (At(l), At(f)) : (At(a), At(u)));
}
function At(n) {
  n && (n.ignore = !0);
}
function Dd(n, t) {
  const e = n && n.getBoundingRect().clone(), i = t && t.getBoundingRect().clone();
  if (!e || !i)
    return;
  const s = Op([]);
  return Fp(s, s, -n.rotation), e.applyTransform(
    ys([], s, n.getLocalTransform())
  ), i.applyTransform(
    ys([], s, t.getLocalTransform())
  ), e.intersect(i);
}
const d2 = ["axisLine", "axisTickLabel", "axisName"], p2 = ["splitArea", "splitLine", "minorSplitLine"], ea = class ea extends Rc {
  constructor() {
    super(...arguments), this.type = ea.type, this._nowLineTimer = null, this._nowLine = null;
  }
  render(t, e, i, s) {
    this.api = i, this._nowLineTimer && (clearInterval(this._nowLineTimer), this._nowLineTimer = null), this.group.removeAll();
    const r = this._axisGroup;
    if (this._axisGroup = new (void 0)(), this.group.add(this._axisGroup), !t.get("show"))
      return;
    const o = t.getCoordSysModel(), a = dv(o, t), l = new ho(
      t,
      N(
        {
          handleAutoShown(h) {
            const u = o.coordinateSystem.getCartesians();
            for (let f = 0; f < u.length; f++)
              if (o1(
                u[f].getOtherAxis(t.axis).scale
              ))
                return !0;
            return !1;
          }
        },
        a
      )
    );
    t.axis.dim === "x" && t.axis.type === "time" && this.renderTimelineHeader(t, o, i), D(d2, l.add, l), this._axisGroup.add(l.getGroup()), D(
      p2,
      function(h) {
        t.get([h, "show"]) && g2[h](this, this._axisGroup, t, o);
      },
      this
    ), t.axis.dim === "x" && t.axis.type === "time" && this.renderNowLine(t, o), s && s.type === "changeAxisOrder" && s.isInitSort || ew(r, this._axisGroup, t), super.render(t, e, i, s);
  }
  dispose() {
    this._nowLineTimer && (clearInterval(this._nowLineTimer), this._nowLineTimer = null), this._nowLine = null, super.dispose.apply(this, arguments);
  }
  renderTimelineHeader(t, e, i) {
    const s = rt(), o = e.coordinateSystem.getRect(), a = Math.max(0, o.y - 56), l = o.y, c = Math.max(0, l - a), h = new (void 0)({ silent: !0 });
    h.add(new (void 0)({
      shape: { x: 0, y: a, width: i.getWidth(), height: l - a },
      style: { fill: s.panel },
      z2: -10,
      silent: !0
    })), h.add(new (void 0)({
      shape: { x1: 0, y1: l, x2: i.getWidth(), y2: l },
      style: { stroke: s.border, lineWidth: 1 },
      z2: 1,
      silent: !0
    })), h.add(new (void 0)({
      shape: { x1: o.x, y1: a, x2: o.x, y2: l },
      style: { stroke: s.border, lineWidth: 1 },
      z2: 1,
      silent: !0
    }));
    const u = t.axis.scale.getExtent(), f = new Date(Number(u[0])), d = ["日", "一", "二", "三", "四", "五", "六"], p = Number.isFinite(f.getTime()) ? `${f.getMonth() + 1}月${f.getDate()}日 · 周${d[f.getDay()]}` : "";
    h.add(new (void 0)({
      style: {
        x: 16,
        y: a + c / 2,
        text: "资源",
        fill: s.muted,
        fontSize: 12,
        align: "left",
        verticalAlign: "middle"
      },
      z2: 8,
      silent: !0
    })), h.add(new (void 0)({
      style: {
        x: o.x + 12,
        y: a + 14,
        text: p,
        fill: s.muted,
        fontSize: 12,
        align: "left",
        verticalAlign: "middle"
      },
      z2: 8,
      silent: !0
    })), this._axisGroup.add(h);
  }
  renderNowLine(t, e) {
    const i = rt(), s = t.axis, o = e.coordinateSystem.getRect(), a = kc(this.api, o), l = new zrender.Line({
      shape: {
        x1: o.x,
        y1: o.y,
        x2: o.x,
        y2: a
      },
      style: {
        stroke: i.currentTime,
        lineWidth: 2,
        opacity: 0.88
      },
      z2: 6,
      silent: !0
    }), c = () => {
      const h = Date.now(), u = s.scale.getExtent(), f = Math.min(u[0], u[1]), d = Math.max(u[0], u[1]), p = h >= f && h <= d;
      if (l.ignore = !p, p) {
        const _ = s.toGlobalCoord(s.dataToCoord(h));
        l.setShape({ x1: _, x2: _ });
      }
      l.dirty(), this.api.getZr().refresh();
    };
    this._nowLine = l, this._axisGroup.add(l), c(), this._nowLineTimer = setInterval(c, 1e3);
  }
};
ea.type = "cartesianAxis";
let No = ea;
function kc(n, t) {
  const e = { width: n.getWidth(), height: n.getHeight() };
  let i = t.y + t.height;
  return n.getModel().eachComponent("dataZoom", function(s) {
    if (s.subType !== "slider" || s.getOrient() !== "horizontal" || s.get("show") === !1)
      return;
    const r = Vs(
      Ys(s.option),
      e
    );
    i = Math.max(i, r.y);
  }), Math.min(i, e.height);
}
const g2 = {
  splitLine(n, t, e, i) {
    const s = rt(), r = e.axis, a = i.coordinateSystem.getRect(), l = r.getTicksCoords(), c = kc(n.api, a);
    r.dim === "x" && l.forEach(function(h) {
      const u = a.x + h.coord, f = new Date(h.tickValue), d = Number.isFinite(f.getTime()) && f.getMinutes() === 0;
      t.add(new zrender.Line({
        shape: {
          x1: u,
          y1: a.y,
          x2: u,
          y2: c
        },
        style: {
          stroke: d ? s.gridMajor : s.gridMinor,
          lineWidth: d ? 1.5 : 1,
          lineDash: null
        },
        z2: 0,
        silent: !0
      }));
    });
  },
  minorSplitLine(n, t, e, i) {
    const s = rt(), r = e.axis;
    if (r.dim !== "x") return;
    const a = i.coordinateSystem.getRect(), l = r.getTicksCoords(), c = kc(n.api, a);
    for (let h = 0; h < l.length - 1; h++) {
      const u = a.x + (l[h].coord + l[h + 1].coord) / 2;
      t.add(new zrender.Line({
        shape: {
          x1: u,
          y1: a.y,
          x2: u,
          y2: c
        },
        style: {
          stroke: s.gridMinor,
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
}, na = class na extends No {
  constructor() {
    super(...arguments), this.type = na.type;
  }
};
na.type = "xAxis";
let zo = na;
const Uh = class Uh extends No {
  constructor() {
    super(...arguments), this.type = zo.type;
  }
};
Uh.type = "yAxis";
let Pc = Uh;
const Id = {
  // gridIndex: 0,
  // gridId: '',
  offset: 0
};
function _2(n) {
  Md(
    n,
    "x",
    er,
    Id
  ), Md(
    n,
    "y",
    er,
    Id
  ), n.registerComponentView(zo), n.registerComponentView(Pc), n.registerPreprocessor(function(t) {
    t.xAxis && t.yAxis && !t.grid && (t.grid = {});
  });
}
const m2 = ["x", "y"], y2 = ["cartesian2d"];
function Wn(n) {
  return n + "Axis";
}
function v2(n) {
  const t = n.get("coordinateSystem");
  return ot(y2, t) >= 0;
}
function E_(n) {
  const t = n.piModel, e = {
    infoList: [],
    infoMap: B()
  };
  return n.eachTargetAxis(function(i, s) {
    const r = t.getComponent(
      Wn(i),
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
function x2(n, t) {
  const e = B(), i = [], s = B();
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
class Ed {
  constructor() {
    this.indexList = [], this.indexMap = [];
  }
  add(t) {
    this.indexMap[t] || (this.indexList.push(t), this.indexMap[t] = !0);
  }
}
const yi = class yi extends W {
  constructor() {
    super(...arguments), this.type = yi.type, this._autoThrottle = !0, this._noTarget = !0, this._rangePropMode = ["percent", "percent"];
  }
  init(t, e, i) {
    const s = w2(t);
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
        Wn(t),
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
    const t = this.get("orient", !0), e = this._targetAxisInfoMap = B();
    this._fillSpecifiedTargetAxis(e) ? this._orient = t || this._makeAutoOrientByTargetAxis() : (this._orient = t || "horizontal", this._fillAutoTargetAxisByOrient(e, this._orient)), this._noTarget = !0, e.each(function(s) {
      s.indexList.length && (this._noTarget = !1);
    }, this);
  }
  _fillSpecifiedTargetAxis(t) {
    let e = !1;
    return D(
      m2,
      function(i) {
        const s = this.getReferringComponents(
          Wn(i),
          um
        );
        if (!s.specified)
          return;
        e = !0;
        const r = new Ed();
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
      const c = new Ed();
      if (c.add(l.componentIndex), t.set(a, c), s = !1, a === "x" || a === "y") {
        const h = l.getReferringComponents(
          "grid",
          De
        ).models[0];
        h && D(o, function(u) {
          l.componentIndex !== u.componentIndex && h === u.getReferringComponents("grid", De).models[0] && c.add(u.componentIndex);
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
        Wn(e),
        i
      ));
    }, this), t;
  }
};
yi.type = "dataZoom", yi.dependencies = ["xAxis", "yAxis"], yi.defaultOption = {
  // zlevel: 0,
  z: 4,
  // Higher than normal component (z: 2).
  filterMode: "filter",
  start: 0,
  end: 100
};
let Oi = yi;
function w2(n) {
  const t = {};
  return D(
    ["start", "end", "startValue", "endValue", "throttle"],
    function(e) {
      n.hasOwnProperty(e) && (t[e] = n[e]);
    }
  ), t;
}
function S2(n) {
  n.registerAction(
    "dataZoom",
    function(t, e) {
      const i = x2(e, t);
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
function Nh(n, t, e, i, s, r) {
  n = n || 0;
  const o = e[1] - e[0];
  if (s != null && (s = ui(s, [0, o])), r != null && (r = Math.max(r, s != null ? s : 0)), i === "all") {
    let u = Math.abs(t[1] - t[0]);
    u = ui(u, [0, o]), s = r = ui(u, [s, r]), i = 0;
  }
  t[0] = ui(t[0], e), t[1] = ui(t[1], e);
  const a = El(t, i);
  t[i] += n;
  const l = s || 0, c = e.slice();
  a.sign < 0 ? c[0] += l : c[1] -= l, t[i] = ui(t[i], c);
  let h;
  return h = El(t, i), s != null && (h.sign !== a.sign || h.span < s) && (t[1 - i] = t[i] + a.sign * s), h = El(t, i), r != null && h.span > r && (t[1 - i] = t[i] + h.sign * r), t;
}
function El(n, t) {
  const e = n[t] - n[1 - t];
  return { span: Math.abs(e), sign: e > 0 ? -1 : e < 0 ? 1 : t ? -1 : 1 };
}
function ui(n, t) {
  return Math.min(
    t[1] != null ? t[1] : 1 / 0,
    Math.max(t[0] != null ? t[0] : -1 / 0, n)
  );
}
const Rd = ls;
class b2 {
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
      if (v2(e)) {
        const i = Wn(this._dimName), s = e.getReferringComponents(
          i,
          De
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
        lt(p, o, e)
      )) : (c = !0, _ = _ == null ? e[d] : s.parse(_), p = lt(
        _,
        e,
        o
      )), l[d] = _ == null || isNaN(_) ? e[d] : _, a[d] = p == null || isNaN(p) ? o[d] : p;
    }), Rd(l), Rd(a);
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
      Nh(
        0,
        f,
        p,
        "all",
        h["min" + m],
        h["max" + m]
      );
      for (let y = 0; y < 2; y++)
        d[y] = lt(
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
    this._dataExtent = T2(this, this._dimName, e), this._updateMinMaxSpan();
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
          const u = c.getStore(), f = G(
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
        o != null && (o = this.getAxisModel().axis.scale.parse(o)), o != null ? r = lt(
          i[0] + o,
          i,
          [0, 100],
          !0
        ) : r != null && (o = lt(r, [0, 100], i, !0) - i[0]), t[s + "Span"] = r, t[s + "ValueSpan"] = o;
      },
      this
    );
  }
  _setAxisModel() {
    const t = this.getAxisModel(), e = this._percentWindow, i = this._valueWindow;
    if (!e)
      return;
    let s = xp(i, [0, 500]);
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
function T2(n, t, e) {
  const i = [1 / 0, -1 / 0];
  D(e, function(o) {
    V1(i, o.getData(), t);
  });
  const s = n.getAxisModel(), r = yg(
    s.axis.scale,
    s,
    i
  ).calculate();
  return [r.min, r.max];
}
const M2 = {
  getTargetSeries(n) {
    function t(s) {
      n.eachComponent(
        "dataZoom",
        function(r) {
          r.eachTargetAxis(function(o, a) {
            const l = n.getComponent(
              Wn(o),
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
      o.__dzAxisProxy || (o.__dzAxisProxy = new b2(
        s,
        r,
        a,
        n
      ), e.push(o.__dzAxisProxy));
    });
    const i = B();
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
let Ad = !1;
function R_(n) {
  Ad || (Ad = !0, n.registerProcessor(n.PRIORITY.PROCESSOR.FILTER, M2), S2(n), n.registerSubTypeDefaulter("dataZoom", function() {
    return "slider";
  }));
}
const ia = class ia extends Jt {
  constructor() {
    super(...arguments), this.type = ia.type;
  }
  render(t, e, i, s) {
    this.dataZoomModel = t, this.piModel = e, this.api = i;
  }
};
ia.type = "dataZoom";
let Ho = ia;
const kd = 7, C2 = 1, Rl = 30, D2 = 7, rs = "horizontal", Pd = "vertical", I2 = 5, E2 = ["line", "bar", "candlestick", "scatter"], R2 = {
  easing: "cubicOut",
  duration: 100,
  delay: 0
}, sa = class sa extends Ho {
  constructor() {
    super(...arguments), this.type = sa.type, this._displayables = {};
  }
  init(t, e) {
    this.api = e, this._onBrush = L(this._onBrush, this), this._onBrushEnd = L(this._onBrushEnd, this);
  }
  render(t, e, i, s) {
    if (super.render.apply(this, arguments), Dp(
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
      animation: t ? R2 : null,
      start: e[0],
      end: e[1]
    });
  }
  _clear() {
    pm(this, "_dispatchZoomAction");
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
    const t = this.dataZoomModel, e = this.api, s = t.get("brushSelect") ? D2 : 0, r = this._findCoordRect(), o = { width: e.getWidth(), height: e.getHeight() }, a = this._orient === rs ? {
      // Why using 'right', because right should be used in vertical,
      // and it is better to be consistent for dealing with position param merge.
      right: o.width - r.x - r.width,
      top: o.height - Rl - kd - s,
      width: r.width,
      height: Rl
    } : {
      // vertical
      right: kd,
      top: r.y,
      width: Rl,
      height: r.height
    }, l = Ys(t.option);
    D(["right", "top", "width", "height"], function(h) {
      l[h] === "ph" && (l[h] = a[h]);
    });
    const c = Vs(l, o);
    this._location = { x: c.x, y: c.y }, this._size = [c.width, c.height], this._orient === Pd && this._size.reverse();
  }
  _positionGroup() {
    const t = this.group, e = this._location, i = this._orient, s = this.dataZoomModel.getFirstTargetAxisModel(), r = s && s.get("inverse"), o = this._displayables.sliderGroup, a = (this._dataShadowInfo || {}).otherAxisInverse;
    o.attr(
      i === rs && !r ? { scaleY: a ? 1 : -1, scaleX: 1 } : i === rs && r ? { scaleY: a ? 1 : -1, scaleX: -1 } : i === Pd && !r ? {
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
    const e = E_(
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
      lt(t[0], [0, 100], e, !0),
      lt(t[1], [0, 100], e, !0)
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
        const T = x == null || isNaN(x) || x === "", b = T ? 0 : lt(x, f, p, !0);
        T && !w && M ? (g.push([g[g.length - 1][0], 0]), m.push([m[m.length - 1][0], 0])) : !T && w && (g.push([v, 0]), m.push([v, 0])), g.push([v, b]), m.push([v, b]), v += y, w = T;
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
          if (i || e !== !0 && ot(E2, l.get("type")) < 0)
            return;
          const c = s.getComponent(
            Wn(r),
            o
          ).axis;
          let h = A2(r), u;
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
          lineWidth: C2,
          fill: "rgba(0,0,0,0)"
        }
      })
    ), D(
      [0, 1],
      function(d) {
        let p = a.get("handleIcon");
        !Ro[p] && p.indexOf("path://") < 0 && p.indexOf("image://") < 0 && (p = "path://" + p);
        const _ = Ao(
          p,
          -1,
          0,
          2,
          2,
          null,
          !0
        );
        _.attr({
          cursor: Ld(this._orient),
          draggable: !0,
          drift: L(this._onDragMove, this, d),
          ondragend: L(this._onDragEnd, this),
          onmouseover: L(this._showDataInfo, this, !0),
          onmouseout: L(this._showDataInfo, this, !1),
          z2: 5
        }), _.attr({
          draggable: !0,
          drift: L(this._onDragMove, this, d)
        });
        const g = _.getBoundingRect(), m = a.get("handleSize");
        this._handleHeight = ln(m, this._size[1]), this._handleWidth = g.width / g.height * this._handleHeight, _.setStyle(a.getModel("handleStyle").getItemStyle()), _.style.strokeNoScale = !0, _.rectHover = !0, _.ensureState("emphasis").style = a.getModel(["emphasis", "handleStyle"]).getItemStyle(), gb(_);
        const y = a.get("handleColor");
        y != null && (_.style.fill = y), r.add(i[d] = _);
        const v = a.getModel("textStyle");
        t.add(
          s[d] = new (void 0)({
            silent: !0,
            invisible: !0,
            style: Lp(v, {
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
      const d = ln(
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
      }), _ = d * 0.8, g = e.moveHandleIcon = Ao(
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
      cursor: Ld(this._orient),
      drift: L(this._onDragMove, this, "all"),
      ondragstart: L(this._showDataInfo, this, !0),
      ondragend: L(this._onDragEnd, this),
      onmouseover: L(this._showDataInfo, this, !0),
      onmouseout: L(this._showDataInfo, this, !1)
    });
  }
  _updateInterval(t, e) {
    const i = this.dataZoomModel, s = this._handleEnds, r = this._getViewExtent(), o = i.findRepresentativeAxisProxy().getMinMaxSpan(), a = [0, 100];
    Nh(
      e,
      s,
      r,
      i.get("zoomLock") ? "all" : t,
      o.minSpan != null ? lt(o.minSpan, a, r, !0) : null,
      o.maxSpan != null ? lt(o.maxSpan, a, r, !0) : null
    );
    const l = this._range, c = this._range = ls([
      lt(s[0], r, a, !0),
      lt(s[1], r, a, !0)
    ]);
    return !l || l[0] !== c[0] || l[1] !== c[1];
  }
  _updateView(t) {
    const e = this._displayables, i = this._handleEnds, s = ls(i.slice()), r = this._size;
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
    const a = ls(this._handleEnds.slice());
    l.call(this, 0), l.call(this, 1);
    function l(c) {
      const h = Xx(
        i.handles[c].parent,
        this.group
      ), u = Kx(
        c === 0 ? "right" : "left",
        h
      ), f = this._handleWidth / 2 + I2, d = Io(
        [
          a[c] + (c === 0 ? -f : f),
          this._size[1] / 2
        ],
        h
      );
      s[c].setStyle({
        x: d[0],
        y: d[1],
        verticalAlign: r === rs ? "middle" : u,
        align: r === rs ? u : "center",
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
      onclick: L(this._onClickPanel, this)
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
    return Q(s) ? s(t, o) : Z(s) ? s.replace("{value}", o) : o;
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
    this._dragging = !0, Nt(s.event);
    const r = this._displayables.sliderGroup.getLocalTransform(), o = Io([e, i], r, !0), a = this._updateInterval(t, o[0]), l = this.dataZoomModel.get("realtime");
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
    this._range = ls([
      lt(i.x, r, o, !0),
      lt(
        i.x + i.width,
        r,
        o,
        !0
      )
    ]), this._handleEnds = [i.x, i.x + i.width], this._updateView(), this._dispatchZoomAction(!1);
  }
  _onBrush(t) {
    this._brushing && (Nt(t.event), this._updateBrushRect(t.offsetX, t.offsetY));
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
sa.type = "dataZoom.slider";
let Lc = sa;
function A2(n) {
  return { x: "y", y: "x", radius: "angle", angle: "radius" }[n];
}
function Ld(n) {
  return n === "vertical" ? "ns-resize" : "ew-resize";
}
const vi = class vi extends Oi {
  constructor() {
    super(...arguments), this.type = vi.type;
  }
};
vi.type = "dataZoom.slider", vi.layoutMode = "box", vi.defaultOption = oh(
  Oi.defaultOption,
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
let Oc = vi;
function k2(n) {
  n.registerComponentModel(Oc), n.registerComponentView(Lc), R_(n);
}
const Od = "\0_pi_interaction_mutex";
function P2(n, t) {
  return !!L2(n)[t];
}
function L2(n) {
  return n[Od] || (n[Od] = {});
}
class O2 extends ir {
  constructor(t) {
    super(), this._wheelRafId = null, this._pendingWheelEvent = null, this._pendingWheelScrollDelta = 0, this._pendingWheelScale = 1, this._pendingWheelShouldMove = !1, this._pendingWheelShouldZoom = !1, this._panRafId = null, this._pendingPanEvent = null, this._pendingPanStartX = 0, this._pendingPanStartY = 0, this._pendingPanEndX = 0, this._pendingPanEndY = 0, this._zr = t;
    const e = L(this._mousedownHandler, this), i = L(this._mousemoveHandler, this), s = L(this._mouseupHandler, this), r = L(this._mousewheelHandler, this);
    this.enable = function(o, a) {
      this.disable(), this._opt = xt(U(a) || {}, {
        zoomOnMouseWheel: !0,
        moveOnMouseMove: !0,
        // By default, wheel do not trigger move.
        moveOnMouseWheel: !1,
        preventDefaultMouseMove: !0
      }), o == null && (o = !0), (o === !0 || o === "move" || o === "pan") && (t.on("mousedown", e), t.on("mousemove", i), t.on("mouseup", s)), (o === !0 || o === "scale" || o === "zoom") && t.on("mousewheel", r);
    }, this.disable = function() {
      this._clearWheelFrame(), this._clearPanFrame(), t.off("mousedown", e), t.off("mousemove", i), t.off("mouseup", s), t.off("mousewheel", r);
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
    if (Yu(t))
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
    if (!this._dragging || !uo("moveOnMouseMove", t, this._opt) || t.gestureEvent === "pinch" || P2(this._zr, "globalPan"))
      return;
    const e = t.offsetX, i = t.offsetY, s = this._x, r = this._y;
    this._x = e, this._y = i, this._opt.preventDefaultMouseMove && Nt(t.event), this._panRafId == null && (this._pendingPanStartX = s, this._pendingPanStartY = r), this._pendingPanEvent = t, this._pendingPanEndX = e, this._pendingPanEndY = i, this._panRafId == null && (this._panRafId = requestAnimationFrame(() => {
      this._panRafId = null, this._flushPan();
    }));
  }
  _mouseupHandler(t) {
    Yu(t) || (this._flushPan(), this._dragging = !1);
  }
  _mousewheelHandler(t) {
    const e = uo("zoomOnMouseWheel", t, this._opt), i = uo("moveOnMouseWheel", t, this._opt), s = t.wheelDelta, r = Math.abs(s), o = t.offsetX, a = t.offsetY;
    if (!(s === 0 || !e && !i) && !(this.pointerChecker && !this.pointerChecker(t, o, a))) {
      if (Nt(t.event), e) {
        const l = r > 3 ? 1.4 : r > 1 ? 1.2 : 1.1, c = s > 0 ? l : 1 / l;
        this._pendingWheelScale *= c, this._pendingWheelShouldZoom = !0;
      }
      if (i) {
        const l = Math.abs(s), c = (s > 0 ? 1 : -1) * (l > 3 ? 0.4 : l > 1 ? 0.15 : 0.05);
        this._pendingWheelScrollDelta += c, this._pendingWheelShouldMove = !0;
      }
      this._pendingWheelEvent = t, this._wheelRafId == null && (this._wheelRafId = requestAnimationFrame(() => {
        this._flushWheel();
      }));
    }
  }
  _flushWheel() {
    const t = this._pendingWheelEvent, e = this._pendingWheelScale, i = this._pendingWheelScrollDelta, s = this._pendingWheelShouldZoom, r = this._pendingWheelShouldMove;
    this._wheelRafId = null, this._clearWheelFrame(), t && (s && e !== 1 && Al(this, "zoom", "zoomOnMouseWheel", t, {
      scale: e,
      originX: t.offsetX,
      originY: t.offsetY,
      isAvailableBehavior: null
    }), r && i !== 0 && Al(this, "scrollMove", "moveOnMouseWheel", t, {
      scrollDelta: i,
      originX: t.offsetX,
      originY: t.offsetY,
      isAvailableBehavior: null
    }));
  }
  _clearWheelFrame() {
    this._wheelRafId != null && (cancelAnimationFrame(this._wheelRafId), this._wheelRafId = null), this._pendingWheelEvent = null, this._pendingWheelScrollDelta = 0, this._pendingWheelScale = 1, this._pendingWheelShouldMove = !1, this._pendingWheelShouldZoom = !1;
  }
  _flushPan() {
    this._panRafId != null && (cancelAnimationFrame(this._panRafId), this._panRafId = null);
    const t = this._pendingPanEvent, e = this._pendingPanStartX, i = this._pendingPanStartY, s = this._pendingPanEndX, r = this._pendingPanEndY;
    this._clearPanFrame(), t && Al(this, "pan", "moveOnMouseMove", t, {
      dx: s - e,
      dy: r - i,
      oldX: e,
      oldY: i,
      newX: s,
      newY: r,
      isAvailableBehavior: null
    });
  }
  _clearPanFrame() {
    this._panRafId != null && (cancelAnimationFrame(this._panRafId), this._panRafId = null), this._pendingPanEvent = null, this._pendingPanStartX = 0, this._pendingPanStartY = 0, this._pendingPanEndX = 0, this._pendingPanEndY = 0;
  }
}
function uo(n, t, e) {
  const i = e[n];
  return !n || i && (!Z(i) || t.event[i + "Key"]);
}
function Al(n, t, e, i, s) {
  s.isAvailableBehavior = L(
    uo,
    null,
    e,
    i
  ), n.trigger(t, s);
}
const A_ = pt();
function F2(n, t, e) {
  A_(n).coordSysRecordMap.each(function(i) {
    const s = i.dataZoomInfoMap.get(t.uid);
    s && (s.getRange = e);
  });
}
function B2(n, t) {
  if (t) {
    n.removeKey(t.model.uid);
    const e = t.controller;
    e && e.dispose();
  }
}
function N2(n, t) {
  const e = {
    model: t,
    containsPoint: po($2, t),
    dispatchAction: po(z2, n),
    dataZoomInfoMap: null,
    controller: null
  }, i = e.controller = new O2(
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
      }), o.length && (s === "scrollMove" || s === "pan" ? H2(n, o) : e.dispatchAction(o));
    });
  }), e;
}
function z2(n, t) {
  n.isDisposed() || n.dispatchAction({
    type: "dataZoom",
    animation: {
      easing: "cubicOut",
      duration: 100
    },
    batch: t
  });
}
function H2(n, t) {
  n.isDisposed() || n.dispatchAction({
    type: "dataZoom",
    animation: { duration: 0 },
    batch: t
  });
}
function $2(n, t, e, i) {
  return n.coordinateSystem.containPoint([e, i]);
}
function G2(n) {
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
function Y2(n) {
  n.registerProcessor(
    n.PRIORITY.PROCESSOR.FILTER,
    function(t, e) {
      const i = A_(e), s = i.coordSysRecordMap || (i.coordSysRecordMap = B());
      s.each(function(r) {
        r.dataZoomInfoMap = null;
      }), t.eachComponent(
        { mainType: "dataZoom", subType: "inside" },
        function(r) {
          const o = E_(r);
          D(o.infoList, function(a) {
            const l = a.model.uid, c = s.get(l) || s.set(
              l,
              N2(e, a.model)
            );
            (c.dataZoomInfoMap || (c.dataZoomInfoMap = B())).set(r.uid, {
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
          B2(s, r);
          return;
        }
        const c = G2(l);
        o.enable(c.controlType, c.opt), o.setPointerChecker(r.containsPoint), Dp(
          r,
          "dispatchAction",
          a.model.get("throttle", !0),
          "fixRate"
        );
      });
    }
  );
}
const qh = class qh extends Ho {
  constructor() {
    super(...arguments), this.type = "dataZoom.inside";
  }
  render(t, e, i) {
    if (super.render.apply(this, arguments), t.noTarget()) {
      this._clear();
      return;
    }
    this.range = t.getPercentRange(), F2(i, t, {
      pan: L(kl.pan, this),
      zoom: L(kl.zoom, this),
      scrollMove: L(kl.scrollMove, this)
    });
  }
  _clear() {
  }
};
qh.type = "dataZoom.inside";
let Fc = qh;
const kl = {
  zoom(n, t, e, i) {
    return this.range;
  },
  pan: Fd(function(n, t, e, i, s, r) {
    const o = Bd[i](
      [r.oldX, r.oldY],
      [r.newX, r.newY],
      t,
      s,
      e
    );
    return o.signal * (n[1] - n[0]) * o.pixel / o.pixelLength;
  }),
  scrollMove: Fd(function(n, t, e, i, s, r) {
    return Bd[i](
      [0, 0],
      [r.scrollDelta, r.scrollDelta],
      t,
      s,
      e
    ).signal * (n[1] - n[0]) * r.scrollDelta;
  })
};
function Fd(n) {
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
    if (Nh(l, o, [0, 100], "all"), this.range = o, r[0] !== o[0] || r[1] !== o[1])
      return o;
  };
}
const Bd = {
  grid(n, t, e, i, s) {
    const r = e.axis, o = {}, a = s.model.coordinateSystem.getRect();
    return n = n || [0, 0], r.dim === "x" ? (o.pixel = t[0] - n[0], o.pixelLength = a.width, o.pixelStart = a.x, o.signal = r.inverse ? 1 : -1) : (o.pixel = t[1] - n[1], o.pixelLength = a.height, o.pixelStart = a.y, o.signal = r.inverse ? -1 : 1), o;
  }
}, Ls = class Ls extends Oi {
  constructor() {
    super(...arguments), this.type = Ls.type;
  }
};
Ls.type = "dataZoom.inside", Ls.defaultOption = oh(
  Oi.defaultOption,
  {
    disabled: !1,
    zoomLock: !1,
    zoomOnMouseWheel: !0,
    moveOnMouseMove: !0,
    moveOnMouseWheel: !1,
    preventDefaultMouseMove: !0
  }
);
let Bc = Ls;
function V2(n) {
  R_(n), n.registerComponentModel(Bc), n.registerComponentView(Fc), Y2(n);
}
function W2(n) {
  Qt(V2), Qt(k2);
}
class U2 {
  constructor(t) {
    this.listeners = /* @__PURE__ */ new Map(), this.initialState = t.initialState, this.initialContext = k({}, t.initialContext), this.state = t.initialState, this.context = k({}, t.initialContext), this.transitions = t.transitions, this.guards = t.guards || {};
  }
  getState() {
    return this.state;
  }
  getContext() {
    return k({}, this.context);
  }
  setContext(t) {
    const e = this.state;
    this.context = k(k({}, this.context), t), this.emit("contextchange", e, this.state);
  }
  can(t, e) {
    var o;
    const i = e ? k(k({}, this.context), e) : this.context, s = this.guards[t];
    return !!((o = this.transitions[this.state]) == null ? void 0 : o[t]) && (!s || s(i));
  }
  transition(t, e) {
    var a;
    if (!this.can(t, e))
      return this.emit("blocked", this.state, this.state), !1;
    const i = this.state, s = e ? k(k({}, this.context), e) : this.context, r = (a = this.transitions[i]) == null ? void 0 : a[t], o = this._resolveTransition(r, s);
    return o == null ? (this.emit("blocked", i, i), !1) : (this.context = s, o !== i && (this.emit("exit", i, o), this.state = o, this.emit("enter", i, o)), this.emit("statechange", i, this.state), !0);
  }
  reset(t) {
    const e = this.state;
    this.state = this.initialState, this.context = k(k({}, this.initialContext), t || {}), this.emit("reset", e, this.state), this.emit("statechange", e, this.state);
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
const q2 = {}, Z2 = /* @__PURE__ */ new Set([
  "TASK_NOT_FOUND",
  "RESOURCE_NOT_FOUND",
  "SHIFT_DAILY_ID_NOT_FOUND"
]);
class X2 extends U2 {
  constructor() {
    super({
      initialState: "idle",
      initialContext: q2,
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
            return e && Z2.has(e) ? "selected" : "error";
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
const K2 = 5e3;
function j2(n) {
  const t = rt();
  switch (n) {
    case "success":
      return { color: t.success, background: t.taskStatus[4].background, icon: "✓" };
    case "warning":
      return { color: t.warn, background: t.taskStatus[9].background, icon: "!" };
    case "error":
      return { color: t.danger, background: t.taskStatus[5].background, icon: "!" };
    default:
      return { color: t.primary, background: t.primarySoft, icon: "i" };
  }
}
const Nc = [];
let Ot = null, fo = null, zc = !1;
function Q2() {
  return typeof document == "undefined" ? null : (Ot != null && Ot.isConnected || (Ot = document.createElement("div"), Ot.setAttribute("aria-live", "polite"), Ot.setAttribute("aria-relevant", "additions text"), Object.assign(Ot.style, {
    position: "fixed",
    top: "24px",
    right: "24px",
    zIndex: "2147483647",
    width: "min(360px, calc(100vw - 32px))",
    pointerEvents: "none",
    fontFamily: '"Microsoft YaHei", sans-serif'
  }), document.body.appendChild(Ot)), Ot);
}
function Nd() {
  fo && (clearTimeout(fo), fo = null), zc = !1, Ot && Ot.replaceChildren(), k_();
}
function k_() {
  if (zc || !Nc.length) return;
  const n = Q2();
  if (!n) return;
  const t = Nc.shift(), e = j2(t.type), i = rt();
  zc = !0;
  const s = document.createElement("section");
  s.setAttribute("role", t.type === "error" ? "alert" : "status"), Object.assign(s.style, {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    padding: "14px 14px 14px 16px",
    border: `1px solid ${e.color}`,
    borderRadius: "6px",
    background: e.background,
    color: e.color,
    boxShadow: `0 4px 14px ${i.mode === "dark" ? "rgba(0, 0, 0, 0.34)" : "rgba(31, 72, 130, 0.16)"}`,
    pointerEvents: "auto",
    boxSizing: "border-box",
    marginBottom: "10px"
  });
  const r = document.createElement("span");
  r.textContent = e.icon, r.setAttribute("aria-hidden", "true"), Object.assign(r.style, {
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
  const o = document.createElement("div");
  Object.assign(o.style, { flex: "1 1 auto", minWidth: "0" });
  const a = document.createElement("div");
  a.textContent = t.title, Object.assign(a.style, { fontWeight: "700", fontSize: "14px", lineHeight: "20px" });
  const l = document.createElement("div");
  l.textContent = t.message, Object.assign(l.style, {
    marginTop: "3px",
    color: i.textSecondary,
    fontSize: "13px",
    lineHeight: "19px",
    overflowWrap: "anywhere"
  });
  const c = document.createElement("button");
  c.type = "button", c.setAttribute("aria-label", "关闭提示"), c.title = "关闭提示", c.textContent = "×", Object.assign(c.style, {
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
  }), c.addEventListener("click", Nd, { once: !0 }), o.append(a, l), s.append(r, o, c), n.replaceChildren(s), t.duration > 0 && (fo = setTimeout(Nd, t.duration));
}
function Le(n, t = {}) {
  var e;
  Nc.push({
    type: t.type || "info",
    title: t.title || "提示",
    message: n,
    duration: (e = t.duration) != null ? e : K2
  }), k_();
}
const q = 999, ra = class ra extends Jt {
  constructor() {
    super(...arguments), this.type = ra.type, this._taskRows = [], this._taskRowHeight = 44, this._taskItemHeight = 36, this._scrollOffset = 0, this._scrollMax = 0, this._scrollDragStartY = 0, this._scrollDragStartOffset = 0, this._mainScrollDragStartY = 0, this._mainScrollDragStartStart = 0, this._selectedTaskTweens = /* @__PURE__ */ new Map(), this._boundKeyDownHandler = null, this._boundMouseMoveHandler = null, this._boundClickHandler = null, this._assigning = !1, this._statusHost = null, this._mainVerticalDataZoomRafId = null, this._pendingMainVerticalDataZoomOffsetY = null, this._unassignedBoardVerticalDataZoomRafId = null, this._pendingUnassignedBoardScrollOffset = null, this._taskRecords = [];
  }
  init(t, e) {
    this.api = e, this.piModel = t, this._assignmentMachine || (this._assignmentMachine = new X2(), this._assignmentMachine.on("statechange", (i, s, r) => {
      this._renderAssignmentStatus(), this.piModel && this.api && s !== r && this._renderBoard(this._getUnassignedData());
    })), !this._boundKeyDownHandler && typeof window != "undefined" && (this._boundKeyDownHandler = (i) => {
      var s;
      i.key === "Escape" && !this._assigning && ((s = this._assignmentMachine) == null || s.esc());
    }, window.addEventListener("keydown", this._boundKeyDownHandler)), this._boundMouseMoveHandler || (this._boundMouseMoveHandler = (i) => this._handleGlobalMouseMove(i), e.getZr().on("mousemove", this._boundMouseMoveHandler)), this._boundClickHandler || (this._boundClickHandler = (i) => this._handleGlobalClick(i), e.getZr().on("click", this._boundClickHandler));
  }
  dispose() {
    var t, e, i, s;
    (t = this._statusHost) == null || t.remove(), this._statusHost = null, this._boundKeyDownHandler && (window.removeEventListener("keydown", this._boundKeyDownHandler), this._boundKeyDownHandler = null), this._boundMouseMoveHandler && ((e = this.api) == null || e.getZr().off("mousemove", this._boundMouseMoveHandler), this._boundMouseMoveHandler = null), this._boundClickHandler && ((i = this.api) == null || i.getZr().off("click", this._boundClickHandler), this._boundClickHandler = null), this._clearSelectedTaskTweens(), this._clearAssignmentGhost(), this._clearMainVerticalDataZoomRaf(), this._clearUnassignedBoardVerticalDataZoomRaf(), (s = this._assignmentMachine) == null || s.destroy();
  }
  render(t, e, i, s) {
    var a;
    this.group.removeAll(), this.piModel = e, this.api = i;
    let r = (a = t.option) == null ? void 0 : a.splitY;
    r == null && (r = i.getHeight(), e.eachComponent("split", function(l) {
      if (l.get("orient") === "horizontal") {
        const c = l.get("ratio");
        c != null && (r = i.getHeight() * fc(c, "horizontal"));
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
    var o, a, l, c, h, u;
    const t = this._splitY, e = this.api.getWidth(), i = Math.max(0, this.api.getHeight() - t);
    this.group.attr({ x: 0, y: t }), this._backgroundRect && this._backgroundRect.setShape({
      x: 0,
      y: 0,
      width: e,
      height: i
    }), this._emptyText && this._emptyText.setStyle({
      x: e / 2,
      y: i / 2
    });
    const s = this._getGrid(), r = s == null ? void 0 : s.getRect();
    if (r) {
      const f = (a = (o = this._taskViewportGroup) == null ? void 0 : o.getClipPath) == null ? void 0 : a.call(o);
      f == null || f.setShape({
        x: r.x,
        y: 0,
        width: r.width,
        height: i
      });
      const d = (c = (l = this._gridExtensionGroup) == null ? void 0 : l.getClipPath) == null ? void 0 : c.call(l);
      d ? d.setShape({
        x: r.x,
        y: 0,
        width: r.width,
        height: i
      }) : (h = this._gridExtensionGroup) == null || h.setClipPath(
        new zrender.Rect({
          shape: {
            x: r.x,
            y: 0,
            width: r.width,
            height: i
          }
        })
      );
      const p = this._taskRowHeight || this._getRowHeight(), _ = this._taskRows.length * p;
      this._scrollMax = Math.max(0, _ - i), this._scrollOffset = Math.min(this._scrollOffset, this._scrollMax), (u = this._taskContentGroup) == null || u.attr({ y: -this._scrollOffset }), this._scrollbarGroup && (this.group.remove(this._scrollbarGroup), this._scrollbarGroup = null), this._renderVerticalDataZoom(r, i, _), this._renderMainVerticalDataZoomMirror();
    }
    this.api.getZr().refresh();
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
    const e = rt();
    this._renderAssignmentStatus(t.length);
    const i = this.group, s = this.api;
    this._clearSelectedTaskTweens(), i.removeAll();
    const r = 0, o = this._splitY, a = s.getWidth(), l = s.getHeight() - o;
    i.attr({ z: 0 }), i.attr({ x: r, y: o }), this._backgroundRect = new zrender.Rect({
      shape: {
        x: 0,
        y: 0,
        width: a,
        height: l
      },
      style: {
        fill: e.panel
      },
      zlevel: q,
      z: 0,
      z2: 0,
      silent: !0
    }), i.add(this._backgroundRect), this._renderGridExtension(), this._renderUnassignedTasks(t), this._renderMainVerticalDataZoomMirror(), t.length === 0 && (this._emptyText = new zrender.Text({
      style: {
        text: "暂无未分配任务",
        x: a / 2,
        y: l / 2,
        fontSize: 14,
        fill: e.faint,
        align: "center",
        verticalAlign: "middle"
      },
      zlevel: q,
      z: 0,
      z2: 1,
      silent: !0
    }), i.add(this._emptyText));
  }
  _renderUnassignedTasks(t) {
    if (this._clearUnassignedBoardVerticalDataZoomRaf(), this._taskViewportGroup && this.group.remove(this._taskViewportGroup), this._taskContentGroup && (this._taskContentGroup = null), this._assignmentGhostGroup && (this.group.remove(this._assignmentGhostGroup), this._assignmentGhostGroup = null), this._scrollbarGroup && this.group.remove(this._scrollbarGroup), this._taskRows = [], this._taskRecords = t.slice(), !t.length) return;
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
    const s = rt();
    if (this._clearUnassignedBoardVerticalDataZoomRaf(), i <= e || e <= 0) return;
    const r = 8, o = t.x + t.width + 6, a = Math.max(24, e / i * e), l = this._scrollMax > 0 ? this._scrollOffset / this._scrollMax * (e - a) : 0, c = this._scrollbarGroup = new zrender.Group();
    c.attr({ zlevel: q, z: 0, z2: 5 }), c.add(
      new zrender.Rect({
        shape: {
          x: o,
          y: 0,
          width: r,
          height: e,
          r: 4
        },
        style: {
          fill: s.scrollTrack
        },
        zlevel: q,
        z: 0,
        z2: 0,
        silent: !0
      })
    ), this._scrollThumb = new zrender.Rect({
      shape: {
        x: o,
        y: l,
        width: r,
        height: a,
        r: 4
      },
      style: {
        fill: s.scrollThumb
      },
      zlevel: q,
      z: 0,
      z2: 1,
      cursor: "ns-resize",
      draggable: !0,
      ondragstart: (h) => {
        this._scrollDragStartY = h.offsetY, this._scrollDragStartOffset = this._scrollOffset, Nt(h.event);
      },
      drift: (h, u, f) => {
        const d = f.offsetY - this._scrollDragStartY, p = Math.max(1, e - a);
        this._pendingUnassignedBoardScrollOffset = this._scrollDragStartOffset + d / p * this._scrollMax, Nt(f.event), this._unassignedBoardVerticalDataZoomRafId == null && (this._unassignedBoardVerticalDataZoomRafId = requestAnimationFrame(() => {
          this._unassignedBoardVerticalDataZoomRafId = null;
          const _ = this._pendingUnassignedBoardScrollOffset;
          this._pendingUnassignedBoardScrollOffset = null, _ != null && this._setScrollOffset(_);
        }));
      },
      ondragend: (h) => {
        Nt(h.event), this._flushUnassignedBoardVerticalScroll();
      }
    }), c.add(this._scrollThumb), this.group.add(c);
  }
  _flushUnassignedBoardVerticalScroll() {
    this._unassignedBoardVerticalDataZoomRafId != null && (cancelAnimationFrame(this._unassignedBoardVerticalDataZoomRafId), this._unassignedBoardVerticalDataZoomRafId = null);
    const t = this._pendingUnassignedBoardScrollOffset;
    this._pendingUnassignedBoardScrollOffset = null, t != null && this._setScrollOffset(t);
  }
  _clearUnassignedBoardVerticalDataZoomRaf() {
    this._unassignedBoardVerticalDataZoomRafId != null && (cancelAnimationFrame(this._unassignedBoardVerticalDataZoomRafId), this._unassignedBoardVerticalDataZoomRafId = null), this._pendingUnassignedBoardScrollOffset = null;
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
    var I, C, E;
    const a = rt();
    if (!e) return null;
    const l = e.getRect(), c = (I = e.getCartesians()[0]) == null ? void 0 : I.getAxis("x");
    if (!c) return null;
    const h = this._parseTime((C = t.scheduleStartTime) != null ? C : t.startTime), u = this._parseTime((E = t.scheduleEndTime) != null ? E : t.endTime);
    if (h == null || u == null || u <= h)
      return null;
    const f = l.x + c.dataToCoord(h), d = l.x + c.dataToCoord(u), p = Math.max(l.x, Math.min(f, d)), g = Math.min(l.x + l.width, Math.max(f, d)) - p;
    if (g <= 0) return null;
    const m = new zrender.Group();
    m.attr({ zlevel: q, z: 0, z2: 3 });
    const y = {
      x: p + 0.5,
      y: i + 0.5,
      width: Math.max(0, g - 1),
      height: Math.max(0, s - 1),
      r: 3
    };
    m.add(
      new zrender.Rect({
        shape: y,
        style: {
          fill: r ? a.primarySoft : a.surfaceRaised,
          stroke: r ? a.primary : a.border,
          lineWidth: r ? 2 : 1.25
        },
        zlevel: q,
        z: 0,
        z2: 0
      })
    );
    const v = g >= 140 && s >= 30, S = i + s * 0.3, w = i + s * (v ? 0.73 : 0.5), x = Math.min(48, Math.max(36, g * 0.2)), M = x, T = p + x, b = Math.max(0, g - x - M);
    if (m.add(
      new zrender.Text({
        style: {
          text: v ? this._formatTimeLabel(h) : "",
          x: p + x / 2,
          y: S,
          fontSize: 10,
          fill: a.taskMetaText,
          align: "center",
          verticalAlign: "middle"
        },
        zlevel: q,
        z: 0,
        z2: 1,
        silent: !0
      })
    ), m.add(
      new zrender.Text({
        style: {
          text: v ? this._formatTimeLabel(u) : "",
          x: p + g - M / 2,
          y: S,
          fontSize: 10,
          fill: a.taskMetaText,
          align: "center",
          verticalAlign: "middle"
        },
        zlevel: q,
        z: 0,
        z2: 1,
        silent: !0
      })
    ), m.add(
      new zrender.Text({
        style: {
          text: v ? this._truncateText(t.flightStatusText || "", b - 8, 10) : "",
          x: T + b / 2,
          y: S,
          fontSize: 10,
          fill: a.text,
          align: "center",
          verticalAlign: "middle"
        },
        zlevel: q,
        z: 0,
        z2: 1,
        silent: !0
      })
    ), m.add(
      new zrender.Text({
        style: {
          text: this._truncateText(t.taskName || t.name || `Task ${t.id}`, g - 12, 12),
          x: p + g / 2,
          y: w,
          fontSize: 12,
          fill: a.text,
          align: "center",
          verticalAlign: "middle"
        },
        zlevel: q,
        z: 0,
        z2: 1,
        silent: !0
      })
    ), o) {
      const A = new zrender.Rect({
        shape: y,
        style: {
          fill: "rgba(0,0,0,0)"
        },
        cursor: "pointer",
        zlevel: q,
        z: 0,
        z2: 20,
        ondblclick: (P) => {
          var Y;
          this._assigning || (Y = this._assignmentMachine) == null || Y.selectTask(t), Nt(P.event);
        }
      });
      A.__testId = `unassigned-task-${t.id}`, m.add(A);
    }
    return m;
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
    return lr(this, null, function* () {
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
    return lr(this, null, function* () {
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
    const i = rt();
    this._clearAssignmentGhost();
    const s = this._getGrid();
    if (!s) return;
    const r = Math.min(36, Math.max(24, e.rowHeight - 8)), o = e.rowY - this._splitY + (e.rowHeight - r) / 2, a = this._renderTaskItem(t, s, o, r, !0, !1);
    if (!a) return;
    a.silent = !0, a.attr({ zlevel: q, z: 0, z2: 20 }), this._setGroupOpacity(a, 0.48);
    const l = s.getRect(), c = Math.max(l.y, e.rowY), h = Math.min(this._splitY, e.rowY + e.rowHeight);
    a.add(new zrender.Rect({
      shape: { x: l.x, y: c - this._splitY, width: l.width, height: Math.max(0, h - c) },
      style: { fill: i.ghostFill, stroke: i.ghostStroke, lineWidth: 1 },
      silent: !0,
      zlevel: q,
      z2: -1
    })), this._assignmentGhostGroup = a, this.group.add(a);
  }
  _clearAssignmentGhost() {
    this._assignmentGhostGroup && (this.group.remove(this._assignmentGhostGroup), this._assignmentGhostGroup = null);
  }
  _applySelectedTaskEffect(t, e) {
  }
  _renderAssignmentStatus(t = this._getUnassignedData().length) {
    var l, c, h, u, f, d;
    if (typeof document == "undefined" || !this.api) return;
    const e = rt();
    if (!this._statusHost) {
      const p = this.api.getZr(), _ = p.dom || ((c = (l = p.painter) == null ? void 0 : l.getViewportRoot) == null ? void 0 : c.call(l)), g = (_ == null ? void 0 : _.parentElement) || document.body;
      g !== document.body && window.getComputedStyle(g).position === "static" && (g.style.position = "relative"), this._statusHost = document.createElement("div"), this._statusHost.setAttribute("role", "status"), this._statusHost.setAttribute("aria-live", "polite"), Object.assign(this._statusHost.style, {
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
        color: e.muted,
        pointerEvents: "none"
      }), g.appendChild(this._statusHost);
    }
    const i = ((h = this._assignmentMachine) == null ? void 0 : h.getState()) || "idle", s = (u = this._assignmentMachine) == null ? void 0 : u.getContext(), r = ((f = s == null ? void 0 : s.taskData) == null ? void 0 : f.name) || ((d = s == null ? void 0 : s.taskData) == null ? void 0 : d.taskName) || String((s == null ? void 0 : s.taskId) || ""), o = i === "submitting" || i === "waiting_ws" || i === "refreshing", a = document.createElement("span");
    if (a.textContent = o ? `正在派遣 · ${r}` : i === "error" ? "派遣未完成" : i === "idle" ? "" : `已选择 · ${r} · 点击资源行派遣 · Esc 取消`, Object.assign(a.style, { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }), this._statusHost.style.color = i === "idle" ? e.muted : e.primary, this._statusHost.dataset.status !== a.textContent + i) {
      if (this._statusHost.dataset.status = a.textContent + i, this._statusHost.replaceChildren(), i === "idle") {
        const p = document.createElement("strong");
        p.textContent = "未分配任务", p.style.color = e.textSecondary;
        const _ = document.createElement("span");
        _.textContent = String(t), Object.assign(_.style, { display: "inline-flex", minWidth: "28px", height: "24px", padding: "0 7px", boxSizing: "border-box", alignItems: "center", justifyContent: "center", border: `1px solid ${e.border}`, borderRadius: "4px", background: e.surface, color: e.textSecondary, fontSize: "12px", fontWeight: "600" });
        const g = document.createElement("span");
        g.textContent = "双击任务，再点击目标资源行派遣", Object.assign(g.style, { marginLeft: "4px", color: e.muted }), this._statusHost.append(p, _, g);
      } else
        this._statusHost.appendChild(a);
      if (i !== "idle" && !o) {
        const p = document.createElement("button");
        p.type = "button", p.textContent = "取消派遣", Object.assign(p.style, { flexShrink: "0", border: `1px solid ${e.border}`, borderRadius: "4px", background: e.surface, color: e.textSecondary, height: "28px", padding: "0 8px", cursor: "pointer", pointerEvents: "auto" }), p.onclick = () => {
          this._assigning || this._assignmentMachine.cancel();
        }, this._statusHost.appendChild(p);
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
    var h, u;
    const t = rt();
    this._gridExtensionGroup && this.group.remove(this._gridExtensionGroup);
    const e = this._getGrid();
    if (!e) return;
    const i = e.getRect(), s = (h = e.getCartesians()[0]) == null ? void 0 : h.getAxis("x"), r = (u = e.getCartesians()[0]) == null ? void 0 : u.getAxis("y");
    if (!s || !r) return;
    const o = Math.max(0, this.api.getHeight() - this._splitY), a = s.getTicksCoords(), l = Math.abs(
      r.toGlobalCoord(r.dataToCoord(1)) - r.toGlobalCoord(r.dataToCoord(0))
    );
    if (!l) return;
    const c = this._gridExtensionGroup = new zrender.Group();
    c.attr({ zlevel: q, z: 0, z2: 1 });
    for (let f = 0, d = 0; f < o; f += l, d++) {
      const p = d % 2 === 0 ? t.rowEven : t.rowOdd, _ = Math.min(l, o - f);
      c.add(
        new zrender.Rect({
          shape: {
            x: i.x,
            y: f,
            width: i.width,
            height: _
          },
          style: {
            fill: p
          },
          zlevel: q,
          z: 0,
          z2: 0,
          silent: !0
        })
      ), f > 0 && c.add(
        new zrender.Line({
          shape: {
            x1: i.x,
            y1: f,
            x2: i.x + i.width,
            y2: f
          },
          style: {
            stroke: t.gridMinor,
            lineWidth: 1
          },
          zlevel: q,
          z: 0,
          z2: 1,
          silent: !0
        })
      );
    }
    a.forEach((f) => {
      const d = i.x + f.coord;
      if (d < i.x || d > i.x + i.width) return;
      const p = new Date(f.tickValue), _ = Number.isFinite(p.getTime()) && p.getMinutes() === 0;
      c.add(
        new zrender.Line({
          shape: {
            x1: d,
            y1: 0,
            x2: d,
            y2: o
          },
          style: {
            stroke: _ ? t.gridMajor : t.gridMinor,
            lineWidth: _ ? 1.5 : 1
          },
          zlevel: q,
          z: 0,
          z2: 1,
          silent: !0
        })
      );
    }), this.group.add(c);
  }
  _renderMainVerticalDataZoomMirror() {
    var g;
    const t = rt();
    this._clearMainVerticalDataZoomRaf(), this._mainScrollbarGroup && this.group.remove(this._mainScrollbarGroup);
    const e = this._getVerticalDataZoomModel(), i = this._getGrid();
    if (!e || !i) return;
    const s = i.getRect(), r = Math.max(0, this._splitY - s.y);
    if (r <= 0) return;
    const o = ((g = e.getPercentRange) == null ? void 0 : g.call(e)) || [0, 100], a = Math.max(1, Math.min(100, o[1] - o[0])), l = Math.max(1, 100 - a), c = Math.max(24, a / 100 * r), h = Math.max(1, r - c), u = Math.max(0, o[0]) / l * h, f = 8, d = s.x + s.width + 6, p = -this._splitY, _ = this._mainScrollbarGroup = new zrender.Group();
    _.attr({ zlevel: q, z: 0, z2: 6 }), _.add(
      new zrender.Rect({
        shape: {
          x: d,
          y: s.y + p,
          width: f,
          height: r,
          r: 4
        },
        style: {
          fill: t.scrollTrack
        },
        zlevel: q,
        z: 0,
        z2: 0,
        silent: !0
      })
    ), this._mainScrollThumb = new zrender.Rect({
      shape: {
        x: d,
        y: s.y + p + u,
        width: f,
        height: c,
        r: 4
      },
      style: {
        fill: t.scrollThumb
      },
      zlevel: q,
      z: 0,
      z2: 1,
      cursor: "ns-resize",
      draggable: !0,
      ondragstart: (m) => {
        this._mainScrollDragStartY = m.offsetY, this._mainScrollDragStartStart = o[0], Nt(m.event);
      },
      drift: (m, y, v) => {
        this._pendingMainVerticalDataZoomOffsetY = v.offsetY, Nt(v.event), this._mainVerticalDataZoomRafId == null && (this._mainVerticalDataZoomRafId = requestAnimationFrame(() => {
          this._mainVerticalDataZoomRafId = null, this._flushMainVerticalDataZoom();
        }));
      },
      ondragend: (m) => {
        Nt(m.event), this._flushMainVerticalDataZoom();
      }
    }), _.add(this._mainScrollThumb), this.group.add(_);
  }
  _flushMainVerticalDataZoom() {
    var f, d;
    this._mainVerticalDataZoomRafId != null && (cancelAnimationFrame(this._mainVerticalDataZoomRafId), this._mainVerticalDataZoomRafId = null);
    const t = this._pendingMainVerticalDataZoomOffsetY;
    if (this._pendingMainVerticalDataZoomOffsetY = null, t == null) return;
    const e = ((d = (f = this._getVerticalDataZoomModel()) == null ? void 0 : f.getPercentRange) == null ? void 0 : d.call(f)) || [0, 100], i = Math.max(
      1,
      Math.min(100, e[1] - e[0])
    ), s = Math.max(1, 100 - i), r = this._getGrid();
    if (!r) return;
    const o = r.getRect(), a = Math.max(0, this._splitY - o.y), l = Math.max(
      24,
      i / 100 * a
    ), c = Math.max(1, a - l), h = t - this._mainScrollDragStartY, u = this._mainScrollDragStartStart + h / c * s;
    this._dispatchVerticalDataZoom(u, u + i);
  }
  _clearMainVerticalDataZoomRaf() {
    this._mainVerticalDataZoomRafId != null && (cancelAnimationFrame(this._mainVerticalDataZoomRafId), this._mainVerticalDataZoomRafId = null), this._pendingMainVerticalDataZoomOffsetY = null;
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
    var l;
    const i = this._getVerticalDataZoomModel();
    if (!i) return;
    const s = Math.max(1, Math.min(100, e - t)), r = Math.max(0, Math.min(100 - s, t)), o = Math.min(100, r + s), a = ((l = i.getPercentRange) == null ? void 0 : l.call(i)) || [0, 100];
    Math.abs(r - a[0]) < 1e-3 && Math.abs(o - a[1]) < 1e-3 || this.api.dispatchAction({
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
ra.type = "unassignedBoard";
let Hc = ra;
const Os = class Os extends W {
  constructor() {
    super(...arguments), this.type = Os.type;
  }
};
Os.type = "unassignedBoard", Os.defaultOption = {
  show: !0,
  backgroundColor: "rgba(0,0,0,0)",
  borderColor: "#e0e0e0",
  borderWidth: 1,
  itemGap: 8,
  padding: [16, 16, 16, 16]
};
let $c = Os;
function J2(n) {
  n.registerComponentModel($c), n.registerComponentView(Hc);
}
function tT(n) {
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
    type: "updateUnassignedBoardPosition",
    update: "none"
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
      const l = a.getOrient(), c = i.getViewOfComponentModel(a), h = Math.max(i.getHeight() - s + iw, 0);
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
        const g = eT(e, i, s), m = (p = (d = (f = a.findRepresentativeAxisProxy) == null ? void 0 : f.call(a)) == null ? void 0 : d.getDataValueWindow) == null ? void 0 : p.call(d), y = a.getPercentRange(), v = nT(m, y, g);
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
    }), i.getZr().refresh();
  }), n.registerAction({
    type: "commitGanttLayout",
    update: "update"
  }, function() {
  });
}
function eT(n, t, e) {
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
function nT(n, t, e) {
  var o;
  if (!n || n.length < 2 || !e)
    return [0, e || 1];
  const i = Math.max(1, n[1] - n[0]);
  if (Math.abs(((o = t == null ? void 0 : t[1]) != null ? o : 0) - 100) < 0.5)
    return [Math.max(0, e - i), e];
  const r = Math.max(0, Math.min(n[0], e - i));
  return [r, Math.min(e, r + i)];
}
function iT(n) {
  J2(n), tT(n);
}
const Oe = {
  filter: "资源过滤",
  active: "当前已有过滤条件",
  inactive: "当前没有过滤条件",
  name: "姓名",
  all: "全部资源",
  reset: "重置",
  apply: "应用"
}, sT = "M435.6 590.6L206.6 247v-76.3h610.8V247l-229 343.6v229L435.6 896V590.6z", X = (n, t, e) => {
  const i = document.createElement(n);
  return t && (i.className = t), e && (i.textContent = e), i;
}, rT = (n) => {
  const t = rt(), e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  e.setAttribute("viewBox", "0 0 1024 1024"), e.setAttribute("width", "16"), e.setAttribute("height", "16"), e.setAttribute("aria-hidden", "true");
  const i = document.createElementNS("http://www.w3.org/2000/svg", "path");
  return i.setAttribute("d", sT), i.setAttribute("fill", n ? t.primary : t.faint), e.appendChild(i), e;
}, oT = () => {
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
      border: 1px solid var(--gantt-axis-line, #CBD5E1);
      background: var(--gantt-surface, #FFFFFF);
      color: var(--gantt-text-secondary, #334155);
      font-size: 14px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }
    .resource-filter__button:hover {
      border-color: var(--gantt-scroll-thumb, #94A3B8);
      background: var(--gantt-panel, #F8FAFC);
    }
    .resource-filter__status {
      min-width: 26px;
      height: 36px;
      padding: 0 6px;
      border: 1px solid var(--gantt-axis-line, #CBD5E1);
      border-radius: 2px;
      background: var(--gantt-surface, #FFFFFF);
      color: var(--gantt-muted, #64748B);
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
      background: rgba(6, 12, 18, 0.48);
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
      border: 1px solid var(--gantt-border, #CBD5E1);
      border-radius: 6px;
      background: var(--gantt-surface, #FFFFFF);
      box-shadow: 0 14px 36px rgba(15, 23, 42, 0.22);
      color: var(--gantt-text, #111827);
      font-family: Arial, sans-serif;
    }
    .resource-filter__modal-header {
      height: 42px;
      padding: 0 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--gantt-border-soft, #E5E7EB);
      font-size: 14px;
      font-weight: 600;
    }
    .resource-filter__close {
      width: 26px;
      height: 26px;
      border: 0;
      background: transparent;
      color: var(--gantt-muted, #64748B);
      font-size: 20px;
      cursor: pointer;
    }
    .resource-filter__body { padding: 14px; }
    .resource-filter__field {
      display: grid;
      gap: 6px;
      font-size: 12px;
      color: var(--gantt-text-secondary, #475569);
    }
    .resource-filter__combobox {
      position: relative;
      display: flex;
      align-items: center;
    }
    .resource-filter__combobox-input {
      width: 100%;
      height: 32px;
      border: 1px solid var(--gantt-axis-line, #CBD5E1);
      border-radius: 4px;
      padding: 0 30px 0 8px;
      box-sizing: border-box;
      background: var(--gantt-surface, #FFFFFF);
      color: var(--gantt-text, #111827);
      font-size: 13px;
      outline: none;
    }
    .resource-filter__combobox-input:focus {
      border-color: var(--gantt-primary, #2563EB);
      box-shadow: 0 0 0 2px color-mix(in srgb, var(--gantt-primary, #2563EB) 18%, transparent);
    }
    .resource-filter__combobox-clear {
      position: absolute;
      right: 4px;
      width: 24px;
      height: 24px;
      border: 0;
      background: transparent;
      color: var(--gantt-faint, #94A3B8);
      cursor: pointer;
      font-size: 16px;
      line-height: 1;
    }
    .resource-filter__combobox-clear:hover {
      color: var(--gantt-text-secondary, #334155);
    }
    .resource-filter__combobox-menu {
      position: absolute;
      left: 0;
      right: 0;
      top: 36px;
      z-index: 2;
      max-height: 220px;
      overflow-y: auto;
      border: 1px solid var(--gantt-border, #CBD5E1);
      border-radius: 4px;
      background: var(--gantt-surface, #FFFFFF);
      box-shadow: 0 8px 20px rgba(15, 23, 42, 0.12);
    }
    .resource-filter__combobox-option {
      min-height: 32px;
      padding: 7px 8px;
      box-sizing: border-box;
      color: var(--gantt-text, #111827);
      font-size: 13px;
      line-height: 18px;
      cursor: pointer;
    }
    .resource-filter__combobox-option:hover,
    .resource-filter__combobox-option--selected {
      background: var(--gantt-primary-soft, #EFF6FF);
      color: var(--gantt-primary, #1D4ED8);
    }
    .resource-filter__combobox-empty {
      padding: 10px 8px;
      color: var(--gantt-faint, #94A3B8);
      font-size: 13px;
    }
    .resource-filter__actions {
      display: flex;
      justify-content: flex-end;
      gap: 6px;
      padding: 12px 14px 14px;
      border-top: 1px solid var(--gantt-border-soft, #E5E7EB);
    }
    .resource-filter__action {
      min-width: 68px;
      height: 30px;
      border: 1px solid var(--gantt-axis-line, #CBD5E1);
      border-radius: 4px;
      background: var(--gantt-surface, #FFFFFF);
      color: var(--gantt-text-secondary, #475569);
      cursor: pointer;
      font-size: 13px;
    }
    .resource-filter__action--primary {
      border-color: var(--gantt-primary, #2563EB);
      background: var(--gantt-primary, #2563EB);
      color: #FFFFFF;
    }
  `, document.head.appendChild(n);
}, oa = class oa extends Jt {
  constructor() {
    super(...arguments), this.type = oa.type, this._host = null;
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
    oT();
    const e = t.getZr(), i = e.dom || ((o = (r = e.painter) == null ? void 0 : r.getViewportRoot) == null ? void 0 : o.call(r)) || ((c = (l = (a = e.painter) == null ? void 0 : a.getViewportRootOffset) == null ? void 0 : l.call(a)) == null ? void 0 : c.dom), s = (i == null ? void 0 : i.parentElement) || document.body;
    s !== document.body && window.getComputedStyle(s).position === "static" && (s.style.position = "relative"), this._host = X("div", "resource-filter-host"), s.appendChild(this._host);
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
    const s = X("div", "resource-filter"), r = X("button", "resource-filter__button"), o = X("span", "", Oe.filter), a = X("span", "resource-filter__status"), l = !!this._currentResourceId && this._currentResourceId !== i, c = this._getVisibleResources(e, i, this._currentResourceId);
    r.type = "button", r.append(rT(l), o), r.onclick = () => this._openModal(t, e, i), a.textContent = String(c.length), a.title = l ? Oe.active : Oe.inactive, s.append(r, a), this._host.replaceChildren(s);
  }
  _openModal(t, e, i) {
    const s = X("div", "resource-filter__backdrop"), r = X("div", "resource-filter__modal"), o = X("div", "resource-filter__modal-header"), a = X("span", "", Oe.filter), l = X("button", "resource-filter__close", "×"), c = X("div", "resource-filter__body"), h = X("label", "resource-filter__field"), u = X("span", "", Oe.name), f = X("div", "resource-filter__combobox"), d = X("input", "resource-filter__combobox-input"), p = X("button", "resource-filter__combobox-clear", "×"), _ = X("div", "resource-filter__combobox-menu"), g = X("div", "resource-filter__actions"), m = X("button", "resource-filter__action", Oe.reset), y = X("button", "resource-filter__action resource-filter__action--primary", Oe.apply);
    l.type = "button", m.type = "button", y.type = "button", d.type = "text", d.placeholder = "搜索资源名称或编号", d.setAttribute("aria-label", "搜索资源名称或编号"), d.setAttribute("role", "combobox"), d.setAttribute("aria-expanded", "false"), p.type = "button", p.title = "清除选择", p.setAttribute("aria-label", "清除选择"), _.setAttribute("role", "listbox"), _.hidden = !0;
    let v = "";
    const S = () => this._currentResourceId ? String(this._currentResourceId) : i, w = (C) => {
      if (C === i) return Oe.all;
      const E = e.find((A) => String(A[1]) === String(C));
      return E ? E[0] || String(E[1]) : "";
    }, x = () => {
      const C = v.trim().toLocaleLowerCase(), E = e.filter(([P, Y]) => C ? `${P || ""} ${Y}`.toLocaleLowerCase().includes(C) : !0);
      _.replaceChildren();
      const A = [
        [Oe.all, i],
        ...E
      ];
      A.forEach(([P, Y]) => {
        const V = X(
          "div",
          `resource-filter__combobox-option${String(Y) === S() ? " resource-filter__combobox-option--selected" : ""}`,
          P || String(Y)
        );
        V.setAttribute("role", "option"), V.setAttribute("aria-selected", String(Y) === S() ? "true" : "false"), V.onmousedown = (at) => {
          at.preventDefault(), this._currentResourceId = Y, v = "", b(), T(), x();
        }, _.appendChild(V);
      }), A.length || _.appendChild(X("div", "resource-filter__combobox-empty", "暂无匹配资源"));
    }, M = () => {
      _.hidden = !1, d.setAttribute("aria-expanded", "true"), x();
    }, T = () => {
      _.hidden = !0, d.setAttribute("aria-expanded", "false");
    }, b = () => {
      d.value = v || w(S());
    };
    b(), x();
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
        f.contains(document.activeElement) || (v = "", b(), T());
      }, 0);
    }, d.oninput = () => {
      v = d.value, _.hidden = !1, d.setAttribute("aria-expanded", "true"), x();
    }, d.onkeydown = (C) => {
      C.key === "Escape" && T();
    }, p.onclick = () => {
      this._currentResourceId = i, v = "", b(), M(), d.focus();
    }, s.onclick = (C) => {
      C.target === s && s.remove();
    }, o.append(a, l), f.append(d, p, _), h.append(u, f), c.appendChild(h), g.append(m, y), r.append(o, c, g), s.appendChild(r), document.body.appendChild(s);
  }
};
oa.type = "resourceFilter";
let Gc = oa;
const Fs = class Fs extends W {
  constructor() {
    super(...arguments), this.type = Fs.type;
  }
};
Fs.type = "resourceFilter", Fs.defaultOption = {
  show: !0,
  resources: [],
  allValue: "__ALL__",
  storageKey: "gantt.resourceFilter"
};
let Yc = Fs;
function aT(n) {
  n.registerComponentModel(Yc), n.registerComponentView(Gc);
}
function lT(n) {
  aT(n);
}
const cT = () => {
  if (document.getElementById("gantt-query-style")) return;
  const n = document.createElement("style");
  n.id = "gantt-query-style", n.textContent = `
    .gantt-workspace { container-type: inline-size; }
    .gantt-query-host { position:absolute; z-index:20; inset:0 0 auto; height:112px; max-width:none; font:13px "Microsoft YaHei",sans-serif; pointer-events:none; }
    .gantt-query-host::before { content:''; position:absolute; inset:0 0 auto; height:112px; box-sizing:border-box; background:linear-gradient(to bottom,var(--gantt-surface, #FFFFFF) 0 64px,var(--gantt-panel, #F8FAFC) 64px 100%); border-bottom:1px solid var(--gantt-border, #D8E0E8); box-shadow:0 2px 5px rgba(31,41,55,.04); }
    .gantt-query-host::after { content:''; position:absolute; left:0; right:0; top:64px; height:1px; background:var(--gantt-border-soft, #E7ECF2); }
    .gantt-query__title { position:absolute; top:25px; left:16px; color:var(--gantt-text, #1F2937); font-size:16px; font-weight:700; line-height:24px; white-space:nowrap; }
    .gantt-query { position:absolute; top:18px; right:16px; display:flex; align-items:center; justify-content:flex-end; gap:6px; width:494px; max-width:calc(100% - 32px); height:36px; margin:0; pointer-events:auto; }
    .gantt-query__range { position:absolute; top:27px; left:50%; max-width:calc(100% - 960px); transform:translateX(-50%); color:var(--gantt-text-secondary, #334155); font-size:14px; font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; pointer-events:none; }
    .gantt-query input,.gantt-query select,.gantt-query button { box-sizing:border-box; height:36px; border:1px solid var(--gantt-axis-line, #CBD5E1); border-radius:6px; font:inherit; color:var(--gantt-text-secondary, #334155); background:var(--gantt-surface, #FFF); }
    .gantt-query input { flex:1; width:0; min-width:0; padding:0 10px; }
    .gantt-query select { width:82px; padding:0 4px; }
    .gantt-query button { padding:0 10px; cursor:pointer; flex-shrink:0; }
    .gantt-query button[type=submit] { color:#FFF; background:var(--gantt-primary, #2F9EEB); border-color:var(--gantt-primary, #2F9EEB); }
    .gantt-query button:hover { filter:brightness(.96); }
    .gantt-query :focus-visible { outline:2px solid var(--gantt-primary, #2F9EEB); outline-offset:2px; }
    .gantt-query__status { position:absolute; top:72px; right:16px; max-width:calc(100% - 32px); font-size:12px; color:var(--gantt-muted, #64748B); text-align:right; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; pointer-events:none; }
    .gantt-query__theme { width:67px; padding:2px !important; display:grid; grid-template-columns:1fr 1fr; gap:0; flex:0 0 67px; }
    .gantt-query__theme button { width:auto; height:30px; padding:0 !important; border:0 !important; border-radius:4px; display:grid; place-items:center; color:var(--gantt-faint, #94A3B8); background:transparent; box-shadow:none; }
    .gantt-query__theme button[aria-pressed=true] { color:var(--gantt-text, #1F2937); background:var(--gantt-surface-raised, #FFFFFF); box-shadow:0 1px 2px rgba(0,0,0,.1); }
    .gantt-query__theme svg { width:14px; height:14px; fill:none; stroke:currentColor; stroke-width:1.7; stroke-linecap:round; stroke-linejoin:round; }
    @container (max-width:600px) {
      .gantt-query-host { inset:0 0 auto; width:auto!important; max-width:none; }
      .gantt-query__title { top:20px; }
      .gantt-query { top:16px; right:12px; gap:4px; width:calc(100% - 184px); }
      .gantt-query select { width:68px; }
      .gantt-query button { padding:0 6px; }
      .gantt-query__theme { width:58px; flex-basis:58px; }
      .gantt-query__range { top:84px; left:16px; max-width:calc(100% - 32px); transform:none; }
      .gantt-query__status { top:84px; right:12px; }
    }
  `, document.head.appendChild(n);
}, aa = class aa extends Jt {
  constructor() {
    super(...arguments), this.type = aa.type, this._host = null;
  }
  render(t, e, i) {
    var y;
    this._model = t, this._ensureHost(i);
    const s = this._host;
    if (!s) return;
    s.style.display = t.get("show") ? "block" : "none", s.style.width = "auto", s.style.top = "0px", s.style.right = `${(y = t.get("right")) != null ? y : 16}px`;
    const r = this._formatRange(t.get("windowRange"));
    if (s.firstChild) {
      const v = s.querySelector(".gantt-query__range");
      v && (v.textContent = r);
      return;
    }
    const o = document.createElement("div");
    o.className = "gantt-query__range", o.textContent = r, o.setAttribute("aria-label", `当前甘特时间范围：${r}`);
    const a = document.createElement("div");
    a.className = "gantt-query__title", a.textContent = "资源调度";
    const l = document.createElement("form");
    l.className = "gantt-query", l.setAttribute("role", "search");
    const c = document.createElement("div");
    c.className = "gantt-query__theme", c.setAttribute("role", "group"), c.setAttribute("aria-label", "颜色模式");
    const h = [], u = () => {
      const v = xo();
      h.forEach((S) => {
        S.setAttribute(
          "aria-pressed",
          String(S.dataset.themeMode === v)
        );
      });
    };
    [
      ["light", "亮色模式", '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>'],
      ["dark", "暗色模式", '<path d="M20.5 15.2A8.5 8.5 0 0 1 8.8 3.5 8.5 8.5 0 1 0 20.5 15.2Z"/>']
    ].forEach(([v, S, w]) => {
      const x = document.createElement("button");
      x.type = "button", x.dataset.themeMode = v, x.title = S, x.setAttribute("aria-label", S), x.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${w}</svg>`, x.onclick = () => {
        xo() !== v && (s1(v), u(), i.dispatchAction(
          { type: "updateTheme", animation: { duration: 0 } },
          { silent: !0 }
        ));
      }, h.push(x), c.appendChild(x);
    }), u();
    const f = document.createElement("select");
    f.setAttribute("aria-label", "搜索条件"), (t.get("conditions") || ["任务名", "资源名"]).forEach((v) => {
      const S = document.createElement("option");
      S.value = S.textContent = v, f.appendChild(S);
    });
    const d = document.createElement("input");
    d.type = "search", d.placeholder = t.get("placeholder") || "输入关键词", d.setAttribute("aria-label", "搜索关键词"), d.value = t.get("value") || "";
    const p = document.createElement("button");
    p.type = "submit", p.textContent = "搜索";
    const _ = document.createElement("button");
    _.type = "button", _.textContent = "清空";
    const g = document.createElement("output");
    g.className = "gantt-query__status", g.setAttribute("aria-live", "polite");
    const m = () => {
      const v = d.value.trim(), S = this._model.get("onSearch");
      if (!S) {
        g.textContent = "搜索暂不可用";
        return;
      }
      const w = S({ keyword: v, condition: f.value });
      g.textContent = v ? `已筛选 · ${w ? w.count : 0} 个任务 · 清空可恢复` : "已显示全部任务";
    };
    l.onsubmit = (v) => {
      v.preventDefault(), m();
    }, _.onclick = () => {
      d.value = "", this._model.option.value = "", m(), d.focus();
    }, d.oninput = () => {
      this._model.option.value = d.value, d.value || m();
    }, f.onchange = () => {
      d.value.trim() && m();
    }, l.append(c, f, d, p, _), s.append(a, o, l, g);
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
    cT();
    const e = t.getZr(), i = e.dom || ((o = (r = e.painter) == null ? void 0 : r.getViewportRoot) == null ? void 0 : o.call(r)), s = (i == null ? void 0 : i.parentElement) || document.body;
    s !== document.body && window.getComputedStyle(s).position === "static" && (s.style.position = "relative"), i != null && i.style && (i.style.backgroundColor = "var(--gantt-bg)"), s.style.backgroundColor = "var(--gantt-bg)", s.classList.add("gantt-workspace"), this._host = document.createElement("div"), this._host.className = "gantt-query-host", s.appendChild(this._host);
  }
};
aa.type = "ganttQuery";
let Vc = aa;
const Bs = class Bs extends W {
  constructor() {
    super(...arguments), this.type = Bs.type;
  }
};
Bs.type = "ganttQuery", Bs.defaultOption = {
  show: !0,
  placeholder: "输入关键词",
  value: "",
  width: 420,
  top: 24,
  right: 16,
  conditions: ["任务名", "资源名"]
};
let Wc = Bs;
function hT(n) {
  n.registerComponentModel(Wc), n.registerComponentView(Vc);
}
function uT(n) {
  hT(n), n.registerAction({
    type: "updateTheme",
    update: "update"
  }, function(t, e) {
    const i = rt();
    e.eachComponent("xAxis", function(s) {
      var r, o;
      s.option.axisLabel = et(k({}, s.option.axisLabel || {}), {
        color: i.axisText
      }), s.option.axisTick = et(k({}, s.option.axisTick || {}), {
        lineStyle: et(k({}, ((r = s.option.axisTick) == null ? void 0 : r.lineStyle) || {}), {
          color: i.axisLine
        })
      }), s.option.axisLine = et(k({}, s.option.axisLine || {}), {
        lineStyle: et(k({}, ((o = s.option.axisLine) == null ? void 0 : o.lineStyle) || {}), {
          color: i.axisLine
        })
      });
    }), e.eachComponent("grid", function(s) {
      s.option.backgroundColor = i.gridBackground, s.option.borderColor = i.border;
    }), e.eachComponent("split", function(s) {
      s.option.backgroundColor = i.scrollTrack;
    }), e.eachComponent("dataZoom", function(s) {
      s.subType === "slider" && (s.option.borderColor = i.axisLine, s.option.backgroundColor = i.gridBackground, s.option.fillerColor = i.primarySoft, s.option.handleStyle = et(k({}, s.option.handleStyle || {}), {
        color: i.surface,
        borderColor: i.primary
      }), s.option.moveHandleStyle = et(k({}, s.option.moveHandleStyle || {}), {
        color: i.scrollThumb
      }), s.option.textStyle = et(k({}, s.option.textStyle || {}), {
        color: i.muted
      }), s.option.dataBackground = et(k({}, s.option.dataBackground || {}), {
        lineStyle: { color: i.border, width: 0.5 },
        areaStyle: { color: i.border, opacity: 0.2 }
      }), s.option.selectedDataBackground = et(k({}, s.option.selectedDataBackground || {}), {
        lineStyle: { color: i.primary, width: 0.5 },
        areaStyle: { color: i.primary, opacity: 0.2 }
      }));
    });
  });
}
const Un = 210, an = 150, fT = 75, qr = (n, t) => {
  const e = document.createElement(n);
  return t && (e.className = t), e;
}, Pl = (n) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${Un}" height="${an}" viewBox="0 0 ${Un} ${an}">
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
  `)}`, dT = () => {
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
      width: ${Un}px;
      height: ${an}px;
      border-radius: ${fT}px;
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
}, pT = () => {
  const n = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  return n.setAttribute("color-interpolation-filters", "sRGB"), n.style.display = "none", n.innerHTML = `
    <defs>
      <filter id="magnifying-glass-filter">
        <feImage href="${Pl("magnify")}" x="0" y="0" width="${Un}" height="${an}" result="magnifying_displacement_map" />
        <feDisplacementMap in="SourceGraphic" in2="magnifying_displacement_map" xChannelSelector="R" yChannelSelector="G" result="magnified_source" scale="24" />
        <feGaussianBlur in="magnified_source" stdDeviation="0" result="blurred_source" />
        <feImage href="${Pl("edge")}" x="0" y="0" width="${Un}" height="${an}" result="displacement_map" />
        <feDisplacementMap in="blurred_source" in2="displacement_map" xChannelSelector="R" yChannelSelector="G" result="displaced" scale="98" />
        <feColorMatrix in="displaced" type="saturate" result="displaced_saturated" values="9" />
        <feImage href="${Pl("specular")}" x="0" y="0" width="${Un}" height="${an}" result="specular_layer" />
        <feComposite in="displaced_saturated" in2="specular_layer" operator="in" result="specular_saturated" />
        <feComponentTransfer in="specular_layer" result="specular_faded">
          <feFuncA type="linear" slope="0.5" />
        </feComponentTransfer>
        <feBlend in="specular_saturated" in2="displaced" mode="normal" result="withSaturation" />
        <feBlend in="specular_faded" in2="withSaturation" mode="normal" />
      </filter>
    </defs>
  `, n;
}, la = class la extends Jt {
  constructor() {
    super(...arguments), this.type = la.type, this._host = null, this._widget = null, this._filterSvg = null, this._dragStartX = 0, this._dragStartY = 0, this._startLeft = 0, this._startTop = 0;
  }
  render(t, e, i) {
    var o, a;
    if (this._ensureHost(i, t), !this._host || !this._widget) return;
    this._host.style.display = t.get("show") ? "block" : "none", this._host.style.zIndex = String(t.get("zIndex") || 40), this._widget.style.width = `${t.get("width") || Un}px`, this._widget.style.height = `${t.get("height") || an}px`, this._widget.style.borderRadius = `${(t.get("height") || an) / 2}px`, this._widget.style.left = `${(o = t.get("left")) != null ? o : 24}px`, this._widget.style.top = `${(a = t.get("top")) != null ? a : 24}px`;
    const s = qr("div", "liquid-glass-widget__lens"), r = qr("div", "liquid-glass-widget__content");
    r.textContent = t.get("title") || "", this._widget.replaceChildren(this._filterSvg, s, r);
  }
  dispose() {
    var t;
    (t = this._host) == null || t.remove(), this._host = null, this._widget = null, this._filterSvg = null;
  }
  _ensureHost(t, e) {
    var o, a;
    if (this._host && this._widget) return;
    dT();
    const i = t.getZr(), s = i.dom || ((a = (o = i.painter) == null ? void 0 : o.getViewportRoot) == null ? void 0 : a.call(o)), r = (s == null ? void 0 : s.parentElement) || document.body;
    r !== document.body && window.getComputedStyle(r).position === "static" && (r.style.position = "relative"), this._host = qr("div", "liquid-glass-layer-host"), this._widget = qr("div", "liquid-glass-widget"), this._filterSvg = pT(), this._bindDrag(e), this._host.appendChild(this._widget), r.appendChild(this._host);
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
la.type = "liquidGlassLayer";
let Uc = la;
const Ns = class Ns extends W {
  constructor() {
    super(...arguments), this.type = Ns.type;
  }
};
Ns.type = "liquidGlassLayer", Ns.defaultOption = {
  show: !1,
  width: 210,
  height: 150,
  left: 24,
  top: 24,
  zIndex: 40,
  title: ""
};
let qc = Ns;
function gT(n) {
  n.registerComponentModel(qc), n.registerComponentView(Uc);
}
function _T(n) {
  gT(n);
}
const mT = [
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
class yT {
  constructor(t) {
    D(
      mT,
      function(e) {
        this[e] = L(
          t[e],
          t
        );
      },
      this
    );
  }
}
class P_ {
  constructor(t, e, i, s) {
    this._stageTaskMap = B(), this.piInstance = t, this.api = e, i = this._dataProcessorHandlers = i.slice(), s = this._visualHandlers = s.slice(), this._allHandlers = i.concat(s);
  }
  restorePipelines(t) {
    const e = this, i = e._pipelineMap = B();
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
    const r = this, o = e.seriesTaskMap, a = e.seriesTaskMap = B(), l = t.seriesType, c = t.getTargetSeries;
    t.createOnAllSeries ? i.eachRawSeries(h) : l ? i.eachRawSeriesByType(l, h) : c && c(i, s).each(h);
    function h(u) {
      const f = u.uid, d = a.set(
        f,
        o && o.get(f) || vs({
          plan: ST,
          reset: bT,
          count: ET
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
    vs({ reset: MT });
    o.context = {
      piModel: i,
      api: s,
      overallReset: t.overallReset,
      scheduler: r
    };
    const a = o.agentStubMap, l = o.agentStubMap = B(), c = t.seriesType, h = t.getTargetSeries;
    let u = !0, f = !1;
    c ? i.eachRawSeriesByType(c, d) : h ? h(i, s).each(d) : (u = !1, D(i.getSeries(), d));
    function d(p) {
      const _ = p.uid, g = l.set(
        _,
        a && a.get(_) || // When the result of `getTargetSeries` changed, the overallTask
        // should be set as dirty and re-performed.
        (f = !0, vs({
          reset: CT,
          onDirty: IT
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
      seriesType: vT(t)
    }), t.uid = ga("stageHandler"), e && (t.visualType = e), t;
  }
}
function vT(n) {
  zd = null;
  try {
    n(xT, wT);
  } catch (t) {
  }
  return zd;
}
const xT = {}, wT = {};
let zd;
function ST(n) {
  return n.plan ? n.plan(n.model, n.piModel, n.api, n.payload) : null;
}
function bT(n) {
  n.useClearVisual && n.data.clearAllVisual();
  const t = n.resetDefines = Xt(
    n.reset(n.model, n.piModel, n.api, n.payload)
  );
  return t.length > 1 ? G(t, function(e, i) {
    return L_(i);
  }) : TT;
}
const TT = L_(0);
function L_(n) {
  return function(t, e) {
    const i = e.data, s = e.resetDefines[n];
    if (s && s.dataEach)
      for (let r = t.start; r < t.end; r++)
        s.dataEach(i, r);
    else s && s.progress && s.progress(t, i);
  };
}
function MT(n) {
  n.overallReset(n.piModel, n.api, n.payload);
}
function CT(n) {
  return n.overallProgress && DT;
}
function DT() {
  this.agent.dirty(), this.getDownstream().dirty();
}
function IT() {
  this.agent && this.agent.dirty();
}
function ET(n) {
  return n.data.count();
}
const RT = [
  "symbol",
  "symbolSize",
  "symbolRotate",
  "symbolOffset"
], Hd = RT.concat(["symbolKeepAspect"]), AT = {
  createOnAllSeries: !0,
  // For legend.
  performRawSeries: !0,
  reset: function(n, t) {
    if (!n.hasSymbolVisual || t.isSeriesFiltered(n))
      return;
    const e = n.getData();
    function i(s, r) {
      const o = s.getItemModel(r);
      for (let a = 0; a < Hd.length; a++) {
        const l = Hd[a], c = o.getShallow(l, !0);
        c != null && s.setItemVisual(r, l, c);
      }
    }
    return { dataEach: e.hasItemOption ? i : null };
  }
};
function $n(n) {
  return isFinite(n);
}
function kT(n, t, e) {
  var i = t.x == null ? 0 : t.x, s = t.x2 == null ? 1 : t.x2, r = t.y == null ? 0 : t.y, o = t.y2 == null ? 0 : t.y2;
  t.global || (i = i * e.width + e.x, s = s * e.width + e.x, r = r * e.height + e.y, o = o * e.height + e.y), i = $n(i) ? i : 0, s = $n(s) ? s : 1, r = $n(r) ? r : 0, o = $n(o) ? o : 0;
  var a = n.createLinearGradient(i, r, s, o);
  return a;
}
function PT(n, t, e) {
  var i = e.width, s = e.height, r = Math.min(i, s), o = t.x == null ? 0.5 : t.x, a = t.y == null ? 0.5 : t.y, l = t.r == null ? 0.5 : t.r;
  t.global || (o = o * i + e.x, a = a * s + e.y, l = l * r), o = $n(o) ? o : 0.5, a = $n(a) ? a : 0.5, l = l >= 0 && $n(l) ? l : 0.5;
  var c = n.createRadialGradient(o, a, 0, o, a, l);
  return c;
}
function Zc(n, t, e) {
  for (var i = t.type === "radial" ? PT(n, t, e) : kT(n, t, e), s = t.colorStops, r = 0; r < s.length; r++)
    i.addColorStop(s[r].offset, s[r].color);
  return i;
}
function LT(n, t) {
  if (n === t || !n && !t)
    return !1;
  if (!n || !t || n.length !== t.length)
    return !0;
  for (var e = 0; e < n.length; e++)
    if (n[e] !== t[e])
      return !0;
  return !1;
}
function Zr(n) {
  return parseInt(n, 10);
}
function Xr(n, t, e) {
  var i = ["width", "height"][t], s = ["clientWidth", "clientHeight"][t], r = ["paddingLeft", "paddingTop"][t], o = ["paddingRight", "paddingBottom"][t];
  if (e[i] != null && e[i] !== "auto")
    return parseFloat(e[i]);
  var a = document.defaultView.getComputedStyle(n);
  return (n[s] || Zr(a[i]) || Zr(n.style[i])) - (Zr(a[r]) || 0) - (Zr(a[o]) || 0) | 0;
}
var $d = new Sh(50);
function O_(n, t, e, i, s) {
  if (n)
    if (typeof n == "string") {
      if (t && t.__zrImageSrc === n || !e)
        return t;
      var r = $d.get(n), o = { hostEl: e, cb: i, cbPayload: s };
      return r ? (t = r.image, !zh(t) && r.pending.push(o)) : (t = sr.loadImage(n, Gd, Gd), t.__zrImageSrc = n, $d.put(n, t.__cachedImgObj = {
        image: t,
        pending: [o]
      })), t;
    } else
      return n;
  else return t;
}
function Gd() {
  var n = this.__cachedImgObj;
  this.onload = this.onerror = this.__cachedImgObj = null;
  for (var t = 0; t < n.pending.length; t++) {
    var e = n.pending[t], i = e.cb;
    i && i(this, e.cbPayload), e.hostEl.dirty();
  }
  n.pending.length = 0;
}
function zh(n) {
  return n && n.width && n.height;
}
var OT = Ee({
  strokeFirst: !0,
  font: Gs,
  x: 0,
  y: 0,
  textAlign: "left",
  textBaseline: "top",
  miterLimit: 2
}, Hg), F_ = (function(n) {
  Kn(t, n);
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
    return va(OT, e);
  }, t.prototype.setBoundingRect = function(e) {
    this._rect = e;
  }, t.prototype.getBoundingRect = function() {
    var e = this.style;
    if (!this._rect) {
      var i = e.text;
      i != null ? i += "" : i = "";
      var s = tx(i, e.font, e.textAlign, e.textBaseline);
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
})(Mh);
F_.prototype.type = "tspan";
function FT(n, t) {
  return !n || n === "solid" || !(t > 0) ? null : n === "dashed" ? [4 * t, 2 * t] : n === "dotted" ? [t] : le(n) ? [n] : Ri(n) ? n : null;
}
function B_(n) {
  var t = n.style, e = t.lineDash && t.lineWidth > 0 && FT(t.lineDash, t.lineWidth), i = t.lineDashOffset;
  if (e) {
    var s = t.strokeNoScale && n.getLineScale ? n.getLineScale() : 1;
    s && s !== 1 && (e = ce(e, function(r) {
      return r / s;
    }), i /= s);
  }
  return [e, i];
}
var BT = new Pi(!0);
function $o(n) {
  var t = n.stroke;
  return !(t == null || t === "none" || !(n.lineWidth > 0));
}
function Yd(n) {
  return typeof n == "string" && n !== "none";
}
function Go(n) {
  var t = n.fill;
  return t != null && t !== "none";
}
function Vd(n, t) {
  if (t.fillOpacity != null && t.fillOpacity !== 1) {
    var e = n.globalAlpha;
    n.globalAlpha = t.fillOpacity * t.opacity, n.fill(), n.globalAlpha = e;
  } else
    n.fill();
}
function Wd(n, t) {
  if (t.strokeOpacity != null && t.strokeOpacity !== 1) {
    var e = n.globalAlpha;
    n.globalAlpha = t.strokeOpacity * t.opacity, n.stroke(), n.globalAlpha = e;
  } else
    n.stroke();
}
function Xc(n, t, e) {
  var i = O_(t.image, t.__image, e);
  if (zh(i)) {
    var s = n.createPattern(i, t.repeat || "repeat");
    if (typeof DOMMatrix == "function" && s && s.setTransform) {
      var r = new DOMMatrix();
      r.translateSelf(t.x || 0, t.y || 0), r.rotateSelf(0, 0, (t.rotation || 0) * $m), r.scaleSelf(t.scaleX || 1, t.scaleY || 1), s.setTransform(r);
    }
    return s;
  }
}
function NT(n, t, e, i) {
  var s, r = $o(e), o = Go(e), a = e.strokePercent, l = a < 1, c = !t.path;
  (!t.silent || l) && c && t.createPathProxy();
  var h = t.path || BT, u = t.__dirty;
  if (!i) {
    var f = e.fill, d = e.stroke, p = o && !!f.colorStops, _ = r && !!d.colorStops, g = o && !!f.image, m = r && !!d.image, y = void 0, v = void 0, S = void 0, w = void 0, x = void 0;
    (p || _) && (x = t.getBoundingRect()), p && (y = u ? Zc(n, f, x) : t.__canvasFillGradient, t.__canvasFillGradient = y), _ && (v = u ? Zc(n, d, x) : t.__canvasStrokeGradient, t.__canvasStrokeGradient = v), g && (S = u || !t.__canvasFillPattern ? Xc(n, f, t) : t.__canvasFillPattern, t.__canvasFillPattern = S), m && (w = u || !t.__canvasStrokePattern ? Xc(n, d, t) : t.__canvasStrokePattern, t.__canvasStrokePattern = S), p ? n.fillStyle = y : g && (S ? n.fillStyle = S : o = !1), _ ? n.strokeStyle = v : m && (w ? n.strokeStyle = w : r = !1);
  }
  var M = t.getGlobalScale();
  h.setScale(M[0], M[1], t.segmentIgnoreThreshold);
  var T, b;
  n.setLineDash && e.lineDash && (s = B_(t), T = s[0], b = s[1]);
  var I = !0;
  (c || u & di) && (h.setDPR(n.dpr), l ? h.setContext(null) : (h.setContext(n), I = !1), h.reset(), t.buildPath(h, t.shape, i), h.toStatic(), t.pathUpdated()), I && h.rebuildPath(n, l ? a : 1), T && (n.setLineDash(T), n.lineDashOffset = b), i || (e.strokeFirst ? (r && Wd(n, e), o && Vd(n, e)) : (o && Vd(n, e), r && Wd(n, e))), T && n.setLineDash([]);
}
function zT(n, t, e) {
  var i = t.__image = O_(e.image, t.__image, t, t.onload);
  if (!(!i || !zh(i))) {
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
function HT(n, t, e) {
  var i, s = e.text;
  if (s != null && (s += ""), s) {
    n.font = e.font || Gs, n.textAlign = e.textAlign, n.textBaseline = e.textBaseline;
    var r = void 0, o = void 0;
    n.setLineDash && e.lineDash && (i = B_(t), r = i[0], o = i[1]), r && (n.setLineDash(r), n.lineDashOffset = o), e.strokeFirst ? ($o(e) && n.strokeText(s, e.x, e.y), Go(e) && n.fillText(s, e.x, e.y)) : (Go(e) && n.fillText(s, e.x, e.y), $o(e) && n.strokeText(s, e.x, e.y)), r && n.setLineDash([]);
  }
}
var Ud = ["shadowBlur", "shadowOffsetX", "shadowOffsetY"], qd = [
  ["lineCap", "butt"],
  ["lineJoin", "miter"],
  ["miterLimit", 10]
];
function N_(n, t, e, i, s) {
  var r = !1;
  if (!i && (e = e || {}, t === e))
    return !1;
  if (i || t.opacity !== e.opacity) {
    mt(n, s), r = !0;
    var o = Math.max(Math.min(t.opacity, 1), 0);
    n.globalAlpha = isNaN(o) ? Yn.opacity : o;
  }
  (i || t.blend !== e.blend) && (r || (mt(n, s), r = !0), n.globalCompositeOperation = t.blend || Yn.blend);
  for (var a = 0; a < Ud.length; a++) {
    var l = Ud[a];
    (i || t[l] !== e[l]) && (r || (mt(n, s), r = !0), n[l] = n.dpr * (t[l] || 0));
  }
  return (i || t.shadowColor !== e.shadowColor) && (r || (mt(n, s), r = !0), n.shadowColor = t.shadowColor || Yn.shadowColor), r;
}
function Zd(n, t, e, i, s) {
  var r = nr(t, s.inHover), o = i ? null : e && nr(e, s.inHover) || {};
  if (r === o)
    return !1;
  var a = N_(n, r, o, i, s);
  if ((i || r.fill !== o.fill) && (a || (mt(n, s), a = !0), Yd(r.fill) && (n.fillStyle = r.fill)), (i || r.stroke !== o.stroke) && (a || (mt(n, s), a = !0), Yd(r.stroke) && (n.strokeStyle = r.stroke)), (i || r.opacity !== o.opacity) && (a || (mt(n, s), a = !0), n.globalAlpha = r.opacity == null ? 1 : r.opacity), t.hasStroke()) {
    var l = r.lineWidth, c = l / (r.strokeNoScale && t.getLineScale ? t.getLineScale() : 1);
    n.lineWidth !== c && (a || (mt(n, s), a = !0), n.lineWidth = c);
  }
  for (var h = 0; h < qd.length; h++) {
    var u = qd[h], f = u[0];
    (i || r[f] !== o[f]) && (a || (mt(n, s), a = !0), n[f] = r[f] || u[1]);
  }
  return a;
}
function $T(n, t, e, i, s) {
  return N_(n, nr(t, s.inHover), e && nr(e, s.inHover), i, s);
}
function z_(n, t) {
  var e = t.transform, i = n.dpr || 1;
  e ? n.setTransform(i * e[0], i * e[1], i * e[2], i * e[3], i * e[4], i * e[5]) : n.setTransform(i, 0, 0, i, 0, 0);
}
function GT(n, t, e) {
  for (var i = !1, s = 0; s < n.length; s++) {
    var r = n[s];
    i = i || r.isZeroArea(), z_(t, r), t.beginPath(), r.buildPath(t, r.shape), t.clip();
  }
  e.allClipped = i;
}
function YT(n, t) {
  return n && t ? n[0] !== t[0] || n[1] !== t[1] || n[2] !== t[2] || n[3] !== t[3] || n[4] !== t[4] || n[5] !== t[5] : !(!n && !t);
}
var Xd = 1, Kd = 2, jd = 3, Qd = 4;
function VT(n) {
  var t = Go(n), e = $o(n);
  return !(n.lineDash || !(+t ^ +e) || t && typeof n.fill != "string" || e && typeof n.stroke != "string" || n.strokePercent < 1 || n.strokeOpacity < 1 || n.fillOpacity < 1);
}
function mt(n, t) {
  t.batchFill && n.fill(), t.batchStroke && n.stroke(), t.batchFill = "", t.batchStroke = "";
}
function nr(n, t) {
  return t && n.__hoverStyle || n.style;
}
function WT(n, t) {
  Gn(n, t, { inHover: !1, viewWidth: 0, viewHeight: 0 }, !0);
}
function Gn(n, t, e, i) {
  var s = t.transform;
  if (!t.shouldBePainted(e.viewWidth, e.viewHeight, !1, !1)) {
    t.__dirty &= ~Zt, t.__isRendered = !1;
    return;
  }
  var r = t.__clipPaths, o = e.prevElClipPaths, a = !1, l = !1;
  if ((!o || LT(r, o)) && (o && o.length && (mt(n, e), n.restore(), l = a = !0, e.prevElClipPaths = null, e.allClipped = !1, e.prevEl = null), r && r.length && (mt(n, e), n.save(), GT(r, n, e), a = !0), e.prevElClipPaths = r), e.allClipped) {
    t.__isRendered = !1;
    return;
  }
  t.beforeBrush && t.beforeBrush(), t.innerBeforeBrush();
  var c = e.prevEl;
  c || (l = a = !0);
  var h = t instanceof lc && t.autoBatch && VT(t.style);
  a || YT(s, c.transform) ? (mt(n, e), z_(n, t)) : h || mt(n, e);
  var u = nr(t, e.inHover);
  t instanceof lc ? (e.lastDrawType !== Xd && (l = !0, e.lastDrawType = Xd), Zd(n, t, c, l, e), (!h || !e.batchFill && !e.batchStroke) && n.beginPath(), NT(n, t, u, h), h && (e.batchFill = u.fill || "", e.batchStroke = u.stroke || "")) : t instanceof F_ ? (e.lastDrawType !== jd && (l = !0, e.lastDrawType = jd), Zd(n, t, c, l, e), HT(n, t, u)) : t instanceof Ch ? (e.lastDrawType !== Kd && (l = !0, e.lastDrawType = Kd), $T(n, t, c, l, e), zT(n, t, u)) : t.getTemporalDisplayables && (e.lastDrawType !== Qd && (l = !0, e.lastDrawType = Qd), UT(n, t, e)), h && i && mt(n, e), t.innerAfterBrush(), t.afterBrush && t.afterBrush(), e.prevEl = t, t.__dirty = 0, t.__isRendered = !0;
}
function UT(n, t, e) {
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
    l.beforeBrush && l.beforeBrush(), l.innerBeforeBrush(), Gn(n, l, r, o === a - 1), l.innerAfterBrush(), l.afterBrush && l.afterBrush(), r.prevEl = l;
  }
  for (var c = 0, h = s.length; c < h; c++) {
    var l = s[c];
    l.beforeBrush && l.beforeBrush(), l.innerBeforeBrush(), Gn(n, l, r, c === h - 1), l.innerAfterBrush(), l.afterBrush && l.afterBrush(), r.prevEl = l;
  }
  t.clearTemporalDisplayables(), t.notClear = !0, n.restore();
}
function Jd(n, t, e) {
  var i = sr.createCanvas(), s = t.getWidth(), r = t.getHeight(), o = i.style;
  return o && (o.position = "absolute", o.left = "0", o.top = "0", o.width = s + "px", o.height = r + "px", i.setAttribute("data-zr-dom-id", n)), i.width = s * e, i.height = r * e, i;
}
var Ll = (function(n) {
  Kn(t, n);
  function t(e, i, s) {
    var r = n.call(this) || this;
    r.motionBlur = !1, r.lastFrameAlpha = 0.7, r.dpr = 1, r.virtual = !1, r.config = {}, r.incremental = !1, r.zlevel = 0, r.maxRepaintRectCount = 5, r.__dirty = !0, r.__firstTimePaint = !0, r.__used = !1, r.__drawIndex = 0, r.__startIndex = 0, r.__endIndex = 0, r.__prevStartIndex = null, r.__prevEndIndex = null;
    var o;
    s = s || Do, typeof e == "string" ? o = Jd(e, i, s) : ae(e) && (o = e, e = o.id), r.id = e, r.dom = o;
    var a = o.style;
    return a && (Pp(o), o.onselectstart = function() {
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
    this.domBack = Jd("back-" + this.id, this.painter, e), this.ctxBack = this.domBack.getContext("2d"), e !== 1 && this.ctxBack.scale(e, e);
  }, t.prototype.createRepaintRects = function(e, i, s, r) {
    if (this.__firstTimePaint)
      return this.__firstTimePaint = !1, null;
    var o = [], a = this.maxRepaintRectCount, l = !1, c = new yt(0, 0, 0, 0);
    function h(y) {
      if (!(!y.isFinite() || y.isZero()))
        if (o.length === 0) {
          var v = new yt(0, 0, 0, 0);
          v.copy(y), o.push(v);
        } else {
          for (var S = !1, w = 1 / 0, x = 0, M = 0; M < o.length; ++M) {
            var T = o[M];
            if (T.intersect(y)) {
              var b = new yt(0, 0, 0, 0);
              b.copy(T), b.union(y), o[M] = b, S = !0;
              break;
            } else if (l) {
              c.copy(y), c.union(T);
              var I = y.width * y.height, C = T.width * T.height, E = c.width * c.height, A = E - I - C;
              A < w && (w = A, x = M);
            }
          }
          if (l && (o[x].union(y), S = !0), !S) {
            var v = new yt(0, 0, 0, 0);
            v.copy(y), o.push(v);
          }
          l || (l = o.length >= a);
        }
    }
    for (var u = this.__startIndex; u < this.__endIndex; ++u) {
      var f = e[u];
      if (f) {
        var d = f.shouldBePainted(s, r, !0, !0), p = f.__isRendered && (f.__dirty & Zt || !d) ? f.getPrevPaintRect() : null;
        p && h(p);
        var _ = d && (f.__dirty & Zt || !f.__isRendered) ? f.getPaintRect() : null;
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
        if (ya(i)) {
          var S = i.global || i.__width === m && i.__height === y;
          v = S && i.__canvasGradient || Zc(o, i, {
            x: 0,
            y: 0,
            width: m,
            height: y
          }), i.__canvasGradient = v, i.__width = m, i.__height = y;
        } else Nm(i) && (i.scaleX = i.scaleX || u, i.scaleY = i.scaleY || u, v = Xc(o, i, {
          dirty: function() {
            f.setUnpainted(), f.__painter.refresh();
          }
        }));
        o.save(), o.fillStyle = v || i, o.fillRect(_, g, m, y), o.restore();
      }
      c && (o.save(), o.globalAlpha = h, o.drawImage(d, _, g, m, y), o.restore());
    }
    !s || c ? p(0, 0, a, l) : s.length && nt(s, function(_) {
      p(_.x * u, _.y * u, _.width * u, _.height * u);
    });
  }, t;
})(Lg), H_;
H_ = we.hasGlobalWindow && (window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window) || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame) || function(n) {
  return setTimeout(n, 16);
};
var tp = 1e5, Bn = 314159, Kr = 0.01, qT = 1e-3;
function ZT(n) {
  return n ? n.__builtin__ ? !0 : !(typeof n.resize != "function" || typeof n.refresh != "function") : !1;
}
function XT(n, t) {
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
var KT = (function() {
  function n(t, e, i, s) {
    this.type = "canvas", this._zlevelList = [], this._prevDisplayList = [], this._layers = {}, this._layerConfig = {}, this._needsManuallyCompositing = !1, this.type = "canvas";
    var r = !t.nodeName || t.nodeName.toUpperCase() === "CANVAS";
    this._opts = i = R({}, i || {}), this.dpr = i.devicePixelRatio || Do, this._singleCanvas = r, this.root = t;
    var o = t.style;
    o && (Pp(t), t.innerHTML = ""), this.storage = e;
    var a = this._zlevelList;
    this._prevDisplayList = [];
    var l = this._layers;
    if (r) {
      var h = t, u = h.width, f = h.height;
      i.width != null && (u = i.width), i.height != null && (f = i.height), this.dpr = i.devicePixelRatio || 1, h.width = u * this.dpr, h.height = f * this.dpr, this._width = u, this._height = f;
      var d = new Ll(h, this, this.dpr);
      d.__builtin__ = !0, d.initContext(), l[Bn] = d, d.zlevel = Bn, a.push(Bn), this._domRoot = t;
    } else {
      this._width = Xr(t, 0, i), this._height = Xr(t, 1, i);
      var c = this._domRoot = XT(this._width, this._height);
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
        a.__inHover && (i || (i = this._hoverlayer = this.getLayer(tp)), r || (r = i.ctx, r.save()), Gn(r, a, s, o === e - 1));
      }
      r && r.restore();
    }
  }, n.prototype.getHoverLayer = function() {
    return this.getLayer(tp);
  }, n.prototype.paintOne = function(t, e) {
    WT(t, e);
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
        H_(function() {
          l._paintList(t, e, i, s);
        });
      }
    }
  }, n.prototype._compositeManually = function() {
    var t = this.getLayer(Bn).ctx, e = this._domRoot.width, i = this._domRoot.height;
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
      var T, b = function(A) {
        var P = {
          inHover: !1,
          allClipped: !1,
          prevEl: null,
          viewWidth: s._width,
          viewHeight: s._height
        };
        for (T = v; T < g.__endIndex; T++) {
          var Y = t[T];
          if (Y.__inHover && (u = !0), s._doPaintEl(Y, g, o, A, P, T === g.__endIndex - 1), S) {
            var V = Date.now() - w;
            if (V > 15)
              break;
          }
        }
        P.prevElClipPaths && m.restore();
      };
      if (y)
        if (y.length === 0)
          T = g.__endIndex;
        else
          for (var I = d.dpr, C = 0; C < y.length; ++C) {
            var E = y[C];
            m.save(), m.beginPath(), m.rect(E.x * I, E.y * I, E.width * I, E.height * I), m.clip(), b(E), m.restore();
          }
      else
        m.save(), b(), m.restore();
      g.__drawIndex = T, g.__drawIndex < g.__endIndex && (h = !1);
    }, d = this, p = 0; p < r.length; p++)
      f(p);
    return we.wxa && nt(this._layers, function(_) {
      _ && _.ctx && _.ctx.draw && _.ctx.draw();
    }), {
      finished: h,
      needsRefreshHover: u
    };
  }, n.prototype._doPaintEl = function(t, e, i, s, r, o) {
    var a = e.ctx;
    if (i) {
      var l = t.getPaintRect();
      (!s || l && l.intersect(s)) && (Gn(a, t, r, o), t.setPrevPaintRect(l));
    } else
      Gn(a, t, r, o);
  }, n.prototype.getLayer = function(t, e) {
    this._singleCanvas && !this._needsManuallyCompositing && (t = Bn);
    var i = this._layers[t];
    return i || (i = new Ll("zr_" + t, this, this.dpr), i.zlevel = t, i.__builtin__ = !0, this._layerConfig[t] ? Je(i, this._layerConfig[t], !0) : this._layerConfig[t - Kr] && Je(i, this._layerConfig[t - Kr], !0), e && (i.virtual = e), this.insertLayer(t, i), i.initContext()), i;
  }, n.prototype.insertLayer = function(t, e) {
    var i = this._layers, s = this._zlevelList, r = s.length, o = this._domRoot, a = null, l = -1;
    if (!i[t] && ZT(e)) {
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
      a !== c && (a = c, o = 0), s.incremental ? (h = this.getLayer(c + qT, this._needsManuallyCompositing), h.incremental = !0, o = 1) : h = this.getLayer(c + (o > 0 ? Kr : 0), this._needsManuallyCompositing), h.__builtin__ || lh("ZLevel " + c + " has been used by unkown layer " + h.id), h !== r && (h.__used = !0, h.__startIndex !== l && (h.__dirty = !0), h.__startIndex = l, h.incremental ? h.__drawIndex = -1 : h.__drawIndex = l, e(l), r = h), s.__dirty & Zt && !s.__inHover && (h.__dirty = !0, h.incremental && h.__drawIndex < 0 && (h.__drawIndex = l));
    }
    e(l), this.eachBuiltinLayer(function(u, f) {
      !u.__used && u.getElementCount() > 0 && (u.__dirty = !0, u.__startIndex = u.__endIndex = u.__drawIndex = 0), u.__dirty && u.__drawIndex < 0 && (u.__drawIndex = u.__startIndex);
    });
  }, n.prototype.clear = function() {
    return this.eachBuiltinLayer(this._clearLayer), this;
  }, n.prototype._clearLayer = function(t) {
    t.clear();
  }, n.prototype.setBackgroundColor = function(t) {
    this._backgroundColor = t, nt(this._layers, function(e) {
      e.setUnpainted();
    });
  }, n.prototype.configLayer = function(t, e) {
    if (e) {
      var i = this._layerConfig;
      i[t] ? Je(i[t], e, !0) : i[t] = e;
      for (var s = 0; s < this._zlevelList.length; s++) {
        var r = this._zlevelList[s];
        if (r === t || r === t + Kr) {
          var o = this._layers[r];
          Je(o, i[t], !0);
        }
      }
    }
  }, n.prototype.delLayer = function(t) {
    var e = this._layers, i = this._zlevelList, s = e[t];
    s && (s.dom.parentNode.removeChild(s.dom), delete e[t], i.splice(Ct(i, t), 1));
  }, n.prototype.resize = function(t, e) {
    if (this._domRoot.style) {
      var i = this._domRoot;
      i.style.display = "none";
      var s = this._opts, r = this.root;
      if (t != null && (s.width = t), e != null && (s.height = e), t = Xr(r, 0, s), e = Xr(r, 1, s), i.style.display = "", this._width !== t || e !== this._height) {
        i.style.width = t + "px", i.style.height = e + "px";
        for (var o in this._layers)
          this._layers.hasOwnProperty(o) && this._layers[o].resize(t, e);
        this.refresh(!0);
      }
      this._width = t, this._height = e;
    } else {
      if (t == null || e == null)
        return;
      this._width = t, this._height = e, this.getLayer(Bn).resize(t, e);
    }
    return this;
  }, n.prototype.clearLayer = function(t) {
    var e = this._layers[t];
    e && e.clear();
  }, n.prototype.dispose = function() {
    this.root.innerHTML = "", this.root = this.storage = this._domRoot = this._layers = null;
  }, n.prototype.getRenderedCanvas = function(t) {
    if (t = t || {}, this._singleCanvas && !this._compositeManually)
      return this._layers[Bn].dom;
    var e = new Ll("image", this, t.pixelRatio || this.dpr);
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
        Gn(i, h, o, l === c - 1);
      }
    return e.dom;
  }, n.prototype.getWidth = function() {
    return this._width;
  }, n.prototype.getHeight = function() {
    return this._height;
  }, n;
})(), se = Object.freeze({
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
      return 1 - se.Bounce.Out(1 - n);
    },
    Out: function(n) {
      return n < 1 / 2.75 ? 7.5625 * n * n : n < 2 / 2.75 ? 7.5625 * (n -= 1.5 / 2.75) * n + 0.75 : n < 2.5 / 2.75 ? 7.5625 * (n -= 2.25 / 2.75) * n + 0.9375 : 7.5625 * (n -= 2.625 / 2.75) * n + 0.984375;
    },
    InOut: function(n) {
      return n < 0.5 ? se.Bounce.In(n * 2) * 0.5 : se.Bounce.Out(n * 2 - 1) * 0.5 + 0.5;
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
}), ps = function() {
  return performance.now();
}, $_ = (
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
      t === void 0 && (t = ps()), e === void 0 && (e = !0);
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
), Kc = {
  Linear: function(n, t) {
    var e = n.length - 1, i = e * t, s = Math.floor(i), r = Kc.Utils.Linear;
    return t < 0 ? r(n[0], n[1], i) : t > 1 ? r(n[e], n[e - 1], e - i) : r(n[s], n[s + 1 > e ? e : s + 1], i - s);
  },
  Utils: {
    Linear: function(n, t, e) {
      return (t - n) * e + n;
    }
  }
}, G_ = (
  /** @class */
  (function() {
    function n() {
    }
    return n.nextId = function() {
      return n._nextId++;
    }, n._nextId = 0, n;
  })()
), jc = new $_(), jT = (
  /** @class */
  (function() {
    function n(t, e) {
      this._isPaused = !1, this._pauseStart = 0, this._valuesStart = {}, this._valuesEnd = {}, this._valuesStartRepeat = {}, this._duration = 1e3, this._isDynamic = !1, this._initialRepeat = 0, this._repeat = 0, this._yoyo = !1, this._isPlaying = !1, this._reversed = !1, this._delayTime = 0, this._startTime = 0, this._easingFunction = se.Linear.None, this._interpolationFunction = Kc.Linear, this._chainedTweens = [], this._onStartCallbackFired = !1, this._onEveryStartCallbackFired = !1, this._id = G_.nextId(), this._isChainStopped = !1, this._propertiesAreSetUp = !1, this._goToEnd = !1, this._object = t, typeof e == "object" ? (this._group = e, e.add(this)) : e === !0 && (this._group = jc, jc.add(this));
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
      if (t === void 0 && (t = ps()), e === void 0 && (e = !1), this._isPlaying)
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
      return t === void 0 && (t = ps()), this._isPaused || !this._isPlaying ? this : (this._isPaused = !0, this._pauseStart = t, this);
    }, n.prototype.resume = function(t) {
      return t === void 0 && (t = ps()), !this._isPaused || !this._isPlaying ? this : (this._isPaused = !1, this._startTime += t - this._pauseStart, this._pauseStart = 0, this);
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
      return t === void 0 && (t = se.Linear.None), this._easingFunction = t, this;
    }, n.prototype.interpolation = function(t) {
      return t === void 0 && (t = Kc.Linear), this._interpolationFunction = t, this;
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
      if (t === void 0 && (t = ps()), e === void 0 && (e = n.autoStartOnUpdate), this._isPaused)
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
G_.nextId;
var Ie = jc;
Ie.getAll.bind(Ie);
Ie.removeAll.bind(Ie);
Ie.add.bind(Ie);
Ie.remove.bind(Ie);
Ie.update.bind(Ie);
class QT {
  constructor(t) {
    this._requestFrame = t, this._group = new $_(), this.presets = {
      fadeIn: (e, i = {}) => {
        var s, r;
        return this._setElementStyle(e, { opacity: (s = i.fromOpacity) != null ? s : 0 }), this.animateElement(
          e,
          { style: { opacity: (r = i.toOpacity) != null ? r : 1 } },
          k({ duration: 240 }, i)
        );
      },
      fadeOut: (e, i = {}) => {
        var s;
        return this.animateElement(
          e,
          { style: { opacity: (s = i.toOpacity) != null ? s : 0 } },
          k({ duration: 240 }, i)
        );
      },
      pulse: (e, i = {}) => {
        var r, o;
        const s = (r = this._getElementStyle(e).opacity) != null ? r : 1;
        return this.animateElement(
          e,
          { style: { opacity: (o = i.minOpacity) != null ? o : 0.35 } },
          et(k({
            duration: 700,
            loop: !0,
            yoyo: !0,
            easing: se.Sinusoidal.InOut
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
          et(k({
            duration: 900,
            loop: !0,
            yoyo: !0,
            easing: se.Sinusoidal.InOut
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
          k({
            duration: 1e3,
            loop: !0,
            easing: se.Linear.None
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
          et(k({
            duration: 260,
            repeat: 1,
            yoyo: !0,
            easing: se.Quadratic.Out
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
          et(k({
            duration: 180,
            loop: !0,
            yoyo: !0,
            easing: se.Sinusoidal.InOut
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
    const s = new jT(t, this._group).to(e, (o = i.duration) != null ? o : 300).easing((a = i.easing) != null ? a : se.Quadratic.Out);
    i.delay && s.delay(i.delay);
    const r = this._getRepeatCount(i);
    return (r > 0 || r === 1 / 0) && s.repeat(r), i.repeatDelay != null && s.repeatDelay(i.repeatDelay), i.yoyo && s.yoyo(!0), i.onStart && s.onStart(() => i.onStart(t)), i.onUpdate && s.onUpdate((c, h) => i.onUpdate(c, h)), i.onComplete && s.onComplete((c) => i.onComplete(c)), i.onStop && s.onStop((c) => i.onStop(c)), s.start(), (l = this._requestFrame) == null || l.call(this), s;
  }
  animateElement(t, e, i = {}) {
    const s = this._createElementTweenState(t, e), r = s.to;
    return this.animate(s.current, r, et(k({}, i), {
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
    t.setShape ? t.setShape(e) : t.shape = k(k({}, t.shape || {}), e);
  }
  _setElementStyle(t, e) {
    t.setStyle ? t.setStyle(e) : t.style = k(k({}, t.style || {}), e);
  }
  _setElementAttrs(t, e) {
    t.attr ? t.attr(e) : Object.assign(t, e);
  }
}
const ep = 1e3, np = 1e4, JT = 3e4;
class tM {
  constructor(t) {
    this.socket = null, this.status = "idle", this.reconnectAttempts = 0, this.reconnectTimer = null, this.heartbeatTimer = null, this.manuallyClosed = !1, this.messageHandlers = /* @__PURE__ */ new Set(), this.rawMessageHandlers = /* @__PURE__ */ new Set(), this.statusHandlers = /* @__PURE__ */ new Set(), this.options = k({
      reconnect: !0,
      reconnectDelay: ep,
      maxReconnectDelay: np,
      heartbeatInterval: JT
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
      (this.options.reconnectDelay || ep) * this.reconnectAttempts,
      this.options.maxReconnectDelay || np
    );
    this.reconnectTimer = window.setTimeout(() => {
      this.connect();
    }, t);
  }
  clearReconnectTimer() {
    this.reconnectTimer != null && (window.clearTimeout(this.reconnectTimer), this.reconnectTimer = null);
  }
}
class eM {
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
function nM(n, t, e) {
  return n.on(t, e);
}
function iM(n) {
  const t = new eM();
  return {
    client: n,
    router: t,
    on: (e, i) => t.register(e, i),
    dispose: () => {
      t.clear();
    }
  };
}
class sM {
  constructor() {
    this.runtime = null, this.configKey = "disabled";
  }
  configure(t) {
    const e = t || {}, i = e.enabled === !0 && !!e.url, s = i ? JSON.stringify(et(k({}, e), {
      heartbeatMessage: typeof e.heartbeatMessage == "function" ? "[function]" : e.heartbeatMessage
    })) : "disabled";
    if (s === this.configKey || (this.disposeRuntime(), this.configKey = s, !i)) return;
    const c = e, { enabled: r, url: o } = c, a = Jh(c, ["enabled", "url"]), l = new tM(k({
      url: o
    }, a));
    this.runtime = iM(l), l.connect();
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
const rM = /* @__PURE__ */ new Set(["task", "gateTask"]);
function oM(n) {
  if (!n || typeof n != "object")
    return null;
  const t = n;
  return typeof t.message != "string" && !t.category ? null : t;
}
function aM(n) {
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
function lM(n, t) {
  var s, r;
  if (!rM.has(n.category || ""))
    return null;
  const e = Array.isArray(n.taskIds) ? n.taskIds : ((s = n.data) == null ? void 0 : s.taskIds) || (((r = n.data) == null ? void 0 : r.taskId) != null ? [n.data.taskId] : []), i = uM(n);
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
function cM(n) {
  return aM(n).map((t) => lM(t, n)).filter(Boolean);
}
function hM(n) {
  const t = oM(n);
  return t ? cM(t) : [];
}
function uM(n) {
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
function fM(n, t) {
  const e = t ? nM(n, "TASK_EVENT", t) : () => {
  }, i = n.client.onMessage((s) => {
    dM(n.client, s), hM(s).forEach((r) => {
      n.router.dispatch(r);
    });
  });
  return () => {
    i(), e();
  };
}
function dM(n, t) {
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
var ip;
window.moment = moment;
const kt = "__flagInMainProcess", ee = "__pendingUpdate", pM = [
  "click",
  "dblclick",
  "mouseover",
  "mouseout",
  "mousemove",
  "mousedown",
  "mouseup",
  "globalout",
  "contextmenu"
], sp = /^[a-zA-Z0-9_]+$/, Y_ = {};
let gM = +/* @__PURE__ */ new Date() - 0;
const V_ = "_instance_", Ol = "__needsUpdateStatus", _M = 1, mM = 2e3, yM = 3e3, vM = 4500, Qc = {}, Yo = {}, W_ = [], U_ = [], rp = [], op = [];
let jr, Fl, Qr, ap, lp, os, cp, hp, Bl, Nl, Jr, to, up, fi, fp, zl;
zrender.registerPainter("canvas", KT);
Sa.registerComponentModel(To);
Sa.registerComponentView(Zl);
Sa.registerComponentModel(Xl);
Qt(Mv);
Qt(rw);
Qt(Jb);
bM("cartesian2d", xh);
Qt(_2);
Qt(W2);
Qt(iT);
Qt(lT);
Qt(uT);
Qt(_T);
TM(vM, AT);
class q_ extends ir {
}
const Z_ = q_.prototype;
Z_.on = K_("on");
Z_.off = K_("off");
function X_(n) {
  return function(...t) {
    if (this.isDisposed()) {
      J_(this.id);
      return;
    }
    return j_(this, n, t);
  };
}
function K_(n) {
  return function(...t) {
    return j_(this, n, t);
  };
}
function j_(n, t, e) {
  return e[0] = e[0] && e[0].toLowerCase(), ir.prototype[t].apply(n, e);
}
const Zh = class Zh extends (ip = ir, ip) {
  constructor(t, e) {
    super(new Sv()), this._componentsViews = [], this._componentsMap = {}, this._chartsViews = [], this._chartsViewsMap = {}, this._pendingActions = [], this._containerInstence = /* @__PURE__ */ new Map(), this._taskWsRuntime = null, this._disposeTaskWsHandlers = null, this._dom = t, e = e || {};
    let i = "canvas", s = "auto", r = !1;
    const o = this._zr = zrender.init(t, {
      renderer: (e == null ? void 0 : e.renderer) || i,
      devicePixelRatio: e.devicePixelRatio,
      width: e.width,
      height: e.height,
      ssr: e.ssr,
      useDirtyRect: oe(e.useDirtyRect, r),
      useCoarsePointer: oe(e.useCoarsePointer, s),
      pointerSize: e.pointerSize
    });
    this._ztween = new QT(() => o.wakeUp()), this._wsManager = new sM(), this._ssr = e.ssr, this._throttledZrFlush = Cp(L(o.flush, o), 17);
    const a = this._api = up(this);
    this._locale = f1(e.locale || tg), this._coordSysMgr = new Us(), this._scheduler = new P_(this, a, W_, U_), this._messageCenter = new q_(), this._initEvents(), this.resize = L(this.resize, this), o.animation.on("frame", this._onframe, this), ap(o, this), lp(o, this);
  }
  _initEvents() {
    return lr(this, null, function* () {
      D(pM, (t) => {
        const e = (i) => {
          let s;
          t === "globalout" && (s = {}), s && (s.event = i, s.type = t);
        };
        this._zr.on(t, e, this);
      }), D(Qc, (t, e) => {
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
    e === this._taskWsRuntime && t === this._taskWsEventHandler || ((i = this._disposeTaskWsHandlers) == null || i.call(this), this._disposeTaskWsHandlers = null, this._taskWsRuntime = e, this._taskWsEventHandler = t, e && (this._disposeTaskWsHandlers = fM(e, t)));
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
    if (this[kt] || this._disposed)
      return;
    let s, r, o;
    if (F(e) && (i = e.lazyUpdate, r = e.silent, s = e.replaceMerge, o = e.transition, e = e.notMerge), this[kt] = !0, !this._model) {
      const c = new bv(), h = this._model = new To();
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
      this[ee] = {
        silent: r,
        updateParams: l
      }, this[kt] = !1, this.getZr().wakeUp();
    else {
      try {
        jr(this), os.update.call(this, null, l);
      } catch (c) {
        throw this[ee] = null, this[kt] = !1, c;
      }
      this._ssr || this._zr.flush(), this[ee] = null, this[kt] = !1, Jr.call(this, r), to.call(this, r);
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
      J_(this.id);
      return;
    }
    if (F(e) || (e = { silent: !!e }), !Yo[t.type] || !this._model)
      return;
    if (this[kt]) {
      this._pendingActions.push(t);
      return;
    }
    const i = e.silent;
    Nl.call(this, t, i), e.flush && this._zr.flush(), Jr.call(this, i), to.call(this, i);
  }
  _onframe() {
    this._ztween.update(), this._ztween.hasActive() && this._zr.wakeUp(), fp(this);
    const t = this._scheduler;
    if (this[ee]) {
      const e = this[ee].silent;
      this[kt] = !0;
      try {
        jr(this), os.update.call(this, null, this[ee].updateParams);
      } catch (i) {
        throw this[kt] = !1, this[ee] = null, i;
      }
      this._zr.flush(), this[kt] = !1, this[ee] = null, Jr.call(this, e), to.call(this, e);
    } else if (t != null && t.unfinished) {
      let e = _M;
      const i = this._model, s = this._api;
      t.unfinished = !1;
      do {
        const r = +/* @__PURE__ */ new Date();
        t.performSeriesTasks(i), t.performDataProcessorTasks(i), zl(this, i), t.performVisualTasks(i), Bl(this, this._model, s, "remain", {}), e -= +/* @__PURE__ */ new Date() - r;
      } while (e > 0 && t.unfinished);
      t.unfinished || this._zr.flush();
    }
  }
};
Zh.internalField = (function() {
  jr = function(t) {
    const e = t._scheduler;
    e.restorePipelines(t._model), e.prepareStageTasks(), Fl(t, !0), Fl(t, !1), e.plan();
  }, Fl = function(t, e) {
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
        const p = ze(h.type), _ = e ? Jt.getClass(
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
  }, Qr = function(t, e, i, s, r) {
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
    c != null && (h = B(), D(Xt(c), (f) => {
      const d = He(f, null);
      d != null && h.set(d, !0);
    })), o && o.eachComponent(
      l,
      function(f) {
        if (!(h && h.get(f.id) != null))
          if (xd(i))
            if (f instanceof vo)
              i.type === co && !i.notBlur && !f.get(["emphasis", "disabled"]) && Db(f, i, t._api);
            else {
              const { focusSelf: p, dispatchers: _ } = Eb(
                f.mainType,
                f.componentIndex,
                i.name,
                t._api
              );
              i.type === co && p && !i.notBlur && Cb(
                f.mainType,
                f.componentIndex,
                t._api
              ), _ && D(_, (g) => {
                i.type === co ? yd(g) : vd(g);
              });
            }
          else Cc(i) && f instanceof vo && (Ib(f, i, t._api), Rb(f), fi(t));
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
  }, zl = function(t, e) {
    const i = t._chartsViewsMap, s = t._scheduler;
    e.eachRawSeries(function(r) {
      s.updateStreamModes(
        r,
        i[r.__viewId]
      );
    });
  }, Nl = function(t, e) {
    const i = this.getModel(), s = t.type, r = t.escapeConnect, o = Yo[s], a = o.actionInfo, l = (a.update || "update").split(":"), c = l.pop(), h = l[0] != null && ze(l[0]);
    this[kt] = !0;
    let u = [t], f = !1;
    t.batch && (f = !0, u = G(
      t.batch,
      function(m) {
        return m = xt(N({}, m), t), m.batch = null, m;
      }
    ));
    const d = [];
    let p;
    const _ = Cc(t), g = xd(t);
    if (g && Mb(this._api), D(u, (m) => {
      if (p = o.action(
        m,
        this._model,
        this._api
      ), p = p || N({}, m), p.type = a.event || p.type, d.push(p), g) {
        const { queryOptionMap: y, mainTypeSpecified: v } = fm(t), S = v ? y.keys()[0] : "series";
        Qr(
          this,
          c,
          m,
          S
        ), fi(this);
      } else _ ? (Qr(this, c, m, "series"), fi(this)) : h && Qr(
        this,
        c,
        m,
        h.main,
        h.sub
      );
    }), c !== "none" && !g && !_ && !h)
      try {
        this[ee] ? (jr(this), os.update.call(this, t), this[ee] = null) : os[c].call(
          this,
          t
        );
      } catch (m) {
        throw this[kt] = !1, m;
      }
    if (f ? p = {
      type: a.event || s,
      escapeConnect: r,
      batch: d
    } : p = d[0], this[kt] = !1, !e) {
      const m = this._messageCenter;
      if (m.trigger(p.type, p), _) {
        const y = {
          type: "selectchanged",
          escapeConnect: r,
          selected: Ab(i),
          isFromClick: t.isFromClick || !1,
          fromAction: t.type,
          fromActionPayload: t
        };
        m.trigger(y.type, y);
      }
    }
  }, Jr = function(t) {
    const e = this._pendingActions;
    for (; e.length; ) {
      const i = e.shift();
      Nl.call(this, i, t);
    }
  }, to = function(t) {
    !t && this.trigger("updated");
  }, fp = function(t) {
    if (!t[Ol])
      return;
    t.getZr().storage.traverse(function(i) {
      Ux(i) || e(i);
    }), t[Ol] = !1;
    function e(i) {
      const s = [], r = i.currentStates;
      for (let o = 0; o < r.length; o++) {
        const a = r[o];
        a === "emphasis" || a === "blur" || a === "select" || s.push(a);
      }
      i.hoverState === kh && i.states.emphasis ? s.push("emphasis") : i.hoverState === Ah && i.states.blur && s.push("blur"), i.useStates(s);
    }
  }, ap = function(t, e) {
    t.on("rendered", function(i) {
      e.trigger("rendered", i), // Although zr is dirty if initial animation is not finished
      // and this checking is called on frame, we also check
      // animation finished for robustness.
      t.animation.isFinished() && !e[ee] && e.trigger("finished");
    });
  }, lp = function(t, e) {
  }, os = {
    //TODO
    update(t, e) {
      const i = this._model;
      this._zr;
      const s = this._api, r = this._scheduler, o = this._coordSysMgr;
      i && (i.setUpdatePayload(t), r.restoreData(i, t), r.performSeriesTasks(i), o.create(i, s), r.performDataProcessorTasks(i, t), zl(this, i), o.update(i, s), r.performVisualTasks(i, t), cp(this, i, s, t, e));
    }
  }, cp = (t, e, i, s, r) => {
    hp(t, e, i, s), D(t._chartsViews, function(o) {
      o.__alive = !1;
    }), Bl(t, e, i, s, r), D(t._chartsViews, function(o) {
      o.__alive || o.remove(e, i);
    }), D(t._componentsViews, function(o) {
      o.type === "split.slider" && o.render(o.__model, e, i, s);
    });
  }, hp = (t, e, i, s, r) => {
    D(
      r || t._componentsViews,
      function(o) {
        const a = o.__model;
        o.render(a, e, i, s);
      }
    );
  }, Bl = (t, e, i, s, r, o) => {
    const a = t._scheduler;
    let l = !1;
    e.eachSeries(function(c) {
      const h = t._chartsViewsMap[c.__viewId];
      h.__alive = !0;
      const u = h.renderTask;
      a.updatePayload(u, s), o && o.get(c.uid) && u.dirty(), u.perform(a.getPerformArgs(u)) && (l = !0);
    }), a.unfinished = l || a.unfinished;
  }, fi = function(t) {
    t[Ol] = !0, t.getZr().wakeUp();
  }, up = function(t) {
    return new class extends yT {
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
        yd(e, i), fi(t);
      }
      leaveEmphasis(e, i) {
        vd(e, i), fi(t);
      }
    }(t);
  };
})();
let Vo = Zh;
const Q_ = Vo.prototype;
Q_.on = X_("on");
Q_.off = X_("off");
function J_(n) {
  yp("Instance " + n + " has been disposed");
}
function PM(n, t) {
  if (!n)
    throw new Error("Initialize failed: invalid dom.");
  const e = xM(n);
  if (e)
    return yp("There is a instance already initialized on the dom."), e;
  const i = new Vo(n);
  return i.id = "pi_" + gM++, Y_[i.id] = i, Q0(n, V_, i.id), i;
}
function xM(n) {
  return Y_[J0(n, V_)];
}
function wM(n) {
  ot(op, n) < 0 && op.push(n);
}
function SM(n, t) {
  t0(
    W_,
    n,
    t,
    mM
  );
}
function bM(n, t) {
  Us.register(n, t);
}
function TM(n, t) {
  t0(
    U_,
    n,
    t,
    yM,
    "visual"
  );
}
function t0(n, t, e, i, s) {
  if ((Q(t) || F(t)) && (e = t, t = i), ot(rp, e) >= 0)
    return;
  rp.push(e);
  const r = P_.wrapStageHandler(e, s);
  r.__prio = t, r.__raw = e, n.push(r);
}
function MM(n, t, e) {
  Q(t) && (e = t, t = "");
  const i = F(n) ? n.type : [
    n,
    n = {
      event: t
    }
  ][0];
  n.event = (n.event || i).toLowerCase(), t = n.event, !Qc[t] && (ua(sp.test(i) && sp.test(t)), Yo[i] || (Yo[i] = {
    action: e,
    actionInfo: n
  }), Qc[t] = i);
}
export {
  Vo as default,
  xM as getInstanceByDom,
  PM as init,
  MM as registerAction,
  bM as registerCoordinateSystem,
  wM as registerPreprocessor,
  SM as registerProcessor
};
