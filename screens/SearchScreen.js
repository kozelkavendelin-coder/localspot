import React, { useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, SafeAreaView, TextInput,
} from 'react-native';
import { PODNIKY } from '../data/businesses';
import BusinessCard from '../components/BusinessCard';

const KATEGORIE = ['Vše', 'Restaurace', 'Kavárny', 'Nákupy', 'Bary', 'Služby'];

export default function SearchScreen({ navigation }) {
  const [kat, setKat] = useState('Vše');
  const [jenOtevreno, setJenOtevreno] = useState(false);
  const [razeni, setRazeni] = useState('vzdalenost');
  const [query, setQuery] = useState('');

  const filtrovane = useMemo(() => {
    return PODNIKY
      .filter(p => kat === 'Vše' || p.kategorie === kat)
      .filter(p => !jenOtevreno || p.otevreno)
      .filter(p => !query || p.nazev.toLowerCase().includes(query.toLowerCase()) || p.typ.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => razeni === 'hodnoceni' ? b.hodnoceni - a.hodnoceni : a.vzdalenost - b.vzdalenost);
  }, [kat, jenOtevreno, razeni, query]);

  return (
    <SafeAreaView style={s.container}>
      {/* Search bar */}
      <View style={s.header}>
        <View style={s.searchWrap}>
          <Text style={s.searchIcon}>🔍</Text>
          <TextInput
            style={s.searchInput}
            placeholder="Hledat podniky..."
            placeholderTextColor="#aaa"
            value={query}
            onChangeText={setQuery}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Text style={{ color: '#aaa', fontSize: 16, paddingHorizontal: 8 }}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Kategorie */}
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

        {/* Filtry */}
        <View style={s.filtrRow}>
          <TouchableOpacity
            style={[s.filtr, jenOtevreno && s.filtrActiveGreen]}
            onPress={() => setJenOtevreno(!jenOtevreno)}
          >
            <Text style={[s.filtrTxt, jenOtevreno && { color: '#2d9b5e', fontWeight: '700' }]}>
              ● Otevřeno
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[s.filtr, razeni === 'vzdalenost' && s.filtrActiveBlue]}
            onPress={() => setRazeni('vzdalenost')}
          >
            <Text style={[s.filtrTxt, razeni === 'vzdalenost' && { color: '#185FA5', fontWeight: '700' }]}>
              📍 Vzdálenost
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[s.filtr, razeni === 'hodnoceni' && s.filtrActiveBlue]}
            onPress={() => setRazeni('hodnoceni')}
          >
            <Text style={[s.filtrTxt, razeni === 'hodnoceni' && { color: '#185FA5', fontWeight: '700' }]}>
              ★ Hodnocení
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={s.pocet}>{filtrovane.length} podniků</Text>
      </View>

      {/* Seznam */}
      <ScrollView style={s.list} keyboardShouldPersistTaps="handled">
        {filtrovane.length === 0 ? (
          <View style={s.prazdne}>
            <Text style={s.prazdneIco}>🔍</Text>
            <Text style={s.prazdneTxt}>Žádné výsledky</Text>
            <Text style={s.prazdneHint}>Zkuste jiné klíčové slovo nebo kategorii</Text>
          </View>
        ) : (
          filtrovane.map(p => (
            <BusinessCard
              key={p.id}
              podnik={p}
              onPress={() => navigation.navigate('Detail', { podnik: p })}
            />
          ))
        )}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { backgroundColor: '#fff', paddingHorizontal: 14, paddingTop: 12, borderBottomWidth: 0.5, borderBottomColor: '#e8e8e8' },
  searchWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f2f2f2', borderRadius: 14, paddingHorizontal: 12, marginBottom: 12 },
  searchIcon: { fontSize: 15, marginRight: 6 },
  searchInput: { flex: 1, fontSize: 14, color: '#111', paddingVertical: 11 },
  chips: { marginBottom: 10 },
  chip: { paddingHorizontal: 15, paddingVertical: 7, borderRadius: 20, backgroundColor: '#f2f2f2', marginRight: 8 },
  chipActive: { backgroundColor: '#185FA5' },
  chipTxt: { fontSize: 12, color: '#555', fontWeight: '500' },
  chipTxtActive: { color: '#fff', fontWeight: '700' },
  filtrRow: { flexDirection: 'row', gap: 8, paddingBottom: 10, flexWrap: 'wrap' },
  filtr: { paddingHorizontal: 11, paddingVertical: 6, borderRadius: 10, backgroundColor: '#f2f2f2' },
  filtrActiveGreen: { backgroundColor: '#e8f5ee' },
  filtrActiveBlue: { backgroundColor: '#e8f0fb' },
  filtrTxt: { fontSize: 11, color: '#666' },
  pocet: { fontSize: 11, color: '#aaa', paddingBottom: 10 },
  list: { padding: 12 },
  prazdne: { alignItems: 'center', paddingTop: 60, gap: 8 },
  prazdneIco: { fontSize: 40 },
  prazdneTxt: { fontSize: 16, fontWeight: '600', color: '#555' },
  prazdneHint: { fontSize: 13, color: '#aaa', textAlign: 'center' },
});
