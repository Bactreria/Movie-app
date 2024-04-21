const searchform = document.querySelector("form");
const moviecontainer = document.querySelector(".movie-container");
const inputbox = document.querySelector(".inputbox");

const getMovieInfo = async (movie) => {
    try {
        const apikey = "f662ffe";
        const url = `http://www.omdbapi.com/?i=tt3896198&apikey=${apikey}&t=${movie}`;

        const response = await fetch(url);
         
        const data = await response.json();
        if(data.Response === "False" && data.Error === "Movie not found!"){
            showerrormessage("No Movie Found!!!");
        }
        else{
            console.log(data);
            showMovieData(data);
        }
        
    } catch (error) {
        showerrormessage("No Movie Found!");
    }
};


const showMovieData = async (data) => {
    moviecontainer.innerHTML = "";
    moviecontainer.classList.remove("noBackground");
    const { Title, imdbRating, Genre, Released,Director,Runtime, Actors, Plot, Poster } =
        data; //destructring assignment
    const movieElement = document.createElement("div");
    movieElement.classList.add("movie-info");
    movieElement.innerHTML = `<h2>${Title}</h2><p><strong>Rating : &#11088;</strong>${imdbRating}</p>`;

    const movieGenereElement = document.createElement("div");
    movieGenereElement.classList.add("movie-genre");

    Genre.split(",").forEach((element) => {
        const p = document.createElement("p");
        p.innerHTML = element;
        movieGenereElement.appendChild(p);
    });
    movieElement.appendChild(movieGenereElement);

    movieElement.innerHTML += `<p><strong>Released date : ${Released}</strong></p><p><strong>Duration : ${Runtime}</strong></p>
    <p><strong><p><strong>Director : ${Director}</strong></p><p>Cast : ${Actors}</strong></p><p><strong>Plot : ${Plot}</strong></p>`;

    const poster = document.createElement("div");
    poster.classList.add("poster");
    poster.innerHTML = `<img src = "${Poster}"/>`;

    moviecontainer.appendChild(poster);
    moviecontainer.appendChild(movieElement);
};




const showerrormessage = (message) => {
    moviecontainer.innerHTML = `<h2>${message}</h2>`;
    moviecontainer.classList.add("noBackground");
};




const handleformsubmission = (event) => {
    event.preventDefault();
    const moviename = inputbox.value.trim();
    if (moviename != "") {
        showerrormessage("Fetching Movie Information...");
        getMovieInfo(moviename);
    } else {
        showerrormessage("Enter Movie Name To Get Movie Information");
    }
};

searchform.addEventListener("submit", handleformsubmission);
