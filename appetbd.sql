-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-04-2018 a las 12:06:24
-- Versión del servidor: 10.1.30-MariaDB
-- Versión de PHP: 7.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `appetbd`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador`
--

CREATE TABLE `administrador` (
  `id` int(11) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `administrador`
--

INSERT INTO `administrador` (`id`, `email`, `password`) VALUES
(1, 'admin@admin.es', 'admin');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `adoptante`
--

CREATE TABLE `adoptante` (
  `id` int(11) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellidos` varchar(200) NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `ciudad` varchar(200) NOT NULL,
  `direccion` text NOT NULL,
  `telefono` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `adoptante`
--

INSERT INTO `adoptante` (`id`, `email`, `password`, `nombre`, `apellidos`, `fechaNacimiento`, `ciudad`, `direccion`, `telefono`) VALUES
(1, 'antonio@gmail.com', '1234', 'Antonio', 'Cabello Libre', '1998-04-03', 'Madrid', 'C/Imaginacion Nº 13 4B', 999888777),
(43, 'Iclienteak@repsol.com', '12', 'Pepito', 'huaman', '1994-02-14', 'Valdemorillo', 'tejedores, 7, 1', 672570159),
(44, 'lalin_200@hotmail.com', '123456', 'Luis Eduardo', 'Paucar Cerron', '1993-02-14', 'Valdemorillo', 'C\\ TEJEDORES N 7 1ro A', 697555437),
(46, 'luisedup@ucm.es', '12', 'Luis', 'Paucar cerron', '1996-12-13', 'Valdemorillo', 'C/.  Tejedores 7, 1A', 697555437);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perro`
--

CREATE TABLE `perro` (
  `id` int(11) NOT NULL,
  `idProtectora` int(11) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `foto` blob NOT NULL,
  `edad` int(11) NOT NULL,
  `raza` varchar(200) NOT NULL,
  `color` varchar(150) NOT NULL,
  `peso` int(11) NOT NULL,
  `descripcion` text NOT NULL,
  `fallecido` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `protectora`
--

CREATE TABLE `protectora` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `ciudad` varchar(200) NOT NULL,
  `imagen` blob NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(100) NOT NULL,
  `direccion` varchar(500) NOT NULL,
  `telefono` int(11) NOT NULL,
  `pendiente` tinyint(1) NOT NULL DEFAULT '1',
  `descripcion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `adoptante`
--
ALTER TABLE `adoptante`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `perro`
--
ALTER TABLE `perro`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_idProtectora` (`idProtectora`);

--
-- Indices de la tabla `protectora`
--
ALTER TABLE `protectora`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administrador`
--
ALTER TABLE `administrador`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `adoptante`
--
ALTER TABLE `adoptante`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT de la tabla `perro`
--
ALTER TABLE `perro`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `protectora`
--
ALTER TABLE `protectora`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `perro`
--
ALTER TABLE `perro`
  ADD CONSTRAINT `fk_idProtectora` FOREIGN KEY (`idProtectora`) REFERENCES `protectora` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
