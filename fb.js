(()=>{var nd=function(r){let e=[],t=0;for(let n=0;n<r.length;n++){let i=r.charCodeAt(n);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&n+1<r.length&&(r.charCodeAt(n+1)&64512)===56320?(i=65536+((i&1023)<<10)+(r.charCodeAt(++n)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Gg=function(r){let e=[],t=0,n=0;for(;t<r.length;){let i=r[t++];if(i<128)e[n++]=String.fromCharCode(i);else if(i>191&&i<224){let s=r[t++];e[n++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){let s=r[t++],o=r[t++],c=r[t++],u=((i&7)<<18|(s&63)<<12|(o&63)<<6|c&63)-65536;e[n++]=String.fromCharCode(55296+(u>>10)),e[n++]=String.fromCharCode(56320+(u&1023))}else{let s=r[t++],o=r[t++];e[n++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},rd={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,e){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();let t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let i=0;i<r.length;i+=3){let s=r[i],o=i+1<r.length,c=o?r[i+1]:0,u=i+2<r.length,d=u?r[i+2]:0,f=s>>2,m=(s&3)<<4|c>>4,v=(c&15)<<2|d>>6,S=d&63;u||(S=64,o||(v=64)),n.push(t[f],t[m],t[v],t[S])}return n.join("")},encodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(r):this.encodeByteArray(nd(r),e)},decodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(r):Gg(this.decodeStringToByteArray(r,e))},decodeStringToByteArray(r,e){this.init_();let t=e?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let i=0;i<r.length;){let s=t[r.charAt(i++)],c=i<r.length?t[r.charAt(i)]:0;++i;let d=i<r.length?t[r.charAt(i)]:64;++i;let m=i<r.length?t[r.charAt(i)]:64;if(++i,s==null||c==null||d==null||m==null)throw new Ia;let v=s<<2|c>>4;if(n.push(v),d!==64){let S=c<<4&240|d>>2;if(n.push(S),m!==64){let D=d<<6&192|m;n.push(D)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}},Ia=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},Kg=function(r){let e=nd(r);return rd.encodeByteArray(e,!0)},Ea=function(r){return Kg(r).replace(/\./g,"")},Ta=function(r){try{return rd.decodeString(r,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function $g(){if(typeof self!="undefined")return self;if(typeof window!="undefined")return window;if(typeof global!="undefined")return global;throw new Error("Unable to locate global object.")}var Wg=()=>$g().__FIREBASE_DEFAULTS__,Hg=()=>{if(typeof process=="undefined"||typeof process.env=="undefined")return;let r=process.env.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},Qg=()=>{if(typeof document=="undefined")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let e=r&&Ta(r[1]);return e&&JSON.parse(e)},Aa=()=>{try{return Wg()||Hg()||Qg()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}};var id=()=>{var r;return(r=Aa())===null||r===void 0?void 0:r.config},sd=r=>{var e;return(e=Aa())===null||e===void 0?void 0:e[`_${r}`]};var Qi=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,n))}}};function ae(){return typeof navigator!="undefined"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function od(){return typeof window!="undefined"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ae())}function Jg(){var r;let e=(r=Aa())===null||r===void 0?void 0:r.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function ad(){return typeof navigator!="undefined"&&navigator.userAgent==="Cloudflare-Workers"}function cd(){let r=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof r=="object"&&r.id!==void 0}function ud(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function ld(){let r=ae();return r.indexOf("MSIE ")>=0||r.indexOf("Trident/")>=0}function ba(){return!Jg()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Ji(){try{return typeof indexedDB=="object"}catch{return!1}}function hd(){return new Promise((r,e)=>{try{let t=!0,n="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(n);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(n),r(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}var Yg="FirebaseError",xe=class r extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name=Yg,Object.setPrototypeOf(this,r.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,at.prototype.create)}},at=class{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){let n=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?Xg(s,n):"Error",c=`${this.serviceName}: ${o} (${i}).`;return new xe(i,c,n)}};function Xg(r,e){return r.replace(Zg,(t,n)=>{let i=e[n];return i!=null?String(i):`<${n}?>`})}var Zg=/\{\$([^}]+)}/g;function dd(r){for(let e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}function wt(r,e){if(r===e)return!0;let t=Object.keys(r),n=Object.keys(e);for(let i of t){if(!n.includes(i))return!1;let s=r[i],o=e[i];if(td(s)&&td(o)){if(!wt(s,o))return!1}else if(s!==o)return!1}for(let i of n)if(!t.includes(i))return!1;return!0}function td(r){return r!==null&&typeof r=="object"}function Cn(r){let e=[];for(let[t,n]of Object.entries(r))Array.isArray(n)?n.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(n));return e.length?"&"+e.join("&"):""}function Dn(r){let e={};return r.replace(/^\?/,"").split("&").forEach(n=>{if(n){let[i,s]=n.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function Nn(r){let e=r.indexOf("?");if(!e)return"";let t=r.indexOf("#",e);return r.substring(e,t>0?t:void 0)}function fd(r,e){let t=new wa(r,e);return t.subscribe.bind(t)}var wa=class{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(n=>{this.error(n)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let i;if(e===void 0&&t===void 0&&n===void 0)throw new Error("Missing Observer.");e_(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:n},i.next===void 0&&(i.next=va),i.error===void 0&&(i.error=va),i.complete===void 0&&(i.complete=va);let s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(n){typeof console!="undefined"&&console.error&&console.error(n)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}};function e_(r,e){if(typeof r!="object"||r===null)return!1;for(let t of e)if(t in r&&typeof r[t]=="function")return!0;return!1}function va(){}var tE=4*60*60*1e3;function le(r){return r&&r._delegate?r._delegate:r}var Ue=class{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};var Ht="[DEFAULT]";var Sa=class{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let n=new Qi;if(this.instancesDeferred.set(t,n),this.isInitialized(t)||this.shouldAutoInitialize())try{let i=this.getOrInitializeService({instanceIdentifier:t});i&&n.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;let n=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(n_(e))try{this.getOrInitializeService({instanceIdentifier:Ht})}catch{}for(let[t,n]of this.instancesDeferred.entries()){let i=this.normalizeInstanceIdentifier(t);try{let s=this.getOrInitializeService({instanceIdentifier:i});n.resolve(s)}catch{}}}}clearInstance(e=Ht){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Ht){return this.instances.has(e)}getOptions(e=Ht){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let i=this.getOrInitializeService({instanceIdentifier:n,options:t});for(let[s,o]of this.instancesDeferred.entries()){let c=this.normalizeInstanceIdentifier(s);n===c&&o.resolve(i)}return i}onInit(e,t){var n;let i=this.normalizeInstanceIdentifier(t),s=(n=this.onInitCallbacks.get(i))!==null&&n!==void 0?n:new Set;s.add(e),this.onInitCallbacks.set(i,s);let o=this.instances.get(i);return o&&e(o,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){let n=this.onInitCallbacks.get(t);if(n)for(let i of n)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:t_(e),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}return n||null}normalizeInstanceIdentifier(e=Ht){return this.component?this.component.multipleInstances?e:Ht:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function t_(r){return r===Ht?void 0:r}function n_(r){return r.instantiationMode==="EAGER"}var Yi=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new Sa(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}};var r_=[],H;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(H||(H={}));var i_={debug:H.DEBUG,verbose:H.VERBOSE,info:H.INFO,warn:H.WARN,error:H.ERROR,silent:H.SILENT},s_=H.INFO,o_={[H.DEBUG]:"log",[H.VERBOSE]:"log",[H.INFO]:"info",[H.WARN]:"warn",[H.ERROR]:"error"},a_=(r,e,...t)=>{if(e<r.logLevel)return;let n=new Date().toISOString(),i=o_[e];if(i)console[i](`[${n}]  ${r.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)},Et=class{constructor(e){this.name=e,this._logLevel=s_,this._logHandler=a_,this._userLogHandler=null,r_.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in H))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?i_[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,H.DEBUG,...e),this._logHandler(this,H.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,H.VERBOSE,...e),this._logHandler(this,H.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,H.INFO,...e),this._logHandler(this,H.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,H.WARN,...e),this._logHandler(this,H.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,H.ERROR,...e),this._logHandler(this,H.ERROR,...e)}};var c_=(r,e)=>e.some(t=>r instanceof t),pd,md;function u_(){return pd||(pd=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function l_(){return md||(md=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var gd=new WeakMap,Pa=new WeakMap,_d=new WeakMap,Ra=new WeakMap,Da=new WeakMap;function h_(r){let e=new Promise((t,n)=>{let i=()=>{r.removeEventListener("success",s),r.removeEventListener("error",o)},s=()=>{t(Qe(r.result)),i()},o=()=>{n(r.error),i()};r.addEventListener("success",s),r.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&gd.set(t,r)}).catch(()=>{}),Da.set(e,r),e}function d_(r){if(Pa.has(r))return;let e=new Promise((t,n)=>{let i=()=>{r.removeEventListener("complete",s),r.removeEventListener("error",o),r.removeEventListener("abort",o)},s=()=>{t(),i()},o=()=>{n(r.error||new DOMException("AbortError","AbortError")),i()};r.addEventListener("complete",s),r.addEventListener("error",o),r.addEventListener("abort",o)});Pa.set(r,e)}var Ca={get(r,e,t){if(r instanceof IDBTransaction){if(e==="done")return Pa.get(r);if(e==="objectStoreNames")return r.objectStoreNames||_d.get(r);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Qe(r[e])},set(r,e,t){return r[e]=t,!0},has(r,e){return r instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in r}};function yd(r){Ca=r(Ca)}function f_(r){return r===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){let n=r.call(Xi(this),e,...t);return _d.set(n,e.sort?e.sort():[e]),Qe(n)}:l_().includes(r)?function(...e){return r.apply(Xi(this),e),Qe(gd.get(this))}:function(...e){return Qe(r.apply(Xi(this),e))}}function p_(r){return typeof r=="function"?f_(r):(r instanceof IDBTransaction&&d_(r),c_(r,u_())?new Proxy(r,Ca):r)}function Qe(r){if(r instanceof IDBRequest)return h_(r);if(Ra.has(r))return Ra.get(r);let e=p_(r);return e!==r&&(Ra.set(r,e),Da.set(e,r)),e}var Xi=r=>Da.get(r);function Id(r,e,{blocked:t,upgrade:n,blocking:i,terminated:s}={}){let o=indexedDB.open(r,e),c=Qe(o);return n&&o.addEventListener("upgradeneeded",u=>{n(Qe(o.result),u.oldVersion,u.newVersion,Qe(o.transaction),u)}),t&&o.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{s&&u.addEventListener("close",()=>s()),i&&u.addEventListener("versionchange",d=>i(d.oldVersion,d.newVersion,d))}).catch(()=>{}),c}var m_=["get","getKey","getAll","getAllKeys","count"],g_=["put","add","delete","clear"],Na=new Map;function vd(r,e){if(!(r instanceof IDBDatabase&&!(e in r)&&typeof e=="string"))return;if(Na.get(e))return Na.get(e);let t=e.replace(/FromIndex$/,""),n=e!==t,i=g_.includes(t);if(!(t in(n?IDBIndex:IDBObjectStore).prototype)||!(i||m_.includes(t)))return;let s=async function(o,...c){let u=this.transaction(o,i?"readwrite":"readonly"),d=u.store;return n&&(d=d.index(c.shift())),(await Promise.all([d[t](...c),i&&u.done]))[0]};return Na.set(e,s),s}yd(r=>({...r,get:(e,t,n)=>vd(e,t)||r.get(e,t,n),has:(e,t)=>!!vd(e,t)||r.has(e,t)}));var Oa=class{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(__(t)){let n=t.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(t=>t).join(" ")}};function __(r){let e=r.getComponent();return(e==null?void 0:e.type)==="VERSION"}var xa="@firebase/app",wd="0.10.13";var ct=new Et("@firebase/app"),y_="@firebase/app-compat",v_="@firebase/analytics-compat",I_="@firebase/analytics",w_="@firebase/app-check-compat",E_="@firebase/app-check",T_="@firebase/auth",A_="@firebase/auth-compat",b_="@firebase/database",S_="@firebase/data-connect",R_="@firebase/database-compat",P_="@firebase/functions",C_="@firebase/functions-compat",D_="@firebase/installations",N_="@firebase/installations-compat",k_="@firebase/messaging",O_="@firebase/messaging-compat",x_="@firebase/performance",V_="@firebase/performance-compat",L_="@firebase/remote-config",M_="@firebase/remote-config-compat",F_="@firebase/storage",U_="@firebase/storage-compat",B_="@firebase/firestore",q_="@firebase/vertexai-preview",j_="@firebase/firestore-compat",z_="firebase",G_="10.14.1";var Sd="[DEFAULT]",K_={[xa]:"fire-core",[y_]:"fire-core-compat",[I_]:"fire-analytics",[v_]:"fire-analytics-compat",[E_]:"fire-app-check",[w_]:"fire-app-check-compat",[T_]:"fire-auth",[A_]:"fire-auth-compat",[b_]:"fire-rtdb",[S_]:"fire-data-connect",[R_]:"fire-rtdb-compat",[P_]:"fire-fn",[C_]:"fire-fn-compat",[D_]:"fire-iid",[N_]:"fire-iid-compat",[k_]:"fire-fcm",[O_]:"fire-fcm-compat",[x_]:"fire-perf",[V_]:"fire-perf-compat",[L_]:"fire-rc",[M_]:"fire-rc-compat",[F_]:"fire-gcs",[U_]:"fire-gcs-compat",[B_]:"fire-fst",[j_]:"fire-fst-compat",[q_]:"fire-vertex","fire-js":"fire-js",[z_]:"fire-js-all"};var Va=new Map,$_=new Map,La=new Map;function Ed(r,e){try{r.container.addComponent(e)}catch(t){ct.debug(`Component ${e.name} failed to register with FirebaseApp ${r.name}`,t)}}function Tt(r){let e=r.name;if(La.has(e))return ct.debug(`There were multiple attempts to register component ${e}.`),!1;La.set(e,r);for(let t of Va.values())Ed(t,r);for(let t of $_.values())Ed(t,r);return!0}function Mr(r,e){let t=r.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),r.container.getProvider(e)}function Rd(r,e,t=Sd){Mr(r,e).clearInstance(t)}function Be(r){return r.settings!==void 0}var W_={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Qt=new at("app","Firebase",W_);var Ma=class{constructor(e,t,n){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new Ue("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Qt.create("app-deleted",{appName:this._name})}};var At=G_;function Pd(r,e={}){let t=r;typeof e!="object"&&(e={name:e});let n=Object.assign({name:Sd,automaticDataCollectionEnabled:!1},e),i=n.name;if(typeof i!="string"||!i)throw Qt.create("bad-app-name",{appName:String(i)});if(t||(t=id()),!t)throw Qt.create("no-options");let s=Va.get(i);if(s){if(wt(t,s.options)&&wt(n,s.config))return s;throw Qt.create("duplicate-app",{appName:i})}let o=new Yi(i);for(let u of La.values())o.addComponent(u);let c=new Ma(t,n,o);return Va.set(i,c),c}function $e(r,e,t){var n;let i=(n=K_[r])!==null&&n!==void 0?n:r;t&&(i+=`-${t}`);let s=i.match(/\s|\//),o=e.match(/\s|\//);if(s||o){let c=[`Unable to register library "${i}" with version "${e}":`];s&&c.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&o&&c.push("and"),o&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ct.warn(c.join(" "));return}Tt(new Ue(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}var H_="firebase-heartbeat-database",Q_=1,Lr="firebase-heartbeat-store",ka=null;function Cd(){return ka||(ka=Id(H_,Q_,{upgrade:(r,e)=>{switch(e){case 0:try{r.createObjectStore(Lr)}catch(t){console.warn(t)}}}}).catch(r=>{throw Qt.create("idb-open",{originalErrorMessage:r.message})})),ka}async function J_(r){try{let t=(await Cd()).transaction(Lr),n=await t.objectStore(Lr).get(Dd(r));return await t.done,n}catch(e){if(e instanceof xe)ct.warn(e.message);else{let t=Qt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});ct.warn(t.message)}}}async function Td(r,e){try{let n=(await Cd()).transaction(Lr,"readwrite");await n.objectStore(Lr).put(e,Dd(r)),await n.done}catch(t){if(t instanceof xe)ct.warn(t.message);else{let n=Qt.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});ct.warn(n.message)}}}function Dd(r){return`${r.name}!${r.options.appId}`}var Y_=1024,X_=30*24*60*60*1e3,Fa=class{constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider("app").getImmediate();this._storage=new Ua(t),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){var e,t;try{let i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Ad();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s)?void 0:(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{let c=new Date(o.date).valueOf();return Date.now()-c<=X_}),this._storage.overwrite(this._heartbeatsCache))}catch(n){ct.warn(n)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";let t=Ad(),{heartbeatsToSend:n,unsentEntries:i}=Z_(this._heartbeatsCache.heartbeats),s=Ea(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return ct.warn(t),""}}};function Ad(){return new Date().toISOString().substring(0,10)}function Z_(r,e=Y_){let t=[],n=r.slice();for(let i of r){let s=t.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),bd(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),bd(t)>e){t.pop();break}n=n.slice(1)}return{heartbeatsToSend:t,unsentEntries:n}}var Ua=class{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Ji()?hd().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let t=await J_(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){let i=await this.read();return Td(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){let i=await this.read();return Td(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}};function bd(r){return Ea(JSON.stringify({version:2,heartbeats:r})).length}function ey(r){Tt(new Ue("platform-logger",e=>new Oa(e),"PRIVATE")),Tt(new Ue("heartbeat",e=>new Fa(e),"PRIVATE")),$e(xa,wd,r),$e(xa,wd,"esm2017"),$e("fire-js","")}ey("");var ty="firebase",ny="10.14.1";$e(ty,ny,"app");function Zi(r,e){var t={};for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&e.indexOf(n)<0&&(t[n]=r[n]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,n=Object.getOwnPropertySymbols(r);i<n.length;i++)e.indexOf(n[i])<0&&Object.prototype.propertyIsEnumerable.call(r,n[i])&&(t[n[i]]=r[n[i]]);return t}function Kd(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}var $d=Kd,Wd=new at("auth","Firebase",Kd());var ss=new Et("@firebase/auth");function iy(r,...e){ss.logLevel<=H.WARN&&ss.warn(`Auth (${At}): ${r}`,...e)}function ts(r,...e){ss.logLevel<=H.ERROR&&ss.error(`Auth (${At}): ${r}`,...e)}function qe(r,...e){throw oc(r,...e)}function We(r,...e){return oc(r,...e)}function sc(r,e,t){let n=Object.assign(Object.assign({},$d()),{[e]:t});return new at("auth","Firebase",n).create(e,{appName:r.name})}function lt(r){return sc(r,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function sy(r,e,t){let n=t;if(!(e instanceof n))throw n.name!==e.constructor.name&&qe(r,"argument-error"),sc(r,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function oc(r,...e){if(typeof r!="string"){let t=e[0],n=[...e.slice(1)];return n[0]&&(n[0].appName=r.name),r._errorFactory.create(t,...n)}return Wd.create(r,...e)}function F(r,e,...t){if(!r)throw oc(e,...t)}function Je(r){let e="INTERNAL ASSERTION FAILED: "+r;throw ts(e),new Error(e)}function ht(r,e){r||Je(e)}function ja(){var r;return typeof self!="undefined"&&((r=self.location)===null||r===void 0?void 0:r.href)||""}function oy(){return Nd()==="http:"||Nd()==="https:"}function Nd(){var r;return typeof self!="undefined"&&((r=self.location)===null||r===void 0?void 0:r.protocol)||null}function ay(){return typeof navigator!="undefined"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(oy()||cd()||"connection"in navigator)?navigator.onLine:!0}function cy(){if(typeof navigator=="undefined")return null;let r=navigator;return r.languages&&r.languages[0]||r.language||null}var Jt=class{constructor(e,t){this.shortDelay=e,this.longDelay=t,ht(t>e,"Short delay should be less than long delay!"),this.isMobile=od()||ud()}get(){return ay()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}};function ac(r,e){ht(r.emulator,"Emulator should always be set here");let{url:t}=r.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}var os=class{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self!="undefined"&&"fetch"in self)return self.fetch;if(typeof globalThis!="undefined"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch!="undefined")return fetch;Je("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self!="undefined"&&"Headers"in self)return self.Headers;if(typeof globalThis!="undefined"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers!="undefined")return Headers;Je("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self!="undefined"&&"Response"in self)return self.Response;if(typeof globalThis!="undefined"&&globalThis.Response)return globalThis.Response;if(typeof Response!="undefined")return Response;Je("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}};var uy={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};var ly=new Jt(3e4,6e4);function he(r,e){return r.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:r.tenantId}):e}async function _e(r,e,t,n,i={}){return Hd(r,i,async()=>{let s={},o={};n&&(e==="GET"?o=n:s={body:JSON.stringify(n)});let c=Cn(Object.assign({key:r.config.apiKey},o)).slice(1),u=await r._getAdditionalHeaders();u["Content-Type"]="application/json",r.languageCode&&(u["X-Firebase-Locale"]=r.languageCode);let d=Object.assign({method:e,headers:u},s);return ad()||(d.referrerPolicy="no-referrer"),os.fetch()(Qd(r,r.config.apiHost,t,c),d)})}async function Hd(r,e,t){r._canInitEmulator=!1;let n=Object.assign(Object.assign({},uy),e);try{let i=new za(r),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();let o=await s.json();if("needConfirmation"in o)throw Fr(r,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{let c=s.ok?o.errorMessage:o.error.message,[u,d]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw Fr(r,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw Fr(r,"email-already-in-use",o);if(u==="USER_DISABLED")throw Fr(r,"user-disabled",o);let f=n[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw sc(r,f,d);qe(r,f)}}catch(i){if(i instanceof xe)throw i;qe(r,"network-request-failed",{message:String(i)})}}async function St(r,e,t,n,i={}){let s=await _e(r,e,t,n,i);return"mfaPendingCredential"in s&&qe(r,"multi-factor-auth-required",{_serverResponse:s}),s}function Qd(r,e,t,n){let i=`${e}${t}?${n}`;return r.config.emulator?ac(r.config,i):`${r.config.apiScheme}://${i}`}function hy(r){switch(r){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}var za=class{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,n)=>{this.timer=setTimeout(()=>n(We(this.auth,"network-request-failed")),ly.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}};function Fr(r,e,t){let n={appName:r.name};t.email&&(n.email=t.email),t.phoneNumber&&(n.phoneNumber=t.phoneNumber);let i=We(r,e,n);return i.customData._tokenResponse=t,i}function kd(r){return r!==void 0&&r.enterprise!==void 0}var Ga=class{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(let t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return hy(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}};async function dy(r,e){return _e(r,"GET","/v2/recaptchaConfig",he(r,e))}async function fy(r,e){return _e(r,"POST","/v1/accounts:delete",e)}async function Jd(r,e){return _e(r,"POST","/v1/accounts:lookup",e)}function Ur(r){if(r)try{let e=new Date(Number(r));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Yd(r,e=!1){let t=le(r),n=await t.getIdToken(e),i=cc(n);F(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");let s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:n,authTime:Ur(Ba(i.auth_time)),issuedAtTime:Ur(Ba(i.iat)),expirationTime:Ur(Ba(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function Ba(r){return Number(r)*1e3}function cc(r){let[e,t,n]=r.split(".");if(e===void 0||t===void 0||n===void 0)return ts("JWT malformed, contained fewer than 3 sections"),null;try{let i=Ta(t);return i?JSON.parse(i):(ts("Failed to decode base64 JWT payload"),null)}catch(i){return ts("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function Od(r){let e=cc(r);return F(e,"internal-error"),F(typeof e.exp!="undefined","internal-error"),F(typeof e.iat!="undefined","internal-error"),Number(e.exp)-Number(e.iat)}async function On(r,e,t=!1){if(t)return e;try{return await e}catch(n){throw n instanceof xe&&py(n)&&r.auth.currentUser===r&&await r.auth.signOut(),n}}function py({code:r}){return r==="auth/user-disabled"||r==="auth/user-token-expired"}var Ka=class{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){let n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;let i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;let t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}};var qr=class{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ur(this.lastLoginAt),this.creationTime=Ur(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}};async function as(r){var e;let t=r.auth,n=await r.getIdToken(),i=await On(r,Jd(t,{idToken:n}));F(i==null?void 0:i.users.length,t,"internal-error");let s=i.users[0];r._notifyReloadListener(s);let o=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?Zd(s.providerUserInfo):[],c=my(r.providerData,o),u=r.isAnonymous,d=!(r.email&&s.passwordHash)&&!(c!=null&&c.length),f=u?d:!1,m={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:c,metadata:new qr(s.createdAt,s.lastLoginAt),isAnonymous:f};Object.assign(r,m)}async function Xd(r){let e=le(r);await as(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function my(r,e){return[...r.filter(n=>!e.some(i=>i.providerId===n.providerId)),...e]}function Zd(r){return r.map(e=>{var{providerId:t}=e,n=Zi(e,["providerId"]);return{providerId:t,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}})}async function gy(r,e){let t=await Hd(r,{},async()=>{let n=Cn({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=r.config,o=Qd(r,i,"/v1/token",`key=${s}`),c=await r._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",os.fetch()(o,{method:"POST",headers:c,body:n})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function _y(r,e){return _e(r,"POST","/v2/accounts:revokeToken",he(r,e))}var Br=class r{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){F(e.idToken,"internal-error"),F(typeof e.idToken!="undefined","internal-error"),F(typeof e.refreshToken!="undefined","internal-error");let t="expiresIn"in e&&typeof e.expiresIn!="undefined"?Number(e.expiresIn):Od(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){F(e.length!==0,"internal-error");let t=Od(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(F(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){let{accessToken:n,refreshToken:i,expiresIn:s}=await gy(e,t);this.updateTokensAndExpiration(n,i,Number(s))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+n*1e3}static fromJSON(e,t){let{refreshToken:n,accessToken:i,expirationTime:s}=t,o=new r;return n&&(F(typeof n=="string","internal-error",{appName:e}),o.refreshToken=n),i&&(F(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(F(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new r,this.toJSON())}_performRefresh(){return Je("not implemented")}};function bt(r,e){F(typeof r=="string"||typeof r=="undefined","internal-error",{appName:e})}var xn=class r{constructor(e){var{uid:t,auth:n,stsTokenManager:i}=e,s=Zi(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Ka(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=n,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new qr(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){let t=await On(this,this.stsTokenManager.getToken(this.auth,e));return F(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Yd(this,e)}reload(){return Xd(this)}_assign(e){this!==e&&(F(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){let t=new r(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){F(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await as(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Be(this.auth.app))return Promise.reject(lt(this.auth));let e=await this.getIdToken();return await On(this,fy(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var n,i,s,o,c,u,d,f;let m=(n=t.displayName)!==null&&n!==void 0?n:void 0,v=(i=t.email)!==null&&i!==void 0?i:void 0,S=(s=t.phoneNumber)!==null&&s!==void 0?s:void 0,D=(o=t.photoURL)!==null&&o!==void 0?o:void 0,k=(c=t.tenantId)!==null&&c!==void 0?c:void 0,N=(u=t._redirectEventId)!==null&&u!==void 0?u:void 0,z=(d=t.createdAt)!==null&&d!==void 0?d:void 0,j=(f=t.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:B,emailVerified:W,isAnonymous:Y,providerData:G,stsTokenManager:I}=t;F(B&&I,e,"internal-error");let g=Br.fromJSON(this.name,I);F(typeof B=="string",e,"internal-error"),bt(m,e.name),bt(v,e.name),F(typeof W=="boolean",e,"internal-error"),F(typeof Y=="boolean",e,"internal-error"),bt(S,e.name),bt(D,e.name),bt(k,e.name),bt(N,e.name),bt(z,e.name),bt(j,e.name);let y=new r({uid:B,auth:e,email:v,emailVerified:W,displayName:m,isAnonymous:Y,photoURL:D,phoneNumber:S,tenantId:k,stsTokenManager:g,createdAt:z,lastLoginAt:j});return G&&Array.isArray(G)&&(y.providerData=G.map(w=>Object.assign({},w))),N&&(y._redirectEventId=N),y}static async _fromIdTokenResponse(e,t,n=!1){let i=new Br;i.updateFromServerResponse(t);let s=new r({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:n});return await as(s),s}static async _fromGetAccountInfoResponse(e,t,n){let i=t.users[0];F(i.localId!==void 0,"internal-error");let s=i.providerUserInfo!==void 0?Zd(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),c=new Br;c.updateFromIdToken(n);let u=new r({uid:i.localId,auth:e,stsTokenManager:c,isAnonymous:o}),d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new qr(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(u,d),u}};var xd=new Map;function ut(r){ht(r instanceof Function,"Expected a class definition");let e=xd.get(r);return e?(ht(e instanceof r,"Instance stored in cache mismatched with class"),e):(e=new r,xd.set(r,e),e)}var cs=class{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){let t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}};cs.type="NONE";var $a=cs;function ns(r,e,t){return`firebase:${r}:${e}:${t}`}var us=class r{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;let{config:i,name:s}=this.auth;this.fullUserKey=ns(this.userKey,i.apiKey,s),this.fullPersistenceKey=ns("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){let e=await this.persistence._get(this.fullUserKey);return e?xn._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;let t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new r(ut($a),e,n);let i=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d),s=i[0]||ut($a),o=ns(n,e.config.apiKey,e.name),c=null;for(let d of t)try{let f=await d._get(o);if(f){let m=xn._fromJSON(e,f);d!==s&&(c=m),s=d;break}}catch{}let u=i.filter(d=>d._shouldAllowMigration);return!s._shouldAllowMigration||!u.length?new r(s,e,n):(s=u[0],c&&await s._set(o,c.toJSON()),await Promise.all(t.map(async d=>{if(d!==s)try{await d._remove(o)}catch{}})),new r(s,e,n))}};function Vd(r){let e=r.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(rf(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(ef(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(of(e))return"Blackberry";if(af(e))return"Webos";if(tf(e))return"Safari";if((e.includes("chrome/")||nf(e))&&!e.includes("edge/"))return"Chrome";if(sf(e))return"Android";{let t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=r.match(t);if((n==null?void 0:n.length)===2)return n[1]}return"Other"}function ef(r=ae()){return/firefox\//i.test(r)}function tf(r=ae()){let e=r.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function nf(r=ae()){return/crios\//i.test(r)}function rf(r=ae()){return/iemobile/i.test(r)}function sf(r=ae()){return/android/i.test(r)}function of(r=ae()){return/blackberry/i.test(r)}function af(r=ae()){return/webos/i.test(r)}function uc(r=ae()){return/iphone|ipad|ipod/i.test(r)||/macintosh/i.test(r)&&/mobile/i.test(r)}function yy(r=ae()){var e;return uc(r)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function vy(){return ld()&&document.documentMode===10}function cf(r=ae()){return uc(r)||sf(r)||af(r)||of(r)||/windows phone/i.test(r)||rf(r)}function uf(r,e=[]){let t;switch(r){case"Browser":t=Vd(ae());break;case"Worker":t=`${Vd(ae())}-${r}`;break;default:t=r}let n=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${At}/${n}`}var Wa=class{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){let n=s=>new Promise((o,c)=>{try{let u=e(s);o(u)}catch(u){c(u)}});n.onAbort=t,this.queue.push(n);let i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;let t=[];try{for(let n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(n){t.reverse();for(let i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:n==null?void 0:n.message})}}};async function Iy(r,e={}){return _e(r,"GET","/v2/passwordPolicy",he(r,e))}var wy=6,Ha=class{constructor(e){var t,n,i,s;let o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=o.minPasswordLength)!==null&&t!==void 0?t:wy,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(n=e.allowedNonAlphanumericCharacters)===null||n===void 0?void 0:n.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,n,i,s,o,c;let u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(t=u.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),u.isValid&&(u.isValid=(n=u.meetsMaxPasswordLength)!==null&&n!==void 0?n:!0),u.isValid&&(u.isValid=(i=u.containsLowercaseLetter)!==null&&i!==void 0?i:!0),u.isValid&&(u.isValid=(s=u.containsUppercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(o=u.containsNumericCharacter)!==null&&o!==void 0?o:!0),u.isValid&&(u.isValid=(c=u.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),u}validatePasswordLengthOptions(e,t){let n=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let n;for(let i=0;i<e.length;i++)n=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}};var Qa=class{constructor(e,t,n,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new ls(this),this.idTokenSubscription=new ls(this),this.beforeStateQueue=new Wa(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Wd,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=ut(t)),this._initializationPromise=this.queue(async()=>{var n,i;if(!this._deleted&&(this.persistenceManager=await us.create(this,e),!this._deleted)){if(!((n=this._popupRedirectResolver)===null||n===void 0)&&n._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;let e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{let t=await Jd(this,{idToken:e}),n=await xn._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(Be(this.app)){let o=this.app.settings.authIdToken;return o?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(c,c))}):this.directlySetCurrentUser(null)}let n=await this.assertedPersistence.getCurrentUser(),i=n,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();let o=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=i==null?void 0:i._redirectEventId,u=await this.tryRedirectSignIn(e);(!o||o===c)&&(u!=null&&u.user)&&(i=u.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(o){i=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return F(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await as(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=cy()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Be(this.app))return Promise.reject(lt(this));let t=e?le(e):null;return t&&F(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&F(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Be(this.app)?Promise.reject(lt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Be(this.app)?Promise.reject(lt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(ut(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();let t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){let e=await Iy(this),t=new Ha(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new at("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{let n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){let t=await this.currentUser.getIdToken(),n={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(n.tenantId=this.tenantId),await _y(this,n)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){let n=await this.getOrInitRedirectPersistenceManager(t);return e===null?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){let t=e&&ut(e)||this._popupRedirectResolver;F(t,this,"argument-error"),this.redirectPersistenceManager=await us.create(this,[ut(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,n;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);let n=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==n&&(this.lastNotifiedUid=n,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,i){if(this._deleted)return()=>{};let s=typeof t=="function"?t:t.next.bind(t),o=!1,c=this._isInitialized?Promise.resolve():this._initializationPromise;if(F(c,this,"internal-error"),c.then(()=>{o||s(this.currentUser)}),typeof t=="function"){let u=e.addObserver(t,n,i);return()=>{o=!0,u()}}else{let u=e.addObserver(t);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return F(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=uf(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;let t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);let n=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());n&&(t["X-Firebase-Client"]=n);let i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;let t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&iy(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}};function dt(r){return le(r)}var ls=class{constructor(e){this.auth=e,this.observer=null,this.addObserver=fd(t=>this.observer=t)}get next(){return F(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}};var Ps={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Ey(r){Ps=r}function lf(r){return Ps.loadJS(r)}function Ty(){return Ps.recaptchaEnterpriseScript}function Ay(){return Ps.gapiScript}function hf(r){return`__${r}${Math.floor(Math.random()*1e6)}`}var by="recaptcha-enterprise",Sy="NO_RECAPTCHA",Ja=class{constructor(e){this.type=by,this.auth=dt(e)}async verify(e="verify",t=!1){async function n(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(o,c)=>{dy(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(u=>{if(u.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{let d=new Ga(u);return s.tenantId==null?s._agentRecaptchaConfig=d:s._tenantRecaptchaConfigs[s.tenantId]=d,o(d.siteKey)}}).catch(u=>{c(u)})})}function i(s,o,c){let u=window.grecaptcha;kd(u)?u.enterprise.ready(()=>{u.enterprise.execute(s,{action:e}).then(d=>{o(d)}).catch(()=>{o(Sy)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return new Promise((s,o)=>{n(this.auth).then(c=>{if(!t&&kd(window.grecaptcha))i(c,s,o);else{if(typeof window=="undefined"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let u=Ty();u.length!==0&&(u+=c),lf(u).then(()=>{i(c,s,o)}).catch(d=>{o(d)})}}).catch(c=>{o(c)})})}};async function Ld(r,e,t,n=!1){let i=new Ja(r),s;try{s=await i.verify(t)}catch{s=await i.verify(t,!0)}let o=Object.assign({},e);return n?Object.assign(o,{captchaResp:s}):Object.assign(o,{captchaResponse:s}),Object.assign(o,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(o,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),o}async function hs(r,e,t,n){var i;if(!((i=r._getRecaptchaConfig())===null||i===void 0)&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){let s=await Ld(r,e,t,t==="getOobCode");return n(r,s)}else return n(r,e).catch(async s=>{if(s.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);let o=await Ld(r,e,t,t==="getOobCode");return n(r,o)}else return Promise.reject(s)})}function lc(r,e){let t=Mr(r,"auth");if(t.isInitialized()){let i=t.getImmediate(),s=t.getOptions();if(wt(s,e!=null?e:{}))return i;qe(i,"already-initialized")}return t.initialize({options:e})}function Ry(r,e){let t=(e==null?void 0:e.persistence)||[],n=(Array.isArray(t)?t:[t]).map(ut);e!=null&&e.errorMap&&r._updateErrorMap(e.errorMap),r._initializeWithPersistence(n,e==null?void 0:e.popupRedirectResolver)}var Yt=class{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Je("not implemented")}_getIdTokenResponse(e){return Je("not implemented")}_linkToIdToken(e,t){return Je("not implemented")}_getReauthenticationResolver(e){return Je("not implemented")}};async function Py(r,e){return _e(r,"POST","/v1/accounts:signUp",e)}async function Cy(r,e){return St(r,"POST","/v1/accounts:signInWithPassword",he(r,e))}async function Dy(r,e){return _e(r,"POST","/v1/accounts:sendOobCode",he(r,e))}async function Ny(r,e){return Dy(r,e)}async function ky(r,e){return St(r,"POST","/v1/accounts:signInWithEmailLink",he(r,e))}async function Oy(r,e){return St(r,"POST","/v1/accounts:signInWithEmailLink",he(r,e))}var jr=class r extends Yt{constructor(e,t,n,i=null){super("password",n),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new r(e,t,"password")}static _fromEmailAndCode(e,t,n=null){return new r(e,t,"emailLink",n)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":let t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return hs(e,t,"signInWithPassword",Cy);case"emailLink":return ky(e,{email:this._email,oobCode:this._password});default:qe(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":let n={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return hs(e,n,"signUpPassword",Py);case"emailLink":return Oy(e,{idToken:t,email:this._email,oobCode:this._password});default:qe(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}};async function kn(r,e){return St(r,"POST","/v1/accounts:signInWithIdp",he(r,e))}var xy="http://localhost",Xt=class r extends Yt{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){let t=new r(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):qe("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e,{providerId:n,signInMethod:i}=t,s=Zi(t,["providerId","signInMethod"]);if(!n||!i)return null;let o=new r(n,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){let t=this.buildRequest();return kn(e,t)}_linkToIdToken(e,t){let n=this.buildRequest();return n.idToken=t,kn(e,n)}_getReauthenticationResolver(e){let t=this.buildRequest();return t.autoCreate=!1,kn(e,t)}buildRequest(){let e={requestUri:xy,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{let t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Cn(t)}return e}};async function Vy(r,e){return _e(r,"POST","/v1/accounts:sendVerificationCode",he(r,e))}async function Ly(r,e){return St(r,"POST","/v1/accounts:signInWithPhoneNumber",he(r,e))}async function My(r,e){let t=await St(r,"POST","/v1/accounts:signInWithPhoneNumber",he(r,e));if(t.temporaryProof)throw Fr(r,"account-exists-with-different-credential",t);return t}var Fy={USER_NOT_FOUND:"user-not-found"};async function Uy(r,e){let t=Object.assign(Object.assign({},e),{operation:"REAUTH"});return St(r,"POST","/v1/accounts:signInWithPhoneNumber",he(r,t),Fy)}var zr=class r extends Yt{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new r({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new r({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return Ly(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return My(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return Uy(e,this._makeVerificationRequest())}_makeVerificationRequest(){let{temporaryProof:e,phoneNumber:t,verificationId:n,verificationCode:i}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:n,code:i}}toJSON(){let e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));let{verificationId:t,verificationCode:n,phoneNumber:i,temporaryProof:s}=e;return!n&&!t&&!i&&!s?null:new r({verificationId:t,verificationCode:n,phoneNumber:i,temporaryProof:s})}};function By(r){switch(r){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function qy(r){let e=Dn(Nn(r)).link,t=e?Dn(Nn(e)).deep_link_id:null,n=Dn(Nn(r)).deep_link_id;return(n?Dn(Nn(n)).link:null)||n||t||e||r}var ds=class r{constructor(e){var t,n,i,s,o,c;let u=Dn(Nn(e)),d=(t=u.apiKey)!==null&&t!==void 0?t:null,f=(n=u.oobCode)!==null&&n!==void 0?n:null,m=By((i=u.mode)!==null&&i!==void 0?i:null);F(d&&f&&m,"argument-error"),this.apiKey=d,this.operation=m,this.code=f,this.continueUrl=(s=u.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(o=u.languageCode)!==null&&o!==void 0?o:null,this.tenantId=(c=u.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){let t=qy(e);try{return new r(t)}catch{return null}}};var Zt=class r{constructor(){this.providerId=r.PROVIDER_ID}static credential(e,t){return jr._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){let n=ds.parseLink(t);return F(n,"argument-error"),jr._fromEmailAndCode(e,n.code,n.tenantId)}};Zt.PROVIDER_ID="password";Zt.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Zt.EMAIL_LINK_SIGN_IN_METHOD="emailLink";var Gr=class{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}};var en=class extends Gr{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}};var Kr=class r extends en{constructor(){super("facebook.com")}static credential(e){return Xt._fromParams({providerId:r.PROVIDER_ID,signInMethod:r.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return r.credentialFromTaggedObject(e)}static credentialFromError(e){return r.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return r.credential(e.oauthAccessToken)}catch{return null}}};Kr.FACEBOOK_SIGN_IN_METHOD="facebook.com";Kr.PROVIDER_ID="facebook.com";var tn=class r extends en{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Xt._fromParams({providerId:r.PROVIDER_ID,signInMethod:r.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return r.credentialFromTaggedObject(e)}static credentialFromError(e){return r.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return r.credential(t,n)}catch{return null}}};tn.GOOGLE_SIGN_IN_METHOD="google.com";tn.PROVIDER_ID="google.com";var $r=class r extends en{constructor(){super("github.com")}static credential(e){return Xt._fromParams({providerId:r.PROVIDER_ID,signInMethod:r.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return r.credentialFromTaggedObject(e)}static credentialFromError(e){return r.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return r.credential(e.oauthAccessToken)}catch{return null}}};$r.GITHUB_SIGN_IN_METHOD="github.com";$r.PROVIDER_ID="github.com";var Wr=class r extends en{constructor(){super("twitter.com")}static credential(e,t){return Xt._fromParams({providerId:r.PROVIDER_ID,signInMethod:r.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return r.credentialFromTaggedObject(e)}static credentialFromError(e){return r.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return r.credential(t,n)}catch{return null}}};Wr.TWITTER_SIGN_IN_METHOD="twitter.com";Wr.PROVIDER_ID="twitter.com";async function jy(r,e){return St(r,"POST","/v1/accounts:signUp",he(r,e))}var Vn=class r{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,i=!1){let s=await xn._fromIdTokenResponse(e,n,i),o=Md(n);return new r({user:s,providerId:o,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);let i=Md(n);return new r({user:e,providerId:i,_tokenResponse:n,operationType:t})}};function Md(r){return r.providerId?r.providerId:"phoneNumber"in r?"phone":null}var Ya=class r extends xe{constructor(e,t,n,i){var s;super(t.code,t.message),this.operationType=n,this.user=i,Object.setPrototypeOf(this,r.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,i){return new r(e,t,n,i)}};function df(r,e,t,n){return(e==="reauthenticate"?t._getReauthenticationResolver(r):t._getIdTokenResponse(r)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?Ya._fromErrorAndOperation(r,s,e,n):s})}async function zy(r,e,t=!1){let n=await On(r,e._linkToIdToken(r.auth,await r.getIdToken()),t);return Vn._forOperation(r,"link",n)}async function Gy(r,e,t=!1){let{auth:n}=r;if(Be(n.app))return Promise.reject(lt(n));let i="reauthenticate";try{let s=await On(r,df(n,i,e,r),t);F(s.idToken,n,"internal-error");let o=cc(s.idToken);F(o,n,"internal-error");let{sub:c}=o;return F(r.uid===c,n,"user-mismatch"),Vn._forOperation(r,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&qe(n,"user-mismatch"),s}}async function ff(r,e,t=!1){if(Be(r.app))return Promise.reject(lt(r));let n="signIn",i=await df(r,n,e),s=await Vn._fromIdTokenResponse(r,n,i);return t||await r._updateCurrentUser(s.user),s}async function pf(r,e){return ff(dt(r),e)}function Ky(r,e,t){var n;F(((n=t.url)===null||n===void 0?void 0:n.length)>0,r,"invalid-continue-uri"),F(typeof t.dynamicLinkDomain=="undefined"||t.dynamicLinkDomain.length>0,r,"invalid-dynamic-link-domain"),e.continueUrl=t.url,e.dynamicLinkDomain=t.dynamicLinkDomain,e.canHandleCodeInApp=t.handleCodeInApp,t.iOS&&(F(t.iOS.bundleId.length>0,r,"missing-ios-bundle-id"),e.iOSBundleId=t.iOS.bundleId),t.android&&(F(t.android.packageName.length>0,r,"missing-android-pkg-name"),e.androidInstallApp=t.android.installApp,e.androidMinimumVersionCode=t.android.minimumVersion,e.androidPackageName=t.android.packageName)}async function mf(r){let e=dt(r);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function hc(r,e,t){let n=dt(r),i={requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"};t&&Ky(n,i,t),await hs(n,i,"getOobCode",Ny)}async function dc(r,e,t){if(Be(r.app))return Promise.reject(lt(r));let n=dt(r),o=await hs(n,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",jy).catch(u=>{throw u.code==="auth/password-does-not-meet-requirements"&&mf(r),u}),c=await Vn._fromIdTokenResponse(n,"signIn",o);return await n._updateCurrentUser(c.user),c}function fc(r,e,t){return Be(r.app)?Promise.reject(lt(r)):pf(le(r),Zt.credential(e,t)).catch(async n=>{throw n.code==="auth/password-does-not-meet-requirements"&&mf(r),n})}async function $y(r,e){return _e(r,"POST","/v1/accounts:update",e)}async function pc(r,{displayName:e,photoURL:t}){if(e===void 0&&t===void 0)return;let n=le(r),s={idToken:await n.getIdToken(),displayName:e,photoUrl:t,returnSecureToken:!0},o=await On(n,$y(n.auth,s));n.displayName=o.displayName||null,n.photoURL=o.photoUrl||null;let c=n.providerData.find(({providerId:u})=>u==="password");c&&(c.displayName=n.displayName,c.photoURL=n.photoURL),await n._updateTokensIfNecessary(o)}function mc(r,e,t,n){return le(r).onAuthStateChanged(e,t,n)}function gc(r){return le(r).signOut()}function Wy(r,e){return _e(r,"POST","/v2/accounts/mfaEnrollment:start",he(r,e))}function Hy(r,e){return _e(r,"POST","/v2/accounts/mfaEnrollment:finalize",he(r,e))}function Qy(r,e){return _e(r,"POST","/v2/accounts/mfaEnrollment:start",he(r,e))}function Jy(r,e){return _e(r,"POST","/v2/accounts/mfaEnrollment:finalize",he(r,e))}var fs="__sak";var ps=class{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(fs,"1"),this.storage.removeItem(fs),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){let t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}};var Yy=1e3,Xy=10,ms=class extends ps{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=cf(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(let t of Object.keys(this.listeners)){let n=this.storage.getItem(t),i=this.localCache[t];n!==i&&e(t,i,n)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,u)=>{this.notifyListeners(o,u)});return}let n=e.key;t?this.detachListener():this.stopPolling();let i=()=>{let o=this.storage.getItem(n);!t&&this.localCache[n]===o||this.notifyListeners(n,o)},s=this.storage.getItem(n);vy()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,Xy):i()}notifyListeners(e,t){this.localCache[e]=t;let n=this.listeners[e];if(n)for(let i of Array.from(n))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},Yy)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){let t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}};ms.type="LOCAL";var _c=ms;var gs=class extends ps{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}};gs.type="SESSION";var gf=gs;function Zy(r){return Promise.all(r.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}var _s=class r{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){let t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;let n=new r(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){let t=e,{eventId:n,eventType:i,data:s}=t.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:i});let c=Array.from(o).map(async d=>d(t.origin,s)),u=await Zy(c);t.ports[0].postMessage({status:"done",eventId:n,eventType:i,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}};_s.receivers=[];function yc(r="",e=10){let t="";for(let n=0;n<e;n++)t+=Math.floor(Math.random()*10);return r+t}var Xa=class{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){let i=typeof MessageChannel!="undefined"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((c,u)=>{let d=yc("",20);i.port1.start();let f=setTimeout(()=>{u(new Error("unsupported_event"))},n);o={messageChannel:i,onMessage(m){let v=m;if(v.data.eventId===d)switch(v.data.status){case"ack":clearTimeout(f),s=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),c(v.data.response);break;default:clearTimeout(f),clearTimeout(s),u(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}};function Ye(){return window}function ev(r){Ye().location.href=r}function _f(){return typeof Ye().WorkerGlobalScope!="undefined"&&typeof Ye().importScripts=="function"}async function tv(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function nv(){var r;return((r=navigator==null?void 0:navigator.serviceWorker)===null||r===void 0?void 0:r.controller)||null}function rv(){return _f()?self:null}var yf="firebaseLocalStorageDb",iv=1,ys="firebaseLocalStorage",vf="fbase_key",nn=class{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}};function Cs(r,e){return r.transaction([ys],e?"readwrite":"readonly").objectStore(ys)}function sv(){let r=indexedDB.deleteDatabase(yf);return new nn(r).toPromise()}function Za(){let r=indexedDB.open(yf,iv);return new Promise((e,t)=>{r.addEventListener("error",()=>{t(r.error)}),r.addEventListener("upgradeneeded",()=>{let n=r.result;try{n.createObjectStore(ys,{keyPath:vf})}catch(i){t(i)}}),r.addEventListener("success",async()=>{let n=r.result;n.objectStoreNames.contains(ys)?e(n):(n.close(),await sv(),e(await Za()))})})}async function Fd(r,e,t){let n=Cs(r,!0).put({[vf]:e,value:t});return new nn(n).toPromise()}async function ov(r,e){let t=Cs(r,!1).get(e),n=await new nn(t).toPromise();return n===void 0?null:n.value}function Ud(r,e){let t=Cs(r,!0).delete(e);return new nn(t).toPromise()}var av=800,cv=3,vs=class{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Za(),this.db)}async _withRetries(e){let t=0;for(;;)try{let n=await this._openDb();return await e(n)}catch(n){if(t++>cv)throw n;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return _f()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=_s._getInstance(rv()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await tv(),!this.activeServiceWorker)return;this.sender=new Xa(this.activeServiceWorker);let n=await this.sender._send("ping",{},800);n&&!((e=n[0])===null||e===void 0)&&e.fulfilled&&!((t=n[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||nv()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;let e=await Za();return await Fd(e,fs,"1"),await Ud(e,fs),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>Fd(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){let t=await this._withRetries(n=>ov(n,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Ud(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){let e=await this._withRetries(i=>{let s=Cs(i,!1).getAll();return new nn(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];let t=[],n=new Set;if(e.length!==0)for(let{fbase_key:i,value:s}of e)n.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(let i of Object.keys(this.localCache))this.localCache[i]&&!n.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;let n=this.listeners[e];if(n)for(let i of Array.from(n))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),av)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}};vs.type="LOCAL";var vc=vs;function uv(r,e){return _e(r,"POST","/v2/accounts/mfaSignIn:start",he(r,e))}function lv(r,e){return _e(r,"POST","/v2/accounts/mfaSignIn:finalize",he(r,e))}function hv(r,e){return _e(r,"POST","/v2/accounts/mfaSignIn:finalize",he(r,e))}var DE=hf("rcb"),NE=new Jt(3e4,6e4);var dv="recaptcha";async function fv(r,e,t){var n;let i=await t.verify();try{F(typeof i=="string",r,"argument-error"),F(t.type===dv,r,"argument-error");let s;if(typeof e=="string"?s={phoneNumber:e}:s=e,"session"in s){let o=s.session;if("phoneNumber"in s)return F(o.type==="enroll",r,"internal-error"),(await Wy(r,{idToken:o.credential,phoneEnrollmentInfo:{phoneNumber:s.phoneNumber,recaptchaToken:i}})).phoneSessionInfo.sessionInfo;{F(o.type==="signin",r,"internal-error");let c=((n=s.multiFactorHint)===null||n===void 0?void 0:n.uid)||s.multiFactorUid;return F(c,r,"missing-multi-factor-info"),(await uv(r,{mfaPendingCredential:o.credential,mfaEnrollmentId:c,phoneSignInInfo:{recaptchaToken:i}})).phoneResponseInfo.sessionInfo}}else{let{sessionInfo:o}=await Vy(r,{phoneNumber:s.phoneNumber,recaptchaToken:i});return o}}finally{t._reset()}}var Hr=class r{constructor(e){this.providerId=r.PROVIDER_ID,this.auth=dt(e)}verifyPhoneNumber(e,t){return fv(this.auth,e,le(t))}static credential(e,t){return zr._fromVerification(e,t)}static credentialFromResult(e){let t=e;return r.credentialFromTaggedObject(t)}static credentialFromError(e){return r.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{phoneNumber:t,temporaryProof:n}=e;return t&&n?zr._fromTokenResponse(t,n):null}};Hr.PROVIDER_ID="phone";Hr.PHONE_SIGN_IN_METHOD="phone";function If(r,e){return e?ut(e):(F(r._popupRedirectResolver,r,"argument-error"),r._popupRedirectResolver)}var Qr=class extends Yt{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return kn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return kn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return kn(e,this._buildIdpRequest())}_buildIdpRequest(e){let t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}};function pv(r){return ff(r.auth,new Qr(r),r.bypassAuthState)}function mv(r){let{auth:e,user:t}=r;return F(t,e,"internal-error"),Gy(t,new Qr(r),r.bypassAuthState)}async function gv(r){let{auth:e,user:t}=r;return F(t,e,"internal-error"),zy(t,new Qr(r),r.bypassAuthState)}var Is=class{constructor(e,t,n,i,s=!1){this.auth=e,this.resolver=n,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}})}async onAuthEvent(e){let{urlResponse:t,sessionId:n,postBody:i,tenantId:s,error:o,type:c}=e;if(o){this.reject(o);return}let u={auth:this.auth,requestUri:t,sessionId:n,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return pv;case"linkViaPopup":case"linkViaRedirect":return gv;case"reauthViaPopup":case"reauthViaRedirect":return mv;default:qe(this.auth,"internal-error")}}resolve(e){ht(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){ht(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}};var _v=new Jt(2e3,1e4);async function Ic(r,e,t){if(Be(r.app))return Promise.reject(We(r,"operation-not-supported-in-this-environment"));let n=dt(r);sy(r,e,Gr);let i=If(n,t);return new ws(n,"signInViaPopup",e,i).executeNotNull()}var ws=class r extends Is{constructor(e,t,n,i,s){super(e,t,i,s),this.provider=n,this.authWindow=null,this.pollId=null,r.currentPopupAction&&r.currentPopupAction.cancel(),r.currentPopupAction=this}async executeNotNull(){let e=await this.execute();return F(e,this.auth,"internal-error"),e}async onExecution(){ht(this.filter.length===1,"Popup operations only handle one event");let e=yc();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(We(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(We(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,r.currentPopupAction=null}pollUserCancellation(){let e=()=>{var t,n;if(!((n=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||n===void 0)&&n.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(We(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,_v.get())};e()}};ws.currentPopupAction=null;var yv="pendingRedirect",rs=new Map,ec=class extends Is{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=rs.get(this.auth._key());if(!e){try{let n=await vv(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(n)}catch(t){e=()=>Promise.reject(t)}rs.set(this.auth._key(),e)}return this.bypassAuthState||rs.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){let t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}};async function vv(r,e){let t=Ev(e),n=wv(r);if(!await n._isAvailable())return!1;let i=await n._get(t)==="true";return await n._remove(t),i}function Iv(r,e){rs.set(r._key(),e)}function wv(r){return ut(r._redirectPersistence)}function Ev(r){return ns(yv,r.config.apiKey,r.name)}async function Tv(r,e,t=!1){if(Be(r.app))return Promise.reject(lt(r));let n=dt(r),i=If(n,e),o=await new ec(n,i,t).execute();return o&&!t&&(delete o.user._redirectEventId,await n._persistUserIfCurrent(o.user),await n._setRedirectUser(null,e)),o}var Av=10*60*1e3,tc=class{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!bv(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var n;if(e.error&&!wf(e)){let i=((n=e.error.code)===null||n===void 0?void 0:n.split("auth/")[1])||"internal-error";t.onError(We(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){let n=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Av&&this.cachedEventUids.clear(),this.cachedEventUids.has(Bd(e))}saveEventToCache(e){this.cachedEventUids.add(Bd(e)),this.lastProcessedEventTime=Date.now()}};function Bd(r){return[r.type,r.eventId,r.sessionId,r.tenantId].filter(e=>e).join("-")}function wf({type:r,error:e}){return r==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function bv(r){switch(r.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return wf(r);default:return!1}}async function Sv(r,e={}){return _e(r,"GET","/v1/projects",e)}var Rv=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Pv=/^https?/;async function Cv(r){if(r.config.emulator)return;let{authorizedDomains:e}=await Sv(r);for(let t of e)try{if(Dv(t))return}catch{}qe(r,"unauthorized-domain")}function Dv(r){let e=ja(),{protocol:t,hostname:n}=new URL(e);if(r.startsWith("chrome-extension://")){let o=new URL(r);return o.hostname===""&&n===""?t==="chrome-extension:"&&r.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===n}if(!Pv.test(t))return!1;if(Rv.test(r))return n===r;let i=r.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(n)}var Nv=new Jt(3e4,6e4);function qd(){let r=Ye().___jsl;if(r!=null&&r.H){for(let e of Object.keys(r.H))if(r.H[e].r=r.H[e].r||[],r.H[e].L=r.H[e].L||[],r.H[e].r=[...r.H[e].L],r.CP)for(let t=0;t<r.CP.length;t++)r.CP[t]=null}}function kv(r){return new Promise((e,t)=>{var n,i,s;function o(){qd(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{qd(),t(We(r,"network-request-failed"))},timeout:Nv.get()})}if(!((i=(n=Ye().gapi)===null||n===void 0?void 0:n.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=Ye().gapi)===null||s===void 0)&&s.load)o();else{let c=hf("iframefcb");return Ye()[c]=()=>{gapi.load?o():t(We(r,"network-request-failed"))},lf(`${Ay()}?onload=${c}`).catch(u=>t(u))}}).catch(e=>{throw is=null,e})}var is=null;function Ov(r){return is=is||kv(r),is}var xv=new Jt(5e3,15e3),Vv="__/auth/iframe",Lv="emulator/auth/iframe",Mv={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Fv=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Uv(r){let e=r.config;F(e.authDomain,r,"auth-domain-config-required");let t=e.emulator?ac(e,Lv):`https://${r.config.authDomain}/${Vv}`,n={apiKey:e.apiKey,appName:r.name,v:At},i=Fv.get(r.config.apiHost);i&&(n.eid=i);let s=r._getFrameworks();return s.length&&(n.fw=s.join(",")),`${t}?${Cn(n).slice(1)}`}async function Bv(r){let e=await Ov(r),t=Ye().gapi;return F(t,r,"internal-error"),e.open({where:document.body,url:Uv(r),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Mv,dontclear:!0},n=>new Promise(async(i,s)=>{await n.restyle({setHideOnLeave:!1});let o=We(r,"network-request-failed"),c=Ye().setTimeout(()=>{s(o)},xv.get());function u(){Ye().clearTimeout(c),i(n)}n.ping(u).then(u,()=>{s(o)})}))}var qv={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},jv=500,zv=600,Gv="_blank",Kv="http://localhost",Es=class{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}};function $v(r,e,t,n=jv,i=zv){let s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-n)/2,0).toString(),c="",u=Object.assign(Object.assign({},qv),{width:n.toString(),height:i.toString(),top:s,left:o}),d=ae().toLowerCase();t&&(c=nf(d)?Gv:t),ef(d)&&(e=e||Kv,u.scrollbars="yes");let f=Object.entries(u).reduce((v,[S,D])=>`${v}${S}=${D},`,"");if(yy(d)&&c!=="_self")return Wv(e||"",c),new Es(null);let m=window.open(e||"",c,f);F(m,r,"popup-blocked");try{m.focus()}catch{}return new Es(m)}function Wv(r,e){let t=document.createElement("a");t.href=r,t.target=e;let n=document.createEvent("MouseEvent");n.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(n)}var Hv="__/auth/handler",Qv="emulator/auth/handler",Jv=encodeURIComponent("fac");async function jd(r,e,t,n,i,s){F(r.config.authDomain,r,"auth-domain-config-required"),F(r.config.apiKey,r,"invalid-api-key");let o={apiKey:r.config.apiKey,appName:r.name,authType:t,redirectUrl:n,v:At,eventId:i};if(e instanceof Gr){e.setDefaultLanguage(r.languageCode),o.providerId=e.providerId||"",dd(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(let[f,m]of Object.entries(s||{}))o[f]=m}if(e instanceof en){let f=e.getScopes().filter(m=>m!=="");f.length>0&&(o.scopes=f.join(","))}r.tenantId&&(o.tid=r.tenantId);let c=o;for(let f of Object.keys(c))c[f]===void 0&&delete c[f];let u=await r._getAppCheckToken(),d=u?`#${Jv}=${encodeURIComponent(u)}`:"";return`${Yv(r)}?${Cn(c).slice(1)}${d}`}function Yv({config:r}){return r.emulator?ac(r,Qv):`https://${r.authDomain}/${Hv}`}var qa="webStorageSupport",nc=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=gf,this._completeRedirectFn=Tv,this._overrideRedirectResult=Iv}async _openPopup(e,t,n,i){var s;ht((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");let o=await jd(e,t,n,ja(),i);return $v(e,o,yc())}async _openRedirect(e,t,n,i){await this._originValidation(e);let s=await jd(e,t,n,ja(),i);return ev(s),new Promise(()=>{})}_initialize(e){let t=e._key();if(this.eventManagers[t]){let{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(ht(s,"If manager is not set, promise should be"),s)}let n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){let t=await Bv(e),n=new tc(e);return t.register("authEvent",i=>(F(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:n.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(qa,{type:qa},i=>{var s;let o=(s=i==null?void 0:i[0])===null||s===void 0?void 0:s[qa];o!==void 0&&t(!!o),qe(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){let t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Cv(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return cf()||tf()||uc()}},wc=nc,Ts=class{constructor(e){this.factorId=e}_process(e,t,n){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,n);case"signin":return this._finalizeSignIn(e,t.credential);default:return Je("unexpected MultiFactorSessionType")}}},rc=class r extends Ts{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new r(e)}_finalizeEnroll(e,t,n){return Hy(e,{idToken:t,displayName:n,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return lv(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}},As=class{constructor(){}static assertion(e){return rc._fromCredential(e)}};As.FACTOR_ID="phone";var bs=class{static assertionForEnrollment(e,t){return Ss._fromSecret(e,t)}static assertionForSignIn(e,t){return Ss._fromEnrollmentId(e,t)}static async generateSecret(e){var t;let n=e;F(typeof((t=n.user)===null||t===void 0?void 0:t.auth)!="undefined","internal-error");let i=await Qy(n.user.auth,{idToken:n.credential,totpEnrollmentInfo:{}});return Rs._fromStartTotpMfaEnrollmentResponse(i,n.user.auth)}};bs.FACTOR_ID="totp";var Ss=class r extends Ts{constructor(e,t,n){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=n}static _fromSecret(e,t){return new r(t,void 0,e)}static _fromEnrollmentId(e,t){return new r(t,e)}async _finalizeEnroll(e,t,n){return F(typeof this.secret!="undefined",e,"argument-error"),Jy(e,{idToken:t,displayName:n,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){F(this.enrollmentId!==void 0&&this.otp!==void 0,e,"argument-error");let n={verificationCode:this.otp};return hv(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:n})}},Rs=class r{constructor(e,t,n,i,s,o,c){this.sessionInfo=o,this.auth=c,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=n,this.codeIntervalSeconds=i,this.enrollmentCompletionDeadline=s}static _fromStartTotpMfaEnrollmentResponse(e,t){return new r(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){var n;let i=!1;return(es(e)||es(t))&&(i=!0),i&&(es(e)&&(e=((n=this.auth.currentUser)===null||n===void 0?void 0:n.email)||"unknownuser"),es(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}};function es(r){return typeof r=="undefined"||(r==null?void 0:r.length)===0}var zd="@firebase/auth",Gd="1.7.9";var ic=class{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;let t=this.auth.onIdTokenChanged(n=>{e((n==null?void 0:n.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();let t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){F(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}};function Xv(r){switch(r){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Zv(r){Tt(new Ue("auth",(e,{options:t})=>{let n=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=n.options;F(o&&!o.includes(":"),"invalid-api-key",{appName:n.name});let u={apiKey:o,authDomain:c,clientPlatform:r,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:uf(r)},d=new Qa(n,i,s,u);return Ry(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{e.getProvider("auth-internal").initialize()})),Tt(new Ue("auth-internal",e=>{let t=dt(e.getProvider("auth").getImmediate());return(n=>new ic(n))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),$e(zd,Gd,Xv(r)),$e(zd,Gd,"esm2017")}var eI=5*60,kE=sd("authIdTokenMaxAge")||eI;function tI(){var r,e;return(e=(r=document.getElementsByTagName("head"))===null||r===void 0?void 0:r[0])!==null&&e!==void 0?e:document}Ey({loadJS(r){return new Promise((e,t)=>{let n=document.createElement("script");n.setAttribute("src",r),n.onload=e,n.onerror=i=>{let s=We("internal-error");s.customData=i,t(s)},n.type="text/javascript",n.charset="UTF-8",tI().appendChild(n)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Zv("Browser");var Ef=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},Tf={};var Rt,Ec;(function(){var r;function e(I,g){function y(){}y.prototype=g.prototype,I.D=g.prototype,I.prototype=new y,I.prototype.constructor=I,I.C=function(w,E,A){for(var _=Array(arguments.length-2),it=2;it<arguments.length;it++)_[it-2]=arguments[it];return g.prototype[E].apply(w,_)}}function t(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(n,t),n.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(I,g,y){y||(y=0);var w=Array(16);if(typeof g=="string")for(var E=0;16>E;++E)w[E]=g.charCodeAt(y++)|g.charCodeAt(y++)<<8|g.charCodeAt(y++)<<16|g.charCodeAt(y++)<<24;else for(E=0;16>E;++E)w[E]=g[y++]|g[y++]<<8|g[y++]<<16|g[y++]<<24;g=I.g[0],y=I.g[1],E=I.g[2];var A=I.g[3],_=g+(A^y&(E^A))+w[0]+3614090360&4294967295;g=y+(_<<7&4294967295|_>>>25),_=A+(E^g&(y^E))+w[1]+3905402710&4294967295,A=g+(_<<12&4294967295|_>>>20),_=E+(y^A&(g^y))+w[2]+606105819&4294967295,E=A+(_<<17&4294967295|_>>>15),_=y+(g^E&(A^g))+w[3]+3250441966&4294967295,y=E+(_<<22&4294967295|_>>>10),_=g+(A^y&(E^A))+w[4]+4118548399&4294967295,g=y+(_<<7&4294967295|_>>>25),_=A+(E^g&(y^E))+w[5]+1200080426&4294967295,A=g+(_<<12&4294967295|_>>>20),_=E+(y^A&(g^y))+w[6]+2821735955&4294967295,E=A+(_<<17&4294967295|_>>>15),_=y+(g^E&(A^g))+w[7]+4249261313&4294967295,y=E+(_<<22&4294967295|_>>>10),_=g+(A^y&(E^A))+w[8]+1770035416&4294967295,g=y+(_<<7&4294967295|_>>>25),_=A+(E^g&(y^E))+w[9]+2336552879&4294967295,A=g+(_<<12&4294967295|_>>>20),_=E+(y^A&(g^y))+w[10]+4294925233&4294967295,E=A+(_<<17&4294967295|_>>>15),_=y+(g^E&(A^g))+w[11]+2304563134&4294967295,y=E+(_<<22&4294967295|_>>>10),_=g+(A^y&(E^A))+w[12]+1804603682&4294967295,g=y+(_<<7&4294967295|_>>>25),_=A+(E^g&(y^E))+w[13]+4254626195&4294967295,A=g+(_<<12&4294967295|_>>>20),_=E+(y^A&(g^y))+w[14]+2792965006&4294967295,E=A+(_<<17&4294967295|_>>>15),_=y+(g^E&(A^g))+w[15]+1236535329&4294967295,y=E+(_<<22&4294967295|_>>>10),_=g+(E^A&(y^E))+w[1]+4129170786&4294967295,g=y+(_<<5&4294967295|_>>>27),_=A+(y^E&(g^y))+w[6]+3225465664&4294967295,A=g+(_<<9&4294967295|_>>>23),_=E+(g^y&(A^g))+w[11]+643717713&4294967295,E=A+(_<<14&4294967295|_>>>18),_=y+(A^g&(E^A))+w[0]+3921069994&4294967295,y=E+(_<<20&4294967295|_>>>12),_=g+(E^A&(y^E))+w[5]+3593408605&4294967295,g=y+(_<<5&4294967295|_>>>27),_=A+(y^E&(g^y))+w[10]+38016083&4294967295,A=g+(_<<9&4294967295|_>>>23),_=E+(g^y&(A^g))+w[15]+3634488961&4294967295,E=A+(_<<14&4294967295|_>>>18),_=y+(A^g&(E^A))+w[4]+3889429448&4294967295,y=E+(_<<20&4294967295|_>>>12),_=g+(E^A&(y^E))+w[9]+568446438&4294967295,g=y+(_<<5&4294967295|_>>>27),_=A+(y^E&(g^y))+w[14]+3275163606&4294967295,A=g+(_<<9&4294967295|_>>>23),_=E+(g^y&(A^g))+w[3]+4107603335&4294967295,E=A+(_<<14&4294967295|_>>>18),_=y+(A^g&(E^A))+w[8]+1163531501&4294967295,y=E+(_<<20&4294967295|_>>>12),_=g+(E^A&(y^E))+w[13]+2850285829&4294967295,g=y+(_<<5&4294967295|_>>>27),_=A+(y^E&(g^y))+w[2]+4243563512&4294967295,A=g+(_<<9&4294967295|_>>>23),_=E+(g^y&(A^g))+w[7]+1735328473&4294967295,E=A+(_<<14&4294967295|_>>>18),_=y+(A^g&(E^A))+w[12]+2368359562&4294967295,y=E+(_<<20&4294967295|_>>>12),_=g+(y^E^A)+w[5]+4294588738&4294967295,g=y+(_<<4&4294967295|_>>>28),_=A+(g^y^E)+w[8]+2272392833&4294967295,A=g+(_<<11&4294967295|_>>>21),_=E+(A^g^y)+w[11]+1839030562&4294967295,E=A+(_<<16&4294967295|_>>>16),_=y+(E^A^g)+w[14]+4259657740&4294967295,y=E+(_<<23&4294967295|_>>>9),_=g+(y^E^A)+w[1]+2763975236&4294967295,g=y+(_<<4&4294967295|_>>>28),_=A+(g^y^E)+w[4]+1272893353&4294967295,A=g+(_<<11&4294967295|_>>>21),_=E+(A^g^y)+w[7]+4139469664&4294967295,E=A+(_<<16&4294967295|_>>>16),_=y+(E^A^g)+w[10]+3200236656&4294967295,y=E+(_<<23&4294967295|_>>>9),_=g+(y^E^A)+w[13]+681279174&4294967295,g=y+(_<<4&4294967295|_>>>28),_=A+(g^y^E)+w[0]+3936430074&4294967295,A=g+(_<<11&4294967295|_>>>21),_=E+(A^g^y)+w[3]+3572445317&4294967295,E=A+(_<<16&4294967295|_>>>16),_=y+(E^A^g)+w[6]+76029189&4294967295,y=E+(_<<23&4294967295|_>>>9),_=g+(y^E^A)+w[9]+3654602809&4294967295,g=y+(_<<4&4294967295|_>>>28),_=A+(g^y^E)+w[12]+3873151461&4294967295,A=g+(_<<11&4294967295|_>>>21),_=E+(A^g^y)+w[15]+530742520&4294967295,E=A+(_<<16&4294967295|_>>>16),_=y+(E^A^g)+w[2]+3299628645&4294967295,y=E+(_<<23&4294967295|_>>>9),_=g+(E^(y|~A))+w[0]+4096336452&4294967295,g=y+(_<<6&4294967295|_>>>26),_=A+(y^(g|~E))+w[7]+1126891415&4294967295,A=g+(_<<10&4294967295|_>>>22),_=E+(g^(A|~y))+w[14]+2878612391&4294967295,E=A+(_<<15&4294967295|_>>>17),_=y+(A^(E|~g))+w[5]+4237533241&4294967295,y=E+(_<<21&4294967295|_>>>11),_=g+(E^(y|~A))+w[12]+1700485571&4294967295,g=y+(_<<6&4294967295|_>>>26),_=A+(y^(g|~E))+w[3]+2399980690&4294967295,A=g+(_<<10&4294967295|_>>>22),_=E+(g^(A|~y))+w[10]+4293915773&4294967295,E=A+(_<<15&4294967295|_>>>17),_=y+(A^(E|~g))+w[1]+2240044497&4294967295,y=E+(_<<21&4294967295|_>>>11),_=g+(E^(y|~A))+w[8]+1873313359&4294967295,g=y+(_<<6&4294967295|_>>>26),_=A+(y^(g|~E))+w[15]+4264355552&4294967295,A=g+(_<<10&4294967295|_>>>22),_=E+(g^(A|~y))+w[6]+2734768916&4294967295,E=A+(_<<15&4294967295|_>>>17),_=y+(A^(E|~g))+w[13]+1309151649&4294967295,y=E+(_<<21&4294967295|_>>>11),_=g+(E^(y|~A))+w[4]+4149444226&4294967295,g=y+(_<<6&4294967295|_>>>26),_=A+(y^(g|~E))+w[11]+3174756917&4294967295,A=g+(_<<10&4294967295|_>>>22),_=E+(g^(A|~y))+w[2]+718787259&4294967295,E=A+(_<<15&4294967295|_>>>17),_=y+(A^(E|~g))+w[9]+3951481745&4294967295,I.g[0]=I.g[0]+g&4294967295,I.g[1]=I.g[1]+(E+(_<<21&4294967295|_>>>11))&4294967295,I.g[2]=I.g[2]+E&4294967295,I.g[3]=I.g[3]+A&4294967295}n.prototype.u=function(I,g){g===void 0&&(g=I.length);for(var y=g-this.blockSize,w=this.B,E=this.h,A=0;A<g;){if(E==0)for(;A<=y;)i(this,I,A),A+=this.blockSize;if(typeof I=="string"){for(;A<g;)if(w[E++]=I.charCodeAt(A++),E==this.blockSize){i(this,w),E=0;break}}else for(;A<g;)if(w[E++]=I[A++],E==this.blockSize){i(this,w),E=0;break}}this.h=E,this.o+=g},n.prototype.v=function(){var I=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);I[0]=128;for(var g=1;g<I.length-8;++g)I[g]=0;var y=8*this.o;for(g=I.length-8;g<I.length;++g)I[g]=y&255,y/=256;for(this.u(I),I=Array(16),g=y=0;4>g;++g)for(var w=0;32>w;w+=8)I[y++]=this.g[g]>>>w&255;return I};function s(I,g){var y=c;return Object.prototype.hasOwnProperty.call(y,I)?y[I]:y[I]=g(I)}function o(I,g){this.h=g;for(var y=[],w=!0,E=I.length-1;0<=E;E--){var A=I[E]|0;w&&A==g||(y[E]=A,w=!1)}this.g=y}var c={};function u(I){return-128<=I&&128>I?s(I,function(g){return new o([g|0],0>g?-1:0)}):new o([I|0],0>I?-1:0)}function d(I){if(isNaN(I)||!isFinite(I))return m;if(0>I)return N(d(-I));for(var g=[],y=1,w=0;I>=y;w++)g[w]=I/y|0,y*=4294967296;return new o(g,0)}function f(I,g){if(I.length==0)throw Error("number format error: empty string");if(g=g||10,2>g||36<g)throw Error("radix out of range: "+g);if(I.charAt(0)=="-")return N(f(I.substring(1),g));if(0<=I.indexOf("-"))throw Error('number format error: interior "-" character');for(var y=d(Math.pow(g,8)),w=m,E=0;E<I.length;E+=8){var A=Math.min(8,I.length-E),_=parseInt(I.substring(E,E+A),g);8>A?(A=d(Math.pow(g,A)),w=w.j(A).add(d(_))):(w=w.j(y),w=w.add(d(_)))}return w}var m=u(0),v=u(1),S=u(16777216);r=o.prototype,r.m=function(){if(k(this))return-N(this).m();for(var I=0,g=1,y=0;y<this.g.length;y++){var w=this.i(y);I+=(0<=w?w:4294967296+w)*g,g*=4294967296}return I},r.toString=function(I){if(I=I||10,2>I||36<I)throw Error("radix out of range: "+I);if(D(this))return"0";if(k(this))return"-"+N(this).toString(I);for(var g=d(Math.pow(I,6)),y=this,w="";;){var E=W(y,g).g;y=z(y,E.j(g));var A=((0<y.g.length?y.g[0]:y.h)>>>0).toString(I);if(y=E,D(y))return A+w;for(;6>A.length;)A="0"+A;w=A+w}},r.i=function(I){return 0>I?0:I<this.g.length?this.g[I]:this.h};function D(I){if(I.h!=0)return!1;for(var g=0;g<I.g.length;g++)if(I.g[g]!=0)return!1;return!0}function k(I){return I.h==-1}r.l=function(I){return I=z(this,I),k(I)?-1:D(I)?0:1};function N(I){for(var g=I.g.length,y=[],w=0;w<g;w++)y[w]=~I.g[w];return new o(y,~I.h).add(v)}r.abs=function(){return k(this)?N(this):this},r.add=function(I){for(var g=Math.max(this.g.length,I.g.length),y=[],w=0,E=0;E<=g;E++){var A=w+(this.i(E)&65535)+(I.i(E)&65535),_=(A>>>16)+(this.i(E)>>>16)+(I.i(E)>>>16);w=_>>>16,A&=65535,_&=65535,y[E]=_<<16|A}return new o(y,y[y.length-1]&-2147483648?-1:0)};function z(I,g){return I.add(N(g))}r.j=function(I){if(D(this)||D(I))return m;if(k(this))return k(I)?N(this).j(N(I)):N(N(this).j(I));if(k(I))return N(this.j(N(I)));if(0>this.l(S)&&0>I.l(S))return d(this.m()*I.m());for(var g=this.g.length+I.g.length,y=[],w=0;w<2*g;w++)y[w]=0;for(w=0;w<this.g.length;w++)for(var E=0;E<I.g.length;E++){var A=this.i(w)>>>16,_=this.i(w)&65535,it=I.i(E)>>>16,_r=I.i(E)&65535;y[2*w+2*E]+=_*_r,j(y,2*w+2*E),y[2*w+2*E+1]+=A*_r,j(y,2*w+2*E+1),y[2*w+2*E+1]+=_*it,j(y,2*w+2*E+1),y[2*w+2*E+2]+=A*it,j(y,2*w+2*E+2)}for(w=0;w<g;w++)y[w]=y[2*w+1]<<16|y[2*w];for(w=g;w<2*g;w++)y[w]=0;return new o(y,0)};function j(I,g){for(;(I[g]&65535)!=I[g];)I[g+1]+=I[g]>>>16,I[g]&=65535,g++}function B(I,g){this.g=I,this.h=g}function W(I,g){if(D(g))throw Error("division by zero");if(D(I))return new B(m,m);if(k(I))return g=W(N(I),g),new B(N(g.g),N(g.h));if(k(g))return g=W(I,N(g)),new B(N(g.g),g.h);if(30<I.g.length){if(k(I)||k(g))throw Error("slowDivide_ only works with positive integers.");for(var y=v,w=g;0>=w.l(I);)y=Y(y),w=Y(w);var E=G(y,1),A=G(w,1);for(w=G(w,2),y=G(y,2);!D(w);){var _=A.add(w);0>=_.l(I)&&(E=E.add(y),A=_),w=G(w,1),y=G(y,1)}return g=z(I,E.j(g)),new B(E,g)}for(E=m;0<=I.l(g);){for(y=Math.max(1,Math.floor(I.m()/g.m())),w=Math.ceil(Math.log(y)/Math.LN2),w=48>=w?1:Math.pow(2,w-48),A=d(y),_=A.j(g);k(_)||0<_.l(I);)y-=w,A=d(y),_=A.j(g);D(A)&&(A=v),E=E.add(A),I=z(I,_)}return new B(E,I)}r.A=function(I){return W(this,I).h},r.and=function(I){for(var g=Math.max(this.g.length,I.g.length),y=[],w=0;w<g;w++)y[w]=this.i(w)&I.i(w);return new o(y,this.h&I.h)},r.or=function(I){for(var g=Math.max(this.g.length,I.g.length),y=[],w=0;w<g;w++)y[w]=this.i(w)|I.i(w);return new o(y,this.h|I.h)},r.xor=function(I){for(var g=Math.max(this.g.length,I.g.length),y=[],w=0;w<g;w++)y[w]=this.i(w)^I.i(w);return new o(y,this.h^I.h)};function Y(I){for(var g=I.g.length+1,y=[],w=0;w<g;w++)y[w]=I.i(w)<<1|I.i(w-1)>>>31;return new o(y,I.h)}function G(I,g){var y=g>>5;g%=32;for(var w=I.g.length-y,E=[],A=0;A<w;A++)E[A]=0<g?I.i(A+y)>>>g|I.i(A+y+1)<<32-g:I.i(A+y);return new o(E,I.h)}n.prototype.digest=n.prototype.v,n.prototype.reset=n.prototype.s,n.prototype.update=n.prototype.u,Ec=Tf.Md5=n,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=d,o.fromString=f,Rt=Tf.Integer=o}).apply(typeof Ef!="undefined"?Ef:typeof self!="undefined"?self:typeof window!="undefined"?window:{});var Ds=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},ft={};var Tc,nI,Ln,Ac,Jr,Ns,bc,Sc,Rc;(function(){var r,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,l,h){return a==Array.prototype||a==Object.prototype||(a[l]=h.value),a};function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Ds=="object"&&Ds];for(var l=0;l<a.length;++l){var h=a[l];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var n=t(this);function i(a,l){if(l)e:{var h=n;a=a.split(".");for(var p=0;p<a.length-1;p++){var T=a[p];if(!(T in h))break e;h=h[T]}a=a[a.length-1],p=h[a],l=l(p),l!=p&&l!=null&&e(h,a,{configurable:!0,writable:!0,value:l})}}function s(a,l){a instanceof String&&(a+="");var h=0,p=!1,T={next:function(){if(!p&&h<a.length){var R=h++;return{value:l(R,a[R]),done:!1}}return p=!0,{done:!0,value:void 0}}};return T[Symbol.iterator]=function(){return T},T}i("Array.prototype.values",function(a){return a||function(){return s(this,function(l,h){return h})}});var o=o||{},c=this||self;function u(a){var l=typeof a;return l=l!="object"?l:a?Array.isArray(a)?"array":l:"null",l=="array"||l=="object"&&typeof a.length=="number"}function d(a){var l=typeof a;return l=="object"&&a!=null||l=="function"}function f(a,l,h){return a.call.apply(a.bind,arguments)}function m(a,l,h){if(!a)throw Error();if(2<arguments.length){var p=Array.prototype.slice.call(arguments,2);return function(){var T=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(T,p),a.apply(l,T)}}return function(){return a.apply(l,arguments)}}function v(a,l,h){return v=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:m,v.apply(null,arguments)}function S(a,l){var h=Array.prototype.slice.call(arguments,1);return function(){var p=h.slice();return p.push.apply(p,arguments),a.apply(this,p)}}function D(a,l){function h(){}h.prototype=l.prototype,a.aa=l.prototype,a.prototype=new h,a.prototype.constructor=a,a.Qb=function(p,T,R){for(var O=Array(arguments.length-2),ee=2;ee<arguments.length;ee++)O[ee-2]=arguments[ee];return l.prototype[T].apply(p,O)}}function k(a){let l=a.length;if(0<l){let h=Array(l);for(let p=0;p<l;p++)h[p]=a[p];return h}return[]}function N(a,l){for(let h=1;h<arguments.length;h++){let p=arguments[h];if(u(p)){let T=a.length||0,R=p.length||0;a.length=T+R;for(let O=0;O<R;O++)a[T+O]=p[O]}else a.push(p)}}class z{constructor(l,h){this.i=l,this.j=h,this.h=0,this.g=null}get(){let l;return 0<this.h?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function j(a){return/^[\s\xa0]*$/.test(a)}function B(){var a=c.navigator;return a&&(a=a.userAgent)?a:""}function W(a){return W[" "](a),a}W[" "]=function(){};var Y=B().indexOf("Gecko")!=-1&&!(B().toLowerCase().indexOf("webkit")!=-1&&B().indexOf("Edge")==-1)&&!(B().indexOf("Trident")!=-1||B().indexOf("MSIE")!=-1)&&B().indexOf("Edge")==-1;function G(a,l,h){for(let p in a)l.call(h,a[p],p,a)}function I(a,l){for(let h in a)l.call(void 0,a[h],h,a)}function g(a){let l={};for(let h in a)l[h]=a[h];return l}let y="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function w(a,l){let h,p;for(let T=1;T<arguments.length;T++){p=arguments[T];for(h in p)a[h]=p[h];for(let R=0;R<y.length;R++)h=y[R],Object.prototype.hasOwnProperty.call(p,h)&&(a[h]=p[h])}}function E(a){var l=1;a=a.split(":");let h=[];for(;0<l&&a.length;)h.push(a.shift()),l--;return a.length&&h.push(a.join(":")),h}function A(a){c.setTimeout(()=>{throw a},0)}function _(){var a=Ho;let l=null;return a.g&&(l=a.g,a.g=a.g.next,a.g||(a.h=null),l.next=null),l}class it{constructor(){this.h=this.g=null}add(l,h){let p=_r.get();p.set(l,h),this.h?this.h.next=p:this.g=p,this.h=p}}var _r=new z(()=>new lg,a=>a.reset());class lg{constructor(){this.next=this.g=this.h=null}set(l,h){this.h=l,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let yr,vr=!1,Ho=new it,eh=()=>{let a=c.Promise.resolve(void 0);yr=()=>{a.then(hg)}};var hg=()=>{for(var a;a=_();){try{a.h.call(a.g)}catch(h){A(h)}var l=_r;l.j(a),100>l.h&&(l.h++,a.next=l.g,l.g=a)}vr=!1};function _t(){this.s=this.s,this.C=this.C}_t.prototype.s=!1,_t.prototype.ma=function(){this.s||(this.s=!0,this.N())},_t.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function we(a,l){this.type=a,this.g=this.target=l,this.defaultPrevented=!1}we.prototype.h=function(){this.defaultPrevented=!0};var dg=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var a=!1,l=Object.defineProperty({},"passive",{get:function(){a=!0}});try{let h=()=>{};c.addEventListener("test",h,l),c.removeEventListener("test",h,l)}catch{}return a}();function Ir(a,l){if(we.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var h=this.type=a.type,p=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=l,l=a.relatedTarget){if(Y){e:{try{W(l.nodeName);var T=!0;break e}catch{}T=!1}T||(l=null)}}else h=="mouseover"?l=a.fromElement:h=="mouseout"&&(l=a.toElement);this.relatedTarget=l,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:fg[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&Ir.aa.h.call(this)}}D(Ir,we);var fg={2:"touch",3:"pen",4:"mouse"};Ir.prototype.h=function(){Ir.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var wr="closure_listenable_"+(1e6*Math.random()|0),pg=0;function mg(a,l,h,p,T){this.listener=a,this.proxy=null,this.src=l,this.type=h,this.capture=!!p,this.ha=T,this.key=++pg,this.da=this.fa=!1}function ki(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Oi(a){this.src=a,this.g={},this.h=0}Oi.prototype.add=function(a,l,h,p,T){var R=a.toString();a=this.g[R],a||(a=this.g[R]=[],this.h++);var O=Jo(a,l,p,T);return-1<O?(l=a[O],h||(l.fa=!1)):(l=new mg(l,this.src,R,!!p,T),l.fa=h,a.push(l)),l};function Qo(a,l){var h=l.type;if(h in a.g){var p=a.g[h],T=Array.prototype.indexOf.call(p,l,void 0),R;(R=0<=T)&&Array.prototype.splice.call(p,T,1),R&&(ki(l),a.g[h].length==0&&(delete a.g[h],a.h--))}}function Jo(a,l,h,p){for(var T=0;T<a.length;++T){var R=a[T];if(!R.da&&R.listener==l&&R.capture==!!h&&R.ha==p)return T}return-1}var Yo="closure_lm_"+(1e6*Math.random()|0),Xo={};function th(a,l,h,p,T){if(p&&p.once)return rh(a,l,h,p,T);if(Array.isArray(l)){for(var R=0;R<l.length;R++)th(a,l[R],h,p,T);return null}return h=na(h),a&&a[wr]?a.K(l,h,d(p)?!!p.capture:!!p,T):nh(a,l,h,!1,p,T)}function nh(a,l,h,p,T,R){if(!l)throw Error("Invalid event type");var O=d(T)?!!T.capture:!!T,ee=ea(a);if(ee||(a[Yo]=ee=new Oi(a)),h=ee.add(l,h,p,O,R),h.proxy)return h;if(p=gg(),h.proxy=p,p.src=a,p.listener=h,a.addEventListener)dg||(T=O),T===void 0&&(T=!1),a.addEventListener(l.toString(),p,T);else if(a.attachEvent)a.attachEvent(sh(l.toString()),p);else if(a.addListener&&a.removeListener)a.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return h}function gg(){function a(h){return l.call(a.src,a.listener,h)}let l=_g;return a}function rh(a,l,h,p,T){if(Array.isArray(l)){for(var R=0;R<l.length;R++)rh(a,l[R],h,p,T);return null}return h=na(h),a&&a[wr]?a.L(l,h,d(p)?!!p.capture:!!p,T):nh(a,l,h,!0,p,T)}function ih(a,l,h,p,T){if(Array.isArray(l))for(var R=0;R<l.length;R++)ih(a,l[R],h,p,T);else p=d(p)?!!p.capture:!!p,h=na(h),a&&a[wr]?(a=a.i,l=String(l).toString(),l in a.g&&(R=a.g[l],h=Jo(R,h,p,T),-1<h&&(ki(R[h]),Array.prototype.splice.call(R,h,1),R.length==0&&(delete a.g[l],a.h--)))):a&&(a=ea(a))&&(l=a.g[l.toString()],a=-1,l&&(a=Jo(l,h,p,T)),(h=-1<a?l[a]:null)&&Zo(h))}function Zo(a){if(typeof a!="number"&&a&&!a.da){var l=a.src;if(l&&l[wr])Qo(l.i,a);else{var h=a.type,p=a.proxy;l.removeEventListener?l.removeEventListener(h,p,a.capture):l.detachEvent?l.detachEvent(sh(h),p):l.addListener&&l.removeListener&&l.removeListener(p),(h=ea(l))?(Qo(h,a),h.h==0&&(h.src=null,l[Yo]=null)):ki(a)}}}function sh(a){return a in Xo?Xo[a]:Xo[a]="on"+a}function _g(a,l){if(a.da)a=!0;else{l=new Ir(l,this);var h=a.listener,p=a.ha||a.src;a.fa&&Zo(a),a=h.call(p,l)}return a}function ea(a){return a=a[Yo],a instanceof Oi?a:null}var ta="__closure_events_fn_"+(1e9*Math.random()>>>0);function na(a){return typeof a=="function"?a:(a[ta]||(a[ta]=function(l){return a.handleEvent(l)}),a[ta])}function Ee(){_t.call(this),this.i=new Oi(this),this.M=this,this.F=null}D(Ee,_t),Ee.prototype[wr]=!0,Ee.prototype.removeEventListener=function(a,l,h,p){ih(this,a,l,h,p)};function Re(a,l){var h,p=a.F;if(p)for(h=[];p;p=p.F)h.push(p);if(a=a.M,p=l.type||l,typeof l=="string")l=new we(l,a);else if(l instanceof we)l.target=l.target||a;else{var T=l;l=new we(p,a),w(l,T)}if(T=!0,h)for(var R=h.length-1;0<=R;R--){var O=l.g=h[R];T=xi(O,p,!0,l)&&T}if(O=l.g=a,T=xi(O,p,!0,l)&&T,T=xi(O,p,!1,l)&&T,h)for(R=0;R<h.length;R++)O=l.g=h[R],T=xi(O,p,!1,l)&&T}Ee.prototype.N=function(){if(Ee.aa.N.call(this),this.i){var a=this.i,l;for(l in a.g){for(var h=a.g[l],p=0;p<h.length;p++)ki(h[p]);delete a.g[l],a.h--}}this.F=null},Ee.prototype.K=function(a,l,h,p){return this.i.add(String(a),l,!1,h,p)},Ee.prototype.L=function(a,l,h,p){return this.i.add(String(a),l,!0,h,p)};function xi(a,l,h,p){if(l=a.i.g[String(l)],!l)return!0;l=l.concat();for(var T=!0,R=0;R<l.length;++R){var O=l[R];if(O&&!O.da&&O.capture==h){var ee=O.listener,ve=O.ha||O.src;O.fa&&Qo(a.i,O),T=ee.call(ve,p)!==!1&&T}}return T&&!p.defaultPrevented}function oh(a,l,h){if(typeof a=="function")h&&(a=v(a,h));else if(a&&typeof a.handleEvent=="function")a=v(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(l)?-1:c.setTimeout(a,l||0)}function ah(a){a.g=oh(()=>{a.g=null,a.i&&(a.i=!1,ah(a))},a.l);let l=a.h;a.h=null,a.m.apply(null,l)}class yg extends _t{constructor(l,h){super(),this.m=l,this.l=h,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:ah(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Er(a){_t.call(this),this.h=a,this.g={}}D(Er,_t);var ch=[];function uh(a){G(a.g,function(l,h){this.g.hasOwnProperty(h)&&Zo(l)},a),a.g={}}Er.prototype.N=function(){Er.aa.N.call(this),uh(this)},Er.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ra=c.JSON.stringify,vg=c.JSON.parse,Ig=class{stringify(a){return c.JSON.stringify(a,void 0)}parse(a){return c.JSON.parse(a,void 0)}};function ia(){}ia.prototype.h=null;function lh(a){return a.h||(a.h=a.i())}function hh(){}var Tr={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function sa(){we.call(this,"d")}D(sa,we);function oa(){we.call(this,"c")}D(oa,we);var Gt={},dh=null;function Vi(){return dh=dh||new Ee}Gt.La="serverreachability";function fh(a){we.call(this,Gt.La,a)}D(fh,we);function Ar(a){let l=Vi();Re(l,new fh(l))}Gt.STAT_EVENT="statevent";function ph(a,l){we.call(this,Gt.STAT_EVENT,a),this.stat=l}D(ph,we);function Pe(a){let l=Vi();Re(l,new ph(l,a))}Gt.Ma="timingevent";function mh(a,l){we.call(this,Gt.Ma,a),this.size=l}D(mh,we);function br(a,l){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){a()},l)}function Sr(){this.g=!0}Sr.prototype.xa=function(){this.g=!1};function wg(a,l,h,p,T,R){a.info(function(){if(a.g)if(R)for(var O="",ee=R.split("&"),ve=0;ve<ee.length;ve++){var X=ee[ve].split("=");if(1<X.length){var Te=X[0];X=X[1];var Ae=Te.split("_");O=2<=Ae.length&&Ae[1]=="type"?O+(Te+"="+X+"&"):O+(Te+"=redacted&")}}else O=null;else O=R;return"XMLHTTP REQ ("+p+") [attempt "+T+"]: "+l+`
`+h+`
`+O})}function Eg(a,l,h,p,T,R,O){a.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+T+"]: "+l+`
`+h+`
`+R+" "+O})}function bn(a,l,h,p){a.info(function(){return"XMLHTTP TEXT ("+l+"): "+Ag(a,h)+(p?" "+p:"")})}function Tg(a,l){a.info(function(){return"TIMEOUT: "+l})}Sr.prototype.info=function(){};function Ag(a,l){if(!a.g)return l;if(!l)return null;try{var h=JSON.parse(l);if(h){for(a=0;a<h.length;a++)if(Array.isArray(h[a])){var p=h[a];if(!(2>p.length)){var T=p[1];if(Array.isArray(T)&&!(1>T.length)){var R=T[0];if(R!="noop"&&R!="stop"&&R!="close")for(var O=1;O<T.length;O++)T[O]=""}}}}return ra(h)}catch{return l}}var Li={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},gh={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},aa;function Mi(){}D(Mi,ia),Mi.prototype.g=function(){return new XMLHttpRequest},Mi.prototype.i=function(){return{}},aa=new Mi;function yt(a,l,h,p){this.j=a,this.i=l,this.l=h,this.R=p||1,this.U=new Er(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new _h}function _h(){this.i=null,this.g="",this.h=!1}var yh={},ca={};function ua(a,l,h){a.L=1,a.v=qi(st(l)),a.m=h,a.P=!0,vh(a,null)}function vh(a,l){a.F=Date.now(),Fi(a),a.A=st(a.v);var h=a.A,p=a.R;Array.isArray(p)||(p=[String(p)]),Oh(h.i,"t",p),a.C=0,h=a.j.J,a.h=new _h,a.g=Yh(a.j,h?l:null,!a.m),0<a.O&&(a.M=new yg(v(a.Y,a,a.g),a.O)),l=a.U,h=a.g,p=a.ca;var T="readystatechange";Array.isArray(T)||(T&&(ch[0]=T.toString()),T=ch);for(var R=0;R<T.length;R++){var O=th(h,T[R],p||l.handleEvent,!1,l.h||l);if(!O)break;l.g[O.key]=O}l=a.H?g(a.H):{},a.m?(a.u||(a.u="POST"),l["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,l)):(a.u="GET",a.g.ea(a.A,a.u,null,l)),Ar(),wg(a.i,a.u,a.A,a.l,a.R,a.m)}yt.prototype.ca=function(a){a=a.target;let l=this.M;l&&ot(a)==3?l.j():this.Y(a)},yt.prototype.Y=function(a){try{if(a==this.g)e:{let Ae=ot(this.g);var l=this.g.Ba();let Pn=this.g.Z();if(!(3>Ae)&&(Ae!=3||this.g&&(this.h.h||this.g.oa()||Bh(this.g)))){this.J||Ae!=4||l==7||(l==8||0>=Pn?Ar(3):Ar(2)),la(this);var h=this.g.Z();this.X=h;t:if(Ih(this)){var p=Bh(this.g);a="";var T=p.length,R=ot(this.g)==4;if(!this.h.i){if(typeof TextDecoder=="undefined"){Kt(this),Rr(this);var O="";break t}this.h.i=new c.TextDecoder}for(l=0;l<T;l++)this.h.h=!0,a+=this.h.i.decode(p[l],{stream:!(R&&l==T-1)});p.length=0,this.h.g+=a,this.C=0,O=this.h.g}else O=this.g.oa();if(this.o=h==200,Eg(this.i,this.u,this.A,this.l,this.R,Ae,h),this.o){if(this.T&&!this.K){t:{if(this.g){var ee,ve=this.g;if((ee=ve.g?ve.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!j(ee)){var X=ee;break t}}X=null}if(h=X)bn(this.i,this.l,h,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,ha(this,h);else{this.o=!1,this.s=3,Pe(12),Kt(this),Rr(this);break e}}if(this.P){h=!0;let Ke;for(;!this.J&&this.C<O.length;)if(Ke=bg(this,O),Ke==ca){Ae==4&&(this.s=4,Pe(14),h=!1),bn(this.i,this.l,null,"[Incomplete Response]");break}else if(Ke==yh){this.s=4,Pe(15),bn(this.i,this.l,O,"[Invalid Chunk]"),h=!1;break}else bn(this.i,this.l,Ke,null),ha(this,Ke);if(Ih(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Ae!=4||O.length!=0||this.h.h||(this.s=1,Pe(16),h=!1),this.o=this.o&&h,!h)bn(this.i,this.l,O,"[Invalid Chunked Response]"),Kt(this),Rr(this);else if(0<O.length&&!this.W){this.W=!0;var Te=this.j;Te.g==this&&Te.ba&&!Te.M&&(Te.j.info("Great, no buffering proxy detected. Bytes received: "+O.length),_a(Te),Te.M=!0,Pe(11))}}else bn(this.i,this.l,O,null),ha(this,O);Ae==4&&Kt(this),this.o&&!this.J&&(Ae==4?Wh(this.j,this):(this.o=!1,Fi(this)))}else jg(this.g),h==400&&0<O.indexOf("Unknown SID")?(this.s=3,Pe(12)):(this.s=0,Pe(13)),Kt(this),Rr(this)}}}catch{}finally{}};function Ih(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function bg(a,l){var h=a.C,p=l.indexOf(`
`,h);return p==-1?ca:(h=Number(l.substring(h,p)),isNaN(h)?yh:(p+=1,p+h>l.length?ca:(l=l.slice(p,p+h),a.C=p+h,l)))}yt.prototype.cancel=function(){this.J=!0,Kt(this)};function Fi(a){a.S=Date.now()+a.I,wh(a,a.I)}function wh(a,l){if(a.B!=null)throw Error("WatchDog timer not null");a.B=br(v(a.ba,a),l)}function la(a){a.B&&(c.clearTimeout(a.B),a.B=null)}yt.prototype.ba=function(){this.B=null;let a=Date.now();0<=a-this.S?(Tg(this.i,this.A),this.L!=2&&(Ar(),Pe(17)),Kt(this),this.s=2,Rr(this)):wh(this,this.S-a)};function Rr(a){a.j.G==0||a.J||Wh(a.j,a)}function Kt(a){la(a);var l=a.M;l&&typeof l.ma=="function"&&l.ma(),a.M=null,uh(a.U),a.g&&(l=a.g,a.g=null,l.abort(),l.ma())}function ha(a,l){try{var h=a.j;if(h.G!=0&&(h.g==a||da(h.h,a))){if(!a.K&&da(h.h,a)&&h.G==3){try{var p=h.Da.g.parse(l)}catch{p=null}if(Array.isArray(p)&&p.length==3){var T=p;if(T[0]==0){e:if(!h.u){if(h.g)if(h.g.F+3e3<a.F)$i(h),Gi(h);else break e;ga(h),Pe(18)}}else h.za=T[1],0<h.za-h.T&&37500>T[2]&&h.F&&h.v==0&&!h.C&&(h.C=br(v(h.Za,h),6e3));if(1>=Ah(h.h)&&h.ca){try{h.ca()}catch{}h.ca=void 0}}else Wt(h,11)}else if((a.K||h.g==a)&&$i(h),!j(l))for(T=h.Da.g.parse(l),l=0;l<T.length;l++){let X=T[l];if(h.T=X[0],X=X[1],h.G==2)if(X[0]=="c"){h.K=X[1],h.ia=X[2];let Te=X[3];Te!=null&&(h.la=Te,h.j.info("VER="+h.la));let Ae=X[4];Ae!=null&&(h.Aa=Ae,h.j.info("SVER="+h.Aa));let Pn=X[5];Pn!=null&&typeof Pn=="number"&&0<Pn&&(p=1.5*Pn,h.L=p,h.j.info("backChannelRequestTimeoutMs_="+p)),p=h;let Ke=a.g;if(Ke){let Hi=Ke.g?Ke.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Hi){var R=p.h;R.g||Hi.indexOf("spdy")==-1&&Hi.indexOf("quic")==-1&&Hi.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(fa(R,R.h),R.h=null))}if(p.D){let ya=Ke.g?Ke.g.getResponseHeader("X-HTTP-Session-Id"):null;ya&&(p.ya=ya,re(p.I,p.D,ya))}}h.G=3,h.l&&h.l.ua(),h.ba&&(h.R=Date.now()-a.F,h.j.info("Handshake RTT: "+h.R+"ms")),p=h;var O=a;if(p.qa=Jh(p,p.J?p.ia:null,p.W),O.K){bh(p.h,O);var ee=O,ve=p.L;ve&&(ee.I=ve),ee.B&&(la(ee),Fi(ee)),p.g=O}else Kh(p);0<h.i.length&&Ki(h)}else X[0]!="stop"&&X[0]!="close"||Wt(h,7);else h.G==3&&(X[0]=="stop"||X[0]=="close"?X[0]=="stop"?Wt(h,7):ma(h):X[0]!="noop"&&h.l&&h.l.ta(X),h.v=0)}}Ar(4)}catch{}}var Sg=class{constructor(a,l){this.g=a,this.map=l}};function Eh(a){this.l=a||10,c.PerformanceNavigationTiming?(a=c.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Th(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function Ah(a){return a.h?1:a.g?a.g.size:0}function da(a,l){return a.h?a.h==l:a.g?a.g.has(l):!1}function fa(a,l){a.g?a.g.add(l):a.h=l}function bh(a,l){a.h&&a.h==l?a.h=null:a.g&&a.g.has(l)&&a.g.delete(l)}Eh.prototype.cancel=function(){if(this.i=Sh(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(let a of this.g.values())a.cancel();this.g.clear()}};function Sh(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let l=a.i;for(let h of a.g.values())l=l.concat(h.D);return l}return k(a.i)}function Rg(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map!="undefined"&&a instanceof Map||typeof Set!="undefined"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(u(a)){for(var l=[],h=a.length,p=0;p<h;p++)l.push(a[p]);return l}l=[],h=0;for(p in a)l[h++]=a[p];return l}function Pg(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map!="undefined"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set!="undefined"&&a instanceof Set)){if(u(a)||typeof a=="string"){var l=[];a=a.length;for(var h=0;h<a;h++)l.push(h);return l}l=[],h=0;for(let p in a)l[h++]=p;return l}}}function Rh(a,l){if(a.forEach&&typeof a.forEach=="function")a.forEach(l,void 0);else if(u(a)||typeof a=="string")Array.prototype.forEach.call(a,l,void 0);else for(var h=Pg(a),p=Rg(a),T=p.length,R=0;R<T;R++)l.call(void 0,p[R],h&&h[R],a)}var Ph=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Cg(a,l){if(a){a=a.split("&");for(var h=0;h<a.length;h++){var p=a[h].indexOf("="),T=null;if(0<=p){var R=a[h].substring(0,p);T=a[h].substring(p+1)}else R=a[h];l(R,T?decodeURIComponent(T.replace(/\+/g," ")):"")}}}function $t(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof $t){this.h=a.h,Ui(this,a.j),this.o=a.o,this.g=a.g,Bi(this,a.s),this.l=a.l;var l=a.i,h=new Dr;h.i=l.i,l.g&&(h.g=new Map(l.g),h.h=l.h),Ch(this,h),this.m=a.m}else a&&(l=String(a).match(Ph))?(this.h=!1,Ui(this,l[1]||"",!0),this.o=Pr(l[2]||""),this.g=Pr(l[3]||"",!0),Bi(this,l[4]),this.l=Pr(l[5]||"",!0),Ch(this,l[6]||"",!0),this.m=Pr(l[7]||"")):(this.h=!1,this.i=new Dr(null,this.h))}$t.prototype.toString=function(){var a=[],l=this.j;l&&a.push(Cr(l,Dh,!0),":");var h=this.g;return(h||l=="file")&&(a.push("//"),(l=this.o)&&a.push(Cr(l,Dh,!0),"@"),a.push(encodeURIComponent(String(h)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.s,h!=null&&a.push(":",String(h))),(h=this.l)&&(this.g&&h.charAt(0)!="/"&&a.push("/"),a.push(Cr(h,h.charAt(0)=="/"?kg:Ng,!0))),(h=this.i.toString())&&a.push("?",h),(h=this.m)&&a.push("#",Cr(h,xg)),a.join("")};function st(a){return new $t(a)}function Ui(a,l,h){a.j=h?Pr(l,!0):l,a.j&&(a.j=a.j.replace(/:$/,""))}function Bi(a,l){if(l){if(l=Number(l),isNaN(l)||0>l)throw Error("Bad port number "+l);a.s=l}else a.s=null}function Ch(a,l,h){l instanceof Dr?(a.i=l,Vg(a.i,a.h)):(h||(l=Cr(l,Og)),a.i=new Dr(l,a.h))}function re(a,l,h){a.i.set(l,h)}function qi(a){return re(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function Pr(a,l){return a?l?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Cr(a,l,h){return typeof a=="string"?(a=encodeURI(a).replace(l,Dg),h&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function Dg(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Dh=/[#\/\?@]/g,Ng=/[#\?:]/g,kg=/[#\?]/g,Og=/[#\?@]/g,xg=/#/g;function Dr(a,l){this.h=this.g=null,this.i=a||null,this.j=!!l}function vt(a){a.g||(a.g=new Map,a.h=0,a.i&&Cg(a.i,function(l,h){a.add(decodeURIComponent(l.replace(/\+/g," ")),h)}))}r=Dr.prototype,r.add=function(a,l){vt(this),this.i=null,a=Sn(this,a);var h=this.g.get(a);return h||this.g.set(a,h=[]),h.push(l),this.h+=1,this};function Nh(a,l){vt(a),l=Sn(a,l),a.g.has(l)&&(a.i=null,a.h-=a.g.get(l).length,a.g.delete(l))}function kh(a,l){return vt(a),l=Sn(a,l),a.g.has(l)}r.forEach=function(a,l){vt(this),this.g.forEach(function(h,p){h.forEach(function(T){a.call(l,T,p,this)},this)},this)},r.na=function(){vt(this);let a=Array.from(this.g.values()),l=Array.from(this.g.keys()),h=[];for(let p=0;p<l.length;p++){let T=a[p];for(let R=0;R<T.length;R++)h.push(l[p])}return h},r.V=function(a){vt(this);let l=[];if(typeof a=="string")kh(this,a)&&(l=l.concat(this.g.get(Sn(this,a))));else{a=Array.from(this.g.values());for(let h=0;h<a.length;h++)l=l.concat(a[h])}return l},r.set=function(a,l){return vt(this),this.i=null,a=Sn(this,a),kh(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[l]),this.h+=1,this},r.get=function(a,l){return a?(a=this.V(a),0<a.length?String(a[0]):l):l};function Oh(a,l,h){Nh(a,l),0<h.length&&(a.i=null,a.g.set(Sn(a,l),k(h)),a.h+=h.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";let a=[],l=Array.from(this.g.keys());for(var h=0;h<l.length;h++){var p=l[h];let R=encodeURIComponent(String(p)),O=this.V(p);for(p=0;p<O.length;p++){var T=R;O[p]!==""&&(T+="="+encodeURIComponent(String(O[p]))),a.push(T)}}return this.i=a.join("&")};function Sn(a,l){return l=String(l),a.j&&(l=l.toLowerCase()),l}function Vg(a,l){l&&!a.j&&(vt(a),a.i=null,a.g.forEach(function(h,p){var T=p.toLowerCase();p!=T&&(Nh(this,p),Oh(this,T,h))},a)),a.j=l}function Lg(a,l){let h=new Sr;if(c.Image){let p=new Image;p.onload=S(It,h,"TestLoadImage: loaded",!0,l,p),p.onerror=S(It,h,"TestLoadImage: error",!1,l,p),p.onabort=S(It,h,"TestLoadImage: abort",!1,l,p),p.ontimeout=S(It,h,"TestLoadImage: timeout",!1,l,p),c.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=a}else l(!1)}function Mg(a,l){let h=new Sr,p=new AbortController,T=setTimeout(()=>{p.abort(),It(h,"TestPingServer: timeout",!1,l)},1e4);fetch(a,{signal:p.signal}).then(R=>{clearTimeout(T),R.ok?It(h,"TestPingServer: ok",!0,l):It(h,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(T),It(h,"TestPingServer: error",!1,l)})}function It(a,l,h,p,T){try{T&&(T.onload=null,T.onerror=null,T.onabort=null,T.ontimeout=null),p(h)}catch{}}function Fg(){this.g=new Ig}function Ug(a,l,h){let p=h||"";try{Rh(a,function(T,R){let O=T;d(T)&&(O=ra(T)),l.push(p+R+"="+encodeURIComponent(O))})}catch(T){throw l.push(p+"type="+encodeURIComponent("_badmap")),T}}function Nr(a){this.l=a.Ub||null,this.j=a.eb||!1}D(Nr,ia),Nr.prototype.g=function(){return new ji(this.l,this.j)},Nr.prototype.i=function(a){return function(){return a}}({});function ji(a,l){Ee.call(this),this.D=a,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}D(ji,Ee),r=ji.prototype,r.open=function(a,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=l,this.readyState=1,Or(this)},r.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;let l={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(l.body=a),(this.D||c).fetch(new Request(this.A,l)).then(this.Sa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,kr(this)),this.readyState=0},r.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Or(this)),this.g&&(this.readyState=3,Or(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream!="undefined"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;xh(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function xh(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}r.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var l=a.value?a.value:new Uint8Array(0);(l=this.v.decode(l,{stream:!a.done}))&&(this.response=this.responseText+=l)}a.done?kr(this):Or(this),this.readyState==3&&xh(this)}},r.Ra=function(a){this.g&&(this.response=this.responseText=a,kr(this))},r.Qa=function(a){this.g&&(this.response=a,kr(this))},r.ga=function(){this.g&&kr(this)};function kr(a){a.readyState=4,a.l=null,a.j=null,a.v=null,Or(a)}r.setRequestHeader=function(a,l){this.u.append(a,l)},r.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";let a=[],l=this.h.entries();for(var h=l.next();!h.done;)h=h.value,a.push(h[0]+": "+h[1]),h=l.next();return a.join(`\r
`)};function Or(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(ji.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Vh(a){let l="";return G(a,function(h,p){l+=p,l+=":",l+=h,l+=`\r
`}),l}function pa(a,l,h){e:{for(p in h){var p=!1;break e}p=!0}p||(h=Vh(h),typeof a=="string"?h!=null&&encodeURIComponent(String(h)):re(a,l,h))}function oe(a){Ee.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}D(oe,Ee);var Bg=/^https?$/i,qg=["POST","PUT"];r=oe.prototype,r.Ha=function(a){this.J=a},r.ea=function(a,l,h,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);l=l?l.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():aa.g(),this.v=this.o?lh(this.o):lh(aa),this.g.onreadystatechange=v(this.Ea,this);try{this.B=!0,this.g.open(l,String(a),!0),this.B=!1}catch(R){Lh(this,R);return}if(a=h||"",h=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var T in p)h.set(T,p[T]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(let R of p.keys())h.set(R,p.get(R));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(h.keys()).find(R=>R.toLowerCase()=="content-type"),T=c.FormData&&a instanceof c.FormData,!(0<=Array.prototype.indexOf.call(qg,l,void 0))||p||T||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(let[R,O]of h)this.g.setRequestHeader(R,O);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Uh(this),this.u=!0,this.g.send(a),this.u=!1}catch(R){Lh(this,R)}};function Lh(a,l){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=l,a.m=5,Mh(a),zi(a)}function Mh(a){a.A||(a.A=!0,Re(a,"complete"),Re(a,"error"))}r.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,Re(this,"complete"),Re(this,"abort"),zi(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),zi(this,!0)),oe.aa.N.call(this)},r.Ea=function(){this.s||(this.B||this.u||this.j?Fh(this):this.bb())},r.bb=function(){Fh(this)};function Fh(a){if(a.h&&typeof o!="undefined"&&(!a.v[1]||ot(a)!=4||a.Z()!=2)){if(a.u&&ot(a)==4)oh(a.Ea,0,a);else if(Re(a,"readystatechange"),ot(a)==4){a.h=!1;try{let O=a.Z();e:switch(O){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var h;if(!(h=l)){var p;if(p=O===0){var T=String(a.D).match(Ph)[1]||null;!T&&c.self&&c.self.location&&(T=c.self.location.protocol.slice(0,-1)),p=!Bg.test(T?T.toLowerCase():"")}h=p}if(h)Re(a,"complete"),Re(a,"success");else{a.m=6;try{var R=2<ot(a)?a.g.statusText:""}catch{R=""}a.l=R+" ["+a.Z()+"]",Mh(a)}}finally{zi(a)}}}}function zi(a,l){if(a.g){Uh(a);let h=a.g,p=a.v[0]?()=>{}:null;a.g=null,a.v=null,l||Re(a,"ready");try{h.onreadystatechange=p}catch{}}}function Uh(a){a.I&&(c.clearTimeout(a.I),a.I=null)}r.isActive=function(){return!!this.g};function ot(a){return a.g?a.g.readyState:0}r.Z=function(){try{return 2<ot(this)?this.g.status:-1}catch{return-1}},r.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.Oa=function(a){if(this.g){var l=this.g.responseText;return a&&l.indexOf(a)==0&&(l=l.substring(a.length)),vg(l)}};function Bh(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function jg(a){let l={};a=(a.g&&2<=ot(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<a.length;p++){if(j(a[p]))continue;var h=E(a[p]);let T=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();let R=l[T]||[];l[T]=R,R.push(h)}I(l,function(p){return p.join(", ")})}r.Ba=function(){return this.m},r.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function xr(a,l,h){return h&&h.internalChannelParams&&h.internalChannelParams[a]||l}function qh(a){this.Aa=0,this.i=[],this.j=new Sr,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=xr("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=xr("baseRetryDelayMs",5e3,a),this.cb=xr("retryDelaySeedMs",1e4,a),this.Wa=xr("forwardChannelMaxRetries",2,a),this.wa=xr("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new Eh(a&&a.concurrentRequestLimit),this.Da=new Fg,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}r=qh.prototype,r.la=8,r.G=1,r.connect=function(a,l,h,p){Pe(0),this.W=a,this.H=l||{},h&&p!==void 0&&(this.H.OSID=h,this.H.OAID=p),this.F=this.X,this.I=Jh(this,null,this.W),Ki(this)};function ma(a){if(jh(a),a.G==3){var l=a.U++,h=st(a.I);if(re(h,"SID",a.K),re(h,"RID",l),re(h,"TYPE","terminate"),Vr(a,h),l=new yt(a,a.j,l),l.L=2,l.v=qi(st(h)),h=!1,c.navigator&&c.navigator.sendBeacon)try{h=c.navigator.sendBeacon(l.v.toString(),"")}catch{}!h&&c.Image&&(new Image().src=l.v,h=!0),h||(l.g=Yh(l.j,null),l.g.ea(l.v)),l.F=Date.now(),Fi(l)}Qh(a)}function Gi(a){a.g&&(_a(a),a.g.cancel(),a.g=null)}function jh(a){Gi(a),a.u&&(c.clearTimeout(a.u),a.u=null),$i(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&c.clearTimeout(a.s),a.s=null)}function Ki(a){if(!Th(a.h)&&!a.s){a.s=!0;var l=a.Ga;yr||eh(),vr||(yr(),vr=!0),Ho.add(l,a),a.B=0}}function zg(a,l){return Ah(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=l.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=br(v(a.Ga,a,l),Hh(a,a.B)),a.B++,!0)}r.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;let T=new yt(this,this.j,a),R=this.o;if(this.S&&(R?(R=g(R),w(R,this.S)):R=this.S),this.m!==null||this.O||(T.H=R,R=null),this.P)e:{for(var l=0,h=0;h<this.i.length;h++){t:{var p=this.i[h];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(l+=p,4096<l){l=h;break e}if(l===4096||h===this.i.length-1){l=h+1;break e}}l=1e3}else l=1e3;l=Gh(this,T,l),h=st(this.I),re(h,"RID",a),re(h,"CVER",22),this.D&&re(h,"X-HTTP-Session-Id",this.D),Vr(this,h),R&&(this.O?l="headers="+encodeURIComponent(String(Vh(R)))+"&"+l:this.m&&pa(h,this.m,R)),fa(this.h,T),this.Ua&&re(h,"TYPE","init"),this.P?(re(h,"$req",l),re(h,"SID","null"),T.T=!0,ua(T,h,null)):ua(T,h,l),this.G=2}}else this.G==3&&(a?zh(this,a):this.i.length==0||Th(this.h)||zh(this))};function zh(a,l){var h;l?h=l.l:h=a.U++;let p=st(a.I);re(p,"SID",a.K),re(p,"RID",h),re(p,"AID",a.T),Vr(a,p),a.m&&a.o&&pa(p,a.m,a.o),h=new yt(a,a.j,h,a.B+1),a.m===null&&(h.H=a.o),l&&(a.i=l.D.concat(a.i)),l=Gh(a,h,1e3),h.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),fa(a.h,h),ua(h,p,l)}function Vr(a,l){a.H&&G(a.H,function(h,p){re(l,p,h)}),a.l&&Rh({},function(h,p){re(l,p,h)})}function Gh(a,l,h){h=Math.min(a.i.length,h);var p=a.l?v(a.l.Na,a.l,a):null;e:{var T=a.i;let R=-1;for(;;){let O=["count="+h];R==-1?0<h?(R=T[0].g,O.push("ofs="+R)):R=0:O.push("ofs="+R);let ee=!0;for(let ve=0;ve<h;ve++){let X=T[ve].g,Te=T[ve].map;if(X-=R,0>X)R=Math.max(0,T[ve].g-100),ee=!1;else try{Ug(Te,O,"req"+X+"_")}catch{p&&p(Te)}}if(ee){p=O.join("&");break e}}}return a=a.i.splice(0,h),l.D=a,p}function Kh(a){if(!a.g&&!a.u){a.Y=1;var l=a.Fa;yr||eh(),vr||(yr(),vr=!0),Ho.add(l,a),a.v=0}}function ga(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=br(v(a.Fa,a),Hh(a,a.v)),a.v++,!0)}r.Fa=function(){if(this.u=null,$h(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=br(v(this.ab,this),a)}},r.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Pe(10),Gi(this),$h(this))};function _a(a){a.A!=null&&(c.clearTimeout(a.A),a.A=null)}function $h(a){a.g=new yt(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var l=st(a.qa);re(l,"RID","rpc"),re(l,"SID",a.K),re(l,"AID",a.T),re(l,"CI",a.F?"0":"1"),!a.F&&a.ja&&re(l,"TO",a.ja),re(l,"TYPE","xmlhttp"),Vr(a,l),a.m&&a.o&&pa(l,a.m,a.o),a.L&&(a.g.I=a.L);var h=a.g;a=a.ia,h.L=1,h.v=qi(st(l)),h.m=null,h.P=!0,vh(h,a)}r.Za=function(){this.C!=null&&(this.C=null,Gi(this),ga(this),Pe(19))};function $i(a){a.C!=null&&(c.clearTimeout(a.C),a.C=null)}function Wh(a,l){var h=null;if(a.g==l){$i(a),_a(a),a.g=null;var p=2}else if(da(a.h,l))h=l.D,bh(a.h,l),p=1;else return;if(a.G!=0){if(l.o)if(p==1){h=l.m?l.m.length:0,l=Date.now()-l.F;var T=a.B;p=Vi(),Re(p,new mh(p,h)),Ki(a)}else Kh(a);else if(T=l.s,T==3||T==0&&0<l.X||!(p==1&&zg(a,l)||p==2&&ga(a)))switch(h&&0<h.length&&(l=a.h,l.i=l.i.concat(h)),T){case 1:Wt(a,5);break;case 4:Wt(a,10);break;case 3:Wt(a,6);break;default:Wt(a,2)}}}function Hh(a,l){let h=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(h*=2),h*l}function Wt(a,l){if(a.j.info("Error code "+l),l==2){var h=v(a.fb,a),p=a.Xa;let T=!p;p=new $t(p||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||Ui(p,"https"),qi(p),T?Lg(p.toString(),h):Mg(p.toString(),h)}else Pe(2);a.G=0,a.l&&a.l.sa(l),Qh(a),jh(a)}r.fb=function(a){a?(this.j.info("Successfully pinged google.com"),Pe(2)):(this.j.info("Failed to ping google.com"),Pe(1))};function Qh(a){if(a.G=0,a.ka=[],a.l){let l=Sh(a.h);(l.length!=0||a.i.length!=0)&&(N(a.ka,l),N(a.ka,a.i),a.h.i.length=0,k(a.i),a.i.length=0),a.l.ra()}}function Jh(a,l,h){var p=h instanceof $t?st(h):new $t(h);if(p.g!="")l&&(p.g=l+"."+p.g),Bi(p,p.s);else{var T=c.location;p=T.protocol,l=l?l+"."+T.hostname:T.hostname,T=+T.port;var R=new $t(null);p&&Ui(R,p),l&&(R.g=l),T&&Bi(R,T),h&&(R.l=h),p=R}return h=a.D,l=a.ya,h&&l&&re(p,h,l),re(p,"VER",a.la),Vr(a,p),p}function Yh(a,l,h){if(l&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return l=a.Ca&&!a.pa?new oe(new Nr({eb:h})):new oe(a.pa),l.Ha(a.J),l}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function Xh(){}r=Xh.prototype,r.ua=function(){},r.ta=function(){},r.sa=function(){},r.ra=function(){},r.isActive=function(){return!0},r.Na=function(){};function Wi(){}Wi.prototype.g=function(a,l){return new Oe(a,l)};function Oe(a,l){Ee.call(this),this.g=new qh(l),this.l=a,this.h=l&&l.messageUrlParams||null,a=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(a?a["X-WebChannel-Content-Type"]=l.messageContentType:a={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.va&&(a?a["X-WebChannel-Client-Profile"]=l.va:a={"X-WebChannel-Client-Profile":l.va}),this.g.S=a,(a=l&&l.Sb)&&!j(a)&&(this.g.m=a),this.v=l&&l.supportsCrossDomainXhr||!1,this.u=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!j(l)&&(this.g.D=l,a=this.h,a!==null&&l in a&&(a=this.h,l in a&&delete a[l])),this.j=new Rn(this)}D(Oe,Ee),Oe.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Oe.prototype.close=function(){ma(this.g)},Oe.prototype.o=function(a){var l=this.g;if(typeof a=="string"){var h={};h.__data__=a,a=h}else this.u&&(h={},h.__data__=ra(a),a=h);l.i.push(new Sg(l.Ya++,a)),l.G==3&&Ki(l)},Oe.prototype.N=function(){this.g.l=null,delete this.j,ma(this.g),delete this.g,Oe.aa.N.call(this)};function Zh(a){sa.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var l=a.__sm__;if(l){e:{for(let h in l){a=h;break e}a=void 0}(this.i=a)&&(a=this.i,l=l!==null&&a in l?l[a]:void 0),this.data=l}else this.data=a}D(Zh,sa);function ed(){oa.call(this),this.status=1}D(ed,oa);function Rn(a){this.g=a}D(Rn,Xh),Rn.prototype.ua=function(){Re(this.g,"a")},Rn.prototype.ta=function(a){Re(this.g,new Zh(a))},Rn.prototype.sa=function(a){Re(this.g,new ed)},Rn.prototype.ra=function(){Re(this.g,"b")},Wi.prototype.createWebChannel=Wi.prototype.g,Oe.prototype.send=Oe.prototype.o,Oe.prototype.open=Oe.prototype.m,Oe.prototype.close=Oe.prototype.close,Rc=ft.createWebChannelTransport=function(){return new Wi},Sc=ft.getStatEventTarget=function(){return Vi()},bc=ft.Event=Gt,Ns=ft.Stat={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Li.NO_ERROR=0,Li.TIMEOUT=8,Li.HTTP_ERROR=6,Jr=ft.ErrorCode=Li,gh.COMPLETE="complete",Ac=ft.EventType=gh,hh.EventType=Tr,Tr.OPEN="a",Tr.CLOSE="b",Tr.ERROR="c",Tr.MESSAGE="d",Ee.prototype.listen=Ee.prototype.K,Ln=ft.WebChannel=hh,nI=ft.FetchXmlHttpFactory=Nr,oe.prototype.listenOnce=oe.prototype.L,oe.prototype.getLastError=oe.prototype.Ka,oe.prototype.getLastErrorCode=oe.prototype.Ba,oe.prototype.getStatus=oe.prototype.Z,oe.prototype.getResponseJson=oe.prototype.Oa,oe.prototype.getResponseText=oe.prototype.oa,oe.prototype.send=oe.prototype.ea,oe.prototype.setWithCredentials=oe.prototype.Ha,Tc=ft.XhrIo=oe}).apply(typeof Ds!="undefined"?Ds:typeof self!="undefined"?self:typeof window!="undefined"?window:{});var Af="@firebase/firestore";var ye=class{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}};ye.UNAUTHENTICATED=new ye(null),ye.GOOGLE_CREDENTIALS=new ye("google-credentials-uid"),ye.FIRST_PARTY=new ye("first-party-uid"),ye.MOCK_USER=new ye("mock-user");var pr="10.14.0";var pn=new Et("@firebase/firestore");function qn(){return pn.logLevel}function C(r,...e){if(pn.logLevel<=H.DEBUG){let t=e.map(Sl);pn.debug(`Firestore (${pr}): ${r}`,...t)}}function ce(r,...e){if(pn.logLevel<=H.ERROR){let t=e.map(Sl);pn.error(`Firestore (${pr}): ${r}`,...t)}}function ui(r,...e){if(pn.logLevel<=H.WARN){let t=e.map(Sl);pn.warn(`Firestore (${pr}): ${r}`,...t)}}function Sl(r){if(typeof r=="string")return r;try{return function(t){return JSON.stringify(t)}(r)}catch{return r}}function L(r="Unexpected state"){let e=`FIRESTORE (${pr}) INTERNAL ASSERTION FAILED: `+r;throw ce(e),new Error(e)}function U(r,e){r||L()}function M(r,e){return r}var P={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"},x=class extends xe{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}};var ze=class{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}};var Oc=class{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}},xc=class{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(ye.UNAUTHENTICATED))}shutdown(){}};var Vc=class{constructor(e){this.t=e,this.currentUser=ye.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){U(this.o===void 0);let n=this.i,i=u=>this.i!==n?(n=this.i,t(u)):Promise.resolve(),s=new ze;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new ze,e.enqueueRetryable(()=>i(this.currentUser))};let o=()=>{let u=s;e.enqueueRetryable(async()=>{await u.promise,await i(this.currentUser)})},c=u=>{C("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(u=>c(u)),setTimeout(()=>{if(!this.auth){let u=this.t.getImmediate({optional:!0});u?c(u):(C("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new ze)}},0),o()}getToken(){let e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(n=>this.i!==e?(C("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(U(typeof n.accessToken=="string"),new Oc(n.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){let e=this.auth&&this.auth.getUid();return U(e===null||typeof e=="string"),new ye(e)}},Lc=class{constructor(e,t,n){this.l=e,this.h=t,this.P=n,this.type="FirstParty",this.user=ye.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);let e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}},Mc=class{constructor(e,t,n){this.l=e,this.h=t,this.P=n}getToken(){return Promise.resolve(new Lc(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(ye.FIRST_PARTY))}shutdown(){}invalidateToken(){}},Fc=class{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}},Uc=class{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){U(this.o===void 0);let n=s=>{s.error!=null&&C("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);let o=s.token!==this.R;return this.R=s.token,C("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>n(s))};let i=s=>{C("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){let s=this.A.getImmediate({optional:!0});s?i(s):C("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){let e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(U(typeof t.token=="string"),this.R=t.token,new Fc(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}};function rI(r){let e=typeof self!="undefined"&&(self.crypto||self.msCrypto),t=new Uint8Array(r);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let n=0;n<r;n++)t[n]=Math.floor(256*Math.random());return t}var qs=class{static newId(){let e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length,n="";for(;n.length<20;){let i=rI(40);for(let s=0;s<i.length;++s)n.length<20&&i[s]<t&&(n+=e.charAt(i[s]%e.length))}return n}};function K(r,e){return r<e?-1:r>e?1:0}function Jn(r,e,t){return r.length===e.length&&r.every((n,i)=>t(n,e[i]))}function bp(r){return r+"\0"}var ue=class r{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new x(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new x(P.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new x(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new x(P.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return r.fromMillis(Date.now())}static fromDate(e){return r.fromMillis(e.getTime())}static fromMillis(e){let t=Math.floor(e/1e3),n=Math.floor(1e6*(e-1e3*t));return new r(t,n)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?K(this.nanoseconds,e.nanoseconds):K(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){let e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}};var q=class r{constructor(e){this.timestamp=e}static fromTimestamp(e){return new r(e)}static min(){return new r(new ue(0,0))}static max(){return new r(new ue(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}};var js=class r{constructor(e,t,n){t===void 0?t=0:t>e.length&&L(),n===void 0?n=e.length-t:n>e.length-t&&L(),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return r.comparator(this,e)===0}child(e){let t=this.segments.slice(this.offset,this.limit());return e instanceof r?e.forEach(n=>{t.push(n)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){let n=Math.min(e.length,t.length);for(let i=0;i<n;i++){let s=e.get(i),o=t.get(i);if(s<o)return-1;if(s>o)return 1}return e.length<t.length?-1:e.length>t.length?1:0}},te=class r extends js{construct(e,t,n){return new r(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){let t=[];for(let n of e){if(n.indexOf("//")>=0)throw new x(P.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter(i=>i.length>0))}return new r(t)}static emptyPath(){return new r([])}},iI=/^[_a-zA-Z][_a-zA-Z0-9]*$/,me=class r extends js{construct(e,t,n){return new r(e,t,n)}static isValidIdentifier(e){return iI.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),r.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new r(["__name__"])}static fromServerFormat(e){let t=[],n="",i=0,s=()=>{if(n.length===0)throw new x(P.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""},o=!1;for(;i<e.length;){let c=e[i];if(c==="\\"){if(i+1===e.length)throw new x(P.INVALID_ARGUMENT,"Path has trailing escape character: "+e);let u=e[i+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new x(P.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=u,i+=2}else c==="`"?(o=!o,i++):c!=="."||o?(n+=c,i++):(s(),i++)}if(s(),o)throw new x(P.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new r(t)}static emptyPath(){return new r([])}};var V=class r{constructor(e){this.path=e}static fromPath(e){return new r(te.fromString(e))}static fromName(e){return new r(te.fromString(e).popFirst(5))}static empty(){return new r(te.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&te.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return te.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new r(new te(e.slice()))}};var Yn=class{constructor(e,t,n,i){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=i}};function Bc(r){return r.fields.find(e=>e.kind===2)}function sn(r){return r.fields.filter(e=>e.kind!==2)}Yn.UNKNOWN_ID=-1;var Wn=class{constructor(e,t){this.fieldPath=e,this.kind=t}};var li=class r{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new r(0,Ge.min())}};function Sp(r,e){let t=r.toTimestamp().seconds,n=r.toTimestamp().nanoseconds+1,i=q.fromTimestamp(n===1e9?new ue(t+1,0):new ue(t,n));return new Ge(i,V.empty(),e)}function Rp(r){return new Ge(r.readTime,r.key,-1)}var Ge=class r{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new r(q.min(),V.empty(),-1)}static max(){return new r(q.max(),V.empty(),-1)}};function Rl(r,e){let t=r.readTime.compareTo(e.readTime);return t!==0?t:(t=V.comparator(r.documentKey,e.documentKey),t!==0?t:K(r.largestBatchId,e.largestBatchId))}var Pp="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.",zs=class{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}};async function qt(r){if(r.code!==P.FAILED_PRECONDITION||r.message!==Pp)throw r;C("LocalStore","Unexpectedly lost primary lease")}var b=class r{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&L(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new r((n,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(n,i)},this.catchCallback=s=>{this.wrapFailure(t,s).next(n,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{let t=e();return t instanceof r?t:r.resolve(t)}catch(t){return r.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):r.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):r.reject(t)}static resolve(e){return new r((t,n)=>{t(e)})}static reject(e){return new r((t,n)=>{n(e)})}static waitFor(e){return new r((t,n)=>{let i=0,s=0,o=!1;e.forEach(c=>{++i,c.next(()=>{++s,o&&s===i&&t()},u=>n(u))}),o=!0,s===i&&t()})}static or(e){let t=r.resolve(!1);for(let n of e)t=t.next(i=>i?r.resolve(i):n());return t}static forEach(e,t){let n=[];return e.forEach((i,s)=>{n.push(t.call(this,i,s))}),this.waitFor(n)}static mapArray(e,t){return new r((n,i)=>{let s=e.length,o=new Array(s),c=0;for(let u=0;u<s;u++){let d=u;t(e[d]).next(f=>{o[d]=f,++c,c===s&&n(o)},f=>i(f))}})}static doWhile(e,t){return new r((n,i)=>{let s=()=>{e()===!0?t().next(()=>{s()},i):n()};s()})}};var Gs=class r{constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.V=new ze,this.transaction.oncomplete=()=>{this.V.resolve()},this.transaction.onabort=()=>{t.error?this.V.reject(new dn(e,t.error)):this.V.resolve()},this.transaction.onerror=n=>{let i=Pl(n.target.error);this.V.reject(new dn(e,i))}}static open(e,t,n,i){try{return new r(t,e.transaction(i,n))}catch(s){throw new dn(t,s)}}get m(){return this.V.promise}abort(e){e&&this.V.reject(e),this.aborted||(C("SimpleDb","Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}g(){let e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){let t=this.transaction.objectStore(e);return new jc(t)}},Ot=class r{constructor(e,t,n){this.name=e,this.version=t,this.p=n,r.S(ae())===12.2&&ce("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}static delete(e){return C("SimpleDb","Removing database:",e),on(window.indexedDB.deleteDatabase(e)).toPromise()}static D(){if(!Ji())return!1;if(r.v())return!0;let e=ae(),t=r.S(e),n=0<t&&t<10,i=Cp(e),s=0<i&&i<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||n||s)}static v(){var e;return typeof process!="undefined"&&((e=process.__PRIVATE_env)===null||e===void 0?void 0:e.C)==="YES"}static F(e,t){return e.store(t)}static S(e){let t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(n)}async M(e){return this.db||(C("SimpleDb","Opening database:",this.name),this.db=await new Promise((t,n)=>{let i=indexedDB.open(this.name,this.version);i.onsuccess=s=>{let o=s.target.result;t(o)},i.onblocked=()=>{n(new dn(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},i.onerror=s=>{let o=s.target.error;o.name==="VersionError"?n(new x(P.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?n(new x(P.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):n(new dn(e,o))},i.onupgradeneeded=s=>{C("SimpleDb",'Database "'+this.name+'" requires upgrade from version:',s.oldVersion);let o=s.target.result;this.p.O(o,i.transaction,s.oldVersion,this.version).next(()=>{C("SimpleDb","Database upgrade to version "+this.version+" complete")})}})),this.N&&(this.db.onversionchange=t=>this.N(t)),this.db}L(e){this.N=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,n,i){let s=t==="readonly",o=0;for(;;){++o;try{this.db=await this.M(e);let c=Gs.open(this.db,e,s?"readonly":"readwrite",n),u=i(c).next(d=>(c.g(),d)).catch(d=>(c.abort(d),b.reject(d))).toPromise();return u.catch(()=>{}),await c.m,u}catch(c){let u=c,d=u.name!=="FirebaseError"&&o<3;if(C("SimpleDb","Transaction failed with error:",u.message,"Retrying:",d),this.close(),!d)return Promise.reject(u)}}}close(){this.db&&this.db.close(),this.db=void 0}};function Cp(r){let e=r.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}var qc=class{constructor(e){this.B=e,this.k=!1,this.q=null}get isDone(){return this.k}get K(){return this.q}set cursor(e){this.B=e}done(){this.k=!0}$(e){this.q=e}delete(){return on(this.B.delete())}},dn=class extends x{constructor(e,t){super(P.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}};function jt(r){return r.name==="IndexedDbTransactionError"}var jc=class{constructor(e){this.store=e}put(e,t){let n;return t!==void 0?(C("SimpleDb","PUT",this.store.name,e,t),n=this.store.put(t,e)):(C("SimpleDb","PUT",this.store.name,"<auto-key>",e),n=this.store.put(e)),on(n)}add(e){return C("SimpleDb","ADD",this.store.name,e,e),on(this.store.add(e))}get(e){return on(this.store.get(e)).next(t=>(t===void 0&&(t=null),C("SimpleDb","GET",this.store.name,e,t),t))}delete(e){return C("SimpleDb","DELETE",this.store.name,e),on(this.store.delete(e))}count(){return C("SimpleDb","COUNT",this.store.name),on(this.store.count())}U(e,t){let n=this.options(e,t),i=n.index?this.store.index(n.index):this.store;if(typeof i.getAll=="function"){let s=i.getAll(n.range);return new b((o,c)=>{s.onerror=u=>{c(u.target.error)},s.onsuccess=u=>{o(u.target.result)}})}{let s=this.cursor(n),o=[];return this.W(s,(c,u)=>{o.push(u)}).next(()=>o)}}G(e,t){let n=this.store.getAll(e,t===null?void 0:t);return new b((i,s)=>{n.onerror=o=>{s(o.target.error)},n.onsuccess=o=>{i(o.target.result)}})}j(e,t){C("SimpleDb","DELETE ALL",this.store.name);let n=this.options(e,t);n.H=!1;let i=this.cursor(n);return this.W(i,(s,o,c)=>c.delete())}J(e,t){let n;t?n=e:(n={},t=e);let i=this.cursor(n);return this.W(i,t)}Y(e){let t=this.cursor({});return new b((n,i)=>{t.onerror=s=>{let o=Pl(s.target.error);i(o)},t.onsuccess=s=>{let o=s.target.result;o?e(o.primaryKey,o.value).next(c=>{c?o.continue():n()}):n()}})}W(e,t){let n=[];return new b((i,s)=>{e.onerror=o=>{s(o.target.error)},e.onsuccess=o=>{let c=o.target.result;if(!c)return void i();let u=new qc(c),d=t(c.primaryKey,c.value,u);if(d instanceof b){let f=d.catch(m=>(u.done(),b.reject(m)));n.push(f)}u.isDone?i():u.K===null?c.continue():c.continue(u.K)}}).next(()=>b.waitFor(n))}options(e,t){let n;return e!==void 0&&(typeof e=="string"?n=e:t=e),{index:n,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){let n=this.store.index(e.index);return e.H?n.openKeyCursor(e.range,t):n.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}};function on(r){return new b((e,t)=>{r.onsuccess=n=>{let i=n.target.result;e(i)},r.onerror=n=>{let i=Pl(n.target.error);t(i)}})}var bf=!1;function Pl(r){let e=Ot.S(ae());if(e>=12.2&&e<13){let t="An internal error was encountered in the Indexed Database server";if(r.message.indexOf(t)>=0){let n=new x("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return bf||(bf=!0,setTimeout(()=>{throw n},0)),n}}return r}var zc=class{constructor(e,t){this.asyncQueue=e,this.Z=t,this.task=null}start(){this.X(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}X(e){C("IndexBackfiller",`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{C("IndexBackfiller",`Documents written: ${await this.Z.ee()}`)}catch(t){jt(t)?C("IndexBackfiller","Ignoring IndexedDB error during index backfill: ",t):await qt(t)}await this.X(6e4)})}},Gc=class{constructor(e,t){this.localStore=e,this.persistence=t}async ee(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.te(t,e))}te(e,t){let n=new Set,i=t,s=!0;return b.doWhile(()=>s===!0&&i>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(o=>{if(o!==null&&!n.has(o))return C("IndexBackfiller",`Processing collection: ${o}`),this.ne(e,o,i).next(c=>{i-=c,n.add(o)});s=!1})).next(()=>t-i)}ne(e,t,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(i=>this.localStore.localDocuments.getNextDocuments(e,t,i,n).next(s=>{let o=s.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next(()=>this.re(i,s)).next(c=>(C("IndexBackfiller",`Updating offset: ${c}`),this.localStore.indexManager.updateCollectionGroup(e,t,c))).next(()=>o.size)}))}re(e,t){let n=e;return t.changes.forEach((i,s)=>{let o=Rp(s);Rl(o,n)>0&&(n=o)}),new Ge(n.readTime,n.documentKey,Math.max(t.batchId,e.largestBatchId))}};var Se=class{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=n=>this.ie(n),this.se=n=>t.writeSequenceNumber(n))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){let e=++this.previousValue;return this.se&&this.se(e),e}};Se.oe=-1;function Bo(r){return r==null}function hi(r){return r===0&&1/r==-1/0}function Dp(r){return typeof r=="number"&&Number.isInteger(r)&&!hi(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}function De(r){let e="";for(let t=0;t<r.length;t++)e.length>0&&(e=Sf(e)),e=sI(r.get(t),e);return Sf(e)}function sI(r,e){let t=e,n=r.length;for(let i=0;i<n;i++){let s=r.charAt(i);switch(s){case"\0":t+="";break;case"":t+="";break;default:t+=s}}return t}function Sf(r){return r+""}function Xe(r){let e=r.length;if(U(e>=2),e===2)return U(r.charAt(0)===""&&r.charAt(1)===""),te.emptyPath();let t=e-2,n=[],i="";for(let s=0;s<e;){let o=r.indexOf("",s);switch((o<0||o>t)&&L(),r.charAt(o+1)){case"":let c=r.substring(s,o),u;i.length===0?u=c:(i+=c,u=i,i=""),n.push(u);break;case"":i+=r.substring(s,o),i+="\0";break;case"":i+=r.substring(s,o+1);break;default:L()}s=o+2}return new te(n)}var Rf=["userId","batchId"];function Ls(r,e){return[r,De(e)]}function Np(r,e,t){return[r,De(e),t]}var oI={},aI=["prefixPath","collectionGroup","readTime","documentId"],cI=["prefixPath","collectionGroup","documentId"],uI=["collectionGroup","readTime","prefixPath","documentId"],lI=["canonicalId","targetId"],hI=["targetId","path"],dI=["path","targetId"],fI=["collectionId","parent"],pI=["indexId","uid"],mI=["uid","sequenceNumber"],gI=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],_I=["indexId","uid","orderedDocumentKey"],yI=["userId","collectionPath","documentId"],vI=["userId","collectionPath","largestBatchId"],II=["userId","collectionGroup","largestBatchId"],kp=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],wI=[...kp,"documentOverlays"],Op=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],xp=Op,Cl=[...xp,"indexConfiguration","indexState","indexEntries"],EI=Cl,TI=[...Cl,"globals"];var di=class extends zs{constructor(e,t){super(),this._e=e,this.currentSequenceNumber=t}};function ge(r,e){let t=M(r);return Ot.F(t._e,e)}function Pf(r){let e=0;for(let t in r)Object.prototype.hasOwnProperty.call(r,t)&&e++;return e}function Tn(r,e){for(let t in r)Object.prototype.hasOwnProperty.call(r,t)&&e(t,r[t])}function Vp(r){for(let e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}var ie=class r{constructor(e,t){this.comparator=e,this.root=t||et.EMPTY}insert(e,t){return new r(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,et.BLACK,null,null))}remove(e){return new r(this.comparator,this.root.remove(e,this.comparator).copy(null,null,et.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){let n=this.comparator(e,t.key);if(n===0)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){let i=this.comparator(e,n.key);if(i===0)return t+n.left.size;i<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,n)=>(e(t,n),!1))}toString(){let e=[];return this.inorderTraversal((t,n)=>(e.push(`${t}:${n}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new $n(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new $n(this.root,e,this.comparator,!1)}getReverseIterator(){return new $n(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new $n(this.root,e,this.comparator,!0)}},$n=class{constructor(e,t,n,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?n(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}},et=class r{constructor(e,t,n,i,s){this.key=e,this.value=t,this.color=n!=null?n:r.RED,this.left=i!=null?i:r.EMPTY,this.right=s!=null?s:r.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,i,s){return new r(e!=null?e:this.key,t!=null?t:this.value,n!=null?n:this.color,i!=null?i:this.left,s!=null?s:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let i=this,s=n(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,n),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,n)),i.fixUp()}removeMin(){if(this.left.isEmpty())return r.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return r.EMPTY;n=i.right.min(),i=i.copy(n.key,n.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){let e=this.copy(null,null,r.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,r.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){let e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw L();let e=this.left.check();if(e!==this.right.check())throw L();return e+(this.isRed()?0:1)}};et.EMPTY=null,et.RED=!0,et.BLACK=!1;et.EMPTY=new class{constructor(){this.size=0}get key(){throw L()}get value(){throw L()}get color(){throw L()}get left(){throw L()}get right(){throw L()}copy(e,t,n,i,s){return this}insert(e,t,n){return new et(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};var ne=class r{constructor(e){this.comparator=e,this.data=new ie(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,n)=>(e(t),!1))}forEachInRange(e,t){let n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){let i=n.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let n;for(n=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){let t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Ks(this.data.getIterator())}getIteratorFrom(e){return new Ks(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(n=>{t=t.add(n)}),t}isEqual(e){if(!(e instanceof r)||this.size!==e.size)return!1;let t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){let i=t.getNext().key,s=n.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){let e=[];return this.forEach(t=>{e.push(t)}),e}toString(){let e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){let t=new r(this.comparator);return t.data=e,t}},Ks=class{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}};function Mn(r){return r.hasNext()?r.getNext():void 0}var Ve=class r{constructor(e){this.fields=e,e.sort(me.comparator)}static empty(){return new r([])}unionWith(e){let t=new ne(me.comparator);for(let n of this.fields)t=t.add(n);for(let n of e)t=t.add(n);return new r(t.toArray())}covers(e){for(let t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Jn(this.fields,e.fields,(t,n)=>t.isEqual(n))}};var $s=class extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}};var pe=class r{constructor(e){this.binaryString=e}static fromBase64String(e){let t=function(i){try{return atob(i)}catch(s){throw typeof DOMException!="undefined"&&s instanceof DOMException?new $s("Invalid base64 string: "+s):s}}(e);return new r(t)}static fromUint8Array(e){let t=function(i){let s="";for(let o=0;o<i.length;++o)s+=String.fromCharCode(i[o]);return s}(e);return new r(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){let n=new Uint8Array(t.length);for(let i=0;i<t.length;i++)n[i]=t.charCodeAt(i);return n}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return K(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}};pe.EMPTY_BYTE_STRING=new pe("");var AI=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function mt(r){if(U(!!r),typeof r=="string"){let e=0,t=AI.exec(r);if(U(!!t),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}let n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:e}}return{seconds:se(r.seconds),nanos:se(r.nanos)}}function se(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function xt(r){return typeof r=="string"?pe.fromBase64String(r):pe.fromUint8Array(r)}function Dl(r){var e,t;return((t=(((e=r==null?void 0:r.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function Nl(r){let e=r.mapValue.fields.__previous_value__;return Dl(e)?Nl(e):e}function fi(r){let e=mt(r.mapValue.fields.__local_write_time__.timestampValue);return new ue(e.seconds,e.nanos)}var Kc=class{constructor(e,t,n,i,s,o,c,u,d){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=d}},Xn=class r{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new r("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof r&&e.projectId===this.projectId&&e.database===this.database}};var Nt={mapValue:{fields:{__type__:{stringValue:"__max__"}}}},Ms={nullValue:"NULL_VALUE"};function mn(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?Dl(r)?4:Lp(r)?9007199254740991:qo(r)?10:11:L()}function nt(r,e){if(r===e)return!0;let t=mn(r);if(t!==mn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===e.booleanValue;case 4:return fi(r).isEqual(fi(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;let o=mt(i.timestampValue),c=mt(s.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos}(r,e);case 5:return r.stringValue===e.stringValue;case 6:return function(i,s){return xt(i.bytesValue).isEqual(xt(s.bytesValue))}(r,e);case 7:return r.referenceValue===e.referenceValue;case 8:return function(i,s){return se(i.geoPointValue.latitude)===se(s.geoPointValue.latitude)&&se(i.geoPointValue.longitude)===se(s.geoPointValue.longitude)}(r,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return se(i.integerValue)===se(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){let o=se(i.doubleValue),c=se(s.doubleValue);return o===c?hi(o)===hi(c):isNaN(o)&&isNaN(c)}return!1}(r,e);case 9:return Jn(r.arrayValue.values||[],e.arrayValue.values||[],nt);case 10:case 11:return function(i,s){let o=i.mapValue.fields||{},c=s.mapValue.fields||{};if(Pf(o)!==Pf(c))return!1;for(let u in o)if(o.hasOwnProperty(u)&&(c[u]===void 0||!nt(o[u],c[u])))return!1;return!0}(r,e);default:return L()}}function pi(r,e){return(r.values||[]).find(t=>nt(t,e))!==void 0}function Vt(r,e){if(r===e)return 0;let t=mn(r),n=mn(e);if(t!==n)return K(t,n);switch(t){case 0:case 9007199254740991:return 0;case 1:return K(r.booleanValue,e.booleanValue);case 2:return function(s,o){let c=se(s.integerValue||s.doubleValue),u=se(o.integerValue||o.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1}(r,e);case 3:return Cf(r.timestampValue,e.timestampValue);case 4:return Cf(fi(r),fi(e));case 5:return K(r.stringValue,e.stringValue);case 6:return function(s,o){let c=xt(s),u=xt(o);return c.compareTo(u)}(r.bytesValue,e.bytesValue);case 7:return function(s,o){let c=s.split("/"),u=o.split("/");for(let d=0;d<c.length&&d<u.length;d++){let f=K(c[d],u[d]);if(f!==0)return f}return K(c.length,u.length)}(r.referenceValue,e.referenceValue);case 8:return function(s,o){let c=K(se(s.latitude),se(o.latitude));return c!==0?c:K(se(s.longitude),se(o.longitude))}(r.geoPointValue,e.geoPointValue);case 9:return Df(r.arrayValue,e.arrayValue);case 10:return function(s,o){var c,u,d,f;let m=s.fields||{},v=o.fields||{},S=(c=m.value)===null||c===void 0?void 0:c.arrayValue,D=(u=v.value)===null||u===void 0?void 0:u.arrayValue,k=K(((d=S==null?void 0:S.values)===null||d===void 0?void 0:d.length)||0,((f=D==null?void 0:D.values)===null||f===void 0?void 0:f.length)||0);return k!==0?k:Df(S,D)}(r.mapValue,e.mapValue);case 11:return function(s,o){if(s===Nt.mapValue&&o===Nt.mapValue)return 0;if(s===Nt.mapValue)return 1;if(o===Nt.mapValue)return-1;let c=s.fields||{},u=Object.keys(c),d=o.fields||{},f=Object.keys(d);u.sort(),f.sort();for(let m=0;m<u.length&&m<f.length;++m){let v=K(u[m],f[m]);if(v!==0)return v;let S=Vt(c[u[m]],d[f[m]]);if(S!==0)return S}return K(u.length,f.length)}(r.mapValue,e.mapValue);default:throw L()}}function Cf(r,e){if(typeof r=="string"&&typeof e=="string"&&r.length===e.length)return K(r,e);let t=mt(r),n=mt(e),i=K(t.seconds,n.seconds);return i!==0?i:K(t.nanos,n.nanos)}function Df(r,e){let t=r.values||[],n=e.values||[];for(let i=0;i<t.length&&i<n.length;++i){let s=Vt(t[i],n[i]);if(s)return s}return K(t.length,n.length)}function Zn(r){return $c(r)}function $c(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?function(t){let n=mt(t);return`time(${n.seconds},${n.nanos})`}(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?function(t){return xt(t).toBase64()}(r.bytesValue):"referenceValue"in r?function(t){return V.fromName(t).toString()}(r.referenceValue):"geoPointValue"in r?function(t){return`geo(${t.latitude},${t.longitude})`}(r.geoPointValue):"arrayValue"in r?function(t){let n="[",i=!0;for(let s of t.values||[])i?i=!1:n+=",",n+=$c(s);return n+"]"}(r.arrayValue):"mapValue"in r?function(t){let n=Object.keys(t.fields||{}).sort(),i="{",s=!0;for(let o of n)s?s=!1:i+=",",i+=`${o}:${$c(t.fields[o])}`;return i+"}"}(r.mapValue):L()}function kl(r,e){return{referenceValue:`projects/${r.projectId}/databases/${r.database}/documents/${e.path.canonicalString()}`}}function Wc(r){return!!r&&"integerValue"in r}function mi(r){return!!r&&"arrayValue"in r}function Nf(r){return!!r&&"nullValue"in r}function kf(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function Fs(r){return!!r&&"mapValue"in r}function qo(r){var e,t;return((t=(((e=r==null?void 0:r.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="__vector__"}function ri(r){if(r.geoPointValue)return{geoPointValue:Object.assign({},r.geoPointValue)};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:Object.assign({},r.timestampValue)};if(r.mapValue){let e={mapValue:{fields:{}}};return Tn(r.mapValue.fields,(t,n)=>e.mapValue.fields[t]=ri(n)),e}if(r.arrayValue){let e={arrayValue:{values:[]}};for(let t=0;t<(r.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=ri(r.arrayValue.values[t]);return e}return Object.assign({},r)}function Lp(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}var Mp={mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{}}}}};function bI(r){return"nullValue"in r?Ms:"booleanValue"in r?{booleanValue:!1}:"integerValue"in r||"doubleValue"in r?{doubleValue:NaN}:"timestampValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in r?{stringValue:""}:"bytesValue"in r?{bytesValue:""}:"referenceValue"in r?kl(Xn.empty(),V.empty()):"geoPointValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in r?{arrayValue:{}}:"mapValue"in r?qo(r)?Mp:{mapValue:{}}:L()}function SI(r){return"nullValue"in r?{booleanValue:!1}:"booleanValue"in r?{doubleValue:NaN}:"integerValue"in r||"doubleValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in r?{stringValue:""}:"stringValue"in r?{bytesValue:""}:"bytesValue"in r?kl(Xn.empty(),V.empty()):"referenceValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in r?{arrayValue:{}}:"arrayValue"in r?Mp:"mapValue"in r?qo(r)?{mapValue:{}}:Nt:L()}function Of(r,e){let t=Vt(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?-1:!r.inclusive&&e.inclusive?1:0}function xf(r,e){let t=Vt(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?1:!r.inclusive&&e.inclusive?-1:0}var Ce=class r{constructor(e){this.value=e}static empty(){return new r({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!Fs(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=ri(t)}setAll(e){let t=me.emptyPath(),n={},i=[];e.forEach((o,c)=>{if(!t.isImmediateParentOf(c)){let u=this.getFieldsMap(t);this.applyChanges(u,n,i),n={},i=[],t=c.popLast()}o?n[c.lastSegment()]=ri(o):i.push(c.lastSegment())});let s=this.getFieldsMap(t);this.applyChanges(s,n,i)}delete(e){let t=this.field(e.popLast());Fs(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return nt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let i=t.mapValue.fields[e.get(n)];Fs(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,n){Tn(t,(i,s)=>e[i]=s);for(let i of n)delete e[i]}clone(){return new r(ri(this.value))}};function Fp(r){let e=[];return Tn(r.fields,(t,n)=>{let i=new me([t]);if(Fs(n)){let s=Fp(n.mapValue).fields;if(s.length===0)e.push(i);else for(let o of s)e.push(i.child(o))}else e.push(i)}),new Ve(e)}var Ie=class r{constructor(e,t,n,i,s,o,c){this.key=e,this.documentType=t,this.version=n,this.readTime=i,this.createTime=s,this.data=o,this.documentState=c}static newInvalidDocument(e){return new r(e,0,q.min(),q.min(),q.min(),Ce.empty(),0)}static newFoundDocument(e,t,n,i){return new r(e,1,t,q.min(),n,i,0)}static newNoDocument(e,t){return new r(e,2,t,q.min(),q.min(),Ce.empty(),0)}static newUnknownDocument(e,t){return new r(e,3,t,q.min(),q.min(),Ce.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(q.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Ce.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Ce.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=q.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof r&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new r(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}};var Lt=class{constructor(e,t){this.position=e,this.inclusive=t}};function Vf(r,e,t){let n=0;for(let i=0;i<r.position.length;i++){let s=e[i],o=r.position[i];if(s.field.isKeyField()?n=V.comparator(V.fromName(o.referenceValue),t.key):n=Vt(o,t.data.field(s.field)),s.dir==="desc"&&(n*=-1),n!==0)break}return n}function Lf(r,e){if(r===null)return e===null;if(e===null||r.inclusive!==e.inclusive||r.position.length!==e.position.length)return!1;for(let t=0;t<r.position.length;t++)if(!nt(r.position[t],e.position[t]))return!1;return!0}var er=class{constructor(e,t="asc"){this.field=e,this.dir=t}};function RI(r,e){return r.dir===e.dir&&r.field.isEqual(e.field)}var Ws=class{},Q=class r extends Ws{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,n):new Jc(e,t,n):t==="array-contains"?new Zc(e,n):t==="in"?new Hs(e,n):t==="not-in"?new eu(e,n):t==="array-contains-any"?new tu(e,n):new r(e,t,n)}static createKeyFieldInFilter(e,t,n){return t==="in"?new Yc(e,n):new Xc(e,n)}matches(e){let t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(Vt(t,this.value)):t!==null&&mn(this.value)===mn(t)&&this.matchesComparison(Vt(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return L()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}},Z=class r extends Ws{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new r(e,t)}matches(e){return tr(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}};function tr(r){return r.op==="and"}function Hc(r){return r.op==="or"}function Ol(r){return Up(r)&&tr(r)}function Up(r){for(let e of r.filters)if(e instanceof Z)return!1;return!0}function Qc(r){if(r instanceof Q)return r.field.canonicalString()+r.op.toString()+Zn(r.value);if(Ol(r))return r.filters.map(e=>Qc(e)).join(",");{let e=r.filters.map(t=>Qc(t)).join(",");return`${r.op}(${e})`}}function Bp(r,e){return r instanceof Q?function(n,i){return i instanceof Q&&n.op===i.op&&n.field.isEqual(i.field)&&nt(n.value,i.value)}(r,e):r instanceof Z?function(n,i){return i instanceof Z&&n.op===i.op&&n.filters.length===i.filters.length?n.filters.reduce((s,o,c)=>s&&Bp(o,i.filters[c]),!0):!1}(r,e):void L()}function qp(r,e){let t=r.filters.concat(e);return Z.create(t,r.op)}function jp(r){return r instanceof Q?function(t){return`${t.field.canonicalString()} ${t.op} ${Zn(t.value)}`}(r):r instanceof Z?function(t){return t.op.toString()+" {"+t.getFilters().map(jp).join(" ,")+"}"}(r):"Filter"}var Jc=class extends Q{constructor(e,t,n){super(e,t,n),this.key=V.fromName(n.referenceValue)}matches(e){let t=V.comparator(e.key,this.key);return this.matchesComparison(t)}},Yc=class extends Q{constructor(e,t){super(e,"in",t),this.keys=zp("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}},Xc=class extends Q{constructor(e,t){super(e,"not-in",t),this.keys=zp("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}};function zp(r,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(n=>V.fromName(n.referenceValue))}var Zc=class extends Q{constructor(e,t){super(e,"array-contains",t)}matches(e){let t=e.data.field(this.field);return mi(t)&&pi(t.arrayValue,this.value)}},Hs=class extends Q{constructor(e,t){super(e,"in",t)}matches(e){let t=e.data.field(this.field);return t!==null&&pi(this.value.arrayValue,t)}},eu=class extends Q{constructor(e,t){super(e,"not-in",t)}matches(e){if(pi(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let t=e.data.field(this.field);return t!==null&&!pi(this.value.arrayValue,t)}},tu=class extends Q{constructor(e,t){super(e,"array-contains-any",t)}matches(e){let t=e.data.field(this.field);return!(!mi(t)||!t.arrayValue.values)&&t.arrayValue.values.some(n=>pi(this.value.arrayValue,n))}};var nu=class{constructor(e,t=null,n=[],i=[],s=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=i,this.limit=s,this.startAt=o,this.endAt=c,this.ue=null}};function ru(r,e=null,t=[],n=[],i=null,s=null,o=null){return new nu(r,e,t,n,i,s,o)}function gn(r){let e=M(r);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(n=>Qc(n)).join(","),t+="|ob:",t+=e.orderBy.map(n=>function(s){return s.field.canonicalString()+s.dir}(n)).join(","),Bo(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(n=>Zn(n)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(n=>Zn(n)).join(",")),e.ue=t}return e.ue}function Pi(r,e){if(r.limit!==e.limit||r.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<r.orderBy.length;t++)if(!RI(r.orderBy[t],e.orderBy[t]))return!1;if(r.filters.length!==e.filters.length)return!1;for(let t=0;t<r.filters.length;t++)if(!Bp(r.filters[t],e.filters[t]))return!1;return r.collectionGroup===e.collectionGroup&&!!r.path.isEqual(e.path)&&!!Lf(r.startAt,e.startAt)&&Lf(r.endAt,e.endAt)}function Qs(r){return V.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function Js(r,e){return r.filters.filter(t=>t instanceof Q&&t.field.isEqual(e))}function Mf(r,e,t){let n=Ms,i=!0;for(let s of Js(r,e)){let o=Ms,c=!0;switch(s.op){case"<":case"<=":o=bI(s.value);break;case"==":case"in":case">=":o=s.value;break;case">":o=s.value,c=!1;break;case"!=":case"not-in":o=Ms}Of({value:n,inclusive:i},{value:o,inclusive:c})<0&&(n=o,i=c)}if(t!==null){for(let s=0;s<r.orderBy.length;++s)if(r.orderBy[s].field.isEqual(e)){let o=t.position[s];Of({value:n,inclusive:i},{value:o,inclusive:t.inclusive})<0&&(n=o,i=t.inclusive);break}}return{value:n,inclusive:i}}function Ff(r,e,t){let n=Nt,i=!0;for(let s of Js(r,e)){let o=Nt,c=!0;switch(s.op){case">=":case">":o=SI(s.value),c=!1;break;case"==":case"in":case"<=":o=s.value;break;case"<":o=s.value,c=!1;break;case"!=":case"not-in":o=Nt}xf({value:n,inclusive:i},{value:o,inclusive:c})>0&&(n=o,i=c)}if(t!==null){for(let s=0;s<r.orderBy.length;++s)if(r.orderBy[s].field.isEqual(e)){let o=t.position[s];xf({value:n,inclusive:i},{value:o,inclusive:t.inclusive})>0&&(n=o,i=t.inclusive);break}}return{value:n,inclusive:i}}var nr=class{constructor(e,t=null,n=[],i=[],s=null,o="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=i,this.limit=s,this.limitType=o,this.startAt=c,this.endAt=u,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}};function Gp(r,e,t,n,i,s,o,c){return new nr(r,e,t,n,i,s,o,c)}function Ci(r){return new nr(r)}function Uf(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function PI(r){return r.collectionGroup!==null}function ii(r){let e=M(r);if(e.ce===null){e.ce=[];let t=new Set;for(let s of e.explicitOrderBy)e.ce.push(s),t.add(s.field.canonicalString());let n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new ne(me.comparator);return o.filters.forEach(u=>{u.getFlattenedFilters().forEach(d=>{d.isInequality()&&(c=c.add(d.field))})}),c})(e).forEach(s=>{t.has(s.canonicalString())||s.isKeyField()||e.ce.push(new er(s,n))}),t.has(me.keyField().canonicalString())||e.ce.push(new er(me.keyField(),n))}return e.ce}function Fe(r){let e=M(r);return e.le||(e.le=CI(e,ii(r))),e.le}function CI(r,e){if(r.limitType==="F")return ru(r.path,r.collectionGroup,e,r.filters,r.limit,r.startAt,r.endAt);{e=e.map(i=>{let s=i.dir==="desc"?"asc":"desc";return new er(i.field,s)});let t=r.endAt?new Lt(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new Lt(r.startAt.position,r.startAt.inclusive):null;return ru(r.path,r.collectionGroup,e,r.filters,r.limit,t,n)}}function iu(r,e,t){return new nr(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),e,t,r.startAt,r.endAt)}function jo(r,e){return Pi(Fe(r),Fe(e))&&r.limitType===e.limitType}function Kp(r){return`${gn(Fe(r))}|lt:${r.limitType}`}function jn(r){return`Query(target=${function(t){let n=t.path.canonicalString();return t.collectionGroup!==null&&(n+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(n+=`, filters: [${t.filters.map(i=>jp(i)).join(", ")}]`),Bo(t.limit)||(n+=", limit: "+t.limit),t.orderBy.length>0&&(n+=`, orderBy: [${t.orderBy.map(i=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(i)).join(", ")}]`),t.startAt&&(n+=", startAt: ",n+=t.startAt.inclusive?"b:":"a:",n+=t.startAt.position.map(i=>Zn(i)).join(",")),t.endAt&&(n+=", endAt: ",n+=t.endAt.inclusive?"a:":"b:",n+=t.endAt.position.map(i=>Zn(i)).join(",")),`Target(${n})`}(Fe(r))}; limitType=${r.limitType})`}function Di(r,e){return e.isFoundDocument()&&function(n,i){let s=i.key.path;return n.collectionGroup!==null?i.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(s):V.isDocumentKey(n.path)?n.path.isEqual(s):n.path.isImmediateParentOf(s)}(r,e)&&function(n,i){for(let s of ii(n))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(r,e)&&function(n,i){for(let s of n.filters)if(!s.matches(i))return!1;return!0}(r,e)&&function(n,i){return!(n.startAt&&!function(o,c,u){let d=Vf(o,c,u);return o.inclusive?d<=0:d<0}(n.startAt,ii(n),i)||n.endAt&&!function(o,c,u){let d=Vf(o,c,u);return o.inclusive?d>=0:d>0}(n.endAt,ii(n),i))}(r,e)}function $p(r){return r.collectionGroup||(r.path.length%2==1?r.path.lastSegment():r.path.get(r.path.length-2))}function Wp(r){return(e,t)=>{let n=!1;for(let i of ii(r)){let s=DI(i,e,t);if(s!==0)return s;n=n||i.field.isKeyField()}return 0}}function DI(r,e,t){let n=r.field.isKeyField()?V.comparator(e.key,t.key):function(s,o,c){let u=o.data.field(s),d=c.data.field(s);return u!==null&&d!==null?Vt(u,d):L()}(r.field,e,t);switch(r.dir){case"asc":return n;case"desc":return-1*n;default:return L()}}var rt=class{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){let t=this.mapKeyFn(e),n=this.inner[t];if(n!==void 0){for(let[i,s]of n)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){let n=this.mapKeyFn(e),i=this.inner[n];if(i===void 0)return this.inner[n]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){let t=this.mapKeyFn(e),n=this.inner[t];if(n===void 0)return!1;for(let i=0;i<n.length;i++)if(this.equalsFn(n[i][0],e))return n.length===1?delete this.inner[t]:n.splice(i,1),this.innerSize--,!0;return!1}forEach(e){Tn(this.inner,(t,n)=>{for(let[i,s]of n)e(i,s)})}isEmpty(){return Vp(this.inner)}size(){return this.innerSize}};var NI=new ie(V.comparator);function Le(){return NI}var Hp=new ie(V.comparator);function ti(...r){let e=Hp;for(let t of r)e=e.insert(t.key,t);return e}function Qp(r){let e=Hp;return r.forEach((t,n)=>e=e.insert(t,n.overlayedDocument)),e}function Ze(){return si()}function Jp(){return si()}function si(){return new rt(r=>r.toString(),(r,e)=>r.isEqual(e))}var kI=new ie(V.comparator),OI=new ne(V.comparator);function $(...r){let e=OI;for(let t of r)e=e.add(t);return e}var xI=new ne(K);function xl(){return xI}function Vl(r,e){if(r.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:hi(e)?"-0":e}}function Yp(r){return{integerValue:""+r}}function VI(r,e){return Dp(e)?Yp(e):Vl(r,e)}var rr=class{constructor(){this._=void 0}};function LI(r,e,t){return r instanceof _n?function(i,s){let o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&Dl(s)&&(s=Nl(s)),s&&(o.fields.__previous_value__=s),{mapValue:o}}(t,e):r instanceof Mt?Zp(r,e):r instanceof Ft?em(r,e):function(i,s){let o=Xp(i,s),c=Bf(o)+Bf(i.Pe);return Wc(o)&&Wc(i.Pe)?Yp(c):Vl(i.serializer,c)}(r,e)}function MI(r,e,t){return r instanceof Mt?Zp(r,e):r instanceof Ft?em(r,e):t}function Xp(r,e){return r instanceof yn?function(n){return Wc(n)||function(s){return!!s&&"doubleValue"in s}(n)}(e)?e:{integerValue:0}:null}var _n=class extends rr{},Mt=class extends rr{constructor(e){super(),this.elements=e}};function Zp(r,e){let t=tm(e);for(let n of r.elements)t.some(i=>nt(i,n))||t.push(n);return{arrayValue:{values:t}}}var Ft=class extends rr{constructor(e){super(),this.elements=e}};function em(r,e){let t=tm(e);for(let n of r.elements)t=t.filter(i=>!nt(i,n));return{arrayValue:{values:t}}}var yn=class extends rr{constructor(e,t){super(),this.serializer=e,this.Pe=t}};function Bf(r){return se(r.integerValue||r.doubleValue)}function tm(r){return mi(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}var su=class{constructor(e,t){this.field=e,this.transform=t}};function FI(r,e){return r.field.isEqual(e.field)&&function(n,i){return n instanceof Mt&&i instanceof Mt||n instanceof Ft&&i instanceof Ft?Jn(n.elements,i.elements,nt):n instanceof yn&&i instanceof yn?nt(n.Pe,i.Pe):n instanceof _n&&i instanceof _n}(r.transform,e.transform)}var ou=class{constructor(e,t){this.version=e,this.transformResults=t}},Me=class r{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new r}static exists(e){return new r(void 0,e)}static updateTime(e){return new r(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}};function Us(r,e){return r.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(r.updateTime):r.exists===void 0||r.exists===e.isFoundDocument()}var ir=class{};function nm(r,e){if(!r.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return r.isNoDocument()?new sr(r.key,Me.none()):new Ut(r.key,r.data,Me.none());{let t=r.data,n=Ce.empty(),i=new ne(me.comparator);for(let s of e.fields)if(!i.has(s)){let o=t.field(s);o===null&&s.length>1&&(s=s.popLast(),o=t.field(s)),o===null?n.delete(s):n.set(s,o),i=i.add(s)}return new He(r.key,n,new Ve(i.toArray()),Me.none())}}function UI(r,e,t){r instanceof Ut?function(i,s,o){let c=i.value.clone(),u=jf(i.fieldTransforms,s,o.transformResults);c.setAll(u),s.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(r,e,t):r instanceof He?function(i,s,o){if(!Us(i.precondition,s))return void s.convertToUnknownDocument(o.version);let c=jf(i.fieldTransforms,s,o.transformResults),u=s.data;u.setAll(rm(i)),u.setAll(c),s.convertToFoundDocument(o.version,u).setHasCommittedMutations()}(r,e,t):function(i,s,o){s.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function oi(r,e,t,n){return r instanceof Ut?function(s,o,c,u){if(!Us(s.precondition,o))return c;let d=s.value.clone(),f=zf(s.fieldTransforms,u,o);return d.setAll(f),o.convertToFoundDocument(o.version,d).setHasLocalMutations(),null}(r,e,t,n):r instanceof He?function(s,o,c,u){if(!Us(s.precondition,o))return c;let d=zf(s.fieldTransforms,u,o),f=o.data;return f.setAll(rm(s)),f.setAll(d),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),c===null?null:c.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(m=>m.field))}(r,e,t,n):function(s,o,c){return Us(s.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c}(r,e,t)}function BI(r,e){let t=null;for(let n of r.fieldTransforms){let i=e.data.field(n.field),s=Xp(n.transform,i||null);s!=null&&(t===null&&(t=Ce.empty()),t.set(n.field,s))}return t||null}function qf(r,e){return r.type===e.type&&!!r.key.isEqual(e.key)&&!!r.precondition.isEqual(e.precondition)&&!!function(n,i){return n===void 0&&i===void 0||!(!n||!i)&&Jn(n,i,(s,o)=>FI(s,o))}(r.fieldTransforms,e.fieldTransforms)&&(r.type===0?r.value.isEqual(e.value):r.type!==1||r.data.isEqual(e.data)&&r.fieldMask.isEqual(e.fieldMask))}var Ut=class extends ir{constructor(e,t,n,i=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}},He=class extends ir{constructor(e,t,n,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}};function rm(r){let e=new Map;return r.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){let n=r.data.field(t);e.set(t,n)}}),e}function jf(r,e,t){let n=new Map;U(r.length===t.length);for(let i=0;i<t.length;i++){let s=r[i],o=s.transform,c=e.data.field(s.field);n.set(s.field,MI(o,c,t[i]))}return n}function zf(r,e,t){let n=new Map;for(let i of r){let s=i.transform,o=t.data.field(i.field);n.set(i.field,LI(s,o,e))}return n}var sr=class extends ir{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}},Ys=class extends ir{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}};var gi=class{constructor(e,t,n,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=i}applyToRemoteDocument(e,t){let n=t.mutationResults;for(let i=0;i<this.mutations.length;i++){let s=this.mutations[i];s.key.isEqual(e.key)&&UI(s,e,n[i])}}applyToLocalView(e,t){for(let n of this.baseMutations)n.key.isEqual(e.key)&&(t=oi(n,e,t,this.localWriteTime));for(let n of this.mutations)n.key.isEqual(e.key)&&(t=oi(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){let n=Jp();return this.mutations.forEach(i=>{let s=e.get(i.key),o=s.overlayedDocument,c=this.applyToLocalView(o,s.mutatedFields);c=t.has(i.key)?null:c;let u=nm(o,c);u!==null&&n.set(i.key,u),o.isValidDocument()||o.convertToNoDocument(q.min())}),n}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),$())}isEqual(e){return this.batchId===e.batchId&&Jn(this.mutations,e.mutations,(t,n)=>qf(t,n))&&Jn(this.baseMutations,e.baseMutations,(t,n)=>qf(t,n))}},au=class r{constructor(e,t,n,i){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=i}static from(e,t,n){U(e.mutations.length===n.length);let i=function(){return kI}(),s=e.mutations;for(let o=0;o<s.length;o++)i=i.insert(s[o].key,n[o].version);return new r(e,t,n,i)}};var _i=class{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}};var cu=class{constructor(e,t){this.count=e,this.unchangedNames=t}};var de,J;function qI(r){switch(r){default:return L();case P.CANCELLED:case P.UNKNOWN:case P.DEADLINE_EXCEEDED:case P.RESOURCE_EXHAUSTED:case P.INTERNAL:case P.UNAVAILABLE:case P.UNAUTHENTICATED:return!1;case P.INVALID_ARGUMENT:case P.NOT_FOUND:case P.ALREADY_EXISTS:case P.PERMISSION_DENIED:case P.FAILED_PRECONDITION:case P.ABORTED:case P.OUT_OF_RANGE:case P.UNIMPLEMENTED:case P.DATA_LOSS:return!0}}function im(r){if(r===void 0)return ce("GRPC error has no .code"),P.UNKNOWN;switch(r){case de.OK:return P.OK;case de.CANCELLED:return P.CANCELLED;case de.UNKNOWN:return P.UNKNOWN;case de.DEADLINE_EXCEEDED:return P.DEADLINE_EXCEEDED;case de.RESOURCE_EXHAUSTED:return P.RESOURCE_EXHAUSTED;case de.INTERNAL:return P.INTERNAL;case de.UNAVAILABLE:return P.UNAVAILABLE;case de.UNAUTHENTICATED:return P.UNAUTHENTICATED;case de.INVALID_ARGUMENT:return P.INVALID_ARGUMENT;case de.NOT_FOUND:return P.NOT_FOUND;case de.ALREADY_EXISTS:return P.ALREADY_EXISTS;case de.PERMISSION_DENIED:return P.PERMISSION_DENIED;case de.FAILED_PRECONDITION:return P.FAILED_PRECONDITION;case de.ABORTED:return P.ABORTED;case de.OUT_OF_RANGE:return P.OUT_OF_RANGE;case de.UNIMPLEMENTED:return P.UNIMPLEMENTED;case de.DATA_LOSS:return P.DATA_LOSS;default:return L()}}(J=de||(de={}))[J.OK=0]="OK",J[J.CANCELLED=1]="CANCELLED",J[J.UNKNOWN=2]="UNKNOWN",J[J.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",J[J.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",J[J.NOT_FOUND=5]="NOT_FOUND",J[J.ALREADY_EXISTS=6]="ALREADY_EXISTS",J[J.PERMISSION_DENIED=7]="PERMISSION_DENIED",J[J.UNAUTHENTICATED=16]="UNAUTHENTICATED",J[J.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",J[J.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",J[J.ABORTED=10]="ABORTED",J[J.OUT_OF_RANGE=11]="OUT_OF_RANGE",J[J.UNIMPLEMENTED=12]="UNIMPLEMENTED",J[J.INTERNAL=13]="INTERNAL",J[J.UNAVAILABLE=14]="UNAVAILABLE",J[J.DATA_LOSS=15]="DATA_LOSS";var Gf=null;function jI(){return new TextEncoder}var zI=new Rt([4294967295,4294967295],0);function Kf(r){let e=jI().encode(r),t=new Ec;return t.update(e),new Uint8Array(t.digest())}function $f(r){let e=new DataView(r.buffer),t=e.getUint32(0,!0),n=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new Rt([t,n],0),new Rt([i,s],0)]}var uu=class r{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new ln(`Invalid padding: ${t}`);if(n<0)throw new ln(`Invalid hash count: ${n}`);if(e.length>0&&this.hashCount===0)throw new ln(`Invalid hash count: ${n}`);if(e.length===0&&t!==0)throw new ln(`Invalid padding when bitmap length is 0: ${t}`);this.Ie=8*e.length-t,this.Te=Rt.fromNumber(this.Ie)}Ee(e,t,n){let i=e.add(t.multiply(Rt.fromNumber(n)));return i.compare(zI)===1&&(i=new Rt([i.getBits(0),i.getBits(1)],0)),i.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;let t=Kf(e),[n,i]=$f(t);for(let s=0;s<this.hashCount;s++){let o=this.Ee(n,i,s);if(!this.de(o))return!1}return!0}static create(e,t,n){let i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),o=new r(s,i,t);return n.forEach(c=>o.insert(c)),o}insert(e){if(this.Ie===0)return;let t=Kf(e),[n,i]=$f(t);for(let s=0;s<this.hashCount;s++){let o=this.Ee(n,i,s);this.Ae(o)}}Ae(e){let t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}},ln=class extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}};var yi=class r{constructor(e,t,n,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,n){let i=new Map;return i.set(e,vi.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new r(q.min(),i,new ie(K),Le(),$())}},vi=class r{constructor(e,t,n,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new r(n,t,$(),$(),$())}};var Hn=class{constructor(e,t,n,i){this.Re=e,this.removedTargetIds=t,this.key=n,this.Ve=i}},Xs=class{constructor(e,t){this.targetId=e,this.me=t}},Zs=class{constructor(e,t,n=pe.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=i}},eo=class{constructor(){this.fe=0,this.ge=Hf(),this.pe=pe.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=$(),t=$(),n=$();return this.ge.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:n=n.add(i);break;default:L()}}),new vi(this.pe,this.ye,e,t,n)}Ce(){this.we=!1,this.ge=Hf()}Fe(e,t){this.we=!0,this.ge=this.ge.insert(e,t)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,U(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}},lu=class{constructor(e){this.Le=e,this.Be=new Map,this.ke=Le(),this.qe=Wf(),this.Qe=new ie(K)}Ke(e){for(let t of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(t,e.Ve):this.Ue(t,e.key,e.Ve);for(let t of e.removedTargetIds)this.Ue(t,e.key,e.Ve)}We(e){this.forEachTarget(e,t=>{let n=this.Ge(t);switch(e.state){case 0:this.ze(t)&&n.De(e.resumeToken);break;case 1:n.Oe(),n.Se||n.Ce(),n.De(e.resumeToken);break;case 2:n.Oe(),n.Se||this.removeTarget(t);break;case 3:this.ze(t)&&(n.Ne(),n.De(e.resumeToken));break;case 4:this.ze(t)&&(this.je(t),n.De(e.resumeToken));break;default:L()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Be.forEach((n,i)=>{this.ze(i)&&t(i)})}He(e){let t=e.targetId,n=e.me.count,i=this.Je(t);if(i){let s=i.target;if(Qs(s))if(n===0){let o=new V(s.path);this.Ue(t,o,Ie.newNoDocument(o,q.min()))}else U(n===1);else{let o=this.Ye(t);if(o!==n){let c=this.Ze(e),u=c?this.Xe(c,e,o):1;if(u!==0){this.je(t);let d=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(t,d)}Gf==null||Gf.et(function(f,m,v,S,D){var k,N,z,j,B,W;let Y={localCacheCount:f,existenceFilterCount:m.count,databaseId:v.database,projectId:v.projectId},G=m.unchangedNames;return G&&(Y.bloomFilter={applied:D===0,hashCount:(k=G==null?void 0:G.hashCount)!==null&&k!==void 0?k:0,bitmapLength:(j=(z=(N=G==null?void 0:G.bits)===null||N===void 0?void 0:N.bitmap)===null||z===void 0?void 0:z.length)!==null&&j!==void 0?j:0,padding:(W=(B=G==null?void 0:G.bits)===null||B===void 0?void 0:B.padding)!==null&&W!==void 0?W:0,mightContain:I=>{var g;return(g=S==null?void 0:S.mightContain(I))!==null&&g!==void 0&&g}}),Y}(o,e.me,this.Le.tt(),c,u))}}}}Ze(e){let t=e.me.unchangedNames;if(!t||!t.bits)return null;let{bits:{bitmap:n="",padding:i=0},hashCount:s=0}=t,o,c;try{o=xt(n).toUint8Array()}catch(u){if(u instanceof $s)return ui("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new uu(o,i,s)}catch(u){return ui(u instanceof ln?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.Ie===0?null:c}Xe(e,t,n){return t.me.count===n-this.nt(e,t.targetId)?0:2}nt(e,t){let n=this.Le.getRemoteKeysForTarget(t),i=0;return n.forEach(s=>{let o=this.Le.tt(),c=`projects/${o.projectId}/databases/${o.database}/documents/${s.path.canonicalString()}`;e.mightContain(c)||(this.Ue(t,s,null),i++)}),i}rt(e){let t=new Map;this.Be.forEach((s,o)=>{let c=this.Je(o);if(c){if(s.current&&Qs(c.target)){let u=new V(c.target.path);this.ke.get(u)!==null||this.it(o,u)||this.Ue(o,u,Ie.newNoDocument(u,e))}s.be&&(t.set(o,s.ve()),s.Ce())}});let n=$();this.qe.forEach((s,o)=>{let c=!0;o.forEachWhile(u=>{let d=this.Je(u);return!d||d.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(n=n.add(s))}),this.ke.forEach((s,o)=>o.setReadTime(e));let i=new yi(e,t,this.Qe,this.ke,n);return this.ke=Le(),this.qe=Wf(),this.Qe=new ie(K),i}$e(e,t){if(!this.ze(e))return;let n=this.it(e,t.key)?2:0;this.Ge(e).Fe(t.key,n),this.ke=this.ke.insert(t.key,t),this.qe=this.qe.insert(t.key,this.st(t.key).add(e))}Ue(e,t,n){if(!this.ze(e))return;let i=this.Ge(e);this.it(e,t)?i.Fe(t,1):i.Me(t),this.qe=this.qe.insert(t,this.st(t).delete(e)),n&&(this.ke=this.ke.insert(t,n))}removeTarget(e){this.Be.delete(e)}Ye(e){let t=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let t=this.Be.get(e);return t||(t=new eo,this.Be.set(e,t)),t}st(e){let t=this.qe.get(e);return t||(t=new ne(K),this.qe=this.qe.insert(e,t)),t}ze(e){let t=this.Je(e)!==null;return t||C("WatchChangeAggregator","Detected inactive target",e),t}Je(e){let t=this.Be.get(e);return t&&t.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new eo),this.Le.getRemoteKeysForTarget(e).forEach(t=>{this.Ue(e,t,null)})}it(e,t){return this.Le.getRemoteKeysForTarget(e).has(t)}};function Wf(){return new ie(V.comparator)}function Hf(){return new ie(V.comparator)}var GI={asc:"ASCENDING",desc:"DESCENDING"},KI={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},$I={and:"AND",or:"OR"},hu=class{constructor(e,t){this.databaseId=e,this.useProto3Json=t}};function du(r,e){return r.useProto3Json||Bo(e)?e:{value:e}}function or(r,e){return r.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function sm(r,e){return r.useProto3Json?e.toBase64():e.toUint8Array()}function WI(r,e){return or(r,e.toTimestamp())}function Ne(r){return U(!!r),q.fromTimestamp(function(t){let n=mt(t);return new ue(n.seconds,n.nanos)}(r))}function Ll(r,e){return fu(r,e).canonicalString()}function fu(r,e){let t=function(i){return new te(["projects",i.projectId,"databases",i.database])}(r).child("documents");return e===void 0?t:t.child(e)}function om(r){let e=te.fromString(r);return U(mm(e)),e}function to(r,e){return Ll(r.databaseId,e.path)}function fn(r,e){let t=om(e);if(t.get(1)!==r.databaseId.projectId)throw new x(P.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+r.databaseId.projectId);if(t.get(3)!==r.databaseId.database)throw new x(P.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+r.databaseId.database);return new V(um(t))}function am(r,e){return Ll(r.databaseId,e)}function cm(r){let e=om(r);return e.length===4?te.emptyPath():um(e)}function pu(r){return new te(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function um(r){return U(r.length>4&&r.get(4)==="documents"),r.popFirst(5)}function Qf(r,e,t){return{name:to(r,e),fields:t.value.mapValue.fields}}function HI(r,e,t){let n=fn(r,e.name),i=Ne(e.updateTime),s=e.createTime?Ne(e.createTime):q.min(),o=new Ce({mapValue:{fields:e.fields}}),c=Ie.newFoundDocument(n,i,s,o);return t&&c.setHasCommittedMutations(),t?c.setHasCommittedMutations():c}function QI(r,e){let t;if("targetChange"in e){e.targetChange;let n=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:L()}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(d,f){return d.useProto3Json?(U(f===void 0||typeof f=="string"),pe.fromBase64String(f||"")):(U(f===void 0||f instanceof Buffer||f instanceof Uint8Array),pe.fromUint8Array(f||new Uint8Array))}(r,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&function(d){let f=d.code===void 0?P.UNKNOWN:im(d.code);return new x(f,d.message||"")}(o);t=new Zs(n,i,s,c||null)}else if("documentChange"in e){e.documentChange;let n=e.documentChange;n.document,n.document.name,n.document.updateTime;let i=fn(r,n.document.name),s=Ne(n.document.updateTime),o=n.document.createTime?Ne(n.document.createTime):q.min(),c=new Ce({mapValue:{fields:n.document.fields}}),u=Ie.newFoundDocument(i,s,o,c),d=n.targetIds||[],f=n.removedTargetIds||[];t=new Hn(d,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;let n=e.documentDelete;n.document;let i=fn(r,n.document),s=n.readTime?Ne(n.readTime):q.min(),o=Ie.newNoDocument(i,s),c=n.removedTargetIds||[];t=new Hn([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;let n=e.documentRemove;n.document;let i=fn(r,n.document),s=n.removedTargetIds||[];t=new Hn([],s,i,null)}else{if(!("filter"in e))return L();{e.filter;let n=e.filter;n.targetId;let{count:i=0,unchangedNames:s}=n,o=new cu(i,s),c=n.targetId;t=new Xs(c,o)}}return t}function no(r,e){let t;if(e instanceof Ut)t={update:Qf(r,e.key,e.value)};else if(e instanceof sr)t={delete:to(r,e.key)};else if(e instanceof He)t={update:Qf(r,e.key,e.data),updateMask:tw(e.fieldMask)};else{if(!(e instanceof Ys))return L();t={verify:to(r,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(n=>function(s,o){let c=o.transform;if(c instanceof _n)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof Mt)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof Ft)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof yn)return{fieldPath:o.field.canonicalString(),increment:c.Pe};throw L()}(0,n))),e.precondition.isNone||(t.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:WI(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:L()}(r,e.precondition)),t}function mu(r,e){let t=e.currentDocument?function(s){return s.updateTime!==void 0?Me.updateTime(Ne(s.updateTime)):s.exists!==void 0?Me.exists(s.exists):Me.none()}(e.currentDocument):Me.none(),n=e.updateTransforms?e.updateTransforms.map(i=>function(o,c){let u=null;if("setToServerValue"in c)U(c.setToServerValue==="REQUEST_TIME"),u=new _n;else if("appendMissingElements"in c){let f=c.appendMissingElements.values||[];u=new Mt(f)}else if("removeAllFromArray"in c){let f=c.removeAllFromArray.values||[];u=new Ft(f)}else"increment"in c?u=new yn(o,c.increment):L();let d=me.fromServerFormat(c.fieldPath);return new su(d,u)}(r,i)):[];if(e.update){e.update.name;let i=fn(r,e.update.name),s=new Ce({mapValue:{fields:e.update.fields}});if(e.updateMask){let o=function(u){let d=u.fieldPaths||[];return new Ve(d.map(f=>me.fromServerFormat(f)))}(e.updateMask);return new He(i,s,o,t,n)}return new Ut(i,s,t,n)}if(e.delete){let i=fn(r,e.delete);return new sr(i,t)}if(e.verify){let i=fn(r,e.verify);return new Ys(i,t)}return L()}function JI(r,e){return r&&r.length>0?(U(e!==void 0),r.map(t=>function(i,s){let o=i.updateTime?Ne(i.updateTime):Ne(s);return o.isEqual(q.min())&&(o=Ne(s)),new ou(o,i.transformResults||[])}(t,e))):[]}function lm(r,e){return{documents:[am(r,e.path)]}}function hm(r,e){let t={structuredQuery:{}},n=e.path,i;e.collectionGroup!==null?(i=n,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=n.popLast(),t.structuredQuery.from=[{collectionId:n.lastSegment()}]),t.parent=am(r,i);let s=function(d){if(d.length!==0)return pm(Z.create(d,"and"))}(e.filters);s&&(t.structuredQuery.where=s);let o=function(d){if(d.length!==0)return d.map(f=>function(v){return{field:zn(v.field),direction:XI(v.dir)}}(f))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);let c=du(r,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{_t:t,parent:i}}function dm(r){let e=cm(r.parent),t=r.structuredQuery,n=t.from?t.from.length:0,i=null;if(n>0){U(n===1);let f=t.from[0];f.allDescendants?i=f.collectionId:e=e.child(f.collectionId)}let s=[];t.where&&(s=function(m){let v=fm(m);return v instanceof Z&&Ol(v)?v.getFilters():[v]}(t.where));let o=[];t.orderBy&&(o=function(m){return m.map(v=>function(D){return new er(Gn(D.field),function(N){switch(N){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(D.direction))}(v))}(t.orderBy));let c=null;t.limit&&(c=function(m){let v;return v=typeof m=="object"?m.value:m,Bo(v)?null:v}(t.limit));let u=null;t.startAt&&(u=function(m){let v=!!m.before,S=m.values||[];return new Lt(S,v)}(t.startAt));let d=null;return t.endAt&&(d=function(m){let v=!m.before,S=m.values||[];return new Lt(S,v)}(t.endAt)),Gp(e,i,o,s,c,"F",u,d)}function YI(r,e){let t=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return L()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function fm(r){return r.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":let n=Gn(t.unaryFilter.field);return Q.create(n,"==",{doubleValue:NaN});case"IS_NULL":let i=Gn(t.unaryFilter.field);return Q.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":let s=Gn(t.unaryFilter.field);return Q.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":let o=Gn(t.unaryFilter.field);return Q.create(o,"!=",{nullValue:"NULL_VALUE"});default:return L()}}(r):r.fieldFilter!==void 0?function(t){return Q.create(Gn(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return L()}}(t.fieldFilter.op),t.fieldFilter.value)}(r):r.compositeFilter!==void 0?function(t){return Z.create(t.compositeFilter.filters.map(n=>fm(n)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return L()}}(t.compositeFilter.op))}(r):L()}function XI(r){return GI[r]}function ZI(r){return KI[r]}function ew(r){return $I[r]}function zn(r){return{fieldPath:r.canonicalString()}}function Gn(r){return me.fromServerFormat(r.fieldPath)}function pm(r){return r instanceof Q?function(t){if(t.op==="=="){if(kf(t.value))return{unaryFilter:{field:zn(t.field),op:"IS_NAN"}};if(Nf(t.value))return{unaryFilter:{field:zn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(kf(t.value))return{unaryFilter:{field:zn(t.field),op:"IS_NOT_NAN"}};if(Nf(t.value))return{unaryFilter:{field:zn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:zn(t.field),op:ZI(t.op),value:t.value}}}(r):r instanceof Z?function(t){let n=t.getFilters().map(i=>pm(i));return n.length===1?n[0]:{compositeFilter:{op:ew(t.op),filters:n}}}(r):L()}function tw(r){let e=[];return r.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function mm(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}var ar=class r{constructor(e,t,n,i,s=q.min(),o=q.min(),c=pe.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new r(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new r(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new r(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new r(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}};var ro=class{constructor(e){this.ct=e}};function nw(r,e){let t;if(e.document)t=HI(r.ct,e.document,!!e.hasCommittedMutations);else if(e.noDocument){let n=V.fromSegments(e.noDocument.path),i=In(e.noDocument.readTime);t=Ie.newNoDocument(n,i),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return L();{let n=V.fromSegments(e.unknownDocument.path),i=In(e.unknownDocument.version);t=Ie.newUnknownDocument(n,i)}}return e.readTime&&t.setReadTime(function(i){let s=new ue(i[0],i[1]);return q.fromTimestamp(s)}(e.readTime)),t}function Jf(r,e){let t=e.key,n={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:io(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())n.document=function(s,o){return{name:to(s,o.key),fields:o.data.value.mapValue.fields,updateTime:or(s,o.version.toTimestamp()),createTime:or(s,o.createTime.toTimestamp())}}(r.ct,e);else if(e.isNoDocument())n.noDocument={path:t.path.toArray(),readTime:vn(e.version)};else{if(!e.isUnknownDocument())return L();n.unknownDocument={path:t.path.toArray(),version:vn(e.version)}}return n}function io(r){let e=r.toTimestamp();return[e.seconds,e.nanoseconds]}function vn(r){let e=r.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function In(r){let e=new ue(r.seconds,r.nanoseconds);return q.fromTimestamp(e)}function an(r,e){let t=(e.baseMutations||[]).map(s=>mu(r.ct,s));for(let s=0;s<e.mutations.length-1;++s){let o=e.mutations[s];if(s+1<e.mutations.length&&e.mutations[s+1].transform!==void 0){let c=e.mutations[s+1];o.updateTransforms=c.transform.fieldTransforms,e.mutations.splice(s+1,1),++s}}let n=e.mutations.map(s=>mu(r.ct,s)),i=ue.fromMillis(e.localWriteTimeMs);return new gi(e.batchId,i,t,n)}function ni(r){let e=In(r.readTime),t=r.lastLimboFreeSnapshotVersion!==void 0?In(r.lastLimboFreeSnapshotVersion):q.min(),n;return n=function(s){return s.documents!==void 0}(r.query)?function(s){return U(s.documents.length===1),Fe(Ci(cm(s.documents[0])))}(r.query):function(s){return Fe(dm(s))}(r.query),new ar(n,r.targetId,"TargetPurposeListen",r.lastListenSequenceNumber,e,t,pe.fromBase64String(r.resumeToken))}function gm(r,e){let t=vn(e.snapshotVersion),n=vn(e.lastLimboFreeSnapshotVersion),i;i=Qs(e.target)?lm(r.ct,e.target):hm(r.ct,e.target)._t;let s=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:gn(e.target),readTime:t,resumeToken:s,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:n,query:i}}function _m(r){let e=dm({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?iu(e,e.limit,"L"):e}function Pc(r,e){return new _i(e.largestBatchId,mu(r.ct,e.overlayMutation))}function Yf(r,e){let t=e.path.lastSegment();return[r,De(e.path.popLast()),t]}function Xf(r,e,t,n){return{indexId:r,uid:e,sequenceNumber:t,readTime:vn(n.readTime),documentKey:De(n.documentKey.path),largestBatchId:n.largestBatchId}}var gu=class{getBundleMetadata(e,t){return Zf(e).get(t).next(n=>{if(n)return function(s){return{id:s.bundleId,createTime:In(s.createTime),version:s.version}}(n)})}saveBundleMetadata(e,t){return Zf(e).put(function(i){return{bundleId:i.id,createTime:vn(Ne(i.createTime)),version:i.version}}(t))}getNamedQuery(e,t){return ep(e).get(t).next(n=>{if(n)return function(s){return{name:s.name,query:_m(s.bundledQuery),readTime:In(s.readTime)}}(n)})}saveNamedQuery(e,t){return ep(e).put(function(i){return{name:i.name,readTime:vn(Ne(i.readTime)),bundledQuery:i.bundledQuery}}(t))}};function Zf(r){return ge(r,"bundles")}function ep(r){return ge(r,"namedQueries")}var so=class r{constructor(e,t){this.serializer=e,this.userId=t}static lt(e,t){let n=t.uid||"";return new r(e,n)}getOverlay(e,t){return Yr(e).get(Yf(this.userId,t)).next(n=>n?Pc(this.serializer,n):null)}getOverlays(e,t){let n=Ze();return b.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&n.set(i,s)})).next(()=>n)}saveOverlays(e,t,n){let i=[];return n.forEach((s,o)=>{let c=new _i(t,o);i.push(this.ht(e,c))}),b.waitFor(i)}removeOverlaysForBatchId(e,t,n){let i=new Set;t.forEach(o=>i.add(De(o.getCollectionPath())));let s=[];return i.forEach(o=>{let c=IDBKeyRange.bound([this.userId,o,n],[this.userId,o,n+1],!1,!0);s.push(Yr(e).j("collectionPathOverlayIndex",c))}),b.waitFor(s)}getOverlaysForCollection(e,t,n){let i=Ze(),s=De(t),o=IDBKeyRange.bound([this.userId,s,n],[this.userId,s,Number.POSITIVE_INFINITY],!0);return Yr(e).U("collectionPathOverlayIndex",o).next(c=>{for(let u of c){let d=Pc(this.serializer,u);i.set(d.getKey(),d)}return i})}getOverlaysForCollectionGroup(e,t,n,i){let s=Ze(),o,c=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,Number.POSITIVE_INFINITY],!0);return Yr(e).J({index:"collectionGroupOverlayIndex",range:c},(u,d,f)=>{let m=Pc(this.serializer,d);s.size()<i||m.largestBatchId===o?(s.set(m.getKey(),m),o=m.largestBatchId):f.done()}).next(()=>s)}ht(e,t){return Yr(e).put(function(i,s,o){let[c,u,d]=Yf(s,o.mutation.key);return{userId:s,collectionPath:u,documentId:d,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:no(i.ct,o.mutation)}}(this.serializer,this.userId,t))}};function Yr(r){return ge(r,"documentOverlays")}var _u=class{Pt(e){return ge(e,"globals")}getSessionToken(e){return this.Pt(e).get("sessionToken").next(t=>{let n=t==null?void 0:t.value;return n?pe.fromUint8Array(n):pe.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.Pt(e).put({name:"sessionToken",value:t.toUint8Array()})}};var pt=class{constructor(){}It(e,t){this.Tt(e,t),t.Et()}Tt(e,t){if("nullValue"in e)this.dt(t,5);else if("booleanValue"in e)this.dt(t,10),t.At(e.booleanValue?1:0);else if("integerValue"in e)this.dt(t,15),t.At(se(e.integerValue));else if("doubleValue"in e){let n=se(e.doubleValue);isNaN(n)?this.dt(t,13):(this.dt(t,15),hi(n)?t.At(0):t.At(n))}else if("timestampValue"in e){let n=e.timestampValue;this.dt(t,20),typeof n=="string"&&(n=mt(n)),t.Rt(`${n.seconds||""}`),t.At(n.nanos||0)}else if("stringValue"in e)this.Vt(e.stringValue,t),this.ft(t);else if("bytesValue"in e)this.dt(t,30),t.gt(xt(e.bytesValue)),this.ft(t);else if("referenceValue"in e)this.yt(e.referenceValue,t);else if("geoPointValue"in e){let n=e.geoPointValue;this.dt(t,45),t.At(n.latitude||0),t.At(n.longitude||0)}else"mapValue"in e?Lp(e)?this.dt(t,Number.MAX_SAFE_INTEGER):qo(e)?this.wt(e.mapValue,t):(this.St(e.mapValue,t),this.ft(t)):"arrayValue"in e?(this.bt(e.arrayValue,t),this.ft(t)):L()}Vt(e,t){this.dt(t,25),this.Dt(e,t)}Dt(e,t){t.Rt(e)}St(e,t){let n=e.fields||{};this.dt(t,55);for(let i of Object.keys(n))this.Vt(i,t),this.Tt(n[i],t)}wt(e,t){var n,i;let s=e.fields||{};this.dt(t,53);let o="value",c=((i=(n=s[o].arrayValue)===null||n===void 0?void 0:n.values)===null||i===void 0?void 0:i.length)||0;this.dt(t,15),t.At(se(c)),this.Vt(o,t),this.Tt(s[o],t)}bt(e,t){let n=e.values||[];this.dt(t,50);for(let i of n)this.Tt(i,t)}yt(e,t){this.dt(t,37),V.fromName(e).path.forEach(n=>{this.dt(t,60),this.Dt(n,t)})}dt(e,t){e.At(t)}ft(e){e.At(2)}};pt.vt=new pt;function rw(r){if(r===0)return 8;let e=0;return!(r>>4)&&(e+=4,r<<=4),!(r>>6)&&(e+=2,r<<=2),!(r>>7)&&(e+=1),e}function tp(r){let e=64-function(n){let i=0;for(let s=0;s<8;++s){let o=rw(255&n[s]);if(i+=o,o!==8)break}return i}(r);return Math.ceil(e/8)}var yu=class{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Ct(e){let t=e[Symbol.iterator](),n=t.next();for(;!n.done;)this.Ft(n.value),n=t.next();this.Mt()}xt(e){let t=e[Symbol.iterator](),n=t.next();for(;!n.done;)this.Ot(n.value),n=t.next();this.Nt()}Lt(e){for(let t of e){let n=t.charCodeAt(0);if(n<128)this.Ft(n);else if(n<2048)this.Ft(960|n>>>6),this.Ft(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Ft(480|n>>>12),this.Ft(128|63&n>>>6),this.Ft(128|63&n);else{let i=t.codePointAt(0);this.Ft(240|i>>>18),this.Ft(128|63&i>>>12),this.Ft(128|63&i>>>6),this.Ft(128|63&i)}}this.Mt()}Bt(e){for(let t of e){let n=t.charCodeAt(0);if(n<128)this.Ot(n);else if(n<2048)this.Ot(960|n>>>6),this.Ot(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Ot(480|n>>>12),this.Ot(128|63&n>>>6),this.Ot(128|63&n);else{let i=t.codePointAt(0);this.Ot(240|i>>>18),this.Ot(128|63&i>>>12),this.Ot(128|63&i>>>6),this.Ot(128|63&i)}}this.Nt()}kt(e){let t=this.qt(e),n=tp(t);this.Qt(1+n),this.buffer[this.position++]=255&n;for(let i=t.length-n;i<t.length;++i)this.buffer[this.position++]=255&t[i]}Kt(e){let t=this.qt(e),n=tp(t);this.Qt(1+n),this.buffer[this.position++]=~(255&n);for(let i=t.length-n;i<t.length;++i)this.buffer[this.position++]=~(255&t[i])}$t(){this.Ut(255),this.Ut(255)}Wt(){this.Gt(255),this.Gt(255)}reset(){this.position=0}seed(e){this.Qt(e.length),this.buffer.set(e,this.position),this.position+=e.length}zt(){return this.buffer.slice(0,this.position)}qt(e){let t=function(s){let o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,s,!1),new Uint8Array(o.buffer)}(e),n=(128&t[0])!=0;t[0]^=n?255:128;for(let i=1;i<t.length;++i)t[i]^=n?255:0;return t}Ft(e){let t=255&e;t===0?(this.Ut(0),this.Ut(255)):t===255?(this.Ut(255),this.Ut(0)):this.Ut(t)}Ot(e){let t=255&e;t===0?(this.Gt(0),this.Gt(255)):t===255?(this.Gt(255),this.Gt(0)):this.Gt(e)}Mt(){this.Ut(0),this.Ut(1)}Nt(){this.Gt(0),this.Gt(1)}Ut(e){this.Qt(1),this.buffer[this.position++]=e}Gt(e){this.Qt(1),this.buffer[this.position++]=~e}Qt(e){let t=e+this.position;if(t<=this.buffer.length)return;let n=2*this.buffer.length;n<t&&(n=t);let i=new Uint8Array(n);i.set(this.buffer),this.buffer=i}},vu=class{constructor(e){this.jt=e}gt(e){this.jt.Ct(e)}Rt(e){this.jt.Lt(e)}At(e){this.jt.kt(e)}Et(){this.jt.$t()}},Iu=class{constructor(e){this.jt=e}gt(e){this.jt.xt(e)}Rt(e){this.jt.Bt(e)}At(e){this.jt.Kt(e)}Et(){this.jt.Wt()}},cn=class{constructor(){this.jt=new yu,this.Ht=new vu(this.jt),this.Jt=new Iu(this.jt)}seed(e){this.jt.seed(e)}Yt(e){return e===0?this.Ht:this.Jt}zt(){return this.jt.zt()}reset(){this.jt.reset()}};var un=class r{constructor(e,t,n,i){this.indexId=e,this.documentKey=t,this.arrayValue=n,this.directionalValue=i}Zt(){let e=this.directionalValue.length,t=e===0||this.directionalValue[e-1]===255?e+1:e,n=new Uint8Array(t);return n.set(this.directionalValue,0),t!==e?n.set([0],this.directionalValue.length):++n[n.length-1],new r(this.indexId,this.documentKey,this.arrayValue,n)}};function Pt(r,e){let t=r.indexId-e.indexId;return t!==0?t:(t=np(r.arrayValue,e.arrayValue),t!==0?t:(t=np(r.directionalValue,e.directionalValue),t!==0?t:V.comparator(r.documentKey,e.documentKey)))}function np(r,e){for(let t=0;t<r.length&&t<e.length;++t){let n=r[t]-e[t];if(n!==0)return n}return r.length-e.length}var oo=class{constructor(e){this.Xt=new ne((t,n)=>me.comparator(t.field,n.field)),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.en=e.orderBy,this.tn=[];for(let t of e.filters){let n=t;n.isInequality()?this.Xt=this.Xt.add(n):this.tn.push(n)}}get nn(){return this.Xt.size>1}rn(e){if(U(e.collectionGroup===this.collectionId),this.nn)return!1;let t=Bc(e);if(t!==void 0&&!this.sn(t))return!1;let n=sn(e),i=new Set,s=0,o=0;for(;s<n.length&&this.sn(n[s]);++s)i=i.add(n[s].fieldPath.canonicalString());if(s===n.length)return!0;if(this.Xt.size>0){let c=this.Xt.getIterator().getNext();if(!i.has(c.field.canonicalString())){let u=n[s];if(!this.on(c,u)||!this._n(this.en[o++],u))return!1}++s}for(;s<n.length;++s){let c=n[s];if(o>=this.en.length||!this._n(this.en[o++],c))return!1}return!0}an(){if(this.nn)return null;let e=new ne(me.comparator),t=[];for(let n of this.tn)if(!n.field.isKeyField())if(n.op==="array-contains"||n.op==="array-contains-any")t.push(new Wn(n.field,2));else{if(e.has(n.field))continue;e=e.add(n.field),t.push(new Wn(n.field,0))}for(let n of this.en)n.field.isKeyField()||e.has(n.field)||(e=e.add(n.field),t.push(new Wn(n.field,n.dir==="asc"?0:1)));return new Yn(Yn.UNKNOWN_ID,this.collectionId,t,li.empty())}sn(e){for(let t of this.tn)if(this.on(t,e))return!0;return!1}on(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;let n=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===n}_n(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}};function ym(r){var e,t;if(U(r instanceof Q||r instanceof Z),r instanceof Q){if(r instanceof Hs){let i=((t=(e=r.value.arrayValue)===null||e===void 0?void 0:e.values)===null||t===void 0?void 0:t.map(s=>Q.create(r.field,"==",s)))||[];return Z.create(i,"or")}return r}let n=r.filters.map(i=>ym(i));return Z.create(n,r.op)}function iw(r){if(r.getFilters().length===0)return[];let e=Tu(ym(r));return U(vm(e)),wu(e)||Eu(e)?[e]:e.getFilters()}function wu(r){return r instanceof Q}function Eu(r){return r instanceof Z&&Ol(r)}function vm(r){return wu(r)||Eu(r)||function(t){if(t instanceof Z&&Hc(t)){for(let n of t.getFilters())if(!wu(n)&&!Eu(n))return!1;return!0}return!1}(r)}function Tu(r){if(U(r instanceof Q||r instanceof Z),r instanceof Q)return r;if(r.filters.length===1)return Tu(r.filters[0]);let e=r.filters.map(n=>Tu(n)),t=Z.create(e,r.op);return t=ao(t),vm(t)?t:(U(t instanceof Z),U(tr(t)),U(t.filters.length>1),t.filters.reduce((n,i)=>Ml(n,i)))}function Ml(r,e){let t;return U(r instanceof Q||r instanceof Z),U(e instanceof Q||e instanceof Z),t=r instanceof Q?e instanceof Q?function(i,s){return Z.create([i,s],"and")}(r,e):rp(r,e):e instanceof Q?rp(e,r):function(i,s){if(U(i.filters.length>0&&s.filters.length>0),tr(i)&&tr(s))return qp(i,s.getFilters());let o=Hc(i)?i:s,c=Hc(i)?s:i,u=o.filters.map(d=>Ml(d,c));return Z.create(u,"or")}(r,e),ao(t)}function rp(r,e){if(tr(e))return qp(e,r.getFilters());{let t=e.filters.map(n=>Ml(r,n));return Z.create(t,"or")}}function ao(r){if(U(r instanceof Q||r instanceof Z),r instanceof Q)return r;let e=r.getFilters();if(e.length===1)return ao(e[0]);if(Up(r))return r;let t=e.map(i=>ao(i)),n=[];return t.forEach(i=>{i instanceof Q?n.push(i):i instanceof Z&&(i.op===r.op?n.push(...i.filters):n.push(i))}),n.length===1?n[0]:Z.create(n,r.op)}var Au=class{constructor(){this.un=new Ii}addToCollectionParentIndex(e,t){return this.un.add(t),b.resolve()}getCollectionParents(e,t){return b.resolve(this.un.getEntries(t))}addFieldIndex(e,t){return b.resolve()}deleteFieldIndex(e,t){return b.resolve()}deleteAllFieldIndexes(e){return b.resolve()}createTargetIndexes(e,t){return b.resolve()}getDocumentsMatchingTarget(e,t){return b.resolve(null)}getIndexType(e,t){return b.resolve(0)}getFieldIndexes(e,t){return b.resolve([])}getNextCollectionGroupToUpdate(e){return b.resolve(null)}getMinOffset(e,t){return b.resolve(Ge.min())}getMinOffsetFromCollectionGroup(e,t){return b.resolve(Ge.min())}updateCollectionGroup(e,t,n){return b.resolve()}updateIndexEntries(e,t){return b.resolve()}},Ii=class{constructor(){this.index={}}add(e){let t=e.lastSegment(),n=e.popLast(),i=this.index[t]||new ne(te.comparator),s=!i.has(n);return this.index[t]=i.add(n),s}has(e){let t=e.lastSegment(),n=e.popLast(),i=this.index[t];return i&&i.has(n)}getEntries(e){return(this.index[e]||new ne(te.comparator)).toArray()}};var ks=new Uint8Array(0),bu=class{constructor(e,t){this.databaseId=t,this.cn=new Ii,this.ln=new rt(n=>gn(n),(n,i)=>Pi(n,i)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.cn.has(t)){let n=t.lastSegment(),i=t.popLast();e.addOnCommittedListener(()=>{this.cn.add(t)});let s={collectionId:n,parent:De(i)};return ip(e).put(s)}return b.resolve()}getCollectionParents(e,t){let n=[],i=IDBKeyRange.bound([t,""],[bp(t),""],!1,!0);return ip(e).U(i).next(s=>{for(let o of s){if(o.collectionId!==t)break;n.push(Xe(o.parent))}return n})}addFieldIndex(e,t){let n=Xr(e),i=function(c){return{indexId:c.indexId,collectionGroup:c.collectionGroup,fields:c.fields.map(u=>[u.fieldPath.canonicalString(),u.kind])}}(t);delete i.indexId;let s=n.add(i);if(t.indexState){let o=Un(e);return s.next(c=>{o.put(Xf(c,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return s.next()}deleteFieldIndex(e,t){let n=Xr(e),i=Un(e),s=Fn(e);return n.delete(t.indexId).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){let t=Xr(e),n=Fn(e),i=Un(e);return t.j().next(()=>n.j()).next(()=>i.j())}createTargetIndexes(e,t){return b.forEach(this.hn(t),n=>this.getIndexType(e,n).next(i=>{if(i===0||i===1){let s=new oo(n).an();if(s!=null)return this.addFieldIndex(e,s)}}))}getDocumentsMatchingTarget(e,t){let n=Fn(e),i=!0,s=new Map;return b.forEach(this.hn(t),o=>this.Pn(e,o).next(c=>{i&&(i=!!c),s.set(o,c)})).next(()=>{if(i){let o=$(),c=[];return b.forEach(s,(u,d)=>{C("IndexedDbIndexManager",`Using index ${function(B){return`id=${B.indexId}|cg=${B.collectionGroup}|f=${B.fields.map(W=>`${W.fieldPath}:${W.kind}`).join(",")}`}(u)} to execute ${gn(t)}`);let f=function(B,W){let Y=Bc(W);if(Y===void 0)return null;for(let G of Js(B,Y.fieldPath))switch(G.op){case"array-contains-any":return G.value.arrayValue.values||[];case"array-contains":return[G.value]}return null}(d,u),m=function(B,W){let Y=new Map;for(let G of sn(W))for(let I of Js(B,G.fieldPath))switch(I.op){case"==":case"in":Y.set(G.fieldPath.canonicalString(),I.value);break;case"not-in":case"!=":return Y.set(G.fieldPath.canonicalString(),I.value),Array.from(Y.values())}return null}(d,u),v=function(B,W){let Y=[],G=!0;for(let I of sn(W)){let g=I.kind===0?Mf(B,I.fieldPath,B.startAt):Ff(B,I.fieldPath,B.startAt);Y.push(g.value),G&&(G=g.inclusive)}return new Lt(Y,G)}(d,u),S=function(B,W){let Y=[],G=!0;for(let I of sn(W)){let g=I.kind===0?Ff(B,I.fieldPath,B.endAt):Mf(B,I.fieldPath,B.endAt);Y.push(g.value),G&&(G=g.inclusive)}return new Lt(Y,G)}(d,u),D=this.In(u,d,v),k=this.In(u,d,S),N=this.Tn(u,d,m),z=this.En(u.indexId,f,D,v.inclusive,k,S.inclusive,N);return b.forEach(z,j=>n.G(j,t.limit).next(B=>{B.forEach(W=>{let Y=V.fromSegments(W.documentKey);o.has(Y)||(o=o.add(Y),c.push(Y))})}))}).next(()=>c)}return b.resolve(null)})}hn(e){let t=this.ln.get(e);return t||(e.filters.length===0?t=[e]:t=iw(Z.create(e.filters,"and")).map(n=>ru(e.path,e.collectionGroup,e.orderBy,n.getFilters(),e.limit,e.startAt,e.endAt)),this.ln.set(e,t),t)}En(e,t,n,i,s,o,c){let u=(t!=null?t.length:1)*Math.max(n.length,s.length),d=u/(t!=null?t.length:1),f=[];for(let m=0;m<u;++m){let v=t?this.dn(t[m/d]):ks,S=this.An(e,v,n[m%d],i),D=this.Rn(e,v,s[m%d],o),k=c.map(N=>this.An(e,v,N,!0));f.push(...this.createRange(S,D,k))}return f}An(e,t,n,i){let s=new un(e,V.empty(),t,n);return i?s:s.Zt()}Rn(e,t,n,i){let s=new un(e,V.empty(),t,n);return i?s.Zt():s}Pn(e,t){let n=new oo(t),i=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,i).next(s=>{let o=null;for(let c of s)n.rn(c)&&(!o||c.fields.length>o.fields.length)&&(o=c);return o})}getIndexType(e,t){let n=2,i=this.hn(t);return b.forEach(i,s=>this.Pn(e,s).next(o=>{o?n!==0&&o.fields.length<function(u){let d=new ne(me.comparator),f=!1;for(let m of u.filters)for(let v of m.getFlattenedFilters())v.field.isKeyField()||(v.op==="array-contains"||v.op==="array-contains-any"?f=!0:d=d.add(v.field));for(let m of u.orderBy)m.field.isKeyField()||(d=d.add(m.field));return d.size+(f?1:0)}(s)&&(n=1):n=0})).next(()=>function(o){return o.limit!==null}(t)&&i.length>1&&n===2?1:n)}Vn(e,t){let n=new cn;for(let i of sn(e)){let s=t.data.field(i.fieldPath);if(s==null)return null;let o=n.Yt(i.kind);pt.vt.It(s,o)}return n.zt()}dn(e){let t=new cn;return pt.vt.It(e,t.Yt(0)),t.zt()}mn(e,t){let n=new cn;return pt.vt.It(kl(this.databaseId,t),n.Yt(function(s){let o=sn(s);return o.length===0?0:o[o.length-1].kind}(e))),n.zt()}Tn(e,t,n){if(n===null)return[];let i=[];i.push(new cn);let s=0;for(let o of sn(e)){let c=n[s++];for(let u of i)if(this.fn(t,o.fieldPath)&&mi(c))i=this.gn(i,o,c);else{let d=u.Yt(o.kind);pt.vt.It(c,d)}}return this.pn(i)}In(e,t,n){return this.Tn(e,t,n.position)}pn(e){let t=[];for(let n=0;n<e.length;++n)t[n]=e[n].zt();return t}gn(e,t,n){let i=[...e],s=[];for(let o of n.arrayValue.values||[])for(let c of i){let u=new cn;u.seed(c.zt()),pt.vt.It(o,u.Yt(t.kind)),s.push(u)}return s}fn(e,t){return!!e.filters.find(n=>n instanceof Q&&n.field.isEqual(t)&&(n.op==="in"||n.op==="not-in"))}getFieldIndexes(e,t){let n=Xr(e),i=Un(e);return(t?n.U("collectionGroupIndex",IDBKeyRange.bound(t,t)):n.U()).next(s=>{let o=[];return b.forEach(s,c=>i.get([c.indexId,this.uid]).next(u=>{o.push(function(f,m){let v=m?new li(m.sequenceNumber,new Ge(In(m.readTime),new V(Xe(m.documentKey)),m.largestBatchId)):li.empty(),S=f.fields.map(([D,k])=>new Wn(me.fromServerFormat(D),k));return new Yn(f.indexId,f.collectionGroup,S,v)}(c,u))})).next(()=>o)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(t=>t.length===0?null:(t.sort((n,i)=>{let s=n.indexState.sequenceNumber-i.indexState.sequenceNumber;return s!==0?s:K(n.collectionGroup,i.collectionGroup)}),t[0].collectionGroup))}updateCollectionGroup(e,t,n){let i=Xr(e),s=Un(e);return this.yn(e).next(o=>i.U("collectionGroupIndex",IDBKeyRange.bound(t,t)).next(c=>b.forEach(c,u=>s.put(Xf(u.indexId,this.uid,o,n)))))}updateIndexEntries(e,t){let n=new Map;return b.forEach(t,(i,s)=>{let o=n.get(i.collectionGroup);return(o?b.resolve(o):this.getFieldIndexes(e,i.collectionGroup)).next(c=>(n.set(i.collectionGroup,c),b.forEach(c,u=>this.wn(e,i,u).next(d=>{let f=this.Sn(s,u);return d.isEqual(f)?b.resolve():this.bn(e,s,u,d,f)}))))})}Dn(e,t,n,i){return Fn(e).put({indexId:i.indexId,uid:this.uid,arrayValue:i.arrayValue,directionalValue:i.directionalValue,orderedDocumentKey:this.mn(n,t.key),documentKey:t.key.path.toArray()})}vn(e,t,n,i){return Fn(e).delete([i.indexId,this.uid,i.arrayValue,i.directionalValue,this.mn(n,t.key),t.key.path.toArray()])}wn(e,t,n){let i=Fn(e),s=new ne(Pt);return i.J({index:"documentKeyIndex",range:IDBKeyRange.only([n.indexId,this.uid,this.mn(n,t)])},(o,c)=>{s=s.add(new un(n.indexId,t,c.arrayValue,c.directionalValue))}).next(()=>s)}Sn(e,t){let n=new ne(Pt),i=this.Vn(t,e);if(i==null)return n;let s=Bc(t);if(s!=null){let o=e.data.field(s.fieldPath);if(mi(o))for(let c of o.arrayValue.values||[])n=n.add(new un(t.indexId,e.key,this.dn(c),i))}else n=n.add(new un(t.indexId,e.key,ks,i));return n}bn(e,t,n,i,s){C("IndexedDbIndexManager","Updating index entries for document '%s'",t.key);let o=[];return function(u,d,f,m,v){let S=u.getIterator(),D=d.getIterator(),k=Mn(S),N=Mn(D);for(;k||N;){let z=!1,j=!1;if(k&&N){let B=f(k,N);B<0?j=!0:B>0&&(z=!0)}else k!=null?j=!0:z=!0;z?(m(N),N=Mn(D)):j?(v(k),k=Mn(S)):(k=Mn(S),N=Mn(D))}}(i,s,Pt,c=>{o.push(this.Dn(e,t,n,c))},c=>{o.push(this.vn(e,t,n,c))}),b.waitFor(o)}yn(e){let t=1;return Un(e).J({index:"sequenceNumberIndex",reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(n,i,s)=>{s.done(),t=i.sequenceNumber+1}).next(()=>t)}createRange(e,t,n){n=n.sort((o,c)=>Pt(o,c)).filter((o,c,u)=>!c||Pt(o,u[c-1])!==0);let i=[];i.push(e);for(let o of n){let c=Pt(o,e),u=Pt(o,t);if(c===0)i[0]=e.Zt();else if(c>0&&u<0)i.push(o),i.push(o.Zt());else if(u>0)break}i.push(t);let s=[];for(let o=0;o<i.length;o+=2){if(this.Cn(i[o],i[o+1]))return[];let c=[i[o].indexId,this.uid,i[o].arrayValue,i[o].directionalValue,ks,[]],u=[i[o+1].indexId,this.uid,i[o+1].arrayValue,i[o+1].directionalValue,ks,[]];s.push(IDBKeyRange.bound(c,u))}return s}Cn(e,t){return Pt(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(sp)}getMinOffset(e,t){return b.mapArray(this.hn(t),n=>this.Pn(e,n).next(i=>i||L())).next(sp)}};function ip(r){return ge(r,"collectionParents")}function Fn(r){return ge(r,"indexEntries")}function Xr(r){return ge(r,"indexConfiguration")}function Un(r){return ge(r,"indexState")}function sp(r){U(r.length!==0);let e=r[0].indexState.offset,t=e.largestBatchId;for(let n=1;n<r.length;n++){let i=r[n].indexState.offset;Rl(i,e)<0&&(e=i),t<i.largestBatchId&&(t=i.largestBatchId)}return new Ge(e.readTime,e.documentKey,t)}var op={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},je=class r{constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}static withCacheSize(e){return new r(e,r.DEFAULT_COLLECTION_PERCENTILE,r.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}};function Im(r,e,t){let n=r.store("mutations"),i=r.store("documentMutations"),s=[],o=IDBKeyRange.only(t.batchId),c=0,u=n.J({range:o},(f,m,v)=>(c++,v.delete()));s.push(u.next(()=>{U(c===1)}));let d=[];for(let f of t.mutations){let m=Np(e,f.key.path,t.batchId);s.push(i.delete(m)),d.push(f.key)}return b.waitFor(s).next(()=>d)}function co(r){if(!r)return 0;let e;if(r.document)e=r.document;else if(r.unknownDocument)e=r.unknownDocument;else{if(!r.noDocument)throw L();e=r.noDocument}return JSON.stringify(e).length}je.DEFAULT_COLLECTION_PERCENTILE=10,je.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,je.DEFAULT=new je(41943040,je.DEFAULT_COLLECTION_PERCENTILE,je.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),je.DISABLED=new je(-1,0,0);var uo=class r{constructor(e,t,n,i){this.userId=e,this.serializer=t,this.indexManager=n,this.referenceDelegate=i,this.Fn={}}static lt(e,t,n,i){U(e.uid!=="");let s=e.isAuthenticated()?e.uid:"";return new r(s,t,n,i)}checkEmpty(e){let t=!0,n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return Ct(e).J({index:"userMutationsIndex",range:n},(i,s,o)=>{t=!1,o.done()}).next(()=>t)}addMutationBatch(e,t,n,i){let s=Kn(e),o=Ct(e);return o.add({}).next(c=>{U(typeof c=="number");let u=new gi(c,t,n,i),d=function(S,D,k){let N=k.baseMutations.map(j=>no(S.ct,j)),z=k.mutations.map(j=>no(S.ct,j));return{userId:D,batchId:k.batchId,localWriteTimeMs:k.localWriteTime.toMillis(),baseMutations:N,mutations:z}}(this.serializer,this.userId,u),f=[],m=new ne((v,S)=>K(v.canonicalString(),S.canonicalString()));for(let v of i){let S=Np(this.userId,v.key.path,c);m=m.add(v.key.path.popLast()),f.push(o.put(d)),f.push(s.put(S,oI))}return m.forEach(v=>{f.push(this.indexManager.addToCollectionParentIndex(e,v))}),e.addOnCommittedListener(()=>{this.Fn[c]=u.keys()}),b.waitFor(f).next(()=>u)})}lookupMutationBatch(e,t){return Ct(e).get(t).next(n=>n?(U(n.userId===this.userId),an(this.serializer,n)):null)}Mn(e,t){return this.Fn[t]?b.resolve(this.Fn[t]):this.lookupMutationBatch(e,t).next(n=>{if(n){let i=n.keys();return this.Fn[t]=i,i}return null})}getNextMutationBatchAfterBatchId(e,t){let n=t+1,i=IDBKeyRange.lowerBound([this.userId,n]),s=null;return Ct(e).J({index:"userMutationsIndex",range:i},(o,c,u)=>{c.userId===this.userId&&(U(c.batchId>=n),s=an(this.serializer,c)),u.done()}).next(()=>s)}getHighestUnacknowledgedBatchId(e){let t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]),n=-1;return Ct(e).J({index:"userMutationsIndex",range:t,reverse:!0},(i,s,o)=>{n=s.batchId,o.done()}).next(()=>n)}getAllMutationBatches(e){let t=IDBKeyRange.bound([this.userId,-1],[this.userId,Number.POSITIVE_INFINITY]);return Ct(e).U("userMutationsIndex",t).next(n=>n.map(i=>an(this.serializer,i)))}getAllMutationBatchesAffectingDocumentKey(e,t){let n=Ls(this.userId,t.path),i=IDBKeyRange.lowerBound(n),s=[];return Kn(e).J({range:i},(o,c,u)=>{let[d,f,m]=o,v=Xe(f);if(d===this.userId&&t.path.isEqual(v))return Ct(e).get(m).next(S=>{if(!S)throw L();U(S.userId===this.userId),s.push(an(this.serializer,S))});u.done()}).next(()=>s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new ne(K),i=[];return t.forEach(s=>{let o=Ls(this.userId,s.path),c=IDBKeyRange.lowerBound(o),u=Kn(e).J({range:c},(d,f,m)=>{let[v,S,D]=d,k=Xe(S);v===this.userId&&s.path.isEqual(k)?n=n.add(D):m.done()});i.push(u)}),b.waitFor(i).next(()=>this.xn(e,n))}getAllMutationBatchesAffectingQuery(e,t){let n=t.path,i=n.length+1,s=Ls(this.userId,n),o=IDBKeyRange.lowerBound(s),c=new ne(K);return Kn(e).J({range:o},(u,d,f)=>{let[m,v,S]=u,D=Xe(v);m===this.userId&&n.isPrefixOf(D)?D.length===i&&(c=c.add(S)):f.done()}).next(()=>this.xn(e,c))}xn(e,t){let n=[],i=[];return t.forEach(s=>{i.push(Ct(e).get(s).next(o=>{if(o===null)throw L();U(o.userId===this.userId),n.push(an(this.serializer,o))}))}),b.waitFor(i).next(()=>n)}removeMutationBatch(e,t){return Im(e._e,this.userId,t).next(n=>(e.addOnCommittedListener(()=>{this.On(t.batchId)}),b.forEach(n,i=>this.referenceDelegate.markPotentiallyOrphaned(e,i))))}On(e){delete this.Fn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return b.resolve();let n=IDBKeyRange.lowerBound(function(o){return[o]}(this.userId)),i=[];return Kn(e).J({range:n},(s,o,c)=>{if(s[0]===this.userId){let u=Xe(s[1]);i.push(u)}else c.done()}).next(()=>{U(i.length===0)})})}containsKey(e,t){return wm(e,this.userId,t)}Nn(e){return Em(e).get(this.userId).next(t=>t||{userId:this.userId,lastAcknowledgedBatchId:-1,lastStreamToken:""})}};function wm(r,e,t){let n=Ls(e,t.path),i=n[1],s=IDBKeyRange.lowerBound(n),o=!1;return Kn(r).J({range:s,H:!0},(c,u,d)=>{let[f,m,v]=c;f===e&&m===i&&(o=!0),d.done()}).next(()=>o)}function Ct(r){return ge(r,"mutations")}function Kn(r){return ge(r,"documentMutations")}function Em(r){return ge(r,"mutationQueues")}var cr=class r{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new r(0)}static kn(){return new r(-1)}};var Su=class{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.qn(e).next(t=>{let n=new cr(t.highestTargetId);return t.highestTargetId=n.next(),this.Qn(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.qn(e).next(t=>q.fromTimestamp(new ue(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.qn(e).next(t=>t.highestListenSequenceNumber)}setTargetsMetadata(e,t,n){return this.qn(e).next(i=>(i.highestListenSequenceNumber=t,n&&(i.lastRemoteSnapshotVersion=n.toTimestamp()),t>i.highestListenSequenceNumber&&(i.highestListenSequenceNumber=t),this.Qn(e,i)))}addTargetData(e,t){return this.Kn(e,t).next(()=>this.qn(e).next(n=>(n.targetCount+=1,this.$n(t,n),this.Qn(e,n))))}updateTargetData(e,t){return this.Kn(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>Bn(e).delete(t.targetId)).next(()=>this.qn(e)).next(n=>(U(n.targetCount>0),n.targetCount-=1,this.Qn(e,n)))}removeTargets(e,t,n){let i=0,s=[];return Bn(e).J((o,c)=>{let u=ni(c);u.sequenceNumber<=t&&n.get(u.targetId)===null&&(i++,s.push(this.removeTargetData(e,u)))}).next(()=>b.waitFor(s)).next(()=>i)}forEachTarget(e,t){return Bn(e).J((n,i)=>{let s=ni(i);t(s)})}qn(e){return ap(e).get("targetGlobalKey").next(t=>(U(t!==null),t))}Qn(e,t){return ap(e).put("targetGlobalKey",t)}Kn(e,t){return Bn(e).put(gm(this.serializer,t))}$n(e,t){let n=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,n=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,n=!0),n}getTargetCount(e){return this.qn(e).next(t=>t.targetCount)}getTargetData(e,t){let n=gn(t),i=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]),s=null;return Bn(e).J({range:i,index:"queryTargetsIndex"},(o,c,u)=>{let d=ni(c);Pi(t,d.target)&&(s=d,u.done())}).next(()=>s)}addMatchingKeys(e,t,n){let i=[],s=Dt(e);return t.forEach(o=>{let c=De(o.path);i.push(s.put({targetId:n,path:c})),i.push(this.referenceDelegate.addReference(e,n,o))}),b.waitFor(i)}removeMatchingKeys(e,t,n){let i=Dt(e);return b.forEach(t,s=>{let o=De(s.path);return b.waitFor([i.delete([n,o]),this.referenceDelegate.removeReference(e,n,s)])})}removeMatchingKeysForTargetId(e,t){let n=Dt(e),i=IDBKeyRange.bound([t],[t+1],!1,!0);return n.delete(i)}getMatchingKeysForTargetId(e,t){let n=IDBKeyRange.bound([t],[t+1],!1,!0),i=Dt(e),s=$();return i.J({range:n,H:!0},(o,c,u)=>{let d=Xe(o[1]),f=new V(d);s=s.add(f)}).next(()=>s)}containsKey(e,t){let n=De(t.path),i=IDBKeyRange.bound([n],[bp(n)],!1,!0),s=0;return Dt(e).J({index:"documentTargetsIndex",H:!0,range:i},([o,c],u,d)=>{o!==0&&(s++,d.done())}).next(()=>s>0)}ot(e,t){return Bn(e).get(t).next(n=>n?ni(n):null)}};function Bn(r){return ge(r,"targets")}function ap(r){return ge(r,"targetGlobal")}function Dt(r){return ge(r,"targetDocuments")}function cp([r,e],[t,n]){let i=K(r,t);return i===0?K(e,n):i}var Ru=class{constructor(e){this.Un=e,this.buffer=new ne(cp),this.Wn=0}Gn(){return++this.Wn}zn(e){let t=[e,this.Gn()];if(this.buffer.size<this.Un)this.buffer=this.buffer.add(t);else{let n=this.buffer.last();cp(t,n)<0&&(this.buffer=this.buffer.delete(n).add(t))}}get maxValue(){return this.buffer.last()[0]}},Pu=class{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.jn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Hn(6e4)}stop(){this.jn&&(this.jn.cancel(),this.jn=null)}get started(){return this.jn!==null}Hn(e){C("LruGarbageCollector",`Garbage collection scheduled in ${e}ms`),this.jn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.jn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){jt(t)?C("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",t):await qt(t)}await this.Hn(3e5)})}},Cu=class{constructor(e,t){this.Jn=e,this.params=t}calculateTargetCount(e,t){return this.Jn.Yn(e).next(n=>Math.floor(t/100*n))}nthSequenceNumber(e,t){if(t===0)return b.resolve(Se.oe);let n=new Ru(t);return this.Jn.forEachTarget(e,i=>n.zn(i.sequenceNumber)).next(()=>this.Jn.Zn(e,i=>n.zn(i))).next(()=>n.maxValue)}removeTargets(e,t,n){return this.Jn.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.Jn.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(C("LruGarbageCollector","Garbage collection skipped; disabled"),b.resolve(op)):this.getCacheSize(e).next(n=>n<this.params.cacheSizeCollectionThreshold?(C("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),op):this.Xn(e,t))}getCacheSize(e){return this.Jn.getCacheSize(e)}Xn(e,t){let n,i,s,o,c,u,d,f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(m=>(m>this.params.maximumSequenceNumbersToCollect?(C("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${m}`),i=this.params.maximumSequenceNumbersToCollect):i=m,o=Date.now(),this.nthSequenceNumber(e,i))).next(m=>(n=m,c=Date.now(),this.removeTargets(e,n,t))).next(m=>(s=m,u=Date.now(),this.removeOrphanedDocuments(e,n))).next(m=>(d=Date.now(),qn()<=H.DEBUG&&C("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-f}ms
	Determined least recently used ${i} in `+(c-o)+`ms
	Removed ${s} targets in `+(u-c)+`ms
	Removed ${m} documents in `+(d-u)+`ms
Total Duration: ${d-f}ms`),b.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:m})))}};function sw(r,e){return new Cu(r,e)}var Du=class{constructor(e,t){this.db=e,this.garbageCollector=sw(this,t)}Yn(e){let t=this.er(e);return this.db.getTargetCache().getTargetCount(e).next(n=>t.next(i=>n+i))}er(e){let t=0;return this.Zn(e,n=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}Zn(e,t){return this.tr(e,(n,i)=>t(i))}addReference(e,t,n){return Os(e,n)}removeReference(e,t,n){return Os(e,n)}removeTargets(e,t,n){return this.db.getTargetCache().removeTargets(e,t,n)}markPotentiallyOrphaned(e,t){return Os(e,t)}nr(e,t){return function(i,s){let o=!1;return Em(i).Y(c=>wm(i,c,s).next(u=>(u&&(o=!0),b.resolve(!u)))).next(()=>o)}(e,t)}removeOrphanedDocuments(e,t){let n=this.db.getRemoteDocumentCache().newChangeBuffer(),i=[],s=0;return this.tr(e,(o,c)=>{if(c<=t){let u=this.nr(e,o).next(d=>{if(!d)return s++,n.getEntry(e,o).next(()=>(n.removeEntry(o,q.min()),Dt(e).delete(function(m){return[0,De(m.path)]}(o))))});i.push(u)}}).next(()=>b.waitFor(i)).next(()=>n.apply(e)).next(()=>s)}removeTarget(e,t){let n=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,n)}updateLimboDocument(e,t){return Os(e,t)}tr(e,t){let n=Dt(e),i,s=Se.oe;return n.J({index:"documentTargetsIndex"},([o,c],{path:u,sequenceNumber:d})=>{o===0?(s!==Se.oe&&t(new V(Xe(i)),s),s=d,i=u):s=Se.oe}).next(()=>{s!==Se.oe&&t(new V(Xe(i)),s)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}};function Os(r,e){return Dt(r).put(function(n,i){return{targetId:0,path:De(n.path),sequenceNumber:i}}(e,r.currentSequenceNumber))}var lo=class{constructor(){this.changes=new rt(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Ie.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();let n=this.changes.get(t);return n!==void 0?b.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}};var Nu=class{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,n){return rn(e).put(n)}removeEntry(e,t,n){return rn(e).delete(function(s,o){let c=s.path.toArray();return[c.slice(0,c.length-2),c[c.length-2],io(o),c[c.length-1]]}(t,n))}updateMetadata(e,t){return this.getMetadata(e).next(n=>(n.byteSize+=t,this.rr(e,n)))}getEntry(e,t){let n=Ie.newInvalidDocument(t);return rn(e).J({index:"documentKeyIndex",range:IDBKeyRange.only(Zr(t))},(i,s)=>{n=this.ir(t,s)}).next(()=>n)}sr(e,t){let n={size:0,document:Ie.newInvalidDocument(t)};return rn(e).J({index:"documentKeyIndex",range:IDBKeyRange.only(Zr(t))},(i,s)=>{n={document:this.ir(t,s),size:co(s)}}).next(()=>n)}getEntries(e,t){let n=Le();return this._r(e,t,(i,s)=>{let o=this.ir(i,s);n=n.insert(i,o)}).next(()=>n)}ar(e,t){let n=Le(),i=new ie(V.comparator);return this._r(e,t,(s,o)=>{let c=this.ir(s,o);n=n.insert(s,c),i=i.insert(s,co(o))}).next(()=>({documents:n,ur:i}))}_r(e,t,n){if(t.isEmpty())return b.resolve();let i=new ne(hp);t.forEach(u=>i=i.add(u));let s=IDBKeyRange.bound(Zr(i.first()),Zr(i.last())),o=i.getIterator(),c=o.getNext();return rn(e).J({index:"documentKeyIndex",range:s},(u,d,f)=>{let m=V.fromSegments([...d.prefixPath,d.collectionGroup,d.documentId]);for(;c&&hp(c,m)<0;)n(c,null),c=o.getNext();c&&c.isEqual(m)&&(n(c,d),c=o.hasNext()?o.getNext():null),c?f.$(Zr(c)):f.done()}).next(()=>{for(;c;)n(c,null),c=o.hasNext()?o.getNext():null})}getDocumentsMatchingQuery(e,t,n,i,s){let o=t.path,c=[o.popLast().toArray(),o.lastSegment(),io(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],u=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return rn(e).U(IDBKeyRange.bound(c,u,!0)).next(d=>{s==null||s.incrementDocumentReadCount(d.length);let f=Le();for(let m of d){let v=this.ir(V.fromSegments(m.prefixPath.concat(m.collectionGroup,m.documentId)),m);v.isFoundDocument()&&(Di(t,v)||i.has(v.key))&&(f=f.insert(v.key,v))}return f})}getAllFromCollectionGroup(e,t,n,i){let s=Le(),o=lp(t,n),c=lp(t,Ge.max());return rn(e).J({index:"collectionGroupIndex",range:IDBKeyRange.bound(o,c,!0)},(u,d,f)=>{let m=this.ir(V.fromSegments(d.prefixPath.concat(d.collectionGroup,d.documentId)),d);s=s.insert(m.key,m),s.size===i&&f.done()}).next(()=>s)}newChangeBuffer(e){return new ku(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(t=>t.byteSize)}getMetadata(e){return up(e).get("remoteDocumentGlobalKey").next(t=>(U(!!t),t))}rr(e,t){return up(e).put("remoteDocumentGlobalKey",t)}ir(e,t){if(t){let n=nw(this.serializer,t);if(!(n.isNoDocument()&&n.version.isEqual(q.min())))return n}return Ie.newInvalidDocument(e)}};function Tm(r){return new Nu(r)}var ku=class extends lo{constructor(e,t){super(),this.cr=e,this.trackRemovals=t,this.lr=new rt(n=>n.toString(),(n,i)=>n.isEqual(i))}applyChanges(e){let t=[],n=0,i=new ne((s,o)=>K(s.canonicalString(),o.canonicalString()));return this.changes.forEach((s,o)=>{let c=this.lr.get(s);if(t.push(this.cr.removeEntry(e,s,c.readTime)),o.isValidDocument()){let u=Jf(this.cr.serializer,o);i=i.add(s.path.popLast());let d=co(u);n+=d-c.size,t.push(this.cr.addEntry(e,s,u))}else if(n-=c.size,this.trackRemovals){let u=Jf(this.cr.serializer,o.convertToNoDocument(q.min()));t.push(this.cr.addEntry(e,s,u))}}),i.forEach(s=>{t.push(this.cr.indexManager.addToCollectionParentIndex(e,s))}),t.push(this.cr.updateMetadata(e,n)),b.waitFor(t)}getFromCache(e,t){return this.cr.sr(e,t).next(n=>(this.lr.set(t,{size:n.size,readTime:n.document.readTime}),n.document))}getAllFromCache(e,t){return this.cr.ar(e,t).next(({documents:n,ur:i})=>(i.forEach((s,o)=>{this.lr.set(s,{size:o,readTime:n.get(s).readTime})}),n))}};function up(r){return ge(r,"remoteDocumentGlobal")}function rn(r){return ge(r,"remoteDocumentsV14")}function Zr(r){let e=r.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function lp(r,e){let t=e.documentKey.path.toArray();return[r,io(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function hp(r,e){let t=r.path.toArray(),n=e.path.toArray(),i=0;for(let s=0;s<t.length-2&&s<n.length-2;++s)if(i=K(t[s],n[s]),i)return i;return i=K(t.length,n.length),i||(i=K(t[t.length-2],n[n.length-2]),i||K(t[t.length-1],n[n.length-1]))}var Ou=class{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}};var ho=class{constructor(e,t,n,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=i}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(n=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(n!==null&&oi(n.mutation,i,Ve.empty(),ue.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(n=>this.getLocalViewOfDocuments(e,n,$()).next(()=>n))}getLocalViewOfDocuments(e,t,n=$()){let i=Ze();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,n).next(s=>{let o=ti();return s.forEach((c,u)=>{o=o.insert(c,u.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){let n=Ze();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,$()))}populateOverlays(e,t,n){let i=[];return n.forEach(s=>{t.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((o,c)=>{t.set(o,c)})})}computeViews(e,t,n,i){let s=Le(),o=si(),c=function(){return si()}();return t.forEach((u,d)=>{let f=n.get(d.key);i.has(d.key)&&(f===void 0||f.mutation instanceof He)?s=s.insert(d.key,d):f!==void 0?(o.set(d.key,f.mutation.getFieldMask()),oi(f.mutation,d,f.mutation.getFieldMask(),ue.now())):o.set(d.key,Ve.empty())}),this.recalculateAndSaveOverlays(e,s).next(u=>(u.forEach((d,f)=>o.set(d,f)),t.forEach((d,f)=>{var m;return c.set(d,new Ou(f,(m=o.get(d))!==null&&m!==void 0?m:null))}),c))}recalculateAndSaveOverlays(e,t){let n=si(),i=new ie((o,c)=>o-c),s=$();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(let c of o)c.keys().forEach(u=>{let d=t.get(u);if(d===null)return;let f=n.get(u)||Ve.empty();f=c.applyToLocalView(d,f),n.set(u,f);let m=(i.get(c.batchId)||$()).add(u);i=i.insert(c.batchId,m)})}).next(()=>{let o=[],c=i.getReverseIterator();for(;c.hasNext();){let u=c.getNext(),d=u.key,f=u.value,m=Jp();f.forEach(v=>{if(!s.has(v)){let S=nm(t.get(v),n.get(v));S!==null&&m.set(v,S),s=s.add(v)}}),o.push(this.documentOverlayCache.saveOverlays(e,d,m))}return b.waitFor(o)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(n=>this.recalculateAndSaveOverlays(e,n))}getDocumentsMatchingQuery(e,t,n,i){return function(o){return V.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):PI(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,i):this.getDocumentsMatchingCollectionQuery(e,t,n,i)}getNextDocuments(e,t,n,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,i).next(s=>{let o=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,i-s.size):b.resolve(Ze()),c=-1,u=s;return o.next(d=>b.forEach(d,(f,m)=>(c<m.largestBatchId&&(c=m.largestBatchId),s.get(f)?b.resolve():this.remoteDocumentCache.getEntry(e,f).next(v=>{u=u.insert(f,v)}))).next(()=>this.populateOverlays(e,d,s)).next(()=>this.computeViews(e,u,d,$())).next(f=>({batchId:c,changes:Qp(f)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new V(t)).next(n=>{let i=ti();return n.isFoundDocument()&&(i=i.insert(n.key,n)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,n,i){let s=t.collectionGroup,o=ti();return this.indexManager.getCollectionParents(e,s).next(c=>b.forEach(c,u=>{let d=function(m,v){return new nr(v,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)}(t,u.child(s));return this.getDocumentsMatchingCollectionQuery(e,d,n,i).next(f=>{f.forEach((m,v)=>{o=o.insert(m,v)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,n,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next(o=>(s=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,s,i))).next(o=>{s.forEach((u,d)=>{let f=d.getKey();o.get(f)===null&&(o=o.insert(f,Ie.newInvalidDocument(f)))});let c=ti();return o.forEach((u,d)=>{let f=s.get(u);f!==void 0&&oi(f.mutation,d,Ve.empty(),ue.now()),Di(t,d)&&(c=c.insert(u,d))}),c})}};var xu=class{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,t){return b.resolve(this.hr.get(t))}saveBundleMetadata(e,t){return this.hr.set(t.id,function(i){return{id:i.id,version:i.version,createTime:Ne(i.createTime)}}(t)),b.resolve()}getNamedQuery(e,t){return b.resolve(this.Pr.get(t))}saveNamedQuery(e,t){return this.Pr.set(t.name,function(i){return{name:i.name,query:_m(i.bundledQuery),readTime:Ne(i.readTime)}}(t)),b.resolve()}};var Vu=class{constructor(){this.overlays=new ie(V.comparator),this.Ir=new Map}getOverlay(e,t){return b.resolve(this.overlays.get(t))}getOverlays(e,t){let n=Ze();return b.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&n.set(i,s)})).next(()=>n)}saveOverlays(e,t,n){return n.forEach((i,s)=>{this.ht(e,t,s)}),b.resolve()}removeOverlaysForBatchId(e,t,n){let i=this.Ir.get(n);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.Ir.delete(n)),b.resolve()}getOverlaysForCollection(e,t,n){let i=Ze(),s=t.length+1,o=new V(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){let u=c.getNext().value,d=u.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===s&&u.largestBatchId>n&&i.set(u.getKey(),u)}return b.resolve(i)}getOverlaysForCollectionGroup(e,t,n,i){let s=new ie((d,f)=>d-f),o=this.overlays.getIterator();for(;o.hasNext();){let d=o.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>n){let f=s.get(d.largestBatchId);f===null&&(f=Ze(),s=s.insert(d.largestBatchId,f)),f.set(d.getKey(),d)}}let c=Ze(),u=s.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((d,f)=>c.set(d,f)),!(c.size()>=i)););return b.resolve(c)}ht(e,t,n){let i=this.overlays.get(n.key);if(i!==null){let o=this.Ir.get(i.largestBatchId).delete(n.key);this.Ir.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(n.key,new _i(t,n));let s=this.Ir.get(t);s===void 0&&(s=$(),this.Ir.set(t,s)),this.Ir.set(t,s.add(n.key))}};var Lu=class{constructor(){this.sessionToken=pe.EMPTY_BYTE_STRING}getSessionToken(e){return b.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,b.resolve()}};var wi=class{constructor(){this.Tr=new ne(fe.Er),this.dr=new ne(fe.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,t){let n=new fe(e,t);this.Tr=this.Tr.add(n),this.dr=this.dr.add(n)}Rr(e,t){e.forEach(n=>this.addReference(n,t))}removeReference(e,t){this.Vr(new fe(e,t))}mr(e,t){e.forEach(n=>this.removeReference(n,t))}gr(e){let t=new V(new te([])),n=new fe(t,e),i=new fe(t,e+1),s=[];return this.dr.forEachInRange([n,i],o=>{this.Vr(o),s.push(o.key)}),s}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){let t=new V(new te([])),n=new fe(t,e),i=new fe(t,e+1),s=$();return this.dr.forEachInRange([n,i],o=>{s=s.add(o.key)}),s}containsKey(e){let t=new fe(e,0),n=this.Tr.firstAfterOrEqual(t);return n!==null&&e.isEqual(n.key)}},fe=class{constructor(e,t){this.key=e,this.wr=t}static Er(e,t){return V.comparator(e.key,t.key)||K(e.wr,t.wr)}static Ar(e,t){return K(e.wr,t.wr)||V.comparator(e.key,t.key)}};var Mu=class{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Sr=1,this.br=new ne(fe.Er)}checkEmpty(e){return b.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,n,i){let s=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];let o=new gi(s,t,n,i);this.mutationQueue.push(o);for(let c of i)this.br=this.br.add(new fe(c.key,s)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return b.resolve(o)}lookupMutationBatch(e,t){return b.resolve(this.Dr(t))}getNextMutationBatchAfterBatchId(e,t){let n=t+1,i=this.vr(n),s=i<0?0:i;return b.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return b.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return b.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){let n=new fe(t,0),i=new fe(t,Number.POSITIVE_INFINITY),s=[];return this.br.forEachInRange([n,i],o=>{let c=this.Dr(o.wr);s.push(c)}),b.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new ne(K);return t.forEach(i=>{let s=new fe(i,0),o=new fe(i,Number.POSITIVE_INFINITY);this.br.forEachInRange([s,o],c=>{n=n.add(c.wr)})}),b.resolve(this.Cr(n))}getAllMutationBatchesAffectingQuery(e,t){let n=t.path,i=n.length+1,s=n;V.isDocumentKey(s)||(s=s.child(""));let o=new fe(new V(s),0),c=new ne(K);return this.br.forEachWhile(u=>{let d=u.key.path;return!!n.isPrefixOf(d)&&(d.length===i&&(c=c.add(u.wr)),!0)},o),b.resolve(this.Cr(c))}Cr(e){let t=[];return e.forEach(n=>{let i=this.Dr(n);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){U(this.Fr(t.batchId,"removed")===0),this.mutationQueue.shift();let n=this.br;return b.forEach(t.mutations,i=>{let s=new fe(i.key,t.batchId);return n=n.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.br=n})}On(e){}containsKey(e,t){let n=new fe(t,0),i=this.br.firstAfterOrEqual(n);return b.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,b.resolve()}Fr(e,t){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){let t=this.vr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}};var Fu=class{constructor(e){this.Mr=e,this.docs=function(){return new ie(V.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){let n=t.key,i=this.docs.get(n),s=i?i.size:0,o=this.Mr(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:o}),this.size+=o-s,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){let t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){let n=this.docs.get(t);return b.resolve(n?n.document.mutableCopy():Ie.newInvalidDocument(t))}getEntries(e,t){let n=Le();return t.forEach(i=>{let s=this.docs.get(i);n=n.insert(i,s?s.document.mutableCopy():Ie.newInvalidDocument(i))}),b.resolve(n)}getDocumentsMatchingQuery(e,t,n,i){let s=Le(),o=t.path,c=new V(o.child("")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){let{key:d,value:{document:f}}=u.getNext();if(!o.isPrefixOf(d.path))break;d.path.length>o.length+1||Rl(Rp(f),n)<=0||(i.has(f.key)||Di(t,f))&&(s=s.insert(f.key,f.mutableCopy()))}return b.resolve(s)}getAllFromCollectionGroup(e,t,n,i){L()}Or(e,t){return b.forEach(this.docs,n=>t(n))}newChangeBuffer(e){return new Uu(this)}getSize(e){return b.resolve(this.size)}},Uu=class extends lo{constructor(e){super(),this.cr=e}applyChanges(e){let t=[];return this.changes.forEach((n,i)=>{i.isValidDocument()?t.push(this.cr.addEntry(e,i)):this.cr.removeEntry(n)}),b.waitFor(t)}getFromCache(e,t){return this.cr.getEntry(e,t)}getAllFromCache(e,t){return this.cr.getEntries(e,t)}};var Bu=class{constructor(e){this.persistence=e,this.Nr=new rt(t=>gn(t),Pi),this.lastRemoteSnapshotVersion=q.min(),this.highestTargetId=0,this.Lr=0,this.Br=new wi,this.targetCount=0,this.kr=cr.Bn()}forEachTarget(e,t){return this.Nr.forEach((n,i)=>t(i)),b.resolve()}getLastRemoteSnapshotVersion(e){return b.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return b.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),b.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.Lr&&(this.Lr=t),b.resolve()}Kn(e){this.Nr.set(e.target,e);let t=e.targetId;t>this.highestTargetId&&(this.kr=new cr(t),this.highestTargetId=t),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,t){return this.Kn(t),this.targetCount+=1,b.resolve()}updateTargetData(e,t){return this.Kn(t),b.resolve()}removeTargetData(e,t){return this.Nr.delete(t.target),this.Br.gr(t.targetId),this.targetCount-=1,b.resolve()}removeTargets(e,t,n){let i=0,s=[];return this.Nr.forEach((o,c)=>{c.sequenceNumber<=t&&n.get(c.targetId)===null&&(this.Nr.delete(o),s.push(this.removeMatchingKeysForTargetId(e,c.targetId)),i++)}),b.waitFor(s).next(()=>i)}getTargetCount(e){return b.resolve(this.targetCount)}getTargetData(e,t){let n=this.Nr.get(t)||null;return b.resolve(n)}addMatchingKeys(e,t,n){return this.Br.Rr(t,n),b.resolve()}removeMatchingKeys(e,t,n){this.Br.mr(t,n);let i=this.persistence.referenceDelegate,s=[];return i&&t.forEach(o=>{s.push(i.markPotentiallyOrphaned(e,o))}),b.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.Br.gr(t),b.resolve()}getMatchingKeysForTargetId(e,t){let n=this.Br.yr(t);return b.resolve(n)}containsKey(e,t){return b.resolve(this.Br.containsKey(t))}};var fo=class{constructor(e,t){this.qr={},this.overlays={},this.Qr=new Se(0),this.Kr=!1,this.Kr=!0,this.$r=new Lu,this.referenceDelegate=e(this),this.Ur=new Bu(this),this.indexManager=new Au,this.remoteDocumentCache=function(i){return new Fu(i)}(n=>this.referenceDelegate.Wr(n)),this.serializer=new ro(t),this.Gr=new xu(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Vu,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.qr[e.toKey()];return n||(n=new Mu(t,this.referenceDelegate),this.qr[e.toKey()]=n),n}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,t,n){C("MemoryPersistence","Starting transaction:",e);let i=new qu(this.Qr.next());return this.referenceDelegate.zr(),n(i).next(s=>this.referenceDelegate.jr(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Hr(e,t){return b.or(Object.values(this.qr).map(n=>()=>n.containsKey(e,t)))}},qu=class extends zs{constructor(e){super(),this.currentSequenceNumber=e}},po=class r{constructor(e){this.persistence=e,this.Jr=new wi,this.Yr=null}static Zr(e){return new r(e)}get Xr(){if(this.Yr)return this.Yr;throw L()}addReference(e,t,n){return this.Jr.addReference(n,t),this.Xr.delete(n.toString()),b.resolve()}removeReference(e,t,n){return this.Jr.removeReference(n,t),this.Xr.add(n.toString()),b.resolve()}markPotentiallyOrphaned(e,t){return this.Xr.add(t.toString()),b.resolve()}removeTarget(e,t){this.Jr.gr(t.targetId).forEach(i=>this.Xr.add(i.toString()));let n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(s=>this.Xr.add(s.toString()))}).next(()=>n.removeTargetData(e,t))}zr(){this.Yr=new Set}jr(e){let t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return b.forEach(this.Xr,n=>{let i=V.fromPath(n);return this.ei(e,i).next(s=>{s||t.removeEntry(i,q.min())})}).next(()=>(this.Yr=null,t.apply(e)))}updateLimboDocument(e,t){return this.ei(e,t).next(n=>{n?this.Xr.delete(t.toString()):this.Xr.add(t.toString())})}Wr(e){return 0}ei(e,t){return b.or([()=>b.resolve(this.Jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Hr(e,t)])}};var ju=class{constructor(e){this.serializer=e}O(e,t,n,i){let s=new Gs("createOrUpgrade",t);n<1&&i>=1&&(function(u){u.createObjectStore("owner")}(e),function(u){u.createObjectStore("mutationQueues",{keyPath:"userId"}),u.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",Rf,{unique:!0}),u.createObjectStore("documentMutations")}(e),dp(e),function(u){u.createObjectStore("remoteDocuments")}(e));let o=b.resolve();return n<3&&i>=3&&(n!==0&&(function(u){u.deleteObjectStore("targetDocuments"),u.deleteObjectStore("targets"),u.deleteObjectStore("targetGlobal")}(e),dp(e)),o=o.next(()=>function(u){let d=u.store("targetGlobal"),f={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:q.min().toTimestamp(),targetCount:0};return d.put("targetGlobalKey",f)}(s))),n<4&&i>=4&&(n!==0&&(o=o.next(()=>function(u,d){return d.store("mutations").U().next(f=>{u.deleteObjectStore("mutations"),u.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",Rf,{unique:!0});let m=d.store("mutations"),v=f.map(S=>m.put(S));return b.waitFor(v)})}(e,s))),o=o.next(()=>{(function(u){u.createObjectStore("clientMetadata",{keyPath:"clientId"})})(e)})),n<5&&i>=5&&(o=o.next(()=>this.ni(s))),n<6&&i>=6&&(o=o.next(()=>(function(u){u.createObjectStore("remoteDocumentGlobal")}(e),this.ri(s)))),n<7&&i>=7&&(o=o.next(()=>this.ii(s))),n<8&&i>=8&&(o=o.next(()=>this.si(e,s))),n<9&&i>=9&&(o=o.next(()=>{(function(u){u.objectStoreNames.contains("remoteDocumentChanges")&&u.deleteObjectStore("remoteDocumentChanges")})(e)})),n<10&&i>=10&&(o=o.next(()=>this.oi(s))),n<11&&i>=11&&(o=o.next(()=>{(function(u){u.createObjectStore("bundles",{keyPath:"bundleId"})})(e),function(u){u.createObjectStore("namedQueries",{keyPath:"name"})}(e)})),n<12&&i>=12&&(o=o.next(()=>{(function(u){let d=u.createObjectStore("documentOverlays",{keyPath:yI});d.createIndex("collectionPathOverlayIndex",vI,{unique:!1}),d.createIndex("collectionGroupOverlayIndex",II,{unique:!1})})(e)})),n<13&&i>=13&&(o=o.next(()=>function(u){let d=u.createObjectStore("remoteDocumentsV14",{keyPath:aI});d.createIndex("documentKeyIndex",cI),d.createIndex("collectionGroupIndex",uI)}(e)).next(()=>this._i(e,s)).next(()=>e.deleteObjectStore("remoteDocuments"))),n<14&&i>=14&&(o=o.next(()=>this.ai(e,s))),n<15&&i>=15&&(o=o.next(()=>function(u){u.createObjectStore("indexConfiguration",{keyPath:"indexId",autoIncrement:!0}).createIndex("collectionGroupIndex","collectionGroup",{unique:!1}),u.createObjectStore("indexState",{keyPath:pI}).createIndex("sequenceNumberIndex",mI,{unique:!1}),u.createObjectStore("indexEntries",{keyPath:gI}).createIndex("documentKeyIndex",_I,{unique:!1})}(e))),n<16&&i>=16&&(o=o.next(()=>{t.objectStore("indexState").clear()}).next(()=>{t.objectStore("indexEntries").clear()})),n<17&&i>=17&&(o=o.next(()=>{(function(u){u.createObjectStore("globals",{keyPath:"name"})})(e)})),o}ri(e){let t=0;return e.store("remoteDocuments").J((n,i)=>{t+=co(i)}).next(()=>{let n={byteSize:t};return e.store("remoteDocumentGlobal").put("remoteDocumentGlobalKey",n)})}ni(e){let t=e.store("mutationQueues"),n=e.store("mutations");return t.U().next(i=>b.forEach(i,s=>{let o=IDBKeyRange.bound([s.userId,-1],[s.userId,s.lastAcknowledgedBatchId]);return n.U("userMutationsIndex",o).next(c=>b.forEach(c,u=>{U(u.userId===s.userId);let d=an(this.serializer,u);return Im(e,s.userId,d).next(()=>{})}))}))}ii(e){let t=e.store("targetDocuments"),n=e.store("remoteDocuments");return e.store("targetGlobal").get("targetGlobalKey").next(i=>{let s=[];return n.J((o,c)=>{let u=new te(o),d=function(m){return[0,De(m)]}(u);s.push(t.get(d).next(f=>f?b.resolve():(m=>t.put({targetId:0,path:De(m),sequenceNumber:i.highestListenSequenceNumber}))(u)))}).next(()=>b.waitFor(s))})}si(e,t){e.createObjectStore("collectionParents",{keyPath:fI});let n=t.store("collectionParents"),i=new Ii,s=o=>{if(i.add(o)){let c=o.lastSegment(),u=o.popLast();return n.put({collectionId:c,parent:De(u)})}};return t.store("remoteDocuments").J({H:!0},(o,c)=>{let u=new te(o);return s(u.popLast())}).next(()=>t.store("documentMutations").J({H:!0},([o,c,u],d)=>{let f=Xe(c);return s(f.popLast())}))}oi(e){let t=e.store("targets");return t.J((n,i)=>{let s=ni(i),o=gm(this.serializer,s);return t.put(o)})}_i(e,t){let n=t.store("remoteDocuments"),i=[];return n.J((s,o)=>{let c=t.store("remoteDocumentsV14"),u=function(m){return m.document?new V(te.fromString(m.document.name).popFirst(5)):m.noDocument?V.fromSegments(m.noDocument.path):m.unknownDocument?V.fromSegments(m.unknownDocument.path):L()}(o).path.toArray(),d={prefixPath:u.slice(0,u.length-2),collectionGroup:u[u.length-2],documentId:u[u.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};i.push(c.put(d))}).next(()=>b.waitFor(i))}ai(e,t){let n=t.store("mutations"),i=Tm(this.serializer),s=new fo(po.Zr,this.serializer.ct);return n.U().next(o=>{let c=new Map;return o.forEach(u=>{var d;let f=(d=c.get(u.userId))!==null&&d!==void 0?d:$();an(this.serializer,u).keys().forEach(m=>f=f.add(m)),c.set(u.userId,f)}),b.forEach(c,(u,d)=>{let f=new ye(d),m=so.lt(this.serializer,f),v=s.getIndexManager(f),S=uo.lt(f,this.serializer,v,s.referenceDelegate);return new ho(i,S,m,v).recalculateAndSaveOverlaysForDocumentKeys(new di(t,Se.oe),u).next()})})}};function dp(r){r.createObjectStore("targetDocuments",{keyPath:hI}).createIndex("documentTargetsIndex",dI,{unique:!0}),r.createObjectStore("targets",{keyPath:"targetId"}).createIndex("queryTargetsIndex",lI,{unique:!0}),r.createObjectStore("targetGlobal")}var Cc="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",zu=class r{constructor(e,t,n,i,s,o,c,u,d,f,m=17){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=n,this.ui=s,this.window=o,this.document=c,this.ci=d,this.li=f,this.hi=m,this.Qr=null,this.Kr=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Pi=null,this.inForeground=!1,this.Ii=null,this.Ti=null,this.Ei=Number.NEGATIVE_INFINITY,this.di=v=>Promise.resolve(),!r.D())throw new x(P.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new Du(this,i),this.Ai=t+"main",this.serializer=new ro(u),this.Ri=new Ot(this.Ai,this.hi,new ju(this.serializer)),this.$r=new _u,this.Ur=new Su(this.referenceDelegate,this.serializer),this.remoteDocumentCache=Tm(this.serializer),this.Gr=new gu,this.window&&this.window.localStorage?this.Vi=this.window.localStorage:(this.Vi=null,f===!1&&ce("IndexedDbPersistence","LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.mi().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new x(P.FAILED_PRECONDITION,Cc);return this.fi(),this.gi(),this.pi(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.Ur.getHighestSequenceNumber(e))}).then(e=>{this.Qr=new Se(e,this.ci)}).then(()=>{this.Kr=!0}).catch(e=>(this.Ri&&this.Ri.close(),Promise.reject(e)))}yi(e){return this.di=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.Ri.L(async t=>{t.newVersion===null&&await e()})}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.ui.enqueueAndForget(async()=>{this.started&&await this.mi()}))}mi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>xs(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.wi(e).next(t=>{t||(this.isPrimary=!1,this.ui.enqueueRetryable(()=>this.di(!1)))})}).next(()=>this.Si(e)).next(t=>this.isPrimary&&!t?this.bi(e).next(()=>!1):!!t&&this.Di(e).next(()=>!0))).catch(e=>{if(jt(e))return C("IndexedDbPersistence","Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return C("IndexedDbPersistence","Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.ui.enqueueRetryable(()=>this.di(e)),this.isPrimary=e})}wi(e){return ei(e).get("owner").next(t=>b.resolve(this.vi(t)))}Ci(e){return xs(e).delete(this.clientId)}async Fi(){if(this.isPrimary&&!this.Mi(this.Ei,18e5)){this.Ei=Date.now();let e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",t=>{let n=ge(t,"clientMetadata");return n.U().next(i=>{let s=this.xi(i,18e5),o=i.filter(c=>s.indexOf(c)===-1);return b.forEach(o,c=>n.delete(c.clientId)).next(()=>o)})}).catch(()=>[]);if(this.Vi)for(let t of e)this.Vi.removeItem(this.Oi(t.clientId))}}pi(){this.Ti=this.ui.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.mi().then(()=>this.Fi()).then(()=>this.pi()))}vi(e){return!!e&&e.ownerId===this.clientId}Si(e){return this.li?b.resolve(!0):ei(e).get("owner").next(t=>{if(t!==null&&this.Mi(t.leaseTimestampMs,5e3)&&!this.Ni(t.ownerId)){if(this.vi(t)&&this.networkEnabled)return!0;if(!this.vi(t)){if(!t.allowTabSynchronization)throw new x(P.FAILED_PRECONDITION,Cc);return!1}}return!(!this.networkEnabled||!this.inForeground)||xs(e).U().next(n=>this.xi(n,5e3).find(i=>{if(this.clientId!==i.clientId){let s=!this.networkEnabled&&i.networkEnabled,o=!this.inForeground&&i.inForeground,c=this.networkEnabled===i.networkEnabled;if(s||o&&c)return!0}return!1})===void 0)}).next(t=>(this.isPrimary!==t&&C("IndexedDbPersistence",`Client ${t?"is":"is not"} eligible for a primary lease.`),t))}async shutdown(){this.Kr=!1,this.Li(),this.Ti&&(this.Ti.cancel(),this.Ti=null),this.Bi(),this.ki(),await this.Ri.runTransaction("shutdown","readwrite",["owner","clientMetadata"],e=>{let t=new di(e,Se.oe);return this.bi(t).next(()=>this.Ci(t))}),this.Ri.close(),this.qi()}xi(e,t){return e.filter(n=>this.Mi(n.updateTimeMs,t)&&!this.Ni(n.clientId))}Qi(){return this.runTransaction("getActiveClients","readonly",e=>xs(e).U().next(t=>this.xi(t,18e5).map(n=>n.clientId)))}get started(){return this.Kr}getGlobalsCache(){return this.$r}getMutationQueue(e,t){return uo.lt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new bu(e,this.serializer.ct.databaseId)}getDocumentOverlayCache(e){return so.lt(this.serializer,e)}getBundleCache(){return this.Gr}runTransaction(e,t,n){C("IndexedDbPersistence","Starting transaction:",e);let i=t==="readonly"?"readonly":"readwrite",s=function(u){return u===17?TI:u===16?EI:u===15?Cl:u===14?xp:u===13?Op:u===12?wI:u===11?kp:void L()}(this.hi),o;return this.Ri.runTransaction(e,i,s,c=>(o=new di(c,this.Qr?this.Qr.next():Se.oe),t==="readwrite-primary"?this.wi(o).next(u=>!!u||this.Si(o)).next(u=>{if(!u)throw ce(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.ui.enqueueRetryable(()=>this.di(!1)),new x(P.FAILED_PRECONDITION,Pp);return n(o)}).next(u=>this.Di(o).next(()=>u)):this.Ki(o).next(()=>n(o)))).then(c=>(o.raiseOnCommittedEvent(),c))}Ki(e){return ei(e).get("owner").next(t=>{if(t!==null&&this.Mi(t.leaseTimestampMs,5e3)&&!this.Ni(t.ownerId)&&!this.vi(t)&&!(this.li||this.allowTabSynchronization&&t.allowTabSynchronization))throw new x(P.FAILED_PRECONDITION,Cc)})}Di(e){let t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return ei(e).put("owner",t)}static D(){return Ot.D()}bi(e){let t=ei(e);return t.get("owner").next(n=>this.vi(n)?(C("IndexedDbPersistence","Releasing primary lease."),t.delete("owner")):b.resolve())}Mi(e,t){let n=Date.now();return!(e<n-t)&&(!(e>n)||(ce(`Detected an update time that is in the future: ${e} > ${n}`),!1))}fi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ii=()=>{this.ui.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.mi()))},this.document.addEventListener("visibilitychange",this.Ii),this.inForeground=this.document.visibilityState==="visible")}Bi(){this.Ii&&(this.document.removeEventListener("visibilitychange",this.Ii),this.Ii=null)}gi(){var e;typeof((e=this.window)===null||e===void 0?void 0:e.addEventListener)=="function"&&(this.Pi=()=>{this.Li();let t=/(?:Version|Mobile)\/1[456]/;ba()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.ui.enterRestrictedMode(!0),this.ui.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Pi))}ki(){this.Pi&&(this.window.removeEventListener("pagehide",this.Pi),this.Pi=null)}Ni(e){var t;try{let n=((t=this.Vi)===null||t===void 0?void 0:t.getItem(this.Oi(e)))!==null;return C("IndexedDbPersistence",`Client '${e}' ${n?"is":"is not"} zombied in LocalStorage`),n}catch(n){return ce("IndexedDbPersistence","Failed to get zombied client id.",n),!1}}Li(){if(this.Vi)try{this.Vi.setItem(this.Oi(this.clientId),String(Date.now()))}catch(e){ce("Failed to set zombie client id.",e)}}qi(){if(this.Vi)try{this.Vi.removeItem(this.Oi(this.clientId))}catch{}}Oi(e){return`firestore_zombie_${this.persistenceKey}_${e}`}};function ei(r){return ge(r,"owner")}function xs(r){return ge(r,"clientMetadata")}function Fl(r,e){let t=r.projectId;return r.isDefaultDatabase||(t+="."+r.database),"firestore/"+e+"/"+t+"/"}var Gu=class r{constructor(e,t,n,i){this.targetId=e,this.fromCache=t,this.$i=n,this.Ui=i}static Wi(e,t){let n=$(),i=$();for(let s of t.docChanges)switch(s.type){case 0:n=n.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new r(e,t.fromCache,n,i)}};var Ku=class{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}};var mo=class{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return ba()?8:Cp(ae())>0?6:4}()}initialize(e,t){this.Ji=e,this.indexManager=t,this.Gi=!0}getDocumentsMatchingQuery(e,t,n,i){let s={result:null};return this.Yi(e,t).next(o=>{s.result=o}).next(()=>{if(!s.result)return this.Zi(e,t,i,n).next(o=>{s.result=o})}).next(()=>{if(s.result)return;let o=new Ku;return this.Xi(e,t,o).next(c=>{if(s.result=c,this.zi)return this.es(e,t,o,c.size)})}).next(()=>s.result)}es(e,t,n,i){return n.documentReadCount<this.ji?(qn()<=H.DEBUG&&C("QueryEngine","SDK will not create cache indexes for query:",jn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),b.resolve()):(qn()<=H.DEBUG&&C("QueryEngine","Query:",jn(t),"scans",n.documentReadCount,"local documents and returns",i,"documents as results."),n.documentReadCount>this.Hi*i?(qn()<=H.DEBUG&&C("QueryEngine","The SDK decides to create cache indexes for query:",jn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Fe(t))):b.resolve())}Yi(e,t){if(Uf(t))return b.resolve(null);let n=Fe(t);return this.indexManager.getIndexType(e,n).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=iu(t,null,"F"),n=Fe(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next(s=>{let o=$(...s);return this.Ji.getDocuments(e,o).next(c=>this.indexManager.getMinOffset(e,n).next(u=>{let d=this.ts(t,c);return this.ns(t,d,o,u.readTime)?this.Yi(e,iu(t,null,"F")):this.rs(e,d,t,u)}))})))}Zi(e,t,n,i){return Uf(t)||i.isEqual(q.min())?b.resolve(null):this.Ji.getDocuments(e,n).next(s=>{let o=this.ts(t,s);return this.ns(t,o,n,i)?b.resolve(null):(qn()<=H.DEBUG&&C("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),jn(t)),this.rs(e,o,t,Sp(i,-1)).next(c=>c))})}ts(e,t){let n=new ne(Wp(e));return t.forEach((i,s)=>{Di(e,s)&&(n=n.add(s))}),n}ns(e,t,n,i){if(e.limit===null)return!1;if(n.size!==t.size)return!0;let s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}Xi(e,t,n){return qn()<=H.DEBUG&&C("QueryEngine","Using full collection scan to execute query:",jn(t)),this.Ji.getDocumentsMatchingQuery(e,t,Ge.min(),n)}rs(e,t,n,i){return this.Ji.getDocumentsMatchingQuery(e,n,i).next(s=>(t.forEach(o=>{s=s.insert(o.key,o)}),s))}};var $u=class{constructor(e,t,n,i){this.persistence=e,this.ss=t,this.serializer=i,this.os=new ie(K),this._s=new rt(s=>gn(s),Pi),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(n)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new ho(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.os))}};function Am(r,e,t,n){return new $u(r,e,t,n)}async function bm(r,e){let t=M(r);return await t.persistence.runTransaction("Handle user change","readonly",n=>{let i;return t.mutationQueue.getAllMutationBatches(n).next(s=>(i=s,t.ls(e),t.mutationQueue.getAllMutationBatches(n))).next(s=>{let o=[],c=[],u=$();for(let d of i){o.push(d.batchId);for(let f of d.mutations)u=u.add(f.key)}for(let d of s){c.push(d.batchId);for(let f of d.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(n,u).next(d=>({hs:d,removedBatchIds:o,addedBatchIds:c}))})})}function ow(r,e){let t=M(r);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",n=>{let i=e.batch.keys(),s=t.cs.newChangeBuffer({trackRemovals:!0});return function(c,u,d,f){let m=d.batch,v=m.keys(),S=b.resolve();return v.forEach(D=>{S=S.next(()=>f.getEntry(u,D)).next(k=>{let N=d.docVersions.get(D);U(N!==null),k.version.compareTo(N)<0&&(m.applyToRemoteDocument(k,d),k.isValidDocument()&&(k.setReadTime(d.commitVersion),f.addEntry(k)))})}),S.next(()=>c.mutationQueue.removeMutationBatch(u,m))}(t,n,e,s).next(()=>s.apply(n)).next(()=>t.mutationQueue.performConsistencyCheck(n)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(n,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,function(c){let u=$();for(let d=0;d<c.mutationResults.length;++d)c.mutationResults[d].transformResults.length>0&&(u=u.add(c.batch.mutations[d].key));return u}(e))).next(()=>t.localDocuments.getDocuments(n,i))})}function Sm(r){let e=M(r);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Ur.getLastRemoteSnapshotVersion(t))}function aw(r,e){let t=M(r),n=e.snapshotVersion,i=t.os;return t.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{let o=t.cs.newChangeBuffer({trackRemovals:!0});i=t.os;let c=[];e.targetChanges.forEach((f,m)=>{let v=i.get(m);if(!v)return;c.push(t.Ur.removeMatchingKeys(s,f.removedDocuments,m).next(()=>t.Ur.addMatchingKeys(s,f.addedDocuments,m)));let S=v.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(m)!==null?S=S.withResumeToken(pe.EMPTY_BYTE_STRING,q.min()).withLastLimboFreeSnapshotVersion(q.min()):f.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(f.resumeToken,n)),i=i.insert(m,S),function(k,N,z){return k.resumeToken.approximateByteSize()===0||N.snapshotVersion.toMicroseconds()-k.snapshotVersion.toMicroseconds()>=3e8?!0:z.addedDocuments.size+z.modifiedDocuments.size+z.removedDocuments.size>0}(v,S,f)&&c.push(t.Ur.updateTargetData(s,S))});let u=Le(),d=$();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(s,f))}),c.push(cw(s,o,e.documentUpdates).next(f=>{u=f.Ps,d=f.Is})),!n.isEqual(q.min())){let f=t.Ur.getLastRemoteSnapshotVersion(s).next(m=>t.Ur.setTargetsMetadata(s,s.currentSequenceNumber,n));c.push(f)}return b.waitFor(c).next(()=>o.apply(s)).next(()=>t.localDocuments.getLocalViewOfDocuments(s,u,d)).next(()=>u)}).then(s=>(t.os=i,s))}function cw(r,e,t){let n=$(),i=$();return t.forEach(s=>n=n.add(s)),e.getEntries(r,n).next(s=>{let o=Le();return t.forEach((c,u)=>{let d=s.get(c);u.isFoundDocument()!==d.isFoundDocument()&&(i=i.add(c)),u.isNoDocument()&&u.version.isEqual(q.min())?(e.removeEntry(c,u.readTime),o=o.insert(c,u)):!d.isValidDocument()||u.version.compareTo(d.version)>0||u.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(u),o=o.insert(c,u)):C("LocalStore","Ignoring outdated watch update for ",c,". Current version:",d.version," Watch version:",u.version)}),{Ps:o,Is:i}})}function uw(r,e){let t=M(r);return t.persistence.runTransaction("Get next mutation batch","readonly",n=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(n,e)))}function go(r,e){let t=M(r);return t.persistence.runTransaction("Allocate target","readwrite",n=>{let i;return t.Ur.getTargetData(n,e).next(s=>s?(i=s,b.resolve(i)):t.Ur.allocateTargetId(n).next(o=>(i=new ar(e,o,"TargetPurposeListen",n.currentSequenceNumber),t.Ur.addTargetData(n,i).next(()=>i))))}).then(n=>{let i=t.os.get(n.targetId);return(i===null||n.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.os=t.os.insert(n.targetId,n),t._s.set(e,n.targetId)),n})}async function ur(r,e,t){let n=M(r),i=n.os.get(e),s=t?"readwrite":"readwrite-primary";try{t||await n.persistence.runTransaction("Release target",s,o=>n.persistence.referenceDelegate.removeTarget(o,i))}catch(o){if(!jt(o))throw o;C("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}n.os=n.os.remove(e),n._s.delete(i.target)}function Wu(r,e,t){let n=M(r),i=q.min(),s=$();return n.persistence.runTransaction("Execute query","readwrite",o=>function(u,d,f){let m=M(u),v=m._s.get(f);return v!==void 0?b.resolve(m.os.get(v)):m.Ur.getTargetData(d,f)}(n,o,Fe(e)).next(c=>{if(c)return i=c.lastLimboFreeSnapshotVersion,n.Ur.getMatchingKeysForTargetId(o,c.targetId).next(u=>{s=u})}).next(()=>n.ss.getDocumentsMatchingQuery(o,e,t?i:q.min(),t?s:$())).next(c=>(Cm(n,$p(e),c),{documents:c,Ts:s})))}function Rm(r,e){let t=M(r),n=M(t.Ur),i=t.os.get(e);return i?Promise.resolve(i.target):t.persistence.runTransaction("Get target data","readonly",s=>n.ot(s,e).next(o=>o?o.target:null))}function Pm(r,e){let t=M(r),n=t.us.get(e)||q.min();return t.persistence.runTransaction("Get new document changes","readonly",i=>t.cs.getAllFromCollectionGroup(i,e,Sp(n,-1),Number.MAX_SAFE_INTEGER)).then(i=>(Cm(t,e,i),i))}function Cm(r,e,t){let n=r.us.get(e)||q.min();t.forEach((i,s)=>{s.readTime.compareTo(n)>0&&(n=s.readTime)}),r.us.set(e,n)}function fp(r,e){return`firestore_clients_${r}_${e}`}function pp(r,e,t){let n=`firestore_mutations_${r}_${t}`;return e.isAuthenticated()&&(n+=`_${e.uid}`),n}function Dc(r,e){return`firestore_targets_${r}_${e}`}var _o=class r{constructor(e,t,n,i){this.user=e,this.batchId=t,this.state=n,this.error=i}static Rs(e,t,n){let i=JSON.parse(n),s,o=typeof i=="object"&&["pending","acknowledged","rejected"].indexOf(i.state)!==-1&&(i.error===void 0||typeof i.error=="object");return o&&i.error&&(o=typeof i.error.message=="string"&&typeof i.error.code=="string",o&&(s=new x(i.error.code,i.error.message))),o?new r(e,t,i.state,s):(ce("SharedClientState",`Failed to parse mutation state for ID '${t}': ${n}`),null)}Vs(){let e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}},ai=class r{constructor(e,t,n){this.targetId=e,this.state=t,this.error=n}static Rs(e,t){let n=JSON.parse(t),i,s=typeof n=="object"&&["not-current","current","rejected"].indexOf(n.state)!==-1&&(n.error===void 0||typeof n.error=="object");return s&&n.error&&(s=typeof n.error.message=="string"&&typeof n.error.code=="string",s&&(i=new x(n.error.code,n.error.message))),s?new r(e,n.state,i):(ce("SharedClientState",`Failed to parse target state for ID '${e}': ${t}`),null)}Vs(){let e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}},yo=class r{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static Rs(e,t){let n=JSON.parse(t),i=typeof n=="object"&&n.activeTargetIds instanceof Array,s=xl();for(let o=0;i&&o<n.activeTargetIds.length;++o)i=Dp(n.activeTargetIds[o]),s=s.add(n.activeTargetIds[o]);return i?new r(e,s):(ce("SharedClientState",`Failed to parse client data for instance '${e}': ${t}`),null)}},Hu=class r{constructor(e,t){this.clientId=e,this.onlineState=t}static Rs(e){let t=JSON.parse(e);return typeof t=="object"&&["Unknown","Online","Offline"].indexOf(t.onlineState)!==-1&&typeof t.clientId=="string"?new r(t.clientId,t.onlineState):(ce("SharedClientState",`Failed to parse online state: ${e}`),null)}},Ei=class{constructor(){this.activeTargetIds=xl()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){let e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}},ci=class{constructor(e,t,n,i,s){this.window=e,this.ui=t,this.persistenceKey=n,this.ps=i,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.ys=this.ws.bind(this),this.Ss=new ie(K),this.started=!1,this.bs=[];let o=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=s,this.Ds=fp(this.persistenceKey,this.ps),this.vs=function(u){return`firestore_sequence_number_${u}`}(this.persistenceKey),this.Ss=this.Ss.insert(this.ps,new Ei),this.Cs=new RegExp(`^firestore_clients_${o}_([^_]*)$`),this.Fs=new RegExp(`^firestore_mutations_${o}_(\\d+)(?:_(.*))?$`),this.Ms=new RegExp(`^firestore_targets_${o}_(\\d+)$`),this.xs=function(u){return`firestore_online_state_${u}`}(this.persistenceKey),this.Os=function(u){return`firestore_bundle_loaded_v2_${u}`}(this.persistenceKey),this.window.addEventListener("storage",this.ys)}static D(e){return!(!e||!e.localStorage)}async start(){let e=await this.syncEngine.Qi();for(let n of e){if(n===this.ps)continue;let i=this.getItem(fp(this.persistenceKey,n));if(i){let s=yo.Rs(n,i);s&&(this.Ss=this.Ss.insert(s.clientId,s))}}this.Ns();let t=this.storage.getItem(this.xs);if(t){let n=this.Ls(t);n&&this.Bs(n)}for(let n of this.bs)this.ws(n);this.bs=[],this.window.addEventListener("pagehide",()=>this.shutdown()),this.started=!0}writeSequenceNumber(e){this.setItem(this.vs,JSON.stringify(e))}getAllActiveQueryTargets(){return this.ks(this.Ss)}isActiveQueryTarget(e){let t=!1;return this.Ss.forEach((n,i)=>{i.activeTargetIds.has(e)&&(t=!0)}),t}addPendingMutation(e){this.qs(e,"pending")}updateMutationState(e,t,n){this.qs(e,t,n),this.Qs(e)}addLocalQueryTarget(e,t=!0){let n="not-current";if(this.isActiveQueryTarget(e)){let i=this.storage.getItem(Dc(this.persistenceKey,e));if(i){let s=ai.Rs(e,i);s&&(n=s.state)}}return t&&this.Ks.fs(e),this.Ns(),n}removeLocalQueryTarget(e){this.Ks.gs(e),this.Ns()}isLocalQueryTarget(e){return this.Ks.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(Dc(this.persistenceKey,e))}updateQueryState(e,t,n){this.$s(e,t,n)}handleUserChange(e,t,n){t.forEach(i=>{this.Qs(i)}),this.currentUser=e,n.forEach(i=>{this.addPendingMutation(i)})}setOnlineState(e){this.Us(e)}notifyBundleLoaded(e){this.Ws(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.ys),this.removeItem(this.Ds),this.started=!1)}getItem(e){let t=this.storage.getItem(e);return C("SharedClientState","READ",e,t),t}setItem(e,t){C("SharedClientState","SET",e,t),this.storage.setItem(e,t)}removeItem(e){C("SharedClientState","REMOVE",e),this.storage.removeItem(e)}ws(e){let t=e;if(t.storageArea===this.storage){if(C("SharedClientState","EVENT",t.key,t.newValue),t.key===this.Ds)return void ce("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.ui.enqueueRetryable(async()=>{if(this.started){if(t.key!==null){if(this.Cs.test(t.key)){if(t.newValue==null){let n=this.Gs(t.key);return this.zs(n,null)}{let n=this.js(t.key,t.newValue);if(n)return this.zs(n.clientId,n)}}else if(this.Fs.test(t.key)){if(t.newValue!==null){let n=this.Hs(t.key,t.newValue);if(n)return this.Js(n)}}else if(this.Ms.test(t.key)){if(t.newValue!==null){let n=this.Ys(t.key,t.newValue);if(n)return this.Zs(n)}}else if(t.key===this.xs){if(t.newValue!==null){let n=this.Ls(t.newValue);if(n)return this.Bs(n)}}else if(t.key===this.vs){let n=function(s){let o=Se.oe;if(s!=null)try{let c=JSON.parse(s);U(typeof c=="number"),o=c}catch(c){ce("SharedClientState","Failed to read sequence number from WebStorage",c)}return o}(t.newValue);n!==Se.oe&&this.sequenceNumberHandler(n)}else if(t.key===this.Os){let n=this.Xs(t.newValue);await Promise.all(n.map(i=>this.syncEngine.eo(i)))}}}else this.bs.push(t)})}}get Ks(){return this.Ss.get(this.ps)}Ns(){this.setItem(this.Ds,this.Ks.Vs())}qs(e,t,n){let i=new _o(this.currentUser,e,t,n),s=pp(this.persistenceKey,this.currentUser,e);this.setItem(s,i.Vs())}Qs(e){let t=pp(this.persistenceKey,this.currentUser,e);this.removeItem(t)}Us(e){let t={clientId:this.ps,onlineState:e};this.storage.setItem(this.xs,JSON.stringify(t))}$s(e,t,n){let i=Dc(this.persistenceKey,e),s=new ai(e,t,n);this.setItem(i,s.Vs())}Ws(e){let t=JSON.stringify(Array.from(e));this.setItem(this.Os,t)}Gs(e){let t=this.Cs.exec(e);return t?t[1]:null}js(e,t){let n=this.Gs(e);return yo.Rs(n,t)}Hs(e,t){let n=this.Fs.exec(e),i=Number(n[1]),s=n[2]!==void 0?n[2]:null;return _o.Rs(new ye(s),i,t)}Ys(e,t){let n=this.Ms.exec(e),i=Number(n[1]);return ai.Rs(i,t)}Ls(e){return Hu.Rs(e)}Xs(e){return JSON.parse(e)}async Js(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.no(e.batchId,e.state,e.error);C("SharedClientState",`Ignoring mutation for non-active user ${e.user.uid}`)}Zs(e){return this.syncEngine.ro(e.targetId,e.state,e.error)}zs(e,t){let n=t?this.Ss.insert(e,t):this.Ss.remove(e),i=this.ks(this.Ss),s=this.ks(n),o=[],c=[];return s.forEach(u=>{i.has(u)||o.push(u)}),i.forEach(u=>{s.has(u)||c.push(u)}),this.syncEngine.io(o,c).then(()=>{this.Ss=n})}Bs(e){this.Ss.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}ks(e){let t=xl();return e.forEach((n,i)=>{t=t.unionWith(i.activeTargetIds)}),t}},vo=class{constructor(){this.so=new Ei,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,t,n){this.oo[e]=t}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new Ei,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}};var Qu=class{_o(e){}shutdown(){}};var Io=class{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){C("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(let e of this.ho)e(0)}lo(){C("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(let e of this.ho)e(1)}static D(){return typeof window!="undefined"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}};var Vs=null;function Nc(){return Vs===null?Vs=function(){return 268435456+Math.round(2147483648*Math.random())}():Vs++,"0x"+Vs.toString(16)}var lw={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};var Ju=class{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}};var be="WebChannelConnection",Yu=class extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;let n=t.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Do=n+"://"+t.host,this.vo=`projects/${i}/databases/${s}`,this.Co=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${s}`}get Fo(){return!1}Mo(t,n,i,s,o){let c=Nc(),u=this.xo(t,n.toUriEncodedString());C("RestConnection",`Sending RPC '${t}' ${c}:`,u,i);let d={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(d,s,o),this.No(t,u,d,i).then(f=>(C("RestConnection",`Received RPC '${t}' ${c}: `,f),f),f=>{throw ui("RestConnection",`RPC '${t}' ${c} failed with error: `,f,"url: ",u,"request:",i),f})}Lo(t,n,i,s,o,c){return this.Mo(t,n,i,s,o)}Oo(t,n,i){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+pr}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((s,o)=>t[o]=s),i&&i.headers.forEach((s,o)=>t[o]=s)}xo(t,n){let i=lw[t];return`${this.Do}/v1/${n}:${i}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,t,n,i){let s=Nc();return new Promise((o,c)=>{let u=new Tc;u.setWithCredentials(!0),u.listenOnce(Ac.COMPLETE,()=>{try{switch(u.getLastErrorCode()){case Jr.NO_ERROR:let f=u.getResponseJson();C(be,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(f)),o(f);break;case Jr.TIMEOUT:C(be,`RPC '${e}' ${s} timed out`),c(new x(P.DEADLINE_EXCEEDED,"Request time out"));break;case Jr.HTTP_ERROR:let m=u.getStatus();if(C(be,`RPC '${e}' ${s} failed with status:`,m,"response text:",u.getResponseText()),m>0){let v=u.getResponseJson();Array.isArray(v)&&(v=v[0]);let S=v==null?void 0:v.error;if(S&&S.status&&S.message){let D=function(N){let z=N.toLowerCase().replace(/_/g,"-");return Object.values(P).indexOf(z)>=0?z:P.UNKNOWN}(S.status);c(new x(D,S.message))}else c(new x(P.UNKNOWN,"Server responded with status "+u.getStatus()))}else c(new x(P.UNAVAILABLE,"Connection failed."));break;default:L()}}finally{C(be,`RPC '${e}' ${s} completed.`)}});let d=JSON.stringify(i);C(be,`RPC '${e}' ${s} sending request:`,i),u.send(t,"POST",d,n,15)})}Bo(e,t,n){let i=Nc(),s=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=Rc(),c=Sc(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(u.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(u.useFetchStreams=!0),this.Oo(u.initMessageHeaders,t,n),u.encodeInitMessageHeaders=!0;let f=s.join("");C(be,`Creating RPC '${e}' stream ${i}: ${f}`,u);let m=o.createWebChannel(f,u),v=!1,S=!1,D=new Ju({Io:N=>{S?C(be,`Not sending because RPC '${e}' stream ${i} is closed:`,N):(v||(C(be,`Opening RPC '${e}' stream ${i} transport.`),m.open(),v=!0),C(be,`RPC '${e}' stream ${i} sending:`,N),m.send(N))},To:()=>m.close()}),k=(N,z,j)=>{N.listen(z,B=>{try{j(B)}catch(W){setTimeout(()=>{throw W},0)}})};return k(m,Ln.EventType.OPEN,()=>{S||(C(be,`RPC '${e}' stream ${i} transport opened.`),D.yo())}),k(m,Ln.EventType.CLOSE,()=>{S||(S=!0,C(be,`RPC '${e}' stream ${i} transport closed`),D.So())}),k(m,Ln.EventType.ERROR,N=>{S||(S=!0,ui(be,`RPC '${e}' stream ${i} transport errored:`,N),D.So(new x(P.UNAVAILABLE,"The operation could not be completed")))}),k(m,Ln.EventType.MESSAGE,N=>{var z;if(!S){let j=N.data[0];U(!!j);let B=j,W=B.error||((z=B[0])===null||z===void 0?void 0:z.error);if(W){C(be,`RPC '${e}' stream ${i} received error:`,W);let Y=W.status,G=function(y){let w=de[y];if(w!==void 0)return im(w)}(Y),I=W.message;G===void 0&&(G=P.INTERNAL,I="Unknown error status: "+Y+" with message "+W.message),S=!0,D.So(new x(G,I)),m.close()}else C(be,`RPC '${e}' stream ${i} received:`,j),D.bo(j)}}),k(c,bc.STAT_EVENT,N=>{N.stat===Ns.PROXY?C(be,`RPC '${e}' stream ${i} detected buffering proxy`):N.stat===Ns.NOPROXY&&C(be,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{D.wo()},0),D}};function Dm(){return typeof window!="undefined"?window:null}function Bs(){return typeof document!="undefined"?document:null}function zo(r){return new hu(r,!0)}var wo=class{constructor(e,t,n=1e3,i=1.5,s=6e4){this.ui=e,this.timerId=t,this.ko=n,this.qo=i,this.Qo=s,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();let t=Math.floor(this.Ko+this.zo()),n=Math.max(0,Date.now()-this.Uo),i=Math.max(0,t-n);i>0&&C("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,i,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}};var Eo=class{constructor(e,t,n,i,s,o,c,u){this.ui=e,this.Ho=n,this.Jo=i,this.connection=s,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new wo(e,t)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,t){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():t&&t.code===P.RESOURCE_EXHAUSTED?(ce(t.toString()),ce("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):t&&t.code===P.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(t)}l_(){}auth(){this.state=1;let e=this.h_(this.Yo),t=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([n,i])=>{this.Yo===t&&this.P_(n,i)},n=>{e(()=>{let i=new x(P.UNKNOWN,"Fetching auth token failed: "+n.message);return this.I_(i)})})}P_(e,t){let n=this.h_(this.Yo);this.stream=this.T_(e,t),this.stream.Eo(()=>{n(()=>this.listener.Eo())}),this.stream.Ro(()=>{n(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(i=>{n(()=>this.I_(i))}),this.stream.onMessage(i=>{n(()=>++this.e_==1?this.E_(i):this.onNext(i))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return C("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return t=>{this.ui.enqueueAndForget(()=>this.Yo===e?t():(C("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}},Xu=class extends Eo{constructor(e,t,n,i,s,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,i,o),this.serializer=s}T_(e,t){return this.connection.Bo("Listen",e,t)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();let t=QI(this.serializer,e),n=function(s){if(!("targetChange"in s))return q.min();let o=s.targetChange;return o.targetIds&&o.targetIds.length?q.min():o.readTime?Ne(o.readTime):q.min()}(e);return this.listener.d_(t,n)}A_(e){let t={};t.database=pu(this.serializer),t.addTarget=function(s,o){let c,u=o.target;if(c=Qs(u)?{documents:lm(s,u)}:{query:hm(s,u)._t},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=sm(s,o.resumeToken);let d=du(s,o.expectedCount);d!==null&&(c.expectedCount=d)}else if(o.snapshotVersion.compareTo(q.min())>0){c.readTime=or(s,o.snapshotVersion.toTimestamp());let d=du(s,o.expectedCount);d!==null&&(c.expectedCount=d)}return c}(this.serializer,e);let n=YI(this.serializer,e);n&&(t.labels=n),this.a_(t)}R_(e){let t={};t.database=pu(this.serializer),t.removeTarget=e,this.a_(t)}},Zu=class extends Eo{constructor(e,t,n,i,s,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,i,o),this.serializer=s}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,t){return this.connection.Bo("Write",e,t)}E_(e){return U(!!e.streamToken),this.lastStreamToken=e.streamToken,U(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){U(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();let t=JI(e.writeResults,e.commitTime),n=Ne(e.commitTime);return this.listener.g_(n,t)}p_(){let e={};e.database=pu(this.serializer),this.a_(e)}m_(e){let t={streamToken:this.lastStreamToken,writes:e.map(n=>no(this.serializer,n))};this.a_(t)}};var el=class extends class{}{constructor(e,t,n,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=i,this.y_=!1}w_(){if(this.y_)throw new x(P.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,t,n,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.Mo(e,fu(t,n),i,s,o)).catch(s=>{throw s.name==="FirebaseError"?(s.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new x(P.UNKNOWN,s.toString())})}Lo(e,t,n,i,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,c])=>this.connection.Lo(e,fu(t,n),i,o,c,s)).catch(o=>{throw o.name==="FirebaseError"?(o.code===P.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new x(P.UNKNOWN,o.toString())})}terminate(){this.y_=!0,this.connection.terminate()}},tl=class{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){let t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(ce(t),this.D_=!1):C("OnlineStateTracker",t)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}};var nl=class{constructor(e,t,n,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=s,this.k_._o(o=>{n.enqueueAndForget(async()=>{An(this)&&(C("RemoteStore","Restarting streams for network reachability change."),await async function(u){let d=M(u);d.L_.add(4),await Ni(d),d.q_.set("Unknown"),d.L_.delete(4),await Go(d)}(this))})}),this.q_=new tl(n,i)}};async function Go(r){if(An(r))for(let e of r.B_)await e(!0)}async function Ni(r){for(let e of r.B_)await e(!1)}function Ko(r,e){let t=M(r);t.N_.has(e.targetId)||(t.N_.set(e.targetId,e),ql(t)?Bl(t):gr(t).r_()&&Ul(t,e))}function lr(r,e){let t=M(r),n=gr(t);t.N_.delete(e),n.r_()&&Nm(t,e),t.N_.size===0&&(n.r_()?n.o_():An(t)&&t.q_.set("Unknown"))}function Ul(r,e){if(r.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(q.min())>0){let t=r.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}gr(r).A_(e)}function Nm(r,e){r.Q_.xe(e),gr(r).R_(e)}function Bl(r){r.Q_=new lu({getRemoteKeysForTarget:e=>r.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>r.N_.get(e)||null,tt:()=>r.datastore.serializer.databaseId}),gr(r).start(),r.q_.v_()}function ql(r){return An(r)&&!gr(r).n_()&&r.N_.size>0}function An(r){return M(r).L_.size===0}function km(r){r.Q_=void 0}async function hw(r){r.q_.set("Online")}async function dw(r){r.N_.forEach((e,t)=>{Ul(r,e)})}async function fw(r,e){km(r),ql(r)?(r.q_.M_(e),Bl(r)):r.q_.set("Unknown")}async function pw(r,e,t){if(r.q_.set("Online"),e instanceof Zs&&e.state===2&&e.cause)try{await async function(i,s){let o=s.cause;for(let c of s.targetIds)i.N_.has(c)&&(await i.remoteSyncer.rejectListen(c,o),i.N_.delete(c),i.Q_.removeTarget(c))}(r,e)}catch(n){C("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),n),await To(r,n)}else if(e instanceof Hn?r.Q_.Ke(e):e instanceof Xs?r.Q_.He(e):r.Q_.We(e),!t.isEqual(q.min()))try{let n=await Sm(r.localStore);t.compareTo(n)>=0&&await function(s,o){let c=s.Q_.rt(o);return c.targetChanges.forEach((u,d)=>{if(u.resumeToken.approximateByteSize()>0){let f=s.N_.get(d);f&&s.N_.set(d,f.withResumeToken(u.resumeToken,o))}}),c.targetMismatches.forEach((u,d)=>{let f=s.N_.get(u);if(!f)return;s.N_.set(u,f.withResumeToken(pe.EMPTY_BYTE_STRING,f.snapshotVersion)),Nm(s,u);let m=new ar(f.target,u,d,f.sequenceNumber);Ul(s,m)}),s.remoteSyncer.applyRemoteEvent(c)}(r,t)}catch(n){C("RemoteStore","Failed to raise snapshot:",n),await To(r,n)}}async function To(r,e,t){if(!jt(e))throw e;r.L_.add(1),await Ni(r),r.q_.set("Offline"),t||(t=()=>Sm(r.localStore)),r.asyncQueue.enqueueRetryable(async()=>{C("RemoteStore","Retrying IndexedDB access"),await t(),r.L_.delete(1),await Go(r)})}function Om(r,e){return e().catch(t=>To(r,t,e))}async function mr(r){let e=M(r),t=Bt(e),n=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;mw(e);)try{let i=await uw(e.localStore,n);if(i===null){e.O_.length===0&&t.o_();break}n=i.batchId,gw(e,i)}catch(i){await To(e,i)}xm(e)&&Vm(e)}function mw(r){return An(r)&&r.O_.length<10}function gw(r,e){r.O_.push(e);let t=Bt(r);t.r_()&&t.V_&&t.m_(e.mutations)}function xm(r){return An(r)&&!Bt(r).n_()&&r.O_.length>0}function Vm(r){Bt(r).start()}async function _w(r){Bt(r).p_()}async function yw(r){let e=Bt(r);for(let t of r.O_)e.m_(t.mutations)}async function vw(r,e,t){let n=r.O_.shift(),i=au.from(n,e,t);await Om(r,()=>r.remoteSyncer.applySuccessfulWrite(i)),await mr(r)}async function Iw(r,e){e&&Bt(r).V_&&await async function(n,i){if(function(o){return qI(o)&&o!==P.ABORTED}(i.code)){let s=n.O_.shift();Bt(n).s_(),await Om(n,()=>n.remoteSyncer.rejectFailedWrite(s.batchId,i)),await mr(n)}}(r,e),xm(r)&&Vm(r)}async function mp(r,e){let t=M(r);t.asyncQueue.verifyOperationInProgress(),C("RemoteStore","RemoteStore received new credentials");let n=An(t);t.L_.add(3),await Ni(t),n&&t.q_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.L_.delete(3),await Go(t)}async function rl(r,e){let t=M(r);e?(t.L_.delete(2),await Go(t)):e||(t.L_.add(2),await Ni(t),t.q_.set("Unknown"))}function gr(r){return r.K_||(r.K_=function(t,n,i){let s=M(t);return s.w_(),new Xu(n,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(r.datastore,r.asyncQueue,{Eo:hw.bind(null,r),Ro:dw.bind(null,r),mo:fw.bind(null,r),d_:pw.bind(null,r)}),r.B_.push(async e=>{e?(r.K_.s_(),ql(r)?Bl(r):r.q_.set("Unknown")):(await r.K_.stop(),km(r))})),r.K_}function Bt(r){return r.U_||(r.U_=function(t,n,i){let s=M(t);return s.w_(),new Zu(n,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(r.datastore,r.asyncQueue,{Eo:()=>Promise.resolve(),Ro:_w.bind(null,r),mo:Iw.bind(null,r),f_:yw.bind(null,r),g_:vw.bind(null,r)}),r.B_.push(async e=>{e?(r.U_.s_(),await mr(r)):(await r.U_.stop(),r.O_.length>0&&(C("RemoteStore",`Stopping write stream with ${r.O_.length} pending writes`),r.O_=[]))})),r.U_}var il=class r{constructor(e,t,n,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=i,this.removalCallback=s,this.deferred=new ze,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,i,s){let o=Date.now()+n,c=new r(e,t,o,i,s);return c.start(n),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new x(P.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}};function jl(r,e){if(ce("AsyncQueue",`${e}: ${r}`),jt(r))return new x(P.UNAVAILABLE,`${e}: ${r}`);throw r}var Ao=class r{constructor(e){this.comparator=e?(t,n)=>e(t,n)||V.comparator(t.key,n.key):(t,n)=>V.comparator(t.key,n.key),this.keyedMap=ti(),this.sortedSet=new ie(this.comparator)}static emptySet(e){return new r(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){let t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,n)=>(e(t),!1))}add(e){let t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){let t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof r)||this.size!==e.size)return!1;let t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){let i=t.getNext().key,s=n.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){let e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){let n=new r;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}};var bo=class{constructor(){this.W_=new ie(V.comparator)}track(e){let t=e.doc.key,n=this.W_.get(t);n?e.type!==0&&n.type===3?this.W_=this.W_.insert(t,e):e.type===3&&n.type!==1?this.W_=this.W_.insert(t,{type:n.type,doc:e.doc}):e.type===2&&n.type===2?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):e.type===2&&n.type===0?this.W_=this.W_.insert(t,{type:0,doc:e.doc}):e.type===1&&n.type===0?this.W_=this.W_.remove(t):e.type===1&&n.type===2?this.W_=this.W_.insert(t,{type:1,doc:n.doc}):e.type===0&&n.type===1?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):L():this.W_=this.W_.insert(t,e)}G_(){let e=[];return this.W_.inorderTraversal((t,n)=>{e.push(n)}),e}},hr=class r{constructor(e,t,n,i,s,o,c,u,d){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=i,this.mutatedKeys=s,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=d}static fromInitialDocuments(e,t,n,i,s){let o=[];return t.forEach(c=>{o.push({type:0,doc:c})}),new r(e,t,Ao.emptySet(t),o,n,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&jo(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;let t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==n[i].type||!t[i].doc.isEqual(n[i].doc))return!1;return!0}};var sl=class{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}},ol=class{constructor(){this.queries=gp(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(t,n){let i=M(t),s=i.queries;i.queries=gp(),s.forEach((o,c)=>{for(let u of c.j_)u.onError(n)})})(this,new x(P.ABORTED,"Firestore shutting down"))}};function gp(){return new rt(r=>Kp(r),jo)}async function Lm(r,e){let t=M(r),n=3,i=e.query,s=t.queries.get(i);s?!s.H_()&&e.J_()&&(n=2):(s=new sl,n=e.J_()?0:1);try{switch(n){case 0:s.z_=await t.onListen(i,!0);break;case 1:s.z_=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(o){let c=jl(o,`Initialization of query '${jn(e.query)}' failed`);return void e.onError(c)}t.queries.set(i,s),s.j_.push(e),e.Z_(t.onlineState),s.z_&&e.X_(s.z_)&&zl(t)}async function Mm(r,e){let t=M(r),n=e.query,i=3,s=t.queries.get(n);if(s){let o=s.j_.indexOf(e);o>=0&&(s.j_.splice(o,1),s.j_.length===0?i=e.J_()?0:1:!s.H_()&&e.J_()&&(i=2))}switch(i){case 0:return t.queries.delete(n),t.onUnlisten(n,!0);case 1:return t.queries.delete(n),t.onUnlisten(n,!1);case 2:return t.onLastRemoteStoreUnlisten(n);default:return}}function ww(r,e){let t=M(r),n=!1;for(let i of e){let s=i.query,o=t.queries.get(s);if(o){for(let c of o.j_)c.X_(i)&&(n=!0);o.z_=i}}n&&zl(t)}function Ew(r,e,t){let n=M(r),i=n.queries.get(e);if(i)for(let s of i.j_)s.onError(t);n.queries.delete(e)}function zl(r){r.Y_.forEach(e=>{e.next()})}var al,_p;(_p=al||(al={})).ea="default",_p.Cache="cache";var So=class{constructor(e,t,n){this.query=e,this.ta=t,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=n||{}}X_(e){if(!this.options.includeMetadataChanges){let n=[];for(let i of e.docChanges)i.type!==3&&n.push(i);e=new hr(e.query,e.docs,e.oldDocs,n,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.na?this.ia(e)&&(this.ta.next(e),t=!0):this.sa(e,this.onlineState)&&(this.oa(e),t=!0),this.ra=e,t}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let t=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),t=!0),t}sa(e,t){if(!e.fromCache||!this.J_())return!0;let n=t!=="Offline";return(!this.options._a||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}ia(e){if(e.docChanges.length>0)return!0;let t=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}oa(e){e=hr.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==al.Cache}};var Ro=class{constructor(e){this.key=e}},Po=class{constructor(e){this.key=e}},cl=class{constructor(e,t){this.query=e,this.Ta=t,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=$(),this.mutatedKeys=$(),this.Aa=Wp(e),this.Ra=new Ao(this.Aa)}get Va(){return this.Ta}ma(e,t){let n=t?t.fa:new bo,i=t?t.Ra:this.Ra,s=t?t.mutatedKeys:this.mutatedKeys,o=i,c=!1,u=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,d=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((f,m)=>{let v=i.get(f),S=Di(this.query,m)?m:null,D=!!v&&this.mutatedKeys.has(v.key),k=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations),N=!1;v&&S?v.data.isEqual(S.data)?D!==k&&(n.track({type:3,doc:S}),N=!0):this.ga(v,S)||(n.track({type:2,doc:S}),N=!0,(u&&this.Aa(S,u)>0||d&&this.Aa(S,d)<0)&&(c=!0)):!v&&S?(n.track({type:0,doc:S}),N=!0):v&&!S&&(n.track({type:1,doc:v}),N=!0,(u||d)&&(c=!0)),N&&(S?(o=o.add(S),s=k?s.add(f):s.delete(f)):(o=o.delete(f),s=s.delete(f)))}),this.query.limit!==null)for(;o.size>this.query.limit;){let f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),s=s.delete(f.key),n.track({type:1,doc:f})}return{Ra:o,fa:n,ns:c,mutatedKeys:s}}ga(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,i){let s=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;let o=e.fa.G_();o.sort((f,m)=>function(S,D){let k=N=>{switch(N){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return L()}};return k(S)-k(D)}(f.type,m.type)||this.Aa(f.doc,m.doc)),this.pa(n),i=i!=null&&i;let c=t&&!i?this.ya():[],u=this.da.size===0&&this.current&&!i?1:0,d=u!==this.Ea;return this.Ea=u,o.length!==0||d?{snapshot:new hr(this.query,e.Ra,s,o,e.mutatedKeys,u===0,d,!1,!!n&&n.resumeToken.approximateByteSize()>0),wa:c}:{wa:c}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new bo,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(t=>this.Ta=this.Ta.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ta=this.Ta.delete(t)),this.current=e.current)}ya(){if(!this.current)return[];let e=this.da;this.da=$(),this.Ra.forEach(n=>{this.Sa(n.key)&&(this.da=this.da.add(n.key))});let t=[];return e.forEach(n=>{this.da.has(n)||t.push(new Po(n))}),this.da.forEach(n=>{e.has(n)||t.push(new Ro(n))}),t}ba(e){this.Ta=e.Ts,this.da=$();let t=this.ma(e.documents);return this.applyChanges(t,!0)}Da(){return hr.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}},ul=class{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}},ll=class{constructor(e){this.key=e,this.va=!1}},hl=class{constructor(e,t,n,i,s,o){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=o,this.Ca={},this.Fa=new rt(c=>Kp(c),jo),this.Ma=new Map,this.xa=new Set,this.Oa=new ie(V.comparator),this.Na=new Map,this.La=new wi,this.Ba={},this.ka=new Map,this.qa=cr.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}};async function Tw(r,e,t=!0){let n=$o(r),i,s=n.Fa.get(e);return s?(n.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.Da()):i=await Fm(n,e,t,!0),i}async function Aw(r,e){let t=$o(r);await Fm(t,e,!0,!1)}async function Fm(r,e,t,n){let i=await go(r.localStore,Fe(e)),s=i.targetId,o=r.sharedClientState.addLocalQueryTarget(s,t),c;return n&&(c=await Gl(r,e,s,o==="current",i.resumeToken)),r.isPrimaryClient&&t&&Ko(r.remoteStore,i),c}async function Gl(r,e,t,n,i){r.Ka=(m,v,S)=>async function(k,N,z,j){let B=N.view.ma(z);B.ns&&(B=await Wu(k.localStore,N.query,!1).then(({documents:I})=>N.view.ma(I,B)));let W=j&&j.targetChanges.get(N.targetId),Y=j&&j.targetMismatches.get(N.targetId)!=null,G=N.view.applyChanges(B,k.isPrimaryClient,W,Y);return dl(k,N.targetId,G.wa),G.snapshot}(r,m,v,S);let s=await Wu(r.localStore,e,!0),o=new cl(e,s.Ts),c=o.ma(s.documents),u=vi.createSynthesizedTargetChangeForCurrentChange(t,n&&r.onlineState!=="Offline",i),d=o.applyChanges(c,r.isPrimaryClient,u);dl(r,t,d.wa);let f=new ul(e,t,o);return r.Fa.set(e,f),r.Ma.has(t)?r.Ma.get(t).push(e):r.Ma.set(t,[e]),d.snapshot}async function bw(r,e,t){let n=M(r),i=n.Fa.get(e),s=n.Ma.get(i.targetId);if(s.length>1)return n.Ma.set(i.targetId,s.filter(o=>!jo(o,e))),void n.Fa.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(i.targetId),n.sharedClientState.isActiveQueryTarget(i.targetId)||await ur(n.localStore,i.targetId,!1).then(()=>{n.sharedClientState.clearQueryState(i.targetId),t&&lr(n.remoteStore,i.targetId),dr(n,i.targetId)}).catch(qt)):(dr(n,i.targetId),await ur(n.localStore,i.targetId,!0))}async function Sw(r,e){let t=M(r),n=t.Fa.get(e),i=t.Ma.get(n.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(n.targetId),lr(t.remoteStore,n.targetId))}async function Rw(r,e,t){let n=Hl(r);try{let i=await function(o,c){let u=M(o),d=ue.now(),f=c.reduce((S,D)=>S.add(D.key),$()),m,v;return u.persistence.runTransaction("Locally write mutations","readwrite",S=>{let D=Le(),k=$();return u.cs.getEntries(S,f).next(N=>{D=N,D.forEach((z,j)=>{j.isValidDocument()||(k=k.add(z))})}).next(()=>u.localDocuments.getOverlayedDocuments(S,D)).next(N=>{m=N;let z=[];for(let j of c){let B=BI(j,m.get(j.key).overlayedDocument);B!=null&&z.push(new He(j.key,B,Fp(B.value.mapValue),Me.exists(!0)))}return u.mutationQueue.addMutationBatch(S,d,z,c)}).next(N=>{v=N;let z=N.applyToLocalDocumentSet(m,k);return u.documentOverlayCache.saveOverlays(S,N.batchId,z)})}).then(()=>({batchId:v.batchId,changes:Qp(m)}))}(n.localStore,e);n.sharedClientState.addPendingMutation(i.batchId),function(o,c,u){let d=o.Ba[o.currentUser.toKey()];d||(d=new ie(K)),d=d.insert(c,u),o.Ba[o.currentUser.toKey()]=d}(n,i.batchId,t),await zt(n,i.changes),await mr(n.remoteStore)}catch(i){let s=jl(i,"Failed to persist write");t.reject(s)}}async function Um(r,e){let t=M(r);try{let n=await aw(t.localStore,e);e.targetChanges.forEach((i,s)=>{let o=t.Na.get(s);o&&(U(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?o.va=!0:i.modifiedDocuments.size>0?U(o.va):i.removedDocuments.size>0&&(U(o.va),o.va=!1))}),await zt(t,n,e)}catch(n){await qt(n)}}function yp(r,e,t){let n=M(r);if(n.isPrimaryClient&&t===0||!n.isPrimaryClient&&t===1){let i=[];n.Fa.forEach((s,o)=>{let c=o.view.Z_(e);c.snapshot&&i.push(c.snapshot)}),function(o,c){let u=M(o);u.onlineState=c;let d=!1;u.queries.forEach((f,m)=>{for(let v of m.j_)v.Z_(c)&&(d=!0)}),d&&zl(u)}(n.eventManager,e),i.length&&n.Ca.d_(i),n.onlineState=e,n.isPrimaryClient&&n.sharedClientState.setOnlineState(e)}}async function Pw(r,e,t){let n=M(r);n.sharedClientState.updateQueryState(e,"rejected",t);let i=n.Na.get(e),s=i&&i.key;if(s){let o=new ie(V.comparator);o=o.insert(s,Ie.newNoDocument(s,q.min()));let c=$().add(s),u=new yi(q.min(),new Map,new ie(K),o,c);await Um(n,u),n.Oa=n.Oa.remove(s),n.Na.delete(e),Wl(n)}else await ur(n.localStore,e,!1).then(()=>dr(n,e,t)).catch(qt)}async function Cw(r,e){let t=M(r),n=e.batch.batchId;try{let i=await ow(t.localStore,e);$l(t,n,null),Kl(t,n),t.sharedClientState.updateMutationState(n,"acknowledged"),await zt(t,i)}catch(i){await qt(i)}}async function Dw(r,e,t){let n=M(r);try{let i=await function(o,c){let u=M(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let f;return u.mutationQueue.lookupMutationBatch(d,c).next(m=>(U(m!==null),f=m.keys(),u.mutationQueue.removeMutationBatch(d,m))).next(()=>u.mutationQueue.performConsistencyCheck(d)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(d,f,c)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,f)).next(()=>u.localDocuments.getDocuments(d,f))})}(n.localStore,e);$l(n,e,t),Kl(n,e),n.sharedClientState.updateMutationState(e,"rejected",t),await zt(n,i)}catch(i){await qt(i)}}function Kl(r,e){(r.ka.get(e)||[]).forEach(t=>{t.resolve()}),r.ka.delete(e)}function $l(r,e,t){let n=M(r),i=n.Ba[n.currentUser.toKey()];if(i){let s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),n.Ba[n.currentUser.toKey()]=i}}function dr(r,e,t=null){r.sharedClientState.removeLocalQueryTarget(e);for(let n of r.Ma.get(e))r.Fa.delete(n),t&&r.Ca.$a(n,t);r.Ma.delete(e),r.isPrimaryClient&&r.La.gr(e).forEach(n=>{r.La.containsKey(n)||Bm(r,n)})}function Bm(r,e){r.xa.delete(e.path.canonicalString());let t=r.Oa.get(e);t!==null&&(lr(r.remoteStore,t),r.Oa=r.Oa.remove(e),r.Na.delete(t),Wl(r))}function dl(r,e,t){for(let n of t)n instanceof Ro?(r.La.addReference(n.key,e),Nw(r,n)):n instanceof Po?(C("SyncEngine","Document no longer in limbo: "+n.key),r.La.removeReference(n.key,e),r.La.containsKey(n.key)||Bm(r,n.key)):L()}function Nw(r,e){let t=e.key,n=t.path.canonicalString();r.Oa.get(t)||r.xa.has(n)||(C("SyncEngine","New document in limbo: "+t),r.xa.add(n),Wl(r))}function Wl(r){for(;r.xa.size>0&&r.Oa.size<r.maxConcurrentLimboResolutions;){let e=r.xa.values().next().value;r.xa.delete(e);let t=new V(te.fromString(e)),n=r.qa.next();r.Na.set(n,new ll(t)),r.Oa=r.Oa.insert(t,n),Ko(r.remoteStore,new ar(Fe(Ci(t.path)),n,"TargetPurposeLimboResolution",Se.oe))}}async function zt(r,e,t){let n=M(r),i=[],s=[],o=[];n.Fa.isEmpty()||(n.Fa.forEach((c,u)=>{o.push(n.Ka(u,e,t).then(d=>{var f;if((d||t)&&n.isPrimaryClient){let m=d?!d.fromCache:(f=t==null?void 0:t.targetChanges.get(u.targetId))===null||f===void 0?void 0:f.current;n.sharedClientState.updateQueryState(u.targetId,m?"current":"not-current")}if(d){i.push(d);let m=Gu.Wi(u.targetId,d);s.push(m)}}))}),await Promise.all(o),n.Ca.d_(i),await async function(u,d){let f=M(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",m=>b.forEach(d,v=>b.forEach(v.$i,S=>f.persistence.referenceDelegate.addReference(m,v.targetId,S)).next(()=>b.forEach(v.Ui,S=>f.persistence.referenceDelegate.removeReference(m,v.targetId,S)))))}catch(m){if(!jt(m))throw m;C("LocalStore","Failed to update sequence numbers: "+m)}for(let m of d){let v=m.targetId;if(!m.fromCache){let S=f.os.get(v),D=S.snapshotVersion,k=S.withLastLimboFreeSnapshotVersion(D);f.os=f.os.insert(v,k)}}}(n.localStore,s))}async function kw(r,e){let t=M(r);if(!t.currentUser.isEqual(e)){C("SyncEngine","User change. New user:",e.toKey());let n=await bm(t.localStore,e);t.currentUser=e,function(s,o){s.ka.forEach(c=>{c.forEach(u=>{u.reject(new x(P.CANCELLED,o))})}),s.ka.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,n.removedBatchIds,n.addedBatchIds),await zt(t,n.hs)}}function Ow(r,e){let t=M(r),n=t.Na.get(e);if(n&&n.va)return $().add(n.key);{let i=$(),s=t.Ma.get(e);if(!s)return i;for(let o of s){let c=t.Fa.get(o);i=i.unionWith(c.view.Va)}return i}}async function xw(r,e){let t=M(r),n=await Wu(t.localStore,e.query,!0),i=e.view.ba(n);return t.isPrimaryClient&&dl(t,e.targetId,i.wa),i}async function Vw(r,e){let t=M(r);return Pm(t.localStore,e).then(n=>zt(t,n))}async function Lw(r,e,t,n){let i=M(r),s=await function(c,u){let d=M(c),f=M(d.mutationQueue);return d.persistence.runTransaction("Lookup mutation documents","readonly",m=>f.Mn(m,u).next(v=>v?d.localDocuments.getDocuments(m,v):b.resolve(null)))}(i.localStore,e);s!==null?(t==="pending"?await mr(i.remoteStore):t==="acknowledged"||t==="rejected"?($l(i,e,n||null),Kl(i,e),function(c,u){M(M(c).mutationQueue).On(u)}(i.localStore,e)):L(),await zt(i,s)):C("SyncEngine","Cannot apply mutation batch with id: "+e)}async function Mw(r,e){let t=M(r);if($o(t),Hl(t),e===!0&&t.Qa!==!0){let n=t.sharedClientState.getAllActiveQueryTargets(),i=await vp(t,n.toArray());t.Qa=!0,await rl(t.remoteStore,!0);for(let s of i)Ko(t.remoteStore,s)}else if(e===!1&&t.Qa!==!1){let n=[],i=Promise.resolve();t.Ma.forEach((s,o)=>{t.sharedClientState.isLocalQueryTarget(o)?n.push(o):i=i.then(()=>(dr(t,o),ur(t.localStore,o,!0))),lr(t.remoteStore,o)}),await i,await vp(t,n),function(o){let c=M(o);c.Na.forEach((u,d)=>{lr(c.remoteStore,d)}),c.La.pr(),c.Na=new Map,c.Oa=new ie(V.comparator)}(t),t.Qa=!1,await rl(t.remoteStore,!1)}}async function vp(r,e,t){let n=M(r),i=[],s=[];for(let o of e){let c,u=n.Ma.get(o);if(u&&u.length!==0){c=await go(n.localStore,Fe(u[0]));for(let d of u){let f=n.Fa.get(d),m=await xw(n,f);m.snapshot&&s.push(m.snapshot)}}else{let d=await Rm(n.localStore,o);c=await go(n.localStore,d),await Gl(n,qm(d),o,!1,c.resumeToken)}i.push(c)}return n.Ca.d_(s),i}function qm(r){return Gp(r.path,r.collectionGroup,r.orderBy,r.filters,r.limit,"F",r.startAt,r.endAt)}function Fw(r){return function(t){return M(M(t).persistence).Qi()}(M(r).localStore)}async function Uw(r,e,t,n){let i=M(r);if(i.Qa)return void C("SyncEngine","Ignoring unexpected query state notification.");let s=i.Ma.get(e);if(s&&s.length>0)switch(t){case"current":case"not-current":{let o=await Pm(i.localStore,$p(s[0])),c=yi.createSynthesizedRemoteEventForCurrentChange(e,t==="current",pe.EMPTY_BYTE_STRING);await zt(i,o,c);break}case"rejected":await ur(i.localStore,e,!0),dr(i,e,n);break;default:L()}}async function Bw(r,e,t){let n=$o(r);if(n.Qa){for(let i of e){if(n.Ma.has(i)&&n.sharedClientState.isActiveQueryTarget(i)){C("SyncEngine","Adding an already active target "+i);continue}let s=await Rm(n.localStore,i),o=await go(n.localStore,s);await Gl(n,qm(s),o.targetId,!1,o.resumeToken),Ko(n.remoteStore,o)}for(let i of t)n.Ma.has(i)&&await ur(n.localStore,i,!1).then(()=>{lr(n.remoteStore,i),dr(n,i)}).catch(qt)}}function $o(r){let e=M(r);return e.remoteStore.remoteSyncer.applyRemoteEvent=Um.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Ow.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Pw.bind(null,e),e.Ca.d_=ww.bind(null,e.eventManager),e.Ca.$a=Ew.bind(null,e.eventManager),e}function Hl(r){let e=M(r);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Cw.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Dw.bind(null,e),e}var wn=class{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=zo(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,t){return null}Ha(e,t){return null}za(e){return Am(this.persistence,new mo,e.initialUser,this.serializer)}Ga(e){return new fo(po.Zr,this.serializer)}Wa(e){return new vo}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}};wn.provider={build:()=>new wn};var Co=class extends wn{constructor(e,t,n){super(),this.Ja=e,this.cacheSizeBytes=t,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.Ja.initialize(this,e),await Hl(this.Ja.syncEngine),await mr(this.Ja.remoteStore),await this.persistence.yi(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}za(e){return Am(this.persistence,new mo,e.initialUser,this.serializer)}ja(e,t){let n=this.persistence.referenceDelegate.garbageCollector;return new Pu(n,e.asyncQueue,t)}Ha(e,t){let n=new Gc(t,this.persistence);return new zc(e.asyncQueue,n)}Ga(e){let t=Fl(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),n=this.cacheSizeBytes!==void 0?je.withCacheSize(this.cacheSizeBytes):je.DEFAULT;return new zu(this.synchronizeTabs,t,e.clientId,n,e.asyncQueue,Dm(),Bs(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Wa(e){return new vo}},fl=class extends Co{constructor(e,t){super(e,t,!1),this.Ja=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);let t=this.Ja.syncEngine;this.sharedClientState instanceof ci&&(this.sharedClientState.syncEngine={no:Lw.bind(null,t),ro:Uw.bind(null,t),io:Bw.bind(null,t),Qi:Fw.bind(null,t),eo:Vw.bind(null,t)},await this.sharedClientState.start()),await this.persistence.yi(async n=>{await Mw(this.Ja.syncEngine,n),this.gcScheduler&&(n&&!this.gcScheduler.started?this.gcScheduler.start():n||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(n&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():n||this.indexBackfillerScheduler.stop())})}Wa(e){let t=Dm();if(!ci.D(t))throw new x(P.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");let n=Fl(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new ci(t,e.asyncQueue,n,e.clientId,e.initialUser)}},En=class{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>yp(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=kw.bind(null,this.syncEngine),await rl(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new ol}()}createDatastore(e){let t=zo(e.databaseInfo.databaseId),n=function(s){return new Yu(s)}(e.databaseInfo);return function(s,o,c,u){return new el(s,o,c,u)}(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return function(n,i,s,o,c){return new nl(n,i,s,o,c)}(this.localStore,this.datastore,e.asyncQueue,t=>yp(this.syncEngine,t,0),function(){return Io.D()?new Io:new Qu}())}createSyncEngine(e,t){return function(i,s,o,c,u,d,f){let m=new hl(i,s,o,c,u,d);return f&&(m.Qa=!0),m}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(i){let s=M(i);C("RemoteStore","RemoteStore shutting down."),s.L_.add(5),await Ni(s),s.k_.shutdown(),s.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}};En.provider={build:()=>new En};var Do=class{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):ce("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,t){setTimeout(()=>{this.muted||e(t)},0)}};var pl=class{constructor(e,t,n,i,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this.databaseInfo=i,this.user=ye.UNAUTHENTICATED,this.clientId=qs.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(n,async o=>{C("FirestoreClient","Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(n,o=>(C("FirestoreClient","Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();let e=new ze;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){let n=jl(t,"Failed to shutdown persistence");e.reject(n)}}),e.promise}};async function kc(r,e){r.asyncQueue.verifyOperationInProgress(),C("FirestoreClient","Initializing OfflineComponentProvider");let t=r.configuration;await e.initialize(t);let n=t.initialUser;r.setCredentialChangeListener(async i=>{n.isEqual(i)||(await bm(e.localStore,i),n=i)}),e.persistence.setDatabaseDeletedListener(()=>r.terminate()),r._offlineComponents=e}async function Ip(r,e){r.asyncQueue.verifyOperationInProgress();let t=await qw(r);C("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,r.configuration),r.setCredentialChangeListener(n=>mp(e.remoteStore,n)),r.setAppCheckTokenChangeListener((n,i)=>mp(e.remoteStore,i)),r._onlineComponents=e}async function qw(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){C("FirestoreClient","Using user provided OfflineComponentProvider");try{await kc(r,r._uninitializedComponentsProvider._offline)}catch(e){let t=e;if(!function(i){return i.name==="FirebaseError"?i.code===P.FAILED_PRECONDITION||i.code===P.UNIMPLEMENTED:!(typeof DOMException!="undefined"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(t))throw t;ui("Error using user provided cache. Falling back to memory cache: "+t),await kc(r,new wn)}}else C("FirestoreClient","Using default OfflineComponentProvider"),await kc(r,new wn);return r._offlineComponents}async function jm(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(C("FirestoreClient","Using user provided OnlineComponentProvider"),await Ip(r,r._uninitializedComponentsProvider._online)):(C("FirestoreClient","Using default OnlineComponentProvider"),await Ip(r,new En))),r._onlineComponents}function jw(r){return jm(r).then(e=>e.syncEngine)}async function ml(r){let e=await jm(r),t=e.eventManager;return t.onListen=Tw.bind(null,e.syncEngine),t.onUnlisten=bw.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=Aw.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=Sw.bind(null,e.syncEngine),t}function zw(r,e,t={}){let n=new ze;return r.asyncQueue.enqueueAndForget(async()=>function(s,o,c,u,d){let f=new Do({next:v=>{f.Za(),o.enqueueAndForget(()=>Mm(s,m));let S=v.docs.has(c);!S&&v.fromCache?d.reject(new x(P.UNAVAILABLE,"Failed to get document because the client is offline.")):S&&v.fromCache&&u&&u.source==="server"?d.reject(new x(P.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(v)},error:v=>d.reject(v)}),m=new So(Ci(c.path),f,{includeMetadataChanges:!0,_a:!0});return Lm(s,m)}(await ml(r),r.asyncQueue,e,t,n)),n.promise}function zm(r){let e={};return r.timeoutSeconds!==void 0&&(e.timeoutSeconds=r.timeoutSeconds),e}var wp=new Map;function Gm(r,e,t){if(!t)throw new x(P.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${e}.`)}function Gw(r,e,t,n){if(e===!0&&n===!0)throw new x(P.INVALID_ARGUMENT,`${r} and ${t} cannot be used together.`)}function Ep(r){if(!V.isDocumentKey(r))throw new x(P.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function Tp(r){if(V.isDocumentKey(r))throw new x(P.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${r} has ${r.length}.`)}function Ql(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{let e=function(n){return n.constructor?n.constructor.name:null}(r);return e?`a custom ${e} object`:"an object"}}return typeof r=="function"?"a function":L()}function tt(r,e){if("_delegate"in r&&(r=r._delegate),!(r instanceof e)){if(e.name===r.constructor.name)throw new x(P.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let t=Ql(r);throw new x(P.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return r}var No=class{constructor(e){var t,n;if(e.host===void 0){if(e.ssl!==void 0)throw new x(P.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new x(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Gw("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=zm((n=e.experimentalLongPollingOptions)!==null&&n!==void 0?n:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new x(P.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new x(P.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new x(P.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(n,i){return n.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}},Ti=class{constructor(e,t,n,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new No({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new x(P.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new x(P.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new No(e),e.credentials!==void 0&&(this._authCredentials=function(n){if(!n)return new xc;switch(n.type){case"firstParty":return new Mc(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new x(P.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){let n=wp.get(t);n&&(C("ComponentProvider","Removing Datastore"),wp.delete(t),n.terminate())}(this),Promise.resolve()}};var ko=class r{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new r(this.firestore,e,this._query)}},ke=class r{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new kt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new r(this.firestore,e,this._key)}},kt=class r extends ko{constructor(e,t,n){super(e,t,Ci(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let e=this._path.popLast();return e.isEmpty()?null:new ke(this.firestore,null,new V(e))}withConverter(e){return new r(this.firestore,e,this._path)}};function Km(r,e,...t){if(r=le(r),Gm("collection","path",e),r instanceof Ti){let n=te.fromString(e,...t);return Tp(n),new kt(r,null,n)}{if(!(r instanceof ke||r instanceof kt))throw new x(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let n=r._path.child(te.fromString(e,...t));return Tp(n),new kt(r.firestore,null,n)}}function $m(r,e,...t){if(r=le(r),arguments.length===1&&(e=qs.newId()),Gm("doc","path",e),r instanceof Ti){let n=te.fromString(e,...t);return Ep(n),new ke(r,null,new V(n))}{if(!(r instanceof ke||r instanceof kt))throw new x(P.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let n=r._path.child(te.fromString(e,...t));return Ep(n),new ke(r.firestore,r instanceof kt?r.converter:null,new V(n))}}var Oo=class{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new wo(this,"async_queue_retry"),this.Vu=()=>{let n=Bs();n&&C("AsyncQueue","Visibility state changed to "+n.visibilityState),this.t_.jo()},this.mu=e;let t=Bs();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;let t=Bs();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});let t=new ze;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!jt(e))throw e;C("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){let t=this.mu.then(()=>(this.du=!0,e().catch(n=>{this.Eu=n,this.du=!1;let i=function(o){let c=o.message||"";return o.stack&&(c=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),c}(n);throw ce("INTERNAL UNHANDLED ERROR: ",i),n}).then(n=>(this.du=!1,n))));return this.mu=t,t}enqueueAfterDelay(e,t,n){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);let i=il.createAndSchedule(this,e,t,n,s=>this.yu(s));return this.Tu.push(i),i}fu(){this.Eu&&L()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(let t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((t,n)=>t.targetTimeMs-n.targetTimeMs);for(let t of this.Tu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){let t=this.Tu.indexOf(e);this.Tu.splice(t,1)}};function Ap(r){return function(t,n){if(typeof t!="object"||t===null)return!1;let i=t;for(let s of n)if(s in i&&typeof i[s]=="function")return!0;return!1}(r,["next","error","complete"])}var gt=class extends Ti{constructor(e,t,n,i){super(e,t,n,i),this.type="firestore",this._queue=new Oo,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){let e=this._firestoreClient.terminate();this._queue=new Oo(e),this._firestoreClient=void 0,await e}}};function Wm(r,e,t){t||(t="(default)");let n=Mr(r,"firestore");if(n.isInitialized(t)){let i=n.getImmediate({identifier:t}),s=n.getOptions(t);if(wt(s,e))return i;throw new x(P.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new x(P.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new x(P.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return n.initialize({options:e,instanceIdentifier:t})}function Jl(r){if(r._terminated)throw new x(P.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||Kw(r),r._firestoreClient}function Kw(r){var e,t,n;let i=r._freezeSettings(),s=function(c,u,d,f){return new Kc(c,u,d,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,zm(f.experimentalLongPollingOptions),f.useFetchStreams)}(r._databaseId,((e=r._app)===null||e===void 0?void 0:e.options.appId)||"",r._persistenceKey,i);r._componentsProvider||!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((n=i.localCache)===null||n===void 0)&&n._onlineComponentProvider)&&(r._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),r._firestoreClient=new pl(r._authCredentials,r._appCheckCredentials,r._queue,s,r._componentsProvider&&function(c){let u=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(u),_online:u}}(r._componentsProvider))}function Hm(r){if(r._initialized&&!r._terminated)throw new x(P.FAILED_PRECONDITION,"Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");let e=new ze;return r._queue.enqueueAndForgetEvenWhileRestricted(async()=>{try{await async function(n){if(!Ot.D())return Promise.resolve();let i=n+"main";await Ot.delete(i)}(Fl(r._databaseId,r._persistenceKey)),e.resolve()}catch(t){e.reject(t)}}),e.promise}function Qm(r){return Rd(r.app,"firestore",r._databaseId.database),r._delete()}var Ai=class r{constructor(e){this._byteString=e}static fromBase64String(e){try{return new r(pe.fromBase64String(e))}catch(t){throw new x(P.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new r(pe.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}};var fr=class{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new x(P.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new me(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}};var bi=class{constructor(e){this._methodName=e}};var Si=class{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new x(P.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new x(P.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return K(this._lat,e._lat)||K(this._long,e._long)}};var Ri=class{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(n,i){if(n.length!==i.length)return!1;for(let s=0;s<n.length;++s)if(n[s]!==i[s])return!1;return!0}(this._values,e._values)}};var $w=/^__.*__$/,gl=class{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return this.fieldMask!==null?new He(e,this.data,this.fieldMask,t,this.fieldTransforms):new Ut(e,this.data,t,this.fieldTransforms)}},xo=class{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new He(e,this.data,this.fieldMask,t,this.fieldTransforms)}};function Jm(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw L()}}var _l=class r{constructor(e,t,n,i,s,o){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=i,s===void 0&&this.vu(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new r(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var t;let n=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Fu({path:n,xu:!1});return i.Ou(e),i}Nu(e){var t;let n=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Fu({path:n,xu:!1});return i.vu(),i}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return Lo(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(Jm(this.Cu)&&$w.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}},yl=class{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||zo(e)}Qu(e,t,n,i=!1){return new _l({Cu:e,methodName:t,qu:n,path:me.emptyPath(),xu:!1,ku:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}};function Ym(r){let e=r._freezeSettings(),t=zo(r._databaseId);return new yl(r._databaseId,!!e.ignoreUndefinedProperties,t)}function Ww(r,e,t,n,i,s={}){let o=r.Qu(s.merge||s.mergeFields?2:0,e,t,i);Yl("Data must be an object, but it was:",o,n);let c=Xm(n,o),u,d;if(s.merge)u=new Ve(o.fieldMask),d=o.fieldTransforms;else if(s.mergeFields){let f=[];for(let m of s.mergeFields){let v=vl(e,m,t);if(!o.contains(v))throw new x(P.INVALID_ARGUMENT,`Field '${v}' is specified in your field mask but missing from your input data.`);eg(f,v)||f.push(v)}u=new Ve(f),d=o.fieldTransforms.filter(m=>u.covers(m.field))}else u=null,d=o.fieldTransforms;return new gl(new Ce(c),u,d)}var Vo=class r extends bi{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof r}};function Hw(r,e,t,n){let i=r.Qu(1,e,t);Yl("Data must be an object, but it was:",i,n);let s=[],o=Ce.empty();Tn(n,(u,d)=>{let f=Xl(e,u,t);d=le(d);let m=i.Nu(f);if(d instanceof Vo)s.push(f);else{let v=Wo(d,m);v!=null&&(s.push(f),o.set(f,v))}});let c=new Ve(s);return new xo(o,c,i.fieldTransforms)}function Qw(r,e,t,n,i,s){let o=r.Qu(1,e,t),c=[vl(e,n,t)],u=[i];if(s.length%2!=0)throw new x(P.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let v=0;v<s.length;v+=2)c.push(vl(e,s[v])),u.push(s[v+1]);let d=[],f=Ce.empty();for(let v=c.length-1;v>=0;--v)if(!eg(d,c[v])){let S=c[v],D=u[v];D=le(D);let k=o.Nu(S);if(D instanceof Vo)d.push(S);else{let N=Wo(D,k);N!=null&&(d.push(S),f.set(S,N))}}let m=new Ve(d);return new xo(f,m,o.fieldTransforms)}function Wo(r,e){if(Zm(r=le(r)))return Yl("Unsupported field value:",e,r),Xm(r,e);if(r instanceof bi)return function(n,i){if(!Jm(i.Cu))throw i.Bu(`${n._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Bu(`${n._methodName}() is not currently supported inside arrays`);let s=n._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(r,e),null;if(r===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),r instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(n,i){let s=[],o=0;for(let c of n){let u=Wo(c,i.Lu(o));u==null&&(u={nullValue:"NULL_VALUE"}),s.push(u),o++}return{arrayValue:{values:s}}}(r,e)}return function(n,i){if((n=le(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return VI(i.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){let s=ue.fromDate(n);return{timestampValue:or(i.serializer,s)}}if(n instanceof ue){let s=new ue(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:or(i.serializer,s)}}if(n instanceof Si)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof Ai)return{bytesValue:sm(i.serializer,n._byteString)};if(n instanceof ke){let s=i.databaseId,o=n.firestore._databaseId;if(!o.isEqual(s))throw i.Bu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:Ll(n.firestore._databaseId||i.databaseId,n._key.path)}}if(n instanceof Ri)return function(o,c){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:o.toArray().map(u=>{if(typeof u!="number")throw c.Bu("VectorValues must only contain numeric values.");return Vl(c.serializer,u)})}}}}}}(n,i);throw i.Bu(`Unsupported field value: ${Ql(n)}`)}(r,e)}function Xm(r,e){let t={};return Vp(r)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Tn(r,(n,i)=>{let s=Wo(i,e.Mu(n));s!=null&&(t[n]=s)}),{mapValue:{fields:t}}}function Zm(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof ue||r instanceof Si||r instanceof Ai||r instanceof ke||r instanceof bi||r instanceof Ri)}function Yl(r,e,t){if(!Zm(t)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(t)){let n=Ql(t);throw n==="an object"?e.Bu(r+" a custom object"):e.Bu(r+" "+n)}}function vl(r,e,t){if((e=le(e))instanceof fr)return e._internalPath;if(typeof e=="string")return Xl(r,e);throw Lo("Field path arguments must be of type string or ",r,!1,void 0,t)}var Jw=new RegExp("[~\\*/\\[\\]]");function Xl(r,e,t){if(e.search(Jw)>=0)throw Lo(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,t);try{return new fr(...e.split("."))._internalPath}catch{throw Lo(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,t)}}function Lo(r,e,t,n,i){let s=n&&!n.isEmpty(),o=i!==void 0,c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(s||o)&&(u+=" (found",s&&(u+=` in field ${n}`),o&&(u+=` in document ${i}`),u+=")"),new x(P.INVALID_ARGUMENT,c+r+u)}function eg(r,e){return r.some(t=>t.isEqual(e))}var Mo=class{constructor(e,t,n,i,s){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new ke(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){let e=new Il(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){let t=this._document.data.field(tg("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}},Il=class extends Mo{data(){return super.data()}};function tg(r,e){return typeof e=="string"?Xl(r,e):e instanceof fr?e._internalPath:e._delegate._internalPath}function Yw(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new x(P.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}var wl=class{convertValue(e,t="none"){switch(mn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return se(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(xt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw L()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){let n={};return Tn(e,(i,s)=>{n[i]=this.convertValue(s,t)}),n}convertVectorValue(e){var t,n,i;let s=(i=(n=(t=e.fields)===null||t===void 0?void 0:t.value.arrayValue)===null||n===void 0?void 0:n.values)===null||i===void 0?void 0:i.map(o=>se(o.doubleValue));return new Ri(s)}convertGeoPoint(e){return new Si(se(e.latitude),se(e.longitude))}convertArray(e,t){return(e.values||[]).map(n=>this.convertValue(n,t))}convertServerTimestamp(e,t){switch(t){case"previous":let n=Nl(e);return n==null?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(fi(e));default:return null}}convertTimestamp(e){let t=mt(e);return new ue(t.seconds,t.nanos)}convertDocumentKey(e,t){let n=te.fromString(e);U(mm(n));let i=new Xn(n.get(1),n.get(3)),s=new V(n.popFirst(5));return i.isEqual(t)||ce(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}};function Xw(r,e,t){let n;return n=r?t&&(t.merge||t.mergeFields)?r.toFirestore(e,t):r.toFirestore(e):e,n}var hn=class{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}},Fo=class extends Mo{constructor(e,t,n,i,s,o){super(e,t,n,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){let t=new Qn(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){let n=this._document.data.field(tg("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}},Qn=class extends Fo{data(e={}){return super.data(e)}},El=class{constructor(e,t,n,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new hn(i.hasPendingWrites,i.fromCache),this.query=n}get docs(){let e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(n=>{e.call(t,new Qn(this._firestore,this._userDataWriter,n.key,n,new hn(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){let t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new x(P.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let o=0;return i._snapshot.docChanges.map(c=>{let u=new Qn(i._firestore,i._userDataWriter,c.doc.key,c.doc,new hn(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}})}{let o=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(c=>s||c.type!==3).map(c=>{let u=new Qn(i._firestore,i._userDataWriter,c.doc.key,c.doc,new hn(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter),d=-1,f=-1;return c.type!==0&&(d=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),f=o.indexOf(c.doc.key)),{type:Zw(c.type),doc:u,oldIndex:d,newIndex:f}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}};function Zw(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return L()}}function ng(r){r=tt(r,ke);let e=tt(r.firestore,gt);return zw(Jl(e),r._key).then(t=>ag(e,r,t))}var Uo=class extends wl{constructor(e){super(),this.firestore=e}convertBytes(e){return new Ai(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new ke(this.firestore,null,t)}};function rg(r,e,t){r=tt(r,ke);let n=tt(r.firestore,gt),i=Xw(r.converter,e,t);return Zl(n,[Ww(Ym(n),"setDoc",r._key,i,r.converter!==null,t).toMutation(r._key,Me.none())])}function ig(r,e,t,...n){r=tt(r,ke);let i=tt(r.firestore,gt),s=Ym(i),o;return o=typeof(e=le(e))=="string"||e instanceof fr?Qw(s,"updateDoc",r._key,e,t,n):Hw(s,"updateDoc",r._key,e),Zl(i,[o.toMutation(r._key,Me.exists(!0))])}function sg(r){return Zl(tt(r.firestore,gt),[new sr(r._key,Me.none())])}function og(r,...e){var t,n,i;r=le(r);let s={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||Ap(e[o])||(s=e[o],o++);let c={includeMetadataChanges:s.includeMetadataChanges,source:s.source};if(Ap(e[o])){let m=e[o];e[o]=(t=m.next)===null||t===void 0?void 0:t.bind(m),e[o+1]=(n=m.error)===null||n===void 0?void 0:n.bind(m),e[o+2]=(i=m.complete)===null||i===void 0?void 0:i.bind(m)}let u,d,f;if(r instanceof ke)d=tt(r.firestore,gt),f=Ci(r._key.path),u={next:m=>{e[o]&&e[o](ag(d,r,m))},error:e[o+1],complete:e[o+2]};else{let m=tt(r,ko);d=tt(m.firestore,gt),f=m._query;let v=new Uo(d);u={next:S=>{e[o]&&e[o](new El(d,v,m,S))},error:e[o+1],complete:e[o+2]},Yw(r._query)}return function(v,S,D,k){let N=new Do(k),z=new So(S,N,D);return v.asyncQueue.enqueueAndForget(async()=>Lm(await ml(v),z)),()=>{N.Za(),v.asyncQueue.enqueueAndForget(async()=>Mm(await ml(v),z))}}(Jl(d),f,c,u)}function Zl(r,e){return function(n,i){let s=new ze;return n.asyncQueue.enqueueAndForget(async()=>Rw(await jw(n),i,s)),s.promise}(Jl(r),e)}function ag(r,e,t){let n=t.docs.get(e._key),i=new Uo(r);return new Fo(r,i,e._key,n,new hn(t.hasPendingWrites,t.fromCache),e.converter)}var Tl=class{constructor(e){let t;this.kind="persistent",e!=null&&e.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=eE(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}};function cg(r){return new Tl(r)}var Al=class{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=En.provider,this._offlineComponentProvider={build:t=>new Co(t,e==null?void 0:e.cacheSizeBytes,this.forceOwnership)}}},bl=class{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=En.provider,this._offlineComponentProvider={build:t=>new fl(t,e==null?void 0:e.cacheSizeBytes)}}};function eE(r){return new Al(r==null?void 0:r.forceOwnership)}function ug(){return new bl}(function(e,t=!0){(function(i){pr=i})(At),Tt(new Ue("firestore",(n,{instanceIdentifier:i,options:s})=>{let o=n.getProvider("app").getImmediate(),c=new gt(new Vc(n.getProvider("auth-internal")),new Uc(n.getProvider("app-check-internal")),function(d,f){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new x(P.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Xn(d.options.projectId,f)}(o,i),o);return s=Object.assign({useFetchStreams:t},s),c._setSettings(s),c},"PUBLIC").setMultipleInstances(!0)),$e(Af,"4.7.3",e),$e(Af,"4.7.3","esm2017")})();window.SKFB={initializeApp:Pd,initializeAuth:lc,indexedDBLocalPersistence:vc,browserLocalPersistence:_c,browserPopupRedirectResolver:wc,onAuthStateChanged:mc,GoogleAuthProvider:tn,signInWithPopup:Ic,createUserWithEmailAndPassword:dc,signInWithEmailAndPassword:fc,sendPasswordResetEmail:hc,signOut:gc,updateProfile:pc,initializeFirestore:Wm,persistentLocalCache:cg,persistentMultipleTabManager:ug,collection:Km,doc:$m,setDoc:rg,updateDoc:ig,deleteDoc:sg,getDoc:ng,onSnapshot:og,terminate:Qm,clearIndexedDbPersistence:Hm};})();
/*! Bundled license information:

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/component/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/logger/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-68602d24.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/webchannel-wrapper/dist/bloom-blob/esm/bloom_blob_es2018.js:
  (** @license
  Copyright The Closure Library Authors.
  SPDX-License-Identifier: Apache-2.0
  *)
  (** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  *)

@firebase/webchannel-wrapper/dist/webchannel-blob/esm/webchannel_blob_es2018.js:
  (** @license
  Copyright The Closure Library Authors.
  SPDX-License-Identifier: Apache-2.0
  *)
  (** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
  * @license
  * Copyright 2020 Google LLC
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *   http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
