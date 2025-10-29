
function Articles(props){
    return (
        <div>
            <img src={props.image} alt="Book" />
            <h3>{props.title}</h3>
            <p>{props.description}</p>
            <p>Author: {props.author}</p>

           
        </div>
        
    )
}
export default Articles;