
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35730/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
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
   * @name hideLoader
   * @description Removes full screen three dots loader.
   */
  const hideLoader = () => {

      let el = document.querySelector(".loader");
      if (el) el.style.display = 'none';
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

  var HTMLContent = function HTMLContent(__) {
    return "\n        <div class=\"container p-edit\">\n            <div class=\"d-flex justify-content-between bd-highlight mb-3\">\n                <nav class=\"bc\" aria-label=\"breadcrumb\"></nav>\n                <button class=\"btn btn-primary btn-add\" type=\"button\">".concat(__('Add layout'), "</button>\n            </div>\n            <div class=\"row\">\n\n                <div class=\"col-lg-12 grid-margin stretch-card\">\n                    <div class=\"card border-white shadow-sm\">\n                        <div class=\"card-body\">\n                        <h4 class=\"card-title\">").concat(__('Layout List'), "</h4>\n                        <p class=\"form-text\">\n                            ").concat(__('Click on <code>option &gt; edit</code> to set up layout'), "\n                        </p>\n                        <div class=\"table-responsive\">\n                            <table class=\"table table-hover table-borderless align-middle table-striped table-p-list\" style=\"min-width: 800px;\">\n                                <thead>\n                                    <tr>\n                                    <th>").concat(__('ID'), "</th>\n                                    <th>").concat(__('Title'), "</th>\n                                    <th style=\"display:none;\">Zones</th>\n                                    <th style=\"display:none;\">Seats</th>\n                                    <th style=\"text-align:right;\"></th>\n                                    </tr>\n                                </thead>\n                                <tbody class=\"layout_list\">\n                                    <tr>\n                                    <td></td><td></td><td></td><td></td><td></td>\n                                    </tr>\n                                </tbody>\n                            </table>\n                        </div>\n                        </div>\n                    </div>\n                </div>\n\n            </div>\n        </div>\n\n        <div class=\"modal\" tabindex=\"-1\">\n            <div class=\"modal-dialog\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                        <h5 class=\"modal-title\"></h5>\n                        <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n                    </div>\n                    <div class=\"modal-body\">\n\n                    </div>\n                    <div class=\"modal-footer\">\n                        <button type=\"button\" class=\"btn btn-primary btn-modal\"></button>\n                        <button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\"></button>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"position-fixed bottom-0 p-2 m-4 end-0 align-items-center\">\n            <div class=\"toast hide align-items-center text-white bg-dark border-0\" role=\"alert\" aria-live=\"assertive\"\n                aria-atomic=\"true\" data-bs-delay=\"3000\">\n                <div class=\"d-flex\">\n                    <div class=\"toast-body\"></div>\n                    <button type=\"button\" class=\"btn-close btn-close-white me-2 m-auto\" data-bs-dismiss=\"toast\"\n                        aria-label=\"Close\"></button>\n                </div>\n            </div>\n        </div>\n        \n    ");
  };

  var _this = {
    state: {
      firstLoad: true,
      ajaxQueue: 0
    },
    init: function init() {
      _this.getData();
    },
    getData: function getData() {
      if (_this.state.firstLoad) showLoader();
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

          _this.getLayouts(response);
        } else {
          parseApiError(response);
        }
      })["catch"](function (error) {
        console.error('Error:', error);
      });
    },
    getLayouts: function getLayouts(response) {
      fetch('https://api.kenzap.com/myticket/?cmd=get_layouts', {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'text/plain',
          'Kenzap-Header': localStorage.hasOwnProperty('header'),
          'Kenzap-Token': getCookie('kenzap_token'),
          'Kenzap-Sid': getSiteId()
        }
      }).then(function (layouts_res) {
        return layouts_res.json();
      }).then(function (layouts_res) {
        console.log(layouts_res);

        if (layouts_res.success) {
          _this.loadHomeStructure();

          _this.renderPage(layouts_res);

          _this.initListeners();

          _this.initFooter();

          _this.state.firstLoad = false;
        } else {
          parseApiError(response);
        }
      })["catch"](function (error) {
        console.error('Error:', error);
      });
    },
    renderPage: function renderPage(data) {
      var d = document;
      initBreadcrumbs([{
        link: link('https://dashboard.kenzap.cloud?launcher=myticket'),
        text: __('Dashboard')
      }, {
        text: __('MyTicket')
      }]);
      var layout_list = '',
          layouts_i = 0;

      for (var i in data.layouts) {
        layouts_i++;
        layout_list += "\n            <tr>\n                <td>".concat(parseInt(i) + 1, "</td>\n                <td><a href=\"").concat(link('/layout-edit/?id=' + data.layouts[i].id), "\">").concat(data.layouts[i].title, "</a></td>\n                <td style=\"display:none;\">").concat(data.layouts[i].count_zones, "</td>\n                <td style=\"display:none;\">").concat(data.layouts[i].count_seats, "</td>\n                <td style=\"text-align:right;\" class=\"\">\n                    <button class=\"btn btn-sm dropdown-toggle\" type=\"button\" id=\"dropdownMenuSizeButton").concat(i, "\" data-i=\"").concat(i, "\" data-bs-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">").concat(__('Option'), "</button>\n                    <div class=\"dropdown-menu\" aria-labelledby=\"dropdownMenuSizeButton").concat(i, "\" >\n                        <a class=\"dropdown-item edit-layout\" href=\"").concat(link('/layout-edit/?id=' + data.layouts[i].id), "\" target=\"_self\" >").concat(__('Edit'), "</a>\n                        <a class=\"dropdown-item duplicate-layout\" href=\"#\" data-toggle=\"modal\" data-id=\"").concat(data.layouts[i].id, "\" >").concat(__('Duplicate'), "</a>\n                        <a class=\"dropdown-item rename-layout\" href=\"#\" data-toggle=\"modal\" data-id=\"").concat(data.layouts[i].id, "\" data-title=\"").concat(data.layouts[i].title, "\">").concat(__('Rename'), "</a>\n                        <div class=\"dropdown-divider\"></div>\n                        <a class=\"dropdown-item remove-layout\" href=\"#\" data-toggle=\"modal\" data-id=\"").concat(data.layouts[i].id, "\" >").concat(__('Remove'), "</a>\n                    </div>\n                </td>\n            </tr>");
      }

      if (layouts_i == 0) {
        d.querySelector(".layout_list").innerHTML = "<tr><td>".concat(__('No layouts to display yet'), "</td><td></td><td></td><td></td><td></td></tr>");
      } else {
        d.querySelector(".layout_list").innerHTML = layout_list;
      }

      hideLoader();
    },
    initListeners: function initListeners() {
      console.log('initListeners ');
      onClick('.rename-layout', _this.listeners.renameLayout);
      onClick('.duplicate-layout', _this.listeners.duplicateLayout);
      onClick('.remove-layout', _this.listeners.removeLayout);
      if (!_this.state.firstLoad) return;
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
      if (!_this.state.firstLoad) return;
      document.querySelector('#contents').innerHTML = HTMLContent(__);
    },
    initFooter: function initFooter$1() {
      initFooter(__('Copyright © ' + new Date().getFullYear() + ' <a class="text-muted" href="https://kenzap.com/" target="_blank">Kenzap</a>. All rights reserved.'), __('Kenzap Cloud Services - Dashboard'));
    }
  };

  _this.init();

})();
//# sourceMappingURL=index.js.map
