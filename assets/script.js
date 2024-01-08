$( document ).ready(function() {
    // FUNCTION to show todays date in header
    function dateToday() {
        var today = dayjs().format('dddd, MMMM D') + ('th');
        $('#currentDay').text(today);
    };
    dateToday();

    // FUNCTION to dynamically add Form tag and other contents tags to existing container div 
    timeSlots.forEach(function(timeSlot) {
        // Add class to form tag and append to container div 
        var row = $('<form class="row">');
        $('.container').append(row);
        // Add attributes to label tag, add text and styling
        var hour = $('<label for="input" class="hour col-1">').text(timeSlot.name).css('textAlign', 'center');
        // Add attributes to textarea tag // Check past/present/future and assign class accordingly
        var currentHour = dayjs().format('HH');
        var plannerHour = timeSlot.hour;
        var eventInput = $('<textarea id="input" name="event-text" rows="3">').attr('index', timeSlot.slotNumber);
        if (plannerHour < currentHour) {
            eventInput.addClass('past col-10');
        } else if (plannerHour == currentHour) {
            eventInput.addClass('present col-10');
        } else {
            eventInput.addClass('future col-10');
        };
        // Add attributes to submit button, add index, remove border
        var submitButton = $('<input class="saveBtn col-1" type="submit" value="Save">').attr('index', timeSlot.slotNumber);
        submitButton.css({
            borderRight: 'none',
            borderTop: 'none',
            borderBottom: 'none',
        });
        // Append to form tag
        row.append(hour, eventInput, submitButton);
    });

    // FUNCTION to save to local storage
    function setLocalStorage() {
        localStorage.setItem('userInputs', JSON.stringify(timeSlots));
    };

    // FUNCTION to get data from local storage and add to textarea tag values
    function updateDisplay() {
        var getTimeSlots = JSON.parse(localStorage.getItem('userInputs'));
        $('.row #input').each(function(index) {
            $(this).text(getTimeSlots[index].input);
        });  
    };
    updateDisplay();
    
    // FUNCTION to update timeSlots.input fields and save user input to local storage
    $('.saveBtn').on('click', (event) => {
        event.preventDefault();
        $('.row #input').each(function(index) {
            timeSlots[index].input = $(this).val();
        }); 
        setLocalStorage();
    });
});