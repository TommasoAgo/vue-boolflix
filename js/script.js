var app = new Vue(
    {
        el: '#root',
        data: {
            // movieName è vuoto in quanto prende il v-model dalla input dell'utente.
            // Andrà a popolare la query per la API
            movieName: '',

            // movies è un Array vuoto che verrà popolato dalla ricerca dell'utente
            movies: [],

            // Creo un Array per i generi
            movieGenres: [],
            selectGenre: ''

        },
        methods: {

            // Scrivo una funzione che mi consenta di fare una chiamata Ajax e 
            // popolare il mio Array 'movies' con il risultato della ricerca.
            // 
            // Da associare all'evento sul bottone della input
            searchMovie() {
                axios
                .get('https://api.themoviedb.org/3/search/multi', {
                    params: {
                        "api_key": '6c5e72b5c6b0f7602a85d01cf04bc5cd',
                        "query": this.movieName
                    }
                })  
                .then((response) => {
                    let result = response.data.results;
                    this.movies = result;
                    this.movieName = '';

                    // Faccio un loop per convertire in numeri da 1 a 5 il voto
                    this.movies.forEach(element => {
                        element.vote_average = element.vote_average / 2;
                        element.vote_average = Math.round(element.vote_average);

                        // Creo un array vuoto per metterlo nell'oggetto movie
                        // in caso il film non abbia genere
                        let genre_ids = [];
                        if(element.genre_ids.length > 0) {
                            element.genre_ids = element.genre_ids;
                        } else {
                            element.genre_ids = genre_ids;
                        }
                        
                    });
                    this.selectGenre = ''
                });  
            }
        },
        mounted() {
            axios
                .get('https://api.themoviedb.org/3/movie/popular', {
                    params: {
                        "api_key": '6c5e72b5c6b0f7602a85d01cf04bc5cd',
                        "query": this.movieName
                    }
                })  
                .then((response) => {
                    let result = response.data.results;
                    this.movies = result;
                    this.movieName = '';

                    // Faccio un loop per convertire in numeri da 1 a 5 il voto
                    this.movies.forEach(element => {
                        element.vote_average = element.vote_average / 2;
                        element.vote_average = Math.round(element.vote_average);
                    });
                });
                
            axios
                .get('https://api.themoviedb.org/3/genre/movie/list', {
                    params: {
                        "api_key": '6c5e72b5c6b0f7602a85d01cf04bc5cd'
                    }
                })
                .then((response) => {
                    let movieGenres = response.data.genres;
                    this.movieGenres = movieGenres;
                });
        }
    }
)