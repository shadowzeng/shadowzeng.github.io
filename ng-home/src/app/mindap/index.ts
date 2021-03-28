import {OptionParameters} from './map/options'
import {Map, MindapInstance} from './map/map'

export {MindapInstance}

/**
 * Return a mmp object with all mmp functions.
 * @param {string} id
 * @param {OptionParameters} options
 * @returns {Map}
 */
export function create(id: string, options?: OptionParameters): MindapInstance {
    // @ts-ignore
    return new Map(id, options)
}

