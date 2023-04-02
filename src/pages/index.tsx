import { Layout } from '@/components/layouts';
import { pokeApi } from '@/services';
import { TGetPokemon, TGetPokemons } from '@/types/services';
import { Button, Card, Col, Grid, Text } from '@nextui-org/react';
import { NextPage, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Pagination } from '@nextui-org/react';
import { useEffect, useState } from 'react';

const HomePage: NextPage = (props: any) => {
  const history = useRouter();
  const onClick = (id: number) => history.push(`/pokemon/${id}`);
  const totalPages = Math.floor(props.pokemons.length / 8);
  const [currentPage, setCurrentPage] = useState<number | string>(
    typeof window !== 'undefined' ? localStorage.getItem('currentPage') || 1 : 1
  );

  const a = props.pokemons.filter(
    (el: any, i: any) =>
      i >= Number(currentPage) * 8 - 8 && i < Number(currentPage) * 8
  );

  console.log({ currentPage });

  useEffect(() => {}, [currentPage]);

  return (
    <Layout title="Pokemon App">
      <Grid.Container gap={2} justify="center" css={{ mt: '$10' }}>
        {a.map((el: any, i: number) => {
          if (true) {
            return (
              <Grid
                css={{ height: '330px', cursor: 'pointer' }}
                xs={3}
                key={i}
                onClick={() => onClick(i + 1)}
              >
                <Card isHoverable>
                  <Card.Header>
                    <Text
                      size={12}
                      weight="bold"
                      transform="uppercase"
                      color="#ffffffAA"
                    >
                      {el.name}
                    </Text>
                  </Card.Header>

                  <Card.Body>
                    <Card.Image
                      src={el.url}
                      objectFit="contain"
                      width={280}
                      height={280}
                      alt="Card image background"
                    />
                  </Card.Body>
                </Card>
              </Grid>
            );
          }
        })}
      </Grid.Container>

      <Grid css={{ display: 'flex', justifyContent: 'center', mt: '$10' }}>
        <Pagination
          shadow
          size="xl"
          initialPage={Number(currentPage)}
          total={totalPages}
          onChange={(page) => {
            setCurrentPage(page);
            JSON.stringify(
              localStorage.setItem('currentPage', String(currentPage))
            );
          }}
        />
      </Grid>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await pokeApi.get<TGetPokemons>('/pokemon?limit=151');

  const pokemons = data.results.map((pokemon, i) => ({
    ...pokemon,
    id: i,
    url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
      i + 1
    }.svg`,
  }));

  return {
    props: {
      pokemons,
    },
  };
};

export default HomePage;
