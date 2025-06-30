// // State management
let vehicles = JSON.parse(localStorage.getItem('parkingVehicles')) || [];
let searchTerm = '';

// DOM Elements
const showModalBtn = document.getElementById('showModalBtn');
const registrationModal = document.getElementById('registrationModal');
const closeModalBtn = document.querySelector('.close-modal');
const cancelFormBtn = document.getElementById('cancelFormBtn');
const vehicleForm = document.getElementById('vehicleForm');
const plateInput = document.getElementById('plateInput');
const searchInput = document.getElementById('searchInput');
const vehiclesList = document.getElementById('vehiclesList');
const noVehiclesMessage = document.getElementById('noVehiclesMessage');
const activeVehiclesEl = document.getElementById('activeVehicles');
const totalVehiclesEl = document.getElementById('totalVehicles');
const totalFilteredEl = document.getElementById('totalFiltered');
const vehicleTypeLabels = document.querySelectorAll('.vehicle-type-label');
const hiddenRadios = document.querySelectorAll('.hidden-radio');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderVehicles();
    startTimer();
    setupEventListeners();
});

function setupEventListeners() {
    // Modal functionality
    showModalBtn.addEventListener('click', () => {
        registrationModal.style.display = 'flex';
    });

    closeModalBtn.addEventListener('click', () => {
        closeModal();
    });

    cancelFormBtn.addEventListener('click', () => {
        closeModal();
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === registrationModal) {
            closeModal();
        }
    });

    // Vehicle form submission
    vehicleForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const plate = plateInput.value.trim().toUpperCase();
        const type = document.querySelector('input[name="type"]:checked').value;

        if (!plate) return;

        if (isPlateRegistered(plate)) {
            alert('Esta placa ya está registrada en el parqueadero');
            return;
        }

        if (plate.length != 6) {
            alert('Debe tener 6 caracteres');
            return;
        }

        const newVehicle = {
            id: Date.now(),
            plate,
            type,
            entryTime: new Date(),
            status: 'activo'
        };

        vehicles.push(newVehicle);
        saveToLocalStorage();
        renderStats();
        renderVehicles();
        closeModal();
    });

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        searchTerm = e.target.value.toLowerCase();
        renderVehicles();
    });

    // Vehicle type selection
    vehicleTypeLabels.forEach(label => {
        label.addEventListener('click', () => {
            // Remove selected class from all labels
            vehicleTypeLabels.forEach(l => l.classList.remove('selected'));
            // Add selected class to clicked label
            label.classList.add('selected');
            // Check the corresponding radio button
            const radio = label.querySelector('input[type="radio"]');
            radio.checked = true;
        });
    });
}

function closeModal() {
    registrationModal.style.display = 'none';
    vehicleForm.reset();
    // Reset to car selection
    document.querySelector('input[name="type"][value="carro"]').checked = true;
    vehicleTypeLabels[0].classList.add('selected');
    vehicleTypeLabels[1].classList.remove('selected');
}

// Helper Functions
function isPlateRegistered(plate) {
    return vehicles.some(vehicle =>
        vehicle.plate.toLowerCase() === plate.toLowerCase()
    );
}

function saveToLocalStorage() {
    localStorage.setItem('parkingVehicles', JSON.stringify(vehicles));
}

function renderStats() {
    const activeVehicles = vehicles.filter(v => v.status === 'activo').length;
    activeVehiclesEl.textContent = activeVehicles;
    totalVehiclesEl.textContent = vehicles.length;
}

function calculateTime(entryTime) {
    const now = new Date();
    const entry = new Date(entryTime);
    const diffMs = now - entry;
    const diffMins = Math.floor(diffMs / 60000);
    const hours = Math.floor(diffMins / 60);
    const minutes = diffMins % 60;

    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
}

function formatTime(date) {
    return new Date(date).toLocaleTimeString('es-CO', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

function handleDelete(id) {
    const vehicle = vehicles.find(v => v.id === id);
    if (vehicle) {
        const finalTime = calculateTime(vehicle.entryTime);
        const confirmMessage = `¿Estás seguro de que deseas eliminar este registro?\n\nPlaca: ${vehicle.plate}\nTiempo total: ${finalTime}`;

        if (confirm(confirmMessage)) {
            vehicles = vehicles.filter(vehicle => vehicle.id !== id);
            saveToLocalStorage();
            renderStats();
            renderVehicles();
        }
    }
}

function renderVehicles() {
    const filteredVehicles = vehicles.filter(vehicle =>
        vehicle.plate.toLowerCase().includes(searchTerm)
    );

    totalFilteredEl.textContent = `Total: ${filteredVehicles.length} vehículos`;

    if (filteredVehicles.length === 0) {
        noVehiclesMessage.style.display = 'block';
    } else {
        noVehiclesMessage.style.display = 'none';
    }

    vehiclesList.innerHTML = '';

    filteredVehicles.forEach(vehicle => {
        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>
                        <div class="vehicle-info">
                            <span class="status-indicator active"></span>
                            <span class="vehicle-plate">${vehicle.plate}</span>
                        </div>
                    </td>
                    <td>
                        <div class="vehicle-type">
                            <div class="type-icon ${vehicle.type === 'carro' ? 'car' : 'moto'}">
                                <i class="${vehicle.type === 'carro' ? 'fas fa-car' : 'fas fa-motorcycle'}"></i>
                            </div>
                            <span class="capitalize">${vehicle.type}</span>
                        </div>
                    </td>
                    <td class="entry-time">
                        ${formatTime(vehicle.entryTime)}
                    </td>
                    <td>
                        <span class="time-badge">
                            ${calculateTime(vehicle.entryTime)}
                        </span>
                    </td>
                    <td>
                        <button onclick="handleDelete(${vehicle.id})" class="delete-btn" title="Eliminar registro">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
        vehiclesList.appendChild(row);
    });
}

function startTimer() {
    setInterval(() => {
        renderVehicles();
    }, 60000);
}

// Make handleDelete globally accessible for onclick events
window.handleDelete = handleDelete;