// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import {FluteInstrument} from './instruments/bsoukup1108';

import { MPCInstrument } from './instruments/MPC';
import { HarpInstrument } from './instruments/Harp';
import {GuitarVisualizer} from './visualizers/GuitarWaveform';
import {GuitarInstrument} from './instruments/leyvaM';
import { WaveformVisualizer } from './visualizers/Waveform';
import { BeatDetector } from './visualizers/FlashingLights';



/** ------------------------------------------------------------------------ **
 * The entire application state is stored in AppState.
 ** ------------------------------------------------------------------------ */
export type AppState = Map<string, any>;           // similar to { [id: string]: any }

/**
 * Start with the default piano instrument.
 * Add your instruments to this list.
 */
const instruments = List([PianoInstrument, GuitarInstrument, FluteInstrument, MPCInstrument, HarpInstrument]);        // similar to Instrument[]

/**
 * Start with the default waveform visualizer.
 * Add your visualizers to this list.
 */

const visualizers = List([WaveformVisualizer, BeatDetector, GuitarVisualizer]);    // similar to Visualizer[]

/**
 * The default application state contains a list of instruments and a list of visualizers.
 *
 * 'instrument': List<Instrument>
 * 'visualizer': List<Visualizer>
 */
export const defaultState: AppState = Map<string, any>({
  'instruments': instruments,
  'visualizers': visualizers,
});