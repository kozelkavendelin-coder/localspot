import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

const KATEGORIE = ['Vše', 'Restaurace', 'Kavárny', 'Nákupy', 'Bary', 'Služby'];

const PODNIKY = [
  { id: 1, nazev: 'U Zlatého Kohouta', typ: 'Restaurace', hodnoceni: 4.6, vzdalenost: 320, otevreno: true, cas: 'do 23:00', barva: '#2d9b5e' },
  { id: 2, nazev: 'Kavárna Světlá', typ: 'Kavárny', hodnoceni: 4.2, vzdalenost: 450, otevreno: true, cas: 'do 20:00', barva: '#1D9E75' },
  { id: 3, nazev: 'Pizzeria Roma', typ: 'Restaurace', hodnoceni: 3.8, vzdalenost: 680, otevreno: true, cas: 'do 22:00', barva: '#BA7517' },
  { id: 4, nazev: 'Albert', typ: 'Nákupy', hodnoceni: 4.1, vzdalenost: 200, otevreno: true, cas: 'do 22:00', barva: '#1D9E75' },
  { id: 5, nazev: 'Hospoda Na Kopci', typ: 'Bary', hodnoceni: 3.2, vzdalenost: 820, otevreno: false, cas: 'Zavřeno', barva: '#E24B4A' },
];

const inicialy = (n) => n.split(' ').map(s => s[0]).join('').slice(0, 2).toUpperCase();

export default function SearchScreen() {
  const [kat, setKat] = useState('Vše');
  const [jenOtevreno, setJenOtevreno] = useState(false);

  const filtrovane = PODNIKY
    .filter(p => kat === 'Vše' || p.typ === kat)
    .filter(p => !jenOtevreno || p.otevreno)
    .sort((a, b) => a.vzdalenost - b.vzdalenost);

  return (
    <SafeAreaView style={s.container}>
      <View style={s.header}>
        <View style={s.searchBar}>
          <Text style={s.searchTxt}>🔍  Hledat podniky...</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.chips}>
          {KATEGORIE.map(k => (
            <TouchableOpacity
              key={k}
              style={[s.chip, kat === k && s.chipActive]}
              onPress={() => setKat(k)}
            >
              <Text style={[s.chipTxt, kat === k && s.chipTxtActive]}>{k}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={s.filtrRow}>
          <TouchableOpacity
            style={[s.filtr, jenOtevreno && s.filtrActive]}
            onPress={() => setJenOtevreno(!jenOtevreno)}
          >
            <Text style={[s.filtrTxt, jenOtevreno && s.filtrTxtActive]}>● Otevřeno</Text>
          </TouchableOpacity>
          <View style={s.filtr}><Text style={s.filtrTxt}>Vzdálenost ↕</Text></View>
          <View style={s.filtr}><Text style={s.filtrTxt}>Hodnocení ↕</Text></View>
        </View>
      </View>

      <ScrollView style={s.list}>
        {filtrovane.map(p => (
          <TouchableOpacity key={p.id} style={s.karta}>
            <View style={[s.avatar, { backgroundColor: p.barva }]}>
              <Text style={s.avatarTxt}>{inicialy(p.nazev)}</Text>
            </View>
            <View style={s.kartaInfo}>
              <Text style={s.kartaNazev}>{p.nazev}</Text>
              <Text style={s.kartaSub}>{p.typ} · {p.vzdalenost} m</Text>
              <View style={s.kartaRow}>
                <View style={[s.badge, { backgroundColor: p.barva }]}>
                  <Text style={s.badgeTxt}>{p.hodnoceni} ★</Text>
                </View>
                <Text style={p.otevreno ? s.open : s.closed}>
                  {p.otevreno ? 'Otevřeno' : 'Zavřeno'}
                </Text>
                <Text style={s.cas}>{p.cas}</Text>
              </View>
            </View>
            <Text style={s.arrow}>›</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { backgroundColor: '#fff', paddingHorizontal: 14, paddingTop: 14, borderBottomWidth: 0.5, borderBottomColor: '#e0e0e0' },
  searchBar: { backgroundColor: '#f0f0f0', borderRadius: 20, padding: 10, marginBottom: 12 },
  searchTxt: { fontSize: 13, color: '#999' },
  chips: { marginBottom: 10 },
  chip: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 14, backgroundColor: '#f0f0f0', marginRight: 8 },
  chipActive: { backgroundColor: '#185FA5' },
  chipTxt: { fontSize: 12, color: '#555' },
  chipTxtActive: { color: '#fff', fontWeight: '600' },
  filtrRow: { flexDirection: 'row', gap: 8, paddingBottom: 12 },
  filtr: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, backgroundColor: '#f0f0f0' },
  filtrActive: { backgroundColor: '#e8f5ee' },
  filtrTxt: { fontSize: 11, color: '#555' },
  filtrTxtActive: { color: '#2d9b5e', fontWeight: '600' },
  list: { padding: 12 },
  karta: { backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 8, flexDirection: 'row', alignItems: 'center', borderWidth: 0.5, borderColor: '#e8e8e8' },
  avatar: { width: 52, height: 52, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  avatarTxt: { color: '#fff', fontSize: 18, fontWeight: '700' },
  kartaInfo: { flex: 1 },
  kartaNazev: { fontSize: 14, fontWeight: '600', color: '#111', marginBottom: 2 },
  kartaSub: { fontSize: 11, color: '#888', marginBottom: 5 },
  kartaRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 5 },
  badgeTxt: { color: '#fff', fontSize: 11, fontWeight: '600' },
  open: { fontSize: 11, color: '#2d9b5e', fontWeight: '600' },
  closed: { fontSize: 11, color: '#E24B4A', fontWeight: '600' },
  cas: { fontSize: 10, color: '#999' },
  arrow: { fontSize: 20, color: '#ccc' },
});
