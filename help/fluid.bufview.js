//adapted from warpy2
//canvas setup
mgraphics.init();
mgraphics.relative_coords = 0;
mgraphics.autofill = 0;
var w = box.rect[2] - box.rect[0];
var h = box.rect[3] - box.rect[1];
var vz = 10.;
var nchan = 1;
var bufsize = 1.;
var dsbufamp = [0];
var groups = [0];
var groupscolours = [[0.4,0.4,0.4],[0.5,0.,0.],[0.,0.5,0.],[0.,0.,0.5]];
var ngroup = 1;

function loadbang(){
	bang();
}

function paint(){
	var u,v;
	with (mgraphics) {
		// background
		set_source_rgb(0.1,0.1,0.1);
		rectangle(0,0,w,h);
		fill();
		// wave
		for (v = 1; v <= nchan; v++){
			set_source_rgb(groupscolours[groups[v-1]]);
			for (u = 0; u < w; u++){
				move_to(u,v*h/nchan);
				line_to(u,v*h/nchan - Math.min(dsbufamp[u+(w*(v-1))]*(h/nchan)*vz,h/nchan));
				stroke();
			}
		}
	}
}

function onclick(x, y, button, mod1, shift, caps, opt, mod2){
	var track;
	if (shift){
		track = Math.floor(y*nchan/h);
		if (groups[track]){
			groups[track] = 0;
		} else {
			groups[track] = ngroup;
		}
	}
	bang();
}

function bang()
{
	mgraphics.redraw();
}

function vzoom(x){
	vz = x;
	bang();
}

function getgroups(){
	outlet(0,groups);
}

function nextgroup(x){
	ngroup = Math.max(Math.min(3,Math.floor(x)),1);
}

function setbuffer(buffer){
	var u;

	buf = new Buffer(buffer);
	bufsize = buf.framecount();
	nchan = buf.channelcount();
	groups.length = 0;
	for (u = 0; u < nchan; u++){
		groups.push(0);
	}
	downsamplebuffer();
}

function downsamplebuffer(){
	var u,v,x,bank;
	var samperpix = Math.floor(bufsize/(w-1));
	dsbufamp.length = 0;
	for(x = 1; x <= nchan; x++){
		for(u = 0; u<w; u++){
			var accum = 0;
			bank = buf.peek(x, u*samperpix, samperpix);
			for(v = 0; v<samperpix; v++){
				accum = Math.max(accum, Math.abs(bank[v]));
			}
			dsbufamp.push(accum);
		}}
		bang();
	}

	function onresize(){
		w = box.rect[2] - box.rect[0];
		h = box.rect[3] - box.rect[1];
		downsamplebuffer();
	}