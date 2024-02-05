CREATE TABLE IF NOT EXISTS  Users (
    id UUID PRIMARY KEY,
    FirstName text,
    LastName text,
    Email text,
    Password text,
    DateOfBirth date,
    Address text,
    Avatar text,
    HeaderPhoto text,
    UserName text,
    BIO text,
    Website text,
    AccountActivated boolean,
    CredentialsExpirationDate date,
    AccountLocked boolean,
    AccountExpirationDate date
);

CREATE TABLE IF NOT EXISTS  subscriptions (
     id UUID PRIMARY KEY,
     FollowerID UUID REFERENCES Users(ID),
     FollowingID UUID REFERENCES Users(ID)
 );


CREATE TABLE IF NOT EXISTS  Notifications (
    id UUID PRIMARY KEY,
    UserID UUID REFERENCES Users(ID),
    Content TEXT,
    Date DATE,
    Type TEXT,
    Url TEXT
);

CREATE TABLE IF NOT EXISTS  Posts (
    id UUID PRIMARY KEY,
    UserID UUID REFERENCES Users(ID),
    Content TEXT,
    Date DATE,
    Attachment TEXT,
    Type TEXT,
    OriginalPostID UUID
);

CREATE TABLE IF NOT EXISTS  Favorites (
    id UUID PRIMARY KEY,
    UserID UUID REFERENCES Users(ID),
    PostID UUID REFERENCES Posts(ID)
);

CREATE TABLE IF NOT EXISTS  Chat (
    id UUID PRIMARY KEY,
    Date DATE
);

CREATE TABLE IF NOT EXISTS  ChatUser (
    ChatID UUID REFERENCES Chat(ID),
    UserID UUID REFERENCES Users(ID),
    PRIMARY KEY (ChatID, UserID)
);

CREATE TABLE IF NOT EXISTS  Messages (
    id UUID PRIMARY KEY,
    SenderID UUID REFERENCES Users(ID),
    Content TEXT,
    Date DATE,
    ChatID UUID REFERENCES Chat(ID)
);

-- Вставка користувачів
INSERT INTO Users (id, FirstName, LastName, Email, Password, DateOfBirth, Address, Avatar, HeaderPhoto, UserName, BIO, Website, AccountActivated, CredentialsExpirationDate, AccountLocked, AccountExpirationDate)
VALUES
  ('550e8400-e29b-41d4-a716-446655440000', 'John', 'Doe', 'john.doe@email.com', 'password1', '1990-01-01', '123 Main St', 'avatar1.jpg', 'header1.jpg', 'john_doe', 'Bio 1', 'http://website1.com', true, '2025-01-01', false, '2026-01-01'),
  ('550e8400-e29b-41d4-a716-446655440001', 'Jane', 'Smith', 'jane.smith@email.com', 'password2', '1995-05-15', '456 Oak St', 'avatar2.jpg', 'header2.jpg', 'jane_smith', 'Bio 2', 'http://website2.com', true, '2025-02-01', false, '2026-02-01'),
  ('550e8400-e29b-41d4-a716-446655440002', 'Bob', 'Johnson', 'bob.johnson@email.com', 'password3', '1985-10-20', '789 Pine St', 'avatar3.jpg', 'header3.jpg', 'bob_johnson', 'Bio 3', 'http://website3.com', true, '2025-03-01', false, '2026-03-01');

