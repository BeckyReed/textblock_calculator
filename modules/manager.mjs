import { textMeasure } from './TextBlock.mjs';
import { linearConverter, weightConverter } from "./converters.mjs";

/*
* GET DEFAULT SETTINGS IMPORT
* get TextBlock atributes to configuration json file for TextBlock settings
*/
async function getJSONconfig(path) {
    const response = await fetch(path);
    const jsonData = await response.json();

    return jsonData;
}

/*
* FOR DEFAULT SETTINGS IMPORT
* set TextBlock atributes to configuration json file for TextBlock settings
*/
function setJSONconfig(textBlock, jsonData) {
    textBlock.linearUnit = jsonData.linearUnit;
    textBlock.weightUnit = jsonData.weightUnit;
    textBlock.pageWidth = jsonData.pageWidth;
    textBlock.pageHeight = jsonData.pageHeight;
    textBlock.paperGSM = jsonData.paperGSM;
    textBlock.topBottomMargin = jsonData.topBottomMargin;
    textBlock.insideMargin = jsonData.insideMargin;
    textBlock.outsideMargin = jsonData.outsideMargin;
    textBlock.targetFontPt = jsonData.targetFontPt;
    textBlock.fontFamily = jsonData.fontFamily;
    textBlock.lineSpacing = jsonData.lineSpacing;
    textBlock.paragraphSpacing = jsonData.paragraphSpacing;
    textBlock.flyLeaves = jsonData.flyLeaves;
    textBlock.titlePage = jsonData.titlePage;
    textBlock.tableOfContentsPage = jsonData.tableOfContentsPage;
    textBlock.infoPage = jsonData.infoPage;
    textBlock.sectionHeadSameSide = jsonData.sectionHeadSameSide;
    textBlock.pagePerSectionHead = jsonData.pagePerSectionHead;
    textBlock.imagePages = jsonData.imagePages;
}



/*
* POPULATE PAGE SETTINGS 
* populate select with page size options from json config
*/
async function populatePageSizeSelect(element, path) {
    const response = await fetch(path);
    const jsonData = await response.json();

    let htmlString = "";

    if (jsonData) {
        jsonData.pages.forEach(pages => {
            htmlString += `<option value='${pages.name}'>${pages.name}</option>`;
        });

        document.querySelector(element).innerHTML = htmlString;
    }
}

/*
* PAPER DEFAULT SETTINGS SET TEXTBLOCK
* get TextBlock atributes to configuration json file for TextBlock settings
*/
async function getJSONpageSize(path, pageName) {
    const response = await fetch(path);
    const jsonData = await response.json();

    let pageInfo;

    jsonData.pages.forEach(pages => {
        if (pages.name === pageName) {

            pageInfo = pages;
        }
    });

    return pageInfo;
}


/*
* PAPER DEFAULT SETTINGS SET TEXTBLOCK
* set TextBlock atributes to configuration json file for TextBlock settings
*/
const setJSONpageSize = function (textBlock, jsonData) {
    textBlock.pageWidth = jsonData.pageWidth;
    textBlock.pageHeight = jsonData.pageHeight;
    textBlock.topBottomMargin = jsonData.topBottomMargin;
    textBlock.insideMargin = jsonData.insideMargin;
    textBlock.outsideMargin = jsonData.outsideMargin;
}




/*
* set element values to match TextBlock settings
*/
function setViewToConfig(textBlock) {
    //Linear Unit
    document.querySelectorAll('input[name="pageLinearUnit"]').forEach((element) => {
        if (element.value === textBlock.linearUnit) {

            document.getElementById(`${element.id}`).checked = true
        }
    });
    //Weight Unit
    document.querySelectorAll('input[name="pageWeightUnit"]').forEach((element) => {
        if (element.value === textBlock.weightUnit) {

            document.getElementById(`${element.id}`).checked = true
        }
    });
    //Page Width
    document.querySelector('#widthInput').setAttribute("placeholder", linearConverter(textBlock.pageWidth, "px", textBlock.linearUnit).toFixed(2));
    document.querySelector('#widthInput').value = null;
    //Page Height
    document.querySelector('#heightInput').setAttribute("placeholder", linearConverter(textBlock.pageHeight, "px", textBlock.linearUnit).toFixed(2));
    document.querySelector('#heightInput').value = null;
    //Paper GSM
    document.querySelector('#paperWeight').setAttribute("placeholder", textBlock.paperGSM);
    document.querySelector('#paperWeight').value = null;

    //Number of Chapers
    document.querySelector('#numSections').setAttribute("placeholder", textBlock.numSections);

    //Top and Bottom Margins
    document.querySelector('#topBotomInput').setAttribute("placeholder", linearConverter(textBlock.topBottomMargin, "px", textBlock.linearUnit).toFixed(2));
    document.querySelector('#topBotomInput').value = null;
    //Inside Margin
    document.querySelector('#insideInput').setAttribute("placeholder", linearConverter(textBlock.insideMargin, "px", textBlock.linearUnit).toFixed(2));
    document.querySelector('#insideInput').value = null;
    //Outside Margin
    document.querySelector('#outsideInput').setAttribute("placeholder", linearConverter(textBlock.outsideMargin, "px", textBlock.linearUnit).toFixed(2));
    document.querySelector('#outsideInput').value = null;
    //Target Font Point Size
    document.querySelector('#pointSizeFont').setAttribute("placeholder", textBlock.targetFontPt);
    document.querySelector('#pointSizeFont').value = null;
    //Font Family
    document.querySelector('#fontList').setAttribute("placeholder", textBlock.fontFamily);
    document.querySelector('#fontList').value = null;
    //Line Spacing
    document.querySelector('#lineSpacing').setAttribute("placeholder", textBlock.lineSpacing);
    document.querySelector('#lineSpacing').value = null;
    //Paragraph Spacing
    document.querySelector('#paragraphSpacing').setAttribute("placeholder", textBlock.paragraphSpacing);
    document.querySelector('#paragraphSpacing').value = null;
    //Fly Leaves
    document.querySelector('#numFlyLeaves').setAttribute("placeholder", textBlock.flyLeaves);
    document.querySelector('#numFlyLeaves').value = null;
    //Title Page
    if (textBlock.titlePage > 0) {
        document.querySelector('#titlePageAdd').checked = true;
    } else {
        document.querySelector('#titlePageAdd').checked = false;
    }
    //Table Of Contents Page
    if (textBlock.tableOfContentsPage > 0) {
        document.querySelector('#tocPageAdd').checked = true;
    } else {
        document.querySelector('#tocPageAdd').checked = false;
    }
    //Info Page
    if (textBlock.infoPage > 0) {
        document.querySelector('#bookInfoPageAdd').checked = true;
    } else {
        document.querySelector('#bookInfoPageAdd').checked = false;
    }
    //Section head will start on same side
    if (textBlock.sectionHeadSameSide === true) {
        document.querySelector('#chHeadSameSide').checked = true;
    } else {
        document.querySelector('#chHeadSameSide').checked = false;
    }
    //Page Per Section Head
    document.querySelector('#chHeadPage').setAttribute("placeholder", textBlock.pagePerSectionHead);
    document.querySelector('#chHeadPage').value = null;
    //Image Pages
    document.querySelector('#imagePage').setAttribute("placeholder", textBlock.imagePages);
    document.querySelector('#imagePage').value = null;

}

