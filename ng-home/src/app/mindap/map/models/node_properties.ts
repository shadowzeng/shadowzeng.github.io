import {UserNodeProperties} from './user_node_properties'

export interface NodeProperties extends UserNodeProperties {
    id: string
    parent: NodeProperties | null
    k?: number
}