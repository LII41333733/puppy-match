import React from "react";



function Cards(props) {

    return (
      <div className="col-3 p-0 text-center mt-3">
       <img onClick={() => { props.flipCard(props.id);}} src={props.url} style={props.styles} alt="Dog"  />
      </div>
     );
  
}

export default Cards;

