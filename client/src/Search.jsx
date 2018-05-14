import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      // museums: [],
      // zipcode: '',
      city: '',
      results: '',
      // name: '',
    }

    this.getData = this.getData.bind(this);
    this.newSearch = this.newSearch.bind(this);
    // this.renderMuseums = this.renderMuseums.bind(this);
  }

newSearch(e) {
  this.setState({
    city: e.target.value
  });
  console.log(`I am what yu search`, this.state.city)
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
  city = city.replace(" ", "+");
  console.log(`i am `, city)

  fetch(`/api/secret`)
    .then(response => response.json())
      .then(apikey => {
        fetch(`https://accesscontrolalloworiginall.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=museums+in+${city}&key=${apikey}`)
        .then(res => res.json())
          .then(data => {
            this.props.changeMuseum(data.results)
            const toRender = this.props.museumall.map((element, i) => {
                let url = `/museum/${element.id}`
                return (
                    <a href={url} onClick={() => {this.props.sendID(element.id)}}>
                    <section className="searchResults" key={i}>


                          <i class="fas fa-university fa-5x" aria-hidden="true"></i>
                            <div className="searchRes">
                            <h2>{element.name}</h2>
                            <i class="fas fa-star fa-3x"></i>

                            <h2 className="local">{element.formatted_address}</h2>
                            </div>

                        </section> </a>);
          })
              this.setState({
              results: toRender
                })
      })
          .catch(err =>
            console.log(err)
          )
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
<<<<<<< HEAD
    <section className="searchContainer">
      <h3>Search</h3>
    <form id="form">
      <input className="searchInput"
       type="text"
       name="zipcode"
       placeholder="searchbar"
       onChange={this.newSearch}
       />
       <button className="button" onClick={this.getData}>Find Museums</button>
    </form>
       <div className="">

       {this.state.results}

       </div>
    </section>
=======
    <main className="NavimgSrch">
    <div className="boxSrch">
    </div>
      <section className="searchContainer">
        <h2>Search</h2>
        <input className="searchInput"
         type="text"
         name="zipcode"
         placeholder="searchbar"
         onChange={this.newSearch}
         />
         <button className="buttonSrch" onClick={this.getData}>Find Museums</button>
         <div className="">
         <a href="/museum/:museumid">
         {this.state.results}
         </a>
         </div>
      </section>
     </main>
>>>>>>> a0d69995de2281de2601af530d0dd87037812532
    )
}

};

export default Search;

// <input onChange={(e) => this.newSearch(e)}
// <img src={element.icon} />
