const cards = document.querySelectorAll(".card");

let japaneseVoice = null;

// 日本語で一番やさそうな声を探す
function loadVoices() {
  const voices = speechSynthesis.getVoices();

  japaneseVoice = voices.find(v =>
    v.lang === "ja-JP" &&
    (v.name.includes("Kyoko") ||
     v.name.includes("Otoya") ||
     v.name.includes("Google") ||
     v.name.includes("Japanese"))
  ) || voices.find(v => v.lang === "ja-JP");
}

// iOS / Safari 対応
speechSynthesis.onvoiceschanged = loadVoices;
loadVoices();

cards.forEach(card => {
  const name = card.dataset.name;

  const speakName = () => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(name);

    // 🔑 ここが最重要
    utter.lang = "ja-JP";      // 日本語発音
    utter.rate = 0.8;          // ゆっくり
    utter.pitch = 0.95;        // やさしく
    utter.volume = 1.0;

    if (japaneseVoice) {
      utter.voice = japaneseVoice;
    }

    window.speechSynthesis.speak(utter);
  };

  const activate = () => {
    card.classList.toggle("active");
    speakName();
  };

  // クリック
  card.addEventListener("click", activate);

  // タップ（iOS安定化）
  card.addEventListener("touchend", (e) => {
    e.preventDefault();
    activate();
  });
});
