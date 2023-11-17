import {
    getMovieByIdAction,
    selectedMovieAction,
} from '@/shared/actions/movies.action';
import { IMovie } from '@/shared/modals/movies.modal';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Theatre } from '../../shared/modals/theatre.modal';
import { SeatSelectionState } from '../../shared/states/seat-selection.state';
import { SeatBlueprintComponent } from './seat-blueprint/seat-blueprint.component';
import { SeatSummaryComponent } from './seat-summary/seat-summary.component';
import { TheatreDetailsComponent } from './theatre-details/theatre-details.component';
import { TimeSlotsComponent } from './time-slots/time-slots.component';

@Component({
    selector: 'seat-selection',
    templateUrl: './seat-selection.component.html',
    styleUrls: ['./seat-selection.component.scss'],
    standalone: true,
    imports: [
        TheatreDetailsComponent,
        TimeSlotsComponent,
        SeatSummaryComponent,
        SeatBlueprintComponent,
    ],
})
export class SeatSelectionComponent implements OnInit {
    @Select(SeatSelectionState.getTheatreData)
    theatreList$: Observable<Theatre>;

    @ViewChild(SeatBlueprintComponent)
    seatBlueprintComponent: SeatBlueprintComponent;

    theatre: Theatre;
    showTimeIndex: number;
    selectedMovie: IMovie;
    activatedRoute = inject(ActivatedRoute);
    store = inject(Store);

    ngOnInit() {
        this.theatreList$.subscribe((theatre) => (this.theatre = theatre));

        const movieId = this.activatedRoute.snapshot.params['movie'];
        this.store.dispatch(new selectedMovieAction(movieId));
        this.store.dispatch(new getMovieByIdAction(movieId));
    }

    changeTimeSlot(slotIndex: number): void {
        this.showTimeIndex = slotIndex;
        this.clearSelectedSeats();
        this.seatBlueprintComponent.updateSeatSelection(this.showTimeIndex);
    }

    clearSelectedSeats(): void {
        this.seatBlueprintComponent.selected = [];
    }
}
