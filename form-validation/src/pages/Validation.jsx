import { useState } from "react"

export default function Validation(){
    const [formData, setFormData] = useState({
        personalInfo:{
            name:"",
            email:"",
            phone:""
        },
        address:{
            country:"",
            city:""
        }
    });
     
    const [submit, setSubmit] = useState([]);
    const [errMsg, setErrMsg] = useState({});

    const validateFirst = () =>{
        
        const err ={};
        const {name, email, phone} = formData.personalInfo;

        if(!name){
            err.name = "Name Required";
        }
        if(name && name[0]!== name[0].toUpperCase()){
            err.name = "Name should start with uppercase";
        }
        if(!email){
            err.email = "Email required";
        }
        if(email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            err.email = "invalid email";
        }

        setErrMsg(err);
        return Object.keys(err).length === 0;
    };

    const validateSecond = () =>{
        const err ={};

        const {country, city} = formData.address;

        if(!country){
            err.country = "Country name rquired";
        }
        if(!city){
            err.city = "City name required";
        }
        setErrMsg(err);
        return Object.keys(err).length===0;

    };  

    // WE ARE NOT USEING ELSE IF() CAUSE IF THE FIRST IF  CONDITION FAILS IT WILL ALSO NOT WORK
 

    const handleSumit = () =>{
        const isFirstValid = validateFirst();
        const isSecondValid = validateSecond();
        // we can also write if(validateFirst() && validateSecond()){ argument }

        const finalData = {
            id: Date.now(),
            name: formData.personalInfo.name,
            email: formData.personalInfo.email,
            phone: formData.personalInfo.phone,
            country:formData.personalInfo.country,
            city: formData.personalInfo.city,
        } 

        if(isFirstValid && isSecondValid){
            setSubmit((prev)=>[...prev, finalData]);
        }

        // if(isFirstValid && isSecondValid){
        //     setSubmit((prev)=> [...prev , formData])
        // }
    };

    

return
}
