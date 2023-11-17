import { AddRemoveSeatPayload } from '../modals/theatre.modal';

export class SelectSeatsAction {
    static readonly type = 'Add Seats';
    constructor(public payload: AddRemoveSeatPayload) {}
}

export class RemoveSeatsAction {
    static readonly type = 'Remove Seats';
    constructor(public payload: AddRemoveSeatPayload) {}
}

export class ClearSeatsAction {
    static readonly type = 'Clear Seats';
    constructor(public payload: number) {}
}
