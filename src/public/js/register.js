const form = document.getElementById("registerForm");

registerForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(registerForm);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  // Envía los datos al servidor
  fetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Maneja la respuesta del servidor, por ejemplo, muestra un mensaje de éxito
      console.log(data.message);
      // Redirecciona al usuario a otra página si es necesario
      window.location.href = "/home"; // Cambia la URL de redirección según tus necesidades
    })
    .catch((error) => {
      // Maneja errores, por ejemplo, muestra un mensaje de error
      console.error("Error:", error);
    });
});
