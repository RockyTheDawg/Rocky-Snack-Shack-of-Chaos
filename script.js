const dogPopout = document.querySelector("#dogPopout");
const moodCard = document.querySelector("#moodCard");
const treatBag = document.querySelector("#treatBag");
const foodGround = document.querySelector("#foodGround");
const noseButton = document.querySelector("#noseButton");
const backgroundNoseButton = document.querySelector("#backgroundNoseButton");
const secretPaw = document.querySelector("#secretPaw");
const autographPencil = document.querySelector("#autographPencil");
const autographLayer = document.querySelector("#autographLayer");
const debtCard = document.querySelector("#debtCard");
const hotdogRain = document.querySelector("#hotdogRain");
const title = document.querySelector("h1");
const originalTitleText = title.textContent;
const videoModal = document.querySelector("#videoModal");
const videoClose = document.querySelector("#videoClose");
const rickrollFrame = document.querySelector("#rickrollFrame");
const creditsButton = document.querySelector("#creditsButton");
const creditsModal = document.querySelector("#creditsModal");
const creditsClose = document.querySelector("#creditsClose");
const commandsButton = document.querySelector("#commandsButton");
const commandsModal = document.querySelector("#commandsModal");
const commandsClose = document.querySelector("#commandsClose");
const commandForm = document.querySelector("#commandForm");
const commandInput = document.querySelector("#commandInput");
const welcomeModal = document.querySelector("#welcomeModal");
const letsGoButton = document.querySelector("#letsGoButton");
const termsModal = document.querySelector("#termsModal");
const termsAccept = document.querySelector("#termsAccept");
const amazonPackage = document.querySelector("#amazonPackage");
const tacoRecipeButton = document.querySelector("#tacoRecipeButton");
const riverBadge = document.querySelector("#riverBadge");
const riverCameo = document.querySelector("#riverCameo");
const pawTrail = document.querySelector("#pawTrail");
const barkModal = document.querySelector("#barkModal");
const barkClose = document.querySelector("#barkClose");
const courtModal = document.querySelector("#courtModal");
const courtClose = document.querySelector("#courtClose");
const receipt = document.querySelector("#receipt");
const receiptLines = document.querySelector("#receiptLines");
const fortuneCookie = document.querySelector("#fortuneCookie");

let feedCount = 0;
let boopCount = 0;
let toastTimer;
let debtTimer;
let codeBuffer = "";
let treatCooldown = false;
let packageCooldown = false;
let fortuneCooldown = false;
let riverCooldown = false;
let riverWalksRight = true;
let autographCooldown = false;
let brainTimer;
let isNapping = false;
let receiptShown = false;
let courtShown = false;
const snackCombo = new Set();
const foodCounts = {};
const fortunes = [
  "A snack delayed is still a snack owed.",
  "Trust the fluffy one near the fridge.",
  "Your future contains crumbs and questionable choices.",
  "A closed treat bag is just a puzzle.",
  "Beware the orange. It knows too much.",
  "Today is a good day to feed Rocky twice.",
  "The path to wisdom is paved with fries.",
  "If lost, follow the paw prints."
];

const foods = [
  { icon: "🍔", name: "burger" },
  { icon: "🍊", name: "orange", forbidden: true },
  { icon: "🍞", name: "toast" },
  { icon: "🥐", name: "croissant" },
  { icon: "🦴", name: "bone" },
  { icon: "🥤", name: "soda" },
  { icon: "🥓", name: "bacon" },
  { icon: "🧀", name: "cheese" },
  { icon: "🍗", name: "drumstick" },
  { icon: "🌭", name: "hotdog" },
  { icon: "🥩", name: "steak" },
  { icon: "🍟", name: "fries" },
  { icon: "🥯", name: "bagel" },
  { icon: "🥞", name: "pancakes" },
  { icon: "🍕", name: "pizza" }
  const tacoRecipes = [
  "https://www.allrecipes.com/recipe/257865/easy-beef-street-tacos/",
  "https://www.allrecipes.com/recipe/245744/mexican-street-tacos/",
  "https://www.loveandlemons.com/tacos/",
  "https://www.delish.com/cooking/recipe-ideas/a19636089/baja-fish-tacos-recipe/",
  "https://www.foodnetwork.com/recipes/food-network-kitchen/chicken-tacos-recipe-2108574",
  "https://www.simplyrecipes.com/recipes/fish_tacos/",
  "https://www.gimmesomeoven.com/carnitas-recipe/",
  "https://cookieandkate.com/roasted-cauliflower-and-lentil-tacos/"
];

const randomTacoRecipe = tacoRecipes[Math.floor(Math.random() * tacoRecipes.length)];

function openRandomTacoRecipe() {
  setMood("Taco wisdom selected. Opening recipe...");
  window.open(randomTacoRecipe, "_blank", "noreferrer");
}
];

