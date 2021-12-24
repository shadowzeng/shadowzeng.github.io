// @ts-nocheck
import * as d3 from 'd3'
import {Map} from '../map'
import {Event} from './events'
import {ZoomBehavior} from 'd3-zoom'
import Log from '../../utils/log'

/**
 * Manage the zoom events of the map.
 */
export default class Zoom {

    private map: Map

    private zoomBehavior: ZoomBehavior<any, any>

    /**
     * Get the associated map instance and initialize the d3 zoom behavior.
     * @param {Map} map
     */
    constructor(map: Map) {
        this.map = map

        this.zoomBehavior = d3.zoom().scaleExtent([1/8, 2]).on('zoom', (event) => {
            this.map.dom.g.attr('transform', event.transform)
            this.map.events.call(Event.zoom)
        })
    }

    /**
     * Zoom in the map.
     * @param {number} duration
     */
    public zoomIn = (duration?: number) => {
        if (duration && typeof duration !== 'number') {
            Log.error('The parameter must be a number', 'type')
        }

        this.move(true, duration)
        this.map.events.call(Event.zoomIn)
    }

    /**
     * Zoom out the map.
     * @param {number} duration
     */
    public zoomOut = (duration?: number) => {
        if (duration && typeof duration !== 'number') {
            Log.error('The parameter must be a number', 'type')
        }

        this.move(false, duration)
        this.map.events.call(Event.zoomOut)
    }

    /**
     * Center the root node in the mind map.
     * @param {number} duration
     * @param {number} type
     */
    public center = (type?: 'zoom' | 'position', duration = 500) => {
        if (type && type !== 'zoom' && type !== 'position') {
            Log.error('The type must be a string ("zoom" or "position")', 'type')
        }

        if (duration && typeof duration !== 'number') {
            Log.error('The duration must be a number', 'type')
        }

        const root = this.map.nodes.getRoot(),
            w = this.map.dom.container.node().clientWidth,
            h = this.map.dom.container.node().clientHeight,
            x = w / 2 - root.coordinates.x,
            y = h / 2 - root.coordinates.y,
            svg = this.map.dom.svg.transition().duration(duration)

        switch (type) {
            case 'zoom':
                this.zoomBehavior.scaleTo(svg, 1)
                break
            case 'position':
                this.zoomBehavior.translateTo(svg, w / 2 - x, h / 2 - y)
                break
            default:
                this.zoomBehavior.transform(svg, d3.zoomIdentity.translate(x, y))
        }

        this.map.events.call(Event.center)
    }

    public centerRootGroup(): void {
        const svgBox = this.map.dom.svg?.node()?.getBBox()
        const groupBox = this.map.dom.g?.node()?.getBBox()
        if (!svgBox || !groupBox)
            return
    }

    /**
     * Return the d3 zoom behavior.
     * @returns {ZoomBehavior} zoom
     */
    public getZoomBehavior(): ZoomBehavior<any, any> {
        return this.zoomBehavior
    }

    /**
     * Move the zoom in a direction (true: in, false: out).
     * @param {boolean} direction
     * @param {number} duration
     */
    private move(direction: boolean, duration = 50) {
        const svg = this.map.dom.svg.transition().duration(duration)

        this.zoomBehavior.scaleBy(svg, direction ? 4 / 3 : 3 / 4)
    }

}
