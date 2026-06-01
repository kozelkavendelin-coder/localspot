import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';

const PRISPEVKY = [
  { id: 1, autor: 'Martin N.', inicialy: 'MN', barva: '#B5D4F4', textBarva: '#0C447C', cas: 'před 2 hod', podnik: 'U Zlatého Kohouta', text: 'Dnes jsem tu byl poprvé — svíčková byla fantastická! Určitě doporučuju.', likes: 12, komentare: 3 },
  { id: 2, autor: 'Klára H.', inicialy: 'KH', barva: '#C0DD97', textBarva: '#3B6D11', cas: 'před 5 hod', podnik: 'Kavárna Světlá', text: 'Mění od příštího týdne otevírací dobu? Na dveřích byl lístek ale nešlo přečíst...', likes: 4, komentare: 7 },
  { id: 3, autor: 'Petra R.', inicialy: 'PR', barva: '#F4C0D1', textBarva: '#72243E', cas: 'před 1 dnem', podnik: 'okolí Žižkova', text: 'Otevírá se thajský bistro na Mánesově? Viděla jsem tam pracovníky celý týden.', likes: 8, komentare: 14 },
  { id: 4, autor: 'Tomáš V.', inicialy: 'TV', barva: '#FAC775', textBarva: '#633806', cas: 'před 2 dny', podnik: 'Albert Korunní', text: 'Nové samoobslužné pokladny jsou konečně funkční. Fronta letí 👍', likes: 21, komentare: 5 },
];

export default function DiscussScreen() {
  const [likes, setLikes] = useState({});

  const toggleLike = (id, puvodni) => {
    setLikes(l => ({ ...l, [id]: l[id] === undefined ? puvodni + 1 : undefined }));
  };

  return (
    <SafeAreaView style={s.container}>
      <View style={s.header}>
        <Text style={s.titl}>Diskuze v okolí</Text>
        <TouchableOpacity style={s.newBtn}>
          <Text style={s.newBtnTxt}>+ Přidat</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={s.list}>
        {PRISPEVKY.map(p => {
          const likeCount = likes[p.id] !== undefined ? likes[p.id] : p.likes;
          const liked = likes[p.id] !== undefined;
          return (
            <View key={p.id} style={s.karta}>
              <View style={s.kartaTop}>
                <View style={[s.avatar, { backgroundColor: p.barva }]}>
                  <Text style={[s.avatarTxt, { color: p.textBarva }]}>{p.inicialy}</Text>
                </View>
                <View>
                  <Text style={s.autor}>{p.autor}</Text>
                  <Text style={s.meta}>{p.cas} · {p.podnik}</Text>
                </View>
              </View>
              <Text style={s.text}>{p.text}</Text>
              <View style={s.akce}>
                <TouchableOpacity onPress={() => toggleLike(p.id, p.likes)} style={s.akceBtn}>
                  <Text style={[s.akceTxt, liked && { color: '#E24B4A' }]}>
                    {liked ? '❤️' : '♡'} {likeCount}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.akceBtn}>
                  <Text style={s.akceTxt}>💬 {p.komentare}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={s.akceBtn}>
                  <Text style={s.akceTxt}>↗ Sdílet</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: '#fff', borderBottomWidth: 0.5, borderBottomColor: '#e0e0e0' },
  titl: { fontSize: 20, fontWeight: '700', color: '#111' },
  newBtn: { backgroundColor: '#185FA5', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  newBtnTxt: { color: '#fff', fontSize: 13, fontWeight: '600' },
  list: { padding: 12 },
  karta: { backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 10, borderWidth: 0.5, borderColor: '#e8e8e8' },
  kartaTop: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  avatar: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  avatarTxt: { fontSize: 12, fontWeight: '700' },
  autor: { fontSize: 13, fontWeight: '600', color: '#111' },
  meta: { fontSize: 11, color: '#999' },
  text: { fontSize: 13, color: '#333', lineHeight: 20, marginBottom: 12 },
  akce: { flexDirection: 'row', gap: 20 },
  akceBtn: { flexDirection: 'row', alignItems: 'center' },
  akceTxt: { fontSize: 12, color: '#888' },
});
