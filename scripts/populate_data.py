#!/usr/bin/env python3
"""
Populate MediaClub database with vibrant accounts, 15 target clubs (Movies, Series, Books),
active memberships, realistic channel messages with emoji reactions, and rich Direct Messages
for Sarah, Alex, and Marcus.
"""

import sys
import json
from datetime import datetime, timezone, timedelta

# Default password hash for 'Password123!' (BCrypt strength 10)
PASSWORD_HASH = "$2a$10$R83ZMvjtyi24A9QhHZfCYu6y9cNizJMivzzwqsDj6pqqRFIOqW9ka"

# 12 diverse, authentic accounts
USERS = [
    {
        "username": "sarah_cinema",
        "email": "sarah.cinema@mediaclub.com",
        "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=SarahCinema&backgroundColor=b6e3f4",
        "status": "ONLINE",
        "is_global_admin": False
    },
    {
        "username": "alex_reads",
        "email": "alex.reads@mediaclub.com",
        "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=AlexReads&backgroundColor=ffd5dc",
        "status": "ONLINE",
        "is_global_admin": False
    },
    {
        "username": "marcus_binge",
        "email": "marcus.binge@mediaclub.com",
        "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=MarcusBinge&backgroundColor=d1d4f9",
        "status": "ONLINE",
        "is_global_admin": False
    },
    {
        "username": "elena_v",
        "email": "elena.vance@mediaclub.com",
        "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=ElenaVance&backgroundColor=ffdfbf",
        "status": "ONLINE",
        "is_global_admin": False
    },
    {
        "username": "david_k",
        "email": "david.kim@mediaclub.com",
        "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=DavidKim&backgroundColor=c0aede",
        "status": "ONLINE",
        "is_global_admin": False
    },
    {
        "username": "maya_tv",
        "email": "maya.patel@mediaclub.com",
        "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=MayaPatel&backgroundColor=ffd5dc",
        "status": "ONLINE",
        "is_global_admin": False
    },
    {
        "username": "jordan_lit",
        "email": "jordan.reed@mediaclub.com",
        "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=JordanReed&backgroundColor=b6e3f4",
        "status": "OFFLINE",
        "is_global_admin": False
    },
    {
        "username": "chloe_geek",
        "email": "chloe.geek@mediaclub.com",
        "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=ChloeGeek&backgroundColor=ffdfbf",
        "status": "ONLINE",
        "is_global_admin": False
    },
    {
        "username": "samir_b",
        "email": "samir.b@mediaclub.com",
        "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=SamirBakshi&backgroundColor=c0aede",
        "status": "OFFLINE",
        "is_global_admin": False
    },
    {
        "username": "zoe_novels",
        "email": "zoe.novels@mediaclub.com",
        "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=ZoeMiller&backgroundColor=ffd5dc",
        "status": "ONLINE",
        "is_global_admin": False
    },
    {
        "username": "leo_films",
        "email": "leo.films@mediaclub.com",
        "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=LeoMoreno&backgroundColor=b6e3f4",
        "status": "ONLINE",
        "is_global_admin": False
    },
    {
        "username": "clara_m",
        "email": "clara.moreau@mediaclub.com",
        "avatar_url": "https://api.dicebear.com/7.x/avataaars/svg?seed=ClaraMoreau&backgroundColor=ffdfbf",
        "status": "OFFLINE",
        "is_global_admin": False
    }
]

