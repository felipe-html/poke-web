import axios, { AxiosError } from "axios";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  PokemonAbilitiesProps,
  PokemonProps,
  PokeStatsProps,
  PokemonTypeProps,
} from "../../modules";
import { useRouter } from "next/router";

import styles from "./styles.module.scss";
import { api } from "../../services/api";
import { Header } from "../../components/Header";
import { useToggle } from "../../hooks/useToggle";

interface PokemonPageProps {
  pokemon: PokemonProps;
}

export default function Pokemon({ pokemon }: PokemonPageProps) {
  const router = useRouter();
  const { applicationMode } = useToggle()

  return (
    <>
      <Head>
        <title>Poke Web | Pokémon</title>
      </Head>
      <main className={`main ${styles.container}`}>
        {router.isFallback ? (
          <>Loading...</>
        ) : (
          pokemon && (
            <article className={styles.content}>
              <h1>
                {pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}
              </h1>

              <div className={styles.informations}>
                <section className={styles.section}>
                  <div className={styles.image}>
                    <Image
                      src={
                        applicationMode === 'default'
                          ? `https://cdn.traction.one/pokedex/pokemon/${pokemon?.id}.png`
                          : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon?.id}.png`
                      }
                      alt={pokemon.name}
                      layout="fill"
                      priority
                    />
                  </div>
                  <p className={styles.title}>Types:</p>
                  {pokemon.types.map((item: PokemonTypeProps, key) => {
                    return <p key={key}>{item.type.name}</p>;
                  })}
                </section>
                <section className={styles.details}>
                  <p className={styles.title}>Abilities:</p>
                  {pokemon.abilities.map((item: PokemonAbilitiesProps, key) => {
                    return <p key={key}>{item.ability.name}</p>;
                  })}
                  <p className={styles.title}>Stats</p>
                  {pokemon.stats.map((item: PokeStatsProps, key) => {
                    return (
                      <p key={key}>
                        {item.stat.name} : {item.base_stat}
                      </p>
                    );
                  })}
                  <p className={styles.title}>Weight: {pokemon.weight}</p>
                </section>
              </div>
            </article>
          )
        )}
      </main>
    </>
  );
}

export async function getStaticPaths() {
  try {
    const allPokemons = await api.get("/?limit=1126").then((response) => {
      return response.data.results;
    });

    const paths = allPokemons.map((pokemon: any, index: number) => {
      return {
        params: {
          pokemonId: `${index + 1}`,
        },
      };
    });

    return {
      paths,
      fallback: true,
    };
  } catch (e) {
    return {
      paths: [],
      fallback: true,
    };
  }
}

export async function getStaticProps({ params }: any) {
  try {
    const id = params.pokemonId;

    const pokemon = await api
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => {
        return response.data;
      });

    return {
      props: {
        pokemon,
      },
    };

  } catch (e) {
    return {
      redirect: {
        destination: '/400',
        permanent: false
      }
    };
  }
}
