
import { useEffect, useState, useCallback } from 'react';

export const useActiveSection = (sectionIds: string[]) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveSection = useCallback(() => {
    // Find which section is closest to the middle of the viewport
    const viewportCenter = window.innerHeight / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;

    sectionIds.forEach((id, index) => {
      const element = document.getElementById(id);
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const distance = Math.abs(elementCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      }
    });

    setActiveIndex(closestIndex);
  }, [sectionIds]);

  useEffect(() => {
    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, [updateActiveSection]);

  return activeIndex;
};