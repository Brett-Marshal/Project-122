screen_height = 0;
screen_width = 0;

draw_apple = "";
speak_data = "";
to_number = "";

    SpeechRecognition = window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();

function preload()
{
    Apple_img = loadImage("apple.png");
}

function draw_btn()
{
    document.getElementById("status").innerHTML = "The System is Listening, so please Speak";
    recognition.start();
}

recognition.onresult = function(event)
{
    console.log(event);

    content = event.results[0][0].transcript;
    console.log("The Speech has been identified as " + content);
    document.getElementById("status").innerHTML = "The Speech has been identified as " + content;

    to_number = Number(content);

    if(Number.isInteger(to_number))
    {
        document.getElementById("status").innerHTML = "Started draw Apples";
        draw_apple = "set";
    }
    else
    {
        document.getElementById("status").innerHTML = "The Speech hasn't recognised a number";
    }
}

function setup()
{
    screen_width = window.innerWidth;
    screen_height = window.innerHeight;
    canvas = createCanvas(screen_width, screen_height - 150);
    canvas.position(0, 150);
}

function draw()
{
    if(draw_apple == "set")
    {
        for(var i = 1; i <= to_number; i++)
        {
            x = Math.floor(Math.random() * 1300);
            y = Math.floor(Math.random() * 400);
            image(Apple_img, x, y, 50, 50);
            draw_apple = "";
        }

        document.getElementById("status").innerHTML = to_number + "Apples drawn";
        speak_data = to_number + "Apples drawn";
        speak();
        draw_apple = "";
    }
}

function speak()
{
    synth = window.speechSynthesis;
    utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    speak_data = "";
}