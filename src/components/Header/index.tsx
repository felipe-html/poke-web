import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { RiMenu5Fill } from 'react-icons/ri'
import { GrFormClose } from 'react-icons/gr'
import { Toggle } from '../Toggle'

import styles from './styles.module.scss'

export function Header() {
    const router = useRouter()

    const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState<boolean>(false)

    async function redirect(path: string) {
        setMobileMenuIsOpen(false)
        await router.push(path)
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
                <form className={styles.searchbar}>
                    <label htmlFor="pokemon-search" />
                    <input type="text" placeholder="Pokemon's name" id='pokemon-search' name='pokemon-search' />
                    <button type='button' title='Search by name'>Search</button>
                </form>
                <div className={styles.navigation}>
                    <ul className={styles.navigationMenu}>
                        <Link href='/home' passHref>
                            <li title='Home' className={`${router.pathname === '/home' && styles.selectedNavigation}`}>Home</li>
                        </Link>
                        <Link href='/about' passHref>
                            <li title='About The Pokeweb' className={`${router.pathname === '/about' && styles.selectedNavigation}`}>About</li>
                        </Link>
                        <Link href='/pokeapi' passHref>
                            <li title='About PokéApi' className={`${router.pathname === '/pokeapi' && styles.selectedNavigation}`}>PokéApi</li>
                        </Link>
                    </ul>
                    <section className={styles.toggle}>
                        <h5>Pixel mode</h5>
                        <Toggle />
                    </section>
                </div>
            </nav>

            <section className={`${styles.mobileMenu} ${mobileMenuIsOpen ? styles.openMenu : styles.closeMenu}`}>
                <div className={styles.closeIcon} onClick={() => setMobileMenuIsOpen(!mobileMenuIsOpen)}>
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
                    <li
                        className={`${router.pathname === '/pokeapi' && styles.selectedPage}`}
                        onClick={() => { redirect('/pokeapi') }}
                    >
                        PokéApi
                    </li>
                    <li>
                        <p>Pixel mode</p>
                        <Toggle />
                    </li>

                </ul>
            </section>
        </header>
    )
}