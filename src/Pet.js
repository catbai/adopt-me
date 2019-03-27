import React from "react";
import { Link } from "react-router-dom";

class Pet extends React.Component {
  render() {
    const { id, name, type, breed, media, location } = this.props;
    return (
      <Link to={`/details/${id}`}>
        <div className="pet">
          <div className="image-container">
            <img src={media} alt={name} />
          </div>
          <div className="info">
            <h1>{name}</h1>
            <h2>{type} - {breed} - {location}</h2>
          </div>
        </div>
      </Link >
    )
  }
}

export default Pet;
