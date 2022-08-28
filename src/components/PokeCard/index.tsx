import axios, { AxiosError } from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { PokeCardProps, PokemonProps, PokemonTypeProps } from '../../modules'
import Link from 'next/link'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from './styles.module.scss'
import { useRouter } from 'next/router'
import { redirect } from 'next/dist/server/api-utils'
import { useLoading } from '../../hooks/useLoading'
import Skeleton from 'react-loading-skeleton'
import { api } from '../../services/api'
import { useToggle } from '../../hooks/useToggle'
interface PokeCardPageProps {
    data: PokeCardProps
}

export default function PokeCard({ data }: PokeCardPageProps) {
    const { name, url } = data

    const { applicationMode } = useToggle()

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [currentPokemon, setCurrentPokemon] = useState<PokemonProps>({} as PokemonProps)

    async function getPokemonDetails() {
        setIsLoading(true)
        await axios.get(url)
            .then((response) => {
                setCurrentPokemon(response.data)
            })
            .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        getPokemonDetails().then()
    }, [data])

    return (
        <Link href={`/pokemon/${currentPokemon?.id}`} passHref>
            <section className={`${styles.container} ${currentPokemon.id && currentPokemon.types[0].type.name}`}>
                {isLoading || !currentPokemon.id ? (
                    <Skeleton containerClassName={styles.skeleton} />
                ) : (
                    <div className={styles.content}>
                        <h1 className={styles.title}>{name[0].toUpperCase() + name.substring(1)}</h1>
                        <div className={styles.cardContainer}>
                            <div className={styles.typesContainer}>
                                {currentPokemon.types?.map(({ slot, type }) => (
                                    <p key={slot}>{type.name[0].toUpperCase() + type.name.substring(1)}</p>
                                ))}
                            </div>
                            <div className={styles.nextImage}>
                                <Image
                                    src={
                                        applicationMode === 'default'
                                            ? `https://cdn.traction.one/pokedex/pokemon/${currentPokemon?.id}.png`
                                            : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${currentPokemon?.id}.png`
                                    }
                                    layout='fill'
                                    alt={name}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </Link>
    )
}