const renderInitialMapDetailPage = function() {
  const $mapDetailsPage = $(`
    <section id="map-details-page">
      <!-- delete map button manage contributors form, interactive map -->
      <div id="right-half">
        <div class="map-options"><span id="btnManageContributors">manage contributors</span>
          <span id="btngetMapToEdit">edit map&nbsp;<i  class="edit fa-regular  fa-pen-to-square"></i></span>
          <span id="delete-map">delete map&nbsp;<i  class="delete fa-solid  fa-trash-can"></i></span>
        </div>
        <section class="contributors-form"></section>

        <!--is in section.append-forms on map details page, will more likely need jquery slidedown on click-->
        <section class="leaflet-map"></section>
      </div>

      <!--map detail card with favourite icon, edit map form and add/edit point form points list in this div-->
      <div id="left-half">
        <article id="map-card-for-detail-page"></article>
        <section class="vertical-scroll-container" id="points-list">
          <div class="inside-scroll">
            <article class="add-point-card">
              <i class="fa-solid fa-xl fa-plus"></i>
              ADD
            </article>
            <!-- points cards will be appended in here -->
          </div>
        </section>
      </div>
    </section>
  `);

  window.$mapDetailsPage = $mapDetailsPage;
};

const loadMapDetailPage = function(mapId) {
  //retrieve map detail data from database
  getMapDetails(mapId).then(function(json) {
    //prepare for map data section
    console.log("json Map Details Load: ", json);
    const mapData = json.results[0][0];
    const $mapCard = renderMapCardForDetailPage(mapData);

    //reset and mount the page
    mountDetailPage($mapCard);

    //append point data section
    const pointData = json.results[1];
    const $pointsCollection = renderPointCardCollection(pointData);
    const $addPointCardArticle = $('.add-point-card');
    $addPointCardArticle.after($pointsCollection);

    //append contributor section and hide
    const mapId = $('#mapId').val();
    getContributors(mapId).then(function(json) {
      const $contributorForm = renderManageContributorForm(json.listOfContributors);
      const $mapCardForDetailPage = $('#map-card-for-detail-page');
      $mapCardForDetailPage.append($contributorForm);

      $(".manage-contributors").hide(); //may be change this with hidden css
    });

    //append leaflet map
    const $mapSession = $('.leaflet-map');
    $mapSession.append('<div id="map"></div>');
    loadMap();
  });

};

const mountDetailPage = function($mapCard) {
  //reset page
  resetPage($mapDetailsPage);
  renderInitialMapDetailPage();

  //mount page
  views_manager.show('mapDetails');

  //append map data section
  const $mapCardForDetailPage = $('#map-card-for-detail-page');
  $mapCardForDetailPage.append($mapCard);
};

$(() => {

  renderInitialMapDetailPage();

  $('body').on('click', '#btngetMapToEdit', function() {
    //get mapId from hidden field
    const mapId = $('#mapId').val();

    //retrieve map data to edit
    getMapToEdit(mapId).then(function(json) {
      //replace map card detail session with map edit form
      const mapData = json.results[0];
      const $mapEditForm = renderMapEditForm(mapData);
      const $mapCardForDetailPage = $('#map-card-for-detail-page');
      $mapCardForDetailPage.empty();
      $mapCardForDetailPage.append($mapEditForm);
    });
  });

  $('body').on('click', '#btnCreateMap', function() {
    const $mapEditForm = renderCreateMapForm();
    mountDetailPage($mapEditForm);
  });

  $('body').on('click', '#btnManageContributors', function() {
    $(".manage-contributors").slideToggle("slow", function() { });
  });
});
