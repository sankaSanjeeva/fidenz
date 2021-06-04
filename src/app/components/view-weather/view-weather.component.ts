import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-view-weather',
  templateUrl: './view-weather.component.html',
  styleUrls: ['./view-weather.component.scss']
})
export class ViewWeatherComponent implements OnInit {
  dataSource: any;

  constructor(private weatherService: WeatherService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.router.snapshot.paramMap.get('id');

    this.weatherService.getWeather(id, 'metric').subscribe((res: any) => {
      this.dataSource = res.list[0];
    })
  }
}
