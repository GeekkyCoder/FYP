import{r as o,x as y,j as e,M as g,p,m as t,b7 as j,at as b,b4 as v,E as k}from"./index-d1c7a555.js";function V(){const[r,n]=o.useState(!1),[l,s]=o.useState(!1),{alertSeverity:u,handleSnackbarClose:m,snackbarActions:i,snackbarMessage:f,snackbarOpen:x}=y();function d(){return new URLSearchParams(v().search)}const c=d(),h=async()=>{s(!0);try{await k().postRequest("user/auth/verify-email",{email:c.get("email")}),s(!1),n(!0),i("account verified","success",!0)}catch(a){s(!1),n(!1),i(a==null?void 0:a.message,"error",!0)}};return e.jsxs(e.Fragment,{children:[e.jsx(g,{alertSeverity:u,handleSnackbarClose:m,snackbarMessage:f,snackbarOpen:x}),e.jsxs(p,{sx:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh"},children:[!r&&e.jsxs(e.Fragment,{children:[e.jsxs(t,{variant:"p",sx:{my:"1em"},children:["Hello ",c.get("email")]}),e.jsx(t,{component:"p",children:"Verify Your Account"})]}),r&&e.jsx(t,{variant:"subtitle2",sx:{my:"1em",color:j[700]},children:"Account Verified"}),e.jsx(b,{sx:{width:"300px",mt:"1em"},loading:l,onClick:h,variant:"contained",size:"large",children:"Verify Email"})]})]})}export{V as default};