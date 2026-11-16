/**
 * Photo registry — every image on the site, statically imported so Next.js
 * knows its dimensions and can generate a blur placeholder.
 *
 * All photographs are from Unsplash (https://unsplash.com/license), downloaded
 * and stored locally. Credits are listed on /credits and in CREDITS.md.
 * Generated from the image-sourcing manifest; edit alt text here freely.
 */
import type { Photo } from "@/types";
import aboutCraft from "@/assets/images/about/craft.jpg";
import aboutHero from "@/assets/images/about/hero.jpg";
import aboutPhilosophy from "@/assets/images/about/philosophy.jpg";
import aboutStandards from "@/assets/images/about/standards.jpg";
import aboutStudio from "@/assets/images/about/studio.jpg";
import galCeramic01 from "@/assets/images/gallery/ceramic-01.jpg";
import galCeramic02 from "@/assets/images/gallery/ceramic-02.jpg";
import galCeramic03 from "@/assets/images/gallery/ceramic-03.jpg";
import galCeramic04 from "@/assets/images/gallery/ceramic-04.jpg";
import galCorrection01 from "@/assets/images/gallery/correction-01.jpg";
import galCorrection02 from "@/assets/images/gallery/correction-02.jpg";
import galCorrection03 from "@/assets/images/gallery/correction-03.jpg";
import galExterior01 from "@/assets/images/gallery/exterior-01.jpg";
import galExterior02 from "@/assets/images/gallery/exterior-02.jpg";
import galExterior03 from "@/assets/images/gallery/exterior-03.jpg";
import galExterior04 from "@/assets/images/gallery/exterior-04.jpg";
import galExterior05 from "@/assets/images/gallery/exterior-05.jpg";
import galInterior01 from "@/assets/images/gallery/interior-01.jpg";
import galInterior02 from "@/assets/images/gallery/interior-02.jpg";
import galInterior03 from "@/assets/images/gallery/interior-03.jpg";
import galInterior04 from "@/assets/images/gallery/interior-04.jpg";
import galInterior05 from "@/assets/images/gallery/interior-05.jpg";
import galLuxury01 from "@/assets/images/gallery/luxury-01.jpg";
import galLuxury02 from "@/assets/images/gallery/luxury-02.jpg";
import galLuxury03 from "@/assets/images/gallery/luxury-03.jpg";
import galLuxury04 from "@/assets/images/gallery/luxury-04.jpg";
import galLuxury05 from "@/assets/images/gallery/luxury-05.jpg";
import galLuxury06 from "@/assets/images/gallery/luxury-06.jpg";
import homeBaPaint from "@/assets/images/home/before-after-paint.jpg";
import homeBaWheel from "@/assets/images/home/before-after-wheel.jpg";
import homeCta from "@/assets/images/home/cta.jpg";
import homeHero from "@/assets/images/home/hero.jpg";
import homeIntro from "@/assets/images/home/intro.jpg";
import homeWhy from "@/assets/images/home/why-us.jpg";
import pageContact from "@/assets/images/pages/contact-header.jpg";
import pageGallery from "@/assets/images/pages/gallery-header.jpg";
import pagePricing from "@/assets/images/pages/pricing-header.jpg";
import pageServices from "@/assets/images/pages/services-header.jpg";
import svcCeramic from "@/assets/images/services/ceramic-coating.jpg";
import svcEngine from "@/assets/images/services/engine-bay.jpg";
import svcExterior from "@/assets/images/services/exterior-detailing.jpg";
import svcFull from "@/assets/images/services/full-detailing.jpg";
import svcInterior from "@/assets/images/services/interior-detailing.jpg";
import svcMaintenance from "@/assets/images/services/maintenance-detailing.jpg";
import svcCorrection from "@/assets/images/services/paint-correction.jpg";
import svcPpf from "@/assets/images/services/paint-protection-film.jpg";

