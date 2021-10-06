import ListItem from "./component/ListItem";

import './List.scoped.css';

function List ({ customClass, list, removeItem }) {

    return (
       <ul>
             { list.map((item, index) =>{
                 return <ListItem key={index} item={item} customClass={customClass} removeItem={removeItem}/> })
             }
       </ul>
    )
}

export default List;
