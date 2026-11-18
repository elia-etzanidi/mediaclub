#!/usr/bin/env python3
"""
Adds curated thematic custom channels to each club and populates them with
realistic, in-depth community discussions and emoji reactions.
"""

CUSTOM_CHANNELS = [
    # 1. Avatar
    {
        "club_name": "Avatar",
        "channels": [
            {
                "name": "lore-and-pandora",
                "type": "GENERAL",
                "messages": [
                    ("sarah_cinema", "Welcome to #lore-and-pandora! Here we dive deep into the ecosystem of Pandora, the biology of the Na'vi, and Eywa's biological neural network.", 36),
                    ("leo_films", "The concept that Eywa is literally an interconnected biological supercomputer formed by electrochemical connections between tree roots is such clever hard sci-fi.", 30),
                    ("elena_v", "Yes! And Tsaheylu (the neural bond) isn't just about controlling banshees or direhorses; it's a mutual transfer of emotion and sensory memories. Such beautiful worldbuilding.", 24),
                    ("marcus_binge", "Also the atmospheric composition of Pandora—high concentrations of carbon dioxide, methane, and hydrogen cyanide—making exopacks necessary for humans grounds the survival element so well.", 16),
                    ("sarah_cinema", "Exactly. Cameron took real evolutionary biology principles and applied them to xenobiology. Can't wait to see more clans in Fire and Ash!", 8)
                ]
            },
            {
                "name": "visual-effects",
                "type": "GENERAL",
                "messages": [
                    ("leo_films", "Let's talk about the VFX pipeline. Wētā FX had to develop entirely new deep-water performance capture technology just to record facial muscle micro-movements underwater without distortion.", 28),
                    ("sarah_cinema", "And the photorealistic water simulations! Simulating light refraction through churning ocean waves and subsurface scattering on blue skin is computationally mind-boggling.", 20),
                    ("chloe_geek", "I remember reading that rendering a single underwater frame in high frame rate took over 40 hours of compute time. The result on IMAX was breathtaking.", 12)
                ]
            }
        ]
    },

    # 2. Avengers: Endgame
    {
        "club_name": "Avengers: Endgame",
        "channels": [
            {
                "name": "theories-and-easter-eggs",
                "type": "GENERAL",
                "messages": [
                    ("chloe_geek", "Welcome to #theories-and-easter-eggs! Post your favorite hidden MCU details, timeline theories, and missed cameos.", 34),
                    ("david_k", "Did everyone catch Howard the Duck holding a laser rifle in the final Ravager army portal? Blink and you miss him in the wide charge shot!", 28),
                    ("sarah_cinema", "Yes!! Also, when Cap returns the Soul Stone on Vormir, imagine the awkward encounter between Steve and the Red Skull after 80 years. We needed a Disney+ short for that alone 😂", 22),
                    ("leo_films", "And in 1970 Camp Lehigh, seeing Jarvis in human form played by James D'Arcy from the Agent Carter show was such a satisfying continuity nod.", 14),
                    ("chloe_geek", "Also Tony's helmet message in the opening scene mirrors his audio recording from Iron Man 1 almost word for word. The Russos packed so much love into this.", 6)
                ]
            },
            {
                "name": "favorite-quotes",
                "type": "GENERAL",
                "messages": [
                    ("sarah_cinema", "Drop your most iconic line from the movie! For me: 'I love you 3,000.' Morgan Stark and Tony broke my heart into pieces.", 30),
                    ("chloe_geek", "'I can do this all day.' / 'Yeah, I know, I know.' 2023 Cap being completely exhausted by 2012 Cap's optimism was peak comedy 🛡️", 22),
                    ("marcus_binge", "'I went for the head.' Thor's quiet, broken delivery in the garden when he realizes killing Thanos changed nothing. Incredible character depth.", 15)
                ]
            }
        ]
    },

    # 3. The Lord of the Rings: The Return of the King
    {
        "club_name": "The Lord of the Rings: The Return of the King",
        "channels": [
            {
                "name": "book-vs-film",
                "type": "GENERAL",
                "messages": [
                    ("alex_reads", "Welcome to #book-vs-film! Here we discuss the nuances between Tolkien's published text and Peter Jackson's film trilogy adaptation.", 36),
                    ("sarah_cinema", "One of the most debated changes is the omission of the Scouring of the Shire. In the book, Saruman takes over the Shire and the hobbits lead an armed rebellion to free their homeland.", 30),
                    ("samir_b", "While I adore the Scouring in the book as Tolkien's commentary on returning WWI veterans finding home scarred, Jackson's decision to end with the Shire untouched emphasizes what they fought to protect.", 22),
                    ("alex_reads", "Very well put, Samir. Jackson made a cinematic choice that prioritized emotional closure after 11 hours of war. Both endings are masterpieces in their respective mediums.", 14),
                    ("elena_v", "Also Faramir's portrayal! In the film he struggles with the Ring's temptation before letting Frodo go, which raised the dramatic stakes for viewers.", 8)
                ]
            },
            {
                "name": "soundtrack-appreciation",
                "type": "GENERAL",
                "messages": [
                    ("sarah_cinema", "Howard Shore composed over 12 hours of music across 80 recurring leitmotifs for Middle-earth. Which theme is your personal favorite?", 32),
                    ("samir_b", "The Lighting of the Beacons ('The White Tree'). The sheer momentum of the brass as the pyres ignite across the snow-capped mountain peaks of Gondor gives me chills.", 25),
                    ("alex_reads", "Billy Boyd singing 'The Edge of Night' while Faramir makes his suicidal charge on Osgiliath and Denethor feasts on tomatoes... one of the most haunting sequences in cinema history.", 18),
                    ("sarah_cinema", "And Annie Lennox's 'Into the West' over the end credits sketches by Alan Lee. The perfect, melancholic farewell to the Third Age.", 10)
                ]
            }
        ]
    },

    # 4. The Dark Knight
    {
        "club_name": "The Dark Knight",
        "channels": [
            {
                "name": "screenplay-and-philosophy",
                "type": "GENERAL",
                "messages": [
                    ("david_k", "Welcome to #screenplay-and-philosophy. Analyzing Jonathan and Christopher Nolan's thematic structure, moral dilemmas, and the soul of Gotham.", 35),
                    ("marcus_binge", "The central thesis of the film is whether human morality survives when civilization's rules are stripped away. Joker is an agent of pure philosophical cynicism.", 28),
                    ("sarah_cinema", "Notice how Joker tells three completely different stories about how he got his scars. He has no fixed origin because he isn't a person—he represents an idea, a force of nature.", 20),
                    ("samir_b", "And Harvey Dent's two-faced coin. When he flips it, he abdicates moral choice to chance because he believes justice is an illusion after losing Rachel. Tragic writing.", 12),
                    ("david_k", "Batman taking the blame for Harvey's crimes at the end is the ultimate act of self-sacrifice: becoming the villain so Gotham keeps its beacon of hope.", 6)
                ]
            },
            {
                "name": "nolan-filmmaking",
                "type": "GENERAL",
                "messages": [
                    ("leo_films", "Nolan's insistence on in-camera practical effects is legendary. They built a custom nitrogen cannon piston to flip an actual 18-wheel semi-truck upside down in downtown Chicago!", 30),
                    ("david_k", "And the hospital demolition! When the pyrotechnics delayed, Heath Ledger stayed in character, shaking the detonator until the final explosions erupted. Seamless improvisation.", 22),
                    ("sarah_cinema", "Also Hans Zimmer's score: using razor blades and cellos scraped with metal rulers to produce Joker's screeching, escalating two-note motif. Pure acoustic terror.", 14)
                ]
            }
        ]
    },

    # 5. Harry Potter and the Sorcerer's Stone
    {
        "club_name": "Harry Potter and the Sorcerer's Stone",
        "channels": [
            {
                "name": "hogwarts-houses",
                "type": "GENERAL",
                "messages": [
                    ("zoe_novels", "Welcome to #hogwarts-houses! Where did the Sorting Hat place you? Share your house pride and favorite house lore!", 32),
                    ("alex_reads", "Ravenclaw through and through! 🦅 Wit beyond measure is man's greatest treasure. The common room in the high tower with the starry ceiling is dream aesthetic.", 25),
                    ("chloe_geek", "Proud Gryffindor here! 🦁 The cozy armchair by the fireplace with a warm pumpkin pasty sounds like heaven on a cold Scottish evening.", 18),
                    ("sarah_cinema", "Hufflepuff representation! 🦡 Right next to the Hogwarts kitchens, surrounded by plants and yellow tapestries. Loyalty and kindness above all.", 10)
                ]
            },
            {
                "name": "nostalgia-corner",
                "type": "GENERAL",
                "messages": [
                    ("zoe_novels", "Remember the first time you watched Harry stepping into Diagon Alley with Hagrid tapping the brick wall? The magic of that moment is timeless.", 26),
                    ("alex_reads", "And opening the letter from Hogwarts! Generations of kids kept checking their mailboxes when they turned 11 haha.", 18),
                    ("chloe_geek", "John Williams' 'Arrival of Baby Harry' and 'Hedwig's Theme' instantly transports me back to being 9 years old under a cozy blanket.", 10)
                ]
            }
        ]
    },

    # 6. Game of Thrones
    {
        "club_name": "Game of Thrones",
        "channels": [
            {
                "name": "theories-and-lore",
                "type": "GENERAL",
                "messages": [
                    ("marcus_binge", "Welcome to #theories-and-lore! Discussing Old Valyria, Targaryen dragonlords, the prophecy of Azor Ahai, and Westerosi history.", 35),
                    ("clara_m", "The Doom of Valyria is one of the most intriguing mysteries in Martin's world. Fourteen volcanic flames simultaneously tearing the greatest empire in history apart overnight.", 28),
                    ("alex_reads", "And the architecture of the Wall! Spells woven into the ice by Brandon the Builder and the Children of the Forest to prevent dark magic from crossing.", 20),
                    ("samir_b", "The tragedy of Rhaegar Targaryen and Lyanna Stark started the entire chain of events. A doomed romance wrapped in prophecy that cost hundreds of thousands of lives.", 12),
                    ("marcus_binge", "George's worldbuilding has so many layers. Every castle, house sigil, and motto carries centuries of generational grudges.", 6)
                ]
            },
            {
                "name": "battle-tactics",
                "type": "GENERAL",
                "messages": [
                    ("marcus_binge", "Which battle had the best tactical staging? The Blackwater wildfire strategy orchestrated by Tyrion was sheer military genius.", 30),
                    ("samir_b", "Hardhome was pure horror-survival tactics. The realization that every fallen Brother instantly rose with blue eyes changed warfare forever in the North.", 22),
                    ("clara_m", "And the Battle of the Bastards double envelopment shield wall! The claustrophobia of soldiers trampling over one another was terrifyingly realistic.", 14)
                ]
            }
        ]
    },

    # 7. Breaking Bad
    {
        "club_name": "Breaking Bad",
        "channels": [
            {
                "name": "cinematography-and-motifs",
                "type": "GENERAL",
                "messages": [
                    ("marcus_binge", "Welcome to #cinematography-and-motifs! Analyzing Vince Gilligan's color psychology, recurring symbols, and unique camera placement.", 34),
                    ("david_k", "The color theory across the series is legendary. Walt starts in drab khaki and beige when he's powerless, transitions through emerald greens as Heisenberg rises, and wears black by the end.", 27),
                    ("maya_tv", "And Marie Schrader wearing strictly purple! Purple is the color of royalty, symbolizing her desire for stability and illusion of wealth.", 20),
                    ("samir_b", "The pink teddy bear from the Wayfarer plane collision with half its face burned... brilliant foreshadowing for Gus Fring's fate two seasons later in 'Face Off'.", 13),
                    ("marcus_binge", "The POV camera mounted inside a washing machine, on a shovel, inside a frying pan—Gilligan gave the camera its own mischievous personality.", 6)
                ]
            },
            {
                "name": "character-arcs",
                "type": "GENERAL",
                "messages": [
                    ("david_k", "Hank Schrader's realization in 'Gliding Over All' on the toilet reading 'Leaves of Grass': 'To my other favorite W.W. It's an honour working with you. Fondly, G.B.' That sudden panic attack was perfection.", 28),
                    ("marcus_binge", "Dean Norris portrayed PTSD in Season 3 with so much vulnerability. When the twins attack him in the parking lot and he's unarmed... heart in mouth.", 20),
                    ("maya_tv", "And Jesse Pinkman in the finale driving away laughing and crying into the dark night. Freedom earned through pure suffering.", 12)
                ]
            }
        ]
    },

    # 8. The Office (US)
    {
        "club_name": "The Office (US)",
        "channels": [
            {
                "name": "favorite-pranks",
                "type": "GENERAL",
                "messages": [
                    ("maya_tv", "Welcome to #favorite-pranks! Rank Jim Halpert's legendary psychological warfare against Dwight K. Schrute!", 32),
                    ("marcus_binge", "'Identity theft is not a joke, Jim! Millions of families suffer every year!' The mustard shirt, the glasses, the calculator watch... undefeated 😂", 26),
                    ("zoe_novels", "Wrapping Dwight's entire desk, chair, computer, and pencil cup in holiday wrapping paper, and Dwight tries to sit down and crashes through cardboard!", 18),
                    ("chloe_geek", "Sending Dwight faxes from 'Future Dwight' warning him that the coffee is poisoned: 'Nooooo! Stanley, don't drink it!' and slapping the mug out of his hand!", 10)
                ]
            },
            {
                "name": "underrated-episodes",
                "type": "GENERAL",
                "messages": [
                    ("maya_tv", "What's an episode that deserves more love? 'The Injury' when Michael burns his foot on a George Foreman grill is top-tier chaotic comedy.", 28),
                    ("marcus_binge", "'Safety Training'! Michael on the roof with the bouncy castle and giant watermelon: 'Dwight, you ignorant slut!' Peak Steve Carell.", 20),
                    ("zoe_novels", "'Fun Run' for rabies awareness where Michael carbo-loads on fettuccine alfredo right before running 5 kilometers in 90-degree heat! Hahaha.", 12)
                ]
            }
        ]
    },

    # 9. Stranger Things
    {
        "club_name": "Stranger Things",
        "channels": [
            {
                "name": "80s-soundtrack-and-vibes",
                "type": "GENERAL",
                "messages": [
                    ("elena_v", "Welcome to #80s-soundtrack-and-vibes! Sharing vintage synth tracks, 80s pop classics, and the incredible score by Kyle Dixon & Michael Stein.", 32),
                    ("chloe_geek", "Kate Bush's 'Running Up That Hill' returning to number 1 worldwide 37 years after its release because of Max Mayfield's escape was a cultural moment.", 25),
                    ("sarah_cinema", "And Eddie Munson playing Metallica's 'Master of Puppets' on his Warlock guitar to draw the demobats... most metal scene in modern streaming history 🎸", 18),
                    ("maya_tv", "Don't forget The Clash 'Should I Stay or Should I Go' in Season 1 connecting Jonathan and Will. The nostalgic heart of the show.", 10)
                ]
            },
            {
                "name": "upside-down-theories",
                "type": "GENERAL",
                "messages": [
                    ("elena_v", "Why is the Upside Down frozen on November 6, 1983—the exact day Will Byers disappeared and Eleven opened the mother gate?", 28),
                    ("chloe_geek", "My theory is that Eleven's psychic contact literally snapshotted Hawkins at that exact second in time. It's a dormant mirror dimension that Henry Creel populated.", 20),
                    ("marcus_binge", "And Will having the neck tingle and sensing Vecna's emotions... Will is definitely the key to closing the gate permanently in Season 5.", 12)
                ]
            }
        ]
    },

    # 10. The Wire
    {
        "club_name": "The Wire",
        "channels": [
            {
                "name": "quotes-and-street-wisdom",
                "type": "GENERAL",
                "messages": [
                    ("samir_b", "Welcome to #quotes-and-street-wisdom. The Wire produced some of the sharpest dialogue in modern dramatic literature.", 35),
                    ("marcus_binge", "'You come at the king, you best not miss.' Omar Little outside the courthouse. Simple, lethal, unforgettable.", 28),
                    ("david_k", "'The king stay the king.' D'Angelo Barksdale teaching Bodie and Wallace chess in the pit. The pawns get capped early; the queen got all the moves.", 20),
                    ("jordan_lit", "'A man must have a code.' Omar and Bunk's conversation about the difference between stickup boys and predators.", 12),
                    ("samir_b", "'Money ain't got no owners, only spenders.' Marlo Stanfield's cold pragmatism.", 6)
                ]
            },
            {
                "name": "institutional-critique",
                "type": "GENERAL",
                "messages": [
                    ("david_k", "David Simon's genius was showing how bureaucratic institutions—police departments, City Hall, union docks, schools, newspapers—all self-preserve by lying about data.", 30),
                    ("samir_b", "Season 4's examination of Baltimore middle schools is devastating. Teachers forced to 'teach to the test' rather than educate, while street corners provide the only reliable career path.", 22),
                    ("marcus_binge", "And 'Hamsterdam' in Season 3! Major Colvin creating legalized zones to curb violent crime... a radical experiment that politics immediately crushed.", 14)
                ]
            }
        ]
    },

    # 11. The Da Vinci Code
    {
        "club_name": "The Da Vinci Code",
        "channels": [
            {
                "name": "symbology-and-art-history",
                "type": "GENERAL",
                "messages": [
                    ("alex_reads", "Welcome to #symbology-and-art-history! Dissecting the art history clues, Fibonacci spirals, and cryptographic puzzles in Dan Brown's novel.", 34),
                    ("clara_m", "The composition of Da Vinci's 'The Last Supper' was such an electrifying chapter. The V-shape representing the sacred feminine and the chalice.", 27),
                    ("jordan_lit", "And the cryptex! Vinegar dissolving the papyrus scroll inside if you force it open with the wrong 5-letter code. Such a clever physical mechanism.", 20),
                    ("sarah_cinema", "The Rose Line in Paris running through Saint-Sulpice and the Louvre pyramid... made visiting Paris feel like walking inside a thriller.", 12),
                    ("alex_reads", "Say what you want about historical liberties, Dan Brown made millions of people appreciate Renaissance art and medieval cryptology!", 6)
                ]
            }
        ]
    },

    # 12. The Hunger Games
    {
        "club_name": "The Hunger Games",
        "channels": [
            {
                "name": "panem-politics",
                "type": "GENERAL",
                "messages": [
                    ("zoe_novels", "Welcome to #panem-politics. Deep-diving into the sociopolitical architecture of Panem, Capitol propaganda, and Katniss's role as a symbol.", 32),
                    ("alex_reads", "What makes Collins' political writing exceptional is Plutarch Heavensbee. He understands that revolutions require media spectacle just as much as weapons.", 25),
                    ("chloe_geek", "President Snow's white roses masking the scent of blood from his mouth ulcers... the visual metaphor for the Capitol's perfumed decay is brilliant.", 18),
                    ("elena_v", "The Roman gladiator parallels ('Panem et Circenses' = Bread and Circuses) highlight how totalitarian regimes pacify citizens with brutal entertainment.", 10)
                ]
            }
        ]
    },

    # 13. Twilight
    {
        "club_name": "Twilight",
        "channels": [
            {
                "name": "cullen-coven-lore",
                "type": "GENERAL",
                "messages": [
                    ("zoe_novels", "Welcome to #cullen-coven-lore! Exploring the backstory of Carlisle, Esme, Alice, Jasper, Rosalie, and the Volturi ruling council.", 30),
                    ("maya_tv", "Carlisle Cullen spending three centuries becoming a physician so he could save human lives without giving into bloodlust is such a wholesome vampire origin.", 24),
                    ("alex_reads", "Jasper Hale's empathic ability (pathokinesis) to manipulate the emotional temperature of a room made him one of the most subtly powerful characters.", 16),
                    ("chloe_geek", "And Alice's subjective visions changing depending on decisions made! Her backstory in the asylum was surprisingly dark for YA.", 8)
                ]
            }
        ]
    },

    # 14. The Girl with the Dragon Tattoo
    {
        "club_name": "The Girl with the Dragon Tattoo",
        "channels": [
            {
                "name": "forensic-investigation",
                "type": "GENERAL",
                "messages": [
                    ("jordan_lit", "Welcome to #forensic-investigation! Dissecting Blomkvist's detective methodology, biblical verse ciphers, and Larsson's procedural realism.", 32),
                    ("clara_m", "The breakthrough with the telephone directory and Leviticus verses: matching the names and dates from Harriet's diary to unsolved murders across Sweden was chilling.", 25),
                    ("david_k", "And Lisbeth's forensic computer hacking—using packet sniffers and keyloggers to breach Wennerström's encrypted accounts. Very authentic for 2005 tech.", 18),
                    ("alex_reads", "Stieg Larsson's background as an anti-extremism journalist gives every scene on Hedeby Island an undeniable aura of authenticity.", 10)
                ]
            }
        ]
    },

    # 15. The Kite Runner
    {
        "club_name": "The Kite Runner",
        "channels": [
            {
                "name": "literary-themes-and-symbols",
                "type": "GENERAL",
                "messages": [
                    ("alex_reads", "Welcome to #literary-themes-and-symbols. Exploring Khaled Hosseini's motifs of kites, redemption, brotherhood, and moral reckoning.", 34),
                    ("samir_b", "The kite fighting tournament isn't just a childhood sport; it's the arena where Amir desperately seeks his father's approval at the expense of his soul.", 26),
                    ("jordan_lit", "The pomegranate tree where Amir and Hassan carved their names: 'Sultans of Kabul'. When Amir returns years later, the tree is barren, reflecting the lost innocence of their homeland.", 18),
                    ("elena_v", "The scar on Amir's upper lip from Assef's brass knuckles mirroring Hassan's cleft lip... redemption through shared suffering. Unforgettable prose.", 10)
                ]
            }
        ]
    },

    # Bonus: Interstellar
    {
        "club_name": "Interstellar",
        "channels": [
            {
                "name": "physics-and-black-holes",
                "type": "GENERAL",
                "messages": [
                    ("sarah_cinema", "Welcome to #physics-and-black-holes! Discussing Nobel laureate Kip Thorne's astrophysics, Gargantua's gravitational lensing, and time dilation.", 28),
                    ("leo_films", "The scene on Miller's planet where every tick of the watch is 1.4 days on Earth! When they return to the Endurance and Romilly has aged 23 years alone... harrowing.", 20),
                    ("david_k", "The visual model of Gargantua was so accurate that it actually led to two published scientific papers in computational physics. Nolan and Thorne took no shortcuts.", 12)
                ]
            }
        ]
    },

    # Bonus: Dune
    {
        "club_name": "Dune",
        "channels": [
            {
                "name": "arrakis-ecology",
                "type": "GENERAL",
                "messages": [
                    ("leo_films", "Welcome to #arrakis-ecology! Discussing stillsuit engineering, desert power, spice melange, and Frank Herbert's ecological vision.", 26),
                    ("elena_v", "The concept of 'water discipline' and mourning tears being described as 'giving water to the dead' is one of the most culturally profound ideas in all of science fiction.", 18),
                    ("alex_reads", "Herbert was originally inspired by the shifting sand dunes of Florence, Oregon. That real ecological concern turned Dune into the foundational environmental sci-fi epic.", 10)
                ]
            }
        ]
    }
]

