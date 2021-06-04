import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getCityCodes() {
    return this.http.get('assets/json/cities.json');
  }

  getWeather(ids, unit) {
    return this.http.get(`http://api.openweathermap.org/data/2.5/group?id=${ids}&units=${unit}&appid=${environment.appid}`);
  }
}
