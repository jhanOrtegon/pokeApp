import { pokeApi } from '@/services';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import {} from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';

const PokemonDetailPage: NextPage = (props: any) => {
  const history = useRouter();
  return (
    <>
      <h3
        style={{ cursor: 'pointer' }}
        onClick={() => {
          history.back();
        }}
      >
        Regresar
      </h3>
      <Image src={props.dataPokemons.url} width={150} height={150} alt="xx" />
      <h1>{props?.dataPokemons.name || 'hola'}</h1>
      {props?.dataPokemons?.effect_entries.map((el: any, i: number) => (
        <p key={i}>{el?.effect}</p>
      ))}
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const listPokemons = [...Array(150)].map((el, i) => `${i + 1}`);

  return {
    paths: listPokemons.map((id) => ({ params: { id } })),
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data: dataPokemons } = await pokeApi.get(`ability/${params?.id}`);

  return {
    props: {
      dataPokemons: {
        ...dataPokemons,
        url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${params?.id}.svg`,
      },
    },
    revalidate: 86400,
  };
};

export default PokemonDetailPage;
