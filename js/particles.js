/**
 * Seasonal background particles for the About Me (#Home) section.
 *
 * Snow during the winter holidays; confetti and balloons on the birthday.
 * The active season is resolved before body paint by the inline script in
 * index.html, so this just reads window.__activeSeason rather than recomputing
 * the dates (?holiday=1 / ?birthday=1 force one for previewing).
 *
 * Particles are generated here so each gets its own size, speed, drift and
 * opacity; the animation itself is pure CSS (see css/Home.css).
 */

(function () {
  const random = (min, max) => min + Math.random() * (max - min);
  const pick = (list) => list[Math.floor(Math.random() * list.length)];
  // A size plus where it sits in its own range (0..1). Returning both keeps the
  // range stated once, so retuning a size can't silently break the depth cue.
  const sized = (min, max) => {
    const size = random(min, max);
    return { size, depth: (size - min) / (max - min) };
  };

  const CONFETTI_COLORS = ["#ff5a5f", "#ffd166", "#06d6a0", "#5bc0eb", "#c77dff", "#ff8fab"];
  const BALLOON_COLORS = ["#ff5a5f", "#ffd166", "#06d6a0", "#5bc0eb", "#c77dff"];

  // Three arms through the centre, then the branch ticks. Readable at 14px.
  const CRYSTAL_SVG = `
    <svg class="snow-crystal" viewBox="-12 -12 24 24" fill="none"
         stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
      <path d="M0-11V11M-9.5-5.5 9.5 5.5M-9.5 5.5 9.5-5.5"/>
      <path d="M0-7 3-10M0-7-3-10M0 7 3 10M0 7-3 10
               M-6-3.5-9.6-3.2M-6-3.5-6.3-7.1M6 3.5 9.6 3.2M6 3.5 6.3 7.1
               M-6 3.5-9.6 3.8M-6 3.5-6.3 7.1M6-3.5 9.6-3.8M6-3.5 6.3-7.1"/>
    </svg>`;

  // Body, knot, then the string trailing below it.
  const BALLOON_SVG = `
    <svg class="balloon" viewBox="0 0 24 40" aria-hidden="true">
      <ellipse cx="12" cy="13" rx="9" ry="11.5" fill="currentColor"/>
      <ellipse cx="8.5" cy="9" rx="2.5" ry="3.5" fill="#fff" opacity="0.35"/>
      <path d="M10.4 24.3h3.2L12 27z" fill="currentColor"/>
      <path d="M12 27c2.5 3 -2.5 5 0 8s-1.5 4 0 5" fill="none"
            stroke="currentColor" stroke-width="1" stroke-linecap="round" opacity="0.7"/>
    </svg>`;

  /**
   * Each kind returns the geometry for one particle plus the element to draw.
   * `depth` (0..1) is derived from size so that bigger consistently means
   * closer: faster, more opaque, more drift.
   */
  const KINDS = {
    dot: () => {
      const { size, depth } = sized(3, 8);
      const el = document.createElement("div");
      el.className = "snow-dot";
      return { el, size, dur: 20 - depth * 11, opacity: 0.35 + depth * 0.55, drift: random(10, 50), swayDur: random(3, 7) };
    },

    crystal: () => {
      const { size, depth } = sized(14, 26);
      return { html: CRYSTAL_SVG, size, dur: random(20, 26) - depth * 4, opacity: random(0.5, 0.95), drift: random(10, 50), swayDur: random(3, 7) };
    },

    confetti: () => {
      const { size, depth } = sized(5, 11);
      const el = document.createElement("div");
      el.className = "confetti";
      el.style.background = pick(CONFETTI_COLORS);
      // Rectangles rather than squares, so the tumble reads as paper.
      el.style.setProperty("--aspect", random(0.4, 0.75).toFixed(2));
      return { el, size, dur: 14 - depth * 7, opacity: random(0.75, 1), drift: random(20, 70), swayDur: random(1.2, 2.6) };
    },

    balloon: () => {
      const { size, depth } = sized(46, 84);
      // Rising, so a long duration reads as a slow lazy climb.
      return { html: BALLOON_SVG, size, dur: 26 - depth * 8, opacity: random(0.65, 0.95), drift: random(14, 38), swayDur: random(4, 8), rise: true, color: pick(BALLOON_COLORS) };
    },
  };

  // Which kinds appear in which season, and in what proportion.
  const MODES = {
    "winter-holidays": [
      { kind: "dot", weight: 0.8 },
      { kind: "crystal", weight: 0.2 },
    ],
    birthday: [
      { kind: "confetti", weight: 0.82 },
      { kind: "balloon", weight: 0.18 },
    ],
  };

  const mode = MODES[window.__activeSeason];
  if (!mode) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const container = document.querySelector("#Home .particles");
  if (!container) return;

  const isSmallScreen = window.matchMedia("(max-width: 780px)").matches;
  const COUNT = isSmallScreen ? 20 : 80;

  const chooseKind = () => {
    let roll = Math.random();
    for (const entry of mode) {
      if (roll < entry.weight) return entry.kind;
      roll -= entry.weight;
    }
    return mode[mode.length - 1].kind;
  };

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < COUNT; i++) {
    const spec = KINDS[chooseKind()]();

    const particle = document.createElement("div");
    particle.className = spec.rise ? "particle particle--rise" : "particle";
    particle.style.setProperty("--x", `${random(0, 100)}%`);
    particle.style.setProperty("--size", `${spec.size.toFixed(1)}px`);
    particle.style.setProperty("--dur", `${spec.dur.toFixed(1)}s`);
    // Negative delay starts each particle mid-flight, so the section is already
    // full on the first frame instead of filling from one edge.
    particle.style.setProperty("--delay", `${(-Math.random() * spec.dur).toFixed(1)}s`);
    particle.style.setProperty("--drift", `${spec.drift.toFixed(0)}px`);
    particle.style.setProperty("--sway-dur", `${spec.swayDur.toFixed(1)}s`);
    particle.style.setProperty("--opacity", spec.opacity.toFixed(2));
    if (spec.color) particle.style.color = spec.color;

    if (spec.html) {
      particle.innerHTML = spec.html;
    } else {
      particle.appendChild(spec.el);
    }

    fragment.appendChild(particle);
  }

  container.appendChild(fragment);
  container.hidden = false;
})();
