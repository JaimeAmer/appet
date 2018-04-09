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
VALUES (1, "Baby", "baby.png", 4, "teckel", "gris y marron", 16, "Baby es un perro bueno con otros perros y muy amigable con 
personas, tanto ni�os como personas adultas, muy cari�oso, es t�mida con la gente que no conoce, ladra un poco cuando se pone 
nerviosa, est� esterilizada y lleva con nuestra protectora desde hace un a�o y tres meses",false);

INSERT INTO `perro`(`idProtectora`, `nombre`, `foto`, `edad`, `raza`, `color`, `peso`, `descripcion`, `fallecido`) 
VALUES (1, "Cari", "cari.png", 3, "samoyedo", "blanco", 9, "Cari  aunque es un perro un poco t�mida cuando no conoce a nadie, en 
cuanto tiene confianza le encanta recibir mimos y jugar con cualquier perro o persona que le preste atenci�n. Tiene solo tres a�os, 
sabe pasear perfectamente con correa y le encanta estar en el parque.",false);

INSERT INTO `perro`(`idProtectora`, `nombre`, `foto`, `edad`, `raza`, `color`, `peso`, `descripcion`, `fallecido`) 
VALUES (1, "Cuco", "cuco.png", 1, "rottweiler ", "negro y marron", 2, "Cuco es un perro peque�o lo que le hace ser muy tierno, 
es un perro que tiene un a�o el cual naci� aqu� con nosotros junto a tres hermanos m�s, es un perro muy cari�oso y tranquilo, 
nunca ha compartido una vida en una casa, ideal para los ni�os los cuales seguros que los trataran muy bien.",false);

INSERT INTO `perro`(`idProtectora`, `nombre`, `foto`, `edad`, `raza`, `color`, `peso`, `descripcion`, `fallecido`) 
VALUES (2, "Nano", "nano.png", 5, "pastor aleman", "marron", 22, "Nano lleg� a nuestra protectora cuando era s�lo un cachorro. 
Tuvo la suerte de ser adoptado, pero su due�o ya no lo puede tener. Ahora est� otra vez con nosotros esperando otra oportunidad. 
Es muy cari�oso y necesita que le tengan paciencia y le ense�en a convivir con lo que ser� el mejor amigo.",false);

INSERT INTO `perro`(`idProtectora`, `nombre`, `foto`, `edad`, `raza`, `color`, `peso`, `descripcion`, `fallecido`) 
VALUES (2, "Samy", "samy.png", 3, "galgo saluki", "gris y blanco", 25, "Sammy disfruta mucho en el campo corriendo y no se cansa
 nunca, un perro muy activo y travieso que har� disfrutar a su nuevo due�o. Le gusta estar con otros perros, le encanta echarse 
 la siesta despu�s de comer, este perro necesita unos ni�os los cuales le hagan disfrutar de la vida.",false);

INSERT INTO `perro`(`idProtectora`, `nombre`, `foto`, `edad`, `raza`, `color`, `peso`, `descripcion`, `fallecido`) 
VALUES (3, "Pixi", "pixi.png", 1, "cavalier king", "blanco y marron", 2, "Pixi es un perro muy divertido y peque�o, le cambi� 
la suerte cuando lo encontraron y lo rescataron, su rescatadora lo cri� a biber�n a �l y a sus 6 hermanitos, despu�s de encontrarlos 
abandonados a su suerte en un invernadero. Luego vino con nosotros demostrandonos que es muy alegre y que tiene muchas ganas de vivir 
junto a una familia cari�osa y alegre.",false);

INSERT INTO `perro`(`idProtectora`, `nombre`, `foto`, `edad`, `raza`, `color`, `peso`, `descripcion`, `fallecido`) 
VALUES (4, "Simba", "simba.png", 6, "boxer", "marron", 20, "Simba ha tenido una familia pero Simba no ha tenido buena suerte y ha 
sufrido mucho. Por lo cual ha vuelto con nosotros, echa mucho de menos vivir con personas que le quieran y le den otra oportunidad, 
ya que es muy dulce, es tranquila, equilibrada y cari�osa. Adoptarla ser�a una buena opci�n.",false);

-- --------------Filas Perros (incremento) -------------

INSERT INTO `perro`(`idProtectora`, `nombre`, `foto`, `edad`, `raza`, `color`, `peso`, `descripcion`, `fallecido`) 
VALUES (4, "Felix", "felix.png", 4, "papillon", "golden", 13, "F�lix fue abandonado en la carretera, fue ah� donde se le encontr�,
 ten�a mucha desconfianza con las personas y se asustaba demasiado, poco a poco ha ido ganando confianza, le gusta jugar mucho y 
 es la hora de que tenga una familia la cual le pueda cuidar y tener otra oportunidad.",false);
 
INSERT INTO `perro`(`idProtectora`, `nombre`, `foto`, `edad`, `raza`, `color`, `peso`, `descripcion`, `fallecido`) 
VALUES (4, "Snoopy", "snoopy.png", 3, "mestizo", "gris y marron", 16, "Snoopy es un perro tan alegre que ha encantado a todos en 
la protectora, a nosotros y a todos sus compa�eros, porque es un perro lleno de energ�a, de ilusiones, de cari�o y de emociones... 
y por ello necesita una familia dispuesta a darle buenos paseos, dispuesta a llenarle de gratas experiencias y sobre todo, 
dispuesta a compartir su alegr�a y a quererle mucho.",false);

INSERT INTO `perro`(`idProtectora`, `nombre`, `foto`, `edad`, `raza`, `color`, `peso`, `descripcion`, `fallecido`) 
VALUES (3, "Robin", "robin.png", 5, "pastor belga", "gris", 26, "Robin es un perro muy noble al cual su due�o no puede tenerlo 
debido a su estado de salud, su deseo es que Robin sea feliz en un hogar familiar y que su vida sea feliz junto a personas que 
le quieran. Es alegre, respetuoso y cari�oso cuando tiene confianza con su due�o.",false);


INSERT INTO `perro`(`idProtectora`, `nombre`, `foto`, `edad`, `raza`, `color`, `peso`, `descripcion`, `fallecido`) 
VALUES (3, "Akira", "akira.png", 6, "mestizo", "golden", 21, "Akira es un perro discreto, es algo t�mido y necesita estar en un 
ambiente tranquilo como es �l. Una vez en confianza es un perro obediente y muy cari�oso. Para Akira pensamos en una familia 
de gente joven o con ni�os, con ganas de salir mucho con �l de paseo, de excursi�n y disfrutar de la naturaleza en compa��a de 
un pedazo de perro bello con muchas ganas de conocer una nueva familia.",false);


















