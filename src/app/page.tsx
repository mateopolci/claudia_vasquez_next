import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Whatsapp from "./components/Whatsapp";
import Grid from "./components/Grid";
import PageNavigation from "./components/PageNavigation";
import ScrollToTop from "./components/ScrollToTop";
import Banner from "./components/Banner";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "700"],
});

export default function Home({
    searchParams,
}: {
    searchParams: { page?: string };
}) {
    const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;

    const isFirstPage = currentPage === 1;

    return (
        <main className={montserrat.className}>
            <div className="flex flex-col justify-between min-h-screen items-center">
                <Navbar />
                <Whatsapp />
                <ScrollToTop />
                {isFirstPage && <Banner />}
                <Grid
                    endpoint="api/artworks?fields[0]=id&fields[1]=documentId&fields[2]=name&fields[3]=support&fields[4]=size&populate[image][fields][0]=url&populate[image][fields][1]=alternativeText&sort=year:desc"
                    title="Portfolio"
                />
                <PageNavigation pagination={null} />
                <Footer />
            </div>
        </main>
    );
}
