module.exports = new Proxy({}, { get: (_t, prop) => (prop === '__esModule' ? false : String(prop)) });
