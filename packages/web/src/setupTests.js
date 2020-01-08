import '@testing-library/jest-dom/extend-expect';

expect.extend({
    toHaveObfuscatedClass(htmlElement, expectedClassName) {
        const classList = [...htmlElement.classList];
        const classListString = JSON.stringify(classList, null, 2);
        const passed = classList.some(foundClassName => foundClassName.startsWith(`makeStyles-${expectedClassName}`));

        if (passed) {
            return {
                pass: true,
                message: () => `Element${this.isNot ? ' not' : ''} expected to have a class of ${expectedClassName}, found classes: ${classListString}`
            }
        }

        return {
            pass: false,
            message: () => `Element${this.isNot ? ' not' : ''} expected to have a class of ${expectedClassName}, found classes: ${classListString}`
        }
    }
});
