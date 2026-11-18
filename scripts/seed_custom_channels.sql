BEGIN;

-- Custom channels for Avatar

DO $$
DECLARE
    v_club_id bigint;
    v_chan_id bigint;
    v_sender_id bigint;
    v_msg_id bigint;
    v_reaction_user_id bigint;
BEGIN
    SELECT id INTO v_club_id FROM clubs WHERE name ILIKE 'Avatar' LIMIT 1;
    IF v_club_id IS NOT NULL THEN


        -- Channel: lore-and-pandora
        SELECT id INTO v_chan_id FROM channels WHERE club_id = v_club_id AND name = 'lore-and-pandora';
        IF v_chan_id IS NULL THEN
            INSERT INTO channels (club_id, name, type, created_at)
            VALUES (v_club_id, 'lore-and-pandora', 'GENERAL', NOW() - interval '6 days')
            RETURNING id INTO v_chan_id;
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'sarah_cinema';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Welcome to #lore-and-pandora! Here we dive deep into the ecosystem of Pandora, the biology of the Na''vi, and Eywa''s biological neural network.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Welcome to #lore-and-pandora! Here we dive deep into the ecosystem of Pandora, the biology of the Na''vi, and Eywa''s biological neural network.', NOW() - interval '36 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'sarah_cinema' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '🔥', NOW() - interval '35 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'leo_films';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'The concept that Eywa is literally an interconnected biological supercomputer formed by electrochemical connections between tree roots is such clever hard sci-fi.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'The concept that Eywa is literally an interconnected biological supercomputer formed by electrochemical connections between tree roots is such clever hard sci-fi.', NOW() - interval '30 hours', FALSE)
            RETURNING id INTO v_msg_id;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'elena_v';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Yes! And Tsaheylu (the neural bond) isn''t just about controlling banshees or direhorses; it''s a mutual transfer of emotion and sensory memories. Such beautiful worldbuilding.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Yes! And Tsaheylu (the neural bond) isn''t just about controlling banshees or direhorses; it''s a mutual transfer of emotion and sensory memories. Such beautiful worldbuilding.', NOW() - interval '24 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'elena_v' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '👍', NOW() - interval '23 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'marcus_binge';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Also the atmospheric composition of Pandora—high concentrations of carbon dioxide, methane, and hydrogen cyanide—making exopacks necessary for humans grounds the survival element so well.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Also the atmospheric composition of Pandora—high concentrations of carbon dioxide, methane, and hydrogen cyanide—making exopacks necessary for humans grounds the survival element so well.', NOW() - interval '16 hours', FALSE)
            RETURNING id INTO v_msg_id;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'sarah_cinema';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Exactly. Cameron took real evolutionary biology principles and applied them to xenobiology. Can''t wait to see more clans in Fire and Ash!') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Exactly. Cameron took real evolutionary biology principles and applied them to xenobiology. Can''t wait to see more clans in Fire and Ash!', NOW() - interval '8 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'sarah_cinema' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '😮', NOW() - interval '7 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        -- Channel: visual-effects
        SELECT id INTO v_chan_id FROM channels WHERE club_id = v_club_id AND name = 'visual-effects';
        IF v_chan_id IS NULL THEN
            INSERT INTO channels (club_id, name, type, created_at)
            VALUES (v_club_id, 'visual-effects', 'GENERAL', NOW() - interval '6 days')
            RETURNING id INTO v_chan_id;
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'leo_films';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Let''s talk about the VFX pipeline. Wētā FX had to develop entirely new deep-water performance capture technology just to record facial muscle micro-movements underwater without distortion.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Let''s talk about the VFX pipeline. Wētā FX had to develop entirely new deep-water performance capture technology just to record facial muscle micro-movements underwater without distortion.', NOW() - interval '28 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'leo_films' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '🔥', NOW() - interval '27 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'sarah_cinema';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'And the photorealistic water simulations! Simulating light refraction through churning ocean waves and subsurface scattering on blue skin is computationally mind-boggling.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'And the photorealistic water simulations! Simulating light refraction through churning ocean waves and subsurface scattering on blue skin is computationally mind-boggling.', NOW() - interval '20 hours', FALSE)
            RETURNING id INTO v_msg_id;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'chloe_geek';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'I remember reading that rendering a single underwater frame in high frame rate took over 40 hours of compute time. The result on IMAX was breathtaking.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'I remember reading that rendering a single underwater frame in high frame rate took over 40 hours of compute time. The result on IMAX was breathtaking.', NOW() - interval '12 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'chloe_geek' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '👍', NOW() - interval '11 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

    END IF;
END $$;


-- Custom channels for Avengers: Endgame

DO $$
DECLARE
    v_club_id bigint;
    v_chan_id bigint;
    v_sender_id bigint;
    v_msg_id bigint;
    v_reaction_user_id bigint;
BEGIN
    SELECT id INTO v_club_id FROM clubs WHERE name ILIKE 'Avengers: Endgame' LIMIT 1;
    IF v_club_id IS NOT NULL THEN


        -- Channel: theories-and-easter-eggs
        SELECT id INTO v_chan_id FROM channels WHERE club_id = v_club_id AND name = 'theories-and-easter-eggs';
        IF v_chan_id IS NULL THEN
            INSERT INTO channels (club_id, name, type, created_at)
            VALUES (v_club_id, 'theories-and-easter-eggs', 'GENERAL', NOW() - interval '6 days')
            RETURNING id INTO v_chan_id;
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'chloe_geek';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Welcome to #theories-and-easter-eggs! Post your favorite hidden MCU details, timeline theories, and missed cameos.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Welcome to #theories-and-easter-eggs! Post your favorite hidden MCU details, timeline theories, and missed cameos.', NOW() - interval '34 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'chloe_geek' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '🔥', NOW() - interval '33 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'david_k';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Did everyone catch Howard the Duck holding a laser rifle in the final Ravager army portal? Blink and you miss him in the wide charge shot!') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Did everyone catch Howard the Duck holding a laser rifle in the final Ravager army portal? Blink and you miss him in the wide charge shot!', NOW() - interval '28 hours', FALSE)
            RETURNING id INTO v_msg_id;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'sarah_cinema';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Yes!! Also, when Cap returns the Soul Stone on Vormir, imagine the awkward encounter between Steve and the Red Skull after 80 years. We needed a Disney+ short for that alone 😂') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Yes!! Also, when Cap returns the Soul Stone on Vormir, imagine the awkward encounter between Steve and the Red Skull after 80 years. We needed a Disney+ short for that alone 😂', NOW() - interval '22 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'sarah_cinema' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '👍', NOW() - interval '21 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'leo_films';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'And in 1970 Camp Lehigh, seeing Jarvis in human form played by James D''Arcy from the Agent Carter show was such a satisfying continuity nod.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'And in 1970 Camp Lehigh, seeing Jarvis in human form played by James D''Arcy from the Agent Carter show was such a satisfying continuity nod.', NOW() - interval '14 hours', FALSE)
            RETURNING id INTO v_msg_id;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'chloe_geek';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Also Tony''s helmet message in the opening scene mirrors his audio recording from Iron Man 1 almost word for word. The Russos packed so much love into this.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Also Tony''s helmet message in the opening scene mirrors his audio recording from Iron Man 1 almost word for word. The Russos packed so much love into this.', NOW() - interval '6 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'chloe_geek' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '😮', NOW() - interval '5 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        -- Channel: favorite-quotes
        SELECT id INTO v_chan_id FROM channels WHERE club_id = v_club_id AND name = 'favorite-quotes';
        IF v_chan_id IS NULL THEN
            INSERT INTO channels (club_id, name, type, created_at)
            VALUES (v_club_id, 'favorite-quotes', 'GENERAL', NOW() - interval '6 days')
            RETURNING id INTO v_chan_id;
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'sarah_cinema';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Drop your most iconic line from the movie! For me: ''I love you 3,000.'' Morgan Stark and Tony broke my heart into pieces.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Drop your most iconic line from the movie! For me: ''I love you 3,000.'' Morgan Stark and Tony broke my heart into pieces.', NOW() - interval '30 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'sarah_cinema' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '🔥', NOW() - interval '29 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'chloe_geek';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = '''I can do this all day.'' / ''Yeah, I know, I know.'' 2023 Cap being completely exhausted by 2012 Cap''s optimism was peak comedy 🛡️') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, '''I can do this all day.'' / ''Yeah, I know, I know.'' 2023 Cap being completely exhausted by 2012 Cap''s optimism was peak comedy 🛡️', NOW() - interval '22 hours', FALSE)
            RETURNING id INTO v_msg_id;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'marcus_binge';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = '''I went for the head.'' Thor''s quiet, broken delivery in the garden when he realizes killing Thanos changed nothing. Incredible character depth.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, '''I went for the head.'' Thor''s quiet, broken delivery in the garden when he realizes killing Thanos changed nothing. Incredible character depth.', NOW() - interval '15 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'marcus_binge' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '👍', NOW() - interval '14 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

    END IF;
