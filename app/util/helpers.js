
class Helpers {
 
  // Usage: let [err, result] = await asCallBack(someAsyncFunc())
  static asCallBack (promise) {
    return promise.then(data => [null, data]).catch(err => [err]);
  };

  // Scrubs off dynamic fields that can make comparisons difficult in tests
  static scrubObj(obj, omit_array) {
    for (const key of omit_array) {
      if (obj[key]) delete obj[key];
    };
  };
};

module.exports = Helpers;