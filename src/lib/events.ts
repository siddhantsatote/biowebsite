import bio from "@/assets/event-bioenergy.jpg";
import ren from "@/assets/event-reneweex.jpg";
import wte from "@/assets/event-waste.jpg";
import sum from "@/assets/event-summit.jpg";
import logoBioDark from "@/assets/logo-bioenergy.png";
import logoRen from "@/assets/logo-reneweex.png";
import logoWte from "@/assets/logo-wte.png";
import logoNcbiLight from "@/assets/logo-ncbi-white.png";

export type EventInfo = {
  id: string;
  registrationTable: string;
  n: string;
  name: string;
  tag: string;
  subtitle: string;
  focus: string[];
  img: string;
  logo: string;
  tone: string;
};

export const eventCatalog: EventInfo[] = [
  {
    id: "bioenergy-global-2026",
    registrationTable: "registrations_bioenergy_global_2026",
    n: "01",
    name: "Bioenergy Global 2026",
    tag: "Bringing global leaders together for a sustainable future.",
    subtitle: "Biomass, biofuels and policy innovation",
    focus: ["Biofuels", "Biomass", "Policy"],
    img: bio,
    logo: logoBioDark,
    tone: "bg-card text-foreground",
  },
  {
    id: "reneweex-global-2026",
    registrationTable: "registrations_reneweex_global_2026",
    n: "02",
    name: "Reneweex Global 2026",
    tag: "Empowering growth, sustaining the planet.",
    subtitle: "Solar, wind and green hydrogen ecosystem",
    focus: ["Solar", "Wind", "Green H2"],
    img: ren,
    logo: logoRen,
    tone: "bg-primary text-primary-foreground",
  },
  {
    id: "waste-to-energy-expo",
    registrationTable: "registrations_waste_to_energy_expo",
    n: "03",
    name: "Waste to Energy Expo",
    tag: "India's first specialised WTE exhibition.",
    subtitle: "MSW, biogas and conversion technologies",
    focus: ["Biogas", "MSW", "Gasification"],
    img: wte,
    logo: logoWte,
    tone: "bg-card text-foreground",
  },
  {
    id: "bioenergy-global-summit",
    registrationTable: "registrations_bioenergy_global_summit",
    n: "04",
    name: "Bioenergy Global Summit",
    tag: "Net-Zero & energy security - high-level forum.",
    subtitle: "Leadership forum on net-zero and energy security",
    focus: ["Net-Zero", "Diplomacy", "Capital"],
    img: sum,
    logo: logoNcbiLight,
    tone: "bg-ink text-ink-foreground",
  },
];
