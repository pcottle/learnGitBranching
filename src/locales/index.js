var allOfString = {
    // __desc__ is description, not language
    '__desc__': require('./__desc__'),
    'en_US': require('./en_US'),
    'de_DE': require('./de_DE'),
    'zh_CN': require('./zh_CN'),
    'zh_TW': require('./zh_TW'),
    'es_AR': require('./es_AR'),
    'pt_BR': require('./pt_BR'),
    'fr_FR': require('./fr_FR'),
    'ja': require('./ja'),
    'ru_RU': require('./ru_RU'),
    'uk': require('./uk'),
    'ko': require('./ko'),
};

var listKey = {};
Object.keys(allOfString).forEach(function(lang) {
    Object.keys(allOfString[lang]).forEach(function (key) {
        listKey[key] = true;
    });
});

/**
 * Return object have all language version and description (if necessary)
 * @param {String} key
 */
var str = function(key) {
    var obj = {};
    Object.keys(allOfString).forEach(function(lang) {
        if (allOfString[lang].hasOwnProperty(key)) {
            obj[lang] = allOfString[lang][key];
        }
    });
    return obj;
};

var needTranslate = function(lang) {
    var yourLang = allOfString[lang];
    if (!yourLang) {
        console.error('Oh, your language isn\'t support now.');
        console.error('Create ' + lang + '.json and add append it to `supportLang`');
        console.error('Start translate and pull request.');
        return;
    }
    var neededKeys = [];
    Object.keys(listKey).forEach(function (key){
        if (yourLang.hasOwnProperty(key)) {
            neededKeys.push(key);
        }
    });
    if (neededKeys.length === 0) {
        console.log('Perfect, you don\'t need and any key');
    } else {
        console.log('You need add ' + neededKeys.length + ' key(s) more:');
        var last = neededKeys.pop();
        neededKeys.forEach(function (key) {
            console.log('    ├─ ' + key);
        });
        console.log('    └─ ' + last);
    }

};

module.exports.str = str;
module.exports.needTranslate = needTranslate;
