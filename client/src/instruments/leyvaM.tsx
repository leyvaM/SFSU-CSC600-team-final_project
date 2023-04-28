// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React, {useEffect, useState} from 'react';
//import Guitar from 'react-guitar';
// project imports
import { Instrument, InstrumentProps } from "../Instruments";

interface GuitarKeyProps {
    note: string;
    duration?: string;
    synth: Tone.Synth;
    //setSynth: React.Dispatch<React.SetStateAction<Tone.Synth>>;
    fret: number;
    //string: number;
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

  function Guitar({synth, setSynth}: InstrumentProps): JSX.Element {
    const notes = ['E', 'B', 'G', 'D', 'A', 'E'];
    const frets = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

    return (
      <div className="relative dib h4 w-100 ml4">
        {frets.map((fret) => (
          <GuitarKey
          key={fret}
          note={notes[fret % 6]}
          synth={synth}
          fret={fret}
          />
        ))}
      </div>
    );
  }
  
export const GuitarInstrument = new Instrument('Guitar', Guitar);




