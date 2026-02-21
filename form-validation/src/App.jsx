import { useState, useEffect} from "react";
import Form from "./components/Form";
import "./App.css"
function App(){
    const [formData, setFormData] = useState({
        presonal:{
            fullName:"",
            emailId:"",
            phoneNum:""
        },
        addressInfo:{
            country:"",
            city:"",
            zipCode:""
        },
        passwordAuth:{
            password:"",
            cnfPassword:""
        }
    });
    
    const[error, setError] = useState({});

    const validateStepOne = () =>{
        const err={};

        const{fullName, emailId, phone} = formData.presonal;
        
        if(!fullName) err.fullName = "Name should not be blank";
        if(!emailId || !emailId.includes("@")) err.emailId ="email reruired and must inclued @";
         
    };  
}
export default App;