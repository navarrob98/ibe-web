// Mejora progresiva: marca el documento como "con JavaScript" para que las
// animaciones de entrada (Reveal) solo se activen cuando el script puede
// controlarlas. Sin este archivo, el contenido permanece siempre visible.
// Se sirve como archivo externo (en vez de <script> inline) para cumplir
// con una Content-Security-Policy sin 'unsafe-inline' en script-src.
document.documentElement.classList.add("js");
