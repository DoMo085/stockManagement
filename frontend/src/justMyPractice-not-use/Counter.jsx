import React, {useState} from "react";
function Counter(){
    const [count, setCount] = useState(0);

    const increase = () =>{
        setCount(count +1 )
    }
    const decrease = () => {
        setCount(count - 1)
    }
    const reset = () => {
        setCount(0)
    }
    
    return (<div className="counter-container">
        <p className="count-display">{count}</p>
        <button className="counter-button" onClick={decrease}>Decrease</button>
        <button className="counter-button" onClick={reset}>Reset</button>
        <button className="counter-button" onClick={increase}>Increase</button>
    </div>)
}
export default Counter;