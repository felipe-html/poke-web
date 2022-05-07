import { HiOutlineMenuAlt3 } from 'react-icons/hi'
import { RiCloseLine } from 'react-icons/ri'
import { useState } from 'react'
import Link from 'next/link'

import styles from './styles.module.scss'
import { SearchBar } from '../SearchBar'

export default function Header() {
    return (
        <header className={styles.container}>
            <nav className={styles.navigation}>
                <Link href='/home' passHref>
                    <h1 className={styles.logo}>
                        PokeWeb
                    </h1>
                </Link>
                <SearchBar />
                <div className={styles.menu}>
                    <Link href='/home' passHref>
                        <p>Home</p>
                    </Link>
                </div>
            </nav>
        </header>
    )
}