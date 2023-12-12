import React from 'react';

const AboutPage = () => {
  return (

          <div classNmae="text-center">
          <h1 className="mb-4 mt-4">About Memories App</h1>

          <p>
            To use the Memories App, you'll need to log in or sign up if you haven't already. 
            <br/>
            Once logged in, you can add new memories by clicking the '+' symbol. 
            <br/>
            Memories can be deleted using the '-' symbol, and you have the option to edit them by clicking on the pen symbol.
          </p>
          <p>
            Additionally, there are specific features available only to the admin. 
            <br/>
            For instance, the admin can certify users, assign roles like 'user' or 'admin,' and access additional functionalities.
          </p>

            <p>
              Username is gil2 (he is admin)
              <br/>
              Passport is Ab123456
              <br/>
              He can see all users who signed-in and approve them
              <br/>
              or change their role (to user or to admin)
              <br/>
              Note: only admin can change users role or approve them
              <br/>
              And refreshed the page 
              <br/>
              When you add a new memory card (by pressing the + button),
              <br/>
              a draft card is displayed as the first card.
              <br/>
              Then press the pen button in this card in order to edit it.
              <br/>
              This card will be saved to the server only after you edited it.
              <br/>
              You can press the heart button in a card in order to make it
              <br/>
              a favorited card.
              <br/>
              Then you can see this card in the favorite page.
              <br/>
              In the favorite page you should only view the favorited cards.
             </p>
          </div>  
  );
};

export default AboutPage;