/*
* update results. WITH TEXTBLOCK
*/
function updateResults(textblock, numPageRes, numSheetsRes, thicknessBlockRes, weightBlockRes) {

    if (isNaN(textblock.resultNumPages)) {
        numPageRes.innerHTML = "&nbsp;";
    } else {
        numPageRes.innerText = textblock.resultNumPages;
    }

    if (isNaN(textblock.resultNumSheets)) {
        numSheetsRes.innerHTML = "&nbsp;";
    } else {
        numSheetsRes.innerText = textblock.resultNumSheets;
    }

    let showThickness = linearConverter((textblock.resultThickness), "cm", textblock.linearUnit);
    if (isNaN(showThickness)) {
        showThickness = "";
        thicknessBlockRes.innerText = showThickness + textblock.linearUnit;
    } else {
        thicknessBlockRes.innerText = showThickness.toFixed(2) + textblock.linearUnit;
    }

    let showWeight = weightConverter(textblock.resultWeight, "kg", textblock.weightUnit);
    if (isNaN(showWeight)) {
        showWeight = "";
        weightBlockRes.innerText = showWeight + textblock.weightUnit;
    } else {
        weightBlockRes.innerText = showWeight.toFixed(2) + textblock.weightUnit;
    }
}

function updateMeasures(textblock, pageWidthIn, pageHeightIn, topBottomMarginIn, insideMarginIn, ousideMarginIn) {

    if (pageWidthIn.value !== "") {
        let valueWidth = parseFloat(pageWidthIn.value);
        textblock.pageWidth = linearConverter(valueWidth, textblock.linearUnit, "px");
    }


    if (pageHeightIn.value !== "") {
        let valueHeight = parseFloat(pageHeightIn.value);
        textblock.pageHeight = linearConverter(valueHeight, textblock.linearUnit, "px");
    }


    if (topBottomMarginIn.value !== "") {
        let valueTBM = parseFloat(topBottomMarginIn.value);
        textblock.topBottomMargin = linearConverter(valueTBM, textblock.linearUnit, "px");
    }


    if (insideMarginIn.value !== "") {
        let valueIM = parseFloat(insideMarginIn.value);
        textblock.insideMargin = linearConverter(valueIM, textblock.linearUnit, "px");
    }


    if (ousideMarginIn.value !== "") {
        let valueOM = parseFloat(ousideMarginIn.value);
        textblock.outsideMargin = linearConverter(valueOM, textblock.linearUnit, "px");
    }

}


/*
* Add download link for font to header
*/
async function addFontLink(fontFamilyNew, headerElement, noShowDiv, textBlock, numPageRes, numSheetsRes, thicknessBlockRes, weightBlockRes) {
    if (document.getElementById(`fontLink${fontFamilyNew}`) === null && fontFamilyNew != -1) {
        const url = "https://fonts.googleapis.com/css?family=" + fontFamilyNew;
        const link = document.createElement('link');
        link.href = url;
        link.rel = "stylesheet";
        link.id = `fontLink${fontFamilyNew}`;



        link.onload = () => {
            document.fonts.ready.then(() => {

                textBlock.fontFamily = fontFamilyNew;
                textMeasure(noShowDiv, textBlock);
                updateResults(textBlock, numPageRes, numSheetsRes, thicknessBlockRes, weightBlockRes);
            })

        };

        headerElement[0].appendChild(link);
    } else if (fontFamilyNew == -1) {

        const response = await fetch(`./json/defaults.json`);
        const jsonData = await response.json();
        textBlock.fontFamily = jsonData.fontFamily;
        textMeasure(noShowDiv, textBlock);
        updateResults(textBlock, numPageRes, numSheetsRes, thicknessBlockRes, weightBlockRes);

    } else {
        //console.log("font already loaded __");
    }



}





export { getJSONconfig, setJSONconfig, populatePageSizeSelect, getJSONpageSize, setJSONpageSize, setViewToConfig, updateResults, updateMeasures, addFontLink }