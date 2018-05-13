import React from 'react';


class UserProfile extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};

  }


  // fetch all the users favorite museums
  // Don't store state in here. Whenever you need
  // to refer to the whole list of museums, call
  // this.props.museumall. If you need to change
  // the museum array, do this...
  // {() => this.props.changeMuseum(newArray)}

  // If you need to use the things in the faves array,
  // use this.props.favesall.
  // If you need to update/change the faves array,
  // do this...
  // {() => this.props.updateFaves(newArray)}



    // get call from comment table to return isfave and comments
    // to make sure it can compare isfave is true or false
  componentWillMount(){
    fetch(`api/:userid/faves/`)
    .then(response => response.json())
      .then(data => {
        let FaveList = this.props.museumall.slice()
        let newArray =  FaveList.forEach(d => {
            for(let i = 0; i < data.length; i++){
              if(d.museum_id === data[i].museum_id){
                d.isfave = 'true'
              }
            }
          })
          .then( () => this.props.changeMuseum(newArray)
        )
      })
      .catch(err => {
        console.log(err)
      })
  }

  // delete a favorite
  // All of our components need to be able to use
  // this method that you wrote here. So I copy and
  // pasted it into App.js so that I can pass it down
  // as a prop to the rest of the components. Can you
  // If you delete this method since I moved it to App.js?
  // if you need to use this method, you can refer to it
  // like this {() => this.props.delFaves(user)}



  // Bulma template for table
  // checking if fave museum id = index of array museum id
  // and show results in table
  render(){
    let user = this.props.updateFaves
    const favorites = this.props.favesall.map((fave, i) => {
      if(fave.museum_id === i.museum_id){
    return(
        <tbody>
          <tr>
            <th>{fave.museum_id}</th>
            <span className="delbtn">
              <a className="icon" onClick={() =>
                // You don't need to say props since the function is in here.
                // you can just say this.delFaves
                // Also, see my note about the delFaves
                this.delFaves(user)}>
                  <i className="fas fa-times-circle"></i>
              </a>
            </span>
          </tr>
        </tbody>
      )
  }
      })
    return(
      <div>
        <table className="table">
         <thead>
          <tr>
            <th>Favorites</th>
          </tr>
         </thead>
          {favorites}
        </table>
      </div>
      )
  }
}


export default UserProfile;
