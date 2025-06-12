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
        welcome: "Hoi, ik ben Niels de Laat",
        ageLocation: '🎂 <span id="age"> </span>⠀| 📍 Utrecht, Nederland',
        aboutMe: 'Ik ben een ontwikkelaar die ervan houdt om vermakelijke games te maken. Ik breng mijn ideeën tot leven met behulp van Unity en C# en ik geniet ervan om nieuwe en innovatieve benaderingen te leren. Als ik niet aan het programmeren ben, speel ik <a href="https://infinitebacklog.net/users/nielscraft12" target=" _blank" style="text-decoration: none; color: #fffffff9">games</a> of kijk ik <a href="https://trakt.tv/users/nielscraft12" target=" _blank" style="text-decoration: none; color: #fffffff9">films</a>.',
        skills: "Vaardigheden",
    },

    projects: {
        //Projects
        seeMore: "Bekijk meer",
        technologies: "Technologieën",
        descriptionGame1: "Stap in de rol van een toegewijde schoonmaakrobot, net als in de originele WA-LCH. Maar dit",
        descriptionGame2: "Dit is de website die je nu bekijkt — een volledig op maat gemaakte, meertalige ontwikkelaarsportfolio",
        descriptionGame3: "Je bent LCH, een schoonmaakrobot die wordt gewekt uit jaren van winterslaap door een onbekende bron.",
        descriptionGame4: "Een uitdagende 2D platformer waar je enige gereedschap een enkele doos is. Begeleid zowel jezelf als je",
        descriptionGame5: "Slimetastic Punchout is een chaotisch en leuk lokaal multiplayer spel waarin je de controle neemt over ",
        // descriptionGame5:"fhjhgh",
        // descriptionGame6:"fhjhgh",
    },

    experience: {
        //Experience
        education: "Opleiding",
        skillsLearned: "Vaardigheden geleerd:",
        present: "Heden",
        gluDescription: "Het Game Development-programma van het Grafisch Lyceum Utrecht leert game-ontwerp, codering en samenwerking tussen programmeurs en artiesten. Door praktische projecten leren we de vaardigheden die nodig zijn om leuke games te maken.",
        futureTitle: "De Toekomst",
        futureTime: "Toekomst",
        futureDescription: 'Jouw project hier? Klik <a style="color: #ff7e5f;" href="#Contact">hier</a> om contact met mij op te nemen',
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
        play: "Spelen",
        credits: "Credits",
        developers: "Ontwikkelaars",
        artists: "Artiesten",
        whatIMadeTitle: "Wat ik heb gemaakt",

        slimetasticPunchout: {
            // Slimetastic Punchout
            slimetasticDescription: "Slimetastic Punchout is een chaotisch en leuk lokaal multiplayer spel waarin je de controle neemt over kleurrijke, squishy slimes en het uitvecht in snelle arena's. Het doel? Bedek zoveel mogelijk tegels terwijl je over de kaart glijdt, stuitert en spettert. Onderweg kun je wat stevige stoten landen om je tegenstanders uit de weg te duwen - of ze gewoon van hun stuk te brengen. Elke wedstrijd is onvoorspelbaar, zit vol met gelach en is een rommelige strijd om de controle. Het is slijmerige chaos op zijn best!",
            slimetasticMobileMessage: "Om Slimetastic Punchout te spelen, bezoek deze pagina op een computer.",
            slimetasticWhatIMadeText: '<p>Ik werkte aan verschillende onderdelen van het spel, waarbij ik hielp met zowel gameplay als UI. Dit is wat ik deed:</p><ul class="project-list"><li>Spelerbeweging (eerste versie): Ik maakte de eerste versie van de spelerbeweging, waarbij ik de basisbediening instelde. Een andere ontwikkelaar wijzigde dit later, maar mijn werk legde de basis.</li><li>Kleurverandering van tegels (eerste versie): Ik maakte het eerste systeem dat tegels van kleur kon laten veranderen. Dit werd ook later aangepast, maar mijn opzet hielp om de functie te starten.</li><li>Menu\'s: Ik ontwierp en codeerde de menu\'s van het spel, waaronder:</li><li style="margin-left: 25px;">Hoofdmenu\'s: De navigatiestructuur opgezet.</li><li style="margin-left: 25px;">Lokale multiplayer-menu\'s: De UI gemaakt voor het selecteren van multiplayeropties.</li><li style="margin-left: 25px;">Karakterselectiemenu: Het systeem gebouwd voor het kiezen van karakters, kleuren en cosmetica.</li></ul><p>Het karakterselectiemenu was een groot deel van mijn werk. Ik schreef een script om:</p><ul class="project-list"><li>Spelers toe te wijzen en kleuren te selecteren.</li><li>Cosmetica te kiezen.</li><li>De gereedstatus weer te geven en ervoor te zorgen dat kleuren niet gedupliceerd werden.</li></ul>',
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
                qteIntro: "Om energie generators in de dungeon te activeren moeten spelers Quick Time Events (QTE's) voltooien. Dit zijn vaardigheidstoetsen die gebruik maken van toetsen (E, R, T of controller equivalenten). "
            },

            cleaningPod: {
                cleaningPodTitle: "Cleaning Pod Verzamelsysteem",
                cleaningPodIntro: "Cleaning pods zijn verspreid door het level. Wanneer verzameld, updaten ze de game state en activeren geluidseffecten.",
            },

            dynamicRoomBehavior: {
                dynamicRoomBehaviorTitle: "Dynamisch Kamergedrag",
                dynamicRoomBehaviorIntro: "Elke kamer past zijn deuren en muren aan op basis van naburige verbindingen.",
            }
        }, yohob: {
            // You Only Have One Box
            description: 'Een uitdagende 2D platformer waar je enige gereedschap een enkele doos is. Begeleid zowel jezelf als je kostbare doos door steeds lastiger obstakels. Verlies je het, dan moet je opnieuw beginnen! Dit spel won de 1e plaats in de GLU Game Jam, waar het werd gemaakt onder het thema "You Only Have One".',
            mobileMessage: "Om You Only Have One Box te spelen, bezoek deze pagina op een computer.",

            levelDesign: {
                levelDesignTitle: "Level Ontwerp",
                levelDesignIntro: "Ik heb de level tilemap gemaakt die de basis vormt van elke uitdaging. De structuur en pacing waren ontworpen om creatieve parkour aan te moedigen."
            },

            enemy: {
                enemyTitle: "Vijand AI — De Kip",
                enemyIntro: "Ik heb de vijandlogica voor de kip geprogrammeerd, waardoor het eenvoudig maar effectief patrouille- en botsingsgedrag kreeg. Het patrouilleert heen en weer, gebruikt raycasts om obstakels of randen te detecteren, en draait om wanneer het een niet-doos of niet-speler object tegenkomt. De vijand kan de speler beschadigen of vernietigd worden door de doos.",
                enemyCodeSnippet: "Snippet: Kip beweging en botsingsdetectie",
                enemyBehaviorTitle: "Gedrag Hoogtepunten:",
                enemyBehaviorPoint1: "Gebruikt raycasting om muren en gevaren te vermijden.",
                enemyBehaviorPoint2: "Draait richting om.",
                enemyBehaviorPoint3: "Beschadigt de speler bij contact.",
                enemyBehaviorPoint4: "Wordt vernietigd wanneer geraakt door de doos."
            },

            finish: {
                finishTitle: "Finish Systeem",
                finishIntro: "Ik heb het finish object geïmplementeerd dat het level beëindigt zodra de speler het bereikt. Het systeem slaat de huidige schade staat van de speler op en activeert een animatie voordat het overgaat naar het volgende level.",
                finishCodeSippet: "Snippet: Level voltooiing activeren en scene overgangen",
                finishCodeSippet2: "Deze coroutine wacht kort op een animatie, laadt dan de volgende scene:"
            }
        },

        walchOrigins: {
            //WA-LCH Origins
            description: 'Gemaakt in ~30 uur tijdens een game jam (thema: "Bubbles") — gebouwd met Unity en C#. WA-LCH Origins is een chaotisch mini-opruimavontuur waarin je een schoonmaakrobot speelt die rommel' +
                'wegschrobt en ontsnapte ratten vangt met bubble-gereedschap. Volledig gemaakt onder game jam druk, met door de speler bestuurbare physics beweging, geanimeerde deuren, val-gebaseerde rattenverwijdering' +
                'en een bubbelige schoonmaakmechaniek.',
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
                doorSystemTitle: "Door System",
                doorSystemPoint1: "Doors open and close automatically when the player enters a trigger zone. Managed with a coroutine-like update loop in.",
            },

            customTrailer: {
                customTrailerTitle: "Zelfgemaakte Trailer",
                customTrailerPoint1: "Ik heb ook een aangepaste trailer gemaakt om de kernmechanieken, sfeer en gameplay loop van de game te laten zien. (Gemaakt na de game jam)",
            },
        },

        portfolio: {
            //Portfolio
            portfolioDescription: "Dit is de website die je nu bekijkt — een volledig op maat gemaakte, meertalige ontwikkelaarsportfolio waarin ik mijn spelontwikkelingsprojecten," +
                "vaardigheden en persoonlijkheid laat zien.Deze is volledig zelf gebouwd met HTML, CSS en JavaScript, met de nadruk op interactiviteit, toegankelijkheid en een beetje humor.",
            whatIMadeStart: "Dit project was meer dan alleen een statische website maken — het is een hele ervaring. Dit is wat ik heb gemaakt:",
            homepage: {
                homePageTitle: "Thuispagina",
                homePagePoint1: "Overzichtelijke layout met profielfoto, dynamische leeftijdsweergave en vaardighedenlijst.",
                homePagePoint2: "Volledig responsief ontwerp met Flexbox en zelfgemaakte media queries.",
            },
            projectsPage: {
                projectsPageTitle: "projectenpagina",
                projectsPagePoint1: "Elk project wordt gepresenteerd in kaartformaat met hover-effecten.",
                projectsPagePoint2: "Laat het jaar van het project zien, de titel, een klein plaatje, korte uitleg en welke technieken ik heb gebruikt.",
                projectsPagePoint3: "Als je op een project klikt, krijg je een uitgebreide pagina te zien met:",
                projectsPagePoint31: "Ingebedde trailer",
                projectsPagePoint32: "Volledige beschrijving van wat ik heb bijgedragen",
                projectsPagePoint33: "Screenshots die je kunt vergroten",
                projectsPagePoint34: "Speelbare game (als dit mogelijk is)",

            },
            languageSupport: {
                languageSupportTitle: "Taalondersteuning",
                languageSupportStart: "Deze website ondersteunt Engels en Nederlands, met een lichtgewicht zelfgemaakt vertalingssysteem dat alle " +
                    "tekst direct bijwerkt via data-i18n attributen — zonder de pagina opnieuw te laden.",
                languageSupportPoint1: "Actieve taal wordt opgeslagen in localStorage",
                languageSupportPoint2: "Ontbrekende sleutels vallen terug op Engels en worden gemarkeerd voor debugging",
                languageSupportPoint3: "Vertalingen zijn gestructureerd en genest voor modulariteit",

            },
            error404: {
                error404PageTitle: "Zefgemaakte 404-pagina",
                error404PagePoint1: 'Bezoekers die verdwalen krijgen een zelfgemaakte foutpagina te zien met een willekeurig karakter uit een van mijn games en een bijpassende leuke boodschap.' +
                    ' Afbeeldingen laden in WebP of als alternatief PNG formaat, afhankelijk van wat de browser ondersteunt. <a href="../404-page-not-found.html" rel="noopener noreferrer" class="credits">Klik hier</a>' +
                    ' om de 404-pagina te bekijken.',
            }, easterEggs: {
                easterEggsTitle: "Easter Eggs",
                easterEggsPoint1: "Probeer ze te vinden. Geen tijd? Klik op de vakjes hieronder om de Easter egg te onthullen.",
                easterEggsPoint2: "De site heeft ook een Minoneese vertaling: een fictieve, speelse derde taaloptie die je kunt vinden via het verborgen icoontje in de footer.",
                easterEggsPoint3: "De woorden \"games\" en \"movies\" aan het einde van het Over Mij gedeelte hebben verborgen klikbare links naar persoonlijke profielen en leuke verwijzingen.",
                spoilerTooltip: "Klik om spoiler te onthullen",
            },
            technologies: {
                technologiesTitle: "Gebruikte Technieken",
                technologiesPoint1: "HTML5 + semantische structuur",
                technologiesPoint2: "zelfgemaakte CSS (geen frameworks)",
                technologiesPoint3: "JavaScript (originele ES6)",
                technologiesPoint4: 'Het <code class="language-html" style="font-size: 20px;">&lt;picture&gt;</code> element zorgt voor formaat-bewuste afbeelding laden.',
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
    }
};