CLUBS = [
    # --- MOVIES ---
    {
        "key": "avatar",
        "name": "Avatar",
        "media_type": "MOVIE",
        "external_source": "TMDB",
        "external_id": "19995",
        "cover_image_url": "https://image.tmdb.org/t/p/w500/gKY6q7SjCkAU6FqvqWybDYgUKIF.jpg",
        "description": "In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following orders and protecting an alien civilization.",
        "release_date": "2009-12-16",
        "creator": "sarah_cinema",
        "members": ["sarah_cinema", "elena_v", "leo_films", "chloe_geek", "marcus_binge", "alex_reads"],
        "info": [
            ("sarah_cinema", "Welcome to the Avatar Club! 🌿 Discuss James Cameron's groundbreaking sci-fi epics, the bioluminescent wonder of Pandora, Na'vi culture, and cutting-edge 3D VFX technology. Please keep plot discussions about The Way of Water and Fire and Ash in #spoilers!")
        ],
        "general": [
            ("leo_films", "Rewatched Avatar in 4K HDR last night. It's astonishing how ahead of its time the CGI was back in 2009. The lighting on Pandora still beats most modern releases."),
            ("sarah_cinema", "Agreed 100%! The attention to detail in the flora and fauna ecosystem is what truly sets it apart. Cameron spent years worldbuilding before even shooting a single frame."),
            ("elena_v", "The floating Hallelujah Mountains sequence with James Horner's score always gives me goosebumps. Pure cinematic magic ✨"),
            ("chloe_geek", "Also the sound design! Every creature vocalization feels organic and terrifying, especially the Thanator chase scene."),
            ("marcus_binge", "Gotta admit, as someone who usually prefers dialogue-heavy dramas, Avatar's world immersion is in a league of its own. Hard not to get sucked into Pandora.")
        ],
        "spoilers": [
            ("sarah_cinema", "The battle of the Tree of Souls is such a visceral climax. When Eywa answers Jake's prayers and the wildlife charges into battle, the theater erupted!"),
            ("leo_films", "Quaritch survived in recombinant form in the sequels which was such an interesting storytelling direction. His dynamic with Spider adds so much moral ambiguity.")
        ],
        "requests": [
            ("elena_v", "Can we do a club watch party for the Extended Collector's Edition? The opening scenes set in dystopian Earth add so much context to Jake's motivations!")
        ]
    },
    {
        "key": "avengers_endgame",
        "name": "Avengers: Endgame",
        "media_type": "MOVIE",
        "external_source": "TMDB",
        "external_id": "299534",
        "cover_image_url": "https://image.tmdb.org/t/p/w500/jtDv3lCnST0fZRvdYFwR5CVwK2x.jpg",
        "description": "After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more to undo Thanos' actions.",
        "release_date": "2019-04-24",
        "creator": "chloe_geek",
        "members": ["chloe_geek", "sarah_cinema", "leo_films", "david_k", "marcus_binge", "elena_v"],
        "info": [
            ("chloe_geek", "Whatever it takes. 🛡️ Welcome to the Avengers: Endgame Club! Discuss the culmination of 22 films, character arcs, the time heist, and the legacy of the original six Avengers. Spoilers permitted in #spoilers!")
        ],
        "general": [
            ("chloe_geek", "Five years later, nothing has ever matched opening night for Endgame in a packed cinema. The collective energy was unbelievable."),
            ("sarah_cinema", "The pacing of that 3-hour runtime is miraculous. The first hour of quiet grief and depression grounds the stakes before the high-octane time heist."),
            ("leo_films", "Alan Silvestri's 'Portals' score is timeless. That solitary horn building into the full brass orchestra when the first portal opens behind Cap... absolute cinema."),
            ("david_k", "Robert Downey Jr.'s acting in the opening scene with Nebula, and then confronting Steve back on Earth, deserved award nominations. So raw."),
            ("marcus_binge", "Endgame proved that long-form cinematic universes can actually stick the landing when the emotional core of the characters is respected.")
        ],
        "spoilers": [
            ("chloe_geek", "Cap picking up Mjolnir is the greatest crowd reaction in movie history. Period. The smirk from Thor: 'I knew it!' ⚡"),
            ("sarah_cinema", "Tony's snap: 'And I... am... Iron Man.' Perfectly bringing his entire 11-year journey full circle from the 2008 press conference. Tears every time."),
            ("leo_films", "The final dance between Steve and Peggy at the end was such a bittersweet, earned conclusion to his arc.")
        ],
        "requests": [
            ("david_k", "Who's down for a full Infinity Saga marathon over the holidays? We could sync up Infinity War and Endgame back-to-back!")
        ]
    },
    {
        "key": "lotr_rotk",
        "name": "The Lord of the Rings: The Return of the King",
        "media_type": "MOVIE",
        "external_source": "TMDB",
        "external_id": "122",
        "cover_image_url": "https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
        "description": "As armies mass for a final battle that will decide the fate of the world, one member of the Fellowship is revealed as the noble heir to the throne of Men, while Frodo and Sam venture into Mordor.",
        "release_date": "2003-12-17",
        "creator": "sarah_cinema",
        "members": ["sarah_cinema", "alex_reads", "samir_b", "leo_films", "elena_v", "marcus_binge", "david_k"],
        "info": [
            ("sarah_cinema", "👑 'There is some good in this world, and it's worth fighting for.' Welcome to the Return of the King Club! Celebrating Peter Jackson's 11-Oscar-winning masterpiece and Tolkien's eternal mythology.")
        ],
        "general": [
            ("sarah_cinema", "The Ride of the Rohirrim at Pelennor Fields remains the greatest cinematic charge ever filmed. The horns of Rohan, Théoden's speech, the violin crescendo... perfection."),
            ("alex_reads", "As someone who re-reads the books every year, Bernard Hill's delivery of 'Death! Ride to ruin and the world's ending!' captures Tolkien's prose better than anything else."),
            ("samir_b", "And Howard Shore's soundtrack is simply unmatched in film history. The Lighting of the Beacons suite is pure orchestral triumph."),
            ("leo_films", "The practical miniatures (big-atures) of Minas Tirith and practical armor give this movie a texture and weight CGI still struggles to replicate."),
            ("marcus_binge", "I'll never understand people who complain about the multiple endings. After 12 hours across the trilogy, every single character deserved their proper farewell.")
        ],
        "spoilers": [
            ("alex_reads", "'I can't carry it for you, but I can carry you!' Samwise Gamgee is the true hero of Middle-earth. Sean Astin gave the performance of a lifetime on Mount Doom."),
            ("sarah_cinema", "Aragorn's coronation: 'My friends, you bow to no one.' And the entire court of Gondor kneeling to the four hobbits. Waterworks every single time 😭"),
            ("samir_b", "The Grey Havens farewell broke my heart. The tragedy of Frodo being too wounded by the Ring to truly live in the Shire again is so poignant.")
        ],
        "requests": [
            ("alex_reads", "Let's organize a detailed comparison thread between the book and the extended cut scenes—especially the Houses of Healing and the confrontation at the Black Gate!")
        ]
    },
    {
        "key": "dark_knight",
        "name": "The Dark Knight",
        "media_type": "MOVIE",
        "external_source": "TMDB",
        "external_id": "155",
        "cover_image_url": "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        "description": "Batman raises the stakes in his war on crime with the help of Lt. Jim Gordon and DA Harvey Dent, but they soon find themselves prey to a reign of chaos unleashed by the Joker.",
        "release_date": "2008-07-16",
        "creator": "david_k",
        "members": ["david_k", "sarah_cinema", "marcus_binge", "leo_films", "chloe_geek", "samir_b"],
        "info": [
            ("david_k", "🦇 'Why so serious?' Welcome to The Dark Knight Club. A space for analyzing Christopher Nolan's neo-noir masterpiece, Heath Ledger's legendary Joker, Hans Zimmer's score, and the philosophy of Gotham.")
        ],
        "general": [
            ("david_k", "Heath Ledger's Joker isn't just a comic book villain; it's a study in philosophical anarchism. He doesn't want money or power—he wants to break society's moral illusion."),
            ("sarah_cinema", "The bank heist prologue shot on IMAX cameras set an entirely new standard for blockbuster filmmaking. Nolan's insistence on in-camera practical effects makes it feel so grounded."),
            ("marcus_binge", "The interrogation room scene between Batman and Joker is peak cinema writing. The lighting, the punches having zero psychological effect on Joker... iconic."),
            ("leo_films", "Wally Pfister's cinematography and Zimmer's rising two-note Joker motif create such intense, claustrophobic dread."),
            ("chloe_geek", "Aaron Eckhart's Harvey Dent is so tragic too. The tragedy of 'You either die a hero, or you live long enough to see yourself become the villain.'")
        ],
        "spoilers": [
            ("david_k", "The two ferry experiment is the philosophical heart of the movie. Joker expected Gotham to tear itself apart, and the prisoners throwing away the detonator proved him wrong."),
            ("sarah_cinema", "The closing monologue by Gordon: 'He's a silent guardian, a watchful protector... a Dark Knight.' Gives me chills every time the Batman theme drops!")
        ],
        "requests": [
            ("leo_films", "Can we do a screenplay breakdown of Jonathan & Christopher Nolan's three-act structure for this? It's taught in film schools for a reason.")
        ]
    },
    {
        "key": "harry_potter_1",
        "name": "Harry Potter and the Sorcerer's Stone",
        "media_type": "MOVIE",
        "external_source": "TMDB",
        "external_id": "671",
        "cover_image_url": "https://image.tmdb.org/t/p/w500/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg",
        "description": "Harry Potter discovers on his 11th birthday that he is the orphaned son of two powerful wizards and possesses unique magical powers of his own, inviting him to attend Hogwarts.",
        "release_date": "2001-11-16",
        "creator": "zoe_novels",
        "members": ["zoe_novels", "alex_reads", "chloe_geek", "sarah_cinema", "david_k", "elena_v"],
        "info": [
            ("zoe_novels", "⚡ Welcome to the Harry Potter Club! From the Great Hall to Diagon Alley, celebrate the film that introduced generations to the Wizarding World. Warm butterbeers for everyone!")
        ],
        "general": [
            ("zoe_novels", "The sheer warmth and comfort of Chris Columbus's direction in this first film is untouchable. John Williams' 'Hedwig's Theme' is pure nostalgia."),
            ("alex_reads", "Stuart Craig's production design for the Great Hall, Diagon Alley, and the Gryffindor common room basically shaped how the entire world envisions fantasy schools."),
            ("chloe_geek", "Maggie Smith as Professor McGonagall and Alan Rickman as Snape were the most casting-accurate choices in movie history."),
            ("sarah_cinema", "The scene where Harry first buys his wand at Ollivanders: 'The wand chooses the wizard, Mr. Potter.' That sense of childlike wonder is magical.")
        ],
        "spoilers": [
            ("zoe_novels", "The Wizard's Chess sequence where Ron sacrifices himself so Harry and Hermione can go forward! 'Not me, not Hermione... you!' What a moment of bravery."),
            ("alex_reads", "The mirror of Erised scenes still hurt. Seeing Harry staring at his parents in the reflection broke my heart as a kid and still does now.")
        ],
        "requests": [
            ("chloe_geek", "Let's do a Wizarding World trivia night in the club this weekend! House points on the line 🦁🦅🦡🐍")
        ]
    },

    # --- SERIES / TV SHOWS ---
    {
        "key": "game_of_thrones",
        "name": "Game of Thrones",
        "media_type": "SHOW",
        "external_source": "TMDB",
        "external_id": "1399",
        "cover_image_url": "https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
        "description": "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war while an ancient evil awakens in the farthest north.",
        "release_date": "2011-04-17",
        "creator": "marcus_binge",
        "members": ["marcus_binge", "alex_reads", "clara_m", "samir_b", "david_k", "sarah_cinema"],
        "info": [
            ("marcus_binge", "🗡️ 'When you play the game of thrones, you win or you die.' Welcome to the Westeros hub! We discuss seasons 1-8, lore, character arcs, theories, and George R.R. Martin's universe.")
        ],
        "general": [
            ("marcus_binge", "Seasons 1 through 4 of Game of Thrones are perhaps the greatest run of television drama ever produced. The political dialogue between Tyrion, Tywin, Varys, and Littlefinger is untouchable."),
            ("alex_reads", "Peter Dinklage's trial speech in Season 4 Episode 6: 'I did not do it. I did not kill Joffrey, but I wish that I had!' Charles Dance and Dinklage sharing the screen was masterclass acting."),
            ("clara_m", "And Ramin Djawadi's score! 'Light of the Seven' during the Sept of Baelor sequence created more tension with just piano and cello than any action sequence could."),
            ("samir_b", "The Battle of the Bastards and Hardhome showed scale on television that rivaled $200M Hollywood blockbusters.")
        ],
        "spoilers": [
            ("marcus_binge", "The Red Wedding was the ultimate cultural shockwave. No show before or since had the audacity to wipe out the main heroic bloodline in five minutes of sheer tragedy."),
            ("clara_m", "Ned Stark's execution in Baelor set the rule: no one is safe with plot armor. That's what made the early seasons feel so high-stakes.")
        ],
        "requests": [
            ("alex_reads", "Let's do a character bracket tournament: who was the best tactical player of the game? Tywin vs Olenna Tyrell would be an insane matchup!")
        ]
    },
    {
        "key": "breaking_bad",
        "name": "Breaking Bad",
        "media_type": "SHOW",
        "external_source": "TMDB",
        "external_id": "1396",
        "cover_image_url": "https://image.tmdb.org/t/p/w500/anFx9aTOOYqgS3v7x3R84Kz67ly.jpg",
        "description": "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
        "release_date": "2008-01-20",
        "creator": "marcus_binge",
        "members": ["marcus_binge", "david_k", "maya_tv", "samir_b", "sarah_cinema", "chloe_geek"],
        "info": [
            ("marcus_binge", "⚗️ 'I am the one who knocks.' Welcome to the Breaking Bad Club! Dissecting Vince Gilligan's peerless transformation of Mr. Chips into Scarface. Tread lightly.")
        ],
        "general": [
            ("marcus_binge", "The consistency of Breaking Bad is unmatched. 62 episodes, zero filler, escalating tension that never drops the ball from the pilot to 'Felina'."),
            ("david_k", "Bryan Cranston and Aaron Paul had lightning-in-a-bottle chemistry. The tragedy of Jesse Pinkman being manipulated by Walter is the emotional heart of the series."),
            ("maya_tv", "Giancarlo Esposito as Gus Fring redefined the calm, calculated villain archetype. Straightening his tie until his final breath."),
            ("samir_b", "Also the visual storytelling! Color palettes representing morality, the POV camera angles, the use of timelapse in the New Mexico desert... cinematic brilliance.")
        ],
        "spoilers": [
            ("marcus_binge", "'Ozymandias' (5x14) is quite literally the highest rated episode of television in history, and it earned every fraction of that praise. Hank in the desert, the knife fight, the phone call."),
            ("david_k", "Walt's confession to Skyler in the finale: 'I did it for me. I liked it. I was good at it. And I was really... I was alive.' The absolute honesty after seasons of lying.")
        ],
        "requests": [
            ("maya_tv", "Can we do a Better Call Saul comparison thread next? The Jimmy/Kim Wexler dynamic rivals Walt/Jesse in emotional complexity!")
        ]
    },
    {
        "key": "the_office",
        "name": "The Office (US)",
        "media_type": "SHOW",
        "external_source": "TMDB",
        "external_id": "2316",
        "cover_image_url": "https://image.tmdb.org/t/p/w500/7DJKHzAi83BmQrWLrYYOqcoKfhR.jpg",
        "description": "The everyday lives of office employees in the Scranton, Pennsylvania branch of the fictional Dunder Mifflin Paper Company.",
        "release_date": "2005-03-24",
        "creator": "maya_tv",
        "members": ["maya_tv", "marcus_binge", "zoe_novels", "chloe_geek", "elena_v", "david_k"],
        "info": [
            ("maya_tv", "📄 'That's what she said!' Welcome to Dunder Mifflin Scranton! Grab a Dundee award, avoid Dwight's fire drills, and share your favorite quotes and comfort rewatch moments.")
        ],
        "general": [
            ("maya_tv", "I've rewatched The Office probably eight times and the Dinner Party episode still makes me wheeze with laughter every single time."),
            ("marcus_binge", "'That is a $200 plasma screen TV you just killed! Good luck paying me back on your zero dollars a year plus benefits salary, babe!' Michael and Jan were out of control 😂"),
            ("zoe_novels", "Jim putting Dwight's stapler in Jell-O and paying people to call him Darryl... the prank compilation is undefeated comfort food."),
            ("chloe_geek", "Stress Relief part 1 where Dwight locks everyone in and sets the trash can on fire: 'Today, smoking is going to save lives.' Bandit getting thrown through the ceiling tiles!"),
            ("elena_v", "Steve Carell's physical comedy and facial expressions into the mockumentary camera are unparalleled.")
        ],
        "spoilers": [
            ("maya_tv", "Michael leaving in 'Goodbye, Michael' when he takes off his mic at the airport and hugs Pam without audio. Tears every time."),
            ("zoe_novels", "Dwight and Angela's wedding in the finale, and Michael showing up as the Bestest Mensch: 'I feel like all my kids grew up, and then they married each other. It's every parent's dream!'")
        ],
        "requests": [
            ("marcus_binge", "Vote for the ultimate Dunder Mifflin prank: Identity Theft Dwight vs Pavlov's Altoids vs Wrapping Paper Desk!")
        ]
    },
    {
        "key": "stranger_things",
        "name": "Stranger Things",
        "media_type": "SHOW",
        "external_source": "TMDB",
        "external_id": "66732",
        "cover_image_url": "https://image.tmdb.org/t/p/w500/uOOtwVbSr4QDjAGIifLDwpb2Pdl.jpg",
        "description": "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
        "release_date": "2016-07-15",
        "creator": "elena_v",
        "members": ["elena_v", "marcus_binge", "maya_tv", "chloe_geek", "sarah_cinema", "zoe_novels"],
        "info": [
            ("elena_v", "🚲 Welcome to Hawkins, Indiana! D&D campaigns, synthwave soundtracks, Upside Down creatures, and 80s nostalgia. Friends don't lie!")
        ],
        "general": [
            ("elena_v", "The Duffer Brothers captured lightning in a bottle with the kids' chemistry in Season 1. It felt like Stand by Me meets The Goonies meets Alien."),
            ("chloe_geek", "The synth soundtrack by Survive is incredible. The title sequence alone instantly pulls you into the mid-80s horror vibe."),
            ("maya_tv", "Steve Harrington having the greatest redemption arc in modern television history. From high school bully to the world's best babysitter with a spiked baseball bat!"),
            ("sarah_cinema", "Winona Ryder's performance with the Christmas lights in the living room communicating with Will was so raw and frantic.")
        ],
        "spoilers": [
            ("elena_v", "The 'Running Up That Hill' Kate Bush sequence in Season 4 Episode 4 with Max escaping Vecna is one of the most thrilling TV scenes of the decade!"),
            ("chloe_geek", "Eddie Munson's Master of Puppets guitar solo on the roof of the Upside Down trailer... most metal sacrifice ever 🎸")
        ],
        "requests": [
            ("maya_tv", "Who has the best theories for Season 5? How are they going to defeat Vecna now that the Upside Down is bleeding into Hawkins?")
        ]
    },
    {
        "key": "the_wire",
        "name": "The Wire",
        "media_type": "SHOW",
        "external_source": "TMDB",
        "external_id": "1438",
        "cover_image_url": "https://image.tmdb.org/t/p/w500/4lbclFySvugI51fwsyxBTOm4DqK.jpg",
        "description": "Told from the points of view of Baltimore homicide and narcotics detectives and their targets, capturing a universe in which the national war on drugs is a self-sustaining bureaucracy.",
        "release_date": "2002-06-02",
        "creator": "samir_b",
        "members": ["samir_b", "marcus_binge", "david_k", "jordan_lit", "clara_m"],
        "info": [
            ("samir_b", "⚖️ 'All the pieces matter.' Welcome to The Wire Club. David Simon's profound sociological dissection of the American city—the drug trade, the docks, City Hall, schools, and the press.")
        ],
        "general": [
            ("samir_b", "The Wire isn't just entertainment; it's high literature on screen. Each season peels back another layer of systemic institutional failure in Baltimore."),
            ("marcus_binge", "Michael K. Williams as Omar Little whistling 'The Farmer in the Dell' through the projects... one of the greatest characters ever conceived in fiction."),
            ("david_k", "Stringer Bell taking macroeconomics at night school while managing the Barksdale drug empire. The contrast between him and Avon was brilliant."),
            ("jordan_lit", "Season 4 focusing on the middle school children (Michael, Dukie, Randy, Namond) broke my heart into pieces. No other show has depicted the tragedy of neglected youth so honestly.")
        ],
        "spoilers": [
            ("samir_b", "The death of Bodie Broadus on his corner. He fought like a pawn on the chessboard and died like one, refusing to give up his ground."),
            ("marcus_binge", "Omar's sudden, anti-climactic demise in a corner store by a little boy. Proof that the game doesn't care about your legend—it just rolls on.")
        ],
        "requests": [
            ("david_k", "Can we do an in-depth breakdown of David Simon's background as a Baltimore Sun crime reporter and how real-life cases inspired the show?")
        ]
    },

    # --- BOOKS ---
    {
        "key": "da_vinci_code",
        "name": "The Da Vinci Code",
        "media_type": "BOOK",
        "external_source": "OPEN_LIBRARY",
        "external_id": "/works/OL76837W",
        "cover_image_url": "https://covers.openlibrary.org/b/id/9255229-L.jpg",
        "description": "While in Paris, Harvard symbologist Robert Langdon is awakened by an urgent late-night phone call. The elderly curator of the Louvre has been murdered inside the museum, his body covered in bizarre symbols.",
        "release_date": "2003",
        "creator": "alex_reads",
        "members": ["alex_reads", "jordan_lit", "clara_m", "sarah_cinema", "david_k"],
        "info": [
            ("alex_reads", "🔍 Welcome to The Da Vinci Code Book Club! Unravelling Dan Brown's thrilling symbology, secret societies (Priory of Sion, Opus Dei), anagrams, and art history mysteries.")
        ],
        "general": [
            ("alex_reads", "Say what you will about Dan Brown's prose, his cliffhangers and pacing in The Da Vinci Code are absolute page-turner masterclasses. You physically cannot put the book down."),
            ("jordan_lit", "The opening 100 pages inside the Louvre with Jacques Saunière's coded dying message on the parquet floor hooked an entire generation of readers."),
            ("clara_m", "The anagrams (O, Draconian devil! Oh, lame saint!) and the Fibonacci sequence integration were so fun to solve along with Sophie Neveu."),
            ("sarah_cinema", "And the setting in Paris, Westminster Abbey, and Rosslyn Chapel made the whole quest feel like a high-stakes scavenger hunt across European history.")
        ],
        "spoilers": [
            ("alex_reads", "The revelation that Sophie is actually the living descendant of the Merovingian bloodline at Rosslyn Chapel was such a satisfying mythological climax."),
            ("clara_m", "Sir Leigh Teabing being the Teacher behind the assassinations! He seemed like such an eccentric, lovable eccentric scholar in the beginning.")
        ],
        "requests": [
            ("jordan_lit", "Let's read Angels & Demons next! In many ways, the Vatican antimatter race against the clock was even more intense than Da Vinci Code.")
        ]
    },
    {
        "key": "hunger_games",
        "name": "The Hunger Games",
        "media_type": "BOOK",
        "external_source": "OPEN_LIBRARY",
        "external_id": "/works/OL5735363W",
        "cover_image_url": "https://covers.openlibrary.org/b/id/12646537-L.jpg",
        "description": "In a dark vision of the near future, twelve boys and twelve girls are forced to appear in a live event called The Hunger Games. There is only one rule: kill or be killed.",
        "release_date": "2008",
        "creator": "zoe_novels",
        "members": ["zoe_novels", "alex_reads", "chloe_geek", "elena_v", "sarah_cinema"],
        "info": [
            ("zoe_novels", "🏹 'May the odds be ever in your favor.' Welcome to the Panem Book Club! Analyzing Suzanne Collins' dystopian critique of media spectacle, war trauma, and rebellion.")
        ],
        "general": [
            ("zoe_novels", "Suzanne Collins' use of present-tense, first-person narration puts you straight inside Katniss Everdeen's survivalist mindset. Her internal monologue is cold, pragmatic, and heartbreaking."),
            ("alex_reads", "What makes The Hunger Games stand out from typical YA is that Katniss is severely traumatized by the violence. It never glorifies the arena; the psychological scars are real."),
            ("chloe_geek", "Rue's connection with Katniss and the four-note mockingjay whistle... I was sobbing on the bus when I first read that chapter."),
            ("elena_v", "The Capitol's obsession with plastic surgery, reality TV ratings, and culinary excess while the districts starve is such a sharp, enduring social satire.")
        ],
        "spoilers": [
            ("zoe_novels", "The nightlock berries stunt at the climax! Defying the Gamemakers by threatening a double suicide was the ultimate political middle finger to President Snow."),
            ("alex_reads", "Peeta Mellark painting Rue's flowers in Catching Fire showed just how morally intact he remained despite Capitol cruelty.")
        ],
        "requests": [
            ("chloe_geek", "Let's do a deep dive into The Ballad of Songbirds and Snakes! Coriolanus Snow's slow descent into tyranny is fascinating.")
        ]
    },
    {
        "key": "twilight",
        "name": "Twilight",
        "media_type": "BOOK",
        "external_source": "OPEN_LIBRARY",
        "external_id": "/works/OL5720023W",
        "cover_image_url": "https://covers.openlibrary.org/b/id/12641977-L.jpg",
        "description": "Bella Swan's move to small-town Washington leads to an encounter with Edward Cullen, a mysterious and alluring teenager whose dark secret threatens her life: he is a vampire.",
        "release_date": "2005",
        "creator": "zoe_novels",
        "members": ["zoe_novels", "maya_tv", "alex_reads", "chloe_geek"],
        "info": [
            ("zoe_novels", "🍎 'About three things I was absolutely positive.' Welcome to Forks, Washington! Discussing Stephenie Meyer's cultural phenomenon, the Cullen family lore, and the Pacific Northwest atmosphere.")
        ],
        "general": [
            ("zoe_novels", "The moody, rainy atmosphere of Forks, Washington in this book is unmatched. You can literally smell the cedar trees, mist, and damp earth on every page."),
            ("maya_tv", "The meadow scene and the biology class tension between Bella and Edward started a worldwide obsession for a reason!"),
            ("alex_reads", "Say what you want about the romance tropes, Meyer's vampire lore—baseball during thunderstorms, venom that crystalizes, individual mind abilities—was super creative."),
            ("chloe_geek", "Alice Cullen and Jasper's backstory in the later chapters was so rich. Alice is hands down the best character in the whole saga.")
        ],
        "spoilers": [
            ("zoe_novels", "The ballet studio showdown with James! The sheer panic when Bella thinks her mother is being held hostage, and the Cullens arriving just in time."),
            ("maya_tv", "Edward having to suck the venom out of Bella's wrist while fighting the urge to drain her blood completely... peak romantic tension.")
        ],
        "requests": [
            ("zoe_novels", "Midnight Sun discussion! Reading the first book entirely from Edward's telepathic, over-analytical vampire perspective was so revealing.")
        ]
    },
    {
        "key": "dragon_tattoo",
        "name": "The Girl with the Dragon Tattoo",
        "media_type": "BOOK",
        "external_source": "OPEN_LIBRARY",
        "external_id": "/works/OL5784622W",
        "cover_image_url": "https://covers.openlibrary.org/b/id/9274740-L.jpg",
        "description": "Disgraced journalist Mikael Blomkvist is hired to investigate the forty-year-old disappearance of Harriet Vanger, partnering with Lisbeth Salander, a genius hacker with photographic memory.",
        "release_date": "2005",
        "creator": "jordan_lit",
        "members": ["jordan_lit", "clara_m", "alex_reads", "david_k", "samir_b"],
        "info": [
            ("jordan_lit", "🐉 Welcome to the Millennium Book Club! Investigating Stieg Larsson's legendary Scandinavian crime masterpiece, financial journalism, forensic hacking, and the iconic Lisbeth Salander.")
        ],
        "general": [
            ("jordan_lit", "Lisbeth Salander is one of the most uniquely capable, fiercely independent antiheroes ever written in detective fiction. Her photographic memory and relentless grit are unforgettable."),
            ("clara_m", "The secluded island setting of Hedeby in the dead of Swedish winter creates such an eerie, isolated locked-room murder mystery atmosphere."),
            ("alex_reads", "Stieg Larsson was an investigative journalist in real life, and you can feel his deep knowledge of corporate corruption, banking fraud, and far-right underground networks in every chapter."),
            ("david_k", "The way Mikael Blomkvist deciphers the family photos from Children's Day in 1966 across different angles was pure detective gold.")
        ],
        "spoilers": [
            ("jordan_lit", "The horrific reveal of Martin Vanger's basement of horrors, and Harriet living under an assumed identity in Australia the entire forty years!"),
            ("clara_m", "Lisbeth taking complete financial revenge on Wennerström at the end using offshore dummy corporations. Nobody crosses Salander and walks away clean.")
        ],
        "requests": [
            ("alex_reads", "Let's read The Girl Who Played with Fire next to dive deeper into Lisbeth's shadowy past and Section espionage!")
        ]
    },
    {
        "key": "kite_runner",
        "name": "The Kite Runner",
        "media_type": "BOOK",
        "external_source": "OPEN_LIBRARY",
        "external_id": "/works/OL5781992W",
        "cover_image_url": "https://covers.openlibrary.org/b/id/14846827-L.jpg",
        "description": "An epic tale of friendship and redemption, following Amir, a young boy from Kabul, and his bond with Hassan, the son of his father's servant, set against political upheaval in Afghanistan.",
        "release_date": "2003",
        "creator": "alex_reads",
        "members": ["alex_reads", "jordan_lit", "samir_b", "clara_m", "elena_v"],
        "info": [
            ("alex_reads", "🪁 'For you, a thousand times over.' Welcome to The Kite Runner Book Club. A profound journey of brotherhood, guilt, moral courage, and redemption by Khaled Hosseini.")
        ],
        "general": [
            ("alex_reads", "Khaled Hosseini's depiction of 1970s Kabul—the winter kite fighting tournaments, the pomegranate trees, the smell of lamb kebabs—paints such a vibrant picture of an Afghanistan before decades of war."),
            ("samir_b", "'For you, a thousand times over.' Hassan's fierce, unconditional loyalty to Amir makes Amir's childhood cowardice cut so much deeper."),
            ("jordan_lit", "Baba's character is so complex. A towering figure of physical courage and community respect, yet carrying his own hidden shame."),
            ("elena_v", "Hosseini's prose is deceptively simple but packs such a massive emotional punch. You need a box of tissues by chapter 7.")
        ],
        "spoilers": [
            ("alex_reads", "Rahim Khan's phone call: 'There is a way to be good again.' That sentence defines the entire thematic arc of the novel. Amir finally returning to Taliban-controlled Kabul to rescue Sohrab."),
            ("samir_b", "The revelation that Hassan was actually Baba's biological son and Amir's half-brother recontextualized everything Baba ever did for them.")
        ],
        "requests": [
            ("jordan_lit", "We should definitely read A Thousand Splendid Suns next. Hosseini's portrayal of Mariam and Laila is just as heart-wrenching.")
        ]
    }
]

