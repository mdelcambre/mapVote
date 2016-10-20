/**
 * Wrapper for the sqlite in memory db
 */

var drafts = {
	'test': {
		teamNAME: ['a', 'b'],
		teamIDs: ['team_a_id', 'team_b_id']
        maps: {
			'dorado': {img: 'url', avail: true},
			'spawn': {img: 'url', avail: true},
			'route66': {img: 'url', avail:true},
		},
        ready: [ false, false]
		time: 45
	}
};


module.exports = {
	getTeamType: getTeamType,
	setTeamReady: setTeamReady,
	allTeamsReady: allTeamsReady,
	getPickOrder: getPickOrder,
	getDraftState: getDraftState,
    getTeamNames: getTeamNames,
}


function getTeamType(draftID, teamID){
	if (drafts[draftID]) {
		if(teamID && drafts.teamIDs.indexOf(teamID) != -1r) {
            return 'drafter';
        } else {
            return 'obs';
        }
	} else {
		return false
	}
}

function getTeamNames(draftID, teamID) {
    try {
        if (!teamID) return drafts[draftID].teamNAME;
        if (drafts[draftID].teamIDs[0] == teamID){
            return drafts[draftID].teamNAME;
        } else if (drafts[draftID].teamIDs[1] == teamID){
            return drafts[draftID].teamNAME.reverse();
        } else {
            return false;
        }
    } catch(err) {
        return false;
    }
}


function setTeamReady(draftID, teamID){
	try {
		drafts[draftID].ready[drafts[draftID].teamIDs.indexOf(teamID)] = true;
		return true
	} catch(err) {
		return false
	}
}


function allTeamsReady(draftID){
	try {
		return drafts[draftID].ready.every(function(e, i, a){
			return e;
		});
	} catch(err) {
		return false;
	}
}


function getPicker(draftID){
	try {
        var draft = drafts[draftID];
        var numVotes = Object.values(draft.maps).reduce(function(prev, el) {
            if (el.avail){
                return prev + 1
            } else {
                return prev
            }
        }, 0);
        return draft.teamIDs[numVotes % 2];
	} catch(err) {
		return false;
	}
}


function getDraftState(draftID) {
	try {
	    return maps: drafts[draftID].maps
	} catch {
		return false;
	}
}

