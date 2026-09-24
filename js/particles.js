/**
 * Seasonal background particles for the About Me (#Home) section.
 *
 * Snow during the winter holidays; fireworks over new year; confetti and
 * balloons on the birthday.
 * The active season is resolved before body paint by the inline script in
 * index.html, so this just reads window.__activeSeason rather than recomputing
 * the dates (?holiday=1 / ?newyear=1 / ?birthday=1 force one for previewing).
 *
 * Particles are generated here so each gets its own size, speed, drift and
 * opacity; the animation itself is pure CSS (see css/Home.css).
 */

(function () {
  const random = (min, max) => min + Math.random() * (max - min);
  const pick = (list) => list[Math.floor(Math.random() * list.length)];
  // Entries carry their own `weight`; weights are expected to sum to 1.
  const pickWeighted = (list) => {
    let roll = Math.random();
    for (const entry of list) {
      if (roll < entry.weight) return entry;
      roll -= entry.weight;
    }
    return list[list.length - 1];
  };
  // A size plus where it sits in its own range (0..1). Returning both keeps the
  // range stated once, so retuning a size can't silently break the depth cue.
  const sized = (min, max) => {
    const size = random(min, max);
    return { size, depth: (size - min) / (max - min) };
  };

  const CONFETTI_COLORS = ["#ff5a5f", "#ffd166", "#06d6a0", "#5bc0eb", "#c77dff", "#ff8fab"];
  const BALLOON_COLORS = ["#ff5a5f", "#ffd166", "#06d6a0", "#5bc0eb", "#c77dff"];
  // Warmer than the confetti palette: gold and white read as sparks, and every
  // entry has to stay bright against the dark hero once it is glowing.
  const FIREWORK_COLORS = ["#ffd166", "#fff1a8", "#ffffff", "#ff5a5f", "#06d6a0", "#5bc0eb", "#c77dff"];
  // White, cream and gold are one colour at spark size, so a two-tone break
  // takes its accent from outside that group rather than from any other entry.
  const FIREWORK_WARM = ["#ffd166", "#fff1a8", "#ffffff"];
  const contrastingTo = (color) => pick(FIREWORK_COLORS.filter((c) => (FIREWORK_WARM.includes(color) ? !FIREWORK_WARM.includes(c) : c !== color)));

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

  /**
   * Burst shapes. Each launch picks one, so the sky isn't the same ring over
   * and over: `burst` is the dense round one, `willow` throws less far but
   * droops a long way, `palm` is fewer, fatter, longer-thrown sparks.
   * radius/size are desktop pixels - spawnFireworks scales them down on phones.
   */
  const FIREWORK_SHAPES = [
    { name: "burst", weight: 0.45, sparks: [24, 32], radius: [120, 190], size: [3.5, 6.5] },
    { name: "willow", weight: 0.3, sparks: [18, 26], radius: [95, 150], size: [3, 5.5] },
    { name: "palm", weight: 0.25, sparks: [13, 18], radius: [150, 230], size: [5.5, 9] },
  ];

  /**
   * How a shell is coloured. `solid` is one colour throughout, `duo` alternates
   * two around the break the way a two-tone shell does, and `mixed` gives every
   * spark its own. Keeping solid in the majority stops the sky turning to soup.
   */
  const FIREWORK_PALETTES = [
    { name: "solid", weight: 0.45 },
    { name: "duo", weight: 0.35 },
    { name: "mixed", weight: 0.2 },
  ];

  /**
   * New year fireworks. These don't fit KINDS: a firework is a fixed point that
   * the rocket climbs to and the sparks fly out from, rather than a mark that
   * travels the whole section, so it is built and appended here instead.
   *
   * The rocket, the flash and every spark share --dur and --delay, which is
   * what keeps the burst landing exactly where the rocket stopped.
   */
  function spawnFireworks(container, isSmallScreen) {
    const count = isSmallScreen ? 4 : 7;
    // Phones get smaller bursts with fewer sparks: the hero is narrower, and
    // this is the one season where a single element carries dozens of children.
    const scale = isSmallScreen ? 0.58 : 1;
    const density = isSmallScreen ? 0.6 : 1;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
      const shape = pickWeighted(FIREWORK_SHAPES);
      const palette = pickWeighted(FIREWORK_PALETTES);
      const base = pick(FIREWORK_COLORS);
      const accent = contrastingTo(base);
      const dur = random(3.4, 6);
      const radius = random(shape.radius[0], shape.radius[1]) * scale;
      // Burst height, as a percentage down the hero - kept in the upper half so
      // there is a long climb below it.
      const y = random(14, 46);

      const firework = document.createElement("div");
      // A third of them crackle - a fast flicker over the fade, which is what
      // sells the burst as burning rather than as dots sliding outwards.
      firework.className = `firework firework--${shape.name}` + (Math.random() < 0.34 ? " firework--crackle" : "");
      // The rocket and the flash always burn the base colour; only the sparks
      // below take a second one, so a multi-coloured shell still has a single
      // trail on the way up.
      firework.style.color = base;
      // One per column rather than a free-for-all, so a handful of fireworks
      // still covers the width instead of clumping on one side. Inset from both
      // edges, because .particles clips and a burst is now ~200px wide.
      firework.style.setProperty("--x", `${(12 + ((i + random(0.15, 0.85)) / count) * 76).toFixed(1)}%`);
      firework.style.setProperty("--y", `${y.toFixed(1)}%`);
      // Every shell is launched from the ground rather than from mid-air: #Home
      // is a min-height:100vh hero, so (100 - y)vh is the gap between the burst
      // point and the bottom edge, plus a few vh to start below it. In vh so it
      // keeps reaching the edge when the window is resized.
      firework.style.setProperty("--rise", `${(100 - y + random(3, 12)).toFixed(0)}vh`);
      firework.style.setProperty("--radius", `${radius.toFixed(0)}px`);
      firework.style.setProperty("--dur", `${dur.toFixed(1)}s`);
      // Negative delay again: mid-cycle on the first frame, so the sky is
      // already busy instead of waiting for the first launch.
      firework.style.setProperty("--delay", `${(-Math.random() * dur).toFixed(1)}s`);

      const rocket = document.createElement("div");
      rocket.className = "firework__rocket";
      firework.appendChild(rocket);

      // The white flash at the moment of detonation, before the sparks resolve.
      const flash = document.createElement("div");
      flash.className = "firework__flash";
      firework.appendChild(flash);

      // Two rings: a wide outer one, and a tighter, dimmer core that gives the
      // burst some depth instead of a hollow circle of dots.
      const outer = Math.round(random(shape.sparks[0], shape.sparks[1]) * density);
      const rings = [
        { n: outer, near: 0.82, far: 1, scale: 1, core: false },
        { n: Math.round(outer * 0.45), near: 0.3, far: 0.52, scale: 0.6, core: true },
      ];

      for (const ring of rings) {
        for (let s = 0; s < ring.n; s++) {
          const spark = document.createElement("div");
          spark.className = ring.core ? "firework__spark firework__spark--core" : "firework__spark";
          // currentColor on the spark's ::after picks this up; left unset, it
          // inherits the shell's base colour.
          if (palette.name === "mixed") {
            spark.style.color = pick(FIREWORK_COLORS);
          } else if (palette.name === "duo" && s % 2) {
            spark.style.color = accent;
          }
          // Evenly spaced around the circle, then jittered in angle and
          // distance so the edge stays ragged rather than reading as a wheel.
          spark.style.setProperty("--angle", `${((s * 360) / ring.n + random(-12, 12)).toFixed(1)}deg`);
          spark.style.setProperty("--dist", `${(radius * random(ring.near, ring.far)).toFixed(0)}px`);
          spark.style.setProperty("--spark-size", `${(random(shape.size[0], shape.size[1]) * scale * ring.scale).toFixed(1)}px`);
          firework.appendChild(spark);
        }
      }

      fragment.appendChild(firework);
    }

    container.appendChild(fragment);
  }

  // Seasons drawn as a burst at a point rather than as falling marks.
  const SPAWNERS = { "new-year": spawnFireworks };

  const season = window.__activeSeason;
  const mode = MODES[season];
  const spawn = SPAWNERS[season];
  if (!mode && !spawn) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const container = document.querySelector("#Home .particles");
  if (!container) return;

  const isSmallScreen = window.matchMedia("(max-width: 780px)").matches;

  if (spawn) {
    spawn(container, isSmallScreen);
    container.hidden = false;
    return;
  }

  const COUNT = isSmallScreen ? 20 : 80;

  const chooseKind = () => pickWeighted(mode).kind;

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
