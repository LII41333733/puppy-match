import React from 'react';
import dogpic from './images/doge.jpg';

const styles = {
  hero: {
    backgroundImage: `url(${dogpic})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "45vh"
  }
}

const About = () => {
  return (
    <div>
      <div className="jumbotron jumbotron-fluid text-center d-flex align-items-center justify-content-center" style={styles.hero}>
        <h1>Welcome to the Pupster App!</h1>
      </div>
      <div className="container my-5">
        <div className="row">
          <div className="col-12">
            <h3>Sup Pups!</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id delectus consectetur commodi neque quam provident, repellat amet incidunt in recusandae, tenetur rem reiciendis ipsa fugiat eius sed saepe architecto eum!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id delectus consectetur commodi neque quam provident, repellat amet incidunt in recusandae, tenetur rem reiciendis ipsa fugiat eius sed saepe architecto eum!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id delectus consectetur commodi neque quam provident, repellat amet incidunt in recusandae, tenetur rem reiciendis ipsa fugiat eius sed saepe architecto eum!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About;