CREATE TABLE Users (
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
                       Version INT,
                       Account_Activated BOOLEAN,
                       Account_Expiration_Date DATE,
                       Account_Locked BOOLEAN,
                       Credentials_Expiration_Date DATE,
                       Date_Of_Birth DATE,
                       First_Name VARCHAR(255),
                       Header_Photo VARCHAR(255),
                       Last_Name VARCHAR(255),
                       Location VARCHAR(255),
                       User_Name VARCHAR(255)
);
CREATE TABLE Subscriptions (
                               id VARCHAR(36) PRIMARY KEY,
                               FollowerID VARCHAR(36),
                               FollowingID VARCHAR(36),
                               FOREIGN KEY (FollowerID) REFERENCES Users(id),
                               FOREIGN KEY (FollowingID) REFERENCES Users(id)
);

CREATE TABLE Notifications (
                               id VARCHAR(36) PRIMARY KEY,
                               UserID VARCHAR(36),
                               Content VARCHAR(255),
                               Date DATE,
                               Type VARCHAR(255),
                               Url VARCHAR(255),
                               FOREIGN KEY (UserID) REFERENCES Users(id)
);

CREATE TABLE Posts (
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

CREATE TABLE Favorites (
                           id VARCHAR(36) PRIMARY KEY,
                           UserID VARCHAR(36),
                           PostID VARCHAR(36),
                           FOREIGN KEY (UserID) REFERENCES Users(id),
                           FOREIGN KEY (PostID) REFERENCES Posts(id)
);

CREATE TABLE Chat (
                      id VARCHAR(36) PRIMARY KEY,
                      Date DATE
);

CREATE TABLE ChatUser (
                          ChatID VARCHAR(36),
                          UserID VARCHAR(36),
                          FOREIGN KEY (ChatID) REFERENCES Chat(id),
                          FOREIGN KEY (UserID) REFERENCES Users(id)
);

CREATE TABLE Messages (
                          id VARCHAR(36) PRIMARY KEY,
                          SenderID VARCHAR(36),
                          Content VARCHAR(255),
                          Date DATE,
                          ChatID VARCHAR(36),
                          FOREIGN KEY (SenderID) REFERENCES Users(id),
                          FOREIGN KEY (ChatID) REFERENCES Chat(id)
);
