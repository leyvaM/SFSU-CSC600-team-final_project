import P5 from "p5";
import * as Tone from "tone";
import WaveSurfer from "wavesurfer.js";

// project imports
import { Visualizer } from "../Visualizers";

export const WaveSurferVisualizer = new Visualizer(
  "WaveSurfer",
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;

    // Create a canvas element using P5.js
    const canvas = p5.createCanvas(width, height);

    // Use Tone.js library to get audio data
    const audio = new Tone.Player("music.mp3").toDestination();
    audio.autostart = true;

    // Create a WaveSurfer instance and load audio data
    const wavesurfer = WaveSurfer.create({
      container: "#waveform",
      waveColor: "#A9A9A9",
      progressColor: "#FF8C00",
    });
    wavesurfer.load("music.mp3");

    // Use P5.js to draw shapes and animations on the canvas element
    p5.draw = () => {
      p5.background(0);
      const waveform = analyzer.getValue();
      const waveformArray = Array.isArray(waveform) ? waveform[0] : waveform;
      const radius = p5.map(waveformArray.reduce((a, b) => a + b) / waveformArray.length, -1, 1, 50, 200);
      
      p5.fill(255, 0, 0);
      p5.noStroke();
      p5.ellipse(width / 2, height / 2, radius);

      // Draw a rectangle with a width based on the audio level
      const rectWidth = p5.map(waveformArray[1], -1, 1, 50, 500);
      p5.fill(0, 255, 0);
      p5.noStroke();
      p5.rect((width - rectWidth) / 2, height / 2 - 50, rectWidth, 100);
    };
  }
);
