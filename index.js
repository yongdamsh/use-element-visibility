import 'intersection-observer';
import { useState, useEffect, useRef } from 'react';

function useElementVisibility(targetRefs, options) {
  const initialIntersections = new Array(targetRefs.length).fill(0);
  const [intersections, setIntersections] = useState(initialIntersections);

  function handleIntersectionChange(entries) {
    const nextIntersections = [...intersections];
    let intersectionChanged = false;

    entries.forEach(entry => {
      const { target, intersectionRatio } = entry;
      const index = targetRefs.findIndex(targetRef =>
        target.isEqualNode(targetRef.current)
      );
      const hasMatchingTarget = index !== -1;
      const isDifferentIntersectionRatio = hasMatchingTarget && nextIntersections[index].intersectionRatio !== intersectionRatio;

      if (isDifferentIntersectionRatio) {
        nextIntersections[index] = entry;
        intersectionChanged = true;
      }
    });

    if (intersectionChanged) {
      setIntersections(nextIntersections);
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersectionChange, options);

    targetRefs.forEach(targetRef => {
      observer.observe(targetRef.current);
    });

    return () => {
      observer.disconnect();
    };
  });

  return intersections;
}

export default useElementVisibility;

