import { Injectable } from '@angular/core';
import { Theatre } from '../modals/theatre.modal';

@Injectable()
export class TheatreMock {
    public theatre: Theatre = {
        id: 2323,
        date: '',
        name: 'LUXE CINEMAS',
        theatreLayout: {
            rows: 8,
            columns: 14,
            gaps: [3, 9],
        },
        movie: {
            name: 'The Avengers: End Game',
            rating: '8.5 IMDB',
            genre: ['action', 'adventure', 'science'],
            movieSynoposis: `After the devastating events of Avengers: Infinity War (2018)`,
            seatDetails: [
                {
                    showTime: '10:00AM',
                    reservedSeats: ['H1', 'H2', 'H6', 'H7'],
                    selectedSeats: [],
                },
                {
                    showTime: '1:00AM',
                    reservedSeats: ['F2', 'F6', 'F7', 'F8'],
                    selectedSeats: [],
                },
                {
                    showTime: '4:00AM',
                    reservedSeats: ['A3', 'A4', 'F5', 'F6'],
                    selectedSeats: [],
                },
                {
                    showTime: '8:00AM',
                    reservedSeats: ['G5', 'G6', 'B12', 'B13', 'H14'],
                    selectedSeats: [],
                },
            ],
        },
    };
}
