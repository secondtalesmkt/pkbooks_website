const fs = require("fs");
const path = require("path");

const catalogPath = path.join(__dirname, "../public/admin/data/catalog.json");
const catalogData = JSON.parse(fs.readFileSync(catalogPath, "utf-8"));
const products = catalogData.products;

const scriptContent = `(function () {
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
    const REAL_CATALOG = ${JSON.stringify(products, null, 4)};

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
`;

const targetPath = path.join(__dirname, "../public/admin/js/product-admin.js");
fs.writeFileSync(targetPath, scriptContent, "utf-8");
console.log("Successfully written product-admin.js with", products.length, "real products.");
