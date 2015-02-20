(function () {

	function BracesModel() {
		this.userInput = ko.observable();
    this.winning = ko.computed(function() {
      if (!this.userInput()) {
        return "Enter some text to play.";
      }
      if (isWinning(this.userInput())) {
        return "You're winning!";
      } else {
        return "You're losing...";
      };
    }, this);
	}

  function isWinning(str) {
    if (!str) {
      return true;
    }

    var open = "";

    for (var i=0; i<str.length; i++) {
      var c = str[i];

      if (isOpening(c)) {
        open += c;
      } else if (isClosing(c)) {
        if (open.length == 0) {
          return false;
        } else {
          var lastOpen = open[open.length-1];
          if (isMatched(lastOpen, c)) {
            open = open.slice(0, -1);
          } else {
            return false;
          }
        }
      }
    }

    return open.length == 0;
  }

  function isOpening(c) {
    return c == "{" || c == "[" || c == "(";
  }

  function isClosing(c) {
    return c == "}" || c == "]" || c == ")";
  }

  function isMatched(o, c) {
    result = false;

    if (o == "{") {
      result = c == "}";
    } else if (o == "[") {
      result = c == "]";
    } else if (o == "(") {
      result = c == ")";
    }

    return result;
  }

  var bracesModel = new BracesModel();
  ko.applyBindings(bracesModel);
  $('#input').val("");

})();