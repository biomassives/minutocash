/**
 * Created by mindestens on 12/26/13.
 */
// FIXME: why doesn't Handlebars.Utils.escapeExpression(text) work?
Handlebars.registerHelper('breaklines', function(text) {
  //text = Handlebars.Utils.escapeExpression(text);
  text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
  return new Handlebars.SafeString(text);
});
