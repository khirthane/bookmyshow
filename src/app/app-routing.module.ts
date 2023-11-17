import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingDetailsComponent } from './pages/booking-details/booking-details.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { SeatSelectionComponent } from './pages/seat-selection/seat-selection.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', component: MoviesComponent },
    { path: 'seat-select/:movie', component: SeatSelectionComponent },
    { path: 'booking-details/:movie', component: BookingDetailsComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
