import * as d3 from 'd3'

import {Line, Circle} from './base/graph'

type Selection = d3.Selection<SVGGElement, any, any, any>

export function render(element: SVGSVGElement): void {
    const container = d3.select(element)
    const root = container.append('g')
    renderEdge(root)
    renderNode(root)
}

function renderNode(container: Selection): void {
    container.call(renderCircle, {center: {x: 100, y: 100}, r: 80})
    container.call(renderCircle, {center: {x: 300, y: 150}, r: 60})
    container.call(renderCircle, {center: {x: 200, y: 300}, r: 50})
}

function renderEdge(container: Selection): void {
    container.call(renderLine, {start: {x: 100, y: 100}, end: {x: 300, y: 150}})
    container.call(renderLine, {start: {x: 100, y: 100}, end: {x: 200, y: 300}})
    container.call(renderLine, {start: {x: 300, y: 150}, end: {x: 200, y: 300}})
}

function renderCircle(container: Selection, circle: Circle): void {
    container.append('circle')
        .attr('cx', circle.center.x)
        .attr('cy', circle.center.y)
        .attr('r', circle.r)
        .style('fill', '#e9e9e9')
}

function renderLine(container: Selection, line: Line): void {
    container
        .append('line')
        .attr('x1', line.start.x)
        .attr('y1', line.start.y)
        .attr('x2', line.end.x)
        .attr('y2', line.end.y)
        .style('stroke', 'rgba(0,0,0,0.38)')
}