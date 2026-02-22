import { useState } from "react"
import Form from "../components/Form";
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
    
    const [page, setPage] = useState(1);

    const handleNext = () =>{
        const err1 = validateFirst();
        const err2 = validateSecond();

        const allError = {...err1, ...err2};

        if(Object.keys(allError).length ===0){
            setPage((prev)=>prev+1);
        }
    };

    const handleBack = () =>{
        if(page>1){
            setPage((prev)=>prev-1);
        }
    };

    const totalPages = 3;

    
    const handleChange =(section,field, value)=>{
        setFormData(prev=>({
            ...prev,
            [section]:{
                ...prev[section] , [field]:value
            }
        }))
    };

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

        // setErrMsg(err);
        // return Object.keys(err).length === 0;
        return err;
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
        // setErrMsg(err);
        // return Object.keys(err).length===0;
        return err;

    };  

    // WE ARE NOT USEING ELSE IF() CAUSE IF THE FIRST IF  CONDITION FAILS IT WILL ALSO NOT WORK
 

    const handleSumit = (e) =>{
        e.preventDefault();

        // const isFirstValid = validateFirst();
        // const isSecondValid = validateSecond();
        // we can also write if(validateFirst() && validateSecond()){ argument }
        const errors = validateSecond();
        setErrMsg(errors);
        const finalData = {
            id: Date.now(),
            name: formData.personalInfo.name,
            email: formData.personalInfo.email,
            phone: formData.personalInfo.phone,
            country:formData.address.country,
            city: formData.address.city,
        } 

        if(Object.keys(errors).length===0){
            setSubmit((prev)=>[...prev, finalData]);
        }

        // if(isFirstValid && isSecondValid){
        //     setSubmit((prev)=> [...prev , formData])
        // }
    };

    const firstForm =[
        {name:"Name*",
            type:"text", 
            values:formData.personalInfo.name ,
            onChange:(value)=>handleChange("personalInfo", "name", value) , 
            placeholder:"Name..." },
        {name:"Email*:",
            type:"text",
            values:formData.personalInfo.email ,
            onChange:(value)=>handleChange("personalInfo", "email", value), 
            placeholder:"Email@..." },
        {name:"Phone:",
            type:"text", 
            values:formData.personalInfo.phone ,
            onChange:(value)=>handleChange("personalInfo", "phone", value), 
            placeholder:"contact..." },
    ];

    const secondForm = [
        {name:"Country*:",
            type:"text",
            values:formData.personalInfo.country ,
            onChange:(value)=>handleChange("personalInfo", "country", value), 
            placeholder:"Country..." },
        {name:"City*",
            type:"text", 
            values:formData.personalInfo.city ,
            onChange:(value)=>handleChange("personalInfo", "city", value) , 
            placeholder:"City..." },
        
    ];
 
    return(
        <div className="form-validation">
            {page ===1 &&(
                <>
                <Form data={firstForm}/>
                <br />
                <button onClick={handleBack}>BACK</button>
                <p>{page} of {totalPages}</p>
                <button onClick={handleNext}>NEXT</button>
                </>
            )}
            {page ===2 &&(
                <>
                <Form data={secondForm} />
                <br />                
                <button onClick={handleBack}>BACK</button>
                <p>{page} of {totalPages}</p>
                <button onClick={handleNext}>NEXT</button>
                </>
            )}
        </div>
    )

    
}
