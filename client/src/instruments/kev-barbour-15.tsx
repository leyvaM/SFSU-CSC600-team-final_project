import { useState, useEffect } from "react";
import * as Tone from "tone";
import classNames from "classnames";
import { List } from "immutable";
import "../MPC.css";
import { mpcInstrument, mpcInstrumentProps } from "../Instruments";

interface PadProps {
  note: string;
  synth: Tone.MembraneSynth;
  index: number;
}

export function DrumPad({ note, synth, index }: PadProps): JSX.Element {
  return (
    <div
      onMouseDown={() => synth?.triggerAttackRelease(note, "8n")}
      onMouseUp={() => synth?.triggerRelease()}
      className={classNames("pad-button")}
    >
      {note}
    </div>
  );
}

function DrumType({ title, onClick, active }: any): JSX.Element {
  return (
    <div className="option" onClick={onClick}>
      {title}
    </div>
  );
}

function MPC({ synth, setSynth }: mpcInstrumentProps): JSX.Element {
  const [selectedPreset, setSelectedPreset] = useState<string>("");
  const [currentPreset, setCurrentPreset] = useState<string>("");
  const synthPresets: List<string> = List([
    "clap",
    "tom",
    "kick",
    "hihat",
    "snare",
  ]);

  const pads = List([
    { note: "C3", idx: 0 },
    { note: "D3", idx: 0.25 },
    { note: "E3", idx: 0.5 },
    { note: "F3", idx: 0.75 },
    { note: "G3", idx: 1 },
    { note: "A3", idx: 1.25 },
    { note: "B3", idx: 1.5 },
    { note: "C4", idx: 1.75 },
    { note: "D4", idx: 2 },
    { note: "E4", idx: 2.25 },
    { note: "F4", idx: 2.5 },
    { note: "G4", idx: 2.75 },
    { note: "A4", idx: 3 },
    { note: "B4", idx: 3.25 },
    { note: "C5", idx: 3.5 },
    { note: "D5", idx: 3.75 },
  ]);

  let presets: { [key: string]: Partial<Tone.MembraneSynthOptions> } = {
    tom: { pitchDecay: 0.4, octaves: 4 },
    kick: {
      pitchDecay: 0.05,
      octaves: 2.6,
      envelope: {
        sustain: 0.01,
        decay: 0.8,
        attack: 0.02,
        release: 1.4,
        attackCurve: "linear",
        releaseCurve: "exponential",
        decayCurve: "exponential",
      },
    },
    hihat: {
      pitchDecay: 0.01,
      octaves: 6,
      oscillator: {
        type: "square4",
        volume: 0,
        phase: 0,
        mute: false,
        onstop: () => {},
      },
      envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0.01,
        release: 0.1,
        attackCurve: "exponential",
        decayCurve: "exponential",
        releaseCurve: "exponential",
      },
    },
    snare: {
      pitchDecay: 0.01,
      octaves: 3,
      envelope: {
        sustain: 0.02,
        decay: 0.3,
        attack: 0.01,
        release: 1.2,
        attackCurve: "linear",
        releaseCurve: "exponential",
        decayCurve: "exponential",
      },
    },
    clap: {
      pitchDecay: 0.1,
      octaves: 3,
      oscillator: {
        type: "sine",
        volume: 0,
        phase: 0,
        mute: false,
        onstop: () => {},
      },
      envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0.01,
        release: 0.1,
        attackCurve: "exponential",
        decayCurve: "exponential",
        releaseCurve: "exponential",
      },
    },
  };

  const setSynthPreset = (presetName: string) => {
    setSelectedPreset(presetName);
    setSynth((oldSynth) => {
      oldSynth.dispose();

      const preset = presets[presetName];
      return new Tone.MembraneSynth({
        ...Tone.MembraneSynth.getDefaults(),
        ...preset,
      }).toDestination();
    });
    setCurrentPreset(presetName);
  };

  useEffect(() => {
    setSynthPreset("clap");
  }, []);
  return (
    <div className="mpc">
      <div className="drum-pad">
        {pads.map((pad) => (
          <DrumPad
            key={pad.note}
            note={pad.note}
            synth={synth}
            index={pad.idx}
          />
        ))}
      </div>
      <div
        className="preset-and-options"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div className="selected-preset">Drum Type: {selectedPreset}</div>
        <div className="options-container">
          {synthPresets.map((p) => (
            <div className="options">
              <DrumType
                key={p}
                title={p}
                onClick={() => setSynthPreset(p)}
                active={synth?.get().pitchDecay === p}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const MPCInstrument = new mpcInstrument("MPC", MPC);
