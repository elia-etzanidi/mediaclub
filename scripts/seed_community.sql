-- ================================================================
-- MediaClub Seed Script: Vibrant Community, 15 Clubs, & DMs
-- ================================================================
BEGIN;

-- 1. Insert or update users

INSERT INTO users (username, email, password_hash, avatar_url, status, is_global_admin, dm_notifications_muted, notifications_silenced, last_seen, created_at)
VALUES ('sarah_cinema', 'sarah.cinema@mediaclub.com', '$2a$10$R83ZMvjtyi24A9QhHZfCYu6y9cNizJMivzzwqsDj6pqqRFIOqW9ka', 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahCinema&backgroundColor=b6e3f4', 'ONLINE', FALSE, FALSE, FALSE, NOW() - interval '10 minutes', NOW() - interval '14 days')
ON CONFLICT (username) DO UPDATE SET
  avatar_url = EXCLUDED.avatar_url,
  status = EXCLUDED.status,
  password_hash = EXCLUDED.password_hash;


INSERT INTO users (username, email, password_hash, avatar_url, status, is_global_admin, dm_notifications_muted, notifications_silenced, last_seen, created_at)
VALUES ('alex_reads', 'alex.reads@mediaclub.com', '$2a$10$R83ZMvjtyi24A9QhHZfCYu6y9cNizJMivzzwqsDj6pqqRFIOqW9ka', 'https://api.dicebear.com/7.x/avataaars/svg?seed=AlexReads&backgroundColor=ffd5dc', 'ONLINE', FALSE, FALSE, FALSE, NOW() - interval '10 minutes', NOW() - interval '14 days')
ON CONFLICT (username) DO UPDATE SET
  avatar_url = EXCLUDED.avatar_url,
  status = EXCLUDED.status,
  password_hash = EXCLUDED.password_hash;


INSERT INTO users (username, email, password_hash, avatar_url, status, is_global_admin, dm_notifications_muted, notifications_silenced, last_seen, created_at)
VALUES ('marcus_binge', 'marcus.binge@mediaclub.com', '$2a$10$R83ZMvjtyi24A9QhHZfCYu6y9cNizJMivzzwqsDj6pqqRFIOqW9ka', 'https://api.dicebear.com/7.x/avataaars/svg?seed=MarcusBinge&backgroundColor=d1d4f9', 'ONLINE', FALSE, FALSE, FALSE, NOW() - interval '10 minutes', NOW() - interval '14 days')
ON CONFLICT (username) DO UPDATE SET
  avatar_url = EXCLUDED.avatar_url,
  status = EXCLUDED.status,
  password_hash = EXCLUDED.password_hash;


INSERT INTO users (username, email, password_hash, avatar_url, status, is_global_admin, dm_notifications_muted, notifications_silenced, last_seen, created_at)
VALUES ('elena_v', 'elena.vance@mediaclub.com', '$2a$10$R83ZMvjtyi24A9QhHZfCYu6y9cNizJMivzzwqsDj6pqqRFIOqW9ka', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ElenaVance&backgroundColor=ffdfbf', 'ONLINE', FALSE, FALSE, FALSE, NOW() - interval '10 minutes', NOW() - interval '14 days')
ON CONFLICT (username) DO UPDATE SET
  avatar_url = EXCLUDED.avatar_url,
  status = EXCLUDED.status,
  password_hash = EXCLUDED.password_hash;


INSERT INTO users (username, email, password_hash, avatar_url, status, is_global_admin, dm_notifications_muted, notifications_silenced, last_seen, created_at)
VALUES ('david_k', 'david.kim@mediaclub.com', '$2a$10$R83ZMvjtyi24A9QhHZfCYu6y9cNizJMivzzwqsDj6pqqRFIOqW9ka', 'https://api.dicebear.com/7.x/avataaars/svg?seed=DavidKim&backgroundColor=c0aede', 'ONLINE', FALSE, FALSE, FALSE, NOW() - interval '10 minutes', NOW() - interval '14 days')
ON CONFLICT (username) DO UPDATE SET
  avatar_url = EXCLUDED.avatar_url,
  status = EXCLUDED.status,
  password_hash = EXCLUDED.password_hash;


INSERT INTO users (username, email, password_hash, avatar_url, status, is_global_admin, dm_notifications_muted, notifications_silenced, last_seen, created_at)
VALUES ('maya_tv', 'maya.patel@mediaclub.com', '$2a$10$R83ZMvjtyi24A9QhHZfCYu6y9cNizJMivzzwqsDj6pqqRFIOqW9ka', 'https://api.dicebear.com/7.x/avataaars/svg?seed=MayaPatel&backgroundColor=ffd5dc', 'ONLINE', FALSE, FALSE, FALSE, NOW() - interval '10 minutes', NOW() - interval '14 days')
ON CONFLICT (username) DO UPDATE SET
  avatar_url = EXCLUDED.avatar_url,
  status = EXCLUDED.status,
  password_hash = EXCLUDED.password_hash;


INSERT INTO users (username, email, password_hash, avatar_url, status, is_global_admin, dm_notifications_muted, notifications_silenced, last_seen, created_at)
VALUES ('jordan_lit', 'jordan.reed@mediaclub.com', '$2a$10$R83ZMvjtyi24A9QhHZfCYu6y9cNizJMivzzwqsDj6pqqRFIOqW9ka', 'https://api.dicebear.com/7.x/avataaars/svg?seed=JordanReed&backgroundColor=b6e3f4', 'OFFLINE', FALSE, FALSE, FALSE, NOW() - interval '10 minutes', NOW() - interval '14 days')
ON CONFLICT (username) DO UPDATE SET
  avatar_url = EXCLUDED.avatar_url,
  status = EXCLUDED.status,
  password_hash = EXCLUDED.password_hash;


INSERT INTO users (username, email, password_hash, avatar_url, status, is_global_admin, dm_notifications_muted, notifications_silenced, last_seen, created_at)
VALUES ('chloe_geek', 'chloe.geek@mediaclub.com', '$2a$10$R83ZMvjtyi24A9QhHZfCYu6y9cNizJMivzzwqsDj6pqqRFIOqW9ka', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ChloeGeek&backgroundColor=ffdfbf', 'ONLINE', FALSE, FALSE, FALSE, NOW() - interval '10 minutes', NOW() - interval '14 days')
ON CONFLICT (username) DO UPDATE SET
  avatar_url = EXCLUDED.avatar_url,
  status = EXCLUDED.status,
  password_hash = EXCLUDED.password_hash;


INSERT INTO users (username, email, password_hash, avatar_url, status, is_global_admin, dm_notifications_muted, notifications_silenced, last_seen, created_at)
VALUES ('samir_b', 'samir.b@mediaclub.com', '$2a$10$R83ZMvjtyi24A9QhHZfCYu6y9cNizJMivzzwqsDj6pqqRFIOqW9ka', 'https://api.dicebear.com/7.x/avataaars/svg?seed=SamirBakshi&backgroundColor=c0aede', 'OFFLINE', FALSE, FALSE, FALSE, NOW() - interval '10 minutes', NOW() - interval '14 days')
ON CONFLICT (username) DO UPDATE SET
  avatar_url = EXCLUDED.avatar_url,
  status = EXCLUDED.status,
  password_hash = EXCLUDED.password_hash;


INSERT INTO users (username, email, password_hash, avatar_url, status, is_global_admin, dm_notifications_muted, notifications_silenced, last_seen, created_at)
VALUES ('zoe_novels', 'zoe.novels@mediaclub.com', '$2a$10$R83ZMvjtyi24A9QhHZfCYu6y9cNizJMivzzwqsDj6pqqRFIOqW9ka', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ZoeMiller&backgroundColor=ffd5dc', 'ONLINE', FALSE, FALSE, FALSE, NOW() - interval '10 minutes', NOW() - interval '14 days')
ON CONFLICT (username) DO UPDATE SET
  avatar_url = EXCLUDED.avatar_url,
  status = EXCLUDED.status,
  password_hash = EXCLUDED.password_hash;


INSERT INTO users (username, email, password_hash, avatar_url, status, is_global_admin, dm_notifications_muted, notifications_silenced, last_seen, created_at)
VALUES ('leo_films', 'leo.films@mediaclub.com', '$2a$10$R83ZMvjtyi24A9QhHZfCYu6y9cNizJMivzzwqsDj6pqqRFIOqW9ka', 'https://api.dicebear.com/7.x/avataaars/svg?seed=LeoMoreno&backgroundColor=b6e3f4', 'ONLINE', FALSE, FALSE, FALSE, NOW() - interval '10 minutes', NOW() - interval '14 days')
ON CONFLICT (username) DO UPDATE SET
  avatar_url = EXCLUDED.avatar_url,
  status = EXCLUDED.status,
  password_hash = EXCLUDED.password_hash;


INSERT INTO users (username, email, password_hash, avatar_url, status, is_global_admin, dm_notifications_muted, notifications_silenced, last_seen, created_at)
VALUES ('clara_m', 'clara.moreau@mediaclub.com', '$2a$10$R83ZMvjtyi24A9QhHZfCYu6y9cNizJMivzzwqsDj6pqqRFIOqW9ka', 'https://api.dicebear.com/7.x/avataaars/svg?seed=ClaraMoreau&backgroundColor=ffdfbf', 'OFFLINE', FALSE, FALSE, FALSE, NOW() - interval '10 minutes', NOW() - interval '14 days')
ON CONFLICT (username) DO UPDATE SET
  avatar_url = EXCLUDED.avatar_url,
  status = EXCLUDED.status,
  password_hash = EXCLUDED.password_hash;

-- 2. Insert Clubs, Channels, Memberships, Messages

-- Club: Avatar
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
    SELECT id INTO v_creator_id FROM users WHERE username = 'sarah_cinema';
    SELECT id INTO v_sarah_id FROM users WHERE username = 'sarah_cinema';
    SELECT id INTO v_alex_id FROM users WHERE username = 'alex_reads';
    SELECT id INTO v_marcus_id FROM users WHERE username = 'marcus_binge';

    -- Upsert Club
    SELECT id INTO v_club_id FROM clubs WHERE external_source = 'TMDB' AND external_id = '19995';
    IF v_club_id IS NULL THEN
        INSERT INTO clubs (name, media_type, external_source, external_id, cover_image_url, description, release_date, created_by, created_at)
        VALUES ('Avatar', 'MOVIE', 'TMDB', '19995', 'https://image.tmdb.org/t/p/w500/gKY6q7SjCkAU6FqvqWybDYgUKIF.jpg', 'In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following orders and protecting an alien civilization.', '2009-12-16', v_creator_id, NOW() - interval '7 days')
        RETURNING id INTO v_club_id;
    ELSE
        UPDATE clubs SET
            name = 'Avatar',
            cover_image_url = 'https://image.tmdb.org/t/p/w500/gKY6q7SjCkAU6FqvqWybDYgUKIF.jpg',
            description = 'In the 22nd century, a paraplegic Marine is dispatched to the moon Pandora on a unique mission, but becomes torn between following orders and protecting an alien civilization.',
            release_date = '2009-12-16'
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


    SELECT id INTO v_member_id FROM users WHERE username = 'sarah_cinema';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MODERATOR', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'elena_v';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'leo_films';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'chloe_geek';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'marcus_binge';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'alex_reads';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'sarah_cinema';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_info_chan_id AND content = 'Welcome to the Avatar Club! 🌿 Discuss James Cameron''s groundbreaking sci-fi epics, the bioluminescent wonder of Pandora, Na''vi culture, and cutting-edge 3D VFX technology. Please keep plot discussions about The Way of Water and Fire and Ash in #spoilers!') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_info_chan_id, v_member_id, 'Welcome to the Avatar Club! 🌿 Discuss James Cameron''s groundbreaking sci-fi epics, the bioluminescent wonder of Pandora, Na''vi culture, and cutting-edge 3D VFX technology. Please keep plot discussions about The Way of Water and Fire and Ash in #spoilers!', NOW() - interval '5 days', FALSE);
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'leo_films';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'Rewatched Avatar in 4K HDR last night. It''s astonishing how ahead of its time the CGI was back in 2009. The lighting on Pandora still beats most modern releases.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'Rewatched Avatar in 4K HDR last night. It''s astonishing how ahead of its time the CGI was back in 2009. The lighting on Pandora still beats most modern releases.', NOW() - interval '19 hours', FALSE)
        RETURNING id INTO v_msg_id;


        IF v_sarah_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_sarah_id, '🔥', NOW() - interval '18 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'sarah_cinema';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'Agreed 100%! The attention to detail in the flora and fauna ecosystem is what truly sets it apart. Cameron spent years worldbuilding before even shooting a single frame.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'Agreed 100%! The attention to detail in the flora and fauna ecosystem is what truly sets it apart. Cameron spent years worldbuilding before even shooting a single frame.', NOW() - interval '16 hours', FALSE)
        RETURNING id INTO v_msg_id;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'elena_v';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'The floating Hallelujah Mountains sequence with James Horner''s score always gives me goosebumps. Pure cinematic magic ✨') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'The floating Hallelujah Mountains sequence with James Horner''s score always gives me goosebumps. Pure cinematic magic ✨', NOW() - interval '13 hours', FALSE)
        RETURNING id INTO v_msg_id;


        IF v_sarah_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_sarah_id, '👍', NOW() - interval '12 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'chloe_geek';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'Also the sound design! Every creature vocalization feels organic and terrifying, especially the Thanator chase scene.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'Also the sound design! Every creature vocalization feels organic and terrifying, especially the Thanator chase scene.', NOW() - interval '10 hours', FALSE)
        RETURNING id INTO v_msg_id;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'marcus_binge';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'Gotta admit, as someone who usually prefers dialogue-heavy dramas, Avatar''s world immersion is in a league of its own. Hard not to get sucked into Pandora.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'Gotta admit, as someone who usually prefers dialogue-heavy dramas, Avatar''s world immersion is in a league of its own. Hard not to get sucked into Pandora.', NOW() - interval '7 hours', FALSE)
        RETURNING id INTO v_msg_id;


        IF v_sarah_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_sarah_id, '😮', NOW() - interval '6 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'sarah_cinema';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_spoil_chan_id AND content = 'The battle of the Tree of Souls is such a visceral climax. When Eywa answers Jake''s prayers and the wildlife charges into battle, the theater erupted!') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_spoil_chan_id, v_member_id, 'The battle of the Tree of Souls is such a visceral climax. When Eywa answers Jake''s prayers and the wildlife charges into battle, the theater erupted!', NOW() - interval '14 hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_alex_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_alex_id, '😮', NOW() - interval '13 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'leo_films';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_spoil_chan_id AND content = 'Quaritch survived in recombinant form in the sequels which was such an interesting storytelling direction. His dynamic with Spider adds so much moral ambiguity.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_spoil_chan_id, v_member_id, 'Quaritch survived in recombinant form in the sequels which was such an interesting storytelling direction. His dynamic with Spider adds so much moral ambiguity.', NOW() - interval '10 hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_alex_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_alex_id, '😮', NOW() - interval '9 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'elena_v';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_req_chan_id AND content = 'Can we do a club watch party for the Extended Collector''s Edition? The opening scenes set in dystopian Earth add so much context to Jake''s motivations!') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_req_chan_id, v_member_id, 'Can we do a club watch party for the Extended Collector''s Edition? The opening scenes set in dystopian Earth add so much context to Jake''s motivations!', NOW() - interval '12 hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_marcus_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_marcus_id, '👍', NOW() - interval '11 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;

