import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

export const metadata = {
  title: "Pharmacy Hope",
  description: "Pharmacy Management System UI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="layout-body">
        <div className="layout-container">

          {/* Sidebar */}
          <Navbar />

          {/* Content (page + footer) */}
          <div className="content-area">
            <main className="page-content">
              {children}
            </main>

            <Footer />
          </div>

        </div>
      </body>
    </html>
  );
}
