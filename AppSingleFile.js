import React, { useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  SafeAreaView, TextInput, StatusBar, Switch, Alert,
} from 'react-native';

// ─── DATA ────────────────────────────────────────────────────────────────────

const PODNIKY = [
  { id:1, nazev:'U Zlatého Kohouta', typ:'Restaurace', kat:'Restaurace', cena:'$$', hodnoceni:4.6, pocetH:142, vzdalenost:320, otevreno:true, cas:'do 23:00', adresa:'Náměstí Míru 14, Praha 2', tel:'+420 222 333 444', web:'ukohouta.cz', tagy:['Česká kuchyně','Rodinné','Polední menu'], foto:['🍖','🥣','🍺'], oteviraci:[{den:'Pondělí',cas:'11:00–23:00'},{den:'Úterý',cas:'11:00–23:00'},{den:'Středa',cas:'11:00–23:00'},{den:'Čtvrtek',cas:'11:00–23:00'},{den:'Pátek',cas:'11:00–23:30'},{den:'Sobota',cas:'12:00–23:30'},{den:'Neděle',cas:'Zavřeno'}], recenze:[{autor:'Jan N.',ini:'JN',bA:'#B5D4F4',bT:'#0C447C',h:5,datum:'15.5.2026',txt:'Skvělá svíčková, obsluha milá. Opakovaně navštěvujeme s rodinou!'},{autor:'Anna K.',ini:'AK',bA:'#F4C0D1',bT:'#72243E',h:4,datum:'2.5.2026',txt:'Příjemné prostředí, akorát čekací doba byla delší. Jídlo ale stálo za to.'},{autor:'Petr S.',ini:'PS',bA:'#C0DD97',bT:'#3B6D11',h:5,datum:'28.4.2026',txt:'Nejlepší svíčková v Praze 2. Doporučuju guláš!'}]},
  { id:2, nazev:'Kavárna Světlá', typ:'Kavárna', kat:'Kavárny', cena:'$', hodnoceni:4.2, pocetH:89, vzdalenost:450, otevreno:true, cas:'do 20:00', adresa:'Světlá 8, Praha 1', tel:'+420 211 222 333', web:'kavarnasvetla.cz', tagy:['Káva','Wifi','Vegan možnosti'], foto:['☕','🧁','🫖'], oteviraci:[{den:'Pondělí',cas:'8:00–20:00'},{den:'Úterý',cas:'8:00–20:00'},{den:'Středa',cas:'8:00–20:00'},{den:'Čtvrtek',cas:'8:00–20:00'},{den:'Pátek',cas:'8:00–21:00'},{den:'Sobota',cas:'9:00–18:00'},{den:'Neděle',cas:'10:00–16:00'}], recenze:[{autor:'Petra M.',ini:'PM',bA:'#C0DD97',bT:'#3B6D11',h:4,datum:'20.5.2026',txt:'Výborná káva a klidné prostředí. Ideální na práci.'},{autor:'Tom H.',ini:'TH',bA:'#B5D4F4',bT:'#0C447C',h:5,datum:'10.5.2026',txt:'Nejlepší flat white v okolí. Přátelský personál.'}]},
  { id:3, nazev:'Pizzeria Roma', typ:'Restaurace', kat:'Restaurace', cena:'$$', hodnoceni:3.8, pocetH:67, vzdalenost:680, otevreno:true, cas:'do 22:00', adresa:'Romana 3, Praha 2', tel:'+420 233 444 555', web:'pizzeriaroma.cz', tagy:['Italská kuchyně','Pizza','Dovoz'], foto:['🍕','🍝','🥗'], oteviraci:[{den:'Pondělí',cas:'11:00–22:00'},{den:'Úterý',cas:'11:00–22:00'},{den:'Středa',cas:'11:00–22:00'},{den:'Čtvrtek',cas:'11:00–22:00'},{den:'Pátek',cas:'11:00–23:00'},{den:'Sobota',cas:'12:00–23:00'},{den:'Neděle',cas:'12:00–21:00'}], recenze:[{autor:'Karel B.',ini:'KB',bA:'#FAC775',bT:'#633806',h:4,datum:'18.5.2026',txt:'Dobrá pizza, rychlá obsluha. Těsto je perfektní.'},{autor:'Lucie R.',ini:'LR',bA:'#F4C0D1',bT:'#72243E',h:3,datum:'5.5.2026',txt:'Pizza ok, ale čekali jsme 40 minut.'}]},
  { id:4, nazev:'Albert', typ:'Supermarket', kat:'Nákupy', cena:'$', hodnoceni:4.1, pocetH:213, vzdalenost:200, otevreno:true, cas:'do 22:00', adresa:'Korunní 1, Praha 2', tel:'+420 800 100 100', web:'albert.cz', tagy:['Potraviny','Samoobsluha','Pekárna'], foto:['🛒','🥦','🍞'], oteviraci:[{den:'Pondělí',cas:'7:00–22:00'},{den:'Úterý',cas:'7:00–22:00'},{den:'Středa',cas:'7:00–22:00'},{den:'Čtvrtek',cas:'7:00–22:00'},{den:'Pátek',cas:'7:00–22:00'},{den:'Sobota',cas:'7:00–22:00'},{den:'Neděle',cas:'8:00–21:00'}], recenze:[{autor:'Lucie V.',ini:'LV',bA:'#B5D4F4',bT:'#0C447C',h:4,datum:'22.5.2026',txt:'Dobrý výběr, čisto, příjemná obsluha.'},{autor:'Martin K.',ini:'MK',bA:'#FAC775',bT:'#633806',h:4,datum:'14.5.2026',txt:'Nové samoobslužné pokladny jsou super, fronta je rychlejší.'}]},
  { id:5, nazev:'Hospoda Na Kopci', typ:'Hospoda', kat:'Bary', cena:'$', hodnoceni:3.2, pocetH:44, vzdalenost:820, otevreno:false, cas:'Otevírá ve 16:00', adresa:'Kopečná 5, Praha 3', tel:'+420 244 555 666', web:'', tagy:['Pivo','Sport TV','Kuřácká zahrádka'], foto:['🍺','📺','🌿'], oteviraci:[{den:'Pondělí',cas:'Zavřeno'},{den:'Úterý',cas:'16:00–24:00'},{den:'Středa',cas:'16:00–24:00'},{den:'Čtvrtek',cas:'16:00–24:00'},{den:'Pátek',cas:'15:00–02:00'},{den:'Sobota',cas:'14:00–02:00'},{den:'Neděle',cas:'14:00–22:00'}], recenze:[{autor:'Ondřej K.',ini:'OK',bA:'#D3D1C7',bT:'#444441',h:3,datum:'1.5.2026',txt:'Klasická hospoda, levné pivo. Nic víc nic míň.'}]},
  { id:6, nazev:'Sushi Nara', typ:'Restaurace', kat:'Restaurace', cena:'$$$', hodnoceni:4.7, pocetH:198, vzdalenost:550, otevreno:true, cas:'do 22:30', adresa:'Mánesova 12, Praha 2', tel:'+420 255 666 777', web:'sushinara.cz', tagy:['Japonská','Sushi','Sake'], foto:['🍣','🍱','🥢'], oteviraci:[{den:'Pondělí',cas:'11:30–22:30'},{den:'Úterý',cas:'11:30–22:30'},{den:'Středa',cas:'11:30–22:30'},{den:'Čtvrtek',cas:'11:30–22:30'},{den:'Pátek',cas:'11:30–23:00'},{den:'Sobota',cas:'12:00–23:00'},{den:'Neděle',cas:'12:00–22:00'}], recenze:[{autor:'Marie H.',ini:'MH',bA:'#EEEDFE',bT:'#3C3489',h:5,datum:'23.5.2026',txt:'Nejlepší sushi v Praze! Čerstvé ryby, skvělý servis.'},{autor:'David P.',ini:'DP',bA:'#B5D4F4',bT:'#0C447C',h:5,datum:'19.5.2026',txt:'Fantastický omakase zážitek. Určitě se vrátíme!'}]},
  { id:7, nazev:'Lékárna Dr. Max', typ:'Lékárna', kat:'Služby', cena:'$', hodnoceni:4.3, pocetH:76, vzdalenost:380, otevreno:true, cas:'do 21:00', adresa:'Vinohradská 22, Praha 2', tel:'+420 261 777 888', web:'drmax.cz', tagy:['Lékárna','Výdej receptů','Dermokosmetika'], foto:['💊','🩺','💉'], oteviraci:[{den:'Pondělí',cas:'8:00–21:00'},{den:'Úterý',cas:'8:00–21:00'},{den:'Středa',cas:'8:00–21:00'},{den:'Čtvrtek',cas:'8:00–21:00'},{den:'Pátek',cas:'8:00–21:00'},{den:'Sobota',cas:'9:00–18:00'},{den:'Neděle',cas:'10:00–16:00'}], recenze:[{autor:'Eva N.',ini:'EN',bA:'#C0DD97',bT:'#3B6D11',h:5,datum:'21.5.2026',txt:'Vždy rychlé vyřízení receptu, ochotný personál.'}]},
  { id:8, nazev:'Fitness Club Body', typ:'Fitness', kat:'Služby', cena:'$$', hodnoceni:4.4, pocetH:112, vzdalenost:720, otevreno:true, cas:'do 22:00', adresa:'Blanická 15, Praha 2', tel:'+420 777 888 999', web:'fitnessbody.cz', tagy:['Posilovna','Skupinové lekce','Sauna'], foto:['🏋️','🧘','💪'], oteviraci:[{den:'Pondělí',cas:'6:00–22:00'},{den:'Úterý',cas:'6:00–22:00'},{den:'Středa',cas:'6:00–22:00'},{den:'Čtvrtek',cas:'6:00–22:00'},{den:'Pátek',cas:'6:00–21:00'},{den:'Sobota',cas:'8:00–20:00'},{den:'Neděle',cas:'9:00–18:00'}], recenze:[{autor:'Jakub V.',ini:'JV',bA:'#B5D4F4',bT:'#0C447C',h:4,datum:'20.5.2026',txt:'Dobré vybavení, čisto, přátelský personál.'},{autor:'Nikola B.',ini:'NB',bA:'#F4C0D1',bT:'#72243E',h:5,datum:'11.5.2026',txt:'Nejlepší joga lekce v okolí! Instruktorka je skvělá.'}]},
];

