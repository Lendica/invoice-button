"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/** @license Lendica Invoice Button Web Component v1.0.0
 * Copyright © 2022 Lendica Corp. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Lendica Corp. <info@golendica.com>, January 2022
 */
var template = document.createElement("template");
template.innerHTML = "\n   <style>\n     div {\n       margin-top: 20px;\n     }\n     button {\n         border-radius: 4px;\n         border: none;\n         outline: 0;\n         padding: 4px 8px;\n     }\n     button:hover {\n        cursor: pointer;\n        opacity: 0.8;\n     }\n     .status-default {\n         background: #58A10E;\n         color: #FCFCFD;\n     }\n     .status-processing {\n         background: #F98F34;\n         color: #FCFCFD;\n     }\n     .status-paid {\n         background: #9292A4;\n         color: #FCFCFD;\n     }\n   </style>\n   <button type=\"button\"\n   >\n   </button>\n ";

var InvoiceButton = /*#__PURE__*/function (_HTMLElement) {
  _inherits(InvoiceButton, _HTMLElement);

  var _super = _createSuper(InvoiceButton);

  function InvoiceButton() {
    var _this;

    _classCallCheck(this, InvoiceButton);

    _this = _super.call(this);

    _this.attachShadow({
      mode: "open"
    });

    _this.shadowRoot.appendChild(template.content.cloneNode(true));

    _this.shadowRoot.querySelector("button").disabled = true;
    _this.shadowRoot.querySelector("button").innerText = "Loading...";
    return _this;
  }

  _createClass(InvoiceButton, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this2 = this;

      this.shadowRoot.querySelector("button").onclick = function () {
        window.lendica.open(!_this2.invoice || _this2.invoice && _this2.invoice.activated === false ? null : _this2.getAttribute("invoiceid"));
      };
    }
  }, {
    key: "attributeChangedCallback",
    value: function () {
      var _attributeChangedCallback = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(name, oldValue, newValue) {
        var _this3 = this;

        var invoice, invoiceId;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (name == "invoice") {
                  if (newValue != "undefined") {
                    invoice = JSON.parse(newValue);
                    this.shadowRoot.querySelector("button").disabled = false;

                    if (!invoice || invoice && invoice.activated === false) {
                      this.setContent("Get Paid Now", "status-default");
                    } else {
                      this.display(invoice.status);
                    }
                  } else {
                    this.shadowRoot.querySelector("button").disabled = true;
                    this.shadowRoot.querySelector("button").innerText = "Unavailable";
                  }
                }

                if (name == "invoiceid") {
                  invoiceId = newValue;

                  if (window.lendica) {
                    _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                      var _window$lendica;

                      var cacheEntry;
                      return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              _context.next = 2;
                              return (_window$lendica = window.lendica) === null || _window$lendica === void 0 ? void 0 : _window$lendica.invoices.getById(invoiceId);

                            case 2:
                              cacheEntry = _context.sent;

                              if (!(cacheEntry instanceof Promise)) {
                                _context.next = 11;
                                break;
                              }

                              _context.t0 = _this3;
                              _context.next = 7;
                              return JSON.stringify(cacheEntry);

                            case 7:
                              _context.t1 = _context.sent;

                              _context.t0.setAttribute.call(_context.t0, "invoice", _context.t1);

                              _context.next = 12;
                              break;

                            case 11:
                              _this3.setAttribute("invoice", JSON.stringify(cacheEntry));

                            case 12:
                              return _context.abrupt("return", window.lendica.invoices.onChange(function () {
                                _this3.setAttribute("invoice", JSON.stringify(window.lendica.invoices.getById(_this3.getAttribute("invoiceid"))));
                              }));

                            case 13:
                            case "end":
                              return _context.stop();
                          }
                        }
                      }, _callee);
                    }))();
                  }
                }

                if (name == "callback") {
                  this.shadowRoot.querySelector("button").onclick = this._callback;
                }

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function attributeChangedCallback(_x, _x2, _x3) {
        return _attributeChangedCallback.apply(this, arguments);
      }

      return attributeChangedCallback;
    }()
  }, {
    key: "invoice",
    get: function get() {
      return JSON.parse(this.getAttribute("invoice"));
    },
    set: function set(newVal) {
      this.setAttribute("invoice", JSON.stringify(newVal));
    }
  }, {
    key: "callback",
    get: function get() {
      return this.getAttribute("callback");
    },
    set: function set(newVal) {
      this._callback = newVal;
      this.setAttribute("callback", "callback_present");
    }
  }, {
    key: "invoiceid",
    get: function get() {
      return this.getAttribute("invoiceid");
    },
    set: function set(newVal) {
      this.setAttribute("invoiceid", newVal);
    }
  }, {
    key: "lendicaready",
    get: function get() {
      return this.getAttribute("lendicaready");
    },
    set: function set(newVal) {
      this.setAttribute("invoiceid", this.getAttribute("invoiceid"));
      return this.setAttribute("lendicaready", newVal);
    }
  }, {
    key: "setContent",
    value: function setContent(innerText, className) {
      this.shadowRoot.querySelector("button").innerText = innerText;
      this.shadowRoot.querySelector("button").classList.add(className);
    }
  }, {
    key: "display",
    value: function display(status) {
      switch (status) {
        case 0:
          this.setContent("Get Paid Now", "status-default");
          break;

        case 1:
          this.setContent("Send Reminder", "status-processing");
          break;

        case 2:
          this.setContent("Confirm Delivery", "status-processing");
          break;

        case 3:
          this.setContent("Track Payment", "status-paid");
          break;

        case 4:
          this.setContent("Paid", "status-paid");
          break;

        default:
          this.setContent("Get Paid Now", "status-default");
          break;
      }
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return ["invoiceid", "invoice", "callback", "lendicaready"];
    }
  }]);

  return InvoiceButton;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement));

window.customElements.define("invoice-button", InvoiceButton);