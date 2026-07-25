import React, { useEffect, useMemo, useState, useCallback, useRef, memo } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const assets = '/assets/';

// Always start a fresh page load at the top instead of restoring an old
// browser scroll position. In-page navigation still scrolls normally.
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

function gallery(slug) {
  return [`${slug}-1.jpg`, `${slug}-2.jpg`, `${slug}-3.jpg`];
}

const products = [
  {
    slug: 'absorbent-gauze-cloth',
    name: 'Absorbent Gauze Cloth',
    summary: 'Soft, breathable and highly absorbent 100% pure cotton gauze fabric.',
    description:
      'Absorbent Gauze Cloth is a soft, breathable and highly absorbent fabric made from 100% pure cotton yarn. It is specially woven to provide superior absorbency and is extensively used in the production of gauze swabs, surgical dressings and wound care products.',
    sizes: ['90cms to 120cms', '10mtr to 50mtr'],
    features: ['100% pure cotton yarn', 'Superior absorbency', 'Breathable woven fabric', 'Soft contact surface'],
    applications: ['Gauze swabs', 'Surgical dressings', 'Wound care production', 'Hospital supplies'],
    specifications: [
      { label: 'Material', value: '100% Pure Woven Cotton' },
      { label: 'Thread Count', value: '19 x 15 threads/inch² (or BP Type 13 / 17)' },
      { label: 'Standard Widths', value: '90 cm, 100 cm, 120 cm' },
      { label: 'Roll Lengths', value: '10 meters to 100 meters' },
      { label: 'Sterility', value: 'Non-Sterile (Autoclavable)' },
      { label: 'Absorption Rate', value: 'Sinks in less than 10 seconds' },
      { label: 'Packaging', value: 'Individually wrapped rolls in master cardboard cartons' }
    ]
  },
  {
    slug: 'bandage-cloth',
    name: 'Bandage Cloth',
    summary: 'High-quality woven cotton fabric used in medical bandage manufacturing.',
    description:
      'Bandage Cloth is a high-quality woven cotton fabric used in the manufacturing of medical bandages. Made from 100% pure cotton yarn, it is breathable, soft and designed for use around fractures, surgical dressings and wound care support.',
    sizes: ['90cms to 120cms', '10mtr to 50mtr'],
    features: ['High-quality woven cotton', 'Soft and breathable', 'Suitable for repeated wrapping', 'Bulk roll format'],
    applications: ['Medical bandages', 'Fracture support', 'Surgical dressing support', 'General wound care'],
    specifications: [
      { label: 'Material', value: '100% Cotton Woven Fabric' },
      { label: 'Weave Type', value: 'Plain weave with selvage edge support' },
      { label: 'Standard Widths', value: '90 cm, 100 cm, 120 cm' },
      { label: 'Roll Lengths', value: '10 meters to 50 meters' },
      { label: 'Thread Count', value: '17-thread count standard mesh' },
      { label: 'Sterility', value: 'Non-Sterile' },
      { label: 'Packaging', value: 'Protective inner poly sleeve with bulk transport cartons' }
    ]
  },
  {
    slug: 'roller-bandage-paper-packing',
    name: 'Roller Bandage - Paper Packing',
    summary: 'Roller bandage for support, secure dressing and compression.',
    description:
      'Roller bandages are essential medical supplies used to support injuries, secure dressings, reduce swelling and provide light compression. They are made from soft, breathable material and are suitable for quick clinical use.',
    sizes: ['5cm', '7.5cm', '10cm', '15cm', '3mtr to 30mtr'],
    features: ['Paper packing option', 'Easy to wrap', 'Breathable construction', 'Comfortable support'],
    applications: ['Dressing fixation', 'Sprain support', 'Compression wrapping', 'First-aid and hospital use'],
    specifications: [
      { label: 'Material', value: '100% Bleached Cotton Gauze' },
      { label: 'Widths Available', value: '5 cm, 7.5 cm, 10 cm, 15 cm' },
      { label: 'Bandage Length', value: '3 meters, 4 meters, custom up to 30 meters' },
      { label: 'Thread Count', value: '19 x 15 threads/inch²' },
      { label: 'Packing Type', value: 'Individual medical-grade paper wrapping' },
      { label: 'Sterility', value: 'Non-Sterile (Can be steam/ETO sterilized)' },
      { label: 'Features', value: 'Easy wrap, breathable weave, soft compression' }
    ]
  },
  // {
  //   slug: 'individual-roller-bandage',
  //   name: 'Individual Roller Bandage',
  //   summary: 'Individually packed roller bandage for hygienic handling.',
  //   description:
  //     'Individual Roller Bandage is hygienically packed for safer handling. It is used by hospitals, clinics and healthcare providers to secure wound dressing and support injury management.',
  //   sizes: ['5cm', '7.5cm', '10cm', '15cm', '3mtr to 30mtr'],
  //   features: ['Individual packing', 'Clean handling', 'Soft and breathable', 'Easy stock management'],
  //   applications: ['Emergency dressing', 'Ward supply', 'Clinic stock', 'Distributor packing'],
  //   specifications: [
  //     { label: 'Material', value: '100% Absorbent Cotton' },
  //     { label: 'Widths Available', value: '5 cm, 7.5 cm, 10 cm, 15 cm' },
  //     { label: 'Bandage Length', value: '3 meters to 30 meters' },
  //     { label: 'Packing Type', value: 'Individual hygienic polybag wrap' },
  //     { label: 'Sterility', value: 'Non-Sterile' },
  //     { label: 'Use case', value: 'Clinic and ward dressing fixation' }
  //   ]
  // },
  {
    slug: 'gauze-swabs-sterile-non-sterile',
    name: 'Gauze Swabs - Sterile and Non-Sterile',
    summary: 'Swabs for dressing, cleaning and absorption during clinical procedures.',
    description:
      'Sterile Gauze Swab is a medical dressing made from high-quality, absorbent cotton gauze that has been sterilized to eliminate all microorganisms. It is designed for use in clinical settings where wound contact is required, ensuring a safe, infection-free environment.',
    sizes: ['5cm x 5cm x 8ply and 12ply', '7.5cm x 7.5cm x 8ply and 12ply', '10cm x 10cm x 8ply and 12ply'],
    features: ['Sterile and non-sterile options', '100% cotton gauze', 'High absorption', 'Soft wound contact'],
    applications: ['Wound dressing', 'Surgical cleaning', 'Exudate absorption', 'Clinical procedure trays'],
    specifications: [
      { label: 'Material', value: '100% Absorbent Cotton Gauze (USP/BP standards)' },
      { label: 'Sizes Available', value: '5cm x 5cm, 7.5cm x 7.5cm, 10cm x 10cm' },
      { label: 'Ply Options', value: '8-ply, 12-ply, 16-ply' },
      { label: 'Fold Type', value: 'American Fold (inner folded edges to prevent loose threads)' },
      { label: 'Sterility', value: 'ETO Sterile or Non-Sterile options available' },
      { label: 'Sterile Packing', value: 'Peelable paper-film pouches (packages of 2s, 5s, 10s)' },
      { label: 'Non-Sterile Packing', value: '100 pieces per bulk paper wrap' }
    ]
  },
  {
    slug: 'gauze-mopping-pad',
    name: 'Gauze Mopping Pad',
    summary: 'Absorbent surgical dressing to control fluids and maintain a clear field.',
    description:
      'Gauze Mopping Pads are absorbent surgical dressings used primarily during operations to control bleeding, absorb fluids and maintain a clear surgical field. Made from 100% cotton gauze, these pads are designed to be soft, lint-free and highly absorbent.',
    sizes: ['25cm x 25cm x 8ply and 12ply', '30cm x 30cm x 8ply and 12ply', '25cm x 40cm x 8ply'],
    features: ['Sterile and non-sterile options', 'Highly absorbent', 'Soft cotton gauze', 'Surgical field support'],
    applications: ['Operation theatre use', 'Blood and fluid absorption', 'Procedure packs', 'Hospital dressing supply'],
    specifications: [
      { label: 'Material', value: '100% Cotton Gauze (High Density)' },
      { label: 'Sizes Available', value: '25cm x 25cm, 30cm x 30cm, 25cm x 40cm' },
      { label: 'Ply Options', value: '8-ply, 12-ply, 16-ply' },
      { label: 'Safety Feature', value: 'X-ray detectable barium sulphate thread option' },
      { label: 'Design', value: 'Pre-washed, loop attachment for operative handling' },
      { label: 'Sterility', value: 'Sterile (ETO) or Non-Sterile packs' },
      { label: 'Packaging', value: 'Individually wrapped or blister-packed' }
    ]
  },
  {
    slug: 'gauze-dressing-pad',
    name: 'Gauze Dressing Pad - Sterile and Non-Sterile',
    summary: 'Medical dressing pad for wound coverage and exudate management.',
    description:
      'Gauze Dressing Pads are sterile or non-sterile medical dressings made from highly absorbent cotton gauze. They are used to cover and protect wounds while allowing airflow for faster healing. Designed to be soft, breathable and non-adherent, these pads are ideal for managing exudating wounds, post-surgical sites and cuts.',
    sizes: ['10cm x 10cm', '10cm x 15cm', '10cm x 20cm'],
    features: ['Soft wound contact', 'Breathable structure', 'Good exudate management', 'Sterile and non-sterile supply'],
    applications: ['Wound coverage', 'Post-surgical dressing', 'Cuts and abrasions', 'Clinic dressing rooms'],
    specifications: [
      { label: 'Outer Material', value: 'Bleached Absorbent Cotton Gauze wrapper' },
      { label: 'Inner Core', value: 'Highly absorbent surgical cotton wool pad' },
      { label: 'Sizes Available', value: '10cm x 10cm, 10cm x 15cm, 10cm x 20cm' },
      { label: 'Absorbency', value: 'Excellent fluid retention and cushioning' },
      { label: 'Sterility', value: 'ETO Sterile and Non-Sterile available' },
      { label: 'Packaging', value: 'Individually packed in paper/film peel pouch' }
    ]
  },
  {
    slug: 'gamjee-roll',
    name: 'Gamjee Roll',
    summary: 'Thick absorbent surgical dressing roll with cotton wool between gauze layers.',
    description:
      'Gamjee Roll is a soft, thick surgical dressing roll made by layering absorbent cotton wool between layers of gauze. It is stitched or wrapped together to form a cushioned protective roll and is commonly used in hospitals and clinics for wound care, padding and dressing retention.',
    sizes: ['10cm x 1mtr, 2mtr, 3mtr', '15cm x 1mtr, 2mtr, 3mtr'],
    features: ['Cushioned padding', 'High absorbency', 'Protective dressing support', 'Comfortable roll format'],
    applications: ['Wound padding', 'Dressing retention', 'Orthopedic support', 'Post-operative dressing'],
    specifications: [
      { label: 'Composition', value: 'Thick surgical cotton wool rolled between outer gauze layers' },
      { label: 'Widths Available', value: '10 cm, 15 cm' },
      { label: 'Roll Lengths', value: '1 meter, 2 meters, 3 meters' },
      { label: 'Layering Weight', value: '120-150 GSM thick protective layer' },
      { label: 'Sterility', value: 'Non-Sterile (Sterilizable)' },
      { label: 'Primary Use', value: 'Post-operative dressings, protective padding for fractures' },
      { label: 'Packaging', value: 'Roll packed in protective craft paper sleeves' }
    ]
  },
  {
    slug: 'absorbent-cotton-roll',
    name: 'Absorbent Cotton Roll',
    summary: 'Soft, fluffy and highly absorbent 100% pure cotton medical roll.',
    description:
      'Absorbent Cotton Roll, also known as surgical cotton wool, is a soft, fluffy and highly absorbent medical product made from 100% pure cotton fibres. It is widely used in medical, surgical and personal care applications for wound cleaning, dressing, padding and general hygiene.',
    sizes: ['25gm gross - 15gm net', '50gm gross - 40gm net', '100gm gross - 75gm net', '400gm gross - 300gm net', '500gm gross - 400gm net'],
    features: ['100% pure cotton', 'Soft and fluffy', 'High fluid absorption', 'Multiple pack sizes'],
    applications: ['Wound cleaning', 'Dressing padding', 'Hospital hygiene', 'Personal care'],
    specifications: [
      { label: 'Material', value: '100% Pure Bleached Surgical Cotton Wool' },
      { label: 'Weights Available', value: '15g, 40g, 75g, 300g, 400g (Net weights)' },
      { label: 'Absorbency Rate', value: 'Sinks in less than 3 seconds' },
      { label: 'Whiteness', value: 'Superior natural white, chlorine bleached' },
      { label: 'Sterility', value: 'Non-Sterile (Can be sterilized)' },
      { label: 'Packaging', value: 'Individually wrapped in blue craft paper or moisture-proof poly bag' }
    ]
  },
  {
    slug: 'cotton-balls',
    name: 'Cotton Balls',
    summary: 'Soft, round and fluffy cotton balls for medical, cosmetic and personal care.',
    description:
      'Cotton Balls are made from 100% pure absorbent cotton. Designed for gentle use, they are ideal for medical, cosmetic and personal care applications. These balls are soft, fluffy and hygienic, making them suitable for daily professional use.',
    sizes: ['Available on enquiry', 'Bulk and custom packing available'],
    features: ['100% pure absorbent cotton', 'Soft round shape', 'Gentle for skin contact', 'Hygienic packing'],
    applications: ['Medical cleaning', 'Cosmetic use', 'Personal care', 'Clinic and hospital supply'],
    specifications: [
      { label: 'Material', value: '100% Surgical Absorbent Cotton' },
      { label: 'Weight per Ball', value: 'Approx. 0.5 to 1.0 grams per ball' },
      { label: 'Consistency', value: 'Uniform round shape, soft and fluffy' },
      { label: 'Sterility', value: 'Non-Sterile' },
      { label: 'Packaging', value: 'Packets of 100s, 500s or custom count poly packs' }
    ]
  },
  {
    slug: 'patient-gown',
    name: 'Patient Gown',
    summary: 'Non-woven disposable patient gown for hygiene, comfort and protection.',
    description:
      'This non-woven disposable patient gown is designed to provide safe, hygienic and comfortable coverage for patients during medical examination, procedures and hospital stays. Made from premium non-woven polypropylene material, it offers lightweight protection and helps prevent cross-contamination.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL', 'Custom sizing available'],
    features: ['Non-woven polypropylene', 'Single-use hygiene', 'Lightweight and comfortable', 'Cross-contamination control'],
    applications: ['Patient examination', 'Hospital stay', 'Procedures', 'Disposable clinical wear'],
    specifications: [
      { label: 'Material', value: 'Non-woven Spunbond Polypropylene (SS/SMS)' },
      { label: 'Grammage', value: '30 to 45 GSM' },
      { label: 'Sizes Available', value: 'S, M, L, XL, XXL' },
      { label: 'Design', value: 'Back tie closure, round neck, short/long sleeves' },
      { label: 'Usage', value: 'Single-use / Disposable' },
      { label: 'Sterility', value: 'Non-Sterile' },
      { label: 'Packaging', value: 'Individually packed in polybags, 50/100 per carton' }
    ]
  },
  {
    slug: 'surgeon-doctor-gown',
    name: 'Surgeon / Doctor Gown',
    summary: 'Disposable blue non-woven surgical gown for sterile operating theatre use.',
    description:
      'Disposable Surgeon / Doctor Gown is designed to provide full-body protection for healthcare professionals during surgical procedures. Made from premium SMS/spunbond non-woven polypropylene fabric, it offers excellent fluid resistance, breathability and barrier protection in medical environments.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL', 'Custom sizing available'],
    features: ['SS/SMS non-woven polypropylene', 'High fluid barrier protection', 'Comfortable elastic cuffs', 'Single-use sterile packaging'],
    applications: ['Operating theatres', 'Surgical teams', 'Infection control departments', 'Clinical laboratories'],
    specifications: [
      { label: 'Material', value: 'Disposable Non-woven Polypropylene (SS/SMS)' },
      { label: 'Fabric Weight', value: '35 to 50 GSM' },
      { label: 'Color', value: 'Medical Blue' },
      { label: 'Cuff Style', value: 'Soft elasticated knitted cuffs' },
      { label: 'Design Details', value: 'Full back wrap-around with overlap, secure waist ties' },
      { label: 'Sterility', value: 'ETO Sterile option or Non-Sterile available' },
      { label: 'Packaging', value: 'Individually wrapped pouches, 50 gowns per master carton' }
    ]
  },
  {
    slug: 'disposables-bed-sheet-pillow-cover',
    name: 'Disposables - Bed Sheet and Pillow Covers',
    summary: 'Disposable bed sheet and pillow cover supplies for hospital hygiene.',
    description:
      'Disposable bed sheets and pillow covers support clean, safe and hygienic patient care environments. They are useful for hospitals, clinics, procedure rooms and patient handling areas where quick replacement and contamination control are important.',
    sizes: ['Available on enquiry', 'Bulk supply available', 'Custom packing available'],
    features: ['Single-use hygiene', 'Easy replacement', 'Hospital-friendly supply', 'Custom packing support'],
    applications: ['Patient beds', 'Procedure rooms', 'Clinic hygiene', 'Disposable hospital supply'],
    specifications: [
      { label: 'Material', value: 'Spunbond Non-Woven Polypropylene (Hydrophobic)' },
      { label: 'Bed Sheet Size', value: '120 cm x 200 cm (Custom hospital sizing available)' },
      { label: 'Pillow Cover Size', value: '50 cm x 75 cm' },
      { label: 'Fabric Density', value: '25 to 40 GSM' },
      { label: 'Colors Available', value: 'Medical Blue, Forest Green, White' },
      { label: 'Sterility', value: 'Non-Sterile (Single-use)' },
      { label: 'Packaging', value: '10 pieces per inner pack, 100 sheets per master pack' }
    ]
  },
  // {
  //   slug: 'dialysis-kit',
  //   name: 'Dialysis Kit',
  //   summary: 'Dialysis care kit supply for clinical and hospital requirements.',
  //   description:
  //     'Dialysis Kit supply is available for hospitals, dialysis centres and clinical requirements. Product configuration, packing and quantity can be customized based on buyer needs and healthcare usage.',
  //   sizes: ['Available on enquiry', 'Custom kit configuration available'],
  //   features: ['Clinical-use packing', 'Custom configuration', 'Bulk supply support', 'Distributor-friendly'],
  //   applications: ['Dialysis centres', 'Hospitals', 'Clinical care kits', 'Healthcare distribution'],
  //   specifications: [
  //     { label: 'Kit Components', value: 'Prep drape, sterile gloves, gauze swabs, cotton balls, forceps, drape sheet' },
  //     { label: 'Customization', value: 'Available on enquiry as per dialysis centre lists' },
  //     { label: 'Sterility', value: 'Sterile EO (Ethylene Oxide) processed' },
  //     { label: 'Packaging', value: 'Medical-grade peel pouch wrap (blister pack)' },
  //     { label: 'Certification', value: 'Sterility assurance level (SAL) 10⁻⁶' }
  //   ]
  // },
].map((product) => ({
  ...product,
  images: gallery(product.slug),
  image: `${product.slug}-1.jpg`,
}));