END $$;


-- Club: Avengers: Endgame
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
    SELECT id INTO v_creator_id FROM users WHERE username = 'chloe_geek';
    SELECT id INTO v_sarah_id FROM users WHERE username = 'sarah_cinema';
    SELECT id INTO v_alex_id FROM users WHERE username = 'alex_reads';
    SELECT id INTO v_marcus_id FROM users WHERE username = 'marcus_binge';

    -- Upsert Club
    SELECT id INTO v_club_id FROM clubs WHERE external_source = 'TMDB' AND external_id = '299534';
    IF v_club_id IS NULL THEN
        INSERT INTO clubs (name, media_type, external_source, external_id, cover_image_url, description, release_date, created_by, created_at)
        VALUES ('Avengers: Endgame', 'MOVIE', 'TMDB', '299534', 'https://image.tmdb.org/t/p/w500/jtDv3lCnST0fZRvdYFwR5CVwK2x.jpg', 'After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more to undo Thanos'' actions.', '2019-04-24', v_creator_id, NOW() - interval '7 days')
        RETURNING id INTO v_club_id;
    ELSE
        UPDATE clubs SET
            name = 'Avengers: Endgame',
            cover_image_url = 'https://image.tmdb.org/t/p/w500/jtDv3lCnST0fZRvdYFwR5CVwK2x.jpg',
            description = 'After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more to undo Thanos'' actions.',
            release_date = '2019-04-24'
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


    SELECT id INTO v_member_id FROM users WHERE username = 'chloe_geek';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MODERATOR', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'sarah_cinema';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'leo_films';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'david_k';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'marcus_binge';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'elena_v';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'chloe_geek';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_info_chan_id AND content = 'Whatever it takes. 🛡️ Welcome to the Avengers: Endgame Club! Discuss the culmination of 22 films, character arcs, the time heist, and the legacy of the original six Avengers. Spoilers permitted in #spoilers!') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_info_chan_id, v_member_id, 'Whatever it takes. 🛡️ Welcome to the Avengers: Endgame Club! Discuss the culmination of 22 films, character arcs, the time heist, and the legacy of the original six Avengers. Spoilers permitted in #spoilers!', NOW() - interval '5 days', FALSE);
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'chloe_geek';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'Five years later, nothing has ever matched opening night for Endgame in a packed cinema. The collective energy was unbelievable.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'Five years later, nothing has ever matched opening night for Endgame in a packed cinema. The collective energy was unbelievable.', NOW() - interval '19 hours', FALSE)
        RETURNING id INTO v_msg_id;


        IF v_sarah_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_sarah_id, '🔥', NOW() - interval '18 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'sarah_cinema';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'The pacing of that 3-hour runtime is miraculous. The first hour of quiet grief and depression grounds the stakes before the high-octane time heist.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'The pacing of that 3-hour runtime is miraculous. The first hour of quiet grief and depression grounds the stakes before the high-octane time heist.', NOW() - interval '16 hours', FALSE)
        RETURNING id INTO v_msg_id;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'leo_films';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'Alan Silvestri''s ''Portals'' score is timeless. That solitary horn building into the full brass orchestra when the first portal opens behind Cap... absolute cinema.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'Alan Silvestri''s ''Portals'' score is timeless. That solitary horn building into the full brass orchestra when the first portal opens behind Cap... absolute cinema.', NOW() - interval '13 hours', FALSE)
        RETURNING id INTO v_msg_id;


        IF v_sarah_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_sarah_id, '👍', NOW() - interval '12 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'david_k';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'Robert Downey Jr.''s acting in the opening scene with Nebula, and then confronting Steve back on Earth, deserved award nominations. So raw.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'Robert Downey Jr.''s acting in the opening scene with Nebula, and then confronting Steve back on Earth, deserved award nominations. So raw.', NOW() - interval '10 hours', FALSE)
        RETURNING id INTO v_msg_id;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'marcus_binge';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'Endgame proved that long-form cinematic universes can actually stick the landing when the emotional core of the characters is respected.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'Endgame proved that long-form cinematic universes can actually stick the landing when the emotional core of the characters is respected.', NOW() - interval '7 hours', FALSE)
        RETURNING id INTO v_msg_id;


        IF v_sarah_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_sarah_id, '😮', NOW() - interval '6 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'chloe_geek';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_spoil_chan_id AND content = 'Cap picking up Mjolnir is the greatest crowd reaction in movie history. Period. The smirk from Thor: ''I knew it!'' ⚡') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_spoil_chan_id, v_member_id, 'Cap picking up Mjolnir is the greatest crowd reaction in movie history. Period. The smirk from Thor: ''I knew it!'' ⚡', NOW() - interval '18 hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_alex_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_alex_id, '😮', NOW() - interval '17 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'sarah_cinema';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_spoil_chan_id AND content = 'Tony''s snap: ''And I... am... Iron Man.'' Perfectly bringing his entire 11-year journey full circle from the 2008 press conference. Tears every time.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_spoil_chan_id, v_member_id, 'Tony''s snap: ''And I... am... Iron Man.'' Perfectly bringing his entire 11-year journey full circle from the 2008 press conference. Tears every time.', NOW() - interval '14 hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_alex_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_alex_id, '😮', NOW() - interval '13 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'leo_films';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_spoil_chan_id AND content = 'The final dance between Steve and Peggy at the end was such a bittersweet, earned conclusion to his arc.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_spoil_chan_id, v_member_id, 'The final dance between Steve and Peggy at the end was such a bittersweet, earned conclusion to his arc.', NOW() - interval '10 hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_alex_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_alex_id, '😮', NOW() - interval '9 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'david_k';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_req_chan_id AND content = 'Who''s down for a full Infinity Saga marathon over the holidays? We could sync up Infinity War and Endgame back-to-back!') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_req_chan_id, v_member_id, 'Who''s down for a full Infinity Saga marathon over the holidays? We could sync up Infinity War and Endgame back-to-back!', NOW() - interval '12 hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_marcus_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_marcus_id, '👍', NOW() - interval '11 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;

END $$;


-- Club: The Lord of the Rings: The Return of the King
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
    SELECT id INTO v_creator_id FROM users WHERE username = 'sarah_cinema';
    SELECT id INTO v_sarah_id FROM users WHERE username = 'sarah_cinema';
    SELECT id INTO v_alex_id FROM users WHERE username = 'alex_reads';
    SELECT id INTO v_marcus_id FROM users WHERE username = 'marcus_binge';

    -- Upsert Club
    SELECT id INTO v_club_id FROM clubs WHERE external_source = 'TMDB' AND external_id = '122';
    IF v_club_id IS NULL THEN
        INSERT INTO clubs (name, media_type, external_source, external_id, cover_image_url, description, release_date, created_by, created_at)
        VALUES ('The Lord of the Rings: The Return of the King', 'MOVIE', 'TMDB', '122', 'https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg', 'As armies mass for a final battle that will decide the fate of the world, one member of the Fellowship is revealed as the noble heir to the throne of Men, while Frodo and Sam venture into Mordor.', '2003-12-17', v_creator_id, NOW() - interval '7 days')
        RETURNING id INTO v_club_id;
    ELSE
        UPDATE clubs SET
            name = 'The Lord of the Rings: The Return of the King',
            cover_image_url = 'https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg',
            description = 'As armies mass for a final battle that will decide the fate of the world, one member of the Fellowship is revealed as the noble heir to the throne of Men, while Frodo and Sam venture into Mordor.',
            release_date = '2003-12-17'
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


    SELECT id INTO v_member_id FROM users WHERE username = 'sarah_cinema';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MODERATOR', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'alex_reads';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'samir_b';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'leo_films';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'elena_v';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'marcus_binge';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'david_k';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'sarah_cinema';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_info_chan_id AND content = '👑 ''There is some good in this world, and it''s worth fighting for.'' Welcome to the Return of the King Club! Celebrating Peter Jackson''s 11-Oscar-winning masterpiece and Tolkien''s eternal mythology.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_info_chan_id, v_member_id, '👑 ''There is some good in this world, and it''s worth fighting for.'' Welcome to the Return of the King Club! Celebrating Peter Jackson''s 11-Oscar-winning masterpiece and Tolkien''s eternal mythology.', NOW() - interval '5 days', FALSE);
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'sarah_cinema';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'The Ride of the Rohirrim at Pelennor Fields remains the greatest cinematic charge ever filmed. The horns of Rohan, Théoden''s speech, the violin crescendo... perfection.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'The Ride of the Rohirrim at Pelennor Fields remains the greatest cinematic charge ever filmed. The horns of Rohan, Théoden''s speech, the violin crescendo... perfection.', NOW() - interval '19 hours', FALSE)
        RETURNING id INTO v_msg_id;


        IF v_sarah_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_sarah_id, '🔥', NOW() - interval '18 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'alex_reads';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'As someone who re-reads the books every year, Bernard Hill''s delivery of ''Death! Ride to ruin and the world''s ending!'' captures Tolkien''s prose better than anything else.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'As someone who re-reads the books every year, Bernard Hill''s delivery of ''Death! Ride to ruin and the world''s ending!'' captures Tolkien''s prose better than anything else.', NOW() - interval '16 hours', FALSE)
        RETURNING id INTO v_msg_id;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'samir_b';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'And Howard Shore''s soundtrack is simply unmatched in film history. The Lighting of the Beacons suite is pure orchestral triumph.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'And Howard Shore''s soundtrack is simply unmatched in film history. The Lighting of the Beacons suite is pure orchestral triumph.', NOW() - interval '13 hours', FALSE)
        RETURNING id INTO v_msg_id;


        IF v_sarah_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_sarah_id, '👍', NOW() - interval '12 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'leo_films';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'The practical miniatures (big-atures) of Minas Tirith and practical armor give this movie a texture and weight CGI still struggles to replicate.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'The practical miniatures (big-atures) of Minas Tirith and practical armor give this movie a texture and weight CGI still struggles to replicate.', NOW() - interval '10 hours', FALSE)
        RETURNING id INTO v_msg_id;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'marcus_binge';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'I''ll never understand people who complain about the multiple endings. After 12 hours across the trilogy, every single character deserved their proper farewell.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'I''ll never understand people who complain about the multiple endings. After 12 hours across the trilogy, every single character deserved their proper farewell.', NOW() - interval '7 hours', FALSE)
        RETURNING id INTO v_msg_id;


        IF v_sarah_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_sarah_id, '😮', NOW() - interval '6 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'alex_reads';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_spoil_chan_id AND content = '''I can''t carry it for you, but I can carry you!'' Samwise Gamgee is the true hero of Middle-earth. Sean Astin gave the performance of a lifetime on Mount Doom.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_spoil_chan_id, v_member_id, '''I can''t carry it for you, but I can carry you!'' Samwise Gamgee is the true hero of Middle-earth. Sean Astin gave the performance of a lifetime on Mount Doom.', NOW() - interval '18 hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_alex_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_alex_id, '😮', NOW() - interval '17 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'sarah_cinema';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_spoil_chan_id AND content = 'Aragorn''s coronation: ''My friends, you bow to no one.'' And the entire court of Gondor kneeling to the four hobbits. Waterworks every single time 😭') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_spoil_chan_id, v_member_id, 'Aragorn''s coronation: ''My friends, you bow to no one.'' And the entire court of Gondor kneeling to the four hobbits. Waterworks every single time 😭', NOW() - interval '14 hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_alex_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_alex_id, '😮', NOW() - interval '13 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'samir_b';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_spoil_chan_id AND content = 'The Grey Havens farewell broke my heart. The tragedy of Frodo being too wounded by the Ring to truly live in the Shire again is so poignant.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_spoil_chan_id, v_member_id, 'The Grey Havens farewell broke my heart. The tragedy of Frodo being too wounded by the Ring to truly live in the Shire again is so poignant.', NOW() - interval '10 hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_alex_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_alex_id, '😮', NOW() - interval '9 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'alex_reads';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_req_chan_id AND content = 'Let''s organize a detailed comparison thread between the book and the extended cut scenes—especially the Houses of Healing and the confrontation at the Black Gate!') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_req_chan_id, v_member_id, 'Let''s organize a detailed comparison thread between the book and the extended cut scenes—especially the Houses of Healing and the confrontation at the Black Gate!', NOW() - interval '12 hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_marcus_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_marcus_id, '👍', NOW() - interval '11 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;

END $$;


-- Club: The Dark Knight
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
    SELECT id INTO v_creator_id FROM users WHERE username = 'david_k';
    SELECT id INTO v_sarah_id FROM users WHERE username = 'sarah_cinema';
    SELECT id INTO v_alex_id FROM users WHERE username = 'alex_reads';
    SELECT id INTO v_marcus_id FROM users WHERE username = 'marcus_binge';

    -- Upsert Club
    SELECT id INTO v_club_id FROM clubs WHERE external_source = 'TMDB' AND external_id = '155';
    IF v_club_id IS NULL THEN
        INSERT INTO clubs (name, media_type, external_source, external_id, cover_image_url, description, release_date, created_by, created_at)
        VALUES ('The Dark Knight', 'MOVIE', 'TMDB', '155', 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg', 'Batman raises the stakes in his war on crime with the help of Lt. Jim Gordon and DA Harvey Dent, but they soon find themselves prey to a reign of chaos unleashed by the Joker.', '2008-07-16', v_creator_id, NOW() - interval '7 days')
        RETURNING id INTO v_club_id;
    ELSE
        UPDATE clubs SET
            name = 'The Dark Knight',
            cover_image_url = 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
            description = 'Batman raises the stakes in his war on crime with the help of Lt. Jim Gordon and DA Harvey Dent, but they soon find themselves prey to a reign of chaos unleashed by the Joker.',
            release_date = '2008-07-16'
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


    SELECT id INTO v_member_id FROM users WHERE username = 'david_k';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MODERATOR', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'sarah_cinema';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'marcus_binge';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'leo_films';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'chloe_geek';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'samir_b';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'david_k';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_info_chan_id AND content = '🦇 ''Why so serious?'' Welcome to The Dark Knight Club. A space for analyzing Christopher Nolan''s neo-noir masterpiece, Heath Ledger''s legendary Joker, Hans Zimmer''s score, and the philosophy of Gotham.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_info_chan_id, v_member_id, '🦇 ''Why so serious?'' Welcome to The Dark Knight Club. A space for analyzing Christopher Nolan''s neo-noir masterpiece, Heath Ledger''s legendary Joker, Hans Zimmer''s score, and the philosophy of Gotham.', NOW() - interval '5 days', FALSE);
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'david_k';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'Heath Ledger''s Joker isn''t just a comic book villain; it''s a study in philosophical anarchism. He doesn''t want money or power—he wants to break society''s moral illusion.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'Heath Ledger''s Joker isn''t just a comic book villain; it''s a study in philosophical anarchism. He doesn''t want money or power—he wants to break society''s moral illusion.', NOW() - interval '19 hours', FALSE)
        RETURNING id INTO v_msg_id;


        IF v_sarah_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_sarah_id, '🔥', NOW() - interval '18 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'sarah_cinema';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'The bank heist prologue shot on IMAX cameras set an entirely new standard for blockbuster filmmaking. Nolan''s insistence on in-camera practical effects makes it feel so grounded.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'The bank heist prologue shot on IMAX cameras set an entirely new standard for blockbuster filmmaking. Nolan''s insistence on in-camera practical effects makes it feel so grounded.', NOW() - interval '16 hours', FALSE)
        RETURNING id INTO v_msg_id;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'marcus_binge';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'The interrogation room scene between Batman and Joker is peak cinema writing. The lighting, the punches having zero psychological effect on Joker... iconic.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'The interrogation room scene between Batman and Joker is peak cinema writing. The lighting, the punches having zero psychological effect on Joker... iconic.', NOW() - interval '13 hours', FALSE)
        RETURNING id INTO v_msg_id;


        IF v_sarah_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_sarah_id, '👍', NOW() - interval '12 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'leo_films';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'Wally Pfister''s cinematography and Zimmer''s rising two-note Joker motif create such intense, claustrophobic dread.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'Wally Pfister''s cinematography and Zimmer''s rising two-note Joker motif create such intense, claustrophobic dread.', NOW() - interval '10 hours', FALSE)
        RETURNING id INTO v_msg_id;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'chloe_geek';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'Aaron Eckhart''s Harvey Dent is so tragic too. The tragedy of ''You either die a hero, or you live long enough to see yourself become the villain.''') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'Aaron Eckhart''s Harvey Dent is so tragic too. The tragedy of ''You either die a hero, or you live long enough to see yourself become the villain.''', NOW() - interval '7 hours', FALSE)
        RETURNING id INTO v_msg_id;


        IF v_sarah_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_sarah_id, '😮', NOW() - interval '6 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'david_k';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_spoil_chan_id AND content = 'The two ferry experiment is the philosophical heart of the movie. Joker expected Gotham to tear itself apart, and the prisoners throwing away the detonator proved him wrong.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_spoil_chan_id, v_member_id, 'The two ferry experiment is the philosophical heart of the movie. Joker expected Gotham to tear itself apart, and the prisoners throwing away the detonator proved him wrong.', NOW() - interval '14 hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_alex_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_alex_id, '😮', NOW() - interval '13 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'sarah_cinema';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_spoil_chan_id AND content = 'The closing monologue by Gordon: ''He''s a silent guardian, a watchful protector... a Dark Knight.'' Gives me chills every time the Batman theme drops!') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_spoil_chan_id, v_member_id, 'The closing monologue by Gordon: ''He''s a silent guardian, a watchful protector... a Dark Knight.'' Gives me chills every time the Batman theme drops!', NOW() - interval '10 hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_alex_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_alex_id, '😮', NOW() - interval '9 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'leo_films';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_req_chan_id AND content = 'Can we do a screenplay breakdown of Jonathan & Christopher Nolan''s three-act structure for this? It''s taught in film schools for a reason.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_req_chan_id, v_member_id, 'Can we do a screenplay breakdown of Jonathan & Christopher Nolan''s three-act structure for this? It''s taught in film schools for a reason.', NOW() - interval '12 hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_marcus_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_marcus_id, '👍', NOW() - interval '11 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;

