import { Layout } from "@/components/layouts";
import { pokeApi } from "@/services";
import { TGetPokemon, TGetPokemons } from "@/types/services";
import { Button, Card, Col, Grid, Text } from "@nextui-org/react";
import { NextPage, GetStaticProps } from "next";

const HomePage: NextPage = (props: any) => {
  console.log(props);
  return (
    <Layout title="Pokemon App">
      <Grid.Container gap={2} justify="center">
        {props.pokemons.map((el: any, i: number) => (
          <Grid xs={3} key={i}>
            <Card>
              <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                <Col>
                  <Text
                    size={12}
                    weight="bold"
                    transform="uppercase"
                    color="#ffffffAA"
                  >
                    What to watch
                  </Text>
                  <Text h4 color="white">
                    {el.name}
                  </Text>
                </Col>
              </Card.Header>
              <Card.Image
                src={el.url}
                objectFit="fill"
                width="100%"
                height={340}
                alt="Card image background"
              />
            </Card>
          </Grid>
        ))}
      </Grid.Container>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await pokeApi.get<TGetPokemons>("/pokemon?limit=151");

  const pokemons = data.results.map((pokemon, i) => ({
    ...pokemon,
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
