song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

left_wrist_score = 0;
right_Wrist_score = 0;

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(400,400);
    canvas.position(580,290);

    video = createCapture(VIDEO);
    video.hide()

    poseNet = ml5.poseNet(video,modelloaded);
    poseNet.on('pose',gotposes);

}

function modelloaded(){
    console.log("Model has loaded !!!")
}

function gotposes(results){
    if (results.length > 0){
        console.log(results);
        left_wrist_score= results[0].pose.keypoints[9].score;
        console.log("LEFT WRIST SCORE" + left_wrist_score);

        right_Wrist_score = results[0].pose.keypoints[10].score;
        console.log("RIGHT WRIST SCORE " + right_Wrist_score);


        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftWristX + "Left Wrist Y = " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("right Wrist X = " + rightWristX + "right Wrist Y = " + rightWristY);
    }
    
}


function draw(){
    image(video,0,0,400,400);

    stroke("black");
    fill("red");

    if(left_wrist_score > 0.2){
        circle(leftWristX-120,leftWristY - 10,20);
        left_wrist= Number(leftWristY);
        remove_decimal = floor(left_wrist);
        volume = remove_decimal/400;
        document.getElementById("volumee").innerHTML = "Volume = "+ volume;
        song.setVolume(volume);
        
    }

    if (right_Wrist_score > 0.2){
        circle(rightWristX,rightWristY,20)
            if (rightWristY > 0 && rightWristY <= 100){
                document.getElementById("speed").innerHTML = "Speed : 0.5x";
                song.rate(0.5);
            }
            else if (rightWristY > 100 && rightWristY <= 200){
                document.getElementById("speed").innerHTML = "Speed : 1x";
                song.rate(1);
            }
            else if (rightWristY > 200 && rightWristY <= 300){
                document.getElementById("speed").innerHTML = "Speed : 1.5x";
                song.rate(1.5);
            }
            else if (rightWristY > 300 && rightWristY <= 400){
                document.getElementById("speed").innerHTML = "Speed : 2x";
                song.rate(2);
            }
            else if (rightWristY > 400 ){
                document.getElementById("speed").innerHTML = "Speed : 2.5x";
                song.rate(2.5);
            }
        }
}

function play(){
    song.play();
    song.setVolume(1)
    song.rate(1);
}

function stop(){
    song.stop();
}