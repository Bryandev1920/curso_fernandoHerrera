import { PokemonGrid, PokemonsReponse, SimplePokemon } from "@/pokemons";

// Estamos accediendo a la informacion del api 
const getPokemons = async( limit = 20, offset= 0 ):Promise<SimplePokemon[]> => {
  const data:PokemonsReponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${ offset }`)
  // Estamos pasando la respuesta a json
    .then( res => res.json() );
// Estamos creando un aconstante , la estamos igualando con la data o la informacion del api y la estamos modificando recorriendo con .map y añadiendole y quitandole caracteres con .split y .at
    const pokemons = data.results.map( pokemon => ({
      id: pokemon.url.split('/').at(-2)!,
      name: pokemon.name,
    }));

    // throw new Error('Esto es un error que no debería de suceder');
    // throw notFound();

    return pokemons;
}




export default async function PokemonsPage() {
// Le cambiamos el valor de limit de 20 a 151
  const pokemons = await getPokemons(151);
  
  return (
    <div className="flex flex-col">

      <span className="text-5xl my-2">Listado de Pokémons <small>estático</small></span>
      
      <PokemonGrid pokemons={ pokemons } />

    </div>
  );
}