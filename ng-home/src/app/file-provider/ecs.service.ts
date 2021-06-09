import {HttpClient} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {MatSnackBar} from '@angular/material/snack-bar'
import {Observable} from 'rxjs'
import {map, catchError} from 'rxjs/operators'

import {FileProvider} from './file-provider'

const SERVER_ADDRESS = 'http://120.78.165.39'

@Injectable({providedIn: 'root'})
export class EcsService extends FileProvider {
    public constructor(
        private readonly _snackbar: MatSnackBar,
        private readonly _http: HttpClient,
    ) {
        super()
    }

    public save(content: string): Promise<any> {
        return this._http.post(`${SERVER_ADDRESS}/file/save`, content).toPromise()
    }

    public saveAs(content: string): Promise<{}> {
        return this._http.post(`${SERVER_ADDRESS}/file/save_as`, content).toPromise()
    }

    public get(): Promise<{}> {
        return this._http.get(`${SERVER_ADDRESS}/file/get`).pipe(
            map(content => JSON.parse(content as string)),
            catchError(() => {
                this._snackbar.open('读取ECS服务器文件出错，当前显示备份文件')
                return this._getLocalFile()
            })
        ).toPromise()
    }

    private _getLocalFile(): Observable<any> {
        return this._http.get('./data/map.json')
    }
}