END $$;


-- Custom channels for The Lord of the Rings: The Return of the King

DO $$
DECLARE
    v_club_id bigint;
    v_chan_id bigint;
    v_sender_id bigint;
    v_msg_id bigint;
    v_reaction_user_id bigint;
BEGIN
    SELECT id INTO v_club_id FROM clubs WHERE name ILIKE 'The Lord of the Rings: The Return of the King' LIMIT 1;
    IF v_club_id IS NOT NULL THEN


        -- Channel: book-vs-film
        SELECT id INTO v_chan_id FROM channels WHERE club_id = v_club_id AND name = 'book-vs-film';
        IF v_chan_id IS NULL THEN
            INSERT INTO channels (club_id, name, type, created_at)
            VALUES (v_club_id, 'book-vs-film', 'GENERAL', NOW() - interval '6 days')
            RETURNING id INTO v_chan_id;
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'alex_reads';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Welcome to #book-vs-film! Here we discuss the nuances between Tolkien''s published text and Peter Jackson''s film trilogy adaptation.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Welcome to #book-vs-film! Here we discuss the nuances between Tolkien''s published text and Peter Jackson''s film trilogy adaptation.', NOW() - interval '36 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'alex_reads' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '🔥', NOW() - interval '35 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'sarah_cinema';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'One of the most debated changes is the omission of the Scouring of the Shire. In the book, Saruman takes over the Shire and the hobbits lead an armed rebellion to free their homeland.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'One of the most debated changes is the omission of the Scouring of the Shire. In the book, Saruman takes over the Shire and the hobbits lead an armed rebellion to free their homeland.', NOW() - interval '30 hours', FALSE)
            RETURNING id INTO v_msg_id;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'samir_b';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'While I adore the Scouring in the book as Tolkien''s commentary on returning WWI veterans finding home scarred, Jackson''s decision to end with the Shire untouched emphasizes what they fought to protect.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'While I adore the Scouring in the book as Tolkien''s commentary on returning WWI veterans finding home scarred, Jackson''s decision to end with the Shire untouched emphasizes what they fought to protect.', NOW() - interval '22 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'samir_b' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '👍', NOW() - interval '21 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'alex_reads';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Very well put, Samir. Jackson made a cinematic choice that prioritized emotional closure after 11 hours of war. Both endings are masterpieces in their respective mediums.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Very well put, Samir. Jackson made a cinematic choice that prioritized emotional closure after 11 hours of war. Both endings are masterpieces in their respective mediums.', NOW() - interval '14 hours', FALSE)
            RETURNING id INTO v_msg_id;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'elena_v';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Also Faramir''s portrayal! In the film he struggles with the Ring''s temptation before letting Frodo go, which raised the dramatic stakes for viewers.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Also Faramir''s portrayal! In the film he struggles with the Ring''s temptation before letting Frodo go, which raised the dramatic stakes for viewers.', NOW() - interval '8 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'elena_v' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '😮', NOW() - interval '7 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        -- Channel: soundtrack-appreciation
        SELECT id INTO v_chan_id FROM channels WHERE club_id = v_club_id AND name = 'soundtrack-appreciation';
        IF v_chan_id IS NULL THEN
            INSERT INTO channels (club_id, name, type, created_at)
            VALUES (v_club_id, 'soundtrack-appreciation', 'GENERAL', NOW() - interval '6 days')
            RETURNING id INTO v_chan_id;
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'sarah_cinema';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Howard Shore composed over 12 hours of music across 80 recurring leitmotifs for Middle-earth. Which theme is your personal favorite?') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Howard Shore composed over 12 hours of music across 80 recurring leitmotifs for Middle-earth. Which theme is your personal favorite?', NOW() - interval '32 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'sarah_cinema' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '🔥', NOW() - interval '31 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'samir_b';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'The Lighting of the Beacons (''The White Tree''). The sheer momentum of the brass as the pyres ignite across the snow-capped mountain peaks of Gondor gives me chills.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'The Lighting of the Beacons (''The White Tree''). The sheer momentum of the brass as the pyres ignite across the snow-capped mountain peaks of Gondor gives me chills.', NOW() - interval '25 hours', FALSE)
            RETURNING id INTO v_msg_id;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'alex_reads';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Billy Boyd singing ''The Edge of Night'' while Faramir makes his suicidal charge on Osgiliath and Denethor feasts on tomatoes... one of the most haunting sequences in cinema history.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Billy Boyd singing ''The Edge of Night'' while Faramir makes his suicidal charge on Osgiliath and Denethor feasts on tomatoes... one of the most haunting sequences in cinema history.', NOW() - interval '18 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'alex_reads' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '👍', NOW() - interval '17 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'sarah_cinema';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'And Annie Lennox''s ''Into the West'' over the end credits sketches by Alan Lee. The perfect, melancholic farewell to the Third Age.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'And Annie Lennox''s ''Into the West'' over the end credits sketches by Alan Lee. The perfect, melancholic farewell to the Third Age.', NOW() - interval '10 hours', FALSE)
            RETURNING id INTO v_msg_id;

        END IF;

    END IF;
END $$;


-- Custom channels for The Dark Knight

DO $$
DECLARE
    v_club_id bigint;
    v_chan_id bigint;
    v_sender_id bigint;
    v_msg_id bigint;
    v_reaction_user_id bigint;
