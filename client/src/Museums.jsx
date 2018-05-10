import React from 'react';

class Museums extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      comments: []
    }
  }

  componentWillMount(){
    const proxy = 'https://accesscontrolalloworiginall.herokuapp.com/';
    // fetch(`/api/museum/1`)
    // .then(response => response.json())
    //   .then(data => {
    //     if(data.length === 0) {
    //       console.log('no data returned')
    //     } else {
          // fetch(`/api/secret`)
          // .then(response => response.json())
          //   .then(apikey => {
              // const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=museums+in+${data[0].museum_location}&key=${apikey}`;

              const url = `https://accesscontrolalloworiginall.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=museums+in+New+York&key=AIzaSyAffC3lLmIkfN33zhtCmtkJwH7k6TP9EnE`
              fetch(url)
                .then( response => response.json())
                  .then(data2 => {
                    console.log('this is data ', data2)
              })
            // })
      //   }
      // })

  }


  // will add museum to the faves list
  addFave(){

  }

// Bulma template for table
  render(props){
    return(
      <table className="table">
        <tbody>
          <tr>
            <td>

            </td>
          </tr>
        </tbody>
      </table>
      )
  }

}




export default Museums;
