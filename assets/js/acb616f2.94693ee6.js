"use strict";(self.webpackChunk_klnjs_docs=self.webpackChunk_klnjs_docs||[]).push([[630],{8889:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>P,contentTitle:()=>C,default:()=>E,frontMatter:()=>S,metadata:()=>A,toc:()=>_});var t=r(1085),s=r(1184),a=r(9234),i=r(6937),o=r(6858),l=r(1701),c=r(7502),u=r(4090),d=(0,u.q6)({name:"SpinnerContext",nameOfHook:"useSpinnerContext",nameOfProvider:"<SpinnerProvider />"}),f=d[0],p=d[1],h=r(4041),m=["width","size"],v=(0,u.Rf)((function(e,n){var r=e.width,s=e.size,a=(0,c.A)(e,m),i=function(e){var n=void 0===e?{}:e,r=n.size,t=void 0===r?24:r,s=n.width,a=void 0===s?4:s;return(0,h.useMemo)((function(){var e=t/2-a/2,n=2*e+a,r=n/2,s=e*Math.PI*2;return{width:a,center:r,radius:e,diameter:n,circumference:s}}),[t,a])}({size:s,width:r});return(0,t.jsx)(f,{value:i,children:(0,t.jsx)(u.Du.svg,Object.assign({ref:n,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 "+i.diameter+" "+i.diameter,width:i.diameter,height:i.diameter},a))})})),x=["arc","angle","easing","duration","cap"],j=(0,u.Rf)((function(e,n){var r=e.arc,s=void 0===r?25:r,a=e.angle,i=void 0===a?0:a,o=e.easing,l=e.duration,d=void 0===l?1:l,f=e.cap,h=void 0===f?"round":f,m=(0,c.A)(e,x),v=p(),j=v.width,g=v.radius,b=v.center,y=v.circumference,w=y*s/100,k=-90+i;return(0,t.jsx)(u.Du.circle,Object.assign({ref:n,r:g,cx:b,cy:b,transform:"rotate("+k+" "+b+" "+b+")",fill:"none",stroke:"currentColor",strokeWidth:j,strokeLinecap:h,strokeDasharray:w+","+y},m,{children:(0,t.jsx)("animateTransform",{attributeName:"transform",dur:d+"s",calcMode:"spline",keySplines:o,type:"rotate",values:k+" "+b+" "+b+";"+(k+360)+" "+b+" "+b,repeatCount:"indefinite"})}))})),g=(0,u.Rf)((function(e,n){var r=p(),s=r.radius,a=r.center,i=r.width;return(0,t.jsx)(u.Du.circle,Object.assign({ref:n,r:s,cx:a,cy:a,fill:"none",stroke:"currentColor",strokeWidth:i},e))}));const b="spinner_yrRw",y="thumb_AsS2",w="track_v6hE",k=function(){return(0,t.jsxs)(v,{className:b,children:[(0,t.jsx)(g,{className:w}),(0,t.jsx)(j,{className:y})]})},N="import { Spinner, SpinnerTrack, SpinnerThumb } from '@klnjs/spinner'\nimport classes from './spinner.module.css'\n\nexport default () => (\n\t<Spinner className={classes.spinner}>\n\t\t<SpinnerTrack className={classes.track} />\n\t\t<SpinnerThumb className={classes.thumb} />\n\t</Spinner>\n)\n",O=".spinner {\n\tdisplay: block;\n}\n\n.thumb {\n\tcolor: var(--ifm-color-primary);\n}\n\n.track {\n\tcolor: var(--ifm-background-surface-color);\n}\n",S={},C="Spinner",A={id:"components/spinner/spinner",title:"Spinner",description:"An element for illustrating ongoing work / progress.",source:"@site/src/docs/02-components/spinner/spinner.mdx",sourceDirName:"02-components/spinner",slug:"/components/spinner/",permalink:"/bazik/docs/components/spinner/",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Pin",permalink:"/bazik/docs/components/pin/"}},P={},_=[{value:"Showcase",id:"showcase",level:2},{value:"Features",id:"features",level:2},{value:"Installation",id:"installation",level:2},{value:"Reference",id:"reference",level:2},{value:"Spinner (Root)",id:"spinner-root",level:3},{value:"SpinnerTrack",id:"spinnertrack",level:3},{value:"SpinnerThumb",id:"spinnerthumb",level:3}];function R(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"spinner",children:"Spinner"}),"\n",(0,t.jsx)(n.p,{children:"An element for illustrating ongoing work / progress."}),"\n",(0,t.jsx)(n.h2,{id:"showcase",children:"Showcase"}),"\n",(0,t.jsx)(l._,{name:"spinner",sources:[{file:"index.tsx",content:N,language:"jsx"},{file:"index.module.css",content:O,language:"css"}],children:(0,t.jsx)(k,{})}),"\n",(0,t.jsx)(n.h2,{id:"features",children:"Features"}),"\n",(0,t.jsxs)(a.O,{children:[(0,t.jsx)(a.X,{children:"Configurable dimensions and duration."}),(0,t.jsx)(a.X,{children:"Custom easing function."})]}),"\n",(0,t.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,t.jsx)(i.L,{name:"spinner"}),"\n",(0,t.jsx)(n.h2,{id:"reference",children:"Reference"}),"\n",(0,t.jsx)(n.h3,{id:"spinner-root",children:"Spinner (Root)"}),"\n",(0,t.jsx)(n.p,{children:"Contains all the parts of an spinner."}),"\n",(0,t.jsx)(o.y,{props:[{name:"asChild",type:"boolean",defaultValue:"false"},{name:"size",type:"number",defaultValue:"24"},{name:"width",type:"number",defaultValue:"4"}]}),"\n",(0,t.jsx)(n.h3,{id:"spinnertrack",children:"SpinnerTrack"}),"\n",(0,t.jsxs)(n.p,{children:["Used to optionally render a track (circle). It will automatically calculate its dimensions based on the ",(0,t.jsx)(n.code,{children:"size"})," and ",(0,t.jsx)(n.code,{children:"width"})," property of the root."]}),"\n",(0,t.jsx)(o.y,{props:[{name:"asChild",type:"boolean",defaultValue:"false"}]}),"\n",(0,t.jsx)(n.h3,{id:"spinnerthumb",children:"SpinnerThumb"}),"\n",(0,t.jsxs)(n.p,{children:["Used to render a thumb (circle section). It will automatically calculate its dimensions based on the ",(0,t.jsx)(n.code,{children:"size"})," and ",(0,t.jsx)(n.code,{children:"width"})," property of the root. It is possible to render multiple thumbs, and have them perform different animations based on the properties given."]}),"\n",(0,t.jsx)(o.y,{props:[{name:"asChild",type:"boolean",defaultValue:"false"},{name:"angle",type:"number",defaultValue:"0"},{name:"arc",type:"number",defaultValue:"25"},{name:"cap",type:"enum",typeAdvanced:"'butt' | 'round' | 'square'",defaultValue:"round"},{name:"duration",type:"number",defaultValue:"1"},{name:"easing",type:"string"}]})]})}function E(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(R,{...e})}):R(e)}},9234:(e,n,r)=>{r.d(n,{X:()=>d,O:()=>p});var t=r(7502);const s="features_U5gm",a="list_j8Y4",i="feature_TSSP",o="icon_HJk2",l="description_zjKB";var c=r(1085),u=["children"],d=function(e){var n=e.children,r=(0,t.A)(e,u);return(0,c.jsxs)("li",Object.assign({className:i},r,{children:[(0,c.jsx)("svg",{fill:"currentColor",stroke:"none",viewBox:"0 0 24 24",className:o,"aria-hidden":!0,children:(0,c.jsx)("path",{d:"M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"})}),(0,c.jsx)("p",{className:l,children:n})]}))},f=["children"],p=function(e){var n=e.children,r=(0,t.A)(e,f);return(0,c.jsx)("div",Object.assign({className:s},r,{children:(0,c.jsx)("ul",{className:a,children:n})}))}},6937:(e,n,r)=>{r.d(n,{L:()=>a});var t=r(3092),s=r(1085),a=function(e){var n=e.name,r=e.manager,a=void 0===r?"pnpm":r;return(0,s.jsx)(t.Y,{language:"bash",children:a+" install @klnjs/"+n})}},6858:(e,n,r)=>{r.d(n,{a:()=>I,y:()=>L});var t=r(7502),s=r(4357);const a={table:"table_JbMS",cell:"cell_bcjn",th:"th_Zlu8",td:"td_iEyy"};var i=r(1085),o=["className","children"],l=function(e){var n=e.className,r=e.children,l=(0,t.A)(e,o);return(0,i.jsx)("table",Object.assign({className:(0,s.A)(a.table,n)},l,{children:r}))},c=["className","children"],u=function(e){var n=e.className,r=e.children,o=(0,t.A)(e,c);return(0,i.jsx)("tr",Object.assign({className:(0,s.A)(a.row,n)},o,{children:r}))},d=["as","className","children"],f=function(e){var n,r=e.as,o=e.className,l=e.children,c=(0,t.A)(e,d),u=null!=r?r:"td",f=(0,s.A)(a.cell,o,((n={})[a.td]="td"===r||void 0===r,n[a.th]="th"===r,n));return(0,i.jsx)(u,Object.assign({className:f},c,{children:l}))},p=r(4090),h=(0,p.q6)({name:"PopoverContext",nameOfHook:"usePopoverContext",nameOfProvider:"<PopoverProvider />"}),m=h[0],v=h[1],x=r(4041),j=r(6036),g=r(8972),b=r(4682),y=r(2913),w=function(e){var n=e.root,r=e.open,t=e.modal,s=e.offset,a=e.dismiss,i=e.duration,o=void 0===i?0:i,l=e.placement,c=e.defaultOpen,u=e.onOpenChange,d=(0,x.useState)(),f=d[0],h=d[1],m=(0,x.useState)(),v=m[0],w=m[1],k=(0,p.Gx)({value:r,defaultValue:c,onChange:u}),N=k[0],O=k[1],S=(0,j.we)({open:N,placement:l,whileElementsMounted:g.ll,onOpenChange:O,middleware:[(0,b.cY)(s)]}),C=S.refs,A=S.context,P=S.floatingStyles,_=function(e,n){var r=(0,j.$X)(e,{duration:{open:(0,y.E)(n)?n:n.enter,close:(0,y.E)(n)?n:n.leave}}),t=r.isMounted,s=r.status;return{mounted:t,status:"open"===s?"enter":"close"===s?"leave":"mount"}}(A,o),R=_.mounted,E=_.status,L=(0,j.bv)([(0,j.It)(A),(0,j.kp)(A),(0,j.s9)(A,{escapeKey:null==a?void 0:a.onEscapeKey,outsidePress:null==a?void 0:a.onPressOutside,ancestorScroll:null==a?void 0:a.onAncestorScroll})]);return{root:n,refs:C,modal:t,status:E,mounted:R,dismiss:a,context:A,placement:l,floatingStyles:P,open:N,labelId:f,descriptionId:v,setOpen:O,setLabelId:h,setDescriptionId:w,getFloatingProps:L.getFloatingProps,getReferenceProps:L.getReferenceProps}},k=function(e){var n=e.root,r=e.open,t=e.modal,s=e.offset,a=e.dismiss,o=e.duration,l=e.placement,c=e.children,u=e.defaultOpen,d=e.onOpenChange,f=w({root:n,open:r,modal:t,offset:s,dismiss:a,duration:o,placement:l,defaultOpen:u,onOpenChange:d});return(0,i.jsx)(m,{value:f,children:c})},N=((0,p.Rf)((function(e,n){var r=v(),t=r.refs,s=r.status,a=(0,p.Zy)(t.setPositionReference,n);return(0,i.jsx)(p.Du.div,Object.assign({ref:a,"data-status":s},e))})),(0,p.Rf)((function(e,n){var r=v(),t=r.open,s=r.refs,a=r.status,o=r.getReferenceProps,l=(0,p.Zy)(s.setReference,n);return(0,i.jsx)(p.Du.button,Object.assign({ref:l,type:"button","data-open":(0,p.OY)(t),"data-status":a},o(e)))}))),O=["style"],S=(0,p.Rf)((function(e,n){var r=e.style,s=(0,t.A)(e,O),a=v(),o=a.root,l=a.refs,c=a.modal,u=void 0!==c&&c,d=a.status,f=a.dismiss,h=a.mounted,m=a.placement,x=a.context,g=a.labelId,b=a.descriptionId,y=a.getFloatingProps,w=(0,p.Zy)(l.setFloating,n),k=null==f?void 0:f.onFocusOut;return h?(0,i.jsx)(j.XF,{id:o,children:(0,i.jsx)(j.s3,{modal:u,guards:!u,context:x,closeOnFocusOut:k,visuallyHiddenDismiss:u,children:(0,i.jsx)(p.Du.div,Object.assign({ref:w,style:Object.assign({},x.floatingStyles,r),"aria-labelledby":g,"aria-describedby":b,"data-status":d,"data-placement":m},y(s)))})}):null}));const C="table_Iji9",A="prop_XcUk",P="type_6lsl",_="trigger_qVE9",R="content_LiR4";var E=function(e){var n=e.children;return(0,i.jsxs)(k,{offset:5,children:[(0,i.jsx)(N,{className:_,children:">"}),(0,i.jsx)(S,{className:R,children:n})]})},L=function(e){var n=e.props;return(0,i.jsxs)(l,{className:C,children:[(0,i.jsx)("thead",{children:(0,i.jsxs)(u,{children:[(0,i.jsx)(f,{as:"th",children:"Prop"}),(0,i.jsx)(f,{as:"th",children:"Type"}),(0,i.jsx)(f,{as:"th",children:"Default"})]})}),(0,i.jsx)("tbody",{children:n.map((function(e){var n=e.name,r=e.type,t=e.typeAdvanced,s=e.defaultValue,a=void 0===s?"-":s;return(0,i.jsxs)(u,{children:[(0,i.jsx)(f,{className:A,children:n}),(0,i.jsxs)(f,{className:P,children:[r,t?(0,i.jsx)(E,{children:t}):null]}),(0,i.jsx)(f,{children:a})]})}))})]})},I=function(e){var n=e.attrs;return(0,i.jsxs)(l,{className:C,children:[(0,i.jsx)("thead",{children:(0,i.jsxs)(u,{children:[(0,i.jsx)(f,{as:"th",children:"Data attribute"}),(0,i.jsx)(f,{as:"th",children:"Present when"})]})}),(0,i.jsx)("tbody",{children:n.map((function(e){var n=e.name,r=e.description;return(0,i.jsxs)(u,{children:[(0,i.jsx)(f,{className:A,children:n}),(0,i.jsx)(f,{children:r})]})}))})]})}},1701:(e,n,r)=>{r.d(n,{_:()=>u});var t=r(1732),s=r(3759),a=r(3092);const i="showcase_OZLv",o="snippet_xoYL",l="viewport_Tpbl";var c=r(1085),u=function(e){var n=e.name,r=e.sources,u=e.children;return(0,c.jsxs)("div",{className:i,"aria-label":n,children:[(0,c.jsx)("div",{className:l,children:u}),r?(0,c.jsx)(t.A,{children:r.map((function(e){var n=e.file,r=e.content,t=e.language;return(0,c.jsx)(s.A,{value:n,label:n,children:(0,c.jsx)(a.Y,{language:t,className:o,children:r})})}))}):null]})}},3092:(e,n,r)=>{r.d(n,{Y:()=>o});var t=r(4506),s=r(4357);const a="snippet_PC2H";var i=r(1085),o=function(e){var n=e.children,r=e.className,o=e.language,l=e.identation,c=void 0===l?2:l,u=e.showLineNumbers,d=void 0===u||u,f=new Array(c).fill(" ").join("");return(0,i.jsx)("div",{className:(0,s.A)(a,r),children:(0,i.jsx)(t.A,{language:o,showLineNumbers:d,children:n.replace(/\t/g,f)})})}},4090:(e,n,r)=>{r.d(n,{q6:()=>s,Rf:()=>x,Du:()=>v,OY:()=>g,c9:()=>b,Pu:()=>w,Bi:()=>k,x8:()=>N,ZC:()=>O,Zy:()=>l,Gx:()=>S});var t=r(4041),s=function(e){var n=e.name,r=void 0===n?"Context":n,s=e.nameOfHook,a=void 0===s?"useContext":s,i=e.nameOfProvider,o=void 0===i?"Provider":i,l=e.defaultValue,c=(0,t.createContext)(l);c.displayName=r;return[c.Provider,function e(n){var s=(void 0===n?{}:n).strict,i=null==s||s,l=(0,t.useContext)(c);if(!l&&i){var u=function(e,n,r){var t=new Error(n+" returned `undefined`. Did you forget to wrap component within "+r);return t.name=e+"Error",t}(r,a,o);throw void 0!==Error.captureStackTrace&&Error.captureStackTrace(u,e),u}return l}]},a=r(7502),i=function(e){return"function"==typeof e},o=function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return function(e){n.forEach((function(n){i(n)?n(e):function(e){return null!=e}(n)&&(n.current=e)}))}},l=function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return(0,t.useCallback)(o.apply(void 0,n),n)},c=r(7517),u=function(e){return"string"==typeof e};function d(){for(var e=Object.assign({},arguments.length<=0?void 0:arguments[0]),n=1;n<arguments.length;n++){var r=n<0||arguments.length<=n?void 0:arguments[n],t=function(){var n=e[s],t=r[s];"style"===s&&(0,c.u)(n)&&(0,c.u)(t)?e[s]=Object.assign({},n,t):"className"===s&&u(n)&&u(t)?e[s]=n+" "+t:/^on[A-Z]/.test(s)&&i(n)&&i(t)?e[s]=function(){n.apply(void 0,arguments),t.apply(void 0,arguments)}:e[s]=null!=t?t:n};for(var s in r)t()}return e}var f,p=r(1085),h=["asChild","children"],m=function(e){var n=(0,t.forwardRef)((function(n,r){var s=n.asChild,i=n.children,l=(0,a.A)(n,h);if(!s)return(0,p.jsx)(e,Object.assign({ref:r},l,{children:i}));var c=t.Children.only(i);return(0,t.isValidElement)(c)?(0,t.cloneElement)(c,Object.assign({ref:r?o(r,c.ref):c.ref},d(l,c.props))):null}));return n.displayName=e.displayName||e.name,n},v=(f=new Map,new Proxy(m,{apply:function(e,n,r){return m(r[0])},get:function(e,n){return f.has(n)||f.set(n,m(n)),f.get(n)}})),x=function(e){return(0,t.forwardRef)(e)},j=r(2913);function g(e){return!0===e?"":(0,j.E)(e)||u(e)?e.toString():void 0}function b(e,n){void 0===n&&(n=[]);var r=(0,t.useRef)(e);return(0,t.useEffect)((function(){r.current=e}),[e]),(0,t.useCallback)((function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return null==r.current?void 0:r.current.apply(r,n)}),n)}var y=function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return function(e){n.forEach((function(n){n&&!e.defaultPrevented&&n(e)}))}},w=function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return(0,t.useCallback)(y.apply(void 0,n),n)};var k=function(e){var n=(0,t.useId)();return null!=e?e:n},N=function(e,n){var r=k(e);return(0,t.useLayoutEffect)((function(){if(n)return n(r),function(){n(void 0)}}),[r,n]),r},O=function(e){var n=(0,t.useRef)(e),r=(0,t.useRef)(null),s=n.current;return e!==s&&(n.current=e,r.current=s),r.current},S=function(e){var n=e.value,r=e.defaultValue,s=e.onChange,a=void 0!==n,i=(0,t.useRef)(a),o=b(s),l=(0,t.useState)(r),c=l[0],u=l[1],d=a?n:c,f=(0,t.useCallback)((function(e){a||u(e),o(e)}),[a,o]);return(0,t.useEffect)((function(){i.current!==a&&(i.current=a,console.warn("Warning: A component is changing from being uncontrolled to controlled or vice versa."))}),[a]),[d,f]}},2913:(e,n,r)=>{r.d(n,{E:()=>t});var t=function(e){return Number.isFinite(e)}},7517:(e,n,r)=>{r.d(n,{u:()=>t});var t=function(e){return null!=e&&!Array.isArray(e)&&"object"==typeof e}}}]);