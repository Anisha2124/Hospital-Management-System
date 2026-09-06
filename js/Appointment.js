const API = "http://localhost:5000/api/appointments";
const PATIENT_API = "http://localhost:5000/api/patients";
const DOCTOR_API = "http://localhost:5000/api/doctors";

const form = document.getElementById("appointmentForm");
const table = document.getElementById("appointmentTable");

let editId = null;

// Load Patients
async function loadPatients() {

    const response = await fetch(PATIENT_API);
    const data = await response.json();

    const patientSelect = document.getElementById("patient");

    patientSelect.innerHTML =
        '<option value="">Select Patient</option>';

    data.patients.forEach(patient => {

        patientSelect.innerHTML += `
            <option value="${patient._id}">
                ${patient.name}
            </option>
        `;

    });

}

// Load Doctors
async function loadDoctors() {

    const response = await fetch(DOCTOR_API);
    const data = await response.json();

    const doctorSelect = document.getElementById("doctor");

    doctorSelect.innerHTML =
        '<option value="">Select Doctor</option>';

    data.doctors.forEach(doctor => {

        doctorSelect.innerHTML += `
            <option value="${doctor._id}">
                ${doctor.name}
            </option>
        `;

    });

}

// Load Appointments
async function loadAppointments() {

    const response = await fetch(API);
    const data = await response.json();

    table.innerHTML = "";

    data.appointments.forEach(appointment => {

        table.innerHTML += `

        <tr>

            <td>${appointment.patient.name}</td>

            <td>${appointment.doctor.name}</td>

            <td>${new Date(appointment.appointmentDate).toLocaleString()}</td>

            <td>${appointment.status}</td>

            <td>

                <button onclick="editAppointment('${appointment._id}')">
                    Edit
                </button>

                <button onclick="deleteAppointment('${appointment._id}')">
                    Delete
                </button>

            </td>

        </tr>

        `;

    });

}

// Initial Load
loadPatients();
loadDoctors();
loadAppointments();

// Save Appointment
form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const appointment = {

        patient: document.getElementById("patient").value,

        doctor: document.getElementById("doctor").value,

        appointmentDate: document.getElementById("appointmentDate").value,

        status: document.getElementById("status").value

    };

    if (editId == null) {

        await fetch(API, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(appointment)

        });

    } else {

        await fetch(`${API}/${editId}`, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(appointment)

        });

        editId = null;

    }

    form.reset();

    loadAppointments();

});

// Delete Appointment
async function deleteAppointment(id) {

    if (!confirm("Delete this appointment?")) return;

    await fetch(`${API}/${id}`, {

        method: "DELETE"

    });

    loadAppointments();

}

// Edit Appointment
async function editAppointment(id) {

    const response = await fetch(`${API}/${id}`);

    const data = await response.json();

    const appointment = data.appointment;

    document.getElementById("patient").value =
        appointment.patient._id;

    document.getElementById("doctor").value =
        appointment.doctor._id;

    document.getElementById("appointmentDate").value =
        appointment.appointmentDate.slice(0, 16);

    document.getElementById("status").value =
        appointment.status;

    editId = appointment._id;

}