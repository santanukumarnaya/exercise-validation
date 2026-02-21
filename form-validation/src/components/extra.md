const [submit, setSubmit] = useState([]);

    

    const [page, setPage] = useState(1);

    const nextPage =()=>{
      if(page<3) setPage((prev)=>prev+1);
    };

    const backPage=()=>{
      if(page>0) setPage((prev)=>prev-1);
    };



    const handleSubmit =()=>{
        if(!nameInput||!emailInput||!phone||!country||!city||!zip||!password|| error||errMsg) return;

        setSubmit((prev)=>[...prev,{id:Date.now(), nameInput, emailInput, phone,country,city,zip,password}])


        setCnfrPassword("");
        setNameInput("");
        setEmailInput("");
        setPhone("");
        setCountry("");
        setCity("");
        setZip("");
        setPassword("");
        setPage(1);
    };
  console.log(submit);
    const handleFitrst =[
        {name:"Name", type:"text", placeHolder:"Enter Name", onChange:handleName, values:nameInput},
        {name:"Email", type:"email", placeHolder:"Enter Email", onChange : handleEmail, values:emailInput},
        {name:"Name", type:"number", placeHolder:"Enter Phone", onChange: handlePhone, values:phone},
                        
    ];
    const handleSecond =[
        {name:"Country", type:"text", placeHolder:"Country Name", onChange: handleCountry, values:country},
        {name:"City", type:"text", placeHolder:"City Name", onChange:handleCity, values:city},
        {name:"Zipcode", type:"number", placeHolder:"Zipcode", onChange:handleZipcode, values:zip}
    ];
    const handleThird =[
        {name:"Password", type:"text", placeHolder:"Password", onChange:handlePassword, values:password},
        {name:"Confirm Password", type:"text", placeHolder:"Confirm", onChange:handleCnfPassword, values:cnfrPassword},
    ];

    return(
        <>
        <div>
        {page===1 && (<div className="form_view">
            <Form data={handleFitrst}/>
            <br />
            <button onClick={backPage}>Back</button>
            {!error&&(<button onClick={nextPage}>Next</button>)}
            {error&& <p style={{color:"red"}}>{errMsg}</p> }

        </div>)}
        {page===2 && (<div className="form_view">
            <Form data={handleSecond}/>
            <br />
            <button onClick={backPage}>Back</button>
            {!error&&(<button onClick={nextPage}>Next</button>)}
            <br />
            {error&& <p style={{color:"red"}}>{errMsg}</p> }
        </div>)}
        {page===3 && (<div className="form_view">
            <Form data={handleThird}/>
            <br />
            <button onClick={backPage}>Back</button>
            <button onClick={()=>handleSubmit()}>SUBMIT</button>
            <br />
            {error&& <p style={{color:"red"}}>{errMsg}</p> }

            
        </div>)}
        </div>
        </>
    )