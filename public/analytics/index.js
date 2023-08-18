!function(){"use strict";function t(t,e){for(var n=0;n<e.length;n++){var s=e[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,a(s.key),s)}}function e(t,e,n){return(e=a(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function a(t){var e=function(t,e){if("object"!=typeof t||null===t)return t;var a=t[Symbol.toPrimitive];if(void 0!==a){var n=a.call(t,e||"default");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(t,"string");return"symbol"==typeof e?e:String(e)}const n=(t,...e)=>{if(0===(t=String(t)).length)return"";return((t,e,...a)=>{let n=(t,e)=>(e.forEach(((e,a)=>{t=t.replace("%"+(a+1)+"$",e)})),t);return void 0===window.i18n||void 0===window.i18n.state.locale.values[t]?n(t,a):n(e(window.i18n.state.locale.values[t]),a)})(t,(t=>t.replace(/[&<>'"]/g,(t=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&apos;",'"':"&quot;"}[t])))),...e)},s=()=>{let t=document.querySelector(".loader");t&&(t.style.display="block")},c=()=>{let t=document.querySelector(".loader");t&&(t.style.display="none")},i=t=>{let e=new URLSearchParams(window.location.search),a=e.get("sid")?e.get("sid"):"",n=-1==t.indexOf("?")?"?sid="+a:"&sid="+a;return t+n},l=()=>{let t=new URLSearchParams(window.location.search);return t.get("sid")?t.get("sid"):""},o=t=>{let e=t+"=",a=decodeURIComponent(document.cookie).split(";");for(let t=0;t<a.length;t++){let n=a[t];for(;" "==n.charAt(0);)n=n.substring(1);if(0==n.indexOf(e))return n.substring(e.length,n.length)}return""},r=()=>{let t=localStorage.hasOwnProperty("header")&&localStorage.hasOwnProperty("header-version")?localStorage.getItem("header-version"):0,e=window.location.hostname+"/"+l()+"/"+o("locale");return e!=o("check")&&(t=0,console.log("refresh")),((t,e,a)=>{let n="";if(a){let t=new Date;t.setTime(t.getTime()+24*a*60*60*1e3),n=";expires="+t.toUTCString()}document.cookie=t+"="+(escape(e)||"")+n+";path=/;domain=.kenzap.cloud"})("check",e,5),t},d=()=>({Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+o("kenzap_api_key"),"Kenzap-Locale":o("locale")?o("locale"):"en","Kenzap-Header":r(),"Kenzap-Token":o("kenzap_token"),"Kenzap-Sid":l()});o("kenzap_api_key"),o("locale")&&o("locale"),r(),o("kenzap_token"),l();const h=t=>{if(console.log(t),isNaN(t.code)){let e=t;try{e=JSON.stringify(e)}catch(t){}let a=new URLSearchParams;return a.append("cmd","report"),a.append("sid",l()),a.append("token",o("kenzap_token")),a.append("data",e),fetch("https://api-v1.kenzap.cloud/error/",{method:"post",headers:{Accept:"application/json","Content-type":"application/x-www-form-urlencoded"},body:a}),void alert("Can not connect to Kenzap Cloud")}if(401===t.code){if(-1!=window.location.href.indexOf("localhost"))return void alert(t.reason);location.href="https://auth.kenzap.com/?app=65432108792785&redirect="+window.location.href}else alert(t.reason)};var m,v,p,u=function(t,e){e=function(t){return t=t||0,t=parseFloat(t),Math.round(100*t)/100}(e),e=(Math.round(100*parseFloat(e))/100).toFixed(2);var a={};switch((a=t.currency_symb_loc?t:t.state.settings).currency_symb_loc){case"left":e=a.currency_symb+" "+e;break;case"right":e+=a.currency_symb}return e},g=(m=function t(){var a=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),e(this,"getData",(function(){a.state.firstLoad&&s(),document.querySelector(".search-cont input")&&document.querySelector(".search-cont input").value,fetch("https://api-v1.kenzap.cloud/",{method:"post",headers:d(),body:JSON.stringify({query:{user:{type:"authenticate",fields:["avatar","id"],token:o("kenzap_token")},locale:{type:"locale",source:["extension"],key:"myticket"},settings:{type:"get",key:"ecommerce-settings",fields:["currency","currency_symb","currency_symb_loc","tax_calc","tax_percent_auto","tax_percent","tax_display","fee_calc","fee_percent","fee_display","payment_methods","custom_payment_method","tables","table_list","add_products","add_products_list","templates"]},events:{type:"find",key:"myticket-event",fields:["_id","id","img","status","variations","title"],limit:50}}})}).then((function(t){return t.json()})).then((function(t){a.state.events=t.events,a.state.settings=t.settings,a.state.user=t.user,c(),t.success?((t=>{if(t.header&&localStorage.setItem("header",t.header),!document.querySelector("#k-script")){let t=document.createElement("div");t.innerHTML=localStorage.getItem("header"),t=t.firstChild,document.body.prepend(t),Function(document.querySelector("#k-script").innerHTML).call("test")}t.locale&&window.i18n.init(t.locale)})(t),a.getAnalyticsData()):h(t)})).catch((function(t){h(t)}))})),e(this,"getAnalyticsData",(function(){fetch(0==window.location.host.indexOf("localhost")?"https://api.myticket-dev.app.kenzap.cloud/":"https://api.myticket.app.kenzap.cloud/",{method:"post",headers:d(),body:JSON.stringify({query:{analytics:{type:"get-analytics",groupby:"day",eventid:a.state.eventid}}})}).then((function(t){return t.json()})).then((function(t){var e;a.state.analytics=t.analytics,c(),t.success?(a.content(),a.render(),a.initListeners(),e=n("MyTicket 2.0.8 by %1$Kenzap%2$. ❤️ Licensed %3$GPLv3%4$.",'<a class="text-muted" href="https://kenzap.com/" target="_blank">',"</a>",'<a class="text-muted" href="https://github.com/kenzap/ecommerce" target="_blank">',"</a>"),document.querySelector("footer .row").innerHTML='\n    <div class="d-sm-flex justify-content-center justify-content-sm-between">\n        <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">'.concat(e,'</span>\n        <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center text-muted">').concat("","</span>\n    </div>"),a.state.firstLoad=!1):h(t)})).catch((function(t){h(t)}))})),e(this,"content",(function(){a.state.analytics||(a.state.analytics={totals:{amount:0,quantity:0,total_processed:0}}),document.querySelector("#contents").innerHTML='\n\n        <div class="container p-edit">\n            <div class="d-flex justify-content-between bd-highlight mb-3">\n                <nav class="bc" aria-label="breadcrumb"></nav>\n            </div>\n            \n            <div class="row">\n                <div class="col-lg-12 grid-margin stretch-card mb-3">\n                    <select class="form-select event-pick form-select-lg border-0 shadow-sm" aria-label=".form-select-lg example">\n                        <option value="" selected>'.concat(n("All Events"),"</option>\n                        ").concat(a.state.events.map((function(t){return'<option value="'.concat(t._id,'" ').concat(a.state.eventid==t._id?"selected":""," >").concat((e=t.title,0===(e=String(e)).length?"":e.replace(/[&<>'"]/g,(t=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&apos;",'"':"&quot;"}[t])))),"</option>");var e})).join(""),'\n                    </select>\n                </div>\n            </div>\n\n            <div class="row">\n\n                <div class="col-lg-4 grid-margin stretch-card mb-3">\n                    <div class="bg-white border-white rounded-1 shadow-sm p-sm-2 h-100 anm br d-flex flex-column" >\n                        <div class="card-body">\n                            <h6 class="card-title mb-3">').concat(n("Tickets Sold"),'</h6>\n                            <div class="d-flex flex-row bd-highlight">\n                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="48" fill="currentColor" style="min-width: 32px;" class="bi bi-ticket text-primary" viewBox="0 0 16 16">\n                                    <path d="M4 4.85v.9h1v-.9H4Zm7 0v.9h1v-.9h-1Zm-7 1.8v.9h1v-.9H4Zm7 0v.9h1v-.9h-1Zm-7 1.8v.9h1v-.9H4Zm7 0v.9h1v-.9h-1Zm-7 1.8v.9h1v-.9H4Zm7 0v.9h1v-.9h-1Z"></path>\n                                    <path d="M1.5 3A1.5 1.5 0 0 0 0 4.5V6a.5.5 0 0 0 .5.5 1.5 1.5 0 1 1 0 3 .5.5 0 0 0-.5.5v1.5A1.5 1.5 0 0 0 1.5 13h13a1.5 1.5 0 0 0 1.5-1.5V10a.5.5 0 0 0-.5-.5 1.5 1.5 0 0 1 0-3A.5.5 0 0 0 16 6V4.5A1.5 1.5 0 0 0 14.5 3h-13ZM1 4.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v1.05a2.5 2.5 0 0 0 0 4.9v1.05a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-1.05a2.5 2.5 0 0 0 0-4.9V4.5Z"></path>\n                                </svg>\n                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="48" fill="currentColor" class="bi bi-people text-primary d-none" style="min-width:32px;" viewBox="0 0 16 16">\n                                    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>\n                                </svg>\n                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="48" fill="currentColor" class="bi bi-grid text-primary d-none" style="min-width:32px;" viewBox="0 0 16 16">\n                                    <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"/>\n                                </svg>\n                                <div class="mr-4 mr-md-0 mr-lg-4 ms-3 text-left text-lg-left">\n                                    <h4 id="c_count" class="card-title mb-0">').concat(a.state.analytics.totals.quantity,'</h4>\n                                    <p class="text-muted">').concat(n("Total number of tickets sold."),'</p> \n                                </div>\n                            </div>    \n                        </div>\n                        <div class="card-footer">\n                            <p class="text-muted float-start mb-0 mt-0">').concat(n("Tickets"),'</p>\n                            <a href="').concat(i("/events/"),'" class="bt float-end text-uppercase view-invoices" >').concat(n("View events"),'</a>\n                            <div class="clearfix"></div>\n                        </div>\n                    </div>\n                </div>\n\n                <div class="col-lg-4 grid-margin stretch-card mb-3">\n                    <div class="bg-white border-white rounded-1 shadow-sm p-sm-2 h-100 anm br d-flex flex-column" >\n                        <div class="card-body">\n                            <h6 class="card-title mb-3">').concat(n("Gross Sales"),'</h6>\n                            <div class="d-flex flex-row bd-highlight">\n                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="48" fill="currentColor" class="bi bi-coin text-primary" style="min-width:32px;" viewBox="0 0 16 16">\n                                    <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z"/>\n                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>\n                                    <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>\n                                </svg>\n\n                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="48" fill="currentColor" class="bi bi-clock-history d-none text-primary" style="min-width:32px;" viewBox="0 0 16 16">\n                                    <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"/>\n                                    <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"/>\n                                    <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>\n                                </svg>\n                                <div class="mr-4 mr-md-0 mr-lg-4 ms-3 text-left text-lg-left">\n                                    <h4 id="e_total_p" class="card-title mb-0 p">').concat(u(a,a.state.analytics.totals.amount),'</h4>\n                                    <p class="text-muted">').concat(n("Total volume of all sold tickets."),'</p> \n                                </div>\n                            </div>    \n                        </div>\n                        <div class="card-footer">\n                            <p class="text-muted float-start mb-0 mt-0">').concat(n("Sales"),'</p>\n                            <a href="').concat(i("/events/"),'" class="bt float-end text-uppercase view-summary">').concat(n("View events"),'</a>\n                            <div class="clearfix"></div>\n                        </div>\n                    </div>\n                </div>\n\n                <div class="col-lg-4 grid-margin stretch-card mb-3">\n                    <div class="bg-white border-white rounded-1 shadow-sm p-sm-2 h-100 anm br d-flex flex-column" >\n                        <div class="card-body">\n                            <h6 class="card-title mb-3">').concat(n("Ticket Price"),'</h6>\n                            <div class="d-flex flex-row bd-highlight">\n                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="48" fill="currentColor" class="bi bi-bar-chart text-primary" style="min-width:32px;"  viewBox="0 0 16 16">\n                                    <path d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z"/>\n                                </svg>\n                                <div class="mr-4 mr-md-0 mr-lg-4 ms-3 text-left text-lg-left">\n                                    <h4 id="e_total" class="card-title mb-0">').concat(u(a,a.state.analytics.totals.amount/a.state.analytics.totals.quantity),'</h4>\n                                    <p class="text-muted">').concat(n("Average ticket price."),'</p> \n                                </div>\n                            </div>    \n                        </div>\n                        <div class="card-footer">\n                            <p class="text-muted float-start mb-0 mt-0">').concat(n("Processed"),'</p>\n                            <a href="',"/bookings/",'" class="bt float-end text-uppercase view-invoices" >').concat(n("Bookings"),'</a>\n                            <div class="clearfix"></div>\n                        </div>\n                    </div>\n                </div>\n\n                <div class="col-lg-4 grid-margin stretch-card mb-3">\n                    <div class="bg-white border-white rounded-1 shadow-sm p-sm-2 h-100 anm br d-flex flex-column" >\n                        <div class="card-body">\n                            <h6 class="card-title mb-3">').concat(n("Tickets Sold"),'</h6>\n                            <div id="tickets-chart" style="height: 320px;"></div>   \n                        </div>\n                        <div class="card-footer">\n                            <p class="text-muted float-start mb-0 mt-0">').concat(n("Analytics"),'</p>\n                            <a href="',"/applications/",'" class="bt float-end text-uppercase content-chart-custom d-none" >').concat(n("Manage"),'</a>\n                            <div class="clearfix"></div>\n                        </div>\n                    </div>\n                </div>\n\n                <div class="col-lg-4 grid-margin stretch-card mb-3">\n                    <div class="bg-white border-white rounded-1 shadow-sm p-sm-2 h-100 anm br d-flex flex-column" >\n                        <div class="card-body">\n                            <h6 class="card-title mb-3">').concat(n("Gross Sales"),'</h6>\n                            <div id="amount-chart" style="height: 320px;"></div>   \n                        </div>\n                        <div class="card-footer">\n                            <p class="text-muted float-start mb-0 mt-0">').concat(n("Analytics"),'</p>\n                            <a href="',"/applications/",'" class="bt float-end text-uppercase content-chart-custom d-none" >').concat(n("Manage"),'</a>\n                            <div class="clearfix"></div>\n                        </div>\n                    </div>\n                </div>\n\n                <div class="col-lg-4 grid-margin stretch-card mb-3">\n                    <div class="bg-white border-white rounded-1 shadow-sm p-sm-2 h-100 anm br d-flex flex-column" >\n                        <div class="card-body">\n                            <h6 class="card-title mb-3">').concat(n("Top Packages"),'</h6>\n                            <div id="package-chart" style="height: 320px;"></div>      \n                        </div>\n                        <div class="card-footer">\n                            <p class="text-muted float-start mb-0 mt-0">').concat(n("Last 90 days"),'</p>\n                            <a href="#" class="bt float-end text-uppercase geo-chart-custom d-none" data-bs-toggle="modal" data-bs-target=".modal">').concat(n("Customize"),'</a>\n                            <div class="clearfix"></div>\n                        </div>\n                    </div>\n                </div>\n\n                <div class="col-lg-4 d-none grid-margin stretch-card mb-3">\n                    <div class="bg-white border-white rounded-1 shadow-sm p-sm-2 h-100 anm br d-flex flex-column" >\n                        <div class="card-body">\n                            <h6 class="card-title mb-3">').concat(n("Countries"),'</h6>\n                            <div id="geo-chart"></div>      \n                        </div>\n                        <div class="card-footer">\n                            <p class="text-muted float-start mb-0 mt-0">').concat(a.state.period?a.state.periodText:n("Last 30 days"),'</p>\n                            <a href="',"/applications/",'" class="bt float-end text-uppercase content-chart-custom view-map" >').concat(n("View Map"),'</a>\n                            <a href="#" class="bt float-end text-uppercase geo-chart-custom d-none" data-bs-toggle="modal" data-bs-target=".modal">').concat(n("Customize"),'</a>\n                            <div class="clearfix"></div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            \n            <div class="row d-none">\n                <div class="col-md-12 grid-margin grid-margin-lg-0 grid-margin-md-0 stretch-card">\n                    <div class="card border-white shadow-sm p-sm-3 py-3">\n                        <nav class="nav flex-column">\n                            <a class="nav-link active fs-4" aria-current="page" href="',"/applications/",'">\n                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-list-stars me-3" viewBox="0 0 16 16">\n                                <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"></path>\n                                <path d="M2.242 2.194a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.277.277 0 0 0-.094.3l.173.569c.078.256-.213.462-.423.3l-.417-.324a.267.267 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.277.277 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.271.271 0 0 0 .259-.194l.162-.53zm0 4a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.277.277 0 0 0-.094.3l.173.569c.078.255-.213.462-.423.3l-.417-.324a.267.267 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.277.277 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.271.271 0 0 0 .259-.194l.162-.53zm0 4a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.277.277 0 0 0-.094.3l.173.569c.078.255-.213.462-.423.3l-.417-.324a.267.267 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.277.277 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.271.271 0 0 0 .259-.194l.162-.53z"></path>\n                            </svg>').concat(n("Applications"),'</a>\n\n                            <hr>\n                                            \n                            <a class="nav-link fs-4" href="',"/users/",'">\n                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-people mb-1 me-3" viewBox="0 0 16 16">\n                                <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>\n                            </svg>').concat(n("Users"),'</a>\n\n                            <hr>\n                                                \n                            <a class="nav-link fs-4" href="',"/settings/",'"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-gear mb-1 me-3" viewBox="0 0 16 16">\n                                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"></path>\n                                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"></path>\n                            </svg>').concat(n("Settings"),'</a>\n\n                            <hr>\n                                                \n                            <a class="nav-link fs-4" href="',"/export/",'" tabindex="-1" aria-disabled="true"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-graph-up me-3" viewBox="0 0 16 16">\n                            <path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z"></path>\n                            </svg>').concat(n("Export"),'</a>\n                        </nav>\n                    </div>\n                </div>\n            </div>\n        </div>\n        \n        <div class="modal" tabindex="-1">\n            <div class="modal-dialog">\n                <div class="modal-content">\n                    <div class="modal-header">\n                        <h5 class="modal-title"></h5>\n                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>\n                    </div>\n                    <div class="modal-body">\n\n                    </div>\n                    <div class="modal-footer">\n                        <button type="button" class="btn btn-primary btn-confirm btn-modal"></button>\n                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"></button>\n                    </div>\n                </div>\n            </div>\n        </div>\n        '),a.ticketsChart("#tickets-chart"),a.amountChart("#amount-chart"),a.packageChart("#package-chart")})),e(this,"ticketsChart",(function(t){var e=[n("Jan"),n("Feb"),n("Mar"),n("Apr"),n("May"),n("Jun"),n("Jul"),n("Aug"),n("Sep"),n("Oct"),n("Nov"),n("Dec")],s=[[n("Period"),n("Tickets")]];Object.keys(a.state.analytics.bookings).map((function(t){"_"!=t&&s.push([t.substr(7,2)+" "+e[parseInt(t.substr(5,2))],a.state.analytics.bookings[t].quantity])})),s.length<2?document.querySelector(t).innerHTML='<p class="form-text">'+n("no data to display")+"</p>":(google.charts.load("current",{packages:["corechart"]}),google.charts.setOnLoadCallback((function(){var e=google.visualization.arrayToDataTable(s);new google.visualization.ColumnChart(document.querySelector(t)).draw(e,{legend:{position:"top",maxLines:3},vAxis:{minValue:0},lineWidth:3,chartArea:{left:0,top:64,bottom:64,width:"100%",height:"100%"},colors:["#1941df","#0b834d","#1B6AFC"]})})))})),e(this,"amountChart",(function(t){var e=[n("Jan"),n("Feb"),n("Mar"),n("Apr"),n("May"),n("Jun"),n("Jul"),n("Aug"),n("Sep"),n("Oct"),n("Nov"),n("Dec")],s=[[n("Period"),n("Amount in %1$",a.state.settings.currency)]];Object.keys(a.state.analytics.bookings).map((function(t){"_"!=t&&s.push([t.substr(7,2)+" "+e[parseInt(t.substr(5,2))],a.state.analytics.bookings[t].amount])})),s.length<2?document.querySelector(t).innerHTML='<p class="form-text">'+n("no data to display")+"</p>":(google.charts.load("current",{packages:["corechart"]}),google.charts.setOnLoadCallback((function(){var e=google.visualization.arrayToDataTable(s);new google.visualization.ColumnChart(document.querySelector(t)).draw(e,{legend:{position:"top",maxLines:3},vAxis:{minValue:0},lineWidth:3,chartArea:{left:0,top:64,bottom:64,width:"100%",height:"100%"},colors:["#1941df","#0b834d","#1B6AFC"]})})))})),e(this,"profitChart",(function(t,e){google.charts.load("current",{packages:["corechart"]}),google.charts.setOnLoadCallback((function(){var t=google.visualization.arrayToDataTable([["Month","Profit","Loss"],["Jan",1e3,400],["Feb",1170,460],["Mar",660,1120],["Apr",1030,540]]);new google.visualization.LineChart(document.querySelector(e)).draw(t,{legend:{position:"top",maxLines:3},vAxis:{minValue:0},lineWidth:3,chartArea:{left:0,top:64,bottom:64,width:"100%",height:"100%"},colors:["#0b834d","#1B6AFC"]})}))})),e(this,"packageChart",(function(t){if(a.state.analytics.packages.length<2)document.querySelector(t).innerHTML='<p class="form-text">'+n("no data to display")+"</p>";else{var e='\n        <div class="table-responsive table-nav" style="height: 320px;">\n            <table class="table table-hover table-borderless align-middle table-striped table-p-list">\n                <thead class="d-none">\n                    <tr>\n                        <th>'.concat(n("Email"),'</th>\n                        <th class="text-end d-none"></th>\n                    </tr>\n                </thead>\n                <tbody class="list">');Object.keys(a.state.analytics.packages).map((function(t,s){a.state.analytics.packages[t].map((function(s){a.state.analytics.packages[t][parseInt(s.variation)]&&(e+='\n                            <tr>\n                                <td>\n                                    <div class="my-1"> \n                                        <b class="d-flex justify-content-start d-flex-column bd-highlight align-items-center">'.concat(n(a.getPackageById(t,a.state.analytics.packages[t][parseInt(s.variation)].variation).package),' <div class="ms-2" style=""><div class="badge bg-primary text-light fw-light">').concat(s.quantity,'</div></div></b> \n                                        <div class="mt-0" style="font-size:12px;">').concat(n(a.getPackageById(t,a.state.analytics.packages[t][parseInt(s.variation)].variation).event),'</div>\n                                    \n                                    </div>\n                                </td>\n                                <td class="text-end d-none">\n                                    <b> test </b>\n                                </td>\n                            </tr>'))}))})),e+="  \n                </tbody>\n            </table>\n        </div>",document.querySelector(t).innerHTML=e}})),e(this,"getPackageById",(function(t,e){if("_"==t)return"Other";var n=a.state.events.filter((function(e){return e._id==t}));return{event:n[0].title,package:n[0].variations[parseInt(e)].title}})),e(this,"render",(function(){(t=>{let e='<ol class="breadcrumb mt-2 mb-0">';for(let a of t)void 0===a.link?e+=`<li class="breadcrumb-item">${a.text}</li>`:e+=`<li class="breadcrumb-item"><a href="${a.link}">${a.text}</a></li>`;e+="</ol>",document.querySelector(".bc").innerHTML=e})([{link:i("https://dashboard.kenzap.cloud"),text:n("Home")},{link:i("/"),text:n("MyTicket")},{text:n("Analytics")}])})),e(this,"initListeners",(function(){((t,e)=>{if(document.querySelector(t))for(let a of document.querySelectorAll(t))a.removeEventListener("change",e,!0),a.addEventListener("change",e,!0)})(".event-pick",(function(t){s(),a.state.eventid=t.currentTarget.value,a.getAnalyticsData()})),a.state.firstLoad})),e(this,"listeners",{modalSuccessBtn:function(t){a.listeners.modalSuccessBtnFunc(t)},modalSuccessBtnFunc:null}),this.state={firstLoad:!0,response:null,eventid:"",limit:10},this.getData()},v&&t(m.prototype,v),p&&t(m,p),Object.defineProperty(m,"prototype",{writable:!1}),m);new g}();
