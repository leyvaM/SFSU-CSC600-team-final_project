// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

// Define constants for the visualization
const numStrings = 6;
const stringColors = ['#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#0000ff'];
const stringThickness = 5;

export const GuitarVisualizer = new Visualizer(
    'GuitarVisualizer',
    (p5: P5, analyzer: Tone.Analyser) => {
        const width = window.innerWidth;
        const height = window.innerHeight / 2;
        const dim = Math.min(width, height);

        p5.background(0, 0, 0, 255);

        for (let i = 0; i < numStrings; i++) {
            const stringAmplitude = analyzer.getValue() as any; // Get the amplitude of the current string
            const stringColor = stringColors[i]; // Get the color for the current string

            // Draw the string
            p5.strokeWeight(stringThickness);
            p5.stroke(stringColor);
            p5.noFill();
        }
    },
);

