import { IMovie } from '@/shared/modals/movies.modal';
import { MoviesState } from '@/shared/states/movies.state';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
    selector: 'theatre-details',
    templateUrl: './theatre-details.component.html',
    styleUrls: ['./theatre-details.component.scss'],
    standalone: true,
    imports: [CommonModule],
})
export class TheatreDetailsComponent implements OnInit {
    @Select(MoviesState.getSelectedMovie)
    movie$: Observable<IMovie>;

    movie: IMovie;

    ngOnInit(): void {
        this.movie$.subscribe((res) => (this.movie = res));
    }
}