END $$;


-- Club: Harry Potter and the Sorcerer's Stone
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
    SELECT id INTO v_creator_id FROM users WHERE username = 'zoe_novels';
    SELECT id INTO v_sarah_id FROM users WHERE username = 'sarah_cinema';
    SELECT id INTO v_alex_id FROM users WHERE username = 'alex_reads';
    SELECT id INTO v_marcus_id FROM users WHERE username = 'marcus_binge';

    -- Upsert Club
    SELECT id INTO v_club_id FROM clubs WHERE external_source = 'TMDB' AND external_id = '671';
    IF v_club_id IS NULL THEN
        INSERT INTO clubs (name, media_type, external_source, external_id, cover_image_url, description, release_date, created_by, created_at)
        VALUES ('Harry Potter and the Sorcerer''s Stone', 'MOVIE', 'TMDB', '671', 'https://image.tmdb.org/t/p/w500/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg', 'Harry Potter discovers on his 11th birthday that he is the orphaned son of two powerful wizards and possesses unique magical powers of his own, inviting him to attend Hogwarts.', '2001-11-16', v_creator_id, NOW() - interval '7 days')
        RETURNING id INTO v_club_id;
    ELSE
        UPDATE clubs SET
            name = 'Harry Potter and the Sorcerer''s Stone',
            cover_image_url = 'https://image.tmdb.org/t/p/w500/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg',
            description = 'Harry Potter discovers on his 11th birthday that he is the orphaned son of two powerful wizards and possesses unique magical powers of his own, inviting him to attend Hogwarts.',
            release_date = '2001-11-16'
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


    SELECT id INTO v_member_id FROM users WHERE username = 'zoe_novels';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MODERATOR', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'alex_reads';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'chloe_geek';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'sarah_cinema';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'david_k';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'elena_v';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'zoe_novels';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_info_chan_id AND content = '⚡ Welcome to the Harry Potter Club! From the Great Hall to Diagon Alley, celebrate the film that introduced generations to the Wizarding World. Warm butterbeers for everyone!') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_info_chan_id, v_member_id, '⚡ Welcome to the Harry Potter Club! From the Great Hall to Diagon Alley, celebrate the film that introduced generations to the Wizarding World. Warm butterbeers for everyone!', NOW() - interval '5 days', FALSE);
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'zoe_novels';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'The sheer warmth and comfort of Chris Columbus''s direction in this first film is untouchable. John Williams'' ''Hedwig''s Theme'' is pure nostalgia.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'The sheer warmth and comfort of Chris Columbus''s direction in this first film is untouchable. John Williams'' ''Hedwig''s Theme'' is pure nostalgia.', NOW() - interval '16 hours', FALSE)
        RETURNING id INTO v_msg_id;


        IF v_sarah_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_sarah_id, '🔥', NOW() - interval '15 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'alex_reads';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'Stuart Craig''s production design for the Great Hall, Diagon Alley, and the Gryffindor common room basically shaped how the entire world envisions fantasy schools.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'Stuart Craig''s production design for the Great Hall, Diagon Alley, and the Gryffindor common room basically shaped how the entire world envisions fantasy schools.', NOW() - interval '13 hours', FALSE)
        RETURNING id INTO v_msg_id;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'chloe_geek';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'Maggie Smith as Professor McGonagall and Alan Rickman as Snape were the most casting-accurate choices in movie history.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'Maggie Smith as Professor McGonagall and Alan Rickman as Snape were the most casting-accurate choices in movie history.', NOW() - interval '10 hours', FALSE)
        RETURNING id INTO v_msg_id;


        IF v_sarah_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_sarah_id, '👍', NOW() - interval '9 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'sarah_cinema';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'The scene where Harry first buys his wand at Ollivanders: ''The wand chooses the wizard, Mr. Potter.'' That sense of childlike wonder is magical.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'The scene where Harry first buys his wand at Ollivanders: ''The wand chooses the wizard, Mr. Potter.'' That sense of childlike wonder is magical.', NOW() - interval '7 hours', FALSE)
        RETURNING id INTO v_msg_id;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'zoe_novels';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_spoil_chan_id AND content = 'The Wizard''s Chess sequence where Ron sacrifices himself so Harry and Hermione can go forward! ''Not me, not Hermione... you!'' What a moment of bravery.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_spoil_chan_id, v_member_id, 'The Wizard''s Chess sequence where Ron sacrifices himself so Harry and Hermione can go forward! ''Not me, not Hermione... you!'' What a moment of bravery.', NOW() - interval '14 hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_alex_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_alex_id, '😮', NOW() - interval '13 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'alex_reads';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_spoil_chan_id AND content = 'The mirror of Erised scenes still hurt. Seeing Harry staring at his parents in the reflection broke my heart as a kid and still does now.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_spoil_chan_id, v_member_id, 'The mirror of Erised scenes still hurt. Seeing Harry staring at his parents in the reflection broke my heart as a kid and still does now.', NOW() - interval '10 hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_alex_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_alex_id, '😮', NOW() - interval '9 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'chloe_geek';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_req_chan_id AND content = 'Let''s do a Wizarding World trivia night in the club this weekend! House points on the line 🦁🦅🦡🐍') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_req_chan_id, v_member_id, 'Let''s do a Wizarding World trivia night in the club this weekend! House points on the line 🦁🦅🦡🐍', NOW() - interval '12 hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_marcus_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_marcus_id, '👍', NOW() - interval '11 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;

END $$;


-- Club: Game of Thrones
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
    SELECT id INTO v_creator_id FROM users WHERE username = 'marcus_binge';
    SELECT id INTO v_sarah_id FROM users WHERE username = 'sarah_cinema';
    SELECT id INTO v_alex_id FROM users WHERE username = 'alex_reads';
    SELECT id INTO v_marcus_id FROM users WHERE username = 'marcus_binge';

    -- Upsert Club
    SELECT id INTO v_club_id FROM clubs WHERE external_source = 'TMDB' AND external_id = '1399';
    IF v_club_id IS NULL THEN
        INSERT INTO clubs (name, media_type, external_source, external_id, cover_image_url, description, release_date, created_by, created_at)
        VALUES ('Game of Thrones', 'SHOW', 'TMDB', '1399', 'https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg', 'Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war while an ancient evil awakens in the farthest north.', '2011-04-17', v_creator_id, NOW() - interval '7 days')
        RETURNING id INTO v_club_id;
    ELSE
        UPDATE clubs SET
            name = 'Game of Thrones',
            cover_image_url = 'https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg',
            description = 'Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war while an ancient evil awakens in the farthest north.',
            release_date = '2011-04-17'
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


    SELECT id INTO v_member_id FROM users WHERE username = 'marcus_binge';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MODERATOR', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'alex_reads';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'clara_m';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'samir_b';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'david_k';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'sarah_cinema';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'marcus_binge';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_info_chan_id AND content = '🗡️ ''When you play the game of thrones, you win or you die.'' Welcome to the Westeros hub! We discuss seasons 1-8, lore, character arcs, theories, and George R.R. Martin''s universe.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_info_chan_id, v_member_id, '🗡️ ''When you play the game of thrones, you win or you die.'' Welcome to the Westeros hub! We discuss seasons 1-8, lore, character arcs, theories, and George R.R. Martin''s universe.', NOW() - interval '5 days', FALSE);
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'marcus_binge';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'Seasons 1 through 4 of Game of Thrones are perhaps the greatest run of television drama ever produced. The political dialogue between Tyrion, Tywin, Varys, and Littlefinger is untouchable.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'Seasons 1 through 4 of Game of Thrones are perhaps the greatest run of television drama ever produced. The political dialogue between Tyrion, Tywin, Varys, and Littlefinger is untouchable.', NOW() - interval '16 hours', FALSE)
        RETURNING id INTO v_msg_id;


        IF v_sarah_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_sarah_id, '🔥', NOW() - interval '15 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'alex_reads';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'Peter Dinklage''s trial speech in Season 4 Episode 6: ''I did not do it. I did not kill Joffrey, but I wish that I had!'' Charles Dance and Dinklage sharing the screen was masterclass acting.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'Peter Dinklage''s trial speech in Season 4 Episode 6: ''I did not do it. I did not kill Joffrey, but I wish that I had!'' Charles Dance and Dinklage sharing the screen was masterclass acting.', NOW() - interval '13 hours', FALSE)
        RETURNING id INTO v_msg_id;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'clara_m';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'And Ramin Djawadi''s score! ''Light of the Seven'' during the Sept of Baelor sequence created more tension with just piano and cello than any action sequence could.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'And Ramin Djawadi''s score! ''Light of the Seven'' during the Sept of Baelor sequence created more tension with just piano and cello than any action sequence could.', NOW() - interval '10 hours', FALSE)
        RETURNING id INTO v_msg_id;


        IF v_sarah_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_sarah_id, '👍', NOW() - interval '9 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'samir_b';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'The Battle of the Bastards and Hardhome showed scale on television that rivaled $200M Hollywood blockbusters.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'The Battle of the Bastards and Hardhome showed scale on television that rivaled $200M Hollywood blockbusters.', NOW() - interval '7 hours', FALSE)
        RETURNING id INTO v_msg_id;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'marcus_binge';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_spoil_chan_id AND content = 'The Red Wedding was the ultimate cultural shockwave. No show before or since had the audacity to wipe out the main heroic bloodline in five minutes of sheer tragedy.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_spoil_chan_id, v_member_id, 'The Red Wedding was the ultimate cultural shockwave. No show before or since had the audacity to wipe out the main heroic bloodline in five minutes of sheer tragedy.', NOW() - interval '14 hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_alex_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_alex_id, '😮', NOW() - interval '13 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'clara_m';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_spoil_chan_id AND content = 'Ned Stark''s execution in Baelor set the rule: no one is safe with plot armor. That''s what made the early seasons feel so high-stakes.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_spoil_chan_id, v_member_id, 'Ned Stark''s execution in Baelor set the rule: no one is safe with plot armor. That''s what made the early seasons feel so high-stakes.', NOW() - interval '10 hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_alex_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_alex_id, '😮', NOW() - interval '9 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'alex_reads';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_req_chan_id AND content = 'Let''s do a character bracket tournament: who was the best tactical player of the game? Tywin vs Olenna Tyrell would be an insane matchup!') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_req_chan_id, v_member_id, 'Let''s do a character bracket tournament: who was the best tactical player of the game? Tywin vs Olenna Tyrell would be an insane matchup!', NOW() - interval '12 hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_marcus_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_marcus_id, '👍', NOW() - interval '11 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;

