'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var linkClass = undefined;

/**
 * @typedef CSSModules~Options
 * @property {Boolean} allowMultiple Determines whether `className` can have multiple class names. Throws an error when the constrained is not met. Default: true.
 * @property {Boolean} keepOriginal Determines whether the original `className` value is kept in addition to the appended CSS modules styles CSS class name. Default: true.
 * @property {Boolean} errorNotFound Determines whether an error is raised if `className` defines a CSS class(es) that is not present in the CSS modules styles. Default: false.
 */

/**
 * @param {ReactElement} element
 * @param {Object} styles CSS modules class map.
 * @param {CSSModules~Options} options
 * @return {ReactElement}
 */
linkClass = function (element) {
    var styles = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    var newProps = undefined,
        newClassName = undefined,
        newChildren = undefined,
        childrenCount = undefined;

    if (element.props.className) {
        newClassName = element.props.className.split(' ');

        if (options.allowMultiple === false && newClassName.length > 1) {
            throw new Error('ReactElement defines multiple class names ("' + element.props.className + '") in className declaration.');
        }

        newClassName = newClassName.map(function (className) {
            if (!styles[className] && options.errorNotFound === true) {
                throw new Error('"' + className + '" CSS class name is not found in CSS modules styles.');
            }

            if (options.includeOriginal === false) {
                if (styles[className]) {
                    return styles[className];
                } else {
                    return '';
                }
            } else {
                if (styles[className]) {
                    return className + ' ' + styles[className];
                } else {
                    return className;
                }
            }
        });

        newClassName = newClassName.filter(function (className) {
            return className.length;
        });

        newClassName = newClassName.join(' ');
    }

    // A child can be either an array, a sole object or a string.
    // <div>test</div>
    if (typeof element.props.children !== 'string') {
        childrenCount = _react2['default'].Children.count(element.props.children);

        if (childrenCount > 1) {
            newChildren = _react2['default'].Children.map(element.props.children, function (node) {
                if (_react2['default'].isValidElement(node)) {
                    return linkClass(node, styles, options);
                } else {
                    return node;
                }
            });
        } else if (childrenCount === 1) {
            newChildren = linkClass(_react2['default'].Children.only(element.props.children), styles, options);
        }
    }

    if (newClassName) {
        newProps = {
            className: newClassName
        };
    }

    if (newChildren) {
        element = _react2['default'].cloneElement(element, newProps, newChildren);
    } else {
        element = _react2['default'].cloneElement(element, newProps);
    }

    return element;
};

exports['default'] = linkClass;
module.exports = exports['default'];