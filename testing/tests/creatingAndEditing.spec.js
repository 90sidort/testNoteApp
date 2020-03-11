import {
    buttonCreate,
    buttonDelete,
    notesCounter,
    workSection,
    homeSection,
    itemTitle,
    itemLink,
    lastEdited,
    selectCategory,
    categoryWork,
    categoryHome,
    categoryOther,
    noteTitle,
    noteBody,
    removeButton,
    updateButton,
    timeWait, 
    test1String,
    test1_1String,
    typeWait,
    oneNoteCounter, 
    singleWork,
    emptyWorkMess,
    emptyHomeMess,
    emptyOtherMess,
    categoryHomeString,
    categoryWorkString,
    categoryOtherString,
    test2String,
    test2_2String,
    twoNoteCounter,
    threeNoteCounter,
    test3String,
    test3_3String,
    test4String,
    singleAll,
    fourNoteCounter,
    changedNoteString,
    editNoteString,
    unnamedNoteString,
    prioritizeBttn,
    stringUnprioritize,
    stringPrioritize,
    singleOther
} from '../support/variables';
import {
    setLocalStore,
} from '../support/functions'

const emptyFields = [emptyWorkMess, emptyHomeMess, emptyOtherMess];
const categoriesAvailable = [categoryWork, categoryHome, categoryOther];
const categoryText = [categoryWorkString, categoryHomeString, categoryOtherString];
const titleStrings = [test1String, test2String, test3String];
const bodyStrings = [test1_1String, test2_2String, test3_3String];
const counterStrings = [oneNoteCounter, twoNoteCounter, threeNoteCounter, fourNoteCounter];


fixture `testCafe demo tests- saving and deleting notes`
    .page `http://localhost:8082/`;
