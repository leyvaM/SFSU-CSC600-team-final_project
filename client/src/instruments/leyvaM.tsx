// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import "../xylophone.css"
// project imports
import { Instrument, InstrumentProps } from '../Instruments';

const Xylophone: React.FC<InstrumentProps> = ({ synth, setSynth }) => {
    // contains the paths and labels for each note in the instrument
    const XylophoneNotes = [
        { path: require("../XylophoneNotes/C4.wav"), label: "C4" },
        { path: require("../XylophoneNotes/D4.wav"), label: "D4" },
        { path: require("../XylophoneNotes/E4.wav"), label: "E4" },
        { path: require("../XylophoneNotes/F4.wav"), label: "F4" },
        { path: require("../XylophoneNotes/G4.wav"), label: "G4" },
        { path: require("../XylophoneNotes/A4.wav"), label: "A4" },
        { path: require("../XylophoneNotes/B4.wav"), label: "B4" },
        { path: require("../XylophoneNotes/C5.wav"), label: "C5" },
        { path: require("../XylophoneNotes/D5.wav"), label: "D5" },
        { path: require("../XylophoneNotes/E5.wav"), label: "E5" },
        { path: require("../XylophoneNotes/F5.wav"), label: "F5" },
        { path: require("../XylophoneNotes/G5.wav"), label: "G5" },
        { path: require("../XylophoneNotes/A5.wav"), label: "A5" },
    ];


    const [players, setPlayers] = useState<Tone.Player[]>([]);

    // used to load the audio samples
    useEffect(() => {
        setPlayers(XylophoneNotes.map((note) => loadSample(note.path)));
    }, []);

    // connects the player to the audio destination
    const loadSample = (url: string) => {
        return new Tone.Player(url).toDestination();
    };

    // function is called when a bar is clicked at a specified index
    const handleStringClick = (index: number) => {
        players[index].start();
    }

    // renders the xylophone component with clickable bar elements to play the notes
    return (
        <div className="xylophone">
            {XylophoneNotes.map((note, index) => {
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

export const XylophoneInstrument = new Instrument('Xylophone', Xylophone);