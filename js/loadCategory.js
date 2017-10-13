/**
 * Created by Ayellet on 27-Sep-17.
 */
// set namespace
var a = {};

// Set constants
const MAX_ITEMS_PER_PAGE = 8;
const MAX_NUMBER_OF_PAGES = 10;

const TAGS_CATEGORY1 = '<a href="breadCategory.html">';
const TAGS_CATEGORY2 = '</a></li>';

const TAGS1 = '<div class="col-lg-3 col-md-4 col-sm-6"><div class="thumbnail"><a href="#"><img class="img-thumbnail" src="';
const TAGS2 = '" </a><div class="caption"><a href="#"><h3>';
const TAGS3 = '</a></div></div></div><!-- /. col end-->';

// Set global objects
a.products = {};

a.pages = [];
a.currPage = 0;
a.currItem = 0;

// Set methods
a.fLoadCategoryName = function (categoryName) {
    $("#currentCategory").html(TAGS_CATEGORY1 + categoryName + TAGS_CATEGORY2);
    $("#categoryLabelId").text(categoryName);
}

a.fGetPagesHtml = function (contentObj) {
    a.totalCount = contentObj.length;
    a.numOfPages = Math.ceil(a.totalCount / MAX_ITEMS_PER_PAGE);

    var curPageHtml = '';
    for (var i = 0; i < a.numOfPages; i++, a.currPage++){
        for (var j = 0; j < MAX_ITEMS_PER_PAGE && a.currItem < a.totalCount; j++, a.currItem++){
            curPageHtml += TAGS1 + contentObj[a.currItem].image + TAGS2 + contentObj[a.currItem].label + TAGS3;
        }
        a.pages.push(curPageHtml);
        curPageHtml = '';
    }
    a.currPage = 0;
}

a.fPageStateHandler = function (activePageNum) {
    var activePageId = "#pagi" + activePageNum;
    $(activePageId).click(function () {
        $(".paginationLi").removeClass("active");
        $(activePageId).addClass("active");
        $("#rowFirst").empty();
        $("#rowFirst").append(a.pages[activePageNum - 1]);
    });
}

a.fSetPagination = function (contentObj) {
    a.fGetPagesHtml(contentObj);

    // Load first page
    $("#rowFirst").append(a.pages[a.currPage]);

    // Case 1: Single page
    if(a.numOfPages === 0){
        return;
    }

    // Case 2: Multiple pages, less than MAX_NUMBER_OF_PAGES
    if(a.numOfPages <= MAX_NUMBER_OF_PAGES) {
        var liTag1 = '<li class = "paginationLi"';
        var liId="";
        var liTag2 = '><a href="#">';
        var liTag3= '</a></li>';
        var pagiListItems = '';

        for(var i = 0; i < a.numOfPages; i++){
            liId = ' id=pagi' + (i+1);
            pagiListItems += liTag1 + liId + liTag2 + (i+1) + liTag3;
        }

        // Add pagination row HTML
        var pagiElem = '<div class="col-12"><ul class="pagination">' + pagiListItems + '</ul></div><!-- /. col end-->';
        $("#paginationRow").append(pagiElem);

        // Add pagination event listeners
        for (var i = 0; i < a.numOfPages; i++){
            a.fPageStateHandler(i+1);
        }

        // Set first page active
        $("#pagi1").addClass("active");
    }
}

a.fGetItems = function (jsonPath, productsObj) {
    $.getJSON(jsonPath, function (data) {
        productsObj = data.products;
        a.fSetPagination(productsObj);
    })
}