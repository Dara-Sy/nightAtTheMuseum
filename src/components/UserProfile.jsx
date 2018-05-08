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
    fetch(`/${user.user_id}/faves/`})
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



  render(props){
    return(
      const favorites = this.props.
      <div>

      </div>
      )
  }
}


export default UserProfile;
