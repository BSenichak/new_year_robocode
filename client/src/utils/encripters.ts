function caesarDecipher(text: string, shift: number) {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const len = chars.length;
    const effectiveShift = shift % len;

    return text
        .split("")
        .map(char => {
            const index = chars.indexOf(char);
            if (index === -1) return char;
            return chars[(index - effectiveShift + len) % len];
        })
        .join("");
}


function getDateKey() {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const hour = now.getHours();

    return day + month + year + hour;
}

export { caesarDecipher, getDateKey };