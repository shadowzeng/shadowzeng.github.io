import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import * as OssClient from 'ali-oss'

import {getToday} from '../base'
import {FileProvider} from './file-provider'

const MAP_FILE_NAME = 'mindmap.json'

@Injectable({providedIn: 'root'})
export class EcsService extends FileProvider {
    public constructor(private readonly _http: HttpClient) {
        super()
    }

    public save(content: string): Promise<{}> {
        return this._http.post('http://120.78.165.39/file/save', content).toPromise()
    }

    public saveAs(content: string): Promise<{}> {
        return this._http.post('http://120.78.165.39/file/save_as', content).toPromise()
    }

    public get(): Promise<{}> {
        return this._http.get('http://120.78.165.39/file/get').toPromise()
    }
}