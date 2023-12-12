import React from 'react';
import imageSrc from '../assets/memory_cards.jpg';

const Home = () => {

    return (
    <div className="mt-4">
      <h2>Home</h2>
      <div className="mt-4">
        <p>
            In this site you can handle your memories.
            <br/>
            Just signup/login and start working with your memories.
        </p>
        <img src={imageSrc} alt="Memory cards" />
      </div>
    </div>
  );
};

export default Home;
