import React from 'react';
import TextField from '@material-ui/core/TextField';
import swal from 'sweetalert2';
import './App.css';
import { Button } from '@material-ui/core';

function App() {
  const [disabled, setDisabled] = React.useState(false);
  const [fields, setFields] = React.useState({
    Url:"",
    Email:""
  })


  const validateEmail =(email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const handleChange = input => ({ target: { value } }) => {
  setFields({
    ...fields,
    [input]: value
  });
}
  const submitForm = () =>{
    setDisabled(true)
    if(!validateEmail(fields.Email)){
      setDisabled(false)
      swal.fire({
        titleText: "Message!",
        text: "Invalid Email!",
        icon: "error",
        showConfirmButton: true,
      });
      return;
    }
    const payload = {
      ...fields
    }
    fetch('https://localhost:5001/api/Processor/csvfile', {
    method: 'post',
    body: JSON.stringify(payload)
  }).then(function(response) {
    console.log("response;",  response.json());
    setDisabled(false);
    swal.fire({
      titleText: "Success!",
      text: "All Good!",
      icon: "success",
      showConfirmButton: true,
    });
    
  })
  .catch((err)=>{
    setDisabled(false);
    swal.fire({
      titleText: "Sorry!",
      text: "Something Bad Happened",
      icon: "error",
      showConfirmButton: true,
    });
  })
  }

  return (
    <div className="App">
      <div>
      <TextField id="outlined-basic"name="Url" value={fields.Url}onChange={handleChange("Url")} style={{width:"400px", margin:"1rem"}} label="Url" variant="outlined" />

      <br />
      <TextField id="outlined-basic" name="Email" multiline
        rows="4" label="Email" value={fields.Email} onChange={handleChange("Email")} variant="outlined" />

      <br/>
      <Button variant="contained"disabled={disabled} onClick={submitForm} style={{ margin:"1rem"}} color="primary">
        Submit
      </Button>
      </div>
    </div>
  );
}

export default App;
