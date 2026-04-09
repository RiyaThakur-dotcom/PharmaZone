// ====================================================================
// PharmaZone — Complete Medicine Database with Salt & Price Intelligence
// ====================================================================

export const MEDICINES_DB = [
  // ─── PAIN RELIEF ───────────────────────────────────────────────────
  {
    id: 1, name: "Dolo 650", genericName: "Paracetamol", salt: "Paracetamol 650mg",
    price: 30, category: "Pain Relief", requiresPrescription: false,
    manufacturer: "Micro Labs", uses: "Fever, Headache, Body Pain",
    sideEffects: "Nausea, Liver damage (overdose)",
    platformPrices: [
      { platformName: "PharmEasy",      price: 28, mrp: 30, isCheapest: false, url: "#" },
      { platformName: "Tata 1mg",       price: 26, mrp: 30, isCheapest: true,  url: "#" },
      { platformName: "Apollo Pharmacy",price: 30, mrp: 30, isCheapest: false, url: "#" },
      { platformName: "Netmeds",        price: 29, mrp: 30, isCheapest: false, url: "#" },
      { platformName: "Blinkit",        price: 31, mrp: 35, isCheapest: false, url: "#" },
    ]
  },
  {
    id: 3, name: "Calpol 500", genericName: "Paracetamol", salt: "Paracetamol 500mg",
    price: 15, category: "Pain Relief", requiresPrescription: false,
    manufacturer: "GSK", uses: "Mild fever, Headache",
    sideEffects: "Allergic reactions (rare)",
    platformPrices: [
      { platformName: "PharmEasy",      price: 14, mrp: 15, isCheapest: true,  url: "#" },
      { platformName: "Tata 1mg",       price: 15, mrp: 15, isCheapest: false, url: "#" },
      { platformName: "Apollo Pharmacy",price: 15, mrp: 15, isCheapest: false, url: "#" },
      { platformName: "Netmeds",        price: 15, mrp: 15, isCheapest: false, url: "#" },
    ]
  },
  {
    id: 5, name: "Combiflam", genericName: "Ibuprofen + Paracetamol", salt: "Ibuprofen 400mg + Paracetamol 325mg",
    price: 34, category: "Pain Relief", requiresPrescription: false,
    manufacturer: "Sanofi India", uses: "Pain, Inflammation, Fever",
    sideEffects: "Stomach upset, Gastric issues",
    platformPrices: [
      { platformName: "PharmEasy",      price: 32, mrp: 34, isCheapest: false, url: "#" },
      { platformName: "Tata 1mg",       price: 30, mrp: 34, isCheapest: true,  url: "#" },
      { platformName: "Apollo Pharmacy",price: 34, mrp: 34, isCheapest: false, url: "#" },
      { platformName: "Netmeds",        price: 33, mrp: 34, isCheapest: false, url: "#" },
      { platformName: "Blinkit",        price: 35, mrp: 38, isCheapest: false, url: "#" },
    ]
  },
  {
    id: 6, name: "Brufen 400", genericName: "Ibuprofen", salt: "Ibuprofen 400mg",
    price: 28, category: "Pain Relief", requiresPrescription: false,
    manufacturer: "Abbott India", uses: "Pain, Arthritis, Fever",
    sideEffects: "Stomach pain, Heartburn, Dizziness",
    platformPrices: [
      { platformName: "PharmEasy",      price: 27, mrp: 28, isCheapest: false, url: "#" },
      { platformName: "Tata 1mg",       price: 25, mrp: 28, isCheapest: true,  url: "#" },
      { platformName: "Apollo Pharmacy",price: 28, mrp: 28, isCheapest: false, url: "#" },
      { platformName: "Netmeds",        price: 26, mrp: 28, isCheapest: false, url: "#" },
    ]
  },
  {
    id: 7, name: "Voveran 50", genericName: "Diclofenac", salt: "Diclofenac 50mg",
    price: 22, category: "Pain Relief", requiresPrescription: true,
    manufacturer: "Novartis India", uses: "Joint pain, Arthritis, Inflammation",
    sideEffects: "Gastric ulcer, Cardiovascular risk",
    platformPrices: [
      { platformName: "PharmEasy",      price: 20, mrp: 22, isCheapest: false, url: "#" },
      { platformName: "Tata 1mg",       price: 19, mrp: 22, isCheapest: true,  url: "#" },
      { platformName: "Apollo Pharmacy",price: 22, mrp: 22, isCheapest: false, url: "#" },
      { platformName: "Netmeds",        price: 21, mrp: 22, isCheapest: false, url: "#" },
    ]
  },
  {
    id: 8, name: "Zerodol SP", genericName: "Aceclofenac + Serratiopeptidase", salt: "Aceclofenac 100mg + Serratiopeptidase 15mg",
    price: 65, category: "Pain Relief", requiresPrescription: true,
    manufacturer: "IPCA Labs", uses: "Post-surgery pain, Swelling, Musculoskeletal pain",
    sideEffects: "Nausea, Gastritis, Diarrhea",
    platformPrices: [
      { platformName: "PharmEasy",      price: 62, mrp: 65, isCheapest: false, url: "#" },
      { platformName: "Tata 1mg",       price: 58, mrp: 65, isCheapest: true,  url: "#" },
      { platformName: "Apollo Pharmacy",price: 65, mrp: 65, isCheapest: false, url: "#" },
      { platformName: "Netmeds",        price: 63, mrp: 65, isCheapest: false, url: "#" },
      { platformName: "Blinkit",        price: 67, mrp: 70, isCheapest: false, url: "#" },
    ]
  },

  // ─── ANTIBIOTICS ────────────────────────────────────────────────────
  {
    id: 2, name: "Augmentin 625 Duo", genericName: "Amoxicillin + Clavulanate", salt: "Amoxicillin 500mg + Clavulanic Acid 125mg",
    price: 201, category: "Antibiotics", requiresPrescription: true,
    manufacturer: "GSK", uses: "Bacterial infections, Sinusitis, Pneumonia",
    sideEffects: "Diarrhea, Skin rash, Nausea",
    platformPrices: [
      { platformName: "PharmEasy",      price: 192, mrp: 201, isCheapest: false, url: "#" },
      { platformName: "Tata 1mg",       price: 185, mrp: 201, isCheapest: true,  url: "#" },
      { platformName: "Apollo Pharmacy",price: 201, mrp: 201, isCheapest: false, url: "#" },
      { platformName: "Netmeds",        price: 198, mrp: 201, isCheapest: false, url: "#" },
      { platformName: "Blinkit",        price: 205, mrp: 220, isCheapest: false, url: "#" },
    ]
  },
  {
    id: 10, name: "Azithral 500", genericName: "Azithromycin", salt: "Azithromycin 500mg",
    price: 110, category: "Antibiotics", requiresPrescription: true,
    manufacturer: "Alembic Pharma", uses: "Chest infections, STIs, Skin infections",
    sideEffects: "Nausea, Abdominal pain, Diarrhea",
    platformPrices: [
      { platformName: "PharmEasy",      price: 105, mrp: 110, isCheapest: false, url: "#" },
      { platformName: "Tata 1mg",       price: 98,  mrp: 110, isCheapest: true,  url: "#" },
      { platformName: "Apollo Pharmacy",price: 110, mrp: 110, isCheapest: false, url: "#" },
      { platformName: "Netmeds",        price: 107, mrp: 110, isCheapest: false, url: "#" },
    ]
  },
  {
    id: 11, name: "Cifran 500", genericName: "Ciprofloxacin", salt: "Ciprofloxacin 500mg",
    price: 85, category: "Antibiotics", requiresPrescription: true,
    manufacturer: "Sun Pharma", uses: "UTI, Respiratory infections, Typhoid",
    sideEffects: "Tendon rupture risk, Nausea, Dizziness",
    platformPrices: [
      { platformName: "PharmEasy",      price: 80, mrp: 85, isCheapest: false, url: "#" },
      { platformName: "Tata 1mg",       price: 76, mrp: 85, isCheapest: true,  url: "#" },
      { platformName: "Apollo Pharmacy",price: 85, mrp: 85, isCheapest: false, url: "#" },
      { platformName: "Netmeds",        price: 82, mrp: 85, isCheapest: false, url: "#" },
    ]
  },

  // ─── CARDIAC CARE ──────────────────────────────────────────────────
  {
    id: 16, name: "Telma 40", genericName: "Telmisartan", salt: "Telmisartan 40mg",
    price: 88, category: "Cardiac Care", requiresPrescription: true,
    manufacturer: "Glenmark", uses: "Hypertension, Heart failure prevention",
    sideEffects: "Dizziness, Low BP, Hyperkalemia",
    platformPrices: [
      { platformName: "PharmEasy",      price: 84, mrp: 88, isCheapest: false, url: "#" },
      { platformName: "Tata 1mg",       price: 80, mrp: 88, isCheapest: true,  url: "#" },
      { platformName: "Apollo Pharmacy",price: 88, mrp: 88, isCheapest: false, url: "#" },
      { platformName: "Netmeds",        price: 86, mrp: 88, isCheapest: false, url: "#" },
      { platformName: "Blinkit",        price: 90, mrp: 95, isCheapest: false, url: "#" },
    ]
  },
  {
    id: 18, name: "Rosuvas 10", genericName: "Rosuvastatin", salt: "Rosuvastatin 10mg",
    price: 133, category: "Cardiac Care", requiresPrescription: true,
    manufacturer: "Sun Pharma", uses: "High cholesterol, Cardiovascular risk reduction",
    sideEffects: "Muscle pain, Liver enzyme elevation",
    platformPrices: [
      { platformName: "PharmEasy",      price: 128, mrp: 133, isCheapest: false, url: "#" },
      { platformName: "Tata 1mg",       price: 118, mrp: 133, isCheapest: true,  url: "#" },
      { platformName: "Apollo Pharmacy",price: 133, mrp: 133, isCheapest: false, url: "#" },
      { platformName: "Netmeds",        price: 130, mrp: 133, isCheapest: false, url: "#" },
    ]
  },
  {
    id: 20, name: "Ecosprin 75", genericName: "Aspirin", salt: "Aspirin 75mg",
    price: 18, category: "Cardiac Care", requiresPrescription: false,
    manufacturer: "USV Pharma", uses: "Blood clot prevention, Heart attack risk",
    sideEffects: "Bleeding risk, Stomach irritation",
    platformPrices: [
      { platformName: "PharmEasy",      price: 16, mrp: 18, isCheapest: false, url: "#" },
      { platformName: "Tata 1mg",       price: 14, mrp: 18, isCheapest: true,  url: "#" },
      { platformName: "Apollo Pharmacy",price: 18, mrp: 18, isCheapest: false, url: "#" },
      { platformName: "Netmeds",        price: 17, mrp: 18, isCheapest: false, url: "#" },
    ]
  },

  // ─── DIABETES ───────────────────────────────────────────────────────
  {
    id: 22, name: "Glycomet 500", genericName: "Metformin", salt: "Metformin 500mg",
    price: 30, category: "Diabetes", requiresPrescription: true,
    manufacturer: "USV Pharma", uses: "Type 2 Diabetes management",
    sideEffects: "Nausea, Diarrhea, Lactic acidosis (rare)",
    platformPrices: [
      { platformName: "PharmEasy",      price: 28, mrp: 30, isCheapest: false, url: "#" },
      { platformName: "Tata 1mg",       price: 25, mrp: 30, isCheapest: true,  url: "#" },
      { platformName: "Apollo Pharmacy",price: 30, mrp: 30, isCheapest: false, url: "#" },
      { platformName: "Netmeds",        price: 29, mrp: 30, isCheapest: false, url: "#" },
    ]
  },
  {
    id: 23, name: "Januvia 100", genericName: "Sitagliptin", salt: "Sitagliptin 100mg",
    price: 2650, category: "Diabetes", requiresPrescription: true,
    manufacturer: "MSD Pharma", uses: "Type 2 Diabetes (add-on therapy)",
    sideEffects: "URI risk, Pancreatitis (rare)",
    platformPrices: [
      { platformName: "PharmEasy",      price: 2540, mrp: 2650, isCheapest: false, url: "#" },
      { platformName: "Tata 1mg",       price: 2490, mrp: 2650, isCheapest: true,  url: "#" },
      { platformName: "Apollo Pharmacy",price: 2650, mrp: 2650, isCheapest: false, url: "#" },
      { platformName: "Netmeds",        price: 2580, mrp: 2650, isCheapest: false, url: "#" },
    ]
  },

  // ─── THYROID ────────────────────────────────────────────────────────
  {
    id: 4, name: "Thyronorm 50mcg", genericName: "Levothyroxine", salt: "Thyroxine Sodium 50mcg",
    price: 150, category: "Thyroid Care", requiresPrescription: true,
    manufacturer: "Abbott India", uses: "Hypothyroidism, Thyroid replacement therapy",
    sideEffects: "Palpitations, Weight loss (overdose), Insomnia",
    platformPrices: [
      { platformName: "PharmEasy",      price: 142, mrp: 150, isCheapest: false, url: "#" },
      { platformName: "Tata 1mg",       price: 135, mrp: 150, isCheapest: true,  url: "#" },
      { platformName: "Apollo Pharmacy",price: 150, mrp: 150, isCheapest: false, url: "#" },
      { platformName: "Netmeds",        price: 145, mrp: 150, isCheapest: false, url: "#" },
    ]
  },

  // ─── SUPPLEMENTS ────────────────────────────────────────────────────
  {
    id: 27, name: "Shelcal 500", genericName: "Calcium + Vitamin D3", salt: "Calcium Carbonate 1250mg + Vitamin D3 250IU",
    price: 145, category: "Supplements", requiresPrescription: false,
    manufacturer: "Elder Pharma", uses: "Calcium deficiency, Osteoporosis prevention",
    sideEffects: "Constipation, Kidney stones (excess)",
    platformPrices: [
      { platformName: "PharmEasy",      price: 138, mrp: 145, isCheapest: false, url: "#" },
      { platformName: "Tata 1mg",       price: 130, mrp: 145, isCheapest: true,  url: "#" },
      { platformName: "Apollo Pharmacy",price: 145, mrp: 145, isCheapest: false, url: "#" },
      { platformName: "Netmeds",        price: 140, mrp: 145, isCheapest: false, url: "#" },
    ]
  },
  {
    id: 30, name: "Uprise D3 60K", genericName: "Vitamin D3", salt: "Cholecalciferol 60000 IU",
    price: 185, category: "Supplements", requiresPrescription: false,
    manufacturer: "Zuventus", uses: "Vitamin D deficiency, Bone health",
    sideEffects: "Hypercalcemia (excess)",
    platformPrices: [
      { platformName: "PharmEasy",      price: 175, mrp: 185, isCheapest: false, url: "#" },
      { platformName: "Tata 1mg",       price: 162, mrp: 185, isCheapest: true,  url: "#" },
      { platformName: "Apollo Pharmacy",price: 185, mrp: 185, isCheapest: false, url: "#" },
      { platformName: "Netmeds",        price: 178, mrp: 185, isCheapest: false, url: "#" },
    ]
  },

  // ─── GASTRO ─────────────────────────────────────────────────────────
  {
    id: 32, name: "Pantop 40", genericName: "Pantoprazole", salt: "Pantoprazole 40mg",
    price: 45, category: "Gastro", requiresPrescription: false,
    manufacturer: "Aristo Pharma", uses: "Acid reflux, GERD, Peptic ulcer",
    sideEffects: "Headache, Diarrhea, Hypomagnesemia (long-term)",
    platformPrices: [
      { platformName: "PharmEasy",      price: 42, mrp: 45, isCheapest: false, url: "#" },
      { platformName: "Tata 1mg",       price: 38, mrp: 45, isCheapest: true,  url: "#" },
      { platformName: "Apollo Pharmacy",price: 45, mrp: 45, isCheapest: false, url: "#" },
      { platformName: "Netmeds",        price: 43, mrp: 45, isCheapest: false, url: "#" },
    ]
  },
  {
    id: 33, name: "Omez 20", genericName: "Omeprazole", salt: "Omeprazole 20mg",
    price: 42, category: "Gastro", requiresPrescription: false,
    manufacturer: "Dr Reddys", uses: "Acidity, GERD, H. Pylori (with antibiotics)",
    sideEffects: "Headache, Nausea, Vitamin B12 deficiency",
    platformPrices: [
      { platformName: "PharmEasy",      price: 40, mrp: 42, isCheapest: false, url: "#" },
      { platformName: "Tata 1mg",       price: 36, mrp: 42, isCheapest: true,  url: "#" },
      { platformName: "Apollo Pharmacy",price: 42, mrp: 42, isCheapest: false, url: "#" },
      { platformName: "Netmeds",        price: 41, mrp: 42, isCheapest: false, url: "#" },
    ]
  },

  // ─── ALLERGY ────────────────────────────────────────────────────────
  {
    id: 37, name: "Allegra 120", genericName: "Fexofenadine", salt: "Fexofenadine 120mg",
    price: 175, category: "Allergy", requiresPrescription: false,
    manufacturer: "Sanofi India", uses: "Allergic rhinitis, Urticaria, Hay fever",
    sideEffects: "Headache, Nausea (rare)",
    platformPrices: [
      { platformName: "PharmEasy",      price: 168, mrp: 175, isCheapest: false, url: "#" },
      { platformName: "Tata 1mg",       price: 155, mrp: 175, isCheapest: true,  url: "#" },
      { platformName: "Apollo Pharmacy",price: 175, mrp: 175, isCheapest: false, url: "#" },
      { platformName: "Netmeds",        price: 170, mrp: 175, isCheapest: false, url: "#" },
    ]
  },
  {
    id: 38, name: "Cetirizine 10mg", genericName: "Cetirizine", salt: "Cetirizine Hydrochloride 10mg",
    price: 22, category: "Allergy", requiresPrescription: false,
    manufacturer: "Various", uses: "Allergic rhinitis, Itching, Urticaria",
    sideEffects: "Drowsiness, Dry mouth",
    platformPrices: [
      { platformName: "PharmEasy",      price: 20, mrp: 22, isCheapest: false, url: "#" },
      { platformName: "Tata 1mg",       price: 18, mrp: 22, isCheapest: true,  url: "#" },
      { platformName: "Apollo Pharmacy",price: 22, mrp: 22, isCheapest: false, url: "#" },
      { platformName: "Netmeds",        price: 21, mrp: 22, isCheapest: false, url: "#" },
    ]
  },

  // ─── MENTAL HEALTH ──────────────────────────────────────────────────
  {
    id: 46, name: "Nexito Plus", genericName: "Escitalopram + Clonazepam", salt: "Escitalopram 10mg + Clonazepam 0.5mg",
    price: 145, category: "Mental Health", requiresPrescription: true,
    manufacturer: "Sun Pharma", uses: "Depression, Anxiety disorders, Panic attacks",
    sideEffects: "Drowsiness, Sexual dysfunction, Withdrawal effects",
    platformPrices: [
      { platformName: "PharmEasy",      price: 138, mrp: 145, isCheapest: false, url: "#" },
      { platformName: "Tata 1mg",       price: 128, mrp: 145, isCheapest: true,  url: "#" },
      { platformName: "Apollo Pharmacy",price: 145, mrp: 145, isCheapest: false, url: "#" },
      { platformName: "Netmeds",        price: 140, mrp: 145, isCheapest: false, url: "#" },
    ]
  },

  // ─── DERMATOLOGY ────────────────────────────────────────────────────
  {
    id: 42, name: "Betnovate C", genericName: "Betamethasone + Clioquinol", salt: "Betamethasone 0.1% + Clioquinol 3%",
    price: 88, category: "Dermatology", requiresPrescription: true,
    manufacturer: "GSK", uses: "Skin infections, Eczema, Dermatitis",
    sideEffects: "Skin thinning, Stretch marks (prolonged use)",
    platformPrices: [
      { platformName: "PharmEasy",      price: 84, mrp: 88, isCheapest: false, url: "#" },
      { platformName: "Tata 1mg",       price: 79, mrp: 88, isCheapest: true,  url: "#" },
      { platformName: "Apollo Pharmacy",price: 88, mrp: 88, isCheapest: false, url: "#" },
      { platformName: "Netmeds",        price: 85, mrp: 88, isCheapest: false, url: "#" },
    ]
  },
];

