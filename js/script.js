var app = new Vue(
    {
        el: '#root',
        data: {
            movieName: '',
            movies: []
        },
        methods: {
            searchMovie() {
                axios
                .get('https://api.themoviedb.org/3/search/movie', {
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
        },
        mounted() {
            
        }
    }
)