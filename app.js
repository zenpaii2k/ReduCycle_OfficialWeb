/* =========================================
   REDUCYCLE FRONT-END DEMO
   -----------------------------------------
   Currently uses simulated data.

   Later:
   ESP32 → Firebase → JavaScript → Dashboard
========================================= */


let isRunning = false;
let elapsedSeconds = 0;
let timer;


/* =========================================
   START
========================================= */

function startProcess() {

    if (isRunning) {
        return;
    }

    isRunning = true;

    document.getElementById("systemStatus").textContent = "RUNNING";
    document.getElementById("systemStatus").className =
        "status-badge running";

    document.getElementById("machineState").textContent =
        "PROCESSING";

    document.getElementById("connectionStatus").textContent =
        "DEMO MODE";

    startTimer();

    /*
        Later:

        Instead of only changing the webpage,
        this button could send a START command
        through Firebase to the ESP32.
    */

    simulateSoaking();
}


/* =========================================
   STOP
========================================= */

function stopProcess() {

    isRunning = false;

    clearInterval(timer);

    document.getElementById("systemStatus").textContent =
        "STOPPED";

    document.getElementById("systemStatus").className =
        "status-badge error";

    document.getElementById("machineState").textContent =
        "STOPPED";

    document.getElementById("currentProcess").textContent =
        "Process Stopped";

    document.getElementById("processDescription").textContent =
        "The recycling process has been stopped.";

    /*
        Future ESP32 command:

        sendCommand("STOP");
    */
}


/* =========================================
   RESET
========================================= */

function resetSystem() {

    isRunning = false;

    clearInterval(timer);

    elapsedSeconds = 0;

    document.getElementById("processingTime").textContent =
        "00:00";

    document.getElementById("systemStatus").textContent =
        "READY";

    document.getElementById("systemStatus").className =
        "status-badge ready";

    document.getElementById("machineState").textContent =
        "IDLE";

    document.getElementById("currentProcess").textContent =
        "Waiting for Start";

    document.getElementById("processDescription").textContent =
        "Place waste paper into the input area and start the recycling process.";

    /*
        Future ESP32 command:

        sendCommand("RESET");
    */
}


/* =========================================
   TIMER
========================================= */

function startTimer() {

    timer = setInterval(() => {

        if (!isRunning) {
            return;
        }

        elapsedSeconds++;

        let minutes =
            Math.floor(elapsedSeconds / 60);

        let seconds =
            elapsedSeconds % 60;

        minutes =
            String(minutes).padStart(2, "0");

        seconds =
            String(seconds).padStart(2, "0");

        document.getElementById("processingTime").textContent =
            `${minutes}:${seconds}`;

    }, 1000);
}


/* =========================================
   DEMO SOAKING PROCESS
========================================= */

function simulateSoaking() {

    updateProcess(
        "Soaking & Pulping",
        "Paper is being softened and processed into pulp.",
        "Soaking"
    );

    document.getElementById("waterLevel").textContent =
        "NORMAL";

    document.getElementById("pumpStatus").textContent =
        "ON";

    document.getElementById("motorStatus").textContent =
        "ON";

    /*
        This is only a visual simulation.

        Later, the values will come from
        ESP32/Firebase sensor data.
    */
}


/* =========================================
   PROCESS DISPLAY
========================================= */

function updateProcess(title, description, stage) {

    document.getElementById("currentProcess").textContent =
        title;

    document.getElementById("processDescription").textContent =
        description;

    resetProcessSteps();

    const stageMap = {

        "Input": "stepInput",

        "Soaking": "stepSoaking",

        "Water": "stepWater",

        "Sheet": "stepSheet",

        "Drying": "stepDrying"

    };

    const selectedStep =
        document.getElementById(stageMap[stage]);

    if (selectedStep) {

        selectedStep.classList.add("active");

        selectedStep.querySelector(".step-content p")
            .textContent = "PROCESSING";

        selectedStep.querySelector(".step-status")
            .textContent = "●";
    }
}


/* =========================================
   RESET PROCESS VISUALS
========================================= */

function resetProcessSteps() {

    const steps = document.querySelectorAll(".process-step");

    steps.forEach(step => {

        step.classList.remove("active");

    });
}


/* =========================================
   FUTURE ESP32 COMMUNICATION
=========================================

   Example concept:

   function sendCommand(command) {

       // Firebase / ESP32 communication
       // will eventually be placed here.

   }

========================================= */


/* =========================================
   FUTURE SENSOR UPDATE
=========================================

   Example of the data that the ESP32
   could eventually provide:

   {
       waterLevel: "NORMAL",
       paperDetected: true,
       pump: true,
       motor: true,
       press: false,
       stage: "SOAKING"
   }

   JavaScript would then update the
   dashboard automatically.

========================================= */
