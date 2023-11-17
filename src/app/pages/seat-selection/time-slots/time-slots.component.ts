import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SeatDetails, Theatre } from '../../../shared/modals/theatre.modal';

@Component({
    selector: 'time-slots',
    templateUrl: './time-slots.component.html',
    styleUrls: ['./time-slots.component.scss'],
    standalone: true,
    imports: [CommonModule],
})
export class TimeSlotsComponent {
    @Input() theatre: Theatre;
    @Output() showTimeIndex = new EventEmitter<number>();
    showTime: SeatDetails[];
    selectedSlotIndex = 0;

    ngOnInit() {
        this.showTime = this.theatre.movie.seatDetails;
    }

    changeTimeSlot(index: number): void {
        this.selectedSlotIndex = index;
        this.showTimeIndex.emit(index);
    }
}
