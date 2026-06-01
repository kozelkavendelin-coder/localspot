import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

const inicialy = (n) => n.split(' ').map(s => s[0]).join('').slice(0, 2).toUpperCase();

const INIT = [
  { id: 1, nazev: 'U Zlatého Kohouta', typ: 'Restaurace', hodnoceni: 4.6, vzdalenost: '320 m', barva: '#2d9b5e' },
  { id: 2, nazev: 'Kavárna Světlá', typ: 'Kavárna', hodnoceni: 4.2, vzdalenost: '450 m', barva: '#1D9E75' },
];

export default function FavoritesScreen() {
  const [oblibene, setOblibene] = useState(INIT);

  const odebrat = (id) => setOblibene(o => o.filter(p => p.id !== id));

  return (
    <SafeAreaView style={s.container}>
      <Text style={s.titl}>Oblíbené podniky</Text>
      {oblibene.length === 0 ? (
        <View style={s.empty}>
          <Text style={s.emptyIcon}>❤️</Text>
          <Text style={s.emptyTxt}>Zatím žádné oblíbené.</Text>
          <Text style={s.emptyHint}>Přidejte je na mapě nebo v hledání.</Text>
        </View>
      ) : (
        <ScrollView style={s.list}>
          {oblibene.map(p => (
            <View key={p.id} style={s.karta}>
              <View style={[s.avatar, { backgroundColor: p.barva }]}>
                <Text style={s.avatarTxt}>{inicialy(p.nazev)}</Text>
              </View>
              <View style={s.info}>
                <Text style={s.nazev}>{p.nazev}</Text>
                <Text style={s.sub}>{p.typ} · {p.vzdalenost}</Text>
                <View style={[s.badge, { backgroundColor: p.barva }]}>
                  <Text style={s.badgeTxt}>{p.hodnoceni} ★</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => odebrat(p.id)} style={s.srdceBtn}>
                <Text style={s.srdce}>❤️</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  titl: { fontSize: 20, fontWeight: '700', color: '#111', padding: 16, paddingBottom: 12 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
  emptyIcon: { fontSize: 48, marginBottom: 8 },
  emptyTxt: { fontSize: 16, color: '#555', fontWeight: '600' },
  emptyHint: { fontSize: 13, color: '#999', textAlign: 'center' },
  list: { padding: 12 },
  karta: { backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 8, flexDirection: 'row', alignItems: 'center', borderWidth: 0.5, borderColor: '#e8e8e8' },
  avatar: { width: 52, height: 52, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  avatarTxt: { color: '#fff', fontSize: 18, fontWeight: '700' },
  info: { flex: 1, gap: 4 },
  nazev: { fontSize: 14, fontWeight: '600', color: '#111' },
  sub: { fontSize: 11, color: '#888' },
  badge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 5 },
  badgeTxt: { color: '#fff', fontSize: 11, fontWeight: '600' },
  srdceBtn: { padding: 8 },
  srdce: { fontSize: 24 },
});
