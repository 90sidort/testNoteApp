import { Selector } from 'testcafe';
import {
    singleHomeMock,
    singleOtherMock,
    singleWorkMock,
    singleAllMock,
    filteringSetMock
}
from './mocks';
// This file contains all test data such as mocks, selectors, urls, text etc. 

// Mocks:
export const singleHome = singleHomeMock;
export const singleWork = singleWorkMock;
export const singleOther = singleOtherMock;
export const singleAll = singleAllMock;
export const filteringSet = filteringSetMock;

// Selectors:
export const filterInput = Selector('input[data-test="notesApp_filterInput"]');
export const filterSelect = Selector('select[data-test="notesApp_filterSelect"]');
export const optionEdited = Selector('option[data-test="notesApp_filterSelect_edited"]');
export const optionCreated = Selector('option[data-test="notesApp_filterSelect_created"]');
export const optionAlphabetical = Selector('option[data-test="notesApp_filterSelect_alphabet"]');
export const buttonCreate = Selector('button[data-test="notesApp_createButton"]');
export const buttonDelete = Selector('button[data-test="notesApp_deleteButton"]');
export const notesCounter = Selector('p[data-test="notesApp_noteCounter"]');
export const weatherParagraph = Selector('p[data-test="notesApp_weatherPrgrph"]');
export const workSection = Selector('div[data-test="notesApp_workSection"]');
export const homeSection = Selector('div[data-test="notesApp_homeSection"]');
export const otherSection = Selector('div[data-test="notesApp_otherSection"]');
export const itemTitle = Selector('p[data-test="notesApp_itemTitle"]');
export const itemUpdate = Selector('p[data-test="notesApp_itemUpdate"]');
export const itemLink = Selector('a[data-test="notesApp_itemLink"]');
export const lastEdited = Selector('span[data-test="notesApp_lastEdited"]');
export const selectCategory = Selector('select[data-test="notesApp_selectCategory"]');
export const categoryWork = Selector('option[data-test="notesApp_selectCategory_work"]');
export const categoryHome = Selector('option[data-test="notesApp_selectCategory_home"]');
export const categoryOther = Selector('option[data-test="notesApp_selectCategory_other"]');
export const noteTitle = Selector('input[data-test="notesApp_noteTitle"]');
export const noteBody = Selector('textarea[data-test="notesApp_noteBody"]');
export const removeButton = Selector('button[data-test="notesApp_buttonRemove"]');
export const updateButton = Selector('button[data-test="notesApp_buttonDone"]');
export const emptyWorkMess = Selector('p[data-test="notesApp_emptyWork"]');
export const emptyHomeMess = Selector('p[data-test="notesApp_emptyHome"]');
export const emptyOtherMess = Selector('p[data-test="notesApp_emptyOther"]');
export const prioritizeBttn = Selector('button[data-test="notesApp_buttonPriority"]');
export const priorityCheckbox = Selector('input[name="priority-only"]');

// Text:
export const test1String = 'Test1';
export const test1_1String = 'Test1_1';
export const test2String = 'Test2';
export const test2_2String = 'Test2_2';
export const test3String = 'Test3';
export const test3_3String = 'Test3_3';
export const oneNoteCounter = 'You currently have 1 note.';
export const twoNoteCounter = 'You currently have 2 notes.';
export const threeNoteCounter = 'You currently have 3 notes.';
export const fourNoteCounter = 'You currently have 4 notes.';
export const categoryHomeString = 'home';
export const categoryWorkString = 'work';
export const categoryOtherString = 'other';
export const test4String = 'Test4';
export const changedNoteString = 'Test2Last edited a few seconds ago';
export const editNoteString = 'Last edited a few seconds ago';
export const unnamedNoteString = 'Unnamed note';
export const sortedByEdited = 'byEdited';
export const sortedAlphabetically = 'alphabetical'
export const stringTestBWork = 'TestBWork';
export const stringTestDHome = 'TestDHome';
export const stringTestEHome = 'TestEHome';
export const stringTestXOther = 'TestXOther';
export const stringTestYOther = 'TestYOther';
export const stringTestAWork = 'TestAWork';
export const nineNoteCounter = 'You currently have 9 notes.';
export const sortedByCreated = 'byCreated';
export const stringUnprioritize = 'Unprioritize';
export const stringPrioritize = 'Prioritize';

// Other:
export const timeWait = 30000;
export const typeWait = 500;