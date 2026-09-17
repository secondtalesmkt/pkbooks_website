(function () {
    const storageKey = "pkBooksAdminProducts";

    function rupee(value) {
        const number = Number(value || 0);
        return "₹" + number.toLocaleString("en-IN", { maximumFractionDigits: 0 });
    }

    function slug(value) {
        return String(value || "")
            .trim()
            .toUpperCase()
            .replace(/[^A-Z0-9]+/g, "-")
            .replace(/^-|-$/g, "");
    }

    // Authoritative Real Catalog containing all 54 items across Books, Stationery, and Print Store
    const REAL_CATALOG = [
    {
        "id": "bio-wings-of-fire",
        "name": "Wings of Fire: An Autobiography",
        "sku": "PKB-BIO-WOF",
        "price": 395,
        "salePrice": 315,
        "quantity": 65,
        "sale": 263,
        "stock": "In Stock",
        "date": "2026-02-01",
        "publisher": "Dr. A.P.J. Abdul Kalam",
        "shopType": "books",
        "category": "Biographies & Memoirs",
        "tags": "Biographies & Memoirs, English / Malayalam, Inspirational",
        "description": "The inspiring story of former Indian President Dr. Kalam, from Rameswaram to ISRO.",
        "image": "/images/collection-biography.jpg"
    },
    {
        "id": "bio-steve-jobs",
        "name": "Steve Jobs: The Exclusive Biography",
        "sku": "PKB-BIO-SJOB",
        "price": 899,
        "salePrice": 699,
        "quantity": 38,
        "sale": 191,
        "stock": "In Stock",
        "date": "2026-02-01",
        "publisher": "Walter Isaacson",
        "shopType": "books",
        "category": "Biographies & Memoirs",
        "tags": "Biographies & Memoirs, English, Technology",
        "description": "Based on more than forty interviews with Jobs conducted over two years.",
        "image": "/images/collection-biography.jpg"
    },
    {
        "id": "bio-ente-katha",
        "name": "Ente Katha (My Story)",
        "sku": "PKB-BIO-ENTE",
        "price": 280,
        "salePrice": 235,
        "quantity": 52,
        "sale": 143,
        "stock": "In Stock",
        "date": "2026-02-01",
        "publisher": "Kamala Surayya (Madhavikutty)",
        "shopType": "books",
        "category": "Biographies & Memoirs",
        "tags": "Biographies & Memoirs, Malayalam, Malayalam Memoir",
        "description": "One of the most celebrated and courageous autobiographies in modern Indian literature.",
        "image": "/images/collection-biography.jpg"
    },
    {
        "id": "bio-surrounded-by-idiots",
        "name": "Surrounded by Idiots",
        "sku": "PKB-BIO-SBI",
        "price": 599,
        "salePrice": 475,
        "quantity": 45,
        "sale": 199,
        "stock": "In Stock",
        "date": "2026-02-01",
        "publisher": "Thomas Erikson",
        "shopType": "books",
        "category": "Biographies & Memoirs",
        "tags": "Biographies & Memoirs, English, Human Psychology",
        "description": "The four types of human behavior and how to effectively communicate with each.",
        "image": "/images/collection-biography.jpg"
    },
    {
        "id": "bio-david-chang",
        "name": "Eat a Peach: A Memoir",
        "sku": "PKB-BIO-EAP",
        "price": 750,
        "salePrice": 589,
        "quantity": 26,
        "sale": 109,
        "stock": "In Stock",
        "date": "2026-02-01",
        "publisher": "David Chang & Gabe Ulla",
        "shopType": "books",
        "category": "Biographies & Memoirs",
        "tags": "Biographies & Memoirs, English, Culinary & Life",
        "description": "An unflinching, candid memoir about culinary genius, mental health, and relentless grit.",
        "image": "/images/collection-biography.jpg"
    },
    {
        "id": "ch-crazy-plant-lady",
        "name": "Crazy Plant Lady & Nature Tales",
        "sku": "PKB-CH-CPL",
        "price": 380,
        "salePrice": 295,
        "quantity": 60,
        "sale": 161,
        "stock": "In Stock",
        "date": "2026-02-01",
        "publisher": "Isabel Serna",
        "shopType": "books",
        "category": "Children's Books",
        "tags": "Children's Books, English, Nature & Fun",
        "description": "Charming illustrated storybook celebrating plants, green habitats, and curiosity for young readers.",
        "image": "/images/collection-children.jpg"
    },
    {
        "id": "ch-over-woodward",
        "name": "Over the Woodward Wall",
        "sku": "PKB-CH-OWW",
        "price": 499,
        "salePrice": 399,
        "quantity": 42,
        "sale": 117,
        "stock": "In Stock",
        "date": "2026-02-01",
        "publisher": "A. Deborah Baker",
        "shopType": "books",
        "category": "Children's Books",
        "tags": "Children's Books, English, Fantasy Fiction",
        "description": "An enchanted fairy-tale quest of two young travelers venturing into a mystical forest world.",
        "image": "/images/collection-children.jpg"
    },
    {
        "id": "ch-panchatantra",
        "name": "Illustrated Panchatantra Treasury",
        "sku": "PKB-CH-PAN",
        "price": 350,
        "salePrice": 260,
        "quantity": 95,
        "sale": 235,
        "stock": "In Stock",
        "date": "2026-02-01",
        "publisher": "Vishnu Sharma / Amar Chitra Katha",
        "shopType": "books",
        "category": "Children's Books",
        "tags": "Children's Books, English / Malayalam, Moral Tales",
        "description": "Timeless moral fables of wit, wisdom, friendship, and animal adventures in full color.",
        "image": "/images/collection-children.jpg"
    },
    {
        "id": "ch-little-prince",
        "name": "The Little Prince (Illustrated Edition)",
        "sku": "PKB-CH-TLP",
        "price": 320,
        "salePrice": 245,
        "quantity": 70,
        "sale": 295,
        "stock": "In Stock",
        "date": "2026-02-01",
        "publisher": "Antoine de Saint-Exupéry",
        "shopType": "books",
        "category": "Children's Books",
        "tags": "Children's Books, English, Philosophical Tale",
        "description": "A poetic tale of a young prince who visits various planets in space, addressing themes of loneliness and love.",
        "image": "/images/collection-children.jpg"
    },
    {
        "id": "ch-malgudi-days",
        "name": "Malgudi Adventures for Young Readers",
        "sku": "PKB-CH-MALG",
        "price": 299,
        "salePrice": 239,
        "quantity": 58,
        "sale": 151,
        "stock": "In Stock",
        "date": "2026-02-01",
        "publisher": "R.K. Narayan",
        "shopType": "books",
        "category": "Children's Books",
        "tags": "Children's Books, English, Indian Classics",
        "description": "Swami and friends on unforgettable sunny escapades across the quiet South Indian town of Malgudi.",
        "image": "/images/collection-children.jpg"
    },
    {
        "id": "lit-aadu-jeevitham",
        "name": "Aadujeevitham (Goat Days)",
        "sku": "PKB-NOV-AADU",
        "price": 320,
        "salePrice": 275,
        "quantity": 75,
        "sale": 411,
        "stock": "In Stock",
        "date": "2026-02-01",
        "publisher": "Benyamin",
        "shopType": "books",
        "category": "Literature & Fiction",
        "tags": "Literature & Fiction, Malayalam, Malayalam Fiction",
        "description": "Acclaimed Kerala Sahitya Akademi award-winning novel of Najeeb's desert survival.",
        "image": "/images/collection-fiction.jpg"
    },
    {
        "id": "lit-carrie-soto",
        "name": "Carrie Soto Is Back",
        "sku": "PKB-LIT-CSB",
        "price": 599,
        "salePrice": 480,
        "quantity": 35,
        "sale": 187,
        "stock": "In Stock",
        "date": "2026-02-01",
        "publisher": "Taylor Jenkins Reid",
        "shopType": "books",
        "category": "Literature & Fiction",
        "tags": "Literature & Fiction, English, Modern Fiction",
        "description": "An exhilarating novel about the cost of greatness and a legendary tennis star's comeback.",
        "image": "/images/collection-fiction.jpg"
    },
    {
        "id": "lit-house-sky-breath",
        "name": "House of Sky and Breath",
        "sku": "PKB-LIT-HOSB",
        "price": 799,
        "salePrice": 620,
        "quantity": 40,
        "sale": 205,
        "stock": "In Stock",
        "date": "2026-02-01",
        "publisher": "Sarah J. Maas",
        "shopType": "books",
        "category": "Literature & Fiction",
        "tags": "Literature & Fiction, English, Crescent City Saga",
        "description": "The thrilling second installment in the Crescent City series packed with romance and intrigue.",
        "image": "/images/collection-fiction.jpg"
    },
    {
        "id": "lit-each-of-us-desert",
        "name": "Each of Us a Desert",
        "sku": "PKB-LIT-EOUD",
        "price": 650,
        "salePrice": 510,
        "quantity": 32,
        "sale": 123,
        "stock": "In Stock",
        "date": "2026-02-01",
        "publisher": "Mark Oshiro",
        "shopType": "books",
        "category": "Literature & Fiction",
        "tags": "Literature & Fiction, English, Mythic Fantasy",
        "description": "A gorgeous fantasy about finding your truth, enduring grief, and surviving against odds.",
        "image": "/images/collection-fiction.jpg"
    },
    {
        "id": "lit-ring-shout",
        "name": "Ring Shout: Dark Historical Fantasy",
        "sku": "PKB-LIT-RSH",
        "price": 499,
        "salePrice": 395,
        "quantity": 29,
        "sale": 139,
        "stock": "In Stock",
        "date": "2026-02-01",
        "publisher": "P. Djèlí Clark",
        "shopType": "books",
        "category": "Literature & Fiction",
        "tags": "Literature & Fiction, English, Dark Fantasy",
        "description": "Nebula, Locus, and British Fantasy Award-winning dark historical fantasy.",
        "image": "/images/collection-fiction.jpg"
    },
    {
        "id": "psc-rank",
        "name": "Kerala PSC Rank File 2027",
        "sku": "PKB-PSC-2027",
        "price": 640,
        "salePrice": 525,
        "quantity": 92,
        "sale": 475,
        "stock": "In Stock",
        "date": "2026-02-01",
        "publisher": "PK Editorial Board",
        "shopType": "books",
        "category": "Competitive & Academic",
        "tags": "Competitive & Academic, Malayalam, General Knowledge",
        "description": "Latest current affairs, solved previous papers, practice tests & district facts.",
        "image": "/images/collection-academic.jpg"
    },
    {
        "id": "med-anatomy",
        "name": "Essentials of Human Anatomy",
        "sku": "PKB-MED-001",
        "price": 1299,
        "salePrice": 1099,
        "quantity": 34,
        "sale": 183,
        "stock": "In Stock",
        "date": "2026-02-01",
        "publisher": "Dr. K. Menon",
        "shopType": "books",
        "category": "Competitive & Academic",
        "tags": "Competitive & Academic, English, Anatomy",
        "description": "Illustrated MBBS foundation text with exam notes and clinical dissection boxes.",
        "image": "/images/collection-academic.jpg"
    },
    {
        "id": "sslc-science",
        "name": "Class 10 SSLC Master Companion",
        "sku": "PKB-SCH-10MST",
        "price": 480,
        "salePrice": 399,
        "quantity": 140,
        "sale": 327,
        "stock": "In Stock",
        "date": "2026-02-01",
        "publisher": "SCERT Board Experts",
        "shopType": "books",
        "category": "Competitive & Academic",
        "tags": "Competitive & Academic, English / Mal, Science & Maths",
        "description": "Complete A+ revision guide with solved model papers and chapter summary maps.",
        "image": "/images/collection-academic.jpg"
    },
    {
        "id": "eng-mechanics",
        "name": "Engineering Mechanics Workbook",
        "sku": "PKB-ENG-103",
        "price": 780,
        "salePrice": 699,
        "quantity": 45,
        "sale": 99,
        "stock": "In Stock",
        "date": "2026-02-01",
        "publisher": "A. Rahman",
        "shopType": "books",
        "category": "Competitive & Academic",
        "tags": "Competitive & Academic, English, Mechanics",
        "description": "Problem-led workbook and formula handbook for KTU/B.Tech engineering students.",
        "image": "/images/collection-academic.jpg"
    },
    {
        "id": "camlin-geo",
        "name": "Camlin Exam Geometry Box Kit",
        "sku": "PKS-CAM-GEO",
        "price": 240,
        "salePrice": 195,
        "quantity": 180,
        "sale": 211,
        "stock": "In Stock",
        "date": "2026-02-01",
        "publisher": "Kokuyo Camlin",
        "shopType": "books",
        "category": "Stationery Products",
        "tags": "Stationery Products, Universal, Book",
        "description": "Self-centering compass, precision divider, transparent scales & set squares.",
        "image": "/images/category-books.jpg"
    },
    {
        "id": "faber-art",
        "name": "Faber-Castell Artist Colour Set",
        "sku": "PKS-FAB-ART",
        "price": 350,
        "salePrice": 289,
        "quantity": 85,
        "sale": 145,
        "stock": "In Stock",
        "date": "2026-02-01",
        "publisher": "Faber-Castell",
        "shopType": "books",
        "category": "Stationery Products",
        "tags": "Stationery Products, Universal, Book",
        "description": "24 vibrant oil pastels, sketch pens, shading pencils, eraser & sharpener kit.",
        "image": "/images/category-books.jpg"
    },
    {
        "id": "classmate-pack",
        "name": "Classmate Spiral Notebooks (Set of 6)",
        "sku": "PKS-CLS-6NB",
        "price": 490,
        "salePrice": 420,
        "quantity": 110,
        "sale": 359,
        "stock": "In Stock",
        "date": "2026-02-01",
        "publisher": "ITC Classmate",
        "shopType": "books",
        "category": "Stationery Products",
        "tags": "Stationery Products, Universal, Book",
        "description": "240-page ruled spiral notebooks with ultra-white smooth writing paper.",
        "image": "/images/category-books.jpg"
    },
    {
        "id": "hauser-xo",
        "name": "Hauser XO 0.7mm Ball Pen (Pack of 10)",
        "sku": "PK-PEN-HXO10",
        "price": 120,
        "salePrice": 99,
        "quantity": 240,
        "sale": 314,
        "stock": "In Stock",
        "date": "2026-02-15",
        "publisher": "Hauser Germany",
        "shopType": "stationery",
        "category": "Pens & Writing",
        "tags": "Pens & Writing, Hauser Germany, 0.7 mm Swiss precision tip, Comfortable contoured grip, Fade-proof waterproof blue ink, Ideal for long board exam writing",
        "description": "Ultra-low viscosity German ink technology for ultra-smooth skip-free writing and exams.",
        "image": "/images/stationery-pens.jpg"
    },
    {
        "id": "pentel-energel",
        "name": "Pentel EnerGel 0.7mm Quick-Dry Gel Pen",
        "sku": "PK-PEN-PNT07",
        "price": 175,
        "salePrice": 145,
        "quantity": 75,
        "sale": 206,
        "stock": "In Stock",
        "date": "2026-02-15",
        "publisher": "Pentel Japan",
        "shopType": "stationery",
        "category": "Pens & Writing",
        "tags": "Pens & Writing, Pentel Japan, Instant-drying ink formula, Left-hander friendly (no smudges), Metal pocket clip & rubber grip, Refillable cartridge",
        "description": "High performance liquid gel ink that dries super fast without smearing or bleeding through paper.",
        "image": "/images/stationery-pens.jpg"
    },
    {
        "id": "reynolds-trimax",
        "name": "Reynolds Trimax Refillable Liquid Gel Pen",
        "sku": "PK-PEN-TRX",
        "price": 70,
        "salePrice": 55,
        "quantity": 190,
        "sale": 450,
        "stock": "In Stock",
        "date": "2026-02-15",
        "publisher": "Reynolds",
        "shopType": "stationery",
        "category": "Pens & Writing",
        "tags": "Pens & Writing, Reynolds, Maximum writing length, Clear ink level window, Pocket clip with sleek body, Approved for SSLC & CBSE exams",
        "description": "Advanced fluid ink technology with waterproof Japanese tip for crisp handwriting.",
        "image": "/images/stationery-pens.jpg"
    },
    {
        "id": "luxor-highlighter",
        "name": "Luxor Textliter Highlighters (5 Vibrant Shades)",
        "sku": "PK-PEN-HL5",
        "price": 140,
        "salePrice": 110,
        "quantity": 120,
        "sale": 160,
        "stock": "In Stock",
        "date": "2026-02-15",
        "publisher": "Luxor",
        "shopType": "stationery",
        "category": "Pens & Writing",
        "tags": "Pens & Writing, Luxor, Yellow, Green, Pink, Blue, Orange, Chisel tip for broad 5mm & fine 1mm lines, Smear-proof water-based ink, Long cap-off time",
        "description": "Non-toxic chisel tip pastel and fluorescent markers for textbooks, notes, and study guides.",
        "image": "/images/stationery-pens.jpg"
    },
    {
        "id": "parker-vector",
        "name": "Parker Vector Matte Black Fountain Pen",
        "sku": "PK-PEN-PKR",
        "price": 475,
        "salePrice": 395,
        "quantity": 35,
        "sale": 134,
        "stock": "In Stock",
        "date": "2026-02-15",
        "publisher": "Parker",
        "shopType": "stationery",
        "category": "Pens & Writing",
        "tags": "Pens & Writing, Parker, Fine stainless steel nib, Refillable with piston converter or cartridges, Premium matte finish barrel, Gift box packaging included",
        "description": "Iconic stainless steel fine nib with authentic Parker Quink ink converter for luxury signature writing.",
        "image": "/images/stationery-pens.jpg"
    },
    {
        "id": "doms-rotary-sharpener",
        "name": "DOMS Tabletop Rotary Crank Pencil Sharpener",
        "sku": "PK-SHP-DMSROT",
        "price": 240,
        "salePrice": 189,
        "quantity": 55,
        "sale": 218,
        "stock": "In Stock",
        "date": "2026-02-15",
        "publisher": "DOMS",
        "shopType": "stationery",
        "category": "Sharpeners & Erasers",
        "tags": "Sharpeners & Erasers, DOMS, High-grade alloy helical blade, Anti-break lead protector, Desk clamp bracket included, Large transparent dust drawer",
        "description": "Heavy-duty rotary helical steel blade with auto-feed mechanism and large shavings waste tray.",
        "image": "/images/stationery-art.jpg"
    },
    {
        "id": "apsara-sharpener-jar",
        "name": "Apsara Long Point Sharpeners (Pack of 20)",
        "sku": "PK-SHP-APS20",
        "price": 120,
        "salePrice": 95,
        "quantity": 140,
        "sale": 350,
        "stock": "In Stock",
        "date": "2026-02-15",
        "publisher": "Apsara",
        "shopType": "stationery",
        "category": "Sharpeners & Erasers",
        "tags": "Sharpeners & Erasers, Apsara, Anti-rust coated blades, Long-point angle geometry, Pack of 20 in storage jar, Contoured finger grip",
        "description": "Scientifically angled rust-resistant blade creates extra-long sharp points for neat handwriting.",
        "image": "/images/stationery-art.jpg"
    },
    {
        "id": "faber-dustfree-eraser",
        "name": "Faber-Castell Dust-Free Erasers (Pack of 10)",
        "sku": "PK-ERS-FC10",
        "price": 100,
        "salePrice": 80,
        "quantity": 210,
        "sale": 490,
        "stock": "In Stock",
        "date": "2026-02-15",
        "publisher": "Faber-Castell",
        "shopType": "stationery",
        "category": "Sharpeners & Erasers",
        "tags": "Sharpeners & Erasers, Faber-Castell, Phthalate-free formula, Erases clean without paper abrasion, Safe for exam OMR sheets, Pack of 10 large erasers",
        "description": "Clean residue-free erasing where dust rolls together into single strands without tearing exam paper.",
        "image": "/images/stationery-art.jpg"
    },
    {
        "id": "electric-sharpener",
        "name": "Smart Auto Battery-Operated Electric Sharpener",
        "sku": "PK-SHP-ELEC",
        "price": 499,
        "salePrice": 349,
        "quantity": 28,
        "sale": 112,
        "stock": "In Stock",
        "date": "2026-02-15",
        "publisher": "TechGear",
        "shopType": "stationery",
        "category": "Sharpeners & Erasers",
        "tags": "Sharpeners & Erasers, TechGear, Sharpens pencil in 3 seconds, Operates on 2x AA batteries or USB, Replaceable cutter blade core, Auto-stop when lid is open",
        "description": "Instant 3-second motorized sharpening for standard and jumbo pencils with auto-stop safety sensor.",
        "image": "/images/stationery-art.jpg"
    },
    {
        "id": "kids-colouring-jumbo",
        "name": "Jumbo 100-Page Animals & Cartoon Colouring Book",
        "sku": "PK-ART-CLR100",
        "price": 180,
        "salePrice": 135,
        "quantity": 95,
        "sale": 254,
        "stock": "In Stock",
        "date": "2026-02-15",
        "publisher": "PK Creative Press",
        "shopType": "stationery",
        "category": "Colour Books & Art",
        "tags": "Colour Books & Art, PK Creative Press, 100 thick high-opacity pages, Bleed-resistant for crayons & sketch pens, Color reference guides included, A4 landscape oversized format",
        "description": "Thick 120 GSM paper book with big outlines of jungle animals, vehicles, nature, and fairytale scenes.",
        "image": "/images/stationery-art.jpg"
    },
    {
        "id": "mandala-art-book",
        "name": "Mindful Mandala Stress Relief Art Colouring Book",
        "sku": "PK-ART-MNDL",
        "price": 260,
        "salePrice": 199,
        "quantity": 60,
        "sale": 186,
        "stock": "In Stock",
        "date": "2026-02-15",
        "publisher": "Artisan Soul",
        "shopType": "stationery",
        "category": "Colour Books & Art",
        "tags": "Colour Books & Art, Artisan Soul, 60 intricate calming designs, Single-sided print to avoid bleed, Perforated pages for easy framing, Compatible with fine-liners & brush pens",
        "description": "Intricate floral, geometric, and nature mandalas designed for teenagers, students, and adult relaxation.",
        "image": "/images/stationery-art.jpg"
    },
    {
        "id": "faber-art-24",
        "name": "Faber-Castell 24-Shade Oil Pastels & Creative Kit",
        "sku": "PK-ART-FC24",
        "price": 195,
        "salePrice": 160,
        "quantity": 110,
        "sale": 400,
        "stock": "In Stock",
        "date": "2026-02-15",
        "publisher": "Faber-Castell",
        "shopType": "stationery",
        "category": "Colour Books & Art",
        "tags": "Colour Books & Art, Faber-Castell, 24 brilliant rich pigments, Non-toxic & easy color blending, Includes scraping & detail tool, Free shading guide inside",
        "description": "Super-smooth rich pigment pastels with scraping tool and blending sleeve for school art competitions.",
        "image": "/images/stationery-art.jpg"
    },
    {
        "id": "doms-brush-pens",
        "name": "DOMS 14-Shade Metallic & Pastel Brush Pens",
        "sku": "PK-ART-DMS14",
        "price": 220,
        "salePrice": 185,
        "quantity": 80,
        "sale": 270,
        "stock": "In Stock",
        "date": "2026-02-15",
        "publisher": "DOMS",
        "shopType": "stationery",
        "category": "Colour Books & Art",
        "tags": "Colour Books & Art, DOMS, 13 vibrant shades + 1 blender pen, Flexible elastic brush tip, Water-soluble watercolor effect, Odorless water-based ink",
        "description": "Flexible Japanese nylon brush nibs for calligraphy, shading, title lettering, and watercolor art.",
        "image": "/images/stationery-art.jpg"
    },
    {
        "id": "camel-acrylic-set",
        "name": "Camel Artists 12-Shade Acrylic Colour Tube Set",
        "sku": "PK-ART-CML12",
        "price": 290,
        "salePrice": 240,
        "quantity": 45,
        "sale": 158,
        "stock": "In Stock",
        "date": "2026-02-15",
        "publisher": "Kokuyo Camlin",
        "shopType": "stationery",
        "category": "Colour Books & Art",
        "tags": "Colour Books & Art, Kokuyo Camlin, 12x 9ml pigment tubes, High opacity & lightfastness, Water-resistant when dry, Free artist flat brush included",
        "description": "Rich, fast-drying acrylic emulsion paints for canvas, chart paper, terracotta, and school crafts.",
        "image": "/images/stationery-art.jpg"
    },
    {
        "id": "classmate-spiral-6",
        "name": "Classmate Spiral Notebooks 240-Pages (Set of 6)",
        "sku": "PK-BK-CLS6",
        "price": 490,
        "salePrice": 420,
        "quantity": 130,
        "sale": 650,
        "stock": "In Stock",
        "date": "2026-02-15",
        "publisher": "ITC Classmate",
        "shopType": "stationery",
        "category": "Books & Notebooks",
        "tags": "Books & Notebooks, ITC Classmate, Set of 6 long notebooks (240 pages each), Single line ruled with subject divider, Ozone treated bright paper, Tear-resistant glossy cover",
        "description": "Ultra-white smooth writing paper with snag-free twin spiral binding and micro-perforated edges.",
        "image": "/images/stationery-notebooks.jpg"
    },
    {
        "id": "classmate-drawing-book",
        "name": "Classmate Spiral Drawing Book A4 (Set of 2)",
        "sku": "PK-BK-DRW2",
        "price": 160,
        "salePrice": 130,
        "quantity": 90,
        "sale": 198,
        "stock": "In Stock",
        "date": "2026-02-15",
        "publisher": "ITC Classmate",
        "shopType": "stationery",
        "category": "Books & Notebooks",
        "tags": "Books & Notebooks, ITC Classmate, A4 size 40 cartridge sheets each, 140 GSM thick non-bleed paper, Spiral wire bound with hard back, Perforated page edge",
        "description": "Heavyweight cartridge drawing paper for sketching, watercolors, poster paints, and pastels.",
        "image": "/images/stationery-notebooks.jpg"
    },
    {
        "id": "navneet-practical-record",
        "name": "Navneet Science & Physics Practical Record Book",
        "sku": "PK-BK-LAB192",
        "price": 120,
        "salePrice": 95,
        "quantity": 160,
        "sale": 310,
        "stock": "In Stock",
        "date": "2026-02-15",
        "publisher": "Navneet",
        "shopType": "stationery",
        "category": "Books & Notebooks",
        "tags": "Books & Notebooks, Navneet, 192 pages hardcover bound, Pre-printed index & graph pages, Approved for Kerala Higher Secondary Board, Plastic laminated protective cover",
        "description": "Prescribed practical record notebook with one side ruled and one side blank graph/diagram paper.",
        "image": "/images/stationery-notebooks.jpg"
    },
    {
        "id": "sslc-master-guide",
        "name": "SSLC Class 10 All-in-One Master Companion 2027",
        "sku": "PK-BK-SSLC27",
        "price": 480,
        "salePrice": 399,
        "quantity": 115,
        "sale": 420,
        "stock": "In Stock",
        "date": "2026-02-15",
        "publisher": "SCERT / Bright",
        "shopType": "stationery",
        "category": "Books & Notebooks",
        "tags": "Books & Notebooks, SCERT / Bright, Science, Mathematics & Social Science, 10-year previous questions with answers, Quick revision formula pocket guide, Malayalam & English medium notes",
        "description": "Complete A+ revision guide with chapter-wise solved model papers, mind maps, and formula booklets.",
        "image": "/images/collection-academic.jpg"
    },
    {
        "id": "kerala-psc-rankfile",
        "name": "Kerala PSC Rank File Comprehensive 2027",
        "sku": "PK-BK-PSC27",
        "price": 640,
        "salePrice": 525,
        "quantity": 90,
        "sale": 470,
        "stock": "In Stock",
        "date": "2026-02-15",
        "publisher": "PK Editorial Board",
        "shopType": "stationery",
        "category": "Books & Notebooks",
        "tags": "Books & Notebooks, PK Editorial Board, Updated till latest notifications, 15,000+ topic-wise practice MCQs, OMR practice sheets included, Special Kerala facts section",
        "description": "Latest Kerala GK, current affairs, solved exam papers, and district facts for LDC, LGS, and Degree level.",
        "image": "/images/collection-academic.jpg"
    },
    {
        "id": "camlin-exam-geo",
        "name": "Camlin Exam Geometry Box Kit (Self-Centering)",
        "sku": "PK-GEO-CMLX",
        "price": 240,
        "salePrice": 195,
        "quantity": 180,
        "sale": 510,
        "stock": "In Stock",
        "date": "2026-02-15",
        "publisher": "Kokuyo Camlin",
        "shopType": "stationery",
        "category": "Geometry & Math",
        "tags": "Geometry & Math, Kokuyo Camlin, Self-centering compass & divider, Transparent scale with rounded safety edges, Includes 0.5mm mechanical pencil + leads, Rust-proof tin container case",
        "description": "Precision die-cast self-centering compass, divider, anti-parallax transparent scales, and set squares.",
        "image": "/images/stationery-geometry.jpg"
    },
    {
        "id": "casio-fx991cw",
        "name": "Casio FX-991CW ClassWiz Scientific Calculator",
        "sku": "PK-GEO-FX991",
        "price": 1595,
        "salePrice": 1395,
        "quantity": 35,
        "sale": 380,
        "stock": "In Stock",
        "date": "2026-02-15",
        "publisher": "Casio Japan",
        "shopType": "stationery",
        "category": "Geometry & Math",
        "tags": "Geometry & Math, Casio Japan, 540+ scientific math functions, Dual Power (Solar + Battery), 3-Year Casio India Warranty, Approved for Engineering university exams",
        "description": "540+ functions, 4-gradation natural textbook display, QR code visualization for KTU, B.Tech & BSc.",
        "image": "/images/stationery-geometry.jpg"
    },
    {
        "id": "doms-scale-set",
        "name": "DOMS 30cm Flexible Shatter-Proof Clear Rulers (Pack of 5)",
        "sku": "PK-GEO-DMS30",
        "price": 110,
        "salePrice": 85,
        "quantity": 160,
        "sale": 214,
        "stock": "In Stock",
        "date": "2026-02-15",
        "publisher": "DOMS",
        "shopType": "stationery",
        "category": "Geometry & Math",
        "tags": "Geometry & Math, DOMS, 100% bendable shatter-proof acrylic, Both Millimeter & Inch markings, Smooth beveled ink edges, Pack of 5 full 30cm scales",
        "description": "Bendable, un-breakable transparent rulers with laser-etched metric & imperial millimeter markings.",
        "image": "/images/stationery-geometry.jpg"
    },
    {
        "id": "pk-exam-pouch",
        "name": "PK All-in-One Transparent Board Exam Pouch",
        "sku": "PK-KIT-EXM",
        "price": 190,
        "salePrice": 149,
        "quantity": 220,
        "sale": 360,
        "stock": "In Stock",
        "date": "2026-02-15",
        "publisher": "PK Stationery",
        "shopType": "stationery",
        "category": "School Kits & Bundles",
        "tags": "School Kits & Bundles, PK Stationery, 3x Blue Gel Pens + 2x Black Pens, 2x HB Pencils + 15cm Clear Scale, Faber-Castell Dust-Free Eraser + Sharpener, Transparent regulation exam pouch",
        "description": "Curated exam kit in clear regulation zip pouch with all prescribed pens, pencils, eraser, and ruler.",
        "image": "/images/stationery-pens.jpg"
    },
    {
        "id": "pk-public-bundle",
        "name": "PK Public School Class 8 Complete Kit (2026-27)",
        "sku": "PK-KIT-PK8",
        "price": 2750,
        "salePrice": 2380,
        "quantity": 48,
        "sale": 190,
        "stock": "In Stock",
        "date": "2026-02-15",
        "publisher": "PK Curriculum",
        "shopType": "stationery",
        "category": "School Kits & Bundles",
        "tags": "School Kits & Bundles, PK Curriculum, Class 8 Science & Maths Companions, English & Social Studies Readers, 6x Classmate Long Spiral Notebooks, Camlin Exam Geometry Box Kit",
        "description": "Complete prescribed textbook and stationery package for Class 8 including SCERT guides and notebook set.",
        "image": "/images/academic-combo-bundle.jpg"
    },
    {
        "id": "print-a4-bordered-100",
        "name": "Premium A4 Bordered Paper (Pack of 100 Sheets)",
        "sku": "PK-MEESHO-1045270921",
        "price": 249,
        "salePrice": 149,
        "quantity": 120,
        "sale": 471,
        "stock": "In Stock",
        "date": "2026-03-01",
        "publisher": "PK Prints",
        "shopType": "printing",
        "category": "Bordered Paper Sets",
        "tags": "PK Prints, Bordered Paper Sets, Printed Sets, Meesho Best Seller",
        "description": "Single sheets with elegant border design. Perfect for assignment notes, college presentations, project submissions & creative calligraphy.",
        "image": "/images/print-store/bordered-paper.png"
    },
    {
        "id": "print-thank-you-cards-50",
        "name": "Botanical 'Thank You For Your Support' Cards (Pack of 50)",
        "sku": "PK-MEESHO-1054069720",
        "price": 199,
        "salePrice": 129,
        "quantity": 120,
        "sale": 309,
        "stock": "In Stock",
        "date": "2026-03-01",
        "publisher": "PK Prints",
        "shopType": "printing",
        "category": "Customer Note Cards",
        "tags": "PK Prints, Customer Note Cards, Printed Sets, Meesho Best Seller",
        "description": "300 GSM premium matte art cardstock mini parcel insert cards with delicate botanical green leaves & gold heart cursive lettering.",
        "image": "/images/print-store/thank-you-cards.jpg"
    },
    {
        "id": "print-project-assignment-sheets-50",
        "name": "Student Project Work Border Sheets (Pack of 50 Sheets)",
        "sku": "PK-PRN-BORDER-50",
        "price": 160,
        "salePrice": 99,
        "quantity": 120,
        "sale": 240,
        "stock": "In Stock",
        "date": "2026-03-01",
        "publisher": "PK Prints",
        "shopType": "printing",
        "category": "Bordered Paper Sets",
        "tags": "PK Prints, Bordered Paper Sets, Printed Sets, Meesho Best Seller",
        "description": "Pre-printed stylish border sheets for school, CBSE & university degree project submissions. Clean index & margin guides on 80 GSM smooth bond paper.",
        "image": "/images/print-store/bordered-paper.png"
    },
    {
        "id": "print-thank-you-cards-100",
        "name": "Boutique Thank You Parcel Inserts (Pack of 100 Cards)",
        "sku": "PK-PRN-TY-100",
        "price": 349,
        "salePrice": 219,
        "quantity": 120,
        "sale": 375,
        "stock": "In Stock",
        "date": "2026-03-01",
        "publisher": "PK Prints",
        "shopType": "printing",
        "category": "Customer Note Cards",
        "tags": "PK Prints, Customer Note Cards, Printed Sets, Meesho Best Seller",
        "description": "Bulk pack of customer appreciation cards for small businesses, online sellers, and gift hampers. Velvet touch finish with gold highlights.",
        "image": "/images/print-store/thank-you-cards.jpg"
    },
    {
        "id": "print-certificate-gold-25",
        "name": "Gold Foil Border Certificate Parchment Sheets (Pack of 25)",
        "sku": "PK-PRN-CERT-25",
        "price": 299,
        "salePrice": 199,
        "quantity": 120,
        "sale": 186,
        "stock": "In Stock",
        "date": "2026-03-01",
        "publisher": "PK Prints",
        "shopType": "printing",
        "category": "Certificates & Awards",
        "tags": "PK Prints, Certificates & Awards, Printed Sets, Meesho Best Seller",
        "description": "220 GSM thick textured parchment certificate paper with royal gold metallic hot-stamped borders. Laser & inkjet printer compatible.",
        "image": "/images/category-print.jpg"
    },
    {
        "id": "print-invoice-books-2",
        "name": "Duplicate Order Invoice & Bill Book (Pack of 2 Books)",
        "sku": "PK-PRN-INV-2",
        "price": 220,
        "salePrice": 160,
        "quantity": 120,
        "sale": 162,
        "stock": "In Stock",
        "date": "2026-03-01",
        "publisher": "PK Prints",
        "shopType": "printing",
        "category": "Business Stationery",
        "tags": "PK Prints, Business Stationery, Printed Sets, Meesho Best Seller",
        "description": "Pre-printed carbonless duplicate order & cash memo booklets with serial numbering, perforated customer copy, and durable binding.",
        "image": "/images/stationery-notebooks.jpg"
    },
    {
        "id": "print-thesis-gold",
        "name": "Hardcover Thesis Binding with Golden Emboss",
        "sku": "PK-PRN-THESIS",
        "price": 600,
        "salePrice": 450,
        "quantity": 120,
        "sale": 297,
        "stock": "In Stock",
        "date": "2026-03-01",
        "publisher": "PK Prints",
        "shopType": "printing",
        "category": "Thesis & Binding",
        "tags": "PK Prints, Thesis & Binding, Printed Sets, Meesho Best Seller",
        "description": "Calicut University / KTU standard leatherette hardcover with gold/silver foil spine and front cover embossing. Fast 15-minute counter delivery.",
        "image": "/images/category-print.jpg"
    },
    {
        "id": "print-spiral-report",
        "name": "Wire-O Spiral Project Report (A4 Color)",
        "sku": "PK-PRN-SPIRAL",
        "price": 220,
        "salePrice": 180,
        "quantity": 120,
        "sale": 240,
        "stock": "In Stock",
        "date": "2026-03-01",
        "publisher": "PK Prints",
        "shopType": "printing",
        "category": "Thesis & Binding",
        "tags": "PK Prints, Thesis & Binding, Printed Sets, Meesho Best Seller",
        "description": "Heavy duty transparent frosted covers with black twin-loop wire binding and high-contrast digital color output. Up to 250 pages.",
        "image": "/images/category-print.jpg"
    }
];

    // Read products from localStorage and ensure all real items are populated
    function readProducts() {
        try {
            const raw = localStorage.getItem(storageKey);
            if (!raw) {
                localStorage.setItem(storageKey, JSON.stringify(REAL_CATALOG));
                return REAL_CATALOG;
            }
            const parsed = JSON.parse(raw);
            if (!Array.isArray(parsed) || parsed.length === 0) {
                localStorage.setItem(storageKey, JSON.stringify(REAL_CATALOG));
                return REAL_CATALOG;
            }

            // Merge check: ensure real products exist
            const existingIds = new Set(parsed.map(function(p) { return p.id; }));
            let missingFound = false;
            const merged = parsed.slice();

            REAL_CATALOG.forEach(function (item) {
                if (!existingIds.has(item.id)) {
                    merged.push(item);
                    existingIds.add(item.id);
                    missingFound = true;
                }
            });

            if (missingFound) {
                localStorage.setItem(storageKey, JSON.stringify(merged));
            }

            return merged;
        } catch (error) {
            console.error("Error reading admin products:", error);
            return REAL_CATALOG;
        }
    }

    function writeProducts(products) {
        localStorage.setItem(storageKey, JSON.stringify(products));
        window.dispatchEvent(new Event("pk-catalog-updated"));
    }

    // Asynchronously sync with /api/products
    async function syncFromApi() {
        try {
            const res = await fetch("/api/products");
            if (!res.ok) return;
            const data = await res.json();
            if (data && Array.isArray(data.products) && data.products.length > 0) {
                const current = readProducts();
                const idMap = new Set(current.map(function(p) { return p.id; }));
                let added = false;
                const next = current.slice();

                data.products.forEach(function(p) {
                    if (!idMap.has(p.id)) {
                        next.push(p);
                        idMap.add(p.id);
                        added = true;
                    }
                });

                if (added) {
                    localStorage.setItem(storageKey, JSON.stringify(next));
                    window.dispatchEvent(new Event("pk-catalog-updated"));
                    renderStoredProducts();
                }
            }
        } catch (e) {
            // Offline / static mode fallback
        }
    }

    function getField(form, selector) {
        return form.querySelector(selector);
    }

    function getProductFromForm(form, fallback) {
        const title = getField(form, "fieldset.name input");
        const price = getField(form, "fieldset.price input");
        const salePrice = getField(form, "fieldset.sale-price input");
        const date = getField(form, "fieldset.schedule input");
        const publisher = getField(form, "fieldset.choose-brand input");
        const sku = getField(form, "fieldset.sku input");
        const stock = getField(form, "fieldset.category input");
        const tags = form.querySelectorAll("fieldset.sku input")[1];
        const description = form.querySelector("textarea");

        // Shop Department selector (books / stationery / printing)
        const shopTypeInput = form.querySelector('input[name="shopType"]:checked');
        const shopType = shopTypeInput ? shopTypeInput.value : fallback.shopType || "books";

        // Category
        const categorySelected = form.querySelector(".category .selected-tags") || form.querySelector("fieldset.category input");
        const categoryVal = categorySelected ? (categorySelected.textContent || categorySelected.value || "").trim() : "";

        const name = title && title.value ? title.value : fallback.name;
        const prefix = shopType === "stationery" ? "PKS" : shopType === "printing" ? "PKP" : "PKB";

        return {
            id: fallback.id || prefix + "-" + slug(name).slice(0, 10),
            name: name,
            sku: sku && sku.value ? sku.value : fallback.sku || prefix + "-" + slug(name).slice(0, 8),
            price: price && price.value ? Number(price.value) : fallback.price || 0,
            salePrice: salePrice && salePrice.value ? Number(salePrice.value) : fallback.salePrice || "",
            quantity: stock && stock.value ? Number(stock.value) : fallback.quantity || 50,
            sale: fallback.sale || 0,
            stock: "In Stock",
            date: date && date.value ? date.value : fallback.date || new Date().toISOString().slice(0, 10),
            publisher: publisher && publisher.value ? publisher.value : fallback.publisher || "PK Books",
            tags: tags && tags.value ? tags.value : fallback.tags || (shopType === "books" ? "Books" : shopType === "stationery" ? "Stationery" : "Printing"),
            category: categoryVal || fallback.category || (shopType === "books" ? "School Books" : shopType === "stationery" ? "Pens & Writing" : "Bordered Paper Sets"),
            shopType: shopType,
            description: description && description.value ? description.value : fallback.description || "",
            image: fallback.image || (shopType === "stationery" ? "/images/category-stationery.jpg" : shopType === "printing" ? "/images/category-print.jpg" : "/images/category-books.jpg")
        };
    }

    function fillEditForm(product) {
        const form = document.querySelector(".form-add-product");
        if (!form) return;
        const title = getField(form, "fieldset.name input");
        const price = getField(form, "fieldset.price input");
        const salePrice = getField(form, "fieldset.sale-price input");
        const date = getField(form, "fieldset.schedule input");
        const publisher = getField(form, "fieldset.choose-brand input");
        const sku = getField(form, "fieldset.sku input");
        const stock = getField(form, "fieldset.category input");
        const tags = form.querySelectorAll("fieldset.sku input")[1];
        const description = form.querySelector("textarea");

        if (title) title.value = product.name || "";
        if (price) price.value = product.price || "";
        if (salePrice) salePrice.value = product.salePrice || "";
        if (date) date.value = product.date || "";
        if (publisher) publisher.value = product.publisher || "PK Books";
        if (sku) sku.value = product.sku || product.id || "";
        if (stock) stock.value = product.quantity || "";
        if (tags) tags.value = product.tags || "";
        if (description) description.value = product.description || "";

        // Fill Shop Department radio
        const shopVal = product.shopType || "books";
        const radio = form.querySelector('input[name="shopType"][value="' + shopVal + '"]');
        if (radio) {
            radio.checked = true;
            radio.dispatchEvent(new Event("change"));
        }
    }

    function getShopBadge(shopType) {
        if (shopType === "stationery") {
            return '<span style="display:inline-flex;align-items:center;gap:4px;padding:3px 8px;border-radius:999px;font-size:11px;font-weight:700;background:#E8F8F0;color:#0B7B4B;border:1px solid #B8E8D0;">✏️ Stationery</span>';
        }
        if (shopType === "printing") {
            return '<span style="display:inline-flex;align-items:center;gap:4px;padding:3px 8px;border-radius:999px;font-size:11px;font-weight:700;background:#F3E8FF;color:#6B21A8;border:1px solid #D8B4FE;">🖨️ Print Store</span>';
        }
        return '<span style="display:inline-flex;align-items:center;gap:4px;padding:3px 8px;border-radius:999px;font-size:11px;font-weight:700;background:#EBF5FF;color:#1D4ED8;border:1px solid #BFDBFE;">📚 Books Store</span>';
    }

    function makeRow(product) {
        const row = document.createElement("li");
        row.className = "wg-product item-row gap20";
        row.setAttribute("data-shop-type", product.shopType || "books");
        const liveLink = product.shopType === "stationery" ? "/stationery" : product.shopType === "printing" ? "/printing" : "/books";
        const displayPrice = product.salePrice ? product.salePrice : product.price;

        row.innerHTML = 
            '<div class="name">' +
                '<div class="image"><img src="' + (product.image || "images/products/product-1.jpg") + '" alt="' + (product.name || "Product") + '" style="width:50px;height:50px;object-fit:cover;border-radius:8px;"></div>' +
                '<div class="title line-clamp-2 mb-0">' +
                    '<a href="product-details.html?id=' + encodeURIComponent(product.id) + '" class="body-text font-bold">' + product.name + '</a>' +
                    '<div class="mt-4" style="display:flex;align-items:center;gap:8px;">' +
                        getShopBadge(product.shopType || "books") +
                        '<span style="font-size:11px;color:#64748B;font-weight:600;">' + (product.category || "") + '</span>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="body-text text-main-dark mt-4">#' + (product.sku || product.id) + '</div>' +
            '<div class="body-text text-main-dark mt-4 font-bold" style="color:#0F172A;">' +
                rupee(displayPrice) + 
                (product.salePrice && product.price > product.salePrice ? ' <span style="font-size:11px;text-decoration:line-through;color:#94A3B8;font-weight:normal;margin-left:4px;">' + rupee(product.price) + '</span>' : '') +
            '</div>' +
            '<div class="body-text text-main-dark mt-4">' + (product.quantity || "1") + '</div>' +
            '<div class="body-text text-main-dark mt-4">' + (product.sale || "0") + '</div>' +
            '<div><div class="block-available bg-1 fw-7">' + (product.stock || "In Stock") + '</div></div>' +
            '<div class="body-text text-main-dark mt-4">' + (product.date || "") + '</div>' +
            '<div class="list-icon-function">' +
                '<a href="' + liveLink + '" target="_blank" class="item eye" title="View in live store (opens new tab)"><i class="icon-eye text-main"></i></a>' +
                '<a href="edit-product.html?id=' + encodeURIComponent(product.id) + '" class="item edit" title="Edit product"><i class="icon-edit-3"></i></a>' +
                '<button type="button" class="item trash" data-delete-product="' + product.id + '" aria-label="Delete product" title="Delete"><i class="icon-trash-2"></i></button>' +
            '</div>';
        return row;
    }

    function renderStoredProducts() {
        const container = document.querySelector(".table-product-list");
        if (!container) return;

        const list = container.querySelector("ul.flex.flex-column");
        if (!list) return;

        list.innerHTML = "";
        const all = readProducts();

        // Strict counts per shop
        const countBooks = all.filter(function(p) { return !p.shopType || p.shopType === "books"; }).length;
        const countStationery = all.filter(function(p) { return p.shopType === "stationery"; }).length;
        const countPrinting = all.filter(function(p) { return p.shopType === "printing"; }).length;

        // Current shop filter
        const urlParams = new URLSearchParams(window.location.search);
        let currentShop = urlParams.get("shop");
        if (!currentShop || currentShop === "all") {
            currentShop = "books";
        }

        // Insert Filter Tabs bar
        let filterBar = document.getElementById("pk-shop-filter-bar");
        if (!filterBar) {
            filterBar = document.createElement("div");
            filterBar.id = "pk-shop-filter-bar";
            filterBar.style.cssText = "display:flex;flex-wrap:wrap;gap:12px;margin-bottom:24px;padding:14px 18px;background:#F8FAFC;border-radius:16px;border:1px solid #E2E8F0;align-items:center;";
            container.parentElement.insertBefore(filterBar, container);
        }

        filterBar.innerHTML = 
            '<div style="display:flex;align-items:center;gap:6px;margin-right:12px;">' +
                '<span style="font-size:12px;font-weight:800;color:#475569;text-transform:uppercase;letter-spacing:0.06em;">Store Section:</span>' +
            '</div>' +
            '<button type="button" data-filter-shop="books" class="pk-tab-btn ' + (currentShop === 'books' ? 'active' : '') + '" style="display:flex;align-items:center;gap:8px;padding:10px 20px;border-radius:12px;font-size:13px;font-weight:700;cursor:pointer;border:1px solid ' + (currentShop === 'books' ? '#1D4ED8' : '#CBD5E1') + ';background:' + (currentShop === 'books' ? '#1D4ED8' : '#FFFFFF') + ';color:' + (currentShop === 'books' ? '#FFFFFF' : '#334155') + ';box-shadow:' + (currentShop === 'books' ? '0 4px 12px rgba(29,78,216,0.25)' : 'none') + ';transition:all 0.2s;">' +
                '📚 Books Store <span style="background:' + (currentShop === 'books' ? 'rgba(255,255,255,0.25)' : '#E2E8F0') + ';color:' + (currentShop === 'books' ? '#FFFFFF' : '#475569') + ';font-size:11px;padding:2px 8px;border-radius:999px;">' + countBooks + '</span>' +
            '</button>' +
            '<button type="button" data-filter-shop="stationery" class="pk-tab-btn ' + (currentShop === 'stationery' ? 'active' : '') + '" style="display:flex;align-items:center;gap:8px;padding:10px 20px;border-radius:12px;font-size:13px;font-weight:700;cursor:pointer;border:1px solid ' + (currentShop === 'stationery' ? '#0B7B4B' : '#CBD5E1') + ';background:' + (currentShop === 'stationery' ? '#0B7B4B' : '#FFFFFF') + ';color:' + (currentShop === 'stationery' ? '#FFFFFF' : '#334155') + ';box-shadow:' + (currentShop === 'stationery' ? '0 4px 12px rgba(11,123,75,0.25)' : 'none') + ';transition:all 0.2s;">' +
                '✏️ Stationery Store <span style="background:' + (currentShop === 'stationery' ? 'rgba(255,255,255,0.25)' : '#E2E8F0') + ';color:' + (currentShop === 'stationery' ? '#FFFFFF' : '#475569') + ';font-size:11px;padding:2px 8px;border-radius:999px;">' + countStationery + '</span>' +
            '</button>' +
            '<button type="button" data-filter-shop="printing" class="pk-tab-btn ' + (currentShop === 'printing' ? 'active' : '') + '" style="display:flex;align-items:center;gap:8px;padding:10px 20px;border-radius:12px;font-size:13px;font-weight:700;cursor:pointer;border:1px solid ' + (currentShop === 'printing' ? '#6B21A8' : '#CBD5E1') + ';background:' + (currentShop === 'printing' ? '#6B21A8' : '#FFFFFF') + ';color:' + (currentShop === 'printing' ? '#FFFFFF' : '#334155') + ';box-shadow:' + (currentShop === 'printing' ? '0 4px 12px rgba(107,33,168,0.25)' : 'none') + ';transition:all 0.2s;">' +
                '🖨️ Print Store <span style="background:' + (currentShop === 'printing' ? 'rgba(255,255,255,0.25)' : '#E2E8F0') + ';color:' + (currentShop === 'printing' ? '#FFFFFF' : '#475569') + ';font-size:11px;padding:2px 8px;border-radius:999px;">' + countPrinting + '</span>' +
            '</button>';

        function updateHeadings(shop) {
            let shopName = "Books Store";
            let color = "#1D4ED8";
            let liveUrl = "/books";
            if (shop === "stationery") {
                shopName = "Stationery Store";
                color = "#0B7B4B";
                liveUrl = "/stationery";
            } else if (shop === "printing") {
                shopName = "Print Store";
                color = "#6B21A8";
                liveUrl = "/printing";
            }

            const h3 = document.querySelector(".main-content-wrap h3");
            if (h3) {
                h3.innerHTML = '<span style="color:' + color + ';">' + shopName + '</span> Products';
            }

            const crumbs = document.querySelectorAll(".breadcrumbs .text-tiny");
            if (crumbs && crumbs.length > 0) {
                crumbs[crumbs.length - 1].textContent = shopName + " Products";
            }

            document.title = shopName + " Products - PK Books Admin";

            // Update Add New button
            const addBtn = document.querySelector("a.tf-button.px-40");
            if (addBtn) {
                addBtn.href = "add-product.html?shop=" + encodeURIComponent(shop);
                addBtn.innerHTML = '<i class="icon-plus"></i> Add to ' + shopName;
            }

            // Sync sidebar
            document.querySelectorAll(".sub-menu-item").forEach(function(li) {
                const a = li.querySelector("a");
                if (a && a.href.includes("product-list.html")) {
                    if (a.href.includes("shop=" + shop)) {
                        li.classList.add("active");
                    } else {
                        li.classList.remove("active");
                    }
                }
            });
        }

        let currentCategoryFilter = "all";
        let currentSearchQuery = "";

        function updateCategorySelect(shop) {
            const selectEl = document.querySelector(".wg-box .tf-select select");
            if (!selectEl) return;
            const cats = STORE_CATEGORIES[shop] || STORE_CATEGORIES.books;
            selectEl.innerHTML = '<option value="all" selected>All Categories</option>' + cats.map(function(c) {
                return '<option value="' + c + '">' + c + '</option>';
            }).join("");
        }

        function applyFilter(shop) {
            list.innerHTML = "";
            let filtered = all.filter(function(p) { return (p.shopType || "books") === shop; });

            if (currentCategoryFilter && currentCategoryFilter !== "all" && currentCategoryFilter !== "All Categories") {
                filtered = filtered.filter(function(p) {
                    return (p.category || "").toLowerCase() === currentCategoryFilter.toLowerCase();
                });
            }

            if (currentSearchQuery) {
                const q = currentSearchQuery.toLowerCase();
                filtered = filtered.filter(function(p) {
                    return (p.name || "").toLowerCase().includes(q) ||
                           (p.sku || "").toLowerCase().includes(q) ||
                           (p.category || "").toLowerCase().includes(q) ||
                           (p.publisher || "").toLowerCase().includes(q);
                });
            }

            if (filtered.length === 0) {
                const sName = shop === "stationery" ? "Stationery Store" : shop === "printing" ? "Print Store" : "Books Store";
                list.innerHTML = '<li style="padding:48px 24px;text-align:center;color:#64748B;font-weight:600;background:#FFFFFF;border-radius:14px;border:1px dashed #CBD5E1;margin:20px 0;">' +
                    '<div style="font-size:24px;margin-bottom:8px;">📦</div>' +
                    'No matching products found in ' + sName + '.<br>' +
                    '<a href="add-product.html?shop=' + shop + '" style="display:inline-block;margin-top:14px;padding:8px 20px;border-radius:10px;background:#1D4ED8;color:#FFFFFF;font-weight:700;font-size:13px;text-decoration:none;">+ Add Product to ' + sName + '</a>' +
                '</li>';
            } else {
                filtered.forEach(function(p) { list.appendChild(makeRow(p)); });
            }

            // Update active states on tab buttons
            filterBar.querySelectorAll(".pk-tab-btn").forEach(function(btn) {
                const bShop = btn.getAttribute("data-filter-shop");
                const isAct = bShop === shop;
                btn.style.background = isAct ? (bShop === 'stationery' ? '#0B7B4B' : bShop === 'printing' ? '#6B21A8' : '#1D4ED8') : '#FFFFFF';
                btn.style.color = isAct ? '#FFFFFF' : '#334155';
                btn.style.borderColor = isAct ? 'transparent' : '#CBD5E1';
                btn.style.boxShadow = isAct ? ('0 4px 12px ' + (bShop === 'stationery' ? 'rgba(11,123,75,0.25)' : bShop === 'printing' ? 'rgba(107,33,168,0.25)' : 'rgba(29,78,216,0.25)')) : 'none';
            });

            updateHeadings(shop);
            updateCategorySelect(shop);
        }

        filterBar.addEventListener("click", function (e) {
            const btn = e.target.closest("[data-filter-shop]");
            if (!btn) return;
            const shop = btn.getAttribute("data-filter-shop");
            currentShop = shop;
            currentCategoryFilter = "all";
            currentSearchQuery = "";
            const searchInp = document.querySelector(".form-search input");
            if (searchInp) searchInp.value = "";
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.set("shop", shop);
            window.history.replaceState({}, "", newUrl.toString());
            applyFilter(shop);
        });

        // Live Search Input Listener
        const searchInput = document.querySelector(".form-search input");
        if (searchInput) {
            searchInput.addEventListener("input", function(e) {
                currentSearchQuery = e.target.value.trim();
                applyFilter(currentShop);
            });
            const searchForm = document.querySelector(".form-search");
            if (searchForm) {
                searchForm.addEventListener("submit", function(e) {
                    e.preventDefault();
                });
            }
        }

        // Live Category Dropdown Listener
        const catSelect = document.querySelector(".wg-box .tf-select select");
        if (catSelect) {
            catSelect.addEventListener("change", function(e) {
                currentCategoryFilter = e.target.value;
                applyFilter(currentShop);
            });
        }

        applyFilter(currentShop);

        list.addEventListener("click", function (event) {
            const button = event.target.closest("[data-delete-product]");
            if (!button) return;
            const id = button.getAttribute("data-delete-product");
            if (confirm("Are you sure you want to delete this product?")) {
                const current = readProducts();
                writeProducts(current.filter(function(p) { return p.id !== id; }));
                renderStoredProducts();
            }
        });
    }

    // Dynamic categories per store
    const STORE_CATEGORIES = {
        books: [
            "Biographies & Memoirs",
            "Literature & Fiction",
            "Competitive & Academic",
            "Children's Books",
            "School Books"
        ],
        stationery: [
            "Pens & Writing",
            "Sharpeners & Erasers",
            "Colour Books & Art",
            "Books & Notebooks",
            "Geometry & Math",
            "School Kits & Bundles"
        ],
        printing: [
            "Bordered Paper Sets",
            "Customer Note Cards",
            "Certificates & Awards",
            "Business Stationery",
            "Thesis & Binding",
            "Spiral Binding"
        ]
    };

    function updateCategoryDropdown(shopType) {
        const catDropdown = document.querySelector(".form-add-product .category .list-dropdown");
        if (!catDropdown) return;
        const options = STORE_CATEGORIES[shopType] || STORE_CATEGORIES.books;
        catDropdown.innerHTML = options.map(function(opt) {
            return "<div>" + opt + "</div>";
        }).join("");
    }

    function handleProductForm() {
        const form = document.querySelector(".form-add-product");
        if (!form) return;

        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");
        const shopParam = params.get("shop");
        const products = readProducts();
        const selected = products.find(function(p) { return p.id === id || p.sku === id; });

        if (selected) {
            fillEditForm(selected);
            updateCategoryDropdown(selected.shopType || "books");
        } else if (shopParam) {
            const radio = form.querySelector('input[name="shopType"][value="' + shopParam + '"]');
            if (radio) {
                radio.checked = true;
                updateCategoryDropdown(shopParam);
            }
        }

        // Listen to radio changes to update categories
        form.querySelectorAll('input[name="shopType"]').forEach(function(radio) {
            radio.addEventListener("change", function() {
                updateCategoryDropdown(radio.value);
            });
        });

        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const fallback = selected || {};
            const product = getProductFromForm(form, fallback);
            product.id = id || product.id || product.sku;

            const next = readProducts().filter(function(p) { return p.id !== product.id && p.sku !== product.sku; });
            next.unshift(product);
            writeProducts(next);

            // Redirect back to product list for that specific store
            window.location.href = "product-list.html?shop=" + encodeURIComponent(product.shopType || "books");
        });
    }

    function enhanceSidebar() {
        const urlParams = new URLSearchParams(window.location.search);
        const isProductListPage = window.location.pathname.includes("product-list.html");
        const activeShop = urlParams.get("shop") || (isProductListPage ? "books" : "");
        const isAddProduct = window.location.pathname.includes("add-product.html");

        document.querySelectorAll(".menu-item").forEach(function(item) {
            const textEl = item.querySelector(".text");
            if (textEl && textEl.textContent.trim() === "Product") {
                const subMenu = item.querySelector(".sub-menu");
                if (subMenu) {
                    subMenu.innerHTML = 
                        '<li class="sub-menu-item ' + (activeShop === 'books' && isProductListPage ? 'active' : '') + '">' +
                            '<a href="product-list.html?shop=books">' +
                                '<div class="text">📚 Books Store</div>' +
                            '</a>' +
                        '</li>' +
                        '<li class="sub-menu-item ' + (activeShop === 'stationery' && isProductListPage ? 'active' : '') + '">' +
                            '<a href="product-list.html?shop=stationery">' +
                                '<div class="text">✏️ Stationery Store</div>' +
                            '</a>' +
                        '</li>' +
                        '<li class="sub-menu-item ' + (activeShop === 'printing' && isProductListPage ? 'active' : '') + '">' +
                            '<a href="product-list.html?shop=printing">' +
                                '<div class="text">🖨️ Print Store</div>' +
                            '</a>' +
                        '</li>' +
                        '<li class="sub-menu-item ' + (isAddProduct ? 'active' : '') + '" style="border-top:1px dashed #E2E8F0;margin-top:6px;padding-top:6px;">' +
                            '<a href="add-product.html' + (activeShop ? '?shop=' + activeShop : '') + '">' +
                                '<div class="text" style="font-weight:700;color:#0057B8;">+ Add Product</div>' +
                            '</a>' +
                        '</li>';
                }
            }
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
        enhanceSidebar();
        renderStoredProducts();
        handleProductForm();
        syncFromApi();
    });
})();
