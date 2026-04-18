import { create } from "xmlbuilder2";
import { fetchMeetings, fetchSessions } from "./eventAPI.js";
import { toXmltvDate } from "../helpers/timeHelpers.js";
import { gameThumbs } from "../config.js";

export async function buildxml(seriestype) {
    let title, subtitle;

    const tv = create({ version: '1.0', encoding: 'UTF-8' }).ele('tv');

    tv.ele('channel', { id: 'f1' })
        .ele('display-name').txt('Formula 1').up()
        .ele('icon', { src: 'https://www.formula1.com/assets/home/_next/static/media/f1-logo-180.1db9e85b.png' }).up()
    .up();

    const meetings = await fetchMeetings();

    for (const meeting of meetings) {
        const sessions = await fetchSessions(meeting);
        for (const session of sessions) {
            if (session.is_cancelled) continue;
            const airDate = session.date_start.slice(0, 16).replace('T', ' ');
            switch (seriestype) {
                case "all":
                    title = "Formula 1";
                    subtitle = `${meeting.meeting_name} ${session.session_name}`;
                    break;
                case "weekend":
                    title = `${meeting.year} ${meeting.meeting_name}`;
                    subtitle = `${session.session_name}`;
                    break;
                case "type":
                    title = `Formula 1 ${session.session_type}`;
                    subtitle = `${meeting.meeting_name} ${session.session_name}`;
                    break;
                case "season":
                default:
                    title = `Formula 1 ${meeting.year}`;
                    subtitle = `${meeting.meeting_name} ${session.session_name}`
                    break;
        }

            const prog = tv.ele('programme', { start: toXmltvDate(session.date_start), stop: toXmltvDate(session.date_end), channel: 'f1' })
                .ele('title').txt(`${title}`).up()
                .ele('sub-title').txt(`${subtitle}`).up()
                .ele('desc').txt(`${session.year} ${meeting.meeting_name} ${session.session_name}`).up();
                if (gameThumbs) {
                    const params = new URLSearchParams({
                        title: meeting.meeting_name,
                        subtitle: session.session_name,
                        iconurl: `https://media.formula1.com/image/upload/c_fit,h_704/q_auto/v1740000001/common/f1/2026/track/2026track${meeting.circuit_short_name.toLowerCase()}detailed.png`
                    })
                    prog.ele('icon', { src: `${gameThumbs}?${params}` }).up()
                }
                prog.ele('episode-num', { system: 'original-air-date' }).txt(`${airDate}`).up()
            prog.up();
        }
    }

    const xml = tv.doc().end({ prettyPrint: true });
    return xml;
}