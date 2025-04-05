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
    bold?: boolean;
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

function FormattedText({ node }: { node: TextNode }) {
    if (node.bold) {
        return <span className="font-bold">{node.text}</span>;
    }
    return <span>{node.text}</span>;
}

function FormattedParagraph({ paragraph }: { paragraph: ParagraphChild }) {
    return (
        <p className="mb-2 text-lg">
            {paragraph.children.map((child, index) => (
                <FormattedText key={index} node={child} />
            ))}
        </p>
    );
}

export default async function Bio() {
    const domain = "http://localhost:1337/";
    const bioEndpoint = `${domain}api/bio?fields=biography,art_concept&populate[bio][fields]=id,url&populate[concept][fields]=id,url`;

    const res = await fetch(bioEndpoint, { next: { revalidate: 3600 } });
    const bioData: BioData = await res.json();

    const { biography, art_concept, bio, concept } = bioData.data;

    const halfBiographyLength = Math.ceil(biography.length / 2);
    const firstHalf = biography.slice(0, halfBiographyLength);
    const secondHalf = biography.slice(halfBiographyLength);

    return (
        <main className={montserrat.className}>
            <div className="flex flex-col justify-between min-h-screen items-center">
                <Navbar />
                <Whatsapp />
                <ScrollToTop />

                <div className="container mx-auto py-12 px-22">
                    <h1 className="text-3xl font-medium mb-8">Biografía</h1>

                    <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            {firstHalf.map((paragraph, index) => (
                                <FormattedParagraph 
                                    key={index} 
                                    paragraph={paragraph}
                                />
                            ))}
                        </div>

                        {bio && (
                            <div className="relative w-full h-80 md:h-full min-h-[300px] overflow-hidden rounded-lg">
                                <Image
                                    src={bio.url}
                                    alt="Retrato de Claudia Vásquez"
                                    fill
                                    style={{ objectFit: "cover" }}
                                    className="rounded-lg"
                                />
                            </div>
                        )}
                    </div>

                    <div className="mb-12 space-y-1">
                        {secondHalf.map((paragraph, index) => (
                            <FormattedParagraph
                                key={index}
                                paragraph={paragraph}
                            />
                        ))}
                    </div>

                    <h2 className="text-2xl font-medium mb-6">
                        Concepto Artístico
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {concept && (
                            <div className="relative w-full h-80 md:h-full min-h-[300px] order-2 md:order-1 overflow-hidden rounded-lg">
                                <Image
                                    src={concept.url}
                                    alt="Obra conceptual de Claudia Vásquez"
                                    fill
                                    style={{ objectFit: "cover" }}
                                    className="rounded-lg"
                                />
                            </div>
                        )}

                        <div className="order-1 md:order-2 space-y-1">
                            {art_concept.map((paragraph, index) => (
                                <FormattedParagraph
                                    key={index}
                                    paragraph={paragraph}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </main>
    );
}