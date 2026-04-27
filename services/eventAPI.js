import {days} from '../config.js';

export async function fetchMeetings() {
    const params = new URLSearchParams(
        {
        'date_end>': new Date(Date.now()).toUTCString(),
        'date_start<': new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString(),
        });
    const meetingsResponse = await fetch(`https://api.openf1.org/v1/meetings?${params}`);
    const meetings = await meetingsResponse.json();
    return meetings;
}

export async function fetchSessions(meeting) {
    const params = new URLSearchParams(
        {
        'date_end>': new Date(Date.now()).toUTCString(),
        'date_start<': new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString(),
        location: meeting.location,
        });
    const sessionsResponse = await fetch(`https://api.openf1.org/v1/sessions?${params}`);
    const sessions = await sessionsResponse.json();
    return sessions;
}