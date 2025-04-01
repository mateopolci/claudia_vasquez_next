import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Whatsapp from "../components/Whatsapp";
import Grid from "../components/Grid";
import PageNavigation from "../components/PageNavigation";
import ScrollToTop from "../components/ScrollToTop";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "700"],
});


function Disponibles() {
  return (
    <main className={montserrat.className}>
    <div className="flex flex-col justify-between min-h-screen items-center">
        <Navbar />
        <Whatsapp />
        <ScrollToTop />
        <Grid
            endpoint="api/artworks?fields[0]=id&fields[1]=documentId&fields[2]=name&fields[3]=support&fields[4]=size&populate[image][fields][0]=url&populate[image][fields][1]=alternativeText&filters[available][$eq]=true&sort=year:desc"
            title="Portfolio"
        />
        <PageNavigation pagination={null} />
        <Footer />
    </div>
</main>
  )
}

export default Disponibles