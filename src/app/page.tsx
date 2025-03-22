import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Whatsapp from "./components/Whatsapp";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "700"],
});

export default function Home() {
    return (
        <main className={montserrat.className}>
            <div className="flex flex-col justify-between min-h-screen">
				<Navbar />
            	<Whatsapp />
            	<Footer />
			</div>
        </main>
    );
}
