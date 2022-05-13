import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Heartrate } from 'src/app/Models/heartrate.model';
import { HeartrateService } from 'src/app/Services/heartrate.service';
import { Session } from 'src/app/Models/sessions.model';
import { SessionsService } from 'src/app/Services/sessions.service';
import { RecentSale, recentSales } from './recent-table-data';

@Component({
  selector: 'app-recent-table',
  templateUrl: './recent-table.component.html',
  styleUrls: ['./recent-table.component.css']
})
export class RecentTableComponent implements OnInit, OnDestroy {

  tableData: RecentSale[];

  heartrates: Heartrate[] = [];
  private heartratesSub: Subscription = new Subscription;

  sessions: Session[] = [];
  private sessionsSub: Subscription = new Subscription;

  constructor(private heartratesService: HeartrateService, private sessionsService: SessionsService) {
    this.tableData = recentSales;
    console.log(this.tableData[4].Date.toDateString());

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

  ngOnDestroy() {
		this.heartratesSub.unsubscribe();
	}

}
