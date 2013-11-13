

module coordinate.helpers
{
	import utils =  flash.utils ;

	export class Distribute {

		static  RAND_MAX : Number = 200;
		static  N : int = 100;
		static  Nstep : int = 1000;
		static  step : Number = 0.01;
		static  minimal_step : Number = Number.MIN_VALUE;

		 Distribute() {
		}

		
		static  distribute( vertices : Array,  nstep : int = 100 ) : Array 
		{
			var gt:int = utils.getTimer();
			
			N = vertices.length;
			Nstep = nstep;
		  
			var f : Array = new Array(N);
			var p0 : Array = new Array(N);
			var p1 : Array = new Array(N);			
			var pp0 : Array = new Array(N);
			var pp1 : Array = new Array(N);
			
			var v : Vertex;
		  
			var l : Number;
			var i : Number;
			var k : Number;
		  
			for(i = 0;i < N; i++ ) 
			{
				p0[ i ] = pp0[ i ] = ( vertices[ i ] as Vertex ).clone();
			}
		  
			for(i = 0;i < N; i++ ) {
			
				f[ i ] = new Vertex();
				p1[ i ] = pp1[ i ] = new Vertex();
			
				
				v = p0[ i ];
			
				l = length(p0[i]);
				if( l != 0 ) {
				
					v.x /= l;
					v.y /= l;
					v.z /= l;
					
				}else {
					i--;
				}
			}
			 
			var e : Number ;
			var e0 : Number = get_coulomb_energy(N, p0);
			var d : Number;
		  
			for( k = 0;k < Nstep; k++ ) {
			
				get_forces(N, f, p0);
			
				for(i = 0;i < N;i++) {
					
					d=f[i].x * pp0[i].x + f[i].y * pp0[i].y + f[i].z * pp0[i].z;
				
					f[i].x -= pp0[i].x * d;
					f[i].y -= pp0[i].y * d;
					f[i].z -= pp0[i].z * d;
				
					pp1[i].x = pp0[i].x + f[i].x * step;
					pp1[i].y = pp0[i].y + f[i].y * step;
					pp1[i].z = pp0[i].z + f[i].z * step;
				
					l=Math.sqrt(pp1[i].x * pp1[i].x + pp1[i].y * pp1[i].y + pp1[i].z * pp1[i].z);
				
					pp1[i].x /= l;
					pp1[i].y /= l;
					pp1[i].z /= l;
					
				}
			
				e = get_coulomb_energy(N, pp1);
			
				if(e >= e0) { 
				
					// not successfull step
					step /= 2;
					if(step < minimal_step) {
						break;
					}
				
					continue;
				} 
				else 
				{   
					// successfull step
					var t : Array = pp0.concat();
				
					pp0 = pp1.concat(); 
					pp1 = t.concat();
				
					e0 = e;
					step *= 2;
				} 
			}
		
			p0 = pp0.concat();
		
			return p0;
		}

		static  frand() : Number {
			return ( Math.random() - .5 ) * RAND_MAX;
		}

		static  dot(v1 : Vertex,v2 : Vertex) : Number { 
			return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
		}

		static  length( v : Vertex ) : Number {
			return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z); 
		}

		static  length2( v1 : Vertex,v2 : Vertex ) : Number {
		  
			var v : Vertex = new Vertex();
		  
			v.x = v2.x - v1.x; 
			v.y = v2.y - v1.y; 
			v.z = v2.z - v1.z;

			return length(v);
		}

		static  get_coulomb_energy( N : Number, p : Array) : Number {
			var e : Number = 0;
			
			var i : Number;
			var j : Number;
			for( i = 0;i < N; i++ ) {
				for( j = i + 1;j < N; j++ ) {
					e += 1 / length2(p[ i ], p[ j ]);
				}
			}
			
			return e;
		}

		
		static  get_forces( N : Number, f : Array, p : Array ) : void {
			
			var i : Number;
			var j : Number;
			
			for( i = 0;i < N; i++ ) {
				
				f[i].x = 0;
				f[i].y = 0;
				f[i].z = 0;
			}
			
			var r : Vertex;
			var l : Number;
			var ff : Number;
			for( i = 0;i < N; i++ ) {
				
				for( j = i + 1;j < N; j++ ) {
					
					r = new Vertex(p[i].x - p[j].x, p[i].y - p[j].y, p[i].z - p[j].z);
					l = Math.sqrt(r.x * r.x + r.y * r.y + r.z * r.z); 
					l = 1 / ( l * l * l );
					
					ff = l * r.x; 
					f[i].x += ff; 
					f[j].x -= ff;
					
					ff = l * r.y; 
					f[i].y += ff; 
					f[j].y -= ff;
					
					ff = l * r.z; 
					f[i].z += ff; 
					f[j].z -= ff;
				}
			}
		}
	}
}