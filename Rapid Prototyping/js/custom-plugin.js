/* AUTO GENERATED FILE. DO NOT MANUALLY UPDATE.
   Created - 2016-04-18 03:04:05 

   Git Hash: 56777f4d36a43977a7a641162e872eef01fa89da (credit-card)
   Git Last Commit: "2016-04-15 18:14:48 -0400"
*/

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    var _OldCookies = window.Cookies;
    var api = window.Cookies = factory();
    api.noConflict = function () {
      window.Cookies = _OldCookies;
      return api;
    };
  }
}(function () {
  function extend () {
    var i = 0;
    var result = {};
    for (; i < arguments.length; i++) {
      var attributes = arguments[ i ];
      for (var key in attributes) {
        result[key] = attributes[key];
      }
    }
    return result;
  }

  function init (converter) {
    function api (key, value, attributes) {
      var result;

      if (arguments.length > 1) {
        attributes = extend({
          path: '/'
        }, api.defaults, attributes);

        if (typeof attributes.expires === 'number') {
          var expires = new Date();
          expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
          attributes.expires = expires;
        }

        try {
          result = JSON.stringify(value);
          if (/^[\{\[]/.test(result)) {
            value = result;
          }
        } catch (e) {}

        value = encodeURIComponent(String(value));
        value = value.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

        key = encodeURIComponent(String(key));
        key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
        key = key.replace(/[\(\)]/g, escape);

        return (document.cookie = [
          key, '=', value,
          attributes.expires && '; expires=' + attributes.expires.toUTCString(), // use expires attribute, max-age is not supported by IE
          attributes.path    && '; path=' + attributes.path,
          attributes.domain  && '; domain=' + attributes.domain,
          attributes.secure ? '; secure' : ''
        ].join(''));
      }

      if (!key) {
        result = {};
      }
      var cookies = document.cookie ? document.cookie.split('; ') : [];
      var rdecode = /(%[0-9A-Z]{2})+/g;
      var i = 0;

      for (; i < cookies.length; i++) {
        var parts = cookies[i].split('=');
        var name = parts[0].replace(rdecode, decodeURIComponent);
        var cookie = parts.slice(1).join('=');

        if (cookie.charAt(0) === '"') {
          cookie = cookie.slice(1, -1);
        }

        try {
          cookie = converter && converter(cookie, name) || cookie.replace(rdecode, decodeURIComponent);

          if (this.json) {
            try {
              cookie = JSON.parse(cookie);
            } catch (e) {}
          }

          if (key === name) {
            result = cookie;
            break;
          }

          if (!key) {
            result[name] = cookie;
          }
        } catch (e) {}
      }

      return result;
    }

    api.get = api.set = api;
    api.getJSON = function () {
      return api.apply({
        json: true
      }, [].slice.call(arguments));
    };
    api.defaults = {};

    api.remove = function (key, attributes) {
      api(key, '', extend(attributes, {
        expires: -1
      }));
    };

    api.withConverter = init;

    return api;
  }

  return init();
}));

if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}
if (!Array.prototype.some) {
  Array.prototype.some = function(fun/*, thisArg*/) {
    'use strict';

    if (this == null) {
      throw new TypeError('Array.prototype.some called on null or undefined');
    }

    if (typeof fun !== 'function') {
      throw new TypeError();
    }

    var t = Object(this);
    var len = t.length >>> 0;

    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++) {
      if (i in t && fun.call(thisArg, t[i], i, t)) {
        return true;
      }
    }

    return false;
  };
}

!(function ($) {
  'use strict';

    var DependentSelect = function (element, settings) {
    this.settings = settings;
    this.element = element;
    this.$primaryLink = $(element);
    this.$primaryUL = this.$primaryLink.siblings(".dropdown-menu");
    this.$primarySelect = this.$primaryLink.siblings("select");

    var dataSourceName = this.$primaryLink.data("dependent-data-source");
    this.dataSource = window[dataSourceName];
    this.dependentDropDownName = this.$primaryLink.data("dependent-dropdown");

    this.$secondaryLink = $("[data-toggle=dropdown][data-name=" + this.dependentDropDownName + "]");
    this.$secondaryUL = this.$secondaryLink.siblings(".dropdown-menu");
    this.$secondarySelect = this.$secondaryLink.siblings("select");

    this.$secondaryContainer = $("[data-dependent-container=" + this.dependentDropDownName + "]");
  };

  DependentSelect.prototype = {
        initialize: function () {
      var self = this;

      var primaryLIs = [];
      var primaryOptions = [];

      if (!!self.dataSource.primaryCaption) {
        primaryLIs.push($("<li></li>").append($("<a href='#'></a>").attr("data-value", "")
          .html(self.dataSource.primaryCaption)));
        primaryOptions.push($("<option></option>").attr("value", "")
          .html(self.dataSource.primaryCaption));
      }

      this.dataSource.items.forEach(function (item) {
        primaryLIs.push($("<li></li>").append($("<a href='#'></a>").attr("data-value", item.id).html(item.name)));
        primaryOptions.push($("<option></option>").attr("value", item.id).html(item.name));
      });

      self.$primaryUL.empty().append(primaryLIs);
      self.$primarySelect.empty().append(primaryOptions);

      var firstPrimaryOption = self.$primarySelect.find("option:first");
      if (firstPrimaryOption.length === 1) {
        self.$primaryLink.html(firstPrimaryOption.text());
        self.refreshDependentDropDown();
      } else {
        self.$secondaryContainer.addClass("hide");
      }

      this.wireUpChangeEvents();
    },

        triggerDependentChosenEvent: function() {
      var isPrimaryChosen = !!this.$primarySelect.val();
      var isSecondaryChosen = this.$secondarySelect.find("option").length === 0 ||
          !!this.$secondarySelect.val();
      if (isPrimaryChosen && isSecondaryChosen) {
        this.$primarySelect.trigger("dependent.dropdown.item-chosen");
      }
      else {
        this.$primarySelect.trigger("dependent.dropdown.item-not-chosen");
      }
    },

    wireUpChangeEvents: function() {
      $(document).on('change updated.dropdown', "#" + this.$primarySelect.attr("id"), this.handlePrimaryChanged.bind(this));
      $(document).on('change updated.dropdown', "#" + this.$secondarySelect.attr("id"), this.handleSecondaryChanged.bind(this));
    },

    handleSecondaryChanged: function() {
      this.triggerDependentChosenEvent();
    },

    handlePrimaryChanged: function() {
      this.refreshDependentDropDown();
      this.triggerDependentChosenEvent();
    },

        refreshDependentDropDown: function () {
      var self = this;
      var primaryItem = this.dataSource.items.filter(function (ele) {
        return self.$primarySelect.val() === ele.id;
      });

      var secondaryLIs = [];
      var secondaryOptions = [];

      if (!!primaryItem && primaryItem.length === 1 && primaryItem[0].secondary.length > 0) {

        if (!!self.dataSource.secondaryCaption) {
          secondaryLIs.push($("<li></li>").append($("<a href='#'></a>").attr("data-value", "")
            .html(self.dataSource.secondaryCaption)));
          secondaryOptions.push($("<option></option>").attr("value", "")
            .html(self.dataSource.secondaryCaption));
        }
        primaryItem[0].secondary.forEach(function (item) {
          secondaryLIs.push($("<li></li>").append($("<a href='#'></a>").attr("data-value", item.id).html(item.name)));
          secondaryOptions.push($("<option></option>").attr("value", item.id).html(item.name));
        });
      }

      self.$secondaryUL.empty().append(secondaryLIs);
      self.$secondarySelect.empty().append(secondaryOptions);
      self.$secondaryContainer[secondaryLIs.length === 0 ? "addClass" : "removeClass"]("hide");
      if (primaryItem.length > 0 && primaryItem[0].secondary.length > 0) {
        self.$secondaryLink.html(self.dataSource.secondaryCaption || primaryItem[0].secondary[0].name);
      }
    },

        wireUpAllDependentSelects: function () {
      $("[data-dependent-data-source]").dependentSelect();
    }

  };

    $.fn.dependentSelect = function (option) {
    var settings = $.extend({
      dataSource: []
    }, option);

    return this.each(function () {
      var parentContainer = this;
      var dependentSelect = new DependentSelect(parentContainer, settings);
      dependentSelect.initialize();
    });
  };

  $(function () {
    DependentSelect.prototype.wireUpAllDependentSelects();
  });

})(window.jQuery);

(function(root) {
  'use strict';
  if (!root.console) {
    root.console = {};
    root.console.log = function() {};
    root.console.clear = function() {};
  }
})(this);

