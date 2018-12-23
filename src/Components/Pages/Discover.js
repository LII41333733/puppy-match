import React, { Component } from 'react';
import { get6RandomDogs } from '../../Utils/API';
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
    message: "Pick a card!"
  }

  componentDidMount() {
    this.getDogs();
  }

  getDogs = () => {
    get6RandomDogs().then(({ data }) => {

      const dogsArray = [];
      const dogsArrayCopy = [];

      data.forEach((dog, i) => {
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

    }).catch(err => console.log(err))
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
        }
        this.setState({
          cardOneID: -1,
          cardTwoID: -1,
          cardOneKey: -1,
          cardTwoKey: -1,
        })
      }, 1000)
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


  render() {

    return (

      <div className="container text-center">

        {<h1 className="m-2">
          {(this.state.dogArray.length / 2 === this.state.hiddenIDs.length) ?
            (`You win!`) :((this.state.message === "") ?
              ('\xa0') :(this.state.message))}
        </h1>}

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