import PropTypes from "prop-types"
function List(props){
    const listItem = props.item;
    const category = props.category;
    const arrayListItem = listItem.map(
        listItem => <li key={listItem.id}> {listItem.name}</li>)
    return (<div className="card">
        <h3 className="category">{category}</h3>
        <ol className="item">{arrayListItem}</ol></div>)
}
const fruit = [];


  const vegetable = [
    {id:1,name:"salad" , calories : 41},
    {id:2,name:"carrot" , calories : 22},
    {id:3,name:"corn" , calories : 45}];

// List.defaultProps={
//     category : "category to sell",
//     item : [],
// }
// List.PropTypes={
//     category : PropTypes.string,
//     item: PropTypes.arrayOf
//     (PropTypes.shape({
//         id : PropTypes.number ,
//         name : PropTypes.string,
//         calories : PropTypes.number
//     }))
// }
// const lowCal = fruit.filter(fruit=> fruit.calories<115)

//     const lstFruit = lowCal.map((lowCal) =>
//             <li key={lowCal.id}>
//                 {lowCal.name}:  
//             <b> {lowCal.calories} </b>
//     </li>);
    // const lstFruit = fruit.map((fruit) =>
    //     <li key={fruit.id}>
    //         {fruit.name}:  
    //     <b> {fruit.calories} </b>
    //     </li>);
   // fruit.sort();
    // fruit.sort((a,b)=>a.name.localeCompare(b.name)) ;
    // fruit.sort((a,b)=> a.calories-b.calories);
    //fruit.sort((a,b)=> b.calories-a.calories)
export default List;