export const getAlphabets = (count: number): string[] => {
    if (count <= 0 || count > 26) {
        return [];
    }

    let result = '';
    const startCharCode = 'A'.charCodeAt(0);

    for (let i = 0; i < count; i++) {
        const currentChar = String.fromCharCode(startCharCode + i);
        result += currentChar;
    }

    return result.split('');
};
