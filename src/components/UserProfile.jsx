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
      .then(response => {
        this.setState({
          museum: [{user.museum_id}],
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
