import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Router, UrlSerializer } from "@angular/router";

import { Session } from "../Models/sessions.model";
import { environment } from "../../environments/environment";


@Injectable({providedIn: 'root'})
export class SessionsService {
    private sessions: Session[] = [];
    private sessionsUpdated = new Subject<Session[]>();

    constructor(private http: HttpClient,  private router: Router, private serializer: UrlSerializer) {}

    getSessionsAll() {
        this.http.get<Session[]>(environment.apiURL + "/sessions")
        .subscribe((sessionData) => {
            this.sessions = sessionData;
            this.sessionsUpdated.next([...this.sessions]);
        });
    }

    getSessionsUpdateListener() {
        return this.sessionsUpdated.asObservable();
    }


    // getHeartRateByID(id: number) {

    //     console.log(environment.apiURL + "/craftbeers/" + id);
    //     this.http.get<Heartrate>(environment.apiURL + "/craftbeers/" + id)
    //         .subscribe((craftbeer) => {
    //             this.craftbeer = craftbeer;
    //             this.craftbeerUpdated.next(this.craftbeer);
    //         });
    // }

    // getCraftBeerByIDUpdateListener() {
    //     return this.craftbeerUpdated.asObservable();
    // }

    createSession(id: number, session: number, timecreated: string) {
        const sessiondata: Session = {
            id: 0,
            session: session,
            timecreated: timecreated
        }

        this.http.post<{message: string}>(environment.apiURL + "/sessions", sessiondata)
        .subscribe(response => {
            console.log(response.message);

            // NEED TO CHECK BACKEND CONFIRMATION

            // Add new user to list
            this.sessions.push(sessiondata);
            this.sessionsUpdated.next([...this.sessions])
        });
    }

}
