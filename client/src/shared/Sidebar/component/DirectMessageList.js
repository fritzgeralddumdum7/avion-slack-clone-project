import DirectMessageItem from './DirectMessageItem';
import './DirectMessageList.scoped.css'

function DirectMessageList ({ list }) {
    return (
        <ul>
            { 
                list.map((item, i) => {
                    return <DirectMessageItem 
                        key={i} 
                        item={item} 
                    /> 
                }) 
            }
        </ul>
    )
}

export default DirectMessageList;
