// Store salary details and navigate to salaryMaintenance.html
function calculateSalary() {
    const empName = document.getElementById("empName").value;
    const empId = document.getElementById("empId").value;
    const location = document.getElementById("location").value;
    const bankName = document.getElementById("bankName").value;
    const bankAcc = document.getElementById("bankAcc").value;
    const ifsc = document.getElementById("ifsc").value;
    const position = document.getElementById("position").value;
    const baseSalary = parseFloat(document.getElementById("baseSalary").value);
    const pf = (parseFloat(document.getElementById("pf").value) / 100) * baseSalary;
    const df = (parseFloat(document.getElementById("df").value) / 100) * baseSalary;
    const gst = (parseFloat(document.getElementById("gst").value) / 100) * baseSalary;
    const bonus = (parseFloat(document.getElementById("bonus").value) / 100) * baseSalary;

    const netSalary = baseSalary - pf - df - gst + bonus;

    localStorage.setItem("salaryData", JSON.stringify({
        empName, empId, location, bankName, bankAcc, ifsc, position,
        baseSalary, pf, df, gst, bonus, netSalary
    }));

    window.location.href = "salaryMaintenance.html";
}

// Load and display salary data in salaryMaintenance.html
window.onload = function () {
    const salaryData = JSON.parse(localStorage.getItem("salaryData"));
    if (!salaryData) return;

    document.getElementById("invoice-date").innerText = new Date().toLocaleDateString();
    document.getElementById("invoice-no").innerText = Math.floor(10000 + Math.random() * 90000);
    document.getElementById("emp-name").innerText = salaryData.empName;
    document.getElementById("emp-id").innerText = `ID: ${salaryData.empId}`;
    document.getElementById("emp-location").innerText = salaryData.location;
    document.getElementById("bank-name").innerText = salaryData.bankName;
    document.getElementById("bank-acc").innerText = `Acc: ${salaryData.bankAcc}`;
    document.getElementById("ifsc-code").innerText = `IFSC: ${salaryData.ifsc}`;
    document.getElementById("salary-base").innerText = `₹${salaryData.baseSalary.toFixed(2)}`;
    document.getElementById("salary-pf").innerText = `₹${salaryData.pf.toFixed(2)}`;
    document.getElementById("salary-df").innerText = `₹${salaryData.df.toFixed(2)}`;
    document.getElementById("salary-gst").innerText = `₹${salaryData.gst.toFixed(2)}`;
    document.getElementById("salary-bonus").innerText = `₹${salaryData.bonus.toFixed(2)}`;
    document.getElementById("salary-total").innerText = `₹${salaryData.netSalary.toFixed(2)}`;
};

// Print function
function printInvoice() {
    window.print();
}

// Function to download the invoice as a PDF
function downloadInvoice() {
    const { jsPDF } = window.jspdf;

    const invoice = document.getElementById("print-area");

    html2canvas(invoice, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("Salary_Invoice.pdf");
    });
}

// Set current date and generate invoice number
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("invoice-date").innerText = new Date().toLocaleDateString();
    document.getElementById("invoice-no").innerText = "INV-" + Math.floor(Math.random() * 1000000);

    // Sample Employee & Salary Data (Replace with real data if needed)
    document.getElementById("emp-name").innerText = "John Doe";
    document.getElementById("emp-id").innerText = "EMP-10234";
    document.getElementById("emp-location").innerText = "New York, USA";
    
    document.getElementById("bank-name").innerText = "ABC Bank";
    document.getElementById("bank-acc").innerText = "XXXX-XXXX-XXXX-5678";
    document.getElementById("ifsc-code").innerText = "ABC01234";

    // Salary Details (Example Calculation)
    let baseSalary = 50000;
    let pfDeduction = baseSalary * 0.12;
    let dfDeduction = baseSalary * 0.08;
    let gstDeduction = baseSalary * 0.05;
    let bonus = 5000;
    let netSalary = baseSalary - (pfDeduction + dfDeduction + gstDeduction) + bonus;

    document.getElementById("salary-base").innerText = "₹" + baseSalary.toLocaleString();
    document.getElementById("salary-pf").innerText = "-₹" + pfDeduction.toLocaleString();
    document.getElementById("salary-df").innerText = "-₹" + dfDeduction.toLocaleString();
    document.getElementById("salary-gst").innerText = "-₹" + gstDeduction.toLocaleString();
    document.getElementById("salary-bonus").innerText = "+₹" + bonus.toLocaleString();
    document.getElementById("salary-total").innerText = "₹" + netSalary.toLocaleString();
});

