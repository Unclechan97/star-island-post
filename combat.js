/* Hand-authored pixel creatures and per-level patrols; positions stay on solid ground. */
(() => {
const routes=[
 [[0,300,65,1,.85]],
 [[1,650,65,1,.95],[3,1450,60,1,1],[5,2460,55,1,.9]],
 [[0,300,65,1,1],[6,910,45,1,1.1],[2,1450,80,1,1]],
 [[1,600,50,1,1.2],[3,1295,45,2,.9],[5,1955,50,1,1.3],[7,2640,60,1,1.1]],
 [[0,260,60,2,.8],[1,970,65,1,1.2],[2,1675,55,2,.9],[3,2360,65,1,1.25],[4,2860,55,2,.9]],
 [[0,250,55,1,1.2],[1,950,60,1,1.25],[8,1395,20,2,.85],[2,1680,60,2,.95],[3,2440,70,2,1],[4,3100,60,2,1.1]]
];
const slime=[
'      44        ','     424        ','   11221111     ','  1222222221    ',' 122442222221   ','12244422222221  ','122442222222221 ','122225522552221 ','122226522652221 ','122222233222221 ',' 1332222222331  ','  13333333331   ','   111111111    '
],stone=[
'    4444        ','   14224111     ','  1222222221    ',' 122422222221   ',' 122222222221   ',' 122655226521   ',' 122665226621   ',' 122223322221   ','  1333333331    ',' 113222222311   ','12231222313221  ','12331222313321  ',' 133122213331   ','  1112222111    ','   12211221     ','   13311331     ','  1111111111    '
];
function create(level,platforms){return routes[level].map(([platform,base,range,hp,speed],i)=>{const p=platforms[platform],x=Math.max(p.x+24,Math.min(p.x+p.w-24,base));return {id:i,platform,base:x,x,y:p.y,range:Math.min(range,x-p.x-22,p.x+p.w-x-22),speed,phase:i*1.8,hp,maxHp:hp,w:hp>1?38:36,h:hp>1?43:33,kind:hp>1?'stone':'slime',face:1,flash:0,lastAttack:-1,dead:false};});}
function draw(g,m,x,time){if(m.dead)return;const st=m.kind==='stone',rows=st?stone:slime,scale=st?2.4:2.5,bob=Math.sin(time*6+m.id)*1.5;g.save();g.translate(Math.round(x),Math.round(m.y));g.fillStyle='#274a3929';g.beginPath();g.ellipse(0,2,st?19:18,4,0,0,Math.PI*2);g.fill();g.scale(m.face,1);const colors=m.flash>0?['','#edbd8c','#fff0b9','#e2bd85','#fff5d5','#68785b','#fffbe7']:st?['','#48645d','#8fa18c','#6c8575','#b3ce86','#243e3a','#f6e5a1']:['','#4b6b4d','#98ba70','#71955b','#c8dfa0','#263f3c','#fff3c6'];for(let y=0;y<rows.length;y++)for(let q=0;q<rows[y].length;q++){const k=Number(rows[y][q]);if(k){g.fillStyle=colors[k];g.fillRect(Math.round((q-7.5)*scale),Math.round((y-rows.length)*scale+bob),Math.ceil(scale),Math.ceil(scale));}}g.restore();for(let k=0;k<m.maxHp;k++){g.fillStyle=k<m.hp?'#df8e6a':'#c8cdb5';g.fillRect(Math.round(x+(k-(m.maxHp-1)/2)*8-2),Math.round(m.y-m.h-12),5,4);}}
window.StarCombat=Object.freeze({create,draw});
})();
