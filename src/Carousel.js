import React from 'react';

class Carousel extends React.Component {
  state = {
    photos: [],
    active: 0,
    primaryAnimalPhotoIndex: 0
  }

  static getDerivedStateFromProps({ media }) {
    let photos = [];

    if (media) {
      media.map(imageSize => {
        photos.push(imageSize.small)
      })
    }
    console.log(photos);
    return { photos };
  }

  setPrimaryAnimal = (index) => {
    this.setState({ primaryAnimalPhotoIndex: index })
  }

  render() {
    const { photos, active, primaryAnimalPhotoIndex } = this.state;

    return (
      <div className='carousel'>
        <img src={photos[primaryAnimalPhotoIndex]} alt="primary animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) =>
            (
              <img
                onClick={() => this.setPrimaryAnimal(index)}
                key={index}
                src={photo}
                className={'active'}
                alt="animal thumbnail"
              />
            ))}
        </div>
      </div>
    )
  }
}

export default Carousel;