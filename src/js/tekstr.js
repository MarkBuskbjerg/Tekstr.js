var tekstr = (function() {
  'use strict;';

  // Function to make IE9+ support forEach:
  (function() {
    if (typeof NodeList.prototype.forEach === 'function') return false;
    else NodeList.prototype.forEach = Array.prototype.forEach;
  })();

  // Public APIs
  var publicAPIs = {};

  // Private function

  // Public function
  /**
   * Splits a string of text into an array of words
   *
   * @param {string} text The string of text to turn into an array of words
   * @returns array
   */
  publicAPIs.words = function(text) {
    if (typeof text !== 'string') {
      console.error('tekstr.words only works with a string a an input');
      return null;
    }
    return text
      .replace(/[-'.,]/gi, '') // Ignores hyphens and apostrophes. Dots are here to avoid split on . in numbers.
      .split(/[^a-zA-ZæøåÆØÅ0-9]/g) // Can't use \W+ since I need to take into account danish character ÆØÅ
      .filter(Boolean);
  };

  /**
   * splitParagraphs
   * TODO: Write a test for this
   * @param {string}  text The text you want to split into an array of paragraphs
   * @returns array
   *
   */
  publicAPIs.splitParagraphs = function(text) {
    return text.match(/<p/ >/g) || [];
  };

  /**
   * WARNING: Deprecated
   * Count sections / paragraphs in a text
   *
   * @param {string} text The text in which you want to count sections
   * @returns number
   */
  /*
  publicAPIs.countSections = function(text) {
    return (text.match(/<p/g) || []).length;
    //TODO: Filter empty paragraphs out in some way so that only sections containing text will result in a count
  };
  */

  /**
   * Get the character count from a string of text - with or without spaces counted
   *
   * @param {string} text
   * @param {Boolean}
   * @returns number
   */

  publicAPIs.countCharacters = function(text, spacesBoolean) {
    if (spacesBoolean) {
      return text.split('').length;
    } else {
      return text.replace(/\s+/g, '').split('').length;
    }
  };

  /**
   * Get the avarage number of characters per word in a textstring
   *
   * @param {string} text
   * @returns number
   */
  publicAPIs.averageCharactersPerWord = function(text) {
    return Math.round((tekstr.countCharacters(text, false) / tekstr.words(text).length) * 100) / 100;
  };

  /**
   * Split a string of text into an array of sentences
   * @param {string} text  The text you want to turn into an array of sentences
   **/
  publicAPIs.sentences = function(text) {
    var sentenceArray = [];
    // TODO: Match known abrreviations instead of the replaces
    var sentences = text // TODO: The var sentences could probably be deleted without worry. Try it on next refactor.
      .replace(/\. ([a-z])/g, ' $1')
      .replace(/\.([a-z])/g, '$1')
      .split(/\?|\!|\.|\n/g)
      .forEach(function(element) {
        sentenceArray.push(element.trim());
      });
    return sentenceArray.filter(Boolean);
  };

  /**
   * Get the average length (measured in xxxx) of a text string
   * @param {string} text  The text you need to know the average sentence length of
   * @returns number
   **/
  publicAPIs.averageSentenceLength = function(text) {
    return Math.round(tekstr.words(text).length / tekstr.sentences(text).length);
  };

  /**
   * Calculate the lix of a text
   * @param {!number} wordCount       The number of words in the text string
   * @param {!number} longWordsCount  The number of long words in the text string
   * @param {!number} sentenceCount   The number of sentences in the text string
   **/
  publicAPIs.calculateLix = function(wordCount, longWordsCount, sentenceCount) {
    return Math.round(wordCount / sentenceCount + (longWordsCount * 100) / wordCount);
  };

  /**
   * Measure speed on the text
   * @param {!number} wordCount  The number of words in a text string
   * @param {!number} speed      The speed in which numbers are consumed in the specific context - what is number of words consumed pr minuter
   **/
  publicAPIs.measureSpeed = function(wordCount, speed) {
    return Math.ceil(wordCount / speed);
  };

  // Return our public APIs
  return publicAPIs;
})();
