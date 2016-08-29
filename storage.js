/**
 * Wrapper for the sqlite in memory db
 */

var drafts = {
	'test': {
		teams: ['a', 'b', 'c'],
		maps: {
			'dorado': {img: 'url', avail: true},
			'spawn': {img: 'url', avail: true},
			'route66': {img: 'url', avail:true},
		},
		time: 45
	}
};


var teams = {
	a: {
		drafter: true,
		name: "Team A",
		draftId: 'test',
		ready: false,
		bank: 30,
	},
	b: {
		drafter: true,
		name: "Team B",
		draftId: 'test',
		ready: false,
		bank: 30,
	},
	c: {
		drafter: false,
		name: "Obs",
		draftId: 'test',
		ready: true
	}
};


module.exports = {
	getTeamType: getTeamType,
	setTeamReady: setTeamReady,
	allTeamsReady: allTeamsReady,
	getPickOrder: getPickOrder,
	getDraftState: getDraftState,
}


function getTeamType(teamId){
	if (teams[teamId]) {
		if(teams[teamId].drafter) { return 'drafter'; }
		else { return 'obs'; }
	} else {
		return false
	}
}


function setTeamReady(teamId){
	try {
		teams[teamId].ready = true;
		return true
	} catch(err) {
		return false
	}
}


function allTeamsReady(teamId){
	try {
		var draft = drafts[teams[teamId].draftId];
		return draft.teams.every(function(e, i, a){
			return teams[e].ready;
		});
	} catch(err) {
		return false;
	}
}


function getPickOrder(teamId, first=false){
	try {
		var draftId = teams[teamId].draftId;
		if (first) {
			return drafts[draftId].teams[0];
		} else {
			return drafts[draftId].teams;
		}
	} catch(err) {
		return []
	}
}


function getDraftState(teamId) {
	try {
		var draftId = teams[teamId].draftId;
	} catch {
		return false;
	}
	


	
	return drafts[draftId].maps



}

