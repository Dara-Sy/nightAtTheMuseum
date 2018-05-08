import react from 'react';


class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      museum_id: '',
      user_id: '',
      username: '',
      faves_id: ''
    }

  }

  // fetch all the users favorite museums
  allFaves(museum){
    fetch(`api/:user_id/faves/${museum.museum_id}`, {
      body: JSON.stringify({
        museum_id: museum.museum_id,
        faves_id: ,
        user_id:
      })
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      mode: 'cors',
      redirect: 'follow',
      referrer: 'no-referrer',
    })
    .then(response => response.json())
      .then(response => {
        this.props.
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
