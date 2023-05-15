import P5 from "p5";
import * as Tone from "tone";
import { Visualizer } from "../Visualizers";

function randomColor() {
  let o = Math.round, r = Math.random, s = 255;
  return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + 0.5 + ')';
}

export const BeatDetector = new Visualizer(
  "Flashing Lights",
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;

    // Background color changes for every frame
    p5.background(randomColor());

    const values = analyzer.getValue();
    const angleIncrement = p5.TWO_PI / values.length;
    
    // Draw lines from the center of the canvas
    const centerX = width / 2;
    const centerY = height / 2;

    for (let i = 0; i < values.length; i++) {
      const value = values[i] as number;

      // The length of each line is determined by the frequency values
      const lineLength = p5.map(value, -1, 1, 0, Math.max(width, height) / 2);
      
      // Alternate line color between black and white
      const lineColor = i % 2 === 0 ? p5.color(0) : p5.color(255);

      // Calculate the endpoint of each line
      const angle = angleIncrement * i;
      const endX = centerX + lineLength * Math.cos(angle);
      const endY = centerY + lineLength * Math.sin(angle);

      // Draw the line
      p5.stroke(lineColor);
      p5.strokeWeight(5); // Set the thickness of the line
      p5.line(centerX, centerY, endX, endY);
    }

    // Draw 5 randomly placed circles with different sizes
    for (let i = 0; i < 5; i++) {
      const circleX = p5.random(width);
      const circleY = p5.random(height);
      const circleDiameter = p5.random(50, 200); // Change these values to control the size of the circles
      const circleColor = randomColor();

      p5.fill(circleColor);
      p5.noStroke();
      p5.ellipse(circleX, circleY, circleDiameter);
    }
  },
);