var Tangerine = Tangerine || {};
Tangerine.utils = {
  formatTemplate: function (stringTemplate) {
    'use strict';
    var args = Array.prototype.slice.call(arguments, 1);
    return stringTemplate.replace(/{(\d+)}/g, function (match, number) {
      return typeof args[number] !== 'undefined' ? args[number] : match;
    });
  },
  applyDataObjectToTemplate: function (templateString, dataObject) {
    'use strict';
    var key,
      value,
      regex;
    for (key in dataObject) {
      regex = new RegExp("_" + key + "_", "g");
      value = dataObject[key];
      templateString = templateString.replace(regex, value);
    }
    return templateString;
  },

  generateUniqueTemplate: function(templateId, repeaterSelector, uniqueIdSelector, values, startOffset) {
    var templateHtml = $(templateId).html()
      , rowCount = $(repeaterSelector).length
      , template
      , parsedHtml;

    values = values || {};
    startOffset = startOffset || 0;

    while (true) {
      values.tableRowId = rowCount + startOffset;

      template = Tangerine.utils.applyDataObjectToTemplate(
        templateHtml, values );
      parsedHtml = $($.parseHTML(template)[1]);
      var uniqueIdField = $(parsedHtml).find(uniqueIdSelector)
        , payeeInExistingTable = $(repeaterSelector + " #" + uniqueIdField.attr("id"));
      if (payeeInExistingTable.length > 0) {
        rowCount++;
        continue;
      }
      break;
    }

    return parsedHtml;
  },

  select: {
    setupSelect: function (element) {
      var $ele = $(element);
      if ($ele.siblings('select')[0]) {
        return;
      }

      var select = document.createElement('select'),
        defaultOption = document.createElement('option'),
        $initializer = $ele.siblings('[data-toggle="dropdown"]'),
        defaultValue = $initializer.data('default'),

        resetCollapse = function (evt) {
          var target, $target;
          for (var i = 0; i < this.options.length; i++) {
            target = this.options[i].getAttribute('data-target');
            $target = $(target);
            if (this.options[i].value === this.value) {
              if ($target.hasClass('collapse')) {
                $($this.data('target')).collapse('show')
              } else if ($target.hasClass('collapse-alt')) {
                $($this.data('target')).show()
              } else if ($target.hasClass('tab-pane')) {
                $(this).attr('data-target', target).tab('show')
              }
            } else {
              $target.hasClass('collapse') && $target.hasClass('in') && $target.collapse('hide')
            }
          }
          $(this).trigger('updated.dropdown');
        };

      if (!$initializer.data('name')) {
        return;
      }

      select.className = 'hidden-desktop';
      select.name = $initializer.data('name');
      select.id = select.name;
      select.size = 1;

      if ($initializer.is('.disabled, :disabled')) {
        select.disabled = 'disabled';
      }

      defaultOption.text = $initializer.text();
      defaultOption.value = defaultValue || '';
      $(select).attr('data-rules', $initializer.data('rules'));

      $ele.find('li').each(function () {
        var option = document.createElement('option');
        option.text = $(this).find('a').text();
        option.value = $(this).find('a').data('value');

        $(option).attr('data-target', $(this).find('a').data('target'));

        select.appendChild(option);
      });
      $(select).find("option").filter(function() {
        return $(this).val() === defaultOption.value || $(this).text() === defaultOption.text;
      }).prop('selected', true);

      $(select).on('change', resetCollapse);

      $ele.parents('.btn-group').append(select);
    }
  }
};
!function($) {

  'use strict'; // jshint ;_;

  if ($('html').hasClass('touch')) {
    var isBB = window.navigator.userAgent.indexOf('BB10') !== -1 && window.navigator.userAgent.indexOf('Mobile') !== -1,
      touchEvent = isBB ? 'click.collapse.data-api' : 'touchend.collapse.data-api click.collapse.data-api'
      ,
      collapse = function (evt, ref) {
        evt.preventDefault()
        var $this = $(ref || this)
          , href
          , target = $this.attr('data-target') || evt.preventDefault() || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
          , option = $this.data('toggle') ? 'toggle' : $this.data()

        $this[$(target).height() !== 0 ? 'addClass' : 'removeClass']('collapsed') // TQA00394990
        $(target).collapse(option)
      }
    $(document)
      .off('click.collapse.data-api', '[data-toggle=collapse]')
      .on(touchEvent, '[data-toggle=collapse]', function (evt) {
        if (evt.target.nodeName === 'INPUT') {
          return
        }
        collapse(evt, this)
      })
      .on('change', 'input[data-toggle=collapse]', collapse)
  }
  $(document)
    .on('dblclick.collapse.data-api', 'input[data-toggle=collapse]', function (evt) {
      this.checked = !this.checked
    })
    .on('show.collapse.data-api hide.collapse.data-api', $('input[data-toggle=collapse]').data('target'), function (evt) {
      $('[data-target="#' + evt.target.id + '"]').attr('disabled', 'disabled')
    })
    .on('shown.collapse.data-api hidden.collapse.data-api', $('input[data-toggle=collapse]').data('target'), function (evt) {
      $('[data-target="#' + evt.target.id + '"]').attr('disabled', null)
    })

}(window.jQuery)
!function($) {

  'use strict'; // jshint ;_;

  var isOpen = false
    , windowWidth = $(window).width()
    , $view = $('.view')
    , $popoutnav = $('#popout-nav')
    , $frame = $('.frame')
    , moveLeftPX = '250px'
    , togglePopoutNav = function (evt, target) {
      isOpen = $popoutnav.hasClass('open')
      var isDesktopHeaderVisible = $(".header-main").is(":visible");

      if (isDesktopHeaderVisible) {
        $($frame).css({left : 0});
        $view.off('touchstart.popoutnav click.popoutnav');
      }

      if (((evt.target.id !== 'mobile-btn-open-nav' && (!evt.target.parentNode
        || evt.target.parentNode.id !== 'mobile-btn-open-nav'))
        && evt.target.id !== 'mobile-overlay') || isDesktopHeaderVisible) {
        return
      }
      if (evt.target.id === 'mobile-overlay' && !isOpen) {
        return
      }

      evt.preventDefault();

      var $this = target ? $(target) : $(evt.target)
      if (!isOpen) {
        $($frame).css({left : moveLeftPX});
        $('.menu-wrapper').scrollTop(0)
        $view.on('touchstart.popoutnav click.popoutnav', function (evt) {
          var isDesktopHeaderVisible = $(".header-main").is(":visible");
          if (!isDesktopHeaderVisible) {
            evt.preventDefault();
          }
        });
      } else {
        $($frame).css({left : 0});
        $view.off('touchstart.popoutnav click.popoutnav')
      }

      $popoutnav.toggleClass('open')
      $('#mobile-overlay').toggleClass('is-active')
    }

    , onRotate = function (evt) {
      switch (window.orientation) {
        case 90:
        case -90:
          (windowWidth > 767) && $popoutnav.hasClass('open') && $('.view').off('touchstart.popoutnav click.popoutnav')
          $('#mobile-overlay').addClass('is-hidden')
          break
        default:
          if ($popoutnav.hasClass('open')) {
            $('#mobile-overlay').removeClass('is-hidden')
            $('.view').on('touchstart.popoutnav click.popoutnav', function (evt) { evt.preventDefault() })
          }
          break
      }
    }

  $('<div class="mobile-overlay" id="mobile-overlay"></div>').appendTo('.frame')

  $(document)
    .on('touchend.popoutnav click.popoutnav', togglePopoutNav)
    .on('orientationchange', onRotate)

}(window.jQuery)
!function() {

  var $dropdownMenu = $('[data-toggle="dropdown"]').siblings('.dropdown-menu'),
    caret = '&nbsp;<span class="icon-caret-down"></span>',
    updateDropDown = function(evt) {
      evt.preventDefault()

      var $this = $(this),
        target = $this.data('target'),
        resetCollapse = function() {
          $this
            .parents('.dropdown-menu')
            .find('a')
            .each(function() {
              if (!$(this).data('target')) {
                return
              }

              $($(this).data('target')).each(function() {
                toggle(this, 'hide')
              })
              $(this).parent().removeClass('active')
            })
        }
        , toggle = function(self, action) {
          if (typeof action !== 'string') {
            throw 'TypeError'
          }
          if ($(self).hasClass('collapse')) {
            $(self).collapse(action)
          } else if ($(self).hasClass('collapse-alt')) {
            $(self)[action]()
          } else if ($(self).hasClass('tab-pane')) {
            $this.tab('show')
          }
        }

      $this
        .parents('.dropdown-menu')
        .siblings('[data-toggle="dropdown"]')
        .text($this.text())
        .append(caret) //update dropdown

      $this
        .siblings('select')
        .attr('disabled', $this.is('.disabled, :disabled') ? 'disabled' : false)

      $this
        .parents('.dropdown-menu')
        .siblings('select')
        .val($(evt.target).data('value')) //update hidden select box
        .trigger('updated.dropdown')

      if (target) {
        resetCollapse()
        $(target).each(function() {
          toggle(this, 'show')
        })
      } else {
        $($(this).parent().siblings().find('[data-target]').data('target')).each(function() {
          ($(this).hasClass('in') || $(this).is(':visible')) && toggle(this, 'hide')
        })
      }
      $(document).trigger("dropDown.value", [$(this).attr("data-value"), evt.currentTarget]);

    }

  $dropdownMenu.each(function(index, ele) {
    Tangerine.utils.select.setupSelect(ele);
  });

  $('[data-toggle="dropdown"]').siblings('.dropdown-menu');

  $(document)
    .on('touchend.dropdown click.dropdown', '[data-toggle="dropdown"] + .dropdown-menu a', updateDropDown)
    .on('updated.dropdown', '[data-toggle="dropdown"]', updateDropDown)

  $('.modal').on('shown', function() {
    $(this).find($('[data-toggle="dropdown"]').siblings('.dropdown-menu')).each(function(index, ele) {
      Tangerine.utils.select.setupSelect(ele);
    });
  })
  $(document).on('change.dropdown', '[data-toggle="dropdown"] ~ select', function(evt) {
    $(this).trigger('updated.dropdown');
    var selectedVal = $(this).val();
    var match = $(this).siblings('.dropdown-menu').find('[data-value]').filter(function() {
      return $(this).attr("data-value") === selectedVal;
    });
    if (!!match) match.trigger('click.dropdown');
  });
}(window.jQuery)
!function($) {

  'use strict'; // jshint ;_;

  var radioButtonSelector = '[data-toggle=buttons-radio]'

    ,
    radioBtnGroupHookup = function(evt) {
      if (evt.target && evt.target.getAttribute('disabled') === 'disabled') {
        return
      }
      if (this.getAttribute('disabled') && !this.getAttribute('data-name') && !this.getAttribute('data-default') && !typeof evt !== 'number') {
        return
      }

      var $this = $(this),
        hiddenEl, hiddenSelector = '[name=' + $this.data('name') + ']',
        options = {
          name: $this.data('name'),
          'default': $this.data('default') // using object string property because of IE8 bug
        }

        , setupHidden = function(options) {
          var hidden = document.createElement('input')
          hidden.type = 'hidden'
          hidden.id = options.name
          hidden.name = options.name
          hidden.value = options['default'] || '' // using array notation because of IE8 bug
          $(hidden).attr('data-rules', $this.data('rules'))

          return hidden
        }

        , updateHidden = function(target) {
          $(hiddenSelector).val($(target).data('value'))
            .trigger('change')
          $this.trigger('updated.button.data-api')
        }

      !$this.find(hiddenSelector)[0] && $this.append(hiddenEl = setupHidden(options))

      evt.target && !!$(evt.target).data("value") && updateHidden(evt.target)
    }
    , modalSetup = function(evt) {
      var $this = $(this),
        $btnRadio = $this.find(radioButtonSelector)

      if ($btnRadio[0]) { // Check if BS radio are available, if so hook them up to form and exit out
        $btnRadio.each(radioBtnGroupHookup)
        return
      }

      $(document).ajaxSuccess(function(evt, xhr, settings) { //Listen for successful ajax event then setup BS radios
        $this.find(radioButtonSelector).each(radioBtnGroupHookup)
      })
    }
  $(radioButtonSelector).each(radioBtnGroupHookup)
  $(document).on('click.button.data-api', radioButtonSelector, radioBtnGroupHookup)
  $(document).on('show', '.modal', modalSetup)

}(window.jQuery)
!function($) {

  'use strict'; // jshint ;_;

  $('[data-toggle=buttons-radio]').on('click', function(evt) {
    var target = this.getAttribute('data-target') || evt.target,
      value = evt.target.getAttribute('data-value'),
      method = this.getAttribute('data-target') !== null ? 'collapse' : 'tab',
      _default = this.getAttribute('data-default'),
      trigger = this.getAttribute('data-trigger'),
      compareValues,
      showHide = function() {
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
!function($) {

  'use strict'; // jshint ;_;

  var library = {}

    , createHiddenLink = function(evt) {
      var $this = $(this),
        $hiddenEl = document.createElement('input')
      $hiddenEl.type="hidden"
      $hiddenEl.value=($this.data('default') || '')
      $hiddenEl.name=$this.data('name')
      $hiddenEl.id=$this.data('name')

      $this
        .parent()
        .append($hiddenEl)
    }

    , updateHidden = function(item) {
      var value = library[item.toUpperCase()];
      $('#' + this.$element.data('name')).val(value);
      this.$element
        .trigger('updated.autocomplete.data-api', [item, value])
        .focusout(function(evt) {
          if(!evt.currentTarget.value && evt.currentTarget.value == "") {
            $('#' + evt.currentTarget.dataset.name).attr("value", "");
          }
        });

      return item
    }

    , populateAutocomplete = function() {
      var $this = $(this),
        dataSource = $this.data('source').split('|'),
        source = [],
        ruleMap = $this.data('rules'),
        rules = {}, rule = []

      for (var i = 0; i < dataSource.length; i++) {
        dataSource[i] = dataSource[i].split(':')
        library[dataSource[i][0]] = $.trim(dataSource[i][1])
        if ($this.attr("id")=="StreetType") {
          source.push(dataSource[i][0])
        }
        else {
          source.push(dataSource[i][0].toProperCase())
        }

      }

      if (ruleMap) {
        ruleMap = ruleMap.split(',')
        for (var i = 0; i < ruleMap.length; i += 1) {
          rule = ruleMap[i].split(':')
          rules[rule[0]] = rule[1]
        }

        var list = source.join('|').replace(/,/g, '+').replace(/[\|]/g, ',').split(',')
        for (var i = 0; i < list.length; i++) {
          list[i] = list[i].replace(/[\+]/g, ',')
        }

        rules.list = list

        $this.trigger('updated.validation.rules', [rules])
      }

      $this
        .typeahead({
          items: 10,
          minLength: $this.data('min-length') || 3,
          source: source,
          updater: updateHidden
        })
    }

  String.prototype.toProperCase = function() {
    return this.toLowerCase().replace(/^(.)|\s(.)/g,
      function($1) {
        return $1.toUpperCase()
      })
  }

  $('[data-toggle=autocomplete]').each(createHiddenLink)

  $(document)
    .on('focus.autocomplete.data-api', '[data-toggle=autocomplete]', populateAutocomplete)

    .on('shown.modal.data-api', '.modal', function () {
      $(this)
        .find('[data-toggle=autocomplete]')
        .each(createHiddenLink)
        .on('focus.autocomplete.data-api', populateAutocomplete)
    })

}(window.jQuery)
!function($) {

  'use strict'; // jshint ;_;


  var dataLibrary = {}, chosenCountry

    , setProvState = function($el) {
      var $hiddenEl = document.createElement('input')
      $hiddenEl.type="hidden"
      $hiddenEl.value=($el.data('default') || '')
      $hiddenEl.name=$el.data('name')
      $hiddenEl.id=$el.data('name')

      $el.parent().append($hiddenEl)
    }

    , getProvStateData = function(query, process) {
      var dataSource = this.$element.data('source').split('|'),
        parsedSource = [],
        ruleMap = this.$element.data('rules'),
        rules = {}, rule

      chosenCountry = $('#' + $(this.$element.data('dependency')).data('name')).val()

      for (var i = 0; i < dataSource.length; i++) {
        var map = $.trim(dataSource[i]).slice(3).split(':')

        if (!dataLibrary[dataSource[i].slice(0, 2)]) {
          dataLibrary[dataSource[i].slice(0, 2)] = {}
        }

        dataLibrary[dataSource[i].slice(0, 2)][$.trim(map[0])] = $.trim(map[1])

        if (dataSource[i].slice(0, 2).toUpperCase() === chosenCountry.toUpperCase()) {
          parsedSource.push(map[0].toProperCase())
        }
      }

      if (ruleMap) {
        ruleMap = ruleMap.split(',')
        for (var i = 0; i < ruleMap.length; i += 1) {
          rule = ruleMap[i].split(':')
          rules[rule[0]] = rule[1]
        }

        var list = parsedSource.join('|').replace(/,/g, '+').replace(/[\|]/g, ',').split(',')
        for (var i = 0; i < list.length; i++) {
          list[i] = list[i].replace(/[\+]/g, ',')
        }

        rules.list = list

        this.$element.trigger('updated.validation.rules', [rules])
      }

      process(parsedSource)
    }

    , applyAutocomplete = function() {
      var $provState = $(this),
        $hiddenEl = $('#' + $provState.data('name'))

        ,
        updateHidden = function(item) {
          $hiddenEl.val(dataLibrary[chosenCountry][item.toUpperCase()])
          return item
        }

      $provState.typeahead({
        items: 10,
        minLength: $provState.data('min-length') || 2,
        source: getProvStateData,
        updater: updateHidden
      })
    }

    , clearProvState = function(evt, item, value) {
      var $provState = $('[data-dependency=#' + evt.target.id + ']'),
        $hiddenEl = $('#' + $provState.data('name'))
      $provState.attr('disabled', (value === 'CA' || value === 'US') ? null : 'disabled')

      $provState.val('')
      $hiddenEl.val('')
    }

    , showPostalcode = function(evt, item, value) {
      var $postalCA = $('[data-postal="CA"]'),
        $postalUS = $('[data-postal="US"]'),
        $postalOther = $('[data-postal="Others"]')

      if (value === 'CA') {
        $postalCA.show()
        $postalUS.hide()
        $postalOther.hide()
      } else if (value === 'US') {
        $postalCA.hide()
        $postalUS.show()
        $postalOther.hide()
      } else {
        $postalCA.hide()
        $postalUS.hide()
        $postalOther.show()
      }
    }

  $('[data-autocomplete=province]')
    .on('focus.autocomplete.data-api', applyAutocomplete)
    .each(function() {
      setProvState($(this))
      $($(this).data('dependency')).on('updated.autocomplete.data-api', clearProvState)
      $($(this).data('dependency')).on('updated.autocomplete.data-api', showPostalcode)
      $('[data-postal="US"]').hide()
      $('[data-postal="Others"]').hide()
    })



}(window.jQuery)
!function($) {

  'use strict'; // jshint ;_;

  var Injector = function(element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.injector.defaults, options)
  }

  Injector.prototype.inject = function() {
    var $el = this.$element
    $.support.cors = true
    if (this.options.remote === '' || this.options.remote === '') {
      return
    }
    else {
      $el.load(this.options.remote, function() {
        $el.trigger('injected')
      })
    }
  }
  var old = $.fn.injector

  $.fn.injector = function() {
    return this.each(function() {
      var $this = $(this),
        data = new Injector(this, $this.data())

      data.inject()
    })
  }

  $.fn.injector.defaults = {}

  $.fn.injector.Constructor = Injector

  $.fn.injector.noConflict = function() {
    $.fn.injector = old
    return this
  }
  $(function() {
    $('[data-toggle=injector]').injector()
    $(document)
      .on('injected', '[data-toggle=injector]', function(evt) {
        if (!$(this).data('injected')) {
          $(this).find('[data-toggle=injector]').injector()
          $(this).data('injected', true)
        }
      })
  })

}(window.jQuery)
!function($) {

  'use strict'; // jshint ;_;

  var $footer = $('.footer'),
    $footerBody = $('#footer-body'),
    footerHeight = $footerBody.height(),
    closedHeight = 0,
    $window = $(window),
    $document = $(document),
    $content = $('.content'),
    onClick = function (evt) {
      evt.preventDefault()
      $footer.toggleClass('open').trigger($footer.hasClass('open') ? 'open.footer' : 'closed.footer')
      $footerBody.css('height', $footer.hasClass('open') ? footerHeight : closedHeight)
    },
    tabletCheck = function () {
      return window.matchMedia && window.matchMedia("(min-width: 767px) and (max-width: 979px)").matches
    },
    viewportCheck = function () {
      return $window.height() > ($('.mobile-header-top').outerHeight(true) + $content.outerHeight(true) + $footer.outerHeight(true))
    },
    stickFooter = function (evt) {
      $content
        .css({
          'height': '100%',
          'margin-bottom': -($('.footer').height() + $('.mobile-header-top').outerHeight(true))
        })
    },
    unstickFooter = function () {
      $content
        .css({
          'height': null,
          'margin-bottom': null
        })
    }

  $footerBody.css('height', closedHeight)
  $footer.addClass('navbar-fixed-bottom')
  $document.on('touchend.stickyfooter click.stickyfooter', '.footer-see-more', onClick)

  $window.on('orientationchange.stickyfooter resize.stickyfooter', function (evt) {
    if (tabletCheck() && viewportCheck()) {
      $document.on('transitionend.stickyfooter', stickFooter)
    } else {
      $document.off('transitionend.stickyfooter', stickFooter)
      unstickFooter()
    }
  })

  if (tabletCheck() && viewportCheck()) {
    stickFooter()
  }
}(window.jQuery)

/*!
 *  jQuery Smart Banner
 *  Copyright (c) 2012 Arnold Daniels <arnold@jasny.net>
 *  Based on 'jQuery Smart Web App Banner' by Kurt Zenisek @ kzeni.com
 *  Edits by: @snypelife <brettmrogerson@gmail.com>
 */
!function($) {

  'use strict'; // jshint ;_;

  var SmartBanner = function(options) {
    this.origHtmlMargin = parseFloat($('html').css('margin-top')) // Get the original margin-top of the HTML element so we can take that into account
    this.options = $.extend({}, $.smartbanner.defaults, options)
    this.tap = 'touchend.smart-banner click.smart-banner'

    var standalone = navigator.standalone // Check if it's already a standalone web app or running within a webui view of an app (not mobile safari)
      , UA = navigator.userAgent
    if (this.options.force) {
      this.type = this.options.force
    }
    else if (UA.match(/iPad|iPhone|iPod/i) != null) {
      if (UA.match(/Safari/i) != null && (UA.match(/CriOS/i) != null || window.Number(UA.substr(UA.indexOf('OS ') + 3, 3).replace('_', '.')) < 6)) {
        this.type = 'ios' // Check webview and native smart banner support (iOS 6+)
      }
    }
    else if (UA.match(/Android/i) != null) {
      this.type = 'android'
    } else if (UA.match(/Windows NT 6.2/i) != null && UA.match(/Touch/i)) { // look only for win8 touch devices
      this.type = 'windows'
    }
    if (!this.type || standalone || this.getCookie('sb-closed') || this.getCookie('sb-installed')) {
      return
    }
    this.scale = this.options.scale == 'auto' ?
    $(window).width() / window.screen.width :
      this.options.scale

    if (this.scale < 1) {
      this.scale = 1
    }
    var meta;
     if (this.type ==='android') {
	   meta = 'meta[name="google-play-app"]';
	 }
	 else if (this.type ==='ios') {
	   meta = 'meta[name="apple-itunes-app"]';
	 }

    this.title = this.options.title ? this.options.title : $('title').text().replace(/\s*[|\-Â·].*$/, '')
    this.author = this.options.author ? this.options.author :
      ($('meta[name="author"]').length ? $('meta[name="author"]').attr('content') :
        window.location.hostname)
    this.create()
    this.show()
    this.listen()
  }

  SmartBanner.prototype = {
    constructor: SmartBanner

    , create: function() {
      var iconURL
        , link = (this.options.url ? this.options.url :
        (this.type === 'windows' ? 'ms-windows-store:PDP?PFN=' + this.pfn :
          (this.type === 'android' ? 'market://details?id=' :
          'https://itunes.apple.com/' + this.options.appStoreLanguage + '/app/id')) + this.appId)
        , inStore = this.options.price ? this.options.price + ' - ' +
        (this.type === 'android' ? this.options.inGooglePlay :
          this.type === 'ios' ? this.options.inAppStore :
            this.options.inWindowsStore) : ''
        , gloss = this.options.iconGloss === null ? (this.type === 'ios') : this.options.iconGloss

      $('.view').prepend('<div id="smartbanner" class="smartbanner ' + this.type + '">' +
      '<div class="sb-container">' +
      '<a href="#" class="sb-close">&times;</a>' +
      '<span class="sb-icon"></span>' +
      '<div class="sb-info">' +
      '<strong>' + this.title + '</strong>' +
      '<span>' + this.author + '</span>' +
      '<span>' + inStore + '</span>' +
      '</div>' +
      '<a href="' + link + '" class="sb-button">' +
      '<span>' + this.options.button + '</span>' +
      '</a>' +
      '</div>' +
      '</div>')

      if (this.options.icon) {
        iconURL = this.options.icon
      }
      else if ($('link[rel="apple-touch-icon-precomposed"]').length > 0) {
        iconURL = $('link[rel="apple-touch-icon-precomposed"]').attr('href')
        if (this.options.iconGloss === null) {
          gloss = false
        }
      }
      else if ($('link[rel="apple-touch-icon"]').length > 0) {
        iconURL = $('link[rel="apple-touch-icon"]').attr('href')
      }
      else if ($('meta[name="msApplication-TileImage"]').length > 0) {
        iconURL = $('meta[name="msApplication-TileImage"]').attr('content')
      }
      else if ($('meta[name="msapplication-TileImage"]').length > 0) {
        iconURL = $('meta[name="msapplication-TileImage"]').attr('content')
      }

      if (iconURL) {
        $('#smartbanner .sb-icon').css('background-image', 'url(' + iconURL + ')')
        if (gloss) {
          $('#smartbanner .sb-icon').addClass('gloss')
        }
      } else {
        $('#smartbanner').addClass('no-icon')
      }

      this.bannerHeight = $('#smartbanner').outerHeight() + 2

      if (this.scale > 1) {
        $('#smartbanner').css({
          'top': parseFloat($('#smartbanner').css('top')) * this.scale
          , 'height': parseFloat($('#smartbanner').css('height')) * this.scale
        })

        $('#smartbanner .sb-container').css({
          '-webkit-transform': 'scale(' + this.scale + ')'
          , '-msie-transform': 'scale(' + this.scale + ')'
          , '-moz-transform': 'scale(' + this.scale + ')'
          , 'width': $(window).width() / this.scale
        })

      }
    }

    , listen: function() {
      $('#smartbanner .sb-close').on(this.tap, $.proxy(this.close, this));
      $('#smartbanner .sb-button').on(this.tap, $.proxy(this.install, this));
    }

    , show: function (callback) {
      /*$('#smartbanner')
       .stop()
       .animate({top:0},this.options.speedIn)
       .addClass('shown')
       $('html').animate({
       marginTop: this.origHtmlMargin + (this.bannerHeight * this.scale)
       }
       , this.options.speedIn
       , 'swing'
       , callback)*/
    }

    , hide: function (callback) {
      /*$('#smartbanner').stop().css({
       height: 0//-1 * this.bannerHeight * this.scale
       }
       , this.options.speedOut)*/
      $('#smartbanner')
        .collapse('hide')
        .on('hidden', function() {
          $(this).addClass('hidden')
        })
      /*$('html').animate({
       marginTop: this.origHtmlMargin
       }
       , this.options.speedOut
       , 'swing'
       , callback)*/
    }

    , close: function () {
      this.hide()
      this.setCookie('sb-closed', 'true', this.options.daysHidden)
    }

    , install: function () {
      this.hide()
      this.setCookie('sb-installed', 'true', this.options.daysReminder)
    }

    , setCookie: function (name, value, exdays) {
      var exdate = new Date()
      exdate.setDate(exdate.getDate() + exdays)
      value = escape(value) + ((exdays == null) ? '' : '; expires=' + exdate.toUTCString())
      document.cookie = name + '=' + value + '; path=/;'
    }

    , getCookie: function (name) {
      var i, x, y, ARRcookies = document.cookie.split(";")
      for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="))
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1)
        x = x.replace(/^\s+|\s+$/g, "")
        if (x == name) {
          return unescape(y)
        }
      }
      return null
    }
  }

  $.smartbanner = function(option) {
    var $window = $(window),
      data = $window.data('typeahead'),
      options = typeof option == 'object' && option
    if (!data) $window.data('typeahead', (data = new SmartBanner(options)))
    if (typeof option == 'string') data[option]()
  }

    if( $("html").attr("lang") == "fr-CA" )
  {
  	$.smartbanner.defaults = {
      title: null // What the title of the app should be in the banner (defaults to <title>)
    , author: null // What the author of the app should be in the banner (defaults to <meta name="author"> or hostname)
    , price: 'Gratuit' // Price of the app
    , appStoreLanguage: 'ca' // Language code for App Store
    , inAppStore: 'sur le App Store' // Text of price for iOS
    , inGooglePlay: 'sur Google Play' // Text of price for Android
    , inWindowsStore: 'need Translation' //Text of price for Windows
    , icon: null // The URL of the icon (defaults to <meta name="apple-touch-icon">)
    , iconGloss: null // Force gloss effect for iOS even for precomposed
    , button: 'Voir' // Text for the install button
    , url: null // The URL for the button. Keep null if you want the button to link to the app store.
    , scale: 'auto' // Scale based on viewport size (set to 1 to disable)
    , speedIn: 300 // Show animation speed of the banner
    , speedOut: 400 // Close animation speed of the banner
    , daysHidden: 15 // Duration to hide the banner after being closed (0 = always show banner)
    , daysReminder: 90 // Duration to hide the banner after "VIEW" is clicked *separate from when the close button is clicked* (0 = always show banner)
    , force: null // Choose 'ios', 'android' or 'windows'. Don't do a browser check, just always show this banner
  }}
  else{
  $.smartbanner.defaults = {
    title: null // What the title of the app should be in the banner (defaults to <title>)
    , author: null // What the author of the app should be in the banner (defaults to <meta name="author"> or hostname)
    , price: 'FREE' // Price of the app
    , appStoreLanguage: 'ca' // Language code for App Store
    , inAppStore: 'On the App Store' // Text of price for iOS
    , inGooglePlay: 'In Google Play' // Text of price for Android
    , inWindowsStore: 'In the Windows Store' //Text of price for Windows
    , icon: null // The URL of the icon (defaults to <meta name="apple-touch-icon">)
    , iconGloss: null // Force gloss effect for iOS even for precomposed
    , button: 'View' // Text for the install button
    , url: null // The URL for the button. Keep null if you want the button to link to the app store.
    , scale: 'auto' // Scale based on viewport size (set to 1 to disable)
    , speedIn: 300 // Show animation speed of the banner
    , speedOut: 400 // Close animation speed of the banner
    , daysHidden: 15 // Duration to hide the banner after being closed (0 = always show banner)
    , daysReminder: 90 // Duration to hide the banner after "VIEW" is clicked *separate from when the close button is clicked* (0 = always show banner)
    , force: null // Choose 'ios', 'android' or 'windows'. Don't do a browser check, just always show this banner
  }}

  $.smartbanner.Constructor = SmartBanner

  $(function() {
    $.smartbanner({
      daysHidden: 14,
      daysReminder: 30,
      scale: 1,
      title: 'Tangerine'
    })
  })

}(window.jQuery)

!function($) {

  'use strict'; // jshint ;_;

  var tap = 'touchend.print click.print'

  $(document).on(tap, '[data-toggle=print]', function (evt) {
    evt.preventDefault()
    window.print()
  })

}(window.jQuery)

!function($) {

  'use strict'; // jshint ;_;

  var $sidebarCollapse = $('#sidebar-left .sidebar-left-actions [data-toggle=collapse]'),
    animating = false

  $sidebarCollapse.on('click', function(evt) {
    if (!animating) {
      animating = true
      $(this).parent().toggleClass('opened')
    }
  })

  $sidebarCollapse.each(function() {
    $($(this).attr('href')).on('shown hidden', function(evt) {
      animating = false
    })
  })
}(window.jQuery)

!function($) {

  'use strict'; // jshint ;_;

  if (!$('#orange-alerts')[0]) {
    return
  }
  $('[name=DisableAll]').on('change', function(evt) {
    $($(this).data('target')).collapse(this.id === 'orange-alerts-choice-yes' ? 'show' : 'hide')
  })
}(window.jQuery)

!function ($) {

  'use strict'; // jshint ;_;

  var $btnTitle
    , $this
    , $target
    , target
    , collapseLoop = function () {
      $this = $(this)
      target = $this.data('target')
      $btnTitle = $this.find('.btn-dynamic-title')

      $(target).data('callee', {
        $el: $this
        , currText: $btnTitle.text()
        , altText: $btnTitle.data('alt-title')
      }).on('hide show', toggleTitle)
    }
    , toggleTitle = function (evt) {
      var callee = $(this).data('callee')
      callee.$el.find('.btn-dynamic-title').text(callee.altText)
      callee.altText = callee.currText
      callee.currText = callee.$el.find('.btn-dynamic-title').text()
    }

  $('.btn-dynamic-title').parent().each(collapseLoop)

}(window.jQuery)
!function($) {

  'use strict'; // jshint ;_;

  var SelectAll = function(element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.selectAll.defaults, options)
    if (this.options.parent) {
      this.$parent = $(this.options.parent)
    }
  }

  SelectAll.prototype.toggle = function () {
    var $title = this.$parent.find(this.options.titleElement),
      currentTitle = $title.text()

    this.$parent.find('[type=checkbox]').prop('checked', this.$element.prop('checked'))
    $title.text(this.options.altTitle)
    this.$element.data('alt-title', currentTitle)
  }

  SelectAll.prototype.update = function ($group) {
    if ($group.not(':checked').length !== 0) {
      this.$element.prop('checked', null)
    }
    else {
      this.$element.prop('checked', true)
    }
  }

  var old = $.fn.selectAll

  $.fn.selectAll = function (option, param) {
    return this.each(function() {
      var t = this,
        sa = new SelectAll(t, $(t).data())
      if (typeof option === 'string') sa[option](param)
    })
  }


  $.fn.selectAll.defaults = {
    parent: false,
    titleElement: '.select-all-dynamic-title',
    altTitle: 'Select none'
  }

  $.fn.selectAll.Constructor = SelectAll

  $.fn.selectAll.noConflict = function() {
    $.fn.selectAll = old
    return this
  }

  $('[data-select-all=enable]').each(function () {
    var $this = $(this)
      , $selectGroup = $this
        .parents(this.getAttribute('data-parent'))
        .find('[type="checkbox"]:not([data-select-all])')

    if (this.nodeName.toLowerCase() === 'input' && !this.name) {
      this.name = this.id
    }

    $selectGroup.on('change.selectall', function () {
      $this.trigger('update.selectall', [$selectGroup])
    })
  })

  $(document)
    .on('change.selectall', '[data-select-all=enable]', function (evt) {
      $(this).selectAll('toggle')
    })
    .on('update.selectall', '[data-select-all=enable]', function (evt, param) {
      $(this).selectAll('update', param)
    })
    .on('shown.modal.data-api', function (evt) {
      $(evt.target)
        .find('[data-select-all=enable]')
        .each(function () {
          var $this = $(this)
            , $selectGroup = $this
              .parents(this.getAttribute('data-parent'))
              .find('[type="checkbox"]:not([data-select-all])')

          if (this.nodeName.toLowerCase() === 'input' && !this.name) {
            this.name = this.id
          }

          $selectGroup.on('change.selectall', function () {
            $this.trigger('update.selectall', [$selectGroup])
          })
        })
    })
}(window.jQuery)


