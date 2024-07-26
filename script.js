document.addEventListener("DOMContentLoaded", function() {
    const groups = document.querySelectorAll('.comparison-group');
    
    groups.forEach(group => {
        const container = group.querySelector('.comparison-container');
        const sliderWrapper = container.querySelector('.slider-wrapper');
        const slider = container.querySelector('.slider');
        const video1 = container.querySelector('video:nth-child(1)');
        const video2 = container.querySelector('video:nth-child(2)');
        const playPauseBtn = group.querySelector('.playPauseBtn');
        const timeBar = group.querySelector('.timeBar');
        let isDragging = false;

        // Slider functionality
        sliderWrapper.addEventListener('mousedown', function(e) {
            isDragging = true;
            document.body.style.cursor = 'ew-resize';
        });

        document.addEventListener('mouseup', function(e) {
            isDragging = false;
            document.body.style.cursor = 'default';
        });

        document.addEventListener('mousemove', function(e) {
            if (!isDragging) return;

            let containerRect = container.querySelector('.comparison-video').getBoundingClientRect();
            let offset = e.clientX - containerRect.left;

            if (offset < 0) offset = 0;
            if (offset > containerRect.width) offset = containerRect.width;

            let offsetPercent = (offset / containerRect.width) * 100;

            sliderWrapper.style.left = offsetPercent + '%';
            video2.style.clipPath = `inset(0 ${100 - offsetPercent}% 0 0)`;
        });

        // Play/pause functionality
        playPauseBtn.addEventListener('click', function() {
            if (video1.paused) {
                video1.play();
                video2.play();
                playPauseBtn.textContent = 'Pause';
            } else {
                video1.pause();
                video2.pause();
                playPauseBtn.textContent = 'Play';
            }
        });

        // Time bar functionality
        video1.addEventListener('timeupdate', function() {
            const value = (video1.currentTime / video1.duration) * 100;
            timeBar.value = value;
        });

        timeBar.addEventListener('input', function() {
            const time = (timeBar.value / 100) * video1.duration;
            video1.currentTime = time;
            video2.currentTime = time;
        });

        // Synchronize video playback
        video1.addEventListener('play', function() {
            video2.play();
        });

        video1.addEventListener('pause', function() {
            video2.pause();
        });

        video1.addEventListener('seeked', function() {
            video2.currentTime = video1.currentTime;
        });
    });
});

