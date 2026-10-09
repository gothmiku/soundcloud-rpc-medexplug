/**
 * @name SoundCloud Downloader
 * @author NotTobi; adapted for soundcloud-rpc
 * @version 1.16.0-plugin.1
 * @description Adds download buttons and settings to SoundCloud pages.
 * @license MIT
 * @homepage https://github.com/NotTobi/soundcloud-dl
 */

module.exports = {
  contentScript: () => String.raw`/*!
 * SoundCloud Downloader - single file plugin build (v1.16.0-plugin.1)
 * Port of the browser extension https://github.com/NotTobi/soundcloud-dl
 * MIT License, Copyright (c) NotTobi.
 *
 * Bundled third-party code:
 *   browser-id3-writer 4.4.0 (MIT), wavefile 11.0.0 (MIT), global 4.4.0 (MIT),
 *   @babel/runtime (MIT), @videojs/vhs-utils 3.0.5 (MIT),
 *   m3u8-parser 4.8.0 (Apache-2.0, https://github.com/videojs/m3u8-parser)
 */
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/browser-id3-writer/dist/browser-id3-writer.js
  var require_browser_id3_writer = __commonJS({
    "node_modules/browser-id3-writer/dist/browser-id3-writer.js"(exports, module) {
      !(function(e, t) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).ID3Writer = t();
      })(exports, function() {
        "use strict";
        function a(e) {
          return String(e).split("").map(function(e2) {
            return e2.charCodeAt(0);
          });
        }
        function o(e) {
          return new Uint8Array(a(e));
        }
        function u(e) {
          var t = new Uint8Array(2 * e.length);
          return new Uint16Array(t.buffer).set(a(e)), t;
        }
        return (function() {
          var e = t.prototype;
          function t(e2) {
            if (!(e2 && "object" == typeof e2 && "byteLength" in e2)) throw new Error("First argument should be an instance of ArrayBuffer or Buffer");
            this.arrayBuffer = e2, this.padding = 4096, this.frames = [], this.url = "";
          }
          return e._setIntegerFrame = function(e2, t2) {
            var a2 = parseInt(t2, 10);
            this.frames.push({ name: e2, value: a2, size: 11 + a2.toString().length });
          }, e._setStringFrame = function(e2, t2) {
            var a2 = t2.toString();
            this.frames.push({ name: e2, value: a2, size: 13 + 2 * a2.length });
          }, e._setPictureFrame = function(e2, t2, a2, r) {
            var n, s, i, c = (function(e3) {
              if (!e3 || !e3.length) return null;
              if (255 === e3[0] && 216 === e3[1] && 255 === e3[2]) return "image/jpeg";
              if (137 === e3[0] && 80 === e3[1] && 78 === e3[2] && 71 === e3[3]) return "image/png";
              if (71 === e3[0] && 73 === e3[1] && 70 === e3[2]) return "image/gif";
              if (87 === e3[8] && 69 === e3[9] && 66 === e3[10] && 80 === e3[11]) return "image/webp";
              var t3 = 73 === e3[0] && 73 === e3[1] && 42 === e3[2] && 0 === e3[3], a3 = 77 === e3[0] && 77 === e3[1] && 0 === e3[2] && 42 === e3[3];
              return t3 || a3 ? "image/tiff" : 66 === e3[0] && 77 === e3[1] ? "image/bmp" : 0 === e3[0] && 0 === e3[1] && 1 === e3[2] && 0 === e3[3] ? "image/x-icon" : null;
            })(new Uint8Array(t2)), o2 = a2.toString();
            if (!c) throw new Error("Unknown picture MIME type");
            a2 || (r = false), this.frames.push({ name: "APIC", value: t2, pictureType: e2, mimeType: c, useUnicodeEncoding: r, description: o2, size: (n = t2.byteLength, s = c.length, i = o2.length, 11 + s + 1 + 1 + (r ? 2 + 2 * (i + 1) : i + 1) + n) });
          }, e._setLyricsFrame = function(e2, t2, a2) {
            var r, n, s = e2.split("").map(function(e3) {
              return e3.charCodeAt(0);
            }), i = t2.toString(), c = a2.toString();
            this.frames.push({ name: "USLT", value: c, language: s, description: i, size: (r = i.length, n = c.length, 16 + 2 * r + 2 + 2 + 2 * n) });
          }, e._setCommentFrame = function(e2, t2, a2) {
            var r, n, s = e2.split("").map(function(e3) {
              return e3.charCodeAt(0);
            }), i = t2.toString(), c = a2.toString();
            this.frames.push({ name: "COMM", value: c, language: s, description: i, size: (r = i.length, n = c.length, 16 + 2 * r + 2 + 2 + 2 * n) });
          }, e._setPrivateFrame = function(e2, t2) {
            var a2, r, n = e2.toString();
            this.frames.push({ name: "PRIV", value: t2, id: n, size: (a2 = n.length, r = t2.byteLength, 10 + a2 + 1 + r) });
          }, e._setUserStringFrame = function(e2, t2) {
            var a2, r, n = e2.toString(), s = t2.toString();
            this.frames.push({ name: "TXXX", description: n, value: s, size: (a2 = n.length, r = s.length, 13 + 2 * a2 + 2 + 2 + 2 * r) });
          }, e._setUrlLinkFrame = function(e2, t2) {
            var a2 = t2.toString();
            this.frames.push({ name: e2, value: a2, size: 10 + a2.length });
          }, e.setFrame = function(e2, t2) {
            switch (e2) {
              case "TPE1":
              case "TCOM":
              case "TCON":
                if (!Array.isArray(t2)) throw new Error(e2 + " frame value should be an array of strings");
                var a2 = "TCON" === e2 ? ";" : "/", r = t2.join(a2);
                this._setStringFrame(e2, r);
                break;
              case "TLAN":
              case "TIT1":
              case "TIT2":
              case "TIT3":
              case "TALB":
              case "TPE2":
              case "TPE3":
              case "TPE4":
              case "TRCK":
              case "TPOS":
              case "TMED":
              case "TPUB":
              case "TCOP":
              case "TKEY":
              case "TEXT":
              case "TSRC":
                this._setStringFrame(e2, t2);
                break;
              case "TBPM":
              case "TLEN":
              case "TDAT":
              case "TYER":
                this._setIntegerFrame(e2, t2);
                break;
              case "USLT":
                if (t2.language = t2.language || "eng", !("object" == typeof t2 && "description" in t2 && "lyrics" in t2)) throw new Error("USLT frame value should be an object with keys description and lyrics");
                if (t2.language && !t2.language.match(/[a-z]{3}/i)) throw new Error("Language must be coded following the ISO 639-2 standards");
                this._setLyricsFrame(t2.language, t2.description, t2.lyrics);
                break;
              case "APIC":
                if (!("object" == typeof t2 && "type" in t2 && "data" in t2 && "description" in t2)) throw new Error("APIC frame value should be an object with keys type, data and description");
                if (t2.type < 0 || 20 < t2.type) throw new Error("Incorrect APIC frame picture type");
                this._setPictureFrame(t2.type, t2.data, t2.description, !!t2.useUnicodeEncoding);
                break;
              case "TXXX":
                if (!("object" == typeof t2 && "description" in t2 && "value" in t2)) throw new Error("TXXX frame value should be an object with keys description and value");
                this._setUserStringFrame(t2.description, t2.value);
                break;
              case "WCOM":
              case "WCOP":
              case "WOAF":
              case "WOAR":
              case "WOAS":
              case "WORS":
              case "WPAY":
              case "WPUB":
                this._setUrlLinkFrame(e2, t2);
                break;
              case "COMM":
                if (t2.language = t2.language || "eng", !("object" == typeof t2 && "description" in t2 && "text" in t2)) throw new Error("COMM frame value should be an object with keys description and text");
                if (t2.language && !t2.language.match(/[a-z]{3}/i)) throw new Error("Language must be coded following the ISO 639-2 standards");
                this._setCommentFrame(t2.language, t2.description, t2.text);
                break;
              case "PRIV":
                if (!("object" == typeof t2 && "id" in t2 && "data" in t2)) throw new Error("PRIV frame value should be an object with keys id and data");
                this._setPrivateFrame(t2.id, t2.data);
                break;
              default:
                throw new Error("Unsupported frame " + e2);
            }
            return this;
          }, e.removeTag = function() {
            if (!(this.arrayBuffer.byteLength < 10)) {
              var e2, t2, a2 = new Uint8Array(this.arrayBuffer), r = a2[3], n = ((e2 = [a2[6], a2[7], a2[8], a2[9]])[0] << 21) + (e2[1] << 14) + (e2[2] << 7) + e2[3] + 10;
              if (!(73 !== (t2 = a2)[0] || 68 !== t2[1] || 51 !== t2[2] || r < 2 || 4 < r)) this.arrayBuffer = new Uint8Array(a2.subarray(n)).buffer;
            }
          }, e.addTag = function() {
            this.removeTag();
            var e2, t2, r = [255, 254], a2 = 10 + this.frames.reduce(function(e3, t3) {
              return e3 + t3.size;
            }, 0) + this.padding, n = new ArrayBuffer(this.arrayBuffer.byteLength + a2), s = new Uint8Array(n), i = 0, c = [];
            return c = [73, 68, 51, 3], s.set(c, i), i += c.length, i++, i++, c = [(e2 = a2 - 10) >>> 21 & (t2 = 127), e2 >>> 14 & t2, e2 >>> 7 & t2, e2 & t2], s.set(c, i), i += c.length, this.frames.forEach(function(e3) {
              var t3, a3;
              switch (c = o(e3.name), s.set(c, i), i += c.length, t3 = e3.size - 10, c = [t3 >>> 24 & (a3 = 255), t3 >>> 16 & a3, t3 >>> 8 & a3, t3 & a3], s.set(c, i), i += c.length, i += 2, e3.name) {
                case "WCOM":
                case "WCOP":
                case "WOAF":
                case "WOAR":
                case "WOAS":
                case "WORS":
                case "WPAY":
                case "WPUB":
                  c = o(e3.value), s.set(c, i), i += c.length;
                  break;
                case "TPE1":
                case "TCOM":
                case "TCON":
                case "TLAN":
                case "TIT1":
                case "TIT2":
                case "TIT3":
                case "TALB":
                case "TPE2":
                case "TPE3":
                case "TPE4":
                case "TRCK":
                case "TPOS":
                case "TKEY":
                case "TMED":
                case "TPUB":
                case "TCOP":
                case "TEXT":
                case "TSRC":
                  c = [1].concat(r), s.set(c, i), i += c.length, c = u(e3.value), s.set(c, i), i += c.length;
                  break;
                case "TXXX":
                case "USLT":
                case "COMM":
                  c = [1], "USLT" !== e3.name && "COMM" !== e3.name || (c = c.concat(e3.language)), c = c.concat(r), s.set(c, i), i += c.length, c = u(e3.description), s.set(c, i), i += c.length, c = [0, 0].concat(r), s.set(c, i), i += c.length, c = u(e3.value), s.set(c, i), i += c.length;
                  break;
                case "TBPM":
                case "TLEN":
                case "TDAT":
                case "TYER":
                  i++, c = o(e3.value), s.set(c, i), i += c.length;
                  break;
                case "PRIV":
                  c = o(e3.id), s.set(c, i), i += c.length, i++, s.set(new Uint8Array(e3.value), i), i += e3.value.byteLength;
                  break;
                case "APIC":
                  c = [e3.useUnicodeEncoding ? 1 : 0], s.set(c, i), i += c.length, c = o(e3.mimeType), s.set(c, i), i += c.length, c = [0, e3.pictureType], s.set(c, i), i += c.length, e3.useUnicodeEncoding ? (c = [].concat(r), s.set(c, i), i += c.length, c = u(e3.description), s.set(c, i), i += c.length, i += 2) : (c = o(e3.description), s.set(c, i), i += c.length, i++), s.set(new Uint8Array(e3.value), i), i += e3.value.byteLength;
              }
            }), i += this.padding, s.set(new Uint8Array(this.arrayBuffer), i), this.arrayBuffer = n;
          }, e.getBlob = function() {
            return new Blob([this.arrayBuffer], { type: "audio/mpeg" });
          }, e.getURL = function() {
            return this.url || (this.url = URL.createObjectURL(this.getBlob())), this.url;
          }, e.revokeURL = function() {
            URL.revokeObjectURL(this.url);
          }, t;
        })();
      });
    }
  });

  // node_modules/global/window.js
  var require_window = __commonJS({
    "node_modules/global/window.js"(exports, module) {
      var win;
      if (typeof window !== "undefined") {
        win = window;
      } else if (typeof global !== "undefined") {
        win = global;
      } else if (typeof self !== "undefined") {
        win = self;
      } else {
        win = {};
      }
      module.exports = win;
    }
  });

  // src/utils/logger.ts
  var Logger = class _Logger {
    constructor(source, minLogLevel) {
      this.source = source;
      this.minLogLevel = minLogLevel;
    }
    log(logLevel, message, ...args) {
      if (logLevel < this.minLogLevel) return;
      const timestamp = \`[\${(/* @__PURE__ */ new Date()).toJSON()}]\`;
      const source = \`[SOUNDCLOUD-DL:\${this.source}]\`;
      switch (logLevel) {
        case 3 /* Error */:
          console.error(timestamp, source, message, ...args);
          break;
        case 2 /* Warning */:
          console.warn(timestamp, source, message, ...args);
          break;
        case 1 /* Information */:
          console.info(timestamp, source, message, ...args);
          break;
        case 0 /* Debug */:
          console.debug(timestamp, source, message, ...args);
          break;
      }
    }
    logDebug(message, ...args) {
      this.log(0 /* Debug */, message, ...args);
    }
    logInfo(message, ...args) {
      this.log(1 /* Information */, message, ...args);
    }
    logWarn(message, ...args) {
      this.log(2 /* Warning */, message, ...args);
    }
    logError(message, ...args) {
      this.log(3 /* Error */, message, ...args);
    }
    static create(name, minLogLevel = 1 /* Information */) {
      return new _Logger(name, minLogLevel);
    }
  };

  // src/auth.ts
  var logger = Logger.create("Auth");
  var API_HOSTS = ["api-v2.soundcloud.com", "api-auth.soundcloud.com"];
  var authRegex = /OAuth (.+)/;
  var clientId = null;
  var oauthToken = null;
  function clearCredentials() {
    clientId = null;
    oauthToken = null;
  }
  function noteRequest(rawUrl, authorizationHeader) {
    let url;
    try {
      url = new URL(rawUrl, window.location.href);
    } catch {
      return;
    }
    if (!API_HOSTS.includes(url.hostname)) return;
    if (url.pathname === "/sign-out") {
      logger.logInfo("User logged out");
      clearCredentials();
      return;
    }
    const idFromUrl = url.searchParams.get("client_id");
    if (idFromUrl && idFromUrl !== clientId) {
      logger.logDebug("Captured client id");
      clientId = idFromUrl;
    }
    if (authorizationHeader) {
      const result = authRegex.exec(authorizationHeader);
      if (result && result.length > 1 && result[1] !== oauthToken) {
        logger.logDebug("Captured OAuth token");
        oauthToken = result[1];
      }
    }
  }
  function clientIdFromResourceTimings() {
    try {
      const entries = performance.getEntriesByType("resource");
      for (let i = entries.length - 1; i >= 0; i--) {
        const name = entries[i].name;
        if (!name.includes("soundcloud.com") || !name.includes("client_id=")) continue;
        const url = new URL(name);
        if (API_HOSTS.includes(url.hostname) && url.searchParams.get("client_id")) {
          return url.searchParams.get("client_id");
        }
      }
    } catch {
    }
    return null;
  }
  function clientIdFromHydration() {
    try {
      const hydration = window.__sc_hydration;
      if (Array.isArray(hydration)) {
        const entry = hydration.find((i) => i && i.hydratable === "apiClient");
        if (entry?.data?.id) return String(entry.data.id);
      }
    } catch {
    }
    return null;
  }
  function oauthTokenFromCookie() {
    try {
      const match = /(?:^|;\s*)oauth_token=([^;]+)/.exec(document.cookie);
      if (match) return decodeURIComponent(match[1]);
    } catch {
    }
    return null;
  }
  function getClientId() {
    if (!clientId) {
      clientId = clientIdFromResourceTimings() ?? clientIdFromHydration();
      if (clientId) logger.logInfo("Found client id via fallback");
    }
    return clientId;
  }
  function getOAuthToken() {
    if (!oauthToken) {
      oauthToken = oauthTokenFromCookie();
      if (oauthToken) logger.logInfo("Found OAuth token via fallback");
    }
    return oauthToken;
  }
  var hookedWindows = /* @__PURE__ */ new WeakSet();
  function readHeader(headers, name) {
    if (!headers) return null;
    if (typeof headers.get === "function") return headers.get(name);
    if (Array.isArray(headers)) {
      const entry = headers.find((i) => Array.isArray(i) && String(i[0]).toLowerCase() === name);
      return entry ? String(entry[1]) : null;
    }
    if (typeof headers === "object") {
      for (const key of Object.keys(headers)) {
        if (key.toLowerCase() === name) return String(headers[key]);
      }
    }
    return null;
  }
  function installRequestHooks(win) {
    if (hookedWindows.has(win)) return;
    hookedWindows.add(win);
    try {
      const originalFetch = win.fetch;
      if (typeof originalFetch === "function") {
        win.fetch = function(input, init) {
          try {
            const url = typeof input === "string" ? input : input?.href ?? input?.url ?? String(input);
            const auth = readHeader(init?.headers, "authorization") ?? readHeader(input?.headers, "authorization");
            noteRequest(url, auth);
          } catch {
          }
          return originalFetch.apply(this, arguments);
        };
      }
      const xhrProto = win.XMLHttpRequest?.prototype;
      if (xhrProto) {
        const originalOpen = xhrProto.open;
        const originalSetRequestHeader = xhrProto.setRequestHeader;
        xhrProto.open = function(method, url) {
          try {
            this.__scdlUrl = String(url);
            noteRequest(this.__scdlUrl);
          } catch {
          }
          return originalOpen.apply(this, arguments);
        };
        xhrProto.setRequestHeader = function(name, value) {
          try {
            if (String(name).toLowerCase() === "authorization" && this.__scdlUrl) {
              noteRequest(this.__scdlUrl, value);
            }
          } catch {
          }
          return originalSetRequestHeader.apply(this, arguments);
        };
      }
    } catch (error) {
      logger.logError("Failed to install request hooks", error);
    }
  }

  // src/domObserver.ts
  var DomObserver = class {
    constructor(win = window) {
      this.events = [];
      const MutationObserverCtor = win.MutationObserver ?? MutationObserver;
      this.observer = new MutationObserverCtor(
        (mutations) => mutations.forEach((mutation) => this.handleMutation(mutation))
      );
      this.logger = Logger.create("Observer");
    }
    start(node) {
      this.observer.observe(node, { subtree: true, attributes: true, childList: true });
      this.logger.logDebug("Started");
    }
    stop() {
      this.observer.disconnect();
      this.logger.logDebug("Stopped");
    }
    addEvent(event) {
      if (!event.selector) {
        this.logger.logWarn("Selector was not specified");
        return;
      }
      if (!event.callback) {
        this.logger.logWarn("Callback was not specified");
        return;
      }
      this.events.push(event);
      this.logger.logDebug("Event added", event);
    }
    removeEvent(name) {
      this.events = this.events.filter((event) => event.name !== name);
    }
    handleMutation(mutation) {
      const target = mutation.target;
      const newNodes = mutation.addedNodes ?? [];
      for (const event of this.events) {
        if (newNodes.length > 0) {
          this.handleNodes(newNodes, event);
        } else if (mutation.type === "attributes") {
          this.handleNodes([target], event, false);
        }
      }
    }
    handleNodes(nodes, event, recursive = true) {
      if (!nodes) return;
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (this.matchesSelectors(node, event.selector)) {
          event.callback(node);
        }
        if (recursive && node.childNodes?.length > 0) this.handleNodes(node.childNodes, event);
      }
    }
    // \`instanceof HTMLElement\` is realm specific and would be false for every element
    // of an iframe, so check the shape of the node instead
    matchesSelectors(element, selectors) {
      return element && element.nodeType === 1 && element.namespaceURI === "http://www.w3.org/1999/xhtml" && typeof element.matches === "function" && element.matches(selectors);
    }
  };

  // src/soundcloudApi.ts
  var SoundCloudApi = class {
    constructor() {
      this.baseUrl = "https://api-v2.soundcloud.com";
      this.logger = Logger.create("SoundCloudApi");
    }
    resolveUrl(url) {
      const reqUrl = \`\${this.baseUrl}/resolve?url=\${encodeURIComponent(url)}\`;
      return this.fetchJson(reqUrl);
    }
    getCurrentUser() {
      const url = \`\${this.baseUrl}/me\`;
      return this.fetchJson(url);
    }
    async getFollowedArtistIds(userId) {
      const url = \`\${this.baseUrl}/users/\${userId}/followings/ids\`;
      const data = await this.fetchJson(url);
      if (!data || !data.collection) return null;
      return data.collection;
    }
    async getTracks(trackIds) {
      const url = \`\${this.baseUrl}/tracks?ids=\${trackIds.join(",")}\`;
      this.logger.logInfo("Fetching tracks with Ids", { trackIds });
      const tracks = await this.fetchJson(url);
      return trackIds.reduce((acc, cur, index) => {
        acc[cur] = tracks[index];
        return acc;
      }, {});
    }
    convertMimeTypeToExtension(mimeType) {
      const baseMimeType = mimeType.split(";")[0].trim().toLowerCase();
      switch (baseMimeType) {
        case "audio/aac":
          return "aac";
        case "audio/mp4":
          return "m4a";
        case "audio/mpeg":
          return "mp3";
        case "audio/ogg":
          return "ogg";
        case "audio/opus":
          return "opus";
        case "audio/webm":
          return "webm";
        case "audio/wav":
        case "audio/x-wav":
        case "audio/wave":
        case "audio/x-pn-wav":
          return "wav";
        case "audio/flac":
        case "audio/x-flac":
          return "flac";
        case "audio/amr":
          return "amr";
        case "audio/3gpp":
          return "3gp";
        case "audio/3gpp2":
          return "3g2";
        case "audio/vnd.wave":
          return "wav";
        case "audio/x-ms-wma":
          return "wma";
        case "audio/vnd.rn-realaudio":
          return "ra";
        case "audio/basic":
          return "au";
        case "audio/mpegurl":
        case "application/x-mpegurl":
        case "application/vnd.apple.mpegurl":
          return "m3u8";
        default:
          return null;
      }
    }
    async getStreamUrl(url, trackAuthorization) {
      let reqUrl = url;
      if (trackAuthorization) {
        const separator = reqUrl.includes("?") ? "&" : "?";
        reqUrl = \`\${reqUrl}\${separator}track_authorization=\${encodeURIComponent(trackAuthorization)}\`;
      }
      const stream = await this.fetchJson(reqUrl);
      if (!stream || !stream.url) {
        this.logger.logError("Invalid stream response", stream);
        throw new Error("Invalid stream response");
      }
      return stream.url;
    }
    async getOriginalDownloadUrl(id) {
      const url = \`\${this.baseUrl}/tracks/\${id}/download\`;
      this.logger.logInfo("Getting original download URL for track with Id", id);
      const downloadObj = await this.fetchJson(url);
      if (!downloadObj || !downloadObj.redirectUri) {
        this.logger.logError("Invalid original file response", downloadObj);
        return null;
      }
      return downloadObj.redirectUri;
    }
    async downloadArtwork(artworkUrl) {
      const [buffer] = await this.fetchArrayBuffer(artworkUrl);
      return buffer;
    }
    downloadStream(streamUrl, reportProgress) {
      return this.fetchArrayBuffer(streamUrl, reportProgress);
    }
    async fetchArrayBuffer(url, reportProgress) {
      try {
        if (reportProgress) {
          return new Promise((resolve, reject) => {
            const req = new XMLHttpRequest();
            try {
              const handleProgress = (event) => {
                const progress = Math.round(event.loaded / event.total * 100);
                reportProgress(progress);
              };
              const handleReadyStateChanged = async (event) => {
                if (req.readyState == req.DONE) {
                  if (req.status !== 200 || !req.response) {
                    this.logger.logError(\`Failed to fetch ArrayBuffer (XHR) from: \${url}\`, {
                      status: req.status,
                      statusText: req.statusText,
                      hasResponse: !!req.response
                    });
                    resolve([null, null]);
                    return;
                  }
                  reportProgress(100);
                  const headers = new Headers();
                  const headerString = req.getAllResponseHeaders();
                  const headerMap = headerString.split("\r\n").filter((i) => !!i).map((i) => {
                    const [name, value] = i.split(": ");
                    return [name, value];
                  });
                  for (const [name, value] of headerMap) {
                    headers.set(name, value);
                  }
                  resolve([req.response, headers]);
                }
              };
              req.responseType = "arraybuffer";
              req.onprogress = handleProgress;
              req.onreadystatechange = handleReadyStateChanged;
              req.onerror = reject;
              req.open("GET", url, true);
              req.send(null);
            } catch (error) {
              this.logger.logError(\`Failed to fetch ArrayBuffer with progress from: \${url}\`, error);
              reject(error);
            }
          });
        }
        const resp = await fetch(url);
        if (!resp.ok) {
          this.logger.logError(\`Failed to fetch ArrayBuffer from: \${url}\`, {
            status: resp.status,
            statusText: resp.statusText
          });
          return [null, null];
        }
        const buffer = await resp.arrayBuffer();
        if (!buffer) {
          this.logger.logError(\`Empty ArrayBuffer body from: \${url}\`, {
            status: resp.status
          });
          return [null, null];
        }
        return [buffer, resp.headers];
      } catch (error) {
        this.logger.logError(\`Failed to fetch ArrayBuffer from: \${url}\`, error);
        return [null, null];
      }
    }
    // The extension's webRequest listeners added "client_id" and the OAuth header to every
    // api-v2 request. Without that layer, the credentials are attached here instead.
    withCredentials(url) {
      const parsed = new URL(url);
      const headers = {};
      if (parsed.hostname === "api-v2.soundcloud.com") {
        const clientId2 = getClientId();
        const oauthToken2 = getOAuthToken();
        if (clientId2 && !parsed.searchParams.has("client_id")) {
          parsed.searchParams.set("client_id", clientId2);
        }
        if (oauthToken2) {
          headers["Authorization"] = "OAuth " + oauthToken2;
        }
      }
      return { url: parsed.toString(), init: { headers } };
    }
    async fetchJson(url) {
      let resp;
      try {
        const { url: authedUrl, init } = this.withCredentials(url);
        resp = await fetch(authedUrl, init);
      } catch (error) {
        this.logger.logError(\`Failed to fetch JSON from: \${url}\`, error);
        return null;
      }
      if (!resp.ok) {
        let body;
        try {
          body = await resp.text();
        } catch {
        }
        this.logger.logError(\`Failed to fetch JSON from: \${url}\`, {
          status: resp.status,
          statusText: resp.statusText,
          body: body?.slice(0, 500)
        });
        return null;
      }
      try {
        const json = await resp.json();
        if (!json) {
          this.logger.logError(\`Empty JSON body from: \${url}\`, {
            status: resp.status
          });
          return null;
        }
        return json;
      } catch (error) {
        this.logger.logError(\`Failed to parse JSON from: \${url}\`, error);
        return null;
      }
    }
  };

  // src/metadataExtractor.ts
  function escapeStringRegexp(input) {
    return input.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
  }
  var RemixType = /* @__PURE__ */ ((RemixType2) => {
    RemixType2[RemixType2["Remix"] = 0] = "Remix";
    RemixType2[RemixType2["Flip"] = 1] = "Flip";
    RemixType2[RemixType2["Bootleg"] = 2] = "Bootleg";
    RemixType2[RemixType2["Mashup"] = 3] = "Mashup";
    RemixType2[RemixType2["Edit"] = 4] = "Edit";
    return RemixType2;
  })(RemixType || {});
  function getRemixTypeFromString(input) {
    const loweredInput = input.toLowerCase().trim();
    switch (loweredInput) {
      case "flip":
        return 1 /* Flip */;
      case "bootleg":
        return 2 /* Bootleg */;
      case "mashup":
        return 3 /* Mashup */;
      case "edit":
        return 4 /* Edit */;
      case "remix":
      default:
        return 0 /* Remix */;
    }
  }
  function stableSort(input, prop) {
    const storedPositions = input.map((data, index) => ({
      data,
      index
    }));
    return storedPositions.sort((a, b) => {
      if (a.data[prop] < b.data[prop]) return -1;
      if (a.data[prop] > b.data[prop]) return 1;
      return a.index - b.index;
    }).map((i) => i.data);
  }
  var MetadataExtractor = class _MetadataExtractor {
    constructor(title, username, userPermalink) {
      this.title = title;
      this.username = username;
      this.userPermalink = userPermalink;
    }
    static {
      this.titleSeparators = ["-", "\u2013", "\u2014", "~"];
    }
    static {
      this.featureSeparators = ["featuring", "feat.", "feat", "ft.", " ft ", "w/", " w /", " w ", "+"];
    }
    static {
      this.combiningFeatureSeparators = [..._MetadataExtractor.featureSeparators, ", ", " & ", " x "];
    }
    static {
      this.remixIndicators = ["remix", "flip", "bootleg", "mashup", "edit"];
    }
    static {
      this.producerIndicators = [
        "prod. by ",
        "prod by ",
        "prod. ",
        "p. ",
        "prod "
      ];
    }
    static {
      this.promotions = ["free download", "video in description", "video in desc", "vid in desc", "Original Mix"];
    }
    getArtists() {
      const title = this.preprocessTitle(this.title);
      let artists = [];
      const titleSplit = this.splitByTitleSeparators(title, true);
      artists = artists.concat(
        titleSplit.artistNames.map((name, index) => ({
          name,
          type: index === 0 ? 0 /* Main */ : 1 /* Feature */
        }))
      );
      const producerSplit = this.splitByProducer(titleSplit.title, true);
      artists = artists.concat(
        producerSplit.artistNames.map((name) => ({
          name,
          type: 3 /* Producer */
        }))
      );
      const remixSplit = this.splitByRemix(producerSplit.title, true);
      artists = artists.concat(remixSplit.artists);
      const unsafeProducerSplit = this.splitByUnsafeProducers(remixSplit.title, true);
      artists = artists.concat(
        unsafeProducerSplit.artistNames.map((name) => ({
          name,
          type: 3 /* Producer */
        }))
      );
      const featureSplit = this.splitByFeatures(remixSplit.title, true);
      artists = artists.concat(
        featureSplit.artistNames.map((name) => ({
          name,
          type: 1 /* Feature */
        }))
      );
      const hasMainArtist = artists.some((i) => i.type === 0 /* Main */);
      if (!hasMainArtist) {
        const user = {
          name: this.sanitizeArtistName(this.username) || this.userPermalink,
          type: 0 /* Main */
        };
        if (!!user.name) {
          if (artists.length > 0) {
            artists = [user, ...artists];
          } else {
            artists.push(user);
          }
        }
      }
      artists = artists.map((artist) => this.removeTwitterHandle(artist));
      const distinctArtists = [];
      for (const artist of artists) {
        if (distinctArtists.some((i) => i.name == artist.name)) continue;
        distinctArtists.push(artist);
      }
      return stableSort(distinctArtists, "type");
    }
    getTitle() {
      let title = this.preprocessTitle(this.title);
      title = this.splitByTitleSeparators(title, false).title;
      title = this.splitByProducer(title, false).title;
      title = this.splitByRemix(title, false).title;
      title = this.splitByFeatures(title, false).title;
      title = this.splitByUnsafeProducers(title, false).title;
      return this.sanitizeTitle(title);
    }
    removeTwitterHandle(artist) {
      artist.name = artist.name.replace(/^[@]+/, "");
      const result = /^([^\(]+)\s?\(?\s?@.+\)?$/.exec(artist.name);
      if (result && result.length > 1) {
        artist.name = result[1].trimEnd();
      }
      return artist;
    }
    splitByTitleSeparators(title, extractArtists) {
      let artistNames = [];
      if (this.includes(title, _MetadataExtractor.titleSeparators)) {
        const separators = this.escapeRegexArray(_MetadataExtractor.titleSeparators);
        const regex = new RegExp(\`^((.+)\\s[\${separators}]\\s)(.+)$\`);
        const result = regex.exec(title);
        if (result && result.length > 0) {
          const [_, artistSection, artistString] = result;
          if (extractArtists) {
            artistNames = this.getArtistNames(artistString);
          }
          title = title.replace(artistSection, "");
        }
      }
      return {
        artistNames,
        title
      };
    }
    splitByFeatures(title, extractArtists) {
      let artistNames = [];
      if (this.includes(title, _MetadataExtractor.featureSeparators)) {
        const separators = this.escapeRegexArray(_MetadataExtractor.featureSeparators).join("|");
        const regex = new RegExp(\`(?:\${separators})([^\\[\\]\\(\\)]+)\`, "i");
        const result = regex.exec(title);
        if (result && result.length > 0) {
          const [featureSection, artistsString] = result;
          if (extractArtists) {
            artistNames = this.getArtistNames(artistsString);
          }
          title = title.replace(featureSection, "");
        }
      }
      return {
        artistNames,
        title
      };
    }
    splitByProducer(title, extractArtists) {
      let artistNames = [];
      if (this.includes(title, _MetadataExtractor.producerIndicators)) {
        const separators = this.escapeRegexArray(_MetadataExtractor.producerIndicators).join("|");
        const regex = new RegExp(\`(?:\${separators})([^\\[\\]\\(\\)]+)\`, "i");
        const result = regex.exec(title);
        if (result && result.length > 0) {
          const [producerSection, artistsString] = result;
          if (extractArtists) {
            artistNames = this.getArtistNames(artistsString);
          }
          title = title.replace(producerSection, "");
        }
      }
      return {
        artistNames,
        title
      };
    }
    splitByUnsafeProducers(title, extractArtists) {
      let artistNames = [];
      const featureSeparators = this.escapeRegexArray(_MetadataExtractor.featureSeparators).join("|");
      const regex = new RegExp(\`[\\(\\[](?!\${featureSeparators})(.+)[\\)\\]]\`, "i");
      const result = regex.exec(title);
      if (result && result.length > 0) {
        const [producerSection, artistsString] = result;
        if (extractArtists) {
          artistNames = this.getArtistNames(artistsString);
        }
        title = title.replace(producerSection, "");
      }
      return {
        artistNames,
        title
      };
    }
    splitByRemix(title, extractArtists) {
      let artists = [];
      if (this.includes(title, _MetadataExtractor.remixIndicators)) {
        const separators = this.escapeRegexArray(_MetadataExtractor.remixIndicators).join("|");
        const regex = new RegExp(\`[\\[\\(](.+)(\${separators})[\\]\\)]\`, "i");
        const result = regex.exec(title);
        if (result && result.length > 0) {
          const [remixSection, artistsString, remixTypeString] = result;
          if (extractArtists) {
            const artistNames = this.getArtistNames(artistsString);
            const remixType = getRemixTypeFromString(remixTypeString);
            artists = artistNames.map((name) => ({
              name,
              type: 2 /* Remixer */,
              remixType
            }));
          }
          title = title.replace(remixSection, "");
        }
      }
      return {
        artists,
        title
      };
    }
    getArtistNames(input) {
      const separators = this.escapeRegexArray(_MetadataExtractor.combiningFeatureSeparators).join("|");
      const regex = new RegExp(\`(.+)\\s?(\${separators})\\s?(.+)\`, "i");
      const names = [];
      while (true) {
        const result = regex.exec(input);
        if (!result) {
          names.push(this.sanitizeArtistName(input));
          break;
        }
        names.push(this.sanitizeArtistName(result[3]));
        input = result[1];
      }
      return names.reverse();
    }
    preprocessTitle(input) {
      input = input.replace(/\+[\+]+/g, "+");
      const promotions = _MetadataExtractor.promotions.join("|");
      const regex = new RegExp(\`[\\[\\(]?\\s*(\${promotions})\\s*[\\]\\)]?\`, "i");
      return input.replace(regex, "");
    }
    sanitizeArtistName(input) {
      return this.removeNonAsciiCharacters(input).trim();
    }
    sanitizeTitle(input) {
      let sanitized = this.removeNonAsciiCharacters(input);
      sanitized = sanitized.replace("()", "").replace("[]", "");
      return sanitized.trim();
    }
    removeNonAsciiCharacters(input) {
      return input.replace(new RegExp("[^\\p{L}\\p{N}\\p{Zs}\0-\x7F]", "gu"), "");
    }
    includes(input, separators) {
      const loweredInput = input.toLowerCase();
      return separators.some((separator) => loweredInput.includes(separator));
    }
    escapeRegexArray(input) {
      return input.map((i) => escapeStringRegexp(i));
    }
  };

  // src/tagWriters/mp3TagWriter.ts
  var import_browser_id3_writer = __toESM(require_browser_id3_writer());
  var Mp3TagWriter = class {
    constructor(buffer) {
      this.writer = new import_browser_id3_writer.default(buffer);
    }
    setTitle(title) {
      if (!title) throw new Error("Invalid value for title");
      this.writer.setFrame("TIT2", title);
    }
    setArtists(artists) {
      if (!artists || artists.length < 1) throw new Error("Invalid value for artists");
      this.writer.setFrame("TPE1", artists);
    }
    setAlbum(album) {
      if (!album) throw new Error("Invalid value for album");
      this.writer.setFrame("TALB", album);
    }
    setComment(comment) {
      if (!comment) throw new Error("Invalid value for comment");
      this.writer.setFrame("COMM", {
        text: comment,
        description: ""
      });
    }
    setTrackNumber(trackNumber) {
      if (trackNumber < 1 || trackNumber > 32767) throw new Error("Invalid value for trackNumber");
      this.writer.setFrame("TRCK", trackNumber);
    }
    setDate(date) {
      if (!date || isNaN(date.getTime())) throw new Error("Invalid value for date");
      this.writer.setFrame("TYER", date.getUTCFullYear());
    }
    setArtwork(artworkBuffer) {
      if (!artworkBuffer || artworkBuffer.byteLength < 1) throw new Error("Invalid value for artworkBuffer");
      this.writer.setFrame("APIC", {
        type: 3,
        data: artworkBuffer,
        description: ""
      });
    }
    getBuffer() {
      this.writer.addTag();
      const blob = this.writer.getBlob();
      return blob.arrayBuffer();
    }
  };

  // src/config.ts
  var configDefaults = {
    "download-hq-version": true,
    "download-original-version": false,
    "normalize-track": true,
    "set-metadata": true,
    "include-producers": true
  };
  var configKeys = Object.keys(configDefaults);
  var STORAGE_PREFIX = "SOUNDCLOUD-DL-";
  function getConfigValue(key) {
    try {
      const raw = window.localStorage.getItem(STORAGE_PREFIX + key);
      if (raw !== null) {
        const parsed = JSON.parse(raw);
        if (typeof parsed === typeof configDefaults[key]) return parsed;
      }
    } catch {
    }
    return configDefaults[key];
  }
  function storeConfigValue(key, value) {
    try {
      window.localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
    } catch {
    }
  }
  function resetConfig() {
    for (const key of configKeys) {
      try {
        window.localStorage.removeItem(STORAGE_PREFIX + key);
      } catch {
      }
    }
  }

  // src/utils/download.ts
  function concatArrayBuffers(buffers) {
    const totalLength = buffers.reduce((acc, cur) => acc + cur.byteLength, 0);
    const mergedBuffer = new Uint8Array(totalLength);
    let bufferOffset = 0;
    for (const buffer of buffers) {
      mergedBuffer.set(new Uint8Array(buffer), bufferOffset);
      bufferOffset += buffer.byteLength;
    }
    return mergedBuffer.buffer;
  }
  function sanitizeFilenameForDownload(input) {
    let sanitized = input.replace(/[<>:"/\\|?*]/g, "");
    sanitized = sanitized.replace(/[\u0000-\u001f\u0080-\u009f]/g, "");
    sanitized = sanitized.replace(/^\.*/, "");
    sanitized = sanitized.replace(/\.*$/, "");
    sanitized = sanitized.replace(new RegExp("[^\\p{L}\\p{N}\\p{Zs}]\\]", "gu"), "");
    return sanitized.replace(/\s{2,}/, " ").trim();
  }

  // src/tagWriters/mp4TagWriter.ts
  var ATOM_HEAD_LENGTH = 8;
  var ATOM_DATA_HEAD_LENGTH = 16;
  var ATOM_HEADER_LENGTH = ATOM_HEAD_LENGTH + ATOM_DATA_HEAD_LENGTH;
  var Mp4 = class {
    constructor(buffer) {
      this._metadataPath = ["moov", "udta", "meta", "ilst"];
      this._atoms = [];
      this._buffer = buffer;
      this._bufferView = new DataView(buffer);
    }
    parse() {
      if (!this._buffer) throw new Error("Buffer can not be null");
      if (this._atoms.length > 0) throw new Error("Buffer already parsed");
      let offset = 0;
      let atom;
      while (true) {
        atom = this._readAtom(offset);
        if (!atom || atom.length < 1) break;
        this._atoms.push(atom);
        offset = atom.offset + atom.length;
      }
      if (this._atoms.length < 1) throw new Error("Buffer could not be parsed");
    }
    setDuration(duration) {
      const mvhdAtom = this._findAtom(this._atoms, ["moov", "mvhd"]);
      if (!mvhdAtom) throw new Error("'mvhd' atom could not be found");
      const precedingDataLength = 16;
      this._bufferView.setUint32(mvhdAtom.offset + ATOM_HEAD_LENGTH + precedingDataLength, duration);
    }
    addMetadataAtom(name, data) {
      if (name.length > 4 || name.length < 1) throw new Error(\`Unsupported atom name: '\${name}'\`);
      let dataBuffer;
      if (data instanceof ArrayBuffer) {
        dataBuffer = data;
      } else if (typeof data === "string") {
        dataBuffer = this._getBufferFromString(data);
      } else if (typeof data === "number") {
        dataBuffer = new ArrayBuffer(4);
        const dataView = new DataView(dataBuffer);
        dataView.setUint32(0, data);
      } else {
        throw new Error(\`Unsupported data: '\${data}'\`);
      }
      const atom = {
        name,
        length: ATOM_HEADER_LENGTH + dataBuffer.byteLength,
        data: dataBuffer
      };
      this._insertAtom(atom, this._metadataPath);
    }
    getBuffer() {
      const buffers = [];
      let bufferIndex = 0;
      for (const atom of this._atoms) {
        if (!atom.children) {
          const slice = this._buffer.slice(atom.offset, atom.offset + atom.length);
          buffers.push(slice);
          bufferIndex++;
          continue;
        }
        atom.length = ATOM_HEAD_LENGTH;
        const levels = [{ parent: atom, offset: bufferIndex, childIndex: 0 }];
        let levelIndex = 0;
        while (true) {
          const { parent, offset, childIndex } = levels[levelIndex];
          if (childIndex >= parent.children.length) {
            levelIndex--;
            levels.pop();
            let parentHeadLength = ATOM_HEAD_LENGTH;
            if (parent.name === "meta") {
              parent.length += 4;
              parentHeadLength += 4;
            } else if (parent.name === "stsd") {
              parent.length += 8;
              parentHeadLength += 8;
            }
            let parentHeader;
            if (parent.synthetic) {
              parentHeader = this._buildSyntheticHeader(parent, parentHeadLength);
            } else {
              this._bufferView.setUint32(parent.offset, parent.length);
              parentHeader = this._buffer.slice(parent.offset, parent.offset + parentHeadLength);
            }
            buffers.splice(offset, 0, parentHeader);
            if (levelIndex < 0) break;
            const newParent = levels[levelIndex].parent;
            newParent.length += parent.length;
            levels[levelIndex].childIndex++;
            continue;
          }
          const child = parent.children[childIndex];
          if (child.children) {
            child.length = ATOM_HEAD_LENGTH;
            levels.push({ parent: child, offset: bufferIndex, childIndex: 0 });
            levelIndex++;
            continue;
          } else if (child.rawData) {
            const combined = new Uint8Array(ATOM_HEAD_LENGTH + child.rawData.byteLength);
            const headerView = new DataView(combined.buffer);
            headerView.setUint32(0, child.length);
            const nameChars = this._getCharCodes(child.name);
            for (let i = 0; i < nameChars.length; i++) {
              headerView.setUint8(4 + i, nameChars[i]);
            }
            combined.set(new Uint8Array(child.rawData), ATOM_HEAD_LENGTH);
            buffers.push(combined.buffer);
          } else if (child.data) {
            const headerBuffer = this._getHeaderBufferFromAtom(child);
            buffers.push(headerBuffer);
            buffers.push(child.data);
          } else {
            const slice = this._buffer.slice(child.offset, child.offset + child.length);
            buffers.push(slice);
          }
          bufferIndex++;
          parent.length += child.length;
          levels[levelIndex].childIndex++;
        }
      }
      this._bufferView = null;
      this._buffer = null;
      this._atoms = [];
      return concatArrayBuffers(buffers);
    }
    _insertAtom(atom, path) {
      if (!path || path.length < 1) throw new Error("Path can not be empty");
      const parentAtom = this._ensurePath(path);
      if (parentAtom.children === void 0) {
        parentAtom.children = this._readChildAtoms(parentAtom);
      }
      atom.offset = 0;
      parentAtom.children.push(atom);
    }
    // Walk the path under the top-level atoms, creating any missing container
    // atoms as synthetic nodes. Returns the deepest atom on the path.
    _ensurePath(path) {
      let current = this._atoms.find((a) => a.name === path[0]);
      if (!current) {
        throw new Error(\`Top-level atom '\${path[0]}' could not be found\`);
      }
      for (let i = 1; i < path.length; i++) {
        if (current.children === void 0) {
          current.children = this._readChildAtoms(current);
        }
        const childName = path[i];
        let child = current.children.find((c) => c.name === childName);
        if (!child) {
          child = this._createSyntheticContainer(childName);
          current.children.push(child);
          if (childName === "meta") {
            const hdlrPayload = this._buildMetadataHdlrPayload();
            const hdlrAtom = {
              name: "hdlr",
              length: ATOM_HEAD_LENGTH + hdlrPayload.byteLength,
              rawData: hdlrPayload,
              synthetic: true
            };
            child.children = [hdlrAtom];
          }
        } else if (child.children === void 0) {
          child.children = this._readChildAtoms(child);
        }
        current = child;
      }
      return current;
    }
    _createSyntheticContainer(name) {
      let length = ATOM_HEAD_LENGTH;
      if (name === "meta") {
        length += 4;
      }
      return {
        name,
        length,
        children: [],
        synthetic: true
      };
    }
    _buildSyntheticHeader(atom, headLength) {
      const header = new ArrayBuffer(headLength);
      const view = new DataView(header);
      view.setUint32(0, atom.length);
      const nameChars = this._getCharCodes(atom.name);
      for (let i = 0; i < nameChars.length; i++) {
        view.setUint8(4 + i, nameChars[i]);
      }
      return header;
    }
    _buildMetadataHdlrPayload() {
      const buffer = new ArrayBuffer(25);
      const view = new DataView(buffer);
      const handlerType = this._getCharCodes("mdir");
      for (let i = 0; i < 4; i++) {
        view.setUint8(8 + i, handlerType[i]);
      }
      return buffer;
    }
    _findAtom(atoms, path) {
      if (!path || path.length < 1) throw new Error("Path can not be empty");
      const curPath = [...path];
      const curName = curPath.shift();
      const curElem = atoms.find((i) => i.name === curName);
      if (curPath.length < 1) return curElem;
      if (!curElem) return null;
      if (curElem.children === void 0) {
        curElem.children = this._readChildAtoms(curElem);
      }
      if (curElem.children.length < 1) return null;
      return this._findAtom(curElem.children, curPath);
    }
    _readChildAtoms(atom) {
      const children = [];
      const childEnd = atom.offset + atom.length;
      let childOffset = atom.offset + ATOM_HEAD_LENGTH;
      if (atom.name === "meta") {
        childOffset += 4;
      } else if (atom.name === "stsd") {
        childOffset += 8;
      }
      while (true) {
        if (childOffset >= childEnd) break;
        const childAtom = this._readAtom(childOffset);
        if (!childAtom || childAtom.length < 1) break;
        childOffset = childAtom.offset + childAtom.length;
        children.push(childAtom);
      }
      return children;
    }
    _readAtom(offset) {
      const begin = offset;
      const end = offset + ATOM_HEAD_LENGTH;
      const buffer = this._buffer.slice(begin, end);
      if (buffer.byteLength < ATOM_HEAD_LENGTH) {
        return {
          length: buffer.byteLength,
          offset
        };
      }
      const dataView = new DataView(buffer);
      let length = dataView.getUint32(0, false);
      let name = "";
      for (let i = 0; i < 4; i++) {
        name += String.fromCharCode(dataView.getUint8(4 + i));
      }
      return {
        name,
        length,
        offset
      };
    }
    _getHeaderBufferFromAtom(atom) {
      if (!atom || atom.length < 1 || !atom.name || !atom.data)
        throw new Error("Can not compute header buffer for this atom");
      const headerBuffer = new ArrayBuffer(ATOM_HEADER_LENGTH);
      const headerBufferView = new DataView(headerBuffer);
      headerBufferView.setUint32(0, atom.length);
      const nameChars = this._getCharCodes(atom.name);
      for (let i = 0; i < nameChars.length; i++) {
        headerBufferView.setUint8(4 + i, nameChars[i]);
      }
      headerBufferView.setUint32(8, ATOM_DATA_HEAD_LENGTH + atom.data.byteLength);
      const dataNameChars = this._getCharCodes("data");
      for (let i = 0; i < dataNameChars.length; i++) {
        headerBufferView.setUint8(12 + i, dataNameChars[i]);
      }
      headerBufferView.setUint32(16, this._getFlags(atom.name));
      return headerBuffer;
    }
    _getBufferFromString(input) {
      const buffer = new ArrayBuffer(input.length);
      const bufferView = new DataView(buffer);
      const chars2 = this._getCharCodes(input);
      for (let i = 0; i < chars2.length; i++) {
        bufferView.setUint8(i, chars2[i]);
      }
      return buffer;
    }
    _getCharCodes(input) {
      const chars2 = [];
      for (let i = 0; i < input.length; i++) {
        chars2.push(input.charCodeAt(i));
      }
      return chars2;
    }
    _getFlags(name) {
      switch (name) {
        case "covr":
          return 13;
        case "trkn":
        case "disk":
          return 0;
        case "tmpo":
        case "cpil":
        case "rtng":
          return 21;
        default:
          return 1;
      }
    }
  };
  var Mp4TagWriter = class {
    constructor(buffer) {
      this._mp4 = new Mp4(buffer);
      this._mp4.parse();
    }
    setTitle(title) {
      if (!title) throw new Error("Invalid value for title");
      this._mp4.addMetadataAtom("\xA9nam", title);
    }
    setArtists(artists) {
      if (!artists || artists.length < 1) throw new Error("Invalid value for artists");
      this._mp4.addMetadataAtom("\xA9ART", artists.join(", "));
    }
    setAlbum(album) {
      if (!album) throw new Error("Invalid value for album");
      this._mp4.addMetadataAtom("\xA9alb", album);
    }
    setComment(comment) {
      if (!comment) throw new Error("Invalid value for comment");
      this._mp4.addMetadataAtom("\xA9cmt", comment);
    }
    setTrackNumber(trackNumber) {
      if (trackNumber < 1 || trackNumber > 32767) throw new Error("Invalid value for trackNumber");
      this._mp4.addMetadataAtom("trkn", trackNumber);
    }
    setDate(date) {
      if (!date || isNaN(date.getTime())) throw new Error("Invalid value for date");
      this._mp4.addMetadataAtom("\xA9day", date.toISOString());
    }
    setArtwork(artworkBuffer) {
      if (!artworkBuffer || artworkBuffer.byteLength < 1) throw new Error("Invalid value for artworkBuffer");
      this._mp4.addMetadataAtom("covr", artworkBuffer);
    }
    setDuration(duration) {
      if (duration < 1) throw new Error("Invalid value for duration");
      this._mp4.setDuration(duration);
    }
    getBuffer() {
      const buffer = this._mp4.getBuffer();
      return Promise.resolve(buffer);
    }
  };

  // node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
  function _setPrototypeOf(t, e) {
    return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t2, e2) {
      return t2.__proto__ = e2, t2;
    }, _setPrototypeOf(t, e);
  }

  // node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
  function _inheritsLoose(t, o) {
    t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o);
  }

  // node_modules/@videojs/vhs-utils/es/stream.js
  var Stream = /* @__PURE__ */ (function() {
    function Stream2() {
      this.listeners = {};
    }
    var _proto = Stream2.prototype;
    _proto.on = function on(type, listener) {
      if (!this.listeners[type]) {
        this.listeners[type] = [];
      }
      this.listeners[type].push(listener);
    };
    _proto.off = function off(type, listener) {
      if (!this.listeners[type]) {
        return false;
      }
      var index = this.listeners[type].indexOf(listener);
      this.listeners[type] = this.listeners[type].slice(0);
      this.listeners[type].splice(index, 1);
      return index > -1;
    };
    _proto.trigger = function trigger(type) {
      var callbacks = this.listeners[type];
      if (!callbacks) {
        return;
      }
      if (arguments.length === 2) {
        var length = callbacks.length;
        for (var i = 0; i < length; ++i) {
          callbacks[i].call(this, arguments[1]);
        }
      } else {
        var args = Array.prototype.slice.call(arguments, 1);
        var _length = callbacks.length;
        for (var _i = 0; _i < _length; ++_i) {
          callbacks[_i].apply(this, args);
        }
      }
    };
    _proto.dispose = function dispose() {
      this.listeners = {};
    };
    _proto.pipe = function pipe(destination) {
      this.on("data", function(data) {
        destination.push(data);
      });
    };
    return Stream2;
  })();

  // node_modules/@babel/runtime/helpers/esm/extends.js
  function _extends() {
    return _extends = Object.assign ? Object.assign.bind() : function(n) {
      for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
      }
      return n;
    }, _extends.apply(null, arguments);
  }

  // node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
  function _assertThisInitialized(e) {
    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }

  // node_modules/@videojs/vhs-utils/es/decode-b64-to-uint8-array.js
  var import_window = __toESM(require_window());
  var atob = function atob2(s) {
    return import_window.default.atob ? import_window.default.atob(s) : Buffer.from(s, "base64").toString("binary");
  };
  function decodeB64ToUint8Array(b64Text) {
    var decodedString = atob(b64Text);
    var array = new Uint8Array(decodedString.length);
    for (var i = 0; i < decodedString.length; i++) {
      array[i] = decodedString.charCodeAt(i);
    }
    return array;
  }

  // node_modules/m3u8-parser/dist/m3u8-parser.es.js
  var LineStream = /* @__PURE__ */ (function(_Stream) {
    _inheritsLoose(LineStream2, _Stream);
    function LineStream2() {
      var _this;
      _this = _Stream.call(this) || this;
      _this.buffer = "";
      return _this;
    }
    var _proto = LineStream2.prototype;
    _proto.push = function push(data) {
      var nextNewline;
      this.buffer += data;
      nextNewline = this.buffer.indexOf("\n");
      for (; nextNewline > -1; nextNewline = this.buffer.indexOf("\n")) {
        this.trigger("data", this.buffer.substring(0, nextNewline));
        this.buffer = this.buffer.substring(nextNewline + 1);
      }
    };
    return LineStream2;
  })(Stream);
  var TAB = String.fromCharCode(9);
  var parseByterange = function parseByterange2(byterangeString) {
    var match = /([0-9.]*)?@?([0-9.]*)?/.exec(byterangeString || "");
    var result = {};
    if (match[1]) {
      result.length = parseInt(match[1], 10);
    }
    if (match[2]) {
      result.offset = parseInt(match[2], 10);
    }
    return result;
  };
  var attributeSeparator = function attributeSeparator2() {
    var key = "[^=]*";
    var value = '"[^"]*"|[^,]*';
    var keyvalue = "(?:" + key + ")=(?:" + value + ")";
    return new RegExp("(?:^|,)(" + keyvalue + ")");
  };
  var parseAttributes = function parseAttributes2(attributes) {
    var attrs = attributes.split(attributeSeparator());
    var result = {};
    var i = attrs.length;
    var attr;
    while (i--) {
      if (attrs[i] === "") {
        continue;
      }
      attr = /([^=]*)=(.*)/.exec(attrs[i]).slice(1);
      attr[0] = attr[0].replace(/^\s+|\s+$/g, "");
      attr[1] = attr[1].replace(/^\s+|\s+$/g, "");
      attr[1] = attr[1].replace(/^['"](.*)['"]$/g, "$1");
      result[attr[0]] = attr[1];
    }
    return result;
  };
  var ParseStream = /* @__PURE__ */ (function(_Stream) {
    _inheritsLoose(ParseStream2, _Stream);
    function ParseStream2() {
      var _this;
      _this = _Stream.call(this) || this;
      _this.customParsers = [];
      _this.tagMappers = [];
      return _this;
    }
    var _proto = ParseStream2.prototype;
    _proto.push = function push(line) {
      var _this2 = this;
      var match;
      var event;
      line = line.trim();
      if (line.length === 0) {
        return;
      }
      if (line[0] !== "#") {
        this.trigger("data", {
          type: "uri",
          uri: line
        });
        return;
      }
      var newLines = this.tagMappers.reduce(function(acc, mapper) {
        var mappedLine = mapper(line);
        if (mappedLine === line) {
          return acc;
        }
        return acc.concat([mappedLine]);
      }, [line]);
      newLines.forEach(function(newLine) {
        for (var i = 0; i < _this2.customParsers.length; i++) {
          if (_this2.customParsers[i].call(_this2, newLine)) {
            return;
          }
        }
        if (newLine.indexOf("#EXT") !== 0) {
          _this2.trigger("data", {
            type: "comment",
            text: newLine.slice(1)
          });
          return;
        }
        newLine = newLine.replace("\r", "");
        match = /^#EXTM3U/.exec(newLine);
        if (match) {
          _this2.trigger("data", {
            type: "tag",
            tagType: "m3u"
          });
          return;
        }
        match = /^#EXTINF:?([0-9\.]*)?,?(.*)?$/.exec(newLine);
        if (match) {
          event = {
            type: "tag",
            tagType: "inf"
          };
          if (match[1]) {
            event.duration = parseFloat(match[1]);
          }
          if (match[2]) {
            event.title = match[2];
          }
          _this2.trigger("data", event);
          return;
        }
        match = /^#EXT-X-TARGETDURATION:?([0-9.]*)?/.exec(newLine);
        if (match) {
          event = {
            type: "tag",
            tagType: "targetduration"
          };
          if (match[1]) {
            event.duration = parseInt(match[1], 10);
          }
          _this2.trigger("data", event);
          return;
        }
        match = /^#EXT-X-VERSION:?([0-9.]*)?/.exec(newLine);
        if (match) {
          event = {
            type: "tag",
            tagType: "version"
          };
          if (match[1]) {
            event.version = parseInt(match[1], 10);
          }
          _this2.trigger("data", event);
          return;
        }
        match = /^#EXT-X-MEDIA-SEQUENCE:?(\-?[0-9.]*)?/.exec(newLine);
        if (match) {
          event = {
            type: "tag",
            tagType: "media-sequence"
          };
          if (match[1]) {
            event.number = parseInt(match[1], 10);
          }
          _this2.trigger("data", event);
          return;
        }
        match = /^#EXT-X-DISCONTINUITY-SEQUENCE:?(\-?[0-9.]*)?/.exec(newLine);
        if (match) {
          event = {
            type: "tag",
            tagType: "discontinuity-sequence"
          };
          if (match[1]) {
            event.number = parseInt(match[1], 10);
          }
          _this2.trigger("data", event);
          return;
        }
        match = /^#EXT-X-PLAYLIST-TYPE:?(.*)?$/.exec(newLine);
        if (match) {
          event = {
            type: "tag",
            tagType: "playlist-type"
          };
          if (match[1]) {
            event.playlistType = match[1];
          }
          _this2.trigger("data", event);
          return;
        }
        match = /^#EXT-X-BYTERANGE:?(.*)?$/.exec(newLine);
        if (match) {
          event = _extends(parseByterange(match[1]), {
            type: "tag",
            tagType: "byterange"
          });
          _this2.trigger("data", event);
          return;
        }
        match = /^#EXT-X-ALLOW-CACHE:?(YES|NO)?/.exec(newLine);
        if (match) {
          event = {
            type: "tag",
            tagType: "allow-cache"
          };
          if (match[1]) {
            event.allowed = !/NO/.test(match[1]);
          }
          _this2.trigger("data", event);
          return;
        }
        match = /^#EXT-X-MAP:?(.*)$/.exec(newLine);
        if (match) {
          event = {
            type: "tag",
            tagType: "map"
          };
          if (match[1]) {
            var attributes = parseAttributes(match[1]);
            if (attributes.URI) {
              event.uri = attributes.URI;
            }
            if (attributes.BYTERANGE) {
              event.byterange = parseByterange(attributes.BYTERANGE);
            }
          }
          _this2.trigger("data", event);
          return;
        }
        match = /^#EXT-X-STREAM-INF:?(.*)$/.exec(newLine);
        if (match) {
          event = {
            type: "tag",
            tagType: "stream-inf"
          };
          if (match[1]) {
            event.attributes = parseAttributes(match[1]);
            if (event.attributes.RESOLUTION) {
              var split = event.attributes.RESOLUTION.split("x");
              var resolution = {};
              if (split[0]) {
                resolution.width = parseInt(split[0], 10);
              }
              if (split[1]) {
                resolution.height = parseInt(split[1], 10);
              }
              event.attributes.RESOLUTION = resolution;
            }
            if (event.attributes.BANDWIDTH) {
              event.attributes.BANDWIDTH = parseInt(event.attributes.BANDWIDTH, 10);
            }
            if (event.attributes["FRAME-RATE"]) {
              event.attributes["FRAME-RATE"] = parseFloat(event.attributes["FRAME-RATE"]);
            }
            if (event.attributes["PROGRAM-ID"]) {
              event.attributes["PROGRAM-ID"] = parseInt(event.attributes["PROGRAM-ID"], 10);
            }
          }
          _this2.trigger("data", event);
          return;
        }
        match = /^#EXT-X-MEDIA:?(.*)$/.exec(newLine);
        if (match) {
          event = {
            type: "tag",
            tagType: "media"
          };
          if (match[1]) {
            event.attributes = parseAttributes(match[1]);
          }
          _this2.trigger("data", event);
          return;
        }
        match = /^#EXT-X-ENDLIST/.exec(newLine);
        if (match) {
          _this2.trigger("data", {
            type: "tag",
            tagType: "endlist"
          });
          return;
        }
        match = /^#EXT-X-DISCONTINUITY/.exec(newLine);
        if (match) {
          _this2.trigger("data", {
            type: "tag",
            tagType: "discontinuity"
          });
          return;
        }
        match = /^#EXT-X-PROGRAM-DATE-TIME:?(.*)$/.exec(newLine);
        if (match) {
          event = {
            type: "tag",
            tagType: "program-date-time"
          };
          if (match[1]) {
            event.dateTimeString = match[1];
            event.dateTimeObject = new Date(match[1]);
          }
          _this2.trigger("data", event);
          return;
        }
        match = /^#EXT-X-KEY:?(.*)$/.exec(newLine);
        if (match) {
          event = {
            type: "tag",
            tagType: "key"
          };
          if (match[1]) {
            event.attributes = parseAttributes(match[1]);
            if (event.attributes.IV) {
              if (event.attributes.IV.substring(0, 2).toLowerCase() === "0x") {
                event.attributes.IV = event.attributes.IV.substring(2);
              }
              event.attributes.IV = event.attributes.IV.match(/.{8}/g);
              event.attributes.IV[0] = parseInt(event.attributes.IV[0], 16);
              event.attributes.IV[1] = parseInt(event.attributes.IV[1], 16);
              event.attributes.IV[2] = parseInt(event.attributes.IV[2], 16);
              event.attributes.IV[3] = parseInt(event.attributes.IV[3], 16);
              event.attributes.IV = new Uint32Array(event.attributes.IV);
            }
          }
          _this2.trigger("data", event);
          return;
        }
        match = /^#EXT-X-START:?(.*)$/.exec(newLine);
        if (match) {
          event = {
            type: "tag",
            tagType: "start"
          };
          if (match[1]) {
            event.attributes = parseAttributes(match[1]);
            event.attributes["TIME-OFFSET"] = parseFloat(event.attributes["TIME-OFFSET"]);
            event.attributes.PRECISE = /YES/.test(event.attributes.PRECISE);
          }
          _this2.trigger("data", event);
          return;
        }
        match = /^#EXT-X-CUE-OUT-CONT:?(.*)?$/.exec(newLine);
        if (match) {
          event = {
            type: "tag",
            tagType: "cue-out-cont"
          };
          if (match[1]) {
            event.data = match[1];
          } else {
            event.data = "";
          }
          _this2.trigger("data", event);
          return;
        }
        match = /^#EXT-X-CUE-OUT:?(.*)?$/.exec(newLine);
        if (match) {
          event = {
            type: "tag",
            tagType: "cue-out"
          };
          if (match[1]) {
            event.data = match[1];
          } else {
            event.data = "";
          }
          _this2.trigger("data", event);
          return;
        }
        match = /^#EXT-X-CUE-IN:?(.*)?$/.exec(newLine);
        if (match) {
          event = {
            type: "tag",
            tagType: "cue-in"
          };
          if (match[1]) {
            event.data = match[1];
          } else {
            event.data = "";
          }
          _this2.trigger("data", event);
          return;
        }
        match = /^#EXT-X-SKIP:(.*)$/.exec(newLine);
        if (match && match[1]) {
          event = {
            type: "tag",
            tagType: "skip"
          };
          event.attributes = parseAttributes(match[1]);
          if (event.attributes.hasOwnProperty("SKIPPED-SEGMENTS")) {
            event.attributes["SKIPPED-SEGMENTS"] = parseInt(event.attributes["SKIPPED-SEGMENTS"], 10);
          }
          if (event.attributes.hasOwnProperty("RECENTLY-REMOVED-DATERANGES")) {
            event.attributes["RECENTLY-REMOVED-DATERANGES"] = event.attributes["RECENTLY-REMOVED-DATERANGES"].split(TAB);
          }
          _this2.trigger("data", event);
          return;
        }
        match = /^#EXT-X-PART:(.*)$/.exec(newLine);
        if (match && match[1]) {
          event = {
            type: "tag",
            tagType: "part"
          };
          event.attributes = parseAttributes(match[1]);
          ["DURATION"].forEach(function(key) {
            if (event.attributes.hasOwnProperty(key)) {
              event.attributes[key] = parseFloat(event.attributes[key]);
            }
          });
          ["INDEPENDENT", "GAP"].forEach(function(key) {
            if (event.attributes.hasOwnProperty(key)) {
              event.attributes[key] = /YES/.test(event.attributes[key]);
            }
          });
          if (event.attributes.hasOwnProperty("BYTERANGE")) {
            event.attributes.byterange = parseByterange(event.attributes.BYTERANGE);
          }
          _this2.trigger("data", event);
          return;
        }
        match = /^#EXT-X-SERVER-CONTROL:(.*)$/.exec(newLine);
        if (match && match[1]) {
          event = {
            type: "tag",
            tagType: "server-control"
          };
          event.attributes = parseAttributes(match[1]);
          ["CAN-SKIP-UNTIL", "PART-HOLD-BACK", "HOLD-BACK"].forEach(function(key) {
            if (event.attributes.hasOwnProperty(key)) {
              event.attributes[key] = parseFloat(event.attributes[key]);
            }
          });
          ["CAN-SKIP-DATERANGES", "CAN-BLOCK-RELOAD"].forEach(function(key) {
            if (event.attributes.hasOwnProperty(key)) {
              event.attributes[key] = /YES/.test(event.attributes[key]);
            }
          });
          _this2.trigger("data", event);
          return;
        }
        match = /^#EXT-X-PART-INF:(.*)$/.exec(newLine);
        if (match && match[1]) {
          event = {
            type: "tag",
            tagType: "part-inf"
          };
          event.attributes = parseAttributes(match[1]);
          ["PART-TARGET"].forEach(function(key) {
            if (event.attributes.hasOwnProperty(key)) {
              event.attributes[key] = parseFloat(event.attributes[key]);
            }
          });
          _this2.trigger("data", event);
          return;
        }
        match = /^#EXT-X-PRELOAD-HINT:(.*)$/.exec(newLine);
        if (match && match[1]) {
          event = {
            type: "tag",
            tagType: "preload-hint"
          };
          event.attributes = parseAttributes(match[1]);
          ["BYTERANGE-START", "BYTERANGE-LENGTH"].forEach(function(key) {
            if (event.attributes.hasOwnProperty(key)) {
              event.attributes[key] = parseInt(event.attributes[key], 10);
              var subkey = key === "BYTERANGE-LENGTH" ? "length" : "offset";
              event.attributes.byterange = event.attributes.byterange || {};
              event.attributes.byterange[subkey] = event.attributes[key];
              delete event.attributes[key];
            }
          });
          _this2.trigger("data", event);
          return;
        }
        match = /^#EXT-X-RENDITION-REPORT:(.*)$/.exec(newLine);
        if (match && match[1]) {
          event = {
            type: "tag",
            tagType: "rendition-report"
          };
          event.attributes = parseAttributes(match[1]);
          ["LAST-MSN", "LAST-PART"].forEach(function(key) {
            if (event.attributes.hasOwnProperty(key)) {
              event.attributes[key] = parseInt(event.attributes[key], 10);
            }
          });
          _this2.trigger("data", event);
          return;
        }
        _this2.trigger("data", {
          type: "tag",
          data: newLine.slice(4)
        });
      });
    };
    _proto.addParser = function addParser(_ref) {
      var _this3 = this;
      var expression = _ref.expression, customType = _ref.customType, dataParser = _ref.dataParser, segment = _ref.segment;
      if (typeof dataParser !== "function") {
        dataParser = function dataParser2(line) {
          return line;
        };
      }
      this.customParsers.push(function(line) {
        var match = expression.exec(line);
        if (match) {
          _this3.trigger("data", {
            type: "custom",
            data: dataParser(line),
            customType,
            segment
          });
          return true;
        }
      });
    };
    _proto.addTagMapper = function addTagMapper(_ref2) {
      var expression = _ref2.expression, map = _ref2.map;
      var mapFn = function mapFn2(line) {
        if (expression.test(line)) {
          return map(line);
        }
        return line;
      };
      this.tagMappers.push(mapFn);
    };
    return ParseStream2;
  })(Stream);
  var camelCase = function camelCase2(str) {
    return str.toLowerCase().replace(/-(\w)/g, function(a) {
      return a[1].toUpperCase();
    });
  };
  var camelCaseKeys = function camelCaseKeys2(attributes) {
    var result = {};
    Object.keys(attributes).forEach(function(key) {
      result[camelCase(key)] = attributes[key];
    });
    return result;
  };
  var setHoldBack = function setHoldBack2(manifest) {
    var serverControl = manifest.serverControl, targetDuration = manifest.targetDuration, partTargetDuration = manifest.partTargetDuration;
    if (!serverControl) {
      return;
    }
    var tag = "#EXT-X-SERVER-CONTROL";
    var hb = "holdBack";
    var phb = "partHoldBack";
    var minTargetDuration = targetDuration && targetDuration * 3;
    var minPartDuration = partTargetDuration && partTargetDuration * 2;
    if (targetDuration && !serverControl.hasOwnProperty(hb)) {
      serverControl[hb] = minTargetDuration;
      this.trigger("info", {
        message: tag + " defaulting HOLD-BACK to targetDuration * 3 (" + minTargetDuration + ")."
      });
    }
    if (minTargetDuration && serverControl[hb] < minTargetDuration) {
      this.trigger("warn", {
        message: tag + " clamping HOLD-BACK (" + serverControl[hb] + ") to targetDuration * 3 (" + minTargetDuration + ")"
      });
      serverControl[hb] = minTargetDuration;
    }
    if (partTargetDuration && !serverControl.hasOwnProperty(phb)) {
      serverControl[phb] = partTargetDuration * 3;
      this.trigger("info", {
        message: tag + " defaulting PART-HOLD-BACK to partTargetDuration * 3 (" + serverControl[phb] + ")."
      });
    }
    if (partTargetDuration && serverControl[phb] < minPartDuration) {
      this.trigger("warn", {
        message: tag + " clamping PART-HOLD-BACK (" + serverControl[phb] + ") to partTargetDuration * 2 (" + minPartDuration + ")."
      });
      serverControl[phb] = minPartDuration;
    }
  };
  var Parser = /* @__PURE__ */ (function(_Stream) {
    _inheritsLoose(Parser2, _Stream);
    function Parser2() {
      var _this;
      _this = _Stream.call(this) || this;
      _this.lineStream = new LineStream();
      _this.parseStream = new ParseStream();
      _this.lineStream.pipe(_this.parseStream);
      var self2 = _assertThisInitialized(_this);
      var uris = [];
      var currentUri = {};
      var currentMap;
      var _key;
      var hasParts = false;
      var noop = function noop2() {
      };
      var defaultMediaGroups = {
        "AUDIO": {},
        "VIDEO": {},
        "CLOSED-CAPTIONS": {},
        "SUBTITLES": {}
      };
      var widevineUuid = "urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed";
      var currentTimeline = 0;
      _this.manifest = {
        allowCache: true,
        discontinuityStarts: [],
        segments: []
      };
      var lastByterangeEnd = 0;
      var lastPartByterangeEnd = 0;
      _this.on("end", function() {
        if (currentUri.uri || !currentUri.parts && !currentUri.preloadHints) {
          return;
        }
        if (!currentUri.map && currentMap) {
          currentUri.map = currentMap;
        }
        if (!currentUri.key && _key) {
          currentUri.key = _key;
        }
        if (!currentUri.timeline && typeof currentTimeline === "number") {
          currentUri.timeline = currentTimeline;
        }
        _this.manifest.preloadSegment = currentUri;
      });
      _this.parseStream.on("data", function(entry) {
        var mediaGroup;
        var rendition;
        ({
          tag: function tag() {
            ({
              version: function version() {
                if (entry.version) {
                  this.manifest.version = entry.version;
                }
              },
              "allow-cache": function allowCache() {
                this.manifest.allowCache = entry.allowed;
                if (!("allowed" in entry)) {
                  this.trigger("info", {
                    message: "defaulting allowCache to YES"
                  });
                  this.manifest.allowCache = true;
                }
              },
              byterange: function byterange() {
                var byterange2 = {};
                if ("length" in entry) {
                  currentUri.byterange = byterange2;
                  byterange2.length = entry.length;
                  if (!("offset" in entry)) {
                    entry.offset = lastByterangeEnd;
                  }
                }
                if ("offset" in entry) {
                  currentUri.byterange = byterange2;
                  byterange2.offset = entry.offset;
                }
                lastByterangeEnd = byterange2.offset + byterange2.length;
              },
              endlist: function endlist() {
                this.manifest.endList = true;
              },
              inf: function inf() {
                if (!("mediaSequence" in this.manifest)) {
                  this.manifest.mediaSequence = 0;
                  this.trigger("info", {
                    message: "defaulting media sequence to zero"
                  });
                }
                if (!("discontinuitySequence" in this.manifest)) {
                  this.manifest.discontinuitySequence = 0;
                  this.trigger("info", {
                    message: "defaulting discontinuity sequence to zero"
                  });
                }
                if (entry.duration > 0) {
                  currentUri.duration = entry.duration;
                }
                if (entry.duration === 0) {
                  currentUri.duration = 0.01;
                  this.trigger("info", {
                    message: "updating zero segment duration to a small value"
                  });
                }
                this.manifest.segments = uris;
              },
              key: function key() {
                if (!entry.attributes) {
                  this.trigger("warn", {
                    message: "ignoring key declaration without attribute list"
                  });
                  return;
                }
                if (entry.attributes.METHOD === "NONE") {
                  _key = null;
                  return;
                }
                if (!entry.attributes.URI) {
                  this.trigger("warn", {
                    message: "ignoring key declaration without URI"
                  });
                  return;
                }
                if (entry.attributes.KEYFORMAT === "com.apple.streamingkeydelivery") {
                  this.manifest.contentProtection = this.manifest.contentProtection || {};
                  this.manifest.contentProtection["com.apple.fps.1_0"] = {
                    attributes: entry.attributes
                  };
                  return;
                }
                if (entry.attributes.KEYFORMAT === "com.microsoft.playready") {
                  this.manifest.contentProtection = this.manifest.contentProtection || {};
                  this.manifest.contentProtection["com.microsoft.playready"] = {
                    uri: entry.attributes.URI
                  };
                  return;
                }
                if (entry.attributes.KEYFORMAT === widevineUuid) {
                  var VALID_METHODS = ["SAMPLE-AES", "SAMPLE-AES-CTR", "SAMPLE-AES-CENC"];
                  if (VALID_METHODS.indexOf(entry.attributes.METHOD) === -1) {
                    this.trigger("warn", {
                      message: "invalid key method provided for Widevine"
                    });
                    return;
                  }
                  if (entry.attributes.METHOD === "SAMPLE-AES-CENC") {
                    this.trigger("warn", {
                      message: "SAMPLE-AES-CENC is deprecated, please use SAMPLE-AES-CTR instead"
                    });
                  }
                  if (entry.attributes.URI.substring(0, 23) !== "data:text/plain;base64,") {
                    this.trigger("warn", {
                      message: "invalid key URI provided for Widevine"
                    });
                    return;
                  }
                  if (!(entry.attributes.KEYID && entry.attributes.KEYID.substring(0, 2) === "0x")) {
                    this.trigger("warn", {
                      message: "invalid key ID provided for Widevine"
                    });
                    return;
                  }
                  this.manifest.contentProtection = this.manifest.contentProtection || {};
                  this.manifest.contentProtection["com.widevine.alpha"] = {
                    attributes: {
                      schemeIdUri: entry.attributes.KEYFORMAT,
                      // remove '0x' from the key id string
                      keyId: entry.attributes.KEYID.substring(2)
                    },
                    // decode the base64-encoded PSSH box
                    pssh: decodeB64ToUint8Array(entry.attributes.URI.split(",")[1])
                  };
                  return;
                }
                if (!entry.attributes.METHOD) {
                  this.trigger("warn", {
                    message: "defaulting key method to AES-128"
                  });
                }
                _key = {
                  method: entry.attributes.METHOD || "AES-128",
                  uri: entry.attributes.URI
                };
                if (typeof entry.attributes.IV !== "undefined") {
                  _key.iv = entry.attributes.IV;
                }
              },
              "media-sequence": function mediaSequence() {
                if (!isFinite(entry.number)) {
                  this.trigger("warn", {
                    message: "ignoring invalid media sequence: " + entry.number
                  });
                  return;
                }
                this.manifest.mediaSequence = entry.number;
              },
              "discontinuity-sequence": function discontinuitySequence() {
                if (!isFinite(entry.number)) {
                  this.trigger("warn", {
                    message: "ignoring invalid discontinuity sequence: " + entry.number
                  });
                  return;
                }
                this.manifest.discontinuitySequence = entry.number;
                currentTimeline = entry.number;
              },
              "playlist-type": function playlistType() {
                if (!/VOD|EVENT/.test(entry.playlistType)) {
                  this.trigger("warn", {
                    message: "ignoring unknown playlist type: " + entry.playlist
                  });
                  return;
                }
                this.manifest.playlistType = entry.playlistType;
              },
              map: function map() {
                currentMap = {};
                if (entry.uri) {
                  currentMap.uri = entry.uri;
                }
                if (entry.byterange) {
                  currentMap.byterange = entry.byterange;
                }
                if (_key) {
                  currentMap.key = _key;
                }
              },
              "stream-inf": function streamInf() {
                this.manifest.playlists = uris;
                this.manifest.mediaGroups = this.manifest.mediaGroups || defaultMediaGroups;
                if (!entry.attributes) {
                  this.trigger("warn", {
                    message: "ignoring empty stream-inf attributes"
                  });
                  return;
                }
                if (!currentUri.attributes) {
                  currentUri.attributes = {};
                }
                _extends(currentUri.attributes, entry.attributes);
              },
              media: function media() {
                this.manifest.mediaGroups = this.manifest.mediaGroups || defaultMediaGroups;
                if (!(entry.attributes && entry.attributes.TYPE && entry.attributes["GROUP-ID"] && entry.attributes.NAME)) {
                  this.trigger("warn", {
                    message: "ignoring incomplete or missing media group"
                  });
                  return;
                }
                var mediaGroupType = this.manifest.mediaGroups[entry.attributes.TYPE];
                mediaGroupType[entry.attributes["GROUP-ID"]] = mediaGroupType[entry.attributes["GROUP-ID"]] || {};
                mediaGroup = mediaGroupType[entry.attributes["GROUP-ID"]];
                rendition = {
                  default: /yes/i.test(entry.attributes.DEFAULT)
                };
                if (rendition.default) {
                  rendition.autoselect = true;
                } else {
                  rendition.autoselect = /yes/i.test(entry.attributes.AUTOSELECT);
                }
                if (entry.attributes.LANGUAGE) {
                  rendition.language = entry.attributes.LANGUAGE;
                }
                if (entry.attributes.URI) {
                  rendition.uri = entry.attributes.URI;
                }
                if (entry.attributes["INSTREAM-ID"]) {
                  rendition.instreamId = entry.attributes["INSTREAM-ID"];
                }
                if (entry.attributes.CHARACTERISTICS) {
                  rendition.characteristics = entry.attributes.CHARACTERISTICS;
                }
                if (entry.attributes.FORCED) {
                  rendition.forced = /yes/i.test(entry.attributes.FORCED);
                }
                mediaGroup[entry.attributes.NAME] = rendition;
              },
              discontinuity: function discontinuity() {
                currentTimeline += 1;
                currentUri.discontinuity = true;
                this.manifest.discontinuityStarts.push(uris.length);
              },
              "program-date-time": function programDateTime() {
                if (typeof this.manifest.dateTimeString === "undefined") {
                  this.manifest.dateTimeString = entry.dateTimeString;
                  this.manifest.dateTimeObject = entry.dateTimeObject;
                }
                currentUri.dateTimeString = entry.dateTimeString;
                currentUri.dateTimeObject = entry.dateTimeObject;
              },
              targetduration: function targetduration() {
                if (!isFinite(entry.duration) || entry.duration < 0) {
                  this.trigger("warn", {
                    message: "ignoring invalid target duration: " + entry.duration
                  });
                  return;
                }
                this.manifest.targetDuration = entry.duration;
                setHoldBack.call(this, this.manifest);
              },
              start: function start2() {
                if (!entry.attributes || isNaN(entry.attributes["TIME-OFFSET"])) {
                  this.trigger("warn", {
                    message: "ignoring start declaration without appropriate attribute list"
                  });
                  return;
                }
                this.manifest.start = {
                  timeOffset: entry.attributes["TIME-OFFSET"],
                  precise: entry.attributes.PRECISE
                };
              },
              "cue-out": function cueOut() {
                currentUri.cueOut = entry.data;
              },
              "cue-out-cont": function cueOutCont() {
                currentUri.cueOutCont = entry.data;
              },
              "cue-in": function cueIn() {
                currentUri.cueIn = entry.data;
              },
              "skip": function skip() {
                this.manifest.skip = camelCaseKeys(entry.attributes);
                this.warnOnMissingAttributes_("#EXT-X-SKIP", entry.attributes, ["SKIPPED-SEGMENTS"]);
              },
              "part": function part() {
                var _this2 = this;
                hasParts = true;
                var segmentIndex = this.manifest.segments.length;
                var part2 = camelCaseKeys(entry.attributes);
                currentUri.parts = currentUri.parts || [];
                currentUri.parts.push(part2);
                if (part2.byterange) {
                  if (!part2.byterange.hasOwnProperty("offset")) {
                    part2.byterange.offset = lastPartByterangeEnd;
                  }
                  lastPartByterangeEnd = part2.byterange.offset + part2.byterange.length;
                }
                var partIndex = currentUri.parts.length - 1;
                this.warnOnMissingAttributes_("#EXT-X-PART #" + partIndex + " for segment #" + segmentIndex, entry.attributes, ["URI", "DURATION"]);
                if (this.manifest.renditionReports) {
                  this.manifest.renditionReports.forEach(function(r, i) {
                    if (!r.hasOwnProperty("lastPart")) {
                      _this2.trigger("warn", {
                        message: "#EXT-X-RENDITION-REPORT #" + i + " lacks required attribute(s): LAST-PART"
                      });
                    }
                  });
                }
              },
              "server-control": function serverControl() {
                var attrs = this.manifest.serverControl = camelCaseKeys(entry.attributes);
                if (!attrs.hasOwnProperty("canBlockReload")) {
                  attrs.canBlockReload = false;
                  this.trigger("info", {
                    message: "#EXT-X-SERVER-CONTROL defaulting CAN-BLOCK-RELOAD to false"
                  });
                }
                setHoldBack.call(this, this.manifest);
                if (attrs.canSkipDateranges && !attrs.hasOwnProperty("canSkipUntil")) {
                  this.trigger("warn", {
                    message: "#EXT-X-SERVER-CONTROL lacks required attribute CAN-SKIP-UNTIL which is required when CAN-SKIP-DATERANGES is set"
                  });
                }
              },
              "preload-hint": function preloadHint() {
                var segmentIndex = this.manifest.segments.length;
                var hint = camelCaseKeys(entry.attributes);
                var isPart = hint.type && hint.type === "PART";
                currentUri.preloadHints = currentUri.preloadHints || [];
                currentUri.preloadHints.push(hint);
                if (hint.byterange) {
                  if (!hint.byterange.hasOwnProperty("offset")) {
                    hint.byterange.offset = isPart ? lastPartByterangeEnd : 0;
                    if (isPart) {
                      lastPartByterangeEnd = hint.byterange.offset + hint.byterange.length;
                    }
                  }
                }
                var index = currentUri.preloadHints.length - 1;
                this.warnOnMissingAttributes_("#EXT-X-PRELOAD-HINT #" + index + " for segment #" + segmentIndex, entry.attributes, ["TYPE", "URI"]);
                if (!hint.type) {
                  return;
                }
                for (var i = 0; i < currentUri.preloadHints.length - 1; i++) {
                  var otherHint = currentUri.preloadHints[i];
                  if (!otherHint.type) {
                    continue;
                  }
                  if (otherHint.type === hint.type) {
                    this.trigger("warn", {
                      message: "#EXT-X-PRELOAD-HINT #" + index + " for segment #" + segmentIndex + " has the same TYPE " + hint.type + " as preload hint #" + i
                    });
                  }
                }
              },
              "rendition-report": function renditionReport() {
                var report = camelCaseKeys(entry.attributes);
                this.manifest.renditionReports = this.manifest.renditionReports || [];
                this.manifest.renditionReports.push(report);
                var index = this.manifest.renditionReports.length - 1;
                var required = ["LAST-MSN", "URI"];
                if (hasParts) {
                  required.push("LAST-PART");
                }
                this.warnOnMissingAttributes_("#EXT-X-RENDITION-REPORT #" + index, entry.attributes, required);
              },
              "part-inf": function partInf() {
                this.manifest.partInf = camelCaseKeys(entry.attributes);
                this.warnOnMissingAttributes_("#EXT-X-PART-INF", entry.attributes, ["PART-TARGET"]);
                if (this.manifest.partInf.partTarget) {
                  this.manifest.partTargetDuration = this.manifest.partInf.partTarget;
                }
                setHoldBack.call(this, this.manifest);
              }
            }[entry.tagType] || noop).call(self2);
          },
          uri: function uri() {
            currentUri.uri = entry.uri;
            uris.push(currentUri);
            if (this.manifest.targetDuration && !("duration" in currentUri)) {
              this.trigger("warn", {
                message: "defaulting segment duration to the target duration"
              });
              currentUri.duration = this.manifest.targetDuration;
            }
            if (_key) {
              currentUri.key = _key;
            }
            currentUri.timeline = currentTimeline;
            if (currentMap) {
              currentUri.map = currentMap;
            }
            lastPartByterangeEnd = 0;
            currentUri = {};
          },
          comment: function comment() {
          },
          custom: function custom() {
            if (entry.segment) {
              currentUri.custom = currentUri.custom || {};
              currentUri.custom[entry.customType] = entry.data;
            } else {
              this.manifest.custom = this.manifest.custom || {};
              this.manifest.custom[entry.customType] = entry.data;
            }
          }
        })[entry.type].call(self2);
      });
      return _this;
    }
    var _proto = Parser2.prototype;
    _proto.warnOnMissingAttributes_ = function warnOnMissingAttributes_(identifier, attributes, required) {
      var missing = [];
      required.forEach(function(key) {
        if (!attributes.hasOwnProperty(key)) {
          missing.push(key);
        }
      });
      if (missing.length) {
        this.trigger("warn", {
          message: identifier + " lacks required attribute(s): " + missing.join(", ")
        });
      }
    };
    _proto.push = function push(chunk) {
      this.lineStream.push(chunk);
    };
    _proto.end = function end() {
      this.lineStream.push("\n");
      this.trigger("end");
    };
    _proto.addParser = function addParser(options2) {
      this.parseStream.addParser(options2);
    };
    _proto.addTagMapper = function addTagMapper(options2) {
      this.parseStream.addTagMapper(options2);
    };
    return Parser2;
  })(Stream);

  // node_modules/wavefile/lib/parsers/base64-arraybuffer.js
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  function encode(bytes) {
    let base64 = "";
    for (let i = 0; i < bytes.length; i += 3) {
      base64 += chars[bytes[i] >> 2];
      base64 += chars[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
      base64 += chars[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
      base64 += chars[bytes[i + 2] & 63];
    }
    if (bytes.length % 3 === 2) {
      base64 = base64.substring(0, base64.length - 1) + "=";
    } else if (bytes.length % 3 === 1) {
      base64 = base64.substring(0, base64.length - 2) + "==";
    }
    return base64;
  }
  function decode(base64) {
    let lookup = new Uint8Array(256);
    for (let i = 0; i < chars.length; i++) {
      lookup[chars.charCodeAt(i)] = i;
    }
    let bufferLength = base64.length * 0.75;
    if (base64[base64.length - 1] === "=") {
      bufferLength--;
      if (base64[base64.length - 2] === "=") {
        bufferLength--;
      }
    }
    let bytes = new Uint8Array(bufferLength);
    for (let i = 0, j = 0; i < base64.length; i += 4) {
      let encoded1 = lookup[base64.charCodeAt(i)];
      let encoded2 = lookup[base64.charCodeAt(i + 1)];
      let encoded3 = lookup[base64.charCodeAt(i + 2)];
      let encoded4 = lookup[base64.charCodeAt(i + 3)];
      bytes[j++] = encoded1 << 2 | encoded2 >> 4;
      bytes[j++] = (encoded2 & 15) << 4 | encoded3 >> 2;
      bytes[j++] = (encoded3 & 3) << 6 | encoded4 & 63;
    }
    return bytes;
  }

  // node_modules/wavefile/lib/codecs/bitdepth.js
  function changeBitDepth(samples, bithDepth, newSamples, targetBitDepth) {
    if (["32f", "64"].indexOf(bithDepth) > -1 && ["32f", "64"].indexOf(targetBitDepth) > -1) {
      newSamples.set(samples);
      return;
    }
    validateBitDepth_(bithDepth);
    validateBitDepth_(targetBitDepth);
    let toFunction = getBitDepthFunction_(bithDepth, targetBitDepth);
    let options2 = {
      oldMin: Math.pow(2, parseInt(bithDepth, 10)) / 2,
      newMin: Math.pow(2, parseInt(targetBitDepth, 10)) / 2,
      oldMax: Math.pow(2, parseInt(bithDepth, 10)) / 2 - 1,
      newMax: Math.pow(2, parseInt(targetBitDepth, 10)) / 2 - 1
    };
    sign8Bit_(bithDepth, samples, true);
    for (let i = 0, len = samples.length; i < len; i++) {
      newSamples[i] = toFunction(samples[i], options2);
    }
    sign8Bit_(targetBitDepth, newSamples, false);
  }
  function intToInt_(sample, args) {
    if (sample > 0) {
      sample = parseInt(sample / args.oldMax * args.newMax, 10);
    } else {
      sample = parseInt(sample / args.oldMin * args.newMin, 10);
    }
    return sample;
  }
  function floatToInt_(sample, args) {
    return parseInt(
      sample > 0 ? sample * args.newMax : sample * args.newMin,
      10
    );
  }
  function intToFloat_(sample, args) {
    return sample > 0 ? sample / args.oldMax : sample / args.oldMin;
  }
  function getBitDepthFunction_(original, target) {
    let func = function(x) {
      return x;
    };
    if (original != target) {
      if (["32f", "64"].includes(original)) {
        func = floatToInt_;
      } else {
        if (["32f", "64"].includes(target)) {
          func = intToFloat_;
        } else {
          func = intToInt_;
        }
      }
    }
    return func;
  }
  function validateBitDepth_(bitDepth) {
    if (bitDepth != "32f" && bitDepth != "64" && (parseInt(bitDepth, 10) < "8" || parseInt(bitDepth, 10) > "53")) {
      throw new Error("Invalid bit depth.");
    }
  }
  function sign8Bit_(bitDepth, samples, sign) {
    if (bitDepth == "8") {
      let factor = sign ? -128 : 128;
      for (let i = 0, len = samples.length; i < len; i++) {
        samples[i] = samples[i] += factor;
      }
    }
  }

  // node_modules/wavefile/lib/codecs/imaadpcm.js
  var INDEX_TABLE = [
    -1,
    -1,
    -1,
    -1,
    2,
    4,
    6,
    8,
    -1,
    -1,
    -1,
    -1,
    2,
    4,
    6,
    8
  ];
  var STEP_TABLE = [
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    16,
    17,
    19,
    21,
    23,
    25,
    28,
    31,
    34,
    37,
    41,
    45,
    50,
    55,
    60,
    66,
    73,
    80,
    88,
    97,
    107,
    118,
    130,
    143,
    157,
    173,
    190,
    209,
    230,
    253,
    279,
    307,
    337,
    371,
    408,
    449,
    494,
    544,
    598,
    658,
    724,
    796,
    876,
    963,
    1060,
    1166,
    1282,
    1411,
    1552,
    1707,
    1878,
    2066,
    2272,
    2499,
    2749,
    3024,
    3327,
    3660,
    4026,
    4428,
    4871,
    5358,
    5894,
    6484,
    7132,
    7845,
    8630,
    9493,
    10442,
    11487,
    12635,
    13899,
    15289,
    16818,
    18500,
    20350,
    22385,
    24623,
    27086,
    29794,
    32767
  ];
  function encode2(samples) {
    let state = {
      index: 0,
      predicted: 0,
      step: 7
    };
    let adpcmSamples = new Uint8Array(samples.length);
    let block = [];
    let fileIndex = 0;
    let blockCount = 0;
    for (let i = 0, len = samples.length; i < len; i++) {
      if (i % 505 == 0 && i != 0) {
        adpcmSamples.set(encodeBlock(block, state), fileIndex);
        fileIndex += 256;
        block = [];
        blockCount++;
      }
      block.push(samples[i]);
    }
    let samplesLength = samples.length / 2;
    if (samplesLength % 2) {
      samplesLength++;
    }
    return adpcmSamples.slice(0, samplesLength + 512 + blockCount * 4);
  }
  function decode2(adpcmSamples, blockAlign = 256) {
    let state = {
      index: 0,
      predicted: 0,
      step: 7
    };
    let samples = new Int16Array(adpcmSamples.length * 2);
    let block = [];
    let fileIndex = 0;
    for (let i = 0, len = adpcmSamples.length; i < len; i++) {
      if (i % blockAlign == 0 && i != 0) {
        let decoded = decodeBlock(block, state);
        samples.set(decoded, fileIndex);
        fileIndex += decoded.length;
        block = [];
      }
      block.push(adpcmSamples[i]);
    }
    return samples;
  }
  function encodeBlock(block, state) {
    let adpcmSamples = blockHead_(block[0], state);
    for (let i = 3, len = block.length; i < len; i += 2) {
      let sample2 = encodeSample_(block[i], state);
      let sample = encodeSample_(block[i + 1], state);
      adpcmSamples.push(sample << 4 | sample2);
    }
    return adpcmSamples;
  }
  function decodeBlock(block, state) {
    state.predicted = sign_(block[1] << 8 | block[0]);
    state.index = block[2];
    state.step = STEP_TABLE[state.index];
    let result = [
      state.predicted,
      state.predicted
    ];
    for (let i = 4, len = block.length; i < len; i++) {
      let original_sample = block[i];
      let second_sample = original_sample >> 4;
      let first_sample = second_sample << 4 ^ original_sample;
      result.push(decodeSample_(first_sample, state));
      result.push(decodeSample_(second_sample, state));
    }
    return result;
  }
  function sign_(num) {
    return num > 32768 ? num - 65536 : num;
  }
  function encodeSample_(sample, state) {
    let delta = sample - state.predicted;
    let value = 0;
    if (delta >= 0) {
      value = 0;
    } else {
      value = 8;
      delta = -delta;
    }
    let step = STEP_TABLE[state.index];
    let diff = step >> 3;
    if (delta > step) {
      value |= 4;
      delta -= step;
      diff += step;
    }
    step >>= 1;
    if (delta > step) {
      value |= 2;
      delta -= step;
      diff += step;
    }
    step >>= 1;
    if (delta > step) {
      value |= 1;
      diff += step;
    }
    updateEncoder_(value, diff, state);
    return value;
  }
  function updateEncoder_(value, diff, state) {
    if (value & 8) {
      state.predicted -= diff;
    } else {
      state.predicted += diff;
    }
    if (state.predicted < -32768) {
      state.predicted = -32768;
    } else if (state.predicted > 32767) {
      state.predicted = 32767;
    }
    state.index += INDEX_TABLE[value & 7];
    if (state.index < 0) {
      state.index = 0;
    } else if (state.index > 88) {
      state.index = 88;
    }
  }
  function decodeSample_(nibble, state) {
    let difference = 0;
    if (nibble & 4) {
      difference += state.step;
    }
    if (nibble & 2) {
      difference += state.step >> 1;
    }
    if (nibble & 1) {
      difference += state.step >> 2;
    }
    difference += state.step >> 3;
    if (nibble & 8) {
      difference = -difference;
    }
    state.predicted += difference;
    if (state.predicted > 32767) {
      state.predicted = 32767;
    } else if (state.predicted < -32767) {
      state.predicted = -32767;
    }
    updateDecoder_(nibble, state);
    return state.predicted;
  }
  function updateDecoder_(nibble, state) {
    state.index += INDEX_TABLE[nibble];
    if (state.index < 0) {
      state.index = 0;
    } else if (state.index > 88) {
      state.index = 88;
    }
    state.step = STEP_TABLE[state.index];
  }
  function blockHead_(sample, state) {
    encodeSample_(sample, state);
    let adpcmSamples = [];
    adpcmSamples.push(sample & 255);
    adpcmSamples.push(sample >> 8 & 255);
    adpcmSamples.push(state.index);
    adpcmSamples.push(0);
    return adpcmSamples;
  }

  // node_modules/wavefile/lib/codecs/alaw.js
  var LOG_TABLE = [
    1,
    1,
    2,
    2,
    3,
    3,
    3,
    3,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7
  ];
  function encodeSample(sample) {
    let compandedValue;
    sample = sample == -32768 ? -32767 : sample;
    let sign = ~sample >> 8 & 128;
    if (!sign) {
      sample = sample * -1;
    }
    if (sample > 32635) {
      sample = 32635;
    }
    if (sample >= 256) {
      let exponent = LOG_TABLE[sample >> 8 & 127];
      let mantissa = sample >> exponent + 3 & 15;
      compandedValue = exponent << 4 | mantissa;
    } else {
      compandedValue = sample >> 4;
    }
    return compandedValue ^ (sign ^ 85);
  }
  function decodeSample(aLawSample) {
    let sign = 0;
    aLawSample ^= 85;
    if ((aLawSample & 128) !== 0) {
      aLawSample &= ~(1 << 7);
      sign = -1;
    }
    let position = ((aLawSample & 240) >> 4) + 4;
    let decoded = 0;
    if (position != 4) {
      decoded = 1 << position | (aLawSample & 15) << position - 4 | 1 << position - 5;
    } else {
      decoded = aLawSample << 1 | 1;
    }
    decoded = sign === 0 ? decoded : -decoded;
    return decoded * 8 * -1;
  }
  function encode3(samples) {
    let aLawSamples = new Uint8Array(samples.length);
    for (let i = 0, len = samples.length; i < len; i++) {
      aLawSamples[i] = encodeSample(samples[i]);
    }
    return aLawSamples;
  }
  function decode3(samples) {
    let pcmSamples = new Int16Array(samples.length);
    for (let i = 0, len = samples.length; i < len; i++) {
      pcmSamples[i] = decodeSample(samples[i]);
    }
    return pcmSamples;
  }

  // node_modules/wavefile/lib/codecs/mulaw.js
  var BIAS = 132;
  var CLIP = 32635;
  var encodeTable = [
    0,
    0,
    1,
    1,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    6,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7
  ];
  var decodeTable = [0, 132, 396, 924, 1980, 4092, 8316, 16764];
  function encodeSample2(sample) {
    let sign;
    let exponent;
    let mantissa;
    let muLawSample;
    sign = sample >> 8 & 128;
    if (sign != 0) sample = -sample;
    sample = sample + BIAS;
    if (sample > CLIP) sample = CLIP;
    exponent = encodeTable[sample >> 7 & 255];
    mantissa = sample >> exponent + 3 & 15;
    muLawSample = ~(sign | exponent << 4 | mantissa);
    return muLawSample;
  }
  function decodeSample2(muLawSample) {
    let sign;
    let exponent;
    let mantissa;
    let sample;
    muLawSample = ~muLawSample;
    sign = muLawSample & 128;
    exponent = muLawSample >> 4 & 7;
    mantissa = muLawSample & 15;
    sample = decodeTable[exponent] + (mantissa << exponent + 3);
    if (sign != 0) sample = -sample;
    return sample;
  }
  function encode4(samples) {
    let muLawSamples = new Uint8Array(samples.length);
    for (let i = 0, len = samples.length; i < len; i++) {
      muLawSamples[i] = encodeSample2(samples[i]);
    }
    return muLawSamples;
  }
  function decode4(samples) {
    let pcmSamples = new Int16Array(samples.length);
    for (let i = 0, len = samples.length; i < len; i++) {
      pcmSamples[i] = decodeSample2(samples[i]);
    }
    return pcmSamples;
  }

  // node_modules/wavefile/lib/parsers/binary/lib/endianness.js
  function endianness(bytes, offset, start2 = 0, end = bytes.length) {
    for (let index = start2; index < end; index += offset) {
      swap_(bytes, offset, index);
    }
  }
  function swap_(bytes, offset, index) {
    offset--;
    for (let x = 0; x < offset; x++) {
      let theByte = bytes[index + x];
      bytes[index + x] = bytes[index + offset];
      bytes[index + offset] = theByte;
      offset--;
    }
  }

  // node_modules/wavefile/lib/parsers/binary/lib/utf8-parser.js
  function unpack(buffer, start2 = 0, end = buffer.length) {
    let str = "";
    for (let index = start2; index < end; ) {
      let lowerBoundary = 128;
      let upperBoundary = 191;
      let replace = false;
      let charCode = buffer[index++];
      if (charCode >= 0 && charCode <= 127) {
        str += String.fromCharCode(charCode);
      } else {
        let count = 0;
        if (charCode >= 194 && charCode <= 223) {
          count = 1;
        } else if (charCode >= 224 && charCode <= 239) {
          count = 2;
          if (buffer[index] === 224) {
            lowerBoundary = 160;
          }
          if (buffer[index] === 237) {
            upperBoundary = 159;
          }
        } else if (charCode >= 240 && charCode <= 244) {
          count = 3;
          if (buffer[index] === 240) {
            lowerBoundary = 144;
          }
          if (buffer[index] === 244) {
            upperBoundary = 143;
          }
        } else {
          replace = true;
        }
        charCode = charCode & (1 << 8 - count - 1) - 1;
        for (let i = 0; i < count; i++) {
          if (buffer[index] < lowerBoundary || buffer[index] > upperBoundary) {
            replace = true;
          }
          charCode = charCode << 6 | buffer[index] & 63;
          index++;
        }
        if (replace) {
          str += String.fromCharCode(65533);
        } else if (charCode <= 65535) {
          str += String.fromCharCode(charCode);
        } else {
          charCode -= 65536;
          str += String.fromCharCode(
            (charCode >> 10 & 1023) + 55296,
            (charCode & 1023) + 56320
          );
        }
      }
    }
    return str;
  }
  function pack(str, buffer, index = 0) {
    let i = 0;
    let len = str.length;
    while (i < len) {
      let codePoint = str.codePointAt(i);
      if (codePoint < 128) {
        buffer[index] = codePoint;
        index++;
      } else {
        let count = 0;
        let offset = 0;
        if (codePoint <= 2047) {
          count = 1;
          offset = 192;
        } else if (codePoint <= 65535) {
          count = 2;
          offset = 224;
        } else if (codePoint <= 1114111) {
          count = 3;
          offset = 240;
          i++;
        }
        buffer[index] = (codePoint >> 6 * count) + offset;
        index++;
        while (count > 0) {
          buffer[index] = 128 | codePoint >> 6 * (count - 1) & 63;
          index++;
          count--;
        }
      }
      i++;
    }
    return index;
  }

  // node_modules/wavefile/lib/parsers/binary/lib/int-parser.js
  var IntParser = class {
    /**
     * @param {number} bits The number of bits used by the integer.
     * @param {boolean} [signed=false] True for signed, false otherwise.
     */
    constructor(bits, signed = false) {
      this.bits = bits;
      this.offset = Math.ceil(bits / 8);
      this.max = Math.pow(2, bits) - 1;
      this.min = 0;
      this.unpack = this.unpack_;
      if (signed) {
        this.max = Math.pow(2, bits) / 2 - 1;
        this.min = -this.max - 1;
        this.unpack = this.unpackSigned_;
      }
    }
    /**
     * Write one unsigned integer to a byte buffer.
     * @param {!(Uint8Array|Array<number>)} buffer An array of bytes.
     * @param {number} num The number. Overflows are truncated.
     * @param {number} [index=0] The index being written in the byte buffer.
     * @return {number} The next index to write on the byte buffer.
     */
    pack(buffer, num, index = 0) {
      num = this.clamp_(Math.round(num));
      for (let i = 0, len = this.offset; i < len; i++) {
        buffer[index] = Math.floor(num / Math.pow(2, i * 8)) & 255;
        index++;
      }
      return index;
    }
    /**
     * Read one unsigned integer from a byte buffer.
     * Does not check for overflows.
     * @param {!(Uint8Array|Array<number>)} buffer An array of bytes.
     * @param {number} [index=0] The index to read.
     * @return {number}
     * @private
     */
    unpack_(buffer, index = 0) {
      let num = 0;
      for (let x = 0; x < this.offset; x++) {
        num += buffer[index + x] * Math.pow(256, x);
      }
      return num;
    }
    /**
     * Read one two's complement signed integer from a byte buffer.
     * @param {!(Uint8Array|Array<number>)} buffer An array of bytes.
     * @param {number} [index=0] The index to read.
     * @return {number}
     * @private
     */
    unpackSigned_(buffer, index = 0) {
      return this.sign_(this.unpack_(buffer, index));
    }
    /**
     * Clamp values on overflow.
     * @param {number} num The number.
     * @private
     */
    clamp_(num) {
      if (num > this.max) {
        return this.max;
      } else if (num < this.min) {
        return this.min;
      }
      return num;
    }
    /**
     * Sign a number.
     * @param {number} num The number.
     * @return {number}
     * @private
     */
    sign_(num) {
      if (num > this.max) {
        num -= this.max * 2 + 2;
      }
      return num;
    }
  };

  // node_modules/wavefile/lib/parsers/binary/lib/float-parser.js
  var FloatParser = class {
    /**
     * Pack a IEEE 754 floating point number.
     * @param {number} ebits The exponent bits.
     * @param {number} fbits The fraction bits.
     */
    constructor(ebits, fbits) {
      this.offset = Math.ceil((ebits + fbits) / 8);
      this.ebits = ebits;
      this.fbits = fbits;
      this.bias = (1 << ebits - 1) - 1;
      this.biasP2 = Math.pow(2, this.bias + 1);
      this.ebitsFbits = ebits + fbits;
      this.fbias = Math.pow(2, -(8 * this.offset - 1 - ebits));
    }
    /**
     * Pack a IEEE 754 floating point number.
     * @param {!Uint8Array|!Array<number>} buffer The buffer.
     * @param {number} num The number.
     * @param {number} index The index to write on the buffer.
     * @return {number} The next index to write on the buffer.
     */
    pack(buffer, num, index) {
      if (Math.abs(num) > this.biasP2 - this.ebitsFbits * 2) {
        num = num < 0 ? -Infinity : Infinity;
      }
      let sign = ((num = +num) || 1 / num) < 0 ? 1 : num < 0 ? 1 : 0;
      num = Math.abs(num);
      let exp = Math.min(Math.floor(Math.log(num) / Math.LN2), 1023);
      let fraction = roundToEven(num / Math.pow(2, exp) * Math.pow(2, this.fbits));
      if (num !== num) {
        fraction = Math.pow(2, this.fbits - 1);
        exp = (1 << this.ebits) - 1;
      } else if (num !== 0) {
        if (num >= Math.pow(2, 1 - this.bias)) {
          if (fraction / Math.pow(2, this.fbits) >= 2) {
            exp = exp + 1;
            fraction = 1;
          }
          if (exp > this.bias) {
            exp = (1 << this.ebits) - 1;
            fraction = 0;
          } else {
            exp = exp + this.bias;
            fraction = roundToEven(fraction) - Math.pow(2, this.fbits);
          }
        } else {
          fraction = roundToEven(num / Math.pow(2, 1 - this.bias - this.fbits));
          exp = 0;
        }
      }
      return this.packFloatBits_(buffer, index, sign, exp, fraction);
    }
    /**
     * Unpack a IEEE 754 floating point number.
     * Derived from IEEE754 by DeNA Co., Ltd., MIT License. 
     * Adapted to handle NaN. Should port the solution to the original repo.
     * @param {!Uint8Array|!Array<number>} buffer The buffer.
     * @param {number} index The index to read from the buffer.
     * @return {number} The floating point number.
     */
    unpack(buffer, index) {
      let eMax = (1 << this.ebits) - 1;
      let significand;
      let leftBits = "";
      for (let i = this.offset - 1; i >= 0; i--) {
        let t = buffer[i + index].toString(2);
        leftBits += "00000000".substring(t.length) + t;
      }
      let sign = leftBits.charAt(0) == "1" ? -1 : 1;
      leftBits = leftBits.substring(1);
      let exponent = parseInt(leftBits.substring(0, this.ebits), 2);
      leftBits = leftBits.substring(this.ebits);
      if (exponent == eMax) {
        if (parseInt(leftBits, 2) !== 0) {
          return NaN;
        }
        return sign * Infinity;
      } else if (exponent === 0) {
        exponent += 1;
        significand = parseInt(leftBits, 2);
      } else {
        significand = parseInt("1" + leftBits, 2);
      }
      return sign * significand * this.fbias * Math.pow(2, exponent - this.bias);
    }
    /**
     * Pack a IEEE754 from its sign, exponent and fraction bits
     * and place it in a byte buffer.
     * @param {!Uint8Array|!Array<number>} buffer The byte buffer to write to.
     * @param {number} index The buffer index to write.
     * @param {number} sign The sign.
     * @param {number} exp the exponent.
     * @param {number} fraction The fraction.
     * @return {number}
     * @private
     */
    packFloatBits_(buffer, index, sign, exp, fraction) {
      let bits = [];
      bits.push(sign);
      for (let i = this.ebits; i > 0; i -= 1) {
        bits[i] = exp % 2 ? 1 : 0;
        exp = Math.floor(exp / 2);
      }
      let len = bits.length;
      for (let i = this.fbits; i > 0; i -= 1) {
        bits[len + i] = fraction % 2 ? 1 : 0;
        fraction = Math.floor(fraction / 2);
      }
      let str = bits.join("");
      let offset = this.offset + index - 1;
      let k = index;
      while (offset >= index) {
        buffer[offset] = parseInt(str.substring(0, 8), 2);
        str = str.substring(8);
        offset--;
        k++;
      }
      return k;
    }
  };
  function roundToEven(n) {
    let w = Math.floor(n);
    let f = n - w;
    if (f < 0.5) {
      return w;
    }
    if (f > 0.5) {
      return w + 1;
    }
    return w % 2 ? w + 1 : w;
  }

  // node_modules/wavefile/lib/parsers/binary/index.js
  function unpackString(buffer, index = 0, end = buffer.length) {
    return unpack(buffer, index, end);
  }
  function packString(str) {
    let buffer = [];
    pack(str, buffer);
    return buffer;
  }
  function packStringTo(str, buffer, index = 0) {
    return pack(str, buffer, index);
  }
  function packArrayTo(values, theType, buffer, index = 0) {
    theType = theType || {};
    let packer = getParser_(theType.bits, theType.fp, theType.signed);
    let offset = Math.ceil(theType.bits / 8);
    let i = 0;
    let start2 = index;
    for (let valuesLen = values.length; i < valuesLen; i++) {
      index = packer.pack(buffer, values[i], index);
    }
    if (theType.be) {
      endianness(buffer, offset, start2, index);
    }
    return index;
  }
  function unpackArrayTo(buffer, theType, output, start2 = 0, end = buffer.length) {
    theType = theType || {};
    let parser = getParser_(theType.bits, theType.fp, theType.signed);
    end = getUnpackLen_(buffer, start2, end, parser.offset);
    if (theType.be) {
      let readBuffer = copyBuffer_(buffer);
      if (theType.be) {
        endianness(readBuffer, parser.offset, start2, end);
      }
      unpack_(readBuffer, output, start2, end, parser);
    } else {
      unpack_(buffer, output, start2, end, parser);
    }
  }
  function packTo(value, theType, buffer, index = 0) {
    return packArrayTo([value], theType, buffer, index);
  }
  function pack2(value, theType) {
    let output = [];
    packTo(value, theType, output, 0);
    return output;
  }
  function unpack2(buffer, theType, index = 0) {
    let output = [];
    unpackArrayTo(
      buffer,
      theType,
      output,
      index,
      index + Math.ceil(theType.bits / 8)
    );
    return output[0];
  }
  function unpack_(buffer, output, start2, end, parser) {
    let offset = parser.offset;
    for (let index = 0, j = start2; j < end; j += offset, index++) {
      output[index] = parser.unpack(buffer, j);
    }
  }
  function copyBuffer_(buffer) {
    return new Uint8Array(buffer);
  }
  function getUnpackLen_(buffer, start2, end, offset) {
    let extra = (end - start2) % offset;
    return end - extra;
  }
  function getParser_(bits, fp, signed) {
    if (fp && bits == 32) {
      return new FloatParser(8, 23);
    } else if (fp && bits == 64) {
      return new FloatParser(11, 52);
    }
    return new IntParser(bits, signed);
  }

  // node_modules/wavefile/lib/riff-file.js
  var RIFFFile = class {
    constructor() {
      this.container = "";
      this.chunkSize = 0;
      this.format = "";
      this.signature = null;
      this.head = 0;
      this.uInt32 = { bits: 32, be: false };
      this.supported_containers = ["RIFF", "RIFX"];
    }
    /**
     * Read the signature of the chunks in a RIFF/RIFX file.
     * @param {!Uint8Array} buffer The file bytes.
     * @protected
     */
    setSignature(buffer) {
      this.head = 0;
      this.container = this.readString(buffer, 4);
      if (this.supported_containers.indexOf(this.container) === -1) {
        throw Error("Not a supported format.");
      }
      this.uInt32.be = this.container === "RIFX";
      this.chunkSize = this.readUInt32(buffer);
      this.format = this.readString(buffer, 4);
      this.signature = {
        chunkId: this.container,
        chunkSize: this.chunkSize,
        format: this.format,
        subChunks: this.getSubChunksIndex_(buffer)
      };
    }
    /**
      * Find a chunk by its fourCC_ in a array of RIFF chunks.
      * @param {string} chunkId The chunk fourCC_.
      * @param {boolean} [multiple=false] True if there may be multiple chunks
      *    with the same chunkId.
      * @return {Object}
      * @protected
      */
    findChunk(chunkId, multiple = false) {
      let chunks = this.signature.subChunks;
      let chunk = [];
      for (let i = 0; i < chunks.length; i++) {
        if (chunks[i].chunkId == chunkId) {
          if (multiple) {
            chunk.push(chunks[i]);
          } else {
            return chunks[i];
          }
        }
      }
      if (chunkId == "LIST") {
        return chunk.length ? chunk : null;
      }
      return null;
    }
    /**
     * Read bytes as a string from a RIFF chunk.
     * @param {!Uint8Array} bytes The bytes.
     * @param {number} maxSize the max size of the string.
     * @return {string} The string.
     * @protected
     */
    readString(bytes, maxSize) {
      let str = "";
      str = unpackString(bytes, this.head, this.head + maxSize);
      this.head += maxSize;
      return str;
    }
    /**
     * Read a number from a chunk.
     * @param {!Uint8Array} bytes The chunk bytes.
     * @return {number} The number.
     * @protected
     */
    readUInt32(bytes) {
      let value = unpack2(bytes, this.uInt32, this.head);
      this.head += 4;
      return value;
    }
    /**
     * Return the sub chunks of a RIFF file.
     * @param {!Uint8Array} buffer the RIFF file bytes.
     * @return {!Array<Object>} The subchunks of a RIFF/RIFX or LIST chunk.
     * @private
     */
    getSubChunksIndex_(buffer) {
      let chunks = [];
      let i = this.head;
      while (i <= buffer.length - 8) {
        chunks.push(this.getSubChunkIndex_(buffer, i));
        i += 8 + chunks[chunks.length - 1].chunkSize;
        i = i % 2 ? i + 1 : i;
      }
      return chunks;
    }
    /**
     * Return a sub chunk from a RIFF file.
     * @param {!Uint8Array} buffer the RIFF file bytes.
     * @param {number} index The start index of the chunk.
     * @return {!Object} A subchunk of a RIFF/RIFX or LIST chunk.
     * @private
     */
    getSubChunkIndex_(buffer, index) {
      let chunk = {
        chunkId: this.getChunkId_(buffer, index),
        chunkSize: this.getChunkSize_(buffer, index)
      };
      if (chunk.chunkId == "LIST") {
        chunk.format = unpackString(buffer, index + 8, index + 12);
        this.head += 4;
        chunk.subChunks = this.getSubChunksIndex_(buffer);
      } else {
        let realChunkSize = chunk.chunkSize % 2 ? chunk.chunkSize + 1 : chunk.chunkSize;
        this.head = index + 8 + realChunkSize;
        chunk.chunkData = {
          start: index + 8,
          end: this.head
        };
      }
      return chunk;
    }
    /**
     * Return the fourCC_ of a chunk.
     * @param {!Uint8Array} buffer the RIFF file bytes.
     * @param {number} index The start index of the chunk.
     * @return {string} The id of the chunk.
     * @private
     */
    getChunkId_(buffer, index) {
      this.head += 4;
      return unpackString(buffer, index, index + 4);
    }
    /**
     * Return the size of a chunk.
     * @param {!Uint8Array} buffer the RIFF file bytes.
     * @param {number} index The start index of the chunk.
     * @return {number} The size of the chunk without the id and size fields.
     * @private
     */
    getChunkSize_(buffer, index) {
      this.head += 4;
      return unpack2(buffer, this.uInt32, index + 4);
    }
  };

  // node_modules/wavefile/lib/wavefile-reader.js
  var WaveFileReader = class _WaveFileReader extends RIFFFile {
    constructor() {
      super();
      this.supported_containers.push("RF64");
      this.fmt = {
        /** @type {string} */
        chunkId: "",
        /** @type {number} */
        chunkSize: 0,
        /** @type {number} */
        audioFormat: 0,
        /** @type {number} */
        numChannels: 0,
        /** @type {number} */
        sampleRate: 0,
        /** @type {number} */
        byteRate: 0,
        /** @type {number} */
        blockAlign: 0,
        /** @type {number} */
        bitsPerSample: 0,
        /** @type {number} */
        cbSize: 0,
        /** @type {number} */
        validBitsPerSample: 0,
        /** @type {number} */
        dwChannelMask: 0,
        /**
         * 4 32-bit values representing a 128-bit ID
         * @type {!Array<number>}
         */
        subformat: []
      };
      this.fact = {
        /** @type {string} */
        chunkId: "",
        /** @type {number} */
        chunkSize: 0,
        /** @type {number} */
        dwSampleLength: 0
      };
      this.cue = {
        /** @type {string} */
        chunkId: "",
        /** @type {number} */
        chunkSize: 0,
        /** @type {number} */
        dwCuePoints: 0,
        /** @type {!Array<!Object>} */
        points: []
      };
      this.smpl = {
        /** @type {string} */
        chunkId: "",
        /** @type {number} */
        chunkSize: 0,
        /** @type {number} */
        dwManufacturer: 0,
        /** @type {number} */
        dwProduct: 0,
        /** @type {number} */
        dwSamplePeriod: 0,
        /** @type {number} */
        dwMIDIUnityNote: 0,
        /** @type {number} */
        dwMIDIPitchFraction: 0,
        /** @type {number} */
        dwSMPTEFormat: 0,
        /** @type {number} */
        dwSMPTEOffset: 0,
        /** @type {number} */
        dwNumSampleLoops: 0,
        /** @type {number} */
        dwSamplerData: 0,
        /** @type {!Array<!Object>} */
        loops: []
      };
      this.bext = {
        /** @type {string} */
        chunkId: "",
        /** @type {number} */
        chunkSize: 0,
        /** @type {string} */
        description: "",
        //256
        /** @type {string} */
        originator: "",
        //32
        /** @type {string} */
        originatorReference: "",
        //32
        /** @type {string} */
        originationDate: "",
        //10
        /** @type {string} */
        originationTime: "",
        //8
        /**
         * 2 32-bit values, timeReference high and low
         * @type {!Array<number>}
         */
        timeReference: [0, 0],
        /** @type {number} */
        version: 0,
        //WORD
        /** @type {string} */
        UMID: "",
        // 64 chars
        /** @type {number} */
        loudnessValue: 0,
        //WORD
        /** @type {number} */
        loudnessRange: 0,
        //WORD
        /** @type {number} */
        maxTruePeakLevel: 0,
        //WORD
        /** @type {number} */
        maxMomentaryLoudness: 0,
        //WORD
        /** @type {number} */
        maxShortTermLoudness: 0,
        //WORD
        /** @type {string} */
        reserved: "",
        //180
        /** @type {string} */
        codingHistory: ""
        // string, unlimited
      };
      this.iXML = {
        /** @type {string} */
        chunkId: "",
        /** @type {number} */
        chunkSize: 0,
        /** @type {string} */
        value: ""
      };
      this.ds64 = {
        /** @type {string} */
        chunkId: "",
        /** @type {number} */
        chunkSize: 0,
        /** @type {number} */
        riffSizeHigh: 0,
        // DWORD
        /** @type {number} */
        riffSizeLow: 0,
        // DWORD
        /** @type {number} */
        dataSizeHigh: 0,
        // DWORD
        /** @type {number} */
        dataSizeLow: 0,
        // DWORD
        /** @type {number} */
        originationTime: 0,
        // DWORD
        /** @type {number} */
        sampleCountHigh: 0,
        // DWORD
        /** @type {number} */
        sampleCountLow: 0
        // DWORD
        /** @type {number} */
        //'tableLength': 0, // DWORD
        /** @type {!Array<number>} */
        //'table': []
      };
      this.data = {
        /** @type {string} */
        chunkId: "",
        /** @type {number} */
        chunkSize: 0,
        /** @type {!Uint8Array} */
        samples: new Uint8Array(0)
      };
      this.LIST = [];
      this.junk = {
        /** @type {string} */
        chunkId: "",
        /** @type {number} */
        chunkSize: 0,
        /** @type {!Array<number>} */
        chunkData: []
      };
      this._PMX = {
        /** @type {string} */
        chunkId: "",
        /** @type {number} */
        chunkSize: 0,
        /** @type {string} */
        value: ""
      };
      this.uInt16 = { bits: 16, be: false, signed: false, fp: false };
    }
    /**
     * Set up the WaveFileReader object from a byte buffer.
     * @param {!Uint8Array} wavBuffer The buffer.
     * @param {boolean=} [samples=true] True if the samples should be loaded.
     * @throws {Error} If container is not RIFF, RIFX or RF64.
     * @throws {Error} If format is not WAVE.
     * @throws {Error} If no 'fmt ' chunk is found.
     * @throws {Error} If no 'data' chunk is found.
     */
    fromBuffer(wavBuffer, samples = true) {
      this.clearHeaders();
      this.setSignature(wavBuffer);
      this.uInt16.be = this.uInt32.be;
      if (this.format != "WAVE") {
        throw Error('Could not find the "WAVE" format identifier');
      }
      this.readDs64Chunk_(wavBuffer);
      this.readFmtChunk_(wavBuffer);
      this.readFactChunk_(wavBuffer);
      this.readBextChunk_(wavBuffer);
      this.readiXMLChunk_(wavBuffer);
      this.readCueChunk_(wavBuffer);
      this.readSmplChunk_(wavBuffer);
      this.readDataChunk_(wavBuffer, samples);
      this.readJunkChunk_(wavBuffer);
      this.readLISTChunk_(wavBuffer);
      this.read_PMXChunk_(wavBuffer);
    }
    /**
     * Reset the chunks of the WaveFileReader instance.
     * @protected
     * @ignore
     */
    clearHeaders() {
      let tmpWav = new _WaveFileReader();
      Object.assign(this.fmt, tmpWav.fmt);
      Object.assign(this.fact, tmpWav.fact);
      Object.assign(this.cue, tmpWav.cue);
      Object.assign(this.smpl, tmpWav.smpl);
      Object.assign(this.bext, tmpWav.bext);
      Object.assign(this.iXML, tmpWav.iXML);
      Object.assign(this.ds64, tmpWav.ds64);
      Object.assign(this.data, tmpWav.data);
      this.LIST = [];
      Object.assign(this.junk, tmpWav.junk);
      Object.assign(this._PMX, tmpWav._PMX);
    }
    /**
     * Read the 'fmt ' chunk of a wave file.
     * @param {!Uint8Array} buffer The wav file buffer.
     * @throws {Error} If no 'fmt ' chunk is found.
     * @private
     */
    readFmtChunk_(buffer) {
      let chunk = this.findChunk("fmt ");
      if (chunk) {
        this.head = chunk.chunkData.start;
        this.fmt.chunkId = chunk.chunkId;
        this.fmt.chunkSize = chunk.chunkSize;
        this.fmt.audioFormat = this.readUInt16_(buffer);
        this.fmt.numChannels = this.readUInt16_(buffer);
        this.fmt.sampleRate = this.readUInt32(buffer);
        this.fmt.byteRate = this.readUInt32(buffer);
        this.fmt.blockAlign = this.readUInt16_(buffer);
        this.fmt.bitsPerSample = this.readUInt16_(buffer);
        this.readFmtExtension_(buffer);
      } else {
        throw Error('Could not find the "fmt " chunk');
      }
    }
    /**
     * Read the 'fmt ' chunk extension.
     * @param {!Uint8Array} buffer The wav file buffer.
     * @private
     */
    readFmtExtension_(buffer) {
      if (this.fmt.chunkSize > 16) {
        this.fmt.cbSize = this.readUInt16_(buffer);
        if (this.fmt.chunkSize > 18) {
          this.fmt.validBitsPerSample = this.readUInt16_(buffer);
          if (this.fmt.chunkSize > 20) {
            this.fmt.dwChannelMask = this.readUInt32(buffer);
            this.fmt.subformat = [
              this.readUInt32(buffer),
              this.readUInt32(buffer),
              this.readUInt32(buffer),
              this.readUInt32(buffer)
            ];
          }
        }
      }
    }
    /**
     * Read the 'fact' chunk of a wav file.
     * @param {!Uint8Array} buffer The wav file buffer.
     * @private
     */
    readFactChunk_(buffer) {
      let chunk = this.findChunk("fact");
      if (chunk) {
        this.head = chunk.chunkData.start;
        this.fact.chunkId = chunk.chunkId;
        this.fact.chunkSize = chunk.chunkSize;
        this.fact.dwSampleLength = this.readUInt32(buffer);
      }
    }
    /**
     * Read the 'cue ' chunk of a wave file.
     * @param {!Uint8Array} buffer The wav file buffer.
     * @private
     */
    readCueChunk_(buffer) {
      let chunk = this.findChunk("cue ");
      if (chunk) {
        this.head = chunk.chunkData.start;
        this.cue.chunkId = chunk.chunkId;
        this.cue.chunkSize = chunk.chunkSize;
        this.cue.dwCuePoints = this.readUInt32(buffer);
        for (let i = 0; i < this.cue.dwCuePoints; i++) {
          this.cue.points.push({
            dwName: this.readUInt32(buffer),
            dwPosition: this.readUInt32(buffer),
            fccChunk: this.readString(buffer, 4),
            dwChunkStart: this.readUInt32(buffer),
            dwBlockStart: this.readUInt32(buffer),
            dwSampleOffset: this.readUInt32(buffer)
          });
        }
      }
    }
    /**
     * Read the 'smpl' chunk of a wave file.
     * @param {!Uint8Array} buffer The wav file buffer.
     * @private
     */
    readSmplChunk_(buffer) {
      let chunk = this.findChunk("smpl");
      if (chunk) {
        this.head = chunk.chunkData.start;
        this.smpl.chunkId = chunk.chunkId;
        this.smpl.chunkSize = chunk.chunkSize;
        this.smpl.dwManufacturer = this.readUInt32(buffer);
        this.smpl.dwProduct = this.readUInt32(buffer);
        this.smpl.dwSamplePeriod = this.readUInt32(buffer);
        this.smpl.dwMIDIUnityNote = this.readUInt32(buffer);
        this.smpl.dwMIDIPitchFraction = this.readUInt32(buffer);
        this.smpl.dwSMPTEFormat = this.readUInt32(buffer);
        this.smpl.dwSMPTEOffset = this.readUInt32(buffer);
        this.smpl.dwNumSampleLoops = this.readUInt32(buffer);
        this.smpl.dwSamplerData = this.readUInt32(buffer);
        for (let i = 0; i < this.smpl.dwNumSampleLoops; i++) {
          this.smpl.loops.push({
            dwName: this.readUInt32(buffer),
            dwType: this.readUInt32(buffer),
            dwStart: this.readUInt32(buffer),
            dwEnd: this.readUInt32(buffer),
            dwFraction: this.readUInt32(buffer),
            dwPlayCount: this.readUInt32(buffer)
          });
        }
      }
    }
    /**
     * Read the 'data' chunk of a wave file.
     * @param {!Uint8Array} buffer The wav file buffer.
     * @param {boolean} samples True if the samples should be loaded.
     * @throws {Error} If no 'data' chunk is found.
     * @private
     */
    readDataChunk_(buffer, samples) {
      let chunk = this.findChunk("data");
      if (chunk) {
        this.data.chunkId = "data";
        this.data.chunkSize = chunk.chunkSize;
        if (samples) {
          this.data.samples = buffer.slice(
            chunk.chunkData.start,
            chunk.chunkData.end
          );
        }
      } else {
        throw Error('Could not find the "data" chunk');
      }
    }
    /**
     * Read the 'bext' chunk of a wav file.
     * @param {!Uint8Array} buffer The wav file buffer.
     * @private
     */
    readBextChunk_(buffer) {
      let chunk = this.findChunk("bext");
      if (chunk) {
        this.head = chunk.chunkData.start;
        this.bext.chunkId = chunk.chunkId;
        this.bext.chunkSize = chunk.chunkSize;
        this.bext.description = this.readString(buffer, 256);
        this.bext.originator = this.readString(buffer, 32);
        this.bext.originatorReference = this.readString(buffer, 32);
        this.bext.originationDate = this.readString(buffer, 10);
        this.bext.originationTime = this.readString(buffer, 8);
        this.bext.timeReference = [
          this.readUInt32(buffer),
          this.readUInt32(buffer)
        ];
        this.bext.version = this.readUInt16_(buffer);
        this.bext.UMID = this.readString(buffer, 64);
        this.bext.loudnessValue = this.readUInt16_(buffer);
        this.bext.loudnessRange = this.readUInt16_(buffer);
        this.bext.maxTruePeakLevel = this.readUInt16_(buffer);
        this.bext.maxMomentaryLoudness = this.readUInt16_(buffer);
        this.bext.maxShortTermLoudness = this.readUInt16_(buffer);
        this.bext.reserved = this.readString(buffer, 180);
        this.bext.codingHistory = this.readString(
          buffer,
          this.bext.chunkSize - 602
        );
      }
    }
    /**
     * Read the 'iXML' chunk of a wav file.
     * @param {!Uint8Array} buffer The wav file buffer.
     * @private
     */
    readiXMLChunk_(buffer) {
      let chunk = this.findChunk("iXML");
      if (chunk) {
        this.head = chunk.chunkData.start;
        this.iXML.chunkId = chunk.chunkId;
        this.iXML.chunkSize = chunk.chunkSize;
        this.iXML.value = unpackString(
          buffer,
          this.head,
          this.head + this.iXML.chunkSize
        );
      }
    }
    /**
     * Read the 'ds64' chunk of a wave file.
     * @param {!Uint8Array} buffer The wav file buffer.
     * @throws {Error} If no 'ds64' chunk is found and the file is RF64.
     * @private
     */
    readDs64Chunk_(buffer) {
      let chunk = this.findChunk("ds64");
      if (chunk) {
        this.head = chunk.chunkData.start;
        this.ds64.chunkId = chunk.chunkId;
        this.ds64.chunkSize = chunk.chunkSize;
        this.ds64.riffSizeHigh = this.readUInt32(buffer);
        this.ds64.riffSizeLow = this.readUInt32(buffer);
        this.ds64.dataSizeHigh = this.readUInt32(buffer);
        this.ds64.dataSizeLow = this.readUInt32(buffer);
        this.ds64.originationTime = this.readUInt32(buffer);
        this.ds64.sampleCountHigh = this.readUInt32(buffer);
        this.ds64.sampleCountLow = this.readUInt32(buffer);
      } else {
        if (this.container == "RF64") {
          throw Error('Could not find the "ds64" chunk');
        }
      }
    }
    /**
     * Read the 'LIST' chunks of a wave file.
     * @param {!Uint8Array} buffer The wav file buffer.
     * @private
     */
    readLISTChunk_(buffer) {
      let listChunks = this.findChunk("LIST", true);
      if (listChunks !== null) {
        for (let j = 0; j < listChunks.length; j++) {
          let subChunk = listChunks[j];
          this.LIST.push({
            chunkId: subChunk.chunkId,
            chunkSize: subChunk.chunkSize,
            format: subChunk.format,
            subChunks: []
          });
          for (let x = 0; x < subChunk.subChunks.length; x++) {
            this.readLISTSubChunks_(
              subChunk.subChunks[x],
              subChunk.format,
              buffer
            );
          }
        }
      }
    }
    /**
     * Read the sub chunks of a 'LIST' chunk.
     * @param {!Object} subChunk The 'LIST' subchunks.
     * @param {string} format The 'LIST' format, 'adtl' or 'INFO'.
     * @param {!Uint8Array} buffer The wav file buffer.
     * @private
     */
    readLISTSubChunks_(subChunk, format, buffer) {
      if (format == "adtl") {
        if (["labl", "note", "ltxt"].indexOf(subChunk.chunkId) > -1) {
          this.readLISTadtlSubChunks_(buffer, subChunk);
        }
      } else if (format == "INFO") {
        this.readLISTINFOSubChunks_(buffer, subChunk);
      }
    }
    /**
     * Read the sub chunks of a 'LIST' chunk of type 'adtl'.
     * @param {!Uint8Array} buffer The wav file buffer.
     * @param {!Object} subChunk The 'LIST' subchunks.
     * @private
     */
    readLISTadtlSubChunks_(buffer, subChunk) {
      this.head = subChunk.chunkData.start;
      let item = {
        chunkId: subChunk.chunkId,
        chunkSize: subChunk.chunkSize,
        dwName: this.readUInt32(buffer)
      };
      if (subChunk.chunkId == "ltxt") {
        item.dwSampleLength = this.readUInt32(buffer);
        item.dwPurposeID = this.readUInt32(buffer);
        item.dwCountry = this.readUInt16_(buffer);
        item.dwLanguage = this.readUInt16_(buffer);
        item.dwDialect = this.readUInt16_(buffer);
        item.dwCodePage = this.readUInt16_(buffer);
        item.value = "";
      } else {
        item.value = this.readZSTR_(buffer, this.head);
      }
      this.LIST[this.LIST.length - 1].subChunks.push(item);
    }
    /**
     * Read the sub chunks of a 'LIST' chunk of type 'INFO'.
     * @param {!Uint8Array} buffer The wav file buffer.
     * @param {!Object} subChunk The 'LIST' subchunks.
     * @private
     */
    readLISTINFOSubChunks_(buffer, subChunk) {
      this.head = subChunk.chunkData.start;
      this.LIST[this.LIST.length - 1].subChunks.push({
        chunkId: subChunk.chunkId,
        chunkSize: subChunk.chunkSize,
        value: this.readZSTR_(buffer, this.head)
      });
    }
    /**
     * Read the 'junk' chunk of a wave file.
     * @param {!Uint8Array} buffer The wav file buffer.
     * @private
     */
    readJunkChunk_(buffer) {
      let chunk = this.findChunk("junk");
      if (chunk) {
        this.junk = {
          chunkId: chunk.chunkId,
          chunkSize: chunk.chunkSize,
          chunkData: [].slice.call(buffer.slice(
            chunk.chunkData.start,
            chunk.chunkData.end
          ))
        };
      }
    }
    /**
     * Read the '_PMX' chunk of a wav file.
     * @param {!Uint8Array} buffer The wav file buffer.
     * @private
     */
    read_PMXChunk_(buffer) {
      let chunk = this.findChunk("_PMX");
      if (chunk) {
        this.head = chunk.chunkData.start;
        this._PMX.chunkId = chunk.chunkId;
        this._PMX.chunkSize = chunk.chunkSize;
        this._PMX.value = unpackString(
          buffer,
          this.head,
          this.head + this._PMX.chunkSize
        );
      }
    }
    /**
     * Read bytes as a ZSTR string.
     * @param {!Uint8Array} bytes The bytes.
     * @param {number=} [index=0] the index to start reading.
     * @return {string} The string.
     * @private
     */
    readZSTR_(bytes, index = 0) {
      for (let i = index; i < bytes.length; i++) {
        this.head++;
        if (bytes[i] === 0) {
          break;
        }
      }
      return unpackString(bytes, index, this.head - 1);
    }
    /**
     * Read a number from a chunk.
     * @param {!Uint8Array} bytes The chunk bytes.
     * @return {number} The number.
     * @private
     */
    readUInt16_(bytes) {
      let value = unpack2(bytes, this.uInt16, this.head);
      this.head += 2;
      return value;
    }
  };

  // node_modules/wavefile/lib/parsers/write-string.js
  function writeString(str, byteLength) {
    let packedString = packString(str);
    for (let i = packedString.length; i < byteLength; i++) {
      packedString.push(0);
    }
    return packedString;
  }

  // node_modules/wavefile/lib/wavefile-parser.js
  var WaveFileParser = class extends WaveFileReader {
    /**
     * Return a byte buffer representig the WaveFileParser object as a .wav file.
     * The return value of this method can be written straight to disk.
     * @return {!Uint8Array} A wav file.
     */
    toBuffer() {
      this.uInt16.be = this.container === "RIFX";
      this.uInt32.be = this.uInt16.be;
      let fileBody = [
        this.getJunkBytes_(),
        this.getDs64Bytes_(),
        this.getBextBytes_(),
        this.getiXMLBytes_(),
        this.getFmtBytes_(),
        this.getFactBytes_(),
        packString(this.data.chunkId),
        pack2(this.data.samples.length, this.uInt32),
        this.data.samples,
        this.getCueBytes_(),
        this.getSmplBytes_(),
        this.getLISTBytes_(),
        this.get_PMXBytes_()
      ];
      let fileBodyLength = 0;
      for (let i = 0; i < fileBody.length; i++) {
        fileBodyLength += fileBody[i].length;
      }
      let file = new Uint8Array(fileBodyLength + 12);
      let index = 0;
      index = packStringTo(this.container, file, index);
      index = packTo(fileBodyLength + 4, this.uInt32, file, index);
      index = packStringTo(this.format, file, index);
      for (let i = 0; i < fileBody.length; i++) {
        file.set(fileBody[i], index);
        index += fileBody[i].length;
      }
      return file;
    }
    /**
     * Return the bytes of the 'bext' chunk.
     * @private
     */
    getBextBytes_() {
      let bytes = [];
      this.enforceBext_();
      if (this.bext.chunkId) {
        this.bext.chunkSize = 602 + this.bext.codingHistory.length;
        bytes = bytes.concat(
          packString(this.bext.chunkId),
          pack2(602 + this.bext.codingHistory.length, this.uInt32),
          writeString(this.bext.description, 256),
          writeString(this.bext.originator, 32),
          writeString(this.bext.originatorReference, 32),
          writeString(this.bext.originationDate, 10),
          writeString(this.bext.originationTime, 8),
          pack2(this.bext.timeReference[0], this.uInt32),
          pack2(this.bext.timeReference[1], this.uInt32),
          pack2(this.bext.version, this.uInt16),
          writeString(this.bext.UMID, 64),
          pack2(this.bext.loudnessValue, this.uInt16),
          pack2(this.bext.loudnessRange, this.uInt16),
          pack2(this.bext.maxTruePeakLevel, this.uInt16),
          pack2(this.bext.maxMomentaryLoudness, this.uInt16),
          pack2(this.bext.maxShortTermLoudness, this.uInt16),
          writeString(this.bext.reserved, 180),
          writeString(
            this.bext.codingHistory,
            this.bext.codingHistory.length
          )
        );
      }
      this.enforceByteLen_(bytes);
      return bytes;
    }
    /**
     * Make sure a 'bext' chunk is created if BWF data was created in a file.
     * @private
     */
    enforceBext_() {
      for (let prop in this.bext) {
        if (this.bext.hasOwnProperty(prop)) {
          if (this.bext[prop] && prop != "timeReference") {
            this.bext.chunkId = "bext";
            break;
          }
        }
      }
      if (this.bext.timeReference[0] || this.bext.timeReference[1]) {
        this.bext.chunkId = "bext";
      }
    }
    /**
     * Return the bytes of the 'iXML' chunk.
     * @return {!Array<number>} The 'iXML' chunk bytes.
     * @private
     */
    getiXMLBytes_() {
      let bytes = [];
      if (this.iXML.chunkId) {
        let iXMLPackedValue = packString(this.iXML.value);
        this.iXML.chunkSize = iXMLPackedValue.length;
        bytes = bytes.concat(
          packString(this.iXML.chunkId),
          pack2(this.iXML.chunkSize, this.uInt32),
          iXMLPackedValue
        );
      }
      this.enforceByteLen_(bytes);
      return bytes;
    }
    /**
     * Return the bytes of the 'ds64' chunk.
     * @return {!Array<number>} The 'ds64' chunk bytes.
     * @private
     */
    getDs64Bytes_() {
      let bytes = [];
      if (this.ds64.chunkId) {
        bytes = bytes.concat(
          packString(this.ds64.chunkId),
          pack2(this.ds64.chunkSize, this.uInt32),
          pack2(this.ds64.riffSizeHigh, this.uInt32),
          pack2(this.ds64.riffSizeLow, this.uInt32),
          pack2(this.ds64.dataSizeHigh, this.uInt32),
          pack2(this.ds64.dataSizeLow, this.uInt32),
          pack2(this.ds64.originationTime, this.uInt32),
          pack2(this.ds64.sampleCountHigh, this.uInt32),
          pack2(this.ds64.sampleCountLow, this.uInt32)
        );
      }
      this.enforceByteLen_(bytes);
      return bytes;
    }
    /**
     * Return the bytes of the 'cue ' chunk.
     * @return {!Array<number>} The 'cue ' chunk bytes.
     * @private
     */
    getCueBytes_() {
      let bytes = [];
      if (this.cue.chunkId) {
        let cuePointsBytes = this.getCuePointsBytes_();
        bytes = bytes.concat(
          packString(this.cue.chunkId),
          pack2(cuePointsBytes.length + 4, this.uInt32),
          // chunkSize
          pack2(this.cue.dwCuePoints, this.uInt32),
          cuePointsBytes
        );
      }
      this.enforceByteLen_(bytes);
      return bytes;
    }
    /**
     * Return the bytes of the 'cue ' points.
     * @return {!Array<number>} The 'cue ' points as an array of bytes.
     * @private
     */
    getCuePointsBytes_() {
      let points = [];
      for (let i = 0; i < this.cue.dwCuePoints; i++) {
        points = points.concat(
          pack2(this.cue.points[i].dwName, this.uInt32),
          pack2(this.cue.points[i].dwPosition, this.uInt32),
          packString(this.cue.points[i].fccChunk),
          pack2(this.cue.points[i].dwChunkStart, this.uInt32),
          pack2(this.cue.points[i].dwBlockStart, this.uInt32),
          pack2(this.cue.points[i].dwSampleOffset, this.uInt32)
        );
      }
      return points;
    }
    /**
     * Return the bytes of the 'smpl' chunk.
     * @return {!Array<number>} The 'smpl' chunk bytes.
     * @private
     */
    getSmplBytes_() {
      let bytes = [];
      if (this.smpl.chunkId) {
        let smplLoopsBytes = this.getSmplLoopsBytes_();
        bytes = bytes.concat(
          packString(this.smpl.chunkId),
          pack2(smplLoopsBytes.length + 36, this.uInt32),
          //chunkSize
          pack2(this.smpl.dwManufacturer, this.uInt32),
          pack2(this.smpl.dwProduct, this.uInt32),
          pack2(this.smpl.dwSamplePeriod, this.uInt32),
          pack2(this.smpl.dwMIDIUnityNote, this.uInt32),
          pack2(this.smpl.dwMIDIPitchFraction, this.uInt32),
          pack2(this.smpl.dwSMPTEFormat, this.uInt32),
          pack2(this.smpl.dwSMPTEOffset, this.uInt32),
          pack2(this.smpl.dwNumSampleLoops, this.uInt32),
          pack2(this.smpl.dwSamplerData, this.uInt32),
          smplLoopsBytes
        );
      }
      this.enforceByteLen_(bytes);
      return bytes;
    }
    /**
     * Return the bytes of the 'smpl' loops.
     * @return {!Array<number>} The 'smpl' loops as an array of bytes.
     * @private
     */
    getSmplLoopsBytes_() {
      let loops = [];
      for (let i = 0; i < this.smpl.dwNumSampleLoops; i++) {
        loops = loops.concat(
          pack2(this.smpl.loops[i].dwName, this.uInt32),
          pack2(this.smpl.loops[i].dwType, this.uInt32),
          pack2(this.smpl.loops[i].dwStart, this.uInt32),
          pack2(this.smpl.loops[i].dwEnd, this.uInt32),
          pack2(this.smpl.loops[i].dwFraction, this.uInt32),
          pack2(this.smpl.loops[i].dwPlayCount, this.uInt32)
        );
      }
      return loops;
    }
    /**
     * Return the bytes of the 'fact' chunk.
     * @return {!Array<number>} The 'fact' chunk bytes.
     * @private
     */
    getFactBytes_() {
      let bytes = [];
      if (this.fact.chunkId) {
        bytes = bytes.concat(
          packString(this.fact.chunkId),
          pack2(this.fact.chunkSize, this.uInt32),
          pack2(this.fact.dwSampleLength, this.uInt32)
        );
      }
      this.enforceByteLen_(bytes);
      return bytes;
    }
    /**
     * Return the bytes of the 'fmt ' chunk.
     * @return {!Array<number>} The 'fmt' chunk bytes.
     * @throws {Error} if no 'fmt ' chunk is present.
     * @private
     */
    getFmtBytes_() {
      let fmtBytes = [];
      if (this.fmt.chunkId) {
        let bytes = fmtBytes.concat(
          packString(this.fmt.chunkId),
          pack2(this.fmt.chunkSize, this.uInt32),
          pack2(this.fmt.audioFormat, this.uInt16),
          pack2(this.fmt.numChannels, this.uInt16),
          pack2(this.fmt.sampleRate, this.uInt32),
          pack2(this.fmt.byteRate, this.uInt32),
          pack2(this.fmt.blockAlign, this.uInt16),
          pack2(this.fmt.bitsPerSample, this.uInt16),
          this.getFmtExtensionBytes_()
        );
        this.enforceByteLen_(bytes);
        return bytes;
      }
      throw Error('Could not find the "fmt " chunk');
    }
    /**
     * Return the bytes of the fmt extension fields.
     * @return {!Array<number>} The fmt extension bytes.
     * @private
     */
    getFmtExtensionBytes_() {
      let extension = [];
      if (this.fmt.chunkSize > 16) {
        extension = extension.concat(
          pack2(this.fmt.cbSize, this.uInt16)
        );
      }
      if (this.fmt.chunkSize > 18) {
        extension = extension.concat(
          pack2(this.fmt.validBitsPerSample, this.uInt16)
        );
      }
      if (this.fmt.chunkSize > 20) {
        extension = extension.concat(
          pack2(this.fmt.dwChannelMask, this.uInt32)
        );
      }
      if (this.fmt.chunkSize > 24) {
        extension = extension.concat(
          pack2(this.fmt.subformat[0], this.uInt32),
          pack2(this.fmt.subformat[1], this.uInt32),
          pack2(this.fmt.subformat[2], this.uInt32),
          pack2(this.fmt.subformat[3], this.uInt32)
        );
      }
      return extension;
    }
    /**
     * Return the bytes of the 'LIST' chunk.
     * @return {!Array<number>} The 'LIST' chunk bytes.
     * @private
     */
    getLISTBytes_() {
      let bytes = [];
      for (let i = 0; i < this.LIST.length; i++) {
        let subChunksBytes = this.getLISTSubChunksBytes_(
          this.LIST[i].subChunks,
          this.LIST[i].format
        );
        bytes = bytes.concat(
          packString(this.LIST[i].chunkId),
          pack2(subChunksBytes.length + 4, this.uInt32),
          //chunkSize
          packString(this.LIST[i].format),
          subChunksBytes
        );
      }
      this.enforceByteLen_(bytes);
      return bytes;
    }
    /**
     * Return the bytes of the sub chunks of a 'LIST' chunk.
     * @param {!Array<!Object>} subChunks The 'LIST' sub chunks.
     * @param {string} format The format of the 'LIST' chunk.
     *    Currently supported values are 'adtl' or 'INFO'.
     * @return {!Array<number>} The sub chunk bytes.
     * @private
     */
    getLISTSubChunksBytes_(subChunks, format) {
      let bytes = [];
      for (let i = 0, len = subChunks.length; i < len; i++) {
        if (format == "INFO") {
          bytes = bytes.concat(this.getLISTINFOSubChunksBytes_(subChunks[i]));
        } else if (format == "adtl") {
          bytes = bytes.concat(this.getLISTadtlSubChunksBytes_(subChunks[i]));
        }
        this.enforceByteLen_(bytes);
      }
      return bytes;
    }
    /**
     * Return the bytes of the sub chunks of a 'LIST' chunk of type 'INFO'.
     * @param {!Object} subChunk The 'LIST' sub chunk.
     * @return {!Array<number>}
     * @private
     */
    getLISTINFOSubChunksBytes_(subChunk) {
      let bytes = [];
      let LISTsubChunkValue = writeString(
        subChunk.value,
        subChunk.value.length
      );
      bytes = bytes.concat(
        packString(subChunk.chunkId),
        pack2(LISTsubChunkValue.length + 1, this.uInt32),
        //chunkSize
        LISTsubChunkValue
      );
      bytes.push(0);
      return bytes;
    }
    /**
     * Return the bytes of the sub chunks of a 'LIST' chunk of type 'INFO'.
     * @param {!Object} subChunk The 'LIST' sub chunk.
     * @return {!Array<number>}
     * @private
     */
    getLISTadtlSubChunksBytes_(subChunk) {
      let bytes = [];
      if (["labl", "note"].indexOf(subChunk.chunkId) > -1) {
        let LISTsubChunkValue = writeString(
          subChunk.value,
          subChunk.value.length
        );
        bytes = bytes.concat(
          packString(subChunk.chunkId),
          pack2(LISTsubChunkValue.length + 4 + 1, this.uInt32),
          //chunkSize
          pack2(subChunk.dwName, this.uInt32),
          LISTsubChunkValue
        );
        bytes.push(0);
      } else if (subChunk.chunkId == "ltxt") {
        bytes = bytes.concat(
          this.getLtxtChunkBytes_(subChunk)
        );
      }
      return bytes;
    }
    /**
     * Return the bytes of a 'ltxt' chunk.
     * @param {!Object} ltxt the 'ltxt' chunk.
     * @return {!Array<number>}
     * @private
     */
    getLtxtChunkBytes_(ltxt) {
      return [].concat(
        packString(ltxt.chunkId),
        pack2(ltxt.value.length + 20, this.uInt32),
        pack2(ltxt.dwName, this.uInt32),
        pack2(ltxt.dwSampleLength, this.uInt32),
        pack2(ltxt.dwPurposeID, this.uInt32),
        pack2(ltxt.dwCountry, this.uInt16),
        pack2(ltxt.dwLanguage, this.uInt16),
        pack2(ltxt.dwDialect, this.uInt16),
        pack2(ltxt.dwCodePage, this.uInt16),
        // should always be a empty string;
        // kept for compatibility
        writeString(ltxt.value, ltxt.value.length)
      );
    }
    /**
     * Return the bytes of the '_PMX' chunk.
     * @return {!Array<number>} The '_PMX' chunk bytes.
     * @private
     */
    get_PMXBytes_() {
      let bytes = [];
      if (this._PMX.chunkId) {
        let _PMXPackedValue = packString(this._PMX.value);
        this._PMX.chunkSize = _PMXPackedValue.length;
        bytes = bytes.concat(
          packString(this._PMX.chunkId),
          pack2(this._PMX.chunkSize, this.uInt32),
          _PMXPackedValue
        );
      }
      this.enforceByteLen_(bytes);
      return bytes;
    }
    /**
     * Return the bytes of the 'junk' chunk.
     * @private
     */
    getJunkBytes_() {
      let bytes = [];
      if (this.junk.chunkId) {
        return bytes.concat(
          packString(this.junk.chunkId),
          pack2(this.junk.chunkData.length, this.uInt32),
          //chunkSize
          this.junk.chunkData
        );
      }
      this.enforceByteLen_(bytes);
      return bytes;
    }
    /**
     * Push a null byte into a byte array if
     * the byte count is odd.
     * @param {!Array<number>} bytes The byte array.
     * @private
     */
    enforceByteLen_(bytes) {
      if (bytes.length % 2) {
        bytes.push(0);
      }
    }
  };

  // node_modules/wavefile/lib/parsers/interleave.js
  function interleave(samples) {
    let finalSamples = [];
    if (samples.length > 0) {
      if (samples[0].constructor !== Number) {
        finalSamples = new Float64Array(samples[0].length * samples.length);
        for (let i = 0, len = samples[0].length, x = 0; i < len; i++) {
          for (let j = 0, subLen = samples.length; j < subLen; j++, x++) {
            finalSamples[x] = samples[j][i];
          }
        }
      } else {
        finalSamples = samples;
      }
    }
    return finalSamples;
  }
  function deInterleave(samples, numChannels, OutputObject = Float64Array) {
    let finalSamples = [];
    for (let i = 0; i < numChannels; i++) {
      finalSamples[i] = new OutputObject(samples.length / numChannels);
    }
    for (let i = 0; i < numChannels; i++) {
      for (let j = i, s = 0; j < samples.length; j += numChannels, s++) {
        finalSamples[i][s] = samples[j];
      }
    }
    return finalSamples;
  }

  // node_modules/wavefile/lib/validators/validate-num-channels.js
  function validateNumChannels(channels, bits) {
    let blockAlign = channels * bits / 8;
    if (channels < 1 || blockAlign > 65535) {
      return false;
    }
    return true;
  }

  // node_modules/wavefile/lib/validators/validate-sample-rate.js
  function validateSampleRate(channels, bits, sampleRate) {
    let byteRate = channels * (bits / 8) * sampleRate;
    if (sampleRate < 1 || byteRate > 4294967295) {
      return false;
    }
    return true;
  }

  // node_modules/wavefile/lib/wavefile-creator.js
  var WaveFileCreator = class extends WaveFileParser {
    constructor() {
      super();
      this.bitDepth = "0";
      this.dataType = { bits: 0, be: false };
      this.WAV_AUDIO_FORMATS = {
        "4": 17,
        "8": 1,
        "8a": 6,
        "8m": 7,
        "16": 1,
        "24": 1,
        "32": 1,
        "32f": 3,
        "64": 3
      };
    }
    /**
     * Set up the WaveFileCreator object based on the arguments passed.
     * Existing chunks are reset.
     * @param {number} numChannels The number of channels.
     * @param {number} sampleRate The sample rate.
     *    Integers like 8000, 44100, 48000, 96000, 192000.
     * @param {string} bitDepthCode The audio bit depth code.
     *    One of '4', '8', '8a', '8m', '16', '24', '32', '32f', '64'
     *    or any value between '8' and '32' (like '12').
     * @param {!(Array|TypedArray)} samples The samples.
     * @param {Object=} options Optional. Used to force the container
     *    as RIFX with {'container': 'RIFX'}
     * @throws {Error} If any argument does not meet the criteria.
     */
    fromScratch(numChannels, sampleRate, bitDepthCode, samples, options2) {
      options2 = options2 || {};
      this.clearHeaders();
      this.newWavFile_(numChannels, sampleRate, bitDepthCode, samples, options2);
    }
    /**
     * Set up the WaveFileParser object from a byte buffer.
     * @param {!Uint8Array} wavBuffer The buffer.
     * @param {boolean=} [samples=true] True if the samples should be loaded.
     * @throws {Error} If container is not RIFF, RIFX or RF64.
     * @throws {Error} If format is not WAVE.
     * @throws {Error} If no 'fmt ' chunk is found.
     * @throws {Error} If no 'data' chunk is found.
     */
    fromBuffer(wavBuffer, samples = true) {
      super.fromBuffer(wavBuffer, samples);
      this.bitDepthFromFmt_();
      this.updateDataType_();
    }
    /**
     * Return a byte buffer representig the WaveFileParser object as a .wav file.
     * The return value of this method can be written straight to disk.
     * @return {!Uint8Array} A wav file.
     * @throws {Error} If bit depth is invalid.
     * @throws {Error} If the number of channels is invalid.
     * @throws {Error} If the sample rate is invalid.
     */
    toBuffer() {
      this.validateWavHeader_();
      return super.toBuffer();
    }
    /**
     * Return the samples packed in a Float64Array.
     * @param {boolean=} [interleaved=false] True to return interleaved samples,
     *   false to return the samples de-interleaved.
     * @param {Function=} [OutputObject=Float64Array] The sample container.
     * @return {!(Array|TypedArray)} the samples.
     */
    getSamples(interleaved = false, OutputObject = Float64Array) {
      let samples = new OutputObject(
        this.data.samples.length / (this.dataType.bits / 8)
      );
      unpackArrayTo(
        this.data.samples,
        this.dataType,
        samples,
        0,
        this.data.samples.length
      );
      if (!interleaved && this.fmt.numChannels > 1) {
        return deInterleave(samples, this.fmt.numChannels, OutputObject);
      }
      return samples;
    }
    /**
     * Return the sample at a given index.
     * @param {number} index The sample index.
     * @return {number} The sample.
     * @throws {Error} If the sample index is off range.
     */
    getSample(index) {
      index = index * (this.dataType.bits / 8);
      if (index + this.dataType.bits / 8 > this.data.samples.length) {
        throw new Error("Range error");
      }
      return unpack2(
        this.data.samples.slice(index, index + this.dataType.bits / 8),
        this.dataType
      );
    }
    /**
     * Set the sample at a given index.
     * @param {number} index The sample index.
     * @param {number} sample The sample.
     * @throws {Error} If the sample index is off range.
     */
    setSample(index, sample) {
      index = index * (this.dataType.bits / 8);
      if (index + this.dataType.bits / 8 > this.data.samples.length) {
        throw new Error("Range error");
      }
      packTo(sample, this.dataType, this.data.samples, index, true);
    }
    /**
     * Return the value of the iXML chunk.
     * @return {string} The contents of the iXML chunk.
     */
    getiXML() {
      return this.iXML.value;
    }
    /**
     * Set the value of the iXML chunk.
     * @param {string} iXMLValue The value for the iXML chunk.
     * @throws {TypeError} If the value is not a string.
     */
    setiXML(iXMLValue) {
      if (typeof iXMLValue !== "string") {
        throw new TypeError("iXML value must be a string.");
      }
      this.iXML.value = iXMLValue;
      this.iXML.chunkId = "iXML";
    }
    /**
     * Get the value of the _PMX chunk.
     * @return {string} The contents of the _PMX chunk.
     */
    get_PMX() {
      return this._PMX.value;
    }
    /**
     * Set the value of the _PMX chunk.
     * @param {string} _PMXValue The value for the _PMX chunk.
     * @throws {TypeError} If the value is not a string.
     */
    set_PMX(_PMXValue) {
      if (typeof _PMXValue !== "string") {
        throw new TypeError("_PMX value must be a string.");
      }
      this._PMX.value = _PMXValue;
      this._PMX.chunkId = "_PMX";
    }
    /**
     * Set up the WaveFileCreator object based on the arguments passed.
     * @param {number} numChannels The number of channels.
     * @param {number} sampleRate The sample rate.
     *   Integers like 8000, 44100, 48000, 96000, 192000.
     * @param {string} bitDepthCode The audio bit depth code.
     *   One of '4', '8', '8a', '8m', '16', '24', '32', '32f', '64'
     *   or any value between '8' and '32' (like '12').
     * @param {!(Array|TypedArray)} samples The samples.
     * @param {Object} options Used to define the container.
     * @throws {Error} If any argument does not meet the criteria.
     * @private
     */
    newWavFile_(numChannels, sampleRate, bitDepthCode, samples, options2) {
      if (!options2.container) {
        options2.container = "RIFF";
      }
      this.container = options2.container;
      this.bitDepth = bitDepthCode;
      samples = interleave(samples);
      this.updateDataType_();
      let numBytes = this.dataType.bits / 8;
      this.data.samples = new Uint8Array(samples.length * numBytes);
      packArrayTo(samples, this.dataType, this.data.samples, 0, true);
      this.makeWavHeader_(
        bitDepthCode,
        numChannels,
        sampleRate,
        numBytes,
        this.data.samples.length,
        options2
      );
      this.data.chunkId = "data";
      this.data.chunkSize = this.data.samples.length;
      this.validateWavHeader_();
    }
    /**
     * Define the header of a wav file.
     * @param {string} bitDepthCode The audio bit depth
     * @param {number} numChannels The number of channels
     * @param {number} sampleRate The sample rate.
     * @param {number} numBytes The number of bytes each sample use.
     * @param {number} samplesLength The length of the samples in bytes.
     * @param {!Object} options The extra options, like container defintion.
     * @private
     */
    makeWavHeader_(bitDepthCode, numChannels, sampleRate, numBytes, samplesLength, options2) {
      if (bitDepthCode == "4") {
        this.createADPCMHeader_(
          bitDepthCode,
          numChannels,
          sampleRate,
          numBytes,
          samplesLength,
          options2
        );
      } else if (bitDepthCode == "8a" || bitDepthCode == "8m") {
        this.createALawMulawHeader_(
          bitDepthCode,
          numChannels,
          sampleRate,
          numBytes,
          samplesLength,
          options2
        );
      } else if (Object.keys(this.WAV_AUDIO_FORMATS).indexOf(bitDepthCode) == -1 || numChannels > 2) {
        this.createExtensibleHeader_(
          bitDepthCode,
          numChannels,
          sampleRate,
          numBytes,
          samplesLength,
          options2
        );
      } else {
        this.createPCMHeader_(
          bitDepthCode,
          numChannels,
          sampleRate,
          numBytes,
          samplesLength,
          options2
        );
      }
    }
    /**
     * Create the header of a linear PCM wave file.
     * @param {string} bitDepthCode The audio bit depth
     * @param {number} numChannels The number of channels
     * @param {number} sampleRate The sample rate.
     * @param {number} numBytes The number of bytes each sample use.
     * @param {number} samplesLength The length of the samples in bytes.
     * @param {!Object} options The extra options, like container defintion.
     * @private
     */
    createPCMHeader_(bitDepthCode, numChannels, sampleRate, numBytes, samplesLength, options2) {
      this.container = options2.container;
      this.chunkSize = 36 + samplesLength;
      this.format = "WAVE";
      this.bitDepth = bitDepthCode;
      this.fmt = {
        chunkId: "fmt ",
        chunkSize: 16,
        audioFormat: this.WAV_AUDIO_FORMATS[bitDepthCode] || 65534,
        numChannels,
        sampleRate,
        byteRate: numChannels * numBytes * sampleRate,
        blockAlign: numChannels * numBytes,
        bitsPerSample: parseInt(bitDepthCode, 10),
        cbSize: 0,
        validBitsPerSample: 0,
        dwChannelMask: 0,
        subformat: []
      };
    }
    /**
     * Create the header of a ADPCM wave file.
     * @param {string} bitDepthCode The audio bit depth
     * @param {number} numChannels The number of channels
     * @param {number} sampleRate The sample rate.
     * @param {number} numBytes The number of bytes each sample use.
     * @param {number} samplesLength The length of the samples in bytes.
     * @param {!Object} options The extra options, like container defintion.
     * @private
     */
    createADPCMHeader_(bitDepthCode, numChannels, sampleRate, numBytes, samplesLength, options2) {
      this.createPCMHeader_(
        bitDepthCode,
        numChannels,
        sampleRate,
        numBytes,
        samplesLength,
        options2
      );
      this.chunkSize = 40 + samplesLength;
      this.fmt.chunkSize = 20;
      this.fmt.byteRate = 4055;
      this.fmt.blockAlign = 256;
      this.fmt.bitsPerSample = 4;
      this.fmt.cbSize = 2;
      this.fmt.validBitsPerSample = 505;
      this.fact = {
        chunkId: "fact",
        chunkSize: 4,
        dwSampleLength: samplesLength * 2
      };
    }
    /**
     * Create the header of WAVE_FORMAT_EXTENSIBLE file.
     * @param {string} bitDepthCode The audio bit depth
     * @param {number} numChannels The number of channels
     * @param {number} sampleRate The sample rate.
     * @param {number} numBytes The number of bytes each sample use.
     * @param {number} samplesLength The length of the samples in bytes.
     * @param {!Object} options The extra options, like container defintion.
     * @private
     */
    createExtensibleHeader_(bitDepthCode, numChannels, sampleRate, numBytes, samplesLength, options2) {
      this.createPCMHeader_(
        bitDepthCode,
        numChannels,
        sampleRate,
        numBytes,
        samplesLength,
        options2
      );
      this.chunkSize = 36 + 24 + samplesLength;
      this.fmt.chunkSize = 40;
      this.fmt.bitsPerSample = (parseInt(bitDepthCode, 10) - 1 | 7) + 1;
      this.fmt.cbSize = 22;
      this.fmt.validBitsPerSample = parseInt(bitDepthCode, 10);
      this.fmt.dwChannelMask = dwChannelMask_(numChannels);
      this.fmt.subformat = [1, 1048576, 2852126848, 1905997824];
    }
    /**
     * Create the header of mu-Law and A-Law wave files.
     * @param {string} bitDepthCode The audio bit depth
     * @param {number} numChannels The number of channels
     * @param {number} sampleRate The sample rate.
     * @param {number} numBytes The number of bytes each sample use.
     * @param {number} samplesLength The length of the samples in bytes.
     * @param {!Object} options The extra options, like container defintion.
     * @private
     */
    createALawMulawHeader_(bitDepthCode, numChannels, sampleRate, numBytes, samplesLength, options2) {
      this.createPCMHeader_(
        bitDepthCode,
        numChannels,
        sampleRate,
        numBytes,
        samplesLength,
        options2
      );
      this.chunkSize = 40 + samplesLength;
      this.fmt.chunkSize = 20;
      this.fmt.cbSize = 2;
      this.fmt.validBitsPerSample = 8;
      this.fact = {
        chunkId: "fact",
        chunkSize: 4,
        dwSampleLength: samplesLength
      };
    }
    /**
     * Set the string code of the bit depth based on the 'fmt ' chunk.
     * @private
     */
    bitDepthFromFmt_() {
      if (this.fmt.audioFormat === 3 && this.fmt.bitsPerSample === 32) {
        this.bitDepth = "32f";
      } else if (this.fmt.audioFormat === 6) {
        this.bitDepth = "8a";
      } else if (this.fmt.audioFormat === 7) {
        this.bitDepth = "8m";
      } else {
        this.bitDepth = this.fmt.bitsPerSample.toString();
      }
    }
    /**
     * Validate the bit depth.
     * @return {boolean} True is the bit depth is valid.
     * @throws {Error} If bit depth is invalid.
     * @private
     */
    validateBitDepth_() {
      if (!this.WAV_AUDIO_FORMATS[this.bitDepth]) {
        if (parseInt(this.bitDepth, 10) > 8 && parseInt(this.bitDepth, 10) < 54) {
          return true;
        }
        throw new Error("Invalid bit depth.");
      }
      return true;
    }
    /**
     * Update the type definition used to read and write the samples.
     * @private
     */
    updateDataType_() {
      this.dataType = {
        bits: (parseInt(this.bitDepth, 10) - 1 | 7) + 1,
        fp: this.bitDepth == "32f" || this.bitDepth == "64",
        signed: this.bitDepth != "8",
        be: this.container == "RIFX"
      };
      if (["4", "8a", "8m"].indexOf(this.bitDepth) > -1) {
        this.dataType.bits = 8;
        this.dataType.signed = false;
      }
    }
    /**
     * Validate the header of the file.
     * @throws {Error} If bit depth is invalid.
     * @throws {Error} If the number of channels is invalid.
     * @throws {Error} If the sample rate is invalid.
     * @ignore
     * @private
     */
    validateWavHeader_() {
      this.validateBitDepth_();
      if (!validateNumChannels(this.fmt.numChannels, this.fmt.bitsPerSample)) {
        throw new Error("Invalid number of channels.");
      }
      if (!validateSampleRate(
        this.fmt.numChannels,
        this.fmt.bitsPerSample,
        this.fmt.sampleRate
      )) {
        throw new Error("Invalid sample rate.");
      }
    }
  };
  function dwChannelMask_(numChannels) {
    let mask = 0;
    if (numChannels === 1) {
      mask = 4;
    } else if (numChannels === 2) {
      mask = 3;
    } else if (numChannels === 4) {
      mask = 51;
    } else if (numChannels === 6) {
      mask = 63;
    } else if (numChannels === 8) {
      mask = 1599;
    }
    return mask;
  }

  // node_modules/wavefile/lib/wavefile-tag-editor.js
  var WaveFileTagEditor = class extends WaveFileCreator {
    /**
     * Return the value of a RIFF tag in the INFO chunk.
     * @param {string} tag The tag name.
     * @return {?string} The value if the tag is found, null otherwise.
     */
    getTag(tag) {
      let index = this.getTagIndex_(tag);
      if (index.TAG !== null) {
        return this.LIST[index.LIST].subChunks[index.TAG].value;
      }
      return null;
    }
    /**
     * Write a RIFF tag in the INFO chunk. If the tag do not exist,
     * then it is created. It if exists, it is overwritten.
     * @param {string} tag The tag name.
     * @param {string} value The tag value.
     * @throws {Error} If the tag name is not valid.
     */
    setTag(tag, value) {
      tag = fixRIFFTag_(tag);
      let index = this.getTagIndex_(tag);
      if (index.TAG !== null) {
        this.LIST[index.LIST].subChunks[index.TAG].chunkSize = value.length + 1;
        this.LIST[index.LIST].subChunks[index.TAG].value = value;
      } else if (index.LIST !== null) {
        this.LIST[index.LIST].subChunks.push({
          chunkId: tag,
          chunkSize: value.length + 1,
          value
        });
      } else {
        this.LIST.push({
          chunkId: "LIST",
          chunkSize: 8 + value.length + 1,
          format: "INFO",
          subChunks: []
        });
        this.LIST[this.LIST.length - 1].subChunks.push({
          chunkId: tag,
          chunkSize: value.length + 1,
          value
        });
      }
    }
    /**
     * Remove a RIFF tag from the INFO chunk.
     * @param {string} tag The tag name.
     * @return {boolean} True if a tag was deleted.
     */
    deleteTag(tag) {
      let index = this.getTagIndex_(tag);
      if (index.TAG !== null) {
        this.LIST[index.LIST].subChunks.splice(index.TAG, 1);
        return true;
      }
      return false;
    }
    /**
     * Return a Object<tag, value> with the RIFF tags in the file.
     * @return {!Object<string, string>} The file tags.
     */
    listTags() {
      let index = this.getLISTIndex("INFO");
      let tags = {};
      if (index !== null) {
        for (let i = 0, len = this.LIST[index].subChunks.length; i < len; i++) {
          tags[this.LIST[index].subChunks[i].chunkId] = this.LIST[index].subChunks[i].value;
        }
      }
      return tags;
    }
    /**
     * Return the index of a list by its type.
     * @param {string} listType The list type ('adtl', 'INFO')
     * @return {?number}
     * @protected
     */
    getLISTIndex(listType) {
      for (let i = 0, len = this.LIST.length; i < len; i++) {
        if (this.LIST[i].format == listType) {
          return i;
        }
      }
      return null;
    }
    /**
     * Return the index of a tag in a FILE chunk.
     * @param {string} tag The tag name.
     * @return {!Object<string, ?number>}
     *    Object.LIST is the INFO index in LIST
     *    Object.TAG is the tag index in the INFO
     * @private
     */
    getTagIndex_(tag) {
      let index = { LIST: null, TAG: null };
      for (let i = 0, len = this.LIST.length; i < len; i++) {
        if (this.LIST[i].format == "INFO") {
          index.LIST = i;
          for (let j = 0, subLen = this.LIST[i].subChunks.length; j < subLen; j++) {
            if (this.LIST[i].subChunks[j].chunkId == tag) {
              index.TAG = j;
              break;
            }
          }
          break;
        }
      }
      return index;
    }
  };
  function fixRIFFTag_(tag) {
    if (tag.constructor !== String) {
      throw new Error("Invalid tag name.");
    } else if (tag.length < 4) {
      for (let i = 0, len = 4 - tag.length; i < len; i++) {
        tag += " ";
      }
    }
    return tag;
  }

  // node_modules/wavefile/lib/wavefile-cue-editor.js
  var WaveFileCueEditor = class extends WaveFileTagEditor {
    /**
     * Return an array with all cue points in the file, in the order they appear
     * in the file.
     * Objects representing cue points/regions look like this:
     *   {
     *     position: 500, // the position in milliseconds
     *     label: 'cue marker 1',
     *     end: 1500, // the end position in milliseconds
     *     dwName: 1,
     *     dwPosition: 0,
     *     fccChunk: 'data',
     *     dwChunkStart: 0,
     *     dwBlockStart: 0,
     *     dwSampleOffset: 22050, // the position as a sample offset
     *     dwSampleLength: 3646827, // length as a sample count, 0 if not a region
     *     dwPurposeID: 544106354,
     *     dwCountry: 0,
     *     dwLanguage: 0,
     *     dwDialect: 0,
     *     dwCodePage: 0,
     *   }
     * @return {!Array<Object>}
     */
    listCuePoints() {
      let points = this.getCuePoints_();
      for (let i = 0, len = points.length; i < len; i++) {
        points[i].position = points[i].dwSampleOffset / this.fmt.sampleRate * 1e3;
        if (points[i].dwSampleLength) {
          points[i].end = points[i].dwSampleLength / this.fmt.sampleRate * 1e3;
          points[i].end += points[i].position;
        } else {
          points[i].end = null;
        }
        delete points[i].value;
      }
      return points;
    }
    /**
     * Create a cue point in the wave file.
     * @param {!{
     *   position: number,
     *   label: ?string,
     *   end: ?number,
     *   dwPurposeID: ?number,
     *   dwCountry: ?number,
     *   dwLanguage: ?number,
     *   dwDialect: ?number,
     *   dwCodePage: ?number
     * }} pointData A object with the data of the cue point.
     *
     * # Only required attribute to create a cue point:
     * pointData.position: The position of the point in milliseconds
     *
     * # Optional attribute for cue points:
     * pointData.label: A string label for the cue point
     *
     * # Extra data used for regions
     * pointData.end: A number representing the end of the region,
     *   in milliseconds, counting from the start of the file. If
     *   no end attr is specified then no region is created.
     *
     * # You may also specify the following attrs for regions, all optional:
     * pointData.dwPurposeID
     * pointData.dwCountry
     * pointData.dwLanguage
     * pointData.dwDialect
     * pointData.dwCodePage
     */
    setCuePoint(pointData) {
      this.cue.chunkId = "cue ";
      if (!pointData.label) {
        pointData.label = "";
      }
      let existingPoints = this.getCuePoints_();
      this.clearLISTadtl_();
      this.cue.points = [];
      pointData.dwSampleOffset = pointData.position * this.fmt.sampleRate / 1e3;
      pointData.dwSampleLength = 0;
      if (pointData.end) {
        pointData.dwSampleLength = pointData.end * this.fmt.sampleRate / 1e3 - pointData.dwSampleOffset;
      }
      if (existingPoints.length === 0) {
        this.setCuePoint_(pointData, 1);
      } else {
        this.setCuePointInOrder_(existingPoints, pointData);
      }
      this.cue.dwCuePoints = this.cue.points.length;
    }
    /**
     * Remove a cue point from a wave file.
     * @param {number} index the index of the point. First is 1,
     *    second is 2, and so on.
     */
    deleteCuePoint(index) {
      this.cue.chunkId = "cue ";
      let existingPoints = this.getCuePoints_();
      this.clearLISTadtl_();
      let len = this.cue.points.length;
      this.cue.points = [];
      for (let i = 0; i < len; i++) {
        if (i + 1 !== index) {
          this.setCuePoint_(existingPoints[i], i + 1);
        }
      }
      this.cue.dwCuePoints = this.cue.points.length;
      if (this.cue.dwCuePoints) {
        this.cue.chunkId = "cue ";
      } else {
        this.cue.chunkId = "";
        this.clearLISTadtl_();
      }
    }
    /**
     * Update the label of a cue point.
     * @param {number} pointIndex The ID of the cue point.
     * @param {string} label The new text for the label.
     */
    updateLabel(pointIndex, label) {
      let cIndex = this.getLISTIndex("adtl");
      if (cIndex !== null) {
        for (let i = 0, len = this.LIST[cIndex].subChunks.length; i < len; i++) {
          if (this.LIST[cIndex].subChunks[i].dwName == pointIndex) {
            this.LIST[cIndex].subChunks[i].value = label;
          }
        }
      }
    }
    /**
     * Return an array with all cue points in the file, in the order they appear
     * in the file.
     * @return {!Array<!Object>}
     * @private
     */
    getCuePoints_() {
      let points = [];
      for (let i = 0; i < this.cue.points.length; i++) {
        let chunk = this.cue.points[i];
        let pointData = this.getDataForCuePoint_(chunk.dwName);
        pointData.label = pointData.value ? pointData.value : "";
        pointData.dwPosition = chunk.dwPosition;
        pointData.fccChunk = chunk.fccChunk;
        pointData.dwChunkStart = chunk.dwChunkStart;
        pointData.dwBlockStart = chunk.dwBlockStart;
        pointData.dwSampleOffset = chunk.dwSampleOffset;
        points.push(pointData);
      }
      return points;
    }
    /**
     * Return the associated data of a cue point.
     * @param {number} pointDwName The ID of the cue point.
     * @return {!Object}
     * @private
     */
    getDataForCuePoint_(pointDwName) {
      let LISTindex = this.getLISTIndex("adtl");
      let pointData = {};
      if (LISTindex !== null) {
        this.getCueDataFromLIST_(pointData, LISTindex, pointDwName);
      }
      return pointData;
    }
    /**
     * Get all data associated to a cue point in a LIST chunk.
     * @param {!Object} pointData A object to hold the point data.
     * @param {number} index The index of the adtl LIST chunk.
     * @param {number} pointDwName The ID of the cue point.
     * @private
     */
    getCueDataFromLIST_(pointData, index, pointDwName) {
      for (let i = 0, len = this.LIST[index].subChunks.length; i < len; i++) {
        if (this.LIST[index].subChunks[i].dwName == pointDwName) {
          let chunk = this.LIST[index].subChunks[i];
          pointData.value = chunk.value || pointData.value;
          pointData.dwName = chunk.dwName || 0;
          pointData.dwSampleLength = chunk.dwSampleLength || 0;
          pointData.dwPurposeID = chunk.dwPurposeID || 0;
          pointData.dwCountry = chunk.dwCountry || 0;
          pointData.dwLanguage = chunk.dwLanguage || 0;
          pointData.dwDialect = chunk.dwDialect || 0;
          pointData.dwCodePage = chunk.dwCodePage || 0;
        }
      }
    }
    /**
     * Push a new cue point in this.cue.points.
     * @param {!Object} pointData A object with data of the cue point.
     * @param {number} dwName the dwName of the cue point
     * @private
     */
    setCuePoint_(pointData, dwName) {
      this.cue.points.push({
        dwName,
        dwPosition: pointData.dwPosition ? pointData.dwPosition : 0,
        fccChunk: pointData.fccChunk ? pointData.fccChunk : "data",
        dwChunkStart: pointData.dwChunkStart ? pointData.dwChunkStart : 0,
        dwBlockStart: pointData.dwBlockStart ? pointData.dwBlockStart : 0,
        dwSampleOffset: pointData.dwSampleOffset
      });
      this.setLabl_(pointData, dwName);
    }
    /**
     * Push a new cue point in this.cue.points according to existing cue points.
     * @param {!Array} existingPoints Array with the existing points.
     * @param {!Object} pointData A object with data of the cue point.
     * @private
     */
    setCuePointInOrder_(existingPoints, pointData) {
      let hasSet = false;
      for (let i = 0; i < existingPoints.length; i++) {
        if (existingPoints[i].dwSampleOffset > pointData.dwSampleOffset && !hasSet) {
          this.setCuePoint_(pointData, i + 1);
          this.setCuePoint_(existingPoints[i], i + 2);
          hasSet = true;
        } else {
          this.setCuePoint_(existingPoints[i], hasSet ? i + 2 : i + 1);
        }
      }
      if (!hasSet) {
        this.setCuePoint_(pointData, this.cue.points.length + 1);
      }
    }
    /**
     * Clear any LIST chunk labeled as 'adtl'.
     * @private
     */
    clearLISTadtl_() {
      for (let i = 0, len = this.LIST.length; i < len; i++) {
        if (this.LIST[i].format == "adtl") {
          this.LIST.splice(i);
        }
      }
    }
    /**
     * Create a new 'labl' subchunk in a 'LIST' chunk of type 'adtl'.
     * This method creates a LIST adtl chunk in the file if one
     * is not present.
     * @param {!Object} pointData A object with data of the cue point.
     * @param {number} dwName The ID of the cue point.
     * @private
     */
    setLabl_(pointData, dwName) {
      let adtlIndex = this.getLISTIndex("adtl");
      if (adtlIndex === null) {
        this.LIST.push({
          chunkId: "LIST",
          chunkSize: 4,
          format: "adtl",
          subChunks: []
        });
        adtlIndex = this.LIST.length - 1;
      }
      this.setLabelText_(adtlIndex, pointData, dwName);
      if (pointData.dwSampleLength) {
        this.setLtxtChunk_(adtlIndex, pointData, dwName);
      }
    }
    /**
     * Create a new 'labl' subchunk in a 'LIST' chunk of type 'adtl'.
     * @param {number} adtlIndex The index of the 'adtl' LIST in this.LIST.
     * @param {!Object} pointData A object with data of the cue point.
     * @param {number} dwName The ID of the cue point.
     * @private
     */
    setLabelText_(adtlIndex, pointData, dwName) {
      this.LIST[adtlIndex].subChunks.push({
        chunkId: "labl",
        chunkSize: 4,
        // should be 4 + label length in bytes
        dwName,
        value: pointData.label
      });
      this.LIST[adtlIndex].chunkSize += 12;
    }
    /**
     * Create a new 'ltxt' subchunk in a 'LIST' chunk of type 'adtl'.
     * @param {number} adtlIndex The index of the 'adtl' LIST in this.LIST.
     * @param {!Object} pointData A object with data of the cue point.
     * @param {number} dwName The ID of the cue point.
     * @private
     */
    setLtxtChunk_(adtlIndex, pointData, dwName) {
      this.LIST[adtlIndex].subChunks.push({
        chunkId: "ltxt",
        chunkSize: 20,
        // should be 12 + label byte length
        dwName,
        dwSampleLength: pointData.dwSampleLength,
        dwPurposeID: pointData.dwPurposeID || 0,
        dwCountry: pointData.dwCountry || 0,
        dwLanguage: pointData.dwLanguage || 0,
        dwDialect: pointData.dwDialect || 0,
        dwCodePage: pointData.dwCodePage || 0,
        value: pointData.label
        // kept for compatibility
      });
      this.LIST[adtlIndex].chunkSize += 28;
    }
  };

  // node_modules/wavefile/lib/resampler/interpolator.js
  var Interpolator = class {
    /**
     * @param {number} scaleFrom the length of the original array.
     * @param {number} scaleTo The length of the new array.
     * @param {!Object} details The extra configuration, if needed.
     */
    constructor(scaleFrom, scaleTo, details) {
      this.length_ = scaleFrom;
      this.scaleFactor_ = (scaleFrom - 1) / scaleTo;
      this.interpolate = this.sinc;
      if (details.method === "point") {
        this.interpolate = this.point;
      } else if (details.method === "linear") {
        this.interpolate = this.linear;
      } else if (details.method === "cubic") {
        this.interpolate = this.cubic;
      }
      this.tangentFactor_ = 1 - Math.max(0, Math.min(1, details.tension || 0));
      this.sincFilterSize_ = details.sincFilterSize || 1;
      this.kernel_ = sincKernel_(details.sincWindow || window_);
    }
    /**
     * @param {number} t The index to interpolate.
     * @param {Array<number>|TypedArray} samples the original array.
     * @return {number} The interpolated value.
     */
    point(t, samples) {
      return this.getClippedInput_(Math.round(this.scaleFactor_ * t), samples);
    }
    /**
     * @param {number} t The index to interpolate.
     * @param {Array<number>|TypedArray} samples the original array.
     * @return {number} The interpolated value.
     */
    linear(t, samples) {
      t = this.scaleFactor_ * t;
      let k = Math.floor(t);
      t -= k;
      return (1 - t) * this.getClippedInput_(k, samples) + t * this.getClippedInput_(k + 1, samples);
    }
    /**
     * @param {number} t The index to interpolate.
     * @param {Array<number>|TypedArray} samples the original array.
     * @return {number} The interpolated value.
     */
    cubic(t, samples) {
      t = this.scaleFactor_ * t;
      let k = Math.floor(t);
      let m = [this.getTangent_(k, samples), this.getTangent_(k + 1, samples)];
      let p = [
        this.getClippedInput_(k, samples),
        this.getClippedInput_(k + 1, samples)
      ];
      t -= k;
      let t2 = t * t;
      let t3 = t * t2;
      return (2 * t3 - 3 * t2 + 1) * p[0] + (t3 - 2 * t2 + t) * m[0] + (-2 * t3 + 3 * t2) * p[1] + (t3 - t2) * m[1];
    }
    /**
     * @param {number} t The index to interpolate.
     * @param {Array<number>|TypedArray} samples the original array.
     * @return {number} The interpolated value.
     */
    sinc(t, samples) {
      t = this.scaleFactor_ * t;
      let k = Math.floor(t);
      let ref = k - this.sincFilterSize_ + 1;
      let ref1 = k + this.sincFilterSize_;
      let sum = 0;
      for (let n = ref; n <= ref1; n++) {
        sum += this.kernel_(t - n) * this.getClippedInput_(n, samples);
      }
      return sum;
    }
    /**
     * @param {number} k The scaled index to interpolate.
     * @param {Array<number>|TypedArray} samples the original array.
     * @return {number} The tangent.
     * @private
     */
    getTangent_(k, samples) {
      return this.tangentFactor_ * (this.getClippedInput_(k + 1, samples) - this.getClippedInput_(k - 1, samples)) / 2;
    }
    /**
     * @param {number} t The scaled index to interpolate.
     * @param {Array<number>|TypedArray} samples the original array.
     * @return {number} The interpolated value.
     * @private
     */
    getClippedInput_(t, samples) {
      if (0 <= t && t < this.length_) {
        return samples[t];
      }
      return 0;
    }
  };
  function window_(x) {
    return Math.exp(-x / 2 * x / 2);
  }
  function sincKernel_(window3) {
    return function(x) {
      return sinc_(x) * window3(x);
    };
  }
  function sinc_(x) {
    if (x === 0) {
      return 1;
    }
    return Math.sin(Math.PI * x) / (Math.PI * x);
  }

  // node_modules/wavefile/lib/resampler/fir-lpf.js
  var FIRLPF = class {
    /**
     * @param {number} order The order of the filter.
     * @param {number} sampleRate The sample rate.
     * @param {number} cutOff The cut off frequency.
     */
    constructor(order, sampleRate, cutOff) {
      let omega = 2 * Math.PI * cutOff / sampleRate;
      let dc = 0;
      this.filters = [];
      for (let i = 0; i <= order; i++) {
        if (i - order / 2 === 0) {
          this.filters[i] = omega;
        } else {
          this.filters[i] = Math.sin(omega * (i - order / 2)) / (i - order / 2);
          this.filters[i] *= 0.54 - 0.46 * Math.cos(2 * Math.PI * i / order);
        }
        dc = dc + this.filters[i];
      }
      for (let i = 0; i <= order; i++) {
        this.filters[i] /= dc;
      }
      this.z = this.initZ_();
    }
    /**
     * @param {number} sample A sample of a sequence.
     * @return {number}
     */
    filter(sample) {
      this.z.buf[this.z.pointer] = sample;
      let out = 0;
      for (let i = 0, len = this.z.buf.length; i < len; i++) {
        out += this.filters[i] * this.z.buf[(this.z.pointer + i) % this.z.buf.length];
      }
      this.z.pointer = (this.z.pointer + 1) % this.z.buf.length;
      return out;
    }
    /**
     * Reset the filter.
     */
    reset() {
      this.z = this.initZ_();
    }
    /**
     * Return the default value for z.
     * @private
     */
    initZ_() {
      let r = [];
      for (let i = 0; i < this.filters.length - 1; i++) {
        r.push(0);
      }
      return {
        buf: r,
        pointer: 0
      };
    }
  };

  // node_modules/wavefile/lib/resampler/butterworth-lpf.js
  var ButterworthLPF = class {
    /**
     * @param {number} order The order of the filter.
     * @param {number} sampleRate The sample rate.
     * @param {number} cutOff The cut off frequency.
     */
    constructor(order, sampleRate, cutOff) {
      let filters = [];
      for (let i = 0; i < order; i++) {
        filters.push(this.getCoeffs_({
          Fs: sampleRate,
          Fc: cutOff,
          Q: 0.5 / Math.sin(Math.PI / (order * 2) * (i + 0.5))
        }));
      }
      this.stages = [];
      for (let i = 0; i < filters.length; i++) {
        this.stages[i] = {
          b0: filters[i].b[0],
          b1: filters[i].b[1],
          b2: filters[i].b[2],
          a1: filters[i].a[0],
          a2: filters[i].a[1],
          k: filters[i].k,
          z: [0, 0]
        };
      }
    }
    /**
     * @param {number} sample A sample of a sequence.
     * @return {number}
     */
    filter(sample) {
      let out = sample;
      for (let i = 0, len = this.stages.length; i < len; i++) {
        out = this.runStage_(i, out);
      }
      return out;
    }
    /**
     * @param {!Object} params The filter params.
     * @return {!Object}
     */
    getCoeffs_(params) {
      let coeffs = {};
      coeffs.a = [];
      coeffs.b = [];
      let p = this.preCalc_(params, coeffs);
      coeffs.k = 1;
      coeffs.b.push((1 - p.cw) / (2 * p.a0));
      coeffs.b.push(2 * coeffs.b[0]);
      coeffs.b.push(coeffs.b[0]);
      return coeffs;
    }
    /**
     * @param {!Object} params The filter params.
     * @param {!Object} coeffs The coefficients template.
     * @return {!Object}
     */
    preCalc_(params, coeffs) {
      let pre = {};
      let w = 2 * Math.PI * params.Fc / params.Fs;
      pre.alpha = Math.sin(w) / (2 * params.Q);
      pre.cw = Math.cos(w);
      pre.a0 = 1 + pre.alpha;
      coeffs.a0 = pre.a0;
      coeffs.a.push(-2 * pre.cw / pre.a0);
      coeffs.k = 1;
      coeffs.a.push((1 - pre.alpha) / pre.a0);
      return pre;
    }
    /**
     * @param {number} i The stage index.
     * @param {number} sample The sample.
     * @return {number}
     */
    runStage_(i, sample) {
      let temp = sample * this.stages[i].k - this.stages[i].a1 * this.stages[i].z[0] - this.stages[i].a2 * this.stages[i].z[1];
      let out = this.stages[i].b0 * temp + this.stages[i].b1 * this.stages[i].z[0] + this.stages[i].b2 * this.stages[i].z[1];
      this.stages[i].z[1] = this.stages[i].z[0];
      this.stages[i].z[0] = temp;
      return out;
    }
    /**
     * Reset the filter.
     */
    reset() {
      for (let i = 0; i < this.stages.length; i++) {
        this.stages[i].z = [0, 0];
      }
    }
  };

  // node_modules/wavefile/lib/resampler/index.js
  var DEFAULT_LPF_USE = {
    "point": false,
    "linear": false,
    "cubic": true,
    "sinc": true
  };
  var DEFAULT_LPF_ORDER = {
    "IIR": 16,
    "FIR": 71
  };
  var DEFAULT_LPF = {
    "IIR": ButterworthLPF,
    "FIR": FIRLPF
  };
  function resample(samples, oldSampleRate, sampleRate, options2 = null) {
    options2 = options2 || {};
    let rate = (sampleRate - oldSampleRate) / oldSampleRate + 1;
    let newSamples = new Float64Array(samples.length * rate);
    options2.method = options2.method || "cubic";
    let interpolator = new Interpolator(
      samples.length,
      newSamples.length,
      {
        method: options2.method,
        tension: options2.tension || 0,
        sincFilterSize: options2.sincFilterSize || 6,
        sincWindow: options2.sincWindow || void 0,
        clip: options2.clip || "mirror"
      }
    );
    if (options2.LPF === void 0) {
      options2.LPF = DEFAULT_LPF_USE[options2.method];
    }
    if (options2.LPF) {
      options2.LPFType = options2.LPFType || "IIR";
      const LPF = DEFAULT_LPF[options2.LPFType];
      if (sampleRate > oldSampleRate) {
        let filter = new LPF(
          options2.LPForder || DEFAULT_LPF_ORDER[options2.LPFType],
          sampleRate,
          oldSampleRate / 2
        );
        upsample_(
          samples,
          newSamples,
          interpolator,
          filter
        );
      } else {
        let filter = new LPF(
          options2.LPForder || DEFAULT_LPF_ORDER[options2.LPFType],
          oldSampleRate,
          sampleRate / 2
        );
        downsample_(
          samples,
          newSamples,
          interpolator,
          filter
        );
      }
    } else {
      resample_(samples, newSamples, interpolator);
    }
    return newSamples;
  }
  function resample_(samples, newSamples, interpolator) {
    for (let i = 0, len = newSamples.length; i < len; i++) {
      newSamples[i] = interpolator.interpolate(i, samples);
    }
  }
  function upsample_(samples, newSamples, interpolator, filter) {
    for (let i = 0, len = newSamples.length; i < len; i++) {
      newSamples[i] = filter.filter(interpolator.interpolate(i, samples));
    }
    filter.reset();
    for (let i = newSamples.length - 1; i >= 0; i--) {
      newSamples[i] = filter.filter(newSamples[i]);
    }
  }
  function downsample_(samples, newSamples, interpolator, filter) {
    for (let i = 0, len = samples.length; i < len; i++) {
      samples[i] = filter.filter(samples[i]);
    }
    filter.reset();
    for (let i = samples.length - 1; i >= 0; i--) {
      samples[i] = filter.filter(samples[i]);
    }
    resample_(samples, newSamples, interpolator);
  }

  // node_modules/wavefile/lib/wavefile-converter.js
  var WaveFileConverter = class extends WaveFileCueEditor {
    /**
     * Force a file as RIFF.
     */
    toRIFF() {
      let output = new Float64Array(
        outputSize_(this.data.samples.length, this.dataType.bits / 8)
      );
      unpackArrayTo(
        this.data.samples,
        this.dataType,
        output,
        0,
        this.data.samples.length
      );
      this.fromExisting_(
        this.fmt.numChannels,
        this.fmt.sampleRate,
        this.bitDepth,
        output,
        { container: "RIFF" }
      );
    }
    /**
     * Force a file as RIFX.
     */
    toRIFX() {
      let output = new Float64Array(
        outputSize_(this.data.samples.length, this.dataType.bits / 8)
      );
      unpackArrayTo(
        this.data.samples,
        this.dataType,
        output,
        0,
        this.data.samples.length
      );
      this.fromExisting_(
        this.fmt.numChannels,
        this.fmt.sampleRate,
        this.bitDepth,
        output,
        { container: "RIFX" }
      );
    }
    /**
     * Encode a 16-bit wave file as 4-bit IMA ADPCM.
     * @throws {Error} If sample rate is not 8000.
     * @throws {Error} If number of channels is not 1.
     */
    toIMAADPCM() {
      if (this.fmt.sampleRate !== 8e3) {
        throw new Error(
          "Only 8000 Hz files can be compressed as IMA-ADPCM."
        );
      } else if (this.fmt.numChannels !== 1) {
        throw new Error(
          "Only mono files can be compressed as IMA-ADPCM."
        );
      } else {
        this.assure16Bit_();
        let output = new Int16Array(
          outputSize_(this.data.samples.length, 2)
        );
        unpackArrayTo(
          this.data.samples,
          this.dataType,
          output,
          0,
          this.data.samples.length
        );
        this.fromExisting_(
          this.fmt.numChannels,
          this.fmt.sampleRate,
          "4",
          encode2(output),
          { container: this.correctContainer_() }
        );
      }
    }
    /**
     * Decode a 4-bit IMA ADPCM wave file as a 16-bit wave file.
     * @param {string=} [bitDepthCode='16'] The new bit depth of the samples.
     *    One of '8' ... '32' (integers), '32f' or '64' (floats).
     */
    fromIMAADPCM(bitDepthCode = "16") {
      this.fromExisting_(
        this.fmt.numChannels,
        this.fmt.sampleRate,
        "16",
        decode2(this.data.samples, this.fmt.blockAlign),
        { container: this.correctContainer_() }
      );
      if (bitDepthCode != "16") {
        this.toBitDepth(bitDepthCode);
      }
    }
    /**
     * Encode a 16-bit wave file as 8-bit A-Law.
     */
    toALaw() {
      this.assure16Bit_();
      let output = new Int16Array(
        outputSize_(this.data.samples.length, 2)
      );
      unpackArrayTo(
        this.data.samples,
        this.dataType,
        output,
        0,
        this.data.samples.length
      );
      this.fromExisting_(
        this.fmt.numChannels,
        this.fmt.sampleRate,
        "8a",
        encode3(output),
        { container: this.correctContainer_() }
      );
    }
    /**
     * Decode a 8-bit A-Law wave file into a 16-bit wave file.
     * @param {string=} [bitDepthCode='16'] The new bit depth of the samples.
     *    One of '8' ... '32' (integers), '32f' or '64' (floats).
     */
    fromALaw(bitDepthCode = "16") {
      this.fromExisting_(
        this.fmt.numChannels,
        this.fmt.sampleRate,
        "16",
        decode3(this.data.samples),
        { container: this.correctContainer_() }
      );
      if (bitDepthCode != "16") {
        this.toBitDepth(bitDepthCode);
      }
    }
    /**
     * Encode 16-bit wave file as 8-bit mu-Law.
     */
    toMuLaw() {
      this.assure16Bit_();
      let output = new Int16Array(
        outputSize_(this.data.samples.length, 2)
      );
      unpackArrayTo(
        this.data.samples,
        this.dataType,
        output,
        0,
        this.data.samples.length
      );
      this.fromExisting_(
        this.fmt.numChannels,
        this.fmt.sampleRate,
        "8m",
        encode4(output),
        { container: this.correctContainer_() }
      );
    }
    /**
     * Decode a 8-bit mu-Law wave file into a 16-bit wave file.
     * @param {string=} [bitDepthCode='16'] The new bit depth of the samples.
     *    One of '8' ... '32' (integers), '32f' or '64' (floats).
     */
    fromMuLaw(bitDepthCode = "16") {
      this.fromExisting_(
        this.fmt.numChannels,
        this.fmt.sampleRate,
        "16",
        decode4(this.data.samples),
        { container: this.correctContainer_() }
      );
      if (bitDepthCode != "16") {
        this.toBitDepth(bitDepthCode);
      }
    }
    /**
     * Change the bit depth of the samples.
     * @param {string} newBitDepth The new bit depth of the samples.
     *    One of '8' ... '32' (integers), '32f' or '64' (floats)
     * @param {boolean=} [changeResolution=true] A boolean indicating if the
     *    resolution of samples should be actually changed or not.
     * @throws {Error} If the bit depth is not valid.
     */
    toBitDepth(newBitDepth, changeResolution = true) {
      let toBitDepth = newBitDepth;
      let thisBitDepth = this.bitDepth;
      if (!changeResolution) {
        if (newBitDepth != "32f") {
          toBitDepth = this.dataType.bits.toString();
        }
        thisBitDepth = "" + this.dataType.bits;
      }
      this.assureUncompressed_();
      let samples = this.getSamples(true);
      let newSamples = new Float64Array(samples.length);
      changeBitDepth(samples, thisBitDepth, newSamples, toBitDepth);
      this.fromExisting_(
        this.fmt.numChannels,
        this.fmt.sampleRate,
        newBitDepth,
        newSamples,
        { container: this.correctContainer_() }
      );
    }
    /**
     * Convert the sample rate of the file.
     * @param {number} sampleRate The target sample rate.
     * @param {Object=} options The extra configuration, if needed.
     */
    toSampleRate(sampleRate, options2) {
      this.validateResample_(sampleRate);
      let samples = this.getSamples();
      let newSamples = [];
      if (samples.constructor === Float64Array) {
        newSamples = resample(samples, this.fmt.sampleRate, sampleRate, options2);
      } else {
        for (let i = 0; i < samples.length; i++) {
          newSamples.push(resample(
            samples[i],
            this.fmt.sampleRate,
            sampleRate,
            options2
          ));
        }
      }
      this.fromExisting_(
        this.fmt.numChannels,
        sampleRate,
        this.bitDepth,
        newSamples,
        { "container": this.correctContainer_() }
      );
    }
    /**
     * Validate the conditions for resampling.
     * @param {number} sampleRate The target sample rate.
     * @throws {Error} If the file cant be resampled.
     * @private
     */
    validateResample_(sampleRate) {
      if (!validateSampleRate(
        this.fmt.numChannels,
        this.fmt.bitsPerSample,
        sampleRate
      )) {
        throw new Error("Invalid sample rate.");
      } else if (["4", "8a", "8m"].indexOf(this.bitDepth) > -1) {
        throw new Error(
          "wavefile can't change the sample rate of compressed files."
        );
      }
    }
    /**
     * Make the file 16-bit if it is not.
     * @private
     */
    assure16Bit_() {
      this.assureUncompressed_();
      if (this.bitDepth != "16") {
        this.toBitDepth("16");
      }
    }
    /**
     * Uncompress the samples in case of a compressed file.
     * @private
     */
    assureUncompressed_() {
      if (this.bitDepth == "8a") {
        this.fromALaw();
      } else if (this.bitDepth == "8m") {
        this.fromMuLaw();
      } else if (this.bitDepth == "4") {
        this.fromIMAADPCM();
      }
    }
    /**
     * Return 'RIFF' if the container is 'RF64', the current container name
     * otherwise. Used to enforce 'RIFF' when RF64 is not allowed.
     * @return {string}
     * @private
     */
    correctContainer_() {
      return this.container == "RF64" ? "RIFF" : this.container;
    }
    /**
     * Set up the WaveFileCreator object based on the arguments passed.
     * This method only reset the fmt , fact, ds64 and data chunks.
     * @param {number} numChannels The number of channels
     *    (Integer numbers: 1 for mono, 2 stereo and so on).
     * @param {number} sampleRate The sample rate.
     *    Integer numbers like 8000, 44100, 48000, 96000, 192000.
     * @param {string} bitDepthCode The audio bit depth code.
     *    One of '4', '8', '8a', '8m', '16', '24', '32', '32f', '64'
     *    or any value between '8' and '32' (like '12').
     * @param {!(Array|TypedArray)} samples
     *    The samples. Must be in the correct range according to the bit depth.
     * @param {Object} options Used to define the container. Uses RIFF by default.
     * @throws {Error} If any argument does not meet the criteria.
     * @private
     */
    fromExisting_(numChannels, sampleRate, bitDepthCode, samples, options2) {
      let tmpWav = new WaveFileCueEditor();
      Object.assign(this.fmt, tmpWav.fmt);
      Object.assign(this.fact, tmpWav.fact);
      Object.assign(this.ds64, tmpWav.ds64);
      Object.assign(this.data, tmpWav.data);
      this.newWavFile_(numChannels, sampleRate, bitDepthCode, samples, options2);
    }
  };
  function outputSize_(byteLen, byteOffset) {
    let outputSize = byteLen / byteOffset;
    if (outputSize % 2) {
      outputSize++;
    }
    return outputSize;
  }

  // node_modules/wavefile/index.js
  var WaveFile = class extends WaveFileConverter {
    /**
     * @param {Uint8Array=} wav A wave file buffer.
     * @throws {Error} If container is not RIFF, RIFX or RF64.
     * @throws {Error} If format is not WAVE.
     * @throws {Error} If no 'fmt ' chunk is found.
     * @throws {Error} If no 'data' chunk is found.
     */
    constructor(wav) {
      super();
      if (wav) {
        this.fromBuffer(wav);
      }
    }
    /**
     * Use a .wav file encoded as a base64 string to load the WaveFile object.
     * @param {string} base64String A .wav file as a base64 string.
     * @throws {Error} If any property of the object appears invalid.
     */
    fromBase64(base64String) {
      this.fromBuffer(decode(base64String));
    }
    /**
     * Return a base64 string representig the WaveFile object as a .wav file.
     * @return {string} A .wav file as a base64 string.
     * @throws {Error} If any property of the object appears invalid.
     */
    toBase64() {
      return encode(this.toBuffer());
    }
    /**
     * Return a DataURI string representig the WaveFile object as a .wav file.
     * The return of this method can be used to load the audio in browsers.
     * @return {string} A .wav file as a DataURI.
     * @throws {Error} If any property of the object appears invalid.
     */
    toDataURI() {
      return "data:audio/wav;base64," + this.toBase64();
    }
    /**
     * Use a .wav file encoded as a DataURI to load the WaveFile object.
     * @param {string} dataURI A .wav file as DataURI.
     * @throws {Error} If any property of the object appears invalid.
     */
    fromDataURI(dataURI) {
      this.fromBase64(dataURI.replace("data:audio/wav;base64,", ""));
    }
  };

  // src/tagWriters/wavTagWriter.ts
  var WavTagWriter = class {
    constructor(buffer) {
      const uint8Array = new Uint8Array(buffer);
      this.wav = new WaveFile();
      this.wav.fromBuffer(uint8Array);
    }
    setTitle(title) {
      if (!title) throw new Error("Invalid value for title");
      this.wav.setTag("INAM", title);
    }
    setArtists(artists) {
      if (!artists || artists.length < 1) throw new Error("Invalid value for artists");
      this.wav.setTag("IART", artists.join(", "));
    }
    setAlbum(album) {
      if (!album) throw new Error("Invalid value for album");
      this.wav.setTag("IPRD", album);
    }
    setComment(comment) {
      if (!comment) throw new Error("Invalid value for comment");
      this.wav.setTag("ICMT", comment);
    }
    setTrackNumber(trackNumber) {
      if (trackNumber < 1 || trackNumber > 32767) throw new Error("Invalid value for trackNumber");
      this.wav.setTag("ITRK", trackNumber.toString());
    }
    setDate(date) {
      if (!date || isNaN(date.getTime())) throw new Error("Invalid value for date");
      this.wav.setTag("ICRD", date.toISOString().slice(0, 10));
    }
    setArtwork(artworkBuffer) {
      if (!artworkBuffer || artworkBuffer.byteLength < 1) throw new Error("Invalid value for artworkBuffer");
    }
    getBuffer() {
      this.wav.toRIFF();
      const rawBuffer = this.wav.toBuffer();
      console.log({ tags: this.wav.listTags() });
      return Promise.resolve(rawBuffer.buffer);
    }
  };

  // src/downloader.ts
  var TrackError = class extends Error {
    constructor(message, trackId, errorLabel) {
      super(\`\${message} (TrackId: \${trackId})\`);
      this.errorLabel = errorLabel;
    }
  };
  var soundcloudApi = new SoundCloudApi();
  var logger2 = Logger.create("Background");
  function saveBlobAsFile(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.style.display = "none";
    document.body.appendChild(link);
    try {
      link.click();
    } finally {
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 60 * 1e3);
    }
  }
  async function handleDownload(data, reportProgress) {
    try {
      logger2.logInfo(\`Initiating download of \${data.trackId} with payload\`, {
        payload: data
      });
      let artistsString = data.username;
      let titleString = data.title;
      if (getConfigValue("normalize-track")) {
        const extractor = new MetadataExtractor(
          data.title,
          data.username,
          data.userPermalink
        );
        let artists = extractor.getArtists();
        if (!getConfigValue("include-producers"))
          artists = artists.filter((i) => i.type !== 3 /* Producer */);
        artistsString = artists.map((i) => i.name).join(", ");
        titleString = extractor.getTitle();
        const remixers = artists.filter((i) => i.type === 2 /* Remixer */);
        if (remixers.length > 0) {
          const remixerNames = remixers.map((i) => i.name).join(" & ");
          const remixTypeString = RemixType[remixers[0].remixType || 0 /* Remix */].toString();
          titleString += \` (\${remixerNames} \${remixTypeString})\`;
        }
      }
      if (!artistsString) {
        artistsString = "Unknown";
      }
      if (!titleString) {
        titleString = "Unknown";
      }
      const rawFilename = sanitizeFilenameForDownload(
        \`\${artistsString} - \${titleString}\`
      );
      let artworkUrl = data.artworkUrl;
      if (!artworkUrl) {
        logger2.logInfo(
          \`No Artwork URL could be determined. Fallback to User Avatar (TrackId: \${data.trackId})\`
        );
        artworkUrl = data.avatarUrl;
      }
      logger2.logInfo(
        \`Starting download of '\${rawFilename}' (TrackId: \${data.trackId})...\`
      );
      let streamBuffer;
      let streamHeaders;
      if (data.hls) {
        try {
          const playlistReq = await fetch(data.streamUrl);
          const playlist = await playlistReq.text();
          const parser = new Parser();
          parser.push(playlist);
          parser.end();
          const parsedSegments = parser.manifest.segments;
          const initSegmentUrls = [];
          for (const segment of parsedSegments) {
            const mapUri = segment.map?.uri;
            if (mapUri && !initSegmentUrls.includes(mapUri)) {
              initSegmentUrls.push(mapUri);
            }
          }
          const segmentUrls = parsedSegments.map((i) => i.uri);
          const allUrls = [...initSegmentUrls, ...segmentUrls];
          const segments = [];
          for (let i = 0; i < allUrls.length; i++) {
            const segmentReq = await fetch(allUrls[i]);
            const segment = await segmentReq.arrayBuffer();
            segments.push(segment);
            const progress = Math.round(i / allUrls.length * 100);
            reportProgress(progress);
          }
          reportProgress(100);
          streamBuffer = concatArrayBuffers(segments);
        } catch (error) {
          logger2.logError(
            \`Failed to download m3u8 playlist (TrackId: \${data.trackId})\`,
            error
          );
          throw error;
        }
      } else {
        try {
          [streamBuffer, streamHeaders] = await soundcloudApi.downloadStream(
            data.streamUrl,
            reportProgress
          );
        } catch (error) {
          logger2.logError(
            \`Failed to download stream (TrackId: \${data.trackId})\`,
            error
          );
          throw error;
        }
      }
      if (!streamBuffer) {
        throw new TrackError(
          "SoundCloud returned no audio data for this track.",
          data.trackId,
          "No audio received"
        );
      }
      let contentType;
      if (!data.fileExtension && streamHeaders) {
        contentType = streamHeaders.get("content-type");
        let extension = "mp3";
        if (contentType === "audio/mp4") extension = "m4a";
        else if (contentType === "audio/x-wav" || contentType === "audio/wav")
          extension = "wav";
        data.fileExtension = extension;
        logger2.logInfo(
          \`Inferred file extension from 'content-type' header (TrackId: \${data.trackId})\`,
          {
            contentType,
            extension
          }
        );
      }
      let downloadBuffer;
      if (getConfigValue("set-metadata")) {
        try {
          let writer;
          if (data.fileExtension === "m4a") {
            const mp4Writer = new Mp4TagWriter(streamBuffer);
            try {
              mp4Writer.setDuration(data.duration);
            } catch (error) {
              logger2.logError(
                \`Failed to set duration for track (TrackId: \${data.trackId})\`,
                error
              );
            }
            writer = mp4Writer;
          } else if (data.fileExtension === "mp3") {
            writer = new Mp3TagWriter(streamBuffer);
          } else if (data.fileExtension === "wav") {
            writer = new WavTagWriter(streamBuffer);
          }
          if (writer) {
            writer.setTitle(titleString);
            writer.setAlbum(data.albumName ?? titleString);
            writer.setArtists([artistsString]);
            writer.setComment(data.permalinkUrl || data.trackId.toString());
            if (data.trackNumber > 0) {
              writer.setTrackNumber(data.trackNumber);
            }
            writer.setDate(data.uploadDate);
            if (artworkUrl) {
              const sizeOptions = ["original", "t500x500", "large"];
              let artworkBuffer = null;
              let curArtworkUrl;
              do {
                const curSizeOption = sizeOptions.shift();
                curArtworkUrl = artworkUrl.replace(
                  "-large.",
                  \`-\${curSizeOption}.\`
                );
                artworkBuffer = await soundcloudApi.downloadArtwork(
                  curArtworkUrl
                );
              } while (artworkBuffer === null && sizeOptions.length > 0);
              if (artworkBuffer) {
                writer.setArtwork(artworkBuffer);
              }
            } else {
              logger2.logWarn(
                \`Skipping download of Artwork (TrackId: \${data.trackId})\`
              );
            }
            downloadBuffer = await writer.getBuffer();
          }
        } catch (error) {
          logger2.logError(
            \`Failed to set metadata (TrackId: \${data.trackId})\`,
            error
          );
        }
      }
      const blobOptions = {};
      if (contentType) blobOptions.type = contentType;
      const downloadBlob = new Blob(
        [downloadBuffer ?? streamBuffer],
        blobOptions
      );
      const downloadFilename = rawFilename + "." + data.fileExtension;
      logger2.logInfo(
        \`Downloading track as '\${downloadFilename}' (TrackId: \${data.trackId})...\`
      );
      try {
        saveBlobAsFile(downloadBlob, downloadFilename);
        logger2.logInfo(
          \`Successfully downloaded '\${rawFilename}' (TrackId: \${data.trackId})!\`
        );
        reportProgress(101);
      } catch (error) {
        logger2.logError(
          \`Failed to download track to file system (TrackId: \${data.trackId})\`,
          {
            downloadFilename,
            error
          }
        );
        throw new TrackError(
          "The file couldn't be saved to your computer. Check the download permissions of your SoundCloud client and try again.",
          data.trackId,
          "Could not save file"
        );
      }
    } catch (error) {
      if (error instanceof TrackError) {
        throw error;
      }
      throw new TrackError(
        "Something went wrong while downloading this track. Please try again.",
        data.trackId,
        "Unexpected error"
      );
    }
  }
  function getTranscodingDetails(details) {
    if (details?.media?.transcodings?.length < 1) return null;
    logger2.logInfo(
      \`Available transcodings for track \${details.id}\`,
      details.media.transcodings.map((t) => ({
        protocol: t.format?.protocol,
        mime_type: t.format?.mime_type,
        quality: t.quality,
        snipped: t.snipped,
        url: t.url
      }))
    );
    const mpegStreams = details.media.transcodings.filter(
      (transcoding) => (transcoding.format?.protocol === "progressive" || transcoding.format?.protocol === "hls") && (transcoding.format?.mime_type?.startsWith("audio/mpeg") || transcoding.format?.mime_type?.startsWith("audio/mp4")) && !transcoding.snipped
    ).map((transcoding) => ({
      protocol: transcoding.format.protocol,
      url: transcoding.url,
      quality: transcoding.quality,
      extension: soundcloudApi.convertMimeTypeToExtension(
        transcoding.format.mime_type
      )
    }));
    if (mpegStreams.length < 1) {
      logger2.logWarn("No transcodings streams could be determined!");
      return null;
    }
    let streams = mpegStreams.sort((a, b) => {
      if (a.quality === "hq" && b.quality === "sq") {
        return -1;
      }
      if (a.quality === "sq" && b.quality === "hq") {
        return 1;
      }
      if (a.protocol === "progressive" && b.protocol === "hls") {
        return -1;
      }
      if (a.protocol === "hls" && b.protocol === "progressive") {
        return 1;
      }
      return 0;
    });
    if (!getConfigValue("download-hq-version")) {
      streams = streams.filter((stream) => stream.quality !== "hq");
    }
    if (streams.some((stream) => stream.quality === "hq")) {
      logger2.logInfo("Including high quality streams!");
    }
    return streams;
  }
  function isValidTrack(track) {
    return track && track.kind === "track" && track.state === "finished" && (track.streamable || track.downloadable);
  }
  function isTranscodingDetails(detail) {
    return !!detail["protocol"];
  }
  async function downloadTrack(track, trackNumber, albumName, reportProgress) {
    if (!track) {
      logger2.logError("Cannot download: track resource is null (resolve failed)");
      throw new Error("Track resource is null (resolve failed)");
    }
    if (!isValidTrack(track)) {
      logger2.logError(
        "Track does not satisfy constraints needed to be downloadable",
        {
          id: track.id,
          kind: track.kind,
          state: track.state,
          streamable: track.streamable,
          downloadable: track.downloadable
        }
      );
      throw new TrackError(
        "This track isn't available for download. It may be private, geo-blocked, or still being processed by SoundCloud.",
        track.id,
        "Track unavailable"
      );
    }
    const downloadDetails = [];
    if (getConfigValue("download-original-version") && track.downloadable && track.has_downloads_left) {
      const originalDownloadUrl = await soundcloudApi.getOriginalDownloadUrl(
        track.id
      );
      if (originalDownloadUrl) {
        const stream = {
          url: originalDownloadUrl,
          hls: false
        };
        downloadDetails.push(stream);
      }
    }
    const transcodingDetails = getTranscodingDetails(track);
    if (transcodingDetails) {
      downloadDetails.push(...transcodingDetails);
    }
    if (downloadDetails.length < 1) {
      throw new TrackError(
        "SoundCloud didn't provide any audio source for this track, so it can't be downloaded.",
        track.id,
        "No audio source"
      );
    }
    for (const downloadDetail of downloadDetails) {
      let stream;
      try {
        if (isTranscodingDetails(downloadDetail)) {
          logger2.logDebug(
            "Get stream details from transcoding details",
            downloadDetail
          );
          const streamUrl = await soundcloudApi.getStreamUrl(
            downloadDetail.url,
            track.track_authorization
          );
          stream = {
            url: streamUrl,
            hls: downloadDetail.protocol === "hls",
            extension: downloadDetail.extension
          };
        } else {
          stream = downloadDetail;
        }
        const downloadData = {
          trackId: track.id,
          duration: track.duration,
          uploadDate: new Date(track.display_date),
          streamUrl: stream.url,
          fileExtension: stream.extension,
          title: track.title,
          username: track.user.username,
          userPermalink: track.user.permalink,
          artworkUrl: track.artwork_url,
          avatarUrl: track.user.avatar_url,
          trackNumber,
          albumName,
          hls: stream.hls,
          permalinkUrl: track.permalink_url
        };
        await handleDownload(downloadData, reportProgress);
        return;
      } catch (error) {
        logger2.logWarn(
          \`Failed to download a version of track \${track.id}, trying next\`,
          {
            downloadDetail,
            error: error instanceof Error ? error.message : error
          }
        );
        continue;
      }
    }
    const hasDrmOnly = track.media?.transcodings?.length > 0 && track.media.transcodings.every(
      (t) => t.format?.protocol?.includes("encrypted")
    );
    const hasDrm = track.media?.transcodings?.some(
      (t) => t.format?.protocol?.includes("encrypted")
    );
    if (hasDrmOnly) {
      throw new TrackError(
        "SoundCloud serves this track as a DRM-protected stream. It can be played in the browser but cannot be saved as a file.",
        track.id,
        "DRM-protected stream"
      );
    }
    if (hasDrm) {
      throw new TrackError(
        "SoundCloud only offers this track as a DRM-protected stream. It can be played in the browser but cannot be saved as a file.",
        track.id,
        "DRM-protected stream"
      );
    }
    throw new TrackError(
      "None of the available audio versions for this track could be downloaded. SoundCloud may have removed or restricted the audio.",
      track.id,
      "Download failed"
    );
  }
  function sendDownloadProgress(listener, progress, error) {
    let errorMessage = "";
    let errorLabel;
    if (error instanceof Error) {
      errorMessage = error.message;
      const label = error.errorLabel;
      if (label) {
        errorLabel = label;
      }
    } else {
      errorMessage = error;
    }
    listener({
      progress,
      error: errorMessage,
      errorLabel
    });
  }
  function chunkArray(array, chunkSize) {
    if (chunkSize < 1) throw new Error("Invalid chunk size");
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize);
      chunks.push(chunk);
    }
    return chunks;
  }
  async function runDownloadRequest(request, listener) {
    const { url, type } = request;
    try {
      if (type === "DOWNLOAD_SET") {
        logger2.logDebug("Received set download request", { url });
        const set = await soundcloudApi.resolveUrl(url);
        const isAlbum = set.set_type === "album" || set.set_type === "ep";
        const trackIds = set.tracks.map((i) => i.id);
        const progresses = {};
        const reportPlaylistProgress = (trackId) => (progress) => {
          if (progress) {
            progresses[trackId] = progress;
          }
          const totalProgress = Object.values(progresses).reduce(
            (acc, cur) => acc + cur,
            0
          );
          sendDownloadProgress(listener, totalProgress / trackIds.length);
        };
        const treatAsAlbum = isAlbum && trackIds.length > 1;
        const albumName = treatAsAlbum ? set.title : void 0;
        const trackIdChunkSize = 10;
        const trackIdChunks = chunkArray(trackIds, trackIdChunkSize);
        let successes = 0;
        let failures = 0;
        const failureLabels = /* @__PURE__ */ new Set();
        let lastFailure;
        let currentTrackIdChunk = 0;
        for (const trackIdChunk of trackIdChunks) {
          const baseTrackNumber = currentTrackIdChunk * trackIdChunkSize;
          const keyedTracks = await soundcloudApi.getTracks(trackIdChunk);
          const tracks = Object.values(keyedTracks).reverse();
          logger2.logInfo(\`Downloading \${isAlbum ? "album" : "playlist"}...\`);
          const downloads = [];
          for (let i = 0; i < tracks.length; i++) {
            const trackNumber = treatAsAlbum ? baseTrackNumber + i + 1 : void 0;
            const download = downloadTrack(
              tracks[i],
              trackNumber,
              albumName,
              reportPlaylistProgress(tracks[i].id)
            ).then(
              () => {
                successes++;
              },
              (error) => {
                failures++;
                lastFailure = error;
                const label = error.errorLabel;
                if (label) {
                  failureLabels.add(label);
                }
                logger2.logError("Failed to download track of set", error);
              }
            );
            downloads.push(download);
          }
          await Promise.all(downloads);
          currentTrackIdChunk++;
        }
        logger2.logInfo(
          \`Downloaded \${isAlbum ? "album" : "playlist"} (\${successes} ok, \${failures} failed)\`
        );
        if (successes === 0 && failures > 0) {
          const labels = [...failureLabels];
          const label = labels.length === 1 ? labels[0] : \`All \${failures} tracks failed\`;
          const lastDetail = lastFailure?.message ? \` Last error: \${lastFailure.message}\` : "";
          const summary = Object.assign(
            new Error(
              \`None of the \${failures} tracks in this set could be downloaded.\${lastDetail}\`
            ),
            { errorLabel: label }
          );
          sendDownloadProgress(listener, void 0, summary);
        } else {
          sendDownloadProgress(listener, 101);
        }
      } else if (type === "DOWNLOAD") {
        logger2.logDebug("Received track download request", { url });
        const track = await soundcloudApi.resolveUrl(url);
        const reportTrackProgress = (progress) => {
          sendDownloadProgress(listener, progress);
        };
        await downloadTrack(track, void 0, void 0, reportTrackProgress);
      } else {
        throw new Error(\`Unknown download type: \${type}\`);
      }
    } catch (error) {
      sendDownloadProgress(listener, void 0, error);
      logger2.logError("Download failed unexpectedly", error);
    }
  }

  // src/buttons.ts
  var uuid = () => typeof crypto !== "undefined" && typeof crypto.randomUUID === "function" ? crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    return (c === "x" ? r : r & 3 | 8).toString(16);
  });
  var downloadIcon = \`<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden="true"><path d="M20.25 12.75V20.25H3.75V12.75M12 4.5V15M7.5 10.5L12 15L16.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"></path></svg>\`;
  var errorIcon = \`<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8.25" stroke="currentColor" stroke-width="1.5"></circle><path d="M12 7.5V13.5M12 16.125V17.25" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"></path></svg>\`;
  var successIcon = \`<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden="true"><path d="M4.5 12.75L9.75 18L19.5 6.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"></path></svg>\`;
  var errorColor = "#d30029";
  var successColor = "#19a352";
  var progressColor = "#ff5419";
  var downloadButtons = {};
  var tooltips = /* @__PURE__ */ new WeakMap();
  var tooltipTarget = null;
  var tooltipTimeout = null;
  var modernEnterDelay = 200;
  var modernHiddenTransform = "translate(-50%, -100%) scale(0.75, 0.5625)";
  var modernVisibleTransform = "translate(-50%, -100%) scale(1, 1)";
  var classicOffset = 11;
  var getTooltipVariant = (button) => button.dataset.tooltipVariant ?? "modern";
  var createTooltip = (variant, doc) => {
    const elem = doc.createElement("div");
    if (variant === "classic") {
      elem.className = "tooltip g-z-index-overlay g-opacity-transition sc-selection-disabled";
      elem.style.cssText = "outline: none; width: auto; min-height: auto; position: absolute";
      elem.innerHTML = \`<div class="tooltip__arrow"></div><div class="tooltip__content sc-text-captions"></div>\`;
    } else {
      elem.style.cssText = [
        "position: fixed",
        "z-index: 2147483647",
        "pointer-events: none",
        "background-color: #121212",
        "color: #fafafa",
        "font-family: inherit",
        "font-size: 11px",
        "line-height: 16.5px",
        "padding: 1px 8px",
        "border-radius: 4px",
        "white-space: nowrap",
        "opacity: 0",
        "transform-origin: 50% 100%",
        \`transform: \${modernHiddenTransform}\`,
        "transition: opacity 200ms cubic-bezier(0.25, 0.1, 0.25, 1), transform 133ms cubic-bezier(0.25, 0.1, 0.25, 1)"
      ].join(";");
    }
    doc.body.appendChild(elem);
    return elem;
  };
  var getTooltip = (variant, doc) => {
    let forDoc = tooltips.get(doc);
    if (!forDoc) {
      forDoc = {};
      tooltips.set(doc, forDoc);
    }
    if (!forDoc[variant]) {
      forDoc[variant] = createTooltip(variant, doc);
    }
    return forDoc[variant];
  };
  var positionTooltip = (elem, button, variant) => {
    const rect = button.getBoundingClientRect();
    const text = button.dataset.tooltip ?? "";
    const win = button.ownerDocument.defaultView ?? window;
    if (variant === "classic") {
      const content = elem.querySelector(".tooltip__content");
      content.innerText = text;
      elem.style.top = \`\${rect.bottom + win.scrollY + classicOffset}px\`;
      elem.style.left = \`\${rect.left + win.scrollX + rect.width / 2 - elem.offsetWidth / 2}px\`;
      return;
    }
    elem.innerText = text;
    elem.style.left = \`\${rect.left + rect.width / 2}px\`;
    elem.style.top = \`\${rect.top - 4}px\`;
  };
  var showTooltip = (button) => {
    const variant = getTooltipVariant(button);
    const elem = getTooltip(variant, button.ownerDocument);
    positionTooltip(elem, button, variant);
    if (tooltipTarget === button) {
      return;
    }
    tooltipTarget = button;
    if (tooltipTimeout !== null) {
      window.clearTimeout(tooltipTimeout);
    }
    const reveal = () => {
      tooltipTimeout = null;
      if (tooltipTarget !== button) {
        return;
      }
      positionTooltip(elem, button, variant);
      if (variant === "classic") {
        elem.classList.add("m-is-visible");
      } else {
        elem.style.opacity = "1";
        elem.style.transform = modernVisibleTransform;
      }
    };
    if (variant === "classic") {
      reveal();
    } else {
      tooltipTimeout = window.setTimeout(reveal, modernEnterDelay);
    }
  };
  var hideTooltip = (button) => {
    const variant = getTooltipVariant(button);
    const elem = tooltips.get(button.ownerDocument)?.[variant];
    if (!elem || tooltipTarget !== button) {
      return;
    }
    tooltipTarget = null;
    if (tooltipTimeout !== null) {
      window.clearTimeout(tooltipTimeout);
      tooltipTimeout = null;
    }
    if (variant === "classic") {
      elem.classList.remove("m-is-visible");
    } else {
      elem.style.opacity = "0";
      elem.style.transform = modernHiddenTransform;
    }
  };
  var setButtonText = (button, text, title) => {
    if (button.dataset.iconOnly === "true") {
      button.setAttribute("aria-label", text);
      button.dataset.tooltip = title ?? text;
      if (tooltipTarget === button) {
        showTooltip(button);
      }
      return;
    }
    button.innerText = text;
    button.title = title ?? text;
  };
  var resetButtonBackground = (button) => {
    button.style.backgroundColor = "";
    button.style.background = "";
  };
  var isIconButton = (button) => button.dataset.iconOnly === "true";
  var renderIcon = (button, icon) => {
    button.innerHTML = button.dataset.tooltipVariant === "classic" ? \`<div>\${icon}</div>\` : icon;
  };
  var setDownloadProgress = (button, progress, iconOnly) => {
    if (iconOnly) {
      button.style.color = progressColor;
      return;
    }
    button.style.background = \`linear-gradient(90deg, \${progressColor} \${progress}%, transparent 0%)\`;
  };
  var setIconButtonError = (button, message, label, onReset) => {
    resetButtonBackground(button);
    renderIcon(button, errorIcon);
    button.style.color = errorColor;
    button.style.cursor = "pointer";
    setButtonText(button, label ? \`Error: \${label}\` : "Error");
    button.onclick = () => {
      (button.ownerDocument.defaultView ?? window).alert(message);
      renderIcon(button, downloadIcon);
      button.style.color = "";
      button.onclick = onReset;
      setButtonText(button, "Download");
    };
  };
  var handleDownloadProgress = (downloadId, message) => {
    const { progress, error, errorLabel } = message;
    const downloadButtonState = downloadButtons[downloadId];
    if (!downloadButtonState) return;
    const { elem: downloadButton, onClick: originalOnClick } = downloadButtonState;
    const iconButton = isIconButton(downloadButton);
    if (progress === 101) {
      resetButtonBackground(downloadButton);
      if (iconButton) {
        renderIcon(downloadButton, successIcon);
        downloadButton.style.color = successColor;
      } else {
        downloadButton.style.backgroundColor = successColor;
      }
      setButtonText(downloadButton, "Downloaded!");
      setTimeout(() => {
        resetButtonBackground(downloadButton);
        if (iconButton) {
          renderIcon(downloadButton, downloadIcon);
          downloadButton.style.color = "";
        }
        setButtonText(downloadButton, "Download");
        downloadButton.style.cursor = "pointer";
        downloadButton.onclick = originalOnClick;
        delete downloadButtons[downloadId];
      }, 2e3);
    } else if (progress === 100) {
      setButtonText(downloadButton, "Finishing...");
      setDownloadProgress(downloadButton, progress, iconButton);
    } else if (progress) {
      setButtonText(downloadButton, "Downloading...");
      setDownloadProgress(downloadButton, progress, iconButton);
    }
    if (error) {
      if (isIconButton(downloadButton)) {
        setIconButtonError(downloadButton, error, errorLabel, originalOnClick);
      } else {
        resetButtonBackground(downloadButton);
        downloadButton.style.backgroundColor = errorColor;
        const buttonLabel = errorLabel ? \`Error: \${errorLabel}\` : "Error";
        setButtonText(downloadButton, buttonLabel, error);
        downloadButton.style.cursor = "pointer";
        downloadButton.onclick = originalOnClick;
      }
      delete downloadButtons[downloadId];
    }
  };
  var createDownloadButton = (doc, small) => {
    const button = doc.createElement("button");
    const buttonSizeClass = small ? "sc-button-small" : "sc-button-medium";
    button.className = \`sc-button-download sc-button \${buttonSizeClass} sc-button-responsive\`;
    setButtonText(button, "Download");
    return button;
  };
  var buttonIdentityClasses = /^(sc-button-(like|repost|share|copylink|more|follow|download|selected)|m-boldIcon)$/;
  var createIconDownloadButton = (parent, small) => {
    const button = parent.ownerDocument.createElement("button");
    const legacySibling = parent.querySelector("button.sc-button-icon") ?? parent.querySelector("button.sc-button");
    button.type = "button";
    button.dataset.iconOnly = "true";
    if (legacySibling) {
      const buttonSizeClass = small ? "sc-button-small" : "sc-button-medium";
      const classes = legacySibling.className.split(" ").filter((className) => className && !buttonIdentityClasses.test(className));
      if (!classes.includes("sc-button-icon")) {
        classes.push("sc-button-icon");
      }
      const hasSizeClass = classes.some(
        (className) => /^sc-button-(small|medium|large)$/.test(className)
      );
      if (!hasSizeClass) {
        classes.push(buttonSizeClass);
      }
      button.className = ["sc-button-download", ...classes].join(" ");
      button.dataset.tooltipVariant = "classic";
      renderIcon(button, downloadIcon);
    } else {
      const sibling = parent.querySelector("button");
      button.className = \`sc-button-download \${sibling?.className ?? ""}\`.trim();
      button.dataset.tooltipVariant = "modern";
      renderIcon(button, downloadIcon);
    }
    button.onmouseenter = () => showTooltip(button);
    button.onmouseleave = () => hideTooltip(button);
    setButtonText(button, "Download");
    return button;
  };
  var addDownloadButtonToParent = (parent, onClicked, small, iconOnly, iconFirst) => {
    const downloadButtonExists = parent.querySelector("button.sc-button-download") !== null;
    if (downloadButtonExists) {
      return;
    }
    const button = iconOnly ? createIconDownloadButton(parent, small) : createDownloadButton(parent.ownerDocument, small);
    button.onclick = async () => {
      const downloadId = uuid();
      downloadButtons[downloadId] = {
        elem: button,
        onClick: button.onclick
      };
      resetButtonBackground(button);
      button.style.cursor = "default";
      button.onclick = null;
      setButtonText(button, "Preparing...");
      await onClicked(downloadId);
    };
    if (iconFirst) {
      parent.insertBefore(button, parent.firstChild);
      return;
    }
    const moreButton = iconOnly ? parent.querySelector(
      \`button.sc-button-more, button[aria-label="More menu"]\`
    ) : null;
    let anchor = moreButton;
    while (anchor && anchor.parentNode !== parent) {
      anchor = anchor.parentNode;
    }
    if (anchor) {
      parent.insertBefore(button, anchor);
    } else {
      parent.appendChild(button);
    }
  };
  var createDownloadCommand = (url) => (downloadId) => {
    const pathname = new URL(url).pathname;
    const parts = pathname.split("/").filter(Boolean);
    const set = parts.length >= 2 && parts[parts.length - 2] === "sets";
    return runDownloadRequest(
      { type: set ? "DOWNLOAD_SET" : "DOWNLOAD", url },
      (progress) => handleDownloadProgress(downloadId, progress)
    );
  };
  var setupDownloadButtons = (ctx, {
    selector,
    getTrackUrl,
    getButtonParent,
    isSmall = false,
    isIconOnly = false,
    isIconFirst = false
  }) => {
    const handler = (node) => {
      const initialTrackUrl = getTrackUrl(node);
      if (!initialTrackUrl) {
        return;
      }
      const parent = getButtonParent(node);
      if (!parent) {
        return;
      }
      const downloadCommand = (downloadId) => {
        const trackUrl = getTrackUrl(node) ?? initialTrackUrl;
        return createDownloadCommand(ctx.win.location.origin + trackUrl)(
          downloadId
        );
      };
      addDownloadButtonToParent(
        parent,
        downloadCommand,
        isSmall,
        isIconOnly,
        isIconFirst
      );
    };
    ctx.doc.querySelectorAll(selector).forEach(handler);
    const event = {
      selector,
      callback: handler
    };
    ctx.observer.addEvent(event);
  };
  var getSoundPathname = (win) => {
    const pathname = win.location.pathname.replace(/^\/n(?=\/|$)/, "");
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length < 2) {
      return null;
    }
    return "/" + parts.join("/");
  };
  var attachDownloadButtons = (win) => {
    const doc = win.document;
    const ctx = { win, doc, observer: new DomObserver(win) };
    setupDownloadButtons(ctx, {
      selector: 'button[aria-label="Copy link"]',
      getTrackUrl: () => getSoundPathname(win),
      getButtonParent: (node) => node.parentElement,
      isIconOnly: true
    });
    setupDownloadButtons(ctx, {
      selector: ".listenEngagement__footer .sc-button-group, .systemPlaylistDetails__controls",
      getTrackUrl: () => win.location.pathname,
      getButtonParent: (node) => node,
      isIconOnly: true
    });
    setupDownloadButtons(ctx, {
      selector: ".playableTile__actionWrapper",
      getTrackUrl: (node) => {
        const tile = node.closest(".playableTile");
        const el = tile?.querySelector("a.playableTile__artworkLink");
        return el?.getAttribute("href") ?? null;
      },
      getButtonParent: (node) => node,
      isIconOnly: true,
      isIconFirst: true
    });
    setupDownloadButtons(ctx, {
      selector: ".sound__footer .sc-button-group",
      getTrackUrl: (node) => {
        const sound = node.closest(".sound");
        const titleLink = sound?.querySelector("a.soundTitle__title");
        const titleHref = titleLink?.getAttribute("href");
        if (titleHref) return titleHref;
        const ministatLink = sound?.querySelector("a.sc-ministats[href]");
        const ministatHref = ministatLink?.getAttribute("href");
        const stripped = ministatHref?.replace(
          /\/(likes|reposts|comments)$/,
          ""
        );
        return stripped ?? null;
      },
      getButtonParent: (node) => node,
      isIconOnly: true
    });
    setupDownloadButtons(ctx, {
      selector: ".trackItem .sc-button-group",
      getTrackUrl: (node) => {
        const trackItem = node.closest(".trackItem");
        const el = trackItem?.querySelector("a.trackItem__trackTitle");
        return el?.getAttribute("href") ?? null;
      },
      getButtonParent: (node) => node,
      isIconOnly: true
    });
    setupDownloadButtons(ctx, {
      selector: ".soundList__item .sc-button-group",
      getTrackUrl: (node) => {
        const trackItem = node.closest(".soundList__item");
        const el = trackItem?.querySelector("a.soundTitle__title");
        return el?.getAttribute("href") ?? null;
      },
      getButtonParent: (node) => node,
      isIconOnly: true
    });
    setupDownloadButtons(ctx, {
      selector: ".searchItem .sc-button-group",
      getTrackUrl: (node) => {
        const trackItem = node.closest(".searchItem");
        const el = trackItem?.querySelector("a.soundTitle__title");
        return el?.getAttribute("href") ?? null;
      },
      getButtonParent: (node) => node
    });
    setupDownloadButtons(ctx, {
      selector: ".queueItemView__actions",
      getTrackUrl: (node) => {
        const el = node.closest(".queue__itemWrapper")?.querySelector(".queueItemView__title a");
        return el?.getAttribute("href") ?? null;
      },
      getButtonParent: (node) => node,
      isSmall: true,
      isIconOnly: true
    });
    ctx.observer.start(doc.body);
  };

  // src/settingsUi.ts
  var SHOW_SETTINGS_BUTTON = true;
  var options = [
    { key: "download-hq-version", label: "Download high quality version (you need to be a GO+ user)" },
    { key: "download-original-version", label: "Download original version when possible (metadata might not be set)" },
    { key: "normalize-track", label: "Normalize track metadata" },
    { key: "set-metadata", label: "Set track metadata" },
    { key: "include-producers", label: "Include producers as artists" }
  ];
  var css = \`
  :host { all: initial; }
  * { box-sizing: border-box; }

  .fab {
    position: fixed; left: 12px; bottom: 64px; width: 32px; height: 32px;
    border-radius: 50%; border: 0; padding: 0; cursor: pointer;
    background: #ff5419; color: #fff; display: flex; align-items: center; justify-content: center;
    opacity: 0.45; transition: opacity 120ms; z-index: 2147483000;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
  }
  .fab:hover, .fab:focus-visible { opacity: 1; }
  .fab svg { width: 18px; height: 18px; }

  .backdrop {
    position: fixed; inset: 0; background: rgba(0, 0, 0, 0.55); z-index: 2147483001;
    display: none; align-items: center; justify-content: center;
    font: 14px/1.4 -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }
  .backdrop.open { display: flex; }

  .dialog {
    background: #fff; color: #222; width: min(520px, calc(100vw - 32px));
    border-radius: 6px; padding: 20px 22px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  }
  @media (prefers-color-scheme: dark) {
    .dialog { background: #1c1c1c; color: #eee; }
    .hint { color: #999; }
  }

  h2 { margin: 0 0 14px; font-size: 16px; }
  label { display: flex; gap: 10px; align-items: flex-start; padding: 6px 0; cursor: pointer; }
  input[type="checkbox"] { margin-top: 3px; accent-color: #ff5419; }
  .hint { margin-top: 12px; font-size: 12px; color: #666; }
  .actions { margin-top: 18px; display: flex; gap: 8px; justify-content: flex-end; }
  .actions button {
    min-width: 84px; padding: 8px 14px; border: 0; border-radius: 3px; cursor: pointer;
    font: inherit; font-weight: 700; background: #8884; color: inherit;
  }
  .actions button.primary { background: #ff5419; color: #fffefe; }
  .actions button:hover { filter: brightness(1.1); }
\`;
  var sliderIcon = \`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/></svg>\`;
  function mountSettingsUi() {
    const host = document.createElement("div");
    host.setAttribute("data-soundcloud-dl-settings", "");
    const root = host.attachShadow({ mode: "open" });
    root.innerHTML = \`
    <style>\${css}</style>
    \${SHOW_SETTINGS_BUTTON ? \`<button class="fab" type="button" title="SoundCloud Downloader settings" aria-label="SoundCloud Downloader settings">\${sliderIcon}</button>\` : ""}
    <div class="backdrop">
      <form class="dialog" role="dialog" aria-label="SoundCloud Downloader settings">
        <h2>SoundCloud Downloader</h2>
        \${options.map((o) => \`<label><input type="checkbox" data-key="\${o.key}" /><span>\${o.label}</span></label>\`).join("")}
        <div class="hint">Files are saved by your SoundCloud client's normal download handling.</div>
        <div class="actions">
          <button type="button" data-action="close">Close</button>
          <button type="reset">Reset</button>
          <button type="submit" class="primary">Save</button>
        </div>
      </form>
    </div>
  \`;
    const backdrop = root.querySelector(".backdrop");
    const form = root.querySelector("form");
    const inputs = Array.from(root.querySelectorAll("input[data-key]"));
    const restore = () => {
      for (const input of inputs) {
        input.checked = getConfigValue(input.dataset.key);
      }
    };
    const open = () => {
      restore();
      backdrop.classList.add("open");
    };
    const close = () => backdrop.classList.remove("open");
    root.querySelector(".fab")?.addEventListener("click", open);
    root.querySelector("[data-action=close]")?.addEventListener("click", close);
    backdrop.addEventListener("mousedown", (event) => {
      if (event.target === backdrop) close();
    });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      for (const input of inputs) {
        storeConfigValue(input.dataset.key, input.checked);
      }
      close();
    });
    form.addEventListener("reset", (event) => {
      event.preventDefault();
      resetConfig();
      for (const input of inputs) {
        input.checked = configDefaults[input.dataset.key];
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && backdrop.classList.contains("open")) close();
    });
    document.body.appendChild(host);
    return { open, close };
  }

  // src/main.ts
  var logger3 = Logger.create("Plugin");
  var ATTACHED_ATTRIBUTE = "data-soundcloud-dl";
  function attachToWindow(win) {
    let doc;
    try {
      doc = win.document;
      if (!doc?.documentElement || !doc.body) return;
      if (win.location.href.startsWith("about:")) return;
    } catch {
      return;
    }
    if (doc.documentElement.hasAttribute(ATTACHED_ATTRIBUTE)) return;
    doc.documentElement.setAttribute(ATTACHED_ATTRIBUTE, "1.16.0-plugin.1");
    logger3.logDebug("Attaching to frame", win.location.href);
    installRequestHooks(win);
    attachDownloadButtons(win);
    watchIframes(win);
  }
  var watchedIframes = /* @__PURE__ */ new WeakSet();
  function watchIframe(iframe) {
    if (watchedIframes.has(iframe)) return;
    watchedIframes.add(iframe);
    const tryAttach = () => {
      try {
        if (iframe.contentWindow) attachToWindow(iframe.contentWindow);
      } catch {
      }
    };
    iframe.addEventListener("load", tryAttach);
    tryAttach();
  }
  function watchIframes(win) {
    const observer = new DomObserver(win);
    observer.addEvent({ selector: "iframe", callback: (node) => watchIframe(node) });
    win.document.querySelectorAll("iframe").forEach((i) => watchIframe(i));
    observer.start(win.document.body);
  }
  function whenDomReady(callback) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
      window.setTimeout(callback, 0);
    } else {
      document.addEventListener("DOMContentLoaded", callback, { once: true });
    }
  }
  function start() {
    const w = window;
    if (!/(^|\.)soundcloud\.com$/.test(window.location.hostname)) return;
    if (w.SoundCloudDL) return;
    logger3.logInfo("Starting with version: 1.16.0-plugin.1");
    installRequestHooks(window);
    const api = {
      version: "1.16.0-plugin.1",
      openSettings: () => api._settings?.open(),
      closeSettings: () => api._settings?.close(),
      getConfig: () => Object.fromEntries(configKeys.map((k) => [k, getConfigValue(k)])),
      setConfig: (key, value) => storeConfigValue(key, value),
      resetConfig
    };
    w.SoundCloudDL = api;
    whenDomReady(() => {
      attachToWindow(window);
      if (window.top === window) {
        api._settings = mountSettingsUi();
      }
    });
  }
  start();
})();
`
    .replaceAll("\\`", "`")
    .replaceAll("\\${", "${")
};
