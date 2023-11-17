import { ClearSeatsAction } from '@/shared/actions/seat-selection.action';
import { Theatre } from '@/shared/modals/theatre.modal';
import { MoviesState } from '@/shared/states/movies.state';
import { SeatSelectionState } from '@/shared/states/seat-selection.state';
import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
    selector: 'seat-summary',
    templateUrl: './seat-summary.component.html',
    styleUrls: ['./seat-summary.component.scss'],
    standalone: true,
    imports: [CommonModule, TranslateModule],
})
export class SeatSummaryComponent implements OnChanges {
    @Input() theatre: Theatre;
    @Input() showTimeIndex: number;
    @Input() showConfirmBtns: boolean = true;

    @Select(MoviesState.getSelectedMovieId)
    selectedMovie$: Observable<string>;
    @Select(SeatSelectionState.getTheatreData)
    theatreList$: Observable<Theatre>;

    selected: string[] = [];
    selectedMovie: string;
    ticketPrice: number = 120;
    convFee: number = 30;
    totalPrice: number = 0;
    currency: string = 'Rs';

    store = inject(Store);
    router = inject(Router);
    translate = inject(TranslateService);

    ngOnChanges() {
        this.theatreList$.subscribe((theatre) => (this.theatre = theatre));
        this.selected =
            this.theatre?.movie.seatDetails[
                this.showTimeIndex || 0
            ].selectedSeats;
    }

    OnClickClearTickets() {
        this.store.dispatch(new ClearSeatsAction(this.showTimeIndex));
    }

    OnClickBuyTickets() {
        this.selectedMovie$.subscribe((res) => (this.selectedMovie = res));
        this.router.navigate(['booking-details', this.selectedMovie]);
    }
}
