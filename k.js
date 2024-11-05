const calendarElement = document.getElementById('calendar');
const eventForm = document.getElementById('event-form');
const eventTitleInput = document.getElementById('event-title');
const eventDateInput = document.getElementById('event-date');
const eventDescriptionInput = document.getElementById('event-description');
const saveEventButton = document.getElementById('save-event');
const cancelEventButton = document.getElementById('cancel-event');
let currentEventDate = null;

// Генерація календаря
function generateCalendar() {
    calendarElement.innerHTML = '';
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();

    // Визначаємо перший день місяця
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    // Додаємо пусті дні до календаря
    for (let i = 0; i < firstDay.getDay(); i++) {
        const emptyDiv = document.createElement('div');
        calendarElement.appendChild(emptyDiv);
    }

    // Додаємо дні місяця
    for (let day = 1; day <= daysInMonth; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'day';
        dayDiv.innerText = day;
        dayDiv.dataset.date = `${year}-${month + 1}-${day}`;
        
        // Додаємо події для конкретного дня
        const events = getEventsForDate(dayDiv.dataset.date);
        events.forEach(event => {
            const eventDiv = document.createElement('div');
            eventDiv.className = 'event';
            eventDiv.innerText = event.title;
            dayDiv.appendChild(eventDiv);
        });

        // Додавання обробника подій
        dayDiv.addEventListener('click', () => showEventForm(dayDiv.dataset.date));
        calendarElement.appendChild(dayDiv);
    }
}

// Показати форму для події
function showEventForm(date) {
    currentEventDate = date;
    eventForm.classList.remove('hidden');
    eventTitleInput.value = '';
    eventDescriptionInput.value = '';
    document.getElementById('form-title').innerText = 'Додати подію';
}

// Зберегти подію
saveEventButton.addEventListener('click', () => {
    const title = eventTitleInput.value;
    const description = eventDescriptionInput.value;

    if (title) {
        saveEvent(currentEventDate, title, description);
        eventForm.classList.add('hidden');
        generateCalendar();
    }
});

// Скасувати подію
cancelEventButton.addEventListener('click', () => {
    eventForm.classList.add('hidden');
});

// Зберігання подій у пам'яті
const events = {};

function saveEvent(date, title, description) {
    if (!events[date]) {
        events[date] = [];
    }
    events[date].push({ title, description });
}

// Отримати події для конкретної дати
function getEventsForDate(date) {
    return events[date] || [];
}

// Ініціалізація календаря
generateCalendar();