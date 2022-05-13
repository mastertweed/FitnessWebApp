import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Heartrate } from 'src/app/Models/heartrate.model';
import { HeartrateService } from 'src/app/Services/heartrate.service';
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

  constructor(private heartratesService: HeartrateService) {
    this.tableData = recentSales;
    console.log(this.tableData[4].Date.toDateString());

  }

  ngOnInit(): void {
    // Get all beer styles
    this.heartratesService.getHeartratesAll()
    this.heartratesSub = this.heartratesService.getHeartratesUpdateListener()
      .subscribe((heartrates) => {
        this.heartrates = heartrates
      })
  }

  ngOnDestroy() {
		this.heartratesSub.unsubscribe();
	}

}
