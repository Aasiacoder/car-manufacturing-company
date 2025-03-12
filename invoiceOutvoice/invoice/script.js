//  Update script.js to populate invoice details from URL parameters.

window.onload = function () {
    const params = new URLSearchParams(window.location.search);

    document.getElementById("client-name").textContent = params.get("clientName") || "N/A";
    document.getElementById("client-address").textContent = params.get("clientAddress") || "N/A";
    document.getElementById("invoice-service").textContent = params.get("service") || "N/A";
    document.getElementById("invoice-description").textContent = params.get("description") || "N/A";
    const rate = parseFloat(params.get("rate")) || 0;
    const quantity = parseInt(params.get("quantity")) || 0;
    const amount = rate * quantity;

    document.getElementById("invoice-rate").textContent = `₹${rate.toFixed(2)}`;
    document.getElementById("invoice-quantity").textContent = quantity;
    document.getElementById("invoice-amount").textContent = `₹${amount.toFixed(2)}`;

    // Calculate total
    const tax = amount * 0.1; // 10% tax
    const total = amount + tax;

    document.getElementById("sub-total").textContent = `₹${amount.toFixed(2)}`;
    document.getElementById("tax").textContent = `₹${tax.toFixed(2)}`;
    document.getElementById("total").textContent = `₹${total.toFixed(2)}`;
};

// print invoice
function printInvoice() {
    window.print();
}

// download invoice
// Download Invoice as PDF

const { jsPDF } = window.jspdf; //jsPDF

function downloadInvoice() {
    const invoice = document.getElementById("print-area");

    html2canvas(invoice, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("Invoice.pdf");
    });
}


