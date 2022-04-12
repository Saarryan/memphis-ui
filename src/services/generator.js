export const generator = () => {
    const string = 'abcdefghijklmnopqrstuvwxyz';
    const numeric = '0123456789';
    const length = 9;
    const formValid = +length > 0;
    if (!formValid) {
        return;
    }
    let character = '';
    let password = '';
    while (password.length < length) {
        const entity1 = Math.ceil(string.length * Math.random() * Math.random());
        const entity2 = Math.ceil(numeric.length * Math.random() * Math.random());
        let hold = string.charAt(entity1);
        character += hold;
        character += numeric.charAt(entity2);
        password = character;
    }
    password = password
        .split('')
        .sort(() => {
            return 0.5 - Math.random();
        })
        .join('');
    return password.substr(0, length);
};
