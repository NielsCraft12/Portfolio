// Click-to-load stand-in for a YouTube embed.
//
// A live YouTube iframe -- even on youtube-nocookie.com -- pulls Google's
// BotGuard script from www.google.com, and that request carries the visitor's
// Google session cookies (COMPASS, __Secure-OSID, LSOLH, __Host-3PLSID...).
// Lighthouse flags every one of them. Swapping the iframe for a locally hosted
// poster means a page load makes no Google request at all; the real player is
// inserted only when someone actually asks to watch.

const THUMB_BASE = new URL("../images/video-thumbs/", import.meta.url).href;

// Matches the 11-character id in /embed/<id> and youtu.be/<id> forms.
export function youTubeIdFrom(url) {
  const match = String(url).match(/(?:\/embed\/|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return match ? match[1] : null;
}

export function createYouTubeFacade(url, options = {}) {
  const { title, loading = "lazy" } = options;
  const id = youTubeIdFrom(url);

  const button = document.createElement("button");
  button.type = "button";
  button.className = "yt-facade";
  button.setAttribute("aria-label", title ? `Play video: ${title}` : "Play video");

  if (id) {
    const poster = document.createElement("img");
    poster.src = `${THUMB_BASE}${id}.jpg`;
    poster.alt = "";
    poster.loading = loading;
    poster.decoding = "async";
    poster.width = 1280;
    poster.height = 720;
    button.appendChild(poster);
  }

  const play = document.createElement("span");
  play.className = "yt-facade-play";
  play.setAttribute("aria-hidden", "true");
  button.appendChild(play);

  button.addEventListener(
    "click",
    () => {
      const iframe = document.createElement("iframe");
      iframe.src = url + (url.includes("?") ? "&" : "?") + "autoplay=1";
      iframe.title = title || "YouTube video player";
      iframe.frameBorder = "0";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      iframe.allowFullscreen = true;
      button.replaceWith(iframe);
      // The click that swapped in the player is also the gesture that lets it
      // autoplay, so focus follows the video rather than being dropped on body.
      iframe.focus();
    },
    { once: true }
  );

  return button;
}

// Lets a hand-written page opt in without any JS of its own:
//   <div class="video-container" data-yt-facade="https://www.youtube-nocookie.com/embed/ID"></div>
function upgradeDeclared() {
  document.querySelectorAll("[data-yt-facade]").forEach((host) => {
    const url = host.getAttribute("data-yt-facade");
    if (!url || host.dataset.ytFacadeReady === "true") return;
    host.dataset.ytFacadeReady = "true";
    host.appendChild(createYouTubeFacade(url, { title: host.getAttribute("data-yt-title") || undefined }));
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", upgradeDeclared, { once: true });
} else {
  upgradeDeclared();
}
