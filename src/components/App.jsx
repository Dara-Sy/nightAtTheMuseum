import React  from 'react';
import faker  from 'faker';
import Nav    from './Nav';
import Hero   from './Hero';
import Footer from './Footer';
import Bones  from './Bones';
import './App.css';




export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: Array(3).fill(0).map(() => ({
        ...faker.helpers.createCard(),
        id:  faker.random.uuid(),
        img: faker.image.avatar(),
      })),
    };
  }

  render() {
    return (
      <div className="site">
        <Nav />
        <Hero />
        <div className="container">
          <div className="columns">
            {this.state.cards.map(card =>
              <Bones key={card.id} {...card}/>
            )}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
