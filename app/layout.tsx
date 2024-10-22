import { ThemeSwitcher } from "@/components";
import "./globals.css";
import { ThemeProvider } from "@/components/context/ThemeContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <html lang="en">
        <body className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <div className="relative min-h-screen">
            {/* Top Right Theme Switcher */}
            <div className="absolute top-4 right-4">
              <ThemeSwitcher />
            </div>
            {/* Main Content */}
            <div className="p-8">{children}</div>
          </div>
        </body>
      </html>
    </ThemeProvider>
  );
}
