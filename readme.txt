1. React startuje
zobrazí stránku

2. useEffect
zavolá backend:

GET /movies
pošle JSON filmů

4. React to zobrazí
když přidám film:
napíšešu formulář
React pošle:
POST /movies
backend uloží film
React znovu načte data


const loadMovies = async () => {
  const res = await fetch(API);
  const data = await res.json();
  setMovies(data);
};

pošli request na backend
vezmi JSON data
ulož je do movies

použila jsem Render, protože jsem chtěla mít backend dostupný online.
Kdyby běžel jen lokálně, frontend by se k němu nepřipojil