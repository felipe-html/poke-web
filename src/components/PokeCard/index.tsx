import axios, { AxiosError } from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { PokeCardProps, PokemonProps, PokemonTypeProps } from '../../modules'
import Link from 'next/link'

import styles from './styles.module.scss'
import { useRouter } from 'next/router'

type CardDataProps = {
    data: PokeCardProps
}

export default function PokeCard({ data }: CardDataProps) {
    const [currentPokemon, setCurrentPokemon] = useState<PokemonProps>()
    const [image, setImage] = useState<string>('')

    const router = useRouter()

    async function getPokemon() {
        await axios.get(data.url)
            .then(response => {
                setImage(response.data.sprites.front_default)
                setCurrentPokemon(response.data)
            })
            .catch((error: AxiosError) => {
                console.log(error.response)
            })
    }

    useEffect(() => {
        getPokemon()
    }, [])

    function redirect() {
        router.push(`/pokemon/${data.name}`)
    }

    function changeAlternativeImage() {
        setImage('/images/pikachu.png')
    }

    return (
        <article className={styles.container} onClick={redirect}>
            {
                currentPokemon !== undefined ?
                    <>
                        <h1 className={styles.title}>{data.name[0].toUpperCase() + data.name.substring(1)}</h1>
                        <div className={styles.image}>
                            <Image src={image} onError={changeAlternativeImage} layout='fill' alt={currentPokemon.name} />
                        </div>
                        <section className={styles.typesContainer}>
                            <h2 className={styles.types}>
                                {currentPokemon.types.length === 1 ? 'Type' : 'Types'}
                            </h2>
                            {
                                currentPokemon.types.map((item: PokemonTypeProps, key) => {
                                    return (
                                        <p
                                            key={key}
                                            className={`
                                            ${styles.type} 
                                            ${item.type.name}
                                            `
                                            }
                                        >
                                            {item.type.name[0].toUpperCase() + item.type.name.substring(1)}
                                        </p>
                                    )
                                }
                                )
                            }
                        </section>
                    </>
                    :
                    <div className={styles.loaderContainer}>
                        <div className="loader" />
                    </div>
            }
        </article>
    )
}