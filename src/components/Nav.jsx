import React from 'react';

export default () => (
  <nav className="navbar is-inverse" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <a href="#" className="navbar-item">
        <span className="icon is-large"><i className="fa fa-heartbeat" /></span>
        <span className="is-size-4"><strong>React Webpack API Skeleton</strong></span>
      </a>
      <button className="button navbar-burger">
        <span />
        <span />
        <span />
      </button>
    </div>
  </nav>
);
