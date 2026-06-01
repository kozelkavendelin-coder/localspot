import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, SafeAreaView, Dimensions,
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { PODNIKY, barvaDleHodnoceni } from '../data/businesses';

const { width } = Dimensions.get('window');

const PRAHA = {
  latitude: 50.0755,
  longitude: 14.4378,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02,
};

export default function MapScreen({ navigation }) {
  const [vybrany, setVybrany] = useState(null);

  const otevritDetail = (podnik) => {
    setVybrany(null);
    navigation.navigate('Detail', { podnik });
  };

  return (
    <SafeAreaView style={s.container}>
      <MapView
        style={s.mapa}
        initialRegion={PRAHA}
        showsUserLocation
        showsMyLocationButton
      >
        {PODNIKY.map((p) => (
          <Marker
            key={p.id}
            coordinate={{ latitude: p.lat, longitude: p.lng }}
            onPress={() => setVybrany(p)}
          >
            <View style={[s.markerBubble, { backgroundColor: barvaDleHodnoceni(p.hodnoceni) }]}>
              <Text style={s.markerTxt}>{p.hodnoceni} ★</Text>
            </View>
            <View style={[s.markerArrow, { borderTopColor: barvaDleHodnoceni(p.hodnoceni) }]} />
          </Marker>
        ))}
      </MapView>

      {/* Legenda */}
      <View style={s.legenda}>
        {[['#2d9b5e','4.5+'],['#1D9E75','4.0–4.5'],['#BA7517','3.5–4.0'],['#E24B4A','< 3.5']].map(([b,l])=>(
          <View key={l} style={s.legendaItem}>
            <View style={[s.legendaDot, { backgroundColor: b }]} />
            <Text style={s.legendaTxt}>{l}</Text>
          </View>
        ))}
      </View>

      {/* Popup po kliknutí na marker */}
      {vybrany && (
        <View style={s.popup}>
          <View style={s.popupHandle} />
          <View style={s.popupRow}>
            <View style={[s.popupDot, { backgroundColor: barvaDleHodnoceni(vybrany.hodnoceni) }]} />
            <View style={{ flex: 1 }}>
              <Text style={s.popupNazev}>{vybrany.nazev}</Text>
              <Text style={s.popupSub}>{vybrany.typ} · {vybrany.vzdalenost} m</Text>
            </View>
            <TouchableOpacity onPress={() => setVybrany(null)}>
              <Text style={{ fontSize: 20, color: '#bbb', padding: 4 }}>✕</Text>
            </TouchableOpacity>
          </View>
          <View style={s.popupInfo}>
            <View style={[s.badge, { backgroundColor: barvaDleHodnoceni(vybrany.hodnoceni) }]}>
              <Text style={s.badgeTxt}>{vybrany.hodnoceni}/5 ★ ({vybrany.pocetHodnoceni})</Text>
            </View>
            <View style={[s.statusBadge, { backgroundColor: vybrany.otevreno ? '#e8f5ee' : '#fdeaea' }]}>
              <Text style={{ fontSize: 12, fontWeight: '600', color: vybrany.otevreno ? '#2d9b5e' : '#E24B4A' }}>
                {vybrany.otevreno ? `● Otevřeno ${vybrany.cas}` : '● Zavřeno'}
              </Text>
            </View>
          </View>
          <View style={s.popupBtns}>
            <TouchableOpacity style={s.btnPrimary} onPress={() => otevritDetail(vybrany)}>
              <Text style={s.btnPrimaryTxt}>Více informací</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.btnSecondary}>
              <Text style={s.btnSecondaryTxt}>🧭 Navigovat</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  mapa: { flex: 1 },
  markerBubble: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  markerTxt: { color: '#fff', fontSize: 11, fontWeight: '700' },
  markerArrow: { width: 0, height: 0, borderLeftWidth: 5, borderRightWidth: 5, borderTopWidth: 6, borderLeftColor: 'transparent', borderRightColor: 'transparent', alignSelf: 'center' },
  legenda: { position: 'absolute', top: 12, right: 12, backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: 10, padding: 9, borderWidth: 0.5, borderColor: '#e0e0e0' },
  legendaItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  legendaDot: { width: 10, height: 10, borderRadius: 2, marginRight: 6 },
  legendaTxt: { fontSize: 10, color: '#444' },
  popup: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 16, paddingBottom: 24, borderTopWidth: 0.5, borderTopColor: '#e8e8e8', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: { width: 0, height: -4 } },
  popupHandle: { width: 40, height: 4, backgroundColor: '#ddd', borderRadius: 2, alignSelf: 'center', marginBottom: 14 },
  popupRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  popupDot: { width: 42, height: 42, borderRadius: 10 },
  popupNazev: { fontSize: 16, fontWeight: '700', color: '#111' },
  popupSub: { fontSize: 12, color: '#888', marginTop: 2 },
  popupInfo: { flexDirection: 'row', gap: 8, marginBottom: 14, flexWrap: 'wrap' },
  badge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 7 },
  badgeTxt: { color: '#fff', fontSize: 12, fontWeight: '700' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 7 },
  popupBtns: { flexDirection: 'row', gap: 10 },
  btnPrimary: { flex: 1, backgroundColor: '#185FA5', padding: 13, borderRadius: 12, alignItems: 'center' },
  btnPrimaryTxt: { color: '#fff', fontWeight: '700', fontSize: 13 },
  btnSecondary: { flex: 1, borderWidth: 0.5, borderColor: '#ccc', padding: 13, borderRadius: 12, alignItems: 'center', backgroundColor: '#fafafa' },
  btnSecondaryTxt: { color: '#333', fontSize: 13, fontWeight: '600' },
});
