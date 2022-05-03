import React, { useEffect, useState } from 'react';
import CardImg from './components/CardImg';
import './App.css';

const App = () => {
  const [images, setImages] = useState();

  useEffect(() => {
    fetch('images?limit=10')
      .then(res => res.json())
      .then(data => {
        console.log('Success:', data);
        setImages(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div className='app'>
      <ul>
      {
        images && images.map(img => (
        <li key={img.id}>
          <CardImg 
              imgData={{
                imgUrl: `${img.url}.jpg`, 
                profileImg: `${img.user.profile_image}.webp`,
                altDescr: img.alt_description
              }}
            />
        </li>
        ))
      }
      </ul>
    </div>
  );
}

export default App;
