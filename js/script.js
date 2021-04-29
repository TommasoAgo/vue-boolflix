var app = new Vue(
    {
        el: '#root',
        data: {
            // movieName è vuoto in quanto prende il v-model dalla input dell'utente.
            // Andrà a popolare la query per la API
            movieName: '',

            // movies è un Array vuoto che verrà popolato dalla ricerca dell'utente
            movies: [],

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
                    this.movies = result
                    console.log(result);
                    this.movieName = '';
                }); 
            }   
        }
    }
)