import React from 'react';

class Museums extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      onemuseum: {},
      isopen: '',
      userdata: [],
      forcererender: false,
      apikey: '',
      photo: '',
      rating: '',
    }
    this.deleteComment = this.deleteComment.bind(this);
    this.submitComment = this.submitComment.bind(this);
  }

  forceRender() {
    this.setState({
      forcererender: true
    })
    console.log('thisisforcerender', this.state.forcererender)
  }

  deleteComment(commentid) {
    let theComments = this.state.userdata.slice();
    let index = 0;
    theComments.forEach((d, i) => {
      if(d.comments_id === commentid) {
        index = i;
      }
    })
    let data = theComments.splice(index, 1);
    fetch(`/api/${commentid}/faves`, {
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
    .then(response => {
        this.setState({
          userdata: theComments
        })
      })
  }

  componentWillMount() {
    console.log('this is theprops', this.props)
    fetch(`/api/museum/${this.props.museumid}`)
    .then(response => response.json())
      .then(data => {
        if(data.length === 0) {
          console.log('no data returned')
        } else {
          let poop = '';
          for(let i = 0; i < data[0].rating; i++) {
            poop += 1;
          }
          fetch(`/api/secret`)
          .then(response => response.json())
            .then(apikey => {
              const url = `https://accesscontrolalloworiginall.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=museums+in+${data[0].museum_location}&key=${apikey}`
              fetch(url)
                .then( response => response.json())
                  .then(result => {
                    if(result.status !== 'OK') {
                      console.log('result was bad')
                      this.setState({
                        forcererender: true
                      })
                      this.forceRender();
                    } else {
                      let theMuseum = ''
                      result.results.forEach(element => {
                        if(element.id === data[0].museum_id) {
                          theMuseum = element;
                        }
                      })
                      this.setState({
                        onemuseum: theMuseum,
                        userdata: data,
                        photo: theMuseum.photos[0].photo_reference,
                        apikey: apikey
                      })

                      if(this.state.onemuseum.opening_hours.open_now === true) {
                        this.setState({
                          isopen: 'Open now'
                        })
                      } else {
                        this.setState({
                          isopen: 'Currently closed.'
                        })
                      }
                    }
              })
            })
        }
      })
  }

  submitComment() {
    console.log('I AM RUNNNNNINNNGGGG')
    const postURL = `/api/museum/${this.props.museumid}`
    let theData = {
      comments: document.querySelector('#comments').value,
      rating: document.querySelector('#rating').value,
      user_id: document.querySelector('#user_id').value,
      isfave: document.querySelector('#isfave').checked
    }
    fetch(postURL, {
      body: JSON.stringify({theData: theData}),
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
      .then(data => {
        let oldArray = this.state.userdata.slice();
        oldArray.unshift(data);
        this.setState({
          userdata: oldArray
        })
      })
  }


  componentDidMount() {
    if(this.state.forcererender === true) {
      this.setState({
        forcererender: false
      })
    }
  }

  amIOpen() {
    if(this.state.isopen === 'Open now') {
      console.log('isopen')
      return <p className="begreen">{this.state.isopen}</p>
    } else {
      console.log('not open')
      return <p className="bered">{this.state.isopen}</p>
    }
  }

  render(props){
    console.log(this.state.userdata)
    const userData = this.state.userdata.map((element, i) => {
      return(
        <div>
          {/*<a className="icon" onClick={() =>
            this.deleteComment(element.comments_id)}>
          <i className="fas fa-times-circle"></i>
        </a>*/}
        <div className="thebutton" onClick={() => this.deleteComment(element.comments_id)}></div>
        <section key={i} className="thecomments">
          <h3>{element.username} says:</h3>
          <p>{element.comments}</p>
          <p>Rating: {element.rating}</p>
          <hr />
        </section>
        </div>
      )
    })
    return(
      <div className="museumcontainer">
        <section className="museumSection">
          <h1>{this.state.onemuseum.name}</h1>
          <img src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${this.state.photo}&sensor=false&maxheight=300&maxwidth=500&key=${this.state.apikey}`}/>
          <h4>{this.state.onemuseum.formatted_address}</h4>
          <p>{this.amIOpen()}</p>
          <div className="fortextbox">
          <textarea id="comments"></textarea>
          <input type="text" id="rating" />
          <input type="hidden" id="user_id" value="3" />
          <div>
            <button onClick={() => {this.submitComment()}}>CLICK ME</button>
          </div>
          </div>
          <hr />
        </section>
        <section className="usercomments">
          <div>
            {userData}
          </div>
        </section>
      </div>
      )
  }

}

export default Museums;
