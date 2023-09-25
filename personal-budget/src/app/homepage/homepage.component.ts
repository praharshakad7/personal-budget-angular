import { AfterViewInit, Component } from '@angular/core';
import Chart from 'chart.js/auto';
import * as d3 from 'd3';
import { DataService } from '../data.service';

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

  public svg: any;
  public width = 650;
  public height = 300;
  public radius = Math.min(this.width, this.height) / 2;
  public colors: any;

  constructor(private dataService: DataService) { }

  public createSvg(): void {
    this.svg = d3.select("#pie-chart")
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .append("g")
      .attr(
        "transform",
        "translate(" + this.width / 2 + "," + this.height / 2 + ")"
      );
  }

  public createColors(): void {
    this.colors = d3.scaleOrdinal()
      .domain(this.dataService.getData().myBudget.map((d: any) => d.budget))
      .range([
        "#ffcd56",
        "#ff6384",
        "#36a2eb",
        "#fd6b19",
        "#83FF33",
        "#F633FF",
        "#FF3333"
      ]);
  }

  private drawChart(): void {
    const pie = d3.pie<any>().value((d: any) => Number(d.value));

    this.svg
      .selectAll('pieces')
      .data(pie(this.dataService.getData().myBudget))
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(this.radius)
      )
      .attr('fill', (d: any, i: any) => (this.colors(i)))
      .attr("stroke", "#121926")
      .style("stroke-width", "1px");

    const labelLocation = d3.arc()
      .innerRadius(100)
      .outerRadius(this.radius);

    this.svg
      .selectAll('pieces')
      .data(pie(this.dataService.getData().myBudget))
      .enter()
      .append('text')
      .text((d: any) => d.data.label)
      .attr("transform", (d: any) => "translate(" + labelLocation.centroid(d) + ")")
      .style("text-anchor", "middle")
      .style("font-size", 15);
  }

  private myPieChart: any;

  ngAfterViewInit(): void {
    this.dataService.fetchData().subscribe((res: any) => {
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