!function($) {

  'use strict'; // jshint ;_;
  var defaultDatepicker = function () {
      var altField = $(this).next();

      $(this).datepicker({
        dateFormat: 'dd/mm/yy',
        altField: altField,
        altFormat: 'ddmmyy',
        beforeShow: positionOverride,
        onSelect: function() {
          typeof $(this).valid != "undefined" && $(this).valid();
        }
      });
    }
    , ymDropdownDatepicker = function () {
      var altField = $(this).next(),
        thisYear = (new Date).getFullYear(),
        endYear = thisYear - 120; // 120 years before today

      $(this).datepicker({
        dateFormat: 'dd/mm/yy',
        altField: altField,
        altFormat: 'ddmmyy',
        changeMonth: true,
        changeYear: true,
        yearRange: endYear + ':' + thisYear,
        beforeShow: positionOverride,
        onSelect: function() {
          typeof $(this).valid != "undefined" && $(this).valid();
        }
      });
    }
    , ymfDropdownDatepicker = function () {
      var altField = $(this).next(),
        thisYear = (new Date).getFullYear(),
        endYear = thisYear + 50; // 50 years later

      $(this).datepicker({
        dateFormat: 'dd/mm/yy',
        altField: altField,
        altFormat: 'ddmmyy',
        changeMonth: true,
        changeYear: true,
        yearRange: thisYear + ':' + endYear,
        beforeShow: positionOverride,
        onSelect: function() {
          typeof $(this).valid != "undefined" && $(this).valid();
        }
      });
    }
    , datepickerInModal = function () {
      $(this).find('[data-datepicker]').attr('readonly', 'readonly')
      $(this).find('[data-datepicker="datepicker"]').each(defaultDatepicker)
      $(this).find('[data-datepicker="datepicker-ym"]').each(ymDropdownDatepicker)
      $(this).find('[data-datepicker="datepicker-ymf"]').each(ymfDropdownDatepicker)
    }

    , positionOverride = function (element, datepicker) {
      var resetPosition = function () {
        var touch = $('html').hasClass('touch') && window.matchMedia("(max-width: 767px)").matches
          , $el = $(element)
          , dpPosition = 'absolute'//touch ? 'relative' : 'absolute'
          , dpTop = $el.outerHeight() + ($el.offset().top - $el.parent().offset().top)
          , inTableAndTablet = $el.parents('.table')[0] && window.matchMedia("(min-width: 767px) and (max-width: 979px)").matches
          , dpLeft = inTableAndTablet ? $el.offset().left - 80 : 0

        datepicker.dpDiv
          .css({
            left: dpLeft,
            position: dpPosition,
            top: dpTop,
            zIndex: 1004
          })
          .attr('data-controller', element.id)
          .insertAfter(element)
      }

      setTimeout(resetPosition, 0)
    }

  $(document).on('focus.datepicker click.datepicker touchend.datepicker', '[data-datepicker], .hasDatepicker', function (evt) {
    evt.preventDefault()
    $(this).datepicker('show')
  })
  $('[data-datepicker]').attr('readonly', 'readonly').parent().css('position', 'relative')
  $('[data-datepicker="datepicker"]').each(defaultDatepicker)
  $('[data-datepicker="datepicker-ym"]').each(ymDropdownDatepicker)
  $('[data-datepicker="datepicker-ymf"]').each(ymfDropdownDatepicker)
  $('.modal').on('shown', datepickerInModal)
}(window.jQuery)



