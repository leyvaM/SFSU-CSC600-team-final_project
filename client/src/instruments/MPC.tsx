// MPC.tsx

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

  useEffect(() => {
    setPlayers(pads.map((pad) => loadSample(pad.path)));
  }, []);

  const loadSample = (url: string) => {
    return new Tone.Player(url).toDestination();
  };

  const handlePadClick = (player: Tone.Player) => {
    player.start();
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
    </div>
  );
};

export const MPCInstrument = new Instrument("MPC", MPC);
