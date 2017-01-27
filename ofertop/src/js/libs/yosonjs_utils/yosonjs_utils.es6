/*
yosonjs - Utils
@class utils
@main yosonjs/utils
@author Jan Sanc/*var  isArray;
*/
// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

$(window).resize(function() {
    if(this.resizeTO) clearTimeout(this.resizeTO);
    this.resizeTO = setTimeout(function() {
        $(this).trigger('resizeEnd');
    }, 100);
});

(function($) {
  $.fn.removeClassRegEx = function(regex) {
    var classArray, classes, i, len;
    classes = $(this).attr("class");
    if (!classes || !regex) {
      return false;
    }
    classArray = [];
    classes = classes.split(" ");
    i = 0;
    len = classes.length;
    while (i < len) {
      if (!classes[i].match(regex)) {
        classArray.push(classes[i]);
      }
      i++;
    }
    $(this).attr("class", classArray.join(" "));
    return $(this);
  };
})(jQuery);

window.log = function() {
  var enviroment;
  enviroment = function() {
    return /(local\.|dev\.|localhost)/gi.test(document.domain);
  };
  if (typeof console !== "undefined" && enviroment()) {
    if (typeof console.log.apply !== "undefined") {
      console.log.apply(console, arguments);
      return;
    } else {
      console.log(Array.prototype.slice.call(arguments));
      return;
    }
  }
};

String.prototype.removeSigns = function() {
  var esp, espObj, table, that;
  that = this;
  table = {
    ">": "Mayor de",
    "<": "Menor de"
  };
  for (esp in table) {
    espObj = new RegExp("[" + esp + "]", "gi");
    that = that.replace(espObj, table[esp]);
  }
  return $.parseJSON("\"" + that + "\"");
};

String.prototype.removeAccents = function() {
  var esp, espObj, table, that;
  that = this;
  espObj = null;
  table = {
    "ñ": "\\u00F1",
    "Ñ": "\\u00D1",
    "ç": "\\u00C7",
    ">": "Mayor de",
    "<": "Menor de",
    $: "\\u0024",
    "&": "\\u0026",
    "á": "\\u00E1",
    "à": "\\u00E0",
    "ã": "\\u00E3",
    "â": "\\u00E2",
    "ä": "\\u00E4",
    "Á": "\\u00C1",
    "À": "\\u00C0",
    "Ã": "\\u00C3",
    "Â": "\\u00C2",
    "Ä": "\\u00C4",
    "é": "\\u00E9",
    "è": "\\u00E8",
    "ë": "\\u00EB",
    "ê": "\\u00EA",
    "É": "\\u00C9",
    "È": "\\u00C8",
    "Ë": "\\u00CB",
    "Ê": "\\u00CA",
    "í": "\\u00ED",
    "ì": "\\u00EC",
    "ï": "\\u00EF",
    "î": "\\u00EE",
    "Í": "\\u00ED",
    "Ì": "\\u00EC",
    "Ï": "\\u00EF",
    "Î": "\\u00EE",
    "ó": "\\u00F3",
    "ò": "\\u00F2",
    "ö": "\\u00F6",
    "ô": "\\u00F4",
    "õ": "\\u00F5",
    "Ó": "\\u00D3",
    "Ò": "\\u00D2",
    "Ö": "\\u00D6",
    "Ô": "\\u00D4",
    "Õ": "\\u00D5",
    "ú": "\\u00FA",
    "ù": "\\u00F9",
    "ü": "\\u00FC",
    "û": "\\u00FB",
    "Ú": "\\u00DA",
    "Ù": "\\u00D9",
    "Ü": "\\u00DC",
    "Û": "\\u00DB"
  };
  for (esp in table) {
    espObj = new RegExp("[" + esp + "]", "gi");
    that = that.replace(espObj, table[esp]);
  }
  return that;
};
/*
Cookie = {
  create: function(c, d, e) {
    var a, b;
    a = "";
    if (e) {
      b = new Date();
      b.setTime(b.getTime() + (e * 24 * 60 * 60 * 1000));
      a = "; expires=" + b.toGMTString();
    } else {
      a = "";
    }
    document.cookie = c + "=" + d + a + "; path=/";
    return this;
  },
  read: function(b) {
    var a, d, e, f;
    e = b + "=";
    a = document.cookie.split(";");
    d = 0;
    while (d < a.length) {
      f = a[d];
      while (f.charAt(0) === " ") {
        f = f.substring(1, f.length);
      }
      if (f.indexOf(e) === 0) {
        return f.substring(e.length, f.length);
      }
      d++;
    }
    return null;
  },
  del: function(a) {
    return this.create(a, "", -1);
  }
};
*/
/*isArray = function(element) {
  var result;
  result = false;
  if (Object.prototype.toString.call(element) === "[object Array]") {
    result = true;
  }
  return result;
};*/

