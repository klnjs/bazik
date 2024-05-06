"use strict";(self.webpackChunk_klnjs_docs=self.webpackChunk_klnjs_docs||[]).push([[17],{3089:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>L,contentTitle:()=>E,default:()=>Z,frontMatter:()=>D,metadata:()=>V,toc:()=>F});var a=t(1085),i=t(1184),s=t(9234),r=t(6937),o=t(6858),l=t(1701),c=t(7502),d=t(4700),u=(0,d.q6)({name:"PinContext",nameOfHook:"usePinContext",nameOfProvider:"<PinProvider />"}),p=u[0],f=u[1],h=t(4041),m=t(7517),v=["defaultValue","disabled","length","conceal","type","value","onChange"],x=(0,d.Rf)((function(e,n){var t=e.defaultValue,i=e.disabled,s=e.length,r=e.conceal,o=e.type,l=e.value,u=e.onChange,f=(0,c.A)(e,v),x=function(e){var n=void 0===e?{}:e,t=n.conceal,a=n.defaultValue,i=n.disabled,s=void 0!==i&&i,r=n.length,o=void 0===r?4:r,l=n.type,c=void 0===l?"alphanumeric":l,u=n.value,p=n.onChange,f=(0,h.useRef)(),v=(0,h.useState)(),x=v[0],g=v[1],b=(0,h.useState)(!1),y=b[0],j=b[1],P=(0,d.Gx)({value:u,defaultValue:a,onChange:p}),w=P[0],C=void 0===w?"":w,N=P[1],A=(0,d.ZC)(C);return{conceal:(0,h.useMemo)((function(){return{enabled:void 0!==t,delay:(0,m.u)(t)?t.delay:250,symbol:(0,m.u)(t)?t.symbol:null!=t?t:"\xb7"}}),[t]),disabled:s,direction:null===A||A.length<C.length?"forwards":"backwards",focusWithin:y,inputId:x,inputRef:f,length:o,pin:C,type:c,setPin:N,setInputId:g,setFocusWithin:j}}({defaultValue:t,disabled:i,length:s,conceal:r,type:o,value:l,onChange:u});return(0,a.jsx)(p,{value:x,children:(0,a.jsx)(d.Du.div,Object.assign({ref:n},f))})})),g=["slot","placeholder","onPointerDown"],b=(0,d.Rf)((function(e,n){var t,i=e.slot,s=e.placeholder,r=e.onPointerDown,o=(0,c.A)(e,g),l=f(),u=l.pin,p=l.length,m=l.conceal,v=m.delay,x=m.symbol,b=m.enabled,y=l.inputRef,j=l.disabled,P=void 0!==j&&j,w=l.direction,C=l.focusWithin,N=function(e){var n=e.delay,t=e.direction,a=e.enabled,i=void 0===a||a,s=e.placeholder,r=void 0===s?"":s,o=e.symbol,l=e.value,c=(0,h.useState)(),d=c[0],u=c[1];return(0,h.useEffect)((function(){if(i)if(l){if("backwards"!==t){var e=setTimeout((function(){return u(o)}),n);return u(l),function(){clearTimeout(e)}}u(o)}else u(r);else u(null!=l?l:r)}),[i,n,t,l,o,r]),d}({enabled:b,delay:v,value:null!=(t=u[i-1])?t:"",symbol:x,direction:w,placeholder:s}),A=i===p,O=1===i,k=i===Math.min(p,u.length+1),R=C&&k,S=P,_=N===x,T=N===s&&""!==s,I=R&&u.length<p,D=(0,d.Pu)(r,(function(e){var n;e.preventDefault(),null==(n=y.current)||n.focus()}));return(0,a.jsx)("div",Object.assign({ref:n,"data-end":(0,d.cT)(A),"data-start":(0,d.cT)(O),"data-caret":(0,d.cT)(I),"data-focused":(0,d.cT)(R),"data-disabled":(0,d.cT)(S),"data-concealed":(0,d.cT)(_),"data-placeholder":(0,d.cT)(T),onPointerDown:D},o,(0,d.wG)({}),{children:N}))})),y=function(e){var n=e.children,t=f(),a=t.pin,i=t.length;return(0,h.useMemo)((function(){return Array.from({length:i},(function(e,n){var t;return{slot:n+1,value:null!=(t=a[n])?t:""}}))}),[a,i]).map(n)},j=(0,d.Rf)((function(e,n){return(0,a.jsx)(d.Du.div,Object.assign({ref:n},e))})),P={alphabetic:/^[a-zA-Z]*$/,alphanumeric:/^[a-zA-Z0-9]*$/,numeric:/^[0-9]*$/},w=["id","hidden","autoComplete","style","onBlur","onFocus","onPaste","onChange","onKeyDown"],C=(0,d.Rf)((function(e,n){var t=e.id,i=e.hidden,s=void 0===i||i,r=e.autoComplete,o=void 0===r?"one-time-code":r,l=e.style,u=e.onBlur,p=e.onFocus,m=e.onPaste,v=e.onChange,x=e.onKeyDown,g=(0,c.A)(e,w),b=f(),y=b.pin,j=b.type,C=b.length,N=b.disabled,A=b.inputRef,O=b.setPin,k=b.setInputId,R=b.setFocusWithin,S=(0,d.Bi)(t,k),_=(0,d.Zy)(A,n),T=function(e){return(0,h.useMemo)((function(){return P[e]}),[e])}(j),I=s?Object.assign({position:"absolute",pointerEvents:"none",opacity:0},l):l,D=(0,d.Pu)(u,(function(){return R(!1)})),E=(0,d.Pu)(p,(function(){return R(!0)})),V=(0,d.Pu)(m,(function(e){var n=e.clipboardData.getData("text/plain"),t=[].concat(n).filter((function(e){return T.test(e)})).slice(0,C).join("");O(t)})),L=(0,d.Pu)(v,(function(e){T.test(e.target.value)&&O(e.target.value)})),F=(0,d.Pu)(x,(function(e){("End"===e.code||"Home"===e.code||e.code.startsWith("Arrow"))&&e.preventDefault()}));return(0,a.jsx)(d.Du.input,Object.assign({id:S,ref:_,type:"text",value:y,style:I,pattern:T.source,disabled:N,inputMode:"numeric"!==j?"text":j,maxLength:C,autoComplete:o,onBlur:D,onFocus:E,onPaste:V,onChange:L,onKeyDown:F},g))})),N=["id"],A=(0,d.Rf)((function(e,n){var t=e.id,i=(0,c.A)(e,N),s=(0,d.Bi)(t),r=f(),o=r.disabled,l=r.inputId;return(0,a.jsx)(d.Du.label,Object.assign({id:s,ref:n,htmlFor:l,"data-disabled":(0,d.cT)(o)},i))}));const O="pin_aasx",k="group_EaSy",R="label_hURT",S="slot_IFFl",_=function(){return(0,a.jsxs)(x,{className:O,children:[(0,a.jsx)(C,{}),(0,a.jsx)(A,{className:R,children:"Pincode"}),(0,a.jsx)(j,{className:k,children:(0,a.jsx)(y,{children:function(e){var n=e.slot;return(0,a.jsx)(b,{slot:n,className:S},n)}})})]})},T="import {\n\tPin,\n\tPinLabel,\n\tPinInput,\n\tPinGroup,\n\tPinSlots,\n\tPinSlot\n} from '@klnjs/pin'\nimport classes from './pin.module.css'\n\nexport default () => (\n\t<Pin className={classes.pin}>\n\t\t<PinInput />\n\t\t<PinLabel className={classes.label}>Pincode</PinLabel>\n\t\t<PinGroup className={classes.group}>\n\t\t\t<PinSlots>\n\t\t\t\t{({ slot }) => (\n\t\t\t\t\t<PinSlot key={slot} slot={slot} className={classes.slot} />\n\t\t\t\t)}\n\t\t\t</PinSlots>\n\t\t</PinGroup>\n\t</Pin>\n)\n",I=".pin {\n\tdisplay: flex;\n\tgap: 16px;\n\talign-items: center;\n\tflex-direction: column;\n}\n\n.group {\n\tdisplay: flex;\n\tgap: 8px;\n\talign-items: center;\n}\n\n.label {\n\tfont-size: 22px;\n\tcolor: var(--ifm-color-primary);\n}\n\n.slot {\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: center;\n\tposition: relative;\n\theight: 56px;\n\twidth: 56px;\n\tline-height: 56px;\n\tcursor: text;\n\tborder-radius: var(--ifm-global-radius);\n\tborder: 1px solid var(--ifm-color-emphasis-300);\n\toverflow: hidden;\n\tbackground: var(--ifm-background-surface-color);\n\tbackground-clip: padding-box;\n}\n\n.slot[data-focused] {\n\tborder-color: var(--ifm-color-primary);\n}\n\n.slot[data-concealed] {\n\tfont-size: 64px;\n}\n\n.slot[data-placeholder] {\n\tcolor: var(--ifm-color-emphasis-300);\n}\n\n.slot[data-caret]::after {\n\tdisplay: block;\n\tcontent: '';\n\tposition: absolute;\n\twidth: 1px;\n\theight: 26px;\n\tanimation: blink 1.2s ease-out infinite;\n\tbackground: var(--ifm-color-primary);\n}\n\n@keyframes blink {\n\t0%,\n\t100% {\n\t\topacity: 1;\n\t}\n\t50% {\n\t\topacity: 0;\n\t}\n}\n",D={},E="Pin",V={id:"components/pin/pin",title:"Pin",description:"An input for typing pin codes / one time codes.",source:"@site/src/docs/02-components/pin/pin.mdx",sourceDirName:"02-components/pin",slug:"/components/pin/",permalink:"/basique/docs/components/pin/",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Icon",permalink:"/basique/docs/components/icon/"},next:{title:"Spinner",permalink:"/basique/docs/components/spinner/"}},L={},F=[{value:"Showcase",id:"showcase",level:2},{value:"Features",id:"features",level:2},{value:"Installation",id:"installation",level:2},{value:"Reference",id:"reference",level:2},{value:"Pin (Root)",id:"pin-root",level:3},{value:"PinInput",id:"pininput",level:3},{value:"PinLabel",id:"pinlabel",level:3},{value:"PinGroup",id:"pingroup",level:3},{value:"PinSlots",id:"pinslots",level:3},{value:"PinSlot",id:"pinslot",level:3}];function M(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",...(0,i.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h1,{id:"pin",children:"Pin"}),"\n",(0,a.jsx)(n.p,{children:"An input for typing pin codes / one time codes."}),"\n",(0,a.jsx)(n.h2,{id:"showcase",children:"Showcase"}),"\n",(0,a.jsx)(l._,{name:"pin",sources:[{file:"index.tsx",content:T,language:"jsx"},{file:"index.module.css",content:I,language:"css"}],children:(0,a.jsx)(_,{})}),"\n",(0,a.jsx)(n.h2,{id:"features",children:"Features"}),"\n",(0,a.jsxs)(s.O,{children:[(0,a.jsx)(s.X,{children:"Controlled or uncontrolled."}),(0,a.jsx)(s.X,{children:"Concealing the pin while typing."}),(0,a.jsx)(s.X,{children:"Auto complete one time codes."})]}),"\n",(0,a.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,a.jsx)(r.L,{name:"pin"}),"\n",(0,a.jsx)(n.h2,{id:"reference",children:"Reference"}),"\n",(0,a.jsx)(n.h3,{id:"pin-root",children:"Pin (Root)"}),"\n",(0,a.jsx)(n.p,{children:"Contains all the parts of an pin."}),"\n",(0,a.jsx)(o.y,{props:[{name:"asChild",type:"boolean",defaultValue:"false"},{name:"conceal",type:"PinConceal",typeAdvanced:"string | { symbol: string; delay: number }",defaultValue:"false"},{name:"defaultValue",type:"string"},{name:"disabled",type:"boolean",defaultValue:"false"},{name:"length",type:"number",defaultValue:"4"},{name:"type",type:"PinType",typeAdvanced:"'alphabetic' | 'alphanumeric' | 'numeric'",defaultValue:"alphanumeric"},{name:"value",type:"string"},{name:"onChange",type:"function",typeAdvanced:"(value: string) => void"}]}),"\n",(0,a.jsx)(n.h3,{id:"pininput",children:"PinInput"}),"\n",(0,a.jsxs)(n.p,{children:["Used to render a hidden input which is accessible by keyboard. The input can be shown by setting ",(0,a.jsx)(n.code,{children:"hidden"})," to false. It will auto complete one time codes by default, and handle sanitising of input based on root property ",(0,a.jsx)(n.code,{children:"type"}),"."]}),"\n",(0,a.jsx)(o.y,{props:[{name:"asChild",type:"boolean",defaultValue:"false"},{name:"autoComplete",type:"string",defaultValue:"one-time-code"},{name:"hidden",type:"boolean",defaultValue:"true"}]}),"\n",(0,a.jsx)(n.h3,{id:"pinlabel",children:"PinLabel"}),"\n",(0,a.jsxs)(n.p,{children:["Used to optionally render an input label, and attach it to the input so it is accessible. If omitted, you should add a label to the input with property ",(0,a.jsx)(n.code,{children:"aria-label"}),", so the component stays accessible."]}),"\n",(0,a.jsx)(o.y,{props:[{name:"asChild",type:"boolean",defaultValue:"false"}]}),"\n",(0,a.jsx)(o.a,{attrs:[{name:"data-disabled",description:"pin is disabled"}]}),"\n",(0,a.jsx)(n.h3,{id:"pingroup",children:"PinGroup"}),"\n",(0,a.jsx)(n.p,{children:"Used to group slot items."}),"\n",(0,a.jsx)(o.y,{props:[{name:"asChild",type:"boolean",defaultValue:"false"}]}),"\n",(0,a.jsx)(n.h3,{id:"pinslots",children:"PinSlots"}),"\n",(0,a.jsx)(n.p,{children:"Given the dynamic length of the pin, this utility component provides means to render slots of the pin using a render function as child."}),"\n",(0,a.jsx)(o.y,{props:[{name:"children",type:"function",typeAdvanced:"(type: { slot: number, value: string }, index: number ) => ReactNode"}]}),"\n",(0,a.jsx)(n.h3,{id:"pinslot",children:"PinSlot"}),"\n",(0,a.jsxs)(n.p,{children:["Used to render individual slots, it should be used in conjunction with the slots component. A slot will conceal its content based on the root property ",(0,a.jsx)(n.code,{children:"conceal"}),", this concealing only occurs when slot has an internal value."]}),"\n",(0,a.jsxs)(n.p,{children:["Clicking a slot will focus the input, therefore focus events should be attached to the input. The slot is primarily visual, and it provides ",(0,a.jsx)(n.code,{children:"data-*"})," attributes enabling styling of the different states."]}),"\n",(0,a.jsx)(o.y,{props:[{name:"asChild",type:"boolean",defaultValue:"false"},{name:"placeholder",type:"string"}]}),"\n",(0,a.jsx)(o.a,{attrs:[{name:"data-caret",description:"caret is shown"},{name:"data-concealed",description:"slot is concealed"},{name:"data-disabled",description:"slot is disabled"},{name:"data-end",description:"slot is last slot"},{name:"data-focused",description:"slot is focused"},{name:"data-placeholder",description:"placeholder is shown"},{name:"data-start",description:"slot is first slot"}]})]})}function Z(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(M,{...e})}):M(e)}},9234:(e,n,t)=>{t.d(n,{X:()=>u,O:()=>f});var a=t(7502);const i="features_U5gm",s="list_j8Y4",r="feature_TSSP",o="icon_HJk2",l="description_zjKB";var c=t(1085),d=["children"],u=function(e){var n=e.children,t=(0,a.A)(e,d);return(0,c.jsxs)("li",Object.assign({className:r},t,{children:[(0,c.jsx)("svg",{fill:"currentColor",stroke:"none",viewBox:"0 0 24 24",className:o,"aria-hidden":!0,children:(0,c.jsx)("path",{d:"M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"})}),(0,c.jsx)("p",{className:l,children:n})]}))},p=["children"],f=function(e){var n=e.children,t=(0,a.A)(e,p);return(0,c.jsx)("div",Object.assign({className:i},t,{children:(0,c.jsx)("ul",{className:s,children:n})}))}},6937:(e,n,t)=>{t.d(n,{L:()=>s});var a=t(3092),i=t(1085),s=function(e){var n=e.name,t=e.manager,s=void 0===t?"pnpm":t;return(0,i.jsx)(a.Y,{language:"bash",children:s+" install @klnjs/"+n})}},6858:(e,n,t)=>{t.d(n,{a:()=>D,y:()=>I});var a=t(7502),i=t(4357);const s={table:"table_JbMS",cell:"cell_bcjn",th:"th_Zlu8",td:"td_iEyy"};var r=t(1085),o=["className","children"],l=function(e){var n=e.className,t=e.children,l=(0,a.A)(e,o);return(0,r.jsx)("table",Object.assign({className:(0,i.A)(s.table,n)},l,{children:t}))},c=["className","children"],d=function(e){var n=e.className,t=e.children,o=(0,a.A)(e,c);return(0,r.jsx)("tr",Object.assign({className:(0,i.A)(s.row,n)},o,{children:t}))},u=["as","className","children"],p=function(e){var n,t=e.as,o=e.className,l=e.children,c=(0,a.A)(e,u),d=null!=t?t:"td",p=(0,i.A)(s.cell,o,((n={})[s.td]="td"===t||void 0===t,n[s.th]="th"===t,n));return(0,r.jsx)(d,Object.assign({className:p},c,{children:l}))},f=t(4700),h=(0,f.q6)({name:"PopoverContext",nameOfHook:"usePopoverContext",nameOfProvider:"<PopoverProvider />"}),m=h[0],v=h[1],x=t(4041),g=t(6036),b=t(8972),y=t(4682),j=t(2913),P=function(e){var n=e.root,t=e.open,a=e.modal,i=e.offset,s=e.dismiss,r=e.duration,o=void 0===r?0:r,l=e.placement,c=e.defaultOpen,d=e.onOpenChange,u=(0,x.useState)(),p=u[0],h=u[1],m=(0,x.useState)(),v=m[0],P=m[1],w=(0,f.Gx)({value:t,defaultValue:c,onChange:d}),C=w[0],N=w[1],A=(0,g.we)({open:C,placement:l,whileElementsMounted:b.ll,onOpenChange:N,middleware:[(0,y.cY)(i)]}),O=A.refs,k=A.context,R=A.floatingStyles,S=function(e,n){var t=(0,g.$X)(e,{duration:{open:(0,j.E)(n)?n:n.enter,close:(0,j.E)(n)?n:n.leave}}),a=t.isMounted,i=t.status;return{mounted:a,status:"open"===i?"enter":"close"===i?"leave":"mount"}}(k,o),_=S.mounted,T=S.status,I=(0,g.bv)([(0,g.It)(k),(0,g.kp)(k),(0,g.s9)(k,{escapeKey:null==s?void 0:s.onEscapeKey,outsidePress:null==s?void 0:s.onPressOutside,ancestorScroll:null==s?void 0:s.onAncestorScroll})]);return{root:n,refs:O,modal:a,status:T,mounted:_,dismiss:s,context:k,placement:l,floatingStyles:R,open:C,labelId:p,descriptionId:v,setOpen:N,setLabelId:h,setDescriptionId:P,getFloatingProps:I.getFloatingProps,getReferenceProps:I.getReferenceProps}},w=function(e){var n=e.root,t=e.open,a=e.modal,i=e.offset,s=e.dismiss,o=e.duration,l=e.placement,c=e.children,d=e.defaultOpen,u=e.onOpenChange,p=P({root:n,open:t,modal:a,offset:i,dismiss:s,duration:o,placement:l,defaultOpen:d,onOpenChange:u});return(0,r.jsx)(m,{value:p,children:c})},C=((0,f.Rf)((function(e,n){var t=v(),a=t.refs,i=t.status,s=(0,f.Zy)(a.setPositionReference,n);return(0,r.jsx)(f.Du.div,Object.assign({ref:s,"data-status":(0,f.cT)(i)},e))})),(0,f.Rf)((function(e,n){var t=v(),a=t.open,i=t.refs,s=t.status,o=t.getReferenceProps,l=(0,f.Zy)(i.setReference,n);return(0,r.jsx)(f.Du.button,Object.assign({ref:l,type:"button","data-open":(0,f.cT)(a),"data-status":(0,f.cT)(s)},o(e)))}))),N=["style"],A=(0,f.Rf)((function(e,n){var t=e.style,i=(0,a.A)(e,N),s=v(),o=s.root,l=s.refs,c=s.modal,d=void 0!==c&&c,u=s.status,p=s.dismiss,h=s.mounted,m=s.placement,x=s.context,b=s.labelId,y=s.descriptionId,j=s.getFloatingProps,P=(0,f.Zy)(l.setFloating,n),w=null==p?void 0:p.onFocusOut;return h?(0,r.jsx)(g.XF,{id:o,children:(0,r.jsx)(g.s3,{modal:d,guards:!d,context:x,closeOnFocusOut:w,visuallyHiddenDismiss:d,children:(0,r.jsx)(f.Du.div,Object.assign({ref:P,style:Object.assign({},x.floatingStyles,t),"aria-labelledby":b,"aria-describedby":y,"data-status":(0,f.cT)(u),"data-placement":(0,f.cT)(m)},j(i)))})}):null}));const O="table_Iji9",k="prop_XcUk",R="type_6lsl",S="trigger_qVE9",_="content_LiR4";var T=function(e){var n=e.children;return(0,r.jsxs)(w,{offset:5,children:[(0,r.jsx)(C,{className:S,children:">"}),(0,r.jsx)(A,{className:_,children:n})]})},I=function(e){var n=e.props;return(0,r.jsxs)(l,{className:O,children:[(0,r.jsx)("thead",{children:(0,r.jsxs)(d,{children:[(0,r.jsx)(p,{as:"th",children:"Prop"}),(0,r.jsx)(p,{as:"th",children:"Type"}),(0,r.jsx)(p,{as:"th",children:"Default"})]})}),(0,r.jsx)("tbody",{children:n.map((function(e){var n=e.name,t=e.type,a=e.typeAdvanced,i=e.defaultValue,s=void 0===i?"-":i;return(0,r.jsxs)(d,{children:[(0,r.jsx)(p,{className:k,children:n}),(0,r.jsxs)(p,{className:R,children:[t,a?(0,r.jsx)(T,{children:a}):null]}),(0,r.jsx)(p,{children:s})]},n)}))})]})},D=function(e){var n=e.attrs;return(0,r.jsxs)(l,{className:O,children:[(0,r.jsx)("thead",{children:(0,r.jsxs)(d,{children:[(0,r.jsx)(p,{as:"th",children:"Data attribute"}),(0,r.jsx)(p,{as:"th",children:"Present when"})]})}),(0,r.jsx)("tbody",{children:n.map((function(e){var n=e.name,t=e.description;return(0,r.jsxs)(d,{children:[(0,r.jsx)(p,{className:k,children:n}),(0,r.jsx)(p,{children:t})]},n)}))})]})}},1701:(e,n,t)=>{t.d(n,{_:()=>d});var a=t(1732),i=t(3759),s=t(3092);const r="showcase_OZLv",o="snippet_xoYL",l="viewport_Tpbl";var c=t(1085),d=function(e){var n=e.name,t=e.sources,d=e.children;return(0,c.jsxs)("div",{className:r,"aria-label":n,children:[(0,c.jsx)("div",{className:l,children:d}),t?(0,c.jsx)(a.A,{children:t.map((function(e){var n=e.file,t=e.content,a=e.language;return(0,c.jsx)(i.A,{value:n,label:n,children:(0,c.jsx)(s.Y,{language:a,className:o,children:t})},n)}))}):null]})}},3092:(e,n,t)=>{t.d(n,{Y:()=>o});var a=t(4506),i=t(4357);const s="snippet_PC2H";var r=t(1085),o=function(e){var n=e.children,t=e.className,o=e.language,l=e.identation,c=void 0===l?2:l,d=e.showLineNumbers,u=void 0===d||d,p=new Array(c).fill(" ").join("");return(0,r.jsx)("div",{className:(0,i.A)(s,t),children:(0,r.jsx)(a.A,{language:o,showLineNumbers:u,children:n.replace(/\t/g,p)})})}},4700:(e,n,t)=>{t.d(n,{cT:()=>P,q6:()=>i,Rf:()=>x,Du:()=>v,c9:()=>g,Pu:()=>y,wG:()=>w,Bi:()=>C,ZC:()=>N,Zy:()=>l,Gx:()=>A});var a=t(4041),i=function(e){var n=e.name,t=void 0===n?"Context":n,i=e.nameOfHook,s=void 0===i?"useContext":i,r=e.nameOfProvider,o=void 0===r?"Provider":r,l=e.defaultValue,c=(0,a.createContext)(l);c.displayName=t;return[c.Provider,function e(n){var i=(void 0===n?{}:n).strict,r=null==i||i,l=(0,a.useContext)(c);if(!l&&r){var d=function(e,n,t){var a=new Error(n+" returned `undefined`. Did you forget to wrap component within "+t);return a.name=e+"Error",a}(t,s,o);throw void 0!==Error.captureStackTrace&&Error.captureStackTrace(d,e),d}return l}]},s=t(7502),r=function(e){return"function"==typeof e},o=function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return function(e){n.forEach((function(n){r(n)?n(e):function(e){return null!=e}(n)&&(n.current=e)}))}},l=function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return(0,a.useCallback)(o.apply(void 0,n),n)},c=t(7517),d=function(e){return"string"==typeof e};function u(){for(var e=Object.assign({},arguments.length<=0?void 0:arguments[0]),n=1;n<arguments.length;n++){var t=n<0||arguments.length<=n?void 0:arguments[n],a=function(){var n=e[i],a=t[i];"style"===i&&(0,c.u)(n)&&(0,c.u)(a)?e[i]=Object.assign({},n,a):"className"===i&&d(n)&&d(a)?e[i]=n+" "+a:/^on[A-Z]/.test(i)&&r(n)&&r(a)?e[i]=function(){n.apply(void 0,arguments),a.apply(void 0,arguments)}:e[i]=null!=a?a:n};for(var i in t)a()}return e}var p,f=t(1085),h=["asChild","children"],m=function(e){var n=(0,a.forwardRef)((function(n,t){var i=n.asChild,r=n.children,l=(0,s.A)(n,h);if(!i)return(0,f.jsx)(e,Object.assign({ref:t},l,{children:r}));var c=a.Children.only(r);return(0,a.isValidElement)(c)?(0,a.cloneElement)(c,Object.assign({ref:t?o(t,c.ref):c.ref},u(l,c.props))):null}));return n.displayName=e.displayName||e.name,n},v=(p=new Map,new Proxy(m,{apply:function(e,n,t){return m(t[0])},get:function(e,n){return p.has(n)||p.set(n,m(n)),p.get(n)}})),x=function(e){return(0,a.forwardRef)(e)};function g(e,n){void 0===n&&(n=[]);var t=(0,a.useRef)(e);return(0,a.useEffect)((function(){t.current=e}),[e]),(0,a.useCallback)((function(){for(var e=arguments.length,n=new Array(e),a=0;a<e;a++)n[a]=arguments[a];return null==t.current?void 0:t.current.apply(t,n)}),n)}var b=function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return function(e){n.forEach((function(n){n&&!e.defaultPrevented&&n(e)}))}},y=function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return(0,a.useCallback)(b.apply(void 0,n),n)},j=t(2913),P=function(e){return!0===e?"":(0,j.E)(e)||d(e)?e.toString():void 0},w=function(e){return(0,a.useMemo)((function(){return Object.fromEntries(Object.entries(e).map((function(e){var n=e[0],t=e[1];return[n,P(t)]})))}),[e])};function C(e,n){var t=(0,a.useId)(),i=null!=e?e:t;return(0,a.useLayoutEffect)((function(){if(n)return n(i),function(){n(void 0)}}),[i,n]),i}var N=function(e){var n=(0,a.useRef)(e),t=(0,a.useRef)(null),i=n.current;return e!==i&&(n.current=e,t.current=i),t.current},A=function(e){var n=e.value,t=e.defaultValue,i=e.onChange,s=void 0!==n,r=(0,a.useRef)(s),o=g(i),l=(0,a.useState)(t),c=l[0],d=l[1],u=s?n:c,p=(0,a.useCallback)((function(e){s||d(e),o(e)}),[s,o]);return(0,a.useEffect)((function(){r.current!==s&&(r.current=s,console.warn("Warning: A component is changing from being uncontrolled to controlled or vice versa."))}),[s]),[u,p]}},2913:(e,n,t)=>{t.d(n,{E:()=>a});var a=function(e){return Number.isFinite(e)}},7517:(e,n,t)=>{t.d(n,{u:()=>a});var a=function(e){return null!=e&&!Array.isArray(e)&&"object"==typeof e}}}]);