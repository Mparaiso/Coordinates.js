/**
 * http://en.nicoptere.net/?p=12 & http://nodename.com/blog/2008/09/19/distributing-points-on-the-sphere/
 * @author nicoptere
 * @version 0.1
 */

package com.somerandomdude.coordy.helpers;

import flash.utils.getTimer;

public class Distribute {

	static public var RAND_MAX : Float = 200;
	static public var N : Int = 100;
	static public var Nstep : Int = 1000;
	static public var step : Float = 0.01;
	static public var minimal_step : Float = Float.MIN_VALUE;

	public function Distribute() {
	}

	
	static public function distribute( vertices : Array<Dynamic>,  nstep : Int = 100 ) : Array<Dynamic>
	{
		var gt:Int = getTimer();
		
		N = vertices.length;
		Nstep = nstep;
		
		var f : Array<Dynamic> = new Array<Dynamic>(N);
		var p0 : Array<Dynamic> = new Array<Dynamic>(N);
		var p1 : Array<Dynamic> = new Array<Dynamic>(N);
		var pp0 : Array<Dynamic> = new Array<Dynamic>(N);
		var pp1 : Array<Dynamic> = new Array<Dynamic>(N);
		
		var v : Vertex;
		
		var l : Float;
		var i : Int;
		var k : Int;
		
		for(i in 0...N )
		{
			p0[ i ] = pp0[ i ] = ( vertices[ i ] as Vertex ).clone();
		}
		
		for(i in 0...N ) {
		
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
		
		var e : Float ;
		var e0 : Float = get_coulomb_energy(N, p0);
		var d : Float;
		
		for( k in 0...Nstep ) {
		
			get_forces(N, f, p0);
		
			for(i in 0...N ) {
				
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
				var t : Array<Dynamic> = pp0.concat();
			
				pp0 = pp1.concat();
				pp1 = t.concat();
			
				e0 = e;
				step *= 2;
			}
		}
	
		p0 = pp0.concat();
	
		return p0;
	}

	static public function frand() : Float {
		return ( Math.random() - .5 ) * RAND_MAX;
	}

	static public function dot(v1 : Vertex,v2 : Vertex) : Float {
		return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
	}

	static public function length( v : Vertex ) : Float {
		return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
	}

	static public function length2( v1 : Vertex,v2 : Vertex ) : Float {
		
		var v : Vertex = new Vertex();
		
		v.x = v2.x - v1.x;
		v.y = v2.y - v1.y;
		v.z = v2.z - v1.z;

		return length(v);
	}

	static public function get_coulomb_energy( N : Int, p : Array<Dynamic>) : Float {
		var e : Float = 0;
		
		var i : Int;
		var j : Int;
		for( i in 0...N ) {
			for( j (i+1)...N ) {
				e += 1 / length2(p[ i ], p[ j ]);
			}
		}
		
		return e;
	}

	
	static public function get_forces( N : Int, f : Array<Dynamic>, p : Array<Dynamic> ) : Void {
		
		var i : Int;
		var j : Int;
		
		for( i in 0...N ) {
			
			f[i].x = 0;
			f[i].y = 0;
			f[i].z = 0;
		}
		
		var r : Vertex;
		var l : Float;
		var ff : Float;
		for( i in 0...N ) {
			
			for( j in (i + 1)...N ) {
				
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