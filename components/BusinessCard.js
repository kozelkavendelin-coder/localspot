import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { barvaDleHodnoceni, inicialy } from '../data/businesses';

export default function BusinessCard({ podnik, onPress }) {
  const barva = barvaDleHodnoceni(podnik.hodnoceni);
  return (
    <TouchableOpacity style={s.karta} onPress={onPress} activeOpacity={0.75}>
      <View style={[s.avatar, { backgroundColor: barva }]}>
        <Text style={s.avatarTxt}>{inicialy(podnik.nazev)}</Text>
      </View>
      <View style={s.info}>
        <Text style={s.nazev} numberOfLines={1}>{podnik.nazev}</Text>
        <Text style={s.sub}>{podnik.kategorie} · {podnik.vzdalenost} m</Text>
        <View style={s.row}>
          <View style={[s.badge, { backgroundColor: barva }]}>
            <Text style={s.badgeTxt}>{podnik.hodnoceni} ★</Text>
          </View>
          <Text style={podnik.otevreno ? s.open : s.closed}>
            {podnik.otevreno ? 'Otevřeno' : 'Zavřeno'}
          </Text>
          <Text style={s.cas}>{podnik.cas}</Text>
        </View>
      </View>
      <Text style={s.arrow}>›</Text>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  karta: { backgroundColor: '#fff', borderRadius: 14, padding: 13, marginBottom: 9, flexDirection: 'row', alignItems: 'center', borderWidth: 0.5, borderColor: '#e8e8e8', shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
  avatar: { width: 54, height: 54, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  avatarTxt: { color: '#fff', fontSize: 18, fontWeight: '700' },
  info: { flex: 1 },
  nazev: { fontSize: 14, fontWeight: '700', color: '#111', marginBottom: 2 },
  sub: { fontSize: 11, color: '#888', marginBottom: 5 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 5 },
  badgeTxt: { color: '#fff', fontSize: 11, fontWeight: '700' },
  open: { fontSize: 11, color: '#2d9b5e', fontWeight: '600' },
  closed: { fontSize: 11, color: '#E24B4A', fontWeight: '600' },
  cas: { fontSize: 10, color: '#aaa' },
  arrow: { fontSize: 22, color: '#ddd', marginLeft: 4 },
});