# Direct Message threads for the 3 primary user accounts
DIRECT_MESSAGES = [
    # 1. sarah_cinema <-> alex_reads (Both in LOTR, Avatar, Da Vinci Code)
    {
        "user_a": "sarah_cinema",
        "user_b": "alex_reads",
        "thread": [
            ("alex_reads", "Hey Sarah! Saw you're moderating the Return of the King club. Amazing to see fellow Tolkien fans here!", 48),
            ("sarah_cinema", "Hey Alex! Absolutely! The Ride of the Rohirrim is genuinely my favorite cinematic moment ever. Do you prefer the book version or Jackson's extended film cut?", 46),
            ("alex_reads", "Honestly, both in different ways! Tolkien's prose during the charge of the Rohirrim is pure heroic poetry, but Jackson and Howard Shore gave it that visual and musical thunder.", 44),
            ("sarah_cinema", "Spot on! By the way, have you read The Da Vinci Code club yet? I saw you started it—I'm about to jump into the book discussion there too.", 36),
            ("alex_reads", "Yes! It's such a fun page-turner. Pop into #general when you get a chance, we're talking about the Louvre opening chapters right now!", 30),
            ("sarah_cinema", "On my way! And let me know if you ever need movie recommendations—The Dark Knight is calling your name if you haven't rewatched recently 😉", 24),
            ("alex_reads", "Haha deal! I'll put Nolan on my weekend queue 🍿", 20)
        ]
    },
    # 2. sarah_cinema <-> marcus_binge (Both in Breaking Bad, Avatar, Avengers, The Dark Knight, LOTR)
    {
        "user_a": "sarah_cinema",
        "user_b": "marcus_binge",
        "thread": [
            ("marcus_binge", "Sarah! Loved your analysis of The Dark Knight's IMAX bank heist prologue in the club. Nolan's practical stunt work was so ahead of its time.", 72),
            ("sarah_cinema", "Thanks Marcus! What's crazy is they actually blew up the real abandoned building in Chicago for the hospital scene too. No CGI shortcut.", 70),
            ("marcus_binge", "Right?! That little pause Heath Ledger does when the remote detonator stalls... legendary improv. Have you ever watched Breaking Bad, by the way?", 65),
            ("sarah_cinema", "I watched the first 2 seasons years ago, but never finished it! You're making me feel like I committed a crime by not finishing it haha.", 60),
            ("marcus_binge", "You HAVE to finish it! Seasons 4 and 5 are peak television. 'Ozymandias' is the highest rated TV episode in history for a reason.", 50),
            ("sarah_cinema", "Okay, you've convinced me. Starting Season 3 tonight! No spoilers in our DMs though!", 40),
            ("marcus_binge", "Lips are sealed 🤐 Let me know your thoughts after the Season 3 finale... you're gonna lose your mind!", 35)
        ]
    },
    # 3. sarah_cinema <-> elena_v (Both in Avatar, LOTR, Avengers)
    {
        "user_a": "elena_v",
        "user_b": "sarah_cinema",
        "thread": [
            ("elena_v", "Hey Sarah! Loved your breakdown of Avatar's visual worldbuilding in the club. Did you catch the IMAX 3D re-release?", 28),
            ("sarah_cinema", "Hey Elena! Yes, twice actually haha! The underwater Pandora sequences and high-frame-rate flying scenes are mindblowing on a giant screen.", 25),
            ("elena_v", "I'm going this Saturday! So excited. Are you planning to watch the upcoming extended cut too?", 18),
            ("sarah_cinema", "Definitely! We should do a synchronized watch party with the club members once the 4K stream drops.", 12),
            ("elena_v", "Count me in! That would be so much fun 🌿", 6)
        ]
    },
    # 4. sarah_cinema <-> leo_films (Both in Avatar, Avengers, Dark Knight, LOTR)
    {
        "user_a": "leo_films",
        "user_b": "sarah_cinema",
        "thread": [
            ("leo_films", "Sarah! Did you see the Avengers: Endgame portal scene discussion in the club? Pure cinema history.", 34),
            ("sarah_cinema", "Chills every single time Alan Silvestri's score swells and Cap says 'Avengers... assemble'. Still the peak of superhero cinema!", 30),
            ("leo_films", "Silvestri's brass section does all the heavy lifting. I still listen to the orchestral track while working.", 22),
            ("sarah_cinema", "Same here! It's on my daily focus playlist 🎶", 15)
        ]
    },
    # 5. alex_reads <-> marcus_binge (Both in LOTR, Game of Thrones, Breaking Bad)
    {
        "user_a": "alex_reads",
        "user_b": "marcus_binge",
        "thread": [
            ("marcus_binge", "Hey Alex! Do you think A Song of Ice and Fire books will ever get finished by GRRM, or did the TV show ending ruin book motivation for you?", 55),
            ("alex_reads", "I still have hope for The Winds of Winter! The books have so many subplots that the show cut out—like Lady Stoneheart and the Dornish scheme.", 52),
            ("marcus_binge", "True, the book depth is unmatched. If you want masterclass TV writing that never dropped the ball though, you gotta watch The Wire.", 45),
            ("alex_reads", "It's literally next on my watchlist! Samir also told me it's peak television. Starting episode 1 this weekend.", 38),
            ("marcus_binge", "Take your time with Season 1—it doesn't spoon-feed you, but by episode 4 you'll be completely hooked. All the pieces matter!", 30),
            ("alex_reads", "Will report back once I meet Omar Little!", 18)
        ]
    },
    # 6. alex_reads <-> jordan_lit (Both in Dragon Tattoo, Kite Runner, Da Vinci Code)
    {
        "user_a": "alex_reads",
        "user_b": "jordan_lit",
        "thread": [
            ("jordan_lit", "Alex, have you finished The Girl with the Dragon Tattoo yet? The investigative pacing in the second half is unreal.", 40),
            ("alex_reads", "Finished it last night! Lisbeth Salander is one of the most compelling protagonists in modern mystery fiction. Stieg Larsson was brilliant.", 35),
            ("jordan_lit", "Right?! And have you started The Kite Runner? Bring tissues when you do.", 28),
            ("alex_reads", "Already reading chapter 7... Khaled Hosseini writes with so much emotional weight. 'For you, a thousand times over' hits hard.", 20),
            ("jordan_lit", "It really does. One of the rare books that changes how you look at forgiveness.", 10)
        ]
    },
    # 7. alex_reads <-> zoe_novels (Both in Hunger Games, Twilight, Harry Potter)
    {
        "user_a": "alex_reads",
        "user_b": "zoe_novels",
        "thread": [
            ("zoe_novels", "Alex, quick question: what did you think of the Catching Fire arena mechanics compared to the first Hunger Games book?", 42),
            ("alex_reads", "The clock arena concept was ingenious! The suspense of figuring out each hour's hazard made it impossible to put down.", 38),
            ("zoe_novels", "100%! Definitely Suzanne Collins at her absolute best.", 30),
            ("alex_reads", "And Finnick Odair's introduction with the sugar cube was iconic haha.", 15),
            ("zoe_novels", "Finnick is our golden boy! 🔱", 8)
        ]
    },
    # 8. marcus_binge <-> maya_tv (Both in The Office, Stranger Things, Breaking Bad)
    {
        "user_a": "marcus_binge",
        "user_b": "maya_tv",
        "thread": [
            ("maya_tv", "Marcus!! Did you see the dinner party episode debate in The Office general channel? That episode is peak cringe comedy genius.", 50),
            ("marcus_binge", "That is easily a top 3 episode in all of television history! 'That is a $200 plasma screen TV you just killed!' 😂", 45),
            ("maya_tv", "Hahaha Michael showing off the neon beer sign and the tiny fold-out TV screen! Never gets old.", 38),
            ("marcus_binge", "And Jan dancing awkwardly to Hunter's song! Pure comedic perfection.", 25),
            ("maya_tv", "Hahaha 'That one night! You made everything allriiight!' It's stuck in my head now!", 12)
        ]
    },
    # 9. marcus_binge <-> david_k (Both in Breaking Bad, The Wire, Dark Knight)
    {
        "user_a": "david_k",
        "user_b": "marcus_binge",
        "thread": [
            ("david_k", "Marcus, rewatching Breaking Bad Season 5 episode 'Ozymandias'. Walter White's downfall is pure Greek tragedy.", 60),
            ("marcus_binge", "David, that hour of television might be the greatest episode ever filmed. Cranston's acting in the desert and the phone call to Skyler...", 55),
            ("david_k", "Gave me goosebumps all over again. Nothing touches Vince Gilligan's writing.", 48),
            ("marcus_binge", "And Dean Norris as Hank: 'You're the smartest guy I ever met, and you're too stupid to see... he made up his mind ten minutes ago.' What a line.", 36),
            ("david_k", "Legendary TV.", 20)
        ]
    }
]

