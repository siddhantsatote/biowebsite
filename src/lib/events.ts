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
  audience: string;
  overview: string;
  highlights: string[];
  whatYouGet: string[];
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
    audience: "Plant owners, EPC teams, feedstock suppliers, policy and public sector leaders",
    overview:
      "Bioenergy Global 2026 brings the full value chain together to accelerate practical deployment of biomass, biofuels and circular carbon solutions. The program focuses on financing, reliable feedstock pathways and policy frameworks that can scale projects faster.",
    highlights: [
      "Technology showcases for biomass and biofuel conversion",
      "Policy and incentive outlook for large-scale deployment",
      "B2B meetings with project developers and investors",
      "Case studies from operating plants and regional clusters",
    ],
    whatYouGet: [
      "Actionable market insights from experts",
      "Direct networking with solution providers",
      "A structured path from discovery to registration and entry pass",
    ],
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
    audience: "Developers, DISCOM teams, storage specialists, OEMs and clean-tech founders",
    overview:
      "Reneweex Global 2026 spotlights next-generation renewable systems across solar, wind, storage and green hydrogen. Attendees can evaluate technologies, compare partners and understand bankable models for grid-ready clean power projects.",
    highlights: [
      "Integrated renewable project showcases",
      "Green hydrogen and storage commercialization sessions",
      "Procurement and supply chain networking",
      "Live discussions on policy, banking and risk",
    ],
    whatYouGet: [
      "Clear direction on where renewable demand is growing",
      "Partner discovery for project execution",
      "Visitor pass with QR code for fast on-site entry",
    ],
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
    audience: "Municipal bodies, waste processors, utility buyers, climate and infra teams",
    overview:
      "Waste to Energy Expo is designed for stakeholders turning municipal and industrial waste streams into dependable energy output. It emphasizes project execution, feedstock reliability and measurable environmental impact.",
    highlights: [
      "MSW to energy pathways and operating benchmarks",
      "Biogas, gasification and advanced conversion tracks",
      "Public-private partnership and tendering guidance",
      "Technology comparison across scale and cost bands",
    ],
    whatYouGet: [
      "Implementation-focused technical sessions",
      "Access to solution providers and project partners",
      "A practical roadmap for local deployment",
    ],
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
    audience: "CXOs, policy leaders, investors, diplomats and strategic program heads",
    overview:
      "Bioenergy Global Summit is a leadership forum focused on strategy, capital and international collaboration for net-zero transitions. It connects policy and investment conversations with executable energy programs.",
    highlights: [
      "Executive dialogues on energy security and transition pace",
      "Capital access and risk-mitigation discussions",
      "Cross-border partnerships and market entry insights",
      "High-level networking with decision makers",
    ],
    whatYouGet: [
      "Strategic perspective for long-term planning",
      "Direct access to high-impact stakeholders",
      "Priority understanding of policy and investment shifts",
    ],
    focus: ["Net-Zero", "Diplomacy", "Capital"],
    img: sum,
    logo: logoNcbiLight,
    tone: "bg-ink text-ink-foreground",
  },
];
