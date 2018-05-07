import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

export default function() {
  return (
    <section className="hero is-primary body-content">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">
            <FontAwesomeIcon icon={['fas', 'globe']} /> Hello World
          </h1>
          <p className="subtitle">
            This is a React skeleton API template built
            with <a href="http://bulma.io/documentation/overview/start/">Bulma</a>!
          </p>
        </div>
      </div>
    </section>
  );
}
