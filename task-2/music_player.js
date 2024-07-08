document.addEventListener('DOMContentLoaded', () => {
    const current_song=document.getElementById('current_song')
    const audio = document.getElementById('audio');
    const playlistItems = document.querySelectorAll('#playlist-items li');
    const playPauseButton = document.getElementById('play-pause');
    const nextButton = document.getElementById('next');
    const volumeSlider = document.getElementById('volume');

    let currentIndex = -1;

    // Function to load and play a song
    const loadSong = (index) => {
        if (index === -1) {
            // No song selected, show a message
            current_song.textContent = "Select a song from the Playlist";
            return;
        }
        const selectedSong = playlistItems[index];
        current_song.textContent = `${selectedSong.textContent} - ${selectedSong.getAttribute('data-artist')}`;
        const songUrl = selectedSong.getAttribute('data-url');
        audio.src = songUrl;
        audio.play();
        currentIndex = index;
        playPauseButton.textContent = 'Pause';
    };

    // Add click event to each playlist item
    playlistItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            loadSong(index);
        });
    });

    // Play/Pause functionality
    playPauseButton.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playPauseButton.textContent = 'Pause';
        } else {
            audio.pause();
            playPauseButton.textContent = 'Play';
        }
    });

    // Next button functionality
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % playlistItems.length;
        loadSong(currentIndex);
    });

    // Volume control functionality
    volumeSlider.addEventListener('input', (event) => {
        audio.volume = event.target.value / 100;
    });

    loadSong(-1);  
    
    // Accessing and applying functionality to footer elements
    const footer = document.querySelector('footer');
    const controls = footer.querySelector('#controls');
});