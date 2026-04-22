import logo from "@/assets/logo-bioenergy-white.png";
import meera from "@/assets/logo-meera-white.png";
import { Link } from "react-router-dom";

export const Footer = () => (
  <footer className="bg-ink text-ink-foreground">
    <div className="container-x py-16">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <img src={logo} alt="BioEnergy Global" className="h-12 w-auto" />
          <p className="mt-5 max-w-sm text-sm opacity-70">
            Organised by Meera Trade Fair Media Pvt. Ltd. — C-323, Tower C, Noida One, Sector 62, Noida, UP-201309.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.22em] opacity-50">Organised by</span>
            <img src={meera} alt="Meera Trade Fair Media" className="h-8 w-auto opacity-90" />
          </div>
        </div>
        <div className="grid gap-10 md:col-span-7 md:grid-cols-3">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] opacity-50">Events</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Bioenergy Global</li><li>Reneweex Global</li><li>Waste to Energy</li><li>Global Summit</li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] opacity-50">Visit</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Register</li><li>Exhibit</li><li>Speak</li><li>Partner</li>
              <li>
                <Link to="/admin/login" className="underline-offset-4 hover:underline">
                  Admin
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] opacity-50">Contact</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li>info@meeratradefair.com</li>
              <li>+91 9142 659 818</li>
              <li>+91 7011 807 613</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-ink-foreground/10 pt-6 text-xs opacity-60 md:flex-row md:items-center">
        <span>© 2026 Meera Trade Fair Media Pvt. Ltd. All rights reserved.</span>
        <span>Privacy · Terms · Code of conduct</span>
      </div>
    </div>
    <div className="overflow-hidden">
      <div className="container-x">
        <div className="font-display text-[18vw] leading-[0.85] tracking-tighter text-ink-foreground/8 select-none">
          BIOENERGY
        </div>
      </div>
    </div>
  </footer>
);
