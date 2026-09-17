(function () {
    const storageKey = "pkBooksAdminProducts";
    function rupee(value) {
        return "₹" + Number(value || 0).toLocaleString("en-IN", { maximumFractionDigits: 0 });
    }
    function slug(value) {
        return String(value || "").trim().toUpperCase().replace(/[^A-Z0-9]+/g, "-").replace(/^-|-$/g, "");
    }
    function readProducts() {
        try { return JSON.parse(localStorage.getItem(storageKey) || "[]"); } catch (error) { return []; }
    }
    function writeProducts(products) {
        localStorage.setItem(storageKey, JSON.stringify(products));
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
        const name = title && title.value ? title.value : fallback.name;
        return {
            id: fallback.id || "PKB-" + slug(name).slice(0, 12),
            name,
            sku: sku && sku.value ? sku.value : fallback.sku || "PKB-" + slug(name).slice(0, 10),
            price: price && price.value ? price.value : fallback.price || "0",
            salePrice: salePrice && salePrice.value ? salePrice.value : fallback.salePrice || "",
            quantity: stock && stock.value ? stock.value : fallback.quantity || "1",
            sale: fallback.sale || "0",
            stock: "In Stock",
            date: date && date.value ? date.value : fallback.date || new Date().toISOString().slice(0, 10),
            publisher: publisher && publisher.value ? publisher.value : fallback.publisher || "PK Books",
            tags: tags && tags.value ? tags.value : fallback.tags || "Books",
            description: description && description.value ? description.value : fallback.description || "",
            image: fallback.image || "images/products/product-1.jpg"
        };
    }
    function fillEditForm(product) {
        const form = document.querySelector(".form-add-product");
        if (!form || document.body.dataset.productMode !== "edit") return;
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
    }
    function makeRow(product) {
        const row = document.createElement("li");
        row.className = "wg-product item-row gap20";
        row.innerHTML = `<div class="name"><div class="image"><img src="${product.image}" alt="${product.name}"></div><div class="title line-clamp-2 mb-0"><a href="product-details.html?id=${encodeURIComponent(product.id)}" class="body-text">${product.name}</a></div></div><div class="body-text text-main-dark mt-4">#${product.sku || product.id}</div><div class="body-text text-main-dark mt-4">${rupee(product.price)}</div><div class="body-text text-main-dark mt-4">${product.quantity || "1"}</div><div class="body-text text-main-dark mt-4">${product.sale || "0"}</div><div><div class="block-available bg-1 fw-7">${product.stock || "In Stock"}</div></div><div class="body-text text-main-dark mt-4">${product.date || ""}</div><div class="list-icon-function"><a href="product-details.html?id=${encodeURIComponent(product.id)}" class="item eye"><i class="icon-eye text-main"></i></a><a href="edit-product.html?id=${encodeURIComponent(product.id)}" class="item edit"><i class="icon-edit-3"></i></a><button type="button" class="item trash" data-delete-product="${product.id}" aria-label="Delete product"><i class="icon-trash-2"></i></button></div>`;
        return row;
    }
    function renderStoredProducts() {
        const list = document.querySelector(".table-product-list > ul.flex.flex-column");
        if (!list) return;
        readProducts().forEach((product) => list.prepend(makeRow(product)));
        list.querySelectorAll(".item-row").forEach((row) => {
            const skuCell = row.querySelectorAll(".body-text.text-main-dark")[0];
            const id = skuCell ? skuCell.textContent.replace("#", "").trim() : "";
            row.querySelectorAll("a.edit").forEach((link) => link.setAttribute("href", "edit-product.html?id=" + encodeURIComponent(id)));
        });
        list.addEventListener("click", function (event) {
            const button = event.target.closest("[data-delete-product]");
            if (!button) return;
            const id = button.getAttribute("data-delete-product");
            writeProducts(readProducts().filter((product) => product.id !== id));
            button.closest(".item-row").remove();
        });
    }
    function handleProductForm() {
        const form = document.querySelector(".form-add-product");
        if (!form) return;
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");
        const products = readProducts();
        const selected = products.find((product) => product.id === id || product.sku === id);
        if (selected) fillEditForm(selected);
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const product = getProductFromForm(form, selected || {});
            product.id = id || product.id || product.sku;
            const next = readProducts().filter((item) => item.id !== product.id && item.sku !== product.sku);
            next.unshift(product);
            writeProducts(next);
            window.location.href = "product-list.html";
        });
    }
    document.addEventListener("DOMContentLoaded", function () {
        renderStoredProducts();
        handleProductForm();
    });
})();
