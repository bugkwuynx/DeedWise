export const camelToSnake = ( str: string ): string => {
    return str.replace( /[A-Z]/g, letter => `_${ letter.toLowerCase() }` );
};
