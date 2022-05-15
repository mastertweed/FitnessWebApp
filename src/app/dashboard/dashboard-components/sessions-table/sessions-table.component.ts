import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Heartrate } from 'src/app/Models/heartrate.model';
import { HeartrateService } from 'src/app/Services/heartrate.service';
import { Session } from 'src/app/Models/sessions.model';
import { SessionsService } from 'src/app/Services/sessions.service';

@Component({
  selector: 'app-sessions-table',
  templateUrl: './sessions-table.component.html',
  styleUrls: ['./sessions-table.component.css']
})
export class SessionsTableComponent implements OnInit {


  heartrates: Heartrate[] = [];
  private heartratesSub: Subscription = new Subscription;

  private heartratesSessionSub: Subscription = new Subscription;

  sessions: Session[] = [];
  private sessionsSub: Subscription = new Subscription;

  constructor(private heartratesService: HeartrateService, private sessionsService: SessionsService) {
  }

  ngOnInit(): void {
    // Get all heartrate data
    this.heartratesService.getHeartratesAll()
    this.heartratesSub = this.heartratesService.getHeartratesUpdateListener()
      .subscribe((heartrates) => {
        this.heartrates = heartrates
      })

    // Get all session data
    this.sessionsService.getSessionsAll()
    this.sessionsSub = this.sessionsService.getSessionsUpdateListener()
      .subscribe((sessions) => {
        this.sessions = sessions
      })
  }

  showSession(session: number) {
    this.heartratesService.getHeartRateBySessionID(session)
    this.heartratesSessionSub = this.heartratesService.getHeartRateBySessionIDUpdateListener()
    .subscribe((heartrates) => {
      this.heartrates = heartrates
    })
  }

  ngOnDestroy() {
		this.heartratesSub.unsubscribe();
    this.sessionsSub.unsubscribe();
	}

}
