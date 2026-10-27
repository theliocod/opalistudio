/* =========================================================
   EMPIRE — Décors peints
   Une image par salle, rendue sous le même angle que le décor
   CSS. Quand une salle a son image, elle remplace le décor et
   les invités restent placés par le moteur isométrique.
   Ce fichier est réécrit par tools/kie-rooms.mjs.
   ========================================================= */
const ROOM_ART = {};

/* Permet de revenir au décor CSS, notamment pour les captures. */
let ROOM_ART_OFF = false;

function roomArt(roomId) {
  return ROOM_ART_OFF ? null : ROOM_ART[roomId] || null;
}
