import {
    notesCounter,
    itemLink,
    filteringSet,
    filterSelect,
    sortedByEdited,
    stringTestBWork,
    stringTestDHome,
    stringTestXOther,
    optionAlphabetical,
    sortedAlphabetically,
    nineNoteCounter,
    stringTestAWork,
    optionCreated,
    sortedByCreated,
    noteBody,
    test1String,
    updateButton,
    stringTestEHome,
    stringTestYOther,
    timeWait,
    filterInput
} from '../support/variables';
import {
    setLocalStore,
} from '../support/functions'

fixture `testCafe demo tests- filtering notes`
    .page `http://localhost:8080/`;
test('Notes should be sorted by last edited by default', async t => {
    await t.maximizeWindow();
    await setLocalStore(filteringSet);
    await t.eval(() => location.reload(true));
    await t.expect(filterSelect.value).eql(sortedByEdited);
    await t.expect(itemLink.nth(0).innerText).contains(stringTestBWork);
    await t.expect(itemLink.nth(3).innerText).contains(stringTestDHome);
    await t.expect(itemLink.nth(6).innerText).contains(stringTestXOther);
});
test('It should be possible to sort notes alphabetically, counter doesnt change', async t => {
    await t.maximizeWindow();
    await setLocalStore(filteringSet);
    await t.eval(() => location.reload(true));
    await t.expect(notesCounter.innerText).eql(nineNoteCounter);
    await t.click(filterSelect);
    await t.click(optionAlphabetical);
    await t.expect(filterSelect.value).eql(sortedAlphabetically);
    await t.expect(itemLink.nth(0).innerText).contains(stringTestAWork);
    await t.expect(itemLink.nth(3).innerText).contains(stringTestDHome);
    await t.expect(itemLink.nth(6).innerText).contains(stringTestXOther);
    await t.expect(notesCounter.innerText).eql(nineNoteCounter);
});
test('It should be possible to sort notes by creation date, counter doesnt change', async t => {
    await t.maximizeWindow();
    await setLocalStore(filteringSet);
    await t.eval(() => location.reload(true));
    await t.expect(notesCounter.innerText).eql(nineNoteCounter);
    await t.click(filterSelect);
    await t.click(optionCreated);
    await t.expect(filterSelect.value).eql(sortedByCreated);
    await t.expect(itemLink.nth(0).innerText).contains(stringTestBWork);
    await t.expect(itemLink.nth(3).innerText).contains(stringTestDHome);
    await t.expect(itemLink.nth(6).innerText).contains(stringTestXOther);
    await t.expect(notesCounter.innerText).eql(nineNoteCounter);
});
test('Editing notes should change sorting (filter last edited selected)', async t => {
    await t.maximizeWindow();
    await setLocalStore(filteringSet);
    await t.eval(() => location.reload(true));
    await t.expect(filterSelect.value).eql(sortedByEdited);
    for(let i=2;i<9;i+=3){
        await t.click(itemLink.nth(i));
        await t.typeText(noteBody, test1String);
        await t.click(updateButton);
    };
    await t.expect(itemLink.nth(0).innerText).contains(stringTestAWork);
    await t.expect(itemLink.nth(3).innerText).contains(stringTestEHome);
    await t.expect(itemLink.nth(6).innerText).contains(stringTestYOther);
});
test('Filterin by text should be possible', async t => {
    await t.maximizeWindow();
    await setLocalStore(filteringSet);
    await t.eval(() => location.reload(true));
    await t.expect(itemLink.nth(8)).ok({ timeout: timeWait });
    await t.typeText(filterInput, stringTestAWork);
    await t.expect(itemLink.nth(0).innerText).contains(stringTestAWork);
    await t.expect(itemLink.nth(1).exists).notOk();
});