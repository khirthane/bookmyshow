import { Injectable, inject } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { getCitiesAction, getCountriesAction } from '../actions/country.action';
import { ICitiesList, ICountryList } from '../modals/country.modal';
import { CountryService } from './../services/country.service';

export class CountryStateModal {
    countries: ICountryList;
    cities: ICitiesList;
}

@State<CountryStateModal>({
    name: 'countries',
    defaults: {
        countries: {} as ICountryList,
        cities: {} as ICitiesList,
    },
})
@Injectable()
export class CountriesState {
    countryService = inject(CountryService);

    @Selector()
    static getCountryData(state: CountryStateModal) {
        return state.countries.data;
    }

    @Selector()
    static getCitiesData(state: CountryStateModal) {
        return state.cities.data;
    }

    @Action(getCountriesAction)
    getCountries({ getState, setState }: StateContext<CountryStateModal>) {
        return this.countryService.getCountryList().pipe(
            tap((response) => {
                const state = getState();
                setState({
                    ...state,
                    countries: response as ICountryList,
                });
            })
        );
    }

    @Action(getCitiesAction)
    getCities(
        { getState, setState }: StateContext<CountryStateModal>,
        action: getCitiesAction
    ) {
        return this.countryService.getCitiesList(action.payload).pipe(
            tap((response) => {
                const state = getState();
                setState({
                    ...state,
                    cities: response as ICitiesList,
                });
            })
        );
    }
}
