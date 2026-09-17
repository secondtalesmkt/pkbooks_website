(function () {
    const storageKey = "pk_orders";

    function rupee(value) {
        const number = Number(value || 0);
        return "₹" + number.toLocaleString("en-IN", { maximumFractionDigits: 0 });
    }

    const INITIAL_ORDERS = [
        {
            id: "PKB-ORD-2601",
            orderType: "product",
            customerName: "Rahul K. Nair",
            phone: "98461 23456",
            items: "Wings of Fire: An Autobiography (x1), Classmate Notebook 240p (x2)",
            itemCount: 3,
            totalAmount: 565,
            fulfillment: "Store Pickup (Valanchery Bus Stand)",
            paymentMode: "UPI (GPay)",
            paymentStatus: "Paid",
            orderStatus: "Ready for Pickup",
            date: "2026-09-08 14:15"
        },
        {
            id: "PKB-ORD-2602",
            orderType: "product",
            customerName: "Amina Fathima",
            phone: "97455 89012",
            items: "Hauser XO 0.7mm Ball Pen (x2), Camlin Geometry Box (x1)",
            itemCount: 3,
            totalAmount: 343,
            fulfillment: "Home Delivery (Valanchery Town)",
            address: "Fathima Manzil, Near Town Masjid, Valanchery",
            paymentMode: "UPI (PhonePe)",
            paymentStatus: "Paid",
            orderStatus: "Preparing",
            date: "2026-09-08 14:45"
        },
        {
            id: "PKP-PRN-3101",
            orderType: "print",
            customerName: "Muhammed Shafi",
            phone: "98950 44321",
            items: "KTU M.Tech Final Thesis (140 pgs, Color, Navy Gold Foil)",
            itemCount: 1,
            totalAmount: 680,
            fulfillment: "Store Pickup (Valanchery Bus Stand)",
            paymentMode: "UPI (GPay)",
            paymentStatus: "Paid",
            orderStatus: "Ready for Pickup",
            date: "2026-09-08 13:30",
            printSpecs: {
                pages: 140,
                copies: 1,
                colorMode: "Colour",
                sides: "Double-Sided",
                binding: "Hardcover Gold Emboss",
                fileName: "KTU_MTech_Final_Thesis_Shafi.pdf",
                fileSize: "14.2 MB"
            }
        },
        {
            id: "PKP-PRN-3102",
            orderType: "print",
            customerName: "Dr. Lakshmi Menon",
            phone: "94470 66543",
            items: "Medical Seminar Handouts (45 pgs × 3 copies, Wire-O Spiral)",
            itemCount: 3,
            totalAmount: 420,
            fulfillment: "Home Delivery (MES Medical College Area)",
            address: "Dept of Pediatrics, MES Medical College Campus, Perinthalmanna Rd",
            paymentMode: "Cash on Collection",
            paymentStatus: "Unpaid",
            orderStatus: "Preparing",
            date: "2026-09-08 14:50",
            printSpecs: {
                pages: 45,
                copies: 3,
                colorMode: "Black and White",
                sides: "Double-Sided",
                binding: "Wire-O Spiral",
                fileName: "Pediatric_Seminar_Handouts.pdf",
                fileSize: "3.8 MB"
            }
        }
    ];

    function readOrders() {
        try {
            const raw = localStorage.getItem(storageKey);
            if (!raw) {
                localStorage.setItem(storageKey, JSON.stringify(INITIAL_ORDERS));
                return INITIAL_ORDERS;
            }
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_ORDERS;
        } catch (e) {
            return INITIAL_ORDERS;
        }
    }

    function writeOrders(orders) {
        localStorage.setItem(storageKey, JSON.stringify(orders));
        window.dispatchEvent(new Event("pk-orders-updated"));
    }

    function getStatusBadge(status) {
        if (status === "Ready for Pickup" || status === "Complete" || status === "Delivered") {
            return `<span style="display:inline-block;padding:3px 10px;border-radius:999px;font-size:11px;font-weight:700;background:#E8F8F0;color:#0B7B4B;border:1px solid #B8E8D0;">${status}</span>`;
        }
        if (status === "Preparing" || status === "In Progress" || status === "Printing") {
            return `<span style="display:inline-block;padding:3px 10px;border-radius:999px;font-size:11px;font-weight:700;background:#FFF7ED;color:#C2410C;border:1px solid #FED7AA;">${status}</span>`;
        }
        return `<span style="display:inline-block;padding:3px 10px;border-radius:999px;font-size:11px;font-weight:700;background:#EBF5FF;color:#1D4ED8;border:1px solid #BFDBFE;">Received</span>`;
    }

    function getPaymentBadge(mode, status) {
        const isPaid = status === "Paid" || (status && status.toLowerCase().includes("paid"));
        return `
            <div>
                <span style="display:inline-block;font-size:11px;font-weight:700;color:${isPaid ? '#15803D' : '#B45309'};">
                    ${isPaid ? '✓ Paid' : '⏳ Unpaid'}
                </span>
                <div style="font-size:10px;color:#64748B;">${mode || 'Cash'}</div>
            </div>
        `;
    }

    function renderOrdersView() {
        const container = document.querySelector(".table-all-order");
        if (!container) return;

        const list = container.querySelector("ul.flex.flex-column");
        if (!list) return;

        const urlParams = new URLSearchParams(window.location.search);
        let activeType = urlParams.get("type") || "product"; // default to "product"
        if (activeType !== "product" && activeType !== "print") activeType = "product";

        const allOrders = readOrders();
        const productOrders = allOrders.filter((o) => o.orderType === "product" || !o.orderType);
        const printOrders = allOrders.filter((o) => o.orderType === "print");

        // Insert or update Section Switcher Tabs above the table
        let switcher = document.getElementById("pk-orders-section-switcher");
        if (!switcher) {
            switcher = document.createElement("div");
            switcher.id = "pk-orders-section-switcher";
            switcher.style.cssText = "display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;margin-bottom:24px;padding:16px 20px;background:#F8FAFC;border-radius:20px;border:1px solid #E2E8F0;";
            container.parentElement.insertBefore(switcher, container);
        }

        switcher.innerHTML = `
            <div>
                <span style="font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:0.06em;color:#0057B8;display:block;margin-bottom:2px;">Order Management Departments</span>
                <h3 style="font-size:20px;font-weight:900;color:#0F172A;margin:0;">
                    ${activeType === "product" ? "📦 Product Orders (Books & Stationery)" : "🖨️ Print Orders (Thesis, Spiral & Docs)"}
                </h3>
            </div>
            <div style="display:flex;gap:10px;flex-wrap:wrap;">
                <button type="button" data-order-type="product" style="padding:10px 20px;border-radius:14px;font-size:13px;font-weight:800;cursor:pointer;display:flex;align-items:center;gap:8px;border:2px solid ${activeType === 'product' ? '#0057B8' : '#CBD5E1'};background:${activeType === 'product' ? '#0057B8' : '#FFFFFF'};color:${activeType === 'product' ? '#FFFFFF' : '#334155'};transition:all 0.2s;box-shadow:${activeType === 'product' ? '0 4px 12px rgba(0,87,184,0.2)' : 'none'};">
                    <span>📦 Product Orders</span>
                    <span style="padding:2px 7px;border-radius:999px;font-size:11px;background:${activeType === 'product' ? 'rgba(255,255,255,0.25)' : '#E2E8F0'};color:${activeType === 'product' ? '#FFFFFF' : '#475569'};">${productOrders.length}</span>
                </button>
                <button type="button" data-order-type="print" style="padding:10px 20px;border-radius:14px;font-size:13px;font-weight:800;cursor:pointer;display:flex;align-items:center;gap:8px;border:2px solid ${activeType === 'print' ? '#7E22CE' : '#CBD5E1'};background:${activeType === 'print' ? '#7E22CE' : '#FFFFFF'};color:${activeType === 'print' ? '#FFFFFF' : '#334155'};transition:all 0.2s;box-shadow:${activeType === 'print' ? '0 4px 12px rgba(126,34,206,0.2)' : 'none'};">
                    <span>🖨️ Print Orders</span>
                    <span style="padding:2px 7px;border-radius:999px;font-size:11px;background:${activeType === 'print' ? 'rgba(255,255,255,0.25)' : '#E2E8F0'};color:${activeType === 'print' ? '#FFFFFF' : '#475569'};">${printOrders.length}</span>
                </button>
            </div>
        `;

        // Update Table Headers
        const tableTitle = container.querySelector(".table-title");
        if (tableTitle) {
            if (activeType === "product") {
                tableTitle.innerHTML = `
                    <li style="flex:2;"><div class="body-title font-bold">Customer & Contact</div></li>
                    <li style="flex:1.2;"><div class="body-title font-bold">Order ID</div></li>
                    <li style="flex:2.5;"><div class="body-title font-bold">Ordered Product(s)</div></li>
                    <li style="flex:1;"><div class="body-title font-bold">Total</div></li>
                    <li style="flex:1.5;"><div class="body-title font-bold">Fulfillment</div></li>
                    <li style="flex:1.2;"><div class="body-title font-bold">Payment</div></li>
                    <li style="flex:1.2;"><div class="body-title font-bold">Status</div></li>
                    <li style="flex:1;"><div class="body-title font-bold">Action</div></li>
                `;
            } else {
                tableTitle.innerHTML = `
                    <li style="flex:2;"><div class="body-title font-bold">Customer & Contact</div></li>
                    <li style="flex:1.2;"><div class="body-title font-bold">Print ID</div></li>
                    <li style="flex:2.5;"><div class="body-title font-bold">Document & Print Specs</div></li>
                    <li style="flex:1;"><div class="body-title font-bold">Total</div></li>
                    <li style="flex:1.5;"><div class="body-title font-bold">Fulfillment / Delivery</div></li>
                    <li style="flex:1.2;"><div class="body-title font-bold">Payment</div></li>
                    <li style="flex:1.2;"><div class="body-title font-bold">Status</div></li>
                    <li style="flex:1;"><div class="body-title font-bold">Action</div></li>
                `;
            }
        }

        // Render Rows
        list.innerHTML = "";
        const targetList = activeType === "product" ? productOrders : printOrders;

        if (targetList.length === 0) {
            list.innerHTML = `
                <li style="padding:60px 20px;text-align:center;background:#FFFFFF;border-radius:16px;">
                    <div style="font-size:36px;margin-bottom:10px;">${activeType === "product" ? "📦" : "🖨️"}</div>
                    <h4 style="font-size:16px;font-weight:800;color:#1E293B;">No ${activeType === "product" ? "Product" : "Print"} Orders Found</h4>
                    <p style="font-size:12px;color:#64748B;margin-top:4px;">New customer orders will automatically appear here in real-time.</p>
                </li>
            `;
        } else {
            targetList.forEach((order) => {
                const row = document.createElement("li");
                row.className = "wg-product item-row gap20";
                row.style.cssText = "display:flex;align-items:center;padding:14px 16px;border-bottom:1px solid #F1F5F9;background:#FFFFFF;transition:background 0.2s;";

                const specsHtml = order.printSpecs
                    ? `<div style="font-size:11px;color:#475569;font-weight:600;">
                         <span style="color:#7E22CE;font-weight:700;">📄 ${order.printSpecs.fileName || 'Doc'}</span> (${order.printSpecs.fileSize || ''})
                         <div style="color:#64748B;font-size:10px;margin-top:2px;">${order.printSpecs.pages || 10} pgs × ${order.printSpecs.copies || 1} copy · ${order.printSpecs.colorMode || ''} · ${order.printSpecs.binding || ''}</div>
                       </div>`
                    : `<div style="font-size:12px;font-weight:600;color:#1E293B;line-height:1.4;">${order.items || 'Standard Product Order'}</div>`;

                row.innerHTML = `
                    <div style="flex:2;">
                        <div style="font-size:13px;font-weight:800;color:#0F172A;">${order.customerName}</div>
                        <a href="tel:${order.phone}" style="font-size:11px;color:#0057B8;font-weight:700;display:inline-block;margin-top:2px;">📞 ${order.phone}</a>
                        <div style="font-size:10px;color:#94A3B8;margin-top:1px;">${order.date || ''}</div>
                    </div>
                    <div style="flex:1.2;font-family:monospace;font-weight:800;color:#0F172A;font-size:12px;">
                        #${order.id}
                    </div>
                    <div style="flex:2.5;">
                        ${specsHtml}
                    </div>
                    <div style="flex:1;font-weight:900;color:#0F172A;font-size:13px;">
                        ${rupee(order.totalAmount)}
                    </div>
                    <div style="flex:1.5;">
                        <div style="font-size:11px;font-weight:700;color:#334155;">${order.fulfillment}</div>
                        ${order.address ? `<div style="font-size:10px;color:#64748B;margin-top:2px;max-width:180px;line-height:1.3;">📍 ${order.address}</div>` : ''}
                    </div>
                    <div style="flex:1.2;">
                        ${getPaymentBadge(order.paymentMode, order.paymentStatus)}
                    </div>
                    <div style="flex:1.2;">
                        ${getStatusBadge(order.orderStatus || 'Received')}
                    </div>
                    <div style="flex:1;display:flex;align-items:center;gap:8px;">
                        <select data-update-status="${order.id}" style="padding:4px 6px;border-radius:8px;border:1px solid #CBD5E1;font-size:11px;font-weight:700;background:#F8FAFC;cursor:pointer;">
                            <option value="Received" ${order.orderStatus === 'Received' ? 'selected' : ''}>Received</option>
                            <option value="Preparing" ${order.orderStatus === 'Preparing' ? 'selected' : ''}>Preparing</option>
                            <option value="Ready for Pickup" ${order.orderStatus === 'Ready for Pickup' ? 'selected' : ''}>Ready</option>
                            <option value="Delivered" ${order.orderStatus === 'Delivered' ? 'selected' : ''}>Delivered</option>
                        </select>
                        <button type="button" data-delete-order="${order.id}" title="Delete order" style="background:none;border:none;color:#EF4444;cursor:pointer;padding:4px;border-radius:6px;">
                            <i class="icon-trash-2"></i>
                        </button>
                    </div>
                `;
                list.appendChild(row);
            });
        }

        // Section tab switching
        switcher.querySelectorAll("button[data-order-type]").forEach((btn) => {
            btn.addEventListener("click", function () {
                const target = this.getAttribute("data-order-type");
                const newUrl = new URL(window.location.href);
                newUrl.searchParams.set("type", target);
                window.history.replaceState({}, "", newUrl.toString());
                renderOrdersView();
            });
        });

        // Status update handler
        list.querySelectorAll("select[data-update-status]").forEach((select) => {
            select.addEventListener("change", function () {
                const orderId = this.getAttribute("data-update-status");
                const newStatus = this.value;
                const orders = readOrders();
                const updated = orders.map((o) => (o.id === orderId ? { ...o, orderStatus: newStatus } : o));
                writeOrders(updated);
                renderOrdersView();
            });
        });

        // Delete order handler
        list.querySelectorAll("button[data-delete-order]").forEach((btn) => {
            btn.addEventListener("click", function () {
                const orderId = this.getAttribute("data-delete-order");
                if (confirm(`Delete order #${orderId}?`)) {
                    const orders = readOrders();
                    writeOrders(orders.filter((o) => o.id !== orderId));
                    renderOrdersView();
                }
            });
        });
    }

    // Enhance sidebar across admin HTML pages
    function enhanceSidebarOrders() {
        const subMenus = document.querySelectorAll(".sub-menu");
        subMenus.forEach((menu) => {
            const orderListLink = menu.querySelector('a[href="oder-list.html"]');
            if (orderListLink) {
                // Replace old order links ("Order List", "Order Detail", "Order Tracking")
                menu.innerHTML = `
                    <li class="sub-menu-item">
                        <a href="oder-list.html?type=product" class="" style="display:flex;align-items:center;gap:6px;">
                            <div class="text" style="font-weight:700;color:#0057B8;">📦 Product Orders</div>
                        </a>
                    </li>
                    <li class="sub-menu-item">
                        <a href="oder-list.html?type=print" class="" style="display:flex;align-items:center;gap:6px;">
                            <div class="text" style="font-weight:700;color:#7E22CE;">🖨️ Print Orders</div>
                        </a>
                    </li>
                `;
            }
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
        enhanceSidebarOrders();
        renderOrdersView();
    });

    window.addEventListener("pk-orders-updated", function () {
        renderOrdersView();
    });
})();
