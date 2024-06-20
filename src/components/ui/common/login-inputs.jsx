// import * as React from 'react';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import InputLabel from '@mui/material/InputLabel';
// import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from "@mui/icons-material/Lock";

export default function InputWithIcon(props) {
  const customUsernameStyle = {
    padding: ".5em 1em",
    color: "black",
    borderBottom: props.usernameError ? "1.5px solid red" : "1.5px solid grey",
    gap : "10px",
    fontFamily : "Tajawal",
    fontSize : "14px",
    accentColor: "black",
    "& .MuiOutlinedInputInput:focused": {
      borderBottomColor: "black",
    },
  };
  const customPasswordStyle = {
    padding: ".5em 1em",
    color: "black",
    borderBottom: props.passwordError ? "1.5px solid red" : "1.5px solid grey",
    gap : "10px",
    fontFamily : "Tajawal",
    fontSize : "14px",
    accentColor: "black",
    "& .MuiOutlinedInputInput:focused": {
      borderBottomColor: "black",
    },
  };



  return (
    <div className="flex flex-col gap-6">
      <FormControl variant="standard">
        <Input
          id="input-with-icon-adornment"
          color="secondary"
          style={customUsernameStyle}
          placeholder={props.usernameLabel}
          onChange={e => props.setUsername(e.target.value)}
          value={props.username}
          startAdornment={
            <InputAdornment
              position="start"
              className=""
              style={{ color: props.usernameError ? "red" : "#8D8C92", accentColor: "grey" }}>
              <PersonIcon />
            </InputAdornment>
          }
        />
        <p className="text-redColor text-xs pt-1 text-center">{props.usernameError}</p>
      </FormControl>
      <FormControl variant="standard">
        <Input
          id="input-with-icon-adornment-password"
          color="secondary"
          style={customPasswordStyle}
          type="password"
          placeholder={props.passwordLabel}
          value={props.password}
          onChange={e => props.setPassword(e.target.value)}
          startAdornment={
            <InputAdornment
              position="start"
              style={{ color: props.passwordError ? "red" : "#8D8C92", accentColor: "black" }}>
              <LockIcon />
            </InputAdornment>
          }
        />
        <p className="text-redColor text-xs pt-1 text-center">{props.passwordError}</p>
      </FormControl>
    </div>
  );
}
