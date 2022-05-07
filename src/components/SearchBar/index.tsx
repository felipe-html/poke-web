import { BiSearchAlt } from 'react-icons/bi'
import { useState } from 'react'

import Link from 'next/link'

import styles from './styles.module.scss'
import { useRouter } from 'next/router'

export function SearchBar() {
    const [search, setSearch] = useState<string>('')

    const router = useRouter()

    const lowerCaseMask = (value: any) => {
        return value.replace().toLowerCase()
    }

    function handleSearch(value: string) {
        if (value === '') {
            return
        }

        router.push({
            query: { pokemon: value },
            pathname: '/search'
        })
    }

    return (
        <div className={styles.searchBar}>
            <input
                id='searchInput'
                type="text"
                placeholder="Pokémon's name"
                value={search}
                onChange={(e) => setSearch(lowerCaseMask(e.currentTarget.value))}
                className={styles.input}
                onKeyDown={(event) => {
                    event.key === 'Enter' && handleSearch(search)
                }}
            />
            <div className={styles.searchIcon} onClick={() => { handleSearch(search) }}>
                <Link href='/search' passHref>
                    <BiSearchAlt size={22} />
                </Link>
            </div>
        </div>
    )
}