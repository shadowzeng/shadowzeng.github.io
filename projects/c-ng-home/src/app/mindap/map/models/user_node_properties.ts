export interface UserNodeProperties {
    name: string
    coordinates: Coordinates
    image: Image
    colors: Colors
    font: Font
    locked: boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload?: any
}

export interface Coordinates {
    x: number
    y: number
}

export interface Dimensions {
    width: number
    height: number
}

export interface Image {
    src: string
    size: number
}

export interface Colors {
    name: string
    background: string
    branch: string
}

export interface Font {
    size: number
    style: string
    weight: string
    decoration: string
}