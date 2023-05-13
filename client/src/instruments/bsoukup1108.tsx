// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';

import React, {useEffect, useState} from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Flute.
 ** ------------------------------------------------------------------------ */
const Flute: React.FC<InstrumentProps> = ({synth, setSynth}) => {
  const fluteNotes = [
  {path: require("../FluteNotes/373270__samulis__flute-non-vibrato-sustain-a4-ldflute_susnv_a3_v1_1.wav"), label: "A4v1"},
  {path: require("../FluteNotes/373271__samulis__flute-non-vibrato-sustain-a5-ldflute_susnv_a4_v1_1.wav"), label: "A5v1"},
  {path: require("../FluteNotes/373272__samulis__flute-non-vibrato-sustain-a6-ldflute_susnv_a5_v1_1.wav"), label: "A6v1"},
  {path: require("../FluteNotes/373273__samulis__flute-non-vibrato-sustain-c4-ldflute_susnv_c3_v1_1.wav"), label: "C4v1"},
  {path: require("../FluteNotes/373274__samulis__flute-non-vibrato-sustain-c5-ldflute_susnv_c4_v1_1.wav"), label: "C5v1"},
  {path: require("../FluteNotes/373275__samulis__flute-non-vibrato-sustain-c6-ldflute_susnv_c5_v1_1.wav"), label: "C6v1"},
  {path: require("../FluteNotes/373276__samulis__flute-non-vibrato-sustain-c7-ldflute_susnv_c6_v1_1.wav"), label: "C7v1"},
  {path: require("../FluteNotes/373277__samulis__flute-non-vibrato-sustain-e4-ldflute_susnv_e3_v1_1.wav"), label: "E4v1"},
  {path: require("../FluteNotes/373278__samulis__flute-non-vibrato-sustain-e5-ldflute_susnv_e4_v1_1.wav"), label: "E5v1"},
  {path: require("../FluteNotes/373279__samulis__flute-non-vibrato-sustain-e6-ldflute_susnv_e5_v1_1.wav"), label: "E6v1"},
  {path: require("../FluteNotes/373280__samulis__flute-non-vibrato-sustain-c6-ldflute_susnv_c5_v2_1.wav"), label: "C6v2"},
  {path: require("../FluteNotes/373281__samulis__flute-non-vibrato-sustain-e6-ldflute_susnv_e5_v2_1.wav"), label: "E6v2"},
  {path: require("../FluteNotes/373282__samulis__flute-non-vibrato-sustain-a4-ldflute_susnv_a3_v3_1.wav"), label: "A4v3"},
  {path: require("../FluteNotes/373283__samulis__flute-non-vibrato-sustain-a5-ldflute_susnv_a4_v3_1.wav"), label: "A5v3"},
  {path: require("../FluteNotes/373284__samulis__flute-non-vibrato-sustain-a6-ldflute_susnv_a5_v3_1.wav"), label: "A6v3"},
  {path: require("../FluteNotes/373285__samulis__flute-non-vibrato-sustain-c4-ldflute_susnv_c3_v3_1.wav"), label: "C4v3"},
  {path: require("../FluteNotes/373286__samulis__flute-non-vibrato-sustain-c5-ldflute_susnv_c4_v3_1.wav"), label: "C5v3"},
  {path: require("../FluteNotes/373287__samulis__flute-non-vibrato-sustain-e4-ldflute_susnv_e3_v3_1.wav"), label: "E4v3"},
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

  return (
    <div className="Flute">
      <div className="outer-grid">
        <div className="grid">
          {fluteNotes.map((Flute, index) => {
            const player = loadSample(Flute.path);
            return (
              <button
                key={index}
                onClick={() => handleStringClick(player)}
                className="Flute"
              >
                {Flute.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};


  
  
  export const FluteInstrument = new Instrument('Flute', Flute);