import React, { Component } from 'react';
import { get6RandomDogs } from '../../Utils/API';
import Cards from "../Cards";

class Discover extends Component {
  state = {
    dogPhoto: "",
    dogMatchCount: 0,
    dogArray: [],
    isCardOneClicked: false,
    bothCardsFlipped: false,
    cardOne: -1,
    cardTwo: -1,
    hiddenIDs: [2, 3, 5]
  }
  componentDidMount() {
    this.getDogs();
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
          id: i,
          active: true,
          isPicked: false
        })
        dogsArrayCopy.push({
          url: dog.url,
          id: i,
          active: true
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


  flipCard = (id) => {
    console.log(id)
    if (this.state.bothCardsFlipped) {
      console.log("ended")
      return false;

      //reset
    } else {
      if (!this.state.isCardOneClicked) {
        this.setState({
          cardOne: id,
          isCardOneClicked: true,
        }, () => {
          console.log("Card One Flipped")
        })
      } else {
        this.setState({
          cardTwo: id,
          bothCardsFlipped: true
        }, () => {
          console.log("Second card flipped!")
          if (this.state.cardOne === this.state.cardTwo) {


            this.state.hiddenIDs.push(id)


          } else {
            this.setState({
              cardOne: -1,
              cardTwo: -1,
              bothCardsFlipped: false,
              isCardOneClicked: false
            }, () => {
              console.log("Try Again!")
            })
          }
        })
      }
    }
  }

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
  checkStatus = () => {

  }

  render() {

    // const {dogArray: dogList, searchTerm} = this.state
    // console.log(dogList)
    // console.log(this.props)

    return (
      <div className="container">
        <h1>Dog Match!</h1>
        <div className="row">
          {this.state.dogArray.map(pup => {

            return(
            <Cards id={pup.id} key={pup.key} url={pup.url} flipCard={()=> this.flipCard(pup.id)}/>
            )
          })}
        </div>
      </div>
    );
  }
}
export default Discover;

//functions:
// flipCard()
// compareTwoCards()
// removeCards()
// checkGameOver()



  // getDogPicture = () => {
  //   getRandomDog().then(({ data }) => {
  //     // console.log(data);
  //     this.setState({ dogPhoto: data.message })
  //   }).catch(err => console.log(err));
  // }