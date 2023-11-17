import { Theatre } from '@/shared/modals/theatre.modal';
import { SeatSelectionState } from '@/shared/states/seat-selection.state';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Select } from '@ngxs/store';

import { Observable } from 'rxjs';
import { SeatSummaryComponent } from '../seat-selection/seat-summary/seat-summary.component';
import { TheatreDetailsComponent } from '../seat-selection/theatre-details/theatre-details.component';
import { CountryDetailsComponent } from './country-details/country-details.component';

@Component({
    selector: 'booking-details',
    templateUrl: './booking-details.component.html',
    styles: [
        `
            .main-container {
                display: flex;
            }
            .booking-details-container {
                flex: 2;
                padding: 40px;
            }
        `,
    ],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SeatSummaryComponent,
        CountryDetailsComponent,
        TheatreDetailsComponent,
    ],
})
export class BookingDetailsComponent implements OnInit {
    fb = inject(FormBuilder);
    bookingDetailsForm: FormGroup;

    @Select(SeatSelectionState.getTheatreData)
    theatreList$: Observable<Theatre>;
    theatre: Theatre;
    showTimeIndex = 0;

    ngOnInit(): void {
        this.theatreList$.subscribe((theatre) => (this.theatre = theatre));
        this.bookingDetailsForm = this.fb.group({
            name: ['', Validators.required],
            emailAddress: ['', Validators.required],
            mobileNo: ['', Validators.required],
            countryDetails: '',
        });
    }

    confirmBooking(): void {
        console.log(this.bookingDetailsForm.value);
    }
}
