import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IMovie, IMoviesList } from '../modals/movies.modal';

@Injectable({
    providedIn: 'root',
})
export class MoviesService {
    jsonServerUrl = 'http://localhost:3000/movies';
    omdbKey = 'f9baa15f';
    omdbUrl = 'https://www.omdbapi.com/?i=';

    httpClient = inject(HttpClient);

    getMoviesList(): Observable<IMoviesList[]> {
        return this.httpClient.get<IMoviesList[]>(this.jsonServerUrl);
    }

    getMoviesbyId(id: string): Observable<IMovie> {
        return this.httpClient.get<IMovie>(
            `${this.omdbUrl}${id}&apikey=${this.omdbKey}`
        );
    }
}
