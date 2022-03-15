!function(){"use strict";const t=()=>{let t=document.querySelector(".loader");t&&(t.style.display="block")},e=t=>{let e=new URLSearchParams(window.location.search),n=e.get("sid")?e.get("sid"):"",a=-1==t.indexOf("?")?"?sid="+n:"&sid="+n;return t+a},n=()=>{let t=new URLSearchParams(window.location.search);return t.get("sid")?t.get("sid"):""},a=t=>{let e=t+"=",n=decodeURIComponent(document.cookie).split(";");for(let t=0;t<n.length;t++){let a=n[t];for(;" "==a.charAt(0);)a=a.substring(1);if(0==a.indexOf(e))return a.substring(e.length,a.length)}return""},o=t=>{if(401===t.code){if(window.location.href.indexOf("localhost"))return void alert(t.reason);location.href="https://auth.kenzap.com/?app=65432108792785&redirect="+window.location.href}else alert(t.reason)},r=(t,e)=>{if(document.querySelector(t))for(let n of document.querySelectorAll(t))n.removeEventListener("click",e,!0),n.addEventListener("click",e,!0)};var l={state:{firstLoad:!0,ajaxQueue:0},init:function(){l.getData()},getData:function(){l.state.firstLoad&&t(),fetch("https://api-v1.kenzap.cloud/",{method:"post",headers:{Accept:"application/json","Content-Type":"text/plain",Authorization:"Bearer "+a("kenzap_api_key"),"Kenzap-Header":localStorage.hasOwnProperty("header"),"Kenzap-Token":a("kenzap_token"),"Kenzap-Sid":n()},body:JSON.stringify({query:{locale:{type:"locale",id:a("lang")}}})}).then((function(t){return t.json()})).then((function(t){t.success?((t=>{if(t.header&&localStorage.setItem("header",t.header),!document.querySelector("#k-script")){let t=document.createElement("div");t.innerHTML=localStorage.getItem("header"),t=t.firstChild,document.body.prepend(t),Function(document.querySelector("#k-script").innerHTML).call("test")}t.locale&&window.i18n.init(t.locale)})(t),l.getLayouts(t)):o(t)})).catch((function(t){console.error("Error:",t)}))},getLayouts:function(t){fetch("https://myticket.kenzap.cloud/backend.php?cmd=get_layouts",{method:"get",headers:{Accept:"application/json","Content-type":"application/x-www-form-urlencoded",Authorization:"Bearer "+a("kenzap_api_key"),"Kenzap-Header":localStorage.hasOwnProperty("header"),"Kenzap-Token":a("kenzap_token"),"Kenzap-Sid":n()}}).then((function(t){return t.json()})).then((function(t){t.success?(l.loadHomeStructure(),l.renderPage(t),l.initListeners(),l.initFooter(),l.state.firstLoad=!1):o(t)})).catch((function(t){console.error("Error:",t)}))},renderPage:function(t){var n=document;(t=>{let e='<ol class="breadcrumb mt-2 mb-0">';for(let n of t)void 0===n.link?e+=`<li class="breadcrumb-item">${n.text}</li>`:e+=`<li class="breadcrumb-item"><a href="${n.link}">${n.text}</a></li>`;e+="</ol>",document.querySelector(".bc").innerHTML=e})([{link:e("https://dashboard.kenzap.cloud?launcher=myticket"),text:__("Dashboard")},{text:__("MyTicket")}]);var a="",o=0;for(var r in t.layouts)o++,a+="\n            <tr>\n                <td>".concat(parseInt(r)+1,"</td>\n                <td>").concat(t.layouts[r].title,'</td>\n                <td style="display:none;">').concat(t.layouts[r].count_zones,'</td>\n                <td style="display:none;">').concat(t.layouts[r].count_seats,'</td>\n                <td style="text-align:right;" class="">\n                    <button class="btn btn-sm dropdown-toggle" type="button" id="dropdownMenuSizeButton').concat(r,'" data-i="').concat(r,'" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">').concat(__("Option"),'</button>\n                    <div class="dropdown-menu" aria-labelledby="dropdownMenuSizeButton').concat(r,'" >\n                        <a class="dropdown-item edit-layout" href="').concat(e("/layout-edit/?id="+t.layouts[r].id),'" target="_self" >').concat(__("Edit"),'</a>\n                        <a class="dropdown-item duplicate-layout" href="#" data-toggle="modal" data-id="').concat(t.layouts[r].id,'" >').concat(__("Duplicate"),'</a>\n                        <a class="dropdown-item rename-layout" href="#" data-toggle="modal" data-id="').concat(t.layouts[r].id,'" data-title="').concat(t.layouts[r].title,'">').concat(__("Rename"),'</a>\n                        <div class="dropdown-divider"></div>\n                        <a class="dropdown-item remove-layout" href="#" data-toggle="modal" data-id="').concat(t.layouts[r].id,'" >').concat(__("Remove"),"</a>\n                    </div>\n                </td>\n            </tr>");n.querySelector(".layout_list").innerHTML=0==o?"<tr><td>".concat(__("No layouts to display yet"),"</td><td></td><td></td><td></td><td></td></tr>"):a,(()=>{let t=document.querySelector(".loader");t&&(t.style.display="none")})()},initListeners:function(){console.log("initListeners "),r(".rename-layout",l.listeners.renameLayout),r(".duplicate-layout",l.listeners.duplicateLayout),r(".remove-layout",l.listeners.removeLayout),l.state.firstLoad&&(r(".btn-add",l.listeners.addLayout),r(".btn-modal",l.listeners.modalSuccessBtn))},listeners:{addLayout:function(e){e.preventDefault();var r=document.querySelector(".modal"),i=new bootstrap.Modal(r);r.querySelector(".modal-title").innerHTML=__("Add Layout"),r.querySelector(".btn-primary").innerHTML=__("Add"),r.querySelector(".btn-secondary").innerHTML=__("Cancel"),e.currentTarget.dataset.id;var c='\n            <div class="form-cont">\n                <div class="form-group mb-3">\n                    <label for="p-title" class="form-label">'.concat(__("Title"),'</label>\n                    <input type="text" class="form-control" id="p-title" autocomplete="off" placeholder="').concat(__("Arena.."),'" value="').concat("",'">\n                    <ol class="mt-3 form-text">\n                        <li>Enter layout title</li>\n                        <li>Click add button</li>\n                        <li>Start creating layout</li>\n                    </ol>\n                </div>                <p class="mt-2 form-text fs-8">Need help in designing your hall or stadium? <a target="_blank" href="https://kenzap.com/seat-reservation-in-wordpress-setup-service-1014779/">View examples</a>.</p>\n            </div>');r.querySelector(".modal-body").innerHTML=c,l.listeners.modalSuccessBtnFunc=function(e){e.preventDefault();var c={};if(c.title=r.querySelector("#p-title").value,c.title.length<4)alert(__("Please provide longer title"));else{var d=new URLSearchParams;d.append("cmd","add_layout"),d.append("title",c.title),t(),fetch("https://myticket.kenzap.cloud/backend.php",{method:"post",headers:{Accept:"application/json","Content-type":"application/x-www-form-urlencoded",Authorization:"Bearer "+a("kenzap_api_key"),"Kenzap-Header":localStorage.hasOwnProperty("header"),"Kenzap-Token":a("kenzap_token"),"Kenzap-Sid":n()},body:d}).then((function(t){return t.json()})).then((function(t){t.success?(i.hide(),l.getData()):o(t)})).catch((function(t){console.error("Error:",t)}))}},i.show(),setTimeout((function(){return r.querySelector("#p-title").focus()}),100)},duplicateLayout:function(e){if(e.preventDefault(),confirm(__("Duplicate this layout?"))){var r=e.currentTarget.dataset.id;e.preventDefault();var i=new URLSearchParams;i.append("cmd","duplicate_layout"),i.append("id",r),t(),fetch("https://myticket.kenzap.cloud/backend.php",{method:"post",headers:{Accept:"application/json","Content-type":"application/x-www-form-urlencoded",Authorization:"Bearer "+a("kenzap_api_key"),"Kenzap-Header":localStorage.hasOwnProperty("header"),"Kenzap-Token":a("kenzap_token"),"Kenzap-Sid":n()},body:i}).then((function(t){return t.json()})).then((function(t){t.success?l.getData():o(t)})).catch((function(t){console.error("Error:",t)}))}},removeLayout:function(e){if(e.preventDefault(),confirm(__("Permanently remove this layout?"))){var r=e.currentTarget.dataset.id;e.preventDefault();var i=new URLSearchParams;i.append("cmd","remove_layout"),i.append("id",r),t(),fetch("https://myticket.kenzap.cloud/backend.php",{method:"post",headers:{Accept:"application/json","Content-type":"application/x-www-form-urlencoded",Authorization:"Bearer "+a("kenzap_api_key"),"Kenzap-Header":localStorage.hasOwnProperty("header"),"Kenzap-Token":a("kenzap_token"),"Kenzap-Sid":n()},body:i}).then((function(t){return t.json()})).then((function(t){t.success?l.getData():o(t)})).catch((function(t){console.error("Error:",t)}))}},renameLayout:function(e){e.preventDefault();var r=document.querySelector(".modal"),i=new bootstrap.Modal(r);r.querySelector(".modal-title").innerHTML=__("Rename Layout"),r.querySelector(".btn-primary").innerHTML=__("Rename"),r.querySelector(".btn-secondary").innerHTML=__("Cancel");var c=e.currentTarget.dataset.id,d=e.currentTarget.dataset.title,s='\n            <div class="form-cont">                <div class="form-group mb-3">                    <label for="p-title" class="form-label">'.concat(__("Title"),'</label>                    <input type="text" class="form-control" id="p-title" autocomplete="off" placeholder="" value="').concat(d,'">                </div>            </div>');r.querySelector(".modal-body").innerHTML=s,l.listeners.modalSuccessBtnFunc=function(e){e.preventDefault();var d={};if(d.title=r.querySelector("#p-title").value,d.title.length<4)alert(__("Please provide longer title"));else{var s=new URLSearchParams;s.append("cmd","rename_layout"),s.append("title",d.title),s.append("id",c),t(),fetch("https://myticket.kenzap.cloud/backend.php",{method:"post",headers:{Accept:"application/json","Content-type":"application/x-www-form-urlencoded",Authorization:"Bearer "+a("kenzap_api_key"),"Kenzap-Header":localStorage.hasOwnProperty("header"),"Kenzap-Token":a("kenzap_token"),"Kenzap-Sid":n()},body:s}).then((function(t){return t.json()})).then((function(t){t.success?(i.hide(),l.getData()):o(t)})).catch((function(t){console.error("Error:",t)}))}},i.show(),setTimeout((function(){return r.querySelector("#p-title").focus()}),100)},modalSuccessBtn:function(t){l.listeners.modalSuccessBtnFunc(t)},modalSuccessBtnFunc:null},loadHomeStructure:function(){l.state.firstLoad&&(document.querySelector("#contents").innerHTML=function(t){return'\n        <div class="container p-edit">\n            <div class="d-flex justify-content-between bd-highlight mb-3">\n                <nav class="bc" aria-label="breadcrumb"></nav>\n                <button class="btn btn-primary btn-add" type="button">'.concat(t("Add layout"),'</button>\n            </div>\n            <div class="row">\n\n                <div class="col-lg-12 grid-margin stretch-card">\n                    <div class="card border-white shadow-sm">\n                        <div class="card-body">\n                        <h4 class="card-title">').concat(t("Layout List"),'</h4>\n                        <p class="form-text">\n                            ').concat(t("Click on <code>option &gt; edit</code> to set up layout"),'\n                        </p>\n                        <div class="table-responsive">\n                            <table class="table table-hover table-borderless align-middle table-striped table-p-list" style="min-width: 800px;">\n                                <thead>\n                                    <tr>\n                                    <th>').concat(t("ID"),"</th>\n                                    <th>").concat(t("Title"),'</th>\n                                    <th style="display:none;">Zones</th>\n                                    <th style="display:none;">Seats</th>\n                                    <th style="text-align:right;"></th>\n                                    </tr>\n                                </thead>\n                                <tbody class="layout_list">\n                                    <tr>\n                                    <td></td><td></td><td></td><td></td><td></td>\n                                    </tr>\n                                </tbody>\n                            </table>\n                        </div>\n                        </div>\n                    </div>\n                </div>\n\n            </div>\n        </div>\n\n        <div class="modal" tabindex="-1">\n            <div class="modal-dialog">\n                <div class="modal-content">\n                    <div class="modal-header">\n                        <h5 class="modal-title"></h5>\n                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>\n                    </div>\n                    <div class="modal-body">\n\n                    </div>\n                    <div class="modal-footer">\n                        <button type="button" class="btn btn-primary btn-modal"></button>\n                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"></button>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <div class="position-fixed bottom-0 p-2 m-4 end-0 align-items-center">\n            <div class="toast hide align-items-center text-white bg-dark border-0" role="alert" aria-live="assertive"\n                aria-atomic="true" data-bs-delay="3000">\n                <div class="d-flex">\n                    <div class="toast-body"></div>\n                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"\n                        aria-label="Close"></button>\n                </div>\n            </div>\n        </div>\n        \n    ')}(__))},initFooter:function(){var t,e;t=__("Copyright © "+(new Date).getFullYear()+' <a class="text-muted" href="https://kenzap.com/" target="_blank">Kenzap</a>. All rights reserved.'),e=__("Kenzap Cloud Services - Dashboard"),document.querySelector("footer .row").innerHTML=`\n    <div class="d-sm-flex justify-content-center justify-content-sm-between">\n        <span class="text-muted text-center text-sm-left d-block d-sm-inline-block">${t}</span>\n        <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center text-muted">${e}</span>\n    </div>`}};l.init()}();
