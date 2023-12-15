// adapted from https://davidwalsh.name/convert-html-stings-dom-nodes
const toHtml = (str)=>document.createRange()
       .createContextualFragment(
         str.trim()
       ).firstChild;

export default toHtml;
