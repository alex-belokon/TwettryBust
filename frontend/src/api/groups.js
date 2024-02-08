import { baseUrl } from "./baseUrl";

export const getGroups = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/groups`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // const jsonResponse = await response.json();
    const jsonResponse = [
      {
        id: 1,
        banner:
          "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663691/cld-sample-4.jpg",
        name: "Foodies United",
        description:
          "Долучайтеся до нашої групи та діліться улюбленими рецептами та кулінарними пригодами!",
        subscribersCount: 5200,
      },
      {
        id: 2,
        banner:
          "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663690/cld-sample.jpg",
        name: "Pawsome Pet Lovers",
        description:
          "Ласкаво просимо до нашої спільноти тваринних любителів! Розповідайте про своїх пухнастиків та переживайте разом!",
        subscribersCount: 3800,
      },
      {
        id: 3,
        banner:
          "https://res.cloudinary.com/dfrps0cby/image/upload/v1705663671/samples/animals/kitten-playing.gif",
        name: "Memelicious Moments",
        description:
          "Готові розважити свій день? Приєднуйтесь до нас і насолоджуйтеся найсмішнішими мемами та коміксами у мережі!",
        subscribersCount: 6200,
      },
    ];

    return jsonResponse;
  } catch (error) {
    console.error("Error fetch groups:", error.message);
  }
};
