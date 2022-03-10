import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { PokeCardProps, PokemonProps } from '../../../modules'

import styles from './styles.module.scss'

type CardDataProps = {
    data: PokeCardProps
}

export default function PokeCard({ data }: CardDataProps) {
    const [currentPokemon, setCurrentPokemon] = useState<PokemonProps>()

    useEffect(() => {
        axios.get(`${data.url}`)
            .then(response => {
                const apiData = response.data as PokemonProps

                const newPokemon = {
                    ...apiData
                } as PokemonProps

                setCurrentPokemon(apiData)
            })
            .catch((error) => {
            })
    }, [])


    if (currentPokemon) {
        return (
            <article className={styles.container}>
                <h1 className={styles.title}>{data.name[0].toUpperCase() + data.name.substring(1)}</h1>
                <div className={styles.image}>
                    <Image src={currentPokemon.sprites.front_default} layout='fill' alt={currentPokemon.name} />
                </div>
                <section>
                    <h2 className={styles.types}>Types</h2>
                    {
                        currentPokemon.types.map((item, key) => {
                            return (
                                <p key={key}>{item}</p>
                            )
                        }
                        )
                    }
                </section>
            </article>
        )
    } else {

        return (
            <div>
                Ops, houve um erro
            </div>
        )
    }
}