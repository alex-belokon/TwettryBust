CREATE TABLE IF NOT EXISTS Users (
                                     id VARCHAR(36) PRIMARY KEY,
                                     FirstName VARCHAR(255),
                                     LastName VARCHAR(255),
                                     Email VARCHAR(255),
                                     Password VARCHAR(255),
                                     DateOfBirth DATE,
                                     Address VARCHAR(255),
                                     Avatar VARCHAR(255),
                                     HeaderPhoto VARCHAR(255),
                                     UserName VARCHAR(255),
                                     BIO VARCHAR(255),
                                     Website VARCHAR(255),
                                     AccountActivated BOOLEAN,
                                     CredentialsExpirationDate DATE,
                                     AccountLocked BOOLEAN,
                                     AccountExpirationDate DATE,
                                     Version LONG
);

CREATE TABLE IF NOT EXISTS Subscriptions (
                                             id VARCHAR(36) PRIMARY KEY,
                                             FollowerID VARCHAR(36),
                                             FollowingID VARCHAR(36),
                                             FOREIGN KEY (FollowerID) REFERENCES Users(id),
                                             FOREIGN KEY (FollowingID) REFERENCES Users(id)
);

CREATE TABLE IF NOT EXISTS Notifications (
                                             id VARCHAR(36) PRIMARY KEY,
                                             UserID VARCHAR(36),
                                             Content VARCHAR(255),
                                             Date DATE,
                                             Type VARCHAR(255),
                                             Url VARCHAR(255),
                                             FOREIGN KEY (UserID) REFERENCES Users(id)
);

CREATE TABLE IF NOT EXISTS Posts (
                                     id VARCHAR(36) PRIMARY KEY,
                                     UserID VARCHAR(36),
                                     Content VARCHAR(255),
                                     Date DATE,
                                     Attachment VARCHAR(255),
                                     Type VARCHAR(255),
                                     OriginalPostID VARCHAR(36),
                                     FOREIGN KEY (UserID) REFERENCES Users(id),
                                     FOREIGN KEY (OriginalPostID) REFERENCES Posts(id)
);

CREATE TABLE IF NOT EXISTS Favorites (
                                         id VARCHAR(36) PRIMARY KEY,
                                         UserID VARCHAR(36),
                                         PostID VARCHAR(36),
                                         FOREIGN KEY (UserID) REFERENCES Users(id),
                                         FOREIGN KEY (PostID) REFERENCES Posts(id)
);

CREATE TABLE IF NOT EXISTS Chats (
                                     id VARCHAR(36) PRIMARY KEY,
                                     Date DATE
);

CREATE TABLE IF NOT EXISTS ChatUser (
                                        ChatID VARCHAR(36),
                                        UserID VARCHAR(36),
                                        FOREIGN KEY (ChatID) REFERENCES Chats(id),
                                        FOREIGN KEY (UserID) REFERENCES Users(id)
);

CREATE TABLE IF NOT EXISTS Messages (
                                        id VARCHAR(36) PRIMARY KEY,
                                        SenderID VARCHAR(36),
                                        Content VARCHAR(255),
                                        Date DATE,
                                        ChatID VARCHAR(36),
                                        FOREIGN KEY (SenderID) REFERENCES Users(id),
                                        FOREIGN KEY (ChatID) REFERENCES Chats(id)
);


INSERT INTO "USERS" (id, FirstName, LastName, Email, Password, DateOfBirth, Address, Avatar, HeaderPhoto, UserName, BIO, Website, AccountActivated, CredentialsExpirationDate, AccountLocked, AccountExpirationDate)
VALUES
    ('550e8400-e29b-41d4-a716-446655440000', 'John', 'Doe', 'john.doe@email.com', 'password1', '1990-01-01', '123 Main St', 'avatar1.jpg', 'header1.jpg', 'john_doe', 'Bio 1', 'http://website1.com', true, '2025-01-01', false, '2026-01-01'),
    ('550e8400-e29b-41d4-a716-446655440001', 'Jane', 'Smith', 'jane.smith@email.com', 'password2', '1995-05-15', '456 Oak St', 'avatar2.jpg', 'header2.jpg', 'jane_smith', 'Bio 2', 'http://website2.com', true, '2025-02-01', false, '2026-02-01'),
    ('550e8400-e29b-41d4-a716-446655440002', 'Bob', 'Johnson', 'bob.johnson@email.com', 'password3', '1985-10-20', '789 Pine St', 'avatar3.jpg', 'header3.jpg', 'bob_johnson', 'Bio 3', 'http://website3.com', true, '2025-03-01', false, '2026-03-01');

