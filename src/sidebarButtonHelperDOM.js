const displaySidebar = function(target){
    let dataSidebar = target.getAttribute("data-sidebar");
    dataSidebar = dataSidebar === 'true' ? false : true;
    target.setAttribute('data-sidebar', dataSidebar)
}



export {displaySidebar}