import React from "react";
import { Client } from "@petfinder/petfinder-js";
import Pet from "./Pet";
import { Link } from "react-router-dom"
import SearchParams from "./SearchParams";

const client = new Client({
  apiKey: process.env.REACT_APP_API_KEY,
  secret: process.env.REACT_APP_API_SECRET
});

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pets: [], //state of the 'world'
    }
  }

  componentDidMount() {
    this.getAnimalData("New York, NY")
  }

  getAnimalData = (location, breed = '', type = '') => {
    client.animal
      .search({ output: "full", location, breed, type })
      .then(res => {
        console.log(res.data);
        let pets;
        if (res.data) {
          if (Array.isArray(res.data.animals)) {
            pets = res.data.animals
          } else {
            pets = [res.data.animals];
          }
        } else {
          pets = [];
        }

        this.setState({
          pets,
          filteredPets: pets
        })
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  render() {
    return (
      /* <pre>
        <code>{JSON.stringify(this.state, null, 4)}</code>
      </pre> */
      <div>
        <div className="search">
          <SearchParams searchEvent={this.getAnimalData} />
          {this.state.pets.map(pet => {
            let breed;
            if (pet.breeds) {
              breed = pet.breeds.primary;
            }
            let photo
            if (pet.photos && pet.photos[0]) {
              photo = pet.photos[0].small
            } else {
              photo = "https://via.placeholder.com/150"
            }
            let city, state
            if (pet.contact) {
              city = pet.contact.address.city
              state = pet.contact.address.state
            }

            return < Pet
              key={pet.id + "i"}
              type={pet.type}
              name={pet.name}
              breed={breed}
              media={photo}
              location={`${city}, ${state}`}
              id={pet.id} />
          })}
        </div>
      </div>
    );
  }
}

export default Results;