// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { List, Range } from 'immutable';
// More 3rd party library imports
import Guitar, { getRenderFingerSpn } from 'react-guitar';
import { standard } from "react-guitar-tunings";
import useSound from "react-guitar-sound";
// project imports
import { Instrument, InstrumentProps } from "../Instruments";
import { type } from 'os';
import { spanishTheme } from 'react-guitar';

interface GuitarKeyProps {
  note: string;
  //duration?: string;
  synth: Tone.Synth;
  //setSynth: React.Dispatch<React.SetStateAction<Tone.Synth>>;
  fret: number;
}

export function GuitarKey({
  note,
  synth,
  fret,
  //string,
}: GuitarKeyProps): JSX.Element {
  const [active, setActive] = useState(false);

  const onStringClick = () => {
    setActive(true);
    synth?.triggerAttackRelease(`${note}${fret}`, '8n');
  };

  const onStringRelease = () => {
    setActive(false);
  }

  return (
    <div
      onMouseDown={onStringClick}
      onMouseUp={onStringRelease}
      className={classNames('ba pointer absolute dim', {
        'bg-black black h3': active,
        'black bg-white h4': !active,
      })}
      style={{
        // CSS
        top: 0,
        left: `${fret * 2}rem`,
        zIndex: active ? 1 : 0,
        width: active ? '1.5rem' : '2rem',
        marginLeft: active ? '0.25rem' : 0,
      }}
    ></div>
  );
}

function MyGuitar({ synth, setSynth}: InstrumentProps): JSX.Element {
  const tuning = ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'];
  const frets = { from: 0, amount: 20 }; // modify to define the number of frets to show
  const [strings, setStrings] = useState(tuning.map(note => Tone.Midi(note).toNote())); // convert note strings to MIDI notes
  const renderFinger = getRenderFingerSpn(strings.map(note => Tone.Midi(note).toMidi())); // convert MIDI notes to numbers for `react-guitar`

  useEffect(() => {
    setSynth((oldSynth) => {
      // update the synth whenever the strings state changes
      oldSynth?.dispose();
      return new Tone.Synth().toDestination();
    });
    // update the synth whenever the strings state changes
  }, [setSynth]);

  const onStringChange = (newStrings: number[]) => {
    setStrings(newStrings.map(note => Tone.Midi(note).toNote()));
  };

  return (
    <div className='flex flex-column items-center'>
      <Guitar
        id='my-guitar'
        strings={strings.map(note => Tone.Midi(note).toMidi())} // convert note strings to MIDI notes
        frets={frets}
        renderFinger={renderFinger}
        theme={spanishTheme}
        onChange={onStringChange}
        onPlay={string => synth?.triggerAttackRelease(Tone.Midi(strings[string]).toNote(), '8n')}
      />
      <div className='flex items-center mt3'>
        {tuning.map((note, index) => (
          <GuitarKey
            key={index}
            note={note}
            synth={synth}
            //setSynth={setSynth}
            fret={0}
          />
        ))}
      </div>
    </div>
  );
}

export const GuitarInstrument = new Instrument('Guitar', MyGuitar);


/*
function GuitarType({ title, onClick, active }: any): JSX.Element {
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
}*/

/*
function MyGuitar({ synth, setSynth }: InstrumentProps): JSX.Element {
  const tuning = ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'];
  const frets = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  const renderFingerSpan = getRenderFingerSpn(frets);

  return (
    <div className='relative dib h4 w-100 ml4'>
      <Guitar
      tuning={tuning}
      frets={{from: 0, amount:20}}
      renderKey={({string, fret}) => (
        <GuitarKey
        key={`${string}${fret}`}
        note={tuning[string] + fret}
        synth={synth}
        setSynth={setSynth}
        fret={fret}
        string={string}
        />
      )}
      renderFingerSpan={renderFingerSpan}
      width={800}
      height={300}
      />
    </div>
  );
}
*/

/*
function MyGuitar({ synth, setSynth }: InstrumentProps): JSX.Element {
  const strings = useMemo(() => [0, 0, 0, 0, 0, 0], []);
  const { play } = useSound({ fretting: strings, tuning: standard });

  return (
    <div className="relative dib h4 w-100 m14">
      <Guitar
        strings={strings}
        renderFinger={getRenderFingerSpn(standard)}
        playOnHover={true}
        onPlay={play}
      />
    </div>
  )
}
*/

/*
const Guitar: React.FC<InstrumentProps> = ({synth, setSynth }) => {
  const guitarStrings = [
    { path: require("../GuitarNotes/E_Badd11StrumGuitar_01_526.wav"), label: "E" },
    { path: require("../GuitarNotes/B_Badd9StrumGuitar_01_526.wav"), label: "B" },
    { path: require("../GuitarNotes/G_FM9StrumGuitar_01_526.wav"), label: "G" },
    { path: require("../GuitarNotes/D_Bm7StrumGuitar_01_526.wav"), label: "D" },
    { path: require("../GuitarNotes/A_Aadd9StrumGuitar_01_526.wav"), label: "A" },
    { path: require("../GuitarNotes/E_Eadd9StrumGuitar_01_526.wav"), label: "E" },

    //Need path for guitar frets
  ];

  const [player, setPlayers] = useState<Tone.Player[]>([]);
  
  useEffect(() => {
    setPlayers(guitarStrings.map((Guitar) => loadSample(Guitar.path)));
  }, []);

  const loadSample = (url: string) => {
    return new Tone.Player(url).toDestination();
  };

  const handleStringClick = (player: Tone.Player) => {
    player.start();
  };

  return (
    <div className="Guitar">
      <div className="outer-grid">
        <div className="grid">
          {guitarStrings.map((Guitar, index) => {
            const player = loadSample(Guitar.path);
            return (
              <button
                key={index}
                onClick={() => handleStringClick(player)}
                className="Guitar"
              >
                {Guitar.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
*/

/*
interface GuitarKeyProps {
  note: string;
  duration?: string;
  synth: Tone.Synth;
  //setSynth: React.Dispatch<React.SetStateAction<Tone.Synth>>;
  fret: number;
}

export function GuitarKey({
  note,
  synth,
  fret,
  //string,
}: GuitarKeyProps): JSX.Element {
  const [active, setActive] = useState(false);

  const onStringClick = () => {
    setActive(true);
    synth?.triggerAttackRelease(`${note}${fret}`, '8n');
  };

  const onStringRelease = () => {
    setActive(false);
  }

  return (
    <div
      onMouseDown={onStringClick}
      onMouseUp={onStringRelease}
      className={classNames('ba pointer absolute dim', {
        'bg-black black h3': active,
        'black bg-white h4': !active,
      })}
      style={{
        // CSS
        top: 0,
        left: `${fret * 2}rem`,
        zIndex: active ? 1 : 0,
        width: active ? '1.5rem' : '2rem',
        marginLeft: active ? '0.25rem' : 0,
      }}
    ></div>
  );
}

function GuitarType({ title, onClick, active }: any): JSX.Element {
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

function Guitar({ synth, setSynth }: InstrumentProps): JSX.Element {
  const notes = ['E', 'B', 'G', 'D', 'A', 'E'];
  const frets = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  return (
    <div className="relative dib h4 w-100 ml4">
      {frets.map((fret) => (
        <GuitarType
          key={fret}
          note={notes[fret % 6]}
          synth={synth}
          fret={fret}
        />
      ))}
    </div>
  );
}
*/
