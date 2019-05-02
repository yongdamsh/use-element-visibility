import React, { useRef } from 'react';
import ReactDOM from 'react-dom';

import './lazy-image-loading.css';
import useElementVisibility from '../../index';

function App() {
  const targets = new Array(10).fill().map(() => useRef(null));
  const visibilities = useElementVisibility(targets);
  console.log(visibilities);
  // useEffect(() => {

  // });

  return (
    <div className="images">
      {targets.map((target, index) => (
        <img key={index} ref={target} data-src="https://placeimg.com/320/100/any" />
      ))}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

