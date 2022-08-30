import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { RiMenu5Fill } from 'react-icons/ri'
import { GrFormClose } from 'react-icons/gr'
import { Toggle } from '../Toggle'
import { useLoading } from '../../hooks/useLoading'
import { api } from '../../services/api'
import { AxiosError } from 'axios'
import { PokemonProps } from '../../modules'
import styles from './styles.module.scss'
import { isRegExp } from 'util/types'

export function Header() {
    const router = useRouter()
    const { setAppLoading } = useLoading()
    const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState<boolean>(false)
    const [pokemonName, setPokemonName] = useState<string>('')

    async function redirect(path: string) {
        setMobileMenuIsOpen(false)
        await router.push(path)
    }

    async function handleSearch() {
        if (pokemonName === '')
            return

        setAppLoading(true)

        await api.get(`/pokemon/${pokemonName.toLocaleLowerCase()}`)
            .then(async (response) => {
                let pokemonData = response.data as PokemonProps
                await router.push(`/pokemon/${pokemonData.name.toLocaleLowerCase()}`)
            })
            .catch(async (error: AxiosError) => {
                await router.push(`/pokemon}`)
                setAppLoading(true)

            })
    }

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.logoAndSideButton}>
                    <div className={styles.mobileIcon} onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen)}>
                        <RiMenu5Fill size={25} />
                    </div>
                    <Link href='/home' passHref>
                        <h1 className={styles.logo} title='Go to home'><span>the</span>Pokeweb</h1>
                    </Link>
                </div>
                <div className={styles.searchbar} >
                    <label htmlFor="pokemon-search" />
                    <input
                        type="text"
                        placeholder="Pokemon's name"
                        id='pokemon-search'
                        name='pokemon-search'
                        value={pokemonName}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter')
                                handleSearch()
                        }}
                        onChange={(value) => setPokemonName(value.currentTarget.value)}
                    />
                    <button type='button' title='Search by name' onClick={handleSearch}>
                        Search
                    </button>
                </div>
                <div className={styles.navigation}>
                    <ul className={styles.navigationMenu}>
                        <Link href='/home' passHref>
                            <li title='Home' className={`${router.pathname === '/home' && styles.selectedNavigation}`}>Home</li>
                        </Link>
                        <Link href='/about' passHref>
                            <li title='About The Pokeweb' className={`${router.pathname === '/about' && styles.selectedNavigation}`}>About</li>
                        </Link>
                    </ul>
                    <section className={styles.toggle}>
                        <h5>Pixel mode</h5>
                        <Toggle onChange={() => setMobileMenuIsOpen(false)} />
                    </section>
                </div>
            </nav>

            <section className={`${styles.mobileMenu} ${mobileMenuIsOpen ? styles.openMenu : styles.closeMenu}`}>
                <div className={styles.closeIcon} onClick={() => { setMobileMenuIsOpen(!mobileMenuIsOpen) }
                }>
                    <GrFormClose size={25} />
                </div>
                <h1>thePokeweb</h1>
                <ul>
                    <li
                        className={`${router.pathname === '/home' && styles.selectedPage}`}
                        onClick={() => { redirect('/home') }}
                    >
                        Home
                    </li>
                    <li
                        className={`${router.pathname === '/about' && styles.selectedPage}`}
                        onClick={() => { redirect('/about') }}

                    >
                        About
                    </li>
                    <li >
                        <p>Pixel mode</p>
                        <Toggle onChange={() => setMobileMenuIsOpen(false)} />
                    </li>

                </ul>
            </section>
        </header>
    )
}