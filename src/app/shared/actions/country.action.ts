import { ICitiesPayload } from '../modals/country.modal';

export class getCountriesAction {
    static readonly type = 'Get Countries';
    constructor() {}
}

export class getCitiesAction {
    static readonly type = 'Get Cities';
    constructor(public payload: ICitiesPayload) {}
}