-- Вставка підписок
INSERT INTO subscriptions (id, FollowerID, FollowingID)
VALUES
  ('550e8400-e29b-41d4-a716-446655440101', '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440001'),
  ('550e8400-e29b-41d4-a716-446655440102', '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440002'),
  ('550e8400-e29b-41d4-a716-446655440103', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002');


-- Вставка повідомлень
-- Вставка повідомлень
INSERT INTO Notifications (id, UserID, Content, Date, Type, Url)
VALUES
  ('550e8400-e29b-41d4-a716-446655440201', '550e8400-e29b-41d4-a716-446655440000', 'New follower: Jane Smith', '2024-01-15', 'Follower', '/profile/jane_smith'),
  ('550e8400-e29b-41d4-a716-446655440202', '550e8400-e29b-41d4-a716-446655440001', 'You have a new message', '2024-02-20', 'Message', '/inbox'),
  ('550e8400-e29b-41d4-a716-446655440203', '550e8400-e29b-41d4-a716-446655440002', 'Your post has been liked', '2024-03-25', 'Like', '/post/123');


-- Вставка постів
INSERT INTO Posts (id, UserID, Content, Date, Attachment, Type, OriginalPostID)
VALUES
  ('550e8400-e29b-41d4-a716-446655440201', '550e8400-e29b-41d4-a716-446655440000', 'Hello world!', '2024-01-01', 'attachment1.jpg', 'Text', NULL),
  ('550e8400-e29b-41d4-a716-446655440202', '550e8400-e29b-41d4-a716-446655440001', 'Check out my latest photo', '2024-02-01', 'attachment2.jpg', 'Photo', NULL),
  ('550e8400-e29b-41d4-a716-446655440203', '550e8400-e29b-41d4-a716-446655440002', 'Coding is fun!', '2024-03-01', 'attachment3.jpg', 'Text', NULL);

-- Вставка улюблених записів
INSERT INTO Favorites (id, UserID, PostID)
VALUES
  ('550e8400-e29b-41d4-a716-446655440201', '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440201'),
  ('550e8400-e29b-41d4-a716-446655440202', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440202'),
  ('550e8400-e29b-41d4-a716-446655440203', '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440203');

-- Вставка чатів
INSERT INTO Chat (id, Date)
VALUES
  ('550e8400-e29b-41d4-a716-446655440201', '2024-01-01'),
  ('550e8400-e29b-41d4-a716-446655440202', '2024-02-01'),
  ('550e8400-e29b-41d4-a716-446655440203', '2024-03-01');

-- Вставка користувачів чату
INSERT INTO ChatUser (ChatID, UserID)
VALUES
  ('550e8400-e29b-41d4-a716-446655440201', '550e8400-e29b-41d4-a716-446655440000'),
  ('550e8400-e29b-41d4-a716-446655440201', '550e8400-e29b-41d4-a716-446655440001'),
  ('550e8400-e29b-41d4-a716-446655440202', '550e8400-e29b-41d4-a716-446655440001'),
  ('550e8400-e29b-41d4-a716-446655440202', '550e8400-e29b-41d4-a716-446655440002'),
  ('550e8400-e29b-41d4-a716-446655440203', '550e8400-e29b-41d4-a716-446655440000'),
  ('550e8400-e29b-41d4-a716-446655440203', '550e8400-e29b-41d4-a716-446655440002');

-- Вставка повідомлень у чат
INSERT INTO Messages (id, SenderID, Content, Date, ChatID)
VALUES
  ('a87ee5a7-92b8-4fb1-8c6a-7c72bf81cd6d', '550e8400-e29b-41d4-a716-446655440000', 'Hi Jane!', '2024-01-02', '550e8400-e29b-41d4-a716-446655440201'),
  ('4a9951de-9350-4d4d-8db3-c1f6c2dfb2ac', '550e8400-e29b-41d4-a716-446655440001', 'Hello John!', '2024-01-02', '550e8400-e29b-41d4-a716-446655440201'),
  ('768f9304-715a-45fb-8742-7cecb9a10027', '550e8400-e29b-41d4-a716-446655440001', 'How are you?', '2024-02-02', '550e8400-e29b-41d4-a716-446655440202'),
  ('e045a7fb-9ac3-4d7f-93bb-988e1cb8b66b', '550e8400-e29b-41d4-a716-446655440002', 'Hi both!', '2024-02-02', '550e8400-e29b-41d4-a716-446655440202'),
  ('a23965b0-c1b3-4e35-bdea-8bbaa6e6567a', '550e8400-e29b-41d4-a716-446655440000', 'What"s up?', '2024-03-02', '550e8400-e29b-41d4-a716-446655440203'),
  ('15e03ab7-86bf-4bf5-9f41-68274ed0d9f2', '550e8400-e29b-41d4-a716-446655440002', 'Not much, just coding', '2024-03-02', '550e8400-e29b-41d4-a716-446655440203');
