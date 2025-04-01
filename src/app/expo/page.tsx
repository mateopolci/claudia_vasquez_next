import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Whatsapp from "../components/Whatsapp";
import ScrollToTop from "../components/ScrollToTop";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "700"],
});

// Define TypeScript interfaces for our data
interface TextNode {
  type: string;
  text: string;
}

interface ParagraphChild {
  type: string;
  children: TextNode[];
}

interface ExpoData {
  data: {
    details: ParagraphChild[];
  };
}

export default async function Expo() {
    const domain = "http://localhost:1337/";
    const expoEndpoint = `${domain}api/expo`;
    
    // Fetch data using server component
    const res = await fetch(expoEndpoint, { next: { revalidate: 3600 } });
    const expoData: ExpoData = await res.json();
    
    // Extract exhibition details from the data
    const { details } = expoData.data;

    return (
        <main className={montserrat.className}>
            <div className="flex flex-col justify-between min-h-screen items-center">
                <Navbar />
                <Whatsapp />
                <ScrollToTop />
                
                <div className="container mx-auto py-12 px-4">
                    <h1 className="text-3xl font-bold mb-8">Exposiciones</h1>
                    
                    <div className="mb-12">
                        {details.map((paragraph, index) => (
                            <p key={index} className="mb-4 text-lg">
                                {paragraph.children.map((child, childIndex) => (
                                    <span key={childIndex}>{child.text}</span>
                                ))}
                            </p>
                        ))}
                    </div>
                </div>
                
                <Footer />
            </div>
        </main>
    );
}