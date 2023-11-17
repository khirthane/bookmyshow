import {
    getMoviesAction,
    selectedMovieAction,
} from '@/shared/actions/movies.action';
import { IMoviesList } from '@/shared/modals/movies.modal';
import { MoviesState, MoviesStateModal } from '@/shared/states/movies.state';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
    selector: 'movies',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
    movies: IMoviesList[];
    router = inject(Router);
    store = inject(Store);

    @Select(MoviesState.getMovieData) moviesList$: Observable<IMoviesList[]>;

    ngOnInit(): void {
        this.store
            .dispatch(new getMoviesAction())
            .subscribe((state: { movies: MoviesStateModal }) => {
                this.movies = state.movies.movies;
            });

        this.moviesList$.subscribe((movies) => (this.movies = movies));
    }

    onClickMovie(id: string) {
        this.router.navigate(['seat-select', id]);
        this.store.dispatch(new selectedMovieAction(id));
    }
}