END $$;


-- Club: Breaking Bad
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
    SELECT id INTO v_creator_id FROM users WHERE username = 'marcus_binge';
    SELECT id INTO v_sarah_id FROM users WHERE username = 'sarah_cinema';
    SELECT id INTO v_alex_id FROM users WHERE username = 'alex_reads';
    SELECT id INTO v_marcus_id FROM users WHERE username = 'marcus_binge';

    -- Upsert Club
    SELECT id INTO v_club_id FROM clubs WHERE external_source = 'TMDB' AND external_id = '1396';
    IF v_club_id IS NULL THEN
        INSERT INTO clubs (name, media_type, external_source, external_id, cover_image_url, description, release_date, created_by, created_at)
        VALUES ('Breaking Bad', 'SHOW', 'TMDB', '1396', 'https://image.tmdb.org/t/p/w500/anFx9aTOOYqgS3v7x3R84Kz67ly.jpg', 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family''s future.', '2008-01-20', v_creator_id, NOW() - interval '7 days')
        RETURNING id INTO v_club_id;
    ELSE
        UPDATE clubs SET
            name = 'Breaking Bad',
            cover_image_url = 'https://image.tmdb.org/t/p/w500/anFx9aTOOYqgS3v7x3R84Kz67ly.jpg',
            description = 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family''s future.',
            release_date = '2008-01-20'
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


    SELECT id INTO v_member_id FROM users WHERE username = 'marcus_binge';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MODERATOR', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'david_k';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'maya_tv';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'samir_b';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'sarah_cinema';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'chloe_geek';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'marcus_binge';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_info_chan_id AND content = '⚗️ ''I am the one who knocks.'' Welcome to the Breaking Bad Club! Dissecting Vince Gilligan''s peerless transformation of Mr. Chips into Scarface. Tread lightly.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_info_chan_id, v_member_id, '⚗️ ''I am the one who knocks.'' Welcome to the Breaking Bad Club! Dissecting Vince Gilligan''s peerless transformation of Mr. Chips into Scarface. Tread lightly.', NOW() - interval '5 days', FALSE);
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'marcus_binge';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'The consistency of Breaking Bad is unmatched. 62 episodes, zero filler, escalating tension that never drops the ball from the pilot to ''Felina''.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'The consistency of Breaking Bad is unmatched. 62 episodes, zero filler, escalating tension that never drops the ball from the pilot to ''Felina''.', NOW() - interval '16 hours', FALSE)
        RETURNING id INTO v_msg_id;


        IF v_sarah_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_sarah_id, '🔥', NOW() - interval '15 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'david_k';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'Bryan Cranston and Aaron Paul had lightning-in-a-bottle chemistry. The tragedy of Jesse Pinkman being manipulated by Walter is the emotional heart of the series.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'Bryan Cranston and Aaron Paul had lightning-in-a-bottle chemistry. The tragedy of Jesse Pinkman being manipulated by Walter is the emotional heart of the series.', NOW() - interval '13 hours', FALSE)
        RETURNING id INTO v_msg_id;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'maya_tv';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'Giancarlo Esposito as Gus Fring redefined the calm, calculated villain archetype. Straightening his tie until his final breath.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'Giancarlo Esposito as Gus Fring redefined the calm, calculated villain archetype. Straightening his tie until his final breath.', NOW() - interval '10 hours', FALSE)
        RETURNING id INTO v_msg_id;


        IF v_sarah_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_sarah_id, '👍', NOW() - interval '9 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'samir_b';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'Also the visual storytelling! Color palettes representing morality, the POV camera angles, the use of timelapse in the New Mexico desert... cinematic brilliance.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'Also the visual storytelling! Color palettes representing morality, the POV camera angles, the use of timelapse in the New Mexico desert... cinematic brilliance.', NOW() - interval '7 hours', FALSE)
        RETURNING id INTO v_msg_id;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'marcus_binge';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_spoil_chan_id AND content = '''Ozymandias'' (5x14) is quite literally the highest rated episode of television in history, and it earned every fraction of that praise. Hank in the desert, the knife fight, the phone call.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_spoil_chan_id, v_member_id, '''Ozymandias'' (5x14) is quite literally the highest rated episode of television in history, and it earned every fraction of that praise. Hank in the desert, the knife fight, the phone call.', NOW() - interval '14 hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_alex_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_alex_id, '😮', NOW() - interval '13 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'david_k';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_spoil_chan_id AND content = 'Walt''s confession to Skyler in the finale: ''I did it for me. I liked it. I was good at it. And I was really... I was alive.'' The absolute honesty after seasons of lying.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_spoil_chan_id, v_member_id, 'Walt''s confession to Skyler in the finale: ''I did it for me. I liked it. I was good at it. And I was really... I was alive.'' The absolute honesty after seasons of lying.', NOW() - interval '10 hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_alex_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_alex_id, '😮', NOW() - interval '9 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'maya_tv';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_req_chan_id AND content = 'Can we do a Better Call Saul comparison thread next? The Jimmy/Kim Wexler dynamic rivals Walt/Jesse in emotional complexity!') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_req_chan_id, v_member_id, 'Can we do a Better Call Saul comparison thread next? The Jimmy/Kim Wexler dynamic rivals Walt/Jesse in emotional complexity!', NOW() - interval '12 hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_marcus_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_marcus_id, '👍', NOW() - interval '11 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;

END $$;


-- Club: The Office (US)
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
    SELECT id INTO v_creator_id FROM users WHERE username = 'maya_tv';
    SELECT id INTO v_sarah_id FROM users WHERE username = 'sarah_cinema';
    SELECT id INTO v_alex_id FROM users WHERE username = 'alex_reads';
    SELECT id INTO v_marcus_id FROM users WHERE username = 'marcus_binge';

    -- Upsert Club
    SELECT id INTO v_club_id FROM clubs WHERE external_source = 'TMDB' AND external_id = '2316';
    IF v_club_id IS NULL THEN
        INSERT INTO clubs (name, media_type, external_source, external_id, cover_image_url, description, release_date, created_by, created_at)
        VALUES ('The Office (US)', 'SHOW', 'TMDB', '2316', 'https://image.tmdb.org/t/p/w500/7DJKHzAi83BmQrWLrYYOqcoKfhR.jpg', 'The everyday lives of office employees in the Scranton, Pennsylvania branch of the fictional Dunder Mifflin Paper Company.', '2005-03-24', v_creator_id, NOW() - interval '7 days')
        RETURNING id INTO v_club_id;
    ELSE
        UPDATE clubs SET
            name = 'The Office (US)',
            cover_image_url = 'https://image.tmdb.org/t/p/w500/7DJKHzAi83BmQrWLrYYOqcoKfhR.jpg',
            description = 'The everyday lives of office employees in the Scranton, Pennsylvania branch of the fictional Dunder Mifflin Paper Company.',
            release_date = '2005-03-24'
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


    SELECT id INTO v_member_id FROM users WHERE username = 'maya_tv';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MODERATOR', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'marcus_binge';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'zoe_novels';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'chloe_geek';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'elena_v';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'david_k';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'maya_tv';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_info_chan_id AND content = '📄 ''That''s what she said!'' Welcome to Dunder Mifflin Scranton! Grab a Dundee award, avoid Dwight''s fire drills, and share your favorite quotes and comfort rewatch moments.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_info_chan_id, v_member_id, '📄 ''That''s what she said!'' Welcome to Dunder Mifflin Scranton! Grab a Dundee award, avoid Dwight''s fire drills, and share your favorite quotes and comfort rewatch moments.', NOW() - interval '5 days', FALSE);
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'maya_tv';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'I''ve rewatched The Office probably eight times and the Dinner Party episode still makes me wheeze with laughter every single time.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'I''ve rewatched The Office probably eight times and the Dinner Party episode still makes me wheeze with laughter every single time.', NOW() - interval '19 hours', FALSE)
        RETURNING id INTO v_msg_id;


        IF v_sarah_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_sarah_id, '🔥', NOW() - interval '18 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'marcus_binge';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = '''That is a $200 plasma screen TV you just killed! Good luck paying me back on your zero dollars a year plus benefits salary, babe!'' Michael and Jan were out of control 😂') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, '''That is a $200 plasma screen TV you just killed! Good luck paying me back on your zero dollars a year plus benefits salary, babe!'' Michael and Jan were out of control 😂', NOW() - interval '16 hours', FALSE)
        RETURNING id INTO v_msg_id;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'zoe_novels';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'Jim putting Dwight''s stapler in Jell-O and paying people to call him Darryl... the prank compilation is undefeated comfort food.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'Jim putting Dwight''s stapler in Jell-O and paying people to call him Darryl... the prank compilation is undefeated comfort food.', NOW() - interval '13 hours', FALSE)
        RETURNING id INTO v_msg_id;


        IF v_sarah_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_sarah_id, '👍', NOW() - interval '12 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'chloe_geek';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'Stress Relief part 1 where Dwight locks everyone in and sets the trash can on fire: ''Today, smoking is going to save lives.'' Bandit getting thrown through the ceiling tiles!') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'Stress Relief part 1 where Dwight locks everyone in and sets the trash can on fire: ''Today, smoking is going to save lives.'' Bandit getting thrown through the ceiling tiles!', NOW() - interval '10 hours', FALSE)
        RETURNING id INTO v_msg_id;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'elena_v';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'Steve Carell''s physical comedy and facial expressions into the mockumentary camera are unparalleled.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'Steve Carell''s physical comedy and facial expressions into the mockumentary camera are unparalleled.', NOW() - interval '7 hours', FALSE)
        RETURNING id INTO v_msg_id;


        IF v_sarah_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_sarah_id, '😮', NOW() - interval '6 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'maya_tv';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_spoil_chan_id AND content = 'Michael leaving in ''Goodbye, Michael'' when he takes off his mic at the airport and hugs Pam without audio. Tears every time.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_spoil_chan_id, v_member_id, 'Michael leaving in ''Goodbye, Michael'' when he takes off his mic at the airport and hugs Pam without audio. Tears every time.', NOW() - interval '14 hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_alex_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_alex_id, '😮', NOW() - interval '13 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'zoe_novels';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_spoil_chan_id AND content = 'Dwight and Angela''s wedding in the finale, and Michael showing up as the Bestest Mensch: ''I feel like all my kids grew up, and then they married each other. It''s every parent''s dream!''') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_spoil_chan_id, v_member_id, 'Dwight and Angela''s wedding in the finale, and Michael showing up as the Bestest Mensch: ''I feel like all my kids grew up, and then they married each other. It''s every parent''s dream!''', NOW() - interval '10 hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_alex_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_alex_id, '😮', NOW() - interval '9 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'marcus_binge';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_req_chan_id AND content = 'Vote for the ultimate Dunder Mifflin prank: Identity Theft Dwight vs Pavlov''s Altoids vs Wrapping Paper Desk!') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_req_chan_id, v_member_id, 'Vote for the ultimate Dunder Mifflin prank: Identity Theft Dwight vs Pavlov''s Altoids vs Wrapping Paper Desk!', NOW() - interval '12 hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_marcus_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_marcus_id, '👍', NOW() - interval '11 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;

END $$;


-- Club: Stranger Things
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
    SELECT id INTO v_creator_id FROM users WHERE username = 'elena_v';
    SELECT id INTO v_sarah_id FROM users WHERE username = 'sarah_cinema';
    SELECT id INTO v_alex_id FROM users WHERE username = 'alex_reads';
    SELECT id INTO v_marcus_id FROM users WHERE username = 'marcus_binge';

    -- Upsert Club
    SELECT id INTO v_club_id FROM clubs WHERE external_source = 'TMDB' AND external_id = '66732';
    IF v_club_id IS NULL THEN
        INSERT INTO clubs (name, media_type, external_source, external_id, cover_image_url, description, release_date, created_by, created_at)
        VALUES ('Stranger Things', 'SHOW', 'TMDB', '66732', 'https://image.tmdb.org/t/p/w500/uOOtwVbSr4QDjAGIifLDwpb2Pdl.jpg', 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.', '2016-07-15', v_creator_id, NOW() - interval '7 days')
        RETURNING id INTO v_club_id;
    ELSE
        UPDATE clubs SET
            name = 'Stranger Things',
            cover_image_url = 'https://image.tmdb.org/t/p/w500/uOOtwVbSr4QDjAGIifLDwpb2Pdl.jpg',
            description = 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.',
            release_date = '2016-07-15'
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


    SELECT id INTO v_member_id FROM users WHERE username = 'elena_v';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MODERATOR', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'marcus_binge';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'maya_tv';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'chloe_geek';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'sarah_cinema';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'zoe_novels';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'elena_v';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_info_chan_id AND content = '🚲 Welcome to Hawkins, Indiana! D&D campaigns, synthwave soundtracks, Upside Down creatures, and 80s nostalgia. Friends don''t lie!') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_info_chan_id, v_member_id, '🚲 Welcome to Hawkins, Indiana! D&D campaigns, synthwave soundtracks, Upside Down creatures, and 80s nostalgia. Friends don''t lie!', NOW() - interval '5 days', FALSE);
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'elena_v';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'The Duffer Brothers captured lightning in a bottle with the kids'' chemistry in Season 1. It felt like Stand by Me meets The Goonies meets Alien.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'The Duffer Brothers captured lightning in a bottle with the kids'' chemistry in Season 1. It felt like Stand by Me meets The Goonies meets Alien.', NOW() - interval '16 hours', FALSE)
        RETURNING id INTO v_msg_id;


        IF v_sarah_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_sarah_id, '🔥', NOW() - interval '15 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'chloe_geek';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'The synth soundtrack by Survive is incredible. The title sequence alone instantly pulls you into the mid-80s horror vibe.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'The synth soundtrack by Survive is incredible. The title sequence alone instantly pulls you into the mid-80s horror vibe.', NOW() - interval '13 hours', FALSE)
        RETURNING id INTO v_msg_id;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'maya_tv';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'Steve Harrington having the greatest redemption arc in modern television history. From high school bully to the world''s best babysitter with a spiked baseball bat!') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'Steve Harrington having the greatest redemption arc in modern television history. From high school bully to the world''s best babysitter with a spiked baseball bat!', NOW() - interval '10 hours', FALSE)
        RETURNING id INTO v_msg_id;


        IF v_sarah_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_sarah_id, '👍', NOW() - interval '9 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'sarah_cinema';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'Winona Ryder''s performance with the Christmas lights in the living room communicating with Will was so raw and frantic.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'Winona Ryder''s performance with the Christmas lights in the living room communicating with Will was so raw and frantic.', NOW() - interval '7 hours', FALSE)
        RETURNING id INTO v_msg_id;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'elena_v';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_spoil_chan_id AND content = 'The ''Running Up That Hill'' Kate Bush sequence in Season 4 Episode 4 with Max escaping Vecna is one of the most thrilling TV scenes of the decade!') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_spoil_chan_id, v_member_id, 'The ''Running Up That Hill'' Kate Bush sequence in Season 4 Episode 4 with Max escaping Vecna is one of the most thrilling TV scenes of the decade!', NOW() - interval '14 hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_alex_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_alex_id, '😮', NOW() - interval '13 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'chloe_geek';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_spoil_chan_id AND content = 'Eddie Munson''s Master of Puppets guitar solo on the roof of the Upside Down trailer... most metal sacrifice ever 🎸') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_spoil_chan_id, v_member_id, 'Eddie Munson''s Master of Puppets guitar solo on the roof of the Upside Down trailer... most metal sacrifice ever 🎸', NOW() - interval '10 hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_alex_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_alex_id, '😮', NOW() - interval '9 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'maya_tv';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_req_chan_id AND content = 'Who has the best theories for Season 5? How are they going to defeat Vecna now that the Upside Down is bleeding into Hawkins?') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_req_chan_id, v_member_id, 'Who has the best theories for Season 5? How are they going to defeat Vecna now that the Upside Down is bleeding into Hawkins?', NOW() - interval '12 hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_marcus_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_marcus_id, '👍', NOW() - interval '11 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;

