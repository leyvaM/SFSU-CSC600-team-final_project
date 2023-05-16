// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

export const ParticleVisualizer = new Visualizer(
    'Particle Visualizer',
    (p5: P5, analyzer: Tone.Analyser) => {
        const width = window.innerWidth;
        const height = window.innerHeight / 2;
        const dim = Math.min(width, height);

        p5.background(0);

        const values = analyzer.getValue();
        // used to store particles objects
        const particles = [];

        for (let i = 0; i < values.length; i++) {
            const amplitude = values[i] as number;
            // generating random x and y coordinates within the canvas
            const x = p5.random(width);
            const y = p5.random(height);
            // radius calculated based on the dim value and the current amplitude
            const radius = dim / 2 * amplitude;

            const value = i % 12;
            let r, g, b;
            // switch statement is used to determine the rgb color of each value in the array
            // maintains the value of 'value' within a specified range (i.e. 0 - 11)
            switch (value) {
                case 0:
                case 2:
                case 4:
                    r = 255;
                    g = 0;
                    b = 0;
                    break;
                case 1:
                case 3:
                case 6:
                    r = 0;
                    g = 0;
                    b = 255;
                    break;
                case 5:
                case 7:
                case 9:
                    r = 0;
                    g = 255;
                    b = 0;
                    break;
                default:
                    r = 255;
                    g = 255;
                    b = 255;
                    break;
            }

            const fillColor = p5.color(r, g, b);
            // a new particle object is constructed with the following properties
            particles.push({ x, y, radius, color: fillColor });
        }

        // Each particle is positioned at the specified position on the canvas with its assigned color.
        for (let i = 0; i < particles.length; i++) {
            const particle = particles[i];
            p5.noStroke();
            p5.fill(particle.color);
            p5.ellipse(particle.x, particle.y, particle.radius, particle.radius);
        }
    },
);
