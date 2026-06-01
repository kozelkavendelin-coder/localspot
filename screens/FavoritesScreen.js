import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { PODNIKY } from '../data/businesses';
import BusinessCard from '../components/BusinessCard';

export default function FavoritesScreen({ navigation }) {
  const [oblibene, setOblibene] = useState([PODNIKY[0], PODNIKY[1]]);

  const odebrat = (id) => setOblibene(o => o.filter(p => p.id !== id));

  return (
    <SafeAreaView style={s.container}>
      <View style={s.header}>
        <Text style={s.titl}>Oblíbené</Text>
        <Text style={s.pocet}>{oblibene.length} podniků</Text>
      </View>

      {oblibene.length === 0 ? (
        <View style={s.empty}>
          <Text style={s.emptyIco}>🤍</Text>
          <Text style={s.emptyTitl}>Zatím žádné oblíbené</Text>
          <Text style={s.emptyHint}>Přidejte podniky klepnutím na ❤️ v detailu podniku</Text>
          <TouchableOpacity style={s.emptyBtn} onPress={() => navigation.navigate('Hledat')}>
            <Text style={s.emptyBtnTxt}>Hledat podniky</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={s.list}>
          {oblibene.map(p => (
            <View key={p.id}>
              <BusinessCard
                podnik={p}
                onPress={() => navigation.navigate('Detail', { podnik: p })}
              />
              <TouchableOpacity style={s.odebratBtn} onPress={() => odebrat(p.id)}>
                <Text style={s.odebratTxt}>Odebrat z oblíbených</Text>
              </TouchableOpacity>
            </View>
          ))}
          <View style={{ height: 20 }} />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', padding: 16, paddingBottom: 12, backgroundColor: '#fff', borderBottomWidth: 0.5, borderBottomColor: '#e8e8e8' },
  titl: { fontSize: 22, fontWeight: '800', color: '#111' },
  pocet: { fontSize: 13, color: '#aaa' },
  list: { padding: 12 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10, padding: 32 },
  emptyIco: { fontSize: 52, marginBottom: 4 },
  emptyTitl: { fontSize: 18, fontWeight: '700', color: '#333' },
  emptyHint: { fontSize: 14, color: '#999', textAlign: 'center', lineHeight: 20 },
  emptyBtn: { marginTop: 8, backgroundColor: '#185FA5', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 22 },
  emptyBtnTxt: { color: '#fff', fontWeight: '700', fontSize: 14 },
  odebratBtn: { marginTop: -4, marginBottom: 14, alignItems: 'center' },
  odebratTxt: { fontSize: 12, color: '#E24B4A' },
});
