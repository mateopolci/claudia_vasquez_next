import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Whatsapp from "./components/Whatsapp";
import Grid from "./components/Grid";
import PageNavigation from "./components/PageNavigation";
import ScrollToTop from "./components/ScrollToTop";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "700"],
});

export default function Home() {
    return (
        <main className={montserrat.className}>
            <div className="flex flex-col justify-between min-h-screen items-center">
				<Navbar />
            	<Whatsapp />
            	<ScrollToTop />
            	<Grid />
                <PageNavigation pagination={null} />
            	<Footer />
			</div>
        </main>
    );
}
