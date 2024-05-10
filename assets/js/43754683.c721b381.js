"use strict";(self.webpackChunk_klnjs_docs=self.webpackChunk_klnjs_docs||[]).push([[17],{3089:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>V,contentTitle:()=>T,default:()=>M,frontMatter:()=>I,metadata:()=>D,toc:()=>L});var a=t(1085),i=t(1184),r=t(9234),s=t(6937),o=t(6858),l=t(1701),c=t(7502),u=t(7033),d=(0,u.q6)({name:"PinContext",nameOfHook:"usePinContext",nameOfProvider:"<PinProvider />"}),p=d[0],f=d[1],h=t(4041),v=t(7517),m=["defaultValue","disabled","length","conceal","type","value","onChange"],x=(0,u.Rf)((function(e,n){var t=e.defaultValue,i=e.disabled,r=e.length,s=e.conceal,o=e.type,l=e.value,d=e.onChange,f=(0,c.A)(e,m),x=function(e){var n=void 0===e?{}:e,t=n.conceal,a=n.defaultValue,i=n.disabled,r=void 0!==i&&i,s=n.length,o=void 0===s?4:s,l=n.type,c=void 0===l?"alphanumeric":l,d=n.value,p=n.onChange,f=(0,h.useRef)(),m=(0,h.useState)(),x=m[0],g=m[1],b=(0,h.useState)(!1),j=b[0],y=b[1],P=(0,u.Gx)({value:d,defaultValue:a,onChange:p}),w=P[0],C=void 0===w?"":w,O=P[1],N=(0,u.ZC)(C);return{conceal:(0,h.useMemo)((function(){return{enabled:void 0!==t,delay:(0,v.u)(t)?t.delay:250,symbol:(0,v.u)(t)?t.symbol:null!=t?t:"\xb7"}}),[t]),disabled:r,direction:null===N||N.length<C.length?"forwards":"backwards",focusWithin:j,inputId:x,inputRef:f,length:o,pin:C,type:c,setPin:O,setInputId:g,setFocusWithin:y}}({defaultValue:t,disabled:i,length:r,conceal:s,type:o,value:l,onChange:d});return(0,a.jsx)(p,{value:x,children:(0,a.jsx)(u.Du.div,Object.assign({ref:n},f))})})),g=["slot","placeholder","onPointerDown"],b=(0,u.Rf)((function(e,n){var t,i=e.slot,r=e.placeholder,s=e.onPointerDown,o=(0,c.A)(e,g),l=f(),d=l.pin,p=l.length,v=l.conceal,m=v.delay,x=v.symbol,b=v.enabled,j=l.inputRef,y=l.disabled,P=void 0!==y&&y,w=l.direction,C=l.focusWithin,O=function(e){var n=e.delay,t=e.direction,a=e.enabled,i=void 0===a||a,r=e.placeholder,s=void 0===r?"":r,o=e.symbol,l=e.value,c=(0,h.useState)(),u=c[0],d=c[1];return(0,h.useEffect)((function(){if(i)if(l){if("backwards"!==t){var e=setTimeout((function(){return d(o)}),n);return d(l),function(){clearTimeout(e)}}d(o)}else d(s);else d(null!=l?l:s)}),[i,n,t,l,o,s]),u}({enabled:b,delay:m,value:null!=(t=d[i-1])?t:"",symbol:x,direction:w,placeholder:r}),N=i===p,A=1===i,k=i===Math.min(p,d.length+1),R=C&&k,S=P,_=O===x,E=O===r&&""!==r,I=R&&d.length<p,T=(0,u.Pu)(s,(function(e){var n;e.preventDefault(),null==(n=j.current)||n.focus()}));return(0,a.jsx)("div",Object.assign({ref:n,"data-end":(0,u.cT)(N),"data-start":(0,u.cT)(A),"data-caret":(0,u.cT)(I),"data-focused":(0,u.cT)(R),"data-disabled":(0,u.cT)(S),"data-concealed":(0,u.cT)(_),"data-placeholder":(0,u.cT)(E),onPointerDown:T},o,(0,u.wG)({}),{children:O}))})),j=function(e){var n=e.children,t=f(),a=t.pin,i=t.length;return(0,h.useMemo)((function(){return Array.from({length:i},(function(e,n){var t;return{slot:n+1,value:null!=(t=a[n])?t:""}}))}),[a,i]).map(n)},y=(0,u.Rf)((function(e,n){return(0,a.jsx)(u.Du.div,Object.assign({ref:n},e))})),P={alphabetic:/^[a-zA-Z]*$/,alphanumeric:/^[a-zA-Z0-9]*$/,numeric:/^[0-9]*$/},w=["id","hidden","autoComplete","style","onBlur","onFocus","onPaste","onChange","onKeyDown"],C=(0,u.Rf)((function(e,n){var t=e.id,i=e.hidden,r=void 0===i||i,s=e.autoComplete,o=void 0===s?"one-time-code":s,l=e.style,d=e.onBlur,p=e.onFocus,v=e.onPaste,m=e.onChange,x=e.onKeyDown,g=(0,c.A)(e,w),b=f(),j=b.pin,y=b.type,C=b.length,O=b.disabled,N=b.inputRef,A=b.setPin,k=b.setInputId,R=b.setFocusWithin,S=(0,u.Bi)(t,k),_=(0,u.Zy)(N,n),E=function(e){return(0,h.useMemo)((function(){return P[e]}),[e])}(y),I=r?Object.assign({position:"absolute",pointerEvents:"none",opacity:0},l):l,T=(0,u.Pu)(d,(function(){return R(!1)})),D=(0,u.Pu)(p,(function(){return R(!0)})),V=(0,u.Pu)(v,(function(e){var n=e.clipboardData.getData("text/plain"),t=[].concat(n).filter((function(e){return E.test(e)})).slice(0,C).join("");A(t)})),L=(0,u.Pu)(m,(function(e){E.test(e.target.value)&&A(e.target.value)})),F=(0,u.Pu)(x,(function(e){("End"===e.code||"Home"===e.code||e.code.startsWith("Arrow"))&&e.preventDefault()}));return(0,a.jsx)(u.Du.input,Object.assign({id:S,ref:_,type:"text",value:j,style:I,pattern:E.source,disabled:O,inputMode:"numeric"!==y?"text":y,maxLength:C,autoComplete:o,onBlur:T,onFocus:D,onPaste:V,onChange:L,onKeyDown:F},g))})),O=(0,u.Rf)((function(e,n){var t=f().inputId;return(0,a.jsx)(u.Du.label,Object.assign({ref:n,htmlFor:t},e))}));const N="pin_aasx",A="group_EaSy",k="label_hURT",R="slot_IFFl",S=function(){return(0,a.jsxs)(x,{className:N,children:[(0,a.jsx)(C,{}),(0,a.jsx)(O,{className:k,children:"Pincode"}),(0,a.jsx)(y,{className:A,children:(0,a.jsx)(j,{children:function(e){var n=e.slot;return(0,a.jsx)(b,{slot:n,className:R},n)}})})]})},_="import {\n\tPin,\n\tPinLabel,\n\tPinInput,\n\tPinGroup,\n\tPinSlots,\n\tPinSlot\n} from '@klnjs/pin'\nimport classes from './pin.module.css'\n\nexport default () => (\n\t<Pin className={classes.pin}>\n\t\t<PinInput />\n\t\t<PinLabel className={classes.label}>Pincode</PinLabel>\n\t\t<PinGroup className={classes.group}>\n\t\t\t<PinSlots>\n\t\t\t\t{({ slot }) => (\n\t\t\t\t\t<PinSlot key={slot} slot={slot} className={classes.slot} />\n\t\t\t\t)}\n\t\t\t</PinSlots>\n\t\t</PinGroup>\n\t</Pin>\n)\n",E=".pin {\n\tdisplay: flex;\n\tgap: 16px;\n\talign-items: center;\n\tflex-direction: column;\n}\n\n.group {\n\tdisplay: flex;\n\tgap: 8px;\n\talign-items: center;\n}\n\n.label {\n\tfont-size: 22px;\n\tcolor: var(--ifm-color-primary);\n}\n\n.slot {\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: center;\n\tposition: relative;\n\theight: 56px;\n\twidth: 56px;\n\tline-height: 56px;\n\tcursor: text;\n\tborder-radius: var(--ifm-global-radius);\n\tborder: 1px solid var(--ifm-color-emphasis-300);\n\toverflow: hidden;\n\tbackground: var(--ifm-background-surface-color);\n\tbackground-clip: padding-box;\n}\n\n.slot[data-focused] {\n\tborder-color: var(--ifm-color-primary);\n}\n\n.slot[data-concealed] {\n\tfont-size: 64px;\n}\n\n.slot[data-placeholder] {\n\tcolor: var(--ifm-color-emphasis-300);\n}\n\n.slot[data-caret]::after {\n\tdisplay: block;\n\tcontent: '';\n\tposition: absolute;\n\twidth: 1px;\n\theight: 26px;\n\tanimation: blink 1.2s ease-out infinite;\n\tbackground: var(--ifm-color-primary);\n}\n\n@keyframes blink {\n\t0%,\n\t100% {\n\t\topacity: 1;\n\t}\n\t50% {\n\t\topacity: 0;\n\t}\n}\n",I={},T="Pin",D={id:"components/pin/pin",title:"Pin",description:"An input for typing pin codes / one time codes.",source:"@site/src/docs/02-components/pin/pin.mdx",sourceDirName:"02-components/pin",slug:"/components/pin/",permalink:"/basique/docs/components/pin/",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Icon",permalink:"/basique/docs/components/icon/"},next:{title:"Spinner",permalink:"/basique/docs/components/spinner/"}},V={},L=[{value:"Showcase",id:"showcase",level:2},{value:"Features",id:"features",level:2},{value:"Installation",id:"installation",level:2},{value:"Reference",id:"reference",level:2},{value:"Pin (Root)",id:"pin-root",level:3},{value:"PinInput",id:"pininput",level:3},{value:"PinLabel",id:"pinlabel",level:3},{value:"PinGroup",id:"pingroup",level:3},{value:"PinSlots",id:"pinslots",level:3},{value:"PinSlot",id:"pinslot",level:3}];function F(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",...(0,i.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h1,{id:"pin",children:"Pin"}),"\n",(0,a.jsx)(n.p,{children:"An input for typing pin codes / one time codes."}),"\n",(0,a.jsx)(n.h2,{id:"showcase",children:"Showcase"}),"\n",(0,a.jsx)(l._,{name:"pin",sources:[{file:"index.tsx",content:_,language:"jsx"},{file:"index.module.css",content:E,language:"css"}],children:(0,a.jsx)(S,{})}),"\n",(0,a.jsx)(n.h2,{id:"features",children:"Features"}),"\n",(0,a.jsxs)(r.O,{children:[(0,a.jsx)(r.X,{children:"Controlled or uncontrolled."}),(0,a.jsx)(r.X,{children:"Concealing the pin while typing."}),(0,a.jsx)(r.X,{children:"Auto complete one time codes."})]}),"\n",(0,a.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,a.jsx)(s.L,{name:"pin"}),"\n",(0,a.jsx)(n.h2,{id:"reference",children:"Reference"}),"\n",(0,a.jsx)(n.h3,{id:"pin-root",children:"Pin (Root)"}),"\n",(0,a.jsx)(n.p,{children:"Contains all the parts of an pin."}),"\n",(0,a.jsx)(o.y,{props:[{name:"asChild",type:"boolean",defaultValue:"false"},{name:"conceal",type:"PinConceal",typeAdvanced:"string | { symbol: string; delay: number }",defaultValue:"false"},{name:"defaultValue",type:"string"},{name:"disabled",type:"boolean",defaultValue:"false"},{name:"length",type:"number",defaultValue:"4"},{name:"type",type:"PinType",typeAdvanced:"'alphabetic' | 'alphanumeric' | 'numeric'",defaultValue:"alphanumeric"},{name:"value",type:"string"},{name:"onChange",type:"function",typeAdvanced:"(value: string) => void"}]}),"\n",(0,a.jsx)(n.h3,{id:"pininput",children:"PinInput"}),"\n",(0,a.jsxs)(n.p,{children:["Used to render a hidden input which is accessible by keyboard. The input can be shown by setting ",(0,a.jsx)(n.code,{children:"hidden"})," to false. It will auto complete one time codes by default, and handle sanitising of input based on root property ",(0,a.jsx)(n.code,{children:"type"}),"."]}),"\n",(0,a.jsx)(o.y,{props:[{name:"asChild",type:"boolean",defaultValue:"false"},{name:"autoComplete",type:"string",defaultValue:"one-time-code"},{name:"hidden",type:"boolean",defaultValue:"true"}]}),"\n",(0,a.jsx)(n.h3,{id:"pinlabel",children:"PinLabel"}),"\n",(0,a.jsxs)(n.p,{children:["Used to optionally render an input label, and attach it to the input so it is accessible. If omitted, you should add a label to the input with property ",(0,a.jsx)(n.code,{children:"aria-label"}),", so the component stays accessible."]}),"\n",(0,a.jsx)(o.y,{props:[{name:"asChild",type:"boolean",defaultValue:"false"}]}),"\n",(0,a.jsx)(n.h3,{id:"pingroup",children:"PinGroup"}),"\n",(0,a.jsx)(n.p,{children:"Used to group slot items."}),"\n",(0,a.jsx)(o.y,{props:[{name:"asChild",type:"boolean",defaultValue:"false"}]}),"\n",(0,a.jsx)(n.h3,{id:"pinslots",children:"PinSlots"}),"\n",(0,a.jsx)(n.p,{children:"Given the dynamic length of the pin, this utility component provides means to render slots of the pin using a render function as child."}),"\n",(0,a.jsx)(o.y,{props:[{name:"children",type:"function",typeAdvanced:"(type: { slot: number, value: string }, index: number ) => ReactNode"}]}),"\n",(0,a.jsx)(n.h3,{id:"pinslot",children:"PinSlot"}),"\n",(0,a.jsxs)(n.p,{children:["Used to render individual slots, it should be used in conjunction with the slots component. A slot will conceal its content based on the root property ",(0,a.jsx)(n.code,{children:"conceal"}),", this concealing only occurs when slot has an internal value."]}),"\n",(0,a.jsxs)(n.p,{children:["Clicking a slot will focus the input, therefore focus events should be attached to the input. The slot is primarily visual, and it provides ",(0,a.jsx)(n.code,{children:"data-*"})," attributes enabling styling of the different states."]}),"\n",(0,a.jsx)(o.y,{props:[{name:"asChild",type:"boolean",defaultValue:"false"},{name:"placeholder",type:"string"}]}),"\n",(0,a.jsx)(o.a,{attrs:[{name:"data-caret",text:"caret is shown"},{name:"data-concealed",text:"slot is concealed"},{name:"data-disabled",text:"slot is disabled"},{name:"data-end",text:"slot is last slot"},{name:"data-focused",text:"slot is focused"},{name:"data-placeholder",text:"placeholder is shown"},{name:"data-start",text:"slot is first slot"}]})]})}function M(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(F,{...e})}):F(e)}},9234:(e,n,t)=>{t.d(n,{X:()=>d,O:()=>f});var a=t(7502);const i="features_U5gm",r="list_j8Y4",s="feature_TSSP",o="icon_HJk2",l="description_zjKB";var c=t(1085),u=["children"],d=function(e){var n=e.children,t=(0,a.A)(e,u);return(0,c.jsxs)("li",Object.assign({className:s},t,{children:[(0,c.jsx)("svg",{fill:"currentColor",stroke:"none",viewBox:"0 0 24 24",className:o,"aria-hidden":!0,children:(0,c.jsx)("path",{d:"M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"})}),(0,c.jsx)("p",{className:l,children:n})]}))},p=["children"],f=function(e){var n=e.children,t=(0,a.A)(e,p);return(0,c.jsx)("div",Object.assign({className:i},t,{children:(0,c.jsx)("ul",{className:r,children:n})}))}},6937:(e,n,t)=>{t.d(n,{L:()=>r});var a=t(3092),i=t(1085),r=function(e){var n=e.name,t=e.manager,r=void 0===t?"bun":t,s=e.dependencies,o=r+" install @klnjs/"+n,l=null!=s?s:[];return(0,i.jsx)(a.Y,{language:"bash",children:[o].concat(l).join(" ")})}},6858:(e,n,t)=>{t.d(n,{a:()=>T,y:()=>I});var a=t(7502),i=t(4357);const r={table:"table_JbMS",cell:"cell_bcjn",th:"th_Zlu8",td:"td_iEyy"};var s=t(1085),o=["className","children"],l=function(e){var n=e.className,t=e.children,l=(0,a.A)(e,o);return(0,s.jsx)("table",Object.assign({className:(0,i.A)(r.table,n)},l,{children:t}))},c=["className","children"],u=function(e){var n=e.className,t=e.children,o=(0,a.A)(e,c);return(0,s.jsx)("tr",Object.assign({className:(0,i.A)(r.row,n)},o,{children:t}))},d=["as","className","children"],p=function(e){var n,t=e.as,o=e.className,l=e.children,c=(0,a.A)(e,d),u=null!=t?t:"td",p=(0,i.A)(r.cell,o,((n={})[r.td]="td"===t||void 0===t,n[r.th]="th"===t,n));return(0,s.jsx)(u,Object.assign({className:p},c,{children:l}))},f=t(7033),h=(0,f.q6)({name:"PopoverContext",nameOfHook:"usePopoverContext",nameOfProvider:"<PopoverProvider />"}),v=h[0],m=h[1],x=t(4041),g=t(6036),b=t(8972),j=t(4682),y=t(2913),P=function(e){var n=e.root,t=e.open,a=e.modal,i=e.offset,r=e.dismiss,s=e.duration,o=void 0===s?0:s,l=e.placement,c=e.defaultOpen,u=e.onOpenChange,d=(0,x.useState)(),p=d[0],h=d[1],v=(0,x.useState)(),m=v[0],P=v[1],w=(0,f.Gx)({value:t,defaultValue:c,onChange:u}),C=w[0],O=w[1],N=(0,g.we)({open:C,placement:l,whileElementsMounted:b.ll,onOpenChange:O,middleware:[(0,j.cY)(i)]}),A=N.refs,k=N.context,R=N.floatingStyles,S=function(e,n){var t=(0,g.$X)(e,{duration:{open:(0,y.E)(n)?n:n.enter,close:(0,y.E)(n)?n:n.leave}}),a=t.isMounted,i=t.status;return{mounted:a,status:"open"===i?"enter":"close"===i?"leave":"mount"}}(k,o),_=S.mounted,E=S.status,I=(0,g.bv)([(0,g.It)(k),(0,g.kp)(k),(0,g.s9)(k,{escapeKey:null==r?void 0:r.onEscapeKey,outsidePress:null==r?void 0:r.onPressOutside,ancestorScroll:null==r?void 0:r.onAncestorScroll})]);return{root:n,refs:A,modal:a,status:E,mounted:_,dismiss:r,context:k,placement:l,floatingStyles:R,open:C,labelId:p,descriptionId:m,setOpen:O,setLabelId:h,setDescriptionId:P,getFloatingProps:I.getFloatingProps,getReferenceProps:I.getReferenceProps}},w=function(e){var n=e.root,t=e.open,a=e.modal,i=e.offset,r=e.dismiss,o=e.duration,l=e.placement,c=e.children,u=e.defaultOpen,d=e.onOpenChange,p=P({root:n,open:t,modal:a,offset:i,dismiss:r,duration:o,placement:l,defaultOpen:u,onOpenChange:d});return(0,s.jsx)(v,{value:p,children:c})},C=((0,f.Rf)((function(e,n){var t=m(),a=t.refs,i=t.status,r=(0,f.Zy)(a.setPositionReference,n);return(0,s.jsx)(f.Du.div,Object.assign({ref:r,"data-status":(0,f.cT)(i)},e))})),(0,f.Rf)((function(e,n){var t=m(),a=t.open,i=t.refs,r=t.status,o=t.getReferenceProps,l=(0,f.Zy)(i.setReference,n);return(0,s.jsx)(f.Du.button,Object.assign({ref:l,type:"button","data-open":(0,f.cT)(a),"data-status":(0,f.cT)(r)},o(e)))}))),O=["style"],N=(0,f.Rf)((function(e,n){var t=e.style,i=(0,a.A)(e,O),r=m(),o=r.root,l=r.refs,c=r.modal,u=void 0!==c&&c,d=r.status,p=r.dismiss,h=r.mounted,v=r.placement,x=r.context,b=r.labelId,j=r.descriptionId,y=r.getFloatingProps,P=(0,f.Zy)(l.setFloating,n),w=null==p?void 0:p.onFocusOut;return h?(0,s.jsx)(g.XF,{id:o,children:(0,s.jsx)(g.s3,{modal:u,guards:!u,context:x,closeOnFocusOut:w,visuallyHiddenDismiss:u,children:(0,s.jsx)(f.Du.div,Object.assign({ref:P,style:Object.assign({},x.floatingStyles,t),"aria-labelledby":b,"aria-describedby":j,"data-status":(0,f.cT)(d),"data-placement":(0,f.cT)(v)},y(i)))})}):null}));const A="table_Iji9",k="prop_XcUk",R="type_6lsl",S="trigger_qVE9",_="content_LiR4";var E=function(e){var n=e.children;return(0,s.jsxs)(w,{offset:5,children:[(0,s.jsx)(C,{className:S,children:">"}),(0,s.jsx)(N,{className:_,children:n})]})},I=function(e){var n=e.props;return(0,s.jsxs)(l,{className:A,children:[(0,s.jsx)("thead",{children:(0,s.jsxs)(u,{children:[(0,s.jsx)(p,{as:"th",children:"Prop"}),(0,s.jsx)(p,{as:"th",children:"Type"}),(0,s.jsx)(p,{as:"th",children:"Default"})]})}),(0,s.jsx)("tbody",{children:n.map((function(e){var n=e.name,t=e.type,a=e.typeAdvanced,i=e.defaultValue,r=void 0===i?"-":i;return(0,s.jsxs)(u,{children:[(0,s.jsx)(p,{className:k,children:n}),(0,s.jsxs)(p,{className:R,children:[(0,s.jsx)("code",{children:t}),a?(0,s.jsx)(E,{children:a}):null]}),(0,s.jsx)(p,{children:(0,s.jsx)("code",{children:r})})]},n)}))})]})},T=function(e){var n=e.attrs;return(0,s.jsxs)(l,{className:A,children:[(0,s.jsx)("thead",{children:(0,s.jsxs)(u,{children:[(0,s.jsx)(p,{as:"th",children:"Data attribute"}),(0,s.jsx)(p,{as:"th",children:"Present when"})]})}),(0,s.jsx)("tbody",{children:n.map((function(e){var n=e.name,t=e.text,a=e.values;return(0,s.jsxs)(u,{children:[(0,s.jsx)(p,{className:k,children:n}),(0,s.jsx)(p,{children:void 0!==a?(0,s.jsx)("code",{children:a}):t})]},n)}))})]})}},1701:(e,n,t)=>{t.d(n,{_:()=>u});var a=t(1732),i=t(3759),r=t(3092);const s="showcase_OZLv",o="snippet_xoYL",l="viewport_Tpbl";var c=t(1085),u=function(e){var n=e.name,t=e.sources,u=e.children;return(0,c.jsxs)("div",{className:s,"aria-label":n,children:[(0,c.jsx)("div",{className:l,children:u}),t?(0,c.jsx)(a.A,{children:t.map((function(e){var n=e.file,t=e.content,a=e.language;return(0,c.jsx)(i.A,{value:n,label:n,children:(0,c.jsx)(r.Y,{language:a,className:o,children:t})},n)}))}):null]})}},3092:(e,n,t)=>{t.d(n,{Y:()=>o});var a=t(4506),i=t(4357);const r="snippet_PC2H";var s=t(1085),o=function(e){var n=e.children,t=e.className,o=e.language,l=e.identation,c=void 0===l?2:l,u=e.showLineNumbers,d=void 0===u||u,p=new Array(c).fill(" ").join("");return(0,s.jsx)("div",{className:(0,i.A)(r,t),children:(0,s.jsx)(a.A,{language:o,showLineNumbers:d,children:n.replace(/\t/g,p)})})}},7033:(e,n,t)=>{t.d(n,{cT:()=>w,q6:()=>i,Rf:()=>g,Du:()=>x,c9:()=>b,Pu:()=>y,wG:()=>C,RO:()=>O,Bi:()=>N,ZC:()=>A,Zy:()=>c,Gx:()=>k});var a=t(4041),i=function(e){var n=e.name,t=void 0===n?"Context":n,i=e.nameOfHook,r=void 0===i?"useContext":i,s=e.nameOfProvider,o=void 0===s?"Provider":s,l=e.defaultValue,c=(0,a.createContext)(l);c.displayName=t;return[c.Provider,function e(n){var i=(void 0===n?{}:n).strict,s=null==i||i,l=(0,a.useContext)(c);if(!l&&s){var u=function(e,n,t){var a=new Error(n+" returned `undefined`. Did you forget to wrap component within "+t);return a.name=e+"Error",a}(t,r,o);throw void 0!==Error.captureStackTrace&&Error.captureStackTrace(u,e),u}return l}]},r=t(7502),s=function(e){return"function"==typeof e},o=t(7515),l=function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return function(e){n.forEach((function(n){s(n)?n(e):(0,o.O)(n)&&(n.current=e)}))}},c=function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return(0,a.useCallback)(l.apply(void 0,n),n)},u=t(7517),d=function(e){return"string"==typeof e};function p(){for(var e=Object.assign({},arguments.length<=0?void 0:arguments[0]),n=1;n<arguments.length;n++){var t=n<0||arguments.length<=n?void 0:arguments[n],a=function(){var n=e[i],a=t[i];"style"===i&&(0,u.u)(n)&&(0,u.u)(a)?e[i]=Object.assign({},n,a):"className"===i&&d(n)&&d(a)?e[i]=n+" "+a:/^on[A-Z]/.test(i)&&s(n)&&s(a)?e[i]=function(){n.apply(void 0,arguments),a.apply(void 0,arguments)}:e[i]=null!=a?a:n};for(var i in t)a()}return e}var f,h=t(1085),v=["asChild","children"],m=function(e){var n=(0,a.forwardRef)((function(n,t){var i=n.asChild,s=n.children,o=(0,r.A)(n,v);if(!i)return(0,h.jsx)(e,Object.assign({ref:t},o,{children:s}));var c=a.Children.only(s);return(0,a.isValidElement)(c)?(0,a.cloneElement)(c,Object.assign({ref:t?l(t,c.ref):c.ref},p(o,c.props))):null}));return n.displayName=e.displayName||e.name,n},x=(f=new Map,new Proxy(m,{apply:function(e,n,t){return m(t[0])},get:function(e,n){return f.has(n)||f.set(n,m(n)),f.get(n)}})),g=function(e){return(0,a.forwardRef)(e)};function b(e,n){void 0===n&&(n=[]);var t=(0,a.useRef)(e);return(0,a.useEffect)((function(){t.current=e}),[e]),(0,a.useCallback)((function(){for(var e=arguments.length,n=new Array(e),a=0;a<e;a++)n[a]=arguments[a];return null==t.current?void 0:t.current.apply(t,n)}),n)}var j=function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return function(e){n.forEach((function(n){n&&!e.defaultPrevented&&n(e)}))}},y=function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return(0,a.useCallback)(j.apply(void 0,n),n)},P=t(2913),w=function(e){return!0===e?"":(0,P.E)(e)||d(e)?e.toString():void 0},C=function(e){return(0,a.useMemo)((function(){return Object.fromEntries(Object.entries(e).map((function(e){var n=e[0],t=e[1];return[n,w(t)]})))}),[e])};var O=function(e,n){var t,i=(t=(0,a.useRef)(!1)).current?t.current:(t.current=!0,!1);(0,a.useEffect)((function(){if(i)return e()}),n)};function N(e,n){var t=(0,a.useId)(),i=null!=e?e:t;return(0,a.useLayoutEffect)((function(){if(n)return n(i),function(){n(void 0)}}),[i,n]),i}var A=function(e){var n=(0,a.useRef)(e),t=(0,a.useRef)(null),i=n.current;return e!==i&&(n.current=e,t.current=i),t.current},k=function(e){var n=e.value,t=e.defaultValue,i=e.onChange,r=void 0!==n,s=(0,a.useRef)(r),o=b(i),l=(0,a.useState)(t),c=l[0],u=l[1],d=r?n:c,p=(0,a.useCallback)((function(e){r||u(e),o(e)}),[r,o]);return(0,a.useEffect)((function(){s.current!==r&&(s.current=r,console.warn("Warning: A component is changing from being uncontrolled to controlled or vice versa."))}),[r]),[d,p]}},7515:(e,n,t)=>{t.d(n,{O:()=>a});var a=function(e){return null!=e}},2913:(e,n,t)=>{t.d(n,{E:()=>a});var a=function(e){return Number.isFinite(e)}},7517:(e,n,t)=>{t.d(n,{u:()=>a});var a=function(e){return null!=e&&!Array.isArray(e)&&"object"==typeof e}}}]);