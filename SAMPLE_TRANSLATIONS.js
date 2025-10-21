/*
Sample translation entries for wa-lch project
Add these to your translation files (en.js, nl.js, mi.js)

Example structure for English (en.js):
*/

const sampleTranslations = {
    projects: {
        wa_lch: {
            title: "WA-LCH",
            description: "WA-LCH game project by Niels de Laat",
            trailer: "Trailer",
            screenshots: "Screenshots",
            explore_code: "Explore Code",
            try_it_out: "Try It Out",
            sections: {
                0: {
                    title: "Description",
                    content: "WA-LCH is an innovative game project that showcases advanced game development techniques. This project demonstrates proficiency in Unity game engine, C# programming, and game design principles."
                },
                1: {
                    title: "Key Features",
                    items: {
                        0: "Advanced character movement and controls",
                        1: "Dynamic level generation system",
                        2: "Immersive audio and visual effects",
                        3: "Optimized performance for multiple platforms"
                    }
                },
                2: {
                    title: "Technical Implementation",
                    content: "Built using Unity Engine with C# scripting, featuring custom physics systems, AI behavior trees, and procedural content generation."
                }
            }
        }
    }
};

/*
Dutch (nl.js) example:
projects: {
  wa_lch: {
    title: "WA-LCH",
    description: "WA-LCH game project door Niels de Laat",
    trailer: "Trailer",
    screenshots: "Screenshots", 
    explore_code: "Code Bekijken",
    try_it_out: "Probeer Het Uit",
    sections: {
      0: {
        title: "Beschrijving",
        content: "WA-LCH is een innovatief game project dat geavanceerde game development technieken toont..."
      }
      // ... more sections
    }
  }
}

Minionese (mi.js) example:
projects: {
  wa_lch: {
    title: "WA-LCH",
    description: "WA-LCH game project papoy Niels de Laat",
    trailer: "Trailer",
    screenshots: "Screenshots",
    explore_code: "Poopaye Code",
    try_it_out: "Bello Try!",
    sections: {
      0: {
        title: "Descrip-sion",
        content: "WA-LCH tulaliloo innovative game project para advanced game development techniques..."
      }
      // ... more sections
    }
  }
}
*/