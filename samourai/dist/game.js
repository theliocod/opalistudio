(()=>{var $l=0,vo=1,Kl=2;var ir=1,I0=2,hs=3,hi=0,Xe=1,cn=2,hn=0,us=1,In=2,Mo=3,So=4,Ql=5;var Ti=100,jl=101,tc=102,ec=103,nc=104,ic=200,sc=201,rc=202,ac=203,bo=204,Eo=205,oc=206,lc=207,cc=208,hc=209,uc=210,dc=211,fc=212,pc=213,mc=214,t0=0,e0=1,n0=2,ts=3,i0=4,s0=5,r0=6,a0=7,To=0,gc=1,_c=2,vn=0,sr=1,rr=2,ar=3,wi=4,or=5,lr=6,cr=7;var wo=300,ui=301,Ai=302,L0=303,D0=304,hr=306,es=1e3,Rn=1001,o0=1002,Ce=1003,xc=1004;var ur=1005;var Le=1006,N0=1007;var di=1008;var je=1009,Ao=1010,Ro=1011,ds=1012,U0=1013,Mn=1014,Sn=1015,Ue=1016,F0=1017,O0=1018,fs=1020,Co=35902,Po=35899,Io=1021,Lo=1022,un=1023,Cn=1026,fi=1027,Do=1028,B0=1029,pi=1030,z0=1031;var k0=1033,dr=33776,fr=33777,pr=33778,mr=33779,V0=35840,H0=35841,G0=35842,W0=35843,q0=36196,X0=37492,Y0=37496,Z0=37488,J0=37489,gr=37490,$0=37491,K0=37808,Q0=37809,j0=37810,ta=37811,ea=37812,na=37813,ia=37814,sa=37815,ra=37816,aa=37817,oa=37818,la=37819,ca=37820,ha=37821,ua=36492,da=36494,fa=36495,pa=36283,ma=36284,_r=36285,ga=36286;var Ls=2300,l0=2301,Qr=2302,ho=2303,uo=2400,fo=2401,po=2402;var yc=3200;var _a=0,vc=1,Gn="",We="srgb",Ds="srgb-linear",Ns="linear",Jt="srgb";var jr=7680;var Mc=519,Sc=512,bc=513,Ec=514,xa=515,Tc=516,wc=517,ya=518,Ac=519,Rc=35044;var No="300 es",xn=2e3,ns=2001;function zh(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function kh(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Us(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Cc(){let i=Us("canvas");return i.style.display="block",i}var Al={},is=null;function Uo(...i){let t="THREE."+i.shift();is?is("log",t,...i):console.log(t,...i)}function Pc(i){let t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function It(...i){i=Pc(i);let t="THREE."+i.shift();if(is)is("warn",t,...i);else{let e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function Lt(...i){i=Pc(i);let t="THREE."+i.shift();if(is)is("error",t,...i);else{let e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function Mi(...i){let t=i.join(" ");t in Al||(Al[t]=!0,It(...i))}function Ic(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}var Lc={[t0]:e0,[n0]:r0,[i0]:a0,[ts]:s0,[e0]:t0,[r0]:n0,[a0]:i0,[s0]:ts},Pn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){let n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){let n=this._listeners;if(n===void 0)return;let s=n[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let n=e[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},ze=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Va=Math.PI/180,c0=180/Math.PI;function xr(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ze[i&255]+ze[i>>8&255]+ze[i>>16&255]+ze[i>>24&255]+"-"+ze[t&255]+ze[t>>8&255]+"-"+ze[t>>16&15|64]+ze[t>>24&255]+"-"+ze[e&63|128]+ze[e>>8&255]+"-"+ze[e>>16&255]+ze[e>>24&255]+ze[n&255]+ze[n>>8&255]+ze[n>>16&255]+ze[n>>24&255]).toLowerCase()}function qt(i,t,e){return Math.max(t,Math.min(e,i))}function Vh(i,t){return(i%t+t)%t}function Ha(i,t,e){return(1-e)*i+e*t}function As(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:case Uint8ClampedArray:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function $e(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var ko=class ko{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=qt(this.x,t.x,e.x),this.y=qt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=qt(this.x,t,e),this.y=qt(this.y,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(qt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};ko.prototype.isVector2=!0;var At=ko,Ke=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],p=n[s+3],u=r[a+0],m=r[a+1],x=r[a+2],b=r[a+3];if(p!==b||l!==u||c!==m||h!==x){let f=l*u+c*m+h*x+p*b;f<0&&(u=-u,m=-m,x=-x,b=-b,f=-f);let d=1-o;if(f<.9995){let M=Math.acos(f),C=Math.sin(M);d=Math.sin(d*M)/C,o=Math.sin(o*M)/C,l=l*d+u*o,c=c*d+m*o,h=h*d+x*o,p=p*d+b*o}else{l=l*d+u*o,c=c*d+m*o,h=h*d+x*o,p=p*d+b*o;let M=1/Math.sqrt(l*l+c*c+h*h+p*p);l*=M,c*=M,h*=M,p*=M}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=p}static multiplyQuaternionsFlat(t,e,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],p=r[a],u=r[a+1],m=r[a+2],x=r[a+3];return t[e]=o*x+h*p+l*m-c*u,t[e+1]=l*x+h*u+c*p-o*m,t[e+2]=c*x+h*m+o*u-l*p,t[e+3]=h*x-o*p-l*u-c*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),p=o(r/2),u=l(n/2),m=l(s/2),x=l(r/2);switch(a){case"XYZ":this._x=u*h*p+c*m*x,this._y=c*m*p-u*h*x,this._z=c*h*x+u*m*p,this._w=c*h*p-u*m*x;break;case"YXZ":this._x=u*h*p+c*m*x,this._y=c*m*p-u*h*x,this._z=c*h*x-u*m*p,this._w=c*h*p+u*m*x;break;case"ZXY":this._x=u*h*p-c*m*x,this._y=c*m*p+u*h*x,this._z=c*h*x+u*m*p,this._w=c*h*p-u*m*x;break;case"ZYX":this._x=u*h*p-c*m*x,this._y=c*m*p+u*h*x,this._z=c*h*x-u*m*p,this._w=c*h*p+u*m*x;break;case"YZX":this._x=u*h*p+c*m*x,this._y=c*m*p+u*h*x,this._z=c*h*x-u*m*p,this._w=c*h*p-u*m*x;break;case"XZY":this._x=u*h*p-c*m*x,this._y=c*m*p-u*h*x,this._z=c*h*x+u*m*p,this._w=c*h*p+u*m*x;break;default:It("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],p=e[10],u=n+o+p;if(u>0){let m=.5/Math.sqrt(u+1);this._w=.25/m,this._x=(h-l)*m,this._y=(r-c)*m,this._z=(a-s)*m}else if(n>o&&n>p){let m=2*Math.sqrt(1+n-o-p);this._w=(h-l)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+c)/m}else if(o>p){let m=2*Math.sqrt(1+o-n-p);this._w=(r-c)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(l+h)/m}else{let m=2*Math.sqrt(1+p-n-o);this._w=(a-s)/m,this._x=(r+c)/m,this._y=(l+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(qt(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Vo=class Vo{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Rl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Rl.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),h=2*(o*e-r*s),p=2*(r*n-a*e);return this.x=e+l*c+a*p-o*h,this.y=n+l*h+o*c-r*p,this.z=s+l*p+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=qt(this.x,t.x,e.x),this.y=qt(this.y,t.y,e.y),this.z=qt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=qt(this.x,t,e),this.y=qt(this.y,t,e),this.z=qt(this.z,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ga.copy(this).projectOnVector(t),this.sub(Ga)}reflect(t){return this.sub(Ga.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(qt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Vo.prototype.isVector3=!0;var L=Vo,Ga=new L,Rl=new Ke,Ho=class Ho{constructor(t,e,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],p=n[7],u=n[2],m=n[5],x=n[8],b=s[0],f=s[3],d=s[6],M=s[1],C=s[4],v=s[7],E=s[2],T=s[5],R=s[8];return r[0]=a*b+o*M+l*E,r[3]=a*f+o*C+l*T,r[6]=a*d+o*v+l*R,r[1]=c*b+h*M+p*E,r[4]=c*f+h*C+p*T,r[7]=c*d+h*v+p*R,r[2]=u*b+m*M+x*E,r[5]=u*f+m*C+x*T,r[8]=u*d+m*v+x*R,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],p=h*a-o*c,u=o*l-h*r,m=c*r-a*l,x=e*p+n*u+s*m;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);let b=1/x;return t[0]=p*b,t[1]=(s*c-h*n)*b,t[2]=(o*n-s*a)*b,t[3]=u*b,t[4]=(h*e-s*l)*b,t[5]=(s*r-o*e)*b,t[6]=m*b,t[7]=(n*l-c*e)*b,t[8]=(a*e-n*r)*b,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return Mi("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Wa.makeScale(t,e)),this}rotate(t){return Mi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Wa.makeRotation(-t)),this}translate(t,e){return Mi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Wa.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Ho.prototype.isMatrix3=!0;var Nt=Ho,Wa=new Nt,Cl=new Nt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Pl=new Nt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Hh(){let i={enabled:!0,workingColorSpace:Ds,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Jt&&(s.r=Vn(s.r),s.g=Vn(s.g),s.b=Vn(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Jt&&(s.r=ji(s.r),s.g=ji(s.g),s.b=ji(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Gn?Ns:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Mi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Mi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ds]:{primaries:t,whitePoint:n,transfer:Ns,toXYZ:Cl,fromXYZ:Pl,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:We},outputColorSpaceConfig:{drawingBufferColorSpace:We}},[We]:{primaries:t,whitePoint:n,transfer:Jt,toXYZ:Cl,fromXYZ:Pl,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:We}}}),i}var kt=Hh();function Vn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ji(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var ki,h0=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{ki===void 0&&(ki=Us("canvas")),ki.width=t.width,ki.height=t.height;let s=ki.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=ki}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Us("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Vn(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Vn(e[n]/255)*255):e[n]=Vn(e[n]);return{data:e,width:t.width,height:t.height}}else return It("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Gh=0,ss=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Gh++}),this.uuid=xr(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(qa(s[a].image)):r.push(qa(s[a]))}else r=qa(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function qa(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?h0.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(It("Texture: Unable to serialize Texture."),{})}var Wh=0,Xa=new L,qe=class i extends Pn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Rn,s=Rn,r=Le,a=di,o=un,l=je,c=i.DEFAULT_ANISOTROPY,h=Gn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Wh++}),this.uuid=xr(),this.name="",this.source=new ss(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new At(0,0),this.repeat=new At(1,1),this.center=new At(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Nt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Xa).x}get height(){return this.source.getSize(Xa).y}get depth(){return this.source.getSize(Xa).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let n=t[e];if(n===void 0){It(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){It(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==wo)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case es:t.x=t.x-Math.floor(t.x);break;case Rn:t.x=t.x<0?0:1;break;case o0:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case es:t.y=t.y-Math.floor(t.y);break;case Rn:t.y=t.y<0?0:1;break;case o0:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};qe.DEFAULT_IMAGE=null;qe.DEFAULT_MAPPING=wo;qe.DEFAULT_ANISOTROPY=1;var Go=class Go{constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,l=t.elements,c=l[0],h=l[4],p=l[8],u=l[1],m=l[5],x=l[9],b=l[2],f=l[6],d=l[10];if(Math.abs(h-u)<.01&&Math.abs(p-b)<.01&&Math.abs(x-f)<.01){if(Math.abs(h+u)<.1&&Math.abs(p+b)<.1&&Math.abs(x+f)<.1&&Math.abs(c+m+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let C=(c+1)/2,v=(m+1)/2,E=(d+1)/2,T=(h+u)/4,R=(p+b)/4,_=(x+f)/4;return C>v&&C>E?C<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(C),s=T/n,r=R/n):v>E?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=T/s,r=_/s):E<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(E),n=R/r,s=_/r),this.set(n,s,r,e),this}let M=Math.sqrt((f-x)*(f-x)+(p-b)*(p-b)+(u-h)*(u-h));return Math.abs(M)<.001&&(M=1),this.x=(f-x)/M,this.y=(p-b)/M,this.z=(u-h)/M,this.w=Math.acos((c+m+d-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=qt(this.x,t.x,e.x),this.y=qt(this.y,t.y,e.y),this.z=qt(this.z,t.z,e.z),this.w=qt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=qt(this.x,t,e),this.y=qt(this.y,t,e),this.z=qt(this.z,t,e),this.w=qt(this.w,t,e),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Go.prototype.isVector4=!0;var de=Go,u0=class extends Pn{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Le,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new de(0,0,t,e),this.scissorTest=!1,this.viewport=new de(0,0,t,e),this.textures=[];let s={width:t,height:e,depth:n.depth},r=new qe(s),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:Le,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new ss(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Me=class extends u0{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Fs=class extends qe{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ce,this.minFilter=Ce,this.wrapR=Rn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var d0=class extends qe{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ce,this.minFilter=Ce,this.wrapR=Rn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var P0=class P0{constructor(t,e,n,s,r,a,o,l,c,h,p,u,m,x,b,f){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,h,p,u,m,x,b,f)}set(t,e,n,s,r,a,o,l,c,h,p,u,m,x,b,f){let d=this.elements;return d[0]=t,d[4]=e,d[8]=n,d[12]=s,d[1]=r,d[5]=a,d[9]=o,d[13]=l,d[2]=c,d[6]=h,d[10]=p,d[14]=u,d[3]=m,d[7]=x,d[11]=b,d[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new P0().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,n=t.elements,s=1/Vi.setFromMatrixColumn(t,0).length(),r=1/Vi.setFromMatrixColumn(t,1).length(),a=1/Vi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),p=Math.sin(r);if(t.order==="XYZ"){let u=a*h,m=a*p,x=o*h,b=o*p;e[0]=l*h,e[4]=-l*p,e[8]=c,e[1]=m+x*c,e[5]=u-b*c,e[9]=-o*l,e[2]=b-u*c,e[6]=x+m*c,e[10]=a*l}else if(t.order==="YXZ"){let u=l*h,m=l*p,x=c*h,b=c*p;e[0]=u+b*o,e[4]=x*o-m,e[8]=a*c,e[1]=a*p,e[5]=a*h,e[9]=-o,e[2]=m*o-x,e[6]=b+u*o,e[10]=a*l}else if(t.order==="ZXY"){let u=l*h,m=l*p,x=c*h,b=c*p;e[0]=u-b*o,e[4]=-a*p,e[8]=x+m*o,e[1]=m+x*o,e[5]=a*h,e[9]=b-u*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let u=a*h,m=a*p,x=o*h,b=o*p;e[0]=l*h,e[4]=x*c-m,e[8]=u*c+b,e[1]=l*p,e[5]=b*c+u,e[9]=m*c-x,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let u=a*l,m=a*c,x=o*l,b=o*c;e[0]=l*h,e[4]=b-u*p,e[8]=x*p+m,e[1]=p,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=m*p+x,e[10]=u-b*p}else if(t.order==="XZY"){let u=a*l,m=a*c,x=o*l,b=o*c;e[0]=l*h,e[4]=-p,e[8]=c*h,e[1]=u*p+b,e[5]=a*h,e[9]=m*p-x,e[2]=x*p-m,e[6]=o*h,e[10]=b*p+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(qh,t,Xh)}lookAt(t,e,n){let s=this.elements;return en.subVectors(t,e),en.lengthSq()===0&&(en.z=1),en.normalize(),$n.crossVectors(n,en),$n.lengthSq()===0&&(Math.abs(n.z)===1?en.x+=1e-4:en.z+=1e-4,en.normalize(),$n.crossVectors(n,en)),$n.normalize(),Ir.crossVectors(en,$n),s[0]=$n.x,s[4]=Ir.x,s[8]=en.x,s[1]=$n.y,s[5]=Ir.y,s[9]=en.y,s[2]=$n.z,s[6]=Ir.z,s[10]=en.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],p=n[5],u=n[9],m=n[13],x=n[2],b=n[6],f=n[10],d=n[14],M=n[3],C=n[7],v=n[11],E=n[15],T=s[0],R=s[4],_=s[8],S=s[12],A=s[1],P=s[5],U=s[9],B=s[13],D=s[2],H=s[6],Z=s[10],J=s[14],nt=s[3],q=s[7],j=s[11],et=s[15];return r[0]=a*T+o*A+l*D+c*nt,r[4]=a*R+o*P+l*H+c*q,r[8]=a*_+o*U+l*Z+c*j,r[12]=a*S+o*B+l*J+c*et,r[1]=h*T+p*A+u*D+m*nt,r[5]=h*R+p*P+u*H+m*q,r[9]=h*_+p*U+u*Z+m*j,r[13]=h*S+p*B+u*J+m*et,r[2]=x*T+b*A+f*D+d*nt,r[6]=x*R+b*P+f*H+d*q,r[10]=x*_+b*U+f*Z+d*j,r[14]=x*S+b*B+f*J+d*et,r[3]=M*T+C*A+v*D+E*nt,r[7]=M*R+C*P+v*H+E*q,r[11]=M*_+C*U+v*Z+E*j,r[15]=M*S+C*B+v*J+E*et,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],p=t[6],u=t[10],m=t[14],x=t[3],b=t[7],f=t[11],d=t[15],M=l*m-c*u,C=o*m-c*p,v=o*u-l*p,E=a*m-c*h,T=a*u-l*h,R=a*p-o*h;return e*(b*M-f*C+d*v)-n*(x*M-f*E+d*T)+s*(x*C-b*E+d*R)-r*(x*v-b*T+f*R)}determinantAffine(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],h=t[10];return e*(a*h-o*c)-n*(r*h-o*l)+s*(r*c-a*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],p=t[9],u=t[10],m=t[11],x=t[12],b=t[13],f=t[14],d=t[15],M=e*o-n*a,C=e*l-s*a,v=e*c-r*a,E=n*l-s*o,T=n*c-r*o,R=s*c-r*l,_=h*b-p*x,S=h*f-u*x,A=h*d-m*x,P=p*f-u*b,U=p*d-m*b,B=u*d-m*f,D=M*B-C*U+v*P+E*A-T*S+R*_;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let H=1/D;return t[0]=(o*B-l*U+c*P)*H,t[1]=(s*U-n*B-r*P)*H,t[2]=(b*R-f*T+d*E)*H,t[3]=(u*T-p*R-m*E)*H,t[4]=(l*A-a*B-c*S)*H,t[5]=(e*B-s*A+r*S)*H,t[6]=(f*v-x*R-d*C)*H,t[7]=(h*R-u*v+m*C)*H,t[8]=(a*U-o*A+c*_)*H,t[9]=(n*A-e*U-r*_)*H,t[10]=(x*T-b*v+d*M)*H,t[11]=(p*v-h*T-m*M)*H,t[12]=(o*S-a*P-l*_)*H,t[13]=(e*P-n*S+s*_)*H,t[14]=(b*C-x*E-f*M)*H,t[15]=(h*E-p*C+u*M)*H,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,p=o+o,u=r*c,m=r*h,x=r*p,b=a*h,f=a*p,d=o*p,M=l*c,C=l*h,v=l*p,E=n.x,T=n.y,R=n.z;return s[0]=(1-(b+d))*E,s[1]=(m+v)*E,s[2]=(x-C)*E,s[3]=0,s[4]=(m-v)*T,s[5]=(1-(u+d))*T,s[6]=(f+M)*T,s[7]=0,s[8]=(x+C)*R,s[9]=(f-M)*R,s[10]=(1-(u+b))*R,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=Vi.set(s[0],s[1],s[2]).length(),o=Vi.set(s[4],s[5],s[6]).length(),l=Vi.set(s[8],s[9],s[10]).length();r<0&&(a=-a),pn.copy(this);let c=1/a,h=1/o,p=1/l;return pn.elements[0]*=c,pn.elements[1]*=c,pn.elements[2]*=c,pn.elements[4]*=h,pn.elements[5]*=h,pn.elements[6]*=h,pn.elements[8]*=p,pn.elements[9]*=p,pn.elements[10]*=p,e.setFromRotationMatrix(pn),n.x=a,n.y=o,n.z=l,this}makePerspective(t,e,n,s,r,a,o=xn,l=!1){let c=this.elements,h=2*r/(e-t),p=2*r/(n-s),u=(e+t)/(e-t),m=(n+s)/(n-s),x,b;if(l)x=r/(a-r),b=a*r/(a-r);else if(o===xn)x=-(a+r)/(a-r),b=-2*a*r/(a-r);else if(o===ns)x=-a/(a-r),b=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=p,c[9]=m,c[13]=0,c[2]=0,c[6]=0,c[10]=x,c[14]=b,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=xn,l=!1){let c=this.elements,h=2/(e-t),p=2/(n-s),u=-(e+t)/(e-t),m=-(n+s)/(n-s),x,b;if(l)x=1/(a-r),b=a/(a-r);else if(o===xn)x=-2/(a-r),b=-(a+r)/(a-r);else if(o===ns)x=-1/(a-r),b=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=p,c[9]=0,c[13]=m,c[2]=0,c[6]=0,c[10]=x,c[14]=b,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};P0.prototype.isMatrix4=!0;var ue=P0,Vi=new L,pn=new ue,qh=new L(0,0,0),Xh=new L(1,1,1),$n=new L,Ir=new L,en=new L,Il=new ue,Ll=new Ke,yn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],p=s[2],u=s[6],m=s[10];switch(e){case"XYZ":this._y=Math.asin(qt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-qt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-p,r),this._z=0);break;case"ZXY":this._x=Math.asin(qt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-p,m),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-qt(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(u,m),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(qt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-p,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-qt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,m),this._y=0);break;default:It("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Il.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Il,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ll.setFromEuler(this),this.setFromQuaternion(Ll,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};yn.DEFAULT_ORDER="XYZ";var Os=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Yh=0,Dl=new L,Hi=new Ke,Fn=new ue,Lr=new L,Rs=new L,Zh=new L,Jh=new Ke,Nl=new L(1,0,0),Ul=new L(0,1,0),Fl=new L(0,0,1),Ol={type:"added"},$h={type:"removed"},Gi={type:"childadded",child:null},Ya={type:"childremoved",child:null},Se=class i extends Pn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Yh++}),this.uuid=xr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new L,e=new yn,n=new Ke,s=new L(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ue},normalMatrix:{value:new Nt}}),this.matrix=new ue,this.matrixWorld=new ue,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Os,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Hi.setFromAxisAngle(t,e),this.quaternion.multiply(Hi),this}rotateOnWorldAxis(t,e){return Hi.setFromAxisAngle(t,e),this.quaternion.premultiply(Hi),this}rotateX(t){return this.rotateOnAxis(Nl,t)}rotateY(t){return this.rotateOnAxis(Ul,t)}rotateZ(t){return this.rotateOnAxis(Fl,t)}translateOnAxis(t,e){return Dl.copy(t).applyQuaternion(this.quaternion),this.position.add(Dl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Nl,t)}translateY(t){return this.translateOnAxis(Ul,t)}translateZ(t){return this.translateOnAxis(Fl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Fn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Lr.copy(t):Lr.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Rs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Fn.lookAt(Rs,Lr,this.up):Fn.lookAt(Lr,Rs,this.up),this.quaternion.setFromRotationMatrix(Fn),s&&(Fn.extractRotation(s.matrixWorld),Hi.setFromRotationMatrix(Fn),this.quaternion.premultiply(Hi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Lt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ol),Gi.child=t,this.dispatchEvent(Gi),Gi.child=null):Lt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent($h),Ya.child=t,this.dispatchEvent(Ya),Ya.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Fn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Fn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Fn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ol),Gi.child=t,this.dispatchEvent(Gi),Gi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Rs,t,Zh),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Rs,Jh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let p=l[c];r(t.shapes,p)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),p=a(t.shapes),u=a(t.skeletons),m=a(t.animations),x=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),p.length>0&&(n.shapes=p),u.length>0&&(n.skeletons=u),m.length>0&&(n.animations=m),x.length>0&&(n.nodes=x)}return n.object=s,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Se.DEFAULT_UP=new L(0,1,0);Se.DEFAULT_MATRIX_AUTO_UPDATE=!0;Se.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var ce=class extends Se{constructor(){super(),this.isGroup=!0,this.type="Group"}},Kh={type:"move"},rs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ce,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ce,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ce,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let b of t.hand.values()){let f=e.getJointPose(b,n),d=this._getHandJoint(c,b);f!==null&&(d.matrix.fromArray(f.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=f.radius),d.visible=f!==null}let h=c.joints["index-finger-tip"],p=c.joints["thumb-tip"],u=h.position.distanceTo(p.position),m=.02,x=.005;c.inputState.pinching&&u>m+x?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=m-x&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Kh)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new ce;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},Dc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Kn={h:0,s:0,l:0},Dr={h:0,s:0,l:0};function Za(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Ct=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=We){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,kt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=kt.workingColorSpace){return this.r=t,this.g=e,this.b=n,kt.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=kt.workingColorSpace){if(t=Vh(t,1),e=qt(e,0,1),n=qt(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Za(a,r,t+1/3),this.g=Za(a,r,t),this.b=Za(a,r,t-1/3)}return kt.colorSpaceToWorking(this,s),this}setStyle(t,e=We){function n(r){r!==void 0&&parseFloat(r)<1&&It("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:It("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);It("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=We){let n=Dc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):It("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Vn(t.r),this.g=Vn(t.g),this.b=Vn(t.b),this}copyLinearToSRGB(t){return this.r=ji(t.r),this.g=ji(t.g),this.b=ji(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=We){return kt.workingToColorSpace(ke.copy(this),t),Math.round(qt(ke.r*255,0,255))*65536+Math.round(qt(ke.g*255,0,255))*256+Math.round(qt(ke.b*255,0,255))}getHexString(t=We){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=kt.workingColorSpace){kt.workingToColorSpace(ke.copy(this),e);let n=ke.r,s=ke.g,r=ke.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let p=a-o;switch(c=h<=.5?p/(a+o):p/(2-a-o),a){case n:l=(s-r)/p+(s<r?6:0);break;case s:l=(r-n)/p+2;break;case r:l=(n-s)/p+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=kt.workingColorSpace){return kt.workingToColorSpace(ke.copy(this),e),t.r=ke.r,t.g=ke.g,t.b=ke.b,t}getStyle(t=We){kt.workingToColorSpace(ke.copy(this),t);let e=ke.r,n=ke.g,s=ke.b;return t!==We?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Kn),this.setHSL(Kn.h+t,Kn.s+e,Kn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Kn),t.getHSL(Dr);let n=Ha(Kn.h,Dr.h,e),s=Ha(Kn.s,Dr.s,e),r=Ha(Kn.l,Dr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},ke=new Ct;Ct.NAMES=Dc;var Bs=class i{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ct(t),this.density=e}clone(){return new i(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var zs=class extends Se{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new yn,this.environmentIntensity=1,this.environmentRotation=new yn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},mn=new L,On=new L,Ja=new L,Bn=new L,Wi=new L,qi=new L,Bl=new L,$a=new L,Ka=new L,Qa=new L,ja=new de,to=new de,eo=new de,ei=class i{constructor(t=new L,e=new L,n=new L){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),mn.subVectors(t,e),s.cross(mn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){mn.subVectors(s,e),On.subVectors(n,e),Ja.subVectors(t,e);let a=mn.dot(mn),o=mn.dot(On),l=mn.dot(Ja),c=On.dot(On),h=On.dot(Ja),p=a*c-o*o;if(p===0)return r.set(0,0,0),null;let u=1/p,m=(c*l-o*h)*u,x=(a*h-o*l)*u;return r.set(1-m-x,x,m)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Bn)===null?!1:Bn.x>=0&&Bn.y>=0&&Bn.x+Bn.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,Bn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Bn.x),l.addScaledVector(a,Bn.y),l.addScaledVector(o,Bn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return ja.setScalar(0),to.setScalar(0),eo.setScalar(0),ja.fromBufferAttribute(t,e),to.fromBufferAttribute(t,n),eo.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(ja,r.x),a.addScaledVector(to,r.y),a.addScaledVector(eo,r.z),a}static isFrontFacing(t,e,n,s){return mn.subVectors(n,e),On.subVectors(t,e),mn.cross(On).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return mn.subVectors(this.c,this.b),On.subVectors(this.a,this.b),mn.cross(On).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,a,o;Wi.subVectors(s,n),qi.subVectors(r,n),$a.subVectors(t,n);let l=Wi.dot($a),c=qi.dot($a);if(l<=0&&c<=0)return e.copy(n);Ka.subVectors(t,s);let h=Wi.dot(Ka),p=qi.dot(Ka);if(h>=0&&p<=h)return e.copy(s);let u=l*p-h*c;if(u<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(n).addScaledVector(Wi,a);Qa.subVectors(t,r);let m=Wi.dot(Qa),x=qi.dot(Qa);if(x>=0&&m<=x)return e.copy(r);let b=m*c-l*x;if(b<=0&&c>=0&&x<=0)return o=c/(c-x),e.copy(n).addScaledVector(qi,o);let f=h*x-m*p;if(f<=0&&p-h>=0&&m-x>=0)return Bl.subVectors(r,s),o=(p-h)/(p-h+(m-x)),e.copy(s).addScaledVector(Bl,o);let d=1/(f+b+u);return a=b*d,o=u*d,e.copy(n).addScaledVector(Wi,a).addScaledVector(qi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},ni=class{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(gn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(gn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=gn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,gn):gn.fromBufferAttribute(r,a),gn.applyMatrix4(t.matrixWorld),this.expandByPoint(gn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Nr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Nr.copy(n.boundingBox)),Nr.applyMatrix4(t.matrixWorld),this.union(Nr)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,gn),gn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Cs),Ur.subVectors(this.max,Cs),Xi.subVectors(t.a,Cs),Yi.subVectors(t.b,Cs),Zi.subVectors(t.c,Cs),Qn.subVectors(Yi,Xi),jn.subVectors(Zi,Yi),_i.subVectors(Xi,Zi);let e=[0,-Qn.z,Qn.y,0,-jn.z,jn.y,0,-_i.z,_i.y,Qn.z,0,-Qn.x,jn.z,0,-jn.x,_i.z,0,-_i.x,-Qn.y,Qn.x,0,-jn.y,jn.x,0,-_i.y,_i.x,0];return!no(e,Xi,Yi,Zi,Ur)||(e=[1,0,0,0,1,0,0,0,1],!no(e,Xi,Yi,Zi,Ur))?!1:(Fr.crossVectors(Qn,jn),e=[Fr.x,Fr.y,Fr.z],no(e,Xi,Yi,Zi,Ur))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,gn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(gn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(zn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),zn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),zn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),zn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),zn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),zn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),zn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),zn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(zn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},zn=[new L,new L,new L,new L,new L,new L,new L,new L],gn=new L,Nr=new ni,Xi=new L,Yi=new L,Zi=new L,Qn=new L,jn=new L,_i=new L,Cs=new L,Ur=new L,Fr=new L,xi=new L;function no(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){xi.fromArray(i,r);let o=s.x*Math.abs(xi.x)+s.y*Math.abs(xi.y)+s.z*Math.abs(xi.z),l=t.dot(xi),c=e.dot(xi),h=n.dot(xi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var ve=new L,Or=new At,Qh=0,Ee=class extends Pn{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Qh++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Rc,this.updateRanges=[],this.gpuType=Sn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Or.fromBufferAttribute(this,e),Or.applyMatrix3(t),this.setXY(e,Or.x,Or.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix3(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix4(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyNormalMatrix(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.transformDirection(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=As(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=$e(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=As(e,this.array)),e}setX(t,e){return this.normalized&&(e=$e(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=As(e,this.array)),e}setY(t,e){return this.normalized&&(e=$e(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=As(e,this.array)),e}setZ(t,e){return this.normalized&&(e=$e(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=As(e,this.array)),e}setW(t,e){return this.normalized&&(e=$e(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=$e(e,this.array),n=$e(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=$e(e,this.array),n=$e(n,this.array),s=$e(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=$e(e,this.array),n=$e(n,this.array),s=$e(s,this.array),r=$e(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}};var ks=class extends Ee{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Vs=class extends Ee{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var jt=class extends Ee{constructor(t,e,n){super(new Float32Array(t),e,n)}},jh=new ni,Ps=new L,io=new L,Si=class{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):jh.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ps.subVectors(t,this.center);let e=Ps.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Ps,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(io.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ps.copy(t.center).add(io)),this.expandByPoint(Ps.copy(t.center).sub(io))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},tu=0,on=new ue,so=new Se,Ji=new L,nn=new ni,Is=new ni,Re=new L,pe=class i extends Pn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:tu++}),this.uuid=xr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(zh(t)?Vs:ks)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Nt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return on.makeRotationFromQuaternion(t),this.applyMatrix4(on),this}rotateX(t){return on.makeRotationX(t),this.applyMatrix4(on),this}rotateY(t){return on.makeRotationY(t),this.applyMatrix4(on),this}rotateZ(t){return on.makeRotationZ(t),this.applyMatrix4(on),this}translate(t,e,n){return on.makeTranslation(t,e,n),this.applyMatrix4(on),this}scale(t,e,n){return on.makeScale(t,e,n),this.applyMatrix4(on),this}lookAt(t){return so.lookAt(t),so.updateMatrix(),this.applyMatrix4(so.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ji).negate(),this.translate(Ji.x,Ji.y,Ji.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new jt(n,3))}else{let n=Math.min(t.length,e.count);for(let s=0;s<n;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&It("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ni);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Lt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];nn.setFromBufferAttribute(r),this.morphTargetsRelative?(Re.addVectors(this.boundingBox.min,nn.min),this.boundingBox.expandByPoint(Re),Re.addVectors(this.boundingBox.max,nn.max),this.boundingBox.expandByPoint(Re)):(this.boundingBox.expandByPoint(nn.min),this.boundingBox.expandByPoint(nn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Lt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Si);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Lt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(t){let n=this.boundingSphere.center;if(nn.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];Is.setFromBufferAttribute(o),this.morphTargetsRelative?(Re.addVectors(nn.min,Is.min),nn.expandByPoint(Re),Re.addVectors(nn.max,Is.max),nn.expandByPoint(Re)):(nn.expandByPoint(Is.min),nn.expandByPoint(Is.max))}nn.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Re.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Re));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Re.fromBufferAttribute(o,c),l&&(Ji.fromBufferAttribute(t,c),Re.add(Ji)),s=Math.max(s,n.distanceToSquared(Re))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Lt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Lt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Ee(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let _=0;_<n.count;_++)o[_]=new L,l[_]=new L;let c=new L,h=new L,p=new L,u=new At,m=new At,x=new At,b=new L,f=new L;function d(_,S,A){c.fromBufferAttribute(n,_),h.fromBufferAttribute(n,S),p.fromBufferAttribute(n,A),u.fromBufferAttribute(r,_),m.fromBufferAttribute(r,S),x.fromBufferAttribute(r,A),h.sub(c),p.sub(c),m.sub(u),x.sub(u);let P=1/(m.x*x.y-x.x*m.y);isFinite(P)&&(b.copy(h).multiplyScalar(x.y).addScaledVector(p,-m.y).multiplyScalar(P),f.copy(p).multiplyScalar(m.x).addScaledVector(h,-x.x).multiplyScalar(P),o[_].add(b),o[S].add(b),o[A].add(b),l[_].add(f),l[S].add(f),l[A].add(f))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let _=0,S=M.length;_<S;++_){let A=M[_],P=A.start,U=A.count;for(let B=P,D=P+U;B<D;B+=3)d(t.getX(B+0),t.getX(B+1),t.getX(B+2))}let C=new L,v=new L,E=new L,T=new L;function R(_){E.fromBufferAttribute(s,_),T.copy(E);let S=o[_];C.copy(S),C.sub(E.multiplyScalar(E.dot(S))).normalize(),v.crossVectors(T,S);let P=v.dot(l[_])<0?-1:1;a.setXYZW(_,C.x,C.y,C.z,P)}for(let _=0,S=M.length;_<S;++_){let A=M[_],P=A.start,U=A.count;for(let B=P,D=P+U;B<D;B+=3)R(t.getX(B+0)),R(t.getX(B+1)),R(t.getX(B+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new Ee(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,m=n.count;u<m;u++)n.setXYZ(u,0,0,0);let s=new L,r=new L,a=new L,o=new L,l=new L,c=new L,h=new L,p=new L;if(t)for(let u=0,m=t.count;u<m;u+=3){let x=t.getX(u+0),b=t.getX(u+1),f=t.getX(u+2);s.fromBufferAttribute(e,x),r.fromBufferAttribute(e,b),a.fromBufferAttribute(e,f),h.subVectors(a,r),p.subVectors(s,r),h.cross(p),o.fromBufferAttribute(n,x),l.fromBufferAttribute(n,b),c.fromBufferAttribute(n,f),o.add(h),l.add(h),c.add(h),n.setXYZ(x,o.x,o.y,o.z),n.setXYZ(b,l.x,l.y,l.z),n.setXYZ(f,c.x,c.y,c.z)}else for(let u=0,m=e.count;u<m;u+=3)s.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,r),p.subVectors(s,r),h.cross(p),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Re.fromBufferAttribute(t,e),Re.normalize(),t.setXYZ(e,Re.x,Re.y,Re.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,p=o.normalized,u=new c.constructor(l.length*h),m=0,x=0;for(let b=0,f=l.length;b<f;b++){o.isInterleavedBufferAttribute?m=l[b]*o.data.stride+o.offset:m=l[b]*h;for(let d=0;d<h;d++)u[x++]=c[m++]}return new Ee(u,h,p)}if(this.index===null)return It("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,n);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,p=c.length;h<p;h++){let u=c[h],m=t(u,n);l.push(m)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let p=0,u=c.length;p<u;p++){let m=c[p];h.push(m.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone());let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],p=r[c];for(let u=0,m=p.length;u<m;u++)h.push(p[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let p=a[c];this.addGroup(p.start,p.count,p.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var ro=new L,eu=new L,nu=new Nt,_n=class{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=ro.subVectors(n,e).cross(eu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){let s=t.delta(ro),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||nu.getNormalMatrix(t),s=this.coplanarPoint(ro).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},iu=0,Hn=class extends Pn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:iu++}),this.uuid=xr(),this.name="",this.type="Material",this.blending=us,this.side=hi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=bo,this.blendDst=Eo,this.blendEquation=Ti,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ct(0,0,0),this.blendAlpha=0,this.depthFunc=ts,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Mc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=jr,this.stencilZFail=jr,this.stencilZPass=jr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){It(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){It(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Ct().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new _n().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new At().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new At().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var kn=new L,ao=new L,Br=new L,zr=new L,Hs=class{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,kn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=kn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(kn.copy(this.origin).addScaledVector(this.direction,e),kn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){ao.copy(t).add(e).multiplyScalar(.5),Br.copy(e).sub(t).normalize(),zr.copy(this.origin).sub(ao);let r=t.distanceTo(e)*.5,a=-this.direction.dot(Br),o=zr.dot(this.direction),l=-zr.dot(Br),c=zr.lengthSq(),h=Math.abs(1-a*a),p,u,m,x;if(h>0)if(p=a*l-o,u=a*o-l,x=r*h,p>=0)if(u>=-x)if(u<=x){let b=1/h;p*=b,u*=b,m=p*(p+a*u+2*o)+u*(a*p+u+2*l)+c}else u=r,p=Math.max(0,-(a*u+o)),m=-p*p+u*(u+2*l)+c;else u=-r,p=Math.max(0,-(a*u+o)),m=-p*p+u*(u+2*l)+c;else u<=-x?(p=Math.max(0,-(-a*r+o)),u=p>0?-r:Math.min(Math.max(-r,-l),r),m=-p*p+u*(u+2*l)+c):u<=x?(p=0,u=Math.min(Math.max(-r,-l),r),m=u*(u+2*l)+c):(p=Math.max(0,-(a*r+o)),u=p>0?r:Math.min(Math.max(-r,-l),r),m=-p*p+u*(u+2*l)+c);else u=a>0?-r:r,p=Math.max(0,-(a*u+o)),m=-p*p+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,p),s&&s.copy(ao).addScaledVector(Br,u),m}intersectSphere(t,e){if(t.radius<0)return null;kn.subVectors(t.center,this.origin);let n=kn.dot(this.direction),s=kn.dot(kn)-n*n,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,p=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),p>=0?(o=(t.min.z-u.z)*p,l=(t.max.z-u.z)*p):(o=(t.max.z-u.z)*p,l=(t.min.z-u.z)*p),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,kn)!==null}intersectTriangle(t,e,n,s,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,p=t.x-a.x,u=t.y-a.y,m=t.z-a.z,x=e.x-a.x,b=e.y-a.y,f=e.z-a.z,d=n.x-a.x,M=n.y-a.y,C=n.z-a.z,v=Math.abs(l),E=Math.abs(c),T=Math.abs(h),R,_,S,A,P,U,B,D,H,Z,J,nt;if(v>=E&&v>=T?(S=l,U=p,H=x,nt=d,l>=0?(R=c,_=h,A=u,P=m,B=b,D=f,Z=M,J=C):(R=h,_=c,A=m,P=u,B=f,D=b,Z=C,J=M)):E>=T?(S=c,U=u,H=b,nt=M,c>=0?(R=h,_=l,A=m,P=p,B=f,D=x,Z=C,J=d):(R=l,_=h,A=p,P=m,B=x,D=f,Z=d,J=C)):(S=h,U=m,H=f,nt=C,h>=0?(R=l,_=c,A=p,P=u,B=x,D=b,Z=d,J=M):(R=c,_=l,A=u,P=p,B=b,D=x,Z=M,J=d)),S===0)return null;let q=R/S,j=_/S,et=1/S,Rt=A-q*U,Tt=P-j*U,ie=B-q*H,Xt=D-j*H,$t=Z-q*nt,X=J-j*nt,Q=$t*Xt-X*ie,xt=Rt*X-Tt*$t,Ut=ie*Tt-Xt*Rt;if(s){if(Q<0||xt<0||Ut<0)return null}else if((Q<0||xt<0||Ut<0)&&(Q>0||xt>0||Ut>0))return null;let gt=Q+xt+Ut;if(gt===0)return null;let zt=et*(Q*U+xt*H+Ut*nt);return(gt>0?zt<0:zt>0)?null:this.at(zt/gt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Qe=class extends Hn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ct(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yn,this.combine=To,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},zl=new ue,yi=new Hs,kr=new Si,kl=new L,Vr=new L,Hr=new L,Gr=new L,oo=new L,Wr=new L,Vl=new L,qr=new L,Dt=class extends Se{constructor(t=new pe,e=new Qe){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){Wr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],p=r[l];h!==0&&(oo.fromBufferAttribute(p,t),a?Wr.addScaledVector(oo,h):Wr.addScaledVector(oo.sub(e),h))}e.add(Wr)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),kr.copy(n.boundingSphere),kr.applyMatrix4(r),yi.copy(t.ray).recast(t.near),!(kr.containsPoint(yi.origin)===!1&&(yi.intersectSphere(kr,kl)===null||yi.origin.distanceToSquared(kl)>(t.far-t.near)**2))&&(zl.copy(r).invert(),yi.copy(t.ray).applyMatrix4(zl),!(n.boundingBox!==null&&yi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,yi)))}_computeIntersections(t,e,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,p=r.attributes.normal,u=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let x=0,b=u.length;x<b;x++){let f=u[x],d=a[f.materialIndex],M=Math.max(f.start,m.start),C=Math.min(o.count,Math.min(f.start+f.count,m.start+m.count));for(let v=M,E=C;v<E;v+=3){let T=o.getX(v),R=o.getX(v+1),_=o.getX(v+2);s=Xr(this,d,t,n,c,h,p,T,R,_),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=f.materialIndex,e.push(s))}}else{let x=Math.max(0,m.start),b=Math.min(o.count,m.start+m.count);for(let f=x,d=b;f<d;f+=3){let M=o.getX(f),C=o.getX(f+1),v=o.getX(f+2);s=Xr(this,a,t,n,c,h,p,M,C,v),s&&(s.faceIndex=Math.floor(f/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let x=0,b=u.length;x<b;x++){let f=u[x],d=a[f.materialIndex],M=Math.max(f.start,m.start),C=Math.min(l.count,Math.min(f.start+f.count,m.start+m.count));for(let v=M,E=C;v<E;v+=3){let T=v,R=v+1,_=v+2;s=Xr(this,d,t,n,c,h,p,T,R,_),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=f.materialIndex,e.push(s))}}else{let x=Math.max(0,m.start),b=Math.min(l.count,m.start+m.count);for(let f=x,d=b;f<d;f+=3){let M=f,C=f+1,v=f+2;s=Xr(this,a,t,n,c,h,p,M,C,v),s&&(s.faceIndex=Math.floor(f/3),e.push(s))}}}};function su(i,t,e,n,s,r,a,o){let l;if(t.side===Xe?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===hi,o),l===null)return null;qr.copy(o),qr.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(qr);return c<e.near||c>e.far?null:{distance:c,point:qr.clone(),object:i}}function Xr(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,Vr),i.getVertexPosition(l,Hr),i.getVertexPosition(c,Gr);let h=su(i,t,e,n,Vr,Hr,Gr,Vl);if(h){let p=new L;ei.getBarycoord(Vl,Vr,Hr,Gr,p),s&&(h.uv=ei.getInterpolatedAttribute(s,o,l,c,p,new At)),r&&(h.uv1=ei.getInterpolatedAttribute(r,o,l,c,p,new At)),a&&(h.normal=ei.getInterpolatedAttribute(a,o,l,c,p,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new L,materialIndex:0};ei.getNormal(Vr,Hr,Gr,u.normal),h.face=u,h.barycoord=p}return h}var f0=class extends qe{constructor(t=null,e=1,n=1,s,r,a,o,l,c=Ce,h=Ce,p,u){super(null,a,o,l,c,h,s,r,p,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var vi=new Si,ru=new At(.5,.5),Yr=new L,as=class{constructor(t=new _n,e=new _n,n=new _n,s=new _n,r=new _n,a=new _n){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=xn,n=!1){let s=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],p=r[5],u=r[6],m=r[7],x=r[8],b=r[9],f=r[10],d=r[11],M=r[12],C=r[13],v=r[14],E=r[15];if(s[0].setComponents(c-a,m-h,d-x,E-M).normalize(),s[1].setComponents(c+a,m+h,d+x,E+M).normalize(),s[2].setComponents(c+o,m+p,d+b,E+C).normalize(),s[3].setComponents(c-o,m-p,d-b,E-C).normalize(),n)s[4].setComponents(l,u,f,v).normalize(),s[5].setComponents(c-l,m-u,d-f,E-v).normalize();else if(s[4].setComponents(c-l,m-u,d-f,E-v).normalize(),e===xn)s[5].setComponents(c+l,m+u,d+f,E+v).normalize();else if(e===ns)s[5].setComponents(l,u,f,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),vi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),vi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(vi)}intersectsSprite(t){vi.center.set(0,0,0);let e=ru.distanceTo(t.center);return vi.radius=.7071067811865476+e,vi.applyMatrix4(t.matrixWorld),this.intersectsSphere(vi)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(Yr.x=s.normal.x>0?t.max.x:t.min.x,Yr.y=s.normal.y>0?t.max.y:t.min.y,Yr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Yr)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var ii=class extends Hn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ct(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Hl=new ue,mo=new Hs,Zr=new Si,Jr=new L,bi=class extends Se{constructor(t=new pe,e=new ii){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Zr.copy(n.boundingSphere),Zr.applyMatrix4(s),Zr.radius+=r,t.ray.intersectsSphere(Zr)===!1)return;Hl.copy(s).invert(),mo.copy(t.ray).applyMatrix4(Hl);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,p=n.attributes.position;if(c!==null){let u=Math.max(0,a.start),m=Math.min(c.count,a.start+a.count);for(let x=u,b=m;x<b;x++){let f=c.getX(x);Jr.fromBufferAttribute(p,f),Gl(Jr,f,l,s,t,e,this)}}else{let u=Math.max(0,a.start),m=Math.min(p.count,a.start+a.count);for(let x=u,b=m;x<b;x++)Jr.fromBufferAttribute(p,x),Gl(Jr,x,l,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Gl(i,t,e,n,s,r,a){let o=mo.distanceSqToPoint(i);if(o<e){let l=new L;mo.closestPointToPoint(i,l),l.applyMatrix4(n);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}var Gs=class extends qe{constructor(t=[],e=ui,n,s,r,a,o,l,c,h){super(t,e,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},os=class extends qe{constructor(t,e,n,s,r,a,o,l,c){super(t,e,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var si=class extends qe{constructor(t,e,n=Mn,s,r,a,o=Ce,l=Ce,c,h=Cn,p=1){if(h!==Cn&&h!==fi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:e,depth:p};super(u,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new ss(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},p0=class extends si{constructor(t,e=Mn,n=ui,s,r,a=Ce,o=Ce,l,c=Cn){let h={width:t,height:t,depth:1},p=[h,h,h,h,h,h];super(t,t,e,n,s,r,a,o,l,c),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Ws=class extends qe{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Ve=class i extends pe{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],p=[],u=0,m=0;x("z","y","x",-1,-1,n,e,t,a,r,0),x("z","y","x",1,-1,n,e,-t,a,r,1),x("x","z","y",1,1,t,n,e,s,a,2),x("x","z","y",1,-1,t,n,-e,s,a,3),x("x","y","z",1,-1,t,e,n,s,r,4),x("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new jt(c,3)),this.setAttribute("normal",new jt(h,3)),this.setAttribute("uv",new jt(p,2));function x(b,f,d,M,C,v,E,T,R,_,S){let A=v/R,P=E/_,U=v/2,B=E/2,D=T/2,H=R+1,Z=_+1,J=0,nt=0,q=new L;for(let j=0;j<Z;j++){let et=j*P-B;for(let Rt=0;Rt<H;Rt++){let Tt=Rt*A-U;q[b]=Tt*M,q[f]=et*C,q[d]=D,c.push(q.x,q.y,q.z),q[b]=0,q[f]=0,q[d]=T>0?1:-1,h.push(q.x,q.y,q.z),p.push(Rt/R),p.push(1-j/_),J+=1}}for(let j=0;j<_;j++)for(let et=0;et<R;et++){let Rt=u+et+H*j,Tt=u+et+H*(j+1),ie=u+(et+1)+H*(j+1),Xt=u+(et+1)+H*j;l.push(Rt,Tt,Xt),l.push(Tt,ie,Xt),nt+=6}o.addGroup(m,nt,S),m+=nt,u+=J}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},qs=class i extends pe{constructor(t=1,e=1,n=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:e,capSegments:n,radialSegments:s,heightSegments:r},e=Math.max(0,e),n=Math.max(1,Math.floor(n)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));let a=[],o=[],l=[],c=[],h=e/2,p=Math.PI/2*t,u=e,m=2*p+u,x=n*2+r,b=s+1,f=new L,d=new L;for(let M=0;M<=x;M++){let C=0,v=0,E=0,T=0;if(M<=n){let S=M/n,A=S*Math.PI/2;v=-h-t*Math.cos(A),E=t*Math.sin(A),T=-t*Math.cos(A),C=S*p}else if(M<=n+r){let S=(M-n)/r;v=-h+S*e,E=t,T=0,C=p+S*u}else{let S=(M-n-r)/n,A=S*Math.PI/2;v=h+t*Math.sin(A),E=t*Math.cos(A),T=t*Math.sin(A),C=p+u+S*p}let R=Math.max(0,Math.min(1,C/m)),_=0;M===0?_=.5/s:M===x&&(_=-.5/s);for(let S=0;S<=s;S++){let A=S/s,P=A*Math.PI*2,U=Math.sin(P),B=Math.cos(P);d.x=-E*B,d.y=v,d.z=E*U,o.push(d.x,d.y,d.z),f.set(-E*B,T,E*U),f.normalize(),l.push(f.x,f.y,f.z),c.push(A+_,R)}if(M>0){let S=(M-1)*b;for(let A=0;A<s;A++){let P=S+A,U=S+A+1,B=M*b+A,D=M*b+A+1;a.push(P,U,B),a.push(U,D,B)}}}this.setIndex(a),this.setAttribute("position",new jt(o,3)),this.setAttribute("normal",new jt(l,3)),this.setAttribute("uv",new jt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}},Xs=class i extends pe{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);let r=[],a=[],o=[],l=[],c=new L,h=new At;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let p=0,u=3;p<=e;p++,u+=3){let m=n+p/e*s;c.x=t*Math.cos(m),c.y=t*Math.sin(m),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[u]/t+1)/2,h.y=(a[u+1]/t+1)/2,l.push(h.x,h.y)}for(let p=1;p<=e;p++)r.push(p,p+1,0);this.setIndex(r),this.setAttribute("position",new jt(a,3)),this.setAttribute("normal",new jt(o,3)),this.setAttribute("uv",new jt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.segments,t.thetaStart,t.thetaLength)}},De=class i extends pe{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],p=[],u=[],m=[],x=0,b=[],f=n/2,d=0;M(),a===!1&&(t>0&&C(!0),e>0&&C(!1)),this.setIndex(h),this.setAttribute("position",new jt(p,3)),this.setAttribute("normal",new jt(u,3)),this.setAttribute("uv",new jt(m,2));function M(){let v=new L,E=new L,T=0,R=(e-t)/n;for(let _=0;_<=r;_++){let S=[],A=_/r,P=A*(e-t)+t;for(let U=0;U<=s;U++){let B=U/s,D=B*l+o,H=Math.sin(D),Z=Math.cos(D);E.x=P*H,E.y=-A*n+f,E.z=P*Z,p.push(E.x,E.y,E.z),v.set(H,R,Z).normalize(),u.push(v.x,v.y,v.z),m.push(B,1-A),S.push(x++)}b.push(S)}for(let _=0;_<s;_++)for(let S=0;S<r;S++){let A=b[S][_],P=b[S+1][_],U=b[S+1][_+1],B=b[S][_+1];(t>0||S!==0)&&(h.push(A,P,B),T+=3),(e>0||S!==r-1)&&(h.push(P,U,B),T+=3)}c.addGroup(d,T,0),d+=T}function C(v){let E=x,T=new At,R=new L,_=0,S=v===!0?t:e,A=v===!0?1:-1;for(let U=1;U<=s;U++)p.push(0,f*A,0),u.push(0,A,0),m.push(.5,.5),x++;let P=x;for(let U=0;U<=s;U++){let D=U/s*l+o,H=Math.cos(D),Z=Math.sin(D);R.x=S*Z,R.y=f*A,R.z=S*H,p.push(R.x,R.y,R.z),u.push(0,A,0),T.x=H*.5+.5,T.y=Z*.5*A+.5,m.push(T.x,T.y),x++}for(let U=0;U<s;U++){let B=E+U,D=P+U;v===!0?h.push(D,D+1,B):h.push(D+1,D,B),_+=3}c.addGroup(d,_,v===!0?1:2),d+=_}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},ri=class i extends De{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},m0=class i extends pe{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};let r=[],a=[];o(s),c(n),h(),this.setAttribute("position",new jt(r,3)),this.setAttribute("normal",new jt(r.slice(),3)),this.setAttribute("uv",new jt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(M){let C=new L,v=new L,E=new L;for(let T=0;T<e.length;T+=3)m(e[T+0],C),m(e[T+1],v),m(e[T+2],E),l(C,v,E,M)}function l(M,C,v,E){let T=E+1,R=[];for(let _=0;_<=T;_++){R[_]=[];let S=M.clone().lerp(v,_/T),A=C.clone().lerp(v,_/T),P=T-_;for(let U=0;U<=P;U++)U===0&&_===T?R[_][U]=S:R[_][U]=S.clone().lerp(A,U/P)}for(let _=0;_<T;_++)for(let S=0;S<2*(T-_)-1;S++){let A=Math.floor(S/2);S%2===0?(u(R[_][A+1]),u(R[_+1][A]),u(R[_][A])):(u(R[_][A+1]),u(R[_+1][A+1]),u(R[_+1][A]))}}function c(M){let C=new L;for(let v=0;v<r.length;v+=3)C.x=r[v+0],C.y=r[v+1],C.z=r[v+2],C.normalize().multiplyScalar(M),r[v+0]=C.x,r[v+1]=C.y,r[v+2]=C.z}function h(){let M=new L;for(let C=0;C<r.length;C+=3){M.x=r[C+0],M.y=r[C+1],M.z=r[C+2];let v=f(M)/2/Math.PI+.5,E=d(M)/Math.PI+.5;a.push(v,1-E)}x(),p()}function p(){for(let M=0;M<a.length;M+=6){let C=a[M+0],v=a[M+2],E=a[M+4],T=Math.max(C,v,E),R=Math.min(C,v,E);T>.9&&R<.1&&(C<.2&&(a[M+0]+=1),v<.2&&(a[M+2]+=1),E<.2&&(a[M+4]+=1))}}function u(M){r.push(M.x,M.y,M.z)}function m(M,C){let v=M*3;C.x=t[v+0],C.y=t[v+1],C.z=t[v+2]}function x(){let M=new L,C=new L,v=new L,E=new L,T=new At,R=new At,_=new At;for(let S=0,A=0;S<r.length;S+=9,A+=6){M.set(r[S+0],r[S+1],r[S+2]),C.set(r[S+3],r[S+4],r[S+5]),v.set(r[S+6],r[S+7],r[S+8]),T.set(a[A+0],a[A+1]),R.set(a[A+2],a[A+3]),_.set(a[A+4],a[A+5]),E.copy(M).add(C).add(v).divideScalar(3);let P=f(E);b(T,A+0,M,P),b(R,A+2,C,P),b(_,A+4,v,P)}}function b(M,C,v,E){E<0&&M.x===1&&(a[C]=M.x-1),v.x===0&&v.z===0&&(a[C]=E/2/Math.PI+.5)}function f(M){return Math.atan2(M.z,-M.x)}function d(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.vertices,t.indices,t.radius,t.detail)}},Ys=class i extends m0{constructor(t=1,e=0){let n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new i(t.radius,t.detail)}};var Zs=class i extends pe{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,p=t/o,u=e/l,m=[],x=[],b=[],f=[];for(let d=0;d<h;d++){let M=d*u-a;for(let C=0;C<c;C++){let v=C*p-r;x.push(v,-M,0),b.push(0,0,1),f.push(C/o),f.push(1-d/l)}}for(let d=0;d<l;d++)for(let M=0;M<o;M++){let C=M+c*d,v=M+c*(d+1),E=M+1+c*(d+1),T=M+1+c*d;m.push(C,v,T),m.push(v,E,T)}this.setIndex(m),this.setAttribute("position",new jt(x,3)),this.setAttribute("normal",new jt(b,3)),this.setAttribute("uv",new jt(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}};var ln=class i extends pe{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],p=new L,u=new L,m=[],x=[],b=[],f=[];for(let d=0;d<=n;d++){let M=[],C=d/n,v=a+C*o,E=t*Math.cos(v),T=Math.sqrt(t*t-E*E),R=0;d===0&&a===0?R=.5/e:d===n&&l===Math.PI&&(R=-.5/e);for(let _=0;_<=e;_++){let S=_/e,A=s+S*r;p.x=-T*Math.cos(A),p.y=E,p.z=T*Math.sin(A),x.push(p.x,p.y,p.z),u.copy(p).normalize(),b.push(u.x,u.y,u.z),f.push(S+R,1-C),M.push(c++)}h.push(M)}for(let d=0;d<n;d++)for(let M=0;M<e;M++){let C=h[d][M+1],v=h[d][M],E=h[d+1][M],T=h[d+1][M+1];(d!==0||a>0)&&m.push(C,v,T),(d!==n-1||l<Math.PI)&&m.push(v,E,T)}this.setIndex(m),this.setAttribute("position",new jt(x,3)),this.setAttribute("normal",new jt(b,3)),this.setAttribute("uv",new jt(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};function Ri(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];if(Wl(s))s.isRenderTargetTexture?(It("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(Wl(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function He(i){let t={};for(let e=0;e<i.length;e++){let n=Ri(i[e]);for(let s in n)t[s]=n[s]}return t}function Wl(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function au(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Fo(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:kt.workingColorSpace}var Wn={clone:Ri,merge:He},ou=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,lu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,me=class extends Hn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ou,this.fragmentShader=lu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ri(t.uniforms),this.uniformsGroups=au(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let n in t.uniforms){let s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new Ct().setHex(s.value);break;case"v2":this.uniforms[n].value=new At().fromArray(s.value);break;case"v3":this.uniforms[n].value=new L().fromArray(s.value);break;case"v4":this.uniforms[n].value=new de().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Nt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new ue().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},ls=class extends me{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},Ne=class extends Hn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ct(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ct(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=_a,this.normalScale=new At(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var g0=class extends Hn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=yc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},_0=class extends Hn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function $i(i,t){return!i||i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function lo(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}var ai=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let a;e:{i:if(!(t<s)){for(let o=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=e[++n],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=e[--n-1],t>=r)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},x0=class extends ai{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:uo,endingEnd:uo}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case fo:r=t,o=2*e-n;break;case po:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case fo:a=t,l=2*n-e;break;case po:a=1,l=n+s[1]-s[0];break;default:a=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,p=this._offsetNext,u=this._weightPrev,m=this._weightNext,x=(n-e)/(s-e),b=x*x,f=b*x,d=-u*f+2*u*b-u*x,M=(1+u)*f+(-1.5-2*u)*b+(-.5+u)*x+1,C=(-1-m)*f+(1.5+m)*b+.5*x,v=m*f-m*b;for(let E=0;E!==o;++E)r[E]=d*a[h+E]+M*a[c+E]+C*a[l+E]+v*a[p+E];return r}},y0=class extends ai{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(n-e)/(s-e),p=1-h;for(let u=0;u!==o;++u)r[u]=a[c+u]*p+a[l+u]*h;return r}},v0=class extends ai{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},M0=class extends ai{interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this.inTangents,p=this.outTangents;if(!h||!p){let x=(n-e)/(s-e),b=1-x;for(let f=0;f!==o;++f)r[f]=a[c+f]*b+a[l+f]*x;return r}let u=o*2,m=t-1;for(let x=0;x!==o;++x){let b=a[c+x],f=a[l+x],d=m*u+x*2,M=p[d],C=p[d+1],v=t*u+x*2,E=h[v],T=h[v+1],R=hu(n,e,M,E,s);r[x]=Nc(R,b,C,T,f)}return r}};function Nc(i,t,e,n,s){let r=1-i;return r*r*r*t+3*r*r*i*e+3*r*i*i*n+i*i*i*s}function cu(i,t,e,n,s){let r=1-i;return 3*r*r*(e-t)+6*r*i*(n-e)+3*i*i*(s-n)}function hu(i,t,e,n,s){let r=(i-t)/(s-t);for(let a=0;a<8;a++){let o=Nc(r,t,e,n,s)-i;if(Math.abs(o)<1e-10)break;let l=cu(r,t,e,n,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var sn=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=$i(e,this.TimeBufferType),this.values=$i(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:$i(t.times,Array),values:$i(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s),lo(t.settings)&&(n.settings={inTangents:$i(t.settings.inTangents,Array),outTangents:$i(t.settings.outTangents,Array)})}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new v0(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new y0(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new x0(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new M0(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case Ls:e=this.InterpolantFactoryMethodDiscrete;break;case l0:e=this.InterpolantFactoryMethodLinear;break;case Qr:e=this.InterpolantFactoryMethodSmooth;break;case ho:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return It("KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ls;case this.InterpolantFactoryMethodLinear:return l0;case this.InterpolantFactoryMethodSmooth:return Qr;case this.InterpolantFactoryMethodBezier:return ho}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t;lo(this.settings)&&(ql(this.settings.inTangents,t),ql(this.settings.outTangents,t))}return this}trim(t,e){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Lt("KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Lt("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){Lt("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){Lt("KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(s!==void 0&&kh(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){Lt("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Qr,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(s)l=!0;else{let p=o*n,u=p-n,m=p+n;for(let x=0;x!==n;++x){let b=e[p+x];if(b!==e[u+x]||b!==e[m+x]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let p=o*n,u=a*n;for(let m=0;m!==n;++m)e[u+m]=e[p+m]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,lo(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function ql(i,t){for(let e=0,n=i.length;e!==n;e+=2)i[e]*=t}sn.prototype.ValueTypeName="";sn.prototype.TimeBufferType=Float32Array;sn.prototype.ValueBufferType=Float32Array;sn.prototype.DefaultInterpolation=l0;var oi=class extends sn{constructor(t,e,n){super(t,e,n)}};oi.prototype.ValueTypeName="bool";oi.prototype.ValueBufferType=Array;oi.prototype.DefaultInterpolation=Ls;oi.prototype.InterpolantFactoryMethodLinear=void 0;oi.prototype.InterpolantFactoryMethodSmooth=void 0;var S0=class extends sn{constructor(t,e,n,s){super(t,e,n,s)}};S0.prototype.ValueTypeName="color";var b0=class extends sn{constructor(t,e,n,s){super(t,e,n,s)}};b0.prototype.ValueTypeName="number";var E0=class extends ai{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-e)/(s-e),c=t*o;for(let h=c+o;c!==h;c+=4)Ke.slerpFlat(r,0,a,c-o,a,c,l);return r}},Js=class extends sn{constructor(t,e,n,s){super(t,e,n,s)}InterpolantFactoryMethodLinear(t){return new E0(this.times,this.values,this.getValueSize(),t)}};Js.prototype.ValueTypeName="quaternion";Js.prototype.InterpolantFactoryMethodSmooth=void 0;var li=class extends sn{constructor(t,e,n){super(t,e,n)}};li.prototype.ValueTypeName="string";li.prototype.ValueBufferType=Array;li.prototype.DefaultInterpolation=Ls;li.prototype.InterpolantFactoryMethodLinear=void 0;li.prototype.InterpolantFactoryMethodSmooth=void 0;var T0=class extends sn{constructor(t,e,n,s){super(t,e,n,s)}};T0.prototype.ValueTypeName="vector";var w0=class{constructor(t,e,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,p){return c.push(h,p),this},this.removeHandler=function(h){let p=c.indexOf(h);return p!==-1&&c.splice(p,2),this},this.getHandler=function(h){for(let p=0,u=c.length;p<u;p+=2){let m=c[p],x=c[p+1];if(m.global&&(m.lastIndex=0),m.test(h))return x}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Uc=new w0,A0=class{constructor(t){this.manager=t!==void 0?t:Uc,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};A0.DEFAULT_MATERIAL_NAME="__DEFAULT";var Ei=class extends Se{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ct(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}},$s=class extends Ei{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Se.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ct(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){let e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}},co=new ue,Xl=new L,Yl=new L,Ks=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new At(512,512),this.mapType=je,this.map=null,this.mapPass=null,this.matrix=new ue,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new as,this._frameExtents=new At(1,1),this._viewportCount=1,this._viewports=[new de(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera;Xl.setFromMatrixPosition(t.matrixWorld),e.position.copy(Xl),Yl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Yl),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){co.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(co,t.coordinateSystem,t.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;t.coordinateSystem===ns||t.reversedDepth?e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),e.multiply(co)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},$r=new L,Kr=new Ke,An=new L,Qs=class extends Se{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ue,this.projectionMatrix=new ue,this.projectionMatrixInverse=new ue,this.coordinateSystem=xn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose($r,Kr,An),An.x===1&&An.y===1&&An.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose($r,Kr,An.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose($r,Kr,An),An.x===1&&An.y===1&&An.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose($r,Kr,An.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ti=new L,Zl=new At,Jl=new At,Ie=class extends Qs{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=c0*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Va*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return c0*2*Math.atan(Math.tan(Va*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ti.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ti.x,ti.y).multiplyScalar(-t/ti.z),ti.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ti.x,ti.y).multiplyScalar(-t/ti.z)}getViewSize(t,e){return this.getViewBounds(t,Zl,Jl),e.subVectors(Jl,Zl)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Va*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var go=class extends Ks{constructor(){super(new Ie(90,1,.5,500)),this.isPointLightShadow=!0}},js=class extends Ei{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new go}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.distance=this.distance,e.object.decay=this.decay,e.object.shadow=this.shadow.toJSON(),e}},ci=class extends Qs{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},_o=class extends Ks{constructor(){super(new ci(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},cs=class extends Ei{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Se.DEFAULT_UP),this.updateMatrix(),this.target=new Se,this.shadow=new _o}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){let e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}},tr=class extends Ei{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}};var Ki=-90,Qi=1,R0=class extends Se{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Ie(Ki,Qi,t,e);s.layers=this.layers,this.add(s);let r=new Ie(Ki,Qi,t,e);r.layers=this.layers,this.add(r);let a=new Ie(Ki,Qi,t,e);a.layers=this.layers,this.add(a);let o=new Ie(Ki,Qi,t,e);o.layers=this.layers,this.add(o);let l=new Ie(Ki,Qi,t,e);l.layers=this.layers,this.add(l);let c=new Ie(Ki,Qi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===xn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===ns)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,p=t.getRenderTarget(),u=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),x=t.xr.enabled;t.xr.enabled=!1;let b=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let f=!1;t.isWebGLRenderer===!0?f=t.state.buffers.depth.getReversed():f=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.generateMipmaps=b,t.setRenderTarget(n,5,s),f&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(p,u,m),t.xr.enabled=x,n.texture.needsPMREMUpdate=!0}},C0=class extends Ie{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}},er=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(t){this._document=t,t.hidden!==void 0&&(this._pageVisibilityHandler=uu.bind(this),t.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(t){return this._timescale=t,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(t){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(t!==void 0?t:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function uu(){this._document.hidden===!1&&this.reset()}var Oo="\\[\\]\\.:\\/",du=new RegExp("["+Oo+"]","g"),Bo="[^"+Oo+"]",fu="[^"+Oo.replace("\\.","")+"]",pu=/((?:WC+[\/:])*)/.source.replace("WC",Bo),mu=/(WCOD+)?/.source.replace("WCOD",fu),gu=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Bo),_u=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Bo),xu=new RegExp("^"+pu+mu+gu+_u+"$"),yu=["material","materials","bones","map"],xo=class{constructor(t,e,n){let s=n||le.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},le=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(du,"")}static parseTrackName(t){let e=xu.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);yu.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=n(o.children);if(l)return l}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){It("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){Lt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Lt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Lt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Lt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Lt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){Lt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){Lt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[s];if(a===void 0){let c=e.nodeName;Lt("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Lt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Lt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};le.Composite=xo;le.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};le.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};le.prototype.GetterByBindingType=[le.prototype._getValue_direct,le.prototype._getValue_array,le.prototype._getValue_arrayElement,le.prototype._getValue_toArray];le.prototype.SetterByBindingTypeAndVersioning=[[le.prototype._setValue_direct,le.prototype._setValue_direct_setNeedsUpdate,le.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[le.prototype._setValue_array,le.prototype._setValue_array_setNeedsUpdate,le.prototype._setValue_array_setMatrixWorldNeedsUpdate],[le.prototype._setValue_arrayElement,le.prototype._setValue_arrayElement_setNeedsUpdate,le.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[le.prototype._setValue_fromArray,le.prototype._setValue_fromArray_setNeedsUpdate,le.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var N1=new Float32Array(1);var nr=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,It("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}};var Wo=class Wo{constructor(t,e,n,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=s,this}};Wo.prototype.isMatrix2=!0;var yo=Wo;function zo(i,t,e,n){let s=vu(n);switch(e){case Io:return i*t;case Do:return i*t/s.components*s.byteLength;case B0:return i*t/s.components*s.byteLength;case pi:return i*t*2/s.components*s.byteLength;case z0:return i*t*2/s.components*s.byteLength;case Lo:return i*t*3/s.components*s.byteLength;case un:return i*t*4/s.components*s.byteLength;case k0:return i*t*4/s.components*s.byteLength;case dr:case fr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case pr:case mr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case H0:case W0:return Math.max(i,16)*Math.max(t,8)/4;case V0:case G0:return Math.max(i,8)*Math.max(t,8)/2;case q0:case X0:case Z0:case J0:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Y0:case gr:case $0:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case K0:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Q0:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case j0:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case ta:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case ea:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case na:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case ia:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case sa:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case ra:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case aa:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case oa:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case la:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case ca:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case ha:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case ua:case da:case fa:return Math.ceil(i/4)*Math.ceil(t/4)*16;case pa:case ma:return Math.ceil(i/4)*Math.ceil(t/4)*8;case _r:case ga:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function vu(i){switch(i){case je:case Ao:return{byteLength:1,components:1};case ds:case Ro:case Ue:return{byteLength:2,components:1};case F0:case O0:return{byteLength:2,components:4};case Mn:case U0:case Sn:return{byteLength:4,components:1};case Co:case Po:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?It("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function ih(){let i=null,t=!1,e=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),e(r,a)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Su(i){let t=new WeakMap;function e(o,l){let c=o.array,h=o.usage,p=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),o.onUploadCallback();let m;if(c instanceof Float32Array)m=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)m=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=i.SHORT;else if(c instanceof Uint32Array)m=i.UNSIGNED_INT;else if(c instanceof Int32Array)m=i.INT;else if(c instanceof Int8Array)m=i.BYTE;else if(c instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:p}}function n(o,l,c){let h=l.array,p=l.updateRanges;if(i.bindBuffer(c,o),p.length===0)i.bufferSubData(c,0,h);else{p.sort((m,x)=>m.start-x.start);let u=0;for(let m=1;m<p.length;m++){let x=p[u],b=p[m];b.start<=x.start+x.count+1?x.count=Math.max(x.count,b.start+b.count-x.start):(++u,p[u]=b)}p.length=u+1;for(let m=0,x=p.length;m<x;m++){let b=p[m];i.bufferSubData(c,b.start*h.BYTES_PER_ELEMENT,h,b.start,b.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var bu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Eu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Tu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,wu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Au=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ru=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Cu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Pu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Iu=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Lu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Du=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Nu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Uu=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Fu=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Ou=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Bu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,zu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ku=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Vu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Hu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Gu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Wu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,qu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Xu=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Yu=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Zu=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Ju=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,$u=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ku=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Qu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ju="gl_FragColor = linearToOutputTexel( gl_FragColor );",td=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ed=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,nd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,id=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,sd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,rd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,ad=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,od=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ld=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,cd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,hd=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,ud=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,dd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,fd=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,pd=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,md=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,gd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,_d=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,xd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,yd=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,vd=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Md=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Sd=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,bd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Ed=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Td=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,wd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ad=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Rd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Cd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Pd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Id=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ld=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Dd=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Nd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ud=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Fd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Od=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Bd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,zd=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,kd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Vd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Hd=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Gd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Wd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,qd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Xd=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Yd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Zd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Jd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,$d=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Kd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Qd=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,jd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,tf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ef=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,nf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,sf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,rf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,af=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,of=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,lf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,cf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,hf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,uf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,df=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ff=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,pf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,mf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,gf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,_f=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,xf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,yf=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,vf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Mf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Sf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,bf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Ef=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Tf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Af=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Cf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Pf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,If=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Lf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Df=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Nf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Uf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ff=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Of=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Bf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,zf=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kf=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Vf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hf=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Gf=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wf=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,qf=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Xf=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Yf=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zf=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Jf=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$f=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Kf=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qf=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,jf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,tp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ep=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,np=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ip=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Bt={alphahash_fragment:bu,alphahash_pars_fragment:Eu,alphamap_fragment:Tu,alphamap_pars_fragment:wu,alphatest_fragment:Au,alphatest_pars_fragment:Ru,aomap_fragment:Cu,aomap_pars_fragment:Pu,batching_pars_vertex:Iu,batching_vertex:Lu,begin_vertex:Du,beginnormal_vertex:Nu,bsdfs:Uu,iridescence_fragment:Fu,bumpmap_pars_fragment:Ou,clipping_planes_fragment:Bu,clipping_planes_pars_fragment:zu,clipping_planes_pars_vertex:ku,clipping_planes_vertex:Vu,color_fragment:Hu,color_pars_fragment:Gu,color_pars_vertex:Wu,color_vertex:qu,common:Xu,cube_uv_reflection_fragment:Yu,defaultnormal_vertex:Zu,displacementmap_pars_vertex:Ju,displacementmap_vertex:$u,emissivemap_fragment:Ku,emissivemap_pars_fragment:Qu,colorspace_fragment:ju,colorspace_pars_fragment:td,envmap_fragment:ed,envmap_common_pars_fragment:nd,envmap_pars_fragment:id,envmap_pars_vertex:sd,envmap_physical_pars_fragment:md,envmap_vertex:rd,fog_vertex:ad,fog_pars_vertex:od,fog_fragment:ld,fog_pars_fragment:cd,gradientmap_pars_fragment:hd,lightmap_pars_fragment:ud,lights_lambert_fragment:dd,lights_lambert_pars_fragment:fd,lights_pars_begin:pd,lights_toon_fragment:gd,lights_toon_pars_fragment:_d,lights_phong_fragment:xd,lights_phong_pars_fragment:yd,lights_physical_fragment:vd,lights_physical_pars_fragment:Md,lights_fragment_begin:Sd,lights_fragment_maps:bd,lights_fragment_end:Ed,lightprobes_pars_fragment:Td,logdepthbuf_fragment:wd,logdepthbuf_pars_fragment:Ad,logdepthbuf_pars_vertex:Rd,logdepthbuf_vertex:Cd,map_fragment:Pd,map_pars_fragment:Id,map_particle_fragment:Ld,map_particle_pars_fragment:Dd,metalnessmap_fragment:Nd,metalnessmap_pars_fragment:Ud,morphinstance_vertex:Fd,morphcolor_vertex:Od,morphnormal_vertex:Bd,morphtarget_pars_vertex:zd,morphtarget_vertex:kd,normal_fragment_begin:Vd,normal_fragment_maps:Hd,normal_pars_fragment:Gd,normal_pars_vertex:Wd,normal_vertex:qd,normalmap_pars_fragment:Xd,clearcoat_normal_fragment_begin:Yd,clearcoat_normal_fragment_maps:Zd,clearcoat_pars_fragment:Jd,iridescence_pars_fragment:$d,opaque_fragment:Kd,packing:Qd,premultiplied_alpha_fragment:jd,project_vertex:tf,dithering_fragment:ef,dithering_pars_fragment:nf,roughnessmap_fragment:sf,roughnessmap_pars_fragment:rf,shadowmap_pars_fragment:af,shadowmap_pars_vertex:of,shadowmap_vertex:lf,shadowmask_pars_fragment:cf,skinbase_vertex:hf,skinning_pars_vertex:uf,skinning_vertex:df,skinnormal_vertex:ff,specularmap_fragment:pf,specularmap_pars_fragment:mf,tonemapping_fragment:gf,tonemapping_pars_fragment:_f,transmission_fragment:xf,transmission_pars_fragment:yf,uv_pars_fragment:vf,uv_pars_vertex:Mf,uv_vertex:Sf,worldpos_vertex:bf,background_vert:Ef,background_frag:Tf,backgroundCube_vert:wf,backgroundCube_frag:Af,cube_vert:Rf,cube_frag:Cf,depth_vert:Pf,depth_frag:If,distance_vert:Lf,distance_frag:Df,equirect_vert:Nf,equirect_frag:Uf,linedashed_vert:Ff,linedashed_frag:Of,meshbasic_vert:Bf,meshbasic_frag:zf,meshlambert_vert:kf,meshlambert_frag:Vf,meshmatcap_vert:Hf,meshmatcap_frag:Gf,meshnormal_vert:Wf,meshnormal_frag:qf,meshphong_vert:Xf,meshphong_frag:Yf,meshphysical_vert:Zf,meshphysical_frag:Jf,meshtoon_vert:$f,meshtoon_frag:Kf,points_vert:Qf,points_frag:jf,shadow_vert:tp,shadow_frag:ep,sprite_vert:np,sprite_frag:ip},ut={common:{diffuse:{value:new Ct(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Nt},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Nt}},envmap:{envMap:{value:null},envMapRotation:{value:new Nt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Nt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Nt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Nt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Nt},normalScale:{value:new At(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Nt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Nt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Nt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Nt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ct(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new L},probesMax:{value:new L},probesResolution:{value:new L}},points:{diffuse:{value:new Ct(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0},uvTransform:{value:new Nt}},sprite:{diffuse:{value:new Ct(16777215)},opacity:{value:1},center:{value:new At(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Nt},alphaMap:{value:null},alphaMapTransform:{value:new Nt},alphaTest:{value:0}}},Dn={basic:{uniforms:He([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.fog]),vertexShader:Bt.meshbasic_vert,fragmentShader:Bt.meshbasic_frag},lambert:{uniforms:He([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new Ct(0)},envMapIntensity:{value:1}}]),vertexShader:Bt.meshlambert_vert,fragmentShader:Bt.meshlambert_frag},phong:{uniforms:He([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new Ct(0)},specular:{value:new Ct(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Bt.meshphong_vert,fragmentShader:Bt.meshphong_frag},standard:{uniforms:He([ut.common,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.roughnessmap,ut.metalnessmap,ut.fog,ut.lights,{emissive:{value:new Ct(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Bt.meshphysical_vert,fragmentShader:Bt.meshphysical_frag},toon:{uniforms:He([ut.common,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.gradientmap,ut.fog,ut.lights,{emissive:{value:new Ct(0)}}]),vertexShader:Bt.meshtoon_vert,fragmentShader:Bt.meshtoon_frag},matcap:{uniforms:He([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,{matcap:{value:null}}]),vertexShader:Bt.meshmatcap_vert,fragmentShader:Bt.meshmatcap_frag},points:{uniforms:He([ut.points,ut.fog]),vertexShader:Bt.points_vert,fragmentShader:Bt.points_frag},dashed:{uniforms:He([ut.common,ut.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Bt.linedashed_vert,fragmentShader:Bt.linedashed_frag},depth:{uniforms:He([ut.common,ut.displacementmap]),vertexShader:Bt.depth_vert,fragmentShader:Bt.depth_frag},normal:{uniforms:He([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,{opacity:{value:1}}]),vertexShader:Bt.meshnormal_vert,fragmentShader:Bt.meshnormal_frag},sprite:{uniforms:He([ut.sprite,ut.fog]),vertexShader:Bt.sprite_vert,fragmentShader:Bt.sprite_frag},background:{uniforms:{uvTransform:{value:new Nt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Bt.background_vert,fragmentShader:Bt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Nt}},vertexShader:Bt.backgroundCube_vert,fragmentShader:Bt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Bt.cube_vert,fragmentShader:Bt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Bt.equirect_vert,fragmentShader:Bt.equirect_frag},distance:{uniforms:He([ut.common,ut.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Bt.distance_vert,fragmentShader:Bt.distance_frag},shadow:{uniforms:He([ut.lights,ut.fog,{color:{value:new Ct(0)},opacity:{value:1}}]),vertexShader:Bt.shadow_vert,fragmentShader:Bt.shadow_frag}};Dn.physical={uniforms:He([Dn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Nt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Nt},clearcoatNormalScale:{value:new At(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Nt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Nt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Nt},sheen:{value:0},sheenColor:{value:new Ct(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Nt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Nt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Nt},transmissionSamplerSize:{value:new At},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Nt},attenuationDistance:{value:0},attenuationColor:{value:new Ct(0)},specularColor:{value:new Ct(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Nt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Nt},anisotropyVector:{value:new At},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Nt}}]),vertexShader:Bt.meshphysical_vert,fragmentShader:Bt.meshphysical_frag};var va={r:0,b:0,g:0},sp=new ue,sh=new Nt;sh.set(-1,0,0,0,1,0,0,0,1);function rp(i,t,e,n,s,r){let a=new Ct(0),o=s===!0?0:1,l,c,h=null,p=0,u=null;function m(M){let C=M.isScene===!0?M.background:null;if(C&&C.isTexture){let v=M.backgroundBlurriness>0;C=t.get(C,v)}return C}function x(M){let C=!1,v=m(M);v===null?f(a,o):v&&v.isColor&&(f(v,1),C=!0);let E=i.xr.getEnvironmentBlendMode();E==="additive"?e.buffers.color.setClear(0,0,0,1,r):E==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||C)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function b(M,C){let v=m(C);v&&(v.isCubeTexture||v.mapping===hr)?(c===void 0&&(c=new Dt(new Ve(1,1,1),new me({name:"BackgroundCubeMaterial",uniforms:Ri(Dn.backgroundCube.uniforms),vertexShader:Dn.backgroundCube.vertexShader,fragmentShader:Dn.backgroundCube.fragmentShader,side:Xe,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(E,T,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=v,c.material.uniforms.backgroundBlurriness.value=C.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(sp.makeRotationFromEuler(C.backgroundRotation)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(sh),c.material.toneMapped=kt.getTransfer(v.colorSpace)!==Jt,(h!==v||p!==v.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,h=v,p=v.version,u=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new Dt(new Zs(2,2),new me({name:"BackgroundMaterial",uniforms:Ri(Dn.background.uniforms),vertexShader:Dn.background.vertexShader,fragmentShader:Dn.background.fragmentShader,side:hi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,l.material.toneMapped=kt.getTransfer(v.colorSpace)!==Jt,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||p!==v.version||u!==i.toneMapping)&&(l.material.needsUpdate=!0,h=v,p=v.version,u=i.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null))}function f(M,C){M.getRGB(va,Fo(i)),e.buffers.color.setClear(va.r,va.g,va.b,C,r)}function d(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,C=1){a.set(M),o=C,f(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(M){o=M,f(a,o)},render:x,addToRenderList:b,dispose:d}}function ap(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null),r=s,a=!1;function o(P,U,B,D,H){let Z=!1,J=p(P,D,B,U);r!==J&&(r=J,c(r.object)),Z=m(P,D,B,H),Z&&x(P,D,B,H),H!==null&&t.update(H,i.ELEMENT_ARRAY_BUFFER),(Z||a)&&(a=!1,v(P,U,B,D),H!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(H).buffer))}function l(){return i.createVertexArray()}function c(P){return i.bindVertexArray(P)}function h(P){return i.deleteVertexArray(P)}function p(P,U,B,D){let H=D.wireframe===!0,Z=n[U.id];Z===void 0&&(Z={},n[U.id]=Z);let J=P.isInstancedMesh===!0?P.id:0,nt=Z[J];nt===void 0&&(nt={},Z[J]=nt);let q=nt[B.id];q===void 0&&(q={},nt[B.id]=q);let j=q[H];return j===void 0&&(j=u(l()),q[H]=j),j}function u(P){let U=[],B=[],D=[];for(let H=0;H<e;H++)U[H]=0,B[H]=0,D[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:B,attributeDivisors:D,object:P,attributes:{},index:null}}function m(P,U,B,D){let H=r.attributes,Z=U.attributes,J=0,nt=B.getAttributes();for(let q in nt)if(nt[q].location>=0){let et=H[q],Rt=Z[q];if(Rt===void 0&&(q==="instanceMatrix"&&P.instanceMatrix&&(Rt=P.instanceMatrix),q==="instanceColor"&&P.instanceColor&&(Rt=P.instanceColor)),et===void 0||et.attribute!==Rt||Rt&&et.data!==Rt.data)return!0;J++}return r.attributesNum!==J||r.index!==D}function x(P,U,B,D){let H={},Z=U.attributes,J=0,nt=B.getAttributes();for(let q in nt)if(nt[q].location>=0){let et=Z[q];et===void 0&&(q==="instanceMatrix"&&P.instanceMatrix&&(et=P.instanceMatrix),q==="instanceColor"&&P.instanceColor&&(et=P.instanceColor));let Rt={};Rt.attribute=et,et&&et.data&&(Rt.data=et.data),H[q]=Rt,J++}r.attributes=H,r.attributesNum=J,r.index=D}function b(){let P=r.newAttributes;for(let U=0,B=P.length;U<B;U++)P[U]=0}function f(P){d(P,0)}function d(P,U){let B=r.newAttributes,D=r.enabledAttributes,H=r.attributeDivisors;B[P]=1,D[P]===0&&(i.enableVertexAttribArray(P),D[P]=1),H[P]!==U&&(i.vertexAttribDivisor(P,U),H[P]=U)}function M(){let P=r.newAttributes,U=r.enabledAttributes;for(let B=0,D=U.length;B<D;B++)U[B]!==P[B]&&(i.disableVertexAttribArray(B),U[B]=0)}function C(P,U,B,D,H,Z,J){J===!0?i.vertexAttribIPointer(P,U,B,H,Z):i.vertexAttribPointer(P,U,B,D,H,Z)}function v(P,U,B,D){b();let H=D.attributes,Z=B.getAttributes(),J=U.defaultAttributeValues;for(let nt in Z){let q=Z[nt];if(q.location>=0){let j=H[nt];if(j===void 0&&(nt==="instanceMatrix"&&P.instanceMatrix&&(j=P.instanceMatrix),nt==="instanceColor"&&P.instanceColor&&(j=P.instanceColor)),j!==void 0){let et=j.normalized,Rt=j.itemSize,Tt=t.get(j);if(Tt===void 0)continue;let ie=Tt.buffer,Xt=Tt.type,$t=Tt.bytesPerElement,X=Xt===i.INT||Xt===i.UNSIGNED_INT||j.gpuType===U0;if(j.isInterleavedBufferAttribute){let Q=j.data,xt=Q.stride,Ut=j.offset;if(Q.isInstancedInterleavedBuffer){for(let gt=0;gt<q.locationSize;gt++)d(q.location+gt,Q.meshPerAttribute);P.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let gt=0;gt<q.locationSize;gt++)f(q.location+gt);i.bindBuffer(i.ARRAY_BUFFER,ie);for(let gt=0;gt<q.locationSize;gt++)C(q.location+gt,Rt/q.locationSize,Xt,et,xt*$t,(Ut+Rt/q.locationSize*gt)*$t,X)}else{if(j.isInstancedBufferAttribute){for(let Q=0;Q<q.locationSize;Q++)d(q.location+Q,j.meshPerAttribute);P.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let Q=0;Q<q.locationSize;Q++)f(q.location+Q);i.bindBuffer(i.ARRAY_BUFFER,ie);for(let Q=0;Q<q.locationSize;Q++)C(q.location+Q,Rt/q.locationSize,Xt,et,Rt*$t,Rt/q.locationSize*Q*$t,X)}}else if(J!==void 0){let et=J[nt];if(et!==void 0)switch(et.length){case 2:i.vertexAttrib2fv(q.location,et);break;case 3:i.vertexAttrib3fv(q.location,et);break;case 4:i.vertexAttrib4fv(q.location,et);break;default:i.vertexAttrib1fv(q.location,et)}}}}M()}function E(){S();for(let P in n){let U=n[P];for(let B in U){let D=U[B];for(let H in D){let Z=D[H];for(let J in Z)h(Z[J].object),delete Z[J];delete D[H]}}delete n[P]}}function T(P){if(n[P.id]===void 0)return;let U=n[P.id];for(let B in U){let D=U[B];for(let H in D){let Z=D[H];for(let J in Z)h(Z[J].object),delete Z[J];delete D[H]}}delete n[P.id]}function R(P){for(let U in n){let B=n[U];for(let D in B){let H=B[D];if(H[P.id]===void 0)continue;let Z=H[P.id];for(let J in Z)h(Z[J].object),delete Z[J];delete H[P.id]}}}function _(P){for(let U in n){let B=n[U],D=P.isInstancedMesh===!0?P.id:0,H=B[D];if(H!==void 0){for(let Z in H){let J=H[Z];for(let nt in J)h(J[nt].object),delete J[nt];delete H[Z]}delete B[D],Object.keys(B).length===0&&delete n[U]}}}function S(){A(),a=!0,r!==s&&(r=s,c(r.object))}function A(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:S,resetDefaultState:A,dispose:E,releaseStatesOfGeometry:T,releaseStatesOfObject:_,releaseStatesOfProgram:R,initAttributes:b,enableAttribute:f,disableUnusedAttributes:M}}function op(i,t,e){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),e.update(c,n,1)}function a(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function o(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let m=0;m<h;m++)u+=c[m];e.update(u,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function lp(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let R=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(R){return!(R!==un&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){let _=R===Ue&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==je&&R!==Sn&&!_&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(It("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let p=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&u===!1&&It("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=i.getParameter(i.MAX_TEXTURE_SIZE),f=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),C=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),E=i.getParameter(i.MAX_SAMPLES),T=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:p,reversedDepthBuffer:u,maxTextures:m,maxVertexTextures:x,maxTextureSize:b,maxCubemapSize:f,maxAttributes:d,maxVertexUniforms:M,maxVaryings:C,maxFragmentUniforms:v,maxSamples:E,samples:T}}function cp(i){let t=this,e=null,n=0,s=!1,r=!1,a=new _n,o=new Nt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(p,u){let m=p.length!==0||u||n!==0||s;return s=u,n=p.length,m},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(p,u){e=h(p,u,0)},this.setState=function(p,u,m){let x=p.clippingPlanes,b=p.clipIntersection,f=p.clipShadows,d=i.get(p);if(!s||x===null||x.length===0||r&&!f)r?h(null):c();else{let M=r?0:n,C=M*4,v=d.clippingState||null;l.value=v,v=h(x,u,C,m);for(let E=0;E!==C;++E)v[E]=e[E];d.clippingState=v,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(p,u,m,x){let b=p!==null?p.length:0,f=null;if(b!==0){if(f=l.value,x!==!0||f===null){let d=m+b*4,M=u.matrixWorldInverse;o.getNormalMatrix(M),(f===null||f.length<d)&&(f=new Float32Array(d));for(let C=0,v=m;C!==b;++C,v+=4)a.copy(p[C]).applyMatrix4(M,o),a.normal.toArray(f,v),f[v+3]=a.constant}l.value=f,l.needsUpdate=!0}return t.numPlanes=b,t.numIntersection=0,f}}var ms=4,hp=6,up=20,dp=256,yr=new ci,Fc=new Ct,qo=null,Xo=0,Yo=0,Zo=!1,fp=new L,Ci=new L,Sa=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){let{size:a=256,position:o=fp}=r;qo=this._renderer.getRenderTarget(),Xo=this._renderer.getActiveCubeFace(),Yo=this._renderer.getActiveMipmapLevel(),Zo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,s,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=zc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Bc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(qo,Xo,Yo),this._renderer.xr.enabled=Zo,t.scissorTest=!1,ps(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ui||t.mapping===Ai?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),qo=this._renderer.getRenderTarget(),Xo=this._renderer.getActiveCubeFace(),Yo=this._renderer.getActiveMipmapLevel(),Zo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Le,minFilter:Le,generateMipmaps:!1,type:Ue,format:un,colorSpace:Ds,depthBuffer:!1},s=Oc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Oc(t,e,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=pp(r)),this._blurMaterial=gp(r,t,e),this._ggxMaterial=mp(r,t,e)}return s}_compileMaterial(t){let e=new Dt(new pe,t);this._renderer.compile(e,yr)}_sceneToCubeUV(t,e,n,s,r){let l=new Ie(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],p=this._renderer,u=p.autoClear,m=p.toneMapping;p.getClearColor(Fc),p.toneMapping=vn,p.autoClear=!1,p.state.buffers.depth.getReversed()&&(p.setRenderTarget(s),p.clearDepth(),p.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Dt(new Ve,new Qe({name:"PMREM.Background",side:Xe,depthWrite:!1,depthTest:!1})));let b=this._backgroundBox,f=b.material,d=!1,M=t.background;M?M.isColor&&(f.color.copy(M),t.background=null,d=!0):(f.color.copy(Fc),d=!0);for(let C=0;C<6;C++){let v=C%3;v===0?(l.up.set(0,c[C],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[C],r.y,r.z)):v===1?(l.up.set(0,0,c[C]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[C],r.z)):(l.up.set(0,c[C],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[C]));let E=this._cubeSize;ps(s,v*E,C>2?E:0,E,E),p.setRenderTarget(s),d&&p.render(b,l),p.render(t,l)}p.toneMapping=m,p.autoClear=u,t.background=M}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===ui||t.mapping===Ai;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=zc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Bc());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=t;let l=this._cubeSize;ps(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(a,yr)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let l=a.uniforms,c=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),p=Math.sqrt(c*c-h*h),u=c*1.25,m=p*u,{_lodMax:x}=this,b=this._sizeLods[n],f=3*b*(n>x-ms?n-x+ms:0),d=4*(this._cubeSize-b);l.envMap.value=t.texture,l.roughness.value=m,l.mipInt.value=x-e,ps(r,f,d,3*b,2*b),s.setRenderTarget(r),s.render(o,yr),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=x-n,ps(t,f,d,3*b,2*b),s.setRenderTarget(t),s.render(o,yr)}_blur(t,e,n,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,r,e,n,a),this._blurPass(r,t,n,n,a)}_blurPass(t,e,n,s,r){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[s];l.material=o;let c=o.uniforms;c.envMap.value=t.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-n;let h=this._sizeLods[s],p=3*h*(s>this._lodMax-ms?s-this._lodMax+ms:0),u=4*(this._cubeSize-h);ps(e,p,u,3*h,2*h),a.setRenderTarget(e),a.render(l,yr)}};function pp(i){let t=[],e=[],n=i,s=i-ms+1+hp;for(let r=0;r<s;r++){let a=Math.pow(2,n);t.push(a);let o=1/(a-2),l=-o,c=1+o,h=[l,l,c,l,c,c,l,l,c,c,l,c],p=6,u=6,m=3,x=new Float32Array(m*u*p),b=new Float32Array(m*u*p);for(let d=0;d<p;d++){let M=d%3*2/3-1,C=d>2?0:-1,v=[M,C,0,M+2/3,C,0,M+2/3,C+1,0,M,C,0,M+2/3,C+1,0,M,C+1,0];x.set(v,m*u*d);for(let E=0;E<u;E++){let T=h[E*2]*2-1,R=h[E*2+1]*2-1;d===0?Ci.set(1,R,T):d===1?Ci.set(-T,1,-R):d===2?Ci.set(-T,R,1):d===3?Ci.set(-1,R,-T):d===4?Ci.set(-T,-1,R):Ci.set(T,R,-1),Ci.toArray(b,(d*u+E)*m)}}let f=new pe;f.setAttribute("position",new Ee(x,m)),f.setAttribute("outputDirection",new Ee(b,m)),e.push(new Dt(f,null)),n>ms&&n--}return{lodMeshes:e,sizeLods:t}}function Oc(i,t,e){let n=new Me(i,t,e);return n.texture.mapping=hr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ps(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function mp(i,t,e){return new me({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:dp,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ta(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:hn,depthTest:!1,depthWrite:!1})}function gp(i,t,e){return new me({name:"SphericalGaussianBlur",defines:{SAMPLES:up,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Ta(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:hn,depthTest:!1,depthWrite:!1})}function Bc(){return new me({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ta(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:hn,depthTest:!1,depthWrite:!1})}function zc(){return new me({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ta(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:hn,depthTest:!1,depthWrite:!1})}function Ta(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var ba=class extends Me{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Gs(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Ve(5,5,5),r=new me({name:"CubemapFromEquirect",uniforms:Ri(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Xe,blending:hn});r.uniforms.tEquirect.value=e;let a=new Dt(s,r),o=e.minFilter;return e.minFilter===di&&(e.minFilter=Le),new R0(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}};function _p(i){let t=new WeakMap,e=new WeakMap,n=null;function s(u,m=!1){return u==null?null:m?a(u):r(u)}function r(u){if(u&&u.isTexture){let m=u.mapping;if(m===L0||m===D0)if(t.has(u)){let x=t.get(u).texture;return o(x,u.mapping)}else{let x=u.image;if(x&&x.height>0){let b=new ba(x.height);return b.fromEquirectangularTexture(i,u),t.set(u,b),u.addEventListener("dispose",c),o(b.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){let m=u.mapping,x=m===L0||m===D0,b=m===ui||m===Ai;if(x||b){let f=e.get(u),d=f!==void 0?f.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==d)return n===null&&(n=new Sa(i)),f=x?n.fromEquirectangular(u,f):n.fromCubemap(u,f),f.texture.pmremVersion=u.pmremVersion,e.set(u,f),f.texture;if(f!==void 0)return f.texture;{let M=u.image;return x&&M&&M.height>0||b&&M&&l(M)?(n===null&&(n=new Sa(i)),f=x?n.fromEquirectangular(u):n.fromCubemap(u),f.texture.pmremVersion=u.pmremVersion,e.set(u,f),u.addEventListener("dispose",h),f.texture):null}}}return u}function o(u,m){return m===L0?u.mapping=ui:m===D0&&(u.mapping=Ai),u}function l(u){let m=0,x=6;for(let b=0;b<x;b++)u[b]!==void 0&&m++;return m===x}function c(u){let m=u.target;m.removeEventListener("dispose",c);let x=t.get(m);x!==void 0&&(t.delete(m),x.dispose())}function h(u){let m=u.target;m.removeEventListener("dispose",h);let x=e.get(m);x!==void 0&&(e.delete(m),x.dispose())}function p(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:p}}function xp(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&Mi("WebGLRenderer: "+n+" extension not supported."),s}}}function yp(i,t,e,n){let s={},r=new WeakMap;function a(p){let u=p.target;u.index!==null&&t.remove(u.index);for(let x in u.attributes)t.remove(u.attributes[x]);u.removeEventListener("dispose",a),delete s[u.id];let m=r.get(u);m&&(t.remove(m),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(p,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,e.memory.geometries++),u}function l(p){let u=p.attributes;for(let m in u)t.update(u[m],i.ARRAY_BUFFER)}function c(p){let u=[],m=p.index,x=p.attributes.position,b=0;if(x===void 0)return;if(m!==null){let M=m.array;b=m.version;for(let C=0,v=M.length;C<v;C+=3){let E=M[C+0],T=M[C+1],R=M[C+2];u.push(E,T,T,R,R,E)}}else{let M=x.array;b=x.version;for(let C=0,v=M.length/3-1;C<v;C+=3){let E=C+0,T=C+1,R=C+2;u.push(E,T,T,R,R,E)}}let f=new(x.count>=65535?Vs:ks)(u,1);f.version=b;let d=r.get(p);d&&t.remove(d),r.set(p,f)}function h(p){let u=r.get(p);if(u){let m=p.index;m!==null&&u.version<m.version&&c(p)}else c(p);return r.get(p)}return{get:o,update:l,getWireframeAttribute:h}}function vp(i,t,e){let n;function s(p){n=p}let r,a;function o(p){r=p.type,a=p.bytesPerElement}function l(p,u){i.drawElements(n,u,r,p*a),e.update(u,n,1)}function c(p,u,m){m!==0&&(i.drawElementsInstanced(n,u,r,p*a,m),e.update(u,n,m))}function h(p,u,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,p,0,m);let b=0;for(let f=0;f<m;f++)b+=u[f];e.update(b,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function Mp(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:Lt("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Sp(i,t,e){let n=new WeakMap,s=new de;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,p=h!==void 0?h.length:0,u=n.get(o);if(u===void 0||u.count!==p){let S=function(){R.dispose(),n.delete(o),o.removeEventListener("dispose",S)};u!==void 0&&u.texture.dispose();let m=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,b=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],d=o.morphAttributes.normal||[],M=o.morphAttributes.color||[],C=0;m===!0&&(C=1),x===!0&&(C=2),b===!0&&(C=3);let v=o.attributes.position.count*C,E=1;v>t.maxTextureSize&&(E=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);let T=new Float32Array(v*E*4*p),R=new Fs(T,v,E,p);R.type=Sn,R.needsUpdate=!0;let _=C*4;for(let A=0;A<p;A++){let P=f[A],U=d[A],B=M[A],D=v*E*4*A;for(let H=0;H<P.count;H++){let Z=H*_;m===!0&&(s.fromBufferAttribute(P,H),T[D+Z+0]=s.x,T[D+Z+1]=s.y,T[D+Z+2]=s.z,T[D+Z+3]=0),x===!0&&(s.fromBufferAttribute(U,H),T[D+Z+4]=s.x,T[D+Z+5]=s.y,T[D+Z+6]=s.z,T[D+Z+7]=0),b===!0&&(s.fromBufferAttribute(B,H),T[D+Z+8]=s.x,T[D+Z+9]=s.y,T[D+Z+10]=s.z,T[D+Z+11]=B.itemSize===4?s.w:1)}}u={count:p,texture:R,size:new At(v,E)},n.set(o,u),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let m=0;for(let b=0;b<c.length;b++)m+=c[b];let x=o.morphTargetsRelative?1:1-m;l.getUniforms().setValue(i,"morphTargetBaseInfluence",x),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:r}}function bp(i,t,e,n,s){let r=new WeakMap;function a(c){let h=s.render.frame,p=c.geometry,u=t.get(c,p);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let m=c.skeleton;r.get(m)!==h&&(m.update(),r.set(m,h))}return u}function o(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}var Ep={[sr]:"LINEAR_TONE_MAPPING",[rr]:"REINHARD_TONE_MAPPING",[ar]:"CINEON_TONE_MAPPING",[wi]:"ACES_FILMIC_TONE_MAPPING",[lr]:"AGX_TONE_MAPPING",[cr]:"NEUTRAL_TONE_MAPPING",[or]:"CUSTOM_TONE_MAPPING"};function Tp(i,t,e,n,s,r){let a=new Me(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new pe;c.setAttribute("position",new jt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new jt([0,2,0,0,2,0],2));let h=new ls({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),p=new Dt(c,h),u=new ci(-1,1,1,-1,0,1),m=null,x=null,b=!1,f,d=null,M=[],C=!1;this.setSize=function(v,E){a.setSize(v,E),o!==null&&o.setSize(v,E),l!==null&&l.setSize(v,E);for(let T=0;T<M.length;T++){let R=M[T];R.setSize&&R.setSize(v,E)}},this.setEffects=function(v){M=v,C=M.length>0&&M[0].isRenderPass===!0;let E=a.width,T=a.height;M.length>0&&o===null&&(o=new Me(E,T,{type:Ue,depthBuffer:!1,stencilBuffer:!1}),l=new Me(E,T,{type:Ue,depthBuffer:!1,stencilBuffer:!1}));for(let R=0;R<M.length;R++){let _=M[R];_.setSize&&_.setSize(E,T)}},this.begin=function(v,E){if(b||v.toneMapping===vn&&M.length===0)return!1;if(d=E,E!==null){let T=E.width,R=E.height;(a.width!==T||a.height!==R)&&this.setSize(T,R)}return C===!1&&v.setRenderTarget(a),f=v.toneMapping,v.toneMapping=vn,!0},this.hasRenderPass=function(){return C},this.end=function(v,E){v.toneMapping=f,b=!0;let T=a,R=o;for(let _=0;_<M.length;_++){let S=M[_];S.enabled!==!1&&(S.render(v,R,T,E),S.needsSwap!==!1&&(T=R,R=R===o?l:o))}if(m!==v.outputColorSpace||x!==v.toneMapping){m=v.outputColorSpace,x=v.toneMapping,h.defines={},kt.getTransfer(m)===Jt&&(h.defines.SRGB_TRANSFER="");let _=Ep[x];_&&(h.defines[_]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=T.texture,v.setRenderTarget(d),v.render(p,u),d=null,b=!1},this.isCompositing=function(){return b},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}var rh=new qe,Ko=new si(1,1),ah=new Fs,oh=new d0,lh=new Gs,kc=[],Vc=[],Hc=new Float32Array(16),Gc=new Float32Array(9),Wc=new Float32Array(4);function _s(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=kc[s];if(r===void 0&&(r=new Float32Array(s),kc[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Te(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function we(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function wa(i,t){let e=Vc[t];e===void 0&&(e=new Int32Array(t),Vc[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function wp(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Ap(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;i.uniform2fv(this.addr,t),we(e,t)}}function Rp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Te(e,t))return;i.uniform3fv(this.addr,t),we(e,t)}}function Cp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;i.uniform4fv(this.addr,t),we(e,t)}}function Pp(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Te(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),we(e,t)}else{if(Te(e,n))return;Wc.set(n),i.uniformMatrix2fv(this.addr,!1,Wc),we(e,n)}}function Ip(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Te(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),we(e,t)}else{if(Te(e,n))return;Gc.set(n),i.uniformMatrix3fv(this.addr,!1,Gc),we(e,n)}}function Lp(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Te(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),we(e,t)}else{if(Te(e,n))return;Hc.set(n),i.uniformMatrix4fv(this.addr,!1,Hc),we(e,n)}}function Dp(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Np(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;i.uniform2iv(this.addr,t),we(e,t)}}function Up(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Te(e,t))return;i.uniform3iv(this.addr,t),we(e,t)}}function Fp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;i.uniform4iv(this.addr,t),we(e,t)}}function Op(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Bp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;i.uniform2uiv(this.addr,t),we(e,t)}}function zp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Te(e,t))return;i.uniform3uiv(this.addr,t),we(e,t)}}function kp(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;i.uniform4uiv(this.addr,t),we(e,t)}}function Vp(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Ko.compareFunction=e.isReversedDepthBuffer()?ya:xa,r=Ko):r=rh,e.setTexture2D(t||r,s)}function Hp(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||oh,s)}function Gp(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||lh,s)}function Wp(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||ah,s)}function qp(i){switch(i){case 5126:return wp;case 35664:return Ap;case 35665:return Rp;case 35666:return Cp;case 35674:return Pp;case 35675:return Ip;case 35676:return Lp;case 5124:case 35670:return Dp;case 35667:case 35671:return Np;case 35668:case 35672:return Up;case 35669:case 35673:return Fp;case 5125:return Op;case 36294:return Bp;case 36295:return zp;case 36296:return kp;case 35678:case 36198:case 36298:case 36306:case 35682:return Vp;case 35679:case 36299:case 36307:return Hp;case 35680:case 36300:case 36308:case 36293:return Gp;case 36289:case 36303:case 36311:case 36292:return Wp}}function Xp(i,t){i.uniform1fv(this.addr,t)}function Yp(i,t){let e=_s(t,this.size,2);i.uniform2fv(this.addr,e)}function Zp(i,t){let e=_s(t,this.size,3);i.uniform3fv(this.addr,e)}function Jp(i,t){let e=_s(t,this.size,4);i.uniform4fv(this.addr,e)}function $p(i,t){let e=_s(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Kp(i,t){let e=_s(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Qp(i,t){let e=_s(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function jp(i,t){i.uniform1iv(this.addr,t)}function tm(i,t){i.uniform2iv(this.addr,t)}function em(i,t){i.uniform3iv(this.addr,t)}function nm(i,t){i.uniform4iv(this.addr,t)}function im(i,t){i.uniform1uiv(this.addr,t)}function sm(i,t){i.uniform2uiv(this.addr,t)}function rm(i,t){i.uniform3uiv(this.addr,t)}function am(i,t){i.uniform4uiv(this.addr,t)}function om(i,t,e){let n=this.cache,s=t.length,r=wa(e,s);Te(n,r)||(i.uniform1iv(this.addr,r),we(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Ko:a=rh;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function lm(i,t,e){let n=this.cache,s=t.length,r=wa(e,s);Te(n,r)||(i.uniform1iv(this.addr,r),we(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||oh,r[a])}function cm(i,t,e){let n=this.cache,s=t.length,r=wa(e,s);Te(n,r)||(i.uniform1iv(this.addr,r),we(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||lh,r[a])}function hm(i,t,e){let n=this.cache,s=t.length,r=wa(e,s);Te(n,r)||(i.uniform1iv(this.addr,r),we(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||ah,r[a])}function um(i){switch(i){case 5126:return Xp;case 35664:return Yp;case 35665:return Zp;case 35666:return Jp;case 35674:return $p;case 35675:return Kp;case 35676:return Qp;case 5124:case 35670:return jp;case 35667:case 35671:return tm;case 35668:case 35672:return em;case 35669:case 35673:return nm;case 5125:return im;case 36294:return sm;case 36295:return rm;case 36296:return am;case 35678:case 36198:case 36298:case 36306:case 35682:return om;case 35679:case 36299:case 36307:return lm;case 35680:case 36300:case 36308:case 36293:return cm;case 36289:case 36303:case 36311:case 36292:return hm}}var Qo=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=qp(e.type)}},jo=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=um(e.type)}},tl=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],n)}}},Jo=/(\w+)(\])?(\[|\.)?/g;function qc(i,t){i.seq.push(t),i.map[t.id]=t}function dm(i,t,e){let n=i.name,s=n.length;for(Jo.lastIndex=0;;){let r=Jo.exec(n),a=Jo.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){qc(e,c===void 0?new Qo(o,i,t):new jo(o,i,t));break}else{let p=e.map[o];p===void 0&&(p=new tl(o),qc(e,p)),e=p}}}var gs=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){let o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);dm(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&n.push(a)}return n}};function Xc(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var fm=37297,pm=0;function mm(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}var Yc=new Nt;function gm(i){kt._getMatrix(Yc,kt.workingColorSpace,i);let t=`mat3( ${Yc.elements.map(e=>e.toFixed(4))} )`;switch(kt.getTransfer(i)){case Ns:return[t,"LinearTransferOETF"];case Jt:return[t,"sRGBTransferOETF"];default:return It("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Zc(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+mm(i.getShaderSource(t),o)}else return r}function _m(i,t){let e=gm(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}var xm={[sr]:"Linear",[rr]:"Reinhard",[ar]:"Cineon",[wi]:"ACESFilmic",[lr]:"AgX",[cr]:"Neutral",[or]:"Custom"};function ym(i,t){let e=xm[t];return e===void 0?(It("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var Ma=new L;function vm(){kt.getLuminanceCoefficients(Ma);let i=Ma.x.toFixed(4),t=Ma.y.toFixed(4),e=Ma.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Mm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Mr).join(`
`)}function Sm(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function bm(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Mr(i){return i!==""}function Jc(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function $c(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Em=/^[ \t]*#include +<([\w\d./]+)>/gm;function el(i){return i.replace(Em,wm)}var Tm=new Map;function wm(i,t){let e=Bt[t];if(e===void 0){let n=Tm.get(t);if(n!==void 0)e=Bt[n],It('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return el(e)}var Am=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Kc(i){return i.replace(Am,Rm)}function Rm(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Qc(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var Cm={[ir]:"SHADOWMAP_TYPE_PCF",[hs]:"SHADOWMAP_TYPE_VSM"};function Pm(i){return Cm[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Im={[ui]:"ENVMAP_TYPE_CUBE",[Ai]:"ENVMAP_TYPE_CUBE",[hr]:"ENVMAP_TYPE_CUBE_UV"};function Lm(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Im[i.envMapMode]||"ENVMAP_TYPE_CUBE"}var Dm={[Ai]:"ENVMAP_MODE_REFRACTION"};function Nm(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Dm[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Um={[To]:"ENVMAP_BLENDING_MULTIPLY",[gc]:"ENVMAP_BLENDING_MIX",[_c]:"ENVMAP_BLENDING_ADD"};function Fm(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Um[i.combine]||"ENVMAP_BLENDING_NONE"}function Om(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Bm(i,t,e,n){let s=i.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=Pm(e),c=Lm(e),h=Nm(e),p=Fm(e),u=Om(e),m=Mm(e),x=Sm(r),b=s.createProgram(),f,d,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(Mr).join(`
`),f.length>0&&(f+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(Mr).join(`
`),d.length>0&&(d+=`
`)):(f=[Qc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Mr).join(`
`),d=[Qc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+p:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==vn?"#define TONE_MAPPING":"",e.toneMapping!==vn?Bt.tonemapping_pars_fragment:"",e.toneMapping!==vn?ym("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Bt.colorspace_pars_fragment,_m("linearToOutputTexel",e.outputColorSpace),vm(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Mr).join(`
`)),a=el(a),a=Jc(a,e),a=$c(a,e),o=el(o),o=Jc(o,e),o=$c(o,e),a=Kc(a),o=Kc(o),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,f=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,d=["#define varying in",e.glslVersion===No?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===No?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);let C=M+f+a,v=M+d+o,E=Xc(s,s.VERTEX_SHADER,C),T=Xc(s,s.FRAGMENT_SHADER,v);s.attachShader(b,E),s.attachShader(b,T),e.index0AttributeName!==void 0?s.bindAttribLocation(b,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(b,0,"position"),s.linkProgram(b);function R(P){if(i.debug.checkShaderErrors){let U=s.getProgramInfoLog(b)||"",B=s.getShaderInfoLog(E)||"",D=s.getShaderInfoLog(T)||"",H=U.trim(),Z=B.trim(),J=D.trim(),nt=!0,q=!0;if(s.getProgramParameter(b,s.LINK_STATUS)===!1)if(nt=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,b,E,T);else{let j=Zc(s,E,"vertex"),et=Zc(s,T,"fragment");Lt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(b,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+H+`
`+j+`
`+et)}else H!==""?It("WebGLProgram: Program Info Log:",H):(Z===""||J==="")&&(q=!1);q&&(P.diagnostics={runnable:nt,programLog:H,vertexShader:{log:Z,prefix:f},fragmentShader:{log:J,prefix:d}})}s.deleteShader(E),s.deleteShader(T),_=new gs(s,b),S=bm(s,b)}let _;this.getUniforms=function(){return _===void 0&&R(this),_};let S;this.getAttributes=function(){return S===void 0&&R(this),S};let A=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return A===!1&&(A=s.getProgramParameter(b,fm)),A},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(b),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=pm++,this.cacheKey=t,this.usedTimes=1,this.program=b,this.vertexShader=E,this.fragmentShader=T,this}var zm=0,nl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new il(t),e.set(t,n)),n}},il=class{constructor(t){this.id=zm++,this.code=t,this.usedTimes=0}};function km(i){return i===pi||i===gr||i===_r}function Vm(i,t,e,n,s,r){let a=new Os,o=new nl,l=new Set,c=[],h=new Map,p=n.logarithmicDepthBuffer,u=n.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(_){return l.add(_),_===0?"uv":`uv${_}`}function b(_,S,A,P,U,B){let D=P.fog,H=U.geometry,Z=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?P.environment:null,J=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,nt=t.get(_.envMap||Z,J),q=nt&&nt.mapping===hr?nt.image.height:null,j=m[_.type];_.precision!==null&&(u=n.getMaxPrecision(_.precision),u!==_.precision&&It("WebGLProgram.getParameters:",_.precision,"not supported, using",u,"instead."));let et=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,Rt=et!==void 0?et.length:0,Tt=0;H.morphAttributes.position!==void 0&&(Tt=1),H.morphAttributes.normal!==void 0&&(Tt=2),H.morphAttributes.color!==void 0&&(Tt=3);let ie,Xt,$t,X;if(j){let re=Dn[j];ie=re.vertexShader,Xt=re.fragmentShader}else{ie=_.vertexShader,Xt=_.fragmentShader;let re=o.getVertexShaderStage(_),Kt=o.getFragmentShaderStage(_);o.update(_,re,Kt),$t=re.id,X=Kt.id}let Q=i.getRenderTarget(),xt=i.state.buffers.depth.getReversed(),Ut=U.isInstancedMesh===!0,gt=U.isBatchedMesh===!0,zt=!!_.map,be=!!_.matcap,Vt=!!nt,Zt=!!_.aoMap,se=!!_.lightMap,Gt=!!_.bumpMap&&_.wireframe===!1,he=!!_.normalMap,Ae=!!_.displacementMap,Je=!!_.emissiveMap,fe=!!_.metalnessMap,xe=!!_.roughnessMap,F=_.anisotropy>0,Oe=_.clearcoat>0,te=_.dispersion>0,w=_.retroreflectivity>0,g=_.iridescence>0,O=_.sheen>0,V=_.transmission>0,W=F&&!!_.anisotropyMap,it=Oe&&!!_.clearcoatMap,st=Oe&&!!_.clearcoatNormalMap,Y=Oe&&!!_.clearcoatRoughnessMap,K=g&&!!_.iridescenceMap,rt=g&&!!_.iridescenceThicknessMap,bt=O&&!!_.sheenColorMap,ht=O&&!!_.sheenRoughnessMap,at=!!_.specularMap,Et=!!_.specularColorMap,Pt=!!_.specularIntensityMap,Ft=V&&!!_.transmissionMap,N=V&&!!_.thicknessMap,ot=!!_.gradientMap,$=!!_.alphaMap,lt=_.alphaTest>0,pt=!!_.alphaHash,tt=!!_.extensions,wt=vn;_.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(wt=i.toneMapping);let Mt={shaderID:j,shaderType:_.type,shaderName:_.name,vertexShader:ie,fragmentShader:Xt,defines:_.defines,customVertexShaderID:$t,customFragmentShaderID:X,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:u,batching:gt,batchingColor:gt&&U._colorsTexture!==null,instancing:Ut,instancingColor:Ut&&U.instanceColor!==null,instancingMorph:Ut&&U.morphTexture!==null,outputColorSpace:Q===null?i.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:kt.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:zt,matcap:be,envMap:Vt,envMapMode:Vt&&nt.mapping,envMapCubeUVHeight:q,aoMap:Zt,lightMap:se,bumpMap:Gt,normalMap:he,displacementMap:Ae,emissiveMap:Je,normalMapObjectSpace:he&&_.normalMapType===vc,normalMapTangentSpace:he&&_.normalMapType===_a,packedNormalMap:he&&_.normalMapType===_a&&km(_.normalMap.format),metalnessMap:fe,roughnessMap:xe,anisotropy:F,anisotropyMap:W,clearcoat:Oe,clearcoatMap:it,clearcoatNormalMap:st,clearcoatRoughnessMap:Y,dispersion:te,retroreflection:w,iridescence:g,iridescenceMap:K,iridescenceThicknessMap:rt,sheen:O,sheenColorMap:bt,sheenRoughnessMap:ht,specularMap:at,specularColorMap:Et,specularIntensityMap:Pt,transmission:V,transmissionMap:Ft,thicknessMap:N,gradientMap:ot,opaque:_.transparent===!1&&_.blending===us&&_.alphaToCoverage===!1,alphaMap:$,alphaTest:lt,alphaHash:pt,combine:_.combine,mapUv:zt&&x(_.map.channel),aoMapUv:Zt&&x(_.aoMap.channel),lightMapUv:se&&x(_.lightMap.channel),bumpMapUv:Gt&&x(_.bumpMap.channel),normalMapUv:he&&x(_.normalMap.channel),displacementMapUv:Ae&&x(_.displacementMap.channel),emissiveMapUv:Je&&x(_.emissiveMap.channel),metalnessMapUv:fe&&x(_.metalnessMap.channel),roughnessMapUv:xe&&x(_.roughnessMap.channel),anisotropyMapUv:W&&x(_.anisotropyMap.channel),clearcoatMapUv:it&&x(_.clearcoatMap.channel),clearcoatNormalMapUv:st&&x(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Y&&x(_.clearcoatRoughnessMap.channel),iridescenceMapUv:K&&x(_.iridescenceMap.channel),iridescenceThicknessMapUv:rt&&x(_.iridescenceThicknessMap.channel),sheenColorMapUv:bt&&x(_.sheenColorMap.channel),sheenRoughnessMapUv:ht&&x(_.sheenRoughnessMap.channel),specularMapUv:at&&x(_.specularMap.channel),specularColorMapUv:Et&&x(_.specularColorMap.channel),specularIntensityMapUv:Pt&&x(_.specularIntensityMap.channel),transmissionMapUv:Ft&&x(_.transmissionMap.channel),thicknessMapUv:N&&x(_.thicknessMap.channel),alphaMapUv:$&&x(_.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(he||F),vertexNormals:!!H.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!H.attributes.uv&&(zt||$),fog:!!D,useFog:_.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||H.attributes.normal===void 0&&he===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:xt,skinning:U.isSkinnedMesh===!0,hasPositionAttribute:H.attributes.position!==void 0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:Rt,morphTextureStride:Tt,numSunLights:S.sun.length,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numSunLightShadows:S.sunShadowMap.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numLightProbeGrids:B.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&A.length>0,shadowMapType:i.shadowMap.type,toneMapping:wt,decodeVideoTexture:zt&&_.map.isVideoTexture===!0&&kt.getTransfer(_.map.colorSpace)===Jt,decodeVideoTextureEmissive:Je&&_.emissiveMap.isVideoTexture===!0&&kt.getTransfer(_.emissiveMap.colorSpace)===Jt,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===cn,flipSided:_.side===Xe,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:tt&&_.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(tt&&_.extensions.multiDraw===!0||gt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Mt.vertexUv1s=l.has(1),Mt.vertexUv2s=l.has(2),Mt.vertexUv3s=l.has(3),l.clear(),Mt}function f(_){let S=[];if(_.shaderID?S.push(_.shaderID):(S.push(_.customVertexShaderID),S.push(_.customFragmentShaderID)),_.defines!==void 0)for(let A in _.defines)S.push(A),S.push(_.defines[A]);return _.isRawShaderMaterial===!1&&(d(S,_),M(S,_),S.push(i.outputColorSpace)),S.push(_.customProgramCacheKey),S.join()}function d(_,S){_.push(S.precision),_.push(S.outputColorSpace),_.push(S.envMapMode),_.push(S.envMapCubeUVHeight),_.push(S.mapUv),_.push(S.alphaMapUv),_.push(S.lightMapUv),_.push(S.aoMapUv),_.push(S.bumpMapUv),_.push(S.normalMapUv),_.push(S.displacementMapUv),_.push(S.emissiveMapUv),_.push(S.metalnessMapUv),_.push(S.roughnessMapUv),_.push(S.anisotropyMapUv),_.push(S.clearcoatMapUv),_.push(S.clearcoatNormalMapUv),_.push(S.clearcoatRoughnessMapUv),_.push(S.iridescenceMapUv),_.push(S.iridescenceThicknessMapUv),_.push(S.sheenColorMapUv),_.push(S.sheenRoughnessMapUv),_.push(S.specularMapUv),_.push(S.specularColorMapUv),_.push(S.specularIntensityMapUv),_.push(S.transmissionMapUv),_.push(S.thicknessMapUv),_.push(S.combine),_.push(S.fogExp2),_.push(S.sizeAttenuation),_.push(S.morphTargetsCount),_.push(S.morphAttributeCount),_.push(S.numSunLights),_.push(S.numDirLights),_.push(S.numPointLights),_.push(S.numSpotLights),_.push(S.numSpotLightMaps),_.push(S.numHemiLights),_.push(S.numRectAreaLights),_.push(S.numSunLightShadows),_.push(S.numDirLightShadows),_.push(S.numPointLightShadows),_.push(S.numSpotLightShadows),_.push(S.numSpotLightShadowsWithMaps),_.push(S.numLightProbes),_.push(S.shadowMapType),_.push(S.toneMapping),_.push(S.numClippingPlanes),_.push(S.numClipIntersection),_.push(S.depthPacking)}function M(_,S){a.disableAll(),S.instancing&&a.enable(0),S.instancingColor&&a.enable(1),S.instancingMorph&&a.enable(2),S.matcap&&a.enable(3),S.envMap&&a.enable(4),S.normalMapObjectSpace&&a.enable(5),S.normalMapTangentSpace&&a.enable(6),S.clearcoat&&a.enable(7),S.iridescence&&a.enable(8),S.alphaTest&&a.enable(9),S.vertexColors&&a.enable(10),S.vertexAlphas&&a.enable(11),S.vertexUv1s&&a.enable(12),S.vertexUv2s&&a.enable(13),S.vertexUv3s&&a.enable(14),S.vertexTangents&&a.enable(15),S.anisotropy&&a.enable(16),S.alphaHash&&a.enable(17),S.batching&&a.enable(18),S.dispersion&&a.enable(19),S.retroreflection&&a.enable(24),S.batchingColor&&a.enable(20),S.gradientMap&&a.enable(21),S.packedNormalMap&&a.enable(22),S.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),S.numLightProbeGrids>0&&a.enable(22),S.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function C(_){let S=m[_.type],A;if(S){let P=Dn[S];A=Wn.clone(P.uniforms)}else A=_.uniforms;return A}function v(_,S){let A=h.get(S);return A!==void 0?++A.usedTimes:(A=new Bm(i,S,_,s),c.push(A),h.set(S,A)),A}function E(_){if(--_.usedTimes===0){let S=c.indexOf(_);c[S]=c[c.length-1],c.pop(),h.delete(_.cacheKey),_.destroy()}}function T(_){o.remove(_)}function R(){o.dispose()}return{getParameters:b,getProgramCacheKey:f,getUniforms:C,acquireProgram:v,releaseProgram:E,releaseShaderCache:T,programs:c,dispose:R}}function Hm(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function Gm(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function jc(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function th(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(u){let m=0;return u.isInstancedMesh&&(m+=2),u.isSkinnedMesh&&(m+=1),m}function o(u,m,x,b,f,d){let M=i[t];return M===void 0?(M={id:u.id,object:u,geometry:m,material:x,materialVariant:a(u),groupOrder:b,renderOrder:u.renderOrder,z:f,group:d},i[t]=M):(M.id=u.id,M.object=u,M.geometry=m,M.material=x,M.materialVariant=a(u),M.groupOrder=b,M.renderOrder=u.renderOrder,M.z=f,M.group=d),t++,M}function l(u,m,x,b,f,d,M){M.reversedDepth===!0&&(f=-f);let C=o(u,m,x,b,f,d);x.transmission>0?n.push(C):x.transparent===!0?s.push(C):e.push(C)}function c(u,m,x,b,f,d){let M=o(u,m,x,b,f,d);x.transmission>0?n.unshift(M):x.transparent===!0?s.unshift(M):e.unshift(M)}function h(u,m){e.length>1&&e.sort(u||Gm),n.length>1&&n.sort(m||jc),s.length>1&&s.sort(m||jc)}function p(){for(let u=t,m=i.length;u<m;u++){let x=i[u];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:p,sort:h}}function Wm(){let i=new WeakMap;function t(n,s){let r=i.get(n),a;return r===void 0?(a=new th,i.set(n,[a])):s>=r.length?(a=new th,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function qm(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new L,color:new Ct};break;case"SpotLight":e={position:new L,direction:new L,color:new Ct,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new Ct,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new Ct,groundColor:new Ct};break;case"RectAreaLight":e={color:new Ct,position:new L,halfWidth:new L,halfHeight:new L};break}return i[t.id]=e,e}}}function Xm(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new At};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new At};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new At,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var Ym=0;function Zm(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Jm(i){let t=new qm,e=Xm(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new L);let s=new L,r=new ue,a=new ue;function o(c){let h=0,p=0,u=0;for(let U=0;U<9;U++)n.probe[U].set(0,0,0);let m=0,x=0,b=0,f=0,d=0,M=0,C=0,v=0,E=0,T=0,R=0,_=0,S=0,A=0;c.sort(Zm);for(let U=0,B=c.length;U<B;U++){let D=c[U],H=D.color,Z=D.intensity,J=D.distance,nt=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===pi?nt=D.shadow.map.texture:nt=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)h+=H.r*Z,p+=H.g*Z,u+=H.b*Z;else if(D.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(D.sh.coefficients[q],Z);A++}else if(D.isSunLight){let q=t.get(D);if(q.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let j=D.shadow,et=e.get(D);et.shadowIntensity=j.intensity,et.shadowBias=j.bias,et.shadowNormalBias=j.normalBias,et.shadowRadius=j.radius,et.shadowMapSize.copy(j.mapSize).multiply(j.getFrameExtents()),n.sunShadow[x]=et,n.sunShadowMap[x]=nt;let Rt=j.getViewportCount();for(let Tt=0;Tt<Rt;Tt++)n.sunShadowMatrix[b+Tt]=j.getMatrix(Tt),n.sunShadowCascade[b+Tt]=j._cascadeData[Tt];b+=Rt,x++}n.sun[m]=q,m++}else if(D.isDirectionalLight){let q=t.get(D);if(q.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let j=D.shadow,et=e.get(D);et.shadowIntensity=j.intensity,et.shadowBias=j.bias,et.shadowNormalBias=j.normalBias,et.shadowRadius=j.radius,et.shadowMapSize=j.mapSize,n.directionalShadow[f]=et,n.directionalShadowMap[f]=nt,n.directionalShadowMatrix[f]=D.shadow.matrix,E++}n.directional[f]=q,f++}else if(D.isSpotLight){let q=t.get(D);q.position.setFromMatrixPosition(D.matrixWorld),q.color.copy(H).multiplyScalar(Z),q.distance=J,q.coneCos=Math.cos(D.angle),q.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),q.decay=D.decay,n.spot[M]=q;let j=D.shadow;if(D.map&&(n.spotLightMap[_]=D.map,_++,j.updateMatrices(D),D.castShadow&&S++),n.spotLightMatrix[M]=j.matrix,D.castShadow){let et=e.get(D);et.shadowIntensity=j.intensity,et.shadowBias=j.bias,et.shadowNormalBias=j.normalBias,et.shadowRadius=j.radius,et.shadowMapSize=j.mapSize,n.spotShadow[M]=et,n.spotShadowMap[M]=nt,R++}M++}else if(D.isRectAreaLight){let q=t.get(D);q.color.copy(H).multiplyScalar(Z),q.halfWidth.set(D.width*.5,0,0),q.halfHeight.set(0,D.height*.5,0),n.rectArea[C]=q,C++}else if(D.isPointLight){let q=t.get(D);if(q.color.copy(D.color).multiplyScalar(D.intensity),q.distance=D.distance,q.decay=D.decay,D.castShadow){let j=D.shadow,et=e.get(D);et.shadowIntensity=j.intensity,et.shadowBias=j.bias,et.shadowNormalBias=j.normalBias,et.shadowRadius=j.radius,et.shadowMapSize=j.mapSize,et.shadowCameraNear=j.camera.near,et.shadowCameraFar=j.camera.far,n.pointShadow[d]=et,n.pointShadowMap[d]=nt,n.pointShadowMatrix[d]=D.shadow.matrix,T++}n.point[d]=q,d++}else if(D.isHemisphereLight){let q=t.get(D);q.skyColor.copy(D.color).multiplyScalar(Z),q.groundColor.copy(D.groundColor).multiplyScalar(Z),n.hemi[v]=q,v++}}C>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ut.LTC_FLOAT_1,n.rectAreaLTC2=ut.LTC_FLOAT_2):(n.rectAreaLTC1=ut.LTC_HALF_1,n.rectAreaLTC2=ut.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=p,n.ambient[2]=u;let P=n.hash;(P.sunLength!==m||P.directionalLength!==f||P.pointLength!==d||P.spotLength!==M||P.rectAreaLength!==C||P.hemiLength!==v||P.numSunShadows!==x||P.numDirectionalShadows!==E||P.numPointShadows!==T||P.numSpotShadows!==R||P.numSpotMaps!==_||P.numLightProbes!==A)&&(n.sun.length=m,n.directional.length=f,n.spot.length=M,n.rectArea.length=C,n.point.length=d,n.hemi.length=v,n.sunShadow.length=x,n.sunShadowMap.length=x,n.sunShadowMatrix.length=b,n.sunShadowCascade.length=b,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.directionalShadowMatrix.length=E,n.pointShadow.length=T,n.pointShadowMap.length=T,n.pointShadowMatrix.length=T,n.spotShadow.length=R,n.spotShadowMap.length=R,n.spotLightMatrix.length=R+_-S,n.spotLightMap.length=_,n.numSpotLightShadowsWithMaps=S,n.numLightProbes=A,P.sunLength=m,P.directionalLength=f,P.pointLength=d,P.spotLength=M,P.rectAreaLength=C,P.hemiLength=v,P.numSunShadows=x,P.numDirectionalShadows=E,P.numPointShadows=T,P.numSpotShadows=R,P.numSpotMaps=_,P.numLightProbes=A,n.version=Ym++)}function l(c,h){let p=0,u=0,m=0,x=0,b=0,f=0,d=h.matrixWorldInverse;for(let M=0,C=c.length;M<C;M++){let v=c[M];if(v.isSunLight){let E=n.sun[p];E.direction.setFromMatrixPosition(v.matrixWorld),E.direction.transformDirection(d),p++}else if(v.isDirectionalLight){let E=n.directional[u];E.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(d),u++}else if(v.isSpotLight){let E=n.spot[x];E.position.setFromMatrixPosition(v.matrixWorld),E.position.applyMatrix4(d),E.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(d),x++}else if(v.isRectAreaLight){let E=n.rectArea[b];E.position.setFromMatrixPosition(v.matrixWorld),E.position.applyMatrix4(d),a.identity(),r.copy(v.matrixWorld),r.premultiply(d),a.extractRotation(r),E.halfWidth.set(v.width*.5,0,0),E.halfHeight.set(0,v.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),b++}else if(v.isPointLight){let E=n.point[m];E.position.setFromMatrixPosition(v.matrixWorld),E.position.applyMatrix4(d),m++}else if(v.isHemisphereLight){let E=n.hemi[f];E.direction.setFromMatrixPosition(v.matrixWorld),E.direction.transformDirection(d),f++}}}return{setup:o,setupView:l,state:n}}function eh(i){let t=new Jm(i),e=[],n=[],s=[];function r(u){p.camera=u,e.length=0,n.length=0,s.length=0}function a(u){e.push(u)}function o(u){n.push(u)}function l(u){s.push(u)}function c(){t.setup(e)}function h(u){t.setupView(e,u)}let p={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:p,setupLights:c,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function $m(i){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new eh(i),t.set(s,[o])):r>=a.length?(o=new eh(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}var Km=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Qm=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,jm=[new L(1,0,0),new L(-1,0,0),new L(0,1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1)],t1=[new L(0,-1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1),new L(0,-1,0),new L(0,-1,0)],nh=new ue,vr=new L,$o=new L;function e1(i,t,e){let n=new as,s=new At,r=new At,a=new de,o=new g0,l=new _0,c={},h=e.maxTextureSize,p={[hi]:Xe,[Xe]:hi,[cn]:cn},u=new me({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new At},radius:{value:4}},vertexShader:Km,fragmentShader:Qm}),m=u.clone();m.defines.HORIZONTAL_PASS=1;let x=new pe;x.setAttribute("position",new Ee(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let b=new Dt(x,u),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ir;let d=this.type;this.render=function(T,R,_){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||T.length===0)return;this.type===I0&&(It("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=ir);let S=i.getRenderTarget(),A=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),U=i.state;U.setBlending(hn),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);let B=d!==this.type;B&&R.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach(H=>H.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,H=T.length;D<H;D++){let Z=T[D],J=Z.shadow;if(J===void 0){It("WebGLShadowMap:",Z,"has no shadow.");continue}if(J.autoUpdate===!1&&J.needsUpdate===!1)continue;s.copy(J.mapSize);let nt=J.getFrameExtents();s.multiply(nt),r.copy(J.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/nt.x),s.x=r.x*nt.x,J.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/nt.y),s.y=r.y*nt.y,J.mapSize.y=r.y));let q=i.state.buffers.depth.getReversed();if(J.camera._reversedDepth=q,J.map===null||B===!0){if(J.map!==null&&(J.map.depthTexture!==null&&(J.map.depthTexture.dispose(),J.map.depthTexture=null),J.map.dispose()),this.type===hs){if(Z.isPointLight){It("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}J.map=new Me(s.x,s.y,{format:pi,type:Ue,minFilter:Le,magFilter:Le,generateMipmaps:!1}),J.map.texture.name=Z.name+".shadowMap",J.map.depthTexture=new si(s.x,s.y,Sn),J.map.depthTexture.name=Z.name+".shadowMapDepth",J.map.depthTexture.format=Cn,J.map.depthTexture.compareFunction=null,J.map.depthTexture.minFilter=Ce,J.map.depthTexture.magFilter=Ce}else Z.isPointLight?(J.map=new ba(s.x),J.map.depthTexture=new p0(s.x,Mn)):(J.map=new Me(s.x,s.y),J.map.depthTexture=new si(s.x,s.y,Mn)),J.map.depthTexture.name=Z.name+".shadowMap",J.map.depthTexture.format=Cn,this.type===ir?(J.map.depthTexture.compareFunction=q?ya:xa,J.map.depthTexture.minFilter=Le,J.map.depthTexture.magFilter=Le):(J.map.depthTexture.compareFunction=null,J.map.depthTexture.minFilter=Ce,J.map.depthTexture.magFilter=Ce);J.camera.updateProjectionMatrix()}J.map.isWebGLCubeRenderTarget!==!0&&(J.map.width!==s.x||J.map.height!==s.y)&&J.map.setSize(s.x,s.y);let j=J.map.isWebGLCubeRenderTarget?6:J.getViewportCount();Z.isPointLight!==!0&&J.updateMatrices(Z,_);for(let et=0;et<j;et++){let Rt=J.getCamera(et);if(Z.isPointLight){let Tt=J.camera,ie=J.matrix,Xt=Z.distance||Tt.far;Xt!==Tt.far&&(Tt.far=Xt,Tt.updateProjectionMatrix()),vr.setFromMatrixPosition(Z.matrixWorld),Tt.position.copy(vr),$o.copy(Tt.position),$o.add(jm[et]),Tt.up.copy(t1[et]),Tt.lookAt($o),Tt.updateMatrixWorld(),ie.makeTranslation(-vr.x,-vr.y,-vr.z),nh.multiplyMatrices(Tt.projectionMatrix,Tt.matrixWorldInverse),J._frustum.setFromProjectionMatrix(nh,Tt.coordinateSystem,Tt.reversedDepth)}if(J.map.isWebGLCubeRenderTarget)i.setRenderTarget(J.map,et),i.clear();else{et===0&&(i.setRenderTarget(J.map),i.clear());let Tt=J.getViewport(et);a.set(r.x*Tt.x,r.y*Tt.y,r.x*Tt.z,r.y*Tt.w),U.viewport(a)}n=J.getFrustum(et),v(R,_,Rt,Z,this.type)}J.isPointLightShadow!==!0&&this.type===hs&&M(J,_),J.needsUpdate=!1}d=this.type,f.needsUpdate=!1,i.setRenderTarget(S,A,P)};function M(T,R){let _=t.update(b);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,m.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,m.needsUpdate=!0),T.mapPass===null?T.mapPass=new Me(s.x,s.y,{format:pi,type:Ue}):(T.mapPass.width!==T.map.width||T.mapPass.height!==T.map.height)&&T.mapPass.setSize(T.map.width,T.map.height),u.uniforms.shadow_pass.value=T.map.depthTexture,u.uniforms.resolution.value.set(T.map.width,T.map.height),u.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(R,null,_,u,b,null),m.uniforms.shadow_pass.value=T.mapPass.texture,m.uniforms.resolution.value.set(T.map.width,T.map.height),m.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(R,null,_,m,b,null)}function C(T,R,_,S){let A=null,P=_.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(P!==void 0)A=P;else if(A=_.isPointLight===!0?l:o,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){let U=A.uuid,B=R.uuid,D=c[U];D===void 0&&(D={},c[U]=D);let H=D[B];H===void 0&&(H=A.clone(),D[B]=H,R.addEventListener("dispose",E)),A=H}if(A.visible=R.visible,A.wireframe=R.wireframe,S===hs?A.side=R.shadowSide!==null?R.shadowSide:R.side:A.side=R.shadowSide!==null?R.shadowSide:p[R.side],A.alphaMap=R.alphaMap,A.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,A.map=R.map,A.clipShadows=R.clipShadows,A.clippingPlanes=R.clippingPlanes,A.clipIntersection=R.clipIntersection,A.displacementMap=R.displacementMap,A.displacementScale=R.displacementScale,A.displacementBias=R.displacementBias,A.wireframeLinewidth=R.wireframeLinewidth,A.linewidth=R.linewidth,_.isPointLight===!0&&A.isMeshDistanceMaterial===!0){let U=i.properties.get(A);U.light=_}return A}function v(T,R,_,S,A){if(T.visible===!1)return;if(T.layers.test(R.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&A===hs)&&(!T.frustumCulled||T.intersectsFrustum(n))){T.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,T.matrixWorld);let B=t.update(T),D=T.material;if(Array.isArray(D)){let H=B.groups;for(let Z=0,J=H.length;Z<J;Z++){let nt=H[Z],q=D[nt.materialIndex];if(q&&q.visible){let j=C(T,q,S,A);T.onBeforeShadow(i,T,R,_,B,j,nt),i.renderBufferDirect(_,null,B,j,T,nt),T.onAfterShadow(i,T,R,_,B,j,nt)}}}else if(D.visible){let H=C(T,D,S,A);T.onBeforeShadow(i,T,R,_,B,H,null),i.renderBufferDirect(_,null,B,H,T,null),T.onAfterShadow(i,T,R,_,B,H,null)}}let U=T.children;for(let B=0,D=U.length;B<D;B++)v(U[B],R,_,S,A)}function E(T){T.target.removeEventListener("dispose",E);for(let _ in c){let S=c[_],A=T.target.uuid;A in S&&(S[A].dispose(),delete S[A])}}}function n1(i,t){function e(){let N=!1,ot=new de,$=null,lt=new de(0,0,0,0);return{setMask:function(pt){$!==pt&&!N&&(i.colorMask(pt,pt,pt,pt),$=pt)},setLocked:function(pt){N=pt},setClear:function(pt,tt,wt,Mt,re){re===!0&&(pt*=Mt,tt*=Mt,wt*=Mt),ot.set(pt,tt,wt,Mt),lt.equals(ot)===!1&&(i.clearColor(pt,tt,wt,Mt),lt.copy(ot))},reset:function(){N=!1,$=null,lt.set(-1,0,0,0)}}}function n(){let N=!1,ot=!1,$=null,lt=null,pt=null;return{setReversed:function(tt){if(ot!==tt){let wt=t.get("EXT_clip_control");tt?wt.clipControlEXT(wt.LOWER_LEFT_EXT,wt.ZERO_TO_ONE_EXT):wt.clipControlEXT(wt.LOWER_LEFT_EXT,wt.NEGATIVE_ONE_TO_ONE_EXT),ot=tt;let Mt=pt;pt=null,this.setClear(Mt)}},getReversed:function(){return ot},setTest:function(tt){tt?Q(i.DEPTH_TEST):xt(i.DEPTH_TEST)},setMask:function(tt){$!==tt&&!N&&(i.depthMask(tt),$=tt)},setFunc:function(tt){if(ot&&(tt=Lc[tt]),lt!==tt){switch(tt){case t0:i.depthFunc(i.NEVER);break;case e0:i.depthFunc(i.ALWAYS);break;case n0:i.depthFunc(i.LESS);break;case ts:i.depthFunc(i.LEQUAL);break;case i0:i.depthFunc(i.EQUAL);break;case s0:i.depthFunc(i.GEQUAL);break;case r0:i.depthFunc(i.GREATER);break;case a0:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}lt=tt}},setLocked:function(tt){N=tt},setClear:function(tt){pt!==tt&&(pt=tt,ot&&(tt=1-tt),i.clearDepth(tt))},reset:function(){N=!1,$=null,lt=null,pt=null,ot=!1}}}function s(){let N=!1,ot=null,$=null,lt=null,pt=null,tt=null,wt=null,Mt=null,re=null;return{setTest:function(Kt){N||(Kt?Q(i.STENCIL_TEST):xt(i.STENCIL_TEST))},setMask:function(Kt){ot!==Kt&&!N&&(i.stencilMask(Kt),ot=Kt)},setFunc:function(Kt,fn,Tn){($!==Kt||lt!==fn||pt!==Tn)&&(i.stencilFunc(Kt,fn,Tn),$=Kt,lt=fn,pt=Tn)},setOp:function(Kt,fn,Tn){(tt!==Kt||wt!==fn||Mt!==Tn)&&(i.stencilOp(Kt,fn,Tn),tt=Kt,wt=fn,Mt=Tn)},setLocked:function(Kt){N=Kt},setClear:function(Kt){re!==Kt&&(i.clearStencil(Kt),re=Kt)},reset:function(){N=!1,ot=null,$=null,lt=null,pt=null,tt=null,wt=null,Mt=null,re=null}}}let r=new e,a=new n,o=new s,l=new WeakMap,c=new WeakMap,h={},p={},u={},m=new WeakMap,x=[],b=null,f=!1,d=null,M=null,C=null,v=null,E=null,T=null,R=null,_=new Ct(0,0,0),S=0,A=!1,P=null,U=null,B=null,D=null,H=null,Z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),J=!1,nt=0,q=i.getParameter(i.VERSION);q.indexOf("WebGL")!==-1?(nt=parseFloat(/^WebGL (\d)/.exec(q)[1]),J=nt>=1):q.indexOf("OpenGL ES")!==-1&&(nt=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),J=nt>=2);let j=null,et={},Rt=i.getParameter(i.SCISSOR_BOX),Tt=i.getParameter(i.VIEWPORT),ie=new de().fromArray(Rt),Xt=new de().fromArray(Tt);function $t(N,ot,$,lt){let pt=new Uint8Array(4),tt=i.createTexture();i.bindTexture(N,tt),i.texParameteri(N,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(N,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let wt=0;wt<$;wt++)N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY?i.texImage3D(ot,0,i.RGBA,1,1,lt,0,i.RGBA,i.UNSIGNED_BYTE,pt):i.texImage2D(ot+wt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,pt);return tt}let X={};X[i.TEXTURE_2D]=$t(i.TEXTURE_2D,i.TEXTURE_2D,1),X[i.TEXTURE_CUBE_MAP]=$t(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),X[i.TEXTURE_2D_ARRAY]=$t(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),X[i.TEXTURE_3D]=$t(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Q(i.DEPTH_TEST),a.setFunc(ts),Gt(!1),he(vo),Q(i.CULL_FACE),Zt(hn);function Q(N){h[N]!==!0&&(i.enable(N),h[N]=!0)}function xt(N){h[N]!==!1&&(i.disable(N),h[N]=!1)}function Ut(N,ot){return u[N]!==ot?(i.bindFramebuffer(N,ot),u[N]=ot,N===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ot),N===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ot),!0):!1}function gt(N,ot){let $=x,lt=!1;if(N){$=m.get(ot),$===void 0&&($=[],m.set(ot,$));let pt=N.textures;if($.length!==pt.length||$[0]!==i.COLOR_ATTACHMENT0){for(let tt=0,wt=pt.length;tt<wt;tt++)$[tt]=i.COLOR_ATTACHMENT0+tt;$.length=pt.length,lt=!0}}else $[0]!==i.BACK&&($[0]=i.BACK,lt=!0);lt&&i.drawBuffers($)}function zt(N){return b!==N?(i.useProgram(N),b=N,!0):!1}let be={[Ti]:i.FUNC_ADD,[jl]:i.FUNC_SUBTRACT,[tc]:i.FUNC_REVERSE_SUBTRACT};be[ec]=i.MIN,be[nc]=i.MAX;let Vt={[ic]:i.ZERO,[sc]:i.ONE,[rc]:i.SRC_COLOR,[bo]:i.SRC_ALPHA,[uc]:i.SRC_ALPHA_SATURATE,[cc]:i.DST_COLOR,[oc]:i.DST_ALPHA,[ac]:i.ONE_MINUS_SRC_COLOR,[Eo]:i.ONE_MINUS_SRC_ALPHA,[hc]:i.ONE_MINUS_DST_COLOR,[lc]:i.ONE_MINUS_DST_ALPHA,[dc]:i.CONSTANT_COLOR,[fc]:i.ONE_MINUS_CONSTANT_COLOR,[pc]:i.CONSTANT_ALPHA,[mc]:i.ONE_MINUS_CONSTANT_ALPHA};function Zt(N,ot,$,lt,pt,tt,wt,Mt,re,Kt){if(N===hn){f===!0&&(xt(i.BLEND),f=!1);return}if(f===!1&&(Q(i.BLEND),f=!0),N!==Ql){if(N!==d||Kt!==A){if((M!==Ti||E!==Ti)&&(i.blendEquation(i.FUNC_ADD),M=Ti,E=Ti),Kt)switch(N){case us:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case In:i.blendFunc(i.ONE,i.ONE);break;case Mo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case So:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Lt("WebGLState: Invalid blending: ",N);break}else switch(N){case us:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case In:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Mo:Lt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case So:Lt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Lt("WebGLState: Invalid blending: ",N);break}C=null,v=null,T=null,R=null,_.set(0,0,0),S=0,d=N,A=Kt}return}pt=pt||ot,tt=tt||$,wt=wt||lt,(ot!==M||pt!==E)&&(i.blendEquationSeparate(be[ot],be[pt]),M=ot,E=pt),($!==C||lt!==v||tt!==T||wt!==R)&&(i.blendFuncSeparate(Vt[$],Vt[lt],Vt[tt],Vt[wt]),C=$,v=lt,T=tt,R=wt),(Mt.equals(_)===!1||re!==S)&&(i.blendColor(Mt.r,Mt.g,Mt.b,re),_.copy(Mt),S=re),d=N,A=!1}function se(N,ot){N.side===cn?xt(i.CULL_FACE):Q(i.CULL_FACE);let $=N.side===Xe;ot&&($=!$),Gt($),N.blending===us&&N.transparent===!1?Zt(hn):Zt(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),a.setFunc(N.depthFunc),a.setTest(N.depthTest),a.setMask(N.depthWrite),r.setMask(N.colorWrite);let lt=N.stencilWrite;o.setTest(lt),lt&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Je(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?Q(i.SAMPLE_ALPHA_TO_COVERAGE):xt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Gt(N){P!==N&&(N?i.frontFace(i.CW):i.frontFace(i.CCW),P=N)}function he(N){N!==$l?(Q(i.CULL_FACE),N!==U&&(N===vo?i.cullFace(i.BACK):N===Kl?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):xt(i.CULL_FACE),U=N}function Ae(N){N!==B&&(J&&i.lineWidth(N),B=N)}function Je(N,ot,$){N?(Q(i.POLYGON_OFFSET_FILL),(D!==ot||H!==$)&&(D=ot,H=$,a.getReversed()&&(ot=-ot),i.polygonOffset(ot,$))):xt(i.POLYGON_OFFSET_FILL)}function fe(N){N?Q(i.SCISSOR_TEST):xt(i.SCISSOR_TEST)}function xe(N){N===void 0&&(N=i.TEXTURE0+Z-1),j!==N&&(i.activeTexture(N),j=N)}function F(N,ot,$){$===void 0&&(j===null?$=i.TEXTURE0+Z-1:$=j);let lt=et[$];lt===void 0&&(lt={type:void 0,texture:void 0},et[$]=lt),(lt.type!==N||lt.texture!==ot)&&(j!==$&&(i.activeTexture($),j=$),i.bindTexture(N,ot||X[N]),lt.type=N,lt.texture=ot)}function Oe(){let N=et[j];N!==void 0&&N.type!==void 0&&(i.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function te(){try{i.compressedTexImage2D(...arguments)}catch(N){Lt("WebGLState:",N)}}function w(){try{i.compressedTexImage3D(...arguments)}catch(N){Lt("WebGLState:",N)}}function g(){try{i.texSubImage2D(...arguments)}catch(N){Lt("WebGLState:",N)}}function O(){try{i.texSubImage3D(...arguments)}catch(N){Lt("WebGLState:",N)}}function V(){try{i.compressedTexSubImage2D(...arguments)}catch(N){Lt("WebGLState:",N)}}function W(){try{i.compressedTexSubImage3D(...arguments)}catch(N){Lt("WebGLState:",N)}}function it(){try{i.texStorage2D(...arguments)}catch(N){Lt("WebGLState:",N)}}function st(){try{i.texStorage3D(...arguments)}catch(N){Lt("WebGLState:",N)}}function Y(){try{i.texImage2D(...arguments)}catch(N){Lt("WebGLState:",N)}}function K(){try{i.texImage3D(...arguments)}catch(N){Lt("WebGLState:",N)}}function rt(N){return p[N]!==void 0?p[N]:i.getParameter(N)}function bt(N,ot){p[N]!==ot&&(i.pixelStorei(N,ot),p[N]=ot)}function ht(N){ie.equals(N)===!1&&(i.scissor(N.x,N.y,N.z,N.w),ie.copy(N))}function at(N){Xt.equals(N)===!1&&(i.viewport(N.x,N.y,N.z,N.w),Xt.copy(N))}function Et(N,ot){let $=c.get(ot);$===void 0&&($=new WeakMap,c.set(ot,$));let lt=$.get(N);lt===void 0&&(lt=i.getUniformBlockIndex(ot,N.name),$.set(N,lt))}function Pt(N,ot){let lt=c.get(ot).get(N);l.get(ot)!==lt&&(i.uniformBlockBinding(ot,lt,N.__bindingPointIndex),l.set(ot,lt))}function Ft(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},p={},j=null,et={},u={},m=new WeakMap,x=[],b=null,f=!1,d=null,M=null,C=null,v=null,E=null,T=null,R=null,_=new Ct(0,0,0),S=0,A=!1,P=null,U=null,B=null,D=null,H=null,ie.set(0,0,i.canvas.width,i.canvas.height),Xt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:Q,disable:xt,bindFramebuffer:Ut,drawBuffers:gt,useProgram:zt,setBlending:Zt,setMaterial:se,setFlipSided:Gt,setCullFace:he,setLineWidth:Ae,setPolygonOffset:Je,setScissorTest:fe,activeTexture:xe,bindTexture:F,unbindTexture:Oe,compressedTexImage2D:te,compressedTexImage3D:w,texImage2D:Y,texImage3D:K,pixelStorei:bt,getParameter:rt,updateUBOMapping:Et,uniformBlockBinding:Pt,texStorage2D:it,texStorage3D:st,texSubImage2D:g,texSubImage3D:O,compressedTexSubImage2D:V,compressedTexSubImage3D:W,scissor:ht,viewport:at,reset:Ft}}function i1(i,t,e,n,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new At,h=new WeakMap,p=new Set,u,m=new WeakMap,x=!1;try{x=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function b(w,g){return x?new OffscreenCanvas(w,g):Us("canvas")}function f(w,g,O){let V=1,W=te(w);if((W.width>O||W.height>O)&&(V=O/Math.max(W.width,W.height)),V<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){let it=Math.floor(V*W.width),st=Math.floor(V*W.height);u===void 0&&(u=b(it,st));let Y=g?b(it,st):u;return Y.width=it,Y.height=st,Y.getContext("2d").drawImage(w,0,0,it,st),It("WebGLRenderer: Texture has been resized from ("+W.width+"x"+W.height+") to ("+it+"x"+st+")."),Y}else return"data"in w&&It("WebGLRenderer: Image in DataTexture is too big ("+W.width+"x"+W.height+")."),w;return w}function d(w){return w.generateMipmaps}function M(w){i.generateMipmap(w)}function C(w){return w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?i.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(w,g,O,V,W,it=!1){if(w!==null){if(i[w]!==void 0)return i[w];It("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let st;V&&(st=t.get("EXT_texture_norm16"),st||It("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Y=g;if(g===i.RED&&(O===i.FLOAT&&(Y=i.R32F),O===i.HALF_FLOAT&&(Y=i.R16F),O===i.UNSIGNED_BYTE&&(Y=i.R8),O===i.UNSIGNED_SHORT&&st&&(Y=st.R16_EXT),O===i.SHORT&&st&&(Y=st.R16_SNORM_EXT)),g===i.RED_INTEGER&&(O===i.UNSIGNED_BYTE&&(Y=i.R8UI),O===i.UNSIGNED_SHORT&&(Y=i.R16UI),O===i.UNSIGNED_INT&&(Y=i.R32UI),O===i.BYTE&&(Y=i.R8I),O===i.SHORT&&(Y=i.R16I),O===i.INT&&(Y=i.R32I)),g===i.RG&&(O===i.FLOAT&&(Y=i.RG32F),O===i.HALF_FLOAT&&(Y=i.RG16F),O===i.UNSIGNED_BYTE&&(Y=i.RG8),O===i.UNSIGNED_SHORT&&st&&(Y=st.RG16_EXT),O===i.SHORT&&st&&(Y=st.RG16_SNORM_EXT)),g===i.RG_INTEGER&&(O===i.UNSIGNED_BYTE&&(Y=i.RG8UI),O===i.UNSIGNED_SHORT&&(Y=i.RG16UI),O===i.UNSIGNED_INT&&(Y=i.RG32UI),O===i.BYTE&&(Y=i.RG8I),O===i.SHORT&&(Y=i.RG16I),O===i.INT&&(Y=i.RG32I)),g===i.RGB_INTEGER&&(O===i.UNSIGNED_BYTE&&(Y=i.RGB8UI),O===i.UNSIGNED_SHORT&&(Y=i.RGB16UI),O===i.UNSIGNED_INT&&(Y=i.RGB32UI),O===i.BYTE&&(Y=i.RGB8I),O===i.SHORT&&(Y=i.RGB16I),O===i.INT&&(Y=i.RGB32I)),g===i.RGBA_INTEGER&&(O===i.UNSIGNED_BYTE&&(Y=i.RGBA8UI),O===i.UNSIGNED_SHORT&&(Y=i.RGBA16UI),O===i.UNSIGNED_INT&&(Y=i.RGBA32UI),O===i.BYTE&&(Y=i.RGBA8I),O===i.SHORT&&(Y=i.RGBA16I),O===i.INT&&(Y=i.RGBA32I)),g===i.RGB&&(O===i.UNSIGNED_SHORT&&st&&(Y=st.RGB16_EXT),O===i.SHORT&&st&&(Y=st.RGB16_SNORM_EXT),O===i.UNSIGNED_INT_5_9_9_9_REV&&(Y=i.RGB9_E5),O===i.UNSIGNED_INT_10F_11F_11F_REV&&(Y=i.R11F_G11F_B10F)),g===i.RGBA){let K=it?Ns:kt.getTransfer(W);O===i.FLOAT&&(Y=i.RGBA32F),O===i.HALF_FLOAT&&(Y=i.RGBA16F),O===i.UNSIGNED_BYTE&&(Y=K===Jt?i.SRGB8_ALPHA8:i.RGBA8),O===i.UNSIGNED_SHORT&&st&&(Y=st.RGBA16_EXT),O===i.SHORT&&st&&(Y=st.RGBA16_SNORM_EXT),O===i.UNSIGNED_SHORT_4_4_4_4&&(Y=i.RGBA4),O===i.UNSIGNED_SHORT_5_5_5_1&&(Y=i.RGB5_A1)}return(Y===i.R16F||Y===i.R32F||Y===i.RG16F||Y===i.RG32F||Y===i.RGBA16F||Y===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Y}function E(w,g){let O;return w?g===null||g===Mn||g===fs?O=i.DEPTH24_STENCIL8:g===Sn?O=i.DEPTH32F_STENCIL8:g===ds&&(O=i.DEPTH24_STENCIL8,It("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===Mn||g===fs?O=i.DEPTH_COMPONENT24:g===Sn?O=i.DEPTH_COMPONENT32F:g===ds&&(O=i.DEPTH_COMPONENT16),O}function T(w,g){return d(w)===!0||w.isFramebufferTexture&&w.minFilter!==Ce&&w.minFilter!==Le?Math.log2(Math.max(g.width,g.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?g.mipmaps.length:1}function R(w){let g=w.target;g.removeEventListener("dispose",R),S(g),g.isVideoTexture&&h.delete(g),g.isHTMLTexture&&p.delete(g)}function _(w){let g=w.target;g.removeEventListener("dispose",_),P(g)}function S(w){let g=n.get(w);if(g.__webglInit===void 0)return;let O=w.source,V=m.get(O);if(V){let W=V[g.__cacheKey];W.usedTimes--,W.usedTimes===0&&A(w),Object.keys(V).length===0&&m.delete(O)}n.remove(w)}function A(w){let g=n.get(w);i.deleteTexture(g.__webglTexture);let O=w.source,V=m.get(O);delete V[g.__cacheKey],a.memory.textures--}function P(w){let g=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(g.__webglFramebuffer[V]))for(let W=0;W<g.__webglFramebuffer[V].length;W++)i.deleteFramebuffer(g.__webglFramebuffer[V][W]);else i.deleteFramebuffer(g.__webglFramebuffer[V]);g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer[V])}else{if(Array.isArray(g.__webglFramebuffer))for(let V=0;V<g.__webglFramebuffer.length;V++)i.deleteFramebuffer(g.__webglFramebuffer[V]);else i.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&i.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&i.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let V=0;V<g.__webglColorRenderbuffer.length;V++)g.__webglColorRenderbuffer[V]&&i.deleteRenderbuffer(g.__webglColorRenderbuffer[V]);g.__webglDepthRenderbuffer&&i.deleteRenderbuffer(g.__webglDepthRenderbuffer)}let O=w.textures;for(let V=0,W=O.length;V<W;V++){let it=n.get(O[V]);it.__webglTexture&&(i.deleteTexture(it.__webglTexture),a.memory.textures--),n.remove(O[V])}n.remove(w)}let U=0;function B(){U=0}function D(){return U}function H(w){U=w}function Z(){let w=U;return w>=s.maxTextures&&It("WebGLTextures: Trying to use "+(w+1)+" texture units while this GPU supports only "+s.maxTextures),U+=1,w}function J(w){let g=[];return g.push(w.wrapS),g.push(w.wrapT),g.push(w.wrapR||0),g.push(w.magFilter),g.push(w.minFilter),g.push(w.anisotropy),g.push(w.internalFormat),g.push(w.format),g.push(w.type),g.push(w.generateMipmaps),g.push(w.premultiplyAlpha),g.push(w.flipY),g.push(w.unpackAlignment),g.push(w.colorSpace),g.join()}function nt(w,g){let O=n.get(w);if(w.isVideoTexture&&F(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&O.__version!==w.version){let V=w.image;if(V===null)It("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)It("WebGLRenderer: Texture marked for update but image is incomplete");else{xt(O,w,g);return}}else w.isExternalTexture&&(O.__webglTexture=w.sourceTexture?w.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,O.__webglTexture,i.TEXTURE0+g)}function q(w,g){let O=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&O.__version!==w.version){xt(O,w,g);return}else w.isExternalTexture&&(O.__webglTexture=w.sourceTexture?w.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,O.__webglTexture,i.TEXTURE0+g)}function j(w,g){let O=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&O.__version!==w.version){xt(O,w,g);return}e.bindTexture(i.TEXTURE_3D,O.__webglTexture,i.TEXTURE0+g)}function et(w,g){let O=n.get(w);if(w.isCubeDepthTexture!==!0&&w.version>0&&O.__version!==w.version){Ut(O,w,g);return}e.bindTexture(i.TEXTURE_CUBE_MAP,O.__webglTexture,i.TEXTURE0+g)}let Rt={[es]:i.REPEAT,[Rn]:i.CLAMP_TO_EDGE,[o0]:i.MIRRORED_REPEAT},Tt={[Ce]:i.NEAREST,[xc]:i.NEAREST_MIPMAP_NEAREST,[ur]:i.NEAREST_MIPMAP_LINEAR,[Le]:i.LINEAR,[N0]:i.LINEAR_MIPMAP_NEAREST,[di]:i.LINEAR_MIPMAP_LINEAR},ie={[Sc]:i.NEVER,[Ac]:i.ALWAYS,[bc]:i.LESS,[xa]:i.LEQUAL,[Ec]:i.EQUAL,[ya]:i.GEQUAL,[Tc]:i.GREATER,[wc]:i.NOTEQUAL};function Xt(w,g){if(g.type===Sn&&t.has("OES_texture_float_linear")===!1&&(g.magFilter===Le||g.magFilter===N0||g.magFilter===ur||g.magFilter===di||g.minFilter===Le||g.minFilter===N0||g.minFilter===ur||g.minFilter===di)&&It("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,Rt[g.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,Rt[g.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,Rt[g.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,Tt[g.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,Tt[g.minFilter]),g.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,ie[g.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===Ce||g.minFilter!==ur&&g.minFilter!==di||g.type===Sn&&t.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||n.get(g).__currentAnisotropy){let O=t.get("EXT_texture_filter_anisotropic");i.texParameterf(w,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,s.getMaxAnisotropy())),n.get(g).__currentAnisotropy=g.anisotropy}}}function $t(w,g){let O=!1;w.__webglInit===void 0&&(w.__webglInit=!0,g.addEventListener("dispose",R));let V=g.source,W=m.get(V);W===void 0&&(W={},m.set(V,W));let it=J(g);if(it!==w.__cacheKey){W[it]===void 0&&(W[it]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,O=!0),W[it].usedTimes++;let st=W[w.__cacheKey];st!==void 0&&(W[w.__cacheKey].usedTimes--,st.usedTimes===0&&A(g)),w.__cacheKey=it,w.__webglTexture=W[it].texture}return O}function X(w,g,O){return Math.floor(Math.floor(w/O)/g)}function Q(w,g,O,V){let it=w.updateRanges;if(it.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,g.width,g.height,O,V,g.data);else{it.sort((bt,ht)=>bt.start-ht.start);let st=0;for(let bt=1;bt<it.length;bt++){let ht=it[st],at=it[bt],Et=ht.start+ht.count,Pt=X(at.start,g.width,4),Ft=X(ht.start,g.width,4);at.start<=Et+1&&Pt===Ft&&X(at.start+at.count-1,g.width,4)===Pt?ht.count=Math.max(ht.count,at.start+at.count-ht.start):(++st,it[st]=at)}it.length=st+1;let Y=e.getParameter(i.UNPACK_ROW_LENGTH),K=e.getParameter(i.UNPACK_SKIP_PIXELS),rt=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,g.width);for(let bt=0,ht=it.length;bt<ht;bt++){let at=it[bt],Et=Math.floor(at.start/4),Pt=Math.ceil(at.count/4),Ft=Et%g.width,N=Math.floor(Et/g.width),ot=Pt,$=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,Ft),e.pixelStorei(i.UNPACK_SKIP_ROWS,N),e.texSubImage2D(i.TEXTURE_2D,0,Ft,N,ot,$,O,V,g.data)}w.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,Y),e.pixelStorei(i.UNPACK_SKIP_PIXELS,K),e.pixelStorei(i.UNPACK_SKIP_ROWS,rt)}}function xt(w,g,O){let V=i.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(V=i.TEXTURE_2D_ARRAY),g.isData3DTexture&&(V=i.TEXTURE_3D);let W=$t(w,g),it=g.source;e.bindTexture(V,w.__webglTexture,i.TEXTURE0+O);let st=n.get(it);if(it.version!==st.__version||W===!0){if(e.activeTexture(i.TEXTURE0+O),(typeof ImageBitmap<"u"&&g.image instanceof ImageBitmap)===!1){let $=kt.getPrimaries(kt.workingColorSpace),lt=g.colorSpace===Gn?null:kt.getPrimaries(g.colorSpace),pt=g.colorSpace===Gn||$===lt?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,pt)}e.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment);let K=f(g.image,!1,s.maxTextureSize);K=Oe(g,K);let rt=r.convert(g.format,g.colorSpace),bt=r.convert(g.type),ht=v(g.internalFormat,rt,bt,g.normalized,g.colorSpace,g.isVideoTexture);Xt(V,g);let at,Et=g.mipmaps,Pt=g.isVideoTexture!==!0,Ft=st.__version===void 0||W===!0,N=it.dataReady,ot=T(g,K);if(g.isDepthTexture)ht=E(g.format===fi,g.type),Ft&&(Pt?e.texStorage2D(i.TEXTURE_2D,1,ht,K.width,K.height):e.texImage2D(i.TEXTURE_2D,0,ht,K.width,K.height,0,rt,bt,null));else if(g.isDataTexture)if(Et.length>0){Pt&&Ft&&e.texStorage2D(i.TEXTURE_2D,ot,ht,Et[0].width,Et[0].height);for(let $=0,lt=Et.length;$<lt;$++)at=Et[$],Pt?N&&e.texSubImage2D(i.TEXTURE_2D,$,0,0,at.width,at.height,rt,bt,at.data):e.texImage2D(i.TEXTURE_2D,$,ht,at.width,at.height,0,rt,bt,at.data);g.generateMipmaps=!1}else Pt?(Ft&&e.texStorage2D(i.TEXTURE_2D,ot,ht,K.width,K.height),N&&Q(g,K,rt,bt)):e.texImage2D(i.TEXTURE_2D,0,ht,K.width,K.height,0,rt,bt,K.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){Pt&&Ft&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ot,ht,Et[0].width,Et[0].height,K.depth);for(let $=0,lt=Et.length;$<lt;$++)if(at=Et[$],g.format!==un)if(rt!==null)if(Pt){if(N)if(g.layerUpdates.size>0){let pt=zo(at.width,at.height,g.format,g.type);for(let tt of g.layerUpdates){let wt=at.data.subarray(tt*pt/at.data.BYTES_PER_ELEMENT,(tt+1)*pt/at.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,tt,at.width,at.height,1,rt,wt)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,at.width,at.height,K.depth,rt,at.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,$,ht,at.width,at.height,K.depth,0,at.data,0,0);else It("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Pt?N&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,at.width,at.height,K.depth,rt,bt,at.data):e.texImage3D(i.TEXTURE_2D_ARRAY,$,ht,at.width,at.height,K.depth,0,rt,bt,at.data);g.layerUpdates.size>0&&g.clearLayerUpdates()}else{Pt&&Ft&&e.texStorage2D(i.TEXTURE_2D,ot,ht,Et[0].width,Et[0].height);for(let $=0,lt=Et.length;$<lt;$++)at=Et[$],g.format!==un?rt!==null?Pt?N&&e.compressedTexSubImage2D(i.TEXTURE_2D,$,0,0,at.width,at.height,rt,at.data):e.compressedTexImage2D(i.TEXTURE_2D,$,ht,at.width,at.height,0,at.data):It("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Pt?N&&e.texSubImage2D(i.TEXTURE_2D,$,0,0,at.width,at.height,rt,bt,at.data):e.texImage2D(i.TEXTURE_2D,$,ht,at.width,at.height,0,rt,bt,at.data)}else if(g.isDataArrayTexture)if(Pt){if(Ft&&e.texStorage3D(i.TEXTURE_2D_ARRAY,ot,ht,K.width,K.height,K.depth),N)if(g.layerUpdates.size>0){let $=zo(K.width,K.height,g.format,g.type);for(let lt of g.layerUpdates){let pt=K.data.subarray(lt*$/K.data.BYTES_PER_ELEMENT,(lt+1)*$/K.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,lt,K.width,K.height,1,rt,bt,pt)}g.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,rt,bt,K.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,ht,K.width,K.height,K.depth,0,rt,bt,K.data);else if(g.isData3DTexture)Pt?(Ft&&e.texStorage3D(i.TEXTURE_3D,ot,ht,K.width,K.height,K.depth),N&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,rt,bt,K.data)):e.texImage3D(i.TEXTURE_3D,0,ht,K.width,K.height,K.depth,0,rt,bt,K.data);else if(g.isFramebufferTexture){if(Ft)if(Pt)e.texStorage2D(i.TEXTURE_2D,ot,ht,K.width,K.height);else{let $=K.width,lt=K.height;for(let pt=0;pt<ot;pt++)e.texImage2D(i.TEXTURE_2D,pt,ht,$,lt,0,rt,bt,null),$>>=1,lt>>=1}}else if(g.isHTMLTexture){if("texElementImage2D"in i){let $=i.canvas;if($.hasAttribute("layoutsubtree")||$.setAttribute("layoutsubtree","true"),K.parentNode!==$){$.appendChild(K),p.add(g),$.onpaint=lt=>{let pt=lt.changedElements;for(let tt of p)pt.includes(tt.image)&&(tt.needsUpdate=!0)},$.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,K);else{let pt=i.RGBA,tt=i.RGBA,wt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,pt,tt,wt,K)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(Et.length>0){if(Pt&&Ft){let $=te(Et[0]);e.texStorage2D(i.TEXTURE_2D,ot,ht,$.width,$.height)}for(let $=0,lt=Et.length;$<lt;$++)at=Et[$],Pt?N&&e.texSubImage2D(i.TEXTURE_2D,$,0,0,rt,bt,at):e.texImage2D(i.TEXTURE_2D,$,ht,rt,bt,at);g.generateMipmaps=!1}else if(Pt){if(Ft){let $=te(K);e.texStorage2D(i.TEXTURE_2D,ot,ht,$.width,$.height)}N&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,rt,bt,K)}else e.texImage2D(i.TEXTURE_2D,0,ht,rt,bt,K);d(g)&&M(V),st.__version=it.version,g.onUpdate&&g.onUpdate(g)}w.__version=g.version}function Ut(w,g,O){if(g.image.length!==6)return;let V=$t(w,g),W=g.source;e.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+O);let it=n.get(W);if(W.version!==it.__version||V===!0){e.activeTexture(i.TEXTURE0+O);let st=kt.getPrimaries(kt.workingColorSpace),Y=g.colorSpace===Gn?null:kt.getPrimaries(g.colorSpace),K=g.colorSpace===Gn||st===Y?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,g.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,g.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,K);let rt=g.isCompressedTexture||g.image[0].isCompressedTexture,bt=g.image[0]&&g.image[0].isDataTexture,ht=[];for(let tt=0;tt<6;tt++)!rt&&!bt?ht[tt]=f(g.image[tt],!0,s.maxCubemapSize):ht[tt]=bt?g.image[tt].image:g.image[tt],ht[tt]=Oe(g,ht[tt]);let at=ht[0],Et=r.convert(g.format,g.colorSpace),Pt=r.convert(g.type),Ft=v(g.internalFormat,Et,Pt,g.normalized,g.colorSpace),N=g.isVideoTexture!==!0,ot=it.__version===void 0||V===!0,$=W.dataReady,lt=T(g,at);Xt(i.TEXTURE_CUBE_MAP,g);let pt;if(rt){N&&ot&&e.texStorage2D(i.TEXTURE_CUBE_MAP,lt,Ft,at.width,at.height);for(let tt=0;tt<6;tt++){pt=ht[tt].mipmaps;for(let wt=0;wt<pt.length;wt++){let Mt=pt[wt];g.format!==un?Et!==null?N?$&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,wt,0,0,Mt.width,Mt.height,Et,Mt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,wt,Ft,Mt.width,Mt.height,0,Mt.data):It("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?$&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,wt,0,0,Mt.width,Mt.height,Et,Pt,Mt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,wt,Ft,Mt.width,Mt.height,0,Et,Pt,Mt.data)}}}else{if(pt=g.mipmaps,N&&ot){pt.length>0&&lt++;let tt=te(ht[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,lt,Ft,tt.width,tt.height)}for(let tt=0;tt<6;tt++)if(bt){N?$&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,ht[tt].width,ht[tt].height,Et,Pt,ht[tt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,Ft,ht[tt].width,ht[tt].height,0,Et,Pt,ht[tt].data);for(let wt=0;wt<pt.length;wt++){let re=pt[wt].image[tt].image;N?$&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,wt+1,0,0,re.width,re.height,Et,Pt,re.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,wt+1,Ft,re.width,re.height,0,Et,Pt,re.data)}}else{N?$&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,0,0,Et,Pt,ht[tt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,0,Ft,Et,Pt,ht[tt]);for(let wt=0;wt<pt.length;wt++){let Mt=pt[wt];N?$&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,wt+1,0,0,Et,Pt,Mt.image[tt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+tt,wt+1,Ft,Et,Pt,Mt.image[tt])}}}d(g)&&M(i.TEXTURE_CUBE_MAP),it.__version=W.version,g.onUpdate&&g.onUpdate(g)}w.__version=g.version}function gt(w,g,O,V,W,it){let st=r.convert(O.format,O.colorSpace),Y=r.convert(O.type),K=v(O.internalFormat,st,Y,O.normalized,O.colorSpace),rt=n.get(g),bt=n.get(O);if(bt.__renderTarget=g,!rt.__hasExternalTextures){let ht=Math.max(1,g.width>>it),at=Math.max(1,g.height>>it);W===i.TEXTURE_3D||W===i.TEXTURE_2D_ARRAY?e.texImage3D(W,it,K,ht,at,g.depth,0,st,Y,null):e.texImage2D(W,it,K,ht,at,0,st,Y,null)}e.bindFramebuffer(i.FRAMEBUFFER,w),xe(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,V,W,bt.__webglTexture,0,fe(g)):(W===i.TEXTURE_2D||W>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&W<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,V,W,bt.__webglTexture,it),e.bindFramebuffer(i.FRAMEBUFFER,null)}function zt(w,g,O){if(i.bindRenderbuffer(i.RENDERBUFFER,w),g.depthBuffer){let V=g.depthTexture,W=V&&V.isDepthTexture?V.type:null,it=E(g.stencilBuffer,W),st=g.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;xe(g)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,fe(g),it,g.width,g.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,fe(g),it,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,it,g.width,g.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,st,i.RENDERBUFFER,w)}else{let V=g.textures;for(let W=0;W<V.length;W++){let it=V[W],st=r.convert(it.format,it.colorSpace),Y=r.convert(it.type),K=v(it.internalFormat,st,Y,it.normalized,it.colorSpace);xe(g)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,fe(g),K,g.width,g.height):O?i.renderbufferStorageMultisample(i.RENDERBUFFER,fe(g),K,g.width,g.height):i.renderbufferStorage(i.RENDERBUFFER,K,g.width,g.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function be(w,g,O){let V=g.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,w),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let W=n.get(g.depthTexture);if(W.__renderTarget=g,(!W.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),V){if(W.__webglInit===void 0&&(W.__webglInit=!0,g.depthTexture.addEventListener("dispose",R)),W.__webglTexture===void 0){W.__webglTexture=i.createTexture(),e.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture),Xt(i.TEXTURE_CUBE_MAP,g.depthTexture);let rt=r.convert(g.depthTexture.format),bt=r.convert(g.depthTexture.type),ht;g.depthTexture.format===Cn?ht=i.DEPTH_COMPONENT24:g.depthTexture.format===fi&&(ht=i.DEPTH24_STENCIL8);for(let at=0;at<6;at++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,ht,g.width,g.height,0,rt,bt,null)}}else nt(g.depthTexture,0);let it=W.__webglTexture,st=fe(g),Y=V?i.TEXTURE_CUBE_MAP_POSITIVE_X+O:i.TEXTURE_2D,K=g.depthTexture.format===fi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(g.depthTexture.format===Cn)xe(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,Y,it,0,st):i.framebufferTexture2D(i.FRAMEBUFFER,K,Y,it,0);else if(g.depthTexture.format===fi)xe(g)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,Y,it,0,st):i.framebufferTexture2D(i.FRAMEBUFFER,K,Y,it,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Vt(w){let g=n.get(w),O=w.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==w.depthTexture){let V=w.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),V){let W=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,V.removeEventListener("dispose",W)};V.addEventListener("dispose",W),g.__depthDisposeCallback=W}g.__boundDepthTexture=V}if(w.depthTexture&&!g.__autoAllocateDepthBuffer)if(O)for(let V=0;V<6;V++)be(g.__webglFramebuffer[V],w,V);else{let V=w.texture.mipmaps;V&&V.length>0?be(g.__webglFramebuffer[0],w,0):be(g.__webglFramebuffer,w,0)}else if(O){g.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(e.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[V]),g.__webglDepthbuffer[V]===void 0)g.__webglDepthbuffer[V]=i.createRenderbuffer(),zt(g.__webglDepthbuffer[V],w,!1);else{let W=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,it=g.__webglDepthbuffer[V];i.bindRenderbuffer(i.RENDERBUFFER,it),i.framebufferRenderbuffer(i.FRAMEBUFFER,W,i.RENDERBUFFER,it)}}else{let V=w.texture.mipmaps;if(V&&V.length>0?e.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=i.createRenderbuffer(),zt(g.__webglDepthbuffer,w,!1);else{let W=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,it=g.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,it),i.framebufferRenderbuffer(i.FRAMEBUFFER,W,i.RENDERBUFFER,it)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Zt(w,g,O){let V=n.get(w);g!==void 0&&gt(V.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),O!==void 0&&Vt(w)}function se(w){let g=w.texture,O=n.get(w),V=n.get(g);w.addEventListener("dispose",_);let W=w.textures,it=w.isWebGLCubeRenderTarget===!0,st=W.length>1;if(st||(V.__webglTexture===void 0&&(V.__webglTexture=i.createTexture()),V.__version=g.version,a.memory.textures++),it){O.__webglFramebuffer=[];for(let Y=0;Y<6;Y++)if(g.mipmaps&&g.mipmaps.length>0){O.__webglFramebuffer[Y]=[];for(let K=0;K<g.mipmaps.length;K++)O.__webglFramebuffer[Y][K]=i.createFramebuffer()}else O.__webglFramebuffer[Y]=i.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){O.__webglFramebuffer=[];for(let Y=0;Y<g.mipmaps.length;Y++)O.__webglFramebuffer[Y]=i.createFramebuffer()}else O.__webglFramebuffer=i.createFramebuffer();if(st)for(let Y=0,K=W.length;Y<K;Y++){let rt=n.get(W[Y]);rt.__webglTexture===void 0&&(rt.__webglTexture=i.createTexture(),a.memory.textures++)}if(w.samples>0&&xe(w)===!1){O.__webglMultisampledFramebuffer=i.createFramebuffer(),O.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let Y=0;Y<W.length;Y++){let K=W[Y];O.__webglColorRenderbuffer[Y]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,O.__webglColorRenderbuffer[Y]);let rt=r.convert(K.format,K.colorSpace),bt=r.convert(K.type),ht=v(K.internalFormat,rt,bt,K.normalized,K.colorSpace,w.isXRRenderTarget===!0),at=fe(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,at,ht,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Y,i.RENDERBUFFER,O.__webglColorRenderbuffer[Y])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(O.__webglDepthRenderbuffer=i.createRenderbuffer(),zt(O.__webglDepthRenderbuffer,w,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(it){e.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture),Xt(i.TEXTURE_CUBE_MAP,g);for(let Y=0;Y<6;Y++)if(g.mipmaps&&g.mipmaps.length>0)for(let K=0;K<g.mipmaps.length;K++)gt(O.__webglFramebuffer[Y][K],w,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,K);else gt(O.__webglFramebuffer[Y],w,g,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0);d(g)&&M(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(st){for(let Y=0,K=W.length;Y<K;Y++){let rt=W[Y],bt=n.get(rt),ht=i.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ht=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ht,bt.__webglTexture),Xt(ht,rt),gt(O.__webglFramebuffer,w,rt,i.COLOR_ATTACHMENT0+Y,ht,0),d(rt)&&M(ht)}e.unbindTexture()}else{let Y=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(Y=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Y,V.__webglTexture),Xt(Y,g),g.mipmaps&&g.mipmaps.length>0)for(let K=0;K<g.mipmaps.length;K++)gt(O.__webglFramebuffer[K],w,g,i.COLOR_ATTACHMENT0,Y,K);else gt(O.__webglFramebuffer,w,g,i.COLOR_ATTACHMENT0,Y,0);d(g)&&M(Y),e.unbindTexture()}w.depthBuffer&&Vt(w)}function Gt(w){let g=w.textures;for(let O=0,V=g.length;O<V;O++){let W=g[O];if(d(W)){let it=C(w),st=n.get(W).__webglTexture;e.bindTexture(it,st),M(it),e.unbindTexture()}}}let he=[],Ae=[];function Je(w){if(w.samples>0){if(xe(w)===!1){let g=w.textures,O=w.width,V=w.height,W=i.COLOR_BUFFER_BIT,it=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,st=n.get(w),Y=g.length>1;if(Y)for(let rt=0;rt<g.length;rt++)e.bindFramebuffer(i.FRAMEBUFFER,st.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+rt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,st.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+rt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,st.__webglMultisampledFramebuffer);let K=w.texture.mipmaps;K&&K.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,st.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,st.__webglFramebuffer);for(let rt=0;rt<g.length;rt++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(W|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(W|=i.STENCIL_BUFFER_BIT)),Y){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,st.__webglColorRenderbuffer[rt]);let bt=n.get(g[rt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,bt,0)}i.blitFramebuffer(0,0,O,V,0,0,O,V,W,i.NEAREST),l===!0&&(he.length=0,Ae.length=0,he.push(i.COLOR_ATTACHMENT0+rt),w.depthBuffer&&w.storeMultisampledDepthBuffer===!1&&(he.push(it),Ae.push(it),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ae)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,he))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Y)for(let rt=0;rt<g.length;rt++){e.bindFramebuffer(i.FRAMEBUFFER,st.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+rt,i.RENDERBUFFER,st.__webglColorRenderbuffer[rt]);let bt=n.get(g[rt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,st.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+rt,i.TEXTURE_2D,bt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,st.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.storeMultisampledDepthBuffer===!1&&l){let g=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[g])}}}function fe(w){return Math.min(s.maxSamples,w.samples)}function xe(w){let g=n.get(w);return w.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function F(w){let g=a.render.frame;h.get(w)!==g&&(h.set(w,g),w.update())}function Oe(w,g){let O=w.colorSpace,V=w.format,W=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||O!==Ds&&O!==Gn&&(kt.getTransfer(O)===Jt?(V!==un||W!==je)&&It("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Lt("WebGLTextures: Unsupported texture color space:",O)),g}function te(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=Z,this.resetTextureUnits=B,this.getTextureUnits=D,this.setTextureUnits=H,this.setTexture2D=nt,this.setTexture2DArray=q,this.setTexture3D=j,this.setTextureCube=et,this.rebindTextures=Zt,this.setupRenderTarget=se,this.updateRenderTargetMipmap=Gt,this.updateMultisampleRenderTarget=Je,this.setupDepthRenderbuffer=Vt,this.setupFrameBufferTexture=gt,this.useMultisampledRTT=xe,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function s1(i,t){function e(n,s=Gn){let r,a=kt.getTransfer(s);if(n===je)return i.UNSIGNED_BYTE;if(n===F0)return i.UNSIGNED_SHORT_4_4_4_4;if(n===O0)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Co)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Po)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Ao)return i.BYTE;if(n===Ro)return i.SHORT;if(n===ds)return i.UNSIGNED_SHORT;if(n===U0)return i.INT;if(n===Mn)return i.UNSIGNED_INT;if(n===Sn)return i.FLOAT;if(n===Ue)return i.HALF_FLOAT;if(n===Io)return i.ALPHA;if(n===Lo)return i.RGB;if(n===un)return i.RGBA;if(n===Cn)return i.DEPTH_COMPONENT;if(n===fi)return i.DEPTH_STENCIL;if(n===Do)return i.RED;if(n===B0)return i.RED_INTEGER;if(n===pi)return i.RG;if(n===z0)return i.RG_INTEGER;if(n===k0)return i.RGBA_INTEGER;if(n===dr||n===fr||n===pr||n===mr)if(a===Jt)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===dr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===fr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===pr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===mr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===dr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===fr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===pr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===mr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===V0||n===H0||n===G0||n===W0)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===V0)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===H0)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===G0)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===W0)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===q0||n===X0||n===Y0||n===Z0||n===J0||n===gr||n===$0)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===q0||n===X0)return a===Jt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Y0)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Z0)return r.COMPRESSED_R11_EAC;if(n===J0)return r.COMPRESSED_SIGNED_R11_EAC;if(n===gr)return r.COMPRESSED_RG11_EAC;if(n===$0)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===K0||n===Q0||n===j0||n===ta||n===ea||n===na||n===ia||n===sa||n===ra||n===aa||n===oa||n===la||n===ca||n===ha)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===K0)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Q0)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===j0)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ta)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ea)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===na)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ia)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===sa)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ra)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===aa)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===oa)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===la)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ca)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ha)return a===Jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ua||n===da||n===fa)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===ua)return a===Jt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===da)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===fa)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===pa||n===ma||n===_r||n===ga)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===pa)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ma)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===_r)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ga)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===fs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var r1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,a1=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,sl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let n=new Ws(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new me({vertexShader:r1,fragmentShader:a1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Dt(new Zs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},rl=class extends Pn{constructor(t,e){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,p=null,u=null,m=null,x=null,b=typeof XRWebGLBinding<"u",f=new sl,d={},M=e.getContextAttributes(),C=null,v=null,E=[],T=[],R=new At,_=null,S=null,A=new Ie;A.viewport=new de;let P=new Ie;P.viewport=new de;let U=[A,P],B=new C0,D=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let Q=E[X];return Q===void 0&&(Q=new rs,E[X]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(X){let Q=E[X];return Q===void 0&&(Q=new rs,E[X]=Q),Q.getGripSpace()},this.getHand=function(X){let Q=E[X];return Q===void 0&&(Q=new rs,E[X]=Q),Q.getHandSpace()};function Z(X){let Q=T.indexOf(X.inputSource);if(Q===-1)return;let xt=E[Q];xt!==void 0&&(xt.update(X.inputSource,X.frame,c||a),xt.dispatchEvent({type:X.type,data:X.inputSource}))}function J(){s.removeEventListener("select",Z),s.removeEventListener("selectstart",Z),s.removeEventListener("selectend",Z),s.removeEventListener("squeeze",Z),s.removeEventListener("squeezestart",Z),s.removeEventListener("squeezeend",Z),s.removeEventListener("end",J),s.removeEventListener("inputsourceschange",nt);for(let X=0;X<E.length;X++){let Q=T[X];Q!==null&&(T[X]=null,E[X].disconnect(Q))}D=null,H=null,f.reset();for(let X in d)delete d[X];if(t.setRenderTarget(C),m=null,u=null,p=null,s=null,v=null,$t.stop(),n.isPresenting=!1,t.setPixelRatio(_),t.setSize(R.width,R.height,!1),S!==null){let X=S.camera;X.fov=S.fov,X.zoom=S.zoom,X.updateProjectionMatrix(),S=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,n.isPresenting===!0&&It("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,n.isPresenting===!0&&It("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return u!==null?u:m},this.getBinding=function(){return p===null&&b&&(p=new XRWebGLBinding(s,e)),p},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(C=t.getRenderTarget(),s.addEventListener("select",Z),s.addEventListener("selectstart",Z),s.addEventListener("selectend",Z),s.addEventListener("squeeze",Z),s.addEventListener("squeezestart",Z),s.addEventListener("squeezeend",Z),s.addEventListener("end",J),s.addEventListener("inputsourceschange",nt),M.xrCompatible!==!0&&await e.makeXRCompatible(),_=t.getPixelRatio(),t.getSize(R),b&&"createProjectionLayer"in XRWebGLBinding.prototype){let xt=null,Ut=null,gt=null;M.depth&&(gt=M.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,xt=M.stencil?fi:Cn,Ut=M.stencil?fs:Mn);let zt={colorFormat:e.RGBA8,depthFormat:gt,scaleFactor:r};p=this.getBinding(),u=p.createProjectionLayer(zt),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),v=new Me(u.textureWidth,u.textureHeight,{format:un,type:je,depthTexture:new si(u.textureWidth,u.textureHeight,Ut,void 0,void 0,void 0,void 0,void 0,void 0,xt),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let xt={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,e,xt),s.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),v=new Me(m.framebufferWidth,m.framebufferHeight,{format:un,type:je,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1,storeMultisampledDepthBuffer:m.ignoreDepthValues===!1,storeMultisampledStencilBuffer:m.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),$t.setContext(s),$t.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};function nt(X){for(let Q=0;Q<X.removed.length;Q++){let xt=X.removed[Q],Ut=T.indexOf(xt);Ut>=0&&(T[Ut]=null,E[Ut].disconnect(xt))}for(let Q=0;Q<X.added.length;Q++){let xt=X.added[Q],Ut=T.indexOf(xt);if(Ut===-1){for(let zt=0;zt<E.length;zt++)if(zt>=T.length){T.push(xt),Ut=zt;break}else if(T[zt]===null){T[zt]=xt,Ut=zt;break}if(Ut===-1)break}let gt=E[Ut];gt&&gt.connect(xt)}}let q=new L,j=new L;function et(X,Q,xt){q.setFromMatrixPosition(Q.matrixWorld),j.setFromMatrixPosition(xt.matrixWorld);let Ut=q.distanceTo(j),gt=Q.projectionMatrix.elements,zt=xt.projectionMatrix.elements,be=gt[14]/(gt[10]-1),Vt=gt[14]/(gt[10]+1),Zt=(gt[9]+1)/gt[5],se=(gt[9]-1)/gt[5],Gt=(gt[8]-1)/gt[0],he=(zt[8]+1)/zt[0],Ae=be*Gt,Je=be*he,fe=Ut/(-Gt+he),xe=fe*-Gt;if(Q.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(xe),X.translateZ(fe),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),gt[10]===-1)X.projectionMatrix.copy(Q.projectionMatrix),X.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{let F=be+fe,Oe=Vt+fe,te=Ae-xe,w=Je+(Ut-xe),g=Zt*Vt/Oe*F,O=se*Vt/Oe*F;X.projectionMatrix.makePerspective(te,w,g,O,F,Oe),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function Rt(X,Q){Q===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(Q.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let Q=X.near,xt=X.far;f.texture!==null&&(f.depthNear>0&&(Q=f.depthNear),f.depthFar>0&&(xt=f.depthFar)),B.near=P.near=A.near=Q,B.far=P.far=A.far=xt,(D!==B.near||H!==B.far)&&(s.updateRenderState({depthNear:B.near,depthFar:B.far}),D=B.near,H=B.far),B.layers.mask=X.layers.mask|6,A.layers.mask=B.layers.mask&-5,P.layers.mask=B.layers.mask&-3;let Ut=X.parent,gt=B.cameras;Rt(B,Ut);for(let zt=0;zt<gt.length;zt++)Rt(gt[zt],Ut);gt.length===2?et(B,A,P):B.projectionMatrix.copy(A.projectionMatrix),S===null&&X.isPerspectiveCamera&&(S={camera:X,fov:X.fov,zoom:X.zoom}),Tt(X,B,Ut)};function Tt(X,Q,xt){xt===null?X.matrix.copy(Q.matrixWorld):(X.matrix.copy(xt.matrixWorld),X.matrix.invert(),X.matrix.multiply(Q.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(Q.projectionMatrix),X.projectionMatrixInverse.copy(Q.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=c0*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(u===null&&m===null))return l},this.setFoveation=function(X){l=X,u!==null&&(u.fixedFoveation=X),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=X)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(B)},this.getCameraTexture=function(X){return d[X]};let ie=null;function Xt(X,Q){if(h=Q.getViewerPose(c||a),x=Q,h!==null){let xt=h.views;m!==null&&(t.setRenderTargetFramebuffer(v,m.framebuffer),t.setRenderTarget(v));let Ut=!1;xt.length!==B.cameras.length&&(B.cameras.length=0,Ut=!0);for(let Vt=0;Vt<xt.length;Vt++){let Zt=xt[Vt],se=null;if(m!==null)se=m.getViewport(Zt);else{let he=p.getViewSubImage(u,Zt);se=he.viewport,Vt===0&&(t.setRenderTargetTextures(v,he.colorTexture,he.depthStencilTexture),t.setRenderTarget(v))}let Gt=U[Vt];Gt===void 0&&(Gt=new Ie,Gt.layers.enable(Vt),Gt.viewport=new de,U[Vt]=Gt),Gt.matrix.fromArray(Zt.transform.matrix),Gt.matrix.decompose(Gt.position,Gt.quaternion,Gt.scale),Gt.projectionMatrix.fromArray(Zt.projectionMatrix),Gt.projectionMatrixInverse.copy(Gt.projectionMatrix).invert(),Gt.viewport.set(se.x,se.y,se.width,se.height),Vt===0&&(B.matrix.copy(Gt.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),Ut===!0&&B.cameras.push(Gt)}let gt=s.enabledFeatures;if(gt&&gt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&b){p=n.getBinding();let Vt=p.getDepthInformation(xt[0]);Vt&&Vt.isValid&&Vt.texture&&f.init(Vt,s.renderState)}if(gt&&gt.includes("camera-access")&&b){t.state.unbindTexture(),p=n.getBinding();for(let Vt=0;Vt<xt.length;Vt++){let Zt=xt[Vt].camera;if(Zt){let se=d[Zt];se||(se=new Ws,d[Zt]=se);let Gt=p.getCameraImage(Zt);se.sourceTexture=Gt}}}}for(let xt=0;xt<E.length;xt++){let Ut=T[xt],gt=E[xt];Ut!==null&&gt!==void 0&&gt.update(Ut,Q,c||a)}ie&&ie(X,Q),Q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Q}),x=null}let $t=new ih;$t.setAnimationLoop(Xt),this.setAnimationLoop=function(X){ie=X},this.dispose=function(){}}},o1=new ue,ch=new Nt;ch.set(-1,0,0,0,1,0,0,0,1);function l1(i,t){function e(f,d){f.matrixAutoUpdate===!0&&f.updateMatrix(),d.value.copy(f.matrix)}function n(f,d){d.color.getRGB(f.fogColor.value,Fo(i)),d.isFog?(f.fogNear.value=d.near,f.fogFar.value=d.far):d.isFogExp2&&(f.fogDensity.value=d.density)}function s(f,d,M,C,v){d.isNodeMaterial?d.uniformsNeedUpdate=!1:d.isMeshBasicMaterial?r(f,d):d.isMeshLambertMaterial?(r(f,d),d.envMap&&(f.envMapIntensity.value=d.envMapIntensity)):d.isMeshToonMaterial?(r(f,d),p(f,d)):d.isMeshPhongMaterial?(r(f,d),h(f,d),d.envMap&&(f.envMapIntensity.value=d.envMapIntensity)):d.isMeshStandardMaterial?(r(f,d),u(f,d),d.isMeshPhysicalMaterial&&m(f,d,v)):d.isMeshMatcapMaterial?(r(f,d),x(f,d)):d.isMeshDepthMaterial?r(f,d):d.isMeshDistanceMaterial?(r(f,d),b(f,d)):d.isMeshNormalMaterial?r(f,d):d.isLineBasicMaterial?(a(f,d),d.isLineDashedMaterial&&o(f,d)):d.isPointsMaterial?l(f,d,M,C):d.isSpriteMaterial?c(f,d):d.isShadowMaterial?(f.color.value.copy(d.color),f.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(f,d){f.opacity.value=d.opacity,d.color&&f.diffuse.value.copy(d.color),d.emissive&&f.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(f.map.value=d.map,e(d.map,f.mapTransform)),d.alphaMap&&(f.alphaMap.value=d.alphaMap,e(d.alphaMap,f.alphaMapTransform)),d.bumpMap&&(f.bumpMap.value=d.bumpMap,e(d.bumpMap,f.bumpMapTransform),f.bumpScale.value=d.bumpScale,d.side===Xe&&(f.bumpScale.value*=-1)),d.normalMap&&(f.normalMap.value=d.normalMap,e(d.normalMap,f.normalMapTransform),f.normalScale.value.copy(d.normalScale),d.side===Xe&&f.normalScale.value.negate()),d.displacementMap&&(f.displacementMap.value=d.displacementMap,e(d.displacementMap,f.displacementMapTransform),f.displacementScale.value=d.displacementScale,f.displacementBias.value=d.displacementBias),d.emissiveMap&&(f.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,f.emissiveMapTransform)),d.specularMap&&(f.specularMap.value=d.specularMap,e(d.specularMap,f.specularMapTransform)),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest);let M=t.get(d),C=M.envMap,v=M.envMapRotation;C&&(f.envMap.value=C,f.envMapRotation.value.setFromMatrix4(o1.makeRotationFromEuler(v)).transpose(),C.isCubeTexture&&C.isRenderTargetTexture===!1&&f.envMapRotation.value.premultiply(ch),f.reflectivity.value=d.reflectivity,f.ior.value=d.ior,f.refractionRatio.value=d.refractionRatio),d.lightMap&&(f.lightMap.value=d.lightMap,f.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,f.lightMapTransform)),d.aoMap&&(f.aoMap.value=d.aoMap,f.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,f.aoMapTransform))}function a(f,d){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity,d.map&&(f.map.value=d.map,e(d.map,f.mapTransform))}function o(f,d){f.dashSize.value=d.dashSize,f.totalSize.value=d.dashSize+d.gapSize,f.scale.value=d.scale}function l(f,d,M,C){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity,f.size.value=d.size*M,f.scale.value=C*.5,d.map&&(f.map.value=d.map,e(d.map,f.uvTransform)),d.alphaMap&&(f.alphaMap.value=d.alphaMap,e(d.alphaMap,f.alphaMapTransform)),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest)}function c(f,d){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity,f.rotation.value=d.rotation,d.map&&(f.map.value=d.map,e(d.map,f.mapTransform)),d.alphaMap&&(f.alphaMap.value=d.alphaMap,e(d.alphaMap,f.alphaMapTransform)),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest)}function h(f,d){f.specular.value.copy(d.specular),f.shininess.value=Math.max(d.shininess,1e-4)}function p(f,d){d.gradientMap&&(f.gradientMap.value=d.gradientMap)}function u(f,d){f.metalness.value=d.metalness,d.metalnessMap&&(f.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,f.metalnessMapTransform)),f.roughness.value=d.roughness,d.roughnessMap&&(f.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,f.roughnessMapTransform)),d.envMap&&(f.envMapIntensity.value=d.envMapIntensity)}function m(f,d,M){f.ior.value=d.ior,d.sheen>0&&(f.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),f.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(f.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,f.sheenColorMapTransform)),d.sheenRoughnessMap&&(f.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,f.sheenRoughnessMapTransform))),d.clearcoat>0&&(f.clearcoat.value=d.clearcoat,f.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(f.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,f.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(f.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Xe&&f.clearcoatNormalScale.value.negate())),d.dispersion>0&&(f.dispersion.value=d.dispersion),d.retroreflectivity>0&&(f.retroreflectivity.value=d.retroreflectivity),d.iridescence>0&&(f.iridescence.value=d.iridescence,f.iridescenceIOR.value=d.iridescenceIOR,f.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(f.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,f.iridescenceMapTransform)),d.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),d.transmission>0&&(f.transmission.value=d.transmission,f.transmissionSamplerMap.value=M.texture,f.transmissionSamplerSize.value.set(M.width,M.height),d.transmissionMap&&(f.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,f.transmissionMapTransform)),f.thickness.value=d.thickness,d.thicknessMap&&(f.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=d.attenuationDistance,f.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(f.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(f.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=d.specularIntensity,f.specularColor.value.copy(d.specularColor),d.specularColorMap&&(f.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,f.specularColorMapTransform)),d.specularIntensityMap&&(f.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,f.specularIntensityMapTransform))}function x(f,d){d.matcap&&(f.matcap.value=d.matcap)}function b(f,d){let M=t.get(d).light;f.referencePosition.value.setFromMatrixPosition(M.matrixWorld),f.nearDistance.value=M.shadow.camera.near,f.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function c1(i,t,e,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,E){let T=E.program;n.uniformBlockBinding(v,T)}function c(v,E){let T=s[v.id];T===void 0&&(f(v),T=h(v),s[v.id]=T,v.addEventListener("dispose",M));let R=E.program;n.updateUBOMapping(v,R);let _=t.render.frame;r[v.id]!==_&&(u(v),r[v.id]=_)}function h(v){let E=p();v.__bindingPointIndex=E;let T=i.createBuffer(),R=v.__size,_=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,T),i.bufferData(i.UNIFORM_BUFFER,R,_),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,T),T}function p(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return Lt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(v){let E=s[v.id],T=v.uniforms,R=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let _=0,S=T.length;_<S;_++){let A=T[_];if(Array.isArray(A))for(let P=0,U=A.length;P<U;P++)m(A[P],_,P,R);else m(A,_,0,R)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(v,E,T,R){if(b(v,E,T,R)===!0){let _=v.__offset,S=v.value;if(Array.isArray(S)){let A=0;for(let P=0;P<S.length;P++){let U=S[P],B=d(U);x(U,v.__data,A),typeof U!="number"&&typeof U!="boolean"&&!U.isMatrix3&&!ArrayBuffer.isView(U)&&(A+=B.storage/Float32Array.BYTES_PER_ELEMENT)}}else x(S,v.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,_,v.__data)}}function x(v,E,T){typeof v=="number"||typeof v=="boolean"?E[0]=v:v.isMatrix3?(E[0]=v.elements[0],E[1]=v.elements[1],E[2]=v.elements[2],E[3]=0,E[4]=v.elements[3],E[5]=v.elements[4],E[6]=v.elements[5],E[7]=0,E[8]=v.elements[6],E[9]=v.elements[7],E[10]=v.elements[8],E[11]=0):ArrayBuffer.isView(v)?E.set(new v.constructor(v.buffer,v.byteOffset,E.length)):v.toArray(E,T)}function b(v,E,T,R){let _=v.value,S=E+"_"+T;if(R[S]===void 0)return typeof _=="number"||typeof _=="boolean"?R[S]=_:ArrayBuffer.isView(_)?R[S]=_.slice():R[S]=_.clone(),!0;{let A=R[S];if(typeof _=="number"||typeof _=="boolean"){if(A!==_)return R[S]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(A.equals(_)===!1)return A.copy(_),!0}}return!1}function f(v){let E=v.uniforms,T=0,R=16;for(let S=0,A=E.length;S<A;S++){let P=Array.isArray(E[S])?E[S]:[E[S]];for(let U=0,B=P.length;U<B;U++){let D=P[U],H=Array.isArray(D.value)?D.value:[D.value];for(let Z=0,J=H.length;Z<J;Z++){let nt=H[Z],q=d(nt),j=T%R,et=j%q.boundary,Rt=j+et;T+=et,Rt!==0&&R-Rt<q.storage&&(T+=R-Rt),D.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=T,T+=q.storage}}}let _=T%R;return _>0&&(T+=R-_),v.__size=T,v.__cache={},this}function d(v){let E={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(E.boundary=4,E.storage=4):v.isVector2?(E.boundary=8,E.storage=8):v.isVector3||v.isColor?(E.boundary=16,E.storage=12):v.isVector4?(E.boundary=16,E.storage=16):v.isMatrix3?(E.boundary=48,E.storage=48):v.isMatrix4?(E.boundary=64,E.storage=64):v.isTexture?It("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(E.boundary=16,E.storage=v.byteLength):It("WebGLRenderer: Unsupported uniform value type.",v),E}function M(v){let E=v.target;E.removeEventListener("dispose",M);let T=a.indexOf(E.__bindingPointIndex);a.splice(T,1),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function C(){for(let v in s)i.deleteBuffer(s[v]);a=[],s={},r={}}return{bind:l,update:c,dispose:C}}var h1=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Ln=null;function u1(){return Ln===null&&(Ln=new f0(h1,16,16,pi,Ue),Ln.name="DFG_LUT",Ln.minFilter=Le,Ln.magFilter=Le,Ln.wrapS=Rn,Ln.wrapT=Rn,Ln.generateMipmaps=!1,Ln.needsUpdate=!0),Ln}var Ea=class{constructor(t={}){let{canvas:e=Cc(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:u=!1,outputBufferType:m=je}=t;this.isWebGLRenderer=!0;let x;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=n.getContextAttributes().alpha}else x=a;let b=m,f=new Set([k0,z0,B0]),d=new Set([je,Mn,ds,fs,F0,O0]),M=new Uint32Array(4),C=new Int32Array(4),v=new L,E=null,T=null,R=[],_=[],S=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=vn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let A=this,P=!1,U=null,B=null,D=null,H=null;this._outputColorSpace=We;let Z=0,J=0,nt=null,q=-1,j=null,et=new de,Rt=new de,Tt=null,ie=new Ct(0),Xt=0,$t=e.width,X=e.height,Q=1,xt=null,Ut=null,gt=new de(0,0,$t,X),zt=new de(0,0,$t,X),be=!1,Vt=new as,Zt=!1,se=!1,Gt=new ue,he=new L,Ae=new de,Je={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},fe=!1;function xe(){return nt===null?Q:1}let F=n;function Oe(y,I){return e.getContext(y,I)}let te,w,g,O,V,W,it,st,Y,K,rt,bt,ht,at,Et,Pt,Ft,N,ot,$,lt,pt,tt;try{let y={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:p};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"186"}`),e.addEventListener("webglcontextlost",re,!1),e.addEventListener("webglcontextrestored",Kt,!1),e.addEventListener("webglcontextcreationerror",fn,!1),F===null){let I="webgl2";if(F=Oe(I,y),F===null)throw Oe(I)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}wt()}catch(y){throw e.removeEventListener("webglcontextlost",re,!1),e.removeEventListener("webglcontextrestored",Kt,!1),e.removeEventListener("webglcontextcreationerror",fn,!1),Lt("WebGLRenderer: "+y.message),y}function wt(){te=new xp(F),te.init(),lt=new s1(F,te),w=new lp(F,te,t,lt),g=new n1(F,te),w.reversedDepthBuffer&&u&&g.buffers.depth.setReversed(!0),B=F.createFramebuffer(),D=F.createFramebuffer(),H=F.createFramebuffer(),O=new Mp(F),V=new Hm,W=new i1(F,te,g,V,w,lt,O),it=new _p(A),st=new Su(F),pt=new ap(F,st),Y=new yp(F,st,O,pt),K=new bp(F,Y,st,pt,O),N=new Sp(F,w,W),Et=new cp(V),rt=new Vm(A,it,te,w,pt,Et),bt=new l1(A,V),ht=new Wm,at=new $m(te),Ft=new rp(A,it,g,K,x,l),Pt=new e1(A,K,w),tt=new c1(F,O,w,g),ot=new op(F,te,O),$=new vp(F,te,O),O.programs=rt.programs,A.capabilities=w,A.extensions=te,A.properties=V,A.renderLists=ht,A.shadowMap=Pt,A.state=g,A.info=O}b!==je&&(S=new Tp(b,e.width,e.height,o,s,r));let Mt=new rl(A,F);this.xr=Mt,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let y=te.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){let y=te.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return Q},this.setPixelRatio=function(y){y!==void 0&&(Q=y,this.setSize($t,X,!1))},this.getSize=function(y){return y.set($t,X)},this.setSize=function(y,I,G=!0){if(Mt.isPresenting){It("WebGLRenderer: Can't change size while VR device is presenting.");return}$t=y,X=I,e.width=Math.floor(y*Q),e.height=Math.floor(I*Q),G===!0&&(e.style.width=y+"px",e.style.height=I+"px"),S!==null&&S.setSize(e.width,e.height),this.setViewport(0,0,y,I)},this.getDrawingBufferSize=function(y){return y.set($t*Q,X*Q).floor()},this.setDrawingBufferSize=function(y,I,G){$t=y,X=I,Q=G,e.width=Math.floor(y*G),e.height=Math.floor(I*G),this.setViewport(0,0,y,I)},this.setEffects=function(y){if(b===je){Lt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(y){for(let I=0;I<y.length;I++)if(y[I].isOutputPass===!0){It("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}S.setEffects(y||[])},this.getCurrentViewport=function(y){return y.copy(et)},this.getViewport=function(y){return y.copy(gt)},this.setViewport=function(y,I,G,z){y.isVector4?gt.set(y.x,y.y,y.z,y.w):gt.set(y,I,G,z),g.viewport(et.copy(gt).multiplyScalar(Q).round())},this.getScissor=function(y){return y.copy(zt)},this.setScissor=function(y,I,G,z){y.isVector4?zt.set(y.x,y.y,y.z,y.w):zt.set(y,I,G,z),g.scissor(Rt.copy(zt).multiplyScalar(Q).round())},this.getScissorTest=function(){return be},this.setScissorTest=function(y){g.setScissorTest(be=y)},this.setOpaqueSort=function(y){xt=y},this.setTransparentSort=function(y){Ut=y},this.getClearColor=function(y){return y.copy(Ft.getClearColor())},this.setClearColor=function(){Ft.setClearColor(...arguments)},this.getClearAlpha=function(){return Ft.getClearAlpha()},this.setClearAlpha=function(){Ft.setClearAlpha(...arguments)},this.clear=function(y=!0,I=!0,G=!0){let z=0;if(y){let k=!1;if(nt!==null){let ft=nt.texture.format;k=f.has(ft)}if(k){let ft=nt.texture.type,_t=d.has(ft),dt=Ft.getClearColor(),yt=Ft.getClearAlpha(),St=dt.r,Ot=dt.g,Ht=dt.b;_t?(M[0]=St,M[1]=Ot,M[2]=Ht,M[3]=yt,F.clearBufferuiv(F.COLOR,0,M)):(C[0]=St,C[1]=Ot,C[2]=Ht,C[3]=yt,F.clearBufferiv(F.COLOR,0,C))}else z|=F.COLOR_BUFFER_BIT}I&&(z|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),G&&(z|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z!==0&&F.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(y){y.setRenderer(this),U=y},this.dispose=function(){e.removeEventListener("webglcontextlost",re,!1),e.removeEventListener("webglcontextrestored",Kt,!1),e.removeEventListener("webglcontextcreationerror",fn,!1),Ft.dispose(),ht.dispose(),at.dispose(),V.dispose(),it.dispose(),K.dispose(),pt.dispose(),tt.dispose(),rt.dispose(),Mt.dispose(),Mt.removeEventListener("sessionstart",xl),Mt.removeEventListener("sessionend",yl),gi.stop()};function re(y){y.preventDefault(),Uo("WebGLRenderer: Context Lost."),P=!0}function Kt(){Uo("WebGLRenderer: Context Restored."),P=!1;let y=O.autoReset,I=Pt.enabled,G=Pt.autoUpdate,z=Pt.needsUpdate,k=Pt.type;wt(),O.autoReset=y,Pt.enabled=I,Pt.autoUpdate=G,Pt.needsUpdate=z,Pt.type=k}function fn(y){Lt("WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function Tn(y){let I=y.target;I.removeEventListener("dispose",Tn),Lh(I)}function Lh(y){Dh(y),V.remove(y)}function Dh(y){let I=V.get(y).programs;I!==void 0&&(I.forEach(function(G){rt.releaseProgram(G)}),y.isShaderMaterial&&rt.releaseShaderCache(y))}this.renderBufferDirect=function(y,I,G,z,k,ft){I===null&&(I=Je);let _t=k.isMesh&&k.matrixWorld.determinantAffine()<0,dt=Fh(y,I,G,z,k);g.setMaterial(z,_t);let yt=G.index,St=1;if(z.wireframe===!0){if(yt=Y.getWireframeAttribute(G),yt===void 0)return;St=2}let Ot=G.drawRange,Ht=G.attributes.position,vt=Ot.start*St,Qt=(Ot.start+Ot.count)*St;ft!==null&&(vt=Math.max(vt,ft.start*St),Qt=Math.min(Qt,(ft.start+ft.count)*St)),yt!==null?(vt=Math.max(vt,0),Qt=Math.min(Qt,yt.count)):Ht!=null&&(vt=Math.max(vt,0),Qt=Math.min(Qt,Ht.count));let ye=Qt-vt;if(ye<0||ye===1/0)return;pt.setup(k,z,dt,G,yt);let oe,ne=ot;if(yt!==null&&(oe=st.get(yt),ne=$,ne.setIndex(oe)),k.isMesh)z.wireframe===!0?(g.setLineWidth(z.wireframeLinewidth*xe()),ne.setMode(F.LINES)):ne.setMode(F.TRIANGLES);else if(k.isLine){let Be=z.linewidth;Be===void 0&&(Be=1),g.setLineWidth(Be*xe()),k.isLineSegments?ne.setMode(F.LINES):k.isLineLoop?ne.setMode(F.LINE_LOOP):ne.setMode(F.LINE_STRIP)}else k.isPoints?ne.setMode(F.POINTS):k.isSprite&&ne.setMode(F.TRIANGLES);if(k.isBatchedMesh)if(te.get("WEBGL_multi_draw"))ne.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{let Be=k._multiDrawStarts,mt=k._multiDrawCounts,Ge=k._multiDrawCount,Yt=yt?st.get(yt).bytesPerElement:1,an=V.get(z).currentProgram.getUniforms();for(let wn=0;wn<Ge;wn++)an.setValue(F,"_gl_DrawID",wn),ne.render(Be[wn]/Yt,mt[wn])}else if(k.isInstancedMesh)ne.renderInstances(vt,ye,k.count);else if(G.isInstancedBufferGeometry){let Be=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,mt=Math.min(G.instanceCount,Be);ne.renderInstances(vt,ye,mt)}else ne.render(vt,ye)};function _l(y,I,G,z){U!==null&&y.isNodeMaterial&&U.setObject(z,y),Zt===!0&&Et.setState(y,G,!1),y.transparent===!0&&y.side===cn&&y.forceSinglePass===!1?(y.side=Xe,y.needsUpdate=!0,Pr(y,I,z),y.side=hi,y.needsUpdate=!0,Pr(y,I,z),y.side=cn):Pr(y,I,z)}this.compile=function(y,I,G=null){G===null&&(G=y),U!==null&&U.renderStart(y,I,G),T=at.get(G),T.init(I),_.push(T),G.traverseVisible(function(k){k.isLight&&k.layers.test(I.layers)&&(T.pushLight(k),k.castShadow&&T.pushShadow(k))}),y!==G&&y.traverseVisible(function(k){k.isLight&&k.layers.test(I.layers)&&(T.pushLight(k),k.castShadow&&T.pushShadow(k))}),T.setupLights(),U!==null&&U.updateLights(T.state.lightsArray),se=this.localClippingEnabled,Zt=Et.init(this.clippingPlanes,se),Zt===!0&&Et.setGlobalState(this.clippingPlanes,I),U!==null&&Pt.render(T.state.shadowsArray,G,I);let z=new Set;return y.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;let ft=k.material;if(ft)if(Array.isArray(ft))for(let _t=0;_t<ft.length;_t++){let dt=ft[_t];_l(dt,G,I,k),z.add(dt)}else _l(ft,G,I,k),z.add(ft)}),T=_.pop(),U!==null&&U.renderEnd(),z},this.compileAsync=function(y,I,G=null){let z=this.compile(y,I,G);return new Promise(k=>{function ft(){if(z.forEach(function(_t){let yt=V.get(_t).currentProgram;(yt===void 0||yt.isReady())&&z.delete(_t)}),z.size===0){k(y);return}setTimeout(ft,10)}te.get("KHR_parallel_shader_compile")!==null?ft():setTimeout(ft,10)})};let za=null;function Nh(y){za&&za(y)}function xl(){gi.stop()}function yl(){gi.start()}let gi=new ih;gi.setAnimationLoop(Nh),typeof self<"u"&&gi.setContext(self),this.setAnimationLoop=function(y){za=y,Mt.setAnimationLoop(y),y===null?gi.stop():gi.start()},Mt.addEventListener("sessionstart",xl),Mt.addEventListener("sessionend",yl),this.render=function(y,I){if(I!==void 0&&I.isCamera!==!0){Lt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;U!==null&&U.renderStart(y,I);let G=Mt.enabled===!0&&Mt.isPresenting===!0,z=S!==null&&(nt===null||G)&&S.begin(A,nt);if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),Mt.enabled===!0&&Mt.isPresenting===!0&&(S===null||S.isCompositing()===!1)&&(Mt.cameraAutoUpdate===!0&&Mt.updateCamera(I),I=Mt.getCamera()),y.isScene===!0&&y.onBeforeRender(A,y,I,nt),T=at.get(y,_.length),T.init(I),T.state.textureUnits=W.getTextureUnits(),_.push(T),Gt.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),Vt.setFromProjectionMatrix(Gt,xn,I.reversedDepth),se=this.localClippingEnabled,Zt=Et.init(this.clippingPlanes,se),E=ht.get(y,R.length),E.init(),R.push(E),Mt.enabled===!0&&Mt.isPresenting===!0){let _t=A.xr.getDepthSensingMesh();_t!==null&&ka(_t,I,-1/0,A.sortObjects)}ka(y,I,0,A.sortObjects),E.finish(),U!==null&&U.updateLights(T.state.lightsArray),A.sortObjects===!0&&E.sort(xt,Ut),fe=Mt.enabled===!1||Mt.isPresenting===!1||Mt.hasDepthSensing()===!1,fe&&Ft.addToRenderList(E,y),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Zt===!0&&Et.beginShadows();let k=T.state.shadowsArray;if(Pt.render(k,y,I),Zt===!0&&Et.endShadows(),(z&&S.hasRenderPass())===!1){let _t=E.opaque,dt=E.transmissive;if(T.setupLights(),I.isArrayCamera){let yt=I.cameras;if(dt.length>0)for(let St=0,Ot=yt.length;St<Ot;St++){let Ht=yt[St];Ml(_t,dt,y,Ht)}fe&&Ft.render(y);for(let St=0,Ot=yt.length;St<Ot;St++){let Ht=yt[St];vl(E,y,Ht,Ht.viewport)}}else dt.length>0&&Ml(_t,dt,y,I),fe&&Ft.render(y),vl(E,y,I)}nt!==null&&J===0&&(W.updateMultisampleRenderTarget(nt),W.updateRenderTargetMipmap(nt)),z&&S.end(A),y.isScene===!0&&y.onAfterRender(A,y,I),pt.resetDefaultState(),q=-1,j=null,_.pop(),_.length>0?(T=_[_.length-1],W.setTextureUnits(T.state.textureUnits),Zt===!0&&Et.setGlobalState(A.clippingPlanes,T.state.camera)):T=null,R.pop(),R.length>0?E=R[R.length-1]:E=null,U!==null&&U.renderEnd()};function ka(y,I,G,z){if(y.visible===!1)return;if(y.layers.test(I.layers)){if(y.isGroup)G=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(I);else if(y.isLightProbeGrid)T.pushLightProbeGrid(y);else if(y.isLight)T.pushLight(y),y.castShadow&&T.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||y.intersectsFrustum(Vt)){z&&Ae.setFromMatrixPosition(y.matrixWorld).applyMatrix4(Gt);let _t=K.update(y),dt=y.material;dt.visible&&E.push(y,_t,dt,G,Ae.z,null,I)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||y.intersectsFrustum(Vt))){let _t=K.update(y),dt=y.material;if(z&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),Ae.copy(y.boundingSphere.center)):(_t.boundingSphere===null&&_t.computeBoundingSphere(),Ae.copy(_t.boundingSphere.center)),Ae.applyMatrix4(y.matrixWorld).applyMatrix4(Gt)),Array.isArray(dt)){let yt=_t.groups;for(let St=0,Ot=yt.length;St<Ot;St++){let Ht=yt[St],vt=dt[Ht.materialIndex];vt&&vt.visible&&E.push(y,_t,vt,G,Ae.z,Ht,I)}}else dt.visible&&E.push(y,_t,dt,G,Ae.z,null,I)}}let ft=y.children;for(let _t=0,dt=ft.length;_t<dt;_t++)ka(ft[_t],I,G,z)}function vl(y,I,G,z){let{opaque:k,transmissive:ft,transparent:_t}=y;T.setupLightsView(G),Zt===!0&&Et.setGlobalState(A.clippingPlanes,G),z&&g.viewport(et.copy(z)),k.length>0&&Cr(k,I,G),ft.length>0&&Cr(ft,I,G),_t.length>0&&Cr(_t,I,G),g.buffers.depth.setTest(!0),g.buffers.depth.setMask(!0),g.buffers.color.setMask(!0),g.setPolygonOffset(!1)}function Ml(y,I,G,z){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[z.id]===void 0){let vt=te.has("EXT_color_buffer_half_float")||te.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[z.id]=new Me(1,1,{generateMipmaps:!0,type:vt?Ue:je,minFilter:di,samples:Math.max(4,w.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:kt.workingColorSpace})}let ft=T.state.transmissionRenderTarget[z.id],_t=z.viewport||et;ft.setSize(_t.z*A.transmissionResolutionScale,_t.w*A.transmissionResolutionScale);let dt=A.getRenderTarget(),yt=A.getActiveCubeFace(),St=A.getActiveMipmapLevel();A.setRenderTarget(ft),A.getClearColor(ie),Xt=A.getClearAlpha(),Xt<1&&A.setClearColor(16777215,.5),A.clear(),fe&&Ft.render(G);let Ot=A.toneMapping;A.toneMapping=vn;let Ht=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),T.setupLightsView(z),Zt===!0&&Et.setGlobalState(A.clippingPlanes,z),Cr(y,G,z),W.updateMultisampleRenderTarget(ft),W.updateRenderTargetMipmap(ft),te.has("WEBGL_multisampled_render_to_texture")===!1){let vt=!1;for(let Qt=0,ye=I.length;Qt<ye;Qt++){let oe=I[Qt],{object:ne,geometry:Be,material:mt,group:Ge}=oe;if(mt.side===cn&&ne.layers.test(z.layers)){let Yt=mt.side;mt.side=Xe,mt.needsUpdate=!0,Sl(ne,G,z,Be,mt,Ge),mt.side=Yt,mt.needsUpdate=!0,vt=!0}}vt===!0&&(W.updateMultisampleRenderTarget(ft),W.updateRenderTargetMipmap(ft))}A.setRenderTarget(dt,yt,St),A.setClearColor(ie,Xt),Ht!==void 0&&(z.viewport=Ht),A.toneMapping=Ot}function Cr(y,I,G){let z=I.isScene===!0?I.overrideMaterial:null;for(let k=0,ft=y.length;k<ft;k++){let _t=y[k],{object:dt,geometry:yt,group:St}=_t,Ot=_t.material;Ot.allowOverride===!0&&z!==null&&(Ot=z),dt.layers.test(G.layers)&&Sl(dt,I,G,yt,Ot,St)}}function Sl(y,I,G,z,k,ft){U!==null&&k.isNodeMaterial&&U.setObject(y,k),y.onBeforeRender(A,I,G,z,k,ft),y.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),k.onBeforeRender(A,I,G,z,y,ft),k.transparent===!0&&k.side===cn&&k.forceSinglePass===!1?(k.side=Xe,k.needsUpdate=!0,A.renderBufferDirect(G,I,z,k,y,ft),k.side=hi,k.needsUpdate=!0,A.renderBufferDirect(G,I,z,k,y,ft),k.side=cn):A.renderBufferDirect(G,I,z,k,y,ft),y.onAfterRender(A,I,G,z,k,ft)}function Pr(y,I,G){I.isScene!==!0&&(I=Je);let z=V.get(y),k=T.state.lights,ft=T.state.shadowsArray,_t=k.state.version,dt=rt.getParameters(y,k.state,ft,I,G,T.state.lightProbeGridArray),yt=rt.getProgramCacheKey(dt),St=z.programs;z.environment=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?I.environment:null,z.fog=I.fog;let Ot=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap;z.envMap=it.get(y.envMap||z.environment,Ot),z.envMapRotation=z.environment!==null&&y.envMap===null?I.environmentRotation:y.envMapRotation,St===void 0&&(y.addEventListener("dispose",Tn),St=new Map,z.programs=St);let Ht=St.get(yt);if(Ht!==void 0){if(z.currentProgram===Ht&&z.lightsStateVersion===_t)return El(y,dt),Ht}else dt.uniforms=rt.getUniforms(y),U!==null&&y.isNodeMaterial&&U.build(y,G,dt),y.onBeforeCompile(dt,A),Ht=rt.acquireProgram(dt,yt),St.set(yt,Ht),z.uniforms=dt.uniforms;let vt=z.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(vt.clippingPlanes=Et.uniform),El(y,dt),z.needsLights=Bh(y),z.lightsStateVersion=_t,z.needsLights&&(vt.ambientLightColor.value=k.state.ambient,vt.lightProbe.value=k.state.probe,vt.sunLights.value=k.state.sun,vt.sunLightShadows.value=k.state.sunShadow,vt.directionalLights.value=k.state.directional,vt.directionalLightShadows.value=k.state.directionalShadow,vt.spotLights.value=k.state.spot,vt.spotLightShadows.value=k.state.spotShadow,vt.rectAreaLights.value=k.state.rectArea,vt.ltc_1.value=k.state.rectAreaLTC1,vt.ltc_2.value=k.state.rectAreaLTC2,vt.pointLights.value=k.state.point,vt.pointLightShadows.value=k.state.pointShadow,vt.hemisphereLights.value=k.state.hemi,vt.sunShadowMatrix.value=k.state.sunShadowMatrix,vt.sunShadowCascade.value=k.state.sunShadowCascade,vt.directionalShadowMatrix.value=k.state.directionalShadowMatrix,vt.spotLightMatrix.value=k.state.spotLightMatrix,vt.spotLightMap.value=k.state.spotLightMap,vt.pointShadowMatrix.value=k.state.pointShadowMatrix),z.lightProbeGrid=T.state.lightProbeGridArray.length>0,z.currentProgram=Ht,z.uniformsList=null,Ht}function bl(y){if(y.uniformsList===null){let I=y.currentProgram.getUniforms();y.uniformsList=gs.seqWithValue(I.seq,y.uniforms)}return y.uniformsList}function El(y,I){let G=V.get(y);G.outputColorSpace=I.outputColorSpace,G.batching=I.batching,G.batchingColor=I.batchingColor,G.instancing=I.instancing,G.instancingColor=I.instancingColor,G.instancingMorph=I.instancingMorph,G.skinning=I.skinning,G.morphTargets=I.morphTargets,G.morphNormals=I.morphNormals,G.morphColors=I.morphColors,G.morphTargetsCount=I.morphTargetsCount,G.numClippingPlanes=I.numClippingPlanes,G.numIntersection=I.numClipIntersection,G.vertexAlphas=I.vertexAlphas,G.vertexTangents=I.vertexTangents,G.toneMapping=I.toneMapping}function Uh(y,I){if(y.length===0)return null;if(y.length===1)return y[0].texture!==null?y[0]:null;v.setFromMatrixPosition(I.matrixWorld);for(let G=0,z=y.length;G<z;G++){let k=y[G];if(k.texture!==null&&k.boundingBox.containsPoint(v))return k}return null}function Fh(y,I,G,z,k){I.isScene!==!0&&(I=Je),W.resetTextureUnits();let ft=I.fog,_t=z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial?I.environment:null,dt=nt===null?A.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:kt.workingColorSpace,yt=z.isMeshStandardMaterial||z.isMeshLambertMaterial&&!z.envMap||z.isMeshPhongMaterial&&!z.envMap,St=it.get(z.envMap||_t,yt),Ot=z.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Ht=!!G.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),vt=!!G.morphAttributes.position,Qt=!!G.morphAttributes.normal,ye=!!G.morphAttributes.color,oe=vn;z.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(oe=A.toneMapping);let ne=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Be=ne!==void 0?ne.length:0,mt=V.get(z),Ge=T.state.lights;if(Zt===!0&&(se===!0||y!==j)){let ae=y===j&&z.id===q;Et.setState(z,y,ae)}let Yt=!1;z.version===mt.__version?(mt.needsLights&&mt.lightsStateVersion!==Ge.state.version||mt.outputColorSpace!==dt||k.isBatchedMesh&&mt.batching===!1||!k.isBatchedMesh&&mt.batching===!0||k.isBatchedMesh&&mt.batchingColor===!0&&k._colorsTexture===null||k.isBatchedMesh&&mt.batchingColor===!1&&k._colorsTexture!==null||k.isInstancedMesh&&mt.instancing===!1||!k.isInstancedMesh&&mt.instancing===!0||k.isSkinnedMesh&&mt.skinning===!1||!k.isSkinnedMesh&&mt.skinning===!0||k.isInstancedMesh&&mt.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&mt.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&mt.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&mt.instancingMorph===!1&&k.morphTexture!==null||mt.envMap!==St||z.fog===!0&&mt.fog!==ft||mt.numClippingPlanes!==void 0&&(mt.numClippingPlanes!==Et.numPlanes||mt.numIntersection!==Et.numIntersection)||mt.vertexAlphas!==Ot||mt.vertexTangents!==Ht||mt.morphTargets!==vt||mt.morphNormals!==Qt||mt.morphColors!==ye||mt.toneMapping!==oe||mt.morphTargetsCount!==Be||!!mt.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(Yt=!0):(Yt=!0,mt.__version=z.version);let an=mt.currentProgram;Yt===!0&&(an=Pr(z,I,k),U&&z.isNodeMaterial&&U.onUpdateProgram(z,an,mt));let wn=!1,Yn=!1,Bi=!1,ee=an.getUniforms(),_e=mt.uniforms;if(g.useProgram(an.program)&&(wn=!0,Yn=!0,Bi=!0),z.id!==q&&(q=z.id,Yn=!0),mt.needsLights){let ae=Uh(T.state.lightProbeGridArray,k);mt.lightProbeGrid!==ae&&(mt.lightProbeGrid=ae,Yn=!0)}if(wn||j!==y){g.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),ee.setValue(F,"projectionMatrix",y.projectionMatrix),ee.setValue(F,"viewMatrix",y.matrixWorldInverse);let Jn=ee.map.cameraPosition;Jn!==void 0&&Jn.setValue(F,he.setFromMatrixPosition(y.matrixWorld)),w.logarithmicDepthBuffer&&ee.setValue(F,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&ee.setValue(F,"isOrthographic",y.isOrthographicCamera===!0),j!==y&&(j=y,Yn=!0,Bi=!0)}if(mt.needsLights&&(Ge.state.sunShadowMap.length>0&&ee.setValue(F,"sunShadowMap",Ge.state.sunShadowMap,W),Ge.state.directionalShadowMap.length>0&&ee.setValue(F,"directionalShadowMap",Ge.state.directionalShadowMap,W),Ge.state.spotShadowMap.length>0&&ee.setValue(F,"spotShadowMap",Ge.state.spotShadowMap,W),Ge.state.pointShadowMap.length>0&&ee.setValue(F,"pointShadowMap",Ge.state.pointShadowMap,W)),k.isSkinnedMesh){ee.setOptional(F,k,"bindMatrix"),ee.setOptional(F,k,"bindMatrixInverse");let ae=k.skeleton;ae&&(ae.boneTexture===null&&ae.computeBoneTexture(),ee.setValue(F,"boneTexture",ae.boneTexture,W))}k.isBatchedMesh&&(ee.setOptional(F,k,"batchingTexture"),ee.setValue(F,"batchingTexture",k._matricesTexture,W),ee.setOptional(F,k,"batchingIdTexture"),ee.setValue(F,"batchingIdTexture",k._indirectTexture,W),ee.setOptional(F,k,"batchingColorTexture"),k._colorsTexture!==null&&ee.setValue(F,"batchingColorTexture",k._colorsTexture,W));let Zn=G.morphAttributes;if((Zn.position!==void 0||Zn.normal!==void 0||Zn.color!==void 0)&&N.update(k,G,an),(Yn||mt.receiveShadow!==k.receiveShadow)&&(mt.receiveShadow=k.receiveShadow,ee.setValue(F,"receiveShadow",k.receiveShadow)),(z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial)&&z.envMap===null&&I.environment!==null&&(_e.envMapIntensity.value=I.environmentIntensity),_e.dfgLUT!==void 0&&(_e.dfgLUT.value=u1()),Yn){if(ee.setValue(F,"toneMappingExposure",A.toneMappingExposure),mt.needsLights&&Oh(_e,Bi),ft&&z.fog===!0&&bt.refreshFogUniforms(_e,ft),bt.refreshMaterialUniforms(_e,z,Q,X,T.state.transmissionRenderTarget[y.id]),mt.needsLights&&mt.lightProbeGrid){let ae=mt.lightProbeGrid;_e.probesSH.value=ae.texture,_e.probesMin.value.copy(ae.boundingBox.min),_e.probesMax.value.copy(ae.boundingBox.max),_e.probesResolution.value.copy(ae.resolution)}gs.upload(F,bl(mt),_e,W)}if(z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(gs.upload(F,bl(mt),_e,W),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&ee.setValue(F,"center",k.center),ee.setValue(F,"modelViewMatrix",k.modelViewMatrix),ee.setValue(F,"normalMatrix",k.normalMatrix),ee.setValue(F,"modelMatrix",k.matrixWorld),z.uniformsGroups!==void 0){let ae=z.uniformsGroups;for(let Jn=0,zi=ae.length;Jn<zi;Jn++){let wl=ae[Jn];tt.update(wl,an),tt.bind(wl,an)}}return an}function Oh(y,I){y.ambientLightColor.needsUpdate=I,y.lightProbe.needsUpdate=I,y.sunLights.needsUpdate=I,y.sunLightShadows.needsUpdate=I,y.directionalLights.needsUpdate=I,y.directionalLightShadows.needsUpdate=I,y.pointLights.needsUpdate=I,y.pointLightShadows.needsUpdate=I,y.spotLights.needsUpdate=I,y.spotLightShadows.needsUpdate=I,y.rectAreaLights.needsUpdate=I,y.hemisphereLights.needsUpdate=I}function Bh(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return Z},this.getActiveMipmapLevel=function(){return J},this.getRenderTarget=function(){return nt},this.setRenderTargetTextures=function(y,I,G){let z=V.get(y);z.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),V.get(y.texture).__webglTexture=I,V.get(y.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:G,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,I){let G=V.get(y);G.__webglFramebuffer=I,G.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(y,I=0,G=0){nt=y,Z=I,J=G;let z=null,k=!1,ft=!1;if(y){let dt=V.get(y);if(dt.__useDefaultFramebuffer!==void 0){g.bindFramebuffer(F.FRAMEBUFFER,dt.__webglFramebuffer),et.copy(y.viewport),Rt.copy(y.scissor),Tt=y.scissorTest,g.viewport(et),g.scissor(Rt),g.setScissorTest(Tt),q=-1;return}else if(dt.__webglFramebuffer===void 0)W.setupRenderTarget(y);else if(dt.__hasExternalTextures)W.rebindTextures(y,V.get(y.texture).__webglTexture,V.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){let Ot=y.depthTexture;if(dt.__boundDepthTexture!==Ot){if(Ot!==null&&V.has(Ot)&&(y.width!==Ot.image.width||y.height!==Ot.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");W.setupDepthRenderbuffer(y)}}let yt=y.texture;(yt.isData3DTexture||yt.isDataArrayTexture||yt.isCompressedArrayTexture)&&(ft=!0);let St=V.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(St[I])?z=St[I][G]:z=St[I],k=!0):y.samples>0&&W.useMultisampledRTT(y)===!1?z=V.get(y).__webglMultisampledFramebuffer:Array.isArray(St)?z=St[G]:z=St,et.copy(y.viewport),Rt.copy(y.scissor),Tt=y.scissorTest}else et.copy(gt).multiplyScalar(Q).floor(),Rt.copy(zt).multiplyScalar(Q).floor(),Tt=be;if(G!==0&&(z=B),g.bindFramebuffer(F.FRAMEBUFFER,z)&&g.drawBuffers(y,z),g.viewport(et),g.scissor(Rt),g.setScissorTest(Tt),k){let dt=V.get(y.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+I,dt.__webglTexture,G)}else if(ft){let dt=I;for(let yt=0;yt<y.textures.length;yt++){let St=V.get(y.textures[yt]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+yt,St.__webglTexture,G,dt)}}else if(y!==null&&G!==0){let dt=V.get(y.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,dt.__webglTexture,G)}q=-1};function Tl(y){let I=V.get(y);return(I.__readFormat!==y.format||I.__readType!==y.type)&&(I.__readFormat=y.format,I.__readType=y.type,I.__formatReadable=w.textureFormatReadable(y.format),I.__typeReadable=w.textureTypeReadable(y.type)),I}this.readRenderTargetPixels=function(y,I,G,z,k,ft,_t,dt=0){if(!(y&&y.isWebGLRenderTarget)){Lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let yt=V.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&_t!==void 0&&(yt=yt[_t]),yt){g.bindFramebuffer(F.FRAMEBUFFER,yt);try{let St=y.textures[dt],Ot=St.format,Ht=St.type;y.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+dt);let vt=Tl(St);if(vt.__formatReadable===!1){Lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(vt.__typeReadable===!1){Lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=y.width-z&&G>=0&&G<=y.height-k&&F.readPixels(I,G,z,k,lt.convert(Ot),lt.convert(Ht),ft)}finally{let St=nt!==null?V.get(nt).__webglFramebuffer:null;g.bindFramebuffer(F.FRAMEBUFFER,St)}}},this.readRenderTargetPixelsAsync=async function(y,I,G,z,k,ft,_t,dt=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let yt=V.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&_t!==void 0&&(yt=yt[_t]),yt)if(I>=0&&I<=y.width-z&&G>=0&&G<=y.height-k){g.bindFramebuffer(F.FRAMEBUFFER,yt);let St=y.textures[dt],Ot=St.format,Ht=St.type;y.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+dt);let vt=Tl(St);if(vt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(vt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Qt=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,Qt),F.bufferData(F.PIXEL_PACK_BUFFER,ft.byteLength,F.STREAM_READ),F.readPixels(I,G,z,k,lt.convert(Ot),lt.convert(Ht),0),F.bindBuffer(F.PIXEL_PACK_BUFFER,null);let ye=nt!==null?V.get(nt).__webglFramebuffer:null;g.bindFramebuffer(F.FRAMEBUFFER,ye);let oe=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await Ic(F,oe,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,Qt),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,ft),F.bindBuffer(F.PIXEL_PACK_BUFFER,null),F.deleteBuffer(Qt),F.deleteSync(oe),ft}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,I=null,G=0){let z=Math.pow(2,-G),k=Math.floor(y.image.width*z),ft=Math.floor(y.image.height*z),_t=I!==null?I.x:0,dt=I!==null?I.y:0;W.setTexture2D(y,0),F.copyTexSubImage2D(F.TEXTURE_2D,G,0,0,_t,dt,k,ft),g.unbindTexture()},this.copyTextureToTexture=function(y,I,G=null,z=null,k=0,ft=0){let _t,dt,yt,St,Ot,Ht,vt,Qt,ye,oe=y.isCompressedTexture?y.mipmaps[ft]:y.image;if(G!==null)_t=G.max.x-G.min.x,dt=G.max.y-G.min.y,yt=G.isBox3?G.max.z-G.min.z:1,St=G.min.x,Ot=G.min.y,Ht=G.isBox3?G.min.z:0;else{let _e=Math.pow(2,-k);_t=Math.floor(oe.width*_e),dt=Math.floor(oe.height*_e),y.isDataArrayTexture?yt=oe.depth:y.isData3DTexture?yt=Math.floor(oe.depth*_e):yt=1,St=0,Ot=0,Ht=0}z!==null?(vt=z.x,Qt=z.y,ye=z.z):(vt=0,Qt=0,ye=0);let ne=lt.convert(I.format),Be=lt.convert(I.type),mt;I.isData3DTexture?(W.setTexture3D(I,0),mt=F.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?(W.setTexture2DArray(I,0),mt=F.TEXTURE_2D_ARRAY):(W.setTexture2D(I,0),mt=F.TEXTURE_2D),g.activeTexture(F.TEXTURE0),g.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,I.flipY),g.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),g.pixelStorei(F.UNPACK_ALIGNMENT,I.unpackAlignment);let Ge=g.getParameter(F.UNPACK_ROW_LENGTH),Yt=g.getParameter(F.UNPACK_IMAGE_HEIGHT),an=g.getParameter(F.UNPACK_SKIP_PIXELS),wn=g.getParameter(F.UNPACK_SKIP_ROWS),Yn=g.getParameter(F.UNPACK_SKIP_IMAGES);g.pixelStorei(F.UNPACK_ROW_LENGTH,oe.width),g.pixelStorei(F.UNPACK_IMAGE_HEIGHT,oe.height),g.pixelStorei(F.UNPACK_SKIP_PIXELS,St),g.pixelStorei(F.UNPACK_SKIP_ROWS,Ot),g.pixelStorei(F.UNPACK_SKIP_IMAGES,Ht);let Bi=y.isDataArrayTexture||y.isData3DTexture,ee=I.isDataArrayTexture||I.isData3DTexture;if(y.isDepthTexture){let _e=V.get(y),Zn=V.get(I),ae=V.get(_e.__renderTarget),Jn=V.get(Zn.__renderTarget);g.bindFramebuffer(F.READ_FRAMEBUFFER,ae.__webglFramebuffer),g.bindFramebuffer(F.DRAW_FRAMEBUFFER,Jn.__webglFramebuffer);for(let zi=0;zi<yt;zi++)Bi&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,V.get(y).__webglTexture,k,Ht+zi),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,V.get(I).__webglTexture,ft,ye+zi)),F.blitFramebuffer(St,Ot,_t,dt,vt,Qt,_t,dt,F.DEPTH_BUFFER_BIT,F.NEAREST);g.bindFramebuffer(F.READ_FRAMEBUFFER,null),g.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(k!==0||y.isRenderTargetTexture||V.has(y)){let _e=V.get(y),Zn=V.get(I);g.bindFramebuffer(F.READ_FRAMEBUFFER,D),g.bindFramebuffer(F.DRAW_FRAMEBUFFER,H);for(let ae=0;ae<yt;ae++)Bi?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,_e.__webglTexture,k,Ht+ae):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,_e.__webglTexture,k),ee?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Zn.__webglTexture,ft,ye+ae):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Zn.__webglTexture,ft),k!==0?F.blitFramebuffer(St,Ot,_t,dt,vt,Qt,_t,dt,F.COLOR_BUFFER_BIT,F.NEAREST):ee?F.copyTexSubImage3D(mt,ft,vt,Qt,ye+ae,St,Ot,_t,dt):F.copyTexSubImage2D(mt,ft,vt,Qt,St,Ot,_t,dt);g.bindFramebuffer(F.READ_FRAMEBUFFER,null),g.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else ee?y.isDataTexture||y.isData3DTexture?F.texSubImage3D(mt,ft,vt,Qt,ye,_t,dt,yt,ne,Be,oe.data):I.isCompressedArrayTexture?F.compressedTexSubImage3D(mt,ft,vt,Qt,ye,_t,dt,yt,ne,oe.data):F.texSubImage3D(mt,ft,vt,Qt,ye,_t,dt,yt,ne,Be,oe):y.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,ft,vt,Qt,_t,dt,ne,Be,oe.data):y.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,ft,vt,Qt,oe.width,oe.height,ne,oe.data):F.texSubImage2D(F.TEXTURE_2D,ft,vt,Qt,_t,dt,ne,Be,oe);g.pixelStorei(F.UNPACK_ROW_LENGTH,Ge),g.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Yt),g.pixelStorei(F.UNPACK_SKIP_PIXELS,an),g.pixelStorei(F.UNPACK_SKIP_ROWS,wn),g.pixelStorei(F.UNPACK_SKIP_IMAGES,Yn),ft===0&&I.generateMipmaps&&F.generateMipmap(mt),g.unbindTexture()},this.initRenderTarget=function(y){V.get(y).__webglFramebuffer===void 0&&W.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?W.setTextureCube(y,0):y.isData3DTexture?W.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?W.setTexture2DArray(y,0):W.setTexture2D(y,0),g.unbindTexture()},this.resetState=function(){Z=0,J=0,nt=null,g.reset(),pt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return xn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=kt._getDrawingBufferColorSpace(t),e.unpackColorSpace=kt._getUnpackColorSpace()}};var xs={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var rn=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},d1=new ci(-1,1,1,-1,0,1),al=class extends pe{constructor(){super(),this.setAttribute("position",new jt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new jt([0,2,0,0,2,0],2))}},f1=new al,mi=class{constructor(t){this._mesh=new Dt(f1,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,d1)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}};var Aa=class extends rn{constructor(t,e="tDiffuse"){super(),this.textureID=e,this.uniforms=null,this.material=null,t instanceof me?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=Wn.clone(t.uniforms),this.material=new me({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this._fsQuad=new mi(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var br=class extends rn{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){let s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}},Ra=class extends rn{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}};var Ca=class{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){let n=t.getSize(new At);this._width=n.width,this._height=n.height,e=new Me(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Ue}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Aa(xs),this.copyPass.material.blending=hn,this.timer=new er}swapBuffers(){let t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){let e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){this.timer.update(),t===void 0&&(t=this.timer.getDelta());let e=this.renderer.getRenderTarget(),n=!1;for(let s=0,r=this.passes.length;s<r;s++){let a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),a.needsSwap){if(n){let o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}br!==void 0&&(a instanceof br?n=!0:a instanceof Ra&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){let e=this.renderer.getSize(new At);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;let n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var Pa=class extends rn{constructor(t,e,n=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Ct}render(t,e,n){let s=t.autoClear;t.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),t.autoClear=s}};var hh={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ct(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};var ys=class i extends rn{constructor(t,e=1,n,s){super(),this.strength=e,this.radius=n,this.threshold=s,this.resolution=t!==void 0?new At(t.x,t.y):new At(256,256),this.clearColor=new Ct(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Me(r,a,{type:Ue,depthBuffer:!1}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){let p=new Me(r,a,{type:Ue,depthBuffer:!1});p.texture.name="UnrealBloomPass.h"+h,p.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(p);let u=new Me(r,a,{type:Ue,depthBuffer:!1});u.texture.name="UnrealBloomPass.v"+h,u.texture.generateMipmaps=!1,this.renderTargetsVertical.push(u),r=Math.round(r/2),a=Math.round(a/2)}let o=hh;this.highPassUniforms=Wn.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new me({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let l=[6,10,14,18,22];r=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new At(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new L(1,1,1),new L(1,1,1),new L(1,1,1),new L(1,1,1),new L(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Wn.clone(xs.uniforms),this.blendMaterial=new me({uniforms:this.copyUniforms,vertexShader:xs.vertexShader,fragmentShader:xs.fragmentShader,premultipliedAlpha:!0,blending:In,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Ct,this._oldClearAlpha=1,this._basic=new Qe,this._fsQuad=new mi(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new At(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(t,e,n,s,r){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let a=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=i.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=i.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this._fsQuad.render(t),o=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(n),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=a}_getSeparableBlurMaterial(t){let e=[],n=t/3;for(let a=0;a<t;a++)e.push(.39894*Math.exp(-.5*a*a/(n*n))/n);let s=[],r=[];for(let a=1;a<t;a+=2){let o=e[a],l=a+1<t?e[a+1]:0,c=o+l;s.push((a*o+(a+1)*l)/c),r.push(c)}return new me({defines:{KERNEL_PAIRS:s.length},uniforms:{colorTexture:{value:null},invSize:{value:new At(.5,.5)},direction:{value:new At(.5,.5)},centerWeight:{value:e[0]},gaussianOffsets:{value:s},gaussianWeights:{value:r}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(t){return new me({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};ys.BlurDirectionX=new At(1,0);ys.BlurDirectionY=new At(0,1);var Er={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};var Ia=class extends rn{constructor(){super(),this.isOutputPass=!0,this.uniforms=Wn.clone(Er.uniforms),this.material=new ls({name:Er.name,uniforms:this.uniforms,vertexShader:Er.vertexShader,fragmentShader:Er.fragmentShader}),this._fsQuad=new mi(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},kt.getTransfer(this._outputColorSpace)===Jt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===sr?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===rr?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===ar?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===wi?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===lr?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===cr?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===or&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}};var ol=13;function ll(i){let t=i>>>0;return()=>(t=t*1664525+1013904223>>>0)/4294967296}function p1(){let n=document.createElement("canvas");n.width=n.height=1024;let s=document.createElement("canvas");s.width=s.height=1024;let r=n.getContext("2d"),a=s.getContext("2d"),o=ll(7);r.fillStyle="#0c0b0d",r.fillRect(0,0,1024,1024),a.fillStyle="#ffffff",a.fillRect(0,0,1024,1024);for(let h=0;h<16;h++)for(let p=0;p<16;p++){let u=h%2*64/2,m=34+o()*26;r.fillStyle=`rgb(${m+4},${m},${m+2})`,r.fillRect(p*64+u+3,h*64+3,58,58);for(let b=0;b<6;b++)r.fillStyle=`rgba(${o()<.3?"40,52,38":"12,10,12"},${.25+o()*.35})`,r.fillRect(p*64+u+o()*64,h*64+o()*64,2+o()*18,1+o()*3);let x=150+o()*90;a.fillStyle=`rgb(${x},${x},${x})`,a.fillRect(p*64+u+3,h*64+3,58,58)}for(let h=0;h<22;h++){let p=o()*1024,u=o()*1024,m=20+o()*70,x=a.createRadialGradient(p,u,0,p,u,m);x.addColorStop(0,"rgba(10,10,10,0.95)"),x.addColorStop(1,"rgba(10,10,10,0)"),a.fillStyle=x,a.fillRect(p-m,u-m,m*2,m*2);let b=r.createRadialGradient(p,u,0,p,u,m);b.addColorStop(0,"rgba(4,4,8,0.55)"),b.addColorStop(1,"rgba(4,4,8,0)"),r.fillStyle=b,r.fillRect(p-m,u-m,m*2,m*2)}let l=new os(n),c=new os(s);return[l,c].forEach(h=>{h.wrapS=h.wrapT=es,h.repeat.set(9,9),h.anisotropy=8}),l.colorSpace=We,{map:l,rmap:c}}function dn(i){return i.castShadow=!0,i.receiveShadow=!0,i}function m1(i,t){let e=new ce;[-1,1].forEach(r=>{let a=dn(new Dt(new De(.28,.34,7.5,14),i));a.position.set(r*3.3,3.75,0),e.add(a);let o=dn(new Dt(new De(.42,.46,.5,14),t));o.position.set(r*3.3,.25,0),e.add(o)});let n=dn(new Dt(new Ve(8.2,.42,.34),i));n.position.y=5.6,e.add(n);for(let r=-5;r<=5;r++){let a=dn(new Dt(new Ve(.98,.5,.62),i));a.position.set(r*.92,7.35+r*r*.018,0),a.rotation.z=-r*.035,e.add(a)}let s=dn(new Dt(new Ve(10.6,.2,.8),t));return s.position.y=7.72,e.add(s),e}function g1(i){let t=new ce;[[new De(.45,.55,.3,6),.15],[new De(.16,.2,1.1,8),.85],[new De(.42,.32,.22,6),1.5],[new Ve(.5,.45,.5),1.83],[new ri(.62,.45,6),2.28]].forEach(([s,r])=>{let a=dn(new Dt(s,i));a.position.y=r,t.add(a)});let n=new Dt(new ln(.11,10,8),new Qe({color:new Ct(16752704).multiplyScalar(5)}));return n.position.y=1.83,t.add(n),{group:t,flame:n}}function _1(i,t){let e=new ce,n=(s,r,a,o)=>{let l=dn(new Dt(new De(a*.65,a,r,6),i));if(l.position.y=r/2,s.add(l),o<=0)return;let c=o>2?2:2+Math.floor(t()*2);for(let h=0;h<c;h++){let p=new ce;p.position.y=r*(.7+t()*.3),p.rotation.set((t()-.5)*1.3,t()*Math.PI*2,(t()-.5)*1.3),s.add(p),n(p,r*(.55+t()*.2),a*.6,o-1)}};return n(e,2.6,.32,4),e}function uh(i,t,e,n){let s=new Float32Array(i*3),r=new Float32Array(i*3),a=ll(n?3:11);for(let h=0;h<i;h++)s[h*3]=(a()-.5)*50,s[h*3+1]=a()*14,s[h*3+2]=(a()-.5)*50,r[h*3]=(a()-.5)*.4,r[h*3+1]=n?.3+a()*.6:-(.25+a()*.4),r[h*3+2]=(a()-.5)*.4;let o=new pe;o.setAttribute("position",new Ee(s,3));let l=new ii({color:t,size:e,transparent:!0,opacity:.9,depthWrite:!1,blending:In}),c=new bi(o,l);return c.frustumCulled=!1,{pts:c,update(h,p){for(let u=0;u<i;u++)s[u*3]+=(r[u*3]+Math.sin(p*.7+u)*.25)*h,s[u*3+1]+=r[u*3+1]*h,s[u*3+2]+=r[u*3+2]*h,s[u*3+1]>14&&(s[u*3+1]=0),s[u*3+1]<0&&(s[u*3+1]=14);o.attributes.position.needsUpdate=!0}}}function dh(i){let t=new Ct(1444624);i.background=t,i.fog=new Bs(t,.032),i.add(new $s(4872832,1312777,.95));let e=new cs(16757670,1.7);e.position.set(-14,22,-18),e.castShadow=!0,e.shadow.mapSize.set(2048,2048);let n=e.shadow.camera;n.left=n.bottom=-20,n.right=n.top=20,n.near=1,n.far=70,e.shadow.bias=-4e-4,e.shadow.normalBias=.02,i.add(e);let s=new cs(9414911,.7);s.position.set(8,6,14),i.add(s);let r=new Dt(new ln(9,32,16),new Qe({color:new Ct(16726562).multiplyScalar(2.2),fog:!1}));r.position.set(-60,52,-110),i.add(r);let a=new Dt(new ln(15,32,16),new Qe({color:5901576,transparent:!0,opacity:.35,fog:!1,depthWrite:!1}));a.position.copy(r.position),i.add(a);let{map:o,rmap:l}=p1(),c=new Dt(new Xs(60,64),new Ne({map:o,roughnessMap:l,roughness:1,metalness:.15}));c.rotation.x=-Math.PI/2,c.receiveShadow=!0,i.add(c);let h=ll(42),p=new Ne({color:6032908,roughness:.6,metalness:.1}),u=new Ne({color:1118226,roughness:.8}),m=new Ne({color:3815478,roughness:.95}),x=new Ne({color:1380366,roughness:1}),b=m1(p,u);b.position.set(0,0,-17),i.add(b);let f=new ce;for(let R=-3;R<=3;R++){let _=3+h()*4.5,S=dn(new Dt(new De(.4,.45,_,10),p));S.position.set(R*2.6,_/2,0),S.rotation.z=(h()-.5)*.08,f.add(S)}let d=dn(new Dt(new Ve(20,.6,7),u));d.position.set(-2,6.6,-1.5),d.rotation.z=.12,d.rotation.x=.05,f.add(d);let M=dn(new Dt(new Ve(22,.8,9),m));M.position.set(0,.4,-1.5),f.add(M),f.position.set(0,0,-28),i.add(f);let C=[],v=15.5;for(let R=0;R<12;R++){let _=R/12*Math.PI*2+.13,S=Math.sin(_)*v,A=Math.cos(_)*v;if(!(Math.abs(S)<4.5&&A<-12))if(R%2===0){let P=g1(m);if(P.group.position.set(S,0,A),P.group.rotation.y=h()*6,i.add(P.group),C.length<4){let U=new js(16742958,6,9,1.8);U.position.set(S,1.9,A),i.add(U),C.push({light:U,flame:P.flame,seed:h()*100})}}else{let P=1+h()*3.5,U=dn(new Dt(new De(.35,.42,P,8),m));U.position.set(S,P/2,A),U.rotation.z=(h()-.5)*.25,i.add(U)}}for(let R=0;R<16;R++){let _=h()*Math.PI*2,S=19+h()*18,A=_1(x,h);A.position.set(Math.sin(_)*S,0,Math.cos(_)*S),A.scale.setScalar(.8+h()*.9),i.add(A)}for(let R=0;R<26;R++){let _=h()*Math.PI*2,S=16.5+h()*20,A=dn(new Dt(new Ys(.4+h()*1.2,0),m));A.position.set(Math.sin(_)*S,.2,Math.cos(_)*S),A.rotation.set(h()*3,h()*3,h()*3),i.add(A)}for(let R=0;R<9;R++){let _=Math.PI/2+R/8*Math.PI,S=new Dt(new ri(18+h()*14,26+h()*22,5),new Qe({color:853770}));S.position.set(Math.sin(_)*85,8,Math.cos(_)*85-20),i.add(S)}let E=uh(420,16738858,.07,!0),T=uh(160,11735594,.12,!1);return i.add(E.pts,T.pts),{update(R,_){E.update(R,_),T.update(R,_),C.forEach(S=>{let A=.8+Math.sin(_*9+S.seed)*.08+Math.sin(_*23+S.seed*3)*.06;S.light.intensity=6*A,S.flame.scale.setScalar(.9+(A-.8)*2)})}}}function fh(i,t=900){let e=new Float32Array(t*3),n=new Float32Array(t*3),s=new Float32Array(t*3),r=new Float32Array(t),a=new Float32Array(t),o=new Float32Array(t),l=new Float32Array(t*3),c=new pe;c.setAttribute("position",new Ee(e,3)),c.setAttribute("color",new Ee(n,3));let h=new ii({size:.09,vertexColors:!0,transparent:!0,depthWrite:!1,blending:In}),p=new bi(c,h);p.frustumCulled=!1,i.add(p);let u=0;for(let b=0;b<t;b++)e[b*3+1]=-100;function m(b,f,{color:d=16760944,speed:M=6,up:C=2,gravity:v=14,lifeTime:E=.45,spread:T=1,intensity:R=3}={}){let _=new Ct(d).multiplyScalar(R);for(let S=0;S<f;S++){let A=u;u=(u+1)%t,e[A*3]=b.x,e[A*3+1]=b.y,e[A*3+2]=b.z;let P=Math.random()*Math.PI*2,U=(Math.random()-.3)*T,B=M*(.3+Math.random()*.9);s[A*3]=Math.cos(P)*B,s[A*3+1]=C+U*B,s[A*3+2]=Math.sin(P)*B,r[A]=a[A]=E*(.5+Math.random()*.8),o[A]=v,l[A*3]=_.r,l[A*3+1]=_.g,l[A*3+2]=_.b}}function x(b){for(let f=0;f<t;f++){if(r[f]<=0)continue;r[f]-=b;let d=Math.max(0,r[f]/a[f]);s[f*3+1]-=o[f]*b,s[f*3]*=1-1.5*b,s[f*3+2]*=1-1.5*b,e[f*3]+=s[f*3]*b,e[f*3+1]+=s[f*3+1]*b,e[f*3+2]+=s[f*3+2]*b,e[f*3+1]<.02&&(e[f*3+1]=.02,s[f*3+1]*=-.3),n[f*3]=l[f*3]*d,n[f*3+1]=l[f*3+1]*d,n[f*3+2]=l[f*3+2]*d,r[f]<=0&&(e[f*3+1]=-100)}c.attributes.position.needsUpdate=!0,c.attributes.color.needsUpdate=!0}return{emit:m,update:x}}function ph(i,t=12576511,e=12){let n=e,s=new Float32Array(n*2*3),r=new Float32Array(n*2),a=[];for(let b=0;b<n-1;b++){let f=b*2,d=f+1,M=f+2,C=f+3;a.push(f,d,M,d,C,M)}let o=new pe;o.setAttribute("position",new Ee(s,3)),o.setAttribute("alpha",new Ee(r,1)),o.setIndex(a);let l=new Ct(t),c=new me({uniforms:{uColor:{value:new L(l.r,l.g,l.b)},uGain:{value:0}},vertexShader:`attribute float alpha; varying float vA;
      void main() { vA = alpha; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`uniform vec3 uColor; uniform float uGain; varying float vA;
      void main() { gl_FragColor = vec4(uColor * 1.5, vA * vA * vA * uGain * 0.75); }`,transparent:!0,depthWrite:!1,side:cn,blending:In}),h=new Dt(o,c);h.frustumCulled=!1,i.add(h);let p=[],u=new L,m=new L,x=0;return{update(b,f,d,M){b.getWorldPosition(u),f.getWorldPosition(m),p.unshift([u.clone(),m.clone()]),p.length>n&&p.pop(),x+=((d?1:0)-x)*Math.min(1,M*(d?30:9)),c.uniforms.uGain.value=x;for(let C=0;C<n;C++){let v=p[Math.min(C,p.length-1)],E=v[0],T=v[1],R=E.clone().lerp(T,.6);s.set([R.x,R.y,R.z,T.x,T.y,T.z],C*6);let _=1-C/(n-1);r[C*2]=_*.25,r[C*2+1]=_}o.attributes.position.needsUpdate=!0,o.attributes.alpha.needsUpdate=!0,h.visible=x>.01}}}var cl=["hips","spine","chest","neck","head","shL","elL","shR","elR","wrR","hipL","knL","hipR","knR"],Ye={hipsY:-.06,hips:[0,0,0],spine:[.06,0,0],chest:[0,-.3,0],neck:[0,.22,0],head:[0,0,0],shR:[-.75,.35,.05],elR:[-.95,0,0],wrR:[.75,.15,0],shL:[-.85,-.55,-.15],elL:[-1,0,0],hipL:[-.3,0,.06],knL:[.4,0,0],hipR:[.22,0,-.06],knR:[.32,0,0]};function x1(i,t,e){let n=new Dt(new qs(i,t,4,10),e);return n.position.y=-t/2,n.castShadow=!0,n}function qn(i,t,e,n,s=0,r=0,a=0){let o=new Dt(new Ve(i,t,e),n);return o.position.set(s,r,a),o.castShadow=!0,o}function La(i,t,e,n,s){i.add(x1(e,t,n)),s&&i.add(s);let r=new ce;return r.position.y=-t,i.add(r),r}function y1(i,t){let e=new ce,n=new Dt(new De(.018,.018,.26,8),t);n.rotation.x=Math.PI/2,n.position.z=-.06;let s=new Dt(new De(.05,.05,.012,12),new Ne({color:2762272,metalness:.8,roughness:.4}));s.rotation.x=Math.PI/2,s.position.z=.08;let r=new ce;for(let l=0;l<3;l++){let c=new Dt(new Ve(.008,.032-l*.004,.31),i);c.position.set(0,l*l*.012,.24+l*.3),c.rotation.x=-l*.05,c.castShadow=!0,r.add(c)}e.add(n,s,r);let a=new Se;a.position.z=.14;let o=new Se;return o.position.set(0,.05,1.02),e.add(a,o),[n,s].forEach(l=>l.castShadow=!0),{group:e,base:a,tip:o}}function mh(i){let t=i!=="player",e={armor:new Ne({color:t?1906463:2895677,roughness:.38,metalness:.35}),plate:new Ne({color:t?3804692:9050648,roughness:.5,metalness:.25}),cloth:new Ne({color:t?1446682:2235426,roughness:.95}),skin:new Ne({color:t?4865604:12095604,roughness:.7}),gold:new Ne({color:13214282,roughness:.3,metalness:1,emissive:2759168}),steel:new Ne({color:t?9080729:14673390,roughness:.16,metalness:1,emissive:t?16718362:10475263,emissiveIntensity:t?.15:.08}),eye:new Qe({color:t?16722458:16777215})};e.eye.color.multiplyScalar(4);let n=new ce,s={};s.hips=new ce,s.hips.position.y=.98,n.add(s.hips),s.hips.add(qn(.34,.18,.22,e.cloth));for(let f=0;f<5;f++){let d=f/5*Math.PI*2+.3,M=qn(.16,.26,.03,e.plate,Math.sin(d)*.17,-.16,Math.cos(d)*.13);M.rotation.y=d,M.rotation.x=.18,s.hips.add(M)}s.spine=new ce,s.spine.position.y=.08,s.hips.add(s.spine),s.chest=new ce,s.chest.position.y=.2,s.spine.add(s.chest),s.chest.add(qn(.44,.46,.27,e.armor,0,.12,0)),s.chest.add(qn(.46,.06,.29,e.plate,0,-.08,0)),s.chest.add(qn(.4,.04,.285,e.gold,0,.3,0)),s.neck=new ce,s.neck.position.y=.38,s.chest.add(s.neck),s.head=new ce,s.head.position.y=.06,s.neck.add(s.head);let r=new Dt(new ln(.115,16,12),e.skin);r.position.y=.09,r.castShadow=!0,s.head.add(r);let a=new Dt(new ln(.15,18,10,0,Math.PI*2,0,Math.PI/2),e.armor);a.position.y=.11,a.castShadow=!0,s.head.add(a);let o=new Dt(new De(.16,.24,.13,18,1,!0,Math.PI*.25,Math.PI*1.5),e.plate);o.position.set(0,.07,-.01),o.rotation.y=Math.PI,s.head.add(o),s.head.add(qn(.17,.09,.05,e.armor,0,.04,.1)),[-1,1].forEach(f=>{let d=new Dt(new ln(t?.017:.011,8,6),e.eye);d.position.set(f*.045,.1,.105),s.head.add(d)}),i==="player"?[-1,1].forEach(f=>{let d=qn(.02,.24,.015,e.gold,f*.06,.3,.1);d.rotation.z=-f*.42,s.head.add(d)}):[-1,1].forEach(f=>{let d=new Dt(new ri(.03,i==="oni"?.3:.18,8),e.armor);d.position.set(f*.1,.27,.02),d.rotation.z=-f*.5,d.castShadow=!0,s.head.add(d)});let l=f=>{let d=new ce;d.position.set(f*.28,.3,0),s.chest.add(d);let M=qn(.2,.22,.24,e.plate,f*.07,-.08,0);M.rotation.z=f*.2;let C=La(d,.28,.05,e.cloth,M),v=La(C,.25,.045,e.armor),E=new Dt(new ln(.05,10,8),e.skin);return E.castShadow=!0,v.add(E),{sh:d,el:C,wr:v}},c=l(1),h=l(-1);s.shL=c.sh,s.elL=c.el,s.shR=h.sh,s.elR=h.el,s.wrR=h.wr;let p=y1(e.steel,e.plate);s.wrR.add(p.group);let u=f=>{let d=new ce;d.position.set(f*.11,-.07,0),s.hips.add(d);let M=La(d,.44,.075,e.cloth);return La(M,.44,.06,e.armor).add(qn(.1,.06,.24,e.armor,0,-.02,.05)),{hip:d,kn:M}},m=u(1),x=u(-1);s.hipL=m.hip,s.knL=m.kn,s.hipR=x.hip,s.knR=x.kn;let b=i==="oni"?1.38:1;return n.scale.setScalar(b),{root:n,joints:s,mats:e,scale:b,blade:p,setQuats(f,d){for(let M of cl)f[M]&&s[M].quaternion.copy(f[M]);s.hips.position.y=.98+d},setPose(f){for(let d of cl){let M=f[d];M&&s[d].rotation.set(M[0],M[1],M[2])}s.hips.position.y=.98+(f.hipsY||0)}}}function Tr(i,t,e){let n={hipsY:(i.hipsY||0)+((t.hipsY||0)-(i.hipsY||0))*e};for(let s of cl){let r=i[s]||[0,0,0],a=t[s]||r;n[s]=[r[0]+(a[0]-r[0])*e,r[1]+(a[1]-r[1])*e,r[2]+(a[2]-r[2])*e]}return n}var v1=i=>i*i*(3-2*i);function gh(i,t,e=Ye){if(t<=i[0][0])return Tr(e,{...e,...i[0][1]},1);for(let n=0;n<i.length-1;n++){let[s,r]=i[n],[a,o]=i[n+1];if(t<=a){let l=v1((t-s)/(a-s));return Tr({...e,...r},{...e,...o},l)}}return{...e,...i[i.length-1][1]}}var _h={fps:30,duration:2.367,joints:["hips","spine","chest","neck","head","shL","elL","shR","elR","wrR","hipL","knL","hipR","knR"],frames:[{q:[.1503,.1163,.0536,.9803,.0831,-.129,.0534,.9867,.0497,-.0733,.0019,.9961,-.0068,.0203,-.0382,.999,-.068,.0749,-.1012,.9897,-.8346,0,.089,.5436,-.139,0,-.7223,.6775,.1531,0,-.2367,.9594,-.0799,0,-.0484,.9956,-.1392,-.1511,-.1955,.9589,.0199,0,-.0573,.9982,.3738,0,-.1952,.9067,-.6461,0,-.0413,.7621,.4526,0,.0258,.8913],y:-.2374,x:.0019,z:.0136},{q:[.1792,.1148,.0331,.9765,.0761,-.117,.0574,.9886,.0586,-.0871,.0308,.994,-.0188,.0184,-.0384,.9989,-.0726,.0653,-.0859,.9915,-.8335,0,.0246,.552,-.0749,0,-.7017,.7085,.1341,0,-.2278,.9644,-.0974,0,-.0548,.9937,-.1096,-.1377,-.148,.9732,.0023,0,-.0511,.9987,.3551,0,-.1846,.9164,-.6643,0,-.0373,.7466,.4663,0,.0231,.8843],y:-.2326,x:.025,z:.034},{q:[.2116,.1126,.0095,.9708,.0697,-.1015,.0653,.9902,.0724,-.1013,.0638,.9902,-.0369,.0166,-.0409,.9983,-.0727,.0533,-.072,.9933,-.8262,0,-.0227,.5629,-.0435,0,-.692,.7206,.1116,0,-.2169,.9698,-.1211,0,-.069,.9902,-.0719,-.1554,-.1,.9801,-.0414,0,-.041,.9983,.3619,0,-.1842,.9138,-.6804,0,-.032,.7322,.4785,0,.0193,.8779],y:-.2252,x:.0514,z:.0605},{q:[.2421,.1089,-.0138,.964,.0634,-.0828,.0749,.9917,.0897,-.1113,.0951,.9851,-.0545,.0146,-.0482,.9972,-.0674,.0322,-.0514,.9959,-.8182,0,-.0559,.5723,-.0421,0,-.6986,.7143,.0935,0,-.2028,.9748,-.1514,0,-.0914,.9842,-.045,-.1812,-.05,.9811,-.1476,0,-.0071,.989,.4591,0,-.2201,.8607,-.6945,0,-.0257,.719,.4928,0,.0148,.87],y:-.2193,x:.0785,z:.0897},{q:[.2653,.1023,-.0366,.958,.0569,-.0615,.0841,.9929,.1076,-.1138,.1192,.9804,-.0632,.0117,-.0573,.9963,-.0598,9e-4,-.021,.998,-.8108,0,-.0832,.5793,-.0548,0,-.7141,.6979,.0804,0,-.1862,.9792,-.1822,0,-.1156,.9764,-.0377,-.1925,-.0019,.9806,-.2799,0,.048,.9588,.5605,0,-.2631,.7852,-.7054,0,-.0157,.7086,.5114,0,.0095,.8593],y:-.2177,x:.1043,z:.1196},{q:[.2783,.0936,-.055,.9543,.0506,-.0419,.0867,.9941,.1246,-.1093,.1345,.977,-.0602,.0078,-.062,.9962,-.0541,-.0321,.0107,.998,-.8006,0,-.1049,.59,-.0688,0,-.7266,.6836,.0647,0,-.1738,.9827,-.2004,0,-.1281,.9713,-.0424,-.1847,.0345,.9813,-.3708,0,.1043,.9228,.6188,0,-.2798,.734,-.7052,0,-.0077,.7089,.5277,0,.0058,.8494],y:-.214,x:.1304,z:.1531},{q:[.2825,.0866,-.0675,.953,.0457,-.0281,.084,.995,.1389,-.1013,.1413,.9749,-.0519,.0037,-.06,.9968,-.0499,-.0567,.0317,.9966,-.7861,0,-.1063,.6089,-.0947,0,-.7288,.6781,.0398,0,-.1741,.9839,-.1946,0,-.1188,.9737,-.0461,-.1647,.0504,.984,-.4234,0,.1535,.8929,.652,0,-.2618,.7116,-.6935,0,-.0063,.7204,.5376,0,.0054,.8432],y:-.207,x:.1571,z:.1879},{q:[.2832,.0811,-.0706,.953,.0425,-.0204,.0785,.9958,.1472,-.0918,.1385,.9751,-.0463,8e-4,-.0566,.9973,-.0456,-.0704,.0404,.9957,-.7734,0,-.0701,.63,-.1591,0,-.716,.6797,.0077,0,-.1859,.9825,-.1695,0,-.0936,.9811,-.0456,-.1396,.0442,.9882,-.4752,0,.1932,.8584,.6765,0,-.22,.7028,-.6755,0,-.0168,.7372,.5422,0,.0082,.8402],y:-.1983,x:.1857,z:.2224},{q:[.2847,.0749,-.0618,.9537,.04,-.0167,.0713,.9965,.147,-.0804,.1257,.9778,-.045,-4e-4,-.0573,.9973,-.0414,-.0785,.044,.9951,-.7625,0,.0053,.6469,-.2744,0,-.6781,.6819,-.0222,0,-.1996,.9796,-.1442,0,-.0686,.9872,-.0452,-.114,.0239,.9922,-.5379,0,.2278,.8116,.6802,0,-.1696,.7131,-.6551,0,-.0421,.7543,.5426,0,.0136,.8399],y:-.1893,x:.2178,z:.2566},{q:[.2863,.0664,-.0448,.9548,.0374,-.0163,.0623,.9972,.1407,-.0669,.1058,.9821,-.0436,-9e-4,-.0608,.9972,-.0389,-.0864,.048,.9943,-.7388,0,.1077,.6653,-.4241,0,-.5973,.6808,-.0448,0,-.2126,.9761,-.1277,0,-.05,.9905,-.0458,-.0902,5e-4,.9949,-.577,0,.2615,.7737,.6365,0,-.1354,.7593,-.6327,0,-.0783,.7705,.5378,0,.0204,.8428],y:-.1807,x:.2531,z:.2894},{q:[.2863,.0543,-.0262,.9563,.0347,-.0207,.0511,.9979,.1329,-.0518,.0837,.9862,-.0384,-.0016,-.0626,.9973,-.0385,-.093,.0515,.9936,-.6893,0,.2166,.6913,-.567,0,-.4627,.6815,-.0688,0,-.2315,.9704,-.1086,0,-.0326,.9936,-.0428,-.0653,-.0234,.9967,-.5776,0,.2962,.7606,.5403,0,-.1175,.8332,-.6095,0,-.118,.784,.5294,0,.0268,.848],y:-.175,x:.2914,z:.3195},{q:[.2863,.0393,-.0099,.9573,.0322,-.0322,.0375,.9983,.1258,-.0366,.063,.9894,-.0313,-.0023,-.0602,.9977,-.0396,-.0944,.0517,.9934,-.6233,0,.3114,.7173,-.6538,0,-.2914,.6983,-.1091,0,-.2588,.9597,-.0788,0,-.0158,.9968,-.0363,-.0318,-.052,.9975,-.5442,0,.3198,.7756,.3837,0,-.0853,.9195,-.5895,0,-.1594,.7919,.5217,0,.0329,.8525],y:-.1757,x:.3343,z:.3467},{q:[.2882,.025,6e-4,.9573,.0301,-.0469,.0243,.9982,.1202,-.0242,.0467,.9914,-.0267,-.003,-.055,.9981,-.0418,-.0914,.0515,.9936,-.5635,0,.386,.7304,-.6596,0,-.1293,.7404,-.1682,0,-.2859,.9434,-.0519,0,-.0051,.9986,-.0291,.0123,-.0796,.9963,-.5063,0,.3106,.8045,.2065,0,-.0305,.978,-.5733,0,-.2034,.7937,.5163,0,.0422,.8554],y:-.185,x:.3836,z:.3726},{q:[.2902,.0151,.0032,.9569,.0287,-.0557,.0153,.9979,.1173,-.0179,.0381,.9922,-.0255,-.0034,-.0507,.9984,-.0448,-.0885,.056,.9935,-.5185,0,.4436,.731,-.6099,0,-.0138,.7923,-.2326,0,-.3055,.9233,-.0487,0,-3e-4,.9988,-.017,.0596,-.0908,.9939,-.5037,0,.289,.8141,.1115,0,.0044,.9938,-.556,0,-.2491,.793,.5104,0,.059,.8579],y:-.2,x:.4386,z:.3993},{q:[.2907,.0074,.001,.9568,.0279,-.0539,.0102,.9981,.1168,-.0164,.0368,.9923,-.025,-.0031,-.0498,.9984,-.0487,-.0872,.0646,.9929,-.4797,0,.4819,.7332,-.5585,0,.0562,.8276,-.2878,0,-.3201,.9026,-.0754,0,.0049,.9971,.0035,.0985,-.0806,.9919,-.5015,0,.2961,.8129,.0708,0,.0038,.9975,-.533,0,-.2929,.7938,.4964,0,.0819,.8642],y:-.2141,x:.4937,z:.426},{q:[.2927,-.0102,-.0029,.9561,.0269,-.0387,.0081,.9989,.1152,-.0139,.0381,.9925,-.0219,-.0017,-.0517,.9984,-.054,-.0835,.0707,.9925,-.4412,0,.4993,.7457,-.5308,0,.1009,.8415,-.3267,0,-.3344,.884,-.1266,0,.0136,.9919,.0238,.1219,-.0629,.9903,-.5416,0,.3159,.7791,.1803,0,-.043,.9827,-.5122,0,-.3285,.7936,.4674,0,.1039,.8779],y:-.2252,x:.5463,z:.4508},{q:[.3,-.0447,-.0036,.9529,.0252,-.013,.0066,.9996,.1101,-.0054,.0359,.9933,-.0166,.0015,-.0551,.9983,-.0608,-.072,.0717,.993,-.4049,0,.504,.7629,-.5075,0,.1312,.8516,-.3502,0,-.3504,.8687,-.1953,0,.0245,.9804,.0316,.1303,-.0574,.9893,-.5877,0,.3383,.7349,.3279,0,-.1069,.9386,-.5009,0,-.3532,.7901,.4191,0,.1123,.901],y:-.2336,x:.5977,z:.4731},{q:[.3116,-.0936,-5e-4,.9456,.024,.0186,.0033,.9995,.1055,.0081,.0258,.9941,-.0136,.0065,-.0578,.9982,-.0666,-.0507,.0708,.994,-.3704,0,.5071,.7783,-.4621,0,.1475,.8745,-.3665,0,-.3663,.8553,-.2715,0,.0361,.9618,.0224,.1299,-.0718,.9887,-.6095,0,.3597,.7065,.4231,0,-.1565,.8925,-.4953,0,-.3585,.7913,.3489,0,.0948,.9323],y:-.239,x:.6469,z:.4924},{q:[.3245,-.1445,.0068,.9348,.0249,.0461,-.0049,.9986,.1054,.0207,.0081,.9942,-.0178,.0118,-.0572,.9981,-.0686,-.0231,.0716,.9948,-.331,0,.5098,.7941,-.3985,0,.1528,.9044,-.3897,0,-.3768,.8404,-.3391,0,.0492,.9395,-.001,.1293,-.0976,.9868,-.6229,0,.3688,.6899,.4848,0,-.1869,.8544,-.4826,0,-.342,.8063,.2973,0,.0652,.9526],y:-.2431,x:.6931,z:.5092},{q:[.3381,-.1861,.0131,.9224,.0264,.0655,-.0127,.9974,.107,.027,-.0106,.9938,-.0293,.0154,-.052,.9981,-.0684,.0017,.0759,.9948,-.2828,0,.504,.816,-.3492,0,.1552,.9241,-.4271,0,-.3785,.8212,-.3899,0,.0645,.9186,-.0336,.1357,-.1237,.9824,-.6375,0,.3676,.6771,.5237,0,-.2088,.8259,-.4702,0,-.3216,.8219,.2851,0,.0439,.9575],y:-.2436,x:.7396,z:.5226},{q:[.3536,-.2141,.0168,.9104,.0264,.0787,-.0144,.9964,.1054,.0285,-.0239,.9937,-.0429,.016,-.0443,.998,-.0703,.0156,.0824,.994,-.2334,0,.4844,.8432,-.3308,0,.1585,.9303,-.4669,0,-.3779,.7995,-.4397,0,.0792,.8946,-.0714,.1515,-.1504,.9743,-.6577,0,.3587,.6624,.5447,0,-.2297,.8066,-.4672,0,-.2978,.8325,.3303,0,.0415,.943],y:-.241,x:.7898,z:.5325},{q:[.3691,-.2331,.0208,.8994,.0249,.0871,-.011,.9958,.1018,.0313,-.033,.9938,-.0538,.014,-.0358,.9978,-.0743,.0171,.0872,.9933,-.1944,0,.4534,.8699,-.3245,0,.1516,.9336,-.4947,0,-.3847,.7793,-.503,0,.09,.8596,-.1108,.1765,-.1836,.9606,-.6785,0,.3442,.6489,.5478,0,-.2539,.7972,-.4374,0,-.2685,.8582,.3579,0,.0496,.9325],y:-.2347,x:.8435,z:.5399},{q:[.3795,-.2508,.0267,.8902,.024,.0892,-.0086,.9957,.1006,.0385,-.042,.9933,-.0604,.0109,-.0275,.9977,-.0771,.0129,.0869,.9931,-.1656,0,.4159,.8942,-.3081,0,.1301,.9424,-.5164,0,-.3924,.7611,-.5587,0,.1034,.8229,-.15,.2105,-.2183,.941,-.6893,0,.3317,.6441,.5322,0,-.2836,.7977,-.3847,0,-.2332,.8931,.3501,0,.0583,.9349],y:-.2253,x:.8953,z:.5457},{q:[.3803,-.2695,.033,.8841,.0244,.0848,-.0101,.996,.1031,.0469,-.0505,.9923,-.0629,.0087,-.0208,.9978,-.0769,.0106,.0824,.9936,-.1353,0,.3743,.9174,-.2794,0,.1064,.9543,-.5473,0,-.3863,.7424,-.5829,0,.1318,.8018,-.191,.2517,-.2414,.9176,-.6885,0,.3224,.6496,.5058,0,-.3097,.8051,-.3326,0,-.1912,.9235,.3453,0,.0671,.9361],y:-.2148,x:.9398,z:.5483},{q:[.3718,-.2885,.0388,.8815,.0251,.0785,-.0135,.9965,.1062,.0533,-.0571,.9913,-.0617,.0079,-.0167,.9979,-.0745,.0119,.0773,.9941,-.0967,0,.3329,.938,-.2447,0,.0886,.9655,-.5867,0,-.3657,.7225,-.586,0,.1756,.7911,-.2339,.2957,-.2483,.8923,-.6846,0,.3074,.6609,.4853,0,-.3177,.8146,-.2746,0,-.1344,.9521,.3576,0,.0803,.9304],y:-.2052,x:.9783,z:.5465},{q:[.358,-.3095,.0443,.8798,.0247,.0749,-.016,.9968,.1062,.0596,-.0638,.9905,-.059,.0076,-.0137,.9981,-.071,.0137,.0738,.9946,-.0542,0,.2991,.9527,-.2048,0,.0735,.976,-.6224,0,-.3444,.7028,-.5955,0,.227,.7707,-.2746,.3382,-.2434,.8666,-.6814,0,.2861,.6737,.4776,0,-.3046,.8241,-.1882,0,-.0722,.9795,.3286,0,.0931,.9399],y:-.1973,x:1.0143,z:.541},{q:[.3442,-.3373,.0494,.8748,.023,.0748,-.0168,.9968,.102,.0716,-.0733,.9895,-.0585,.0064,-.0091,.9982,-.0662,.0136,.0698,.9953,-.0139,0,.2778,.9606,-.1606,0,.058,.9853,-.6536,0,-.3261,.683,-.614,0,.2886,.7347,-.3093,.3839,-.2291,.8393,-.6775,0,.2703,.684,.4715,0,-.2869,.8339,-.086,0,-.0242,.996,.2387,0,.1023,.9657],y:-.1906,x:1.0492,z:.5324},{q:[.3335,-.3741,.0544,.8637,.0205,.0763,-.0169,.9967,.095,.0908,-.0849,.9877,-.062,.0045,-.0021,.9981,-.0584,.0136,.0616,.9963,.0203,0,.2668,.9635,-.1177,0,.0433,.9921,-.6913,0,-.292,.6609,-.6077,0,.3731,.701,-.3369,.4471,-.2024,.8035,-.6715,0,.2707,.6898,.4569,0,-.2847,.8427,-.0218,0,.003,.9998,.1643,0,.1095,.9803],y:-.1844,x:1.0831,z:.52},{q:[.3237,-.4181,.0634,.8464,.0181,.0769,-.02,.9967,.087,.1128,-.096,.9851,-.0673,.0036,.0042,.9977,-.0464,.0185,.049,.9975,.0434,0,.2617,.9642,-.0773,0,.0295,.9966,-.7378,0,-.2281,.6353,-.5445,0,.4771,.6898,-.3568,.5318,-.1629,.7505,-.6607,0,.2857,.6941,.4309,0,-.2971,.8521,-.0295,0,-.0033,.9996,.1862,0,.1564,.97],y:-.1789,x:1.1165,z:.5037},{q:[.3106,-.4655,.0786,.825,.0171,.0744,-.027,.9967,.0807,.1341,-.1062,.9819,-.0713,.0052,.006,.9974,-.0303,.0299,.0357,.9985,.0548,0,.2599,.9641,-.0394,0,.0158,.9991,-.7804,0,-.1456,.6081,-.4342,0,.5645,.702,-.3705,.6198,-.118,.6816,-.6494,0,.3064,.696,.4108,0,-.3076,.8583,-.045,0,-.0247,.9987,.2078,0,.2,.9575],y:-.1771,x:1.151,z:.4838},{q:[.291,-.5169,.0999,.7988,.0178,.0689,-.0388,.9967,.0773,.1547,-.1174,.9779,-.072,.0096,3e-4,.9974,-.0132,.0451,.0261,.9986,.0641,0,.2568,.9643,-.0121,0,.0052,.9999,-.8095,0,-.0595,.5841,-.3147,0,.6067,.73,-.3851,.6896,-.0729,.609,-.6482,0,.3141,.6936,.4232,0,-.292,.8577,-.065,0,-.0599,.9961,.2277,0,.2186,.9489],y:-.1842,x:1.1874,z:.4606},{q:[.2681,-.5729,.1214,.765,.0186,.0628,-.0522,.9965,.0738,.1739,-.1305,.9733,-.0678,.0163,-.0107,.9975,-.0016,.064,.018,.9978,.085,0,.2466,.9654,-.002,0,.001,1,-.8218,0,.0331,.5687,-.207,0,.6024,.7709,-.4022,.7347,-.0295,.5455,-.6568,0,.3078,.6884,.4728,0,-.2389,.8482,-.0951,0,-.1072,.9897,.2548,0,.2394,.9369],y:-.2012,x:1.2232,z:.4365},{q:[.2479,-.6292,.1365,.7239,.0171,.0591,-.0589,.9964,.0652,.1876,-.1447,.9693,-.0582,.0233,-.0156,.9979,-8e-4,.0929,.0024,.9957,.1245,0,.228,.9657,-.007,0,.0043,1,-.8151,0,.1285,.5649,-.1196,0,.5596,.8201,-.4064,.7612,.0025,.5055,-.662,0,.3018,.6861,.5307,0,-.1662,.8311,-.1157,0,-.1458,.9825,.2773,0,.2662,.9232],y:-.2223,x:1.2541,z:.4175},{q:[.2318,-.6787,.1476,.6811,.0128,.0595,-.056,.9966,.051,.1924,-.1594,.9669,-.0473,.0272,-.0041,.9985,-.0087,.1307,-.0259,.991,.1705,0,.2073,.9633,-.0207,0,.0166,.9996,-.799,0,.1965,.5683,-.0675,0,.4892,.8696,-.3864,.7746,.009,.5006,-.6547,0,.3135,.6878,.5745,0,-.1213,.8094,-.1536,0,-.2013,.9674,.3283,0,.2963,.8969],y:-.2423,x:1.2783,z:.408},{q:[.2187,-.715,.1626,.6438,.0082,.0633,-.0456,.9969,.0393,.1914,-.1705,.9658,-.0409,.0274,.0148,.9987,-.0165,.1602,-.0597,.9851,.1999,0,.195,.9602,-.0394,0,.0405,.9984,-.794,0,.2048,.5723,-.0547,0,.4035,.9133,-.3632,.771,-.0036,.5231,-.6431,0,.332,.6901,.604,0,-.1174,.7883,-.2047,0,-.2564,.9447,.3867,0,.3221,.8641],y:-.2588,x:1.2956,z:.4076},{q:[.2087,-.7356,.1853,.6172,.0066,.0674,-.0323,.9972,.0394,.1898,-.1703,.9661,-.0411,.0274,.0197,.9986,-.0178,.1689,-.0863,.9817,.2027,0,.1996,.9587,-.0651,0,.0765,.9949,-.8086,0,.1486,.5692,-.0651,0,.3135,.9474,-.3676,.7484,-.0151,.5518,-.642,0,.3363,.689,.6265,0,-.1284,.7687,-.2496,0,-.3001,.9207,.4268,0,.3328,.8409],y:-.2722,x:1.3076,z:.4119},{q:[.202,-.7429,.2089,.6031,.0088,.0689,-.021,.9974,.0506,.1875,-.1531,.9689,-.0426,.0292,.0072,.9986,-.0115,.1642,-.1014,.9811,.183,0,.2249,.9571,-.0994,0,.1227,.9875,-.8317,0,.0519,.5527,-.0822,0,.233,.969,-.3888,.7084,-.0321,.5883,-.6537,0,.3298,.6811,.6356,0,-.1298,.761,-.2861,0,-.3341,.8981,.4572,0,.3395,.822],y:-.2849,x:1.3171,z:.4171},{q:[.1978,-.7425,.2223,.6001,.0126,.0677,-.0122,.9976,.0646,.1817,-.1221,.9736,-.0397,.0321,-.0074,.9987,-.0012,.1616,-.1091,.9808,.1497,0,.2741,.95,-.1395,0,.1749,.9747,-.8399,0,-.0734,.5378,-.1059,0,.1703,.9797,-.3815,.6368,-.0778,.6655,-.6708,0,.328,.6651,.6119,0,-.1236,.7812,-.3076,0,-.3562,.8823,.4811,0,.3438,.8064],y:-.2973,x:1.3246,z:.4236},{q:[.1962,-.7396,.2261,.6028,.0156,.0652,-.0058,.9977,.0743,.1734,-.0875,.9781,-.0347,.0345,-.0134,.9987,.0077,.1664,-.111,.9798,.108,0,.3507,.9302,-.1862,0,.2236,.9567,-.8008,0,-.2341,.5513,-.1389,0,.1192,.9831,-.3294,.5038,-.1445,.7854,-.686,0,.339,.6438,.5655,0,-.1184,.8162,-.3164,0,-.3693,.8738,.4972,0,.344,.7965],y:-.308,x:1.3294,z:.4337},{q:[.2002,-.7385,.2287,.6019,.0167,.0628,-.0016,.9979,.0769,.1686,-.0589,.9809,-.0347,.0361,-.0132,.9987,.0105,.1733,-.1073,.979,.0548,0,.4513,.8907,-.2429,0,.2528,.9365,-.6841,0,-.411,.6025,-.1742,0,.0683,.9823,-.2642,.3159,-.2018,.8887,-.6961,0,.3409,.6318,.516,0,-.1057,.85,-.3193,0,-.3769,.8695,.4948,0,.3386,.8003],y:-.3122,x:1.3283,z:.451},{q:[.2117,-.7429,.2331,.5907,.0165,.0607,.0013,.998,.0746,.1683,-.0375,.9822,-.0412,.0381,-.0137,.9983,.0056,.1802,-.102,.9783,-.013,0,.5628,.8265,-.3025,0,.2531,.9189,-.4961,0,-.5444,.6764,-.1918,0,.0167,.9813,-.2163,.1495,-.235,.9358,-.6979,0,.3365,.6323,.4591,0,-.0824,.8846,-.3169,0,-.378,.8699,.4622,0,.3251,.825],y:-.3056,x:1.3174,z:.4771},{q:[.2258,-.7533,.2365,.5706,.0164,.0568,.0041,.9982,.0731,.1632,-.0189,.9837,-.0485,.041,-.0174,.9978,-.005,.1886,-.0954,.9774,-.101,0,.665,.74,-.3531,0,.2302,.9068,-.2996,0,-.5821,.7559,-.1772,0,-.0155,.9841,-.1814,.0755,-.2454,.9493,-.6832,0,.3409,.6458,.3883,0,-.066,.9192,-.3046,0,-.3704,.8775,.3992,0,.2997,.8665],y:-.29,x:1.2978,z:.5075},{q:[.2339,-.7664,.2404,.5479,.0172,.0477,.006,.9987,.0756,.1391,.0015,.9874,-.0477,.0429,-.0244,.9976,-.018,.188,-.0756,.9791,-.2342,0,.7225,.6505,-.3998,0,.1793,.8989,-.1427,0,-.5417,.8284,-.1438,0,-.0232,.9893,-.1448,.0706,-.2423,.9567,-.6535,0,.3557,.6681,.3151,0,-.0691,.9466,-.2816,0,-.359,.8898,.3172,0,.2607,.9118],y:-.2715,x:1.2748,z:.5354},{q:[.2319,-.7789,.2496,.5265,.0183,.0303,.0059,.9994,.0796,.0891,.0256,.9925,-.0322,.0407,-.0368,.998,-.0274,.1566,-.0258,.9869,-.4262,0,.6825,.5938,-.4474,0,.0764,.8911,-.0107,0,-.4741,.8804,-.1195,0,-.0258,.9925,-.116,.0514,-.2347,.9638,-.626,0,.3665,.6884,.2732,0,-.0871,.958,-.2669,0,-.3569,.8952,.2526,0,.2273,.9405],y:-.2549,x:1.2536,z:.5588},{q:[-.2224,.7966,-.2626,-.497,-.0192,-.0061,-.0028,-.9998,-.0833,-.02,-.0509,-.995,.0056,-.0336,.0531,-.998,-.0199,.0854,.0525,.9948,-.608,0,.5364,.5853,-.4732,0,-.0674,.8784,.1134,0,-.4116,.9043,-.1241,0,-.039,.9915,.1119,.0192,.2322,-.966,-.6101,0,.3743,.6984,.2862,0,-.1126,.9515,-.2848,0,-.3717,.8836,.2387,0,.2124,.9476],y:-.2383,x:1.2365,z:.5809},{q:[-.2148,.829,-.2747,-.4373,.0202,-.0213,-.0019,.9996,.0886,-.0515,.0692,.9923,.0185,.0229,-.0628,.9976,.0128,-.0062,.1311,.9913,-.7082,0,.3608,.6069,-.4668,0,-.2275,.8546,.2071,0,-.3632,.9084,-.154,0,-.0703,.9856,.1158,.1072,.2441,-.9568,-.5784,0,.3952,.7137,.2974,0,-.131,.9457,-.3355,0,-.366,.868,.2347,0,.1799,.9553],y:-.217,x:1.2208,z:.6043},{q:[-.2196,.8733,-.2891,-.3248,.0215,-.047,-.0062,.9986,.0984,-.1093,.0768,.9861,.0297,.0095,-.0569,.9979,.0573,-.0873,.1855,.9771,-.7225,0,.2356,.65,-.4235,0,-.3859,.8196,.2396,0,-.3434,.9081,-.1886,0,-.1061,.9763,-.1026,-.1596,-.2633,.9459,-.5137,0,.4484,.7315,.3039,0,-.1573,.9396,-.4033,0,-.2975,.8653,.1892,0,.1135,.9753],y:-.1898,x:1.202,z:.6272},{q:[-.2441,.9033,-.3145,-.1601,.0244,-.063,-.0029,.9977,.1155,-.1477,.0843,.9786,.0276,-.0051,-.0379,.9989,.0944,-.1425,.2201,.9604,-.6821,0,.1989,.7037,-.3841,0,-.4847,.7859,.2022,0,-.3645,.909,-.2134,0,-.1166,.97,-.0826,-.1606,-.2764,.9439,-.4223,0,.512,.748,.3008,0,-.1881,.935,-.4859,0,-.1586,.8595,.1306,0,.05,.9902],y:-.1563,x:1.1719,z:.6491},{q:[-.276,.8909,-.3604,.0175,.0308,-.0691,.0092,.9971,.1431,-.1716,.1051,.969,.0173,-.0192,-.0153,.9995,.1151,-.1777,.2514,.9445,-.6355,0,.2175,.7408,-.4085,0,-.5016,.7626,.1009,0,-.3993,.9113,-.2243,0,-.0974,.9697,-.0843,-.1255,-.2828,.9472,-.3483,0,.5481,.7604,.2913,0,-.2098,.9333,-.6114,0,.0203,.7911,.2347,0,.0124,.972],y:-.1206,x:1.123,z:.6682},{q:[-.2979,.8368,-.4256,.173,.0409,-.0646,.0266,.9967,.1785,-.1829,.1353,.9573,.0069,-.031,.0055,.9995,.1229,-.2012,.2797,.9307,-.6117,0,.2413,.7534,-.493,0,-.448,.7458,-.0318,0,-.407,.9129,-.2344,0,-.0719,.9695,-.112,-.0744,-.2845,.9492,-.3361,0,.5571,.7593,.2984,0,-.2246,.9277,-.7005,0,.1576,.696,.4046,0,-.0427,.9135],y:-.0885,x:1.0537,z:.6777},{q:[-.2959,.7563,-.4942,.3102,.0509,-.051,.0398,.9966,.2098,-.1732,.1562,.9495,.0042,-.0382,.0234,.999,.1273,-.2089,.2884,.9257,-.5935,0,.272,.7575,-.5995,0,-.3278,.7302,-.1579,0,-.3885,.9078,-.2653,0,-.0501,.9629,-.1471,-.0196,-.2833,.9475,-.3447,0,.5591,.754,.3072,0,-.2345,.9223,-.7617,0,.1839,.6213,.6055,0,-.0512,.7942],y:-.0658,x:.9778,z:.6679},{q:[-.2688,.6585,-.5482,.44,.0559,-.0357,.0431,.9969,.225,-.1361,.1569,.952,.0061,-.0382,.0366,.9986,.1341,-.1887,.2741,.9334,-.5347,0,.3378,.7746,-.6798,0,-.1491,.7181,-.275,0,-.3683,.8881,-.319,0,-.0197,.9476,-.1797,.0376,-.2809,.942,-.3179,0,.5419,.778,.2614,0,-.223,.9391,-.7718,0,.0542,.6335,.6619,0,.0639,.7469],y:-.0531,x:.9127,z:.639},{q:[-.2209,.5499,-.5903,.548,.0535,-.0271,.0366,.9975,.2189,-.0833,.1422,.9617,.003,-.0327,.0483,.9983,.1395,-.1398,.2576,.9459,-.4033,0,.4251,.8104,-.7001,0,.0441,.7127,-.3917,0,-.3514,.8503,-.392,0,.0273,.9195,-.2086,.0943,-.2773,.9331,-.3237,0,.5344,.7808,.2514,0,-.222,.9421,-.7333,0,-.1206,.6691,.5535,0,.1402,.821],y:-.0553,x:.8743,z:.6066},{q:[-.1541,.4478,-.6353,.61,.045,-.025,.0256,.9983,.1926,-.0388,.12,.9731,-.0072,-.0306,.0727,.9969,.134,-.0844,.2525,.9545,-.2289,0,.4778,.8481,-.6752,0,.1815,.7149,-.4866,0,-.3279,.8098,-.4961,0,.0804,.8645,-.2247,.1387,-.2727,.9252,-.3742,0,.5495,.747,.2821,0,-.2273,.9321,-.6447,0,-.2467,.7236,.3132,0,.0936,.9451],y:-.0657,x:.8596,z:.5897},{q:[-.0718,.3746,-.6773,.6291,.0349,-.0221,.0136,.9991,.1557,-.0117,.0922,.9834,-.0175,-.0381,.1152,.9925,.1123,-.0523,.2503,.9602,-.0978,0,.483,.8701,-.6466,0,.2206,.7303,-.5368,0,-.2956,.7903,-.6201,0,.1322,.7733,.2216,-.1777,.2658,-.9212,-.4457,0,.5465,.709,.2935,0,-.2172,.931,-.5386,0,-.3675,.7581,.187,0,.0331,.9818],y:-.0767,x:.8559,z:.593},{q:[.0034,.334,-.698,.6335,.0282,-.0106,-1e-4,.9995,.1252,.0143,.0623,.9901,-.0234,-.0502,.1537,.9866,.0788,-.0603,.2421,.9652,-.0701,0,.4661,.882,-.6145,0,.1757,.7691,-.5639,0,-.2432,.7892,-.694,0,.215,.6871,.2186,-.2492,.2505,-.9096,-.5072,0,.5266,.6822,.2979,0,-.1946,.9345,-.3499,0,-.4266,.834,.0807,0,-.0326,.9962],y:-.0841,x:.8509,z:.6092},{q:[.0436,.3073,-.7006,.6425,.0268,.0132,-.0138,.9995,.1124,.0552,.0376,.9914,-.0269,-.0567,.1635,.9846,.0436,-.0895,.2337,.9672,-.1309,0,.4211,.8975,-.5463,0,.1099,.8303,-.6037,0,-.1503,.7829,-.6505,0,.3614,.668,-.2418,.3744,-.225,.8665,-.5365,0,.5166,.6673,.3072,0,-.1823,.934,-.1653,0,-.367,.9154,.0825,0,-.0435,.9956],y:-.0903,x:.8393,z:.6203},{q:[.0603,.2855,-.6977,.6542,.0291,.0351,-.0157,.9988,.1149,.1014,.0186,.988,-.0338,-.0551,.1516,.9863,.0173,-.1034,.2329,.9668,-.2101,0,.341,.9163,-.4539,0,.0669,.8886,-.6497,0,-.0266,.7597,-.495,0,.5135,.7009,-.2878,.5184,-.1878,.783,-.5482,0,.5178,.6568,.3265,0,-.1863,.9267,-.1367,0,-.3301,.934,.3102,0,.099,.9455],y:-.0991,x:.8327,z:.6248},{q:[.088,.2683,-.6753,.6813,.0323,.0469,-.0223,.9981,.1233,.1304,-.0058,.9838,-.0499,-.0523,.1416,.9873,.0047,-.0979,.2337,.9674,-.2523,0,.2655,.9305,-.3968,0,.0376,.9171,-.6668,0,.0956,.7391,-.3055,0,.6171,.7252,-.3318,.6409,-.1414,.6776,-.561,0,.5022,.658,.3522,0,-.1928,.9158,-.0919,0,-.26,.9612,.419,0,.1912,.8876],y:-.104,x:.825,z:.6373},{q:[.1363,.2566,-.6401,.7112,.0341,.0494,-.0345,.9976,.1264,.1343,-.0461,.9818,-.0731,-.0538,.1413,.9858,.0037,-.0933,.2279,.9692,-.2528,0,.2355,.9384,-.4086,0,.01,.9127,-.6538,0,.1852,.7336,-.136,0,.6801,.7204,-.3602,.7352,-.0985,.5657,-.5915,0,.4606,.6618,.3793,0,-.1861,.9064,-.0496,0,-.1697,.9842,.4442,0,.2731,.8533],y:-.1087,x:.8114,z:.6532},{q:[.1961,.2452,-.5961,.739,.0323,.0446,-.0513,.9972,.1158,.1227,-.1009,.9805,-.0936,-.0572,.1414,.9839,.0092,-.0982,.2163,.9713,-.2244,0,.2493,.9421,-.4612,0,-.0058,.8873,-.642,0,.2369,.7292,.0127,0,.7113,.7028,-.3766,.8098,-.0655,.4451,-.6362,0,.3989,.6604,.4093,0,-.1654,.8973,-.043,0,-.0704,.9966,.4221,0,.3227,.8472],y:-.1166,x:.7919,z:.6636},{q:[.2719,.2102,-.5374,.7701,.027,.0361,-.0691,.9966,.0942,.1064,-.1567,.9774,-.1059,-.0582,.1331,.9837,.0159,-.1074,.2002,.9737,-.1792,0,.276,.9443,-.5143,0,.0183,.8574,-.6517,0,.2608,.7122,.1315,0,.7148,.6868,-.3838,.8609,-.0417,.3315,-.6908,0,.3245,.6462,.4367,0,-.1357,.8893,-.1087,0,-.0016,.9941,.4124,0,.3388,.8456],y:-.1294,x:.7656,z:.6621},{q:[.3393,.1675,-.4707,.797,.0217,.0284,-.0795,.9962,.0763,.0915,-.1964,.9733,-.1129,-.0563,.1159,.9852,.0195,-.118,.1793,.9765,-.1283,0,.2882,.9489,-.5491,0,.0716,.8327,-.6859,0,.2648,.6778,.1944,0,.7128,.6739,-.3786,.8855,-.0252,.2683,-.7372,0,.2511,.6272,.4563,0,-.106,.8835,-.1884,0,.0351,.9815,.4059,0,.3329,.8511],y:-.1455,x:.7447,z:.6483},{q:[.3634,.148,-.3953,.8305,.0207,.0259,-.081,.9962,.0731,.0802,-.2115,.9713,-.1142,-.053,.0956,.9874,.0182,-.1295,.1603,.9784,-.076,0,.2872,.9548,-.5654,0,.1021,.8185,-.7351,0,.2528,.629,.192,0,.7228,.6638,-.3574,.8909,-.0067,.2802,-.7515,0,.1729,.6366,.466,0,-.0765,.8815,-.2199,0,.0573,.9738,.4103,0,.3083,.8583],y:-.1586,x:.7325,z:.6248},{q:[.3498,.142,-.3241,.8675,.0258,.0302,-.0785,.9961,.0825,.0707,-.2062,.9725,-.105,-.0494,.0796,.99,.0131,-.1375,.1515,.9788,-.0226,0,.2878,.9574,-.5615,0,.0862,.823,-.7804,0,.2225,.5843,.1317,0,.7406,.6589,-.3197,.8796,.0251,.3514,-.7409,0,.1007,.664,.4723,0,-.0469,.8802,-.1991,0,.0797,.9767,.4089,0,.2764,.8697],y:-.1683,x:.726,z:.5973},{q:[.3191,.1282,-.2625,.9016,.0348,.0395,-.0752,.9958,.0938,.0629,-.1887,.9755,-.0871,-.0451,.0687,.9928,.0079,-.1384,.1493,.979,.0273,0,.2892,.9569,-.5258,0,.0522,.849,-.8048,0,.183,.5647,.0556,0,.7495,.6596,-.276,.8553,.0693,.4329,-.7192,0,.0507,.693,.4739,0,-.0265,.8802,-.1518,0,.102,.9831,.3921,0,.2405,.888],y:-.1749,x:.721,z:.5693},{q:[.2846,.0992,-.2057,.9311,.0444,.0521,-.0734,.9949,.0966,.06,-.1627,.9801,-.0685,-.0395,.0556,.9953,.0062,-.1354,.1451,.9801,.064,0,.2813,.9575,-.4589,0,.0355,.8878,-.8091,0,.1476,.5688,.0179,0,.7484,.663,-.2454,.8357,.0964,.4818,-.6946,0,.0187,.7192,.4679,0,-.0154,.8836,-.1182,0,.1072,.9872,.3922,0,.2118,.8952],y:-.1815,x:.7158,z:.5386},{q:[.2521,.0575,-.1547,.9535,.0529,.0672,-.0729,.9937,.0885,.0638,-.1288,.9857,-.0538,-.0322,.0357,.9974,.0068,-.1326,.1363,.9817,.0851,0,.2626,.9611,-.3759,0,.0415,.9257,-.8078,0,.112,.5787,.0195,0,.7465,.6651,-.2353,.8281,.084,.5018,-.6753,0,-.0019,.7376,.4593,0,-.0071,.8883,-.0946,0,.1132,.9891,.3853,0,.1809,.9049],y:-.1915,x:.7115,z:.5036},{q:[.2214,.0084,-.113,.9686,.0613,.0834,-.0716,.992,.0766,.0715,-.0911,.9903,-.0402,-.0249,.0166,.9987,.0013,-.1271,.125,.984,.1006,0,.2427,.9649,-.2937,0,.0559,.9543,-.8112,0,.0714,.5804,.0235,0,.7462,.6653,-.2344,.8183,.0566,.5218,-.6646,0,-.0088,.7471,.4541,0,-.004,.8909,-.057,0,.1282,.9901,.3588,0,.1499,.9213],y:-.2061,x:.7096,z:.4655},{q:[.1904,-.0422,-.0811,.9775,.07,.1006,-.0683,.9901,.0676,.0775,-.0573,.993,-.0247,-.0201,.0108,.9994,-.0167,-.1135,.1139,.9869,.1202,0,.2325,.9651,-.2202,0,.0665,.9732,-.8207,0,.0246,.5708,-.0025,0,.7454,.6666,-.2254,.7956,.047,.5604,-.6572,0,-2e-4,.7537,.4521,0,-.0096,.8919,-.0216,0,.1208,.9924,.3556,0,.1398,.9241],y:-.2209,x:.7102,z:.4315},{q:[.1638,-.0872,-.0597,.9808,.0777,.1165,-.062,.9882,.0603,.0782,-.029,.9947,-.0114,-.0189,.0203,.9996,-.0432,-.0941,.1057,.989,.1412,0,.2326,.9623,-.1506,0,.0661,.9864,-.8308,0,-.029,.5558,-.0622,0,.739,.6708,-.2056,.761,.0568,.6127,-.6491,0,.0165,.7605,.4508,0,-.0175,.8925,-.007,0,.0851,.9963,.384,0,.1604,.9093],y:-.2316,x:.7117,z:.4064},{q:[.1503,.1163,.0536,.9803,.0831,-.129,.0534,.9867,.0497,-.0733,.0019,.9961,-.0068,.0203,-.0382,.999,-.068,.0749,-.1012,.9897,-.8346,0,.089,.5436,-.139,0,-.7223,.6775,.1531,0,-.2367,.9594,-.0799,0,-.0484,.9956,-.1392,-.1511,-.1955,.9589,.0199,0,-.0573,.9982,.3738,0,-.1952,.9067,-.6461,0,-.0413,.7621,.4526,0,.0258,.8913],y:-.2374,x:.0019,z:.0136}]};var xh={fps:30,duration:5.767,joints:["hips","spine","chest","neck","head","shL","elL","shR","elR","wrR","hipL","knL","hipR","knR"],frames:[{q:[-.0165,.0177,.0172,.9996,.02,.0052,.0029,.9998,.0804,.0236,-.0267,.9961,.0444,.0039,.0116,.9989,-.141,.0247,.0114,.9896,-.1027,0,.1086,.9888,-.1271,0,4e-4,.9919,.0115,0,-.1207,.9926,-.2419,0,.0338,.9697,.1038,.2256,.1616,.9551,-.0384,0,.0685,.9969,.1309,0,-.0161,.9913,-.0327,0,-.0914,.9953,.1614,0,.0325,.9863],y:-.0041,x:-3e-4,z:.0063},{q:[-.016,.0178,.0169,.9996,.0199,.0052,.0028,.9998,.08,.0237,-.027,.9962,.0442,.0038,.0118,.9989,-.1413,.0245,.0112,.9896,-.1027,0,.1084,.9888,-.1268,0,4e-4,.9919,.0116,0,-.1204,.9927,-.2416,0,.0336,.9698,.1027,.2258,.1623,.9551,-.0392,0,.0686,.9969,.1315,0,-.0162,.9912,-.0333,0,-.0913,.9953,.1616,0,.0325,.9863],y:-.0041,x:-3e-4,z:.0067},{q:[-.0157,.0176,.0168,.9996,.0199,.0052,.0027,.9998,.0798,.0238,-.0272,.9962,.0441,.0036,.0123,.9989,-.1413,.0241,.0111,.9896,-.1026,0,.1081,.9888,-.1263,0,5e-4,.992,.0116,0,-.1201,.9927,-.2412,0,.0335,.9699,.102,.2258,.1629,.955,-.0394,0,.0688,.9969,.132,0,-.0163,.9911,-.0335,0,-.0912,.9953,.1618,0,.0325,.9863],y:-.0042,x:-4e-4,z:.0071},{q:[-.0155,.0173,.0167,.9996,.0199,.0053,.0029,.9998,.0796,.0239,-.0268,.9962,.0441,.0035,.0119,.9989,-.1416,.0232,.0116,.9896,-.1025,0,.1078,.9889,-.1259,0,5e-4,.992,.0116,0,-.1204,.9927,-.2408,0,.0334,.97,.1016,.2253,.1631,.9552,-.0396,0,.0691,.9968,.1326,0,-.0164,.991,-.0337,0,-.0911,.9953,.1623,0,.0326,.9862],y:-.0042,x:-5e-4,z:.0076},{q:[-.0149,.0171,.0166,.9996,.0198,.0053,.0029,.9998,.0793,.024,-.0268,.9962,.0442,.0034,.0118,.9989,-.1418,.0223,.0124,.9896,-.1024,0,.1076,.9889,-.1254,0,5e-4,.9921,.0115,0,-.1202,.9927,-.2401,0,.0332,.9702,.1012,.2251,.1628,.9553,-.0403,0,.0693,.9968,.1334,0,-.0166,.9909,-.0343,0,-.091,.9953,.1627,0,.0326,.9861],y:-.0043,x:-5e-4,z:.0081},{q:[-.0147,.0169,.0166,.9996,.0197,.0053,.0028,.9998,.0792,.0241,-.027,.9962,.0441,.0033,.0121,.9989,-.1418,.0219,.0128,.9896,-.1023,0,.1076,.9889,-.125,0,5e-4,.9922,.0111,0,-.1199,.9927,-.2395,0,.0329,.9703,.1011,.225,.1623,.9554,-.0407,0,.0694,.9968,.1344,0,-.0167,.9908,-.0346,0,-.091,.9952,.1632,0,.0327,.9861],y:-.0044,x:-5e-4,z:.0085},{q:[-.0144,.0166,.0166,.9996,.0197,.0053,.0029,.9998,.079,.0239,-.0267,.9962,.0442,.0033,.0118,.9989,-.1419,.0215,.013,.9896,-.1022,0,.1076,.9889,-.1246,0,5e-4,.9922,.011,0,-.1204,.9927,-.2389,0,.0328,.9705,.1006,.2245,.1619,.9556,-.0413,0,.0695,.9967,.1356,0,-.0168,.9906,-.0351,0,-.0911,.9952,.1639,0,.0329,.9859],y:-.0045,x:-5e-4,z:.0091},{q:[-.0138,.0162,.0164,.9996,.0196,.0053,.0029,.9998,.0786,.0239,-.0265,.9963,.0442,.0033,.0118,.9989,-.1419,.0213,.0131,.9896,-.102,0,.1074,.989,-.1243,0,6e-4,.9922,.011,0,-.1207,.9926,-.2387,0,.0328,.9706,.1,.2246,.1608,.9559,-.0423,0,.0699,.9967,.137,0,-.017,.9904,-.0358,0,-.0909,.9952,.1645,0,.0329,.9858],y:-.0046,x:-6e-4,z:.0096},{q:[-.0135,.0159,.0162,.9997,.0195,.0053,.003,.9998,.0782,.024,-.0266,.9963,.0443,.0032,.012,.9989,-.1419,.021,.0131,.9896,-.1018,0,.1073,.989,-.1243,0,7e-4,.9922,.011,0,-.1207,.9926,-.2389,0,.0331,.9705,.0994,.2247,.1596,.9561,-.0431,0,.0702,.9966,.1385,0,-.0173,.9902,-.0364,0,-.0908,.9952,.1653,0,.0331,.9857],y:-.0047,x:-6e-4,z:.0101},{q:[-.0132,.0156,.0162,.9997,.0195,.0053,.003,.9998,.078,.024,-.0264,.9963,.0443,.0031,.0118,.9989,-.1421,.0207,.0128,.9896,-.1017,0,.107,.989,-.1244,0,7e-4,.9922,.0109,0,-.1215,.9925,-.239,0,.0332,.9705,.0988,.2242,.159,.9564,-.0439,0,.0703,.9966,.1403,0,-.0175,.99,-.0369,0,-.091,.9952,.1663,0,.0333,.9855],y:-.0049,x:-5e-4,z:.0106},{q:[-.0132,.0154,.0162,.9997,.0195,.0052,.0031,.9998,.0782,.0239,-.0262,.9963,.0444,.0031,.0116,.9989,-.1424,.0204,.0125,.9895,-.1016,0,.1066,.9891,-.1246,0,8e-4,.9922,.0104,0,-.1222,.9924,-.2384,0,.0329,.9706,.0983,.2241,.1591,.9564,-.0444,0,.0703,.9965,.1421,0,-.0178,.9897,-.0371,0,-.0912,.9951,.1674,0,.0337,.9853],y:-.005,x:-5e-4,z:.0112},{q:[-.0134,.0154,.0164,.9997,.0195,.0051,.0031,.9998,.0783,.0236,-.0265,.9963,.0445,.003,.0118,.9989,-.1424,.0204,.0122,.9895,-.1015,0,.1065,.9891,-.1248,0,8e-4,.9922,.0099,0,-.1225,.9924,-.2375,0,.0326,.9708,.0975,.2242,.1601,.9564,-.0448,0,.0702,.9965,.144,0,-.0181,.9894,-.0372,0,-.0916,.9951,.1688,0,.0341,.9851],y:-.0052,x:-4e-4,z:.0119},{q:[-.0134,.0155,.0165,.9997,.0195,.005,.0033,.9998,.0781,.0231,-.0264,.9963,.0445,.0031,.0117,.9989,-.1421,.0207,.0116,.9896,-.1012,0,.1069,.9891,-.1249,0,8e-4,.9922,.0098,0,-.1234,.9923,-.2367,0,.0323,.9711,.097,.2247,.161,.9561,-.0456,0,.0702,.9965,.1463,0,-.0183,.9891,-.0374,0,-.092,.9951,.17,0,.0344,.9848],y:-.0054,x:-3e-4,z:.0127},{q:[-.0131,.0156,.0166,.9997,.0194,.0049,.0035,.9998,.0778,.0228,-.0264,.9964,.0446,.0031,.0115,.9989,-.142,.0207,.0116,.9896,-.1008,0,.1075,.9891,-.1254,0,6e-4,.9921,.0099,0,-.1235,.9923,-.2363,0,.0323,.9711,.097,.226,.16,.956,-.0472,0,.0704,.9964,.1494,0,-.0187,.9886,-.0379,0,-.0923,.995,.1716,0,.0346,.9846],y:-.0057,x:-1e-4,z:.0135},{q:[-.0127,.0152,.0167,.9997,.0192,.0049,.0038,.9998,.077,.023,-.0267,.9964,.0449,.0031,.0116,.9989,-.1412,.0207,.0118,.9897,-.1006,0,.1075,.9891,-.1264,0,7e-4,.992,.0103,0,-.1223,.9924,-.2362,0,.0324,.9712,.0976,.2264,.1574,.9563,-.0494,0,.0705,.9963,.1545,0,-.0194,.9878,-.0392,0,-.0929,.9949,.1742,0,.0352,.9841],y:-.0062,x:2e-4,z:.0144},{q:[-.0122,.0146,.0166,.9997,.0188,.0049,.0045,.9998,.0754,.0233,-.0262,.9965,.0453,.0032,.0111,.9989,-.1371,.0214,.0111,.9903,-.1005,0,.1054,.9893,-.1266,0,.0011,.992,.0126,0,-.1218,.9925,-.2384,0,.0324,.9706,.1009,.226,.1553,.9564,-.053,0,.0712,.9961,.1628,0,-.0206,.9864,-.0412,0,-.0938,.9947,.1784,0,.0364,.9833],y:-.007,x:8e-4,z:.0159},{q:[-.0113,.0141,.0166,.9997,.0175,.0051,.0054,.9998,.0704,.0242,-.0241,.9969,.0471,.0036,.0085,.9988,-.1241,.0224,.0082,.992,-.0987,0,.1022,.9899,-.1249,0,.0013,.9922,.0198,0,-.1245,.992,-.2468,0,.0321,.9685,.1092,.2239,.1614,.9549,-.058,0,.0723,.9957,.175,0,-.0226,.9843,-.0436,0,-.0953,.9945,.1845,0,.0384,.9821],y:-.0083,x:.0017,z:.0189},{q:[-.0107,.0132,.0172,.9997,.0144,.0056,.0065,.9999,.0578,.0266,-.0211,.9978,.0524,.0045,.0037,.9986,-.091,.0257,.0016,.9955,-.0933,0,.1031,.9903,-.1231,0,0,.9924,.0365,0,-.1308,.9907,-.2653,0,.032,.9636,.1212,.2208,.1836,.9502,-.0609,0,.0729,.9955,.1882,0,-.0249,.9818,-.0439,0,-.0979,.9942,.1911,0,.0412,.9807],y:-.0101,x:.0029,z:.0257},{q:[-.0115,.0126,.0182,.9997,.0086,.0058,.0074,.9999,.0347,.0278,-.0173,.9989,.0622,.007,-.0031,.998,-.0303,.037,-.0113,.9988,-.0842,0,.1165,.9896,-.1296,0,-.005,.9916,.0701,0,-.1343,.9885,-.3007,0,.0332,.9531,.1308,.2202,.2222,.9407,-.0582,0,.0734,.9956,.1976,0,-.0274,.9799,-.0389,0,-.1005,.9942,.195,0,.0435,.9798],y:-.0118,x:.0039,z:.036},{q:[-.017,.0178,.0207,.9995,.002,.0044,.008,1,.0081,.0231,-.015,.9996,.0722,.0113,-.0101,.9973,.0411,.059,-.0323,.9969,-.0723,0,.1444,.9869,-.1534,0,-.016,.988,.1162,0,-.1355,.9839,-.3531,0,.0313,.9351,.1357,.2093,.2704,.9299,-.046,0,.0727,.9963,.2009,0,-.0289,.9792,-.0231,0,-.1037,.9943,.1962,0,.0457,.9795],y:-.0134,x:.0046,z:.0511},{q:[-.0263,.0299,.0252,.9989,-.0038,.0016,.0082,1,-.0149,.0139,-.0153,.9997,.077,.0166,-.017,.9968,.0859,.0903,-.0646,.9901,-.0564,0,.1776,.9825,-.2002,0,-.0335,.9792,.1613,0,-.1405,.9769,-.4106,0,.0143,.9117,.1371,.1633,.3137,.9253,-.0303,0,.0706,.997,.2043,0,-.0302,.9784,-.0039,0,-.1094,.994,.2043,0,.0502,.9776],y:-.0155,x:.0052,z:.0688},{q:[-.0376,.0412,.0311,.998,-.0079,-.0011,.008,.9999,-.0316,.005,-.0171,.9993,.0776,.0231,-.0259,.9964,.0746,.1306,-.1072,.9828,-.0373,0,.2049,.9781,-.26,0,-.0485,.9644,.1935,0,-.1436,.9705,-.4546,0,-.0183,.8905,.1358,.0822,.3321,.9298,-.0196,0,.0695,.9974,.2185,0,-.034,.9752,.0068,0,-.1186,.9929,.2292,0,.0594,.9716],y:-.0192,x:.0049,z:.0846},{q:[-.0521,.0464,.0373,.9969,-.0087,-.0026,.0076,.9999,-.0347,8e-4,-.0194,.9992,.0738,.0303,-.0395,.996,.0047,.1727,-.1508,.9734,-.0305,0,.2246,.974,-.3017,0,-.0471,.9522,.2082,0,-.1372,.9684,-.4624,0,-.0575,.8848,.1327,-.0156,.3193,.9382,-.0153,0,.072,.9973,.2494,0,-.0423,.9675,.0024,0,-.1335,.9911,.2793,0,.0762,.9572],y:-.0257,x:.0031,z:.0967},{q:[-.0677,.0473,.0403,.9958,-.0059,-.0036,.0093,.9999,-.0234,.0015,-.0223,.9995,.059,.0381,-.0575,.9959,-.0977,.2083,-.1789,.9566,-.0416,0,.2424,.9693,-.3126,0,-.0306,.9494,.201,0,-.1274,.9713,-.4344,0,-.093,.8959,.1308,-.1106,.2838,.9435,-.0143,0,.0811,.9966,.2868,0,-.054,.9565,-.0045,0,-.1469,.9891,.3295,0,.0939,.9395],y:-.0339,x:5e-4,z:.1068},{q:[-.0751,.0473,.0366,.9954,-.0035,-.0039,.0119,.9999,-.0136,.0054,-.0267,.9995,.0311,.0457,-.0723,.9958,-.1861,.2347,-.1865,.9357,-.0561,0,.2617,.9635,-.3128,0,-.0091,.9498,.1828,0,-.1223,.9755,-.3932,0,-.1173,.912,.1286,-.1712,.2483,.9447,-.0183,0,.0987,.9949,.3166,0,-.0669,.9462,-.0049,0,-.1472,.9891,.3541,0,.1036,.9294],y:-.0414,x:-.003,z:.1173},{q:[-.0783,.0464,.0322,.9953,-.0036,-.0034,.0125,.9999,-.0145,.0109,-.0338,.9993,.0032,.0518,-.0778,.9956,-.2339,.2553,-.1858,.9196,-.0496,0,.2805,.9586,-.3373,0,.0166,.9413,.1718,0,-.1212,.9776,-.3528,0,-.1266,.9271,.1253,-.1743,.2382,.9472,-.0141,0,.1142,.9934,.3269,0,-.0756,.942,.0102,0,-.1395,.9902,.3501,0,.1041,.9309],y:-.0456,x:-.0069,z:.1311},{q:[-.0812,.0428,.0292,.9954,-.0068,-.0027,.0133,.9999,-.028,.0167,-.0362,.9988,-.0089,.0557,-.0803,.9952,-.254,.2715,-.1861,.9095,-.0102,0,.293,.9561,-.4003,0,.0554,.9147,.1781,0,-.1282,.9756,-.3172,0,-.1241,.9402,.1137,-.1418,.2388,.9539,.0014,0,.1229,.9924,.3203,0,-.0787,.9441,.0325,0,-.1302,.991,.3331,0,.0989,.9377],y:-.0459,x:-.0105,z:.1472},{q:[-.0858,.0363,.0262,.9953,-.0109,-.0024,.016,.9998,-.045,.0218,-.0315,.9983,-.0088,.0574,-.0833,.9948,-.2679,.2816,-.1895,.9017,.0541,0,.2931,.9545,-.4815,0,.112,.8693,.2003,0,-.1441,.9691,-.308,0,-.1222,.9435,.0968,-.1166,.2264,.9622,.0233,0,.1274,.9916,.3067,0,-.0783,.9486,.051,0,-.1242,.9909,.3204,0,.0951,.9425],y:-.0436,x:-.0134,z:.1634},{q:[-.0923,.0274,.0245,.9951,-.0132,-.0019,.0183,.9997,-.0546,.0272,-.0253,.9978,-.0078,.0574,-.0829,.9949,-.2885,.2857,-.1973,.8923,.1243,0,.281,.9516,-.5484,0,.1785,.8169,.2296,0,-.1605,.96,-.3395,0,-.1304,.9315,.091,-.1265,.1993,.9675,.0476,0,.1287,.9905,.2913,0,-.0774,.9535,.062,0,-.125,.9902,.3189,0,.0963,.9429],y:-.0412,x:-.0157,z:.1777},{q:[-.0987,.0184,.0238,.9947,-.0133,-7e-4,.0192,.9997,-.0554,.0336,-.0208,.9977,-.0109,.0566,-.0798,.9951,-.3171,.2843,-.2054,.8812,.1841,0,.2622,.9473,-.585,0,.2393,.7749,.2581,0,-.1715,.9508,-.389,0,-.1453,.9097,.0996,-.1757,.166,.9652,.0615,0,.1308,.9895,.29,0,-.08,.9537,.0648,0,-.1312,.9892,.3285,0,.1021,.939],y:-.0408,x:-.0174,z:.1887},{q:[-.1029,.0127,.023,.9943,-.0124,7e-4,.0193,.9997,-.0517,.0394,-.0177,.9977,-.017,.0554,-.0785,.9952,-.3447,.2791,-.2072,.872,.2268,0,.2444,.9428,-.5972,0,.2792,.7519,.2827,0,-.1737,.9433,-.4275,0,-.161,.8896,.1105,-.2475,.1361,.9529,.0621,0,.1353,.9889,.3037,0,-.0851,.949,.064,0,-.138,.9884,.3407,0,.109,.9338],y:-.0426,x:-.0187,z:.1972},{q:[-.1061,.0101,.0223,.9941,-.0114,.0021,.0189,.9998,-.0471,.0441,-.0155,.9978,-.0211,.0544,-.0781,.9952,-.3637,.2737,-.2055,.8664,.2551,0,.2332,.9384,-.597,0,.2955,.7458,.3016,0,-.1702,.9381,-.4474,0,-.1734,.8774,.1191,-.3078,.1148,.9369,.0572,0,.1393,.9886,.3231,0,-.0889,.9422,.0608,0,-.1453,.9875,.3559,0,.1162,.9273],y:-.0461,x:-.0191,z:.2046},{q:[-.1067,.0074,.0213,.994,-.0107,.0037,.0185,.9998,-.0442,.0491,-.0134,.9977,-.0216,.0536,-.0764,.9954,-.3708,.2703,-.2048,.8646,.2747,0,.2283,.934,-.5917,0,.2937,.7508,.3137,0,-.1663,.9348,-.4543,0,-.1802,.8724,.1246,-.3359,.1051,.9277,.0504,0,.142,.9886,.3404,0,-.0901,.936,.0526,0,-.1513,.9871,.3722,0,.121,.9202],y:-.0501,x:-.0191,z:.2103},{q:[-.1045,.0036,.0198,.9943,-.0106,.005,.0187,.9998,-.0433,.0536,-.0111,.9976,-.0201,.0532,-.0726,.9957,-.3627,.2695,-.2072,.8677,.2895,0,.2249,.9304,-.5801,0,.2813,.7644,.3171,0,-.1673,.9335,-.4477,0,-.1769,.8765,.122,-.3216,.1104,.9325,.0471,0,.1425,.9887,.3492,0,-.089,.9328,.037,0,-.1573,.9869,.3944,0,.125,.9104],y:-.0536,x:-.0182,z:.2156},{q:[-.1017,2e-4,.0189,.9946,-.0105,.0056,.0189,.9998,-.043,.0553,-.0091,.9975,-.0176,.0535,-.0684,.9961,-.3422,.272,-.2121,.874,.3019,0,.2168,.9284,-.559,0,.2676,.7848,.3135,0,-.1744,.9334,-.4285,0,-.1638,.8885,.1104,-.2798,.1269,.9452,.048,0,.1415,.9888,.3504,0,-.088,.9325,.0212,0,-.1635,.9863,.4127,0,.1283,.9018],y:-.0555,x:-.0165,z:.2208},{q:[-.1014,-2e-4,.0198,.9946,-.0103,.0049,.019,.9998,-.0424,.0531,-.0079,.9977,-.0126,.0541,-.0653,.9963,-.3139,.2768,-.2176,.8817,.3116,0,.2037,.9281,-.5276,0,.2538,.8107,.3072,0,-.1831,.9339,-.3999,0,-.1472,.9047,.096,-.2332,.1472,.9564,.0546,0,.1388,.9888,.3449,0,-.0876,.9345,.0105,0,-.1708,.9853,.4233,0,.1332,.8961],y:-.0554,x:-.0139,z:.2267},{q:[-.1045,.0032,.023,.9943,-.0098,.004,.0188,.9998,-.041,.0498,-.008,.9979,-.0041,.0546,-.0649,.9964,-.2836,.2816,-.2219,.8894,.3182,0,.1911,.9285,-.4897,0,.2377,.8389,.3048,0,-.1872,.9338,-.3687,0,-.1359,.9196,.0884,-.2078,.1644,.9602,.0667,0,.1341,.9887,.3344,0,-.0876,.9383,.0067,0,-.1802,.9836,.4269,0,.1409,.8933],y:-.054,x:-.0109,z:.2334},{q:[-.1076,.0092,.0266,.9938,-.0096,.0035,.0182,.9998,-.0404,.0487,-.0108,.9979,.0054,.0547,-.0647,.9964,-.2561,.2857,-.2254,.8955,.322,0,.184,.9287,-.4517,0,.2195,.8648,.3107,0,-.1836,.9326,-.3476,0,-.133,.9282,.0903,-.2189,.1756,.9556,.0763,0,.1296,.9886,.3265,0,-.0877,.9411,.0034,0,-.189,.982,.4278,0,.1496,.8914],y:-.0528,x:-.0076,z:.2402},{q:[-.1069,.0155,.0284,.9937,-.0097,.0036,.0183,.9998,-.0413,.0499,-.0133,.9978,.0116,.0553,-.0653,.9963,-.2358,.2909,-.2312,.8979,.3226,0,.1819,.9289,-.4164,0,.2023,.8864,.3241,0,-.1767,.9294,-.3375,0,-.1349,.9316,.0939,-.2616,.1826,.9431,.077,0,.1274,.9889,.3264,0,-.0878,.9411,-.0068,0,-.194,.981,.4308,0,.1563,.8888],y:-.053,x:-.0043,z:.2456},{q:[-.1027,.0215,.0281,.9941,-.0096,.0039,.0193,.9998,-.0417,.0517,-.0137,.9977,.0116,.0569,-.0681,.996,-.2272,.2985,-.2409,.8951,.3171,0,.182,.9307,-.3798,0,.1864,.9061,.3402,0,-.1724,.9244,-.3276,0,-.1329,.9354,.0904,-.3144,.1887,.926,.069,0,.1279,.9894,.3346,0,-.0873,.9383,-.0229,0,-.1947,.9806,.4346,0,.1608,.8862],y:-.0549,x:-.0015,z:.2496},{q:[-.0978,.0273,.0274,.9945,-.009,.0042,.0201,.9997,-.0393,.0529,-.0134,.9977,.0049,.0597,-.0718,.9956,-.2315,.3087,-.2507,.8879,.3007,0,.1836,.9359,-.3325,0,.1665,.9283,.3509,0,-.1732,.9203,-.3089,0,-.1244,.9429,.0816,-.3509,.196,.912,.0573,0,.1292,.99,.348,0,-.0861,.9335,-.0383,0,-.1936,.9803,.4343,0,.1649,.8855],y:-.0584,x:8e-4,z:.2528},{q:[-.0918,.031,.0283,.9949,-.0079,.005,.0192,.9998,-.0353,.0547,-.0146,.9978,-.0049,.063,-.0755,.9951,-.2464,.3198,-.2542,.8788,.2756,0,.188,.9427,-.2764,0,.1391,.9509,.3498,0,-.1764,.9201,-.2778,0,-.1113,.9542,.0787,-.3568,.2024,.9086,.0446,0,.1292,.9906,.3625,0,-.085,.9281,-.0531,0,-.1932,.9797,.4319,0,.1691,.8859],y:-.0632,x:.0017,z:.2555},{q:[-.0825,.0308,.0299,.9957,-.0073,.007,.0158,.9998,-.0328,.0585,-.0179,.9976,-.0138,.0656,-.0776,.9947,-.2663,.3281,-.2489,.8715,.2521,0,.1938,.9481,-.2358,0,.1125,.9653,.3356,0,-.1792,.9248,-.2358,0,-.0946,.9672,.0917,-.3262,.2081,.9176,.0319,0,.1289,.9912,.3735,0,-.0858,.9237,-.0733,0,-.1925,.9786,.4362,0,.1724,.8832],y:-.0692,x:8e-4,z:.2574},{q:[-.0712,.0295,.0302,.9966,-.0071,.0093,.0113,.9999,-.0319,.0626,-.0204,.9973,-.02,.0667,-.0769,.9946,-.2781,.3304,-.2419,.8689,.2398,0,.1957,.9509,-.2438,0,.1009,.9646,.3154,0,-.1805,.9316,-.1936,0,-.0777,.978,.1178,-.2735,.2188,.9292,.0224,0,.1292,.9914,.3761,0,-.0873,.9224,-.0954,0,-.1875,.9776,.4396,0,.1704,.8819],y:-.0743,x:-.0012,z:.259},{q:[-.061,.0334,.0304,.9971,-.007,.011,.0076,.9999,-.0311,.0643,-.0196,.9973,-.0208,.0663,-.0774,.9946,-.2739,.3274,-.2389,.8722,.2358,0,.1912,.9528,-.3004,0,.1002,.9485,.2998,0,-.181,.9367,-.1664,0,-.0672,.9838,.142,-.2342,.2332,.9331,.0154,0,.1285,.9916,.3741,0,-.0845,.9235,-.1148,0,-.1819,.9766,.4427,0,.1668,.881],y:-.0781,x:-.0034,z:.2611},{q:[-.0562,.047,.0312,.9968,-.006,.0103,.0079,.9999,-.0273,.0602,-.0166,.9977,-.0158,.0656,-.0784,.9946,-.2558,.3247,-.2392,.8786,.2301,0,.1819,.956,-.3737,0,.098,.9223,.2944,0,-.1792,.9387,-.1653,0,-.0677,.9839,.1527,-.242,.238,.9281,.0113,0,.128,.9917,.3722,0,-.0777,.9249,-.1223,0,-.1781,.9764,.4441,0,.1655,.8806],y:-.0802,x:-.005,z:.2653},{q:[-.0623,.0639,.0339,.9954,-.0037,.008,.0108,.9999,-.0183,.0536,-.0157,.9983,-.0056,.0653,-.076,.995,-.2348,.3268,-.2407,.8833,.2168,0,.1723,.9609,-.4254,0,.0906,.9005,.296,0,-.1716,.9397,-.1891,0,-.0763,.979,.1504,-.2992,.2256,.9149,.0152,0,.1292,.9915,.3738,0,-.0745,.9245,-.1121,0,-.1774,.9777,.4448,0,.1671,.8799],y:-.0818,x:-.006,z:.2723},{q:[-.0697,.0758,.0369,.994,-.0016,.0061,.0131,.9999,-.0099,.0503,-.0167,.9985,.0047,.0651,-.0723,.9952,-.218,.3312,-.2418,.8856,.1977,0,.1661,.9661,-.4467,0,.0811,.891,.298,0,-.162,.9407,-.2191,0,-.0834,.9721,.1422,-.3703,.2077,.8942,.0157,0,.1327,.991,.3829,0,-.0764,.9206,-.0993,0,-.1786,.9789,.4473,0,.1693,.8782],y:-.083,x:-.0067,z:.2796},{q:[-.0719,.0791,.0381,.9935,0,.0054,.015,.9999,-.0035,.0511,-.0169,.9985,.0083,.0657,-.0706,.9953,-.2105,.3369,-.2456,.8842,.1776,0,.1634,.9704,-.4474,0,.073,.8914,.2953,0,-.1556,.9426,-.251,0,-.0859,.9642,.1333,-.4106,.1974,.8802,.0084,0,.136,.9907,.3959,0,-.0786,.9149,-.0953,0,-.1811,.9788,.4514,0,.1715,.8757],y:-.0843,x:-.0073,z:.2853},{q:[-.0707,.0751,.0379,.9939,.0014,.0056,.0179,.9998,.0021,.0537,-.0143,.9985,.0064,.0676,-.0723,.9951,-.213,.3453,-.2527,.8784,.1604,0,.1626,.9736,-.4376,0,.0668,.8967,.2864,0,-.1565,.9452,-.2868,0,-.0835,.9543,.1255,-.3916,.1997,.8894,-.0027,0,.1363,.9907,.4095,0,-.0773,.909,-.0985,0,-.185,.9778,.4555,0,.1731,.8732],y:-.0846,x:-.0072,z:.2893},{q:[-.0696,.0689,.0385,.9944,.0024,.0059,.0214,.9998,.006,.0566,-.0109,.9983,.0042,.0702,-.074,.9948,-.2193,.3566,-.2568,.8711,.1472,0,.164,.9754,-.4223,0,.0599,.9045,.2735,0,-.1633,.9479,-.316,0,-.0744,.9458,.1179,-.3254,.2113,.9141,-.0131,0,.1316,.9912,.4201,0,-.0707,.9047,-.1015,0,-.1897,.9766,.4574,0,.173,.8723],y:-.0835,x:-.0064,z:.2927},{q:[-.0706,.0645,.0398,.9946,.0035,.0061,.0239,.9997,.0102,.0585,-.0081,.9982,.0022,.0732,-.0742,.9945,-.2251,.3696,-.2541,.865,.1372,0,.1686,.9761,-.404,0,.0506,.9134,.2601,0,-.171,.9503,-.3381,0,-.0634,.939,.1106,-.25,.2238,.9355,-.0199,0,.1243,.992,.4266,0,-.0611,.9024,-.0992,0,-.1936,.9761,.4561,0,.1718,.8732],y:-.0817,x:-.0055,z:.2966},{q:[-.074,.0641,.0415,.9943,.0048,.006,.0252,.9997,.0152,.0585,-.0059,.9982,.0021,.0761,-.0728,.9944,-.2304,.382,-.2463,.8604,.1303,0,.1766,.9756,-.388,0,.0399,.9208,.2482,0,-.1766,.9525,-.3572,0,-.056,.9324,.1047,-.2023,.2258,.9472,-.0223,0,.1175,.9928,.4276,0,-.0523,.9025,-.0901,0,-.1962,.9764,.4507,0,.1709,.8761],y:-.0788,x:-.0048,z:.3013},{q:[-.0774,.0667,.0418,.9939,.0058,.006,.0256,.9996,.0194,.0576,-.0031,.9981,.0036,.0783,-.072,.9943,-.2373,.3918,-.2369,.8568,.1259,0,.1856,.9745,-.3797,0,.0313,.9246,.2397,0,-.1793,.9541,-.3763,0,-.0547,.9249,.1004,-.1953,.2141,.9518,-.024,0,.1147,.9931,.4254,0,-.0469,.9038,-.0786,0,-.1949,.9777,.4429,0,.1691,.8805],y:-.0752,x:-.0048,z:.3063},{q:[-.0796,.0707,.0415,.9935,.0067,.0063,.0254,.9996,.0235,.0566,-2e-4,.9981,.0046,.0799,-.0727,.9941,-.246,.3986,-.2276,.8537,.1235,0,.1938,.9732,-.3826,0,.0261,.9236,.2334,0,-.1808,.9554,-.3933,0,-.0583,.9175,.0955,-.213,.1941,.9528,-.0275,0,.1141,.9931,.4234,0,-.0442,.9049,-.0683,0,-.1912,.9792,.4361,0,.1664,.8844],y:-.0724,x:-.0053,z:.3109},{q:[-.0816,.075,.042,.993,.0079,.0067,.0247,.9996,.029,.0571,4e-4,.9979,.0051,.0811,-.0741,.9939,-.2561,.4035,-.2188,.8507,.121,0,.2011,.9721,-.3945,0,.0239,.9186,.2265,0,-.1808,.9571,-.4055,0,-.0639,.9119,.0901,-.2323,.1737,.9528,-.0341,0,.113,.993,.4251,0,-.0425,.9041,-.0599,0,-.188,.9803,.4322,0,.1635,.8868],y:-.0708,x:-.0057,z:.3146},{q:[-.0859,.0784,.0428,.9923,.0102,.0076,.0243,.9996,.0391,.0611,-6e-4,.9974,.0063,.082,-.0743,.9938,-.2623,.4071,-.2114,.849,.1161,0,.2075,.9713,-.4103,0,.023,.9117,.2174,0,-.1797,.9594,-.4116,0,-.0702,.9087,.0875,-.238,.1603,.954,-.0421,0,.1122,.9928,.4312,0,-.0418,.9013,-.051,0,-.1855,.9813,.4305,0,.1609,.8881],y:-.0704,x:-.0059,z:.3174},{q:[-.0924,.0822,.0427,.9914,.0132,.0087,.025,.9996,.0521,.0675,-9e-4,.9964,.0107,.082,-.0733,.9939,-.2588,.4082,-.2056,.851,.1098,0,.2123,.971,-.427,0,.0223,.904,.2069,0,-.179,.9619,-.4131,0,-.0759,.9075,.0884,-.2252,.1584,.9573,-.0506,0,.113,.9923,.4395,0,-.0421,.8972,-.04,0,-.1824,.9824,.4287,0,.1592,.8893],y:-.0705,x:-.0057,z:.3194},{q:[-.0998,.0871,.0427,.9903,.0164,.0099,.026,.9995,.0656,.0743,-.0014,.9951,.0181,.0811,-.0712,.994,-.2437,.4055,-.2,.858,.1058,0,.2159,.9707,-.4465,0,.0214,.8945,.1965,0,-.1789,.964,-.4134,0,-.0791,.9071,.0872,-.1962,.1667,.9623,-.0578,0,.1144,.9918,.4464,0,-.0429,.8938,-.0262,0,-.1795,.9834,.4245,0,.1582,.8915],y:-.0705,x:-.0055,z:.3211},{q:[-.1063,.0917,.0437,.9891,.0192,.0109,.0268,.9994,.0777,.0798,-.0022,.9938,.0264,.0794,-.0691,.9941,-.2174,.3995,-.1952,.8689,.1079,0,.2186,.9698,-.4697,0,.0201,.8826,.1878,0,-.1797,.9656,-.4142,0,-.0798,.9067,.0783,-.1603,.1759,.9681,-.0638,0,.1151,.9913,.4501,0,-.0431,.892,-.0123,0,-.1778,.984,.4189,0,.1576,.8942],y:-.0709,x:-.0053,z:.3224},{q:[-.1101,.0948,.0439,.9884,.0211,.0117,.0274,.9993,.0858,.0837,-.0023,.9928,.0344,.0777,-.0673,.9941,-.1832,.3929,-.1923,.8804,.1163,0,.2211,.9683,-.4926,0,.0181,.87,.1812,0,-.1805,.9667,-.4154,0,-.0795,.9061,.0709,-.1282,.1762,.9734,-.0695,0,.1162,.9908,.45,0,-.0421,.892,-.0017,0,-.1759,.9844,.4132,0,.1565,.8971],y:-.0709,x:-.0054,z:.3242},{q:[-.1133,.0952,.043,.9881,.022,.0125,.0271,.9993,.0898,.0863,-8e-4,.9922,.0423,.0766,-.066,.994,-.1457,.3884,-.1908,.8897,.1291,0,.2221,.9664,-.5073,0,.0182,.8616,.1764,0,-.1805,.9676,-.4185,0,-.0791,.9048,.0755,-.1041,.1649,.9779,-.0708,0,.1181,.9905,.4447,0,-.0405,.8948,.0074,0,-.174,.9847,.4076,0,.1556,.8998],y:-.0704,x:-.0055,z:.3276},{q:[-.1175,.0917,.0421,.9879,.0222,.0138,.0247,.9994,.0908,.0882,.0011,.992,.05,.0761,-.0653,.9937,-.1116,.3865,-.1892,.8958,.1446,0,.2207,.9646,-.5082,0,.0239,.8609,.1735,0,-.18,.9683,-.4199,0,-.0792,.9041,.091,-.0889,.1467,.981,-.0646,0,.12,.9907,.4335,0,-.0402,.9002,.0173,0,-.1727,.9848,.4024,0,.1545,.9023],y:-.0695,x:-.0058,z:.3332},{q:[-.122,.0864,.0411,.9879,.0219,.0149,.0209,.9994,.0894,.0884,.0018,.9921,.0548,.0763,-.0648,.9935,-.0877,.3871,-.187,.8986,.1609,0,.2169,.9628,-.4946,0,.0361,.8684,.1721,0,-.1786,.9687,-.418,0,-.0809,.9049,.1064,-.0837,.1291,.9823,-.0549,0,.1213,.9911,.4201,0,-.0409,.9065,.027,0,-.1711,.9849,.3985,0,.1521,.9045],y:-.0687,x:-.0063,z:.3407},{q:[-.1268,.0821,.0392,.9878,.0212,.0151,.0186,.9995,.0867,.0865,.0016,.9925,.0562,.0768,-.0648,.9934,-.0785,.3886,-.1849,.8992,.1747,0,.2125,.9614,-.4696,0,.0513,.8814,.1728,0,-.1758,.9691,-.4164,0,-.0855,.9052,.1171,-.0906,.118,.9819,-.0473,0,.1235,.9912,.4131,0,-.0414,.9097,.0363,0,-.1695,.9849,.3977,0,.1506,.9051],y:-.0693,x:-.0057,z:.3493},{q:[-.1326,.0799,.0365,.9873,.0208,.0143,.0186,.9995,.0853,.0844,8e-4,.9928,.0551,.0769,-.0657,.9933,-.0851,.3884,-.1832,.8991,.1826,0,.2084,.9608,-.4388,0,.0655,.8962,.1754,0,-.1712,.9695,-.4157,0,-.0925,.9048,.1251,-.1105,.1143,.9793,-.041,0,.128,.9909,.417,0,-.0427,.9079,.0461,0,-.1691,.9845,.4004,0,.1518,.9037],y:-.072,x:-.0035,z:.3588},{q:[-.1395,.0796,.032,.9865,.0212,.0133,.0199,.9995,.0871,.0841,8e-4,.9926,.0513,.0767,-.067,.9935,-.1022,.3863,-.1805,.8987,.1844,0,.2056,.9611,-.4109,0,.0772,.9084,.1786,0,-.1662,.9698,-.4164,0,-.0999,.9037,.1291,-.1379,.1196,.9747,-.036,0,.1363,.99,.4303,0,-.0454,.9016,.057,0,-.1682,.9841,.4048,0,.1547,.9012],y:-.0765,x:3e-4,z:.3689},{q:[-.1465,.0802,.0273,.9856,.0221,.0126,.0209,.9995,.0908,.0854,.0013,.9922,.0458,.0768,-.0678,.9937,-.1211,.3855,-.1749,.8979,.1832,0,.203,.9619,-.3934,0,.0866,.9153,.1819,0,-.1623,.9698,-.4171,0,-.1051,.9028,.1277,-.1601,.1296,.9702,-.0319,0,.146,.9888,.4453,0,-.0495,.894,.0674,0,-.1683,.9834,.4107,0,.1587,.8978],y:-.0818,x:.0049,z:.379},{q:[-.1515,.0812,.0252,.9848,.0228,.0127,.0203,.9995,.093,.0871,4e-4,.9918,.0415,.0776,-.068,.9938,-.1344,.3874,-.1673,.8966,.1831,0,.1995,.9626,-.3877,0,.0953,.9168,.1857,0,-.1606,.9694,-.4174,0,-.1062,.9025,.1201,-.1659,.1407,.9686,-.0274,0,.1526,.9879,.4568,0,-.0538,.8879,.0742,0,-.1718,.9823,.4185,0,.1632,.8934],y:-.0871,x:.0098,z:.3886},{q:[-.1539,.0823,.0256,.9843,.0228,.0133,.0184,.9995,.093,.0885,-.0019,.9917,.0389,.0787,-.0678,.9938,-.1389,.3909,-.1615,.8955,.186,0,.194,.9632,-.3896,0,.1044,.9151,.1903,0,-.1601,.9686,-.4176,0,-.105,.9025,.1069,-.1559,.1534,.9699,-.025,0,.1544,.9877,.4672,0,-.0558,.8824,.0762,0,-.1783,.981,.4284,0,.1674,.888],y:-.092,x:.0148,z:.3977},{q:[-.1561,.0844,.026,.9838,.0228,.0135,.017,.9995,.093,.0885,-.0036,.9917,.0372,.0798,-.0683,.9938,-.1358,.3941,-.1597,.8948,.1902,0,.1879,.9636,-.3938,0,.1127,.9122,.1953,0,-.1594,.9677,-.4173,0,-.105,.9027,.0907,-.1401,.1677,.9716,-.0256,0,.1539,.9878,.4814,0,-.0535,.8749,.077,0,-.1851,.9797,.4401,0,.1713,.8814],y:-.0975,x:.02,z:.4066},{q:[-.1591,.0873,.0255,.9831,.0229,.0129,.0166,.9995,.0932,.0876,-.0042,.9918,.0361,.0807,-.0696,.9937,-.1299,.3974,-.1615,.8939,.1928,0,.1827,.9641,-.3963,0,.1186,.9104,.2001,0,-.1569,.9671,-.4154,0,-.1072,.9033,.0758,-.1292,.1793,.9723,-.0276,0,.1542,.9877,.4984,0,-.049,.8656,.0785,0,-.1911,.9784,.4527,0,.1752,.8743],y:-.1039,x:.0255,z:.4159},{q:[-.162,.0894,.0239,.9824,.0228,.0122,.0166,.9995,.0927,.0866,-.004,.9919,.0347,.0818,-.0714,.9935,-.1267,.4021,-.1662,.8914,.1924,0,.1796,.9647,-.3933,0,.1218,.9113,.2041,0,-.1529,.9669,-.4121,0,-.1108,.9044,.0672,-.1304,.1862,.9715,-.0292,0,.1568,.9872,.5146,0,-.0463,.8562,.0801,0,-.196,.9773,.4644,0,.1782,.8675],y:-.1102,x:.0307,z:.4258},{q:[-.1647,.0899,.0226,.982,.0225,.0116,.0162,.9995,.0913,.0858,-.0045,.9921,.0323,.0832,-.074,.9933,-.1302,.4084,-.1721,.8869,.1889,0,.1789,.9656,-.3824,0,.1225,.9158,.2081,0,-.1493,.9667,-.4097,0,-.1148,.905,.0672,-.1445,.1895,.9689,-.0289,0,.1601,.9867,.5279,0,-.0459,.8481,.0823,0,-.2013,.9761,.4744,0,.1808,.8615],y:-.1159,x:.0355,z:.4363},{q:[-.1679,.0888,.0222,.9816,.0222,.0111,.0155,.9996,.0902,.0854,-.0067,.9922,.0286,.0848,-.0771,.993,-.1405,.4157,-.1767,.881,.1828,0,.1806,.9664,-.3633,0,.1209,.9238,.2126,0,-.1463,.9661,-.41,0,-.1172,.9045,.0718,-.1645,.1881,.9656,-.0261,0,.1624,.9864,.5392,0,-.0454,.841,.0851,0,-.2085,.9743,.4837,0,.1835,.8558],y:-.1214,x:.0398,z:.4473},{q:[-.1705,.0866,.0214,.9813,.0218,.0107,.0149,.9996,.0883,.0855,-.0093,.9924,.0244,.0865,-.08,.9927,-.1543,.4237,-.1792,.8744,.1735,0,.1842,.9674,-.338,0,.118,.9337,.2174,0,-.1444,.9653,-.4119,0,-.1158,.9038,.0768,-.1808,.182,.9635,-.0234,0,.1652,.986,.5496,0,-.0448,.8342,.0863,0,-.2153,.9727,.4937,0,.1849,.8497],y:-.1268,x:.0435,z:.4582},{q:[-.1712,.084,.0202,.9814,.0213,.0105,.0147,.9996,.086,.0858,-.0109,.9925,.0205,.0882,-.0828,.9924,-.1678,.4317,-.1812,.8675,.1615,0,.1894,.9685,-.3118,0,.1147,.9432,.2213,0,-.1447,.9644,-.4148,0,-.1116,.903,.0793,-.1859,.1721,.9641,-.0229,0,.1681,.9855,.5595,0,-.0444,.8276,.0841,0,-.2207,.9717,.505,0,.1844,.8432],y:-.1323,x:.0464,z:.4685},{q:[-.1717,.0829,.0201,.9814,.0211,.0103,.0139,.9996,.085,.0852,-.0128,.9927,.017,.0898,-.0848,.9922,-.1773,.4395,-.1834,.8613,.15,0,.1969,.9689,-.2922,0,.1115,.9498,.2239,0,-.1464,.9635,-.4186,0,-.1054,.902,.0779,-.1771,.1595,.9681,-.0223,0,.1703,.9851,.5686,0,-.0434,.8215,.0822,0,-.2255,.9708,.5159,0,.1829,.8369],y:-.1378,x:.0485,z:.4788},{q:[-.1723,.0839,.0206,.9813,.0208,.0099,.0129,.9997,.0838,.0834,-.0154,.9929,.0137,.0914,-.0857,.992,-.1819,.4463,-.1858,.8563,.1427,0,.2082,.9676,-.2843,0,.1083,.9526,.2261,0,-.148,.9628,-.4226,0,-.0983,.9009,.0727,-.1589,.1458,.9737,-.0219,0,.1725,.9848,.5773,0,-.0413,.8155,.082,0,-.2288,.97,.526,0,.181,.831],y:-.1436,x:.0497,z:.4897},{q:[-.1719,.0872,.0209,.981,.0202,.009,.0119,.9997,.0813,.0807,-.0189,.9932,.0079,.0925,-.0862,.9919,-.1843,.4503,-.1881,.8532,.1405,0,.224,.9644,-.2883,0,.1033,.9519,.229,0,-.1482,.9621,-.4252,0,-.0929,.9003,.0652,-.1437,.134,.9783,-.023,0,.1758,.9842,.5866,0,-.0378,.809,.0814,0,-.2313,.9695,.5376,0,.1803,.8237],y:-.1502,x:.0505,z:.5018},{q:[-.1717,.0932,.0216,.9805,.0194,.0082,.0105,.9997,.0778,.0781,-.0237,.9936,-.0013,.0926,-.087,.9919,-.1899,.4486,-.1902,.8524,.1391,0,.244,.9598,-.2981,0,.0938,.9499,.2327,0,-.1456,.9616,-.4239,0,-.0906,.9012,.0573,-.1461,.1274,.9794,-.0248,0,.1798,.9834,.5972,0,-.0327,.8014,.081,0,-.2351,.9686,.5554,0,.1821,.8114],y:-.1583,x:.0509,z:.516},{q:[-.1756,.1012,.0228,.979,.0189,.0076,.0091,.9998,.076,.0768,-.0282,.9938,-.012,.0916,-.0887,.9918,-.2024,.4424,-.1932,.8521,.131,0,.2658,.9551,-.3044,0,.0783,.9493,.2356,0,-.1435,.9612,-.4167,0,-.0904,.9045,.0515,-.1723,.1267,.9755,-.0237,0,.1844,.9826,.6101,0,-.0254,.7919,.0852,0,-.2389,.9673,.5745,0,.1847,.7974],y:-.1685,x:.0512,z:.532},{q:[-.1849,.1092,.0239,.9764,.0192,.0072,.0082,.9998,.0769,.0777,-.0305,.9935,-.0211,.0908,-.0913,.9914,-.2167,.438,-.1955,.8503,.1104,0,.2848,.9522,-.3012,0,.0586,.9518,.2356,0,-.1468,.9607,-.4009,0,-.0892,.9118,.0484,-.2121,.1296,.9674,-.0182,0,.1893,.9817,.6259,0,-.0151,.7797,.0919,0,-.2434,.9656,.599,0,.1858,.7789],y:-.1814,x:.0518,z:.5488},{q:[-.1973,.1169,.0254,.973,.0197,.0073,.007,.9998,.0788,.0801,-.032,.9932,-.0276,.0913,-.0925,.9911,-.2232,.4394,-.1929,.8485,.0779,0,.296,.952,-.2892,0,.0391,.9565,.2318,0,-.1557,.9602,-.3791,0,-.0847,.9215,.0457,-.2431,.1323,.9598,-.0115,0,.1931,.9811,.645,0,-8e-4,.7642,.0964,0,-.25,.9634,.6299,0,.1843,.7545],y:-.1979,x:.0526,z:.5658},{q:[-.2109,.1245,.0274,.9692,.0202,.0073,.0058,.9998,.0806,.0807,-.0335,.9929,-.0301,.0924,-.091,.9911,-.2214,.4437,-.1859,.8482,.0406,0,.2969,.954,-.276,0,.0242,.9609,.2258,0,-.1702,.9592,-.3676,0,-.0818,.9264,.0423,-.2483,.1335,.9585,-.0053,0,.1956,.9807,.666,0,.0174,.7458,.0972,0,-.2576,.9614,.6644,0,.179,.7256],y:-.2176,x:.0533,z:.5826},{q:[-.2265,.1352,.0302,.9641,.0214,.0057,.0047,.9997,.0858,.0767,-.0353,.9927,-.0285,.0925,-.0885,.9914,-.2175,.4446,-.18,.8501,.0068,0,.2897,.9571,-.2749,0,.0138,.9614,.2211,0,-.189,.9567,-.3754,0,-.0872,.9227,.0432,-.2301,.1371,.9625,8e-4,0,.1969,.9804,.6871,0,.0427,.7253,.0985,0,-.2642,.9594,.6998,0,.1705,.6937],y:-.24,x:.0544,z:.5998},{q:[-.2405,.1489,.0318,.9586,.023,.0024,.0042,.9997,.0923,.0688,-.0372,.9927,-.026,.0917,-.0876,.9916,-.2145,.4419,-.1763,.853,-.0178,0,.2825,.9591,-.3035,0,.0025,.9528,.2227,0,-.2078,.9525,-.4099,0,-.1064,.9059,.0596,-.2019,.1518,.9657,6e-4,0,.1997,.9799,.7117,0,.077,.6983,.0947,0,-.2661,.9593,.7366,0,.1567,.6579],y:-.2657,x:.0551,z:.6174},{q:[-.2527,.1637,.033,.953,.0246,-.0018,.0042,.9997,.0995,.0593,-.0388,.9925,-.0227,.091,-.0896,.9915,-.2117,.4392,-.1736,.8556,-.0318,0,.2893,.9567,-.3761,0,-.024,.9263,.2365,0,-.2285,.9444,-.4762,0,-.1439,.8675,.0949,-.1758,.1829,.9626,-.0023,0,.2031,.9792,.7348,0,.1198,.6676,.0846,0,-.2656,.9604,.773,0,.1361,.6196],y:-.2949,x:.0554,z:.6362},{q:[-.2639,.1788,.0342,.9472,.0269,-.0068,.0048,.9996,.1088,.0507,-.0403,.9919,-.0198,.0905,-.0942,.9912,-.2081,.4365,-.1691,.8588,-.0339,0,.3224,.946,-.4813,0,-.087,.8723,.2667,0,-.2517,.9303,-.5619,0,-.2003,.8026,.1339,-.1581,.2217,.9529,-.0057,0,.2069,.9783,.7538,0,.1695,.6349,.0677,0,-.2652,.9618,.8068,0,.1078,.5809],y:-.3275,x:.056,z:.6564},{q:[-.2734,.1941,.0349,.9415,.0296,-.0129,.0063,.9995,.12,.0433,-.0411,.991,-.0161,.0897,-.0998,.9908,-.2019,.4315,-.1626,.864,-.0157,0,.3839,.9232,-.584,0,-.1927,.7885,.3121,0,-.275,.9094,-.6297,0,-.2792,.7249,.1491,-.1634,.2567,.9408,-.0087,0,.2122,.9772,.7668,0,.2243,.6014,.0437,0,-.2647,.9633,.8348,0,.0733,.5456],y:-.3628,x:.0572,z:.678},{q:[-.2798,.2079,.0367,.9366,.0321,-.0184,.0074,.9993,.1303,.0359,-.0416,.9899,-.007,.0881,-.105,.9905,-.195,.423,-.1598,.8704,.0369,0,.4621,.886,-.6628,0,-.2961,.6878,.3652,0,-.2937,.8834,-.6374,0,-.389,.6651,.1169,-.2209,.2817,.9264,-.0107,0,.2177,.976,.7733,0,.2808,.5684,.021,0,-.264,.9643,.8545,0,.039,.518],y:-.4,x:.0584,z:.7009},{q:[-.2777,.2152,.0404,.9354,.033,-.0211,.006,.9992,.1349,.0297,-.0442,.9894,.0075,.0854,-.1087,.9904,-.1884,.4116,-.1626,.8768,.1285,0,.5271,.84,-.7352,0,-.3308,.5916,.4139,0,-.3011,.8591,-.5763,0,-.5128,.6364,.0474,-.3232,.2863,.9007,-.0158,0,.2231,.9747,.7768,0,.3309,.5357,.0064,0,-.2632,.9647,.8692,0,.008,.4943],y:-.4402,x:.0575,z:.7243},{q:[-.2645,.2127,.0468,.9395,.0329,-.0202,.0025,.9993,.1343,.0281,-.05,.9893,.0215,.0825,-.1119,.9901,-.1802,.3995,-.1682,.883,.2354,0,.5443,.8052,-.8037,0,-.2856,.522,.4511,0,-.2962,.8419,-.4681,0,-.6107,.6387,-.0233,-.4305,.263,.8631,-.0243,0,.2268,.9736,.7831,0,.3644,.504,-.0037,0,-.2677,.9635,.8827,0,-.0257,.4692],y:-.4817,x:.0559,z:.7473},{q:[-.2395,.2024,.0527,.9481,.0319,-.0166,-9e-4,.9994,.1303,.0333,-.0558,.9893,.0325,.0795,-.1117,.99,-.1697,.3885,-.1804,.8875,.3061,0,.5103,.8037,-.8376,0,-.2243,.4981,.47,0,-.2781,.8377,-.358,0,-.6643,.6561,-.0627,-.516,.2176,.8261,-.0403,0,.232,.9719,.7962,0,.3778,.4726,-.0249,0,-.2814,.9593,.8952,0,-.0629,.4412],y:-.5229,x:.054,z:.7675},{q:[-.2082,.1867,.0568,.9584,.0325,-.0117,-.0047,.9994,.1319,.0398,-.0627,.9885,.0371,.0767,-.1016,.9912,-.1582,.3818,-.2015,.888,.2988,0,.4504,.8413,-.8247,0,-.1985,.5296,.4511,0,-.2532,.8558,-.3105,0,-.6579,.6861,-.0529,-.5589,.1554,.8129,-.0642,0,.2406,.9685,.8138,0,.3793,.4403,-.0636,0,-.3031,.9508,.9063,0,-.1099,.4081],y:-.5584,x:.0509,z:.781},{q:[-.1742,.1645,.0524,.9695,.0348,-.0069,-.0075,.9993,.1405,.0432,-.0667,.9869,.0282,.0752,-.0821,.9934,-.1459,.3793,-.2235,.8859,.2079,0,.3829,.9001,-.7719,0,-.1917,.6062,.3878,0,-.2362,.8909,-.3597,0,-.5841,.7276,-.0036,-.5522,.0691,.8309,-.0959,0,.2589,.9611,.8322,0,.3754,.408,-.1262,0,-.3163,.9402,.9139,0,-.1724,.3675],y:-.5907,x:.0451,z:.7863},{q:[-.1332,.1401,.0403,.9803,.0389,-.0047,-.0082,.9992,.1569,.0391,-.0653,.9847,.0041,.0752,-.0689,.9948,-.1425,.3746,-.2332,.886,.0556,0,.3214,.9453,-.6893,0,-.1851,.7004,.2894,0,-.2334,.9283,-.4489,0,-.4481,.7731,.0334,-.5075,-.0393,.8601,-.1401,0,.2877,.9474,.8489,0,.3686,.3789,-.212,0,-.3173,.9243,.9155,0,-.2358,.326],y:-.6163,x:.0372,z:.786},{q:[-.0859,.1203,.0352,.9884,.0448,-.0074,-.0083,.9989,.1778,.0219,-.0651,.9817,-.0144,.0747,-.067,.9949,-.1476,.367,-.2302,.8891,-.1065,0,.2736,.9559,-.5988,0,-.1878,.7786,.1657,0,-.2399,.9566,-.4939,0,-.2871,.8207,.0238,-.434,-.1213,.8924,-.1864,0,.3091,.9326,.8693,0,.3403,.3585,-.2925,0,-.3204,.901,.9118,0,-.2816,.2988],y:-.6323,x:.0315,z:.7859},{q:[-.0403,.106,.0367,.9929,.0488,-.0123,-.007,.9987,.1915,.0011,-.0626,.9795,-.0109,.0724,-.068,.995,-.139,.3564,-.2244,.8963,-.2312,0,.2323,.9448,-.5293,0,-.2057,.8231,.0462,0,-.2364,.9705,-.4968,0,-.1591,.8531,-.0135,-.3294,-.1438,.9331,-.2205,0,.3171,.9224,.8909,0,.2887,.3508,-.3524,0,-.3246,.8777,.9078,0,-.3049,.288],y:-.6376,x:.0287,z:.7896},{q:[-4e-4,.1022,.0388,.994,.0509,-.0153,-.0027,.9986,.1991,-.0105,-.0518,.9785,.008,.067,-.068,.9954,-.0949,.3323,-.2232,.9115,-.2992,0,.1954,.934,-.4948,0,-.2357,.8365,-.0281,0,-.2292,.973,-.5047,0,-.0887,.8587,-.0595,-.2117,-.1108,.9692,-.2466,0,.3149,.9165,.9038,0,.2401,.3542,-.3812,0,-.3375,.8607,.9156,0,-.2776,.2909],y:-.6355,x:.0289,z:.7979},{q:[.0376,.1056,.0336,.9931,.0511,-.0167,.0049,.9985,.1997,-.0153,-.03,.9793,.0327,.0598,-.066,.9955,-.0249,.2999,-.2198,.928,-.3114,0,.1703,.9349,-.4938,0,-.2629,.8289,-.0521,0,-.2287,.9721,-.5231,0,-.0617,.8501,-.1026,-.1181,-.0565,.9861,-.2696,0,.3154,.9099,.908,0,.204,.366,-.3864,0,-.3501,.8533,.93,0,-.208,.3032],y:-.629,x:.0322,z:.8113},{q:[.068,.1078,.0268,.9915,.05,-.017,.0119,.9985,.1958,-.0155,-.0096,.9805,.0602,.0522,-.0592,.9951,.0443,.2697,-.2068,.9394,-.281,0,.1596,.9463,-.5166,0,-.2719,.8119,-.0481,0,-.22,.9743,-.5524,0,-.0577,.8316,-.1327,-.0663,-.0107,.9889,-.2762,0,.3169,.9074,.9061,0,.1708,.3869,-.3753,0,-.3569,.8554,.9355,0,-.1402,.3244],y:-.6205,x:.0379,z:.8306},{q:[.0915,.1063,.0226,.9899,.0485,-.017,.0167,.9985,.1898,-.014,.0041,.9817,.0833,.0462,-.0504,.9942,.0934,.2494,-.1862,.9457,-.2251,0,.1569,.9616,-.5482,0,-.259,.7953,-.0321,0,-.2068,.9778,-.5754,0,-.0623,.8155,-.1419,-.0487,.0182,.9885,-.2679,0,.3166,.9099,.8993,0,.1375,.4151,-.3563,0,-.3616,.8616,.9316,0,-.0898,.3522],y:-.6114,x:.045,z:.8544},{q:[.11,.1024,.0199,.9884,.0468,-.0166,.0201,.9986,.183,-.0113,.0136,.983,.0984,.0426,-.043,.9933,.1167,.238,-.1653,.9499,-.1611,0,.1565,.9745,-.5737,0,-.2314,.7857,-.0101,0,-.1972,.9803,-.5916,0,-.0717,.803,-.133,-.0516,.0308,.9893,-.251,0,.3168,.9147,.8883,0,.1052,.4471,-.333,0,-.3657,.8691,.9236,0,-.0474,.3805],y:-.6036,x:.0527,z:.8802},{q:[.1236,.098,.0185,.9873,.0453,-.0164,.0229,.9986,.1767,-.0085,.0205,.984,.1058,.0408,-.0376,.9928,.1191,.2329,-.1494,.9535,-.1032,0,.1571,.9822,-.5851,0,-.1991,.7862,.0146,0,-.1944,.9808,-.6017,0,-.0857,.7941,-.1145,-.0644,.033,.9908,-.2277,0,.3174,.9206,.8734,0,.073,.4814,-.3064,0,-.3704,.8769,.9133,0,-.0085,.4072],y:-.5978,x:.0606,z:.9065},{q:[.1371,.0941,.0175,.9859,.0432,-.0165,.0256,.9986,.1687,-.0067,.0264,.9853,.1061,.0406,-.0352,.9929,.111,.2315,-.1393,.9564,-.0592,0,.1604,.9853,-.5827,0,-.1699,.7947,.037,0,-.1986,.9794,-.6072,0,-.1008,.7881,-.0931,-.078,.0337,.992,-.2034,0,.3175,.9262,.8553,0,.0401,.5166,-.2806,0,-.3764,.883,.9011,0,.0315,.4324],y:-.5941,x:.0693,z:.9328},{q:[.1522,.0904,.0171,.984,.0406,-.0168,.0281,.9986,.1581,-.0056,.0315,.9869,.1025,.0414,-.0351,.9933,.0998,.2326,-.134,.9581,-.0304,0,.1678,.9853,-.5736,0,-.1502,.8052,.0532,0,-.2099,.9763,-.6104,0,-.1136,.7839,-.0732,-.0899,.0371,.9926,-.1799,0,.3156,.9317,.8352,0,.0067,.5499,-.257,0,-.3842,.8868,.8868,0,.0709,.4566],y:-.5923,x:.0788,z:.959},{q:[.1717,.0899,.0147,.9809,.0369,-.0177,.0314,.9987,.1435,-.0068,.0386,.9889,.0978,.0426,-.0365,.9936,.0874,.2352,-.1331,.9588,-.014,0,.1794,.9837,-.5674,0,-.1427,.811,.0605,0,-.2285,.9717,-.6118,0,-.122,.7816,-.0578,-.1016,.0421,.9922,-.1636,0,.3136,.9354,.8168,0,-.0207,.5766,-.2363,0,-.3924,.8889,.8698,0,.1151,.4799],y:-.5925,x:.0895,z:.984},{q:[.1952,.0923,.0102,.9763,.0326,-.019,.0354,.9987,.1261,-.0095,.0473,.9908,.0932,.0434,-.0377,.994,.0736,.2376,-.1353,.9591,-.0065,0,.1932,.9811,-.5699,0,-.1447,.8089,.0573,0,-.2534,.9657,-.6124,0,-.1255,.7806,-.05,-.1105,.044,.9916,-.1547,0,.3123,.9373,.8019,0,-.0436,.5959,-.218,0,-.4001,.8902,.8498,0,.1638,.5011],y:-.5955,x:.1011,z:1.0074},{q:[.2199,.0942,.0055,.9709,.0284,-.0203,.0396,.9986,.1093,-.0109,.0551,.9924,.0886,.0436,-.0381,.9944,.0593,.239,-.139,.9592,-.0082,0,.2072,.9783,-.5796,0,-.149,.8012,.042,0,-.2823,.9584,-.6119,0,-.1244,.7811,-.0497,-.1091,.0362,.9921,-.147,0,.311,.939,.7889,0,-.0676,.6107,-.2026,0,-.4072,.8906,.8284,0,.2093,.5195],y:-.6013,x:.1133,z:1.0293},{q:[.2454,.0946,.0011,.9648,.0247,-.0216,.044,.9985,.0942,-.0108,.0614,.9936,.0838,.0436,-.0377,.9948,.0456,.2397,-.1436,.9591,-.0229,0,.2205,.9751,-.5914,0,-.1464,.793,.013,0,-.3134,.9495,-.6111,0,-.1195,.7825,-.0526,-.0899,.0151,.9944,-.1392,0,.3085,.941,.7763,0,-.0912,.6237,-.1915,0,-.4142,.8898,.8075,0,.2488,.5349],y:-.6094,x:.1258,z:1.0499},{q:[.2734,.0943,-.0034,.9573,.0213,-.0229,.049,.9983,.0802,-.0105,.067,.9945,.078,.0436,-.0373,.9953,.0326,.2399,-.1486,.9588,-.0566,0,.2328,.9709,-.6012,0,-.131,.7883,-.0328,0,-.3459,.9377,-.6071,0,-.1092,.7871,-.0529,-.0509,-.0184,.9971,-.1337,0,.3051,.9429,.7638,0,-.1115,.6358,-.1858,0,-.421,.8878,.7872,0,.2837,.5475],y:-.6191,x:.1382,z:1.0688},{q:[.3053,.0944,-.0093,.9475,.0182,-.0243,.0548,.998,.0673,-.0114,.0736,.995,.0703,.0438,-.0375,.9959,.0177,.2399,-.1532,.9585,-.1132,0,.245,.9629,-.6075,0,-.1016,.7878,-.1002,0,-.3771,.9207,-.5919,0,-.0913,.8008,-.047,-3e-4,-.0552,.9974,-.1332,0,.3026,.9438,.7515,0,-.1283,.6471,-.1848,0,-.4256,.8859,.7666,0,.3174,.5582],y:-.6296,x:.1497,z:1.0865},{q:[.3378,.0951,-.0169,.9362,.0163,-.0258,.0609,.9977,.0587,-.0138,.0811,.9949,.0613,.0441,-.0375,.9964,-.0037,.239,-.1559,.9584,-.1933,0,.2558,.9472,-.6073,0,-.0608,.7921,-.1891,0,-.4008,.8964,-.5634,0,-.0671,.8234,-.0411,.0499,-.0847,.9943,-.134,0,.302,.9439,.7395,0,-.1415,.6581,-.1844,0,-.4262,.8857,.7453,0,.349,.5681],y:-.6404,x:.1599,z:1.1038},{q:[.3718,.0983,-.0274,.9227,.0151,-.0272,.0672,.9973,.0536,-.0174,.0895,.9944,.0522,.0434,-.0354,.9971,-.0364,.2358,-.156,.9585,-.2936,0,.2613,.9195,-.5899,0,-.0178,.8073,-.2949,0,-.4092,.8635,-.5185,0,-.0402,.8541,-.0497,.0957,-.1059,.9885,-.1388,0,.3055,.942,.729,0,-.15,.6678,-.1846,0,-.4202,.8885,.7217,0,.3803,.5784],y:-.6508,x:.1688,z:1.1211},{q:[.4067,.1046,-.0388,.9067,.0148,-.0283,.0731,.9968,.0519,-.0213,.0968,.9937,.0435,.0418,-.0302,.9977,-.0821,.2297,-.1518,.9578,-.4067,0,.2576,.8765,-.5346,0,.01,.8451,-.4089,0,-.3985,.8209,-.4418,0,-.0168,.897,-.08,.1425,-.1253,.9786,-.1473,0,.3126,.9384,.7203,0,-.1549,.6762,-.1834,0,-.4097,.8936,.6964,0,.4096,.5893],y:-.6617,x:.1767,z:1.1394},{q:[.4425,.1123,-.0481,.8884,.0148,-.0283,.0776,.9965,.0522,-.0232,.1029,.9931,.0345,.0399,-.0262,.9983,-.1366,.2189,-.1416,.9557,-.5185,0,.2445,.8194,-.4338,0,.0144,.9009,-.5195,0,-.3792,.7657,-.3462,0,-.0042,.9382,-.126,.1934,-.1445,.9622,-.1576,0,.3185,.9347,.7125,0,-.1574,.6838,-.1794,0,-.3983,.8996,.6707,0,.4349,.6009],y:-.6739,x:.184,z:1.1597},{q:[.4803,.1212,-.0554,.8669,.0148,-.0263,.0817,.9962,.0528,-.019,.1113,.9922,.0224,.0372,-.027,.9987,-.1904,.2001,-.1305,.9522,-.6177,0,.2235,.754,-.2995,0,.0037,.9541,-.6037,0,-.3816,.7,-.2786,0,-.0071,.9604,-.1806,.2338,-.1615,.9416,-.1693,0,.3224,.9313,.7039,0,-.1571,.6927,-.1716,0,-.3843,.9071,.6437,0,.455,.6153],y:-.6885,x:.1907,z:1.1843},{q:[.5186,.1294,-.0596,.843,.0149,-.0219,.0847,.9961,.0548,-.0066,.1217,.991,.0075,.0335,-.0313,.9989,-.2385,.1764,-.1281,.9464,-.6929,0,.2045,.6914,-.1844,0,-.0013,.9828,-.6166,0,-.4262,.662,-.2988,0,-.0355,.9537,-.1903,.23,-.1666,.9398,-.178,0,.3232,.9294,.6925,0,-.1554,.7044,-.1584,0,-.3683,.9161,.6158,0,.4681,.6338],y:-.7071,x:.1968,z:1.2145},{q:[.5544,.1347,-.0598,.8191,.0153,-.0174,.0852,.9961,.0579,.0065,.1307,.9897,-.0025,.0312,-.0389,.9988,-.2773,.1607,-.1306,.9382,-.7178,0,.2206,.6604,-.2015,0,.0098,.9794,-.5917,0,-.4935,.6375,-.3616,0,-.0988,.9271,-.1695,.1759,-.1535,.9575,-.1783,0,.3206,.9303,.6767,0,-.1544,.7199,-.1379,0,-.3513,.9261,.5891,0,.4709,.6567],y:-.7314,x:.202,z:1.2506},{q:[.5883,.1387,-.0576,.7946,.0133,-.0139,.0834,.9963,.0517,.0153,.1356,.9893,.002,.0317,-.0449,.9985,-.2888,.1604,-.1201,.9362,-.7007,0,.2724,.6594,-.3066,0,.0514,.9505,-.5115,0,-.5633,.6489,-.4424,0,-.2344,.8656,-.1088,.0607,-.1237,.9845,-.1746,0,.3177,.932,.6585,0,-.1535,.7367,-.1151,0,-.3333,.9358,.5659,0,.4642,.6814],y:-.7613,x:.2064,z:1.289},{q:[.6168,.1433,-.0546,.772,.0079,-.0118,.0802,.9967,.0311,.0206,.1344,.9902,.0235,.034,-.0381,.9984,-.2512,.1687,-.0818,.9496,-.6628,0,.3233,.6754,-.4037,0,.1217,.9068,-.4102,0,-.6083,.6795,-.4829,0,-.3883,.7849,-.0505,-.0445,-.0914,.9935,-.1663,0,.318,.9334,.6397,0,-.1512,.7536,-.0911,0,-.3146,.9448,.5485,0,.4503,.7045],y:-.7942,x:.2096,z:1.3263},{q:[.633,.1455,-.0525,.7585,.002,-.012,.0746,.9971,.0079,.0189,.1284,.9915,.0538,.0372,-.019,.9977,-.1742,.1801,-.0175,.968,-.6219,0,.3509,.7001,-.4673,0,.1984,.8615,-.3121,0,-.6029,.7343,-.4926,0,-.5086,.7062,-.0136,-.1026,-.0704,.9921,-.1441,0,.3226,.9355,.619,0,-.1495,.771,-.0611,0,-.2965,.9531,.539,0,.4283,.7252],y:-.8258,x:.2108,z:1.361},{q:[.64,.1432,-.0541,.7529,-.0025,-.0138,.0676,.9976,-.0089,.0104,.1224,.9924,.0816,.0416,-.0021,.9958,-.0988,.1948,.0475,.9747,-.5875,0,.3642,.7226,-.4992,0,.2683,.8239,-.2486,0,-.5682,.7844,-.4988,0,-.5723,.6509,5e-4,-.1131,-.0637,.9915,-.1128,0,.3307,.937,.5977,0,-.1507,.7874,-.0315,0,-.2807,.9593,.5366,0,.4008,.7425],y:-.8529,x:.2104,z:1.3909},{q:[.649,.1383,-.0573,.7459,-.0061,-.0143,.0622,.9979,-.0194,.0046,.1175,.9929,.0969,.047,.0024,.9942,-.0582,.2107,.089,.9718,-.558,0,.3777,.7389,-.5162,0,.3332,.789,-.2071,0,-.532,.821,-.488,0,-.6255,.6088,-.0026,-.1335,-.0627,.9891,-.0933,0,.3355,.9374,.5809,0,-.152,.7996,-.0169,0,-.2721,.9621,.5401,0,.3764,.7527],y:-.8728,x:.2098,z:1.4139},{q:[.667,.1376,-.0556,.7302,-.0094,-.0136,.0601,.9981,-.0286,.0018,.1127,.9932,.0988,.0526,-.0045,.9937,-.0572,.2262,.103,.9669,-.5284,0,.3971,.7504,-.5283,0,.3909,.7537,-.1753,0,-.5125,.8406,-.4429,0,-.6892,.5734,-.0142,-.2058,-.0571,.9768,-.1055,0,.3343,.9365,.5762,0,-.1459,.8041,-.0234,0,-.2706,.9624,.5469,0,.3641,.7539],y:-.8828,x:.2099,z:1.4287},{q:[.6793,.1463,-.047,.7176,-.0094,-.0145,.0605,.998,-.0236,-.0041,.109,.9938,.0936,.0569,-.0157,.9939,-.0733,.242,.0951,.9628,-.5071,0,.422,.7515,-.5276,0,.4341,.7302,-.1482,0,-.5131,.8455,-.3854,0,-.7382,.5536,-.0239,-.3197,-.0394,.9464,-.1285,0,.3346,.9335,.5794,0,-.1314,.8044,-.0259,0,-.2704,.9624,.5535,0,.3597,.7511],y:-.884,x:.2105,z:1.4375},{q:[.6876,.1547,-.0363,.7085,-.0081,-.0155,.0614,.998,-.0134,-.0099,.1055,.9943,.0864,.0605,-.0264,.9941,-.0776,.2592,.0775,.9596,-.4914,0,.4404,.7514,-.5196,0,.4707,.7131,-.1199,0,-.5238,.8434,-.3404,0,-.7682,.5423,-.0197,-.4348,-.0171,.9002,-.1497,0,.3342,.9305,.5793,0,-.1188,.8064,-.0265,0,-.2745,.9612,.56,0,.3556,.7483],y:-.8818,x:.211,z:1.443},{q:[.6976,.1515,-.029,.6996,-.0095,-.0148,.0605,.998,-.0134,-.0124,.1003,.9948,.0809,.0657,-.0385,.9938,-.0657,.2796,.0652,.9556,-.4758,0,.4539,.7534,-.5007,0,.5021,.7051,-.1041,0,-.5308,.8411,-.3263,0,-.78,.534,2e-4,-.512,-.003,.859,-.1614,0,.3294,.9303,.567,0,-.1178,.8153,-.0339,0,-.2871,.9573,.567,0,.3464,.7473],y:-.8812,x:.2105,z:1.4472},{q:[.7067,.141,-.0266,.6928,-.0121,-.013,.0587,.9981,-.0191,-.0126,.0966,.9951,.0778,.0711,-.0508,.9931,-.0582,.2995,.0591,.9505,-.4529,0,.4699,.7577,-.4755,0,.5294,.7026,-.1014,0,-.5372,.8373,-.3221,0,-.7804,.536,.0285,-.5626,-.0038,.8262,-.1626,0,.3243,.9319,.5434,0,-.1231,.8304,-.0438,0,-.3019,.9523,.5721,0,.3326,.7497],y:-.8836,x:.2091,z:1.4508},{q:[.7111,.134,-.0277,.6896,-.0131,-.0113,.0578,.9982,-.0202,-.0119,.0977,.9949,.0763,.0742,-.0583,.9926,-.0666,.3128,.0535,.946,-.4271,0,.4894,.7603,-.4554,0,.5494,.7006,-.1071,0,-.5437,.8324,-.3147,0,-.7782,.5434,.0536,-.6046,-.019,.7945,-.161,0,.3233,.9325,.5169,0,-.1243,.847,-.0489,0,-.3101,.9494,.5717,0,.3177,.7564],y:-.8871,x:.2083,z:1.4533},{q:[.7109,.1312,-.0297,.6903,-.0119,-.0102,.0574,.9982,-.0143,-.0118,.1017,.9946,.0752,.0762,-.0616,.9923,-.0827,.323,.0486,.9415,-.4019,0,.5107,.7601,-.4403,0,.5629,.6995,-.1169,0,-.5506,.8265,-.3086,0,-.7739,.553,.0629,-.6394,-.0368,.7654,-.159,0,.3243,.9325,.489,0,-.121,.8638,-.0477,0,-.3123,.9488,.564,0,.3025,.7684],y:-.8896,x:.2086,z:1.4551},{q:[.7087,.1278,-.0313,.6931,-.0099,-.0088,.0569,.9983,-.006,-.0105,.1044,.9945,.073,.0788,-.0634,.9922,-.0956,.335,.0483,.9361,-.3817,0,.5292,.7578,-.428,0,.5684,.7026,-.1271,0,-.5563,.8212,-.2969,0,-.7705,.564,.0497,-.666,-.0424,.7431,-.1549,0,.3225,.9338,.4549,0,-.1171,.8828,-.0446,0,-.3131,.9487,.5491,0,.2862,.7852],y:-.8912,x:.2096,z:1.4572},{q:[.7064,.1231,-.0326,.6963,-.0081,-.007,.0565,.9983,.0011,-.0077,.1046,.9945,.0699,.0817,-.0642,.9921,-.1053,.3488,.0501,.9299,-.3722,0,.5408,.7544,-.4197,0,.5672,.7086,-.1396,0,-.5684,.8108,-.2834,0,-.7671,.5755,.0614,-.6784,-.0341,.7314,-.1476,0,.3184,.9364,.4141,0,-.1131,.9032,-.0425,0,-.3135,.9486,.5278,0,.2694,.8055],y:-.8921,x:.2108,z:1.4595},{q:[.7032,.12,-.0342,.7,-.0062,-.0056,.0568,.9984,.0078,-.0041,.1041,.9945,.067,.0836,-.0628,.9923,-.1158,.3604,.0482,.9243,-.3755,0,.5447,.7499,-.4151,0,.5642,.7137,-.1522,0,-.5887,.7939,-.2688,0,-.7641,.5864,.0769,-.6724,-.0179,.736,-.1381,0,.3162,.9386,.3768,0,-.1092,.9199,-.0403,0,-.3116,.9494,.5007,0,.2528,.8279],y:-.8928,x:.212,z:1.4609},{q:[.6991,.1191,-.0357,.7042,-.0039,-.0048,.0579,.9983,.016,-.001,.1031,.9945,.0634,.0844,-.0594,.9926,-.1263,.3688,.0425,.9199,-.3886,0,.5429,.7445,-.4119,0,.5621,.7173,-.1586,0,-.6056,.7798,-.253,0,-.762,.5962,.0603,-.6602,-.0104,.7486,-.129,0,.3167,.9397,.3508,0,-.1069,.9303,-.0374,0,-.3069,.951,.4684,0,.2352,.8517],y:-.8934,x:.2134,z:1.4613},{q:[.6948,.1193,-.0359,.7083,-.0013,-.0046,.0591,.9982,.0249,2e-4,.1009,.9946,.0591,.0853,-.0558,.993,-.135,.3768,.0375,.9156,-.4042,0,.54,.7383,-.4082,0,.5608,.7203,-.1602,0,-.6204,.7678,-.2391,0,-.7587,.606,.0549,-.6523,-.0049,.756,-.1217,0,.3171,.9406,.3325,0,-.1053,.9372,-.0346,0,-.3005,.9532,.4307,0,.2147,.8766],y:-.8935,x:.2146,z:1.462},{q:[.6907,.1205,-.035,.7122,.0014,-.0049,.0608,.9981,.0335,-3e-4,.0984,.9946,.0547,.0867,-.0531,.9933,-.143,.3853,.0361,.9109,-.4143,0,.5405,.7323,-.4044,0,.5596,.7234,-.1596,0,-.6298,.7601,-.2257,0,-.7546,.6162,.0591,-.654,-.0038,.7542,-.1159,0,.3161,.9416,.3143,0,-.1029,.9437,-.0334,0,-.2928,.9556,.391,0,.1916,.9002],y:-.8929,x:.2156,z:1.463},{q:[.6869,.1228,-.0339,.7156,.0037,-.0053,.0639,.9979,.0412,-.0017,.0972,.9944,.0508,.0885,-.0518,.9934,-.1509,.3934,.0383,.9061,-.4153,0,.5462,.7274,-.3998,0,.5585,.7268,-.1583,0,-.6327,.758,-.2119,0,-.7499,.6267,.0635,-.6647,-.008,.7444,-.1113,0,.3144,.9427,.2933,0,-.0991,.9509,-.0364,0,-.2838,.9582,.3597,0,.1731,.9169],y:-.8916,x:.2164,z:1.4646},{q:[.6842,.1241,-.0325,.7179,.0055,-.0057,.0663,.9978,.0465,-.004,.0962,.9943,.0484,.0906,-.0518,.9934,-.1575,.4017,.0428,.9011,-.4096,0,.5554,.7237,-.3923,0,.5588,.7307,-.1579,0,-.6353,.756,-.2007,0,-.7433,.6382,.0591,-.6792,-.0173,.7314,-.1084,0,.312,.9439,.2736,0,-.0947,.9572,-.0416,0,-.2732,.961,.3375,0,.1619,.9273],y:-.8903,x:.216,z:1.4662},{q:[.6832,.1229,-.0311,.7192,.0065,-.0061,.0662,.9978,.0494,-.0069,.0938,.9943,.0466,.093,-.0526,.9932,-.1616,.4107,.0477,.896,-.4008,0,.5645,.7216,-.3825,0,.5632,.7325,-.1574,0,-.6374,.7543,-.1918,0,-.7356,.6497,.0413,-.6933,-.0311,.7188,-.1072,0,.3095,.9448,.2635,0,-.092,.9603,-.0456,0,-.2628,.9638,.3176,0,.1525,.9359],y:-.8894,x:.2147,z:1.4675},{q:[.6834,.1198,-.0305,.7195,.0073,-.0065,.0651,.9978,.0514,-.009,.0904,.9945,.0441,.0951,-.0533,.9931,-.1637,.4188,.051,.8917,-.3912,0,.5714,.7215,-.3726,0,.5717,.731,-.156,0,-.6392,.753,-.1824,0,-.7298,.6589,.0236,-.7041,-.0436,.7084,-.1058,0,.3075,.9456,.261,0,-.0911,.961,-.0478,0,-.2543,.9659,.2986,0,.1428,.9436],y:-.8891,x:.2138,z:1.4678},{q:[.684,.1162,-.0308,.7195,.0079,-.0067,.0642,.9979,.0532,-.0098,.0873,.9947,.0409,.0965,-.054,.993,-.1651,.4244,.052,.8888,-.3821,0,.5769,.7219,-.3634,0,.5815,.7279,-.1541,0,-.6409,.752,-.1721,0,-.7264,.6653,.0197,-.7113,-.0503,.7008,-.1039,0,.3059,.9464,.259,0,-.0906,.9616,-.0498,0,-.2481,.9675,.281,0,.1334,.9504],y:-.8891,x:.2137,z:1.4679},{q:[.6847,.1127,-.0321,.7194,.0085,-.0067,.0639,.9979,.055,-.0095,.0853,.9948,.0377,.0972,-.0551,.993,-.1658,.4272,.0519,.8873,-.3739,0,.5821,.7221,-.3552,0,.5901,.725,-.1522,0,-.6423,.7512,-.1627,0,-.7257,.6685,.0207,-.7168,-.0539,.6949,-.1022,0,.3049,.9469,.2568,0,-.0901,.9623,-.0526,0,-.2433,.9685,.2648,0,.1248,.9562],y:-.889,x:.2143,z:1.4682},{q:[.6855,.1095,-.034,.719,.0089,-.0064,.064,.9979,.0561,-.0084,.0838,.9949,.0349,.0975,-.0559,.9931,-.1647,.4278,.0516,.8873,-.3664,0,.5862,.7226,-.3487,0,.5976,.722,-.151,0,-.6432,.7506,-.1546,0,-.7258,.6703,.0251,-.7212,-.0549,.6901,-.1013,0,.3043,.9472,.2547,0,-.0894,.9629,-.0572,0,-.2395,.9692,.2493,0,.1164,.9614],y:-.8887,x:.2151,z:1.4687},{q:[.6866,.1066,-.0361,.7182,.0091,-.0061,.0646,.9978,.0563,-.0077,.0832,.9949,.0326,.0976,-.0567,.9931,-.1617,.4277,.0514,.8879,-.3587,0,.5882,.7249,-.3434,0,.6046,.7187,-.1503,0,-.6437,.7504,-.1491,0,-.7264,.6709,.0291,-.7248,-.0551,.6861,-.1012,0,.3039,.9473,.2523,0,-.0885,.9636,-.064,0,-.2365,.9695,.2369,0,.1093,.9654],y:-.8881,x:.216,z:1.4695},{q:[.6878,.1041,-.038,.7174,.009,-.0059,.0657,.9978,.0555,-.0072,.0829,.995,.0311,.0976,-.0575,.9931,-.158,.4269,.0515,.8889,-.352,0,.589,.7274,-.3388,0,.6099,.7164,-.1495,0,-.6439,.7504,-.1448,0,-.7277,.6705,.0332,-.728,-.0546,.6825,-.1017,0,.3037,.9473,.25,0,-.0875,.9643,-.0713,0,-.2341,.9696,.2313,0,.1059,.9671],y:-.8877,x:.2168,z:1.4705},{q:[.6888,.1022,-.0393,.7166,.0087,-.0056,.0658,.9978,.0542,-.0067,.0826,.9951,.03,.0973,-.058,.9931,-.1541,.4252,.0515,.8904,-.3471,0,.5885,.7302,-.3371,0,.6142,.7136,-.1485,0,-.6449,.7497,-.1403,0,-.7278,.6713,.0353,-.731,-.0547,.6793,-.1023,0,.3039,.9472,.2486,0,-.0866,.9647,-.0721,0,-.231,.9703,.2287,0,.1056,.9678],y:-.8876,x:.2171,z:1.4711},{q:[.6894,.101,-.0401,.7162,.0084,-.0054,.0651,.9978,.0531,-.0065,.0828,.9951,.0292,.0969,-.0587,.9931,-.1506,.4232,.0511,.892,-.3443,0,.5867,.733,-.3386,0,.6173,.7102,-.1475,0,-.6469,.7482,-.1355,0,-.7266,.6735,.0352,-.7337,-.0555,.6763,-.1027,0,.3047,.9469,.248,0,-.086,.9649,-.0724,0,-.2276,.9711,.2262,0,.1041,.9685],y:-.8878,x:.2171,z:1.4711},{q:[.6896,.1004,-.0406,.7161,.0082,-.0052,.0647,.9979,.0524,-.0058,.0826,.9952,.0285,.0962,-.0588,.9932,-.1483,.4203,.0509,.8937,-.3435,0,.5859,.734,-.3407,0,.6178,.7087,-.1461,0,-.6482,.7473,-.1299,0,-.7263,.675,.0344,-.7364,-.0558,.6734,-.1025,0,.3055,.9467,.247,0,-.0855,.9652,-.073,0,-.2252,.9716,.2258,0,.103,.9687],y:-.888,x:.217,z:1.4712},{q:[.6894,.1003,-.0406,.7162,.0081,-.0051,.0645,.9979,.0521,-.0053,.0822,.9952,.0281,.0955,-.0585,.9933,-.1467,.4175,.0511,.8953,-.3442,0,.5853,.7341,-.3433,0,.6166,.7085,-.1447,0,-.6488,.7471,-.125,0,-.7267,.6754,.0341,-.7386,-.0551,.6711,-.102,0,.3061,.9465,.2457,0,-.085,.9656,-.0735,0,-.2236,.9719,.2271,0,.1034,.9684],y:-.8882,x:.217,z:1.4714},{q:[.6892,.1004,-.0405,.7164,.008,-.0051,.0646,.9979,.0519,-.0051,.0819,.9953,.0279,.0951,-.0583,.9934,-.1454,.4155,.0515,.8964,-.3454,0,.5849,.7339,-.3455,0,.6151,.7087,-.1443,0,-.6489,.7471,-.1222,0,-.7272,.6754,.0338,-.7399,-.0543,.6697,-.1012,0,.3064,.9465,.2442,0,-.0846,.966,-.0739,0,-.2222,.9722,.2285,0,.105,.9679],y:-.8884,x:.2169,z:1.4717},{q:[.6891,.1006,-.0404,.7165,.008,-.005,.0646,.9979,.0516,-.0047,.0817,.9953,.0276,.0948,-.058,.9934,-.1442,.4138,.0522,.8974,-.3469,0,.5843,.7337,-.3479,0,.6136,.7089,-.1442,0,-.6481,.7478,-.1203,0,-.7276,.6754,.033,-.7408,-.0537,.6688,-.1007,0,.3066,.9465,.2431,0,-.0844,.9663,-.074,0,-.2211,.9724,.2296,0,.1065,.9674],y:-.8885,x:.2168,z:1.4721},{q:[.689,.1007,-.0403,.7166,.0079,-.0049,.0646,.9979,.0514,-.0045,.0814,.9954,.0272,.0947,-.0578,.9935,-.1434,.4131,.0532,.8977,-.3481,0,.5837,.7336,-.3499,0,.6125,.7088,-.1441,0,-.6472,.7486,-.1192,0,-.7281,.675,.033,-.7414,-.053,.6681,-.1002,0,.3066,.9466,.2423,0,-.0843,.9665,-.0737,0,-.2202,.9727,.2296,0,.1068,.9674],y:-.8886,x:.2167,z:1.4725},{q:[.689,.1008,-.0402,.7165,.0078,-.0049,.0645,.9979,.051,-.0043,.0812,.9954,.0271,.0948,-.0577,.9935,-.1428,.4131,.0544,.8978,-.3489,0,.5831,.7336,-.3513,0,.6118,.7087,-.1439,0,-.6467,.7491,-.1183,0,-.7284,.6749,.0325,-.7422,-.053,.6673,-.1,0,.3065,.9466,.2421,0,-.0845,.9666,-.0733,0,-.2197,.9728,.229,0,.1061,.9676],y:-.8888,x:.2167,z:1.4728},{q:[.6891,.1009,-.0402,.7165,.0077,-.0048,.0644,.9979,.0507,-.0043,.0811,.9954,.0269,.095,-.0576,.9934,-.1423,.4138,.0554,.8975,-.3494,0,.5827,.7337,-.3522,0,.6114,.7086,-.1436,0,-.6464,.7493,-.1175,0,-.7286,.6747,.0337,-.7431,-.0524,.6663,-.0999,0,.3063,.9467,.2422,0,-.0847,.9665,-.0733,0,-.2199,.9728,.2291,0,.1061,.9676],y:-.8889,x:.2167,z:1.4729},{q:[.6892,.101,-.04,.7164,.0076,-.0048,.0644,.9979,.0505,-.0041,.081,.9954,.0266,.0954,-.0577,.9934,-.1421,.415,.0571,.8968,-.3498,0,.5823,.7339,-.3527,0,.6112,.7086,-.1433,0,-.6464,.7495,-.1163,0,-.7288,.6748,.0349,-.7439,-.0516,.6653,-.0999,0,.3059,.9468,.2427,0,-.0849,.9664,-.0734,0,-.2202,.9727,.2293,0,.1064,.9675],y:-.889,x:.2167,z:1.4729},{q:[.6893,.1011,-.0398,.7163,.0075,-.0048,.0643,.9979,.0503,-.004,.0809,.9954,.0262,.096,-.0581,.9933,-.142,.4166,.0599,.8959,-.3502,0,.5817,.7341,-.3536,0,.6108,.7084,-.1431,0,-.6463,.7495,-.1152,0,-.7289,.6748,.0358,-.7447,-.051,.6645,-.0999,0,.3055,.9469,.2431,0,-.0852,.9663,-.0731,0,-.2201,.9727,.229,0,.1064,.9676],y:-.8891,x:.2166,z:1.473},{q:[.6893,.1013,-.0396,.7163,.0074,-.0048,.0642,.9979,.0499,-.0041,.0808,.9955,.0261,.0964,-.0581,.9933,-.1413,.4177,.0614,.8954,-.3509,0,.5812,.7342,-.3549,0,.61,.7085,-.1431,0,-.6462,.7497,-.1148,0,-.7291,.6748,.0355,-.7451,-.0511,.6641,-.0999,0,.305,.9471,.2434,0,-.0854,.9662,-.0728,0,-.2199,.9728,.2286,0,.1062,.9677],y:-.8892,x:.2166,z:1.473},{q:[.6893,.1014,-.0395,.7163,.0073,-.0048,.0642,.9979,.0496,-.004,.0807,.9955,.0262,.0964,-.0576,.9933,-.1402,.418,.0614,.8954,-.3517,0,.5808,.7342,-.3563,0,.609,.7086,-.1433,0,-.6458,.7499,-.1145,0,-.7291,.6747,.0358,-.7452,-.0507,.664,-.0997,0,.3046,.9472,.2436,0,-.0856,.9661,-.0725,0,-.2197,.9729,.2285,0,.1061,.9678],y:-.8893,x:.2166,z:1.473},{q:[.6892,.1017,-.0394,.7163,.0073,-.0047,.0642,.9979,.0493,-.0038,.0807,.9955,.0261,.0962,-.0568,.9934,-.1388,.4177,.0606,.8959,-.3525,0,.5803,.7342,-.358,0,.6079,.7087,-.1431,0,-.6457,.75,-.1133,0,-.7291,.675,.0359,-.7457,-.0504,.6634,-.0996,0,.3045,.9473,.2439,0,-.0858,.966,-.0723,0,-.2194,.9729,.2285,0,.106,.9678],y:-.8893,x:.2166,z:1.4731},{q:[.6892,.1019,-.0394,.7163,.0072,-.0047,.0642,.9979,.049,-.0036,.0807,.9955,.026,.0959,-.0561,.9935,-.1375,.417,.0597,.8964,-.3532,0,.5798,.7342,-.3594,0,.607,.7088,-.1431,0,-.6458,.75,-.1125,0,-.7289,.6753,.0368,-.746,-.0498,.6631,-.0997,0,.3046,.9473,.244,0,-.086,.966,-.0721,0,-.2192,.973,.2282,0,.1058,.9678],y:-.8893,x:.2165,z:1.4731},{q:[.6893,.102,-.0393,.7162,.0071,-.0047,.0641,.9979,.0485,-.0037,.0807,.9955,.0262,.0957,-.0557,.9935,-.1363,.4164,.059,.897,-.3537,0,.5795,.7342,-.3604,0,.6065,.7088,-.1434,0,-.6456,.7501,-.1133,0,-.7289,.6751,.0375,-.7457,-.0497,.6633,-.0999,0,.3046,.9472,.244,0,-.086,.966,-.0721,0,-.219,.9731,.228,0,.1057,.9679],y:-.8893,x:.2164,z:1.4731},{q:[.6894,.102,-.0394,.7161,.007,-.0046,.0641,.9979,.0481,-.0036,.0807,.9956,.0261,.0955,-.0554,.9935,-.1353,.4155,.0583,.8976,-.3538,0,.5793,.7344,-.3609,0,.6062,.7087,-.1433,0,-.6456,.7501,-.1131,0,-.7289,.6752,.0383,-.7459,-.0493,.6631,-.1,0,.3046,.9472,.244,0,-.086,.966,-.0722,0,-.2189,.9731,.228,0,.1056,.9679],y:-.8894,x:.2164,z:1.4732},{q:[.6895,.1019,-.0394,.716,.007,-.0046,.0642,.9979,.048,-.0034,.0807,.9956,.0259,.0952,-.0553,.9936,-.1346,.4147,.0579,.8981,-.3533,0,.5792,.7346,-.3609,0,.6064,.7086,-.143,0,-.6459,.7499,-.1123,0,-.7288,.6754,.0395,-.7465,-.0486,.6624,-.1001,0,.3046,.9472,.2439,0,-.086,.966,-.0723,0,-.2189,.9731,.2279,0,.1055,.968],y:-.8894,x:.2164,z:1.4732},{q:[.6897,.1017,-.0395,.7158,.0069,-.0045,.0642,.9979,.0477,-.0035,.0809,.9956,.0258,.0952,-.0557,.9936,-.134,.4143,.0581,.8983,-.353,0,.579,.7349,-.361,0,.6065,.7084,-.1427,0,-.6464,.7496,-.1124,0,-.7289,.6754,.0403,-.747,-.0484,.6619,-.1003,0,.3046,.9472,.2439,0,-.0859,.966,-.0726,0,-.2189,.973,.2277,0,.1054,.968],y:-.8894,x:.2164,z:1.4732},{q:[.6899,.1015,-.0395,.7157,.0068,-.0045,.0642,.9979,.0472,-.0034,.0811,.9956,.0259,.0953,-.0561,.9935,-.1336,.4142,.0587,.8984,-.3529,0,.5787,.7353,-.3613,0,.6066,.7081,-.1425,0,-.6466,.7494,-.1126,0,-.7289,.6753,.0412,-.7472,-.0481,.6616,-.1005,0,.3045,.9472,.2437,0,-.0858,.966,-.0729,0,-.219,.973,.2278,0,.1054,.968],y:-.8894,x:.2165,z:1.4733},{q:[.6899,.1015,-.0396,.7156,.0067,-.0044,.0642,.9979,.047,-.0032,.0811,.9956,.0257,.0954,-.056,.9935,-.1332,.4144,.0594,.8983,-.3525,0,.5786,.7355,-.3615,0,.6068,.708,-.1429,0,-.6466,.7494,-.1122,0,-.7288,.6755,.0413,-.7471,-.0478,.6617,-.1005,0,.3046,.9472,.2436,0,-.0858,.9661,-.073,0,-.219,.973,.2279,0,.1053,.968],y:-.8895,x:.2166,z:1.4733},{q:[.6901,.1013,-.0396,.7155,.0066,-.0044,.0641,.9979,.0468,-.0033,.0811,.9956,.0255,.0956,-.0559,.9935,-.1325,.4152,.0601,.898,-.3521,0,.5786,.7357,-.3615,0,.6069,.7078,-.1437,0,-.6464,.7493,-.1128,0,-.7288,.6754,.0418,-.7466,-.0474,.6622,-.1006,0,.3045,.9472,.2436,0,-.0858,.9661,-.0732,0,-.2192,.9729,.2277,0,.1052,.968],y:-.8895,x:.2166,z:1.4733},{q:[.6903,.1011,-.0397,.7153,.0065,-.0044,.0642,.9979,.0462,-.0034,.0813,.9956,.0257,.0958,-.056,.9935,-.1318,.416,.0606,.8977,-.3523,0,.5783,.7358,-.3617,0,.6068,.7078,-.1439,0,-.6463,.7494,-.1141,0,-.7289,.675,.0426,-.7462,-.0472,.6627,-.1008,0,.3044,.9472,.2435,0,-.0858,.9661,-.0735,0,-.2192,.9729,.2277,0,.1052,.968],y:-.8895,x:.2166,z:1.4734},{q:[.6903,.1012,-.0397,.7153,.0064,-.0043,.0642,.9979,.0461,-.0031,.0814,.9956,.0257,.0959,-.0556,.9935,-.1316,.4163,.0607,.8976,-.353,0,.5778,.7359,-.3622,0,.6065,.7078,-.1437,0,-.6464,.7494,-.1132,0,-.7289,.6752,.0432,-.7464,-.0467,.6624,-.1008,0,.3045,.9472,.2434,0,-.0858,.9661,-.0735,0,-.219,.9729,.2276,0,.1052,.968],y:-.8896,x:.2166,z:1.4734},{q:[.6902,.1014,-.0397,.7154,.0064,-.0043,.0641,.9979,.0461,-.0029,.0814,.9956,.0256,.0959,-.0553,.9935,-.1313,.4164,.0606,.8976,-.3535,0,.5773,.736,-.3628,0,.606,.7079,-.1438,0,-.6464,.7494,-.1122,0,-.7289,.6754,.044,-.7466,-.0459,.6622,-.1007,0,.3045,.9472,.2434,0,-.0858,.9661,-.0731,0,-.2188,.973,.2274,0,.105,.9681],y:-.8896,x:.2166,z:1.4734},{q:[.6902,.1015,-.0396,.7154,.0063,-.0044,.0642,.9979,.0459,-.0031,.0817,.9956,.0258,.0959,-.0554,.9935,-.1309,.4167,.0603,.8976,-.3544,0,.5767,.7361,-.3638,0,.6052,.7081,-.1439,0,-.6465,.7492,-.1126,0,-.7289,.6753,.0445,-.7466,-.0455,.6622,-.1006,0,.3045,.9472,.2433,0,-.0858,.9661,-.0728,0,-.2187,.9731,.2271,0,.1049,.9682],y:-.8897,x:.2165,z:1.4734},{q:[.6901,.1019,-.0395,.7154,.0062,-.0044,.0643,.9979,.0456,-.0032,.082,.9956,.026,.0959,-.0554,.9935,-.1307,.4164,.0596,.8978,-.3555,0,.576,.7361,-.3648,0,.6046,.7081,-.1436,0,-.6467,.7491,-.1123,0,-.7289,.6753,.0453,-.747,-.045,.6618,-.1006,0,.3046,.9471,.2433,0,-.0858,.9661,-.0726,0,-.2184,.9732,.2271,0,.1048,.9682],y:-.8898,x:.2165,z:1.4735}]};function yh(i){return i.q=i.frames.map(t=>i.joints.map((e,n)=>new Ke().fromArray(t.q,n*4))),i}var b1={spinKick:yh(_h),dying:yh(xh)},Wt={wind1:{chest:[0,-.8,0],shR:[-2.7,.1,-.5],elR:[-.35,0,0],wrR:[.5,0,0],shL:[-.4,-.4,.3],elL:[-.8,0,0],hipsY:-.04},end1:{chest:[.18,.8,0],neck:[0,-.4,0],shR:[-.55,1.2,.35],elR:[-.15,0,0],wrR:[.15,0,0],shL:[-.3,.2,.4],elL:[-.5,0,0],hipsY:-.16,hipL:[-.6,0,.1],knL:[.7,0,0],hipR:[.35,0,-.1],knR:[.45,0,0]},wind2:{chest:[.1,.7,0],neck:[0,-.3,0],shR:[-.3,1.3,.5],elR:[-.2,0,0],wrR:[-.2,0,0],hipsY:-.14},end2:{chest:[-.1,-.9,0],neck:[0,.5,0],shR:[-2.5,-.5,-.9],elR:[-.2,0,0],wrR:[.4,0,0],shL:[-.6,-.9,.2],hipsY:-.08},wind3:{chest:[0,-1.2,0],neck:[0,.7,0],shR:[-1.5,-.9,-.2],elR:[-.25,0,0],wrR:[1.4,0,0],hipsY:-.22,hipL:[-.5,0,.3],knL:[.6,0,0],hipR:[.3,0,-.3],knR:[.5,0,0]},end3:{chest:[0,1.3,0],neck:[0,-.7,0],shR:[-1.5,1.4,.1],elR:[-.1,0,0],wrR:[1.4,0,0],hipsY:-.22,hipL:[-.5,0,.3],knL:[.6,0,0],hipR:[.3,0,-.3],knR:[.5,0,0]},windH:{chest:[-.3,-.2,0],shR:[-3.1,.3,.1],elR:[-.5,0,0],wrR:[.2,0,0],shL:[-2.9,-.3,0],elL:[-.6,0,0],hipsY:0},endH:{chest:[.45,0,0],spine:[.2,0,0],shR:[-.7,.25,0],elR:[-.1,0,0],wrR:[.6,0,0],shL:[-.75,-.3,0],elL:[-.2,0,0],hipsY:-.3,hipL:[-1,0,0],knL:[1,0,0],hipR:[.6,0,0],knR:[.7,0,0]},windT:{chest:[0,-.6,0],shR:[-1.3,-.4,-.3],elR:[-1.6,0,0],wrR:[1.5,0,0],hipsY:-.2},endT:{chest:[.2,.3,0],shR:[-1.55,.25,0],elR:[0,0,0],wrR:[1.55,0,0],hipsY:-.3,hipL:[-1,0,0],knL:[.9,0,0],hipR:[.6,0,0],knR:[.5,0,0]},parry:{chest:[0,.35,0],shR:[-1.7,.7,.1],elR:[-1.1,0,0],wrR:[1.1,.3,1.2],shL:[-1.2,-.3,0],elL:[-1.4,0,0],hipsY:-.12},dodge:{hipsY:-.38,spine:[.5,0,0],chest:[.3,0,0],hipL:[-1.3,0,0],knL:[1.7,0,0],hipR:[-.3,0,0],knR:[1.9,0,0],shR:[-.4,.3,0],elR:[-.6,0,0]},hit:{chest:[-.45,.3,0],head:[-.4,0,0],hipsY:-.1,shR:[-.3,.3,-.5],shL:[-.4,0,.5]},stagger:{chest:[-.6,-.4,0],head:[-.5,0,0],shR:[.2,0,-1],elR:[-.3,0,0],shL:[.2,0,1],hipsY:-.15,hipL:[.3,0,.2],knL:[.5,0,0]},dead:{hipsY:-.55,chest:[.6,0,0],head:[.6,0,0],shR:[.2,0,-.6],shL:[.2,0,.6],hipL:[-1.4,0,0],knL:[2.2,0,0],hipR:[-1.3,0,0],knR:[2.2,0,0]}};Wt.stagger2={...Wt.stagger,chest:[-.4,-.2,0],hipsY:-.25};var Ar={light1:{dur:.46,active:[.12,.24],combo:.24,dmg:18,cost:12,lunge:[.06,.2,3.2],keys:[[0,{}],[.11,Wt.wind1],[.24,Wt.end1],[.46,{}]]},light2:{dur:.46,active:[.12,.23],combo:.24,dmg:18,cost:12,lunge:[.06,.2,3.2],keys:[[0,Wt.end1],[.1,Wt.wind2],[.23,Wt.end2],[.46,{}]]},light3:{dur:.64,active:[.18,.34],combo:.5,dmg:28,cost:16,lunge:[.12,.3,4.5],arc:1.9,keys:[[0,Wt.end2],[.15,Wt.wind3],[.34,Wt.end3],[.64,{}]]},heavy:{dur:.95,active:[.42,.54],combo:.8,dmg:46,cost:28,heavy:!0,lunge:[.34,.5,8],keys:[[0,{}],[.36,Wt.windH],[.5,Wt.endH],[.95,{}]]},parry:{dur:.38,keys:[[0,{}],[.07,Wt.parry],[.26,Wt.parry],[.38,{}]]},dodge:{dur:.42,keys:[[0,{}],[.08,Wt.dodge],[.3,Wt.dodge],[.42,{}]]},hit:{dur:.34,keys:[[0,{}],[.06,Wt.hit],[.34,{}]]},stagger:{dur:1.35,keys:[[0,{}],[.12,Wt.stagger],[1.05,Wt.stagger2],[1.35,{}]]},kick:{clip:"spinKick",from:.25,to:1.9,speed:1.35,active:[.5,.78],dmg:10,posture:45,kick:!0,cost:20,arc:3.2,reach:2.4},dying:{clip:"dying",from:.6,to:4.6,speed:1.5,hold:!0},die:{dur:1.1,hold:!0,keys:[[0,{}],[.25,Wt.hit],[1.1,Wt.dead]]},slash:{dur:1.25,windup:.6,active:[.62,.75],dmg:18,keys:[[0,{}],[.6,Wt.wind1],[.75,Wt.end1],[1.25,{}]]},rising:{dur:.95,windup:.3,active:[.3,.42],dmg:18,keys:[[0,Wt.end1],[.28,Wt.wind2],[.42,Wt.end2],[.95,{}]]},thrust:{dur:1.3,windup:.66,active:[.68,.82],dmg:22,lunge:[.62,.82,10],arc:.7,reach:2.2,keys:[[0,{}],[.62,Wt.windT],[.82,Wt.endT],[1.3,{}]]},smash:{dur:1.5,windup:.85,active:[.86,.98],dmg:34,heavy:!0,lunge:[.78,.95,6],keys:[[0,{}],[.82,Wt.windH],[.98,Wt.endH],[1.5,{}]]}};for(let i of Object.values(Ar))i.clip&&(i.dur=(i.to-i.from)/i.speed);var E1=new L,vh=new Ke,Mh=new Ke,T1=new yn,wr=class{constructor(t,e){this.kind=t,this.rig=mh(t),e.add(this.rig.root),this.scene=e,this.pos=new L,this.yaw=0,this.speed=0,this.phase=0,this.action=null,this.alive=!0,this.deadT=0,this.trail=ph(e,t==="player"?12576511:16726570);let n={player:[100,0],ronin:[70,50],oni:[340,120]}[t];this.maxHp=this.hp=n[0],this.maxPosture=n[1],this.posture=0,this.blocking=!1,this.glow=0}get scale(){return this.rig.scale}get forward(){return E1.set(Math.sin(this.yaw),0,Math.cos(this.yaw))}play(t){this.action={name:t,def:Ar[t],t:0,hits:new Set}}is(...t){return!!this.action&&t.includes(this.action.name)}get striking(){let t=this.action;return!!(t&&t.def.active&&t.t>=t.def.active[0]&&t.t<=t.def.active[1])}get windup(){let t=this.action;return!t||!t.def.windup?0:Math.min(1,t.t/t.def.windup)}facingAngleTo(t){let e=Math.atan2(t.x-this.pos.x,t.z-this.pos.z);return Math.abs(Math.atan2(Math.sin(e-this.yaw),Math.cos(e-this.yaw)))}turnTowards(t,e,n){let s=Math.atan2(t.x-this.pos.x,t.z-this.pos.z),r=Math.atan2(Math.sin(s-this.yaw),Math.cos(s-this.yaw));this.yaw+=Math.max(-e*n,Math.min(e*n,r))}update(t,e){let n=this.action;if(n){n.t+=t;let h=n.def.lunge;h&&n.t>=h[0]&&n.t<=h[1]&&this.pos.addScaledVector(this.forward,h[2]*t*this.scale),n.t>=n.def.dur&&!n.def.hold&&(this.action=null)}let s=Math.min(1,this.speed/4.5);this.phase+=t*(3+this.speed*2.1);let r=Math.sin(this.phase),a=Math.cos(this.phase),o=Math.sin(e*2.1+this.pos.x)*.025,l=Tr(Ye,Ye,0);l.chest=[Ye.chest[0]+o+s*.18,Ye.chest[1],Ye.chest[2]],l.hipsY=Ye.hipsY+Math.abs(a)*.05*s-s*.05,l.hipL=[Ye.hipL[0]*(1-s)-r*.75*s,0,.04],l.hipR=[Ye.hipR[0]*(1-s)+r*.75*s,0,-.04],l.knL=[Ye.knL[0]*(1-s)+(.25+Math.max(0,-a)*1.1)*s,0,0],l.knR=[Ye.knR[0]*(1-s)+(.25+Math.max(0,a)*1.1)*s,0,0],l.shL=[Ye.shL[0]+r*.15*s,Ye.shL[1],Ye.shL[2]],this.blocking&&Object.assign(l,{chest:Wt.parry.chest,shR:Wt.parry.shR,elR:Wt.parry.elR,wrR:Wt.parry.wrR,shL:Wt.parry.shL,elL:Wt.parry.elL});let c=l;if(this.action&&this.action.def.clip)return this.playClip(t,l);if(this.action){let h=this.action.def,p=gh(h.keys,this.action.t,l),u=h.hold?1:Math.min(1,(h.dur-this.action.t)/.1,this.action.t/.04);c=Tr(l,p,Math.max(0,u))}this.rig.setPose(c),this.finish(t)}playClip(t,e){let n=this.action,s=n.def,r=b1[s.clip],o=Math.min(s.to,s.from+n.t*s.speed)*r.fps,l=Math.min(r.frames.length-1,Math.floor(o)),c=Math.min(r.frames.length-1,l+1),h=o-l,p=r.frames[l],u=r.frames[c],m=p.x+(u.x-p.x)*h,x=p.z+(u.z-p.z)*h;if(n.root){let M=(m-n.root[0])*this.scale,C=(x-n.root[1])*this.scale,v=Math.cos(this.yaw),E=Math.sin(this.yaw);this.pos.x+=M*v+C*E,this.pos.z+=-M*E+C*v}n.root=[m,x];let b=Math.max(0,Math.min(1,n.t/.1,s.hold?1:(s.dur-n.t)/.15)),f={};r.joints.forEach((M,C)=>{let v=e[M]||[0,0,0];vh.setFromEuler(T1.set(v[0],v[1],v[2])),Mh.copy(r.q[l][C]).slerp(r.q[c][C],h),f[M]=vh.clone().slerp(Mh,b)});let d=p.y+(u.y-p.y)*h;this.rig.setQuats(f,(e.hipsY||0)*(1-b)+d*b),this.finish(t)}finish(t){if(!this.alive&&this.action&&this.action.def.clip){this.deadT+=t;let e=Math.max(0,Math.min(1,(this.deadT-this.action.def.dur-.3)/1.1));e>0&&Object.values(this.rig.mats).forEach(n=>{n.transparent=!0,n.opacity=1-e})}else if(!this.alive&&(this.deadT+=t,this.deadT>1.1)){let e=Math.min(1,(this.deadT-1.1)/1.2);this.rig.root.rotation.x=-e*1.35,this.rig.root.position.y=-e*.2}if(this.rig.root.position.x=this.pos.x,this.rig.root.position.z=this.pos.z,this.rig.root.rotation.y=this.yaw,this.kind!=="player"){let e=this.alive?this.striking?1.2:this.windup**2*5:0;this.glow+=(e-this.glow)*Math.min(1,t*12),this.rig.mats.steel.emissiveIntensity=.15+this.glow}this.rig.root.updateMatrixWorld(!0),this.trail.update(this.rig.blade.base,this.rig.blade.tip,this.striking&&!this.action.def.kick,t)}get gone(){if(this.alive)return!1;let t=this.action&&this.action.def;return this.deadT>(t&&t.clip?t.dur+1.5:2.6)}bladeTip(t){return this.rig.blade.tip.getWorldPosition(t)}dispose(){this.scene.remove(this.rig.root),this.rig.root.traverse(t=>t.geometry&&t.geometry.dispose())}};function Sh(i,t,e,n,s){if(!i.alive||!t.alive){i.speed*=.9;return}if(i.cd=(i.cd??1+Math.random())-n,i.action){i.action.def.windup&&i.action.t<i.action.def.windup*.75&&i.turnTowards(t.pos,4,n),i.combo&&i.is("slash")&&i.action.t>=i.action.def.dur-.05&&(i.combo=!1,i.play("rising")),i.speed*=.85;return}let r=i.pos.distanceTo(t.pos),a=2.2*i.scale;i.turnTowards(t.pos,5,n);let o=new L;if(r>a+.4)o.copy(t.pos).sub(i.pos).setY(0).normalize().multiplyScalar(i.kind==="oni"?2.4:2.9);else{let l=i.side??(i.side=Math.random()<.5?-1:1),c=i.forward.clone();o.set(c.z,0,-c.x).multiplyScalar(l*1.1),r<a-.5&&o.addScaledVector(c,-1.6)}for(let l of e){if(l===i||!l.alive)continue;let c=i.pos.clone().sub(l.pos).setY(0),h=c.length();h<1.6&&h>.001&&o.addScaledVector(c.normalize(),(1.6-h)*3)}i.pos.addScaledVector(o,n),i.speed=o.length(),i.cd<=0&&r<a+1.2&&s.free&&(s.free=!1,i.kind==="oni"?(i.play(Math.random()<.45?"smash":"slash"),i.combo=Math.random()<.6):i.play(r>a-.1&&Math.random()<.6?"thrust":"slash"),i.cd=(i.kind==="oni"?1.4:1.8)+Math.random()*1.6)}var ge=i=>document.querySelector(i),Un=new Ea({antialias:!0,powerPreference:"high-performance"});Un.setPixelRatio(Math.min(window.devicePixelRatio,1.75));Un.setSize(innerWidth,innerHeight);Un.shadowMap.enabled=!0;Un.shadowMap.type=I0;Un.toneMapping=wi;Un.toneMappingExposure=1.2;ge("#game").appendChild(Un.domElement);var Ui=new zs,bn=new Ie(55,innerWidth/innerHeight,.1,400),Rr=new Ca(Un);Rr.addPass(new Pa(Ui,bn));var w1=new ys(new At(innerWidth,innerHeight),.85,.55,.82);Rr.addPass(w1);Rr.addPass(new Ia);addEventListener("resize",()=>{bn.aspect=innerWidth/innerHeight,bn.updateProjectionMatrix(),Un.setSize(innerWidth,innerHeight),Rr.setSize(innerWidth,innerHeight)});var A1=dh(Ui),Nn=fh(Ui),Ze=new Set,ul=new Set;addEventListener("keydown",i=>{Ze.has(i.code)||ul.add(i.code),Ze.add(i.code),["Space","Tab"].includes(i.code)&&i.preventDefault()});addEventListener("keyup",i=>Ze.delete(i.code));addEventListener("blur",()=>Ze.clear());var dl=!1,fl=!1,pl=!1,Es=Un.domElement;Es.addEventListener("contextmenu",i=>i.preventDefault());var Ts=!1;document.addEventListener("pointerlockerror",()=>Ts=!0);addEventListener("mousedown",i=>{if(Oi==="play"){if(document.pointerLockElement!==Es&&!Ts&&Es.requestPointerLock){try{let t=Es.requestPointerLock();t&&t.catch&&t.catch(()=>Ts=!0)}catch{Ts=!0}return}i.button===0&&(dl=!0),i.button===2&&(fl=!0),i.button===1&&(pl=!0,i.preventDefault())}});var Fi=Math.PI,Fa=.32;addEventListener("mousemove",i=>{document.pointerLockElement!==Es&&!(i.buttons&&Oi==="play")||(Fi-=i.movementX*.0024,Fa=Math.max(.05,Math.min(.9,Fa+i.movementY*.0018)))});var Pi=i=>{let t=ul.has(i);return ul.delete(i),t},Oi="title",ct,Pe=[],Xn=0,Ms=0,Di=0,ws=0,En=0,bh=-1,Ii=0,tn=null,vs=0,Fe=100,Ss=0,Da=99,Eh={free:!0},Ni=[{title:"Premi\xE8re vague",foes:["ronin"]},{title:"Deuxi\xE8me vague",foes:["ronin","ronin"]},{title:"Troisi\xE8me vague",foes:["ronin","ronin","ronin"]},{title:"L'Oni de la Lune Rouge",foes:["oni"],boss:!0}];function R1(){ct?.dispose(),Pe.forEach(i=>i.dispose()),ct=new wr("player",Ui),ct.pos.set(0,0,6),ct.yaw=Math.PI,Pe=[],Xn=0,Ms=1.2,Fe=100,Ii=0,tn=null,Fi=Math.PI,ge("#boss").classList.add("hidden"),Ch(Ni[0].title,"D\xE9fends la cour du temple")}function C1(i){let t=Ni[i];t.foes.forEach((e,n)=>{let s=new wr(e,Ui),r=-.6+n*.6+(Math.random()-.5)*.3;s.pos.set(Math.sin(r)*9,0,-Math.cos(r)*9),s.yaw=Math.atan2(ct.pos.x-s.pos.x,ct.pos.z-s.pos.z),s.cd=1.5+n*.8,Pe.push(s),Nn.emit(s.pos.clone().setY(1),60,{color:16723992,speed:3,up:3,gravity:-1,lifeTime:1.2,intensity:2})}),t.boss&&(ge("#boss").classList.remove("hidden"),ge("#boss-name").textContent=t.title)}var ml=0;function Ch(i,t=""){ge("#banner-title").textContent=i,ge("#banner-sub").textContent=t,ge("#banner").classList.remove("hidden","show"),ge("#banner").offsetWidth,ge("#banner").classList.add("show"),ml=2.4}var gl=0;function Li(i,t=""){let e=ge("#callout");e.textContent=i,e.className="callout show "+t,gl=.9}function P1(){ge("#hp").style.width=ct.hp/ct.maxHp*100+"%",ge("#st").style.width=Fe+"%";let i=Pe.find(t=>t.kind==="oni");i&&(ge("#boss-hp").style.width=Math.max(0,i.hp/i.maxHp*100)+"%"),ge("#wave").textContent=`${Math.max(1,Xn)} / ${Ni.length}`}function Oa(i){["#title","#over","#win"].forEach(t=>ge(t).classList.toggle("hidden",t!==i)),ge("#hud").classList.toggle("hidden",i!==null)}function Ba(){R1(),Oi="play",Oa(null);try{let i=Es.requestPointerLock?.();i&&i.catch&&i.catch(()=>Ts=!0)}catch{Ts=!0}}ge("#start-btn").addEventListener("click",Ba);ge("#retry-btn").addEventListener("click",Ba);ge("#again-btn").addEventListener("click",Ba);var $9=new L;function Th(i,t,e){if(!e.alive||i.action.hits.has(e))return;let n=(t.reach||2.5)*i.scale+(e.scale-1)*.6;if(i.pos.distanceTo(e.pos)>n||i.facingAngleTo(e.pos)>(t.arc||1.3))return;i.action.hits.add(e);let s=e.pos.clone().setY(1.3*e.scale);if(e===ct){if(ct.is("dodge")&&ct.action.t>.03&&ct.action.t<.34){Li("Esquive","soft");return}let l=ct.facingAngleTo(i.pos)<1.4;if(l&&Da<.22){i.play("stagger"),i.posture=0,Nn.emit(s.clone().lerp(i.pos.clone().setY(1.4),.5),70,{color:16765562,speed:9,up:3,intensity:5}),Di=.11,ws=.45,En=.35,Fe=Math.min(100,Fe+20),Li("Parade","gold");return}l&&ct.blocking&&Fe>0?(Fe-=t.heavy?45:22,Ss=.8,Nn.emit(s,30,{color:16760944,speed:6,up:2,intensity:3}),ct.pos.addScaledVector(i.forward,.35),En=.15,Di=.05,Fe<=0?(Fe=0,ct.blocking=!1,ct.play("stagger"),Li("Garde bris\xE9e","red")):ct.hp-=t.dmg*.1):(ct.hp-=t.dmg*(i.kind==="oni"?1.4:1),ct.play("hit"),Nn.emit(s,40,{color:10095122,speed:5,up:2,gravity:10,lifeTime:.7,intensity:2.2}),En=.4,Di=.07),ct.hp<=0&&Na(ct);return}if(t.kick){if(e.hp-=t.dmg,e.posture+=t.posture,e.pos.addScaledVector(e.pos.clone().sub(i.pos).setY(0).normalize(),1.6/e.scale),Nn.emit(s,26,{color:16769200,speed:6,up:2,intensity:3,lifeTime:.3}),Di=.08,En=.25,e.hp<=0)return Na(e);e.posture>=e.maxPosture?(e.posture=0,e.play("stagger"),Li("Posture bris\xE9e","gold")):e.striking||e.play("hit");return}let r=e.is("stagger"),a=t.dmg*(r?2.6:1);if(e.hp-=a,e.posture+=a,Nn.emit(s,r?90:34,{color:10095122,speed:r?8:5,up:2,gravity:10,lifeTime:.8,intensity:2.4}),Nn.emit(s,16,{color:16769200,speed:7,up:1,intensity:4,lifeTime:.25}),Di=t.heavy||r?.1:.055,En=t.heavy||r?.3:.12,r&&(Li("Riposte","red"),ws=.35),e.hp<=0)return Na(e);let o=e.striking;e.posture>=e.maxPosture?(e.posture=0,e.play("stagger"),Li("Posture bris\xE9e","gold")):!r&&!o&&(e.kind==="ronin"||t.heavy)&&e.play("hit")}function Na(i){if(i.alive=!1,i.hp=0,i.play(i===ct?"die":"dying"),i===ct){ws=1.2,En=.4,setTimeout(()=>{Oi="dead",document.exitPointerLock?.(),Oa("#over")},1800);return}Nn.emit(i.pos.clone().setY(1.2*i.scale),120,{color:16734746,speed:3,up:2.5,gravity:-1.5,lifeTime:1.8,intensity:2.5}),Pe.every(t=>!t.alive)&&(ws=.9,Li(i.kind==="oni"?"Oni terrass\xE9":"Vague purifi\xE9e","gold"))}function I1(i){if(Da+=i,!ct.alive){ct.speed=0;return}let t=new L(Math.sin(Fi),0,Math.cos(Fi)),e=new L(-t.z,0,t.x),n=new L;(Ze.has("KeyW")||Ze.has("ArrowUp"))&&n.add(t),(Ze.has("KeyS")||Ze.has("ArrowDown"))&&n.sub(t),(Ze.has("KeyD")||Ze.has("ArrowRight"))&&n.add(e),(Ze.has("KeyA")||Ze.has("ArrowLeft"))&&n.sub(e),n.lengthSq()&&n.normalize(),(dl||Pi("KeyJ"))&&(tn="light",vs=.3),(fl||Pi("KeyK"))&&(tn="heavy",vs=.3),Pi("Space")&&(tn="dodge",vs=.2),(pl||Pi("KeyF"))&&(tn="kick",vs=.3),dl=fl=pl=!1,vs-=i,vs<=0&&(tn=null);let s=Ze.has("ShiftLeft")||Ze.has("ShiftRight")||Ze.has("KeyL");(Pi("ShiftLeft")||Pi("ShiftRight")||Pi("KeyL"))&&(Da=0);let r=ct.action,a=r&&["hit","stagger","die"].includes(r.name),o=!r||r.def.combo!==void 0&&r.t>=r.def.combo||r.name==="parry"&&r.t>.2;if(!a&&tn==="dodge"&&Fe>0&&(!r||r.name!=="dodge")&&(o||r.def.active&&r.t>r.def.active[1])){let l=n.lengthSq()?n.clone():ct.forward.clone().negate();ct.yaw=Math.atan2(l.x,l.z),ct.play("dodge"),Fe-=22,Ss=.6,tn=null}else if(!a&&o&&tn==="kick"&&Fe>0){let l=hl(5.5);l&&(ct.yaw=Math.atan2(l.pos.x-ct.pos.x,l.pos.z-ct.pos.z)),ct.play("kick"),Fe-=Ar.kick.cost,Ss=.6,tn=null,Ii=0}else if(!a&&o&&(tn==="light"||tn==="heavy")&&Fe>0){let l=bs,c;tn==="heavy"?(c="heavy",Ii=0):(l-bh>.8&&(Ii=0),c=["light1","light2","light3"][Ii],Ii=(Ii+1)%3,bh=l);let h=hl(5.5);h?ct.yaw=Math.atan2(h.pos.x-ct.pos.x,h.pos.z-ct.pos.z):n.lengthSq()&&(ct.yaw=Math.atan2(n.x,n.z)),ct.play(c),Fe-=Ar[c].cost,Ss=.6,tn=null}else!a&&Da===0&&(!r||o)&&ct.play("parry");if(ct.blocking=s&&!ct.action&&Fe>0,ct.action){if(ct.speed*=.85,ct.is("dodge")){let l=ct.action.t;ct.pos.addScaledVector(ct.forward,(l<.3?10:3)*i)}}else{let l=ct.blocking?1.8:5.2;if(ct.pos.addScaledVector(n,l*i),ct.speed=n.length()*l,ct.blocking){let c=hl(8);c&&ct.turnTowards(c.pos,10,i)}else if(n.lengthSq()){let c=Math.atan2(n.x,n.z),h=Math.atan2(Math.sin(c-ct.yaw),Math.cos(c-ct.yaw));ct.yaw+=h*Math.min(1,i*12)}}Ss-=i,Ss<=0&&(Fe=Math.min(100,Fe+(ct.blocking?10:30)*i))}function hl(i){let t=null,e=i;for(let n of Pe){if(!n.alive)continue;let s=n.pos.distanceTo(ct.pos);s<e&&(e=s,t=n)}return t}function wh(i){let t=Math.hypot(i.pos.x,i.pos.z);t>ol&&i.pos.multiplyScalar(ol/t)}var Ah=new L(0,4,12),Rh=new L,Ua=null;function L1(i,t){if(Ua){bn.position.copy(Ua[0]),bn.lookAt(Ua[1]);return}if(!ct){let r=performance.now()/1e3*.07;bn.position.set(Math.sin(r)*11,3.2,Math.cos(r)*11),bn.lookAt(0,2.2,-6);return}let e=5.4,n=new L(Math.sin(Fi),0,Math.cos(Fi)),s=ct.pos.clone().addScaledVector(n,-e*Math.cos(Fa)).add(new L(0,1.5+e*Math.sin(Fa),0));Ah.lerp(s,1-Math.exp(-t*10)),Rh.lerp(ct.pos.clone().add(new L(0,1.35,0)).addScaledVector(n,1.2),1-Math.exp(-t*12)),bn.position.copy(Ah),En>0&&(bn.position.x+=(Math.random()-.5)*En*.5,bn.position.y+=(Math.random()-.5)*En*.5),bn.lookAt(Rh)}var D1=new nr,bs=0,Ph=!1;function Ih(){requestAnimationFrame(Ih);let i=Math.min(D1.getDelta(),1/20),t=1;Di>0?(Di-=i,t=.04):ws>0&&(ws-=i,t=.3),En=Math.max(0,En-i*1.6);let e=i*t;bs+=e,Oi==="play"&&ct&&!Ph&&(I1(e),Eh.free=!Pe.some(n=>n.alive&&n.action&&n.action.def.windup),Pe.forEach(n=>Sh(n,ct,Pe,e,Eh)),ct.update(e,bs),Pe.forEach(n=>n.update(e,bs)),ct.striking&&Pe.forEach(n=>Th(ct,ct.action.def,n)),Pe.forEach(n=>{n.striking&&Th(n,n.action.def,ct)}),Pe.forEach(n=>{if(!n.alive)return;let s=ct.pos.clone().sub(n.pos).setY(0),r=s.length(),a=.9*n.scale;r<a&&r>.001&&ct.pos.addScaledVector(s.normalize(),a-r)}),wh(ct),Pe.forEach(wh),Pe=Pe.filter(n=>n.gone?(Nn.emit(n.pos.clone().setY(.4),50,{color:16738858,speed:2,up:2,gravity:-2,lifeTime:1.4,intensity:2}),n.dispose(),!1):!0),!Pe.length&&ct.alive&&(Ms<=0?Xn>=Ni.length?(Oi="win",document.exitPointerLock?.(),Oa("#win")):(Ms=2.6,Xn>0&&Ch(Ni[Xn].title,Ni[Xn].boss?"La lune saigne. Il arrive.":"")):(Ms-=i,Ms<=0&&Xn<Ni.length&&(C1(Xn),Xn++,Ms=0))),P1()),ml-=i,ml<=0&&ge("#banner").classList.remove("show"),gl-=i,gl<=0&&ge("#callout").classList.remove("show"),Nn.update(e),A1.update(e,bs),L1(e,i),Rr.render()}Oa("#title");Ih();window.__game={get player(){return ct},get enemies(){return Pe},get state(){return Oi},start:Ba,setYaw:i=>Fi=i,kill:i=>Na(i),studio(i,t){if(Ua=[new L(...i),new L(...t)],!Ui.getObjectByName("studio")){let e=new tr(16777215,2.2);e.name="studio",Ui.add(e)}ge("#hud").classList.add("hidden"),ge("#banner").classList.add("hidden")},inspect(i,t){Ph=!0,ct.play(i),ct.action.t=0,ct.action.root=null,ct.update(t,bs)}};})();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
