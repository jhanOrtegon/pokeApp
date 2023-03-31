import Head from "next/head";
import { FC, ReactNode } from "react";
import { Button, Link, Navbar, Text } from "@nextui-org/react";
import Image from "next/image";
import pikachu from "@/assets/icons/pikachu.png";

type TLayout = {
  children: ReactNode;
  title: string;
  metaDescription?: string;
  metaKeywords?: string;
};

export const Layout: FC<TLayout> = ({
  children,
  title,
  metaKeywords,
  metaDescription,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="author" content="Jhan carlos Ortegon" />
        <meta
          name="description"
          content={`Información sobre el Pokemon ${metaDescription || ""}`}
        />
        <meta name="keywords" content={metaKeywords || "Poke"} />
      </Head>

      <Navbar isBordered variant={"floating"}>
        <Navbar.Brand>
          <Image
            src={pikachu}
            alt="pika"
            height={50}
            width={50}
            style={{ marginRight: "10px" }}
          />
          <Text b color="inherit" hideIn="xs" size={"$3xl"}>
            Pokémon
          </Text>
        </Navbar.Brand>
      </Navbar>

      <main>{children}</main>
    </>
  );
};
