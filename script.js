// Write your JavaScript code here!
function init() {
  const submitButton = document.getElementById("formSubmit");

  const submission = (event) => {
    event.preventDefault();
    let storedInputs = gatherInputs();

    if (typeof storedInputs !== 'undefined') {
      if (rightEquipment(storedInputs) === true) {
        launchCheckSuccessful(storedInputs);
        whereAreWeGoing()
      } else {
        thisLaunchHasGoneWrong(storedInputs);
      }
    }
  }

  const gatherInputs = () => {
    let infoArray = [];
    let deny = false;

    let pilotName = document.getElementById('pilotName').value;
    let copilotName = document.querySelector("input[name=copilotName]").value;
    let fuelLevel = parseFloat(document.querySelector("input[name=fuelLevel]").value);
    let cargoMass = parseFloat(document.querySelector("input[name=cargoMass]").value);

    infoArray.push(pilotName, copilotName, fuelLevel, cargoMass);

    deny = checkArray(infoArray)

    if (deny === false) {
      return infoArray;
    } else {
      return denyForm(infoArray);
    }

  }

  const checkArray = (currentArray) => {
    let result = false;

    let pilotName = currentArray[0];
    let copilotName = currentArray[1];
    let fuelNumber = currentArray[2];
    let massNumber = currentArray[3];

    if (pilotName === "" || copilotName === "" || isNaN(fuelNumber) === true || isNaN(massNumber) === true) {
      result = true;
    }

    return result;
  }

  const denyForm = (currentArray) => {
    let alertBuilder = "";

    if (currentArray[0] === "" && currentArray[1] === "" && isNaN(currentArray[2]) === true && isNaN(currentArray[3]) === true) {
      alertBuilder = "All fields are required";
    } else {
      alertBuilder = "Make sure to enter valid information for each field!"
    }
    document.getElementById('faultyItems').style.visibility = "hidden";
    let launchStatus = document.getElementById('launchStatus');

    launchStatus.style.color = "black";
    launchStatus.innerHTML = "Awaiting Information Before Launch"
    alert(alertBuilder);
    }

    const rightEquipment = (currentArray) => {
      let isOkay = true;
      let fuelNumber = currentArray[2]
      let cargoNumber = currentArray[3]

      if (fuelNumber < 10000 || cargoNumber > 10000) {
        isOkay = false;
      }

      return isOkay;
    }

    const thisLaunchHasGoneWrong = (currentArray) => {
      let launchStatus = document.getElementById('launchStatus');
      let faultyItems = document.getElementById('faultyItems');

      let pilotStatus = document.getElementById('pilotStatus');
      let copilotStatus = document.getElementById('copilotStatus');
      let fuelStatus = document.getElementById('fuelStatus');
      let cargoStatus = document.getElementById('cargoStatus');

      launchStatus.style.color = "red";
      launchStatus.innerHTML = "Shuttle not ready for launch!";

      faultyItems.style.visibility = "visible"

      pilotStatus.innerHTML = `Pilot ${currentArray[0]} is ready for launch`
      copilotStatus.innerHTML = `Co-pilot ${currentArray[1]} is ready for launch`
      if (currentArray[2] < 10000) {
        fuelStatus.innerHTML = "Not enough fuel for the journey!";
      } else {
        fuelStatus.innerHTML = "Fuel level high enough for launch.";
      }
      if (currentArray[3] > 10000) {
        cargoStatus.innerHTML = "Too much mass for the shuttle to take off!";
      } else {
        cargoStatus.innerHTML = "Cargo mass low enough for launch.";
      }

    }

    const launchCheckSuccessful = (currentArray) => {
      let launchStatus = document.getElementById('launchStatus');
      let faultyItems = document.getElementById('faultyItems');

      //ID grabbing
      let pilotStatus = document.getElementById('pilotStatus');
      let copilotStatus = document.getElementById('copilotStatus');
      let fuelStatus = document.getElementById('fuelStatus');
      let cargoStatus = document.getElementById('cargoStatus');



      faultyItems.style.visibility = "visible"

      launchStatus.style.color = "green";
      launchStatus.innerHTML = "Shuttle is ready for launch!";

      pilotStatus.innerHTML = `Pilot ${currentArray[0]} is ready for launch`
      copilotStatus.innerHTML = `Co-pilot ${currentArray[1]} is ready for launch`
      fuelStatus.innerHTML = "Fuel level high enough for launch.";
      cargoStatus.innerHTML = "Cargo mass low enough for launch.";

    }

    const whereAreWeGoing = () => {
      let url = "https://handlers.education.launchcode.org/static/planets.json"
      let randomNumber = Math.floor(Math.random() * 6)

      let missionTarget = document.getElementById("missionTarget");

      let planetPicker = fetch(url).then(function(response) {
        response.json().then(function(planetPicker){
          missionTarget.innerHTML = `
          <h2>Mission Destination</h2>
          <ol>
             <li>Name: ${planetPicker[randomNumber].name}</li>
             <li>Diameter: ${planetPicker[randomNumber].diameter}</li>
             <li>Star: ${planetPicker[randomNumber].star}</li>
             <li>Distance from Earth: ${planetPicker[randomNumber].distance}</li>
             <li>Number of Moons: ${planetPicker[randomNumber].moons}</li>
          </ol>
          <img src="${planetPicker[randomNumber].image}">
          `
        });

      });


    }

  submitButton.addEventListener("click", submission)
}

window.addEventListener("load", init);


/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
