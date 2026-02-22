import { useState } from "react"
import FormErrorHandling from "../components/FormErrorHandling";
export default function Validation(){
    const initialState = {
        personalInfo:{
            name:"",
            email:"",
            phone:""
        },
        address:{
            country:"",
            city:""
        },
        passwordValidate:{
            password:"",
            cnfrPassword:""
        }
    }
    const [formData, setFormData] = useState(initialState);
     
    const [submit, setSubmit] = useState([]);
    const [errMsg, setErrMsg] = useState({});
    
    const [page, setPage] = useState(1);

    const handleNext = () =>{
        let errNext ={};
        if(page===1) errNext =validateFirst();
        if(page ===2) errNext = validateSecond(); 

        if(Object.keys(errNext).length ===0){
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
 
    const validateThird = () =>{
        const err ={};
        const {password, cnfrPassword} = formData.passwordValidate;

        if(password.length<8 ){
            err.password = "password should be more than 8 chars";
        }
        if(cnfrPassword!==password){
            err.cnfrPassword ="not matching with the password";
        }
        return err;
    };


        const handleSubmit = (e) =>{
        e.preventDefault();

        // const isFirstValid = validateFirst();
        // const isSecondValid = validateSecond();
        // we can also write if(validateFirst() && validateSecond()){ argument }
        const errors = validateThird();
        setErrMsg(errors);
        const finalData = {
            id: Date.now(),
            name: formData.personalInfo.name,
            email: formData.personalInfo.email,
            phone: formData.personalInfo.phone,
            country:formData.address.country,
            city: formData.address.city,
            password: formData.passwordValidate.password
        } 

        if(Object.keys(errors).length===0){
            setSubmit((prev)=>[...prev, finalData]);
            
            setErrMsg({});
            setFormData(initialState);
            setPage(1);
        }
        // if(isFirstValid && isSecondValid){
        //     setSubmit((prev)=> [...prev , formData])
        // }
        };

    const firstForm =[
        {name:"Name*",
            key:"name",
            type:"text", 
            value:formData.personalInfo.name ,
            onChange:(value)=>handleChange("personalInfo", "name", value) , 
            placeholder:"Name..." },
        {name:"Email*:",
            key:"email",
            type:"text",
            value:formData.personalInfo.email ,
            onChange:(value)=>handleChange("personalInfo", "email", value), 
            placeholder:"Email@..." },
        {name:"Phone:",
            key:"phone",
            type:"text", 
            value:formData.personalInfo.phone ,
            onChange:(value)=>handleChange("personalInfo", "phone", value), 
            placeholder:"contact..." },
    ];

    const secondForm = [
        {name:"Country*:",
            type:"text",
            key:"country",
            value:formData.address.country ,
            onChange:(value)=>handleChange("address", "country", value), 
            placeholder:"Country..." },
        {name:"City*",
            key:"city",
            type:"text", 
            value:formData.address.city ,
            onChange:(value)=>handleChange("address", "city", value) , 
            placeholder:"City..." },
    ];
 
    const thirdForm = 
        [
        {name:"Password*:",
            key:"password",
            type:"text",
            value:formData.passwordValidate.password ,
            onChange:(value)=>handleChange("passwordValidate", "password", value), 
            placeholder:"Password..." },
        {name:"Confirm Password*",
            key:"cnfrPassword",
            type:"text", 
            value:formData.passwordValidate.cnfrPassword ,
            onChange:(value)=>handleChange("passwordValidate", "cnfrPassword", value) , 
            placeholder:"Confirm Password..." },
    ];
    
    return(
        <div className="form-validation">
            {page ===1 &&(
                <>
                <FormErrorHandling data={firstForm} error={errMsg}/>
                <br />
                <button onClick={handleBack}>BACK</button>
                <p>{page} of {totalPages}</p>
                <button onClick={handleNext}>NEXT</button>
                </>
            )}
            {page ===2 &&(
                <>
                <FormErrorHandling data={secondForm} error={errMsg} />
                <br />                
                <button onClick={handleBack}>BACK</button>
                <p>{page} of {totalPages}</p>
                <button onClick={handleNext}>NEXT</button>
                </>
            )}
            {page===3 &&(
                <>
                <FormErrorHandling  data={thirdForm} error={errMsg}/>
                <br />
                <button onClick={handleBack}>BACK</button>
                <p>{page} of {totalPages}</p>
                <button onClick={handleSubmit}>SUBMIT</button>
                </>
            )}
        </div>
    )

    
}
