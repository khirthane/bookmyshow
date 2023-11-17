export interface ICountryList extends ICountryResponse {
    data: ICountry[];
}

export interface ICountryResponse {
    error: boolean;
    msg: string;
}

export interface ICountry {
    name: string;
    iso3: string;
    iso2: string;
    states: IStates[];
}
export interface IStates {
    name: string;
    state_code: string;
}

export interface ICitiesPayload {
    country: string;
    state: string;
}

export interface ICitiesList extends ICountryResponse {
    data: string[];
}
