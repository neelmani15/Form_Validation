import { useState,useEffect } from "react";
import Card from "../UI/Card";
import "./Form.css";
import validator from 'validator';
import isAlpha from "validator/lib/isAlpha";

function Form(props) {
//   const [enterName, setName] = useState("");
//   const [enterEmail, setEmail] = useState("");
//   const [enterPhone, setPhone] = useState("");
//   const [enterDob, setDob] = useState("");
//   let inc = 12;
  const arr = {name:"",email:"",phone:"",dob:""};
  const [formValues,setFormValues]=useState(arr);
  const [formError,setFormError]=useState({});
  const [isSubmit,setIsSubmit]=useState(false);
  const [isError,setError]=useState(false);
  const [items,setItems]=useState([]);
//   const [nameError, setnameError] = useState('')
//   const [emailError, setEmailError] = useState('')
//   const [phoneError, setphoneError] = useState('')
//   const [dobError, setdobError] = useState('')
  
  
  const handle = (event) => {
    // inc++;
    // const arr = [
    //   {
    //     name: enterName,
    //     email: enterEmail,
    //     phone: enterPhone,
    //     dob: enterDob,
    //   },
    // ];
    const {name,value} = event.target;
    setFormValues({ ...formValues,[name]:value});
    // console.log(formValues);

    // const {email,value} = event.target;
    // setFormValues({ ...formValues,[email]:value});

    // const {email,value} = event.target;
    // setFormValues({ ...formValues,[email]:value});

    // const {email,value} = event.target;
    // setFormValues({ ...formValues,[email]:value});
    // localStorage.setItem(enterEmail.toString(), JSON.stringify(arr));
    // localStorage.setItem('Name',enterName);
    // localStorage.setItem('Email',enterEmail);
    // localStorage.setItem('Phone No',enterPhone);
    // localStorage.setItem('DOB',enterDob);
  };
//   const validateName=(event)=>{
//       var enterName=event.target.value;
//   };

//   const namechangeHandler = (event) => {
//       setName(event.target.value);
//       console.log(event.target.value);
//   };
//   const emailchangeHandler = (event) => {
//     setEmail(event.target.value);
//     console.log(event.target.value);
//   };
//   const phonechangeHandler = (event) => {
//     setPhone(event.target.value);
//     console.log(event.target.value);
//   };
//   const dobchangeHandler = (event) => {
//     setDob(event.target.value);
//     console.log(event.target.value);
//   };


//   useEffect(()=>{
//     console.log(formError);
//     if(Object.keys(formError).length===0 && isSubmit){
//         console.log(formValues)
//     }
//   },[formError])
//   useEffect(()=>{
//       const items=JSON.parse(localStorage.getItem(formValues.email));
//       if(items===true && isError===true){
//           setItems(items);
//       }
//   },[]);

  const submitHandler = (event) => {
      event.preventDefault();
      setFormError(validate(formValues));
      setIsSubmit(true);
      if(isError===true){
      localStorage.setItem(formValues.email.toString(), JSON.stringify(formValues));
    //   setError(true);
      }
  };

  useEffect(()=>{
    console.log(formError);
    if(Object.keys(formError).length === 0 && isSubmit){
        console.log(formValues)
    }
  },[formError]);

  const validate=(values)=>{
    const errors={};
    const regex=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    let nameerr=false,emailerr=false,phoneerr=false;
    if(!values.name){
        errors.name="Name feild is required";
        setError(false);
        nameerr=false;
    }
    else if (!isAlpha(values.name)){
        errors.name="Please enter alphabet only";
        setError(false);
        nameerr=false;
    }
    else if (!validator.isLength(values.name,{min:3})){
        errors.name="Length of name is too short";
        setError(false);
        nameerr=false;
    }
    else if (!validator.isLength(values.name,{max:20})){
        errors.name="Length of name is too large";
        setError(false);
        nameerr=false;
    }
    else
    {
        nameerr=true;
    }
   

    if(!values.email){
        errors.email="Email field is required";
        setError(false);
        emailerr=false;
    }
    else if(!regex.test(values.email)){
        errors.email="Email format is not correct";
        setError(false);
        emailerr=false;
    }
    // else if(values.email === formValues.email){
    //     errors.email="This email is already exist";
    //     setError(false);
    //     emailerr=false;
    // }
    else{
        emailerr=true;
    }

    if(!(values.phone.length === 0 || values.phone.length === 10)){
        errors.phone="Phone number is not valid";
        setError(false);
        phoneerr=false;
    }
    else{
        phoneerr=true;
    }
    if(phoneerr===true && emailerr ===true && nameerr === true){
        setError(true);
    }
    return errors;
  }

  return (
    <div className="form-main">  
      <Card className="forms">
          {/* <pre>{JSON.stringify(formValues,undefined,2)}</pre> */}
        <form className="from-content" onSubmit={submitHandler}>
          <div className="detail-form">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
            //   pattern=".{3,20}"
              value={formValues.name}
              onChange={handle}
            ></input>
          </div>
          <p className="para">{formError.name}</p>
          <div className="detail-form">
            <label htmlFor="email">Email</label>
            <input
              type="text"
            //   required
              id="email"
              name="email"
              value={ formValues.email }
              onChange={handle}
            ></input>
          </div>
          <p className="para" htmlFor="email">{formError.email}</p>
          <div className="detail-form">
            <label htmlFor="phone">Phone no</label>
            <input
              type="number"
              id="phone"
              name="phone"
              value={ formValues.phone }
              onChange={handle}
            ></input>
          </div>
          <p className="para" htmlFor="phone">{formError.phone}</p>
          <div className="detail-form">
            <label htmlFor="dob">DOB</label>
            <input
              type="date"
            //   required
              id="dob"
              name="dob"
              max='2003-12-31'
              value={ formValues.dob }
              onChange={handle}
            ></input>
          </div>
          <p className="para">{formError.dob}</p>
          <div className="submit-button">
            <button type="submit">Submit</button>
          </div>
        </form>
      </Card>
      <ul>
          {Object.entries(localStorage).map(([key,value])=>{
              const val=JSON.parse(value);
              return (<li>{val.email}</li>);
})}
      </ul>
    </div>
  );
}
export default Form;
