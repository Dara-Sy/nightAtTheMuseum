import react from 'react';


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
    let newFaves = this.state.museum.slice();
    let index = 0;
    newFaves.forEach((d, i) => {
      if(d.museum_id === fave[i].museum_id) {
        index = i;
      }
    })
    let data = newFaves.splice(index, 1)
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
          museum: newFaves,
          user: {}
        })
      })
  }



  render(props){
    return(
      const favorites = this.props.state
      <div>

      </div>
      )
  }
}


export default UserProfile;
