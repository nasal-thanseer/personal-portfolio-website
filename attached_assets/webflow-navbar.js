/* globals window, document */

/**
 * Webflow: Navbar component
 */

var Webflow = require('../BaseSiteModules/webflow-lib');
var IXEvents = require('../BaseSiteModules/webflow-ix2-events');

const KEY_CODES = {
  ARROW_LEFT: 37,
  ARROW_UP: 38,
  ARROW_RIGHT: 39,
  ARROW_DOWN: 40,
  ESCAPE: 27,
  SPACE: 32,
  ENTER: 13,
  HOME: 36,
  END: 35,
};

Webflow.define(
  'navbar',
  (module.exports = function ($, _) {
    var api = {};
    var tram = $.tram;
    var $win = $(window);
    var $doc = $(document);
    var debounce = _.debounce;
    var $body;
    var $navbars;
    var designer;
    var inEditor;
    var inApp = Webflow.env();
    var overlay = '<div class="w-nav-overlay" data-wf-ignore />';
    var namespace = '.w-nav';
    var navbarOpenedButton = 'w--open';
    var navbarOpenedDropdown = 'w--nav-dropdown-open';
    var navbarOpenedDropdownToggle = 'w--nav-dropdown-toggle-open';
    var navbarOpenedDropdownList = 'w--nav-dropdown-list-open';
    var navbarOpenedLink = 'w--nav-link-open';
    var ix = IXEvents.triggers;
    var menuSibling = $();

    // -----------------------------------
    // Module methods

    api.ready = api.design = api.preview = init;

    api.destroy = function () {
      menuSibling = $();
      removeListeners();
      if ($navbars && $navbars.length) {
        $navbars.each(teardown);
      }
    };

    // -----------------------------------
    // Private methods

    function init() {
      designer = inApp && Webflow.env('design');
      inEditor = Webflow.env('editor');
      $body = $(document.body);

      // Find all instances on the page
      $navbars = $doc.find(namespace);
      if (!$navbars.length) {
        return;
      }
      $navbars.each(build);

      // Wire events
      removeListeners();
      addListeners();
    }

    function removeListeners() {
      Webflow.resize.off(resizeAll);
    }

    function addListeners() {
      Webflow.resize.on(resizeAll);
    }

    function resizeAll() {
      $navbars.each(resize);
    }

    function build(i, el) {
      var $el = $(el);

      // Store state in data
      var data = $.data(el, namespace);
      if (!data) {
        data = $.data(el, namespace, {
          open: false,
          el: $el,
          config: {},
          selectedIdx: -1,
        });
      }
      data.menu = $el.find('.w-nav-menu');
      data.links = data.menu.find('.w-nav-link');
      data.dropdowns = data.menu.find('.w-dropdown');
      data.dropdownToggle = data.menu.find('.w-dropdown-toggle');
      data.dropdownList = data.menu.find('.w-dropdown-list');
      data.button = $el.find('.w-nav-button');
      data.container = $el.find('.w-container');
      data.overlayContainerId = 'w-nav-overlay-' + i;
      data.outside = outside(data);

      //   If the brand links exists and is set to link to the homepage, the
      // default setting, then add an aria-label
      var navBrandLink = $el.find('.w-nav-brand');
      if (
        navBrandLink &&
        navBrandLink.attr('href') === '/' &&
        navBrandLink.attr('aria-label') == null
      ) {
        navBrandLink.attr('aria-label', 'home');
      }

      //   VoiceOver bug, when items that disallow user selection are focused
      // VoiceOver gets confused and scrolls to the end of the page. Â¯\_(ã)_/Â¯
      data.button.attr('style', '-webkit-user-select: text;');

      // Add attributes to toggle element
      if (data.button.attr('aria-label') == null) {
        data.button.attr('aria-label', 'menu');
      }

      data.button.attr('role', 'button');
      data.button.attr('tabindex', '0');
      data.button.attr('aria-controls', data.overlayContainerId);
      data.button.attr('aria-haspopup', 'menu');
      data.button.attr('aria-expanded', 'false');

      // Remove old events
      data.el.off(namespace);
      data.button.off(namespace);
      data.menu.off(namespace);

      // Set config from data attributes
      configure(data);

      // Add events based on mode
      if (designer) {
        removeOverlay(data);
        data.el.on('setting' + namespace, handler(data));
      } else {
        addOverlay(data);

        data.button.on('click' + namespace, toggle(data));
        data.menu.on('click' + namespace, 'a', navigate(data));

        data.button.on(
          'keydown' + namespace,
          makeToggleButtonKeyboardHandler(data)
        );
        data.el.on('keydown' + namespace, makeLinksKeyboardHandler(data));
      }

      // Trigger initial resize
      resize(i, el);
    }

    function teardown(i, el) {
      var data = $.data(el, namespace);
      if (data) {
        removeOverlay(data);
        $.removeData(el, namespace);
      }
    }

    function removeOverlay(data) {
      if (!data.overlay) {
        return;
      }
      close(data, true);
      data.overlay.remove();
      data.overlay = null;
    }

    function addOverlay(data) {
      if (data.overlay) {
        return;
      }
      data.overlay = $(overlay).appendTo(data.el);
      data.overlay.attr('id', data.overlayContainerId);
      data.parent = data.menu.parent();
      close(data, true);
    }

    function configure(data) {
      var config = {};
      var old = data.config || {};

      // Set config options from data attributes
      var animation = (config.animation =
        data.el.attr('data-animation') || 'default');
      config.animOver = /^over/.test(animation);
      config.animDirect = /left$/.test(animation) ? -1 : 1;

      // Re-open menu if the animation type changed
      if (old.animation !== animation) {
        data.open && _.defer(reopen, data);
      }

      config.easing = data.el.attr('data-easing') || 'ease';
      config.easing2 = data.el.attr('data-easing2') || 'ease';

      var duration = data.el.attr('data-duration');
      config.duration = duration != null ? Number(duration) : 400;

      config.docHeight = data.el.attr('data-doc-height');

      // Store config in data
      data.config = config;
    }

    function handler(data) {
      return function (evt, options) {
        options = options || {};
        var winWidth = $win.width();
        configure(data);
        options.open === true && open(data, true);
        options.open === false && close(data, true);
        // Reopen if media query changed after setting
        data.open &&
          _.defer(function () {
            if (winWidth !== $win.width()) {
              reopen(data);
            }
          });
      };
    }

    function makeToggleButtonKeyboardHandler(data) {
      return function (evt) {
        switch (evt.keyCode) {
          case KEY_CODES.SPACE:
          case KEY_CODES.ENTER: {
            // Toggle returns a function
            toggle(data)();

            evt.preventDefault();
            return evt.stopPropagation();
          }

          case KEY_CODES.ESCAPE: {
            close(data);

            evt.preventDefault();
            return evt.stopPropagation();
          }

          case KEY_CODES.ARROW_RIGHT:
          case KEY_CODES.ARROW_DOWN:
          case KEY_CODES.HOME:
          case KEY_CODES.END: {
            if (!data.open) {
              evt.preventDefault();
              return evt.stopPropagation();
            }

            if (evt.keyCode === KEY_CODES.END) {
              data.selectedIdx = data.links.length - 1;
            } else {
              data.selectedIdx = 0;
            }
            focusSelectedLink(data);

            evt.preventDefault();
            return evt.stopPropagation();
          }
        }
      };
    }

    function makeLinksKeyboardHandler(data) {
      return function (evt) {
        if (!data.open) {
          return;
        }

        // Realign selectedIdx with the menu item that is currently in focus.
        // We need this because we do not track the `Tab` key activity!
        data.selectedIdx = data.links.index(document.activeElement);

        switch (evt.keyCode) {
          case KEY_CODES.HOME:
          case KEY_CODES.END: {
            if (evt.keyCode === KEY_CODES.END) {
              data.selectedIdx = data.links.length - 1;
            } else {
              data.selectedIdx = 0;
            }
            focusSelectedLink(data);

            evt.preventDefault();
            return evt.stopPropagation();
          }

          case KEY_CODES.ESCAPE: {
            close(data);

            // Focus toggle button
            data.button.focus();

            evt.preventDefault();
            return evt.stopPropagation();
          }

          case KEY_CODES.ARROW_LEFT:
          case KEY_CODES.ARROW_UP: {
            data.selectedIdx = Math.max(-1, data.selectedIdx - 1);
            focusSelectedLink(data);

            evt.preventDefault();
            return evt.stopPropagation();
          }

          case KEY_CODES.ARROW_RIGHT:
          case KEY_CODES.ARROW_DOWN: {
            data.selectedIdx = Math.min(
              data.links.length - 1,
              data.selectedIdx + 1
            );

            focusSelectedLink(data);

            evt.preventDefault();
            return evt.stopPropagation();
          }
        }
      };
    }

    function focusSelectedLink(data) {
      if (data.links[data.selectedIdx]) {
        var selectedElement = data.links[data.selectedIdx];

        selectedElement.focus();
        navigate(selectedElement);
      }
    }

    function reopen(data) {
      if (!data.open) {
        return;
      }
      close(data, true);
      open(data, true);
    }

    function toggle(data) {
      // Debounce toggle to wait for accurate open state
      return debounce(function () {
        data.open ? close(data) : open(data);
      });
    }

    function navigate(data) {
      return function (evt) {
        var link = $(this);
        var href = link.attr('href');

        // Avoid late clicks on touch devices
        if (!Webflow.validClick(evt.currentTarget)) {
          evt.preventDefault();
          return;
        }

        // Close when navigating to an in-page anchor
        if (href && href.indexOf('#') === 0 && data.open) {
          close(data);
        }
      };
    }

    function outside(data) {
      // Unbind previous click handler if it exists
      if (data.outside) {
        $doc.off('click' + namespace, data.outside);
      }

      return function (evt) {
        var $target = $(evt.target);
        // Ignore clicks on Editor overlay UI
        if (inEditor && $target.closest('.w-editor-bem-EditorOverlay').length) {
          return;
        }
        // Close menu when clicked outside, debounced to wait for state
        outsideDebounced(data, $target);
      };
    }
    var outsideDebounced = debounce(function (data, $target) {
      if (!data.open) {
        return;
      }
      var menu = $target.closest('.w-nav-menu');
      if (!data.menu.is(menu)) {
        close(data);
      }
    });

    function resize(i, el) {
      var data = $.data(el, namespace);
      // Check for collapsed state based on button display
      var collapsed = (data.collapsed = data.button.css('display') !== 'none');
      // Close menu if button is no longer visible (and not in designer)
      if (data.open && !collapsed && !designer) {
        close(data, true);
      }
      // Set max-width of links + dropdowns to match container
      if (data.container.length) {
        var updateEachMax = updateMax(data);
        data.links.each(updateEachMax);
        data.dropdowns.each(updateEachMax);
      }
      // If currently open, update height to match body
      if (data.open) {
        setOverlayHeight(data);
      }
    }

    var maxWidth = 'max-width';
    function updateMax(data) {
      // Set max-width of each element to match container
      var containMax = data.container.css(maxWidth);
      if (containMax === 'none') {
        containMax = '';
      }
      return function (i, link) {
        link = $(link);
        link.css(maxWidth, '');
        // Don't set the max-width if an upstream value exists
        if (link.css(maxWidth) === 'none') {
          link.css(maxWidth, containMax);
        }
      };
    }

    function addMenuOpen(i, el) {
      el.setAttribute('data-nav-menu-open', '');
    }

    function removeMenuOpen(i, el) {
      el.removeAttribute('data-nav-menu-open');
    }

    function open(data, immediate) {
      if (data.open) {
        return;
      }
      data.open = true;
      data.menu.each(addMenuOpen);
      data.links.addClass(navbarOpenedLink);
      data.dropdowns.addClass(navbarOpenedDropdown);
      data.dropdownToggle.addClass(navbarOpenedDropdownToggle);
      data.dropdownList.addClass(navbarOpenedDropdownList);
      data.button.addClass(navbarOpenedButton);
      var config = data.config;
      var animation = config.animation;
      if (
        animation === 'none' ||
        !tram.support.transform ||
        config.duration <= 0
      ) {
        immediate = true;
      }
      var bodyHeight = setOverlayHeight(data);
      var menuHeight = data.menu.outerHeight(true);
      var menuWidth = data.menu.outerWidth(true);
      var navHeight = data.el.height();
      var navbarEl = data.el[0];
      resize(0, navbarEl);
      ix.intro(0, navbarEl);
      Webflow.redraw.up();

      // Listen for click outside events
      if (!designer) {
        $doc.on('click' + namespace, data.outside);
      }

      // No transition for immediate
      if (immediate) {
        complete();
        return;
      }

      var transConfig = 'transform ' + config.duration + 'ms ' + config.easing;

      // Add menu to overlay
      if (data.overlay) {
        menuSibling = data.menu.prev();
        data.overlay.show().append(data.menu);
      }

      // Over left/right
      if (config.animOver) {
        tram(data.menu)
          .add(transConfig)
          .set({x: config.animDirect * menuWidth, height: bodyHeight})
          .start({x: 0})
          .then(complete);
        data.overlay && data.overlay.width(menuWidth);
        return;
      }

      // Drop Down
      var offsetY = navHeight + menuHeight;
      tram(data.menu)
        .add(transConfig)
        .set({y: -offsetY})
        .start({y: 0})
        .then(complete);

      function complete() {
        data.button.attr('aria-expanded', 'true');
      }
    }

    function setOverlayHeight(data) {
      var config = data.config;
      var bodyHeight = config.docHeight ? $doc.height() : $body.height();
      if (config.animOver) {
        data.menu.height(bodyHeight);
      } else if (data.el.css('position') !== 'fixed') {
        bodyHeight -= data.el.outerHeight(true);
      }
      data.overlay && data.overlay.height(bodyHeight);
      return bodyHeight;
    }

    function close(data, immediate) {
      if (!data.open) {
        return;
      }
      data.open = false;
      data.button.removeClass(navbarOpenedButton);
      var config = data.config;
      if (
        config.animation === 'none' ||
        !tram.support.transform ||
        config.duration <= 0
      ) {
        immediate = true;
      }
      ix.outro(0, data.el[0]);

      // Stop listening for click outside events
      $doc.off('click' + namespace, data.outside);

      if (immediate) {
        tram(data.menu).stop();
        complete();
        return;
      }

      var transConfig = 'transform ' + config.duration + 'ms ' + config.easing2;
      var menuHeight = data.menu.outerHeight(true);
      var menuWidth = data.menu.outerWidth(true);
      var navHeight = data.el.height();

      // Over left/right
      if (config.animOver) {
        tram(data.menu)
          .add(transConfig)
          .start({x: menuWidth * config.animDirect})
          .then(complete);
        return;
      }

      // Drop Down
      var offsetY = navHeight + menuHeight;
      tram(data.menu).add(transConfig).start({y: -offsetY}).then(complete);

      function complete() {
        data.menu.height('');
        tram(data.menu).set({x: 0, y: 0});
        data.menu.each(removeMenuOpen);
        data.links.removeClass(navbarOpenedLink);
        data.dropdowns.removeClass(navbarOpenedDropdown);
        data.dropdownToggle.removeClass(navbarOpenedDropdownToggle);
        data.dropdownList.removeClass(navbarOpenedDropdownList);
        if (data.overlay && data.overlay.children().length) {
          // Move menu back to parent at the original location
          menuSibling.length
            ? data.menu.insertAfter(menuSibling)
            : data.menu.prependTo(data.parent);
          data.overlay.attr('style', '').hide();
        }

        // Trigger event so other components can hook in (dropdown)
        data.el.triggerHandler('w-close');
        data.button.attr('aria-expanded', 'false');
      }
    }

    // Export module
    return api;
  })
);
