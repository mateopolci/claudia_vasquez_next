import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Whatsapp from "../components/Whatsapp";
import ScrollToTop from "../components/ScrollToTop";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "700"],
});

export default function Bio() {
    return (
        <main className={montserrat.className}>
            <div className="flex flex-col justify-between min-h-screen items-center">
                <Navbar />
                <Whatsapp />
                <ScrollToTop />
                
                <div className="container mx-auto py-12 px-4">
                    <h1 className="text-3xl font-bold mb-8">Biografía</h1>
                </div>
                
                <Footer />
            </div>
        </main>
    );
}