import React from 'react';

class Museums extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      onemuseum: {},
      isopen: '',
      userdata: {},
      forcererender: false,
      apikey: '',
      photo: '',
      rating: '',
    }
  }

  forceRender() {
    this.setState({
      forcererender: false
    })
    console.log('thisisforcerender', this.state.forcererender)
  }

  componentWillMount() {
    fetch(`/api/museum/1`)
    .then(response => response.json())
      .then(data => {
        if(data.length === 0) {
          console.log('no data returned')
        } else {
          let poop = '';
          for(let i = 0; i < data[0].rating; i++) {
            poop +=   '&#57434';
          }
          this.setState({
            userdata: data[0],
            rating: poop
          })
  //         fetch(`/api/secret`)
  //         .then(response => response.json())
  //           .then(apikey => {
  //             console.log('data ', data)
  //             console.log('apikey',apikey)
  //             const url = `https://accesscontrolalloworiginall.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=museums+in+${data[0].museum_location}&key=${apikey}`
  //             fetch(url)
  //               .then( response => response.json())
  //                 .then(result => {
  //                   console.log('this is data ', result)
  //                   if(result.status !== 'OK') {
  //                     console.log('result was bad')
  //                     this.setState({
  //                       forcererender: true
  //                     })
  //                     this.forceRender();
  //                   } else {
  //                     let theMuseum = ''
  //                     result.results.forEach(element => {
  //                       if(element.id === data[0].museum_id) {
  //                         console.log(element)
  //                         theMuseum = element;
  //                       }
  //                     })
  //                     this.setState({
  //                       onemuseum: theMuseum,
  //                       userdata: data,
  //                       photo: theMuseum.photos[0].photo_reference,
  //                       apikey: apikey
  //                     })
  //                     console.log('this is userdata ',this.state.userdata)
  //                     if(this.state.onemuseum.opening_hours.open_now === true) {
  //                       this.setState({
  //                         isopen: 'Open now'
  //                       })
  //                     } else {
  //                       this.setState({
  //                         isopen: 'Currently closed.'
  //                       })
  //                     }
  //                   }
  //             })
  //           })
        }
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
    return(
      <div>
        <section>
          <h1>{this.state.onemuseum.name}</h1>
          <img src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${this.state.photo}&sensor=false&maxheight=300&maxwidth=500&key=${this.state.apikey}`}/>
          <h4>{this.state.onemuseum.formatted_address}</h4>
          <p>{this.amIOpen()}</p>
          <hr />
        </section>
        <section>
          <div>
            <div>
              <p>{this.state.userdata.comments}</p>
            </div>
            <div>
              <p>{this.state.rating}</p>
            </div>
          </div>
        </section>
      </div>
      )
  }

}

export default Museums;