!function($) {

  'use strict'; // jshint ;_;

  var init = function() {
      $('[data-disable]').on('change.disableme', findDisabled)
      $('[data-disable]:checked').trigger('change.disableme')
    }, modalInit = function() {
      $(this).find('[data-disable]').on('change.disableme', findDisabled)
      $(this).find('[data-disable]:checked').trigger('change.disableme')
    }

    , findDisabled = function(evt) {
      var state = $(this).data('disable')
        ,
        disabledGroup = $(this).data('disable-group')
        ,
        $target = $('[data-disabled-group="' + $(this).data('disable-group') + '"]') // data-disabled-group === data-target

      $target
        .attr('disabled', state === 'enable' ? null : 'disabled')
        .datepicker(state)[state === 'enable' ? 'removeClass' : 'addClass']('uneditable-input')
    }

  init() // initializer

  $('.modal').on('shown', modalInit) // Applies disabled field code to fields within modals manually

}(window.jQuery);
!function($) {

  'use strict'; // jshint ;_;

  if (!$('#doublesafe-new-phrase-input')[0]) {
    return
  }

  var $input = $('#doublesafe-new-phrase-input'),
    $count = $('#doublesafe-new-phrase-count'),
    maxLength = parseInt($input.prop('maxlength'), 10)

  $input.on('keyup', function(evt) {
    $count.text(maxLength - this.value.length)
  })
}(window.jQuery)
!function($) {

  'use strict'; // jshint ;_;

  if (!$('#doublesafe-new-images')[0]) {
    return
  }

  var $imgList = $('#doublesafe-new-images'),
    $imgListLinks = $imgList.find('a'),
    $inputIndex = $('#imgIndx'),
    activeClass = 'active'

  $imgList.on('click', 'a', function(evt) {
    if (!$(this).hasClass('double-safe-generate-images')) {
      evt.preventDefault()
      $imgListLinks.removeClass(activeClass)
      $(this).addClass(activeClass)
      $inputIndex.val($(this).prop('href').split('?imgIndx=')[1])
    }
  })

}(window.jQuery)
!function($) {

  'use strict'; // jshint ;_;

  var $mailAddress = $('[data-address="mail-address"]'),
    $mailTarget = $('[data-address="target"]')
    ,
    $disableMe = $('[data-disable="disableme"]'),
    $disableTarget = $('[data-target="disableme"]'),
    onSame = function(evt) {
      if ($(this).is(':checked')) {
        $mailTarget
          .addClass("in")
      } else {
        $mailTarget
          .removeClass("in")
          .find(':input').val(null)
      }
    }

    , onDiffDate = function(evt) {
      if ($(this).is(':checked')) {
        $disableTarget.removeAttr('disabled', 'disabled').removeClass('uneditable-input');
      } else {
        $disableTarget.attr('disabled', 'disabled').val(null).addClass('uneditable-input');
      }
    }

  $mailAddress.on('click', onSame)
  $disableMe.on('click', onDiffDate)

  $('.ui-datepicker').find('*').addClass('problem-fix')


}(window.jQuery);
!function($, mod) {

  'use strict'; // jshint ;_;

  var Loader = function(element) {
    this.$element = $(element)
    this.loaderLoop = null
  }

  Loader.prototype = {

    show: function() {
      var $el = this.$element

      $el.removeClass('hidden')
      if (!mod.cssanimations) {
        var xPos = 0,
          loop = function() {
            xPos -= xPos > (-220) ? $el.width() : (-220);
            $el.css('backgroundPositon', xPos + 'px 0px');
          }
        this.loaderLoop = setInterval(loop, 40);
      }
    }

    ,
    hide: function() {
      var $el = this.$element
      $el.addClass('hidden')
      if (!mod.cssanimations) {
        clearInterval(this.loaderLoop)
      }
    }
  }

  /* LOADER PLUGIN DEFINITION
   * ========================== */

  var old = $.fn.loader

  $.fn.loader = function(option) {
    return this.each(function() {
      var t = this,
        l = new Loader(t)
      if (typeof option === 'string') l[option]()
    })
  }

  $.fn.loader.Constructor = Loader


  /* COLLAPSE NO CONFLICT
   * ==================== */

  $.fn.loader.noConflict = function() {
    $.fn.loader = old
    return this
  }

  $(function() {
    $('.loader').loader('show')
  })

}(window.jQuery, Modernizr)
!function($) {
  var $calculator = $('.asp-setup-calculator'),
    el_total = $('#asp-total'),
    active = 'active',
    ENGLISH = $('html').prop('lang') === 'en-CA',
    freqList = {
      weekly: 52,
      biweekly: 26,
      monthly: 12
    }, toMoney = function(amount, precision) {
      var ts = ENGLISH ? ',' : ' ',
        ds = ENGLISH ? '.' : ',',
        pre = ENGLISH ? '$' : '',
        suf = ENGLISH ? '' : ' $'

      return pre + amount.toFixed(precision !== undefined ? precision : 2).replace(/(\d)(?=(\d{3})+\b)/g, '$1' + ts).replace(/\./g, ds) + suf
    }, updateTotal = function() {
      var amount = $('[data-name=ASPAmountCalc] .active').data('value'),
        frequency = freqList[$('[data-name=ASPFrequency] .active').data('value').toLowerCase()],
        total = toMoney(parseInt(amount, 10) * parseInt(frequency, 10), 0)
      $('#asp-total').html(total)
    }

  $calculator.on('updated.button.data-api', updateTotal)
}(window.jQuery)
!function(mod) {
  if (!mod.svg) {
    $('img[src$=".svg"]').attr('src', function() {
      return $(this).attr('src').replace('.svg', '.png');
    });
  }
}(window.Modernizr)
!function($) {
  $('[data-toggle="selectAll"]').focus(function() {
    var $this = $(this);
    $this.select();
    $this.mouseup(function() {
      $this.unbind("mouseup");
      return false;
    });

  });
}(window.jQuery)
!function($) {
  var applyProgress = function() {
    var $this = $(this),
      progress = $this.data('progress')

    $this
      .css('width', progress)
      .text(progress)
  }

  $('.progress [data-progress]').each(applyProgress)
}(window.jQuery)
!function($) {
  if ('placeholder' in document.createElement('input')) {
    return
  }

  var createPlaceholder = function() {
    var $this = $(this)
      , $parent = $this.parent()
      , $placeholder = $('<span class="input-placeholder-fallback"></span>')
      , defaultValue = $this.val()
      , inputPrefixWidth = $this.prev('.add-on')[0] ? $this.prev('.add-on').outerWidth() : 0

    $placeholder
      .css({
        paddingTop: $this.css('padding-top'),
        paddingLeft: parseInt($this.css('padding-left').replace(/px/g, '')) +
        parseInt($this.css('margin-left').replace(/px/g, '')) +
        inputPrefixWidth
      })
      .text($(this).attr('placeholder'))

    $placeholder.on('click', function(evt) {
      $this.focus()
    })

    $this.after($placeholder)
    $parent.css('position', 'relative')

    if (defaultValue) {
      $placeholder.addClass('is-hidden')
    }
  }, hidePlaceholder = function(evt) {
    $(this).siblings('.input-placeholder-fallback').addClass('is-hidden')
  }, showPlaceholder = function(evt) {
    if (this.value === '' && !$(this).hasClass('hasDatepicker')) {
      $(this).siblings('.input-placeholder-fallback').removeClass('is-hidden')
    }
  }

  $('[placeholder]')
    .each(createPlaceholder)
    .on('focus', hidePlaceholder)
    .on('focusout', showPlaceholder)
}(window.jQuery)
!function($) {
  var $collapseAlt = $('.collapse-alt')
  $collapseAlt.hide();

  var $collapseAltToggle = $('[data-toggle="collapse-alt"]')
  $('.collapse-open').hide();

  var collapseAltLoad = function() {
    $collapseAltToggle.each(function() {
      var $this = $(this),
        target = $this.data('target')
      $(target)[($this.is(':checked')) ? 'slideDown' : 'slideUp'](100)
    })
  }

  var toggleCollapseAlt = function(evt) {
    var $this = $(this),
      target = $this.data('target')

    $this.parents('.btn-group').removeClass('open')
    if (evt.target.nodeName === 'INPUT') {
      $(target).slideToggle(100)
      return
    } else {
      $(target).slideToggle(100)
    }

    evt.preventDefault()
  }
  $(collapseAltLoad)
  $(document)
    .on('change', '[data-toggle="collapse-alt"]', toggleCollapseAlt)
    .on('click', '[data-toggle="collapse-alt"]' , function (evt) {
      if (evt.target.nodeName === 'INPUT') {
        return
      }
      toggleCollapseAlt(evt)
    })

    .on('click', '[data-toggle="collapse-open"]', function (evt) {
      evt.preventDefault()
      var target = $(this).attr('data-target')
      $(target).slideDown(100)
    })
    .on('click', '[data-toggle="collapse-close"]', function (evt) {
      evt.preventDefault()
      var target = $(this).attr('data-target')
      $(target).slideUp(100)
    })

}(window.jQuery)
!function($) {
  var $table = $('#table-income, [data-table-income]'),
    $row = $table.find('tbody tr[data-clone]').clone()

  var inc = 1,
    addRow = function(evt) {
      evt.preventDefault()
      inc = inc + 1
      var $newRow = $row.clone().attr('data-index', inc)
      $newRow.find('input,select').each(function() {
        if ($(this).attr('type') === 'text') {
          $(this).val('');
        }
        var name = $(this).attr('name')
        $(this).attr({
          'name': name //+ inc
          ,
          'id': name + inc
        })
      })

      $(this).parents('tr').before($newRow);

      var $tooltip = $('[data-toggle=tooltip]');

      $tooltip.each(function() {
        var options = $.extend({
          placement: 'right',
          trigger: 'hover focus',
          container: 'body'
        }, $(this).data())

        $(this).tooltip(options)
      });

    }, removeRow = function(evt) {
      evt.preventDefault()
      $(this).parents('tr').remove()
      $(".tooltip").remove()
    }

  $table.each(function() {
    $(this).on('click', '[data-duplicate-add]', addRow)
    $(this).on('click', '.table-row-remove', removeRow)
  })
}(window.jQuery)
!function($) {
  /*
   clicking any attribute with data-change with save this value and dynamically
   update the contents of "data-change-group-target"

   for use with dropdowns

   1. add data-change-group="GROUP_NAME" to the ul.dropdown-menu
   2. add data-change="New String" to the clickable string-changer
   3. add data-change-target to the element whose contents will be replaced
   by the new string

   currently works if there's only one group. will need to be extended to
   support multiple groups
   */
  $('[data-change]').click(function() {
    $this = $(this)
    var changeGroup = $this.parents('.dropdown-menu').data('change-group')
    var str = $this.data('change')
    var dropDownText = $this.html() + ' <span class="icon-caret-down">'
    $this
      .parents('.btn-group')
      .find('[data-toggle="dropdown"]')
      .html(dropDownText)
    $('[data-change-target]').html(str)

  })
}(window.jQuery)

!function($) {
  var $secondDoc = $('[data-file="add"]'),
    $addfile = $('[data-upload="addfile"]'),
    $removeSecondDoc = $('[data-file="remove"]'),
    onRemove = function(evt) {
      $secondDoc.addClass('hidden')
      $addfile.removeClass('hidden')
    }, addFile = function(evt) {
      $secondDoc.val(null).removeClass('hidden')
      $secondDoc.find("input").val(null)
      $addfile.addClass('hidden')
    }

  $addfile.on('click', addFile)
  $removeSecondDoc.on('click', onRemove)

}(window.jQuery)
!function($) {

  'use strict'; // jshint ;_;

  if ($('html').hasClass('touch')) {
    $('.icon-print').parents('a').hide()
    $('[data-toggle="print"]').hide()
  }
}(window.jQuery)
!function($) {
  var rspCalcs = $('.form-rsp-withdrawal .calculators [data-calculate]'),
    hiddenClass = 'is-hidden' // TQA00355748

  function disableCalcFields() {
    $('.form-rsp-withdrawal input[type="text"]').attr('disabled', 'disabled')
  }
  rspCalcs.addClass(hiddenClass) // TQA00355748
  disableCalcFields()
  $('.form-rsp-withdrawal .calculators input[type="radio"]:checked').each(function() {
    $(this).parent().parent().find('[data-calculate]').removeClass(hiddenClass) // TQA00355748
    $(this).parent().parent().find('input[type="text"]').removeAttr('disabled').removeAttr('readonly').focus();
  });
  $('.form-rsp-withdrawal .calculators input[type="radio"]').change(function() {
    rspCalcs.addClass(hiddenClass) // TQA00355748
    disableCalcFields();
    $(this).parent().parent().find('[data-calculate]').removeClass(hiddenClass) // TQA00355748
    $(this).parent().parent().find('input[type="text"]').removeAttr('disabled').focus();
  });

  $('.calculate-link').attr('style', '') // remove any inline styles
}(window.jQuery)


