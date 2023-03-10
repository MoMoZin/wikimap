const renderMapCardForDetailPage = function(map) {

  map.favClass = map.isfavourite ? "is-favourite" : "";
  const $html = `
  <header>
    <div>
      <input type="hidden" id="mapId" name="mapId" value="${map.id}">
      <p id="title-heart">${map.title}<i class="fa-solid fa-lg fa-heart ${map.favClass}"></i> <span id="btngetMapToEdit">edit map&nbsp;<i  class="edit fa-regular  fa-pen-to-square"></i></span></p>
      <p>${map.description}</p>
      <p><small>created on: ${map.created_date}</small></p>
    </div>
  </header>
  `;
  return $html;
};


const renderMapEditForm = function(map) {
  console.log("map: ", map);
  const $html = `
  <!--is in section.append-forms on map details page, will more likely need jquery slidedown on click-->
  <form class="edit-map">
    <div>edit map details</div>
    <input type="hidden" id="mapId" name="mapId" value="${map.id}">
    <div class="form-group">
      <label for="map-title">map name</label>
        <input type="text" name="title" class="form-control" id="map-title"  value="${map.title}">
    </div>
    <div class="form-group">
      <label for="map-description">description</label>
      <input type="text" name="description" class="form-control" id="map-description" value="${map.description}">
    </div >
    <button type="submit" class="btn btn-outline-dark btn-small">save</button>
    <button type="button" class="btn btn-outline-dark btn-small" id="cancel-edit-map">cancel</button>
  </form >
  `;
  return $html;
};


const renderCreateMapForm = function() {
  const $html = `
  <!--is in section.append-forms on map details page, will more likely need jquery slidedown on click-->
  <form class="new-map">
    <div>create a new map</div>
    <div class="form-group">
      <label for="map-title">map name</label>
      <input type="text" name="title" class="form-control" id="map-title"  placeholder="">
    </div>
    <div class="form-group">
      <label for="map-description">description</label>
      <input type="text" name="description" class="form-control" id="map-description" placeholder="">
    </div>
    <button type="submit" class="btn btn-outline-dark btn-small" id="btnSaveMap">save</button>
  </form>
  `;
  return $html;
};


const renderManageContributorForm = function(contributors) {

  $('.manage-contributors').remove();
  const contributorListView = renderContributorsListView(contributors);
  const $html = `
  <!--is in section.append-forms on map details page, will more likely need jquery slidedown on click-->
  <article class ="manage-contributors">
    <div>current contributors</div>
    <ul class="view-contributors" style="list-style-type:none;">
      ${contributorListView}
    </ul >
    <form class="add-contributors">
      <div class="form-group">
        <input type="text" name="name" class="form-control" id="name-of-contributor" placeholder="enter new contributor name">
      </div>
      <button type="submit" class="btn btn-outline-dark btn-small" id="add-contributor">add</button>
    </form >
  </article>
  `;
  return $html;
};

const renderContributorsListView = function(contributors) {
  let $html = '';
  contributors.forEach(contributor => $html += `
  <li>
  <i  class="delete fa-solid fa-trash-can" id="delete-contributor">&nbsp;&nbsp;</i>
  <input type="hidden" id="contributorId" name="contributorId" value="${contributor.user_id}">
  ${contributor.name}
  </li> `);
  return $html;
};


const renderPointCard = function(point) {
  const $html = `
  <!-- append in to section.vertical-scroll-container #points-list of map details page -->

  <article class="point-card">
    <div>
      <img id="point-img" src="${point.image_url}">
      <div class="edit-delete-point">

      <input type="hidden" id="pointId" name="pointId" value="${point.id}">
      <input type="hidden" id="lat" name="lat" value="${point.lat}">
      <input type="hidden" id="lon" name="lon" value="${point.lon}">
        <i class="edit fa-regular fa-lg fa-pen-to-square" id="edit-point">&nbsp;</i>
        <i class="delete fa-solid fa-lg fa-trash-can" id="delete-point">&nbsp;</i>
      </div>
    </div>
    <div>
      <div>
        <p id= "point_title">${point.title}</p>
          <p id="point_desc">${point.description}</p>
          <p id="point_add1">${point.address_line_1}</p>
          <p id="point_add2">${point.address_line_2}</p>
        </div>
    </div>
  </article>
  `;

  return $html;
};

