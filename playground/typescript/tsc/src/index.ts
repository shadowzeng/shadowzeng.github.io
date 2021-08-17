import {flatten} from 'lodash'
import {foo} from './ts-lib/foo'

export interface IUser {
    readonly id: number
    readonly name: string
}

export class User implements IUser {
    public constructor(public id: number, public name: string) {}
}

export function showUserName(user: User): void {
    console.log(user.name)
}
foo()
flatten(['1'])