!function($) {
  $('#collapseOne').on('shown', function() {
    $('#radio1').prop('checked', true);
  });

  $('#collapseTwo').on('shown', function() {
    $('#radio2').prop('checked', true);
  });

  $('#collapseThree').on('shown', function() {
    $('#radio3').prop('checked', true);
  });
}(window.jQuery)
!function ($) {
  var UA = navigator.userAgent
  if (/android/i.test(UA)) {
    $('html').addClass('sony-android')
  }
}(window.jQuery);
!function ($) {
  var clearInput = function (evt) {
    evt.preventDefault()
    while (this.nextSibling.nodeName !== 'INPUT') {
      this.parentNode.removeChild(this.nextSibling)
    }
    this.nextSibling.value = ''
  }

  $(document).on('touchend.input-clear click.input-clear', '.input-clear', clearInput)
}(window.jQuery)
!function ($) {
  'use strict';
  var checkIfAllUnselected = function (evt) {
    var $controller = $('[data-category="controller"]')
    var $targetContainer = $('[data-category="targets"]')
    var $targets = $targetContainer.find('input:checkbox')
    var selectedList = []
    for (var i = 0; i < $targets.length; i++) {
      if ($targets[i].checked) {
        selectedList.push($targets[i])
      }
    }
    if (selectedList.length > 0) {
      $controller.prop('checked', true)
      $targetContainer.slideDown()
    }
    else {
      $targetContainer.slideUp()
      $controller.prop('checked', false)
    }
  }
  $(document)
    .on('change.multiselect', '[data-category="targets"]', checkIfAllUnselected)
    .on('custom-modal-load-complete', function (evt){
      setTimeout(function () {
        checkIfAllUnselected(evt)
      }, 0)
    })
    .on('change.multiselect', '[data-category="controller"]', function (evt) {
      $(evt.target.getAttribute('data-target')).find('input[type="checkbox"]').prop('checked', $(evt.target).is(':checked'))
    })
}(window.jQuery)
!function ($) {
  $(document).on('click', '[data-account-switch=payee]', function(evt) {
    var $this = $(this)
      , inputValue = $this.find('input').val()
      , $target = $this.parents("tr").find('[data-payee=target]')

    $target[inputValue === 'N' ? 'removeClass' : 'addClass']('disabled').trigger('updated.dropdown')
    if (inputValue === "N"){
      $target.attr('disabled', false)
    } else {
      $target.attr('disabled', true)
    }
  })
}(window.jQuery)
!function ($) {
  $(document).on('click', '[data-toggle="popover"]', function (evt) {
    evt.preventDefault();
    $(this).popover('show')
  })

}(window.jQuery)
!function ($) {
  $(document).on('click', 'a', function (evt) {
    if ('#' === this.getAttribute('href')) {
      evt.preventDefault()
    }
  })
}(window.jQuery)
!function ($) {

  $(document)
    .off('click.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]')
    .on('click.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (evt) {
      if ('radio' !== evt.target.type) { // used to ignore radio's so that default radio behaviour isn't affected
        evt.preventDefault()
      }
      $(this).tab('show')
    })

}(window.jQuery)

!function ($) {
  $(document)
    .on('change.accountSwitch', '[data-toggle="copyover"]', function (evt) {
      evt.preventDefault();
      var $this = $(this)
      var $targetRow = $this.parents('tr')
      var $target = $targetRow.find('[data-payee=target]')
      var enabled = this.checked

      $targetRow[enabled ? 'removeClass' : 'addClass']('no-copy-over')
        .find('[data-payee=target]')
        .attr('disabled', !enabled)
        [!enabled ? 'addClass' : 'removeClass']('disabled')
        .trigger('updated.dropdown')

    })
    .on('change.selectall', '[data-select-all="enable"]', function (evt) {
      var parentSelector = $(this).data('parent')
      var enabled = this.checked
      if (!parentSelector) {
        return
      }
      $(parentSelector)
        .find('tbody.copy-info tr')[enabled ? 'removeClass' : 'addClass']('no-copy-over')
        .find('[data-payee=target]').attr('disabled', !enabled)
        [!enabled ? 'addClass' : 'removeClass']('disabled')
        .trigger('updated.dropdown')

    })
}(window.jQuery);
!(function ($) {
  function mustOverrideOverflow($ele) {
    return $ele.find("[data-toggle=dropdown]").length > 0;
  }

  $(function () {
    $(".collapse.in").each(function () {
      var $this = $(this);
      if (mustOverrideOverflow($this)) {
        $this.addClass("force-overflow");
      }
    });

    $(document).on("shown hide", ".collapse", function (evt) {
      if (!evt.target) {
        return;
      }
      var $target = $(evt.target);
      if (mustOverrideOverflow($target)) {
        $target[evt.type === "shown" ? "addClass" : "removeClass"]("force-overflow");
      }
    });

  });

})(window.jQuery);

Tangerine.utils.security = {

    isUserLoggedIn: function() {
    return !!Cookies.get("LG");
  }
};
!(function ($) {
  if(window.navigator.userAgent.indexOf('iPad') > -1 && $('html').hasClass('touch')) {
    $(document).on("touchend", 'input, textarea', function() {
      $('input,textarea').on("focus", function(){
        $('.footer').hide();
      });
    });

    $(document).on('blur', 'input, textarea', function() {
      $('.footer').show();
    });
  }
})(window.jQuery);

(function(){

  Tangerine.utils.screenProperties = {
    getWidth: function() {
      return window.screen.width;
    },
    getHeight: function() {
      return window.screen.height;
    },
    getInnerWidth: function() {
      return window.innerWidth;
    },
    getInnerHeight: function() {
      return window.innerHeight;
    },
    getOuterWidth: function() {
      return window.outerWidth;
    },
    getOuterHeight: function() {
      return window.outerHeight;
    },
    getResizeWidth: function() {
      window.onresize = function() {
        return window.screen.width;
      };
    },
    getResizeHeight: function() {
      window.onresize = function() {
        return window.screen.height;
      };
    },
    getPixelRatio: function() {
      return window.devicePixelRatio;
    }

  };

})();

!function($) {
  $.fn.extend({
    formatNumber: function(options){
      var defaults = {
        cents: '.',
        decimal: ','
      };

      var o =  $.extend(defaults, options);

      return this.each(function() {

        /* ----Script Start---- */
        var thiz = $(this), values, x, x1, x2;
        values = $.trim(thiz.html());
        values += '';
        x = values.split(o.cents);
        x1 = x[0];
        x2 = x.length > 1 ? o.cents + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
          x1 = x1.replace(rgx, '$1' + o.decimal + '$2');
        }
        thiz.html(x1 + x2);

        /* ----Script End---- */
      });//return each
    }//fn.extend
  });
}(window.jQuery);

(function ($, root, undefined) {
	'use strict';


    var _totalAmount  = 0.0;


  var _addition = function(num) {
    _totalAmount += num;
    return _totalAmount;
  };


    var TangerineCalculation = function() {
    this.elements = {
      from: "",
      displayIn: ""
    };
  };


    TangerineCalculation.prototype = {
    initFormatData: function() {
      this.format = new TangerineFormatData();
      return this.format;
    },

    sum: function() {
      var _data = this.elements;
      var _num;

      $(_data.from).each(function() {
        _num = parseFloat($(this).text());
        _addition(_num);
        $(this).text(_num);
      });

      $(_data.displayIn).text((!!this.format) ? this.format.formatAmount(_totalAmount) : _totalAmount);
      _totalAmount  = 0.0;
    },

    substract: function() {

    }
  };



  window.TangerineCalculation = TangerineCalculation || {};

})(jQuery, window);

!function ($) {
  'use strict';

  $('#chat-available')['addClass']('is-hidden');
  $('#chat-unavailable')['removeClass']('is-hidden');

  $('#request-callback-available').removeAttr('style').css("visibility", "hidden");

  var c = 0, cCallback = 0
    , t, tCallback
    , timer_is_on = 0
    , timer_is_on_Callback = 0
    , stop_threshold = 25
    , queueId = 239
    , lang = $('html').prop('lang') === 'fr-CA' ? 'fr' : 'en'
    , chatBaseUrl = lang === 'fr' ? 'https://tng-fr.frontlinesvc.com' : 'https://tng-eng.frontlinesvc.com'
    , getChatButton = function (data) {

      var state = false;
      if (typeof data !== 'undefined' && !!data &&
        typeof data.services !== 'undefined' && !!data.services &&
        data.services.length > 0) {
        for (var i = 0; i < data.services.length; i++) {
          if (data.services[i].available == true) {
            state = true;
            break;
          }
        }
      }

      $('#chat-available')[state ? 'removeClass' : 'addClass']('is-hidden')
      $('#chat-unavailable')[state ? 'addClass' : 'removeClass']('is-hidden')
    }
    , chatAvailEvent2 = function () {
      var isLogin = !!getCookie("LG");
      $.ajax({
        url: chat_availability_rest_url,
        type: 'GET',
        data: {
          appId: chat_availability_appID,
          type: 'CHAT',
          'logged-in': isLogin,
          language: language_map[$('html').prop('lang')]
        },
        dataType: 'json',
        cache: false,
        success: getChatButton
      });

      return true

    }
    , checkCallbackAvaility = function (data) {

      var callBackAvailibility = false;

      if (typeof data !== 'undefined' && !!data &&
        typeof data.services !== 'undefined' && !!data.services &&
        data.services.length > 0) {
        for (var i = 0; i < data.services.length; i++) {
          if (data.services[i].available == true) {
            callBackAvailibility = true;
            break;
          }
        }
      }
      $('#request-callback-available').removeAttr('style').css("visibility", callBackAvailibility == true ? "show" : "hidden");
    }
    , getCallbackAvailability = function () {
      var globalChatSettings = window.globalChatSettings || null;

      if (globalChatSettings.settings.isCallMeBackEnabled && (null != call_me_check_login)) {
        if (null != call_me_check_login) {
          $.ajax({
            url: call_back_availability_rest_url,
            type: 'GET',
            data: {
              appId: call_back_availability_appID,
              type: 'CALL_BACK',
              'logged-in': true,
              language: language_map[$('html').prop('lang')]
            },
            dataType: 'json',
            cache: false,
            success: checkCallbackAvaility
          });
          return true;
        }
        return false;
      }
      else { //Call me back is turn off
        $('#request-callback-available').removeAttr('style').css("visibility", "hidden");
      }
    }
    , getCookie = function (name) {
      var i, x, y, ARRcookies = document.cookie.split(";")
      for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="))
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1)
        x = x.replace(/^\s+|\s+$/g, "")
        if (x == name) {
          return unescape(y)
        }
      }
      return null
    }

    , timedCount = function () {

      try {
        if (!chatAvailEvent2()) {
        }
        else {
          c = stop_threshold
        }
      }
      catch (err) {
        c++
        if (c < stop_threshold) {
          t = setTimeout(timedCount, 1000)
        }
      }
    }
    , timedCountCallback = function () {

      try {
        if (!getCallbackAvailability()) {
        }
        else {
          cCallback = stop_threshold
        }
      }
      catch (err) {
        cCallback++
        if (cCallback < stop_threshold) {
          tCallback = setTimeout(timedCountCallback, 1000)
        }
      }
    }
    , startAutoCheck = function (evt) {
      if (!timer_is_on) {
        timer_is_on = 1;
        timedCount();
      }
      if (!timer_is_on_Callback) {
        timer_is_on_Callback = 1;
        timedCountCallback();
      }

    },
    call_me_check_login = getCookie("LG")

  window.getChatButton = getChatButton;


  $('#request-callback-available')
    .on('click', function (evt) {
      evt.preventDefault();

      if (null == call_me_check_login) {
      }
      else {

        gms_chat_func.setKvpObj(kvp_objs);
        gms_chat_func.launchCallMeBack();
      }
    });

  $(document)
    .on('open.footer', '.footer', startAutoCheck)
    .on('click.live-chat touchend.live-chat', '#chat-available > a', function (evt) {
      evt.preventDefault()

      var check_login = getCookie("LG");

      var globalChatSettings = window.globalChatSettings || null;
      if (!globalChatSettings.settings.isSecureChatEnabled || null == check_login) {
      }
      else {

        gms_chat_func.getSecurityToken(kvp_objs);

      }

      kvp_objs.proactive = "false";

      if (typeof proactive_timer != 'undefined') {
        clearTimeout(proactive_timer);
      }

      if (!Tangerine.chat.ChatManager.getGMSChatURL()) {
        gms_chat_func.launchTriage(kvp_objs);
      }
      else {
        Tangerine.chat.ChatManager.checkForExistingChat();
      }
    });

  if ($(window).width() < 980) {
    startAutoCheck()
  }

}(window.jQuery);

!(function ($) {
  'use strict';

  function configureDom() {
    var controlIndicator = $("<span></span>").addClass("control-indicator");
    $("label>input[type=radio]").each(function () {
      var $ele = $(this);
      var label = $(this).parent();
      label.addClass("radio");
      if (!!label.attr("for")) {
        $(this).attr("id", label.attr("for"));
      }
      if (!$ele.next(".control-indicator") || $ele.next(".control-indicator").length === 0) {
        controlIndicator.clone().insertAfter($ele);
      }
    });

    var checkLabel = $("<label></label>");
    $("input[type=checkbox]").each(function () {
      var $ele = $(this);
      if ($ele.parent("label").length === 0) {
        $ele.wrap(checkLabel);
      }
      var label = $ele.parent("label");
      label.addClass("checkbox");
      if (!!label.attr("for")) {
        label.attr("for", $ele.attr("id"));
      }

      if (!$ele.next(".control-indicator") || $ele.next(".control-indicator").length === 0) {
        controlIndicator.clone().insertAfter($ele);
      }
    });
  }

  Tangerine.utils = Tangerine.utils || { };
  Tangerine.utils.dom = Tangerine.utils.dom || { };
  Tangerine.utils.dom.elementStyler = {
    configureDom: configureDom
  };

  function setupEleOnDynamicLoad(ele) {
    $(ele).find($('[data-toggle="dropdown"]').siblings('.dropdown-menu')).each(function () {
      window.Tangerine.utils.select.setupSelect(this);
    });
    /*$(ele).find('[data-toggle="tooltip"]').each(function () {
      if (!($('html').hasClass('touch'))) {
        $(this)
          .tooltip({
            container: this
          })
          .on("hide", function (evt) {
            evt.stopPropagation();
            $("body").removeClass("modal-open");
            $("body").addClass("modal-open");
          });
      }
    });*/

  }

  /*
   * Ensure that checkboxes and radio buttons can be styled with "wtfform" style
   * CSS approach, which is probably the most scalable input styling approach at this time
   */
  $(function () {
    $(".modal").on("shown", function (evt) {
      configureDom();
      setupEleOnDynamicLoad(this);
    });
    $(document).on("custom-modal-load-complete", function (evt) {
      configureDom();
      setupEleOnDynamicLoad(evt.target);
    });
    configureDom();

    /*
     * Keyboard navigation support for button groups that are styled to look like radio buttons. This
     * provides a keyboard experience similar to that of stock radio buttons.
     */
    var nextKeyCodes = [39, 40];
    var prevKeyCodes = [37, 38];
    var tabKeyCodes = [9];

    $("[data-toggle='buttons-radio'] a").each(function () {
      if (!$(this).attr("tabindex")) {
        $(this).attr("tabindex", "0");
      }
    });

    /*
     * TODO: Focus in - ensure active radio button is focused in rather than first / last element
     * depending on origin of event

     $(document).on("focusin", "[data-toggle='buttons-radio'] a", function(event) {
     var activeElement = $(this).parent("[data-toggle='buttons-radio']").find(".active");
     if (activeElement.length > 0 && activeElement[0] !==  event.currentTarget) {
     activeElement.focus();
     }
     });
     */

    $(document).on("keydown", "[data-toggle='buttons-radio'] a", function (event) {
      var sibling = null;
      if (!!event && nextKeyCodes.some(function (val) {
          return val === event.keyCode;
        })) {
        event.preventDefault();
        sibling = $(this).next("a");
        if (sibling.length === 0) {
          sibling = $(this).parents(".btn-group").find("a:first-child");
        }
      }
      else if (!!event && prevKeyCodes.some(function (val) {
          return val === event.keyCode;
        })) {
        event.preventDefault();
        sibling = $(this).prev("a");
        if (sibling.length === 0) {
          sibling = $(this).parents(".btn-group").find("a:last");
        }
      }
      else if (!!event && tabKeyCodes.some(function (val) {
          return val === event.keyCode;
        })) {
        if (event.shiftKey) {
          $(this).parents(".btn-group").find("a:first-child").focus().trigger({
            type: 'keypress',
            which: 9,
            shiftKey: true
          });
        } else {
          $(this).parents(".btn-group").find("a:last").focus().trigger({
            type: 'keypress',
            which: 9
          });
        }
      }

      if (!!sibling && sibling.length > 0) {
        sibling.click();
        sibling.focus();
      }
    });
  });

})(window.jQuery);

