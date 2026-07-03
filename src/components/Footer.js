import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">Our Day Studio</div>
        <div className="footer-links">
          <Link href="/">Home</Link>
          <Link href="/creations">Creations</Link>
          <Link href="/method">Method</Link>
          <Link href="/offers">Offers</Link>
          <Link href="/vision">Vision</Link>
        </div>
        <div className="footer-links" style={{ marginTop: '1rem' }}>
          <Link href="/contact">contact@ourdaystudio.com</Link>
        </div>
        <div className="footer-links" style={{ marginTop: '0.5rem' }}>
          <Link href="/legal">Legal Notice</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Sale</Link>
        </div>
        <p className="footer-copy">
          © {new Date().getFullYear()} Our Day Studio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
