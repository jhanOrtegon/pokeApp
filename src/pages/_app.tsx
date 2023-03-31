import { NextUIProvider } from '@nextui-org/react';
import type { AppProps } from "next/app";

// themes
import { darkTheme } from '@/themes';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider theme={darkTheme}>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}
