/**
 * Seasonal Content Manager
 * Runs immediately on page load to prevent image flash
 */

class SeasonalContent {
  constructor() {
    this.seasons = [
      {
        name: "winter-holidays",
        startMonth: 12,
        startDay: 15,
        endMonth: 1,
        endDay: 7,
      },
      {
        name: "halloween",
        startMonth: 10,
        startDay: 25,
        endMonth: 10,
        endDay: 31,
      },
      {
        name: "easter",
        startMonth: 3,
        startDay: 20,
        endMonth: 4,
        endDay: 10,
      },
    ];

    this.init();
  }

  isInSeason(startMonth, startDay, endMonth, endDay) {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentDay = now.getDate();
    const currentYear = now.getFullYear();
    const currentDate = new Date(currentYear, currentMonth - 1, currentDay);
    const startDate = new Date(currentYear, startMonth - 1, startDay);
    let endDate = new Date(currentYear, endMonth - 1, endDay);

    if (endMonth < startMonth) {
      if (currentMonth <= endMonth) {
        startDate.setFullYear(currentYear - 1);
      } else {
        endDate.setFullYear(currentYear + 1);
      }
    }

    return currentDate >= startDate && currentDate <= endDate;
  }

  getActiveSeason() {
    return this.seasons.find((season) => this.isInSeason(season.startMonth, season.startDay, season.endMonth, season.endDay));
  }

  capitalizeFirst(str) {
    return str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
  }

  init() {
    const activeSeason = this.getActiveSeason();

    document.querySelectorAll("[data-seasonal]").forEach((element) => {
      const elementSeasons = element.dataset.seasonal.split(",").map((s) => s.trim());

      if (activeSeason && elementSeasons.includes(activeSeason.name)) {
        this.activateElement(element, activeSeason.name);
      } else {
        this.deactivateElement(element);
      }
    });

    this.processCustomDates();

    // Remove the preload style that hides images
    const preloadStyle = document.getElementById("seasonal-preload");
    if (preloadStyle) {
      preloadStyle.remove();
    }
  }

  activateElement(element, seasonName) {
    element.style.display = element.dataset.seasonalDisplay || "";
    element.classList.add("seasonal-active", `season-${seasonName}`);

    const seasonalImageAttr = `seasonalImage${this.capitalizeFirst(seasonName)}`;
    const seasonalPictureAttr = `seasonalPicture${this.capitalizeFirst(seasonName)}`;

    const imageToUse = element.dataset[seasonalImageAttr] || element.dataset.seasonalImage;

    if (imageToUse) {
      const img = element.tagName === "IMG" ? element : element.querySelector("img");
      if (img) {
        if (!img.dataset.originalSrc) {
          img.dataset.originalSrc = img.src;
        }
        img.src = imageToUse;
        img.style.opacity = "1";
      }
    }

    const pictureToUse = element.dataset[seasonalPictureAttr] || element.dataset.seasonalPicture;

    if (pictureToUse) {
      const picture = element.tagName === "PICTURE" ? element : element.querySelector("picture");
      if (picture) {
        const sources = picture.querySelectorAll("source");
        sources.forEach((source) => {
          if (!source.dataset.originalSrcset && source.srcset !== pictureToUse) {
            source.dataset.originalSrcset = source.srcset;
          }
          source.srcset = pictureToUse;
        });

        const img = picture.querySelector("img");
        if (img) {
          if (!img.dataset.originalSrc && img.src !== pictureToUse) {
            img.dataset.originalSrc = img.src;
          }
          img.src = pictureToUse;
          img.style.opacity = "1";
        }
      }
    }
  }

  deactivateElement(element) {
    if (element.dataset.seasonalDisplay) {
      element.style.display = "none";
    }

    element.classList.remove("seasonal-active");
    element.className = element.className.replace(/season-[\w-]+/g, "").trim();

    const img = element.tagName === "IMG" ? element : element.querySelector("img");
    if (img && img.dataset.originalSrc) {
      img.src = img.dataset.originalSrc;
      img.style.opacity = "1";
      delete img.dataset.originalSrc;
    }

    const picture = element.tagName === "PICTURE" ? element : element.querySelector("picture");
    if (picture) {
      const sources = picture.querySelectorAll("source");
      sources.forEach((source) => {
        if (source.dataset.originalSrcset) {
          source.srcset = source.dataset.originalSrcset;
          delete source.dataset.originalSrcset;
        }
      });

      const pictureImg = picture.querySelector("img");
      if (pictureImg && pictureImg.dataset.originalSrc) {
        pictureImg.src = pictureImg.dataset.originalSrc;
        pictureImg.style.opacity = "1";
        delete pictureImg.dataset.originalSrc;
      }
    }
  }

  processCustomDates() {
    document.querySelectorAll("[data-season-start]").forEach((element) => {
      const [startMonth, startDay] = element.dataset.seasonStart.split("-").map(Number);
      const [endMonth, endDay] = element.dataset.seasonEnd.split("-").map(Number);

      if (this.isInSeason(startMonth, startDay, endMonth, endDay)) {
        const customSeasonName = element.dataset.seasonName || "custom";
        this.activateElement(element, customSeasonName);
      } else {
        this.deactivateElement(element);
      }
    });
  }
}

// Initialize immediately when script loads
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => new SeasonalContent());
} else {
  new SeasonalContent();
}
