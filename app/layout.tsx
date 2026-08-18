import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata={title:"Marghella Studio — Community Manager y Diseño Visual",description:"Estrategia, contenido y diseño visual para marcas que quieren comunicar con intención.",icons:{icon:"/logo-agos.png",shortcut:"/logo-agos.png"}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="es"><body>{children}</body></html>}
