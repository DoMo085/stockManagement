import { useEffect, useState } from "react";
export default function MyPage(){

    const [count,setCount] =useState(0);

    useEffect(() => {
        document.title = `Count : ${count}`;
    })
    function addCount(){
        setCount(c => c+1)
    }
    return(<>
    <p>Count {count}</p>
        <button onClick={addCount}>Add</button>
    </>)
}