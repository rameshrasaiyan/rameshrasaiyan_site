import { Component, OnInit } from '@angular/core';

import { WeatherService } from '../services/weather.service';
import { Weather } from '../model/weather';

declare var Skycons: any;

@Component({
  moduleId: module.id,
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  providers: [WeatherService]
})
export class WeatherComponent implements OnInit {
  pos: Position;
  weatherData = new Weather(null, null, null, null, null);
  currentUnitSpeed = 'kph';
  currentTempUnit = 'fahrenheit';
  currentLocation = '';
  icons = new Skycons({ 'color': '#000' });

  constructor(private _weatherService: WeatherService) { }

  ngOnInit() {
    this.getCurrentLocation();
  }

  getCurrentLocation() {
    this._weatherService.getCurrentLocation()
      .subscribe(position => {
        this.pos = position
        this.getCurrentWeather();
        this.getLocationName();
      },
      err => console.error(err));
  }

  getCurrentWeather() {
    this._weatherService.getCurrentWeather(this.pos.coords.latitude, this.pos.coords.longitude)
      .subscribe(weather => {
        this.weatherData.temp = weather["currently"]["temperature"],
          this.weatherData.summary = weather["currently"]["summary"],
          this.weatherData.wind = weather["currently"]["windSpeed"],
          this.weatherData.humidity = weather["currently"]["humidity"],
          this.weatherData.icon = weather["currently"]["icon"]
        console.log('weather: ', this.weatherData);
        this.setIcon();
      },
      err => console.log(err));
  }

  getLocationName() {
    this._weatherService.getLocationName(this.pos.coords.latitude, this.pos.coords.longitude)
      .subscribe(location => {
        console.log(location);
        this.currentLocation = location['results'][1]['formatted_address'];
        console.log('Name: ', this.currentLocation);
      });
  }

  toggleUnits() {
    this.toggleTempUnits();
    this.toggleSpeedUnits();
  }

  toggleTempUnits() {
    if (this.currentTempUnit == 'fahrenheit') {
      this.currentTempUnit = 'celsius';
    } else {
      this.currentTempUnit = 'fahrenheit';
    }
  }

  toggleSpeedUnits() {
    if (this.currentUnitSpeed == 'kph') {
      this.currentUnitSpeed = 'mph';
    } else {
      this.currentUnitSpeed = 'kph';
    }
  }

  setIcon() {
    this.icons.add('icon', this.weatherData.icon);
    this.icons.play();
  }

}
