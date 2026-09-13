// Public sightseeing areas. Coordinates are approximate orientation anchors.
const source=(title,url)=>({title,url});
const westlakeSource=source('UNESCO · 西湖文化景觀','https://whc.unesco.org/en/list/1334/');
const canalSource=source('UNESCO · 大運河','https://whc.unesco.org/en/list/1443/');
const xixiSource=source('西溪濕地 · 景觀背景','https://zh.wikipedia.org/wiki/西溪濕地');
const riverSource=source('錢塘江 · 地理背景','https://en.wikipedia.org/wiki/Qiantang_River');
const museumSource=source('浙江省博物館 · 館方資訊','https://www.zjmuseum.com.cn/cn/');
const wuzhenSource=source('烏鎮旅遊 · 景區資訊','https://www.wuzhen.com.cn/');
export const categories=[
 {id:'all',name:'全部',subtitle:'自由探索',color:'#258b8c'},
 {id:'landscape',name:'湖山',subtitle:'湖泊與濕地',color:'#457c53'},
 {id:'water',name:'水岸',subtitle:'江河與城市',color:'#537aa6'},
 {id:'culture',name:'文化',subtitle:'歷史與器物',color:'#ce6c44'},
 {id:'nearby',name:'周邊',subtitle:'江南水鄉',color:'#8c6d9d'}
];
export const places=[
 {id:'westlake',short:'西湖',name:'西湖文化景觀',kind:'湖山與人文',category:'landscape',icon:'湖',lon:120.145,lat:30.244,model:'lake',radius:24,area:'杭州 · 城西湖區',tagline:'看湖、山、堤岸與城市如何相接。',position:'標記表示湖區，並非碼頭或景區入口；模型只供認識空間。',intro:'西湖適合由高處看整體，再慢慢靠近堤岸。東側連接城市，周邊山色、島嶼與亭塔共同構成一幅經過長期營造的風景。',sections:[['先看山水的結構','從全域視角辨認湖面與城區，再沿著堤岸移動。大水面中的堤和島，令同一片湖出現不同層次；低空與高空會帶來很不同的感受。'],['風景也是文化','西湖於2011年列入世界遺產。人們長期疏浚、築堤、營造園林，詩詞與繪畫又賦予景觀意義；自然環境與人文活動在這裏彼此塑造。'],['到現場再慢慢選','湖岸、步道、遊船和周邊景點有不同玩法。船班、票務、入口及開放情況應查看現場或營運方資訊；這裏提供的是認識地方的起點。']],facts:[['景觀線索','湖・山・堤・島'],['世界遺產','2011']],sources:[westlakeSource]},
 {id:'xixi',short:'西溪濕地',name:'西溪濕地',kind:'濕地與生態',category:'landscape',icon:'溪',lon:120.052,lat:30.274,model:'wetland',radius:16,area:'杭州 · 城西',tagline:'把速度放慢，沿水網看島與林。',position:'標記表示濕地所在區域，不對應遊園入口；河汊形狀經過概括。',intro:'西溪的水景由河汊、池塘、洲渚和植被組成。相比西湖開闊的湖面，這裏更像一張細密的水網，景色藏在彎曲水岸之間。',sections:[['從水網認識濕地','先升高看水道如何分隔綠地，再降低視角看水岸的細節。水與植物交錯的空間，是閱讀濕地景觀的一條線索。'],['自然與生活的交會','西溪位於杭州城西，景觀包含濕地環境與長期人類活動留下的痕跡。看水邊建築、植物和河道的位置，可以理解聚落如何與水相處。'],['遊覽前留意','步行與水上遊覽的入口、票務及可達範圍可能不同。請按園區當時公告選擇，留在開放步道，讓觀察與保育可以並存。']],facts:[['地理位置','杭州城西'],['觀看線索','河汊・洲渚・植被']],sources:[xixiSource]},
 {id:'canal',short:'大運河',name:'大運河 · 杭州段',kind:'水路與城市',category:'water',icon:'河',lon:120.147,lat:30.318,model:'canalfront',radius:10,area:'杭州 · 城北水岸',tagline:'順着一條水路，讀懂城市的連結。',position:'標記是杭州運河景觀的概括錨點，不指定某座橋、碼頭或步道路線。',intro:'運河讓視線由單一景點轉向整個水路網絡。水道、橋、沿岸街區與日常生活，把杭州放進更廣闊的江南與中國交通史。',sections:[['超越一條河的尺度','大運河是跨越多個時代建設和維護的水運系統，聯繫多個流域。它不只承載交通，也與城市、貿易和水利管理相連。'],['從橋邊慢看','在模型中降低高度，看看橋如何連接兩岸，房屋與水面如何形成街區。模型的橋與民居是通用意象，不代表某座真實建築的精確外形。'],['延伸閱讀','大運河於2014年列入世界遺產。理解杭州段時，可以把目光同時放在岸邊生活與跨區域的水路連結。']],facts:[['世界遺產','2014'],['主題','水運與聚落']],sources:[canalSource]},
 {id:'qiantang',short:'錢塘江',name:'錢塘江 · 城市水岸',kind:'江景與城市',category:'water',icon:'江',lon:120.219,lat:30.233,model:'riverfront',radius:17,area:'杭州 · 沿江城區',tagline:'看江面、橋樑與兩岸城市的尺度。',position:'標記只是江岸景觀錨點，不是觀潮點、集合點或潮汐預報。',intro:'錢塘江流經杭州，向杭州灣延伸。寬闊江面、跨江橋樑與兩岸城區，展現杭州在西湖之外的另一種空間尺度。',sections:[['把城市放回江邊','先升高找出江流方向，再轉向兩岸看城市如何展開。橋樑連接兩岸，也為觀察城市的距離提供參照。'],['湖景與江景有何不同','可以先在西湖看堤岸和島嶼，再到江邊感受開闊水面。這是一種景觀比較方法，沒有固定先後或遊覽時間。'],['觀潮要另查資訊','錢塘江以潮湧聞名，但此網站沒有潮時或安全觀潮點資料。若到現場觀潮，請遵守當地警示和圍欄，使用開放觀景區域。']],facts:[['流向','杭州灣'],['觀看線索','江面・橋・兩岸']],sources:[riverSource]},
 {id:'museum',short:'浙江省博物館',name:'浙江省博物館 · 之江館區',kind:'歷史與文化',category:'culture',icon:'文',lon:120.073,lat:30.147,model:'museum',radius:6.5,area:'杭州 · 之江文化中心',tagline:'由器物與展覽，認識浙江的生活。',position:'標記指向之江館區一帶；建築以通用展館意象呈現，並非建築複刻。',intro:'博物館為山水探索補上歷史與文化的線索。浙江省博物館設有之江及孤山等館區，計劃看展時要先認清目的地。',sections:[['把看展變成探索','可以帶着一個簡單問題入館：不同時代的人如何生活？再從器物、材料和工藝，尋找它們與環境的關係。'],['館區要分清','之江館區與西湖旁的孤山館區是不同地點。本模型呈現之江一帶，不能用來代替現場交通及入館指引。'],['出發前查館方資訊','常設展、臨時展、開館與入館安排可能調整。使用下面館方連結查閱，網站不提供即時票務或預約服務。']],facts:[['所在館區','之江'],['主題','器物・工藝・歷史']],sources:[museumSource]},
 {id:'wuzhen',short:'烏鎮',name:'烏鎮 · 江南水鄉',kind:'周邊水鄉',category:'nearby',icon:'鎮',lon:120.486,lat:30.749,model:'watertown',radius:13,area:'嘉興市桐鄉 · 杭州東北方向',tagline:'河、橋與臨水民居，交織成水鄉。',position:'標記表示古鎮景觀範圍，不對應東柵或西柵的精確遊覽圖。',intro:'烏鎮位於嘉興市桐鄉，屬杭州周邊的跨城探索。由杭州往東北移動，平原、河網與城鎮逐漸展開，水鄉在這片環境中形成。',sections:[['先認河，再認街','河道、橋樑、街巷與臨水房屋，是看懂水鄉的四條線索。在模型中沿河慢飛，再轉到橋側觀察兩岸的連接。'],['景區與模型','烏鎮有東柵、西柵等不同遊覽區域。本模型採用江南民居意象，沒有重建真實商戶、門牌或某一區的完整街道。'],['跨城探索的操作','距離較長時可切換「跨城」速度，或直接選擇烏鎮飛近。抵達後再切回「慢遊」，看河岸與屋頂的細節。門票、交通及開放情況請查景區資訊。']],facts:[['行政位置','嘉興・桐鄉'],['景觀線索','河道・橋・民居']],sources:[wuzhenSource]}
];
export const byId=Object.fromEntries(places.map(p=>[p.id,p]));
export const inCategory=id=>id==='all'?places:places.filter(p=>p.category===id);
export const knowledge=[
 {title:'先認一湖、一江、一條運河',label:'空間入門',text:'西湖看湖山與園林，錢塘江看江面與兩岸城市，大運河看水路與街區。切換三種視角，比只記一串景點名稱更容易理解杭州。',sources:[westlakeSource,canalSource,riverSource]},
 {title:'風景不是只有自然',label:'文化景觀',text:'西湖的堤、島與園林，呈現人們長期整理和欣賞山水的方式。觀看景色時，也可以想想人如何賦予地方意義。',sources:[westlakeSource]},
 {title:'水鄉是一種空間關係',label:'沿水而居',text:'河道提供流動的方向，橋把兩岸接起來，街巷與民居靠水展開。這些關係比某一座房子的外觀，更能幫助你讀懂水鄉。',sources:[wuzhenSource,canalSource]},
 {title:'自由選擇，沒有固定日程',label:'使用這個導覽',text:'按湖山、水岸、文化或周邊主題選地方；「下一景點」只切換清單，不代表交通路線。你亦可以沿途自由飛行，建立自己的空間印象。',sources:[]}
];
