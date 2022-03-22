import Head from 'next/head'
import Link from 'next/link'
import Header from '../../components/Header'
import { BiSearchAlt } from 'react-icons/bi'
import styles from './styles.module.scss'
import { useEffect, useState } from 'react'
import { PokemonAbilitiesProps, PokemonProps, PokemonTypeProps, PokeStatsProps } from '../../modules'
import Image from 'next/image'
import axios, { AxiosError } from 'axios'
import PokemonDetails from '../../components/PokemonDetails'

export default function Search() {
    const [currentPokemon, setCurrentPokemon] = useState<PokemonProps>()
    const [error, setError] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('')
    const [currentPokeball, setCurrentPokeball] = useState<boolean>(true)

    const lowerCaseMask = (value: any) => {
        return value.replace().toLowerCase()
    }

    async function handleSearch() {

        setCurrentPokemon(undefined)

        if (!search) {
            return
        }

        let value = search.toLowerCase()

        await axios.get(`https://pokeapi.co/api/v2/pokemon/${value}`)
            .then(response => {
                setError(false)
                setCurrentPokemon(response.data)
            })
            .catch((error: AxiosError) => {
                setCurrentPokeball(true)
                setCurrentPokemon(undefined)
                setError(true)
            })
    }

    return (
        <>
            <Head>
                <title>Poke Web | Search</title>
            </Head>
            <Header />
            <main className={styles.container}>
                <div className={styles.searchBar}>
                    <input
                        id='searchInput'
                        type="text"
                        placeholder="Pokémon's name"
                        value={search}
                        onChange={(e) => setSearch(lowerCaseMask(e.currentTarget.value))}
                        className={styles.input}
                        onKeyDown={(event) => {
                            event.key === 'Enter' && handleSearch()
                        }}
                    />
                    <div className={styles.searchIcon} onClick={() => { handleSearch() }}>
                        <Link href='/search' passHref>
                            <BiSearchAlt size={22} />
                        </Link>
                    </div>
                </div>

                {
                    currentPokemon &&
                    <PokemonDetails pokemonName={search} />
                }

                {
                    error &&
                    <article className={styles.notFoundContainer}>
                        <h1>Ops! No pokemons here.</h1>
                        <section className={styles.imageContainer}>
                            <div id='pokeball' onClick={() => { setCurrentPokeball(!currentPokeball) }}>
                                <Image src={currentPokeball ? '/images/pokeball.png' : '/images/pokeball-open.png'} alt='pokeball' width={120} height={160} />
                            </div>
                        </section>
                        <p>Do not open pokeball!</p>
                    </article>
                }

            </main>

        </>
    )
}