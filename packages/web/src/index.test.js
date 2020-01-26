describe('index', () => {
    beforeEach(() => {
        const root = document.createElement('div');
        root.id = 'root';
        document.body.appendChild(root);
    });

    test('should render the application', () => {
        require('./index');
    });
});
