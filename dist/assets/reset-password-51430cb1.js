import{r as b,x as S,as as k,y as P,D as v,j as e,M as R,p as s,m as C,z as L,ar as c,v as W,w as q,b3 as E,E as F}from"./index-74ce70f5.js";const H={password:""},I=W().shape({password:q().required()});function T(){const[l,a]=b.useState(!1),{alertSeverity:i,handleSnackbarClose:u,snackbarActions:o,snackbarMessage:d,snackbarOpen:p}=S(),{push:m}=k();function h(){return new URLSearchParams(E().search)}const t=h(),{control:x,handleSubmit:w,formState:{errors:r},reset:f}=P({defaultValues:{...H},resolver:v(I)}),g=async j=>{a(!0);try{await F().postRequest("user/reset-password",{email:t.get("email"),token:t.get("token"),password:j.password}),a(!1),o("password updated","success",!0),f()}catch(n){a(!1),o(n==null?void 0:n.message,"error",!0)}},y=()=>{m("/landing-page")};return e.jsxs(e.Fragment,{children:[e.jsx(R,{alertSeverity:i,handleSnackbarClose:u,snackbarMessage:d,snackbarOpen:p}),e.jsx(s,{sx:{display:"flex",justifyContent:"center",alignItems:"center",minHeight:"100vh"},children:e.jsxs(s,{component:"form",onSubmit:w(g),children:[e.jsxs(C,{component:"p",sx:{my:"1em"},children:["Welcome ",t.get("email")]}),e.jsx(L,{name:"password",type:"password",control:x,fullWidth:!0,error:r.password,helperText:r.password?r.password.message:"",label:"Password"}),e.jsx(s,{sx:{display:"flex",justifyContent:"center",alignItems:"center",my:"2em"},children:e.jsx(c,{variant:"contained",type:"submit",loading:l,fullWidth:!0,children:"New Password"})}),e.jsx(s,{children:e.jsx(c,{variant:"contained",type:"button",onClick:y,fullWidth:!0,children:"Home Page"})})]})})]})}export{T as default};