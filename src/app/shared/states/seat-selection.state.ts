import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { produce } from 'immer';
import {
    ClearSeatsAction,
    RemoveSeatsAction,
    SelectSeatsAction,
} from '../actions/seat-selection.action';
import { TheatreMock } from '../mocks/theatre.mock';
import { Theatre } from '../modals/theatre.modal';
export class TheatreStateModal {
    theatre: Theatre;
}

const mock = new TheatreMock();
@State<TheatreStateModal>({
    name: 'theatre',
    defaults: { theatre: mock.theatre },
})
@Injectable()
export class SeatSelectionState {
    @Selector()
    static getTheatreData(state: TheatreStateModal) {
        return state.theatre;
    }

    @Action(SelectSeatsAction)
    add(ctx: StateContext<TheatreStateModal>, { payload }: SelectSeatsAction) {
        const state = ctx.getState();
        const data = state.theatre;
        const list = produce(state, (draft) => {
            draft.theatre.movie.seatDetails[
                payload.showTimeIndex
            ].selectedSeats.push(payload.seats);
        });

        ctx.patchState(list);
    }

    @Action(RemoveSeatsAction)
    remove(
        { getState, patchState }: StateContext<TheatreStateModal>,
        { payload }: RemoveSeatsAction
    ) {
        const state = getState();
        const data = state.theatre;
        const list = produce(state, (draft) => {
            draft.theatre.movie.seatDetails.map((res, index) => {
                if (index == payload.showTimeIndex) {
                    res.selectedSeats = res.selectedSeats.filter(
                        (res) => res !== payload.seats
                    );
                }
            });
        });
        patchState(list);
    }

    @Action(ClearSeatsAction)
    clear(
        { getState, patchState }: StateContext<TheatreStateModal>,
        { payload }: ClearSeatsAction
    ) {
        const state = getState();
        const list = produce(state, (draftState: TheatreStateModal) => {
            draftState.theatre.movie.seatDetails[payload].selectedSeats = [];
        });

        patchState(list);
    }
}
