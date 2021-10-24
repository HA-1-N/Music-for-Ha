// 1. Render Song
// 2. Scroll TOp (Tùy từng front)
// 3. Play/Pause Song,
// 4. CD rotate (Tùy từng front) || Input change  // Animate API
// 5. Next / Prev
// 6. Random
// 7. Next / Repeat when ended
// 8. Active Song
// 9. Scroll active song into view
//10. Play song when click


const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_MUSIC_KEY = 'PLAYER_MUSIC';

const dashboardEl = $('.dashboard');
const listMusicsEl = $('.js-list-music');
const headerNameMusicEl = $('.header-name-music');
const headerNameSingerEl = $('.header-name-singer');
const imgItemEl = $('.img-item');
const audioEl = $('#audio');
const btntoggleEl = $('.btn-toggle');
const progressEl = $('.progress');
const totalTimeEl = $('.total-time');
const currentTimeEl = $('.current-time');
const nextBtn = $('.btn-skip-forward');
const prevBtn = $('.btn-skip-backward');
const randomBtn = $('.random-item');
const redoBtn = $('.redo-item');
const playlistmusicEl = $('.play-list-music');
const oldHeartEl = $('.old-heart');
const newHeartEl = $('.new-heart');

const toolbarListEl = $('.toolbar-list');
const listMusicParentEl = $('.list-music');
const angledownBtn = $('.list-music-header-angle-down');

