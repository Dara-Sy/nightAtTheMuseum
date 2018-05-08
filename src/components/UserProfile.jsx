import react from 'react';


class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      museum: [],
      user: {}
    }

  }


  // fetch all the users favorite museums
  componentWillMount(user){
    fetch(`/${user.user_id}/faves/`)
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
          museum: FaveList,
          user: {}
        })
      })
      .catch(err => {
        next(err)
      })
  }

  // delete a favorite
  delFaves(fave) {
    let newList = this.state.museum.slice();
    let index = 0;
    newList.forEach((d, i) => {
      if(d.museum_id === data[i].museum_id) {
        index = i;
      }
    })
    let data = newList.splice(index, 1)
    fetch(`/${user.user_id}/faves/:faves_id`, {
      body: JSON.stringify(data),
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example'
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
          museum: newList,
          user: {}
        })
      })
  }



  render(props){
    return(
      const favorites = this.props.
      <div>

      </div>
      )
  }
}


export default UserProfile;
