import "./globals.css";

export const metadata = {
    title: 'Claudia Vásquez',
    description: 'Portfolio de arte de Claudia Vasquez',
    icons: {
      icon: [
        {
          url: '/favicon.ico',
          sizes: '128x128',
        },
      ],
      shortcut: ['/favicon.ico'],
      apple: [
        {
          url: '/favicon.ico',
          sizes: '128x128',
        },
      ],
    },
  }

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
