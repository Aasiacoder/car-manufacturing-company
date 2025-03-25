// import { db } from "./firebase-config.js";
 
 // Enable buttons after login
 document.getElementById("invoice-btn").disabled = false;
 document.getElementById("outvoice-btn").disabled = false;

 function showInvoiceManager() {
     window.location.href = "./invoice/index.html";
 }

 function showOutvoiceManager() {
     window.location.href = "./outvoice/index.html";
 }


//outvoice
// Generate outvoice function

// function generateOutvoice() {
//     const clientName = document.getElementById("client-name").value;
//     const carModel = document.getElementById("car-model").value;
//     const price = document.getElementById("price").value;

//     db.collection("outvoices").add({
//         // clientName,
//         // carModel,
//         // price,
//         clientName: clientName,
//         carModel: carModel,
//         price: price,
//         date: new Date().toLocaleDateString()
//     }).then(() => {
//         alert("Outvoice Generated!");
//         loadOutvoices(); // Refresh the list
//     }).catch((error) => {
//         console.error("Error adding document: ", error);
//     });
// }

// Load outvoices
// function loadOutvoices() {
//     db.collection("outvoices").get().then((querySnapshot) => {
//         const list = document.getElementById("outvoice-list");
//         list.innerHTML = ""; // Clear existing list before loading new data
//         querySnapshot.forEach((doc) => {
//             const data = doc.data();
//             list.innerHTML += `<li>${data.clientName} - ${data.carModel} - $${data.price} - ${data.date}</li>`;
//         });
//     }).catch((error) => {
//         console.error("Error fetching documents: ", error);
//     });
// }

// loadOutvoices();

// Call loadOutvoices when the page loads
// window.onload = loadOutvoices;

// Function to print invoice
function printInvoice(){
    window.print();
}

