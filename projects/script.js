function speak(text) {
  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(text);
  synth.speak(utter);
}

function startListening() {
  const status = document.getElementById("status");
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();
  status.innerText = "🎧 Listening...";

  recognition.onresult = function (event) {
    const command = event.results[0][0].transcript.toLowerCase();
    status.innerText = `✅ You said: "${command}"`;
    processCommand(command);
  };

  recognition.onerror = function (event) {
    status.innerText = "❌ Error: " + event.error;
  };
}
function processCommand(rawCommand) {
  rawCommand = rawCommand.toLowerCase();


  // 🎯 Remove the wake word and trim
  const command = rawCommand.replace("hey cherry", "").trim();

  if (command.includes("time")) {
    const now = new Date().toLocaleTimeString();
    speak("The current time is " + now);

  } else if (command.includes("date")) {
    const today = new Date().toLocaleDateString();
    speak("Today's date is " + today);

  } else if (command.includes("day")) {
    const day = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    speak("Today is " + day);

  } else if (command.includes("open youtube")) {
    speak("Opening YouTube");
    window.open("https://www.youtube.com", "_blank");

  } else if (command.includes("open google")) {
    speak("Opening Google");
    window.open("https://www.google.com", "_blank");

  } else if (command.includes("open facebook")) {
    speak("Opening Facebook");
    window.open("https://www.facebook.com", "_blank");

  } 
  else if (command.includes("open whatsapp")) {
    speak("Opening whatsapp");
    window.open("https://www.whatsapp.com", "_blank");
  }
  else if (command.includes("search for")) {
    const searchQuery = command.replace("search for", "").trim();
    if (searchQuery) {
      speak("Searching for " + searchQuery);
      window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, "_blank");
    } else {
      speak("Please say something to search for.");
    }

  } else if (command.includes("who are you")) {
    speak("I am Cherry, your personal voice assistant created by Srinivas Raju.");

  } else if (command.includes("how are you")) {
    speak("I'm feeling helpful! Thanks for asking.");

  } else if (command.includes("play kingdom song")) {
    speak("playing the song");
    window.open("https://youtu.be/dRBowc83jVs?si=gkFKxZENoQwk5nJz", "_blank");

  } else if (command.includes("tell me a joke")) {
    const jokes = [
      "Why don’t skeletons fight each other? They don’t have the guts.",
      "What do you call fake spaghetti? An impasta!",
      "Why can't your nose be 12 inches long? Because then it would be a foot!"
    ];
    speak(jokes[Math.floor(Math.random() * jokes.length)]);

  } else if (command.includes("weather")) {
    speak("Here is the weather.");
    window.open("https://www.google.com/search?q=weather", "_blank");

  } else if (command.includes("news")) {
    speak("Here is the latest news.");
    window.open("https://news.google.com", "_blank");

  } else if (command.includes("open gmail")) {
    speak("Opening Gmail.");
    window.open("https://mail.google.com", "_blank");

  } else if (command.includes("what can you do")) {
    speak("I can tell the time, date, jokes, weather, search the web, open sites and more!");

  } else if (command.includes("set alarm")) {
    speak("Alarm feature is not available in this version, but I can remind you later.");

  }
  else if (command.includes("thank you")) {
    speak("Its Ok I'm glad here to help you");
  }
   else {
    speak("Sorry, I didn't get that. Please try another command.");
  }
}