const moods = [
  "Rocky mood: hungry",
  "Rocky mood: snack detected",
  "Rocky mood: tail activated",
  "Rocky mood: tiny zoomies",
  "Rocky mood: full but watching you",
  "Rocky mood: plotting dessert"
];

function setMood(message, duration = 2400) {
  moodCard.textContent = message;
  moodCard.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => moodCard.classList.remove("show"), duration);
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function renderFoods() {
  const comboFoods = ["burger", "fries", "soda"].map((name) => foods.find((food) => food.name === name));
  const extras = shuffle(foods.filter((food) => !["burger", "fries", "soda"].includes(food.name))).slice(0, 3);
  const selected = shuffle([...comboFoods, ...extras]);
  foodGround.innerHTML = "";

  selected.forEach((food, index) => {
    const button = document.createElement("button");
    button.className = "food-item";
    button.type = "button";
    button.dataset.food = food.name;
    button.dataset.icon = food.icon;
    button.dataset.forbidden = String(Boolean(food.forbidden));
    button.style.setProperty("--slot", index);
    button.setAttribute("aria-label", `Toss ${food.name} to Rocky`);
    button.innerHTML = `<span class="food-icon">${food.icon}</span><span class="food-name">${food.name}</span>`;
    button.addEventListener("click", () => tossFood(button));
    foodGround.append(button);
  });
}

function showSnackDebt() {
  clearTimeout(debtTimer);
  debtCard.classList.add("show");
  debtTimer = setTimeout(() => debtCard.classList.remove("show"), 2600);
}

function showReceipt() {
  receiptLines.innerHTML = "";
  Object.entries(foodCounts).forEach(([food, count]) => {
    const line = document.createElement("span");
    line.textContent = `${food} x${count}`;
    receiptLines.append(line);
  });
  receipt.classList.add("show");
  setTimeout(() => receipt.classList.remove("show"), 5600);
}

function openCourt() {
  courtShown = true;
  courtModal.classList.add("show");
  courtModal.setAttribute("aria-hidden", "false");
}

function closeCourt() {
  courtModal.classList.remove("show");
  courtModal.setAttribute("aria-hidden", "true");
}

function triggerNap() {
  isNapping = true;
  dogPopout.classList.add("napping");
  setMood("Rocky is processing snacks...");
  setTimeout(() => {
    isNapping = false;
    dogPopout.classList.remove("napping");
    setMood("Rocky woke up and immediately remembered snacks.");
  }, 5000);
}

function tossFood(button) {
  if (isNapping) {
    setMood("Rocky is asleep. Snacks must wait 5 business seconds.");
    return;
  }
  if (button.classList.contains("tossing")) return;

  feedCount += 1;
  const food = button.dataset.food;
  const isForbiddenOrange = button.dataset.forbidden === "true";
  const mood = moods[Math.min(feedCount, moods.length - 1)];
  snackCombo.add(food);
  foodCounts[food] = (foodCounts[food] || 0) + 1;

  button.classList.add("tossing");
  dogPopout.classList.add("eating");

  if (isForbiddenOrange) {
    dogPopout.classList.add("confused");
    setMood("ugh healthy food detected! bleh");
  } else {
    setMood(`${mood}. ${food} accepted.`);
  }

  if (Math.random() < 0.18) setTimeout(showSnackDebt, 620);
  if (feedCount >= 10 && !receiptShown) {
    receiptShown = true;
    setTimeout(showReceipt, 500);
  }
  if (feedCount >= 14 && !courtShown) setTimeout(openCourt, 900);
  if (feedCount > 0 && feedCount % 16 === 0) setTimeout(triggerNap, 900);
  if (["burger", "fries", "soda"].every((item) => snackCombo.has(item))) {
    snackCombo.clear();
    setTimeout(() => setMood("maximum snack crime."), 620);
  }

  setTimeout(() => {
    button.classList.remove("tossing");
    dogPopout.classList.remove("eating", "confused");
  }, 820);
}

