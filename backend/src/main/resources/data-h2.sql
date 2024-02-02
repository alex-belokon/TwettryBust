CREATE TABLE IF NOT EXISTS Users (
                                     id UUID PRIMARY KEY,
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
    AccountExpirationDate DATE
    );

CREATE TABLE IF NOT EXISTS subscriptions (
                                             id UUID PRIMARY KEY,
                                             FollowerID UUID REFERENCES Users(ID),
    FollowingID UUID REFERENCES Users(ID)
    );

CREATE TABLE IF NOT EXISTS Notifications (
                                             id UUID PRIMARY KEY,
                                             UserID UUID REFERENCES Users(ID),
    Content TEXT,
    Date DATE,
    Type TEXT,
    Url TEXT
    );

-- Используем функцию UUID() вместо CREATE EXTENSION для H2
CREATE TABLE IF NOT EXISTS Posts (
    id UUID DEFAULT RANDOM_UUID() PRIMARY KEY,
    UserID UUID REFERENCES Users(ID),
    Content TEXT,
    Date DATE,
    Attachment TEXT,
    Type TEXT,
    OriginalPostID UUID
    );

CREATE TABLE IF NOT EXISTS Favorites (
                                         id UUID PRIMARY KEY,
                                         UserID UUID REFERENCES Users(ID),
                                         PostID UUID REFERENCES Posts(ID)
                                     );

CREATE TABLE IF NOT EXISTS Chat (
                                    id UUID PRIMARY KEY,
                                    Date DATE
);

CREATE TABLE IF NOT EXISTS ChatUser (
    ChatID UUID REFERENCES Chat(ID),
    UserID UUID REFERENCES Users(ID),
    PRIMARY KEY (ChatID, UserID)
    );

CREATE TABLE IF NOT EXISTS Messages (
                                        id UUID PRIMARY KEY,
                                        SenderID UUID REFERENCES Users(ID),
                                        Content TEXT,
                                        Date DATE,
                                        ChatID UUID REFERENCES Chat(ID)
    );
