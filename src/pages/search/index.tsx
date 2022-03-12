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

    async function handleSearch() {
        await axios.get(`https://pokeapi.co/api/v2/pokemon/${search}`)
            .then(response => {
                setError(false)
                setCurrentPokemon(response.data)
            })
            .catch((error: AxiosError) => {
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
                        onChange={(e) => setSearch(e.currentTarget.value)}
                        className={styles.input}
                        onKeyDown={(event) => {
                            event.key === 'Enter' && handleSearch()
                        }}
                    />
                    <div className={styles.searchIcon} onClick={() => { handleSearch() }}>
                        <Link href='/search' passHref>
                            <BiSearchAlt size={30} />
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
                                <Image src={currentPokeball ? '/images/pokeball-open.png' : '/images/pokeball.png'} alt='pokeball' width={120} height={160} />
                            </div>
                        </section>
                        <p>Do not click on pokeball!</p>
                    </article>
                }

            </main>

        </>
    )
}