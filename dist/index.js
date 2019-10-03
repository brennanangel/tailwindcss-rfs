const _ = require('lodash');

const tailwindcssRfs = function(userConfig = {}) {
    return ({ addUtilities, e, theme, variants }) => {
        const defaultOptions = {
            prefix: 'rfs-',
            suffix: '',
            fontSizeUtilities: true,
            paddingUtilities: true,
            marginUtilities: true,
            widthUtilities: false,
            maxWidthUtilities: false,
            minWidthUtilities: false,
            heightUtilities: false,
            maxHeightUtilities: false,
            minHeightUtilities: false,
        };

        const options = _.defaults({}, userConfig, defaultOptions);

        const prefixNegativeModifiers = function(base, modifier) {
            if (modifier === '-') {
                return `-${base}`;
            }
            if (_.startsWith(modifier, '-')) {
                return `-${options.prefix}${base}-${modifier.slice(1)}${options.suffix}`;
            }
            return `${options.prefix}${base}-${modifier}${options.suffix}`;
        };

        const fontSizeGenerator = (size, modifier) => ({
            [`.${e(`${options.prefix}text-${modifier}${options.suffix}`)}`]: { 'font-size': `rfs(${size})` },
        });

        const paddingGenerator = (size, modifier) => ({
            [`.${e(`${options.prefix}p-${modifier}${options.suffix}`)}`]: { padding: `rfs(${size})` },
            [`.${e(`${options.prefix}py-${modifier}${options.suffix}`)}`]: { 'padding-top': `rfs(${size})`, 'padding-bottom': `rfs(${size})` },
            [`.${e(`${options.prefix}px-${modifier}${options.suffix}`)}`]: { 'padding-left': `rfs(${size})`, 'padding-right': `rfs(${size})` },
            [`.${e(`${options.prefix}pt-${modifier}${options.suffix}`)}`]: { 'padding-top': `rfs(${size})` },
            [`.${e(`${options.prefix}pr-${modifier}${options.suffix}`)}`]: { 'padding-right': `rfs(${size})` },
            [`.${e(`${options.prefix}pb-${modifier}${options.suffix}`)}`]: { 'padding-bottom': `rfs(${size})` },
            [`.${e(`${options.prefix}pl-${modifier}${options.suffix}`)}`]: { 'padding-left': `rfs(${size})` },
        });

        const marginGenerator = (size, modifier) => ({
            [`.${e(prefixNegativeModifiers('m', modifier))}`]: { margin: `rfs(${size})` },
            [`.${e(prefixNegativeModifiers('my', modifier))}`]: { 'margin-top': `rfs(${size})`, 'margin-bottom': `rfs(${size})` },
            [`.${e(prefixNegativeModifiers('mx', modifier))}`]: { 'margin-left': `rfs(${size})`, 'margin-right': `rfs(${size})` },
            [`.${e(prefixNegativeModifiers('mt', modifier))}`]: { 'margin-top': `rfs(${size})` },
            [`.${e(prefixNegativeModifiers('mr', modifier))}`]: { 'margin-right': `rfs(${size})` },
            [`.${e(prefixNegativeModifiers('mb', modifier))}`]: { 'margin-bottom': `rfs(${size})` },
            [`.${e(prefixNegativeModifiers('ml', modifier))}`]: { 'margin-left': `rfs(${size})` },
        });

        const widthGenerator = (size, modifier) => ({
            [`.${e(`${options.prefix}w-${modifier}${options.suffix}`)}`]: { width: `rfs(${size})` },
        });

        const maxWidthGenerator = (size, modifier) => ({
            [`.${e(`${options.prefix}max-w-${modifier}${options.suffix}`)}`]: { 'max-width': `rfs(${size})` },
        });

        const minWidthGenerator = (size, modifier) => ({
            [`.${e(`${options.prefix}min-w-${modifier}${options.suffix}`)}`]: { 'min-width': `rfs(${size})` },
        });

        const heightGenerator = (size, modifier) => ({
            [`.${e(`${options.prefix}h-${modifier}${options.suffix}`)}`]: { height: `rfs(${size})` },
        });

        const maxHeightGenerator = (size, modifier) => ({
            [`.${e(`${options.prefix}max-h-${modifier}${options.suffix}`)}`]: { 'max-height': `rfs(${size})` },
        });

        const minHeightGenerator = (size, modifier) => ({
            [`.${e(`${options.prefix}min-h-${modifier}${options.suffix}`)}`]: { 'min-height': `rfs(${size})` },
        });

        const fontSizeUtilities = _.flatMap(theme('fontSize'), fontSizeGenerator);
        const paddingUtilities = _.flatMap(theme('padding'), paddingGenerator);
        const marginUtilities = _.flatMap(theme('margin'), marginGenerator);
        const widthUtilities = _.flatMap(theme('width'), widthGenerator);
        const maxWidthUtilities = _.flatMap(theme('maxWidth'), maxWidthGenerator);
        const minWidthUtilities = _.flatMap(theme('minWidth'), minWidthGenerator);
        const heightUtilities = _.flatMap(theme('height'), heightGenerator);
        const maxHeightUtilities = _.flatMap(theme('maxHeight'), maxHeightGenerator);
        const minHeightUtilities = _.flatMap(theme('minHeight'), minHeightGenerator);

        if (options.fontSizeUtilities) addUtilities(fontSizeUtilities, variants('rfsFontSize'));
        if (options.paddingUtilities) addUtilities(paddingUtilities, variants('rfsPadding'));
        if (options.marginUtilities) addUtilities(marginUtilities, variants('rfsMargin'));
        if (options.widthUtilities) addUtilities(widthUtilities, variants('rfsWidth'));
        if (options.maxWidthUtilities) addUtilities(maxWidthUtilities, variants('rfsMaxWidth'));
        if (options.minWidthUtilities) addUtilities(minWidthUtilities, variants('rfsMinWidth'));
        if (options.heightUtilities) addUtilities(heightUtilities, variants('rfsHeight'));
        if (options.maxHeightUtilities) addUtilities(maxHeightUtilities, variants('rfsMaxHeight'));
        if (options.minHeightUtilities) addUtilities(minHeightUtilities, variants('rfsMinHeight'));
    };
};

module.exports = tailwindcssRfs;
