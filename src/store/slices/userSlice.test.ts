import userReducer, { setUserId, clearProfile } from './userSlice';

describe('userSlice', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    test('должен вернуть начальное состояние (initialState)', () => {
        expect(userReducer(undefined, { type: '@@INIT' })).toEqual({
            userId: null,
        });
    });

    test('должен корректно обработать setUserId', () => {
        const previousState = { userId: null };
        const newState = userReducer(previousState, setUserId('12345'));

        expect(newState.userId).toBe('12345');
        expect(localStorage.getItem('userId')).toBe('12345');
    });

    test('должен корректно обработать clearProfile', () => {
        localStorage.setItem('userId', '12345');
        const previousState = { userId: '12345' };
        const newState = userReducer(previousState, clearProfile());

        expect(newState.userId).toBeNull();
        expect(localStorage.getItem('userId')).toBeNull();
    });
});