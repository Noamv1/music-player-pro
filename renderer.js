let playlist = [];
let currentIndex = -1;

const audio = document.getElementById('audio-engine');
const uiPlaylist = document.getElementById('ui-playlist');

function saveLibrary() {
    window.api.save('library', playlist);
}

function loadLibrary() {
    const data = window.api.load('library');
    if (!data) return;

    playlist = data.map(t => ({
        ...t,
        url: null
    }));

    renderPlaylist();
}

function renderPlaylist() {
    uiPlaylist.innerHTML = '';

    playlist.forEach((track, index) => {
        const item = document.createElement('div');
        item.className = 'track-item';

        item.innerHTML = `
            <div>${track.title}</div>
            <div style="font-size:12px;color:gray">${track.artist}</div>
        `;

        item.onclick = () => playTrack(index);
        uiPlaylist.appendChild(item);
    });
}

function playTrack(index) {
    if (!playlist[index]) return;

    currentIndex = index;
    const track = playlist[index];

    if (!track.url) {
        alert("צריך לבחור מחדש את הקובץ");
        return;
    }

    audio.src = track.url;
    audio.play();
}

document.getElementById('file-input').addEventListener('change', (e) => {
    const files = Array.from(e.target.files);

    files.forEach(file => {
        const track = {
            title: file.name,
            artist: "לא ידוע",
            url: URL.createObjectURL(file)
        };

        playlist.push(track);
    });

    saveLibrary();
    renderPlaylist();
});

audio.onended = () => {
    playTrack(currentIndex + 1);
};

loadLibrary();
