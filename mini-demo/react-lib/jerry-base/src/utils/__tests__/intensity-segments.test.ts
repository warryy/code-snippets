import { IntensitySegments } from 'jerry-base';

describe('IntensitySegments', () => {
  let intensitySegments: IntensitySegments;

  beforeEach(() => {
    intensitySegments = new IntensitySegments();
  });

  test('should handle overlapping add and set operations', () => {
    intensitySegments.clear();
    intensitySegments.add(10, 30, 1);
    expect(intensitySegments.toString()).toBe('[[10,1],[30,0]]');

    intensitySegments.add(20, 40, 1);
    expect(intensitySegments.toString()).toBe('[[10,1],[20,2],[30,1],[40,0]]');

    intensitySegments.add(10, 40, -2);
    expect(intensitySegments.toString()).toBe(
      '[[10,-1],[20,0],[30,-1],[40,0]]',
    );

    intensitySegments.clear();
    expect(intensitySegments.toString()).toBe('[]');

    intensitySegments.add(10, 30, 1);
    expect(intensitySegments.toString()).toBe('[[10,1],[30,0]]');

    intensitySegments.add(20, 40, 1);
    expect(intensitySegments.toString()).toBe('[[10,1],[20,2],[30,1],[40,0]]');

    intensitySegments.add(10, 40, -1);
    expect(intensitySegments.toString()).toBe('[[20,1],[30,0]]');

    intensitySegments.add(10, 40, -1);
    expect(intensitySegments.toString()).toBe(
      '[[10,-1],[20,0],[30,-1],[40,0]]',
    );
  });
});
