document.addEventListener("DOMContentLoaded", function () {
  // Floating animation for all animated text elements
  anime({
    targets: ".animated-text",
    translateY: ["-5px", "5px"],
    direction: "alternate",
    loop: true,
    easing: "easeInOutQuad",
    duration: 1500,
    delay: anime.stagger(100), // Stagger the animation for each heading
  });

  // Glow effect for all letters (without changing the text color)
  anime({
    targets: ".letters",
    opacity: [0.9, 1],
    easing: "easeInOutSine",
    duration: 3000,
    direction: "alternate",
    loop: true,
  });

});
