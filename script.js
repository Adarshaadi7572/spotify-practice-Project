console.log("Welcome to Spotify");
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));


let songs = [
    {songName: "legendary-cinematic-piano", filePath: "songs/1.mp3", coverpath:"covers/1.jpg"},
    {songName: "motivational-electronic-distant", filePath: "songs/2.mp3", coverpath:"covers/2.jpg"},
    {songName: "music", filePath: "songs/3.mp3", coverpath:"covers/3.jpg"},
    {songName: "one-last-time", filePath: "songs/4.mp3", coverpath:"covers/4.jpg"},
    {songName: "peaceful-cinematic", filePath: "songs/5.mp3", coverpath:"covers/5.jpg"},
    {songName: "stomp-rap-adrenaline", filePath: "songs/6.mp3", coverpath:"covers/6.jpg"},
]
songItems.forEach((element, i) => {
// console.log(element, i);
element.getElementsByTagName("img")[0].src = songs[i].coverpath;
element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
// Handle play/pause click 
masterPlay.addEventListener('click', ()=> {
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})
// Listen to Event 
audioElement.addEventListener('timeupdate' , ()=> {
//update seekbar
  progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
  myProgressBar.value = progress;

})
myProgressBar.addEventListener('change' ,()=>{
   audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})
// audioElement.play();
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.classList.remove('fa-circle-pause');
    element.classList.add('fa-circle-play');

    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click' , (e)=>{
       // console.log(e.target); //e.target karne se jab bhi play button per click karge use wo console per specificly show kar dega
      if(audioElement.paused || audioElement.currentTime<=0){
       makeAllPlays();
       songIndex = parseInt(e.target.id);

       e.target.classList.remove('fa-circle-play')
        e.target.classList.add('fa-circle-pause')
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;

        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
      }
    //   else if(audioElement.currentTime != 0 && ){

    //   }
      
      else{
         audioElement.pause();
         e.target.classList.remove('fa-circle-pause')
         e.target.classList.add('fa-circle-play')
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
      }

    })
})
document.getElementById('next').addEventListener('click' , ()=>{

    if(songIndex>=5){
        songIndex=0;
    }
    else{
        songIndex += 1;
    }
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

})
document.getElementById('previous').addEventListener('click' , ()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex -= 1;
    }
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})