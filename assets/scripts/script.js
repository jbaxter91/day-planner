// Script that goes along with index.html
// This script is responsible for making the day planner interactable
// ==================================================================


// ----- Consts -------
    // Change this value to chang the starting time of the planner
const STARTING_HOUR = 7;
    // Change this value to chang the stopping time of the planner
const STOPPING_HOUR = 23;
    // Cached Reference to hours container
const HOURS_CONTAINER = $("#hoursContainer");

const CURRENT_DAY_DISPLAY = $("#currentDay");

const DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
// ----- END Const ------

    // New Date Object
var d = new Date();
    // Cache current hour
var curHour = d.getHours();
    // Cache Current Day
var curDay = d.getDay();

// Init
$(document).ready(function() {
    CURRENT_DAY_DISPLAY.text("Today is " + DAYS[d.getDay()] + ", " + MONTHS[d.getMonth()] + " " + curDay + ", " + d.getFullYear());
    RenderDay();

});

// Function to build the by the hour display
function RenderDay()
{
    for(var i = STARTING_HOUR; i <= STOPPING_HOUR; i++)
    {
        var row = $("<div>").addClass("row h-100 py-2");
        var timeCol = $("<div>").addClass("col-1 px-1 my-auto bold");
        timeCol.text(i);
        var inputCol = $("<div>").addClass("col px-1 my-auto");
        var inputElement = $("<input>").attr("data-hour",i);
        inputElement.attr("type", "text");
        inputElement.addClass("form-control");
        inputCol.append(inputElement);
        row.append(timeCol,inputCol);

        if(curHour > i)
        {
            inputElement.attr('readonly', true);
        }
        else
        {
            var buttonCol = $("<div>").addClass("col-1 px-1 my-auto ");
            var saveBtn = $("<button>").addClass("saveBtn btn my-auto");
            var saveIcon = $("<i>").addClass("fa fa-folder");
            buttonCol.append(saveBtn);
            saveBtn.append(saveIcon);
            row.append(buttonCol);
            
        }

        

        HOURS_CONTAINER.append(row);
    }
}

function LoadDayInfo()
{

}

function SaveDayInfo()
{

}
