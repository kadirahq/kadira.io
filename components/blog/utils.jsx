Components.Blog.formatCategory = function(category) {
  category = category.split('-').map((part) => {
    var firstLetter = _.first(part).toUpperCase();
    var rest = _.rest(part).join("");
    part = `${firstLetter}${rest}`;
    return part;
  }).join(" ");

  return category;
};