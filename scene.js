import * as THREE from './vendor/three.module.js';
import {places,byId} from './data.js';
export const project=(lon,lat)=>[(lon-120.16)*960,(30.28-lat)*1110];
export const unproject=(x,z)=>[120.16+x/960,30.28-z/1110];
export const bounds={minX:-230,maxX:560,minZ:-620,maxZ:265};
const geo=(a)=>a.map(([lon,lat])=>project(lon,lat));
export const lake=geo([[120.132,30.264],[120.145,30.262],[120.157,30.257],[120.164,30.245],[120.159,30.232],[120.150,30.225],[120.140,30.222],[120.126,30.229],[120.119,30.242],[120.125,30.255]]);
export const river=geo([[119.94,30.088],[120.013,30.103],[120.076,30.125],[120.119,30.154],[120.164,30.183],[120.199,30.209],[120.223,30.235],[120.249,30.264],[120.279,30.298],[120.314,30.321],[120.353,30.322],[120.395,30.307],[120.44,30.302],[120.50,30.304],[120.57,30.305],[120.72,30.30]]);
export const canal=geo([[120.176,30.267],[120.172,30.294],[120.145,30.318],[120.148,30.35],[120.166,30.384],[120.207,30.425],[120.236,30.464],[120.301,30.53],[120.358,30.591],[120.421,30.634],[120.45,30.684],[120.48,30.727],[120.49,30.78],[120.53,30.84]]);
export const roads=[
{points:geo([[120.20,30.25],[120.218,30.30],[120.23,30.36],[120.225,30.405],[120.272,30.461],[120.308,30.52],[120.385,30.572],[120.42,30.64],[120.46,30.713],[120.481,30.742]]),w:.55,major:true},
{points:geo([[120.066,30.14],[120.081,30.17],[120.10,30.201],[120.13,30.219],[120.165,30.226],[120.167,30.25],[120.188,30.27],[120.223,30.291],[120.26,30.32],[120.32,30.352],[120.38,30.36]]),w:.6,major:true},
{points:geo([[120.217,30.223],[120.244,30.217],[120.285,30.22],[120.329,30.235],[120.393,30.239],[120.433,30.233]]),w:.65,major:true},
{points:geo([[119.97,30.283],[120.024,30.287],[120.08,30.288],[120.13,30.29],[120.187,30.293],[120.216,30.302]]),w:.45},
{points:geo([[120.009,30.268],[120.06,30.268],[120.10,30.276],[120.143,30.277],[120.18,30.276],[120.212,30.273]]),w:.45},
{points:geo([[120.163,30.219],[120.168,30.245],[120.172,30.28],[120.174,30.32],[120.17,30.36]]),w:.45},
{points:geo([[120.204,30.213],[120.214,30.244],[120.216,30.27],[120.217,30.30],[120.228,30.337]]),w:.55},
{points:geo([[120.01,30.31],[120.073,30.309],[120.123,30.317],[120.17,30.336],[120.22,30.36]]),w:.48},
{points:geo([[120.123,30.192],[120.16,30.177],[120.196,30.19],[120.226,30.205],[120.265,30.20],[120.292,30.21]]),w:.45},
{points:geo([[120.074,30.14],[120.08,30.128],[120.09,30.112]]),w:.5},
{points:geo([[120.458,30.737],[120.483,30.738],[120.503,30.747]]),w:.32}
];
export function inPolygon(x,z,poly){let hit=false;for(let i=0,j=poly.length-1;i<poly.length;j=i++){const a=poly[i],b=poly[j];if(((a[1]>z)!==(b[1]>z))&&x<(b[0]-a[0])*(z-a[1])/(b[1]-a[1])+a[0])hit=!hit;}return hit;}
export function distanceToPath(x,z,pts){let d=Infinity;for(let i=1;i<pts.length;i++){const [ax,az]=pts[i-1],[bx,bz]=pts[i],dx=bx-ax,dz=bz-az;const t=Math.max(0,Math.min(1,((x-ax)*dx+(z-az)*dz)/(dx*dx+dz*dz||1)));d=Math.min(d,Math.hypot(x-ax-t*dx,z-az-t*dz));}return d;}
const xixi=project(120.052,30.274),wuzhen=project(120.486,30.749);
export const isWater=(x,z)=>inPolygon(x,z,lake)||distanceToPath(x,z,river)<(x>180?5.3:3.2)||distanceToPath(x,z,canal)<.55;
const peaks=[[120.087,30.229,4.0,24,27],[120.055,30.232,4.7,28,33],[120.113,30.206,2.4,14,13],[120.078,30.191,3.1,25,23],[120.111,30.268,1.7,10,6],[120.118,30.266,1.0,6,4],[119.978,30.203,4.8,25,46],[120.025,30.15,4.9,32,27],[119.98,30.323,2.8,26,30],[120.053,30.18,3.4,18,22]].map(([lon,lat,h,a,b])=>[...project(lon,lat),h,a,b]);
export function heightAt(x,z){if(isWater(x,z))return -.05;let v=0;for(const [a,b,h,sx,sz] of peaks)v+=h*Math.exp(-1.8*((x-a)**2/sx**2+(z-b)**2/sz**2));return v*(.89+.11*Math.sin(x*.7)*Math.cos(z*.61));}
export function buildWorld(scene){
 const materials=new Map();const mat=(c)=>{if(!materials.has(c))materials.set(c,new THREE.MeshStandardMaterial({color:c,roughness:.92}));return materials.get(c);};
 const boxGeo=new THREE.BoxGeometry(1,1,1),coneGeo=new THREE.ConeGeometry(1,1,6);
 const box=(parent,x,y,z,w,h,d,c,rot=0)=>{const m=new THREE.Mesh(boxGeo,mat(c));m.position.set(x,y,z);m.scale.set(w,h,d);m.rotation.y=rot;parent.add(m);return m;};
 const cylinder=(g,x,y,z,rt,rb,h,c,n=12)=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,n),mat(c));m.position.set(x,y,z);g.add(m);return m;};
 function polygon(points,color,y=0){const s=new THREE.Shape();points.forEach(([x,z],i)=>i?s.lineTo(x,-z):s.moveTo(x,-z));s.closePath();const mesh=new THREE.Mesh(new THREE.ShapeGeometry(s),mat(color));mesh.rotation.x=-Math.PI/2;mesh.position.y=y;scene.add(mesh);return mesh;}
 function strip(points,width,color,y=.12){const vs=[],ix=[];points.forEach(([x,z],i)=>{const p=points[Math.max(i-1,0)],q=points[Math.min(i+1,points.length-1)];const dx=q[0]-p[0],dz=q[1]-p[1],len=Math.hypot(dx,dz)||1;vs.push(x-dz/len*width/2,y,z+dx/len*width/2,x+dz/len*width/2,y,z-dx/len*width/2);if(i)ix.push(2*i-2,2*i-1,2*i,2*i-1,2*i+1,2*i);});const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(vs,3));g.setIndex(ix);g.computeVertexNormals();const m=new THREE.Mesh(g,new THREE.MeshStandardMaterial({color,roughness:.83,side:THREE.DoubleSide}));scene.add(m);return m;}
 function instances(list,c,geometry=boxGeo){if(!list.length)return;const m=new THREE.InstancedMesh(geometry,mat(c),list.length),o=new THREE.Object3D();list.forEach((p,i)=>{o.position.set(p[0],p[1],p[2]);o.scale.set(p[3],p[4],p[5]);o.rotation.set(0,p[6]||0,0);o.updateMatrix();m.setMatrixAt(i,o.matrix);if(p[7])m.setColorAt(i,new THREE.Color(p[7]));});m.computeBoundingSphere();scene.add(m);return m;}
 let seed=73197;const rand=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;};
 // A continuous, georeferenced editorial terrain. Heights and minor features are illustrative.
 const terrainGeo=new THREE.PlaneGeometry(1100,1200,180,196);terrainGeo.rotateX(-Math.PI/2);terrainGeo.translate(150,0,-180);
 const pos=terrainGeo.attributes.position,colors=[];for(let i=0;i<pos.count;i++){const x=pos.getX(i),z=pos.getZ(i),h=heightAt(x,z);pos.setY(i,h);const c=new THREE.Color(h>.35?'#82a37c':'#b8c9a3');if(h>.35)c.lerp(new THREE.Color('#648d72'),Math.min(h/10,.65));else c.offsetHSL(0,0,Math.sin(x*.4)*Math.cos(z*.2)*.016);colors.push(c.r,c.g,c.b);}terrainGeo.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));terrainGeo.computeVertexNormals();const terrain=new THREE.Mesh(terrainGeo,new THREE.MeshStandardMaterial({vertexColors:true,roughness:1}));scene.add(terrain);
 const riverShape=strip(river,7.2,'#639f99',.035);strip(river.slice(9),10.6,'#639f99',.036);polygon(lake,'#73aaa0',.06);strip(canal,1.16,'#79a69b',.07);
 // West Lake islands, causeways and shoreline promenade.
 const su=geo([[120.130,30.258],[120.132,30.25],[120.137,30.231]]),bai=geo([[120.14,30.26],[120.15,30.257],[120.156,30.259]]);
 strip(su,.37,'#d5ccac',.14);strip(bai,.44,'#d5ccac',.14);
 for(const [lon,lat,r] of [[120.142,30.235,1.65],[120.132,30.249,.75],[120.138,30.253,.65]]){const [x,z]=project(lon,lat);const pts=Array.from({length:15},(_,i)=>[x+Math.cos(i/15*Math.PI*2)*r,z+Math.sin(i/15*Math.PI*2)*r*.7]);polygon(pts,'#a0b992',.16);}
 // Stylised wetland channels and islands, deliberately not presented as surveyed geometry.
 const wetChannels=[];for(let j=-2;j<=2;j++){const pts=[];for(let i=-4;i<=4;i++)pts.push([xixi[0]+i*2.5,xixi[1]+j*3+Math.sin(i+j)*1.2]);wetChannels.push(pts);strip(pts,.7,'#7da59a',.1);}for(let j=-2;j<=2;j++){const pts=[];for(let i=-4;i<=4;i++)pts.push([xixi[0]+j*3+Math.sin(i)*.6,xixi[1]+i*2]);wetChannels.push(pts);strip(pts,.55,'#7da59a',.11);}
 // Curated transport corridors and urban street grid; illustrative rather than navigable.
 for(const r of roads){strip(r.points,r.w+0.24,'#99a28c',.12);strip(r.points,r.w,r.major?'#e2d6b9':'#ded8bd',.145);}
 for(let x=0;x<57;x+=5.6){let run=[];for(let z=-15;z<61;z+=.7){if(!isWater(x,z)){run.push([x,z]);}else{if(run.length>1)strip(run,.17,'#d2d0b5',.105);run=[];}}if(run.length>1)strip(run,.17,'#d2d0b5',.105);}
 for(let z=-12;z<64;z+=5.6){let run=[];for(let x=-4;x<62;x+=.7){if(!isWater(x,z)){run.push([x,z]);}else{if(run.length>1)strip(run,.17,'#d2d0b5',.105);run=[];}}if(run.length>1)strip(run,.17,'#d2d0b5',.105);}
 // Every crossing remains above the illustrative river surface.
 for(const [lon,lat,angle] of [[120.226,30.238,-.67],[120.17,30.188,-.67],[120.28,30.297,-.6]]){const [x,z]=project(lon,lat);box(scene,x,.2,z,11,.13,.38,'#e7debe',angle);}
 const city=[],fields=[],trees=[],treeTrunks=[];
 const reserves=places.map(p=>({...p,point:project(p.lon,p.lat)}));
 const nearPlace=(x,z)=>reserves.some(p=>Math.hypot(p.point[0]-x,p.point[1]-z)<(p.reserve??(p.model==='watertown'?9:p.model==='lake'?0:p.model==='wetland'?12:3.8)));
 const roadDist=(x,z)=>Math.min(...roads.map(r=>distanceToPath(x,z,r.points)));
 function town(cx,cz,rx,rz,n,heights){for(let i=0;i<n;i++){const x=cx+(rand()-.5)*rx*2,z=cz+(rand()-.5)*rz*2;if(isWater(x,z)||heightAt(x,z)>.45||nearPlace(x,z)||roadDist(x,z)<.55||Math.abs((x+1)%5.6)<.6||Math.abs((z+1)%5.6)<.6)continue;const h=heights[0]+rand()*heights[1],w=.3+rand()*.42,d=.3+rand()*.55;city.push([x,h/2+.035,z,w,h,d,0,['#ede7d7','#d5d9c7','#c0caba','#dfe1cc'][Math.floor(rand()*4)]]);}}
 town(25,20,44,51,4200,[.25,.85]);town(43,60,14,13,1400,[.55,2.0]);town(48,95,24,20,1700,[.35,1.4]);town(-54,-13,73,24,2500,[.23,.8]);town(40,-64,52,28,1800,[.3,.7]);
 for(const [lon,lat] of [[120.24,30.405],[120.247,30.459],[120.31,30.532],[120.37,30.60],[120.435,30.65],[120.486,30.724]]){const [x,z]=project(lon,lat);town(x,z,8,10,250,[.13,.28]);}
 town(310,-500,20,22,500,[.13,.35]);
 for(let i=0;i<1600;i++){const x=35+rand()*400,z=-95-rand()*470;if(nearPlace(x,z)||isWater(x,z)||roadDist(x,z)<2.8||distanceToPath(x,z,canal)<2)continue;const w=2.5+rand()*5,d=2+rand()*4;fields.push([x,.038,z,w,.025,d,0,['#bfc99e','#aabc8e','#c7c59b','#9fb590'][Math.floor(rand()*4)]]);}
 function tree(x,z,size=.3){const y=heightAt(x,z);trees.push([x,y+size*.85,z,size*.65,size*1.7,size*.65,rand()*6,['#578d70','#729978','#4d8267'][Math.floor(rand()*3)]]);}
 for(let i=0;i<5800;i++){const x=-200+rand()*810,z=230-rand()*800;if(isWater(x,z)||nearPlace(x,z)||roadDist(x,z)<.4)continue;if(heightAt(x,z)>.35||rand()<.26)tree(x,z,.25+rand()*.3);}
 for(const points of [su,bai])for(let i=1;i<points.length;i++){const a=points[i-1],b=points[i],n=Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])/.8);for(let j=0;j<n;j++){const t=j/n;tree(a[0]+(b[0]-a[0])*t+.28,a[1]+(b[1]-a[1])*t,.28);}}
 for(let i=0;i<650;i++){const x=xixi[0]+(rand()-.5)*25,z=xixi[1]+(rand()-.5)*21;if(wetChannels.every(p=>distanceToPath(x,z,p)>.6))tree(x,z,.3+rand()*.3);}
 instances(fields,'#fff');instances(city,'#fff');instances(trees,'#fff',coneGeo);
 // Roof geometry for simple Jiangnan houses.
 const roofGeo=new THREE.BufferGeometry();roofGeo.setAttribute('position',new THREE.Float32BufferAttribute([-1,0,-1,1,0,-1,0,.65,-1,-1,0,1,1,0,1,0,.65,1],3));roofGeo.setIndex([0,2,1,3,4,5,0,3,5,0,5,2,1,2,5,1,5,4,0,1,4,0,4,3]);roofGeo.computeVertexNormals();
 function house(g,x,z,w,d,h,roof='#657467'){box(g,x,h/2,z,w,h,d,'#eae7d6');const m=new THREE.Mesh(roofGeo,mat(roof));m.position.set(x,h,z);m.scale.set(w*.56,w*.7,d*.56);g.add(m);box(g,x,h*.45,z+d*.503,w*.3,h*.5,.03,'#65796b');}
 function pagoda(g,x,z){cylinder(g,x,.15,z,.6,.7,.3,'#d7c4a5',8);for(let j=0;j<5;j++){const y=.3+j*.4,r=.48-j*.04;cylinder(g,x,y+.18,z,r*.65,r*.65,.4,'#c49a72',8);cylinder(g,x,y+.38,z,r*.65,r+.09,.13,'#6c816d',8);}cylinder(g,x,2.55,z,0,.17,.35,'#647660',8);}
 function bridge(g,x,z,w=1.5){const arch=new THREE.Mesh(new THREE.TorusGeometry(w/2,.09,5,16,Math.PI),mat('#ddd5bc'));arch.position.set(x,.12,z);g.add(arch);box(g,x,.15,z,w+.15,.12,.55,'#d8d3bc');}
 const groups=new Map(),roots=[];
 for(const p of places){const g=new THREE.Group(),[x,z]=project(p.lon,p.lat);g.position.set(x,Math.max(.13,heightAt(x,z)),z);g.userData.placeId=p.id;scene.add(g);groups.set(p.id,g);roots.push(g);if(p.model==='museum')box(g,0,.025,0,6,.05,5,'#d9d9bd');
 switch(p.model){
 case 'airport':box(g,0,.05,0,30,.1,24,'#c5cfbd');for(const a of [-9,9]){box(g,a,.12,0,1.3,.12,21,'#778d82');for(let j=-8;j<=8;j+=2)box(g,a,.19,j,.08,.02,.7,'#eee8d3');}box(g,0,.65,0,7,1.3,3,'#e7e4d5');box(g,0,1.37,0,7.5,.16,3.5,'#789f97');for(const a of [-2.6,0,2.6])box(g,a,.45,3,1,.9,5,'#d4dece');cylinder(g,5,1.5,-4,.3,.4,3,'#c7cbbc',8);box(g,5,3,-4,1.1,.6,1.1,'#799e98');break;
 case 'campus':box(g,0,.04,0,10,.08,8,'#c3d1bb');for(const a of [-3,0,3])for(const z of [-2,2]){box(g,a,1,z,2,2,2,'#d9e0d5');box(g,a,1.8,z+1.01,1.8,.4,.04,'#779e98');box(g,a,2.08,z,2.2,.16,2.2,'#95af9b');}break;
 case 'temple':box(g,0,.04,0,8,.08,8,'#c6c7aa');for(const z of [-2.5,0,2.5])house(g,0,z,3,1.5,.9,'#786c4c');pagoda(g,3,0);break;
 case 'tea':box(g,0,.03,0,13,.06,12,'#91ab7c');for(let j=-5;j<=5;j+=1.1)for(let i=-5;i<=5;i+=1.2)box(g,i,.3,j,.85,.55,.45,'#548b62');house(g,0,7,2,1.4,.7);break;
 case 'street':box(g,0,.04,0,8,.08,9,'#c8c4a6');for(const a of [-2,2])for(let z=-3;z<=3;z+=1.5)house(g,a,z,1.4,1,.65);break;
 case 'ruins':box(g,0,.04,0,24,.08,20,'#bac89b');for(let j=0;j<3;j++)box(g,0,.3+j*.4,0,12-j*3,.4,9-j*2,'#bbaa7b');for(const a of [-9,9])box(g,a,.22,0,1.2,.4,14,'#b2a782');box(g,0,.14,8,18,.2,1,'#cfbd95');break;
 case 'museum':for(const [a,b] of [[-1.4,0],[1.4,0],[0,-1.2]]){box(g,a,.38,b,1.6,.76,1.2,'#e9e5d4');box(g,a,.8,b,1.9,.12,1.5,'#c6c0a4');for(let i=-2;i<=2;i++)box(g,a+i*.26,.38,b+.62,.08,.58,.05,'#749086');}box(g,0,.08,1.2,4,.1,1,'#c3cfb2');break;
 case 'canalfront':{strip([[x,z-7],[x,z+7]],1.2,'#79a69b',.13);const b=new THREE.Group();b.rotation.y=Math.PI/2;g.add(b);bridge(b,0,0,2.2);for(const side of [-1,1])for(let i=-3;i<=3;i++)house(g,side*2.2,i*1.4,.7,.8,.4);break;}
 case 'riverfront':box(g,-2.3,.12,0,.85,.13,8,'#d4d0af');for(let i=-4;i<=4;i++){box(g,-2.3,.32,i*.8,.15,.28,.4,'#788f68');}break;
 case 'lake':{const [px,pz]=project(120.148,30.231);const d=new THREE.Group();d.position.set(px-x,0,pz-z);g.add(d);pagoda(d,0,0);for(const a of [-3,0,3]){const b=new THREE.Group();b.position.set(a,0,0);g.add(b);box(b,0,.12,0,.55,.17,.2,'#886f4d');box(b,0,.25,0,.27,.14,.22,'#c2a67c');}break;}
 case 'wetland':for(const [a,b] of [[-4,0],[3,-3],[1,5]]){house(g,a,b,.8,.55,.3);bridge(g,a+1.2,b,1.5);}break;
 case 'watertown':{const main=[[-10,0],[-6,-1],[-2,0],[2,1],[5,0],[10,-2]].map(([a,b])=>[x+a,z+b]);strip(main,1.15,'#73a097',.11);for(let r=-3;r<=3;r++){const row=r*1.7;if(Math.abs(row)<1.4)continue;for(let c=-5;c<=5;c++){const a=c*1.6+(r%2)*.25;if(rand()<.1)continue;house(g,a,row,.8+rand()*.3,.7,.24+rand()*.18);}}for(const a of [-6,-1,4,8])bridge(g,a,a>0?.6:-.1,1.8);for(const a of [-4,2,7]){box(g,a,.16,0,.5,.11,.16,'#8d7150');box(g,a,.24,0,.2,.11,.17,'#c4a77f');}break;}
 }
 if(p.model==='museum'){for(let i=0;i<12;i++){const a=(i/12)*Math.PI*2;const r=2.5;const m=new THREE.Mesh(coneGeo,mat('#6a9573'));m.position.set(Math.cos(a)*r,.37,Math.sin(a)*r);m.scale.set(.17,.7,.17);g.add(m);}}
 }
 // Batch repeated landmark parts while retaining each selectable place root.
 scene.updateMatrixWorld(true);
 for(const root of roots){
  const inverse=root.matrixWorld.clone().invert(),batches=new Map();
  root.traverse(o=>{if(!o.isMesh||o.isInstancedMesh||Array.isArray(o.material))return;const key=o.geometry.uuid+o.material.uuid;if(!batches.has(key))batches.set(key,[]);batches.get(key).push({mesh:o,matrix:new THREE.Matrix4().multiplyMatrices(inverse,o.matrixWorld)});});
  for(const parts of batches.values()){if(parts.length<3)continue;const mesh=new THREE.InstancedMesh(parts[0].mesh.geometry,parts[0].mesh.material,parts.length);parts.forEach((p,i)=>{mesh.setMatrixAt(i,p.matrix);p.mesh.parent.remove(p.mesh);});mesh.computeBoundingSphere();root.add(mesh);}
 }
 // Ground labels are geographic orientation aids, not a basemap.
 function groundText(text,lon,lat,w){if(typeof document==='undefined')return;const cv=document.createElement('canvas');cv.width=1024;cv.height=128;const ctx=cv.getContext('2d');if(!ctx)return;ctx.font='500 72px sans-serif';ctx.textAlign='center';ctx.fillStyle='#3e705e';ctx.fillText(text,512,88);const tex=new THREE.CanvasTexture(cv);tex.colorSpace=THREE.SRGBColorSpace;const m=new THREE.Mesh(new THREE.PlaneGeometry(w,w/8),new THREE.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false}));m.rotation.x=-Math.PI/2;const [x,z]=project(lon,lat);m.position.set(x,.22,z);scene.add(m);}
 groundText('西 湖',120.142,30.244,10);groundText('錢 塘 江',120.34,30.317,21);groundText('杭 州',120.19,30.304,17);groundText('濱 江',120.23,30.2,13);groundText('西 溪',120.053,30.274,8);groundText('往 烏 鎮',120.345,30.57,22);groundText('烏 鎮',120.489,30.757,10);
 const halo=new THREE.Mesh(new THREE.RingGeometry(.86,1,64),new THREE.MeshBasicMaterial({color:'#e6bb71',transparent:true,opacity:.8,side:THREE.DoubleSide,depthTest:false}));halo.rotation.x=-Math.PI/2;halo.renderOrder=6;scene.add(halo);
 function select(id){const p=byId[id],g=groups.get(id),r=Math.max(3.6,p.radius*.55);halo.position.set(g.position.x,g.position.y+.16,g.position.z);halo.scale.setScalar(r);}
 select('westlake');
 return {groups,roots,halo,select,terrain,stats:{backgroundBuildings:city.length,trees:trees.length,fields:fields.length}};
}