def sql_escape(val):
    if val is None:
        return "NULL"
    return "'" + str(val).replace("'", "''") + "'"

def generate_sql():
    lines = []
    lines.append("-- ================================================================")
    lines.append("-- MediaClub Seed Script: Vibrant Community, 15 Clubs, & DMs")
    lines.append("-- ================================================================")
    lines.append("BEGIN;")
    lines.append("")

    # 1. Insert Users
    lines.append("-- 1. Insert or update users")
    for u in USERS:
        uname = sql_escape(u["username"])
        email = sql_escape(u["email"])
        avatar = sql_escape(u["avatar_url"])
        status = sql_escape(u["status"])
        admin = "TRUE" if u["is_global_admin"] else "FALSE"
        pwd = sql_escape(PASSWORD_HASH)
        lines.append(f"""
INSERT INTO users (username, email, password_hash, avatar_url, status, is_global_admin, dm_notifications_muted, notifications_silenced, last_seen, created_at)
VALUES ({uname}, {email}, {pwd}, {avatar}, {status}, {admin}, FALSE, FALSE, NOW() - interval '10 minutes', NOW() - interval '14 days')
ON CONFLICT (username) DO UPDATE SET
  avatar_url = EXCLUDED.avatar_url,
  status = EXCLUDED.status,
  password_hash = EXCLUDED.password_hash;
""")

    # 2. Insert Clubs, Channels, Memberships, and Messages
    lines.append("-- 2. Insert Clubs, Channels, Memberships, Messages")
    for club in CLUBS:
        c_name = sql_escape(club["name"])
        c_mtype = sql_escape(club["media_type"])
        c_source = sql_escape(club["external_source"])
        c_ext_id = sql_escape(club["external_id"])
        c_cover = sql_escape(club["cover_image_url"])
        c_desc = sql_escape(club["description"])
        c_rel = sql_escape(club["release_date"])
        c_creator = sql_escape(club["creator"])

        lines.append(f"""
-- Club: {club['name']}
DO $$
DECLARE
    v_club_id bigint;
    v_creator_id bigint;
    v_member_id bigint;
    v_info_chan_id bigint;
    v_gen_chan_id bigint;
    v_spoil_chan_id bigint;
    v_req_chan_id bigint;
    v_msg_id bigint;
    v_sarah_id bigint;
    v_alex_id bigint;
    v_marcus_id bigint;
BEGIN
    SELECT id INTO v_creator_id FROM users WHERE username = {c_creator};
    SELECT id INTO v_sarah_id FROM users WHERE username = 'sarah_cinema';
    SELECT id INTO v_alex_id FROM users WHERE username = 'alex_reads';
    SELECT id INTO v_marcus_id FROM users WHERE username = 'marcus_binge';

    -- Upsert Club
    SELECT id INTO v_club_id FROM clubs WHERE external_source = {c_source} AND external_id = {c_ext_id};
    IF v_club_id IS NULL THEN
        INSERT INTO clubs (name, media_type, external_source, external_id, cover_image_url, description, release_date, created_by, created_at)
        VALUES ({c_name}, {c_mtype}, {c_source}, {c_ext_id}, {c_cover}, {c_desc}, {c_rel}, v_creator_id, NOW() - interval '7 days')
        RETURNING id INTO v_club_id;
    ELSE
        UPDATE clubs SET
            name = {c_name},
            cover_image_url = {c_cover},
            description = {c_desc},
            release_date = {c_rel}
        WHERE id = v_club_id;
    END IF;

    -- Ensure the 4 Standard Channels (info, general, spoilers, requests)
    SELECT id INTO v_info_chan_id FROM channels WHERE club_id = v_club_id AND type = 'INFO';
    IF v_info_chan_id IS NULL THEN
        INSERT INTO channels (club_id, name, type, created_at)
        VALUES (v_club_id, 'info', 'INFO', NOW() - interval '7 days')
        RETURNING id INTO v_info_chan_id;
    END IF;

    SELECT id INTO v_gen_chan_id FROM channels WHERE club_id = v_club_id AND type = 'GENERAL';
    IF v_gen_chan_id IS NULL THEN
        INSERT INTO channels (club_id, name, type, created_at)
        VALUES (v_club_id, 'general', 'GENERAL', NOW() - interval '7 days')
        RETURNING id INTO v_gen_chan_id;
    END IF;

    SELECT id INTO v_spoil_chan_id FROM channels WHERE club_id = v_club_id AND type = 'SPOILERS';
    IF v_spoil_chan_id IS NULL THEN
        INSERT INTO channels (club_id, name, type, created_at)
        VALUES (v_club_id, 'spoilers', 'SPOILERS', NOW() - interval '7 days')
        RETURNING id INTO v_spoil_chan_id;
    END IF;

    SELECT id INTO v_req_chan_id FROM channels WHERE club_id = v_club_id AND type = 'REQUESTS';
    IF v_req_chan_id IS NULL THEN
        INSERT INTO channels (club_id, name, type, created_at)
        VALUES (v_club_id, 'requests', 'REQUESTS', NOW() - interval '7 days')
        RETURNING id INTO v_req_chan_id;
    END IF;
""")

        # Add Memberships
        for m_username in club["members"]:
            m_role = "MODERATOR" if m_username == club["creator"] else "MEMBER"
            lines.append(f"""
    SELECT id INTO v_member_id FROM users WHERE username = '{m_username}';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, '{m_role}', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;
""")

        # Insert Info Messages
        for idx, (sender, content) in enumerate(club["info"]):
            s_content = sql_escape(content)
            lines.append(f"""
    SELECT id INTO v_member_id FROM users WHERE username = '{sender}';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_info_chan_id AND content = {s_content}) THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_info_chan_id, v_member_id, {s_content}, NOW() - interval '5 days', FALSE);
    END IF;
""")

        # Insert General Messages
        hours_offset = len(club["general"]) * 3 + 4
        for idx, (sender, content) in enumerate(club["general"]):
            s_content = sql_escape(content)
            offset = hours_offset - (idx * 3)
            lines.append(f"""
    SELECT id INTO v_member_id FROM users WHERE username = '{sender}';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = {s_content}) THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, {s_content}, NOW() - interval '{offset} hours', FALSE)
        RETURNING id INTO v_msg_id;
""")
            # Add emoji reaction to every second message
            if idx % 2 == 0:
                emoji = ["🔥", "❤️", "👍", "👏", "😮"][idx % 5]
                lines.append(f"""
        IF v_sarah_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_sarah_id, '{emoji}', NOW() - interval '{offset - 1} hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
""")
            lines.append("    END IF;")

        # Insert Spoilers Messages
        hours_offset = len(club["spoilers"]) * 4 + 6
        for idx, (sender, content) in enumerate(club["spoilers"]):
            s_content = sql_escape(content)
            offset = hours_offset - (idx * 4)
            lines.append(f"""
    SELECT id INTO v_member_id FROM users WHERE username = '{sender}';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_spoil_chan_id AND content = {s_content}) THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_spoil_chan_id, v_member_id, {s_content}, NOW() - interval '{offset} hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_alex_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_alex_id, '😮', NOW() - interval '{offset - 1} hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;
""")

        # Insert Requests Messages
        for idx, (sender, content) in enumerate(club["requests"]):
            s_content = sql_escape(content)
            offset = 12 - (idx * 2)
            lines.append(f"""
    SELECT id INTO v_member_id FROM users WHERE username = '{sender}';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_req_chan_id AND content = {s_content}) THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_req_chan_id, v_member_id, {s_content}, NOW() - interval '{offset} hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_marcus_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_marcus_id, '👍', NOW() - interval '{offset - 1} hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;
""")

        lines.append("END $$;")
        lines.append("")

    # 3. Direct Messages and Conversations
    lines.append("-- 3. Direct Message Conversations")
    for dm in DIRECT_MESSAGES:
        u1 = dm["user_a"]
        u2 = dm["user_b"]
        lines.append(f"""
DO $$
DECLARE
    v_u1_id bigint;
    v_u2_id bigint;
    v_low_id bigint;
    v_high_id bigint;
    v_conv_id bigint;
    v_sender_id bigint;
BEGIN
    SELECT id INTO v_u1_id FROM users WHERE username = '{u1}';
    SELECT id INTO v_u2_id FROM users WHERE username = '{u2}';

    IF v_u1_id IS NOT NULL AND v_u2_id IS NOT NULL THEN
        v_low_id := LEAST(v_u1_id, v_u2_id);
        v_high_id := GREATEST(v_u1_id, v_u2_id);

        SELECT id INTO v_conv_id FROM conversations WHERE user_a_id = v_low_id AND user_b_id = v_high_id;
        IF v_conv_id IS NULL THEN
            INSERT INTO conversations (user_a_id, user_b_id, created_at)
            VALUES (v_low_id, v_high_id, NOW() - interval '4 days')
            RETURNING id INTO v_conv_id;
        END IF;
""")

        for sender, text, hours_ago in dm["thread"]:
            s_text = sql_escape(text)
            lines.append(f"""
        SELECT id INTO v_sender_id FROM users WHERE username = '{sender}';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = {s_text}) THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, {s_text}, NOW() - interval '{hours_ago} hours', FALSE);
        END IF;
""")

        lines.append("""
    END IF;
END $$;
""")

    # 4. Also have community members join some existing clubs (Dune, Interstellar, Oppenheimer)
    lines.append("-- 4. Join existing clubs (Dune, Interstellar, Oppenheimer)")
    lines.append("""
DO $$
DECLARE
    v_dune_id bigint;
    v_interstellar_id bigint;
    v_oppenheimer_id bigint;
    v_user_id bigint;
    v_chan_id bigint;
BEGIN
    SELECT id INTO v_dune_id FROM clubs WHERE name ILIKE 'Dune' LIMIT 1;
    SELECT id INTO v_interstellar_id FROM clubs WHERE name ILIKE 'Interstellar' LIMIT 1;
    SELECT id INTO v_oppenheimer_id FROM clubs WHERE name ILIKE 'Oppenheimer' LIMIT 1;

    -- Add Sarah and Leo to Interstellar
    IF v_interstellar_id IS NOT NULL THEN
        FOR v_user_id IN SELECT id FROM users WHERE username IN ('sarah_cinema', 'leo_films', 'david_k', 'marcus_binge') LOOP
            INSERT INTO memberships (user_id, club_id, role, joined_at)
            VALUES (v_user_id, v_interstellar_id, 'MEMBER', NOW() - interval '5 days')
            ON CONFLICT (user_id, club_id) DO NOTHING;
        END LOOP;

        SELECT id INTO v_chan_id FROM channels WHERE club_id = v_interstellar_id AND type = 'GENERAL' LIMIT 1;
        IF v_chan_id IS NOT NULL THEN
            SELECT id INTO v_user_id FROM users WHERE username = 'sarah_cinema';
            IF NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content ILIKE '%docking scene%') THEN
                INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
                VALUES (v_chan_id, v_user_id, 'The spinning docking scene with Hans Zimmer''s "No Time for Caution" is cinema in its purest form. Peak Christopher Nolan!', NOW() - interval '8 hours', FALSE);
            END IF;
        END IF;
    END IF;

    -- Add Sarah, Elena, and Leo to Dune
    IF v_dune_id IS NOT NULL THEN
        FOR v_user_id IN SELECT id FROM users WHERE username IN ('sarah_cinema', 'elena_v', 'leo_films', 'alex_reads') LOOP
            INSERT INTO memberships (user_id, club_id, role, joined_at)
            VALUES (v_user_id, v_dune_id, 'MEMBER', NOW() - interval '5 days')
            ON CONFLICT (user_id, club_id) DO NOTHING;
        END LOOP;

        SELECT id INTO v_chan_id FROM channels WHERE club_id = v_dune_id AND type = 'GENERAL' LIMIT 1;
        IF v_chan_id IS NOT NULL THEN
            SELECT id INTO v_user_id FROM users WHERE username = 'leo_films';
            IF NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content ILIKE '%Greig Fraser%') THEN
                INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
                VALUES (v_chan_id, v_user_id, 'Greig Fraser''s cinematography in Dune is unreal. The scale of the sandworms and ornithopters feels massive.', NOW() - interval '5 hours', FALSE);
            END IF;
        END IF;
    END IF;
END $$;
""")

    # 5. Reset all identity sequences
    lines.append("-- 5. Synchronize all identity sequences")
    lines.append("""
SELECT setval(pg_get_serial_sequence('users', 'id'), COALESCE(MAX(id), 1)) FROM users;
SELECT setval(pg_get_serial_sequence('clubs', 'id'), COALESCE(MAX(id), 1)) FROM clubs;
SELECT setval(pg_get_serial_sequence('channels', 'id'), COALESCE(MAX(id), 1)) FROM channels;
SELECT setval(pg_get_serial_sequence('memberships', 'id'), COALESCE(MAX(id), 1)) FROM memberships;
SELECT setval(pg_get_serial_sequence('messages', 'id'), COALESCE(MAX(id), 1)) FROM messages;
SELECT setval(pg_get_serial_sequence('reactions', 'id'), COALESCE(MAX(id), 1)) FROM reactions;
SELECT setval(pg_get_serial_sequence('conversations', 'id'), COALESCE(MAX(id), 1)) FROM conversations;
SELECT setval(pg_get_serial_sequence('direct_messages', 'id'), COALESCE(MAX(id), 1)) FROM direct_messages;
""")

    lines.append("COMMIT;")
    return "\n".join(lines)

if __name__ == "__main__":
    import os
    sql = generate_sql()
    out_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "seed_community.sql")
    with open(out_path, "w") as f:
        f.write(sql)
    print(f"seed_community.sql written successfully to {out_path}.")
