import { ClientFunction } from 'testcafe';
export const setLocalStore = ClientFunction((mockedData) => {
    localStorage.setItem('notes', JSON.stringify(mockedData));
});