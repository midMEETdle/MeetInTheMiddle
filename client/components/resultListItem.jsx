const React = require('react');

var ResultListItem = React.createClass({

  displayListItems: function () {
    var suggestionArray = [];
    var meetSuggestions = this.props.data.meetSuggestions;
    meetSuggestions.forEach(function (suggestion) {
      suggestionArray.push(
        <div className="four columns singleItem">
          <h5>{suggestion.name}</h5>
          <p>Phone: {suggestion.display_phone}</p>
          <img role="presentation" src={suggestion.rating_img_url_large} />
          <p>{suggestion.snippet_text}</p>
        </div>
      );
    });
    return suggestionArray;
  },

  render: function () {
    var suggestionList = this.displayListItems();
    return (
      <div className="listItems">
        {suggestionList}
      </div>
    );
  },

});

module.exports = ResultListItem;