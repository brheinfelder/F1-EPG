export function toXmltvDate(isoString) {
    return isoString.replace(/[-:T]/g, "").slice(0, 14) + " +0000";
}