setTimeout(function() {
  var Utils, sourcePath;
  Utils = (function() {
    function Utils() {}

    return Utils;

  })();
  Utils.prototype.colorLog = function(msg, color) {
    log("%c" + msg, "color:" + color + ";font-weight:bold");
  };
  Utils.prototype.loadYosonMCA = function() {
    var lhref, mainPath, parts, tempUrl;
    lhref = window.location.href;
    tempUrl = lhref.substr(lhref.indexOf('3000/modules/') + 12);
    tempUrl = tempUrl.replace('.html', '');
    tempUrl = tempUrl.replace('.phtml', '');
    tempUrl = tempUrl.substr(1, tempUrl.length);
    mainPath = tempUrl;
    parts = mainPath.split('/');
  };
  Utils.prototype.loadStaticFiles = function() {
    var Module, controller, depedencies, objDependencyManager, styleController, styleModule;
    Module = document.createElement('link');
    Module.type = 'text/css';
    Module.rel = 'stylesheet';
    Module.media = 'all';
    Module.href = yOSON.statHost + 'css/modules/' + yOSON.module + '/module_' + yOSON.module + '.css' + yOSON.statVers;
    styleModule = document.getElementsByTagName('link')[document.getElementsByTagName('link').length - 1];
    styleModule.parentNode.insertBefore(Module, styleModule);
    controller = document.createElement('link');
    controller.type = 'text/css';
    controller.rel = 'stylesheet';
    controller.media = 'all';
    controller.href = yOSON.statHost + 'css/modules/' + yOSON.module + '/' + yOSON.controller + '.css' + yOSON.statVers;
    styleController = document.getElementsByTagName('link')[document.getElementsByTagName('link').length - 1];
    styleController.parentNode.insertBefore(controller, styleController);
    objDependencyManager = new yOSON.Components.DependencyManager();
    depedencies = ['js/dist/scripts/modules/all_modules/all_modules.min.js', 'js/dist/scripts/modules/' + yOSON.module + '/' + yOSON.controller + '/' + yOSON.controller + '.min.js', 'js/dist/libs/yosonjs_utils/modules.js', 'js/dist/libs/yosonjs_utils/app_load.js'];
    return objDependencyManager.ready(depedencies, function() {
      return log("librerías cargadas con éxito");
    });
  };
  sourcePath = 'frontend/';
  yOSON.utils = new Utils();
  //yOSON.utils.loadYosonMCA();
  // yOSON.utils.loadStaticFiles();
  yOSON.utils.colorLog(' > ' + yOSON.module + ' | ' + yOSON.controller + ' | ' + yOSON.action, 'black');
  // yOSON.utils.colorLog(' > pug view path: ' + sourcePath + 'pug/modules/' + yOSON.module + '/' + yOSON.controller + '/' + yOSON.action + '.jade', 'gray');
  // yOSON.utils.colorLog(' > js controller path: ' + sourcePath + 'js/scripts/modules/' + yOSON.module + '/' + yOSON.controller + '/', 'brown');
  // yOSON.utils.colorLog(' > stylus module path: ' + sourcePath + 'stylus/modules/' + yOSON.module + '/module_' + yOSON.module + '.styl', 'green');
  // yOSON.utils.colorLog(' > stylus controller path: ' + sourcePath + 'stylus/modules/' + yOSON.module + '/' + yOSON.controller + '.styl', 'green');
  yOSON.utils.colorLog(' - - - - - - - - - - - - - - - - ', 'black');
}, 150);
