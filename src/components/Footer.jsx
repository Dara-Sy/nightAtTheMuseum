import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

export default function() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="content has-text-centered">
          <p>
            <strong>React-webpack-skeleton</strong> made with <FontAwesomeIcon icon={['fas', 'heart']} /> by <a href="https://github.com/jasonseminara">Jason Seminara</a>. The source code is licensed
             <a href="http://opensource.org/licenses/mit-license.php"> <FontAwesomeIcon icon={['fas', 'balance-scale']} /> MIT</a>. The website content
            is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC ANS 4.0</a>.
          </p>
          <p>
            <a className="icon" href="https://github.com/jasonseminara/react-skeleton-api">
              <FontAwesomeIcon icon={['fab', 'github']} />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

