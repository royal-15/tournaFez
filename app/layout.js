import "./globals.css";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import SessionWrapper from "@/components/SessionWrapper";
import Footer from "@/components/Footer";

export const metadata = {
  title: "TournaFez",
  description: "Most Popular tournament website for gamers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head><link rel="icon" href="/app/favicon.ico" sizes="any" /></head>
      <body className=" text-white bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
        <SessionWrapper>

          <Header />
          <Navbar />
          {children}
          <Footer />

        </SessionWrapper>
      </body>
    </html>
  );
}
