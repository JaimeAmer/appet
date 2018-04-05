-- ----------Filas Protectoras------------

INSERT INTO `protectora`(`nombre`, `ciudad`, `imagen`, `email`, `password`, `direccion`, `telefono`, `pendiente`, `descripcion`) 
VALUES ("Abrazo Animal", "Madrid","abrazoanimal.png","abrazoanimal@gmail.com", "1234","Goya 3, 2b", 901654321, false,
"La Asociaci�n Abrazo Animal (Abrazo Animal) es una entidad sin �nimo de lucro que se constituy� en Madrid (Espa�a) en 2014, 
como respuesta al elevado n�mero de animales que necesitan una protecci�n real en nuestro pa�s y a la deficiente atenci�n de 
que son objeto por parte de la administraci�n, que hasta el momento y salvo pocas excepciones, no han sabido resolver el 
problema de una manera efectiva y �tica.");

INSERT INTO `protectora`(`nombre`, `ciudad`, `imagen`, `email`, `password`, `direccion`, `telefono`, `pendiente`, `descripcion`) 
VALUES ("S.P.A.P.", "Madrid", "spap.png", "spap@gmail.com", "1234", "Princesa, 1,  1a",901123456, false, 
"Toda una vida dedicada a los animales y al medio ambiente. La Sociedad Protectora de Animales y Plantas de Madrid lleva trabajando m�s 
de setenta y cinco a�os para estimular el respeto, cuidado y cari�o por los animales y por el medio ambiente. ");

INSERT INTO `protectora`(`nombre`, `ciudad`, `imagen`, `email`, `password`, `direccion`, `telefono`, `pendiente`, `descripcion`) 
VALUES ("Asociacion las Nieves", "Madrid", "lasnieves.png", "lasnieves@gmail.com", "1234", "Castellana, 1,  1c", 901987654, false, 
"En la Asociaci�n LAS NIEVES para la Protecci�n Animal buscamos adoptantes responsables que deseen incluir un nuevo miembro en su familia");

INSERT INTO `protectora`(`nombre`, `ciudad`, `imagen`, `email`, `password`, `direccion`, `telefono`, `pendiente`, `descripcion`) 
VALUES ("Bichosraros", "Madrid", "bichosraros.png", "bichosraros@gmail.com", "1234", "Jardines, 41, 3b", 901456789, false, 
"La asociaci�n de ayuda y apoyo a los animales abandonados, bichosraros.org, nace en Madrid, como fruto de nuestro deseo de ayudar 
de una manera m�s estructurada a los animales con necesidades especiales, a los que llamamos cari�osamente nuestros �bichos raros�.");

INSERT INTO `protectora`(`nombre`, `ciudad`, `imagen`, `email`, `password`, `direccion`, `telefono`, `pendiente`, `descripcion`) 
VALUES ("Ciudad Animal", "Madrid", "ciudadanimal.png", "ciudadanimal@gmail.com", "1234", "Arg�elles, 15, 1d", 901666555, true, 
"El Refugio de Animales Abandonados Ciudad Animal es un asociaci�n sin �nimo de lucro, legalmente constituida, cuyo objetivo es salvar, 
recuperar, cuidar, proteger, y buscar nuevas vidas a trav�s de la adopci�n para los animales abandonados.");

-- --------------Filas Perros-------------

INSERT INTO `perro`(`idProtectora`, `nombre`, `foto`, `edad`, `raza`, `color`, `peso`, `descripcion`, `fallecido`) 
VALUES (1, "Baby", "baby.png", 2, "collie", "golden", 15, "Muy amigable, obediente, le gusta estar cerca de los suyos.... ",false);

INSERT INTO `perro`(`idProtectora`, `nombre`, `foto`, `edad`, `raza`, `color`, `peso`, `descripcion`, `fallecido`) 
VALUES (1, "Cari", "cari.png", 3, "weimaraner", "marron", 25, "Muy amigable, obediente, es fiel y le gusta estar activo",false);

INSERT INTO `perro`(`idProtectora`, `nombre`, `foto`, `edad`, `raza`, `color`, `peso`, `descripcion`, `fallecido`) 
VALUES (1, "Cuco", "cuco.png", 4, "corgi gales de Cardigan", "golden", 17, "Travieso, con buenos instintos y solitario",false);

INSERT INTO `perro`(`idProtectora`, `nombre`, `foto`, `edad`, `raza`, `color`, `peso`, `descripcion`, `fallecido`) 
VALUES (2, "Nano", "nano.png", 5, "bull terrier", "blanco", 28, "Fiel, defensor, fuerte y gran amigo",false);

INSERT INTO `perro`(`idProtectora`, `nombre`, `foto`, `edad`, `raza`, `color`, `peso`, `descripcion`, `fallecido`) 
VALUES (2, "Samy", "samy.png", 3, "beagle", "con manchas", 16, "Cari�oso, jugueton y muy activo",false);

INSERT INTO `perro`(`idProtectora`, `nombre`, `foto`, `edad`, `raza`, `color`, `peso`, `descripcion`, `fallecido`) 
VALUES (3, "Pixi", "pixi.png", 1, "cavalier king", "blanco y marron", 4, "Leal, agresivo, y con mucha presencia.",false);

INSERT INTO `perro`(`idProtectora`, `nombre`, `foto`, `edad`, `raza`, `color`, `peso`, `descripcion`, `fallecido`) 
VALUES (4, "Simba", "simba.png", 5, "boxer", "marron", 20, "Tranquilo, obediente y con mucho cari�o que ofrecer",false);

