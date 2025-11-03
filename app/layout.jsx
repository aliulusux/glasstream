import ThemeProvider, { useThemeX } from '@/components/ThemeProvider';
import './globals.css';

function Bg({ children }) {
  const { preset, PRESETS } = useThemeX();
  const g = PRESETS[preset] || PRESETS.amethyst;
  return (
    <div className={`min-h-screen text-gray-900 dark:text-white
      bg-gradient-to-b from-[${g.from}] via-[${g.via}] to-[${g.to}]`}>
      {children}
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Bg>{children}</Bg>
        </ThemeProvider>
      </body>
    </html>
  );
}