const app = {
    listMusics: [
        {
            location: "1",
            name: "Summertime",
            singer: "Cinnamons, Evening, Cinema",
            img: "./assets/imgs/picture_1.jpg",
            path: "./assets/music/Summertime-CinnamonsEveningCinema-6046288.mp3",
            time: "",
        },

        {
            location: "2",
            name: "Aloha",
            singer: "Pristin",
            img: "./assets/imgs/picture_2.jpg",
            path: "./assets/music/Aloha-Pristin-5130093.mp3",
            time: "",
        },

        {
            location: "3",
            name: "A lot like love",
            singer: "Baek Ah Yeon",
            img: "./assets/imgs/picture_3.jpg",
            path: "./assets/music/ALotLikeLoveMoonLoversScarletHeartRyeoOst-BaekAhYeon-4592142.mp3",
            time: "",
        },

        {
            location: "4",
            name: "Already One Year",
            singer: "Brown Eyes",
            img: "./assets/imgs/picture_4.jpg",
            path: "./assets/music/AlreadyOneYear-BrownEyes_3fcmp.mp3",
            time: "",
        },

        {
            location: "5",
            name: "Best Luck",
            singer: "Chen",
            img: "./assets/imgs/picture_5.jpg",
            path: "./assets/music/BestLuckItsOkayThatsLoveOST-ChenEXOM-3257348.mp3",
            time: "",
        },

        {
            location: "6",
            name: "I will go to you like the first snow",
            singer: "Eddy Kim",
            img: "./assets/imgs/picture_6.jpg",
            path: "./assets/music/IWillGoToYouLikeTheFirstSnowLive-EunJiAPink-5412374.mp3",
            time: "",
        },

        {
            location: "7",
            name: "On Rainy Day",
            singer: "Beast",
            img: "./assets/imgs/picture_7.jpg",
            path: "./assets/music/OnRainyDay-BEAST_382zy.mp3",
            time: "",
        },

        {
            location: "8",
            name: "Ring My Bell",
            singer: "Suzy",
            img: "./assets/imgs/picture_8.jpg",
            path: "./assets/music/RingMyBellUncontrollablyFondOST-SuzymissA-4500690.mp3",
            time: "",
        },

        {
            location: "9",
            name: "Say yes",
            singer: "Loco, Punch",
            img: "./assets/imgs/picture_9.jpg",
            path: "./assets/music/SayYesMoonLoversScarletHeartRyoOST-LocoPunch-4569672.mp3",
            time: "",
        },

        {
            location: "10",
            name: "You are so beautiful",
            singer: "Eddy Kim",
            img: "./assets/imgs/picture_10.jpg",
            path: "./assets/music/YouAreSoBeautifulGoblinOst-EddyKim-4717902.mp3",
            time: "",
        },

        {
            location: "11",
            name: "You (= i)",
            singer: "BolBBalgan4",
            img: "./assets/imgs/picture_11.jpg",
            path: "./assets/music/Youi-BolBBalgan4-4599250.mp3",
            time: "",
        },
    ],

    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRedo: false,
    isclickHeart: false,

    config: JSON.parse(localStorage.getItem(PLAYER_MUSIC_KEY)) || {},

    setConfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_MUSIC_KEY, JSON.stringify(this.config));
    },

    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.listMusics[this.currentIndex];
            }
        });
    },

    handleEvent: function () {

        const _this = this;

        btntoggleEl.onclick = function () {
            if (_this.isPlaying) {
                audioEl.pause();
            } else {
                audioEl.play();
            }
        }

        audioEl.onplay = function () {
            _this.isPlaying = true;
            dashboardEl.classList.add('playing');
        }

        audioEl.onpause = function () {
            _this.isPlaying = false;
            dashboardEl.classList.remove('playing');
        }

        audioEl.ontimeupdate = function (e) {

            let totalDurationTime = e.target.duration;
            let totalcurrentTime = audioEl.currentTime;

            if (totalDurationTime) {
                const progress = Math.floor((totalcurrentTime / totalDurationTime) * 100);
                progressEl.value = progress;
            }

            audioEl.addEventListener("loadeddata", function () {
                let totalDurationTimeload = audioEl.duration;
                let totalMinutesMusic = Math.floor(totalDurationTimeload / 60);
                let totalSecondsMusic = Math.floor(totalDurationTimeload % 60);
                if (totalSecondsMusic < 10) {
                    totalSecondsMusic = `0${totalSecondsMusic}`;
                }
                totalTimeEl.innerText = `${totalMinutesMusic}:${totalSecondsMusic}`;
            })


            let currentMinutesMusic = Math.floor(totalcurrentTime / 60);
            let currentSecondsMusic = Math.floor(totalcurrentTime % 60);
            if (currentSecondsMusic < 10) {
                currentSecondsMusic = `0${currentSecondsMusic}`;
            }
            currentTimeEl.innerText = `${currentMinutesMusic}:${currentSecondsMusic}`;
        }

        progressEl.oninput = function (e) {
            const progressTime = ((audioEl.duration / 100) * e.target.value);
            audioEl.currentTime = progressTime;
        }

        nextBtn.onclick = function () {
            if (_this.isRandom) {
                _this.randomSong();
            } else {
                _this.nextSong();
            }
            audioEl.play();
            _this.render();
            _this.scrollSong();
        }

        prevBtn.onclick = function () {
            if (_this.isRandom) {
                _this.randomSong();
            } else {
                _this.prevSong();
            }
            audioEl.play();
            _this.render();
            _this.scrollSong();
        }

        randomBtn.onclick = function () {
            _this.isRandom = !_this.isRandom;
            randomBtn.classList.toggle('active', _this.isRandom);
            _this.setConfig('isRandom', _this.isRandom);
        }

        redoBtn.onclick = function () {
            _this.isRedo = !_this.isRedo;
            redoBtn.classList.toggle('active', _this.isRedo);
            _this.setConfig('isRedo', _this.isRedo);
        }


        audioEl.onended = function () {
            if (_this.isRedo) {
                audioEl.play();
            } else {
                nextBtn.click();
            }
        }

        listMusicsEl.onclick = function (e) {
            const nodeSong = e.target.closest('.play-list-music:not(active)');  // closest chọn thành phần đầu tiên tính từ thành phần cha trở lên của chính thành phần được chọn
            if (nodeSong) {
                _this.currentIndex = Number(nodeSong.dataset.index);
                _this.loadcurrentMusic();
                audioEl.play();
                _this.render();
            }
        }

        toolbarListEl.onclick = function () {
            listMusicParentEl.classList.add('action');
        }

        angledownBtn.onclick = function () {
            listMusicParentEl.classList.remove('action');
        }

        oldHeartEl.onclick = function () {
            if (!_this.isclickHeart) {
                dashboardEl.classList.add('click');
            }
            _this.setConfig('isclickHeart', _this.isclickHeart)
        }

        newHeartEl.onclick = function () {
            if (!_this.isclickHeart) {
                dashboardEl.classList.remove('click');
            }
            _this.setConfig('isclickHeart', _this.isclickHeart)
        }
    },

    render: function () {
        const htmls = this.listMusics.map((song, index) => {
            return `
                <div class="play-list-music ${index === this.currentIndex ? 'active' : ''}" data-index=${index}>

                    <div class="music-location">${song.location}</div>

                    <div class="play-list-item">
                        <h4 class="music-name">${song.name}</h4>
                        <h5 class="singer-name">${song.singer}</h5>
                    </div>
                    <div class="play-list-icon">
                        <i class="ti-more-alt"></i>
                    </div>

                </div>
            `;
        });

        listMusicsEl.innerHTML = htmls.join('');
    },

    loadcurrentMusic: function () {
        headerNameMusicEl.innerText = this.currentSong.name;
        headerNameSingerEl.innerText = this.currentSong.singer;
        imgItemEl.src = this.currentSong.img;
        audioEl.src = this.currentSong.path;
    },

    loadConfig: function () {
        this.isRandom = this.config.isRandom;
        this.isRedo = this.config.isRedo;
        this.isclickHeart = this.config.isclickHeart;
    },

    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.listMusics.length) {
            this.currentIndex = 0;
        }
        this.loadcurrentMusic();
    },

    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.listMusics.length - 1;
        }
        this.loadcurrentMusic();
    },

    randomSong: function () {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.listMusics.length);
        } while (newIndex === this.currentIndex);
        this.currentIndex = newIndex;
        this.loadcurrentMusic();
    },

    scrollSong: function () {
        setTimeout(() => {
            if (this.currentIndex == 0) {
                $('.play-list-music.active').scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                });
            } else {
                $('.play-list-music.active').scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                });
            }
        }, 200);
    },

    start: function () {
        this.render();
        this.defineProperties();
        this.loadcurrentMusic();
        this.handleEvent();
        this.loadConfig();
        redoBtn.classList.toggle('active', this.isRedo);
        randomBtn.classList.toggle('active', this.isRandom);
    },
};

app.start();