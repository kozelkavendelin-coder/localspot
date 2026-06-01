export const PODNIKY = [
  {
    id: 1,
    nazev: 'U Zlatého Kohouta',
    typ: 'Restaurace',
    kategorie: 'Restaurace',
    hodnoceni: 4.6,
    pocetHodnoceni: 142,
    vzdalenost: 320,
    otevreno: true,
    cas: 'do 23:00',
    adresa: 'Náměstí Míru 14, Praha 2',
    tel: '+420 222 333 444',
    web: 'ukohouta.cz',
    lat: 50.0754,
    lng: 14.4356,
    oteviraci: [
      { den: 'Po – Pá', cas: '11:00 – 23:00' },
      { den: 'Sobota', cas: '12:00 – 23:00' },
      { den: 'Neděle', cas: 'Zavřeno' },
    ],
    recenze: [
      { autor: 'Jan N.', inicialy: 'JN', barva: '#B5D4F4', textBarva: '#0C447C', hvezdy: 5, text: 'Skvělá svíčková, obsluha milá. Opakovaně navštěvujeme s rodinou!' },
      { autor: 'Anna K.', inicialy: 'AK', barva: '#F4C0D1', textBarva: '#72243E', hvezdy: 4, text: 'Příjemné prostředí, akorát čekací doba byla delší. Jídlo ale stálo za to.' },
    ],
  },
  {
    id: 2,
    nazev: 'Kavárna Světlá',
    typ: 'Kavárna',
    kategorie: 'Kavárny',
    hodnoceni: 4.2,
    pocetHodnoceni: 89,
    vzdalenost: 450,
    otevreno: true,
    cas: 'do 20:00',
    adresa: 'Světlá 8, Praha 1',
    tel: '+420 211 222 333',
    web: 'kavarnasvetla.cz',
    lat: 50.0831,
    lng: 14.4167,
    oteviraci: [
      { den: 'Po – Pá', cas: '8:00 – 20:00' },
      { den: 'Sobota', cas: '9:00 – 18:00' },
      { den: 'Neděle', cas: '10:00 – 16:00' },
    ],
    recenze: [
      { autor: 'Petra M.', inicialy: 'PM', barva: '#C0DD97', textBarva: '#3B6D11', hvezdy: 4, text: 'Výborná káva a klidné prostředí. Ideální na práci.' },
    ],
  },
  {
    id: 3,
    nazev: 'Pizzeria Roma',
    typ: 'Restaurace',
    kategorie: 'Restaurace',
    hodnoceni: 3.8,
    pocetHodnoceni: 67,
    vzdalenost: 680,
    otevreno: true,
    cas: 'do 22:00',
    adresa: 'Romana 3, Praha 2',
    tel: '+420 233 444 555',
    web: 'pizzeriaroma.cz',
    lat: 50.0721,
    lng: 14.4401,
    oteviraci: [
      { den: 'Po – Ne', cas: '11:00 – 22:00' },
    ],
    recenze: [
      { autor: 'Karel B.', inicialy: 'KB', barva: '#FAC775', textBarva: '#633806', hvezdy: 4, text: 'Dobrá pizza, rychlá obsluha.' },
    ],
  },
  {
    id: 4,
    nazev: 'Albert',
    typ: 'Supermarket',
    kategorie: 'Nákupy',
    hodnoceni: 4.1,
    pocetHodnoceni: 213,
    vzdalenost: 200,
    otevreno: true,
    cas: 'do 22:00',
    adresa: 'Korunní 1, Praha 2',
    tel: '+420 800 100 100',
    web: 'albert.cz',
    lat: 50.0769,
    lng: 14.4389,
    oteviraci: [
      { den: 'Po – So', cas: '7:00 – 22:00' },
      { den: 'Neděle', cas: '8:00 – 21:00' },
    ],
    recenze: [
      { autor: 'Lucie V.', inicialy: 'LV', barva: '#B5D4F4', textBarva: '#0C447C', hvezdy: 4, text: 'Dobrý výběr, čisto, příjemná obsluha.' },
    ],
  },
  {
    id: 5,
    nazev: 'Hospoda Na Kopci',
    typ: 'Hospoda',
    kategorie: 'Bary',
    hodnoceni: 3.2,
    pocetHodnoceni: 44,
    vzdalenost: 820,
    otevreno: false,
    cas: 'Otevírá ve 16:00',
    adresa: 'Kopečná 5, Praha 3',
    tel: '+420 244 555 666',
    web: '',
    lat: 50.0812,
    lng: 14.4502,
    oteviraci: [
      { den: 'Po – Pá', cas: '16:00 – 24:00' },
      { den: 'So – Ne', cas: '14:00 – 24:00' },
    ],
    recenze: [
      { autor: 'Ondřej K.', inicialy: 'OK', barva: '#D3D1C7', textBarva: '#444441', hvezdy: 3, text: 'Klasická hospoda, levné pivo.' },
    ],
  },
  {
    id: 6,
    nazev: 'Sushi Nara',
    typ: 'Restaurace',
    kategorie: 'Restaurace',
    hodnoceni: 4.7,
    pocetHodnoceni: 198,
    vzdalenost: 550,
    otevreno: true,
    cas: 'do 22:30',
    adresa: 'Mánesova 12, Praha 2',
    tel: '+420 255 666 777',
    web: 'sushinara.cz',
    lat: 50.0743,
    lng: 14.4421,
    oteviraci: [
      { den: 'Po – Ne', cas: '11:30 – 22:30' },
    ],
    recenze: [
      { autor: 'Marie H.', inicialy: 'MH', barva: '#EEEDFE', textBarva: '#3C3489', hvezdy: 5, text: 'Nejlepší sushi v Praze! Čerstvé ryby, skvělý servis.' },
    ],
  },
];

export const barvaDleHodnoceni = (h) => {
  if (h >= 4.5) return '#2d9b5e';
  if (h >= 4.0) return '#1D9E75';
  if (h >= 3.5) return '#BA7517';
  return '#E24B4A';
};

export const inicialy = (nazev) =>
  nazev.split(' ').map((s) => s[0]).join('').slice(0, 2).toUpperCase();
