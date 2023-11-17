import { Injectable, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import {
    getMovieByIdAction,
    getMoviesAction,
    selectedMovieAction,
} from '../actions/movies.action';
import { IMovie, IMoviesList } from '../modals/movies.modal';
import { MoviesService } from '../services/movies.service';

export class MoviesStateModal {
    movies: IMoviesList[];
    selectedMovieId: string;
    selectedMovie: IMovie;
}

@State<MoviesStateModal>({
    name: 'movies',
    defaults: {
        movies: [] as IMoviesList[],
        selectedMovieId: '',
        selectedMovie: {} as IMovie,
    },
})
@Injectable()
export class MoviesState {
    moviesService = inject(MoviesService);
    activatedRoute = inject(ActivatedRoute);

    @Selector()
    static getMovieData(state: MoviesStateModal) {
        return state.movies;
    }

    @Selector()
    static getSelectedMovieId(state: MoviesStateModal) {
        return state.selectedMovieId;
    }

    @Selector()
    static getSelectedMovie(state: MoviesStateModal) {
        return state.selectedMovie;
    }

    @Action(getMoviesAction)
    getMovies({ getState, setState }: StateContext<getMoviesAction>) {
        return this.moviesService.getMoviesList().pipe(
            tap((response) => {
                const state = getState();
                setState({
                    ...state,
                    movies: response as IMoviesList[],
                });
            })
        );
    }

    @Action(selectedMovieAction)
    selectedMovie(
        { getState, patchState }: StateContext<MoviesStateModal>,
        { payload }: selectedMovieAction
    ) {
        const state = getState();

        patchState({
            ...state,
            selectedMovieId: payload,
        });
    }

    @Action(getMovieByIdAction)
    movieDetails(
        { getState, patchState }: StateContext<MoviesStateModal>,
        { payload }: selectedMovieAction
    ) {
        return this.moviesService.getMoviesbyId(payload).pipe(
            tap((response) => {
                const state = getState();
                patchState({
                    ...state,
                    selectedMovie: response as IMovie,
                });
            })
        );
    }
}
