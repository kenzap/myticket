
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function () {
  'use strict';

  /**
   * @name initHeader
   * @description Initiates Kenzap Cloud extension header and related scripts. Verifies user sessions, handles SSO, does cloud space navigation, initializes i18n localization. 
   * @param {object} response
   */
  const initHeader = (response) => {

      // cache header from backend
      if(response.header) localStorage.setItem('header', response.header);
    
      // load header to html if not present
      if(!document.querySelector("#k-script")){
    
          let child = document.createElement('div');
          child.innerHTML = localStorage.getItem('header');
          child = child.firstChild;
          document.body.prepend(child);
    
          // run header scripts
          Function(document.querySelector("#k-script").innerHTML).call('test');
      }
    
      // load locales if present
      if(response.locale) window.i18n.init(response.locale); 
  };

  /**
   * @name showLoader
   * @description Initiates full screen three dots loader.
   */
  const showLoader = () => {

      let el = document.querySelector(".loader");
      if (el) el.style.display = 'block';
  };

  /**
   * @name initFooter
   * @description Removes full screen three dots loader.
   * @param {string} left - Text or html code to be present on the left bottom side of screen
   * @param {string} right - Text or html code to be present on the left bottom side of screen
   */
  const initFooter = (left, right) => {

      document.querySelector("footer .row").innerHTML = `
    <div class="d-sm-flex justify-content-center justify-content-sm-between">
        <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">${left}</span>
        <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center text-muted">${right}</span>
    </div>`;
  };

  /**
   * @name link
   * @description Handles Cloud navigation links between extensions and its pages. Takes care of custom url parameters.
   * @param {string} slug - Any inbound link
   * 
   * @returns {string} link - Returns original link with kenzp cloud space ID identifier.
   */
  const link = (slug) => {
      
      let urlParams = new URLSearchParams(window.location.search);
      let sid = urlParams.get('sid') ? urlParams.get('sid') : "";

      let postfix = slug.indexOf('?') == -1 ? '?sid='+sid : '&sid='+sid;

      return slug + postfix;
  };

  /**
   * @name getSiteId
   * @description Gets current Kenzap Cloud space ID identifier from the URL.
   * 
   * @returns {string} id - Kenzap Cloud space ID.
   */
  const getSiteId = () => {
      
      let urlParams = new URLSearchParams(window.location.search);
      let id = urlParams.get('sid') ? urlParams.get('sid') : "";

      return id;
  };

  /**
   * @name getCookie
   * @description Read cookie by its name.
   * @param {string} cname - Cookie name.
   * 
   * @returns {string} value - Cookie value.
   */
  const getCookie = (cname) => {

      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for (let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
              c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
          }
      }
      return "";
  };

  /**
   * @name parseApiError
   * @description Set default logics for different API Error responses.
   * @param {object} object - API response.
   */
  const parseApiError = (data) => {
   
      switch(data.code){

          // unauthorized
          case 401:

              // dev mode
              if(window.location.href.indexOf('localhost')){ 

                  alert(data.reason); 
                  return; 
              }

              // production mode
              location.href="https://auth.kenzap.com/?app=65432108792785&redirect="+window.location.href; break;
          
          // something else
          default:

              alert(data.reason); 
              break;
      }
  };

  /**
   * @name initBreadcrumbs
   * @description Render ui breadcrumbs.
   * @param {array} data - List of link objects containing link text and url. If url is missing then renders breadcrumb as static text. Requires html holder with .bc class.
   */
  const initBreadcrumbs = (data) => {

      let html = '<ol class="breadcrumb mt-2 mb-0">';
      for(let bc of data){
          
          if(typeof(bc.link) === 'undefined'){

              html += `<li class="breadcrumb-item">${ bc.text }</li>`;
          }else {

              html += `<li class="breadcrumb-item"><a href="${ bc.link }">${ bc.text }</a></li>`;
          }
      }
      html += '</ol>';
      
      document.querySelector(".bc").innerHTML = html;
  };

  /**
   * @name onClick
   * @description One row click event listener declaration. Works with one or many HTML selectors.
   * @param {string} sel - HTML selector, id, class, etc.
   * @param {string} fn - callback function fired on click event.
   */
  const onClick = (sel, fn) => {

      if(document.querySelector(sel)) for( let e of document.querySelectorAll(sel) ){

          e.removeEventListener('click', fn, true);
          e.addEventListener('click', fn, true);
      }
  };

  /**
   * @name loadScript
   * @description Asynchronous script loader function.
   * @param {string} url - HTML selector, id, class, etc.
   * @param {string} cb - callback function fired immediately after script is loaded.
   */
   const loadScript = (url, cb) => {

      if (!Array.from(document.querySelectorAll('script')).some(elm => elm.src == url)) {
        let script = document.createElement('script');
        script.onload = cb;
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
      }
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  var HTMLContent = function HTMLContent(__) {
    return "\n\n        <!-- seat mapping overlay controls -->\n        <div id=\"seat_mapping\">\n            <div id=\"reset_zone\" class=\"seat_head\" style=\"\"><span id=\"reset_zone_btn\">Reset</span></div>\n            <div id=\"top_toolbar\">\n                <div id=\"seat_mapping_close\">\xD7</div>\n                <div id=\"seat_size\" class=\"seat_head\">Seat Size:</div>\n                <div id=\"ul-slider-5\" class=\"ul-slider slider-success\"></div>\n                <div id=\"seat_notice\" class=\"seat_head\" style=\"margin-left: 350px;\">Click on seat to drag it to a desired location.</div>\n                <div id=\"seat_row\" class=\"seat_head\">Seat Row: <input id=\"seat_row_in\" autocomplete=\"off\" type=\"text\" maxlength=\"6\" class=\"form-control-sm\" placeholder=\"-\" ></div>\n                <div id=\"seat_text\" class=\"seat_head\">Seat Number: <input id=\"seat_text_in\" autocomplete=\"off\" type=\"text\" maxlength=\"6\" class=\"form-control-sm\" placeholder=\"-\" ></div>\n                <div id=\"seat_price\" class=\"seat_head\">Seat Price: <input id=\"seat_price_in\" autocomplete=\"off\" type=\"text\" maxlength=\"12\" class=\"form-control-sm\" placeholder=\"-\" ></div>\n                <div id=\"seat_text_vis\" class=\"seat_head\">\n                <div class=\"checkbox\" >\n                    <input type=\"checkbox\" id=\"seat_text_vis_cb\" class=\"checkbox__input\">\n                    <label for=\"seat_text_vis_cb\" class=\"checkbox__label\">View Seat Numbers</label>\n                </div>\n                </div>\n            </div>\n\n            <div id=\"svg_mapping_cont\">\n                <img id=\"img_section\" src=\"\" alt=\"section preview\" >\n                <svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.2\" baseProfile=\"tiny\" id=\"svg_mapping\"> </svg>\n            </div>\n\n            <div style=\"width:0%;height:100%;float:right;overflow-y:scroll;padding:20px;display: none;\">\n                <ul id=\"svg_seats\"> </ul>\n            </div>\n\n        </div>\n        \n        <div class=\"container p-edit\">\n            <div class=\"d-flex justify-content-between bd-highlight mb-3\">\n                <nav class=\"bc\" aria-label=\"breadcrumb\"></nav>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-lg-12 grid-margin stretch-card\">\n                    <div class=\"card border-white shadow-sm\">\n                        <div class=\"card-body\">\n                            <div id=\"wrapper\">\n                                <header id=\"header\">\n                                    <nav id=\"nav\" class=\"clearfix\">\n                                        <div class=\"btn-group\" role=\"group\" aria-label=\"Basic example\">\n                                            <button id=\"polygon\" type=\"button\" class=\"btn btna btn-outline-primary\">".concat(__('draw'), "</button>\n                                            <button id=\"edit\" type=\"button\" class=\"btn btna btn-outline-primary\">").concat(__('edit'), "</button>\n                                            <button id=\"seats\" type=\"button\" class=\"btn btna btn-outline-primary\">").concat(__('seats'), "</button>\n                                            <button id=\"save\" type=\"button\" class=\"btn btna btn-outline-primary\">").concat(__('save'), "</button>\n                                            <button id=\"new_image\" type=\"button\" class=\"btn btna btn-outline-primary\">").concat(__('image'), "</button>\n                                            <button id=\"export\" type=\"button\" class=\"btn btn-outline-primary\">").concat(__('export'), "</button>\n                                            <div class=\"more input-group dropdown\">\n                                                <button id=\"more\" type=\"button\" class=\"btn btn-outline-primary\" data-bs-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-three-dots-vertical\" viewBox=\"0 0 16 16\">\n                                                <path d=\"M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z\"/></svg></button>\n                                                <div class=\"dropdown-menu\">\n                                                    <a class=\"dropdown-item\" target=\"_blank\" href=\"https://kenzap.com/seat-reservation-in-wordpress-setup-service-1014779/\">").concat(__('Integration service'), "</a>\n                                                    <a class=\"dropdown-item\" target=\"_blank\" href=\"https://kenzap.blog/how-to-create-custom-concert-hall-in-wordpress-with-seat-reservation/\">").concat(__('Free tutorial'), "</a>\n                                                    <a class=\"dropdown-item\" target=\"_blank\" href=\"#\" data-bs-toggle=\"modal\" data-bs-target=\"#kenzap_import\">").concat(__('Import layout'), "</a>\n                                                    <a id=\"stats_btn\" class=\"dropdown-item\" target=\"_blank\" href=\"#\" data-bs-toggle=\"modal\" style=\"\" data-bs-target=\"#kenzap_stats\">").concat(__('Layout stats'), "</a>\n                                                    <div role=\"separator\" class=\"dropdown-divider\"></div>\n                                                    <a class=\"dropdown-item\" target=\"_blank\" href=\"https://kenzap.com/myticket-events-plugin/\">").concat(__('Community'), "</a>\n                                                </div>\n                                            </div>\n                                        </div>\n\n                                    </nav>\n                                    <div id=\"coords\"></div>\n                                    <div id=\"debug\"></div>\n                                </header>\n                                <div id=\"image_wrapper\">\n                                    <div id=\"image\">\n                                    <img src=\"\" alt=\"#\" id=\"img\" style=\"max-width:1052px\" />\n                                    <svg xmlns=\"http://www.w3.org/2000/svg\" style=\"max-width:1052px\" version=\"1.2\" baseProfile=\"tiny\" id=\"svg\"></svg>\n                                    </div>\n                                </div>\n                            </div>\n\n                            <div id=\"get_image_wrapper\">\n                                <div id=\"get_image\">\n                                    <span title=\"close\" class=\"close_button\"></span>\n                                    <div id=\"loading\">").concat(__('Loading'), "</div>\n                                    <div id=\"file_reader_support\">\n                                        <label>").concat(__('Drag an image of your layout below'), "</label>\n                                        <div id=\"dropzone\">\n                                            <span class=\"clear_button\" title=\"clear\">x</span>\n                                            <img src=\"\" alt=\"preview\" id=\"sm_img\" />\n                                        </div>\n                                    </div>\n\n                                    <button id=\"button\" type=\"button\" style=\"margin-top:50px;\" class=\"btn btn-outline-success \">").concat(__('Upload This Layout'), "</button>\n\n                                    <div style=\"display: none;\">\n                                        <label for=\"url\">type a url</label>\n                                        <span id=\"url_wrapper\">\n                                            <span class=\"clear_button\" title=\"clear\">x</span>\n                                            <input type=\"text\" id=\"url\" />\n                                        </span>\n                                        <button id=\"button\">").concat(__('OK'), "</button>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <!-- For html image map code -->\n        <div id=\"code\">\n          <span class=\"close_button\" title=\"close\"></span>\n          <div id=\"code_content\"></div>\n        </div>\n\n        <!-- Edit details block -->\n        <form id=\"edit_details\">\n          <h5>Attributes</h5>\n          <span class=\"close_button\" title=\"close\"></span>\n          <p>\n            <label for=\"href_attr\">href</label>\n            <input type=\"text\" id=\"href_attr\" />\n          </p>\n          <p>\n            <label for=\"alt_attr\">alt</label>\n            <input type=\"text\" id=\"alt_attr\" />\n          </p>\n          <p>\n            <label for=\"title_attr\">title</label>\n            <input type=\"text\" id=\"title_attr\" />\n          </p>\n          <button id=\"save_details\">Save</button>\n        </form>\n\n        <!-- From html block -->\n        <div id=\"from_html_wrapper\">\n          <form id=\"from_html_form\">\n            <h5>Loading areas</h5>\n            <span class=\"close_button\" title=\"close\"></span>\n            <p>\n              <label for=\"code_input\">Enter your html code:</label>\n              <textarea id=\"code_input\"></textarea>\n            </p>\n            <button id=\"load_code_button\">Load</button>\n          </form>\n        </div>\n\n\n\n\n\n        <div id=\"kenzap_seat_map\" class=\"modal\">\n            <div class=\"modal-dialog\" role=\"document\">\n                <!-- Modal content -->\n                <div class=\"modal-content\">\n        \n                    <div class=\"modal-header\">\n                        <h5 class=\"modal-title\">").concat(__('Zone Settings'), "</h5>\n                        <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n                    </div>\n        \n                    <div class=\"modal-body\">\n                        <div class=\"form-cont\">\n                        \n                            <div class=\"form-group mb-3\">\n                                <label for=\"zone_title\" class=\"form-label\">").concat(__('Zone label'), "</label>\n                                <input type=\"text\" class=\"form-control\" id=\"zone_title\" autocomplete=\"off\" placeholder=\"A2 or 1001\">\n                            </div>\n                \n                            <div class=\"form-group mb-3\">\n                                <label for=\"zone_tws\" class=\"form-label\">").concat(__('Number of tickets with seat reservation'), "</label>\n                                <input type=\"number\" class=\"form-control\" id=\"zone_tws\" autocomplete=\"off\" placeholder=\"0\" value=\"0\">\n                            </div>\n                \n                            <div class=\"form-group mb-3\">\n                                <label for=\"zone_tns\" class=\"form-label\">").concat(__('Number of tickets without seat reservation'), "</label>\n                                <input type=\"number\" class=\"form-control\" id=\"zone_tns\" autocomplete=\"off\" placeholder=\"0\" value=\"0\">\n                            </div>\n                \n                            <div class=\"form-group mb-3\">\n                                <label for=\"zone_price\" class=\"form-label\">").concat(__('Default ticket price for entire zone'), "</label>\n                                <input type=\"number\" class=\"form-control\" id=\"zone_price\" autocomplete=\"off\" placeholder=\"0\" value=\"0\">\n                            </div>\n                \n                            <div class=\"form-price-custom\">\n                \n                            </div>\n                \n                            <p class=\"form-link mb-1\" style=\"text-align:right;\"><a id=\"zone_add_price\" href=\"#\" data-attached=\"false\">add price variation</a><a href=\"https://kenzap.blog/how-to-create-custom-concert-hall-in-wordpress-with-seat-reservation/#pricing\" target=\"_blank\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-info mb-2\" viewBox=\"0 0 16 16\">\n                                <path d=\"m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z\"/>\n                                </svg></a>\n                            </p>\n                \n                \n                            <div class=\"form-group mb-3\">\n                                <label for=\"zone_bg\">").concat(__('Zone background (optional)'), "</label>\n                                <div>\n                                <img id=\"zone_bg\" src=\"https://cdn.kenzap.com/loading.png\" />\n                                <input type=\"hidden\" id=\"zone_bgi\" value=\"\">\n                                <input type=\"file\" name=\"img[]\" class=\"dn bg-file\" style=\"display:none;\">\n                                <span class=\"remove\" title=\"Remove\">\xD7</span>\n                                </div>\n                            </div>\n                \n                            <div class=\"form-group-custom\">\n                \n                            </div>\n                \n                            <p class=\"form-link\" style=\"text-align:right;\">\n                                <a id=\"zone_add_field\" href=\"#\" data-attached=\"false\">").concat(__('add custom field'), "</a>\n                                <a href=\"https://kenzap.blog/how-to-customize-pdf-ticket-with-myticket-events-plugin/#extension-fields\" target=\"_blank\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-info mb-2\" viewBox=\"0 0 16 16\">\n                                    <path d=\"m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z\"/>\n                                    </svg>\n                                </a>\n                            </p>\n                        \n                        </div>\n                    </div>\n                    \n                    <div class=\"modal-footer\">\n                        <button id=\"saveSeatMap\" type=\"button\" class=\"btn btn-primary btn-modal\" data-bs-dismiss=\"modal\">").concat(__('Continue'), "</button>\n                        <button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\">").concat(__('Cancel'), "</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    \n    \n        <div id=\"kenzap_export\" class=\"modal\">\n            <div class=\"modal-dialog\" role=\"document\">\n                <!-- Modal content -->\n                <div class=\"modal-content\">\n        \n                    <div class=\"modal-header\">\n                        <h5 class=\"modal-title\">").concat(__('Export Layout'), "</h5>\n                        <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n                    </div>\n        \n                    <div class=\"modal-body\">\n        \n                        <textarea class=\"form-control\" id=\"exportTextArea\" rows=\"4\"></textarea>\n            \n                        <ol class=\"mt-2\" >\n                            <li>").concat(__('Copy layout data above'), "</li>\n                            <li>Install <b><a target=\"_blank\" href=\"https://wordpress.org/plugins/myticket-events/\" target=\"_blank\">MyTicket Events</a> </b> plugin</li>\n                            <li>").concat(__('Add <b>MyTicket Hall</b> block to your website'), "</li>\n                            <li>").concat(__('Paste the code under Layout / Seat Code in the right pane'), "</li>\n                            <li>").concat(__('For large layout imports refer to <b><a target="_blank" href="https://kenzap.blog/importing-layouts-with-5000-seats-myticket-events-plugin/">this guide</a></b>'), "</li>\n                        </ol>\n            \n                        <p style=\"font-size:10pt;margin-top:20px;font-style: italic;\">").concat(__('Need help in designing your hall or stadium layout? <a target="_blank" href="https://kenzap.com/seat-reservation-in-wordpress-setup-service-1014779/">Contact support</a>.'), "</p>\n                    </div>\n        \n                    <div class=\"modal-footer\">\n                        <button type=\"button\" class=\"btn btn-success\" data-bs-dismiss=\"modal\">").concat(__('Done'), "</button>\n                        <button type=\"button\" class=\"btn btn-outline-dark btn-fw\" data-bs-dismiss=\"modal\">").concat(__('Cancel'), "</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    \n\n        <div id=\"kenzap_import\" class=\"modal\">\n            <div class=\"modal-dialog\" role=\"document\">\n                <!-- Modal content -->\n                <div class=\"modal-content\">\n        \n                    <div class=\"modal-header\">\n                        <h5 class=\"modal-title\" id=\"ModalLabel\">").concat(__('Import Layout'), "</h5>\n                        <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n                    </div>\n        \n                    <div class=\"modal-body\">\n        \n                        <textarea class=\"form-control\" id=\"importTextArea\" rows=\"4\"></textarea>\n            \n                        <ol class=\"mt-4\">\n                            <li>1. Backup current layout (make a copy)</li>\n                            <li>2. Verify JSON data is valid</li>\n                            <li>3. Paste your existing layout here</li>\n                        </ol>\n            \n                        <p class=\"text-danger\" style=\"font-size:10pt;margin-top:20px;font-style: italic;\">Warning. Wrong JSON structure may break current layout.</p>\n                    </div>\n        \n                    <div class=\"modal-footer\">\n                        <button id=\"import\" type=\"button\" class=\"btn btn-success\" data-bs-dismiss=\"modal\">").concat(__('Import'), "</button>\n                        <button type=\"button\" class=\"btn btn-outline-dark btn-fw\" data-bs-dismiss=\"modal\">").concat(__('Cancel'), "</button>\n                    </div>\n                </div>\n            </div> \n        </div>\n    \n\n        <div id=\"kenzap_stats\" class=\"modal\">\n            <div class=\"modal-dialog\" role=\"document\">\n                <!-- Modal content -->\n                <div class=\"modal-content\">\n        \n                    <div class=\"modal-header\">\n                        <h5 class=\"modal-title\" id=\"ModalLabel\">").concat(__('Layout Stats'), "</h5>\n                        <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n                    </div>\n        \n                    <div id=\"stats-body\" class=\"modal-body\">\n        \n        \n                    </div>\n                </div>\n            </div>\n        </div>\n\n\n        <div class=\"modal\" tabindex=\"-1\">\n            <div class=\"modal-dialog\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                        <h5 class=\"modal-title\"></h5>\n                        <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n                    </div>\n                    <div class=\"modal-body\">\n\n                    </div>\n                    <div class=\"modal-footer\">\n                        <button type=\"button\" class=\"btn btn-primary btn-modal\"></button>\n                        <button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\"></button>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"toast-cont position-fixed bottom-0 p-2 m-4 end-0 align-items-center\">\n            <div class=\"toast hide align-items-center text-white bg-dark border-0\" role=\"alert\" aria-live=\"assertive\" aria-atomic=\"true\" data-bs-delay=\"3000\">\n                <div class=\"d-flex\">\n                    <div class=\"toast-body\"></div>\n                    <button type=\"button\" class=\"btn-close btn-close-white me-2 m-auto\" data-bs-dismiss=\"toast\" aria-label=\"Close\"></button>\n                </div>\n            </div>\n        </div>\n        \n    ");
  };

  var hideLoader = function hideLoader() {
    var el = document.querySelector(".loader");
    if (el) el.style.display = 'none';
  };

  var Utils = _createClass(function Utils(_app) {
    _classCallCheck(this, Utils);

    _defineProperty(this, "CLASS_NAMES", {
      SELECTED: 'selected',
      WITH_HREF: 'with_href'
    });

    _defineProperty(this, "getOffset", function (node) {
      var boxCoords = node.getBoundingClientRect();
      return {
        x: Math.round(boxCoords.left + window.pageXOffset),
        y: Math.round(boxCoords.top + window.pageYOffset)
      };
    });

    _defineProperty(this, "getRightCoords", function (x, y) {
      return {
        x: x - app.getOffset('x'),
        y: y - app.getOffset('y')
      };
    });

    _defineProperty(this, "getOffset", function (arg) {
      switch (arg) {
        case 'x':
        case 'y':
          return state.offset[arg];
      }
    });

    _defineProperty(this, "id", function (str) {
      return document.getElementById(str);
    });

    _defineProperty(this, "hide", function (node) {
      node.style.display = 'none';
      return this;
    });

    _defineProperty(this, "show", function (node) {
      node.style.display = 'block';
      return this;
    });

    _defineProperty(this, "encode", function (str) {
      return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    });

    _defineProperty(this, "foreach", function (arr, func) {
      for (var i = 0, count = arr.length; i < count; i++) {
        func(arr[i], i);
      }
    });

    _defineProperty(this, "foreachReverse", function (arr, func) {
      for (var i = arr.length - 1; i >= 0; i--) {
        func(arr[i], i);
      }
    });

    _defineProperty(this, "debug", function () {
      var output = document.getElementById('debug');
      return function () {
        output.innerHTML = [].join.call(arguments, ' ');
      };
    }());

    _defineProperty(this, "stopEvent", function (e) {
      e.stopPropagation();
      e.preventDefault();
      return this;
    });

    _defineProperty(this, "getUrlParameter", function (sParam) {
      var sPageURL = window.location.search.substring(1),
          sURLVariables = sPageURL.split('&'),
          sParameterName,
          i;

      for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
          return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
      }
    });

    _defineProperty(this, "getCookie", function (cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');

      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];

        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }

        if (c.indexOf(name) == 0) {
          return unescape(c.substring(name.length, c.length));
        }
      }

      return "";
    });

    _defineProperty(this, "extend", function (obj, options) {
      var target = {};

      for (var name in obj) {
        if (obj.hasOwnProperty(name)) {
          target[name] = options[name] ? options[name] : obj[name];
        }
      }

      return target;
    });

    _defineProperty(this, "genID", function (len) {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < len; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }

      return text;
    });

    _defineProperty(this, "inherits", function () {
      var F = function F() {};

      return function (Child, Parent) {
        F.prototype = Parent.prototype;
        Child.prototype = new F();
        Child.prototype.constructor = Child;
      };
    }());

    this._app = _app;
  });

  var Area$1 = _createClass(function Area(_type, app, _coords, _seats, _attributes) {
    _classCallCheck(this, Area);

    _defineProperty(this, "ABSTRACT_METHOD", function () {
      throw new Error('This is abstract method');
    });

    _defineProperty(this, "redraw", function (coords) {
      this.setSVGCoords(coords ? coords : this._coords);
      return this;
    });

    _defineProperty(this, "remove", function () {
      this._app.removeNodeFromSvg(this._groupEl);
    });

    _defineProperty(this, "move", function (dx, dy) {
      this.setCoords(this.edit('move', dx, dy)).redraw();
      return this;
    });

    _defineProperty(this, "rotate", function (dx, dy) {
      this.setCoords(this.edit('move', dx, dy)).redraw();
      return this;
    });

    _defineProperty(this, "newID", function () {
      this._attributes.id = this.utils.genID(6);
      this.redraw();
      return this;
    });

    _defineProperty(this, "select", function () {
      this._el.classList.add(Area.CLASS_NAMES.SELECTED);

      return this;
    });

    _defineProperty(this, "deselect", function () {
      this._el.classList.remove(Area.CLASS_NAMES.SELECTED);

      return this;
    });

    _defineProperty(this, "setStyleOfElementWithHref", function () {
      this._el.classList.add(Area.CLASS_NAMES.WITH_HREF);

      return this;
    });

    _defineProperty(this, "unsetStyleOfElementWithHref", function () {
      this._el.classList.remove(Area.CLASS_NAMES.WITH_HREF);

      return this;
    });

    _defineProperty(this, "setInfoAttributes", function (attributes) {
      this._attributes.id = attributes.id;
      this._attributes.href = attributes.href;
      this._attributes.alt = attributes.alt;
      this._attributes.title = attributes.title;
    });

    _defineProperty(this, "toJSON", function () {
      return {
        type: this._type,
        title: this._title,
        seats: this._seats,
        coords: this._coords,
        attributes: this._attributes
      };
    });

    _defineProperty(this, "createAreasFromHTMLOfMap", function (htmlStr) {
      if (!htmlStr) {
        return false;
      }

      while (true) {
        var findedResult = Area.REGEXP.AREA.exec(htmlStr);

        if (!findedResult) {
          break;
        }

        var htmlAreaFinded = findedResult[0],
            type = findedResult[1],
            coords = findedResult[2].split(Area.REGEXP.DELIMETER),
            attributes = {};
        Area.ATTRIBUTES_NAMES.forEach(function (item, i) {
          var result = Area.REGEXP[item].exec(htmlAreaFinded);

          if (result) {
            attributes[name] = result[1];
          }
        });
        coords = coords.map(function (item) {
          return Number(item);
        });
        type = Area.HTML_NAMES_TO_AREA_NAMES[type];
        Area.fromJSON(this._app, {
          type: type,
          coords: Area.CONSTRUCTORS[type].getCoordsFromHTMLArray(coords),
          seats: seats,
          attributes: attributes
        });
      }

      return Boolean(htmlAreaFinded);
    });

    if (this.constructor === Area) {
      throw new Error('This is abstract class');
    }

    this.utils = new Utils(app);
    Area.CONSTRUCTORS[_type] = this;
    this._type = _type;
    this._app = app;
    this._seats = _seats;
    this._attributes = {
      id: this.utils.genID(6),
      href: '',
      points: []
    };
    this._groupEl = document.createElementNS(Area.SVG_NS, 'g');

    if (_attributes) {
      this.setInfoAttributes(_attributes);
      this._groupEl.dataset.id = _attributes.id;
    } else {
      this.setInfoAttributes(this._attributes);
      this._groupEl.dataset.id = this._attributes.id;
    }

    this._coords = _coords;

    this._app.addNodeToSvg(this._groupEl);

    this._groupEl.obj = this;
    this._el = null;
    this._helpers = {};

    this._app.addObject(this);
  });

  _defineProperty(Area$1, "SVG_NS", 'http://www.w3.org/2000/svg');

  _defineProperty(Area$1, "CLASS_NAMES", {
    SELECTED: 'selected',
    WITH_HREF: 'with_href'
  });

  _defineProperty(Area$1, "CONSTRUCTORS", {});

  _defineProperty(Area$1, "REGEXP", {
    AREA: /<area(?=.*? shape="(rect|circle|poly)")(?=.*? coords="([\d ,]+?)")[\s\S]*?>/gmi,
    HREF: / href="([\S\s]+?)"/,
    ALT: / alt="([\S\s]+?)"/,
    TITLE: / title="([\S\s]+?)"/,
    DELIMETER: / ?, ?/
  });

  _defineProperty(Area$1, "HTML_NAMES_TO_AREA_NAMES", {
    rect: 'rectangle',
    circle: 'circle',
    poly: 'polygon'
  });

  _defineProperty(Area$1, "ATTRIBUTES_NAMES", ['ID', 'HREF', 'ALT', 'TITLE']);

  _defineProperty(Area$1, "fromJSON", function (app, params) {
    return app.fromJSONArea(params);
  });

  _defineProperty(Area$1, "genID", function (len) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < len; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  });

  var Helper = _createClass(function Helper(node, _x, _y, action) {
    _classCallCheck(this, Helper);

    _defineProperty(this, "setCoords", function (x, y) {
      this._el.setAttribute('x', x + Helper.OFFSET);

      this._el.setAttribute('y', y + Helper.OFFSET);

      return this;
    });

    _defineProperty(this, "setId", function (id) {
      this._el.n = id;
      return this;
    });

    this._el = document.createElementNS(Area$1.SVG_NS, 'rect');

    this._el.classList.add(Helper.CLASS_NAME);

    this._el.setAttribute('height', Helper.SIZE);

    this._el.setAttribute('width', Helper.SIZE);

    this._el.setAttribute('x', _x + Helper.OFFSET);

    this._el.setAttribute('y', _y + Helper.OFFSET);

    node.appendChild(this._el);
    this._el.action = action;

    this._el.classList.add(Helper.ACTIONS_TO_CURSORS[action]);
  });

  _defineProperty(Helper, "SIZE", 6);

  _defineProperty(Helper, "OFFSET", -Math.ceil(Helper.SIZE / 2));

  _defineProperty(Helper, "CLASS_NAME", 'helper');

  _defineProperty(Helper, "ACTIONS_TO_CURSORS", {
    'move': 'move',
    'editLeft': 'e-resize',
    'editRight': 'w-resize',
    'editTop': 'n-resize',
    'editBottom': 's-resize',
    'editTopLeft': 'nw-resize',
    'editTopRight': 'ne-resize',
    'editBottomLeft': 'sw-resize',
    'editBottomRight': 'se-resize',
    'movePoint': 'pointer'
  });

  var Rectangle = function (_Area) {
    _inherits(Rectangle, _Area);

    var _super = _createSuper(Rectangle);

    function Rectangle(_app, _coords, seats, attributes) {
      var _this;

      _classCallCheck(this, Rectangle);

      _this = _super.call(this, 'rectangle', _app, _coords, seats, attributes);

      _defineProperty(_assertThisInitialized(_this), "setSVGCoords", function (coords) {
        this._el.setAttribute('x', coords.x);

        this._el.setAttribute('y', coords.y);

        this._el.setAttribute('width', coords.width);

        this._el.setAttribute('height', coords.height);

        var top = coords.y,
            center_y = coords.y + coords.height / 2,
            bottom = coords.y + coords.height,
            left = coords.x,
            center_x = coords.x + coords.width / 2,
            right = coords.x + coords.width;

        this._helpers.center.setCoords(center_x, center_y);

        this._helpers.top.setCoords(center_x, top);

        this._helpers.bottom.setCoords(center_x, bottom);

        this._helpers.left.setCoords(left, center_y);

        this._helpers.right.setCoords(right, center_y);

        this._helpers.topLeft.setCoords(left, top);

        this._helpers.topRight.setCoords(right, top);

        this._helpers.bottomLeft.setCoords(left, bottom);

        this._helpers.bottomRight.setCoords(right, bottom);

        return this;
      });

      _defineProperty(_assertThisInitialized(_this), "setCoords", function (coords) {
        this._coords.x = coords.x;
        this._coords.y = coords.y;
        this._coords.width = coords.width;
        this._coords.height = coords.height;
        return this;
      });

      _defineProperty(_assertThisInitialized(_this), "dynamicDraw", function (x, y, isSquare) {
        var newCoords = {
          x: this._coords.x,
          y: this._coords.y,
          width: x - this._coords.x,
          height: y - this._coords.y
        };

        if (isSquare) {
          newCoords = this.getSquareCoords(newCoords);
        }

        newCoords = this.getNormalizedCoords(newCoords);
        this.redraw(newCoords);
        return newCoords;
      });

      _defineProperty(_assertThisInitialized(_this), "onProcessDrawing", function (e) {
        var coords = utils.getRightCoords(e.pageX, e.pageY);
        this.dynamicDraw(coords.x, coords.y, e.shiftKey);
      });

      _defineProperty(_assertThisInitialized(_this), "onStopDrawing", function (e) {
        var coords = utils.getRightCoords(e.pageX, e.pageY);
        this.setCoords(this.dynamicDraw(coords.x, coords.y, e.shiftKey)).deselect();
        app.removeAllEvents().setIsDraw(false).resetNewArea();
      });

      _defineProperty(_assertThisInitialized(_this), "edit", function (editingType, dx, dy) {
        var tempParams = Object.create(this._coords);

        switch (editingType) {
          case 'move':
            tempParams.x += dx;
            tempParams.y += dy;
            break;

          case 'editLeft':
            tempParams.x += dx;
            tempParams.width -= dx;
            break;

          case 'editRight':
            tempParams.width += dx;
            break;

          case 'editTop':
            tempParams.y += dy;
            tempParams.height -= dy;
            break;

          case 'editBottom':
            tempParams.height += dy;
            break;

          case 'editTopLeft':
            tempParams.x += dx;
            tempParams.y += dy;
            tempParams.width -= dx;
            tempParams.height -= dy;
            break;

          case 'editTopRight':
            tempParams.y += dy;
            tempParams.width += dx;
            tempParams.height -= dy;
            break;

          case 'editBottomLeft':
            tempParams.x += dx;
            tempParams.width -= dx;
            tempParams.height += dy;
            break;

          case 'editBottomRight':
            tempParams.width += dx;
            tempParams.height += dy;
            break;
        }

        return tempParams;
      });

      _defineProperty(_assertThisInitialized(_this), "dynamicEdit", function (coords, saveProportions) {
        coords = this.getNormalizedCoords(coords);

        if (saveProportions) {
          coords = this.getSavedProportionsCoords(coords);
        }

        this.redraw(coords);
        return coords;
      });

      _defineProperty(_assertThisInitialized(_this), "onProcessEditing", function (e) {
        return this.dynamicEdit(this.edit(app.getEditType(), e.pageX - this.editingStartPoint.x, e.pageY - this.editingStartPoint.y), e.shiftKey);
      });

      _defineProperty(_assertThisInitialized(_this), "onStopEditing", function (e) {
        this.setCoords(this.onProcessEditing(e));
        app.removeAllEvents();
      });

      _defineProperty(_assertThisInitialized(_this), "toString", function () {
        return 'Rectangle {x: ' + this._coords.x + ', y: ' + this._coords.y + ', width: ' + this._coords.width + ', height: ' + this._coords.height + '}';
      });

      _defineProperty(_assertThisInitialized(_this), "toHTMLMapElementString", function () {
        var x2 = this._coords.x + this._coords.width,
            y2 = this._coords.y + this._coords.height;
        return '<area shape="rect" coords="' + this._coords.x + ', ' + this._coords.y + ', ' + x2 + ', ' + y2 + '"' + (this._attributes.href ? ' href="' + this._attributes.href + '"' : '') + (this._attributes.alt ? ' alt="' + this._attributes.alt + '"' : '') + (this._attributes.title ? ' title="' + this._attributes.title + '"' : '') + ' />';
      });

      _defineProperty(_assertThisInitialized(_this), "getCoordsForDisplayingInfo", function () {
        return {
          x: this._coords.x,
          y: this._coords.y
        };
      });

      _defineProperty(_assertThisInitialized(_this), "testCoords", function (coords) {
        return coords.x && coords.y && coords.width && coords.height;
      });

      _defineProperty(_assertThisInitialized(_this), "testHTMLCoords", function (coords) {
        return coords.length === 4;
      });

      _defineProperty(_assertThisInitialized(_this), "getCoordsFromHTMLArray", function (htmlCoordsArray) {
        if (!this.testHTMLCoords(htmlCoordsArray)) {
          throw new Error('This html-coordinates is not valid for rectangle');
        }

        return {
          x: htmlCoordsArray[0],
          y: htmlCoordsArray[1],
          width: htmlCoordsArray[2] - htmlCoordsArray[0],
          height: htmlCoordsArray[3] - htmlCoordsArray[1]
        };
      });

      _defineProperty(_assertThisInitialized(_this), "getNormalizedCoords", function (coords) {
        if (coords.width < 0) {
          coords.x += coords.width;
          coords.width = Math.abs(coords.width);
        }

        if (coords.height < 0) {
          coords.y += coords.height;
          coords.height = Math.abs(coords.height);
        }

        return coords;
      });

      _defineProperty(_assertThisInitialized(_this), "getSquareCoords", function (coords) {
        var width = Math.abs(coords.width),
            height = Math.abs(coords.height);

        if (width > height) {
          coords.width = coords.width > 0 ? height : -height;
        } else {
          coords.height = coords.height > 0 ? width : -width;
        }

        return coords;
      });

      _defineProperty(_assertThisInitialized(_this), "getSavedProportionsCoords", function (coords, originalCoords) {
        var originalProportions = coords.width / coords.height,
            currentProportions = originalCoords.width / originalCoords.height;

        if (currentProportions > originalProportions) {
          coords.width = Math.round(coords.height * originalProportions);
        } else {
          coords.height = Math.round(coords.width / originalProportions);
        }

        return coords;
      });

      _defineProperty(_assertThisInitialized(_this), "createAndStartDrawing", function (firstPointCoords) {
        var newArea = new Rectangle({
          x: firstPointCoords.x,
          y: firstPointCoords.y,
          width: 0,
          height: 0
        });
        app.addEvent(app.domElements.container, 'mousemove', newArea.onProcessDrawing.bind(newArea)).addEvent(app.domElements.container, 'click', newArea.onStopDrawing.bind(newArea));
        return newArea;
      });

      _this.app = _app;
      _this._coords = {
        x: _coords.x || 0,
        y: _coords.y || 0,
        width: _coords.width || 0,
        height: _coords.height || 0
      };
      _this._el = document.createElementNS(Area$1.SVG_NS, 'rect');

      _this._groupEl.appendChild(_this._el);

      var _x = _coords.x - _this._coords.width / 2,
          _y = _coords.y - _this._coords.height / 2;

      _this._helpers = {
        center: new Helper(_this._groupEl, _x, _y, 'move'),
        top: new Helper(_this._groupEl, _x, _y, 'editTop'),
        bottom: new Helper(_this._groupEl, _x, _y, 'editBottom'),
        left: new Helper(_this._groupEl, _x, _y, 'editLeft'),
        right: new Helper(_this._groupEl, _x, _y, 'editRight'),
        topLeft: new Helper(_this._groupEl, _x, _y, 'editTopLeft'),
        topRight: new Helper(_this._groupEl, _x, _y, 'editTopRight'),
        bottomLeft: new Helper(_this._groupEl, _x, _y, 'editBottomLeft'),
        bottomRight: new Helper(_this._groupEl, _x, _y, 'editBottomRight')
      };

      _this.redraw();

      return _this;
    }

    return _createClass(Rectangle);
  }(Area$1);

  /**
   * Calculate a point transformed with an affine matrix
   * @param matrix {Matrix} Affine Matrix
   * @param  point {Point} Point
   * @returns {Point} Point
   */
  function applyToPoint (matrix, point) {
    return Array.isArray(point)
      ? [
          matrix.a * point[0] + matrix.c * point[1] + matrix.e,
          matrix.b * point[0] + matrix.d * point[1] + matrix.f
        ]
      : {
          x: matrix.a * point.x + matrix.c * point.y + matrix.e,
          y: matrix.b * point.x + matrix.d * point.y + matrix.f
        }
  }

  /**
   * Calculate an array of points transformed with an affine matrix
   * @param matrix {Matrix} Affine Matrix
   * @param points {Point[]} Array of point
   * @returns {Point[]} Array of point
   */
  function applyToPoints (matrix, points) {
    return points.map(point => applyToPoint(matrix, point))
  }

  function isUndefined (val) {
    return typeof val === 'undefined'
  }

  /**
   * Calculate a translate matrix
   * @param tx {number} Translation on axis x
   * @param [ty = 0] {number} Translation on axis y
   * @returns {Matrix} Affine Matrix
   */
  function translate (tx, ty = 0) {
    return {
      a: 1,
      c: 0,
      e: tx,
      b: 0,
      d: 1,
      f: ty
    }
  }

  /**
   * Merge multiple matrices into one
   * @param matrices {...Matrix | Matrix[]} Matrices listed as separate parameters or in an array
   * @returns {Matrix} Affine Matrix
   */
  function transform (...matrices) {
    matrices = Array.isArray(matrices[0]) ? matrices[0] : matrices;

    const multiply = (m1, m2) => {
      return {
        a: m1.a * m2.a + m1.c * m2.b,
        c: m1.a * m2.c + m1.c * m2.d,
        e: m1.a * m2.e + m1.c * m2.f + m1.e,
        b: m1.b * m2.a + m1.d * m2.b,
        d: m1.b * m2.c + m1.d * m2.d,
        f: m1.b * m2.e + m1.d * m2.f + m1.f
      }
    };

    switch (matrices.length) {
      case 0:
        throw new Error('no matrices provided')

      case 1:
        return matrices[0]

      case 2:
        return multiply(matrices[0], matrices[1])

      default: {
        const [m1, m2, ...rest] = matrices;
        const m = multiply(m1, m2);
        return transform(m, ...rest)
      }
    }
  }

  /**
   * Merge multiple matrices into one
   * @param matrices {...Matrix | Matrix[]} Matrices listed as separate parameters or in an array
   * @returns {Matrix} Affine Matrix
   */
  function compose (...matrices) {
    return transform(...matrices)
  }

  const { cos, sin, PI } = Math;
  /**
   * Calculate a rotation matrix
   * @param angle {number} Angle in radians
   * @param [cx] {number} If (cx,cy) are supplied the rotate is about this point
   * @param [cy] {number} If (cx,cy) are supplied the rotate is about this point
   * @returns {Matrix} Affine Matrix
   */
  function rotate (angle, cx, cy) {
    const cosAngle = cos(angle);
    const sinAngle = sin(angle);
    const rotationMatrix = {
      a: cosAngle,
      c: -sinAngle,
      e: 0,
      b: sinAngle,
      d: cosAngle,
      f: 0
    };
    if (isUndefined(cx) || isUndefined(cy)) {
      return rotationMatrix
    }

    return transform([
      translate(cx, cy),
      rotationMatrix,
      translate(-cx, -cy)
    ])
  }

  /**
   * Calculate a rotation matrix with a DEG angle
   * @param angle {number} Angle in degree
   * @param [cx] {number} If (cx,cy) are supplied the rotate is about this point
   * @param [cy] {number} If (cx,cy) are supplied the rotate is about this point
   * @returns {Matrix} Affine Matrix
   */
  function rotateDEG (angle, cx = undefined, cy = undefined) {
    return rotate(angle * PI / 180, cx, cy)
  }

  // Generated by PEG.js v0.11.0-master.b7b87ea, https://pegjs.org/

  function peg$subclass(child, parent) {
    function C() { this.constructor = child; }
    C.prototype = parent.prototype;
    child.prototype = new C();
  }

  function peg$SyntaxError(message, expected, found, location) {
    this.message = message;
    this.expected = expected;
    this.found = found;
    this.location = location;
    this.name = "SyntaxError";

    // istanbul ignore next
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(this, peg$SyntaxError);
    }
  }

  peg$subclass(peg$SyntaxError, Error);

  peg$SyntaxError.buildMessage = function(expected, found, location) {
    var DESCRIBE_EXPECTATION_FNS = {
      literal: function(expectation) {
        return "\"" + literalEscape(expectation.text) + "\"";
      },

      class: function(expectation) {
        var escapedParts = expectation.parts.map(function(part) {
          return Array.isArray(part)
            ? classEscape(part[0]) + "-" + classEscape(part[1])
            : classEscape(part);
        });

        return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
      },

      any: function() {
        return "any character";
      },

      end: function() {
        return "end of input";
      },

      other: function(expectation) {
        return expectation.description;
      },

      not: function(expectation) {
        return "not " + describeExpectation(expectation.expected);
      }
    };

    function hex(ch) {
      return ch.charCodeAt(0).toString(16).toUpperCase();
    }

    function literalEscape(s) {
      return s
        .replace(/\\/g, "\\\\")
        .replace(/"/g,  "\\\"")
        .replace(/\0/g, "\\0")
        .replace(/\t/g, "\\t")
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r")
        .replace(/[\x00-\x0F]/g,          function(ch) { return "\\x0" + hex(ch); })
        .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return "\\x"  + hex(ch); });
    }

    function classEscape(s) {
      return s
        .replace(/\\/g, "\\\\")
        .replace(/\]/g, "\\]")
        .replace(/\^/g, "\\^")
        .replace(/-/g,  "\\-")
        .replace(/\0/g, "\\0")
        .replace(/\t/g, "\\t")
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r")
        .replace(/[\x00-\x0F]/g,          function(ch) { return "\\x0" + hex(ch); })
        .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return "\\x"  + hex(ch); });
    }

    function describeExpectation(expectation) {
      return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
    }

    function describeExpected(expected) {
      var descriptions = expected.map(describeExpectation);
      var i, j;

      descriptions.sort();

      if (descriptions.length > 0) {
        for (i = 1, j = 1; i < descriptions.length; i++) {
          if (descriptions[i - 1] !== descriptions[i]) {
            descriptions[j] = descriptions[i];
            j++;
          }
        }
        descriptions.length = j;
      }

      switch (descriptions.length) {
        case 1:
          return descriptions[0];

        case 2:
          return descriptions[0] + " or " + descriptions[1];

        default:
          return descriptions.slice(0, -1).join(", ")
            + ", or "
            + descriptions[descriptions.length - 1];
      }
    }

    function describeFound(found) {
      return found ? "\"" + literalEscape(found) + "\"" : "end of input";
    }

    return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
  };

  var Polygon = function (_Area) {
    _inherits(Polygon, _Area);

    var _super = _createSuper(Polygon);

    function Polygon(_app, _coords, seats, attributes) {
      var _this;

      _classCallCheck(this, Polygon);

      _this = _super.call(this, 'polygon', _app, _coords, seats, attributes);

      _defineProperty(_assertThisInitialized(_this), "close", function () {
        var polyline = _this._el;
        _this._el = document.createElementNS(Area$1.SVG_NS, 'polygon');

        _this._groupEl.replaceChild(_this._el, polyline);

        _this._coords.isOpened = false;

        _this.redraw().deselect();
      });

      _defineProperty(_assertThisInitialized(_this), "setSVGCoords", function (coords) {
        var polygonPointsAttrValue = coords.points.reduce(function (previousValue, currentItem) {
          return previousValue + currentItem.x + ' ' + currentItem.y + ' ';
        }, '');

        _this._el.setAttribute('points', polygonPointsAttrValue);

        _this.foreach(_this._helpers.points, function (helper, i) {
          helper.setCoords(coords.points[i].x, coords.points[i].y);
        });

        return _assertThisInitialized(_this);
      });

      _defineProperty(_assertThisInitialized(_this), "foreach", function (arr, cb) {
        for (var i = 0, count = arr.length; i < count; i++) {
          cb(arr[i], i);
        }
      });

      _defineProperty(_assertThisInitialized(_this), "getRightCoords", function (app, x, y) {
        return {
          x: x - app.getOffset('x'),
          y: y - app.getOffset('y')
        };
      });

      _defineProperty(_assertThisInitialized(_this), "setCoords", function (coords) {
        _this._coords.points = coords.points;
        return _assertThisInitialized(_this);
      });

      _defineProperty(_assertThisInitialized(_this), "addPoint", function (x, y) {
        if (!_this._coords.isOpened) {
          throw new Error('This polygon is closed!');
        }

        var helper = new Helper(_this._groupEl, x, y, 'movePoint');
        helper.setId(_this._helpers.points.length);

        _this._helpers.points.push(helper);

        _this._coords.points.push({
          x: x,
          y: y
        });

        _this.redraw();

        return _assertThisInitialized(_this);
      });

      _defineProperty(_assertThisInitialized(_this), "dynamicDraw", function (app, x, y, isRightAngle) {
        var temp_coords = {
          points: [].concat(_this._coords.points)
        };

        if (isRightAngle) {
          var rightPointCoords = Polygon.getRightAngleLineLastPointCoords(_this._coords, {
            x: x,
            y: y
          });
          x = rightPointCoords.x;
          y = rightPointCoords.y;
        }

        temp_coords.points.push({
          x: x,
          y: y
        });

        _this.redraw(temp_coords);

        return temp_coords;
      });

      _defineProperty(_assertThisInitialized(_this), "onProcessDrawing", function (e) {
        var coords = _this.getRightCoords(_this.app, e.pageX, e.pageY);

        _this.dynamicDraw(_this.app, coords.x, coords.y, e.shiftKey);
      });

      _defineProperty(_assertThisInitialized(_this), "onAddPointDrawing", function (e) {
        var newPointCoords = _this.getRightCoords(_this.app, e.pageX, e.pageY);

        if (e.shiftKey) {
          newPointCoords = Polygon.getRightAngleLineLastPointCoords(_this._coords, newPointCoords);
        }

        _this.addPoint(newPointCoords.x, newPointCoords.y);
      });

      _defineProperty(_assertThisInitialized(_this), "onStopDrawing", function (e) {
        var app = _this.app;

        if (e.type == 'click' || e.type == 'keydown' && e.keyCode == 13) {
          if (_this.testCoords(_this._coords)) {
            _this.close();

            app.removeAllEvents().setIsDraw(false).resetNewArea();
          }
        }

        e.stopPropagation();
      });

      _defineProperty(_assertThisInitialized(_this), "edit", function (editingType, dx, dy) {
        var tempParams = Object.create(_this._coords);

        switch (editingType) {
          case 'move':
            for (var i = 0, c = tempParams.points.length; i < c; i++) {
              tempParams.points[i].x += dx;
              tempParams.points[i].y += dy;
            }

            break;

          case 'movePoint':
            tempParams.points[_this.selected_point].x += dx;
            tempParams.points[_this.selected_point].y += dy;
            break;
        }

        return tempParams;
      });

      _defineProperty(_assertThisInitialized(_this), "onProcessEditing", function (e) {
        var editType = _this.app.getEditType();

        _this.redraw(_this.edit(editType, e.pageX - _this.editingStartPoint.x, e.pageY - _this.editingStartPoint.y));

        _this.editingStartPoint.x = e.pageX;
        _this.editingStartPoint.y = e.pageY;
      });

      _defineProperty(_assertThisInitialized(_this), "onStopEditing", function (e) {
        var editType = _this.app.getEditType();

        _this.setCoords(_this.edit(editType, e.pageX - _this.editingStartPoint.x, e.pageY - _this.editingStartPoint.y)).redraw();

        _this.app.removeAllEvents();
      });

      _defineProperty(_assertThisInitialized(_this), "toString", function () {
        return 'Polygon {points: [' + _this._coords.points.map(function (item) {
          return '[' + item.x + ', ' + item.y + ']';
        }).join(', ') + ']}';
      });

      _defineProperty(_assertThisInitialized(_this), "toHTMLMapElementString", function () {
        var str = _this._coords.points.map(function (item) {
          return item.x + ', ' + item.y;
        }).join(', ');

        return '<area shape="poly" coords="' + str + '"' + (_this._attributes.id ? ' href="' + _this._attributes.id + '"' : '') + (_this._attributes.href ? ' href="' + _this._attributes.href + '"' : '') + (_this._attributes.alt ? ' alt="' + _this._attributes.alt + '"' : '') + (_this._attributes.title ? ' title="' + _this._attributes.title + '"' : '') + ' />';
      });

      _defineProperty(_assertThisInitialized(_this), "getCoordsForDisplayingInfo", function () {
        return {
          x: _this._coords.points[0].x,
          y: _this._coords.points[0].y
        };
      });

      _defineProperty(_assertThisInitialized(_this), "testCoords", function (coords) {
        return coords.points.length >= 3;
      });

      _defineProperty(_assertThisInitialized(_this), "testHTMLCoords", function (coords) {
        return coords.length >= 6 && coords.length % 2 === 0;
      });

      _defineProperty(_assertThisInitialized(_this), "getCoordsFromHTMLArray", function (htmlCoordsArray) {
        if (!testHTMLCoords(htmlCoordsArray)) {
          throw new Error('This html-coordinates is not valid for polygon');
        }

        var points = [];

        for (var i = 0, c = htmlCoordsArray.length / 2; i < c; i++) {
          points.push({
            x: htmlCoordsArray[2 * i],
            y: htmlCoordsArray[2 * i + 1]
          });
        }

        return {
          points: points
        };
      });

      _defineProperty(_assertThisInitialized(_this), "getRightAngleLineLastPointCoords", function (originalCoords, newPointCoords) {
        var TANGENS = {
          DEG_22: 0.414,
          DEG_67: 2.414
        },
            lastPointIndex = originalCoords.points.length - 1,
            lastPoint = originalCoords.points[lastPointIndex],
            dx = newPointCoords.x - lastPoint.x,
            dy = -(newPointCoords.y - lastPoint.y),
            tan = dy / dx,
            x = newPointCoords.x,
            y = newPointCoords.y;

        if (dx > 0 && dy > 0) {
          if (tan > TANGENS.DEG_67) {
            x = lastPoint.x;
          } else if (tan < TANGENS.DEG_22) {
            y = lastPoint.y;
          } else {
            Math.abs(dx) > Math.abs(dy) ? x = lastPoint.x + dy : y = lastPoint.y - dx;
          }
        } else if (dx < 0 && dy > 0) {
          if (tan < -TANGENS.DEG_67) {
            x = lastPoint.x;
          } else if (tan > -TANGENS.DEG_22) {
            y = lastPoint.y;
          } else {
            Math.abs(dx) > Math.abs(dy) ? x = lastPoint.x - dy : y = lastPoint.y + dx;
          }
        } else if (dx < 0 && dy < 0) {
          if (tan > TANGENS.DEG_67) {
            x = lastPoint.x;
          } else if (tan < TANGENS.DEG_22) {
            y = lastPoint.y;
          } else {
            Math.abs(dx) > Math.abs(dy) ? x = lastPoint.x + dy : y = lastPoint.y - dx;
          }
        } else if (dx > 0 && dy < 0) {
          if (tan < -TANGENS.DEG_67) {
            x = lastPoint.x;
          } else if (tan > -TANGENS.DEG_22) {
            y = lastPoint.y;
          } else {
            Math.abs(dx) > Math.abs(dy) ? x = lastPoint.x - dy : y = lastPoint.y + dx;
          }
        }

        return {
          x: x,
          y: y
        };
      });

      _defineProperty(_assertThisInitialized(_this), "copy", function (areasIO, originalArea) {
        var app = _this.app;
        var res = JSON.parse(areasIO.toJSON());
        app.foreach(res.areas, function (areaParams) {
          if (areaParams.attributes.id == originalArea._attributes.id) {
            var coords = areaParams.coords;
            app.foreach(areaParams.coords.points, function (point, i) {
              coords.points[i].x += 10;
              coords.points[i].y += 10;
            });
            areaParams.coords = coords;
            areaParams.attributes.id = Area$1.genID(6);
            return Area$1.fromJSON(app, areaParams);
          }
        });
      });

      _defineProperty(_assertThisInitialized(_this), "getCenterPoint", function (points) {
        var xMin, xMax, yMin, yMax;
        var yM, xM;
        points.map(function (p) {
          if (xMin === undefined) xMin = p.x;
          if (xMax === undefined) xMax = p.x;
          if (yMin === undefined) yMin = p.y;
          if (yMax === undefined) yMax = p.y;
          if (p.x > xMax) xMax = p.x;
          if (p.x < xMin) xMin = p.x;
          if (p.y > yMax) yMax = p.y;
          if (p.y < yMin) yMin = p.y;
        });
        xM = (xMax + xMin) / 2;
        yM = (yMax + yMin) / 2;
        return {
          x: xM,
          y: yM
        };
      });

      _defineProperty(_assertThisInitialized(_this), "rotate", function (area, angle) {
        var cp = _this.getCenterPoint(area._coords.points);

        var matrixAngle = compose(rotateDEG(angle));
        var rotatedZonePoints = applyToPoints(matrixAngle, area._coords.points);

        var cpa = _this.getCenterPoint(rotatedZonePoints);

        var matrixMove = compose(translate(cp.x - cpa.x, cp.y - cpa.y));
        rotatedZonePoints = applyToPoints(matrixMove, rotatedZonePoints);
        console.log(area._seats.points);

        if (typeof area._seats !== 'undefined' && typeof area._seats.points !== 'undefined') {
          try {
            var rotatedSeatPoints = applyToPoints(matrixAngle, area._seats.points);
            area._seats.points = rotatedSeatPoints;
            area._coords.points = rotatedZonePoints;

            _this.redraw();
          } catch (e) {
            var toast = new bootstrap.Toast(document.querySelector('.toast'));
            document.querySelector('.toast .toast-body').innerHTML = 'Please allocate all seats inside this zone to make rotation.';
            toast.show();
          }
        } else {
          area._coords.points = rotatedZonePoints;

          _this.redraw();
        }

        return area;
      });

      _this.app = _app;
      _this._coords = {
        points: _coords.points || [{
          x: 0,
          y: 0
        }],
        isOpened: _coords.isOpened || false
      };
      _this._el = document.createElementNS(Area$1.SVG_NS, _this._coords.isOpened ? 'polyline' : 'polygon');
      if (typeof attributes !== 'undefined') _this._el.dataset.id = attributes.id;

      if (typeof seats === 'undefined') {
        seats = [];
      }

      _this._groupEl.appendChild(_this._el);

      _this._helpers = {
        points: []
      };

      for (var i = 0, c = _this._coords.points.length; i < c; i++) {
        _this._helpers.points.push(new Helper(_this._groupEl, _this._coords.points[i].x, _this._coords.points[i].y, 'movePoint').setId(i));
      }

      _this._selectedPoint = -1;

      _this.redraw();

      return _this;
    }

    return _createClass(Polygon);
  }(Area$1);

  _defineProperty(Polygon, "createAndStartDrawing", function (app, firstPointCoords) {
    var params = {
      title: '',
      points: [firstPointCoords],
      isOpened: true
    };
    var polygon = new Polygon(app, params);
    app.addEvent(app.domElements.container, 'mousemove', polygon.onProcessDrawing.bind(polygon)).addEvent(app.domElements.container, 'click', polygon.onAddPointDrawing.bind(polygon)).addEvent(document, 'keydown', polygon.onStopDrawing.bind(polygon)).addEvent(polygon._helpers.points[0]._el, 'click', polygon.onStopDrawing.bind(polygon));
    return polygon;
  });

  var Circle = function (_Area) {
    _inherits(Circle, _Area);

    var _super = _createSuper(Circle);

    function Circle(_app, _coords, seats, attributes) {
      var _this;

      _classCallCheck(this, Circle);

      _this = _super.call(this, 'circle', _app, _coords, seats, attributes);

      _defineProperty(_assertThisInitialized(_this), "setSVGCoords", function (coords) {
        this._el.setAttribute('cx', coords.cx);

        this._el.setAttribute('cy', coords.cy);

        this._el.setAttribute('r', coords.radius);

        this._el.setAttribute('p', '');

        this.helpers.center.setCoords(coords.cx, coords.cy);
        this.helpers.top.setCoords(coords.cx, coords.cy - coords.radius);
        this.helpers.right.setCoords(coords.cx + coords.radius, coords.cy);
        this.helpers.bottom.setCoords(coords.cx, coords.cy + coords.radius);
        this.helpers.left.setCoords(coords.cx - coords.radius, coords.cy);
        return this;
      });

      _defineProperty(_assertThisInitialized(_this), "setCoords", function (coords) {
        this._coords.cx = coords.cx;
        this._coords.cy = coords.cy;
        this._coords.radius = coords.radius;
        return this;
      });

      _defineProperty(_assertThisInitialized(_this), "dynamicDraw", function (x, y) {
        var radius = Math.round(Math.sqrt(Math.pow(this._coords.cx - x, 2) + Math.pow(this._coords.cy - y, 2))),
            newCoords = {
          cx: this._coords.cx,
          cy: this._coords.cy,
          radius: radius
        };
        this.redraw(newCoords);
        return newCoords;
      });

      _defineProperty(_assertThisInitialized(_this), "onProcessDrawing", function (e) {
        var coords = utils.getRightCoords(e.pageX, e.pageY);
        this.dynamicDraw(coords.x, coords.y);
      });

      _defineProperty(_assertThisInitialized(_this), "onStopDrawing", function (e) {
        var coords = utils.getRightCoords(e.pageX, e.pageY);
        this.setCoords(this.dynamicDraw(coords.x, coords.y)).deselect();
        app.removeAllEvents().setIsDraw(false).resetNewArea();
      });

      _defineProperty(_assertThisInitialized(_this), "edit", function (editingType, dx, dy) {
        var tempParams = Object.create(this._coords);

        switch (editingType) {
          case 'move':
            tempParams.cx += dx;
            tempParams.cy += dy;
            break;

          case 'editTop':
            tempParams.radius -= dy;
            break;

          case 'editBottom':
            tempParams.radius += dy;
            break;

          case 'editLeft':
            tempParams.radius -= dx;
            break;

          case 'editRight':
            tempParams.radius += dx;
            break;
        }

        return tempParams;
      });

      _defineProperty(_assertThisInitialized(_this), "dynamicEdit", function (tempCoords) {
        if (tempCoords.radius < 0) {
          tempCoords.radius = Math.abs(tempCoords.radius);
        }

        this.setSVGCoords(tempCoords);
        return tempCoords;
      });

      _defineProperty(_assertThisInitialized(_this), "onProcessEditing", function (e) {
        var editType = app.getEditType();
        return this.dynamicEdit(this.edit(editType, e.pageX - this.editingStartPoint.x, e.pageY - this.editingStartPoint.y));
      });

      _defineProperty(_assertThisInitialized(_this), "onStopEditing", function (e) {
        app.getEditType();
        this.setCoords(this.onProcessEditing(e));
        app.removeAllEvents();
      });

      _defineProperty(_assertThisInitialized(_this), "toString", function () {
        return 'Circle {cx: ' + this._coords.cx + ', cy: ' + this._coords.cy + ', radius: ' + this._coords.radius + '}';
      });

      _defineProperty(_assertThisInitialized(_this), "toHTMLMapElementString", function () {
        return '<area shape="circle" coords="' + this._coords.cx + ', ' + this._coords.cy + ', ' + this._coords.radius + '"' + (this._attributes.id ? ' href="' + this._attributes.id + '"' : '') + (this._attributes.href ? ' href="' + this._attributes.href + '"' : '') + (this._attributes.alt ? ' alt="' + this._attributes.alt + '"' : '') + (this._attributes.title ? ' title="' + this._attributes.title + '"' : '') + ' />';
      });

      _defineProperty(_assertThisInitialized(_this), "getCoordsForDisplayingInfo", function () {
        return {
          x: this._coords.cx,
          y: this._coords.cy
        };
      });

      _defineProperty(_assertThisInitialized(_this), "testCoords", function (coords) {
        return coords.cx && coords.cy && coords.radius;
      });

      _defineProperty(_assertThisInitialized(_this), "testHTMLCoords", function (coords) {
        return coords.length === 3;
      });

      _defineProperty(_assertThisInitialized(_this), "getCoordsFromHTMLArray", function (htmlCoordsArray) {
        if (!this.testHTMLCoords(htmlCoordsArray)) {
          throw new Error('This html-coordinates is not valid for circle');
        }

        return {
          cx: htmlCoordsArray[0],
          cy: htmlCoordsArray[1],
          radius: htmlCoordsArray[2]
        };
      });

      _defineProperty(_assertThisInitialized(_this), "createAndStartDrawing", function (firstPointCoords) {
        var newArea = new Circle({
          cx: firstPointCoords.x,
          cy: firstPointCoords.y,
          radius: 0
        });
        app.addEvent(app.domElements.container, 'mousemove', newArea.onProcessDrawing.bind(newArea)).addEvent(app.domElements.container, 'click', newArea.onStopDrawing.bind(newArea));
        return newArea;
      });

      _this.app = _app;
      _this._coords = {
        cx: _coords.cx || 0,
        cy: _coords.cy || 0,
        radius: _coords.radius || 0
      };

      if (typeof seats === 'undefined') {
        seats = [];
      }

      _this._el = document.createElementNS(Area$1.SVG_NS, 'circle');

      _this._groupEl.appendChild(_this._el);

      _this.helpers = {
        center: new Helper(_this._groupEl, _coords.cx, _coords.cy, 'move'),
        top: new Helper(_this._groupEl, _coords.cx, _coords.cy, 'editTop'),
        bottom: new Helper(_this._groupEl, _coords.cx, _coords.cy, 'editBottom'),
        left: new Helper(_this._groupEl, _coords.cx, _coords.cy, 'editLeft'),
        right: new Helper(_this._groupEl, _coords.cx, _coords.cy, 'editRight')
      };

      _this.redraw();

      return _this;
    }

    return _createClass(Circle);
  }(Area$1);

  var Stats = _createClass(function Stats(el, _areas, cfs) {
    _classCallCheck(this, Stats);

    _defineProperty(this, "drawStats", function () {
      var _this = this;

      var areas = this._areas;
      var html = "<table class=\"table\" style=\"width:100%;min-width:700px;\">";
      html += "<tr><th></th><th>Zone</th>";

      this._cfs.map(function (cf) {
        html += "<th>".concat(cf.label, "</th>");
      });

      html += "<th>Seat Count</th></tr>";
      var count = {
        seatsPerZone: 0,
        totalZones: 0,
        totalSeats: 0,
        totalTws: 0,
        i: 1
      };
      var colspan = 3 + this._cfs.length;

      var _loop = function _loop(a) {
        count.seatsPerZone = 0;

        if (typeof areas[a]._seats !== 'undefined') {
          for (var p in areas[a]._seats.points) {
            if (areas[a]._seats.points[p] != null) if (areas[a]._seats.points[p].i == true) {
              count.seatsPerZone += 1;
            }
          }

          var tws = areas[a]._seats.tws ? parseInt(areas[a]._seats.tws) : 0;
          var title = areas[a]._seats.title ? areas[a]._seats.title : '';
          count.totalZones += 1;
          count.totalSeats += count.seatsPerZone;
          count.totalTws += tws;
          html += '<tr><td>' + count.i + '</td><td>' + title + '</td>';

          _this._cfs.map(function (cf) {
            html += "<td>".concat(areas[a]._seats[cf.id] ? areas[a]._seats[cf.id] : '', "</td>");
          });

          html += '<td>' + count.seatsPerZone + '/' + tws + '</td></tr>';
        } else {
          html += '<tr><td colspan="' + colspan + '">' + count.i + '</td></tr>';
        }

        count.i++;
      };

      for (var a in areas) {
        _loop(a);
      }

      html += '<tr><td colspan="' + colspan + '">Total zones: ' + count.totalZones + '</td></tr>';
      html += '<tr><td colspan="' + colspan + '">Total seats in all zones: ' + count.totalTws + '</td></tr>';
      html += '<tr><td colspan="' + colspan + '">Total seats available for booking: ' + count.totalSeats + '</td></tr>';
      html += '</table>';

      this._el.setAttribute('style', 'overflow-x: scroll;');

      this._el.innerHTML = html;
    });

    _defineProperty(this, "structRow", function (data) {});

    this._el = el;
    this._areas = _areas;
    this._cfs = cfs;
  });

  var initMapping = function initMapping() {

    var utils = {
      SVG_NS: 'http://www.w3.org/2000/svg',
      CLASS_NAMES: {
        SELECTED: 'selected',
        WITH_HREF: 'with_href'
      },
      getOffset: function getOffset(node) {
        var boxCoords = node.getBoundingClientRect();
        return {
          x: Math.round(boxCoords.left + window.pageXOffset),
          y: Math.round(boxCoords.top + window.pageYOffset)
        };
      },
      getRightCoords: function getRightCoords(x, y) {
        return {
          x: x - app.getOffset('x'),
          y: y - app.getOffset('y')
        };
      },
      id: function id(str) {
        return document.getElementById(str);
      },
      hide: function hide(node) {
        node.style.display = 'none';
        return this;
      },
      show: function show(node) {
        node.style.display = 'block';
        return this;
      },
      encode: function encode(str) {
        return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      },
      foreach: function foreach(arr, func) {
        for (var i = 0, count = arr.length; i < count; i++) {
          func(arr[i], i);
        }
      },
      foreachReverse: function foreachReverse(arr, func) {
        for (var i = arr.length - 1; i >= 0; i--) {
          func(arr[i], i);
        }
      },
      debug: function () {
        var output = document.getElementById('debug');
        return function () {
          output.innerHTML = [].join.call(arguments, ' ');
        };
      }(),
      stopEvent: function stopEvent(e) {
        e.stopPropagation();
        e.preventDefault();
        return this;
      },
      getUrlParameter: function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
          sParameterName = sURLVariables[i].split('=');

          if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
          }
        }
      },
      getCookie: function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');

        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];

          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }

          if (c.indexOf(name) == 0) {
            return unescape(c.substring(name.length, c.length));
          }
        }

        return "";
      },
      extend: function extend(obj, options) {
        var target = {};

        for (var name in obj) {
          if (obj.hasOwnProperty(name)) {
            target[name] = options[name] ? options[name] : obj[name];
          }
        }

        return target;
      },
      genID: function genID(len) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < len; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
      },
      inherits: function () {
        var F = function F() {};

        return function (Child, Parent) {
          F.prototype = Parent.prototype;
          Child.prototype = new F();
          Child.prototype.constructor = Child;
        };
      }()
    };

    var app = function () {
      var domElements = {
        wrapper: utils.id('wrapper'),
        svg: utils.id('svg'),
        img: utils.id('img'),
        container: utils.id('image'),
        seat_mapping: utils.id('svg_mapping_cont'),
        map: null
      },
          state = {
        CONSTRUCTORS: {
          rectangle: Rectangle,
          circle: Circle,
          polygon: Polygon
        },
        offset: {
          x: 0,
          y: 0
        },
        cp: {
          x: 0,
          y: 0
        },
        clickTime: new Date().getTime(),
        svg_width: 0,
        svg_height: 0,
        max_times: 1,
        appMode: null,
        currentType: null,
        editType: null,
        newArea: null,
        selectedArea: null,
        mappingArea: null,
        cfs: [],
        pcfs: [],
        cfs_listener: null,
        areas: [],
        events: [],
        isDraw: false,
        silent: false,
        image: {
          src: null,
          filename: null,
          width: 0,
          height: 0
        },
        last_scroll: 0,
        to: '',
        moved: false,
        mapping: false,
        autoAssign: false,
        autoAssignRT: [],
        autoAlign: false,
        autoAlignXY: [],
        autoDraw: {
          points: [],
          count: "",
          active: false
        },
        updateObjectSeatPointsHistory: [],
        timer1: null,
        timer2: null
      },
          KEYS = {
        F1: 112,
        ESC: 27,
        TOP: 38,
        BOTTOM: 40,
        LEFT: 37,
        RIGHT: 39,
        DELETE: 46,
        DEL_MAC: 8,
        Q: 81,
        A: 65,
        D: 68,
        H: 72,
        I: 73,
        S: 83,
        C: 67,
        O: 79,
        P: 80,
        J: 74,
        U: 85,
        Z: 90
      };

      function _recalcOffsetValues() {
        if (state.to) window.clearTimeout(state.to);
        state.to = window.setTimeout(function () {
          state.offset = utils.getOffset(domElements.container);
        }, 100);
      }

      window.addEventListener('resize', _recalcOffsetValues, false);
      window.addEventListener('scroll', _recalcOffsetValues, false);
      domElements.container.addEventListener('mousedown', function (e) {
        e.preventDefault();
      }, false);
      domElements.seat_mapping.addEventListener('mousedown', function (e) {
        e.preventDefault();
        state.clickTime = new Date().getTime();
      }, false);
      domElements.img.addEventListener('dragstart', function (e) {
        e.preventDefault();
      }, false);

      var cursor_position_info = function () {
        var coords_info = utils.id('coords');
        return {
          set: function set(coords) {
            coords_info.innerHTML = 'x: ' + coords.x + ', ' + 'y: ' + coords.y;
          },
          empty: function empty() {
            coords_info.innerHTML = '';
          }
        };
      }();

      domElements.container.addEventListener('mousemove', function (e) {
        cursor_position_info.set(utils.getRightCoords(e.pageX, e.pageY));
      }, false);
      domElements.seat_mapping.addEventListener('mousemove', function (e) {
        var offset = $("#svg_mapping").offset();

        if (new Date().getTime() - state.clickTime < 400) {
          return;
        }

        if (state.mapping) {
          state.moved = true;
          $("#cr" + state.mappingArea).attr("cx", e.pageX - offset.left);
          $("#cr" + state.mappingArea).attr("cy", e.pageY - offset.top);
          $("#tx" + state.mappingArea).attr("x", e.pageX - offset.left);
          $("#tx" + state.mappingArea).attr("y", e.pageY - offset.top);
        }
      }, false);
      domElements.seat_mapping.addEventListener('mouseup', function (e) {
        if (e.target.tagName === 'circle' || e.target.tagName === 'text') {
          $("#seat_notice").fadeOut(0);
          $("#seat_row,#seat_text,#seat_price").fadeIn(100);
          var currentZone = app.getSelectedArea();
          var i = e.target.parentNode.dataset.index;
          var offset = $("#svg_mapping").offset();
          var mousePos = app.getObjectSeatPoints(currentZone, i);
          if (!mousePos) mousePos = {
            'x': 0,
            'y': 0,
            'r': "",
            't': "",
            'p': "",
            i: false
          };

          if (state.moved) {
            mousePos.x = (e.pageX - offset.left - state.svg_width) / state.max_times;
            mousePos.y = (e.pageY - offset.top - state.svg_height) / state.max_times;
            $("#cr" + state.mappingArea).attr("cx", e.pageX - offset.left);
            $("#cr" + state.mappingArea).attr("cy", e.pageY - offset.top);
            $("#tx" + state.mappingArea).attr("x", e.pageX - offset.left);
            $("#tx" + state.mappingArea).attr("y", e.pageY - offset.top);
            app.updateObjectSeatPoints(currentZone, i, mousePos);
          }

          $("#seat_text_in").val($("#tx" + i).html()).data("index", i);

          if (mousePos.p) {
            $("#seat_price_in").val(mousePos.p);
          } else {
            $("#seat_price_in").val(app.getObjectSeats(app.getSelectedArea(), "price"));
          }

          if (mousePos.r) {
            $("#seat_row_in").val(mousePos.r);
          } else {
            $("#seat_row_in").val(app.getObjectSeats(app.getSelectedArea(), "title"));
          }

          state.moved = false;
          state.mapping = false;
        }

        if (e.target.tagName !== 'circle' && e.target.tagName !== 'text' && e.target.tagName !== 'g') {
          if (state.autoDraw.active) {
            var _offset = $("#svg_mapping").offset();
            state.autoDraw.points.push({
              x: e.pageX - _offset.left,
              y: e.pageY - _offset.top
            });

            if (state.autoDraw.points.length == 2) {
              var x = state.autoDraw.points[1].x - state.autoDraw.points[0].x;
              var y = state.autoDraw.points[1].y > state.autoDraw.points[0].y ? state.autoDraw.points[1].y - state.autoDraw.points[0].y : state.autoDraw.points[0].y - state.autoDraw.points[1].y;
              var c = Math.sqrt(x * x + y * y);
              var alpha = Math.atan(y / x);
              console.log(" x = " + x + " y = " + y + " c = " + c);
              var interval = c / (parseInt(state.autoDraw.count) - 1);
              var ci = interval;
              var _i = 0,
                  index;
              var newX = state.autoDraw.points[0].x,
                  newY = state.autoDraw.points[0].y;

              while (_i < parseInt(state.autoDraw.count)) {
                console.log("new while");

                var _iterator = _createForOfIteratorHelper(document.querySelectorAll(".cr")),
                    _step;

                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    var el = _step.value;
                    var dataInside = el.getAttribute("data-inside") === undefined ? "true" : el.getAttribute("data-inside");
                    var inside = JSON.parse(dataInside);
                    index = parseInt(el.getAttribute("data-index"));

                    if (!inside) {
                      document.querySelector("#cr" + index).setAttribute("cx", newX);
                      document.querySelector("#cr" + index).setAttribute("cy", newY);
                      document.querySelector("#tx" + index).setAttribute("x", newX);
                      document.querySelector("#tx" + index).setAttribute("y", newY);
                      document.querySelector("#cr" + index).setAttribute("data-inside", inside);
                      document.querySelector("#tx" + index).setAttribute("data-inside", inside);
                      console.log(index + " " + inside + " newX: " + newX + " newY: " + newY);
                      break;
                    }
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }
                if (index === undefined) return;
                state.mappingArea = index;

                var _currentZone = app.getSelectedArea();

                var _mousePos2 = app.getObjectSeatPoints(_currentZone, state.mappingArea);

                if (!_mousePos2) _mousePos2 = {
                  'x': 0,
                  'y': 0,
                  'r': "",
                  't': "",
                  'p': "",
                  'i': false
                };
                _mousePos2.x = (newX - state.svg_width) / state.max_times;
                _mousePos2.y = (newY - state.svg_height) / state.max_times;
                app.updateObjectSeatPoints(_currentZone, state.mappingArea, _mousePos2);
                var xTemp = ci * Math.cos(alpha);
                var yTemp = Math.sqrt(ci * ci - xTemp * xTemp);
                newX = state.autoDraw.points[0].x + xTemp;

                if (state.autoDraw.points[1].y > state.autoDraw.points[0].y) {
                  newY = state.autoDraw.points[0].y + yTemp;
                } else {
                  newY = state.autoDraw.points[0].y - yTemp;
                }

                _i++;
                ci += interval;
              }

              state.mapping = false;
              state.autoDraw.active = false;
              state.autoDraw.count = "";
              state.autoDraw.points = [];
            }
          }
        }
      }, false);
      domElements.container.addEventListener('mouseleave', function () {
        cursor_position_info.empty();
      }, false);
      domElements.seat_mapping.addEventListener('mouseleave', function () {
        cursor_position_info.empty();
      }, false);

      function onSvgMouseover(e) {
        if (e.target.parentNode.tagName === 'g' && state.autoAssign) {
          state.mappingArea = e.target.dataset.index;
          if (state.mappingArea === undefined) return;
          if (state.mappingAreaPrev == state.mappingArea) return;
          if (state.mappingAreaPrev === undefined) state.mappingAreaPrev = state.mappingArea;
          var cr = $("#cr" + state.mappingArea);
          var tr = $("#tx" + state.mappingAreaPrev);
          cr.addClass("assign");
          var currentZone = app.getSelectedArea();
          var mousePos = app.getObjectSeatPoints(currentZone, state.mappingArea);
          if (!mousePos) mousePos = {
            'x': 0,
            'y': 0,
            'r': '',
            't': '',
            'p': '',
            i: false
          };

          if (state.autoAssignRT.length > 0) {
            mousePos.r = state.autoAssignRT[0].r;
            mousePos.t = state.autoAssignRT[0].t;
            mousePos.p = state.autoAssignRT[0].p;
          }

          if (mousePos.t == null) mousePos.t = tr.html();
          var seatNumber = parseInt(mousePos.t) + 1;
          $("#tx" + state.mappingArea).html(parseInt(mousePos.t));
          state.autoAssignRT = [];
          state.autoAssignRT.push({
            r: mousePos.r,
            t: seatNumber,
            p: mousePos.p
          });
          app.updateObjectSeatPoints(currentZone, state.mappingArea, mousePos);
          state.mappingAreaPrev = state.mappingArea;
          if (state.timer1) clearTimeout(state.timer1);
          state.timer1 = setTimeout(function () {
            $(".cr").removeClass("assign");
            state.autoAssign = false;
            state.autoAssignRT = [];
          }, 2000);
        }
      }

      function onSvgMousedown(e) {
        if (state.appMode === 'editing') {
          if (e.target.parentNode.tagName === 'g') {
            info.unload();
            state.selectedArea = e.target.parentNode.obj;
            app.deselectAll();
            state.selectedArea.select();
            state.selectedArea.editingStartPoint = {
              x: e.pageX,
              y: e.pageY
            };

            if (e.target.classList.contains('helper')) {
              var helper = e.target;
              state.editType = helper.action;

              if (helper.n >= 0) {
                state.selectedArea.selected_point = helper.n;
              }

              app.addEvent(app.domElements.container, 'mousemove', state.selectedArea.onProcessEditing.bind(state.selectedArea)).addEvent(app.domElements.container, 'mouseup', state.selectedArea.onStopEditing.bind(state.selectedArea));
            } else if (e.target.tagName === 'rect' || e.target.tagName === 'circle' || e.target.tagName === 'polygon') {
              state.editType = 'move';
              app.addEvent(app.domElements.container, 'mousemove', state.selectedArea.onProcessEditing.bind(state.selectedArea)).addEvent(app.domElements.container, 'mouseup', state.selectedArea.onStopEditing.bind(state.selectedArea));
            }
          } else {
            app.deselectAll();
            info.unload();
          }
        } else if (state.appMode === 'seating') {
          if (e.target.parentNode.tagName === 'g') {
            info.unload();
            state.selectedArea = e.target.parentNode.obj;
            app.deselectAll();
            state.selectedArea.select();
            state.selectedArea.editingStartPoint = {
              x: e.pageX,
              y: e.pageY
            };
            var pid = e.target.parentNode.dataset.id;
            $("#kenzap_seat_map").attr('data-id', pid);
            $("#zone_title").val(app.getObjectSeats(app.getSelectedArea(), "title"));
            $("#zone_tws").val(app.getObjectSeats(app.getSelectedArea(), "tws"));
            $("#zone_tns").val(app.getObjectSeats(app.getSelectedArea(), "tns"));
            $("#zone_price").val(app.getObjectSeats(app.getSelectedArea(), "price"));
            $("#zone_bgi").val("");
            $("#zone_bg").attr("src", "https://cdn.kenzap.com/loading.png");
            $(".remove").css("display", "none");
            var bg = app.getObjectSeats(app.getSelectedArea(), "bg");
            if (bg === undefined) bg = "";

            if (bg.length > 12) {
              $("#zone_bgi").val(bg);
              $("#zone_bg").attr("src", bg);
              $(".remove").css("display", "inline-block");
              $(".remove").off();
              $(".remove").on('click', function () {
                var c = confirm("Remove background image?");
                if (!c) return;
                $("#loader").fadeIn("fast");
                var fd = new FormData();
                var id = utils.getUrlParameter('id') + "-" + pid;
                fd.append('id', id);
                fd.append('cmd', 'remove_image');
                fd.append('type', 'myticket');
                fd.append('token', utils.getCookie('kenzap_token'));
                $.ajax({
                  url: 'https://fileapi.kenzap.com/v1/',
                  cmd: 'remove_image',
                  type: 'post',
                  data: fd,
                  contentType: false,
                  processData: false,
                  success: function success(response) {
                    var js = response;

                    if (js.success) {
                      $("#zone_bgi").val("");
                      $("#zone_bg").attr("src", "https://cdn.kenzap.com/loading.png");
                      $("#loader").fadeOut("fast");
                    } else {
                      alert("Unable to save: " + js.reason);
                    }
                  }
                });
              });
            }

            $('#zone_bg').off();
            $('.bg-file').off();
            $(".bg-file").val(null);
            $('#zone_bg').on('click', function () {
              $(".bg-file").trigger("click");
            });
            $('.bg-file').on('change', function (e) {
              var input = this;

              if (input.files && input.files[0]) {
                var file = input.files[0];
                var fd = new FormData();
                var id = utils.getUrlParameter('id') + "-" + pid;
                fd.append('file', file);
                fd.append('id', id);
                fd.append('cmd', 'store_image');
                fd.append('type', 'myticket');
                fd.append('token', utils.getCookie('kenzap_token'));
                $("#loader").fadeIn("fast");
                $.ajax({
                  url: 'https://fileapi.kenzap.com/v1/',
                  cmd: 'store_image',
                  type: 'post',
                  data: fd,
                  contentType: false,
                  processData: false,
                  success: function success(response) {
                    var js = response;

                    if (js.success) {
                      setTimeout(function () {
                        var dt = new Date();
                        var filename = 'https://cdn.kenzap.com/myticket/' + id + '.jpeg?' + dt.getTime();
                        $("#zone_bgi").val(filename);
                        $("#zone_bg").attr("src", filename);
                        app.updateObjectSeats(app.getSelectedArea(), "bg", filename);
                        $("#loader").fadeOut("fast");
                      }, 5000);
                    } else {
                      alert("Unable to save: " + js.reason);
                    }
                  }
                });
              }
            });
            document.querySelector('.form-group-custom').innerHTML = '';
            document.querySelector('.form-price-custom').innerHTML = '';
            if (typeof state.cfs === 'undefined') state.cfs = [];
            if (typeof state.pcfs === 'undefined') state.pcfs = [];
            state.cfs.map(function (obj) {
              var cf_html = app.structCustomField(obj);
              document.querySelector('.form-group-custom').appendChild(cf_html);
              $("#" + obj.id).val(app.getObjectSeats(app.getSelectedArea(), obj.id));
            });
            $("#zone_price").fadeIn(0);
            state.pcfs.map(function (obj) {
              var cf_html = app.structPriceField(obj);
              document.querySelector('.form-price-custom').appendChild(cf_html);
              $("#" + obj.id).val(app.getObjectSeats(app.getSelectedArea(), obj.id));
              $("#zone_price").fadeOut(0);
            });
            if (!state.cfs_listener) document.querySelector('#zone_add_field').addEventListener('click', function (e) {
              var index = 0;

              var _iterator2 = _createForOfIteratorHelper(document.querySelectorAll('.form-group-custom .custom-field')),
                  _step2;

              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  var cf = _step2.value;
                  if (parseInt(cf.dataset.index) > index) index = parseInt(cf.dataset.index);
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }

              index += 1;
              var obj = {
                id: 'cf' + index,
                index: index,
                label: 'Custom field',
                value: ''
              };
              var cf_html = app.structCustomField(obj);
              document.querySelector('.form-group-custom').appendChild(cf_html);
              state.cfs.push(obj);
              e.preventDefault();
            }, false);
            if (!state.cfs_listener) document.querySelector('#zone_add_price').addEventListener('click', function (e) {
              var index = 0;

              var _iterator3 = _createForOfIteratorHelper(document.querySelectorAll('.form-price-custom .custom-price-field')),
                  _step3;

              try {
                for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                  var cf = _step3.value;
                  if (parseInt(cf.dataset.index) > index) index = parseInt(cf.dataset.index);
                }
              } catch (err) {
                _iterator3.e(err);
              } finally {
                _iterator3.f();
              }

              index += 1;
              var obj = {
                id: 'pcf' + index,
                index: index,
                label: 'Price variation',
                value: ''
              };
              var cf_html = app.structPriceField(obj);
              document.querySelector('.form-price-custom').appendChild(cf_html);
              $("#zone_price").fadeOut(0);
              state.pcfs.push(obj);
              e.preventDefault();
            }, false);
            state.cfs_listener = 'attached';
            var modal = document.querySelector("#kenzap_seat_map");
            var modalCont = new bootstrap.Modal(modal);
            modalCont.show();
          }
        } else if (state.appMode === 'mapping') {
          if (e.target.parentNode.tagName === 'g') {
            info.unload();
            state.mappingArea = e.target.dataset.index;
            state.moved = false;
            state.mapping = true;
            var cr = $("#cr" + state.mappingArea);
            cr.offset();
            $(".cr").removeClass("selected");
            cr.addClass("selected").removeClass("align");

            if (state.autoAlign) {
              cr.addClass("align");
              if (!state.autoAlignXY) state.autoAlignXY = [];
              state.autoAlignXY.push({
                x: parseInt(cr.attr("cx")),
                y: parseInt(cr.attr("cy"))
              });
              autoAlignRow();
            }

            state.autoAlign = false;
            app.deselectAll();
          } else {
            app.deselectAll();
            info.unload();
          }
        }
      }

      domElements.container.addEventListener('mousedown', onSvgMousedown, false);
      domElements.seat_mapping.addEventListener('mousedown', onSvgMousedown, false);
      domElements.seat_mapping.addEventListener('mouseover', onSvgMouseover, false);

      function onSvgClick(e) {
        if (state.appMode === 'drawing' && !state.isDraw && state.currentType) {
          code.hide();
          app.setIsDraw(true);
          state.newArea = Polygon.createAndStartDrawing(app, utils.getRightCoords(e.pageX, e.pageY));
        }
      }

      domElements.container.addEventListener('click', onSvgClick, false);

      var autoAlignRow = function autoAlignRow() {
        if (state.autoAlignXY.length > 1) {
          var a,
              b,
              alpha,
              i = 0;

          if (state.autoAlignXY[0].x > state.autoAlignXY[1].x) {
            var tmp = state.autoAlignXY;
            state.autoAlignXY[0] = tmp[1];
            state.autoAlignXY[1] = tmp[0];
          }

          a = state.autoAlignXY[1].x - state.autoAlignXY[0].x;
          b = Math.abs(state.autoAlignXY[1].y - state.autoAlignXY[0].y);
          alpha = Math.atan(b / a);
          var toAlign = [];
          $(".cr").each(function (index) {
            var cx = parseInt($(this).attr("cx"));
            var cy = parseInt($(this).attr("cy"));

            if (cx - state.autoAlignXY[0].x > 0 && state.autoAlignXY[1].x - cx > 0 && (cy >= state.autoAlignXY[1].y && cy <= state.autoAlignXY[0].y || cy <= state.autoAlignXY[1].y && cy >= state.autoAlignXY[0].y || cy == state.autoAlignXY[1].y || cy == state.autoAlignXY[1].y + 1 || cy == state.autoAlignXY[1].y - 1 || cy == state.autoAlignXY[1].y + 2 || cy == state.autoAlignXY[1].y - 2 || cy == state.autoAlignXY[1].y + 3 || cy == state.autoAlignXY[1].y - 3)) {
              var a2 = cx - state.autoAlignXY[0].x;
              var b2 = a2 * Math.tan(alpha);
              console.log("a2 = " + a2 + " b2 = " + b2);
              console.log("cy = " + cy + " y0 = " + (state.autoAlignXY[0].y + " y1 = " + state.autoAlignXY[1].y + " " + b2));
              var y = state.autoAlignXY[1].y < state.autoAlignXY[0].y ? state.autoAlignXY[0].y - b2 : b2 + state.autoAlignXY[0].y;

              if (Math.abs(cy - y) <= 10) {
                toAlign.push($(this).attr('data-index'));
                $(this).addClass("align");
              }
            }
          });
          toAlign.reverse();
          var Xintervals = a / (toAlign.length + 1);
          var xi = state.autoAlignXY[0].x;

          while (i < toAlign.length) {
            xi += Xintervals;
            var newX = xi,
                newY = void 0;

            if (state.autoAlignXY[1].y < state.autoAlignXY[0].y) {
              newY = (state.autoAlignXY[0].x - xi) * Math.tan(alpha) + state.autoAlignXY[0].y;
            } else {
              newY = -1 * ((state.autoAlignXY[0].x - xi) * Math.tan(alpha)) + state.autoAlignXY[0].y;
            }

            var index = $("#cr" + toAlign[i]).attr('data-index');
            console.log("show seats " + " #cr" + toAlign[i]);
            $("#cr" + toAlign[i]).attr("cx", newX);
            $("#tx" + toAlign[i]).attr("x", newX);
            $("#cr" + toAlign[i]).attr("cy", newY);
            $("#tx" + toAlign[i]).attr("y", newY);
            var mousePos = app.getObjectSeatPoints(app.getSelectedArea(), index);
            if (!mousePos) mousePos = {
              'x': 0,
              'y': 0,
              'r': "",
              't': "",
              'p': "",
              i: false
            };
            mousePos.x = (newX - state.svg_width) / state.max_times;
            mousePos.y = (newY - state.svg_height) / state.max_times;
            app.updateObjectSeatPoints(app.getSelectedArea(), index, mousePos);
            i++;
          }

          console.log("align start");
          state.autoAlignXY = [];
          state.autoAlign = false;
          if (state.timer1) clearTimeout(state.timer1);
          state.timer1 = setTimeout(function () {
            $(".cr").removeClass("align");
            state.autoAlign = false;
          }, 1000);
        }

        if (state.timer2) clearTimeout(state.timer2);
        state.timer2 = setTimeout(function () {
          $(".cr").removeClass("align");
          state.autoAlign = false;
          state.autoAlignXY = [];
          console.log("align stoped");
        }, 2000);
      };

      var move1PX = function move1PX(to, area) {
        var x = parseInt($("#cr" + state.mappingArea).attr("cx"));
        var y = parseInt($("#cr" + state.mappingArea).attr("cy"));
        var i = $("#cr" + state.mappingArea).attr("data-index");

        switch (to) {
          case KEYS.TOP:
            y -= 1;
            break;

          case KEYS.BOTTOM:
            y += 1;
            break;

          case KEYS.LEFT:
            x -= 1;
            break;

          case KEYS.RIGHT:
            x += 1;
            break;
        }

        $("#cr" + state.mappingArea).attr("cx", x);
        $("#cr" + state.mappingArea).attr("cy", y);
        $("#tx" + state.mappingArea).attr("x", x);
        $("#tx" + state.mappingArea).attr("y", y);
        var currentZone = app.getSelectedArea();
        var mousePos = app.getObjectSeatPoints(currentZone, i);
        if (!mousePos) mousePos = {
          'x': 0,
          'y': 0,
          'r': "",
          't': "",
          'p': "",
          i: false
        };
        mousePos.x = (x - state.svg_width) / state.max_times;
        mousePos.y = (y - state.svg_height) / state.max_times;
        app.updateObjectSeatPoints(app.getSelectedArea(), i, mousePos);
      };

      function onDocumentKeyDown(e) {
        var ctrlDown = e.ctrlKey || e.metaKey;

        if (e.keyCode > 47 && e.keyCode < 58 && state.autoDraw.active) {
          state.autoDraw.count += e.keyCode - 48 + "";
        }

        switch (e.keyCode) {
          case KEYS.H:
          case KEYS.F1:
            break;

          case KEYS.A:
            if (state.appMode === 'mapping' && state.selectedArea) {
              console.log('KEY A');
              state.autoAlign = true;
              if (state.timer1) clearTimeout(state.timer1);
              state.timer1 = setTimeout(function () {
                state.autoAlign = false;
              }, 1000);
            }

            break;

          case KEYS.D:
            if (state.appMode === 'mapping' && state.selectedArea) {
              console.log("draw mode");
              state.autoDraw.count = "";
              state.autoDraw.active = true;
              state.autoDraw.points = [];
              if (state.timer1) clearTimeout(state.timer1);
              state.timer1 = setTimeout(function () {
                state.autoDraw.count = "";
                state.autoDraw.active = false;
              }, 10000);
            }

            break;

          case KEYS.Q:
            if (state.appMode === 'mapping' && state.selectedArea) {
              state.autoAssign = state.autoAssign ? false : true;
              console.log("assign " + state.autoAssign);
            }

            break;

          case KEYS.ESC:
            if (state.isDraw) {
              state.isDraw = false;
              state.newArea.remove();
              state.areas.pop();
              app.removeAllEvents();
            } else if (state.appMode === 'editing') {
              state.selectedArea.redraw();
              app.removeAllEvents();
            }

            break;

          case KEYS.TOP:
            if (state.appMode === 'mapping') {
              move1PX(KEYS.TOP);
            }

            if (state.appMode === 'editing' && state.selectedArea) {
              state.selectedArea.move(0, -1);
              e.preventDefault();
            }

            break;

          case KEYS.BOTTOM:
            if (state.appMode === 'mapping') {
              move1PX(KEYS.BOTTOM);
            }

            if (state.appMode === 'editing' && state.selectedArea) {
              state.selectedArea.move(0, 1);
              e.preventDefault();
            }

            break;

          case KEYS.LEFT:
            if (state.appMode === 'mapping') {
              move1PX(KEYS.LEFT);
            }

            if (state.appMode === 'editing' && state.selectedArea) {
              state.selectedArea.move(-1, 0);
              e.preventDefault();
            }

            break;

          case KEYS.RIGHT:
            if (state.appMode === 'mapping') {
              move1PX(KEYS.RIGHT);
            }

            if (state.appMode === 'editing' && state.selectedArea) {
              state.selectedArea.move(1, 0);
              e.preventDefault();
            }

            break;

          case KEYS.DELETE:
            if (state.appMode === 'editing' && state.selectedArea) {
              app.removeObject(state.selectedArea);
              state.selectedArea = null;
              info.unload();
            }

            break;

          case KEYS.DEL_MAC:
            if (state.appMode === 'editing' && state.selectedArea) {
              app.removeObject(state.selectedArea);
              state.selectedArea = null;
              info.unload();
            }

            break;

          case KEYS.S:
            if (ctrlDown) {
              app.saveInLocalStorage();
            }

            break;

          case KEYS.C:
            if (state.appMode === 'editing' && state.selectedArea && ctrlDown) {
              e.preventDefault();
              console.log('KEYS.C');
              state.selectedArea = state.selectedArea.copy(areasIO, state.selectedArea);
            }

            break;

          case KEYS.U:
            console.log('KEY U');

            if (state.appMode === 'editing' && state.selectedArea && ctrlDown) {
              e.preventDefault();
              state.selectedArea = state.selectedArea.rotate(state.selectedArea, 1);
            }

            break;

          case KEYS.J:
            console.log('KEY J');

            if (state.appMode === 'editing' && state.selectedArea && ctrlDown) {
              e.preventDefault();
              state.selectedArea = state.selectedArea.rotate(state.selectedArea, -1);
            }

            break;

          case KEYS.Z:
            console.log('KEY Z');

            if (state.appMode === 'mapping' && ctrlDown) {
              var prevArea = state.updateObjectSeatPointsHistory.pop();
              if (prevArea === undefined) return;
              state.selectedArea._seats = prevArea.seats;
              app.createMappingPolygon();
              e.preventDefault();
            }

            break;
        }
      }

      document.addEventListener('keydown', onDocumentKeyDown, false);
      var areasIO = {
        toJSON: function toJSON() {
          var obj = {
            areas: [],
            img: state.image.src,
            img_width: $("#svg").width(),
            cfs: [],
            pcfs: []
          };
          state.areas.map(function (x) {
            obj.areas.push(x.toJSON());
          });
          if (state.cfs === undefined) state.cfs = [];
          obj.cfs = JSON.parse(JSON.stringify(state.cfs));
          if (state.pcfs === undefined) state.pcfs = [];
          obj.pcfs = JSON.parse(JSON.stringify(state.pcfs));
          return JSON.stringify(obj);
        },
        fromJSON: function fromJSON(str) {
          var obj = JSON.parse(str);
          app.loadImage(obj.img);
          obj.areas.map(function (areaParams) {
            app.fromJSONArea(areaParams);
          });
        }
      };

      var localStorageWrapper = function () {
        var KEY_NAME = 'seatMapCreator';
        return {
          save: function save() {
            var result = areasIO.toJSON();
            window.localStorage.setItem(KEY_NAME, result);
            $("#loader").fadeIn("fast");
            var fd = new FormData();
            fd.append('id', utils.getUrlParameter('id'));
            fd.append('cmd', 'save_layout');
            fd.append('extra', result);
            $.ajax({
              url: 'https://api.kenzap.com/myticket/',
              headers: {
                'Kenzap-Token': utils.getCookie('kenzap_token')
              },
              type: 'post',
              data: fd,
              contentType: false,
              processData: false,
              success: function success(response) {
                var js = response;

                if (js.success) {
                  if (!state.silent) {
                    $("#loader").fadeOut("fast");
                    var toast = new bootstrap.Toast(document.querySelector('.toast'));
                    document.querySelector('.toast .toast-body').innerHTML = 'Changes saved to database';
                    toast.show();
                  }

                  state.silent = false;
                  $("#loader").fadeOut("fast");
                } else {
                  alert(js.reason);
                }
              }
            });
          },
          restore: function restore() {
            console.log("restoring");
            areasIO.fromJSON(window.localStorage.getItem(KEY_NAME));
          }
        };
      }();

      return {
        domElements: domElements,
        saveInLocalStorage: localStorageWrapper.save,
        loadFromLocalStorage: localStorageWrapper.restore,
        hide: function hide() {
          utils.hide(domElements.container);
          return this;
        },
        show: function show() {
          utils.show(domElements.container);
          return this;
        },
        recalcOffsetValues: function recalcOffsetValues() {
          _recalcOffsetValues();

          return this;
        },
        setDimensions: function setDimensions(width, height) {
          domElements.svg.setAttribute('width', width);
          domElements.svg.setAttribute('height', height);
          domElements.container.style.width = width + 'px';
          domElements.container.style.height = height + 'px';
          return this;
        },
        structCustomField: function structCustomField(obj) {
          var cf_html = document.createElement('div');
          cf_html.className = 'custom-field form-group mb-3';
          cf_html.dataset.index = obj.index;
          var label = document.createElement('label');
          label.setAttribute('for', 'cf' + obj.index);
          var input = document.createElement('input');
          input.value = obj.label;
          input.className = 'cfl';
          input.setAttribute("autocomplete", 'off');
          var icon = document.createElement('span');
          icon.className = 'mdi mdi-trash-can-outline text-danger delete-cfl';
          icon.innerHTML = '\
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">\
                       <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>\
                       <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>\
                   </svg>';
          icon.dataset.type = 'remove';
          icon.dataset.index = obj.index;
          var input2 = document.createElement('input');
          input2.id = 'cf' + obj.index;
          input2.className = 'cf form-control';
          input2.setAttribute("autocomplete", "off");
          icon.addEventListener('click', function (e) {
            switch (e.currentTarget.dataset.type) {
              case 'remove':
                var c = confirm('Remove this field and its values for all zones?');

                if (c) {
                  state.cfs = state.cfs.filter(function (obj) {
                    return obj.index != e.target.dataset.index;
                  });
                  console.log(state.cfs);
                  e.target.parentNode.parentNode.parentNode.remove();
                }

                break;
            }

            e.preventDefault();
          });
          input.addEventListener('input', function (e) {
            state.cfs = state.cfs.map(function (obj) {
              console.log(obj.index + ' ' + e.target.parentNode.parentNode.dataset.index);

              if (obj.index == parseInt(e.target.parentNode.parentNode.dataset.index)) {
                obj.label = e.target.value;
              }

              console.log(obj);
              return obj;
            });
            e.preventDefault();
          });
          input2.addEventListener('input', function (e) {
            e.preventDefault();
          });
          label.appendChild(input);
          label.appendChild(icon);
          cf_html.appendChild(label);
          cf_html.appendChild(input2);
          return cf_html;
        },
        structPriceField: function structPriceField(obj) {
          var cf_html = document.createElement('div');
          cf_html.className = 'custom-price-field form-group mb-3';
          cf_html.dataset.index = obj.index;
          var label = document.createElement('label');
          label.setAttribute('for', 'pcf' + obj.index);
          var input = document.createElement('input');
          input.value = obj.label;
          input.className = 'pcfl';
          input.setAttribute("autocomplete", 'off');
          var icon = document.createElement('span');
          icon.className = 'mdi mdi-trash-can-outline text-danger delete-pcfl';
          icon.innerHTML = '\
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">\
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>\
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>\
                    </svg>';
          icon.dataset.type = 'remove';
          icon.dataset.index = obj.index;
          var input2 = document.createElement('input');
          input2.id = 'pcf' + obj.index;
          input2.className = 'pcf form-control';
          input2.setAttribute("autocomplete", "off");
          input2.setAttribute("type", "number");
          icon.addEventListener('click', function (e) {
            switch (e.target.dataset.type) {
              case 'remove':
                var c = confirm('Remove this variation and its values for all zones?');

                if (c) {
                  state.pcfs = state.pcfs.filter(function (obj) {
                    return obj.index != e.target.dataset.index;
                  });
                  console.log(state.pcfs);
                  e.target.parentNode.parentNode.parentNode.remove();

                  if (state.pcfs == 0) {
                    $("#zone_price").fadeIn(0);
                  }
                }

                break;
            }

            e.preventDefault();
          });
          input.addEventListener('input', function (e) {
            state.pcfs = state.pcfs.map(function (obj) {
              console.log(obj.index + ' ' + e.target.parentNode.parentNode.dataset.index);

              if (obj.index == parseInt(e.target.parentNode.parentNode.dataset.index)) {
                obj.label = e.target.value;
              }

              console.log(obj);
              return obj;
            });
            e.preventDefault();
          });
          input2.addEventListener('input', function (e) {
            e.preventDefault();
          });
          label.appendChild(input);
          label.appendChild(icon);
          cf_html.appendChild(label);
          cf_html.appendChild(input2);
          return cf_html;
        },
        loadImage: function loadImage(url) {
          get_image.showLoadIndicator();
          domElements.img.src = url;
          state.image.src = url;

          domElements.img.onload = function () {
            get_image.hideLoadIndicator().hide();
            app.show().setDimensions(domElements.img.width, domElements.img.height).recalcOffsetValues();
            $("#polygon").trigger("click");
          };

          return this;
        },
        preview: function () {
          domElements.img.setAttribute('usemap', '#map');
          domElements.map = document.createElement('map');
          domElements.map.setAttribute('name', 'map');
          domElements.container.appendChild(domElements.map);
          return function () {
            info.unload();
            app.setShape(null);
            utils.hide(domElements.svg);
            domElements.map.innerHTML = app.getHTMLCode();
            code.print();
            return this;
          };
        }(),
        hidePreview: function hidePreview() {
          utils.show(domElements.svg);
          domElements.map.innerHTML = '';
          return this;
        },
        addNodeToSvg: function addNodeToSvg(node) {
          domElements.svg.appendChild(node);
          return this;
        },
        removeNodeFromSvg: function removeNodeFromSvg(node) {
          domElements.svg.removeChild(node);
          return this;
        },
        getOffset: function getOffset(arg) {
          switch (arg) {
            case 'x':
            case 'y':
              return state.offset[arg];
          }
        },
        clear: function clear() {
          state.areas.length = 0;

          while (domElements.svg.childNodes[0]) {
            domElements.svg.removeChild(domElements.svg.childNodes[0]);
          }

          code.hide();
          info.unload();
          return this;
        },
        removeObject: function removeObject(obj) {
          state.areas.map(function (x, i) {
            if (x === obj) {
              state.areas.splice(i, 1);
            }
          });
          obj.remove();
          return this;
        },
        updateObjectSeats: function updateObjectSeats(obj, key, value) {
          state.areas.map(function (x, i) {
            if (x === obj) {
              state.areas[i]._seats[key] = value;
            }
          });
          return this;
        },
        getObjectSeats: function getObjectSeats(obj, key) {
          var temp = '';
          state.areas.map(function (x, i) {
            if (x === obj) {
              if (typeof state.areas[i]._seats === "undefined") state.areas[i]._seats = {};
              temp = state.areas[i]._seats[key];
            }
          });
          return temp;
        },
        updateObjectSeatPoints: function updateObjectSeatPoints(obj, key, value) {
          var _this = this;

          state.areas.map(function (x, i) {
            if (x === obj) {
              state.updateObjectSeatPointsHistory.push(JSON.parse(JSON.stringify(state.areas[i])));
              if (state.updateObjectSeatPointsHistory.legth > 25) state.updateObjectSeatPointsHistory.shift();
              if (typeof value.x !== 'undefined') value.x = parseInt(value.x * 1000) / 1000;
              if (typeof value.y !== 'undefined') value.y = parseInt(value.y * 1000) / 1000;

              if (typeof value.t === 'undefined') {
                value.t = parseInt(key) + 1;
              }

              if (value.t == null) {
                value.t = parseInt(key) + 1;
              }

              if (value.t == '') {
                value.t = parseInt(key) + 1;
              }

              value.t = value.t + "";
              if (typeof value.p !== 'undefined') value.p = value.p + '';
              if (typeof value.r !== 'undefined') value.r = value.r + '';
              var polygonPoints = document.querySelector('#svg_mapping_cont polygon').getAttribute('points').split(" ");
              var polygonPointsArr = [];

              for (var _x = 0; _x < polygonPoints.length; _x += 2) {
                polygonPointsArr.push({
                  x: parseFloat(polygonPoints[_x]),
                  y: parseFloat(polygonPoints[_x + 1])
                });
              }

              var seatPointX = parseInt(document.querySelector('#cr' + key).getAttribute('cx'));
              var seatPointY = parseInt(document.querySelector('#cr' + key).getAttribute('cy'));
              value.i = _this.isPointInsidePolygon([seatPointX, seatPointY], polygonPointsArr);
              document.querySelector('#cr' + key).setAttribute('data-inside', value.i);
              document.querySelector('#tx' + key).setAttribute('data-inside', value.i);
              console.log(value);
              state.areas[i]._seats.points[key] = value;
            }
          });
          return this;
        },
        getObjectSeatPoints: function getObjectSeatPoints(obj, key) {
          var temp = '';
          state.areas.map(function (x, i) {
            if (x === obj) {
              temp = state.areas[i]._seats.points[key];
            }
          });
          return temp;
        },
        isPointInsidePolygon: function isPointInsidePolygon(point, vs) {
          var x = point[0],
              y = point[1];
          var inside = false;

          for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
            var xi = vs[i].x,
                yi = vs[i].y;
            var xj = vs[j].x,
                yj = vs[j].y;
            var intersect = yi > y != yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
            if (intersect) inside = !inside;
          }

          return inside;
        },
        setSilent: function setSilent(tr) {
          state.silent = tr;
        },
        resetAreaSeats: function resetAreaSeats() {
          state.updateObjectSeatPointsHistory.push(JSON.parse(JSON.stringify(state.selectedArea)));
          state.selectedArea._seats.points = [];
          app.createMappingPolygon();
        },
        updateSeatNumber: function updateSeatNumber() {
          if (app.getSelectedArea()) {
            var points = app.getObjectSeatPoints(app.getSelectedArea(), $("#seat_text_in").data("index"));
            points.t = $("#seat_text_in").val();
            $("#tx" + $("#seat_text_in").data("index")).html($("#seat_text_in").val());
            app.updateObjectSeatPoints(app.getSelectedArea(), $("#seat_text_in").data("index"), points);
          }
        },
        updateSeatRow: function updateSeatRow() {
          if (app.getSelectedArea()) {
            var points = app.getObjectSeatPoints(app.getSelectedArea(), $("#seat_text_in").data("index"));
            points.r = $("#seat_row_in").val();
            app.updateObjectSeatPoints(app.getSelectedArea(), $("#seat_row_in").data("index"), points);
          }
        },
        updateSeatPrice: function updateSeatPrice() {
          if (app.getSelectedArea()) {
            var points = app.getObjectSeatPoints(app.getSelectedArea(), $("#seat_text_in").data("index"));
            points.p = $("#seat_price_in").val();
            app.updateObjectSeatPoints(app.getSelectedArea(), $("#seat_price_in").data("index"), points);
          }
        },
        getLayout: function getLayout() {
          return state.areas;
        },
        exportSeats: function exportSeats() {
          var result = areasIO.toJSON();
          document.querySelector("#exportTextArea").innerHTML = result;
          var modal = document.querySelector("#kenzap_export");
          var modalCont = new bootstrap.Modal(modal);
          modalCont.show();
        },
        importSeats: function importSeats() {
          try {
            var html = $("#importTextArea").val();
            console.log(html);
            html = html.trim();
            var json = JSON.parse(html);
            app.loadLayout('-', json);
            $("#kenzap_export").modal("hide");
          } catch (e) {
            console.log(e);
            alert("Error parsing JSON structure");
          }
        },
        deselectAll: function deselectAll() {
          state.areas.map(function (x) {
            x.deselect();
          });
          return this;
        },
        getIsDraw: function getIsDraw() {
          return state.isDraw;
        },
        setIsDraw: function setIsDraw(arg) {
          state.isDraw = arg;
          return this;
        },
        setMode: function setMode(arg) {
          state.appMode = arg;
          return this;
        },
        getMode: function getMode() {
          return state.appMode;
        },
        setShape: function setShape(arg) {
          state.currentType = arg;
          return this;
        },
        getShape: function getShape() {
          return state.currentType;
        },
        addObject: function addObject(object) {
          state.areas.push(object);
          return this;
        },
        getNewArea: function getNewArea() {
          return state.newArea;
        },
        resetNewArea: function resetNewArea() {
          state.newArea = null;
          return this;
        },
        getSelectedArea: function getSelectedArea() {
          return state.selectedArea;
        },
        setSelectedArea: function setSelectedArea(obj) {
          state.selectedArea = obj;
          return this;
        },
        getEditType: function getEditType() {
          return state.editType;
        },
        setFilename: function setFilename(str) {
          state.image.filename = str;
          return this;
        },
        getFilename: function getFilename() {
          return state.image.filename;
        },
        setEditClass: function setEditClass() {
          domElements.container.classList.remove('draw');
          domElements.container.classList.add('edit');
          return this;
        },
        setDrawClass: function setDrawClass() {
          domElements.container.classList.remove('edit');
          domElements.container.classList.add('draw');
          return this;
        },
        setDefaultClass: function setDefaultClass() {
          domElements.container.classList.remove('edit');
          domElements.container.classList.remove('draw');
          return this;
        },
        addEvent: function addEvent(target, eventType, func) {
          state.events.push(new AppEvent(target, eventType, func));
          return this;
        },
        removeAllEvents: function removeAllEvents() {
          state.events.map(function (x) {
            x.remove();
          });
          state.events.length = 0;
          return this;
        },
        getHTMLCode: function getHTMLCode(arg) {
          var html_code = '';

          if (arg) {
            if (!state.areas.length) {
              return '0 objects';
            }

            html_code += utils.encode('<img src="' + state.image.filename + '" alt="" usemap="#map" />') + '<br />' + utils.encode('<map name="map">') + '<br />';
            utils.foreachReverse(state.areas, function (x) {
              html_code += '&nbsp;&nbsp;&nbsp;&nbsp;' + utils.encode(x.toHTMLMapElementString()) + '<br />';
            });
            html_code += utils.encode('</map>');
          } else {
            utils.foreachReverse(state.areas, function (x) {
              html_code += x.toHTMLMapElementString();
            });
          }

          return html_code;
        },
        fromJSONArea: function fromJSONArea(params) {
          var area;

          switch (params.type) {
            case 'polygon':
              area = new Polygon(app, params.coords, params.seats, params.attributes);
              break;

            case 'circle':
              area = new Circle(app, params.coords, params.seats, params.attributes);
              break;

            case 'rectangle':
              area = new Rectangle(app, params.coords, params.seats, params.attributes);
              break;
          }

          if (!area) {
            throw new Error('This area type is not valid');
          }

          app.setIsDraw(true);
          app.setIsDraw(false).resetNewArea();
          return area;
        },
        getJSONCF: function getJSONCF() {
          return state.cfs;
        },
        fromJSONCF: function fromJSONCF(cfs) {
          state.cfs = cfs;
        },
        getJSONPCF: function getJSONPCF() {
          return state.pcfs;
        },
        fromJSONPCF: function fromJSONPCF(pcfs) {
          state.pcfs = pcfs;
        },
        foreach: function foreach(arr, cb) {
          for (var i = 0, count = arr.length; i < count; i++) {
            cb(arr[i], i);
          }
        },
        loadLayout: function loadLayout(legacy_img, layout) {
          var img = new Image();
          img.src = legacy_img == '-' ? layout.img : 'https://cdn.kenzap.com/myticket/' + legacy_img;

          img.onload = function () {
            hideLoader();
            app.loadImage(img.src).setFilename(img.src);
            app.fromJSONCF(layout.cfs);
            app.fromJSONPCF(layout.pcfs);
            layout.areas.map(function (areaParams) {
              app.fromJSONArea(areaParams);
            });
            $("#polygon").trigger("click");
          };
        },
        createMappingPolygon: function createMappingPolygon() {
          var svg_mapping = $("#svg_mapping");
          var img_section = $("#img_section");
          var svg_width = $(window).width() - 100;
          var svg_height = $(window).height() - 100;
          var currentZone = app.getSelectedArea();
          $("#seat_mapping, #top_toolbar, #seat_notice").fadeIn();
          $("#seat_row,#seat_text,#seat_price").fadeOut(0);
          $("#seat_text_vis_cb").off("click");
          $("#seat_text_vis_cb").click(function (e) {
            if ($(this).is(':checked')) {
              $("body").addClass("stv");
            } else {
              $("body").removeClass("stv");
            }
          });
          svg_mapping.html("");
          var height_slider;

          if ($("#ul-slider-5").length) {
            height_slider = currentZone._seats.height;

            if (!height_slider) {
              height_slider = 100;
            }

            var startSlider = document.getElementById('ul-slider-5');
            if (startSlider.noUiSlider) startSlider.noUiSlider.destroy();
            noUiSlider.create(startSlider, {
              start: [height_slider],
              connect: [true, false],
              range: {
                'min': [25],
                'max': [125]
              }
            }, true);
            startSlider.noUiSlider.on('slide', function (values, handle, unencoded, tap, positions) {
              console.log(parseInt(values[0]));
              app.updateObjectSeats(app.getSelectedArea(), "height", parseInt(values[0]));
              $(".cr").each(function (index) {
                $(this).attr("r", svg_mapping.attr("data-height") * (parseInt(values[0]) / 100));
              });
            });
          }

          var x = 0,
              y = 0,
              xc = 0,
              yc = 0,
              i = 0;

          currentZone._coords.points.map(function (item) {
            i++;
            x += item.x;
            y += item.y;
            return item;
          });

          xc = x / i;
          yc = y / i;
          var yl = 0,
              xl = 0,
              max_times = 1;
          currentZone._coords.points_rel = [];
          currentZone._coords.points.map(function (item) {
            var temp = Math.abs(xc - item.x);
            temp = Math.abs(xc - item.x);
            xl = temp > xl ? temp : xl;
            temp = Math.abs(yc - item.y);
            yl = temp > yl ? temp : yl;

            currentZone._coords.points_rel.push({
              x: item.x - xc,
              y: item.y - yc
            });
          });
          svg_mapping.css("width", svg_width);
          svg_mapping.css("height", svg_height);
          var max_x = svg_width / 2 / xl;
          var max_y = svg_height / 2 / yl;
          max_times = max_x < max_y ? max_x : max_y;
          max_x = 0;
          max_y = 0;
          var max_x_prev = 0,
              max_y_prev = 0,
              max_first = true,
              max_px = 0,
              min_px = 999999999;

          var polygonPointsAttrValue = currentZone._coords.points_rel.map(function (point) {
            var px = point.x * max_times + svg_width / 2;
            var py = point.y * max_times + svg_height / 2;

            if (!max_first) {
              max_x += max_x_prev * point.y * max_times;
              max_y += max_y_prev * point.x * max_times;
            }

            max_x_prev = point.x * max_times;
            max_y_prev = point.y * max_times;
            max_first = false;
            if (px > max_px) max_px = px;
            if (px < min_px) min_px = px;
            return px + " " + py;
          }).join(' ');

          var g = document.createElementNS(utils.SVG_NS, 'g');
          var polygon = document.createElementNS(utils.SVG_NS, 'polygon');
          polygon.setAttribute('points', polygonPointsAttrValue);
          g.appendChild(polygon);
          svg_mapping.append(g);
          var top = 9999999;

          currentZone._coords.points.map(function (item) {
            if (item.y * max_times < top) {
              top = item.y * max_times;
            }

            return item.x * max_times + " " + item.y * max_times;
          }).join(' ');

          var bg = currentZone._seats.bg;

          if (bg.length > 0) {
            svg_mapping.css('background-image', 'url(' + bg + ')');
            svg_mapping.css('background-position', 'center');
            svg_mapping.css('background-size', max_px - min_px + 'px auto');
            svg_mapping.css('background-repeat', 'no-repeat');
            img_section.attr('src', bg);
          } else {
            svg_mapping.css('background-image', 'none');
          }

          img_section.attr('src', app.getFilename());
          img_section.css('width', parseInt($("#svg").width()) * max_times);
          img_section.css('left', svg_width / 2 - xc * max_times + 80);
          img_section.css('top', svg_height / 2 - yc * max_times + 80);
          var sf = Math.round(Math.abs(max_y - max_x)) / 2;
          var tws = currentZone._seats.tws;
          var price = currentZone._seats.price;
          var height = Math.sqrt(sf / tws);
          svg_mapping.attr('data-height', height / 2);
          height *= parseInt(height_slider) / 100;
          i = 0;

          while (i < tws) {
            var _g = document.createElementNS(utils.SVG_NS, 'g');

            _g.setAttribute('id', "dc" + i);

            _g.setAttribute('data-index', i);

            var circle = document.createElementNS(utils.SVG_NS, 'circle');
            circle.setAttribute('id', "cr" + i);
            circle.setAttribute('cx', height / 2);
            circle.setAttribute('cy', height / 2);
            circle.setAttribute('r', height / 2);
            circle.setAttribute('class', "cr");
            circle.setAttribute('data-index', i);
            circle.setAttribute('data-inside', false);
            var text = document.createElementNS(utils.SVG_NS, 'text');
            text.setAttribute('id', "tx" + i);
            text.setAttribute('x', height / 2);
            text.setAttribute('y', height / 2);
            text.setAttribute('dy', ".3em");
            text.setAttribute('stroke-width', "1px");
            text.setAttribute('text-anchor', "middle");
            text.setAttribute('stroke', "#51c5cf");
            text.setAttribute('data-index', i);
            text.setAttribute('data-inside', false);
            text.setAttribute('data-toggle', "popover");
            text.setAttribute('title', "Seat Settings");
            text.setAttribute('data-content', "test");
            text.setAttribute('data-price', price);
            text.innerHTML = i + 1;

            if (currentZone._seats.points == null) {
              currentZone._seats.points = [];
            }

            if (currentZone._seats.points[i]) {
              var _x2 = currentZone._seats.points[i].x * max_times + svg_width / 2;

              var _y = currentZone._seats.points[i].y * max_times + svg_height / 2;

              var inside = currentZone._seats.points[i].i;
              circle.setAttribute('cx', _x2);
              circle.setAttribute('cy', _y);
              circle.setAttribute('data-inside', inside);
              text.setAttribute('x', _x2);
              text.setAttribute('y', _y);
              text.setAttribute('data-inside', inside);
              if (currentZone._seats.points[i].t) text.innerHTML = currentZone._seats.points[i].t;
            }

            _g.appendChild(circle);

            _g.appendChild(text);

            _g.obj = this;
            svg_mapping.append(_g);
            i++;
          }

          i = 0;
          app.setMode('mapping');
          state.max_times = max_times;
          state.cp.x = xc;
          state.cp.y = yc;
          state.svg_width = svg_width / 2;
          state.svg_height = svg_height / 2;
          $("#svg_mapping").offset();
        }
      };
    }();

    function AppEvent(target, eventType, func) {
      this.target = target;
      this.eventType = eventType;
      this.func = func;
      target.addEventListener(eventType, func, false);
    }

    AppEvent.prototype.remove = function () {
      this.target.removeEventListener(this.eventType, this.func, false);
    };

    var code = function () {
      var block = utils.id('code'),
          content = utils.id('code_content'),
          close_button = block.querySelector('.close_button');
      close_button.addEventListener('click', function (e) {
        utils.hide(block);
        e.preventDefault();
      }, false);
      return {
        print: function print() {
          content.innerHTML = app.getHTMLCode(true);
          utils.show(block);
        },
        hide: function hide() {
          utils.hide(block);
        }
      };
    }();

    var info = function () {
      var form = utils.id('edit_details'),
          header = form.querySelector('h5'),
          href_attr = utils.id('href_attr'),
          alt_attr = utils.id('alt_attr'),
          title_attr = utils.id('title_attr'),
          save_button = utils.id('save_details'),
          close_button = form.querySelector('.close_button'),
          sections = form.querySelectorAll('p'),
          obj,
          x,
          y,
          temp_x,
          temp_y;

      function changedReset() {
        form.classList.remove('changed');
        utils.foreach(sections, function (x) {
          x.classList.remove('changed');
        });
      }

      function save(e) {
        obj.setInfoAttributes({
          id: id_attr.value,
          href: href_attr.value,
          alt: alt_attr.value,
          title: title_attr.value
        });
        obj[obj.href ? 'setStyleOfElementWithHref' : 'unsetStyleOfElementWithHref']();
        changedReset();
        unload();
        e.preventDefault();
      }

      function unload() {
        obj = null;
        changedReset();
        utils.hide(form);
      }

      function setCoords(x, y) {
        form.style.left = x + 5 + 'px';
        form.style.top = y + 5 + 'px';
      }

      function moveEditBlock(e) {
        setCoords(x + e.pageX - temp_x, y + e.pageY - temp_y);
      }

      function stopMoveEditBlock(e) {
        x = x + e.pageX - temp_x;
        y = y + e.pageY - temp_y;
        setCoords(x, y);
        app.removeAllEvents();
      }

      function change() {
        form.classList.add('changed');
        this.parentNode.classList.add('changed');
      }

      save_button.addEventListener('click', save, false);
      href_attr.addEventListener('keydown', function (e) {
        e.stopPropagation();
      }, false);
      alt_attr.addEventListener('keydown', function (e) {
        e.stopPropagation();
      }, false);
      title_attr.addEventListener('keydown', function (e) {
        e.stopPropagation();
      }, false);
      href_attr.addEventListener('change', change, false);
      alt_attr.addEventListener('change', change, false);
      title_attr.addEventListener('change', change, false);
      close_button.addEventListener('click', unload, false);
      header.addEventListener('mousedown', function (e) {
        temp_x = e.pageX, temp_y = e.pageY;
        app.addEvent(document, 'mousemove', moveEditBlock);
        app.addEvent(header, 'mouseup', stopMoveEditBlock);
        e.preventDefault();
      }, false);
      return {
        load: function load(object, new_x, new_y) {
          obj = object;
          href_attr.id = object.id ? object.id : '';
          href_attr.value = object.href ? object.href : '';
          alt_attr.value = object.alt ? object.alt : '';
          title_attr.value = object.title ? object.title : '';
          utils.show(form);

          if (new_x && new_y) {
            x = new_x;
            y = new_y;
            setCoords(x, y);
          }
        },
        unload: unload
      };
    }();

    (function () {
      var form = utils.id('from_html_wrapper'),
          code_input = utils.id('code_input'),
          load_button = utils.id('load_code_button'),
          close_button = form.querySelector('.close_button');

      function load(e) {
        if (Area.createAreasFromHTMLOfMap(code_input.value)) {
          hide();
        }

        e.preventDefault();
      }

      function hide() {
        utils.hide(form);
      }

      load_button.addEventListener('click', load, false);
      close_button.addEventListener('click', hide, false);
      return {
        show: function show() {
          code_input.value = '';
          utils.show(form);
        },
        hide: hide
      };
    })();

    var get_image = function () {
      var block = utils.id('get_image_wrapper'),
          close_button = block.querySelector('.close_button'),
          loading_indicator = utils.id('loading'),
          button = utils.id('button'),
          filename = null,
          last_changed = null;

      var drag_n_drop = function () {
        var dropzone = utils.id('dropzone'),
            dropzone_clear_button = dropzone.querySelector('.clear_button'),
            sm_img = utils.id('sm_img');

        function testFile(type) {
          switch (type) {
            case 'image/jpeg':
            case 'image/gif':
            case 'image/png':
              return true;
          }

          return false;
        }

        dropzone.addEventListener('dragover', function (e) {
          utils.stopEvent(e);
        }, false);
        dropzone.addEventListener('dragleave', function (e) {
          utils.stopEvent(e);
        }, false);
        dropzone.addEventListener('drop', function (e) {
          utils.stopEvent(e);
          var reader = new FileReader(),
              file = e.dataTransfer.files[0];

          if (testFile(file.type)) {
            dropzone.classList.remove('error');
            reader.readAsDataURL(file);

            reader.onload = function (e) {
              sm_img.src = e.target.result;
              sm_img.style.display = 'inline-block';
              filename = file.name;
              utils.show(dropzone_clear_button);
              last_changed = drag_n_drop;
              var fd = new FormData();
              var id = utils.getUrlParameter('id');
              fd.append('file', file);
              fd.append('id', id);
              fd.append('cmd', 'store_image');
              fd.append('type', 'myticket');
              fd.append('token', utils.getCookie('kenzap_token'));
              $("#loader").fadeIn("fast");
              $.ajax({
                url: 'https://fileapi.kenzap.com/v1/',
                cmd: 'store_image',
                type: 'post',
                data: fd,
                contentType: false,
                processData: false,
                success: function success(response) {
                  var js = JSON.parse(response);

                  if (js.success) {
                    setTimeout(function () {
                      var dt = new Date();
                      var filename = 'https://cdn.kenzap.com/myticket/' + id + '.jpeg?' + dt.getTime();
                      $("#img").attr("src", filename);
                      app.loadImage(filename).setFilename(filename);
                      $("#loader").fadeOut("fast");
                    }, 12000);
                  } else {
                    alert("Unable to save: " + js.reason);
                  }
                }
              });
            };
          } else {
            clearDropzone();
            dropzone.classList.add('error');
          }
        }, false);

        function clearDropzone() {
          sm_img.src = '';
          utils.hide(sm_img).hide(dropzone_clear_button);
          dropzone.classList.remove('error');
          last_changed = url_input;
        }

        dropzone_clear_button.addEventListener('click', clearDropzone, false);
        return {
          clear: clearDropzone,
          init: function init() {
            dropzone.draggable = true;
            this.clear();
            utils.hide(sm_img).hide(dropzone_clear_button);
          },
          test: function test() {
            return Boolean(sm_img.src);
          },
          getImage: function getImage() {
            return sm_img.src;
          }
        };
      }();

      var url_input = function () {
        var url = utils.id('url'),
            url_clear_button = url.parentNode.querySelector('.clear_button');

        function testUrl(str) {
          var url_str = str.trim(),
              temp_array = url_str.split('.'),
              ext;

          if (temp_array.length > 1) {
            ext = temp_array[temp_array.length - 1].toLowerCase();

            switch (ext) {
              case 'jpg':
              case 'jpeg':
              case 'gif':
              case 'png':
                return true;
            }
          }

          return false;
        }

        function onUrlChange() {
          setTimeout(function () {
            if (url.value.length) {
              utils.show(url_clear_button);
              last_changed = url_input;
            } else {
              utils.hide(url_clear_button);
              last_changed = drag_n_drop;
            }
          }, 0);
        }

        url.addEventListener('keypress', onUrlChange, false);
        url.addEventListener('change', onUrlChange, false);
        url.addEventListener('paste', onUrlChange, false);

        function clearUrl() {
          url.value = '';
          utils.hide(url_clear_button);
          url.classList.remove('error');
          last_changed = url_input;
        }

        url_clear_button.addEventListener('click', clearUrl, false);
        return {
          clear: clearUrl,
          init: function init() {
            this.clear();
            utils.hide(url_clear_button);
          },
          test: function test() {
            if (testUrl(url.value)) {
              url.classList.remove('error');
              return true;
            } else {
              url.classList.add('error');
            }

            return false;
          },
          getImage: function getImage() {
            var tmp_arr = url.value.split('/');
            filename = tmp_arr[tmp_arr.length - 1];
            return url.value.trim();
          }
        };
      }();

      function init() {
        utils.hide(loading_indicator);
        drag_n_drop.init();
        url_input.init();
        loadLayout();
      }

      init();

      function clear() {
        drag_n_drop.clear();
        url_input.clear();
        last_changed = null;
      }

      function onButtonClick(e) {
        if (last_changed === url_input && url_input.test()) {
          app.loadImage(url_input.getImage()).setFilename(filename);
        } else if (last_changed === drag_n_drop && drag_n_drop.test()) {
          app.loadImage(drag_n_drop.getImage()).setFilename(filename);
        }

        e.preventDefault();
      }

      button.addEventListener('click', onButtonClick, false);
      close_button.addEventListener('click', _hide, false);

      function loadLayout() {
        var fd = new FormData();
        fd.append('id', utils.getUrlParameter('id'));
        fd.append('cmd', 'get_layout');
        $.ajax({
          url: 'https://api.kenzap.com/myticket/',
          type: 'post',
          headers: {
            'Kenzap-Token': utils.getCookie('kenzap_token')
          },
          data: fd,
          contentType: false,
          processData: false,
          success: function success(response) {
            var data = response;

            if (data.success) {
              var legacy_img = data.img;
              if (!legacy_img) legacy_img = '-';

              if (legacy_img != "-" || data.layout.extra.img) {
                app.loadLayout(legacy_img, data.layout.extra);
              } else {
                hideLoader();
              }
            } else {
              hideLoader();

              switch (data.code) {
                case 10:
                  window.location.replace("https://auth.kenzap.com/?app=65432108792785&redirect=https://myticket.kenzap.cloud/");
                  block = true;
                  clearInterval(myTimer);
                  break;

                case 11:
                  alert('Ooops. Something went wrong. Please close this window and try again!');
                  block = true;
                  clearInterval(myTimer);
                  break;
              }

              console.log("Oops! " + data.reason);
            }
          }
        });
      }

      function _show() {
        clear();
        utils.show(block);
      }

      function _hide() {
        utils.hide(block);
      }

      return {
        show: function show() {
          app.hide();

          _show();

          return this;
        },
        hide: function hide() {
          app.show();

          _hide();

          return this;
        },
        showLoadIndicator: function showLoadIndicator() {
          utils.show(loading_indicator);
          return this;
        },
        hideLoadIndicator: function hideLoadIndicator() {
          utils.hide(loading_indicator);
          return this;
        }
      };
    }();

    get_image.show();

    (function () {
      var all = utils.id('nav').getElementsByTagName('li'),
          save = utils.id('save');
          utils.id('load');
          utils.id('rectangle');
          utils.id('circle');
          var polygon = utils.id('polygon'),
          edit = utils.id('edit');
          utils.id('clear');
          utils.id('from_html');
          utils.id('to_html');
          utils.id('preview');
          var new_image = utils.id('new_image');
          utils.id('show_help');
          var seats = utils.id('seats'),
          saveSeatMap = utils.id('saveSeatMap'),
          seat_row = utils.id('seat_row_in'),
          seat_text = utils.id('seat_text_in'),
          seat_price = utils.id('seat_price_in'),
          seat_mapping_close = utils.id('seat_mapping_close'),
          reset_zone = utils.id('reset_zone_btn'),
          export_btn = utils.id('export'),
          import_btn = utils.id('import'),
          stats_btn = utils.id('stats_btn');

      function deselectAll() {
        utils.foreach(all, function (x) {
          x.classList.remove(utils.CLASS_NAMES.SELECTED);
        });
      }

      function selectOne(button) {
        deselectAll();
        button.classList.add(utils.CLASS_NAMES.SELECTED);
      }

      function onSaveButtonClick(e) {
        app.saveInLocalStorage();
        e.preventDefault();
      }

      function onShapeButtonClick(e) {
        $(".btna").removeClass("btn-primary").addClass("btn-outline-primary");
        $("#" + this.id).addClass("btn-primary").removeClass("btn-outline-primary");
        app.setMode('drawing').setDrawClass().setShape(this.id).deselectAll().hidePreview();
        info.unload();
        selectOne(this);
        e.preventDefault();
      }

      function onEditButtonClick(e) {
        $(".btna").removeClass("btn-primary").addClass("btn-outline-primary");
        $("#" + this.id).addClass("btn-primary").removeClass("btn-outline-primary");

        if (app.getMode() === 'editing') {
          app.setMode(null).setDefaultClass().deselectAll();
          deselectAll();
          utils.show(domElements.svg);
        } else {
          app.setShape(null).setMode('editing').setEditClass();
          selectOne(this);
        }

        app.hidePreview();
        e.preventDefault();
      }

      function onSeatsButtonClick(e) {
        $(".btna").removeClass("btn-primary").addClass("btn-outline-primary");
        $("#" + this.id).addClass("btn-primary").removeClass("btn-outline-primary");

        if (app.getMode() === 'seating') {
          app.setMode(null).setDefaultClass().deselectAll();
          deselectAll();
        } else {
          app.setShape(null).setMode('seating').setEditClass();
          selectOne(this);
        }

        app.hidePreview();
        e.preventDefault();
      }

      function onSaveSeatsButtonClick(e) {
        $("#kenzap_seat_map").attr('data-id');
        app.updateObjectSeats(app.getSelectedArea(), "title", $("#zone_title").val());
        app.updateObjectSeats(app.getSelectedArea(), "tws", $("#zone_tws").val());
        app.updateObjectSeats(app.getSelectedArea(), "tns", $("#zone_tns").val());
        app.updateObjectSeats(app.getSelectedArea(), "price", $("#zone_price").val());
        app.updateObjectSeats(app.getSelectedArea(), "bg", $("#zone_bgi").val());
        app.getJSONCF().map(function (obj) {
          app.updateObjectSeats(app.getSelectedArea(), obj.id, $("#" + obj.id).val());
        });
        app.getJSONPCF().map(function (obj) {
          app.updateObjectSeats(app.getSelectedArea(), obj.id, $("#" + obj.id).val());
        });
        app.createMappingPolygon();
      }

      function onNewImageButtonClick(e) {
        if (confirm('This operation may break your current layout. Continue?')) {
          app.setIsDraw(false).hide().hidePreview();
          deselectAll();
          get_image.show();
        }

        e.preventDefault();
      }

      function onMappingCloseClick(e) {
        $("#top_toolbar").fadeOut();
        $("#seat_mapping").fadeOut();
        app.setSilent(true);
        app.setMode('seating');
        onSaveButtonClick(e);
        e.preventDefault();
      }

      function onSeatRowChange(e) {
        setTimeout(function () {
          app.updateSeatRow();
        }, 200);
      }

      function onSeatNumberChange(e) {
        setTimeout(function () {
          app.updateSeatNumber();
        }, 200);
      }

      function onSeatPriceChange(e) {
        setTimeout(function () {
          app.updateSeatPrice();
        }, 200);
      }

      function onResetAreaSeats(e) {
        setTimeout(function () {
          var c = confirm("Reset all allocated seats?");
          if (c) app.resetAreaSeats();
        }, 200);
      }

      function onExportClick(e) {
        app.exportSeats();
      }

      function onImportClick(e) {
        app.clear();
        app.importSeats();
      }

      function onStatsClick(e) {
        var stats = new Stats(document.getElementById("stats-body"), app.getLayout(), app.getJSONCF());
        stats.drawStats();
      }

      save.addEventListener('click', onSaveButtonClick, false);
      polygon.addEventListener('click', onShapeButtonClick, false);
      edit.addEventListener('click', onEditButtonClick, false);
      new_image.addEventListener('click', onNewImageButtonClick, false);
      seats.addEventListener('click', onSeatsButtonClick, false);
      saveSeatMap.addEventListener('click', onSaveSeatsButtonClick, false);
      seat_mapping_close.addEventListener('click', onMappingCloseClick, false);
      seat_row.addEventListener('keyup', onSeatRowChange, false);
      seat_text.addEventListener('keyup', onSeatNumberChange, false);
      seat_price.addEventListener('keyup', onSeatPriceChange, false);
      reset_zone.addEventListener('click', onResetAreaSeats, false);
      export_btn.addEventListener('click', onExportClick, false);
      import_btn.addEventListener('click', onImportClick, false);
      stats_btn.addEventListener('click', onStatsClick, false);
    })();
  };

  var _this = {
    state: {
      firstLoad: true,
      ajaxQueue: 0
    },
    init: function init() {
      loadScript("https://account.kenzap.com/js/nouislider.js", function () {});

      _this.getData();
    },
    getData: function getData() {
      showLoader();
      fetch('https://api-v1.kenzap.cloud/', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'text/plain',
          'Authorization': 'Bearer ' + getCookie('kenzap_api_key'),
          'Kenzap-Header': localStorage.hasOwnProperty('header'),
          'Kenzap-Token': getCookie('kenzap_token'),
          'Kenzap-Sid': getSiteId()
        },
        body: JSON.stringify({
          query: {
            locale: {
              type: 'locale',
              id: getCookie('lang')
            }
          }
        })
      }).then(function (response) {
        return response.json();
      }).then(function (response) {
        if (response.success) {
          initHeader(response);
          initFooter(__('Copyright © ' + new Date().getFullYear() + ' <a class="text-muted" href="https://kenzap.com/" target="_blank">Kenzap</a>. All rights reserved.'), __('MyTicket Mapping Software'));

          _this.loadHomeStructure();

          _this.renderPage();

          initMapping();
        } else {
          parseApiError(response);
        }
      })["catch"](function (error) {
        console.error('Error:', error);
      });
    },
    renderPage: function renderPage(data) {
      initBreadcrumbs([{
        link: link('https://dashboard.kenzap.cloud?launcher=myticket'),
        text: __('Dashboard')
      }, {
        link: link('/'),
        text: __('MyTicket')
      }, {
        text: __('Edit Layout')
      }]);
    },
    initListeners: function initListeners() {
      console.log('initListeners ');
      onClick('.rename-layout', _this.listeners.renameLayout);
      onClick('.duplicate-layout', _this.listeners.duplicateLayout);
      onClick('.remove-layout', _this.listeners.removeLayout);
      onClick('.btn-add', _this.listeners.addLayout);
      onClick('.btn-modal', _this.listeners.modalSuccessBtn);
    },
    listeners: {
      addLayout: function addLayout(e) {
        e.preventDefault();
        var modal = document.querySelector(".modal");
        var modalCont = new bootstrap.Modal(modal);
        modal.querySelector(".modal-title").innerHTML = __('Add Layout');
        modal.querySelector(".btn-primary").innerHTML = __('Add');
        modal.querySelector(".btn-secondary").innerHTML = __('Cancel');
        e.currentTarget.dataset.id;
        var title = "";
        var modalHTml = "\n            <div class=\"form-cont\">\n                <div class=\"form-group mb-3\">\n                    <label for=\"p-title\" class=\"form-label\">".concat(__('Title'), "</label>\n                    <input type=\"text\" class=\"form-control\" id=\"p-title\" autocomplete=\"off\" placeholder=\"").concat(__('Arena..'), "\" value=\"").concat(title, "\">\n                    <ol class=\"mt-3 form-text\">\n                        <li>Enter layout title</li>\n                        <li>Click add button</li>\n                        <li>Start creating layout</li>\n                    </ol>\n                </div>                <p class=\"mt-2 form-text fs-8\">Need help in designing your hall or stadium? <a target=\"_blank\" href=\"https://kenzap.com/seat-reservation-in-wordpress-setup-service-1014779/\">View examples</a>.</p>\n            </div>");
        modal.querySelector(".modal-body").innerHTML = modalHTml;

        _this.listeners.modalSuccessBtnFunc = function (e) {
          e.preventDefault();
          var data = {};
          data.title = modal.querySelector("#p-title").value;

          if (data.title.length < 4) {
            alert(__('Please provide longer title'));
            return;
          }

          var params = new URLSearchParams();
          params.append("cmd", "add_layout");
          params.append("title", data.title);
          showLoader();
          fetch('https://api.kenzap.com/myticket/', {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/x-www-form-urlencoded',
              'Authorization': 'Bearer ' + getCookie('kenzap_api_key'),
              'Kenzap-Header': localStorage.hasOwnProperty('header'),
              'Kenzap-Token': getCookie('kenzap_token'),
              'Kenzap-Sid': getSiteId()
            },
            body: params
          }).then(function (response) {
            return response.json();
          }).then(function (response) {
            if (response.success) {
              modalCont.hide();

              _this.getData();
            } else {
              parseApiError(response);
            }
          })["catch"](function (error) {
            console.error('Error:', error);
          });
        };

        modalCont.show();
        setTimeout(function () {
          return modal.querySelector("#p-title").focus();
        }, 100);
      },
      duplicateLayout: function duplicateLayout(e) {
        e.preventDefault();
        if (!confirm(__('Duplicate this layout?'))) return;
        var id = e.currentTarget.dataset.id;
        e.preventDefault();
        var params = new URLSearchParams();
        params.append("cmd", "duplicate_layout");
        params.append("id", id);
        showLoader();
        fetch('https://api.kenzap.com/myticket/', {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + getCookie('kenzap_api_key'),
            'Kenzap-Header': localStorage.hasOwnProperty('header'),
            'Kenzap-Token': getCookie('kenzap_token'),
            'Kenzap-Sid': getSiteId()
          },
          body: params
        }).then(function (response) {
          return response.json();
        }).then(function (response) {
          if (response.success) {
            _this.getData();
          } else {
            parseApiError(response);
          }
        })["catch"](function (error) {
          console.error('Error:', error);
        });
      },
      removeLayout: function removeLayout(e) {
        e.preventDefault();
        if (!confirm(__('Permanently remove this layout?'))) return;
        var id = e.currentTarget.dataset.id;
        e.preventDefault();
        var params = new URLSearchParams();
        params.append("cmd", "remove_layout");
        params.append("id", id);
        showLoader();
        fetch('https://api.kenzap.com/myticket/', {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + getCookie('kenzap_api_key'),
            'Kenzap-Header': localStorage.hasOwnProperty('header'),
            'Kenzap-Token': getCookie('kenzap_token'),
            'Kenzap-Sid': getSiteId()
          },
          body: params
        }).then(function (response) {
          return response.json();
        }).then(function (response) {
          if (response.success) {
            _this.getData();
          } else {
            parseApiError(response);
          }
        })["catch"](function (error) {
          console.error('Error:', error);
        });
      },
      renameLayout: function renameLayout(e) {
        e.preventDefault();
        var modal = document.querySelector(".modal");
        var modalCont = new bootstrap.Modal(modal);
        modal.querySelector(".modal-title").innerHTML = __('Rename Layout');
        modal.querySelector(".btn-primary").innerHTML = __('Rename');
        modal.querySelector(".btn-secondary").innerHTML = __('Cancel');
        var id = e.currentTarget.dataset.id;
        var title = e.currentTarget.dataset.title;
        var modalHTml = "\n            <div class=\"form-cont\">                <div class=\"form-group mb-3\">                    <label for=\"p-title\" class=\"form-label\">".concat(__('Title'), "</label>                    <input type=\"text\" class=\"form-control\" id=\"p-title\" autocomplete=\"off\" placeholder=\"\" value=\"").concat(title, "\">                </div>            </div>");
        modal.querySelector(".modal-body").innerHTML = modalHTml;

        _this.listeners.modalSuccessBtnFunc = function (e) {
          e.preventDefault();
          var data = {};
          data.title = modal.querySelector("#p-title").value;

          if (data.title.length < 4) {
            alert(__('Please provide longer title'));
            return;
          }

          var params = new URLSearchParams();
          params.append("cmd", "rename_layout");
          params.append("title", data.title);
          params.append("id", id);
          showLoader();
          fetch('https://api.kenzap.com/myticket/', {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/x-www-form-urlencoded',
              'Authorization': 'Bearer ' + getCookie('kenzap_api_key'),
              'Kenzap-Header': localStorage.hasOwnProperty('header'),
              'Kenzap-Token': getCookie('kenzap_token'),
              'Kenzap-Sid': getSiteId()
            },
            body: params
          }).then(function (response) {
            return response.json();
          }).then(function (response) {
            if (response.success) {
              modalCont.hide();

              _this.getData();
            } else {
              parseApiError(response);
            }
          })["catch"](function (error) {
            console.error('Error:', error);
          });
        };

        modalCont.show();
        setTimeout(function () {
          return modal.querySelector("#p-title").focus();
        }, 100);
      },
      modalSuccessBtn: function modalSuccessBtn(e) {
        _this.listeners.modalSuccessBtnFunc(e);
      },
      modalSuccessBtnFunc: null
    },
    loadHomeStructure: function loadHomeStructure() {
      document.querySelector('#contents').innerHTML = HTMLContent(__);
    }
  };

  _this.init();

})();
//# sourceMappingURL=index.js.map
