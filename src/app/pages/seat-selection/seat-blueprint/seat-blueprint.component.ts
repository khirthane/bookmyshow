import {
    RemoveSeatsAction,
    SelectSeatsAction,
} from '@/shared/actions/seat-selection.action';
import {
    AddRemoveSeatPayload,
    SeatDetails,
    Theatre,
} from '@/shared/modals/theatre.modal';
import { SeatNumber, SeatType } from '@/shared/types/SeatType';
import { getAlphabets } from '@/utils/getAlphabets';
import { CommonModule } from '@angular/common';
import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    inject,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { SeatSummaryComponent } from '../seat-summary/seat-summary.component';

@Component({
    selector: 'seat-blueprint',
    templateUrl: './seat-blueprint.component.html',
    styleUrls: ['./seat-blueprint.component.scss'],
    standalone: true,
    imports: [CommonModule, TranslateModule],
})
export class SeatBlueprintComponent implements OnInit, OnChanges {
    @Input() theatre: Theatre;
    @Input() showTimeIndex: number;

    store = inject(Store);

    reserved: string[] = [];
    selected: string[] = [];
    seatDetails: SeatDetails[];
    rows: string[];
    cols: string[];

    ngOnInit() {
        this.showTimeIndex = 0;
        this.seatDetails = this.theatre.movie.seatDetails;
        this.generateSeats();
    }

    generateSeats(): void {
        this.cols = new Array(this.theatre.theatreLayout.columns);
        this.rows = getAlphabets(this.theatre.theatreLayout.rows);
        this.updateSeatSelection(this.showTimeIndex);
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.seatDetails = changes['theatre']?.currentValue?.movie.seatDetails;
        this.updateSeatSelection(this.showTimeIndex);
    }

    updateSeatSelection(showTimeIndex: number) {
        const seatdetails = this.theatre.movie.seatDetails;
        this.selected = [...seatdetails[showTimeIndex || 0].selectedSeats];
        this.reserved = [...seatdetails[showTimeIndex || 0].reservedSeats];
    }

    // Change status seat reservations
    getSeatStatus(seatPos: SeatNumber): SeatType {
        if (this.reserved?.includes(seatPos)) {
            return SeatType.Reserved;
        } else if (this.selected?.includes(seatPos)) {
            return SeatType.Selected;
        }
        return SeatType.FreeSeat;
    }

    getSeatStyle(index: number): string {
        return this.theatre.theatreLayout.gaps.includes(index)
            ? 'seat-gaps'
            : 'seatBox';
    }

    seatClicked(seatPos: SeatNumber): void {
        const list: AddRemoveSeatPayload = {
            seats: seatPos,
            showTimeIndex: this.showTimeIndex,
        };
        SeatSummaryComponent;

        if (this.selected.includes(seatPos)) {
            this.selected = this.selected.filter(
                (res: string) => res !== seatPos
            );
            this.store.dispatch(new RemoveSeatsAction(list));
        } else {
            this.selected.push(seatPos);
            this.store.dispatch(new SelectSeatsAction(list));
        }
    }
}
