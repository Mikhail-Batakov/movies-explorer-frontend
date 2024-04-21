export function filterMovies(searchQuery, isShort, movies) {
  return movies.filter((movie) => {
    const searchQueryValueRU = movie.nameRU
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const searchQueryValueEN = movie.nameEN
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const searchQueryValue = searchQueryValueRU || searchQueryValueEN;
    return isShort
      ? searchQueryValue && movie.duration <= 40
      : searchQueryValue;
  });
}
