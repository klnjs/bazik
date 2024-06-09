"use strict";(self.webpackChunk_klnjs_docs=self.webpackChunk_klnjs_docs||[]).push([[852],{6560:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>h,frontMatter:()=>s,metadata:()=>r,toc:()=>l});var o=n(1085),i=n(1184);const s={},a="Accessibility",r={id:"overview/accessibility",title:"Accessibility",description:"All components follow the WAI-ARIA authoring practices guidelines.",source:"@site/src/docs/01-overview/02-accessibility.mdx",sourceDirName:"01-overview",slug:"/overview/accessibility",permalink:"/basique/docs/overview/accessibility",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{},sidebar:"sidebar",previous:{title:"Introduction",permalink:"/basique/docs/overview/introduction"},next:{title:"Avatar",permalink:"/basique/docs/components/avatar/"}},c={},l=[{value:"WAI-ARIA",id:"wai-aria",level:2},{value:"Accessible Labels",id:"accessible-labels",level:2},{value:"Keyboard Navigation",id:"keyboard-navigation",level:2},{value:"Focus Management",id:"focus-management",level:2}];function d(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",...(0,i.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h1,{id:"accessibility",children:"Accessibility"}),"\n",(0,o.jsx)(t.p,{children:"All components follow the WAI-ARIA authoring practices guidelines."}),"\n",(0,o.jsxs)(t.p,{children:["They handle the implementation details related to accessibility, including ",(0,o.jsx)(t.code,{children:"aria"})," and ",(0,o.jsx)(t.code,{children:"role"})," attributes, focus management, and keyboard navigation. This makes our components use as-is in most contexts and rely on functionality to follow the expected accessibility design patterns."]}),"\n",(0,o.jsx)(t.h2,{id:"wai-aria",children:"WAI-ARIA"}),"\n",(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.a,{href:"https://www.w3.org/TR/wai-aria-1.2/",children:"WAI-ARIA"}),", published and maintained by the W3C, specifies the semantics for many common UI patterns that show up in our components. This is designed to provide meaning for controls that aren't built using elements provided by the browser. For example, if you use a ",(0,o.jsx)(t.code,{children:"div"})," instead of a ",(0,o.jsx)(t.code,{children:"button"})," element to create a button, there are attributes you need to add to the ",(0,o.jsx)(t.code,{children:"div"})," in order to convey that it's a button for screen readers or voice recognition tools."]}),"\n",(0,o.jsxs)(t.p,{children:["In addition to semantics, there are behaviors that are expected from different types of components. A ",(0,o.jsx)(t.code,{children:"button"})," element is going to respond to certain interactions in ways that a div will not, so it's up to the developer to reimplement those interactions with JavaScript. The ",(0,o.jsx)(t.a,{href:"https://www.w3.org/WAI/ARIA/apg/",children:"WAI-ARIA authoring practices"})," provide additional guidance for implementing behaviors for various controls used in out components."]}),"\n",(0,o.jsx)(t.h2,{id:"accessible-labels",children:"Accessible Labels"}),"\n",(0,o.jsxs)(t.p,{children:["With many built-in form controls, the native HTML label element is designed to provide semantic meaning and context for corresponding input elements. For non-form control elements, or for custom controls like those provided by our components, WAI-ARIA provides a ",(0,o.jsx)(t.a,{href:"https://www.w3.org/TR/wai-aria-1.2/#namecalculation",children:"specification"})," for how to provide accessible names and descriptions to those controls."]}),"\n",(0,o.jsx)(t.p,{children:"Where possible, components include abstractions to make labelling our controls simple. Ultimately it's up to you to provide those labels so that users have the proper context when navigating your application."}),"\n",(0,o.jsx)(t.h2,{id:"keyboard-navigation",children:"Keyboard Navigation"}),"\n",(0,o.jsxs)(t.p,{children:["Many complex components, come with expectations from users on how to interact with their content using a keyboard or other non-mouse input modalities. We provide basic keyboard support in accordance with the ",(0,o.jsx)(t.a,{href:"https://www.w3.org/WAI/ARIA/apg/",children:"WAI-ARIA authoring practices"})]}),"\n",(0,o.jsx)(t.h2,{id:"focus-management",children:"Focus Management"}),"\n",(0,o.jsx)(t.p,{children:"Proper keyboard navigation and good labelling often go hand-in-hand with managing focus. When a user interacts with an element and changes occur, it's helpful to move focus with the interaction so that the next tab stop is logical depending on the new context. For screen reader users, moving focus often results in an announcement to convey this new context, which relies on proper labelling."})]})}function h(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},1184:(e,t,n)=>{n.d(t,{R:()=>a,x:()=>r});var o=n(4041);const i={},s=o.createContext(i);function a(e){const t=o.useContext(s);return o.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),o.createElement(s.Provider,{value:t},e.children)}}}]);