BEGIN
    SELECT id INTO v_club_id FROM clubs WHERE name ILIKE 'The Dark Knight' LIMIT 1;
    IF v_club_id IS NOT NULL THEN


        -- Channel: screenplay-and-philosophy
        SELECT id INTO v_chan_id FROM channels WHERE club_id = v_club_id AND name = 'screenplay-and-philosophy';
        IF v_chan_id IS NULL THEN
            INSERT INTO channels (club_id, name, type, created_at)
            VALUES (v_club_id, 'screenplay-and-philosophy', 'GENERAL', NOW() - interval '6 days')
            RETURNING id INTO v_chan_id;
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'david_k';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Welcome to #screenplay-and-philosophy. Analyzing Jonathan and Christopher Nolan''s thematic structure, moral dilemmas, and the soul of Gotham.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Welcome to #screenplay-and-philosophy. Analyzing Jonathan and Christopher Nolan''s thematic structure, moral dilemmas, and the soul of Gotham.', NOW() - interval '35 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'david_k' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '🔥', NOW() - interval '34 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'marcus_binge';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'The central thesis of the film is whether human morality survives when civilization''s rules are stripped away. Joker is an agent of pure philosophical cynicism.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'The central thesis of the film is whether human morality survives when civilization''s rules are stripped away. Joker is an agent of pure philosophical cynicism.', NOW() - interval '28 hours', FALSE)
            RETURNING id INTO v_msg_id;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'sarah_cinema';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Notice how Joker tells three completely different stories about how he got his scars. He has no fixed origin because he isn''t a person—he represents an idea, a force of nature.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Notice how Joker tells three completely different stories about how he got his scars. He has no fixed origin because he isn''t a person—he represents an idea, a force of nature.', NOW() - interval '20 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'sarah_cinema' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '👍', NOW() - interval '19 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'samir_b';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'And Harvey Dent''s two-faced coin. When he flips it, he abdicates moral choice to chance because he believes justice is an illusion after losing Rachel. Tragic writing.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'And Harvey Dent''s two-faced coin. When he flips it, he abdicates moral choice to chance because he believes justice is an illusion after losing Rachel. Tragic writing.', NOW() - interval '12 hours', FALSE)
            RETURNING id INTO v_msg_id;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'david_k';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Batman taking the blame for Harvey''s crimes at the end is the ultimate act of self-sacrifice: becoming the villain so Gotham keeps its beacon of hope.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Batman taking the blame for Harvey''s crimes at the end is the ultimate act of self-sacrifice: becoming the villain so Gotham keeps its beacon of hope.', NOW() - interval '6 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'david_k' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '😮', NOW() - interval '5 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        -- Channel: nolan-filmmaking
        SELECT id INTO v_chan_id FROM channels WHERE club_id = v_club_id AND name = 'nolan-filmmaking';
        IF v_chan_id IS NULL THEN
            INSERT INTO channels (club_id, name, type, created_at)
            VALUES (v_club_id, 'nolan-filmmaking', 'GENERAL', NOW() - interval '6 days')
            RETURNING id INTO v_chan_id;
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'leo_films';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Nolan''s insistence on in-camera practical effects is legendary. They built a custom nitrogen cannon piston to flip an actual 18-wheel semi-truck upside down in downtown Chicago!') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Nolan''s insistence on in-camera practical effects is legendary. They built a custom nitrogen cannon piston to flip an actual 18-wheel semi-truck upside down in downtown Chicago!', NOW() - interval '30 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'leo_films' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '🔥', NOW() - interval '29 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'david_k';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'And the hospital demolition! When the pyrotechnics delayed, Heath Ledger stayed in character, shaking the detonator until the final explosions erupted. Seamless improvisation.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'And the hospital demolition! When the pyrotechnics delayed, Heath Ledger stayed in character, shaking the detonator until the final explosions erupted. Seamless improvisation.', NOW() - interval '22 hours', FALSE)
            RETURNING id INTO v_msg_id;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'sarah_cinema';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Also Hans Zimmer''s score: using razor blades and cellos scraped with metal rulers to produce Joker''s screeching, escalating two-note motif. Pure acoustic terror.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Also Hans Zimmer''s score: using razor blades and cellos scraped with metal rulers to produce Joker''s screeching, escalating two-note motif. Pure acoustic terror.', NOW() - interval '14 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'sarah_cinema' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '👍', NOW() - interval '13 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

    END IF;
END $$;


-- Custom channels for Harry Potter and the Sorcerer's Stone

DO $$
DECLARE
    v_club_id bigint;
    v_chan_id bigint;
    v_sender_id bigint;
    v_msg_id bigint;
    v_reaction_user_id bigint;
BEGIN
    SELECT id INTO v_club_id FROM clubs WHERE name ILIKE 'Harry Potter and the Sorcerer''s Stone' LIMIT 1;
    IF v_club_id IS NOT NULL THEN


        -- Channel: hogwarts-houses
        SELECT id INTO v_chan_id FROM channels WHERE club_id = v_club_id AND name = 'hogwarts-houses';
        IF v_chan_id IS NULL THEN
            INSERT INTO channels (club_id, name, type, created_at)
            VALUES (v_club_id, 'hogwarts-houses', 'GENERAL', NOW() - interval '6 days')
            RETURNING id INTO v_chan_id;
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'zoe_novels';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Welcome to #hogwarts-houses! Where did the Sorting Hat place you? Share your house pride and favorite house lore!') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Welcome to #hogwarts-houses! Where did the Sorting Hat place you? Share your house pride and favorite house lore!', NOW() - interval '32 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'zoe_novels' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '🔥', NOW() - interval '31 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'alex_reads';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Ravenclaw through and through! 🦅 Wit beyond measure is man''s greatest treasure. The common room in the high tower with the starry ceiling is dream aesthetic.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Ravenclaw through and through! 🦅 Wit beyond measure is man''s greatest treasure. The common room in the high tower with the starry ceiling is dream aesthetic.', NOW() - interval '25 hours', FALSE)
            RETURNING id INTO v_msg_id;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'chloe_geek';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Proud Gryffindor here! 🦁 The cozy armchair by the fireplace with a warm pumpkin pasty sounds like heaven on a cold Scottish evening.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Proud Gryffindor here! 🦁 The cozy armchair by the fireplace with a warm pumpkin pasty sounds like heaven on a cold Scottish evening.', NOW() - interval '18 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'chloe_geek' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '👍', NOW() - interval '17 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'sarah_cinema';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Hufflepuff representation! 🦡 Right next to the Hogwarts kitchens, surrounded by plants and yellow tapestries. Loyalty and kindness above all.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Hufflepuff representation! 🦡 Right next to the Hogwarts kitchens, surrounded by plants and yellow tapestries. Loyalty and kindness above all.', NOW() - interval '10 hours', FALSE)
            RETURNING id INTO v_msg_id;

        END IF;

        -- Channel: nostalgia-corner
        SELECT id INTO v_chan_id FROM channels WHERE club_id = v_club_id AND name = 'nostalgia-corner';
        IF v_chan_id IS NULL THEN
            INSERT INTO channels (club_id, name, type, created_at)
            VALUES (v_club_id, 'nostalgia-corner', 'GENERAL', NOW() - interval '6 days')
            RETURNING id INTO v_chan_id;
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'zoe_novels';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Remember the first time you watched Harry stepping into Diagon Alley with Hagrid tapping the brick wall? The magic of that moment is timeless.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Remember the first time you watched Harry stepping into Diagon Alley with Hagrid tapping the brick wall? The magic of that moment is timeless.', NOW() - interval '26 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'zoe_novels' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '🔥', NOW() - interval '25 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'alex_reads';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'And opening the letter from Hogwarts! Generations of kids kept checking their mailboxes when they turned 11 haha.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'And opening the letter from Hogwarts! Generations of kids kept checking their mailboxes when they turned 11 haha.', NOW() - interval '18 hours', FALSE)
            RETURNING id INTO v_msg_id;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'chloe_geek';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'John Williams'' ''Arrival of Baby Harry'' and ''Hedwig''s Theme'' instantly transports me back to being 9 years old under a cozy blanket.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'John Williams'' ''Arrival of Baby Harry'' and ''Hedwig''s Theme'' instantly transports me back to being 9 years old under a cozy blanket.', NOW() - interval '10 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'chloe_geek' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '👍', NOW() - interval '9 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

    END IF;
END $$;


-- Custom channels for Game of Thrones

DO $$
DECLARE
    v_club_id bigint;
    v_chan_id bigint;
    v_sender_id bigint;
    v_msg_id bigint;
    v_reaction_user_id bigint;
