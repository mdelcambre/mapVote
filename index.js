var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var storage = require('./storage.js');


app.get('/', function(req, res){
	  res.sendFile(__dirname + '/html/index.html');
});

app.get('/draft/:teamId/:teamName', handleDraft);
app.get('/draft/:teamId', handleDraft);

function handleDraft(req, res){
	var teamId = req.params.teamId
	drafterType = storage.getTeamType(teamId);
	if (drafterType == 'drafter' || drafterType == 'obs'){
		res.sendFile(__dirname + '/html/draft.html');
	} else {
		res.sendFile(__dirname + '/html/index.html');
	}
}


io.on('connection', function(socket){

	socket.on('join', function(teamId) {
		console.log(teamId);
		socket.room = teamId;
		socket.join(teamId);
		socket.emit('joined', storage.getDraftState(teamId);
	}); //on join


	var updateClients(msg, teamId){
		var teamIDs = storage.getPickOrder(teamId);
		var state = storage.getDraftState(teamId);
		teamIDs.forEach(function(el, ind, arr){
			if (ind == 0){
				io.in(el).emit(msg, 'go', state);
			} else {
				io.in(el).emit(msg, 'wait', state);
			}
		});
	} // updateClients

	socket.on('ready', function(){
		console.log
		if (storage.getTeamType(socket.room) != 'drafter') return false;
		storage.setTeamReady(socket.room);
		socket.emit('readied');
		if (storage.allTeamsReady(socket.room)){
			console.log("All Teams Ready")
			updateClients('start', socket.room);
		}
	}); // on ready


	socket.on('ban', function(ban){
		console.log('ban on ' + ban)
		var picker = storage.getPickOrder(teamId, first=true);
		if (picker != socket.room) return false;
		storage

	}); //on ban


})

http.listen(8080, function(){
	  console.log('listening on *:8080');
});
