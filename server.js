const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server funguje");
});

let movies = [
    {
        id: 1,
        title: "Inception",
        genre: "Sci-Fi",
        rating: 9,
        img: "https://tse4.mm.bing.net/th/id/OIP.6IMgTztaTyZPbSK2M2V9BgHaKy?rs=1&pid=ImgDetMain&o=7&rm=3",
        year: 2010,
        actors: "Leonardo DiCaprio, Joseph Gordon-Levitt",
        description: "Tým specialistů krade tajemství z lidských snů pomocí technologie sdíleného snění."
    },
    {
        id: 2,
        title: "Titanic",
        genre: "Romance",
        rating: 8,
        img: "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
        year: 1997,
        actors: "Leonardo DiCaprio, Kate Winslet",
        description: "Láska mezi dvěma lidmi na palubě osudného Titanicu."
    },
    {
        id: 3,
        title: "The Dark Knight",
        genre: "Action",
        rating: 10,
        img: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        year: 2008,
        actors: "Christian Bale, Heath Ledger",
        description: "Batman čelí chaosu, který způsobuje Joker v Gotham City."
    },
    {
        id: 4,
        title: "Interstellar",
        genre: "Sci-Fi",
        rating: 10,
        img: "https://tse2.mm.bing.net/th/id/OIP.uiaj_IMaC7h3NoieAhcmVwHaLG?rs=1&pid=ImgDetMain&o=7&rm=3",
        year: 2014,
        actors: "Matthew McConaughey, Anne Hathaway",
        description: "Cesta vesmírem za záchranou lidstva a hledání nové planety."
    },
    {
        id: 5,
        title: "Avatar",
        genre: "Fantasy",
        rating: 7,
        img: "https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg",
        year: 2009,
        actors: "Sam Worthington, Zoe Saldana",
        description: "Člověk se zaplete do konfliktu na planetě Pandora."
    },
    {
        id: 6,
        title: "Forrest Gump",
        genre: "Drama",
        rating: 9,
        img: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
        year: 1994,
        actors: "Tom Hanks",
        description: "Příběh muže, který nechtěně ovlivní historii USA."
    },
    {
        id: 7,
        title: "The Matrix",
        genre: "Sci-Fi",
        rating: 10,
        img: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
        year: 1999,
        actors: "Keanu Reeves, Laurence Fishburne",
        description: "Realita je jen simulace – boj lidstva proti strojům."
    },
    {
        id: 8,
        title: "Gladiator",
        genre: "Action",
        rating: 9,
        img: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
        year: 2000,
        actors: "Russell Crowe",
        description: "Generál se stane gladiátorem a pomstí svou rodinu."
    },
    {
        id: 9,
        title: "Joker",
        genre: "Drama",
        rating: 8,
        img: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
        year: 2019,
        actors: "Joaquin Phoenix",
        description: "Vznik jednoho z nejznámějších filmových padouchů."
    },
    {
        id: 10,
        title: "Avengers: Endgame",
        genre: "Action",
        rating: 9,
        img: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
        year: 2019,
        actors: "Robert Downey Jr., Chris Evans",
        description: "Finální bitva Avengers proti Thanosovi."
    },
    {
        id: 11,
        title: "Spider-Man: No Way Home",
        genre: "Action",
        rating: 8,
        img: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
        year: 2021,
        actors: "Tom Holland, Zendaya",
        description: "Multivesmír se otevírá a Spider-Man bojuje s legendárními nepřáteli."
    },
    {
        id: 12,
        title: "Deadpool",
        genre: "Action",
        rating: 8,
        img: "https://cdn1.cinenode.com/movie_poster/107/full/deadpool-106550.jpg",
        year: 2016,
        actors: "Ryan Reynolds",
        description: "Antihrdina s černým humorem a schopností regenerace."
    }
];

//GET všechny filmy
app.get("/movies", (req, res) => {
    res.json(movies);
});

//GET 1 film podle id
app.get("/movies/:id", (req, res) => {
    const id = Number(req.params.id);
    const movie = movies.find(m => m.id === id);

    if (!movie) {
        return res.status(404).json({
            message: "Film nenalezen"
        });
    }

    res.status(200).json(movie);
});

//POST přidání filmu
app.post("/movies", (req, res) => {
    const { title, genre, img } = req.body;

    if (!title || !genre || !img) {
        return res.status(400).json({
            message: "Chybí název, žánr nebo obrázek"
        });
    }

    const newMovie = {
        id: Date.now(),
        title,
        genre,
        img,
        rating: 0
    };

    movies.push(newMovie);

    res.status(201).json(newMovie);
});

//DELETE smazání
app.delete("/movies/:id", (req, res) => {
    const id = Number(req.params.id);

    // zkontrolujeme, jestli film existuje
    const exists = movies.some(m => m.id === id);

    if (!exists) {
        return res.status(404).json({
            message: "Film neexistuje"
        });
    }

    movies = movies.filter(m => m.id !== id);

    res.status(200).json({
        message: "Smazáno"
    });
});


app.listen(3001, () => {
    console.log("Server běží na http://localhost:3001");
});
