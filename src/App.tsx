import React, { ReactNode } from 'react';
import { useWindowSize } from 'react-use';
import { useTweaks } from 'use-tweaks';
import './App.css';

const INITIAL_RADIAL_OFFSET = Math.PI / 6;

function App() {
  const {
    numCirclesPerGroup,
    circleGap,
    innerCircleRadius,
    numGroups,
  } = useTweaks({
    numCirclesPerGroup: { value: 12, min: 1, max: 40, step: 1 },
    circleGap: { value: 2, min: 0, max: 100, step: 1 },
    innerCircleRadius: { value: 20, min: 1, max: 100, step: 1 },
    numGroups: { value: 6, min: 2, max: 90, step: 1 },
  }) as any; // having to force any otherwise an error about "does not exist on type"
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const circles: ReactNode[] = [];
  for (let group = 0; group < numGroups; group++) {
    const radialOffset =
      INITIAL_RADIAL_OFFSET + (group * 2 * Math.PI) / numGroups;
    for (let i = 0; i < numCirclesPerGroup; i++) {
      const radius = innerCircleRadius + i ** 1.6 * circleGap;
      const cosine = Math.cos(radialOffset);
      const sine = Math.sin(radialOffset);
      const cxOffset = -cosine * innerCircleRadius;
      const cyOffset = -sine * innerCircleRadius;
      const cx = windowWidth / 2 + cosine * radius + cxOffset;
      const cy = windowHeight / 2 + sine * radius + cyOffset;
      circles.push(
        <circle
          key={group * numCirclesPerGroup + i}
          stroke="#fff"
          strokeWidth={1}
          r={radius}
          cx={cx}
          cy={cy}
          fillOpacity={0}
        ></circle>
      );
    }
  }
  return (
    <div className="App">
      <svg height={windowHeight} width={windowWidth}>
        <circle
          fill="#fff"
          r={innerCircleRadius}
          cx={windowWidth / 2}
          cy={windowHeight / 2}
        ></circle>
        {circles}
      </svg>
    </div>
  );
}

export default App;
