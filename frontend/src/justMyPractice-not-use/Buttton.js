function Button(){
    const handleClick = () => console.log("OUCH");
    const handleClick2 =(name)=> console.log(`${name} stop clicking me`)

    let count  =0;
    const handleCount = (name) =>{
        if(count<3){
            count ++;
            console.log(`${name} you click me ${count} time`)
        }else{
            console.log(`${name} stop clicking me `)
        }  
    }
    return (<button className="button" onClick={()=>handleCount("Bro")}> Click me </button>)
}
export default Button;