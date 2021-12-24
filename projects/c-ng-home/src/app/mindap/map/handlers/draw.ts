// @ts-nocheck
import * as d3 from 'd3'
import {Map} from '../map'
import Utils from '../../utils/utils'
import {Selection} from '../../utils/types'
import Node from '../models/node'
import {Path} from 'd3-path'
import {Event} from './events'

/**
 * Draw the map and update it.
 */
export default class Draw {

    private map: Map

    /**
     * Get the associated map instance.
     * @param {Map} map
     */
    constructor(map: Map) {
        this.map = map
    }

    /**
     * Create svg and main css map properties.
     */
    public create(): void {
        this.map.dom.container = d3.select('#' + this.map.id)

        this.map.dom.svg = this.map.dom.container.append('svg')
            .style('width', '100%')
            .style('height', '100%')
            .style('top', 0)
            .style('left', 0)

        this.map.dom.svg.append('rect')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('fill', 'white')
            .attr('pointer-events', 'all')
            .on('click', () => {
                // Deselect the selected node when click on the map background
                this.map.nodes.deselectNode()
            })

        this.map.dom.g = this.map.dom.svg.append('g')
    }

    /**
     * Update the dom of the map with the (new) nodes.
     */
    public update(): void {
        const nodes = this.map.nodes.getNodes(),
            dom = {
                nodes: this.map.dom.g.selectAll('.' + this.map.id + '_node').data(nodes),
                // 除去根节点，其余节点每个和其父节点对应一个branch
                branches: this.map.dom.g.selectAll('.' + this.map.id + '_branch').data(nodes.slice(1))
            }
        let tapedTwice = false

        const outer = dom.nodes.enter().append('g')
            .style('cursor', 'pointer')
            .attr('class', this.map.id + '_node')
            .attr('id', function (node: Node) {
                node.dom = this
                return node.id
            })
            .attr('transform', (node: Node) => 'translate(' + node.coordinates.x + ',' + node.coordinates.y + ')')
            .on('dblclick', (event: MouseEvent, node: Node) => {
                this.enableNodeNameEditing(node)
            })
            .on('click', (_: MouseEvent, node: Node) => {
              this.map.nodes.selectNode(node.id)
            })
            .on('touchstart', (event: MouseEvent, node: Node) => {
                if (!tapedTwice) {
                    tapedTwice = true
                    setTimeout(function () {
                        tapedTwice = false
                    }, 300)
                    return false
                }
                this.enableNodeNameEditing(node)
            })

        if (this.map.options.drag === true) {
            outer.call(this.map.drag.getDragBehavior())
        } else {
            outer.on('mousedown', (event: MouseEvent, node: Node) => {
                this.map.nodes.selectNode(node.id)
            })
        }

        // Set text of the node
        outer.insert('foreignObject')
            .html((node: Node) => this.createNodeNameDOM(node))
            .each((node: Node) => {
                this.updateNodeNameContainer(node)
            })

        // Set background of the node
        outer.insert('path', 'foreignObject')
            // .style('fill', (node: Node) => node.colors.background)
            .style('fill', 'white')
            .style('stroke-width', 1)
            .style('stroke', 'rgb(87, 122, 150)')
            .attr('d', (node: Node) => this.drawNodeBackground(node))
            .on('contextmenu', (e: MouseEvent, node: Node) => {
                e.preventDefault()
                this.map.events.call(Event.nodeContentEdit, undefined, node)
            })

        // Set image of the node
        outer.each((node: Node) => {
            this.setImage(node)
            this.setPayloadFlag(node)
        })


        dom.branches.enter().insert('path', 'g')
            .style('fill', 'none')
            .style('stroke', (node: Node) => node.colors.branch)
            .attr('class', this.map.id + '_branch')
            .attr('id', (node: Node) => node.id + '_branch')
            .attr('d', (node: Node) => this.drawBranch(node))

        dom.nodes.exit().remove()
        dom.branches.exit().remove()
    }

    /**
     * Remove all nodes and branches of the map.
     */
    public clear(): void {
        d3.selectAll('.' + this.map.id + '_node, .' + this.map.id + '_branch').remove()
    }

