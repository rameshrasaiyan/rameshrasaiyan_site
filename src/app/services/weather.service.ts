import { Injectable } from '@angular/core';
import { Jsonp, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { FORECAST_KEY, FORECAST_URL, GOOGLE_KEY, GOOGLE_ROOT } from '../constants';

@Injectable()
export class WeatherService {

  constructor(private _jsonp: Jsonp, private _http: Http) { }

  getCurrentLocation(): Observable<any> {
    if (navigator.geolocation) {
      return Observable.create(observer => {
        navigator.geolocation.getCurrentPosition(pos => {
          observer.next(pos)
        }),
          err => {
            return Observable.throw(err);
          }
      });
    } else {
      return Observable.throw('Geo location is not available');
    }
  }

  getCurrentWeather(lat: number, long: number): Observable<any> {
    const url = FORECAST_URL + FORECAST_KEY + '/' + lat + ',' + long;
    const queryParams = '?callback=JSONP_CALLBACK';

    return this._jsonp.get(url + queryParams)
      .map(data => data.json())
      .catch(err => {
        console.log('Unable to get the weather data - ', err);
        return Observable.throw(err);
      });
  }

  getLocationName(lat: number, long: number): Observable<any> {
    const url = GOOGLE_ROOT;
    const queryParam = '?latlng=' + lat + ',' + long + '&key=' + GOOGLE_KEY;

    return this._http.get(url + queryParam)
      .map(loc => loc.json())
      .catch(err => {
        console.log('Unable to get location - ', err);
        return Observable.throw(err);
      });
  }

}
