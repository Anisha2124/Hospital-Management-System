let dashboardChart = null;

// ---------------- Dashboard ----------------

async function loadDashboard() {

    try {

        const response = await fetch("http://localhost:5000/api/dashboard");
        const data = await response.json();
        console.log("Dashboard Response:", data);

        document.getElementById("patientCount").innerText = data.patients;
        document.getElementById("doctorCount").innerText = data.doctors;
        document.getElementById("appointmentCount").innerText = data.appointments;
        document.getElementById("revenue").innerText = "₹" + data.revenue;

        loadChart(data);

    } catch (error) {

        console.error("Dashboard Error:", error);

    }

}

// ---------------- Chart ----------------

function loadChart(data) {

    const ctx = document.getElementById("dashboardChart").getContext("2d");

    if (dashboardChart) {
        dashboardChart.destroy();
    }

    dashboardChart = new Chart(ctx, {

        type: "bar",

        data: {

            labels: [
                "Patients",
                "Doctors",
                "Appointments"
            ],

            datasets: [

                {

                    label: "Hospital Statistics",

                    data: [
                        data.patients,
                        data.doctors,
                        data.appointments
                    ],

                    backgroundColor: [
                        "#0d6efd",
                        "#198754",
                        "#fd7e14"
                    ],

                    borderColor: [
                        "#0a58ca",
                        "#157347",
                        "#ca6510"
                    ],

                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false

                }

            ]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    display: false

                },

                title: {

                    display: true,
                    text: "Hospital Statistics"

                }

            },

            scales: {

                y: {

                    beginAtZero: true,

                    suggestedMax: Math.max(
                        data.patients,
                        data.doctors,
                        data.appointments
                    ) + 2,

                    ticks: {

                        stepSize: 1

                    }

                }

            }

        }

    });

}

// ---------------- Appointments ----------------

async function loadAppointments() {

    try {

        const response = await fetch("http://localhost:5000/api/appointments");

        const data = await response.json();

        const table = document.getElementById("appointmentTable");

        table.innerHTML = "";

        data.appointments.forEach(app => {

            let statusClass = "pending";

            if (app.status === "Completed") {

                statusClass = "completed";

            }

            if (app.status === "Cancelled") {

                statusClass = "cancelled";

            }

            table.innerHTML += `

            <tr>

                <td>${app.patient.name}</td>

                <td>${app.doctor.name}</td>

                <td>${new Date(app.appointmentDate).toLocaleDateString()}</td>

                <td class="${statusClass}">
                    ${app.status}
                </td>

            </tr>

            `;

        });

    } catch (error) {

        console.error(error);

    }

}

// ---------------- Date & Time ----------------

function updateDateTime() {

    const now = new Date();

    document.getElementById("currentDate").innerHTML =
        now.toLocaleDateString("en-IN", {

            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"

        });

    document.getElementById("currentTime").innerHTML =
        now.toLocaleTimeString();

}

setInterval(updateDateTime, 1000);

updateDateTime();

loadDashboard();

loadAppointments();