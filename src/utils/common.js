exports.createCode = (length = 15) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomCode = "";

  for (let i = 0; i < length; i++)
    randomCode += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );

  return randomCode;
};

exports.calculateElapsedTime = (date1, date2) => {
  // Calculate the difference in milliseconds
  let diffInMs = date1 - date2;

  // Ensure a positive difference
  diffInMs = diffInMs < 0 ? diffInMs * -1 : diffInMs;

  // Convert the difference to days, hours, minutes, and seconds
  const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffInMs % (1000 * 60)) / 1000);

  return { days: days, hours: hours, minutes: minutes, seconds: seconds };
};

exports.convertTZ = (date) => {
  return new Date(
    (typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {
      timeZone: "America/Sao_Paulo",
    })
  );
};