;(function($) {
  $(document).on("change",  "[type=checkbox][data-enable-disable]", function() {
    var target = $(this).attr("data-enable-disable")
      , anyInGroupNotChecked = !!$("[data-enable-disable='" + target +
        "']:not(:checked):visible").length;
    $("[data-enable-disable-target=" + target + "]").prop("disabled", anyInGroupNotChecked);
  });
}(window.jQuery));

(function (root) {
	'use strict';


  var $       = root.jQuery;
  var _lang   = $('html').prop('lang');


    var _language = function(_lang) {
    if(_lang === "fr-CA") {
      numeral.language('fr', {
        delimiters: {
          thousands: ' ',
          decimal: ','
        },
        abbreviations: {
          thousand: 'k',
          million: 'm',
          billion: 'b',
          trillion: 't'
        },
        ordinal : function (number) {
          return number === 1 ? 'er' : 'Ã¨me';
        },
        currency: {
          symbol: '$'
        }
      });
      return numeral.language('fr');
    } else {
      return numeral.language('en');
    }
  };


    var TangerineFormatData = function() { };

    TangerineFormatData.prototype = {

        formatAmount: function(amt) {
      if(_lang === "fr-CA") {
        _language("fr-CA");
        return numeral(amt).format('0,0[.]00 $');
      } else {
        _language("en-CA");
        return numeral(amt).format('$0,0.00');
      }
    },

        formatPercentage: function(per) {
      if(_lang === "fr-CA") {
        _language("fr-CA");
        return numeral(per).format('0,0.00') + ' %';
      } else {
        _language("en-CA");
        return numeral(per).format('0,0') + '%';
      }
    }


  };


  window.TangerineFormatData = TangerineFormatData || {};

})(window);

(function($){
  $(document).on("focusout", "[data-sanitize-regex]", function() {
    $("[data-sanitize-regex]").each(function(index, ele) {
      var $ele = $(ele);
      var regEx = $ele.data("sanitize-regex");
      var val = $ele.val();
      $ele.val(val.replace(new RegExp(regEx, "g"),""));
      if ($ele.valid) $ele.valid();
    });
  });
})(window.jQuery);

;
(function (window, $) {
  window.Tangerine = window.Tangerine || {};
  window.Tangerine.utils.modal = {
    setupModal: function (ele) {
      var $this = ele;
      var targetID = $this.data('target');
      var animationClass = $this.data('animation-class') || "fade";
      var modal;
      var modalContainer;

      if (!targetID) {
        return;
      }
      else {
        targetID = targetID.replace('#', '');
      }
      if ($("div#" + targetID).length > 0) {
        return;
      }
      modal = document.createElement('div');
      modalContainer = document.createElement('div');
      $(modalContainer)
        .addClass('modal-container');
      if (!!$this.attr("data-modal-class")) {
        $(modalContainer)
          .addClass($this.attr("data-modal-class"));
      }
      $(modalContainer)
        .append('<div class="loader"></div>');

      $(modal)
        .attr({
          'id': targetID
          , 'class': 'modal hide ' + animationClass
          , 'tabindex': '-1'
          , 'role': 'dialog'
          , 'aria-hidden': 'true'
        })
        .append(modalContainer)
        .appendTo(document.body);
    },

    ensureBackdrop: function () {

      var backdropCount = $(".modal-backdrop:visible").length;

      var removeBackdrops = function() {
        var visibleModals = $(".modal:visible").not("#chat-dialog").get().reverse();
        var modalObject;
        visibleModals.some(function (modal) {
          var backdropCount = $(".modal-backdrop:visible").length;
          if (backdropCount === 1) {
            return true;
          }
          modalObject = $(modal).data("modal");
          if (modalObject && modalObject.options &&
            (modalObject.options.backdrop || modalObject.options.origBackdrop)) {
            modalObject.removeBackdrop();
          }
        });
      };
      var addBackdrop = function() {
        var visibleModals = $(".modal:visible").not("#chat-dialog").get().reverse();
        var modalObject;
        visibleModals.some(function (modal) {
          modalObject = $(modal).data("modal");
          if (modalObject) {
            modalObject.options.backdrop = true;
            modalObject.backdrop();
            $("body").addClass("modal-open");
            return true;
          }
        });
      };

      if (backdropCount === 0) {
        addBackdrop();
      } else {
        removeBackdrops();
      }

      /*
       if (backdropCount > 0) {
       $(".modal[id!=" + topmostModal.attr("id") + "]:visible").each(function () {
       console.log("backdrop1", this, arguments);
       var $modal = $(this).data("modal");
       $modal.options.origBackdrop = $modal.options.backdrop;
       $modal.options.backdrop = false;
       if (!!$modal.$backdrop) {
       $modal.removeBackdrop();
       }
       });
       }
       */

    },

    setMultipleModalDom: function () {
      var $this = $(this);
      var modalCount = $(".modal .modal-container:visible").length;
      var topmostModal;
      var modalsFilter;

      if (modalCount >  0) {
        topmostModal = $("#proactive-chat-dialog, #chat-dialog:not(.reduced-chat):not(.popped-in-chat)");
        if (topmostModal.length === 0) {
          topmostModal = $this;
          modalsFilter = "[id!=proactive-chat-dialog][id!=chat-dialog]:visible";
        }
        else {
          topmostModal.addClass('multiple-modal-top');
          modalsFilter = "[id!=proactive-chat-dialog][id!=chat-dialog][id!=" + topmostModal.attr("id") + "]:visible";
          if (!$("body").hasClass("modal-open")) {
            topmostModal.addClass("modal-open");
          }
        }

        var otherModals = $(".modal" + modalsFilter);
        $(".modal" + modalsFilter).each(function (index, ele) {
          var $ele = $(ele);
          if (otherModals.length > 1) {
            $ele.addClass('multiple-modal-other-modals');
            $("body").addClass("modal-open");
          }
          else {
            $ele.removeClass('multiple-modal-other-modals');
          }
        });
        window.Tangerine.utils.modal.ensureBackdrop();

        if (modalCount === 1 && ($("#proactive-chat-dialog:visible").length > 0 ||
          $("#chat-dialog:not(.reduced-chat):not(.popped-in-chat):visible").length === 0)) {
          $("body").removeClass("modal-open");
        }
      }
    }
  };
})(window, window.jQuery);
!function (window, $) {

  'use strict';

  var Modal = function (element, options) {
      this.options = options;
      this.$element = $(element)
        .delegate('[data-dismiss="modal"]', 'click.dismiss.modal', $.proxy(this.hide, this));
      this.options.remote && this.$element.find('.modal-container').load(this.options.remote, function () {
        $(this).trigger("shown");
      });

    }
    , defaults = $.fn.modal.defaults;

  Modal.prototype = $.fn.modal.Constructor.prototype;

  $.fn.modal = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('modal')
        , options = $.extend({}, defaults, $this.data(), typeof option == 'object' && option);

      if (!data) {
        $this.data('modal', (data = new Modal(this, options)));
      }
      if (typeof option == 'string') {
        data[option]();
      }
      else if (options.show) {
        data.show();
      }
    });
  };

  $.fn.modal.Constructor = Modal;

  var $this, targetID, modal, modalContainer, fireTrackingCode = function (evt, xhr, settings) {
    if (!/command=/.test(settings.url)) {
      return;
    }
    var path = settings.url
      , title = path.slice(path.indexOf('command=') + 8);

    window.ga && window.ga('send', 'pageview', path);
    window.dcsMultiTrack && window.dcsMultiTrack('DCS.dcsuri', path, 'WT.ti', title);
  };
  $('[data-toggle=modal]').each(function () {
    $this = $(this);
    var targetID = $this.data('target');
    if (!targetID) {
      return true;
    }
    else {
      window.Tangerine.utils.modal.setupModal($this);
    }
  });
  $(document).ajaxComplete(function (evt, xhr, settings) {
    $(this).on('shown', '.modal', function () {
      fireTrackingCode(evt, xhr, settings);
    });
  });

  $(document)
    .on('show', '.modal', function (evt) {
    })
    .on('shown', '.modal', function () {
      $(".viewport .frame .view").addClass("modal-blur");
      var $modal = $(this).data("modal");
      if (!!$modal.options.origBackdrop) {
        $modal.options.backdrop = $modal.options.origBackdrop;
      }
      window.Tangerine.utils.modal.setMultipleModalDom.call();
      $('body').addClass('modal-open');
    })
    .on('hide', '.modal', function () {
      if ($(".multiple-modal-other-modals").length === 0) {
        $('body').removeClass('modal-open');
      }
      $(".viewport .frame .view").removeClass("modal-blur");
    })
    .on('hidden', '.modal', function () {
      window.Tangerine.utils.modal.setMultipleModalDom.call();
    });

}(window, window.jQuery);

!(function ($, _) {
  'use strict';

  $.fn.signingPad = function (option) {
    var settings = $.extend(option, {
      isDisabled: false,
      lineColor: '#4e4e4e',
      color: '#002888',
      initialSignature: null,
      signatureValid: "SubmitButton",
      texts: {
        signatureLineText: ''
      }
    });

    return this.each(function () {
      if (undefined === $(this).data('signingPad')) {
        var container = this;
        var signingPad = new SigningPad(container, settings);
        signingPad.init();
        $(this).data('signingPad', signingPad);
      }
    });
  };

  var SigningPad = function (container, settings) {
    this.element = $(container);
    this.self = this;
    this.options = $.extend({}, settings, this.element.data());
    this._blankSignature = ''; // created during widget initialization
  };

  SigningPad.prototype = {
    init: function () {
      var self = this;

      this.options.padId = this.element.attr("id");
      this.options.hiddenPathsId = this.options.padId + "value";
      this.options.enableChangeCallback = true;

      if (this.element.next("#" + this.options.hiddenPathsId).length === 0) {
        $("<input/>")
          .attr("type", "hidden")
          .attr("id", this.options.hiddenPathsId)
          .attr("name", this.options.hiddenPathsId)
          .insertAfter(this.element);
      }
      this.options.signaturePaths = this.element.next("#" + this.options.hiddenPathsId);

      this.options = $.extend(
        {
          disabled: this.options.isDisabled,
          minArcLength: 10,
          ratio: 3,
          lineColor: this.options.lineColor, //'#4e4e4e',
          color: this.options.color, //'#002888',
          lineWidth: 3,
          sizeRatio: 6,
          minDimension: {
            width: 400,
            height: 300
          },
          maxDimension: {
            width: 900,
            height: 630
          },
          signatureLineWidth: 2,
          customPopUpHtmlTemp: this._signatureDialogTemplate,
          signInPlace:  this._isTouchDevice() ? false : true,
          showUndo: false,
          disableCancelMessage: true,
          onSubmit: function (signature) {
            $("[data-signature-valid-target=" + self.options.signatureValid + "]").prop("disabled",
              self.options.signaturePaths.val() === self.getBlankSignature());
          },
          onCancel: function () {  },
          onInit: function () {  },
          onClear: function () {  },
          dialog: {
            texts: {
              header: this._langENCA() ? 'Your e-signature' : 'Votre signature &eacute;lectronique',
              clear: this._langENCA() ? 'Clear' : 'Effacer',
              submit: this._langENCA() ? 'Submit' : 'Soumettre',
              cancel: this._langENCA() ? 'Cancel' : 'Annuler',
              staticText: this._langENCA() ? "If you'd like to re-sign, click the 'Clear' button and try again" : "Pour signer de nouveau, cliquez sur le bouton Effacer et ressayez",
              undo: '',
              cancelMessage: '',
              yes: '',
              no: '',
              signatureLineText: ''
            }
          }
        }, this.options
      );

      this.options = $.extend(this.options,
        this.element.data());

      this._recreateWidget();

      this.element.on("change", this._handleChange.bind(this));

      var resizeCallback = typeof _ !== "undefined" ? _.debounce(this._handleWindowResize.bind(this), 10) :
        this._handleWindowResize.bind(this);
      $(window).on("resize", resizeCallback);
    },
    _signatureDialogTemplate : function(options) {
      return $([
        '<div class="capsig">',
        '   <div class="title">',
        '       <h3>',
        '      ' + options.texts.header,
        '       </h3>',
        '       <a href="#" class="cancel icon-remove"></a>',
        '   </div>',
        '   <div class="canvas"></div>',
        '   <div class="button-container clearfix">',
        '      <ul class="panel">',
        '         <li class="leftpanel">',
        '           ' + (options.showUndo ? ('<button class="undo btn btn-secondary">' + options.texts.undo + '</button>') : ''),
        '           <button class="clear btn btn-secondary">' + options.texts.clear + '</button>',
        '         </li>',
        '         <li class="staticText">' + options.texts.staticText + '</li>',
        '         <li class="rightpanel">',
        '           <button class="submit btn btn-primary">' + options.texts.submit + '</button>',
        '         </li>',
        '      </ul>',
        '   </div>',
        '</div>'].join(''));
    },


    _handleWindowResize: function (evt) {
      var self = this;
      self._handleResize(evt);
      setTimeout(function() {
        self._handleResize(evt);
        self.element.trigger("signingpad.onresize");
        self._addingZindex(self.element);
      }, 200);
    },

    _handleChange: function () {
      if (!!this.options.signatureValid) {
        this.element.off("change");

        var enableChangeCallback = this.options.enableChangeCallback;
        this.options.enableChangeCallback = false;

        if (!!this.options.signatureValid) {
          $("[data-signature-valid-target=" + this.options.signatureValid + "]").prop("disabled",
            this.options.signaturePaths.val() === this.getBlankSignature());
        }
        this.options.enableChangeCallback = enableChangeCallback;
        this.element.on("change", this._handleChange.bind(this));
      }

      if (!this.options.enableChangeCallback) {
        return;
      }

      this._saveSignature();

      this.element.trigger("signingpad.onchange", null, {signature: this.getSignature()});
    },

    destroy: function () {
      if (this.element.next("#" + this.options.hiddenPathsId).length === 1) {
        this.element.next("#" + this.options.hiddenPathsId).remove();
      }
      this.element.empty();
    },

    _handleResize: function (evt) {
      this.element.off("change");
      var enableChangeCallback = this.options.enableChangeCallback;
      this.options.enableChangeCallback = false;
      var sig = this.options.signaturePaths.val();
      this.element.html('');
      this.element.capsig('destroy').capsig(this.options);
      this._blankSignature = this.element.capsig('getSignature');
      this.setSignature(sig);
      this.element.capsig('disable', this.options.isDisabled);
      this.element.on("change", this._handleChange.bind(this));
      this.options.enableChangeCallback = enableChangeCallback;
    },

    _recreateWidget: function () {
      this.element.capsig(this.options);
      this._blankSignature = this.element.capsig('getSignature');
      this._addingZindex(this.element);

      if (!!this.options.initialSignature) {
        this.setSignature(this.options.initialSignature);
        this.options.signaturePaths.val(this.options.initialSignature);
        this.element.trigger("signingpad.onchange", null, {signature: this.options.initialSignature});

        $("[data-signature-valid-target=" + this.options.signatureValid + "]").prop("disabled",
          this.options.signaturePaths.val() === this.getBlankSignature());
      }
    },

    _saveSignature: function () {
      var sig = this.element.capsig('getSignature');
      this.options.signaturePaths.val(sig);
      this._addingZindex(this.element);
    },

    getSignature: function () {
      return this.element.capsig('getSignature');
    },

    getBlankSignature: function () {
      return this._blankSignature;
    },

    setSignature: function (signature) {
      this.element.capsig('setSignature', signature || this.options.signaturePaths.val());
    },

    clearSignature: function () {
      this.element.off("change");
      this.options.enableChangeCallback = false;
      this.options.signaturePaths.val("");
      this.element.capsig('clear');
      this.options.enableChangeCallback = true;
      this._addingZindex(this.element);

      if (!!this.options.signatureValid) {
        $("[data-signature-valid-target=" + this.options.signatureValid + "]").prop("disabled", true);
      }

      this.element.on("change", this._handleChange.bind(this));
    },

    disableWidget: function () {
      this.element.off("change");
      this.options.isDisabled = true;
      this.element.capsig(this.options).capsig("disable", true);
      this.element.on("change");
    },

    enableWidget: function () {
      this.element.off("change");
      this.options.isDisabled = false;
      this.element.capsig(this.options).capsig("disable", false);
      this.element.on("change");
    },

    _isTouchDevice: function() {
      return ($('html').hasClass('touch')) ? true : false;
    },

    _langENCA: function() {
      return $('html').attr('lang') === 'en-CA';
    },

    _addingZindex: function(ele) {
      if(this._isTouchDevice()) {
        ele
          .find(".signature").css("z-index", 1)
          .find("canvas").css("z-index", -1);
      }
    }

  };

  $(function () {
    $("[data-signature-pad]").signingPad();
  });

})(window.jQuery, window._);

