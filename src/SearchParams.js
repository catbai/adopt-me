import React from 'react';
import { Client } from "@petfinder/petfinder-js";
import { Link } from 'react-router-dom';

const client = new Client({
  apiKey: process.env.REACT_APP_API_KEY,
  secret: process.env.REACT_APP_API_SECRET
});

class SearchParams extends React.Component {

  state = {
    location: "New York, NY",
    animal: "Dog",
    breed: "",
    breeds: []
  };

  componentDidMount() {
    this.getBreeds();
  }

  handleLocationChange = event => {
    this.setState({
      location: event.target.value
    }, () => this.getBreeds())
  };

  handleAnimalChange = event => {
    this.setState({
      animal: event.target.value,
      breed: ""
    }, () => this.getBreeds());
  };

  handleBreedChange = event => {
    this.setState({
      breed: event.target.value
    })
  }

  getBreeds() {
    client.animalData.breeds(this.state.animal)
      .then(res => {

        this.setState({
          breeds: res.data.breeds
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  handSubmit = () => {
    const {
      location,
      animal,
      breed,
    } = this.state

    if (breed) {
      this.props.searchEvent(location, breed, '')
    } else if (animal) {
      this.props.searchEvent(location, '', animal)
    } else {
      this.props.searchEvent(location, '', '')
    }


  }

  render() {
    return (
      <>
        <Link to="/"><h1>Adopt Me</h1></Link>
        <div className="search-params">
          <label htmlFor="location">
            Location
          <input
              onChange={this.handleLocationChange}
              id="location"
              value={this.state.location}
              placeholder="Location"
            />
          </label>
          <label htmlFor="animal">
            animal
            <select
              id="animal"
              value={this.state.animal}
              onChange={this.handleAnimalChange}
              onBlue={this.handleAnimalChange}
            >
              <option>Dog</option>
              <option>Cat</option>
              <option>Rabbit</option>
              <option>Bird</option>
              <option>Small & Furry</option>
              <option>Horse</option>
              <option>Barnyard</option>
              <option>Scales, Fins & Other</option>

            </select>
          </label>
          <label htmlFor="breed">
            Breed
            <select
              id="breed"
              value={this.state.breed}
              onChange={this.handleBreedChange}
              onBlur={this.handleBreedChange}
              disabled={this.state.breeds.length === 0}
            >
              <option />
              {this.state.breeds.map((breed, index) => (
                <option key={index} value={breed.name}>
                  {breed.name}
                </option>
              ))}
            </select>
          </label>

          <button onClick={this.handSubmit}>Submit</button>
        </div>
      </>
    )
  }
}

export default SearchParams;