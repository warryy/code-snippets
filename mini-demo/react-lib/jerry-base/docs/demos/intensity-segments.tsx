import { IntensitySegments } from 'jerry-base';

import * as React from 'react';

export default () => {
  const segmentsRef = React.useRef(new IntensitySegments());
  const [segmentsResult, setSegmentsResult] = React.useState(
    segmentsRef.current.toString(),
  );
  return (
    <div>
      <section>
        <button
          type="button"
          onClick={() => {
            segmentsRef.current.add(10, 30, 1);
            setSegmentsResult(segmentsRef.current.toString());
          }}
        >
          evaluate: segments.add(10, 30, 1);
        </button>
        <br />
        <button
          type="button"
          onClick={() => {
            segmentsRef.current.add(10, 30, -1);
            setSegmentsResult(segmentsRef.current.toString());
          }}
        >
          evaluate: segments.add(10, 30, -1);
        </button>
        <br />
        <button
          type="button"
          onClick={() => {
            segmentsRef.current.add(20, 40, 2);
            setSegmentsResult(segmentsRef.current.toString());
          }}
        >
          evaluate: segments.add(20, 40, 2);
        </button>
        <br />
        <button
          type="button"
          onClick={() => {
            segmentsRef.current.add(20, 40, -2);
            setSegmentsResult(segmentsRef.current.toString());
          }}
        >
          evaluate: segments.add(20, 40, -2);
        </button>

        <br />
        <h2>segments.toString()</h2>
        <div>{segmentsResult}</div>
      </section>
    </div>
  );
};
