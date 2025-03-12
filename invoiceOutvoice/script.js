 // index

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
function generateOutvoice() {
    const clientName = document.getElementById("client-name").value;
    const carModel = document.getElementById("car-model").value;
    const price = document.getElementById("price").value;

    db.collection("outvoices").add({
        clientName,
        carModel,
        price,
        date: new Date().toLocaleDateString()
    }).then(() => {
        alert("Outvoice Generated!");
        loadOutvoices();
    });
}

// Load outvoices
function loadOutvoices() {
    db.collection("outvoices").get().then((querySnapshot) => {
        const list = document.getElementById("outvoice-list");
        list.innerHTML = "";
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            list.innerHTML += `<li>${data.clientName} - ${data.carModel} - $${data.price} - ${data.date}</li>`;
        });
    });
}

loadOutvoices();




function printInvoice(){
    window.print();
}

