import Link from 'next/link';
import { contact } from '@/lib/contact';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white/70 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="font-display text-xl font-semibold text-white mb-3">
              One<span className="text-gold">Handy</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs text-white/50">
              Your home, handled. English-speaking coordination and a pilot technician network for expat homeowners in Chiang Mai.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {contact.whatsappUrl ? (
                <a
                  href={contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 rounded-sm text-sm text-white/70 hover:border-gold hover:text-gold transition-colors duration-150"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.121.555 4.11 1.524 5.838L0 24l6.336-1.498A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.87 0-3.622-.49-5.14-1.348l-.37-.218-3.76.888.94-3.666-.24-.378A9.945 9.945 0 0 1 2 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/>
                  </svg>
                  {contact.whatsappLabel}
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 rounded-sm text-sm text-white/45">
                  {contact.whatsappLabel}
                </span>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">Services</h4>
            <ul className="space-y-2.5 text-sm">
              {['ac-cleaning', 'plumbing', 'electrical', 'gardening', 'emergency', 'property-care'].map((slug) => (
                <li key={slug}>
                  <Link
                    href={`/services/${slug}`}
                    className="capitalize hover:text-gold transition-colors"
                  >
                    {slug.replace(/-/g, ' ')}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/how-it-works" className="hover:text-gold transition-colors">How It Works</Link></li>
              <li><Link href="/pricing" className="hover:text-gold transition-colors">Pricing</Link></li>
              <li><Link href="/join" className="hover:text-gold transition-colors">Join as Technician</Link></li>
              <li><Link href="/book" className="hover:text-gold transition-colors">Request Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs text-white/30">
            <span>✓ Pilot technician network</span>
            <span>·</span>
            <span>✓ Payment after confirmation</span>
            <span>·</span>
            <span>✓ English coordination</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-white/30">
            <span>© {year} OneHandy</span>
            <Link href="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gold transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
