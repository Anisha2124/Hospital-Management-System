const API = "http://localhost:5000/api/doctors";

const form = document.getElementById("doctorForm");
const table = document.getElementById("doctorTable");

let editId = null;

// Load Doctors
async function loadDoctors() {

    const response = await fetch(API);
    const data = await response.json();

    table.innerHTML = "";

    data.doctors.forEach(doctor => {

        table.innerHTML += `
        <tr>

            <td>${doctor.name}</td>
            <td>${doctor.specialization}</td>
            <td>${doctor.experience}</td>
            <td>${doctor.phone}</td>
            <td>${doctor.email}</td>

            <td>

                <button onclick="editDoctor('${doctor._id}')">Edit</button>

                <button onclick="deleteDoctor('${doctor._id}')">Delete</button>

            </td>

        </tr>
        `;

    });

}

loadDoctors();

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const doctor = {

        name: document.getElementById("name").value,
        specialization: document.getElementById("specialization").value,
        experience: document.getElementById("experience").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value

    };

    if (editId == null) {

        await fetch(API, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(doctor)

        });

    } else {

        await fetch(`${API}/${editId}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(doctor)

        });

        editId = null;

    }

    form.reset();

    loadDoctors();

});

async function deleteDoctor(id) {

    if (!confirm("Delete this doctor?")) return;

    await fetch(`${API}/${id}`, {

        method: "DELETE"

    });

    loadDoctors();

}

async function editDoctor(id) {

    const response = await fetch(`${API}/${id}`);

    const data = await response.json();

    const doctor = data.doctor;

    document.getElementById("name").value = doctor.name;
    document.getElementById("specialization").value = doctor.specialization;
    document.getElementById("experience").value = doctor.experience;
    document.getElementById("phone").value = doctor.phone;
    document.getElementById("email").value = doctor.email;

    editId = doctor._id;

}