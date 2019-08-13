import React from 'react';

const DeleteProduct = (props) => {
    return (
        <div>
            <input onChange={props.changed} type="text"/>
            <button onClick={props.deletes}>Delete</button>
            <p>{props.text}</p>
        </div>
    )
}

export default DeleteProduct