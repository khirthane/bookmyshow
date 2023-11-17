import {
    getCitiesAction,
    getCountriesAction,
} from '@/shared/actions/country.action';
import {
    ICitiesList,
    ICitiesPayload,
    ICountry,
    ICountryList,
    IStates,
} from '@/shared/modals/country.modal';
import {
    CountriesState,
    CountryStateModal,
} from '@/shared/states/countries.state';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
    ControlValueAccessor,
    FormBuilder,
    FormGroup,
    NG_VALUE_ACCESSOR,
    ReactiveFormsModule,
} from '@angular/forms';
import { Select, Store } from '@ngxs/store';

import { Observable } from 'rxjs';

export interface IPersonalInfo {
    country: string;
    state: string;
    city: string;
    pincode: string;
}
@Component({
    selector: 'country-details',
    templateUrl: 'country-details.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: CountryDetailsComponent,
            multi: true,
        },
    ],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
})
export class CountryDetailsComponent implements OnInit, ControlValueAccessor {
    @Select(CountriesState.getCountryData) countries: Observable<ICountryList>;
    @Select(CountriesState.getCitiesData) cities: Observable<ICitiesList>;

    store = inject(Store);
    fb = inject(FormBuilder);
    countriesList: ICountry[];
    statesList: IStates[];
    citiesList: string[];
    selectedCountry: string;

    personalDetailsForm: FormGroup;
    disabled = false;

    onChange = (value: IPersonalInfo) => {};
    onTouched = (value: IPersonalInfo) => {};

    ngOnInit(): void {
        this.fetchCountry();
        this.personalDetailsForm = this.fb.group({
            country: '',
            state: '',
            city: '',
            pincode: '',
        });

        this.personalDetailsForm.valueChanges.subscribe((value) => {
            if (this.onChange) {
                if (this.personalDetailsForm.valid) {
                    this.onChange(value);
                }
            }
            if (this.onTouched) {
                this.onTouched(value);
            }
        });
    }

    fetchCountry(): void {
        this.store
            .dispatch(new getCountriesAction())
            .subscribe((state: { countries: CountryStateModal }) => {
                this.countriesList = state.countries.countries.data;
            });
    }

    onChangeCountry(event: Event): void {
        const value = (event.target as HTMLInputElement).value;
        this.statesList =
            this.countriesList.find((res) => res.iso3 === value)?.states ?? [];
        this.selectedCountry =
            this.countriesList.find((res) => res.iso3 === value)?.name ?? '';
    }

    onChangeState(event: Event): void {
        const payload: ICitiesPayload = {
            country: this.selectedCountry,
            state: (event.target as HTMLInputElement).value,
        };
        this.store
            .dispatch(new getCitiesAction(payload))
            .subscribe((state: { countries: CountryStateModal }) => {
                this.citiesList = state.countries.cities.data;
            });
    }
    writeValue(value: IPersonalInfo): void {
        if (value) {
            this.personalDetailsForm.setValue(value);
        }
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}
