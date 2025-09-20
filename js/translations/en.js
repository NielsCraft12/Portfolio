// English translations
export const en = {
  nav: {
    //navbar
    home: "Home",
    projects: "Projects",
    experience: "Experience",
    contact: "Contact",
  },

  aboutMe: {
    // Home about me
    welcome: "Hello, I'm Niels de Laat",
    ageLocation: '🎂 <span id="age"> </span>⠀| 📍 Utrecht, The Netherlands',
    aboutMe: 'I\'m a developer who loves to create entertaining games. I bring my ideas to life using Unity and C# and I enjoy learning new and innovative approaches. When I\'m not programming I am playing <a href="https://infinitebacklog.net/users/nielscraft12" target=" _blank" style="text-decoration: none; color: #fffffff9">games</a> or watching <a href="https://trakt.tv/users/nielscraft12" target=" _blank" style="text-decoration: none; color: #fffffff9">movies</a>.',
    skills: "Skills",
  },

  projects: {
    //Projects
    seeMore: "See More",
    technologies: "Technologies:",
    allProjects: "All Projects",
    games: "Games",
    webProjects: "Web",
    recent: "Recent",
    descriptionGame1: "Step into the role of a dedicated cleaning robot, just like in the original WA-LCH. But this",
    descriptionGame2: "This is the website you're currently viewing a fully custom, multi-language developer",
    descriptionGame3: "Merge Packing is a quick, quirky mobile game built over a few days using Unity and C#.",
    descriptionGame4: "You are LCH, a cleaning bot who awakens from years of hibernation by an unknown source.",
    descriptionGame5: "A challenging 2D platformer where your only tool is a single box. Guide both yourself and your",
    descriptionGame6: "Slimetastic Punchout is a chaotic and fun local multiplayer game where you take control",
  },

  experience: {
    //Experience
    education: "Education",
    skillsLearned: "Skills Learned:",
    present: "present",
    gluDescription: "The Game Development program at Grafisch Lyceum Utrecht teaches game design, coding, and collaboration between programmers and artists. Through practical projects we learn the skills needed to fun games.",
    futureTitle: "The Future",
    futureTime: "Future",
    futureDescription: 'Your project here? click <a style="color: #ff7e5f;" href="#Contact">here</a> To Contact Me',
  },

  contact: {
    //contact
    contactTitle: "Contact Me",
  },
  projectPages: {
    // project pages
    description: "Description",
    trailer: "Trailer",
    play: "Play",
    credits: "Credits",
    screenshots: "Screenshots",
    developers: "Developers",
    artists: "Artists",
    whatIMadeTitle: "What I Made",
    viewOnGitHub: '<i class="fab fa-github"></i> View on GitHub',

    slimetasticPunchout: {
      // Slimetastic Punchout
      description: "Slimetastic Punchout is a chaotic and fun local multiplayer game where you take control of colorful, squishy slimes and battle it out in fast-paced arenas. The goal? Cover as many tiles as you can while sliding, bouncing, and splattering your way across the map. Along the way, you can land some solid punches to shove your opponents out of the way or just throw them off their game. Every match is unpredictable, full of laughter, and a messy fight for control. It's slimy chaos at its best!",
      mobileMessage: "To play Slimetastic Punchout, please visit this page on a computer.",

      playerJoin: {
        playerJoinTitle: "Custom Player Join System",
        playerJoinIntro: "I built a join system from scratch, allowing players to:",
        playerJoinPoint1: "Dynamically join the game",
        playerJoinPoint2: "Customize slime color and hats",
        playerJoinPoint3: "Indicate when they're ready",
        playerJoinPoint4: "Prevent duplicate colors via a locking system",
        howItWorks: "How it works:",
        howitworksIntro: "Players spawn into the join UI and navigate using directional inputs. Here's a snippet of the navigation system:",
        colorTitle: "Color Selection & Locking System",
        colorIntro: "Each player picks a unique color from a shared palette. If a color is taken, a lock icon appears and the player is prevented from readying up with that color.",
        hatTitle: "Cosmetic (Hat) Selection",
        hatIntro: "Slimes can be customized with various hats that reflect their personality. Hats are chosen using arrow navigation, and the visual updates immediately:",
        readyTitle: "Player Ready System",
        readyIntro: "When a player finishes customizing, they hit a button to toggle their ready state. The game only starts when all joined players are ready.",
        readyCodeSnippet: "Once everyone is ready, the MenuManager checks and starts the game:",
      },

      playerMovement: {
        playerMovementTitle: "Player Movement",
        playerMovementInto: "Each slime uses a physics-based movement system with:",
        playerMovementPoint1: "Full Rigidbody control",
        playerMovementPoint2: "Smooth rotation toward velocity",
        playerMovementPoint3: "Jumping with air control",
        playerMovementPoint4: "Movement dampening when no input is given",
        playerMovementCodeSnippet: "This snippet preserves vertical velocity while allowing grounded or aerial movement with different strengths.",
      },

      tileColoring: {
        tileColoringTitle: "Tile Coloring",
        tileColoringIntro: "Each floor tile tracks the last player that touched it and changes to their selected team color.",
      },
    },

    walch: {
      // WA-LCH
      description: "You are LCH, a cleaning bot who awakens from years of hibernation by an unknown source. Your mission is to clean everything around you to escape. Clean each room " + "thoroughly to obtain keycards that grant access to the next area. But be careful... evil robots lurk in the shadows. Won second place at GluCon.",
      mobileMessage: "To play WA-LCH, please visit this page on a computer.",
      proceduralLevelGen: {
        proceduralLevelGenTitle: "Procedural Level Generation",
        proceduralLevelGenIntro: "Walch features a dynamic, grid-based dungeon generator that constructs levels using predefined room templates. Each level is made up of cells" + " that can contain different types of rooms including normal, generator, and special event rooms.",
        keyConcepts: "Key Concepts",
        proceduralLevelGenPoint1: "Rooms spawn based on custom spawn rules defined by coordinates and logic.",
        proceduralLevelGenPoint2: "Adaptive grid size depending on player level.",
        proceduralLevelGenPoint3: "Maze-like structure via backtracking algorithm.",
      },

      qte: {
        qteTitle: "Generator Activation via QTE",
        qteIntro: "To activate power generators in the dungeon, players must complete Quick Time Events (QTEs). These are skill checks using keys (E, R, T or controller equivalents). ",
      },

      cleaningPod: {
        cleaningPodTitle: "Cleaning Pod Collection System",
        cleaningPodIntro: "leaning pods are scattered throughout the level. When collected, they update the game state and trigger sound effects.",
      },

      dynamicRoomBehavior: {
        dynamicRoomBehaviorTitle: "Dynamic Room Behavior",
        dynamicRoomBehaviorIntro: "Each room updates its doors and walls based on neighboring connections.",
      },
    },
    yohob: {
      // You Only Have One Box
      description: 'A challenging 2D platformer where your only tool is a single box. Guide both yourself and your precious box through increasingly tricky obstacles. Lose it, and you\'ll have to start over! This game won 1st place in the GLU Game Jam, where it was created under the theme "You Only Have One".',
      mobileMessage: "To play You Only Have One Box, please visit this page on a computer.",

      levelDesign: {
        levelDesignTitle: "Level Design",
        levelDesignIntro: "I created the level tilemap that forms the foundation of each challenge. The structure and pacing were designed to encourage creative parkour.",
      },

      enemy: {
        enemyTitle: "Enemy AI — The Chicken",
        enemyIntro: "I programmed the enemy logic for the chicken enemy, giving it simple but effective patrol and collision behavior. It patrols back and forth, using raycasts to detect obstacles or edges, and turns upon encountering any non-box or non-player object. The enemy can damage the player or be destroyed with the box.",
        enemyCodeSnippet: "Snippet: Chicken movement and collision detection",
        enemyBehaviorTitle: "Behavior Highlights:",
        enemyBehaviorPoint1: "Uses raycasting to avoid walls and hazards.",
        enemyBehaviorPoint2: "Flips direction.",
        enemyBehaviorPoint3: "Damages the player on contact.",
        enemyBehaviorPoint4: "Gets destroyed when hit by the box.",
      },

      finish: {
        finishTitle: "Finish System",
        finishIntro: "I implemented the finish object that ends the level once the player reaches it. The system saves the player's current damage state and triggers an animation before transitioning to the next level.",
        finishCodeSippet: "Snippet: Triggering level completion and transitioning scenes",
        finishCodeSippet2: "This coroutine waits briefly for an animation to play, then loads the next scene:",
      },
    },

    walchOrigins: {
      //WA-LCH Origins
      description: "Made in ~30 hours during a game jam (theme:“Bubbles”). Built with Unity and C#. " + "WA-LCH Origins is a chaotic mini-cleanup adventure where you play as a janitor scrubbing away trash and trapping rogue rats using bubble-based tools. " + "Built entirely under game jam pressure, it features player-controlled physics movement, animated doors, trap-based rat removal, and a bubbly cleaning mechanic.",
      mobileMessage: "To play WA-LCH Origins, please visit this page on a computer.",

      playerMovement: {
        playerMovementTitle: "Player Movement",
        playerMovementPoint1: "Handled via Rigidbody for responsive physics-based control. Rotation matches movement direction for an intuitive feel.",
      },

      cleaningMechanic: {
        cleaningMechanicTitle: "Cleaning Mechanic",
        cleaningMechanicPoint1: "When activated, the cleaning ability shows a particle effect and wipes nearby trash or rats from the scene. Using an OverlapSphere to detect the trash",
      },

      trapLaunching: {
        trapLaunchingTitle: "Trap Launching",
        trapLaunchingPoint1: "The player shoots traps on cooldown to deal with fast-moving rats.",
      },

      doorSystem: {
        doorSystemTitle: "Doors",
        doorSystemPoint1: "Doors open and close automatically when the when player or npc's enters a trigger zone. It tells the door to change the door state to open.",
        doorSystemPoint2: "The door then moves to the open position and waits for a certain amount of time before closing again.",
      },
      customTrailer: {
        customTrailerTitle: "Custom Trailer",
        customTrailerPoint1: "I also created a custom trailer to showcase the core mechanics, vibe, and loop of the game. (Created after the game jam)",
      },
    },

    mergePacking: {
      // Merge Packing
      description: "Merge Packing is a quick, quirky mobile game built over a few days using Unity and C#. It features a unique merging mechanic inspired by puzzle games like Suika Game, with an alien twist: a cheerful alien drops randomized packing peanuts as you attempt to combine them into larger items.",

      mergingLogic: {
        mergingLogicTitle: "Merging Logic",
        mergingLogicIntro: "Merge Packing's primary mechanic revolves around combining two identical items into a higher-tier object. This is handled in the ObjectManager script:",
      },

      mergingLogicEnd: "The merging system checks for matching sprite types, ensures only one of the colliding objects spawns the new item in the middle of the 2 objects, and increases the score.",

      alien: {
        alienTitle: "The alien",
        alienIntro: "The alien is a floating alien creature that periodically swoops across the screen, dropping packing peanuts. Its motion is point-to-point, with smoothed directional transitions and dynamic behavior.",
        alienCodeSnippet: "The alien's path resets after each score milestone, creating a rhythmic gameplay loop. Peanuts are dropped using a coroutine:",
      },
    },

    portfolio: {
      //Portfolio
      portfolioDescription: "This is the website you're currently viewing a fully custom, " + "multi-language developer portfolio showcasing my game development projects, skills, and personality. " + "It's built from the ground up using HTML, CSS, and JavaScript, with a focus on interactivity, accessibility, and a touch of humor.",
      whatIMadeStart: "This project wasn’t just about creating a static site, it’s a full experience. Here's what I built:",
      homepage: {
        homePageTitle: "Home Page",
        homePagePoint1: "Clean layout with profile picture, dynamic age display, and skills list.",
        homePagePoint2: "Fully responsive design using Flexbox and custom media queries.",
      },
      projectsPage: {
        projectsPageTitle: "Projects Page",
        projectsPagePoint1: "Each project is presented in a card format with hover effects.",
        projectsPagePoint2: "Displays project year, title, thumbnail, brief description, and tech stack.",
        projectsPagePoint3: "Clicking a project opens a detailed page with:",
        projectsPagePoint31: "Embedded trailer",
        projectsPagePoint32: "Full description of my contributions",
        projectsPagePoint33: "Screenshots that can be enlarged",
        projectsPagePoint34: "Playable game (if supported)",
      },
      languageSupport: {
        languageSupportTitle: "Language Support",
        languageSupportStart: "This website supports English and Dutch, using a lightweight custom translation system " + "that updates all text instantly via data-i18n attributes. No page reloads.",
        languageSupportPoint1: "Active language is stored in localStorage",
        languageSupportPoint2: "Missing keys fall back to English and are highlighted for debugging",
        languageSupportPoint3: "Translations are structured and nested for modularity",
      },
      error404: {
        error404PageTitle: "Custom 404 Page",
        error404PagePoint1: "Lost visitors get a custom error page that displays a random character from one of my games with a matching fun message." + 'Images load in either WebP or fallback PNG formats based on browser support. <a href="../404-page-not-found.html" rel="noopener noreferrer" class="credits">click here</a>' + " to view the 404 page.",
      },
      easterEggs: {
        easterEggsTitle: "Easter Eggs",
        easterEggsPoint1: "Try to find them. No Time? click on the boxes below to reveal theEaster egg.",
        easterEggsPoint2: "The site includes a Minoneese translation: a fictional, playful third language option you can access from the hidden icon in the footer.",
        easterEggsPoint3: 'the words "games" and "movies" at the end of the About Me section have hidden clickable links to personal profiles and fun references.',
        spoilerTooltip: "Click to reveal spoiler",
      },
      technologies: {
        technologiesTitle: "Technologies Used",
        technologiesPoint1: "HTML5 + semantic structure",
        technologiesPoint2: "Custom CSS (no frameworks)",
        technologiesPoint3: "JavaScript (vanilla ES6)",
        technologiesPoint4: 'The <code class="language-html"style="font-size: 20px;">&lt;picture&gt;</code> element enablesformat-aware image loading.',
      },
    },
  },

  error404: {
    //404 page
    playerDead: "This bot tried its best… and failed spectacularly.",
    player: "This bot couldn't find your page, but it's trying its best!",
    roombaBomb: "Oops! The roomba bomb accidentally blown up the page",
    slimeKing: "By order of the Slime Kingdom, this page is missing!",
    slime: "No page here, only squishy, squishy disappointment.",
    punchingSlimes: "They were too busy brawling to save the content.",
    gaylien: "Too many packing peanuts dropped for you to reach this page!",
    dino: "Page Missing, But Look! A Dino!",
    returnHome: "Return Home",
  },

  // CV file configuration
  cv: {
    filePath: "Documents/Cv_Niels_de_Laat_Portfolio_EN.pdf",
    title: "Download my CV",
  },
};