const PRISPEVKY_INIT = [
  {id:1,autor:'Martin N.',ini:'MN',bA:'#B5D4F4',bT:'#0C447C',cas:'před 2 hod',podnik:'U Zlatého Kohouta',podnikId:1,txt:'Dnes jsem tu byl poprvé — svíčková byla fantastická! Určitě doporučuju.',likes:12,kom:3,liknuto:false},
  {id:2,autor:'Klára H.',ini:'KH',bA:'#C0DD97',bT:'#3B6D11',cas:'před 5 hod',podnik:'Kavárna Světlá',podnikId:2,txt:'Mění od příštího týdne otevírací dobu? Na dveřích byl lístek ale nešlo přečíst...',likes:4,kom:7,liknuto:false},
  {id:3,autor:'Petra R.',ini:'PR',bA:'#F4C0D1',bT:'#72243E',cas:'před 1 dnem',podnik:'okolí Žižkova',podnikId:null,txt:'Otevírá se thajský bistro na Mánesově? Viděla jsem tam pracovníky celý týden.',likes:8,kom:14,liknuto:false},
  {id:4,autor:'Tomáš V.',ini:'TV',bA:'#FAC775',bT:'#633806',cas:'před 2 dny',podnik:'Albert Korunní',podnikId:4,txt:'Nové samoobslužné pokladny jsou konečně funkční. Fronta letí 👍',likes:21,kom:5,liknuto:false},
  {id:5,autor:'Eva S.',ini:'ES',bA:'#EEEDFE',bT:'#3C3489',cas:'před 3 dny',podnik:'Sushi Nara',podnikId:6,txt:'Sushi Nara otevřelo novou pobočku na Vinohradech. Stejně skvělá kvalita!',likes:35,kom:9,liknuto:false},
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const barva = (h) => h >= 4.5 ? '#2d9b5e' : h >= 4.0 ? '#1D9E75' : h >= 3.5 ? '#BA7517' : '#E24B4A';
const ini = (n) => n.split(' ').map(s=>s[0]).join('').slice(0,2).toUpperCase();
const KATEGORIE = ['Vše','Restaurace','Kavárny','Nákupy','Bary','Služby'];
const dnesIndex = new Date().getDay(); // 0=ne, 1=po...
const dnyCZ = ['Neděle','Pondělí','Úterý','Středa','Čtvrtek','Pátek','Sobota'];

// ─── SDÍLENÉ KOMPONENTY ──────────────────────────────────────────────────────

const BizCard = ({ p, onPress }) => (
  <TouchableOpacity style={g.karta} onPress={onPress} activeOpacity={0.75}>
    <View style={[g.av, {backgroundColor:barva(p.hodnoceni)}]}>
      <Text style={g.avTxt}>{ini(p.nazev)}</Text>
    </View>
    <View style={{flex:1}}>
      <Text style={g.kardaNazev} numberOfLines={1}>{p.nazev}</Text>
      <Text style={g.kartaSub}>{p.kat} · {p.cena} · {p.vzdalenost} m</Text>
      <View style={{flexDirection:'row',alignItems:'center',gap:7,marginTop:4}}>
        <View style={[g.badge,{backgroundColor:barva(p.hodnoceni)}]}>
          <Text style={g.badgeTxt}>{p.hodnoceni} ★</Text>
        </View>
        <Text style={p.otevreno ? g.open : g.closed}>{p.otevreno?'Otevřeno':'Zavřeno'}</Text>
        <Text style={{fontSize:10,color:'#aaa'}}>{p.cas}</Text>
      </View>
    </View>
    <Text style={{fontSize:22,color:'#ddd',marginLeft:4}}>›</Text>
  </TouchableOpacity>
);

const Hvezdy = ({ pocet, velikost=14 }) => (
  <View style={{flexDirection:'row',gap:1}}>
    {[1,2,3,4,5].map(i=>(
      <Text key={i} style={{color:i<=pocet?'#BA7517':'#ddd',fontSize:velikost}}>★</Text>
    ))}
  </View>
);

const SekceBox = ({ titl, children }) => (
  <View style={g.box}>
    {titl ? <Text style={g.boxTitl}>{titl}</Text> : null}
    {children}
  </View>
);

// ─── MAPA ────────────────────────────────────────────────────────────────────

const POZICE = [
  {id:1,x:'16%',y:'18%'},{id:2,x:'62%',y:'34%'},{id:3,x:'76%',y:'16%'},
  {id:4,x:'26%',y:'60%'},{id:5,x:'70%',y:'62%'},{id:6,x:'50%',y:'44%'},
  {id:7,x:'38%',y:'24%'},{id:8,x:'58%',y:'70%'},
];

function MapaScreen({ onDetail, mapFiltr, setMapFiltr }) {
  const [vybrany, setVybrany] = useState(null);
  const [showFiltr, setShowFiltr] = useState(false);

  const viditelne = PODNIKY.filter(p =>
    mapFiltr === 'Vše' || p.kat === mapFiltr
  );

  return (
    <SafeAreaView style={{flex:1}}>
      {/* Horní panel */}
      <View style={ma.topBar}>
        <View style={ma.searchFake}>
          <Text style={{fontSize:14,color:'#aaa'}}>🔍  Hledat na mapě...</Text>
        </View>
        <TouchableOpacity style={ma.filtrBtn} onPress={() => setShowFiltr(!showFiltr)}>
          <Text style={{fontSize:13, color: mapFiltr!=='Vše' ? '#185FA5' : '#555', fontWeight:'600'}}>
            {mapFiltr === 'Vše' ? '⚙️ Filtr' : `✓ ${mapFiltr}`}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Filtr kategorie */}
      {showFiltr && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={ma.filtrRow}>
          {KATEGORIE.map(k => (
            <TouchableOpacity key={k} style={[ma.filtrChip, mapFiltr===k && ma.filtrChipA]} onPress={() => { setMapFiltr(k); setShowFiltr(false); }}>
              <Text style={[{fontSize:12,color:'#555',fontWeight:'500'}, mapFiltr===k && {color:'#fff',fontWeight:'700'}]}>{k}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Mapa */}
      <View style={{flex:1, position:'relative'}}>
        <View style={ma.mapaBg}>
          <View style={[ma.road,{top:'42%',left:0,right:0,height:16}]}/>
          <View style={[ma.road,{top:0,bottom:0,left:'48%',width:16}]}/>
          <View style={[ma.road,{top:'65%',left:0,right:0,height:10}]}/>
          <View style={[ma.road,{top:0,bottom:0,left:'22%',width:10}]}/>
          <View style={[ma.block,{top:'8%',left:'5%',width:70,height:50}]}/>
          <View style={[ma.block,{top:'12%',left:'60%',width:80,height:55}]}/>
          <View style={[ma.block,{top:'55%',left:'5%',width:65,height:44}]}/>
          <View style={[ma.block,{top:'52%',left:'58%',width:75,height:50}]}/>
          <View style={[ma.block,{top:'4%',left:'35%',width:50,height:30}]}/>
          <View style={[ma.block,{top:'72%',left:'30%',width:55,height:38}]}/>
          <View style={[ma.park,{top:'28%',left:'26%',width:'18%',height:'10%'}]}/>
        </View>

        {/* Modrá tečka */}
        <View style={ma.userRing}/>
        <View style={ma.userDot}/>

        {/* Markery */}
        {POZICE.map(pos => {
          const p = PODNIKY.find(x => x.id === pos.id);
          if (!p || !viditelne.find(x => x.id === p.id)) return null;
          return (
            <TouchableOpacity key={p.id} style={[ma.marker,{left:pos.x,top:pos.y}]} onPress={() => setVybrany(p)}>
              <View style={[ma.markerBubble,{backgroundColor:barva(p.hodnoceni), opacity: vybrany?.id===p.id ? 1 : 0.92}]}>
                <Text style={{color:'#fff',fontSize:10,fontWeight:'700'}}>{p.hodnoceni} ★</Text>
              </View>
              <View style={[ma.markerArrow,{borderTopColor:barva(p.hodnoceni)}]}/>
            </TouchableOpacity>
          );
        })}

        {/* Legenda */}
        <View style={ma.legenda}>
          {[['#2d9b5e','4.5+'],['#1D9E75','4.0+'],['#BA7517','3.5+'],['#E24B4A','<3.5']].map(([b,l])=>(
            <View key={l} style={{flexDirection:'row',alignItems:'center',marginBottom:3}}>
              <View style={{width:9,height:9,borderRadius:2,backgroundColor:b,marginRight:5}}/>
              <Text style={{fontSize:9,color:'#444'}}>{l}</Text>
            </View>
          ))}
        </View>

        {/* Počet viditelných */}
        <View style={ma.pocetBadge}>
          <Text style={{fontSize:11,color:'#185FA5',fontWeight:'600'}}>{viditelne.length} podniků</Text>
        </View>
      </View>

      {/* Popup */}
      {vybrany && (
        <View style={ma.popup}>
          <View style={ma.handle}/>
          <View style={{flexDirection:'row',alignItems:'center',gap:10,marginBottom:10}}>
            <View style={[{width:46,height:46,borderRadius:10,backgroundColor:barva(vybrany.hodnoceni),alignItems:'center',justifyContent:'center'}]}>
              <Text style={{color:'#fff',fontSize:14,fontWeight:'700'}}>{ini(vybrany.nazev)}</Text>
            </View>
            <View style={{flex:1}}>
              <Text style={{fontSize:16,fontWeight:'700',color:'#111'}}>{vybrany.nazev}</Text>
              <Text style={{fontSize:12,color:'#888',marginTop:1}}>{vybrany.typ} · {vybrany.vzdalenost} m · {vybrany.cena}</Text>
            </View>
            <TouchableOpacity onPress={() => setVybrany(null)}>
              <Text style={{fontSize:20,color:'#ccc',padding:4}}>✕</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row',gap:8,marginBottom:14,flexWrap:'wrap'}}>
            <View style={[g.badge,{backgroundColor:barva(vybrany.hodnoceni)}]}>
              <Text style={g.badgeTxt}>{vybrany.hodnoceni}/5 ★ ({vybrany.pocetH})</Text>
            </View>
            <View style={{backgroundColor:vybrany.otevreno?'#e8f5ee':'#fdeaea',paddingHorizontal:10,paddingVertical:5,borderRadius:7}}>
              <Text style={{fontSize:12,fontWeight:'600',color:vybrany.otevreno?'#2d9b5e':'#E24B4A'}}>
                {vybrany.otevreno?`● Otevřeno ${vybrany.cas}`:'● Zavřeno'}
              </Text>
            </View>
          </View>
          <View style={{flexDirection:'row',gap:10}}>
            <TouchableOpacity style={[g.btnP,{flex:1}]} onPress={() => { setVybrany(null); onDetail(vybrany); }}>
              <Text style={g.btnPTxt}>Více informací</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[g.btnS,{flex:1}]}>
              <Text style={g.btnSTxt}>🧭 Navigovat</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

// ─── HLEDAT ──────────────────────────────────────────────────────────────────

function HledatScreen({ onDetail }) {
  const [kat, setKat] = useState('Vše');
  const [jenOtev, setJenOtev] = useState(false);
  const [razeni, setRazeni] = useState('vzdalenost');
  const [query, setQuery] = useState('');

  const filtrovane = useMemo(() =>
    PODNIKY
      .filter(p => kat==='Vše' || p.kat===kat)
      .filter(p => !jenOtev || p.otevreno)
      .filter(p => !query || p.nazev.toLowerCase().includes(query.toLowerCase()) || p.kat.toLowerCase().includes(query.toLowerCase()) || p.tagy.some(t => t.toLowerCase().includes(query.toLowerCase())))
      .sort((a,b) => razeni==='hodnoceni' ? b.hodnoceni-a.hodnoceni : a.vzdalenost-b.vzdalenost),
  [kat,jenOtev,razeni,query]);

  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#f5f5f5'}}>
      <View style={he.header}>
        <View style={he.searchWrap}>
          <Text style={{fontSize:15,marginRight:6}}>🔍</Text>
          <TextInput style={he.input} placeholder="Restaurace, kavárny, tagy..." placeholderTextColor="#aaa" value={query} onChangeText={setQuery}/>
          {query.length>0 && <TouchableOpacity onPress={() => setQuery('')}><Text style={{color:'#aaa',fontSize:16,paddingHorizontal:8}}>✕</Text></TouchableOpacity>}
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginBottom:10}}>
          {KATEGORIE.map(k => (
            <TouchableOpacity key={k} style={[he.chip,kat===k&&he.chipA]} onPress={() => setKat(k)}>
              <Text style={[he.chipTxt,kat===k&&{color:'#fff',fontWeight:'700'}]}>{k}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={{flexDirection:'row',gap:8,paddingBottom:10,flexWrap:'wrap'}}>
          <TouchableOpacity style={[he.filtr,jenOtev&&{backgroundColor:'#e8f5ee'}]} onPress={() => setJenOtev(!jenOtev)}>
            <Text style={[he.filtrTxt,jenOtev&&{color:'#2d9b5e',fontWeight:'700'}]}>● Otevřeno</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[he.filtr,razeni==='vzdalenost'&&{backgroundColor:'#e8f0fb'}]} onPress={() => setRazeni('vzdalenost')}>
            <Text style={[he.filtrTxt,razeni==='vzdalenost'&&{color:'#185FA5',fontWeight:'700'}]}>📍 Vzdálenost</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[he.filtr,razeni==='hodnoceni'&&{backgroundColor:'#e8f0fb'}]} onPress={() => setRazeni('hodnoceni')}>
            <Text style={[he.filtrTxt,razeni==='hodnoceni'&&{color:'#185FA5',fontWeight:'700'}]}>★ Hodnocení</Text>
          </TouchableOpacity>
        </View>
        <Text style={{fontSize:11,color:'#aaa',paddingBottom:10}}>{filtrovane.length} podniků nalezeno</Text>
      </View>
      <ScrollView style={{padding:12}} keyboardShouldPersistTaps="handled">
        {filtrovane.length===0
          ? <View style={{alignItems:'center',paddingTop:60,gap:8}}>
              <Text style={{fontSize:36}}>🔍</Text>
              <Text style={{fontSize:15,color:'#888',fontWeight:'600'}}>Žádné výsledky</Text>
              <Text style={{fontSize:13,color:'#aaa'}}>Zkuste jiné slovo nebo kategorii</Text>
            </View>
          : filtrovane.map(p => <BizCard key={p.id} p={p} onPress={() => onDetail(p)}/>)
        }
        <View style={{height:20}}/>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── OBLÍBENÉ ────────────────────────────────────────────────────────────────

function OblibeneScreen({ onDetail, oblibene, setOblibene }) {
  const seznam = PODNIKY.filter(p => oblibene.includes(p.id));
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#f5f5f5'}}>
      <View style={g.pageHeader}>
        <Text style={g.pageTitl}>Oblíbené</Text>
        <Text style={{fontSize:13,color:'#aaa'}}>{seznam.length} podniků</Text>
      </View>
      {seznam.length===0
        ? <View style={{flex:1,alignItems:'center',justifyContent:'center',gap:10,padding:32}}>
            <Text style={{fontSize:52}}>🤍</Text>
            <Text style={{fontSize:18,fontWeight:'700',color:'#333'}}>Zatím žádné oblíbené</Text>
            <Text style={{fontSize:14,color:'#999',textAlign:'center',lineHeight:21}}>Klepněte na ❤️ v detailu libovolného podniku a přidejte si ho sem.</Text>
          </View>
        : <ScrollView style={{padding:12}}>
            {seznam.map(p => (
              <View key={p.id}>
                <BizCard p={p} onPress={() => onDetail(p)}/>
                <TouchableOpacity style={{marginTop:-4,marginBottom:14,alignItems:'center'}} onPress={() => setOblibene(o => o.filter(x => x!==p.id))}>
                  <Text style={{fontSize:12,color:'#E24B4A'}}>✕  Odebrat z oblíbených</Text>
                </TouchableOpacity>
              </View>
            ))}
            <View style={{height:20}}/>
          </ScrollView>
      }
    </SafeAreaView>
  );
}

// ─── DISKUZE ─────────────────────────────────────────────────────────────────

function DiskuzeScreen({ onDetail }) {
  const [prispevky, setPrispevky] = useState(PRISPEVKY_INIT);
  const [novyTxt, setNovyTxt] = useState('');
  const [piseme, setPiseme] = useState(false);

  const toggleLike = (id) => setPrispevky(ps => ps.map(p =>
    p.id===id ? {...p, liknuto:!p.liknuto, likes:p.liknuto?p.likes-1:p.likes+1} : p
  ));

  const pridat = () => {
    if (!novyTxt.trim()) return;
    setPrispevky(ps => [{id:Date.now(),autor:'Já',ini:'JÁ',bA:'#185FA5',bT:'#fff',cas:'právě teď',podnik:'',podnikId:null,txt:novyTxt.trim(),likes:0,kom:0,liknuto:false},...ps]);
    setNovyTxt(''); setPiseme(false);
  };

  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#f5f5f5'}}>
      <View style={g.pageHeader}>
        <Text style={g.pageTitl}>Diskuze v okolí</Text>
        <TouchableOpacity style={g.addBtn} onPress={() => setPiseme(!piseme)}>
          <Text style={g.addBtnTxt}>{piseme?'✕':'+ Přidat'}</Text>
        </TouchableOpacity>
      </View>

      {piseme && (
        <View style={{backgroundColor:'#fff',padding:14,borderBottomWidth:0.5,borderBottomColor:'#e8e8e8'}}>
          <TextInput style={{backgroundColor:'#f5f5f5',borderRadius:12,padding:12,fontSize:14,color:'#111',minHeight:70,textAlignVertical:'top',marginBottom:10}} placeholder="Co se děje v okolí?" placeholderTextColor="#aaa" value={novyTxt} onChangeText={setNovyTxt} multiline autoFocus/>
          <TouchableOpacity style={[g.btnP,!novyTxt.trim()&&{opacity:0.4}]} onPress={pridat} disabled={!novyTxt.trim()}>
            <Text style={g.btnPTxt}>Zveřejnit</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView style={{padding:12}} keyboardShouldPersistTaps="handled">
        {prispevky.map(p => (
          <View key={p.id} style={g.karta}>
            <View style={{flexDirection:'row',alignItems:'center',gap:10,marginBottom:10}}>
              <View style={{width:40,height:40,borderRadius:20,backgroundColor:p.bA,alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:12,fontWeight:'700',color:p.bT}}>{p.ini}</Text>
              </View>
              <View style={{flex:1}}>
                <Text style={{fontSize:13,fontWeight:'700',color:'#111'}}>{p.autor}</Text>
                <Text style={{fontSize:11,color:'#aaa'}}>{p.cas}{p.podnik?` · ${p.podnik}`:''}</Text>
              </View>
            </View>
            <Text style={{fontSize:14,color:'#333',lineHeight:21,marginBottom:10}}>{p.txt}</Text>
            {p.podnikId && (
              <TouchableOpacity style={{alignSelf:'flex-start',backgroundColor:'#e8f0fb',paddingHorizontal:10,paddingVertical:5,borderRadius:8,marginBottom:10}} onPress={() => { const pod=PODNIKY.find(x=>x.id===p.podnikId); if(pod) onDetail(pod); }}>
                <Text style={{fontSize:12,color:'#185FA5',fontWeight:'600'}}>📍 {p.podnik}</Text>
              </TouchableOpacity>
            )}
            <View style={{flexDirection:'row',gap:22}}>
              <TouchableOpacity onPress={() => toggleLike(p.id)}>
                <Text style={{fontSize:13,color:p.liknuto?'#E24B4A':'#999'}}>{p.liknuto?'❤️':'♡'}  {p.likes}</Text>
              </TouchableOpacity>
              <Text style={{fontSize:13,color:'#999'}}>💬  {p.kom}</Text>
              <Text style={{fontSize:13,color:'#999'}}>↗  Sdílet</Text>
            </View>
          </View>
        ))}
        <View style={{height:20}}/>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── PROFIL ──────────────────────────────────────────────────────────────────

function ProfilScreen({ oblibene, notifikace, setNotifikace, tmavyRezim, setTmavyRezim }) {
  const [prihlaseno, setPrihlaseno] = useState(false);
  const [jmeno, setJmeno] = useState('');
  const [email, setEmail] = useState('');
  const [heslo, setHeslo] = useState('');
  const [rezimy, setRezimy] = useState(false);

  if (!prihlaseno) {
    return (
      <SafeAreaView style={{flex:1,backgroundColor:'#f5f5f5'}}>
        <View style={g.pageHeader}>
          <Text style={g.pageTitl}>Profil</Text>
        </View>
        <ScrollView style={{padding:16}}>
          <View style={{alignItems:'center',paddingVertical:24}}>
            <View style={{width:80,height:80,borderRadius:40,backgroundColor:'#e8f0fb',alignItems:'center',justifyContent:'center',marginBottom:12}}>
              <Text style={{fontSize:36}}>👤</Text>
            </View>
            <Text style={{fontSize:16,color:'#888'}}>Nejste přihlášeni</Text>
          </View>

          <SekceBox titl={rezimy ? 'Registrace' : 'Přihlášení'}>
            {rezimy && (
              <TextInput style={pr.input} placeholder="Jméno a příjmení" placeholderTextColor="#aaa" value={jmeno} onChangeText={setJmeno}/>
            )}
            <TextInput style={pr.input} placeholder="E-mail" placeholderTextColor="#aaa" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none"/>
            <TextInput style={pr.input} placeholder="Heslo" placeholderTextColor="#aaa" value={heslo} onChangeText={setHeslo} secureTextEntry/>
            <TouchableOpacity style={[g.btnP,{marginTop:8}]} onPress={() => setPrihlaseno(true)}>
              <Text style={g.btnPTxt}>{rezimy ? 'Vytvořit účet' : 'Přihlásit se'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginTop:12,alignItems:'center'}} onPress={() => setRezimy(!rezimy)}>
              <Text style={{fontSize:13,color:'#185FA5'}}>{rezimy ? 'Již mám účet — přihlásit se' : 'Nemám účet — registrovat se'}</Text>
            </TouchableOpacity>
          </SekceBox>

          <View style={{flexDirection:'row',gap:10,marginBottom:16}}>
            <TouchableOpacity style={[g.btnS,{flex:1}]} onPress={() => setPrihlaseno(true)}>
              <Text style={g.btnSTxt}>🔵  Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[g.btnS,{flex:1}]} onPress={() => setPrihlaseno(true)}>
              <Text style={g.btnSTxt}>🍎  Apple</Text>
            </TouchableOpacity>
          </View>

          <SekceBox titl="Nastavení">
            <View style={pr.radek}>
              <Text style={pr.radekTxt}>🔔  Notifikace</Text>
              <Switch value={notifikace} onValueChange={setNotifikace} trackColor={{true:'#185FA5'}}/>
            </View>
          </SekceBox>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#f5f5f5'}}>
      <View style={g.pageHeader}>
        <Text style={g.pageTitl}>Profil</Text>
        <TouchableOpacity onPress={() => setPrihlaseno(false)}>
          <Text style={{fontSize:13,color:'#E24B4A',fontWeight:'600'}}>Odhlásit</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{padding:16}}>
        {/* Avatar */}
        <View style={{alignItems:'center',paddingVertical:20}}>
          <View style={{width:84,height:84,borderRadius:42,backgroundColor:'#185FA5',alignItems:'center',justifyContent:'center',marginBottom:10}}>
            <Text style={{fontSize:34,color:'#fff',fontWeight:'700'}}>V</Text>
          </View>
          <Text style={{fontSize:20,fontWeight:'800',color:'#111'}}>Vendelín K.</Text>
          <Text style={{fontSize:13,color:'#888',marginTop:2}}>vendelin@email.cz</Text>
          <View style={{flexDirection:'row',gap:24,marginTop:14}}>
            <View style={{alignItems:'center'}}>
              <Text style={{fontSize:22,fontWeight:'800',color:'#111'}}>{oblibene.length}</Text>
              <Text style={{fontSize:11,color:'#888'}}>Oblíbených</Text>
            </View>
            <View style={{width:0.5,backgroundColor:'#e0e0e0'}}/>
            <View style={{alignItems:'center'}}>
              <Text style={{fontSize:22,fontWeight:'800',color:'#111'}}>3</Text>
              <Text style={{fontSize:11,color:'#888'}}>Recenzí</Text>
            </View>
            <View style={{width:0.5,backgroundColor:'#e0e0e0'}}/>
            <View style={{alignItems:'center'}}>
              <Text style={{fontSize:22,fontWeight:'800',color:'#111'}}>12</Text>
              <Text style={{fontSize:11,color:'#888'}}>Check-inů</Text>
            </View>
          </View>
        </View>

        {/* Nastavení notifikací */}
        <SekceBox titl="Notifikace">
          <View style={pr.radek}>
            <Text style={pr.radekTxt}>🔔  Všechny notifikace</Text>
            <Switch value={notifikace} onValueChange={setNotifikace} trackColor={{true:'#185FA5'}}/>
          </View>
          <View style={pr.radek}>
            <Text style={pr.radekTxt}>⭐  Oblíbené podniky</Text>
            <Switch value={notifikace} trackColor={{true:'#185FA5'}}/>
          </View>
          <View style={[pr.radek,{borderBottomWidth:0}]}>
            <Text style={pr.radekTxt}>💬  Diskuze v okolí</Text>
            <Switch value={notifikace} trackColor={{true:'#185FA5'}}/>
          </View>
        </SekceBox>

        {/* Nastavení aplikace */}
        <SekceBox titl="Aplikace">
          <TouchableOpacity style={pr.radek}>
            <Text style={pr.radekTxt}>🌍  Jazyk</Text>
            <Text style={pr.radekVal}>Čeština ›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={pr.radek}>
            <Text style={pr.radekTxt}>📍  Výchozí poloha</Text>
            <Text style={pr.radekVal}>Praha 2 ›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[pr.radek,{borderBottomWidth:0}]}>
            <Text style={pr.radekTxt}>🗺️  Pořadí záložek</Text>
            <Text style={pr.radekVal}>Upravit ›</Text>
          </TouchableOpacity>
        </SekceBox>

        {/* Ostatní */}
        <SekceBox titl="Ostatní">
          <TouchableOpacity style={pr.radek}>
            <Text style={pr.radekTxt}>❓  Nápověda</Text>
            <Text style={pr.radekVal}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={pr.radek}>
            <Text style={pr.radekTxt}>📋  Podmínky použití</Text>
            <Text style={pr.radekVal}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={pr.radek}>
            <Text style={pr.radekTxt}>🔒  Ochrana soukromí</Text>
            <Text style={pr.radekVal}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[pr.radek,{borderBottomWidth:0}]}>
            <Text style={pr.radekTxt}>ℹ️  O aplikaci</Text>
            <Text style={pr.radekVal}>v1.0.0 ›</Text>
          </TouchableOpacity>
        </SekceBox>

        <TouchableOpacity style={[g.btnS,{marginBottom:32,borderColor:'#E24B4A'}]} onPress={() => setPrihlaseno(false)}>
          <Text style={[g.btnSTxt,{color:'#E24B4A'}]}>Odhlásit se</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── DETAIL ──────────────────────────────────────────────────────────────────

function DetailScreen({ podnik:p, onBack, oblibene, setOblibene }) {
  const [mojeRecenze, setMojeRecenze] = useState(null);
  const [piseRecenzi, setPiseRecenzi] = useState(false);
  const [hvezdyVyber, setHvezdyVyber] = useState(5);
  const [recenzeTxt, setRecenzeTxt] = useState('');
  const jeFav = oblibene.includes(p.id);
  const b = barva(p.hodnoceni);
  const dnes = dnyCZ[dnesIndex];

  const odeslat = () => {
    if (!recenzeTxt.trim()) return;
    setMojeRecenze({ autor:'Já', ini:'JÁ', bA:'#185FA5', bT:'#fff', h:hvezdyVyber, datum:'Dnes', txt:recenzeTxt.trim() });
    setPiseRecenzi(false); setRecenzeTxt('');
  };

  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#f5f5f5'}}>
      {/* Hlavička */}
      <View style={[de.header,{backgroundColor:b+'22'}]}>
        <TouchableOpacity style={de.backBtn} onPress={onBack}>
          <Text style={{fontSize:20,color:'#333'}}>←</Text>
        </TouchableOpacity>
        <View style={{alignItems:'center'}}>
          <View style={[de.avatar,{backgroundColor:b}]}>
            <Text style={{color:'#fff',fontSize:28,fontWeight:'700'}}>{ini(p.nazev)}</Text>
          </View>
          {/* Fotky */}
          <View style={{flexDirection:'row',gap:6,marginTop:10}}>
            {p.foto.map((f,i) => (
              <View key={i} style={de.fotoBox}>
                <Text style={{fontSize:22}}>{f}</Text>
              </View>
            ))}
          </View>
        </View>
        <TouchableOpacity style={de.favBtn} onPress={() => setOblibene(o => o.includes(p.id) ? o.filter(x=>x!==p.id) : [...o,p.id])}>
          <Text style={{fontSize:28}}>{jeFav?'❤️':'🤍'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{padding:16}} showsVerticalScrollIndicator={false}>
        {/* Název */}
        <Text style={{fontSize:22,fontWeight:'800',color:'#111',marginBottom:2}}>{p.nazev}</Text>
        <View style={{flexDirection:'row',alignItems:'center',gap:8,marginBottom:10}}>
          <Text style={{fontSize:13,color:'#888'}}>{p.typ}</Text>
          <Text style={{fontSize:13,color:'#ccc'}}>·</Text>
          <Text style={{fontSize:13,color:'#888'}}>{p.cena}</Text>
          <Text style={{fontSize:13,color:'#ccc'}}>·</Text>
          <Text style={{fontSize:13,color:'#888'}}>{p.vzdalenost} m</Text>
        </View>

        {/* Tagy */}
        <View style={{flexDirection:'row',gap:6,flexWrap:'wrap',marginBottom:12}}>
          {p.tagy.map((t,i) => (
            <View key={i} style={{backgroundColor:'#f0f0f0',paddingHorizontal:10,paddingVertical:4,borderRadius:20}}>
              <Text style={{fontSize:11,color:'#555',fontWeight:'500'}}>{t}</Text>
            </View>
          ))}
        </View>

        {/* Hodnocení + status */}
        <View style={{flexDirection:'row',gap:8,marginBottom:16,flexWrap:'wrap'}}>
          <View style={[g.badge,{backgroundColor:b}]}>
            <Text style={g.badgeTxt}>{p.hodnoceni} ★  ({p.pocetH} hodnocení)</Text>
          </View>
          <View style={{backgroundColor:p.otevreno?'#e8f5ee':'#fdeaea',paddingHorizontal:12,paddingVertical:6,borderRadius:8}}>
            <Text style={{fontSize:12,fontWeight:'600',color:p.otevreno?'#2d9b5e':'#E24B4A'}}>
              {p.otevreno?`● Otevřeno ${p.cas}`:`● Zavřeno · ${p.cas}`}
            </Text>
          </View>
        </View>

        {/* Akce */}
        <View style={{flexDirection:'row',gap:8,marginBottom:16,flexWrap:'wrap'}}>
          <TouchableOpacity style={[g.btnP,{flex:1}]}>
            <Text style={g.btnPTxt}>🧭  Navigovat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[g.btnS,{flex:1}]}>
            <Text style={g.btnSTxt}>📞  Zavolat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[g.btnS,{paddingHorizontal:16}]}>
            <Text style={g.btnSTxt}>↗</Text>
          </TouchableOpacity>
        </View>

        {/* Check-in */}
        <TouchableOpacity style={de.checkinBtn}>
          <Text style={{fontSize:16}}>📍</Text>
          <Text style={{fontSize:14,fontWeight:'700',color:'#185FA5'}}>Check-in — Jsem tady!</Text>
        </TouchableOpacity>

        {/* Kontakt */}
        <SekceBox titl="Kontakt a info">
          <View style={{gap:8}}>
            <Text style={{fontSize:13,color:'#555'}}>📍  {p.adresa}</Text>
            {p.tel ? <Text style={{fontSize:13,color:'#555'}}>📞  {p.tel}</Text> : null}
            {p.web ? <Text style={{fontSize:13,color:'#185FA5'}}>🌐  {p.web}</Text> : null}
          </View>
        </SekceBox>

        {/* Otevírací doba */}
        <SekceBox titl="Otevírací doba">
          {p.oteviraci.map((r,i) => (
            <View key={i} style={[de.otevRow, r.den===dnes && {backgroundColor:'#f0f7ff',borderRadius:6,paddingHorizontal:6}]}>
              <Text style={{fontSize:13,color:r.den===dnes?'#185FA5':'#777',fontWeight:r.den===dnes?'700':'400'}}>{r.den}</Text>
              <Text style={{fontSize:13,color:r.cas==='Zavřeno'?'#E24B4A':r.den===dnes?'#185FA5':'#111',fontWeight:r.den===dnes?'700':'500'}}>{r.cas}</Text>
            </View>
          ))}
        </SekceBox>

        {/* Recenze */}
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
          <Text style={{fontSize:16,fontWeight:'700',color:'#111'}}>Recenze ({p.pocetH})</Text>
          <TouchableOpacity onPress={() => setPiseRecenzi(!piseRecenzi)}>
            <Text style={{fontSize:13,color:'#185FA5',fontWeight:'600'}}>{piseRecenzi?'Zrušit':'+ Přidat recenzi'}</Text>
          </TouchableOpacity>
        </View>

        {/* Formulář recenze */}
        {piseRecenzi && (
          <View style={[g.box,{marginBottom:12}]}>
            <Text style={{fontSize:13,fontWeight:'600',color:'#111',marginBottom:8}}>Vaše hodnocení</Text>
            <View style={{flexDirection:'row',gap:6,marginBottom:12}}>
              {[1,2,3,4,5].map(i => (
                <TouchableOpacity key={i} onPress={() => setHvezdyVyber(i)}>
                  <Text style={{fontSize:28,color:i<=hvezdyVyber?'#BA7517':'#ddd'}}>★</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TextInput style={{backgroundColor:'#f5f5f5',borderRadius:10,padding:11,fontSize:13,color:'#111',minHeight:60,textAlignVertical:'top',marginBottom:10}} placeholder="Napište vaši recenzi..." placeholderTextColor="#aaa" value={recenzeTxt} onChangeText={setRecenzeTxt} multiline/>
            <TouchableOpacity style={[g.btnP,!recenzeTxt.trim()&&{opacity:0.4}]} onPress={odeslat} disabled={!recenzeTxt.trim()}>
              <Text style={g.btnPTxt}>Odeslat recenzi</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Moje recenze */}
        {mojeRecenze && (
          <View style={[g.box,{marginBottom:8,borderWidth:1.5,borderColor:'#185FA5'}]}>
            <View style={{flexDirection:'row',alignItems:'center',gap:10,marginBottom:8}}>
              <View style={{width:34,height:34,borderRadius:17,backgroundColor:'#185FA5',alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:12,fontWeight:'700',color:'#fff'}}>JÁ</Text>
              </View>
              <View>
                <Text style={{fontSize:13,fontWeight:'600',color:'#111'}}>Vaše recenze</Text>
                <Hvezdy pocet={mojeRecenze.h}/>
              </View>
              <View style={{marginLeft:'auto',backgroundColor:'#e8f0fb',paddingHorizontal:8,paddingVertical:3,borderRadius:6}}>
                <Text style={{fontSize:10,color:'#185FA5',fontWeight:'600'}}>Nová</Text>
              </View>
            </View>
            <Text style={{fontSize:13,color:'#555',lineHeight:19}}>{mojeRecenze.txt}</Text>
          </View>
        )}

        {/* Existující recenze */}
        {p.recenze.map((r,i) => (
          <View key={i} style={[g.box,{marginBottom:8}]}>
            <View style={{flexDirection:'row',alignItems:'center',gap:10,marginBottom:8}}>
              <View style={{width:34,height:34,borderRadius:17,backgroundColor:r.bA,alignItems:'center',justifyContent:'center'}}>
                <Text style={{fontSize:12,fontWeight:'700',color:r.bT}}>{r.ini}</Text>
              </View>
              <View style={{flex:1}}>
                <Text style={{fontSize:13,fontWeight:'600',color:'#111'}}>{r.autor}</Text>
                <Hvezdy pocet={r.h}/>
              </View>
              <Text style={{fontSize:11,color:'#aaa'}}>{r.datum}</Text>
            </View>
            <Text style={{fontSize:13,color:'#555',lineHeight:19}}>{r.txt}</Text>
          </View>
        ))}

        <View style={{height:30}}/>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── HLAVNÍ APP ──────────────────────────────────────────────────────────────

const TABS = ['Oblíbené','Hledat','Mapa','Diskuze','Profil'];
const ICONS = {'Oblíbené':'❤️','Hledat':'🔍','Mapa':'🗺️','Diskuze':'💬','Profil':'👤'};

export default function App() {
  const [tab, setTab] = useState('Mapa');
  const [detail, setDetail] = useState(null);
  const [oblibene, setOblibene] = useState([1,2]);
  const [notifikace, setNotifikace] = useState(true);
  const [tmavyRezim, setTmavyRezim] = useState(false);
  const [mapFiltr, setMapFiltr] = useState('Vše');

  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
      <StatusBar barStyle="dark-content"/>
      <View style={{flex:1}}>
        {detail ? (
          <DetailScreen podnik={detail} onBack={() => setDetail(null)} oblibene={oblibene} setOblibene={setOblibene}/>
        ) : tab==='Mapa' ? (
          <MapaScreen onDetail={setDetail} mapFiltr={mapFiltr} setMapFiltr={setMapFiltr}/>
        ) : tab==='Hledat' ? (
          <HledatScreen onDetail={setDetail}/>
        ) : tab==='Oblíbené' ? (
          <OblibeneScreen onDetail={setDetail} oblibene={oblibene} setOblibene={setOblibene}/>
        ) : tab==='Diskuze' ? (
          <DiskuzeScreen onDetail={setDetail}/>
        ) : (
          <ProfilScreen oblibene={oblibene} notifikace={notifikace} setNotifikace={setNotifikace} tmavyRezim={tmavyRezim} setTmavyRezim={setTmavyRezim}/>
        )}
      </View>

      {!detail && (
        <View style={na.bar}>
          {TABS.map(t => (
            <TouchableOpacity key={t} style={na.item} onPress={() => setTab(t)}>
              <Text style={{fontSize:t==='Mapa'?26:22,opacity:tab===t?1:0.35}}>{ICONS[t]}</Text>
              <Text style={[na.label,tab===t&&na.labelA]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
}

// ─── STYLY ───────────────────────────────────────────────────────────────────

const g = StyleSheet.create({
  karta:{backgroundColor:'#fff',borderRadius:14,padding:13,marginBottom:9,flexDirection:'row',alignItems:'center',borderWidth:0.5,borderColor:'#e8e8e8'},
  av:{width:54,height:54,borderRadius:12,alignItems:'center',justifyContent:'center',marginRight:12},
  avTxt:{color:'#fff',fontSize:18,fontWeight:'700'},
  kardaNazev:{fontSize:14,fontWeight:'700',color:'#111',marginBottom:2},
  kartaSub:{fontSize:11,color:'#888'},
  badge:{paddingHorizontal:9,paddingVertical:4,borderRadius:6},
  badgeTxt:{color:'#fff',fontSize:11,fontWeight:'700'},
  open:{fontSize:11,color:'#2d9b5e',fontWeight:'600'},
  closed:{fontSize:11,color:'#E24B4A',fontWeight:'600'},
  box:{backgroundColor:'#fff',borderRadius:14,padding:14,marginBottom:12,borderWidth:0.5,borderColor:'#ebebeb'},
  boxTitl:{fontSize:14,fontWeight:'700',color:'#111',marginBottom:10},
  pageHeader:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:16,paddingBottom:12,backgroundColor:'#fff',borderBottomWidth:0.5,borderBottomColor:'#e8e8e8'},
  pageTitl:{fontSize:22,fontWeight:'800',color:'#111'},
  addBtn:{backgroundColor:'#185FA5',paddingHorizontal:16,paddingVertical:8,borderRadius:20},
  addBtnTxt:{color:'#fff',fontSize:13,fontWeight:'700'},
  btnP:{padding:13,borderRadius:12,alignItems:'center',justifyContent:'center',backgroundColor:'#185FA5'},
  btnPTxt:{color:'#fff',fontWeight:'700',fontSize:13},
  btnS:{padding:13,borderRadius:12,alignItems:'center',justifyContent:'center',borderWidth:0.5,borderColor:'#ccc',backgroundColor:'#fff'},
  btnSTxt:{color:'#333',fontSize:13,fontWeight:'600'},
});

const ma = StyleSheet.create({
  topBar:{flexDirection:'row',alignItems:'center',gap:8,padding:10,backgroundColor:'#fff',borderBottomWidth:0.5,borderBottomColor:'#e0e0e0'},
  searchFake:{flex:1,backgroundColor:'#f2f2f2',borderRadius:14,paddingHorizontal:14,paddingVertical:10},
  filtrBtn:{backgroundColor:'#f2f2f2',paddingHorizontal:14,paddingVertical:10,borderRadius:14},
  filtrRow:{backgroundColor:'#fff',paddingHorizontal:12,paddingVertical:8,borderBottomWidth:0.5,borderBottomColor:'#e0e0e0'},
  filtrChip:{paddingHorizontal:14,paddingVertical:6,borderRadius:20,backgroundColor:'#f2f2f2',marginRight:8},
  filtrChipA:{backgroundColor:'#185FA5'},
  mapaBg:{position:'absolute',inset:0,backgroundColor:'#dce8d4'},
  road:{position:'absolute',backgroundColor:'white'},
  block:{position:'absolute',backgroundColor:'#bfcea8',borderRadius:2},
  park:{position:'absolute',backgroundColor:'#b5d9a0',borderRadius:4},
  userRing:{position:'absolute',left:'50%',top:'48%',width:28,height:28,borderRadius:14,backgroundColor:'rgba(24,95,165,0.15)',marginLeft:-14,marginTop:-14,zIndex:4},
  userDot:{position:'absolute',left:'50%',top:'48%',width:14,height:14,borderRadius:7,backgroundColor:'#185FA5',borderWidth:2.5,borderColor:'white',marginLeft:-7,marginTop:-7,zIndex:5},
  marker:{position:'absolute',alignItems:'center',transform:[{translateX:-26}]},
  markerBubble:{paddingHorizontal:8,paddingVertical:4,borderRadius:8},
  markerArrow:{width:0,height:0,borderLeftWidth:5,borderRightWidth:5,borderTopWidth:6,borderLeftColor:'transparent',borderRightColor:'transparent'},
  legenda:{position:'absolute',top:10,right:10,backgroundColor:'rgba(255,255,255,0.95)',borderRadius:10,padding:8,borderWidth:0.5,borderColor:'#e0e0e0'},
  pocetBadge:{position:'absolute',top:10,left:10,backgroundColor:'rgba(255,255,255,0.95)',borderRadius:20,paddingHorizontal:10,paddingVertical:5,borderWidth:0.5,borderColor:'#e0e0e0'},
  popup:{backgroundColor:'#fff',borderTopLeftRadius:20,borderTopRightRadius:20,padding:16,paddingBottom:24,borderTopWidth:0.5,borderTopColor:'#e8e8e8'},
  handle:{width:40,height:4,backgroundColor:'#ddd',borderRadius:2,alignSelf:'center',marginBottom:14},
});

const he = StyleSheet.create({
  header:{backgroundColor:'#fff',paddingHorizontal:14,paddingTop:12,borderBottomWidth:0.5,borderBottomColor:'#e8e8e8'},
  searchWrap:{flexDirection:'row',alignItems:'center',backgroundColor:'#f2f2f2',borderRadius:14,paddingHorizontal:12,marginBottom:12},
  input:{flex:1,fontSize:14,color:'#111',paddingVertical:11},
  chip:{paddingHorizontal:15,paddingVertical:7,borderRadius:20,backgroundColor:'#f2f2f2',marginRight:8},
  chipA:{backgroundColor:'#185FA5'},
  chipTxt:{fontSize:12,color:'#555',fontWeight:'500'},
  filtr:{paddingHorizontal:11,paddingVertical:6,borderRadius:10,backgroundColor:'#f2f2f2'},
  filtrTxt:{fontSize:11,color:'#666'},
});

const de = StyleSheet.create({
  header:{paddingVertical:24,alignItems:'center',justifyContent:'center',position:'relative'},
  backBtn:{position:'absolute',top:16,left:16,backgroundColor:'#fff',width:38,height:38,borderRadius:19,alignItems:'center',justifyContent:'center',borderWidth:0.5,borderColor:'#ddd',zIndex:10},
  favBtn:{position:'absolute',top:16,right:16,zIndex:10},
  avatar:{width:76,height:76,borderRadius:38,alignItems:'center',justifyContent:'center'},
  fotoBox:{width:44,height:44,borderRadius:10,backgroundColor:'rgba(255,255,255,0.7)',alignItems:'center',justifyContent:'center'},
  otevRow:{flexDirection:'row',justifyContent:'space-between',paddingVertical:6,borderBottomWidth:0.5,borderBottomColor:'#f0f0f0'},
  checkinBtn:{flexDirection:'row',alignItems:'center',justifyContent:'center',gap:8,backgroundColor:'#e8f0fb',padding:13,borderRadius:12,marginBottom:12,borderWidth:0.5,borderColor:'#c0d4f0'},
});

const pr = StyleSheet.create({
  input:{backgroundColor:'#f5f5f5',borderRadius:10,padding:12,fontSize:14,color:'#111',marginBottom:10},
  radek:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingVertical:12,borderBottomWidth:0.5,borderBottomColor:'#f0f0f0'},
  radekTxt:{fontSize:14,color:'#333'},
  radekVal:{fontSize:13,color:'#888'},
});

const na = StyleSheet.create({
  bar:{height:64,backgroundColor:'#fff',borderTopWidth:0.5,borderTopColor:'#e8e8e8',flexDirection:'row',alignItems:'flex-start',paddingTop:6},
  item:{flex:1,alignItems:'center',gap:2},
  label:{fontSize:10,color:'#aaa',fontWeight:'500'},
  labelA:{color:'#185FA5',fontWeight:'700'},
});
