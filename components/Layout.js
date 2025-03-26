import Footer from "./Footer";
import Navbar from "./Navbar";
import { ParallaxEffect } from "./ParallaxEffect";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <ParallaxEffect />
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
