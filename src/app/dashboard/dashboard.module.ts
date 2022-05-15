import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { DashboardComponent } from './dashboard.component';
import { YearlychartComponent } from './dashboard-components/yearlychart/yearlychart.component';
import { RecentTableComponent } from './dashboard-components/recent-table/recent-table.component';
import { SessionsTableComponent } from './dashboard-components/sessions-table/sessions-table.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Dashboard',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Dashboard' }
      ]
    },
    component: DashboardComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, RouterModule.forChild(routes), ChartsModule],
  declarations: [DashboardComponent, YearlychartComponent, 
    RecentTableComponent, SessionsTableComponent]
})
export class DashboardModule {

}
