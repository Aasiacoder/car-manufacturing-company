document.addEventListener("DOMContentLoaded", function () {
    function generateOutvoice() {
        const supplierName = document.getElementById("supplierName").value;
        const supplierAddress = document.getElementById("supplierAddress").value;
        const productService = document.getElementById("productService").value;
        const description = document.getElementById("description").value;
        const rate = parseFloat(document.getElementById("rate").value);
        const quantity = parseInt(document.getElementById("quantity").value);
        const paymentTerms = document.getElementById("paymentTerms").value;
        const dueDate = document.getElementById("dueDate").value;
        const discount = parseFloat(document.getElementById("discount").value) || 0;

        if (!supplierName || !rate || !quantity) {
            alert("Please fill in all required fields.");
            return;
        }

        // **Calculate amounts**
        const subtotal = rate * quantity;
        const discountAmount = (subtotal * discount) / 100;
        const taxableAmount = subtotal - discountAmount;
        const taxRate = 18;  // **Example Tax Rate: 18%**
        const taxAmount = (taxableAmount * taxRate) / 100;
        const finalPayable = taxableAmount + taxAmount;

        // **Store data in localStorage for retrieval in outvoice.html**
        localStorage.setItem("supplierName", supplierName);
        localStorage.setItem("supplierAddress", supplierAddress);
        localStorage.setItem("productService", productService);
        localStorage.setItem("description", description);
        localStorage.setItem("rate", rate);
        localStorage.setItem("quantity", quantity);
        localStorage.setItem("paymentTerms", paymentTerms);
        localStorage.setItem("dueDate", dueDate);
        localStorage.setItem("discount", discount);
        localStorage.setItem("subtotal", subtotal);
        localStorage.setItem("tax", taxAmount);
        localStorage.setItem("finalPayable", finalPayable);
        localStorage.setItem("outvoiceAmount", taxableAmount);

        // Redirect to the generated outvoice page
        window.location.href = "outvoice.html";
    }

    window.generateOutvoice = generateOutvoice;

    function loadOutvoice() {
        document.getElementById("supplier-name").innerText = localStorage.getItem("supplierName") || "";
        document.getElementById("supplier-address").innerText = localStorage.getItem("supplierAddress") || "";
        document.getElementById("outvoice-item").innerText = localStorage.getItem("productService") || "";
        document.getElementById("outvoice-description").innerText = localStorage.getItem("description") || "";
        document.getElementById("outvoice-rate").innerText = "₹" + (localStorage.getItem("rate") || "0.00");
        document.getElementById("outvoice-quantity").innerText = localStorage.getItem("quantity") || "0";
        document.getElementById("payment-terms").innerText = localStorage.getItem("paymentTerms") || "";
        document.getElementById("due-date").innerText = localStorage.getItem("dueDate") || "";
        document.getElementById("discount").innerText = localStorage.getItem("discount") + "%" || "0%";

        // **Retrieve and display calculated values**
        document.getElementById("sub-total").innerText = "₹" + (localStorage.getItem("subtotal") || "0.00");
        document.getElementById("tax").innerText = "₹" + (localStorage.getItem("tax") || "0.00");
        document.getElementById("final-payable").innerText = "₹" + (localStorage.getItem("finalPayable") || "0.00");
        document.getElementById("outvoice-amount").innerText = "₹" + (localStorage.getItem("outvoiceAmount") || "0.00");
    }

    if (window.location.pathname.includes("outvoice.html")) {
        loadOutvoice();
    }

    function printOutvoice() {
        window.print();
    }

    function downloadOutvoice() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        html2canvas(document.getElementById("print-area")).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const imgWidth = 190;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            doc.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
            doc.save("Outvoice.pdf");
        });
    }

    window.printOutvoice = printOutvoice;
    window.downloadOutvoice = downloadOutvoice;
});