// =====================================================================
// AI-Powered Intelligence Engine
// =====================================================================

/**
 * Find the cheapest platform for a given medicine
 */
export const getCheapestPlatform = (medicine) => {
  if (!medicine.platformPrices || medicine.platformPrices.length === 0) return null;
  return medicine.platformPrices.reduce((min, p) => p.price < min.price ? p : min);
};

/**
 * Find generic substitutes by matching active salt/ingredient
 * Smart AI-like matching: exact salt > generic name > category
 */
export const findSubstitutes = (medicine) => {
  const mainSalt = medicine.salt?.split('+')[0]?.trim().toLowerCase() || '';
  const mainGeneric = medicine.genericName?.split('+')[0]?.trim().toLowerCase() || '';

  return MEDICINES_DB
    .filter(m => {
      if (m.id === medicine.id) return false;
      // Tier 1: Same primary salt
      const mSalt = m.salt?.split('+')[0]?.trim().toLowerCase() || '';
      const mGeneric = m.genericName?.split('+')[0]?.trim().toLowerCase() || '';
      return (
        mSalt.includes(mainSalt) ||
        mainSalt.includes(mSalt) ||
        mGeneric.includes(mainGeneric) ||
        mainGeneric.includes(mGeneric)
      );
    })
    .map(m => {
      const cheapest = getCheapestPlatform(m);
      const savings = medicine.price > m.price
        ? Math.round(((medicine.price - m.price) / medicine.price) * 100)
        : 0;
      return { ...m, cheapestPrice: cheapest?.price || m.price, cheapestPlatform: cheapest?.platformName, savings };
    })
    .sort((a, b) => a.cheapestPrice - b.cheapestPrice); // Cheapest first
};

/**
 * Get platform prices sorted cheapest first
 */
export const getSortedPlatformPrices = (medicine) => {
  if (!medicine?.platformPrices) return [];
  return [...medicine.platformPrices].sort((a, b) => a.price - b.price);
};

/**
 * Search medicines by name, genericName or salt
 */
export const searchMedicines = (query) => {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return MEDICINES_DB.filter(m =>
    m.name.toLowerCase().includes(q) ||
    m.genericName?.toLowerCase().includes(q) ||
    m.salt?.toLowerCase().includes(q) ||
    m.category?.toLowerCase().includes(q) ||
    m.uses?.toLowerCase().includes(q)
  );
};

/**
 * Get medicine by ID
 */
export const getMedicineById = (id) => {
  return MEDICINES_DB.find(m => m.id === parseInt(id));
};
