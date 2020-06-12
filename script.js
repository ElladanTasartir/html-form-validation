const fields = document.querySelectorAll("[required]");

function validateField(field) {
  function verifyErrors() {
    let foundError = false;

    for (let error in field.validity) {
      if (field.validity[error] && !field.validity.valid) {
        foundError = error;
      }
    }
    return foundError;
  }

  function customMessage(typeError) {
    const messages = {
      text: {
        valueMissing: "Por favor, preencha este campo",
      },
      email: {
        valueMissing: "Email é obrigatório",
        typeMismatch: "Por favor, preencha um email válido",
      },
    };

    return messages[field.type][typeError];
  }

  function setCustomMessage(message) {
    const spanError = field.parentNode.querySelector("span.error"); //Subiu do field ao node pai, no caso o .input
    //e procurou pelo filho span.error
    if (message) {
      spanError.classList.add("active");
      spanError.innerHTML = message;
    } else {
      spanError.classList.remove("active");
      spanError.innerHTML = "";
    }
  }

  return function () {
    const error = verifyErrors();

    if (error) {
      const message = customMessage(error);
      field.style.borderColor = "red";
      setCustomMessage(message);
    } else {
      field.style.borderColor = "green";
      setCustomMessage();
    }
  };
}

function customValidation(event) {
  const field = event.target;
  const validation = validateField(field);
  validation();
}

for (let field of fields) {
  field.addEventListener("invalid", (event) => {
    // Eliminar o bubble
    event.preventDefault();

    customValidation(event);
  }); //evento disponível quando colocamos o campo required no html
  field.addEventListener("blur", customValidation); //Evento quando algo perde o foco
}

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
});
