-- ----------Filas Protectoras------------

INSERT INTO `protectora`(`nombre`, `ciudad`, `imagen`, `email`, `password`, `direccion`, `telefono`, `pendiente`, `descripcion`) 
VALUES ("Abrazo Animal", "Madrid","abrazoanimal.png","abrazoanimal@gmail.com", "1234","Goya 3, 2b", 901654321, false,
"La Asociación Abrazo Animal (Abrazo Animal) es una entidad sin ánimo de lucro que se constituyó en Madrid (España) en 2014, 
como respuesta al elevado número de animales que necesitan una protección real en nuestro país y a la deficiente atención de 
que son objeto por parte de la administración, que hasta el momento y salvo pocas excepciones, no han sabido resolver el 
problema de una manera efectiva y ética.");

INSERT INTO `protectora`(`nombre`, `ciudad`, `imagen`, `email`, `password`, `direccion`, `telefono`, `pendiente`, `descripcion`) 
VALUES ("S.P.A.P.", "Madrid", "spap.png", "spap@gmail.com", "1234", "Princesa, 1,  1a",901123456, false, 
"Toda una vida dedicada a los animales y al medio ambiente. La Sociedad Protectora de Animales y Plantas de Madrid lleva 
trabajando más de setenta y cinco años para estimular el respeto, cuidado y cariño por los animales y por el medio ambiente. ");

INSERT INTO `protectora`(`nombre`, `ciudad`, `imagen`, `email`, `password`, `direccion`, `telefono`, `pendiente`, `descripcion`) 
VALUES ("Asociacion las Nieves", "Madrid", "lasnieves.png", "lasnieves@gmail.com", "1234", "Castellana, 1,  1c", 901987654, false, 
"En la Asociación LAS NIEVES para la Protección Animal buscamos adoptantes responsables que deseen incluir un nuevo miembro en 
su familia");

INSERT INTO `protectora`(`nombre`, `ciudad`, `imagen`, `email`, `password`, `direccion`, `telefono`, `pendiente`, `descripcion`) 
VALUES ("Bichosraros", "Madrid", "bichosraros.png", "bichosraros@gmail.com", "1234", "Jardines, 41, 3b", 901456789, false, 
"La asociación de ayuda y apoyo a los animales abandonados, bichosraros.org, nace en Madrid, como fruto de nuestro deseo de ayudar 
de una manera más estructurada a los animales con necesidades especiales, a los que llamamos cariñosamente nuestros “bichos raros”.");

INSERT INTO `protectora`(`nombre`, `ciudad`, `imagen`, `email`, `password`, `direccion`, `telefono`, `pendiente`, `descripcion`) 
VALUES ("Ciudad Animal", "Madrid", "ciudadanimal.png", "ciudadanimal@gmail.com", "1234", "Argüelles, 15, 1d", 901666555, true, 
"El Refugio de Animales Abandonados Ciudad Animal es un asociación sin ánimo de lucro, legalmente constituida, cuyo objetivo 
es salvar, recuperar, cuidar, proteger, y buscar nuevas vidas a través de la adopción para los animales abandonados.");

-- --------------Filas Protectoras (incremento) -------------

INSERT INTO `protectora`(`nombre`, `ciudad`, `imagen`, `email`, `password`, `direccion`, `telefono`, `pendiente`, `descripcion`) 
VALUES ("ProteCMS", "Madrid", "protecms.png", "protecms@gmail.com", "1234", "Atocha, 8, 4f", 901777666, false, 
"ProteCMS es una asociación sin ánimo de lucro cuya principal y única finalidad es proteger a los animales que por una u otra razón, 
carecen de una familia que los cuide y que los quiera. Desde el amor a los animales que une a todos sus miembros, ProteCMS alimenta, 
cura, vacuna y realoja a animales abandonados que por distintas vías llegan hasta nosotros.");

INSERT INTO `protectora`(`nombre`, `ciudad`, `imagen`, `email`, `password`, `direccion`, `telefono`, `pendiente`, `descripcion`) 
VALUES ("Adopte", "Madrid", "adopte.png", "adopte@gmail.com", "1234", "Atocha, 6, 1a", 901789987, false, 
"Adopte es, desde 1996, una organización española especializada en la ayuda a perros y gatos abandonados y/o maltratados, 
una organización totalmente independiente que no recibe subvenciones de organismos oficiales, empresas ni partidos políticos. 
Practicamos el sacrificio cero, denunciamos judicialmente a los maltratadores y buscamos adoptantes para todos los animales que 
acogemos..");

INSERT INTO `protectora`(`nombre`, `ciudad`, `imagen`, `email`, `password`, `direccion`, `telefono`, `pendiente`, `descripcion`) 
VALUES ("Galgos112", "Madrid", "galgos112.png", "galgos112@gmail.com", "1234", "Bilbao, 7, 2b", 901999232, true, 
"Los integrantes de Galgos112 somo personas comprometidas y amantes de los animales. Estamos especialmente sensibilizados con la 
problemática del abandono y maltrato hacia los animales, por eso nos unimos para defender los derechos de muchas mascotas que se 
merecen una vida digna, una oportunidad en un hogar y un cariño que ellos siempre devuelven con creces.");

INSERT INTO `protectora`(`nombre`, `ciudad`, `imagen`, `email`, `password`, `direccion`, `telefono`, `pendiente`, `descripcion`) 
VALUES ("Pata", "Majadahonda", "pata.png", "pata@gmail.com", "1234", "Cerro del Arie, 9", 901789789, false, 
"Somos una asociación protectora de animales, fundada en 2002 y ubicada en la Sierra Norte de Madrid. Nuestro albergue es pequeño 
(sin espacio para gatos) y ayudados de las casas de acogida cuidamos de nuestros animales hasta encontrar un nuevo hogar para ellos. 
Gracias las donaciones particulares: socios, teaming, mercadillos… podemos hacer frente a todos los gastos que generan nuestros animales, 
pues no recibimos subvención pública alguna.");


-- --------------Filas Perros-------------

INSERT INTO `perro`(`idProtectora`, `nombre`, `foto`, `edad`, `raza`, `color`, `peso`, `descripcion`, `fallecido`) 
VALUES (1, "Baby", "baby.png", 4, "teckel", "gris y marron", 16, "Baby es un perro bueno con otros perros y muy amigable con 
personas, tanto niños como personas adultas, muy cariñoso, es tímida con la gente que no conoce, ladra un poco cuando se pone 
nerviosa, está esterilizada y lleva con nuestra protectora desde hace un año y tres meses",false);

INSERT INTO `perro`(`idProtectora`, `nombre`, `foto`, `edad`, `raza`, `color`, `peso`, `descripcion`, `fallecido`) 
VALUES (1, "Cari", "cari.png", 3, "samoyedo", "blanco", 9, "Cari  aunque es un perro un poco tímida cuando no conoce a nadie, en 
cuanto tiene confianza le encanta recibir mimos y jugar con cualquier perro o persona que le preste atención. Tiene solo tres años, 
sabe pasear perfectamente con correa y le encanta estar en el parque.",false);

INSERT INTO `perro`(`idProtectora`, `nombre`, `foto`, `edad`, `raza`, `color`, `peso`, `descripcion`, `fallecido`) 
VALUES (1, "Cuco", "cuco.png", 1, "rottweiler ", "negro y marron", 2, "Cuco es un perro pequeño lo que le hace ser muy tierno, 
es un perro que tiene un año el cual nació aquí con nosotros junto a tres hermanos más, es un perro muy cariñoso y tranquilo, 
nunca ha compartido una vida en una casa, ideal para los niños los cuales seguros que los trataran muy bien.",false);

INSERT INTO `perro`(`idProtectora`, `nombre`, `foto`, `edad`, `raza`, `color`, `peso`, `descripcion`, `fallecido`) 
VALUES (2, "Nano", "nano.png", 5, "pastor aleman", "marron", 22, "Nano llegó a nuestra protectora cuando era sólo un cachorro. 
Tuvo la suerte de ser adoptado, pero su dueño ya no lo puede tener. Ahora está otra vez con nosotros esperando otra oportunidad. 
Es muy cariñoso y necesita que le tengan paciencia y le enseñen a convivir con lo que será el mejor amigo.",false);

INSERT INTO `perro`(`idProtectora`, `nombre`, `foto`, `edad`, `raza`, `color`, `peso`, `descripcion`, `fallecido`) 
VALUES (2, "Samy", "samy.png", 3, "galgo saluki", "gris y blanco", 25, "Sammy disfruta mucho en el campo corriendo y no se cansa
 nunca, un perro muy activo y travieso que hará disfrutar a su nuevo dueño. Le gusta estar con otros perros, le encanta echarse 
 la siesta después de comer, este perro necesita unos niños los cuales le hagan disfrutar de la vida.",false);

INSERT INTO `perro`(`idProtectora`, `nombre`, `foto`, `edad`, `raza`, `color`, `peso`, `descripcion`, `fallecido`) 
VALUES (3, "Pixi", "pixi.png", 1, "cavalier king", "blanco y marron", 2, "Pixi es un perro muy divertido y pequeño, le cambió 
la suerte cuando lo encontraron y lo rescataron, su rescatadora lo crió a biberón a él y a sus 6 hermanitos, después de encontrarlos 
abandonados a su suerte en un invernadero. Luego vino con nosotros demostrandonos que es muy alegre y que tiene muchas ganas de vivir 
junto a una familia cariñosa y alegre.",false);

INSERT INTO `perro`(`idProtectora`, `nombre`, `foto`, `edad`, `raza`, `color`, `peso`, `descripcion`, `fallecido`) 
VALUES (4, "Simba", "simba.png", 6, "boxer", "marron", 20, "Simba ha tenido una familia pero Simba no ha tenido buena suerte y ha 
sufrido mucho. Por lo cual ha vuelto con nosotros, echa mucho de menos vivir con personas que le quieran y le den otra oportunidad, 
ya que es muy dulce, es tranquila, equilibrada y cariñosa. Adoptarla sería una buena opción.",false);

-- --------------Filas Perros (incremento) -------------

INSERT INTO `perro`(`idProtectora`, `nombre`, `foto`, `edad`, `raza`, `color`, `peso`, `descripcion`, `fallecido`) 
VALUES (6, "Felix", "felix.png", 4, "papillon", "golden", 13, "Félix fue abandonado en la carretera, fue ahí donde se le encontró,
 tenía mucha desconfianza con las personas y se asustaba demasiado, poco a poco ha ido ganando confianza, le gusta jugar mucho y 
 es la hora de que tenga una familia la cual le pueda cuidar y tener otra oportunidad.",false);
 
INSERT INTO `perro`(`idProtectora`, `nombre`, `foto`, `edad`, `raza`, `color`, `peso`, `descripcion`, `fallecido`) 
VALUES (4, "Snoopy", "snoopy.png", 3, "mestizo", "gris y marron", 16, "Snoopy es un perro tan alegre que ha encantado a todos en 
la protectora, a nosotros y a todos sus compañeros, porque es un perro lleno de energía, de ilusiones, de cariño y de emociones... 
y por ello necesita una familia dispuesta a darle buenos paseos, dispuesta a llenarle de gratas experiencias y sobre todo, 
dispuesta a compartir su alegría y a quererle mucho.",false);

INSERT INTO `perro`(`idProtectora`, `nombre`, `foto`, `edad`, `raza`, `color`, `peso`, `descripcion`, `fallecido`) 
VALUES (7, "Robin", "robin.png", 5, "pastor belga", "gris", 26, "Robin es un perro muy noble al cual su dueño no puede tenerlo 
debido a su estado de salud, su deseo es que Robin sea feliz en un hogar familiar y que su vida sea feliz junto a personas que 
le quieran. Es alegre, respetuoso y cariñoso cuando tiene confianza con su dueño.",false);


INSERT INTO `perro`(`idProtectora`, `nombre`, `foto`, `edad`, `raza`, `color`, `peso`, `descripcion`, `fallecido`) 
VALUES (7, "Akira", "akira.png", 6, "mestizo", "golden", 21, "Akira es un perro discreto, es algo tímido y necesita estar en un 
ambiente tranquilo como es él. Una vez en confianza es un perro obediente y muy cariñoso. Para Akira pensamos en una familia 
de gente joven o con niños, con ganas de salir mucho con él de paseo, de excursión y disfrutar de la naturaleza en compañía de 
un pedazo de perro bello con muchas ganas de conocer una nueva familia.",false);

INSERT INTO `perro`(`idProtectora`, `nombre`, `foto`, `edad`, `raza`, `color`, `peso`, `descripcion`, `fallecido`) 
VALUES (9, "Hank", "hank.png", 6, "vizsla", "marron", 20, "Hank en un perro adulto el cual es muy  cariñoso, sociable, juguetón. 
Es un perro muy  fuerte, algo brusco por lo joven que es, pero que aprenderá con el tiempo.  Necesita una persona adulta la cual 
le enseñe a pasear con correa y vivir en un entorno de hogar.",false);

INSERT INTO `perro`(`idProtectora`, `nombre`, `foto`, `edad`, `raza`, `color`, `peso`, `descripcion`, `fallecido`) 
VALUES (9, "Atila", "atila.png", 6, "labrador retriever", "blanco", 28, "Atila es un perro muy dulce y muy cariñosa con las 
personas con las personas con las que convive, se lleva muy bien con otros perros, necesita mucha atención y cariño de sus protectores,
sería ideal un entorno con más perros, jóvenes y niños para que se sienta más segura.",false);

INSERT INTO `perro`(`idProtectora`, `nombre`, `foto`, `edad`, `raza`, `color`, `peso`, `descripcion`, `fallecido`) 
VALUES (9, "Leo", "leo.png", 6, "pastor blanco suizo", "blanco", 19, "Leo es un perro muy tranquilo, obediente y  muy sano. 
Es muy grande y fuerte le gusta pasear al aire libre, no es un perro nada agresivo, ya lleva seis meses con nosotros debido a que 
sus dueños no lo podían tener por temas de salud, este perro necesita un nuevo hogar que le permita vivir como siempre ha vivido.",false);



