END $$;


-- Club: The Wire
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
    SELECT id INTO v_creator_id FROM users WHERE username = 'samir_b';
    SELECT id INTO v_sarah_id FROM users WHERE username = 'sarah_cinema';
    SELECT id INTO v_alex_id FROM users WHERE username = 'alex_reads';
    SELECT id INTO v_marcus_id FROM users WHERE username = 'marcus_binge';

    -- Upsert Club
    SELECT id INTO v_club_id FROM clubs WHERE external_source = 'TMDB' AND external_id = '1438';
    IF v_club_id IS NULL THEN
        INSERT INTO clubs (name, media_type, external_source, external_id, cover_image_url, description, release_date, created_by, created_at)
        VALUES ('The Wire', 'SHOW', 'TMDB', '1438', 'https://image.tmdb.org/t/p/w500/4lbclFySvugI51fwsyxBTOm4DqK.jpg', 'Told from the points of view of Baltimore homicide and narcotics detectives and their targets, capturing a universe in which the national war on drugs is a self-sustaining bureaucracy.', '2002-06-02', v_creator_id, NOW() - interval '7 days')
        RETURNING id INTO v_club_id;
    ELSE
        UPDATE clubs SET
            name = 'The Wire',
            cover_image_url = 'https://image.tmdb.org/t/p/w500/4lbclFySvugI51fwsyxBTOm4DqK.jpg',
            description = 'Told from the points of view of Baltimore homicide and narcotics detectives and their targets, capturing a universe in which the national war on drugs is a self-sustaining bureaucracy.',
            release_date = '2002-06-02'
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


    SELECT id INTO v_member_id FROM users WHERE username = 'samir_b';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MODERATOR', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'marcus_binge';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'david_k';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'jordan_lit';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'clara_m';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'samir_b';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_info_chan_id AND content = '⚖️ ''All the pieces matter.'' Welcome to The Wire Club. David Simon''s profound sociological dissection of the American city—the drug trade, the docks, City Hall, schools, and the press.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_info_chan_id, v_member_id, '⚖️ ''All the pieces matter.'' Welcome to The Wire Club. David Simon''s profound sociological dissection of the American city—the drug trade, the docks, City Hall, schools, and the press.', NOW() - interval '5 days', FALSE);
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'samir_b';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'The Wire isn''t just entertainment; it''s high literature on screen. Each season peels back another layer of systemic institutional failure in Baltimore.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'The Wire isn''t just entertainment; it''s high literature on screen. Each season peels back another layer of systemic institutional failure in Baltimore.', NOW() - interval '16 hours', FALSE)
        RETURNING id INTO v_msg_id;


        IF v_sarah_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_sarah_id, '🔥', NOW() - interval '15 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'marcus_binge';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'Michael K. Williams as Omar Little whistling ''The Farmer in the Dell'' through the projects... one of the greatest characters ever conceived in fiction.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'Michael K. Williams as Omar Little whistling ''The Farmer in the Dell'' through the projects... one of the greatest characters ever conceived in fiction.', NOW() - interval '13 hours', FALSE)
        RETURNING id INTO v_msg_id;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'david_k';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'Stringer Bell taking macroeconomics at night school while managing the Barksdale drug empire. The contrast between him and Avon was brilliant.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'Stringer Bell taking macroeconomics at night school while managing the Barksdale drug empire. The contrast between him and Avon was brilliant.', NOW() - interval '10 hours', FALSE)
        RETURNING id INTO v_msg_id;


        IF v_sarah_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_sarah_id, '👍', NOW() - interval '9 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'jordan_lit';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'Season 4 focusing on the middle school children (Michael, Dukie, Randy, Namond) broke my heart into pieces. No other show has depicted the tragedy of neglected youth so honestly.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'Season 4 focusing on the middle school children (Michael, Dukie, Randy, Namond) broke my heart into pieces. No other show has depicted the tragedy of neglected youth so honestly.', NOW() - interval '7 hours', FALSE)
        RETURNING id INTO v_msg_id;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'samir_b';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_spoil_chan_id AND content = 'The death of Bodie Broadus on his corner. He fought like a pawn on the chessboard and died like one, refusing to give up his ground.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_spoil_chan_id, v_member_id, 'The death of Bodie Broadus on his corner. He fought like a pawn on the chessboard and died like one, refusing to give up his ground.', NOW() - interval '14 hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_alex_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_alex_id, '😮', NOW() - interval '13 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'marcus_binge';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_spoil_chan_id AND content = 'Omar''s sudden, anti-climactic demise in a corner store by a little boy. Proof that the game doesn''t care about your legend—it just rolls on.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_spoil_chan_id, v_member_id, 'Omar''s sudden, anti-climactic demise in a corner store by a little boy. Proof that the game doesn''t care about your legend—it just rolls on.', NOW() - interval '10 hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_alex_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_alex_id, '😮', NOW() - interval '9 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'david_k';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_req_chan_id AND content = 'Can we do an in-depth breakdown of David Simon''s background as a Baltimore Sun crime reporter and how real-life cases inspired the show?') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_req_chan_id, v_member_id, 'Can we do an in-depth breakdown of David Simon''s background as a Baltimore Sun crime reporter and how real-life cases inspired the show?', NOW() - interval '12 hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_marcus_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_marcus_id, '👍', NOW() - interval '11 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;

END $$;


-- Club: The Da Vinci Code
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
    SELECT id INTO v_creator_id FROM users WHERE username = 'alex_reads';
    SELECT id INTO v_sarah_id FROM users WHERE username = 'sarah_cinema';
    SELECT id INTO v_alex_id FROM users WHERE username = 'alex_reads';
    SELECT id INTO v_marcus_id FROM users WHERE username = 'marcus_binge';

    -- Upsert Club
    SELECT id INTO v_club_id FROM clubs WHERE external_source = 'OPEN_LIBRARY' AND external_id = '/works/OL76837W';
    IF v_club_id IS NULL THEN
        INSERT INTO clubs (name, media_type, external_source, external_id, cover_image_url, description, release_date, created_by, created_at)
        VALUES ('The Da Vinci Code', 'BOOK', 'OPEN_LIBRARY', '/works/OL76837W', 'https://covers.openlibrary.org/b/id/9255229-L.jpg', 'While in Paris, Harvard symbologist Robert Langdon is awakened by an urgent late-night phone call. The elderly curator of the Louvre has been murdered inside the museum, his body covered in bizarre symbols.', '2003', v_creator_id, NOW() - interval '7 days')
        RETURNING id INTO v_club_id;
    ELSE
        UPDATE clubs SET
            name = 'The Da Vinci Code',
            cover_image_url = 'https://covers.openlibrary.org/b/id/9255229-L.jpg',
            description = 'While in Paris, Harvard symbologist Robert Langdon is awakened by an urgent late-night phone call. The elderly curator of the Louvre has been murdered inside the museum, his body covered in bizarre symbols.',
            release_date = '2003'
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


    SELECT id INTO v_member_id FROM users WHERE username = 'alex_reads';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MODERATOR', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'jordan_lit';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'clara_m';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'sarah_cinema';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'david_k';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'alex_reads';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_info_chan_id AND content = '🔍 Welcome to The Da Vinci Code Book Club! Unravelling Dan Brown''s thrilling symbology, secret societies (Priory of Sion, Opus Dei), anagrams, and art history mysteries.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_info_chan_id, v_member_id, '🔍 Welcome to The Da Vinci Code Book Club! Unravelling Dan Brown''s thrilling symbology, secret societies (Priory of Sion, Opus Dei), anagrams, and art history mysteries.', NOW() - interval '5 days', FALSE);
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'alex_reads';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'Say what you will about Dan Brown''s prose, his cliffhangers and pacing in The Da Vinci Code are absolute page-turner masterclasses. You physically cannot put the book down.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'Say what you will about Dan Brown''s prose, his cliffhangers and pacing in The Da Vinci Code are absolute page-turner masterclasses. You physically cannot put the book down.', NOW() - interval '16 hours', FALSE)
        RETURNING id INTO v_msg_id;


        IF v_sarah_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_sarah_id, '🔥', NOW() - interval '15 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'jordan_lit';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'The opening 100 pages inside the Louvre with Jacques Saunière''s coded dying message on the parquet floor hooked an entire generation of readers.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'The opening 100 pages inside the Louvre with Jacques Saunière''s coded dying message on the parquet floor hooked an entire generation of readers.', NOW() - interval '13 hours', FALSE)
        RETURNING id INTO v_msg_id;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'clara_m';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'The anagrams (O, Draconian devil! Oh, lame saint!) and the Fibonacci sequence integration were so fun to solve along with Sophie Neveu.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'The anagrams (O, Draconian devil! Oh, lame saint!) and the Fibonacci sequence integration were so fun to solve along with Sophie Neveu.', NOW() - interval '10 hours', FALSE)
        RETURNING id INTO v_msg_id;


        IF v_sarah_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_sarah_id, '👍', NOW() - interval '9 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'sarah_cinema';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'And the setting in Paris, Westminster Abbey, and Rosslyn Chapel made the whole quest feel like a high-stakes scavenger hunt across European history.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'And the setting in Paris, Westminster Abbey, and Rosslyn Chapel made the whole quest feel like a high-stakes scavenger hunt across European history.', NOW() - interval '7 hours', FALSE)
        RETURNING id INTO v_msg_id;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'alex_reads';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_spoil_chan_id AND content = 'The revelation that Sophie is actually the living descendant of the Merovingian bloodline at Rosslyn Chapel was such a satisfying mythological climax.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_spoil_chan_id, v_member_id, 'The revelation that Sophie is actually the living descendant of the Merovingian bloodline at Rosslyn Chapel was such a satisfying mythological climax.', NOW() - interval '14 hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_alex_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_alex_id, '😮', NOW() - interval '13 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'clara_m';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_spoil_chan_id AND content = 'Sir Leigh Teabing being the Teacher behind the assassinations! He seemed like such an eccentric, lovable eccentric scholar in the beginning.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_spoil_chan_id, v_member_id, 'Sir Leigh Teabing being the Teacher behind the assassinations! He seemed like such an eccentric, lovable eccentric scholar in the beginning.', NOW() - interval '10 hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_alex_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_alex_id, '😮', NOW() - interval '9 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'jordan_lit';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_req_chan_id AND content = 'Let''s read Angels & Demons next! In many ways, the Vatican antimatter race against the clock was even more intense than Da Vinci Code.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_req_chan_id, v_member_id, 'Let''s read Angels & Demons next! In many ways, the Vatican antimatter race against the clock was even more intense than Da Vinci Code.', NOW() - interval '12 hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_marcus_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_marcus_id, '👍', NOW() - interval '11 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;

END $$;


