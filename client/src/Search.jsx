import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      museums: [],
      zipcode: '',
      city: '',
      name: '',
    }

    this.getData = this.getData.bind(this);
    this.newSearch = this.newSearch.bind(this);
    this.renderMuseums = this.renderMuseums.bind(this);
  }

  //fetch all museuems in search!!
  // componentWillMount() {
  //   fetch(`/search`)
  //   .then(response => response.json())
  //     .then(data => {
  //       let museumSearch = this.state.museum.slice()
  //         museumSearch.forEach(d => {
  //           for(let i = 0; i < data.length; i++){
  //             //do we need an if statement??
  //             //loop to add gold star if Faved
  //             //
  //           }
  //         })
  //       this.setState({
  //         museum: museumSearch
  //       })
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }
newSearch(e) {
  this.setState({
    city: e.target.value
  });
}

getData(e) {
  // console.log('We are getting data:' + this.state.museum)
  e.preventDefault();
  // let zipcode = this.state.zipcode
  // let museum = this.state.museum
  // fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=40.730610, -73.935242&radius=1500&type=museum&keyword=&key=AIzaSyAffC3lLmIkfN33zhtCmtkJwH7k6TP9EnE`)
  // fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=museums+in+${data[0].museum_location}&key=${process.env.API_KEY}`)
  fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=museums+in+new+york&key=AIzaSyAffC3lLmIkfN33zhtCmtkJwH7k6TP9EnE`)
  .then(res => res.json())
    .then(data => {
      console.log(data);
      console.log("these are names, " + data.results[0].name);
      this.setState({
        museums: data.results,
        name: data.name,
      })
    })
    .catch(err =>
      console.log(err)
    )
}
renderMuseums(){
  //.this.state.map
  return this.state.museums.map(d => {
    return ( <li>{d.name}</li>)
  })
}


render(props) {
  return(
    <div className="searchContainer">
      <h3>Search</h3>
      <input
       type="text"
       name="zipcode"
       placeholder="searchbar"
       onChange={this.newSearch}
       />
       <button onClick={this.getData}>Find Museums</button>
       <ul>
       {this.renderMuseums()}
       </ul>
    </div>
    )
}

};

export default Search;

// <input onChange={(e) => this.newSearch(e)}
