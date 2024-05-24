import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import {GoogleOAuthProvider} from "@react-oauth/google";

const inter = Inter({ subsets: ["latin"] });


export default function App({ Component, pageProps }: AppProps) {
  return <div>
  <div  className={inter.className}>
  <GoogleOAuthProvider clientId="759411181092-r46lseqhhmhuqdlfrkgdubennet90u6b.apps.googleusercontent.com">
    <Component {...pageProps} />;
  </GoogleOAuthProvider>
    </div>
  </div>
}