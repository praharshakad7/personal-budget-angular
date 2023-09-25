import { AfterViewInit, Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Chart } from 'chart.js';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit {
  public dataSource: any = {
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#ffcd56',
          '#ff6384',
          '#36a2eb',
          '#fd6b19',
        ]
      }
    ],
    labels: []
  };

  private myPieChart: any;

  constructor(private http: HttpClient) { }

  ngAfterViewInit(): void {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

    this.http.get('http://localhost:3000/budget', { headers: headers })
      .subscribe((res: any) => {
        for (let k = 0; k < res.myBudget.length; k++) {
          this.dataSource.datasets[0].data[k] = res.myBudget[k].budget;
          this.dataSource.labels[k] = res.myBudget[k].title;
        }
        this.createChart();
      });
  }

  createChart() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    if (this.myPieChart) {
      this.myPieChart.destroy();
    }
    this.myPieChart = new Chart(ctx, {
      type: 'pie',
      data: this.dataSource
    });
  }
}
