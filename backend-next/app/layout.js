export const metadata = {
  title: 'Backend Next API',
  description: 'Next.js backend for the modern task management platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
