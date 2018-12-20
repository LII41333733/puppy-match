import React, { Component } from 'react';
import { getRandomDog, get6RandomDogs } from '../../Utils/API';
import Cards from "../Cards";





class Discover extends Component {

  constructor(props) {
    super(props);
    
    
    this.state = {
      dogPhoto: "",
      dogMatchCount: 0,
      dogArray: [],
      isCardOneClicked: false,
      cardOne: {},
      cardTwo: {}
    }
    this.removeFriend = this.removeFriend.bind(this);
  }



  componentDidMount() {
    this.getDogPicture();
    this.getDogs();
  }
  getDogPicture = () => {
    getRandomDog().then(({ data }) => {
      // console.log(data);
      this.setState({ dogPhoto: data.message })
    }).catch(err => console.log(err));
  }

  getDogs = () => {
    get6RandomDogs().then(({ data }) => {

      const shuffle = array => {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
      }

      const dogsArray = [];
      const dogsArrayCopy = [];

      data.forEach((dog, i) => {
        dogsArray.push({
          url: dog.url,
          id: i
        })
        dogsArrayCopy.push({
          url: dog.url,
          id: i
        })
      })

      const fullDogArray = dogsArray.concat(dogsArrayCopy)
          
      
      let fullerDogArray = fullDogArray.map((pup, i) => {
        pup.key = i
        return pup;
      })
  
      fullerDogArray = shuffle(fullerDogArray);

      this.setState({
        dogArray: fullerDogArray
      })

      console.log(this.state.dogArray)
    }).catch(err => console.log(err))
  }

  removeFriend = id => {
    console.log(this.props)
    // Filter this.state.friends for friends with an id not equal to the id being removed
    const dogArray = this.state.dogArray.filter(friend => friend.id !== id);
    // Set this.state.friends equal to the new friends array
    this.setState({ dogArray });
  };

  handleUpvote = () => {
    const randomNumber = Math.floor(Math.random() * 3) + 1;
    if (randomNumber === 2) {
      // you match with a dog
      this.setState({
        dogMatchCount: this.state.dogMatchCount + 1
      }, () => this.getDogPicture());
    } else {
      this.getDogPicture();
    }
  }
  handleDownvote = () => {
    this.getDogPicture();
  }

  render() {
    return (
      <div className="container">
        <h1>Dog Match!</h1>
        <div className="row">
          {this.state.dogArray.map((pup, i) =>
            <Cards 
              key={pup.key} 
              url={pup.url} 
              removeFriend={this.removeFriend}/>
          )}
        </div>
      </div>
    );
  }
}
export default Discover;


// const randomArray = [
//   {
//     key: 1,
//     id: 1,
//     url: 'www.nfl.com'
//   },
//   {
//     key: 2,
//     id: 1,
//     url: 'www.espn.com'
//   },
//   {
//     key: 3,
//     id: 2,
//     url: 'www.yahoo.com'
//   }
// ]

// id/url > key > random 


//variables:




//functions:
// flipCard()
// compareTwoCards()
// removeCards()
// checkGameOver()



//when a card is clicked
  // set $isCardOneClicked to true
  // $cardOne = this
  // flipCard()
//when a second card is clicked
  // if $isCardOneClicked is true
    //cardTwo = this
    //flipCard()
    //compareTwoCards()
      //if id $cardOne !== id CardTwo
        // flipCards()
      //else
        //removeCards ()
          // if Card.length = 0
            // console.log("Game Over")