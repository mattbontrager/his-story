/*! modernizr 3.3.1 (Custom Build) | MIT *
 * https://modernizr.com/download/?-cssvhunit-objectfit-svg-svgasimg-touchevents-setclasses !*/
!function(e, t, n) {
    function s(e, t) {
        return typeof e === t
    }
    function r() {
        var e, t, n, r, i, a, o;
        for (var l in v)
            if (v.hasOwnProperty(l)) {
                if (e = [],
                t = v[l],
                t.name && (e.push(t.name.toLowerCase()),
                t.options && t.options.aliases && t.options.aliases.length))
                    for (n = 0; n < t.options.aliases.length; n++)
                        e.push(t.options.aliases[n].toLowerCase());
                for (r = s(t.fn, "function") ? t.fn() : t.fn,
                i = 0; i < e.length; i++)
                    a = e[i],
                    o = a.split("."),
                    1 === o.length ? S[o[0]] = r : (!S[o[0]] || S[o[0]]instanceof Boolean || (S[o[0]] = new Boolean(S[o[0]])),
                    S[o[0]][o[1]] = r),
                    g.push((r ? "" : "no-") + o.join("-"))
            }
    }
    function i(e) {
        var t = M.className
          , n = S._config.classPrefix || "";
        if (D && (t = t.baseVal),
        S._config.enableJSClass) {
            var s = new RegExp("(^|\\s)" + n + "no-js(\\s|$)");
            t = t.replace(s, "$1" + n + "js$2")
        }
        S._config.enableClasses && (t += " " + n + e.join(" " + n),
        D ? M.className.baseVal = t : M.className = t)
    }
    function a(e) {
        return e.replace(/([a-z])-([a-z])/g, function(e, t, n) {
            return t + n.toUpperCase()
        }).replace(/^-/, "")
    }
    function o(e, t) {
        if ("object" == typeof e)
            for (var n in e)
                k(e, n) && o(n, e[n]);
        else {
            e = e.toLowerCase();
            var s = e.split(".")
              , r = S[s[0]];
            if (2 == s.length && (r = r[s[1]]),
            "undefined" != typeof r)
                return S;
            t = "function" == typeof t ? t() : t,
            1 == s.length ? S[s[0]] = t : (!S[s[0]] || S[s[0]]instanceof Boolean || (S[s[0]] = new Boolean(S[s[0]])),
            S[s[0]][s[1]] = t),
            i([(t && 0 != t ? "" : "no-") + s.join("-")]),
            S._trigger(e, t)
        }
        return S
    }
    function l() {
        return "function" != typeof t.createElement ? t.createElement(arguments[0]) : D ? t.createElementNS.call(t, "http://www.w3.org/2000/svg", arguments[0]) : t.createElement.apply(t, arguments)
    }
    function u() {
        var e = t.body;
        return e || (e = l(D ? "svg" : "body"),
        e.fake = !0),
        e
    }
    function c(e, n, s, r) {
        var i, a, o, c, d = "modernizr", h = l("div"), f = u();
        if (parseInt(s, 10))
            for (; s--; )
                o = l("div"),
                o.id = r ? r[s] : d + (s + 1),
                h.appendChild(o);
        return i = l("style"),
        i.type = "text/css",
        i.id = "s" + d,
        (f.fake ? f : h).appendChild(i),
        f.appendChild(h),
        i.styleSheet ? i.styleSheet.cssText = e : i.appendChild(t.createTextNode(e)),
        h.id = d,
        f.fake && (f.style.background = "",
        f.style.overflow = "hidden",
        c = M.style.overflow,
        M.style.overflow = "hidden",
        M.appendChild(f)),
        a = n(h, e),
        f.fake ? (f.parentNode.removeChild(f),
        M.style.overflow = c,
        M.offsetHeight) : h.parentNode.removeChild(h),
        !!a
    }
    function d(e, t) {
        return !!~("" + e).indexOf(t)
    }
    function h(e, t) {
        return function() {
            return e.apply(t, arguments)
        }
    }
    function f(e, t, n) {
        var r;
        for (var i in e)
            if (e[i]in t)
                return n === !1 ? e[i] : (r = t[e[i]],
                s(r, "function") ? h(r, n || t) : r);
        return !1
    }
    function m(e) {
        return e.replace(/([A-Z])/g, function(e, t) {
            return "-" + t.toLowerCase()
        }).replace(/^ms-/, "-ms-")
    }
    function p(t, s) {
        var r = t.length;
        if ("CSS"in e && "supports"in e.CSS) {
            for (; r--; )
                if (e.CSS.supports(m(t[r]), s))
                    return !0;
            return !1
        }
        if ("CSSSupportsRule"in e) {
            for (var i = []; r--; )
                i.push("(" + m(t[r]) + ":" + s + ")");
            return i = i.join(" or "),
            c("@supports (" + i + ") { #modernizr { position: absolute; } }", function(e) {
                return "absolute" == getComputedStyle(e, null ).position
            })
        }
        return n
    }
    function _(e, t, r, i) {
        function o() {
            c && (delete P.style,
            delete P.modElem)
        }
        if (i = s(i, "undefined") ? !1 : i,
        !s(r, "undefined")) {
            var u = p(e, r);
            if (!s(u, "undefined"))
                return u
        }
        for (var c, h, f, m, _, y = ["modernizr", "tspan", "samp"]; !P.style && y.length; )
            c = !0,
            P.modElem = l(y.shift()),
            P.style = P.modElem.style;
        for (f = e.length,
        h = 0; f > h; h++)
            if (m = e[h],
            _ = P.style[m],
            d(m, "-") && (m = a(m)),
            P.style[m] !== n) {
                if (i || s(r, "undefined"))
                    return o(),
                    "pfx" == t ? m : !0;
                try {
                    P.style[m] = r
                } catch (g) {}
                if (P.style[m] != _)
                    return o(),
                    "pfx" == t ? m : !0
            }
        return o(),
        !1
    }
    function y(e, t, n, r, i) {
        var a = e.charAt(0).toUpperCase() + e.slice(1)
          , o = (e + " " + Y.join(a + " ") + a).split(" ");
        return s(t, "string") || s(t, "undefined") ? _(o, t, r, i) : (o = (e + " " + O.join(a + " ") + a).split(" "),
        f(o, t, n))
    }
    var g = []
      , v = []
      , w = {
        _version: "3.3.1",
        _config: {
            classPrefix: "",
            enableClasses: !0,
            enableJSClass: !0,
            usePrefixes: !0
        },
        _q: [],
        on: function(e, t) {
            var n = this;
            setTimeout(function() {
                t(n[e])
            }, 0)
        },
        addTest: function(e, t, n) {
            v.push({
                name: e,
                fn: t,
                options: n
            })
        },
        addAsyncTest: function(e) {
            v.push({
                name: null ,
                fn: e
            })
        }
    }
      , S = function() {};
    S.prototype = w,
    S = new S,
    S.addTest("svg", !!t.createElementNS && !!t.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect);
    var k, M = t.documentElement, D = "svg" === M.nodeName.toLowerCase();
    !function() {
        var e = {}.hasOwnProperty;
        k = s(e, "undefined") || s(e.call, "undefined") ? function(e, t) {
            return t in e && s(e.constructor.prototype[t], "undefined")
        }
        : function(t, n) {
            return e.call(t, n)
        }
    }(),
    w._l = {},
    w.on = function(e, t) {
        this._l[e] || (this._l[e] = []),
        this._l[e].push(t),
        S.hasOwnProperty(e) && setTimeout(function() {
            S._trigger(e, S[e])
        }, 0)
    }
    ,
    w._trigger = function(e, t) {
        if (this._l[e]) {
            var n = this._l[e];
            setTimeout(function() {
                var e, s;
                for (e = 0; e < n.length; e++)
                    (s = n[e])(t)
            }, 0),
            delete this._l[e]
        }
    }
    ,
    S._q.push(function() {
        w.addTest = o
    }),
    S.addTest("svgasimg", t.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1"));
    var x = w.testStyles = c;
    x("#modernizr { height: 50vh; }", function(t) {
        var n = parseInt(e.innerHeight / 2, 10)
          , s = parseInt((e.getComputedStyle ? getComputedStyle(t, null ) : t.currentStyle).height, 10);
        S.addTest("cssvhunit", s == n)
    });
    var b = "Moz O ms Webkit"
      , Y = w._config.usePrefixes ? b.split(" ") : [];
    w._cssomPrefixes = Y;
    var T = function(t) {
        var s, r = L.length, i = e.CSSRule;
        if ("undefined" == typeof i)
            return n;
        if (!t)
            return !1;
        if (t = t.replace(/^@/, ""),
        s = t.replace(/-/g, "_").toUpperCase() + "_RULE",
        s in i)
            return "@" + t;
        for (var a = 0; r > a; a++) {
            var o = L[a]
              , l = o.toUpperCase() + "_" + s;
            if (l in i)
                return "@-" + o.toLowerCase() + "-" + t
        }
        return !1
    };
    w.atRule = T;
    var O = w._config.usePrefixes ? b.toLowerCase().split(" ") : [];
    w._domPrefixes = O;
    var C = {
        elem: l("modernizr")
    };
    S._q.push(function() {
        delete C.elem
    });
    var P = {
        style: C.elem.style
    };
    S._q.unshift(function() {
        delete P.style
    }),
    w.testAllProps = y;
    var R = w.prefixed = function(e, t, n) {
        return 0 === e.indexOf("@") ? T(e) : (-1 != e.indexOf("-") && (e = a(e)),
        t ? y(e, t, n) : y(e, "pfx"))
    }
    ;
    S.addTest("objectfit", !!R("objectFit"), {
        aliases: ["object-fit"]
    });
    var L = w._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""];
    w._prefixes = L,
    S.addTest("touchevents", function() {
        var n;
        if ("ontouchstart"in e || e.DocumentTouch && t instanceof DocumentTouch)
            n = !0;
        else {
            var s = ["@media (", L.join("touch-enabled),("), "heartz", ")", "{#modernizr{top:9px;position:absolute}}"].join("");
            x(s, function(e) {
                n = 9 === e.offsetTop
            })
        }
        return n
    }),
    r(),
    i(g),
    delete w.addTest,
    delete w.addAsyncTest;
    for (var H = 0; H < S._q.length; H++)
        S._q[H]();
    e.Modernizr = S
}(window, document),
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.moment = t()
}(this, function() {
    "use strict";
    function e() {
        return fs.apply(null , arguments)
    }
    function t(e) {
        fs = e
    }
    function n(e) {
        return e instanceof Array || "[object Array]" === Object.prototype.toString.call(e)
    }
    function s(e) {
        return null != e && "[object Object]" === Object.prototype.toString.call(e)
    }
    function r(e) {
        var t;
        for (t in e)
            return !1;
        return !0
    }
    function i(e) {
        return e instanceof Date || "[object Date]" === Object.prototype.toString.call(e)
    }
    function a(e, t) {
        var n, s = [];
        for (n = 0; n < e.length; ++n)
            s.push(t(e[n], n));
        return s
    }
    function o(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    function l(e, t) {
        for (var n in t)
            o(t, n) && (e[n] = t[n]);
        return o(t, "toString") && (e.toString = t.toString),
        o(t, "valueOf") && (e.valueOf = t.valueOf),
        e
    }
    function u(e, t, n, s) {
        return _t(e, t, n, s, !0).utc()
    }
    function c() {
        return {
            empty: !1,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: !1,
            invalidMonth: null ,
            invalidFormat: !1,
            userInvalidated: !1,
            iso: !1,
            parsedDateParts: [],
            meridiem: null
        }
    }
    function d(e) {
        return null == e._pf && (e._pf = c()),
        e._pf
    }
    function h(e) {
        if (null == e._isValid) {
            var t = d(e)
              , n = ms.call(t.parsedDateParts, function(e) {
                return null != e
            })
              , s = !isNaN(e._d.getTime()) && t.overflow < 0 && !t.empty && !t.invalidMonth && !t.invalidWeekday && !t.nullInput && !t.invalidFormat && !t.userInvalidated && (!t.meridiem || t.meridiem && n);
            if (e._strict && (s = s && 0 === t.charsLeftOver && 0 === t.unusedTokens.length && void 0 === t.bigHour),
            null != Object.isFrozen && Object.isFrozen(e))
                return s;
            e._isValid = s
        }
        return e._isValid
    }
    function f(e) {
        var t = u(NaN);
        return null != e ? l(d(t), e) : d(t).userInvalidated = !0,
        t
    }
    function m(e) {
        return void 0 === e
    }
    function p(e, t) {
        var n, s, r;
        if (m(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject),
        m(t._i) || (e._i = t._i),
        m(t._f) || (e._f = t._f),
        m(t._l) || (e._l = t._l),
        m(t._strict) || (e._strict = t._strict),
        m(t._tzm) || (e._tzm = t._tzm),
        m(t._isUTC) || (e._isUTC = t._isUTC),
        m(t._offset) || (e._offset = t._offset),
        m(t._pf) || (e._pf = d(t)),
        m(t._locale) || (e._locale = t._locale),
        ps.length > 0)
            for (n in ps)
                s = ps[n],
                r = t[s],
                m(r) || (e[s] = r);
        return e
    }
    function _(t) {
        p(this, t),
        this._d = new Date(null != t._d ? t._d.getTime() : NaN),
        _s === !1 && (_s = !0,
        e.updateOffset(this),
        _s = !1)
    }
    function y(e) {
        return e instanceof _ || null != e && null != e._isAMomentObject
    }
    function g(e) {
        return 0 > e ? Math.ceil(e) || 0 : Math.floor(e)
    }
    function v(e) {
        var t = +e
          , n = 0;
        return 0 !== t && isFinite(t) && (n = g(t)),
        n
    }
    function w(e, t, n) {
        var s, r = Math.min(e.length, t.length), i = Math.abs(e.length - t.length), a = 0;
        for (s = 0; r > s; s++)
            (n && e[s] !== t[s] || !n && v(e[s]) !== v(t[s])) && a++;
        return a + i
    }
    function S(t) {
        e.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + t)
    }
    function k(t, n) {
        var s = !0;
        return l(function() {
            if (null != e.deprecationHandler && e.deprecationHandler(null , t),
            s) {
                for (var r, i = [], a = 0; a < arguments.length; a++) {
                    if (r = "",
                    "object" == typeof arguments[a]) {
                        r += "\n[" + a + "] ";
                        for (var o in arguments[0])
                            r += o + ": " + arguments[0][o] + ", ";
                        r = r.slice(0, -2)
                    } else
                        r = arguments[a];
                    i.push(r)
                }
                S(t + "\nArguments: " + Array.prototype.slice.call(i).join("") + "\n" + (new Error).stack),
                s = !1
            }
            return n.apply(this, arguments)
        }, n)
    }
    function M(t, n) {
        null != e.deprecationHandler && e.deprecationHandler(t, n),
        ys[t] || (S(n),
        ys[t] = !0)
    }
    function D(e) {
        return e instanceof Function || "[object Function]" === Object.prototype.toString.call(e)
    }
    function x(e) {
        var t, n;
        for (n in e)
            t = e[n],
            D(t) ? this[n] = t : this["_" + n] = t;
        this._config = e,
        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source)
    }
    function b(e, t) {
        var n, r = l({}, e);
        for (n in t)
            o(t, n) && (s(e[n]) && s(t[n]) ? (r[n] = {},
            l(r[n], e[n]),
            l(r[n], t[n])) : null != t[n] ? r[n] = t[n] : delete r[n]);
        for (n in e)
            o(e, n) && !o(t, n) && s(e[n]) && (r[n] = l({}, r[n]));
        return r
    }
    function Y(e) {
        null != e && this.set(e)
    }
    function T(e, t, n) {
        var s = this._calendar[e] || this._calendar.sameElse;
        return D(s) ? s.call(t, n) : s
    }
    function O(e) {
        var t = this._longDateFormat[e]
          , n = this._longDateFormat[e.toUpperCase()];
        return t || !n ? t : (this._longDateFormat[e] = n.replace(/MMMM|MM|DD|dddd/g, function(e) {
            return e.slice(1)
        }),
        this._longDateFormat[e])
    }
    function C() {
        return this._invalidDate
    }
    function P(e) {
        return this._ordinal.replace("%d", e)
    }
    function R(e, t, n, s) {
        var r = this._relativeTime[n];
        return D(r) ? r(e, t, n, s) : r.replace(/%d/i, e)
    }
    function L(e, t) {
        var n = this._relativeTime[e > 0 ? "future" : "past"];
        return D(n) ? n(t) : n.replace(/%s/i, t)
    }
    function H(e, t) {
        var n = e.toLowerCase();
        bs[n] = bs[n + "s"] = bs[t] = e
    }
    function W(e) {
        return "string" == typeof e ? bs[e] || bs[e.toLowerCase()] : void 0
    }
    function q(e) {
        var t, n, s = {};
        for (n in e)
            o(e, n) && (t = W(n),
            t && (s[t] = e[n]));
        return s
    }
    function j(e, t) {
        Ys[e] = t
    }
    function A(e) {
        var t = [];
        for (var n in e)
            t.push({
                unit: n,
                priority: Ys[n]
            });
        return t.sort(function(e, t) {
            return e.priority - t.priority
        }),
        t
    }
    function U(t, n) {
        return function(s) {
            return null != s ? (F(this, t, s),
            e.updateOffset(this, n),
            this) : E(this, t)
        }
    }
    function E(e, t) {
        return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + t]() : NaN
    }
    function F(e, t, n) {
        e.isValid() && e._d["set" + (e._isUTC ? "UTC" : "") + t](n)
    }
    function G(e) {
        return e = W(e),
        D(this[e]) ? this[e]() : this
    }
    function N(e, t) {
        if ("object" == typeof e) {
            e = q(e);
            for (var n = A(e), s = 0; s < n.length; s++)
                this[n[s].unit](e[n[s].unit])
        } else if (e = W(e),
        D(this[e]))
            return this[e](t);
        return this
    }
    function z(e, t, n) {
        var s = "" + Math.abs(e)
          , r = t - s.length
          , i = e >= 0;
        return (i ? n ? "+" : "" : "-") + Math.pow(10, Math.max(0, r)).toString().substr(1) + s
    }
    function V(e, t, n, s) {
        var r = s;
        "string" == typeof s && (r = function() {
            return this[s]()
        }
        ),
        e && (Ps[e] = r),
        t && (Ps[t[0]] = function() {
            return z(r.apply(this, arguments), t[1], t[2])
        }
        ),
        n && (Ps[n] = function() {
            return this.localeData().ordinal(r.apply(this, arguments), e)
        }
        )
    }
    function I(e) {
        return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "")
    }
    function Z(e) {
        var t, n, s = e.match(Ts);
        for (t = 0,
        n = s.length; n > t; t++)
            Ps[s[t]] ? s[t] = Ps[s[t]] : s[t] = I(s[t]);
        return function(t) {
            var r, i = "";
            for (r = 0; n > r; r++)
                i += s[r]instanceof Function ? s[r].call(t, e) : s[r];
            return i
        }
    }
    function X(e, t) {
        return e.isValid() ? (t = $(t, e.localeData()),
        Cs[t] = Cs[t] || Z(t),
        Cs[t](e)) : e.localeData().invalidDate()
    }
    function $(e, t) {
        function n(e) {
            return t.longDateFormat(e) || e
        }
        var s = 5;
        for (Os.lastIndex = 0; s >= 0 && Os.test(e); )
            e = e.replace(Os, n),
            Os.lastIndex = 0,
            s -= 1;
        return e
    }
    function B(e, t, n) {
        $s[e] = D(t) ? t : function(e, s) {
            return e && n ? n : t
        }
    }
    function J(e, t) {
        return o($s, e) ? $s[e](t._strict, t._locale) : new RegExp(Q(e))
    }
    function Q(e) {
        return K(e.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(e, t, n, s, r) {
            return t || n || s || r
        }))
    }
    function K(e) {
        return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
    }
    function ee(e, t) {
        var n, s = t;
        for ("string" == typeof e && (e = [e]),
        "number" == typeof t && (s = function(e, n) {
            n[t] = v(e)
        }
        ),
        n = 0; n < e.length; n++)
            Bs[e[n]] = s
    }
    function te(e, t) {
        ee(e, function(e, n, s, r) {
            s._w = s._w || {},
            t(e, s._w, s, r)
        })
    }
    function ne(e, t, n) {
        null != t && o(Bs, e) && Bs[e](t, n._a, n, e)
    }
    function se(e, t) {
        return new Date(Date.UTC(e, t + 1, 0)).getUTCDate()
    }
    function re(e, t) {
        return e ? n(this._months) ? this._months[e.month()] : this._months[(this._months.isFormat || ar).test(t) ? "format" : "standalone"][e.month()] : this._months
    }
    function ie(e, t) {
        return e ? n(this._monthsShort) ? this._monthsShort[e.month()] : this._monthsShort[ar.test(t) ? "format" : "standalone"][e.month()] : this._monthsShort
    }
    function ae(e, t, n) {
        var s, r, i, a = e.toLocaleLowerCase();
        if (!this._monthsParse)
            for (this._monthsParse = [],
            this._longMonthsParse = [],
            this._shortMonthsParse = [],
            s = 0; 12 > s; ++s)
                i = u([2e3, s]),
                this._shortMonthsParse[s] = this.monthsShort(i, "").toLocaleLowerCase(),
                this._longMonthsParse[s] = this.months(i, "").toLocaleLowerCase();
        return n ? "MMM" === t ? (r = vs.call(this._shortMonthsParse, a),
        -1 !== r ? r : null ) : (r = vs.call(this._longMonthsParse, a),
        -1 !== r ? r : null ) : "MMM" === t ? (r = vs.call(this._shortMonthsParse, a),
        -1 !== r ? r : (r = vs.call(this._longMonthsParse, a),
        -1 !== r ? r : null )) : (r = vs.call(this._longMonthsParse, a),
        -1 !== r ? r : (r = vs.call(this._shortMonthsParse, a),
        -1 !== r ? r : null ))
    }
    function oe(e, t, n) {
        var s, r, i;
        if (this._monthsParseExact)
            return ae.call(this, e, t, n);
        for (this._monthsParse || (this._monthsParse = [],
        this._longMonthsParse = [],
        this._shortMonthsParse = []),
        s = 0; 12 > s; s++) {
            if (r = u([2e3, s]),
            n && !this._longMonthsParse[s] && (this._longMonthsParse[s] = new RegExp("^" + this.months(r, "").replace(".", "") + "$","i"),
            this._shortMonthsParse[s] = new RegExp("^" + this.monthsShort(r, "").replace(".", "") + "$","i")),
            n || this._monthsParse[s] || (i = "^" + this.months(r, "") + "|^" + this.monthsShort(r, ""),
            this._monthsParse[s] = new RegExp(i.replace(".", ""),"i")),
            n && "MMMM" === t && this._longMonthsParse[s].test(e))
                return s;
            if (n && "MMM" === t && this._shortMonthsParse[s].test(e))
                return s;
            if (!n && this._monthsParse[s].test(e))
                return s
        }
    }
    function le(e, t) {
        var n;
        if (!e.isValid())
            return e;
        if ("string" == typeof t)
            if (/^\d+$/.test(t))
                t = v(t);
            else if (t = e.localeData().monthsParse(t),
            "number" != typeof t)
                return e;
        return n = Math.min(e.date(), se(e.year(), t)),
        e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, n),
        e
    }
    function ue(t) {
        return null != t ? (le(this, t),
        e.updateOffset(this, !0),
        this) : E(this, "Month")
    }
    function ce() {
        return se(this.year(), this.month())
    }
    function de(e) {
        return this._monthsParseExact ? (o(this, "_monthsRegex") || fe.call(this),
        e ? this._monthsShortStrictRegex : this._monthsShortRegex) : (o(this, "_monthsShortRegex") || (this._monthsShortRegex = ur),
        this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex)
    }
    function he(e) {
        return this._monthsParseExact ? (o(this, "_monthsRegex") || fe.call(this),
        e ? this._monthsStrictRegex : this._monthsRegex) : (o(this, "_monthsRegex") || (this._monthsRegex = cr),
        this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex)
    }
    function fe() {
        function e(e, t) {
            return t.length - e.length
        }
        var t, n, s = [], r = [], i = [];
        for (t = 0; 12 > t; t++)
            n = u([2e3, t]),
            s.push(this.monthsShort(n, "")),
            r.push(this.months(n, "")),
            i.push(this.months(n, "")),
            i.push(this.monthsShort(n, ""));
        for (s.sort(e),
        r.sort(e),
        i.sort(e),
        t = 0; 12 > t; t++)
            s[t] = K(s[t]),
            r[t] = K(r[t]);
        for (t = 0; 24 > t; t++)
            i[t] = K(i[t]);
        this._monthsRegex = new RegExp("^(" + i.join("|") + ")","i"),
        this._monthsShortRegex = this._monthsRegex,
        this._monthsStrictRegex = new RegExp("^(" + r.join("|") + ")","i"),
        this._monthsShortStrictRegex = new RegExp("^(" + s.join("|") + ")","i")
    }
    function me(e) {
        return pe(e) ? 366 : 365
    }
    function pe(e) {
        return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0
    }
    function _e() {
        return pe(this.year())
    }
    function ye(e, t, n, s, r, i, a) {
        var o = new Date(e,t,n,s,r,i,a);
        return 100 > e && e >= 0 && isFinite(o.getFullYear()) && o.setFullYear(e),
        o
    }
    function ge(e) {
        var t = new Date(Date.UTC.apply(null , arguments));
        return 100 > e && e >= 0 && isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e),
        t
    }
    function ve(e, t, n) {
        var s = 7 + t - n
          , r = (7 + ge(e, 0, s).getUTCDay() - t) % 7;
        return -r + s - 1
    }
    function we(e, t, n, s, r) {
        var i, a, o = (7 + n - s) % 7, l = ve(e, s, r), u = 1 + 7 * (t - 1) + o + l;
        return 0 >= u ? (i = e - 1,
        a = me(i) + u) : u > me(e) ? (i = e + 1,
        a = u - me(e)) : (i = e,
        a = u),
        {
            year: i,
            dayOfYear: a
        }
    }
    function Se(e, t, n) {
        var s, r, i = ve(e.year(), t, n), a = Math.floor((e.dayOfYear() - i - 1) / 7) + 1;
        return 1 > a ? (r = e.year() - 1,
        s = a + ke(r, t, n)) : a > ke(e.year(), t, n) ? (s = a - ke(e.year(), t, n),
        r = e.year() + 1) : (r = e.year(),
        s = a),
        {
            week: s,
            year: r
        }
    }
    function ke(e, t, n) {
        var s = ve(e, t, n)
          , r = ve(e + 1, t, n);
        return (me(e) - s + r) / 7
    }
    function Me(e) {
        return Se(e, this._week.dow, this._week.doy).week
    }
    function De() {
        return this._week.dow
    }
    function xe() {
        return this._week.doy
    }
    function be(e) {
        var t = this.localeData().week(this);
        return null == e ? t : this.add(7 * (e - t), "d")
    }
    function Ye(e) {
        var t = Se(this, 1, 4).week;
        return null == e ? t : this.add(7 * (e - t), "d")
    }
    function Te(e, t) {
        return "string" != typeof e ? e : isNaN(e) ? (e = t.weekdaysParse(e),
        "number" == typeof e ? e : null ) : parseInt(e, 10)
    }
    function Oe(e, t) {
        return "string" == typeof e ? t.weekdaysParse(e) % 7 || 7 : isNaN(e) ? null : e
    }
    function Ce(e, t) {
        return e ? n(this._weekdays) ? this._weekdays[e.day()] : this._weekdays[this._weekdays.isFormat.test(t) ? "format" : "standalone"][e.day()] : this._weekdays
    }
    function Pe(e) {
        return e ? this._weekdaysShort[e.day()] : this._weekdaysShort
    }
    function Re(e) {
        return e ? this._weekdaysMin[e.day()] : this._weekdaysMin
    }
    function Le(e, t, n) {
        var s, r, i, a = e.toLocaleLowerCase();
        if (!this._weekdaysParse)
            for (this._weekdaysParse = [],
            this._shortWeekdaysParse = [],
            this._minWeekdaysParse = [],
            s = 0; 7 > s; ++s)
                i = u([2e3, 1]).day(s),
                this._minWeekdaysParse[s] = this.weekdaysMin(i, "").toLocaleLowerCase(),
                this._shortWeekdaysParse[s] = this.weekdaysShort(i, "").toLocaleLowerCase(),
                this._weekdaysParse[s] = this.weekdays(i, "").toLocaleLowerCase();
        return n ? "dddd" === t ? (r = vs.call(this._weekdaysParse, a),
        -1 !== r ? r : null ) : "ddd" === t ? (r = vs.call(this._shortWeekdaysParse, a),
        -1 !== r ? r : null ) : (r = vs.call(this._minWeekdaysParse, a),
        -1 !== r ? r : null ) : "dddd" === t ? (r = vs.call(this._weekdaysParse, a),
        -1 !== r ? r : (r = vs.call(this._shortWeekdaysParse, a),
        -1 !== r ? r : (r = vs.call(this._minWeekdaysParse, a),
        -1 !== r ? r : null ))) : "ddd" === t ? (r = vs.call(this._shortWeekdaysParse, a),
        -1 !== r ? r : (r = vs.call(this._weekdaysParse, a),
        -1 !== r ? r : (r = vs.call(this._minWeekdaysParse, a),
        -1 !== r ? r : null ))) : (r = vs.call(this._minWeekdaysParse, a),
        -1 !== r ? r : (r = vs.call(this._weekdaysParse, a),
        -1 !== r ? r : (r = vs.call(this._shortWeekdaysParse, a),
        -1 !== r ? r : null )))
    }
    function He(e, t, n) {
        var s, r, i;
        if (this._weekdaysParseExact)
            return Le.call(this, e, t, n);
        for (this._weekdaysParse || (this._weekdaysParse = [],
        this._minWeekdaysParse = [],
        this._shortWeekdaysParse = [],
        this._fullWeekdaysParse = []),
        s = 0; 7 > s; s++) {
            if (r = u([2e3, 1]).day(s),
            n && !this._fullWeekdaysParse[s] && (this._fullWeekdaysParse[s] = new RegExp("^" + this.weekdays(r, "").replace(".", ".?") + "$","i"),
            this._shortWeekdaysParse[s] = new RegExp("^" + this.weekdaysShort(r, "").replace(".", ".?") + "$","i"),
            this._minWeekdaysParse[s] = new RegExp("^" + this.weekdaysMin(r, "").replace(".", ".?") + "$","i")),
            this._weekdaysParse[s] || (i = "^" + this.weekdays(r, "") + "|^" + this.weekdaysShort(r, "") + "|^" + this.weekdaysMin(r, ""),
            this._weekdaysParse[s] = new RegExp(i.replace(".", ""),"i")),
            n && "dddd" === t && this._fullWeekdaysParse[s].test(e))
                return s;
            if (n && "ddd" === t && this._shortWeekdaysParse[s].test(e))
                return s;
            if (n && "dd" === t && this._minWeekdaysParse[s].test(e))
                return s;
            if (!n && this._weekdaysParse[s].test(e))
                return s
        }
    }
    function We(e) {
        if (!this.isValid())
            return null != e ? this : NaN;
        var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        return null != e ? (e = Te(e, this.localeData()),
        this.add(e - t, "d")) : t
    }
    function qe(e) {
        if (!this.isValid())
            return null != e ? this : NaN;
        var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return null == e ? t : this.add(e - t, "d")
    }
    function je(e) {
        if (!this.isValid())
            return null != e ? this : NaN;
        if (null != e) {
            var t = Oe(e, this.localeData());
            return this.day(this.day() % 7 ? t : t - 7)
        }
        return this.day() || 7
    }
    function Ae(e) {
        return this._weekdaysParseExact ? (o(this, "_weekdaysRegex") || Fe.call(this),
        e ? this._weekdaysStrictRegex : this._weekdaysRegex) : (o(this, "_weekdaysRegex") || (this._weekdaysRegex = _r),
        this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex)
    }
    function Ue(e) {
        return this._weekdaysParseExact ? (o(this, "_weekdaysRegex") || Fe.call(this),
        e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (o(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = yr),
        this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
    }
    function Ee(e) {
        return this._weekdaysParseExact ? (o(this, "_weekdaysRegex") || Fe.call(this),
        e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (o(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = gr),
        this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
    }
    function Fe() {
        function e(e, t) {
            return t.length - e.length
        }
        var t, n, s, r, i, a = [], o = [], l = [], c = [];
        for (t = 0; 7 > t; t++)
            n = u([2e3, 1]).day(t),
            s = this.weekdaysMin(n, ""),
            r = this.weekdaysShort(n, ""),
            i = this.weekdays(n, ""),
            a.push(s),
            o.push(r),
            l.push(i),
            c.push(s),
            c.push(r),
            c.push(i);
        for (a.sort(e),
        o.sort(e),
        l.sort(e),
        c.sort(e),
        t = 0; 7 > t; t++)
            o[t] = K(o[t]),
            l[t] = K(l[t]),
            c[t] = K(c[t]);
        this._weekdaysRegex = new RegExp("^(" + c.join("|") + ")","i"),
        this._weekdaysShortRegex = this._weekdaysRegex,
        this._weekdaysMinRegex = this._weekdaysRegex,
        this._weekdaysStrictRegex = new RegExp("^(" + l.join("|") + ")","i"),
        this._weekdaysShortStrictRegex = new RegExp("^(" + o.join("|") + ")","i"),
        this._weekdaysMinStrictRegex = new RegExp("^(" + a.join("|") + ")","i")
    }
    function Ge() {
        return this.hours() % 12 || 12
    }
    function Ne() {
        return this.hours() || 24
    }
    function ze(e, t) {
        V(e, 0, 0, function() {
            return this.localeData().meridiem(this.hours(), this.minutes(), t)
        })
    }
    function Ve(e, t) {
        return t._meridiemParse
    }
    function Ie(e) {
        return "p" === (e + "").toLowerCase().charAt(0)
    }
    function Ze(e, t, n) {
        return e > 11 ? n ? "pm" : "PM" : n ? "am" : "AM"
    }
    function Xe(e) {
        return e ? e.toLowerCase().replace("_", "-") : e
    }
    function $e(e) {
        for (var t, n, s, r, i = 0; i < e.length; ) {
            for (r = Xe(e[i]).split("-"),
            t = r.length,
            n = Xe(e[i + 1]),
            n = n ? n.split("-") : null ; t > 0; ) {
                if (s = Be(r.slice(0, t).join("-")))
                    return s;
                if (n && n.length >= t && w(r, n, !0) >= t - 1)
                    break;
                t--
            }
            i++
        }
        return null
    }
    function Be(e) {
        var t = null ;
        if (!Mr[e] && "undefined" != typeof module && module && module.exports)
            try {
                t = vr._abbr,
                require("./locale/" + e),
                Je(t)
            } catch (n) {}
        return Mr[e]
    }
    function Je(e, t) {
        var n;
        return e && (n = m(t) ? et(e) : Qe(e, t),
        n && (vr = n)),
        vr._abbr
    }
    function Qe(e, t) {
        if (null !== t) {
            var n = kr;
            return t.abbr = e,
            null != Mr[e] ? (M("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."),
            n = Mr[e]._config) : null != t.parentLocale && (null != Mr[t.parentLocale] ? n = Mr[t.parentLocale]._config : M("parentLocaleUndefined", "specified parentLocale is not defined yet. See http://momentjs.com/guides/#/warnings/parent-locale/")),
            Mr[e] = new Y(b(n, t)),
            Je(e),
            Mr[e]
        }
        return delete Mr[e],
        null
    }
    function Ke(e, t) {
        if (null != t) {
            var n, s = kr;
            null != Mr[e] && (s = Mr[e]._config),
            t = b(s, t),
            n = new Y(t),
            n.parentLocale = Mr[e],
            Mr[e] = n,
            Je(e)
        } else
            null != Mr[e] && (null != Mr[e].parentLocale ? Mr[e] = Mr[e].parentLocale : null != Mr[e] && delete Mr[e]);
        return Mr[e]
    }
    function et(e) {
        var t;
        if (e && e._locale && e._locale._abbr && (e = e._locale._abbr),
        !e)
            return vr;
        if (!n(e)) {
            if (t = Be(e))
                return t;
            e = [e]
        }
        return $e(e)
    }
    function tt() {
        return gs(Mr)
    }
    function nt(e) {
        var t, n = e._a;
        return n && -2 === d(e).overflow && (t = n[Qs] < 0 || n[Qs] > 11 ? Qs : n[Ks] < 1 || n[Ks] > se(n[Js], n[Qs]) ? Ks : n[er] < 0 || n[er] > 24 || 24 === n[er] && (0 !== n[tr] || 0 !== n[nr] || 0 !== n[sr]) ? er : n[tr] < 0 || n[tr] > 59 ? tr : n[nr] < 0 || n[nr] > 59 ? nr : n[sr] < 0 || n[sr] > 999 ? sr : -1,
        d(e)._overflowDayOfYear && (Js > t || t > Ks) && (t = Ks),
        d(e)._overflowWeeks && -1 === t && (t = rr),
        d(e)._overflowWeekday && -1 === t && (t = ir),
        d(e).overflow = t),
        e
    }
    function st(e) {
        var t, n, s, r, i, a, o = e._i, l = Dr.exec(o) || xr.exec(o);
        if (l) {
            for (d(e).iso = !0,
            t = 0,
            n = Yr.length; n > t; t++)
                if (Yr[t][1].exec(l[1])) {
                    r = Yr[t][0],
                    s = Yr[t][2] !== !1;
                    break
                }
            if (null == r)
                return void (e._isValid = !1);
            if (l[3]) {
                for (t = 0,
                n = Tr.length; n > t; t++)
                    if (Tr[t][1].exec(l[3])) {
                        i = (l[2] || " ") + Tr[t][0];
                        break
                    }
                if (null == i)
                    return void (e._isValid = !1)
            }
            if (!s && null != i)
                return void (e._isValid = !1);
            if (l[4]) {
                if (!br.exec(l[4]))
                    return void (e._isValid = !1);
                a = "Z"
            }
            e._f = r + (i || "") + (a || ""),
            ut(e)
        } else
            e._isValid = !1
    }
    function rt(t) {
        var n = Or.exec(t._i);
        return null !== n ? void (t._d = new Date(+n[1])) : (st(t),
        void (t._isValid === !1 && (delete t._isValid,
        e.createFromInputFallback(t))))
    }
    function it(e, t, n) {
        return null != e ? e : null != t ? t : n
    }
    function at(t) {
        var n = new Date(e.now());
        return t._useUTC ? [n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate()] : [n.getFullYear(), n.getMonth(), n.getDate()]
    }
    function ot(e) {
        var t, n, s, r, i = [];
        if (!e._d) {
            for (s = at(e),
            e._w && null == e._a[Ks] && null == e._a[Qs] && lt(e),
            e._dayOfYear && (r = it(e._a[Js], s[Js]),
            e._dayOfYear > me(r) && (d(e)._overflowDayOfYear = !0),
            n = ge(r, 0, e._dayOfYear),
            e._a[Qs] = n.getUTCMonth(),
            e._a[Ks] = n.getUTCDate()),
            t = 0; 3 > t && null == e._a[t]; ++t)
                e._a[t] = i[t] = s[t];
            for (; 7 > t; t++)
                e._a[t] = i[t] = null == e._a[t] ? 2 === t ? 1 : 0 : e._a[t];
            24 === e._a[er] && 0 === e._a[tr] && 0 === e._a[nr] && 0 === e._a[sr] && (e._nextDay = !0,
            e._a[er] = 0),
            e._d = (e._useUTC ? ge : ye).apply(null , i),
            null != e._tzm && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm),
            e._nextDay && (e._a[er] = 24)
        }
    }
    function lt(e) {
        var t, n, s, r, i, a, o, l;
        t = e._w,
        null != t.GG || null != t.W || null != t.E ? (i = 1,
        a = 4,
        n = it(t.GG, e._a[Js], Se(yt(), 1, 4).year),
        s = it(t.W, 1),
        r = it(t.E, 1),
        (1 > r || r > 7) && (l = !0)) : (i = e._locale._week.dow,
        a = e._locale._week.doy,
        n = it(t.gg, e._a[Js], Se(yt(), i, a).year),
        s = it(t.w, 1),
        null != t.d ? (r = t.d,
        (0 > r || r > 6) && (l = !0)) : null != t.e ? (r = t.e + i,
        (t.e < 0 || t.e > 6) && (l = !0)) : r = i),
        1 > s || s > ke(n, i, a) ? d(e)._overflowWeeks = !0 : null != l ? d(e)._overflowWeekday = !0 : (o = we(n, s, r, i, a),
        e._a[Js] = o.year,
        e._dayOfYear = o.dayOfYear)
    }
    function ut(t) {
        if (t._f === e.ISO_8601)
            return void st(t);
        t._a = [],
        d(t).empty = !0;
        var n, s, r, i, a, o = "" + t._i, l = o.length, u = 0;
        for (r = $(t._f, t._locale).match(Ts) || [],
        n = 0; n < r.length; n++)
            i = r[n],
            s = (o.match(J(i, t)) || [])[0],
            s && (a = o.substr(0, o.indexOf(s)),
            a.length > 0 && d(t).unusedInput.push(a),
            o = o.slice(o.indexOf(s) + s.length),
            u += s.length),
            Ps[i] ? (s ? d(t).empty = !1 : d(t).unusedTokens.push(i),
            ne(i, s, t)) : t._strict && !s && d(t).unusedTokens.push(i);
        d(t).charsLeftOver = l - u,
        o.length > 0 && d(t).unusedInput.push(o),
        t._a[er] <= 12 && d(t).bigHour === !0 && t._a[er] > 0 && (d(t).bigHour = void 0),
        d(t).parsedDateParts = t._a.slice(0),
        d(t).meridiem = t._meridiem,
        t._a[er] = ct(t._locale, t._a[er], t._meridiem),
        ot(t),
        nt(t)
    }
    function ct(e, t, n) {
        var s;
        return null == n ? t : null != e.meridiemHour ? e.meridiemHour(t, n) : null != e.isPM ? (s = e.isPM(n),
        s && 12 > t && (t += 12),
        s || 12 !== t || (t = 0),
        t) : t
    }
    function dt(e) {
        var t, n, s, r, i;
        if (0 === e._f.length)
            return d(e).invalidFormat = !0,
            void (e._d = new Date(NaN));
        for (r = 0; r < e._f.length; r++)
            i = 0,
            t = p({}, e),
            null != e._useUTC && (t._useUTC = e._useUTC),
            t._f = e._f[r],
            ut(t),
            h(t) && (i += d(t).charsLeftOver,
            i += 10 * d(t).unusedTokens.length,
            d(t).score = i,
            (null == s || s > i) && (s = i,
            n = t));
        l(e, n || t)
    }
    function ht(e) {
        if (!e._d) {
            var t = q(e._i);
            e._a = a([t.year, t.month, t.day || t.date, t.hour, t.minute, t.second, t.millisecond], function(e) {
                return e && parseInt(e, 10)
            }),
            ot(e)
        }
    }
    function ft(e) {
        var t = new _(nt(mt(e)));
        return t._nextDay && (t.add(1, "d"),
        t._nextDay = void 0),
        t
    }
    function mt(e) {
        var t = e._i
          , s = e._f;
        return e._locale = e._locale || et(e._l),
        null === t || void 0 === s && "" === t ? f({
            nullInput: !0
        }) : ("string" == typeof t && (e._i = t = e._locale.preparse(t)),
        y(t) ? new _(nt(t)) : (n(s) ? dt(e) : i(t) ? e._d = t : s ? ut(e) : pt(e),
        h(e) || (e._d = null ),
        e))
    }
    function pt(t) {
        var s = t._i;
        void 0 === s ? t._d = new Date(e.now()) : i(s) ? t._d = new Date(s.valueOf()) : "string" == typeof s ? rt(t) : n(s) ? (t._a = a(s.slice(0), function(e) {
            return parseInt(e, 10)
        }),
        ot(t)) : "object" == typeof s ? ht(t) : "number" == typeof s ? t._d = new Date(s) : e.createFromInputFallback(t)
    }
    function _t(e, t, i, a, o) {
        var l = {};
        return "boolean" == typeof i && (a = i,
        i = void 0),
        (s(e) && r(e) || n(e) && 0 === e.length) && (e = void 0),
        l._isAMomentObject = !0,
        l._useUTC = l._isUTC = o,
        l._l = i,
        l._i = e,
        l._f = t,
        l._strict = a,
        ft(l)
    }
    function yt(e, t, n, s) {
        return _t(e, t, n, s, !1)
    }
    function gt(e, t) {
        var s, r;
        if (1 === t.length && n(t[0]) && (t = t[0]),
        !t.length)
            return yt();
        for (s = t[0],
        r = 1; r < t.length; ++r)
            (!t[r].isValid() || t[r][e](s)) && (s = t[r]);
        return s
    }
    function vt() {
        var e = [].slice.call(arguments, 0);
        return gt("isBefore", e)
    }
    function wt() {
        var e = [].slice.call(arguments, 0);
        return gt("isAfter", e)
    }
    function St(e) {
        var t = q(e)
          , n = t.year || 0
          , s = t.quarter || 0
          , r = t.month || 0
          , i = t.week || 0
          , a = t.day || 0
          , o = t.hour || 0
          , l = t.minute || 0
          , u = t.second || 0
          , c = t.millisecond || 0;
        this._milliseconds = +c + 1e3 * u + 6e4 * l + 1e3 * o * 60 * 60,
        this._days = +a + 7 * i,
        this._months = +r + 3 * s + 12 * n,
        this._data = {},
        this._locale = et(),
        this._bubble()
    }
    function kt(e) {
        return e instanceof St
    }
    function Mt(e) {
        return 0 > e ? -1 * Math.round(-1 * e) : Math.round(e)
    }
    function Dt(e, t) {
        V(e, 0, 0, function() {
            var e = this.utcOffset()
              , n = "+";
            return 0 > e && (e = -e,
            n = "-"),
            n + z(~~(e / 60), 2) + t + z(~~e % 60, 2)
        })
    }
    function xt(e, t) {
        var n = (t || "").match(e) || []
          , s = n[n.length - 1] || []
          , r = (s + "").match(Lr) || ["-", 0, 0]
          , i = +(60 * r[1]) + v(r[2]);
        return "+" === r[0] ? i : -i
    }
    function bt(t, n) {
        var s, r;
        return n._isUTC ? (s = n.clone(),
        r = (y(t) || i(t) ? t.valueOf() : yt(t).valueOf()) - s.valueOf(),
        s._d.setTime(s._d.valueOf() + r),
        e.updateOffset(s, !1),
        s) : yt(t).local()
    }
    function Yt(e) {
        return 15 * -Math.round(e._d.getTimezoneOffset() / 15)
    }
    function Tt(t, n) {
        var s, r = this._offset || 0;
        return this.isValid() ? null != t ? ("string" == typeof t ? t = xt(Is, t) : Math.abs(t) < 16 && (t = 60 * t),
        !this._isUTC && n && (s = Yt(this)),
        this._offset = t,
        this._isUTC = !0,
        null != s && this.add(s, "m"),
        r !== t && (!n || this._changeInProgress ? zt(this, Ut(t - r, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0,
        e.updateOffset(this, !0),
        this._changeInProgress = null )),
        this) : this._isUTC ? r : Yt(this) : null != t ? this : NaN
    }
    function Ot(e, t) {
        return null != e ? ("string" != typeof e && (e = -e),
        this.utcOffset(e, t),
        this) : -this.utcOffset()
    }
    function Ct(e) {
        return this.utcOffset(0, e)
    }
    function Pt(e) {
        return this._isUTC && (this.utcOffset(0, e),
        this._isUTC = !1,
        e && this.subtract(Yt(this), "m")),
        this
    }
    function Rt() {
        if (this._tzm)
            this.utcOffset(this._tzm);
        else if ("string" == typeof this._i) {
            var e = xt(Vs, this._i);
            0 === e ? this.utcOffset(0, !0) : this.utcOffset(xt(Vs, this._i))
        }
        return this
    }
    function Lt(e) {
        return this.isValid() ? (e = e ? yt(e).utcOffset() : 0,
        (this.utcOffset() - e) % 60 === 0) : !1
    }
    function Ht() {
        return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
    }
    function Wt() {
        if (!m(this._isDSTShifted))
            return this._isDSTShifted;
        var e = {};
        if (p(e, this),
        e = mt(e),
        e._a) {
            var t = e._isUTC ? u(e._a) : yt(e._a);
            this._isDSTShifted = this.isValid() && w(e._a, t.toArray()) > 0
        } else
            this._isDSTShifted = !1;
        return this._isDSTShifted
    }
    function qt() {
        return this.isValid() ? !this._isUTC : !1
    }
    function jt() {
        return this.isValid() ? this._isUTC : !1
    }
    function At() {
        return this.isValid() ? this._isUTC && 0 === this._offset : !1
    }
    function Ut(e, t) {
        var n, s, r, i = e, a = null ;
        return kt(e) ? i = {
            ms: e._milliseconds,
            d: e._days,
            M: e._months
        } : "number" == typeof e ? (i = {},
        t ? i[t] = e : i.milliseconds = e) : (a = Hr.exec(e)) ? (n = "-" === a[1] ? -1 : 1,
        i = {
            y: 0,
            d: v(a[Ks]) * n,
            h: v(a[er]) * n,
            m: v(a[tr]) * n,
            s: v(a[nr]) * n,
            ms: v(Mt(1e3 * a[sr])) * n
        }) : (a = Wr.exec(e)) ? (n = "-" === a[1] ? -1 : 1,
        i = {
            y: Et(a[2], n),
            M: Et(a[3], n),
            w: Et(a[4], n),
            d: Et(a[5], n),
            h: Et(a[6], n),
            m: Et(a[7], n),
            s: Et(a[8], n)
        }) : null == i ? i = {} : "object" == typeof i && ("from"in i || "to"in i) && (r = Gt(yt(i.from), yt(i.to)),
        i = {},
        i.ms = r.milliseconds,
        i.M = r.months),
        s = new St(i),
        kt(e) && o(e, "_locale") && (s._locale = e._locale),
        s
    }
    function Et(e, t) {
        var n = e && parseFloat(e.replace(",", "."));
        return (isNaN(n) ? 0 : n) * t
    }
    function Ft(e, t) {
        var n = {
            milliseconds: 0,
            months: 0
        };
        return n.months = t.month() - e.month() + 12 * (t.year() - e.year()),
        e.clone().add(n.months, "M").isAfter(t) && --n.months,
        n.milliseconds = +t - +e.clone().add(n.months, "M"),
        n
    }
    function Gt(e, t) {
        var n;
        return e.isValid() && t.isValid() ? (t = bt(t, e),
        e.isBefore(t) ? n = Ft(e, t) : (n = Ft(t, e),
        n.milliseconds = -n.milliseconds,
        n.months = -n.months),
        n) : {
            milliseconds: 0,
            months: 0
        }
    }
    function Nt(e, t) {
        return function(n, s) {
            var r, i;
            return null === s || isNaN(+s) || (M(t, "moment()." + t + "(period, number) is deprecated. Please use moment()." + t + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."),
            i = n,
            n = s,
            s = i),
            n = "string" == typeof n ? +n : n,
            r = Ut(n, s),
            zt(this, r, e),
            this
        }
    }
    function zt(t, n, s, r) {
        var i = n._milliseconds
          , a = Mt(n._days)
          , o = Mt(n._months);
        t.isValid() && (r = null == r ? !0 : r,
        i && t._d.setTime(t._d.valueOf() + i * s),
        a && F(t, "Date", E(t, "Date") + a * s),
        o && le(t, E(t, "Month") + o * s),
        r && e.updateOffset(t, a || o))
    }
    function Vt(e, t) {
        var n = e.diff(t, "days", !0);
        return -6 > n ? "sameElse" : -1 > n ? "lastWeek" : 0 > n ? "lastDay" : 1 > n ? "sameDay" : 2 > n ? "nextDay" : 7 > n ? "nextWeek" : "sameElse"
    }
    function It(t, n) {
        var s = t || yt()
          , r = bt(s, this).startOf("day")
          , i = e.calendarFormat(this, r) || "sameElse"
          , a = n && (D(n[i]) ? n[i].call(this, s) : n[i]);
        return this.format(a || this.localeData().calendar(i, this, yt(s)))
    }
    function Zt() {
        return new _(this)
    }
    function Xt(e, t) {
        var n = y(e) ? e : yt(e);
        return this.isValid() && n.isValid() ? (t = W(m(t) ? "millisecond" : t),
        "millisecond" === t ? this.valueOf() > n.valueOf() : n.valueOf() < this.clone().startOf(t).valueOf()) : !1;
    }
    function $t(e, t) {
        var n = y(e) ? e : yt(e);
        return this.isValid() && n.isValid() ? (t = W(m(t) ? "millisecond" : t),
        "millisecond" === t ? this.valueOf() < n.valueOf() : this.clone().endOf(t).valueOf() < n.valueOf()) : !1
    }
    function Bt(e, t, n, s) {
        return s = s || "()",
        ("(" === s[0] ? this.isAfter(e, n) : !this.isBefore(e, n)) && (")" === s[1] ? this.isBefore(t, n) : !this.isAfter(t, n))
    }
    function Jt(e, t) {
        var n, s = y(e) ? e : yt(e);
        return this.isValid() && s.isValid() ? (t = W(t || "millisecond"),
        "millisecond" === t ? this.valueOf() === s.valueOf() : (n = s.valueOf(),
        this.clone().startOf(t).valueOf() <= n && n <= this.clone().endOf(t).valueOf())) : !1
    }
    function Qt(e, t) {
        return this.isSame(e, t) || this.isAfter(e, t)
    }
    function Kt(e, t) {
        return this.isSame(e, t) || this.isBefore(e, t)
    }
    function en(e, t, n) {
        var s, r, i, a;
        return this.isValid() ? (s = bt(e, this),
        s.isValid() ? (r = 6e4 * (s.utcOffset() - this.utcOffset()),
        t = W(t),
        "year" === t || "month" === t || "quarter" === t ? (a = tn(this, s),
        "quarter" === t ? a /= 3 : "year" === t && (a /= 12)) : (i = this - s,
        a = "second" === t ? i / 1e3 : "minute" === t ? i / 6e4 : "hour" === t ? i / 36e5 : "day" === t ? (i - r) / 864e5 : "week" === t ? (i - r) / 6048e5 : i),
        n ? a : g(a)) : NaN) : NaN
    }
    function tn(e, t) {
        var n, s, r = 12 * (t.year() - e.year()) + (t.month() - e.month()), i = e.clone().add(r, "months");
        return 0 > t - i ? (n = e.clone().add(r - 1, "months"),
        s = (t - i) / (i - n)) : (n = e.clone().add(r + 1, "months"),
        s = (t - i) / (n - i)),
        -(r + s) || 0
    }
    function nn() {
        return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
    }
    function sn() {
        var e = this.clone().utc();
        return 0 < e.year() && e.year() <= 9999 ? D(Date.prototype.toISOString) ? this.toDate().toISOString() : X(e, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : X(e, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
    }
    function rn(t) {
        t || (t = this.isUtc() ? e.defaultFormatUtc : e.defaultFormat);
        var n = X(this, t);
        return this.localeData().postformat(n)
    }
    function an(e, t) {
        return this.isValid() && (y(e) && e.isValid() || yt(e).isValid()) ? Ut({
            to: this,
            from: e
        }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate()
    }
    function on(e) {
        return this.from(yt(), e)
    }
    function ln(e, t) {
        return this.isValid() && (y(e) && e.isValid() || yt(e).isValid()) ? Ut({
            from: this,
            to: e
        }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate()
    }
    function un(e) {
        return this.to(yt(), e)
    }
    function cn(e) {
        var t;
        return void 0 === e ? this._locale._abbr : (t = et(e),
        null != t && (this._locale = t),
        this)
    }
    function dn() {
        return this._locale
    }
    function hn(e) {
        switch (e = W(e)) {
        case "year":
            this.month(0);
        case "quarter":
        case "month":
            this.date(1);
        case "week":
        case "isoWeek":
        case "day":
        case "date":
            this.hours(0);
        case "hour":
            this.minutes(0);
        case "minute":
            this.seconds(0);
        case "second":
            this.milliseconds(0)
        }
        return "week" === e && this.weekday(0),
        "isoWeek" === e && this.isoWeekday(1),
        "quarter" === e && this.month(3 * Math.floor(this.month() / 3)),
        this
    }
    function fn(e) {
        return e = W(e),
        void 0 === e || "millisecond" === e ? this : ("date" === e && (e = "day"),
        this.startOf(e).add(1, "isoWeek" === e ? "week" : e).subtract(1, "ms"))
    }
    function mn() {
        return this._d.valueOf() - 6e4 * (this._offset || 0)
    }
    function pn() {
        return Math.floor(this.valueOf() / 1e3)
    }
    function _n() {
        return new Date(this.valueOf())
    }
    function yn() {
        var e = this;
        return [e.year(), e.month(), e.date(), e.hour(), e.minute(), e.second(), e.millisecond()]
    }
    function gn() {
        var e = this;
        return {
            years: e.year(),
            months: e.month(),
            date: e.date(),
            hours: e.hours(),
            minutes: e.minutes(),
            seconds: e.seconds(),
            milliseconds: e.milliseconds()
        }
    }
    function vn() {
        return this.isValid() ? this.toISOString() : null
    }
    function wn() {
        return h(this)
    }
    function Sn() {
        return l({}, d(this))
    }
    function kn() {
        return d(this).overflow
    }
    function Mn() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        }
    }
    function Dn(e, t) {
        V(0, [e, e.length], 0, t)
    }
    function xn(e) {
        return On.call(this, e, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy)
    }
    function bn(e) {
        return On.call(this, e, this.isoWeek(), this.isoWeekday(), 1, 4)
    }
    function Yn() {
        return ke(this.year(), 1, 4)
    }
    function Tn() {
        var e = this.localeData()._week;
        return ke(this.year(), e.dow, e.doy)
    }
    function On(e, t, n, s, r) {
        var i;
        return null == e ? Se(this, s, r).year : (i = ke(e, s, r),
        t > i && (t = i),
        Cn.call(this, e, t, n, s, r))
    }
    function Cn(e, t, n, s, r) {
        var i = we(e, t, n, s, r)
          , a = ge(i.year, 0, i.dayOfYear);
        return this.year(a.getUTCFullYear()),
        this.month(a.getUTCMonth()),
        this.date(a.getUTCDate()),
        this
    }
    function Pn(e) {
        return null == e ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (e - 1) + this.month() % 3)
    }
    function Rn(e) {
        var t = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
        return null == e ? t : this.add(e - t, "d")
    }
    function Ln(e, t) {
        t[sr] = v(1e3 * ("0." + e))
    }
    function Hn() {
        return this._isUTC ? "UTC" : ""
    }
    function Wn() {
        return this._isUTC ? "Coordinated Universal Time" : ""
    }
    function qn(e) {
        return yt(1e3 * e)
    }
    function jn() {
        return yt.apply(null , arguments).parseZone()
    }
    function An(e) {
        return e
    }
    function Un(e, t, n, s) {
        var r = et()
          , i = u().set(s, t);
        return r[n](i, e)
    }
    function En(e, t, n) {
        if ("number" == typeof e && (t = e,
        e = void 0),
        e = e || "",
        null != t)
            return Un(e, t, n, "month");
        var s, r = [];
        for (s = 0; 12 > s; s++)
            r[s] = Un(e, s, n, "month");
        return r
    }
    function Fn(e, t, n, s) {
        "boolean" == typeof e ? ("number" == typeof t && (n = t,
        t = void 0),
        t = t || "") : (t = e,
        n = t,
        e = !1,
        "number" == typeof t && (n = t,
        t = void 0),
        t = t || "");
        var r = et()
          , i = e ? r._week.dow : 0;
        if (null != n)
            return Un(t, (n + i) % 7, s, "day");
        var a, o = [];
        for (a = 0; 7 > a; a++)
            o[a] = Un(t, (a + i) % 7, s, "day");
        return o
    }
    function Gn(e, t) {
        return En(e, t, "months")
    }
    function Nn(e, t) {
        return En(e, t, "monthsShort")
    }
    function zn(e, t, n) {
        return Fn(e, t, n, "weekdays")
    }
    function Vn(e, t, n) {
        return Fn(e, t, n, "weekdaysShort")
    }
    function In(e, t, n) {
        return Fn(e, t, n, "weekdaysMin")
    }
    function Zn() {
        var e = this._data;
        return this._milliseconds = Zr(this._milliseconds),
        this._days = Zr(this._days),
        this._months = Zr(this._months),
        e.milliseconds = Zr(e.milliseconds),
        e.seconds = Zr(e.seconds),
        e.minutes = Zr(e.minutes),
        e.hours = Zr(e.hours),
        e.months = Zr(e.months),
        e.years = Zr(e.years),
        this
    }
    function Xn(e, t, n, s) {
        var r = Ut(t, n);
        return e._milliseconds += s * r._milliseconds,
        e._days += s * r._days,
        e._months += s * r._months,
        e._bubble()
    }
    function $n(e, t) {
        return Xn(this, e, t, 1)
    }
    function Bn(e, t) {
        return Xn(this, e, t, -1)
    }
    function Jn(e) {
        return 0 > e ? Math.floor(e) : Math.ceil(e)
    }
    function Qn() {
        var e, t, n, s, r, i = this._milliseconds, a = this._days, o = this._months, l = this._data;
        return i >= 0 && a >= 0 && o >= 0 || 0 >= i && 0 >= a && 0 >= o || (i += 864e5 * Jn(es(o) + a),
        a = 0,
        o = 0),
        l.milliseconds = i % 1e3,
        e = g(i / 1e3),
        l.seconds = e % 60,
        t = g(e / 60),
        l.minutes = t % 60,
        n = g(t / 60),
        l.hours = n % 24,
        a += g(n / 24),
        r = g(Kn(a)),
        o += r,
        a -= Jn(es(r)),
        s = g(o / 12),
        o %= 12,
        l.days = a,
        l.months = o,
        l.years = s,
        this
    }
    function Kn(e) {
        return 4800 * e / 146097
    }
    function es(e) {
        return 146097 * e / 4800
    }
    function ts(e) {
        var t, n, s = this._milliseconds;
        if (e = W(e),
        "month" === e || "year" === e)
            return t = this._days + s / 864e5,
            n = this._months + Kn(t),
            "month" === e ? n : n / 12;
        switch (t = this._days + Math.round(es(this._months)),
        e) {
        case "week":
            return t / 7 + s / 6048e5;
        case "day":
            return t + s / 864e5;
        case "hour":
            return 24 * t + s / 36e5;
        case "minute":
            return 1440 * t + s / 6e4;
        case "second":
            return 86400 * t + s / 1e3;
        case "millisecond":
            return Math.floor(864e5 * t) + s;
        default:
            throw new Error("Unknown unit " + e)
        }
    }
    function ns() {
        return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * v(this._months / 12)
    }
    function ss(e) {
        return function() {
            return this.as(e)
        }
    }
    function rs(e) {
        return e = W(e),
        this[e + "s"]()
    }
    function is(e) {
        return function() {
            return this._data[e]
        }
    }
    function as() {
        return g(this.days() / 7)
    }
    function os(e, t, n, s, r) {
        return r.relativeTime(t || 1, !!n, e, s)
    }
    function ls(e, t, n) {
        var s = Ut(e).abs()
          , r = ui(s.as("s"))
          , i = ui(s.as("m"))
          , a = ui(s.as("h"))
          , o = ui(s.as("d"))
          , l = ui(s.as("M"))
          , u = ui(s.as("y"))
          , c = r < ci.s && ["s", r] || 1 >= i && ["m"] || i < ci.m && ["mm", i] || 1 >= a && ["h"] || a < ci.h && ["hh", a] || 1 >= o && ["d"] || o < ci.d && ["dd", o] || 1 >= l && ["M"] || l < ci.M && ["MM", l] || 1 >= u && ["y"] || ["yy", u];
        return c[2] = t,
        c[3] = +e > 0,
        c[4] = n,
        os.apply(null , c)
    }
    function us(e) {
        return void 0 === e ? ui : "function" == typeof e ? (ui = e,
        !0) : !1
    }
    function cs(e, t) {
        return void 0 === ci[e] ? !1 : void 0 === t ? ci[e] : (ci[e] = t,
        !0)
    }
    function ds(e) {
        var t = this.localeData()
          , n = ls(this, !e, t);
        return e && (n = t.pastFuture(+this, n)),
        t.postformat(n)
    }
    function hs() {
        var e, t, n, s = di(this._milliseconds) / 1e3, r = di(this._days), i = di(this._months);
        e = g(s / 60),
        t = g(e / 60),
        s %= 60,
        e %= 60,
        n = g(i / 12),
        i %= 12;
        var a = n
          , o = i
          , l = r
          , u = t
          , c = e
          , d = s
          , h = this.asSeconds();
        return h ? (0 > h ? "-" : "") + "P" + (a ? a + "Y" : "") + (o ? o + "M" : "") + (l ? l + "D" : "") + (u || c || d ? "T" : "") + (u ? u + "H" : "") + (c ? c + "M" : "") + (d ? d + "S" : "") : "P0D"
    }
    var fs, ms;
    ms = Array.prototype.some ? Array.prototype.some : function(e) {
        for (var t = Object(this), n = t.length >>> 0, s = 0; n > s; s++)
            if (s in t && e.call(this, t[s], s, t))
                return !0;
        return !1
    }
    ;
    var ps = e.momentProperties = []
      , _s = !1
      , ys = {};
    e.suppressDeprecationWarnings = !1,
    e.deprecationHandler = null ;
    var gs;
    gs = Object.keys ? Object.keys : function(e) {
        var t, n = [];
        for (t in e)
            o(e, t) && n.push(t);
        return n
    }
    ;
    var vs, ws = {
        sameDay: "[Today at] LT",
        nextDay: "[Tomorrow at] LT",
        nextWeek: "dddd [at] LT",
        lastDay: "[Yesterday at] LT",
        lastWeek: "[Last] dddd [at] LT",
        sameElse: "L"
    }, Ss = {
        LTS: "h:mm:ss A",
        LT: "h:mm A",
        L: "MM/DD/YYYY",
        LL: "MMMM D, YYYY",
        LLL: "MMMM D, YYYY h:mm A",
        LLLL: "dddd, MMMM D, YYYY h:mm A"
    }, ks = "Invalid date", Ms = "%d", Ds = /\d{1,2}/, xs = {
        future: "in %s",
        past: "%s ago",
        s: "a few seconds",
        m: "a minute",
        mm: "%d minutes",
        h: "an hour",
        hh: "%d hours",
        d: "a day",
        dd: "%d days",
        M: "a month",
        MM: "%d months",
        y: "a year",
        yy: "%d years"
    }, bs = {}, Ys = {}, Ts = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, Os = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, Cs = {}, Ps = {}, Rs = /\d/, Ls = /\d\d/, Hs = /\d{3}/, Ws = /\d{4}/, qs = /[+-]?\d{6}/, js = /\d\d?/, As = /\d\d\d\d?/, Us = /\d\d\d\d\d\d?/, Es = /\d{1,3}/, Fs = /\d{1,4}/, Gs = /[+-]?\d{1,6}/, Ns = /\d+/, zs = /[+-]?\d+/, Vs = /Z|[+-]\d\d:?\d\d/gi, Is = /Z|[+-]\d\d(?::?\d\d)?/gi, Zs = /[+-]?\d+(\.\d{1,3})?/, Xs = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, $s = {}, Bs = {}, Js = 0, Qs = 1, Ks = 2, er = 3, tr = 4, nr = 5, sr = 6, rr = 7, ir = 8;
    vs = Array.prototype.indexOf ? Array.prototype.indexOf : function(e) {
        var t;
        for (t = 0; t < this.length; ++t)
            if (this[t] === e)
                return t;
        return -1
    }
    ,
    V("M", ["MM", 2], "Mo", function() {
        return this.month() + 1
    }),
    V("MMM", 0, 0, function(e) {
        return this.localeData().monthsShort(this, e)
    }),
    V("MMMM", 0, 0, function(e) {
        return this.localeData().months(this, e)
    }),
    H("month", "M"),
    j("month", 8),
    B("M", js),
    B("MM", js, Ls),
    B("MMM", function(e, t) {
        return t.monthsShortRegex(e)
    }),
    B("MMMM", function(e, t) {
        return t.monthsRegex(e)
    }),
    ee(["M", "MM"], function(e, t) {
        t[Qs] = v(e) - 1
    }),
    ee(["MMM", "MMMM"], function(e, t, n, s) {
        var r = n._locale.monthsParse(e, s, n._strict);
        null != r ? t[Qs] = r : d(n).invalidMonth = e
    });
    var ar = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/
      , or = "January_February_March_April_May_June_July_August_September_October_November_December".split("_")
      , lr = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_")
      , ur = Xs
      , cr = Xs;
    V("Y", 0, 0, function() {
        var e = this.year();
        return 9999 >= e ? "" + e : "+" + e
    }),
    V(0, ["YY", 2], 0, function() {
        return this.year() % 100
    }),
    V(0, ["YYYY", 4], 0, "year"),
    V(0, ["YYYYY", 5], 0, "year"),
    V(0, ["YYYYYY", 6, !0], 0, "year"),
    H("year", "y"),
    j("year", 1),
    B("Y", zs),
    B("YY", js, Ls),
    B("YYYY", Fs, Ws),
    B("YYYYY", Gs, qs),
    B("YYYYYY", Gs, qs),
    ee(["YYYYY", "YYYYYY"], Js),
    ee("YYYY", function(t, n) {
        n[Js] = 2 === t.length ? e.parseTwoDigitYear(t) : v(t)
    }),
    ee("YY", function(t, n) {
        n[Js] = e.parseTwoDigitYear(t)
    }),
    ee("Y", function(e, t) {
        t[Js] = parseInt(e, 10)
    }),
    e.parseTwoDigitYear = function(e) {
        return v(e) + (v(e) > 68 ? 1900 : 2e3)
    }
    ;
    var dr = U("FullYear", !0);
    V("w", ["ww", 2], "wo", "week"),
    V("W", ["WW", 2], "Wo", "isoWeek"),
    H("week", "w"),
    H("isoWeek", "W"),
    j("week", 5),
    j("isoWeek", 5),
    B("w", js),
    B("ww", js, Ls),
    B("W", js),
    B("WW", js, Ls),
    te(["w", "ww", "W", "WW"], function(e, t, n, s) {
        t[s.substr(0, 1)] = v(e)
    });
    var hr = {
        dow: 0,
        doy: 6
    };
    V("d", 0, "do", "day"),
    V("dd", 0, 0, function(e) {
        return this.localeData().weekdaysMin(this, e)
    }),
    V("ddd", 0, 0, function(e) {
        return this.localeData().weekdaysShort(this, e)
    }),
    V("dddd", 0, 0, function(e) {
        return this.localeData().weekdays(this, e)
    }),
    V("e", 0, 0, "weekday"),
    V("E", 0, 0, "isoWeekday"),
    H("day", "d"),
    H("weekday", "e"),
    H("isoWeekday", "E"),
    j("day", 11),
    j("weekday", 11),
    j("isoWeekday", 11),
    B("d", js),
    B("e", js),
    B("E", js),
    B("dd", function(e, t) {
        return t.weekdaysMinRegex(e)
    }),
    B("ddd", function(e, t) {
        return t.weekdaysShortRegex(e)
    }),
    B("dddd", function(e, t) {
        return t.weekdaysRegex(e)
    }),
    te(["dd", "ddd", "dddd"], function(e, t, n, s) {
        var r = n._locale.weekdaysParse(e, s, n._strict);
        null != r ? t.d = r : d(n).invalidWeekday = e
    }),
    te(["d", "e", "E"], function(e, t, n, s) {
        t[s] = v(e)
    });
    var fr = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_")
      , mr = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_")
      , pr = "Su_Mo_Tu_We_Th_Fr_Sa".split("_")
      , _r = Xs
      , yr = Xs
      , gr = Xs;
    V("H", ["HH", 2], 0, "hour"),
    V("h", ["hh", 2], 0, Ge),
    V("k", ["kk", 2], 0, Ne),
    V("hmm", 0, 0, function() {
        return "" + Ge.apply(this) + z(this.minutes(), 2)
    }),
    V("hmmss", 0, 0, function() {
        return "" + Ge.apply(this) + z(this.minutes(), 2) + z(this.seconds(), 2)
    }),
    V("Hmm", 0, 0, function() {
        return "" + this.hours() + z(this.minutes(), 2)
    }),
    V("Hmmss", 0, 0, function() {
        return "" + this.hours() + z(this.minutes(), 2) + z(this.seconds(), 2)
    }),
    ze("a", !0),
    ze("A", !1),
    H("hour", "h"),
    j("hour", 13),
    B("a", Ve),
    B("A", Ve),
    B("H", js),
    B("h", js),
    B("HH", js, Ls),
    B("hh", js, Ls),
    B("hmm", As),
    B("hmmss", Us),
    B("Hmm", As),
    B("Hmmss", Us),
    ee(["H", "HH"], er),
    ee(["a", "A"], function(e, t, n) {
        n._isPm = n._locale.isPM(e),
        n._meridiem = e
    }),
    ee(["h", "hh"], function(e, t, n) {
        t[er] = v(e),
        d(n).bigHour = !0
    }),
    ee("hmm", function(e, t, n) {
        var s = e.length - 2;
        t[er] = v(e.substr(0, s)),
        t[tr] = v(e.substr(s)),
        d(n).bigHour = !0
    }),
    ee("hmmss", function(e, t, n) {
        var s = e.length - 4
          , r = e.length - 2;
        t[er] = v(e.substr(0, s)),
        t[tr] = v(e.substr(s, 2)),
        t[nr] = v(e.substr(r)),
        d(n).bigHour = !0
    }),
    ee("Hmm", function(e, t, n) {
        var s = e.length - 2;
        t[er] = v(e.substr(0, s)),
        t[tr] = v(e.substr(s))
    }),
    ee("Hmmss", function(e, t, n) {
        var s = e.length - 4
          , r = e.length - 2;
        t[er] = v(e.substr(0, s)),
        t[tr] = v(e.substr(s, 2)),
        t[nr] = v(e.substr(r))
    });
    var vr, wr = /[ap]\.?m?\.?/i, Sr = U("Hours", !0), kr = {
        calendar: ws,
        longDateFormat: Ss,
        invalidDate: ks,
        ordinal: Ms,
        ordinalParse: Ds,
        relativeTime: xs,
        months: or,
        monthsShort: lr,
        week: hr,
        weekdays: fr,
        weekdaysMin: pr,
        weekdaysShort: mr,
        meridiemParse: wr
    }, Mr = {}, Dr = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/, xr = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/, br = /Z|[+-]\d\d(?::?\d\d)?/, Yr = [["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/], ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/], ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/], ["GGGG-[W]WW", /\d{4}-W\d\d/, !1], ["YYYY-DDD", /\d{4}-\d{3}/], ["YYYY-MM", /\d{4}-\d\d/, !1], ["YYYYYYMMDD", /[+-]\d{10}/], ["YYYYMMDD", /\d{8}/], ["GGGG[W]WWE", /\d{4}W\d{3}/], ["GGGG[W]WW", /\d{4}W\d{2}/, !1], ["YYYYDDD", /\d{7}/]], Tr = [["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/], ["HH:mm:ss", /\d\d:\d\d:\d\d/], ["HH:mm", /\d\d:\d\d/], ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/], ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/], ["HHmmss", /\d\d\d\d\d\d/], ["HHmm", /\d\d\d\d/], ["HH", /\d\d/]], Or = /^\/?Date\((\-?\d+)/i;
    e.createFromInputFallback = k("value provided is not in a recognized ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function(e) {
        e._d = new Date(e._i + (e._useUTC ? " UTC" : ""))
    }),
    e.ISO_8601 = function() {}
    ;
    var Cr = k("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
        var e = yt.apply(null , arguments);
        return this.isValid() && e.isValid() ? this > e ? this : e : f()
    })
      , Pr = k("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
        var e = yt.apply(null , arguments);
        return this.isValid() && e.isValid() ? e > this ? this : e : f()
    })
      , Rr = function() {
        return Date.now ? Date.now() : +new Date
    };
    Dt("Z", ":"),
    Dt("ZZ", ""),
    B("Z", Is),
    B("ZZ", Is),
    ee(["Z", "ZZ"], function(e, t, n) {
        n._useUTC = !0,
        n._tzm = xt(Is, e)
    });
    var Lr = /([\+\-]|\d\d)/gi;
    e.updateOffset = function() {}
    ;
    var Hr = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/
      , Wr = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;
    Ut.fn = St.prototype;
    var qr = Nt(1, "add")
      , jr = Nt(-1, "subtract");
    e.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ",
    e.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
    var Ar = k("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(e) {
        return void 0 === e ? this.localeData() : this.locale(e)
    });
    V(0, ["gg", 2], 0, function() {
        return this.weekYear() % 100
    }),
    V(0, ["GG", 2], 0, function() {
        return this.isoWeekYear() % 100
    }),
    Dn("gggg", "weekYear"),
    Dn("ggggg", "weekYear"),
    Dn("GGGG", "isoWeekYear"),
    Dn("GGGGG", "isoWeekYear"),
    H("weekYear", "gg"),
    H("isoWeekYear", "GG"),
    j("weekYear", 1),
    j("isoWeekYear", 1),
    B("G", zs),
    B("g", zs),
    B("GG", js, Ls),
    B("gg", js, Ls),
    B("GGGG", Fs, Ws),
    B("gggg", Fs, Ws),
    B("GGGGG", Gs, qs),
    B("ggggg", Gs, qs),
    te(["gggg", "ggggg", "GGGG", "GGGGG"], function(e, t, n, s) {
        t[s.substr(0, 2)] = v(e)
    }),
    te(["gg", "GG"], function(t, n, s, r) {
        n[r] = e.parseTwoDigitYear(t)
    }),
    V("Q", 0, "Qo", "quarter"),
    H("quarter", "Q"),
    j("quarter", 7),
    B("Q", Rs),
    ee("Q", function(e, t) {
        t[Qs] = 3 * (v(e) - 1)
    }),
    V("D", ["DD", 2], "Do", "date"),
    H("date", "D"),
    j("date", 9),
    B("D", js),
    B("DD", js, Ls),
    B("Do", function(e, t) {
        return e ? t._ordinalParse : t._ordinalParseLenient
    }),
    ee(["D", "DD"], Ks),
    ee("Do", function(e, t) {
        t[Ks] = v(e.match(js)[0], 10)
    });
    var Ur = U("Date", !0);
    V("DDD", ["DDDD", 3], "DDDo", "dayOfYear"),
    H("dayOfYear", "DDD"),
    j("dayOfYear", 4),
    B("DDD", Es),
    B("DDDD", Hs),
    ee(["DDD", "DDDD"], function(e, t, n) {
        n._dayOfYear = v(e)
    }),
    V("m", ["mm", 2], 0, "minute"),
    H("minute", "m"),
    j("minute", 14),
    B("m", js),
    B("mm", js, Ls),
    ee(["m", "mm"], tr);
    var Er = U("Minutes", !1);
    V("s", ["ss", 2], 0, "second"),
    H("second", "s"),
    j("second", 15),
    B("s", js),
    B("ss", js, Ls),
    ee(["s", "ss"], nr);
    var Fr = U("Seconds", !1);
    V("S", 0, 0, function() {
        return ~~(this.millisecond() / 100)
    }),
    V(0, ["SS", 2], 0, function() {
        return ~~(this.millisecond() / 10)
    }),
    V(0, ["SSS", 3], 0, "millisecond"),
    V(0, ["SSSS", 4], 0, function() {
        return 10 * this.millisecond()
    }),
    V(0, ["SSSSS", 5], 0, function() {
        return 100 * this.millisecond()
    }),
    V(0, ["SSSSSS", 6], 0, function() {
        return 1e3 * this.millisecond()
    }),
    V(0, ["SSSSSSS", 7], 0, function() {
        return 1e4 * this.millisecond()
    }),
    V(0, ["SSSSSSSS", 8], 0, function() {
        return 1e5 * this.millisecond()
    }),
    V(0, ["SSSSSSSSS", 9], 0, function() {
        return 1e6 * this.millisecond()
    }),
    H("millisecond", "ms"),
    j("millisecond", 16),
    B("S", Es, Rs),
    B("SS", Es, Ls),
    B("SSS", Es, Hs);
    var Gr;
    for (Gr = "SSSS"; Gr.length <= 9; Gr += "S")
        B(Gr, Ns);
    for (Gr = "S"; Gr.length <= 9; Gr += "S")
        ee(Gr, Ln);
    var Nr = U("Milliseconds", !1);
    V("z", 0, 0, "zoneAbbr"),
    V("zz", 0, 0, "zoneName");
    var zr = _.prototype;
    zr.add = qr,
    zr.calendar = It,
    zr.clone = Zt,
    zr.diff = en,
    zr.endOf = fn,
    zr.format = rn,
    zr.from = an,
    zr.fromNow = on,
    zr.to = ln,
    zr.toNow = un,
    zr.get = G,
    zr.invalidAt = kn,
    zr.isAfter = Xt,
    zr.isBefore = $t,
    zr.isBetween = Bt,
    zr.isSame = Jt,
    zr.isSameOrAfter = Qt,
    zr.isSameOrBefore = Kt,
    zr.isValid = wn,
    zr.lang = Ar,
    zr.locale = cn,
    zr.localeData = dn,
    zr.max = Pr,
    zr.min = Cr,
    zr.parsingFlags = Sn,
    zr.set = N,
    zr.startOf = hn,
    zr.subtract = jr,
    zr.toArray = yn,
    zr.toObject = gn,
    zr.toDate = _n,
    zr.toISOString = sn,
    zr.toJSON = vn,
    zr.toString = nn,
    zr.unix = pn,
    zr.valueOf = mn,
    zr.creationData = Mn,
    zr.year = dr,
    zr.isLeapYear = _e,
    zr.weekYear = xn,
    zr.isoWeekYear = bn,
    zr.quarter = zr.quarters = Pn,
    zr.month = ue,
    zr.daysInMonth = ce,
    zr.week = zr.weeks = be,
    zr.isoWeek = zr.isoWeeks = Ye,
    zr.weeksInYear = Tn,
    zr.isoWeeksInYear = Yn,
    zr.date = Ur,
    zr.day = zr.days = We,
    zr.weekday = qe,
    zr.isoWeekday = je,
    zr.dayOfYear = Rn,
    zr.hour = zr.hours = Sr,
    zr.minute = zr.minutes = Er,
    zr.second = zr.seconds = Fr,
    zr.millisecond = zr.milliseconds = Nr,
    zr.utcOffset = Tt,
    zr.utc = Ct,
    zr.local = Pt,
    zr.parseZone = Rt,
    zr.hasAlignedHourOffset = Lt,
    zr.isDST = Ht,
    zr.isLocal = qt,
    zr.isUtcOffset = jt,
    zr.isUtc = At,
    zr.isUTC = At,
    zr.zoneAbbr = Hn,
    zr.zoneName = Wn,
    zr.dates = k("dates accessor is deprecated. Use date instead.", Ur),
    zr.months = k("months accessor is deprecated. Use month instead", ue),
    zr.years = k("years accessor is deprecated. Use year instead", dr),
    zr.zone = k("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", Ot),
    zr.isDSTShifted = k("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", Wt);
    var Vr = zr
      , Ir = Y.prototype;
    Ir.calendar = T,
    Ir.longDateFormat = O,
    Ir.invalidDate = C,
    Ir.ordinal = P,
    Ir.preparse = An,
    Ir.postformat = An,
    Ir.relativeTime = R,
    Ir.pastFuture = L,
    Ir.set = x,
    Ir.months = re,
    Ir.monthsShort = ie,
    Ir.monthsParse = oe,
    Ir.monthsRegex = he,
    Ir.monthsShortRegex = de,
    Ir.week = Me,
    Ir.firstDayOfYear = xe,
    Ir.firstDayOfWeek = De,
    Ir.weekdays = Ce,
    Ir.weekdaysMin = Re,
    Ir.weekdaysShort = Pe,
    Ir.weekdaysParse = He,
    Ir.weekdaysRegex = Ae,
    Ir.weekdaysShortRegex = Ue,
    Ir.weekdaysMinRegex = Ee,
    Ir.isPM = Ie,
    Ir.meridiem = Ze,
    Je("en", {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function(e) {
            var t = e % 10
              , n = 1 === v(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th";
            return e + n
        }
    }),
    e.lang = k("moment.lang is deprecated. Use moment.locale instead.", Je),
    e.langData = k("moment.langData is deprecated. Use moment.localeData instead.", et);
    var Zr = Math.abs
      , Xr = ss("ms")
      , $r = ss("s")
      , Br = ss("m")
      , Jr = ss("h")
      , Qr = ss("d")
      , Kr = ss("w")
      , ei = ss("M")
      , ti = ss("y")
      , ni = is("milliseconds")
      , si = is("seconds")
      , ri = is("minutes")
      , ii = is("hours")
      , ai = is("days")
      , oi = is("months")
      , li = is("years")
      , ui = Math.round
      , ci = {
        s: 45,
        m: 45,
        h: 22,
        d: 26,
        M: 11
    }
      , di = Math.abs
      , hi = St.prototype;
    hi.abs = Zn,
    hi.add = $n,
    hi.subtract = Bn,
    hi.as = ts,
    hi.asMilliseconds = Xr,
    hi.asSeconds = $r,
    hi.asMinutes = Br,
    hi.asHours = Jr,
    hi.asDays = Qr,
    hi.asWeeks = Kr,
    hi.asMonths = ei,
    hi.asYears = ti,
    hi.valueOf = ns,
    hi._bubble = Qn,
    hi.get = rs,
    hi.milliseconds = ni,
    hi.seconds = si,
    hi.minutes = ri,
    hi.hours = ii,
    hi.days = ai,
    hi.weeks = as,
    hi.months = oi,
    hi.years = li,
    hi.humanize = ds,
    hi.toISOString = hs,
    hi.toString = hs,
    hi.toJSON = hs,
    hi.locale = cn,
    hi.localeData = dn,
    hi.toIsoString = k("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", hs),
    hi.lang = Ar,
    V("X", 0, 0, "unix"),
    V("x", 0, 0, "valueOf"),
    B("x", zs),
    B("X", Zs),
    ee("X", function(e, t, n) {
        n._d = new Date(1e3 * parseFloat(e, 10))
    }),
    ee("x", function(e, t, n) {
        n._d = new Date(v(e))
    }),
    e.version = "2.15.1",
    t(yt),
    e.fn = Vr,
    e.min = vt,
    e.max = wt,
    e.now = Rr,
    e.utc = u,
    e.unix = qn,
    e.months = Gn,
    e.isDate = i,
    e.locale = Je,
    e.invalid = f,
    e.duration = Ut,
    e.isMoment = y,
    e.weekdays = zn,
    e.parseZone = jn,
    e.localeData = et,
    e.isDuration = kt,
    e.monthsShort = Nn,
    e.weekdaysMin = In,
    e.defineLocale = Qe,
    e.updateLocale = Ke,
    e.locales = tt,
    e.weekdaysShort = Vn,
    e.normalizeUnits = W,
    e.relativeTimeRounding = us,
    e.relativeTimeThreshold = cs,
    e.calendarFormat = Vt,
    e.prototype = Vr;
    var fi = e;
    return fi
});
var Utils;
Utils = {
    log: function(e) {
        window.console && console.log && console.log(e)
    },
    forEach: function(e, t, n) {
        for (var s = 0; s < e.length; s++)
            t.call(n, s, e[s])
    },
    each: function(e, t) {
        return Array.prototype.forEach.call(e, t),
        e
    },
    listener: function(e, t, n) {
        e.addEventListener(t, n, null )
    },
    inView: function(e) {
        var t = e.getBoundingClientRect().top
          , n = (e.getBoundingClientRect().bottom,
        t <= window.innerHeight - 200);
        return n
    },
    ticker: function(e, t) {
        window.setInterval(e, t)
    },
    validEmail: function(e) {
        var t = /\S+@([\w-]+\.)+[\w-]+$/;
        return t.test(e)
    }
};
var All;
All = function() {
    function e() {
        var e = Modernizr.touchevents;
        return e
    }
    var t = e();
    return {
        isMobile: t
    }
}();
var Nav;
Nav = function() {
    function e(e) {
        e.preventDefault(),
        o.classList.contains(l) ? (o.classList.remove(l),
        a.classList.remove(l)) : (o.classList.add(l),
        a.classList.add(l))
    }
    function t() {
        n(),
        i >= 770 && o.classList.contains(l) && (o.classList.remove(l),
        a.classList.remove(l))
    }
    function n(e) {
        return i = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
        770 >= i ? o.classList.add(u) : o.classList.remove(u),
        i
    }
    function s() {
        o && (n(),
        window.addEventListener("resize", t, !1),
        Utils.listener(a, "click", e))
    }
    function r() {
        s()
    }
    var i, a = document.querySelector(".mobile-toggle"), o = document.querySelector(".global-nav"), l = (document.querySelectorAll(".global-nav li a"),
    "active"), u = "is-mobile";
    return {
        init: r
    }
}();
var Page;
Page = function() {
    function e() {
        for (var e = 0; e < y.length; e++)
            Utils.inView(y[e]) && t(y[e])
    }
    function t(e) {
        e.classList.add("in-view");
        var t = document.querySelectorAll(".in-view");
        t.length == g && (clearInterval(v),
        clearTimeout(w))
    }
    function n() {
        d = document.querySelector(".cover"),
        u = document.querySelector(".header"),
        c = d.offsetHeight
    }
    function s() {
        var e = document.body.scrollTop;
        e >= c - 40 && !p && (p = !0,
        u.classList.add("header-fill")),
        c - 40 >= e && p && (p = !1,
        u.classList.remove("header-fill"))
    }
    function r() {
        clearInterval(v),
        Utils.each(_, function(e) {
            e.classList.add("in-view")
        })
    }
    function i() {
        var e = window.pageYOffset || document.documentElement.scrollTop
          , t = "translateY(" + e / 7.786453791 + "px)"
          , t = "translateY(" + e / 5.786453791 + "px)";
        f.style.webkitTransform = t,
        f.style.MozTransform = t,
        f.style.msTransform = t,
        f.style.OTransform = t,
        f.style.transform = t
    }
    function a() {
        var e = window.innerHeight;
        h.style.height = .9 * e + "px"
    }
    function o() {
        if (document.querySelector(".home") && (window.addEventListener("scroll", s),
        n()),
        f) {
            window.addEventListener("scroll", s),
            n(),
            Modernizr.touchevents || window.addEventListener("scroll", i);
            var e = m.getAttribute("src")
              , t = document.createElement("img");
            t.onload = function() {
                f.style.backgroundImage = "url(" + e + ")",
                f.classList.add("cover-loaded"),
                m.remove(),
                setTimeout(function() {
                    _ && Utils.each(_, function(e) {
                        y.push(e)
                    })
                }, 250)
            }
            ,
            t.src = e
        } else
            _ && Utils.each(_, function(e) {
                y.push(e)
            });
        if (window.addEventListener("keyup", function(e) {
            var t = e.target || e.srcElement;
            "INPUT" != t.tagName.toUpperCase() && (83 == e.keyCode || 83 == e.which || "s" == e.key) && setTimeout(function() {
                window.location = "/signin"
            }, 250)
        }),
        !Modernizr.cssvhunit && h && (a(),
        window.addEventListener("resize", a, null )),
        !Modernizr.svg) {
            var r = document.querySelector(".logo a");
            r.innerHTML = '<img class="logo-icon" src="/assets/images/simple-logo.png" alt="Simple" />'
        }
    }
    function l() {
        S && (S.innerHTML = M),
        o()
    }
    var u, c, d = document.querySelector(".header-full"), h = document.querySelector(".cover"), f = document.querySelector(".cover-image"), m = document.querySelector(".cover-image-pre"), p = (document.querySelector(".cover-lockup"),
    document.querySelectorAll(".plx-item"),
    !1), _ = document.querySelectorAll(".anmte"), y = [], g = _.length, v = setInterval(e, 400), w = setTimeout(r, 2e4), S = (document.querySelectorAll("input"),
    document.querySelector("span[data-date-weekly]")), k = moment().weekday(-7), M = k.add(7, "day").format("M/D/YYYY");
    return {
        init: l
    }
}();
var Policies;
Policies = function() {
    function e(e) {
        this.classList.contains(activeClass) ? (this.classList.remove(activeClass),
        Utils.each(r, function(e) {
            e.classList.remove(activeClass)
        })) : this.classList.add(activeClass),
        i.classList.contains(activeClass) ? i.classList.remove(activeClass) : i.classList.add(activeClass)
    }
    function t(e) {
        var t = this;
        Utils.each(r, function(e) {
            e == t && t.classList.contains(activeClass) ? e.classList.remove(activeClass) : e == t ? e.classList.add(activeClass) : e.classList.remove(activeClass)
        })
    }
    function n() {
        All.isMobile && r.length && (Utils.each(r, function(e) {
            e.addEventListener("click", t, null )
        }),
        a.addEventListener("click", e, null ))
    }
    function s() {
        n()
    }
    var r = document.querySelectorAll(".policy-category-name")
      , i = document.querySelector(".policy-nav-container")
      , a = document.querySelector(".policies-nav-title");
    return activeClass = "active",
    {
        init: s
    }
}(),
!function(e, t, n) {
    "undefined" != typeof module && module.exports ? module.exports = n() : "function" == typeof define && define.amd ? define(n) : t[e] = n()
}("reqwest", this, function() {
    function succeed(e) {
        var t = protocolRe.exec(e.url);
        return t = t && t[1] || context.location.protocol,
        httpsRe.test(t) ? twoHundo.test(e.request.status) : !!e.request.response
    }
    function handleReadyState(e, t, n) {
        return function() {
            return e._aborted ? n(e.request) : e._timedOut ? n(e.request, "Request is aborted: timeout") : void (e.request && 4 == e.request[readyState] && (e.request.onreadystatechange = noop,
            succeed(e) ? t(e.request) : n(e.request)))
        }
    }
    function setHeaders(e, t) {
        var n, s = t.headers || {};
        s.Accept = s.Accept || defaultHeaders.accept[t.type] || defaultHeaders.accept["*"];
        var r = "undefined" != typeof FormData && t.data instanceof FormData;
        t.crossOrigin || s[requestedWith] || (s[requestedWith] = defaultHeaders.requestedWith),
        s[contentType] || r || (s[contentType] = t.contentType || defaultHeaders.contentType);
        for (n in s)
            s.hasOwnProperty(n) && "setRequestHeader"in e && e.setRequestHeader(n, s[n])
    }
    function setCredentials(e, t) {
        "undefined" != typeof t.withCredentials && "undefined" != typeof e.withCredentials && (e.withCredentials = !!t.withCredentials)
    }
    function generalCallback(e) {
        lastValue = e
    }
    function urlappend(e, t) {
        return e + (/\?/.test(e) ? "&" : "?") + t
    }
    function handleJsonp(e, t, n, s) {
        var r = uniqid++
          , i = e.jsonpCallback || "callback"
          , a = e.jsonpCallbackName || reqwest.getcallbackPrefix(r)
          , o = new RegExp("((^|\\?|&)" + i + ")=([^&]+)")
          , l = s.match(o)
          , u = doc.createElement("script")
          , c = 0
          , d = -1 !== navigator.userAgent.indexOf("MSIE 10.0");
        return l ? "?" === l[3] ? s = s.replace(o, "$1=" + a) : a = l[3] : s = urlappend(s, i + "=" + a),
        context[a] = generalCallback,
        u.type = "text/javascript",
        u.src = s,
        u.async = !0,
        "undefined" == typeof u.onreadystatechange || d || (u.htmlFor = u.id = "_reqwest_" + r),
        u.onload = u.onreadystatechange = function() {
            return u[readyState] && "complete" !== u[readyState] && "loaded" !== u[readyState] || c ? !1 : (u.onload = u.onreadystatechange = null ,
            u.onclick && u.onclick(),
            t(lastValue),
            lastValue = void 0,
            head.removeChild(u),
            void (c = 1))
        }
        ,
        head.appendChild(u),
        {
            abort: function() {
                u.onload = u.onreadystatechange = null ,
                n({}, "Request is aborted: timeout", {}),
                lastValue = void 0,
                head.removeChild(u),
                c = 1
            }
        }
    }
    function getRequest(e, t) {
        var n, s = this.o, r = (s.method || "GET").toUpperCase(), i = "string" == typeof s ? s : s.url, a = s.processData !== !1 && s.data && "string" != typeof s.data ? reqwest.toQueryString(s.data) : s.data || null , o = !1;
        return "jsonp" != s.type && "GET" != r || !a || (i = urlappend(i, a),
        a = null ),
        "jsonp" == s.type ? handleJsonp(s, e, t, i) : (n = s.xhr && s.xhr(s) || xhr(s),
        n.open(r, i, s.async === !1 ? !1 : !0),
        setHeaders(n, s),
        setCredentials(n, s),
        context[xDomainRequest] && n instanceof context[xDomainRequest] ? (n.onload = e,
        n.onerror = t,
        n.onprogress = function() {}
        ,
        o = !0) : n.onreadystatechange = handleReadyState(this, e, t),
        s.before && s.before(n),
        o ? setTimeout(function() {
            n.send(a)
        }, 200) : n.send(a),
        n)
    }
    function Reqwest(e, t) {
        this.o = e,
        this.fn = t,
        init.apply(this, arguments)
    }
    function setType(e) {
        return null === e ? void 0 : e.match("json") ? "json" : e.match("javascript") ? "js" : e.match("text") ? "html" : e.match("xml") ? "xml" : void 0
    }
    function init(o, fn) {
        function complete(e) {
            for (o.timeout && clearTimeout(self.timeout),
            self.timeout = null ; self._completeHandlers.length > 0; )
                self._completeHandlers.shift()(e)
        }
        function success(resp) {
            var type = o.type || resp && setType(resp.getResponseHeader("Content-Type"));
            resp = "jsonp" !== type ? self.request : resp;
            var filteredResponse = globalSetupOptions.dataFilter(resp.responseText, type)
              , r = filteredResponse;
            try {
                resp.responseText = r
            } catch (e) {}
            if (r)
                switch (type) {
                case "json":
                    try {
                        resp = context.JSON ? context.JSON.parse(r) : eval("(" + r + ")")
                    } catch (err) {
                        return error(resp, "Could not parse JSON in response", err)
                    }
                    break;
                case "js":
                    resp = eval(r);
                    break;
                case "html":
                    resp = r;
                    break;
                case "xml":
                    resp = resp.responseXML && resp.responseXML.parseError && resp.responseXML.parseError.errorCode && resp.responseXML.parseError.reason ? null : resp.responseXML
                }
            for (self._responseArgs.resp = resp,
            self._fulfilled = !0,
            fn(resp),
            self._successHandler(resp); self._fulfillmentHandlers.length > 0; )
                resp = self._fulfillmentHandlers.shift()(resp);
            complete(resp)
        }
        function timedOut() {
            self._timedOut = !0,
            self.request.abort()
        }
        function error(e, t, n) {
            for (e = self.request,
            self._responseArgs.resp = e,
            self._responseArgs.msg = t,
            self._responseArgs.t = n,
            self._erred = !0; self._errorHandlers.length > 0; )
                self._errorHandlers.shift()(e, t, n);
            complete(e)
        }
        this.url = "string" == typeof o ? o : o.url,
        this.timeout = null ,
        this._fulfilled = !1,
        this._successHandler = function() {}
        ,
        this._fulfillmentHandlers = [],
        this._errorHandlers = [],
        this._completeHandlers = [],
        this._erred = !1,
        this._responseArgs = {};
        var self = this;
        fn = fn || function() {}
        ,
        o.timeout && (this.timeout = setTimeout(function() {
            timedOut()
        }, o.timeout)),
        o.success && (this._successHandler = function() {
            o.success.apply(o, arguments)
        }
        ),
        o.error && this._errorHandlers.push(function() {
            o.error.apply(o, arguments)
        }),
        o.complete && this._completeHandlers.push(function() {
            o.complete.apply(o, arguments)
        }),
        this.request = getRequest.call(this, success, error)
    }
    function reqwest(e, t) {
        return new Reqwest(e,t)
    }
    function normalize(e) {
        return e ? e.replace(/\r?\n/g, "\r\n") : ""
    }
    function serial(e, t) {
        var n, s, r, i, a = e.name, o = e.tagName.toLowerCase(), l = function(e) {
            e && !e.disabled && t(a, normalize(e.attributes.value && e.attributes.value.specified ? e.value : e.text))
        };
        if (!e.disabled && a)
            switch (o) {
            case "input":
                /reset|button|image|file/i.test(e.type) || (n = /checkbox/i.test(e.type),
                s = /radio/i.test(e.type),
                r = e.value,
                (!(n || s) || e.checked) && t(a, normalize(n && "" === r ? "on" : r)));
                break;
            case "textarea":
                t(a, normalize(e.value));
                break;
            case "select":
                if ("select-one" === e.type.toLowerCase())
                    l(e.selectedIndex >= 0 ? e.options[e.selectedIndex] : null );
                else
                    for (i = 0; e.length && i < e.length; i++)
                        e.options[i].selected && l(e.options[i])
            }
    }
    function eachFormElement() {
        var e, t, n = this, s = function(e, t) {
            var s, r, i;
            for (s = 0; s < t.length; s++)
                for (i = e[byTag](t[s]),
                r = 0; r < i.length; r++)
                    serial(i[r], n)
        };
        for (t = 0; t < arguments.length; t++)
            e = arguments[t],
            /input|select|textarea/i.test(e.tagName) && serial(e, n),
            s(e, ["input", "select", "textarea"])
    }
    function serializeQueryString() {
        return reqwest.toQueryString(reqwest.serializeArray.apply(null , arguments))
    }
    function serializeHash() {
        var e = {};
        return eachFormElement.apply(function(t, n) {
            t in e ? (e[t] && !isArray(e[t]) && (e[t] = [e[t]]),
            e[t].push(n)) : e[t] = n
        }, arguments),
        e
    }
    function buildParams(e, t, n, s) {
        var r, i, a, o = /\[\]$/;
        if (isArray(t))
            for (i = 0; t && i < t.length; i++)
                a = t[i],
                n || o.test(e) ? s(e, a) : buildParams(e + "[" + ("object" == typeof a ? i : "") + "]", a, n, s);
        else if (t && "[object Object]" === t.toString())
            for (r in t)
                buildParams(e + "[" + r + "]", t[r], n, s);
        else
            s(e, t)
    }
    var context = this;
    if ("window"in context)
        var doc = document
          , byTag = "getElementsByTagName"
          , head = doc[byTag]("head")[0];
    else {
        var XHR2;
        try {
            XHR2 = require("xhr2")
        } catch (ex) {
            throw new Error("Peer dependency `xhr2` required! Please npm install xhr2")
        }
    }
    var httpsRe = /^http/, protocolRe = /(^\w+):\/\//, twoHundo = /^(20\d|1223)$/, readyState = "readyState", contentType = "Content-Type", requestedWith = "X-Requested-With", uniqid = 0, callbackPrefix = "reqwest_" + +new Date, lastValue, xmlHttpRequest = "XMLHttpRequest", xDomainRequest = "XDomainRequest", noop = function() {}, isArray = "function" == typeof Array.isArray ? Array.isArray : function(e) {
        return e instanceof Array
    }
    , defaultHeaders = {
        contentType: "application/x-www-form-urlencoded",
        requestedWith: xmlHttpRequest,
        accept: {
            "*": "text/javascript, text/html, application/xml, text/xml, */*",
            xml: "application/xml, text/xml",
            html: "text/html",
            text: "text/plain",
            json: "application/json, text/javascript",
            js: "application/javascript, text/javascript"
        }
    }, xhr = function(e) {
        if (e.crossOrigin === !0) {
            var t = context[xmlHttpRequest] ? new XMLHttpRequest : null ;
            if (t && "withCredentials"in t)
                return t;
            if (context[xDomainRequest])
                return new XDomainRequest;
            throw new Error("Browser does not support cross-origin requests")
        }
        return context[xmlHttpRequest] ? new XMLHttpRequest : XHR2 ? new XHR2 : new ActiveXObject("Microsoft.XMLHTTP")
    }, globalSetupOptions = {
        dataFilter: function(e) {
            return e
        }
    };
    return Reqwest.prototype = {
        abort: function() {
            this._aborted = !0,
            this.request.abort()
        },
        retry: function() {
            init.call(this, this.o, this.fn)
        },
        then: function(e, t) {
            return e = e || function() {}
            ,
            t = t || function() {}
            ,
            this._fulfilled ? this._responseArgs.resp = e(this._responseArgs.resp) : this._erred ? t(this._responseArgs.resp, this._responseArgs.msg, this._responseArgs.t) : (this._fulfillmentHandlers.push(e),
            this._errorHandlers.push(t)),
            this
        },
        always: function(e) {
            return this._fulfilled || this._erred ? e(this._responseArgs.resp) : this._completeHandlers.push(e),
            this
        },
        fail: function(e) {
            return this._erred ? e(this._responseArgs.resp, this._responseArgs.msg, this._responseArgs.t) : this._errorHandlers.push(e),
            this
        },
        "catch": function(e) {
            return this.fail(e)
        }
    },
    reqwest.serializeArray = function() {
        var e = [];
        return eachFormElement.apply(function(t, n) {
            e.push({
                name: t,
                value: n
            })
        }, arguments),
        e
    }
    ,
    reqwest.serialize = function() {
        if (0 === arguments.length)
            return "";
        var e, t, n = Array.prototype.slice.call(arguments, 0);
        return e = n.pop(),
        e && e.nodeType && n.push(e) && (e = null ),
        e && (e = e.type),
        t = "map" == e ? serializeHash : "array" == e ? reqwest.serializeArray : serializeQueryString,
        t.apply(null , n)
    }
    ,
    reqwest.toQueryString = function(e, t) {
        var n, s, r = t || !1, i = [], a = encodeURIComponent, o = function(e, t) {
            t = "function" == typeof t ? t() : null == t ? "" : t,
            i[i.length] = a(e) + "=" + a(t)
        };
        if (isArray(e))
            for (s = 0; e && s < e.length; s++)
                o(e[s].name, e[s].value);
        else
            for (n in e)
                e.hasOwnProperty(n) && buildParams(n, e[n], r, o);
        return i.join("&").replace(/%20/g, "+")
    }
    ,
    reqwest.getcallbackPrefix = function() {
        return callbackPrefix
    }
    ,
    reqwest.compat = function(e, t) {
        return e && (e.type && (e.method = e.type) && delete e.type,
        e.dataType && (e.type = e.dataType),
        e.jsonpCallback && (e.jsonpCallbackName = e.jsonpCallback) && delete e.jsonpCallback,
        e.jsonp && (e.jsonpCallback = e.jsonp)),
        new Reqwest(e,t)
    }
    ,
    reqwest.ajaxSetup = function(e) {
        e = e || {};
        for (var t in e)
            globalSetupOptions[t] = e[t]
    }
    ,
    reqwest
});
var Careers;
Careers = function() {
    function e(e) {
        var t = e.title
          , n = e.absolute_url;
        return '<li class="large-type"><a href="' + n + '" target="_blank">' + t + "</a></li>"
    }
    function t(t, n) {
        var s = "";
        s += '<div class="careers-department">',
        s += '<h5 class="">' + t.name + "</h5>",
        s += '<ul class="clean-list">';
        for (var r = 0; r < t.jobs.length; r++)
            s += e(t.jobs[r]);
        return s += "</ul>",
        s += "</div>",
        a += s
    }
    function n(e) {
        for (var n = e.departments, s = 0; s < n.length; s++) {
            var r = n[s].jobs.length ? !0 : !1
              , i = !1;
            i = "No Department" == n[s].name ? !0 : !1,
            r && !i && (t(n[s]),
            0 == c && (c = !0))
        }
        0 == c && (a += l),
        o.innerHTML = a
    }
    function s() {
        reqwest({
            url: u,
            method: "GET",
            crossOrigin: !0,
            success: function(e) {
                n(e)
            },
            error: function() {
                o.innerHTML = "<h4>There was an Error</h4>"
            }
        })
    }
    function r() {
        var e = window.location.pathname;
        e.match(/\/careers/) && s()
    }
    function i() {
        r()
    }
    var a = ""
      , o = document.querySelector(".careers-list")
      , l = "<h4>There's no current openings</h4><p>Keep checking back for a position that might be perfect for you!</p>"
      , u = "https://api.greenhouse.io/v1/boards/simplefinance/embed/departments"
      , c = !1;
    return {
        init: i
    }
}();
var Tracking;
Tracking = function() {
    function e() {
        var e, t, n, s, l, u, c = window.pageYOffset || document.documentElement.scrollTop;
        l = this.innerHeight,
        e = document.body.scrollHeight,
        t = e / 2,
        n = e / 4,
        s = t + n,
        u = c + l,
        u !== e || r ? u > s && !i ? (analytics.track("Scrolling", {
            label: "75%"
        }),
        i = !0) : u > t && !a ? (analytics.track("Scrolling", {
            label: "50%"
        }),
        a = !0) : u > n && !o && (analytics.track("Scrolling", {
            label: "25%"
        }),
        o = !0) : (analytics.track("Scrolling", {
            label: "100%"
        }),
        r = !0)
    }
    function t(e) {
        e.preventDefault();
        var t = this
          , n = (JSON.parse(t.dataset.track),
        this.getAttribute("href"));
        analytics.track("Started Application", {
            referrer: document.referrer
        }),
        setTimeout(function() {
            window.location = n
        }, 100)
    }
    function n() {
        return window.friends ? !1 : (Utils.each(l, function(e) {
            e.addEventListener("click", t)
        }),
        window.addEventListener("scroll", e),
        void (u && u.addEventListener("click", function(e) {
            e.preventDefault();
            var t = this.getAttribute("href");
            analytics.track("Clicked Log In", {
                referrer: document.referrer
            }),
            setTimeout(function() {
                window.location = t
            }, 100)
        })))
    }
    function s() {
        n()
    }
    var r, i, a, o, l = document.querySelectorAll("[data-track]"), u = document.querySelector(".login");
    document.body.scrollHeight;
    return {
        init: s
    }
}(),
function() {
    Nav.init(),
    Page.init(),
    Policies.init(),
    Careers.init(),
    Tracking.init()
}();
