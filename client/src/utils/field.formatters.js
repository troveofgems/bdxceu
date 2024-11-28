export function getLastFourCharacters(id) {
    const lastFour = id.slice(-4);
    return `...${lastFour}`;
}

export const formattedList = (list) => list.map((item, index) =>
    index === list.length - 1 ? item : `${item}, `
);

export function formatDate(isoString) {
    // Parse the ISO string
    const date = new Date(isoString);

    // Get date components
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthAbbrev = monthNames[date.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    const hour = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Construct the final string
    return `${monthAbbrev} ${day} ${year}, ${hour}:${minutes}:${seconds}`;
}