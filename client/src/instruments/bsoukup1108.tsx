// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
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

/*
interface FluteKeyProps {
    note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
    duration?: string;
    synth?: Tone.Synth; // Contains library code for making sound
    minor?: boolean; // True if minor key, false if major key
    octave: number;
    index: number; // octave + index together give a location for the piano key
  }

  export function FluteKey({
    note,
    synth,
    minor,
    index,
  }: FluteKeyProps): JSX.Element {
     /**
     * This React component corresponds to either a major or minor key in the piano.
     * See `PianoKeyWithoutJSX` for the React component without JSX.
     
     return (
        // Observations:
        // 1. The JSX refers to the HTML-looking syntax within TypeScript.
        // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
        // 3. The curly braces `{` and `}` should remind you of string interpolation.
        <div
          onMouseDown={() => synth?.triggerAttack(`${note}`)} // Question: what is `onMouseDown`?
          onMouseUp={() => synth?.triggerRelease('+0.25')} // Question: what is `onMouseUp`?
          className={classNames('ba pointer absolute dim', {
            'bg-black black h3': minor, // minor keys are black
            'black bg-white h4': !minor, // major keys are white
          })}
          style={{
            // CSS
            top: 0,
            left: `${index * 2}rem`,
            zIndex: minor ? 1 : 0,
            width: minor ? '1.5rem' : '2rem',
            marginLeft: minor ? '0.25rem' : 0,
          }}
        ></div>
      );
    }

    // eslint-disable-next-line
function FluteKeyWithoutJSX({
    note,
    synth,
    minor,
    index,
  }: FluteKeyProps): JSX.Element {
    /**
     * This React component for pedagogical purposes.
     * See `HarpKey` for the React component with JSX (JavaScript XML).
     
    return React.createElement(
      'div',
      {
        onMouseDown: () => synth?.triggerAttack(`${note}`),
        onMouseUp: () => synth?.triggerRelease('+0.25'),
        className: classNames('ba pointer absolute dim', {
          'bg-black black h3': minor,
          'black bg-white h4': !minor,
        }),
        style: {
          top: 0,
          left: `${index * 2}rem`,
          zIndex: minor ? 1 : 0,
          width: minor ? '1.5rem' : '2rem',
          marginLeft: minor ? '0.25rem' : 0,
        },
      },
      [],
    );
  }

  function FluteType({ title, onClick, active }: any): JSX.Element {
    return (
      <div
        onClick={onClick}
        className={classNames('dim pointer ph2 pv1 ba mr2 br1 fw7 bw1', {
          'b--black black': active,
          'gray b--light-gray': !active,
        })}
      >
        {title}
      </div>
    );
  }

  function Flute({ synth, setSynth }: InstrumentProps): JSX.Element {
    const keys = List([
      { note: 'C', idx: 0 },
      { note: 'Db', idx: 0.5 },
      { note: 'D', idx: 1 },
      { note: 'Eb', idx: 1.5 },
      { note: 'E', idx: 2 },
      { note: 'F', idx: 3 },
      { note: 'Gb', idx: 3.5 },
      { note: 'G', idx: 4 },
      { note: 'Ab', idx: 4.5 },
      { note: 'A', idx: 5 },
      { note: 'Bb', idx: 5.5 },
      { note: 'B', idx: 6 },
    ]);
  
    const setOscillator = (newType: Tone.ToneOscillatorType) => {
      setSynth(oldSynth => {
        oldSynth.disconnect();
  
        return new Tone.Synth({
          oscillator: { type: newType } as Tone.OmniOscillatorOptions,
        }).toDestination();
      });
    };
    const oscillators: List<OscillatorType> = List([
        'sine',
        'sawtooth',
        'square',
        'triangle',
        'fmsine',
        'fmsawtooth',
        'fmtriangle',
        'amsine',
        'amsawtooth',
        'amtriangle',
      ]) as List<OscillatorType>;
    
      return (
        <div className="pv4">
          <div className="relative dib h4 w-100 ml4">
            {Range(2, 7).map(octave =>
              keys.map(key => {
                const isMinor = key.note.indexOf('b') !== -1;
                const note = `${key.note}${octave}`;
                return (
                  <FluteKey
                    key={note} //react key
                    note={note}
                    synth={synth}
                    minor={isMinor}
                    octave={octave}
                    index={(octave - 2) * 7 + key.idx}
                  />
                );
              }),
            )}
          </div>
          <div className={'pl4 pt4 flex'}>
            {oscillators.map(o => (
              <FluteType
                key={o}
                title={o}
                onClick={() => setOscillator(o)}
                active={synth?.oscillator.type === o}
              />
            ))}
          </div>
        </div>
      );
    }*/
  
  
  
  export const FluteInstrument = new Instrument('Flute', Flute);