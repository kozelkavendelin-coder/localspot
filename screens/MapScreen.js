import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, Modal, SafeAreaView,
} from 'react-native';

const PODNIKY = [
  { id: 1, nazev: 'U Zlatého Kohouta', typ: 'Restaurace', hodnoceni: 4.6, vzdalenost: '320 m', otevreno: true, cas: 'do 23:00', adresa: 'Náměstí Míru 14, Praha 2', tel: '+420 222 333 444' },
  { id: 2, nazev: 'Kavárna Světlá', typ: 'Kavárna', hodnoceni: 4.2, vzdalenost: '450 m', otevreno: true, cas: 'do 20:00', adresa: 'Světlá 8, Praha 1', tel: '+420 211 222 333' },
  { id: 3, nazev: 'Pizzeria Roma', typ: 'Restaurace', hodnoceni: 3.8, vzdalenost: '680 m', otevreno: true, cas: 'do 22:00', adresa: 'Romana 3, Praha 2', tel: '+420 233 444 555' },
  { id: 4, nazev: 'Albert', typ: 'Supermarket', hodnoceni: 4.1, vzdalenost: '200 m', otevreno: true, cas: 'do 22:00', adresa: 'Korunní 1, Praha 2', tel: '+420 800 100 100' },
  { id: 5, nazev: 'Hospoda Na Kopci', typ: 'Hospoda', hodnoceni: 3.2, vzdalenost: '820 m', otevreno: false, cas: 'Zavřeno', adresa: 'Kopečná 5, Praha 3', tel: '+420 244 555 666' },
];

const barvaDleHodnoceni = (h) => {
  if (h >= 4.5) return '#2d9b5e';
  if (h >= 4.0) return '#1D9E75';
  if (h >= 3.5) return '#BA7517';
  return '#E24B4A';
};

const inicialy = (nazev) =>
  nazev.split(' ').map((s) => s[0]).join('').slice(0, 2).toUpperCase();

