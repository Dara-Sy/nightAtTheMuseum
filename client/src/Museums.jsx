import React from 'react';
import TokenService from './TokenService';

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
      userid: 0,
    }
    this.deleteComment = this.deleteComment.bind(this);
    this.submitComment = this.submitComment.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  forceRender() {
    this.setState({
      forcererender: true
    })
    console.log('thisisforcerender', this.state.forcererender)
  }

  killArray(thing) {
    if(Array.isArray(thing)) {
      return thing[0];
    } else {
      return thing;
    }
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
    let token = TokenService.read();
    fetch('/token', {
      body: JSON.stringify({token}),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    })
    .then(response => response.json())
      .then(payload => {
        if(Object.keys(payload).length === 4) {
          let user_id = payload.user_id;
          this.setState({
            userid: user_id
          })
          fetch(`/api/museum/${this.props.museumid}/${user_id}`)
          .then(response => response.json())
            .then(data => {
                fetch(`/api/secret`)
                .then(response => response.json())
                  .then(apikey => {
                    const url = `https://accesscontrolalloworiginall.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=museums+in+${this.props.city}&key=${apikey}`
                    fetch(url)
                      .then( response => response.json())
                        .then(result => {
                          console.log('thisisresult',result)
                          if(result.status !== 'OK') {
                            console.log('result was bad')
                            this.setState({
                              forcererender: true
                            })
                            this.forceRender();
                          } else {
                            let theMuseum = ''
                            console.log('thisisdata', data)
                            result.results.forEach(element => {
                              if(element.id === this.props.museumid) {
                                theMuseum = element;
                              }
                            })
                            this.setState({
                              onemuseum: theMuseum,
                              userdata: data,
                              photo: this.killArray(theMuseum.photos).photo_reference,
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
          })
        } else {
          window.location.replace('/login')
        }
      })
      .catch( err => {
        window.location.replace('/login')
      })
  }

  submitComment() {
    let textBox = document.querySelector('textarea')
    let ratingBox = document.getElementById('rating')
    if(textBox.value !== '' && ratingBox !== '') {
      const postURL = `/api/museum/${this.props.museumid}/${this.state.userid}`
      let theData = {
        comments: document.querySelector('#comments').value,
        rating: document.querySelector('#rating').value,
        user_id: this.state.userid
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
          textBox.value = '';
          ratingBox.value = '';
        })
    } else {
      alert('Fill out all the boxes')
    }
  }


  componentDidMount() {
    if(this.state.forcererender === true) {
      this.setState({
        forcererender: false
      })
    }
  }

  handleEdit(data) {
    let textBox = document.querySelector('textarea')
    let ratingBox = document.getElementById('rating')
    textBox.value = data.comments;
    ratingBox.value = data.rating;
    this.deleteComment(data.comments_id);
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
    console.log('comments', this.state.userdata[0])
    console.log('comments', this.state.userdata)
    if(this.state.userdata.length !== 0) {
      if(this.killArray(this.state.userdata).comments === null) {
        var userData = this.state.userdata.map(e => {
          return(
            <div>
            </div>
          )
        })
      } else {
        var userData = this.state.userdata.map((element, i) => {
          console.log('thisiselement',element)
          return(
            <div>
            <div className="delbtn" i className="fas fa-times-circle" onClick={() => this.deleteComment(element.comments_id)}></div>
            <section key={i} className="thecomments">
              <div onClick={() => this.handleEdit(element)}>
                <h3>{element.username} says:</h3>
                <p>{element.comments}</p>
                <p>Rating: {element.rating}</p>
              </div>
              <hr />
            </section>
            </div>
          )
        })
      }
    }
    return(
      <div className="museumcontainer">
        <section className="museumSection">
          <h1>{this.state.onemuseum.name}</h1>
          <img src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${this.state.photo}&sensor=false&maxheight=300&maxwidth=500&key=${this.state.apikey}`}/>
          <h4>{this.state.onemuseum.formatted_address}</h4>
          <p>{this.amIOpen()}</p>
          <div className="fortextbox">
          <textarea className="cmtbox" placeholder="Comments" id="comments" required></textarea>
          <input type="hidden" id="user_id" value="3" />
          <input className="cmtbox1" placeholder="Rating" type="text" id="rating" required/>
          <div>
            <button className="button" onClick={() => {this.submitComment()}}>Submit Comment</button>
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
