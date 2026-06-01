import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, Linking,
} from 'react-native';
import { barvaDleHodnoceni, inicialy } from '../data/businesses';

const HvezdyBar = ({ pocet }) => (
  <View style={{ flexDirection: 'row', gap: 2 }}>
    {[1,2,3,4,5].map(i => (
      <Text key={i} style={{ color: i <= pocet ? '#BA7517' : '#ddd', fontSize: 14 }}>★</Text>
    ))}
  </View>
);

export default function DetailScreen({ route, navigation }) {
  const { podnik } = route.params;
  const [oblibeny, setOblibeny] = useState(false);
  const barva = barvaDleHodnoceni(podnik.hodnoceni);

  return (
    <SafeAreaView style={s.container}>
      {/* Header s avatarem */}
      <View style={[s.header, { backgroundColor: barva + '22' }]}>
        <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
          <Text style={s.backBtnTxt}>←</Text>
        </TouchableOpacity>
        <View style={[s.avatar, { backgroundColor: barva }]}>
          <Text style={s.avatarTxt}>{inicialy(podnik.nazev)}</Text>
        </View>
        <TouchableOpacity style={s.srdceBtn} onPress={() => setOblibeny(!oblibeny)}>
          <Text style={{ fontSize: 26 }}>{oblibeny ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={s.body} showsVerticalScrollIndicator={false}>
        {/* Název a info */}
        <Text style={s.nazev}>{podnik.nazev}</Text>
        <Text style={s.typ}>{podnik.typ} · Praha</Text>

        <View style={s.badgeRow}>
          <View style={[s.badge, { backgroundColor: barva }]}>
            <Text style={s.badgeTxt}>{podnik.hodnoceni} ★  ({podnik.pocetHodnoceni} hodnocení)</Text>
          </View>
          <View style={[s.statusBadge, { backgroundColor: podnik.otevreno ? '#e8f5ee' : '#fdeaea' }]}>
            <Text style={{ fontSize: 12, fontWeight: '600', color: podnik.otevreno ? '#2d9b5e' : '#E24B4A' }}>
              {podnik.otevreno ? `● Otevřeno ${podnik.cas}` : `● Zavřeno · ${podnik.cas}`}
            </Text>
          </View>
        </View>

        {/* Akční tlačítka */}
        <View style={s.btnRow}>
          <TouchableOpacity style={[s.btnPrimary, { backgroundColor: barva }]}>
            <Text style={s.btnPrimaryTxt}>🧭  Navigovat</Text>
          </TouchableOpacity>
          {podnik.tel ? (
            <TouchableOpacity style={s.btnSecondary} onPress={() => Linking.openURL(`tel:${podnik.tel}`)}>
              <Text style={s.btnSecondaryTxt}>📞  Zavolat</Text>
            </TouchableOpacity>
          ) : null}
          {podnik.web ? (
            <TouchableOpacity style={s.btnSecondary} onPress={() => Linking.openURL(`https://${podnik.web}`)}>
              <Text style={s.btnSecondaryTxt}>🌐  Web</Text>
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Kontakt */}
        <View style={s.box}>
          <Text style={s.boxTitl}>Kontakt</Text>
          <Text style={s.boxRow}>📍  {podnik.adresa}</Text>
          {podnik.tel ? <Text style={s.boxRow}>📞  {podnik.tel}</Text> : null}
          {podnik.web ? <Text style={[s.boxRow, { color: '#185FA5' }]}>🌐  {podnik.web}</Text> : null}
        </View>

        {/* Otevírací doba */}
        <View style={s.box}>
          <Text style={s.boxTitl}>Otevírací doba</Text>
          {podnik.oteviraci.map((r, i) => (
            <View key={i} style={s.otevRow}>
              <Text style={s.otevDen}>{r.den}</Text>
              <Text style={[s.otevCas, r.cas === 'Zavřeno' && { color: '#E24B4A' }]}>{r.cas}</Text>
            </View>
          ))}
        </View>

        {/* Recenze */}
        <Text style={s.recenzeTitl}>Recenze ({podnik.pocetHodnoceni})</Text>
        {podnik.recenze.map((r, i) => (
          <View key={i} style={s.recenzeKarta}>
            <View style={s.recenzeHeader}>
              <View style={[s.recenzeAvatar, { backgroundColor: r.barva }]}>
                <Text style={[s.recenzeAvatarTxt, { color: r.textBarva }]}>{r.inicialy}</Text>
              </View>
              <View>
                <Text style={s.recenzeAutor}>{r.autor}</Text>
                <HvezdyBar pocet={r.hvezdy} />
              </View>
            </View>
            <Text style={s.recenzeTxt}>{r.text}</Text>
          </View>
        ))}

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { height: 150, alignItems: 'center', justifyContent: 'center' },
  backBtn: { position: 'absolute', top: 16, left: 16, backgroundColor: '#fff', width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, borderColor: '#ddd' },
  backBtnTxt: { fontSize: 20, color: '#333' },
  avatar: { width: 76, height: 76, borderRadius: 38, alignItems: 'center', justifyContent: 'center' },
  avatarTxt: { color: '#fff', fontSize: 26, fontWeight: '700' },
  srdceBtn: { position: 'absolute', top: 16, right: 16 },
  body: { flex: 1, padding: 16 },
  nazev: { fontSize: 22, fontWeight: '800', color: '#111', marginBottom: 4, marginTop: 4 },
  typ: { fontSize: 13, color: '#888', marginBottom: 12 },
  badgeRow: { flexDirection: 'row', gap: 8, marginBottom: 16, flexWrap: 'wrap' },
  badge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  badgeTxt: { color: '#fff', fontSize: 13, fontWeight: '700' },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  btnRow: { flexDirection: 'row', gap: 8, marginBottom: 16, flexWrap: 'wrap' },
  btnPrimary: { flex: 1, padding: 13, borderRadius: 12, alignItems: 'center' },
  btnPrimaryTxt: { color: '#fff', fontWeight: '700', fontSize: 13 },
  btnSecondary: { flex: 1, borderWidth: 0.5, borderColor: '#ccc', padding: 13, borderRadius: 12, alignItems: 'center', backgroundColor: '#fff' },
  btnSecondaryTxt: { color: '#333', fontSize: 13, fontWeight: '600' },
  box: { backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 12, borderWidth: 0.5, borderColor: '#ebebeb' },
  boxTitl: { fontSize: 14, fontWeight: '700', color: '#111', marginBottom: 10 },
  boxRow: { fontSize: 13, color: '#555', marginBottom: 5, lineHeight: 20 },
  otevRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5, borderBottomWidth: 0.5, borderBottomColor: '#f0f0f0' },
  otevDen: { fontSize: 13, color: '#777' },
  otevCas: { fontSize: 13, color: '#111', fontWeight: '500' },
  recenzeTitl: { fontSize: 16, fontWeight: '700', color: '#111', marginBottom: 10 },
  recenzeKarta: { backgroundColor: '#fff', borderRadius: 14, padding: 13, marginBottom: 8, borderWidth: 0.5, borderColor: '#ebebeb' },
  recenzeHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  recenzeAvatar: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  recenzeAvatarTxt: { fontSize: 12, fontWeight: '700' },
  recenzeAutor: { fontSize: 13, fontWeight: '600', color: '#111', marginBottom: 2 },
  recenzeTxt: { fontSize: 13, color: '#555', lineHeight: 19 },
});
