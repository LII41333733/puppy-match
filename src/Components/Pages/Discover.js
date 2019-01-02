import React, { Component } from 'react';
import { get30RandomDogs } from '../../Utils/API';
import Cards from "../Cards";


class Discover extends Component {

  state = {
    dogPhoto: "",
    dogArray: [],
    cardOneID: -1,
    cardTwoID: -1,
    cardOneKey: -1,
    cardTwoKey: -1,
    hiddenIDs: [],
    message: "Pick a card!",
    round: 1
  }

  componentDidMount() {
    this.getDogs();
  }

  getDogs = () => {
    get30RandomDogs().then(({ data }) => {
      this.setState({
        dogData: data
      }, () => {
        this.setDogArrays();
      })
    }).catch(err => console.log(err))
  }
  

  setDogArrays = () => {

  

      let roundData = [];

      if (this.state.round === 1) {
        roundData = this.state.dogData.slice(0,6)
      }
      if (this.state.round === 2) {
        roundData = this.state.dogData.slice(6,12)
      }
      if (this.state.round === 3) {
        roundData = this.state.dogData.slice(12,18)
      }
      if (this.state.round === 4) {
        roundData = this.state.dogData.slice(18,24)
      }
      if (this.state.round === 5) {
        roundData = this.state.dogData.slice(24,30)
      }

      console.log(roundData)

      const dogsArray = [];
      const dogsArrayCopy = [];

      roundData.forEach((dog, i) => {
        dogsArray.push({
          url: dog.url,
          id: i,
        })
        dogsArrayCopy.push({
          url: dog.url,
          id: i,
        })
      })

      const fullDogArray = dogsArray.concat(dogsArrayCopy)

      let dogsWithKeys = fullDogArray.map((pup, i) => {
        pup.key = i
        return pup;
      })

      const shuffledDogs = this.shuffleCards(dogsWithKeys);

      this.setState({
        dogArray: shuffledDogs
      })

    }

  flipCard = (id, key) => {
    if (this.state.cardOneID === -1) {
      this.setCardOne(id, key);
    } else {
      (this.state.cardOneKey === key) ?
        (this.setState({ message: "" })) : (this.setCardTwo(id, key));
    }
  }

  setCardOne = (id, key) => {
    this.setState({
      message: "Find the match!",
      cardOneID: id,
      cardOneKey: key,
    })
  }

  setCardTwo = (id, key) => {
    this.setState({
      cardTwoID: id,
      cardTwoKey: key,
    }, () => {
      return (this.state.cardOneID === this.state.cardTwoID) ?
        (this.resetCards("winner", id)) :
        (this.resetCards("loser"));
    })
  }

  resetCards = (result, id) => {
    this.setState({
      message: (result === "winner") ?
        ("It's a match! Get another match!") : ("Not a match! Try Again!")
    }, () => {
      setTimeout(() => {
        if (result === "winner") {
          this.state.hiddenIDs.push(id)
          this.checkRoundEnd();
        }
        this.setState({
          cardOneID: -1,
          cardTwoID: -1,
          cardOneKey: -1,
          cardTwoKey: -1,
        })
      }, 200)
    })
  }

  shuffleCards = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  checkRoundEnd = () => {
    if (this.state.hiddenIDs.length === 6) {
      if (this.state.round === 5) {
        this.setState({
          message: "You win!"
        })
      } else {
        this.setState({
          hiddenIDs: [],
          round: this.state.round + 1,
          message: "Pick a card!"
  
        }, () => {
          this.setDogArrays();
        })
      }
    }
  }


  render() {

    return (

      <div className="container text-center">

        {<h1 className="m-2"> {(this.state.message === "") ? ('\xa0') : (this.state.message)} </h1>}

        <div className="row">

          {this.state.dogArray.map(pup => {

            return (

              <Cards
                id={pup.id}
                key={pup.key}
                url={
                  (this.state.cardOneKey === pup.key || this.state.cardTwoKey === pup.key) ?
                    (pup.url) : ("paw.jpg")
                }
                flipCard={() => this.flipCard(pup.id, pup.key)}
                className={
                  (this.state.hiddenIDs.includes(pup.id))
                    ? ("blank") : ("dogImage")
                }
              />

            )

          })}

        </div>
      </div>
    )
  }
}

export default Discover;