function boopRocky() {
  boopCount += 1;
  dogPopout.classList.add("booped");
  setTimeout(() => dogPopout.classList.remove("booped"), 420);

  if (boopCount >= 7) {
    setMood("Boop license revoked.");
    return;
  }
  setMood(`Boop ${boopCount}. Rocky is keeping records.`);
}

function flipRocky() {
  dogPopout.classList.remove("flipping");
  window.requestAnimationFrame(() => dogPopout.classList.add("flipping"));
  setTimeout(() => dogPopout.classList.remove("flipping"), 850);
}

function triggerZoomies() {
  document.body.classList.add("zoomies");
  dogPopout.classList.add("zooming");
  setMood("Hidden paw found. Zoomies authorized.");
  spawnPawTrail();
  setTimeout(() => {
    document.body.classList.remove("zoomies");
    dogPopout.classList.remove("zooming");
  }, 1800);
}

function stampRockyAutograph() {
  if (autographCooldown) {
    setMood("Rocky's autograph paw is re-inking. Try again in a sec.", 3000);
    return;
  }
  autographCooldown = true;
  const autograph = document.createElement("div");
  autograph.className = "rocky-autograph";
  autograph.style.left = `${12 + Math.random() * 68}%`;
  autograph.style.top = `${18 + Math.random() * 58}%`;
  autograph.style.rotate = `${-18 + Math.random() * 36}deg`;
  autograph.innerHTML = '<span class="paw-sign">🐾</span><span class="signature-text">Rocky was here</span>';
  autographLayer.append(autograph);
  setMood("Rocky signed the screen.");
  setTimeout(() => autograph.remove(), 5700);
  setTimeout(() => {
    autographCooldown = false;
  }, 5000);
}

function spawnPawTrail() {
  pawTrail.innerHTML = "";
  pawTrail.classList.add("show");
  Array.from({ length: 18 }, (_, index) => {
    const paw = document.createElement("span");
    paw.textContent = "🐾";
    paw.style.left = `${8 + Math.random() * 84}%`;
    paw.style.top = `${12 + Math.random() * 76}%`;
    paw.style.animationDelay = `${index * 45}ms`;
    paw.style.rotate = `${-24 + Math.random() * 48}deg`;
    pawTrail.append(paw);
    return paw;
  });
  setTimeout(() => {
    pawTrail.classList.remove("show");
    pawTrail.innerHTML = "";
  }, 2600);
}

function openTreatVideo() {
  if (treatCooldown) {
    setMood("Treat bag is cooling down. Try again in a sec.");
    return;
  }
  treatCooldown = true;
  setMood("You found the secret treat bag.");
  rickrollFrame.src = "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0&playsinline=1";
  videoModal.classList.add("show");
  videoModal.setAttribute("aria-hidden", "false");
  setTimeout(() => {
    treatCooldown = false;
  }, 5000);
}

function closeTreatVideo() {
  videoModal.classList.remove("show");
  videoModal.setAttribute("aria-hidden", "true");
  rickrollFrame.src = "";
}

function openCredits() {
  creditsModal.classList.add("show");
  creditsModal.setAttribute("aria-hidden", "false");
}

function closeCredits() {
  creditsModal.classList.remove("show");
  creditsModal.setAttribute("aria-hidden", "true");
}

function openCommands() {
  commandsModal.classList.add("show");
  commandsModal.setAttribute("aria-hidden", "false");
}

function closeCommands() {
  commandsModal.classList.remove("show");
  commandsModal.setAttribute("aria-hidden", "true");
}

function closeWelcome() {
  welcomeModal.classList.remove("show");
  welcomeModal.setAttribute("aria-hidden", "true");
}

function closeTerms() {
  termsModal.classList.remove("show");
  termsModal.setAttribute("aria-hidden", "true");
}

function showRiverBadge() {
  riverBadge.classList.add("show");
  setMood("Secret River credit found.");
  setTimeout(() => riverBadge.classList.remove("show"), 3200);
}

function tossRiverConfetti() {
  riverCameo.querySelectorAll(".river-confetti").forEach((piece) => piece.remove());
  const confetti = ["🎉", "✨", "🟦", "🟧", "🦴", "🍬"];
  Array.from({ length: 18 }, (_, index) => {
    const piece = document.createElement("span");
    piece.className = "river-confetti";
    piece.textContent = confetti[index % confetti.length];
    piece.style.setProperty("--confetti-x", `${-70 + Math.random() * 140}px`);
    piece.style.setProperty("--confetti-y", `${-90 - Math.random() * 80}px`);
    piece.style.animationDelay = `${180 + index * 62}ms`;
    riverCameo.append(piece);
    return piece;
  });
}

