import React from "react";

const styles = {
 dogImage: {
   height: "150px",
   maxWidth: "150px",
   cursor: "pointer"
 }
}

function Cards(props) {
 return (
  <div className="col-3 p-0 text-center mt-3">
   <img src={props.url} alt="Dog" style={styles.dogImage} />
  </div>
 );
}

export default Cards;

