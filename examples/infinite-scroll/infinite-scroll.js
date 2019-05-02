import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import './infinite-scroll.css';
import useElementVisibility from '../../index';

function buildItems(page = 1) {
  const numberOfItems = page * 30;
  const items = new Array(numberOfItems).fill(0);

  return items;
}

function App() {
  const bottomObserver = useRef();
  const [visibility] = useElementVisibility([bottomObserver]);
  const [currentPage, setCurrentPage] = useState(1);
  const prevIntersectionRatioRef = useRef(visibility);
  const currentIntersectionRatio = visibility.intersectionRatio;
  const isBottomObserverVisible = prevIntersectionRatioRef.current !== 1 && currentIntersectionRatio === 1;
  const items = buildItems(currentPage);

  useEffect(() => {
    if (isBottomObserverVisible) {
      setCurrentPage(currentPage + 1);
    }
  }, [isBottomObserverVisible]);

  return (
    <>
      <ul className="list">
        {items.map((_, index) => (
          <li key={index} className="item">
            Item {index}
          </li>
        ))}
      </ul>
      <div ref={bottomObserver} />
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
