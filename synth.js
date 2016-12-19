

var filter_bass = new Tone.Filter(700, "lowpass").toMaster();
var filter_pad = new Tone.Filter(1500, "highshelf").toMaster();
var filter_noise = new Tone.Filter(1500, "highpass").toMaster();
var ping = new Tone.PingPongDelay(.16, 0.2).toMaster();

var drummachine = new Tone.MultiPlayer({
	urls : {
		"kick" : "./909kick.wav",
		"snare" : "./909snare.wav",
		"ophat" : "./909ophat.wav",
		"clhat" : "./909clhat.wav",
	},
	volume : -10,
	fadeOut : 0.1,
}).toMaster();

//the notes
var noteNames = ["kick", "snare", "ophat", "clhat"];

var bass = new Tone.PolySynth(20, Tone.Synth).connect(filter_bass);

bass.triggerAttackRelease("C4", "8n");

/*bass.set({
				volume: -35,
				oscillator:{
					type:"square"
				},
				filter:{
					Q:3,
					type:"allpass",
					rolloff:-24
				},
				envelope:{
					attack:0.3,
					decay:0,
					sustain:1,
					release:0.3
				},
				filterEnvelope:{
					attack:0.2,
					decay:0,
					sustain:1,
					release:0.2,
					min:20,
					max:20,
					exponent:2,
				}
			});*/
/*var pad = new Tone.PolySynth(20, Tone.MonoSynth).connect(filter_pad);
var lead = new Tone.PolySynth(20, Tone.MonoSynth).connect(filter_lead);
var noise = new Tone.NoiseSynth({
	noise : {
		"type":"brown"
	}, 
	envelope : {
		"attack":0.005,
		"decay":0.1,
		"sustain":0
	}
}).connect(filter_noise);*/

var seq = new Tone.Sequence(function)
var loop = new Tone.Sequence(function(time, col){
	var column = gui_sequencer.val.list;
	for (var i = 0; i < 8; i++){
		if (column[i] === 1){
			//slightly randomized velocities
			var vel = Math.random() * 0.5 + 0.5;
			keys.start(noteNames[i], time, 0, "8n", 0, vel);
		}
	}
}, [0, 1, 2, 3, 4, 5, 6, 7], "8n");

Tone.Transport.start();

//Tone.Transport.bpm.value = cur_bpm.value;
