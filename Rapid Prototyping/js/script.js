
$(function () {

// Tooltip 

  var $tooltip = $('[data-toggle=tooltip]');

      $tooltip.each(function() {
        var options = $.extend({
          placement: 'right',
          trigger: 'hover focus',
          container: 'body'
        }, $(this).data())

        $(this).tooltip(options)
      });

// Dropdown show & hide

  $('[data-toggle="dropdown"]').dropdown('toggle')
  $('.wrapper-hide').hide();
  $('.wrapper-duplicate .select-options').change(function(){
    var selectedOption = $( "select option:selected" ).data('option');
    $('.wrapper-duplicate .wrapper-hide').each(function(){
      if ($(this).data('show') == selectedOption){
        $(this).show()
      }else{
        $(this).hide()
      }
    });
  });



  function secondDuplicated(){
  $('.duplicated .select-options').change(function(){
    var a = $(this).closest('.duplicated').index();
    var selectedOption = $( ".duplicated select option:selected" ).data('option');
    $('.duplicated .wrapper-hide').each(function(){
      if ($(this).data('show') == selectedOption){
        $(this).show()
      }else{
        $(this).hide()
      }
    });
  });
  }



// Duplicate form

  $('.add-subset').click(function(){

    $('.wrapper-duplicate .duplicate').clone().appendTo('.append').addClass('duplicated');
    secondDuplicated();
    return false;
  })

//Radio hide and show

  $('.yesno-options input').change(function(){

    if ($('.yesno-options input:checked').val() == 'yes'){
      $('.option-yes').show();
      $('.option-no').hide();
    }else{
      $('.option-no').show();
      $('.option-yes').hide();
    }
  });

  // Save functionality 

  $('[data-display=saved]').hide()
    $('[data-toggle=saved]').on("click", function(){
      $('[data-display=saved]').show()
    })

});








