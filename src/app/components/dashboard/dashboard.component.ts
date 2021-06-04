import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  weatherInfoData: any;
  name = new FormControl('');

  constructor(private weatherService: WeatherService, private router: Router) { }

  ngOnInit(): void {
    this.loadWeatherInfo();
  }

  loadWeatherInfo() {
    if (localStorage.getItem('time') && Number(localStorage.getItem('time')) < new Date(new Date().setMinutes(new Date().getMinutes() + 5)).getTime()) {
      this.weatherInfoData = JSON.parse(localStorage.getItem('weatherInfo')).list;
    } else {
      this.weatherService.getCityCodes().subscribe((res: any) => {
        this.weatherService.getWeather(res.List.map(x => x.CityCode), 'metric').subscribe((res: any) => {
          this.weatherInfoData = res.list;
          localStorage.setItem('weatherInfo', JSON.stringify(res));
          localStorage.setItem('time', `${new Date().getTime()}`);
        });
      });
    }

  }

  addCity(){
    let a = this.weatherInfoData.find(x => x.name.toLowerCase().includes(this.name.value.toLowerCase()))
    if (a) {
      this.router.navigate([`/view-weather/${a.id}`])
    } else {
      alert('not found');
    }
  }

}
