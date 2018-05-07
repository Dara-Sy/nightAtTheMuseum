import React from 'react';
import lich  from '../img/The_Lich_King.png';


export default function(props) {
  return (
    <section className="column">

      <div className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img src={lich} alt="Placeholder" />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-left">
              <figure className="image is-48x48">
                <img src={props.img} alt="Placeholder" />
              </figure>
            </div>
            <div className="media-content">
              <p className="title is-4">{props.name}</p>
              <p className="subtitle is-6">@{props.username}</p>
            </div>
          </div>

          <div className="content">
            <p>{props.company.catchPhrase}</p>
            <a href="#">{props.website}</a> <a href="#">#responsive</a>
            <br />
            <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
          </div>
        </div>
      </div>
    </section>

  );
}
