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
    fetch(``)
    .then(response => response.json())
      .then(data => {

      })

  }



  addFave(){

  }
// Bulma template for table
  render(props){
    return(
      <table class="table">
  <thead>
    <tr>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th></th>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    </tbody>
  </table>
      )
  }

}




export default Museums;