(function($) {
  $.fn.tangerineInputStaticOverlay = function(options) {

    return this.each(function() {
      var ele = $(this);
      var $addOnEle = ele.find(".add-on");
      var $input = ele.find("input");
      var $overlay = ele.find(".add-on-overlay");

      if (ele.length === 0) return;

      options = options || {};

      options = $.extend({}, $.fn.tangerineInputStaticOverlay.defaults, options);

      $(window).on("resize", function() {
        doResize();
      });
      ele.bind("shown", function() {
        doResize();
      });

      function doResize() {

        $addOnEle.css("width", "auto");

        if (!ele.is(":visible")) return;

        var addOnWidth = $addOnEle.outerWidth();
        var inputWidth = $input.innerWidth();

        var showOverlay = false;

        if (inputWidth > 0 && (addOnWidth / inputWidth > 0.6)) {
          addOnWidth = Math.floor(inputWidth * 0.6);
          $addOnEle.outerWidth(addOnWidth);
          showOverlay = true;
        }
        $input.css({"padding-left": (Math.ceil(addOnWidth) + options.addOnRightMargin) + "px"});
        if (showOverlay) {
          if ($overlay.length === 0) {
            $addOnEle.append('<span class="add-on-overlay">&hellip;</span>');
          }
        }
        else if ($overlay.length > 0) {
          $overlay.remove();
        }
      }


    });
  };

  $.fn.tangerineInputStaticOverlay.defaults = {
    addOnRightMargin: 10
  };

}(window.jQuery));

!function ($) {

  'use strict'; // jshint ;_;

  var $tooltip = $('[data-toggle=tooltip]');

  if ($('html').hasClass('touch')) {
    $tooltip.each(function (index) {
      if (/input|select|textarea/i.test(this.nodeName) || $(this).hasClass('btn') || $(this).hasClass('btn-group') || $(this).parent().hasClass('btn')) { // do not show modal tooltip when tooltip is applied to input fields or buttons
        return;
      }

      var modal = document.createElement('div')
        , modalContainer = document.createElement('div')
        , modalBody = document.createElement('div')
        , modalFooter = document.createElement('div')
        , text = document.createElement('p')
        , closeBtn = document.createElement('button');

      text.innerHTML = this.getAttribute('title') || this.getAttribute('data-title');

      $(closeBtn)
        .addClass('btn btn-primary')
        .attr('data-dismiss', 'modal')
        .html('&#10006;');

      modalContainer.className = 'modal-container';

      modalBody.appendChild(text);
      modalBody.className = 'modal-body';

      modalFooter.appendChild(closeBtn);
      modalFooter.className = 'modal-footer';

      modalContainer.appendChild(modalBody);
      modalContainer.appendChild(modalFooter);

      $(modal)
        .attr({
          'id': 'tooltip-modal-' + index
          , 'class': 'modal hide fade'
          , 'tabindex': '-1'
          , 'role': 'dialog'
          , 'aria-hidden': 'true'
        })
        .append(modalContainer)
        .appendTo(document.body);
      $(this).on('click', function () {
        $('#tooltip-modal-' + index).modal('show');
      });
    });
  } else {
    var getTooltipOptions = function(tooltip) {
      var options = $.extend({
        placement: 'right'
        , trigger: 'hover focus'
        , container: 'body'
      }, tooltip.data());

      if ($(document).width() < 768) {
        options.placement = "top";
      }
      return options;
    };
    $tooltip.each(function () {
      var options = getTooltipOptions($(this));
      $(this).tooltip(options);
    });

    $(window).resize(function () {
      $tooltip.each(function () {
        var options = getTooltipOptions($(this));
        $(this).tooltip("destroy").tooltip(options);
      });
    });
  }

}(window.jQuery);

(function($) {
  $.fn.tangerineTypeahead = function(options) {

    return this.each(function() {
      var ele = $(this)
        , correspondingIdEle // Set after typeahead instantiation
        , correspondingJsonEle  // Set after typeahead instantiation
        , elementIdParserRegex = /(\d+)$/
        , elementNumericIdMatch = ele.attr("id").match(elementIdParserRegex)
        , elementNumericId = elementNumericIdMatch && elementNumericIdMatch.length > 0 ? elementNumericIdMatch[0] : 0
        , idSelector = ""
        , jsonSelector = ""
        , typeAheadDataDisplayKey = ""
        , typeAheadDataName = "";

      if (ele.length === 0) {
        return;
      }

      options = options || {};

      options.url = options.url || ele.attr("data-typeahead-url");
      options.queryParameter = options.queryParameter || ele.attr("data-typeahead-query-parameter");
      options.ajaxMethod = options.ajaxMethod ||
      ele.attr("data-typeahead-method");
      options.notFoundTemplate = options.notFoundTemplate || ele.attr("data-typeahead-not-found-template");
      options.typeAheadType = options.typeAheadType || ele.attr("data-typeahead-type");

      options = $.extend({}, $.fn.tangerineTypeahead.defaults, options);
      if (options.typeAheadType === "PayeeName") {
        idSelector = "TypeAheadPayeeID";

        if (options.supportAddressLookup) {
          jsonSelector = "SavedPayeeAddressData";
        }

        typeAheadDataName = "payeeID";
        typeAheadDataDisplayKey = "payeeName";
      }

      if (!options.url || !options.queryParameter || !options.ajaxMethod) {
        console.log("Invalid typeahead configuration. Must define url, queryParameter, and ajaxMethod");
        return;
      }
      if (options.notFoundTemplate === "enabled" && $("#" + options.typeAheadType + "_notFoundTemplate").length === 0) {
        options.notFoundTemplate = "";
        console.log("Invalid typeahead notFoundTemplate configuration. notFoundTemplate " +
        "#" + options.typeAheadType + "_notFoundTemplate" + " must exist in HTML DOM");
      }

      options.url = options.url.replace(/^\s+|\s+$/g, ''); //trim
      ele.prop("autocomplete", "off");

      var bloodHound = new Bloodhound({
        datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.payeeName); },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        limit: 20,
        remote: {
          url: options.url + '&PayeeName=%QUERY',
          filter: function(response){
            var filter = ele.val();
            if (typeof response.tips === "undefined" || response.tips.length === 0) {
              ele.trigger('typeahead.nomatchesfound');
            }
            return $.map( response.tips, function( tip ) {
              return (tip.payeeName.toLowerCase().indexOf(filter.trim().toLowerCase()) != -1) ? tip : null;
            });
          },
          ajax : {
            beforeSend: function(jqXhr, settings){
              jqXhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
            },
            type: options.ajaxMethod

          }
        }
      });
      bloodHound.initialize();

      var notFoundTemplateHtml = null;
      if (options.notFoundTemplate === "enabled" &&
        $("#" + options.typeAheadType + "_notFoundTemplate").length > 0) {
        notFoundTemplateHtml = $("#" + options.typeAheadType + "_notFoundTemplate").html().trim();
        Tangerine.utils.modal.setupModal($(notFoundTemplateHtml).find("[data-toggle='modal']"));
      }
      var citiesUL, citiesSelect, streetsUL, streetsSelect, citiesAnchor, streetsAnchor, parentTT, parentTD;

      ele.typeahead({
          minLength: 3,
          hint: true,
          highlight: true
        },
        {
          name: typeAheadDataName,
          displayKey: typeAheadDataDisplayKey,
          templates: {
            empty: notFoundTemplateHtml ?
              [
                '<div class="empty-message">',
                notFoundTemplateHtml,
                '</div>'
              ].join('\n') : ""
          },
          source: bloodHound.ttAdapter()
        }
      ).bind('typeahead:selected', function(obj, selected, name) {
          if (!options.supportAddressLookup) {
            correspondingIdEle.val(selected.payeeID);
          }
          else {
            correspondingIdEle.val("");
            correspondingJsonEle.val(JSON.stringify({ "tips": [selected] }));
            $.fn.tangerineTypeahead.setCitiesView(selected, correspondingIdEle, parentTT, ele,
              citiesUL, citiesSelect, streetsUL, streetsSelect, streetsAnchor, citiesAnchor);
          }
        })
        .bind('typeahead:autocompleted', function(obj, selected, name) {
          correspondingIdEle.val(options.supportAddressLookup ?
            selected.cities[0].billers[0].payeeID : selected.payeeID);
        })
        .bind('change', function() {
          var hasSuggestions = false;
          bloodHound.get(ele.val(), function(suggestions) {
            hasSuggestions = true;
            if (suggestions.length === 1 && typeof nestedPayee.payeeName !== "undefined") {
              correspondingIdEle.val(suggestions[0].payeeID);
              if (options.supportAddressLookup) {
                correspondingJsonEle.val(JSON.stringify({"tips": [suggestions]}));
              }
            }
            else {
              correspondingIdEle.val("");
              if (options.supportAddressLookup) {
                correspondingJsonEle.val("");
              }
            }
          });

          if (!hasSuggestions) {
            correspondingIdEle.val("");
            if (options.supportAddressLookup) {
              correspondingJsonEle.val("");
            }
          }
          if (options.supportAddressLookup) {
            ele.data('addresses', null);
            parentTT.siblings(".ta-cities").css("display", "none");
            parentTT.siblings(".ta-streets").css("display", "none");

            citiesUL.find("li:eq(0)").nextAll().remove();
            citiesSelect.find("option:eq(0)").nextAll().remove();
            streetsUL.find("li:eq(0)").nextAll().remove();
            streetsSelect.find("option:eq(0)").nextAll().remove();
          }
        })
        .bind('keydown', function(event) {
          var e = jQuery.Event("keydown");

          if (event.which == 13) { // if pressing enter, trigger tab instead
            e.keyCode = e.which = 9; // 9 = tab, 13 = enter
            ele.trigger(e);
            ele.typeahead('close');
          }
        })
        .bind("focusout", function(evt) {
          ele.typeahead('close');
        })
        .off('blur');

      if (options.supportAddressLookup) {
        correspondingIdEle = ele.parents(".payee-lookup-container").find("input[id^='" + idSelector + "']");
        if (correspondingIdEle.length === 0){
          correspondingIdEle = $("<input type='hidden' id='" + idSelector + elementNumericId + "' name='" + idSelector + elementNumericId + "'/>");
          ele.parents(".payee-lookup-container").append(correspondingIdEle);
        }
      } else {
        correspondingIdEle = ele.parent(".twitter-typeahead").siblings("input[id^='" + idSelector + "']");
        if (correspondingIdEle.length === 0){
          correspondingIdEle = $("<input type='hidden' id='" + idSelector + elementNumericId + "' name='" + idSelector + elementNumericId + "'/>");
          ele.parent(".twitter-typeahead").append(correspondingIdEle);
        }
      }

      if (options.supportAddressLookup) {
        correspondingJsonEle = ele.parents(".payee-lookup-container").find("input[id^='" + jsonSelector + "']");
        if (correspondingJsonEle.length === 0){
          correspondingJsonEle = $("<input type='hidden' id='" + jsonSelector + elementNumericId + "' name='" + jsonSelector + elementNumericId + "'/>");
          ele.parents(".payee-lookup-container").append(correspondingJsonEle);
        }
      }

      if (options.supportAddressLookup) {
        parentTT = ele.parents(".twitter-typeahead");
        parentTD = parentTT.parents(".payee-lookup-container");
        citiesUL = parentTD.find(".ta-cities ul.dropdown-menu");
        citiesSelect = parentTD.find(".ta-cities select");
        citiesAnchor = parentTD.find(".ta-cities a");
        streetsUL = parentTD.find(".ta-streets ul.dropdown-menu");
        streetsSelect = parentTD.find(".ta-streets select");
        streetsAnchor = parentTD.find(".ta-streets a");

        citiesSelect.on('updated.dropdown', function () {
          correspondingIdEle.val("");

          $.fn.tangerineTypeahead.setStreetsView($(this).val() ? $(this).find("option:selected").text() : "",
            parentTT, streetsUL, streetsSelect, streetsAnchor, ele);
        });
        streetsSelect.on('updated.dropdown', function () {
          correspondingIdEle.val($(this).val());
        });

      }

    });

  };

  $.fn.tangerineTypeahead.setStreetsView = function(city, parentTT, streetsUL, streetsSelect, streetsAnchor, ele) {
    var parentTD = parentTT.parents(".payee-lookup-container");
    parentTD.find(".ta-streets").css("display", "none");

    streetsUL.find("li:eq(0)").nextAll().remove();
    streetsSelect.find("option:eq(0)").nextAll().remove();
    streetsAnchor.text(streetsSelect.find("option:eq(0)").text());

    if (!city) {
      return;
    }

    var addresses = ele.data("addresses");
    var selectedCity = city;
    var filteredCity = addresses.cities.filter(function(city) {
      return city.city.trim().toLocaleLowerCase() === selectedCity.trim().toLocaleLowerCase(); })[0];

    if (filteredCity.billers.length == 1) {
      parentTD.find(".ta-streets").css("display", "none");
      var taPID = parentTD.find("input[id^=TypeAheadPayeeID]");
      if (taPID.length === 0) {
        taPID = parentTD.find("input[id^=TypeAheadPayeeID]");
      }
      taPID.val(filteredCity.billers[0].payeeID);
    }
    else {
      parentTD.find(".ta-streets").css("display", "block");
      filteredCity.billers.forEach(function(ele) {
        streetsUL.append($("<li></li>").append($("<a data-value='" + ele.payeeID + "' href='#'>").html(ele.address)));
        streetsSelect.append($("<option value='" + ele.payeeID + "'>").html(ele.address));
      });
    }

  };

  $.fn.tangerineTypeahead.setCitiesView = function(selected, correspondingIdEle, parentTT, ele,
                                                   citiesUL, citiesSelect, streetsUL, streetsSelect, streetsAnchor, citiesAnchor) {
    var parentTD = parentTT.parents(".payee-lookup-container");

    if ((typeof selected.tips !== "undefined" && selected.tips.length === 1
      && typeof selected.tips[0].cities !== "undefined" && selected.tips[0].cities.length === 1
      && selected.tips[0].cities[0].billers.length === 1) ||
      (typeof selected.cities !== "undefined" && selected.cities.length === 1 && selected.cities[0].billers.length === 1)) {

      correspondingIdEle.val(typeof selected.tips !== "undefined" ?
        selected.tips[0].cities[0].billers[0].payeeID : selected.cities[0].billers[0].payeeID);
      parentTD.find(".ta-cities").css("display", "none");
      parentTD.find(".ta-streets").css("display", "none");
    }
    else if (typeof selected.selectedPayeeId === "undefined") {
      parentTD.find(".ta-cities").css("display", "block");
      parentTD.find(".ta-streets").css("display", "none");
      correspondingIdEle.val("");
    }

    ele.data("addresses", selected);
    var cities;
    if (typeof selected.tips !== "undefined" && typeof selected.tips[0].cities !== "undefined") {
      cities = selected.tips[0].cities.map(function (ele) {
        return ele.city;
      });
    }
    else if (typeof selected.cities !== "undefined") {
      cities = selected.cities.map(function (ele) {
        return ele.city;
      });
    }

    citiesUL.find("li:eq(0)").nextAll().remove();
    citiesSelect.find("option:eq(0)").nextAll().remove();
    streetsUL.find("li:eq(0)").nextAll().remove();
    streetsSelect.find("option:eq(0)").nextAll().remove();

    if (typeof cities !== "undefined") {
      var selectFirstCity = cities.length === 1;
      cities.forEach(function (ele, index) {
        citiesUL.append($("<li></li>").append($("<a data-value='" + index + "' href='#'>").html(ele)));
        citiesSelect.append($("<option value='" + index + "'" +
        (selectFirstCity ? " selected='selected'" : "") + "</option>").html(ele));
      });

      streetsAnchor.text(streetsSelect.find("option:eq(0)").text());
      citiesAnchor.text(citiesSelect.find("option:eq(0)").text());
    }
  };

  $.fn.tangerineTypeahead.initializeAddresses = function(addresses) {
    if (!addresses) {
      return;
    }

    addresses.forEach(function(address) {
      var ele = $("#" + address.payeeNameField)
        , tr = ele.parents(".payee-lookup-container")
        , parentTT = ele.parents(".twitter-typeahead")
        , correspondingIdEle = tr.find("input[id^='TypeAheadPayeeID']")
        , citiesUL = tr.find(".ta-cities ul.dropdown-menu")
        , citiesSelect = tr.find(".ta-cities select")
        , citiesAnchor = tr.find(".ta-cities a")
        , streetsUL = tr.find(".ta-streets ul.dropdown-menu")
        , streetsSelect = tr.find(".ta-streets select")
        , streetsAnchor = tr.find(".ta-streets a");

      tr.find(".ta-cities").css("display", "none");
      tr.find(".ta-streets").css("display", "none");

      if (!ele.val()) {
        ele.typeahead("val", address.payeeName);
      }

      if (!ele.val()) {
        return;
      }
      var selectedPayeeId = address.selectedPayeeId;
      var selectedPayeeName = address.selectedPayeeName;

      if (address.tips.length === 0) {
        return true;
      }

      address.tips.some(function(nestedPayee) {
        if ((!selectedPayeeId && !!selectedPayeeName && typeof nestedPayee.payeeName !== "undefined"
          && nestedPayee.payeeName.trim().toLocaleLowerCase() === selectedPayeeName.trim().toLocaleLowerCase())) {
          address = nestedPayee;
          return true;
        }
        if (typeof nestedPayee.cities !== "undefined") {
          nestedPayee.cities.some(function (nestedCity) {
            return nestedCity.billers.some(function (nestedBiller) {
              if ((!!selectedPayeeId && nestedBiller.payeeID === selectedPayeeId)) {
                address = nestedPayee;
                return true;
              }
            });
          });
        }
      });

      if ((typeof address.cities !== "undefined" && address.cities.length === 1
        && address.cities[0].billers.length === 1)) {
        selectedPayeeId = address.cities[0].billers[0].payeeID;
      }

      $.fn.tangerineTypeahead.setCitiesView(address, correspondingIdEle, parentTT, ele,
        citiesUL, citiesSelect, streetsUL, streetsSelect, streetsAnchor, citiesAnchor);

      if (!!selectedPayeeId) {
        var selectedBiller = null;
        address.cities.some(function(city) {
          return city.billers.some(function(biller) {
            if (biller.payeeID === selectedPayeeId) {
              selectedBiller = { biller: biller, city: city.city };
              return true;
            }
          });
        });

        $.fn.tangerineTypeahead.setStreetsView(selectedBiller.city,
          parentTT, streetsUL, streetsSelect, streetsAnchor, ele);

        correspondingIdEle.val(selectedPayeeId);

        if ((address.cities.length === 1 && address.cities[0].billers.length === 1)) {
          tr.find(".ta-streets").css("display", "none");
        }
        else {
          if (!!selectedBiller) {
            citiesUL.find("li a").filter(function(index) {
              return $(this).text().trim().toLocaleLowerCase() ===
                selectedBiller.city.trim().toLocaleLowerCase(); }).click();
            streetsUL.find("a[data-value='" + selectedBiller.biller.payeeID + "']").click();
          }
        }
      }
    });
  };

  $.fn.tangerineTypeahead.defaults = {
    ajaxMethod: "GET",
    showLoader: true,
    typeAheadType: "PayeeName",
    supportAddressLookup: false
  };

  $.fn.tangerineTypeahead.configureAutoCompletesFromJavaScriptVariable = function() {
    if (typeof tangerineAutoCompleteRules === "object" && tangerineAutoCompleteRules.autoCompletes
      && tangerineAutoCompleteRules.autoCompletes.payeeName)
    {
      $("[id^='PayeeName']").tangerineTypeahead({
        typeAheadType: "PayeeName",
        url: tangerineAutoCompleteRules.autoCompletes.payeeName.dataUrl,
        queryParameter: tangerineAutoCompleteRules.autoCompletes.payeeName.keyId,
        notFoundTemplate: tangerineAutoCompleteRules.autoCompletes.payeeName.notFoundTemplate
      });
      $("body").trigger("typeaheadready");
    }
  };

  $(function() {
    $.fn.tangerineTypeahead.configureAutoCompletesFromJavaScriptVariable();
  });
}(window.jQuery));

