$(function () {

  var $tooltip = $('[data-toggle=tooltip]');

      $tooltip.each(function() {
        var options = $.extend({
          placement: 'right',
          trigger: 'hover focus',
          container: 'body'
        }, $(this).data())

        $(this).tooltip(options)
      });

  $('[data-toggle="dropdown"]').dropdown('toggle')

});

$(function () {

  //radio
  var $collapseTrigger = $('[data-toggle=alt-collapse]');
  console.log($collapseTrigger);

  // $collapseTrigger.each( function(){
  // $collapseTarget = this.data("target")


})();



// Collapse alternatives
// --------------------
!function($) {
  // Collapse toggle
  // For use instead of the default collapse if there is a dropdown inside of the collapsed element.
  // the '.collapse' uses overflow: hidden causing the dropdown inside the collapsed element to be hidden
  // this uses jQuery show/hide (display: none/block)
  // works like tabs
  // use data-toggle="collapse-alt" on clickable element
  // use data-target="#target-element"
  // add the class "collapse-alt" to div#target-element
  var $collapseAlt = $('.collapse-alt')
  $collapseAlt.hide();

  var $collapseAltToggle = $('[data-toggle="collapse-alt"]')

  var collapseAltLoad = function() {
    $collapseAltToggle.each(function() {
      var $this = $(this),
        target = $this.data('target')

      // collapse-alt fix for collapse-alts with checkboxes
      $(target)[($this.is(':checked')) ? 'slideDown' : 'slideUp'](100)
    })
  }

  var toggleCollapseAlt = function(evt) {
    var $this = $(this),
      target = $this.data('target')

    $this.parents('.btn-group').removeClass('open')

    // don't break the checkboxes
    if (evt.target.nodeName === 'INPUT') {
      $(target).slideToggle(100)
      return
    } else {
      $(target).slideToggle(100)
    }

    evt.preventDefault()
  }

  // event handlers
  $(collapseAltLoad)
  // with inputs
  $(document)
    .on('change input', '[data-toggle="collapse-alt"]', toggleCollapseAlt)
    .on('click', '[data-toggle="collapse-alt"]', function (evt) {
      if (evt.target.nodeName === 'INPUT') {
        return
      }
      toggleCollapseAlt(evt)
    })

  // Collapse open only
  $('.collapse-open').hide();
  $('[data-toggle="collapse-open"]').on('click', function(evt) {
    var target = $(this).attr('data-target')
    $(target).slideDown(100)
    return false
  })

}(window.jQuery)


// Bootstrap Radio Button Group - plugin for collapse/tab hookup
// -------------------------------------------------------------
!function($) {

  'use strict'; // jshint ;_;

  $('[data-toggle=buttons-radio]').on('click', function(evt) {
    var target = this.getAttribute('data-target') || evt.target,
      value = evt.target.getAttribute('data-value'),
      method = this.getAttribute('data-target') !== null ? 'collapse' : 'tab',
      _default = this.getAttribute('data-default'),
      trigger = this.getAttribute('data-trigger'),
      compareValues, showHide = function() {
        if ($(target).hasClass('collapse-alt')) {
          $(target)[compareValues ? 'slideDown' : 'slideUp']()[compareValues ? 'addClass' : 'removeClass']('in')
        } else {
          $(target)[method](method === 'collapse' ? (compareValues ? 'show' : 'hide') : 'show')
        }
      }

    if (!target || evt.target.getAttribute('disabled') === 'disabled' || $(evt.target).hasClass('active')) {
      return
    }

    if (_default) {
      compareValues = !$(target).hasClass('in') // check to see if collapsible area is hidden and use that bool to determine whether to open/close
      // console.log(compareValues)
      //compareValues = value.toLowerCase() !== _default.toLowerCase()

      showHide()
    } else if (trigger) {
      compareValues = value.toLowerCase() === trigger.toLowerCase()

      if ($(target).height() === 0 && !compareValues) {
        return
      }

      showHide()
    } else { // default to tab
      $(target).tab('show')
    }

  })
}(window.jQuery)



