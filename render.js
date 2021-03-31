function Vec (x,y,z) {
  return new V(x,y,z);
  
} 
		function V (x,y,z) {
      this.x=x; this.y=y; this.z=z;
}
		V.add = function(a,b){
      return Vec(a.x+b.x, a.y+b.y, a.z+b.z); //overriding operators is not possible in JavaScript.
}   
		V.sub = function(a,b){
      return Vec(a.x-b.x, a.y-b.y, a.z-b.z);
}
		V.mud = function(a,b){
      return Vec(a.x*b, a.y*b, a.z*b);
}
		V.prototype.mult = function(b){
      return Vec(this.x*b.x,this.y*b.y,this.z*b.z);
}
		V.prototype.norm = function(){
      var t=this; var il=1/Math.sqrt(t.x*t.x+t.y*t.y+t.z*t.z); t.x*=il; t.y*=il; t.z*=il; return t;
}
		V.prototype.dot  = function(b){
      return this.x*b.x+this.y*b.y+this.z*b.z;
}
		V.crs = function(a,b){
      return Vec(a.y*b.z-a.z*b.y, a.z*b.x-a.x*b.z, a.x*b.y-a.y*b.x);
}
		function Ray (o,d) {
      return new R_(o,d);
} 
    function R_(o,d){
      this.o=o; this.d=d;
}
		var DIFF=0,SPEC=1,REFR=2;	// material types, used in intersection()
		
    function Sphere(rad,p,e,c,refl){ //sphere function
      return new S(rad,p,e,c,refl);
}
		function S (rad,p,e,c,refl){
			this.rad=rad;						  // radius
			this.radSq=rad*rad;
			this.eMax=Math.max(e.x,Math.max(e.y,e.z));
			this.p=p; this.e=e; this.c=c;		  // position, emission, color
			this.refl=refl;						// reflection type (DIFFuse, SPECular, REFRactive)
}
		S.prototype.intersect = function(r){  // returns distance, 0 if there is no hit
			var op=V.sub(this.p,r.o);			  // Solve t^2*d.d + 2*t*(o-p).d + (o-p).(o-p)-R^2 = 0
			var t, eps=1e-4, b=op.dot(r.d), det=b*b-op.dot(op)+this.radSq;
			if (det<0) return 0; else det=Math.sqrt(det);
			return (t=b-det)>eps ? t : ((t=b+det)>eps ? t : 0);
}
	var cornell_box = [ 
			    //radius,     position,        emission,      color,     material
      Sphere(1e5, Vec( 1e5+1,40.8,81.6), Vec(0,0,0),Vec(235, 9, 9),DIFF),//Left
			Sphere(1e5, Vec(-1e5+99,40.8,81.6),Vec(0,0,0),Vec(19, 214, 42),DIFF),//Rght
			Sphere(1e5, Vec(50,40.8, 1e5),	 Vec(0,0,0),Vec(.75,.75,.75),DIFF),//Back
			Sphere(1e5, Vec(50,40.8,-1e5+170), Vec(0,0,0),Vec(0,0,0),	  DIFF),//Frnt
			Sphere(1e5, Vec(50, 1e5, 81.6),	Vec(0,0,0),Vec(.75,.75,.75),DIFF),//Botm
			Sphere(1e5, Vec(50,-1e5+82,81.6),Vec(0, 0, 0),Vec(217, 204, 204),DIFF),//Top
			Sphere(16.5,Vec(73,16.5,78),Vec(0,0,0),Vec(.99,.99,.99),SPEC),//Mirror
			Sphere(16.5,Vec(35,16.5,47),Vec(0,0,0),Vec(14, 50, 232),DIFF), //blue
			Sphere(9, Vec(50,9,120), Vec(10,10,10),  Vec(0,0,0), DIFF), //light
			Sphere(12, Vec(15,12,100),Vec(0,0,0),Vec(225, 232, 14), DIFF)//yellow 
      ];
	 var Cen=Vec(50,-20,-860);
		
	 var rainbow_spheres = [
     //Scene: radius, position, emission, color, material
		  Sphere(9, Vec(100 ,9,70), Vec(0,0,0), Vec(11, 142, 230), SPEC),
		  Sphere(20, Vec(130,21,50), Vec(0,0,0), Vec(17, 230, 237), DIFF),
      Sphere(50, Vec(120,170,0), Vec(10,10,10), Vec(0,0,0), DIFF),
      Sphere(30, Vec(0,33,-45), Vec(0,0,0), Vec(219,161,26), DIFF),
      Sphere(50, Vec(80,170,0), Vec(10,10,10), Vec(0,0,0), DIFF),
      Sphere(1e5, Vec(80,-1e5,0), Vec(0,0,0), Vec(.7,.7,.7), DIFF), //plane (giant sphere)
      Sphere(15, Vec(-40,15,0), Vec(0,0,0), Vec(.1,.1,1), DIFF),
		  Sphere(10, Vec(40 ,10,0), Vec(0,0,0), Vec(1,.1,.1), DIFF),
		  Sphere(17, Vec(108,18,-18), Vec(0,0,0), Vec(.1,1,.1), DIFF),
		  Sphere(10, Vec(10,10,70), Vec(0,0,0), Vec(.9,.9,.9), REFR),
      Sphere(15, Vec(70,16,0), Vec(0,0,0), Vec(171, 17, 237), SPEC)
         
    ];

		var R=60, T=30*Math.PI/180., D=R/Math.cos(T), Z=60;
		var R=120, T=30*Math.PI/180., D=R/Math.cos(T), Z=62;
		var C=Vec(0.275, 0.612, 0.949);
		var tc = Vec(0.0588, 0.361, 0.0941);
		var sc = Vec(.7,.7,.7);
		
		var color_balls = [//Scene: radius, position, emission, color, material
		  Sphere(50, Vec(80,100,0), Vec(2,2,2), Vec(0,0,0), DIFF),
		  Sphere(1e5, Vec(80,-1e5,0), Vec(0,0,0), Vec(.7,.7,.7), DIFF),
		  Sphere(10, Vec(-20,10,0), Vec(0,0,0), Vec(.1,.1,1), DIFF),
		  Sphere(10, Vec(10 ,10,0), Vec(2,2,2), Vec(0,0,0), DIFF),
		  Sphere(10, Vec(40 ,10,0), Vec(0,0,0), Vec(1,.1,.1), DIFF),
		  Sphere(10, Vec(70 ,10,0), Vec(2,2,2), Vec(0,0,0), DIFF),
		  Sphere(10, Vec(100,10,0), Vec(0,0,0), Vec(.1,1,.1), DIFF),
		  Sphere(10, Vec(130,10,0), Vec(2,2,2), Vec(0,0,0), DIFF),
		  Sphere(10, Vec(10,10,70), Vec(0,0,0), Vec(.9,.9,.9), REFR),
		];

		
		var table = [//Scene: radius, position, emission, color, material
		  Sphere(150, Vec(-700, 1300, 1000), Vec(70,70,70), Vec(0,0,0), DIFF),	// light
		  Sphere(200, Vec( 1500, 1000, 1000), Vec(20,20,30), Vec(0,0,0), DIFF),	// light
		  Sphere(4, Vec( -10, 60, -20), Vec(50,50,50), Vec(0,0,0), DIFF),	// light
		  Sphere(1e5, Vec(80,-1e5,0), Vec(0,0,0), Vec(.8,.8,.8), DIFF),
		  Sphere(1e5, Vec(2000,0, -1e5-30), Vec(0,0,0), Vec(.8,.8,.8), DIFF),
		  Sphere(20, Vec(50 ,20,0), Vec(0,0,0), Vec(.8,.4,.1), DIFF),
		  Sphere(10, Vec(-20,25,0), Vec(0,0,0), Vec(.1,1,.1), REFR),
		  Sphere(10, Vec( 10,10,0), Vec(0,0,0), Vec(.1,.1,1), REFR),
		  Sphere(7 , Vec(130,10,0), Vec(0,0,0), Vec(1,.1,.1), REFR),
		  Sphere(15, Vec(100,15,-20), Vec(0,0,0), Vec(.8,.8,.8), SPEC)
		];
		
		var stack = [//Scene: radius, position, emission,    color,   material
		  Sphere(150, Vec(-700, 1300, 1000), Vec(70,70,70), Vec(0,0,0), DIFF),	
		  Sphere(50, Vec( 300, 100, 50), Vec(8,10,14), Vec(0,0,0), DIFF),	
		  Sphere(3, Vec(50,104,0), Vec(50,50,50), Vec(0,0,0), DIFF),	
		  Sphere(1e5, Vec(80,-1e5,0), Vec(0,0,0), Vec(.8,.8,.8), DIFF),
		  Sphere(1e5, Vec(80,0, -1e5-30), Vec(0,0,0), Vec(.8,.8,.8), DIFF),
		  Sphere(20, Vec(50,20,0), Vec(0,0,0), Vec(.8,.4,.1), DIFF),
		  Sphere(5, Vec(50,75,0), Vec(0,0,0), Vec(.1,1,.1), REFR),
		  Sphere(5, Vec(50,85,0), Vec(0,0,0), Vec(.1,.1,1), REFR),
		  Sphere(5, Vec(50,95,0), Vec(0,0,0), Vec(1,.1,.1), REFR),
		  Sphere(15, Vec(50,55,0), Vec(0,0,0), Vec(.8,.8,.8), SPEC)
		  
    ];
		
		var snames = ["Rainbow Spheres", "Color Balls", "Stack", "Table", "Cornell Box"];
		var scenes = [rainbow_spheres, color_balls, stack, table, cornell_box];
		var spheres = scenes[0];
    var planes = scenes[0]; //plane boii
		
		function clamp(x){ 
      return x<0 ? 0 : x>1 ? 1 : x; 
}
		
    function toInt(x){ //change math.pow for cool effects
      return Math.floor(Math.pow(clamp(x),1/2.2)*255+.5); //pow() means x^y exponent 
}
		
    function intersect(r,isc){
			nrays++;
			var n=spheres.length, d, inf=1e20; isc.t=1e20;
			for(var i=n;i--;) if((d=spheres[i].intersect(r))&&d<isc.t){
        isc.t=d;isc.id=i;
       }
			return isc.t<inf;
}

		function intersection(r, depth, E){  
			if(E==null) E=1;
			var isc = {t:0, id:0};					// distance to intersection 
			if (!intersect(r, isc)) return Vec(0,0,0);	// if miss, return black
			var id=isc.id, t=isc.t, obj=spheres[id];	// the hit object, must add planes too 
			var x=V.add(r.o,V.mud(r.d,t)), n=V.sub(x,obj.p).norm(), nl=n.dot(r.d)<0?n:V.mud(n,-1), f=obj.c;
			var p = f.x>f.y && f.x>f.z ? f.x : f.y>f.z ? f.y : f.z;			 // max refl
			if (++depth>0||!p) if (Math.random()<p && depth<200) f=V.mud(f,(1/p)); else return V.mud(obj.e,E); //R.R.
			if (obj.refl == DIFF){                  // Ideal DIFFUSE reflection
				var r1=2*Math.PI*Math.random(), r2=Math.random(), r2s=Math.sqrt(r2); 
				var w=nl, u=V.crs((Math.abs(w.x)>.1?new V(0,1,0):new V(1,0,0)),w).norm(), v=V.crs(w,u);
				var d = V.add(V.mud(u,Math.cos(r1)*r2s), V.add(V.mud(v,Math.sin(r1)*r2s), V.mud(w,Math.sqrt(1-r2)))).norm();
				
				// Loop over any lights
				var e = Vec(0,0,0);
				for (var i=0; i<spheres.length; i++){
					var s = spheres[i];
					if (s.eMax<=0) continue; // skip non-lights
				  
					var sw=V.sub(s.p,x), su=V.crs((Math.abs(sw.x)>.1?new V(0,1,0):new V(1,0,0)),sw).norm(), sv=V.crs(sw,su);
					var cos_a_max = Math.sqrt(1-s.radSq/sw.dot(sw)); //uses this intersection 
					var eps1 = Math.random(), eps2 = Math.random();
					var cos_a = 1-eps1+eps1*cos_a_max;
					var sin_a = Math.sqrt(1-cos_a*cos_a);
					var phi = 2*Math.PI*eps2;
					var l = V.add(V.add(V.mud(su,Math.cos(phi)*sin_a), V.mud(sv,Math.sin(phi)*sin_a)), V.mud(sw,cos_a));
					l.norm();
					//if(l.dot(nl)<=0)continue;
					if (intersect(Ray(x,l), isc) && isc.id==i){  // shadow ray
						var omega = 2*Math.PI*(1-cos_a_max);                    //sphere - ray intersection i think               
						e = V.add(e, f.mult(V.mud(s.e,l.dot(nl)*omega*(1/Math.PI))));
					}
				}
				
				return V.add(V.add(V.mud(obj.e,E),e),f.mult(intersection(Ray(x,d),depth,0)));
			}
      else if (obj.refl == SPEC)				  // Ideal SPECULAR reflection.
			return V.add(obj.e, f.mult(intersection(Ray(x,V.sub(r.d,V.mud(n,2*n.dot(r.d)))),depth)));
			var reflRay = Ray(x,V.sub(r.d,V.mud(n,2*n.dot(r.d))));
			var into = n.dot(nl)>0;
			var nc=1, nt=1.5, nnt=into?nc/nt:nt/nc, ddn=r.d.dot(nl), cos2t;
			if ((cos2t=1-nnt*nnt*(1-ddn*ddn))<0)		  // Total internal reflection.
				return V.add(obj.e, f.mult(intersection(reflRay,depth)));
			var tdir = V.sub(V.mud(r.d,nnt), V.mud(n,(into?1:-1)*(ddn*nnt+Math.sqrt(cos2t)))).norm();
			var a=nt-nc, b=nt+nc, R0=a*a/(b*b), c = 1-(into?-ddn:tdir.dot(n));
			var Re=R0+(1-R0)*c*c*c*c*c,Tr=1-Re,P=.25+.5*Re,RP=Re/P,TP=Tr/(1-P);
			return V.add(obj.e, f.mult((depth>2 ? (Math.random()<P ?  
				V.mud(intersection(reflRay,depth),RP):V.mud(intersection(Ray(x,tdir),depth),TP)) :
				V.add(V.mud(intersection(reflRay,depth),Re),V.mud(intersection(Ray(x,tdir),depth),Tr)))));
} //ray intersection with everything ends here.
		
    
    function iterate(){
			if(cline==h) {cline=0; niter++;}
			var samps=1;
			var cam = Ray(Vec(50,52,295.6), Vec(0,-0.042612,-1).norm()); // cam pos, dir 
			var cx=Vec(w*.5135/h,0,0), cy=V.mud(V.crs(cx,cam.d).norm(),.5135), r=Vec(0,0,0);	
			for (var y=cline; y<Math.min(cline+ssize,h); y++){  // Loop over image rows
                for (var x=0; x<w; x++){   // Loop cols
					var i=y*w+x;
                    for (var sy=0; sy<2; sy++)      // 2x2 subpixel rows
                        for (var sx=0; sx<2; sx++, r=Vec(0,0,0)){  // 2x2 subpixel cols
                            for (var s=0; s<samps; s++){
                                var r1=2*Math.random(), dx=r1<1 ? Math.sqrt(r1)-1: 1-Math.sqrt(2-r1);
                                var r2=2*Math.random(), dy=r2<1 ? Math.sqrt(r2)-1: 1-Math.sqrt(2-r2);
                                var d = V.add(V.mud(cx,( ( (sx+.5 + dx)/2 + x)/w - .5)) ,
                                        V.add(V.mud(cy,( ( (sy+.5 + dy)/2 + (h-y-1))/h - .5)), cam.d));
                                r = V.add(r, V.mud(intersection(Ray(V.add(cam.o, V.mud(d, 140)), d.norm()), 0, 1),0.25/samps));
                            }
                            c[3*i]+=r.x; c[3*i+1]+=r.y; c[3*i+2]+=r.z;
                        }
				}
    }
			
      cline=Math.min(cline+ssize,h);
}
		
		window.requestAnimFrame = (function(){
		  return  window.requestAnimationFrame       ||
				  window.webkitRequestAnimationFrame ||
				  window.mozRequestAnimationFrame    ||
				  function( callback ){
					window.setTimeout(callback, 1000 / 60);
				  };
		})();
			
		var w=512, h=384, c, niter=0, nrays=0, cline=0, ssize=16;
		var cnv, ctx, tf, buff, imgd;
		function go(){
			cnv = document.getElementById("c");
			ctx = cnv.getContext("2d");
			
			rebuild();

			var ress = document.getElementById("ress");
			for(var i=0; i<6; i++){
				var b = document.createElement("input");
				b.type = "button";
				b.value = 64*Math.pow(2,i)+" x "+48*Math.pow(2,i);
				ress.appendChild(b);  b.i=i;
				b.addEventListener("click", changeRes);
			}
			
			var scns = document.getElementById("scns");
			for(var i=0; i<scenes.length; i++){
				var b = document.createElement("input");
				b.type = "button";
				b.value = snames[i];
				scns.appendChild(b);  b.i=i;
				b.addEventListener("click", changeScene);
			}
			
			var stat = document.getElementById("stat");
			
			tf = document.createElement("span");
			stat.appendChild(tf);
			
			
		 requestAnimFrame(onEF);
		}
		
		function rebuild(){
			c = new Float32Array(3*w*h);
			buff = new Uint8Array(4*w*h);
			niter = 1;  nrays = 0;  cline = 0;
			cnv.width = w; cnv.height = h;
			imgd = ctx.getImageData(0,0,w,ssize);
		}

		function changeRes(e){
			w = 64*Math.pow(2,e.target.i); h = 48*Math.pow(2,e.target.i);
			ssize = Math.min(32, 8192/w);
			rebuild();
		}
		
		function changeScene(e){
			spheres = scenes[e.target.i];
			planes = scenes[e.target.i];
      rebuild();
		}
		
		function onEF(e){
			var time = new Date().getTime();
			iterate();
			var done = (new Date().getTime()-time);
			var iit=1/niter;
			var f = imgd.data;
			for(var i=(cline-ssize)*w, j=0; i<cline*w; i++){
				f[j++]=toInt(clamp(c[i*3]*iit)); f[j++]=toInt(clamp(c[i*3+1]*iit)); f[j++]=toInt(clamp(c[i*3+2]*iit)); f[j++]=255;
			}
			ctx.putImageData(imgd, 0, cline-ssize);
			tf.innerHTML = "Samples: "+niter+", sample-segment Render time: "+(""+(done/1000)).substring(0,4)+", rays: "+nrays + " - ";
			requestAnimFrame(onEF);
		
/////////////////////////////////////////////////////////////////////////////////////    
/////////////////////////////////////////////////////////////////////////////////////    
    //working on plane and ray - plane intersection 
    function Plane(w,h,d,p,e,c,refl) { // i will add x y and z planes once i get this (z plane i think it would be) working
      return new P(w,h,d,p,e,c,refl);//p = position
}                       
    
    function P (w,h,d,p,e,c,refl){ //i will deal with changing this to plane later
			this.rad=rad;						  // radius     
			this.radSq=rad*rad; 
			this.eMax=Math.max(e.x,Math.max(e.y,e.z));
			this.p=p; this.e=e; this.c=c;		  // position, emission, color
			this.refl=refl;						// reflection type (DIFFuse, SPECular, REFRactive)
}
		S.prototype.intersect = function(r){  // returns distance, 0 if there is no hit
			var op=V.sub(this.p,r.o);			  // Solve t^2*d.d + 2*t*(o-p).d + (o-p).(o-p)-R^2 = 0
			var t, eps=1e-4, b=op.dot(r.d), det=b*b-op.dot(op)+this.radSq; //change every rad or radius to plane
			if (det<0) return 0; else det=Math.sqrt(det);
			return (t=b-det)>eps ? t : ((t=b+det)>eps ? t : 0);
}
      function intersect(r,isc){
			  nrays++;
			  var n=planes.length, d, inf=1e20; isc.t=1e20;
			    for(var i=n;i--;) if((d=planes[i].intersect(r))&&d<isc.t){
          isc.t=d;isc.id=i;
       }
		return isc.t<inf;
}



}; // end main func.

