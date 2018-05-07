/* eslint-env browser */
import React           from 'react';
import ReactDOM        from 'react-dom';
import fontawesome     from '@fortawesome/fontawesome';
import brands          from '@fortawesome/fontawesome-free-brands';
import solid           from '@fortawesome/fontawesome-free-solid';
import 'bulma/bulma.sass';

import App from './components/App';

fontawesome.library.add(brands, solid);

// mount our App at #container
ReactDOM.render(<App />, document.querySelector('#container'));
