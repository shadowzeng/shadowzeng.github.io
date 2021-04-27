// @ts-nocheck
import {testSvg, getSVGString} from './generate_svg'

const svg = document.getElementById('svg') // testSvg()
const {width, height} = svg.getBBox()
const svgStr = getSVGString(svg)
const blob = new Blob([svgStr], {type: 'image/svg+xml;charset=utf-8'})

const blobUrl = URL.createObjectURL(blob)

// const imgsrc = 'data:image/svg+xml;base64,'+ btoa( unescape( encodeURIComponent( svg ) ) ) // Convert SVG string to data URL

const canvas = document.createElement('canvas')
const context = canvas.getContext('2d')

canvas.width = width
canvas.height = height

// const image = new Image()
const image = document.getElementById('img')
image.onload = function() {
    context.clearRect ( 0, 0, width, height )
    context.drawImage(image, 0, 0, width, height)

    canvas.toBlob( function(blob) {
        // const filesize = Math.round( blob.length/1024 ) + ' KB'
        // if ( callback ) callback( blob, filesize )
        saveAs(blob)
    })
}

image.src = blobUrl

export function saveAs(blob: Blob | string, filename: string): void {
    if (!('download' in HTMLAnchorElement.prototype))
        return
    // Chrome & Firefox
    const a = document.createElement('a')
    a.download = filename
    a.rel = 'noopener'
    a.href = URL.createObjectURL(blob)
    eventClick(a)
    URL.revokeObjectURL(a.href)
}

function eventClick(node: HTMLElement): void {
    // tslint:disable-next-line: no-try
    try {
        node.dispatchEvent(new MouseEvent('click'))
    } catch (e) {
        const evt = document.createEvent('MouseEvents')
        evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0,
            // tslint:disable-next-line:no-null-keyword
            false, false, false, false, 0, null)
        node.dispatchEvent(evt)
    }
}
