import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Router, UrlSerializer } from "@angular/router";

import { Heartrate } from "../Models/heartrate.model";
import { environment } from "../../environments/environment";


@Injectable({providedIn: 'root'})
export class HeartrateService {
    private heartrates: Heartrate[] = [];
    private heartratesUpdated = new Subject<Heartrate[]>();

    private heartratesSession: Heartrate[] = [];
    private heartratesSessionUpdated = new Subject<Heartrate[]>();

    constructor(private http: HttpClient,  private router: Router, private serializer: UrlSerializer) {}

    getHeartratesAll() {
        this.http.get<Heartrate[]>(environment.apiURL + "/heartrate")
        .subscribe((heartrateData) => {
            this.heartrates = heartrateData;
            this.heartratesUpdated.next([...this.heartrates]);
        });
    }

    getHeartratesUpdateListener() {
        return this.heartratesUpdated.asObservable();
    }


    getHeartRateBySessionID(sessionid: number) {

        console.log(environment.apiURL + "/heartrate/" + sessionid);
        this.http.get<Heartrate[]>(environment.apiURL + "/heartrate/" + sessionid)
            .subscribe((heartrateData) => {
                this.heartratesSession = heartrateData;
                this.heartratesSessionUpdated.next(this.heartratesSession);
            });
    }

    getHeartRateBySessionIDUpdateListener() {
        return this.heartratesSessionUpdated.asObservable();
    }

    createHeartrate(id: number, session: number, timecreated: string, heartratedata: number) {
        const heartrate: Heartrate = {
            id: 0,
            session: session,
            timecreated: timecreated,
            heartrate: heartratedata,
        }

        this.http.post<{message: string}>(environment.apiURL + "/heartrate", heartrate)
        .subscribe(response => {
            console.log(response.message);

            // NEED TO CHECK BACKEND CONFIRMATION

            // Add new user to list
            this.heartrates.push(heartrate);
            this.heartratesUpdated.next([...this.heartrates])
        });
    }

}
