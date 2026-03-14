let play = document.getElementById('play');
let progressBar = document.getElementById('progressBar');
let audio = new Audio('1.mp3');

let currentSong = 1;

play.addEventListener('click', () => {
    if (audio.paused || audio.currentTime == 0) {
        audio.play();
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');
    } else {
        audio.pause();
        play.classList.remove('fa-circle-pause');
        play.classList.add('fa-circle-play');
    }
});

audio.addEventListener('timeupdate', () => {
    let progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
    progressBar.style.background = `linear-gradient(to right, #21a600ff ${progress}%, #333 ${progress}%)`;
})

progressBar.addEventListener('input', function () {
    let value = this.value;
    this.style.background = `linear-gradient(to right, #21a600ff ${value}%, #333 ${value}%)`;
    audio.currentTime = (progressBar.value * audio.duration) / 100;
});

let playMusic = Array.from(document.getElementsByClassName('playMusic'));

makeAllPlay = () => {
    playMusic.forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

playMusic.forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlay();
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');

        index = parseInt(e.target.id);
        currentSong = index;
        audio.src = `${index}.mp3`;
        audio.currentTime = 0;
        audio.play();
        updateNowBar();
    })
});

let allMusic = Array.from(document.getElementsByClassName('music-card'));

songs = [
    { songName: 'Shape of you', songDes: 'One of the OG song relesed in 2017', songImage: '1.jpg', songPath: '1.mp3' },
    { songName: 'Metamorphosis', songDes: 'Best song for workout and driving', songImage: '2.jpg', songPath: '2.mp3' },
    { songName: 'Neon Blade', songDes: 'Fonk for workout and Driving', songImage: '3.jpg', songPath: '3.mp3' },
    { songName: 'Instrumental', songDes: 'Good for Rainy Night for a good Sleep', songImage: '4.jpg', songPath: '4.mp3' },
    { songName: 'We Dont Talk Anymore', songDes: 'Best While Travelling ', songImage: '5.jpg', songPath: '5.mp3' },
    { songName: 'Besabriyan', songDes: 'Motivate you for Your Goal', songImage: '6.jpg', songPath: '6.mp3' },
    { songName: 'yung kai', songDes: 'Depend on Your mood', songImage: '7.jpg', songPath: '7.mp3' },
    { songName: 'URI', songDes: 'URI The Surgical Strike', songImage: '8.jpg', songPath: '8.mp3' },
    { songName: 'Manzar Hai Yeh Naya', songDes: 'Left Your tiredness ', songImage: '9.jpg', songPath: '9.mp3' },
    { songName: 'Blur Bird ', songDes: 'Naruto theme song', songImage: '10.jpg', songPath: '10.mp3' },
    { songName: 'Apna Bana Le Piya', songDes: 'Apna Bna le', songImage: '11.jpg', songPath: '11.mp3' },
    { songName: 'E', songDes: 'I really wanna be yours ', songImage: '12.jpg', songPath: '12.mp3' },
    { songName: 'Akuma No Ko', songDes: 'Instrumental song of AOT', songImage: '13.jpg', songPath: '13.mp3' },
    { songName: 'Heat Waves', songDes: 'sometimes I think about you ', songImage: '14.jpg', songPath: '14.mp3' },
    { songName: 'instrumental 1', songDes: 'Just listen it', songImage: '15.jpg', songPath: '15.mp3' },
    { songName: 'Nandemoniya guitar', songDes: 'nandemoniya means winds', songImage: '16.jpg', songPath: '16.mp3' },
    { songName: 'Stan', songDes: 'Stan being Stan', songImage: '17.jpg', songPath: '17.mp3' },
    { songName: 'Cross Roads', songDes: 'we have to choose one thing', songImage: '18.jpg', songPath: '18.mp3' }
]

order = [...songs];

allMusic.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].songImage;
    element.getElementsByClassName('img-title')[0].innerText = songs[i].songName;
    element.getElementsByClassName('img-description')[0].innerText = songs[i].songDes;
});

let shuffle = document.getElementById('shuffle');
let repeat = document.getElementById('repeat');
let nowBar = document.querySelector('.now-bar');

let songOnRepeat = false;
let songOnShuffle = false;

function shuffleSongs (originalOrder) {
    order = [...originalOrder];
    for(i = order.length - 1; i > 0; i--){
        let j = Math.floor((Math.random) * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
    }
    return order;
}

shuffle.addEventListener('click', () => {
    if(!songOnShuffle) {
        songOnShuffle = true;
        songOnRepeat = false;
        shuffle.classList.add('active');
        repeat.classList.remove('active');

        order = shuffleSongs(songs);
    } else {
        songOnShuffle = false;
        shuffle.classList.remove('active');

        order = songs;
    }
});

repeat.addEventListener('click', () => {
    if(!songOnRepeat) {
        songOnRepeat = true;
        songOnShuffle = false;
        repeat.classList.add('active');
        shuffle.classList.remove('active');
    } else {
        songOnRepeat = false;
        repeat.classList.remove('active');
    }
})

playNextSong = () => {
    if(!songOnRepeat){
        let nextSong = (currentSong + 1) % playMusic.length;
        currentSong = nextSong == 0 ? 18 : nextSong;
    
        audio.src = order[currentSong-1].songPath;
        audio.currentTime = 0;
        audio.play();
        updateNowBar();
    } else {
        audio.src = order[currentSong-1].songPath;
        audio.currentTime = 0;
        audio.play();
        updateNowBar();
    }
}

playPrevSong = () => {
    let prevSong = (currentSong - 1);
    currentSong = prevSong == 0 ? 18 : prevSong;
    audio.src = `${currentSong}.mp3`;
    audio.currentTime = 0;
    audio.play();
    updateNowBar();
}

function updateNowBar () {
    nowBar.getElementsByTagName('img')[0].src = order[currentSong-1].songImage;
    nowBar.getElementsByClassName('img-title-info')[0].innerText = order[currentSong-1].songName;
    nowBar.getElementsByClassName('img-des-info')[0].innerText = order[currentSong-1].songDes;
}

forward = document.getElementById('forward');
backward = document.getElementById('backward');

forward.addEventListener('click', () => {
    playNextSong();
});

audio.addEventListener('ended', () => {
    playNextSong();
});

backward.addEventListener('click', () => {
    playPrevSong();
});

