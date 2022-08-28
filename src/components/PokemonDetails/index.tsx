import axios, { AxiosError } from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { PokemonAbilitiesProps, PokemonProps, PokeStatsProps, PokemonTypeProps } from '../../modules'
import { useRouter } from 'next/router'

import styles from './styles.module.scss'

interface PokemonDetailsProps {
    pokemonId: number
}

export default function PokemonDetails({ pokemonId }: PokemonDetailsProps) {
    const [currentPokemon, setCurrentPokemon] = useState<PokemonProps>()
    const [currentPokeball, setCurrentPokeball] = useState<boolean>(true)
    const router = useRouter()

    async function getPokemon() {
        await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            .then(response => {
                setCurrentPokemon(response.data)
            })
            .catch((error: AxiosError) => {
                console.log(error.response)
            })
    }

    useEffect(() => {
        getPokemon()
    }, [])

    return (

        <main className={styles.container}>
            {currentPokemon !== undefined && (
                <article className={styles.content}>
                    <h1>{currentPokemon.name[0].toUpperCase() + currentPokemon.name.substring(1)}</h1>
                    <div className={styles.informations}>
                        <section className={styles.section}>
                            <div className={styles.image}>
                                <Image src={`https://cdn.traction.one/pokedex/pokemon/${pokemonId}.png`} alt={currentPokemon.name} layout="fill" priority />
                            </div>
                            <p className={styles.title}>Types:</p>
                            {
                                currentPokemon.types.map((item: PokemonTypeProps, key) => {
                                    return (
                                        <p key={key}>{item.type.name}</p>
                                    )
                                })
                            }
                        </section>
                        <section className={styles.details}>
                            <p className={styles.title}>Abilities:</p>
                            {
                                currentPokemon.abilities.map((item: PokemonAbilitiesProps, key) => {
                                    return (
                                        <p key={key}>{item.ability.name}</p>
                                    )
                                })
                            }
                            <p className={styles.title}>Stats</p>
                            {
                                currentPokemon.stats.map((item: PokeStatsProps, key) => {
                                    return (
                                        <p key={key}>{item.stat.name} : {item.base_stat}</p>
                                    )
                                })
                            }
                            <p className={styles.title}>Weight: {currentPokemon.weight}</p>
                        </section>
                    </div>
                </article>)
            }
        </main>
    )
}