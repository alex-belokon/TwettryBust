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
