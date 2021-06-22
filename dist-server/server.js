"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _express = _interopRequireWildcard(require("express"));

var _path = require("path");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var app = (0, _express.default)();
var port = 3000;
app.use((0, _express.json)()); //app.use(static(resolve(__dirname, '../public')));

var client_id = process.env.GITHUB_CLIENT_ID;
var client_secret = process.env.GITHUB_CLIENT_SECRET;
console.log({
  client_id: client_id,
  client_secret: client_secret
});
app.get('/', function (req, res) {
  res.sendFile((0, _path.join)(__dirname, '../public/index.html'));
});
app.get('/index.js', function (req, res) {
  res.sendFile((0, _path.join)(__dirname, '../src/index.js'));
});
app.get('/index.css', function (req, res) {
  res.sendFile((0, _path.join)(__dirname, '../src/index.css'));
}); // app.get('/user/signin', (req, res) => {
// })
// app.get('/user/signin/callback', (req, res) => {
// })

app.listen(port, function () {
  console.log("Listening in at http://localhost:".concat(port));
});