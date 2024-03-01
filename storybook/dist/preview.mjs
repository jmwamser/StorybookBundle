import { global } from '@storybook/global';
import { useEffect } from '@storybook/preview-api';

var m="data-storybook-action",d=r=>r?.isAction??!1,p=()=>{if(!window.crypto)throw new Error("The crypto module is not available in your browser.");return window.crypto.randomUUID()},y=r=>{if(r.currentTarget!==null&&Object.hasOwn(r.currentTarget,"__component")){let t=new Proxy(r.currentTarget,{ownKeys(e){return Object.keys(e).filter(n=>n!=="__component")}});return new Proxy(r,{get(e,n){return n==="currentTarget"?t:Reflect.get(e,n)}})}return r},f=r=>{let t=[];for(let e in r){let n=r[e];if(d(n)){let o=p();t.push({event:e,handler:(...i)=>{let s=i.map(y);n(...s);},id:o}),r[e]=o;}}return t},u=(r,t)=>{let{args:e}=t,n=f(e),o=document.getElementById("storybook-root");return useEffect(()=>{if(o===null)return;let i=n.reduce((s,c)=>{let a=o.querySelector(`[${m}='${c.id}']`);return a!==null&&s.push({el:a,action:c}),s},[]);return i.forEach(({el:s,action:c})=>s.addEventListener(c.event,c.handler)),()=>i.forEach(({el:s,action:c})=>s.removeEventListener(c.event,c.handler))},[o,n]),r(t)};function A(){return global.FRAMEWORK_OPTIONS}var v=async(r,t,e,n)=>{let o=new URL(`${r}/${t}`);return o.search=new URLSearchParams({...n.globals,...e}).toString(),(await fetch(o)).text()},T=[(r,t)=>{let{server:e={}}=t.parameters;return e.url===void 0&&(e.url=`${A().symfony.server}/_storybook/render`),e.fetchStoryHtml=v,t.parameters.server=e,r()},u];

export { T as decorators };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=preview.mjs.map