// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import "../flute.css";

import React, {useEffect, useState} from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Flute.
 ** ------------------------------------------------------------------------ */
const Flute: React.FC<InstrumentProps> = ({synth, setSynth}) => {
  const fluteNotes = [
  {path: require("../FluteNotes/373272__samulis__flute-non-vibrato-sustain-a6-ldflute_susnv_a5_v1_1.wav"), label: "A6v1"},
  {path: require("../FluteNotes/373276__samulis__flute-non-vibrato-sustain-c7-ldflute_susnv_c6_v1_1.wav"), label: "C7v1"},
  {path: require("../FluteNotes/373281__samulis__flute-non-vibrato-sustain-e6-ldflute_susnv_e5_v2_1.wav"), label: "E6v2"},
  {path: require("../FluteNotes/373283__samulis__flute-non-vibrato-sustain-a5-ldflute_susnv_a4_v3_1.wav"), label: "A5v3"},
  {path: require("../FluteNotes/373286__samulis__flute-non-vibrato-sustain-c5-ldflute_susnv_c4_v3_1.wav"), label: "C5v3"},
  {path: require("../FluteNotes/373288__samulis__flute-non-vibrato-sustain-e5-ldflute_susnv_e4_v3_1.wav"), label: "E5v3"},
];

  const [player, setPlayers] = useState<Tone.Player[]>([]);
  
  
  useEffect(() => {
    setPlayers(fluteNotes.map((Flute) => loadSample(Flute.path)));
  }, []);

  const loadSample = (url: string) => {
    return new Tone.Player(url).toDestination();
  };

  const handleStringClick = (player: Tone.Player) => {
    player.start();
  };

  const Flute1 = fluteNotes[0];
  const note1 = loadSample(Flute1.path);
  const Flute2 = fluteNotes[1];
  const note2 = loadSample(Flute2.path);
  const Flute3 = fluteNotes[2];
  const note3 = loadSample(Flute3.path);
  const Flute4 = fluteNotes[3];
  const note4 = loadSample(Flute4.path);
  const Flute5 = fluteNotes[4];
  const note5 = loadSample(Flute5.path);
  const Flute6= fluteNotes[5];
  const note6 = loadSample(Flute6.path);
  
  return (
    <div className="Flute">
     <div className="flute">
		<div className="mouthpiece">
   
    </div>
		<div className="body">
			<div className="hole hole1">
        <button className="holebutton">
      <button
          onClick={() => handleStringClick(note1)}
          className="notebtn"
      >
        <span>A6v1</span>
      </button>
      </button>
      </div>
			<div className="hole hole2">

      <button className="holebutton">
      <button
    onClick={() => handleStringClick(note2)}
    className="notebtn"
  >
    <span>C7v1</span>
  </button>
      </button>
      </div>
			<div className="hole hole3">
      <button className="holebutton">
      <button
          onClick={() => handleStringClick(note3)}
          className="notebtn"
      >
        <span>E6v2</span>
      </button>
      </button>
      </div>
			<div className="hole hole4">
      <button className="holebutton">
      <button
          onClick={() => handleStringClick(note4)}
          className="notebtn"
      >
        <span>A5v3</span>
      </button>
      </button>
      </div>
			<div className="hole hole5">
      <button className="holebutton">
      <button
          onClick={() => handleStringClick(note5)}
          className="notebtn"
      >
        <span>C5v3</span>
      </button>
      </button>
      </div>
			<div className="hole hole6">
      <button className="holebutton">
      <button
          onClick={() => handleStringClick(note6)}
          className="notebtn"
      >
        <span>E5v3</span>
      </button>
      </button>
      </div>
		</div>
	</div>
      <div className="hnote"><h4> Note: Multiple notes can be played at once. Notes are long, refresh to stop all notes.</h4></div>
      <div className="outer-grid">
        <div className="grid">
          
        </div>
      </div>
    </div>
    
  );
};


  
  
  export const FluteInstrument = new Instrument('Flute', Flute);