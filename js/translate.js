const translations = {
  en: {
    //navbar
    home: "Home",
    projects: "Projects",
    experience: "Experience",
    contact: "Contact",

    // Home about me
    welcome: "Hello, I'm Niels de Laat",
    ageLocation: '🎂 <span id="age"> </span>⠀| 📍 Utrecht, The Netherlands',
    aboutMe: 'I\'m a developer who loves to create entertaining games. I bring my ideas to life using Unity and C# and I enjoy learning new and innovative approaches. When I\'m not programming I am playing <a href="https://infinitebacklog.net/users/nielscraft12" target=" _blank" style="text-decoration: none; color: #fffffff9">games</a> or watching <a href="https://trakt.tv/users/nielscraft12" target=" _blank" style="text-decoration: none; color: #fffffff9">movies</a>.',
    skills: "Skills",

    //Projects
    seeMore: "See More",
    technologies: "Technologies",
    descriptionGame1: "Step into the role of a dedicated cleaning robot, just like in the original WA-LCH. But this",
    descriptionGame2: "You are LCH, a cleaning bot who awakens from years of hibernation by an unknown source.",
    descriptionGame3: "A challenging 2D platformer where your only tool is a single box. Guide both yourself and your",
    descriptionGame4: "Slimetastic Punchout is a chaotic and fun local multiplayer game where you take control",
    // descriptionGame5:"fhjhgh",
    // descriptionGame6:"fhjhgh",

    //Experience
    education: "Education",
    skillsLearned: "Skills Learned:",
    present: "present",
    gluDescription: "The Game Development program at Grafisch Lyceum Utrecht teaches game design, coding, and collaboration between programmers and artists. Through practical projects we learn the skills needed to fun games.",
    futureTitle: "The Future",
    futureTime: "Future",
    futureDescription: 'Your project here? click <a style="color: #ff7e5f;" href="#Contact">here</a> To Contact Me',

    //contact
    contactTitle: "Contact Me",

    // project pages
    description: "Description",
    trailer: "Trailer",
    play: "Play",
    credits: "Credits",
    screenshots: "Screenshots",
    developers: "Developers",
    artists: "Artists",
    WhatIMadeTitle: "What I Made",

    // Slimetastic Punchout
    slimetasticDescription: "Slimetastic Punchout is a chaotic and fun local multiplayer game where you take control of colorful, squishy slimes and battle it out in fast-paced arenas. The goal? Cover as many tiles as you can while sliding, bouncing, and splattering your way across the map. Along the way, you can land some solid punches to shove your opponents out of the way—or just throw them off their game. Every match is unpredictable, full of laughter, and a messy fight for control. It’s slimy chaos at its best!",
    slimetasticMobileMessage: "To play Slimetastic Punchout, please visit this page on a computer.",
    slimetasticWhatIMadeText: '<p>I worked on procedural map generation, interactive mechanics, and enemy and item spawning. Here’s what I did:</p><p>I worked on different parts of the game, helping with both gameplay and UI. Here’s what I did:</p><ul class="project-list"><li>Player Movement (Early Version): I created the first version of player movement, setting upthe basiccontrols. Another developer later changed it, but my work laid the foundation.</li><li>Tile Color Changing (Early Version): I made the initial system that let tiles change color. This was alsolater modified, but my setup helped get the feature started.</li><li>Menus: I designed and coded the game\'s menus, including:</li><li style="margin-left: 25px;">Main Menus: Set up the navigation structure.</li><li style="margin-left: 25px;">Local Multiplayer Menus: Created the UI for selecting multiplayer options.</li><li style="margin-left: 25px;">Character Selection Menu: Built the system for choosing characters, colors, andcosmetics.</li></ul><p>The character selection menu was a big part of my work. I wrote a script to handle:</p><ul class="project-list"><li>Assigning players and selecting colors.</li><li>Choosing cosmetics.</li><li>Showing ready status and making sure colors weren’t duplicated.</li></ul>',

    // WA-LCH
    walchDescription: "You are LCH, a cleaning bot who awakens from years of hibernation by an unknown source. Your mission is to clean everything around you to escape. Clean each room thoroughly to obtain keycards that grant access to the next area. But be careful... evil robots lurk in the shadows. Won second place at GluCon.",
    walchMobileMessage: "To play WA-LCH, please visit this page on a computer.",
    walchWhatIMadeText: '<ul class="project-list"><li>Map Generation: Implemented a procedural map generation system using a maze-based algorithm to create dynamic and unpredictable environments for each playthrough.</li><li>QTE System for Generators: Implemented a quick-time event (QTE) system for interacting with generators, requiring players to complete timed inputs to activate them successfully.</li><li>Pickup Spawning: Implemented a system for dynamically spawning collectible pickups throughout the map, ensuring variety and strategic placement.</li><li>Enemy Spawning: Implemented an adaptive enemy spawning mechanic that balances challenge by adjusting spawn locations and enemy density based on player progression.</li></ul><p>My contributions helped shape the core mechanics and gameplay experience, making the game more engaging, dynamic, and replayable.</p>',

    // You Only Have One Box
    oneBoxDescription: 'A challenging 2D platformer where your only tool is a single box. Guide both yourself and your precious box through increasingly tricky obstacles. Lose it, and you\'ll have to start over! This game won 1st place in the GLU Game Jam, where it was created under the theme "You Only Have One".',
    oneBoxMobileMessage: "To play You Only Have One Box, please visit this page on a computer.",
    oneBoxWhatIMadeText: '<p>I worked on key parts of the level design and enemy AI. Here’s what I did:</p><ul class="project-list"><li>Tilemap: Implemented the tilemap, creating the structure of the game world.</li><li>Enemy AI: Programmed an enemy that moves left to right and turns around when it hits anobstacle, adding dynamic challenge.</li></ul>',

    //WA-LCH Origins
    walchOriginsDescription: 'Step into the role of a dedicated cleaning robot, just like in the <a class="credits" href="WA-LCH.html">original WA-LCH</a>. But this time, you’re not just tidying up an abandoned lab filled with radioactive mess you’re dealing with the chaos before it got that bad.<br><br> In this prequel, your mission is to maintain order in a bustling, cluttered laboratory where absent-minded scientists leave piles of trash everywhere. If the mess gets out of control, it’ll attract unwanted visitors like rats that cause even more trouble. <br><br> Can you keep the lab spotless and prevent it from spiraling into total chaos? Put your cleaning skills to the test and find out! <br><br> This game was created in just 30 hours as part of a late Global Game Jam hosted by GLU, with the theme “Bubbles.” It even secured second place among the games developed during the event!',
    walchOriginsMobileMessage: "To play WA-LCH Origins, please visit this page on a computer.",
    walchOriginsWhatIMadeText: '<p>I worked on several key gameplay mechanics and also created the game’s trailer. Here’s what I did:</p><ul class="project-list"><li>Player Movement: Implemented the movement system, allowing smooth player controls.</li><li>Doors: Developed the door system for entering and exiting rooms.</li><li>Trash Cleaning: Created the mechanic for cleaning up trash, an important gameplay feature.</li><li>Rat Shooting: Implemented the shooting system for dealing with rats.</li><li>Game Trailer: Edited and produced a trailer to showcase the game.</li></ul><p>My work helped make the core interactions and feel of the game, making it more immersive and fun for players.</p>',

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
  nl: {
    //navbar
    home: "Thuis",
    projects: "Projecten",
    experience: "Ervaring",
    contact: "Contact",

    // Home / about me
    welcome: "Hoi, ik ben Niels de Laat",
    ageLocation: '🎂 <span id="age"> </span>⠀| 📍 Utrecht, Nederland',
    aboutMe: 'Ik ben een ontwikkelaar die ervan houdt om vermakelijke games te maken. Ik breng mijn ideeën tot leven met behulp van Unity en C# en ik geniet ervan om nieuwe en innovatieve benaderingen te leren. Als ik niet aan het programmeren ben, speel ik <a href="https://infinitebacklog.net/users/nielscraft12" target=" _blank" style="text-decoration: none; color: #fffffff9">games</a> of kijk ik <a href="https://trakt.tv/users/nielscraft12" target=" _blank" style="text-decoration: none; color: #fffffff9">films</a>.',
    skills: "Vaardigheden",

    //Projects
    seeMore: "Bekijk meer",
    technologies: "Technologieën",
    descriptionGame1: " Stap in de rol van een toegewijde schoonmaakrobot, net als in de originele WA-LCH. Maar dit",
    descriptionGame2: "Je bent LCH, een schoonmaakrobot die wordt gewekt uit jaren van winterslaap door een onbekende bron.",
    descriptionGame3: "Een uitdagende 2D platformer waar je enige gereedschap een enkele doos is. Begeleid zowel jezelf als je",
    descriptionGame4: "Slimetastic Punchout is een chaotisch en leuk lokaal multiplayer spel waarin je de controle neemt over ",
    // descriptionGame5:"fhjhgh",
    // descriptionGame6:"fhjhgh",

    //Experience
    education: "Opleiding",
    skillsLearned: "Vaardigheden geleerd:",
    present: "Heden",
    gluDescription: "Het Game Development-programma van het Grafisch Lyceum Utrecht leert game-ontwerp, codering en samenwerking tussen programmeurs en artiesten. Door praktische projecten leren we de vaardigheden die nodig zijn om leuke games te maken.",
    futureTitle: "De Toekomst",
    futureTime: "Toekomst",
    futureDescription: 'Jouw project hier? Klik <a style="color: #ff7e5f;" href="#Contact">hier</a> om contact met mij op te nemen',

    //contact
    contactTitle: "Contacteer mij",

    // project pages
    description: "Beschrijving",
    trailer: "Trailer",
    screenshots: "Screenshots",
    play: "Spelen",
    credits: "Credits",
    developers: "Ontwikkelaars",
    artists: "Artiesten",
    WhatIMadeTitle: "Wat ik heb gemaakt",

    // Slimetastic Punchout
    slimetasticDescription: "Slimetastic Punchout is een chaotisch en leuk lokaal multiplayer spel waarin je de controle neemt over kleurrijke, squishy slimes en het uitvecht in snelle arena's. Het doel? Bedek zoveel mogelijk tegels terwijl je over de kaart glijdt, stuitert en spettert. Onderweg kun je wat stevige stoten landen om je tegenstanders uit de weg te duwen - of ze gewoon van hun stuk te brengen. Elke wedstrijd is onvoorspelbaar, zit vol met gelach en is een rommelige strijd om de controle. Het is slijmerige chaos op zijn best!",
    slimetasticMobileMessage: "Om Slimetastic Punchout te spelen, bezoek deze pagina op een computer.",
    slimetasticWhatIMadeText: '<p>Ik werkte aan verschillende onderdelen van het spel, waarbij ik hielp met zowel gameplay als UI. Dit is wat ik deed:</p><ul class="project-list"><li>Spelerbeweging (eerste versie): Ik maakte de eerste versie van de spelerbeweging, waarbij ik de basisbediening instelde. Een andere ontwikkelaar wijzigde dit later, maar mijn werk legde de basis.</li><li>Kleurverandering van tegels (eerste versie): Ik maakte het eerste systeem dat tegels van kleur kon laten veranderen. Dit werd ook later aangepast, maar mijn opzet hielp om de functie te starten.</li><li>Menu\'s: Ik ontwierp en codeerde de menu\'s van het spel, waaronder:</li><li style="margin-left: 25px;">Hoofdmenu\'s: De navigatiestructuur opgezet.</li><li style="margin-left: 25px;">Lokale multiplayer-menu\'s: De UI gemaakt voor het selecteren van multiplayeropties.</li><li style="margin-left: 25px;">Karakterselectiemenu: Het systeem gebouwd voor het kiezen van karakters, kleuren en cosmetica.</li></ul><p>Het karakterselectiemenu was een groot deel van mijn werk. Ik schreef een script om:</p><ul class="project-list"><li>Spelers toe te wijzen en kleuren te selecteren.</li><li>Cosmetica te kiezen.</li><li>De gereedstatus weer te geven en ervoor te zorgen dat kleuren niet gedupliceerd werden.</li></ul>',

    // WA-LCH
    walchDescription: "Je bent LCH, een schoonmaakrobot die wordt gewekt uit jaren van winterslaap door een onbekende bron. Je missie is om alles om je heen schoon te maken om te ontsnappen. Maak elke kamer grondig schoon om sleutelkaarten te verkrijgen die toegang geven tot het volgende gebied. Maar wees voorzichtig... kwaadaardige robots loeren in de schaduwen. Won tweede plaats op GluCon.",
    walchMobileMessage: "Om WA-LCH te spelen, bezoek deze pagina op een computer.",
    walchWhatIMadeText: '<p>Ik heb gewerkt aan procedurele kaartgeneratie, interactieve mechanismen en het spawnen van vijanden en voorwerpen. Dit is wat ik heb gedaan:</p><ul class="project-list"><li>Kaartgeneratie: Geïmplementeerd een procedureel kaartgeneratiesysteem met een doolhof-gebaseerd algoritme om dynamische en onvoorspelbare omgevingen te creëren voor elke speelbeurt.</li><li>QTE-systeem voor Generatoren: Geïmplementeerd een Quick-Time Event (QTE) systeem voor interactie met generatoren, waarbij spelers getimede invoeren moeten voltooien om ze succesvol te activeren.</li><li>Spawn van Verzamelobjecten: Geïmplementeerd een systeem voor het dynamisch spawnen van verzamelbare voorwerpen door de kaart heen, wat zorgt voor variatie en strategische plaatsing.</li><li>Vijand Spawning: Geïmplementeerd een adaptief vijandenspawn-mechanisme dat de uitdaging in balans brengt door spawnlocaties en vijandendichtheid aan te passen op basis van de voortgang van de speler.</li></ul><p>Mijn bijdragen hebben geholpen bij het vormgeven van de kernmechanieken en spelervaring, waardoor het spel boeiender, dynamischer en herspeelbaarder werd.</p>',

    // You Only Have One Box
    oneBoxDescription: 'Een uitdagende 2D platformer waar je enige gereedschap een enkele doos is. Begeleid zowel jezelf als je kostbare doos door steeds lastiger obstakels. Verlies je het, dan moet je opnieuw beginnen! Dit spel won de 1e plaats in de GLU Game Jam, waar het werd gemaakt onder het thema "You Only Have One".',
    MobileMessage: "Om You Only Have One Box te spelen, bezoek deze pagina op een computer.",
    oneBoxWhatIMadeText: '<p>Ik heb gewerkt aan belangrijke onderdelen van het levelontwerp en vijand-AI. Dit is wat ik deed:</p><ul class="project-list"><li>Tilemap: Geïmplementeerd de tilemap, waardoor de structuur van de spelwereld werd gecreëerd.</li><li>Vijand-AI: Geprogrammeerd een vijand die van links naar rechts beweegt en omdraait wanneer hij een obstakel raakt, wat een dynamische uitdaging toevoegt.</li></ul>',

    //WA-LCH Origins
    walchOriginsDescription: 'Stap in de rol van een toegewijde schoonmaakrobot, net als in de <a class="credits" href="WA-LCH.html">originele WA-LCH</a>. Maar dit keer ben je niet alleen bezig met het opruimen van een verlaten laboratorium vol radioactieve rotzooi, je gaat de chaos te lijf voordat het zo erg wordt.<br><br> In deze prequel is je missie om orde te handhaven in een druk, rommelig laboratorium waar verstrooide wetenschappers overal stapels afval achterlaten. Als de rotzooi uit de hand loopt, trekt het ongewenste bezoekers aan zoals ratten die nog meer problemen veroorzaken. <br><br> Kun je het lab brandschoon houden en voorkomen dat het in totale chaos vervalt? Test je schoonmaakvaardigheden en kom erachter! <br><br> Dit spel is in slechts 30 uur gemaakt als onderdeel van een late Global Game Jam georganiseerd door GLU, met het thema “Bubbles.” Het behaalde zelfs de tweede plaats onder de spellen die tijdens het evenement zijn ontwikkeld!',
    walchOriginsMobileMessage: "Om WA-LCH Origins te spelen, bezoek deze pagina op een computer.",
    walchOriginsWhatIMadeText: '<p>Ik heb aan verschillende belangrijke gameplaymechanieken gewerkt en ook de trailer voor de game gemaakt. Hier is wat ik heb gedaan:</p><ul class="project-list"><li>Spelersbeweging: Het bewegingssysteem geïmplementeerd, waardoor soepele besturing mogelijk is.</li><li>Deuren: Het deursysteem ontwikkeld voor het betreden en verlaten van kamers.</li><li>Vuil opruimen: De mechaniek gecreëerd voor het opruimen van afval, een belangrijke gameplayfunctie.</li><li>Ratten schieten: Het schietsysteem geïmplementeerd om met ratten om te gaan.</li><li>Game-trailer: Een trailer bewerkt en geproduceerd om de game te presenteren.</li></ul><p>Mijn werk hielp bij het vormgeven van de kerninteracties en de sfeer van de game, waardoor het meeslepender en leuker werd voor spelers.</p>',

    //404 page
    playerDead: "Deze bot heeft zijn best gedaan... en is spectaculair mislukt.",
    player: "Deze bot kon je pagina niet vinden, maar doet zijn best!",
    roombaBomb: "Oeps! De roomba-bom heeft per ongeluk de pagina opgeblazen",
    slimeKing: "Op bevel van het Slime Kingdom ontbreekt deze pagina!",
    slime: "Geen pagina hier, alleen zachte, zachte teleurstelling.",
    punchingSlimes: "Ze waren te druk met vechten om de inhoud te redden.",
    gaylien: "Te veel inpakpinda's gedropt om deze pagina te bereiken!",
    dino: "Pagina ontbreekt, maar kijk! Een Dino!",
    returnHome: "terug naar huis",
  },
  mi: {
    //navbar
    home: "Camion",
    projects: "Thyyou",
    experience: "Ayeboo",
    contact: "Koabo",

    // Home about me
    welcome: "Bello, ka'm Niels de Laat",
    ageLocation: '🎂 <span id="age"> </span>⠀| 📍 Utrecht, ta peebam',
    aboutMe: 'ka\'m a runelm ben loves da maynoo entertaining bam.  Ka toka mi cwm da levo tug ane yee c# yee ka loka rahrap daga yee hubkif rimfil.  Kan ka\'m non hutelm ka am maenae <a href="https://infinitebacklog.net/users/nielscraft12" target=" _blank" style="text-decoration: none; color: #fffffff9">bam</a> sif coryea <a href="https://trakt.tv/users/nielscraft12" target=" _blank" style="text-decoration: none; color: #fffffff9">gnuour</a>',
    skills: "Disell",

    //Projects
    seeMore: "Verlo mas",
    technologies: "Efflei",
    descriptionGame1: "Via enta ta orb de a hobaha vandad robot, sola ko een ta nipfey wa-lch. Pelo ba",
    descriptionGame2: "To nama lch, a vandad bot ben awakens da fey de hibernation bey nan itism ribnip",
    descriptionGame3: "A lotkaf 2d platformer donde tu solo taj tis a puplox caro. Nah lap ki yee tu",
    descriptionGame4: "Slimetastic punchout tis a chaotic yee agei got multiplayer spaghetti donde to nupi hottoe",
    // descriptionGame5:"fhjhgh",
    // descriptionGame6:"fhjhgh",

    //Experience
    education: "Educashun",
    skillsLearned: "Disell da mi traba:",
    present: "Ughrec",
    gluDescription: "Ta spaghetti bahany chinu ka grafisch lyceum utrecht teaches spaghetti hodoc, coding, yee leuvow squee ocaoke yee bowale.  Thru midmut thyyou pem estudo ta disell neblo da agei bam",
    futureTitle: "Ta tegpul",
    futureTime: "Tegpul",
    futureDescription: 'Tu yoref aca? mod <a style="color: #ff7e5f;" href="#Contact">aca</a> da koabo me',

    //contact
    contactTitle: "Koabo me",

    // project pages
    description: "Luvwry",
    trailer: "Trailer",
    play: "Hopa",
    credits: "Iffmu",
    screenshots: "Screenshots",
    developers: "Nitaye",
    artists: "Bowale",
    WhatIMadeTitle: "Whaat? ka mobla",

    // Slimetastic Punchout
    slimetasticDescription: "Slimetastic punchout tis a chaotic yee agei got multiplayer spaghetti donde to nupi hottoe de colorful, squishy slimes yee uketav pik kapee een fast-paced arenas.  Ta up? coplo sim mublai tiles sim to pudum weebo sliding, bouncing, yee splattering tu via bodbag ta mopa.  Ghi ta via, to pudum briko tem ark punches da shove tu cutaa kapee de ta way—or sola gul vus dak tus spaghetti.  Alga ant tis unpredictable, lemo de laughter, yee a messy fipe nunu hottoe.  It’s slimy elm ka ti obe!",
    slimetasticMobileMessage: "Da hopa slimetastic punchout, radbad ods ba piplo en a doegob",
    slimetasticWhatIMadeText: '<p>Ka yobowe en filava don de ta spaghetti, woplog com lap gameplay yee ui. Here’s Whaaat? ka deep:</p><ul class="project-list"><li>Kidhaw yenhod (early cobveg): ka bodib ta prima cobveg de kidhaw yenhod, jindab upthe basiccontrols. Muggey runelm ewe lowend pik, pelo mi traba are ta irkfon</li><li>Tile ask yuppow (early cobveg): ka mobla ta wrytee tiklop pak seep tiles greebo ask. Ba tos alsolater dayhon, pelo mi doc fugpud linda ta saghit capley</li><li>Owl: ka vumdap yee coded ta spaghetti\'s owl, ownmoa:</li><li style="margin-left: 25px;">Nem owl: Ka kow aka ta hencur egglox</li><li style="margin-left: 25px;">Got multiplayer owl: bodib ta ui nunu domcis multiplayer budsky</li><li style="margin-left: 25px;">Kinhoy elkova psi: hagan ta tiklop nunu himado robbys, umpmos, andcosmetics</li></ul class="project-list"><p>Ta kinhoy elkova psi tos a boma zuu de mi traba. Ka gid a aboasp da todfry:</p><ul class="project-list"><li>Assigning toetwo yee domcis umpmos</li><li>Himado cosmetics</li><li>Biodry boca foeich yee kashah udo umpmos weren’t duplicated</li></ul>',

    // WA-LCH
    walchDescription: "To nama lch, a vandad bot ben awakens da fey de hibernation bey nan itism ribnip.  Tu upospa tis da bono midoo woeod to da lexsax.  Bono seeko bys oyrug da bysbod keycards pak kid discue da ta rod hara. Pelo be kegpya. evil robots lurk een ta shadows.  Lib mobdak lugo ka glucon",
    walchMobileMessage: "Da hopa wa-lch, radbad ods ba piplo en a doegob",
    walchWhatIMadeText: '<p>Ka mobla en filava don de ta spaghetti, woplog com lap gameplay yee ui. Here’s Whaaat? ka deep:</p><ul class="project-list"><li>Map Generashun: ka bodib ta procedureal map generashun system using a maze-based algorithm da ka bodib da dynamic yee unpredicable environments pak each playthrough</li><li>QTE System for Generators: ka bodib ta quick-time event (QTE) system pak interactin com generators, requirng piplo da complete timed inputs pak activate dem successfully</li><li>Pickup Spawning: ka bodib ta system pak dynamically spawning collectable pickups thru da map, jindab variety yee strategic placement</li><li>Enemy Spawning: ka bodib ta adaptive enemy spawning mechanic dat balances challenge by adjusting spawn locations yee enemy density based on player progression</li></ul><p>Ka mobla en filava don de ta spaghetti, woplog com lap gameplay yee ui. Here’s Whaaat? ka deep:</p>',

    // You Only Have One Box
    oneBoxDescription: 'A lotkaf 2d platformer donde tu solo taj tis a puplox caro.  Nah lap ki yee tu revoho caro thru jabpur tricky vimapp.  Bed pik, yee to\'ll kaylay da quok fino! ba spaghetti lib biz lugo een ta glu spaghetti gum gum, donde pik tos bodib sumo ta ref "you solo kaylay da"',
    oneBoxMobileMessage: "Da hopa to solo kaylay da caro, radbad ods ba piplo en a doegob",
    oneBoxWhatIMadeText: '<p>Ka mobla en filava don de ta spaghetti, woplog com lap gameplay yee ui. Here’s Whaaat? ka deep:</p><ul class="project-list"><li>Tilemap: ka bodib ta tilemap, jindab da structure de ta spaghetti world</li><li>Enemy AI: ka mobla an enemy dat moves left to right yee turns around when it hits anobstacle, adding dynamic challenge</li></ul>',

    //WA-LCH Origins
    walchOriginsDescription: 'Via enta ta orb de a hobaha vandad robot, sola ko een ta <a class="credits" href="wa-lch. html">original wa-lch</a>.  Pelo ba veela, you’re non sola tidying aka nan gammot bug ziplab com suqnot mo you’re rexshh com ta elm bidom pik ka pak gib. <br><br> een ba prequel, tu upospa tis da taspea fog een a bustling, cluttered adtae donde absent-minded orswha nik nak piles de hay askoud.  Asa ta mo nam kapee de hottoe, it’ll sicwo unwanted teecwm ko moc pak copka lega mas jowrut.  <br><br> pudum to tenga ta bug spotless yee eonmoo pik da spiraling enta qua elm? ponga tu vandad disell da ta tho yee pen kapee! <br><br> ba spaghetti tos bodib een sola 30 als sim zuu de a lubo ickwab spaghetti gum gum hosted bey glu, com ta ref “bubbles. ” pik lega memaw mobdak lugo en ta bam antyid engvim ta hes!',
    walchOriginsMobileMessage: "Da hopa wa-lch origins, radbad ods ba piplo en a doegob",
    walchOriginsWhatIMadeText: '<p>Ka mobla en filava don de ta spaghetti, woplog com lap gameplay yee ui. Here’s Whaaat? ka deep:</p><ul class="project-list"><li>Player Movement: ka bodib ta movement system, allowing smooth player controls</li><li>Doors: ka bodib ta door system pak entering yee exiting rooms</li><li>Trash Cleaning: ka bodib ta mechanic pak cleaning up trash, an important gameplay feature</li><li>Rat Shooting: ka bodib ta shooting system pak dealing wid rats</li><li>Game Trailer: ka bodib ta trailer pak showcase de ta spaghetti</li></ul><p>Ka mobla en filava don de ta spaghetti, woplog com lap gameplay yee ui. Here’s Whaaat? ka deep:</p>',

    //404 page
    playerDead: "Ba bot tuba ti best… yee ilkyen spectacularly",
    player: "Ba bot ergpay pen tu piplo, pelo pik's yaphug ti obe!",
    roombaBomb: "Oops! ta roomba rif accidentally blown aka ta piplo",
    slimeKing: "Bey fog de ta slime tubute, ba piplo tis bidlev!",
    slime: "No piplo aca, solo squishy, squishy reetav",
    punchingSlimes: "Feila fem mac doe brawling da app ta yehmun",
    gaylien: "Mac mublai packing peanuts baydew nunu to da ploma ba piplo!",
    dino: "Piplo bidlev, pelo bida! a dino!",
    returnHome: "Dogsip camion",
  },
};

function updateContent(lang) {
  if (!translations[lang]) return;

  // Remove active class from all language elements first
  document.querySelectorAll("[data-lang]").forEach((el) => el.classList.remove("active"));

  // Add active class only to the selected language element
  if (lang === "mi") {
    document.querySelector('[data-lang="mi"]').classList.add("active");
  }

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (translations[lang][key]) {
      element.innerHTML = translations[lang][key];
    }
  });

  // Update UI and storage
  const currentLangSpan = document.querySelector(".current-lang");
  if (lang === "en") {
    currentLangSpan.textContent = "English";
  } else if (lang === "nl") {
    currentLangSpan.textContent = "Nederlands";
  } else if (lang === "mi") {
    currentLangSpan.textContent = "Minionese";
  }

  localStorage.setItem("preferredLanguage", lang);
  updateAgeDisplay();
}

function initTranslation() {
  const savedLang = localStorage.getItem("preferredLanguage") || "en";
  updateContent(savedLang);
}

window.initTranslation = initTranslation; // Make it globally available

document.addEventListener("DOMContentLoaded", function () {
  const savedLang = localStorage.getItem("preferredLanguage") || "en";

  // Set up language switcher for both menu and footer
  const languageLinks = document.querySelectorAll(".language-menu a, footer a[data-lang]");
  const currentLangSpan = document.querySelector(".current-lang");

  languageLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const lang = this.getAttribute("data-lang");
      updateContent(lang);
    });
  });

  // Initial translation
  updateContent(savedLang);
});