    /**
     * Draw the background shape of the node.
     * @param {Node} node
     * @returns {Path} path
     */
    public drawNodeBackground(node: Node): Path {
        const name = node.getNameDOM(), path = d3.path()

        node.dimensions.width = name.clientWidth + 24
        node.dimensions.height = name.clientHeight + 5

        const x = node.dimensions.width / 2,
            y = node.dimensions.height / 2
            // k = node.k

        const r = 4
        path.moveTo(-x, 0)
        path.arcTo(-x, -y, -x + r, -y, r)
        path.arcTo(x, -y, x, -y + r, r)
        path.arcTo(x, y, x - r, y, r)
        path.arcTo(-x, y, -x, y - r, r)
        path.closePath()
        return path
    }

    /**
     * Draw the branch of the node.
     * @param {Node} node
     * @returns {Path} path
     */
    public drawBranch(node: Node): Path {
        const parent = node.parent,
            path = d3.path(),
            level = node.getLevel(),
            width = 22 - (level < 6 ? level : 6) * 3,
            mx = (parent.coordinates.x + node.coordinates.x) / 2,
            ory = parent.coordinates.y < node.coordinates.y + node.dimensions.height / 2 ? -1 : 1,
            orx = parent.coordinates.x > node.coordinates.x ? -1 : 1,
            inv = orx * ory

        path.moveTo(parent.coordinates.x, parent.coordinates.y)
        // path.bezierCurveTo(
        //     mx - width * inv, parent.coordinates.y - width / 2,
        //     parent.coordinates.x - width / 2 * inv, node.coordinates.y + node.dimensions.height / 2 - width / 3,
        //     node.coordinates.x, node.coordinates.y
        // )
        path.lineTo(node.coordinates.x, node.coordinates.y)
        // path.bezierCurveTo(
        //     parent.coordinates.x + width / 2 * inv, node.coordinates.y + node.dimensions.height / 2 + width / 3,
        //     mx + width * inv, parent.coordinates.y + width / 2,
        //     parent.coordinates.x, parent.coordinates.y + width * .8
        // )
        // path.closePath()

        return path
    }

    /**
     * Update the node HTML elements.
     * @param {Node} node
     */
    public updateNodeShapes(node: Node): void {
        const background = node.getBackgroundDOM()

        d3.select(background).attr('d', (node: Node) => <any>this.drawNodeBackground(node))
        d3.selectAll('.' + this.map.id + '_branch').attr('d', (node: Node) => <any>this.drawBranch(node))

        this.updateImagePosition(node)

        this.updateNodeNameContainer(node)
    }

    /**
     * Set main properties of node image and create it if it does not exist.
     * @param {Node} node
     */
    public setImage(node: Node): void {
        let domImage = node.getImageDOM()

        if (!domImage) {
            domImage = document.createElementNS('http://www.w3.org/2000/svg', 'image')
            node.dom.appendChild(domImage)
        }

        if (node.image.src !== '') {
            const image = new Image()

            image.src = node.image.src

            image.onload = function () {
                const h = node.image.size,
                    w = (<any>this).width * h / (<any>this).height,
                    y = -(h + node.dimensions.height / 2 + 5),
                    x = -w / 2

                domImage.setAttribute('href', node.image.src)
                domImage.setAttribute('height', h.toString())
                domImage.setAttribute('width', w.toString())
                domImage.setAttribute('y', y.toString())
                domImage.setAttribute('x', x.toString())
            }

            image.onerror = function () {
                domImage.remove()
                node.image.src = ''
            }
        } else {
            domImage.remove()
        }
    }

    public setPayloadFlag(node: Node): void {
        if (!node.payload || !node.payload.content)
            return
        const {width, height} = node.dimensions
        const r = 4
        const cx = (-width/2 + 4 + r)
        const cy = (height/2 - 4 - r)
        d3.select(node.dom)
            .append('circle')
            .style('fill', 'darkseagreen')
            .attr('cx', cx)
            .attr('cy', cy)
            .attr('r', r)
            .on('click', () => {
                this.map.events.call(Event.nodePayloadSelect, undefined, node.dom, node.payload)
            })
    }

