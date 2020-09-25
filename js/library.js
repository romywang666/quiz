
// This function handles ', ", \b, \t, \n, \f or \r
// equivalent of php function addslashes().
function addslashes(string) {
  return string.replace(/\\/g, '\\\\').
  replace(/\u0008/g, '\\b').
  replace(/\t/g, '\\t').
  replace(/\n/g, '\\n').
  replace(/\f/g, '\\f').
  replace(/\r/g, '\\r').
  replace(/'/g, '\\\'').
  replace(/"/g, '\\"');
}

/*
The quoteattr() function is used in a context, where the result will not be evaluated by javascript but must be
interpreted by an XML or HTML parser, and it must absolutely avoid breaking the syntax of an element attribute.

Newlines are natively preserved if generating the content of a text elements. However, if you're generating
the value of an attribute this assigned value will be normalized by the DOM as soon as it will be set,
so all whitespaces (SPACE, TAB, CR, LF) will be compressed, stripping leading and trailing whitespaces
and reducing all middle sequences of whitespaces into a single SPACE.

But there's an exception: the CR character will be preserved and not treated as whitespace,
only if it is represented with a numeric character reference! The result will be valid for all element attributes,
with the exception of attributes of type NMTOKEN or ID, or NMTOKENS: the presence of the referenced CR will make
the assigned value invalid for those attributes
(for example the id="..." attribute of HTML elements): this value being invalid, will be ignored by the DOM.
But in other attributes (of type CDATA), all CR characters represented by a numeric character reference
will be preserved and not normalized. Note that this trick will not work to preserve other whitespaces (SPACE, TAB, LF),
even if they are represented by NCR, because the normalization of all whitespaces (with the exception of the NCR to CR)
is mandatory in all attributes.

Note that this function itself does not perform any HTML/XML normalization of whitespaces, so it remains safe when
generating the content of a text element (don't pass the second preserveCR parameter for such case).

So if you pass an optional second parameter (whose default will be treated as if it was false) and if that parameter
evaluates as true, newlines will be preserved using this NCR, when you want to generate a literal attribute value,
and this attribute is of type CDATA (for example a title="..." attribute) and not of type ID, IDLIST, NMTOKEN or
NMTOKENS (for example an id="..." attribute).
 */
function quoteattr(s, preserveCR) {
  preserveCR = preserveCR ? '&#13;' : '\n';
  return ('' + s) /* Forces the conversion to string. */
    .replace(/&/g, '&amp;') /* This MUST be the 1st replacement. */
    .replace(/'/g, '&apos;') /* The 4 other predefined entities, required. */
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    /*
    You may add other replacements here for HTML only
    (but it's not necessary).
    Or for XML, only if the named entities are defined in its DTD.
    */
    .replace(/\r\n/g, preserveCR) /* Must be before the next replacement. */
    .replace(/[\r\n]/g, preserveCR);
  ;
}

/*
Warning! This function still does not check the source string (which is just, in Javascript, an unrestricted stream of
16-bit code units) for its validity in a file that must be a valid plain text source and also as valid source for
an HTML/XML document.

    It should be updated to detect and reject (by an exception):
        any code units representing code points assigned to non-characters (like \uFFFE and \uFFFF):
        this is an Unicode requirement only for valid plain-texts;

        any surrogate code units which are incorrectly paired to form a valid pair for an UTF-16-encoded code point:
        this is an Unicode requirement for valid plain-texts;

        any valid pair of surrogate code units representing a valid Unicode code point in supplementary planes,
        but which is assigned to non-characters (like U+10FFFE or U+10FFFF): this is an Unicode requirement only for
        valid plain-texts;

        most C0 and C1 controls (in the ranges \u0000..\u1F and \u007F..\u009F with the exception of TAB and
        newline controls): this is not an Unicode requirement but an additional requirement for valid HTML/XML.

    Despite of this limitation, the code above is almost what you'll want to do. Normally. Modern javascript engine
    should provide this function natively in the default system object, but in most cases, it does not completely
    ensure the strict plain-text validity, not the HTML/XML validity. But the HTML/XML document object from which your
    Javascript code will be called, should redefine this native function.

    This limitation is usually not a problem in most cases, because the source string are the result of computing from
    sources strings coming from the HTML/XML DOM.

    But this may fail if the javascript extract substrings and break pairs of surrogates, or if it generates text
    from computed numeric sources (converting any 16-bit code value into a string containing that one-code unit,
    and appending those short strings, or inserting these short strings via replacement operations):
    if you try to insert the encoded string into a HTML/XML DOM text element or in an HTML/XML attribute value or
    element name, the DOM will itself reject this insertion and will throw an exception; if your javascript inserts
    the resulting string in a local binary file or sends it via a binary network socket, there will be no exception
    thrown for this emission. Such non-plain text strings would also be the result of reading from a binary file
    (such as an PNG, GIF or JPEG image file) or from your javascript reading from a binary-safe network socket
    (such that the IO stream passes 16-bit code units rather than just 8-bit units: most binary I/O streams are
    byte-based anyway, and text I/O streams need that you specify a charset to decode files into plain-text,
    so that invalid encodings found in the text stream will throw an I/O exception in your script).


Note that this function, the way it is implemented (if it is augmented to correct the limitations noted in the
warning above), can be safely used as well to quote also the content of a literal text element in HTML/XML
(to avoid leaving some interpretable HTML/XML elements from the source string value), not just the content of a literal
attribute value ! So it should be better named quoteml(); the name quoteattr() is kept only by tradition.

This is the case in your example:

data.value = "It's just a \"sample\" <test>.\n\tTry & see yourself!";
var row = '';
row += '<tr>';
row += '<td>Name</td>';
row += '<td><input value="' + quoteattr(data.value) + '" /></td>';
row += '</tr>';

Alternative to quoteattr(), using only the DOM API:

The alternative, if the HTML code you generate will be part of the current HTML document, is to create each HTML
element individually, using the DOM methods of the document, such that you can set its attribute values directly
through the DOM API, instead of inserting the full HTML content using the innerHTML property of a single element :


data.value = "It's just a \"sample\" <test>.\n\tTry & see yourself!";
var row = document.createElement('tr');
var cell = document.createElement('td');
cell.innerText = 'Name';
row.appendChild(cell);
cell = document.createElement('td');
var input = document.createElement('input');
input.setAttribute('value', data.value);
cell.appendChild(input);
tr.appendChild(cell);

The HTML code is generated automatically and is now accessible in the
row.innerHTML property, which you are not required to insert in the
current document.

But you can continue by appending tr into a 'tbody' element object, and then
insert this into a new 'table' element object, which ou can append or insert
as a child of a DOM object of your document.

Note that this alternative does not attempt to preserve newlines present in the data.value, becase you're generating
the content of a text element, not an attribute value here. If you really want to generate an attribute value
preserving newlines using &#13;, see the start of section 1, and the code within quoteattr() above.

 */

function isIntNum(val){
  var regPos = /^[0-9]+.?[0-9]*/;     // 非负整数
  //var regNeg = /^\-[1-9][0-9]*$/;   // 负整数
  //if(regPos.test(val) || regNeg.test(val)){
  if(regPos.test(val)){
    return true;
  }else{
    return false;
  }
}