const initialState = {
    movie : null,
    cast : null,
    movieList : [],
    loading: true
}

  const reducer = (state = initialState, action) => {
    const newState = { ...state };

    switch(action.type){
        case 'MOVIE_LIST':
            newState.movieList = action.movieList;
            newState.loading = action.loading;
            break;
        case 'SEARCH_MOVIE':
            newState.movieList = action.movieList;
            newState.loading = action.loading;
            break;
        case 'MOVIE_DETAIL':
                newState.movie = action.movie;
                newState.cast = action.cast;
                break;
        default:
            break;
    }
    return newState;
}

export default reducer; 