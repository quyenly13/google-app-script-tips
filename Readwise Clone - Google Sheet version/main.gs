function onOpen() {
    const ui = SpreadsheetApp.getUi();
    ui.createMenu('Readwise Clone')
        .addItem('Send Emails', 'sendEmail')
        .addItem('Create Schedule', 'createTrigger')
        .addToUi();
}

function sendEmail() {
    var emailAddress = 'lykieuquyen96@gmail.com';
    var name = 'Quyen Ly';
    var highlightList =  {};
    highlightList['name'] = name;

    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheets()[0];
    var lastRow = sheet.getLastRow();
    // For Loop
    var data = [];
    for (var i = 0; i < 10 ; i++) {
        var item ={};
        var randRow = Math.floor(Math.random() * lastRow) + 1;
        var highlight = sheet.getRange(randRow, 2).getValue();
        var title = sheet.getRange(randRow, 3).getValue();
        var author = sheet.getRange(randRow, 4).getValue();
        var tag = sheet.getRange(randRow, 5).getValue();
        var chapter = sheet.getRange(randRow, 6).getValue();
        item['highlight'] = highlight;
        item['title'] = title;
        item['author'] = author;
        item['tag'] = tag;
        item['chapter'] = chapter;
        data.push(item);
    }
    highlightList['data'] = data;
    Logger.log(highlightList);
    Logger.log(highlightList.data);
    var templ = HtmlService
        .createTemplateFromFile('email-template');
    templ.highlightList = highlightList;

    var message = templ.evaluate().getContent();

    MailApp.sendEmail({
        to: emailAddress,
        subject: "Book Highlights of the day",
        htmlBody: message
    });

}

function createTrigger(){
    ScriptApp.newTrigger("sendEmail")
    .timeBased()
    .atHour(20)
    .everyDays(1)
    .inTimezone("Asia/Ho_Chi_Minh")
    .create();
}

function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
};