const governmentSupplyStates = [
  {
    name: 'Tamil Nadu',
    logo: 'tn.jpg',
  },
  {
    name: 'Kerala',
    logo: 'kerala.png',
  },
  {
    name: 'Karnataka',
    logo: 'karnataka.jpg',
  },
];

/* ========================================
   SVG Icon Components
   ======================================== */
function SearchIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function WhatsAppIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function PhoneIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function ChatIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function ArrowUpIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  );
}

function ArrowLeftIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function GlobeIcon({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

/* ========================================
   Custom Hooks
   ======================================== */
function useScrollPosition(threshold = 300) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > threshold);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return isScrolled;
}

function useIntersectionObserver(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1, ...options }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

/* ========================================
   Image with Skeleton Loader
   ======================================== */
function LazyImage({ src, alt, width, height, className = '', loading = 'lazy', ...props }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`img-skeleton ${loaded ? 'loaded' : ''}`}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        className={className}
        onLoad={() => setLoaded(true)}
        {...props}
      />
    </div>
  );
}

/* ========================================
   Error Boundary
   ======================================== */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ textAlign: 'center', padding: '4rem 2rem', maxWidth: 480, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', marginBottom: '1rem' }}>Something went wrong</h2>
          <p style={{ color: '#5f6368', marginBottom: '1.5rem' }}>
            We are sorry for the inconvenience. Please try refreshing the page.
          </p>
          <button
            className="primary-btn"
            onClick={() => window.location.reload()}
            style={{ cursor: 'pointer' }}
          >
            Refresh page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ========================================
   Routing Helper
   ======================================== */
