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
  // Converta as horas fornecidas para o formato Date
  const dataHora1 = new Date(date1);
  const dataHora2 = new Date(date2);

  console.log(dataHora1);
  console.log(date2);

  // Calcule a diferença em milissegundos
  const diferencaEmMilissegundos = dataHora2 - dataHora1;

  // Converta a diferença para horas, minutos e segundos
  const horas = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60));
  const minutos = Math.floor(
    (diferencaEmMilissegundos % (1000 * 60 * 60)) / (1000 * 60)
  );

  // Create an object to store the results
  const response = { horas: horas, minutos: minutos };

  return response;
};
