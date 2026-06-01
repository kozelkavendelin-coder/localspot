import React, { useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  SafeAreaView, TextInput, Modal, Linking, StatusBar,
} from 'react-native';

// ─── DATA ────────────────────────────────────────────────────────────────────

const PODNIKY = [
  { id:1, nazev:'U Zlatého Kohouta', typ:'Restaurace', kat:'Restaurace', hodnoceni:4.6, pocetH:142, vzdalenost:320, otevreno:true, cas:'do 23:00', adresa:'Náměstí Míru 14, Praha 2', tel:'+420 222 333 444', web:'ukohouta.cz', oteviraci:[{den:'Po – Pá',cas:'11:00 – 23:00'},{den:'Sobota',cas:'12:00 – 23:00'},{den:'Neděle',cas:'Zavřeno'}], recenze:[{autor:'Jan N.',ini:'JN',bA:'#B5D4F4',bT:'#0C447C',h:5,txt:'Skvělá svíčková, obsluha milá. Opakovaně navštěvujeme s rodinou!'},{autor:'Anna K.',ini:'AK',bA:'#F4C0D1',bT:'#72243E',h:4,txt:'Příjemné prostředí, akorát čekací doba byla delší.'}]},
  { id:2, nazev:'Kavárna Světlá', typ:'Kavárna', kat:'Kavárny', hodnoceni:4.2, pocetH:89, vzdalenost:450, otevreno:true, cas:'do 20:00', adresa:'Světlá 8, Praha 1', tel:'+420 211 222 333', web:'kavarnasvetla.cz', oteviraci:[{den:'Po – Pá',cas:'8:00 – 20:00'},{den:'Sobota',cas:'9:00 – 18:00'},{den:'Neděle',cas:'10:00 – 16:00'}], recenze:[{autor:'Petra M.',ini:'PM',bA:'#C0DD97',bT:'#3B6D11',h:4,txt:'Výborná káva a klidné prostředí. Ideální na práci.'}]},
  { id:3, nazev:'Pizzeria Roma', typ:'Restaurace', kat:'Restaurace', hodnoceni:3.8, pocetH:67, vzdalenost:680, otevreno:true, cas:'do 22:00', adresa:'Romana 3, Praha 2', tel:'+420 233 444 555', web:'pizzeriaroma.cz', oteviraci:[{den:'Po – Ne',cas:'11:00 – 22:00'}], recenze:[{autor:'Karel B.',ini:'KB',bA:'#FAC775',bT:'#633806',h:3,txt:'Dobrá pizza, ale čekací doba dlouhá.'}]},
  { id:4, nazev:'Albert', typ:'Supermarket', kat:'Nákupy', hodnoceni:4.1, pocetH:213, vzdalenost:200, otevreno:true, cas:'do 22:00', adresa:'Korunní 1, Praha 2', tel:'+420 800 100 100', web:'albert.cz', oteviraci:[{den:'Po – So',cas:'7:00 – 22:00'},{den:'Neděle',cas:'8:00 – 21:00'}], recenze:[{autor:'Lucie V.',ini:'LV',bA:'#B5D4F4',bT:'#0C447C',h:4,txt:'Dobrý výběr, čisto, příjemná obsluha.'}]},
  { id:5, nazev:'Hospoda Na Kopci', typ:'Hospoda', kat:'Bary', hodnoceni:3.2, pocetH:44, vzdalenost:820, otevreno:false, cas:'Otevírá ve 16:00', adresa:'Kopečná 5, Praha 3', tel:'+420 244 555 666', web:'', oteviraci:[{den:'Po – Pá',cas:'16:00 – 24:00'},{den:'So – Ne',cas:'14:00 – 24:00'}], recenze:[{autor:'Ondřej K.',ini:'OK',bA:'#D3D1C7',bT:'#444441',h:3,txt:'Klasická hospoda, levné pivo.'}]},
  { id:6, nazev:'Sushi Nara', typ:'Restaurace', kat:'Restaurace', hodnoceni:4.7, pocetH:198, vzdalenost:550, otevreno:true, cas:'do 22:30', adresa:'Mánesova 12, Praha 2', tel:'+420 255 666 777', web:'sushinara.cz', oteviraci:[{den:'Po – Ne',cas:'11:30 – 22:30'}], recenze:[{autor:'Marie H.',ini:'MH',bA:'#EEEDFE',bT:'#3C3489',h:5,txt:'Nejlepší sushi v Praze! Čerstvé ryby, skvělý servis.'}]},
];

