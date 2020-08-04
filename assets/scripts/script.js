// Script that goes along with index.html
// This script is responsible for making the day planner interactable
// ==================================================================


// ----- Consts -------
    // Change this value to chang the starting time of the planner
const STARTING_HOUR = 9;
    // Change this value to chang the stopping time of the planner
const STOPPING_HOUR = 17;
    // Cached Reference to hours container
const HOURS_CONTAINER = $("#hoursContainer");
    // Cached reference to current day display element
const CURRENT_DAY_DISPLAY = $("#currentDay");
    // Array used for displaying current day in text
const DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    // Array used for displaying current month in text
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
// ----- END Const ------

    // New Date Object
var d = new Date();
    // Cache current hour
var curHour = d.getHours();
    // Cache Current Day
var curDay = d.getDate();

// Init
$(document).ready(function() {
    CURRENT_DAY_DISPLAY.text("Today is " + DAYS[d.getDay()] + ", " + MONTHS[d.getMonth()] + " " + curDay + ", " + d.getFullYear());
    RenderDay();
    LoadDayInfo();

});

// Function to build the "by the hour" display
function RenderDay()
{
    for(var i = STARTING_HOUR; i <= STOPPING_HOUR; i++)
    {
        // Gross code... there has to be a better way
        var displayTime = i + "am";
        if(i > 12)
        {
            displayTime = (i-12) + "pm";
        }
        else if(i == 12)
        {
            displayTime = (i) + "pm";
        }
        // end gross code 
        
            // Create row for new hour elements
        var row = $("<div>").addClass("row h-100 py-2");
            // Create column element for time display
        var timeCol = $("<div>").addClass("col-1 px-0 my-auto bold text-right");
            // Add current time slot text to time element
        timeCol.text(displayTime);
            // Create column element for input display
        var inputCol = $("<div>").addClass("col px-1 my-auto");
            // Create the input element
        var inputElement = $("<textarea>").attr("id","input-" + i);
            // Add type of text to input element
        inputElement.attr("type", "text");
            // Add class form-control to input to make it stretch
        inputElement.addClass("form-control");
            // Attach input element to the input column element
        inputCol.append(inputElement);
            // Attach the first two elements to the row.. note save is missing because we might not display if its past its time
        row.append(timeCol,inputCol);

            // This is where we decide if the input should be read only and the button should exist or not
        if(curHour > i)
        {
            // Because its "past due" then we only flag the input as read only and dont create the button
            inputElement.attr('readonly', true);
            row.addClass("past");
        }
        else
        {
            if(curHour == i)
            {
                row.addClass("present");
            }
            else
            {
                row.addClass("future");
            }
            var buttonCol = $("<div>").addClass("col-1 px-1 my-auto ");
            var saveBtn = $("<button>").addClass("saveBtn btn my-auto");
            saveBtn.attr("data-value", i);
            saveBtn.on("click", function() {
                var btnValue = this.getAttribute("data-value")
                console.log($("#input-"+ btnValue).val());
                SaveHourInfo(btnValue, $("#input-"+ btnValue).val());
            });
            var saveIcon = $("<i>").addClass("fa fa-folder");
            buttonCol.attr("value", i);
            buttonCol.append(saveBtn);
            saveBtn.append(saveIcon);
            row.append(buttonCol);
            
        }

        

        HOURS_CONTAINER.append(row);
    }
}


// LoadDayInfo is used to load all the info to be filled into the per hour input fields
function LoadDayInfo()
{
    var savedDay = localStorage.getItem("day");
    console.log("curDay: " + curDay);
    if(!savedDay)
    {
        // No save data found, setting it to current day
        console.log("No Day set, setting it now");
        localStorage.setItem("day", curDay);
    }

    if(savedDay == curDay)
    {
        console.log("Same Day! Load Hourly Data");
        for(var i = 0; i < 24; i++)
        {
            var hour = $("#input-" + i);
            if(hour.length > 0)
            {
                var info = localStorage.getItem(i);
                if(info)
                {
                    hour.val(info);
                }
            }
            else
            {
                console.log("Hour not found!  " + i);
            }
        }
    }
    else
    {
        // Clear out save data
        console.log("Starting a new day!");
        localStorage.clear();
        localStorage.setItem("day", curDay);
    }
}

// Call this function to save the current hour and its data **note** must pass both hour and data to save
function SaveHourInfo(hour, data)
{
    localStorage.setItem(hour, data);
}
