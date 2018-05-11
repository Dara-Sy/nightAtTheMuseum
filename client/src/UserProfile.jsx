import React from 'react';


class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      museum: [],
      user: {}
    };

    this.delFaves = this.delFaves.bind(this);

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

  componentWillMount(){
    fetch(`/:userid/faves/`)
    .then(response => response.json())
      .then(data => {
        let FaveList = this.state.museum.slice()
          FaveList.forEach(d => {
            for(let i = 0; i < data.length; i++){
              if(d.museum_id === data[i].museum_id){
                d.fave = 'true'
              }
            }
          })
        this.setState({
          museum: FaveList
        })
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
  delFaves(user) {
    let newFaves = this.state.museum.slice();
    let index = 0;
    newFaves.forEach((d, i) => {
      if(d.museum_id === user.museum_id) {
        index = i;
      }
    })
    let data = newFaves.splice(index, 1)
    fetch(`/${user.user_id}/faves/:faves_id`, {
      body: JSON.stringify(data),
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
      },
      method: 'DELETE',
      mode: 'cors',
      redirect: 'follow',
      referrer: 'no-referrer',
    })
    .then(response => response.json())
      .then((response) => {
        this.setState({
          museum: newFaves
        })
      })
  }


  // Bulma template for table
  // checking if fave museum id = index of array museum id
  // and show results in table
  render(props){
    const favorites = this.props.museum.map((fave, i) => {
      if(fave.museum_id === i.museum_id){
    return(
        <tbody>
          <tr>
            <th>{fave.name}</th>
            <span className="delbtn">
              <a className="icon" onClick={() =>
                // You don't need to say props since the function is in here.
                // you can just say this.delFaves
                // Also, see my note about the delFaves
                this.props.delFaves(fave)}>
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
