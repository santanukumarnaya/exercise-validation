function Form({data}){
    
    return(
        <div className="Form-page">
            <form>
                {data.map((inputs)=>(
                    <div key={inputs.id}>
                        <label>{inputs.name}</label>
                        <br />
                        <input type={inputs.type} value={inputs.values} 
                        onChange={(e)=>inputs.onChange(e.target.value)} 
                        placeholder={inputs.placeHolder}/>
                    </div>
                ))}
            </form>

            
        </div>
    )
}
export default Form;