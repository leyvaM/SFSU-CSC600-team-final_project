// 3rd party library imports
// import * as Tone from 'tone';
// import classNames from 'classnames';
// import { List, Range } from 'immutable';
// import React from 'react';

// project imports
import React, {useEffect, useState} from 'react';
import * as Tone from "tone";
import { Instrument, InstrumentProps } from '../Instruments';
import "../HarpDisplay.css"

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Harp.
 ** ------------------------------------------------------------------------ */

const Harp: React.FC<InstrumentProps> = ({synth, setSynth}) => {
  const harpStrings = [
    {path: require("../HarpNotes/b1-ksharp_b1_mf.wav"), label: "b1Sharp"},
    {path: require("../HarpNotes/e1-ksharp_e1_f.wav"), label: "e1Sharp"},
    {path: require("../HarpNotes/f1-ksharp_g1_mp.wav"), label: "f1Sharp"},
    {path: require("../HarpNotes/a2-ksharp_a2_mf.wav"), label: "a2Sharp"},
    {path: require("../HarpNotes/d2-ksharp_d2_mf.wav"), label: "d2Sharp"},
    {path: require("../HarpNotes/e2-ksharp_f2_mf.wav"), label: "e2Sharp"},
    {path: require("../HarpNotes/b3-ksharp_b3_mf.wav"), label: "b3Sharp"},
    {path: require("../HarpNotes/c3-ksharp_c3_mf.wav"), label: "a3Sharp"},
    {path: require("../HarpNotes/e3-ksharp_e3_mf.wav"), label: "e3Sharp"},
    {path: require("../HarpNotes/f3-ksharp_g3_mf.wav"), label: "f3Sharp"},
    {path: require("../HarpNotes/a4-ksharp_a4_mf.wav"), label: "a4Sharp"},
    {path: require("../HarpNotes/d4-ksharp_d4_mf.wav"), label: "d4Sharp"},
    {path: require("../HarpNotes/e4-ksharp_f4_mf.wav"), label: "e4Sharp"},
    {path: require("../HarpNotes/b5-ksharp_b5_mf.wav"), label: "b5Sharp"},
    {path: require("../HarpNotes/c5-ksharp_c5_mf.wav"), label: "a5Sharp"},
    {path: require("../HarpNotes/e5-ksharp_e5_mf.wav"), label: "e5Sharp"},
    {path: require("../HarpNotes/f5-ksharp_g5_mf.wav"), label: "f5Sharp"},
    {path: require("../HarpNotes/a6-ksharp_a6_mf.wav"), label: "a6Sharp"},  
    {path: require("../HarpNotes/d6-ksharp_d6_mf.wav"), label: "d6Sharp"},
    {path: require("../HarpNotes/e6-ksharp_f6_mf.wav"), label: "e6Sharp"},
    {path: require("../HarpNotes/d7-ksharp_d7_f.wav"), label: "d7Sharp"},
    {path: require("../HarpNotes/e7-ksharp_f7_f.wav"), label: "e7Sharp"},
];

  const [player, setPlayers] = useState<Tone.Player[]>([]);
  
  useEffect(() => {
    setPlayers(harpStrings.map((Harp) => loadSample(Harp.path)));
  }, []);

  const loadSample = (url: string) => {
    return new Tone.Player(url).toDestination();
  };

  const handleStringClick = (player: Tone.Player) => {
    player.start();
  };

  return (    
    <div className="harp">          
      {harpStrings.map((Harp, index) => {
            const player = loadSample(Harp.path);
            return (
              <span
                key={index}
                onMouseOver={() => handleStringClick(player)}
                className="Harp horizontal-shake">
              </span>
            );
      })}
    </div>
  );
};

export const HarpInstrument = new Instrument('Harp', Harp);
