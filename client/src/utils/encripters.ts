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

export { caesarDecipher };