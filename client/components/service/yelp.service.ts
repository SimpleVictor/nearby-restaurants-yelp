import { Injectable } from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs/Rx";

@Injectable()
export class YelpService{

    constructor(private _http: Http){ }
    //Simple request to the backend to grab the data
    sendLocationBack(position){
        return this._http.post('/api', position)
            .map((response: Response) => response.json());
    }

}