BEGIN
    SELECT id INTO v_club_id FROM clubs WHERE name ILIKE 'Game of Thrones' LIMIT 1;
    IF v_club_id IS NOT NULL THEN


        -- Channel: theories-and-lore
        SELECT id INTO v_chan_id FROM channels WHERE club_id = v_club_id AND name = 'theories-and-lore';
        IF v_chan_id IS NULL THEN
            INSERT INTO channels (club_id, name, type, created_at)
            VALUES (v_club_id, 'theories-and-lore', 'GENERAL', NOW() - interval '6 days')
            RETURNING id INTO v_chan_id;
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'marcus_binge';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Welcome to #theories-and-lore! Discussing Old Valyria, Targaryen dragonlords, the prophecy of Azor Ahai, and Westerosi history.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Welcome to #theories-and-lore! Discussing Old Valyria, Targaryen dragonlords, the prophecy of Azor Ahai, and Westerosi history.', NOW() - interval '35 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'marcus_binge' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '🔥', NOW() - interval '34 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'clara_m';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'The Doom of Valyria is one of the most intriguing mysteries in Martin''s world. Fourteen volcanic flames simultaneously tearing the greatest empire in history apart overnight.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'The Doom of Valyria is one of the most intriguing mysteries in Martin''s world. Fourteen volcanic flames simultaneously tearing the greatest empire in history apart overnight.', NOW() - interval '28 hours', FALSE)
            RETURNING id INTO v_msg_id;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'alex_reads';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'And the architecture of the Wall! Spells woven into the ice by Brandon the Builder and the Children of the Forest to prevent dark magic from crossing.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'And the architecture of the Wall! Spells woven into the ice by Brandon the Builder and the Children of the Forest to prevent dark magic from crossing.', NOW() - interval '20 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'alex_reads' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '👍', NOW() - interval '19 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'samir_b';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'The tragedy of Rhaegar Targaryen and Lyanna Stark started the entire chain of events. A doomed romance wrapped in prophecy that cost hundreds of thousands of lives.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'The tragedy of Rhaegar Targaryen and Lyanna Stark started the entire chain of events. A doomed romance wrapped in prophecy that cost hundreds of thousands of lives.', NOW() - interval '12 hours', FALSE)
            RETURNING id INTO v_msg_id;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'marcus_binge';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'George''s worldbuilding has so many layers. Every castle, house sigil, and motto carries centuries of generational grudges.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'George''s worldbuilding has so many layers. Every castle, house sigil, and motto carries centuries of generational grudges.', NOW() - interval '6 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'marcus_binge' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '😮', NOW() - interval '5 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        -- Channel: battle-tactics
        SELECT id INTO v_chan_id FROM channels WHERE club_id = v_club_id AND name = 'battle-tactics';
        IF v_chan_id IS NULL THEN
            INSERT INTO channels (club_id, name, type, created_at)
            VALUES (v_club_id, 'battle-tactics', 'GENERAL', NOW() - interval '6 days')
            RETURNING id INTO v_chan_id;
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'marcus_binge';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Which battle had the best tactical staging? The Blackwater wildfire strategy orchestrated by Tyrion was sheer military genius.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Which battle had the best tactical staging? The Blackwater wildfire strategy orchestrated by Tyrion was sheer military genius.', NOW() - interval '30 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'marcus_binge' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '🔥', NOW() - interval '29 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'samir_b';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Hardhome was pure horror-survival tactics. The realization that every fallen Brother instantly rose with blue eyes changed warfare forever in the North.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Hardhome was pure horror-survival tactics. The realization that every fallen Brother instantly rose with blue eyes changed warfare forever in the North.', NOW() - interval '22 hours', FALSE)
            RETURNING id INTO v_msg_id;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'clara_m';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'And the Battle of the Bastards double envelopment shield wall! The claustrophobia of soldiers trampling over one another was terrifyingly realistic.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'And the Battle of the Bastards double envelopment shield wall! The claustrophobia of soldiers trampling over one another was terrifyingly realistic.', NOW() - interval '14 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'clara_m' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '👍', NOW() - interval '13 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

    END IF;
END $$;


-- Custom channels for Breaking Bad

DO $$
DECLARE
    v_club_id bigint;
    v_chan_id bigint;
    v_sender_id bigint;
    v_msg_id bigint;
    v_reaction_user_id bigint;
BEGIN
    SELECT id INTO v_club_id FROM clubs WHERE name ILIKE 'Breaking Bad' LIMIT 1;
    IF v_club_id IS NOT NULL THEN


        -- Channel: cinematography-and-motifs
        SELECT id INTO v_chan_id FROM channels WHERE club_id = v_club_id AND name = 'cinematography-and-motifs';
        IF v_chan_id IS NULL THEN
            INSERT INTO channels (club_id, name, type, created_at)
            VALUES (v_club_id, 'cinematography-and-motifs', 'GENERAL', NOW() - interval '6 days')
            RETURNING id INTO v_chan_id;
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'marcus_binge';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Welcome to #cinematography-and-motifs! Analyzing Vince Gilligan''s color psychology, recurring symbols, and unique camera placement.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Welcome to #cinematography-and-motifs! Analyzing Vince Gilligan''s color psychology, recurring symbols, and unique camera placement.', NOW() - interval '34 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'marcus_binge' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '🔥', NOW() - interval '33 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'david_k';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'The color theory across the series is legendary. Walt starts in drab khaki and beige when he''s powerless, transitions through emerald greens as Heisenberg rises, and wears black by the end.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'The color theory across the series is legendary. Walt starts in drab khaki and beige when he''s powerless, transitions through emerald greens as Heisenberg rises, and wears black by the end.', NOW() - interval '27 hours', FALSE)
            RETURNING id INTO v_msg_id;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'maya_tv';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'And Marie Schrader wearing strictly purple! Purple is the color of royalty, symbolizing her desire for stability and illusion of wealth.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'And Marie Schrader wearing strictly purple! Purple is the color of royalty, symbolizing her desire for stability and illusion of wealth.', NOW() - interval '20 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'maya_tv' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '👍', NOW() - interval '19 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'samir_b';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'The pink teddy bear from the Wayfarer plane collision with half its face burned... brilliant foreshadowing for Gus Fring''s fate two seasons later in ''Face Off''.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'The pink teddy bear from the Wayfarer plane collision with half its face burned... brilliant foreshadowing for Gus Fring''s fate two seasons later in ''Face Off''.', NOW() - interval '13 hours', FALSE)
            RETURNING id INTO v_msg_id;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'marcus_binge';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'The POV camera mounted inside a washing machine, on a shovel, inside a frying pan—Gilligan gave the camera its own mischievous personality.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'The POV camera mounted inside a washing machine, on a shovel, inside a frying pan—Gilligan gave the camera its own mischievous personality.', NOW() - interval '6 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'marcus_binge' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '😮', NOW() - interval '5 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        -- Channel: character-arcs
        SELECT id INTO v_chan_id FROM channels WHERE club_id = v_club_id AND name = 'character-arcs';
        IF v_chan_id IS NULL THEN
            INSERT INTO channels (club_id, name, type, created_at)
            VALUES (v_club_id, 'character-arcs', 'GENERAL', NOW() - interval '6 days')
            RETURNING id INTO v_chan_id;
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'david_k';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Hank Schrader''s realization in ''Gliding Over All'' on the toilet reading ''Leaves of Grass'': ''To my other favorite W.W. It''s an honour working with you. Fondly, G.B.'' That sudden panic attack was perfection.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Hank Schrader''s realization in ''Gliding Over All'' on the toilet reading ''Leaves of Grass'': ''To my other favorite W.W. It''s an honour working with you. Fondly, G.B.'' That sudden panic attack was perfection.', NOW() - interval '28 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'david_k' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '🔥', NOW() - interval '27 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'marcus_binge';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Dean Norris portrayed PTSD in Season 3 with so much vulnerability. When the twins attack him in the parking lot and he''s unarmed... heart in mouth.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Dean Norris portrayed PTSD in Season 3 with so much vulnerability. When the twins attack him in the parking lot and he''s unarmed... heart in mouth.', NOW() - interval '20 hours', FALSE)
            RETURNING id INTO v_msg_id;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'maya_tv';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'And Jesse Pinkman in the finale driving away laughing and crying into the dark night. Freedom earned through pure suffering.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'And Jesse Pinkman in the finale driving away laughing and crying into the dark night. Freedom earned through pure suffering.', NOW() - interval '12 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'maya_tv' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '👍', NOW() - interval '11 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

    END IF;
