import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Whatsapp from "../components/Whatsapp";
import ScrollToTop from "../components/ScrollToTop";
import { Montserrat } from "next/font/google";
import Image from "next/image";

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "700"],
});

interface TextNode {
  type: string;
  text: string;
}

interface ParagraphChild {
  type: string;
  children: TextNode[];
}

interface ImageData {
  id: number;
  documentId: string;
  url: string;
}

interface BioData {
  data: {
    biography: ParagraphChild[];
    art_concept: ParagraphChild[];
    bio: ImageData;
    concept: ImageData;
  };
}

export default async function Bio() {
    const domain = "http://localhost:1337/";
    const bioEndpoint = `${domain}api/bio?fields=biography,art_concept&populate[bio][fields]=id,url&populate[concept][fields]=id,url`;
    
    const res = await fetch(bioEndpoint, { next: { revalidate: 3600 } });
    const bioData: BioData = await res.json();
    
    const { biography, art_concept, bio, concept } = bioData.data;

    return (
        <main className={montserrat.className}>
            <div className="flex flex-col justify-between min-h-screen items-center">
                <Navbar />
                <Whatsapp />
                <ScrollToTop />
                
                <div className="container mx-auto py-12 px-22">
                    <h1 className="text-3xl font-bold mb-8">Biografía</h1>
                    
                    <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            {biography.slice(0, Math.ceil(biography.length / 2)).map((paragraph, index) => (
                                <p key={index} className="mb-4 text-lg">
                                    {paragraph.children.map((child, childIndex) => (
                                        <span key={childIndex}>{child.text}</span>
                                    ))}
                                </p>
                            ))}
                        </div>
                        
                        {bio && (
                            <div className="relative w-full h-80 md:h-full min-h-[300px]">
                                <Image 
                                    src={bio.url}
                                    alt="Retrato de Claudia Vásquez"
                                    fill
                                    style={{objectFit: "contain"}}
                                    className="rounded-lg"
                                />
                            </div>
                        )}
                    </div>
                    
                    <div className="mb-12">
                        {biography.slice(Math.ceil(biography.length / 2)).map((paragraph, index) => (
                            <p key={index} className="mb-4 text-lg">
                                {paragraph.children.map((child, childIndex) => (
                                    <span key={childIndex}>{child.text}</span>
                                ))}
                            </p>
                        ))}
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-6">Concepto Artístico</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {concept && (
                            <div className="relative w-full h-80 md:h-full min-h-[300px] order-2 md:order-1">
                                <Image 
                                    src={concept.url}
                                    alt="Obra conceptual de Claudia Vásquez"
                                    fill
                                    style={{objectFit: "contain"}}
                                    className="rounded-lg"
                                />
                            </div>
                        )}
                        
                        <div className="order-1 md:order-2">
                            {art_concept.map((paragraph, index) => (
                                <p key={index} className="mb-4 text-lg">
                                    {paragraph.children.map((child, childIndex) => (
                                        <span key={childIndex}>{child.text}</span>
                                    ))}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
                
                <Footer />
            </div>
        </main>
    );
}