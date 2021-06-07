import * as d3 from 'd3'

import {NodeProperties} from './node_properties'
import {Dimensions, Coordinates, Image, Colors, Font} from './user_node_properties'

/**
 * Model of the nodes.
 */
export default class Node implements NodeProperties {
    public id: string
    public parent: NodeProperties | null = null
    public k: number

    public name: string
    public dimensions: Dimensions
    public coordinates: Coordinates
    public image: Image
    public colors: Colors
    public font: Font
    public locked: boolean
    public dom!: SVGGElement
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public payload?: any

    /**
     * Initialize the node properties, the dimensions and the k coefficient.
     * @param {NodeProperties} properties
     */
    constructor(properties: NodeProperties) {
        this.id = properties.id
        this.parent = properties.parent
        this.name = properties.name
        this.coordinates = properties.coordinates
        this.colors = properties.colors
        this.image = properties.image
        this.font = properties.font
        this.locked = properties.locked
        this.payload = properties.payload

        this.dimensions = {
            width: 0,
            height: 0
        }
        this.k = properties.k || d3.randomUniform(-20, 20)()
    }

    /**
     * Return true if the node is the root or false.
     * @returns {boolean}
     */
    public isRoot(): boolean {
        const words = this.id.split('_')
        return words[words.length - 1] === '0'
    }

    /**
     * Return the level of the node.
     * @returns {number} level
     */
    public getLevel(): number {
        let level = 1, parent = this.parent

        while (parent) {
            level++
            parent = parent.parent
        }

        return level
    }

    /**
     * Return the div element of the node name.
     * @returns {HTMLDivElement} div
     */
    public getNameDOM(): HTMLDivElement {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this.dom.querySelector('foreignObject > div')!
    }

    /**
     * Return the SVG path of the node background.
     * @returns {SVGPathElement} path
     */
    public getBackgroundDOM(): SVGPathElement {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this.dom.querySelector('path')!
    }

    /**
     * Return the SVG image of the node image.
     * @returns {SVGImageElement} image
     */
    public getImageDOM(): SVGImageElement {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this.dom.querySelector('image')!
    }

}