export default function MapScreen() {
  const [vybrany, setVybrany] = useState(null);
  const [detail, setDetail] = useState(null);

  return (
    <SafeAreaView style={s.container}>
      <View style={s.mapa}>
        <Text style={s.mapaTitl}>🗺️ Mapa okolí</Text>
        <Text style={s.mapaInfo}>Klikněte na podnik níže</Text>

        <View style={s.legenda}>
          {[['#2d9b5e','4.5+'],['#1D9E75','4.0–4.5'],['#BA7517','3.5–4.0'],['#E24B4A','<3.5']].map(([b,l])=>(
            <View key={l} style={s.legendaItem}>
              <View style={[s.legendaDot, { backgroundColor: b }]} />
              <Text style={s.legendaTxt}>{l}</Text>
            </View>
          ))}
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.markery}>
          {PODNIKY.map((p) => (
            <TouchableOpacity
              key={p.id}
              style={[s.marker, { backgroundColor: barvaDleHodnoceni(p.hodnoceni) }]}
              onPress={() => setVybrany(p)}
            >
              <Text style={s.markerTxt}>{p.hodnoceni} {p.nazev}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {vybrany && (
        <View style={s.popup}>
          <View style={s.popupHandle} />
          <Text style={s.popupNazev}>{vybrany.nazev}</Text>
          <Text style={s.popupSub}>{vybrany.typ} · {vybrany.vzdalenost}</Text>
          <View style={s.popupRow}>
            <View style={[s.badge, { backgroundColor: barvaDleHodnoceni(vybrany.hodnoceni) }]}>
              <Text style={s.badgeTxt}>{vybrany.hodnoceni}/5 ★</Text>
            </View>
            <Text style={s.otevreno}>{vybrany.otevreno ? `● ${vybrany.cas}` : '● Zavřeno'}</Text>
          </View>
          <View style={s.popupBtns}>
            <TouchableOpacity style={s.btnPrimary} onPress={() => { setDetail(vybrany); setVybrany(null); }}>
              <Text style={s.btnPrimaryTxt}>Více informací</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.btnSecondary} onPress={() => setVybrany(null)}>
              <Text style={s.btnSecondaryTxt}>Navigovat</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <Modal visible={!!detail} animationType="slide">
        {detail && (
          <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={[s.detailHeader, { backgroundColor: barvaDleHodnoceni(detail.hodnoceni) + '33' }]}>
              <View style={[s.detailAvatar, { backgroundColor: barvaDleHodnoceni(detail.hodnoceni) }]}>
                <Text style={s.detailAvatarTxt}>{inicialy(detail.nazev)}</Text>
              </View>
              <TouchableOpacity style={s.backBtn} onPress={() => setDetail(null)}>
                <Text style={s.backBtnTxt}>←</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={s.detailBody}>
              <Text style={s.detailNazev}>{detail.nazev}</Text>
              <Text style={s.detailTyp}>{detail.typ} · Praha</Text>
              <View style={s.detailBadgeRow}>
                <View style={[s.badge, { backgroundColor: barvaDleHodnoceni(detail.hodnoceni) }]}>
                  <Text style={s.badgeTxt}>{detail.hodnoceni} ★ (142 hodnocení)</Text>
                </View>
                {detail.otevreno && (
                  <View style={s.openBadge}>
                    <Text style={s.openBadgeTxt}>● Otevřeno {detail.cas}</Text>
                  </View>
                )}
              </View>
              <View style={s.infoBox}>
                <Text style={s.infoBoxTitl}>Otevírací doba</Text>
                {[['Po – Pá','11:00 – 23:00'],['Sobota','12:00 – 23:00'],['Neděle','Zavřeno']].map(([d,h])=>(
                  <View key={d} style={s.infoRow}>
                    <Text style={s.infoRowLeft}>{d}</Text>
                    <Text style={[s.infoRowRight, d==='Neděle' && { color:'#E24B4A' }]}>{h}</Text>
                  </View>
                ))}
              </View>
              <View style={s.infoBox}>
                <Text style={s.infoRowLeft}>📍 {detail.adresa}</Text>
                <Text style={s.infoRowLeft}>📞 {detail.tel}</Text>
              </View>
              <View style={s.detailBtns}>
                <TouchableOpacity style={s.btnPrimary}><Text style={s.btnPrimaryTxt}>Navigovat</Text></TouchableOpacity>
                <TouchableOpacity style={s.btnSecondary}><Text style={s.btnSecondaryTxt}>Sdílet</Text></TouchableOpacity>
              </View>
            </ScrollView>
          </SafeAreaView>
        )}
      </Modal>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  mapa: { flex: 1, backgroundColor: '#d4e8c8', alignItems: 'center', justifyContent: 'center' },
  mapaTitl: { fontSize: 28, marginBottom: 6 },
  mapaInfo: { fontSize: 13, color: '#555', marginBottom: 16 },
  legenda: { position: 'absolute', top: 16, right: 12, backgroundColor: '#ffffffcc', borderRadius: 8, padding: 8 },
  legendaItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  legendaDot: { width: 10, height: 10, borderRadius: 2, marginRight: 5 },
  legendaTxt: { fontSize: 10, color: '#444' },
  markery: { position: 'absolute', bottom: 20, paddingHorizontal: 12 },
  marker: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6, marginRight: 8 },
  markerTxt: { color: '#fff', fontSize: 11, fontWeight: '600' },
  popup: { backgroundColor: '#fff', borderTopLeftRadius: 16, borderTopRightRadius: 16, padding: 16, borderTopWidth: 0.5, borderTopColor: '#ddd' },
  popupHandle: { width: 36, height: 3, backgroundColor: '#ccc', borderRadius: 2, alignSelf: 'center', marginBottom: 12 },
  popupNazev: { fontSize: 16, fontWeight: '600', color: '#111', marginBottom: 2 },
  popupSub: { fontSize: 12, color: '#777', marginBottom: 8 },
  popupRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14 },
  popupBtns: { flexDirection: 'row', gap: 10 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  badgeTxt: { color: '#fff', fontSize: 12, fontWeight: '600' },
  otevreno: { fontSize: 12, color: '#2d9b5e', fontWeight: '600' },
  btnPrimary: { flex: 1, backgroundColor: '#185FA5', padding: 12, borderRadius: 10, alignItems: 'center' },
  btnPrimaryTxt: { color: '#fff', fontWeight: '600', fontSize: 13 },
  btnSecondary: { flex: 1, borderWidth: 0.5, borderColor: '#ccc', padding: 12, borderRadius: 10, alignItems: 'center' },
  btnSecondaryTxt: { color: '#333', fontSize: 13 },
  detailHeader: { height: 140, alignItems: 'center', justifyContent: 'center' },
  detailAvatar: { width: 70, height: 70, borderRadius: 35, alignItems: 'center', justifyContent: 'center' },
  detailAvatarTxt: { color: '#fff', fontSize: 24, fontWeight: '700' },
  backBtn: { position: 'absolute', top: 16, left: 16, backgroundColor: '#fff', width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, borderColor: '#ddd' },
  backBtnTxt: { fontSize: 18, color: '#333' },
  detailBody: { flex: 1, padding: 16 },
  detailNazev: { fontSize: 20, fontWeight: '700', color: '#111', marginBottom: 4 },
  detailTyp: { fontSize: 13, color: '#777', marginBottom: 10 },
  detailBadgeRow: { flexDirection: 'row', gap: 8, marginBottom: 14, flexWrap: 'wrap' },
  openBadge: { backgroundColor: '#e8f5ee', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  openBadgeTxt: { color: '#2d9b5e', fontSize: 12, fontWeight: '600' },
  infoBox: { borderWidth: 0.5, borderColor: '#ddd', borderRadius: 10, padding: 12, marginBottom: 10 },
  infoBoxTitl: { fontSize: 13, fontWeight: '600', color: '#111', marginBottom: 8 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  infoRowLeft: { fontSize: 12, color: '#777', paddingVertical: 3 },
  infoRowRight: { fontSize: 12, color: '#111' },
  detailBtns: { flexDirection: 'row', gap: 10, marginTop: 8 },
});