export const photos = {
  aboutCraft: {
    src: aboutCraft,
    alt: "Black-gloved hand working a soft detailing brush along the sidewall of a tyre on a gloss-black car",
    credit: { photographer: "Zac Nielson", url: "https://unsplash.com/photos/8k_T1EwTySs" },
  },
  aboutHero: {
    src: aboutHero,
    alt: "Pearl-white luxury crossover head-on in a black studio, its slim LED lights glowing under a single soft spotlight",
    credit: { photographer: "Hyundai Motor Group", url: "https://unsplash.com/photos/the-front-of-a-white-car-in-a-dark-room-r3FdW7wwKqI" },
  },
  aboutPhilosophy: {
    src: aboutPhilosophy,
    alt: "Front corner of a black car in deep shadow, light raking across the bonnet and outlining a slim LED headlight",
    credit: { photographer: "Taras Chernus", url: "https://unsplash.com/photos/3KZB8G9u024" },
  },
  aboutStandards: {
    src: aboutStandards,
    alt: "Close-up of flawless deep-plum car bodywork with crisp, smooth reflections along its curves",
    credit: { photographer: "Quentin Martinez", url: "https://unsplash.com/photos/a-close-up-view-of-a-shiny-surface-V8H-K2032Kc" },
  },
  aboutStudio: {
    src: aboutStudio,
    alt: "Matte black coupe raised on an orange scissor lift in a black-walled detailing bay under a large overhead light panel",
    credit: { photographer: "Winston Tjia", url: "https://unsplash.com/photos/AlJ5WSIy3Bs" },
  },
  galCeramic01: {
    src: galCeramic01,
    alt: "Tight water beads scattered across the glossy black hood of a luxury car, a soft highlight sweeping the paint",
    credit: { photographer: "Kashish Lamba", url: "https://unsplash.com/photos/raindrops-on-dark-car-hood-1lEiwQhgE-w" },
  },
  galCeramic02: {
    src: galCeramic02,
    alt: "Raindrops beading on the glossy black hood and fender of a vintage car, shot in monochrome",
    credit: { photographer: "atelierbyvineeth", url: "https://unsplash.com/photos/_qfANGN7w_4" },
  },
  galCeramic03: {
    src: galCeramic03,
    alt: "Dense water beads covering dark blue-black paint around a Porsche crest on the hood",
    credit: { photographer: "Marcel Strauß", url: "https://unsplash.com/photos/sDLL-r_507M" },
  },
  galCeramic04: {
    src: galCeramic04,
    alt: "Rain beads on the side glass and wet black door of a car, a chrome handle glinting in moody low light",
    credit: { photographer: "mohsen ameri", url: "https://unsplash.com/photos/black-car-door-with-black-handle-H3qqnPognTA" },
  },
  galCorrection01: {
    src: galCorrection01,
    alt: "Gloved detailer working a small yellow-pad polisher over glossy black paint in a dim studio",
    credit: { photographer: "Zac Nielson", url: "https://unsplash.com/photos/wTW51lUpC6k" },
  },
  galCorrection02: {
    src: galCorrection02,
    alt: "Hands running a compact dual-action polisher over the headlight of a black SUV under studio strip lights",
    credit: { photographer: "Vitali Adutskevich", url: "https://unsplash.com/photos/B7hVEFTFUWs" },
  },
  galCorrection03: {
    src: galCorrection03,
    alt: "Red rotary polisher with a white foam pad working glossy black bodywork beside green masking tape",
    credit: { photographer: "Neelabh Raj", url: "https://unsplash.com/photos/cw1914zDHUs" },
  },
  galExterior01: {
    src: galExterior01,
    alt: "Close-up of a classic car's gloss-black fender and door with a chrome fuel cap and mirror-like reflections",
    credit: { photographer: "Anshul Gurjar", url: "https://unsplash.com/photos/8ZW-P92HnnE" },
  },
  galExterior02: {
    src: galExterior02,
    alt: "Rear quarter of a gloss-black Porsche 911 in a dim garage, red taillight glowing and strip lights tracing its bodylines",
    credit: { photographer: "Markus Spiske", url: "https://unsplash.com/photos/YyeeT42dZ48" },
  },
  galExterior03: {
    src: galExterior03,
    alt: "Freshly washed dark grey car door with water droplets beading on the paint around a chrome-trimmed handle",
    credit: { photographer: "Tuomas Nylund", url: "https://unsplash.com/photos/fi9zsbf3f5Y" },
  },
  galExterior04: {
    src: galExterior04,
    alt: "Black-and-white close-up of polished gloss-black five-spoke alloy wheels with machined silver faces",
    credit: { photographer: "José Pinto", url: "https://unsplash.com/photos/_tXpT0WORrQ" },
  },
  galExterior05: {
    src: galExterior05,
    alt: "Close-up of a chrome projector headlight set in glossy black paint, deep reflections along the hood and fender",
    credit: { photographer: "David Popkov", url: "https://unsplash.com/photos/a-close-up-of-a-car-headlight-on-a-black-car-VuYz3is9tPI" },
  },
  galInterior01: {
    src: galInterior01,
    alt: "Black Mercedes-AMG cabin with diamond-quilted leather driver seat, AMG steering wheel and dark dashboard seen through the open door",
    credit: { photographer: "Ján Vlačuha", url: "https://unsplash.com/photos/U4IaoKF5aj4" },
  },
  galInterior02: {
    src: galInterior02,
    alt: "Overhead view of a dark car cabin with brown leather seats, gear selector and a thin orange ambient light strip on the dash",
    credit: { photographer: "igor constantino", url: "https://unsplash.com/photos/jBL6jiMgwlM" },
  },
  galInterior03: {
    src: galInterior03,
    alt: "Close-up of black perforated diamond-quilted leather with copper contrast stitching and a small AMG badge",
    credit: { photographer: "Viktor Theo", url: "https://unsplash.com/photos/dKeINkusF3s" },
  },
  galInterior04: {
    src: galInterior04,
    alt: "Mercedes steering wheel and round air vents seen through glass, with warm bronze reflections across a dark cabin",
    credit: { photographer: "Biren Patel", url: "https://unsplash.com/photos/-oLIQBdz4eI" },
  },
  galInterior05: {
    src: galInterior05,
    alt: "Close-up of a black leather sport seat bolster with fine contrast stitching in soft low light",
    credit: { photographer: "Marvin Meyer", url: "https://unsplash.com/photos/4Lh-4xE5_Js" },
  },
  galLuxury01: {
    src: galLuxury01,
    alt: "Front three-quarter of a Bentley Flying Spur at night in black and white, chrome grille and large alloy wheel lit",
    credit: { photographer: "Victor Furtuna", url: "https://unsplash.com/photos/0mchrVHAYzg" },
  },
  galLuxury02: {
    src: galLuxury02,
    alt: "Black Audi R8 head-on in a dark underground garage, LED headlights glowing beneath rows of fluorescent ceiling lights",
    credit: { photographer: "Ville Kaisla", url: "https://unsplash.com/photos/HNCSCpWrVJA" },
  },
  galLuxury03: {
    src: galLuxury03,
    alt: "Aston Martin One-77 in black and white, emerging from deep shadow onto a brightly lit white floor",
    credit: { photographer: "Quentin Martinez", url: "https://unsplash.com/photos/Y3jVeRoa_YA" },
  },
  galLuxury04: {
    src: galLuxury04,
    alt: "Widebody carbon Porsche 911 race car on a dark cobblestone street at night, light strip glowing and rear wing in silhouette",
    credit: { photographer: "Pascal Garten", url: "https://unsplash.com/photos/Cu2_c9mWJ4E" },
  },
  galLuxury05: {
    src: galLuxury05,
    alt: "Classic black Mercedes-Benz saloon in a dark garage, warm amber headlights and chrome grille glowing",
    credit: { photographer: "Ömer Haktan Bulut", url: "https://unsplash.com/photos/uStvMWSKLBY" },
  },
  galLuxury06: {
    src: galLuxury06,
    alt: "Front corner of a deep navy Genesis G90 saloon in a dark studio, twin-line LED headlights and diamond grille lit",
    credit: { photographer: "Hyundai Motor Group", url: "https://unsplash.com/photos/DX2QCzbax5A" },
  },
  homeBaPaint: {
    src: homeBaPaint,
    alt: "High-gloss dark brown car bonnet with crisp reflections of windows and lights, seen from above against grey carpet",
    credit: { photographer: "atelierbyvineeth", url: "https://unsplash.com/photos/lFDWY0SbTSA" },
  },
  homeBaWheel: {
    src: homeBaWheel,
    alt: "Gleaming gold mesh-spoke alloy wheel with a polished chrome lip and fitted tyre, lit against a black background",
    credit: { photographer: "Giorgio Trovato", url: "https://unsplash.com/photos/kwDN4hfz4OY" },
  },
  homeCta: {
    src: homeCta,
    alt: "Silhouette of a performance coupe in a black studio, only a thin highlight tracing its roof, bonnet and a faint red tail-light",
    credit: { photographer: "Sunder Muthukumaran", url: "https://unsplash.com/photos/K8ZtyTUCuPI" },
  },
  homeHero: {
    src: homeHero,
    alt: "Black Mercedes CLS coupe in side profile, rim-lit against total darkness, light tracing its roofline and wheels",
    credit: { photographer: "Samuele Errico Piccarini", url: "https://unsplash.com/photos/FMbWFDiVRPs" },
  },
  homeIntro: {
    src: homeIntro,
    alt: "Close-up of a gloss-black BMW's LED headlight and grille, studio reflections rippling across flawless paint on the bonnet",
    credit: { photographer: "Rana Singh", url: "https://unsplash.com/photos/1_g7UKLjKb4" },
  },
  homeWhy: {
    src: homeWhy,
    alt: "Glowing LED headlight and amber fog lamp on a dark glossy car front at night",
    credit: { photographer: "Jack Lucas Smith", url: "https://unsplash.com/photos/close-up-of-a-cars-illuminated-headlights-at-night-l9brPcxp-pM" },
  },
  pageContact: {
    src: pageContact,
    alt: "Classic Mercedes Pagoda and a white Bentley Flying Spur behind the glass doors of a softly lit, dark private showroom at night",
    credit: { photographer: "zero take", url: "https://unsplash.com/photos/t4yzxOtDZgQ" },
  },
  pageGallery: {
    src: pageGallery,
    alt: "Ferrari 488 supercar emerging from darkness, cool light sweeping across its glossy bonnet and windscreen",
    credit: { photographer: "Tuna Ekici", url: "https://unsplash.com/photos/0xySZZ8OK1o" },
  },
  pagePricing: {
    src: pagePricing,
    alt: "Front corner of a champagne-gold Audi with its LED headlight lit, emerging from deep black shadow",
    credit: { photographer: "Jonathan Gallegos", url: "https://unsplash.com/photos/zSJ5DiS9e7o" },
  },
  pageServices: {
    src: pageServices,
    alt: "Two detailers inspecting a matte-black BMW M4 on a lift inside a black detailing bay under a large overhead light panel",
    credit: { photographer: "Winston Tjia", url: "https://unsplash.com/photos/kWGq2tYZPDM" },
  },
  svcCeramic: {
    src: svcCeramic,
    alt: "Close-up of tight water beads on glossy black paint, droplets catching cool highlights",
    credit: { photographer: "Christian Lue", url: "https://unsplash.com/photos/GqSVfquxyoo" },
  },
  svcEngine: {
    src: svcEngine,
    alt: "Clean Mercedes-AMG V8 engine bay in low light, engine cover with AMG lettering and star emblem softly lit",
    credit: { photographer: "Rana Singh", url: "https://unsplash.com/photos/DF261Bhc-dk" },
  },
  svcExterior: {
    src: svcExterior,
    alt: "Dark sedan blanketed in snow foam inside a wash bay, mist and warm amber lights glowing around it",
    credit: { photographer: "Zulfahmi Khani", url: "https://unsplash.com/photos/9iH_6JO7Ufs" },
  },
  svcFull: {
    src: svcFull,
    alt: "Glossy black Land Rover Defender lit by studio lights against a pure black background, paint reflecting the light",
    credit: { photographer: "Rob Wingate", url: "https://unsplash.com/photos/hbQgmSJpJY0" },
  },
  svcInterior: {
    src: svcInterior,
    alt: "Black quilted leather front seat and centre console of a luxury car, seen through the open door in low light",
    credit: { photographer: "Ján Vlačuha", url: "https://unsplash.com/photos/fiX-yj3skKg" },
  },
  svcMaintenance: {
    src: svcMaintenance,
    alt: "Folded grey microfiber towel resting on the gloss black bonnet of a car above a headlight, with soft studio reflections",
    credit: { photographer: "GoGoNano", url: "https://unsplash.com/photos/Df9XCGX9Y2U" },
  },
  svcCorrection: {
    src: svcCorrection,
    alt: "Hands guiding a dual-action polisher with an orange pad across the glossy black bonnet of a car, LED headlight below",
    credit: { photographer: "Vitali Adutskevich", url: "https://unsplash.com/photos/gAm_dPRQqvQ" },
  },
  svcPpf: {
    src: svcPpf,
    alt: "Gloved hands smoothing clear protection film over the glossy dark blue bonnet of a car in a workshop",
    credit: { photographer: "Clarity Coat", url: "https://unsplash.com/photos/rsaYn6mq2qo" },
  },
} as const satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