-- Club: The Hunger Games
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
    SELECT id INTO v_creator_id FROM users WHERE username = 'zoe_novels';
    SELECT id INTO v_sarah_id FROM users WHERE username = 'sarah_cinema';
    SELECT id INTO v_alex_id FROM users WHERE username = 'alex_reads';
    SELECT id INTO v_marcus_id FROM users WHERE username = 'marcus_binge';

    -- Upsert Club
    SELECT id INTO v_club_id FROM clubs WHERE external_source = 'OPEN_LIBRARY' AND external_id = '/works/OL5735363W';
    IF v_club_id IS NULL THEN
        INSERT INTO clubs (name, media_type, external_source, external_id, cover_image_url, description, release_date, created_by, created_at)
        VALUES ('The Hunger Games', 'BOOK', 'OPEN_LIBRARY', '/works/OL5735363W', 'https://covers.openlibrary.org/b/id/12646537-L.jpg', 'In a dark vision of the near future, twelve boys and twelve girls are forced to appear in a live event called The Hunger Games. There is only one rule: kill or be killed.', '2008', v_creator_id, NOW() - interval '7 days')
        RETURNING id INTO v_club_id;
    ELSE
        UPDATE clubs SET
            name = 'The Hunger Games',
            cover_image_url = 'https://covers.openlibrary.org/b/id/12646537-L.jpg',
            description = 'In a dark vision of the near future, twelve boys and twelve girls are forced to appear in a live event called The Hunger Games. There is only one rule: kill or be killed.',
            release_date = '2008'
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


    SELECT id INTO v_member_id FROM users WHERE username = 'zoe_novels';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MODERATOR', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'alex_reads';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'chloe_geek';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'elena_v';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'sarah_cinema';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'zoe_novels';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_info_chan_id AND content = '🏹 ''May the odds be ever in your favor.'' Welcome to the Panem Book Club! Analyzing Suzanne Collins'' dystopian critique of media spectacle, war trauma, and rebellion.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_info_chan_id, v_member_id, '🏹 ''May the odds be ever in your favor.'' Welcome to the Panem Book Club! Analyzing Suzanne Collins'' dystopian critique of media spectacle, war trauma, and rebellion.', NOW() - interval '5 days', FALSE);
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'zoe_novels';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'Suzanne Collins'' use of present-tense, first-person narration puts you straight inside Katniss Everdeen''s survivalist mindset. Her internal monologue is cold, pragmatic, and heartbreaking.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'Suzanne Collins'' use of present-tense, first-person narration puts you straight inside Katniss Everdeen''s survivalist mindset. Her internal monologue is cold, pragmatic, and heartbreaking.', NOW() - interval '16 hours', FALSE)
        RETURNING id INTO v_msg_id;


        IF v_sarah_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_sarah_id, '🔥', NOW() - interval '15 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'alex_reads';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'What makes The Hunger Games stand out from typical YA is that Katniss is severely traumatized by the violence. It never glorifies the arena; the psychological scars are real.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'What makes The Hunger Games stand out from typical YA is that Katniss is severely traumatized by the violence. It never glorifies the arena; the psychological scars are real.', NOW() - interval '13 hours', FALSE)
        RETURNING id INTO v_msg_id;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'chloe_geek';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'Rue''s connection with Katniss and the four-note mockingjay whistle... I was sobbing on the bus when I first read that chapter.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'Rue''s connection with Katniss and the four-note mockingjay whistle... I was sobbing on the bus when I first read that chapter.', NOW() - interval '10 hours', FALSE)
        RETURNING id INTO v_msg_id;


        IF v_sarah_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_sarah_id, '👍', NOW() - interval '9 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'elena_v';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'The Capitol''s obsession with plastic surgery, reality TV ratings, and culinary excess while the districts starve is such a sharp, enduring social satire.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'The Capitol''s obsession with plastic surgery, reality TV ratings, and culinary excess while the districts starve is such a sharp, enduring social satire.', NOW() - interval '7 hours', FALSE)
        RETURNING id INTO v_msg_id;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'zoe_novels';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_spoil_chan_id AND content = 'The nightlock berries stunt at the climax! Defying the Gamemakers by threatening a double suicide was the ultimate political middle finger to President Snow.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_spoil_chan_id, v_member_id, 'The nightlock berries stunt at the climax! Defying the Gamemakers by threatening a double suicide was the ultimate political middle finger to President Snow.', NOW() - interval '14 hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_alex_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_alex_id, '😮', NOW() - interval '13 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'alex_reads';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_spoil_chan_id AND content = 'Peeta Mellark painting Rue''s flowers in Catching Fire showed just how morally intact he remained despite Capitol cruelty.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_spoil_chan_id, v_member_id, 'Peeta Mellark painting Rue''s flowers in Catching Fire showed just how morally intact he remained despite Capitol cruelty.', NOW() - interval '10 hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_alex_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_alex_id, '😮', NOW() - interval '9 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'chloe_geek';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_req_chan_id AND content = 'Let''s do a deep dive into The Ballad of Songbirds and Snakes! Coriolanus Snow''s slow descent into tyranny is fascinating.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_req_chan_id, v_member_id, 'Let''s do a deep dive into The Ballad of Songbirds and Snakes! Coriolanus Snow''s slow descent into tyranny is fascinating.', NOW() - interval '12 hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_marcus_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_marcus_id, '👍', NOW() - interval '11 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;

END $$;


-- Club: Twilight
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
    SELECT id INTO v_creator_id FROM users WHERE username = 'zoe_novels';
    SELECT id INTO v_sarah_id FROM users WHERE username = 'sarah_cinema';
    SELECT id INTO v_alex_id FROM users WHERE username = 'alex_reads';
    SELECT id INTO v_marcus_id FROM users WHERE username = 'marcus_binge';

    -- Upsert Club
    SELECT id INTO v_club_id FROM clubs WHERE external_source = 'OPEN_LIBRARY' AND external_id = '/works/OL5720023W';
    IF v_club_id IS NULL THEN
        INSERT INTO clubs (name, media_type, external_source, external_id, cover_image_url, description, release_date, created_by, created_at)
        VALUES ('Twilight', 'BOOK', 'OPEN_LIBRARY', '/works/OL5720023W', 'https://covers.openlibrary.org/b/id/12641977-L.jpg', 'Bella Swan''s move to small-town Washington leads to an encounter with Edward Cullen, a mysterious and alluring teenager whose dark secret threatens her life: he is a vampire.', '2005', v_creator_id, NOW() - interval '7 days')
        RETURNING id INTO v_club_id;
    ELSE
        UPDATE clubs SET
            name = 'Twilight',
            cover_image_url = 'https://covers.openlibrary.org/b/id/12641977-L.jpg',
            description = 'Bella Swan''s move to small-town Washington leads to an encounter with Edward Cullen, a mysterious and alluring teenager whose dark secret threatens her life: he is a vampire.',
            release_date = '2005'
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


    SELECT id INTO v_member_id FROM users WHERE username = 'zoe_novels';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MODERATOR', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'maya_tv';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'alex_reads';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'chloe_geek';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'zoe_novels';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_info_chan_id AND content = '🍎 ''About three things I was absolutely positive.'' Welcome to Forks, Washington! Discussing Stephenie Meyer''s cultural phenomenon, the Cullen family lore, and the Pacific Northwest atmosphere.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_info_chan_id, v_member_id, '🍎 ''About three things I was absolutely positive.'' Welcome to Forks, Washington! Discussing Stephenie Meyer''s cultural phenomenon, the Cullen family lore, and the Pacific Northwest atmosphere.', NOW() - interval '5 days', FALSE);
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'zoe_novels';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'The moody, rainy atmosphere of Forks, Washington in this book is unmatched. You can literally smell the cedar trees, mist, and damp earth on every page.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'The moody, rainy atmosphere of Forks, Washington in this book is unmatched. You can literally smell the cedar trees, mist, and damp earth on every page.', NOW() - interval '16 hours', FALSE)
        RETURNING id INTO v_msg_id;


        IF v_sarah_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_sarah_id, '🔥', NOW() - interval '15 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'maya_tv';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'The meadow scene and the biology class tension between Bella and Edward started a worldwide obsession for a reason!') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'The meadow scene and the biology class tension between Bella and Edward started a worldwide obsession for a reason!', NOW() - interval '13 hours', FALSE)
        RETURNING id INTO v_msg_id;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'alex_reads';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'Say what you want about the romance tropes, Meyer''s vampire lore—baseball during thunderstorms, venom that crystalizes, individual mind abilities—was super creative.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'Say what you want about the romance tropes, Meyer''s vampire lore—baseball during thunderstorms, venom that crystalizes, individual mind abilities—was super creative.', NOW() - interval '10 hours', FALSE)
        RETURNING id INTO v_msg_id;


        IF v_sarah_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_sarah_id, '👍', NOW() - interval '9 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'chloe_geek';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'Alice Cullen and Jasper''s backstory in the later chapters was so rich. Alice is hands down the best character in the whole saga.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'Alice Cullen and Jasper''s backstory in the later chapters was so rich. Alice is hands down the best character in the whole saga.', NOW() - interval '7 hours', FALSE)
        RETURNING id INTO v_msg_id;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'zoe_novels';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_spoil_chan_id AND content = 'The ballet studio showdown with James! The sheer panic when Bella thinks her mother is being held hostage, and the Cullens arriving just in time.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_spoil_chan_id, v_member_id, 'The ballet studio showdown with James! The sheer panic when Bella thinks her mother is being held hostage, and the Cullens arriving just in time.', NOW() - interval '14 hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_alex_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_alex_id, '😮', NOW() - interval '13 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'maya_tv';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_spoil_chan_id AND content = 'Edward having to suck the venom out of Bella''s wrist while fighting the urge to drain her blood completely... peak romantic tension.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_spoil_chan_id, v_member_id, 'Edward having to suck the venom out of Bella''s wrist while fighting the urge to drain her blood completely... peak romantic tension.', NOW() - interval '10 hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_alex_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_alex_id, '😮', NOW() - interval '9 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'zoe_novels';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_req_chan_id AND content = 'Midnight Sun discussion! Reading the first book entirely from Edward''s telepathic, over-analytical vampire perspective was so revealing.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_req_chan_id, v_member_id, 'Midnight Sun discussion! Reading the first book entirely from Edward''s telepathic, over-analytical vampire perspective was so revealing.', NOW() - interval '12 hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_marcus_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_marcus_id, '👍', NOW() - interval '11 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;

END $$;


-- Club: The Girl with the Dragon Tattoo
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
    SELECT id INTO v_creator_id FROM users WHERE username = 'jordan_lit';
    SELECT id INTO v_sarah_id FROM users WHERE username = 'sarah_cinema';
    SELECT id INTO v_alex_id FROM users WHERE username = 'alex_reads';
    SELECT id INTO v_marcus_id FROM users WHERE username = 'marcus_binge';

    -- Upsert Club
    SELECT id INTO v_club_id FROM clubs WHERE external_source = 'OPEN_LIBRARY' AND external_id = '/works/OL5784622W';
    IF v_club_id IS NULL THEN
        INSERT INTO clubs (name, media_type, external_source, external_id, cover_image_url, description, release_date, created_by, created_at)
        VALUES ('The Girl with the Dragon Tattoo', 'BOOK', 'OPEN_LIBRARY', '/works/OL5784622W', 'https://covers.openlibrary.org/b/id/9274740-L.jpg', 'Disgraced journalist Mikael Blomkvist is hired to investigate the forty-year-old disappearance of Harriet Vanger, partnering with Lisbeth Salander, a genius hacker with photographic memory.', '2005', v_creator_id, NOW() - interval '7 days')
        RETURNING id INTO v_club_id;
    ELSE
        UPDATE clubs SET
            name = 'The Girl with the Dragon Tattoo',
            cover_image_url = 'https://covers.openlibrary.org/b/id/9274740-L.jpg',
            description = 'Disgraced journalist Mikael Blomkvist is hired to investigate the forty-year-old disappearance of Harriet Vanger, partnering with Lisbeth Salander, a genius hacker with photographic memory.',
            release_date = '2005'
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


    SELECT id INTO v_member_id FROM users WHERE username = 'jordan_lit';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MODERATOR', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'clara_m';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'alex_reads';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'david_k';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'samir_b';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'jordan_lit';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_info_chan_id AND content = '🐉 Welcome to the Millennium Book Club! Investigating Stieg Larsson''s legendary Scandinavian crime masterpiece, financial journalism, forensic hacking, and the iconic Lisbeth Salander.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_info_chan_id, v_member_id, '🐉 Welcome to the Millennium Book Club! Investigating Stieg Larsson''s legendary Scandinavian crime masterpiece, financial journalism, forensic hacking, and the iconic Lisbeth Salander.', NOW() - interval '5 days', FALSE);
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'jordan_lit';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'Lisbeth Salander is one of the most uniquely capable, fiercely independent antiheroes ever written in detective fiction. Her photographic memory and relentless grit are unforgettable.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'Lisbeth Salander is one of the most uniquely capable, fiercely independent antiheroes ever written in detective fiction. Her photographic memory and relentless grit are unforgettable.', NOW() - interval '16 hours', FALSE)
        RETURNING id INTO v_msg_id;


        IF v_sarah_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_sarah_id, '🔥', NOW() - interval '15 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'clara_m';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'The secluded island setting of Hedeby in the dead of Swedish winter creates such an eerie, isolated locked-room murder mystery atmosphere.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'The secluded island setting of Hedeby in the dead of Swedish winter creates such an eerie, isolated locked-room murder mystery atmosphere.', NOW() - interval '13 hours', FALSE)
        RETURNING id INTO v_msg_id;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'alex_reads';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'Stieg Larsson was an investigative journalist in real life, and you can feel his deep knowledge of corporate corruption, banking fraud, and far-right underground networks in every chapter.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'Stieg Larsson was an investigative journalist in real life, and you can feel his deep knowledge of corporate corruption, banking fraud, and far-right underground networks in every chapter.', NOW() - interval '10 hours', FALSE)
        RETURNING id INTO v_msg_id;


        IF v_sarah_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_sarah_id, '👍', NOW() - interval '9 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'david_k';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'The way Mikael Blomkvist deciphers the family photos from Children''s Day in 1966 across different angles was pure detective gold.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'The way Mikael Blomkvist deciphers the family photos from Children''s Day in 1966 across different angles was pure detective gold.', NOW() - interval '7 hours', FALSE)
        RETURNING id INTO v_msg_id;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'jordan_lit';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_spoil_chan_id AND content = 'The horrific reveal of Martin Vanger''s basement of horrors, and Harriet living under an assumed identity in Australia the entire forty years!') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_spoil_chan_id, v_member_id, 'The horrific reveal of Martin Vanger''s basement of horrors, and Harriet living under an assumed identity in Australia the entire forty years!', NOW() - interval '14 hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_alex_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_alex_id, '😮', NOW() - interval '13 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'clara_m';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_spoil_chan_id AND content = 'Lisbeth taking complete financial revenge on Wennerström at the end using offshore dummy corporations. Nobody crosses Salander and walks away clean.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_spoil_chan_id, v_member_id, 'Lisbeth taking complete financial revenge on Wennerström at the end using offshore dummy corporations. Nobody crosses Salander and walks away clean.', NOW() - interval '10 hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_alex_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_alex_id, '😮', NOW() - interval '9 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'alex_reads';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_req_chan_id AND content = 'Let''s read The Girl Who Played with Fire next to dive deeper into Lisbeth''s shadowy past and Section espionage!') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_req_chan_id, v_member_id, 'Let''s read The Girl Who Played with Fire next to dive deeper into Lisbeth''s shadowy past and Section espionage!', NOW() - interval '12 hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_marcus_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_marcus_id, '👍', NOW() - interval '11 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;

END $$;


