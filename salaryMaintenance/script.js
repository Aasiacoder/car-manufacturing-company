function calculateSalary() {
    const empName = document.getElementById("empName").value;
    const empId = document.getElementById("empId").value;
    const location = document.getElementById("location").value;
    const bankName = document.getElementById("bankName").value;
    const bankAcc = document.getElementById("bankAcc").value;
    const ifsc = document.getElementById("ifsc").value;
    const position = document.getElementById("position").value;
    const baseSalary = parseFloat(document.getElementById("baseSalary").value);
    // const pf = (parseFloat(document.getElementById("pf").value) / 100) * baseSalary;
    // const df = (parseFloat(document.getElementById("df").value) / 100) * baseSalary;
    // const gst = (parseFloat(document.getElementById("gst").value) / 100) * baseSalary;
    const bonus = (parseFloat(document.getElementById("bonus").value) / 100) * baseSalary;
    // add new feature
    const workingDays = parseFloat(document.getElementById("workingDays").value);
    const absentDays = parseFloat(document.getElementById("absentDays").value);

    // const netSalary = baseSalary - pf - df - gst + bonus;

    // add new feature
    const pf = 0.12 * baseSalary;
    const df = 0.05 * baseSalary;
    const gst = 0.18 * baseSalary;

    const perDaySalary = baseSalary / workingDays;
    const absentDeduction = perDaySalary * absentDays;

    const totalDeductions = pf + df + gst + absentDeduction;

    const netSalary = baseSalary - totalDeductions + bonus;

    const salaryData = {
        empName, empId, location, bankName, bankAcc, ifsc, position, baseSalary, pf, df, gst, bonus,
        absentDays, workingDays, absentDeduction, totalDeductions, netSalary
    };

    localStorage.setItem("salaryData", JSON.stringify(salaryData));
    window.location.href = "salaryMaintenance.html";
    // 

    // localStorage.setItem("salaryData", JSON.stringify({
    //     empName, empId, location, bankName, bankAcc, ifsc, position,
    //     baseSalary, pf, df, gst, bonus, netSalary
    // }));

    window.location.href = "salaryMaintenance.html";
}





// Load and display salary data in salaryMaintenance.html
document.addEventListener("DOMContentLoaded", () => {
    const salaryData = JSON.parse(localStorage.getItem("salaryData"));
    // if (!salaryData) return;

    if (!salaryData) {
        console.error("Salary data not found in localStorage");
        return;  // Stop execution if no data
    }


    function formatCurrency(value) {
        return isNaN(value) || value == null ? "₹0.00" : `₹${Number(value).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
    }


    function setElementText(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.innerText = value;
        }
        // else {
        //     console.error(`Element with ID '${id}' not found`);
        // }
    }

    // Set invoice details    
    setTimeout(() => {

        setElementText("invoice-date", new Date().toLocaleDateString());
        setElementText("invoice-no", Math.floor(10000 + Math.random() * 90000));
        setElementText("emp-name", salaryData.empName || "N/A");
        setElementText("emp-id", salaryData.empId ? `ID: ${salaryData.empId}` : "ID: N/A");
        setElementText("emp-location", salaryData.location || "N/A");

        // Ensure Bank Details Exist Before Setting
        setElementText("bank-name", salaryData.bankName || "N/A");
        setElementText("bank-acc", salaryData.bankAcc ? `Acc: ${salaryData.bankAcc}` : "Acc: N/A");
        setElementText("ifsc-code", salaryData.ifsc ? `IFSC: ${salaryData.ifsc}` : "IFSC: N/A");

        // Set salary details
        setElementText("salary-base", formatCurrency(salaryData.baseSalary));
        // add new feature
        setElementText("workingDays", salaryData.workingDays || 0);
        setElementText("absentDays", salaryData.absentDays || 0);
        setElementText("absentDeduction", formatCurrency(salaryData.absentDeduction));
        // 
        setElementText("salary-pf", formatCurrency(salaryData.pf));
        setElementText("salary-df", formatCurrency(salaryData.df));
        setElementText("salary-gst", formatCurrency(salaryData.gst));
        setElementText("salary-bonus", formatCurrency(salaryData.bonus));
        setElementText("salary-total", formatCurrency(salaryData.netSalary));
    }, 200); // Small delay to ensure the DOM is fully ready

});

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
