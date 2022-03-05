/**
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
 *//**
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
 */const vr=function(t){const e=[];let i=0;for(let n=0;n<t.length;n++){let s=t.charCodeAt(n);s<128?e[i++]=s:s<2048?(e[i++]=s>>6|192,e[i++]=s&63|128):(s&64512)===55296&&n+1<t.length&&(t.charCodeAt(n+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++n)&1023),e[i++]=s>>18|240,e[i++]=s>>12&63|128,e[i++]=s>>6&63|128,e[i++]=s&63|128):(e[i++]=s>>12|224,e[i++]=s>>6&63|128,e[i++]=s&63|128)}return e},yr=function(t){const e=[];let i=0,n=0;for(;i<t.length;){const s=t[i++];if(s<128)e[n++]=String.fromCharCode(s);else if(s>191&&s<224){const r=t[i++];e[n++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=t[i++],o=t[i++],a=t[i++],h=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[n++]=String.fromCharCode(55296+(h>>10)),e[n++]=String.fromCharCode(56320+(h&1023))}else{const r=t[i++],o=t[i++];e[n++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},_r={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const i=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let s=0;s<t.length;s+=3){const r=t[s],o=s+1<t.length,a=o?t[s+1]:0,h=s+2<t.length,c=h?t[s+2]:0,f=r>>2,m=(r&3)<<4|a>>4;let y=(a&15)<<2|c>>6,R=c&63;h||(R=64,o||(y=64)),n.push(i[f],i[m],i[y],i[R])}return n.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(vr(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):yr(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const i=e?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let s=0;s<t.length;){const r=i[t.charAt(s++)],a=s<t.length?i[t.charAt(s)]:0;++s;const c=s<t.length?i[t.charAt(s)]:64;++s;const m=s<t.length?i[t.charAt(s)]:64;if(++s,r==null||a==null||c==null||m==null)throw Error();const y=r<<2|a>>4;if(n.push(y),c!==64){const R=a<<4&240|c>>2;if(n.push(R),m!==64){const D=c<<6&192|m;n.push(D)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}},Ir=function(t){try{return _r.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */class Er{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,i)=>{this.resolve=e,this.reject=i})}wrapCallback(e){return(i,n)=>{i?this.reject(i):this.resolve(n),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(i):e(i,n))}}}/**
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
 */function S(){return typeof navigator!="undefined"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Tr(){return typeof window!="undefined"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(S())}function wr(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function Ar(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Sr(){const t=S();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}/**
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
 */const Rr="FirebaseError";class re extends Error{constructor(e,i,n){super(i);this.code=e,this.customData=n,this.name=Rr,Object.setPrototypeOf(this,re.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,De.prototype.create)}}class De{constructor(e,i,n){this.service=e,this.serviceName=i,this.errors=n}create(e,...i){const n=i[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?kr(r,n):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new re(s,a,n)}}function kr(t,e){return t.replace(Cr,(i,n)=>{const s=e[n];return s!=null?String(s):`<${n}?>`})}const Cr=/\{\$([^}]+)}/g;function br(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Qe(t,e){if(t===e)return!0;const i=Object.keys(t),n=Object.keys(e);for(const s of i){if(!n.includes(s))return!1;const r=t[s],o=e[s];if(nn(r)&&nn(o)){if(!Qe(r,o))return!1}else if(r!==o)return!1}for(const s of n)if(!i.includes(s))return!1;return!0}function nn(t){return t!==null&&typeof t=="object"}/**
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
 */function Le(t){const e=[];for(const[i,n]of Object.entries(t))Array.isArray(n)?n.forEach(s=>{e.push(encodeURIComponent(i)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(i)+"="+encodeURIComponent(n));return e.length?"&"+e.join("&"):""}function Or(t,e){const i=new Nr(t,e);return i.subscribe.bind(i)}class Nr{constructor(e,i){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=i,this.task.then(()=>{e(this)}).catch(n=>{this.error(n)})}next(e){this.forEachObserver(i=>{i.next(e)})}error(e){this.forEachObserver(i=>{i.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,i,n){let s;if(e===void 0&&i===void 0&&n===void 0)throw new Error("Missing Observer.");Pr(e,["next","error","complete"])?s=e:s={next:e,error:i,complete:n},s.next===void 0&&(s.next=Ft),s.error===void 0&&(s.error=Ft),s.complete===void 0&&(s.complete=Ft);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let i=0;i<this.observers.length;i++)this.sendOne(i,e)}sendOne(e,i){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{i(this.observers[e])}catch(n){typeof console!="undefined"&&console.error&&console.error(n)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Pr(t,e){if(typeof t!="object"||t===null)return!1;for(const i of e)if(i in t&&typeof t[i]=="function")return!0;return!1}function Ft(){}/**
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
 */function pt(t){return t&&t._delegate?t._delegate:t}class de{constructor(e,i,n){this.name=e,this.instanceFactory=i,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const Q="[DEFAULT]";/**
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
 */class Dr{constructor(e,i){this.name=e,this.container=i,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const i=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(i)){const n=new Er;if(this.instancesDeferred.set(i,n),this.isInitialized(i)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:i});s&&n.resolve(s)}catch{}}return this.instancesDeferred.get(i).promise}getImmediate(e){var i;const n=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(i=e==null?void 0:e.optional)!==null&&i!==void 0?i:!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Mr(e))try{this.getOrInitializeService({instanceIdentifier:Q})}catch{}for(const[i,n]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(i);try{const r=this.getOrInitializeService({instanceIdentifier:s});n.resolve(r)}catch{}}}}clearInstance(e=Q){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(i=>"INTERNAL"in i).map(i=>i.INTERNAL.delete()),...e.filter(i=>"_delete"in i).map(i=>i._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Q){return this.instances.has(e)}getOptions(e=Q){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:i={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:n,options:i});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);n===a&&o.resolve(s)}return s}onInit(e,i){var n;const s=this.normalizeInstanceIdentifier(i),r=(n=this.onInitCallbacks.get(s))!==null&&n!==void 0?n:new Set;r.add(e),this.onInitCallbacks.set(s,r);const o=this.instances.get(s);return o&&e(o,s),()=>{r.delete(e)}}invokeOnInitCallbacks(e,i){const n=this.onInitCallbacks.get(i);if(!!n)for(const s of n)try{s(e,i)}catch{}}getOrInitializeService({instanceIdentifier:e,options:i={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:Lr(e),options:i}),this.instances.set(e,n),this.instancesOptions.set(e,i),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}return n||null}normalizeInstanceIdentifier(e=Q){return this.component?this.component.multipleInstances?e:Q:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Lr(t){return t===Q?void 0:t}function Mr(t){return t.instantiationMode==="EAGER"}/**
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
 */class Ur{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const i=this.getProvider(e.name);if(i.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);i.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const i=new Dr(e,this);return this.providers.set(e,i),i}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var g;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(g||(g={}));const Fr={debug:g.DEBUG,verbose:g.VERBOSE,info:g.INFO,warn:g.WARN,error:g.ERROR,silent:g.SILENT},xr=g.INFO,jr={[g.DEBUG]:"log",[g.VERBOSE]:"log",[g.INFO]:"info",[g.WARN]:"warn",[g.ERROR]:"error"},$r=(t,e,...i)=>{if(e<t.logLevel)return;const n=new Date().toISOString(),s=jr[e];if(s)console[s](`[${n}]  ${t.name}:`,...i);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class fi{constructor(e){this.name=e,this._logLevel=xr,this._logHandler=$r,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in g))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Fr[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,g.DEBUG,...e),this._logHandler(this,g.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,g.VERBOSE,...e),this._logHandler(this,g.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,g.INFO,...e),this._logHandler(this,g.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,g.WARN,...e),this._logHandler(this,g.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,g.ERROR,...e),this._logHandler(this,g.ERROR,...e)}}/**
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
 */class Br{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(i=>{if(Hr(i)){const n=i.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(i=>i).join(" ")}}function Hr(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Yt="@firebase/app",sn="0.7.17";/**
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
 */const pi=new fi("@firebase/app"),Vr="@firebase/app-compat",zr="@firebase/analytics-compat",Wr="@firebase/analytics",Gr="@firebase/app-check-compat",qr="@firebase/app-check",Kr="@firebase/auth",Xr="@firebase/auth-compat",Jr="@firebase/database",Yr="@firebase/database-compat",Qr="@firebase/functions",Zr="@firebase/functions-compat",eo="@firebase/installations",to="@firebase/installations-compat",io="@firebase/messaging",no="@firebase/messaging-compat",so="@firebase/performance",ro="@firebase/performance-compat",oo="@firebase/remote-config",ao="@firebase/remote-config-compat",ho="@firebase/storage",co="@firebase/storage-compat",lo="@firebase/firestore",uo="@firebase/firestore-compat",fo="firebase",po="9.6.7";/**
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
 */const Fn="[DEFAULT]",go={[Yt]:"fire-core",[Vr]:"fire-core-compat",[Wr]:"fire-analytics",[zr]:"fire-analytics-compat",[qr]:"fire-app-check",[Gr]:"fire-app-check-compat",[Kr]:"fire-auth",[Xr]:"fire-auth-compat",[Jr]:"fire-rtdb",[Yr]:"fire-rtdb-compat",[Qr]:"fire-fn",[Zr]:"fire-fn-compat",[eo]:"fire-iid",[to]:"fire-iid-compat",[io]:"fire-fcm",[no]:"fire-fcm-compat",[so]:"fire-perf",[ro]:"fire-perf-compat",[oo]:"fire-rc",[ao]:"fire-rc-compat",[ho]:"fire-gcs",[co]:"fire-gcs-compat",[lo]:"fire-fst",[uo]:"fire-fst-compat","fire-js":"fire-js",[fo]:"fire-js-all"};/**
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
 */const Ze=new Map,Qt=new Map;function mo(t,e){try{t.container.addComponent(e)}catch(i){pi.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,i)}}function we(t){const e=t.name;if(Qt.has(e))return pi.debug(`There were multiple attempts to register component ${e}.`),!1;Qt.set(e,t);for(const i of Ze.values())mo(i,t);return!0}function gi(t,e){return t.container.getProvider(e)}/**
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
 */const vo={["no-app"]:"No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",["bad-app-name"]:"Illegal App name: '{$appName}",["duplicate-app"]:"Firebase App named '{$appName}' already exists with different options or config",["app-deleted"]:"Firebase App named '{$appName}' already deleted",["invalid-app-argument"]:"firebase.{$appName}() takes either no argument or a Firebase App instance.",["invalid-log-argument"]:"First argument to `onLog` must be null or a function."},et=new De("app","Firebase",vo);/**
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
 */class yo{constructor(e,i,n){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},i),this._name=i.name,this._automaticDataCollectionEnabled=i.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new de("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw et.create("app-deleted",{appName:this._name})}}/**
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
 */const Me=po;function Rc(t,e={}){typeof e!="object"&&(e={name:e});const i=Object.assign({name:Fn,automaticDataCollectionEnabled:!1},e),n=i.name;if(typeof n!="string"||!n)throw et.create("bad-app-name",{appName:String(n)});const s=Ze.get(n);if(s){if(Qe(t,s.options)&&Qe(i,s.config))return s;throw et.create("duplicate-app",{appName:n})}const r=new Ur(n);for(const a of Qt.values())r.addComponent(a);const o=new yo(t,i,r);return Ze.set(n,o),o}function xn(t=Fn){const e=Ze.get(t);if(!e)throw et.create("no-app",{appName:t});return e}function X(t,e,i){var n;let s=(n=go[t])!==null&&n!==void 0?n:t;i&&(s+=`-${i}`);const r=s.match(/\s|\//),o=e.match(/\s|\//);if(r||o){const a=[`Unable to register library "${s}" with version "${e}":`];r&&a.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),pi.warn(a.join(" "));return}we(new de(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */function _o(t){we(new de("platform-logger",e=>new Br(e),"PRIVATE")),X(Yt,sn,t),X(Yt,sn,"esm2017"),X("fire-js","")}_o("");var Io="firebase",Eo="9.6.7";/**
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
 */X(Io,Eo,"app");/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function mi(t,e){var i={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(i[n]=t[n]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,n=Object.getOwnPropertySymbols(t);s<n.length;s++)e.indexOf(n[s])<0&&Object.prototype.propertyIsEnumerable.call(t,n[s])&&(i[n[s]]=t[n[s]]);return i}function jn(){return{["dependent-sdk-initialized-before-auth"]:"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const To=jn,$n=new De("auth","Firebase",jn());/**
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
 */const rn=new fi("@firebase/auth");function Xe(t,...e){rn.logLevel<=g.ERROR&&rn.error(`Auth (${Me}): ${t}`,...e)}/**
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
 */function B(t,...e){throw vi(t,...e)}function U(t,...e){return vi(t,...e)}function wo(t,e,i){const n=Object.assign(Object.assign({},To()),{[e]:i});return new De("auth","Firebase",n).create(e,{appName:t.name})}function vi(t,...e){if(typeof t!="string"){const i=e[0],n=[...e.slice(1)];return n[0]&&(n[0].appName=t.name),t._errorFactory.create(i,...n)}return $n.create(t,...e)}function d(t,e,...i){if(!t)throw vi(e,...i)}function x(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Xe(e),new Error(e)}function H(t,e){t||x(e)}/**
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
 */const on=new Map;function j(t){H(t instanceof Function,"Expected a class definition");let e=on.get(t);return e?(H(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,on.set(t,e),e)}/**
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
 */function Ao(t,e){const i=gi(t,"auth");if(i.isInitialized()){const s=i.getImmediate(),r=i.getOptions();if(Qe(r,e!=null?e:{}))return s;B(s,"already-initialized")}return i.initialize({options:e})}function So(t,e){const i=(e==null?void 0:e.persistence)||[],n=(Array.isArray(i)?i:[i]).map(j);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(n,e==null?void 0:e.popupRedirectResolver)}/**
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
 */function Zt(){var t;return typeof self!="undefined"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function Ro(){return an()==="http:"||an()==="https:"}function an(){var t;return typeof self!="undefined"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
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
 */function ko(){return typeof navigator!="undefined"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Ro()||wr()||"connection"in navigator)?navigator.onLine:!0}function Co(){if(typeof navigator=="undefined")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
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
 */class Ue{constructor(e,i){this.shortDelay=e,this.longDelay=i,H(i>e,"Short delay should be less than long delay!"),this.isMobile=Tr()||Ar()}get(){return ko()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function yi(t,e){H(t.emulator,"Emulator should always be set here");const{url:i}=t.emulator;return e?`${i}${e.startsWith("/")?e.slice(1):e}`:i}/**
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
 */class Bn{static initialize(e,i,n){this.fetchImpl=e,i&&(this.headersImpl=i),n&&(this.responseImpl=n)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self!="undefined"&&"fetch"in self)return self.fetch;x("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self!="undefined"&&"Headers"in self)return self.Headers;x("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self!="undefined"&&"Response"in self)return self.Response;x("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const bo={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"internal-error",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error"};/**
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
 */const Oo=new Ue(3e4,6e4);function No(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function gt(t,e,i,n,s={}){return Hn(t,s,async()=>{let r={},o={};n&&(e==="GET"?o=n:r={body:JSON.stringify(n)});const a=Le(Object.assign({key:t.config.apiKey},o)).slice(1),h=await t._getAdditionalHeaders();return h["Content-Type"]="application/json",t.languageCode&&(h["X-Firebase-Locale"]=t.languageCode),Bn.fetch()(Vn(t,t.config.apiHost,i,a),Object.assign({method:e,headers:h,referrerPolicy:"no-referrer"},r))})}async function Hn(t,e,i){t._canInitEmulator=!1;const n=Object.assign(Object.assign({},bo),e);try{const s=new Do(t),r=await Promise.race([i(),s.promise]);s.clearNetworkTimeout();const o=await r.json();if("needConfirmation"in o)throw xt(t,"account-exists-with-different-credential",o);if(r.ok&&!("errorMessage"in o))return o;{const a=r.ok?o.errorMessage:o.error.message,[h,c]=a.split(" : ");if(h==="FEDERATED_USER_ID_ALREADY_LINKED")throw xt(t,"credential-already-in-use",o);if(h==="EMAIL_EXISTS")throw xt(t,"email-already-in-use",o);const f=n[h]||h.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw wo(t,f,c);B(t,f)}}catch(s){if(s instanceof re)throw s;B(t,"network-request-failed")}}async function Po(t,e,i,n,s={}){const r=await gt(t,e,i,n,s);return"mfaPendingCredential"in r&&B(t,"multi-factor-auth-required",{_serverResponse:r}),r}function Vn(t,e,i,n){const s=`${e}${i}?${n}`;return t.config.emulator?yi(t.config,s):`${t.config.apiScheme}://${s}`}class Do{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((i,n)=>{this.timer=setTimeout(()=>n(U(this.auth,"network-request-failed")),Oo.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function xt(t,e,i){const n={appName:t.name};i.email&&(n.email=i.email),i.phoneNumber&&(n.phoneNumber=i.phoneNumber);const s=U(t,e,n);return s.customData._tokenResponse=i,s}/**
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
 */async function Lo(t,e){return gt(t,"POST","/v1/accounts:delete",e)}async function Mo(t,e){return gt(t,"POST","/v1/accounts:lookup",e)}/**
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
 */function Ie(t){if(!!t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Uo(t,e=!1){const i=pt(t),n=await i.getIdToken(e),s=_i(n);d(s&&s.exp&&s.auth_time&&s.iat,i.auth,"internal-error");const r=typeof s.firebase=="object"?s.firebase:void 0,o=r==null?void 0:r.sign_in_provider;return{claims:s,token:n,authTime:Ie(jt(s.auth_time)),issuedAtTime:Ie(jt(s.iat)),expirationTime:Ie(jt(s.exp)),signInProvider:o||null,signInSecondFactor:(r==null?void 0:r.sign_in_second_factor)||null}}function jt(t){return Number(t)*1e3}function _i(t){const[e,i,n]=t.split(".");if(e===void 0||i===void 0||n===void 0)return Xe("JWT malformed, contained fewer than 3 sections"),null;try{const s=Ir(i);return s?JSON.parse(s):(Xe("Failed to decode base64 JWT payload"),null)}catch(s){return Xe("Caught error parsing JWT payload as JSON",s),null}}function Fo(t){const e=_i(t);return d(e,"internal-error"),d(typeof e.exp!="undefined","internal-error"),d(typeof e.iat!="undefined","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Ae(t,e,i=!1){if(i)return e;try{return await e}catch(n){throw n instanceof re&&xo(n)&&t.auth.currentUser===t&&await t.auth.signOut(),n}}function xo({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
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
 */class jo{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){!this.isRunning||(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var i;if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const s=((i=this.user.stsTokenManager.expirationTime)!==null&&i!==void 0?i:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const i=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},i)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class zn{constructor(e,i){this.createdAt=e,this.lastLoginAt=i,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ie(this.lastLoginAt),this.creationTime=Ie(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function tt(t){var e;const i=t.auth,n=await t.getIdToken(),s=await Ae(t,Mo(i,{idToken:n}));d(s==null?void 0:s.users.length,i,"internal-error");const r=s.users[0];t._notifyReloadListener(r);const o=!((e=r.providerUserInfo)===null||e===void 0)&&e.length?Ho(r.providerUserInfo):[],a=Bo(t.providerData,o),h=t.isAnonymous,c=!(t.email&&r.passwordHash)&&!(a!=null&&a.length),f=h?c:!1,m={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:a,metadata:new zn(r.createdAt,r.lastLoginAt),isAnonymous:f};Object.assign(t,m)}async function $o(t){const e=pt(t);await tt(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Bo(t,e){return[...t.filter(n=>!e.some(s=>s.providerId===n.providerId)),...e]}function Ho(t){return t.map(e=>{var{providerId:i}=e,n=mi(e,["providerId"]);return{providerId:i,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}})}/**
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
 */async function Vo(t,e){const i=await Hn(t,{},async()=>{const n=Le({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:r}=t.config,o=Vn(t,s,"/v1/token",`key=${r}`),a=await t._getAdditionalHeaders();return a["Content-Type"]="application/x-www-form-urlencoded",Bn.fetch()(o,{method:"POST",headers:a,body:n})});return{accessToken:i.access_token,expiresIn:i.expires_in,refreshToken:i.refresh_token}}/**
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
 */class Se{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){d(e.idToken,"internal-error"),d(typeof e.idToken!="undefined","internal-error"),d(typeof e.refreshToken!="undefined","internal-error");const i="expiresIn"in e&&typeof e.expiresIn!="undefined"?Number(e.expiresIn):Fo(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,i)}async getToken(e,i=!1){return d(!this.accessToken||this.refreshToken,e,"user-token-expired"),!i&&this.accessToken&&!this.isExpired?this.accessToken:this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null}clearRefreshToken(){this.refreshToken=null}async refresh(e,i){const{accessToken:n,refreshToken:s,expiresIn:r}=await Vo(e,i);this.updateTokensAndExpiration(n,s,Number(r))}updateTokensAndExpiration(e,i,n){this.refreshToken=i||null,this.accessToken=e||null,this.expirationTime=Date.now()+n*1e3}static fromJSON(e,i){const{refreshToken:n,accessToken:s,expirationTime:r}=i,o=new Se;return n&&(d(typeof n=="string","internal-error",{appName:e}),o.refreshToken=n),s&&(d(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),r&&(d(typeof r=="number","internal-error",{appName:e}),o.expirationTime=r),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Se,this.toJSON())}_performRefresh(){return x("not implemented")}}/**
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
 */function z(t,e){d(typeof t=="string"||typeof t=="undefined","internal-error",{appName:e})}class te{constructor(e){var{uid:i,auth:n,stsTokenManager:s}=e,r=mi(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new jo(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=i,this.auth=n,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new zn(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const i=await Ae(this,this.stsTokenManager.getToken(this.auth,e));return d(i,this.auth,"internal-error"),this.accessToken!==i&&(this.accessToken=i,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),i}getIdTokenResult(e){return Uo(this,e)}reload(){return $o(this)}_assign(e){this!==e&&(d(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(i=>Object.assign({},i)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){return new te(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}))}_onReload(e){d(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,i=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),i&&await tt(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){const e=await this.getIdToken();return await Ae(this,Lo(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,i){var n,s,r,o,a,h,c,f;const m=(n=i.displayName)!==null&&n!==void 0?n:void 0,y=(s=i.email)!==null&&s!==void 0?s:void 0,R=(r=i.phoneNumber)!==null&&r!==void 0?r:void 0,D=(o=i.photoURL)!==null&&o!==void 0?o:void 0,oe=(a=i.tenantId)!==null&&a!==void 0?a:void 0,Dt=(h=i._redirectEventId)!==null&&h!==void 0?h:void 0,Yi=(c=i.createdAt)!==null&&c!==void 0?c:void 0,Qi=(f=i.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:Lt,emailVerified:Zi,isAnonymous:en,providerData:Mt,stsTokenManager:tn}=i;d(Lt&&tn,e,"internal-error");const gr=Se.fromJSON(this.name,tn);d(typeof Lt=="string",e,"internal-error"),z(m,e.name),z(y,e.name),d(typeof Zi=="boolean",e,"internal-error"),d(typeof en=="boolean",e,"internal-error"),z(R,e.name),z(D,e.name),z(oe,e.name),z(Dt,e.name),z(Yi,e.name),z(Qi,e.name);const Ut=new te({uid:Lt,auth:e,email:y,emailVerified:Zi,displayName:m,isAnonymous:en,photoURL:D,phoneNumber:R,tenantId:oe,stsTokenManager:gr,createdAt:Yi,lastLoginAt:Qi});return Mt&&Array.isArray(Mt)&&(Ut.providerData=Mt.map(mr=>Object.assign({},mr))),Dt&&(Ut._redirectEventId=Dt),Ut}static async _fromIdTokenResponse(e,i,n=!1){const s=new Se;s.updateFromServerResponse(i);const r=new te({uid:i.localId,auth:e,stsTokenManager:s,isAnonymous:n});return await tt(r),r}}/**
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
 */class Wn{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,i){this.storage[e]=i}async _get(e){const i=this.storage[e];return i===void 0?null:i}async _remove(e){delete this.storage[e]}_addListener(e,i){}_removeListener(e,i){}}Wn.type="NONE";const hn=Wn;/**
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
 */function Je(t,e,i){return`firebase:${t}:${e}:${i}`}class ce{constructor(e,i,n){this.persistence=e,this.auth=i,this.userKey=n;const{config:s,name:r}=this.auth;this.fullUserKey=Je(this.userKey,s.apiKey,r),this.fullPersistenceKey=Je("persistence",s.apiKey,r),this.boundEventHandler=i._onStorageEvent.bind(i),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?te._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const i=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,i)return this.setCurrentUser(i)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,i,n="authUser"){if(!i.length)return new ce(j(hn),e,n);const s=(await Promise.all(i.map(async c=>{if(await c._isAvailable())return c}))).filter(c=>c);let r=s[0]||j(hn);const o=Je(n,e.config.apiKey,e.name);let a=null;for(const c of i)try{const f=await c._get(o);if(f){const m=te._fromJSON(e,f);c!==r&&(a=m),r=c;break}}catch{}const h=s.filter(c=>c._shouldAllowMigration);return!r._shouldAllowMigration||!h.length?new ce(r,e,n):(r=h[0],a&&await r._set(o,a.toJSON()),await Promise.all(i.map(async c=>{if(c!==r)try{await c._remove(o)}catch{}})),new ce(r,e,n))}}/**
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
 */function cn(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Kn(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Gn(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Jn(e))return"Blackberry";if(Yn(e))return"Webos";if(Ii(e))return"Safari";if((e.includes("chrome/")||qn(e))&&!e.includes("edge/"))return"Chrome";if(Xn(e))return"Android";{const i=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=t.match(i);if((n==null?void 0:n.length)===2)return n[1]}return"Other"}function Gn(t=S()){return/firefox\//i.test(t)}function Ii(t=S()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function qn(t=S()){return/crios\//i.test(t)}function Kn(t=S()){return/iemobile/i.test(t)}function Xn(t=S()){return/android/i.test(t)}function Jn(t=S()){return/blackberry/i.test(t)}function Yn(t=S()){return/webos/i.test(t)}function mt(t=S()){return/iphone|ipad|ipod/i.test(t)}function zo(t=S()){var e;return mt(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Wo(){return Sr()&&document.documentMode===10}function Qn(t=S()){return mt(t)||Xn(t)||Yn(t)||Jn(t)||/windows phone/i.test(t)||Kn(t)}function Go(){try{return!!(window&&window!==window.top)}catch{return!1}}/**
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
 */function Zn(t,e=[]){let i;switch(t){case"Browser":i=cn(S());break;case"Worker":i=`${cn(S())}-${t}`;break;default:i=t}const n=e.length?e.join(","):"FirebaseCore-web";return`${i}/JsCore/${Me}/${n}`}/**
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
 */class qo{constructor(e,i){this.app=e,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new ln(this),this.idTokenSubscription=new ln(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=$n,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,i){return i&&(this._popupRedirectResolver=j(i)),this._initializationPromise=this.queue(async()=>{var n,s;if(!this._deleted&&(this.persistenceManager=await ce.create(this,e),!this._deleted)){if(!((n=this._popupRedirectResolver)===null||n===void 0)&&n._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(i),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e)}}async initializeCurrentUser(e){var i;let n=await this.assertedPersistence.getCurrentUser();if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const s=(i=this.redirectUser)===null||i===void 0?void 0:i._redirectEventId,r=n==null?void 0:n._redirectEventId,o=await this.tryRedirectSignIn(e);(!s||s===r)&&(o==null?void 0:o.user)&&(n=o.user)}return n?n._redirectEventId?(d(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===n._redirectEventId?this.directlySetCurrentUser(n):this.reloadAndSetCurrentUserOrClear(n)):this.reloadAndSetCurrentUserOrClear(n):this.directlySetCurrentUser(null)}async tryRedirectSignIn(e){let i=null;try{i=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return i}async reloadAndSetCurrentUserOrClear(e){try{await tt(e)}catch(i){if(i.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Co()}async _delete(){this._deleted=!0}async updateCurrentUser(e){const i=e?pt(e):null;return i&&d(i.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(i&&i._clone(this))}async _updateCurrentUser(e){if(!this._deleted)return e&&d(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null)}setPersistence(e){return this.queue(async()=>{await this.assertedPersistence.setPersistence(j(e))})}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new De("auth","Firebase",e())}onAuthStateChanged(e,i,n){return this.registerStateListener(this.authStateSubscription,e,i,n)}onIdTokenChanged(e,i,n){return this.registerStateListener(this.idTokenSubscription,e,i,n)}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,i){const n=await this.getOrInitRedirectPersistenceManager(i);return e===null?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const i=e&&j(e)||this._popupRedirectResolver;d(i,this,"argument-error"),this.redirectPersistenceManager=await ce.create(this,[j(i._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var i,n;return this._isInitialized&&await this.queue(async()=>{}),((i=this._currentUser)===null||i===void 0?void 0:i._redirectEventId)===e?this._currentUser:((n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,i;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const n=(i=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&i!==void 0?i:null;this.lastNotifiedUid!==n&&(this.lastNotifiedUid=n,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,i,n,s){if(this._deleted)return()=>{};const r=typeof i=="function"?i:i.next.bind(i),o=this._isInitialized?Promise.resolve():this._initializationPromise;return d(o,this,"internal-error"),o.then(()=>r(this.currentUser)),typeof i=="function"?e.addObserver(i,n,s):e.addObserver(i)}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&(this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh()),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return d(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Zn(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={["X-Client-Version"]:this.clientVersion};return this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId),e}}function es(t){return pt(t)}class ln{constructor(e){this.auth=e,this.observer=null,this.addObserver=Or(i=>this.observer=i)}get next(){return d(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */class ts{constructor(e,i){this.providerId=e,this.signInMethod=i}toJSON(){return x("not implemented")}_getIdTokenResponse(e){return x("not implemented")}_linkToIdToken(e,i){return x("not implemented")}_getReauthenticationResolver(e){return x("not implemented")}}/**
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
 */async function le(t,e){return Po(t,"POST","/v1/accounts:signInWithIdp",No(t,e))}/**
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
 */const Ko="http://localhost";class ie extends ts{constructor(){super(...arguments);this.pendingToken=null}static _fromParams(e){const i=new ie(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(i.idToken=e.idToken),e.accessToken&&(i.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(i.nonce=e.nonce),e.pendingToken&&(i.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(i.accessToken=e.oauthToken,i.secret=e.oauthTokenSecret):B("argument-error"),i}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const i=typeof e=="string"?JSON.parse(e):e,{providerId:n,signInMethod:s}=i,r=mi(i,["providerId","signInMethod"]);if(!n||!s)return null;const o=new ie(n,s);return o.idToken=r.idToken||void 0,o.accessToken=r.accessToken||void 0,o.secret=r.secret,o.nonce=r.nonce,o.pendingToken=r.pendingToken||null,o}_getIdTokenResponse(e){const i=this.buildRequest();return le(e,i)}_linkToIdToken(e,i){const n=this.buildRequest();return n.idToken=i,le(e,n)}_getReauthenticationResolver(e){const i=this.buildRequest();return i.autoCreate=!1,le(e,i)}buildRequest(){const e={requestUri:Ko,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const i={};this.idToken&&(i.id_token=this.idToken),this.accessToken&&(i.access_token=this.accessToken),this.secret&&(i.oauth_token_secret=this.secret),i.providerId=this.providerId,this.nonce&&!this.pendingToken&&(i.nonce=this.nonce),e.postBody=Le(i)}return e}}/**
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
 */class is{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class Fe extends is{constructor(){super(...arguments);this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class W extends Fe{constructor(){super("facebook.com")}static credential(e){return ie._fromParams({providerId:W.PROVIDER_ID,signInMethod:W.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return W.credentialFromTaggedObject(e)}static credentialFromError(e){return W.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return W.credential(e.oauthAccessToken)}catch{return null}}}W.FACEBOOK_SIGN_IN_METHOD="facebook.com";W.PROVIDER_ID="facebook.com";/**
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
 */class G extends Fe{constructor(){super("google.com");this.addScope("profile")}static credential(e,i){return ie._fromParams({providerId:G.PROVIDER_ID,signInMethod:G.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:i})}static credentialFromResult(e){return G.credentialFromTaggedObject(e)}static credentialFromError(e){return G.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:i,oauthAccessToken:n}=e;if(!i&&!n)return null;try{return G.credential(i,n)}catch{return null}}}G.GOOGLE_SIGN_IN_METHOD="google.com";G.PROVIDER_ID="google.com";/**
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
 */class q extends Fe{constructor(){super("github.com")}static credential(e){return ie._fromParams({providerId:q.PROVIDER_ID,signInMethod:q.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return q.credentialFromTaggedObject(e)}static credentialFromError(e){return q.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return q.credential(e.oauthAccessToken)}catch{return null}}}q.GITHUB_SIGN_IN_METHOD="github.com";q.PROVIDER_ID="github.com";/**
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
 */class K extends Fe{constructor(){super("twitter.com")}static credential(e,i){return ie._fromParams({providerId:K.PROVIDER_ID,signInMethod:K.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:i})}static credentialFromResult(e){return K.credentialFromTaggedObject(e)}static credentialFromError(e){return K.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:i,oauthTokenSecret:n}=e;if(!i||!n)return null;try{return K.credential(i,n)}catch{return null}}}K.TWITTER_SIGN_IN_METHOD="twitter.com";K.PROVIDER_ID="twitter.com";/**
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
 */class fe{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,i,n,s=!1){const r=await te._fromIdTokenResponse(e,n,s),o=un(n);return new fe({user:r,providerId:o,_tokenResponse:n,operationType:i})}static async _forOperation(e,i,n){await e._updateTokensIfNecessary(n,!0);const s=un(n);return new fe({user:e,providerId:s,_tokenResponse:n,operationType:i})}}function un(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
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
 */class it extends re{constructor(e,i,n,s){var r;super(i.code,i.message);this.operationType=n,this.user=s,Object.setPrototypeOf(this,it.prototype),this.customData={appName:e.name,tenantId:(r=e.tenantId)!==null&&r!==void 0?r:void 0,_serverResponse:i.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,i,n,s){return new it(e,i,n,s)}}function ns(t,e,i,n){return(e==="reauthenticate"?i._getReauthenticationResolver(t):i._getIdTokenResponse(t)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?it._fromErrorAndOperation(t,r,e,n):r})}async function Xo(t,e,i=!1){const n=await Ae(t,e._linkToIdToken(t.auth,await t.getIdToken()),i);return fe._forOperation(t,"link",n)}/**
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
 */async function Jo(t,e,i=!1){const{auth:n}=t,s="reauthenticate";try{const r=await Ae(t,ns(n,s,e,t),i);d(r.idToken,n,"internal-error");const o=_i(r.idToken);d(o,n,"internal-error");const{sub:a}=o;return d(t.uid===a,n,"user-mismatch"),fe._forOperation(t,s,r)}catch(r){throw(r==null?void 0:r.code)==="auth/user-not-found"&&B(n,"user-mismatch"),r}}/**
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
 */async function Yo(t,e,i=!1){const n="signIn",s=await ns(t,n,e),r=await fe._fromIdTokenResponse(t,n,s);return i||await t._updateCurrentUser(r.user),r}const nt="__sak";/**
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
 */class ss{constructor(e,i){this.storageRetriever=e,this.type=i}_isAvailable(){try{return this.storage?(this.storage.setItem(nt,"1"),this.storage.removeItem(nt),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,i){return this.storage.setItem(e,JSON.stringify(i)),Promise.resolve()}_get(e){const i=this.storage.getItem(e);return Promise.resolve(i?JSON.parse(i):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */function Qo(){const t=S();return Ii(t)||mt(t)}const Zo=1e3,ea=10;class rs extends ss{constructor(){super(()=>window.localStorage,"LOCAL");this.boundEventHandler=(e,i)=>this.onStorageEvent(e,i),this.listeners={},this.localCache={},this.pollTimer=null,this.safariLocalStorageNotSynced=Qo()&&Go(),this.fallbackToPolling=Qn(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const i of Object.keys(this.listeners)){const n=this.storage.getItem(i),s=this.localCache[i];n!==s&&e(i,s,n)}}onStorageEvent(e,i=!1){if(!e.key){this.forAllChangedKeys((o,a,h)=>{this.notifyListeners(o,h)});return}const n=e.key;if(i?this.detachListener():this.stopPolling(),this.safariLocalStorageNotSynced){const o=this.storage.getItem(n);if(e.newValue!==o)e.newValue!==null?this.storage.setItem(n,e.newValue):this.storage.removeItem(n);else if(this.localCache[n]===e.newValue&&!i)return}const s=()=>{const o=this.storage.getItem(n);!i&&this.localCache[n]===o||this.notifyListeners(n,o)},r=this.storage.getItem(n);Wo()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,ea):s()}notifyListeners(e,i){this.localCache[e]=i;const n=this.listeners[e];if(n)for(const s of Array.from(n))s(i&&JSON.parse(i))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,i,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:i,newValue:n}),!0)})},Zo)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,i){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(i)}_removeListener(e,i){this.listeners[e]&&(this.listeners[e].delete(i),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,i){await super._set(e,i),this.localCache[e]=JSON.stringify(i)}async _get(e){const i=await super._get(e);return this.localCache[e]=JSON.stringify(i),i}async _remove(e){await super._remove(e),delete this.localCache[e]}}rs.type="LOCAL";const ta=rs;/**
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
 */class os extends ss{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,i){}_removeListener(e,i){}}os.type="SESSION";const as=os;/**
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
 */function ia(t){return Promise.all(t.map(async e=>{try{const i=await e;return{fulfilled:!0,value:i}}catch(i){return{fulfilled:!1,reason:i}}}))}/**
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
 */class vt{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const i=this.receivers.find(s=>s.isListeningto(e));if(i)return i;const n=new vt(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const i=e,{eventId:n,eventType:s,data:r}=i.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;i.ports[0].postMessage({status:"ack",eventId:n,eventType:s});const a=Array.from(o).map(async c=>c(i.origin,r)),h=await ia(a);i.ports[0].postMessage({status:"done",eventId:n,eventType:s,response:h})}_subscribe(e,i){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(i)}_unsubscribe(e,i){this.handlersMap[e]&&i&&this.handlersMap[e].delete(i),(!i||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}vt.receivers=[];/**
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
 */function Ei(t="",e=10){let i="";for(let n=0;n<e;n++)i+=Math.floor(Math.random()*10);return t+i}/**
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
 */class na{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,i,n=50){const s=typeof MessageChannel!="undefined"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let r,o;return new Promise((a,h)=>{const c=Ei("",20);s.port1.start();const f=setTimeout(()=>{h(new Error("unsupported_event"))},n);o={messageChannel:s,onMessage(m){const y=m;if(y.data.eventId===c)switch(y.data.status){case"ack":clearTimeout(f),r=setTimeout(()=>{h(new Error("timeout"))},3e3);break;case"done":clearTimeout(r),a(y.data.response);break;default:clearTimeout(f),clearTimeout(r),h(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:c,data:i},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function F(){return window}function sa(t){F().location.href=t}/**
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
 */function hs(){return typeof F().WorkerGlobalScope!="undefined"&&typeof F().importScripts=="function"}async function ra(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function oa(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function aa(){return hs()?self:null}/**
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
 */const cs="firebaseLocalStorageDb",ha=1,st="firebaseLocalStorage",ls="fbase_key";class xe{constructor(e){this.request=e}toPromise(){return new Promise((e,i)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{i(this.request.error)})})}}function yt(t,e){return t.transaction([st],e?"readwrite":"readonly").objectStore(st)}function ca(){const t=indexedDB.deleteDatabase(cs);return new xe(t).toPromise()}function ei(){const t=indexedDB.open(cs,ha);return new Promise((e,i)=>{t.addEventListener("error",()=>{i(t.error)}),t.addEventListener("upgradeneeded",()=>{const n=t.result;try{n.createObjectStore(st,{keyPath:ls})}catch(s){i(s)}}),t.addEventListener("success",async()=>{const n=t.result;n.objectStoreNames.contains(st)?e(n):(n.close(),await ca(),e(await ei()))})})}async function dn(t,e,i){const n=yt(t,!0).put({[ls]:e,value:i});return new xe(n).toPromise()}async function la(t,e){const i=yt(t,!1).get(e),n=await new xe(i).toPromise();return n===void 0?null:n.value}function fn(t,e){const i=yt(t,!0).delete(e);return new xe(i).toPromise()}const ua=800,da=3;class us{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await ei(),this.db)}async _withRetries(e){let i=0;for(;;)try{const n=await this._openDb();return await e(n)}catch(n){if(i++>da)throw n;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return hs()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=vt._getInstance(aa()),this.receiver._subscribe("keyChanged",async(e,i)=>({keyProcessed:(await this._poll()).includes(i.key)})),this.receiver._subscribe("ping",async(e,i)=>["keyChanged"])}async initializeSender(){var e,i;if(this.activeServiceWorker=await ra(),!this.activeServiceWorker)return;this.sender=new na(this.activeServiceWorker);const n=await this.sender._send("ping",{},800);!n||((e=n[0])===null||e===void 0?void 0:e.fulfilled)&&((i=n[0])===null||i===void 0?void 0:i.value.includes("keyChanged"))&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||oa()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await ei();return await dn(e,nt,"1"),await fn(e,nt),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,i){return this._withPendingWrite(async()=>(await this._withRetries(n=>dn(n,e,i)),this.localCache[e]=i,this.notifyServiceWorker(e)))}async _get(e){const i=await this._withRetries(n=>la(n,e));return this.localCache[e]=i,i}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(i=>fn(i,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const r=yt(s,!1).getAll();return new xe(r).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const i=[],n=new Set;for(const{fbase_key:s,value:r}of e)n.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(r)&&(this.notifyListeners(s,r),i.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!n.has(s)&&(this.notifyListeners(s,null),i.push(s));return i}notifyListeners(e,i){this.localCache[e]=i;const n=this.listeners[e];if(n)for(const s of Array.from(n))s(i)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),ua)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,i){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(i)}_removeListener(e,i){this.listeners[e]&&(this.listeners[e].delete(i),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}us.type="LOCAL";const fa=us;/**
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
 */function pa(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}function ga(t){return new Promise((e,i)=>{const n=document.createElement("script");n.setAttribute("src",t),n.onload=e,n.onerror=s=>{const r=U("internal-error");r.customData=s,i(r)},n.type="text/javascript",n.charset="UTF-8",pa().appendChild(n)})}function ma(t){return`__${t}${Math.floor(Math.random()*1e6)}`}new Ue(3e4,6e4);/**
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
 */function va(t,e){return e?j(e):(d(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
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
 */class Ti extends ts{constructor(e){super("custom","custom");this.params=e}_getIdTokenResponse(e){return le(e,this._buildIdpRequest())}_linkToIdToken(e,i){return le(e,this._buildIdpRequest(i))}_getReauthenticationResolver(e){return le(e,this._buildIdpRequest())}_buildIdpRequest(e){const i={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(i.idToken=e),i}}function ya(t){return Yo(t.auth,new Ti(t),t.bypassAuthState)}function _a(t){const{auth:e,user:i}=t;return d(i,e,"internal-error"),Jo(i,new Ti(t),t.bypassAuthState)}async function Ia(t){const{auth:e,user:i}=t;return d(i,e,"internal-error"),Xo(i,new Ti(t),t.bypassAuthState)}/**
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
 */class ds{constructor(e,i,n,s,r=!1){this.auth=e,this.resolver=n,this.user=s,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(i)?i:[i]}execute(){return new Promise(async(e,i)=>{this.pendingPromise={resolve:e,reject:i};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}})}async onAuthEvent(e){const{urlResponse:i,sessionId:n,postBody:s,tenantId:r,error:o,type:a}=e;if(o){this.reject(o);return}const h={auth:this.auth,requestUri:i,sessionId:n,tenantId:r||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(h))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return ya;case"linkViaPopup":case"linkViaRedirect":return Ia;case"reauthViaPopup":case"reauthViaRedirect":return _a;default:B(this.auth,"internal-error")}}resolve(e){H(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){H(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const Ea=new Ue(2e3,1e4);class ae extends ds{constructor(e,i,n,s,r){super(e,i,s,r);this.provider=n,this.authWindow=null,this.pollId=null,ae.currentPopupAction&&ae.currentPopupAction.cancel(),ae.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return d(e,this.auth,"internal-error"),e}async onExecution(){H(this.filter.length===1,"Popup operations only handle one event");const e=Ei();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(i=>{this.reject(i)}),this.resolver._isIframeWebStorageSupported(this.auth,i=>{i||this.reject(U(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(U(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,ae.currentPopupAction=null}pollUserCancellation(){const e=()=>{var i,n;if(!((n=(i=this.authWindow)===null||i===void 0?void 0:i.window)===null||n===void 0)&&n.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(U(this.auth,"popup-closed-by-user"))},2e3);return}this.pollId=window.setTimeout(e,Ea.get())};e()}}ae.currentPopupAction=null;/**
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
 */const Ta="pendingRedirect",$t=new Map;class wa extends ds{constructor(e,i,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],i,void 0,n);this.eventId=null}async execute(){let e=$t.get(this.auth._key());if(!e){try{const n=await Aa(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(n)}catch(i){e=()=>Promise.reject(i)}$t.set(this.auth._key(),e)}return this.bypassAuthState||$t.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const i=await this.auth._redirectUserForId(e.eventId);if(i)return this.user=i,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Aa(t,e){const i=Ra(e),n=Sa(t);if(!await n._isAvailable())return!1;const s=await n._get(i)==="true";return await n._remove(i),s}function Sa(t){return j(t._redirectPersistence)}function Ra(t){return Je(Ta,t.config.apiKey,t.name)}async function ka(t,e,i=!1){const n=es(t),s=va(n,e),o=await new wa(n,s,i).execute();return o&&!i&&(delete o.user._redirectEventId,await n._persistUserIfCurrent(o.user),await n._setRedirectUser(null,e)),o}/**
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
 */const Ca=10*60*1e3;class ba{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let i=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(i=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Oa(e)||(this.hasHandledPotentialRedirect=!0,i||(this.queuedRedirectEvent=e,i=!0)),i}sendToConsumer(e,i){var n;if(e.error&&!fs(e)){const s=((n=e.error.code)===null||n===void 0?void 0:n.split("auth/")[1])||"internal-error";i.onError(U(this.auth,s))}else i.onAuthEvent(e)}isEventForConsumer(e,i){const n=i.eventId===null||!!e.eventId&&e.eventId===i.eventId;return i.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Ca&&this.cachedEventUids.clear(),this.cachedEventUids.has(pn(e))}saveEventToCache(e){this.cachedEventUids.add(pn(e)),this.lastProcessedEventTime=Date.now()}}function pn(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function fs({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Oa(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return fs(t);default:return!1}}/**
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
 */async function Na(t,e={}){return gt(t,"GET","/v1/projects",e)}/**
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
 */const Pa=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Da=/^https?/;async function La(t){if(t.config.emulator)return;const{authorizedDomains:e}=await Na(t);for(const i of e)try{if(Ma(i))return}catch{}B(t,"unauthorized-domain")}function Ma(t){const e=Zt(),{protocol:i,hostname:n}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&n===""?i==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):i==="chrome-extension:"&&o.hostname===n}if(!Da.test(i))return!1;if(Pa.test(t))return n===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(n)}/**
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
 */const Ua=new Ue(3e4,6e4);function gn(){const t=F().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let i=0;i<t.CP.length;i++)t.CP[i]=null}}function Fa(t){return new Promise((e,i)=>{var n,s,r;function o(){gn(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{gn(),i(U(t,"network-request-failed"))},timeout:Ua.get()})}if(!((s=(n=F().gapi)===null||n===void 0?void 0:n.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((r=F().gapi)===null||r===void 0)&&r.load)o();else{const a=ma("iframefcb");return F()[a]=()=>{gapi.load?o():i(U(t,"network-request-failed"))},ga(`https://apis.google.com/js/api.js?onload=${a}`).catch(h=>i(h))}}).catch(e=>{throw Ye=null,e})}let Ye=null;function xa(t){return Ye=Ye||Fa(t),Ye}/**
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
 */const ja=new Ue(5e3,15e3),$a="__/auth/iframe",Ba="emulator/auth/iframe",Ha={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Va=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function za(t){const e=t.config;d(e.authDomain,t,"auth-domain-config-required");const i=e.emulator?yi(e,Ba):`https://${t.config.authDomain}/${$a}`,n={apiKey:e.apiKey,appName:t.name,v:Me},s=Va.get(t.config.apiHost);s&&(n.eid=s);const r=t._getFrameworks();return r.length&&(n.fw=r.join(",")),`${i}?${Le(n).slice(1)}`}async function Wa(t){const e=await xa(t),i=F().gapi;return d(i,t,"internal-error"),e.open({where:document.body,url:za(t),messageHandlersFilter:i.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Ha,dontclear:!0},n=>new Promise(async(s,r)=>{await n.restyle({setHideOnLeave:!1});const o=U(t,"network-request-failed"),a=F().setTimeout(()=>{r(o)},ja.get());function h(){F().clearTimeout(a),s(n)}n.ping(h).then(h,()=>{r(o)})}))}/**
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
 */const Ga={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},qa=500,Ka=600,Xa="_blank",Ja="http://localhost";class mn{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Ya(t,e,i,n=qa,s=Ka){const r=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-n)/2,0).toString();let a="";const h=Object.assign(Object.assign({},Ga),{width:n.toString(),height:s.toString(),top:r,left:o}),c=S().toLowerCase();i&&(a=qn(c)?Xa:i),Gn(c)&&(e=e||Ja,h.scrollbars="yes");const f=Object.entries(h).reduce((y,[R,D])=>`${y}${R}=${D},`,"");if(zo(c)&&a!=="_self")return Qa(e||"",a),new mn(null);const m=window.open(e||"",a,f);d(m,t,"popup-blocked");try{m.focus()}catch{}return new mn(m)}function Qa(t,e){const i=document.createElement("a");i.href=t,i.target=e;const n=document.createEvent("MouseEvent");n.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),i.dispatchEvent(n)}/**
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
 */const Za="__/auth/handler",eh="emulator/auth/handler";function vn(t,e,i,n,s,r){d(t.config.authDomain,t,"auth-domain-config-required"),d(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:i,redirectUrl:n,v:Me,eventId:s};if(e instanceof is){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",br(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[h,c]of Object.entries(r||{}))o[h]=c}if(e instanceof Fe){const h=e.getScopes().filter(c=>c!=="");h.length>0&&(o.scopes=h.join(","))}t.tenantId&&(o.tid=t.tenantId);const a=o;for(const h of Object.keys(a))a[h]===void 0&&delete a[h];return`${th(t)}?${Le(a).slice(1)}`}function th({config:t}){return t.emulator?yi(t,eh):`https://${t.authDomain}/${Za}`}/**
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
 */const Bt="webStorageSupport";class ih{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=as,this._completeRedirectFn=ka}async _openPopup(e,i,n,s){var r;H((r=this.eventManagers[e._key()])===null||r===void 0?void 0:r.manager,"_initialize() not called before _openPopup()");const o=vn(e,i,n,Zt(),s);return Ya(e,o,Ei())}async _openRedirect(e,i,n,s){return await this._originValidation(e),sa(vn(e,i,n,Zt(),s)),new Promise(()=>{})}_initialize(e){const i=e._key();if(this.eventManagers[i]){const{manager:s,promise:r}=this.eventManagers[i];return s?Promise.resolve(s):(H(r,"If manager is not set, promise should be"),r)}const n=this.initAndGetManager(e);return this.eventManagers[i]={promise:n},n.catch(()=>{delete this.eventManagers[i]}),n}async initAndGetManager(e){const i=await Wa(e),n=new ba(e);return i.register("authEvent",s=>(d(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:n.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=i,n}_isIframeWebStorageSupported(e,i){this.iframes[e._key()].send(Bt,{type:Bt},s=>{var r;const o=(r=s==null?void 0:s[0])===null||r===void 0?void 0:r[Bt];o!==void 0&&i(!!o),B(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const i=e._key();return this.originValidationPromises[i]||(this.originValidationPromises[i]=La(e)),this.originValidationPromises[i]}get _shouldInitProactively(){return Qn()||Ii()||mt()}}const nh=ih;var yn="@firebase/auth",_n="0.19.9";/**
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
 */class sh{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const i=this.auth.onIdTokenChanged(n=>{var s;e(((s=n)===null||s===void 0?void 0:s.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,i),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const i=this.internalListeners.get(e);!i||(this.internalListeners.delete(e),i(),this.updateProactiveRefresh())}assertAuthConfigured(){d(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function rh(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";default:return}}function oh(t){we(new de("auth",(e,{options:i})=>{const n=e.getProvider("app").getImmediate(),{apiKey:s,authDomain:r}=n.options;return(o=>{d(s&&!s.includes(":"),"invalid-api-key",{appName:o.name}),d(!(r!=null&&r.includes(":")),"argument-error",{appName:o.name});const a={apiKey:s,authDomain:r,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Zn(t)},h=new qo(o,a);return So(h,i),h})(n)},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,i,n)=>{e.getProvider("auth-internal").initialize()})),we(new de("auth-internal",e=>{const i=es(e.getProvider("auth").getImmediate());return(n=>new sh(n))(i)},"PRIVATE").setInstantiationMode("EXPLICIT")),X(yn,_n,rh(t)),X(yn,_n,"esm2017")}/**
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
 */function kc(t=xn()){const e=gi(t,"auth");return e.isInitialized()?e.getImmediate():Ao(t,{popupRedirectResolver:nh,persistence:[fa,ta,as]})}oh("Browser");var ah=typeof globalThis!="undefined"?globalThis:typeof window!="undefined"?window:typeof global!="undefined"?global:typeof self!="undefined"?self:{},l,wi=wi||{},u=ah||self;function rt(){}function ti(t){var e=typeof t;return e=e!="object"?e:t?Array.isArray(t)?"array":e:"null",e=="array"||e=="object"&&typeof t.length=="number"}function je(t){var e=typeof t;return e=="object"&&t!=null||e=="function"}function hh(t){return Object.prototype.hasOwnProperty.call(t,Ht)&&t[Ht]||(t[Ht]=++ch)}var Ht="closure_uid_"+(1e9*Math.random()>>>0),ch=0;function lh(t,e,i){return t.call.apply(t.bind,arguments)}function uh(t,e,i){if(!t)throw Error();if(2<arguments.length){var n=Array.prototype.slice.call(arguments,2);return function(){var s=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(s,n),t.apply(e,s)}}return function(){return t.apply(e,arguments)}}function E(t,e,i){return Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?E=lh:E=uh,E.apply(null,arguments)}function Ge(t,e){var i=Array.prototype.slice.call(arguments,1);return function(){var n=i.slice();return n.push.apply(n,arguments),t.apply(this,n)}}function w(t,e){function i(){}i.prototype=e.prototype,t.Z=e.prototype,t.prototype=new i,t.prototype.constructor=t,t.Vb=function(n,s,r){for(var o=Array(arguments.length-2),a=2;a<arguments.length;a++)o[a-2]=arguments[a];return e.prototype[s].apply(n,o)}}function J(){this.s=this.s,this.o=this.o}var dh=0,fh={};J.prototype.s=!1;J.prototype.na=function(){if(!this.s&&(this.s=!0,this.M(),dh!=0)){var t=hh(this);delete fh[t]}};J.prototype.M=function(){if(this.o)for(;this.o.length;)this.o.shift()()};const ps=Array.prototype.indexOf?function(t,e){return Array.prototype.indexOf.call(t,e,void 0)}:function(t,e){if(typeof t=="string")return typeof e!="string"||e.length!=1?-1:t.indexOf(e,0);for(let i=0;i<t.length;i++)if(i in t&&t[i]===e)return i;return-1},gs=Array.prototype.forEach?function(t,e,i){Array.prototype.forEach.call(t,e,i)}:function(t,e,i){const n=t.length,s=typeof t=="string"?t.split(""):t;for(let r=0;r<n;r++)r in s&&e.call(i,s[r],r,t)};function ph(t){e:{var e=rc;const i=t.length,n=typeof t=="string"?t.split(""):t;for(let s=0;s<i;s++)if(s in n&&e.call(void 0,n[s],s,t)){e=s;break e}e=-1}return 0>e?null:typeof t=="string"?t.charAt(e):t[e]}function In(t){return Array.prototype.concat.apply([],arguments)}function Ai(t){const e=t.length;if(0<e){const i=Array(e);for(let n=0;n<e;n++)i[n]=t[n];return i}return[]}function ot(t){return/^[\s\xa0]*$/.test(t)}var En=String.prototype.trim?function(t){return t.trim()}:function(t){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(t)[1]};function k(t,e){return t.indexOf(e)!=-1}function Vt(t,e){return t<e?-1:t>e?1:0}var C;e:{var Tn=u.navigator;if(Tn){var wn=Tn.userAgent;if(wn){C=wn;break e}}C=""}function Si(t,e,i){for(const n in t)e.call(i,t[n],n,t)}function ms(t){const e={};for(const i in t)e[i]=t[i];return e}var An="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function vs(t,e){let i,n;for(let s=1;s<arguments.length;s++){n=arguments[s];for(i in n)t[i]=n[i];for(let r=0;r<An.length;r++)i=An[r],Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}}function Ri(t){return Ri[" "](t),t}Ri[" "]=rt;function gh(t){var e=yh;return Object.prototype.hasOwnProperty.call(e,9)?e[9]:e[9]=t(9)}var mh=k(C,"Opera"),Re=k(C,"Trident")||k(C,"MSIE"),ys=k(C,"Edge"),ii=ys||Re,_s=k(C,"Gecko")&&!(k(C.toLowerCase(),"webkit")&&!k(C,"Edge"))&&!(k(C,"Trident")||k(C,"MSIE"))&&!k(C,"Edge"),vh=k(C.toLowerCase(),"webkit")&&!k(C,"Edge");function Is(){var t=u.document;return t?t.documentMode:void 0}var ni;e:{var zt="",Wt=function(){var t=C;if(_s)return/rv:([^\);]+)(\)|;)/.exec(t);if(ys)return/Edge\/([\d\.]+)/.exec(t);if(Re)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(t);if(vh)return/WebKit\/(\S+)/.exec(t);if(mh)return/(?:Version)[ \/]?(\S+)/.exec(t)}();if(Wt&&(zt=Wt?Wt[1]:""),Re){var Gt=Is();if(Gt!=null&&Gt>parseFloat(zt)){ni=String(Gt);break e}}ni=zt}var yh={};function _h(){return gh(function(){let t=0;const e=En(String(ni)).split("."),i=En("9").split("."),n=Math.max(e.length,i.length);for(let o=0;t==0&&o<n;o++){var s=e[o]||"",r=i[o]||"";do{if(s=/(\d*)(\D*)(.*)/.exec(s)||["","","",""],r=/(\d*)(\D*)(.*)/.exec(r)||["","","",""],s[0].length==0&&r[0].length==0)break;t=Vt(s[1].length==0?0:parseInt(s[1],10),r[1].length==0?0:parseInt(r[1],10))||Vt(s[2].length==0,r[2].length==0)||Vt(s[2],r[2]),s=s[3],r=r[3]}while(t==0)}return 0<=t})}u.document&&Re&&Is();var Ih=function(){if(!u.addEventListener||!Object.defineProperty)return!1;var t=!1,e=Object.defineProperty({},"passive",{get:function(){t=!0}});try{u.addEventListener("test",rt,e),u.removeEventListener("test",rt,e)}catch{}return t}();function A(t,e){this.type=t,this.g=this.target=e,this.defaultPrevented=!1}A.prototype.h=function(){this.defaultPrevented=!0};function ke(t,e){if(A.call(this,t?t.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,t){var i=this.type=t.type,n=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:null;if(this.target=t.target||t.srcElement,this.g=e,e=t.relatedTarget){if(_s){e:{try{Ri(e.nodeName);var s=!0;break e}catch{}s=!1}s||(e=null)}}else i=="mouseover"?e=t.fromElement:i=="mouseout"&&(e=t.toElement);this.relatedTarget=e,n?(this.clientX=n.clientX!==void 0?n.clientX:n.pageX,this.clientY=n.clientY!==void 0?n.clientY:n.pageY,this.screenX=n.screenX||0,this.screenY=n.screenY||0):(this.clientX=t.clientX!==void 0?t.clientX:t.pageX,this.clientY=t.clientY!==void 0?t.clientY:t.pageY,this.screenX=t.screenX||0,this.screenY=t.screenY||0),this.button=t.button,this.key=t.key||"",this.ctrlKey=t.ctrlKey,this.altKey=t.altKey,this.shiftKey=t.shiftKey,this.metaKey=t.metaKey,this.pointerId=t.pointerId||0,this.pointerType=typeof t.pointerType=="string"?t.pointerType:Eh[t.pointerType]||"",this.state=t.state,this.i=t,t.defaultPrevented&&ke.Z.h.call(this)}}w(ke,A);var Eh={2:"touch",3:"pen",4:"mouse"};ke.prototype.h=function(){ke.Z.h.call(this);var t=this.i;t.preventDefault?t.preventDefault():t.returnValue=!1};var $e="closure_listenable_"+(1e6*Math.random()|0),Th=0;function wh(t,e,i,n,s){this.listener=t,this.proxy=null,this.src=e,this.type=i,this.capture=!!n,this.ia=s,this.key=++Th,this.ca=this.fa=!1}function _t(t){t.ca=!0,t.listener=null,t.proxy=null,t.src=null,t.ia=null}function It(t){this.src=t,this.g={},this.h=0}It.prototype.add=function(t,e,i,n,s){var r=t.toString();t=this.g[r],t||(t=this.g[r]=[],this.h++);var o=ri(t,e,n,s);return-1<o?(e=t[o],i||(e.fa=!1)):(e=new wh(e,this.src,r,!!n,s),e.fa=i,t.push(e)),e};function si(t,e){var i=e.type;if(i in t.g){var n=t.g[i],s=ps(n,e),r;(r=0<=s)&&Array.prototype.splice.call(n,s,1),r&&(_t(e),t.g[i].length==0&&(delete t.g[i],t.h--))}}function ri(t,e,i,n){for(var s=0;s<t.length;++s){var r=t[s];if(!r.ca&&r.listener==e&&r.capture==!!i&&r.ia==n)return s}return-1}var ki="closure_lm_"+(1e6*Math.random()|0),qt={};function Es(t,e,i,n,s){if(n&&n.once)return ws(t,e,i,n,s);if(Array.isArray(e)){for(var r=0;r<e.length;r++)Es(t,e[r],i,n,s);return null}return i=Oi(i),t&&t[$e]?t.N(e,i,je(n)?!!n.capture:!!n,s):Ts(t,e,i,!1,n,s)}function Ts(t,e,i,n,s,r){if(!e)throw Error("Invalid event type");var o=je(s)?!!s.capture:!!s,a=bi(t);if(a||(t[ki]=a=new It(t)),i=a.add(e,i,n,o,r),i.proxy)return i;if(n=Ah(),i.proxy=n,n.src=t,n.listener=i,t.addEventListener)Ih||(s=o),s===void 0&&(s=!1),t.addEventListener(e.toString(),n,s);else if(t.attachEvent)t.attachEvent(Ss(e.toString()),n);else if(t.addListener&&t.removeListener)t.addListener(n);else throw Error("addEventListener and attachEvent are unavailable.");return i}function Ah(){function t(i){return e.call(t.src,t.listener,i)}var e=Sh;return t}function ws(t,e,i,n,s){if(Array.isArray(e)){for(var r=0;r<e.length;r++)ws(t,e[r],i,n,s);return null}return i=Oi(i),t&&t[$e]?t.O(e,i,je(n)?!!n.capture:!!n,s):Ts(t,e,i,!0,n,s)}function As(t,e,i,n,s){if(Array.isArray(e))for(var r=0;r<e.length;r++)As(t,e[r],i,n,s);else n=je(n)?!!n.capture:!!n,i=Oi(i),t&&t[$e]?(t=t.i,e=String(e).toString(),e in t.g&&(r=t.g[e],i=ri(r,i,n,s),-1<i&&(_t(r[i]),Array.prototype.splice.call(r,i,1),r.length==0&&(delete t.g[e],t.h--)))):t&&(t=bi(t))&&(e=t.g[e.toString()],t=-1,e&&(t=ri(e,i,n,s)),(i=-1<t?e[t]:null)&&Ci(i))}function Ci(t){if(typeof t!="number"&&t&&!t.ca){var e=t.src;if(e&&e[$e])si(e.i,t);else{var i=t.type,n=t.proxy;e.removeEventListener?e.removeEventListener(i,n,t.capture):e.detachEvent?e.detachEvent(Ss(i),n):e.addListener&&e.removeListener&&e.removeListener(n),(i=bi(e))?(si(i,t),i.h==0&&(i.src=null,e[ki]=null)):_t(t)}}}function Ss(t){return t in qt?qt[t]:qt[t]="on"+t}function Sh(t,e){if(t.ca)t=!0;else{e=new ke(e,this);var i=t.listener,n=t.ia||t.src;t.fa&&Ci(t),t=i.call(n,e)}return t}function bi(t){return t=t[ki],t instanceof It?t:null}var Kt="__closure_events_fn_"+(1e9*Math.random()>>>0);function Oi(t){return typeof t=="function"?t:(t[Kt]||(t[Kt]=function(e){return t.handleEvent(e)}),t[Kt])}function I(){J.call(this),this.i=new It(this),this.P=this,this.I=null}w(I,J);I.prototype[$e]=!0;I.prototype.removeEventListener=function(t,e,i,n){As(this,t,e,i,n)};function T(t,e){var i,n=t.I;if(n)for(i=[];n;n=n.I)i.push(n);if(t=t.P,n=e.type||e,typeof e=="string")e=new A(e,t);else if(e instanceof A)e.target=e.target||t;else{var s=e;e=new A(n,t),vs(e,s)}if(s=!0,i)for(var r=i.length-1;0<=r;r--){var o=e.g=i[r];s=qe(o,n,!0,e)&&s}if(o=e.g=t,s=qe(o,n,!0,e)&&s,s=qe(o,n,!1,e)&&s,i)for(r=0;r<i.length;r++)o=e.g=i[r],s=qe(o,n,!1,e)&&s}I.prototype.M=function(){if(I.Z.M.call(this),this.i){var t=this.i,e;for(e in t.g){for(var i=t.g[e],n=0;n<i.length;n++)_t(i[n]);delete t.g[e],t.h--}}this.I=null};I.prototype.N=function(t,e,i,n){return this.i.add(String(t),e,!1,i,n)};I.prototype.O=function(t,e,i,n){return this.i.add(String(t),e,!0,i,n)};function qe(t,e,i,n){if(e=t.i.g[String(e)],!e)return!0;e=e.concat();for(var s=!0,r=0;r<e.length;++r){var o=e[r];if(o&&!o.ca&&o.capture==i){var a=o.listener,h=o.ia||o.src;o.fa&&si(t.i,o),s=a.call(h,n)!==!1&&s}}return s&&!n.defaultPrevented}var Ni=u.JSON.stringify;function Rh(){var t=ks;let e=null;return t.g&&(e=t.g,t.g=t.g.next,t.g||(t.h=null),e.next=null),e}class kh{constructor(){this.h=this.g=null}add(e,i){const n=Rs.get();n.set(e,i),this.h?this.h.next=n:this.g=n,this.h=n}}var Rs=new class{constructor(t,e){this.i=t,this.j=e,this.h=0,this.g=null}get(){let t;return 0<this.h?(this.h--,t=this.g,this.g=t.next,t.next=null):t=this.i(),t}}(()=>new Ch,t=>t.reset());class Ch{constructor(){this.next=this.g=this.h=null}set(e,i){this.h=e,this.g=i,this.next=null}reset(){this.next=this.g=this.h=null}}function bh(t){u.setTimeout(()=>{throw t},0)}function Pi(t,e){oi||Oh(),ai||(oi(),ai=!0),ks.add(t,e)}var oi;function Oh(){var t=u.Promise.resolve(void 0);oi=function(){t.then(Nh)}}var ai=!1,ks=new kh;function Nh(){for(var t;t=Rh();){try{t.h.call(t.g)}catch(i){bh(i)}var e=Rs;e.j(t),100>e.h&&(e.h++,t.next=e.g,e.g=t)}ai=!1}function Et(t,e){I.call(this),this.h=t||1,this.g=e||u,this.j=E(this.kb,this),this.l=Date.now()}w(Et,I);l=Et.prototype;l.da=!1;l.S=null;l.kb=function(){if(this.da){var t=Date.now()-this.l;0<t&&t<.8*this.h?this.S=this.g.setTimeout(this.j,this.h-t):(this.S&&(this.g.clearTimeout(this.S),this.S=null),T(this,"tick"),this.da&&(Di(this),this.start()))}};l.start=function(){this.da=!0,this.S||(this.S=this.g.setTimeout(this.j,this.h),this.l=Date.now())};function Di(t){t.da=!1,t.S&&(t.g.clearTimeout(t.S),t.S=null)}l.M=function(){Et.Z.M.call(this),Di(this),delete this.g};function Li(t,e,i){if(typeof t=="function")i&&(t=E(t,i));else if(t&&typeof t.handleEvent=="function")t=E(t.handleEvent,t);else throw Error("Invalid listener argument");return 2147483647<Number(e)?-1:u.setTimeout(t,e||0)}function Cs(t){t.g=Li(()=>{t.g=null,t.i&&(t.i=!1,Cs(t))},t.j);const e=t.h;t.h=null,t.m.apply(null,e)}class Ph extends J{constructor(e,i){super();this.m=e,this.j=i,this.h=null,this.i=!1,this.g=null}l(e){this.h=arguments,this.g?this.i=!0:Cs(this)}M(){super.M(),this.g&&(u.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Ce(t){J.call(this),this.h=t,this.g={}}w(Ce,J);var Sn=[];function bs(t,e,i,n){Array.isArray(i)||(i&&(Sn[0]=i.toString()),i=Sn);for(var s=0;s<i.length;s++){var r=Es(e,i[s],n||t.handleEvent,!1,t.h||t);if(!r)break;t.g[r.key]=r}}function Os(t){Si(t.g,function(e,i){this.g.hasOwnProperty(i)&&Ci(e)},t),t.g={}}Ce.prototype.M=function(){Ce.Z.M.call(this),Os(this)};Ce.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};function Tt(){this.g=!0}Tt.prototype.Aa=function(){this.g=!1};function Dh(t,e,i,n,s,r){t.info(function(){if(t.g)if(r)for(var o="",a=r.split("&"),h=0;h<a.length;h++){var c=a[h].split("=");if(1<c.length){var f=c[0];c=c[1];var m=f.split("_");o=2<=m.length&&m[1]=="type"?o+(f+"="+c+"&"):o+(f+"=redacted&")}}else o=null;else o=r;return"XMLHTTP REQ ("+n+") [attempt "+s+"]: "+e+`
`+i+`
`+o})}function Lh(t,e,i,n,s,r,o){t.info(function(){return"XMLHTTP RESP ("+n+") [ attempt "+s+"]: "+e+`
`+i+`
`+r+" "+o})}function he(t,e,i,n){t.info(function(){return"XMLHTTP TEXT ("+e+"): "+Uh(t,i)+(n?" "+n:"")})}function Mh(t,e){t.info(function(){return"TIMEOUT: "+e})}Tt.prototype.info=function(){};function Uh(t,e){if(!t.g)return e;if(!e)return null;try{var i=JSON.parse(e);if(i){for(t=0;t<i.length;t++)if(Array.isArray(i[t])){var n=i[t];if(!(2>n.length)){var s=n[1];if(Array.isArray(s)&&!(1>s.length)){var r=s[0];if(r!="noop"&&r!="stop"&&r!="close")for(var o=1;o<s.length;o++)s[o]=""}}}}return Ni(i)}catch{return e}}var pe={},Rn=null;function Mi(){return Rn=Rn||new I}pe.Ma="serverreachability";function Ns(t){A.call(this,pe.Ma,t)}w(Ns,A);function be(t){const e=Mi();T(e,new Ns(e,t))}pe.STAT_EVENT="statevent";function Ps(t,e){A.call(this,pe.STAT_EVENT,t),this.stat=e}w(Ps,A);function b(t){const e=Mi();T(e,new Ps(e,t))}pe.Na="timingevent";function Ds(t,e){A.call(this,pe.Na,t),this.size=e}w(Ds,A);function Be(t,e){if(typeof t!="function")throw Error("Fn must not be null and must be a function");return u.setTimeout(function(){t()},e)}var Ui={NO_ERROR:0,lb:1,yb:2,xb:3,sb:4,wb:5,zb:6,Ja:7,TIMEOUT:8,Cb:9},Fh={qb:"complete",Mb:"success",Ka:"error",Ja:"abort",Eb:"ready",Fb:"readystatechange",TIMEOUT:"timeout",Ab:"incrementaldata",Db:"progress",tb:"downloadprogress",Ub:"uploadprogress"};function Fi(){}Fi.prototype.h=null;function kn(t){return t.h||(t.h=t.i())}var wt={OPEN:"a",pb:"b",Ka:"c",Bb:"d"};function xi(){A.call(this,"d")}w(xi,A);function ji(){A.call(this,"c")}w(ji,A);var hi;function At(){}w(At,Fi);At.prototype.g=function(){return new XMLHttpRequest};At.prototype.i=function(){return{}};hi=new At;function He(t,e,i,n){this.l=t,this.j=e,this.m=i,this.X=n||1,this.V=new Ce(this),this.P=xh,t=ii?125:void 0,this.W=new Et(t),this.H=null,this.i=!1,this.s=this.A=this.v=this.K=this.F=this.Y=this.B=null,this.D=[],this.g=null,this.C=0,this.o=this.u=null,this.N=-1,this.I=!1,this.O=0,this.L=null,this.aa=this.J=this.$=this.U=!1,this.h=new Ls}function Ls(){this.i=null,this.g="",this.h=!1}var xh=45e3,ci={},at={};l=He.prototype;l.setTimeout=function(t){this.P=t};function li(t,e,i){t.K=1,t.v=Rt(V(e)),t.s=i,t.U=!0,Ms(t,null)}function Ms(t,e){t.F=Date.now(),Ve(t),t.A=V(t.v);var i=t.A,n=t.X;Array.isArray(n)||(n=[String(n)]),Hs(i.h,"t",n),t.C=0,i=t.l.H,t.h=new Ls,t.g=hr(t.l,i?e:null,!t.s),0<t.O&&(t.L=new Ph(E(t.Ia,t,t.g),t.O)),bs(t.V,t.g,"readystatechange",t.gb),e=t.H?ms(t.H):{},t.s?(t.u||(t.u="POST"),e["Content-Type"]="application/x-www-form-urlencoded",t.g.ea(t.A,t.u,t.s,e)):(t.u="GET",t.g.ea(t.A,t.u,null,e)),be(1),Dh(t.j,t.u,t.A,t.m,t.X,t.s)}l.gb=function(t){t=t.target;const e=this.L;e&&$(t)==3?e.l():this.Ia(t)};l.Ia=function(t){try{if(t==this.g)e:{const f=$(this.g);var e=this.g.Da();const m=this.g.ba();if(!(3>f)&&(f!=3||ii||this.g&&(this.h.h||this.g.ga()||Nn(this.g)))){this.I||f!=4||e==7||(e==8||0>=m?be(3):be(2)),St(this);var i=this.g.ba();this.N=i;t:if(Us(this)){var n=Nn(this.g);t="";var s=n.length,r=$(this.g)==4;if(!this.h.i){if(typeof TextDecoder=="undefined"){Z(this),Ee(this);var o="";break t}this.h.i=new u.TextDecoder}for(e=0;e<s;e++)this.h.h=!0,t+=this.h.i.decode(n[e],{stream:r&&e==s-1});n.splice(0,s),this.h.g+=t,this.C=0,o=this.h.g}else o=this.g.ga();if(this.i=i==200,Lh(this.j,this.u,this.A,this.m,this.X,f,i),this.i){if(this.$&&!this.J){t:{if(this.g){var a,h=this.g;if((a=h.g?h.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!ot(a)){var c=a;break t}}c=null}if(i=c)he(this.j,this.m,i,"Initial handshake response via X-HTTP-Initial-Response"),this.J=!0,ui(this,i);else{this.i=!1,this.o=3,b(12),Z(this),Ee(this);break e}}this.U?(Fs(this,f,o),ii&&this.i&&f==3&&(bs(this.V,this.W,"tick",this.fb),this.W.start())):(he(this.j,this.m,o,null),ui(this,o)),f==4&&Z(this),this.i&&!this.I&&(f==4?sr(this.l,this):(this.i=!1,Ve(this)))}else i==400&&0<o.indexOf("Unknown SID")?(this.o=3,b(12)):(this.o=0,b(13)),Z(this),Ee(this)}}}catch{}finally{}};function Us(t){return t.g?t.u=="GET"&&t.K!=2&&t.l.Ba:!1}function Fs(t,e,i){let n=!0,s;for(;!t.I&&t.C<i.length;)if(s=jh(t,i),s==at){e==4&&(t.o=4,b(14),n=!1),he(t.j,t.m,null,"[Incomplete Response]");break}else if(s==ci){t.o=4,b(15),he(t.j,t.m,i,"[Invalid Chunk]"),n=!1;break}else he(t.j,t.m,s,null),ui(t,s);Us(t)&&s!=at&&s!=ci&&(t.h.g="",t.C=0),e!=4||i.length!=0||t.h.h||(t.o=1,b(16),n=!1),t.i=t.i&&n,n?0<i.length&&!t.aa&&(t.aa=!0,e=t.l,e.g==t&&e.$&&!e.L&&(e.h.info("Great, no buffering proxy detected. Bytes received: "+i.length),Ki(e),e.L=!0,b(11))):(he(t.j,t.m,i,"[Invalid Chunked Response]"),Z(t),Ee(t))}l.fb=function(){if(this.g){var t=$(this.g),e=this.g.ga();this.C<e.length&&(St(this),Fs(this,t,e),this.i&&t!=4&&Ve(this))}};function jh(t,e){var i=t.C,n=e.indexOf(`
`,i);return n==-1?at:(i=Number(e.substring(i,n)),isNaN(i)?ci:(n+=1,n+i>e.length?at:(e=e.substr(n,i),t.C=n+i,e)))}l.cancel=function(){this.I=!0,Z(this)};function Ve(t){t.Y=Date.now()+t.P,xs(t,t.P)}function xs(t,e){if(t.B!=null)throw Error("WatchDog timer not null");t.B=Be(E(t.eb,t),e)}function St(t){t.B&&(u.clearTimeout(t.B),t.B=null)}l.eb=function(){this.B=null;const t=Date.now();0<=t-this.Y?(Mh(this.j,this.A),this.K!=2&&(be(3),b(17)),Z(this),this.o=2,Ee(this)):xs(this,this.Y-t)};function Ee(t){t.l.G==0||t.I||sr(t.l,t)}function Z(t){St(t);var e=t.L;e&&typeof e.na=="function"&&e.na(),t.L=null,Di(t.W),Os(t.V),t.g&&(e=t.g,t.g=null,e.abort(),e.na())}function ui(t,e){try{var i=t.l;if(i.G!=0&&(i.g==t||di(i.i,t))){if(i.I=t.N,!t.J&&di(i.i,t)&&i.G==3){try{var n=i.Ca.g.parse(e)}catch{n=null}if(Array.isArray(n)&&n.length==3){var s=n;if(s[0]==0)e:if(!i.u){if(i.g)if(i.g.F+3e3<t.F)ut(i),Ot(i);else break e;qi(i),b(18)}else i.ta=s[1],0<i.ta-i.U&&37500>s[2]&&i.N&&i.A==0&&!i.v&&(i.v=Be(E(i.ab,i),6e3));if(1>=Ws(i.i)&&i.ka){try{i.ka()}catch{}i.ka=void 0}}else ee(i,11)}else if((t.J||i.g==t)&&ut(i),!ot(e))for(s=i.Ca.g.parse(e),e=0;e<s.length;e++){let c=s[e];if(i.U=c[0],c=c[1],i.G==2)if(c[0]=="c"){i.J=c[1],i.la=c[2];const f=c[3];f!=null&&(i.ma=f,i.h.info("VER="+i.ma));const m=c[4];m!=null&&(i.za=m,i.h.info("SVER="+i.za));const y=c[5];y!=null&&typeof y=="number"&&0<y&&(n=1.5*y,i.K=n,i.h.info("backChannelRequestTimeoutMs_="+n)),n=i;const R=t.g;if(R){const D=R.g?R.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(D){var r=n.i;!r.g&&(k(D,"spdy")||k(D,"quic")||k(D,"h2"))&&(r.j=r.l,r.g=new Set,r.h&&(Hi(r,r.h),r.h=null))}if(n.D){const oe=R.g?R.g.getResponseHeader("X-HTTP-Session-Id"):null;oe&&(n.sa=oe,v(n.F,n.D,oe))}}i.G=3,i.j&&i.j.xa(),i.$&&(i.O=Date.now()-t.F,i.h.info("Handshake RTT: "+i.O+"ms")),n=i;var o=t;if(n.oa=ar(n,n.H?n.la:null,n.W),o.J){Gs(n.i,o);var a=o,h=n.K;h&&a.setTimeout(h),a.B&&(St(a),Ve(a)),n.g=o}else ir(n);0<i.l.length&&Nt(i)}else c[0]!="stop"&&c[0]!="close"||ee(i,7);else i.G==3&&(c[0]=="stop"||c[0]=="close"?c[0]=="stop"?ee(i,7):Gi(i):c[0]!="noop"&&i.j&&i.j.wa(c),i.A=0)}}be(4)}catch{}}function $h(t){if(t.R&&typeof t.R=="function")return t.R();if(typeof t=="string")return t.split("");if(ti(t)){for(var e=[],i=t.length,n=0;n<i;n++)e.push(t[n]);return e}e=[],i=0;for(n in t)e[i++]=t[n];return e}function $i(t,e){if(t.forEach&&typeof t.forEach=="function")t.forEach(e,void 0);else if(ti(t)||typeof t=="string")gs(t,e,void 0);else{if(t.T&&typeof t.T=="function")var i=t.T();else if(t.R&&typeof t.R=="function")i=void 0;else if(ti(t)||typeof t=="string"){i=[];for(var n=t.length,s=0;s<n;s++)i.push(s)}else for(s in i=[],n=0,t)i[n++]=s;n=$h(t),s=n.length;for(var r=0;r<s;r++)e.call(void 0,n[r],i&&i[r],t)}}function ge(t,e){this.h={},this.g=[],this.i=0;var i=arguments.length;if(1<i){if(i%2)throw Error("Uneven number of arguments");for(var n=0;n<i;n+=2)this.set(arguments[n],arguments[n+1])}else if(t)if(t instanceof ge)for(i=t.T(),n=0;n<i.length;n++)this.set(i[n],t.get(i[n]));else for(n in t)this.set(n,t[n])}l=ge.prototype;l.R=function(){Bi(this);for(var t=[],e=0;e<this.g.length;e++)t.push(this.h[this.g[e]]);return t};l.T=function(){return Bi(this),this.g.concat()};function Bi(t){if(t.i!=t.g.length){for(var e=0,i=0;e<t.g.length;){var n=t.g[e];ne(t.h,n)&&(t.g[i++]=n),e++}t.g.length=i}if(t.i!=t.g.length){var s={};for(i=e=0;e<t.g.length;)n=t.g[e],ne(s,n)||(t.g[i++]=n,s[n]=1),e++;t.g.length=i}}l.get=function(t,e){return ne(this.h,t)?this.h[t]:e};l.set=function(t,e){ne(this.h,t)||(this.i++,this.g.push(t)),this.h[t]=e};l.forEach=function(t,e){for(var i=this.T(),n=0;n<i.length;n++){var s=i[n],r=this.get(s);t.call(e,r,s,this)}};function ne(t,e){return Object.prototype.hasOwnProperty.call(t,e)}var js=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;function Bh(t,e){if(t){t=t.split("&");for(var i=0;i<t.length;i++){var n=t[i].indexOf("="),s=null;if(0<=n){var r=t[i].substring(0,n);s=t[i].substring(n+1)}else r=t[i];e(r,s?decodeURIComponent(s.replace(/\+/g," ")):"")}}}function se(t,e){if(this.i=this.s=this.j="",this.m=null,this.o=this.l="",this.g=!1,t instanceof se){this.g=e!==void 0?e:t.g,ht(this,t.j),this.s=t.s,ct(this,t.i),lt(this,t.m),this.l=t.l,e=t.h;var i=new Oe;i.i=e.i,e.g&&(i.g=new ge(e.g),i.h=e.h),Cn(this,i),this.o=t.o}else t&&(i=String(t).match(js))?(this.g=!!e,ht(this,i[1]||"",!0),this.s=Te(i[2]||""),ct(this,i[3]||"",!0),lt(this,i[4]),this.l=Te(i[5]||"",!0),Cn(this,i[6]||"",!0),this.o=Te(i[7]||"")):(this.g=!!e,this.h=new Oe(null,this.g))}se.prototype.toString=function(){var t=[],e=this.j;e&&t.push(_e(e,bn,!0),":");var i=this.i;return(i||e=="file")&&(t.push("//"),(e=this.s)&&t.push(_e(e,bn,!0),"@"),t.push(encodeURIComponent(String(i)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),i=this.m,i!=null&&t.push(":",String(i))),(i=this.l)&&(this.i&&i.charAt(0)!="/"&&t.push("/"),t.push(_e(i,i.charAt(0)=="/"?Gh:Wh,!0))),(i=this.h.toString())&&t.push("?",i),(i=this.o)&&t.push("#",_e(i,Kh)),t.join("")};function V(t){return new se(t)}function ht(t,e,i){t.j=i?Te(e,!0):e,t.j&&(t.j=t.j.replace(/:$/,""))}function ct(t,e,i){t.i=i?Te(e,!0):e}function lt(t,e){if(e){if(e=Number(e),isNaN(e)||0>e)throw Error("Bad port number "+e);t.m=e}else t.m=null}function Cn(t,e,i){e instanceof Oe?(t.h=e,Xh(t.h,t.g)):(i||(e=_e(e,qh)),t.h=new Oe(e,t.g))}function v(t,e,i){t.h.set(e,i)}function Rt(t){return v(t,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),t}function Hh(t){return t instanceof se?V(t):new se(t,void 0)}function Vh(t,e,i,n){var s=new se(null,void 0);return t&&ht(s,t),e&&ct(s,e),i&&lt(s,i),n&&(s.l=n),s}function Te(t,e){return t?e?decodeURI(t.replace(/%25/g,"%2525")):decodeURIComponent(t):""}function _e(t,e,i){return typeof t=="string"?(t=encodeURI(t).replace(e,zh),i&&(t=t.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),t):null}function zh(t){return t=t.charCodeAt(0),"%"+(t>>4&15).toString(16)+(t&15).toString(16)}var bn=/[#\/\?@]/g,Wh=/[#\?:]/g,Gh=/[#\?]/g,qh=/[#\?@]/g,Kh=/#/g;function Oe(t,e){this.h=this.g=null,this.i=t||null,this.j=!!e}function Y(t){t.g||(t.g=new ge,t.h=0,t.i&&Bh(t.i,function(e,i){t.add(decodeURIComponent(e.replace(/\+/g," ")),i)}))}l=Oe.prototype;l.add=function(t,e){Y(this),this.i=null,t=me(this,t);var i=this.g.get(t);return i||this.g.set(t,i=[]),i.push(e),this.h+=1,this};function $s(t,e){Y(t),e=me(t,e),ne(t.g.h,e)&&(t.i=null,t.h-=t.g.get(e).length,t=t.g,ne(t.h,e)&&(delete t.h[e],t.i--,t.g.length>2*t.i&&Bi(t)))}function Bs(t,e){return Y(t),e=me(t,e),ne(t.g.h,e)}l.forEach=function(t,e){Y(this),this.g.forEach(function(i,n){gs(i,function(s){t.call(e,s,n,this)},this)},this)};l.T=function(){Y(this);for(var t=this.g.R(),e=this.g.T(),i=[],n=0;n<e.length;n++)for(var s=t[n],r=0;r<s.length;r++)i.push(e[n]);return i};l.R=function(t){Y(this);var e=[];if(typeof t=="string")Bs(this,t)&&(e=In(e,this.g.get(me(this,t))));else{t=this.g.R();for(var i=0;i<t.length;i++)e=In(e,t[i])}return e};l.set=function(t,e){return Y(this),this.i=null,t=me(this,t),Bs(this,t)&&(this.h-=this.g.get(t).length),this.g.set(t,[e]),this.h+=1,this};l.get=function(t,e){return t?(t=this.R(t),0<t.length?String(t[0]):e):e};function Hs(t,e,i){$s(t,e),0<i.length&&(t.i=null,t.g.set(me(t,e),Ai(i)),t.h+=i.length)}l.toString=function(){if(this.i)return this.i;if(!this.g)return"";for(var t=[],e=this.g.T(),i=0;i<e.length;i++){var n=e[i],s=encodeURIComponent(String(n));n=this.R(n);for(var r=0;r<n.length;r++){var o=s;n[r]!==""&&(o+="="+encodeURIComponent(String(n[r]))),t.push(o)}}return this.i=t.join("&")};function me(t,e){return e=String(e),t.j&&(e=e.toLowerCase()),e}function Xh(t,e){e&&!t.j&&(Y(t),t.i=null,t.g.forEach(function(i,n){var s=n.toLowerCase();n!=s&&($s(this,n),Hs(this,s,i))},t)),t.j=e}var Jh=class{constructor(t,e){this.h=t,this.g=e}};function Vs(t){this.l=t||Yh,u.PerformanceNavigationTiming?(t=u.performance.getEntriesByType("navigation"),t=0<t.length&&(t[0].nextHopProtocol=="hq"||t[0].nextHopProtocol=="h2")):t=!!(u.g&&u.g.Ea&&u.g.Ea()&&u.g.Ea().Zb),this.j=t?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}var Yh=10;function zs(t){return t.h?!0:t.g?t.g.size>=t.j:!1}function Ws(t){return t.h?1:t.g?t.g.size:0}function di(t,e){return t.h?t.h==e:t.g?t.g.has(e):!1}function Hi(t,e){t.g?t.g.add(e):t.h=e}function Gs(t,e){t.h&&t.h==e?t.h=null:t.g&&t.g.has(e)&&t.g.delete(e)}Vs.prototype.cancel=function(){if(this.i=qs(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const t of this.g.values())t.cancel();this.g.clear()}};function qs(t){if(t.h!=null)return t.i.concat(t.h.D);if(t.g!=null&&t.g.size!==0){let e=t.i;for(const i of t.g.values())e=e.concat(i.D);return e}return Ai(t.i)}function Vi(){}Vi.prototype.stringify=function(t){return u.JSON.stringify(t,void 0)};Vi.prototype.parse=function(t){return u.JSON.parse(t,void 0)};function Qh(){this.g=new Vi}function Zh(t,e,i){const n=i||"";try{$i(t,function(s,r){let o=s;je(s)&&(o=Ni(s)),e.push(n+r+"="+encodeURIComponent(o))})}catch(s){throw e.push(n+"type="+encodeURIComponent("_badmap")),s}}function ec(t,e){const i=new Tt;if(u.Image){const n=new Image;n.onload=Ge(Ke,i,n,"TestLoadImage: loaded",!0,e),n.onerror=Ge(Ke,i,n,"TestLoadImage: error",!1,e),n.onabort=Ge(Ke,i,n,"TestLoadImage: abort",!1,e),n.ontimeout=Ge(Ke,i,n,"TestLoadImage: timeout",!1,e),u.setTimeout(function(){n.ontimeout&&n.ontimeout()},1e4),n.src=t}else e(!1)}function Ke(t,e,i,n,s){try{e.onload=null,e.onerror=null,e.onabort=null,e.ontimeout=null,s(n)}catch{}}function kt(t){this.l=t.$b||null,this.j=t.ib||!1}w(kt,Fi);kt.prototype.g=function(){return new Ct(this.l,this.j)};kt.prototype.i=function(t){return function(){return t}}({});function Ct(t,e){I.call(this),this.D=t,this.u=e,this.m=void 0,this.readyState=zi,this.status=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.v=new Headers,this.h=null,this.C="GET",this.B="",this.g=!1,this.A=this.j=this.l=null}w(Ct,I);var zi=0;l=Ct.prototype;l.open=function(t,e){if(this.readyState!=zi)throw this.abort(),Error("Error reopening a connection");this.C=t,this.B=e,this.readyState=1,Ne(this)};l.send=function(t){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const e={headers:this.v,method:this.C,credentials:this.m,cache:void 0};t&&(e.body=t),(this.D||u).fetch(new Request(this.B,e)).then(this.Va.bind(this),this.ha.bind(this))};l.abort=function(){this.response=this.responseText="",this.v=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted."),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,ze(this)),this.readyState=zi};l.Va=function(t){if(this.g&&(this.l=t,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=t.headers,this.readyState=2,Ne(this)),this.g&&(this.readyState=3,Ne(this),this.g)))if(this.responseType==="arraybuffer")t.arrayBuffer().then(this.Ta.bind(this),this.ha.bind(this));else if(typeof u.ReadableStream!="undefined"&&"body"in t){if(this.j=t.body.getReader(),this.u){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.A=new TextDecoder;Ks(this)}else t.text().then(this.Ua.bind(this),this.ha.bind(this))};function Ks(t){t.j.read().then(t.Sa.bind(t)).catch(t.ha.bind(t))}l.Sa=function(t){if(this.g){if(this.u&&t.value)this.response.push(t.value);else if(!this.u){var e=t.value?t.value:new Uint8Array(0);(e=this.A.decode(e,{stream:!t.done}))&&(this.response=this.responseText+=e)}t.done?ze(this):Ne(this),this.readyState==3&&Ks(this)}};l.Ua=function(t){this.g&&(this.response=this.responseText=t,ze(this))};l.Ta=function(t){this.g&&(this.response=t,ze(this))};l.ha=function(){this.g&&ze(this)};function ze(t){t.readyState=4,t.l=null,t.j=null,t.A=null,Ne(t)}l.setRequestHeader=function(t,e){this.v.append(t,e)};l.getResponseHeader=function(t){return this.h&&this.h.get(t.toLowerCase())||""};l.getAllResponseHeaders=function(){if(!this.h)return"";const t=[],e=this.h.entries();for(var i=e.next();!i.done;)i=i.value,t.push(i[0]+": "+i[1]),i=e.next();return t.join(`\r
`)};function Ne(t){t.onreadystatechange&&t.onreadystatechange.call(t)}Object.defineProperty(Ct.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(t){this.m=t?"include":"same-origin"}});var tc=u.JSON.parse;function _(t){I.call(this),this.headers=new ge,this.u=t||null,this.h=!1,this.C=this.g=null,this.H="",this.m=0,this.j="",this.l=this.F=this.v=this.D=!1,this.B=0,this.A=null,this.J=Xs,this.K=this.L=!1}w(_,I);var Xs="",ic=/^https?$/i,nc=["POST","PUT"];l=_.prototype;l.ea=function(t,e,i,n){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.H+"; newUri="+t);e=e?e.toUpperCase():"GET",this.H=t,this.j="",this.m=0,this.D=!1,this.h=!0,this.g=this.u?this.u.g():hi.g(),this.C=this.u?kn(this.u):kn(hi),this.g.onreadystatechange=E(this.Fa,this);try{this.F=!0,this.g.open(e,String(t),!0),this.F=!1}catch(r){On(this,r);return}t=i||"";const s=new ge(this.headers);n&&$i(n,function(r,o){s.set(o,r)}),n=ph(s.T()),i=u.FormData&&t instanceof u.FormData,!(0<=ps(nc,e))||n||i||s.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8"),s.forEach(function(r,o){this.g.setRequestHeader(o,r)},this),this.J&&(this.g.responseType=this.J),"withCredentials"in this.g&&this.g.withCredentials!==this.L&&(this.g.withCredentials=this.L);try{Qs(this),0<this.B&&((this.K=sc(this.g))?(this.g.timeout=this.B,this.g.ontimeout=E(this.pa,this)):this.A=Li(this.pa,this.B,this)),this.v=!0,this.g.send(t),this.v=!1}catch(r){On(this,r)}};function sc(t){return Re&&_h()&&typeof t.timeout=="number"&&t.ontimeout!==void 0}function rc(t){return t.toLowerCase()=="content-type"}l.pa=function(){typeof wi!="undefined"&&this.g&&(this.j="Timed out after "+this.B+"ms, aborting",this.m=8,T(this,"timeout"),this.abort(8))};function On(t,e){t.h=!1,t.g&&(t.l=!0,t.g.abort(),t.l=!1),t.j=e,t.m=5,Js(t),bt(t)}function Js(t){t.D||(t.D=!0,T(t,"complete"),T(t,"error"))}l.abort=function(t){this.g&&this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1,this.m=t||7,T(this,"complete"),T(this,"abort"),bt(this))};l.M=function(){this.g&&(this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1),bt(this,!0)),_.Z.M.call(this)};l.Fa=function(){this.s||(this.F||this.v||this.l?Ys(this):this.cb())};l.cb=function(){Ys(this)};function Ys(t){if(t.h&&typeof wi!="undefined"&&(!t.C[1]||$(t)!=4||t.ba()!=2)){if(t.v&&$(t)==4)Li(t.Fa,0,t);else if(T(t,"readystatechange"),$(t)==4){t.h=!1;try{const a=t.ba();e:switch(a){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var e=!0;break e;default:e=!1}var i;if(!(i=e)){var n;if(n=a===0){var s=String(t.H).match(js)[1]||null;if(!s&&u.self&&u.self.location){var r=u.self.location.protocol;s=r.substr(0,r.length-1)}n=!ic.test(s?s.toLowerCase():"")}i=n}if(i)T(t,"complete"),T(t,"success");else{t.m=6;try{var o=2<$(t)?t.g.statusText:""}catch{o=""}t.j=o+" ["+t.ba()+"]",Js(t)}}finally{bt(t)}}}}function bt(t,e){if(t.g){Qs(t);const i=t.g,n=t.C[0]?rt:null;t.g=null,t.C=null,e||T(t,"ready");try{i.onreadystatechange=n}catch{}}}function Qs(t){t.g&&t.K&&(t.g.ontimeout=null),t.A&&(u.clearTimeout(t.A),t.A=null)}function $(t){return t.g?t.g.readyState:0}l.ba=function(){try{return 2<$(this)?this.g.status:-1}catch{return-1}};l.ga=function(){try{return this.g?this.g.responseText:""}catch{return""}};l.Qa=function(t){if(this.g){var e=this.g.responseText;return t&&e.indexOf(t)==0&&(e=e.substring(t.length)),tc(e)}};function Nn(t){try{if(!t.g)return null;if("response"in t.g)return t.g.response;switch(t.J){case Xs:case"text":return t.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in t.g)return t.g.mozResponseArrayBuffer}return null}catch{return null}}l.Da=function(){return this.m};l.La=function(){return typeof this.j=="string"?this.j:String(this.j)};function oc(t){let e="";return Si(t,function(i,n){e+=n,e+=":",e+=i,e+=`\r
`}),e}function Wi(t,e,i){e:{for(n in i){var n=!1;break e}n=!0}n||(i=oc(i),typeof t=="string"?i!=null&&encodeURIComponent(String(i)):v(t,e,i))}function ye(t,e,i){return i&&i.internalChannelParams&&i.internalChannelParams[t]||e}function Zs(t){this.za=0,this.l=[],this.h=new Tt,this.la=this.oa=this.F=this.W=this.g=this.sa=this.D=this.aa=this.o=this.P=this.s=null,this.Za=this.V=0,this.Xa=ye("failFast",!1,t),this.N=this.v=this.u=this.m=this.j=null,this.X=!0,this.I=this.ta=this.U=-1,this.Y=this.A=this.C=0,this.Pa=ye("baseRetryDelayMs",5e3,t),this.$a=ye("retryDelaySeedMs",1e4,t),this.Ya=ye("forwardChannelMaxRetries",2,t),this.ra=ye("forwardChannelRequestTimeoutMs",2e4,t),this.qa=t&&t.xmlHttpFactory||void 0,this.Ba=t&&t.Yb||!1,this.K=void 0,this.H=t&&t.supportsCrossDomainXhr||!1,this.J="",this.i=new Vs(t&&t.concurrentRequestLimit),this.Ca=new Qh,this.ja=t&&t.fastHandshake||!1,this.Ra=t&&t.Wb||!1,t&&t.Aa&&this.h.Aa(),t&&t.forceLongPolling&&(this.X=!1),this.$=!this.ja&&this.X&&t&&t.detectBufferingProxy||!1,this.ka=void 0,this.O=0,this.L=!1,this.B=null,this.Wa=!t||t.Xb!==!1}l=Zs.prototype;l.ma=8;l.G=1;function Gi(t){if(er(t),t.G==3){var e=t.V++,i=V(t.F);v(i,"SID",t.J),v(i,"RID",e),v(i,"TYPE","terminate"),We(t,i),e=new He(t,t.h,e,void 0),e.K=2,e.v=Rt(V(i)),i=!1,u.navigator&&u.navigator.sendBeacon&&(i=u.navigator.sendBeacon(e.v.toString(),"")),!i&&u.Image&&(new Image().src=e.v,i=!0),i||(e.g=hr(e.l,null),e.g.ea(e.v)),e.F=Date.now(),Ve(e)}or(t)}l.hb=function(t){try{this.h.info("Origin Trials invoked: "+t)}catch{}};function Ot(t){t.g&&(Ki(t),t.g.cancel(),t.g=null)}function er(t){Ot(t),t.u&&(u.clearTimeout(t.u),t.u=null),ut(t),t.i.cancel(),t.m&&(typeof t.m=="number"&&u.clearTimeout(t.m),t.m=null)}function Xt(t,e){t.l.push(new Jh(t.Za++,e)),t.G==3&&Nt(t)}function Nt(t){zs(t.i)||t.m||(t.m=!0,Pi(t.Ha,t),t.C=0)}function ac(t,e){return Ws(t.i)>=t.i.j-(t.m?1:0)?!1:t.m?(t.l=e.D.concat(t.l),!0):t.G==1||t.G==2||t.C>=(t.Xa?0:t.Ya)?!1:(t.m=Be(E(t.Ha,t,e),rr(t,t.C)),t.C++,!0)}l.Ha=function(t){if(this.m)if(this.m=null,this.G==1){if(!t){this.V=Math.floor(1e5*Math.random()),t=this.V++;const s=new He(this,this.h,t,void 0);let r=this.s;if(this.P&&(r?(r=ms(r),vs(r,this.P)):r=this.P),this.o===null&&(s.H=r),this.ja)e:{for(var e=0,i=0;i<this.l.length;i++){t:{var n=this.l[i];if("__data__"in n.g&&(n=n.g.__data__,typeof n=="string")){n=n.length;break t}n=void 0}if(n===void 0)break;if(e+=n,4096<e){e=i;break e}if(e===4096||i===this.l.length-1){e=i+1;break e}}e=1e3}else e=1e3;e=tr(this,s,e),i=V(this.F),v(i,"RID",t),v(i,"CVER",22),this.D&&v(i,"X-HTTP-Session-Id",this.D),We(this,i),this.o&&r&&Wi(i,this.o,r),Hi(this.i,s),this.Ra&&v(i,"TYPE","init"),this.ja?(v(i,"$req",e),v(i,"SID","null"),s.$=!0,li(s,i,null)):li(s,i,e),this.G=2}}else this.G==3&&(t?Pn(this,t):this.l.length==0||zs(this.i)||Pn(this))};function Pn(t,e){var i;e?i=e.m:i=t.V++;const n=V(t.F);v(n,"SID",t.J),v(n,"RID",i),v(n,"AID",t.U),We(t,n),t.o&&t.s&&Wi(n,t.o,t.s),i=new He(t,t.h,i,t.C+1),t.o===null&&(i.H=t.s),e&&(t.l=e.D.concat(t.l)),e=tr(t,i,1e3),i.setTimeout(Math.round(.5*t.ra)+Math.round(.5*t.ra*Math.random())),Hi(t.i,i),li(i,n,e)}function We(t,e){t.j&&$i({},function(i,n){v(e,n,i)})}function tr(t,e,i){i=Math.min(t.l.length,i);var n=t.j?E(t.j.Oa,t.j,t):null;e:{var s=t.l;let r=-1;for(;;){const o=["count="+i];r==-1?0<i?(r=s[0].h,o.push("ofs="+r)):r=0:o.push("ofs="+r);let a=!0;for(let h=0;h<i;h++){let c=s[h].h;const f=s[h].g;if(c-=r,0>c)r=Math.max(0,s[h].h-100),a=!1;else try{Zh(f,o,"req"+c+"_")}catch{n&&n(f)}}if(a){n=o.join("&");break e}}}return t=t.l.splice(0,i),e.D=t,n}function ir(t){t.g||t.u||(t.Y=1,Pi(t.Ga,t),t.A=0)}function qi(t){return t.g||t.u||3<=t.A?!1:(t.Y++,t.u=Be(E(t.Ga,t),rr(t,t.A)),t.A++,!0)}l.Ga=function(){if(this.u=null,nr(this),this.$&&!(this.L||this.g==null||0>=this.O)){var t=2*this.O;this.h.info("BP detection timer enabled: "+t),this.B=Be(E(this.bb,this),t)}};l.bb=function(){this.B&&(this.B=null,this.h.info("BP detection timeout reached."),this.h.info("Buffering proxy detected and switch to long-polling!"),this.N=!1,this.L=!0,b(10),Ot(this),nr(this))};function Ki(t){t.B!=null&&(u.clearTimeout(t.B),t.B=null)}function nr(t){t.g=new He(t,t.h,"rpc",t.Y),t.o===null&&(t.g.H=t.s),t.g.O=0;var e=V(t.oa);v(e,"RID","rpc"),v(e,"SID",t.J),v(e,"CI",t.N?"0":"1"),v(e,"AID",t.U),We(t,e),v(e,"TYPE","xmlhttp"),t.o&&t.s&&Wi(e,t.o,t.s),t.K&&t.g.setTimeout(t.K);var i=t.g;t=t.la,i.K=1,i.v=Rt(V(e)),i.s=null,i.U=!0,Ms(i,t)}l.ab=function(){this.v!=null&&(this.v=null,Ot(this),qi(this),b(19))};function ut(t){t.v!=null&&(u.clearTimeout(t.v),t.v=null)}function sr(t,e){var i=null;if(t.g==e){ut(t),Ki(t),t.g=null;var n=2}else if(di(t.i,e))i=e.D,Gs(t.i,e),n=1;else return;if(t.I=e.N,t.G!=0){if(e.i)if(n==1){i=e.s?e.s.length:0,e=Date.now()-e.F;var s=t.C;n=Mi(),T(n,new Ds(n,i,e,s)),Nt(t)}else ir(t);else if(s=e.o,s==3||s==0&&0<t.I||!(n==1&&ac(t,e)||n==2&&qi(t)))switch(i&&0<i.length&&(e=t.i,e.i=e.i.concat(i)),s){case 1:ee(t,5);break;case 4:ee(t,10);break;case 3:ee(t,6);break;default:ee(t,2)}}}function rr(t,e){let i=t.Pa+Math.floor(Math.random()*t.$a);return t.j||(i*=2),i*e}function ee(t,e){if(t.h.info("Error code "+e),e==2){var i=null;t.j&&(i=null);var n=E(t.jb,t);i||(i=new se("//www.google.com/images/cleardot.gif"),u.location&&u.location.protocol=="http"||ht(i,"https"),Rt(i)),ec(i.toString(),n)}else b(2);t.G=0,t.j&&t.j.va(e),or(t),er(t)}l.jb=function(t){t?(this.h.info("Successfully pinged google.com"),b(2)):(this.h.info("Failed to ping google.com"),b(1))};function or(t){t.G=0,t.I=-1,t.j&&((qs(t.i).length!=0||t.l.length!=0)&&(t.i.i.length=0,Ai(t.l),t.l.length=0),t.j.ua())}function ar(t,e,i){let n=Hh(i);if(n.i!="")e&&ct(n,e+"."+n.i),lt(n,n.m);else{const s=u.location;n=Vh(s.protocol,e?e+"."+s.hostname:s.hostname,+s.port,i)}return t.aa&&Si(t.aa,function(s,r){v(n,r,s)}),e=t.D,i=t.sa,e&&i&&v(n,e,i),v(n,"VER",t.ma),We(t,n),n}function hr(t,e,i){if(e&&!t.H)throw Error("Can't create secondary domain capable XhrIo object.");return e=i&&t.Ba&&!t.qa?new _(new kt({ib:!0})):new _(t.qa),e.L=t.H,e}function cr(){}l=cr.prototype;l.xa=function(){};l.wa=function(){};l.va=function(){};l.ua=function(){};l.Oa=function(){};function P(t,e){I.call(this),this.g=new Zs(e),this.l=t,this.h=e&&e.messageUrlParams||null,t=e&&e.messageHeaders||null,e&&e.clientProtocolHeaderRequired&&(t?t["X-Client-Protocol"]="webchannel":t={"X-Client-Protocol":"webchannel"}),this.g.s=t,t=e&&e.initMessageHeaders||null,e&&e.messageContentType&&(t?t["X-WebChannel-Content-Type"]=e.messageContentType:t={"X-WebChannel-Content-Type":e.messageContentType}),e&&e.ya&&(t?t["X-WebChannel-Client-Profile"]=e.ya:t={"X-WebChannel-Client-Profile":e.ya}),this.g.P=t,(t=e&&e.httpHeadersOverwriteParam)&&!ot(t)&&(this.g.o=t),this.A=e&&e.supportsCrossDomainXhr||!1,this.v=e&&e.sendRawJson||!1,(e=e&&e.httpSessionIdParam)&&!ot(e)&&(this.g.D=e,t=this.h,t!==null&&e in t&&(t=this.h,e in t&&delete t[e])),this.j=new ve(this)}w(P,I);P.prototype.m=function(){this.g.j=this.j,this.A&&(this.g.H=!0);var t=this.g,e=this.l,i=this.h||void 0;t.Wa&&(t.h.info("Origin Trials enabled."),Pi(E(t.hb,t,e))),b(0),t.W=e,t.aa=i||{},t.N=t.X,t.F=ar(t,null,t.W),Nt(t)};P.prototype.close=function(){Gi(this.g)};P.prototype.u=function(t){if(typeof t=="string"){var e={};e.__data__=t,Xt(this.g,e)}else this.v?(e={},e.__data__=Ni(t),Xt(this.g,e)):Xt(this.g,t)};P.prototype.M=function(){this.g.j=null,delete this.j,Gi(this.g),delete this.g,P.Z.M.call(this)};function lr(t){xi.call(this);var e=t.__sm__;if(e){e:{for(const i in e){t=i;break e}t=void 0}(this.i=t)&&(t=this.i,e=e!==null&&t in e?e[t]:void 0),this.data=e}else this.data=t}w(lr,xi);function ur(){ji.call(this),this.status=1}w(ur,ji);function ve(t){this.g=t}w(ve,cr);ve.prototype.xa=function(){T(this.g,"a")};ve.prototype.wa=function(t){T(this.g,new lr(t))};ve.prototype.va=function(t){T(this.g,new ur(t))};ve.prototype.ua=function(){T(this.g,"b")};P.prototype.send=P.prototype.u;P.prototype.open=P.prototype.m;P.prototype.close=P.prototype.close;Ui.NO_ERROR=0;Ui.TIMEOUT=8;Ui.HTTP_ERROR=6;Fh.COMPLETE="complete";wt.OPEN="a";wt.CLOSE="b";wt.ERROR="c";wt.MESSAGE="d";I.prototype.listen=I.prototype.N;_.prototype.listenOnce=_.prototype.O;_.prototype.getLastError=_.prototype.La;_.prototype.getLastErrorCode=_.prototype.Da;_.prototype.getStatus=_.prototype.ba;_.prototype.getResponseJson=_.prototype.Qa;_.prototype.getResponseText=_.prototype.ga;_.prototype.send=_.prototype.ea;const Dn="@firebase/firestore";/**
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
 */class O{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}O.UNAUTHENTICATED=new O(null),O.GOOGLE_CREDENTIALS=new O("google-credentials-uid"),O.FIRST_PARTY=new O("first-party-uid"),O.MOCK_USER=new O("mock-user");/**
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
 */let Pt="9.6.7";/**
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
 */const dt=new fi("@firebase/firestore");function N(t,...e){if(dt.logLevel<=g.DEBUG){const i=e.map(dr);dt.debug(`Firestore (${Pt}): ${t}`,...i)}}function Xi(t,...e){if(dt.logLevel<=g.ERROR){const i=e.map(dr);dt.error(`Firestore (${Pt}): ${t}`,...i)}}function dr(t){if(typeof t=="string")return t;try{return e=t,JSON.stringify(e)}catch{return t}/**
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
*/var e}/**
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
 */function fr(t="Unexpected state"){const e=`FIRESTORE (${Pt}) INTERNAL ASSERTION FAILED: `+t;throw Xi(e),new Error(e)}function ft(t,e){t||fr()}/**
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
 */const L={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class M extends re{constructor(e,i){super(e,i),this.code=e,this.message=i,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class ue{constructor(){this.promise=new Promise((e,i)=>{this.resolve=e,this.reject=i})}}/**
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
 */class hc{constructor(e,i){this.user=i,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class cc{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,i){e.enqueueRetryable(()=>i(O.UNAUTHENTICATED))}shutdown(){}}class lc{constructor(e){this.t=e,this.currentUser=O.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,i){let n=this.i;const s=h=>this.i!==n?(n=this.i,i(h)):Promise.resolve();let r=new ue;this.o=()=>{this.i++,this.currentUser=this.u(),r.resolve(),r=new ue,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const h=r;e.enqueueRetryable(async()=>{await h.promise,await s(this.currentUser)})},a=h=>{N("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.auth.addAuthTokenListener(this.o),o()};this.t.onInit(h=>a(h)),setTimeout(()=>{if(!this.auth){const h=this.t.getImmediate({optional:!0});h?a(h):(N("FirebaseAuthCredentialsProvider","Auth not yet detected"),r.resolve(),r=new ue)}},0),o()}getToken(){const e=this.i,i=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(i).then(n=>this.i!==e?(N("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(ft(typeof n.accessToken=="string"),new hc(n.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){const e=this.auth&&this.auth.getUid();return ft(e===null||typeof e=="string"),new O(e)}}class uc{constructor(e,i,n){this.type="FirstParty",this.user=O.FIRST_PARTY,this.headers=new Map,this.headers.set("X-Goog-AuthUser",i);const s=e.auth.getAuthHeaderValueForFirstParty([]);s&&this.headers.set("Authorization",s),n&&this.headers.set("X-Goog-Iam-Authorization-Token",n)}}class dc{constructor(e,i,n){this.h=e,this.l=i,this.m=n}getToken(){return Promise.resolve(new uc(this.h,this.l,this.m))}start(e,i){e.enqueueRetryable(()=>i(O.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class fc{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class pc{constructor(e){this.g=e,this.forceRefresh=!1,this.appCheck=null,this.p=null}start(e,i){const n=r=>{r.error!=null&&N("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${r.error.message}`);const o=r.token!==this.p;return this.p=r.token,N("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?i(r.token):Promise.resolve()};this.o=r=>{e.enqueueRetryable(()=>n(r))};const s=r=>{N("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=r,this.appCheck.addTokenListener(this.o)};this.g.onInit(r=>s(r)),setTimeout(()=>{if(!this.appCheck){const r=this.g.getImmediate({optional:!0});r?s(r):N("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(i=>i?(ft(typeof i.token=="string"),this.p=i.token,new fc(i.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}}/**
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
 */function gc(t){const e=typeof self!="undefined"&&(self.crypto||self.msCrypto),i=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(i);else for(let n=0;n<t;n++)i[n]=Math.floor(256*Math.random());return i}class mc{static R(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",i=Math.floor(256/e.length)*e.length;let n="";for(;n.length<20;){const s=gc(40);for(let r=0;r<s.length;++r)n.length<20&&s[r]<i&&(n+=e.charAt(s[r]%e.length))}return n}}/**
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
 */class vc{constructor(e,i,n,s,r,o,a,h){this.databaseId=e,this.appId=i,this.persistenceKey=n,this.host=s,this.ssl=r,this.forceLongPolling=o,this.autoDetectLongPolling=a,this.useFetchStreams=h}}class Pe{constructor(e,i){this.projectId=e,this.database=i||"(default)"}static empty(){return new Pe("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof Pe&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */var Ln,p;(p=Ln||(Ln={}))[p.OK=0]="OK",p[p.CANCELLED=1]="CANCELLED",p[p.UNKNOWN=2]="UNKNOWN",p[p.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",p[p.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",p[p.NOT_FOUND=5]="NOT_FOUND",p[p.ALREADY_EXISTS=6]="ALREADY_EXISTS",p[p.PERMISSION_DENIED=7]="PERMISSION_DENIED",p[p.UNAUTHENTICATED=16]="UNAUTHENTICATED",p[p.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",p[p.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",p[p.ABORTED=10]="ABORTED",p[p.OUT_OF_RANGE=11]="OUT_OF_RANGE",p[p.UNIMPLEMENTED=12]="UNIMPLEMENTED",p[p.INTERNAL=13]="INTERNAL",p[p.UNAVAILABLE=14]="UNAVAILABLE",p[p.DATA_LOSS=15]="DATA_LOSS";function pr(t){return t.name==="IndexedDbTransactionError"}function Jt(){return typeof document!="undefined"?document:null}class yc{constructor(e,i,n=1e3,s=1.5,r=6e4){this.Sn=e,this.timerId=i,this.qr=n,this.Kr=s,this.Gr=r,this.jr=0,this.Qr=null,this.Wr=Date.now(),this.reset()}reset(){this.jr=0}zr(){this.jr=this.Gr}Hr(e){this.cancel();const i=Math.floor(this.jr+this.Jr()),n=Math.max(0,Date.now()-this.Wr),s=Math.max(0,i-n);s>0&&N("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.jr} ms, delay with jitter: ${i} ms, last attempt: ${n} ms ago)`),this.Qr=this.Sn.enqueueAfterDelay(this.timerId,s,()=>(this.Wr=Date.now(),e())),this.jr*=this.Kr,this.jr<this.qr&&(this.jr=this.qr),this.jr>this.Gr&&(this.jr=this.Gr)}Yr(){this.Qr!==null&&(this.Qr.skipDelay(),this.Qr=null)}cancel(){this.Qr!==null&&(this.Qr.cancel(),this.Qr=null)}Jr(){return(Math.random()-.5)*this.jr}}/**
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
 */class Ji{constructor(e,i,n,s,r){this.asyncQueue=e,this.timerId=i,this.targetTimeMs=n,this.op=s,this.removalCallback=r,this.deferred=new ue,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}static createAndSchedule(e,i,n,s,r){const o=Date.now()+n,a=new Ji(e,i,o,s,r);return a.start(n),a}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new M(L.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function _c(t,e){if(Xi("AsyncQueue",`${e}: ${t}`),pr(t))return new M(L.UNAVAILABLE,`${e}: ${t}`);throw t}/**
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
 */class Ic{constructor(e,i,n,s){this.authCredentials=e,this.appCheckCredentials=i,this.asyncQueue=n,this.databaseInfo=s,this.user=O.UNAUTHENTICATED,this.clientId=mc.R(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(n,async r=>{N("FirestoreClient","Received user=",r.uid),await this.authCredentialListener(r),this.user=r}),this.appCheckCredentials.start(n,r=>(N("FirestoreClient","Received new app check token=",r),this.appCheckCredentialListener(r,this.user)))}async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new M(L.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();const e=new ue;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this.onlineComponents&&await this.onlineComponents.terminate(),this.offlineComponents&&await this.offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(i){const n=_c(i,"Failed to shutdown persistence");e.reject(n)}}),e.promise}}const Mn=new Map;function Ec(t,e,i,n){if(e===!0&&n===!0)throw new M(L.INVALID_ARGUMENT,`${t} and ${i} cannot be used together.`)}/**
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
 */class Un{constructor(e){var i;if(e.host===void 0){if(e.ssl!==void 0)throw new M(L.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(i=e.ssl)===null||i===void 0||i;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new M(L.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.useFetchStreams=!!e.useFetchStreams,Ec("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling)}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}/**
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
 */class Tc{constructor(e,i,n){this._authCredentials=i,this._appCheckCredentials=n,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Un({}),this._settingsFrozen=!1,e instanceof Pe?this._databaseId=e:(this._app=e,this._databaseId=function(s){if(!Object.prototype.hasOwnProperty.apply(s.options,["projectId"]))throw new M(L.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Pe(s.options.projectId)}(e))}get app(){if(!this._app)throw new M(L.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!==void 0}_setSettings(e){if(this._settingsFrozen)throw new M(L.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Un(e),e.credentials!==void 0&&(this._authCredentials=function(i){if(!i)return new cc;switch(i.type){case"gapi":const n=i.client;return ft(!(typeof n!="object"||n===null||!n.auth||!n.auth.getAuthHeaderValueForFirstParty)),new dc(n,i.sessionIndex||"0",i.iamToken||null);case"provider":return i.client;default:throw new M(L.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const i=Mn.get(e);i&&(N("ComponentProvider","Removing Datastore"),Mn.delete(e),i.terminate())}(this),Promise.resolve()}}/**
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
 */class wc{constructor(){this.hu=Promise.resolve(),this.lu=[],this.fu=!1,this.du=[],this._u=null,this.wu=!1,this.mu=!1,this.gu=[],this.ro=new yc(this,"async_queue_retry"),this.yu=()=>{const i=Jt();i&&N("AsyncQueue","Visibility state changed to "+i.visibilityState),this.ro.Yr()};const e=Jt();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.yu)}get isShuttingDown(){return this.fu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.pu(),this.Iu(e)}enterRestrictedMode(e){if(!this.fu){this.fu=!0,this.mu=e||!1;const i=Jt();i&&typeof i.removeEventListener=="function"&&i.removeEventListener("visibilitychange",this.yu)}}enqueue(e){if(this.pu(),this.fu)return new Promise(()=>{});const i=new ue;return this.Iu(()=>this.fu&&this.mu?Promise.resolve():(e().then(i.resolve,i.reject),i.promise)).then(()=>i.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.lu.push(e),this.Eu()))}async Eu(){if(this.lu.length!==0){try{await this.lu[0](),this.lu.shift(),this.ro.reset()}catch(e){if(!pr(e))throw e;N("AsyncQueue","Operation failed with retryable error: "+e)}this.lu.length>0&&this.ro.Hr(()=>this.Eu())}}Iu(e){const i=this.hu.then(()=>(this.wu=!0,e().catch(n=>{this._u=n,this.wu=!1;const s=function(r){let o=r.message||"";return r.stack&&(o=r.stack.includes(r.message)?r.stack:r.message+`
`+r.stack),o}(n);throw Xi("INTERNAL UNHANDLED ERROR: ",s),n}).then(n=>(this.wu=!1,n))));return this.hu=i,i}enqueueAfterDelay(e,i,n){this.pu(),this.gu.indexOf(e)>-1&&(i=0);const s=Ji.createAndSchedule(this,e,i,n,r=>this.Tu(r));return this.du.push(s),s}pu(){this._u&&fr()}verifyOperationInProgress(){}async Au(){let e;do e=this.hu,await e;while(e!==this.hu)}Ru(e){for(const i of this.du)if(i.timerId===e)return!0;return!1}Pu(e){return this.Au().then(()=>{this.du.sort((i,n)=>i.targetTimeMs-n.targetTimeMs);for(const i of this.du)if(i.skipDelay(),e!=="all"&&i.timerId===e)break;return this.Au()})}bu(e){this.gu.push(e)}Tu(e){const i=this.du.indexOf(e);this.du.splice(i,1)}}class Ac extends Tc{constructor(e,i,n){super(e,i,n),this.type="firestore",this._queue=new wc,this._persistenceKey="name"in e?e.name:"[DEFAULT]"}_terminate(){return this._firestoreClient||Sc(this),this._firestoreClient.terminate()}}function Cc(t=xn()){return gi(t,"firestore").getImmediate()}function Sc(t){var e;const i=t._freezeSettings(),n=function(s,r,o,a){return new vc(s,r,o,a.host,a.ssl,a.experimentalForceLongPolling,a.experimentalAutoDetectLongPolling,a.useFetchStreams)}(t._databaseId,((e=t._app)===null||e===void 0?void 0:e.options.appId)||"",t._persistenceKey,i);t._firestoreClient=new Ic(t._authCredentials,t._appCheckCredentials,t._queue,n)}(function(t,e=!0){(function(i){Pt=i})(Me),we(new de("firestore",(i,{options:n})=>{const s=i.getProvider("app").getImmediate(),r=new Ac(s,new lc(i.getProvider("auth-internal")),new pc(i.getProvider("app-check-internal")));return n=Object.assign({useFetchStreams:e},n),r._setSettings(n),r},"PUBLIC")),X(Dn,"3.4.5",t),X(Dn,"3.4.5","esm2017")})();export{Cc as d,kc as g,Rc as i};
