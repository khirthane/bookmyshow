import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ICitiesPayload } from '../modals/country.modal';

@Injectable({
    providedIn: 'root',
})
export class CountryService {
    apiUrl = 'https://countriesnow.space/api/v0.1/countries/states';
    httpClient = inject(HttpClient);

    getCountryList() {
        return this.httpClient.get(this.apiUrl);
    }

    getCitiesList(payload: ICitiesPayload) {
        return this.httpClient.post(
            'https://countriesnow.space/api/v0.1/countries/state/cities',
            payload
        );
    }
}
