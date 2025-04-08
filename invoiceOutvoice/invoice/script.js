function generateInvoice() {
    const clientName = document.getElementById("clientName").value;
    const clientAddress = document.getElementById("clientAddress").value;
    const service = document.getElementById("service").value;
    const description = document.getElementById("description").value;
    const rate = document.getElementById("rate").value;
    const quantity = document.getElementById("quantity").value;
    const paymentTerms = document.getElementById("paymentTerms").value;
    const dueDate = document.getElementById("dueDate").value;
    const discount = document.getElementById("discount").value;

    if (!clientName || !clientAddress || !service || !description || !rate || !quantity || !paymentTerms || !dueDate || !discount) {
        alert("Please fill in all fields.");
        return;
    }

    const url = `invoice.html?clientName=${encodeURIComponent(clientName)}&clientAddress=${encodeURIComponent(clientAddress)}&service=${encodeURIComponent(service)}&description=${encodeURIComponent(description)}&rate=${encodeURIComponent(rate)}&quantity=${encodeURIComponent(quantity)}&paymentTerms=${encodeURIComponent(paymentTerms)}&dueDate=${encodeURIComponent(dueDate)}&discount=${encodeURIComponent(discount)}`;

    window.location.href = url;
}

// Populate invoice with data from URL
window.onload = function () {
    const params = new URLSearchParams(window.location.search);

    document.getElementById("client-name").textContent = params.get("clientName") || "N/A";
    document.getElementById("client-address").textContent = params.get("clientAddress") || "N/A";
    document.getElementById("invoice-service").textContent = params.get("service") || "N/A";
    document.getElementById("invoice-description").textContent = params.get("description") || "N/A";

    const rate = parseFloat(params.get("rate")) || 0;
    const quantity = parseInt(params.get("quantity")) || 0;
    const discountPercent = parseFloat(params.get("discount")) || 0;
    const paymentTerms = params.get("paymentTerms") || "N/A";
    const dueDate = params.get("dueDate") || "N/A";

    const amount = rate * quantity;
    const discountAmount = (amount * discountPercent) / 100;
    const subtotalAfterDiscount = amount - discountAmount;
    const tax = subtotalAfterDiscount * 0.1; // 10% tax
    const total = subtotalAfterDiscount + tax;

    // Set text
    document.getElementById("invoice-rate").textContent = `₹${rate.toFixed(2)}`;
    document.getElementById("invoice-quantity").textContent = quantity;
    document.getElementById("invoice-amount").textContent = `₹${amount.toFixed(2)}`;
    document.getElementById("discount").textContent = `${discountPercent}%`;
    document.getElementById("payment-terms").textContent = paymentTerms;
    document.getElementById("due-date").textContent = dueDate;

    document.getElementById("sub-total").textContent = `₹${subtotalAfterDiscount.toFixed(2)}`;
    document.getElementById("tax").textContent = `₹${tax.toFixed(2)}`;
    document.getElementById("total").textContent = `₹${total.toFixed(2)}`;

    const today = new Date();
    const formattedDate = today.getDate().toString().padStart(2, '0') + '/' + 
                          (today.getMonth() + 1).toString().padStart(2, '0') + '/' + 
                          today.getFullYear();
    document.querySelector(".invoice-head-middle-left p").innerHTML = `<span class="text-bold">Date</span>: ${formattedDate}`;

    const invoiceNo = Math.floor(10000 + Math.random() * 90000);
    document.querySelector(".invoice-head-middle-right p").innerHTML = `<span class="text-bold">Invoice No:</span> ${invoiceNo}`;
};

// Print invoice
function printInvoice() {
    window.print();
}

// Download Invoice as PDF
const { jsPDF } = window.jspdf;

function downloadInvoice() {
    const invoice = document.getElementById("print-area");

    html2canvas(invoice, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("Invoice.pdf");
    });
}
