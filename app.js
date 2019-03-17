
var config = {
    apiKey: "AIzaSyCYxxBpdhkWjJVI61ZOnN5liVy5gXSgH6I",
    authDomain: "something-something-3c7ef.firebaseapp.com",
    databaseURL: "https://something-something-3c7ef.firebaseio.com",
    projectId: "something-something-3c7ef",
    storageBucket: "something-something-3c7ef.appspot.com",
    messagingSenderId: "332814071701"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    var trainName = $("#train-name-input").val();
    var trainDestination = $("#destination-input").val();
    var trainStart = moment($("#start-input").val(), "HH:mm").format("X");
    var trainFreq = $("#freq-input").val();
  
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      start: trainStart,
      freq: trainFreq
    };
  
    database.ref().push(newTrain);
  
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.freq);
  
    alert("train successfully added");
  
    
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#freq-input").val("");
  });
  
  
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
    
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainFreq = childSnapshot.val().freq;
  
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainStart);
    console.log(trainFreq);
    
    var trainStartPretty = moment(trainStart, "HH:mm").subtract(1, "years");

    var diffTime = moment().diff(moment(trainStartPretty), "minutes")
    var timeRemain = diffTime % trainFreq; 
    var tMinAway = trainFreq - timeRemain;
    var nextTrain = moment().add(tMinAway, "minutes").format("HH:mm");

  
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainFreq),
      $("<td>").text(nextTrain),
      $("<td>").text(tMinAway)
    );
  
    $("#train-table > tbody").append(newRow);
  });
  