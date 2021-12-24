// @ts-nocheck
import * as d3 from 'd3'
import {Map} from '../map'
import Node from '../models/node'
import {Event} from './events'
import {DragBehavior} from 'd3-drag'

/**
 * Manage the drag events of the nodes.
 */
export default class Drag {

    private map: Map

    private dragBehavior: DragBehavior<any, any, any>
    private dragging: boolean
    private orientation: boolean
    private descendants: Node[]

    /**
     * Get the associated map instance and initialize the d3 drag behavior.
     * @param {Map} map
     */
    constructor(map: Map) {
        this.map = map

        if (!map.options.readonly)
            this.dragBehavior = d3.drag()
                .on('start', (event, node: Node) => this.started(node, event))
                .on('drag', (event, node: Node) => this.dragged(node, event))
                .on('end', (event, node: Node) => this.ended(node))
    }

    /**
     * Return the d3 drag behavior
     * @returns {DragBehavior} dragBehavior
     */
    public getDragBehavior(): DragBehavior<any, any, any> {
        return this.dragBehavior
    }

    /**
     * Select the node and calculate node position data for dragging.
     * @param {Node} node
     */
    private started(node: Node, event) {
        event.sourceEvent.preventDefault()

        this.orientation = this.map.nodes.getOrientation(node)
        this.descendants = this.map.nodes.getDescendants(node)

        this.map.nodes.selectNode(node.id)
    }

    /**
     * Move the dragged node and if it is locked all their descendants.
     * @param {Node} node
     */
    private dragged(node: Node, event): void {
        const dy = event.dy, dx = event.dx

        // Set new coordinates
        const x = node.coordinates.x += dx, y = node.coordinates.y += dy

        // Move graphically the node in new coordinates
        node.dom.setAttribute('transform', 'translate(' + [x, y] + ')')

        // If the node is locked move also descendants
        if (node.locked) {
            // Check if old and new orientation are equal
            const newOrientation = this.map.nodes.getOrientation(node),
                orientationIsChanged = newOrientation !== this.orientation,
                root = node

            for (const node of this.descendants) {
                let x = node.coordinates.x += dx, y = node.coordinates.y += dy

                if (orientationIsChanged) {
                    x = node.coordinates.x += (root.coordinates.x - node.coordinates.x) * 2
                }

                node.dom.setAttribute('transform', 'translate(' + [x, y] + ')')
            }

            if (orientationIsChanged) {
                this.orientation = newOrientation
            }
        }

        // Update all mind map branches
        d3.selectAll('.' + this.map.id + '_branch').attr('d', (node: Node) => {
            return <any>this.map.draw.drawBranch(node)
        })

        // This is here and not in the started function because started function
        // is also executed when there is no drag events
        this.dragging = true
    }

    /**
     * If the node was actually dragged change the state of dragging and save the snapshot.
     * @param {Node} node
     */
    private ended(node: Node) {
        if (this.dragging) {
            this.dragging = false
            this.map.history.save()
            this.map.events.call(Event.nodeUpdate, node.dom, this.map.nodes.getNodeProperties(node))
        }
    }

}
