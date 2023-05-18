import React from "react";

function NYT({title,author, publishDate, category}){
    
    return (
        <div>
            <h2>{title}</h2>
            <h2>{author}</h2>
            <h2>Date: {publishDate}</h2>
            <h2> Category: {category}</h2>
        </div>
    )
}

export default NYT;