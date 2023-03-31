
export type TGetPokemons = {
    count: number,
    next: string,
    previous: string,
    results: TPokemon
}

export type TGetPokemon = {
    id: number,
    name: string,
    sprites: {
        other:{
            dream_world:{
                front_default:string
            }
        }
    } 
}

type TPokemon = {
    name: string;
    url:  string;
}[]