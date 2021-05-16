import {render} from './graph'

// @ts-ignore
const svg = document.getElementById('svg') as SVGSVGElement
if (svg)
    render(svg)