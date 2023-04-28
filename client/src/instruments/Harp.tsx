// 3rd party library imports
// import * as Tone from 'tone';
// import classNames from 'classnames';
// import { List, Range } from 'immutable';
// import React from 'react';

// project imports
import React, {useEffect, useState} from 'react';
import * as Tone from "tone";
import { Instrument, InstrumentProps } from '../Instruments';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Harp.
 ** ------------------------------------------------------------------------ */

const Harp: React.FC<InstrumentProps> = ({synth, setSynth}) => {
  const harpStrings = [
  {path: require("../HarpNotes/a2-ksharp_a2_mf.wav"), label: "a2Sharp"},
  {path: require("../HarpNotes/a4-ksharp_a4_mf.wav"), label: "a4Sharp"},
  {path: require("../HarpNotes/a6-ksharp_a6_mf.wav"), label: "a6Sharp"},
  {path: require("../HarpNotes/b1-ksharp_b1_mf.wav"), label: "b1Sharp"},
  {path: require("../HarpNotes/b3-ksharp_b3_mf.wav"), label: "b3Sharp"},
  {path: require("../HarpNotes/b5-ksharp_b5_mf.wav"), label: "b5Sharp"},
  {path: require("../HarpNotes/c3-ksharp_c3_mf.wav"), label: "a3Sharp"},
  {path: require("../HarpNotes/c5-ksharp_c5_mf.wav"), label: "a5Sharp"},
  {path: require("../HarpNotes/d2-ksharp_d2_mf.wav"), label: "d2Sharp"},
  {path: require("../HarpNotes/d4-ksharp_d4_mf.wav"), label: "d4Sharp"},
  {path: require("../HarpNotes/d6-ksharp_d6_mf.wav"), label: "d6Sharp"},
  {path: require("../HarpNotes/d7-ksharp_d7_f.wav"), label: "d7Sharp"},
  {path: require("../HarpNotes/e1-ksharp_e1_f.wav"), label: "e1Sharp"},
  {path: require("../HarpNotes/e2-ksharp_f2_mf.wav"), label: "e2Sharp"},
  {path: require("../HarpNotes/e3-ksharp_e3_mf.wav"), label: "e3Sharp"},
  {path: require("../HarpNotes/e4-ksharp_f4_mf.wav"), label: "e4Sharp"},
  {path: require("../HarpNotes/e5-ksharp_e5_mf.wav"), label: "e5Sharp"},
  {path: require("../HarpNotes/e6-ksharp_f6_mf.wav"), label: "e6Sharp"},
  {path: require("../HarpNotes/e7-ksharp_f7_f.wav"), label: "e7Sharp"},
  {path: require("../HarpNotes/f1-ksharp_g1_mp.wav"), label: "f1Sharp"},
  {path: require("../HarpNotes/f3-ksharp_g3_mf.wav"), label: "f3Sharp"},
  {path: require("../HarpNotes/f5-ksharp_g5_mf.wav"), label: "f5Sharp"},
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
    <div className="Harp">
      <div className="outer-grid">
        <div className="grid">
          {Harp.map((Harp, index) => {
            const player = loadSample(Harp.path);
            return (
              <button
                key={index}
                onClick={() => handleStringClick(player)}
                className="Harp"
              >
                {Harp.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// interface HarpKeyProps {
//   note: string; // C, Db, D, Eb, E, F, Gb, G, Ab, A, Bb, B
//   duration?: string;
//   synth?: Tone.Synth; // Contains library code for making sound
//   minor?: boolean; // True if minor key, false if major key
//   octave: number;
//   index: number; // octave + index together give a location for the Harp key
// }

// export function HarpKey({
//   note,
//   synth,
//   minor,
//   index,
// }: HarpKeyProps): JSX.Element {
  /**
   * This React component corresponds to either a major or minor key in the Harp.
   * See `HarpKeyWithoutJSX` for the React component without JSX.
   */
//   return (
//     // Observations:
//     // 1. The JSX refers to the HTML-looking syntax within TypeScript.
//     // 2. The JSX will be **transpiled** into the corresponding `React.createElement` library call.
//     // 3. The curly braces `{` and `}` should remind you of string interpolation.
//     <div
//       onMouseDown={() => synth?.triggerAttack(`${note}`)} // Question: what is `onMouseDown`?
//       onMouseUp={() => synth?.triggerRelease('+0.25')} // Question: what is `onMouseUp`?
//       className={classNames('ba pointer absolute dim', {
//         'bg-black black h3': minor, // minor keys are black
//         'black bg-white h4': !minor, // major keys are white
//       })}
//       style={{
//         // CSS
//         top: 0,
//         left: `${index * 2}rem`,
//         zIndex: minor ? 1 : 0,
//         width: minor ? '1.5rem' : '2rem',
//         marginLeft: minor ? '0.25rem' : 0,
//       }}
//     ></div>
//   );
// }

// // eslint-disable-next-line
// function HarpKeyWithoutJSX({
//   note,
//   synth,
//   minor,
//   index,
// }: HarpKeyProps): JSX.Element {
//   /**
//    * This React component for pedagogical purposes.
//    * See `HarpKey` for the React component with JSX (JavaScript XML).
//    */
//   return React.createElement(
//     'div',
//     {
//       onMouseDown: () => synth?.triggerAttack(`${note}`),
//       onMouseUp: () => synth?.triggerRelease('+0.25'),
//       className: classNames('ba pointer absolute dim', {
//         'bg-black black h3': minor,
//         'black bg-white h4': !minor,
//       }),
//       style: {
//         top: 0,
//         left: `${index * 2}rem`,
//         zIndex: minor ? 1 : 0,
//         width: minor ? '1.5rem' : '2rem',
//         marginLeft: minor ? '0.25rem' : 0,
//       },
//     },
//     [],
//   );
// }

// function HarpType({ title, onClick, active }: any): JSX.Element {
//   return (
//     <div
//       onClick={onClick}
//       className={classNames('dim pointer ph2 pv1 ba mr2 br1 fw7 bw1', {
//         'b--black black': active,
//         'gray b--light-gray': !active,
//       })}
//     >
//       {title}
//     </div>
//   );
// }

// function Harp({ synth, setSynth }: InstrumentProps): JSX.Element {
//   const keys = List([
//     { note: 'C', idx: 0 },
//     { note: 'Db', idx: 0.5 },
//     { note: 'D', idx: 1 },
//     { note: 'Eb', idx: 1.5 },
//     { note: 'E', idx: 2 },
//     { note: 'F', idx: 3 },
//     { note: 'Gb', idx: 3.5 },
//     { note: 'G', idx: 4 },
//     { note: 'Ab', idx: 4.5 },
//     { note: 'A', idx: 5 },
//     { note: 'Bb', idx: 5.5 },
//     { note: 'B', idx: 6 },
//   ]);

//   const setOscillator = (newType: Tone.ToneOscillatorType) => {
//     setSynth(oldSynth => {
//       oldSynth.disconnect();

//       return new Tone.Synth({
//         oscillator: { type: newType } as Tone.OmniOscillatorOptions,
//       }).toDestination();
//     });
//   };

//   const oscillators: List<OscillatorType> = List([
//     'sine',
//     'sawtooth',
//     'square',
//     'triangle',
//     'fmsine',
//     'fmsawtooth',
//     'fmtriangle',
//     'amsine',
//     'amsawtooth',
//     'amtriangle',
//   ]) as List<OscillatorType>;

//   return (
//     <div className="pv4">
//       <div className="relative dib h4 w-100 ml4">
//         {Range(2, 7).map(octave =>
//           keys.map(key => {
//             const isMinor = key.note.indexOf('b') !== -1;
//             const note = `${key.note}${octave}`;
//             return (
//               <HarpKey
//                 key={note} //react key
//                 note={note}
//                 synth={synth}
//                 minor={isMinor}
//                 octave={octave}
//                 index={(octave - 2) * 7 + key.idx}
//               />
//             );
//           }),
//         )}
//       </div>
//       <div className={'pl4 pt4 flex'}>
//         {oscillators.map(o => (
//           <HarpType
//             key={o}
//             title={o}
//             onClick={() => setOscillator(o)}
//             active={synth?.oscillator.type === o}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

export const HarpInstrument = new Instrument('Harp', Harp);
