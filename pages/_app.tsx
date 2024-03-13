import "@/styles/globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="inter.className">
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId="236579224007-a6l8biu1l8fk41782voj5ab1g1gm3a90.apps.googleusercontent.com">
          <Component {...pageProps} />
          <Toaster />
          <ReactQueryDevtools/>
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </div>
  );
}