(function($) {
  Tangerine.utils = Tangerine.utils || { };
  Tangerine.utils.dom = Tangerine.utils.dom || { };
  Tangerine.utils.dom.duplicateElement = function() {
      var targetSelector = $(this).attr("data-duplicate-target");
      var sourceSelector = $(this).attr("data-duplicate-source");
      var uniqueIdSelector = $(this).attr("data-unique-id-selector");
      var callback = $(this).attr("data-duplicate-complete-callback");
      var preConditionCallback = $(this).attr("data-duplicate-precondition-callback");

      if (!targetSelector || !sourceSelector || !uniqueIdSelector)
      {
        console.log("Configuration error. data-duplicate-source, data-duplicate-target, and data-unique-id-selector must be set");
        return;
      }

      if (!!preConditionCallback && window[preConditionCallback] && !window[preConditionCallback]()) return;

      var parsedHtml = Tangerine.utils.generateUniqueTemplate(
        sourceSelector,
        targetSelector,
        uniqueIdSelector
      );

      $(targetSelector).append(parsedHtml);
      parsedHtml.find("[data-toggle='dropdown']+ul").each(function() {
        Tangerine.utils.select.setupSelect(this);
      });
      parsedHtml.find("[data-toggle='modal']").each(function() {
        Tangerine.utils.modal.setupModal($(this));
      });

      if (!!$.validator && parsedHtml.find("input[data-rules],select[data-rules]").length > 0) {
        $.extend($.validator.defaults.rules, extractRules());
        $("input[data-rules],select[data-rules]").each(function() {
          $("#" + $(this).prop('id')).rules("add", $.validator.defaults.rules[$(this).prop('id')]);
        });
      }

      if (typeof tangerineAutoCompleteRules === "object" && tangerineAutoCompleteRules.autoCompletes && tangerineAutoCompleteRules.autoCompletes.payeeName)
      {
        parsedHtml.find("[id^='PayeeName']").tangerineTypeahead({
          url: tangerineAutoCompleteRules.autoCompletes.payeeName.dataUrl,
          queryParameter: tangerineAutoCompleteRules.autoCompletes.payeeName.keyId,
          notFoundTemplate: tangerineAutoCompleteRules.autoCompletes.payeeName.notFoundTemplate
        });
      }

      Tangerine.utils.dom.elementStyler.configureDom();

      if (window[callback]) window[callback](parsedHtml);
    };
  Tangerine.utils.dom.removeParentElement = function() {
    var targetSelector = $(this).attr("data-remove-parent-element");
    var callback = $(this).attr("data-remove-callback");

    if (!targetSelector) {
      console.log("data-remove-parent-element requires a value specified, which is the parent selector.")
      return;
    }
    var parent = $(this).parents(targetSelector);
    if (!parent) return;

    var prevSibling = parent.prev();

    if (prevSibling && prevSibling.prop("tagName") === "TR" && prevSibling.hasClass("error-msg-row"))
    {
      prevSibling.tngRemoveRow(function() {
      });
    }
    parent.tngRemoveRow(function() {
      if (window[callback]) window[callback]();
    });
  };

  $(function() {
    $(document).on('click', '[data-duplicate]', Tangerine.utils.dom.duplicateElement);
    $(document).on('click', '[data-remove-parent-element]', Tangerine.utils.dom.removeParentElement);
  });

  $.fn.tngRemoveRow = function(callback) {
    return this.each(function() {
      $(this).addClass("table-row-removed-row");
      var that = $(this);
      setTimeout(function() {
        that.remove();
        if (callback) callback();
      }, 250);
    });
  }

  var extractRules = function () {  // Extracts validation rules from HTML data-rules attrbutes, parses and sets in an object
    var rules = {};

    $('[data-rules]').each(function () {
      var $this = $(this)
        , id = $this.prop('id')
        , ruleMap = $this.attr('data-rules').split(',')
        , rule;

      if (!id) {
        return;
      }

      rules[id] = {};


      for (var i = 0; i < ruleMap.length; i += 1) {
        rule = ruleMap[i].split(':');
        if (/true|false/.test(rule[1])) { // String to Boolean check
          rule[1] = rule[1] === 'true' ? true : false;
        }

        else if (/^[\"\']*((?:[\,\s]?[\-]?\d{0,3})*)([\,\.]\d{2})[\'\"]*$/.test(rule[1])) { // String to Float check
          var results = rule[1].match(/^[\"\']*((?:[\,\s]?[\-]?\d{0,3})*)([\,\.]\d{2})[\'\"]*/)
          rule[1] = parseFloat(results[1] + results[2]);

        }

        else if (/^[\"\']*([\-]?[\d]+)[\"\']*$/.test(rule[1])) { // String to Integer check
          rule[1] = parseInt(rule[1].match(/^[\"\']*([\-]?[\d]+)[\"\']*$/)[1], 10);
        }

        else if (/[\[\]]/g.test(rule[1])) { // String to Array check
          rule[1] = $.trim(rule[1]).replace(/[\[\]]/g, '').split('|');
        }

        else if (/^[#\.]/.test(rule[1])) { // HTML ID/Class check
          rule[1] = rule[1];
        }

        else {
          continue;
        }

        rules[id][$.trim(rule[0])] = rule[1];
      }
    });
    return rules;
  }
}(window.jQuery));

(function() {
  Tangerine.utils.userAgentDetector = {

    Android: function () {
      return !!navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return !!navigator.userAgent.match(/(BB10|BlackBerry)/i);
    },
    iOS: function () {
      return !!navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    OperaMobile: function () {
      return !!navigator.userAgent.match(/Opera Mini/i);
    },
    WindowsMobile: function () {
      return !!navigator.userAgent.match(/IEMobile/i);
    },
    Mobile: function () {
      return (this.Android() || this.BlackBerry() || this.iOS() || this.OperaMobile() ||
      this.WindowsMobile());
    }
  }
}());
(function($) {
  'use strict';
  var Wait = function() {

    this.waitElement = '<div class="wait-container">' +
                          '<div class="wait-body">' +
                            '<div class="title">' +
                              '<h3>_title_</h3>' +
                              '<p>_titleSubText_</p>' +
                            '</div>' +
                            '<div class="wait-icon"><i class="_icon_"></i></div>' +
                            '<div class="sub-text">' +
                              '<p>_bodyText_</p>' +
                            '</div>' +
                          '</div>' +
                        '</div>';

  };

  Wait.prototype = {
    showWait : function(parentContainer, opt) {
      var $parentContainer = parentContainer;
      var $waitContainer = this.waitElement;

      var _temp = Tangerine.utils.applyDataObjectToTemplate($waitContainer, {
        title : opt.title,
        titleSubText : opt.titleSubText,
        icon : opt.icon,
        bodyText : opt.bodyText
      });

      $($parentContainer).append(_temp);

      if(typeof opt.notEntireScreen !== "undefined" && opt.notEntireScreen === true) {
        $(".wait-container").css({
          "position": "inherit",
          "top": "inherit",
          "bottom": "inherit",
          "left": "inherit",
          "right": "inherit",
          "z-index": "inherit",
          "width": "auto",
          "height": "auto",
          "padding": "20px"
        }).find(".wait-body").css("margin-top", 0);
      }

      if(typeof opt.textColor !== "undefined") {
        $(".wait-container").css("color", opt.textColor);
      }

      if(typeof opt.backgroundColor !== "undefined") {
        $(".wait-container").css("background-color", opt.backgroundColor);
      }
    }

  };

  $.fn.wait = function(option) {
    var settings = $.extend({
      title : "",
      titleSubText : "",
      icon : "wait",
      bodyText : "",
      notEntireScreen : false,
      textColor : "",
      backgroundColor : ""
    }, option);

    return this.each(function() {
      var parentContainer = this;
      var wait = new Wait(parentContainer, settings);
      wait.showWait(parentContainer, settings);
    });
  };

})(window.jQuery);
