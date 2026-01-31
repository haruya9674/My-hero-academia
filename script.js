const cards = document.querySelectorAll(".card");

cards.forEach(card => {
  const name = card.dataset.name;

  const speakName = () => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel(); // 連打対策
    const utter = new SpeechSynthesisUtterance(name);
    utter.lang = "en-US";
    utter.rate = 0.9;
    window.speechSynthesis.speak(utter);
  };

  const activate = () => {
    card.classList.toggle("active");
    speakName();
  };

  // クリック対応
  card.addEventListener("click", activate);

  // iOS Safari タップ安定化
  card.addEventListener("touchend", (e) => {
    e.preventDefault();
    activate();
  });
});