def sql_escape(val):
    if val is None:
        return "NULL"
    return "'" + str(val).replace("'", "''") + "'"

def generate_custom_channels_sql():
    lines = []
    lines.append("BEGIN;")
    lines.append("")

    for item in CUSTOM_CHANNELS:
        club_name = sql_escape(item["club_name"])
        lines.append(f"-- Custom channels for {item['club_name']}")
        lines.append(f"""
DO $$
DECLARE
    v_club_id bigint;
    v_chan_id bigint;
    v_sender_id bigint;
    v_msg_id bigint;
    v_reaction_user_id bigint;
BEGIN
    SELECT id INTO v_club_id FROM clubs WHERE name ILIKE {club_name} LIMIT 1;
    IF v_club_id IS NOT NULL THEN
""")

        for chan in item["channels"]:
            chan_name = sql_escape(chan["name"])
            chan_type = sql_escape(chan["type"])

            lines.append(f"""
        -- Channel: {chan['name']}
        SELECT id INTO v_chan_id FROM channels WHERE club_id = v_club_id AND name = {chan_name};
        IF v_chan_id IS NULL THEN
            INSERT INTO channels (club_id, name, type, created_at)
            VALUES (v_club_id, {chan_name}, {chan_type}, NOW() - interval '6 days')
            RETURNING id INTO v_chan_id;
        END IF;
""")

            # Add messages
            for idx, (sender, content, hours_ago) in enumerate(chan["messages"]):
                s_content = sql_escape(content)
                lines.append(f"""
        SELECT id INTO v_sender_id FROM users WHERE username = '{sender}';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = {s_content}) THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, {s_content}, NOW() - interval '{hours_ago} hours', FALSE)
            RETURNING id INTO v_msg_id;
""")
                # Add emoji reactions
                if idx % 2 == 0:
                    emoji = ["🔥", "❤️", "👍", "👏", "😮"][idx % 5]
                    lines.append(f"""
            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != '{sender}' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '{emoji}', NOW() - interval '{hours_ago - 1} hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;
""")
                lines.append("        END IF;")

        lines.append("""
    END IF;
END $$;
""")
        lines.append("")

    lines.append("""
-- Update identity sequences
SELECT setval(pg_get_serial_sequence('channels', 'id'), COALESCE(MAX(id), 1)) FROM channels;
SELECT setval(pg_get_serial_sequence('messages', 'id'), COALESCE(MAX(id), 1)) FROM messages;
SELECT setval(pg_get_serial_sequence('reactions', 'id'), COALESCE(MAX(id), 1)) FROM reactions;
""")
    lines.append("COMMIT;")
    return "\n".join(lines)

if __name__ == "__main__":
    import os
    sql = generate_custom_channels_sql()
    out_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "seed_custom_channels.sql")
    with open(out_path, "w") as f:
        f.write(sql)
    print(f"seed_custom_channels.sql generated successfully to {out_path}.")