    /**
     * Update the node image position.
     * @param {Node} node
     */
    public updateImagePosition(node: Node): void {
        if (node.image.src !== '') {
            const image = node.getImageDOM(),
                y = -((<any>image).getBBox().height + node.dimensions.height / 2 + 5)
            image.setAttribute('y', y.toString())
        }
    }

    /**
     * Enable and manage all events for the name editing.
     * @param {Node} node
     */
    public enableNodeNameEditing(node: Node): void {
        if (this.map.options.readonly)
            return
        const name = node.getNameDOM()

        Utils.focusWithCaretAtEnd(name)

        name.style.setProperty('cursor', 'auto')

        name.ondblclick = name.onmousedown = (event) => {
            event.stopPropagation()
        }

        name.oninput = () => {
            this.updateNodeShapes(node)
        }

        // Allow only some shortcuts.
        name.onkeydown = (event) => {
            // Unfocus the node.
            if (event.code === 'Escape') {
                Utils.removeAllRanges()
                name.blur()
            }

            if (event.ctrlKey || event.metaKey) {
                switch (event.code) {
                    case 'KeyA':
                    case 'KeyC':
                    case 'KeyV':
                    case 'KeyX':
                    case 'KeyZ':
                    case 'ArrowLeft':
                    case 'ArrowRight':
                    case 'ArrowUp':
                    case 'ArrowDown':
                    case 'Backspace':
                    case 'Delete':
                        return true
                    default:
                        return false
                }
            }

            switch (event.code) {
                case 'Tab':
                    return false
                default:
                    return true
            }
        }

        // Remove html formatting when paste text on node
        name.onpaste = (event) => {
            event.preventDefault()

            const text = event.clipboardData.getData('text/plain')

            document.execCommand('insertHTML', false, text)
        }

        name.onblur = () => {
            name.innerHTML = name.innerHTML === '<br>' ? '' : name.innerHTML

            if (name.innerHTML !== node.name) {
                this.map.nodes.updateNode('name', name.innerHTML)
            }

            name.ondblclick = name.onmousedown = name.onblur =
                name.onkeydown = name.oninput = name.onpaste = null

            name.style.setProperty('cursor', 'pointer')

            name.blur()
        }
    }

    /**
     * Update node name container (foreign object) dimensions.
     * @param {Node} node
     */
    private updateNodeNameContainer(node: Node) {
        const name = node.getNameDOM(),
            foreignObject: SVGForeignObjectElement = <SVGForeignObjectElement>name.parentNode

        if (name.offsetWidth !== 0) {
            foreignObject.setAttribute('x', (-name.clientWidth / 2).toString())
            foreignObject.setAttribute('y', (-name.clientHeight / 2).toString())
            foreignObject.setAttribute('width', name.clientWidth.toString())
            foreignObject.setAttribute('height', name.clientHeight.toString())
        }
    }

    /**
     * Create a string with HTML of the node name div.
     * @param {Node} node
     * @returns {string} html
     */
    private createNodeNameDOM(node: Node) {
        const div = document.createElement('div')

        // TODO: use font size stored in node.
        div.style.setProperty('font-size', '14px')
        div.style.setProperty('color', node.colors.name)
        div.style.setProperty('font-style', node.font.style)
        div.style.setProperty('font-weight', node.font.weight)
        div.style.setProperty('text-decoration', node.font.decoration)

        div.style.setProperty('outline', 'none')
        div.style.setProperty('display', 'inline-block')
        div.style.setProperty('white-space', 'pre')
        div.style.setProperty('font-family', this.map.options.fontFamily)
        div.style.setProperty('text-align', 'center')
        div.style.setProperty('vertical-align', 'text-top')
        div.style.setProperty('line-height', '16px')

        if (!this.map.options.readonly)
            div.setAttribute('contenteditable', 'true')

        div.innerHTML = node.name

        return div.outerHTML
    }

}
