(()=>{var t={149:function(t,e,o){var i,n;void 0===(n="function"==typeof(i=function(){"use strict";function e(t,e,o){var i=new XMLHttpRequest;i.open("GET",t),i.responseType="blob",i.onload=function(){r(i.response,e,o)},i.onerror=function(){console.error("could not download file")},i.send()}function i(t){var e=new XMLHttpRequest;e.open("HEAD",t,!1);try{e.send()}catch(t){}return 200<=e.status&&299>=e.status}function n(t){try{t.dispatchEvent(new MouseEvent("click"))}catch(o){var e=document.createEvent("MouseEvents");e.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),t.dispatchEvent(e)}}var a="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof o.g&&o.g.global===o.g?o.g:void 0,s=a.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),r=a.saveAs||("object"!=typeof window||window!==a?function(){}:"download"in HTMLAnchorElement.prototype&&!s?function(t,o,s){var r=a.URL||a.webkitURL,m=document.createElement("a");o=o||t.name||"download",m.download=o,m.rel="noopener","string"==typeof t?(m.href=t,m.origin===location.origin?n(m):i(m.href)?e(t,o,s):n(m,m.target="_blank")):(m.href=r.createObjectURL(t),setTimeout((function(){r.revokeObjectURL(m.href)}),4e4),setTimeout((function(){n(m)}),0))}:"msSaveOrOpenBlob"in navigator?function(t,o,a){if(o=o||t.name||"download","string"!=typeof t)navigator.msSaveOrOpenBlob(function(t,e){return void 0===e?e={autoBom:!1}:"object"!=typeof e&&(console.warn("Deprecated: Expected third argument to be a object"),e={autoBom:!e}),e.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t.type)?new Blob(["\ufeff",t],{type:t.type}):t}(t,a),o);else if(i(t))e(t,o,a);else{var s=document.createElement("a");s.href=t,s.target="_blank",setTimeout((function(){n(s)}))}}:function(t,o,i,n){if((n=n||open("","_blank"))&&(n.document.title=n.document.body.innerText="downloading..."),"string"==typeof t)return e(t,o,i);var r="application/octet-stream"===t.type,m=/constructor/i.test(a.HTMLElement)||a.safari,c=/CriOS\/[\d]+/.test(navigator.userAgent);if((c||r&&m||s)&&"undefined"!=typeof FileReader){var l=new FileReader;l.onloadend=function(){var t=l.result;t=c?t:t.replace(/^data:[^;]*;/,"data:attachment/file;"),n?n.location.href=t:location=t,n=null},l.readAsDataURL(t)}else{var u=a.URL||a.webkitURL,p=u.createObjectURL(t);n?n.location=p:location.href=p,n=null,setTimeout((function(){u.revokeObjectURL(p)}),4e4)}});a.saveAs=r.saveAs=r,t.exports=r})?i.apply(e,[]):i)||(t.exports=n)}},e={};function o(i){var n=e[i];if(void 0!==n)return n.exports;var a=e[i]={exports:{}};return t[i].call(a.exports,a,a.exports,o),a.exports}o.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return o.d(e,{a:e}),e},o.d=(t,e)=>{for(var i in e)o.o(e,i)&&!o.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),o.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),o.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var i={};(()=>{"use strict";o.r(i);const t=flarum.core.compat["common/extend"],e=flarum.core.compat["common/app"];var n=o.n(e),a=function(){function t(){this.myemoji=[],this.moreResults=!1,this.loading=!1}var e=t.prototype;return e.loadResults=function(t){return void 0===t&&(t=0),this.loading=!0,n().store.find("nodeloc/myemoji",{page:{limit:23,offset:t}}).then(this.parseResults.bind(this))},e.loadMore=function(){this.loading=!0,this.loadResults(this.myemoji.length)},e.parseResults=function(t){var e;return(e=this.myemoji).push.apply(e,t),this.loading=!1,this.moreResults=!!t.payload.links&&!!t.payload.links.next,m.redraw(),t},e.addToList=function(t){this.loading=!0,this.myemoji.unshift(t),this.loading=!1},e.removeFromList=function(t){this.loading=!0;var e=this.myemoji.findIndex((function(e){return t===e.id()}));this.myemoji.splice(e,1),this.loading=!1},e.hasEmojis=function(){return this.myemoji.length>0},e.isLoading=function(){return this.loading},e.hasMoreResults=function(){return this.moreResults},e.empty=function(){return!this.hasEmojis()&&!this.isLoading()},t}();function s(t,e){return s=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},s(t,e)}function r(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,s(t,e)}var c=o(149);const l=flarum.core.compat["common/components/Button"];var u=o.n(l);const p=flarum.core.compat["common/Component"];var d=o.n(p);const f=flarum.core.compat["common/components/Alert"];var h=o.n(f);const j=flarum.core.compat["components/Button"];var y=o.n(j);const v=flarum.core.compat["components/Modal"];var g=o.n(v);const _=flarum.core.compat["utils/ItemList"];var b=o.n(_);const E=flarum.core.compat["utils/Stream"];var w=o.n(E);function x(t){var e=new RegExp("^(http|https)://","i");return!!t.match(e)}var T=function(t){function e(){return t.apply(this,arguments)||this}r(e,t);var o=e.prototype;return o.oninit=function(e){t.prototype.oninit.call(this,e),this.emoji=this.attrs.model||app.store.createRecord("myemoji"),this.category=w()(this.emoji.category()||""),this.category_name=w()(this.emoji.category_name()||""),this.emojiTitle=w()(this.emoji.title()||""),this.textToReplace=w()(this.emoji.textToReplace()||""),this.path=w()(this.emoji.path()||"")},o.className=function(){return"EditEmojiModal Modal--small"},o.title=function(){var t="";return this.path()&&(t=x(this.path())?this.path():app.forum.attribute("baseUrl")+this.path()),this.emojiTitle()?this.path()?[m("img",{className:"EditEmojiModal-titleEmoji",src:t,alt:this.emojiTitle()}),this.emojiTitle()]:this.emojiTitle():app.translator.trans("nodeloc-emoji.admin.my_emoji_section.edit_emoji.modal_title")},o.content=function(){return m("div",{className:"Modal-body"},m("div",{className:"Form"},this.fields().toArray()))},o.fields=function(){var t=new(b());return t.add("category",m("div",{className:"Form-group"},m("label",null,app.translator.trans("nodeloc-emoji.admin.my_emoji_section.edit_emoji.emoji_category_label")),m("input",{className:"FormControl",bidi:this.category})),50),t.add("category_name",m("div",{className:"Form-group"},m("label",null,app.translator.trans("nodeloc-emoji.admin.my_emoji_section.edit_emoji.text_to_category_name_label")),m("input",{className:"FormControl",bidi:this.category_name})),40),t.add("title",m("div",{className:"Form-group"},m("label",null,app.translator.trans("nodeloc-emoji.admin.my_emoji_section.edit_emoji.emoji_title_label")),m("input",{className:"FormControl",bidi:this.emojiTitle})),30),t.add("textToReplace",m("div",{className:"Form-group"},m("label",null,app.translator.trans("nodeloc-emoji.admin.my_emoji_section.edit_emoji.text_to_replace_label")),m("input",{className:"FormControl",bidi:this.textToReplace})),20),t.add("path",m("div",{className:"Form-group"},m("label",null,app.translator.trans("nodeloc-emoji.admin.my_emoji_section.edit_emoji.path_or_url_label")),m("input",{className:"FormControl",placeholder:"/assets/myemoji/batman.png",bidi:this.path})),10),t.add("submit",m("div",{className:"Form-group"},y().component({type:"submit",className:"Button Button--primary EditEmojiModal-save",loading:this.loading},app.translator.trans("nodeloc-emoji.admin.my_emoji_section.edit_emoji.submit_button")),this.emoji.exists?m("button",{type:"button",className:"Button EditEmojiModal-delete",onclick:this.delete.bind(this)},app.translator.trans("nodeloc-emoji.admin.my_emoji_section.edit_emoji.delete_emoji_button")):""),-10),t},o.submitData=function(){return{category:this.category(),category_name:this.category_name(),title:this.emojiTitle(),textToReplace:this.textToReplace(),path:this.path()}},o.onsubmit=function(t){var e=this;t.preventDefault(),this.loading=!0;var o=this.emoji.exists;this.emoji.save(this.submitData()).then((function(t){e.clearCache().then((function(){e.hide(),o||app.customEmojiListState.addToList(t),e.loading=!1,e.showSuccessMessage()}))}))},o.delete=function(){var t=this;confirm(app.translator.trans("nodeloc-emoji.admin.my_emoji_section.edit_emoji.delete_emoji_confirmation"))&&this.emoji.delete().then((function(){t.clearCache().then((function(){t.hide(),app.customEmojiListState.removeFromList(t.emoji.id()),t.showSuccessMessage()}))}))},o.showSuccessMessage=function(){return app.alerts.show(h(),{type:"success"},app.translator.trans("nodeloc-emoji.admin.my_emoji_section.edit_emoji.saved_message"))},o.clearCache=function(){return app.request({method:"DELETE",url:app.forum.attribute("apiUrl")+"/cache"})},e}(g());const L=flarum.core.compat["common/components/LoadingIndicator"];var N=o.n(L),R=function(t){function e(){return t.apply(this,arguments)||this}r(e,t);var o=e.prototype;return o.oninit=function(e){t.prototype.oninit.call(this,e),app.customEmojiListState.loadResults()},o.view=function(){var t=app.customEmojiListState;return m("div",{className:"customEmoji-list"},t.isLoading()&&0===t.myemoji.length?m(N(),{display:"unset",size:"large"}):"",m("ul",null,t.myemoji.map((function(t){var e=x(t.path())?t.path():app.forum.attribute("baseUrl")+t.path();return m("li",null,m("div",{class:"customEmoji"},m(u(),{className:"Button Button--icon customEmoji-editButton",icon:"fas fa-pencil-alt",onclick:function(){return app.modal.show(T,{model:t})}}),m("div",{className:"customEmoji-imageWrapper"},m("img",{src:e,className:"customEmoji-image",alt:t.title(),title:t.textToReplace()})),m("div",{className:"customEmoji-title"},m("h4",null,t.title()))))})),m("li",null,m("div",{class:"customEmoji addEmoji"},m("div",{className:"customEmoji-imageWrapper"},m(u(),{className:"Button Button--icon customEmoji-addButton",icon:"fas fa-plus",onclick:function(){return app.modal.show(T)}}))))),t.hasMoreResults()&&m("div",{className:"customEmoji-loadMore"},m(u(),{className:"Button Button--primary",disabled:t.isLoading(),loading:t.isLoading(),onclick:function(){return t.loadMore()}},app.translator.trans("nodeloc-emoji.admin.my_emoji_section.emoji_list.load_more_button"))))},e}(d());const M=flarum.core.compat["common/helpers/listItems"];var S=o.n(M);const O=flarum.core.compat["common/utils/ItemList"];var B=o.n(O),F=function(t){function e(){return t.apply(this,arguments)||this}r(e,t);var o=e.prototype;return o.oninit=function(e){t.prototype.oninit.call(this,e)},o.exportEmojiList=function(){var t={};app.store.find("nodeloc/myemoji").then((function(e){e.payload.data.map((function(e,o){var i=e.attributes;t[o]={category:i.category,category_name:i.category_name,title:i.title,text_to_replace:i.text_to_replace,path:i.path}}));var o=new Blob([JSON.stringify(t)],{type:"application/json;charset=utf-8"});(0,c.saveAs)(o,"MyEmoji.json")}))},o.importEmojiList=function(){if(confirm(app.translator.trans("nodeloc-emoji.admin.my_emoji_section.import_myemoji_message"))){var t=document.createElement("input");t.type="file",t.onchange=function(t){app.customEmojiListState.loading=!0;var e=t.target.files[0],o=new FileReader;o.readAsText(e,"UTF-8"),o.onload=function(t){app.request({method:"POST",url:app.forum.attribute("apiUrl")+"/nodeloc/import-myemoji",body:{data:JSON.parse(t.target.result)}}).then((function(){T.prototype.clearCache().then((function(){return window.location.reload()}))}))}},t.click()}},o.MyEmojiTopItems=function(){var t=this,e=new(B());return e.add("import",m(u(),{icon:"fas fa-sign-in-alt",onclick:function(){return t.importEmojiList()}},app.translator.trans("nodeloc-emoji.admin.my_emoji_section.import_json_button"))),e.add("export",m(u(),{icon:"fas fa-share",onclick:function(){return t.exportEmojiList()}},app.translator.trans("nodeloc-emoji.admin.my_emoji_section.export_json_button"))),e},o.view=function(){return m("div",{className:"ExtensionPage-customMyEmoji"},m("div",{className:"ExtensionPage-customMyEmoji-header"},m("div",{className:"container"},m("div",{className:"ExtensionTitle"},m("div",{className:"ExtensionName"},m("h2",null,app.translator.trans("nodeloc-emoji.admin.my_emoji_section.heading_title"))),m("div",{class:"ExtensionPage-headerTopItems"},m("ul",null,S()(this.MyEmojiTopItems().toArray())))))),m("div",{className:"container"},m(R,null)))},e}(d());const k=flarum.core.compat["common/Model"];var A=o.n(k);const U=flarum.core.compat["common/utils/mixin"];var C=function(t){function e(){return t.apply(this,arguments)||this}return r(e,t),e.prototype.apiEndpoint=function(){return"/nodeloc/myemoji"+(this.exists?"/"+this.data.id:"")},e}(o.n(U)()(A(),{category:A().attribute("category"),category_name:A().attribute("category_name"),title:A().attribute("title"),textToReplace:A().attribute("text_to_replace"),path:A().attribute("path")}));const P=flarum.core.compat["admin/components/ExtensionPage"];var I=o.n(P);n().initializers.add("nodeloc-flarum-ext-my-emoji",(function(e){e.store.models.myemoji=C,e.customEmojiListState=new a,(0,t.extend)(I().prototype,"sections",(function(t){console.log("this.extension.id",this.extension.id),"nodeloc-my-emoji"==this.extension.id&&(t.has("permissions")&&t.remove("permissions"),t.add("customMyEmoji",m(F,null)))}))}))})(),module.exports=i})();
//# sourceMappingURL=admin.js.map