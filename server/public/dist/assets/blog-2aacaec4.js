import{y as Wo,r as C,z as po,A as Bo,E as Ye,F as Go,h as d,g as ho,e as mo,s as W,f as b,u as xo,_ as Ze,j as l,i as J,k as vo,G as Uo,n as H,H as wo,J as Oo,K as uo,N as ye,O as Po,Q as Te,I as Do,R as jo,w as zo,U as _o,V as Ko,X as qo,S as Qe,a as Co,T as bo,C as Jo,B as fo,L as Yo,Y as Zo,P as Fe,Z as No,M as Qo,$ as Xo,d as et,W as ot}from"./index-9295900f.js";import{b as $e,a as tt,G as Mo}from"./format-number-00941724.js";import{b as at}from"./format-time-f0d5a107.js";import{C as rt}from"./Container-db4cbf1e.js";function ko(e){return typeof e.normalize<"u"?e.normalize("NFD").replace(/[\u0300-\u036f]/g,""):e}function nt(e={}){const{ignoreAccents:o=!0,ignoreCase:i=!0,limit:c,matchFrom:h="any",stringify:I,trim:x=!1}=e;return(u,{inputValue:O,getOptionLabel:m})=>{let y=x?O.trim():O;i&&(y=y.toLowerCase()),o&&(y=ko(y));const k=y?u.filter(Y=>{let w=(I||m)(Y);return i&&(w=w.toLowerCase()),o&&(w=ko(w)),h==="start"?w.indexOf(y)===0:w.indexOf(y)>-1}):u;return typeof c=="number"?k.slice(0,c):k}}function go(e,o){for(let i=0;i<e.length;i+=1)if(o(e[i]))return i;return-1}const lt=nt(),So=5,it=e=>{var o;return e.current!==null&&((o=e.current.parentElement)==null?void 0:o.contains(document.activeElement))};function st(e){const{unstable_isActiveElementInListbox:o=it,unstable_classNamePrefix:i="Mui",autoComplete:c=!1,autoHighlight:h=!1,autoSelect:I=!1,blurOnSelect:x=!1,clearOnBlur:u=!e.freeSolo,clearOnEscape:O=!1,componentName:m="useAutocomplete",defaultValue:y=e.multiple?[]:null,disableClearable:k=!1,disableCloseOnSelect:Y=!1,disabled:w,disabledItemsFocusable:M=!1,disableListWrap:ue=!1,filterOptions:he=lt,filterSelectedOptions:A=!1,freeSolo:U=!1,getOptionDisabled:Z,getOptionLabel:Re=a=>{var t;return(t=a.label)!=null?t:a},groupBy:de,handleHomeEndKeys:me=!e.freeSolo,id:re,includeInputInList:Ie=!1,inputValue:Ve,isOptionEqualToValue:ee=(a,t)=>a===t,multiple:v=!1,onChange:ne,onClose:le,onHighlightChange:_,onInputChange:Q,onOpen:xe,open:Oe,openOnFocus:we=!1,options:T,readOnly:ie=!1,selectOnFocus:Xe=!e.freeSolo,value:De}=e,E=Wo(re);let z=Re;z=a=>{const t=Re(a);return typeof t!="string"?String(t):t};const je=C.useRef(!1),ze=C.useRef(!0),D=C.useRef(null),F=C.useRef(null),[Pe,eo]=C.useState(null),[B,ke]=C.useState(-1),He=h?0:-1,N=C.useRef(He),[s,We]=po({controlled:De,default:y,name:m}),[$,fe]=po({controlled:Ve,default:"",name:m,state:"inputValue"}),[se,Be]=C.useState(!1),Se=C.useCallback((a,t)=>{if(!(v?s.length<t.length:t!==null)&&!u)return;let n;if(v)n="";else if(t==null)n="";else{const f=z(t);n=typeof f=="string"?f:""}$!==n&&(fe(n),Q&&Q(a,n,"reset"))},[z,$,v,Q,fe,u,s]),[ce,Ge]=po({controlled:Oe,default:!1,name:m,state:"open"}),[oo,Ue]=C.useState(!0),_e=!v&&s!=null&&$===z(s),V=ce&&!ie,P=V?he(T.filter(a=>!(A&&(v?s:[s]).some(t=>t!==null&&ee(a,t)))),{inputValue:_e&&oo?"":$,getOptionLabel:z}):[],G=Bo({filteredOptions:P,value:s,inputValue:$});C.useEffect(()=>{const a=s!==G.value;se&&!a||U&&!a||Se(null,s)},[s,Se,se,G.value,U]);const Ne=ce&&P.length>0&&!ie,Le=Ye(a=>{a===-1?D.current.focus():Pe.querySelector(`[data-tag-index="${a}"]`).focus()});C.useEffect(()=>{v&&B>s.length-1&&(ke(-1),Le(-1))},[s,v,B,Le]);function to(a,t){if(!F.current||a===-1)return-1;let r=a;for(;;){if(t==="next"&&r===P.length||t==="previous"&&r===-1)return-1;const n=F.current.querySelector(`[data-option-index="${r}"]`),f=M?!1:!n||n.disabled||n.getAttribute("aria-disabled")==="true";if(n&&!n.hasAttribute("tabindex")||f)r+=t==="next"?1:-1;else return r}}const K=Ye(({event:a,index:t,reason:r="auto"})=>{if(N.current=t,t===-1?D.current.removeAttribute("aria-activedescendant"):D.current.setAttribute("aria-activedescendant",`${E}-option-${t}`),_&&_(a,t===-1?null:P[t],r),!F.current)return;const n=F.current.querySelector(`[role="option"].${i}-focused`);n&&(n.classList.remove(`${i}-focused`),n.classList.remove(`${i}-focusVisible`));let f=F.current;if(F.current.getAttribute("role")!=="listbox"&&(f=F.current.parentElement.querySelector('[role="listbox"]')),!f)return;if(t===-1){f.scrollTop=0;return}const S=F.current.querySelector(`[data-option-index="${t}"]`);if(S&&(S.classList.add(`${i}-focused`),r==="keyboard"&&S.classList.add(`${i}-focusVisible`),f.scrollHeight>f.clientHeight&&r!=="mouse"&&r!=="touch")){const L=S,ae=f.clientHeight+f.scrollTop,Io=L.offsetTop+L.offsetHeight;Io>ae?f.scrollTop=Io-f.clientHeight:L.offsetTop-L.offsetHeight*(de?1.3:0)<f.scrollTop&&(f.scrollTop=L.offsetTop-L.offsetHeight*(de?1.3:0))}}),q=Ye(({event:a,diff:t,direction:r="next",reason:n="auto"})=>{if(!V)return;const S=to((()=>{const L=P.length-1;if(t==="reset")return He;if(t==="start")return 0;if(t==="end")return L;const ae=N.current+t;return ae<0?ae===-1&&Ie?-1:ue&&N.current!==-1||Math.abs(t)>1?0:L:ae>L?ae===L+1&&Ie?-1:ue||Math.abs(t)>1?L:0:ae})(),r);if(K({index:S,reason:n,event:a}),c&&t!=="reset")if(S===-1)D.current.value=$;else{const L=z(P[S]);D.current.value=L,L.toLowerCase().indexOf($.toLowerCase())===0&&$.length>0&&D.current.setSelectionRange($.length,L.length)}}),ao=()=>{const a=(t,r)=>{const n=t?z(t):"",f=r?z(r):"";return n===f};if(N.current!==-1&&G.filteredOptions&&G.filteredOptions.length!==P.length&&G.inputValue===$&&(v?s.length===G.value.length&&G.value.every((t,r)=>z(s[r])===z(t)):a(G.value,s))){const t=G.filteredOptions[N.current];if(t&&P.some(n=>z(n)===z(t)))return!0}return!1},ge=C.useCallback(()=>{if(!V||ao())return;const a=v?s[0]:s;if(P.length===0||a==null){q({diff:"reset"});return}if(F.current){if(a!=null){const t=P[N.current];if(v&&t&&go(s,n=>ee(t,n))!==-1)return;const r=go(P,n=>ee(n,a));r===-1?q({diff:"reset"}):K({index:r});return}if(N.current>=P.length-1){K({index:P.length-1});return}K({index:N.current})}},[P.length,v?!1:s,A,q,K,V,$,v]),ro=Ye(a=>{Go(F,a),a&&ge()});C.useEffect(()=>{ge()},[ge]);const pe=a=>{ce||(Ge(!0),Ue(!0),xe&&xe(a))},oe=(a,t)=>{ce&&(Ge(!1),le&&le(a,t))},te=(a,t,r,n)=>{if(v){if(s.length===t.length&&s.every((f,S)=>f===t[S]))return}else if(s===t)return;ne&&ne(a,t,r,n),We(t)},be=C.useRef(!1),ve=(a,t,r="selectOption",n="options")=>{let f=r,S=t;if(v){S=Array.isArray(s)?s.slice():[];const L=go(S,ae=>ee(t,ae));L===-1?S.push(t):n!=="freeSolo"&&(S.splice(L,1),f="removeOption")}Se(a,S),te(a,S,f,{option:t}),!Y&&(!a||!a.ctrlKey&&!a.metaKey)&&oe(a,f),(x===!0||x==="touch"&&be.current||x==="mouse"&&!be.current)&&D.current.blur()};function no(a,t){if(a===-1)return-1;let r=a;for(;;){if(t==="next"&&r===s.length||t==="previous"&&r===-1)return-1;const n=Pe.querySelector(`[data-tag-index="${r}"]`);if(!n||!n.hasAttribute("tabindex")||n.disabled||n.getAttribute("aria-disabled")==="true")r+=t==="next"?1:-1;else return r}}const Me=(a,t)=>{if(!v)return;$===""&&oe(a,"toggleInput");let r=B;B===-1?$===""&&t==="previous"&&(r=s.length-1):(r+=t==="next"?1:-1,r<0&&(r=0),r===s.length&&(r=-1)),r=no(r,t),ke(r),Le(r)},Ke=a=>{je.current=!0,fe(""),Q&&Q(a,"","clear"),te(a,v?[]:null,"clear")},lo=a=>t=>{if(a.onKeyDown&&a.onKeyDown(t),!t.defaultMuiPrevented&&(B!==-1&&["ArrowLeft","ArrowRight"].indexOf(t.key)===-1&&(ke(-1),Le(-1)),t.which!==229))switch(t.key){case"Home":V&&me&&(t.preventDefault(),q({diff:"start",direction:"next",reason:"keyboard",event:t}));break;case"End":V&&me&&(t.preventDefault(),q({diff:"end",direction:"previous",reason:"keyboard",event:t}));break;case"PageUp":t.preventDefault(),q({diff:-So,direction:"previous",reason:"keyboard",event:t}),pe(t);break;case"PageDown":t.preventDefault(),q({diff:So,direction:"next",reason:"keyboard",event:t}),pe(t);break;case"ArrowDown":t.preventDefault(),q({diff:1,direction:"next",reason:"keyboard",event:t}),pe(t);break;case"ArrowUp":t.preventDefault(),q({diff:-1,direction:"previous",reason:"keyboard",event:t}),pe(t);break;case"ArrowLeft":Me(t,"previous");break;case"ArrowRight":Me(t,"next");break;case"Enter":if(N.current!==-1&&V){const r=P[N.current],n=Z?Z(r):!1;if(t.preventDefault(),n)return;ve(t,r,"selectOption"),c&&D.current.setSelectionRange(D.current.value.length,D.current.value.length)}else U&&$!==""&&_e===!1&&(v&&t.preventDefault(),ve(t,$,"createOption","freeSolo"));break;case"Escape":V?(t.preventDefault(),t.stopPropagation(),oe(t,"escape")):O&&($!==""||v&&s.length>0)&&(t.preventDefault(),t.stopPropagation(),Ke(t));break;case"Backspace":if(v&&!ie&&$===""&&s.length>0){const r=B===-1?s.length-1:B,n=s.slice();n.splice(r,1),te(t,n,"removeOption",{option:s[r]})}break;case"Delete":if(v&&!ie&&$===""&&s.length>0&&B!==-1){const r=B,n=s.slice();n.splice(r,1),te(t,n,"removeOption",{option:s[r]})}break}},io=a=>{Be(!0),we&&!je.current&&pe(a)},so=a=>{if(o(F)){D.current.focus();return}Be(!1),ze.current=!0,je.current=!1,I&&N.current!==-1&&V?ve(a,P[N.current],"blur"):I&&U&&$!==""?ve(a,$,"blur","freeSolo"):u&&Se(a,s),oe(a,"blur")},Ee=a=>{const t=a.target.value;$!==t&&(fe(t),Ue(!1),Q&&Q(a,t,"input")),t===""?!k&&!v&&te(a,null,"clear"):pe(a)},j=a=>{const t=Number(a.currentTarget.getAttribute("data-option-index"));N.current!==t&&K({event:a,index:t,reason:"mouse"})},R=a=>{K({event:a,index:Number(a.currentTarget.getAttribute("data-option-index")),reason:"touch"}),be.current=!0},X=a=>{const t=Number(a.currentTarget.getAttribute("data-option-index"));ve(a,P[t],"selectOption"),be.current=!1},yo=a=>t=>{const r=s.slice();r.splice(a,1),te(t,r,"removeOption",{option:s[a]})},qe=a=>{ce?oe(a,"toggleInput"):pe(a)},$o=a=>{a.currentTarget.contains(a.target)&&a.target.getAttribute("id")!==E&&a.preventDefault()},co=a=>{a.currentTarget.contains(a.target)&&(D.current.focus(),Xe&&ze.current&&D.current.selectionEnd-D.current.selectionStart===0&&D.current.select(),ze.current=!1)},Je=a=>{!w&&($===""||!ce)&&qe(a)};let Ce=U&&$.length>0;Ce=Ce||(v?s.length>0:s!==null);let Ae=P;return de&&(Ae=P.reduce((a,t,r)=>{const n=de(t);return a.length>0&&a[a.length-1].group===n?a[a.length-1].options.push(t):a.push({key:r,index:r,group:n,options:[t]}),a},[])),w&&se&&so(),{getRootProps:(a={})=>d({"aria-owns":Ne?`${E}-listbox`:null},a,{onKeyDown:lo(a),onMouseDown:$o,onClick:co}),getInputLabelProps:()=>({id:`${E}-label`,htmlFor:E}),getInputProps:()=>({id:E,value:$,onBlur:so,onFocus:io,onChange:Ee,onMouseDown:Je,"aria-activedescendant":V?"":null,"aria-autocomplete":c?"both":"list","aria-controls":Ne?`${E}-listbox`:void 0,"aria-expanded":Ne,autoComplete:"off",ref:D,autoCapitalize:"none",spellCheck:"false",role:"combobox",disabled:w}),getClearProps:()=>({tabIndex:-1,onClick:Ke}),getPopupIndicatorProps:()=>({tabIndex:-1,onClick:qe}),getTagProps:({index:a})=>d({key:a,"data-tag-index":a,tabIndex:-1},!ie&&{onDelete:yo(a)}),getListboxProps:()=>({role:"listbox",id:`${E}-listbox`,"aria-labelledby":`${E}-label`,ref:ro,onMouseDown:a=>{a.preventDefault()}}),getOptionProps:({index:a,option:t})=>{const r=(v?s:[s]).some(f=>f!=null&&ee(t,f)),n=Z?Z(t):!1;return{key:z(t),tabIndex:-1,role:"option",id:`${E}-option-${a}`,onMouseMove:j,onClick:X,onTouchStart:R,"data-option-index":a,"aria-disabled":n,"aria-selected":r}},id:E,inputValue:$,value:s,dirty:Ce,expanded:V&&Pe,popupOpen:V,focused:se||B!==-1,anchorEl:Pe,setAnchorEl:eo,focusedTag:B,groupedOptions:Ae}}function ct(e){return ho("MuiListSubheader",e)}mo("MuiListSubheader",["root","colorPrimary","colorInherit","gutters","inset","sticky"]);const pt=["className","color","component","disableGutters","disableSticky","inset"],ut=e=>{const{classes:o,color:i,disableGutters:c,inset:h,disableSticky:I}=e,x={root:["root",i!=="default"&&`color${b(i)}`,!c&&"gutters",h&&"inset",!I&&"sticky"]};return vo(x,ct,o)},dt=W("li",{name:"MuiListSubheader",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:i}=e;return[o.root,i.color!=="default"&&o[`color${b(i.color)}`],!i.disableGutters&&o.gutters,i.inset&&o.inset,!i.disableSticky&&o.sticky]}})(({theme:e,ownerState:o})=>d({boxSizing:"border-box",lineHeight:"48px",listStyle:"none",color:(e.vars||e).palette.text.secondary,fontFamily:e.typography.fontFamily,fontWeight:e.typography.fontWeightMedium,fontSize:e.typography.pxToRem(14)},o.color==="primary"&&{color:(e.vars||e).palette.primary.main},o.color==="inherit"&&{color:"inherit"},!o.disableGutters&&{paddingLeft:16,paddingRight:16},o.inset&&{paddingLeft:72},!o.disableSticky&&{position:"sticky",top:0,zIndex:1,backgroundColor:(e.vars||e).palette.background.paper})),Eo=C.forwardRef(function(o,i){const c=xo({props:o,name:"MuiListSubheader"}),{className:h,color:I="default",component:x="li",disableGutters:u=!1,disableSticky:O=!1,inset:m=!1}=c,y=Ze(c,pt),k=d({},c,{color:I,component:x,disableGutters:u,disableSticky:O,inset:m}),Y=ut(k);return l.jsx(dt,d({as:x,className:J(Y.root,h),ref:i,ownerState:k},y))});Eo.muiSkipListHighlight=!0;const ft=Eo,gt=Uo(l.jsx("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"}),"Cancel");function bt(e){return ho("MuiChip",e)}const ht=mo("MuiChip",["root","sizeSmall","sizeMedium","colorError","colorInfo","colorPrimary","colorSecondary","colorSuccess","colorWarning","disabled","clickable","clickableColorPrimary","clickableColorSecondary","deletable","deletableColorPrimary","deletableColorSecondary","outlined","filled","outlinedPrimary","outlinedSecondary","filledPrimary","filledSecondary","avatar","avatarSmall","avatarMedium","avatarColorPrimary","avatarColorSecondary","icon","iconSmall","iconMedium","iconColorPrimary","iconColorSecondary","label","labelSmall","labelMedium","deleteIcon","deleteIconSmall","deleteIconMedium","deleteIconColorPrimary","deleteIconColorSecondary","deleteIconOutlinedColorPrimary","deleteIconOutlinedColorSecondary","deleteIconFilledColorPrimary","deleteIconFilledColorSecondary","focusVisible"]),g=ht,mt=["avatar","className","clickable","color","component","deleteIcon","disabled","icon","label","onClick","onDelete","onKeyDown","onKeyUp","size","variant","tabIndex","skipFocusWhenDisabled"],xt=e=>{const{classes:o,disabled:i,size:c,color:h,iconColor:I,onDelete:x,clickable:u,variant:O}=e,m={root:["root",O,i&&"disabled",`size${b(c)}`,`color${b(h)}`,u&&"clickable",u&&`clickableColor${b(h)}`,x&&"deletable",x&&`deletableColor${b(h)}`,`${O}${b(h)}`],label:["label",`label${b(c)}`],avatar:["avatar",`avatar${b(c)}`,`avatarColor${b(h)}`],icon:["icon",`icon${b(c)}`,`iconColor${b(I)}`],deleteIcon:["deleteIcon",`deleteIcon${b(c)}`,`deleteIconColor${b(h)}`,`deleteIcon${b(O)}Color${b(h)}`]};return vo(m,bt,o)},vt=W("div",{name:"MuiChip",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:i}=e,{color:c,iconColor:h,clickable:I,onDelete:x,size:u,variant:O}=i;return[{[`& .${g.avatar}`]:o.avatar},{[`& .${g.avatar}`]:o[`avatar${b(u)}`]},{[`& .${g.avatar}`]:o[`avatarColor${b(c)}`]},{[`& .${g.icon}`]:o.icon},{[`& .${g.icon}`]:o[`icon${b(u)}`]},{[`& .${g.icon}`]:o[`iconColor${b(h)}`]},{[`& .${g.deleteIcon}`]:o.deleteIcon},{[`& .${g.deleteIcon}`]:o[`deleteIcon${b(u)}`]},{[`& .${g.deleteIcon}`]:o[`deleteIconColor${b(c)}`]},{[`& .${g.deleteIcon}`]:o[`deleteIcon${b(O)}Color${b(c)}`]},o.root,o[`size${b(u)}`],o[`color${b(c)}`],I&&o.clickable,I&&c!=="default"&&o[`clickableColor${b(c)})`],x&&o.deletable,x&&c!=="default"&&o[`deletableColor${b(c)}`],o[O],o[`${O}${b(c)}`]]}})(({theme:e,ownerState:o})=>{const i=e.palette.mode==="light"?e.palette.grey[700]:e.palette.grey[300];return d({maxWidth:"100%",fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(13),display:"inline-flex",alignItems:"center",justifyContent:"center",height:32,color:(e.vars||e).palette.text.primary,backgroundColor:(e.vars||e).palette.action.selected,borderRadius:32/2,whiteSpace:"nowrap",transition:e.transitions.create(["background-color","box-shadow"]),cursor:"unset",outline:0,textDecoration:"none",border:0,padding:0,verticalAlign:"middle",boxSizing:"border-box",[`&.${g.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity,pointerEvents:"none"},[`& .${g.avatar}`]:{marginLeft:5,marginRight:-6,width:24,height:24,color:e.vars?e.vars.palette.Chip.defaultAvatarColor:i,fontSize:e.typography.pxToRem(12)},[`& .${g.avatarColorPrimary}`]:{color:(e.vars||e).palette.primary.contrastText,backgroundColor:(e.vars||e).palette.primary.dark},[`& .${g.avatarColorSecondary}`]:{color:(e.vars||e).palette.secondary.contrastText,backgroundColor:(e.vars||e).palette.secondary.dark},[`& .${g.avatarSmall}`]:{marginLeft:4,marginRight:-4,width:18,height:18,fontSize:e.typography.pxToRem(10)},[`& .${g.icon}`]:d({marginLeft:5,marginRight:-6},o.size==="small"&&{fontSize:18,marginLeft:4,marginRight:-4},o.iconColor===o.color&&d({color:e.vars?e.vars.palette.Chip.defaultIconColor:i},o.color!=="default"&&{color:"inherit"})),[`& .${g.deleteIcon}`]:d({WebkitTapHighlightColor:"transparent",color:e.vars?`rgba(${e.vars.palette.text.primaryChannel} / 0.26)`:H(e.palette.text.primary,.26),fontSize:22,cursor:"pointer",margin:"0 5px 0 -6px","&:hover":{color:e.vars?`rgba(${e.vars.palette.text.primaryChannel} / 0.4)`:H(e.palette.text.primary,.4)}},o.size==="small"&&{fontSize:16,marginRight:4,marginLeft:-4},o.color!=="default"&&{color:e.vars?`rgba(${e.vars.palette[o.color].contrastTextChannel} / 0.7)`:H(e.palette[o.color].contrastText,.7),"&:hover, &:active":{color:(e.vars||e).palette[o.color].contrastText}})},o.size==="small"&&{height:24},o.color!=="default"&&{backgroundColor:(e.vars||e).palette[o.color].main,color:(e.vars||e).palette[o.color].contrastText},o.onDelete&&{[`&.${g.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.action.selectedChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:H(e.palette.action.selected,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)}},o.onDelete&&o.color!=="default"&&{[`&.${g.focusVisible}`]:{backgroundColor:(e.vars||e).palette[o.color].dark}})},({theme:e,ownerState:o})=>d({},o.clickable&&{userSelect:"none",WebkitTapHighlightColor:"transparent",cursor:"pointer","&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette.action.selectedChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:H(e.palette.action.selected,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity)},[`&.${g.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.action.selectedChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:H(e.palette.action.selected,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)},"&:active":{boxShadow:(e.vars||e).shadows[1]}},o.clickable&&o.color!=="default"&&{[`&:hover, &.${g.focusVisible}`]:{backgroundColor:(e.vars||e).palette[o.color].dark}}),({theme:e,ownerState:o})=>d({},o.variant==="outlined"&&{backgroundColor:"transparent",border:e.vars?`1px solid ${e.vars.palette.Chip.defaultBorder}`:`1px solid ${e.palette.mode==="light"?e.palette.grey[400]:e.palette.grey[700]}`,[`&.${g.clickable}:hover`]:{backgroundColor:(e.vars||e).palette.action.hover},[`&.${g.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`& .${g.avatar}`]:{marginLeft:4},[`& .${g.avatarSmall}`]:{marginLeft:2},[`& .${g.icon}`]:{marginLeft:4},[`& .${g.iconSmall}`]:{marginLeft:2},[`& .${g.deleteIcon}`]:{marginRight:5},[`& .${g.deleteIconSmall}`]:{marginRight:3}},o.variant==="outlined"&&o.color!=="default"&&{color:(e.vars||e).palette[o.color].main,border:`1px solid ${e.vars?`rgba(${e.vars.palette[o.color].mainChannel} / 0.7)`:H(e.palette[o.color].main,.7)}`,[`&.${g.clickable}:hover`]:{backgroundColor:e.vars?`rgba(${e.vars.palette[o.color].mainChannel} / ${e.vars.palette.action.hoverOpacity})`:H(e.palette[o.color].main,e.palette.action.hoverOpacity)},[`&.${g.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette[o.color].mainChannel} / ${e.vars.palette.action.focusOpacity})`:H(e.palette[o.color].main,e.palette.action.focusOpacity)},[`& .${g.deleteIcon}`]:{color:e.vars?`rgba(${e.vars.palette[o.color].mainChannel} / 0.7)`:H(e.palette[o.color].main,.7),"&:hover, &:active":{color:(e.vars||e).palette[o.color].main}}})),Ct=W("span",{name:"MuiChip",slot:"Label",overridesResolver:(e,o)=>{const{ownerState:i}=e,{size:c}=i;return[o.label,o[`label${b(c)}`]]}})(({ownerState:e})=>d({overflow:"hidden",textOverflow:"ellipsis",paddingLeft:12,paddingRight:12,whiteSpace:"nowrap"},e.size==="small"&&{paddingLeft:8,paddingRight:8}));function Lo(e){return e.key==="Backspace"||e.key==="Delete"}const yt=C.forwardRef(function(o,i){const c=xo({props:o,name:"MuiChip"}),{avatar:h,className:I,clickable:x,color:u="default",component:O,deleteIcon:m,disabled:y=!1,icon:k,label:Y,onClick:w,onDelete:M,onKeyDown:ue,onKeyUp:he,size:A="medium",variant:U="filled",tabIndex:Z,skipFocusWhenDisabled:Re=!1}=c,de=Ze(c,mt),me=C.useRef(null),re=wo(me,i),Ie=T=>{T.stopPropagation(),M&&M(T)},Ve=T=>{T.currentTarget===T.target&&Lo(T)&&T.preventDefault(),ue&&ue(T)},ee=T=>{T.currentTarget===T.target&&(M&&Lo(T)?M(T):T.key==="Escape"&&me.current&&me.current.blur()),he&&he(T)},v=x!==!1&&w?!0:x,ne=v||M?Oo:O||"div",le=d({},c,{component:ne,disabled:y,size:A,color:u,iconColor:C.isValidElement(k)&&k.props.color||u,onDelete:!!M,clickable:v,variant:U}),_=xt(le),Q=ne===Oo?d({component:O||"div",focusVisibleClassName:_.focusVisible},M&&{disableRipple:!0}):{};let xe=null;M&&(xe=m&&C.isValidElement(m)?C.cloneElement(m,{className:J(m.props.className,_.deleteIcon),onClick:Ie}):l.jsx(gt,{className:J(_.deleteIcon),onClick:Ie}));let Oe=null;h&&C.isValidElement(h)&&(Oe=C.cloneElement(h,{className:J(_.avatar,h.props.className)}));let we=null;return k&&C.isValidElement(k)&&(we=C.cloneElement(k,{className:J(_.icon,k.props.className)})),l.jsxs(vt,d({as:ne,className:J(_.root,I),disabled:v&&y?!0:void 0,onClick:w,onKeyDown:Ve,onKeyUp:ee,ref:re,tabIndex:Re&&y?-1:Z,ownerState:le},Q,de,{children:[Oe||we,l.jsx(Ct,{className:J(_.label),ownerState:le,children:Y}),xe]}))}),$t=yt;function It(e){return ho("MuiAutocomplete",e)}const Ot=mo("MuiAutocomplete",["root","expanded","fullWidth","focused","focusVisible","tag","tagSizeSmall","tagSizeMedium","hasPopupIcon","hasClearIcon","inputRoot","input","inputFocused","endAdornment","clearIndicator","popupIndicator","popupIndicatorOpen","popper","popperDisablePortal","paper","listbox","loading","noOptions","option","groupLabel","groupUl"]),p=Ot;var Ao,To;const Pt=["autoComplete","autoHighlight","autoSelect","blurOnSelect","ChipProps","className","clearIcon","clearOnBlur","clearOnEscape","clearText","closeText","componentsProps","defaultValue","disableClearable","disableCloseOnSelect","disabled","disabledItemsFocusable","disableListWrap","disablePortal","filterOptions","filterSelectedOptions","forcePopupIcon","freeSolo","fullWidth","getLimitTagsText","getOptionDisabled","getOptionLabel","isOptionEqualToValue","groupBy","handleHomeEndKeys","id","includeInputInList","inputValue","limitTags","ListboxComponent","ListboxProps","loading","loadingText","multiple","noOptionsText","onChange","onClose","onHighlightChange","onInputChange","onOpen","open","openOnFocus","openText","options","PaperComponent","PopperComponent","popupIcon","readOnly","renderGroup","renderInput","renderOption","renderTags","selectOnFocus","size","slotProps","value"],kt=["ref"],St=e=>{const{classes:o,disablePortal:i,expanded:c,focused:h,fullWidth:I,hasClearIcon:x,hasPopupIcon:u,inputFocused:O,popupOpen:m,size:y}=e,k={root:["root",c&&"expanded",h&&"focused",I&&"fullWidth",x&&"hasClearIcon",u&&"hasPopupIcon"],inputRoot:["inputRoot"],input:["input",O&&"inputFocused"],tag:["tag",`tagSize${b(y)}`],endAdornment:["endAdornment"],clearIndicator:["clearIndicator"],popupIndicator:["popupIndicator",m&&"popupIndicatorOpen"],popper:["popper",i&&"popperDisablePortal"],paper:["paper"],listbox:["listbox"],loading:["loading"],noOptions:["noOptions"],option:["option"],groupLabel:["groupLabel"],groupUl:["groupUl"]};return vo(k,It,o)},Lt=W("div",{name:"MuiAutocomplete",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:i}=e,{fullWidth:c,hasClearIcon:h,hasPopupIcon:I,inputFocused:x,size:u}=i;return[{[`& .${p.tag}`]:o.tag},{[`& .${p.tag}`]:o[`tagSize${b(u)}`]},{[`& .${p.inputRoot}`]:o.inputRoot},{[`& .${p.input}`]:o.input},{[`& .${p.input}`]:x&&o.inputFocused},o.root,c&&o.fullWidth,I&&o.hasPopupIcon,h&&o.hasClearIcon]}})(({ownerState:e})=>d({[`&.${p.focused} .${p.clearIndicator}`]:{visibility:"visible"},"@media (pointer: fine)":{[`&:hover .${p.clearIndicator}`]:{visibility:"visible"}}},e.fullWidth&&{width:"100%"},{[`& .${p.tag}`]:d({margin:3,maxWidth:"calc(100% - 6px)"},e.size==="small"&&{margin:2,maxWidth:"calc(100% - 4px)"}),[`& .${p.inputRoot}`]:{flexWrap:"wrap",[`.${p.hasPopupIcon}&, .${p.hasClearIcon}&`]:{paddingRight:26+4},[`.${p.hasPopupIcon}.${p.hasClearIcon}&`]:{paddingRight:52+4},[`& .${p.input}`]:{width:0,minWidth:30}},[`& .${uo.root}`]:{paddingBottom:1,"& .MuiInput-input":{padding:"4px 4px 4px 0px"}},[`& .${uo.root}.${ye.sizeSmall}`]:{[`& .${uo.input}`]:{padding:"2px 4px 3px 0"}},[`& .${Po.root}`]:{padding:9,[`.${p.hasPopupIcon}&, .${p.hasClearIcon}&`]:{paddingRight:26+4+9},[`.${p.hasPopupIcon}.${p.hasClearIcon}&`]:{paddingRight:52+4+9},[`& .${p.input}`]:{padding:"7.5px 4px 7.5px 5px"},[`& .${p.endAdornment}`]:{right:9}},[`& .${Po.root}.${ye.sizeSmall}`]:{paddingTop:6,paddingBottom:6,paddingLeft:6,[`& .${p.input}`]:{padding:"2.5px 4px 2.5px 8px"}},[`& .${Te.root}`]:{paddingTop:19,paddingLeft:8,[`.${p.hasPopupIcon}&, .${p.hasClearIcon}&`]:{paddingRight:26+4+9},[`.${p.hasPopupIcon}.${p.hasClearIcon}&`]:{paddingRight:52+4+9},[`& .${Te.input}`]:{padding:"7px 4px"},[`& .${p.endAdornment}`]:{right:9}},[`& .${Te.root}.${ye.sizeSmall}`]:{paddingBottom:1,[`& .${Te.input}`]:{padding:"2.5px 4px"}},[`& .${ye.hiddenLabel}`]:{paddingTop:8},[`& .${Te.root}.${ye.hiddenLabel}`]:{paddingTop:0,paddingBottom:0,[`& .${p.input}`]:{paddingTop:16,paddingBottom:17}},[`& .${Te.root}.${ye.hiddenLabel}.${ye.sizeSmall}`]:{[`& .${p.input}`]:{paddingTop:8,paddingBottom:9}},[`& .${p.input}`]:d({flexGrow:1,textOverflow:"ellipsis",opacity:0},e.inputFocused&&{opacity:1})})),At=W("div",{name:"MuiAutocomplete",slot:"EndAdornment",overridesResolver:(e,o)=>o.endAdornment})({position:"absolute",right:0,top:"calc(50% - 14px)"}),Tt=W(Do,{name:"MuiAutocomplete",slot:"ClearIndicator",overridesResolver:(e,o)=>o.clearIndicator})({marginRight:-2,padding:4,visibility:"hidden"}),Rt=W(Do,{name:"MuiAutocomplete",slot:"PopupIndicator",overridesResolver:({ownerState:e},o)=>d({},o.popupIndicator,e.popupOpen&&o.popupIndicatorOpen)})(({ownerState:e})=>d({padding:2,marginRight:-2},e.popupOpen&&{transform:"rotate(180deg)"})),wt=W(jo,{name:"MuiAutocomplete",slot:"Popper",overridesResolver:(e,o)=>{const{ownerState:i}=e;return[{[`& .${p.option}`]:o.option},o.popper,i.disablePortal&&o.popperDisablePortal]}})(({theme:e,ownerState:o})=>d({zIndex:(e.vars||e).zIndex.modal},o.disablePortal&&{position:"absolute"})),Dt=W(zo,{name:"MuiAutocomplete",slot:"Paper",overridesResolver:(e,o)=>o.paper})(({theme:e})=>d({},e.typography.body1,{overflow:"auto"})),jt=W("div",{name:"MuiAutocomplete",slot:"Loading",overridesResolver:(e,o)=>o.loading})(({theme:e})=>({color:(e.vars||e).palette.text.secondary,padding:"14px 16px"})),zt=W("div",{name:"MuiAutocomplete",slot:"NoOptions",overridesResolver:(e,o)=>o.noOptions})(({theme:e})=>({color:(e.vars||e).palette.text.secondary,padding:"14px 16px"})),Nt=W("div",{name:"MuiAutocomplete",slot:"Listbox",overridesResolver:(e,o)=>o.listbox})(({theme:e})=>({listStyle:"none",margin:0,padding:"8px 0",maxHeight:"40vh",overflow:"auto",position:"relative",[`& .${p.option}`]:{minHeight:48,display:"flex",overflow:"hidden",justifyContent:"flex-start",alignItems:"center",cursor:"pointer",paddingTop:6,boxSizing:"border-box",outline:"0",WebkitTapHighlightColor:"transparent",paddingBottom:6,paddingLeft:16,paddingRight:16,[e.breakpoints.up("sm")]:{minHeight:"auto"},[`&.${p.focused}`]:{backgroundColor:(e.vars||e).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},'&[aria-disabled="true"]':{opacity:(e.vars||e).palette.action.disabledOpacity,pointerEvents:"none"},[`&.${p.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},'&[aria-selected="true"]':{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:H(e.palette.primary.main,e.palette.action.selectedOpacity),[`&.${p.focused}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:H(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:(e.vars||e).palette.action.selected}},[`&.${p.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:H(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)}}}})),Mt=W(ft,{name:"MuiAutocomplete",slot:"GroupLabel",overridesResolver:(e,o)=>o.groupLabel})(({theme:e})=>({backgroundColor:(e.vars||e).palette.background.paper,top:-8})),Et=W("ul",{name:"MuiAutocomplete",slot:"GroupUl",overridesResolver:(e,o)=>o.groupUl})({padding:0,[`& .${p.option}`]:{paddingLeft:24}}),Ft=C.forwardRef(function(o,i){var c,h,I,x;const u=xo({props:o,name:"MuiAutocomplete"}),{autoComplete:O=!1,autoHighlight:m=!1,autoSelect:y=!1,blurOnSelect:k=!1,ChipProps:Y,className:w,clearIcon:M=Ao||(Ao=l.jsx(_o,{fontSize:"small"})),clearOnBlur:ue=!u.freeSolo,clearOnEscape:he=!1,clearText:A="Clear",closeText:U="Close",componentsProps:Z={},defaultValue:Re=u.multiple?[]:null,disableClearable:de=!1,disableCloseOnSelect:me=!1,disabled:re=!1,disabledItemsFocusable:Ie=!1,disableListWrap:Ve=!1,disablePortal:ee=!1,filterSelectedOptions:v=!1,forcePopupIcon:ne="auto",freeSolo:le=!1,fullWidth:_=!1,getLimitTagsText:Q=r=>`+${r}`,getOptionLabel:xe,groupBy:Oe,handleHomeEndKeys:we=!u.freeSolo,includeInputInList:T=!1,limitTags:ie=-1,ListboxComponent:Xe="ul",ListboxProps:De,loading:E=!1,loadingText:z="Loading…",multiple:je=!1,noOptionsText:ze="No options",openOnFocus:D=!1,openText:F="Open",PaperComponent:Pe=zo,PopperComponent:eo=jo,popupIcon:B=To||(To=l.jsx(Ko,{})),readOnly:ke=!1,renderGroup:He,renderInput:N,renderOption:s,renderTags:We,selectOnFocus:$=!u.freeSolo,size:fe="medium",slotProps:se={}}=u,Be=Ze(u,Pt),{getRootProps:Se,getInputProps:ce,getInputLabelProps:Ge,getPopupIndicatorProps:oo,getClearProps:Ue,getTagProps:_e,getListboxProps:V,getOptionProps:P,value:G,dirty:Ne,expanded:Le,id:to,popupOpen:K,focused:q,focusedTag:ao,anchorEl:ge,setAnchorEl:ro,inputValue:pe,groupedOptions:oe}=st(d({},u,{componentName:"Autocomplete"})),te=!de&&!re&&Ne&&!ke,be=(!le||ne===!0)&&ne!==!1,{onMouseDown:ve}=ce(),{ref:no}=De??{},Me=V(),{ref:Ke}=Me,lo=Ze(Me,kt),io=wo(Ke,no),Ee=xe||(r=>{var n;return(n=r.label)!=null?n:r}),j=d({},u,{disablePortal:ee,expanded:Le,focused:q,fullWidth:_,getOptionLabel:Ee,hasClearIcon:te,hasPopupIcon:be,inputFocused:ao===-1,popupOpen:K,size:fe}),R=St(j);let X;if(je&&G.length>0){const r=n=>d({className:R.tag,disabled:re},_e(n));We?X=We(G,r,j):X=G.map((n,f)=>l.jsx($t,d({label:Ee(n),size:fe},r({index:f}),Y)))}if(ie>-1&&Array.isArray(X)){const r=X.length-ie;!q&&r>0&&(X=X.splice(0,ie),X.push(l.jsx("span",{className:R.tag,children:Q(r)},X.length)))}const qe=He||(r=>l.jsxs("li",{children:[l.jsx(Mt,{className:R.groupLabel,ownerState:j,component:"div",children:r.group}),l.jsx(Et,{className:R.groupUl,ownerState:j,children:r.children})]},r.key)),co=s||((r,n)=>l.jsx("li",d({},r,{children:Ee(n)}))),Je=(r,n)=>{const f=P({option:r,index:n});return co(d({},f,{className:R.option}),r,{selected:f["aria-selected"],index:n,inputValue:pe},j)},Ce=(c=se.clearIndicator)!=null?c:Z.clearIndicator,Ae=(h=se.paper)!=null?h:Z.paper,a=(I=se.popper)!=null?I:Z.popper,t=(x=se.popupIndicator)!=null?x:Z.popupIndicator;return l.jsxs(C.Fragment,{children:[l.jsx(Lt,d({ref:i,className:J(R.root,w),ownerState:j},Se(Be),{children:N({id:to,disabled:re,fullWidth:!0,size:fe==="small"?"small":void 0,InputLabelProps:Ge(),InputProps:d({ref:ro,className:R.inputRoot,startAdornment:X,onClick:r=>{r.target===r.currentTarget&&ve(r)}},(te||be)&&{endAdornment:l.jsxs(At,{className:R.endAdornment,ownerState:j,children:[te?l.jsx(Tt,d({},Ue(),{"aria-label":A,title:A,ownerState:j},Ce,{className:J(R.clearIndicator,Ce==null?void 0:Ce.className),children:M})):null,be?l.jsx(Rt,d({},oo(),{disabled:re,"aria-label":K?U:F,title:K?U:F,ownerState:j},t,{className:J(R.popupIndicator,t==null?void 0:t.className),children:B})):null]})}),inputProps:d({className:R.input,disabled:re,readOnly:ke},ce())})})),ge?l.jsx(wt,d({as:eo,disablePortal:ee,style:{width:ge?ge.clientWidth:null},ownerState:j,role:"presentation",anchorEl:ge,open:K},a,{className:J(R.popper,a==null?void 0:a.className),children:l.jsxs(Dt,d({ownerState:j,as:Pe},Ae,{className:J(R.paper,Ae==null?void 0:Ae.className),children:[E&&oe.length===0?l.jsx(jt,{className:R.loading,ownerState:j,children:z}):null,oe.length===0&&!le&&!E?l.jsx(zt,{className:R.noOptions,ownerState:j,role:"presentation",onMouseDown:r=>{r.preventDefault()},children:ze}):null,oe.length>0?l.jsx(Nt,d({as:Xe,className:R.listbox,ownerState:j},lo,De,{ref:io,children:oe.map((r,n)=>Oe?qe({key:r.key,group:r.group,children:r.options.map((f,S)=>Je(f,r.index+S))}):Je(r,n))})):null]}))})):null]})}),Vt=Ft,Ht=["Whiteboard Templates By Industry Leaders","Tesla Cybertruck-inspired camper trailer for Tesla fans who can’t just wait for the truck!","Designify Agency Landing Page Design","✨What is Done is Done ✨","Fresh Prince","Six Socks Studio","vincenzo de cotiis’ crossing over showcases a research on contamination","Simple, Great Looking Animations in Your Project | Video Tutorial","40 Free Serif Fonts for Digital Designers","Examining the Evolution of the Typical Web Design Client","Katie Griffin loves making that homey art","The American Dream retold through mid-century railroad graphics","Illustration System Design","CarZio-Delivery Driver App SignIn/SignUp","How to create a client-serverless Jamstack app using Netlify, Gatsby and Fauna","Tylko Organise effortlessly -3D & Motion Design","RAYO ?? A expanded visual arts festival identity","Anthony Burrill and Wired mag’s Andrew Diprose discuss how they made January’s Change Everything cover","Inside the Mind of Samuel Day","Portfolio Review: Is This Portfolio Too Creative?","Akkers van Margraten","Gradient Ticket icon","Here’s a Dyson motorcycle concept that doesn’t ‘suck’!","How to Animate a SVG with border-image"],Ro=[...Array(23)].map((e,o)=>({id:$e.string.uuid(),cover:`/assets/images/covers/cover_${o+1}.jpg`,title:Ht[o+1],createdAt:$e.date.past(),view:$e.number.int(99999),comment:$e.number.int(99999),share:$e.number.int(99999),favorite:$e.number.int(99999),author:{name:$e.person.fullName(),avatarUrl:`/assets/images/avatars/avatar_${o+1}.jpg`}}));function Fo({post:e,index:o}){const{cover:i,title:c,view:h,comment:I,share:x,author:u,createdAt:O}=e,m=o===0,y=o===1||o===2,k=l.jsx(qo,{alt:u.name,src:u.avatarUrl,sx:{zIndex:9,width:32,height:32,position:"absolute",left:A=>A.spacing(3),bottom:A=>A.spacing(-2),...(m||y)&&{zIndex:9,top:24,left:24,width:40,height:40}}}),Y=l.jsx(Yo,{color:"inherit",variant:"subtitle2",underline:"hover",sx:{height:44,overflow:"hidden",WebkitLineClamp:2,display:"-webkit-box",WebkitBoxOrient:"vertical",...m&&{typography:"h5",height:60},...(m||y)&&{color:"common.white"}},children:c}),w=l.jsx(Qe,{direction:"row",flexWrap:"wrap",spacing:1.5,justifyContent:"flex-end",sx:{mt:3,color:"text.disabled"},children:[{number:I,icon:"eva:message-circle-fill"},{number:h,icon:"eva:eye-fill"},{number:x,icon:"eva:share-fill"}].map((A,U)=>l.jsxs(Qe,{direction:"row",sx:{...(m||y)&&{opacity:.48,color:"common.white"}},children:[l.jsx(Co,{width:16,icon:A.icon,sx:{mr:.5}}),l.jsx(bo,{variant:"caption",children:tt(A.number)})]},U))}),M=l.jsx(fo,{component:"img",alt:c,src:i,sx:{top:0,width:1,height:1,objectFit:"cover",position:"absolute"}}),ue=l.jsx(bo,{variant:"caption",component:"div",sx:{mb:2,color:"text.disabled",...(m||y)&&{opacity:.48,color:"common.white"}},children:at(O)}),he=l.jsx(Zo,{color:"paper",src:"/assets/icons/shape-avatar.svg",sx:{width:80,height:36,zIndex:9,bottom:-15,position:"absolute",color:"background.paper",...(m||y)&&{display:"none"}}});return l.jsx(Mo,{xs:12,sm:m?12:6,md:m?6:3,children:l.jsxs(Jo,{children:[l.jsxs(fo,{sx:{position:"relative",pt:"calc(100% * 3 / 4)",...(m||y)&&{pt:"calc(100% * 4 / 3)","&:after":{top:0,content:"''",width:"100%",height:"100%",position:"absolute",bgcolor:A=>H(A.palette.grey[900],.72)}},...m&&{pt:{xs:"calc(100% * 4 / 3)",sm:"calc(100% * 3 / 4.66)"}}},children:[he,k,M]}),l.jsxs(fo,{sx:{p:A=>A.spacing(4,3,3,3),...(m||y)&&{width:1,bottom:0,position:"absolute"}},children:[ue,Y,w]})]})})}Fo.propTypes={post:Fe.object.isRequired,index:Fe.number};Vo.propTypes={options:Fe.array,onSort:Fe.func};function Vo({options:e,onSort:o}){return l.jsx(No,{select:!0,size:"small",value:"latest",onChange:o,children:e.map(i=>l.jsx(Qo,{value:i.value,children:i.label},i.value))})}Ho.propTypes={posts:Fe.array.isRequired};function Ho({posts:e}){return l.jsx(Vt,{sx:{width:280},autoHighlight:!0,popupIcon:null,slotProps:{paper:{sx:{width:320,[`& .${p.option}`]:{typography:"body2"}}}},options:e,getOptionLabel:o=>o.title,isOptionEqualToValue:(o,i)=>o.id===i.id,renderInput:o=>l.jsx(No,{...o,placeholder:"Search post...",InputProps:{...o.InputProps,startAdornment:l.jsx(Xo,{position:"start",children:l.jsx(Co,{icon:"eva:search-fill",sx:{ml:1,width:20,height:20,color:"text.disabled"}})})}})})}function Wt(){return l.jsxs(rt,{children:[l.jsxs(Qe,{direction:"row",alignItems:"center",justifyContent:"space-between",mb:5,children:[l.jsx(bo,{variant:"h4",children:"Blog"}),l.jsx(et,{variant:"contained",color:"inherit",startIcon:l.jsx(Co,{icon:"eva:plus-fill"}),children:"New Post"})]}),l.jsxs(Qe,{mb:5,direction:"row",alignItems:"center",justifyContent:"space-between",children:[l.jsx(Ho,{posts:Ro}),l.jsx(Vo,{options:[{value:"latest",label:"Latest"},{value:"popular",label:"Popular"},{value:"oldest",label:"Oldest"}]})]}),l.jsx(Mo,{container:!0,spacing:3,children:Ro.map((e,o)=>l.jsx(Fo,{post:e,index:o},e.id))})]})}function Kt(){return l.jsxs(l.Fragment,{children:[l.jsx(ot,{children:l.jsx("title",{children:" Blog | Minimal UI "})}),l.jsx(Wt,{})]})}export{Kt as default};