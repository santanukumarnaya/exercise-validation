export default function FormErrorHandling({data, error}){
    return(
        <form>
          {data.map((inputs, index) => (
            <div key={index}>
              <label>{inputs.name}</label>
              <input
                type={inputs.type}
                value={inputs.value}
                onChange={(e) => inputs.onChange(e.target.value)}
                placeholder={inputs.placeholder}
              />
              {error && error[inputs.key]&&(
                <p style={{color:"red"}}>{error[inputs.key]}</p>
              )}
            </div>
          ))}
        </form>
    )
}