END $$;


-- Custom channels for The Office (US)

DO $$
DECLARE
    v_club_id bigint;
    v_chan_id bigint;
    v_sender_id bigint;
    v_msg_id bigint;
    v_reaction_user_id bigint;
BEGIN
    SELECT id INTO v_club_id FROM clubs WHERE name ILIKE 'The Office (US)' LIMIT 1;
    IF v_club_id IS NOT NULL THEN


        -- Channel: favorite-pranks
        SELECT id INTO v_chan_id FROM channels WHERE club_id = v_club_id AND name = 'favorite-pranks';
        IF v_chan_id IS NULL THEN
            INSERT INTO channels (club_id, name, type, created_at)
            VALUES (v_club_id, 'favorite-pranks', 'GENERAL', NOW() - interval '6 days')
            RETURNING id INTO v_chan_id;
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'maya_tv';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Welcome to #favorite-pranks! Rank Jim Halpert''s legendary psychological warfare against Dwight K. Schrute!') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Welcome to #favorite-pranks! Rank Jim Halpert''s legendary psychological warfare against Dwight K. Schrute!', NOW() - interval '32 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'maya_tv' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '🔥', NOW() - interval '31 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'marcus_binge';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = '''Identity theft is not a joke, Jim! Millions of families suffer every year!'' The mustard shirt, the glasses, the calculator watch... undefeated 😂') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, '''Identity theft is not a joke, Jim! Millions of families suffer every year!'' The mustard shirt, the glasses, the calculator watch... undefeated 😂', NOW() - interval '26 hours', FALSE)
            RETURNING id INTO v_msg_id;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'zoe_novels';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Wrapping Dwight''s entire desk, chair, computer, and pencil cup in holiday wrapping paper, and Dwight tries to sit down and crashes through cardboard!') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Wrapping Dwight''s entire desk, chair, computer, and pencil cup in holiday wrapping paper, and Dwight tries to sit down and crashes through cardboard!', NOW() - interval '18 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'zoe_novels' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '👍', NOW() - interval '17 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'chloe_geek';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Sending Dwight faxes from ''Future Dwight'' warning him that the coffee is poisoned: ''Nooooo! Stanley, don''t drink it!'' and slapping the mug out of his hand!') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Sending Dwight faxes from ''Future Dwight'' warning him that the coffee is poisoned: ''Nooooo! Stanley, don''t drink it!'' and slapping the mug out of his hand!', NOW() - interval '10 hours', FALSE)
            RETURNING id INTO v_msg_id;

        END IF;

        -- Channel: underrated-episodes
        SELECT id INTO v_chan_id FROM channels WHERE club_id = v_club_id AND name = 'underrated-episodes';
        IF v_chan_id IS NULL THEN
            INSERT INTO channels (club_id, name, type, created_at)
            VALUES (v_club_id, 'underrated-episodes', 'GENERAL', NOW() - interval '6 days')
            RETURNING id INTO v_chan_id;
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'maya_tv';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'What''s an episode that deserves more love? ''The Injury'' when Michael burns his foot on a George Foreman grill is top-tier chaotic comedy.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'What''s an episode that deserves more love? ''The Injury'' when Michael burns his foot on a George Foreman grill is top-tier chaotic comedy.', NOW() - interval '28 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'maya_tv' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '🔥', NOW() - interval '27 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'marcus_binge';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = '''Safety Training''! Michael on the roof with the bouncy castle and giant watermelon: ''Dwight, you ignorant slut!'' Peak Steve Carell.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, '''Safety Training''! Michael on the roof with the bouncy castle and giant watermelon: ''Dwight, you ignorant slut!'' Peak Steve Carell.', NOW() - interval '20 hours', FALSE)
            RETURNING id INTO v_msg_id;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'zoe_novels';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = '''Fun Run'' for rabies awareness where Michael carbo-loads on fettuccine alfredo right before running 5 kilometers in 90-degree heat! Hahaha.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, '''Fun Run'' for rabies awareness where Michael carbo-loads on fettuccine alfredo right before running 5 kilometers in 90-degree heat! Hahaha.', NOW() - interval '12 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'zoe_novels' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '👍', NOW() - interval '11 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

    END IF;
END $$;


-- Custom channels for Stranger Things

DO $$
DECLARE
    v_club_id bigint;
    v_chan_id bigint;
    v_sender_id bigint;
    v_msg_id bigint;
    v_reaction_user_id bigint;
BEGIN
    SELECT id INTO v_club_id FROM clubs WHERE name ILIKE 'Stranger Things' LIMIT 1;
    IF v_club_id IS NOT NULL THEN


        -- Channel: 80s-soundtrack-and-vibes
        SELECT id INTO v_chan_id FROM channels WHERE club_id = v_club_id AND name = '80s-soundtrack-and-vibes';
        IF v_chan_id IS NULL THEN
            INSERT INTO channels (club_id, name, type, created_at)
            VALUES (v_club_id, '80s-soundtrack-and-vibes', 'GENERAL', NOW() - interval '6 days')
            RETURNING id INTO v_chan_id;
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'elena_v';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Welcome to #80s-soundtrack-and-vibes! Sharing vintage synth tracks, 80s pop classics, and the incredible score by Kyle Dixon & Michael Stein.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Welcome to #80s-soundtrack-and-vibes! Sharing vintage synth tracks, 80s pop classics, and the incredible score by Kyle Dixon & Michael Stein.', NOW() - interval '32 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'elena_v' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '🔥', NOW() - interval '31 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'chloe_geek';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Kate Bush''s ''Running Up That Hill'' returning to number 1 worldwide 37 years after its release because of Max Mayfield''s escape was a cultural moment.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Kate Bush''s ''Running Up That Hill'' returning to number 1 worldwide 37 years after its release because of Max Mayfield''s escape was a cultural moment.', NOW() - interval '25 hours', FALSE)
            RETURNING id INTO v_msg_id;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'sarah_cinema';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'And Eddie Munson playing Metallica''s ''Master of Puppets'' on his Warlock guitar to draw the demobats... most metal scene in modern streaming history 🎸') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'And Eddie Munson playing Metallica''s ''Master of Puppets'' on his Warlock guitar to draw the demobats... most metal scene in modern streaming history 🎸', NOW() - interval '18 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'sarah_cinema' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '👍', NOW() - interval '17 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'maya_tv';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Don''t forget The Clash ''Should I Stay or Should I Go'' in Season 1 connecting Jonathan and Will. The nostalgic heart of the show.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Don''t forget The Clash ''Should I Stay or Should I Go'' in Season 1 connecting Jonathan and Will. The nostalgic heart of the show.', NOW() - interval '10 hours', FALSE)
            RETURNING id INTO v_msg_id;

        END IF;

        -- Channel: upside-down-theories
        SELECT id INTO v_chan_id FROM channels WHERE club_id = v_club_id AND name = 'upside-down-theories';
        IF v_chan_id IS NULL THEN
            INSERT INTO channels (club_id, name, type, created_at)
            VALUES (v_club_id, 'upside-down-theories', 'GENERAL', NOW() - interval '6 days')
            RETURNING id INTO v_chan_id;
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'elena_v';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Why is the Upside Down frozen on November 6, 1983—the exact day Will Byers disappeared and Eleven opened the mother gate?') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Why is the Upside Down frozen on November 6, 1983—the exact day Will Byers disappeared and Eleven opened the mother gate?', NOW() - interval '28 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'elena_v' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '🔥', NOW() - interval '27 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'chloe_geek';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'My theory is that Eleven''s psychic contact literally snapshotted Hawkins at that exact second in time. It''s a dormant mirror dimension that Henry Creel populated.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'My theory is that Eleven''s psychic contact literally snapshotted Hawkins at that exact second in time. It''s a dormant mirror dimension that Henry Creel populated.', NOW() - interval '20 hours', FALSE)
            RETURNING id INTO v_msg_id;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'marcus_binge';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'And Will having the neck tingle and sensing Vecna''s emotions... Will is definitely the key to closing the gate permanently in Season 5.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'And Will having the neck tingle and sensing Vecna''s emotions... Will is definitely the key to closing the gate permanently in Season 5.', NOW() - interval '12 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'marcus_binge' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '👍', NOW() - interval '11 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

    END IF;
END $$;


-- Custom channels for The Wire

DO $$
DECLARE
    v_club_id bigint;
    v_chan_id bigint;
    v_sender_id bigint;
    v_msg_id bigint;
    v_reaction_user_id bigint;
BEGIN
    SELECT id INTO v_club_id FROM clubs WHERE name ILIKE 'The Wire' LIMIT 1;
    IF v_club_id IS NOT NULL THEN


        -- Channel: quotes-and-street-wisdom
        SELECT id INTO v_chan_id FROM channels WHERE club_id = v_club_id AND name = 'quotes-and-street-wisdom';
        IF v_chan_id IS NULL THEN
            INSERT INTO channels (club_id, name, type, created_at)
            VALUES (v_club_id, 'quotes-and-street-wisdom', 'GENERAL', NOW() - interval '6 days')
            RETURNING id INTO v_chan_id;
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'samir_b';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Welcome to #quotes-and-street-wisdom. The Wire produced some of the sharpest dialogue in modern dramatic literature.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Welcome to #quotes-and-street-wisdom. The Wire produced some of the sharpest dialogue in modern dramatic literature.', NOW() - interval '35 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'samir_b' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '🔥', NOW() - interval '34 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'marcus_binge';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = '''You come at the king, you best not miss.'' Omar Little outside the courthouse. Simple, lethal, unforgettable.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, '''You come at the king, you best not miss.'' Omar Little outside the courthouse. Simple, lethal, unforgettable.', NOW() - interval '28 hours', FALSE)
            RETURNING id INTO v_msg_id;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'david_k';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = '''The king stay the king.'' D''Angelo Barksdale teaching Bodie and Wallace chess in the pit. The pawns get capped early; the queen got all the moves.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, '''The king stay the king.'' D''Angelo Barksdale teaching Bodie and Wallace chess in the pit. The pawns get capped early; the queen got all the moves.', NOW() - interval '20 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'david_k' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '👍', NOW() - interval '19 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'jordan_lit';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = '''A man must have a code.'' Omar and Bunk''s conversation about the difference between stickup boys and predators.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, '''A man must have a code.'' Omar and Bunk''s conversation about the difference between stickup boys and predators.', NOW() - interval '12 hours', FALSE)
            RETURNING id INTO v_msg_id;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'samir_b';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = '''Money ain''t got no owners, only spenders.'' Marlo Stanfield''s cold pragmatism.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, '''Money ain''t got no owners, only spenders.'' Marlo Stanfield''s cold pragmatism.', NOW() - interval '6 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'samir_b' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '😮', NOW() - interval '5 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        -- Channel: institutional-critique
        SELECT id INTO v_chan_id FROM channels WHERE club_id = v_club_id AND name = 'institutional-critique';
        IF v_chan_id IS NULL THEN
            INSERT INTO channels (club_id, name, type, created_at)
            VALUES (v_club_id, 'institutional-critique', 'GENERAL', NOW() - interval '6 days')
            RETURNING id INTO v_chan_id;
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'david_k';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'David Simon''s genius was showing how bureaucratic institutions—police departments, City Hall, union docks, schools, newspapers—all self-preserve by lying about data.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'David Simon''s genius was showing how bureaucratic institutions—police departments, City Hall, union docks, schools, newspapers—all self-preserve by lying about data.', NOW() - interval '30 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'david_k' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '🔥', NOW() - interval '29 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'samir_b';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Season 4''s examination of Baltimore middle schools is devastating. Teachers forced to ''teach to the test'' rather than educate, while street corners provide the only reliable career path.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Season 4''s examination of Baltimore middle schools is devastating. Teachers forced to ''teach to the test'' rather than educate, while street corners provide the only reliable career path.', NOW() - interval '22 hours', FALSE)
            RETURNING id INTO v_msg_id;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'marcus_binge';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'And ''Hamsterdam'' in Season 3! Major Colvin creating legalized zones to curb violent crime... a radical experiment that politics immediately crushed.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'And ''Hamsterdam'' in Season 3! Major Colvin creating legalized zones to curb violent crime... a radical experiment that politics immediately crushed.', NOW() - interval '14 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'marcus_binge' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '👍', NOW() - interval '13 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

    END IF;
END $$;


-- Custom channels for The Da Vinci Code

DO $$
DECLARE
    v_club_id bigint;
    v_chan_id bigint;
    v_sender_id bigint;
    v_msg_id bigint;
    v_reaction_user_id bigint;
BEGIN
    SELECT id INTO v_club_id FROM clubs WHERE name ILIKE 'The Da Vinci Code' LIMIT 1;
    IF v_club_id IS NOT NULL THEN


        -- Channel: symbology-and-art-history
        SELECT id INTO v_chan_id FROM channels WHERE club_id = v_club_id AND name = 'symbology-and-art-history';
        IF v_chan_id IS NULL THEN
            INSERT INTO channels (club_id, name, type, created_at)
            VALUES (v_club_id, 'symbology-and-art-history', 'GENERAL', NOW() - interval '6 days')
            RETURNING id INTO v_chan_id;
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'alex_reads';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Welcome to #symbology-and-art-history! Dissecting the art history clues, Fibonacci spirals, and cryptographic puzzles in Dan Brown''s novel.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Welcome to #symbology-and-art-history! Dissecting the art history clues, Fibonacci spirals, and cryptographic puzzles in Dan Brown''s novel.', NOW() - interval '34 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'alex_reads' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '🔥', NOW() - interval '33 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'clara_m';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'The composition of Da Vinci''s ''The Last Supper'' was such an electrifying chapter. The V-shape representing the sacred feminine and the chalice.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'The composition of Da Vinci''s ''The Last Supper'' was such an electrifying chapter. The V-shape representing the sacred feminine and the chalice.', NOW() - interval '27 hours', FALSE)
            RETURNING id INTO v_msg_id;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'jordan_lit';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'And the cryptex! Vinegar dissolving the papyrus scroll inside if you force it open with the wrong 5-letter code. Such a clever physical mechanism.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'And the cryptex! Vinegar dissolving the papyrus scroll inside if you force it open with the wrong 5-letter code. Such a clever physical mechanism.', NOW() - interval '20 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'jordan_lit' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '👍', NOW() - interval '19 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'sarah_cinema';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'The Rose Line in Paris running through Saint-Sulpice and the Louvre pyramid... made visiting Paris feel like walking inside a thriller.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'The Rose Line in Paris running through Saint-Sulpice and the Louvre pyramid... made visiting Paris feel like walking inside a thriller.', NOW() - interval '12 hours', FALSE)
            RETURNING id INTO v_msg_id;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'alex_reads';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Say what you want about historical liberties, Dan Brown made millions of people appreciate Renaissance art and medieval cryptology!') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Say what you want about historical liberties, Dan Brown made millions of people appreciate Renaissance art and medieval cryptology!', NOW() - interval '6 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'alex_reads' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '😮', NOW() - interval '5 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

    END IF;
END $$;


-- Custom channels for The Hunger Games

DO $$
DECLARE
    v_club_id bigint;
    v_chan_id bigint;
    v_sender_id bigint;
    v_msg_id bigint;
    v_reaction_user_id bigint;
BEGIN
    SELECT id INTO v_club_id FROM clubs WHERE name ILIKE 'The Hunger Games' LIMIT 1;
    IF v_club_id IS NOT NULL THEN


        -- Channel: panem-politics
        SELECT id INTO v_chan_id FROM channels WHERE club_id = v_club_id AND name = 'panem-politics';
        IF v_chan_id IS NULL THEN
            INSERT INTO channels (club_id, name, type, created_at)
            VALUES (v_club_id, 'panem-politics', 'GENERAL', NOW() - interval '6 days')
            RETURNING id INTO v_chan_id;
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'zoe_novels';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Welcome to #panem-politics. Deep-diving into the sociopolitical architecture of Panem, Capitol propaganda, and Katniss''s role as a symbol.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Welcome to #panem-politics. Deep-diving into the sociopolitical architecture of Panem, Capitol propaganda, and Katniss''s role as a symbol.', NOW() - interval '32 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'zoe_novels' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '🔥', NOW() - interval '31 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'alex_reads';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'What makes Collins'' political writing exceptional is Plutarch Heavensbee. He understands that revolutions require media spectacle just as much as weapons.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'What makes Collins'' political writing exceptional is Plutarch Heavensbee. He understands that revolutions require media spectacle just as much as weapons.', NOW() - interval '25 hours', FALSE)
            RETURNING id INTO v_msg_id;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'chloe_geek';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'President Snow''s white roses masking the scent of blood from his mouth ulcers... the visual metaphor for the Capitol''s perfumed decay is brilliant.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'President Snow''s white roses masking the scent of blood from his mouth ulcers... the visual metaphor for the Capitol''s perfumed decay is brilliant.', NOW() - interval '18 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'chloe_geek' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '👍', NOW() - interval '17 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'elena_v';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'The Roman gladiator parallels (''Panem et Circenses'' = Bread and Circuses) highlight how totalitarian regimes pacify citizens with brutal entertainment.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'The Roman gladiator parallels (''Panem et Circenses'' = Bread and Circuses) highlight how totalitarian regimes pacify citizens with brutal entertainment.', NOW() - interval '10 hours', FALSE)
            RETURNING id INTO v_msg_id;

        END IF;

    END IF;
END $$;


-- Custom channels for Twilight

DO $$
DECLARE
    v_club_id bigint;
    v_chan_id bigint;
    v_sender_id bigint;
    v_msg_id bigint;
    v_reaction_user_id bigint;
BEGIN
    SELECT id INTO v_club_id FROM clubs WHERE name ILIKE 'Twilight' LIMIT 1;
    IF v_club_id IS NOT NULL THEN


        -- Channel: cullen-coven-lore
        SELECT id INTO v_chan_id FROM channels WHERE club_id = v_club_id AND name = 'cullen-coven-lore';
        IF v_chan_id IS NULL THEN
            INSERT INTO channels (club_id, name, type, created_at)
            VALUES (v_club_id, 'cullen-coven-lore', 'GENERAL', NOW() - interval '6 days')
            RETURNING id INTO v_chan_id;
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'zoe_novels';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Welcome to #cullen-coven-lore! Exploring the backstory of Carlisle, Esme, Alice, Jasper, Rosalie, and the Volturi ruling council.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Welcome to #cullen-coven-lore! Exploring the backstory of Carlisle, Esme, Alice, Jasper, Rosalie, and the Volturi ruling council.', NOW() - interval '30 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'zoe_novels' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '🔥', NOW() - interval '29 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'maya_tv';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Carlisle Cullen spending three centuries becoming a physician so he could save human lives without giving into bloodlust is such a wholesome vampire origin.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Carlisle Cullen spending three centuries becoming a physician so he could save human lives without giving into bloodlust is such a wholesome vampire origin.', NOW() - interval '24 hours', FALSE)
            RETURNING id INTO v_msg_id;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'alex_reads';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Jasper Hale''s empathic ability (pathokinesis) to manipulate the emotional temperature of a room made him one of the most subtly powerful characters.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Jasper Hale''s empathic ability (pathokinesis) to manipulate the emotional temperature of a room made him one of the most subtly powerful characters.', NOW() - interval '16 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'alex_reads' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '👍', NOW() - interval '15 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'chloe_geek';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'And Alice''s subjective visions changing depending on decisions made! Her backstory in the asylum was surprisingly dark for YA.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'And Alice''s subjective visions changing depending on decisions made! Her backstory in the asylum was surprisingly dark for YA.', NOW() - interval '8 hours', FALSE)
            RETURNING id INTO v_msg_id;

        END IF;

    END IF;
END $$;


-- Custom channels for The Girl with the Dragon Tattoo

DO $$
DECLARE
    v_club_id bigint;
    v_chan_id bigint;
    v_sender_id bigint;
    v_msg_id bigint;
    v_reaction_user_id bigint;
BEGIN
    SELECT id INTO v_club_id FROM clubs WHERE name ILIKE 'The Girl with the Dragon Tattoo' LIMIT 1;
    IF v_club_id IS NOT NULL THEN


        -- Channel: forensic-investigation
        SELECT id INTO v_chan_id FROM channels WHERE club_id = v_club_id AND name = 'forensic-investigation';
        IF v_chan_id IS NULL THEN
            INSERT INTO channels (club_id, name, type, created_at)
            VALUES (v_club_id, 'forensic-investigation', 'GENERAL', NOW() - interval '6 days')
            RETURNING id INTO v_chan_id;
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'jordan_lit';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Welcome to #forensic-investigation! Dissecting Blomkvist''s detective methodology, biblical verse ciphers, and Larsson''s procedural realism.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Welcome to #forensic-investigation! Dissecting Blomkvist''s detective methodology, biblical verse ciphers, and Larsson''s procedural realism.', NOW() - interval '32 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'jordan_lit' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '🔥', NOW() - interval '31 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'clara_m';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'The breakthrough with the telephone directory and Leviticus verses: matching the names and dates from Harriet''s diary to unsolved murders across Sweden was chilling.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'The breakthrough with the telephone directory and Leviticus verses: matching the names and dates from Harriet''s diary to unsolved murders across Sweden was chilling.', NOW() - interval '25 hours', FALSE)
            RETURNING id INTO v_msg_id;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'david_k';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'And Lisbeth''s forensic computer hacking—using packet sniffers and keyloggers to breach Wennerström''s encrypted accounts. Very authentic for 2005 tech.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'And Lisbeth''s forensic computer hacking—using packet sniffers and keyloggers to breach Wennerström''s encrypted accounts. Very authentic for 2005 tech.', NOW() - interval '18 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'david_k' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '👍', NOW() - interval '17 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'alex_reads';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Stieg Larsson''s background as an anti-extremism journalist gives every scene on Hedeby Island an undeniable aura of authenticity.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Stieg Larsson''s background as an anti-extremism journalist gives every scene on Hedeby Island an undeniable aura of authenticity.', NOW() - interval '10 hours', FALSE)
            RETURNING id INTO v_msg_id;

        END IF;

    END IF;
END $$;


-- Custom channels for The Kite Runner

DO $$
DECLARE
    v_club_id bigint;
    v_chan_id bigint;
    v_sender_id bigint;
    v_msg_id bigint;
    v_reaction_user_id bigint;
BEGIN
    SELECT id INTO v_club_id FROM clubs WHERE name ILIKE 'The Kite Runner' LIMIT 1;
    IF v_club_id IS NOT NULL THEN


        -- Channel: literary-themes-and-symbols
        SELECT id INTO v_chan_id FROM channels WHERE club_id = v_club_id AND name = 'literary-themes-and-symbols';
        IF v_chan_id IS NULL THEN
            INSERT INTO channels (club_id, name, type, created_at)
            VALUES (v_club_id, 'literary-themes-and-symbols', 'GENERAL', NOW() - interval '6 days')
            RETURNING id INTO v_chan_id;
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'alex_reads';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Welcome to #literary-themes-and-symbols. Exploring Khaled Hosseini''s motifs of kites, redemption, brotherhood, and moral reckoning.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Welcome to #literary-themes-and-symbols. Exploring Khaled Hosseini''s motifs of kites, redemption, brotherhood, and moral reckoning.', NOW() - interval '34 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'alex_reads' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '🔥', NOW() - interval '33 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'samir_b';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'The kite fighting tournament isn''t just a childhood sport; it''s the arena where Amir desperately seeks his father''s approval at the expense of his soul.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'The kite fighting tournament isn''t just a childhood sport; it''s the arena where Amir desperately seeks his father''s approval at the expense of his soul.', NOW() - interval '26 hours', FALSE)
            RETURNING id INTO v_msg_id;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'jordan_lit';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'The pomegranate tree where Amir and Hassan carved their names: ''Sultans of Kabul''. When Amir returns years later, the tree is barren, reflecting the lost innocence of their homeland.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'The pomegranate tree where Amir and Hassan carved their names: ''Sultans of Kabul''. When Amir returns years later, the tree is barren, reflecting the lost innocence of their homeland.', NOW() - interval '18 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'jordan_lit' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '👍', NOW() - interval '17 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'elena_v';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'The scar on Amir''s upper lip from Assef''s brass knuckles mirroring Hassan''s cleft lip... redemption through shared suffering. Unforgettable prose.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'The scar on Amir''s upper lip from Assef''s brass knuckles mirroring Hassan''s cleft lip... redemption through shared suffering. Unforgettable prose.', NOW() - interval '10 hours', FALSE)
            RETURNING id INTO v_msg_id;

        END IF;

    END IF;
END $$;


-- Custom channels for Interstellar

DO $$
DECLARE
    v_club_id bigint;
    v_chan_id bigint;
    v_sender_id bigint;
    v_msg_id bigint;
    v_reaction_user_id bigint;
BEGIN
    SELECT id INTO v_club_id FROM clubs WHERE name ILIKE 'Interstellar' LIMIT 1;
    IF v_club_id IS NOT NULL THEN


        -- Channel: physics-and-black-holes
        SELECT id INTO v_chan_id FROM channels WHERE club_id = v_club_id AND name = 'physics-and-black-holes';
        IF v_chan_id IS NULL THEN
            INSERT INTO channels (club_id, name, type, created_at)
            VALUES (v_club_id, 'physics-and-black-holes', 'GENERAL', NOW() - interval '6 days')
            RETURNING id INTO v_chan_id;
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'sarah_cinema';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Welcome to #physics-and-black-holes! Discussing Nobel laureate Kip Thorne''s astrophysics, Gargantua''s gravitational lensing, and time dilation.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Welcome to #physics-and-black-holes! Discussing Nobel laureate Kip Thorne''s astrophysics, Gargantua''s gravitational lensing, and time dilation.', NOW() - interval '28 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'sarah_cinema' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '🔥', NOW() - interval '27 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'leo_films';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'The scene on Miller''s planet where every tick of the watch is 1.4 days on Earth! When they return to the Endurance and Romilly has aged 23 years alone... harrowing.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'The scene on Miller''s planet where every tick of the watch is 1.4 days on Earth! When they return to the Endurance and Romilly has aged 23 years alone... harrowing.', NOW() - interval '20 hours', FALSE)
            RETURNING id INTO v_msg_id;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'david_k';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'The visual model of Gargantua was so accurate that it actually led to two published scientific papers in computational physics. Nolan and Thorne took no shortcuts.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'The visual model of Gargantua was so accurate that it actually led to two published scientific papers in computational physics. Nolan and Thorne took no shortcuts.', NOW() - interval '12 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'david_k' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '👍', NOW() - interval '11 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

    END IF;
END $$;


-- Custom channels for Dune

DO $$
DECLARE
    v_club_id bigint;
    v_chan_id bigint;
    v_sender_id bigint;
    v_msg_id bigint;
    v_reaction_user_id bigint;
BEGIN
    SELECT id INTO v_club_id FROM clubs WHERE name ILIKE 'Dune' LIMIT 1;
    IF v_club_id IS NOT NULL THEN


        -- Channel: arrakis-ecology
        SELECT id INTO v_chan_id FROM channels WHERE club_id = v_club_id AND name = 'arrakis-ecology';
        IF v_chan_id IS NULL THEN
            INSERT INTO channels (club_id, name, type, created_at)
            VALUES (v_club_id, 'arrakis-ecology', 'GENERAL', NOW() - interval '6 days')
            RETURNING id INTO v_chan_id;
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'leo_films';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Welcome to #arrakis-ecology! Discussing stillsuit engineering, desert power, spice melange, and Frank Herbert''s ecological vision.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Welcome to #arrakis-ecology! Discussing stillsuit engineering, desert power, spice melange, and Frank Herbert''s ecological vision.', NOW() - interval '26 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'leo_films' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '🔥', NOW() - interval '25 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'elena_v';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'The concept of ''water discipline'' and mourning tears being described as ''giving water to the dead'' is one of the most culturally profound ideas in all of science fiction.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'The concept of ''water discipline'' and mourning tears being described as ''giving water to the dead'' is one of the most culturally profound ideas in all of science fiction.', NOW() - interval '18 hours', FALSE)
            RETURNING id INTO v_msg_id;

        END IF;

        SELECT id INTO v_sender_id FROM users WHERE username = 'alex_reads';
        IF v_sender_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_chan_id AND content = 'Herbert was originally inspired by the shifting sand dunes of Florence, Oregon. That real ecological concern turned Dune into the foundational environmental sci-fi epic.') THEN
            INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
            VALUES (v_chan_id, v_sender_id, 'Herbert was originally inspired by the shifting sand dunes of Florence, Oregon. That real ecological concern turned Dune into the foundational environmental sci-fi epic.', NOW() - interval '10 hours', FALSE)
            RETURNING id INTO v_msg_id;


            SELECT id INTO v_reaction_user_id FROM users WHERE username IN ('sarah_cinema', 'alex_reads', 'marcus_binge') AND username != 'alex_reads' LIMIT 1;
            IF v_reaction_user_id IS NOT NULL THEN
                INSERT INTO reactions (message_id, user_id, emoji, created_at)
                VALUES (v_msg_id, v_reaction_user_id, '👍', NOW() - interval '9 hours')
                ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
            END IF;

        END IF;

    END IF;
END $$;



-- Update identity sequences
SELECT setval(pg_get_serial_sequence('channels', 'id'), COALESCE(MAX(id), 1)) FROM channels;
SELECT setval(pg_get_serial_sequence('messages', 'id'), COALESCE(MAX(id), 1)) FROM messages;
SELECT setval(pg_get_serial_sequence('reactions', 'id'), COALESCE(MAX(id), 1)) FROM reactions;

COMMIT;