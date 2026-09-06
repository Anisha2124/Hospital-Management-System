const BILLING_API = "http://localhost:5000/api/billing";
const PATIENT_API = "http://localhost:5000/api/patients";

let allBills = [];


// ===============================
// Load Billing Records
// ===============================

async function loadBills() {

    try {

        const response = await fetch(BILLING_API);

        const data = await response.json();

        console.log("Billing Response:", data);

        if (!response.ok) {

            throw new Error(data.message || "Unable to load bills");

        }

        allBills = data.bills || [];

        displayBills(allBills);

        updateBillingStatistics(allBills);

    } catch (error) {

        console.error("Billing Error:", error);

        document.getElementById("billingTable").innerHTML = `
            <tr>
                <td colspan="6" class="error">
                    Unable to load billing records.
                </td>
            </tr>
        `;

    }

}


// ===============================
// Display Bills
// ===============================

function displayBills(bills) {

    const table = document.getElementById("billingTable");

    table.innerHTML = "";

    if (bills.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="6" class="empty">
                    No billing records found.
                </td>
            </tr>
        `;

        return;

    }


    bills.forEach((bill, index) => {

        const patientName =
            bill.patient?.name || "Unknown Patient";

        const date = bill.createdAt
            ? new Date(bill.createdAt).toLocaleDateString("en-IN")
            : "-";


        const statusClass =
            bill.status === "Paid"
                ? "paid"
                : "pending";


        table.innerHTML += `

            <tr>

                <td>${index + 1}</td>

                <td>
                    <strong>${patientName}</strong>
                </td>

                <td>
                    ₹${Number(bill.amount).toLocaleString("en-IN")}
                </td>

                <td>
                    ${bill.paymentMethod}
                </td>

                <td>
                    <span class="status ${statusClass}">
                        ${bill.status}
                    </span>
                </td>

                <td>
                    ${date}
                </td>

            </tr>

        `;

    });

}


// ===============================
// Billing Statistics
// ===============================

function updateBillingStatistics(bills) {

    const total = bills.length;

    const paid = bills.filter(
        bill => bill.status === "Paid"
    ).length;

    const pending = bills.filter(
        bill => bill.status === "Pending"
    ).length;


    const revenue = bills
        .filter(bill => bill.status === "Paid")
        .reduce(
            (sum, bill) => sum + Number(bill.amount || 0),
            0
        );


    document.getElementById("totalBills").innerText = total;

    document.getElementById("paidBills").innerText = paid;

    document.getElementById("pendingBills").innerText = pending;

    document.getElementById("totalRevenue").innerText =
        "₹" + revenue.toLocaleString("en-IN");

}


// ===============================
// Load Patients
// ===============================

async function loadPatients() {

    try {

        const response = await fetch(PATIENT_API);

        const data = await response.json();

        console.log("Patients:", data);

        const patientSelect =
            document.getElementById("patient");

        const patients = data.patients || [];

        patients.forEach(patient => {

            const option =
                document.createElement("option");

            option.value = patient._id;

            option.textContent =
                patient.name;

            patientSelect.appendChild(option);

        });

    } catch (error) {

        console.error(
            "Patient loading error:",
            error
        );

    }

}


// ===============================
// Create Bill
// ===============================

document
    .getElementById("billForm")
    .addEventListener("submit", async function(event) {

        event.preventDefault();


        const patient =
            document.getElementById("patient").value;

        const amount =
            document.getElementById("amount").value;

        const paymentMethod =
            document.getElementById("paymentMethod").value;

        const status =
            document.getElementById("status").value;


        if (!patient || !amount || !paymentMethod) {

            alert("Please fill all required fields.");

            return;

        }


        try {

            const response = await fetch(
                BILLING_API,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        patient,
                        amount: Number(amount),
                        paymentMethod,
                        status

                    })

                }
            );


            const data = await response.json();

            console.log("Create Bill:", data);


            if (!response.ok) {

                throw new Error(
                    data.message || "Failed to create bill"
                );

            }


            alert("Bill created successfully!");


            document
                .getElementById("billForm")
                .reset();


            closeBillForm();

            loadBills();


        } catch (error) {

            console.error(error);

            alert(
                "Error creating bill: " +
                error.message
            );

        }

    });


// ===============================
// Search Bills
// ===============================

function searchBills() {

    const search =
        document
            .getElementById("searchBill")
            .value
            .toLowerCase();


    const filtered =
        allBills.filter(bill => {

            const patientName =
                bill.patient?.name?.toLowerCase() || "";

            return patientName.includes(search);

        });


    displayBills(filtered);

}


// ===============================
// Form Controls
// ===============================

function openBillForm() {

    document
        .getElementById("billingForm")
        .classList.add("show");

}


function closeBillForm() {

    document
        .getElementById("billingForm")
        .classList.remove("show");

}


// ===============================
// Logout
// ===============================

function logout() {

    localStorage.removeItem("isLoggedIn");

    window.location.href = "login.html";

}


// ===============================
// Start
// ===============================

loadPatients();

loadBills();