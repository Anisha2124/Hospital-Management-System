const API = "http://localhost:5000/api/patients";

const form = document.getElementById("patientForm");
const table = document.getElementById("patientTable");

let editId = null;

// Load Patients
async function loadPatients() {

    try {

        const response = await fetch(API);
        const data = await response.json();

        table.innerHTML = "";

        data.patients.forEach(patient => {

            table.innerHTML += `
                <tr>
                    <td>${patient.name}</td>
                    <td>${patient.age}</td>
                    <td>${patient.gender}</td>
                    <td>${patient.phone}</td>
                    <td>${patient.disease}</td>
                    <td>${patient.address}</td>

                    <td>
                        <button onclick="editPatient('${patient._id}')">Edit</button>

                        <button onclick="deletePatient('${patient._id}')">Delete</button>
                    </td>
                </tr>
            `;

        });

    } catch (error) {

        console.log(error);

    }

}

loadPatients();


// Add / Update Patient

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const patient = {

        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        gender: document.getElementById("gender").value,
        phone: document.getElementById("phone").value,
        disease: document.getElementById("disease").value,
        address: document.getElementById("address").value

    };

    if (editId == null) {

        await fetch(API, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(patient)

        });

    } else {

        await fetch(`${API}/${editId}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(patient)

        });

        editId = null;

    }

    form.reset();

    loadPatients();

});


// Delete Patient

async function deletePatient(id) {

    if (!confirm("Delete this patient?")) return;

    await fetch(`${API}/${id}`, {

        method: "DELETE"

    });

    loadPatients();

}


// Edit Patient

async function editPatient(id) {

    const response = await fetch(`${API}/${id}`);

    const data = await response.json();

    const patient = data.patient;

    document.getElementById("name").value = patient.name;
    document.getElementById("age").value = patient.age;
    document.getElementById("gender").value = patient.gender;
    document.getElementById("phone").value = patient.phone;
    document.getElementById("disease").value = patient.disease;
    document.getElementById("address").value = patient.address;

    editId = patient._id;

}