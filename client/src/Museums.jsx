import React from 'react';


class Museums extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      museum: [],
      comments: []

    }
  }


  componentWillMount(){
    fetch(`/museum/:museumid`)
    .then(response => response.json())
      .then(data => {
        let Muse = this.state.museum.slice()
          Muse.forEach(d => {

          })
      })

  }



  addFave(){

  }
// Bulma template for table
  render(props){
    return(
      <table className="table">
  <thead>
    <tr>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th></th>
      <td></td>
    </tr>
    </tbody>
  </table>
      )
  }

}




export default Museums;
