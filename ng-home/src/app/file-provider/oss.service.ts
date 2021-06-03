import {Injectable} from '@angular/core'
import * as OssClient from 'ali-oss'

import {getToday} from '../base'
import {FileProvider} from './file-provider'

const MAP_FILE_NAME = 'mindmap.json'

@Injectable({providedIn: 'root'})
export class OssService extends FileProvider {
    public constructor() {
        super()
        this._client = new OssClient({
            region: 'oss-cn-shenzhen',
            bucket: 'shadow-mindmap',
            stsToken: "CAIS8wF1q6Ft5B2yfSjIr5bYJc3wuJ1O1PvSRR/wtzkCSdgfh5XOpzz2IHxEe3NuBuoZv/Uyn2FR6/Yflqx6T55OSBQRiln0ENMFnzm6aq/t5uaXj9Vd+rDHdEGXDxnkprywB8zyUNLafNq0dlnAjVUd6LDmdDKkLTfHWN/z/vwBVNkMWRSiZjdrHcpfIhAYyPUXLnzML/2gQHWI6yjydBM55VEm1TwvtPjmkpzAs0Dk4QekmrNPlePYOYO5asRgBpB7Xuqu0fZ+Hqi7i3IAtEIUq/0p3f0Zomae44HAGT5U4hOKNuPMt9hmKgZ2a7Iql3CwTxlBPZYagAEn0zjkI4SCEAIa9nJfEiuciNlqkYWCihRq76RAoO/Je4f7SMA/PthOgK7QtHfYcWvyhDOJl/dWCpBtpfzTq1Bf3ZXr9gSMJVhFi7haZ9YrMm3HkpUOHoUi1obB7z4APVn+m1ljOgirt9l7a+wECyYe9cDH4IaC8Z1YmUJycvFRyA==",
            accessKeyId: "STS.NUmnwDUBoc99G9AS9WEW3hPeE",
            accessKeySecret: "GxuEYCmHmGPg8QDtScp7nCm1WwK4QCoy735UUHZb1wBP",
        })
    }

    private _client: OssClient

    public save(file: File): Promise<OssClient.PutObjectResult> {
        return this._client.put(MAP_FILE_NAME, file)
    }

    public saveAs(file: File): Promise<OssClient.PutObjectResult> {
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