
var cur_bpm;
var filter_value = 100;


//some overall compression to keep the levels in check
var mstrcomp = new Tone.Compressor({
	"threshold" : -15,
	"ratio" : 1.5,
	"attack" : 0.01,
	"release" : 0.1
});
//give a little boost to the lows
var lowBump = new Tone.Filter(200, "lowshelf");
var limiter = new Tone.Limiter(0);
//route everything through the filter 
//and compressor before going to the speakers
Tone.Master.chain(lowBump, mstrcomp, limiter);
var ping = new Tone.PingPongDelay(.16, 0.2).toMaster();
ping.wet.value = 0.3
var reverb = new Tone.Freeverb().connect(ping);
var dist = new Tone.Distortion(0.8).connect(reverb);
var dist1 = new Tone.Distortion(0.4).toMaster();
dist1.oversample.value = "2x"
var chorus = new Tone.Chorus(4, 2.5, 0.5).connect(dist);
var filter_bass = new Tone.Filter(93.2, "highpass").connect(chorus);
var filter_pad = new Tone.Filter(198, "highpass").connect(reverb);
var filter_lead = new Tone.Filter(1200, "lowpass").connect(chorus);
var filter_noise = new Tone.Filter(1200, "highpass").connect(reverb);


var drummachine = new Tone.MultiPlayer({
	urls : {
		"kick" : "./909kick.wav",
		"snare" : "./909snare.wav",
		"ophat" : "./909ophat.wav",
		"clhat" : "./909clhat.wav",
	},
	volume : -7,
	fadeOut : 0.1,
}).toMaster();

var drummachine1 = new Tone.MultiPlayer({
	urls : {
		"kick" : "./909kick.wav",
		"snare" : "./909snare.wav",
		"ophat" : "./909ophat.wav",
		"clhat" : "./909clhat.wav",
	},
	volume : -7,
	fadeOut : 0.1,
}).connect(dist1);

//the notes
var noteNames = ["kick", "snare", "ophat", "clhat"];


var pad1 = new Tone.FMSynth().connect(filter_pad);
pad1.set({
				volume: -10,
				harmonicity:3,
				modulationIndex:0.67,
				detune:0,
				oscillator:{
					type:"sine"
				},
				envelope:{
					attack:0.00972,
					decay:0.245,
					sustain:0,
					release:0.458
				},
				filterEnvelope:{
					attack:0.0147,
					decay:0.131,
					sustain:0,
					release:0.050,
					min:20,
					max:20,
					exponent:2,
				},
				modulation:{
					type:"triangle"
				},
				modulationEnvelope:{
					attack:0.0257,
					decay:0.6,
					sustain:1,
					release:0.519
				}
			});
pad1.volume.value = -10

var pad2 = new Tone.FMSynth().connect(filter_pad);
pad2.set({
				volume: -10,
				harmonicity:3,
				modulationIndex:0.67,
				detune:0,
				oscillator:{
					type:"sine"
				},
				envelope:{
					attack:0.00972,
					decay:0.245,
					sustain:0,
					release:0.458
				},
				filterEnvelope:{
					attack:0.0147,
					decay:0.131,
					sustain:0,
					release:0.050,
					min:20,
					max:20,
					exponent:2,
				},
				modulation:{
					type:"triangle"
				},
				modulationEnvelope:{
					attack:0.0257,
					decay:0.6,
					sustain:1,
					release:0.519
				}
			});
pad2.volume.value = -10

var pad3 = new Tone.FMSynth().connect(filter_pad);
pad3.set({
				volume: -10,
				harmonicity:3,
				modulationIndex:0.67,
				detune:0,
				oscillator:{
					type:"sine"
				},
				envelope:{
					attack:0.00972,
					decay:0.245,
					sustain:0,
					release:0.458
				},
				filterEnvelope:{
					attack:0.0147,
					decay:0.131,
					sustain:0,
					release:0.050,
					min:20,
					max:20,
					exponent:2,
				},
				modulation:{
					type:"triangle"
				},
				modulationEnvelope:{
					attack:0.0257,
					decay:0.6,
					sustain:1,
					release:0.519
				}
			});
pad3.volume.value = -10

var bass = new Tone.FMSynth().connect(filter_bass);
bass.set({
				volume: -10,
				harmonicity:1,
				modulationIndex:10,
				detune:15,
				oscillator:{
					type:"sine"
				},
				envelope:{
					attack:0.00708,
					decay:1.88,
					sustain:0.3,
					release:4
				},
				filterEnvelope:{
					attack:0.02,
					decay:0.2,
					sustain:1,
					release:0.2,
					min:20,
					max:20,
					exponent:2,
				},
				modulation:{
					type:"sine"
				},
				modulationEnvelope:{
					attack:0.0015,
					decay:15.2,
					sustain:0.2,
					release:4
				}
			});