const PRISPEVKY_INIT = [
  {id:1,autor:'Martin N.',ini:'MN',bA:'#B5D4F4',bT:'#0C447C',cas:'před 2 hod',podnik:'U Zlatého Kohouta',podnikId:1,txt:'Dnes jsem tu byl poprvé — svíčková byla fantastická! Určitě doporučuju.',likes:12,kom:3,liknuto:false},
  {id:2,autor:'Klára H.',ini:'KH',bA:'#C0DD97',bT:'#3B6D11',cas:'před 5 hod',podnik:'Kavárna Světlá',podnikId:2,txt:'Mění od příštího týdne otevírací dobu? Na dveřích byl lístek ale nešlo přečíst...',likes:4,kom:7,liknuto:false},
  {id:3,autor:'Petra R.',ini:'PR',bA:'#F4C0D1',bT:'#72243E',cas:'před 1 dnem',podnik:'okolí Žižkova',podnikId:null,txt:'Otevírá se thajský bistro na Mánesově? Viděla jsem tam pracovníky celý týden.',likes:8,kom:14,liknuto:false},
  {id:4,autor:'Tomáš V.',ini:'TV',bA:'#FAC775',bT:'#633806',cas:'před 2 dny',podnik:'Albert Korunní',podnikId:4,txt:'Nové samoobslužné pokladny jsou konečně funkční. Fronta letí 👍',likes:21,kom:5,liknuto:false},
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const barva = (h) => h >= 4.5 ? '#2d9b5e' : h >= 4.0 ? '#1D9E75' : h >= 3.5 ? '#BA7517' : '#E24B4A';
const ini = (n) => n.split(' ').map(s => s[0]).join('').slice(0,2).toUpperCase();
const KATEGORIE = ['Vše','Restaurace','Kavárny','Nákupy','Bary','Služby'];

// ─── KOMPONENTY ──────────────────────────────────────────────────────────────

const BizCard = ({ p, onPress }) => (
  <TouchableOpacity style={c.karta} onPress={onPress} activeOpacity={0.75}>
    <View style={[c.avatar, {backgroundColor: barva(p.hodnoceni)}]}>
      <Text style={c.avatarTxt}>{ini(p.nazev)}</Text>
    </View>
    <View style={c.kardaInfo}>
      <Text style={c.kartaNazev} numberOfLines={1}>{p.nazev}</Text>
      <Text style={c.kartaSub}>{p.kat} · {p.vzdalenost} m</Text>
      <View style={c.kartaRow}>
        <View style={[c.badge, {backgroundColor: barva(p.hodnoceni)}]}>
          <Text style={c.badgeTxt}>{p.hodnoceni} ★</Text>
        </View>
        <Text style={p.otevreno ? c.open : c.closed}>{p.otevreno ? 'Otevřeno' : 'Zavřeno'}</Text>
        <Text style={c.cas}>{p.cas}</Text>
      </View>
    </View>
    <Text style={c.arrow}>›</Text>
  </TouchableOpacity>
);

// ─── OBRAZOVKY ───────────────────────────────────────────────────────────────

function MapaScreen({ onDetail }) {
  const [vybrany, setVybrany] = useState(null);

  // Simulace mapy — skutečná mapa bude po přidání Google Maps API klíče
  const pozice = [
    {id:1, x:'18%', y:'20%'}, {id:2, x:'62%', y:'35%'},
    {id:3, x:'78%', y:'18%'}, {id:4, x:'28%', y:'60%'},
    {id:5, x:'70%', y:'62%'}, {id:6, x:'50%', y:'45%'},
  ];

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={m.mapa}>
        {/* Mapa pozadí */}
        <View style={m.mapaBg}>
          <View style={[m.road, {top:'42%', left:0, right:0, height:16}]} />
          <View style={[m.road, {top:0, bottom:0, left:'48%', width:16}]} />
          <View style={[m.block, {top:'8%', left:'5%', width:70, height:50}]} />
          <View style={[m.block, {top:'12%', left:'60%', width:80, height:55}]} />
          <View style={[m.block, {top:'55%', left:'5%', width:65, height:44}]} />
          <View style={[m.block, {top:'52%', left:'58%', width:75, height:50}]} />
          <View style={[m.park, {top:'28%', left:'26%', width:'18%', height:'10%'}]} />
        </View>

        {/* Modrá tečka (uživatel) */}
        <View style={m.userDot} />

        {/* Markery podniků */}
        {pozice.map(pos => {
          const p = PODNIKY.find(x => x.id === pos.id);
          if (!p) return null;
          return (
            <TouchableOpacity
              key={p.id}
              style={[m.marker, {left: pos.x, top: pos.y}]}
              onPress={() => setVybrany(p)}
            >
              <View style={[m.markerBubble, {backgroundColor: barva(p.hodnoceni)}]}>
                <Text style={m.markerTxt}>{p.hodnoceni} ★</Text>
              </View>
              <View style={[m.markerArrow, {borderTopColor: barva(p.hodnoceni)}]} />
            </TouchableOpacity>
          );
        })}

        {/* Legenda */}
        <View style={m.legenda}>
          {[['#2d9b5e','4.5+'],['#1D9E75','4.0–4.5'],['#BA7517','3.5–4.0'],['#E24B4A','<3.5']].map(([b,l])=>(
            <View key={l} style={m.legendaItem}>
              <View style={[m.legendaDot, {backgroundColor:b}]} />
              <Text style={m.legendaTxt}>{l}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Popup */}
      {vybrany && (
        <View style={m.popup}>
          <View style={m.handle} />
          <View style={{flexDirection:'row', alignItems:'center', gap:10, marginBottom:10}}>
            <View style={[m.popupDot, {backgroundColor: barva(vybrany.hodnoceni)}]} />
            <View style={{flex:1}}>
              <Text style={m.popupNazev}>{vybrany.nazev}</Text>
              <Text style={m.popupSub}>{vybrany.typ} · {vybrany.vzdalenost} m</Text>
            </View>
            <TouchableOpacity onPress={() => setVybrany(null)}>
              <Text style={{fontSize:20, color:'#bbb', padding:4}}>✕</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row', gap:8, marginBottom:14, flexWrap:'wrap'}}>
            <View style={[c.badge, {backgroundColor: barva(vybrany.hodnoceni)}]}>
              <Text style={c.badgeTxt}>{vybrany.hodnoceni}/5 ★ ({vybrany.pocetH})</Text>
            </View>
            <View style={[m.statusBadge, {backgroundColor: vybrany.otevreno ? '#e8f5ee' : '#fdeaea'}]}>
              <Text style={{fontSize:12, fontWeight:'600', color: vybrany.otevreno ? '#2d9b5e' : '#E24B4A'}}>
                {vybrany.otevreno ? `● Otevřeno ${vybrany.cas}` : '● Zavřeno'}
              </Text>
            </View>
          </View>
          <View style={{flexDirection:'row', gap:10}}>
            <TouchableOpacity style={m.btnP} onPress={() => { setVybrany(null); onDetail(vybrany); }}>
              <Text style={m.btnPTxt}>Více informací</Text>
            </TouchableOpacity>
            <TouchableOpacity style={m.btnS}>
              <Text style={m.btnSTxt}>🧭 Navigovat</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

function HledatScreen({ onDetail }) {
  const [kat, setKat] = useState('Vše');
  const [jenOtev, setJenOtev] = useState(false);
  const [razeni, setRazeni] = useState('vzdalenost');
  const [query, setQuery] = useState('');

  const filtrovane = useMemo(() =>
    PODNIKY
      .filter(p => kat === 'Vše' || p.kat === kat)
      .filter(p => !jenOtev || p.otevreno)
      .filter(p => !query || p.nazev.toLowerCase().includes(query.toLowerCase()))
      .sort((a,b) => razeni === 'hodnoceni' ? b.hodnoceni - a.hodnoceni : a.vzdalenost - b.vzdalenost),
  [kat, jenOtev, razeni, query]);

  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#f5f5f5'}}>
      <View style={h.header}>
        <View style={h.searchWrap}>
          <Text style={{fontSize:15, marginRight:6}}>🔍</Text>
          <TextInput style={h.input} placeholder="Hledat podniky..." placeholderTextColor="#aaa" value={query} onChangeText={setQuery} />
          {query.length > 0 && <TouchableOpacity onPress={() => setQuery('')}><Text style={{color:'#aaa', fontSize:16, paddingHorizontal:8}}>✕</Text></TouchableOpacity>}
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginBottom:10}}>
          {KATEGORIE.map(k => (
            <TouchableOpacity key={k} style={[h.chip, kat===k && h.chipA]} onPress={() => setKat(k)}>
              <Text style={[h.chipTxt, kat===k && h.chipTxtA]}>{k}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={{flexDirection:'row', gap:8, paddingBottom:10, flexWrap:'wrap'}}>
          <TouchableOpacity style={[h.filtr, jenOtev && {backgroundColor:'#e8f5ee'}]} onPress={() => setJenOtev(!jenOtev)}>
            <Text style={[h.filtrTxt, jenOtev && {color:'#2d9b5e', fontWeight:'700'}]}>● Otevřeno</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[h.filtr, razeni==='vzdalenost' && {backgroundColor:'#e8f0fb'}]} onPress={() => setRazeni('vzdalenost')}>
            <Text style={[h.filtrTxt, razeni==='vzdalenost' && {color:'#185FA5', fontWeight:'700'}]}>📍 Vzdálenost</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[h.filtr, razeni==='hodnoceni' && {backgroundColor:'#e8f0fb'}]} onPress={() => setRazeni('hodnoceni')}>
            <Text style={[h.filtrTxt, razeni==='hodnoceni' && {color:'#185FA5', fontWeight:'700'}]}>★ Hodnocení</Text>
          </TouchableOpacity>
        </View>
        <Text style={{fontSize:11, color:'#aaa', paddingBottom:10}}>{filtrovane.length} podniků</Text>
      </View>
      <ScrollView style={{padding:12}} keyboardShouldPersistTaps="handled">
        {filtrovane.length === 0
          ? <View style={{alignItems:'center', paddingTop:60, gap:8}}><Text style={{fontSize:36}}>🔍</Text><Text style={{fontSize:15, color:'#888'}}>Žádné výsledky</Text></View>
          : filtrovane.map(p => <BizCard key={p.id} p={p} onPress={() => onDetail(p)} />)
        }
        <View style={{height:20}} />
      </ScrollView>
    </SafeAreaView>
  );
}

function OblibeneScreen({ onDetail }) {
  const [oblibene, setOblibene] = useState([PODNIKY[0], PODNIKY[1]]);
  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#f5f5f5'}}>
      <View style={{flexDirection:'row', alignItems:'baseline', justifyContent:'space-between', padding:16, paddingBottom:12, backgroundColor:'#fff', borderBottomWidth:0.5, borderBottomColor:'#e8e8e8'}}>
        <Text style={{fontSize:22, fontWeight:'800', color:'#111'}}>Oblíbené</Text>
        <Text style={{fontSize:13, color:'#aaa'}}>{oblibene.length} podniků</Text>
      </View>
      {oblibene.length === 0
        ? <View style={{flex:1, alignItems:'center', justifyContent:'center', gap:10, padding:32}}>
            <Text style={{fontSize:52}}>🤍</Text>
            <Text style={{fontSize:18, fontWeight:'700', color:'#333'}}>Zatím žádné oblíbené</Text>
            <Text style={{fontSize:14, color:'#999', textAlign:'center'}}>Přidejte je klepnutím na ❤️ v detailu podniku</Text>
          </View>
        : <ScrollView style={{padding:12}}>
            {oblibene.map(p => (
              <View key={p.id}>
                <BizCard p={p} onPress={() => onDetail(p)} />
                <TouchableOpacity style={{marginTop:-4, marginBottom:14, alignItems:'center'}} onPress={() => setOblibene(o => o.filter(x => x.id !== p.id))}>
                  <Text style={{fontSize:12, color:'#E24B4A'}}>Odebrat z oblíbených</Text>
                </TouchableOpacity>
              </View>
            ))}
            <View style={{height:20}} />
          </ScrollView>
      }
    </SafeAreaView>
  );
}

function DiskuzeScreen({ onDetail }) {
  const [prispevky, setPrispevky] = useState(PRISPEVKY_INIT);
  const [novyTxt, setNovyTxt] = useState('');
  const [piseme, setPiseme] = useState(false);

  const toggleLike = (id) => setPrispevky(ps => ps.map(p =>
    p.id === id ? {...p, liknuto: !p.liknuto, likes: p.liknuto ? p.likes-1 : p.likes+1} : p
  ));

  const pridat = () => {
    if (!novyTxt.trim()) return;
    setPrispevky(ps => [{id:Date.now(), autor:'Já', ini:'JÁ', bA:'#185FA5', bT:'#fff', cas:'právě teď', podnik:'', podnikId:null, txt:novyTxt.trim(), likes:0, kom:0, liknuto:false}, ...ps]);
    setNovyTxt(''); setPiseme(false);
  };

  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#f5f5f5'}}>
      <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', padding:16, backgroundColor:'#fff', borderBottomWidth:0.5, borderBottomColor:'#e8e8e8'}}>
        <Text style={{fontSize:22, fontWeight:'800', color:'#111'}}>Diskuze v okolí</Text>
        <TouchableOpacity style={{backgroundColor:'#185FA5', paddingHorizontal:16, paddingVertical:8, borderRadius:20}} onPress={() => setPiseme(!piseme)}>
          <Text style={{color:'#fff', fontSize:13, fontWeight:'700'}}>{piseme ? '✕ Zrušit' : '+ Přidat'}</Text>
        </TouchableOpacity>
      </View>
      {piseme && (
        <View style={{backgroundColor:'#fff', padding:14, borderBottomWidth:0.5, borderBottomColor:'#e8e8e8'}}>
          <TextInput style={{backgroundColor:'#f5f5f5', borderRadius:12, padding:12, fontSize:14, color:'#111', minHeight:70, textAlignVertical:'top', marginBottom:10}} placeholder="Co se děje v okolí?" placeholderTextColor="#aaa" value={novyTxt} onChangeText={setNovyTxt} multiline autoFocus />
          <TouchableOpacity style={[{backgroundColor:'#185FA5', padding:13, borderRadius:12, alignItems:'center'}, !novyTxt.trim() && {opacity:0.4}]} onPress={pridat} disabled={!novyTxt.trim()}>
            <Text style={{color:'#fff', fontWeight:'700', fontSize:14}}>Zveřejnit</Text>
          </TouchableOpacity>
        </View>
      )}
      <ScrollView style={{padding:12}} keyboardShouldPersistTaps="handled">
        {prispevky.map(p => (
          <View key={p.id} style={{backgroundColor:'#fff', borderRadius:14, padding:14, marginBottom:10, borderWidth:0.5, borderColor:'#e8e8e8'}}>
            <View style={{flexDirection:'row', alignItems:'center', gap:10, marginBottom:10}}>
              <View style={{width:38, height:38, borderRadius:19, backgroundColor:p.bA, alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontSize:12, fontWeight:'700', color:p.bT}}>{p.ini}</Text>
              </View>
              <View style={{flex:1}}>
                <Text style={{fontSize:13, fontWeight:'700', color:'#111'}}>{p.autor}</Text>
                <Text style={{fontSize:11, color:'#aaa'}}>{p.cas}{p.podnik ? ` · ${p.podnik}` : ''}</Text>
              </View>
            </View>
            <Text style={{fontSize:14, color:'#333', lineHeight:21, marginBottom:10}}>{p.txt}</Text>
            {p.podnikId && (
              <TouchableOpacity style={{alignSelf:'flex-start', backgroundColor:'#e8f0fb', paddingHorizontal:10, paddingVertical:5, borderRadius:8, marginBottom:10}} onPress={() => { const pod = PODNIKY.find(x => x.id === p.podnikId); if(pod) onDetail(pod); }}>
                <Text style={{fontSize:12, color:'#185FA5', fontWeight:'600'}}>📍 {p.podnik}</Text>
              </TouchableOpacity>
            )}
            <View style={{flexDirection:'row', gap:22}}>
              <TouchableOpacity onPress={() => toggleLike(p.id)}>
                <Text style={{fontSize:13, color: p.liknuto ? '#E24B4A' : '#999'}}>{p.liknuto ? '❤️' : '♡'}  {p.likes}</Text>
              </TouchableOpacity>
              <Text style={{fontSize:13, color:'#999'}}>💬  {p.kom}</Text>
              <Text style={{fontSize:13, color:'#999'}}>↗  Sdílet</Text>
            </View>
          </View>
        ))}
        <View style={{height:20}} />
      </ScrollView>
    </SafeAreaView>
  );
}

function DetailScreen({ podnik: p, onBack, onFav, jeFav }) {
  const b = barva(p.hodnoceni);
  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#f5f5f5'}}>
      <View style={[d.header, {backgroundColor: b + '22'}]}>
        <TouchableOpacity style={d.backBtn} onPress={onBack}>
          <Text style={{fontSize:20, color:'#333'}}>←</Text>
        </TouchableOpacity>
        <View style={[d.avatar, {backgroundColor: b}]}>
          <Text style={{color:'#fff', fontSize:26, fontWeight:'700'}}>{ini(p.nazev)}</Text>
        </View>
        <TouchableOpacity style={d.favBtn} onPress={onFav}>
          <Text style={{fontSize:28}}>{jeFav ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{padding:16}} showsVerticalScrollIndicator={false}>
        <Text style={{fontSize:22, fontWeight:'800', color:'#111', marginBottom:4}}>{p.nazev}</Text>
        <Text style={{fontSize:13, color:'#888', marginBottom:12}}>{p.typ} · Praha</Text>
        <View style={{flexDirection:'row', gap:8, marginBottom:16, flexWrap:'wrap'}}>
          <View style={[c.badge, {backgroundColor:b}]}>
            <Text style={c.badgeTxt}>{p.hodnoceni} ★  ({p.pocetH} hodnocení)</Text>
          </View>
          <View style={{backgroundColor: p.otevreno ? '#e8f5ee' : '#fdeaea', paddingHorizontal:12, paddingVertical:6, borderRadius:8}}>
            <Text style={{fontSize:12, fontWeight:'600', color: p.otevreno ? '#2d9b5e' : '#E24B4A'}}>
              {p.otevreno ? `● Otevřeno ${p.cas}` : `● Zavřeno · ${p.cas}`}
            </Text>
          </View>
        </View>
        <View style={{flexDirection:'row', gap:8, marginBottom:16, flexWrap:'wrap'}}>
          <TouchableOpacity style={[d.btn, {backgroundColor:b, flex:1}]}>
            <Text style={{color:'#fff', fontWeight:'700', fontSize:13}}>🧭  Navigovat</Text>
          </TouchableOpacity>
          {p.tel ? <TouchableOpacity style={[d.btn, {flex:1, borderWidth:0.5, borderColor:'#ccc', backgroundColor:'#fff'}]} onPress={() => Linking.openURL(`tel:${p.tel}`)}><Text style={{color:'#333', fontSize:13, fontWeight:'600'}}>📞  Zavolat</Text></TouchableOpacity> : null}
        </View>
        <View style={d.box}>
          <Text style={d.boxTitl}>Kontakt</Text>
          <Text style={d.boxRow}>📍  {p.adresa}</Text>
          {p.tel ? <Text style={d.boxRow}>📞  {p.tel}</Text> : null}
          {p.web ? <Text style={[d.boxRow, {color:'#185FA5'}]}>🌐  {p.web}</Text> : null}
        </View>
        <View style={d.box}>
          <Text style={d.boxTitl}>Otevírací doba</Text>
          {p.oteviraci.map((r,i) => (
            <View key={i} style={{flexDirection:'row', justifyContent:'space-between', paddingVertical:5, borderBottomWidth:0.5, borderBottomColor:'#f0f0f0'}}>
              <Text style={{fontSize:13, color:'#777'}}>{r.den}</Text>
              <Text style={{fontSize:13, color: r.cas==='Zavřeno' ? '#E24B4A' : '#111', fontWeight:'500'}}>{r.cas}</Text>
            </View>
          ))}
        </View>
        <Text style={{fontSize:16, fontWeight:'700', color:'#111', marginBottom:10}}>Recenze ({p.pocetH})</Text>
        {p.recenze.map((r,i) => (
          <View key={i} style={[d.box, {marginBottom:8}]}>
            <View style={{flexDirection:'row', alignItems:'center', gap:10, marginBottom:8}}>
              <View style={{width:34, height:34, borderRadius:17, backgroundColor:r.bA, alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontSize:12, fontWeight:'700', color:r.bT}}>{r.ini}</Text>
              </View>
              <View>
                <Text style={{fontSize:13, fontWeight:'600', color:'#111'}}>{r.autor}</Text>
                <Text style={{color:'#BA7517', fontSize:13}}>{'★'.repeat(r.h) + '☆'.repeat(5-r.h)}</Text>
              </View>
            </View>
            <Text style={{fontSize:13, color:'#555', lineHeight:19}}>{r.txt}</Text>
          </View>
        ))}
        <View style={{height:30}} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── HLAVNÍ APLIKACE ─────────────────────────────────────────────────────────

const TABS = ['Oblíbené','Hledat','Mapa','Diskuze'];
const TAB_ICONS = {'Oblíbené':'❤️','Hledat':'🔍','Mapa':'🗺️','Diskuze':'💬'};

export default function App() {
  const [aktTab, setAktTab] = useState('Mapa');
  const [detail, setDetail] = useState(null);
  const [oblibene, setOblibene] = useState([1,2]);

  const toggleFav = (id) => setOblibene(o => o.includes(id) ? o.filter(x => x !== id) : [...o, id]);

  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
      <StatusBar barStyle="dark-content" />

      {/* Obsah */}
      <View style={{flex:1}}>
        {detail ? (
          <DetailScreen
            podnik={detail}
            onBack={() => setDetail(null)}
            onFav={() => toggleFav(detail.id)}
            jeFav={oblibene.includes(detail.id)}
          />
        ) : aktTab === 'Mapa' ? (
          <MapaScreen onDetail={setDetail} />
        ) : aktTab === 'Hledat' ? (
          <HledatScreen onDetail={setDetail} />
        ) : aktTab === 'Oblíbené' ? (
          <OblibeneScreen onDetail={setDetail} />
        ) : (
          <DiskuzeScreen onDetail={setDetail} />
        )}
      </View>

      {/* Bottom navigace */}
      {!detail && (
        <View style={nav.bar}>
          {TABS.map(tab => (
            <TouchableOpacity key={tab} style={nav.item} onPress={() => setAktTab(tab)}>
              <Text style={{fontSize: tab==='Mapa' ? 26 : 22, opacity: aktTab===tab ? 1 : 0.35}}>
                {TAB_ICONS[tab]}
              </Text>
              <Text style={[nav.label, aktTab===tab && nav.labelA]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
}

// ─── STYLY ───────────────────────────────────────────────────────────────────

const c = StyleSheet.create({
  karta: {backgroundColor:'#fff', borderRadius:14, padding:13, marginBottom:9, flexDirection:'row', alignItems:'center', borderWidth:0.5, borderColor:'#e8e8e8'},
  avatar: {width:54, height:54, borderRadius:12, alignItems:'center', justifyContent:'center', marginRight:12},
  avatarTxt: {color:'#fff', fontSize:18, fontWeight:'700'},
  kardaInfo: {flex:1},
  kartaNazev: {fontSize:14, fontWeight:'700', color:'#111', marginBottom:2},
  kartaSub: {fontSize:11, color:'#888', marginBottom:5},
  kartaRow: {flexDirection:'row', alignItems:'center', gap:7},
  badge: {paddingHorizontal:8, paddingVertical:3, borderRadius:6},
  badgeTxt: {color:'#fff', fontSize:11, fontWeight:'700'},
  open: {fontSize:11, color:'#2d9b5e', fontWeight:'600'},
  closed: {fontSize:11, color:'#E24B4A', fontWeight:'600'},
  cas: {fontSize:10, color:'#aaa'},
  arrow: {fontSize:22, color:'#ddd', marginLeft:4},
});

const m = StyleSheet.create({
  mapa: {flex:1, position:'relative'},
  mapaBg: {position:'absolute', inset:0, backgroundColor:'#dce8d4'},
  road: {position:'absolute', backgroundColor:'white'},
  block: {position:'absolute', backgroundColor:'#bfcea8', borderRadius:2},
  park: {position:'absolute', backgroundColor:'#b5d9a0', borderRadius:4},
  userDot: {position:'absolute', left:'50%', top:'48%', width:14, height:14, borderRadius:7, backgroundColor:'#185FA5', borderWidth:2.5, borderColor:'white', marginLeft:-7, marginTop:-7, zIndex:5},
  marker: {position:'absolute', alignItems:'center', transform:[{translateX:-30}]},
  markerBubble: {paddingHorizontal:8, paddingVertical:4, borderRadius:8},
  markerTxt: {color:'#fff', fontSize:11, fontWeight:'700'},
  markerArrow: {width:0, height:0, borderLeftWidth:5, borderRightWidth:5, borderTopWidth:6, borderLeftColor:'transparent', borderRightColor:'transparent'},
  legenda: {position:'absolute', top:12, right:12, backgroundColor:'rgba(255,255,255,0.95)', borderRadius:10, padding:9, borderWidth:0.5, borderColor:'#e0e0e0'},
  legendaItem: {flexDirection:'row', alignItems:'center', marginBottom:4},
  legendaDot: {width:10, height:10, borderRadius:2, marginRight:6},
  legendaTxt: {fontSize:10, color:'#444'},
  popup: {backgroundColor:'#fff', borderTopLeftRadius:20, borderTopRightRadius:20, padding:16, paddingBottom:24, borderTopWidth:0.5, borderTopColor:'#e8e8e8'},
  handle: {width:40, height:4, backgroundColor:'#ddd', borderRadius:2, alignSelf:'center', marginBottom:14},
  popupDot: {width:42, height:42, borderRadius:10},
  popupNazev: {fontSize:16, fontWeight:'700', color:'#111'},
  popupSub: {fontSize:12, color:'#888', marginTop:2},
  statusBadge: {paddingHorizontal:10, paddingVertical:5, borderRadius:7},
  btnP: {flex:1, backgroundColor:'#185FA5', padding:13, borderRadius:12, alignItems:'center'},
  btnPTxt: {color:'#fff', fontWeight:'700', fontSize:13},
  btnS: {flex:1, borderWidth:0.5, borderColor:'#ccc', padding:13, borderRadius:12, alignItems:'center', backgroundColor:'#fafafa'},
  btnSTxt: {color:'#333', fontSize:13, fontWeight:'600'},
});

const h = StyleSheet.create({
  header: {backgroundColor:'#fff', paddingHorizontal:14, paddingTop:12, borderBottomWidth:0.5, borderBottomColor:'#e8e8e8'},
  searchWrap: {flexDirection:'row', alignItems:'center', backgroundColor:'#f2f2f2', borderRadius:14, paddingHorizontal:12, marginBottom:12},
  input: {flex:1, fontSize:14, color:'#111', paddingVertical:11},
  chip: {paddingHorizontal:15, paddingVertical:7, borderRadius:20, backgroundColor:'#f2f2f2', marginRight:8},
  chipA: {backgroundColor:'#185FA5'},
  chipTxt: {fontSize:12, color:'#555', fontWeight:'500'},
  chipTxtA: {color:'#fff', fontWeight:'700'},
  filtr: {paddingHorizontal:11, paddingVertical:6, borderRadius:10, backgroundColor:'#f2f2f2'},
  filtrTxt: {fontSize:11, color:'#666'},
});

const d = StyleSheet.create({
  header: {height:150, alignItems:'center', justifyContent:'center'},
  backBtn: {position:'absolute', top:16, left:16, backgroundColor:'#fff', width:38, height:38, borderRadius:19, alignItems:'center', justifyContent:'center', borderWidth:0.5, borderColor:'#ddd'},
  avatar: {width:76, height:76, borderRadius:38, alignItems:'center', justifyContent:'center'},
  favBtn: {position:'absolute', top:16, right:16},
  btn: {padding:13, borderRadius:12, alignItems:'center'},
  box: {backgroundColor:'#fff', borderRadius:14, padding:14, marginBottom:12, borderWidth:0.5, borderColor:'#ebebeb'},
  boxTitl: {fontSize:14, fontWeight:'700', color:'#111', marginBottom:10},
  boxRow: {fontSize:13, color:'#555', marginBottom:5, lineHeight:20},
});

const nav = StyleSheet.create({
  bar: {height:64, backgroundColor:'#fff', borderTopWidth:0.5, borderTopColor:'#e8e8e8', flexDirection:'row', alignItems:'flex-start', paddingTop:6},
  item: {flex:1, alignItems:'center', gap:2},
  label: {fontSize:11, color:'#aaa', fontWeight:'500'},
  labelA: {color:'#185FA5', fontWeight:'700'},
});