test('When no notes, all categories should display empty message, no counter', async t => {
    await t.maximizeWindow();
    for (let emptyField of emptyFields){
        await t.expect(emptyField.exists).ok({ timeout: timeWait });    
    }
    await t.expect(notesCounter.innerText).contains('');
});
test('It should be possible to create new note for Work category, counter should be updated', async t => {
    await t.maximizeWindow();
    await t.click(buttonCreate);
    await t.expect(noteTitle.exists).ok({ timeout: timeWait });
    await t.typeText(noteTitle, test1String);
    await t.wait(typeWait);
    await t.typeText(noteBody, test1_1String);
    await t.wait(typeWait);
    await t.click(updateButton);
    await t.expect(itemLink.exists).ok({ timeout: timeWait });
    await t.expect(itemTitle.innerText).contains('1');
    await t.expect(notesCounter.innerText).eql(oneNoteCounter);
});
test('It should be possible to change note category when creating new note', async t => {
    await t.maximizeWindow();
    await t.click(buttonCreate);
    for(let i=0; i < categoriesAvailable.length;i++){
        await t.expect(noteTitle.exists).ok({ timeout: timeWait });
        await t.click(selectCategory);
        await t.wait(typeWait);
        await t.click(categoriesAvailable[i]);
        await t.wait(typeWait);
        await t.expect(selectCategory.value).eql(categoryText[i]);
    };
});
test('It should be possible to change note category for existing note', async t => {
    await t.maximizeWindow();
    await setLocalStore(singleWork);
    await t.eval(() => location.reload(true));
    await t.expect(itemLink.exists).ok({ timeout: timeWait });
    await t.click(itemLink);
    await t.expect(noteTitle.exists).ok({ timeout: timeWait });
    await t.click(selectCategory);
    await t.wait(typeWait);
    await t.click(categoryHome);
    await t.wait(typeWait);
    await t.click(updateButton);
    await t.expect(emptyHomeMess.exists).notOk({ timeout: timeWait });
    await t.expect(emptyWorkMess.exists).ok({ timeout: timeWait });
});
test('Categories with no notes should display message', async t => {  
    await t.maximizeWindow();
    await setLocalStore(singleWork);
    await t.eval(() => location.reload(true));
    await t.expect(itemLink.exists).ok({ timeout: timeWait });
    await t.expect(itemTitle.innerText).contains('1');
    await t.expect(emptyHomeMess.exists).ok({ timeout: timeWait });
    await t.expect(emptyOtherMess.exists).ok({ timeout: timeWait });
});
test('Should be able to add notes to all categories, counter updated', async t => {
    await t.maximizeWindow();
    for(let i=0;i<titleStrings.length;i++){
        await t.click(buttonCreate);
        await t.expect(noteTitle.exists).ok({ timeout: timeWait });
        await t.click(selectCategory);
        await t.wait(typeWait);
        await t.click(categoriesAvailable[i]);
        await t.wait(typeWait);
        await t.typeText(noteTitle, titleStrings[i]);
        await t.wait(typeWait);
        await t.typeText(noteBody, bodyStrings[i]);
        await t.wait(typeWait);
        await t.click(updateButton);
        await t.expect(notesCounter.exists).ok({ timeout: timeWait });
        await t.expect(notesCounter.innerText).eql(counterStrings[i]);
    };  
    await t.expect(itemLink.exists).ok({ timeout: timeWait });
    await t.expect(itemLink.count).eql(3);
});
test('Should be able to delete all notes, counter disapear', async t => {  
    await t.maximizeWindow();
    await setLocalStore(singleAll);
    await t.eval(() => location.reload(true));
    await t.expect(itemLink.exists).ok({ timeout: timeWait });
    await t.expect(itemLink.count).eql(3);
    await t.click(buttonDelete);
    await t.expect(itemLink.exists).notOk({ timeout: timeWait });
    await t.expect(notesCounter.innerText).contains('');
});
test('Should be able to add new notee to existing ones, counter updated', async t => {  
    await t.maximizeWindow();
    await setLocalStore(singleAll);
    await t.eval(() => location.reload(true));
    await t.expect(buttonCreate.exists).ok({ timeout: timeWait });
    await t.click(buttonCreate);
    await t.expect(noteTitle.exists).ok({ timeout: timeWait });
    await t.typeText(noteTitle, test4String);
    await t.wait(typeWait);
    await t.click(updateButton);
    await t.expect(notesCounter.exists).ok({ timeout: timeWait });
    await t.expect(notesCounter.innerText).eql(fourNoteCounter);
});
test('Should be able to, delete notes indivudally, counter disapear', async t => {
    await t.maximizeWindow();
    await setLocalStore(singleAll);
    await t.eval(() => location.reload(true));
    await t.expect(buttonCreate.exists).ok({ timeout: timeWait });
    await t.expect(itemLink.count).eql(3);
    for(let i=0;i < 3;i++){
        await t.click(itemLink.nth(0));
        await t.expect(removeButton.exists).ok({ timeout: timeWait });
        await t.click(removeButton);
        await t.expect(buttonCreate.exists).ok({ timeout: timeWait });
    }
    await t.expect(itemLink.exists).notOk({ timeout: timeWait });
    await t.expect(notesCounter.innerText).contains('');
});
test('Should be able to modify data of note, counter should not change', async t => {
    await t.maximizeWindow();
    await setLocalStore(singleWork);
    await t.eval(() => location.reload(true));
    await t.expect(itemLink.exists).ok({ timeout: timeWait });
    await t.click(itemLink);
    await t.expect(noteTitle.exists).ok({ timeout: timeWait });
    await t.click(selectCategory);
    await t.wait(typeWait);
    await t.click(categoryHome);
    await t.wait(typeWait);
    await t.typeText(noteTitle, test2String, { replace: true });
    await t.wait(typeWait);
    await t.typeText(noteBody, test2_2String, { replace: true });
    await t.wait(typeWait);
    await t.click(updateButton);
    await t.expect(itemLink.exists).ok({ timeout: timeWait });
    await t.expect(homeSection.child('a').textContent).eql(changedNoteString);
    await t.expect(notesCounter.innerText).eql(oneNoteCounter);
});
test('Notes should contain edition info text', async t => {
    await t.maximizeWindow();
    await t.click(buttonCreate);
    await t.expect(noteTitle.exists).ok({ timeout: timeWait });
    await t.typeText(noteTitle, test2String);
    await t.wait(typeWait);
    await t.typeText(noteBody, test2_2String);
    await t.wait(typeWait);
    await t.click(updateButton);
    await t.expect(itemLink.exists).ok({ timeout: timeWait });
    await t.expect(workSection.child('a').textContent).eql(changedNoteString);
});
test('Edit display shoud contain editing info text', async t => {
    await t.maximizeWindow();
    await t.click(buttonCreate);
    await t.expect(noteTitle.exists).ok({ timeout: timeWait });
    await t.expect(lastEdited.textContent).eql(editNoteString);
});
test('Adding empty note should be possible', async t => {
    await t.maximizeWindow();
    await t.click(buttonCreate);
    await t.expect(noteTitle.exists).ok({ timeout: timeWait });
    await t.click(updateButton);
    await t.expect(itemLink.exists).ok({ timeout: timeWait });
    await t.expect(itemTitle.innerText).contains(unnamedNoteString);
    await t.expect(notesCounter.innerText).eql(oneNoteCounter);
});
test('It shoudl be possible to add note with title only', async t => {
    await t.maximizeWindow();
    await t.click(buttonCreate);
    await t.expect(noteTitle.exists).ok({ timeout: timeWait });
    await t.typeText(noteTitle, test1String);
    await t.wait(typeWait);
    await t.click(updateButton);
    await t.expect(itemLink.exists).ok({ timeout: timeWait });
    await t.expect(itemTitle.innerText).contains('1');
    await t.expect(notesCounter.innerText).eql(oneNoteCounter);
});
test('It should be possible to create new high priority note, counter should be updated', async t => {
    await t.maximizeWindow();
    await t.click(buttonCreate);
    await t.expect(noteTitle.exists).ok({ timeout: timeWait });
    await t.typeText(noteTitle, test1String);
    await t.wait(typeWait);
    await t.typeText(noteBody, test1_1String);
    await t.wait(typeWait);
    await t.click(prioritizeBttn);
    await t.expect(prioritizeBttn.innerText).eql(stringUnprioritize);
    await t.click(updateButton);
    await t.expect(itemLink.exists).ok({ timeout: timeWait });
    await t.expect(itemTitle.innerText).contains('1');
    await t.expect(itemLink.getStyleProperty("background-color")).eql('rgb(255, 0, 0)');
    await t.expect(notesCounter.innerText).eql(oneNoteCounter);
});
test('Should be able to mark existing note as high priority, counter should not change', async t => {
    await t.maximizeWindow();
    await setLocalStore(singleWork);
    await t.eval(() => location.reload(true));
    await t.expect(itemLink.exists).ok({ timeout: timeWait });
    await t.click(itemLink);
    await t.expect(prioritizeBttn.exists).ok({ timeout: timeWait });
    await t.click(prioritizeBttn);
    await t.expect(prioritizeBttn.innerText).eql(stringUnprioritize);
    await t.wait(typeWait);
    await t.click(updateButton);
    await t.expect(itemLink.exists).ok({ timeout: timeWait });
    await t.expect(itemLink.getStyleProperty("background-color")).eql('rgb(255, 0, 0)');
    await t.expect(notesCounter.innerText).eql(oneNoteCounter);
});
test('Should be able to mark existing note as normal priority, counter should not change', async t => {
    await t.maximizeWindow();
    await setLocalStore(singleOther);
    await t.eval(() => location.reload(true));
    await t.expect(itemLink.exists).ok({ timeout: timeWait });
    await t.click(itemLink);
    await t.expect(prioritizeBttn.exists).ok({ timeout: timeWait });
    await t.click(prioritizeBttn);
    await t.expect(prioritizeBttn.innerText).eql(stringPrioritize);
    await t.wait(typeWait);
    await t.click(updateButton);
    await t.expect(itemLink.exists).ok({ timeout: timeWait });
    await t.expect(itemLink.getStyleProperty("background-color")).eql('rgb(247, 247, 247)');
    await t.expect(notesCounter.innerText).eql(oneNoteCounter);
});