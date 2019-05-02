import 'intersection-observer';
import { useState, useEffect, useRef } from 'react';

function useElementVisibility(targetRefs, options) {
  const initialIntersections = targetRefs.map(() => ({
    intersectionRatio: 0,
    isIntersecting: false,
  }));
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
      const isDifferentIntersectionRatio = hasMatchingTarget && parseInt(nextIntersections[index].intersectionRatio, 10) !== parseInt(intersectionRatio, 10);

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

