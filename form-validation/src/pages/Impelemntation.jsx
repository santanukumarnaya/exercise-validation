import { useReducer } from "react"
const initialState = 0;

const countReducer =(state, action)=>{
    switch(action){
        case "increment":
            return state+1;
        case "decrement":
            if(state ===0){
                return state;
            }else{
                return state-1;
            }
            // or we can write (state>0 ? state-1 : state)
        case "reset":
            return initialState;
        default:
            return state;
    };
};
export default function Implementation(){
    const [count, dispatch]=useReducer(countReducer, initialState);
return(
    <div>
        <h2>Count:{count}</h2>
        <button onClick={()=>dispatch("increment")}>Increment</button>
        <button onClick={()=>dispatch("decrement")}>Decrement</button>
        <button onClick={()=>dispatch("reset")}>Reset</button>
    </div>
)
}