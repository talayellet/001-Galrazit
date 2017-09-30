/**
 * Created by Ayellet on 27-Sep-17.
 */
// set namespace
var a = {};

// Set constants
const TAGS1 = '<div class="col-lg-3 col-md-4 col-sm-6"><div class="thumbnail"><a href="#"><img class="img-thumbnail" src="';
const TAGS2 = '" </a><div class="caption"><a href="#"><h3>';
const TAGS3 = '</a><p class="categoryItem">';
const TAGS4 = '</p></div></div></div><!-- /. col end-->';

// Set global objects
a.products = {};

// Set methods
a.fLoadCategoryProducts = function (contentObj) {
    // validate contentObj
    var count = contentObj.length;
    if(count === 0) {
        console.log("invalid input"); //DEBUG
        return;
    }

    var output = '';
    for(var i = 0; i < count; i++){
        output = TAGS1 + contentObj[i].image + TAGS2 + contentObj[i].label + TAGS3 + contentObj[i].description + TAGS4;
        $("#rowFirst").append(output);
    }
}

a.fGetItems = function (jsonPath, productsObj) {
    $.getJSON(jsonPath, function (data) {
        productsObj = data.products;
        a.fLoadCategoryProducts(productsObj);
    })
}

// Call methods
$(document).ready(
    a.fGetItems("../json/breadCategory.json", a.products)
);