function getHashRoute() {
  return window.location.hash.replace(/^#\/?/, '');
}

function Preloader({ isFadingOut }) {
  const brandLetters = "BHARATH SURGICAL".split("");

  return (
    <div className={`preloader-overlay ${isFadingOut ? 'fade-out' : ''}`}>
      <div className="preloader-spinner-container">
        <div className="preloader-spinner"></div>
        <div className="preloader-spinner-inner"></div>
        <div className="preloader-logo-pulse">
          <img src={`${assets}logo.jpg`} alt="Bharath Surgical Logo" />
        </div>
      </div>
      <div className="preloader-brand-name">
        <h1 className="preloader-title">
          {brandLetters.map((char, index) => (
            <span
              key={index}
              style={{
                animationDelay: `${index * 0.04}s`,
                marginRight: char === " " ? "8px" : "0"
              }}
            >
              {char}
            </span>
          ))}
        </h1>
        <p className="preloader-subtitle">Dressing Company</p>
      </div>
    </div>
  );
}

/* ========================================
   App Component
   ======================================== */
function App() {
  const [route, setRoute] = useState(getHashRoute());
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const isInitialRoute = useRef(true);
  const phonePrimary = '919443157402';
  const whatsappMessage = encodeURIComponent(
    'Hello Bharath Surgical Dressing Company, I want to enquire about your surgical dressing products.'
  );

  useEffect(() => {
    // Premium loading sequence
    const loadTimer = setTimeout(() => {
      setIsFadingOut(true);
      const exitTimer = setTimeout(() => {
        setIsLoading(false);
        document.body.classList.add('app-ready');
      }, 900); // matches slide-up clip path duration
      return () => clearTimeout(exitTimer);
    }, 1800);

    return () => clearTimeout(loadTimer);
  }, []);

  useEffect(() => {
    const onHashChange = () => setRoute(getHashRoute());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    if (isInitialRoute.current) {
      isInitialRoute.current = false;
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      return;
    }

    if (route.startsWith('product/')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.getElementById(route || 'home');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [route]);

  const selectedProduct = useMemo(() => {
    const slug = route.startsWith('product/') ? route.replace('product/', '') : '';
    return products.find((product) => product.slug === slug);
  }, [route]);

  return (
    <>
      {isLoading && <Preloader isFadingOut={isFadingOut} />}
      <div className="app-content-wrapper">
        {/* Skip to content link for keyboard accessibility */}
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <Header phonePrimary={phonePrimary} whatsappMessage={whatsappMessage} currentRoute={route} />
        {selectedProduct ? (
          <ProductDetail product={selectedProduct} phonePrimary={phonePrimary} />
        ) : (
          <Home phonePrimary={phonePrimary} whatsappMessage={whatsappMessage} />
        )}
        <Footer />
        <WhatsAppFAB phonePrimary={phonePrimary} whatsappMessage={whatsappMessage} />
        <ScrollToTop />
        <ScrollProgress />
      </div>
    </>
  );
}

/* ========================================
   WhatsApp Floating Action Button
   ======================================== */
function WhatsAppFAB({ phonePrimary, whatsappMessage }) {
  return (
    <a
      className="whatsapp-fab"
      href={`https://wa.me/${phonePrimary}?text=${whatsappMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Send WhatsApp enquiry"
    >
      <WhatsAppIcon size={24} />
      <span className="whatsapp-fab-label">Enquire now</span>
    </a>
  );
}

/* ========================================
   Scroll to Top Button
   ======================================== */
function ScrollToTop() {
  const isScrolled = useScrollPosition(400);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <button
      className={`scroll-top-btn ${isScrolled ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
      type="button"
    >
      <ArrowUpIcon />
    </button>
  );
}

/* ========================================
   Scroll Progress Bar
   ======================================== */
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
          setProgress(scrolled);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="scroll-progress"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    />
  );
}

/* ========================================
   Header
   ======================================== */
function Header({ phonePrimary, whatsappMessage, currentRoute }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [currentRoute]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('menu-locked');
    } else {
      document.body.classList.remove('menu-locked');
    }
    return () => document.body.classList.remove('menu-locked');
  }, [menuOpen]);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  return (
    <header className={`site-header${menuOpen ? ' menu-open' : ''}`}>
      <a className="brand" href="#/" aria-label="Bharath Surgical home" onClick={() => setMenuOpen(false)}>
        <img src={`${assets}logo.jpg`} alt="Bharath Surgical logo" width="52" height="52" />
        <span>
          <strong>Bharath Surgical</strong>
          <small>Dressing Company</small>
        </span>
      </a>
      <nav
        id="mobile-navigation"
        className={`primary-nav${menuOpen ? ' open' : ''}`}
        aria-label="Primary navigation"
        onClick={() => setMenuOpen(false)}
      >
        <a href="#/products" className={currentRoute === 'products' ? 'active-nav' : ''} aria-current={currentRoute === 'products' ? 'page' : undefined}>Products</a>
        <a href="#/about" classNamel={currentRoute === 'about' ? 'active-nav' : ''} aria-current={currentRoute === 'about' ? 'page' : undefined}>About</a>
        <a href="#/government" className={currentRoute === 'government' ? 'active-nav' : ''} aria-current={currentRoute === 'government' ? 'page' : undefined}>Government Orders</a>
        <a href="#/quality" className={currentRoute === 'quality' ? 'active-nav' : ''} aria-current={currentRoute === 'quality' ? 'page' : undefined}>Quality</a>
        <a href="#/contact" className={currentRoute === 'contact' ? 'active-nav' : ''} aria-current={currentRoute === 'contact' ? 'page' : undefined}>Contact</a>
      </nav>
      <div className="header-actions">
        <a className="header-cta" href={`https://wa.me/${phonePrimary}?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer">
          Enquire now
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

/* ========================================
   Home Page
   ======================================== */
function Home({ phonePrimary, whatsappMessage }) {
  return (
    <main id="main-content" className="page-enter" key="home">
      <section className="hero section-shell" id="home">
        <div className="hero-copy">
          <h1>Premium Surgical Bandages &amp; Dressings Manufacturer</h1>
          <p className="hero-text">
            ISO-certified surgical dressing materials manufactured in Rajapalayam, India. Trusted
            by hospitals, clinics, and distributors worldwide for quality, reliability, and
            export-grade standards.
          </p>
          <div className="hero-actions">
            <a className="primary-btn" href="#/products">View all products</a>
            <a className="secondary-btn" href="#/contact">Contact sales</a>
          </div>
          <div className="trust-row" aria-label="Company highlights">
            <span>ISO 13485 focused</span>
            <span>MSE registered</span>
            <span>Government supply</span>
            <span>Private labelling</span>
          </div>
        </div>
        <div className="hero-card full-doctor-card">
          <img src={`${assets}hero-doctor-full.jpg`} alt="Doctors in a surgical operation theatre" width="600" height="450" />
          <div className="floating-badge">
            <strong>50+ years</strong>
            <span>Quality care with a human touch</span>
          </div>
        </div>
      </section>

      <AnimatedSection className="section-shell intro-grid" id="about">
        <div className="intro-certifications">
          <CertificationMarks />
        </div>
        <div className="intro-card">
          <h2>Our Mission and Vision</h2>
          <p>
            Bharath Surgical Dressing Company is a trusted manufacturer, supplier and exporter of
            surgical dressings and bandages, dedicated to delivering dependable, high-quality
            products that support safe patient care in healthcare settings worldwide.
          </p>
        </div>
        <div className="intro-card">
          <h2>Quality You Can Trust</h2>
          <p>
            We use carefully selected materials and controlled manufacturing processes to produce
            reliable surgical dressings. Every product is made with close attention to hygiene,
            consistency and compliance for hospitals, clinics and distributors.
          </p>
        </div>
      </AnimatedSection>

      <GovernmentOrdersSection />
      <ProductsSection />
      <QualitySection />
      <FaqSection />
      <Contact phonePrimary={phonePrimary} whatsappMessage={whatsappMessage} />
    </main>
  );
}

/* ========================================
   Animated Section Wrapper
   ======================================== */
function AnimatedSection({ children, className = '', id, ...props }) {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section
      ref={ref}
      className={`animate-on-scroll ${isVisible ? 'visible' : ''} ${className}`}
      id={id}
      {...props}
    >
      {children}
    </section>
  );
}

/* ========================================
   Government Orders Section
   ======================================== */
function GovernmentOrdersSection() {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section ref={ref} className={`government section-shell animate-on-scroll ${isVisible ? 'visible' : ''}`} id="government">
      <div className="section-heading centered">
        <p className="eyebrow">Government supply & Exports</p>
        <h2>Supplying surgical dressing materials to government buyers & global markets.</h2>
        <p>
          Bharath Surgical Dressing Company has supplied surgical dressing products to government
          requirements across these states and has been exporting globally.
        </p>
      </div>

      <div className="government-panel">
        <div className="government-state-grid">
          {governmentSupplyStates.map((state) => (
            <article className="government-state-card" key={state.name}>
              <div className="state-logo">
                <img
                  src={`${assets}${state.logo}`}
                  alt={`${state.name} government supply logo`}
                  loading="lazy"
                  width="92"
                  height="92"
                />
              </div>
              <div>
                <span className="summary-label">Government Supply</span>
                <h3>{state.name}</h3>
              </div>
            </article>
          ))}
        </div>

        {/* Export Banner */}
        <div className="export-banner">
          <div className="export-badge-container">
            <span className="export-badge">Gulf Export Partner</span>
            <div className="export-years-badge">
              <strong>25+</strong>
              <span>Years of trust</span>
            </div>
          </div>
          <div className="export-content">
            <h3>Exporting Premium Surgical Dressings to Gulf Countries</h3>
            <p>
              For over 25 years, we have been a trusted exporter of high-grade surgical dressings,
              gauze fabric, and medical disposables to healthcare partners across the Middle East.
              Our products are packaged to withstand transport and meet international standards.
            </p>
          </div>
          <div className="export-icon-container">
            <GlobeIcon size={40} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductsSection() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [ref, isVisible] = useIntersectionObserver();
  const gridRef = useRef(null);
  const [gridAnimated, setGridAnimated] = useState(false);

  const categories = [
    'All Products',
    'Gauze & Bandage',
    'Surgical Cotton',
    'Hospital Wear & Disposables'
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.summary.toLowerCase().includes(search.toLowerCase());

      if (!matchesSearch) return false;

      if (selectedCategory === 'All Products') return true;
      if (selectedCategory === 'Gauze & Bandage') {
        return [
          'absorbent-gauze-cloth',
          'bandage-cloth',
          'roller-bandage-paper-packing',
          'individual-roller-bandage',
          'gauze-swabs-sterile-non-sterile',
          'gauze-mopping-pad',
          'gauze-dressing-pad',
          'gamjee-roll'
        ].includes(product.slug);
      }
      if (selectedCategory === 'Surgical Cotton') {
        return ['absorbent-cotton-roll', 'cotton-balls'].includes(product.slug);
      }
      if (selectedCategory === 'Hospital Wear & Disposables') {
        return [
          'patient-gown',
          'surgeon-doctor-gown',
          'disposables-bed-sheet-pillow-cover',
          'dialysis-kit'
        ].includes(product.slug);
      }
      return true;
    });
  }, [search, selectedCategory]);

  // Reset category animation state to stagger again when selection changes
  useEffect(() => {
    setGridAnimated(false);
    const animTimeout = setTimeout(() => {
      setGridAnimated(true);
    }, 50);
    return () => clearTimeout(animTimeout);
  }, [selectedCategory, search]);

  // Animate the product grid when it becomes visible
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGridAnimated(true);
          observer.unobserve(grid);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className={`products section-shell animate-on-scroll ${isVisible ? 'visible' : ''}`} id="products">
      <div className="section-heading centered">
        <p className="eyebrow">Our products</p>
        <h2>Complete brochure product range</h2>
        <p>Search below or select a category to view specifications and gallery.</p>

        <div className="search-bar-container" role="search" aria-label="Search products">
          <span className="search-icon"><SearchIcon size={18} /></span>
          <input
            type="text"
            className="google-search-bar"
            placeholder="Search products (e.g. gauze, cotton, bandage, gown...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search products"
          />
          {search && (
            <button className="clear-search-btn" onClick={() => setSearch('')} aria-label="Clear search">×</button>
          )}
        </div>

        <div className="product-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
              type="button"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div ref={gridRef} className={`product-grid ${gridAnimated ? 'animated' : ''}`}>
          {filteredProducts.map((product) => (
            <a className="product-card" href={`#/product/${product.slug}`} key={product.slug}>
              <div className="product-image">
                <LazyImage src={`${assets}${product.image}?v=3`} alt={product.name} width="1000" height="720" />
              </div>
              <div className="product-body">
                <h3>{product.name}</h3>
                <p className="product-card-summary">{product.summary}</p>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="search-empty-state">
          <p>No products found matching "<strong>{search}</strong>" in <strong>{selectedCategory}</strong>.</p>
          <button className="reset-search-btn" onClick={() => { setSearch(''); setSelectedCategory('All Products'); }}>Clear Filters</button>
        </div>
      )}
    </section>
  );
}

