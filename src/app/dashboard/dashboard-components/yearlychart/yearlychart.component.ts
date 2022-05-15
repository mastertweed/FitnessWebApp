import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Heartrate } from 'src/app/Models/heartrate.model';
import { HeartrateService } from 'src/app/Services/heartrate.service';

@Component({
  selector: 'app-yearlychart',
  templateUrl: './yearlychart.component.html',
  styleUrls: ['./yearlychart.component.css']
})
export class YearlychartComponent implements OnInit, OnDestroy {

  public lineChartLegend = false;
  public lineChartType = 'line';

  heartrates: Heartrate[] = [];
  private heartratesSub: Subscription = new Subscription;
  private heartratesSessionSub: Subscription = new Subscription;

  heartrateData: number[] = [];
  heartrateTimes: string[] = [];

  chartTitle = "All Session Data"
  sessionTime: String[] = []
  sessionName = ""

  constructor(private heartratesService: HeartrateService) {
  }

  ngOnInit(): void {
    // Get all heartrate data
    this.heartratesService.getHeartratesAll()
    this.heartratesSub = this.heartratesService.getHeartratesUpdateListener()
      .subscribe((heartrates) => {
        this.heartrates = heartrates
        for (let i = 0; i < this.heartrates.length; i++) {
          this.heartrateData[i] = this.heartrates[i].heartrate;
          // this.heartrateTimes[i] = this.heartrates[i].timecreated
          this.heartrateTimes[i] = String(i)
        }
      })

    this.heartratesSessionSub = this.heartratesService.getHeartRateBySessionIDUpdateListener()
      .subscribe((heartrates) => {
        this.heartrates = heartrates

        this.heartrateData = []
        this.heartrateTimes = []

        this.sessionTime = String(this.heartrates[0].timecreated).split("T")
        this.sessionName = String(this.heartrates[0].session)
        this.chartTitle = "Session " + this.sessionName + " - " + this.sessionTime[0] + " - " + this.sessionTime[1]

        for (let i = 0; i < this.heartrates.length; i++) {
          this.heartrateData[i] = this.heartrates[i].heartrate;
          this.heartrateTimes[i] = String(i)
        }

        console.log(this.heartrateData)
        console.log(this.heartrateTimes)

        this.lineChartData = [
          { data: this.heartrateData, label: 'Heartrate Data' }
        ];
      
        this.lineChartLabels = this.heartrateTimes;
      })
  }

  public lineChartData: Array<any> = [
    { data: this.heartrateData, label: 'Heartrate Data' }
  ];

  public lineChartLabels: Array<string> = this.heartrateTimes;

  public lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  public lineChartColors: Array<Object> = [
    {
      // grey
      backgroundColor: 'rgba(41, 98, 255,0.1)',
      borderColor: '#98a6ad',
      pointBackgroundColor: '#98a6ad',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#98a6ad'
    }
  ];

  ngOnDestroy(): void {
    this.heartratesSub.unsubscribe();
  }

}
