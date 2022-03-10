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
    abilities: [
        ability: {
            name: string,
        },
    ],
    id: number,
    name: string,
    species: {
        name: string,
    },
    sprites: {
        front_default: string
    },
    stats: PokeStatsProps[],
    types: [
        slot: number,
        type: {
            name: string,
        },
    ],
    weight: number
}

interface PokeStatsProps {
    base_stat: number,
    stat: {
        name: string,
    }
}