import { baseUrl } from "./baseUrl";


export const getUserBookmarks = async (id, currentUserId) => {
  try {
    const response = await fetch(`${baseUrl}/api/bookmarks/${id}-${currentUserId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // const jsonResponse = await response.json();
    let jsonResponse;
    if(id === '987654'){
      jsonResponse = [
        {
          userId: "4444444",
          message: "Привіт! Як у вас справи?",
          date: new Date("2024-01-30T08:15:00"),
          imgUrl: 'http://res.cloudinary.com/dfrps0cby/image/upload/v1706875917/ydd8smvuyksoyzktepg8.jpg',
        },
        {
          userId: "987654",
          message: "Доброго дня! Все гаразд, дякую. Як я можу допомогти?",
          date: new Date("2024-01-30T08:30:00"),
        },
        {
          userId: "4444444",
          message: "Мені потрібна допомога з налаштуванням акаунту.",
          date: new Date("2024-01-30T09:05:00"),
        },
        {
          userId: "987654",
          message: "Звучить добре. Давайте разом вирішимо це.",
          date: new Date("2024-01-30T09:20:00"),
        },
        {
          userId: "4444444",
          message: "Дякую за вашу підтримку. Які ще опції доступні?",
          date: new Date("2024-01-30T10:00:00"),
          imgUrl: 'https://res.cloudinary.com/dfrps0cby/image/upload/v1706878848/ysgvmbblglzfyoo9rwl8.png'
        },
        {
          userId: "987654",
          message: "Ви можете перевірити меню налаштувань в особистому кабінеті.",
          date: new Date("2024-01-30T10:15:00"),
          imgUrl: 'https://res.cloudinary.com/dfrps0cby/image/upload/v1705663692/cld-sample-5.jpg',
        },
        {
          userId: "4444444",
          message: "Спробую, дякую за пораду!",
          date: new Date("2024-01-30T10:45:00"),
        },
        {
          userId: "987654",
          message: "Будь ласка! Якщо у вас ще будуть питання, не соромтеся запитувати.",
          date: new Date("2024-01-30T11:00:00"),
        },
        {
          userId: "4444444",
          message: "Обов'язково звернуся, якщо щось знадобиться. Дякую за допомогу! ",
          date: new Date("2024-01-30T11:30:00"),
          imgUrl: 'https://res.cloudinary.com/dfrps0cby/image/upload/v1706865760/scbb6kdwjh1vanfw7ohd.jpg',
        }, {
          userId: "987654",
          message: "Ви можете перевірити меню налаштувань в особистому кабінеті.",
          date: new Date("2024-01-30T10:15:00"),
          imgUrl: 'https://res.cloudinary.com/dfrps0cby/image/upload/v1705663692/cld-sample-5.jpg',
        },
        {
          userId: "4444444",
          message: "Спробую, дякую за пораду!",
          date: new Date("2024-01-30T10:45:00"),
        },
        {
          userId: "987654",
          message: "Будь ласка! Якщо у вас ще будуть питання, не соромтеся запитувати.",
          date: new Date("2024-01-30T11:00:00"),
        },
        {
          userId: "4444444",
          message: "Обов'язково звернуся, якщо щось знадобиться. Дякую за допомогу! ",
          date: new Date("2024-01-30T11:30:00"),
          imgUrl: 'https://res.cloudinary.com/dfrps0cby/image/upload/v1706865760/scbb6kdwjh1vanfw7ohd.jpg',
        },
      ];
    } else if(id === '876543'){
      jsonResponse = [
        {
          userId: "876543",
          message: "Доброго дня! Як я можу вам допомогти?",
          date: new Date("2024-02-01T13:45:00"),
          imgUrl: 'https://res.cloudinary.com/dfrps0cby/image/upload/v1705663692/cld-sample-5.jpg',
        },
        {
          userId: "4444444",
          message: "Привіт! Маю питання щодо вашого сервісу.",
          date: new Date("2024-02-01T14:00:00"),
        },
        {
          userId: "876543",
          message: "Звісно, раджу вам звернутися до нашого розділу допомоги.",
          date: new Date("2024-02-01T14:15:00"),
        },
        {
          userId: "4444444",
          message: "Дякую за пораду. Я також хочу дізнатися про акції та знижки.",
          date: new Date("2024-02-01T14:30:00"),
          imgUrl: 'https://res.cloudinary.com/dfrps0cby/image/upload/v1705663684/samples/breakfast.jpg',
        },
        {
          userId: "876543",
          message: "Зараз перевірю інформацію для вас.",
          date: new Date("2024-02-01T14:45:00"),
        },
        {
          userId: "4444444",
          message: "Дякую. Також цікавить, як можна змінити особисті дані в акаунті.",
          date: new Date("2024-02-01T15:00:00"),
        },
        {
          userId: "876543",
          message: "Ви можете змінити особисті дані у своєму особистому кабінеті.",
          date: new Date("2024-02-01T15:15:00"),
        },
        {
          userId: "4444444",
          message: "Дуже дякую за відповіді! Буду звертатися ще.",
          date: new Date("2024-02-01T15:30:00"),
        },
      ];
    } else if (id === '432109') {
      jsonResponse = [
        {
          userId: "4444444",
          message: "Hey! How's it going? I heard you got a new pet. Tell me about it!",
          date: new Date("2024-02-10T15:30:00"),
        },
        {
          userId: "432109",
          message: "Hi! Yes, I got a cat recently. Her name is Whiskers, and she's so playful!",
          date: new Date("2024-02-10T15:45:00"),
        },
        {
          userId: "432109",
          message: "That's awesome! What breed is she? I've been thinking about getting a pet too.",
          date: new Date("2024-02-10T16:00:00"),
        },
        {
          userId: "4444444",
          message: "She's a Siamese mix. I adopted her from a local shelter. Such a sweetheart!",
          date: new Date("2024-02-10T16:15:00"),
        },
        {
          userId: "432109",
          message: "Siamese cats are beautiful! What made you decide to adopt?",
          date: new Date("2024-02-10T16:30:00"),
        },
        {
          userId: "4444444",
          message: "I wanted to give a home to a cat in need. It's been a rewarding experience.",
          date: new Date("2024-02-10T16:45:00"),
        },
        {
          userId: "432109",
          message: "That's so kind of you. Pets really make our lives brighter. How's Whiskers settling in?",
          date: new Date("2024-02-10T17:00:00"),
        },
        {
          userId: "4444444",
          message: "She's adjusting well. Exploring every nook and cranny. It's been a joy having her around.",
          date: new Date("2024-02-10T17:15:00"),
        },
        {
          userId: "432109",
          message: "I'm glad to hear that. Maybe our pets can have a playdate sometime!",
          date: new Date("2024-02-10T17:30:00"),
        },
        {
          userId: "4444444",
          message: "Absolutely! That sounds like a great idea. Let's plan something soon.",
          date: new Date("2024-02-10T17:45:00"),
        },
        {
          userId: "432109",
          message: "Looking forward to it! Thanks for sharing about Whiskers.",
          date: new Date("2024-02-10T18:00:00"),
        },
        {
          userId: "4444444",
          message: "No problem! Anytime you want to chat about pets, I'm here.",
          date: new Date("2024-02-10T18:15:00"),
        },
      ];
    } else {
      jsonResponse = [
      {
        userId: "654321",
        message: "Привіт! Як у тебе справи? Я чула, у тебе новий домашній улюбленець!",
        date: new Date("2024-02-05T17:30:00"),
      },
      {
        userId: "4444444",
        message: "Так, привіт! Тепер у мене є собака. Вона така чарівна!",
        date: new Date("2024-02-05T17:45:00"),
      },
      {
        userId: "4444444",
        message: "Це звичайний метис. Взяла його з притулку. Дуже розумний та лагідний!",
        date: new Date("2024-02-05T18:15:00"),
      },
      {
        userId: "654321",
        message: "Я впевнена, вони завжди принесуть тобі радість! Що його ім'я?",
        date: new Date("2024-02-05T18:30:00"),
      },
      {
        userId: "4444444",
        message: "Назвала його Макс. Як у тебе з тваринами?",
        date: new Date("2024-02-05T18:45:00"),
      },
      {
        userId: "654321",
        message: "У мене кішка Луна. Вона така ніжна та грайлива. Ти б не повірила!",
        date: new Date("2024-02-05T19:00:00"),
      },
    ];
    }
    
    return jsonResponse;
  } catch (error) {
    console.error('Error fetch user messages:', error.message);
  }
};

export const getUserDialogs = async (userId) => {
  try {
    const response = await fetch(`${baseUrl}/api/messages/${userId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // const jsonResponse = await response.json();
    const jsonResponse = [
      {
        name: "John",
        lastName: "Doe",
        login: "john_doe",
        lastMessage: "Hello there!",
        dateOfLastMessage: "2024-01-30",
        userScreensaver: "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663685/samples/look-up.jpg",
        id: 987654,
      },
      {
        name: "Jane",
        lastName: "Smith",
        login: "jane_smith",
        lastMessage: "How are you?",
        dateOfLastMessage: "2023-12-15",
        userScreensaver: "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663685/samples/outdoor-woman.jpg",
        id: 876543,
      },
      {
        name: "Olivia",
        lastName: "White",
        login: "olivia_w",
        lastMessage: "Missed you!",
        dateOfLastMessage: "2023-08-25",
        userScreensaver: "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663671/samples/animals/kitten-playing.gif",
        id: 432109,
      },
      {
        name: "Daniel",
        lastName: "Brown",
        login: "daniel_b",
        lastMessage: "How's your day going?",
        dateOfLastMessage: "2023-07-12",
        userScreensaver: "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663667/samples/people/bicycle.jpg",
        id: 321098,
      }
    ];

    return jsonResponse;
  } catch (error) {
    console.error('Error fetch user Dialogs:', error.message);
  }
};