function triggerRiverCameo() {
  if (riverCooldown) {
    setMood("River is gathering confetti. Try again in a few seconds.", 3000);
    return;
  }
  riverCooldown = true;
  showRiverBadge();
  riverCameo.className = "river-cameo";
  riverCameo.offsetHeight;
  riverCameo.classList.add("show", riverWalksRight ? "left-to-right" : "right-to-left");
  tossRiverConfetti();
  riverWalksRight = !riverWalksRight;
  setTimeout(() => {
    riverCameo.className = "river-cameo";
    riverCameo.querySelectorAll(".river-confetti").forEach((piece) => piece.remove());
  }, 5600);
  setTimeout(() => {
    riverCooldown = false;
  }, 10000);
}

function showFortune() {
  if (fortuneCooldown) {
    setMood("Fortune cookie is cooling down. Try again in a sec.", 3000);
    return;
  }
  fortuneCooldown = true;
  const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
  fortuneCookie.classList.remove("cracked");
  window.requestAnimationFrame(() => fortuneCookie.classList.add("cracked"));
  setMood(`Rocky fortune: ${fortune}`, 10000);
  setTimeout(() => fortuneCookie.classList.remove("cracked"), 900);
  setTimeout(() => {
    fortuneCooldown = false;
  }, 5000);
}

function openBarkTranslator() {
  barkModal.classList.add("show");
  barkModal.setAttribute("aria-hidden", "false");
  setMood("Bark Translator opened.");
}

function closeBarkTranslator() {
  barkModal.classList.remove("show");
  barkModal.setAttribute("aria-hidden", "true");
}

function amazonDomainForVisitor() {
  const locale = (navigator.language || "en-US").toLowerCase();
  const region = locale.split("-")[1] || "";
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  const regionMap = {
    ca: "amazon.ca",
    mx: "amazon.com.mx",
    gb: "amazon.co.uk",
    uk: "amazon.co.uk",
    au: "amazon.com.au",
    de: "amazon.de",
    fr: "amazon.fr",
    it: "amazon.it",
    es: "amazon.es",
    jp: "amazon.co.jp",
    br: "amazon.com.br",
    in: "amazon.in"
  };
  if (regionMap[region]) return regionMap[region];
  if (timeZone.includes("Canada")) return "amazon.ca";
  if (timeZone.includes("Mexico")) return "amazon.com.mx";
  return "amazon.com";
}

function openAmazonPackage() {
  if (packageCooldown) {
    setMood("Package scanner is cooling down. Try again in a sec.", 3000);
    return;
  }
  packageCooldown = true;
  const domain = amazonDomainForVisitor();
  setMood("Package inspected. Sending you to the nearest Amazon snack aisle.", 10000);
  window.open(`https://www.${domain}/s?k=dog+treats`, "_blank", "noreferrer");
  setTimeout(() => {
    packageCooldown = false;
  }, 5000);
}

function triggerAwoo() {
  title.classList.remove("awoo");
  dogPopout.classList.add("awoo-dog");
  window.requestAnimationFrame(() => title.classList.add("awoo"));
  setMood("Awooo mode activated.");
  setTimeout(() => {
    title.classList.remove("awoo");
    dogPopout.classList.remove("awoo-dog");
  }, 2600);
}

function triggerSquirrel() {
  setMood("SQUIRREL PROTOCOL.");
  dogPopout.classList.add("squirrel-mode");
  document.querySelectorAll("button").forEach((button, index) => {
    button.style.setProperty("--scatter-x", `${-80 + Math.random() * 160}px`);
    button.style.setProperty("--scatter-y", `${-55 + Math.random() * 110}px`);
    button.style.animationDelay = `${(index % 5) * 24}ms`;
    button.classList.add("scatter-button");
  });
  setTimeout(() => {
    dogPopout.classList.remove("squirrel-mode");
    document.querySelectorAll(".scatter-button").forEach((button) => {
      button.classList.remove("scatter-button");
      button.style.removeProperty("--scatter-x");
      button.style.removeProperty("--scatter-y");
      button.style.removeProperty("animation-delay");
    });
  }, 1800);
}

