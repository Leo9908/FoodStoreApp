// This is just an example,
// so you can safely delete all default props below

export default {
  nameSite: "Gustó",
  failed: "Acción fallida",
  success: "La acción fue exitosa",
  submited: "Enviado",
  wellcome: "Bienvenido",
  description: `Este es el sitio perfecto
                para comprar comida de
                excelente calidad desde la
                comodidad de su hogar.`,
  description2: `Alegrar corazones mediante
                 nuestra comida, es nuestro
                 proposito en la vida.`,
  buttons_labels: {
    reset: "Restaurar",
    confirm: "Confirmar",
    cancel: "Cancelar",
    accept: "Aceptar",
  },
  login_card: {
    fields: {
      user: "Nombre de usuario o correo",
      pass: "Contraseña",
      name: "Nombre ",
      last_name: "Apellidos",
      email: "Correo electrónico",
    },
    login: "Iniciar sesión",
    logout: "Cerrar sesión",
    logoutInfo: "¿Usted desea cerrar la sesión?",
    logoutMessage: "La sesión se ha cerrado",
    register: "Crear cuenta",
    userExist: "El usuario ya existe",
    ok: "Usted se ha registrado correctamente",
    logOk: "Usted se ha autenticado correctamente",
    logNotOk: "Debe registrarse",
    terms: "Debe aceptar los terminos",
    noCorrect: "Nombre de usuario o contraseña incorrectos",
    licence: "Primero debe aceptar la licencia y los términos",
    createAccount: "Crear tu cuenta en Gustó",
    withAccount: "¿Ya tienes una cuenta?",
    forgotten: "¿Olvidaste tu contraseña?",
    changePassoword: "Asistencia de contraseña",
    infoChangePass: `Ingrese la dirección de correo
                     electrónico o nombre de usuario
                     asociado con su cuenta de Gustó.`,
    required: "Intruduzca su nueva contraseña",
    sendingEmail: "Le hemos enviado un correo",
    errorSending: "No existe ningún usuario con esas credenciales",
    changedPass: "Cambio de contraseña exitoso",
    noEquals: "Las contraseñas deben coincidir",
  },
  products: {
    name: "Producto",
    breakfast: "Desayuno",
    lunch: "Almuerzo",
    dinner: "Cena",
    garnish: "Guarnición",
    fast_food: "Comida chatarra",
    canned_food: "Comida enlatada",
    side_dish: "Entremés",
    ratings: {
      thanks: "Gracias por su calificación",
    },
    errors: {
      select: "Por favor, seleccione algún producto",
      noProducts: `Lo sentimos. No hay productos
         en venta en estos momentos,
         por favor regrese más tarde. Gracias`,
      noMatches: "No hay coincidencias",
    },
  },
  index_tab: {
    most_sold: "Los más vendido",
    food: "Comida",
    combos: "Combos",
    favorite: "Mis favoritas",
  },
  index: {
    search: "Buscar",
  },
  carousel: {
    phrase1: "Comida deliciosa",
    subtitle1: "para todos los gustos",
    phrase2: "La mejor comida",
    subtitle2: "elaborada por los mejores chefs",
    phrase3: "Sabores cubanos",
    subtitle3: "que conquistan paladares",
    phrase4: "Nuestros combos",
    subtitle4: "la mejor opción para la familia",
  },
  edit_profile: {
    title: "Sobre mí",
    municipality: "Municipio",
    address: "Dirección",
    addressList: {
      name: "Direcciones",
      add: "Añadir dirección",
      subtitle: "Mis direcciones",
    },
    tabs: {
      basicInfo: "Información básica",
      addresses: "Direcciones de entrega",
    },
    table: {
      title: "Información",
      name: "Nombre",
      last_name: "Apellidos",
      email: "Correo electrónico",
      phone: "Teléfono",
      noPhone: "Sin teléfono",
    },
    edited: "Campo editado",
    noEdited: "No se ha podido editar el campo",
    hints: {
      email: "Entre su correo",
      phone: "Entre su teléfono",
    },
  },
  addresses: {
    table: {
      title: "Sus direcciones",
      columns: {
        alias: "Alias",
        address: "Dirección",
        apto: "Apartamento",
      },
    },
    actions: {
      edited: "Dirección editada",
      add: "Agregar dirección",
      added: "Dirección añadida",
    },
    errors: {
      noEdited: "Error al editar la dirección",
      noAdded: "Error durante de adición de la dirección",
    },
  },
  hints: {
    range: "Introduzca un número entre {0} y {1}",
  },
  errors: {
    digites: `Debe tener más de {0} dígitos`,
    digites2: `Por favor, use {0} caracteres`,
    range: `¡El valor debe estar entre {0} y {1}!`,
    letters: `Debe contener {0}`,
    emptyField: "Por favor escriba algo",
    required: "Campo obligatorio",
  },
  add_address: {
    city: "Ciudad",
    neighbourhood: "Vecindario", //vecindario
    road: "Carretera", //carretera
    county: "Municipio",
    apto: "Apartamento",
    alias: "Alias",
    alias_default: "Mi casa",
  },
  actions: {
    delete: "Eliminar {0}",
    add: "Añadir {0}",
  },
  responses: {
    deleted: "{0} eliminado",
    edited: "{0} editado",
    add: "{0} añadido",
    errors: {
      noDeleted: "Error al eliminar {0}",
      noEdited: "Error al editar {0}",
      noAdd: "Error al añadir {0}",
    },
  },
  orders: {
    table: {
      label: "Su pedido",
      columns: {
        product: "Producto",
        amount: "Cantidad",
        price: "Precio",
      },
    },
    form: {
      addresses: "Escoja las direcciones de entrega",
      phone: "Contacto",
    },
    send: "Pedido enviado",
    totalPrice: "Total",
  },
  admin: {
    title: "Gustó Administración",
    drawer: {
      item1: "Gestión de productos",
      item2: "Reportes de ventas",
      item3: "Tienda Gustó",
    },
    products: {
      table: {
        title: "Productos",
        columns: {
          c1: "Nombre",
          c2: "Precio",
          c3: "Tipo",
          c4: "¿En venta?",
          c5: "Calificación",
          c6: "Acciones",
          onSale: "Sí",
          noOnsale: "No",
        },
        actions: {
          a1: "Editar",
          a2: "Eliminar",
          confirm: "Confirmar",
          message: "¿Desea eliminar el producto?",
          save: "¿Desea salir sin guardar el producto?",
        },
        deleted: "",
        edited: "Producto editado",
      },
      edit: {
        title: "Edición de productos",
      },
      add: {
        title: "Nuevo producto",
      },
    },
  },
};