const renderPointCardCollection = function(points) {
  let $html = '<section id="point-collection">';
  points.forEach(point => {
    const $pointCard = renderPointCard(point);
    $html += $pointCard;
  });
  $html += '</section>';
  return $html;
};

const renderAddPoint = function() {
  const $html = `
  <!-- to slide down on click of the article.add-point-card -->
  <form class="add-point">
    <div>add point to the map</div>
    <div class="form-group">
      <label for="title">point name</label>
      <input type="text" name="title" class="form-control" id="title"  placeholder="">
    </div>
    <div class="form-group">
      <label for="description">description</label>
      <input type="text" name="description" class="form-control" id="description" placeholder="">
    </div>
    <div class="form-group">
      <label for="image-url">image url</label>
      <input type="text" name="image_url" class="form-control" id="image_url" placeholder="optional">
    </div>
    <div class="form-group">
      <label for="address_line_1">primary address information</label>
      <input type="text" name="address_line_1" disabled class="form-control" id="address_line_1" >
      <input type="hidden" name="address_line_1" class="form-control" id="address_line_1_hidden" >
    </div >
    <div class="form-group">
      <label for="address_line_2">secondary address information</label>
      <input type="text" name="address_line_2" disabled class="form-control" id="address_line_2">
      <input type="hidden" name="address_line_2" class="form-control" id="address_line_2_hidden">
      </div>
            <div class="form-group">
              <label for="latitude">latitude</label>
              <input type="text" name="latitude" disabled class="form-control" id="latitude" >
              <input type="hidden" name="latitude" class="form-control" id="latitude_hidden" >
            </div>
            <div class="form-group">
              <label for="longitude">longitude</label>
              <input type="text" name="longitude" disabled class="form-control" id="longitude" >
              <input type="hidden" name="longitude" class="form-control" id="longitude_hidden" >
            </div>
            <button type="submit" class="btn btn-outline-dark btn-small">add</button>
            <button type="button" class="btn btn-outline-dark btn-small" id='cancel-edit-point'>cancel</button>
          </form >
  `;
  return $html;
};

const renderEditPoint = function(points) {
  const $html = `
  <!-- to slide down on click of the article.add-point-card -->
  <form class="edit-point">
    <div>edit point in the map</div>
    <div class="form-group">
      <label for="title">point name</label>
      <input type="hidden" name="pointId" class="form-control" id="pointId"  placeholder="" value='${points.id}'>
      <input type="text" name="title" class="form-control" id="title"  placeholder="" value='${points.title}'>
    </div>
    <div class="form-group">
      <label for="description">description</label>
      <input type="text" name="description" class="form-control" id="description" placeholder="" value='${points.description}'>
    </div>
    <div class="form-group">
      <label for="image-url">image url</label>
      <input type="text" name="image_url" class="form-control" id="image_url" value='${points.image_url}'>
    </div>
    <div class="form-group">
      <label for="address_line_1">primary address information</label>
      <input type="text" name="address_line_1" disabled class="form-control" id="address_line_1" value='${points.address_line_1}'>
      <input type="hidden" name="address_line_1" class="form-control" id="address_line_1_hidden" >
    </div >
    <div class="form-group">
      <label for="address_line_2">secondary address information</label>
      <input type="text" name="address_line_2" disabled class="form-control" id="address_line_2" value='${points.address_line_2}'>
      <input type="hidden" name="address_line_2" class="form-control" id="address_line_2_hidden">
      </div>
            <div class="form-group">
              <label for="latitude">latitude</label>
              <input type="text" name="latitude" disabled class="form-control" id="latitude" value='${points.lat}' >
              <input type="hidden" name="latitude" class="form-control" id="latitude_hidden" >
            </div>
            <div class="form-group">
              <label for="longitude">longitude</label>
              <input type="text" name="longitude" disabled class="form-control" id="longitude" value='${points.lon}' >
              <input type="hidden" name="longitude" class="form-control" id="longitude_hidden" >
            </div>
            <button type="submit" class="btn btn-outline-dark btn-small">save</button>
            <button type="button" class="btn btn-outline-dark btn-small" id='cancel-edit-point'>cancel</button>
          </form >
  `;
  return $html;
};
