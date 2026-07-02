import type { BusinessTargetDossier } from "../schemas";

// App-facing visit intelligence, sanitized for a PUBLIC deployment.
// Source: /home/malhefdi/travel/china-2026/business/dossiers/*.md (extracted +
// privacy-filtered). Contact details, personal names, phone/email/WeChat, and
// exact unit/street addresses are deliberately excluded and live only in the
// private travel pack. Area is district/science-park level. Do not add
// contact identifiers or unreleased product IP here.
export const demoBusinessTargets = [
  {
    id: "cn-bluepha",
    name: "Bluepha",
    nameLocal: "蓝晶微生物（北京蓝晶微生物科技有限公司）",
    category: "biomanufacturing",
    city: "Other",
    area: "Beijing (HQ); Yancheng, Jiangsu (production)",
    corridor: "Other",
    website: "https://www.bluepha-en.com/",
    oneLiner:
      "A leading Chinese synthetic-biology / PHA-biopolymer company with large-scale fermentation — a sector benchmark for ultra-high-density fermentation, but not a Shenzhen/GBA visit target.",
    whatTheyDo:
      "Synthetic-biology and materials-innovation company producing PHA (polyhydroxyalkanoate) — a 100% bio-based, marine-degradable biopolymer made by microbial fermentation rather than petrochemistry, for packaging, fibres and injection-moulding. It uses diverse feedstocks (starch, plant oil, sugarcane) and pushes non-grain-feedstock conversion and ultra-high-density fermentation. It runs a production base in Yancheng, Jiangsu (reported PHA capacity ~25,000 t/yr), reinvests roughly half of annual revenue into R&D, and has a strategic partnership with TotalEnergies Corbion.",
    whyItMatters:
      "A sector benchmark for large-scale microbial fermentation — specifically ultra-high-density fermentation and non-grain-feedstock conversion, which is the kind of biomanufacturing economics an AI-accelerated microbial-biocontrol platform must eventually hit. The value is learning how a leading Chinese synbio firm runs fermentation at tonnage and sustains heavy R&D reinvestment; they make a polymer, not an agri active, so there is no direct product tie — benchmark only.",
    visitObjective:
      "Benchmark large-scale microbial fermentation economics as a remote reference; only pursue an in-person meeting if a Shenzhen/GBA office is confirmed, otherwise keep on the watchlist rather than as a GBA stop.",
    route:
      "Remote benchmarking; approach via the company website only if a GBA office is confirmed to exist.",
    priority: "watchlist",
    confidence: "medium",
    talkingPoints: [
      "How they run ultra-high-density fermentation and the economics behind it",
      "Approach to non-grain-feedstock conversion and feedstock flexibility",
      "How they scale microbial fermentation to tonnage and sustain ~50% revenue R&D reinvestment",
      "Whether any Shenzhen/GBA office exists that would make a visit feasible"
    ],
    openQuestions: [
      "Whether any Shenzhen/GBA office or site actually exists for a visit",
      "Current PHA production capacity (sources give conflicting figures)",
      "Total funding raised to date (reported but not independently confirmed)",
      "Whether PHA has any material relevance to Pure Advance's product lines (likely low)"
    ],
    risks: [
      "Not a GBA site — HQ Beijing, production Yancheng — so this is remote benchmarking, not a Shenzhen visit",
      "Appointment-only; no confirmed GBA host",
      "Conflicting capacity figures and unconfirmed funding claims",
      "Polymer maker, not an agri active — no direct biocontrol product tie"
    ],
    fitScore: 45,
    status: "researched",
    publicSources: [
      "https://www.bluepha-en.com/",
      "https://www.bluepha-en.com/about-us-202212",
      "https://www.crunchbase.com/organization/bluepha"
    ]
  },
  {
    id: "cn-megarobo",
    name: "MegaRobo",
    nameLocal: "镁伽",
    category: "ai-biotech",
    city: "Shenzhen",
    area: "Shenzhen branch (HQ Beijing)",
    corridor: "Shenzhen",
    website: "https://en.megarobo.com",
    oneLiner:
      "A Beijing-headquartered embodied-AI-for-the-lab company fusing robotics automation and AI to build intelligent, self-running biological laboratories (MEGALAB) — the infrastructure layer under AI drug discovery, synthetic biology and bioprocess; included as a benchmark/ecosystem reference, with HQ in Beijing rather than the GBA.",
    whatTheyDo:
      "MegaRobo builds lab-automation robotics plus AI agents for life sciences, clinical diagnostics, applied chemistry and advanced manufacturing. Its flagship MEGALAB is billed as an all-purpose intelligent biological laboratory that automates the design–build–test–learn loop for new-drug R&D, gene/cell therapy and synthetic biology — the 'embodied AI in biotech' thesis that AI is only as good as the wet-lab data it can generate, so it sells the automated wet-lab that produces that data at scale. It also incubated and invested in an AI-automation chemical-synthesis CRO.",
    whyItMatters:
      "On the AI-for-discovery plus biomanufacturing-automation pillar the relevance is real: an embodied-AI automated design–build–test–learn substrate is exactly what lets a microbial-biocontrol platform screen strains and develop fermentation processes at scale, and MegaRobo markets explicitly to synthetic biology and bioprocess. But it is an enabling-tools/CapEx vendor rather than a near-term partner, and with HQ in Beijing and only a Shenzhen branch it is best treated as ecosystem context for how GBA synbio/biofoundries automate discovery and scale-up — a possible later vendor, not a priority meeting.",
    visitObjective:
      "Use as an ecosystem/benchmark reference for automated synbio and as a possible future automation vendor for an automated strain-discovery/fermentation lab — not a dedicated trip slot; confirm a Shenzhen-branch host and relevant on-site staff before considering any meeting.",
    route:
      "Corporate website / company channels; would require confirming a Shenzhen-branch host and on-site staff, or approaching the same theme via the Shenzhen biofoundry/synbio cluster.",
    priority: "watchlist",
    confidence: "low",
    talkingPoints: [
      "How MEGALAB automates the design–build–test–learn loop for strain screening",
      "Whether their automation is relevant to fermentation/strain work versus mammalian/discovery wet-lab",
      "What building an automated discovery/strain-screening lab would involve as a later vendor engagement",
      "How they relate to the Shenzhen biofoundry/synbio ecosystem"
    ],
    openQuestions: [
      "Shenzhen-branch staffing and whether a visit there is meaningful (HQ is Beijing; GBA presence may be minimal)",
      "Self-reported figures (staff, patents, funding raised) should be sanity-checked against a primary source",
      "Whether their automation genuinely applies to fermentation/strain work versus mammalian discovery",
      "The relationship between MegaRobo and the Shenzhen biofoundry/synbio cluster as a better GBA-anchored route",
      "Confirm its role as an ecosystem/benchmark reference and possible future vendor, not a primary trip target"
    ],
    risks: [
      "HQ is Beijing with only a Shenzhen branch — not a clean GBA partner, and the right people may not be in the GBA during the trip",
      "Enabling-tools/CapEx vendor rather than a near-term partner opportunity",
      "Self-reported operating figures are unverified",
      "Likely not worth a dedicated trip slot versus GBA-anchored targets"
    ],
    fitScore: 35,
    status: "researched",
    publicSources: [
      "https://en.megarobo.com/",
      "https://www.crunchbase.com/organization/megarobo",
      "https://www.selectscience.net/company/megarobo-technologies"
    ]
  },
  {
    id: "dg-oppo",
    name: "OPPO",
    nameLocal: "广东欧珀移动通信有限公司",
    category: "corporate-visit",
    city: "Dongguan",
    area: "Chang'an Town, Dongguan (Binhaiwan Bay)",
    corridor: "Dongguan",
    website: "https://www.oppo.com",
    oneLiner:
      "One of the world's largest smartphone makers, founded and still headquartered in Dongguan, with its core R&D, advanced testing and smart manufacturing concentrated in Chang'an Town.",
    whatTheyDo:
      "OPPO is a global smartphone, wearables and smart-device brand founded in Dongguan in 2004. Its registered HQ and operational/manufacturing core sit in Chang'an Town, Dongguan, where the campus houses R&D, an OPPO college, advanced testing and smart manufacturing — the place where charging technology and camera systems are developed and stress-tested. It is building a large new Chang'an R&D centre (KPF-designed) and a multi-billion-RMB HQ campus in Binhaiwan Bay.",
    whyItMatters:
      "A front-row view of consumer-electronics manufacturing and product-development discipline at global scale. The lessons are transferable rather than direct: how a hardware brand runs rapid design iteration, in-house testing/QA and high-volume manufacturing, and how co-locating R&D and the production line compresses the idea-to-product loop. Relevant if Pure Advance ever ships a connected device or needs the Dongguan electronics ecosystem for component sourcing — a benchmark, not a collaboration prospect.",
    visitObjective:
      "A Dongguan smartphone-manufacturing benchmark stop (paired naturally with vivo): a likely showcase/campus tour to study global-scale consumer-electronics manufacturing and product-development discipline, treated as a learning benchmark rather than a collaboration prospect.",
    route:
      "Direct / program-arranged Dongguan campus visit via the corporate website; confirm host and whether the stop is HQ, R&D campus, or factory.",
    priority: "medium",
    confidence: "high",
    talkingPoints: [
      "The NPI (new-product introduction) workflow",
      "In-house testing labs and how on-campus R&D speeds iteration",
      "The Dongguan supplier/component ecosystem",
      "Confirm the exact site, host, and NDA/photo rules ahead of the visit"
    ],
    openQuestions: [
      "Exact site visited (Chang'an HQ vs. a factory/exhibition hall) and photography rules",
      "Whether the new Binhaiwan Bay campus is operational and part of the visit vs. the existing Chang'an site",
      "Whether the program includes a session or is showcase-only"
    ],
    risks: [
      "A manufacturing/product-development benchmark, not a collaboration prospect",
      "Site type (HQ vs. factory vs. exhibition hall) and photography/NDA rules need confirming",
      "Whether a working session is included or it is showcase-only"
    ],
    fitScore: 40,
    status: "profiled",
    publicSources: [
      "https://www.kpf.com/project/oppo-dongguan",
      "https://www.digitimes.com/news/a20251117PD209/oppo-smartphone-manufacturing-development-dongguan-mobile.html",
      "https://www.acciyo.com/oppo-headquarters-in-china-the-dual-city-tech-hub-in-shenzhen-and-dongguan/"
    ]
  },
  {
    id: "dg-vivo",
    name: "vivo",
    nameLocal: "维沃移动通信有限公司",
    category: "corporate-visit",
    city: "Dongguan",
    area: "Chang'an Town, Dongguan (Binhai New Area)",
    corridor: "Dongguan",
    website: "https://www.vivo.com",
    oneLiner:
      "A top-tier global smartphone maker headquartered in Chang'an Town, Dongguan, running one of the region's largest integrated phone manufacturing complexes.",
    whatTheyDo:
      "vivo is a Chinese multinational smartphone and smart-device company headquartered in Dongguan. Its Chang'an Town industrial park integrates HQ, R&D, laboratories and high-volume manufacturing on one site — about 14 buildings across ~34.5 hectares, roughly 20,000 employees and an estimated ~6 million smartphones/month capacity. It also runs production in Shenzhen, Nanjing and overseas (India, Indonesia), but Dongguan is the operational heart.",
    whyItMatters:
      "Paired with OPPO, this is the Dongguan phones-at-scale stop — vertically organised, high-throughput manufacturing with R&D and production co-located. The transferable lessons are line throughput, quality control at volume, and how an integrated campus shortens the design-to-production cycle. It also grounds the Dongguan electronics supply chain for any future device components — a benchmark/learning visit, not a collaboration target.",
    visitObjective:
      "The second Dongguan smartphone-manufacturing stop (close to OPPO): a likely campus/showcase tour to study high-throughput, co-located manufacturing and QC at volume, as a learning benchmark rather than a collaboration target.",
    route:
      "Direct / program-arranged Dongguan campus visit via the corporate website; confirm the exact site and whether a session is included.",
    priority: "medium",
    confidence: "high",
    talkingPoints: [
      "End-to-end line flow and automation",
      "Quality control at ~6M units/month",
      "How co-located labs and production accelerate iteration",
      "The Dongguan supplier ecosystem; confirm exact site and photography rules"
    ],
    openQuestions: [
      "Exact facility on the itinerary (HQ vs. a specific factory) and photography rules",
      "Current capacity/headcount figures (sources vary by year)",
      "Whether a session/Q&A is included"
    ],
    risks: [
      "A benchmark/learning visit, not a collaboration target",
      "Site type (HQ vs. factory) and photography rules need confirming",
      "Reported capacity and headcount figures vary by year"
    ],
    fitScore: 40,
    status: "profiled",
    publicSources: [
      "https://en.wikipedia.org/wiki/Vivo_(technology_company)",
      "https://www.scmp.com/tech/gear/article/3093436/smartphone-giant-vivo-opens-new-manufacturing-complex-near-rival-huaweis",
      "https://officesnapshots.com/2019/10/29/vivo-headquarters-dongguan/"
    ]
  },
  {
    id: "dg-xbotpark",
    name: "XbotPark (Songshan Lake Robotics Base)",
    nameLocal: "松山湖国际机器人产业基地",
    category: "ecosystem",
    city: "Dongguan",
    area: "Songshan Lake, Dongguan",
    corridor: "Dongguan",
    website: "https://www.xbotpark.com",
    oneLiner:
      "A hardware-first startup incubator beside Songshan Lake that turns Dongguan's dense supply chain into a fast, cheap path from prototype to product — with a track record of producing robotics unicorns.",
    whatTheyDo:
      "XbotPark (the Songshan Lake International Robot Industry Base) was founded in 2014 out of the HKUST academic lineage linked to DJI and the InnoX accelerator. It backs early-stage, hardware-focused founders with manufacturing resources, mentorship and investment, leveraging Dongguan's thousands of factories and a strong smart-hardware supply chain so teams can design, prototype, test and iterate quickly and cheaply. It deliberately positions its model against Western software-first incubation and has a strategic framework agreement with HKUST(GZ).",
    whyItMatters:
      "The most directly relevant of the corporate stops — a working model of supply-chain-as-a-service for hardware startups. The angle is the methodology, not the product: how XbotPark de-risks physical-product development via local manufacturing, rapid iteration and shared services, and achieves an unusually high startup survival rate — directly portable to scaling fermentation/biomanufacturing hardware (bioreactors, process kit) and any future field-deployment, dosing/application or diagnostic hardware. The existing InnoX/HKUST link in Pure Advance's outreach gives strong mentor/network potential.",
    visitObjective:
      "Study the hardware-incubation methodology as a portable playbook for scaling bioprocess and device hardware; the most interactive of the corporate visits — explore access to the shared supply-chain network and whether bioprocess/biomedical hardware fits their model.",
    route:
      "Intro via the InnoX / HKUST accelerator network (cross-reference Pure Advance's existing InnoX outreach); verify the official site/contact on the day.",
    priority: "high",
    confidence: "medium",
    talkingPoints: [
      "How to access their shared supply-chain network",
      "The admission and mentorship model",
      "Whether bioprocess/biomanufacturing or biomedical-device hardware fits their model",
      "An intro to the InnoX/HKUST network, cross-referencing Pure Advance's existing outreach"
    ],
    openQuestions: [
      "Official website URL and current public contact (unverified in the dossier)",
      "Whether the program visit includes a session with leadership/mentors vs. a tour",
      "Applicability of their supply-chain/incubation model to biomedical hardware specifically"
    ],
    risks: [
      "A private incubation/manufacturing ecosystem, not a procurement vendor",
      "Reported figures (startups, unicorns, survival rate, cumulative valuation) need verifying in person",
      "Website and public contact are unverified in the dossier",
      "Fit of the model to bioprocess/biomedical hardware is unconfirmed"
    ],
    fitScore: 70,
    status: "profiled",
    publicSources: [
      "https://technode.com/2025/05/30/beyond-expo-2025-chinas-xbot-park-is-redefining-tech-incubation-and-leaving-western-models-behind-says-founder/",
      "https://english.news.cn/20250713/8cce582afdf8476b83f62c3dc93d7894/c.html",
      "https://www.hkust-gz.edu.cn/2022/07/19/hkust-gz-signs-strategic-framework-agreement-with-xbotpark/"
    ]
  },
  {
    id: "fs-victory-biotech",
    name: "Guangdong Victory Biotech",
    nameLocal: "广东冠昊生物科技有限公司",
    category: "biomanufacturing",
    city: "Foshan",
    area: "Nanhai District, Foshan",
    corridor: "Foshan",
    website: "https://www.victorybio.com",
    oneLiner:
      "A Foshan medical-grade collagen biomaterials manufacturer making atelocollagen, cross-linked collagen hydrogels and collagen wound dressings — a strong fit for Coolvex's skin-repair / barrier / retention biomaterials angle.",
    whatTheyDo:
      "Develops and manufactures Type I medical-grade collagen and devices: atelocollagen (powders, slurries, solutions; over 98 percent purity, ultra-low endotoxin), injectable/dermal-filler collagen, collagen wound dressings (powder and sponge), bone-graft substitutes, dental and cosmetic collagen. A flagship is a lyophilized cross-linked collagen-hydrogel powder made via a directed pre-crosslinking process. Runs its own R&D and manufacturing (Foshan plant plus a second facility in Wuzhou, Guangxi).",
    whyItMatters:
      "Secondary Coolvex (topical) line only — not the lead agri-biocontrol platform, since it is an animal-derived collagen biomaterials maker with no microbial-discovery or fermentation-CDMO angle. Its strength — medical-grade collagen, cross-linked collagen hydrogels and wound dressings — maps onto the skin-repair / barrier / retention biomaterials space the Coolvex topical line needs, and its medical-device-grade purity signals real manufacturing rigour.",
    visitObjective:
      "Secondary (Coolvex topical) meeting: lead with cross-linked collagen hydrogels and barrier-repair dressings; assess cosmetic-grade and custom collagen-matrix supply for a barrier-repair topical.",
    route:
      "Foshan day-trip (appointment-only); secondary Coolvex meeting — combine with a Guangzhou day.",
    priority: "medium",
    confidence: "high",
    talkingPoints: [
      "Is cosmetic-grade collagen available for a topical product (vs strictly medical-device grade), and is there a recombinant / non-animal collagen option for halal positioning?",
      "Will you do custom / contract formulation of a collagen delivery matrix, or is it catalogue supply only?",
      "Can the cross-linked collagen hydrogel and atelocollagen support a barrier-repair topical's barrier, moisture-hold and retention needs?",
      "Bring: Pure Advance one-pager (AI-accelerated microbial biocontrols); NDA template."
    ],
    openQuestions: [
      "Confirm the registered Chinese entity / legal name.",
      "Confirm cosmetic-grade vs strictly medical-device-grade availability for a topical, and any recombinant (non-animal) collagen option.",
      "Confirm whether they offer custom/contract formulation of a collagen delivery matrix vs catalogue supply only.",
      "Verify current capacity, certifications and commercial terms before procurement."
    ],
    risks: [
      "Collagen is animal-derived (bovine/porcine) — a halal / positioning consideration.",
      "A biomaterials maker, not a fermentation CDMO — no agri-biocontrol or microbial-discovery angle (secondary Coolvex line only).",
      "Appointment-only."
    ],
    fitScore: 60,
    status: "candidate",
    publicSources: [
      "https://www.victorybio.com",
      "https://www.victorybio.com/company-profile.html",
      "https://www.victorybio.com/rd-innovation.html"
    ]
  },
  {
    id: "gz-ausmetics",
    name: "Ausmetics Daily Chemicals",
    nameLocal: "澳斯曼",
    category: "coolvex-sourcing",
    city: "Guangzhou",
    area: "Guangzhou Economic & Technological Development District",
    corridor: "Guangzhou",
    website: "https://www.ausmetics.com",
    oneLiner:
      "An export-oriented, audit-heavy cosmetic OEM/ODM (since 1998; 600+ brands; bases in Guangzhou/Dongguan/Zengcheng) with sensitive-skin and natural collections — a partner to turn a chosen Coolvex active into a compliant finished ointment.",
    whatTheyDo:
      "Full OEM/ODM for serum, cream, lotion, cleanser, mask and body care; R&D-led with Australian formulation heritage; offers organic/natural/sensitive/vegan collections and CPSR safety assessments.",
    whyItMatters:
      "A formulation/manufacturing partner rather than a hero active: a strong, Western-audited cosmetic OEM/ODM with a sensitive-skin focus that could turn a chosen Coolvex active into a compliant finished product. Best engaged once an active is selected; confirm broken-skin / medical-adjacent ointment experience and low-MOQ flexibility.",
    visitObjective:
      "Assess as a formulation/manufacturing partner: broken-skin / barrier ointment experience and regulatory path, Halal + GCC/GSO export support, lowest MOQ for a niche SKU, and co-formulating around a client-supplied active with stability testing and CPSR.",
    route: "Direct outreach (appointment-only); Guangzhou day-trip (~35 min HSR from Shenzhen).",
    priority: "high",
    confidence: "medium",
    talkingPoints: [
      "What is your experience formulating barrier / repair ointments for compromised skin, and the regulatory path?",
      "Do you support Halal + GCC / GSO export, and what is the lowest MOQ for a startup SKU?",
      "Can you co-formulate around a supplied recombinant-collagen / mussel-protein / marine active, with stability testing and CPSR?",
      "Bring: Pure Advance one-pager; Coolvex target product profile (general, pre-NDA); NDA template."
    ],
    openQuestions: [
      "Confirm appointment availability, host team and current visitor entrance.",
      "Confirm current commercial terms / financial standing if this becomes a procurement or collaboration target."
    ],
    risks: [
      "Private OEM/ODM; no audited public financials (third-party revenue estimates are low confidence).",
      "A formulation/manufacturing partner, not a hero active — best engaged once an active is chosen.",
      "Broken-skin / medical-adjacent ointment experience still to be confirmed."
    ],
    fitScore: 70,
    status: "researched",
    publicSources: [
      "https://www.ausmetics.com",
      "https://www.ausmetics.com/about-us/",
      "https://ausmetics.en.alibaba.com/"
    ]
  },
  {
    id: "gz-cantonbio",
    name: "Canton Biologics (Hanten Biotech)",
    nameLocal: "广州汉腾生物科技有限公司",
    category: "biomanufacturing",
    city: "Guangzhou",
    area: "Guangzhou (HQ); Foshan Kunlun & Guangzhou Penglai GMP bases",
    corridor: "Guangzhou",
    website: "https://www.cantonbio.com/",
    oneLiner:
      "South China's largest large-molecule biologics CDMO — antibody/recombinant-protein focused, with strong process development and downstream and ~13,000 L GMP capacity across two GBA bases. A credible recombinant-protein and (smaller) microbial-fermentation partner, with the caveat that the core is mammalian CHO antibody work.",
    whatTheyDo:
      "Founded 2016 in Guangzhou; national high-tech enterprise; an international large-molecule biopharma CDMO. End-to-end DNA-to-IND-to-commercial services: cell-line development, upstream and downstream process development, formulation, fill-finish, characterisation, validation and GMP production. Modalities span mAbs, bispecifics, fusion and recombinant proteins, recombinant vaccines, viral vectors and cell therapy, and it lists a dedicated microbial platform among services. Claims 100+ clients, 400+ delivered projects and 50+ external audits passed.",
    whyItMatters:
      "Medium fit on the biomanufacturing leg of Pure Advance's platform: a high-end GBA biologics CDMO with mature process development, downstream purification and GMP discipline that also lists recombinant-protein and microbial service lines. Value is learning whether that microbial line can take an external pilot-scale fermentation project; the core business is mammalian-cell antibody work, and topical relevance is indirect.",
    visitObjective:
      "Meet to learn whether the microbial / recombinant-protein line can take an external pilot-scale fermentation project (biocontrol protein or enzyme), benchmark a high-end CDMO's process-dev/QA, and confirm which site to visit.",
    route: "Appointment-only via BD/contact page; GBA day-trip (Foshan / Guangzhou).",
    priority: "medium",
    confidence: "medium",
    talkingPoints: [
      "Does the microbial / recombinant-protein service line accept external pilot-scale fermentation projects (5 L to 1000 L+), e.g. a biocontrol protein or enzyme?",
      "What is the capacity split (mammalian vs microbial), and lead times / MOQ for a small pilot?",
      "Do you have export/quality documentation and KSA/GCC suitability for a protein-based active?",
      "Confirm which site to visit (HQ meeting vs GMP plant tour)."
    ],
    openQuestions: [
      "Whether the microbial line is a genuine external service or a minor adjunct to the mammalian CHO core.",
      "Capacity split (mammalian vs microbial), lead times and MOQ for a small pilot.",
      "Export/quality docs and KSA/GCC suitability for a protein-based active.",
      "Confirm a direct BD/commercial contact and which site to visit before travel."
    ],
    risks: [
      "Core business is mammalian-cell (CHO) antibody CDMO, not microbial fermentation — fit for the microbial pilot priority is unproven.",
      "Topical relevance is indirect (protein/peptide active supply at most).",
      "Appointment-only; direct BD contact not captured."
    ],
    fitScore: 50,
    status: "candidate",
    publicSources: [
      "https://www.cantonbio.com/",
      "https://www.cantonbio.com/solu/wsw/",
      "https://www.biospectrumasia.com/news/40/23035/chinese-startup-canton-biologics-completes-300-m-yuan-series-c-financing.html"
    ]
  },
  {
    id: "gz-kingfa",
    name: "Kingfa Science & Technology",
    nameLocal: "金发科技股份有限公司",
    category: "biomanufacturing",
    city: "Guangzhou",
    area: "Guangzhou Science City, Huangpu",
    corridor: "Guangzhou",
    website: "https://www.kingfa.com/en/",
    oneLiner:
      "A large listed advanced-materials maker (modified plastics, biodegradable plastics, bio-based materials) growing a green-biomanufacturing arm — relevant for materials/packaging adjacency, not active-ingredient fermentation.",
    whatTheyDo:
      "Founded 1993, HQ in Guangzhou Science City. One of the world's largest bioplastic producers (~274,000 t bio-based plastics in 2024). Portfolio: modified plastics, fully biodegradable plastics, special engineering plastics, carbon-fibre composites, hydrogen energy and high-performance resins. Expanding into green biomanufacturing (bio-based organic acids such as L-lactic and succinic acid, bio-based 1,4-BDO, bio-based polyesters), with a completed ~10,000 t/yr bio-based 1,4-BDO plant in Liaoning (early 2025).",
    whyItMatters:
      "Low / watchlist. Not a fit for Pure Advance's lead identity (no microbial discovery, biocontrol or active-ingredient fermentation, and not a finished-product CDMO). Plausible only as a downstream materials contact — bio-based/biodegradable carriers, controlled-release matrices, applicators or packaging — if the secondary Coolvex line later needs them. Large and volume-driven; keep as a watchlist materials contact.",
    visitObjective:
      "Watchlist materials contact: explore any external bio-based / carrier materials, biodegradable applicators or packaging for the Coolvex line, and whether a small-volume engagement is possible.",
    route: "Corporate / BD channels (formal process); Guangzhou day-trip only.",
    priority: "watchlist",
    confidence: "medium",
    talkingPoints: [
      "Do you offer any external bio-based-materials or carrier-material service relevant to a topical product (nanocomposite carriers, applicators, packaging)?",
      "Is a small-volume engagement even possible for an early-stage partner, given your volume-driven model?",
      "Could the green-biomanufacturing arm support bio-based excipients or biodegradable applicator materials for Coolvex?",
      "Bring: Pure Advance one-pager; NDA template."
    ],
    openQuestions: [
      "Any external bio-based-materials / carrier-material service relevant to a topical product.",
      "Whether a small-volume engagement is even possible with a large, volume-driven supplier."
    ],
    risks: [
      "Not a fit for the lead (no microbial discovery, biocontrol or active-ingredient fermentation; not a finished-product CDMO).",
      "Large, volume-driven and not topical-healthcare focused — small-volume engagement may not be viable.",
      "Watchlist materials contact only; expect a formal corporate process."
    ],
    fitScore: 25,
    status: "candidate",
    publicSources: [
      "https://www.kingfa.com/en/",
      "https://www.kingfa.com/en/portal/article/index/id/8356/cid/110.html",
      "https://baike.baidu.com/en/item/Kingfa%20Sci.%20and%20Tech.%20Co.,%20Ltd./13058"
    ]
  },
  {
    id: "gz-marubi-biotech",
    name: "Marubi Biotech",
    nameLocal: "丸美生物技术股份有限公司",
    category: "biomanufacturing",
    city: "Guangzhou",
    area: "Guangzhou Science City, Huangpu",
    corridor: "Guangzhou",
    website: "https://www.marubi.com.cn",
    oneLiner:
      "A listed Guangzhou skincare company that has built real recombinant-collagen and fermentation R&D (500+ patents) around barrier repair and anti-ageing — a science-led GBA player to learn from, though access for a small partner may be harder.",
    whatTheyDo:
      "Guangdong Marubi Biotechnology (founded 2002, Shanghai-listed 2019) started in eye care and expanded into recombinant collagen and clinically-oriented functional skincare. It develops 'Triple Helix' recombinant collagen for higher biocompatibility versus animal-derived collagen and has published peer-reviewed work on recombinant dual-humanised collagen for anti-skin-ageing. It reports 500+ patents (by 2025) and operates biotech subsidiaries — Guangzhou Huike Biotech and Guangzhou Cheer-Derm Biotech — co-located in the Guangzhou Science City area.",
    whyItMatters:
      "Medium — strong on science, lower on accessibility, and a secondary-line peer rather than a lead fit. As a listed skincare-science company, its recombinant-collagen, barrier-repair and peptide-delivery focus maps onto the Coolvex topical line's skin-repair and delivery themes and offers a useful biomanufacturing/fermentation benchmark, but with its own pipelines it is unlikely to act as a contract CDMO; the realistic angle is ingredient sourcing (via Huike/Cheer-Derm), delivery know-how or a strategic conversation.",
    visitObjective:
      "Explore recombinant-collagen ingredient sourcing (via Huike/Cheer-Derm) and delivery-system know-how for the Coolvex topical line, and benchmark the fermentation/recombinant-protein R&D; a strategic/benchmark conversation rather than pilot manufacturing.",
    route:
      "Warm intro / program network; target R&D and ingredient subsidiaries (Huike / Cheer-Derm); Guangzhou day-trip.",
    priority: "medium",
    confidence: "medium",
    talkingPoints: [
      "Do the Huike or Cheer-Derm subsidiaries sell your Triple Helix recombinant collagen externally as an ingredient?",
      "Is there openness to a delivery-system / barrier-repair co-development with an external founder, or is access ingredient-sourcing only?",
      "Which team is the right BD / ingredient contact (Marubi vs Huike vs Cheer-Derm) and which Science City site to visit?",
      "Bring: Pure Advance one-pager; NDA template."
    ],
    openQuestions: [
      "Whether Huike / Cheer-Derm sell recombinant collagen externally as an ingredient.",
      "Confirm a usable BD / ingredient contact route and the exact Science City site.",
      "Verify the registered Chinese entity name and current site details.",
      "Assess realistic openness to an external pilot/partnership before committing a day-trip."
    ],
    risks: [
      "As a listed consumer brand with its own pipelines, unlikely to act as a contract fermentation CDMO.",
      "Access for a small partner may be harder; realistic angle is ingredient sourcing / know-how, not pilot manufacturing.",
      "No public BD contact confirmed; approach needs a warm intro."
    ],
    fitScore: 55,
    status: "candidate",
    publicSources: [
      "https://www.marubi.com.cn",
      "https://pmc.ncbi.nlm.nih.gov/articles/PMC12109386/",
      "https://market.chemlinked.com/insight/from-lab-to-market-the-rising-recombinant-collagen-in-the-cosmetic-industry"
    ]
  },
  {
    id: "gz-microbiology-institute",
    name: "Guangzhou Institute of Microbiology Group",
    nameLocal: "广州市微生物研究所集团股份有限公司（广微集团）",
    category: "biomanufacturing",
    city: "Guangzhou",
    area: "Huangpu District, Science City",
    corridor: "Guangzhou",
    website: "https://www.gimgc.com",
    oneLiner:
      "A 50-year-old Guangzhou-municipal microbiology institute (now a state-controlled joint-stock group) that operates the Guangdong Provincial Microbial Germplasm Resource Bank and does microbial fermentation, biopharma and bio-product R&D — an institutional microbial-strain resource with deep collections and screening capability.",
    whatTheyDo:
      "Founded 1972 and restructured into a state-controlled joint-stock group in 2022, GIMGC is a Guangzhou-municipal R&D body working across microbial fermentation, biopharmaceuticals, bio-product R&D/production and testing/certification (it hosts a national air-purification product testing centre). It operates the one-stop Guangdong Provincial Microbial Germplasm Resource Bank — a curated microbial collection with screening, identification and preservation services offered to industry.",
    whyItMatters:
      "A resource-and-capability partner for Pure Advance's lead microbial-resource-discovery and biocontrol platform: access to a provincial germplasm bank as a source of candidate and reference strains, plus strain-isolation, screening, identification and fermentation-development as paid services that de-risk early discovery without building a wet lab — and a credible government-linked Guangzhou relationship. Any Coolvex topical angle is indirect.",
    visitObjective:
      "Explore access to the Guangdong Provincial Microbial Germplasm Resource Bank and its paid strain-isolation/screening/identification/fermentation-development services as a strain-sourcing and reference-bank partner for the biocontrol discovery platform, and build a government-linked Guangzhou relationship.",
    route:
      "Appointment-only; approach via the institute's germplasm-bank / science-service platform team on a Guangzhou GBA rail day-trip from Shenzhen (cluster with MoonBio).",
    priority: "medium",
    confidence: "medium",
    talkingPoints: [
      "Can external companies access or license strains from the provincial germplasm bank, and on what terms?",
      "Do you offer strain-isolation, screening, identification and fermentation-development as paid services?",
      "Do your collections include agri- and biocontrol-relevant strains (and, secondarily, any skin/postbiotic-relevant strains)?",
      "Which entity actually holds the strains we would want — the city institute, the provincial academy (GDIM), or GDMCC?",
      "Bring: Pure Advance one-pager and bilingual cards."
    ],
    openQuestions: [
      "Distinguish the same-named entities (city institute vs GDIM provincial academy vs GDMCC) — confirm which holds the strains and who to engage.",
      "Whether external companies can access/license strains from the provincial germplasm bank, and on what terms.",
      "Whether they hold or screen agri- and biocontrol-relevant strains (and secondarily skin/postbiotic-relevant strains).",
      "A verified BD / science-service-platform contact channel for the resource bank.",
      "Current scope and size of the germplasm collection."
    ],
    risks: [
      "As a state institute, its tempo and IP terms may be constrained and it may be unwilling to grant an overseas company exclusive strain rights.",
      "Bio-industrial/agri/testing-oriented rather than skin-specialised — the Coolvex angle is indirect.",
      "Confusable with same-named Guangdong entities (GDIM, GDMCC) — verify the right organisation.",
      "Institutional host rather than a normal vendor — confirm collaboration mechanics and appointment on site before travel."
    ],
    fitScore: 62,
    status: "researched",
    publicSources: [
      "https://www.gimgc.com/",
      "https://baike.baidu.com/item/广州市微生物研究所/862211",
      "https://gdmcc.net/"
    ]
  },
  {
    id: "gz-moonbio",
    name: "MoonBio (Moon Guangzhou Biotech)",
    nameLocal: "慕恩（广州）生物科技有限公司",
    category: "biomanufacturing",
    city: "Guangzhou",
    area: "Huangpu District, Science City (Guangzhou High-tech Zone)",
    corridor: "Guangzhou",
    website: "https://www.moonbio.com/",
    oneLiner:
      "Guangzhou's strongest pilot-fermentation lead — a microbial-resource-and-biomanufacturing platform selected onto China's first national biomanufacturing pilot-platform list, with a very large proprietary strain library and a full-chain discovery-to-scale-up process.",
    whatTheyDo:
      "Founded 2016, MoonBio commercialises microbiome resources via its DREAM platform: biodiversity access, high-throughput screening, fermentation optimisation and formulation. Application areas span bio-agriculture, microbial protein, biomedicine/live-bacteria drugs and food/additives, and it was selected into the first national batch of biomanufacturing pilot platforms. It also runs a published fee-for-service (commissioned) business including strain isolation/identification, bio-synthesis and microbial testing (explicitly accepting cosmetic-sample microbial testing).",
    whyItMatters:
      "High on the lead priority: bio-agriculture is an explicit MoonBio application area, so its very large proprietary strain library and discovery-to-scale-up chain map directly onto Pure Advance's AI-accelerated microbial-biocontrol and resource-discovery core, with a national-listed pilot platform that may run external batches. Secondary angle: the same library could screen microbes and postbiotics for skin-barrier or anti-irritation effects for the Coolvex line.",
    visitObjective:
      "Assess external pilot/scale-up fermentation capacity and downstream processing, plus library screening for skin-barrier / anti-irritation / postbiotic actives, and clarify the IP model — serving both the lead biocontrol platform and the secondary Coolvex line.",
    route:
      "Direct published BD channel (an InnoX/program intro is helpful but not required); plan a dedicated Guangzhou day-trip from Shenzhen.",
    priority: "must_contact",
    confidence: "high",
    talkingPoints: [
      "Can you screen microbes, metabolites or postbiotics for skin-barrier or anti-irritation effects?",
      "What external pilot-scale fermentation capacity and downstream processing do you offer?",
      "Any cosmetic/dermatology ingredient experience, and what is the IP model for discovered strains?",
      "Is a Guangzhou day-trip visit possible during the program?",
      "Bring: Pure Advance one-pager, screening-targets brief and NDA template."
    ],
    openQuestions: [
      "Do they accept external pilot fermentation / CDMO projects, and at what working volumes (5 L to 1000 L+)?",
      "Any cosmetic/dermatology/topical ingredient experience, or only food/agri/biomed?",
      "Downstream processing and quality documentation (COA, INCI/CAS, stability) for topical use.",
      "IP model for discovered strains/metabolites.",
      "Reconcile the reported strain-library count (~230k vs ~340k) and 2015/2016 founding date; export to KSA/GCC.",
      "Confirm a BD contact channel and exact metro access before travel."
    ],
    risks: [
      "Public service field skews food/additives/agriculture rather than dermatology/cosmetics — topical-active track record not yet evidenced.",
      "External pilot/industrial fermentation volumes, terms and GMP grade are unconfirmed.",
      "Requires a dedicated Guangzhou day-trip from Shenzhen.",
      "No GCC/Saudi/halal/export signal found."
    ],
    fitScore: 85,
    status: "profiled",
    publicSources: [
      "https://www.moonbio.com/",
      "https://www.moonbio.com/Biomanufacturing",
      "https://www.moonbio.com/newsinfo/10837578.html"
    ]
  },
  {
    id: "gz-nikoo-chemical",
    name: "NIKOO Chemical",
    nameLocal: "广州尼酷化工有限公司",
    category: "coolvex-sourcing",
    city: "Guangzhou",
    area: "Baiyun District",
    corridor: "Guangzhou",
    website: "https://www.nikoochem.com",
    oneLiner:
      "A Guangzhou skincare-raw-material supplier and custom-solution house with an unusually Coolvex-relevant catalogue — recombinant collagens, repair/anti-sensitisation peptides, bio-fermented filtrates, and a recombinant mussel adhesive protein (a bioadhesive skin-barrier active).",
    whatTheyDo:
      "NIKOO Chemical has ~15 years supplying cosmetic raw materials plus formulation and custom (OEM-style) solutions. Its catalogue spans amino-acid surfactants, emulsifiers, liposome encapsulation, bio-fermented filtrates, fermentation actives, oligopeptides and a large functional-peptide range, plus recombinant proteins (humanized collagen types I/III/XVII, elastin, fibronectin, serum protein, metallothionein) and a recombinant Mussel Adhesive Protein marketed for repair and anti-sensitisation. It also does finished-formula development.",
    whyItMatters:
      "Secondary Coolvex-line fit only (no agri-biocontrol or microbial-discovery angle, so it does not serve the lead platform): the most directly on-brief actives shelf for a sensitive-area topical — a recombinant mussel adhesive protein as a canonical wet-surface bioadhesive for retention, alongside anti-allergic repair peptides, recombinant fibronectin and type XVII collagen for barrier repair and adhesion — plus custom formulation support.",
    visitObjective:
      "Evaluate NIKOO as a Coolvex actives and formulation partner — the recombinant mussel adhesive protein and anti-sensitisation repair peptides — and confirm whether they manufacture or source, plus regulatory/INCI documentation and custom-formulation terms.",
    route:
      "Appointment-only; direct outreach on a Guangzhou day-trip from Shenzhen, easily clustered with other Guangzhou collagen/actives targets.",
    priority: "high",
    confidence: "high",
    talkingPoints: [
      "Do you manufacture the recombinant Mussel Adhesive Protein and other recombinant proteins in-house, or source/distribute them?",
      "Can you share INCI / cosmetic-grade regulatory documentation for the mussel adhesive protein and anti-sensitisation repair peptides?",
      "What are the MOQ, sampling and custom-formulation terms for a Coolvex sensitive-area topical?",
      "Bring: Pure Advance one-pager and NDA template."
    ],
    openQuestions: [
      "Whether NIKOO manufactures the recombinant proteins in-house (fermentation) or sources/distributes them — determines supplier vs manufacturing partner.",
      "The registered Chinese company name (transliteration inferred).",
      "Regulatory/INCI documentation and cosmetic-grade compliance for the mussel adhesive protein and repair peptides.",
      "MOQ, sampling and custom-formulation terms."
    ],
    risks: [
      "Likely a supplier/solutions house that sources or blends rather than a primary fermentation manufacturer — confirm in-house manufacturing.",
      "No agri-biocontrol or microbial-discovery angle; serves only the secondary Coolvex topical line.",
      "Regulatory/INCI documentation, MOQ and export history are unverified.",
      "Registered legal entity name is inferred."
    ],
    fitScore: 58,
    status: "researched",
    publicSources: [
      "https://www.nikoochem.com",
      "https://www.nikoochem.com/recombinant-collagen.html",
      "https://www.nikoochem.com/recombinant-mussel-mucin.html"
    ]
  },
  {
    id: "gz-scsio-marine",
    name: "SCSIO — Marine Materia Medica (CAS)",
    nameLocal: "中国科学院南海海洋研究所",
    category: "ecosystem",
    city: "Guangzhou",
    area: "Haizhu District",
    corridor: "Guangzhou",
    website: "http://english.scsio.cas.cn/",
    oneLiner:
      "The CAS South China Sea Institute of Oceanology's Guangdong Key Lab of Marine Materia Medica — China's best-placed marine-microbial natural-products lab for antimicrobial/antioxidant actives, and the most travel-accessible marine institute (in Guangzhou).",
    whatTheyDo:
      "Discovery of antimicrobial, antibacterial/antifungal, cytotoxic and antioxidant compounds from marine-derived fungi, actinomycetes (Streptomyces) and mangrove microbes (polyketides, alkaloids, peptides, meroterpenoids), including genome-mining of bioactive natural-product producers. Hosts the RNAM Center for Marine Microbiology within a CAS Guangdong Key Lab (institute established 1959).",
    whyItMatters:
      "Strong on the antimicrobial dimension of an intensive-care topical and the most travel-accessible marine-R&D institute from Shenzhen/Hong Kong. Best positioned as a research/co-development and contract-screening partner for antimicrobial and antioxidant marine-microbial actives; partial fit because its strength is small-molecule natural products rather than barrier polysaccharides.",
    visitObjective:
      "Explore licensing/co-development and contract screening of antimicrobial/antioxidant marine-microbial natural products for an intensive-care topical, and map the CAS route and timeline for a foreign startup to license a compound or fund targeted discovery.",
    route:
      "Introduction/appointment-only via the CAS / international-cooperation channel; Guangzhou HSR day-trip from Shenzhen.",
    priority: "high",
    confidence: "high",
    talkingPoints: [
      "Which antimicrobial marine-microbial compounds are at a stage suitable for topical-use licensing or co-development?",
      "Do you offer contract antimicrobial / antioxidant screening of an external formulation against skin / perianal pathogens?",
      "What is the CAS route and timeline for a foreign startup to license a compound or fund targeted discovery?",
      "Bring: Pure Advance one-pager, a general pre-NDA Coolvex target-properties brief, and an NDA / material-transfer template."
    ],
    openQuestions: [
      "Appointment availability, named host, and current visitor entrance.",
      "Current commercial/licensing terms and institutional standing if this becomes a procurement or collaboration target."
    ],
    risks: [
      "Not a commercial company — a CAS institute, so collaboration, licensing and material-transfer mechanics, tempo and terms are institutional.",
      "Strength is small-molecule marine-microbial natural products rather than barrier polysaccharides — a partial fit.",
      "Introduction-only via the CAS channel; secure a host and specific asks before travel."
    ],
    fitScore: 68,
    status: "researched",
    publicSources: [
      "http://english.scsio.cas.cn/",
      "http://english.scsio.cas.cn/research/keylaboratories/",
      "https://pubs.acs.org/doi/abs/10.1021/acs.jnatprod.2c00900"
    ]
  },
  {
    id: "gz-tidetron",
    name: "Tidetron Bioworks (Taichuang)",
    nameLocal: "态创生物（Tidetron）",
    category: "biomanufacturing",
    city: "Guangzhou",
    area: "Haizhu District",
    corridor: "Guangzhou",
    website: "https://www.tidetronbio.com/",
    oneLiner:
      "A fast-funded Guangzhou synthetic-biology multi-substance mass-production platform built on an intelligent fermentation system — peptides and small molecules at a claimed 10,000-tonne-plus annual capacity. A credible GBA fermentation-platform lead, with several specifics still to confirm.",
    whatTheyDo:
      "Founded 2021, Tidetron positions itself as one of the first synthetic-biology platforms for multi-substance mass production, with a proprietary strain/parts library (Tidetron Altra) as its engine. It focuses on small-molecule peptides plus consumer-facing ingredients (cosmetics, food and beverage, home care), with ~30 substances on sale, and operates a smart factory with a customised intelligent fermentation system (described as ultra-mild, low-energy) and a stated capacity exceeding 10,000 t/yr.",
    whyItMatters:
      "A genuine GBA synthetic-biology mass-production platform pairing a proprietary strain/parts library with an intelligent fermentation system — the strain-library plus biomanufacturing combination relevant to Pure Advance's biocontrol programme, with peptide and consumer-ingredient chemistry adjacent to the Coolvex line. It is a synbio platform with its own products more than an open CDMO, so whether it takes external custom-fermentation/tolling work is the key open question.",
    visitObjective:
      "Determine whether Tidetron accepts external custom fermentation/tolling and at what volumes, assess the synbio strain-library plus intelligent-fermentation platform for scaled biocontrol/peptide production, and verify its capacity and site claims.",
    route:
      "Appointment-only; identify the BD/sales channel via the company site and plan a Guangzhou Haizhu GBA day-trip from Shenzhen.",
    priority: "medium",
    confidence: "medium",
    talkingPoints: [
      "Do you accept external custom fermentation / tolling, and at what working volumes (5 L to 1000 L+)?",
      "Where is the production factory, are plant visits possible, and what are the real installed fermentation volumes versus the stated 10,000 t/yr?",
      "Do you have cosmetic/food-grade quality documentation for peptides/actives, can you export to KSA/GCC, and what is the MOQ?"
    ],
    openQuestions: [
      "Whether Tidetron accepts external custom fermentation/tolling (5 L to 1000 L+) versus only selling its own products.",
      "Exact factory location and whether plant visits are possible; real (versus claimed) installed fermentation volumes.",
      "Registered legal entity name and city of registration; the 10,000 t/yr capacity is company-stated.",
      "A direct BD/commercial contact channel.",
      "Cosmetic/food-grade quality docs for any peptide/active; export to KSA/GCC; MOQ."
    ],
    risks: [
      "A synbio platform with its own products, not a classic open CDMO — may not take external tolling.",
      "Capacity (>10,000 t/yr), factory location and site claims are company-stated and unverified.",
      "Cosmetic/food-grade QC, export to KSA/GCC and MOQ are unconfirmed.",
      "Registered legal entity name and city of registration still to confirm."
    ],
    fitScore: 60,
    status: "candidate",
    publicSources: [
      "https://www.tidetronbio.com/en/",
      "https://www.foodtalks.cn/company/Tidetron",
      "https://m.nbd.com.cn/articles/2022-03-14/2165434.html"
    ]
  },
  {
    id: "gz-tinci",
    name: "Guangzhou Tinci Materials",
    nameLocal: "广州天赐高新材料股份有限公司",
    category: "coolvex-sourcing",
    city: "Guangzhou",
    area: "Guangzhou Economic & Technological Development District",
    corridor: "Guangzhou",
    website: "https://www.tinci.com",
    oneLiner:
      "A leading manufacturer of functional personal-care ingredients (SZSE-listed, stock code 002709) — the mild surfactant/emulsifier/stabiliser backbone for a sensitive-area topical, complementing whatever hero active is chosen.",
    whatTheyDo:
      "Makes 200+ personal-care products across 31 families — ultra-mild amino-acid surfactants, mild amphoterics, carbomers/rheology modifiers, emulsifiers, suspending stabilisers, silicones, and preservative/chelating systems. Ingredients are INCI-named with technical data sheets published on UL Prospector and SpecialChem. Publicly listed on the Shenzhen exchange (stock code 002709).",
    whyItMatters:
      "Strong fit as a formulation partner rather than a hero active: Tinci can supply the low-irritation base system a sensitive-skin topical needs — mildness, stabilisation, and compatibility with peptide/marine/collagen-type actives — for Pure Advance's secondary Coolvex line. Well-documented and export-ready, best paired with a hero-active supplier and an OEM.",
    visitObjective:
      "Meet the personal-care export team and obtain a recommended ultra-mild surfactant + emulsifier + stabiliser system for a low-water/anhydrous sensitive-skin topical, with documentation and active-compatibility guidance.",
    route:
      "Appointment-only; easy Guangzhou GBA day-trip (~35 min HSR from Shenzhen). Request the personal-care export team via the corporate/investor-relations site.",
    priority: "high",
    confidence: "high",
    talkingPoints: [
      "Which ultra-mild surfactant + emulsifier + stabiliser system do you recommend for an anhydrous / low-water topical on sensitive or compromised skin?",
      "Can you provide TDS / COA / MSDS and ISO 22716 status for the recommended grades?",
      "Are your stabilisers compatible with recombinant-collagen / peptide / marine-polysaccharide actives?",
      "Bring the Pure Advance one-pager, general (pre-NDA) Coolvex base-system requirements, and an NDA template."
    ],
    openQuestions: [
      "Appointment availability, a confirmed host, and the current visitor entrance.",
      "Current commercial terms and financial standing if this becomes a procurement or collaboration target."
    ],
    risks: [
      "Appointment-only access; confirm before travel.",
      "Large public supplier — verify minimum order sizes and willingness to tailor small/early-stage volumes.",
      "Check the latest investor-relations report before making pricing or credit assumptions."
    ],
    fitScore: 72,
    status: "researched",
    publicSources: [
      "https://www.ulprospector.com/en/asia/PersonalCare/Suppliers/3405/Guangzhou-Tinci-Materials-Technology-Co-Ltd",
      "https://www.specialchem.com/cosmetics/supplier/guangzhou-tinci-materials-technology-tinci",
      "https://www.tinci.com/pages_227"
    ]
  },
  {
    id: "gz-yikewei",
    name: "Yikewei Bio",
    nameLocal: "广东益可维生物技术有限公司",
    category: "biomanufacturing",
    city: "Guangzhou",
    area: "Guangzhou Development Zone / Sino-Singapore Guangzhou Knowledge City (中新广州知识城)",
    corridor: "Guangzhou",
    website: "http://www.yikewei.com",
    oneLiner:
      "A Guangzhou probiotics company built around a proprietary 'native Chinese' probiotic strain resource library — it isolates, banks and commercialises functional strains and supplies strains plus whole-process technical solutions across dairy, functional food, pharma, agriculture and daily-chemicals.",
    whatTheyDo:
      "Positions itself as a Chinese-native probiotic R&D and industrialisation company. Its core asset is a domestically leading probiotic strain resource library, from which it has commercialised 30+ functional strains (e.g. Bifidobacterium animalis, Lactobacillus fermentum). It supplies probiotic raw materials plus end-to-end technical services (strain selection, fermentation, formulation) to dairy, functional/health food, biopharma, agriculture/animal husbandry and daily-chemical customers. The Guangzhou site is HQ/R&D/commercial; the probiotic production base is in Langfang, Hebei.",
    whyItMatters:
      "Squarely on Pure Advance's lead identity — a probiotic strain resource library with a strain-supply + technical-services model, structurally set up to license/supply strains and fermentation know-how to a microbial-resource discovery + biomanufacturing platform rather than only sell finished goods. Its listed agriculture/animal-husbandry application is a direct on-ramp to the agri-biocontrol thesis, and its daily-chemical application is a secondary hook for the Coolvex topical line. More applied ingredient-supply than deep-discovery/AI platform, so best framed as a strain-supply / co-development conversation.",
    visitObjective:
      "Confirm the right site to visit (Guangzhou R&D/HQ vs the Hebei plant) and open a strain-supply / co-development conversation focused on agri-relevant strains and daily-chemical/skin applications, including external licensing terms.",
    route:
      "Appointment-only; Guangzhou GBA rail day from Shenzhen (Knowledge City is far north-east — allow extra in-city travel). Confirm host and focus via the official site; combinable with other Guangzhou biotech visits on one rail day.",
    priority: "high",
    confidence: "medium",
    talkingPoints: [
      "Are strains available for external licensing / co-development, and on what terms (food-grade vs cosmetic-grade)?",
      "How deep is the agriculture / animal-husbandry application — are there biocontrol-relevant strains with field experience, or is it just a listed sector?",
      "How mature is the daily-chemical (日化) / skin application — a skin-relevant strain or postbiotic, or just a target sector?",
      "Which site is worth visiting — the Guangzhou Knowledge City HQ/R&D or the Langfang plant?"
    ],
    openQuestions: [
      "Verified website resolution and a real BD contact channel (not found in open search).",
      "Current strain-library size and how many strains hold regulatory clearances.",
      "Whether the Guangzhou site is the right visit vs the Hebei production base.",
      "Depth of the agriculture and personal-care/skin claims before over-weighting fit."
    ],
    risks: [
      "More applied ingredient-supply than deep-discovery or AI-microbiome platform; verify differentiators before over-weighting.",
      "Production is in Hebei, so the Guangzhou site is HQ/R&D/commercial only.",
      "Knowledge City is far north-east Guangzhou — allow extra in-city travel time.",
      "Medium confidence; several claims still need verification."
    ],
    fitScore: 65,
    status: "candidate",
    publicSources: [
      "http://www.yikewei.com/",
      "https://baike.baidu.com/item/广东益可维生物技术有限公司/51606887",
      "https://hl5335.21food.cn/"
    ]
  },
  {
    id: "hk-ailsynbio",
    name: "AilsynBio",
    category: "ai-biotech",
    city: "Hong Kong",
    area: "Hong Kong Science Park, Pak Shek Kok",
    corridor: "Hong Kong",
    website: "https://ailsynbio.com",
    oneLiner:
      "HKU-spun-out, Science Park-based AI drug-design startup that fuses generative AI with physics-based modelling — and has signed a deal applying AI to traditional Chinese medicine.",
    whatTheyDo:
      "An AI-driven drug-discovery company incubated from the University of Hong Kong and based at Hong Kong Science Park. It has built an R&D system integrating AI with physicochemical principles — proprietary PyTorch models, an 'L3BA' physics engine and AI-Agent technology — for end-to-end molecular design (target ID, mechanism-of-action, lead design/optimisation), with an initial focus on macrocyclic drugs. In April 2026 it signed a project cooperation agreement with Dong-E-E-Jiao to apply AI to traditional Chinese medicine.",
    whyItMatters:
      "A genuinely AI-native discovery peer at the same Science Park as Insilico, directly relevant to Pure Advance's AI-accelerated-discovery thesis of compressing R&D cycles — a useful peer to compare AI-discovery methods and tooling with. As an early-stage university spin-out it is far more accessible than a public giant and may be open to platform collaboration or ecosystem exchange. Its TCM/natural-product angle parallels AI-on-bioactives work adjacent to the secondary Coolvex line. Realistic engagement is a peer founder meeting, not a transaction.",
    visitObjective:
      "Hold a peer-founder meeting to compare AI-driven-discovery platforms and scope possible platform collaboration or ecosystem exchange, with the AI-on-natural-bioactives angle as a secondary thread.",
    route:
      "Appointment-only HKSTP tenant; route in via an HKSTP / HKU tech-transfer ecosystem introduction and pair with Insilico on the same Science Park day (avoid Jul 8-10, LEAP East).",
    priority: "medium",
    confidence: "medium",
    talkingPoints: [
      "Do you engage non-pharma / consumer-care partners at all, or focus solely on therapeutics discovery?",
      "Could your generative-AI-plus-physics platform (L3BA engine) screen or design bioactives for a topical / natural-product use, as your Dong-E-E-Jiao TCM work suggests?",
      "Is a peer founder meeting feasible on the same HKSTP day as Insilico?",
      "Bring the Pure Advance one-pager and an NDA template."
    ],
    openQuestions: [
      "Founding-team identities and funding stage/round (unverified this pass).",
      "Exact Hong Kong Science Park unit and a direct inbound contact route.",
      "Whether the website resolves and offers a working contact channel.",
      "Whether they engage non-pharma / consumer-care partners at all."
    ],
    risks: [
      "Earliest-stage and least externally validated of the AI-pharma peers.",
      "'Top-tier pharma' collaboration claims are company-sourced and unverified — treat as marketing.",
      "Leadership unverified; do not name any founder/CEO in outreach until confirmed.",
      "Therapeutics-focused — may not engage consumer-care; treat as a science/peer meeting, not procurement."
    ],
    fitScore: 48,
    status: "candidate",
    publicSources: [
      "https://www.hkstp.org/-/media/corpsite/assets/park-life/news-and-events/news/2026/20260410-ailsynbio-and-donge-ejiao-collaboration-signing/press-release-ailsynbio-and-dong-e-e-jiao-sign-project-cooperation-agreement.pdf",
      "https://www.miragenews.com/ailsynbio-dong-e-e-jiao-ink-collaboration-deal-1654088/",
      "https://www.scifac.hku.hk/news/revolutionising-drug-discovery-through-ai"
    ]
  },
  {
    id: "hk-biomap",
    name: "BioMap",
    nameLocal: "百图生科",
    category: "ai-biotech",
    city: "Hong Kong",
    area: "BioMap InnoHub, Hong Kong (specific HKSTP/Cyberport site to be confirmed)",
    corridor: "Hong Kong",
    website: "https://www.biomap.com",
    oneLiner:
      "Baidu-backed 'large biology model' company whose 100B+-parameter life-science foundation model xTrimo powers an AI-Generated Protein (AIGP) platform — now standing up its first international innovation center, BioMap InnoHub, in Hong Kong with HK government (HKIC) backing.",
    whatTheyDo:
      "Builds life-science foundation models (the xTrimo family, reportedly 100B-268B parameters across DNA, RNA, protein, cell, biological-text and biological-systems modalities) and sells access via its AIGP platform for protein design and optimisation. Reports 200+ users across MNC pharma, CDMOs, drug developers and synthetic-biology / green-tech firms — a horizontal AI-protein engine rather than a single-pipeline drug company. In Hong Kong it is launching BioMap InnoHub plus a BioX accelerator to support 50+ early-stage life-science projects over five years. HQ is in Beijing.",
    whyItMatters:
      "Sits on Pure Advance's AI-driven-discovery pillar in two ways: (1) AI-protein/AI-synbio tooling — AIGP is the 'design proteins from a foundation model' capability for engineering the enzymes/proteins/strains behind microbial biocontrols, and BioMap explicitly markets to synthetic-biology, green-tech and agriculture (Syngenta, LanzaTech namechecked); (2) the BioX accelerator/ecosystem could treat a Saudi biotech with a real product as an international project, with the HK base lowering China-data/IP friction. Large and Baidu-adjacent, so best treated as relationship/tooling, approached with a concrete protein-design use case.",
    visitObjective:
      "Explore AIGP for a concrete protein/strain-design use case, gauge BioX accelerator interest and eligibility, and confirm whether the HK InnoHub is operational and staffed for visitors.",
    route:
      "Treat as appointment-only (brand-new HK operation); route in via the corporate site contact form, HKIC as the named HK partner, or HKSTP/Cyberport/HKU/HKUST ecosystem contacts. Confirm the exact HK site before travelling.",
    priority: "medium",
    confidence: "medium",
    talkingPoints: [
      "Is AIGP genuinely usable for non-pharma / synbio / enzyme design — can you share a concrete reference case?",
      "Is the BioX accelerator open to a non-HK / international (e.g. Saudi) project, or HK-startups only?",
      "Bring a concrete strain/protein-design use case so this is more than a courtesy intro.",
      "Which HK site houses the InnoHub, and is it operational and staffed for visitors during the visit window?"
    ],
    openQuestions: [
      "Exact HK InnoHub location and whether it is operational and staffed for visitors — the single biggest open question.",
      "Hype check: 'world's largest model', 'beats AlphaFold 3' and parameter counts are largely company-sourced — flag as claims, not independent benchmarks.",
      "Whether AIGP is genuinely usable for non-pharma / synbio / enzyme design.",
      "The correct inbound channel (HKIC vs corporate form vs accelerator application) and BioX eligibility for an international company."
    ],
    risks: [
      "Large, well-funded and Baidu-adjacent — high risk of a courtesy intro without a concrete use case.",
      "Brand-new HK operation (since mid-2024); may be a launch/ceremony presence more than a walk-in office.",
      "Performance claims are company-sourced — present as claims, not verified benchmarks.",
      "China-data/IP considerations, partially mitigated by the HK base."
    ],
    fitScore: 55,
    status: "candidate",
    publicSources: [
      "https://www.hkic.org.hk/biomap_pr",
      "https://www.biomap.com/",
      "https://www.scmp.com/tech/tech-trends/article/3327390/baidu-backed-drug-discovery-start-biomap-challenges-googles-alphafold"
    ]
  },
  {
    id: "hk-biomed-technology",
    name: "BioMed Technology Holdings",
    category: "ai-biotech",
    city: "Hong Kong",
    area: "Hong Kong Science Park, Pak Shek Kok",
    corridor: "Hong Kong",
    website: "https://biomed.hk",
    oneLiner:
      "Hong Kong microbiome startup and HKSTP partner offering precision microbiome testing and probiotic products — and expanding into oral and skin microbiomes, the axis closest to Coolvex's topical-care focus.",
    whatTheyDo:
      "Established 2018, develops precision-medicine-based microbiome testing services and probiotic products. It holds one of Hong Kong's largest microbiome databases (10,000+ profiles) and is extending R&D from gut into oral and skin microbiomes as part of a 'total microbiome solution'. It is a Hong Kong Science and Technology Parks (HKSTP) partner company.",
    whyItMatters:
      "The only candidate explicitly building toward the skin microbiome — directly adjacent to Pure Advance's secondary Coolvex topical-care line. Its precision-testing + probiotic-product model and large microbiome dataset are relevant to consumer functional-health and skin-care R&D, and to strain/data collaboration or co-development. Little tie to the agri-biocontrol lead, so value is data/strain/co-development on the Coolvex side; accessible as an HKSTP startup and plausibly deal-relevant at Pure Advance's scale.",
    visitObjective:
      "Open a substantive R&D / data / skin-microbiome conversation for the Coolvex line, exploring data/strain collaboration or co-development and the maturity of the skin program.",
    route:
      "Appointment-only; route in via an HKSTP ecosystem introduction and pair with an HKSTP day (Insilico / AilsynBio / GenieBiome). Avoid Jul 8-10, LEAP East.",
    priority: "high",
    confidence: "medium",
    talkingPoints: [
      "How mature is the skin-microbiome program (research vs product), and is it ready for a topical-care collaboration?",
      "Do you license data / strains or co-develop with consumer brands, and would your 10,000+-profile dataset support skin-care R&D?",
      "Is there any GCC / international interest, and what is the right route in via HKSTP?",
      "Bring the Pure Advance one-pager and an NDA template."
    ],
    openQuestions: [
      "Leadership identities and the exact HK Science Park unit / office.",
      "Maturity of the skin-microbiome program (research vs product) and whether they license data/strains or co-develop with consumer brands.",
      "Current funding stage beyond the 2023 seed, and any GCC/international interest."
    ],
    risks: [
      "Smaller and earlier-stage than the pharma players; value is data/strain/co-development, not scale.",
      "Skin-microbiome program maturity is unconfirmed.",
      "No agri-biocontrol or biomanufacturing tie — off the lead thesis, relevant mainly to the secondary Coolvex line."
    ],
    fitScore: 62,
    status: "candidate",
    publicSources: [
      "https://www.hkstp.org/news-room/biomed-technology-funded-by-alibaba-hong-kong-entrepreneurs-fund-gobi-and-timc-to-realise-precision-and-personalised-gut-microbiome-management-for-wellness/",
      "https://www.prnewswire.com/apac/news-releases/biomed-technology-funded-by-alibaba-hong-kong-entrepreneurs-fund-gobi-and-timc-to-realise-precision-and-personalised-gut-microbiome-management-for-wellness-301802811.html",
      "https://biomed.hk/en/about-us/"
    ]
  },
  {
    id: "hk-geniebiome",
    name: "GenieBiome (G-NiiB)",
    category: "ai-biotech",
    city: "Hong Kong",
    area: "Wan Chai / Hong Kong Science Park, Pak Shek Kok",
    corridor: "Hong Kong",
    website: "https://geniebiome.com",
    oneLiner:
      "CUHK clinician-scientist microbiome spinout behind the consumer G-NiiB probiotic brand — Hong Kong's most consumer-facing, clinically-credentialed microbiome company and the closest peer to a Coolvex-style functional-health play.",
    whatTheyDo:
      "A biotechnology spinout from The Chinese University of Hong Kong (CUHK) that translates CUHK microbiome research into both therapeutics and the consumer G-NiiB probiotic/microbiome product line, plus precision microbiome testing. It operates internationally, including a Singapore G-NiiB presence.",
    whyItMatters:
      "The closest consumer-health analogue to the secondary Coolvex model — a clinically-credentialed, science-backed brand turning microbiome research into consumer products. Potential bridges include consumer probiotic productization, precision-microbiome testing and co-research for a regional (GCC) consumer-microbiome offering. Its real strength is validated microbiome science productized into a consumer brand, not an AI discovery engine.",
    visitObjective:
      "Hold a substantive consumer-health conversation for the Coolvex line — explore a co-branded / regional (GCC) market-entry partnership, co-research, and precision-microbiome testing, framed as build-together rather than license-from-you.",
    route:
      "Intro via CUHK Faculty of Medicine or the website collaboration-inquiry form; HK week, easiest at the central Wan Chai commercial office.",
    priority: "high",
    confidence: "medium",
    talkingPoints: [
      "Do you license / partner internationally, and is there appetite for a GCC consumer-microbiome offering?",
      "Could the G-NiiB consumer side support strain / IP licensing or precision-microbiome testing for a Coolvex-style functional-health brand?",
      "Where would we meet and how best to arrange a partnership conversation?",
      "Bring: Pure Advance one-pager (AI-accelerated microbial biocontrols)",
      "Bring: NDA template"
    ],
    openQuestions: [
      "Office/meeting location (CUHK campus vs Hong Kong Science Park) — confirm before travel.",
      "Current commercial/licensing appetite and whether they partner internationally (GCC relevance).",
      "Exact corporate structure (GenieBiome Ltd vs the G-NiiB consumer brand entity) and latest funding status.",
      "Whether a dedicated commercial/BD function exists vs founder-led BD.",
      "Any halal / GCC openness (none found yet)."
    ],
    risks: [
      "Stated instinct is to own/build rather than license IP out, so an inbound 'license your strains to us' ask may land poorly — prefer a co-branded / regional-distribution / co-research framing.",
      "Really a microbiome consumer-health company, not an AI-platform company — judge on clinically-validated microbiome science, not AI claims.",
      "Do not conflate GenieBiome with BioMed Technology (distinct CUHK-linked HK microbiome companies)."
    ],
    fitScore: 70,
    status: "profiled",
    publicSources: [
      "https://geniebiome.com/en/company/company-introduction",
      "https://www.scmp.com/business/companies/article/3211412/how-two-renowned-hong-kong-doctors-went-chats-about-faeces-leading-biotech-start-us3-billion-market",
      "https://cuhkintouch.cpr.cuhk.edu.hk/2024/12/a-vision-to-build-asias-microbiome-biotechnology-hub/"
    ]
  },
  {
    id: "hk-great-bay-bio",
    name: "Great Bay Bio",
    nameLocal: "大湾生物",
    category: "ai-biotech",
    city: "Hong Kong",
    area: "Hong Kong Science Park, Pak Shek Kok",
    corridor: "Hong Kong",
    website: "https://www.greatbay-bio.com",
    oneLiner:
      "HKSTP-based 'AI + bioprocessing' company that applies AI to the manufacturing/CMC side of biologics — antibody design, cell-line development, culture-media optimization and sequence/expression optimization — i.e. the AI-in-biomanufacturing layer, not just AI drug discovery.",
    whatTheyDo:
      "Builds AI platforms (AlfaBodY, AlfaDAX, AlfaCell, AlfaMedX/AlfaOPA, AlfaStaX) that compress the sequence-to-clinical-candidate path for biologics — AI antibody design, cell-line development, media optimization and expression/stability prediction. Runs a ~3,000 m² R&D lab + CMC platform in Hong Kong Science Park and positions as a CDMO-adjacent service/platform partner.",
    whyItMatters:
      "The closest AI-for-biomanufacturing match to Pure Advance's lead AI + biomanufacturing platform pillar among the HK finds — a real, revenue-generating company applying AI to cell line, media, expression and manufacturability (CMC), the same strain-to-process-to-scale-up bottleneck a microbial-biocontrol biomanufacturing play must clear. Its AI media/cell-line/expression-optimization approach is conceptually portable to fermentation/strain-engineering work, subject to confirming microbial applicability.",
    visitObjective:
      "Get a platform demo and an exploratory 'could you AI-optimize fermentation/expression for a microbial active' conversation, ideally with a walk-through of the CMC platform — not an immediate deal.",
    route:
      "Direct / HK week — book the HKSTP office via the published meeting-scheduling link; pair with Insilico into one Pak Shek Kok day.",
    priority: "must_contact",
    confidence: "high",
    talkingPoints: [
      "Does your AI media/cell-line/expression work have any microbial / fermentation applicability, or is the stack mammalian/CHO-only?",
      "Could you AI-optimize fermentation/expression for a microbial active ingredient?",
      "Can we get a walk-through of the 3,000 m² CMC platform vs a meeting-room-only visit?",
      "Platform demo of AlfaCell / AlfaMedX and the process/CMC de-risking value prop."
    ],
    openQuestions: [
      "'~100 patents' and 'Forbes 100 to Watch' claims are self-reported — sanity-check before quoting.",
      "Current Series B size/close status and latest valuation (site lists 'first close' only).",
      "Whether the AI media/cell-line work has any microbial / fermentation applicability (stack is mammalian/CHO-centric).",
      "Whether a senior host is in HK during the window and can host a lab walk-through.",
      "Confirm the BD channel is reachable; the scheduling link may be the more reliable route."
    ],
    risks: [
      "Funding, patent-count and award claims are self-reported on the company site — treat headline totals as approximate.",
      "Stack is mammalian/CHO-centric; microbial/fermentation applicability is unconfirmed — the core question for a synbio/fermentation interest."
    ],
    fitScore: 85,
    status: "researched",
    publicSources: [
      "https://www.greatbay-bio.com/about.html",
      "https://www.biospectrumasia.com/news/48/21040/hong-kong-based-startup-great-bay-bio-secures-15m-funding.html",
      "https://www.greatbay-bio.com/ndetail/129.html"
    ]
  },
  {
    id: "hk-gutolution",
    name: "GUTolution",
    category: "ai-biotech",
    city: "Hong Kong",
    area: "Hong Kong Science Park, Pak Shek Kok",
    corridor: "Hong Kong",
    website: "https://gutolution.com",
    oneLiner:
      "A Hong Kong Science Park microbiome health-tech startup that runs an in-house sequencing lab, tests 5,000+ gut bacteria, and uses an AI engine to tailor-make and GMP-manufacture personalised probiotic formulas — the most relevant HK-based, consumer-facing precision-probiotic platform for a Week-1 Hong Kong meeting.",
    whatTheyDo:
      "Delivers a personalised-microbiome service: an at-home gut-microbiome test, NGS sequencing in its own HKSTP lab (Illumina; profiles 5,000+ taxa), an AI analysis engine that produces a microbiome health score plus food/lifestyle/probiotic recommendations, and a bespoke GMP-manufactured probiotic formula with monthly cold-chain delivery, periodic re-testing/reformulation and nutritionist consults. Draws on HKU/CUHK clinical advisory input.",
    whyItMatters:
      "Secondary fit — a directly comparable consumer microbiome to AI to personalised-product playbook that maps onto the Coolvex consumer-health ambition (AI scoring, formulation, subscription cold-chain logistics), plus an early-stage, founder-accessible window into the HKSTP / HK Tech 300 microbiome ecosystem and its HKU/CUHK links. It personalises existing strains rather than mining novel ones, so it is secondary to the microbial-resource-discovery priority.",
    visitObjective:
      "Run a peer-learning + ecosystem-mapping meeting and a potential AI-personalisation / consumer-go-to-market exchange for the Coolvex side — not a strain-sourcing deal.",
    route:
      "Direct / HK week — arrange via the site contact form ahead of travel; fold into an HKSTP ecosystem day.",
    priority: "medium",
    confidence: "high",
    talkingPoints: [
      "Does GUTolution do any novel-strain discovery or hold proprietary strains, or only personalise third-party probiotic strains?",
      "Is there any topical/skin or postbiotic angle, or is it gut-only?",
      "How do the AI scoring/personalisation engine and subscription cold-chain model work — lessons for a consumer-health line?",
      "In-house GMP vs contract manufacturer for the personalised probiotics?"
    ],
    openQuestions: [
      "Whether GUTolution does any novel-strain discovery or holds proprietary strains (current evidence: only personalises third-party strains).",
      "Exact HKSTP unit/lab location and whether they take partner/founder visits.",
      "Funding stage beyond the HK Tech 300 angel round; any 2024–2026 raise.",
      "Whether there is any topical/skin or postbiotic angle (none found — appears gut-only).",
      "Manufacturing: in-house GMP vs contract manufacturer.",
      "Full founder/advisor roster and clinical-advisor affiliations (HKU/CUHK)."
    ],
    risks: [
      "Small early-stage startup with a consumer-services model and no own novel-strain IP found — not a strain-sourcing source.",
      "Gut-focused only; no topical/skin or postbiotic angle found — limited direct read-across to a topical Coolvex line."
    ],
    fitScore: 50,
    status: "researched",
    publicSources: [
      "https://gutolution.com/pages/our-technology",
      "https://www.cityu.edu.hk/hktech300/start-ups/seed-fund-teams/gutolution",
      "https://hkmb.hktdc.com/en/VWe8wsBu/article/unleashing-microbe-power"
    ]
  },
  {
    id: "hk-insilico-medicine",
    name: "Insilico Medicine",
    nameLocal: "英矽智能",
    category: "ai-biotech",
    city: "Hong Kong",
    area: "Hong Kong Science Park, Pak Shek Kok",
    corridor: "Hong Kong",
    website: "https://insilico.com",
    oneLiner:
      "End-to-end generative-AI drug discovery company, newly listed on HKEX, that both discovered and designed an oral IPF drug now heading to Phase III — with a parallel longevity/aging research agenda and an existing Gulf footprint.",
    whatTheyDo:
      "Runs an end-to-end 'AI + robotics + clinical' pipeline on its Pharma.AI platform (PandaOmics for targets, Chemistry42 for generative chemistry, inClinico for trial prediction). It has 40+ internal programs, 10+ at IND; lead asset rentosertib (ISM001-055) is an oral TNIK inhibitor for idiopathic pulmonary fibrosis. Business model is platform-as-partner with large pharma.",
    whyItMatters:
      "Relationship/ecosystem + AI-platform benchmark, not a deal. Insilico is the most validated proof that generative AI can compress discovery R&D — the exact thesis Pure Advance applies to microbial-strain/biocontrol discovery — and is structurally pro-GCC (Abu Dhabi/Masdar office, Aramco-backed Prosperity7 investor, Saudi MISA MoU), so a Saudi founder is on-strategy. The CEO's public aging-research agenda is a secondary bridge to a Coolvex consumer-health narrative.",
    visitObjective:
      "A courtesy HK Science Park / founder-to-founder ecosystem visit to seed a relationship around the Saudi/GCC localization agenda and the AI-accelerated-discovery playbook — not a licensing pitch.",
    route:
      "Warm intro via the HKSTP incubator or a mutual GCC-investor contact (preferable to cold inbound BD); courtesy Science Park visit, confirm a host is in HK with a virtual-intro fallback.",
    priority: "medium",
    confidence: "high",
    talkingPoints: [
      "Could we arrange a brief intro during our Hong Kong week?",
      "How do you engage external programs — Pharma.AI / PandaOmics access or co-discovery?",
      "Your Abu Dhabi (Masdar) office suggests a GCC track — is a Saudi collaboration of interest?",
      "Is a founder-to-founder / ecosystem intro more appropriate than a formal BD meeting?",
      "Bring: Pure Advance one-pager (AI-accelerated microbial biocontrols)",
      "Bring: 3-minute intro pitch and an NDA template for any confidential detail"
    ],
    openQuestions: [
      "Whether a senior HK/Asia lead is physically in Hong Kong during the visit window (execs travel heavily) — have a virtual-intro fallback.",
      "Active visitor entrance within HK Science Park.",
      "Whether a Riyadh 'discovery cell' is actually funded/announced (unverified — do not claim).",
      "Whether the HK Science Park unit hosts any wet-lab / robotics capability vs a corporate/representative office."
    ],
    risks: [
      "A public, multi-billion-deal company — they will not license from Pure Advance; do not frame outreach as a transaction. Realistic value is relationship + ecosystem.",
      "They engage at sovereign-fund / ministry / national-cluster scale; a Riyadh 'discovery cell' is unconfirmed intent — do not assert it as established."
    ],
    fitScore: 55,
    status: "profiled",
    publicSources: [
      "https://www.prnewswire.com/news-releases/insilico-medicine-lists-on-hong-kong-stock-exchange-showing-ai-drug-discovery-momentum-with-2025s-largest-hong-kong-biotech-ipo-302650606.html",
      "https://insilico.com/news/ohz9ozx0t1-insilico-medicine-announces-2025-annual",
      "https://www.prnewswire.com/news-releases/insilico-medicine-announces-nature-medicine-publication-of-phase-iia-results-evaluating-rentosertib-the-novel-tnik-inhibitor-for-idiopathic-pulmonary-fibrosis-ipf-discovered-and-designed-with-a-pioneering-ai-approach-302472070.html"
    ]
  },
  {
    id: "hk-pinnacle-bioboost",
    name: "Pinnacle Food Group / Bioboost (HK precision-fermentation lab)",
    category: "biomanufacturing",
    city: "Hong Kong",
    area: "Hong Kong (lab location to verify); proposed hub at HK–Shenzhen Innovation & Technology Park, Lok Ma Chau Loop",
    corridor: "Hong Kong",
    oneLiner:
      "The most concrete Hong Kong precision-fermentation node found: a Pichia-yeast recombinant-protein lab (human lactoferrin) run via a Bioboost Synbio collaboration, with a proposed open-yeast-platform hub at the HK–Shenzhen I&T Park. Early-stage R&D, not a turnkey CDMO — a relationship/ecosystem lead, not a manufacturing vendor yet.",
    whatTheyDo:
      "Pinnacle Food Group (Vancouver-rooted) works in smart agriculture plus precision fermentation / synthetic biology. In April 2026 it announced, via a research collaboration with Bioboost at its Hong Kong lab, a first-generation recombinant Pichia yeast strain producing recombinant human lactoferrin (rhLF) using a patented methanol-free fermentation method, and signed a non-binding MoU with the Open Yeast Collection and Bioboost Synbio Consulting toward an 'Open Yeast Platform' hub at the HK–Shenzhen I&T Park (Lok Ma Chau Loop).",
    whyItMatters:
      "Low–medium HK ecosystem / capability lead. It straddles smart agriculture + precision fermentation + synthetic biology — the same agri-meets-biomanufacturing space as Pure Advance's lead identity — and is the clearest evidence of recombinant-protein precision fermentation actually happening in Hong Kong, a useful HK-side entry into yeast-based microbial expression and the cross-border synbio scene. Methanol-free Pichia expertise is the most transferable asset; it is R&D-stage, not a manufacturing vendor.",
    visitObjective:
      "Networking / ecosystem-mapping only — an HK-side entry into yeast-based microbial expression and the cross-border synbio scene, and to explore whether methanol-free Pichia know-how could be accessible for a future protein/enzyme programme. Not a manufacturing-vendor engagement.",
    route:
      "Networking only — via Bioboost or the Hong Kong Science Park / HKSTP directory; reachable during the HK week.",
    priority: "watchlist",
    confidence: "low",
    talkingPoints: [
      "Is there any external fermentation/contract capability (pilot scale 5 L to 1000 L+), or is this R&D-stage only?",
      "Is the methanol-free Pichia know-how licensable / accessible for a non-food protein programme?",
      "Status of the Open Yeast Platform hub (MoU is non-binding) and who operates the bench work?"
    ],
    openQuestions: [
      "Whether there is ANY external fermentation/contract capability (almost certainly not yet at pilot scale) — treat as networking only.",
      "Real HK lab location and a working contact (via Bioboost or HKSTP).",
      "Status of the Open Yeast Platform hub (MoU is non-binding) and who actually operates the bench work.",
      "Whether the methanol-free Pichia know-how is licensable / accessible for a non-food protein programme.",
      "Corporate structure (Vancouver parent vs HK entity) and any conflict with a confidential commercial relationship."
    ],
    risks: [
      "R&D-stage, food/lactoferrin-oriented, with no evidence of external pilot-scale contract fermentation capacity — a networking lead, not a manufacturing vendor.",
      "Opaque: no verified legal entity, funding, or production scale, and the Open Yeast Platform hub rests on a non-binding MoU — treat as exploratory.",
      "No verified website/email/phone captured — contactability unconfirmed."
    ],
    fitScore: 30,
    status: "candidate",
    publicSources: [
      "https://www.prnewswire.com/news-releases/pinnacle-food-group-limited-announces-breakthrough-in-recombinant-human-lactoferrin-rhlf-production-using-cost-effective-methanol-free-fermentation-method-302741094.html",
      "https://www.greenqueen.com.hk/pinnacle-food-group-open-source-yeast-collection-hong-kong/",
      "https://www.investing.com/news/company-news/pinnacle-food-develops-yeast-strain-for-human-lactoferrin-production-93CH-4615401"
    ]
  },
  {
    id: "hk-zellulin",
    name: "Avant — Zellulin (HK Science Park)",
    category: "coolvex-sourcing",
    city: "Hong Kong",
    area: "Hong Kong Science Park, Pak Shek Kok",
    corridor: "Hong Kong",
    website: "https://www.zellulin.tech",
    oneLiner:
      "A Hong Kong Science Park biotech (founded 2018) whose Zellulin / ZelluGEN is a cell-cultivated marine-protein peptide complex for skincare — a differentiated, sustainable marine-repair active reachable during the Hong Kong leg.",
    whatTheyDo:
      "Cell-culture biotechnology producing cell-identical marine peptides (Fibulin, Decorin, Lumican, CTGF) positioned for anti-oxidation, regeneration and skin repair; marketed as a cosmetic raw material for serums, creams and moisturisers. Reports a 'C-Label' clean-beauty/traceability certification.",
    whyItMatters:
      "Aligns with Coolvex's marine / skin-repair active angle and is the most accessible candidate of the whole search (HK Science Park, Week 1). A differentiated, sustainable marine-repair active worth confirming for commercial-volume availability, ointment-base suitability and China/GCC regulatory readiness.",
    visitObjective:
      "Confirm ZelluGEN is available at commercial volume, suits an anhydrous/ointment base (not just water-based serums), and has cosmetic INCI plus China/GCC regulatory status; meet during the Hong Kong week.",
    route:
      "Direct / HK Week 1 — reach out via the company website (zellulin.tech / avantmeats.com) ahead of the Hong Kong leg.",
    priority: "high",
    confidence: "medium",
    talkingPoints: [
      "Is ZelluGEN available at commercial volume with a cosmetic INCI name and stability data in an anhydrous/ointment base?",
      "What is the regulatory status for China NMPA and GCC/Saudi import?",
      "Pricing / MOQ, and any exclusivity for a targeted skin-repair application.",
      "Bring: Pure Advance one-pager (AI-accelerated microbial biocontrols), a general pre-NDA Coolvex marine-actives interest brief, and an NDA template."
    ],
    openQuestions: [
      "Appointment availability, host, and current visitor entrance.",
      "Whether cosmetic-ingredient supply is currently active, and production scale / lead time.",
      "Current commercial terms / financial standing if this becomes a procurement or collaboration target."
    ],
    risks: [
      "Private/early-stage — verify commercial-volume availability and lead time before relying on them.",
      "Products positioned for water-based serums/creams; anhydrous/ointment-base stability unproven.",
      "China NMPA and GCC/Saudi import/regulatory status unconfirmed."
    ],
    fitScore: 75,
    status: "researched",
    publicSources: [
      "https://www.avantmeats.com/press-release/8-press-release/26-cell-culture-biotechnology-company-avant-launches-zellulin-the-world-s-first-cell-based-functional-protein-ingredient-for-skincare",
      "https://www.scmp.com/presented/lifestyle/topics/marine-cell-powered-skin-renewal/article/3315140/peptide-alchemy-heres-how-fish-cell-biotech-transforms-skincare",
      "https://thefishsite.com/articles/avant-meats-raises-10-8-million-for-its-cell-cultured-seafood"
    ]
  },
  {
    id: "sz-angelo-biotech",
    name: "Angelo Biotech",
    nameLocal: "安各洛（深圳）生物科技有限公司",
    category: "biomanufacturing",
    city: "Shenzhen",
    area: "Guangming District (Industrial Innovation Center for Engineering Biology)",
    corridor: "Shenzhen",
    website: "https://angelobiotech.com/en.html",
    oneLiner:
      "A Guangming synthetic-biology company specialised in functional proteins/enzymes (SOD, NAMPT) made via novel bioreactors and plant/insect cell factories — a possible antioxidant-active niche, but unproven as an external fermentation service provider.",
    whatTheyDo:
      "Synthetic-biology company focused on R&D, manufacture and application of functional proteins/enzymes — principally SOD (superoxide dismutase) and NAMPT — using novel bioreactors and plant/insect cell-factory approaches. Its platform spans enzyme/cell engineering, AI protein design, fermentation engineering and automation, with a public pipeline that skews agri/feed/food (SOD remediation, functional feed, silkworm-pupa peptide).",
    whyItMatters:
      "Platform-adjacent to Pure Advance's agri-microbial / biomanufacturing lead: a Guangming synbio house doing enzyme/cell engineering, AI protein design and fermentation, with an agri/feed/food pipeline (SOD soil/water remediation, functional feed) that is a natural surface for biocontrol co-development. Secondary topical fit is a conditional antioxidant niche — SOD as a soothing/barrier active for the Coolvex line — contingent on proven topical stability.",
    visitObjective:
      "Assess whether they offer external pilot/fermentation/process-development service vs only selling their own SOD/NAMPT products, obtain an SOD technical/manufacturing dossier, and evaluate them as an on-theme synbio reference for the agri-microbial/biomanufacturing lead (with SOD as a secondary Coolvex antioxidant niche).",
    route:
      "Guangming synbio day — appointment via the company website; request an SOD/functional-protein technical dossier before allocating visit time.",
    priority: "medium",
    confidence: "medium",
    talkingPoints: [
      "Do you offer external pilot/manufacturing, or only your own products?",
      "Can you share an SOD / functional-protein technical dossier?",
      "Is the active stable in a topical ointment base, with safety data?",
      "What scales and grades (cosmetic / food / GMP) can you run?",
      "Bring: Pure Advance one-pager, NDA template."
    ],
    openQuestions: [
      "Whether they offer external fermentation/manufacturing services or only sell their own SOD/NAMPT products.",
      "SOD enzyme stability and safety/irritation data for a topical/sensitive-area ointment.",
      "International / cosmetic regulatory readiness.",
      "Funding, plant/capacity, certifications and commercial-grade availability (unverified).",
      "Confirm the exact visit site and nearest metro before travel."
    ],
    risks: [
      "SOD stability in a topical base is unproven.",
      "Unclear whether they provide external fermentation/process-development service vs only their own products.",
      "International-facing / cosmetic regulatory readiness unclear.",
      "Funding not verified — do not assert figures."
    ],
    fitScore: 52,
    status: "candidate",
    publicSources: [
      "https://angelobiotech.com/en/innovation.html",
      "https://angelobiotech.com/en/product-42.html"
    ]
  },
  {
    id: "sz-bgi-genot",
    name: "BGI Genomics (GeneT / GBI ALL)",
    nameLocal: "华大基因（GeneT / 生成式生物智能）",
    category: "ai-biotech",
    city: "Shenzhen",
    area: "Yantian District (BGI HQ)",
    corridor: "Shenzhen",
    website: "https://en.genomics.cn",
    oneLiner:
      "Shenzhen-headquartered genomics giant whose GeneT (Genetic Transformer) multimodal genomic foundation model anchors its 'Generative Bio-Intelligence (GBI ALL)' paradigm — and which already runs a large AI-genomics operation inside Saudi Arabia (Genalive, Riyadh), making it the most Saudi-relevant company in this AI-biotech batch.",
    whatTheyDo:
      "A vertically integrated genomics platform — sequencing instruments (via affiliate MGI), clinical/consumer genetic testing and a growing AI layer. In Sep 2024 it announced 'GBI ALL', centered on GeneT (a multimodal genomic large model for whole-genome interpretation), ChatGeneT, iGeneT Pro/Genos and the i99 AI health-management platform integrating genomic, epigenetic, microbiome, imaging and lifestyle data.",
    whyItMatters:
      "Medium on AI-in-biotech, but the strongest strategic/geographic hook of the batch: BGI runs a large AI-genomics operation inside Saudi Arabia (the Genalive JV in Riyadh, framed around Vision 2030), so a Saudi founder can tie the conversation to the Kingdom's genomics build-out. Its AI multi-omics/sequencing stack is a relevant capability to understand; treat as ecosystem/relationship and a possible Saudi-side follow-up, not a startup deal.",
    visitObjective:
      "An ecosystem/relationship meeting: tie the conversation to the Kingdom's genomics build-out via Genalive (Riyadh), and understand BGI's AI multi-omics / sequencing stack — not a startup deal.",
    route:
      "Ecosystem/relationship — engage Genalive / BGI Middle East from Riyadh pre-trip; treat the Shenzhen HQ as a pre-arranged half-day.",
    priority: "high",
    confidence: "medium",
    talkingPoints: [
      "Tie the conversation to the Kingdom's genomics build-out via Genalive (Riyadh) under Vision 2030.",
      "Understand BGI's AI multi-omics / sequencing stack and its relevance to microbial-resource discovery.",
      "Explore whether a Saudi-side follow-up (Genalive / BGI Middle East) is the faster route."
    ],
    openQuestions: [
      "Best entry point given the Saudi angle — is engaging Genalive/BGI in Riyadh faster than a cold Shenzhen HQ approach?",
      "Which Shenzhen site hosts the GeneT/AI team, and whether a visit adds value vs a corporate/BD meeting.",
      "Independent evidence for GeneT/GeneLLM performance claims (treat 'model beats X' as marketing).",
      "Whether BGI's microbial/strain-genomics or multi-omics work bears on microbial-resource discovery vs purely clinical human genomics."
    ],
    risks: [
      "A giant, not a peer-startup partner — treat as ecosystem/relationship, not a transaction.",
      "GeneT/GeneLLM benchmarking claims in trade press are marketing; independent validation is thin.",
      "HQ in Yantian is far from the Nanshan base; a deliberate, pre-arranged half-day.",
      "Core focus is clinical human genomics — adjacent to but distinct from agri-biocontrol / AI-drug discovery."
    ],
    fitScore: 58,
    status: "candidate",
    publicSources: [
      "https://www.genomics.cn/news/info_itemid_7107.html",
      "https://www.bgi.com/global/news/BGI%20Genomics%20Taps%20AI%20to%20Power%20Healthcare%20Transformation%20in%20Saudi%20Vision",
      "https://www.bgi.com/global/news/bgi-genomics-joint-venture-genalive-secures-950-million-rmb-genetic-testing-service-contract-in-saudi-arabia"
    ]
  },
  {
    id: "sz-bgi-precision-nutrition",
    name: "BGI Precision Nutrition (Umeta)",
    nameLocal: "华大营养 / 华大精准营养（深圳）科技有限公司（优美达）",
    category: "biomanufacturing",
    city: "Shenzhen",
    area: "Yantian District (BGI Center)",
    corridor: "Shenzhen",
    website: "https://www.bgi-nutri.com",
    oneLiner:
      "BGI's (华大) precision-nutrition arm sits on one of the largest human-commensal microbial strain libraries in China — 50,000–60,000+ gut/commensal strains built on BGI's sequencing scale — and runs a full 'test → functional probiotic → nutrition' chain; it is the single biggest microbial-resource-discovery asset in the GBA and a credible strain / data / co-research partner.",
    whatTheyDo:
      "华大营养 (BGI Nutrition) and the 优美达 (Umeta) probiotics brand translate BGI's ~18 years of human-microbiome sequencing into products and services, running a strain-selection → functional-verification → compatibility-research pipeline over a strain library of 50,000–60,000+ human gut/commensal bacteria. The chain spans microbiome testing, functional probiotic intervention and nutrition services, with ~100 strain/health patents and clinical ties to major hospitals.",
    whyItMatters:
      "High on the microbial-resource-discovery axis (Pure Advance's lead priority) — arguably the deepest strain-library + microbiome-data resource in the Greater Bay Area. The attraction is access to a very large, characterised commensal strain collection plus BGI's sequencing/bioinformatics depth for high-throughput screening and functional discovery. Caveats: it is gut/nutrition-centric, and data-governance can make strain/data deals slow; treat as a flagship strain-access relationship, not a quick transaction.",
    visitObjective:
      "Explore a strain-access / co-discovery relationship with the precision-nutrition arm — access to a large characterised commensal strain library plus BGI's sequencing/bioinformatics for microbial-resource discovery; a flagship learning + strain-access relationship, not a quick transaction.",
    route:
      "Warm intro (incubator network / China Gut Conference / a BGI contact) to the precision-nutrition arm — not BGI Genomics; pre-arrange a host.",
    priority: "high",
    confidence: "medium",
    talkingPoints: [
      "Whether any of the 50,000+ strains are available for licensing / co-research with an external party, and on what data-governance terms.",
      "Confirm the right legal entity/contact for the nutrition arm (华大营养 vs 华大精准营养) and whether they take external strain-access/co-discovery partnerships.",
      "Whether BGI's sequencing/bioinformatics + AI could support high-throughput screening for a biocontrol/microbial-resource discovery programme.",
      "Whether any skin/postbiotic/topical work exists (Coolvex angle) vs purely gut/oral nutrition."
    ],
    openQuestions: [
      "Exact legal entity and right contact for the nutrition/probiotic arm; whether they take external strain-access/co-discovery partnerships.",
      "Whether the 50,000+ strains are licensable for external co-research and on what (likely restrictive) data-governance terms.",
      "Whether any skin/topical or postbiotic-active work exists vs purely gut/oral nutrition.",
      "Current 2026 strain-library size and patent count (figures are 2023-era).",
      "Physical visit site: BGI Center vs a dedicated nutrition facility.",
      "Any GCC/halal-positioned probiotic line."
    ],
    risks: [
      "Huge and gut/nutrition-centric; a Coolvex skin angle is a research ask, not an off-the-shelf buy.",
      "Data-governance / China-data-sensitivity means strain or data deals can be slow and heavily papered.",
      "Engage the precision-nutrition arm, not BGI Genomics — easy to reach the wrong entity.",
      "Realistically only worth a visit if pre-arranged; not a walk-in."
    ],
    fitScore: 85,
    status: "candidate",
    publicSources: [
      "https://baike.baidu.com/item/优美达/63285107",
      "https://www.genomics.cn/news/info_itemid_7291.html",
      "https://www.bgi.com/global"
    ]
  },
  {
    id: "sz-biosysen",
    name: "Biosysen",
    nameLocal: "倍生生物科技（深圳）有限公司",
    category: "biomanufacturing",
    city: "Shenzhen",
    area: "Guangming District (Fenghuang Subdistrict)",
    corridor: "Shenzhen",
    website: "https://www.biosysen.com",
    oneLiner:
      "A Shenzhen (Guangming Science City) 'software-defined' synthetic-biology house that designs and licenses engineered industrial microbial strains — it explicitly runs a strain library (ArchiCel®) and a strain-licensing business plus a daily-chemicals (日化) pipeline, so it maps directly onto Pure Advance's microbial-cell-factory + bio-derived-actives priority.",
    whatTheyDo:
      "A software-driven synthetic-biology company that treats industrial-microbe design as engineering, building modular genome 'code' libraries and a rapid-iteration platform around its Architected Cell (ArchiCel®) genomic-design unit. It runs four platforms (bioinformatics/genome design, genome manufacturing, quantitative-omics, pilot-scale production), cites ~2,000+ production and 40,000+ R&D/engineered strains, and monetises via platform-tech transfer, self-incubated pipelines and strain licensing; early pipelines are craft beer/fermented soda, IVD reagents and daily-chemical/personal-care actives.",
    whyItMatters:
      "Strong fit to the lead platform (microbial-resource discovery + engineered cell factories): a GBA company whose explicit products are an engineered-strain library (ArchiCel®) and strain licensing plus a software-defined AI genome-design platform — structurally open to handing over IP/strains rather than only selling finished goods. A stated 日化/personal-care pipeline is a natural on-ramp to a Coolvex-type topical active, and the founder's ex-BGI background lends scientific credibility. Caveat: traction to date is in beverages, so the personal-care line may be roadmap rather than catalogue-ready.",
    visitObjective:
      "Explore strain-access / license-in and co-development for the lead biocontrol/microbial-cell-factory platform (ArchiCel strain library + strain-licensing), and confirm whether an actual personal-care/日化 active exists as a Coolvex on-ramp vs a roadmap.",
    route:
      "Direct outreach via the company website with a 日化/strain-licensing focus so they bring the right person; pair with a Guangming synbio day (National Biomanufacturing Innovation Center + other Guangming synbio firms).",
    priority: "must_contact",
    confidence: "high",
    talkingPoints: [
      "Whether strains/cell-factory chassis are licensable for an external partner's agri-biocontrol / biomanufacturing discovery programme.",
      "Whether a real personal-care / 日化 active or licensable skin-relevant strain exists today (Coolvex) vs a roadmap.",
      "What classes of organisms (yeast, bacteria, etc.) the strain library covers, and current strain counts.",
      "Export / overseas-licensing precedent and IP terms for strain licensing."
    ],
    openQuestions: [
      "Whether strains/cell-factory chassis are licensable for an external partner's agri-biocontrol/biomanufacturing discovery programme (crux of the lead-platform fit).",
      "Whether a real personal-care/日化 active or licensable skin-relevant strain exists today vs a roadmap.",
      "Latest funding round/investors after 2022; current stage and runway.",
      "Exact current strain counts and what classes of organisms.",
      "Which Guangming site to actually visit (HQ office vs R&D centre vs pilot base).",
      "Whether there is a dedicated partnerships/BD lead to route to.",
      "Any export/overseas-licensing precedent and IP terms for strain licensing."
    ],
    risks: [
      "Commercial traction to date is in beverages; the personal-care/日化 line may be roadmap rather than catalogue-ready.",
      "Smaller and younger than larger peers — treat as a co-development/strain-access partner, not a turnkey supplier.",
      "Post-2022 funding/runway not verified.",
      "Strain counts are company-disclosed via secondary coverage."
    ],
    fitScore: 84,
    status: "candidate",
    publicSources: [
      "https://www.yunxianchang.com/article_pc/6029",
      "https://cn.technode.com/post/2022-07-25/biosysen-seed-angel-round/",
      "https://cn.linkedin.com/company/biosysen"
    ]
  },
  {
    id: "sz-bloomage-tangan",
    name: "Bloomage TangAn",
    nameLocal: "华熙唐安生物科技（深圳）有限公司",
    category: "biomanufacturing",
    city: "Shenzhen",
    area: "Guangming District",
    corridor: "Shenzhen",
    website: "https://www.bloomagegag.com/",
    oneLiner:
      "A Bloomage-incubated synbio company in Guangming building a world-leading non-animal heparin/glycan platform via full-enzymatic synthesis — strong glycan/biomaterials pedigree, but not an open pilot-fermentation CDMO.",
    whatTheyDo:
      "Founded 2023 and incubated by Bloomage Biotechnology, it focuses on biosynthesis of bioactive glycan molecules and innovative-drug development, aiming for a full-chain heparin-glycan platform via full-enzymatic in-vitro precision synthesis that replaces animal-tissue extraction. Product lines span glycan-engineering substrates, enzyme preparations, model glycan-chain libraries, cosmetics, Class-1 innovative drugs and medical devices.",
    whyItMatters:
      "Its Guangming full-enzymatic glycan biosynthesis and enzyme-mutant engineering are a credible biomanufacturing/enzyme-engineering reference for Pure Advance's discovery-plus-biomanufacturing core, and its HA/glycan heritage could supply non-anticoagulant glycans or polysaccharide excipients for the secondary Coolvex topical line. Fit is medium and indirect — the company is heparin/glycan-and-drug focused, not a general external fermentation CDMO.",
    visitObjective:
      "Meet if introduced to benchmark their enzyme/glycan biomanufacturing platform and explore non-anticoagulant glycans or cosmetic excipients for the topical line.",
    route:
      "Appointment-only; fold into a Guangming synbio-cluster day near the national center. Keep the ask on non-anticoagulant glycans / cosmetic excipients.",
    priority: "medium",
    confidence: "high",
    talkingPoints: [
      "Do you have non-anticoagulant glycans / HA derivatives suitable for topical skin-barrier or sensitive-area use?",
      "Can you supply ingredients or co-develop (rather than drug-development only), and could the Bloomage parent cosmetic/HA team join?",
      "How do you handle bleeding-risk / regulatory positioning of any heparin-adjacent molecule for a sensitive-area product?",
      "Bring the Pure Advance one-pager (AI-accelerated microbial biocontrols) and an NDA template."
    ],
    openQuestions: [
      "Are there non-anticoagulant glycans / HA derivatives suitable for topical skin-barrier / sensitive-area use?",
      "Can they supply ingredients or co-develop (vs drug-development only), and can the Bloomage parent cosmetic/HA team join?",
      "Do they offer any external pilot-fermentation / enzymatic-synthesis service (likely not — confirm)?",
      "Regulatory positioning for any heparin-adjacent molecule given bleeding-risk concerns for sensitive-area application."
    ],
    risks: [
      "Heparin/glycan-and-drug focused, not a general external fermentation CDMO — don't assume manufacturing-for-hire access.",
      "Anticoagulant-heparin-related molecules carry bleeding-risk concerns inappropriate for a sensitive-area product; keep scope to non-anticoagulant glycans.",
      "No standalone public financials captured; verify collaboration access and commercial terms before relying on it."
    ],
    fitScore: 55,
    status: "profiled",
    publicSources: [
      "https://www.bloomagegag.com/",
      "https://www.szgm.gov.cn/szgm/132104/kjcx/252743/content/post_12273899.html"
    ]
  },
  {
    id: "sz-byd",
    name: "BYD Company Limited",
    nameLocal: "比亚迪股份有限公司",
    category: "corporate-visit",
    city: "Shenzhen",
    area: "Pingshan District",
    corridor: "Shenzhen",
    website: "https://www.byd.com",
    oneLiner:
      "A vertically integrated Shenzhen manufacturing giant — the world's largest plug-in EV maker — that also runs one of the planet's biggest electronics contract-manufacturing (EMS) arms.",
    whatTheyDo:
      "Founded 1995 as a battery maker, BYD now spans automobiles, electronics, new energy (batteries, solar, storage) and rail transit, designing and building its own batteries, motors, power electronics and chips. Subsidiary BYD Electronics is a major global EMS provider assembling phones, IoT devices, wearables, automotive electronics and medical devices for third-party brands.",
    whyItMatters:
      "A manufacturing and supply-chain-at-scale lesson rather than a biotech meeting: how vertical integration compresses cost and speed and how a Shenzhen EMS player manufactures regulated/medical hardware. It is a template if Pure Advance ever needs device components — dispensers, applicators, diagnostics or connected-care hardware — for the biocontrol or Coolvex lines.",
    visitObjective:
      "Learn the scale-manufacturing / vertical-integration model and EMS engagement for regulated/medical hardware; expect a showcase/campus tour rather than a working meeting.",
    route:
      "Cohort program itinerary stop as the flagship scale-manufacturing visit; confirm which site the program actually visits (HQ vs a factory/showroom).",
    priority: "medium",
    confidence: "high",
    talkingPoints: [
      "Ask about EMS minimum order quantities.",
      "Ask about IP protection for contract clients.",
      "Ask about medical/regulated-grade manufacturing certifications.",
      "Prepare questions on vertical-integration economics and EMS engagement models."
    ],
    openQuestions: [
      "Exact site visited (HQ vs factory) and whether photography is permitted.",
      "Current public BYD Electronics channel for EMS inquiries (none confirmed here).",
      "Whether the program includes a Q&A/business session or a showcase-only tour."
    ],
    risks: [
      "Not a biotech meeting — value is operational/manufacturing learning; confirm exact site and biotech-hardware relevance.",
      "Expect a large showcase/campus tour rather than a working meeting; photography may be restricted."
    ],
    fitScore: 35,
    status: "profiled",
    publicSources: [
      "https://www.byd.com",
      "https://en.wikipedia.org/wiki/BYD_Company",
      "https://www.nsmedicaldevices.com/analysis/top-medical-device-ems-companies/"
    ]
  },
  {
    id: "sz-gsh-biotech",
    name: "Shenzhen GSH Bio-Technology",
    nameLocal: "深圳市古特生物技术有限公司",
    category: "biomanufacturing",
    city: "Shenzhen",
    area: "Nanshan District (Shenzhen Bay tech park)",
    corridor: "Shenzhen",
    website: "https://www.gsh-world.com",
    oneLiner:
      "A Shenzhen-headquartered fermentation-ingredient company specialising in glutathione and NMN — a convenient Nanshan-based meeting on a relevant antioxidant active, though its actual fermentation plants sit outside the GBA.",
    whatTheyDo:
      "GSH Bio-Technology (brand GSHWorld) is headquartered in Shenzhen's Nanshan/Shenzhen Bay tech park and produces glutathione (reduced GSH, S-acetyl-L-glutathione), beta-NMN and related nutritional/cosmetic raw materials via microbial fermentation, holding pharma-supplier credentials. Its manufacturing bases are in Anhui (Anqing) and Jilin — the Shenzhen site is the HQ/commercial/R&D hub, not the fermentation factory.",
    whyItMatters:
      "A microbial-fermentation ingredient producer with pharma-grade documentation — credible biomanufacturing and process know-how to benchmark, plus an easy low-friction first meeting near base. Secondary: glutathione is a known topical antioxidant/brightening active for the Coolvex line. Best treated as an actives supplier and market-intel contact rather than a local manufacturing site.",
    visitObjective:
      "Early low-commitment relationship meeting to learn the local fermentation-ingredient landscape and scope glutathione as an active; keep scope to actives and relationship, since any plant tour would require travelling to Anhui/Jilin.",
    route:
      "Appointment-only early Nanshan meeting; approach via the company website inquiry form (no direct BD channel confirmed).",
    priority: "medium",
    confidence: "medium",
    talkingPoints: [
      "Do you offer a cosmetic-grade glutathione with topical-use documentation, distinct from the supplement/API grade?",
      "Can any pilot or contract fermentation be arranged in Guangdong, or only at the Anhui/Jilin plants?",
      "Can we establish a direct BD channel to plan a Nanshan meeting?",
      "Bring the Pure Advance one-pager and an NDA template."
    ],
    openQuestions: [
      "Confirm the registered Chinese entity name and the relationship between the Shenzhen HQ and the Anhui GSH Bio-Technology operation.",
      "Confirm a cosmetic-grade glutathione offering and topical-use documentation (vs supplement/API grade).",
      "Establish a direct BD channel.",
      "Confirm whether any pilot or contract fermentation can be arranged in Guangdong, or only at the Anhui/Jilin plants."
    ],
    risks: [
      "Actual fermentation capacity is in Anhui/Jilin — not a local GBA manufacturing site; treat as an actives supplier + market-intel contact.",
      "Small/private ingredient manufacturer surfaced via supplier directories; financials not captured — verify GMP/quality documents, product grade, capacity, export compliance and payment terms.",
      "Registered entity name is inferred/transliterated — verify the legal name."
    ],
    fitScore: 55,
    status: "researched",
    publicSources: [
      "https://www.gsh-world.com/",
      "https://www.pharmacompass.com/api-manufacturers/shenzhen-gsh-bio-tech-co-ltd",
      "https://www.echemi.com/shop-us20210422177810797/index.html"
    ]
  },
  {
    id: "sz-guangxin",
    name: "Guangxin Bio-manufacturing",
    nameLocal: "广新生物智造技术创新（深圳）有限公司",
    category: "biomanufacturing",
    city: "Shenzhen",
    area: "Guangming District",
    corridor: "Shenzhen",
    oneLiner:
      "A Guangming biomanufacturing-innovation platform tied to the Guangdong Guangxin / state-owned ecosystem and SIAT — strategically connected as a co-founder of the national center, but with no clear public BD channel or confirmed external-service offering.",
    whatTheyDo:
      "A Guangming-based biomanufacturing innovation platform linked to the Guangxin state-owned group and the broader Guangming synbio ecosystem. Government sources describe a platform combining biotechnology, information technology, engineering automation and AI around a 'one library, four platforms' concept for industrial-microbial strain intelligent breeding, with SIAT cooperation; its 'Guangdong Guangxin Innovation Research Institute' is listed among co-establishing partners of the National Biomanufacturing Industry Innovation Center.",
    whyItMatters:
      "Strategic/ecosystem value: industrial-microbial strain and process development plus a possible route to pilot-fermentation infrastructure via the Guangming/national-center network — close on paper to Pure Advance's strain-discovery + biomanufacturing lead. Exploratory only: it is a platform/ecosystem player, not a finished-product developer, and whether it offers external services versus internal group R&D is unverified.",
    visitObjective:
      "Exploratory: probe whether it offers any external pilot-fermentation / strain / process-development service and whether it can broker access to shared national-center pilot infrastructure.",
    route:
      "Appointment / introduction-only; route via Guangming district, SIAT, the national center or an InnoX introduction rather than a standalone visit.",
    priority: "watchlist",
    confidence: "low",
    talkingPoints: [
      "Do you offer any external pilot-fermentation / strain / process-development service, or is it internal group R&D only?",
      "Given the link to the national center, can you broker access to shared pilot-fermentation infrastructure?",
      "What is the official website, a BD channel and the precise Guangming location (none confirmed yet)?",
      "Bring the Pure Advance one-pager and an NDA template."
    ],
    openQuestions: [
      "Whether the entity offers any external pilot-fermentation / strain / process-development service, or is internal group R&D only.",
      "A real official website, a BD channel and a precise location — none confirmed.",
      "Exact relationship to the national center and whether it can broker pilot-infrastructure access.",
      "Leadership and any funding/scale figures — none verified; do not state."
    ],
    risks: [
      "Low confidence: no standalone official website, no public BD channel, and location unverified beyond the district.",
      "Institutional platform, not a normal vendor — may be internal group R&D only; external-service offering unverified.",
      "Best accessed only via introduction; not viable as a standalone cold visit."
    ],
    fitScore: 40,
    status: "candidate",
    publicSources: [
      "https://www.szgm.gov.cn/xxgk/xqgwhxxgkml/xwzx/tpxw/content/post_11309589.html",
      "https://www.gdghg.com/xwzx/gxyw/content/post_51631.html",
      "https://www.szgm.gov.cn/english/news/latestnews/content/post_11440575.html"
    ]
  },
  {
    id: "sz-hetao",
    name: "Hetao Shenzhen–Hong Kong Science & Technology Innovation Cooperation Zone",
    nameLocal: "河套深港科技创新合作区",
    category: "ecosystem",
    city: "Shenzhen",
    area: "Futian District (Hetao)",
    corridor: "Shenzhen",
    website: "https://htcz.sz.gov.cn/en/",
    oneLiner:
      "A small cross-border innovation zone straddling the Shenzhen–Hong Kong boundary in Futian, purpose-built to let researchers, capital and materials move between the two systems — including a dedicated biopharma cluster.",
    whatTheyDo:
      "The Hetao SZ–HK S&T Innovation Cooperation Zone (~3.89 km², a Shenzhen Park plus a Hong Kong Park at the Lok Ma Chau Loop) is a cross-border innovation zone in southern Futian bordering Hong Kong. Its International Biomedicine Industrial Park hosts AI-bio and biopharma tenants and institutes, an on-site NMPA GBA drug-review sub-centre and clinical-trial centre, mid-test (pilot) platforms, and a special regime for centralised customs clearance, cross-border biological-sample and clinical-data flow, and dual-currency funds.",
    whyItMatters:
      "The cross-border sourcing and dual-market base story: easier movement of strains, samples, reagents and equipment across the SZ–HK boundary, shared mid-test/pilot-fermentation labs, and an AI-bio peer ecosystem — a potential GBA landing point and HK-facing bridge for Pure Advance's discovery + biomanufacturing platform. The cluster skews human drug discovery, devices and cell & gene with no verified microbial/agri-microbe tenant, which is likely Pure Advance's wedge; an agricultural biocontrol also sits under a different regulatory/partner map than a human drug.",
    visitObjective:
      "Scope landing support for a foreign biotech, the cross-border customs/sample-transfer regime, mid-test/pilot-fermentation platform access, and which tenants touch microbial/fermentation work; identify where a future GBA presence or supplier base could sit.",
    route:
      "On the cohort itinerary (28 Jul 2026); warm-intro route via KAUST's Shenzhen hub and CUHK-SZ MoU plus the zone's investment-promotion / e-Station landing desk. Confirm whether the stop is the exhibition centre or a working biopharma-park site.",
    priority: "high",
    confidence: "high",
    talkingPoints: [
      "For a foreign (Saudi) biotech with no China entity, what is the real landing path into the biomedicine park / mid-test cluster — and can we host a wet-lab + pilot-scale fermentation bench rather than build?",
      "How does centralised customs clearance for research materials work for importing microbial strains, reagents and fermentation consumables — timelines, restricted lists, sponsor?",
      "Which named tenants or institutes touch microbial / synthetic-biology / agricultural-microbe / fermentation work that we could partner or co-locate with?",
      "Bring the Pure Advance one-pager, a cross-border sourcing / sample-flow needs brief, and an NDA template."
    ],
    openQuestions: [
      "Current channel for company landing / investment promotion (none confirmed).",
      "Specific Life & Green Valley tenants/anchors relevant to microbial discovery / biomanufacturing / agri-bio, and secondarily topical-care.",
      "Practical eligibility and process for a foreign (Saudi) biotech to engage or co-locate, and HK-park access logistics."
    ],
    risks: [
      "No verified microbial / synthetic-biology / agri-microbe tenant — cluster skews human drug discovery, devices and cell & gene; tenant fit still depends on introductions.",
      "The product is an agricultural biocontrol, not a human drug — the regulatory and partner map differs from the biopharma tenants here.",
      "Confirm whether the stop is the exhibition centre or a working biopharma-park site before setting expectations."
    ],
    fitScore: 80,
    status: "profiled",
    publicSources: [
      "https://htcz.sz.gov.cn/en/",
      "https://gba.investhk.gov.hk/en/business-insights/hetao-shenzhen-hong-kong-science-and-technology-innovation-cooperation-zone-e.html",
      "https://www.sz.gov.cn/en_szgov/business/SpecialFunctionalAreas/content/post_11487138.html"
    ]
  },
  {
    id: "sz-icarbonx",
    name: "iCarbonX",
    nameLocal: "碳云智能",
    category: "ai-biotech",
    city: "Shenzhen",
    area: "Nanshan",
    corridor: "Shenzhen",
    website: "https://www.icarbonx.com",
    oneLiner:
      "Shenzhen 'digital life' company building an AI platform that fuses multi-omics (genome, metabolome, microbiome) with lifestyle data to model individual health — an early, ambitious AI-multi-omics play whose mid-2010s hype has cooled and whose current momentum is unclear.",
    whatTheyDo:
      "iCarbonX set out to build a digital-life ecosystem: collect dense, longitudinal personal biology data (genomics, metabolites, microbiome, proteomics, wearables/lifestyle) and apply machine intelligence to turn it into actionable health insight. It positioned AI as the integrating layer across heterogeneous omics and in 2017 launched a Digital Life Alliance with international data companies (SomaLogic, PatientsLikeMe, AOBiome, HealthTell). The AI angle is multi-omics data integration / computational biology at the individual level, rather than drug discovery or bioprocess.",
    whyItMatters:
      "Medium fit on the AI-in-biotech pillar — more about people and data than a deal. Multi-omics + AI data integration is the same class of capability a microbial-resource-discovery platform leans on to find and characterize bioactive strains, so it is a useful benchmark for AI-compressed discovery. Its microbiome/metabolome modeling could also inform a consumer skin/wellness evidence story at a high level. The Nanshan location minutes from the trip base makes a meeting logistically cheap. Strong caveat: it peaked around 2016-2018 with little recent public signal, so treat it as a low-cost exploratory conversation, not a partnership pitch.",
    visitObjective:
      "Low-cost exploratory local conversation to benchmark AI-driven multi-omics data integration and gauge whether the platform is still active and relevant to microbial-resource discovery; not a partnership pitch.",
    route: "Company contact page, a Nanshan ecosystem intro, or a BGI-network intro.",
    priority: "watchlist",
    confidence: "medium",
    talkingPoints: [
      "Benchmark AI-driven multi-omics data integration (genome/metabolome/microbiome) as a model for strain discovery and characterization.",
      "Explore whether microbiome/metabolome modeling could support a consumer skin/wellness evidence story.",
      "Understand the current status of the 'digital life' platform and any live products or partnerships."
    ],
    openQuestions: [
      "Is iCarbonX still actively operating and worth a meeting in 2026? Public momentum largely stops around 2018.",
      "Is the multi-omics microbiome/strain modeling relevant to microbial-resource discovery, or is it general health-data modeling?",
      "Any current partnerships, products, or revenue since the 2017 Digital Life Alliance?",
      "Founder's current involvement and who handles external partnerships now.",
      "Which office is currently in use (confirm before travel)."
    ],
    risks: [
      "Momentum caveat: bulk of verifiable coverage is 2015-2018; current headcount, pipeline, and whether the 'digital life' vision is still pursued are not established.",
      "May be a courtesy/benchmark meeting at best rather than a partnership.",
      "Appointment-only; verify the company is active and has a host before committing time."
    ],
    fitScore: 45,
    status: "researched",
    publicSources: [
      "https://www.icarbonx.com",
      "https://en.wikipedia.org/wiki/ICarbonX",
      "https://www.nature.com/articles/nbt0217-103a"
    ]
  },
  {
    id: "sz-lenovo",
    name: "Lenovo (Shenzhen — South Smart Campus)",
    nameLocal: "联想",
    category: "corporate-visit",
    city: "Shenzhen",
    area: "Lenovo South Smart Campus (LSSC)",
    corridor: "Shenzhen",
    website: "https://www.lenovo.com",
    oneLiner:
      "Lenovo's most critical global supply-chain and R&D hub sits in Shenzhen, anchored by its new 'mother factory' — a showcase of AI-accelerated smart manufacturing.",
    whatTheyDo:
      "Lenovo is a global PC, server and smart-device maker. Shenzhen hosts its most important global R&D centre, supply-chain operations centre and global finance division (5,000+ staff). The Lenovo South Smart Campus (LSSC) is positioned as a global 'mother factory' — a high-automation site that exports its processes to Lenovo plants worldwide. Roughly 70% of Lenovo's globally sold servers are built in Shenzhen, and its ThinkPad laptop factory is here too. Its supply chain ranks among the top ten worldwide (Gartner).",
    whyItMatters:
      "A best-in-class look at AI-driven smart manufacturing and supply-chain orchestration. The value for Pure Advance is process literacy: how a mother factory standardises quality and ramps production, how automation and data flow through a line, and how a global supply chain runs from a single hub — a useful mental model for scaling any physical Pure Advance product. Lower direct-collaboration potential than a biotech site; treat it as a manufacturing-excellence benchmark.",
    visitObjective:
      "Smart-manufacturing and supply-chain benchmark visit — observe rather than transact; learn the mother-factory model, degree of automation, QC/traceability, and new-product-introduction flow.",
    route:
      "Program itinerary stop arranged as a corporate site visit; confirm the touring facility on the itinerary.",
    priority: "medium",
    confidence: "high",
    talkingPoints: [
      "How the mother-factory model transfers and standardises process to overseas plants.",
      "Degree of automation and how data flows through the line.",
      "Quality-control and traceability systems.",
      "How new products are introduced to the line (NPI flow)."
    ],
    openQuestions: [
      "Exact campus address/district and which facility the program tours.",
      "Whether the visit is showcase-only or includes a session/Q&A.",
      "Local host for follow-up."
    ],
    risks: [
      "Lower direct-collaboration potential than a biotech site — a manufacturing-excellence benchmark, not a partnering opportunity.",
      "Prepare to observe rather than transact."
    ],
    fitScore: 35,
    status: "profiled",
    publicSources: [
      "https://news.lenovo.com/ai-accelerated-manufacturing-talent-supply-chain-lssc/",
      "https://www.yicaiglobal.com/news/lenovo-to-build-global-headquarters-in-shenzhen-by-2020-says-its-ceo",
      "https://en.wikipedia.org/wiki/Lenovo"
    ]
  },
  {
    id: "sz-national-biomanufacturing-center",
    name: "National Biomanufacturing Industry Innovation Center (+ Xinmei / Yinxing Synthetic Biology Industrial Park)",
    nameLocal: "国家生物制造产业创新中心（及新湖/银星合成生物产业园）",
    category: "biomanufacturing",
    city: "Shenzhen",
    area: "Guangming Science City, Yinxing Synthetic Biology Industrial Park",
    corridor: "Shenzhen",
    website: "http://www.isynbio.org.cn/en/significantPlatform/list/2",
    oneLiner:
      "China's first national-level biomanufacturing innovation platform, purpose-built to close the '1→10' lab-to-pilot scale-up gap — the single best ecosystem gateway to actual pilot-fermentation capacity and tenant companies in Guangming.",
    whatTheyDo:
      "NDRC-approved (Jul 2023), built from Jul 2024, and in trial operation from Dec 2025 in Guangming Science City. Led by SIAT/CAS and operated by Shenzhen Biomanufacturing Industry Innovation Center Co. (reg. capital ~RMB 700M; among 34 co-builders: SDIC, China Merchants, Shum Yip, Bloomage, Guangxin, Huaheng, Leo-King). It runs six platforms — automated biomanufacturing, cross-scale validation, high-throughput process development, pilot scale-up and GMP, large-scale carrier prep and QC, and bio-information computing — across green/low-carbon, bio-agriculture and health. The associated Yinxing/Xinmei park hosts biomaterials, biological-food, bioreagent and cosmetics tenants for proof-of-concept to pilot-scale work.",
    whyItMatters:
      "Bullseye for the pilot-fermentation priority and strong on AI-in-biotech (automation plus bio-information computing). Bio-agriculture is one of three official fields, aligning directly with Pure Advance's AI-accelerated microbial biocontrols. As a government/CAS-backed national platform it is a gateway rather than a single vendor: one introduction can route Pure Advance to shared pilot/GMP infrastructure (the '1→10' scale-up gap biocontrols must clear) plus relevant tenant companies in one Guangming visit. The same capacity could also serve a biologically produced Coolvex ingredient. The #1 thing to clarify is whether and how a foreign non-resident startup can access the platform.",
    visitObjective:
      "Secure an official access briefing on whether/how a foreign non-resident startup can run pilot-fermentation and GMP batches, and get introductions to 2-3 agri-microbial or industrial-fermentation resident tenants; treat as the Guangming ecosystem gateway.",
    route:
      "Route via InnoX / program organisers and/or the SIAT-iSynBio international-cooperation office for an official cluster briefing; do not cold-approach.",
    priority: "must_contact",
    confidence: "high",
    talkingPoints: [
      "Is the pilot scale-up & GMP platform operational now (Jul 2026), and what fermentation volumes/modes does the pilot (中试) line cover?",
      "Can a foreign, non-resident startup run a pilot batch — fee-for-service, co-development, or resident-only — and at what cost and lead-time?",
      "Do you support live-microbial biopesticide/biocontrol scale-up (not just enzymes), and what is the biosafety ceiling for foreign-origin strains?",
      "Can you introduce us to resident agri-microbial tenants (e.g. 中农秸美) and to Synceres next door?",
      "Bring: a Pure Advance one-pager (AI-accelerated microbial biocontrols), a pilot-fermentation needs summary (strains, volumes, downstream), and an NDA template."
    ],
    openQuestions: [
      "Whether overseas startups can access shared pilot-fermentation infrastructure, and on what terms (fee / partnership / introduction-only) — currently unpublished.",
      "Which platforms are operational versus still commissioning by Jul 2026 (trial operation began Dec 2025).",
      "Which resident tenants run microbial/agri-bio fermentation (lead) and, secondarily, topical/cosmetic biomaterials.",
      "The correct route/contact for a foreign-founder cluster visit in July 2026 (likely InnoX)."
    ],
    risks: [
      "Trial-operation, not fully live, in mid-2026 — the pilot/GMP platforms are still commissioning.",
      "Access terms for a foreign non-resident startup are unpublished; the resident-enterprise model (first cohort already signed) may favour tenants or partner-routed projects.",
      "Appointment/introduction-only — route via InnoX or SIAT/iSynBio, do not cold-approach.",
      "Guangming is roughly 35-50 km / 60-80 min from the Nanshan base; plan a dedicated Guangming day combined with iSynBio and Synceres."
    ],
    fitScore: 88,
    status: "profiled",
    publicSources: [
      "http://www.isynbio.org.cn/en/significantPlatform/list/2",
      "https://finance.sina.com.cn/roll/2025-12-04/doc-infzrrce8607072.shtml",
      "https://www.time-weekly.com/post/316500"
    ]
  },
  {
    id: "sz-pam2l",
    name: "PAM²L Biotechnologies",
    nameLocal: "柏垠生物（深圳柏垠生物科技有限公司）",
    category: "biomanufacturing",
    city: "Shenzhen",
    area: "Shenzhen synthetic-biology cluster (SIAT-origin; district not verified)",
    corridor: "Shenzhen",
    website: "https://pam2l.com/",
    oneLiner:
      "The most Coolvex-specific biomaterial lead in the shortlist — a Shenzhen synthetic-biology company whose star molecule is a recombinant mussel adhesive protein with skin-repair, anti-inflammatory and wet-adhesion properties.",
    whatTheyDo:
      "Founded in 2021, PAM²L develops biomaterials driven by both synthetic biology and machine learning (BT-IT), engineering microorganisms as factories to produce protein and polysaccharide raw materials for pharmaceuticals, medical aesthetics, cosmetics and food. Its flagship is a recombinant mussel adhesive protein — bio-derived, with repairing and anti-inflammatory benefits and wet-adhesion. Public exhibitor listings also reference a recombinant Type V mussel adhesive protein and a product named 'Colamin' (not independently confirmed on the live, JS-rendered site).",
    whyItMatters:
      "Medium-high fit. Primary relevance is platform-adjacent: an engineered-microbe / ML-guided strain-design house that demonstrates microbial-resource-to-biomaterial translation — a useful synbio peer and co-development reference for Pure Advance's discovery-plus-biomanufacturing-plus-AI core. Secondary topical fit is genuine and strong: the recombinant mussel-adhesive protein (wet-adhesion, skin-repair, anti-inflammatory) could support delivery/retention and barrier repair for the Coolvex sensitive-area line at a high level. Caveat: it is a materials/co-development partner, not obviously an external fermentation CDMO.",
    visitObjective:
      "Benchmark ML-driven strain/protein design and microbial production against Pure Advance's discovery pipeline, and scope the recombinant mussel-adhesive protein as a possible Coolvex ingredient or co-development lead.",
    route:
      "Appointment-only; approach directly via the company after confirming details, or via the Shenzhen synbio / SIAT ecosystem.",
    priority: "high",
    confidence: "medium",
    talkingPoints: [
      "Is the recombinant mussel-adhesive protein available as a cosmetic raw-material sample?",
      "INCI / NMPA status, and an international regulatory pack?",
      "Safety, irritation and sensitization data, and stability in an ointment base?",
      "Could you support a small pilot formulation collaboration for sensitive-area topical use?",
      "Bring: a Pure Advance one-pager, a delivery/retention requirements brief, and an NDA template."
    ],
    openQuestions: [
      "Exact district/area and nearest metro — not verified (public site is JS-rendered with no plain-text address).",
      "Whether the recombinant mussel adhesive protein is available as a cosmetic/raw-material sample; INCI/NMPA status; international regulatory pack.",
      "Safety/irritation/sensitisation data and protein stability in an ointment base with preservatives.",
      "'Colamin' / Type V mussel protein details (listing-only, unconfirmed).",
      "Whether they can support a small pilot formulation collaboration, and on what IP terms.",
      "Confirm the correct business/BD contact and current funding round (public listing values unverified)."
    ],
    risks: [
      "A materials/co-development partner, not obviously an external fermentation CDMO — treat as a parallel biomaterial lead, not the manufacturing solution.",
      "Medium confidence: exact address, contact and current funding/capacity are unverified.",
      "Public site is JS-rendered with no extractable address — confirm the district before any visit.",
      "Appointment-only."
    ],
    fitScore: 68,
    status: "researched",
    publicSources: [
      "https://pam2l.com/",
      "https://technode.global/2024/08/30/shenzhen-based-pam2l-biotechnologies-plans-new-round-of-funding-to-expand-capabilities/"
    ]
  },
  {
    id: "sz-readline",
    name: "Readline Biotech (Ruidelin)",
    nameLocal: "深圳瑞德林生物技术股份有限公司",
    category: "biomanufacturing",
    city: "Shenzhen",
    area: "Nanshan District / Hi-Tech Park (HQ); Zhuhai and Gansu (Baiyin) production bases",
    corridor: "Shenzhen",
    website: "https://www.szreadline.com/",
    oneLiner:
      "Shenzhen synthetic-biology / enzyme-catalysis company with its own pilot lines in Shenzhen and ton-to-hundred-ton production lines in Zhuhai — a strong scale-up partner for peptides, sugars and specialty actives, and a credible candidate for external process development / custom manufacturing.",
    whatTheyDo:
      "Founded in 2017, a national high-tech enterprise. Its core platform is enzyme catalysis / immobilised-enzyme technology combined with fermentation, applied to scaled production of peptides, oligosaccharides, nucleic-acid building blocks, non-natural amino acids and functional ingredients. The product line spans GLP-1-class peptides, proxylane, ergothioneine, ectoine, collagen tripeptide, HMOs, ceramide, NAD+/NMN, GHK-Cu, carnosine and glutathione. Its footprint is 'one centre, two wings' — Shenzhen R&D/pilot, a Zhuhai bio base and a Gansu (Baiyin) chemical base, with hundred-ton-scale ingredient lines and a ton-scale pilot line referenced in Zhuhai.",
    whyItMatters:
      "High fit. They run real pilot-to-production scale-up (pilot lines in Shenzhen, ton/hundred-ton lines in Zhuhai) on an enzyme-catalysis plus fermentation platform, mapping directly onto Pure Advance's external biomanufacturing priority (roughly 5 L to 1000 L+) with process development and downstream — a candidate biomanufacturing / process-development partner for fermenting and scaling discovered strains and metabolites. Their actives catalogue (ergothioneine, ectoine, ceramide, GHK-Cu, collagen tripeptide) also overlaps topical care for the Coolvex line. The differentiator is enzyme/biocatalysis rather than pure microbial fermentation, so the key question is whether classical microbial fermentation is in scope.",
    visitObjective:
      "Assess Readline as an external process-development / custom-manufacturing (CDMO) partner for scaling discovered strains and metabolites — confirm classical fermentation scope (5 L→1000 L+) — and scope actives-catalogue overlap for the Coolvex topical line.",
    route:
      "Appointment-only; arrange a Shenzhen (Nanshan Hi-Tech Park) HQ meeting and, separately, a Zhuhai plant tour as a GBA day-trip; verify the correct BD/commercial contact (public contacts are HR/recruitment).",
    priority: "high",
    confidence: "high",
    talkingPoints: [
      "Do you accept external custom fermentation / CDMO projects (versus selling own-catalogue actives)?",
      "What classical fermentation volumes do you run (5 L → 1000 L+) versus enzyme-catalysis only?",
      "Can you provide cosmetic-grade quality/reg docs (COA, INCI/CAS, impurity, heavy metals, microbiology) for sensitive-area use, plus MOQ and export capability to KSA/GCC?",
      "Is a Zhuhai plant visit possible during the trip window?"
    ],
    openQuestions: [
      "Whether they accept external custom fermentation / CDMO projects, and classical fermentation volumes (5 L→1000 L+) versus enzyme-catalysis only.",
      "Exact Zhuhai base location and whether plant visits are possible during the trip window.",
      "The correct BD/commercial contact (public contacts are HR/recruitment).",
      "Cosmetic-grade quality/reg docs, MOQ, and export capability to KSA/GCC.",
      "Current funding/capacity figures (Chinese-press claims, not independently confirmed)."
    ],
    risks: [
      "Differentiator is enzyme/biocatalysis, not pure microbial fermentation — classical aerobic fermentation scope for biocontrols is unconfirmed.",
      "Production lines are in Zhuhai (~2.5-3 h from Shenzhen) — a plant tour is a separate GBA day-trip from a Shenzhen meeting.",
      "Public contacts are HR/recruitment; verify the correct BD contact before travel.",
      "Funding/capacity figures are Chinese-press claims, not independently verified."
    ],
    fitScore: 80,
    status: "profiled",
    publicSources: [
      "https://www.szreadline.com/",
      "https://baike.baidu.com/item/深圳瑞德林生物技术有限公司/51258051",
      "https://36kr.com/p/2032086214142976"
    ]
  },
  {
    id: "sz-shengbao",
    name: "Synthetica Pioneering (Shengbao Bio)",
    nameLocal: "深圳市生葆生物科技有限公司",
    category: "biomanufacturing",
    city: "Shenzhen",
    area: "SIAT-incubated (Shenzhen; precise district not verified)",
    corridor: "Shenzhen",
    website: "http://synthetica-pioneering.com/",
    oneLiner:
      "A SIAT-incubated synthetic-biology startup developing engineered living bacterial therapeutics for solid tumours — strong investors and synbio pedigree, but far from pilot-fermentation manufacturing for a topical product.",
    whatTheyDo:
      "A SIAT/CAS spin-off founded in 2023, focused on gene-circuit engineering and precise control of genes and payloads to treat disease — currently developing oncolytic bacterial therapies for solid tumours. Its strength is quantitative synthetic biology. It is a therapeutics R&D / pipeline company, not a contract manufacturer or ingredient-supply platform.",
    whyItMatters:
      "Low fit. A SIAT/iSynBio-network synbio contact only — quantitative synthetic biology and gene-circuit engineering are adjacent in spirit to Pure Advance's engineered-microbe platform, but the oncolytic-bacterial-therapy focus serves neither the agri-biocontrol lead nor the secondary Coolvex topical line. The live-biotherapeutic regulatory burden is high and they are not a service provider. Keep purely as an ecosystem/synbio-network contact; deprioritise for this trip.",
    visitObjective:
      "Treat as a low-priority ecosystem/synbio-network touchpoint; if engaged at all, confirm whether any manufacturing or ingredient-supply service exists (expected none) and gauge whether their quantitative synbio / gene-circuit expertise could matter to a future Pure Advance engineered-microbe effort.",
    route: "Only via the SIAT / iSynBio network, if at all.",
    priority: "watchlist",
    confidence: "low",
    talkingPoints: [
      "Is there any manufacturing or ingredient-supply service, or is this purely a therapeutics R&D pipeline (expected: no service)?",
      "Could your quantitative synthetic-biology / gene-circuit expertise ever apply to engineered-microbiome or live-biotherapeutic work Pure Advance might pursue later?",
      "Is the SIAT / iSynBio network the better route to reach you?",
      "Bring: Pure Advance one-pager (AI-accelerated microbial biocontrols); NDA template."
    ],
    openQuestions: [
      "Confirm there is no manufacturing-service offering (expected: none).",
      "Precise Shenzhen location / district not yet verified.",
      "Leadership not yet identified.",
      "Re-check appointment availability before travel."
    ],
    risks: [
      "Therapeutics R&D pipeline company, not a contract manufacturer or ingredient supplier — no direct service offering.",
      "High live-biotherapeutic regulatory burden.",
      "Appointment-only and low priority; best reached only via the SIAT/iSynBio network.",
      "Low confidence — contact details and availability need re-checking before travel."
    ],
    fitScore: 20,
    status: "candidate",
    publicSources: [
      "http://synthetica-pioneering.com/",
      "https://www.prnewswire.com/news-releases/synthetica-pioneering-closes-a-series-a-funding-round-to-support-development-of-oncolytic-bacterial-therapy-for-solid-tumors-302209281.html",
      "https://www.biospace.com/synthetica-pioneering-closes-a-series-a-funding-round-to-support-development-of-oncolytic-bacterial-therapy-for-solid-tumors"
    ]
  },
  {
    id: "sz-shenzhen-bay-lab",
    name: "Shenzhen Bay Laboratory",
    nameLocal: "深圳湾实验室",
    category: "ecosystem",
    city: "Shenzhen",
    area: "Guangming Science City, Guangming District",
    corridor: "Shenzhen",
    website: "https://www.szbl.ac.cn/en/",
    oneLiner:
      "A flagship Guangdong/Shenzhen biomedical research institute in Guangming Science City, focused on the discovery, diagnosis and treatment of major diseases — the most on-brand stop on the program for Pure Advance.",
    whatTheyDo:
      "A government-backed life/health-sciences research platform (established 2019 with Peking University Shenzhen Graduate School and the city; ~RMB 13B five-year launch budget). It runs seven institutes; the two most relevant are the Institute of Chemical Biology (microbial natural-product biosynthesis, biosynthetic gene clusters, Streptomyces heterologous expression, synbio + ML-guided biosynthesis) and the Institute of Systems & Physical Biology (protein/enzyme design, AI/bioinformatics, metabolic control). It hosts the Scripps Research–SZBL Chemical Biology Institute, a proven foreign-collaboration model.",
    whyItMatters:
      "High — direct overlap on the discovery + biosynthesis half of Pure Advance's platform and on AI-accelerated strain/enzyme design. Offers a genuine co-discovery conversation plus a ready template (the Scripps joint institute) for how a foreign science org co-locates here. Probe whether any natural-product/biosynthesis work touches agricultural/biocontrol actives rather than only human therapeutics. Keep distinct from the nearby SIAT/iSynBio/National-Centre industrial-fermentation cluster.",
    visitObjective:
      "Hosted R&D visit (on the itinerary 27 Jul 2026) to explore collaboration and access — AI + wet-lab discovery, microbial/strain and bioactive screening, shared instrumentation, and translation-to-industry pathways — and to identify labs/PIs relevant to microbial discovery (lead) and dermatology/formulation (Coolvex secondary).",
    route:
      "Hosted visit arranged via the program coordinator; request intros to the Institute of Chemical Biology and the industry-collaboration office in advance.",
    priority: "must_contact",
    confidence: "high",
    talkingPoints: [
      "Which institutes / PIs work on microbial natural-product discovery and biosynthesis, and does any of it touch agricultural / biocontrol actives rather than human therapeutics?",
      "How does a foreign company collaborate with SZBL in practice — sponsored research, joint lab, visiting researcher — and could the Scripps joint institute be a template to mirror?",
      "What fermentation / bioprocess capability is in-house vs. via SIAT / iSynBio / the National Biomanufacturing Centre next door?",
      "Bring: Pure Advance one-pager; microbial-discovery / target-actives brief; NDA template."
    ],
    openQuestions: [
      "Identify the current director and the specific PIs/centres relevant to microbial/strain discovery, bioactive screening and AI-in-biotech (lead), and secondarily topical/dermatology and formulation science (Coolvex).",
      "Whether the program includes a scientific session / lab tour vs. a briefing, and any partnership/visiting-researcher pathways.",
      "Whether there is a public route to the translation / industry-collaboration office."
    ],
    risks: [
      "Research institute/platform, not a manufacturer or vendor — engagement is collaboration/access, not fee-for-service supply.",
      "Appointment-only working lab; access depends on the program coordinator / hosted visit.",
      "Located ~50–70 min north of Nanshan; allow travel time.",
      "Keep distinct from the SIAT/iSynBio/National-Centre industrial-fermentation cluster nearby."
    ],
    fitScore: 82,
    status: "researched",
    publicSources: [
      "https://www.szbl.ac.cn/en/",
      "https://en.szbl.ac.cn/research/institutes.htm",
      "https://www.scripps.edu/news-and-events/press-room/2019/20191127-szbl-collaboration.html"
    ]
  },
  {
    id: "sz-siat-isynbio",
    name: "SIAT / iSynBio — Shenzhen Institute of Synthetic Biology & Synthetic Biology Infrastructure",
    nameLocal: "中科院深圳先进技术研究院 合成生物学研究所（深圳合成生物研究重大科技基础设施）",
    category: "biomanufacturing",
    city: "Shenzhen",
    area: "Guangming Science City, Guangming District",
    corridor: "Shenzhen",
    website: "http://www.isynbio.org.cn/en/",
    oneLiner:
      "The academic and biofoundry backbone of the Guangming synbio cluster — China's first synthetic-biology institute, operating the world's largest synthetic-biology research infrastructure and the institutional lead behind the national biomanufacturing center.",
    whatTheyDo:
      "iSynBio (Shenzhen Institute of Synthetic Biology, SIAT/CAS; established Dec 2017), China's first synthetic-biology institute, operates the Shenzhen Synthetic Biology Infrastructure (~RMB 1B equipment; main building completed Jan 2021) as a 'cloud lab' + 'intelligent lab.' Its Biofoundry runs a full design-build-test-learn (DBTL) loop: automated build (DNA/phage/bacteria/yeast, high-throughput strain construction), test (chromatography/MS, fermentation scale-up, metabolite analysis) and AI/ML-driven design. It houses an Agricultural & Plant Synthetic Biology Research Center (crops, algae, agricultural microbes, green agri-biomanufacturing) and is the institutional lead behind the adjacent National Biomanufacturing Center. Member of the Global Biofoundry Alliance.",
    whyItMatters:
      "High — maps onto all three Pure Advance pillars: microbial-resource discovery + strain construction, pilot/scale-up biomanufacturing, and AI-in-biotech (their DBTL loop mirrors our thesis). The agricultural-microbe centre is the natural bridge for AI-accelerated biocontrol/biopesticide work. Best used as the academic-credibility + introductions lever and gateway to the whole Guangming cluster — framing the ask around Biofoundry access, agri-microbe co-development, and routing to the National Centre and cluster spinouts for scale-up. It is an R&D and network route, not a finished-product manufacturer.",
    visitObjective:
      "Secure an appointment/introduction to explore Biofoundry access (fee-for-service or joint project), agri-microbe co-development at the Agricultural & Plant Synthetic Biology Research Center, and routing to the National Biomanufacturing Centre and cluster spinouts for pilot scale-up; use as the gateway to the wider Guangming synbio cluster.",
    route:
      "Introduction-only: via InnoX / the program's official channel or SIAT's international-cooperation office; the 24 Jul SIAT Nanshan (Mobility Innovation Platform) itinerary item can secure an internal referral to the synbio site; also via the KAUST Shenzhen Hub.",
    priority: "must_contact",
    confidence: "high",
    talkingPoints: [
      "Can a foreign startup access the Biofoundry on a fee-for-service / joint-project basis, and what is the intake process (proposal review? Chinese partner required)?",
      "What fermentation scale-up and high-throughput strain construction/screening can external users run for a candidate biocontrol-microbe library — chassis, bioreactor volumes, metabolite analytics?",
      "Is agricultural-microbe / biocontrol work in scope at the Agricultural & Plant Synthetic Biology Research Center, and could we co-develop there — and what are the IP / data / biosafety / cross-border terms?",
      "Can you route us to the National Biomanufacturing Centre and to cluster spinouts (e.g., Synceres) for pilot scale-up?",
      "Bring: Pure Advance one-pager; candidate strain / target-library brief; NDA template."
    ],
    openQuestions: [
      "Which PIs/platform teams cover microbial-resource discovery, strain engineering and fermentation relevant to the agri-biocontrol lead — and, secondarily, skin/microbiome/biomaterials relevant to Coolvex.",
      "Whether the infrastructure/biofoundry can run or broker external pilot fermentation for a foreign startup, and on what terms.",
      "Correct international-cooperation / visit contact for July 2026; whether InnoX can route.",
      "NDA / IP / data-control terms for any collaboration."
    ],
    risks: [
      "Research & DBTL/biofoundry platform, not a finished-goods manufacturer; engagement is R&D/network access, not turnkey production.",
      "Appointment / introduction-only; access depends on an official referral (InnoX / SIAT international-cooperation office).",
      "Whether the biofoundry will run or broker external pilot fermentation for a foreign startup — and on what fee/IP/data terms — is unverified.",
      "The 24 Jul 'SIAT Mobility Innovation Platform' itinerary item is SIAT's Nanshan robotics campus, not the Guangming synbio site — plan a dedicated Guangming half-day (~50–80 min north)."
    ],
    fitScore: 88,
    status: "profiled",
    publicSources: [
      "http://www.isynbio.org.cn/en/",
      "https://infrasynbio.siat.ac.cn/en/platform/our/Biofoundry",
      "https://www.farmer.com.cn/2024/05/19/99954694.html"
    ]
  },
  {
    id: "sz-siyobio",
    name: "SiyoBio (Zhongke Xinyang)",
    nameLocal: "深圳中科欣扬生物科技有限公司",
    category: "biomanufacturing",
    city: "Shenzhen",
    area: "Longgang District",
    corridor: "Shenzhen",
    website: "https://www.siyobio.com",
    oneLiner:
      "A Shenzhen synthetic-biology company that runs microbial cell factories at industrial fermentation scale and sells COSMOS-certified skin actives (ectoin, ergothioneine) — a credible local fermentation + ingredient partner.",
    whatTheyDo:
      "SiyoBio (Zhongke Xinyang, from a CAS lineage) designs engineered microbial strains and ferments them to produce skincare and anti-ageing actives, including ectoin and SYOMICRO-ERGO (ergothioneine). It operates a dedicated Industrialization Center for process scale-up and mass production (reportedly up to ~100 tonnes per tank, >99% purity) plus an Applied Research Center. It holds FSSC22000, BRC, HACCP and HALAL food-safety certifications and EU COSMOS (ECOCERT) on several products.",
    whyItMatters:
      "High — lead fit is the biomanufacturing priority: pilot-to-industrial microbial fermentation with a real industrialization center and standardized process development, exactly the fermentation / scale-up capability Pure Advance needs for engineered microbial candidates. Its engineered-strain cell-factory model is on-theme for the discovery-plus-biomanufacturing platform. Secondary: its actives (ectoin, ergothioneine) are soothing, barrier-protective antioxidants suited to the Coolvex topical line. The HALAL certification is a standout fit for a Saudi-based partner.",
    visitObjective:
      "Meet on both fronts: CDMO / co-development for the engineered-microbial biocontrol platform (pilot→industrial fermentation), and buying validated actives (ectoin, ergothioneine) for the secondary Coolvex line; confirm whether they can show the Industrialization Center.",
    route:
      "Direct outreach for an appointment (they publish a direct channel); InnoX routing optional. Request a meeting at the Industrialization Center.",
    priority: "must_contact",
    confidence: "high",
    talkingPoints: [
      "Lead with the HALAL certification + Saudi-base hook (strongest single opener).",
      "Do you take external CDMO / contract-manufacturing projects, or only run your own product lines?",
      "What pilot-scale bioreactor sizes are available for a partner's process (the 100 t figure is your max, not necessarily pilot)?",
      "Can you supply cosmetic-grade ectoin and SYOMICRO-ERGO ergothioneine with COSMOS / HALAL documentation for the topical (Coolvex) line?",
      "Bring: Pure Advance one-pager; NDA template."
    ],
    openQuestions: [
      "Whether they take external CDMO / contract-manufacturing projects vs. only their own product lines.",
      "Exact pilot-scale bioreactor sizes available for a partner's process (the 100 t figure is their max, not pilot).",
      "GMP (pharma) vs. food/cosmetic-grade manufacturing status.",
      "Whether the Longgang address is HQ/office only and where the fermentation plant physically sits.",
      "KSA/GCC export capability, MOQ and sample availability; any post-2022 funding."
    ],
    risks: [
      "Open third-party CDMO/tolling terms are not advertised; public model is own-products + co-development, not fee-for-service — confirm openness.",
      "Pilot-scale reactor sizes for a partner's own process unconfirmed (100 t is max, not pilot).",
      "GMP vs. food/cosmetic-grade status unverified; COA/INCI/CAS export docs presumed but unconfirmed.",
      "Appointment-only; Longgang is across the city from Nanshan (~45–70 min); confirm plant location vs. office."
    ],
    fitScore: 85,
    status: "profiled",
    publicSources: [
      "https://www.siyobio.com",
      "https://www.siyobio.com/Industrialization-Center/",
      "https://www.siyobio.com/company-news/191.html"
    ]
  },
  {
    id: "sz-synceres",
    name: "Synceres Biosciences",
    nameLocal: "森瑞斯生物科技（深圳）有限公司",
    category: "biomanufacturing",
    city: "Shenzhen",
    area: "Yinxing Synthetic Biology Industrial Park, Guangming District",
    corridor: "Shenzhen",
    website: "https://en.synceres.com/",
    oneLiner:
      "The strongest direct fermentation-and-active-ingredient lead in Guangming: a synthetic-biology R&D-and-production company whose own catalogue already includes squalane, ectoine and ergothioneine.",
    whatTheyDo:
      "Synthetic-biology R&D and production company (founded 2019) running a full-chain platform that uses microorganisms as cell factories (rational gene design, directed evolution, novel enzymes/pathways). Its catalogue spans squalane, ectoine, ergothioneine, GABA and CBG, plus agriculture/aquaculture actives (decoyinine, jasmonates, L-astaxanthin). It publicly references a ~40,000 m² production base with kiloton-scale annual capacity and a pilot/scale-up line.",
    whyItMatters:
      "High — squarely on the lead biomanufacturing priority and the closest match to the pilot-scale fermentation goal. It runs the full Pure Advance stack: microbial cell factories, directed evolution, novel enzymes/pathways, and small-scale→pilot→ton scale-up. Its catalogue already includes agriculture/aquaculture actives (decoyinine, jasmonates, L-astaxanthin) — a live signal it can discover and ferment agri-relevant molecules and a natural surface for co-developing climate-adapted microbial biocontrols. Could be both an ingredient supplier and a custom-fermentation partner. Secondary overlap with the Coolvex topical line via ectoine (barrier support), squalane (emollient carrier) and ergothioneine (antioxidant). Recent overseas JV activity signals export/MENA appetite — an opening to be an early GCC partner.",
    visitObjective:
      "Meet to confirm whether they accept external pilot / CDMO fermentation and co-development for an agri-biocontrol strain or active, assess the working-volume ladder and grades, and explore supply of catalogue actives (agri actives; secondarily cosmetic-grade ectoine/squalane/ergothioneine for Coolvex); position Pure Advance as a potential first GCC/MENA co-development partner.",
    route:
      "Warm intro via SIAT / iSynBio (the founder holds a dual SIAT/iSynBio role) or InnoX is the strongest channel; otherwise direct outreach to the marketing channel for a Guangming site meeting. Tie into the national-center cluster day.",
    priority: "must_contact",
    confidence: "high",
    talkingPoints: [
      "Do you accept external pilot-scale fermentation / CDMO projects?",
      "What working volumes (5 L → 1000 L+) and chassis do you support?",
      "Can you supply cosmetic/pharma-grade ectoine, squalane or ergothioneine with COA + INCI/CAS, exportable to the GCC?",
      "Would you co-develop a topical bioactive, and what is the IP model?",
      "Ask for the BD / process-development lead (not just sales); ask about specs for the agri actives (decoyinine, jasmonates).",
      "Bring: Pure Advance one-pager; target ingredient + volume brief; NDA template."
    ],
    openQuestions: [
      "Whether they accept EXTERNAL pilot fermentation / CDMO projects, working volumes (5 L → 1000 L+), and exact pilot reactor sizes.",
      "Quality/regulatory docs for cosmetic-grade actives (COA, INCI/CAS, impurity, heavy metals, microbiology) suitable for sensitive-area use.",
      "Current patent/capacity figures (company-stated, not independently confirmed).",
      "Export capability to KSA/GCC; MOQ; sample availability.",
      "Exact zone/park numbering and nearest metro stop before travel."
    ],
    risks: [
      "Not explicitly advertised as an open third-party CDMO; model reads as own-catalogue + co-development/JV rather than fee-for-service tolling — confirm openness.",
      "Pilot reactor volumes and cosmetic/GMP-grade QC documentation unverified.",
      "Capacity/patent figures are company-stated, not independently confirmed.",
      "Appointment-only; Guangming cluster ~35–50 km / ~50–70 min north of Nanshan — combine with a Guangming cluster day."
    ],
    fitScore: 90,
    status: "profiled",
    publicSources: [
      "https://en.synceres.com/",
      "https://en.synceres.com/about.html",
      "https://en.synceres.com/product/1.html"
    ]
  },
  {
    id: "sz-xbiome",
    name: "Xbiome",
    nameLocal: "未知君",
    category: "ai-biotech",
    city: "Shenzhen",
    area: "Tsinghua Information Port, Nanshan District",
    corridor: "Shenzhen",
    website: "https://xbiome.com",
    oneLiner:
      "Shenzhen clinical-stage, AI-driven microbiome drug developer that also does consumer-facing functional probiotics and strain licensing — the most credible China microbiome bridge to a consumer-health brand like Coolvex.",
    whatTheyDo:
      "Combines a self-built AI/bioinformatics platform with gut-microbiome data in a 'data-to-drug' pipeline across all major microbial modalities: formulated bacterial consortia (LBP), engineered microbes, microbial-derived molecules and FMT. Runs 10+ programs, 4 clinical-stage (2 in Phase II) across ulcerative colitis, diabetic foot ulcer, acute GvHD and oncology, plus a separate consumer/functional-probiotic line (XF strains) with consumer-brand partnerships.",
    whyItMatters:
      "Peer benchmark for Pure Advance's lead platform (AI-accelerated microbial-resource discovery + biomanufacturing): a working AI/bioinformatics 'data-to-product' engine over a proprietary strain library, plus a receptive license-in/out BD posture. Its consumer functional-probiotic and strain-licensing side is the most credible China microbiome bridge to a consumer-health line like Coolvex, via licensing or co-research rather than agri. Pure Advance could offer a MENA/GCC commercialization route they do not yet have.",
    visitObjective:
      "Exploratory learning + relationship visit: benchmark the AI-microbiome 'data-to-drug' and strain-licensing model, explore strain/metabolite co-research and a potential MENA/GCC commercialization route; secondary — the consumer functional-probiotic bridge for the Coolvex line. Not a near-term deal.",
    route:
      "Direct BD — submit the official collaboration application and reach the platform / strain-licensing partnerships team; request a meeting at the Nanshan HQ during the Shenzhen leg.",
    priority: "medium",
    confidence: "high",
    talkingPoints: [
      "Is your functional-probiotic / strain-licensing side open to overseas partners?",
      "Could your AI-microbiome platform screen strains/metabolites for skin-barrier or anti-irritation use?",
      "Which programs are furthest along, and where are the partnering openings?",
      "What does early BD with a Saudi founder look like within the visit window?",
      "Bring: Pure Advance one-pager (AI-accelerated microbial biocontrols), a 3-minute intro pitch, and an NDA template."
    ],
    openQuestions: [
      "Current clinical status of the UC Phase 1b program and any 2025–2026 readouts.",
      "Whether any 2024–2026 funding / IPO / new round happened — the key unknown for runway and BD appetite.",
      "Whether a dedicated BD/partnership contact exists beyond the generic inbox.",
      "How much the AI engine actually drives discovery vs. supporting a conventional microbiome pipeline.",
      "Any halal / GCC openness — none found, so likely a net-new conversation."
    ],
    risks: [
      "Center of gravity is regulated human therapeutics, not agri or a fast consumer cycle.",
      "No public GCC / Saudi / halal footprint found.",
      "Scale asymmetry — realistic value is access to strains/platform/know-how, not peer co-development.",
      "Funding momentum uncertain: roughly a 4-year gap since the 2021 Series B, with no fresh capital event surfacing."
    ],
    fitScore: 66,
    status: "profiled",
    publicSources: [
      "https://xbiome.com",
      "https://xbiome.com/pipeline",
      "https://www.businesswire.com/news/home/20220425005026/en/Xbiome-Acquires-Clinical-Stage-Program-Targeting-Ulcerative-Colitis"
    ]
  },
  {
    id: "sz-xtalpi",
    name: "XtalPi",
    nameLocal: "晶泰科技",
    category: "ai-biotech",
    city: "Shenzhen",
    area: "International Biomedical Industrial Park, Futian District",
    corridor: "Shenzhen",
    website: "https://en.xtalpi.com",
    oneLiner:
      "Shenzhen-founded, HK-listed quantum-physics-plus-AI drug discovery platform serving most of global big pharma — the Shenzhen counterpart to Insilico for AI-native discovery, and a strong platform-benchmarking peer.",
    whatTheyDo:
      "Provides AI- and quantum-physics-driven drug and materials R&D: uses quantum algorithms to compute molecular structures, feeds the data into its own AI models, and screens/generates candidate molecules — combining computation with automated ('dry + wet') robotic lab technology. Runs collaboration-based early discovery for pharma and materials clients, and now sells automated labs as installations abroad. HKEX-listed since June 2024.",
    whyItMatters:
      "Maps onto Pure Advance's AI-discovery + biomanufacturing-automation thesis on two pillars: an AI-plus-quantum-physics discovery engine to benchmark, and automated 'scientist-robot' wet-labs relevant to pilot-scale/process interests. It already sells automated-lab + natural-bioactives-database infrastructure into the Gulf (a UAE royal-office deal) and runs a microbial organic-fertilizer collaboration for arid/desert regions across China and the Middle East — a rare operational GCC + microbial-manufacturing overlap. Realistic entry is platform-access / a Saudi counterpart relationship, not peer co-development.",
    visitObjective:
      "Substantive platform-access + GCC conversation: benchmark the quantum-physics-plus-AI and automated-lab platform, explore a Saudi/GCC localization relationship mirroring their UAE automated-lab model, and the microbial-biomanufacturing science overlap; secondary — a materials/formulation adjacency for topical care.",
    route:
      "Direct via the official contact channel to the overseas / Middle-East business line; frame as a platform-access + GCC conversation; visit the Futian HQ during the Shenzhen leg (note it is a cross-city ride from Nanshan).",
    priority: "high",
    confidence: "high",
    talkingPoints: [
      "Do you engage non-pharma / consumer or materials partners relevant to topical-care formulation, or only big-pharma discovery?",
      "Could your materials-science capability support formulation / delivery work for a topical product?",
      "Is a platform-learning / GCC-relationship meeting (not a transaction) appropriate, and is Futian the right visitor location?",
      "Reference the UAE automated-lab and natural-ingredient/halal angle to show fit for a Saudi counterpart relationship.",
      "Bring: Pure Advance one-pager (AI-accelerated microbial biocontrols) and an NDA template."
    ],
    openQuestions: [
      "The right contact route for inbound foreign-founder / GCC enquiries (overseas-ME leads inferred from a single ceremony).",
      "Whether any KSA-specific activity exists — only UAE Gulf activity found so far.",
      "Whether they would engage a company at Pure Advance's scale for platform access vs. only large/sovereign clients.",
      "Confirm Futian is the right visitor site vs. another Shenzhen facility, and cross-city travel time from Nanshan.",
      "Exact magnitude/terms of the headline discovery deals against primary sources."
    ],
    risks: [
      "Large public company doing multi-billion-dollar / sovereign deals — realistic entry is platform-access or relationship, not a near-term transaction.",
      "Scale asymmetry: unclear they would engage a partner at Pure Advance's scale.",
      "Only UAE Gulf activity confirmed; no KSA-specific track record found yet.",
      "Named Middle-East contacts are inferred from one ceremony — routing is uncertain."
    ],
    fitScore: 78,
    status: "profiled",
    publicSources: [
      "https://en.xtalpi.com",
      "https://en.wikipedia.org/wiki/XtalPi",
      "https://www.bioworld.com/articles/723157-xtalpi-finalizes-6b-ai-drug-discovery-deal-with-dovetree"
    ]
  },
  {
    id: "zh-gene-biocon",
    name: "Gene-Biocon",
    nameLocal: "珠海冀百康生物科技有限公司",
    category: "biomanufacturing",
    city: "Zhuhai",
    area: "Xinqing Sci-Tech Industrial Park",
    corridor: "Zhuhai",
    website: "https://www.g-biotec.com",
    oneLiner:
      "A Zhuhai recombinant-protein house that makes recombinant humanized collagen, growth factors, peptides and ferment-lysate actives — and openly offers a CDMO service — making it a one-stop fit for Coolvex's skin-repair ingredient and contract-manufacturing needs.",
    whatTheyDo:
      "A recombinant-protein and fermentation company producing biopharma raw materials (insulin/GLP-1 intermediates, recombinant trypsin and enzymes, recombinant Protein A) plus a deep cosmetic-actives catalogue (Gebiotide brand): recombinant humanized collagen types I/III/XVII, micro-molecule collagen, EGF/bFGF/IGF growth factors, SOD, repair/whitening peptides, oil-soluble PDRN, Bifida ferment lysate and yeast extracts. Explicitly advertises a CDMO Solution and runs a joint lab with Jinan University. National High-tech Enterprise, ISO9001 certified.",
    whyItMatters:
      "Direct lead-platform fit: an openly-offered recombinant-protein / enzyme CDMO — the fermentation-based contract production Pure Advance needs to scale engineered microbial candidates, with demonstrated strain-engineering and downstream depth. Secondary fit for the Coolvex topical line via their skin-repair / barrier bioactives catalogue. One-stop 'supply an active and make it for us' potential through an open, English-friendly BD channel.",
    visitObjective:
      "Scope recombinant-protein / enzyme CDMO and pilot-fermentation capacity for scaling engineered microbial candidates; secondary — co-development of skin-repair bioactives for the Coolvex topical line. Confirm cosmetic-grade pilot terms and MOQs.",
    route:
      "Direct BD — inquiry to the CDMO and cosmetic-actives teams via their English-friendly channel; best as a Zhuhai day-trip. No InnoX / program routing needed.",
    priority: "must_contact",
    confidence: "high",
    talkingPoints: [
      "Are the skin actives (recombinant collagens, EGF/bFGF, SOD, PDRN, ferment lysates) cosmetic/medical-device grade or research-use-only?",
      "Does the CDMO Solution cover small / pilot fermentation runs for an external formulation partner, and what are the MOQs?",
      "Can you co-develop against a defined target-actives list, and confirm cosmetic-grade pilot terms?",
      "KSA/GCC export experience, COA/INCI/CAS documentation, halal status, and GMP certificate scope?",
      "Bring: Pure Advance one-pager (AI-accelerated microbial biocontrols) and an NDA template."
    ],
    openQuestions: [
      "Cosmetic / medical-device grade vs. research-use-only status per product (site footer flags some lines RUO).",
      "CDMO MOQ, and whether small / pilot fermentation runs are available for an external partner.",
      "GMP certificate scope — the claim is self-stated 'international GMP standards', not a cited regulator certificate.",
      "KSA/GCC export track record and halal status.",
      "Plant location vs. the listed office floor."
    ],
    risks: [
      "Largest visible volumes are biopharma APIs, not agri- or cosmetic-grade — confirm cosmetic-grade pilot terms.",
      "Some product lines are flagged 'Research Use Only' on the site — grade must be pinned per product.",
      "GMP claim is self-stated, not a cited regulator certificate.",
      "No specific GCC / Saudi / halal / export-record signal found.",
      "CDMO MOQ and pilot-fermentation volumes for external work are unverified."
    ],
    fitScore: 85,
    status: "profiled",
    publicSources: [
      "https://www.g-biotec.com",
      "https://www.g-biotec.com/customize-solution.html",
      "https://www.g-biotec.com/products/recombinant-humanized-collagen-type-iii.html"
    ]
  },
  {
    id: "zh-vtrbiotech",
    name: "VTR Bio-Tech",
    nameLocal: "广东溢多利生物科技股份有限公司",
    category: "biomanufacturing",
    city: "Zhuhai",
    area: "Nanping Science & Technology Industrial Park",
    corridor: "Zhuhai",
    website: "https://www.vtrbiotech.cn/",
    oneLiner:
      "A 30+ year, publicly-listed Zhuhai industrial-fermentation company — one of China's largest enzyme-preparation makers — running large-scale microbial fermentation and downstream across multiple GBA and national bases. The strongest 'real industrial fermentation plant' lead near the trip.",
    whatTheyDo:
      "Founded 1991, headquartered in Zhuhai and listed on the Shenzhen Stock Exchange (300381). Three core businesses: biological enzyme preparations, bio-synthesised products and plant extracts, built on decades of submerged industrial fermentation for feed, food and industrial enzymes plus specialty bio-products. Manufacturing footprint stated as 'one park, four bases' — the VTR science park plus a Zhuhai Jinwan production base and additional bases in Hunan and Inner Mongolia.",
    whyItMatters:
      "Strongest 'real industrial fermentation plant' lead near the trip: a 30+ year, listed, audited operator with large-scale submerged fermentation and downstream, much of it already serving feed and agriculture — so they understand agri-input manufacturing and channels. Lower counterparty risk than an early-stage synbio startup for scaling biocontrol strains, enzymes and metabolites on Pure Advance's biomanufacturing platform. Topical-care relevance is secondary.",
    visitObjective:
      "Assess external industrial / pilot-scale fermentation (toll / CDMO) capacity for biocontrol strains, enzymes and metabolites; confirm appetite for third-party process scale-up; secondary — bio-synthesised ingredients for topical formulation.",
    route:
      "Direct — identify the BD/sales or IR contact via the company site before travel; combine with a Zhuhai / Jinwan plant visit as a GBA day-trip.",
    priority: "high",
    confidence: "high",
    talkingPoints: [
      "Do you offer external contract / toll fermentation (5 L to 1000 L+) and process development for third-party molecules, or only your own catalogue?",
      "What is your appetite for pilot-scale / industrial fermentation scale-up of biocontrol strains, enzymes and metabolites?",
      "Which products/strains are food/cosmetic grade and exportable to KSA/GCC; what quality/reg docs and MOQs apply?",
      "Is a plant tour of the Jinwan production base possible within the visit window?",
      "Bring: Pure Advance one-pager (AI-accelerated microbial biocontrols)."
    ],
    openQuestions: [
      "Whether they offer external contract / toll fermentation and third-party process development, or only manufacture their own catalogue.",
      "A direct BD / commercial or IR contact channel — none captured publicly.",
      "Which products/strains are food/cosmetic grade and exportable to KSA/GCC; quality/reg docs; MOQ.",
      "Exact Jinwan production-base location and whether a plant tour is possible in the trip window.",
      "Confirm the current base list and capacity figures (company-stated)."
    ],
    risks: [
      "Unconfirmed whether they take external / toll fermentation vs. only manufacturing their own catalogue.",
      "Topical-care relevance is secondary — not the lead reason to meet.",
      "Export grade / KSA-GCC suitability, regulatory documentation and MOQ are unverified.",
      "No public BD / IR contact captured — routing must be found before travel."
    ],
    fitScore: 82,
    status: "researched",
    publicSources: [
      "https://www.vtrbiotech.cn/",
      "https://www.vtrbiotech.cn/about/profile/170",
      "https://www.emis.com/php/company-profile/CN/Guangdong_Vtr_Bio-Tech_Co_Ltd__zh_3868707.html"
    ]
  }
] satisfies BusinessTargetDossier[];
