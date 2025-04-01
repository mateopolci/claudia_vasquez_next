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

interface ExpoData {
    data: {
        details: ParagraphChild[];
        expo1: ImageData;
        expo2: ImageData;
    };
}

export default async function Expo() {
    const domain = "http://localhost:1337/";
    const expoEndpoint = `${domain}api/expo?fields=id,documentId,details&populate[expo1][fields]=id,url&populate[expo2][fields]=id,url`;

    const res = await fetch(expoEndpoint, { next: { revalidate: 3600 } });
    const expoData: ExpoData = await res.json();

    const { details, expo1, expo2 } = expoData.data;
    
    // Dividir los detalles en dos columnas de manera equilibrada
    const halfLength = Math.ceil(details.length / 2);
    const firstHalf = details.slice(0, halfLength);
    const secondHalf = details.slice(halfLength);

    return (
        <main className={montserrat.className}>
            <div className="flex flex-col justify-between min-h-screen items-center">
                <Navbar />
                <Whatsapp />
                <ScrollToTop />

                <div className="container mx-auto py-12 px-22">
                    <h1 className="text-3xl font-bold mb-8">Exposiciones</h1>

                    {/* Primera sección: Primera mitad del texto e imagen 1 */}
                    <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            {firstHalf.map((paragraph, index) => (
                                <p key={index} className="mb-4 text-lg">
                                    {paragraph.children.map((child, childIndex) => (
                                        <span key={childIndex}>{child.text}</span>
                                    ))}
                                </p>
                            ))}
                        </div>
                        
                        {expo1 && (
                            <div className="relative w-full h-80 md:h-full min-h-[300px]">
                                <Image 
                                    src={expo1.url}
                                    alt="Exhibición de arte 1"
                                    fill
                                    style={{objectFit: "cover"}}
                                    className="rounded-lg"
                                />
                            </div>
                        )}
                    </div>
                    
                    {/* Segunda sección: Segunda mitad del texto e imagen 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {expo2 && (
                            <div className="relative w-full h-80 md:h-full min-h-[300px] order-2 md:order-1">
                                <Image 
                                    src={expo2.url}
                                    alt="Exhibición de arte 2"
                                    fill
                                    style={{objectFit: "cover"}}
                                    className="rounded-lg"
                                />
                            </div>
                        )}
                        
                        <div className="order-1 md:order-2">
                            {secondHalf.map((paragraph, index) => (
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