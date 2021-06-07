import {UserNodeProperties} from './user_node_properties'

export interface ExportNodeProperties extends UserNodeProperties {
    id: string
    parent: string
    k: number
}