/*************************/
/* Redirect to search page */
/*************************/
function redirectSearchInput() {
    var searchValue = $(".mobSearch .input-with-icon input").val();
    if (searchValue !== undefined && searchValue !== "") {
      window.location.href = "/search/searchresults.aspx?q=" + searchValue;
    }
  }
  
  function errorPageSearch() {
    var inputValue = $(".error-first input").val();
    if (inputValue !== undefined) {
      window.location.href = "/search/searchresults.aspx?q=" + inputValue;
    }
  }
  
  function setHeightCta(){
    //CTA block start
     var hbox = 0;
    $('.box-wrapper .content-wrapper').each(function() {
      if ($(this).height() > hbox) {
        hbox = $(this).height();
      }
    });
    var deviceHeight = $(window).width() >= 768 ? hbox : "auto";
  
    $('.box-wrapper .content-wrapper').height(deviceHeight);
  
    //CTA block end
  }
  /*************************/
  /* Smooth scroll */
  /*************************/
  function smoothScrollingTo(target){
    if (target !== "") { //Check if hash is not empty
      $('html,body').animate({
        scrollTop:$(target).offset().top - 100
      },850);
    }
  }
  $(window).load(function(){
    setTimeout(function(){
      smoothScrollingTo(location.hash);
    }, 300);
  });
  
  $(window).on("load resize",function(e){
    setHeightCta();
  });
  

  
  
  // function initStretchVideoIframe() {
  //   $('.header-container-wrap:has(iframe)').each(function() {
  //     var holder = $(this);
  //     var frame = holder.find('.bg-video');
  //     var iframe = holder.find('iframe');
  //     var iframeRatio = (iframe.attr('width') ? +iframe.attr('width') : iframe.width()) / (iframe.attr('height') ? +iframe.attr('height') : iframe.height());
  //     var setSize = function() {
  //       var maskHeight = holder.height();
  //       var maskWidth = holder.width();
  //       var slideWidth = maskWidth,
  //         slideHeight = slideWidth / iframeRatio;
  
  //       if (slideHeight < maskHeight) {
  //         slideHeight = maskHeight;
  //         slideWidth = slideHeight * iframeRatio;
  //       }
  
  //       frame.css({
  //         width: slideWidth,
  //         height: slideHeight,
  //         top: (maskHeight - slideHeight) / 2,
  //         left: (maskWidth - slideWidth) / 2
  //       });
  
  //     };
  //     setSize();
  //     $(window).on('load resize orientationchange', setSize);
  //   });
  // }
  // if ($(window).width() <= 1024) {
  //   initStretchVideoIframe();
  // }
  
  
  // jQuery(".drawer-outer .toggle").click(function() {
  //   jQuery(this).parent().next(".drawer-inner").slideToggle();
  //   jQuery(this).find(".open").toggle();
  //   jQuery(this).find(".close").toggle();
  // });
  
  jQuery(function() {
    initMobileNav();
    initVideohover();
    initVideoCategorySelect();
    initImagePopup();
  });
  //**DROPDOWN NAV PLUGIN-START**//
  /*!
   * JavaScript Custom Forms
   *
   * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
   * Released under the MIT license (LICENSE.txt)
   *
   * Version: 1.2.3
   */
  
  
  
  //when global menu was change
  jQuery('.top-nav-global-select').change(function() {
    //open in tab
  
    if (jQuery(".top-nav-global-select option").hasClass('leave-site-on') || jQuery(".jcf-list-content span").hasClass('jcf-option-leave-site-on')) {
  
      var leaving_site = {
        'href': '#leaving-site',
        type: 'inline',
        width: 'auto',
        height: 'auto',
        scrolling: 'no',
        closeBtn: true,
        padding: 15,
        loop: false,
        wrapCSS: 'leaving-site-modal',
        helpers: {
          overlay: {
            locked: true,
            showEarly: false,
            css: {
              background: 'rgba(17, 21, 21, 0.94)'
            },
            closeClick: true
          }
        },
        afterLoad: function(current, previous) {
          if (current.href.indexOf('#') === 0) {
            jQuery(current.href).find('a.close').off('click.fb').on('click.fb', function(e) {
              e.preventDefault();
              jQuery.fancybox.close();
            });
          }
        }
      };
      var $href = jQuery(this).val();
      var $link_id = jQuery(this).attr('id');
      if ($href == '#') return;
      if ($href === undefined) return;
      var $slash = $href.indexOf('/');
      if ($slash == 0) return;
      var $tel = $href.indexOf('tel:');
      var $mailto = $href.indexOf('mailto:');
      if ($tel == 0) return;
      if ($mailto == 0) return;
      var baseurl = window.location.origin;
      var $index = $href.indexOf(baseurl);
      jQuery("#continue-to-requested-site").attr("href", jQuery(this).val());
      jQuery.fancybox.open(leaving_site);
      event.preventDefault();
      return false;
  
    } else {
      window.open(jQuery(this).val(), '_blank');
    }
  });
  
  ! function(e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? module.exports = t(require("jquery")) : e.jcf = t(jQuery)
  }(this, function(e) {
    "use strict";
    var t = "1.2.3",
      n = [],
      o = {
        optionsKey: "jcf",
        dataKey: "jcf-instance",
        rtlClass: "jcf-rtl",
        focusClass: "jcf-focus",
        pressedClass: "jcf-pressed",
        disabledClass: "jcf-disabled",
        hiddenClass: "jcf-hidden",
        resetAppearanceClass: "jcf-reset-appearance",
        unselectableClass: "jcf-unselectable"
      },
      a = "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch,
      i = /Windows Phone/.test(navigator.userAgent);
    o.isMobileDevice = !(!a && !i);
    var r = function() {
      var t = e("<style>").appendTo("head"),
        n = t.prop("sheet") || t.prop("styleSheet"),
        a = function(e, t, o) {
          o = o || 0,
            n.insertRule ? n.insertRule(e + "{" + t + "}", o) : n.addRule(e, t, o)
        };
      a("." + o.hiddenClass, "position:absolute !important;left:-9999px !important;height:1px !important;width:1px !important;margin:0 !important;border-width:0 !important;-webkit-appearance:none;-moz-appearance:none;appearance:none"),
        a("." + o.rtlClass + " ." + o.hiddenClass, "right:-9999px !important; left: auto !important"),
        a("." + o.unselectableClass, "-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-tap-highlight-color: rgba(0,0,0,0);"),
        a("." + o.resetAppearanceClass, "background: none; border: none; -webkit-appearance: none; appearance: none; opacity: 0; filter: alpha(opacity=0);");
      var i = e("html"),
        r = e("body");
      "rtl" !== i.css("direction") && "rtl" !== r.css("direction") || i.addClass(o.rtlClass),
        i.on("reset", function() {
          setTimeout(function() {
            c.refreshAll()
          }, 0)
        }),
        o.styleSheetCreated = !0
    };
    ! function() {
      var t, n = navigator.pointerEnabled || navigator.msPointerEnabled,
        o = "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch,
        a = {},
        i = "jcf-";
      t = n ? {
          pointerover: navigator.pointerEnabled ? "pointerover" : "MSPointerOver",
          pointerdown: navigator.pointerEnabled ? "pointerdown" : "MSPointerDown",
          pointermove: navigator.pointerEnabled ? "pointermove" : "MSPointerMove",
          pointerup: navigator.pointerEnabled ? "pointerup" : "MSPointerUp"
        } : {
          pointerover: "mouseover",
          pointerdown: "mousedown" + (o ? " touchstart" : ""),
          pointermove: "mousemove" + (o ? " touchmove" : ""),
          pointerup: "mouseup" + (o ? " touchend" : "")
        },
        e.each(t, function(t, n) {
          e.each(n.split(" "), function(e, n) {
            a[n] = t
          })
        }),
        e.each(t, function(t, n) {
          n = n.split(" "),
            e.event.special[i + t] = {
              setup: function() {
                var t = this;
                e.each(n, function(e, n) {
                  t.addEventListener ? t.addEventListener(n, c, !1) : t["on" + n] = c
                })
              },
              teardown: function() {
                var t = this;
                e.each(n, function(e, n) {
                  t.addEventListener ? t.removeEventListener(n, c, !1) : t["on" + n] = null
                })
              }
            }
        });
      var r = null,
        s = function(e) {
          var t = Math.abs(e.pageX - r.x),
            n = Math.abs(e.pageY - r.y),
            o = 25;
          return o >= t && o >= n ? !0 : void 0
        },
        c = function(t) {
          var n = t || window.event,
            o = null,
            c = a[n.type];
          if (t = e.event.fix(n),
            t.type = i + c,
            n.pointerType)
            switch (n.pointerType) {
              case 2:
                t.pointerType = "touch";
                break;
              case 3:
                t.pointerType = "pen";
                break;
              case 4:
                t.pointerType = "mouse";
                break;
              default:
                t.pointerType = n.pointerType
            }
          else
            t.pointerType = n.type.substr(0, 5);
          return t.pageX || t.pageY || (o = n.changedTouches ? n.changedTouches[0] : n,
              t.pageX = o.pageX,
              t.pageY = o.pageY),
            "touchend" === n.type && (r = {
              x: t.pageX,
              y: t.pageY
            }),
            "mouse" === t.pointerType && r && s(t) ? void 0 : (e.event.dispatch || e.event.handle).call(this, t)
        }
    }(),
    function() {
      var t = ("onwheel" in document || document.documentMode >= 9 ? "wheel" : "mousewheel DOMMouseScroll").split(" "),
        n = "jcf-mousewheel";
      e.event.special[n] = {
        setup: function() {
          var n = this;
          e.each(t, function(e, t) {
            n.addEventListener ? n.addEventListener(t, o, !1) : n["on" + t] = o
          })
        },
        teardown: function() {
          var n = this;
          e.each(t, function(e, t) {
            n.addEventListener ? n.removeEventListener(t, o, !1) : n["on" + t] = null
          })
        }
      };
      var o = function(t) {
        var o = t || window.event;
        if (t = e.event.fix(o),
          t.type = n,
          "detail" in o && (t.deltaY = -o.detail),
          "wheelDelta" in o && (t.deltaY = -o.wheelDelta),
          "wheelDeltaY" in o && (t.deltaY = -o.wheelDeltaY),
          "wheelDeltaX" in o && (t.deltaX = -o.wheelDeltaX),
          "deltaY" in o && (t.deltaY = o.deltaY),
          "deltaX" in o && (t.deltaX = o.deltaX),
          t.delta = t.deltaY || t.deltaX,
          1 === o.deltaMode) {
          var a = 16;
          t.delta *= a,
            t.deltaY *= a,
            t.deltaX *= a
        }
        return (e.event.dispatch || e.event.handle).call(this, t)
      }
    }();
    var s = {
        fireNativeEvent: function(t, n) {
          e(t).each(function() {
            var e, t = this;
            t.dispatchEvent ? (e = document.createEvent("HTMLEvents"),
              e.initEvent(n, !0, !0),
              t.dispatchEvent(e)) : document.createEventObject && (e = document.createEventObject(),
              e.target = t,
              t.fireEvent("on" + n, e))
          })
        },
        bindHandlers: function() {
          var t = this;
          e.each(t, function(n, o) {
            0 === n.indexOf("on") && e.isFunction(o) && (t[n] = function() {
              return o.apply(t, arguments)
            })
          })
        }
      },
      c = {
        version: t,
        modules: {},
        getOptions: function() {
          return e.extend({}, o)
        },
        setOptions: function(t, n) {
          arguments.length > 1 ? this.modules[t] && e.extend(this.modules[t].prototype.options, n) : e.extend(o, t)
        },
        addModule: function(t) {
          e.isFunction(t) && (t = t(e, window));
          var a = function(t) {
              t.element.data(o.dataKey) || t.element.data(o.dataKey, this),
                n.push(this),
                this.options = e.extend({}, o, this.options, i(t.element), t),
                this.bindHandlers(),
                this.init.apply(this, arguments)
            },
            i = function(t) {
              var n = t.data(o.optionsKey),
                a = t.attr(o.optionsKey);
              if (n)
                return n;
              if (a)
                try {
                  return e.parseJSON(a)
                } catch (i) {}
            };
          a.prototype = t,
            e.extend(t, s),
            t.plugins && e.each(t.plugins, function(t, n) {
              e.extend(n.prototype, s)
            });
          var r = a.prototype.destroy;
          a.prototype.destroy = function() {
              this.options.element.removeData(this.options.dataKey);
              for (var e = n.length - 1; e >= 0; e--)
                if (n[e] === this) {
                  n.splice(e, 1);
                  break
                }
              r && r.apply(this, arguments)
            },
            this.modules[t.name] = a
        },
        getInstance: function(t) {
          return e(t).data(o.dataKey)
        },
        replace: function(t, n, a) {
          var i, s = this;
          return o.styleSheetCreated || r(),
            e(t).each(function() {
              var t, r = e(this);
              i = r.data(o.dataKey),
                i ? i.refresh() : (n || e.each(s.modules, function(e, t) {
                    return t.prototype.matchElement.call(t.prototype, r) ? (n = e, !1) : void 0
                  }),
                  n && (t = e.extend({
                      element: r
                    }, a),
                    i = new s.modules[n](t)))
            }),
            i
        },
        refresh: function(t) {
          e(t).each(function() {
            var t = e(this).data(o.dataKey);
            t && t.refresh()
          })
        },
        destroy: function(t) {
          e(t).each(function() {
            var t = e(this).data(o.dataKey);
            t && t.destroy()
          })
        },
        replaceAll: function(t) {
          var n = this;
          e.each(this.modules, function(o, a) {
            e(a.prototype.selector, t).each(function() {
              this.className.indexOf("jcf-ignore") < 0 && n.replace(this, o)
            })
          })
        },
        refreshAll: function(t) {
          if (t)
            e.each(this.modules, function(n, a) {
              e(a.prototype.selector, t).each(function() {
                var t = e(this).data(o.dataKey);
                t && t.refresh()
              })
            });
          else
            for (var a = n.length - 1; a >= 0; a--)
              n[a].refresh()
        },
        destroyAll: function(t) {
          if (t)
            e.each(this.modules, function(n, a) {
              e(a.prototype.selector, t).each(function(t, n) {
                var a = e(n).data(o.dataKey);
                a && a.destroy()
              })
            });
          else
            for (; n.length;)
              n[0].destroy()
        }
      };
    return "function" == typeof define && define.amd && (window.jcf = c),
      c
  });
  
  ! function(e) {
    e.addModule(function(t, s) {
      "use strict";
  
      function i(e) {
        this.options = t.extend({
            wrapNative: !0,
            wrapNativeOnMobile: !0,
            fakeDropInBody: !0,
            useCustomScroll: !0,
            flipDropToFit: !0,
            maxVisibleItems: 10,
            fakeAreaStructure: '<span class="jcf-select"><span class="jcf-select-text"></span><span class="jcf-select-opener"></span></span>',
            fakeDropStructure: '<div class="jcf-select-drop"><div class="jcf-select-drop-content"></div></div>',
            optionClassPrefix: "jcf-option-",
            selectClassPrefix: "jcf-select-",
            dropContentSelector: ".jcf-select-drop-content",
            selectTextSelector: ".jcf-select-text",
            dropActiveClass: "jcf-drop-active",
            flipDropClass: "jcf-drop-flipped"
          }, e),
          this.init()
      }
  
      function o(e) {
        this.options = t.extend({
            wrapNative: !0,
            useCustomScroll: !0,
            fakeStructure: '<span class="jcf-list-box"><span class="jcf-list-wrapper"></span></span>',
            selectClassPrefix: "jcf-select-",
            listHolder: ".jcf-list-wrapper"
          }, e),
          this.init()
      }
  
      function n(e) {
        this.options = t.extend({
            holder: null,
            maxVisibleItems: 10,
            selectOnClick: !0,
            useHoverClass: !1,
            useCustomScroll: !1,
            handleResize: !0,
            multipleSelectWithoutKey: !1,
            alwaysPreventMouseWheel: !1,
            indexAttribute: "data-index",
            cloneClassPrefix: "jcf-option-",
            containerStructure: '<span class="jcf-list"><span class="jcf-list-content"></span></span>',
            containerSelector: ".jcf-list-content",
            captionClass: "jcf-optgroup-caption",
            disabledClass: "jcf-disabled",
            optionClass: "jcf-option",
            groupClass: "jcf-optgroup",
            hoverClass: "jcf-hover",
            selectedClass: "jcf-selected",
            scrollClass: "jcf-scroll-active"
          }, e),
          this.init()
      }
      var l = {
        name: "Select",
        selector: "select",
        options: {
          element: null,
          multipleCompactStyle: !1
        },
        plugins: {
          ListBox: o,
          ComboBox: i,
          SelectList: n
        },
        matchElement: function(e) {
          return e.is("select")
        },
        init: function() {
          this.element = t(this.options.element),
            this.createInstance()
        },
        isListBox: function() {
          return this.element.is("[size]:not([jcf-size]), [multiple]")
        },
        createInstance: function() {
          this.instance && this.instance.destroy(),
            this.isListBox() && !this.options.multipleCompactStyle ? this.instance = new o(this.options) : this.instance = new i(this.options)
        },
        refresh: function() {
          var e = this.isListBox() && this.instance instanceof i || !this.isListBox() && this.instance instanceof o;
          e ? this.createInstance() : this.instance.refresh()
        },
        destroy: function() {
          this.instance.destroy()
        }
      };
      t.extend(i.prototype, {
          init: function() {
            this.initStructure(),
              this.bindHandlers(),
              this.attachEvents(),
              this.refresh()
          },
          initStructure: function() {
            this.win = t(s),
              this.doc = t(document),
              this.realElement = t(this.options.element),
              this.fakeElement = t(this.options.fakeAreaStructure).insertAfter(this.realElement),
              this.selectTextContainer = this.fakeElement.find(this.options.selectTextSelector),
              this.selectText = t("<span></span>").appendTo(this.selectTextContainer),
              h(this.fakeElement),
              this.fakeElement.addClass(r(this.realElement.prop("className"), this.options.selectClassPrefix)),
              this.realElement.prop("multiple") && this.fakeElement.addClass("jcf-compact-multiple"),
              this.options.isMobileDevice && this.options.wrapNativeOnMobile && !this.options.wrapNative && (this.options.wrapNative = !0),
              this.options.wrapNative ? this.realElement.prependTo(this.fakeElement).css({
                position: "absolute",
                height: "100%",
                width: "100%"
              }).addClass(this.options.resetAppearanceClass) : (this.realElement.addClass(this.options.hiddenClass),
                this.fakeElement.attr("title", this.realElement.attr("title")),
                this.fakeDropTarget = this.options.fakeDropInBody ? t("body") : this.fakeElement)
          },
          attachEvents: function() {
            var e = this;
            this.delayedRefresh = function() {
                setTimeout(function() {
                  e.refresh(),
                    e.list && (e.list.refresh(),
                      e.list.scrollToActiveOption())
                }, 1)
              },
              this.options.wrapNative ? this.realElement.on({
                focus: this.onFocus,
                change: this.onChange,
                click: this.onChange,
                keydown: this.delayedRefresh
              }) : (this.realElement.on({
                  focus: this.onFocus,
                  change: this.onChange,
                  keydown: this.onKeyDown
                }),
                this.fakeElement.on({
                  "jcf-pointerdown": this.onSelectAreaPress
                }))
          },
          onKeyDown: function(e) {
            13 === e.which ? this.toggleDropdown() : this.dropActive && this.delayedRefresh()
          },
          onChange: function() {
            this.refresh()
          },
          onFocus: function() {
            this.pressedFlag && this.focusedFlag || (this.fakeElement.addClass(this.options.focusClass),
              this.realElement.on("blur", this.onBlur),
              this.toggleListMode(!0),
              this.focusedFlag = !0)
          },
          onBlur: function() {
            this.pressedFlag || (this.fakeElement.removeClass(this.options.focusClass),
              this.realElement.off("blur", this.onBlur),
              this.toggleListMode(!1),
              this.focusedFlag = !1)
          },
          onResize: function() {
            this.dropActive && this.hideDropdown()
          },
          onSelectDropPress: function() {
            this.pressedFlag = !0
          },
          onSelectDropRelease: function(e, t) {
            this.pressedFlag = !1,
              "mouse" === t.pointerType && this.realElement.focus()
          },
          onSelectAreaPress: function(e) {
            var s = !this.options.fakeDropInBody && t(e.target).closest(this.dropdown).length;
            s || e.button > 1 || this.realElement.is(":disabled") || (this.selectOpenedByEvent = e.pointerType,
              this.toggleDropdown(),
              this.focusedFlag || ("mouse" === e.pointerType ? this.realElement.focus() : this.onFocus(e)),
              this.pressedFlag = !0,
              this.fakeElement.addClass(this.options.pressedClass),
              this.doc.on("jcf-pointerup", this.onSelectAreaRelease))
          },
          onSelectAreaRelease: function(e) {
            this.focusedFlag && "mouse" === e.pointerType && this.realElement.focus(),
              this.pressedFlag = !1,
              this.fakeElement.removeClass(this.options.pressedClass),
              this.doc.off("jcf-pointerup", this.onSelectAreaRelease)
          },
          onOutsideClick: function(e) {
            var s = t(e.target),
              i = s.closest(this.fakeElement).length || s.closest(this.dropdown).length;
            i || this.hideDropdown()
          },
          onSelect: function() {
            this.refresh(),
              this.realElement.prop("multiple") ? this.repositionDropdown() : this.hideDropdown(),
              this.fireNativeEvent(this.realElement, "change")
          },
          toggleListMode: function(e) {
            this.options.wrapNative || (e ? this.realElement.attr({
              size: 4,
              "jcf-size": ""
            }) : this.options.wrapNative || this.realElement.removeAttr("size jcf-size"))
          },
          createDropdown: function() {
            this.dropdown && (this.list.destroy(),
                this.dropdown.remove()),
              this.dropdown = t(this.options.fakeDropStructure).appendTo(this.fakeDropTarget),
              this.dropdown.addClass(r(this.realElement.prop("className"), this.options.selectClassPrefix)),
              h(this.dropdown),
              this.realElement.prop("multiple") && this.dropdown.addClass("jcf-compact-multiple"),
              this.options.fakeDropInBody && this.dropdown.css({
                position: "absolute",
                top: -9999
              }),
              this.list = new n({
                useHoverClass: !0,
                handleResize: !1,
                alwaysPreventMouseWheel: !0,
                maxVisibleItems: this.options.maxVisibleItems,
                useCustomScroll: this.options.useCustomScroll,
                holder: this.dropdown.find(this.options.dropContentSelector),
                multipleSelectWithoutKey: this.realElement.prop("multiple"),
                element: this.realElement
              }),
              t(this.list).on({
                select: this.onSelect,
                press: this.onSelectDropPress,
                release: this.onSelectDropRelease
              })
          },
          repositionDropdown: function() {
            var e, t, s, i = this.fakeElement.offset(),
              o = this.fakeElement[0].getBoundingClientRect(),
              n = o.width || o.right - o.left,
              l = this.fakeElement.outerHeight(),
              r = this.dropdown.css("width", n).outerHeight(),
              h = this.win.scrollTop(),
              a = this.win.height(),
              c = !1;
            i.top + l + r > h + a && i.top - r > h && (c = !0),
              this.options.fakeDropInBody && (s = "static" !== this.fakeDropTarget.css("position") ? this.fakeDropTarget.offset().top : 0,
                this.options.flipDropToFit && c ? (t = i.left,
                  e = i.top - r - s) : (t = i.left,
                  e = i.top + l - s),
                this.dropdown.css({
                  width: n,
                  left: t,
                  top: e
                })),
              this.dropdown.add(this.fakeElement).toggleClass(this.options.flipDropClass, this.options.flipDropToFit && c)
          },
          showDropdown: function() {
            this.realElement.prop("options").length && (this.dropdown || this.createDropdown(),
              this.dropActive = !0,
              this.dropdown.appendTo(this.fakeDropTarget),
              this.fakeElement.addClass(this.options.dropActiveClass),
              this.refreshSelectedText(),
              this.repositionDropdown(),
              this.list.setScrollTop(this.savedScrollTop),
              this.list.refresh(),
              this.win.on("resize", this.onResize),
              this.doc.on("jcf-pointerdown", this.onOutsideClick))
          },
          hideDropdown: function() {
            this.dropdown && (this.savedScrollTop = this.list.getScrollTop(),
              this.fakeElement.removeClass(this.options.dropActiveClass + " " + this.options.flipDropClass),
              this.dropdown.removeClass(this.options.flipDropClass).detach(),
              this.doc.off("jcf-pointerdown", this.onOutsideClick),
              this.win.off("resize", this.onResize),
              this.dropActive = !1,
              "touch" === this.selectOpenedByEvent && this.onBlur())
          },
          toggleDropdown: function() {
            this.dropActive ? this.hideDropdown() : this.showDropdown()
          },
          refreshSelectedText: function() {
            var e, s = this.realElement.prop("selectedIndex"),
              i = this.realElement.prop("options")[s],
              o = i ? i.getAttribute("data-image") : null,
              n = "",
              l = this;
            this.realElement.prop("multiple") ? (t.each(this.realElement.prop("options"), function(e, t) {
                t.selected && (n += (n ? ", " : "") + t.innerHTML)
              }),
              n || (n = l.realElement.attr("placeholder") || ""),
              this.selectText.removeAttr("class").html(n)) : i ? this.currentSelectedText === i.innerHTML && this.currentSelectedImage === o || (e = r(i.className, this.options.optionClassPrefix),
              this.selectText.attr("class", e).html(i.innerHTML),
              o ? (this.selectImage || (this.selectImage = t("<img>").prependTo(this.selectTextContainer).hide()),
                this.selectImage.attr("src", o).show()) : this.selectImage && this.selectImage.hide(),
              this.currentSelectedText = i.innerHTML,
              this.currentSelectedImage = o) : (this.selectImage && this.selectImage.hide(),
              this.selectText.removeAttr("class").empty())
          },
          refresh: function() {
            "none" === this.realElement.prop("style").display ? this.fakeElement.hide() : this.fakeElement.show(),
              this.refreshSelectedText(),
              this.fakeElement.toggleClass(this.options.disabledClass, this.realElement.is(":disabled"))
          },
          destroy: function() {
            this.options.wrapNative ? this.realElement.insertBefore(this.fakeElement).css({
                position: "",
                height: "",
                width: ""
              }).removeClass(this.options.resetAppearanceClass) : (this.realElement.removeClass(this.options.hiddenClass),
                this.realElement.is("[jcf-size]") && this.realElement.removeAttr("size jcf-size")),
              this.fakeElement.remove(),
              this.doc.off("jcf-pointerup", this.onSelectAreaRelease),
              this.realElement.off({
                focus: this.onFocus
              })
          }
        }),
        t.extend(o.prototype, {
          init: function() {
            this.bindHandlers(),
              this.initStructure(),
              this.attachEvents()
          },
          initStructure: function() {
            this.realElement = t(this.options.element),
              this.fakeElement = t(this.options.fakeStructure).insertAfter(this.realElement),
              this.listHolder = this.fakeElement.find(this.options.listHolder),
              h(this.fakeElement),
              this.fakeElement.addClass(r(this.realElement.prop("className"), this.options.selectClassPrefix)),
              this.realElement.addClass(this.options.hiddenClass),
              this.list = new n({
                useCustomScroll: this.options.useCustomScroll,
                holder: this.listHolder,
                selectOnClick: !1,
                element: this.realElement
              })
          },
          attachEvents: function() {
            var e = this;
            this.delayedRefresh = function(t) {
                t && (16 === t.which || t.ctrlKey || t.metaKey || t.altKey) || (clearTimeout(e.refreshTimer),
                  e.refreshTimer = setTimeout(function() {
                    e.refresh(),
                      e.list.scrollToActiveOption()
                  }, 1))
              },
              this.realElement.on({
                focus: this.onFocus,
                click: this.delayedRefresh,
                keydown: this.delayedRefresh
              }),
              t(this.list).on({
                select: this.onSelect,
                press: this.onFakeOptionsPress,
                release: this.onFakeOptionsRelease
              })
          },
          onFakeOptionsPress: function(e, t) {
            this.pressedFlag = !0,
              "mouse" === t.pointerType && this.realElement.focus()
          },
          onFakeOptionsRelease: function(e, t) {
            this.pressedFlag = !1,
              "mouse" === t.pointerType && this.realElement.focus()
          },
          onSelect: function() {
            this.fireNativeEvent(this.realElement, "change"),
              this.fireNativeEvent(this.realElement, "click")
          },
          onFocus: function() {
            this.pressedFlag && this.focusedFlag || (this.fakeElement.addClass(this.options.focusClass),
              this.realElement.on("blur", this.onBlur),
              this.focusedFlag = !0)
          },
          onBlur: function() {
            this.pressedFlag || (this.fakeElement.removeClass(this.options.focusClass),
              this.realElement.off("blur", this.onBlur),
              this.focusedFlag = !1)
          },
          refresh: function() {
            this.fakeElement.toggleClass(this.options.disabledClass, this.realElement.is(":disabled")),
              this.list.refresh()
          },
          destroy: function() {
            this.list.destroy(),
              this.realElement.insertBefore(this.fakeElement).removeClass(this.options.hiddenClass),
              this.fakeElement.remove()
          }
        }),
        t.extend(n.prototype, {
          init: function() {
            this.initStructure(),
              this.refreshSelectedClass(),
              this.attachEvents()
          },
          initStructure: function() {
            this.element = t(this.options.element),
              this.indexSelector = "[" + this.options.indexAttribute + "]",
              this.container = t(this.options.containerStructure).appendTo(this.options.holder),
              this.listHolder = this.container.find(this.options.containerSelector),
              this.lastClickedIndex = this.element.prop("selectedIndex"),
              this.rebuildList(),
              this.element.prop("multiple") && (this.previousSelection = this.getSelectedOptionsIndexes())
          },
          attachEvents: function() {
            this.bindHandlers(),
              this.listHolder.on("jcf-pointerdown", this.indexSelector, this.onItemPress),
              this.listHolder.on("jcf-pointerdown", this.onPress),
              this.options.useHoverClass && this.listHolder.on("jcf-pointerover", this.indexSelector, this.onHoverItem)
          },
          onPress: function(e) {
            t(this).trigger("press", e),
              this.listHolder.on("jcf-pointerup", this.onRelease)
          },
          onRelease: function(e) {
            t(this).trigger("release", e),
              this.listHolder.off("jcf-pointerup", this.onRelease)
          },
          onHoverItem: function(e) {
            var t = parseFloat(e.currentTarget.getAttribute(this.options.indexAttribute));
            this.fakeOptions.removeClass(this.options.hoverClass).eq(t).addClass(this.options.hoverClass)
          },
          onItemPress: function(e) {
            "touch" === e.pointerType || this.options.selectOnClick ? (this.tmpListOffsetTop = this.list.offset().top,
              this.listHolder.on("jcf-pointerup", this.indexSelector, this.onItemRelease)) : this.onSelectItem(e)
          },
          onItemRelease: function(e) {
            this.listHolder.off("jcf-pointerup", this.indexSelector, this.onItemRelease),
              this.tmpListOffsetTop === this.list.offset().top && this.listHolder.on("click", this.indexSelector, {
                savedPointerType: e.pointerType
              }, this.onSelectItem),
              delete this.tmpListOffsetTop
          },
          onSelectItem: function(e) {
            var s, i = parseFloat(e.currentTarget.getAttribute(this.options.indexAttribute)),
              o = e.data && e.data.savedPointerType || e.pointerType || "mouse";
            this.listHolder.off("click", this.indexSelector, this.onSelectItem),
              e.button > 1 || this.realOptions[i].disabled || (this.element.prop("multiple") ? e.metaKey || e.ctrlKey || "touch" === o || this.options.multipleSelectWithoutKey ? this.realOptions[i].selected = !this.realOptions[i].selected : e.shiftKey ? (s = [this.lastClickedIndex, i].sort(function(e, t) {
                    return e - t
                  }),
                  this.realOptions.each(function(e, t) {
                    t.selected = e >= s[0] && e <= s[1]
                  })) : this.element.prop("selectedIndex", i) : this.element.prop("selectedIndex", i),
                e.shiftKey || (this.lastClickedIndex = i),
                this.refreshSelectedClass(),
                "mouse" === o && this.scrollToActiveOption(),
                t(this).trigger("select"))
          },
          rebuildList: function() {
            var s = this,
              i = this.element[0];
            this.storedSelectHTML = i.innerHTML,
              this.optionIndex = 0,
              this.list = t(this.createOptionsList(i)),
              this.listHolder.empty().append(this.list),
              this.realOptions = this.element.find("option"),
              this.fakeOptions = this.list.find(this.indexSelector),
              this.fakeListItems = this.list.find("." + this.options.captionClass + "," + this.indexSelector),
              delete this.optionIndex;
            var o = this.options.maxVisibleItems,
              n = this.element.prop("size");
            n > 1 && !this.element.is("[jcf-size]") && (o = n);
            var l = this.fakeOptions.length > o;
            return this.container.toggleClass(this.options.scrollClass, l),
              l && (this.listHolder.css({
                  maxHeight: this.getOverflowHeight(o),
                  overflow: "auto"
                }),
                this.options.useCustomScroll && e.modules.Scrollable) ? void e.replace(this.listHolder, "Scrollable", {
                handleResize: this.options.handleResize,
                alwaysPreventMouseWheel: this.options.alwaysPreventMouseWheel
              }) : void(this.options.alwaysPreventMouseWheel && (this.preventWheelHandler = function(e) {
                  var t = s.listHolder.scrollTop(),
                    i = s.listHolder.prop("scrollHeight") - s.listHolder.innerHeight();
                  (0 >= t && e.deltaY < 0 || t >= i && e.deltaY > 0) && e.preventDefault()
                },
                this.listHolder.on("jcf-mousewheel", this.preventWheelHandler)))
          },
          refreshSelectedClass: function() {
            var e, t = this,
              s = this.element.prop("multiple"),
              i = this.element.prop("selectedIndex");
            s ? this.realOptions.each(function(e, s) {
              t.fakeOptions.eq(e).toggleClass(t.options.selectedClass, !!s.selected)
            }) : (this.fakeOptions.removeClass(this.options.selectedClass + " " + this.options.hoverClass),
              e = this.fakeOptions.eq(i).addClass(this.options.selectedClass),
              this.options.useHoverClass && e.addClass(this.options.hoverClass))
          },
          scrollToActiveOption: function() {
            var e = this.getActiveOptionOffset();
            "number" == typeof e && this.listHolder.prop("scrollTop", e)
          },
          getSelectedOptionsIndexes: function() {
            var e = [];
            return this.realOptions.each(function(t, s) {
                s.selected && e.push(t)
              }),
              e
          },
          getChangedSelectedIndex: function() {
            var e = this.element.prop("selectedIndex"),
              s = this,
              i = !1,
              o = null;
            return this.element.prop("multiple") ? (this.currentSelection = this.getSelectedOptionsIndexes(),
              t.each(this.currentSelection, function(e, t) {
                !i && s.previousSelection.indexOf(t) < 0 && (0 === e && (i = !0),
                  o = t)
              }),
              this.previousSelection = this.currentSelection,
              o) : e
          },
          getActiveOptionOffset: function() {
            var e = this.getChangedSelectedIndex();
            if (null !== e) {
              var t = this.listHolder.height(),
                s = this.listHolder.prop("scrollTop"),
                i = this.fakeOptions.eq(e),
                o = i.offset().top - this.list.offset().top,
                n = i.innerHeight();
              return o + n >= s + t ? o - t + n : s > o ? o : void 0
            }
          },
          getOverflowHeight: function(e) {
            var t = this.fakeListItems.eq(e - 1),
              s = this.list.offset().top,
              i = t.offset().top,
              o = t.innerHeight();
            return i + o - s
          },
          getScrollTop: function() {
            return this.listHolder.scrollTop()
          },
          setScrollTop: function(e) {
            this.listHolder.scrollTop(e)
          },
          createOption: function(e) {
            var t = document.createElement("span");
            t.className = this.options.optionClass,
              t.innerHTML = e.innerHTML,
              t.setAttribute(this.options.indexAttribute, this.optionIndex++);
            var s, i = e.getAttribute("data-image");
            return i && (s = document.createElement("img"),
                s.src = i,
                t.insertBefore(s, t.childNodes[0])),
              e.disabled && (t.className += " " + this.options.disabledClass),
              e.className && (t.className += " " + r(e.className, this.options.cloneClassPrefix)),
              t
          },
          createOptGroup: function(e) {
            var t, s, i = document.createElement("span"),
              o = e.getAttribute("label");
            return t = document.createElement("span"),
              t.className = this.options.captionClass,
              t.innerHTML = o,
              i.appendChild(t),
              e.children.length && (s = this.createOptionsList(e),
                i.appendChild(s)),
              i.className = this.options.groupClass,
              i
          },
          createOptionContainer: function() {
            var e = document.createElement("li");
            return e
          },
          createOptionsList: function(e) {
            var s = this,
              i = document.createElement("ul");
            return t.each(e.children, function(e, t) {
                var o, n = s.createOptionContainer(t);
                switch (t.tagName.toLowerCase()) {
                  case "option":
                    o = s.createOption(t);
                    break;
                  case "optgroup":
                    o = s.createOptGroup(t)
                }
                i.appendChild(n).appendChild(o)
              }),
              i
          },
          refresh: function() {
            this.storedSelectHTML !== this.element.prop("innerHTML") && this.rebuildList();
            var t = e.getInstance(this.listHolder);
            t && t.refresh(),
              this.refreshSelectedClass()
          },
          destroy: function() {
            this.listHolder.off("jcf-mousewheel", this.preventWheelHandler),
              this.listHolder.off("jcf-pointerdown", this.indexSelector, this.onSelectItem),
              this.listHolder.off("jcf-pointerover", this.indexSelector, this.onHoverItem),
              this.listHolder.off("jcf-pointerdown", this.onPress)
          }
        });
      var r = function(e, t) {
          return e ? e.replace(/[\s]*([\S]+)+[\s]*/gi, t + "$1 ") : ""
        },
        h = function() {
          function t(e) {
            e.preventDefault()
          }
          var s = e.getOptions().unselectableClass;
          return function(e) {
            e.addClass(s).on("selectstart", t)
          }
        }();
      return l
    })
  }(jcf);
  
  $(function() {
    var customSelect = $('.c-custom-select');
  
    // Options for custom Select
    jcf.setOptions('Select', {
      wrapNative: false,
      wrapNativeOnMobile: false,
      fakeDropInBody: false,
      maxVisibleItems: 5
    });
  
    jcf.replace(customSelect);
  });
  $(function() {
    var customHeader = $('.top-nav-global-select');
  
    // Options for custom Select
    jcf.setOptions('Select', {
      wrapNative: false,
      wrapNativeOnMobile: false,
      fakeDropInBody: false,
      maxVisibleItems: 5
    });
  
    jcf.replace(customHeader);
  });
  
  
  
  
  //*DROPDOWN NAV PLUGIN-END**/
  
  (function($) {
    function MobileNav(options) {
      this.options = $.extend({
        container: null,
        hideOnClickOutside: false,
        menuActiveClass: 'nav-active',
        menuOpener: '.nav-opener',
        menuDrop: '.nav-drop',
        toggleEvent: 'click',
        outsideClickEvent: 'click touchstart pointerdown MSPointerDown'
      }, options);
      this.initStructure();
      this.attachEvents();
    }
    MobileNav.prototype = {
      initStructure: function() {
        this.page = $('html');
        this.container = $(this.options.container);
        this.opener = this.container.find(this.options.menuOpener);
        this.drop = this.container.find(this.options.menuDrop);
      },
      attachEvents: function() {
        var self = this;
  
        if (activateResizeHandler) {
          activateResizeHandler();
          activateResizeHandler = null;
        }
  
        this.outsideClickHandler = function(e) {
          if (self.isOpened()) {
            var target = $(e.target);
            if (!target.closest(self.opener).length && !target.closest(self.drop).length) {
              self.hide();
            }
          }
        };
  
        this.openerClickHandler = function(e) {
          e.preventDefault();
          self.toggle();
        };
  
        this.opener.on(this.options.toggleEvent, this.openerClickHandler);
      },
      isOpened: function() {
        return this.container.hasClass(this.options.menuActiveClass);
      },
      show: function() {
        this.container.addClass(this.options.menuActiveClass);
        if (this.options.hideOnClickOutside) {
          this.page.on(this.options.outsideClickEvent, this.outsideClickHandler);
        }
      },
      hide: function() {
        this.container.removeClass(this.options.menuActiveClass);
        if (this.options.hideOnClickOutside) {
          this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
        }
      },
      toggle: function() {
        if (this.isOpened()) {
          this.hide();
        } else {
          this.show();
        }
      },
      destroy: function() {
        this.container.removeClass(this.options.menuActiveClass);
        this.opener.off(this.options.toggleEvent, this.clickHandler);
        this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
      }
    };
  
    var activateResizeHandler = function() {
      var win = $(window),
        doc = $('html'),
        resizeClass = 'resize-active',
        flag, timer;
      var removeClassHandler = function() {
        flag = false;
        doc.removeClass(resizeClass);
      };
      var resizeHandler = function() {
        if (!flag) {
          flag = true;
          doc.addClass(resizeClass);
        }
        clearTimeout(timer);
        timer = setTimeout(removeClassHandler, 500);
      };
      win.on('resize orientationchange', resizeHandler);
    };
  
    $.fn.mobileNav = function(opt) {
      var args = Array.prototype.slice.call(arguments);
      var method = args[0];
  
      return this.each(function() {
        var $container = jQuery(this);
        var instance = $container.data('MobileNav');
  
        if (typeof opt === 'object' || typeof opt === 'undefined') {
          $container.data('MobileNav', new MobileNav($.extend({
            container: this
          }, opt)));
        } else if (typeof method === 'string' && instance) {
          if (typeof instance[method] === 'function') {
            args.shift();
            instance[method].apply(instance, args);
          }
        }
      });
    };
  }(jQuery));
  
  function initMobileNav() {
  
    jQuery('body').mobileNav({
      menuActiveClass: 'nav-active',
      menuOpener: '.nav-opener',
      hideOnClickOutside: true,
      menuDrop: '.drop-nav'
    });
  
  }
  
  
  
  
  /*fancybox*/
  /*!
   * fancyBox - jQuery Plugin
   * version: 2.1.5 (Fri, 14 Jun 2013)
   * @requires jQuery v1.6 or later
   *
   * Examples at http://fancyapps.com/fancybox/
   * License: www.fancyapps.com/fancybox/#license
   *
   * Copyright 2012 Janis Skarnelis - janis@fancyapps.com
   *
   */
  
  (function(window, document, $, undefined) {
    "use strict";
  
    var H = $("html"),
      W = $(window),
      D = $(document),
      F = $.fancybox = function() {
        F.open.apply(this, arguments);
      },
      IE = navigator.userAgent.match(/msie/i),
      didUpdate = null,
      isTouch = document.createTouch !== undefined,
  
      isQuery = function(obj) {
        return obj && obj.hasOwnProperty && obj instanceof $;
      },
      isString = function(str) {
        return str && $.type(str) === "string";
      },
      isPercentage = function(str) {
        return isString(str) && str.indexOf('%') > 0;
      },
      isScrollable = function(el) {
        return (el && !(el.style.overflow && el.style.overflow === 'hidden') && ((el.clientWidth && el.scrollWidth > el.clientWidth) || (el.clientHeight && el.scrollHeight > el.clientHeight)));
      },
      getScalar = function(orig, dim) {
        var value = parseInt(orig, 10) || 0;
  
        if (dim && isPercentage(orig)) {
          value = F.getViewport()[dim] / 100 * value;
        }
  
        return Math.ceil(value);
      },
      getValue = function(value, dim) {
        return getScalar(value, dim) + 'px';
      };
  
    $.extend(F, {
      // The current version of fancyBox
      version: '2.1.5',
  
      defaults: {
        padding: 15,
        margin: 20,
  
        width: 800,
        height: 600,
        minWidth: 100,
        minHeight: 100,
        maxWidth: 9999,
        maxHeight: 9999,
        pixelRatio: 1, // Set to 2 for retina display support
  
        autoSize: true,
        autoHeight: false,
        autoWidth: false,
  
        autoResize: true,
        autoCenter: !isTouch,
        fitToView: true,
        aspectRatio: false,
        topRatio: 0.5,
        leftRatio: 0.5,
  
        scrolling: 'auto', // 'auto', 'yes' or 'no'
        wrapCSS: '',
  
        arrows: true,
        closeBtn: true,
        closeClick: false,
        nextClick: false,
        mouseWheel: true,
        autoPlay: false,
        playSpeed: 3000,
        preload: 3,
        modal: false,
        loop: true,
  
        ajax: {
          dataType: 'html',
          headers: {
            'X-fancyBox': true
          }
        },
        iframe: {
          scrolling: 'auto',
          preload: true
        },
        swf: {
          wmode: 'transparent',
          allowfullscreen: 'true',
          allowscriptaccess: 'always'
        },
  
        keys: {
          next: {
            13: 'left', // enter
            34: 'up', // page down
            39: 'left', // right arrow
            40: 'up' // down arrow
          },
          prev: {
            8: 'right', // backspace
            33: 'down', // page up
            37: 'right', // left arrow
            38: 'down' // up arrow
          },
          close: [27], // escape key
          play: [32], // space - start/stop slideshow
          toggle: [70] // letter "f" - toggle fullscreen
        },
  
        direction: {
          next: 'left',
          prev: 'right'
        },
  
        scrollOutside: true,
  
        // Override some properties
        index: 0,
        type: null,
        href: null,
        content: null,
        title: null,
  
        // HTML templates
        tpl: {
          wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
          image: '<img class="fancybox-image" src="{href}" alt="" />',
          iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (IE ? ' allowtransparency="true"' : '') + '></iframe>',
          error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
          closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
          next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
          prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
        },
  
        // Properties for each animation type
        // Opening fancyBox
        openEffect: 'fade', // 'elastic', 'fade' or 'none'
        openSpeed: 250,
        openEasing: 'swing',
        openOpacity: true,
        openMethod: 'zoomIn',
  
        // Closing fancyBox
        closeEffect: 'fade', // 'elastic', 'fade' or 'none'
        closeSpeed: 250,
        closeEasing: 'swing',
        closeOpacity: true,
        closeMethod: 'zoomOut',
  
        // Changing next gallery item
        nextEffect: 'elastic', // 'elastic', 'fade' or 'none'
        nextSpeed: 250,
        nextEasing: 'swing',
        nextMethod: 'changeIn',
  
        // Changing previous gallery item
        prevEffect: 'elastic', // 'elastic', 'fade' or 'none'
        prevSpeed: 250,
        prevEasing: 'swing',
        prevMethod: 'changeOut',
  
        // Enable default helpers
        helpers: {
          overlay: true,
          title: true
        },
  
        // Callbacks
        onCancel: $.noop, // If canceling
        beforeLoad: $.noop, // Before loading
        afterLoad: $.noop, // After loading
        beforeShow: $.noop, // Before changing in current item
        afterShow: $.noop, // After opening
        beforeChange: $.noop, // Before changing gallery item
        beforeClose: $.noop, // Before closing
        afterClose: $.noop // After closing
      },
  
      //Current state
      group: {}, // Selected group
      opts: {}, // Group options
      previous: null, // Previous element
      coming: null, // Element being loaded
      current: null, // Currently loaded element
      isActive: false, // Is activated
      isOpen: false, // Is currently open
      isOpened: false, // Have been fully opened at least once
  
      wrap: null,
      skin: null,
      outer: null,
      inner: null,
  
      player: {
        timer: null,
        isActive: false
      },
  
      // Loaders
      ajaxLoad: null,
      imgPreload: null,
  
      // Some collections
      transitions: {},
      helpers: {},
  
      /*
       *  Static methods
       */
  
      open: function(group, opts) {
        if (!group) {
          return;
        }
  
        if (!$.isPlainObject(opts)) {
          opts = {};
        }
  
        // Close if already active
        if (false === F.close(true)) {
          return;
        }
  
        // Normalize group
        if (!$.isArray(group)) {
          group = isQuery(group) ? $(group).get() : [group];
        }
  
        // Recheck if the type of each element is `object` and set content type (image, ajax, etc)
        $.each(group, function(i, element) {
          var obj = {},
            href,
            title,
            content,
            type,
            rez,
            hrefParts,
            selector;
  
          if ($.type(element) === "object") {
            // Check if is DOM element
            if (element.nodeType) {
              element = $(element);
            }
  
            if (isQuery(element)) {
              obj = {
                href: element.data('fancybox-href') || element.attr('href'),
                title: element.data('fancybox-title') || element.attr('title'),
                isDom: true,
                element: element
              };
  
              if ($.metadata) {
                $.extend(true, obj, element.metadata());
              }
  
            } else {
              obj = element;
            }
          }
  
          href = opts.href || obj.href || (isString(element) ? element : null);
          title = opts.title !== undefined ? opts.title : obj.title || '';
  
          content = opts.content || obj.content;
          type = content ? 'html' : (opts.type || obj.type);
  
          if (!type && obj.isDom) {
            type = element.data('fancybox-type');
  
            if (!type) {
              rez = element.prop('class').match(/fancybox\.(\w+)/);
              type = rez ? rez[1] : null;
            }
          }
  
          if (isString(href)) {
            // Try to guess the content type
            if (!type) {
              if (F.isImage(href)) {
                type = 'image';
  
              } else if (F.isSWF(href)) {
                type = 'swf';
  
              } else if (href.charAt(0) === '#') {
                type = 'inline';
  
              } else if (isString(element)) {
                type = 'html';
                content = element;
              }
            }
  
            // Split url into two pieces with source url and content selector, e.g,
            // "/mypage.html #my_id" will load "/mypage.html" and display element having id "my_id"
            if (type === 'ajax') {
              hrefParts = href.split(/\s+/, 2);
              href = hrefParts.shift();
              selector = hrefParts.shift();
            }
          }
  
          if (!content) {
            if (type === 'inline') {
              if (href) {
                content = $(isString(href) ? href.replace(/.*(?=#[^\s]+$)/, '') : href); //strip for ie7
  
              } else if (obj.isDom) {
                content = element;
              }
  
            } else if (type === 'html') {
              content = href;
  
            } else if (!type && !href && obj.isDom) {
              type = 'inline';
              content = element;
            }
          }
  
          $.extend(obj, {
            href: href,
            type: type,
            content: content,
            title: title,
            selector: selector
          });
  
          group[i] = obj;
        });
  
        // Extend the defaults
        F.opts = $.extend(true, {}, F.defaults, opts);
  
        // All options are merged recursive except keys
        if (opts.keys !== undefined) {
          F.opts.keys = opts.keys ? $.extend({}, F.defaults.keys, opts.keys) : false;
        }
  
        F.group = group;
  
        return F._start(F.opts.index);
      },
  
      // Cancel image loading or abort ajax request
      cancel: function() {
        var coming = F.coming;
  
        if (!coming || false === F.trigger('onCancel')) {
          return;
        }
  
        F.hideLoading();
  
        if (F.ajaxLoad) {
          F.ajaxLoad.abort();
        }
  
        F.ajaxLoad = null;
  
        if (F.imgPreload) {
          F.imgPreload.onload = F.imgPreload.onerror = null;
        }
  
        if (coming.wrap) {
          coming.wrap.stop(true, true).trigger('onReset').remove();
        }
  
        F.coming = null;
  
        // If the first item has been canceled, then clear everything
        if (!F.current) {
          F._afterZoomOut(coming);
        }
      },
  
      // Start closing animation if is open; remove immediately if opening/closing
      close: function(event) {
        F.cancel();
  
        if (false === F.trigger('beforeClose')) {
          return;
        }
  
        F.unbindEvents();
  
        if (!F.isActive) {
          return;
        }
  
        if (!F.isOpen || event === true) {
          $('.fancybox-wrap').stop(true).trigger('onReset').remove();
  
          F._afterZoomOut();
  
        } else {
          F.isOpen = F.isOpened = false;
          F.isClosing = true;
  
          $('.fancybox-item, .fancybox-nav').remove();
  
          F.wrap.stop(true, true).removeClass('fancybox-opened');
  
          F.transitions[F.current.closeMethod]();
        }
      },
  
      // Manage slideshow:
      //   $.fancybox.play(); - toggle slideshow
      //   $.fancybox.play( true ); - start
      //   $.fancybox.play( false ); - stop
      play: function(action) {
        var clear = function() {
            clearTimeout(F.player.timer);
          },
          set = function() {
            clear();
  
            if (F.current && F.player.isActive) {
              F.player.timer = setTimeout(F.next, F.current.playSpeed);
            }
          },
          stop = function() {
            clear();
  
            D.unbind('.player');
  
            F.player.isActive = false;
  
            F.trigger('onPlayEnd');
          },
          start = function() {
            if (F.current && (F.current.loop || F.current.index < F.group.length - 1)) {
              F.player.isActive = true;
  
              D.bind({
                'onCancel.player beforeClose.player': stop,
                'onUpdate.player': set,
                'beforeLoad.player': clear
              });
  
              set();
  
              F.trigger('onPlayStart');
            }
          };
  
        if (action === true || (!F.player.isActive && action !== false)) {
          start();
        } else {
          stop();
        }
      },
  
      // Navigate to next gallery item
      next: function(direction) {
        var current = F.current;
  
        if (current) {
          if (!isString(direction)) {
            direction = current.direction.next;
          }
  
          F.jumpto(current.index + 1, direction, 'next');
        }
      },
  
      // Navigate to previous gallery item
      prev: function(direction) {
        var current = F.current;
  
        if (current) {
          if (!isString(direction)) {
            direction = current.direction.prev;
          }
  
          F.jumpto(current.index - 1, direction, 'prev');
        }
      },
  
      // Navigate to gallery item by index
      jumpto: function(index, direction, router) {
        var current = F.current;
  
        if (!current) {
          return;
        }
  
        index = getScalar(index);
  
        F.direction = direction || current.direction[(index >= current.index ? 'next' : 'prev')];
        F.router = router || 'jumpto';
  
        if (current.loop) {
          if (index < 0) {
            index = current.group.length + (index % current.group.length);
          }
  
          index = index % current.group.length;
        }
  
        if (current.group[index] !== undefined) {
          F.cancel();
  
          F._start(index);
        }
      },
  
      // Center inside viewport and toggle position type to fixed or absolute if needed
      reposition: function(e, onlyAbsolute) {
        var current = F.current,
          wrap = current ? current.wrap : null,
          pos;
  
        if (wrap) {
          pos = F._getPosition(onlyAbsolute);
  
          if (e && e.type === 'scroll') {
            delete pos.position;
  
            wrap.stop(true, true).animate(pos, 200);
  
          } else {
            wrap.css(pos);
  
            current.pos = $.extend({}, current.dim, pos);
          }
        }
      },
  
      update: function(e) {
        var type = (e && e.type),
          anyway = !type || type === 'orientationchange';
  
        if (anyway) {
          clearTimeout(didUpdate);
  
          didUpdate = null;
        }
  
        if (!F.isOpen || didUpdate) {
          return;
        }
  
        didUpdate = setTimeout(function() {
          var current = F.current;
  
          if (!current || F.isClosing) {
            return;
          }
  
          F.wrap.removeClass('fancybox-tmp');
  
          if (anyway || type === 'load' || (type === 'resize' && current.autoResize)) {
            F._setDimension();
          }
  
          if (!(type === 'scroll' && current.canShrink)) {
            F.reposition(e);
          }
  
          F.trigger('onUpdate');
  
          didUpdate = null;
  
        }, (anyway && !isTouch ? 0 : 300));
      },
  
      // Shrink content to fit inside viewport or restore if resized
      toggle: function(action) {
        if (F.isOpen) {
          F.current.fitToView = $.type(action) === "boolean" ? action : !F.current.fitToView;
  
          // Help browser to restore document dimensions
          if (isTouch) {
            F.wrap.removeAttr('style').addClass('fancybox-tmp');
  
            F.trigger('onUpdate');
          }
  
          F.update();
        }
      },
  
      hideLoading: function() {
        D.unbind('.loading');
  
        $('#fancybox-loading').remove();
      },
  
      showLoading: function() {
        var el, viewport;
  
        F.hideLoading();
  
        el = $('<div id="fancybox-loading"><div></div></div>').click(F.cancel).appendTo('body');
  
        // If user will press the escape-button, the request will be canceled
        D.bind('keydown.loading', function(e) {
          if ((e.which || e.keyCode) === 27) {
            e.preventDefault();
  
            F.cancel();
          }
        });
  
        if (!F.defaults.fixed) {
          viewport = F.getViewport();
  
          el.css({
            position: 'absolute',
            top: (viewport.h * 0.5) + viewport.y,
            left: (viewport.w * 0.5) + viewport.x
          });
        }
      },
  
      getViewport: function() {
        var locked = (F.current && F.current.locked) || false,
          rez = {
            x: W.scrollLeft(),
            y: W.scrollTop()
          };
  
        if (locked) {
          rez.w = locked[0].clientWidth;
          rez.h = locked[0].clientHeight;
  
        } else {
          // See http://bugs.jquery.com/ticket/6724
          rez.w = isTouch && window.innerWidth ? window.innerWidth : W.width();
          rez.h = isTouch && window.innerHeight ? window.innerHeight : W.height();
        }
  
        return rez;
      },
  
      // Unbind the keyboard / clicking actions
      unbindEvents: function() {
        if (F.wrap && isQuery(F.wrap)) {
          F.wrap.unbind('.fb');
        }
  
        D.unbind('.fb');
        W.unbind('.fb');
      },
  
      bindEvents: function() {
        var current = F.current,
          keys;
  
        if (!current) {
          return;
        }
  
        // Changing document height on iOS devices triggers a 'resize' event,
        // that can change document height... repeating infinitely
        W.bind('orientationchange.fb' + (isTouch ? '' : ' resize.fb') + (current.autoCenter && !current.locked ? ' scroll.fb' : ''), F.update);
  
        keys = current.keys;
  
        if (keys) {
          D.bind('keydown.fb', function(e) {
            var code = e.which || e.keyCode,
              target = e.target || e.srcElement;
  
            // Skip esc key if loading, because showLoading will cancel preloading
            if (code === 27 && F.coming) {
              return false;
            }
  
            // Ignore key combinations and key events within form elements
            if (!e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey && !(target && (target.type || $(target).is('[contenteditable]')))) {
              $.each(keys, function(i, val) {
                if (current.group.length > 1 && val[code] !== undefined) {
                  F[i](val[code]);
  
                  e.preventDefault();
                  return false;
                }
  
                if ($.inArray(code, val) > -1) {
                  F[i]();
  
                  e.preventDefault();
                  return false;
                }
              });
            }
          });
        }
  
        if ($.fn.mousewheel && current.mouseWheel) {
          F.wrap.bind('mousewheel.fb', function(e, delta, deltaX, deltaY) {
            var target = e.target || null,
              parent = $(target),
              canScroll = false;
  
            while (parent.length) {
              if (canScroll || parent.is('.fancybox-skin') || parent.is('.fancybox-wrap')) {
                break;
              }
  
              canScroll = isScrollable(parent[0]);
              parent = $(parent).parent();
            }
  
            if (delta !== 0 && !canScroll) {
              if (F.group.length > 1 && !current.canShrink) {
                if (deltaY > 0 || deltaX > 0) {
                  F.prev(deltaY > 0 ? 'down' : 'left');
  
                } else if (deltaY < 0 || deltaX < 0) {
                  F.next(deltaY < 0 ? 'up' : 'right');
                }
  
                e.preventDefault();
              }
            }
          });
        }
      },
  
      trigger: function(event, o) {
        var ret, obj = o || F.coming || F.current;
  
        if (!obj) {
          return;
        }
  
        if ($.isFunction(obj[event])) {
          ret = obj[event].apply(obj, Array.prototype.slice.call(arguments, 1));
        }
  
        if (ret === false) {
          return false;
        }
  
        if (obj.helpers) {
          $.each(obj.helpers, function(helper, opts) {
            if (opts && F.helpers[helper] && $.isFunction(F.helpers[helper][event])) {
              F.helpers[helper][event]($.extend(true, {}, F.helpers[helper].defaults, opts), obj);
            }
          });
        }
  
        D.trigger(event);
      },
  
      isImage: function(str) {
        return isString(str) && str.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i);
      },
  
      isSWF: function(str) {
        return isString(str) && str.match(/\.(swf)((\?|#).*)?$/i);
      },
  
      _start: function(index) {
        var coming = {},
          obj,
          href,
          type,
          margin,
          padding;
  
        index = getScalar(index);
        obj = F.group[index] || null;
  
        if (!obj) {
          return false;
        }
  
        coming = $.extend(true, {}, F.opts, obj);
  
        // Convert margin and padding properties to array - top, right, bottom, left
        margin = coming.margin;
        padding = coming.padding;
  
        if ($.type(margin) === 'number') {
          coming.margin = [margin, margin, margin, margin];
        }
  
        if ($.type(padding) === 'number') {
          coming.padding = [padding, padding, padding, padding];
        }
  
        // 'modal' propery is just a shortcut
        if (coming.modal) {
          $.extend(true, coming, {
            closeBtn: false,
            closeClick: false,
            nextClick: false,
            arrows: false,
            mouseWheel: false,
            keys: null,
            helpers: {
              overlay: {
                closeClick: false
              }
            }
          });
        }
  
        // 'autoSize' property is a shortcut, too
        if (coming.autoSize) {
          coming.autoWidth = coming.autoHeight = true;
        }
  
        if (coming.width === 'auto') {
          coming.autoWidth = true;
        }
  
        if (coming.height === 'auto') {
          coming.autoHeight = true;
        }
  
        /*
         * Add reference to the group, so it`s possible to access from callbacks, example:
         * afterLoad : function() {
         *     this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');
         * }
         */
  
        coming.group = F.group;
        coming.index = index;
  
        // Give a chance for callback or helpers to update coming item (type, title, etc)
        F.coming = coming;
  
        if (false === F.trigger('beforeLoad')) {
          F.coming = null;
  
          return;
        }
  
        type = coming.type;
        href = coming.href;
  
        if (!type) {
          F.coming = null;
  
          //If we can not determine content type then drop silently or display next/prev item if looping through gallery
          if (F.current && F.router && F.router !== 'jumpto') {
            F.current.index = index;
  
            return F[F.router](F.direction);
          }
  
          return false;
        }
  
        F.isActive = true;
  
        if (type === 'image' || type === 'swf') {
          coming.autoHeight = coming.autoWidth = false;
          coming.scrolling = 'visible';
        }
  
        if (type === 'image') {
          coming.aspectRatio = true;
        }
  
        if (type === 'iframe' && isTouch) {
          coming.scrolling = 'scroll';
        }
  
        // Build the neccessary markup
        coming.wrap = $(coming.tpl.wrap).addClass('fancybox-' + (isTouch ? 'mobile' : 'desktop') + ' fancybox-type-' + type + ' fancybox-tmp ' + coming.wrapCSS).appendTo(coming.parent || 'body');
  
        $.extend(coming, {
          skin: $('.fancybox-skin', coming.wrap),
          outer: $('.fancybox-outer', coming.wrap),
          inner: $('.fancybox-inner', coming.wrap)
        });
  
        $.each(["Top", "Right", "Bottom", "Left"], function(i, v) {
          coming.skin.css('padding' + v, getValue(coming.padding[i]));
        });
  
        F.trigger('onReady');
  
        // Check before try to load; 'inline' and 'html' types need content, others - href
        if (type === 'inline' || type === 'html') {
          if (!coming.content || !coming.content.length) {
            return F._error('content');
          }
  
        } else if (!href) {
          return F._error('href');
        }
  
        if (type === 'image') {
          F._loadImage();
  
        } else if (type === 'ajax') {
          F._loadAjax();
  
        } else if (type === 'iframe') {
          F._loadIframe();
  
        } else {
          F._afterLoad();
        }
      },
  
      _error: function(type) {
        $.extend(F.coming, {
          type: 'html',
          autoWidth: true,
          autoHeight: true,
          minWidth: 0,
          minHeight: 0,
          scrolling: 'no',
          hasError: type,
          content: F.coming.tpl.error
        });
  
        F._afterLoad();
      },
  
      _loadImage: function() {
        // Reset preload image so it is later possible to check "complete" property
        var img = F.imgPreload = new Image();
  
        img.onload = function() {
          this.onload = this.onerror = null;
  
          F.coming.width = this.width / F.opts.pixelRatio;
          F.coming.height = this.height / F.opts.pixelRatio;
  
          F._afterLoad();
        };
  
        img.onerror = function() {
          this.onload = this.onerror = null;
  
          F._error('image');
        };
  
        img.src = F.coming.href;
  
        if (img.complete !== true) {
          F.showLoading();
        }
      },
  
      _loadAjax: function() {
        var coming = F.coming;
  
        F.showLoading();
  
        F.ajaxLoad = $.ajax($.extend({}, coming.ajax, {
          url: coming.href,
          error: function(jqXHR, textStatus) {
            if (F.coming && textStatus !== 'abort') {
              F._error('ajax', jqXHR);
  
            } else {
              F.hideLoading();
            }
          },
          success: function(data, textStatus) {
            if (textStatus === 'success') {
              coming.content = data;
  
              F._afterLoad();
            }
          }
        }));
      },
  
      _loadIframe: function() {
        var coming = F.coming,
          iframe = $(coming.tpl.iframe.replace(/\{rnd\}/g, new Date().getTime()))
          .attr('scrolling', isTouch ? 'auto' : coming.iframe.scrolling)
          .attr('src', coming.href);
  
        // This helps IE
        $(coming.wrap).bind('onReset', function() {
          try {
            $(this).find('iframe').hide().attr('src', '//about:blank').end().empty();
          } catch (e) {}
        });
  
        if (coming.iframe.preload) {
          F.showLoading();
  
          iframe.one('load', function() {
            $(this).data('ready', 1);
  
            // iOS will lose scrolling if we resize
            if (!isTouch) {
              $(this).bind('load.fb', F.update);
            }
  
            // Without this trick:
            //   - iframe won't scroll on iOS devices
            //   - IE7 sometimes displays empty iframe
            $(this).parents('.fancybox-wrap').width('100%').removeClass('fancybox-tmp').show();
  
            F._afterLoad();
          });
        }
  
        coming.content = iframe.appendTo(coming.inner);
  
        if (!coming.iframe.preload) {
          F._afterLoad();
        }
      },
  
      _preloadImages: function() {
        var group = F.group,
          current = F.current,
          len = group.length,
          cnt = current.preload ? Math.min(current.preload, len - 1) : 0,
          item,
          i;
  
        for (i = 1; i <= cnt; i += 1) {
          item = group[(current.index + i) % len];
  
          if (item.type === 'image' && item.href) {
            new Image().src = item.href;
          }
        }
      },
  
      _afterLoad: function() {
        var coming = F.coming,
          previous = F.current,
          placeholder = 'fancybox-placeholder',
          current,
          content,
          type,
          scrolling,
          href,
          embed;
  
        F.hideLoading();
  
        if (!coming || F.isActive === false) {
          return;
        }
  
        if (false === F.trigger('afterLoad', coming, previous)) {
          coming.wrap.stop(true).trigger('onReset').remove();
  
          F.coming = null;
  
          return;
        }
  
        if (previous) {
          F.trigger('beforeChange', previous);
  
          previous.wrap.stop(true).removeClass('fancybox-opened')
            .find('.fancybox-item, .fancybox-nav')
            .remove();
        }
  
        F.unbindEvents();
  
        current = coming;
        content = coming.content;
        type = coming.type;
        scrolling = coming.scrolling;
  
        $.extend(F, {
          wrap: current.wrap,
          skin: current.skin,
          outer: current.outer,
          inner: current.inner,
          current: current,
          previous: previous
        });
  
        href = current.href;
  
        switch (type) {
          case 'inline':
          case 'ajax':
          case 'html':
            if (current.selector) {
              content = $('<div>').html(content).find(current.selector);
  
            } else if (isQuery(content)) {
              if (!content.data(placeholder)) {
                content.data(placeholder, $('<div class="' + placeholder + '"></div>').insertAfter(content).hide());
              }
  
              content = content.show().detach();
  
              current.wrap.bind('onReset', function() {
                if ($(this).find(content).length) {
                  content.hide().replaceAll(content.data(placeholder)).data(placeholder, false);
                }
              });
            }
            break;
  
          case 'image':
            content = current.tpl.image.replace('{href}', href);
            break;
  
          case 'swf':
            content = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + href + '"></param>';
            embed = '';
  
            $.each(current.swf, function(name, val) {
              content += '<param name="' + name + '" value="' + val + '"></param>';
              embed += ' ' + name + '="' + val + '"';
            });
  
            content += '<embed src="' + href + '" type="application/x-shockwave-flash" width="100%" height="100%"' + embed + '></embed></object>';
            break;
        }
  
        if (!(isQuery(content) && content.parent().is(current.inner))) {
          current.inner.append(content);
        }
  
        // Give a chance for helpers or callbacks to update elements
        F.trigger('beforeShow');
  
        // Set scrolling before calculating dimensions
        current.inner.css('overflow', scrolling === 'yes' ? 'scroll' : (scrolling === 'no' ? 'hidden' : scrolling));
  
        // Set initial dimensions and start position
        F._setDimension();
  
        F.reposition();
  
        F.isOpen = false;
        F.coming = null;
  
        F.bindEvents();
  
        if (!F.isOpened) {
          $('.fancybox-wrap').not(current.wrap).stop(true).trigger('onReset').remove();
  
        } else if (previous.prevMethod) {
          F.transitions[previous.prevMethod]();
        }
  
        F.transitions[F.isOpened ? current.nextMethod : current.openMethod]();
  
        F._preloadImages();
      },
  
      _setDimension: function() {
        var viewport = F.getViewport(),
          steps = 0,
          canShrink = false,
          canExpand = false,
          wrap = F.wrap,
          skin = F.skin,
          inner = F.inner,
          current = F.current,
          width = current.width,
          height = current.height,
          minWidth = current.minWidth,
          minHeight = current.minHeight,
          maxWidth = current.maxWidth,
          maxHeight = current.maxHeight,
          scrolling = current.scrolling,
          scrollOut = current.scrollOutside ? current.scrollbarWidth : 0,
          margin = current.margin,
          wMargin = getScalar(margin[1] + margin[3]),
          hMargin = getScalar(margin[0] + margin[2]),
          wPadding,
          hPadding,
          wSpace,
          hSpace,
          origWidth,
          origHeight,
          origMaxWidth,
          origMaxHeight,
          ratio,
          width_,
          height_,
          maxWidth_,
          maxHeight_,
          iframe,
          body;
  
        // Reset dimensions so we could re-check actual size
        wrap.add(skin).add(inner).width('auto').height('auto').removeClass('fancybox-tmp');
  
        wPadding = getScalar(skin.outerWidth(true) - skin.width());
        hPadding = getScalar(skin.outerHeight(true) - skin.height());
  
        // Any space between content and viewport (margin, padding, border, title)
        wSpace = wMargin + wPadding;
        hSpace = hMargin + hPadding;
  
        origWidth = isPercentage(width) ? (viewport.w - wSpace) * getScalar(width) / 100 : width;
        origHeight = isPercentage(height) ? (viewport.h - hSpace) * getScalar(height) / 100 : height;
  
        if (current.type === 'iframe') {
          iframe = current.content;
  
          if (current.autoHeight && iframe.data('ready') === 1) {
            try {
              if (iframe[0].contentWindow.document.location) {
                inner.width(origWidth).height(9999);
  
                body = iframe.contents().find('body');
  
                if (scrollOut) {
                  body.css('overflow-x', 'hidden');
                }
  
                origHeight = body.outerHeight(true);
              }
  
            } catch (e) {}
          }
  
        } else if (current.autoWidth || current.autoHeight) {
          inner.addClass('fancybox-tmp');
  
          // Set width or height in case we need to calculate only one dimension
          if (!current.autoWidth) {
            inner.width(origWidth);
          }
  
          if (!current.autoHeight) {
            inner.height(origHeight);
          }
  
          if (current.autoWidth) {
            origWidth = inner.width();
          }
  
          if (current.autoHeight) {
            origHeight = inner.height();
          }
  
          inner.removeClass('fancybox-tmp');
        }
  
        width = getScalar(origWidth);
        height = getScalar(origHeight);
  
        ratio = origWidth / origHeight;
  
        // Calculations for the content
        minWidth = getScalar(isPercentage(minWidth) ? getScalar(minWidth, 'w') - wSpace : minWidth);
        maxWidth = getScalar(isPercentage(maxWidth) ? getScalar(maxWidth, 'w') - wSpace : maxWidth);
  
        minHeight = getScalar(isPercentage(minHeight) ? getScalar(minHeight, 'h') - hSpace : minHeight);
        maxHeight = getScalar(isPercentage(maxHeight) ? getScalar(maxHeight, 'h') - hSpace : maxHeight);
  
        // These will be used to determine if wrap can fit in the viewport
        origMaxWidth = maxWidth;
        origMaxHeight = maxHeight;
  
        if (current.fitToView) {
          maxWidth = Math.min(viewport.w - wSpace, maxWidth);
          maxHeight = Math.min(viewport.h - hSpace, maxHeight);
        }
  
        maxWidth_ = viewport.w - wMargin;
        maxHeight_ = viewport.h - hMargin;
  
        if (current.aspectRatio) {
          if (width > maxWidth) {
            width = maxWidth;
            height = getScalar(width / ratio);
          }
  
          if (height > maxHeight) {
            height = maxHeight;
            width = getScalar(height * ratio);
          }
  
          if (width < minWidth) {
            width = minWidth;
            height = getScalar(width / ratio);
          }
  
          if (height < minHeight) {
            height = minHeight;
            width = getScalar(height * ratio);
          }
  
        } else {
          width = Math.max(minWidth, Math.min(width, maxWidth));
  
          if (current.autoHeight && current.type !== 'iframe') {
            inner.width(width);
  
            height = inner.height();
          }
  
          height = Math.max(minHeight, Math.min(height, maxHeight));
        }
  
        // Try to fit inside viewport (including the title)
        if (current.fitToView) {
          inner.width(width).height(height);
  
          wrap.width(width + wPadding);
  
          // Real wrap dimensions
          width_ = wrap.width();
          height_ = wrap.height();
  
          if (current.aspectRatio) {
            while ((width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight) {
              if (steps++ > 19) {
                break;
              }
  
              height = Math.max(minHeight, Math.min(maxHeight, height - 10));
              width = getScalar(height * ratio);
  
              if (width < minWidth) {
                width = minWidth;
                height = getScalar(width / ratio);
              }
  
              if (width > maxWidth) {
                width = maxWidth;
                height = getScalar(width / ratio);
              }
  
              inner.width(width).height(height);
  
              wrap.width(width + wPadding);
  
              width_ = wrap.width();
              height_ = wrap.height();
            }
  
          } else {
            width = Math.max(minWidth, Math.min(width, width - (width_ - maxWidth_)));
            height = Math.max(minHeight, Math.min(height, height - (height_ - maxHeight_)));
          }
        }
  
        if (scrollOut && scrolling === 'auto' && height < origHeight && (width + wPadding + scrollOut) < maxWidth_) {
          width += scrollOut;
        }
  
        inner.width(width).height(height);
  
        wrap.width(width + wPadding);
  
        width_ = wrap.width();
        height_ = wrap.height();
  
        canShrink = (width_ > maxWidth_ || height_ > maxHeight_) && width > minWidth && height > minHeight;
        canExpand = current.aspectRatio ? (width < origMaxWidth && height < origMaxHeight && width < origWidth && height < origHeight) : ((width < origMaxWidth || height < origMaxHeight) && (width < origWidth || height < origHeight));
  
        $.extend(current, {
          dim: {
            width: getValue(width_),
            height: getValue(height_)
          },
          origWidth: origWidth,
          origHeight: origHeight,
          canShrink: canShrink,
          canExpand: canExpand,
          wPadding: wPadding,
          hPadding: hPadding,
          wrapSpace: height_ - skin.outerHeight(true),
          skinSpace: skin.height() - height
        });
  
        if (!iframe && current.autoHeight && height > minHeight && height < maxHeight && !canExpand) {
          inner.height('auto');
        }
      },
  
      _getPosition: function(onlyAbsolute) {
        var current = F.current,
          viewport = F.getViewport(),
          margin = current.margin,
          width = F.wrap.width() + margin[1] + margin[3],
          height = F.wrap.height() + margin[0] + margin[2],
          rez = {
            position: 'absolute',
            top: margin[0],
            left: margin[3]
          };
  
        if (current.autoCenter && current.fixed && !onlyAbsolute && height <= viewport.h && width <= viewport.w) {
          rez.position = 'fixed';
  
        } else if (!current.locked) {
          rez.top += viewport.y;
          rez.left += viewport.x;
        }
  
        rez.top = getValue(Math.max(rez.top, rez.top + ((viewport.h - height) * current.topRatio)));
        rez.left = getValue(Math.max(rez.left, rez.left + ((viewport.w - width) * current.leftRatio)));
  
        return rez;
      },
  
      _afterZoomIn: function() {
        var current = F.current;
  
        if (!current) {
          return;
        }
  
        F.isOpen = F.isOpened = true;
  
        F.wrap.css('overflow', 'visible').addClass('fancybox-opened');
  
        F.update();
  
        // Assign a click event
        if (current.closeClick || (current.nextClick && F.group.length > 1)) {
          F.inner.css('cursor', 'pointer').bind('click.fb', function(e) {
            if (!$(e.target).is('a') && !$(e.target).parent().is('a')) {
              e.preventDefault();
  
              F[current.closeClick ? 'close' : 'next']();
            }
          });
        }
  
        // Create a close button
        if (current.closeBtn) {
          $(current.tpl.closeBtn).appendTo(F.skin).bind('click.fb', function(e) {
            e.preventDefault();
  
            F.close();
          });
        }
  
        // Create navigation arrows
        if (current.arrows && F.group.length > 1) {
          if (current.loop || current.index > 0) {
            $(current.tpl.prev).appendTo(F.outer).bind('click.fb', F.prev);
          }
  
          if (current.loop || current.index < F.group.length - 1) {
            $(current.tpl.next).appendTo(F.outer).bind('click.fb', F.next);
          }
        }
  
        F.trigger('afterShow');
  
        // Stop the slideshow if this is the last item
        if (!current.loop && current.index === current.group.length - 1) {
          F.play(false);
  
        } else if (F.opts.autoPlay && !F.player.isActive) {
          F.opts.autoPlay = false;
  
          F.play();
        }
      },
  
      _afterZoomOut: function(obj) {
        obj = obj || F.current;
  
        $('.fancybox-wrap').trigger('onReset').remove();
  
        $.extend(F, {
          group: {},
          opts: {},
          router: false,
          current: null,
          isActive: false,
          isOpened: false,
          isOpen: false,
          isClosing: false,
          wrap: null,
          skin: null,
          outer: null,
          inner: null
        });
  
        F.trigger('afterClose', obj);
      }
    });
  
    /*
     *  Default transitions
     */
  
    F.transitions = {
      getOrigPosition: function() {
        var current = F.current,
          element = current.element,
          orig = current.orig,
          pos = {},
          width = 50,
          height = 50,
          hPadding = current.hPadding,
          wPadding = current.wPadding,
          viewport = F.getViewport();
  
        if (!orig && current.isDom && element.is(':visible')) {
          orig = element.find('img:first');
  
          if (!orig.length) {
            orig = element;
          }
        }
  
        if (isQuery(orig)) {
          pos = orig.offset();
  
          if (orig.is('img')) {
            width = orig.outerWidth();
            height = orig.outerHeight();
          }
  
        } else {
          pos.top = viewport.y + (viewport.h - height) * current.topRatio;
          pos.left = viewport.x + (viewport.w - width) * current.leftRatio;
        }
  
        if (F.wrap.css('position') === 'fixed' || current.locked) {
          pos.top -= viewport.y;
          pos.left -= viewport.x;
        }
  
        pos = {
          top: getValue(pos.top - hPadding * current.topRatio),
          left: getValue(pos.left - wPadding * current.leftRatio),
          width: getValue(width + wPadding),
          height: getValue(height + hPadding)
        };
  
        return pos;
      },
  
      step: function(now, fx) {
        var ratio,
          padding,
          value,
          prop = fx.prop,
          current = F.current,
          wrapSpace = current.wrapSpace,
          skinSpace = current.skinSpace;
  
        if (prop === 'width' || prop === 'height') {
          ratio = fx.end === fx.start ? 1 : (now - fx.start) / (fx.end - fx.start);
  
          if (F.isClosing) {
            ratio = 1 - ratio;
          }
  
          padding = prop === 'width' ? current.wPadding : current.hPadding;
          value = now - padding;
  
          F.skin[prop](getScalar(prop === 'width' ? value : value - (wrapSpace * ratio)));
          F.inner[prop](getScalar(prop === 'width' ? value : value - (wrapSpace * ratio) - (skinSpace * ratio)));
        }
      },
  
      zoomIn: function() {
        var current = F.current,
          startPos = current.pos,
          effect = current.openEffect,
          elastic = effect === 'elastic',
          endPos = $.extend({
            opacity: 1
          }, startPos);
  
        // Remove "position" property that breaks older IE
        delete endPos.position;
  
        if (elastic) {
          startPos = this.getOrigPosition();
  
          if (current.openOpacity) {
            startPos.opacity = 0.1;
          }
  
        } else if (effect === 'fade') {
          startPos.opacity = 0.1;
        }
  
        F.wrap.css(startPos).animate(endPos, {
          duration: effect === 'none' ? 0 : current.openSpeed,
          easing: current.openEasing,
          step: elastic ? this.step : null,
          complete: F._afterZoomIn
        });
      },
  
      zoomOut: function() {
        var current = F.current,
          effect = current.closeEffect,
          elastic = effect === 'elastic',
          endPos = {
            opacity: 0.1
          };
  
        if (elastic) {
          endPos = this.getOrigPosition();
  
          if (current.closeOpacity) {
            endPos.opacity = 0.1;
          }
        }
  
        F.wrap.animate(endPos, {
          duration: effect === 'none' ? 0 : current.closeSpeed,
          easing: current.closeEasing,
          step: elastic ? this.step : null,
          complete: F._afterZoomOut
        });
      },
  
      changeIn: function() {
        var current = F.current,
          effect = current.nextEffect,
          startPos = current.pos,
          endPos = {
            opacity: 1
          },
          direction = F.direction,
          distance = 200,
          field;
  
        startPos.opacity = 0.1;
  
        if (effect === 'elastic') {
          field = direction === 'down' || direction === 'up' ? 'top' : 'left';
  
          if (direction === 'down' || direction === 'right') {
            startPos[field] = getValue(getScalar(startPos[field]) - distance);
            endPos[field] = '+=' + distance + 'px';
  
          } else {
            startPos[field] = getValue(getScalar(startPos[field]) + distance);
            endPos[field] = '-=' + distance + 'px';
          }
        }
  
        // Workaround for http://bugs.jquery.com/ticket/12273
        if (effect === 'none') {
          F._afterZoomIn();
  
        } else {
          F.wrap.css(startPos).animate(endPos, {
            duration: current.nextSpeed,
            easing: current.nextEasing,
            complete: F._afterZoomIn
          });
        }
      },
  
      changeOut: function() {
        var previous = F.previous,
          effect = previous.prevEffect,
          endPos = {
            opacity: 0.1
          },
          direction = F.direction,
          distance = 200;
  
        if (effect === 'elastic') {
          endPos[direction === 'down' || direction === 'up' ? 'top' : 'left'] = (direction === 'up' || direction === 'left' ? '-' : '+') + '=' + distance + 'px';
        }
  
        previous.wrap.animate(endPos, {
          duration: effect === 'none' ? 0 : previous.prevSpeed,
          easing: previous.prevEasing,
          complete: function() {
            $(this).trigger('onReset').remove();
          }
        });
      }
    };
  
    /*
     *  Overlay helper
     */
  
    F.helpers.overlay = {
      defaults: {
        closeClick: true, // if true, fancyBox will be closed when user clicks on the overlay
        speedOut: 200, // duration of fadeOut animation
        showEarly: true, // indicates if should be opened immediately or wait until the content is ready
        css: {}, // custom CSS properties
        locked: !isTouch, // if true, the content will be locked into overlay
        fixed: true // if false, the overlay CSS position property will not be set to "fixed"
      },
  
      overlay: null, // current handle
      fixed: false, // indicates if the overlay has position "fixed"
      el: $('html'), // element that contains "the lock"
  
      // Public methods
      create: function(opts) {
        opts = $.extend({}, this.defaults, opts);
  
        if (this.overlay) {
          this.close();
        }
  
        this.overlay = $('<div class="fancybox-overlay"></div>').appendTo(F.coming ? F.coming.parent : opts.parent);
        this.fixed = false;
  
        if (opts.fixed && F.defaults.fixed) {
          this.overlay.addClass('fancybox-overlay-fixed');
  
          this.fixed = true;
        }
      },
  
      open: function(opts) {
        var that = this;
  
        opts = $.extend({}, this.defaults, opts);
  
        if (this.overlay) {
          this.overlay.unbind('.overlay').width('auto').height('auto');
  
        } else {
          this.create(opts);
        }
  
        if (!this.fixed) {
          W.bind('resize.overlay', $.proxy(this.update, this));
  
          this.update();
        }
  
        if (opts.closeClick) {
          this.overlay.bind('click.overlay', function(e) {
            if ($(e.target).hasClass('fancybox-overlay')) {
              if (F.isActive) {
                F.close();
              } else {
                that.close();
              }
  
              return false;
            }
          });
        }
  
        this.overlay.css(opts.css).show();
      },
  
      close: function() {
        var scrollV, scrollH;
  
        W.unbind('resize.overlay');
  
        if (this.el.hasClass('fancybox-lock')) {
          $('.fancybox-margin').removeClass('fancybox-margin');
  
          scrollV = W.scrollTop();
          scrollH = W.scrollLeft();
  
          this.el.removeClass('fancybox-lock');
  
          W.scrollTop(scrollV).scrollLeft(scrollH);
        }
  
        $('.fancybox-overlay').remove().hide();
  
        $.extend(this, {
          overlay: null,
          fixed: false
        });
      },
  
      // Private, callbacks
  
      update: function() {
        var width = '100%',
          offsetWidth;
  
        // Reset width/height so it will not mess
        this.overlay.width(width).height('100%');
  
        // jQuery does not return reliable result for IE
        if (IE) {
          offsetWidth = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);
  
          if (D.width() > offsetWidth) {
            width = D.width();
          }
  
        } else if (D.width() > W.width()) {
          width = D.width();
        }
  
        this.overlay.width(width).height(D.height());
      },
  
      // This is where we can manipulate DOM, because later it would cause iframes to reload
      onReady: function(opts, obj) {
        var overlay = this.overlay;
  
        $('.fancybox-overlay').stop(true, true);
  
        if (!overlay) {
          this.create(opts);
        }
  
        if (opts.locked && this.fixed && obj.fixed) {
          if (!overlay) {
            this.margin = D.height() > W.height() ? $('html').css('margin-right').replace("px", "") : false;
          }
  
          obj.locked = this.overlay.append(obj.wrap);
          obj.fixed = false;
        }
  
        if (opts.showEarly === true) {
          this.beforeShow.apply(this, arguments);
        }
      },
  
      beforeShow: function(opts, obj) {
        var scrollV, scrollH;
  
        if (obj.locked) {
          if (this.margin !== false) {
            $('*').filter(function() {
              return ($(this).css('position') === 'fixed' && !$(this).hasClass("fancybox-overlay") && !$(this).hasClass("fancybox-wrap"));
            }).addClass('fancybox-margin');
  
            this.el.addClass('fancybox-margin');
          }
  
          scrollV = W.scrollTop();
          scrollH = W.scrollLeft();
  
          this.el.addClass('fancybox-lock');
  
          W.scrollTop(scrollV).scrollLeft(scrollH);
        }
  
        this.open(opts);
      },
  
      onUpdate: function() {
        if (!this.fixed) {
          this.update();
        }
      },
  
      afterClose: function(opts) {
        // Remove overlay if exists and fancyBox is not opening
        // (e.g., it is not being open using afterClose callback)
        //if (this.overlay && !F.isActive) {
        if (this.overlay && !F.coming) {
          this.overlay.fadeOut(opts.speedOut, $.proxy(this.close, this));
        }
      }
    };
  
    /*
     *  Title helper
     */
  
    F.helpers.title = {
      defaults: {
        type: 'float', // 'float', 'inside', 'outside' or 'over',
        position: 'bottom' // 'top' or 'bottom'
      },
  
      beforeShow: function(opts) {
        var current = F.current,
          text = current.title,
          type = opts.type,
          title,
          target;
  
        if ($.isFunction(text)) {
          text = text.call(current.element, current);
        }
  
        if (!isString(text) || $.trim(text) === '') {
          return;
        }
  
        title = $('<div class="fancybox-title fancybox-title-' + type + '-wrap">' + text + '</div>');
  
        switch (type) {
          case 'inside':
            target = F.skin;
            break;
  
          case 'outside':
            target = F.wrap;
            break;
  
          case 'over':
            target = F.inner;
            break;
  
          default: // 'float'
            target = F.skin;
  
            title.appendTo('body');
  
            if (IE) {
              title.width(title.width());
            }
  
            title.wrapInner('<span class="child"></span>');
  
            //Increase bottom margin so this title will also fit into viewport
            F.current.margin[2] += Math.abs(getScalar(title.css('margin-bottom')));
            break;
        }
  
        title[(opts.position === 'top' ? 'prependTo' : 'appendTo')](target);
      }
    };
  
    // jQuery plugin initialization
    $.fn.fancybox = function(options) {
      var index,
        that = $(this),
        selector = this.selector || '',
        run = function(e) {
          var what = $(this).blur(),
            idx = index,
            relType, relVal;
  
          if (!(e.ctrlKey || e.altKey || e.shiftKey || e.metaKey) && !what.is('.fancybox-wrap')) {
            relType = options.groupAttr || 'data-fancybox-group';
            relVal = what.attr(relType);
  
            if (!relVal) {
              relType = 'rel';
              relVal = what.get(0)[relType];
            }
  
            if (relVal && relVal !== '' && relVal !== 'nofollow') {
              what = selector.length ? $(selector) : that;
              what = what.filter('[' + relType + '="' + relVal + '"]');
              idx = what.index(this);
            }
  
            options.index = idx;
  
            // Stop an event from bubbling if everything is fine
            if (F.open(what, options) !== false) {
              e.preventDefault();
            }
          }
        };
  
      options = options || {};
      index = options.index || 0;
  
      if (!selector || options.live === false) {
        that.unbind('click.fb-start').bind('click.fb-start', run);
  
      } else {
        D.undelegate(selector, 'click.fb-start').delegate(selector + ":not('.fancybox-item, .fancybox-nav')", 'click.fb-start', run);
      }
  
      this.filter('[data-fancybox-start=1]').trigger('click');
  
      return this;
    };
  
    // Tests that need a body at doc ready
    D.ready(function() {
      var w1, w2;
  
      if ($.scrollbarWidth === undefined) {
        // http://benalman.com/projects/jquery-misc-plugins/#scrollbarwidth
        $.scrollbarWidth = function() {
          var parent = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body'),
            child = parent.children(),
            width = child.innerWidth() - child.height(99).innerWidth();
  
          parent.remove();
  
          return width;
        };
      }
  
      if ($.support.fixedPosition === undefined) {
        $.support.fixedPosition = (function() {
          var elem = $('<div style="position:fixed;top:20px;"></div>').appendTo('body'),
            fixed = (elem[0].offsetTop === 20 || elem[0].offsetTop === 15);
  
          elem.remove();
  
          return fixed;
        }());
      }
  
      $.extend(F.defaults, {
        scrollbarWidth: $.scrollbarWidth(),
        fixed: $.support.fixedPosition,
        parent: $('body')
      });
  
      //Get real width of page scroll-bar
      w1 = $(window).width();
  
      H.addClass('fancybox-lock-test');
  
      w2 = $(window).width();
  
      H.removeClass('fancybox-lock-test');
  
      $("<style type='text/css'>.fancybox-margin{margin-right:" + (w2 - w1) + "px;}</style>").appendTo("head");
    });
  
  }(window, document, jQuery));
  /*fancy box end*/
  function initImagePopup() {
  
    jQuery('.team-popup-trigger').fancybox({
      type: 'image',
      width: 'auto',
      height: 'auto',
      scrolling: 'no',
      closeBtn: true,
      loop: false,
      wrapCSS: 'leaving-site-modal',
      helpers: {
        overlay: {
          locked: true,
          showEarly: false,
          css: {
            background: 'rgba(17, 21, 21, 0.94)'
          },
          closeClick: true
        }
      }
    });
  }
  
  
  
  $(document).ready(function() {
    $("input , textarea").on("keyup", function(e) {
      var $this = $(this);
      setTimeout(function() {
        if ($this.hasClass("input-validation-error")) {
          $this.closest(".form-group").find("label").addClass("red");
        } else {
          $this.closest(".form-group").find("label").removeClass("red");
        }
      }, 200);
    });
    $("form .submit-btn").click(function() {
      setTimeout(function() {
        if ($("form input, textarea").hasClass("input-validation-error")) {
          $("input.input-validation-error , textarea").closest(".form-group").find("label").addClass("red");
        } else {
          $(".valid").closest(".form-group").find("label").removeClass("red");
        }    
      }, 250);
       var errmsg = validateForm();
        if (errmsg == false) {
          $(".validation_form_error").css("display", "block");
        }
    });
  
    function validateForm() {
      var isValid = true;
      $('.form-control').each(function() {
        if ($(this).val() === '')
          isValid = false;
      });
      return isValid;
    }
    $(".fancybox").fancybox();
  });
  
  
  
  
  /*video-component second-trial*/
  function initVideohover() {
    jQuery('.pd-single-video-wrap').touchHover();
    jQuery('.pd-single-video').touchHover();
  
  }
  
  function initVideoCategorySelect() {
    jQuery('#video-category-redirect').change(function() {
      // set the window's location property to the value of the option the user has selected
      window.location = jQuery(this).val();
    });
  
    jQuery('.pd-archive-video-row .pd-single-video').touchHover();
  
    var groups = {};
    var $caption = '';
  
    jQuery('.pd-archive-video-row .pd-single-video').each(function() {
      var id = jQuery(this).attr('data-archive-video-gallery');
      if (!groups[id]) {
        groups[id] = [];
      }
  
      groups[id].push(this);
    });
  
    jQuery.each(groups, function() {
      $video_src = jQuery(this).attr('href');
      jQuery(this).magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-video-gallery-popup',
        closeOnContentClick: false,
        gallery: {
          enabled: true
        },
        callbacks: {
  
          open: function(item) {
            var mfp = jQuery.magnificPopup.instance,
              container = mfp.content,
              $this_index = this.index,
              $current_item = jQuery(mfp.currItem.el[0]),
              $current_item_id = $current_item.attr('href'),
              $current_item_parent = $current_item.closest('.pd-archive-video-row'),
              $selector_item = $current_item_parent.find('.pd-single-video').eq($this_index);
  
            container.find('.popup-caption-wrapper').remove();
  
            var $caption = $selector_item.find('.popup-caption').html();
            container.append($caption);
  
            //add class to popup
            if (mfp.index >= mfp.items.length - 1)
              container.addClass('mfp-last');
            else
              container.removeClass('mfp-last');
            if (mfp.index === 0)
              container.addClass('mfp-first');
            else
              container.removeClass('mfp-first');
  
          },
  
          change: function(item) {
  
            var mfp = jQuery.magnificPopup.instance,
              container = mfp.content,
              $this_index = this.index,
              $current_item = jQuery(mfp.currItem.el[0]),
              $current_item_id = $current_item.attr('href'),
              $current_item_parent = $current_item.closest('.pd-archive-video-row'),
              $selector_item = $current_item_parent.find('.pd-single-video').eq($this_index),
              $insert_to = container.find('.mfp-iframe-scaler');
  
            container.find('.popup-caption-wrapper').remove();
  
            var $caption = $selector_item.find('.popup-caption').html();
            container.append($caption);
  
            //add class to popup
            if (mfp.index >= mfp.items.length - 1)
              container.addClass('mfp-last');
            else
              container.removeClass('mfp-last');
            if (mfp.index === 0)
              container.addClass('mfp-first');
            else
              container.removeClass('mfp-first');
          }
        }
      });
  
    });
  
  }
  
  /*
   * Jquery Plugins
   * - touch hover
   *----------------------------------------------*/
  
  /*! Magnific Popup - v1.1.0 - 2016-02-20
   * http://dimsemenov.com/plugins/magnific-popup/
   * Copyright (c) 2016 Dmitry Semenov; */
  ! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
  }(function(a) {
    var b, c, d, e, f, g, h = "Close",
      i = "BeforeClose",
      j = "AfterClose",
      k = "BeforeAppend",
      l = "MarkupParse",
      m = "Open",
      n = "Change",
      o = "mfp",
      p = "." + o,
      q = "mfp-ready",
      r = "mfp-removing",
      s = "mfp-prevent-close",
      t = function() {},
      u = !!window.jQuery,
      v = a(window),
      w = function(a, c) {
        b.ev.on(o + a + p, c)
      },
      x = function(b, c, d, e) {
        var f = document.createElement("div");
        return f.className = "mfp-" + b,
          d && (f.innerHTML = d),
          e ? c && c.appendChild(f) : (f = a(f),
            c && f.appendTo(c)),
          f
      },
      y = function(c, d) {
        b.ev.triggerHandler(o + c, d),
          b.st.callbacks && (c = c.charAt(0).toLowerCase() + c.slice(1),
            b.st.callbacks[c] && b.st.callbacks[c].apply(b, a.isArray(d) ? d : [d]))
      },
      z = function(c) {
        return c === g && b.currTemplate.closeBtn || (b.currTemplate.closeBtn = a(b.st.closeMarkup.replace("%title%", b.st.tClose)),
            g = c),
          b.currTemplate.closeBtn
      },
      A = function() {
        a.magnificPopup.instance || (b = new t,
          b.init(),
          a.magnificPopup.instance = b)
      },
      B = function() {
        var a = document.createElement("p").style,
          b = ["ms", "O", "Moz", "Webkit"];
        if (void 0 !== a.transition)
          return !0;
        for (; b.length;)
          if (b.pop() + "Transition" in a)
            return !0;
        return !1
      };
    t.prototype = {
        constructor: t,
        init: function() {
          var c = navigator.appVersion;
          b.isLowIE = b.isIE8 = document.all && !document.addEventListener,
            b.isAndroid = /android/gi.test(c),
            b.isIOS = /iphone|ipad|ipod/gi.test(c),
            b.supportsTransition = B(),
            b.probablyMobile = b.isAndroid || b.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),
            d = a(document),
            b.popupsCache = {}
        },
        open: function(c) {
          var e;
          if (c.isObj === !1) {
            b.items = c.items.toArray(),
              b.index = 0;
            var g, h = c.items;
            for (e = 0; e < h.length; e++)
              if (g = h[e],
                g.parsed && (g = g.el[0]),
                g === c.el[0]) {
                b.index = e;
                break
              }
          } else
            b.items = a.isArray(c.items) ? c.items : [c.items],
            b.index = c.index || 0;
          if (b.isOpen)
            return void b.updateItemHTML();
          b.types = [],
            f = "",
            c.mainEl && c.mainEl.length ? b.ev = c.mainEl.eq(0) : b.ev = d,
            c.key ? (b.popupsCache[c.key] || (b.popupsCache[c.key] = {}),
              b.currTemplate = b.popupsCache[c.key]) : b.currTemplate = {},
            b.st = a.extend(!0, {}, a.magnificPopup.defaults, c),
            b.fixedContentPos = "auto" === b.st.fixedContentPos ? !b.probablyMobile : b.st.fixedContentPos,
            b.st.modal && (b.st.closeOnContentClick = !1,
              b.st.closeOnBgClick = !1,
              b.st.showCloseBtn = !1,
              b.st.enableEscapeKey = !1),
            b.bgOverlay || (b.bgOverlay = x("bg").on("click" + p, function() {
                b.close()
              }),
              b.wrap = x("wrap").attr("tabindex", -1).on("click" + p, function(a) {
                b._checkIfClose(a.target) && b.close()
              }),
              b.container = x("container", b.wrap)),
            b.contentContainer = x("content"),
            b.st.preloader && (b.preloader = x("preloader", b.container, b.st.tLoading));
          var i = a.magnificPopup.modules;
          for (e = 0; e < i.length; e++) {
            var j = i[e];
            j = j.charAt(0).toUpperCase() + j.slice(1),
              b["init" + j].call(b)
          }
          y("BeforeOpen"),
            b.st.showCloseBtn && (b.st.closeBtnInside ? (w(l, function(a, b, c, d) {
                c.close_replaceWith = z(d.type)
              }),
              f += " mfp-close-btn-in") : b.wrap.append(z())),
            b.st.alignTop && (f += " mfp-align-top"),
            b.fixedContentPos ? b.wrap.css({
              overflow: b.st.overflowY,
              overflowX: "hidden",
              overflowY: b.st.overflowY
            }) : b.wrap.css({
              top: v.scrollTop(),
              position: "absolute"
            }),
            (b.st.fixedBgPos === !1 || "auto" === b.st.fixedBgPos && !b.fixedContentPos) && b.bgOverlay.css({
              height: d.height(),
              position: "absolute"
            }),
            b.st.enableEscapeKey && d.on("keyup" + p, function(a) {
              27 === a.keyCode && b.close()
            }),
            v.on("resize" + p, function() {
              b.updateSize()
            }),
            b.st.closeOnContentClick || (f += " mfp-auto-cursor"),
            f && b.wrap.addClass(f);
          var k = b.wH = v.height(),
            n = {};
          if (b.fixedContentPos && b._hasScrollBar(k)) {
            var o = b._getScrollbarSize();
            o && (n.marginRight = o)
          }
          b.fixedContentPos && (b.isIE7 ? a("body, html").css("overflow", "hidden") : n.overflow = "hidden");
          var r = b.st.mainClass;
          return b.isIE7 && (r += " mfp-ie7"),
            r && b._addClassToMFP(r),
            b.updateItemHTML(),
            y("BuildControls"),
            a("html").css(n),
            b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo || a(document.body)),
            b._lastFocusedEl = document.activeElement,
            setTimeout(function() {
              b.content ? (b._addClassToMFP(q),
                  b._setFocus()) : b.bgOverlay.addClass(q),
                d.on("focusin" + p, b._onFocusIn)
            }, 16),
            b.isOpen = !0,
            b.updateSize(k),
            y(m),
            c
        },
        close: function() {
          b.isOpen && (y(i),
            b.isOpen = !1,
            b.st.removalDelay && !b.isLowIE && b.supportsTransition ? (b._addClassToMFP(r),
              setTimeout(function() {
                b._close()
              }, b.st.removalDelay)) : b._close())
        },
        _close: function() {
          y(h);
          var c = r + " " + q + " ";
          if (b.bgOverlay.detach(),
            b.wrap.detach(),
            b.container.empty(),
            b.st.mainClass && (c += b.st.mainClass + " "),
            b._removeClassFromMFP(c),
            b.fixedContentPos) {
            var e = {
              marginRight: ""
            };
            b.isIE7 ? a("body, html").css("overflow", "") : e.overflow = "",
              a("html").css(e)
          }
          d.off("keyup" + p + " focusin" + p),
            b.ev.off(p),
            b.wrap.attr("class", "mfp-wrap").removeAttr("style"),
            b.bgOverlay.attr("class", "mfp-bg"),
            b.container.attr("class", "mfp-container"), !b.st.showCloseBtn || b.st.closeBtnInside && b.currTemplate[b.currItem.type] !== !0 || b.currTemplate.closeBtn && b.currTemplate.closeBtn.detach(),
            b.st.autoFocusLast && b._lastFocusedEl && a(b._lastFocusedEl).focus(),
            b.currItem = null,
            b.content = null,
            b.currTemplate = null,
            b.prevHeight = 0,
            y(j)
        },
        updateSize: function(a) {
          if (b.isIOS) {
            var c = document.documentElement.clientWidth / window.innerWidth,
              d = window.innerHeight * c;
            b.wrap.css("height", d),
              b.wH = d
          } else
            b.wH = a || v.height();
          b.fixedContentPos || b.wrap.css("height", b.wH),
            y("Resize")
        },
        updateItemHTML: function() {
          var c = b.items[b.index];
          b.contentContainer.detach(),
            b.content && b.content.detach(),
            c.parsed || (c = b.parseEl(b.index));
          var d = c.type;
          if (y("BeforeChange", [b.currItem ? b.currItem.type : "", d]),
            b.currItem = c, !b.currTemplate[d]) {
            var f = b.st[d] ? b.st[d].markup : !1;
            y("FirstMarkupParse", f),
              f ? b.currTemplate[d] = a(f) : b.currTemplate[d] = !0
          }
          e && e !== c.type && b.container.removeClass("mfp-" + e + "-holder");
          var g = b["get" + d.charAt(0).toUpperCase() + d.slice(1)](c, b.currTemplate[d]);
          b.appendContent(g, d),
            c.preloaded = !0,
            y(n, c),
            e = c.type,
            b.container.prepend(b.contentContainer),
            y("AfterChange")
        },
        appendContent: function(a, c) {
          b.content = a,
            a ? b.st.showCloseBtn && b.st.closeBtnInside && b.currTemplate[c] === !0 ? b.content.find(".mfp-close").length || b.content.append(z()) : b.content = a : b.content = "",
            y(k),
            b.container.addClass("mfp-" + c + "-holder"),
            b.contentContainer.append(b.content)
        },
        parseEl: function(c) {
          var d, e = b.items[c];
          if (e.tagName ? e = {
              el: a(e)
            } : (d = e.type,
              e = {
                data: e,
                src: e.src
              }),
            e.el) {
            for (var f = b.types, g = 0; g < f.length; g++)
              if (e.el.hasClass("mfp-" + f[g])) {
                d = f[g];
                break
              }
            e.src = e.el.attr("data-mfp-src"),
              e.src || (e.src = e.el.attr("href"))
          }
          return e.type = d || b.st.type || "inline",
            e.index = c,
            e.parsed = !0,
            b.items[c] = e,
            y("ElementParse", e),
            b.items[c]
        },
        addGroup: function(a, c) {
          var d = function(d) {
            d.mfpEl = this,
              b._openClick(d, a, c)
          };
          c || (c = {});
          var e = "click.magnificPopup";
          c.mainEl = a,
            c.items ? (c.isObj = !0,
              a.off(e).on(e, d)) : (c.isObj = !1,
              c.delegate ? a.off(e).on(e, c.delegate, d) : (c.items = a,
                a.off(e).on(e, d)))
        },
        _openClick: function(c, d, e) {
          var f = void 0 !== e.midClick ? e.midClick : a.magnificPopup.defaults.midClick;
          if (f || !(2 === c.which || c.ctrlKey || c.metaKey || c.altKey || c.shiftKey)) {
            var g = void 0 !== e.disableOn ? e.disableOn : a.magnificPopup.defaults.disableOn;
            if (g)
              if (a.isFunction(g)) {
                if (!g.call(b))
                  return !0
              } else if (v.width() < g)
              return !0;
            c.type && (c.preventDefault(),
                b.isOpen && c.stopPropagation()),
              e.el = a(c.mfpEl),
              e.delegate && (e.items = d.find(e.delegate)),
              b.open(e)
          }
        },
        updateStatus: function(a, d) {
          if (b.preloader) {
            c !== a && b.container.removeClass("mfp-s-" + c),
              d || "loading" !== a || (d = b.st.tLoading);
            var e = {
              status: a,
              text: d
            };
            y("UpdateStatus", e),
              a = e.status,
              d = e.text,
              b.preloader.html(d),
              b.preloader.find("a").on("click", function(a) {
                a.stopImmediatePropagation()
              }),
              b.container.addClass("mfp-s-" + a),
              c = a
          }
        },
        _checkIfClose: function(c) {
          if (!a(c).hasClass(s)) {
            var d = b.st.closeOnContentClick,
              e = b.st.closeOnBgClick;
            if (d && e)
              return !0;
            if (!b.content || a(c).hasClass("mfp-close") || b.preloader && c === b.preloader[0])
              return !0;
            if (c === b.content[0] || a.contains(b.content[0], c)) {
              if (d)
                return !0
            } else if (e && a.contains(document, c))
              return !0;
            return !1
          }
        },
        _addClassToMFP: function(a) {
          b.bgOverlay.addClass(a),
            b.wrap.addClass(a)
        },
        _removeClassFromMFP: function(a) {
          this.bgOverlay.removeClass(a),
            b.wrap.removeClass(a)
        },
        _hasScrollBar: function(a) {
          return (b.isIE7 ? d.height() : document.body.scrollHeight) > (a || v.height())
        },
        _setFocus: function() {
          (b.st.focus ? b.content.find(b.st.focus).eq(0) : b.wrap).focus()
        },
        _onFocusIn: function(c) {
          return c.target === b.wrap[0] || a.contains(b.wrap[0], c.target) ? void 0 : (b._setFocus(), !1)
        },
        _parseMarkup: function(b, c, d) {
          var e;
          d.data && (c = a.extend(d.data, c)),
            y(l, [b, c, d]),
            a.each(c, function(c, d) {
              if (void 0 === d || d === !1)
                return !0;
              if (e = c.split("_"),
                e.length > 1) {
                var f = b.find(p + "-" + e[0]);
                if (f.length > 0) {
                  var g = e[1];
                  "replaceWith" === g ? f[0] !== d[0] && f.replaceWith(d) : "img" === g ? f.is("img") ? f.attr("src", d) : f.replaceWith(a("<img>").attr("src", d).attr("class", f.attr("class"))) : f.attr(e[1], d)
                }
              } else
                b.find(p + "-" + c).html(d)
            })
        },
        _getScrollbarSize: function() {
          if (void 0 === b.scrollbarSize) {
            var a = document.createElement("div");
            a.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",
              document.body.appendChild(a),
              b.scrollbarSize = a.offsetWidth - a.clientWidth,
              document.body.removeChild(a)
          }
          return b.scrollbarSize
        }
      },
      a.magnificPopup = {
        instance: null,
        proto: t.prototype,
        modules: [],
        open: function(b, c) {
          return A(),
            b = b ? a.extend(!0, {}, b) : {},
            b.isObj = !0,
            b.index = c || 0,
            this.instance.open(b)
        },
        close: function() {
          return a.magnificPopup.instance && a.magnificPopup.instance.close()
        },
        registerModule: function(b, c) {
          c.options && (a.magnificPopup.defaults[b] = c.options),
            a.extend(this.proto, c.proto),
            this.modules.push(b)
        },
        defaults: {
          disableOn: 0,
          key: null,
          midClick: !1,
          mainClass: "",
          preloader: !0,
          focus: "",
          closeOnContentClick: !1,
          closeOnBgClick: !0,
          closeBtnInside: !0,
          showCloseBtn: !0,
          enableEscapeKey: !0,
          modal: !1,
          alignTop: !1,
          removalDelay: 0,
          prependTo: null,
          fixedContentPos: "auto",
          fixedBgPos: "auto",
          overflowY: "auto",
          closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
          tClose: "Close (Esc)",
          tLoading: "Loading...",
          autoFocusLast: !0
        }
      },
      a.fn.magnificPopup = function(c) {
        A();
        var d = a(this);
        if ("string" == typeof c)
          if ("open" === c) {
            var e, f = u ? d.data("magnificPopup") : d[0].magnificPopup,
              g = parseInt(arguments[1], 10) || 0;
            f.items ? e = f.items[g] : (e = d,
                f.delegate && (e = e.find(f.delegate)),
                e = e.eq(g)),
              b._openClick({
                mfpEl: e
              }, d, f)
          } else
            b.isOpen && b[c].apply(b, Array.prototype.slice.call(arguments, 1));
        else
          c = a.extend(!0, {}, c),
          u ? d.data("magnificPopup", c) : d[0].magnificPopup = c,
          b.addGroup(d, c);
        return d
      };
    var C, D, E, F = "inline",
      G = function() {
        E && (D.after(E.addClass(C)).detach(),
          E = null)
      };
    a.magnificPopup.registerModule(F, {
      options: {
        hiddenClass: "hide",
        markup: "",
        tNotFound: "Content not found"
      },
      proto: {
        initInline: function() {
          b.types.push(F),
            w(h + "." + F, function() {
              G()
            })
        },
        getInline: function(c, d) {
          if (G(),
            c.src) {
            var e = b.st.inline,
              f = a(c.src);
            if (f.length) {
              var g = f[0].parentNode;
              g && g.tagName && (D || (C = e.hiddenClass,
                    D = x(C),
                    C = "mfp-" + C),
                  E = f.after(D).detach().removeClass(C)),
                b.updateStatus("ready")
            } else
              b.updateStatus("error", e.tNotFound),
              f = a("<div>");
            return c.inlineElement = f,
              f
          }
          return b.updateStatus("ready"),
            b._parseMarkup(d, {}, c),
            d
        }
      }
    });
    var H, I = "ajax",
      J = function() {
        H && a(document.body).removeClass(H)
      },
      K = function() {
        J(),
          b.req && b.req.abort()
      };
    a.magnificPopup.registerModule(I, {
      options: {
        settings: null,
        cursor: "mfp-ajax-cur",
        tError: '<a href="%url%">The content</a> could not be loaded.'
      },
      proto: {
        initAjax: function() {
          b.types.push(I),
            H = b.st.ajax.cursor,
            w(h + "." + I, K),
            w("BeforeChange." + I, K)
        },
        getAjax: function(c) {
          H && a(document.body).addClass(H),
            b.updateStatus("loading");
          var d = a.extend({
            url: c.src,
            success: function(d, e, f) {
              var g = {
                data: d,
                xhr: f
              };
              y("ParseAjax", g),
                b.appendContent(a(g.data), I),
                c.finished = !0,
                J(),
                b._setFocus(),
                setTimeout(function() {
                  b.wrap.addClass(q)
                }, 16),
                b.updateStatus("ready"),
                y("AjaxContentAdded")
            },
            error: function() {
              J(),
                c.finished = c.loadError = !0,
                b.updateStatus("error", b.st.ajax.tError.replace("%url%", c.src))
            }
          }, b.st.ajax.settings);
          return b.req = a.ajax(d),
            ""
        }
      }
    });
    var L, M = function(c) {
      if (c.data && void 0 !== c.data.title)
        return c.data.title;
      var d = b.st.image.titleSrc;
      if (d) {
        if (a.isFunction(d))
          return d.call(b, c);
        if (c.el)
          return c.el.attr(d) || ""
      }
      return ""
    };
    a.magnificPopup.registerModule("image", {
      options: {
        markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
        cursor: "mfp-zoom-out-cur",
        titleSrc: "title",
        verticalFit: !0,
        tError: '<a href="%url%">The image</a> could not be loaded.'
      },
      proto: {
        initImage: function() {
          var c = b.st.image,
            d = ".image";
          b.types.push("image"),
            w(m + d, function() {
              "image" === b.currItem.type && c.cursor && a(document.body).addClass(c.cursor)
            }),
            w(h + d, function() {
              c.cursor && a(document.body).removeClass(c.cursor),
                v.off("resize" + p)
            }),
            w("Resize" + d, b.resizeImage),
            b.isLowIE && w("AfterChange", b.resizeImage)
        },
        resizeImage: function() {
          var a = b.currItem;
          if (a && a.img && b.st.image.verticalFit) {
            var c = 0;
            b.isLowIE && (c = parseInt(a.img.css("padding-top"), 10) + parseInt(a.img.css("padding-bottom"), 10)),
              a.img.css("max-height", b.wH - c)
          }
        },
        _onImageHasSize: function(a) {
          a.img && (a.hasSize = !0,
            L && clearInterval(L),
            a.isCheckingImgSize = !1,
            y("ImageHasSize", a),
            a.imgHidden && (b.content && b.content.removeClass("mfp-loading"),
              a.imgHidden = !1))
        },
        findImageSize: function(a) {
          var c = 0,
            d = a.img[0],
            e = function(f) {
              L && clearInterval(L),
                L = setInterval(function() {
                  return d.naturalWidth > 0 ? void b._onImageHasSize(a) : (c > 200 && clearInterval(L),
                    c++,
                    void(3 === c ? e(10) : 40 === c ? e(50) : 100 === c && e(500)))
                }, f)
            };
          e(1)
        },
        getImage: function(c, d) {
          var e = 0,
            f = function() {
              c && (c.img[0].complete ? (c.img.off(".mfploader"),
                c === b.currItem && (b._onImageHasSize(c),
                  b.updateStatus("ready")),
                c.hasSize = !0,
                c.loaded = !0,
                y("ImageLoadComplete")) : (e++,
                200 > e ? setTimeout(f, 100) : g()))
            },
            g = function() {
              c && (c.img.off(".mfploader"),
                c === b.currItem && (b._onImageHasSize(c),
                  b.updateStatus("error", h.tError.replace("%url%", c.src))),
                c.hasSize = !0,
                c.loaded = !0,
                c.loadError = !0)
            },
            h = b.st.image,
            i = d.find(".mfp-img");
          if (i.length) {
            var j = document.createElement("img");
            j.className = "mfp-img",
              c.el && c.el.find("img").length && (j.alt = c.el.find("img").attr("alt")),
              c.img = a(j).on("load.mfploader", f).on("error.mfploader", g),
              j.src = c.src,
              i.is("img") && (c.img = c.img.clone()),
              j = c.img[0],
              j.naturalWidth > 0 ? c.hasSize = !0 : j.width || (c.hasSize = !1)
          }
          return b._parseMarkup(d, {
              title: M(c),
              img_replaceWith: c.img
            }, c),
            b.resizeImage(),
            c.hasSize ? (L && clearInterval(L),
              c.loadError ? (d.addClass("mfp-loading"),
                b.updateStatus("error", h.tError.replace("%url%", c.src))) : (d.removeClass("mfp-loading"),
                b.updateStatus("ready")),
              d) : (b.updateStatus("loading"),
              c.loading = !0,
              c.hasSize || (c.imgHidden = !0,
                d.addClass("mfp-loading"),
                b.findImageSize(c)),
              d)
        }
      }
    });
    var N, O = function() {
      return void 0 === N && (N = void 0 !== document.createElement("p").style.MozTransform),
        N
    };
    a.magnificPopup.registerModule("zoom", {
      options: {
        enabled: !1,
        easing: "ease-in-out",
        duration: 300,
        opener: function(a) {
          return a.is("img") ? a : a.find("img")
        }
      },
      proto: {
        initZoom: function() {
          var a, c = b.st.zoom,
            d = ".zoom";
          if (c.enabled && b.supportsTransition) {
            var e, f, g = c.duration,
              j = function(a) {
                var b = a.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                  d = "all " + c.duration / 1e3 + "s " + c.easing,
                  e = {
                    position: "fixed",
                    zIndex: 9999,
                    left: 0,
                    top: 0,
                    "-webkit-backface-visibility": "hidden"
                  },
                  f = "transition";
                return e["-webkit-" + f] = e["-moz-" + f] = e["-o-" + f] = e[f] = d,
                  b.css(e),
                  b
              },
              k = function() {
                b.content.css("visibility", "visible")
              };
            w("BuildControls" + d, function() {
                if (b._allowZoom()) {
                  if (clearTimeout(e),
                    b.content.css("visibility", "hidden"),
                    a = b._getItemToZoom(), !a)
                    return void k();
                  f = j(a),
                    f.css(b._getOffset()),
                    b.wrap.append(f),
                    e = setTimeout(function() {
                      f.css(b._getOffset(!0)),
                        e = setTimeout(function() {
                          k(),
                            setTimeout(function() {
                              f.remove(),
                                a = f = null,
                                y("ZoomAnimationEnded")
                            }, 16)
                        }, g)
                    }, 16)
                }
              }),
              w(i + d, function() {
                if (b._allowZoom()) {
                  if (clearTimeout(e),
                    b.st.removalDelay = g, !a) {
                    if (a = b._getItemToZoom(), !a)
                      return;
                    f = j(a)
                  }
                  f.css(b._getOffset(!0)),
                    b.wrap.append(f),
                    b.content.css("visibility", "hidden"),
                    setTimeout(function() {
                      f.css(b._getOffset())
                    }, 16)
                }
              }),
              w(h + d, function() {
                b._allowZoom() && (k(),
                  f && f.remove(),
                  a = null)
              })
          }
        },
        _allowZoom: function() {
          return "image" === b.currItem.type
        },
        _getItemToZoom: function() {
          return b.currItem.hasSize ? b.currItem.img : !1
        },
        _getOffset: function(c) {
          var d;
          d = c ? b.currItem.img : b.st.zoom.opener(b.currItem.el || b.currItem);
          var e = d.offset(),
            f = parseInt(d.css("padding-top"), 10),
            g = parseInt(d.css("padding-bottom"), 10);
          e.top -= a(window).scrollTop() - f;
          var h = {
            width: d.width(),
            height: (u ? d.innerHeight() : d[0].offsetHeight) - g - f
          };
          return O() ? h["-moz-transform"] = h.transform = "translate(" + e.left + "px," + e.top + "px)" : (h.left = e.left,
              h.top = e.top),
            h
        }
      }
    });
    var P = "iframe",
      Q = "//about:blank",
      R = function(a) {
        if (b.currTemplate[P]) {
          var c = b.currTemplate[P].find("iframe");
          c.length && (a || (c[0].src = Q),
            b.isIE8 && c.css("display", a ? "block" : "none"))
        }
      };
    a.magnificPopup.registerModule(P, {
      options: {
        markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
        srcAction: "iframe_src",
        patterns: {
          youtube: {
            index: "youtube.com",
            id: "v=",
            src: "//www.youtube.com/embed/%id%?autoplay=1"
          },
          vimeo: {
            index: "vimeo.com/",
            id: "/",
            src: "//player.vimeo.com/video/%id%?autoplay=1"
          },
          gmaps: {
            index: "//maps.google.",
            src: "%id%&output=embed"
          }
        }
      },
      proto: {
        initIframe: function() {
          b.types.push(P),
            w("BeforeChange", function(a, b, c) {
              b !== c && (b === P ? R() : c === P && R(!0))
            }),
            w(h + "." + P, function() {
              R()
            })
        },
        getIframe: function(c, d) {
          var e = c.src,
            f = b.st.iframe;
          a.each(f.patterns, function() {
            return e.indexOf(this.index) > -1 ? (this.id && (e = "string" == typeof this.id ? e.substr(e.lastIndexOf(this.id) + this.id.length, e.length) : this.id.call(this, e)),
              e = this.src.replace("%id%", e), !1) : void 0
          });
          var g = {};
          return f.srcAction && (g[f.srcAction] = e),
            b._parseMarkup(d, g, c),
            b.updateStatus("ready"),
            d
        }
      }
    });
    var S = function(a) {
        var c = b.items.length;
        return a > c - 1 ? a - c : 0 > a ? c + a : a
      },
      T = function(a, b, c) {
        return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c)
      };
    a.magnificPopup.registerModule("gallery", {
      options: {
        enabled: !1,
        arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
        preload: [0, 2],
        navigateByImgClick: !0,
        arrows: !0,
        tPrev: "Previous (Left arrow key)",
        tNext: "Next (Right arrow key)",
        tCounter: "%curr% of %total%"
      },
      proto: {
        initGallery: function() {
          var c = b.st.gallery,
            e = ".mfp-gallery";
          return b.direction = !0,
            c && c.enabled ? (f += " mfp-gallery",
              w(m + e, function() {
                c.navigateByImgClick && b.wrap.on("click" + e, ".mfp-img", function() {
                    return b.items.length > 1 ? (b.next(), !1) : void 0
                  }),
                  d.on("keydown" + e, function(a) {
                    37 === a.keyCode ? b.prev() : 39 === a.keyCode && b.next()
                  })
              }),
              w("UpdateStatus" + e, function(a, c) {
                c.text && (c.text = T(c.text, b.currItem.index, b.items.length))
              }),
              w(l + e, function(a, d, e, f) {
                var g = b.items.length;
                e.counter = g > 1 ? T(c.tCounter, f.index, g) : ""
              }),
              w("BuildControls" + e, function() {
                if (b.items.length > 1 && c.arrows && !b.arrowLeft) {
                  var d = c.arrowMarkup,
                    e = b.arrowLeft = a(d.replace(/%title%/gi, c.tPrev).replace(/%dir%/gi, "left")).addClass(s),
                    f = b.arrowRight = a(d.replace(/%title%/gi, c.tNext).replace(/%dir%/gi, "right")).addClass(s);
                  e.click(function() {
                      b.prev()
                    }),
                    f.click(function() {
                      b.next()
                    }),
                    b.container.append(e.add(f))
                }
              }),
              w(n + e, function() {
                b._preloadTimeout && clearTimeout(b._preloadTimeout),
                  b._preloadTimeout = setTimeout(function() {
                    b.preloadNearbyImages(),
                      b._preloadTimeout = null
                  }, 16)
              }),
              void w(h + e, function() {
                d.off(e),
                  b.wrap.off("click" + e),
                  b.arrowRight = b.arrowLeft = null
              })) : !1
        },
        next: function() {
          b.direction = !0,
            b.index = S(b.index + 1),
            b.updateItemHTML()
        },
        prev: function() {
          b.direction = !1,
            b.index = S(b.index - 1),
            b.updateItemHTML()
        },
        goTo: function(a) {
          b.direction = a >= b.index,
            b.index = a,
            b.updateItemHTML()
        },
        preloadNearbyImages: function() {
          var a, c = b.st.gallery.preload,
            d = Math.min(c[0], b.items.length),
            e = Math.min(c[1], b.items.length);
          for (a = 1; a <= (b.direction ? e : d); a++)
            b._preloadItem(b.index + a);
          for (a = 1; a <= (b.direction ? d : e); a++)
            b._preloadItem(b.index - a)
        },
        _preloadItem: function(c) {
          if (c = S(c), !b.items[c].preloaded) {
            var d = b.items[c];
            d.parsed || (d = b.parseEl(c)),
              y("LazyLoad", d),
              "image" === d.type && (d.img = a('<img class="mfp-img" />').on("load.mfploader", function() {
                d.hasSize = !0
              }).on("error.mfploader", function() {
                d.hasSize = !0,
                  d.loadError = !0,
                  y("LazyLoadError", d)
              }).attr("src", d.src)),
              d.preloaded = !0
          }
        }
      }
    });
    var U = "retina";
    a.magnificPopup.registerModule(U, {
        options: {
          replaceSrc: function(a) {
            return a.src.replace(/\.\w+$/, function(a) {
              return "@2x" + a
            })
          },
          ratio: 1
        },
        proto: {
          initRetina: function() {
            if (window.devicePixelRatio > 1) {
              var a = b.st.retina,
                c = a.ratio;
              c = isNaN(c) ? c() : c,
                c > 1 && (w("ImageHasSize." + U, function(a, b) {
                    b.img.css({
                      "max-width": b.img[0].naturalWidth / c,
                      width: "100%"
                    })
                  }),
                  w("ElementParse." + U, function(b, d) {
                    d.src = a.replaceSrc(d, c)
                  }))
            }
          }
        }
      }),
      A()
  });
  
  /*
   *jQuery plugin - touchhover
   *--------------------------*/
  
  /*
   * Mobile hover plugin
   */
  ;
  (function($) {
  
    // detect device type
    var isTouchDevice = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
      isWinPhoneDevice = /Windows Phone/.test(navigator.userAgent);
  
    // define events
    var eventOn = (isTouchDevice && 'touchstart') || (isWinPhoneDevice && navigator.pointerEnabled && 'pointerdown') || (isWinPhoneDevice && navigator.msPointerEnabled && 'MSPointerDown') || 'mouseenter',
      eventOff = (isTouchDevice && 'touchend') || (isWinPhoneDevice && navigator.pointerEnabled && 'pointerup') || (isWinPhoneDevice && navigator.msPointerEnabled && 'MSPointerUp') || 'mouseleave';
  
    // event handlers
    var toggleOn, toggleOff, preventHandler;
    if (isTouchDevice || isWinPhoneDevice) {
      // prevent click handler
      preventHandler = function(e) {
        e.preventDefault();
      };
  
      // touch device handlers
      toggleOn = function(e) {
        var options = e.data,
          element = $(this);
  
        var toggleOff = function(e) {
          var target = $(e.target);
          if (!target.is(element) && !target.closest(element).length) {
            element.removeClass(options.hoverClass);
            element.off('click', preventHandler);
            if (options.onLeave)
              options.onLeave(element);
            $(document).off(eventOn, toggleOff);
          }
        };
  
        if (!element.hasClass(options.hoverClass)) {
          element.addClass(options.hoverClass);
          element.one('click', preventHandler);
          $(document).on(eventOn, toggleOff);
          if (options.onHover)
            options.onHover(element);
        }
      };
    } else {
      // desktop browser handlers
      toggleOn = function(e) {
        var options = e.data,
          element = $(this);
        element.addClass(options.hoverClass);
        $(options.context).on(eventOff, options.selector, options, toggleOff);
        if (options.onHover)
          options.onHover(element);
      };
      toggleOff = function(e) {
        var options = e.data,
          element = $(this);
        element.removeClass(options.hoverClass);
        $(options.context).off(eventOff, options.selector, toggleOff);
        if (options.onLeave)
          options.onLeave(element);
      };
    }
  
    // jQuery plugin
    $.fn.touchHover = function(opt) {
      var options = $.extend({
        context: this.context,
        selector: this.selector,
        hoverClass: 'hover'
      }, opt);
  
      $(this.context).on(eventOn, this.selector, options, toggleOn);
      return this;
    };
  }(jQuery));
  /*video-component second-trail*/
  