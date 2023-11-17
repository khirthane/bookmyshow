export class getMoviesAction {
    static readonly type = 'Get Movies';
    constructor() {}
}

export class selectedMovieAction {
    static readonly type = 'Get Selected Movie';
    constructor(public payload: string) {}
}

export class getMovieByIdAction {
    static readonly type = 'Get Selected Movie Details';
    constructor(public payload: string) {}
}