/* ========================================
   Quality Section
   ======================================== */
function QualitySection() {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section ref={ref} className={`quality section-shell animate-on-scroll ${isVisible ? 'visible' : ''}`} id="quality">
      <div className="quality-panel">
        <div>
          <p className="eyebrow">Why choose us</p>
          <h2>Built around quality, speed and flexibility.</h2>
        </div>
        <div className="quality-list">
          <div>
            <h3>Uncompromised quality</h3>
            <p>Strict quality control at every stage of production.</p>
          </div>
          <div>
            <h3>Timely delivery</h3>
            <p>Efficient production planning and logistics for urgent healthcare demands.</p>
          </div>
          <div>
            <h3>Custom manufacturing</h3>
            <p>Private labelling and product customization to meet unique client needs.</p>
          </div>
          <div>
            <h3>Global reach</h3>
            <p>Trusted by partners across healthcare and distribution markets.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========================================
   FAQ Section
   ======================================== */
function FaqSection() {
  const [ref, isVisible] = useIntersectionObserver();
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'What products do we manufacture?',
      answer:
        'We manufacture gauze cloth, bandage cloth, roller bandages, gauze swabs, mopping pads, dressing pads, gamjee rolls, absorbent cotton rolls, gowns and related surgical dressing materials.',
    },
    {
      question: 'Do we supply bulk and custom requirements?',
      answer:
        'Yes. Bulk supply, custom sizing, private labelling and packing support are available based on hospital, distributor and tender requirements.',
    },
    {
      question: 'Where are we located?',
      answer:
        'We are located at Chattarapatti, Rajapalayam, Tamil Nadu, a well-known manufacturing cluster for surgical dressing materials.',
    },
    {
      question: 'Do we supply to government requirements?',
      answer:
        'Yes. We have supplied surgical dressing materials for government requirements across Tamil Nadu, Kerala and Karnataka.',
    },
  ];

  return (
    <section ref={ref} className={`faq section-shell animate-on-scroll ${isVisible ? 'visible' : ''}`} id="faq">
      <div className="section-heading centered">
        <p className="eyebrow">Buyer information</p>
        <h2>Common questions from hospitals and distributors</h2>
      </div>
      <div className="faq-grid">
        {faqs.map((item, index) => (
          <article
            className={`faq-card ${activeIndex === index ? 'active' : ''}`}
            key={item.question}
            onClick={() => toggleFaq(index)}
          >
            <div className="faq-header">
              <h3>{item.question}</h3>
              <div className="faq-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </div>
            </div>
            <div className="faq-content">
              <div className="faq-answer-inner">
                <p>{item.answer}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ========================================
   Product Detail Page
   ======================================== */
function ProductDetail({ product, phonePrimary }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const touchStartRef = useRef(null);
  const activeImage = product.images[activeImageIndex] || product.images[0];
  const productMessage = encodeURIComponent(
    `Hello Bharath Surgical Dressing Company, I want to enquire about ${product.name}.`
  );

  useEffect(() => {
    setActiveImageIndex(0);
  }, [product]);

  const showPreviousImage = useCallback(() => {
    setActiveImageIndex((index) => (index === 0 ? product.images.length - 1 : index - 1));
  }, [product.images.length]);

  const showNextImage = useCallback(() => {
    setActiveImageIndex((index) => (index + 1) % product.images.length);
  }, [product.images.length]);

  useEffect(() => {
    if (product.images.length <= 1) return undefined;

    const slideTimer = window.setInterval(showNextImage, 3500);
    return () => window.clearInterval(slideTimer);
  }, [product.images.length, showNextImage]);

  const handleGalleryTouchStart = (event) => {
    const touch = event.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY
    };
  };

  const handleGalleryTouchEnd = (event) => {
    if (!touchStartRef.current) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    if (Math.abs(deltaX) < 45 || Math.abs(deltaX) < Math.abs(deltaY)) return;

    if (deltaX > 0) {
      showPreviousImage();
    } else {
      showNextImage();
    }
  };

  return (
    <main className="detail-page page-enter" id="main-content" key={product.slug}>
      <section className="detail-hero section-shell">
        <div className="detail-copy">
          <a className="back-link" href="#/products"><ArrowLeftIcon /> Back to all products</a>
          <p className="eyebrow">Product detail</p>
          <h1>{product.name}</h1>
          <p className="product-desc-text">{product.description}</p>
          <CertificationMarks />
          <div className="detail-actions">
            <a className="primary-btn whatsapp-action" href={`https://wa.me/${phonePrimary}?text=${productMessage}`} target="_blank" rel="noopener noreferrer">
              <ChatIcon /> WhatsApp enquiry
            </a>
            <a className="secondary-btn call-action" href="tel:+919443157402">
              <PhoneIcon /> Call sales
            </a>
          </div>
        </div>
        <div className="product-gallery">
          <div
            className="detail-image-card"
            onTouchStart={handleGalleryTouchStart}
            onTouchEnd={handleGalleryTouchEnd}
          >
            <img key={activeImage} src={`${assets}${activeImage}?v=3`} alt={product.name} width="1000" height="720" />
            {product.images.length > 1 && (
              <>
                <button
                  className="gallery-nav gallery-nav-prev"
                  type="button"
                  onClick={showPreviousImage}
                  aria-label="Previous product photo"
                >
                  <ArrowLeftIcon />
                </button>
                <button
                  className="gallery-nav gallery-nav-next"
                  type="button"
                  onClick={showNextImage}
                  aria-label="Next product photo"
                >
                  <ArrowLeftIcon />
                </button>
              </>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="gallery-dots" aria-label={`${product.name} photos`}>
              {product.images.map((image, index) => (
              <button
                className={index === activeImageIndex ? 'active' : ''}
                key={image}
                type="button"
                onClick={() => setActiveImageIndex(index)}
                aria-label={`View ${product.name} photo ${index + 1}`}
              />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Available Sizes Section */}
      {product.sizes && product.sizes.length > 0 && (
        <section className="detail-sizes section-shell">
          <div className="section-heading">
            <p className="eyebrow">Available Sizes</p>
            <h2>Size Options</h2>
          </div>
          <div className="sizes-grid">
            {product.sizes.map((size) => (
              <span className="size-chip" key={size}>{size}</span>
            ))}
          </div>
        </section>
      )}

      {/* Specifications Table Section */}
      <section className="detail-specifications section-shell">
        <div className="section-heading">
          <p className="eyebrow">Technical Details</p>
          <h2>Product Specifications</h2>
          <p>Standard manufacturing criteria and parameters. Custom sizes and packaging can be supplied on request.</p>
        </div>
        <div className="spec-table-container">
          <table className="google-spec-table">
            <thead>
              <tr>
                <th>Parameters</th>
                <th>Standard Specifications</th>
              </tr>
            </thead>
            <tbody>
              {product.specifications && product.specifications.map((spec, index) => (
                <tr key={index}>
                  <td className="spec-label-col">{spec.label}</td>
                  <td className="spec-value-col">{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="detail-info section-shell">
        <DetailPanel title="Key features" items={product.features} />
        <DetailPanel title="Common applications" items={product.applications} />
      </section>

      <section className="section-shell related-products">
        <div className="section-heading centered">
          <p className="eyebrow">Continue browsing</p>
          <h2>Other products</h2>
        </div>
        <div className="mini-product-row">
          {products
            .filter((item) => item.slug !== product.slug)
            .slice(0, 4)
            .map((item) => (
              <a href={`#/product/${item.slug}`} key={item.slug} className="mini-product-card">
                <img src={`${assets}${item.image}?v=3`} alt={item.name} loading="lazy" width="200" height="140" />
                <span>{item.name}</span>
              </a>
            ))}
        </div>
      </section>

      <Contact phonePrimary={phonePrimary} compact />
    </main>
  );
}

/* ========================================
   Certification Marks (Memoized)
   ======================================== */
const CertificationMarks = memo(function CertificationMarks() {
  return (
    <div className="certifications" aria-label="Certifications and compliance">
      <h2>Certifications &amp; Compliance</h2>
      <div className="certification-list">
        <div className="certification-mark iso-mark" aria-label="ISO 9001 quality management">
          <span className="certification-logo">ISO</span>
          <strong>9001</strong>
        </div>
        <div className="certification-mark iso-mark" aria-label="ISO 13485 medical devices quality management">
          <span className="certification-logo">ISO</span>
          <strong>13485</strong>
        </div>
        <div className="certification-mark letter-mark" aria-label="CE compliance">
          <span className="certification-logo">CE</span>
          <strong>Compliance</strong>
        </div>
        <div className="certification-mark letter-mark" aria-label="FDA compliance">
          <span className="certification-logo fda-logo">FDA</span>
          <strong>Compliance</strong>
        </div>
      </div>
    </div>
  );
});

/* ========================================
   Detail Panel (Memoized)
   ======================================== */
const DetailPanel = memo(function DetailPanel({ title, items }) {
  return (
    <article className="detail-panel">
      <h2>{title}</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
});

/* ========================================
   Contact Section
   ======================================== */
function Contact({ phonePrimary, whatsappMessage, compact = false }) {
  const [ref, isVisible] = useIntersectionObserver();
  const message =
    whatsappMessage ||
    encodeURIComponent('Hello Bharath Surgical Dressing Company, I want to enquire about your products.');
  const mapQuery = encodeURIComponent(
    'Bharath Surgical Dressing Company, 54/2B, Alangulam Road, Rajapalayam Post, Chattarapatti 626102, Tamil Nadu, India'
  );

  return (
    <section ref={ref} className={`contact section-shell animate-on-scroll ${isVisible ? 'visible' : ''} ${compact ? 'compact-contact' : ''}`} id="contact">
      <div className="contact-card">
        <div className="contact-intro">
          <p className="eyebrow">Get in touch</p>
          <h2>Ready to place an enquiry?</h2>
          <p>
            Share your product requirement, size, quantity and destination. Our team will help with
            product details, packing and bulk supply options.
          </p>
          <div className="contact-map">
            <iframe
              title="Bharath Surgical Dressing Company location map"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
        <div className="contact-details">
          <div className="contact-detail-item">
            <span>+91 94431 57402</span>
            <a href="tel:+919443157402">Call</a>
          </div>
          <div className="contact-detail-item">
            <span>+91 96263 51470</span>
            <a href="tel:+919626351470">Call</a>
          </div>
          <div className="contact-detail-item">
            <span>info@bharathsurgical.in</span>
            <a href="mailto:info@bharathsurgical.in">Mail</a>
          </div>
          <div className="contact-detail-item">
            <span>bharathgauze1968@gmail.com</span>
            <a href="mailto:bharathgauze1968@gmail.com">Mail</a>
          </div>
          <a className="contact-detail-link" href="https://www.bharathsurgical.in" target="_blank" rel="noopener noreferrer">www.bharathsurgical.in</a>
          <address>
            54/2B, Alangulam Road, Rajapalayam Post, Chattarapatti - 626102, Tamil Nadu, India.
          </address>
        </div>
        <a className="primary-btn wide" href={`https://wa.me/${phonePrimary}?text=${message}`} target="_blank" rel="noopener noreferrer">
          WhatsApp enquiry
        </a>
      </div>
    </section>
  );
}

/* ========================================
   Footer (Memoized)
   ======================================== */
const Footer = memo(function Footer() {
  return (
    <footer>
      <span>&copy; Bharath Surgical Dressing Company. All Rights Reserved.</span>
      <span>Website Designed &amp; Developed by Karuppasamy M &amp; Karthickraja S | Contact: +91 93455 83758 | +91 93602 26758</span>
    </footer>
  );
});

/* ========================================
   Render App with Error Boundary
   ======================================== */
createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
