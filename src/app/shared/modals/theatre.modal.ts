export interface Theatre {
    id: number;
    date: string;
    name: string;
    movie: Movie;
    theatreLayout: TheatreLayout;
}

export interface TheatreLayout {
    rows: number;
    columns: number;
    gaps: number[];
}

export interface Movie {
    name: string;
    rating: string;
    genre: string[];
    movieSynoposis?: string;
    seatDetails: SeatDetails[];
}

export interface SeatDetails {
    showTime: string;
    reservedSeats: string[];
    selectedSeats: string[];
}

export interface AddRemoveSeatPayload {
    seats: string;
    showTimeIndex: number;
}
