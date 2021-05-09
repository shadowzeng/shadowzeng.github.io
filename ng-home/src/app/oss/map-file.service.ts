import {Injectable} from '@angular/core'
import * as OssClient from 'ali-oss'
import {getToday} from '../base'

const MAP_FILE_NAME = 'mindmap.json'

@Injectable({providedIn: 'root'})
export class MapFileService {
    public constructor() {
        this._client = new OssClient({
            region: 'oss-cn-shenzhen',
            bucket: 'shadow-mindmap',
            stsToken: "CAIS8wF1q6Ft5B2yfSjIr5DDE/KHv4wWgqvYVEHAhmtgOLoduYTghTz2IHxEe3NuBuoZv/Uyn2FR6/Yflqx6T55OSBRPz16OE9MFnzm6aq/t5uaXj9Vd+rDHdEGXDxnkprywB8zyUNLafNq0dlnAjVUd6LDmdDKkLTfHWN/z/vwBVNkMWRSiZjdrHcpfIhAYyPUXLnzML/2gQHWI6yjydBM55VEm1TwvtPjmkpzAs0Dk4QekmrNPlePYOYO5asRgBpB7Xuqu0fZ+Hqi7i3IAtEIUq/0p3f0Zomae44HAGT5U4hOKNuPMt9hmKgZ2a7Iql3CwTxlBPZYagAGH417nku0kxExP2sCaIFJ4XQD/v16TNtzsWFGCa9AnonjEcid7F2xVq7cpNuMcvTeauONRrjINT4XkaT5+ocwrkmi/glaxSzryrKXV/Dkm7q0r4R9iDqN0y68xcE4kjL9Ku1rDhNgHGazPq2xdSs/nTSA4pbfSuXnF3igQdSfHiw==",
            accessKeyId: "STS.NSvXH3RS75i3Vgqbk5451VAKg",
            accessKeySecret: "4NpqArAGm316W4pUxun5vse4dLA8zhkLYowSQB26arte",
        })
    }

    private _client: OssClient

    public save(file: File): Promise<OssClient.PutObjectResult> {
        return this._client.put(MAP_FILE_NAME, file)
    }

    public saveAsBackup(file: File): Promise<OssClient.PutObjectResult> {
        const date = getToday()
        return this._client.put(`mindmap-${date}.json`, file)
    }

    public get(): Promise<{}> {
        return this._client.get(MAP_FILE_NAME).then(result => {
            const string = new TextDecoder().decode(result.content)
            const json = JSON.parse(string)
            return json
        })
    }
}