-- Вставка подписок
INSERT INTO Subscriptions (id, FollowerID, FollowingID)
VALUES
    ('550e8400-e29b-41d4-a716-446655440101', '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440001'),
    ('550e8400-e29b-41d4-a716-446655440102', '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440002'),
    ('550e8400-e29b-41d4-a716-446655440103', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002');

-- Вставка уведомлений
INSERT INTO Notifications (id, UserID, Content, Date, Type, Url)
VALUES
    ('550e8400-e29b-41d4-a716-446655440201', '550e8400-e29b-41d4-a716-446655440000', 'New follower: Jane Smith', '2024-01-15', 'Follower', '/profile/jane_smith'),
    ('550e8400-e29b-41d4-a716-446655440202', '550e8400-e29b-41d4-a716-446655440001', 'You have a new message', '2024-02-20', 'Message', '/inbox'),
    ('550e8400-e29b-41d4-a716-446655440203', '550e8400-e29b-41d4-a716-446655440002', 'Your post has been liked', '2024-03-25', 'Like', '/post/123');

-- Вставка постов
INSERT INTO Posts (id, UserID, Content, Date, Attachment, Type, OriginalPostID)
VALUES
    ('550e8400-e29b-41d4-a716-446655440201', '550e8400-e29b-41d4-a716-446655440000', 'Hello world!', '2024-01-01', 'attachment1.jpg', 'Text', NULL),
    ('550e8400-e29b-41d4-a716-446655440202', '550e8400-e29b-41d4-a716-446655440001', 'Check out my latest photo', '2024-02-01', 'attachment2.jpg', 'Photo', NULL),
    ('550e8400-e29b-41d4-a716-446655440203', '550e8400-e29b-41d4-a716-446655440002', 'Coding is fun!', '2024-03-01', 'attachment3.jpg', 'Text', NULL);

-- Вставка избранных записей
INSERT INTO Favorites (id, UserID, PostID)
VALUES
    ('550e8400-e29b-41d4-a716-446655440201', '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440201'),
    ('550e8400-e29b-41d4-a716-446655440202', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440202'),
    ('550e8400-e29b-41d4-a716-446655440203', '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440203');

-- Вставка чатов
INSERT INTO Chats (id, Date)
VALUES
    ('550e8400-e29b-41d4-a716-446655440201', '2024-01-01'),
    ('550e8400-e29b-41d4-a716-446655440202', '2024-02-01'),
    ('550e8400-e29b-41d4-a716-446655440203', '2024-03-01');

-- Вставка пользователей чата
INSERT INTO ChatUser (ChatID, UserID)
VALUES
    ('550e8400-e29b-41d4-a716-446655440201', '550e8400-e29b-41d4-a716-446655440000'),
    ('550e8400-e29b-41d4-a716-446655440201', '550e8400-e29b-41d4-a716-446655440001'),
    ('550e8400-e29b-41d4-a716-446655440202', '550e8400-e29b-41d4-a716-446655440001'),
    ('550e8400-e29b-41d4-a716-446655440202', '550e8400-e29b-41d4-a716-446655440002'),
    ('550e8400-e29b-41d4-a716-446655440203', '550e8400-e29b-41d4-a716-446655440000'),
    ('550e8400-e29b-41d4-a716-446655440203', '550e8400-e29b-41d4-a716-446655440002');

-- Вставка сообщений в чат
INSERT INTO Messages (id, SenderID, Content, Date, ChatID)
VALUES
    ('a87ee5a7-92b8-4fb1-8c6a-7c72bf81cd6d', '550e8400-e29b-41d4-a716-446655440000', 'Hi Jane!', '2024-01-02', '550e8400-e29b-41d4-a716-446655440201'),
    ('4a9951de-9350-4d4d-8db3-c1f6c2dfb2ac', '550e8400-e29b-41d4-a716-446655440001', 'Hello John!', '2024-01-02', '550e8400-e29b-41d4-a716-446655440201'),
    ('768f9304-715a-45fb-8742-7cecb9a10027', '550e8400-e29b-41d4-a716-446655440001', 'How are you?', '2024-02-02', '550e8400-e29b-41d4-a716-446655440202'),
    ('e045a7fb-9ac3-4d7f-93bb-988e1cb8b66b', '550e8400-e29b-41d4-a716-446655440002', 'Hi both!', '2024-02-02', '550e8400-e29b-41d4-a716-446655440202'),
    ('a23965b0-c1b3-4e35-bdea-8bbaa6e6567a', '550e8400-e29b-41d4-a716-446655440000', 'What"s up?', '2024-03-02', '550e8400-e29b-41d4-a716-446655440203'),
    ('15e03ab7-86bf-4bf5-9f41-68274ed0d9f2', '550e8400-e29b-41d4-a716-446655440002', 'Not much, just coding', '2024-03-02', '550e8400-e29b-41d4-a716-446655440203');