bass.volume.value = -10

var lead = new Tone.FMSynth().connect(filter_lead);
lead.set({
				volume: -10,
				harmonicity:2,
				modulationIndex:10,
				detune:15,
				oscillator:{
					type:"square"
				},
				envelope:{
					attack:0.009,
					decay:0.7,
					sustain:0,
					release:1.2
				},
				filterEnvelope:{
					attack:0.02,
					decay:0.2,
					sustain:1,
					release:0.2,
					min:20,
					max:20,
					exponent:2,
				},
				modulation:{
					type:"square"
				},
				modulationEnvelope:{
					attack:0.005,
					decay:0.4,
					sustain:0,
					release:1.2
				}
			});
lead.volume.value = -20

var noise = new Tone.NoiseSynth({
	noise : {
		"type":"white"
	}, 
	envelope : {
		"attack":0.0015,
		"decay":0.020,
		"sustain":0
	}
}).connect(filter_noise);
noise.volume.value = -30


/*function Bootup() {
    var x = document.getElementById("myText").value;
    document.getElementById("demo").innerHTML = x;
    input_str = x;
	
	for (var i=0; i <8; i++ ) {
		str_array[i] = input_str.charAt(i);	
		str_ascii[i] = str_array[i].charCodeAt(0);
		if (str_ascii[i].toString(2).length < 7) {
			str_2string[i] = "0"+str_ascii[i].toString(2)+"0";
		}
		else {
		str_2string[i] = str_ascii[i].toString(2)+"0";
		}
		var subarray = new Array(8);
		for (var j=0; j<8; j++) {
			subarray[j] = str_2string[i].charAt(j);
		}
		str_matrix[i] = subarray;
	} 
	for (var i=0; i<8; i++) {
		for (var j=0; j<8; j++) {
			gui_sequencer.matrix[j][i] = str_matrix[i][j]*1;
		}
	}
	gui_sequencer.draw()
	gui_sequencer.sequence(cur_bpm.value*4);
	sequence_data = gui_sequencer.val.list;

}*/



nx.onload = function () {
	
	nx.colorize("#00CCFF"); //setting color setting to default

	

	// Setting BPM selector

	gui_bpm.min = 60;
	gui_bpm.max = 160;
	gui_bpm.set({
		value: 120
	});
	cur_bpm = gui_bpm.val;


	// Setting Sequencer preferences
	
	gui_sequencer.row = 8;
	gui_sequencer.col = 16;
	gui_sequencer.init();

	for (var i=0; i <16; i++ ) {
		for (var j=0; j <8; j++ ) {
			gui_sequencer.matrix[i][j] = 0
		}
	}
	gui_sequencer.draw()

	gui_start.mode = "toggle"
	
	gui_start.on('*', function(data) {
		if (gui_start.val.press === 1) {
			gui_sequencer.sequence(cur_bpm.value*4);
		}
	})
	
	gui_stop.mode = "toggle"
	
	gui_stop.on('*', function(data) {
		if (gui_stop.val.press === 1) {
			gui_sequencer.stop();
		}
	})
	
	gui_sequencer.on('*', function(data) {
		if (gui_sequencer.val.list[0] === 1) {
			drummachine1.start("kick");
		}
		if (gui_sequencer.val.list[1] === 1) {
			drummachine.start("snare");
		}
		if (gui_sequencer.val.list[2] === 1) {
			drummachine.start("ophat");
		}
		if (gui_sequencer.val.list[3] === 1) {
			drummachine.start("clhat");
		}
		if (gui_sequencer.val.list[4] === 1) {
			bass.triggerAttackRelease("A1", "8n");
		}
		if (gui_sequencer.val.list[5] === 1) {
			pad1.triggerAttackRelease("E4", "8n");
			pad2.triggerAttackRelease("A5", "8n");
			pad3.triggerAttackRelease("C5", "8n");
		}
		if (gui_sequencer.val.list[6] === 1) {
			lead.triggerAttackRelease("E4", "8n");
		}
		if (gui_sequencer.val.list[7] === 1) {
			noise.triggerAttackRelease("8n");
		}
	})
	
	gui_position.animate("bounce");
	gui_position.on('*', function(data) {
		filter_value = (gui_position.val.x + gui_position.val.y) * 1000
		filter_pad.frequency.value = filter_value;
		filter_bass.frequency.value = filter_value;
		filter_lead.frequency.value = filter_value;
		//filter_noise.frequency.value = filter_value;
	})

}
