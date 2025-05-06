import { useState } from "react";

function OnChange(){



   // const fruit =["apple" , "banana" , "grape"];
    const [fruit , setFruit] = useState(["apple" , "banana" , "grape"]);
    // let listFruit = fruit.map(fruit => <li> {fruit}</li>)
    function addFruit(e){
        let newFruit = document.getElementById("input").value;
        document.getElementById("input").value ="";

        setFruit( [...fruit, newFruit])
    }

    return(
        <div>
           <h1>List fo Fruit I like</h1>
           <ul>
          {fruit.map((fruit,index) => <li key={index}> {fruit}</li>)} 
           </ul>
            <input type="text" placeholder="Enter your food name" id="input"/>
            <button onClick={addFruit} >Add fruit</button>
        </div>
    )
}
export default OnChange;
// const [car , setCar] = useState( {
//     year : "2022" , model : "Iphone13" , make : "Apple"
// })

// function handleYearChange (e) {
//     setCar(car => ({...car ,year: e.target.value }))
// }
// function handModel(e){
//     setCar(car => ({...car , model :e.target.value }))
// }
// <h1> My favorite Phone is</h1>
// <p> model : {car.model}</p>
// <p> brand : {car.make} </p>
// <p> year : {car.year}</p>

// <input type="text" value={car.model} onChange={handModel} />
// <input type="number" value={car.year} onChange={handleYearChange} />