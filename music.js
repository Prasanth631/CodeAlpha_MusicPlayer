const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const volumeSlider = document.getElementById('volumeSlider');
const progressBar = document.querySelector('.progress');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const albumArt = document.getElementById('albumArt');
const songTitle = document.getElementById('songTitle');
const artistName = document.getElementById('artistName');

const playlist = [
    {
        title: "Shape of You",
        artist: "Ed Sheeran",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        cover: "https://upload.wikimedia.org/wikipedia/en/b/b4/Shape_Of_You_%28Official_Single_Cover%29_by_Ed_Sheeran.png"
    },
    {
        title: "Blinding Lights",
        artist: "The Weeknd",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        cover: "https://upload.wikimedia.org/wikipedia/en/e/e6/The_Weeknd_-_Blinding_Lights.png"
    },
    {
        title: "Dance Monkey",
        artist: "Tones and I",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        cover: "https://upload.wikimedia.org/wikipedia/en/1/1f/Dance_Monkey_by_Tones_and_I.jpg"
    },
    {
        title: "Someone You Loved",
        artist: "Lewis Capaldi",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        cover: "https://upload.wikimedia.org/wikipedia/en/a/a6/Lewis_Capaldi_-_Someone_You_Loved.png"
    },
    {
        title: "Bad Guy",
        artist: "Billie Eilish",
        src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        cover: "https://upload.wikimedia.org/wikipedia/en/3/3f/Billie_Eilish_-_Bad_Guy.png"
    }
];
let currentTrack = 0;

function loadTrack(trackIndex) {
    const track = playlist[trackIndex];
    audioPlayer.src = track.src;
    albumArt.src = track.cover;
    songTitle.textContent = track.title;
    artistName.textContent = track.artist;
    updatePlayPauseIcon();
}

function updatePlayPauseIcon() {
    if (audioPlayer.paused) {
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        albumArt.parentElement.classList.remove('playing');
    } else {
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        albumArt.parentElement.classList.add('playing');
    }
}

function playPauseTrack() {
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
    updatePlayPauseIcon();
}

function nextTrack() {
    currentTrack = (currentTrack + 1) % playlist.length;
    loadTrack(currentTrack);
    audioPlayer.play();
}

function prevTrack() {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrack);
    audioPlayer.play();
}

function updateProgress() {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.style.width = `${progress}%`;
    
    currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
    durationEl.textContent = formatTime(audioPlayer.duration);
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audioPlayer.duration;
    audioPlayer.currentTime = (clickX / width) * duration;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Event Listeners
playPauseBtn.addEventListener('click', playPauseTrack);
nextBtn.addEventListener('click', nextTrack);
prevBtn.addEventListener('click', prevTrack);
volumeSlider.addEventListener('input', () => audioPlayer.volume = volumeSlider.value / 100);
audioPlayer.addEventListener('timeupdate', updateProgress);
audioPlayer.addEventListener('ended', nextTrack);
document.querySelector('.progress-bar').addEventListener('click', setProgress);
loadTrack(currentTrack);