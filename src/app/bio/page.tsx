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
    biography: ParagraphChild[];
    art_concept: ParagraphChild[];
  };
}

export default async function Bio() {
    const domain = "http://localhost:1337/";
    const bioPopulate = "api/bio";
    const bioEndpoint = `${domain}${bioPopulate}`;
    
    // Fetch data using server component
    const res = await fetch(bioEndpoint, { next: { revalidate: 3600 } });
    const expoData: ExpoData = await res.json();
    
    // Extract biography and art concept from the data
    const { biography, art_concept } = expoData.data;

    return (
        <main className={montserrat.className}>
            <div className="flex flex-col justify-between min-h-screen items-center">
                <Navbar />
                <Whatsapp />
                <ScrollToTop />
                
                <div className="container mx-auto py-12 px-4">
                    <h1 className="text-3xl font-bold mb-8">Biografía</h1>
                    
                    <div className="mb-12">
                        {biography.map((paragraph, index) => (
                            <p key={index} className="mb-4 text-lg">
                                {paragraph.children.map((child, childIndex) => (
                                    <span key={childIndex}>{child.text}</span>
                                ))}
                            </p>
                        ))}
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-6">Concepto Artístico</h2>
                    <div className="mb-8">
                        {art_concept.map((paragraph, index) => (
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