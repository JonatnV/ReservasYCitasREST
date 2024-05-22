document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('work-hours-form').addEventListener('submit', configureWorkHours);
    document.getElementById('availability-form').addEventListener('submit', checkAvailability);
    document.getElementById('booking-form').addEventListener('submit', bookAppointment);
    document.getElementById('cancel-form').addEventListener('submit', cancelAppointment);
    document.getElementById('reschedule-form').addEventListener('submit', rescheduleAppointment);
});

function configureWorkHours(event) {
    event.preventDefault();
  
    alert('Franja horaria configurada.');
}

function checkAvailability(event) {
    event.preventDefault();
    // Implement the logic for checking availability
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    
    fetch(`/cita/disponibilidad?date=${date}&time=${time}`)
        .then(response => response.json())
        .then(data => {
            const results = document.getElementById('availability-results');
            results.innerHTML = data.available ? 'Disponible' : 'No Disponible';
        });
}

function bookAppointment(event) {
    event.preventDefault();
    // Implement the logic for booking an appointment
    const service = document.getElementById('service').value;
    const stylist = document.getElementById('stylist').value;
    const date = document.getElementById('booking-date').value;
    const time = document.getElementById('booking-time').value;
    const fecha = `${date}T${time}:00`;

    fetch('/cita', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ servicio: service, estilista: stylist, fecha: fecha })
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
    });
}

function cancelAppointment(event) {
    event.preventDefault();
    // Implement the logic for cancelling an appointment
    const id = document.getElementById('cancel-id').value;

    fetch(`/cita/borrar/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.error ? data.error : 'Cita Cancelada');
    });
}

function rescheduleAppointment(event) {
    event.preventDefault();
    // Implement the logic for rescheduling an appointment
    const id = document.getElementById('reschedule-id').value;
    const newDate = document.getElementById('new-date').value;
    const newTime = document.getElementById('new-time').value;
    const newFecha = `${newDate}T${newTime}:00`;

    fetch(`/cita/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id, fecha: newFecha })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.error ? data.error : 'Cita Reprogramada');
    });
}
