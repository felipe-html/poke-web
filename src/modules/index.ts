export interface PokePageProps {
    count: number,
    next: string | null,
    previous: string | null,
    results: PokeCardProps[]
}

export interface PokeCardProps {
    name: string,
    url: string,
}

export interface PokemonProps {
    abilities: PokemonAbilitiesProps[],
    id: number,
    name: string,
    species: {
        name: string,
    },
    sprites: {
        front_default: string
    },
    stats: PokeStatsProps[],
    weight: number,
    types: PokemonTypeProps[],
}

export interface PokemonTypeProps {
    slot: number,
    type: {
        name: string,
    },
}

export interface PokemonAbilitiesProps {
    ability: {
        name: string,
    }
}

export interface PokeStatsProps {
    base_stat: number,
    stat: {
        name: string,
    }
}