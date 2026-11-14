/* Six handcrafted routes; each changes geometry and introduces a real mechanic. */
(() => {
const P=(x,y,w,type='solid',range=0,speed=0)=>({x,y,w,type,base:x,range,speed,timer:0,triggered:false,hidden:false,dx:0});
const S=(x,y)=>({x,y,got:false}),C=(base,y,range=55,speed=.8,phase=0)=>({base,x:base,y,range,speed,phase});
window.STAR_LEVELS=[
{name:'微风草甸',theme:'meadow',tag:'WINDY MEADOW',width:2330,description:'练习跳跃 · 宽平台与短水隙',tip:'J键或⚔按钮攻击怪兽，可长按连击；空格跳跃，再按一次可二段跳。',wind:0,
sky:'#d9eee0',horizon:'#b7d8b3',far:'#9dc7aa',tree:'#759b7c',ground:'#80a16b',light:'#d8e9a8',water:'#92c8bb',accent:'#e2be65',
platforms:[P(0,415,570),P(680,415,500),P(1290,415,350),P(1760,415,570),P(350,335,150),P(800,325,170),P(1050,270,140),P(1440,320,160),P(1820,320,180)],
stars:[S(240,350),S(430,280),S(850,270),S(1100,215),S(1510,265),S(1930,265)],clouds:[C(1240,350,40,.65)],checkpoint:1290},
{name:'潮汐栈桥',theme:'coast',tag:'TIDAL BOARDWALK',width:2600,description:'移动渡台 · 观察来回航行的木筏',tip:'木筏会来回移动。站稳后，等它靠近下一座栈桥再跳。',wind:0,
sky:'#f3dfc9',horizon:'#e6c7b4',far:'#a8b9a0',tree:'#7f9d7e',ground:'#a3a370',light:'#ede0a1',water:'#a0c4c1',accent:'#e89968',
platforms:[P(0,415,420),P(520,415,260),P(930,415,260),P(1340,415,260),P(1780,415,270),P(2190,415,410),P(260,335,120),P(640,320,110),P(810,350,100,'moving',65,.8),P(1080,310,110),P(1490,330,110),P(1660,350,100,'moving',65,.95),P(1920,310,120),P(2290,330,110)],
stars:[S(220,350),S(320,280),S(690,265),S(865,295),S(1130,255),S(1540,275),S(1980,255),S(2345,275)],clouds:[C(1225,290,65,1),C(2110,320,65,1.1,2)],checkpoint:1340},
{name:'萤火森林',theme:'forest',tag:'FIREFLY CANOPY',width:2600,description:'树冠攀登 · 蘑菇台带你跳得更高',tip:'绿色蘑菇台上按跳跃，获得更高的弹跳。沿树冠寻找星光。',wind:0,
sky:'#bdd3b9',horizon:'#a4c3a0',far:'#80aa89',tree:'#578265',ground:'#708e59',light:'#d3dfa0',water:'#789e8e',accent:'#e4d580',
platforms:[P(0,415,500),P(700,415,350),P(1250,415,350),P(1800,415,800),P(430,330,140),P(620,245,140,'spring'),P(820,190,180),P(1080,260,160),P(1380,310,140),P(1690,300,140,'spring'),P(1990,250,160),P(2250,330,120)],
stars:[S(240,350),S(495,275),S(690,190),S(910,135),S(1160,205),S(1450,255),S(1760,245),S(2070,195)],clouds:[C(1180,340,60,1),C(2190,265,65,1.2,2)],checkpoint:1250},
{name:'风鸣峡谷',theme:'canyon',tag:'WHISTLING CANYON',width:2800,description:'阵风横渡 · 窄落点与更长的间距',tip:'阵风只影响空中移动。留意风向，利用二段跳修正落点。',wind:58,
sky:'#e8d7bc',horizon:'#cebaa0',far:'#b6997c',tree:'#8b8d6e',ground:'#a38b66',light:'#dfc698',water:'#b8b5a0',accent:'#e7b66b',
platforms:[P(0,415,340),P(510,380,190),P(870,340,150),P(1210,390,170),P(1560,330,150),P(1870,380,170),P(2190,330,150),P(2490,415,310)],
stars:[S(210,350),S(600,325),S(945,285),S(1295,335),S(1635,275),S(1955,325),S(2265,275),S(2610,350)],clouds:[C(1090,270,45,1.3),C(2020,260,60,1.5,2)],checkpoint:1210},
{name:'失落钟庭',theme:'ruins',tag:'THE FALLEN COURT',width:3000,description:'坍塌石板 · 落脚后 1 秒内再次出发',tip:'裂纹石板踩上 1 秒后坍塌，3 秒后复原。别在上面久留。',wind:0,
sky:'#d7d6c9',horizon:'#b9bdac',far:'#99a793',tree:'#738975',ground:'#8c9882',light:'#cdd2af',water:'#92aba3',accent:'#d2be7e',
platforms:[P(0,415,400),P(820,415,300),P(1550,415,250),P(2240,415,260),P(2700,415,300),P(490,365,120,'crumble'),P(660,310,120,'crumble'),P(1210,345,110,'crumble'),P(1390,290,110,'crumble'),P(1910,350,100,'crumble'),P(2080,300,100,'crumble'),P(2580,350,95,'crumble')],
stars:[S(240,350),S(550,310),S(720,255),S(980,350),S(1265,290),S(1445,235),S(1660,350),S(1960,295),S(2130,245),S(2625,295)],clouds:[C(1170,270,40,1.35),C(1860,250,45,1.5,2),C(2530,280,45,1.5,4)],checkpoint:1550},
{name:'星夜灯塔',theme:'night',tag:'STARRY LIGHTHOUSE',width:3300,description:'最后一封信 · 移动平台、阵风与石板的组合',tip:'最后一程：观察平台、留意阵风，保持移动。每个落点都很重要。',wind:35,
sky:'#435e72',horizon:'#536e83',far:'#547b7c',tree:'#477469',ground:'#688b6b',light:'#adc895',water:'#638f9d',accent:'#e4c779',
platforms:[P(0,415,350),P(820,415,250),P(1530,415,250),P(2300,415,280),P(2900,415,400),P(450,350,110,'crumble'),P(630,280,110,'moving',30,.9),P(1160,340,110,'crumble'),P(1340,260,110),P(1900,340,120,'moving',45,1.1),P(2110,270,110,'crumble'),P(2660,320,110,'spring')],
stars:[S(220,350),S(505,295),S(685,225),S(950,350),S(1215,285),S(1395,205),S(1700,350),S(1960,285),S(2165,215),S(2715,265)],clouds:[C(1120,230,35,1.5),C(1810,250,40,1.6,2),C(2810,270,45,1.7,4)],checkpoint:1530}
];
for(const [level,star,platform] of [[1,3,8],[5,2,6],[5,7,9]]){const l=window.STAR_LEVELS[level],s=l.stars[star];s.platform=platform;s.offset=s.x-l.platforms[platform].x;}
})();