-- Club: The Kite Runner
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
    SELECT id INTO v_creator_id FROM users WHERE username = 'alex_reads';
    SELECT id INTO v_sarah_id FROM users WHERE username = 'sarah_cinema';
    SELECT id INTO v_alex_id FROM users WHERE username = 'alex_reads';
    SELECT id INTO v_marcus_id FROM users WHERE username = 'marcus_binge';

    -- Upsert Club
    SELECT id INTO v_club_id FROM clubs WHERE external_source = 'OPEN_LIBRARY' AND external_id = '/works/OL5781992W';
    IF v_club_id IS NULL THEN
        INSERT INTO clubs (name, media_type, external_source, external_id, cover_image_url, description, release_date, created_by, created_at)
        VALUES ('The Kite Runner', 'BOOK', 'OPEN_LIBRARY', '/works/OL5781992W', 'https://covers.openlibrary.org/b/id/14846827-L.jpg', 'An epic tale of friendship and redemption, following Amir, a young boy from Kabul, and his bond with Hassan, the son of his father''s servant, set against political upheaval in Afghanistan.', '2003', v_creator_id, NOW() - interval '7 days')
        RETURNING id INTO v_club_id;
    ELSE
        UPDATE clubs SET
            name = 'The Kite Runner',
            cover_image_url = 'https://covers.openlibrary.org/b/id/14846827-L.jpg',
            description = 'An epic tale of friendship and redemption, following Amir, a young boy from Kabul, and his bond with Hassan, the son of his father''s servant, set against political upheaval in Afghanistan.',
            release_date = '2003'
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


    SELECT id INTO v_member_id FROM users WHERE username = 'alex_reads';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MODERATOR', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'jordan_lit';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'samir_b';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'clara_m';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'elena_v';
    IF v_member_id IS NOT NULL THEN
        INSERT INTO memberships (user_id, club_id, role, joined_at)
        VALUES (v_member_id, v_club_id, 'MEMBER', NOW() - interval '6 days')
        ON CONFLICT (user_id, club_id) DO NOTHING;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'alex_reads';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_info_chan_id AND content = '🪁 ''For you, a thousand times over.'' Welcome to The Kite Runner Book Club. A profound journey of brotherhood, guilt, moral courage, and redemption by Khaled Hosseini.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_info_chan_id, v_member_id, '🪁 ''For you, a thousand times over.'' Welcome to The Kite Runner Book Club. A profound journey of brotherhood, guilt, moral courage, and redemption by Khaled Hosseini.', NOW() - interval '5 days', FALSE);
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'alex_reads';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'Khaled Hosseini''s depiction of 1970s Kabul—the winter kite fighting tournaments, the pomegranate trees, the smell of lamb kebabs—paints such a vibrant picture of an Afghanistan before decades of war.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'Khaled Hosseini''s depiction of 1970s Kabul—the winter kite fighting tournaments, the pomegranate trees, the smell of lamb kebabs—paints such a vibrant picture of an Afghanistan before decades of war.', NOW() - interval '16 hours', FALSE)
        RETURNING id INTO v_msg_id;


        IF v_sarah_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_sarah_id, '🔥', NOW() - interval '15 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'samir_b';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = '''For you, a thousand times over.'' Hassan''s fierce, unconditional loyalty to Amir makes Amir''s childhood cowardice cut so much deeper.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, '''For you, a thousand times over.'' Hassan''s fierce, unconditional loyalty to Amir makes Amir''s childhood cowardice cut so much deeper.', NOW() - interval '13 hours', FALSE)
        RETURNING id INTO v_msg_id;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'jordan_lit';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'Baba''s character is so complex. A towering figure of physical courage and community respect, yet carrying his own hidden shame.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'Baba''s character is so complex. A towering figure of physical courage and community respect, yet carrying his own hidden shame.', NOW() - interval '10 hours', FALSE)
        RETURNING id INTO v_msg_id;


        IF v_sarah_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_sarah_id, '👍', NOW() - interval '9 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'elena_v';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_gen_chan_id AND content = 'Hosseini''s prose is deceptively simple but packs such a massive emotional punch. You need a box of tissues by chapter 7.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_gen_chan_id, v_member_id, 'Hosseini''s prose is deceptively simple but packs such a massive emotional punch. You need a box of tissues by chapter 7.', NOW() - interval '7 hours', FALSE)
        RETURNING id INTO v_msg_id;

    END IF;

    SELECT id INTO v_member_id FROM users WHERE username = 'alex_reads';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_spoil_chan_id AND content = 'Rahim Khan''s phone call: ''There is a way to be good again.'' That sentence defines the entire thematic arc of the novel. Amir finally returning to Taliban-controlled Kabul to rescue Sohrab.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_spoil_chan_id, v_member_id, 'Rahim Khan''s phone call: ''There is a way to be good again.'' That sentence defines the entire thematic arc of the novel. Amir finally returning to Taliban-controlled Kabul to rescue Sohrab.', NOW() - interval '14 hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_alex_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_alex_id, '😮', NOW() - interval '13 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'samir_b';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_spoil_chan_id AND content = 'The revelation that Hassan was actually Baba''s biological son and Amir''s half-brother recontextualized everything Baba ever did for them.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_spoil_chan_id, v_member_id, 'The revelation that Hassan was actually Baba''s biological son and Amir''s half-brother recontextualized everything Baba ever did for them.', NOW() - interval '10 hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_alex_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_alex_id, '😮', NOW() - interval '9 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;


    SELECT id INTO v_member_id FROM users WHERE username = 'jordan_lit';
    IF v_member_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM messages WHERE channel_id = v_req_chan_id AND content = 'We should definitely read A Thousand Splendid Suns next. Hosseini''s portrayal of Mariam and Laila is just as heart-wrenching.') THEN
        INSERT INTO messages (channel_id, sender_id, content, sent_at, is_deleted)
        VALUES (v_req_chan_id, v_member_id, 'We should definitely read A Thousand Splendid Suns next. Hosseini''s portrayal of Mariam and Laila is just as heart-wrenching.', NOW() - interval '12 hours', FALSE)
        RETURNING id INTO v_msg_id;
        IF v_marcus_id IS NOT NULL THEN
            INSERT INTO reactions (message_id, user_id, emoji, created_at)
            VALUES (v_msg_id, v_marcus_id, '👍', NOW() - interval '11 hours')
            ON CONFLICT (message_id, user_id, emoji) DO NOTHING;
        END IF;
    END IF;

END $$;

-- 3. Direct Message Conversations

DO $$
DECLARE
    v_u1_id bigint;
    v_u2_id bigint;
    v_low_id bigint;
    v_high_id bigint;
    v_conv_id bigint;
    v_sender_id bigint;
BEGIN
    SELECT id INTO v_u1_id FROM users WHERE username = 'sarah_cinema';
    SELECT id INTO v_u2_id FROM users WHERE username = 'alex_reads';

    IF v_u1_id IS NOT NULL AND v_u2_id IS NOT NULL THEN
        v_low_id := LEAST(v_u1_id, v_u2_id);
        v_high_id := GREATEST(v_u1_id, v_u2_id);

        SELECT id INTO v_conv_id FROM conversations WHERE user_a_id = v_low_id AND user_b_id = v_high_id;
        IF v_conv_id IS NULL THEN
            INSERT INTO conversations (user_a_id, user_b_id, created_at)
            VALUES (v_low_id, v_high_id, NOW() - interval '4 days')
            RETURNING id INTO v_conv_id;
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'alex_reads';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'Hey Sarah! Saw you''re moderating the Return of the King club. Amazing to see fellow Tolkien fans here!') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'Hey Sarah! Saw you''re moderating the Return of the King club. Amazing to see fellow Tolkien fans here!', NOW() - interval '48 hours', FALSE);
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'sarah_cinema';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'Hey Alex! Absolutely! The Ride of the Rohirrim is genuinely my favorite cinematic moment ever. Do you prefer the book version or Jackson''s extended film cut?') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'Hey Alex! Absolutely! The Ride of the Rohirrim is genuinely my favorite cinematic moment ever. Do you prefer the book version or Jackson''s extended film cut?', NOW() - interval '46 hours', FALSE);
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'alex_reads';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'Honestly, both in different ways! Tolkien''s prose during the charge of the Rohirrim is pure heroic poetry, but Jackson and Howard Shore gave it that visual and musical thunder.') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'Honestly, both in different ways! Tolkien''s prose during the charge of the Rohirrim is pure heroic poetry, but Jackson and Howard Shore gave it that visual and musical thunder.', NOW() - interval '44 hours', FALSE);
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'sarah_cinema';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'Spot on! By the way, have you read The Da Vinci Code club yet? I saw you started it—I''m about to jump into the book discussion there too.') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'Spot on! By the way, have you read The Da Vinci Code club yet? I saw you started it—I''m about to jump into the book discussion there too.', NOW() - interval '36 hours', FALSE);
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'alex_reads';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'Yes! It''s such a fun page-turner. Pop into #general when you get a chance, we''re talking about the Louvre opening chapters right now!') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'Yes! It''s such a fun page-turner. Pop into #general when you get a chance, we''re talking about the Louvre opening chapters right now!', NOW() - interval '30 hours', FALSE);
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'sarah_cinema';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'On my way! And let me know if you ever need movie recommendations—The Dark Knight is calling your name if you haven''t rewatched recently 😉') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'On my way! And let me know if you ever need movie recommendations—The Dark Knight is calling your name if you haven''t rewatched recently 😉', NOW() - interval '24 hours', FALSE);
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'alex_reads';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'Haha deal! I''ll put Nolan on my weekend queue 🍿') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'Haha deal! I''ll put Nolan on my weekend queue 🍿', NOW() - interval '20 hours', FALSE);
        END IF;


    END IF;
END $$;


DO $$
DECLARE
    v_u1_id bigint;
    v_u2_id bigint;
    v_low_id bigint;
    v_high_id bigint;
    v_conv_id bigint;
    v_sender_id bigint;
BEGIN
    SELECT id INTO v_u1_id FROM users WHERE username = 'sarah_cinema';
    SELECT id INTO v_u2_id FROM users WHERE username = 'marcus_binge';

    IF v_u1_id IS NOT NULL AND v_u2_id IS NOT NULL THEN
        v_low_id := LEAST(v_u1_id, v_u2_id);
        v_high_id := GREATEST(v_u1_id, v_u2_id);

        SELECT id INTO v_conv_id FROM conversations WHERE user_a_id = v_low_id AND user_b_id = v_high_id;
        IF v_conv_id IS NULL THEN
            INSERT INTO conversations (user_a_id, user_b_id, created_at)
            VALUES (v_low_id, v_high_id, NOW() - interval '4 days')
            RETURNING id INTO v_conv_id;
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'marcus_binge';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'Sarah! Loved your analysis of The Dark Knight''s IMAX bank heist prologue in the club. Nolan''s practical stunt work was so ahead of its time.') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'Sarah! Loved your analysis of The Dark Knight''s IMAX bank heist prologue in the club. Nolan''s practical stunt work was so ahead of its time.', NOW() - interval '72 hours', FALSE);
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'sarah_cinema';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'Thanks Marcus! What''s crazy is they actually blew up the real abandoned building in Chicago for the hospital scene too. No CGI shortcut.') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'Thanks Marcus! What''s crazy is they actually blew up the real abandoned building in Chicago for the hospital scene too. No CGI shortcut.', NOW() - interval '70 hours', FALSE);
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'marcus_binge';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'Right?! That little pause Heath Ledger does when the remote detonator stalls... legendary improv. Have you ever watched Breaking Bad, by the way?') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'Right?! That little pause Heath Ledger does when the remote detonator stalls... legendary improv. Have you ever watched Breaking Bad, by the way?', NOW() - interval '65 hours', FALSE);
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'sarah_cinema';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'I watched the first 2 seasons years ago, but never finished it! You''re making me feel like I committed a crime by not finishing it haha.') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'I watched the first 2 seasons years ago, but never finished it! You''re making me feel like I committed a crime by not finishing it haha.', NOW() - interval '60 hours', FALSE);
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'marcus_binge';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'You HAVE to finish it! Seasons 4 and 5 are peak television. ''Ozymandias'' is the highest rated TV episode in history for a reason.') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'You HAVE to finish it! Seasons 4 and 5 are peak television. ''Ozymandias'' is the highest rated TV episode in history for a reason.', NOW() - interval '50 hours', FALSE);
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'sarah_cinema';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'Okay, you''ve convinced me. Starting Season 3 tonight! No spoilers in our DMs though!') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'Okay, you''ve convinced me. Starting Season 3 tonight! No spoilers in our DMs though!', NOW() - interval '40 hours', FALSE);
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'marcus_binge';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'Lips are sealed 🤐 Let me know your thoughts after the Season 3 finale... you''re gonna lose your mind!') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'Lips are sealed 🤐 Let me know your thoughts after the Season 3 finale... you''re gonna lose your mind!', NOW() - interval '35 hours', FALSE);
        END IF;


    END IF;
END $$;


DO $$
DECLARE
    v_u1_id bigint;
    v_u2_id bigint;
    v_low_id bigint;
    v_high_id bigint;
    v_conv_id bigint;
    v_sender_id bigint;
BEGIN
    SELECT id INTO v_u1_id FROM users WHERE username = 'elena_v';
    SELECT id INTO v_u2_id FROM users WHERE username = 'sarah_cinema';

    IF v_u1_id IS NOT NULL AND v_u2_id IS NOT NULL THEN
        v_low_id := LEAST(v_u1_id, v_u2_id);
        v_high_id := GREATEST(v_u1_id, v_u2_id);

        SELECT id INTO v_conv_id FROM conversations WHERE user_a_id = v_low_id AND user_b_id = v_high_id;
        IF v_conv_id IS NULL THEN
            INSERT INTO conversations (user_a_id, user_b_id, created_at)
            VALUES (v_low_id, v_high_id, NOW() - interval '4 days')
            RETURNING id INTO v_conv_id;
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'elena_v';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'Hey Sarah! Loved your breakdown of Avatar''s visual worldbuilding in the club. Did you catch the IMAX 3D re-release?') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'Hey Sarah! Loved your breakdown of Avatar''s visual worldbuilding in the club. Did you catch the IMAX 3D re-release?', NOW() - interval '28 hours', FALSE);
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'sarah_cinema';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'Hey Elena! Yes, twice actually haha! The underwater Pandora sequences and high-frame-rate flying scenes are mindblowing on a giant screen.') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'Hey Elena! Yes, twice actually haha! The underwater Pandora sequences and high-frame-rate flying scenes are mindblowing on a giant screen.', NOW() - interval '25 hours', FALSE);
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'elena_v';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'I''m going this Saturday! So excited. Are you planning to watch the upcoming extended cut too?') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'I''m going this Saturday! So excited. Are you planning to watch the upcoming extended cut too?', NOW() - interval '18 hours', FALSE);
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'sarah_cinema';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'Definitely! We should do a synchronized watch party with the club members once the 4K stream drops.') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'Definitely! We should do a synchronized watch party with the club members once the 4K stream drops.', NOW() - interval '12 hours', FALSE);
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'elena_v';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'Count me in! That would be so much fun 🌿') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'Count me in! That would be so much fun 🌿', NOW() - interval '6 hours', FALSE);
        END IF;


    END IF;
END $$;


DO $$
DECLARE
    v_u1_id bigint;
    v_u2_id bigint;
    v_low_id bigint;
    v_high_id bigint;
    v_conv_id bigint;
    v_sender_id bigint;
BEGIN
    SELECT id INTO v_u1_id FROM users WHERE username = 'leo_films';
    SELECT id INTO v_u2_id FROM users WHERE username = 'sarah_cinema';

    IF v_u1_id IS NOT NULL AND v_u2_id IS NOT NULL THEN
        v_low_id := LEAST(v_u1_id, v_u2_id);
        v_high_id := GREATEST(v_u1_id, v_u2_id);

        SELECT id INTO v_conv_id FROM conversations WHERE user_a_id = v_low_id AND user_b_id = v_high_id;
        IF v_conv_id IS NULL THEN
            INSERT INTO conversations (user_a_id, user_b_id, created_at)
            VALUES (v_low_id, v_high_id, NOW() - interval '4 days')
            RETURNING id INTO v_conv_id;
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'leo_films';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'Sarah! Did you see the Avengers: Endgame portal scene discussion in the club? Pure cinema history.') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'Sarah! Did you see the Avengers: Endgame portal scene discussion in the club? Pure cinema history.', NOW() - interval '34 hours', FALSE);
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'sarah_cinema';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'Chills every single time Alan Silvestri''s score swells and Cap says ''Avengers... assemble''. Still the peak of superhero cinema!') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'Chills every single time Alan Silvestri''s score swells and Cap says ''Avengers... assemble''. Still the peak of superhero cinema!', NOW() - interval '30 hours', FALSE);
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'leo_films';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'Silvestri''s brass section does all the heavy lifting. I still listen to the orchestral track while working.') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'Silvestri''s brass section does all the heavy lifting. I still listen to the orchestral track while working.', NOW() - interval '22 hours', FALSE);
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'sarah_cinema';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'Same here! It''s on my daily focus playlist 🎶') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'Same here! It''s on my daily focus playlist 🎶', NOW() - interval '15 hours', FALSE);
        END IF;


    END IF;
END $$;


DO $$
DECLARE
    v_u1_id bigint;
    v_u2_id bigint;
    v_low_id bigint;
    v_high_id bigint;
    v_conv_id bigint;
    v_sender_id bigint;
BEGIN
    SELECT id INTO v_u1_id FROM users WHERE username = 'alex_reads';
    SELECT id INTO v_u2_id FROM users WHERE username = 'marcus_binge';

    IF v_u1_id IS NOT NULL AND v_u2_id IS NOT NULL THEN
        v_low_id := LEAST(v_u1_id, v_u2_id);
        v_high_id := GREATEST(v_u1_id, v_u2_id);

        SELECT id INTO v_conv_id FROM conversations WHERE user_a_id = v_low_id AND user_b_id = v_high_id;
        IF v_conv_id IS NULL THEN
            INSERT INTO conversations (user_a_id, user_b_id, created_at)
            VALUES (v_low_id, v_high_id, NOW() - interval '4 days')
            RETURNING id INTO v_conv_id;
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'marcus_binge';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'Hey Alex! Do you think A Song of Ice and Fire books will ever get finished by GRRM, or did the TV show ending ruin book motivation for you?') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'Hey Alex! Do you think A Song of Ice and Fire books will ever get finished by GRRM, or did the TV show ending ruin book motivation for you?', NOW() - interval '55 hours', FALSE);
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'alex_reads';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'I still have hope for The Winds of Winter! The books have so many subplots that the show cut out—like Lady Stoneheart and the Dornish scheme.') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'I still have hope for The Winds of Winter! The books have so many subplots that the show cut out—like Lady Stoneheart and the Dornish scheme.', NOW() - interval '52 hours', FALSE);
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'marcus_binge';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'True, the book depth is unmatched. If you want masterclass TV writing that never dropped the ball though, you gotta watch The Wire.') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'True, the book depth is unmatched. If you want masterclass TV writing that never dropped the ball though, you gotta watch The Wire.', NOW() - interval '45 hours', FALSE);
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'alex_reads';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'It''s literally next on my watchlist! Samir also told me it''s peak television. Starting episode 1 this weekend.') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'It''s literally next on my watchlist! Samir also told me it''s peak television. Starting episode 1 this weekend.', NOW() - interval '38 hours', FALSE);
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'marcus_binge';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'Take your time with Season 1—it doesn''t spoon-feed you, but by episode 4 you''ll be completely hooked. All the pieces matter!') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'Take your time with Season 1—it doesn''t spoon-feed you, but by episode 4 you''ll be completely hooked. All the pieces matter!', NOW() - interval '30 hours', FALSE);
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'alex_reads';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'Will report back once I meet Omar Little!') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'Will report back once I meet Omar Little!', NOW() - interval '18 hours', FALSE);
        END IF;


    END IF;
END $$;


DO $$
DECLARE
    v_u1_id bigint;
    v_u2_id bigint;
    v_low_id bigint;
    v_high_id bigint;
    v_conv_id bigint;
    v_sender_id bigint;
BEGIN
    SELECT id INTO v_u1_id FROM users WHERE username = 'alex_reads';
    SELECT id INTO v_u2_id FROM users WHERE username = 'jordan_lit';

    IF v_u1_id IS NOT NULL AND v_u2_id IS NOT NULL THEN
        v_low_id := LEAST(v_u1_id, v_u2_id);
        v_high_id := GREATEST(v_u1_id, v_u2_id);

        SELECT id INTO v_conv_id FROM conversations WHERE user_a_id = v_low_id AND user_b_id = v_high_id;
        IF v_conv_id IS NULL THEN
            INSERT INTO conversations (user_a_id, user_b_id, created_at)
            VALUES (v_low_id, v_high_id, NOW() - interval '4 days')
            RETURNING id INTO v_conv_id;
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'jordan_lit';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'Alex, have you finished The Girl with the Dragon Tattoo yet? The investigative pacing in the second half is unreal.') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'Alex, have you finished The Girl with the Dragon Tattoo yet? The investigative pacing in the second half is unreal.', NOW() - interval '40 hours', FALSE);
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'alex_reads';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'Finished it last night! Lisbeth Salander is one of the most compelling protagonists in modern mystery fiction. Stieg Larsson was brilliant.') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'Finished it last night! Lisbeth Salander is one of the most compelling protagonists in modern mystery fiction. Stieg Larsson was brilliant.', NOW() - interval '35 hours', FALSE);
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'jordan_lit';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'Right?! And have you started The Kite Runner? Bring tissues when you do.') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'Right?! And have you started The Kite Runner? Bring tissues when you do.', NOW() - interval '28 hours', FALSE);
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'alex_reads';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'Already reading chapter 7... Khaled Hosseini writes with so much emotional weight. ''For you, a thousand times over'' hits hard.') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'Already reading chapter 7... Khaled Hosseini writes with so much emotional weight. ''For you, a thousand times over'' hits hard.', NOW() - interval '20 hours', FALSE);
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'jordan_lit';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'It really does. One of the rare books that changes how you look at forgiveness.') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'It really does. One of the rare books that changes how you look at forgiveness.', NOW() - interval '10 hours', FALSE);
        END IF;


    END IF;
END $$;


DO $$
DECLARE
    v_u1_id bigint;
    v_u2_id bigint;
    v_low_id bigint;
    v_high_id bigint;
    v_conv_id bigint;
    v_sender_id bigint;
BEGIN
    SELECT id INTO v_u1_id FROM users WHERE username = 'alex_reads';
    SELECT id INTO v_u2_id FROM users WHERE username = 'zoe_novels';

    IF v_u1_id IS NOT NULL AND v_u2_id IS NOT NULL THEN
        v_low_id := LEAST(v_u1_id, v_u2_id);
        v_high_id := GREATEST(v_u1_id, v_u2_id);

        SELECT id INTO v_conv_id FROM conversations WHERE user_a_id = v_low_id AND user_b_id = v_high_id;
        IF v_conv_id IS NULL THEN
            INSERT INTO conversations (user_a_id, user_b_id, created_at)
            VALUES (v_low_id, v_high_id, NOW() - interval '4 days')
            RETURNING id INTO v_conv_id;
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'zoe_novels';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'Alex, quick question: what did you think of the Catching Fire arena mechanics compared to the first Hunger Games book?') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'Alex, quick question: what did you think of the Catching Fire arena mechanics compared to the first Hunger Games book?', NOW() - interval '42 hours', FALSE);
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'alex_reads';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'The clock arena concept was ingenious! The suspense of figuring out each hour''s hazard made it impossible to put down.') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'The clock arena concept was ingenious! The suspense of figuring out each hour''s hazard made it impossible to put down.', NOW() - interval '38 hours', FALSE);
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'zoe_novels';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = '100%! Definitely Suzanne Collins at her absolute best.') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, '100%! Definitely Suzanne Collins at her absolute best.', NOW() - interval '30 hours', FALSE);
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'alex_reads';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'And Finnick Odair''s introduction with the sugar cube was iconic haha.') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'And Finnick Odair''s introduction with the sugar cube was iconic haha.', NOW() - interval '15 hours', FALSE);
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'zoe_novels';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'Finnick is our golden boy! 🔱') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'Finnick is our golden boy! 🔱', NOW() - interval '8 hours', FALSE);
        END IF;


    END IF;
END $$;


DO $$
DECLARE
    v_u1_id bigint;
    v_u2_id bigint;
    v_low_id bigint;
    v_high_id bigint;
    v_conv_id bigint;
    v_sender_id bigint;
BEGIN
    SELECT id INTO v_u1_id FROM users WHERE username = 'marcus_binge';
    SELECT id INTO v_u2_id FROM users WHERE username = 'maya_tv';

    IF v_u1_id IS NOT NULL AND v_u2_id IS NOT NULL THEN
        v_low_id := LEAST(v_u1_id, v_u2_id);
        v_high_id := GREATEST(v_u1_id, v_u2_id);

        SELECT id INTO v_conv_id FROM conversations WHERE user_a_id = v_low_id AND user_b_id = v_high_id;
        IF v_conv_id IS NULL THEN
            INSERT INTO conversations (user_a_id, user_b_id, created_at)
            VALUES (v_low_id, v_high_id, NOW() - interval '4 days')
            RETURNING id INTO v_conv_id;
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'maya_tv';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'Marcus!! Did you see the dinner party episode debate in The Office general channel? That episode is peak cringe comedy genius.') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'Marcus!! Did you see the dinner party episode debate in The Office general channel? That episode is peak cringe comedy genius.', NOW() - interval '50 hours', FALSE);
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'marcus_binge';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'That is easily a top 3 episode in all of television history! ''That is a $200 plasma screen TV you just killed!'' 😂') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'That is easily a top 3 episode in all of television history! ''That is a $200 plasma screen TV you just killed!'' 😂', NOW() - interval '45 hours', FALSE);
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'maya_tv';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'Hahaha Michael showing off the neon beer sign and the tiny fold-out TV screen! Never gets old.') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'Hahaha Michael showing off the neon beer sign and the tiny fold-out TV screen! Never gets old.', NOW() - interval '38 hours', FALSE);
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'marcus_binge';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'And Jan dancing awkwardly to Hunter''s song! Pure comedic perfection.') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'And Jan dancing awkwardly to Hunter''s song! Pure comedic perfection.', NOW() - interval '25 hours', FALSE);
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'maya_tv';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'Hahaha ''That one night! You made everything allriiight!'' It''s stuck in my head now!') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'Hahaha ''That one night! You made everything allriiight!'' It''s stuck in my head now!', NOW() - interval '12 hours', FALSE);
        END IF;


    END IF;
END $$;


DO $$
DECLARE
    v_u1_id bigint;
    v_u2_id bigint;
    v_low_id bigint;
    v_high_id bigint;
    v_conv_id bigint;
    v_sender_id bigint;
BEGIN
    SELECT id INTO v_u1_id FROM users WHERE username = 'david_k';
    SELECT id INTO v_u2_id FROM users WHERE username = 'marcus_binge';

    IF v_u1_id IS NOT NULL AND v_u2_id IS NOT NULL THEN
        v_low_id := LEAST(v_u1_id, v_u2_id);
        v_high_id := GREATEST(v_u1_id, v_u2_id);

        SELECT id INTO v_conv_id FROM conversations WHERE user_a_id = v_low_id AND user_b_id = v_high_id;
        IF v_conv_id IS NULL THEN
            INSERT INTO conversations (user_a_id, user_b_id, created_at)
            VALUES (v_low_id, v_high_id, NOW() - interval '4 days')
            RETURNING id INTO v_conv_id;
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'david_k';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'Marcus, rewatching Breaking Bad Season 5 episode ''Ozymandias''. Walter White''s downfall is pure Greek tragedy.') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'Marcus, rewatching Breaking Bad Season 5 episode ''Ozymandias''. Walter White''s downfall is pure Greek tragedy.', NOW() - interval '60 hours', FALSE);
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'marcus_binge';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'David, that hour of television might be the greatest episode ever filmed. Cranston''s acting in the desert and the phone call to Skyler...') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'David, that hour of television might be the greatest episode ever filmed. Cranston''s acting in the desert and the phone call to Skyler...', NOW() - interval '55 hours', FALSE);
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'david_k';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'Gave me goosebumps all over again. Nothing touches Vince Gilligan''s writing.') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'Gave me goosebumps all over again. Nothing touches Vince Gilligan''s writing.', NOW() - interval '48 hours', FALSE);
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'marcus_binge';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'And Dean Norris as Hank: ''You''re the smartest guy I ever met, and you''re too stupid to see... he made up his mind ten minutes ago.'' What a line.') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'And Dean Norris as Hank: ''You''re the smartest guy I ever met, and you''re too stupid to see... he made up his mind ten minutes ago.'' What a line.', NOW() - interval '36 hours', FALSE);
        END IF;


        SELECT id INTO v_sender_id FROM users WHERE username = 'david_k';
        IF NOT EXISTS (SELECT 1 FROM direct_messages WHERE conversation_id = v_conv_id AND content = 'Legendary TV.') THEN
            INSERT INTO direct_messages (conversation_id, sender_id, content, sent_at, deleted)
            VALUES (v_conv_id, v_sender_id, 'Legendary TV.', NOW() - interval '20 hours', FALSE);
        END IF;


    END IF;
END $$;

-- 4. Join existing clubs (Dune, Interstellar, Oppenheimer)

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

-- 5. Synchronize all identity sequences

SELECT setval(pg_get_serial_sequence('users', 'id'), COALESCE(MAX(id), 1)) FROM users;
SELECT setval(pg_get_serial_sequence('clubs', 'id'), COALESCE(MAX(id), 1)) FROM clubs;
SELECT setval(pg_get_serial_sequence('channels', 'id'), COALESCE(MAX(id), 1)) FROM channels;
SELECT setval(pg_get_serial_sequence('memberships', 'id'), COALESCE(MAX(id), 1)) FROM memberships;
SELECT setval(pg_get_serial_sequence('messages', 'id'), COALESCE(MAX(id), 1)) FROM messages;
SELECT setval(pg_get_serial_sequence('reactions', 'id'), COALESCE(MAX(id), 1)) FROM reactions;
SELECT setval(pg_get_serial_sequence('conversations', 'id'), COALESCE(MAX(id), 1)) FROM conversations;
SELECT setval(pg_get_serial_sequence('direct_messages', 'id'), COALESCE(MAX(id), 1)) FROM direct_messages;

COMMIT;