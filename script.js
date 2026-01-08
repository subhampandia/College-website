document.querySelectorAll(".marquee").forEach((marquee) => {
        const list = marquee.querySelector(".marquee-list");
        const clone = list.cloneNode(true);

        marquee.appendChild(clone);

        let position = 0;
        let height = list.offsetHeight;
        let speed = 0.5;
        let paused = false;

        clone.style.top = height + "px";

        function animate() {
          if (!paused) {
            position -= speed;

            if (Math.abs(position) >= height) {
              position = 0;
            }

            list.style.transform = `translateY(${position}px)`;
            clone.style.transform = `translateY(${position}px)`;
          }
          requestAnimationFrame(animate);
        }

        marquee.addEventListener("mouseenter", () => (paused = true));
        marquee.addEventListener("mouseleave", () => (paused = false));

        animate();
      });