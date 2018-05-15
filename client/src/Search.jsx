import React from 'react';
import { Link } from 'react-router-dom'
import TokenService from './TokenService';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      // museums: [],
      // zipcode: '',
      city: '',
      results: '',
      userid: 0
      // name: '',
    }

    this.getData = this.getData.bind(this);
    this.newSearch = this.newSearch.bind(this);
    // this.handleToggle = this.handleToggle.bind(this);
  }

newSearch(e) {
  this.setState({
    city: e.target.value
  });
}

handleToggle(data) {
  let theMuseums = document.querySelectorAll('.searchRes')
  theMuseums.forEach(d => {
    if(d.getAttribute('data') === data.id) {
      if(d.childNodes[1].classList.contains('beyellow')){
        d.childNodes[1].classList.remove('beyellow')
      } else {
        d.childNodes[1].classList.add('beyellow')
      }
      this.props.toggle(data)
    }
  })
}

componentWillMount() {
  let token = TokenService.read();
  fetch('/token', {
    body: JSON.stringify({token}),
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST'
  })
  .then(response => response.json())
    .then(payload => {
      if(Object.keys(payload).length === 4) {
        this.setState({
          userid: payload.user_id
        })
      } else {
        window.location.replace(`/login`)
      }
    })
}

// !!!!!!!!!!!!!!!!!!!!!!
// Don't store the museum state in here. If you need
// the list itself but don't need to add or remove
// anything then use this.props.museumall
// If you need to add things to the museum state, then
// do something like this...
// {() => this.props.changeMuseum(newArray)}

// If you need to use the things in the faves array,
// use this.props.favesall.
// If you need to update/change the faves array,
// do this...
// {() => this.props.updateFaves(newArray)}

// If you need to delete a fave, you can do this
// {() => this.props.delFaves()}

// !!!!!!!!!
// You need to nest this fetch call into a fetch call that
// goes to the server route called /api/secret. When you
// get the data back, it will be the APIKEY

// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
getData(e) {

  e.preventDefault();

 let city = this.state.city;
  city = city.split(' ').join('+');
  city = city.split(',').join('+');
  console.log(`i am `, city)
  fetch(`/api/${this.state.userid}/faves`)
  .then(response => response.json())
    .then(data => {
      this.props.updateFaves(data)
      fetch(`/api/secret`)
      .then(response => response.json())
        .then(apikey => {
          console.log('apikey', apikey)
          fetch(`https://accesscontrolalloworiginall.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=museums+in+${city}&key=${apikey}`)
          .then(res => res.json())
            .then(data => {
              this.props.changeMuseum(data.results)
                const toRender = this.props.museumall.map((element, i) => {
                  console.log(element)
                  let url = `/museum/${element.id}`
                  return (
                    <section className="searchResults" key={i}>
                      <Link to={url} onClick={() => {this.props.sendID(element.id, city)}}>
                        <i
                          className="fas fa-university fa-3x"
                          aria-hidden="true">
                        </i>
                      </Link>
                      <div className="searchRes" data={element.id}>
                        <h2>{element.name}</h2>
                        <i
                          className="fas fa-star fa-2x"
                          onClick={() => {this.handleToggle(element)}}>
                        </i>
                        <h2 className="local">{element.formatted_address}</h2>
                      </div>
                    </section>
                  );
                })
              this.setState({
                results: toRender
              })
              let theMuseums = document.querySelectorAll('.searchRes')
              theMuseums.forEach(d => {
                this.props.favesall.forEach(fave => {
                  if(d.getAttribute('data') === fave.museum_id) {
                    d.childNodes[1].classList.add('beyellow')
                  }
                })
              })
            })
        })
        .catch(err =>
          console.log(err)
        )
    })
}

componentDidMount() {
  let theMuseums = document.querySelectorAll('.searchRes')
  theMuseums.forEach(d => {
    this.props.favesall.forEach(fave => {
      if(d.getAttribute('data') === fave.museum_id) {
        d.childNodes[1].classList.add('beyellow')
      }
    })
  })
}

// !!!!!!!!!!!!!!!
// I think if you changed how the items are rendered
// like changing it from lis to divs, we will have
// an easier time styling it later. Also, the fields
// that you will want to show are museum name,
// address, is it currently open?, and there is a
// thumbnail that the API provides.
// Make the links clickable and make them send people
// to /museums/{the museum id}
// renderMuseums(){
//   //.this.state.map
//   return this.props.museumall.map(element => {
//     return ( <section>
//               <div>{element.icon}</div>
//               <div>
//                 <h2>{element.name}</h2>
//                 <h2>{element.formatted_address}</h2>
//               </div>
//             </section>)
//   })
// }

// To have an easier time styling later, please change
// the ul to a section tag.
// One of you, please start thinking about how the site
// should look.
render(props) {


  return(
    <main className="mainish">
      <section className="searchContainer">
        <h2 className="srchbar" >Search</h2>
        <form id="form">
          <input className="searchInput"
           type="text"
           name="zipcode"
           placeholder="searchbar"
           onChange={this.newSearch}
           />
           <button className="buttonSrch" onClick={this.getData}>Find Museums</button>
         </form>
         {this.state.results}
      </section>
     </main>
    )
}

};

export default Search;

// <input onChange={(e) => this.newSearch(e)}
// <img src={element.icon} />
