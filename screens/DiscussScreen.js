import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  SafeAreaView, TouchableOpacity, TextInput,
} from 'react-native';

const INIT_PRISPEVKY = [
  { id: 1, autor: 'Martin N.', inicialy: 'MN', barvaA: '#B5D4F4', textBarvaA: '#0C447C', cas: 'před 2 hod', podnik: 'U Zlatého Kohouta', podnikId: 1, text: 'Dnes jsem tu byl poprvé — svíčková byla fantastická! Určitě doporučuju.', likes: 12, komentare: 3, liknuto: false },
  { id: 2, autor: 'Klára H.', inicialy: 'KH', barvaA: '#C0DD97', textBarvaA: '#3B6D11', cas: 'před 5 hod', podnik: 'Kavárna Světlá', podnikId: 2, text: 'Mění od příštího týdne otevírací dobu? Na dveřích byl lístek ale nešlo přečíst...', likes: 4, komentare: 7, liknuto: false },
  { id: 3, autor: 'Petra R.', inicialy: 'PR', barvaA: '#F4C0D1', textBarvaA: '#72243E', cas: 'před 1 dnem', podnik: 'okolí Žižkova', podnikId: null, text: 'Otevírá se thajský bistro na Mánesově? Viděla jsem tam pracovníky celý týden.', likes: 8, komentare: 14, liknuto: false },
  { id: 4, autor: 'Tomáš V.', inicialy: 'TV', barvaA: '#FAC775', textBarvaA: '#633806', cas: 'před 2 dny', podnik: 'Albert Korunní', podnikId: 4, text: 'Nové samoobslužné pokladny jsou konečně funkční. Fronta letí 👍', likes: 21, komentare: 5, liknuto: false },
  { id: 5, autor: 'Eva S.', inicialy: 'ES', barvaA: '#EEEDFE', textBarvaA: '#3C3489', cas: 'před 3 dny', podnik: 'Sushi Nara', podnikId: 6, text: 'Sushi Nara otevřelo novou pobočku na Vinohradech. Stejně skvělá kvalita jako vždy!', likes: 35, komentare: 9, liknuto: false },
];

export default function DiscussScreen({ navigation }) {
  const [prispevky, setPrispevky] = useState(INIT_PRISPEVKY);
  const [novyText, setNovyText] = useState('');
  const [piseme, setPiseme] = useState(false);

  const toggleLike = (id) => {
    setPrispevky(ps => ps.map(p =>
      p.id === id ? { ...p, liknuto: !p.liknuto, likes: p.liknuto ? p.likes - 1 : p.likes + 1 } : p
    ));
  };

  const pridatPrispevek = () => {
    if (!novyText.trim()) return;
    const novy = {
      id: Date.now(),
      autor: 'Já',
      inicialy: 'JÁ',
      barvaA: '#185FA5',
      textBarvaA: '#fff',
      cas: 'právě teď',
      podnik: 'okolí',
      podnikId: null,
      text: novyText.trim(),
      likes: 0,
      komentare: 0,
      liknuto: false,
    };
    setPrispevky(ps => [novy, ...ps]);
    setNovyText('');
    setPiseme(false);
  };

  return (
    <SafeAreaView style={s.container}>
      <View style={s.header}>
        <Text style={s.titl}>Diskuze v okolí</Text>
        <TouchableOpacity style={s.newBtn} onPress={() => setPiseme(!piseme)}>
          <Text style={s.newBtnTxt}>{piseme ? '✕ Zrušit' : '+ Přidat'}</Text>
        </TouchableOpacity>
      </View>

      {/* Formulář nového příspěvku */}
      {piseme && (
        <View style={s.formBox}>
          <TextInput
            style={s.formInput}
            placeholder="Co se děje v okolí?"
            placeholderTextColor="#aaa"
            value={novyText}
            onChangeText={setNovyText}
            multiline
            autoFocus
          />
          <TouchableOpacity
            style={[s.formBtn, !novyText.trim() && { opacity: 0.4 }]}
            onPress={pridatPrispevek}
            disabled={!novyText.trim()}
          >
            <Text style={s.formBtnTxt}>Zveřejnit</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView style={s.list} keyboardShouldPersistTaps="handled">
        {prispevky.map(p => (
          <View key={p.id} style={s.karta}>
            <View style={s.kartaTop}>
              <View style={[s.avatar, { backgroundColor: p.barvaA }]}>
                <Text style={[s.avatarTxt, { color: p.textBarvaA }]}>{p.inicialy}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={s.autor}>{p.autor}</Text>
                <Text style={s.meta}>{p.cas} {p.podnik ? `· ${p.podnik}` : ''}</Text>
              </View>
            </View>

            <Text style={s.text}>{p.text}</Text>

            {p.podnikId && (
              <TouchableOpacity
                style={s.podnikTag}
                onPress={() => {
                  const { PODNIKY } = require('../data/businesses');
                  const podnik = PODNIKY.find(x => x.id === p.podnikId);
                  if (podnik) navigation.navigate('Detail', { podnik });
                }}
              >
                <Text style={s.podnikTagTxt}>📍 {p.podnik}</Text>
              </TouchableOpacity>
            )}

            <View style={s.akce}>
              <TouchableOpacity style={s.akceBtn} onPress={() => toggleLike(p.id)}>
                <Text style={[s.akceTxt, p.liknuto && { color: '#E24B4A' }]}>
                  {p.liknuto ? '❤️' : '♡'}  {p.likes}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={s.akceBtn}>
                <Text style={s.akceTxt}>💬  {p.komentare}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={s.akceBtn}>
                <Text style={s.akceTxt}>↗  Sdílet</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: '#fff', borderBottomWidth: 0.5, borderBottomColor: '#e8e8e8' },
  titl: { fontSize: 22, fontWeight: '800', color: '#111' },
  newBtn: { backgroundColor: '#185FA5', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  newBtnTxt: { color: '#fff', fontSize: 13, fontWeight: '700' },
  formBox: { backgroundColor: '#fff', padding: 14, borderBottomWidth: 0.5, borderBottomColor: '#e8e8e8' },
  formInput: { backgroundColor: '#f5f5f5', borderRadius: 12, padding: 12, fontSize: 14, color: '#111', minHeight: 80, textAlignVertical: 'top', marginBottom: 10 },
  formBtn: { backgroundColor: '#185FA5', padding: 13, borderRadius: 12, alignItems: 'center' },
  formBtnTxt: { color: '#fff', fontWeight: '700', fontSize: 14 },
  list: { padding: 12 },
  karta: { backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 10, borderWidth: 0.5, borderColor: '#e8e8e8' },
  kartaTop: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  avatar: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  avatarTxt: { fontSize: 12, fontWeight: '700' },
  autor: { fontSize: 13, fontWeight: '700', color: '#111' },
  meta: { fontSize: 11, color: '#aaa', marginTop: 1 },
  text: { fontSize: 14, color: '#333', lineHeight: 21, marginBottom: 10 },
  podnikTag: { alignSelf: 'flex-start', backgroundColor: '#e8f0fb', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, marginBottom: 10 },
  podnikTagTxt: { fontSize: 12, color: '#185FA5', fontWeight: '600' },
  akce: { flexDirection: 'row', gap: 22 },
  akceBtn: { flexDirection: 'row', alignItems: 'center' },
  akceTxt: { fontSize: 13, color: '#999' },
});
