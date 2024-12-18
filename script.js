// console.log("lets js");

async function getSongs() {
    
    let a = await fetch("http://127.0.0.1:5500/songs/")
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith(".mp3"))
        {
            songs.push(element.href.split("/songs/")[1])
        }
    }
    return songs;
}

async function main()
{// get the list of all the songs
    let songs = await getSongs()
    console.log(songs);

    let songUl = document.querySelector(".songList").getElementsByTagName("ul")[0];
    for (const song of songs) {
        songUl.innerHTML += `<li>
                <img class="invert" src="music.svg" alt="">
                <div class="info">
                  <div class="songName"> ${song.replace(/%.{2}/g," ")}</div>
                  <div>Adil</div>
                </div>
                <div class="playNow">
                  <span>Play Now</span>
                  <img class="invert" src="play.svg" alt="">
                </div> 
        </li>`;
        
    }

    // play the first song
    var audio = new Audio(songs[0])
    // audio.play();

    audio.addEventListener("loadeddata", ()=>{
        let duration = audio.duration;
        console.log(audio.duration, audio.currentSrc, audio.currentTime)
    })
}
main()
