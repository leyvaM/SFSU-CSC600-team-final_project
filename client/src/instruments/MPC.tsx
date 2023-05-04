import React, { useEffect, useState } from "react";
import * as Tone from "tone";
import { Instrument, InstrumentProps } from "../Instruments";
import "../MPC.css";

const MPC: React.FC<InstrumentProps> = ({ synth, setSynth }) => {
  const pads = [
    { path: require("../sounds/kick.wav"), label: "Kick" },
    { path: require("../sounds/snare.wav"), label: "Snare" },
    { path: require("../sounds/closedhat.wav"), label: "Closed Hat" },
    { path: require("../sounds/openhat.wav"), label: "Open Hat" },
    { path: require("../sounds/clap.wav"), label: "Clap" },
    { path: require("../sounds/shaker.wav"), label: "Shaker" },
    { path: require("../sounds/ridecymbal.wav"), label: "Ride Cymbal" },
    { path: require("../sounds/crashcymbal.wav"), label: "Crash Cymbal" },
    { path: require("../sounds/kick2.wav"), label: "Kick" },
    { path: require("../sounds/snare2.wav"), label: "Snare" },
    { path: require("../sounds/closedhat2.wav"), label: "Closed Hat" },
    { path: require("../sounds/openhat2.wav"), label: "Open Hat" },
    { path: require("../sounds/clap2.wav"), label: "Clap" },
    { path: require("../sounds/shaker2.wav"), label: "Shaker" },
    { path: require("../sounds/ridecymbal2.wav"), label: "Ride Cymbal" },
    { path: require("../sounds/crashcymbal2.wav"), label: "Crash Cymbal" },
  ];

  const [players, setPlayers] = useState<Tone.Player[]>([]);
  const [reverbAmount, setReverbAmount] = useState<number>(0.1);
  const [pitchShiftAmount, setPitchShiftAmount] = useState<number>(0.1);
  const [reverbWetValue, setReverbWetValue] = useState(0.1);
  const [pitchShiftValue, setPitchShiftValue] = useState(0.1);

  const reverb = new Tone.Reverb(reverbAmount).toDestination();
  const pitchShift = new Tone.PitchShift(pitchShiftAmount).toDestination();

  useEffect(() => {
    setPlayers(pads.map((pad) => loadSample(pad.path)));

    return () => {
      players.forEach((player) => player.disconnect());
      reverb.dispose();
      pitchShift.dispose();
    };
  }, []);

  useEffect(() => {
    reverb.set({ decay: reverbAmount });
  }, [reverbAmount]);

  useEffect(() => {
    pitchShift.set({ pitch: pitchShiftAmount });
  }, [pitchShiftAmount]);

  const loadSample = (url: string) => {
    const player = new Tone.Player(url).toDestination();
    player.connect(reverb);
    player.connect(pitchShift);
    return player;
  };

  const handlePadClick = (player: Tone.Player) => {
    if (player.loaded) {
      player.start();
    } else {
      console.warn("Buffer is not loaded yet.");
    }
  };

  const handleReset = () => {
    setReverbWetValue(0.1);
    setPitchShiftValue(0.1);
    reverb.wet.value = 0.1;
    pitchShift.pitch = 0.1;
    // Add the following lines to update the slider positions
    const reverbSlider = document.getElementById(
      "reverb-slider"
    ) as HTMLInputElement;
    const pitchShiftSlider = document.getElementById(
      "pitch-shift-slider"
    ) as HTMLInputElement;
    reverbSlider.value = "0.5";
    pitchShiftSlider.value = "0";
  };

  return (
    <div className="MPC">
      <div className="outer-grid">
        <div className="grid">
          {pads.map((pad, index) => {
            const player = loadSample(pad.path);
            return (
              <button
                key={index}
                onClick={() => handlePadClick(player)}
                className="pad"
              >
                {pad.label}
              </button>
            );
          })}
        </div>
      </div>
      <div className="controls">
        <label>
          Reverb:{" "}
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={reverbWetValue}
            id="reverb-slider" // Add this line
            onChange={(e) => setReverbWetValue(parseFloat(e.target.value))}
          />
        </label>
        <label>
          Pitch Shift:{" "}
          <input
            type="range"
            min="-12"
            max="12"
            step="1"
            value={pitchShiftValue}
            id="pitch-shift-slider" // Add this line
            onChange={(e) => setPitchShiftValue(parseInt(e.target.value))}
          />
        </label>

        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export const MPCInstrument = new Instrument("MPC", MPC);