function triggerHotdogz() {
  hotdogRain.innerHTML = "";
  hotdogRain.classList.add("show");
  setMood("HOTDOGZ HAVE BREACHED CONTAINMENT.");

  Array.from({ length: 38 }, (_, index) => {
    const dog = document.createElement("span");
    dog.textContent = "🌭";
    dog.style.left = `${Math.random() * 100}%`;
    dog.style.animationDelay = `${Math.random() * 0.8}s`;
    dog.style.animationDuration = `${2.2 + Math.random() * 1.7}s`;
    dog.style.fontSize = `${1.3 + Math.random() * 1.8}rem`;
    dog.style.setProperty("--drift", `${-80 + Math.random() * 160}px`);
    hotdogRain.append(dog);
    return index;
  });

  setTimeout(() => {
    hotdogRain.classList.remove("show");
    hotdogRain.innerHTML = "";
  }, 4300);
}

function triggerBrainMode() {
  clearTimeout(brainTimer);
  title.textContent = "ONLY SNACKS.";
  title.classList.add("awoo");
  setMood("No Thoughts Mode: only snacks.");
  brainTimer = setTimeout(() => {
    title.textContent = originalTitleText;
    title.classList.remove("awoo");
  }, 4200);
}

function runTypedCommand(command, showUnknown = true) {
  const normalized = command.trim().toLowerCase();
  if (!normalized) return false;
  if (normalized.includes("awoo")) {
    triggerAwoo();
    return true;
  }
  if (normalized.includes("hotdogz")) {
    triggerHotdogz();
    return true;
  }
  if (normalized.includes("river")) {
    triggerRiverCameo();
    return true;
  }
  if (normalized.includes("bark")) {
    openBarkTranslator();
    return true;
  }
  if (normalized.includes("squirrel")) {
    triggerSquirrel();
    return true;
  }
  if (normalized.includes("brain")) {
    triggerBrainMode();
    return true;
  }
  if (showUnknown) setMood("Unknown command. Try AWOO, RIVER, BARK, HOTDOGZ, SQUIRREL, or BRAIN.", 4200);
  return false;
}

dogPopout.addEventListener("click", (event) => {
  if (event.target === noseButton) return;
  flipRocky();
});

noseButton.addEventListener("click", (event) => {
  event.stopPropagation();
  boopRocky();
});
if (backgroundNoseButton) {
  backgroundNoseButton.addEventListener("click", boopRocky);
}
secretPaw.addEventListener("click", triggerZoomies);
autographPencil.addEventListener("click", stampRockyAutograph);
treatBag.addEventListener("click", openTreatVideo);
videoClose.addEventListener("click", closeTreatVideo);
videoModal.addEventListener("click", (event) => {
  if (event.target === videoModal) closeTreatVideo();
});
creditsButton.addEventListener("click", openCredits);
creditsClose.addEventListener("click", closeCredits);
creditsModal.addEventListener("click", (event) => {
  if (event.target === creditsModal) closeCredits();
});
commandsButton.addEventListener("click", openCommands);
commandsClose.addEventListener("click", closeCommands);
commandsModal.addEventListener("click", (event) => {
  if (event.target === commandsModal) closeCommands();
});
commandForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (runTypedCommand(commandInput.value)) {
    commandInput.value = "";
    closeCommands();
  }
});
letsGoButton.addEventListener("click", closeWelcome);
termsAccept.addEventListener("click", closeTerms);
amazonPackage.addEventListener("click", openAmazonPackage);
tacoRecipeButton.addEventListener("click", openRandomTacoRecipe);
barkClose.addEventListener("click", closeBarkTranslator);
barkModal.addEventListener("click", (event) => {
  if (event.target === barkModal) closeBarkTranslator();
});
courtClose.addEventListener("click", closeCourt);
courtModal.addEventListener("click", (event) => {
  if (event.target === courtModal) closeCourt();
});
fortuneCookie.addEventListener("click", showFortune);

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && videoModal.classList.contains("show")) closeTreatVideo();
  if (event.key === "Escape" && creditsModal.classList.contains("show")) closeCredits();
  if (event.key === "Escape" && commandsModal.classList.contains("show")) closeCommands();
  if (event.key === "Escape" && barkModal.classList.contains("show")) closeBarkTranslator();
  if (event.key === "Escape" && courtModal.classList.contains("show")) closeCourt();
  if (event.key === "Escape" && termsModal.classList.contains("show")) closeTerms();
  if (event.target.matches("input, textarea")) return;
  codeBuffer = `${codeBuffer}${event.key.toLowerCase()}`.slice(-12);
  if (runTypedCommand(codeBuffer, false)) {
    codeBuffer = "";
  }
});

renderFoods();
