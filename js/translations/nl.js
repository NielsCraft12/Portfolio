// Dutch translations
export const nl = {
  nav: {
    //navbar
    home: "Thuis",
    projects: "Projecten",
    experience: "Ervaring",
    contact: "Contact",
  },

  aboutMe: {
    // Home / about me
    // welcome: "Hoi, ik ben Niels de Laat",
    welcome: '<span style="white-space: nowrap;">Hoi, ik ben</span><wbr> <span style="white-space: nowrap;">Niels de Laat</span>',
    ageLocation: '🎂 <span id="age"> </span>⠀| 📍 Utrecht, Nederland',
    aboutMe: "Ik ben een spel ontwikkelaar die ervan houdt om vermakelijke games te maken. Ideeën worden tot leven gebracht met Unity en C#, en het leren van nieuwe en innovatieve benaderingen is iets wat boeiend blijft. Buiten het programmeren om gaat de tijd vaak naar games of films.",
    skills: "Vaardigheden",
  },

  projects: {
    //Projects
    seeMore: "Bekijk meer",
    technologies: "Technologieën:",
    allProjects: "Alle Projecten",
    games: "Spellen",
    webProjects: "Web",
    recent: "Recent",
    descriptionGame1: "Stap in de rol van een toegewijde schoonmaakrobot, net als in de originele WA-LCH. Maar dit",
    descriptionWeb1: "Een moderne, meertalige portfolio-website die helemaal van de grond af is opgebouwd met behulp van standaard HTML, CSS en JavaScript.",
    descriptionGame3: "Merge Packing is een snelle, eigenaardige mobiele game gebouwd in een paar dagen met Unity en C#.",
    descriptionGame4: "Je bent LCH, een schoonmaakrobot die wordt gewekt uit jaren van winterslaap door een onbekende bron.",
    descriptionGame5: "Een uitdagende 2D platformer waar je enige gereedschap een enkele doos is. Begeleid zowel jezelf als je",
    descriptionGame6: "Slimetastic Punchout is een chaotisch en leuk lokaal multiplayer spel waarin je de controle neemt over ",
  },

  experience: {
    //Experience
    education: "Opleiding",
    skillsLearned: "Vaardigheden geleerd:",
    present: "Heden",
    gluDescription: "Het Game Development-programma van het Grafisch Lyceum Utrecht leert game-ontwerp, codering en samenwerking tussen programmeurs en artiesten. Door praktische projecten leren we de vaardigheden die nodig zijn om leuke games te maken.",
    futureTitle: "De Toekomst",
    futureTime: "Toekomst",
    futureDescription: "Ik wil mijn vaardigheden uitbreiden in geavanceerde game-ontwikkeling, AI-integratie en mogelijk mobiele game-ontwikkeling. Altijd open voor nieuwe kansen en samenwerkingen.",
  },

  contact: {
    //contact
    contactTitle: "Contacteer mij",
  },
  projectPages: {
    // project pages
    description: "Beschrijving",
    trailer: "Trailer",
    screenshots: "Screenshots",
    tryItOut: "Probeer het uit",
    credits: "Credits",
    developers: "Ontwikkelaars",
    artists: "Artiesten",
    whatIMadeTitle: "Wat ik heb gemaakt",
    viewOnGitHub: ' <i class="fab fa-github"></i> Bekijk op GitHub',
    exploreCode: "Verken de code",
    mobileMessage: `Om ${typeof PROJECT_DATA !== "undefined" && PROJECT_DATA.title ? PROJECT_DATA.title : "dit project"} te spelen, bezoek deze pagina op een computer.`,

    slimetasticPunchout: {
      // Slimetastic Punchout
      description: "Slimetastic Punchout is een chaotisch en leuk lokaal multiplayer spel waarin je de controle neemt over kleurrijke, squishy slimes en het uitvecht in snelle arena's. Het doel? Bedek zoveel mogelijk tegels terwijl je over de kaart glijdt, stuitert en spettert. Onderweg kun je wat stevige stoten landen om je tegenstanders uit de weg te duwen of ze gewoon van hun stuk te brengen. Elke wedstrijd is onvoorspelbaar, zit vol met gelach en is een rommelige strijd om de controle. Het is slijmerige chaos op zijn best!",
      mobileMessage: "Om Slimetastic Punchout te spelen, bezoek deze pagina op een computer.",

      playerJoin: {
        playerJoinTitle: "Aangepast Speler Deelname Systeem",
        playerJoinIntro: "Ik heb een deelname systeem vanaf de grond opgebouwd, waardoor spelers kunnen:",
        playerJoinPoint1: "Dynamisch deelnemen aan het spel",
        playerJoinPoint2: "Slime kleur en hoeden aanpassen",
        playerJoinPoint3: "Aangeven wanneer ze klaar zijn",
        playerJoinPoint4: "Dubbele kleuren voorkomen via een vergrendelsysteem",
        howItWorks: "Hoe het werkt:",
        howitworksIntro: "Spelers spawnen in de deelname UI en navigeren met richtingsinvoer. Hier is een fragment van het navigatiesysteem:",
        colorTitle: "Kleurselectie & Vergrendelsysteem",
        colorIntro: "Elke speler kiest een unieke kleur uit een gedeeld palet. Als een kleur bezet is, verschijnt er een slotpictogram en kan de speler niet klaar worden met die kleur.",
        hatTitle: "Cosmetische (Hoed) Selectie",
        hatIntro: "Slimes kunnen worden aangepast met verschillende hoeden die hun persoonlijkheid weerspiegelen. Hoeden worden gekozen met pijlnavigatie, en de visual wordt direct bijgewerkt:",
        readyTitle: "Speler Klaar Systeem",
        readyIntro: "Wanneer een speler klaar is met aanpassen, drukt hij op een knop om zijn klaarstatus te wijzigen. Het spel begint alleen als alle deelnemende spelers klaar zijn.",
        readyCodeSnippet: "Zodra iedereen klaar is, controleert de MenuManager dit en start de game:",
      },

      playerMovement: {
        playerMovementTitle: "Spelerbeweging",
        playerMovementInto: "Elke slime gebruikt een physics-gebaseerd bewegingssysteem met:",
        playerMovementPoint1: "Volledige Rigidbody controle",
        playerMovementPoint2: "Vloeiende rotatie naar snelheid",
        playerMovementPoint3: "Springen met luchtcontrole",
        playerMovementPoint4: "Bewegingsdemping wanneer geen invoer wordt gegeven",
        playerMovementCodeSnippet: "Dit fragment behoudt verticale snelheid terwijl het grond- of luchtbeweging mogelijk maakt met verschillende sterktes.",
      },

      tileColoring: {
        tileColoringTitle: "Tegel Kleuring",
        tileColoringIntro: "Elke vloertegel houdt de laatste speler bij die hem heeft aangeraakt en verandert naar hun geselecteerde teamkleur.",
      },
    },
    walch: {
      // WA-LCH
      description: "Je bent LCH, een schoonmaakrobot die wordt gewekt uit jaren van winterslaap door een onbekende bron. Je missie is om alles om je heen schoon te maken om te ontsnappen. Maak elke kamer grondig schoon om sleutelkaarten te verkrijgen die toegang geven tot het volgende gebied. Maar wees voorzichtig... kwaadaardige robots loeren in de schaduwen. Won tweede plaats op GluCon.",
      mobileMessage: "Om WA-LCH te spelen, bezoek deze pagina op een computer.",
      proceduralLevelGen: {
        proceduralLevelGenTitle: "Procedurele Level Generatie",
        proceduralLevelGenIntro: "Walch heeft een dynamische, grid-gebaseerde dungeon generator die levels bouwt met voorgedefinieerde kamer templates. Elke level bestaat uit cellen die verschillende soorten kamers kunnen bevatten, waaronder normale kamers, generator kamers en speciale event kamers.",
        keyConcepts: "Key Concepts",
        proceduralLevelGenPoint1: "Kamers spawnen op basis van aangepaste spawn regels gedefinieerd door coördinaten en logica.",
        proceduralLevelGenPoint2: "Aanpasbare grid grootte afhankelijk van het speler level.",
        proceduralLevelGenPoint3: "Doolhof-achtige structuur via backtracking algoritme.",
      },

      qte: {
        qteTitle: "Generator Activatie via QTE",
        qteIntro: "Om energie generators in de dungeon te activeren moeten spelers Quick Time Events (QTE's) voltooien. Dit zijn vaardigheidstoetsen die gebruik maken van toetsen (E, R, T of controller equivalenten). ",
      },

      cleaningPod: {
        cleaningPodTitle: "Cleaning Pod Verzamelsysteem",
        cleaningPodIntro: "Cleaning pods zijn verspreid door het level. Wanneer verzameld, updaten ze de game state en activeren geluidseffecten.",
      },

      dynamicRoomBehavior: {
        dynamicRoomBehaviorTitle: "Dynamisch Kamergedrag",
        dynamicRoomBehaviorIntro: "Elke kamer past zijn deuren en muren aan op basis van aangrenzende verbindingen.",
      },
    },
    yohob: {
      // You Only Have One Box
      description: 'Een uitdagende 2D platformer waar je enige gereedschap een enkele doos is. Begeleid zowel jezelf als je kostbare doos door steeds lastiger obstakels. Verlies je het, dan moet je opnieuw beginnen! Dit spel won de 1e plaats in de GLU Game Jam, waar het werd gemaakt onder het thema "You Only Have One".',
      mobileMessage: "Om You Only Have One Box te spelen, bezoek deze pagina op een computer.",

      levelDesign: {
        levelDesignTitle: "Level Ontwerp",
        levelDesignIntro: "Ik heb de level tilemap gemaakt die de basis vormt van elke uitdaging. De structuur en pacing waren ontworpen om creatieve parkour aan te moedigen.",
      },

      enemy: {
        enemyTitle: "Vijand AI — De Kip",
        enemyIntro: "Ik heb de vijandlogica voor de kip geprogrammeerd, waardoor het eenvoudig maar effectief patrouille- en botsingsgedrag kreeg. Het patrouilleert heen en weer, gebruikt raycasts om obstakels of randen te detecteren, en draait om wanneer het een niet-doos of niet-speler object tegenkomt. De vijand kan de speler beschadigen of vernietigd worden door de doos.",
        enemyCodeSnippet: "Snippet: Kip beweging en botsingsdetectie",
        enemyBehaviorTitle: "Gedrag Hoogtepunten:",
        enemyBehaviorPoint1: "Gebruikt raycasting om muren en gevaren te vermijden.",
        enemyBehaviorPoint2: "Draait richting om.",
        enemyBehaviorPoint3: "Beschadigt de speler bij contact.",
        enemyBehaviorPoint4: "Wordt vernietigd wanneer geraakt door de doos.",
      },

      finish: {
        finishTitle: "Finish Systeem",
        finishIntro: "Ik heb het finish object geïmplementeerd dat het level beëindigt zodra de speler het bereikt. Het systeem slaat de huidige schade staat van de speler op en activeert een animatie voordat het overgaat naar het volgende level.",
        finishCodeSippet: "Snippet: Level voltooiing activeren en scene overgangen",
        finishCodeSippet2: "Deze coroutine wacht kort op een animatie, laadt dan de volgende scene:",
      },
    },

    walchOrigins: {
      //WA-LCH Origins
      description: 'Gemaakt in ~30 uur tijdens een game jam (thema: "Bubbles"). Gebouwd met Unity en C#. WA-LCH Origins is een chaotisch mini-opruimavontuur waarin je een schoonmaakrobot speelt die rommel' + "wegschrobt en ontsnapte ratten vangt met bubble-gereedschap. Volledig gemaakt onder game jam druk, met door de speler bestuurbare physics beweging, geanimeerde deuren, val-gebaseerde rattenverwijdering" + "en een bubbelige schoonmaakmechaniek.",
      mobileMessage: "Om WA-LCH Origins te spelen, bezoek deze pagina op een computer.",

      playerMovement: {
        playerMovementTitle: "Spelerbeweging",
        playerMovementPoint1: "Afgehandeld via Rigidbody voor responsieve physics-gebaseerde besturing. Rotatie volgt de bewegingsrichting voor een intuïtief gevoel.",
      },

      cleaningMechanic: {
        cleaningMechanicTitle: "Schoonmaakmechaniek",
        cleaningMechanicPoint1: "Als de schoonmaakfunctie wordt geactiveerd, verschijnt er een particle-effect en worden rommel of ratten in de buurt uit de scène verwijderd. Er wordt een OverlapSphere gebruikt om de rommel te vinden.",
      },

      trapLaunching: {
        trapLaunchingTitle: "Vallen Afschieten",
        trapLaunchingPoint1: "De speler schiet vallen af met een cooldown om snelle ratten aan te pakken.",
      },

      doorSystem: {
        doorSystemTitle: "Deuren",
        doorSystemPoint1: "Deuren openen en sluiten automatisch wanneer de speler of NPC's een trigger zone betreden. Dit vertelt de deur om de deurstatus naar open te veranderen.",
        doorSystemPoint2: "De deur beweegt dan naar de open positie en wacht een bepaalde tijd voordat hij weer sluit.",
      },
      customTrailer: {
        customTrailerTitle: "Zelfgemaakte Trailer",
        customTrailerPoint1: "Ik heb ook een aangepaste trailer gemaakt om de kernmechanieken, sfeer en gameplay loop van de game te laten zien. (Gemaakt na de game jam)",
      },
    },

    mergePacking: {
      // Merge Packing
      description: "Merge Packing is een snelle, eigenaardige mobiele game gebouwd in een paar dagen met Unity en C#. Het heeft een unieke samenvoegingsmechaniek geïnspireerd door puzzelspellen zoals Suika Game, met een alien twist: een vrolijke alien laat willekeurige verpakkingspinda's vallen terwijl je probeert ze te combineren tot grotere items.",

      mergingLogic: {
        mergingLogicTitle: "Samenvoegings logica",
        mergingLogicIntro: "Merge Packing's primaire mechaniek draait om het combineren van twee identieke items tot een hoger-tier object. Dit wordt afgehandeld in het ObjectManager script:",
        mergingLogicEnd: "Het merge systeem controleert op overeenkomende sprite types, zorgt ervoor dat slechts één van de botsende objecten het nieuwe item spawnt in het midden van de 2 objecten, en verhoogt de score.",
      },

      alien: {
        alienTitle: "De alien",
        alienIntro: "De alien is een zwevend alien wezen dat periodiek over het scherm zweeft en verpakkingspinda's laat vallen. Zijn beweging is punt-naar-punt, met gladde richtingsovergangen en dynamisch gedrag.",
        alienCodeSnippet: "Het pad van de alien wordt gereset na elke score mijlpaal, wat een ritmische gameplay loop creëert. Pinda's worden gedropt met behulp van een coroutine:",
      },
    },

    portfolio: {
      //Portfolio
      description: "Een moderne, meertalige portfolio-website die helemaal van de grond af is opgebouwd met behulp van standaard HTML, CSS en JavaScript. Bevat aangepaste webcomponenten, ondersteuning voor internationalisering en dynamische projectpagina's. Volledig responsief met geoptimaliseerde prestaties en niet afhankelijk van frameworks.",
      translation: {
        title: "Ondersteuning voor meerdere talen",
        content: "De hele website kan worden gewisseld tussen Engels en Nederlands. Alle tekst wordt direct bijgewerkt zonder dat de pagina opnieuw hoeft te worden geladen. Uw taalvoorkeur wordt automatisch opgeslagen.",
      },
      filtering: {
        title: "Projectfiltersysteem",
        content: "Blader door mijn projecten per categorie met soepel schakelen tussen tabbladen. Filter met één klik tussen games en webprojecten.",
      },
      projectPages: {
        title: "Dynamische projectpagina's.",
        content: "Elke projectpagina is opgebouwd uit een eenvoudig configuratieobject. Voeg secties, codeblokken, afbeeldingen en video's toe zonder HTML aan te raken. Alles wordt automatisch weergegeven met volledige ondersteuning voor vertalingen.",
      },
      imageModal: {
        title: "Interactieve screenshotgalerij",
        content: "Klik op een screenshot om deze op volledige grootte te bekijken. Het lightbox-effect is volledig zelf ontwikkeld, zonder gebruik te maken van externe bibliotheken.",
      },
      embedSystem: {
        title: "Slimme inbedding van games",
        content: "Speel games direct op projectpagina's! Het systeem detecteert automatisch uw apparaat en past de lay-out aan. Mobiele gebruikers krijgen een handig bericht te zien voor games die alleen op desktopcomputers kunnen worden gespeeld, terwijl mobielvriendelijke games in verticaal formaat worden weergegeven.",
      },
      error404: {
        title: "Leuke 404 foutpagina",
        content: "Verdwalen op mijn website is eigenlijk heel leuk! De 404 pagina toont willekeurig verschillende personages uit mijn games met grappige berichten. Vernieuw de pagina om een nieuw personage te zien!",
      },
      responsive: {
        title: "Geheel responsief ontwerp",
        content: "De website past zich perfect aan elk schermformaat aan. Van mobiele telefoons tot ultrabrede monitoren. Navigatie, afbeeldingen en lay-outs worden automatisch aangepast voor de beste kijkervaring.",
      },
      performance: {
        title: "Geoptimaliseerde prestaties",
        content: "Fast loading times through smart optimizations: images load only when you scroll to them, code syntax highlighting loads on-demand, and modern WebP images are used with automatic fallbacks for older browsers.",
      },
      codeBlocks: {
        title: "Mooie code weergave",
        content: "Alle codevoorbeelden zijn voorzien van syntaxis accentuering met directe links om de volledige code op GitHub te bekijken. De accentueringsbibliotheek wordt alleen geladen wanneer u naar een codeblok scrolt, zodat de pagina snel blijft.",
      },
      webComponents: {
        title: "Modulair componentsysteem",
        content: "Herbruikbare webcomponenten gebouwd voor navigatie, projectkaarten, sociale knoppen en meer. Dit houdt de code overzichtelijk en maakt het eenvoudig om nieuwe functies toe te voegen.",
      },
      techStack: {
        title: "Gebouwd met",
        content: "Moderne webtechnologieën zonder zware frameworks:",
        item1: "Standaard JavaScript (ES6+)",
        item2: "CSS Grid & Flexbox",
        item3: "Aangepaste webcomponenten",
        item4: "Ondersteuning voor meerdere talen",
        item5: "Mobile-first resMobiel-eerst responsief ontwerpponsive design",
        item6: "Prestaties geoptimaliseerd",
        item7: "Toegankelijk met ARIA-labels",
      },
      explore: {
        title: "Verken de website",
        content: "Bezoek de live site om al deze functies in actie te zien! Probeer eens van taal te wisselen en projecten te filteren.",
      },
    },
  },

  error404: {
    //404 page
    playerDead: "Deze bot heeft zijn best gedaan... en is spectaculair mislukt.",
    player: "Deze bot kon je pagina niet vinden, maar doet zijn best!",
    roombaBomb: "Oeps! De roomba-bom heeft per ongeluk de pagina opgeblazen",
    slimeKing: "Op bevel van het Slime Kingdom ontbreekt deze pagina!",
    slime: "Geen pagina hier, alleen zachte, zachte teleurstelling.",
    punchingSlimes: "Ze waren te druk met vechten om de inhoud te redden.",
    gaylien: "Te veel inpakpinda's gedropt om deze pagina te bereiken!",
    dino: "Pagina ontbreekt, maar kijk! Een Dino!",
    returnHome: "terug naar thuis",
  },

  // CV file configuration
  cv: {
    filePath: "/Documents/Cv_Niels_de_Laat_Portfolio_NL.pdf",
    title: "Download mijn CV",
  },
};
