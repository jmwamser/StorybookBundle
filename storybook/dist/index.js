'use strict';

var Ne=Object.create;var R=Object.defineProperty;var be=Object.getOwnPropertyDescriptor;var Ee=Object.getOwnPropertyNames;var me=Object.getPrototypeOf,Te=Object.prototype.hasOwnProperty;var b=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var ye=(e,t,n,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of Ee(t))!Te.call(e,r)&&r!==n&&R(e,r,{get:()=>t[r],enumerable:!(i=be(t,r))||i.enumerable});return e};var we=(e,t,n)=>(n=e!=null?Ne(me(e)):{},ye(t||!e||!e.__esModule?R(n,"default",{value:e,enumerable:!0}):n,e));var O=b(E=>{var B=":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD",Ae=B+"\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040",k="["+B+"]["+Ae+"]*",Pe=new RegExp("^"+k+"$"),Oe=function(e,t){let n=[],i=t.exec(e);for(;i;){let r=[];r.startIndex=t.lastIndex-i[0].length;let s=i.length;for(let f=0;f<s;f++)r.push(i[f]);n.push(r),i=t.exec(e);}return n},Ie=function(e){let t=Pe.exec(e);return !(t===null||typeof t>"u")};E.isExist=function(e){return typeof e<"u"};E.isEmptyObject=function(e){return Object.keys(e).length===0};E.merge=function(e,t,n){if(t){let i=Object.keys(t),r=i.length;for(let s=0;s<r;s++)n==="strict"?e[i[s]]=[t[i[s]]]:e[i[s]]=t[i[s]];}};E.getValue=function(e){return E.isExist(e)?e:""};E.isName=Ie;E.getAllMatches=Oe;E.nameRegexp=k;});var C=b(G=>{var I=O(),Ce={allowBooleanAttributes:!1,unpairedTags:[]};G.validate=function(e,t){t=Object.assign({},Ce,t);let n=[],i=!1,r=!1;e[0]==="\uFEFF"&&(e=e.substr(1));for(let s=0;s<e.length;s++)if(e[s]==="<"&&e[s+1]==="?"){if(s+=2,s=M(e,s),s.err)return s}else if(e[s]==="<"){let f=s;if(s++,e[s]==="!"){s=X(e,s);continue}else {let u=!1;e[s]==="/"&&(u=!0,s++);let o="";for(;s<e.length&&e[s]!==">"&&e[s]!==" "&&e[s]!=="	"&&e[s]!==`
`&&e[s]!=="\r";s++)o+=e[s];if(o=o.trim(),o[o.length-1]==="/"&&(o=o.substring(0,o.length-1),s--),!Le(o)){let c;return o.trim().length===0?c="Invalid space after '<'.":c="Tag '"+o+"' is an invalid name.",g("InvalidTag",c,N(e,s))}let a=Se(e,s);if(a===!1)return g("InvalidAttr","Attributes for '"+o+"' have open quote.",N(e,s));let l=a.value;if(s=a.index,l[l.length-1]==="/"){let c=s-l.length;l=l.substring(0,l.length-1);let d=Z(l,t);if(d===!0)i=!0;else return g(d.err.code,d.err.msg,N(e,c+d.err.line))}else if(u)if(a.tagClosed){if(l.trim().length>0)return g("InvalidTag","Closing tag '"+o+"' can't have attributes or invalid starting.",N(e,f));{let c=n.pop();if(o!==c.tagName){let d=N(e,c.tagStartPos);return g("InvalidTag","Expected closing tag '"+c.tagName+"' (opened in line "+d.line+", col "+d.col+") instead of closing tag '"+o+"'.",N(e,f))}n.length==0&&(r=!0);}}else return g("InvalidTag","Closing tag '"+o+"' doesn't have proper closing.",N(e,s));else {let c=Z(l,t);if(c!==!0)return g(c.err.code,c.err.msg,N(e,s-l.length+c.err.line));if(r===!0)return g("InvalidXml","Multiple possible root nodes found.",N(e,s));t.unpairedTags.indexOf(o)!==-1||n.push({tagName:o,tagStartPos:f}),i=!0;}for(s++;s<e.length;s++)if(e[s]==="<")if(e[s+1]==="!"){s++,s=X(e,s);continue}else if(e[s+1]==="?"){if(s=M(e,++s),s.err)return s}else break;else if(e[s]==="&"){let c=$e(e,s);if(c==-1)return g("InvalidChar","char '&' is not expected.",N(e,s));s=c;}else if(r===!0&&!q(e[s]))return g("InvalidXml","Extra text at the end",N(e,s));e[s]==="<"&&s--;}}else {if(q(e[s]))continue;return g("InvalidChar","char '"+e[s]+"' is not expected.",N(e,s))}if(i){if(n.length==1)return g("InvalidTag","Unclosed tag '"+n[0].tagName+"'.",N(e,n[0].tagStartPos));if(n.length>0)return g("InvalidXml","Invalid '"+JSON.stringify(n.map(s=>s.tagName),null,4).replace(/\r?\n/g,"")+"' found.",{line:1,col:1})}else return g("InvalidXml","Start tag expected.",1);return !0};function q(e){return e===" "||e==="	"||e===`
`||e==="\r"}function M(e,t){let n=t;for(;t<e.length;t++)if(e[t]=="?"||e[t]==" "){let i=e.substr(n,t-n);if(t>5&&i==="xml")return g("InvalidXml","XML declaration allowed only at the start of the document.",N(e,t));if(e[t]=="?"&&e[t+1]==">"){t++;break}else continue}return t}function X(e,t){if(e.length>t+5&&e[t+1]==="-"&&e[t+2]==="-"){for(t+=3;t<e.length;t++)if(e[t]==="-"&&e[t+1]==="-"&&e[t+2]===">"){t+=2;break}}else if(e.length>t+8&&e[t+1]==="D"&&e[t+2]==="O"&&e[t+3]==="C"&&e[t+4]==="T"&&e[t+5]==="Y"&&e[t+6]==="P"&&e[t+7]==="E"){let n=1;for(t+=8;t<e.length;t++)if(e[t]==="<")n++;else if(e[t]===">"&&(n--,n===0))break}else if(e.length>t+9&&e[t+1]==="["&&e[t+2]==="C"&&e[t+3]==="D"&&e[t+4]==="A"&&e[t+5]==="T"&&e[t+6]==="A"&&e[t+7]==="["){for(t+=8;t<e.length;t++)if(e[t]==="]"&&e[t+1]==="]"&&e[t+2]===">"){t+=2;break}}return t}var xe='"',ve="'";function Se(e,t){let n="",i="",r=!1;for(;t<e.length;t++){if(e[t]===xe||e[t]===ve)i===""?i=e[t]:i!==e[t]||(i="");else if(e[t]===">"&&i===""){r=!0;break}n+=e[t];}return i!==""?!1:{value:n,index:t,tagClosed:r}}var Ve=new RegExp(`(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['"])(([\\s\\S])*?)\\5)?`,"g");function Z(e,t){let n=I.getAllMatches(e,Ve),i={};for(let r=0;r<n.length;r++){if(n[r][1].length===0)return g("InvalidAttr","Attribute '"+n[r][2]+"' has no space in starting.",A(n[r]));if(n[r][3]!==void 0&&n[r][4]===void 0)return g("InvalidAttr","Attribute '"+n[r][2]+"' is without value.",A(n[r]));if(n[r][3]===void 0&&!t.allowBooleanAttributes)return g("InvalidAttr","boolean attribute '"+n[r][2]+"' is not allowed.",A(n[r]));let s=n[r][2];if(!_e(s))return g("InvalidAttr","Attribute '"+s+"' is an invalid name.",A(n[r]));if(!i.hasOwnProperty(s))i[s]=1;else return g("InvalidAttr","Attribute '"+s+"' is repeated.",A(n[r]))}return !0}function Fe(e,t){let n=/\d/;for(e[t]==="x"&&(t++,n=/[\da-fA-F]/);t<e.length;t++){if(e[t]===";")return t;if(!e[t].match(n))break}return -1}function $e(e,t){if(t++,e[t]===";")return -1;if(e[t]==="#")return t++,Fe(e,t);let n=0;for(;t<e.length;t++,n++)if(!(e[t].match(/\w/)&&n<20)){if(e[t]===";")break;return -1}return t}function g(e,t,n){return {err:{code:e,msg:t,line:n.line||n,col:n.col}}}function _e(e){return I.isName(e)}function Le(e){return I.isName(e)}function N(e,t){let n=e.substring(0,t).split(/\r?\n/);return {line:n.length,col:n[n.length-1].length+1}}function A(e){return e.startIndex+e[1].length}});var U=b(x=>{var H={preserveOrder:!1,attributeNamePrefix:"@_",attributesGroupName:!1,textNodeName:"#text",ignoreAttributes:!0,removeNSPrefix:!1,allowBooleanAttributes:!1,parseTagValue:!0,parseAttributeValue:!1,trimValues:!0,cdataPropName:!1,numberParseOptions:{hex:!0,leadingZeros:!0,eNotation:!0},tagValueProcessor:function(e,t){return t},attributeValueProcessor:function(e,t){return t},stopNodes:[],alwaysCreateTextNode:!1,isArray:()=>!1,commentPropName:!1,unpairedTags:[],processEntities:!0,htmlEntities:!1,ignoreDeclaration:!1,ignorePiTags:!1,transformTagName:!1,transformAttributeName:!1,updateTag:function(e,t,n){return e}},Re=function(e){return Object.assign({},H,e)};x.buildOptions=Re;x.defaultOptions=H;});var Y=b((kt,W)=>{var v=class{constructor(t){this.tagname=t,this.child=[],this[":@"]={};}add(t,n){t==="__proto__"&&(t="#__proto__"),this.child.push({[t]:n});}addChild(t){t.tagname==="__proto__"&&(t.tagname="#__proto__"),t[":@"]&&Object.keys(t[":@"]).length>0?this.child.push({[t.tagname]:t.child,":@":t[":@"]}):this.child.push({[t.tagname]:t.child});}};W.exports=v;});var J=b((qt,z)=>{var Be=O();function ke(e,t){let n={};if(e[t+3]==="O"&&e[t+4]==="C"&&e[t+5]==="T"&&e[t+6]==="Y"&&e[t+7]==="P"&&e[t+8]==="E"){t=t+9;let i=1,r=!1,s=!1,f="";for(;t<e.length;t++)if(e[t]==="<"&&!s){if(r&&Xe(e,t))t+=7,[entityName,val,t]=qe(e,t+1),val.indexOf("&")===-1&&(n[Ue(entityName)]={regx:RegExp(`&${entityName};`,"g"),val});else if(r&&Ze(e,t))t+=8;else if(r&&Ge(e,t))t+=8;else if(r&&He(e,t))t+=9;else if(Me)s=!0;else throw new Error("Invalid DOCTYPE");i++,f="";}else if(e[t]===">"){if(s?e[t-1]==="-"&&e[t-2]==="-"&&(s=!1,i--):i--,i===0)break}else e[t]==="["?r=!0:f+=e[t];if(i!==0)throw new Error("Unclosed DOCTYPE")}else throw new Error("Invalid Tag instead of DOCTYPE");return {entities:n,i:t}}function qe(e,t){let n="";for(;t<e.length&&e[t]!=="'"&&e[t]!=='"';t++)n+=e[t];if(n=n.trim(),n.indexOf(" ")!==-1)throw new Error("External entites are not supported");let i=e[t++],r="";for(;t<e.length&&e[t]!==i;t++)r+=e[t];return [n,r,t]}function Me(e,t){return e[t+1]==="!"&&e[t+2]==="-"&&e[t+3]==="-"}function Xe(e,t){return e[t+1]==="!"&&e[t+2]==="E"&&e[t+3]==="N"&&e[t+4]==="T"&&e[t+5]==="I"&&e[t+6]==="T"&&e[t+7]==="Y"}function Ze(e,t){return e[t+1]==="!"&&e[t+2]==="E"&&e[t+3]==="L"&&e[t+4]==="E"&&e[t+5]==="M"&&e[t+6]==="E"&&e[t+7]==="N"&&e[t+8]==="T"}function Ge(e,t){return e[t+1]==="!"&&e[t+2]==="A"&&e[t+3]==="T"&&e[t+4]==="T"&&e[t+5]==="L"&&e[t+6]==="I"&&e[t+7]==="S"&&e[t+8]==="T"}function He(e,t){return e[t+1]==="!"&&e[t+2]==="N"&&e[t+3]==="O"&&e[t+4]==="T"&&e[t+5]==="A"&&e[t+6]==="T"&&e[t+7]==="I"&&e[t+8]==="O"&&e[t+9]==="N"}function Ue(e){if(Be.isName(e))return e;throw new Error(`Invalid entity name ${e}`)}z.exports=ke;});var Q=b((Mt,K)=>{var We=/^[-+]?0x[a-fA-F0-9]+$/,Ye=/^([\-\+])?(0*)(\.[0-9]+([eE]\-?[0-9]+)?|[0-9]+(\.[0-9]+([eE]\-?[0-9]+)?)?)$/;!Number.parseInt&&window.parseInt&&(Number.parseInt=window.parseInt);!Number.parseFloat&&window.parseFloat&&(Number.parseFloat=window.parseFloat);var ze={hex:!0,leadingZeros:!0,decimalPoint:".",eNotation:!0};function Je(e,t={}){if(t=Object.assign({},ze,t),!e||typeof e!="string")return e;let n=e.trim();if(t.skipLike!==void 0&&t.skipLike.test(n))return e;if(t.hex&&We.test(n))return Number.parseInt(n,16);{let i=Ye.exec(n);if(i){let r=i[1],s=i[2],f=Ke(i[3]),u=i[4]||i[6];if(!t.leadingZeros&&s.length>0&&r&&n[2]!==".")return e;if(!t.leadingZeros&&s.length>0&&!r&&n[1]!==".")return e;{let o=Number(n),a=""+o;return a.search(/[eE]/)!==-1||u?t.eNotation?o:e:n.indexOf(".")!==-1?a==="0"&&f===""||a===f||r&&a==="-"+f?o:e:s?f===a||r+f===a?o:e:n===a||n===r+a?o:e}}else return e}}function Ke(e){return e&&e.indexOf(".")!==-1&&(e=e.replace(/0+$/,""),e==="."?e="0":e[0]==="."?e="0"+e:e[e.length-1]==="."&&(e=e.substr(0,e.length-1))),e}K.exports=Je;});var ee=b((Xt,D)=>{var j=O(),P=Y(),Qe=J(),je=Q(),S=class{constructor(t){this.options=t,this.currentNode=null,this.tagsNodeStack=[],this.docTypeEntities={},this.lastEntities={apos:{regex:/&(apos|#39|#x27);/g,val:"'"},gt:{regex:/&(gt|#62|#x3E);/g,val:">"},lt:{regex:/&(lt|#60|#x3C);/g,val:"<"},quot:{regex:/&(quot|#34|#x22);/g,val:'"'}},this.ampEntity={regex:/&(amp|#38|#x26);/g,val:"&"},this.htmlEntities={space:{regex:/&(nbsp|#160);/g,val:" "},cent:{regex:/&(cent|#162);/g,val:"\xA2"},pound:{regex:/&(pound|#163);/g,val:"\xA3"},yen:{regex:/&(yen|#165);/g,val:"\xA5"},euro:{regex:/&(euro|#8364);/g,val:"\u20AC"},copyright:{regex:/&(copy|#169);/g,val:"\xA9"},reg:{regex:/&(reg|#174);/g,val:"\xAE"},inr:{regex:/&(inr|#8377);/g,val:"\u20B9"}},this.addExternalEntities=De,this.parseXml=st,this.parseTextData=et,this.resolveNameSpace=tt,this.buildAttributesMap=rt,this.isItStopNode=ft,this.replaceEntitiesValue=ot,this.readStopNodeData=lt,this.saveTextToParentTag=ut,this.addChild=it;}};function De(e){let t=Object.keys(e);for(let n=0;n<t.length;n++){let i=t[n];this.lastEntities[i]={regex:new RegExp("&"+i+";","g"),val:e[i]};}}function et(e,t,n,i,r,s,f){if(e!==void 0&&(this.options.trimValues&&!i&&(e=e.trim()),e.length>0)){f||(e=this.replaceEntitiesValue(e));let u=this.options.tagValueProcessor(t,e,n,r,s);return u==null?e:typeof u!=typeof e||u!==e?u:this.options.trimValues?F(e,this.options.parseTagValue,this.options.numberParseOptions):e.trim()===e?F(e,this.options.parseTagValue,this.options.numberParseOptions):e}}function tt(e){if(this.options.removeNSPrefix){let t=e.split(":"),n=e.charAt(0)==="/"?"/":"";if(t[0]==="xmlns")return "";t.length===2&&(e=n+t[1]);}return e}var nt=new RegExp(`([^\\s=]+)\\s*(=\\s*(['"])([\\s\\S]*?)\\3)?`,"gm");function rt(e,t,n){if(!this.options.ignoreAttributes&&typeof e=="string"){let i=j.getAllMatches(e,nt),r=i.length,s={};for(let f=0;f<r;f++){let u=this.resolveNameSpace(i[f][1]),o=i[f][4],a=this.options.attributeNamePrefix+u;if(u.length)if(this.options.transformAttributeName&&(a=this.options.transformAttributeName(a)),a==="__proto__"&&(a="#__proto__"),o!==void 0){this.options.trimValues&&(o=o.trim()),o=this.replaceEntitiesValue(o);let l=this.options.attributeValueProcessor(u,o,t);l==null?s[a]=o:typeof l!=typeof o||l!==o?s[a]=l:s[a]=F(o,this.options.parseAttributeValue,this.options.numberParseOptions);}else this.options.allowBooleanAttributes&&(s[a]=!0);}if(!Object.keys(s).length)return;if(this.options.attributesGroupName){let f={};return f[this.options.attributesGroupName]=s,f}return s}}var st=function(e){e=e.replace(/\r\n?/g,`
`);let t=new P("!xml"),n=t,i="",r="";for(let s=0;s<e.length;s++)if(e[s]==="<")if(e[s+1]==="/"){let u=y(e,">",s,"Closing Tag is not closed."),o=e.substring(s+2,u).trim();if(this.options.removeNSPrefix){let c=o.indexOf(":");c!==-1&&(o=o.substr(c+1));}this.options.transformTagName&&(o=this.options.transformTagName(o)),n&&(i=this.saveTextToParentTag(i,n,r));let a=r.substring(r.lastIndexOf(".")+1);if(o&&this.options.unpairedTags.indexOf(o)!==-1)throw new Error(`Unpaired tag can not be used as closing tag: </${o}>`);let l=0;a&&this.options.unpairedTags.indexOf(a)!==-1?(l=r.lastIndexOf(".",r.lastIndexOf(".")-1),this.tagsNodeStack.pop()):l=r.lastIndexOf("."),r=r.substring(0,l),n=this.tagsNodeStack.pop(),i="",s=u;}else if(e[s+1]==="?"){let u=V(e,s,!1,"?>");if(!u)throw new Error("Pi Tag is not closed.");if(i=this.saveTextToParentTag(i,n,r),!(this.options.ignoreDeclaration&&u.tagName==="?xml"||this.options.ignorePiTags)){let o=new P(u.tagName);o.add(this.options.textNodeName,""),u.tagName!==u.tagExp&&u.attrExpPresent&&(o[":@"]=this.buildAttributesMap(u.tagExp,r,u.tagName)),this.addChild(n,o,r);}s=u.closeIndex+1;}else if(e.substr(s+1,3)==="!--"){let u=y(e,"-->",s+4,"Comment is not closed.");if(this.options.commentPropName){let o=e.substring(s+4,u-2);i=this.saveTextToParentTag(i,n,r),n.add(this.options.commentPropName,[{[this.options.textNodeName]:o}]);}s=u;}else if(e.substr(s+1,2)==="!D"){let u=Qe(e,s);this.docTypeEntities=u.entities,s=u.i;}else if(e.substr(s+1,2)==="!["){let u=y(e,"]]>",s,"CDATA is not closed.")-2,o=e.substring(s+9,u);i=this.saveTextToParentTag(i,n,r);let a=this.parseTextData(o,n.tagname,r,!0,!1,!0,!0);a==null&&(a=""),this.options.cdataPropName?n.add(this.options.cdataPropName,[{[this.options.textNodeName]:o}]):n.add(this.options.textNodeName,a),s=u+2;}else {let u=V(e,s,this.options.removeNSPrefix),o=u.tagName,a=u.rawTagName,l=u.tagExp,c=u.attrExpPresent,d=u.closeIndex;this.options.transformTagName&&(o=this.options.transformTagName(o)),n&&i&&n.tagname!=="!xml"&&(i=this.saveTextToParentTag(i,n,r,!1));let p=n;if(p&&this.options.unpairedTags.indexOf(p.tagname)!==-1&&(n=this.tagsNodeStack.pop(),r=r.substring(0,r.lastIndexOf("."))),o!==t.tagname&&(r+=r?"."+o:o),this.isItStopNode(this.options.stopNodes,r,o)){let h="";if(l.length>0&&l.lastIndexOf("/")===l.length-1)s=u.closeIndex;else if(this.options.unpairedTags.indexOf(o)!==-1)s=u.closeIndex;else {let m=this.readStopNodeData(e,a,d+1);if(!m)throw new Error(`Unexpected end of ${a}`);s=m.i,h=m.tagContent;}let w=new P(o);o!==l&&c&&(w[":@"]=this.buildAttributesMap(l,r,o)),h&&(h=this.parseTextData(h,o,r,!0,c,!0,!0)),r=r.substr(0,r.lastIndexOf(".")),w.add(this.options.textNodeName,h),this.addChild(n,w,r);}else {if(l.length>0&&l.lastIndexOf("/")===l.length-1){o[o.length-1]==="/"?(o=o.substr(0,o.length-1),r=r.substr(0,r.length-1),l=o):l=l.substr(0,l.length-1),this.options.transformTagName&&(o=this.options.transformTagName(o));let h=new P(o);o!==l&&c&&(h[":@"]=this.buildAttributesMap(l,r,o)),this.addChild(n,h,r),r=r.substr(0,r.lastIndexOf("."));}else {let h=new P(o);this.tagsNodeStack.push(n),o!==l&&c&&(h[":@"]=this.buildAttributesMap(l,r,o)),this.addChild(n,h,r),n=h;}i="",s=d;}}else i+=e[s];return t.child};function it(e,t,n){let i=this.options.updateTag(t.tagname,n,t[":@"]);i===!1||(typeof i=="string"&&(t.tagname=i),e.addChild(t));}var ot=function(e){if(this.options.processEntities){for(let t in this.docTypeEntities){let n=this.docTypeEntities[t];e=e.replace(n.regx,n.val);}for(let t in this.lastEntities){let n=this.lastEntities[t];e=e.replace(n.regex,n.val);}if(this.options.htmlEntities)for(let t in this.htmlEntities){let n=this.htmlEntities[t];e=e.replace(n.regex,n.val);}e=e.replace(this.ampEntity.regex,this.ampEntity.val);}return e};function ut(e,t,n,i){return e&&(i===void 0&&(i=Object.keys(t.child).length===0),e=this.parseTextData(e,t.tagname,n,!1,t[":@"]?Object.keys(t[":@"]).length!==0:!1,i),e!==void 0&&e!==""&&t.add(this.options.textNodeName,e),e=""),e}function ft(e,t,n){let i="*."+n;for(let r in e){let s=e[r];if(i===s||t===s)return !0}return !1}function at(e,t,n=">"){let i,r="";for(let s=t;s<e.length;s++){let f=e[s];if(i)f===i&&(i="");else if(f==='"'||f==="'")i=f;else if(f===n[0])if(n[1]){if(e[s+1]===n[1])return {data:r,index:s}}else return {data:r,index:s};else f==="	"&&(f=" ");r+=f;}}function y(e,t,n,i){let r=e.indexOf(t,n);if(r===-1)throw new Error(i);return r+t.length-1}function V(e,t,n,i=">"){let r=at(e,t+1,i);if(!r)return;let s=r.data,f=r.index,u=s.search(/\s/),o=s,a=!0;u!==-1&&(o=s.substring(0,u),s=s.substring(u+1).trimStart());let l=o;if(n){let c=o.indexOf(":");c!==-1&&(o=o.substr(c+1),a=o!==r.data.substr(c+1));}return {tagName:o,tagExp:s,closeIndex:f,attrExpPresent:a,rawTagName:l}}function lt(e,t,n){let i=n,r=1;for(;n<e.length;n++)if(e[n]==="<")if(e[n+1]==="/"){let s=y(e,">",n,`${t} is not closed`);if(e.substring(n+2,s).trim()===t&&(r--,r===0))return {tagContent:e.substring(i,n),i:s};n=s;}else if(e[n+1]==="?")n=y(e,"?>",n+1,"StopNode is not closed.");else if(e.substr(n+1,3)==="!--")n=y(e,"-->",n+3,"StopNode is not closed.");else if(e.substr(n+1,2)==="![")n=y(e,"]]>",n,"StopNode is not closed.")-2;else {let s=V(e,n,">");s&&((s&&s.tagName)===t&&s.tagExp[s.tagExp.length-1]!=="/"&&r++,n=s.closeIndex);}}function F(e,t,n){if(t&&typeof e=="string"){let i=e.trim();return i==="true"?!0:i==="false"?!1:je(e,n)}else return j.isExist(e)?e:""}D.exports=S;});var re=b(ne=>{function ct(e,t){return te(e,t)}function te(e,t,n){let i,r={};for(let s=0;s<e.length;s++){let f=e[s],u=dt(f),o="";if(n===void 0?o=u:o=n+"."+u,u===t.textNodeName)i===void 0?i=f[u]:i+=""+f[u];else {if(u===void 0)continue;if(f[u]){let a=te(f[u],t,o),l=gt(a,t);f[":@"]?ht(a,f[":@"],o,t):Object.keys(a).length===1&&a[t.textNodeName]!==void 0&&!t.alwaysCreateTextNode?a=a[t.textNodeName]:Object.keys(a).length===0&&(t.alwaysCreateTextNode?a[t.textNodeName]="":a=""),r[u]!==void 0&&r.hasOwnProperty(u)?(Array.isArray(r[u])||(r[u]=[r[u]]),r[u].push(a)):t.isArray(u,o,l)?r[u]=[a]:r[u]=a;}}}return typeof i=="string"?i.length>0&&(r[t.textNodeName]=i):i!==void 0&&(r[t.textNodeName]=i),r}function dt(e){let t=Object.keys(e);for(let n=0;n<t.length;n++){let i=t[n];if(i!==":@")return i}}function ht(e,t,n,i){if(t){let r=Object.keys(t),s=r.length;for(let f=0;f<s;f++){let u=r[f];i.isArray(u,n+"."+u,!0,!0)?e[u]=[t[u]]:e[u]=t[u];}}}function gt(e,t){let{textNodeName:n}=t,i=Object.keys(e).length;return !!(i===0||i===1&&(e[n]||typeof e[n]=="boolean"||e[n]===0))}ne.prettify=ct;});var ie=b((Gt,se)=>{var{buildOptions:pt}=U(),Nt=ee(),{prettify:bt}=re(),Et=C(),$=class{constructor(t){this.externalEntities={},this.options=pt(t);}parse(t,n){if(typeof t!="string")if(t.toString)t=t.toString();else throw new Error("XML data is accepted in String or Bytes[] form.");if(n){n===!0&&(n={});let s=Et.validate(t,n);if(s!==!0)throw Error(`${s.err.msg}:${s.err.line}:${s.err.col}`)}let i=new Nt(this.options);i.addExternalEntities(this.externalEntities);let r=i.parseXml(t);return this.options.preserveOrder||r===void 0?r:bt(r,this.options)}addEntity(t,n){if(n.indexOf("&")!==-1)throw new Error("Entity value can't have '&'");if(t.indexOf("&")!==-1||t.indexOf(";")!==-1)throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");if(n==="&")throw new Error("An entity with value '&' is not permitted");this.externalEntities[t]=n;}};se.exports=$;});var le=b((Ht,ae)=>{var mt=`
`;function Tt(e,t){let n="";return t.format&&t.indentBy.length>0&&(n=mt),ue(e,t,"",n)}function ue(e,t,n,i){let r="",s=!1;for(let f=0;f<e.length;f++){let u=e[f],o=yt(u);if(o===void 0)continue;let a="";if(n.length===0?a=o:a=`${n}.${o}`,o===t.textNodeName){let h=u[o];wt(a,t)||(h=t.tagValueProcessor(o,h),h=fe(h,t)),s&&(r+=i),r+=h,s=!1;continue}else if(o===t.cdataPropName){s&&(r+=i),r+=`<![CDATA[${u[o][0][t.textNodeName]}]]>`,s=!1;continue}else if(o===t.commentPropName){r+=i+`<!--${u[o][0][t.textNodeName]}-->`,s=!0;continue}else if(o[0]==="?"){let h=oe(u[":@"],t),w=o==="?xml"?"":i,m=u[o][0][t.textNodeName];m=m.length!==0?" "+m:"",r+=w+`<${o}${m}${h}?>`,s=!0;continue}let l=i;l!==""&&(l+=t.indentBy);let c=oe(u[":@"],t),d=i+`<${o}${c}`,p=ue(u[o],t,a,l);t.unpairedTags.indexOf(o)!==-1?t.suppressUnpairedNode?r+=d+">":r+=d+"/>":(!p||p.length===0)&&t.suppressEmptyNode?r+=d+"/>":p&&p.endsWith(">")?r+=d+`>${p}${i}</${o}>`:(r+=d+">",p&&i!==""&&(p.includes("/>")||p.includes("</"))?r+=i+t.indentBy+p+i:r+=p,r+=`</${o}>`),s=!0;}return r}function yt(e){let t=Object.keys(e);for(let n=0;n<t.length;n++){let i=t[n];if(e.hasOwnProperty(i)&&i!==":@")return i}}function oe(e,t){let n="";if(e&&!t.ignoreAttributes)for(let i in e){if(!e.hasOwnProperty(i))continue;let r=t.attributeValueProcessor(i,e[i]);r=fe(r,t),r===!0&&t.suppressBooleanAttributes?n+=` ${i.substr(t.attributeNamePrefix.length)}`:n+=` ${i.substr(t.attributeNamePrefix.length)}="${r}"`;}return n}function wt(e,t){e=e.substr(0,e.length-t.textNodeName.length-1);let n=e.substr(e.lastIndexOf(".")+1);for(let i in t.stopNodes)if(t.stopNodes[i]===e||t.stopNodes[i]==="*."+n)return !0;return !1}function fe(e,t){if(e&&e.length>0&&t.processEntities)for(let n=0;n<t.entities.length;n++){let i=t.entities[n];e=e.replace(i.regex,i.val);}return e}ae.exports=Tt;});var de=b((Ut,ce)=>{var At=le(),Pt={attributeNamePrefix:"@_",attributesGroupName:!1,textNodeName:"#text",ignoreAttributes:!0,cdataPropName:!1,format:!1,indentBy:"  ",suppressEmptyNode:!1,suppressUnpairedNode:!0,suppressBooleanAttributes:!0,tagValueProcessor:function(e,t){return t},attributeValueProcessor:function(e,t){return t},preserveOrder:!1,commentPropName:!1,unpairedTags:[],entities:[{regex:new RegExp("&","g"),val:"&amp;"},{regex:new RegExp(">","g"),val:"&gt;"},{regex:new RegExp("<","g"),val:"&lt;"},{regex:new RegExp("'","g"),val:"&apos;"},{regex:new RegExp('"',"g"),val:"&quot;"}],processEntities:!0,stopNodes:[],oneListGroup:!1};function T(e){this.options=Object.assign({},Pt,e),this.options.ignoreAttributes||this.options.attributesGroupName?this.isAttribute=function(){return !1}:(this.attrPrefixLen=this.options.attributeNamePrefix.length,this.isAttribute=Ct),this.processTextOrObjNode=Ot,this.options.format?(this.indentate=It,this.tagEndChar=`>
`,this.newLine=`
`):(this.indentate=function(){return ""},this.tagEndChar=">",this.newLine="");}T.prototype.build=function(e){return this.options.preserveOrder?At(e,this.options):(Array.isArray(e)&&this.options.arrayNodeName&&this.options.arrayNodeName.length>1&&(e={[this.options.arrayNodeName]:e}),this.j2x(e,0).val)};T.prototype.j2x=function(e,t){let n="",i="";for(let r in e)if(Object.prototype.hasOwnProperty.call(e,r))if(typeof e[r]>"u")this.isAttribute(r)&&(i+="");else if(e[r]===null)this.isAttribute(r)?i+="":r[0]==="?"?i+=this.indentate(t)+"<"+r+"?"+this.tagEndChar:i+=this.indentate(t)+"<"+r+"/"+this.tagEndChar;else if(e[r]instanceof Date)i+=this.buildTextValNode(e[r],r,"",t);else if(typeof e[r]!="object"){let s=this.isAttribute(r);if(s)n+=this.buildAttrPairStr(s,""+e[r]);else if(r===this.options.textNodeName){let f=this.options.tagValueProcessor(r,""+e[r]);i+=this.replaceEntitiesValue(f);}else i+=this.buildTextValNode(e[r],r,"",t);}else if(Array.isArray(e[r])){let s=e[r].length,f="";for(let u=0;u<s;u++){let o=e[r][u];typeof o>"u"||(o===null?r[0]==="?"?i+=this.indentate(t)+"<"+r+"?"+this.tagEndChar:i+=this.indentate(t)+"<"+r+"/"+this.tagEndChar:typeof o=="object"?this.options.oneListGroup?f+=this.j2x(o,t+1).val:f+=this.processTextOrObjNode(o,r,t):f+=this.buildTextValNode(o,r,"",t));}this.options.oneListGroup&&(f=this.buildObjectNode(f,r,"",t)),i+=f;}else if(this.options.attributesGroupName&&r===this.options.attributesGroupName){let s=Object.keys(e[r]),f=s.length;for(let u=0;u<f;u++)n+=this.buildAttrPairStr(s[u],""+e[r][s[u]]);}else i+=this.processTextOrObjNode(e[r],r,t);return {attrStr:n,val:i}};T.prototype.buildAttrPairStr=function(e,t){return t=this.options.attributeValueProcessor(e,""+t),t=this.replaceEntitiesValue(t),this.options.suppressBooleanAttributes&&t==="true"?" "+e:" "+e+'="'+t+'"'};function Ot(e,t,n){let i=this.j2x(e,n+1);return e[this.options.textNodeName]!==void 0&&Object.keys(e).length===1?this.buildTextValNode(e[this.options.textNodeName],t,i.attrStr,n):this.buildObjectNode(i.val,t,i.attrStr,n)}T.prototype.buildObjectNode=function(e,t,n,i){if(e==="")return t[0]==="?"?this.indentate(i)+"<"+t+n+"?"+this.tagEndChar:this.indentate(i)+"<"+t+n+this.closeTag(t)+this.tagEndChar;{let r="</"+t+this.tagEndChar,s="";return t[0]==="?"&&(s="?",r=""),(n||n==="")&&e.indexOf("<")===-1?this.indentate(i)+"<"+t+n+s+">"+e+r:this.options.commentPropName!==!1&&t===this.options.commentPropName&&s.length===0?this.indentate(i)+`<!--${e}-->`+this.newLine:this.indentate(i)+"<"+t+n+s+this.tagEndChar+e+this.indentate(i)+r}};T.prototype.closeTag=function(e){let t="";return this.options.unpairedTags.indexOf(e)!==-1?this.options.suppressUnpairedNode||(t="/"):this.options.suppressEmptyNode?t="/":t=`></${e}`,t};T.prototype.buildTextValNode=function(e,t,n,i){if(this.options.cdataPropName!==!1&&t===this.options.cdataPropName)return this.indentate(i)+`<![CDATA[${e}]]>`+this.newLine;if(this.options.commentPropName!==!1&&t===this.options.commentPropName)return this.indentate(i)+`<!--${e}-->`+this.newLine;if(t[0]==="?")return this.indentate(i)+"<"+t+n+"?"+this.tagEndChar;{let r=this.options.tagValueProcessor(t,e);return r=this.replaceEntitiesValue(r),r===""?this.indentate(i)+"<"+t+n+this.closeTag(t)+this.tagEndChar:this.indentate(i)+"<"+t+n+">"+r+"</"+t+this.tagEndChar}};T.prototype.replaceEntitiesValue=function(e){if(e&&e.length>0&&this.options.processEntities)for(let t=0;t<this.options.entities.length;t++){let n=this.options.entities[t];e=e.replace(n.regex,n.val);}return e};function It(e){return this.options.indentBy.repeat(e)}function Ct(e){return e.startsWith(this.options.attributeNamePrefix)&&e!==this.options.textNodeName?e.substr(this.attrPrefixLen):!1}ce.exports=T;});var ge=b((Wt,he)=>{var xt=C(),vt=ie(),St=de();he.exports={XMLParser:vt,XMLValidator:xt,XMLBuilder:St};});var pe=we(ge()),_=class{constructor(t,n){this.source=t;this.components=n;this.source=t;}getSource(){return this.source}toString(){return this.source}getComponents(){return this.components}};function Vt(e){let t=["block"],n=new RegExp(/twig:[A-Za-z]+(?::[A-Za-z]+)*/),i=new RegExp(/component\(\s*'([A-Za-z]+(?::[A-Za-z]+)*)'\s*(?:,.*)?\)/,"gs"),r=s=>Object.entries(s).reduce((f,[u,o])=>{if(o!==null&&typeof o=="object")f.push(...r(o));else if(typeof o=="string")for(let a of o.matchAll(i))f.push([...a][1]);return n.test(u)&&f.push(u.replace("twig:","")),f},[]);try{let s=new pe.XMLParser().parse(`<div>${e}</div>`);return r(s).filter(f=>!t.includes(f))}catch(s){throw new Error("Invalid XML.",{cause:{parserError:s,template:e}})}}function Yt(e,...t){let n=String.raw({raw:e},...t);return new _(n,Vt(n))}function Ft(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];var i=Array.from(typeof e=="string"?[e]:e);i[i.length-1]=i[i.length-1].replace(/\r?\n([\t ]*)$/,"");var r=i.reduce(function(u,o){var a=o.match(/\n([\t ]+|(?!\s).)/g);return a?u.concat(a.map(function(l){var c,d;return (d=(c=l.match(/[\t ]/g))===null||c===void 0?void 0:c.length)!==null&&d!==void 0?d:0})):u},[]);if(r.length){var s=new RegExp(`
[	 ]{`+Math.min.apply(Math,r)+"}","g");i=i.map(function(u){return u.replace(s,`
`)});}i[0]=i[0].replace(/^\r?\n/,"");var f=i[0];return t.forEach(function(u,o){var a=f.match(/(?:^|\n)( *)$/),l=a?a[1]:"",c=u;typeof u=="string"&&u.includes(`
`)&&(c=String(u).split(`
`).map(function(d,p){return p===0?d:""+l+d}).join(`
`)),f+=c+i[o+1];}),f}var L=Ft;var $t=e=>(t,n)=>{let{server:i={}}=n.parameters;if(i.fetchStoryHtml!==void 0)n.parameters.server={...i,fetchStoryHtml:async(...r)=>{let s=await i.fetchStoryHtml(...r);return L(e(s))}};else throw new Error(L`
            Error: the wrapHtml decorator expects a 'fetchStoryHtml' to be defined in parameters.server.
            `);return t()};

exports.TwigTemplate = _;
exports.twig = Yt;
exports.wrapHtml = $t;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.js.map