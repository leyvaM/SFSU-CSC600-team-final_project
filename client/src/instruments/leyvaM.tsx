// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import "../xylophone.css"
// project imports
import { Instrument, InstrumentProps } from '../Instruments';

const Xylophone: React.FC<InstrumentProps> = ({ synth, setSynth }) => {
    const XylophoneNotes = [
        { path: require("../XylophoneNotes/C5.wav"), label: "C5" },
        { path: require("../XylophoneNotes/D5.wav"), label: "D5" },
        { path: require("../XylophoneNotes/E5.wav"), label: "E5" },
        { path: require("../XylophoneNotes/F5.wav"), label: "F5" },
        { path: require("../XylophoneNotes/G5.wav"), label: "G5" },
        { path: require("../XylophoneNotes/A5.wav"), label: "A5" },
        { path: require("../XylophoneNotes/B5.wav"), label: "B5" },
        { path: require("../XylophoneNotes/C6.wav"), label: "C6" },
    ];


    const [players, setPlayers] = useState<Tone.Player[]>([]);

    useEffect(() => {
        setPlayers(XylophoneNotes.map((note) => loadSample(note.path)));
    }, []);

    const loadSample = (url: string) => {
        return new Tone.Player(url).toDestination();
    };

    const handleStringClick = (index: number) => {
        players[index].start();
    }

    return (
        <div className="xylophone">
            {XylophoneNotes.map((note, index) => {
                //const player = loadSample(Xylophone.path);
                return (
                    <div
                        key={note.label}
                        className={classNames("bar", note.label.toLowerCase())}
                        onClick={() => handleStringClick(index)}>
                        <div className="steel-screw"></div>
                        <div className="steel-screw"></div>

                    </div>
                );
            })}
        </div>
    );
};

export const XylophoneInstrument = new Instrument('leyvaM', Xylophone);